"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const images = [
    { src: "/eggs5.jpg", alt: "Fresh farm eggs" },
    { src: "/eggs4.jpg", alt: "Premium quality eggs" },
    { src: "/chicken-layers5.jpg", alt: "Free-range chickens" },
    { src: "/eggegs.jpg", alt: "Egg production" },
    { src: "/spinash-hero.jpg", alt: "Fresh vegetables" },
    { src: "/eggs-hero.jpg", alt: "Farm fresh eggs" },
    { src: "/plot-hero.jpg", alt: "Farm landscape" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative h-[80vh] min-h-[600px] max-h-[900px] flex items-center overflow-hidden bg-gradient-to-br from-amber-900 via-brown-800 to-orange-900 pt-20 sm:pt-24">
      {/* Background Image Carousel with Overlay */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              className="object-cover opacity-50"
              priority={currentIndex === 0}
              quality={90}
            />
          </motion.div>
        </AnimatePresence>
        {/* Minimal overlay for maximum image visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/25 via-brown-800/20 to-orange-800/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-950/20 via-transparent to-transparent" />
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "w-8 bg-amber-400 shadow-lg shadow-amber-400/50" 
                : "w-1.5 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Decorative elements - warm and earthy */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-amber-400/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl animate-pulse" 
           style={{ animationDelay: '2s' }} 
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-amber-600/20 backdrop-blur-md border border-amber-400/30 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            >
              <span className="w-2 h-2 bg-amber-300 rounded-full animate-pulse shadow-sm shadow-amber-300" />
              <span className="text-amber-50">B-BBEE Level 1 Certified</span>
            </motion.div>

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

          {/* Right Content - Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {[
              { icon: "🥚", title: "A-Grade Eggs", desc: "Fresh daily from free-range hens" },
              { icon: "🥬", title: "Organic Vegetables", desc: "Grown without chemicals" },
              { icon: "🚚", title: "Same-Day Delivery", desc: "Orders before 10am" },
              { icon: "📞", title: "24/7 Support", desc: "+27 73 523 0659" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                className="group bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl hover:bg-white/15 hover:border-white/40 transition-all hover:scale-105 hover:shadow-xl hover:shadow-amber-600/20 cursor-pointer"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-bold text-white mb-1.5 text-base">{item.title}</h3>
                <p className="text-sm text-amber-100">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70"
      >
        <span className="text-xs uppercase tracking-wider font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-9 border-2 border-white/40 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-2 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
