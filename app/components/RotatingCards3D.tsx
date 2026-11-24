"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useReducedMotion } from "motion/react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

/* ------------------------------------------------------------------ */
/* 3D 旋转卡片 — 按需 rAF 驱动（静止时 0% CPU）+ 无 3D 内置 blur 掉帧    */
/* ------------------------------------------------------------------ */

interface CardData {
  num: string;
  id: string;
  title: string;
  desc: string;
  tags: string[];
  gradient: string;
  accentBorder: string;
  glowColor: string;
  iconSrc: string;
  iconAlt: string;
}

const CARDS: CardData[] = [
  {
    num: "01",
    id: "tool-gpt",
    title: "GPT",
    desc: "用 GPT-6.2 Astra 做复杂推理、产品研究和代码评审；日常迭代可用 GPT-6.2 Sol。",
    tags: ["GPT-6.2 Astra", "GPT-6.2 Sol"],
    gradient:
      "radial-gradient(circle at 28% 24%, rgba(0,200,255,0.22), transparent 26%), radial-gradient(circle at 76% 60%, rgba(0,180,230,0.14), transparent 30%)",
    accentBorder: "rgba(0,200,255,0.38)",
    glowColor: "rgba(0,200,255,0.45)",
    iconSrc: "/tools/gpt.svg",
    iconAlt: "ChatGPT / OpenAI 图标",
  },
  {
    num: "02",
    id: "tool-claude",
    title: "Claude",
    desc: "用 Claude Fable 5.2 拆解复杂技术问题，用 Claude Opus 5.5 做架构评审与长任务规划。",
    tags: ["Fable 5.2", "Opus 5.5"],
    gradient:
      "radial-gradient(circle at 24% 28%, rgba(216,76,255,0.20), transparent 28%), radial-gradient(circle at 72% 72%, rgba(180,50,230,0.14), transparent 26%)",
    accentBorder: "rgba(216,76,255,0.38)",
    glowColor: "rgba(216,76,255,0.45)",
    iconSrc: "/tools/claude.svg",
    iconAlt: "Claude 图标",
  },
  {
    num: "03",
    id: "tool-grok-bot",
    title: "Grok Bot",
    desc: "在云端环境按授权完成定期信息整理与跨应用跟进，关键动作保留人工审批。",
    tags: ["Personal Agent", "任务授权"],
    gradient:
      "radial-gradient(circle at 24% 28%, rgba(40,220,178,0.18), transparent 28%), radial-gradient(circle at 74% 68%, rgba(0,200,255,0.12), transparent 28%)",
    accentBorder: "rgba(40,220,178,0.40)",
    glowColor: "rgba(40,220,178,0.45)",
    iconSrc: "/tools/grok.svg",
    iconAlt: "Grok 图标",
  },
  {
    num: "04",
    id: "tool-gemini",
    title: "Gemini",
    desc: "用 Gemini 4 Carbon 对照文档、图表与界面截图完成多模态研究并核实结论依据。",
    tags: ["Gemini 4 Carbon", "多模态研究"],
    gradient:
      "radial-gradient(circle at 26% 34%, rgba(255,216,74,0.20), transparent 28%), radial-gradient(circle at 70% 30%, rgba(220,180,50,0.14), transparent 28%)",
    accentBorder: "rgba(255,216,74,0.38)",
    glowColor: "rgba(255,216,74,0.45)",
    iconSrc: "/tools/gemini.svg",
    iconAlt: "Google Gemini 图标",
  },
  {
    num: "05",
    id: "tool-deepseek-harness",
    title: "DeepSeek Harness",
    desc: "用 DeepSeek V4.1 Flash 辅助阅读代码、定位改动与运行测试，结合执行轨迹核验结果。",
    tags: ["DeepSeek V4.1 Flash", "执行轨迹"],
    gradient:
      "radial-gradient(circle at 24% 24%, rgba(0,90,255,0.22), transparent 28%), radial-gradient(circle at 66% 36%, rgba(30,110,255,0.14), transparent 28%)",
    accentBorder: "rgba(74,144,255,0.40)",
    glowColor: "rgba(74,144,255,0.45)",
    iconSrc: "/tools/deepseek.svg",
    iconAlt: "DeepSeek 图标",
  },
  {
    num: "06",
    id: "tool-typeless",
    title: "Typeless",
    desc: "把自然口述想法实时整理为结构化需求文档、会议纪要与给 Agent 的任务说明。",
    tags: ["语音输入", "任务说明"],
    gradient:
      "radial-gradient(circle at 28% 30%, rgba(255,106,26,0.20), transparent 28%), radial-gradient(circle at 68% 64%, rgba(230,90,20,0.14), transparent 28%)",
    accentBorder: "rgba(255,106,26,0.38)",
    glowColor: "rgba(255,106,26,0.45)",
    iconSrc: "/tools/typeless.png",
    iconAlt: "Typeless 图标",
  },
];

