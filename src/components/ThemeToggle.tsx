"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { usePathname } from "next/navigation";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  // On frontend pages, show disabled state
  if (!isDashboard) {
    return (
      <div
        className="relative p-2 rounded-xl bg-accent/10 cursor-not-allowed opacity-50"
        aria-label="Light mode enabled"
        title="Dark mode is only available in dashboard"
      >
        <Sun className="h-5 w-5" />
        <span className="sr-only">Light mode only</span>
      </div>
    );
  }

  // On dashboard, allow theme switching
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative p-2 rounded-xl hover:bg-accent transition-colors"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute top-2 left-2 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
