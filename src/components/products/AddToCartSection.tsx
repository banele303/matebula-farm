"use client";

import { useState } from "react";
import QuantitySelector from "@/components/cart/QuantitySelector";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

type AddToCartSectionProps = {
  productId: string;
  stock?: number;
  className?: string;
};

export default function AddToCartSection({ productId, stock, className }: AddToCartSectionProps) {
  const [qty, setQty] = useState(1);

  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <QuantitySelector value={qty} onChange={setQty} min={1} max={typeof stock === "number" && stock > 0 ? stock : undefined} />
        <AddToCartButton productId={productId} quantity={qty} className="px-5 py-3 text-sm" />
      </div>
      {typeof stock === "number" ? (
        <p className="mt-1 text-xs text-amber-800/70">{stock} in stock</p>
      ) : null}
    </div>
  );
}