const CARD_COUNT = CARDS.length;
const ANGLE_PER_CARD = 360 / CARD_COUNT;

function CardFace({ card, isFront }: { card: CardData; isFront: boolean }) {
  return (
    <div className="relative z-10 flex h-full flex-col p-6 md:p-7">
      <div className="flex items-center justify-between">
        <span className="font-display text-[12px] tabular-nums uppercase tracking-[0.16em] text-text-muted">
          {card.num}
        </span>
        <span
          className="inline-flex h-10 w-10 items-center justify-center rounded-[11px] border bg-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors duration-250"
          style={{
            borderColor: isFront ? card.accentBorder : "rgba(255,255,255,0.12)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.iconSrc}
            alt={card.iconAlt}
            width={22}
            height={22}
            className="h-[22px] w-[22px] object-contain"
          />
        </span>
      </div>
      <h3
        className="card-display-title mt-4 md:mt-5 font-display text-balance leading-[1.14] text-[#f5f7ff]"
        style={{
          fontSize: "clamp(1.38rem, 1.65vw, 1.7rem)",
        }}
      >
        {card.title}
      </h3>
      <p className="mt-3 md:mt-4 font-body text-[13px] leading-[1.74] text-text-secondary/85 [overflow-wrap:anywhere]">
        {card.desc}
      </p>
      <div className="mt-auto pt-5 md:pt-7">
        <div className="flex flex-wrap gap-1.5">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.14] bg-white/[0.04] px-2.5 py-1 font-body text-[10.5px] tracking-[0.04em] text-text-tertiary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function RotatingCards3D() {
  const reduced = useReducedMotion();
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, rotation: 0, moved: false });
  const ringRef = useRef<HTMLDivElement>(null);
  const displayRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef(0);

  const snapToNearest = useCallback((rot: number) => {
    return Math.round(rot / ANGLE_PER_CARD) * ANGLE_PER_CARD;
  }, []);

  // 按需启动插值动画，到位即停，静止时完全不占用主线程
  const startSettleLoop = useCallback(() => {
    if (reduced || rafRef.current !== 0) return;

    const step = () => {
      const ring = ringRef.current;
      if (!ring) {
        rafRef.current = 0;
        return;
      }
      const displayed = displayRef.current;
      const target = targetRef.current;
      const diff = target - displayed;

      if (Math.abs(diff) < 0.05) {
        displayRef.current = target;
        ring.style.transform = `rotateY(${-target}deg)`;
        rafRef.current = 0;
        return;
      }

      const next = displayed + diff * 0.2;
      displayRef.current = next;
      ring.style.transform = `rotateY(${-next}deg)`;
      rafRef.current = window.requestAnimationFrame(step);
    };

    rafRef.current = window.requestAnimationFrame(step);
  }, [reduced]);

  useEffect(() => {
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const rotateToIndex = useCallback(
    (index: number) => {
      if (reduced) return;
      const snapped = snapToNearest(targetRef.current);
      const targetCard = index * ANGLE_PER_CARD;
      const delta = ((((targetCard - snapped) % 360) + 540) % 360) - 180;
      const destination = snapped + delta;
      targetRef.current = destination;
      setRotation(destination);
      startSettleLoop();
    },
    [reduced, snapToNearest, startSettleLoop]
  );

  const rotateTo = useCallback(
    (direction: "prev" | "next") => {
      if (reduced) return;
      const delta = direction === "next" ? ANGLE_PER_CARD : -ANGLE_PER_CARD;
      targetRef.current = snapToNearest(targetRef.current) + delta;
      setRotation(targetRef.current);
      startSettleLoop();
    },
    [reduced, snapToNearest, startSettleLoop]
  );

  useEffect(() => {
    const handleSelectTool = (event: Event) => {
      const toolId = (event as CustomEvent<string>).detail;
      const idx = CARDS.findIndex((c) => c.id === toolId);
      if (idx >= 0) rotateToIndex(idx);
    };
    window.addEventListener("hxy:select-tool", handleSelectTool);
    return () => window.removeEventListener("hxy:select-tool", handleSelectTool);
  }, [rotateToIndex]);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
      if (reduced) return;
      if ((event.target as HTMLElement).closest("button")) return;
      setIsDragging(true);
      dragStartRef.current = { x: event.clientX, rotation: targetRef.current, moved: false };
      (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
    },
    [reduced]
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (!isDragging || reduced) return;
      const dx = event.clientX - dragStartRef.current.x;
      if (Math.abs(dx) > 6) dragStartRef.current.moved = true;
      const nextRotation = dragStartRef.current.rotation - dx * 0.38;
      targetRef.current = nextRotation;
      displayRef.current = nextRotation;
      if (ringRef.current) {
        ringRef.current.style.transform = `rotateY(${-nextRotation}deg)`;
      }
    },
    [isDragging, reduced]
  );

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    const snapped = snapToNearest(targetRef.current);
    targetRef.current = snapped;
    setRotation(snapped);
    startSettleLoop();
  }, [isDragging, snapToNearest, startSettleLoop]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        rotateTo("prev");
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        rotateTo("next");
      }
    },
    [rotateTo]
  );

  const normalizedRotation = ((rotation % 360) + 360) % 360;
  const frontIndex = Math.round(normalizedRotation / ANGLE_PER_CARD) % CARD_COUNT;

  return (
    <div
      tabIndex={0}
      role="region"
      aria-label="AI 工具栈卡片轮播，支持拖拽或左右方向键切换"
      onKeyDown={handleKeyDown}
      className="relative w-full select-none outline-none focus-visible:ring-1 focus-visible:ring-neon-cyan/50 rounded-3xl [--ring-radius:210px] md:[--ring-radius:340px]"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ touchAction: "pan-y" }}
    >
      <div
        className="relative mx-auto overflow-visible"
        style={{
          perspective: "1600px",
          perspectiveOrigin: "50% 48%",
          height: "clamp(21.5rem, 42vw, 26rem)",
          maxWidth: "1200px",
        }}
      >
        {!reduced && (
          <>
            <button
              type="button"
              onClick={() => rotateTo("prev")}
              className="cursor-target hidden md:flex absolute left-3 z-[80] h-12 w-12 -translate-y-1/2 top-1/2 items-center justify-center rounded-full border border-white/[0.14] bg-[#0b0b14]/90 text-white/60 shadow-lg transition-colors duration-200 hover:border-neon-cyan/45 hover:text-white cursor-pointer"
              aria-label="上一张工具卡片"
            >
              <CaretLeft size={21} weight="light" />
            </button>
            <button
              type="button"
              onClick={() => rotateTo("next")}
              className="cursor-target hidden md:flex absolute right-3 z-[80] h-12 w-12 -translate-y-1/2 top-1/2 items-center justify-center rounded-full border border-white/[0.14] bg-[#0b0b14]/90 text-white/60 shadow-lg transition-colors duration-200 hover:border-neon-cyan/45 hover:text-white cursor-pointer"
              aria-label="下一张工具卡片"
            >
              <CaretRight size={21} weight="light" />
            </button>
          </>
        )}

        <div
          className="absolute left-1/2 top-3"
          style={{
            width: "min(32rem, 80vw)",
            height: "22rem",
            transform: "translateX(-50%)",
            transformStyle: "preserve-3d",
            transformOrigin: "50% 50%",
            pointerEvents: "none",
          }}
        >
          <div
            ref={ringRef}
            className="absolute inset-0 will-change-transform"
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateY(0deg)",
            }}
          >
            {CARDS.map((card, index) => {
              const cardAngle = index * ANGLE_PER_CARD;
              const relativeAngle = (((cardAngle - normalizedRotation) % 360) + 360) % 360;
              const cosAngle = Math.cos((relativeAngle * Math.PI) / 180);
              const frontness = Math.max(0, cosAngle);
              const isRear = cosAngle <= 0.02;
              const isFront = index === frontIndex;
              const opacity = isRear ? 0 : 0.34 + frontness * 0.66;
              const z = Math.round(30 + (cosAngle + 1) * 20);

              let scale: number;
              if (relativeAngle < 36 || relativeAngle > 324) {
                scale = 1.04;
              } else if (relativeAngle < 108 || relativeAngle > 252) {
                scale = 0.88;
              } else {
                scale = 0.72;
              }

              return (
                <div
                  id={card.id}
                  key={card.num}
                  onClick={() => {
                    if (!dragStartRef.current.moved && !isFront && !isRear) {
                      rotateToIndex(index);
                    }
                  }}
                  className="scroll-mt-24 absolute rounded-[24px] border text-left w-[min(19.5rem,74vw)] md:w-[min(21.5rem,36vw)] transition-opacity duration-200"
                  style={{
                    height: "clamp(18rem, 33vw, 21.5rem)",
                    left: "50%",
                    top: "0px",
                    transform: `translateX(-50%) rotateY(${cardAngle}deg) translateZ(var(--ring-radius)) scale(${scale.toFixed(2)})`,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    borderColor: isFront ? card.accentBorder : "rgba(255,255,255,0.11)",
                    boxShadow: isFront
                      ? `0 16px 48px rgba(0,0,0,0.5), 0 0 32px ${card.glowColor.replace("0.45", "0.14")}, inset 0 1px 0 rgba(255,255,255,0.06)`
                      : "0 10px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)",
                    backgroundColor: "#0b0b14",
                    opacity: opacity.toFixed(3),
                    zIndex: String(z),
                    pointerEvents: isRear ? "none" : "auto",
                    cursor: isDragging ? "grabbing" : isFront ? "grab" : "pointer",
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-[24px]"
                    style={{ backgroundImage: card.gradient }}
                  />
                  <CardFace card={card} isFront={isFront} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 底部控制区 */}
      <div className="mt-4 md:mt-7 flex items-center justify-center gap-4">
        {!reduced && (
          <button
            type="button"
            onClick={() => rotateTo("prev")}
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.05] text-white/70 active:scale-95 active:bg-white/[0.12]"
            aria-label="上一张工具卡片"
          >
            <CaretLeft size={16} weight="light" />
          </button>
        )}

        <div className="flex items-center gap-3">
          {CARDS.map((card, index) => (
            <button
              key={card.num}
              type="button"
              onClick={() => rotateToIndex(index)}
              className="h-2 w-2 rounded-full transition-transform duration-200 border-0 cursor-pointer"
              style={{
                backgroundColor: index === frontIndex ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.2)",
                transform: index === frontIndex ? "scale(1.4)" : "scale(1)",
              }}
              aria-label={`切换到卡片 ${card.num} · ${card.title}`}
              aria-current={index === frontIndex ? "true" : undefined}
            />
          ))}
        </div>

        {!reduced && (
          <button
            type="button"
            onClick={() => rotateTo("next")}
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.05] text-white/70 active:scale-95 active:bg-white/[0.12]"
            aria-label="下一张工具卡片"
          >
            <CaretRight size={16} weight="light" />
          </button>
        )}
      </div>
    </div>
  );
}
