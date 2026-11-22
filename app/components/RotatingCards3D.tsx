"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useReducedMotion } from "motion/react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

/* ------------------------------------------------------------------ */
/* 3D 旋转卡片 — 窄长方形 + 双面渲染（正面+预翻转背面，文字永不反转）      */
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
}

const CARDS: CardData[] = [
  {
    num: "01",
    id: "tool-gpt",
    title: "GPT",
    desc: "用 GPT-6.2 Astra 做复杂推理、产品研究和代码评审。日常迭代与批量任务可用 GPT-6.2 Sol。",
    tags: ["GPT-6.2 Astra", "GPT-6.2 Sol"],
    gradient:
      "radial-gradient(circle at 28% 24%, rgba(0,200,255,0.24), transparent 24%), radial-gradient(circle at 76% 60%, rgba(0,180,230,0.16), transparent 28%)",
    accentBorder: "rgba(0,200,255,0.35)",
    glowColor: "rgba(0,200,255,0.45)",
  },
  {
    num: "02",
    id: "tool-claude",
    title: "Claude",
    desc: "用 Claude Fable 5.2 拆解复杂技术问题，用 Claude Opus 5.5 做架构评审和长任务规划。",
    tags: ["Fable 5.2", "Opus 5.5"],
    gradient:
      "radial-gradient(circle at 24% 28%, rgba(216,76,255,0.22), transparent 26%), radial-gradient(circle at 72% 72%, rgba(180,50,230,0.16), transparent 24%)",
    accentBorder: "rgba(216,76,255,0.35)",
    glowColor: "rgba(216,76,255,0.45)",
  },
  {
    num: "03",
    id: "tool-grok-bot",
    title: "Grok Bot",
    desc: "在云端电脑里按授权操作工具，完成定期的信息整理和跨应用任务。需要确认的动作由人审批。",
    tags: ["Personal Agent", "任务授权"],
    gradient:
      "radial-gradient(circle at 24% 28%, rgba(40,220,178,0.20), transparent 28%), radial-gradient(circle at 74% 68%, rgba(0,200,255,0.14), transparent 26%)",
    accentBorder: "rgba(40,220,178,0.38)",
    glowColor: "rgba(40,220,178,0.45)",
  },
  {
    num: "04",
    id: "tool-gemini",
    title: "Gemini",
    desc: "用 Gemini 4 Carbon 对照文档、图表和截图，完成多步骤研究，并核对关键结论的依据。",
    tags: ["Gemini 4 Carbon", "多模态研究"],
    gradient:
      "radial-gradient(circle at 26% 34%, rgba(255,216,74,0.22), transparent 28%), radial-gradient(circle at 70% 30%, rgba(220,180,50,0.16), transparent 26%)",
    accentBorder: "rgba(255,216,74,0.35)",
    glowColor: "rgba(255,216,74,0.45)",
  },
  {
    num: "05",
    id: "tool-deepseek-harness",
    title: "DeepSeek Harness",
    desc: "用 DeepSeek V4.1 Flash 辅助读代码、定位改动和运行测试，通过工具执行轨迹核对结果。",
    tags: ["DeepSeek V4.1 Flash", "执行轨迹"],
    gradient:
      "radial-gradient(circle at 24% 24%, rgba(0,60,255,0.22), transparent 28%), radial-gradient(circle at 66% 36%, rgba(30,80,255,0.16), transparent 26%)",
    accentBorder: "rgba(0,100,255,0.35)",
    glowColor: "rgba(0,100,255,0.45)",
  },
  {
    num: "06",
    id: "tool-typeless",
    title: "Typeless",
    desc: "把口述想法转成可编辑的需求、会议要点和给 Agent 的任务说明。",
    tags: ["语音输入", "任务说明"],
    gradient:
      "radial-gradient(circle at 28% 30%, rgba(255,106,26,0.22), transparent 28%), radial-gradient(circle at 68% 64%, rgba(230,90,20,0.16), transparent 26%)",
    accentBorder: "rgba(255,106,26,0.35)",
    glowColor: "rgba(255,106,26,0.45)",
  },
];

