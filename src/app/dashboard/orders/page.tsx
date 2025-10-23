import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { OrderStatus } from "@prisma/client";
import { Package, CheckCircle2, Clock, ShoppingCart } from "lucide-react";
import { OrdersTable } from "@/components/dashboard/orders/OrdersTable";
import { OrdersCharts } from "@/components/dashboard/orders/OrdersCharts";

async function getOrdersData() {
  const [orders, counts, totalRevenue] = await Promise.all([
    prisma.order.findMany({
      include: {
        user: true,
        shippingAddress: true,
        items: {
          include: { product: true },
        },
      },
      orderBy: { placedAt: "desc" },
    }),
    prisma.order.groupBy({
      by: ["status"],
      _count: { status: true },
    }),
    prisma.order.aggregate({ _sum: { totalInCents: true } }),
  ]);

  const statusMap: Record<OrderStatus, number> = {
    PENDING: 0,
    PAID: 0,
    FULFILLED: 0,
    CANCELLED: 0,
  };

  counts.forEach((c: { status: OrderStatus; _count: { status: number } }) => {
    statusMap[c.status] = c._count.status;
  });

  return {
    orders,
    statusCounts: statusMap,
    totalRevenue: totalRevenue._sum.totalInCents ?? 0,
  };
}

export default async function OrdersPage() {
  const user = await requireUser("/dashboard/orders");
  if (user.role !== "ADMIN") return null;

  const data = await getOrdersData();

  const stats = [
    {
      label: "Total Orders",
      value: data.orders.length,
      icon: ShoppingCart,
      color: "amber",
    },
    {
      label: "Pending",
      value: data.statusCounts.PENDING,
      icon: Clock,
      color: "orange",
    },
    {
      label: "Paid",
      value: data.statusCounts.PAID,
      icon: CheckCircle2,
      color: "emerald",
    },
    {
      label: "Revenue",
      value: new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(data.totalRevenue / 100),
      icon: Package,
      color: "amber",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-amber-900 dark:text-foreground">Orders</h1>
        <p className="text-sm text-amber-700/70 dark:text-muted-foreground mt-1">
          Manage and track customer orders
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-amber-100 dark:border-border bg-white dark:bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 dark:bg-amber-600/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-amber-700 dark:text-amber-400" />
                </div>
              </div>
              <p className="mt-4 text-xs uppercase tracking-widest text-amber-700/70 dark:text-muted-foreground font-semibold">
                {stat.label}
              </p>
              <p className="mt-2 text-2xl font-bold text-amber-900 dark:text-foreground">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

  {/* Orders Charts (moved above table) */}
  <OrdersCharts orders={data.orders} />

  {/* Orders Table */}
  <OrdersTable orders={data.orders} />
    </div>
  );
}
