"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/* High-performance scroll-reveal wrapper.
   Animates ONLY GPU-composited `opacity` and `transform` (no `filter: blur()`),
   eliminating texture re-rasterization jank during scroll. */

type RevealVariant = "heading" | "body" | "card" | "cta" | "image";

const VARIANTS: Record<
  RevealVariant,
  { y: number; scale?: number; duration: number; ease: readonly [number, number, number, number] }
> = {
  heading: { y: 18, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  body: { y: 12, duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  card: { y: 16, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  cta: { y: 12, duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  image: { y: 0, scale: 0.98, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
}

export function ScrollReveal({
  children,
  className = "",
  variant,
  delay = 0,
  duration,
}: ScrollRevealProps) {
  const reduced = useReducedMotion();
  const preset = variant ? VARIANTS[variant] : null;

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: preset?.y ?? 14,
        scale: preset?.scale ?? 1,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: duration ?? preset?.duration ?? 0.48,
        delay,
        ease: preset?.ease ?? [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
