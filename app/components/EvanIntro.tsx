"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "motion/react";
import { SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";

/* ------------------------------------------------------------------ */
/* EVAN 开场动画                                                       */
/* 入场 → CSS 故障定格 → 辉光消散 → 露出首页                             */
/* 同一个 DOM 元素贯穿全部阶段，字母位置永远不变                            */
/* 浏览器拦截有声自动播放时先获取一次授权，动画本身约 2.8s                   */
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
const PLAY_EVENT = "hxy:bgm-play";
const PAUSE_EVENT = "hxy:bgm-pause";
const STATE_EVENT = "hxy:bgm-state";

type IntroPhase = "ready" | "entrance" | "hold" | "dissolve" | "done";

export function EvanIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<IntroPhase>("ready");
  const [dismissed, setDismissed] = useState(false);
  const onCompleteRef = useRef(onComplete);
  const phaseRef = useRef<IntroPhase>(phase);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    if (dismissed) return;
    const schedule: Partial<Record<IntroPhase, { next: IntroPhase; delay: number }>> = {
      entrance: { next: "hold", delay: ENTRANCE_TOTAL },
      hold: { next: "dissolve", delay: HOLD_DURATION },
      dissolve: { next: "done", delay: DISSOLVE_DURATION },
    };
    const s = schedule[phase];
    if (!s) return;
    const t = setTimeout(() => {
      if (s.next === "done") {
        setDismissed(true);
        onCompleteRef.current();
      } else {
        setPhase(s.next);
      }
    }, s.delay);
    return () => clearTimeout(t);
  }, [phase, dismissed]);

  useEffect(() => {
    const handleMusicState = (event: Event) => {
      const state = (event as CustomEvent<{ state?: string }>).detail?.state;
      if (state === "playing" && phaseRef.current === "ready") {
        setPhase("entrance");
      }
    };

    window.addEventListener(STATE_EVENT, handleMusicState);
    const syncTimer = window.setTimeout(() => {
      if (document.documentElement.dataset.bgmState === "playing") {
        setPhase("entrance");
      }
    }, 0);

    return () => {
      window.clearTimeout(syncTimer);
      window.removeEventListener(STATE_EVENT, handleMusicState);
    };
  }, []);

  const enterWithMusic = useCallback(() => {
    window.dispatchEvent(new Event(PLAY_EVENT));
    setPhase("entrance");
  }, []);

  const enterMuted = useCallback(() => {
    window.dispatchEvent(new Event(PAUSE_EVENT));
    setPhase("entrance");
  }, []);

  const skip = useCallback(() => {
    if (phase === "entrance" || phase === "hold") setPhase("dissolve");
  }, [phase]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => { if (Math.abs(e.deltaY) > 10) skip(); };
    const onClick = () => skip();
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("click", onClick);
    };
  }, [skip]);

  if (dismissed) return null;

  const isReady = phase === "ready";
  const isHold = phase === "hold";
  const isDissolving = phase === "dissolve";

  // hold 阶段故障 textShadow — 颜色通道大幅分离
  const glitchShadow = (i: number, glow: string) => {
    const altColors = ["rgba(216,76,255,0.55)", "rgba(255,106,26,0.55)", "rgba(0,200,255,0.55)", "rgba(255,216,74,0.55)"];
    const alt = altColors[i];
    return [
      `${i % 2 === 0 ? 6 : -6}px 0 0 ${alt}`,
      `${i % 2 === 0 ? -6 : 6}px 0 0 ${LETTERS[(i + 1) % 4].glow.replace("0.6", "0.45")}`,
      `0 0 30px ${glow}`,
    ].join(", ");
  };

  // 正常辉光
  const normalShadow = (glow: string) => `0 0 60px ${glow}`;

  // 溶解辉光
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
      {/* 背景微光 */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(0,200,255,0.04), transparent 60%)" }}
      />

      {/* 纹理 */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4) 1px, transparent 1px)," +
            "radial-gradient(circle at 70% 60%, rgba(255,255,255,0.3) 1px, transparent 1px)," +
            "radial-gradient(circle at 40% 80%, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "120px 120px, 180px 180px, 150px 150px",
        }}
      />

      {!isReady && (
        <button
          onClick={skip}
          className="absolute top-6 right-6 md:top-8 md:right-8 max-sm:top-auto max-sm:bottom-8 max-sm:left-1/2 max-sm:-translate-x-1/2 z-10 px-4 py-2 rounded-full font-body text-[11px] tracking-[0.1em] uppercase text-text-muted border border-white/[0.08] bg-white/[0.03] transition-all duration-300 hover:text-white hover:border-white/[0.2] hover:bg-white/[0.06]"
        >
          跳过 Skip
        </button>
      )}

      {/* 四字母 — 同一个 span 始终存在，位置永不改变 */}
      <div className="flex items-center gap-4 md:gap-10 px-6">
        {isReady
          ? LETTERS.map((l) => (
              <span
                key={l.letter}
                className="inline-block select-none font-display font-bold italic leading-none opacity-35"
                style={{
                  color: l.color,
                  fontSize: "clamp(6rem, 15vw, 13rem)",
                  textShadow: normalShadow(l.glow),
                }}
              >
                {l.letter}
              </span>
            ))
          : LETTERS.map((l, i) => (
              <motion.span
                key={`${l.letter}-animated`}
                className="font-display italic font-bold leading-none select-none inline-block"
                style={{
                  color: l.color,
                  fontSize: "clamp(6rem, 15vw, 13rem)",
                  textShadow: isDissolving
                    ? dissolveShadow(l.glow)
                    : isHold
                      ? glitchShadow(i, l.glow)
                      : normalShadow(l.glow),
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
                          delay: i * 0.015,
                        },
                      }
                    : isDissolving
                      ? {
                          opacity: { duration: 1.2, delay: i * 0.06, ease: "easeInOut" },
                          filter: { duration: 1.2, delay: i * 0.06, ease: "easeInOut" },
                          scale: { duration: 1.2, delay: i * 0.06, ease: "easeInOut" },
                        }
                      : {
                          opacity: { duration: 0.5, delay: i * ENTRANCE_STAGGER / 1000, ease: [0.16, 1, 0.3, 1] },
                          y: { duration: 0.7, delay: i * ENTRANCE_STAGGER / 1000, ease: [0.16, 1, 0.3, 1] },
                          filter: { duration: 0.7, delay: i * ENTRANCE_STAGGER / 1000, ease: [0.16, 1, 0.3, 1] },
                        }
                }
              >
                {l.letter}
              </motion.span>
            ))}
      </div>

      {isReady && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-[14vh] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-center"
        >
          <p className="whitespace-nowrap font-body text-[10px] tracking-[0.16em] text-text-muted">
            背景音乐将以 10% 音量播放
          </p>
          <button
            type="button"
            onClick={enterWithMusic}
            className="cursor-target inline-flex h-11 items-center gap-2 rounded-full border border-neon-cyan/45 bg-neon-cyan/[0.09] px-5 font-body text-[12px] font-medium tracking-[0.08em] text-neon-cyan transition-[transform,background-color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-neon-cyan/70 hover:bg-neon-cyan/[0.14] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neon-cyan"
          >
            <SpeakerHigh size={16} weight="fill" />
            开启音乐并进入
          </button>
          <button
            type="button"
            data-bgm-silent
            onClick={enterMuted}
            className="inline-flex items-center gap-1.5 font-body text-[10px] tracking-[0.08em] text-text-muted transition-colors duration-300 hover:text-text-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40"
          >
            <SpeakerSlash size={12} />
            静音进入
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
