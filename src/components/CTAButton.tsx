"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface CTAButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

export default function CTAButton({ href, onClick, children, variant = "default", size = "default" }: CTAButtonProps) {
  const buttonClass = variant === "outline" 
    ? "border-white text-white hover:bg-white hover:text-amber-900" 
    : "bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 text-white hover:from-amber-600 hover:via-amber-500 hover:to-orange-500";

  const content = (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        className={buttonClass}
        size={size}
        onClick={onClick}
      >
        {children}
      </Button>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href}>
        {content}
      </a>
    );
  }

  return content;
}