"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type QuantitySelectorProps = {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  className?: string;
  size?: "sm" | "md";
};

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max,
  className,
  size = "md",
}: QuantitySelectorProps) {
  const [input, setInput] = useState(String(value));

  useEffect(() => {
    setInput(String(value));
  }, [value]);

  const btnCls = cn(
    "inline-flex items-center justify-center select-none rounded-md border border-amber-200 bg-white text-amber-900 font-semibold",
    size === "sm" ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm",
  );
  const inputCls = cn(
    "w-14 text-center border-y border-amber-200 bg-white text-amber-900 font-semibold outline-none",
    size === "sm" ? "h-8 text-xs" : "h-10 text-sm",
  );

  function clamp(n: number) {
    if (Number.isNaN(n)) return min;
    if (n < min) return min;
    if (typeof max === "number" && n > max) return max;
    return Math.floor(n);
  }

  function dec() {
    onChange(clamp(value - 1));
  }
  function inc() {
    onChange(clamp(value + 1));
  }

  function onBlur() {
    const next = clamp(parseInt(input, 10));
    setInput(String(next));
    if (next !== value) onChange(next);
  }

  return (
    <div className={cn("inline-flex items-center rounded-md overflow-hidden", className)}>
      <button type="button" className={btnCls} onClick={dec} aria-label="Decrease quantity" disabled={value <= min}>
        −
      </button>
      <input
        inputMode="numeric"
        pattern="[0-9]*"
        className={inputCls}
        value={input}
        onChange={(e) => setInput(e.target.value.replace(/[^0-9]/g, ""))}
        onBlur={onBlur}
        aria-label="Quantity"
      />
      <button type="button" className={btnCls} onClick={inc} aria-label="Increase quantity" disabled={typeof max === "number" ? value >= max : false}>
        +
      </button>
    </div>
  );
}
