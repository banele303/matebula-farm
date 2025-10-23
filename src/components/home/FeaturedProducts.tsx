"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, TrendingUp, Star } from "lucide-react";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => {
            const price = product.priceInCents / 100;
            const comparePrice = product.compareAtPriceCents
              ? product.compareAtPriceCents / 100
              : null;
            const savings = comparePrice ? comparePrice - price : 0;
            const discount = product.saleDiscountPercent || 
              (comparePrice ? Math.round((savings / comparePrice) * 100) : 0);

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-amber-200 transform hover:-translate-y-1"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Product Image */}
                <Link href={`/products/${product.slug}`} className="block relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
                  <div className="aspect-square relative">
                    {product.images[0] ? (
                      <Image
                        src={product.images[0].url}
                        alt={product.images[0].altText || product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100">
                        <ShoppingCart className="w-20 h-20 text-amber-300" />
                      </div>
                    )}
                    
                    {/* Sale Badge */}
                    {discount > 0 && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                        -{discount}%
                      </div>
                    )}

                    {/* Stock Badge */}
                    {product.stock < 10 && product.stock > 0 && (
                      <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                        Only {product.stock} left
                      </div>
                    )}

                    {/* Out of Stock */}
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                        <span className="text-white font-bold text-lg">Out of Stock</span>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-6">
                  {/* Category */}
                  {product.category && (
                    <Link
                      href={`/products?category=${product.category.slug}`}
                      className="inline-block text-xs font-semibold text-amber-600 hover:text-amber-700 uppercase tracking-wider mb-2"
                    >
                      {product.category.name}
                    </Link>
                  )}

                  {/* Product Name */}
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Description */}
                  {product.shortDescription && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {product.shortDescription}
                    </p>
                  )}

                  {/* Price Section */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      R{price.toFixed(2)}
                    </span>
                    {comparePrice && (
                      <span className="text-sm text-gray-400 line-through">
                        R{comparePrice.toFixed(2)}
                      </span>
                    )}
                    {product.unit && (
                      <span className="text-sm text-gray-500">/ {product.unit}</span>
                    )}
                  </div>

                  {/* Savings Badge */}
                  {savings > 0 && (
                    <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-semibold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      Save R{savings.toFixed(2)}
                    </div>
                  )}

                  {/* Add to Cart Button */}
                  {product.stock > 0 ? (
                    <AddToCartButton
                      productId={product.id}
                      quantity={1}
                      className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                    />
                  ) : (
                    <button
                      disabled
                      className="w-full bg-gray-300 text-gray-500 font-semibold py-3 px-6 rounded-xl cursor-not-allowed"
                    >
                      Out of Stock
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Products CTA */}
        <div className="text-center">
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
