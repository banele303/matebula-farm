import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import SaleCountdown from "@/components/products/SaleCountdown";

export type ProductCard = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  priceInCents: number;
  compareAtPriceCents: number | null;
  currency: string;
  unit: string | null;
  isFeatured: boolean;
  onSale?: boolean;
  saleEndsAt?: string | null;
  saleDiscountPercent?: number | null;
  images: { url: string; altText: string | null }[];
  category?: { name: string; slug: string } | null;
};

export default function ProductsGrid({ products }: { products: ProductCard[] }) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-amber-100 bg-amber-50/40 p-10 text-center text-sm text-amber-700/70">
        No products match your filters.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
      {products.map((product) => {
        const heroImage = product.images[0]?.url ?? "/eggs5.jpg";
        const price = new Intl.NumberFormat("en-ZA", {
          style: "currency",
          currency: product.currency,
        }).format(product.priceInCents / 100);
        const savings = product.compareAtPriceCents
          ? product.compareAtPriceCents - product.priceInCents
          : 0;
        const saleEndsAt = product.saleEndsAt || null;
        const showCountdown = Boolean(product.onSale && saleEndsAt);

        return (
          <article
            key={product.id}
            className="flex h-full flex-col overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm transition-shadow hover:shadow-lg"
          >
            <Link href={`/products/${product.slug}`} className="block relative h-52 w-full mt-2">
              <div className="absolute inset-0 mx-2 bg-amber-50 rounded-xl overflow-hidden">
                <div className="relative w-full h-full">
                  <Image
                    src={heroImage}
                    alt={product.images[0]?.altText ?? product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                </div>
              </div>
              {savings > 0 ? (
                <span className="absolute top-3 left-4 rounded-full bg-emerald-600/95 text-white text-[11px] font-bold px-2.5 py-1 shadow-md">
                  Save {new Intl.NumberFormat("en-ZA", {
                    style: "currency",
                    currency: product.currency,
                  }).format(savings / 100)}
                </span>
              ) : null}
              {/* Chips and countdown overlayed at the bottom of the image */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {product.isFeatured ? (
                    <span className="inline-flex items-center rounded-full bg-amber-100/95 px-2.5 py-1 text-[10px] font-bold text-amber-900 shadow-sm ring-1 ring-amber-200/60">
                      FEATURED
                    </span>
                  ) : null}
                  {product.unit ? (
                    <span className="inline-flex items-center rounded-full bg-amber-50/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-800 shadow-sm ring-1 ring-amber-200/60">
                      {product.unit}
                    </span>
                  ) : null}
                </div>
                {showCountdown ? (
                  <SaleCountdown saleEndsAt={saleEndsAt as string} />
                ) : null}
              </div>
            </Link>
            <div className="flex flex-1 flex-col gap-4 p-4">
              <div>
                <h3 className="text-base font-semibold text-amber-900 line-clamp-2">
                  <Link href={`/products/${product.slug}`}>{product.name}</Link>
                </h3>
              </div>

              <div className="mt-auto space-y-2 text-sm text-amber-800">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-baseline gap-2">
                    <p className="text-lg font-bold text-amber-900">{price}</p>
                  </div>
                  <AddToCartButton productId={product.id} className="w-auto px-3 py-2 text-xs">Add to Cart</AddToCartButton>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
