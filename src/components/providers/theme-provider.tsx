"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
};

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  storageKey = "mathebula-farm-theme",
  ...props
}: ThemeProviderProps) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    if (!isDashboard) return "light"; // Always light for frontend
    return (localStorage.getItem(storageKey) as Theme) || "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;

    // Frontend pages: always light mode
    if (!isDashboard) {
      root.classList.remove("dark");
      root.classList.add("light");
      return;
    }

    // Dashboard pages: support theme switching
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme, isDashboard]);

  const value = {
    theme: isDashboard ? theme : ("light" as Theme),
    setTheme: (newTheme: Theme) => {
      if (!isDashboard) return; // Ignore theme changes on frontend
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext);

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
