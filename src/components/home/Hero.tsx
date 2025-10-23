"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const heroImage = {
  src: "/eggs-hero.jpg",
  alt: "Farm fresh eggs on hay",
};

export default function Hero() {
  return (
    <section className="relative h-[80vh] min-h-[600px] max-h-[900px] flex items-center overflow-hidden bg-neutral-950 pt-20 sm:pt-24">
      <div className="absolute inset-0">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          quality={90}
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      <div className="absolute -top-10 right-10 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-orange-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white"
          >
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight"
            >
              <span className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Fresh Farm Produce</span>
              <br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-orange-300 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                From Farm to Table
              </span>
            </motion.h1>
            
            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-base sm:text-lg lg:text-xl text-amber-50 mb-8 max-w-xl leading-relaxed"
            >
              Premium A-grade eggs from 5,000 free-range layers and fresh vegetables grown sustainably in Honingnestkrans, Pretoria.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <Link 
                href="/products" 
                className="group relative px-7 py-4 bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 text-white font-bold rounded-xl overflow-hidden transition-all hover:shadow-2xl hover:shadow-amber-600/50 hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
                  Shop Products
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-700 via-amber-700 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              
              <Link 
                href="/contact" 
                className="px-7 py-4 bg-white/10 backdrop-blur-md border-2 border-white/40 text-white font-bold rounded-xl hover:bg-white/20 hover:border-white/60 transition-all hover:scale-105 active:scale-95 text-sm sm:text-base"
              >
                Contact Us
              </Link>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20"
            >
              <div className="text-center sm:text-left">
                <div className="text-3xl sm:text-4xl font-bold text-amber-300 mb-1">5,000+</div>
                <div className="text-xs sm:text-sm text-amber-100">Active Layers</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl sm:text-4xl font-bold text-amber-300 mb-1">100+</div>
                <div className="text-xs sm:text-sm text-amber-100">Daily Customers</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl sm:text-4xl font-bold text-amber-300 mb-1">24h</div>
                <div className="text-xs sm:text-sm text-amber-100">Farm Fresh</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hidden lg:block"
          >
            <div className="relative h-[520px] w-full max-w-xl ml-auto rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
              <Image
                src="/eggs5.jpg"
                alt="Mathebula Farm crates of eggs"
                fill
                className="object-cover"
                quality={95}
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-white flex flex-col gap-1">
                <p className="text-sm uppercase tracking-[0.35em] text-amber-200">Mathebula Farm</p>
                <p className="text-2xl font-semibold">Supplying premium farm-fresh eggs across Gauteng</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>


    </section>
  );
}