const CARD_COUNT = CARDS.length;
const ANGLE_PER_CARD = 360 / CARD_COUNT;

function CardFace({ card }: { card: CardData }) {
  return (
    <div className="relative z-10 flex h-full flex-col p-6 md:p-7">
      <span className="font-display text-[12px] uppercase tracking-[0.16em] text-text-muted">
        {card.num}
      </span>
      <h3
        className="card-display-title mt-4 md:mt-5 font-display text-balance leading-[1.1] text-[#f5f7ff]"
        style={{
          fontSize: "clamp(1.4rem, 1.65vw, 1.7rem)",
        }}
      >
        {card.title}
      </h3>
      <p className="mt-3 md:mt-4 font-body text-[12.5px] md:text-[13px] leading-[1.8] text-text-secondary/85 [overflow-wrap:anywhere]">
        {card.desc}
      </p>
      <div className="mt-auto pt-6 md:pt-8">
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
  const dragStartRef = useRef({ x: 0, rotation: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const displayRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef(0);

  const snapToNearest = useCallback((rot: number) => {
    return Math.round(rot / ANGLE_PER_CARD) * ANGLE_PER_CARD;
  }, []);

  const rotateTo = useCallback(
    (direction: "prev" | "next") => {
      if (reduced) return;
      const delta = direction === "next" ? ANGLE_PER_CARD : -ANGLE_PER_CARD;
      targetRef.current += delta;
      setRotation(targetRef.current);
    },
    [reduced]
  );

  useEffect(() => {
    if (reduced) return;
    const ring = ringRef.current;
    if (!ring) return;

    const loop = () => {
      const displayed = displayRef.current;
      const target = targetRef.current;
      let next = displayed;
      if (Math.abs(target - displayed) < 0.01) {
        next = target;
      } else {
        next = displayed + (target - displayed) * 0.18;
      }
      if (next !== displayed) {
        displayRef.current = next;
        ring.style.transform = `rotateY(${-next}deg)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reduced]);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
      if (reduced) return;
      setIsDragging(true);
      dragStartRef.current = { x: event.clientX, rotation: targetRef.current };
      (event.target as HTMLElement).setPointerCapture?.(event.pointerId);
    },
    [reduced]
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (!isDragging || reduced) return;
      const nextRotation = dragStartRef.current.rotation + (event.clientX - dragStartRef.current.x) * 0.4;
      targetRef.current = nextRotation;
      displayRef.current = nextRotation;
      setRotation(nextRotation);
    },
    [isDragging, reduced]
  );

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    const snapped = snapToNearest(targetRef.current);
    targetRef.current = snapped;
    setRotation(snapped);
  }, [isDragging, snapToNearest]);

  const normalizedRotation = ((rotation % 360) + 360) % 360;
  const frontIndex = Math.round(normalizedRotation / ANGLE_PER_CARD) % CARD_COUNT;

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none [--ring-radius:200px] md:[--ring-radius:340px]"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{ touchAction: "none" }}
    >
      <div
        className="relative mx-auto overflow-visible"
        style={{
          perspective: "1600px",
          perspectiveOrigin: "50% 48%",
          height: "clamp(24rem, 44vw, 28rem)",
          maxWidth: "1200px",
        }}
      >
        {!reduced && (
          <>
            <button
              onClick={() => rotateTo("prev")}
              className="absolute left-1 md:left-3 z-[80] flex h-11 w-11 md:h-14 md:w-14 -translate-y-1/2 top-1/2 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.06] text-white/40 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/[0.28] hover:bg-white/[0.12] hover:text-white/80 hover:shadow-[0_0_24px_rgba(0,200,255,0.15)]"
              aria-label="上一个"
            >
              <CaretLeft size={22} weight="light" />
            </button>
            <button
              onClick={() => rotateTo("next")}
              className="absolute right-1 md:right-3 z-[80] flex h-11 w-11 md:h-14 md:w-14 -translate-y-1/2 top-1/2 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.06] text-white/40 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/[0.28] hover:bg-white/[0.12] hover:text-white/80 hover:shadow-[0_0_24px_rgba(0,200,255,0.15)]"
              aria-label="下一个"
            >
              <CaretRight size={22} weight="light" />
            </button>
          </>
        )}

        <div
          className="absolute left-1/2 top-4"
          style={{
            width: "min(32rem, 38vw)",
            height: "24rem",
            transform: "translateX(-50%)",
            transformStyle: "preserve-3d",
            transformOrigin: "50% 50%",
            pointerEvents: "none",
          }}
        >
          <div
            ref={ringRef}
            className="absolute inset-0"
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateY(0deg)",
            }}
          >
            {CARDS.map((card, index) => {
              const cardAngle = index * ANGLE_PER_CARD;
              const relativeAngle = (((cardAngle - normalizedRotation) % 360) + 360) % 360;
              const cosAngle = Math.cos((relativeAngle * Math.PI) / 180);
              // 只展示前半球（主卡 + 左右两张侧翼预览卡），背面卡片平滑淡出避免文字镜像叠影穿帮
              const frontness = Math.max(0, cosAngle);
              const isRear = cosAngle <= 0.02;
              const opacity = isRear ? 0 : 0.36 + frontness * 0.64;
              const blur = isRear ? 4 : (1 - frontness) * 1.4;
              const z = Math.round(30 + (cosAngle + 1) * 20);

              let scale: number;
              if (relativeAngle < 36 || relativeAngle > 324) {
                scale = 1.06;
              } else if (relativeAngle < 108 || relativeAngle > 252) {
                scale = 0.90;
              } else {
                scale = 0.72;
              }

              return (
                <div
                  id={card.id}
                  key={card.num}
                  className="scroll-mt-24 absolute rounded-[24px] border text-left shadow-[0_10px_26px_rgba(0,0,0,0.35)]"
                  style={{
                    width: "min(21.5rem, 48vw)",
                    height: "clamp(18.5rem, 34vw, 22rem)",
                    left: "50%",
                    top: "0px",
                    transform: `translateX(-50%) rotateY(${cardAngle}deg) translateZ(var(--ring-radius)) scale(${scale.toFixed(2)})`,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    borderColor: index === frontIndex ? card.accentBorder : "rgba(255,255,255,0.12)",
                    boxShadow:
                      index === frontIndex
                        ? `0 16px 56px rgba(0,0,0,0.55), 0 0 40px ${card.glowColor.replace("0.45", "0.16")}, inset 0 1px 0 rgba(255,255,255,0.06)`
                        : "0 12px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.03)",
                    backgroundColor: "rgba(11,11,20,0.92)",
                    opacity: opacity.toFixed(4),
                    filter: blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : "none",
                    zIndex: String(z),
                    pointerEvents: isRear ? "none" : "auto",
                    cursor: isDragging ? "grabbing" : "grab",
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-[24px]"
                    style={{ backgroundImage: card.gradient }}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-[1px] rounded-[23px] border"
                    style={{
                      borderColor: index === frontIndex ? card.accentBorder : "rgba(255,255,255,0.06)",
                    }}
                  />

                  <CardFace card={card} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-6 md:mt-8">
        {CARDS.map((card, index) => (
          <button
            key={card.num}
            onClick={() => {
              if (reduced) return;
              const snapped = snapToNearest(targetRef.current);
              const targetCard = index * ANGLE_PER_CARD;
              let destination = targetCard;
              while (destination <= snapped) destination += 360;
              targetRef.current = destination;
              setRotation(destination);
            }}
            className="w-2 h-2 rounded-full transition-all duration-400 border-0 cursor-pointer"
            style={{
              backgroundColor: index === frontIndex ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.18)",
              boxShadow: index === frontIndex ? `0 0 10px ${CARDS[frontIndex].glowColor}` : "none",
              transform: index === frontIndex ? "scale(1.4)" : "scale(1)",
            }}
            aria-label={`切换到卡片 ${card.num}`}
          />
        ))}
      </div>
    </div>
  );
}
