import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

async function getCart(userId: string) {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: { orderBy: { position: "asc" } },
            },
          },
        },
      },
    },
  });

  if (!cart) {
    return {
      items: [],
      subtotalInCents: 0,
      totalItems: 0,
    };
  }

  const subtotalInCents = cart.items.reduce((total, item) => total + item.quantity * item.unitPriceInCents, 0);

  return {
    items: cart.items,
    subtotalInCents,
    totalItems: cart.items.reduce((total, item) => total + item.quantity, 0),
  };
}

export default async function CartPage() {
  const user = await requireUser("/cart");
  const cart = await getCart(user.dbId);

  const subtotalFormatted = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
  }).format(cart.subtotalInCents / 100);

  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-white min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-widest text-amber-700/70 font-semibold">Your basket</p>
          <h1 className="text-4xl font-bold text-amber-900 mt-2">Order Summary</h1>
          <p className="text-sm text-amber-700/80 mt-3">Review your items before heading to checkout. No payment required online—we confirm via phone.</p>
        </div>

        {cart.items.length === 0 ? (
          <div className="bg-white/70 border border-amber-100 rounded-3xl p-12 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-amber-900">Your cart is empty</h2>
            <p className="text-sm text-amber-700/70 mt-2">
              Browse our product catalogue and add fresh produce to your order.
            </p>
            <div className="mt-6">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 text-white font-semibold hover:shadow-lg hover:shadow-amber-600/30"
              >
                Explore Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              {cart.items.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl border border-amber-100 p-6 flex gap-4 shadow-sm">
                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-amber-100/60">
                    {item.product.images[0] ? (
                      <Image
                        src={item.product.images[0].url}
                        alt={item.product.images[0].altText ?? item.product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-2xl font-semibold text-amber-700">
                        {item.product.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-amber-900">{item.product.name}</h3>
                        <p className="text-sm text-amber-700/80 mt-1">Qty {item.quantity}</p>
                        {item.product.unit && (
                          <p className="text-xs uppercase tracking-wide text-amber-600/90 font-semibold mt-2">
                            Unit: {item.product.unit}
                          </p>
                        )}
                      </div>
                      <p className="text-lg font-semibold text-amber-900">
                        {new Intl.NumberFormat("en-ZA", {
                          style: "currency",
                          currency: "ZAR",
                        }).format((item.unitPriceInCents * item.quantity) / 100)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="bg-white rounded-3xl border border-amber-100 p-6 h-fit shadow-md">
              <h2 className="text-xl font-semibold text-amber-900">Order Total</h2>
              <div className="mt-4 space-y-3 text-sm text-amber-800/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{subtotalFormatted}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="font-semibold text-amber-900">Calculated on confirmation</span>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-amber-100 via-orange-100 to-white border border-amber-200/50 text-sm text-amber-900">
                We will confirm delivery fees and schedule via phone once we receive your order. Payment can be arranged via EFT or COD.
              </div>

              <Link
                href="/checkout"
                className="mt-6 block text-center px-5 py-3 rounded-xl bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 text-white font-semibold hover:shadow-lg hover:shadow-amber-600/30"
              >
                Proceed to Checkout
              </Link>
              <button
                className="mt-4 w-full text-center px-5 py-3 rounded-xl border border-amber-200 text-amber-900 font-semibold hover:bg-amber-50"
                onClick={() => history.back()}
              >
                Continue Shopping
              </button>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
