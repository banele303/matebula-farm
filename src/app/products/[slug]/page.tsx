import { Metadata } from "next";
// consolidated below: notFound, redirect
import { prisma } from "@/lib/prisma";
import SaleCountdown from "@/components/products/SaleCountdown";
import ProductGallery from "@/components/products/ProductGallery";
import AddToCartSection from "@/components/products/AddToCartSection";
import ReviewStars from "@/components/products/ReviewStars";
import WriteReviewPanel from "@/components/products/WriteReviewPanel";

type ReviewWithUser = {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  user: {
    name: string | null;
  } | null;
};

type PageProps = {
  params: { slug: string };
};
import { notFound, redirect } from "next/navigation";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  let product = await prisma.product.findUnique({ where: { slug } });
  if (!product) {
    // Fallback: treat slug as product id for legacy links, no redirect in metadata phase
    product = await prisma.product.findUnique({ where: { id: slug } });
  }
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} | Mathebula Farm`,
    description: product.shortDescription || product.description || "Product details",
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { position: "asc" } },
      category: { select: { name: true, slug: true } },
    },
  });

  if (!product) {
    // If not found by slug, try interpreting as an ID and redirect to canonical slug
    const byId = await prisma.product.findUnique({ where: { id: slug }, select: { slug: true, isActive: true } });
    if (byId && byId.isActive) {
      redirect(`/products/${byId.slug}`);
    }
    return notFound();
  }
  if (!product.isActive) return notFound();

  const currencyFormatter = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: product.currency,
  });

  const currentPriceCents = product.priceInCents;
  const saleEndsAt = product.saleEndsAt ? product.saleEndsAt.toISOString() : null;
  const saleActive = Boolean(product.onSale);

  let originalPriceCents: number | null = product.compareAtPriceCents ?? null;

  if (saleActive) {
    if (originalPriceCents === null && product.saleDiscountPercent && product.saleDiscountPercent > 0 && product.saleDiscountPercent < 100) {
      originalPriceCents = Math.round(currentPriceCents / (1 - product.saleDiscountPercent / 100));
    }
  }

  if (originalPriceCents !== null && originalPriceCents <= currentPriceCents) {
    originalPriceCents = null;
  }

  const price = currencyFormatter.format(currentPriceCents / 100);
  const compare = originalPriceCents ? currencyFormatter.format(originalPriceCents / 100) : null;

  const computedPercent = originalPriceCents
    ? Math.max(0, Math.round(((originalPriceCents - currentPriceCents) / originalPriceCents) * 100))
    : null;
  const salePercent = saleActive ? product.saleDiscountPercent ?? computedPercent ?? null : null;
  const savings = originalPriceCents ? currencyFormatter.format((originalPriceCents - currentPriceCents) / 100) : null;
  const showCountdown = Boolean(product.onSale && saleEndsAt);

  let average = 0;
  let reviewCount = 0;
  let reviews: ReviewWithUser[] = [];
  // The 'review' model is optional, so we access it dynamically
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const reviewModel = prisma.review;
  if (reviewModel) {
    const [aggregate, revs] = await Promise.all([
      reviewModel.aggregate({ where: { productId: product.id }, _avg: { rating: true }, _count: { _all: true } }),
      reviewModel.findMany({
        where: { productId: product.id },
        orderBy: { createdAt: "desc" },
        take: 10,
        select: { id: true, rating: true, comment: true, createdAt: true, user: { select: { name: true } } },
      }),
    ]);
    average = aggregate._avg.rating ?? 0;
    reviewCount = aggregate._count._all;
    reviews = revs;
  }

  return (
    <div className="bg-white text-amber-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <div>
            <ProductGallery
              name={product.name}
              images={product.images}
              isFeatured={product.isFeatured}
              unit={product.unit}
              saleEndsAt={showCountdown && saleEndsAt ? saleEndsAt : null}
            />
          </div>

          {/* Info */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold leading-tight">{product.name}</h1>
                {product.category?.name && (
                  <p className="mt-1 text-sm text-amber-800/70">{product.category.name}</p>
                )}
              </div>
              {showCountdown && saleEndsAt ? <SaleCountdown saleEndsAt={saleEndsAt} /> : null}
            </div>

            <div className="mt-6 flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-extrabold text-amber-900">{price}</span>
              {compare ? (
                <span className="text-lg font-semibold text-amber-800/60 line-through">{compare}</span>
              ) : null}
              {salePercent ? (
                <span className="inline-flex items-center rounded-full bg-emerald-600 text-white text-xs font-bold px-2.5 py-1">
                  -{salePercent}%
                </span>
              ) : null}
            </div>
            {compare && savings ? (
              <p className="mt-2 text-sm font-semibold text-emerald-700">You save {savings}</p>
            ) : null}

            <div className="mt-6 text-amber-800/90 space-y-3">
              {product.shortDescription ? (
                <p className="text-base">{product.shortDescription}</p>
              ) : null}
              {product.description ? (
                <p className="text-sm leading-relaxed">{product.description}</p>
              ) : null}
              <p className="text-sm">
                <span className="font-semibold">Stock:</span> {product.stock}
                {product.unit ? ` ${product.unit}${product.stock !== 1 && !["g","kg","ml","l"].includes(product.unit) ? "s" : ""}` : ""}
              </p>
            </div>

            <div className="mt-8">
              <AddToCartSection productId={product.id} stock={product.stock} />
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 border-t border-amber-200 pt-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-extrabold">Customer Reviews</h2>
              <div className="flex items-center gap-2">
                <ReviewStars value={average} />
                <span className="text-sm text-amber-800/80">{average.toFixed(1)} ({reviewCount})</span>
              </div>
            </div>
          </div>

          {/* List */}
          <div className="mt-6 space-y-4">
            {reviews.length === 0 ? (
              <p className="text-sm text-amber-800/80">No reviews yet. Be the first to review this product.</p>
            ) : (
              reviews.map((r) => (
                <div key={r.id} className="rounded-lg border border-amber-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ReviewStars value={r.rating} />
                      <span className="text-sm font-semibold text-amber-900">{r.user?.name ?? "Customer"}</span>
                    </div>
                    <span className="text-xs text-amber-800/70">{new Date(r.createdAt).toLocaleDateString()}</span>
                  </div>
                  {r.comment ? (
                    <p className="mt-2 text-sm text-amber-900/90">{r.comment}</p>
                  ) : null}
                </div>
              ))
            )}
          </div>

          {/* Form toggle */}
          <div className="mt-6">
            <WriteReviewPanel productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
