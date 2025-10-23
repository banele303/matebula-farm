"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import SaleCountdown from "@/components/products/SaleCountdown";

type GalleryImage = {
  url: string;
  altText?: string | null;
};

type ProductGalleryProps = {
  name: string;
  images: GalleryImage[];
  isFeatured?: boolean;
  unit?: string | null;
  saleEndsAt?: string | null; // ISO string if on sale
};

export default function ProductGallery({ name, images, isFeatured, unit, saleEndsAt }: ProductGalleryProps) {
  const safeImages = images && images.length > 0 ? images : [{ url: "/eggs5.jpg", altText: name }];
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  // Close modal on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, safeImages.length - 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    }
    if (open) {
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [open, safeImages.length]);

  const current = safeImages[index];

  return (
    <div className="w-full">
      {/* Main image area - reduced size with 4:3 ratio */}
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl border border-amber-100">
        <Image src={current.url} alt={current.altText || name} fill className="object-cover" priority />

        {/* Bottom overlay: chips and countdown */}
        <div className="absolute left-4 right-4 bottom-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {isFeatured && (
              <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold text-amber-900 ring-1 ring-amber-200/60">
                FEATURED
              </span>
            )}
            {unit && (
              <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-800 ring-1 ring-amber-200/60">
                {unit}
              </span>
            )}
          </div>
          {saleEndsAt ? <SaleCountdown saleEndsAt={saleEndsAt} /> : null}
        </div>

        {/* View large button */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute top-3 right-3 rounded-md bg-white/90 text-amber-900 text-xs font-semibold px-2.5 py-1 shadow-sm ring-1 ring-amber-200 hover:bg-white"
          aria-label="View image larger"
        >
          View large
        </button>

        {/* Click main image to open */}
        <button
          type="button"
          className="absolute inset-0"
          aria-label="Open image viewer"
          onClick={() => setOpen(true)}
        />
      </div>

      {/* Thumbnails - horizontal scroll */}
      {safeImages.length > 1 && (
        <div className="mt-3 -mx-1 overflow-x-auto">
          <div className="px-1 flex items-center gap-3">
            {safeImages.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`relative flex-shrink-0 rounded-xl overflow-hidden border ${
                  i === index ? "border-amber-500 ring-2 ring-amber-200" : "border-amber-100"
                }`}
                style={{ width: 88, height: 66 }}
                aria-label={`View image ${i + 1}`}
              >
                <Image src={img.url} alt={img.altText || name} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Modal viewer */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-[92vw] max-w-5xl max-h-[86vh] aspect-[4/3] md:aspect-video bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={current.url} alt={current.altText || name} fill className="object-contain" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 rounded-md bg-white/90 text-amber-900 text-xs font-semibold px-2.5 py-1 shadow-sm ring-1 ring-amber-200 hover:bg-white"
              aria-label="Close viewer"
            >
              Close
            </button>

            {/* Prev/Next controls */}
            {safeImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setIndex((i) => Math.max(i - 1, 0))}
                  disabled={index === 0}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-md bg-white/80 text-amber-900 text-sm font-semibold px-2.5 py-1.5 shadow-sm ring-1 ring-amber-200 disabled:opacity-50"
                  aria-label="Previous image"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() => setIndex((i) => Math.min(i + 1, safeImages.length - 1))}
                  disabled={index === safeImages.length - 1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-white/80 text-amber-900 text-sm font-semibold px-2.5 py-1.5 shadow-sm ring-1 ring-amber-200 disabled:opacity-50"
                  aria-label="Next image"
                >
                  Next
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
