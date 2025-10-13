"use client";
import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";

export default function QualityCertifications() {
  const certifications = [
    { icon: "🏆", title: "B-BBEE Level 1", desc: "Certified transformation leader" },
    { icon: "✓", title: "Quality Tested", desc: "Every batch inspected daily" },
    { icon: "🌱", title: "Sustainable", desc: "Eco-friendly farming practices" },
    { icon: "🚚", title: "Fresh Delivery", desc: "Farm to table in 24hrs" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle 
          title="Quality You Can Trust" 
          subtitle="Certified excellence in everything we do" 
        />
        
        <div className="grid md:grid-cols-4 gap-6">
          {certifications.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1 }} 
              className="bg-cream-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-5xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
