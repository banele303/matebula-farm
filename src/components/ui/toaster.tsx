"use client";

import { Toaster as Sonner } from "sonner";
import { useTheme } from "next-themes";

export function Toaster() {
  const { theme } = useTheme();

  return (
    <Sonner
      theme={theme as "light" | "dark" | "system"}
      position="top-right"
      toastOptions={{
        classNames: {
          toast: "bg-white dark:bg-card border-amber-100 dark:border-border",
          title: "text-amber-900 dark:text-foreground",
          description: "text-amber-700/70 dark:text-muted-foreground",
          actionButton: "bg-amber-600 text-white",
          cancelButton: "bg-amber-100 dark:bg-muted text-amber-900 dark:text-foreground",
          closeButton: "bg-amber-100 dark:bg-muted text-amber-900 dark:text-foreground",
          error: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900",
          success: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900",
          warning: "bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900",
        },
      }}
    />
  );
}
