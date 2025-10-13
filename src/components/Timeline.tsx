"use client";
import { motion } from "framer-motion";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-amber-700"></div>
      
      <div className="space-y-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative flex items-start"
          >
            <div className="absolute left-0 w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            
            <div className="ml-12">
              <div className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-sm font-semibold inline-block mb-2">
                {item.year}
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}