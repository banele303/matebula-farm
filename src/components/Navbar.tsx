"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/products", label: "Products" },
    { href: "/services", label: "Services" },
    { href: "/gallery", label: "Gallery" },
    { href: "/partners", label: "Partners" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-gradient-to-r from-amber-900 via-brown-800 to-orange-900 text-white py-2.5 text-sm border-b border-amber-700/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <a 
                href="tel:+27735230659" 
                className="flex items-center gap-2 hover:text-amber-200 transition-colors group"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="font-medium">+27 73 523 0659</span>
              </a>
              <a 
                href="mailto:info@mathebulafarm.co.za" 
                className="hidden sm:flex items-center gap-2 hover:text-amber-200 transition-colors group"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="font-medium">info@mathebulafarm.co.za</span>
              </a>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1.5 bg-amber-600/30 px-3 py-1.5 rounded-full border border-amber-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 bg-amber-300 rounded-full animate-pulse shadow-sm shadow-amber-300" />
                <span className="font-semibold text-amber-50">B-BBEE Level 1</span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
          <div className="flex justify-between items-center h-20 sm:h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500/15 blur-xl group-hover:bg-amber-500/25 transition-all rounded-full" />
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 transform group-hover:scale-105 transition-transform duration-300">
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
            <div className="hidden lg:flex items-center gap-4">
              <Link 
                href="/contact" 
                className="group relative px-6 py-3 bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 text-white font-bold rounded-xl overflow-hidden transition-all hover:shadow-xl hover:shadow-amber-600/30 hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2 text-sm">
                  Order Now
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-700 via-amber-700 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
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
                  className="pt-4 border-t border-amber-100"
                >
                  <Link
                    href="/contact"
                    className="block px-4 py-3.5 bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 text-white text-center font-bold rounded-xl hover:shadow-lg hover:shadow-amber-600/30 transition-all active:scale-95"
                    onClick={() => setIsOpen(false)}
                  >
                    Order Now →
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}