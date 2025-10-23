"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      theme="light"
      position="top-right"
      toastOptions={{
        classNames: {
          toast: "bg-white border-amber-100",
          title: "text-amber-900",
          description: "text-amber-700/70",
          actionButton: "bg-amber-600 text-white",
          cancelButton: "bg-amber-100 text-amber-900",
          closeButton: "bg-amber-100 text-amber-900",
          error: "bg-red-50 border-red-200",
          success: "bg-emerald-50 border-emerald-200",
          warning: "bg-orange-50 border-orange-200",
        },
      }}
    />
  );
}
