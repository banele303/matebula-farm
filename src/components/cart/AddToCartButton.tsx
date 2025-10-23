"use client";

import { useState, type ReactNode } from "react";
import { useCart } from "@/hooks/useCart";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  productId: string;
  quantity?: number;
  className?: string;
  children?: ReactNode;
}

export function AddToCartButton({
  productId,
  quantity = 1,
  className,
  children,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const { isAuthenticated } = useKindeAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthenticated) {
    return (
      <LoginLink
        className={cn(
          "inline-flex items-center justify-center rounded-xl border border-amber-200 px-5 py-3 text-sm font-semibold text-amber-900 transition-colors hover:bg-amber-50",
          className,
        )}
      >
        Sign in to order
      </LoginLink>
    );
  }

  async function handleAddToCart() {
    try {
      setIsSubmitting(true);
      setError(null);
      await addItem(productId, quantity);
    } catch (cartError) {
      console.error(cartError);
      setError("We couldn't add that to your cart. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isSubmitting}
        className={cn(
          "inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-lg hover:shadow-amber-600/30 focus:outline-none focus:ring-2 focus:ring-amber-500/40 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70",
          className,
        )}
      >
        {isSubmitting ? "Adding..." : children ?? "Add to Cart"}
      </button>
      {error ? (
        <p className="text-xs font-semibold text-rose-600">{error}</p>
      ) : null}
    </div>
  );
}
