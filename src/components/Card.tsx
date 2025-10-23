"use client";
import { Card as UICard, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";

interface CardProps {
  title: string;
  content: string;
  icon?: string;
  image?: string;
  className?: string;
}

export default function Card({ title, content, icon, image, className = "" }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5 }}
    >
      <UICard className={`h-full hover:shadow-lg transition-shadow ${className}`}>
        {image && (
          <div className="relative h-48 overflow-hidden rounded-t-lg">
            <Image src={image} alt={title} layout="fill" objectFit="cover" />
          </div>
        )}
        
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {icon && <span className="text-2xl">{icon}</span>}
            {title}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <p className="text-gray-600">{content}</p>
        </CardContent>
      </UICard>
    </motion.div>
  );
}