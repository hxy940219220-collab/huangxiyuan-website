"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "motion/react";

/* ------------------------------------------------------------------ */
/* EVAN 开场动画                                                       */
/* 自动入场 → CSS 故障定格 → 辉光消散 → 露出首页                         */
/* 总时长约 2.8s，滚动或点击可提前跳过                                  */
/* ------------------------------------------------------------------ */

const LETTERS = [
  { letter: "E", color: "#00c8ff", glow: "rgba(0,200,255,0.6)" },
  { letter: "V", color: "#ffd84a", glow: "rgba(255,216,74,0.6)" },
  { letter: "A", color: "#d84cff", glow: "rgba(216,76,255,0.6)" },
  { letter: "N", color: "#ff6a1a", glow: "rgba(255,106,26,0.6)" },
];

const ENTRANCE_STAGGER = 120;
const HOLD_DURATION = 600;
const DISSOLVE_DURATION = 1200;
const ENTRANCE_TOTAL = ENTRANCE_STAGGER * (LETTERS.length - 1) + 600;

type IntroPhase = "entrance" | "hold" | "dissolve" | "done";

export function EvanIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<IntroPhase>("entrance");
  const [dismissed, setDismissed] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (dismissed) return;
    const schedule: Partial<Record<IntroPhase, { next: IntroPhase; delay: number }>> = {
      entrance: { next: "hold", delay: ENTRANCE_TOTAL },
      hold: { next: "dissolve", delay: HOLD_DURATION },
      dissolve: { next: "done", delay: DISSOLVE_DURATION },
    };
    const current = schedule[phase];
    if (!current) return;

    const timer = window.setTimeout(() => {
      if (current.next === "done") {
        setDismissed(true);
        onCompleteRef.current();
      } else {
        setPhase(current.next);
      }
    }, current.delay);

    return () => window.clearTimeout(timer);
  }, [phase, dismissed]);

  const skip = useCallback(() => {
    if (phase === "entrance" || phase === "hold") setPhase("dissolve");
  }, [phase]);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) > 10) skip();
    };
    const onClick = () => skip();
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("click", onClick);
    };
  }, [skip]);

  if (dismissed) return null;

  const isHold = phase === "hold";
  const isDissolving = phase === "dissolve";

  const glitchShadow = (index: number, glow: string) => {
    const altColors = [
      "rgba(216,76,255,0.55)",
      "rgba(255,106,26,0.55)",
      "rgba(0,200,255,0.55)",
      "rgba(255,216,74,0.55)",
    ];
    return [
      `${index % 2 === 0 ? 6 : -6}px 0 0 ${altColors[index]}`,
      `${index % 2 === 0 ? -6 : 6}px 0 0 ${LETTERS[(index + 1) % 4].glow.replace("0.6", "0.45")}`,
      `0 0 30px ${glow}`,
    ].join(", ");
  };

  const normalShadow = (glow: string) => `0 0 60px ${glow}`;
  const dissolveShadow = (glow: string) =>
    `0 0 120px ${glow}, 0 0 240px ${glow.replace("0.6", "0.3")}`;

  return (
    <motion.div
      data-evan-intro
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ background: "#050509" }}
      animate={isDissolving ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: DISSOLVE_DURATION / 1000, ease: "easeInOut" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(0,200,255,0.04), transparent 60%)" }}
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4) 1px, transparent 1px)," +
            "radial-gradient(circle at 70% 60%, rgba(255,255,255,0.3) 1px, transparent 1px)," +
            "radial-gradient(circle at 40% 80%, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "120px 120px, 180px 180px, 150px 150px",
        }}
      />

      <button
        onClick={skip}
        className="absolute top-6 right-6 md:top-8 md:right-8 max-sm:top-auto max-sm:bottom-8 max-sm:left-1/2 max-sm:-translate-x-1/2 z-10 px-4 py-2 rounded-full font-body text-[11px] tracking-[0.1em] uppercase text-text-muted border border-white/[0.08] bg-white/[0.03] transition-all duration-300 hover:text-white hover:border-white/[0.2] hover:bg-white/[0.06]"
      >
        跳过 Skip
      </button>

      <div className="flex items-center gap-4 md:gap-10 px-6">
        {LETTERS.map((letter, index) => (
          <motion.span
            key={letter.letter}
            className="font-display italic font-bold leading-none select-none inline-block"
            style={{
              color: letter.color,
              fontSize: "clamp(6rem, 15vw, 13rem)",
              textShadow: isDissolving
                ? dissolveShadow(letter.glow)
                : isHold
                  ? glitchShadow(index, letter.glow)
                  : normalShadow(letter.glow),
            }}
            initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
            animate={{
              opacity: 1,
              y: 0,
              filter: isHold
                ? ["blur(0px)", "blur(3px)", "blur(0px)", "blur(4px)", "blur(0px)", "blur(2px)", "blur(0px)", "blur(5px)", "blur(0px)", "blur(3px)", "blur(0px)"]
                : isDissolving
                  ? "blur(16px)"
                  : "blur(0px)",
              scale: isDissolving ? 1.08 : 1,
            }}
            transition={
              isHold
                ? {
                    filter: {
                      duration: 0.4,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "linear",
                      delay: index * 0.015,
                    },
                  }
                : isDissolving
                  ? {
                      opacity: { duration: 1.2, delay: index * 0.06, ease: "easeInOut" },
                      filter: { duration: 1.2, delay: index * 0.06, ease: "easeInOut" },
                      scale: { duration: 1.2, delay: index * 0.06, ease: "easeInOut" },
                    }
                  : {
                      opacity: { duration: 0.5, delay: index * ENTRANCE_STAGGER / 1000, ease: [0.16, 1, 0.3, 1] },
                      y: { duration: 0.7, delay: index * ENTRANCE_STAGGER / 1000, ease: [0.16, 1, 0.3, 1] },
                      filter: { duration: 0.7, delay: index * ENTRANCE_STAGGER / 1000, ease: [0.16, 1, 0.3, 1] },
                    }
            }
          >
            {letter.letter}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
