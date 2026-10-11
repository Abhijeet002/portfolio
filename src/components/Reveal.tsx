"use client";

import { MotionConfig, motion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait before animating, for staggering siblings. */
  delay?: number;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Fades content up when it scrolls into view. Lets server components opt into motion
 * without becoming client components themselves. Respects "reduce motion".
 */
export default function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Component = motion[as];
  return (
    <MotionConfig reducedMotion="user">
      <Component
        className={className}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, ease: "easeOut", delay }}
      >
        {children}
      </Component>
    </MotionConfig>
  );
}
