"use client";
import Image from "next/image";
import { useState } from "react";

interface FarmImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
}

export default function FarmImage({ src, alt, className = "", fill, width, height, priority }: FarmImageProps) {
  const [error, setError] = useState(false);
  
  const fallback = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80";
  
  return fill ? (
    <Image
      src={error ? fallback : src}
      alt={alt}
      fill
      className={className}
      onError={() => setError(true)}
      priority={priority}
    />
  ) : (
    <Image
      src={error ? fallback : src}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      onError={() => setError(true)}
      priority={priority}
    />
  );
}