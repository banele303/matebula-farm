"use client";

import { useState } from "react";
import ReviewForm from "@/components/products/ReviewForm";

export default function WriteReviewPanel({ productId }: { productId: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center rounded-md border border-amber-200 bg-white px-4 py-2 text-sm font-semibold text-amber-900 shadow-sm hover:bg-amber-50"
      >
        {open ? "Cancel" : "Write a review"}
      </button>
      {open ? <div className="mt-3"><ReviewForm productId={productId} /></div> : null}
    </div>
  );
}
