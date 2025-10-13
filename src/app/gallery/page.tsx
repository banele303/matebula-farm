"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";

const images = [
  // Eggs
  { src: "/eggs5.jpg", alt: "Fresh A-grade table eggs", category: "Products" },
  { src: "/eggs4.jpg", alt: "Premium quality eggs", category: "Products" },
  { src: "/eggs-hero.jpg", alt: "Farm fresh eggs", category: "Products" },
  { src: "/egges.jpg", alt: "Egg collection", category: "Products" },
  { src: "/eggegs.jpg", alt: "Fresh eggs display", category: "Products" },
  { src: "/egge-flyers.jpg", alt: "Egg products", category: "Products" },
  
  // Chickens - Layers
  { src: "/chicken-layers5.jpg", alt: "Free-range layer chickens", category: "Farm Life" },
  { src: "/chicken-layers4.jpg", alt: "Healthy layer hens", category: "Farm Life" },
  { src: "/chicken-layers3.jpg", alt: "Chickens in the field", category: "Farm Life" },
  { src: "/chicken-layers2.jpg", alt: "Layer chickens feeding", category: "Farm Life" },
  { src: "/layers-chicken.jpg", alt: "Layer chickens", category: "Farm Life" },
  
  // Chickens - Broilers
  { src: "/broillers7.jpg", alt: "Broiler chickens", category: "Farm Life" },
  { src: "/broillers6.jpg", alt: "Healthy broilers", category: "Farm Life" },
  { src: "/broillers5.jpg", alt: "Broiler farming", category: "Farm Life" },
  { src: "/broillers4.jpg", alt: "Broiler chickens", category: "Farm Life" },
  { src: "/broillers3.jpg", alt: "Young broilers", category: "Farm Life" },
  { src: "/broillers2.jpg", alt: "Broiler flock", category: "Farm Life" },
  { src: "/broillers.jpg", alt: "Broiler production", category: "Farm Life" },
  
  // Vegetables - Spinach
  { src: "/spinash4.jpg", alt: "Fresh spinach harvest", category: "Products" },
  { src: "/spinash3.jpg", alt: "Organic spinach", category: "Products" },
  { src: "/spinash-two.jpg", alt: "Spinach bundles", category: "Products" },
  { src: "/spinash-hero.jpg", alt: "Premium spinach", category: "Products" },
  { src: "/spinansh.jpg", alt: "Fresh green spinach", category: "Products" },
  
  // Infrastructure
  { src: "/finished-house.jpg", alt: "Chicken house facility", category: "Infrastructure" },
  { src: "/finished2.jpg", alt: "Modern farm buildings", category: "Infrastructure" },
  { src: "/shade3.jpg", alt: "Shade structures", category: "Infrastructure" },
  { src: "/shade2.jpg", alt: "Protective shade netting", category: "Infrastructure" },
  { src: "/shade.jpg", alt: "Farm shade areas", category: "Infrastructure" },
  
  // Farm Land
  { src: "/plot-hero.jpg", alt: "Farm landscape view", category: "Farm Life" },
  { src: "/plot4.jpg", alt: "Farming plots", category: "Farm Life" },
  { src: "/plot3.jpg", alt: "Agricultural land", category: "Farm Life" },
  { src: "/plot.jpg", alt: "Farm plots", category: "Farm Life" },
  
  // Team
  { src: "/owner.jpg", alt: "Farm owner", category: "Team" },
  { src: "/owner2.jpg", alt: "Farm management", category: "Team" },
  { src: "/groups-owners.jpg", alt: "Farm team", category: "Team" },
  
  // Other
  { src: "/more.jpg", alt: "Farm activities", category: "Farm Life" },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Farm Life", "Products", "Team", "Infrastructure"];
  const filteredImages = filter === "All" ? images : images.filter(img => img.category === filter);

  return (
    <div>
      <Hero
        title="Gallery"
        subtitle="A visual journey through Mathebula Farm"
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="Our Farm Life" subtitle="Capturing moments of growth, harvest, and community" />
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  filter === category
                    ? "bg-gradient-to-r from-amber-700 to-orange-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-amber-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
                onClick={() => setSelectedImage(image.src)}
              >
                <div className="aspect-square relative bg-gray-200">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
                  <div className="p-4 text-white w-full">
                    <p className="font-semibold">{image.alt}</p>
                    <p className="text-xs text-amber-300">{image.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="relative max-w-5xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full h-[80vh]">
                  <Image
                    src={selectedImage}
                    alt="Gallery image"
                    fill
                    className="object-contain"
                  />
                </div>
                
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <SectionTitle title="Visit Our Farm" />
          <p className="text-lg text-gray-600 mb-6">
            Experience Mathebula Farm firsthand. Contact us to arrange a visit and see our 
            sustainable farming practices in action.
          </p>
          <a
            href="/contact"
            className="inline-block bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-amber-600 hover:via-amber-500 hover:to-orange-500 transition-colors"
          >
            Schedule a Visit
          </a>
        </div>
      </section>
    </div>
  );
}