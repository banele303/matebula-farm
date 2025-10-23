import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { AnalyticsCharts } from "@/components/dashboard/analytics/AnalyticsCharts";
import { OrderStatus } from "@prisma/client";

function parseRange(searchParams: { [key: string]: string | string[] | undefined }) {
  const r = typeof searchParams?.range === "string" ? parseInt(searchParams.range) : NaN;
  const validRanges = [7, 30, 90, 365] as const;
  if (validRanges.includes(r as (typeof validRanges)[number])) return r as (typeof validRanges)[number];
  return 90 as const;
}

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export default async function AnalyticsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const user = await requireUser("/dashboard/analytics");
  if (user.role !== "ADMIN") return null;

  const range = parseRange(searchParams);
  const now = new Date();
  const start = startOfDay(new Date(now));
  start.setDate(now.getDate() - (range - 1));

  // Fetch data in parallel
  const [orders, orderItems, revenueAgg, statusGroups] = await Promise.all([
    prisma.order.findMany({
      where: { placedAt: { gte: start } },
      select: {
        id: true,
        userId: true,
        placedAt: true,
        totalInCents: true,
        status: true,
        shippingAddress: { select: { province: true, city: true } },
      },
      orderBy: { placedAt: "asc" },
    }),
    prisma.orderItem.findMany({
      where: { order: { placedAt: { gte: start } } },
      select: {
        quantity: true,
        unitPriceInCents: true,
        product: { select: { name: true, category: { select: { name: true } } } },
      },
    }),
    prisma.order.aggregate({ where: { placedAt: { gte: start } }, _sum: { totalInCents: true } }),
    prisma.order.groupBy({ by: ["status"], where: { placedAt: { gte: start } }, _count: { status: true } }),
  ]);

  // Returning customers: users in range who had an order before start
  const userIds = Array.from(new Set(orders.map((o) => o.userId)));
  const priorCounts = userIds.length
    ? await prisma.order.groupBy({
        by: ["userId"],
        where: { userId: { in: userIds }, placedAt: { lt: start } },
        _count: { userId: true },
      })
    : [];
  const returningUsersSet = new Set(priorCounts.map((p) => p.userId));
  const returningCount = new Set(orders.filter((o) => returningUsersSet.has(o.userId)).map((o) => o.userId)).size;
  const newCount = Math.max(0, userIds.length - returningCount);

  // Build daily buckets
  const dayKeys: string[] = [];
  const dayMap: Record<string, { date: string; Orders: number; Revenue: number }> = {};
  for (let i = 0; i < range; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const key = d.toISOString().slice(0, 10);
    dayKeys.push(key);
    dayMap[key] = { date: key, Orders: 0, Revenue: 0 };
  }
  orders.forEach((o) => {
    const key = new Date(o.placedAt).toISOString().slice(0, 10);
    if (dayMap[key]) {
      dayMap[key].Orders += 1;
      dayMap[key].Revenue += o.totalInCents / 100;
    }
  });
  const revenueSeries = dayKeys.map((k) => ({ label: k, Orders: dayMap[k].Orders, Revenue: Number(dayMap[k].Revenue.toFixed(2)) }));

  // Orders by status
  const statusCounts: Record<OrderStatus, number> = { PENDING: 0, PAID: 0, FULFILLED: 0, CANCELLED: 0 };
  statusGroups.forEach((g: { status: OrderStatus; _count: { status: number } }) => {
    statusCounts[g.status] = g._count.status;
  });
  const statusData = Object.entries(statusCounts).map(([status, count]) => ({ status, count }));

  // Sales by category
  const categoryMap = new Map<string, number>();
  orderItems.forEach((it) => {
    const revenue = (it.unitPriceInCents * it.quantity) / 100;
    const name = it.product?.category?.name || "Uncategorized";
    categoryMap.set(name, (categoryMap.get(name) || 0) + revenue);
  });
  const salesByCategory = Array.from(categoryMap.entries()).map(([category, revenue]) => ({ category, revenue: Number(revenue.toFixed(2)) }));

  // Top products by revenue
  const productMap = new Map<string, number>();
  orderItems.forEach((it) => {
    const revenue = (it.unitPriceInCents * it.quantity) / 100;
    const name = it.product?.name || "Product";
    productMap.set(name, (productMap.get(name) || 0) + revenue);
  });
  const topProducts = Array.from(productMap.entries())
    .map(([name, revenue]) => ({ name, revenue: Number(revenue.toFixed(2)) }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // Orders by province (if captured)
  const provinceMap = new Map<string, number>();
  orders.forEach((o) => {
    const p = o.shippingAddress?.province || "Unknown";
    provinceMap.set(p, (provinceMap.get(p) || 0) + 1);
  });
  const ordersByProvince = Array.from(provinceMap.entries()).map(([province, count]) => ({ province, count }));

  const revenueTotal = revenueAgg._sum.totalInCents ? revenueAgg._sum.totalInCents / 100 : 0;
  const ordersCount = orders.length;
  const aov = ordersCount ? Number((revenueTotal / ordersCount).toFixed(2)) : 0;

  const stats = [
    { label: "Revenue", value: new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(revenueTotal) },
    { label: "Orders", value: ordersCount },
    { label: "AOV", value: new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(aov) },
    { label: "New vs Returning", value: `${newCount} / ${returningCount}` },
  ];

  const ranges: Array<7 | 30 | 90 | 365> = [7, 30, 90, 365];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-amber-900 dark:text-foreground">Analytics</h1>
          <p className="text-sm text-amber-700/70 dark:text-muted-foreground mt-1">Key metrics and insights</p>
        </div>
        <div className="flex items-center gap-2">
          {ranges.map((r) => (
            <a
              key={r}
              href={`?range=${r}`}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold border ${
                range === r
                  ? "bg-amber-100 border-amber-200 text-amber-900 dark:bg-amber-600/20 dark:border-border dark:text-amber-400"
                  : "border-amber-200/70 dark:border-input text-amber-700/80 dark:text-foreground hover:bg-amber-50 dark:hover:bg-muted"
              }`}
            >
              {r}d
            </a>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-amber-100 dark:border-border bg-white dark:bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs uppercase tracking-widest text-amber-700/70 dark:text-muted-foreground font-semibold">{s.label}</p>
            <p className="mt-2 text-2xl font-bold text-amber-900 dark:text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      <AnalyticsCharts
        revenueSeries={revenueSeries}
        statusData={statusData}
        salesByCategory={salesByCategory}
        topProducts={topProducts}
        ordersByProvince={ordersByProvince}
      />
    </div>
  );
}
