import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { Users, ShoppingCart, MapPin } from "lucide-react";
import { CustomersTable } from "@/components/dashboard/customers/CustomersTable";

async function getCustomersData() {
  const [customers, orderCounts] = await Promise.all([
    prisma.user.findMany({
      where: { role: "CUSTOMER" },
      include: {
        addresses: true,
        orders: {
          include: {
            items: true,
          },
          orderBy: { placedAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.order.groupBy({
      by: ["userId"],
      _count: { userId: true },
    }),
  ]);

  const ordersByUser = new Map<string, number>();
  orderCounts.forEach((o) => ordersByUser.set(o.userId, o._count.userId));

  return { customers, ordersByUser };
}

export default async function CustomersPage() {
  const user = await requireUser("/dashboard/customers");
  if (user.role !== "ADMIN") return null;

  const data = await getCustomersData();

  const totalCustomers = data.customers.length;
  const withOrders = data.customers.filter((c) => (data.ordersByUser.get(c.id) || 0) > 0).length;
  const withAddress = data.customers.filter((c) => c.addresses.length > 0).length;

  const stats = [
    { label: "Total Customers", value: totalCustomers, icon: Users },
    { label: "With Orders", value: withOrders, icon: ShoppingCart },
    { label: "With Address", value: withAddress, icon: MapPin },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-amber-900 dark:text-foreground">Customers</h1>
        <p className="text-sm text-amber-700/70 dark:text-muted-foreground mt-1">Manage customer accounts and history</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl border border-amber-100 dark:border-border bg-white dark:bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 dark:bg-amber-600/20 flex items-center justify-center">
                <Icon className="w-6 h-6 text-amber-700 dark:text-amber-400" />
              </div>
              <p className="mt-4 text-xs uppercase tracking-widest text-amber-700/70 dark:text-muted-foreground font-semibold">{s.label}</p>
              <p className="mt-2 text-2xl font-bold text-amber-900 dark:text-foreground">{s.value}</p>
            </div>
          );
        })}
      </div>

      <CustomersTable customers={data.customers} ordersByUser={Object.fromEntries(data.ordersByUser)} />
    </div>
  );
}
