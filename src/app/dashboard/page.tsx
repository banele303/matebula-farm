import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { DailyOrdersChart } from "@/components/dashboard/overview/DailyOrdersChart";

async function getDashboardData() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

  const [productCount, orderCount, customerCount, totalRevenue, recentOrders, lowStockProducts, recentFiveOrders] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.order.aggregate({ _sum: { totalInCents: true } }),
    prisma.order.findMany({
      where: { placedAt: { gte: sevenDaysAgo } },
      select: { placedAt: true },
      orderBy: { placedAt: "asc" },
    }),
    prisma.product.findMany({
      where: { stock: { lt: 10 } },
      select: { id: true, name: true, stock: true, unit: true, images: { select: { url: true }, take: 1 } },
      orderBy: [{ stock: "asc" }, { name: "asc" }],
      take: 8,
    }),
    prisma.order.findMany({
      include: { user: true },
      orderBy: { placedAt: "desc" },
      take: 5,
    }),
  ]);

  return {
    productCount,
    orderCount,
    customerCount,
    totalRevenue: totalRevenue._sum.totalInCents ?? 0,
    recentOrders,
    lowStockProducts,
    recentFiveOrders,
  };
}

export default async function DashboardPage() {
  const user = await requireUser("/dashboard");

  if (user.role !== "ADMIN") {
    return null;
  }

  const data = await getDashboardData();

  const metrics = [
    {
      label: "Total Revenue",
      value: new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(data.totalRevenue / 100),
      change: "+12% MoM",
      trend: "up",
    },
    {
      label: "Orders",
      value: data.orderCount,
      change: "+8 new",
      trend: "up",
    },
    {
      label: "Active Products",
      value: data.productCount,
      change: `${data.lowStockProducts.length} low stock`,
      trend: data.lowStockProducts.length > 0 ? "warning" : "up",
    },
    {
      label: "Customers",
      value: data.customerCount,
      change: "+23 this month",
      trend: "up",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 rounded-3xl p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold opacity-90">Welcome back, {user.name ?? "Admin"}</p>
            <h1 className="text-3xl font-bold mt-1">Dashboard Overview</h1>
            <p className="text-sm opacity-90 mt-2">Monitor your farm's performance and activities</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 rounded-xl bg-white/20 backdrop-blur-sm border border-white/40 font-semibold hover:bg-white/30 transition-all text-sm">
              Download Report
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-amber-100 dark:border-border bg-white dark:bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs uppercase tracking-widest text-amber-700/70 dark:text-muted-foreground font-semibold">{metric.label}</p>
            <p className="mt-3 text-3xl font-bold text-amber-900 dark:text-foreground">{metric.value}</p>
            <div className="mt-4 flex items-center gap-2">
              {metric.trend === "up" && (
                <span className="text-emerald-600 text-xs font-semibold bg-emerald-50 px-2 py-1 rounded-full">
                  ↗ {metric.change}
                </span>
              )}
              {metric.trend === "warning" && (
                <span className="text-amber-600 text-xs font-semibold bg-amber-50 px-2 py-1 rounded-full">
                  ⚠ {metric.change}
                </span>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Charts Section */}
      <section className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-amber-100 dark:border-border bg-white dark:bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-amber-900 dark:text-foreground">Daily Orders</h2>
              <p className="text-xs text-amber-700/70 dark:text-muted-foreground mt-1">Last 7 days</p>
            </div>
            <button className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300">View All</button>
          </div>
          <DailyOrdersChart orders={data.recentOrders as any} />
        </div>
        <div className="rounded-2xl border border-amber-100 dark:border-border bg-white dark:bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-amber-900 dark:text-foreground">Stock Alerts</h2>
              <p className="text-xs text-amber-700/70 dark:text-muted-foreground mt-1">Products approaching low inventory</p>
            </div>
            <button className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300">Manage</button>
          </div>
          {data.lowStockProducts.length === 0 ? (
            <div className="space-y-3 text-sm text-amber-700/80 dark:text-muted-foreground">
              <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-muted border border-amber-100/60 dark:border-border">
                <p className="text-amber-800 dark:text-foreground font-semibold">No critical alerts</p>
                <p className="text-xs text-amber-700/70 dark:text-muted-foreground mt-1">All products are well stocked</p>
              </div>
            </div>
          ) : (
            <ul className="space-y-3">
              {data.lowStockProducts.map((p) => (
                <li key={p.id} className="flex items-center justify-between p-3 rounded-xl border border-amber-100 dark:border-border bg-amber-50/40 dark:bg-muted">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 dark:bg-amber-600/20 overflow-hidden flex items-center justify-center">
                      {p.images[0]?.url ? (
                        <img src={p.images[0].url} alt={p.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-base">📦</span>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-amber-900 dark:text-foreground">{p.name}</p>
                      <p className="text-xs text-amber-700/70 dark:text-muted-foreground">
                        {p.stock === 0 ? "Out of stock" : p.stock < 10 ? "Low stock" : ""} • {p.stock}
                        {p.unit ? ` ${p.unit}${p.stock !== 1 && !["g","kg","ml","l"].includes(p.unit) ? "s" : ""}` : ""}
                      </p>
                    </div>
                  </div>
                  <a href="/dashboard/products" className="px-3 py-1.5 rounded-lg border border-amber-200/70 dark:border-input text-xs font-semibold text-amber-900 dark:text-foreground hover:bg-amber-50 dark:hover:bg-muted">
                    Restock
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Recent Orders Table */}
      <section className="rounded-2xl border border-amber-100 dark:border-border bg-white dark:bg-card p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-semibold text-amber-900 dark:text-foreground">Recent Orders</h2>
            <p className="text-xs text-amber-700/70 dark:text-muted-foreground mt-1">Last 5 customer orders</p>
          </div>
          <button className="px-4 py-2 text-sm font-semibold text-amber-900 dark:text-foreground border border-amber-200 dark:border-border rounded-xl hover:bg-amber-50 dark:hover:bg-accent transition-colors">
            Export CSV
          </button>
        </div>
        <div className="rounded-xl border border-amber-100 dark:border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-amber-50/80 dark:bg-muted text-left text-xs uppercase tracking-widest text-amber-700/70 dark:text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Order</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Total</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.recentFiveOrders.length === 0 ? (
                <tr className="border-t border-amber-100/80 dark:border-border">
                  <td colSpan={4} className="px-4 py-8 text-center text-amber-700/70 dark:text-muted-foreground">
                    No orders yet. Orders will appear here once customers start placing them.
                  </td>
                </tr>
              ) : (
                data.recentFiveOrders.map((o) => (
                  <tr key={o.id} className="border-t border-amber-100/80 dark:border-border">
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="font-semibold text-amber-900 dark:text-foreground">#{o.orderNumber.slice(0, 8)}</span>
                        <span className="text-xs text-amber-700/70 dark:text-muted-foreground">{new Date(o.placedAt).toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="font-semibold text-amber-900 dark:text-foreground">{o.user?.name || "Customer"}</span>
                        <span className="text-xs text-amber-700/70 dark:text-muted-foreground">{o.user?.email || "-"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-amber-900 dark:text-foreground">
                      {new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(o.totalInCents / 100)}
                    </td>
                    <td className="px-4 py-3">
                      {o.status === "PENDING" && (
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 dark:bg-orange-600/20 text-orange-800 dark:text-orange-400">Pending</span>
                      )}
                      {o.status === "PAID" && (
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-600/20 text-emerald-800 dark:text-emerald-400">Paid</span>
                      )}
                      {o.status === "FULFILLED" && (
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-600/20 text-blue-800 dark:text-blue-400">Shipped</span>
                      )}
                      {o.status === "CANCELLED" && (
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-600/20 text-red-800 dark:text-red-400">Cancelled</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
