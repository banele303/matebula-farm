"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";

export default function GallerySection() {
  const galleryImages = [
    { src: "/eggs5.jpg", alt: "Fresh farm eggs", category: "Eggs" },
    { src: "/chicken-layers5.jpg", alt: "Free-range chickens", category: "Chickens" },
    { src: "/spinash3.jpg", alt: "Fresh spinach", category: "Vegetables" },
    { src: "/plot-hero.jpg", alt: "Farm landscape", category: "Farm" },
    { src: "/finished-house.jpg", alt: "Chicken houses", category: "Facilities" },
    { src: "/broillers5.jpg", alt: "Broiler chickens", category: "Chickens" },
    { src: "/spinash4.jpg", alt: "Spinach harvest", category: "Vegetables" },
    { src: "/owner.jpg", alt: "Farm owner", category: "Team" },
    { src: "/shade2.jpg", alt: "Shade structures", category: "Facilities" },
    { src: "/eggs4.jpg", alt: "Premium eggs", category: "Eggs" },
    { src: "/chicken-layers4.jpg", alt: "Layer hens", category: "Chickens" },
    { src: "/broillers4.jpg", alt: "Healthy broilers", category: "Chickens" },
    { src: "/plot3.jpg", alt: "Agricultural land", category: "Farm" },
    { src: "/spinash-hero.jpg", alt: "Organic spinach", category: "Vegetables" },
    { src: "/finished2.jpg", alt: "Farm buildings", category: "Facilities" },
    { src: "/owner2.jpg", alt: "Farm management", category: "Team" },
    { src: "/egges.jpg", alt: "Egg collection", category: "Eggs" },
    { src: "/chicken-layers3.jpg", alt: "Free-range layers", category: "Chickens" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle 
          title="Farm Gallery 📸" 
          subtitle="Take a visual tour of our farm, produce, and operations" 
        />
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="group relative aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm font-semibold">{image.alt}</p>
                  <p className="text-xs text-amber-300">{image.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA to full gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-amber-500/30 transition-all hover:scale-105"
          >
            View Full Gallery
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
