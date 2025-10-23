"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Boxes,
  Menu,
  X,
  LogOut,
  Home,
  Settings,
  Bell,
  Search,
} from "lucide-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ThemeToggle } from "@/components/ThemeToggle";

interface DashboardNavProps {
  userName?: string | null;
  userEmail?: string | null;
}

const navigationLinks = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/dashboard/products",
    label: "Products",
    icon: Package,
  },
  {
    href: "/dashboard/orders",
    label: "Orders",
    icon: ShoppingCart,
  },
  {
    href: "/dashboard/customers",
    label: "Customers",
    icon: Users,
  },
  {
    href: "/dashboard/categories",
    label: "Categories",
    icon: Boxes,
  },
  {
    href: "/dashboard/analytics",
    label: "Analytics",
    icon: BarChart3,
  },
];

export function DashboardNav({ userName, userEmail }: DashboardNavProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActiveLink = (href: string, exact?: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 lg:pl-64 z-40 bg-white dark:bg-card border-b border-amber-100 dark:border-border shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <div className="flex items-center gap-8" />

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700/60 dark:text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products, orders..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-amber-200/70 dark:border-input bg-amber-50/30 dark:bg-background text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 dark:focus:ring-ring focus:border-amber-500 dark:focus:border-input"
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Notifications */}
              <button className="relative p-2 rounded-xl hover:bg-amber-50 dark:hover:bg-accent transition-colors">
                <Bell className="w-5 h-5 text-amber-700 dark:text-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-orange-600 rounded-full"></span>
              </button>

              {/* Settings */}
              <button className="hidden sm:block p-2 rounded-xl hover:bg-amber-50 dark:hover:bg-accent transition-colors">
                <Settings className="w-5 h-5 text-amber-700 dark:text-foreground" />
              </button>

              {/* Back to Site */}
              <Link
                href="/"
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl border border-amber-200/70 dark:border-border text-sm font-semibold text-amber-800 dark:text-foreground hover:bg-amber-50 dark:hover:bg-accent transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Back to Site</span>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-amber-50 dark:hover:bg-accent transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-amber-900 dark:text-foreground" />
                ) : (
                  <Menu className="w-6 h-6 text-amber-900 dark:text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden border-t border-amber-100 dark:border-border px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700/60 dark:text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-amber-200/70 dark:border-input bg-amber-50/30 dark:bg-background text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 dark:focus:ring-ring"
            />
          </div>
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 w-64 border-r border-amber-100 dark:border-border bg-white dark:bg-sidebar h-screen overflow-y-auto z-50">
        {/* Sidebar Header with Logo */}
        <div className="p-4 py-2 border-b border-amber-100 dark:border-border">
          <Link href="/" className="flex items-center">
            <div className="relative w-60 h-24 rounded-2xl dark:bg-white p-0">
              <Image
                src="/new-logo.png"
                alt="Mathebula Farm Logo"
                fill
                priority
                className="object-contain drop-shadow-sm"
              />
            </div>
          </Link>
        </div>

        <div className="p-6 space-y-8">
            {/* User Profile */}
            <div className="pb-6 border-b border-amber-100 dark:border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 dark:bg-primary flex items-center justify-center text-white dark:text-primary-foreground font-bold shadow-md">
                  {userName?.charAt(0) ?? "A"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-amber-900 dark:text-sidebar-foreground truncate">
                    {userName ?? "Admin User"}
                  </p>
                  <p className="text-xs text-amber-700/70 dark:text-muted-foreground truncate">
                    {userEmail ?? "admin@farm.com"}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-2">
              <p className="text-xs uppercase tracking-wider font-semibold text-amber-700/70 dark:text-muted-foreground px-3 mb-3">
                Main Menu
              </p>
              {navigationLinks.map((link) => {
                const Icon = link.icon;
                const isActive = isActiveLink(link.href, link.exact);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 dark:bg-amber-600/20 dark:text-amber-400 shadow-sm"
                        : "text-amber-700/80 dark:text-sidebar-foreground hover:bg-amber-50 dark:hover:bg-sidebar-accent/50 hover:text-amber-900 dark:hover:text-sidebar-accent-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-400"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-amber-100 dark:border-border space-y-2">
              <LogoutLink
                postLogoutRedirectURL="/"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-rose-700 dark:text-destructive hover:bg-rose-50 dark:hover:bg-destructive/10 transition-colors w-full"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </LogoutLink>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="lg:hidden fixed inset-0 bg-black/40 z-40"
              />

              {/* Sliding Menu */}
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="lg:hidden fixed left-0 top-16 bottom-0 w-72 bg-white dark:bg-sidebar border-r border-amber-100 dark:border-border shadow-xl z-50 overflow-y-auto"
              >
                <div className="p-6 space-y-6">
                  {/* User Profile */}
                  <div className="pb-6 border-b border-amber-100 dark:border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 dark:bg-primary flex items-center justify-center text-white dark:text-primary-foreground font-bold text-lg shadow-md">
                        {userName?.charAt(0) ?? "A"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-amber-900 dark:text-sidebar-foreground truncate">
                          {userName ?? "Admin User"}
                        </p>
                        <p className="text-xs text-amber-700/70 dark:text-muted-foreground truncate">
                          {userEmail ?? "admin@farm.com"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <nav className="space-y-2">
                    <p className="text-xs uppercase tracking-wider font-semibold text-amber-700/70 dark:text-muted-foreground px-3 mb-3">
                      Main Menu
                    </p>
                    {navigationLinks.map((link) => {
                      const Icon = link.icon;
                      const isActive = isActiveLink(link.href, link.exact);

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all ${
                            isActive
                              ? "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 dark:bg-amber-600/20 dark:text-amber-400 shadow-sm"
                              : "text-amber-700/80 dark:text-sidebar-foreground hover:bg-amber-50 dark:hover:bg-sidebar-accent/50 hover:text-amber-900 dark:hover:text-sidebar-accent-foreground"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span>{link.label}</span>
                        </Link>
                      );
                    })}
                  </nav>

                  {/* Mobile Actions */}
                  <div className="space-y-2">
                    <Link
                      href="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-amber-800 dark:text-sidebar-foreground hover:bg-amber-50 dark:hover:bg-sidebar-accent transition-colors"
                    >
                      <Home className="w-5 h-5" />
                      <span>Back to Site</span>
                    </Link>
                    <button className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-amber-800 dark:text-sidebar-foreground hover:bg-amber-50 dark:hover:bg-sidebar-accent transition-colors w-full">
                      <Settings className="w-5 h-5" />
                      <span>Settings</span>
                    </button>
                  </div>

                  {/* Sign Out */}
                  <div className="pt-6 border-t border-amber-100 dark:border-border">
                    <LogoutLink
                      postLogoutRedirectURL="/"
                      className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-rose-700 dark:text-destructive hover:bg-rose-50 dark:hover:bg-destructive/10 transition-colors w-full"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Sign Out</span>
                    </LogoutLink>
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
    </>
  );
}
