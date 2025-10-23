import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

async function getAccountData(userId: string) {
  const [orders, addresses] = await Promise.all([
    prisma.order.findMany({
      where: { userId },
      orderBy: { placedAt: "desc" },
      take: 5,
      include: {
        items: {
          take: 2,
          include: {
            product: true,
          },
        },
      },
    }),
    prisma.address.findMany({ where: { userId }, orderBy: { createdAt: "desc" } }),
  ]);

  return { orders, addresses };
}

export default async function AccountPage() {
  const user = await requireUser("/account");
  const { orders, addresses } = await getAccountData(user.dbId);

  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 space-y-10">
        <header>
          <p className="text-xs uppercase tracking-widest text-amber-700/70 font-semibold">Welcome back</p>
          <h1 className="text-4xl font-bold text-amber-900 mt-2">My Account</h1>
          <p className="text-sm text-amber-700/80 mt-3">
            Manage your orders, delivery addresses, and account details.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-amber-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-amber-900">Profile</h2>
            <div className="mt-4 space-y-2 text-sm text-amber-800/80">
              <p><span className="font-semibold text-amber-900">Name:</span> {user.name ?? "—"}</p>
              <p><span className="font-semibold text-amber-900">Email:</span> {user.email ?? "—"}</p>
              <p><span className="font-semibold text-amber-900">Role:</span> {user.role}</p>
            </div>
            <Link
              href="/checkout"
              className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-amber-600/30"
            >
              Start a new order
            </Link>
          </div>

          <div className="rounded-3xl border border-amber-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-amber-900">Saved Addresses</h2>
            <div className="mt-4 space-y-3 text-sm text-amber-800/80">
              {addresses.length === 0 ? (
                <p className="text-amber-700/70">No addresses saved yet. Add one during checkout.</p>
              ) : (
                addresses.map((address) => (
                  <div key={address.id} className="rounded-2xl border border-amber-100 bg-amber-50/50 p-4">
                    <p className="font-semibold text-amber-900">
                      {address.recipient}
                      {address.label ? ` • ${address.label}` : ""}
                    </p>
                    <p className="text-xs text-amber-700/70 mt-1">
                      {address.line1}
                      {address.line2 ? `, ${address.line2}` : ""}, {address.city}, {address.province}, {address.postalCode}
                    </p>
                    {address.phone && (
                      <p className="text-xs text-amber-700/60 mt-1">Phone: {address.phone}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-amber-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-amber-900">Recent Orders</h2>
              <p className="text-xs text-amber-700/70 mt-1">Latest activity from your account</p>
            </div>
            <Link
              href="/products"
              className="px-4 py-2 text-sm font-semibold text-amber-900 border border-amber-200 rounded-xl hover:bg-amber-50"
            >
              Shop again
            </Link>
          </div>

          {orders.length === 0 ? (
            <p className="mt-6 text-sm text-amber-700/70">
              You have no orders yet. Start shopping to see them here.
            </p>
          ) : (
            <div className="mt-6 space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="rounded-2xl border border-amber-100 p-4 bg-amber-50/40">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-amber-900">Order #{order.orderNumber}</p>
                      <p className="text-xs text-amber-700/70">{order.items.length} items</p>
                    </div>
                    <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">{order.status}</span>
                  </div>
                  <ul className="mt-3 text-xs text-amber-700/70 space-y-1">
                    {order.items.map((item) => {
                      const productName = item.product?.name ?? "Product removed";
                      return (
                        <li key={item.id}>
                          {productName} × {item.quantity}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
