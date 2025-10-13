"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";

export default function VegetableShowcase() {
  const vegetables = [
    {
      img: "/spinash3.jpg",
      name: "Fresh Spinach",
      badge: "Year-Round",
      badgeColor: "bg-green-500",
      desc: "Dark green, nutrient-rich leaves packed with iron, vitamins A, C, and K",
      features: ["High in iron & vitamins", "Available year-round", "Sold per kg", "Bulk discounts available"]
    },
    {
      img: "/spinash4.jpg",
      name: "Garden Beetroot",
      badge: "In Season",
      badgeColor: "bg-red-500",
      desc: "Sweet, earthy root vegetable packed with antioxidants and natural nitrates",
      features: ["Rich in antioxidants", "Seasonal availability", "Fresh or pre-washed", "Restaurant-quality"]
    },
    {
      img: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&q=80",
      name: "Bell Peppers",
      badge: "Available",
      badgeColor: "bg-yellow-500",
      desc: "Crisp, colorful peppers in red, yellow, and green varieties",
      features: ["Multiple colors", "High in vitamin C", "Peak season: Summer", "Perfect for any dish"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-cream-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle 
          title="Fresh Seasonal Vegetables 🥬" 
          subtitle="Grown with care, harvested at peak freshness for maximum nutrition" 
        />
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {vegetables.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.15 }} 
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all group p-1"
            >
              <div className="relative h-56 overflow-hidden rounded-lg mb-2">
                <Image 
                  src={item.img} 
                  alt={item.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className={`absolute top-4 right-4 ${item.badgeColor} text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg`}>
                  {item.badge}
                </div>
              </div>
              <div className="px-2 pb-2">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-3 text-sm">{item.desc}</p>
                <div className="border-t pt-3 space-y-2">
                  {item.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-amber-700">•</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            More Fresh Produce Available
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4 text-amber-900 flex items-center gap-2">
                <span>🌱</span> Available Throughout the Year:
              </h4>
              <div className="space-y-3">
                {[
                  { name: "Tomatoes", desc: "Vine-ripened and flavorful" },
                  { name: "Lettuce", desc: "Crisp and fresh varieties" },
                  { name: "Carrots", desc: "Sweet and crunchy" },
                  { name: "Onions", desc: "Red and white varieties" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-amber-700 mt-1">✓</span>
                    <div>
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-orange-800 flex items-center gap-2">
                <span>🍂</span> Seasonal Specials:
              </h4>
              <div className="space-y-3">
                {[
                  { name: "Butternut Squash", desc: "Best in winter months" },
                  { name: "Green Beans", desc: "Fresh in summer" },
                  { name: "Broccoli", desc: "Spring and fall harvest" },
                  { name: "Cauliflower", desc: "Cool season crop" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-orange-600 mt-1">◆</span>
                    <div>
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center mt-8 pt-8 border-t">
            <p className="text-gray-600 mb-4">
              Can&apos;t find what you&apos;re looking for? Contact us for custom orders!
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 text-white px-8 py-3 rounded-lg hover:from-amber-600 hover:via-amber-500 hover:to-orange-500 transition-colors font-bold"
            >
              Request Custom Order
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
