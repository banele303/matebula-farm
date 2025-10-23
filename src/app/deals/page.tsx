import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ProductsGrid from "@/components/products/ProductsGrid";

export const metadata: Metadata = {
  title: "Deals | Mathebula Farm",
  description: "Limited-time offers on fresh farm products. Save big before the countdown ends!",
};

export default async function DealsPage() {
  const now = new Date();

  const [expiringSoon, allDeals] = await Promise.all([
    prisma.product.findMany({
      where: { isActive: true, onSale: true, saleEndsAt: { gt: now } },
      orderBy: { saleEndsAt: "asc" },
      take: 6,
      include: { images: { orderBy: { position: "asc" } }, category: { select: { name: true, slug: true } } },
    }),
    prisma.product.findMany({
      where: { isActive: true, onSale: true, saleEndsAt: { gt: now } },
      orderBy: { createdAt: "desc" },
      include: { images: { orderBy: { position: "asc" } }, category: { select: { name: true, slug: true } } },
    }),
  ]);

  return (
    <div className="bg-white text-amber-900">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-rose-50 to-orange-100" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <span className="inline-block text-[11px] font-bold tracking-wider text-amber-800 bg-amber-200/70 px-2.5 py-1 rounded-full ring-1 ring-amber-300">LIMITED-TIME OFFERS</span>
              <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
                Farm-Fresh Deals with Live Countdowns
              </h1>
              <p className="mt-4 text-lg text-amber-800/80 max-w-2xl">
                Don’t miss these special prices on our best-selling eggs and produce. When the clock runs out, the deal is gone.
              </p>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white shadow p-6 text-center">
                <div className="text-3xl font-bold">Save More</div>
                <p className="text-sm text-amber-800/70 mt-1">Deals updated regularly</p>
              </div>
              <div className="rounded-2xl bg-white shadow p-6 text-center">
                <div className="text-3xl font-bold">Fresh Daily</div>
                <p className="text-sm text-amber-800/70 mt-1">Locally produced</p>
              </div>
              <div className="rounded-2xl bg-white shadow p-6 text-center">
                <div className="text-3xl font-bold">Fast Delivery</div>
                <p className="text-sm text-amber-800/70 mt-1">Across Pretoria</p>
              </div>
              <div className="rounded-2xl bg-white shadow p-6 text-center">
                <div className="text-3xl font-bold">Quality First</div>
                <p className="text-sm text-amber-800/70 mt-1">A-grade products</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {expiringSoon.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">⏰ Ending Soon</h2>
            </div>
            <ProductsGrid products={expiringSoon.map(p => ({ ...p, saleEndsAt: p.saleEndsAt?.toISOString() ?? null }))} />
          </section>
        )}

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">All Deals</h2>
          </div>
          <ProductsGrid products={allDeals.map(p => ({ ...p, saleEndsAt: p.saleEndsAt?.toISOString() ?? null }))} />
        </section>
      </main>
    </div>
  );
}
