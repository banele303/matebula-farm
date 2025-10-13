"use client";
import { motion } from "framer-motion";

const stats = [
  { number: "5,000+", label: "Active Layers", icon: "🐔" },
  { number: "50,000", label: "2026 Goal", icon: "🎯" },
  { number: "100+", label: "Daily Customers", icon: "👥" },
  { number: "Level 1", label: "B-BBEE Certified", icon: "🏆" }
];

export default function Stats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="bg-white rounded-lg p-6 shadow-lg text-center"
        >
          <div className="text-4xl mb-2">{stat.icon}</div>
          <div className="text-3xl font-bold text-amber-700 mb-1">{stat.number}</div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}