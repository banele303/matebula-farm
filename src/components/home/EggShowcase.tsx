"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function EggShowcase() {
  const features = [
    {
      title: "A-Grade Quality",
      description: "Uniform size, clean shells, rich golden yolks from natural diet"
    },
    {
      title: "Free-Range Birds",
      description: "Chickens roam naturally in open spaces, leading to healthier eggs"
    },
    {
      title: "Daily Collection",
      description: "Maximum 24-hour farm-to-customer freshness guarantee"
    },
    {
      title: "100% Natural",
      description: "No hormones, no antibiotics - just healthy feed and care"
    }
  ];

  const badges = [
    { icon: "🌾", title: "Natural Feed", desc: "Premium grain mix, no chemicals" },
    { icon: "🐔", title: "Happy Chickens", desc: "Spacious, clean coops" },
    { icon: "🔬", title: "Quality Tested", desc: "Every batch inspected" },
    { icon: "📦", title: "Careful Packaging", desc: "Protected delivery" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-block bg-orange-200 text-orange-900 px-4 py-2 rounded-full text-sm font-bold mb-4">
              OUR BESTSELLER
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">A-Grade Table Eggs 🥚</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From 5,000 healthy, free-range layers - each egg meets strict A-grade quality standards
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/eggs5.jpg" alt="Fresh table eggs" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border-2 border-amber-600 hidden sm:block">
              <div className="text-3xl font-bold text-amber-700">5,000+</div>
              <div className="text-sm text-gray-600">Active Layers</div>
            </div>
            <div className="absolute -top-6 -right-6 bg-gradient-to-r from-amber-700 to-orange-600 text-white p-4 rounded-xl shadow-xl hidden sm:block">
              <div className="text-3xl font-bold">A-Grade</div>
              <div className="text-sm">Quality Certified</div>
            </div>
            
            {/* Mobile version - badges below image */}
            <div className="flex gap-4 mt-4 sm:hidden">
              <div className="flex-1 bg-white p-3 rounded-lg shadow-lg border-2 border-amber-600 text-center">
                <div className="text-2xl font-bold text-amber-700">5,000+</div>
                <div className="text-xs text-gray-600">Active Layers</div>
              </div>
              <div className="flex-1 bg-gradient-to-r from-amber-700 to-orange-600 text-white p-3 rounded-lg shadow-lg text-center">
                <div className="text-2xl font-bold">A-Grade</div>
                <div className="text-xs">Quality Certified</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Why Our Eggs Stand Out</h3>
            <div className="bg-gray-50 p-6 rounded-xl mb-6 space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-amber-100 text-amber-700 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <p className="text-sm text-gray-600 mb-1">Available in:</p>
                <p className="font-bold text-gray-800 text-lg">Trays of 30</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <p className="text-sm text-gray-600 mb-1">Bulk orders:</p>
                <p className="font-bold text-gray-800 text-lg">Special Pricing</p>
              </div>
            </div>
            <Link href="/contact" className="inline-block bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 text-white px-8 py-4 rounded-lg hover:from-amber-600 hover:via-amber-500 hover:to-orange-500 transition-colors font-bold shadow-lg">
              Order Eggs Now →
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mt-12">
          {badges.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
