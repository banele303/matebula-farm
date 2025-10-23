import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";
import ProductsFilters from "../../components/products/ProductsFilters";
import ProductsGrid from "../../components/products/ProductsGrid";
import { Prisma } from "@prisma/client";

export const metadata: Metadata = {
  title: "Shop | Mathebula Farm",
  description: "Browse and shop Mathebula Farm products. Filter by category, search, and add to cart.",
};
type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Products({ searchParams }: PageProps) {
  noStore();

  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const category = typeof sp.category === "string" ? sp.category : undefined;
  const sort = typeof sp.sort === "string" ? sp.sort : "name-asc";
  const page = Number(sp.page ?? 1) || 1;
  const perPage = Math.min(48, Math.max(6, Number(sp.perPage ?? 12) || 12));
  const min = Number(sp.min ?? "") || undefined;
  const max = Number(sp.max ?? "") || undefined;

  const where: Prisma.ProductWhereInput = {
    isActive: true,
    ...(q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { shortDescription: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
          ],
        }
      : {}),
    ...(category ? { category: { slug: category } } : {}),
    ...(min || max
      ? { priceInCents: { ...(min ? { gte: min } : {}), ...(max ? { lte: max } : {}) } }
      : {}),
  };

  const orderBy: Prisma.ProductOrderByWithRelationInput = (() => {
    switch (sort) {
      case "price-asc":
        return { priceInCents: "asc" };
      case "price-desc":
        return { priceInCents: "desc" };
      case "name-desc":
        return { name: "desc" };
      case "newest":
        return { createdAt: "desc" };
      default:
        return { name: "asc" };
    }
  })();

  const [categories, total, products] = await Promise.all([
    prisma.productCategory.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true, slug: true } }),
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy,
      include: { images: { orderBy: { position: "asc" } }, category: { select: { name: true, slug: true } } },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / perPage));

  const productCards = products.map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    shortDescription: product.shortDescription,
    priceInCents: product.priceInCents,
    compareAtPriceCents: product.compareAtPriceCents,
    currency: product.currency,
    unit: product.unit,
    isFeatured: product.isFeatured,
    onSale: product.onSale,
    saleEndsAt: product.saleEndsAt ? product.saleEndsAt.toISOString() : null,
    saleDiscountPercent: product.saleDiscountPercent,
    images: product.images.map((image) => ({ url: image.url, altText: image.altText })),
    category: product.category,
  }));

  // Build pagination hrefs without accessing window to keep SSR deterministic
  const base = new URLSearchParams();
  if (q) base.set("q", q);
  if (category) base.set("category", category);
  if (sort) base.set("sort", sort);
  if (perPage) base.set("perPage", String(perPage));
  if (typeof min === "number") base.set("min", String(min));
  if (typeof max === "number") base.set("max", String(max));

  const prevHref = (() => {
    if (page <= 1) return null;
    const p = new URLSearchParams(base);
    p.set("page", String(page - 1));
    return `?${p.toString()}`;
  })();

  const nextHref = (() => {
    if (page >= totalPages) return null;
    const p = new URLSearchParams(base);
    p.set("page", String(page + 1));
    return `?${p.toString()}`;
  })();

  return (
    <div className="py-8 md:py-12 bg-white text-amber-900 dark:bg-white dark:text-amber-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[300px_1fr] lg:gap-8">
          <aside className="hidden lg:block">
            <ProductsFilters
              categories={categories}
              current={{ q, category, sort, page, perPage, min, max }}
              total={total}
            />
          </aside>

          <div>
            {/* Mobile filters on top */}
            <div className="lg:hidden mb-6">
              <ProductsFilters
                categories={categories}
                current={{ q, category, sort, page, perPage, min, max }}
                total={total}
              />
            </div>

            <ProductsGrid products={productCards} />

            {/* Pagination */}
            <div className="flex items-center justify-between mt-8">
              <p className="text-sm text-amber-800">
                Showing {productCards.length === 0 ? 0 : (page - 1) * perPage + 1}–
                {(page - 1) * perPage + productCards.length} of {total}
              </p>
              <div className="flex items-center gap-2">
                {prevHref ? (
                  <a href={prevHref} className="px-3 py-2 rounded-lg border border-amber-200 text-amber-900 hover:bg-amber-50 text-sm">
                    Previous
                  </a>
                ) : (
                  <span className="px-3 py-2 rounded-lg border border-amber-200 text-amber-700/50 text-sm">Previous</span>
                )}
                <span className="text-sm font-semibold text-amber-900">
                  Page {page} of {totalPages}
                </span>
                {nextHref ? (
                  <a href={nextHref} className="px-3 py-2 rounded-lg border border-amber-200 text-amber-900 hover:bg-amber-50 text-sm">
                    Next
                  </a>
                ) : (
                  <span className="px-3 py-2 rounded-lg border border-amber-200 text-amber-700/50 text-sm">Next</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}