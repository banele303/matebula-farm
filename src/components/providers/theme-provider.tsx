"use client";

import * as React from "react";
import { useEffect, useState } from "react";

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
  const [theme] = useState<Theme>("light");

  useEffect(() => {
    const root = window.document.documentElement;

    // Always force light mode
    root.classList.remove("dark");
    root.classList.add("light");
  }, []);

  const value = {
    theme: "light" as Theme,
    setTheme: (newTheme: Theme) => {
      // Always keep light mode, ignore any theme changes
      localStorage.setItem(storageKey, "light");
      // Suppress unused parameter warning
      void newTheme;
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
