"use client";

import { motion } from "framer-motion";

type GlowingCardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function GlowingCard({ children, className = "" }: GlowingCardProps) {
  return (
    <motion.div
      className={`relative group ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm" />
      <div className="relative bg-gray-900/50 backdrop-blur-sm border border-white/10 group-hover:border-indigo-500/50 rounded-xl transition-all duration-300">
        {children}
      </div>
    </motion.div>
  );
}
