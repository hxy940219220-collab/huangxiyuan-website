"use client";
import { motion, Transition, Easing, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState, useMemo } from 'react';

type BlurTextProps = {
  text?: string;
  segments?: string[];
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: Easing | Easing[];
  onAnimationComplete?: () => void;
  stepDuration?: number;
};

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);

  const keyframes: Record<string, Array<string | number>> = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  segments,
  delay = 45,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.05,
  rootMargin = '0px 0px -4% 0px',
  animationFrom,
  animationTo,
  easing = [0.16, 1, 0.3, 1],
  onAnimationComplete,
  stepDuration = 0.24
}) => {
  const reduced = useReducedMotion();
  const elements = segments ?? (animateBy === 'words' ? text.split(' ') : text.split(''));
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (reduced || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current as Element);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin, reduced]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top' ? { filter: 'blur(6px)', opacity: 0, y: -18 } : { filter: 'blur(6px)', opacity: 0, y: 18 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(2px)',
        opacity: 0.72,
        y: direction === 'top' ? 2 : -2
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  if (reduced) {
    return (
      <p ref={ref} className={`blur-text ${className}`}>
        {segments ? segments.join('') : text}
      </p>
    );
  }

  return (
    <p ref={ref} className={`blur-text ${className} flex flex-wrap`}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition: Transition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing
        };

        return (
          <motion.span
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
            style={{
              display: 'inline-block',
              willChange: 'transform, filter, opacity',
              // iOS WebKit 会把带 filter 的元素裁剪到盒子边界，
              // 斜体字的笔画会被切掉；用 padding 扩大渲染区域、负 margin 抵消布局影响
              padding: '0.2em',
              margin: '-0.2em'
            }}
          >
            {segment === ' ' ? '\u00A0' : segment}
            {!segments && animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </p>
  );
};

export default BlurText;
