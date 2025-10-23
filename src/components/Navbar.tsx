"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, UserCircle2 } from "lucide-react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useCart } from "@/hooks/useCart";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, user } = useKindeAuth();
  const { cart } = useCart();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Avoid SSR/CSR markup mismatch by deferring auth-dependent UI until mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  const links = useMemo(() => {
    const baseLinks = [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/products", label: "Shop" },
      { href: "/services", label: "Services" },
      { href: "/gallery", label: "Gallery" },
      { href: "/partners", label: "Partners" },
      { href: "/contact", label: "Contact" },
    ];

    // Only inject Dashboard on client after mount to keep SSR and first client render identical
    if (mounted && isAuthenticated) {
      baseLinks.splice(3, 0, { href: "/dashboard", label: "Dashboard" });
    }

    return baseLinks;
  }, [mounted, isAuthenticated]);

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Main Navigation */}
      <motion.nav 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/98 backdrop-blur-md shadow-lg shadow-amber-900/5 border-b border-amber-100" 
            : "bg-white shadow-md shadow-amber-900/10"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24 sm:h-28">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500/15 blur-xl group-hover:bg-amber-500/25 transition-all rounded-full" />
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 transform group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/new-logo.png"
                    alt="Mathebula Farm Logo"
                    fill
                    className="object-contain drop-shadow-lg"
                    priority
                  />
                </div>
              </div>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2.5 text-amber-900 hover:text-amber-700 font-semibold text-sm tracking-wide transition-colors group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-700 via-amber-600 to-green-600 group-hover:w-full transition-all duration-300 rounded-full" />
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  setIsCartOpen(true);
                }}
                className="relative group flex items-center gap-2 px-4 py-2.5 rounded-xl border border-amber-200/70 text-amber-900 font-semibold text-sm hover:bg-amber-50 transition-colors"
                aria-label="Open cart"
              >
                <ShoppingCart className="w-5 h-5 transition-transform group-hover:scale-105" />
                <span>Cart</span>
                {mounted && (cart?.items?.length ?? 0) > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-orange-600 text-white text-[10px] leading-5 text-center font-bold shadow-md">
                    {cart?.items.length}
                  </span>
                )}
              </Link>

              {mounted && isAuthenticated ? (
                <>
                  <Link
                    href="/account"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-900 text-white font-semibold text-sm hover:bg-amber-800 transition-colors"
                  >
                    <UserCircle2 className="w-5 h-5" />
                    <span>{user?.given_name ?? "My Account"}</span>
                  </Link>
                  <LogoutLink
                    postLogoutRedirectURL="/"
                    className="px-4 py-2.5 text-sm font-semibold text-amber-900 hover:text-amber-700 transition-colors"
                  >
                    Sign out
                  </LogoutLink>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <LoginLink className="px-4 py-2.5 text-sm font-semibold text-amber-900 hover:text-amber-700 transition-colors">
                    Sign in
                  </LoginLink>
                  <RegisterLink className="group relative px-6 py-3 bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 text-white font-bold rounded-xl overflow-hidden transition-all hover:shadow-xl hover:shadow-amber-600/30 hover:scale-105 active:scale-95">
                    <span className="relative z-10 flex items-center gap-2 text-sm">
                      Create account
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-700 via-amber-700 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </RegisterLink>
                </div>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-lg hover:bg-amber-50 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <motion.span 
                  animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-amber-800 rounded-full transition-all"
                />
                <motion.span 
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-full h-0.5 bg-amber-800 rounded-full transition-all"
                />
                <motion.span 
                  animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-amber-800 rounded-full transition-all"
                />
              </div>
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-amber-100 bg-gradient-to-b from-white to-amber-50/30 backdrop-blur-md overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {links.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="block px-4 py-3 text-amber-900 hover:text-amber-700 hover:bg-amber-50 rounded-lg font-semibold transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: links.length * 0.05 }}
                  className="pt-4 border-t border-amber-100 space-y-4"
                >
                  <button
                    onClick={() => {
                      setIsCartOpen(true);
                      setIsOpen(false);
                    }}
                    className="relative w-full px-4 py-3.5 bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 text-white text-center font-bold rounded-xl hover:shadow-lg hover:shadow-amber-600/30 transition-all active:scale-95"
                  >
                    View Cart →
                    {mounted && (cart?.items?.length ?? 0) > 0 && (
                      <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-white text-amber-900 text-[10px] leading-5 text-center font-bold">
                        {cart?.items.length}
                      </span>
                    )}
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-semibold">
                    {isAuthenticated ? (
                      <>
                        <Link
                          href="/account"
                          className="px-4 py-3 bg-white text-amber-900 rounded-xl border border-amber-100 text-center hover:bg-amber-50 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          My Account
                        </Link>
                        <LogoutLink
                          postLogoutRedirectURL="/"
                          className="px-4 py-3 bg-white text-amber-900 rounded-xl border border-amber-100 text-center hover:bg-amber-50 transition-colors"
                        >
                          Sign out
                        </LogoutLink>
                      </>
                    ) : (
                      <>
                        <LoginLink className="px-4 py-3 bg-white text-amber-900 rounded-xl border border-amber-100 text-center hover:bg-amber-50 transition-colors">
                          Sign in
                        </LoginLink>
                        <RegisterLink className="px-4 py-3 bg-white text-amber-900 rounded-xl border border-amber-100 text-center hover:bg-amber-50 transition-colors">
                          Create account
                        </RegisterLink>
                      </>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}