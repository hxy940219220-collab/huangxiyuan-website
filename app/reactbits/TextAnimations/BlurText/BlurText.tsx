"use client";
import { motion, type Easing, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type BlurTextProps = {
  text?: string;
  segments?: string[];
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  easing?: Easing | Easing[];
  onAnimationComplete?: () => void;
  stepDuration?: number;
};

const BlurText: React.FC<BlurTextProps> = ({
  text = "",
  segments,
  delay = 45,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.08,
  rootMargin = "0px 0px -4% 0px",
  easing = [0.16, 1, 0.3, 1],
  onAnimationComplete,
  stepDuration = 0.42,
}) => {
  const reduced = useReducedMotion();
  const elements = segments ?? (animateBy === "words" ? text.split(" ") : text.split(""));
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (reduced || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin, reduced]);

  if (reduced) {
    return (
      <p ref={ref} className={`blur-text ${className}`}>
        {segments ? segments.join("") : text}
      </p>
    );
  }

  const initialY = direction === "top" ? -12 : 12;

  return (
    <p ref={ref} className={`blur-text ${className} flex flex-wrap`}>
      {elements.map((segment, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: initialY }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: initialY }}
          transition={{
            duration: stepDuration,
            delay: (index * delay) / 1000,
            ease: easing,
          }}
          onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
          style={{ display: "inline-block" }}
        >
          {segment === " " ? "\u00A0" : segment}
          {!segments && animateBy === "words" && index < elements.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </p>
  );
};

export default BlurText;
