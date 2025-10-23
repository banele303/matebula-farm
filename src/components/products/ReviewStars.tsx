"use client";

import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

export default function ReviewStars({ value, className = "", size = 18, readOnly = true }: { value: number; className?: string; size?: number; readOnly?: boolean }) {
  const val = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div className={`inline-flex items-center ${className}`}>
      <Rating style={{ maxWidth: size ? size * 5 + 8 : 100 }} value={val} readOnly={readOnly} items={5} />
    </div>
  );
}
