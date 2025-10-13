"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";

export default function CustomerTestimonials() {
  const testimonials = [
    {
      name: "Chef Michael Ndlovu",
      role: "Head Chef, Kung-Fu Kitchen",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80",
      text: "We've been using Mathebula Farm eggs for 2 years now. The quality is consistently outstanding - our customers can taste the difference.",
      rating: 5
    },
    {
      name: "Sarah Mokoena",
      role: "Local Resident & Mom of 3",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
      text: "I switched to Mathebula Farm a year ago and never looked back. The eggs are incredibly fresh and the delivery service is fantastic!",
      rating: 5
    },
    {
      name: "David Maluleke",
      role: "Restaurant Owner, Oppiplaas",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
      text: "As a farm-to-table restaurant, partnering with Mathebula Farm was perfect. Their vegetables are always fresh and they truly care about quality.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle 
          title="What Our Customers Say" 
          subtitle="Real feedback from people who trust us" 
        />
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((review, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.15 }} 
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image 
                    src={review.image} 
                    alt={review.name} 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div>
                  <div className="font-bold text-gray-900">{review.name}</div>
                  <div className="text-sm text-gray-600">{review.role}</div>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 italic">&ldquo;{review.text}&rdquo;</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
