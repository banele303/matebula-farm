"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, TrendingUp, Star } from "lucide-react";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { SaleCountdown } from "@/components/products/SaleCountdown";

interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  priceInCents: number;
  compareAtPriceCents: number | null;
  stock: number;
  unit: string | null;
  onSale: boolean;
  saleDiscountPercent: number | null;
  saleEndsAt: string | null;
  images: { url: string; altText: string | null }[];
  category: { name: string; slug: string } | null;
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products?limit=6&featured=true");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-white via-amber-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 w-64 bg-amber-200/50 rounded-lg mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 w-96 bg-amber-100/50 rounded-lg mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
                <div className="aspect-square bg-amber-100/50 rounded-xl mb-4"></div>
                <div className="h-6 bg-amber-100/50 rounded mb-2"></div>
                <div className="h-4 bg-amber-50/50 rounded mb-4"></div>
                <div className="h-10 bg-amber-100/50 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white via-amber-50/30 to-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-100/20 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-orange-100/20 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 font-semibold text-sm mb-4">
            <TrendingUp className="w-4 h-4" />
            Fresh & Popular
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular farm-fresh products, handpicked for quality and taste
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          {products.map((product) => {
            const price = product.priceInCents / 100;
            const comparePrice = product.compareAtPriceCents
              ? product.compareAtPriceCents / 100
              : null;
            const savings = comparePrice ? comparePrice - price : 0;
            
            const heroImage = product.images[0]?.url ?? "/eggs5.jpg";
            const formattedPrice = new Intl.NumberFormat("en-ZA", {
              style: "currency",
              currency: "ZAR",
            }).format(price);
            
            const showCountdown = Boolean(product.onSale && product.saleEndsAt);

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

                  {/* Savings Badge */}
                  {savings > 0 && (
                    <span className="absolute top-3 left-4 rounded-full bg-emerald-600/95 text-white text-[11px] font-bold px-2.5 py-1 shadow-md">
                      Save R{savings.toFixed(2)}
                    </span>
                  )}

                  {/* Stock Warning - Top Right */}
                  {product.stock < 10 && product.stock > 0 && (
                    <span className="absolute top-3 right-4 rounded-full bg-amber-500/95 text-white text-[11px] font-bold px-2.5 py-1 shadow-md">
                      Only {product.stock} left
                    </span>
                  )}

                  {/* Out of Stock Overlay */}
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm mx-2 rounded-xl">
                      <span className="text-white font-bold text-lg">Out of Stock</span>
                    </div>
                  )}

                  {/* Bottom Badges and Countdown */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {product.unit && (
                        <span className="inline-flex items-center rounded-full bg-amber-50/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-800 shadow-sm ring-1 ring-amber-200/60">
                          {product.unit}
                        </span>
                      )}
                    </div>
                    {showCountdown && product.saleEndsAt && (
                      <SaleCountdown saleEndsAt={product.saleEndsAt} variant="compact" />
                    )}
                  </div>
                </Link>

                {/* Product Info */}
                <div className="flex flex-1 flex-col gap-4 p-4">
                  <div>
                    {/* Category */}
                    {product.category && (
                      <Link
                        href={`/products?category=${product.category.slug}`}
                        className="inline-block text-[10px] font-semibold text-amber-600 hover:text-amber-700 uppercase tracking-wider mb-1"
                      >
                        {product.category.name}
                      </Link>
                    )}

                    {/* Product Name */}
                    <h3 className="text-base font-semibold text-amber-900 line-clamp-2">
                      <Link href={`/products/${product.slug}`}>{product.name}</Link>
                    </h3>
                  </div>

                  {/* Price and Add to Cart */}
                  <div className="mt-auto space-y-2 text-sm text-amber-800">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-baseline gap-2">
                        <p className="text-lg font-bold text-amber-900">{formattedPrice}</p>
                      </div>
                      
                      {product.stock > 0 ? (
                        <AddToCartButton 
                          productId={product.id} 
                          quantity={1}
                          className="w-auto px-3 py-2 text-xs"
                        >
                          Add to Cart
                        </AddToCartButton>
                      ) : (
                        <button
                          disabled
                          className="w-auto px-3 py-2 text-xs bg-gray-300 text-gray-500 font-semibold rounded-xl cursor-not-allowed"
                        >
                          Out of Stock
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* View All Products CTA */}
        <div className="text-center mt-16">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <ShoppingCart className="w-5 h-5" />
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
