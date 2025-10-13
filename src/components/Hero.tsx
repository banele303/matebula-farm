"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  children?: ReactNode;
}

export default function Hero({ title, subtitle, backgroundImage, children }: HeroProps) {
  return (
    <section className={`relative py-20 ${backgroundImage ? 'bg-cover bg-center' : 'bg-gradient-to-br from-amber-900 via-brown-800 to-orange-900'}`}
             style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          {title}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl mb-8"
        >
          {subtitle}
        </motion.p>
        
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}