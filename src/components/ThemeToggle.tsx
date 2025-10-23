"use client";

import * as React from "react";
import { Sun } from "lucide-react";

export function ThemeToggle() {
  // Theme toggle is disabled - always light mode
  return (
    <div
      className="relative p-2 rounded-xl bg-accent/10 cursor-not-allowed opacity-50"
      aria-label="Light mode enabled"
      title="Dark mode is disabled"
    >
      <Sun className="h-5 w-5" />
      <span className="sr-only">Light mode only</span>
    </div>
  );
}
