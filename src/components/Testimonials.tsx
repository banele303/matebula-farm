"use client";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Restaurant Owner",
    text: "The quality of eggs from Mathebula Farm is consistently excellent. Our customers notice the difference!",
    rating: 5
  },
  {
    name: "David Mokoena",
    role: "Local Resident",
    text: "Fresh vegetables delivered right to my door. The Help a Farmer program has truly transformed our community.",
    rating: 5
  },
  {
    name: "Chef Michael",
    role: "Head Chef, Kung-Fu Kitchen",
    text: "We've been sourcing from Mathebula Farm for 2 years. Their produce quality and reliability are unmatched.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {testimonials.map((t, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.2 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="flex mb-3">
            {[...Array(t.rating)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-xl">★</span>
            ))}
          </div>
          <p className="text-gray-700 italic mb-4">"{t.text}"</p>
          <div className="border-t pt-4">
            <p className="font-bold text-gray-800">{t.name}</p>
            <p className="text-sm text-gray-500">{t.role}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}