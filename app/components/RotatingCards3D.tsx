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
  href?: string;
  gradient: string;
  accentBorder: string;
  glowColor: string;
}

const CARDS: CardData[] = [
  {
    num: "01",
    id: "tool-claude",
    title: "Claude",
    desc: "主力 AI 编程助手。日常用 Claude Code 做产品原型、代码生成与架构设计，是最高频使用的 AI 工具。",
    tags: ["Claude Code", "Agent", "Prototype"],
    gradient:
      "radial-gradient(circle at 24% 28%, rgba(216,76,255,0.22), transparent 26%), radial-gradient(circle at 72% 72%, rgba(180,50,230,0.16), transparent 24%)",
    accentBorder: "rgba(216,76,255,0.35)",
    glowColor: "rgba(216,76,255,0.45)",
  },
  {
    num: "02",
    id: "tool-gpt",
    title: "GPT",
    desc: "OpenAI 旗舰模型。重点使用 Image2 与 Codex CLI，覆盖视觉创作与自动化编码两大高频场景。",
    tags: ["Image2", "Codex", "DALL·E"],
    gradient:
      "radial-gradient(circle at 28% 24%, rgba(0,200,255,0.24), transparent 24%), radial-gradient(circle at 76% 60%, rgba(0,180,230,0.16), transparent 28%)",
    accentBorder: "rgba(0,200,255,0.35)",
    glowColor: "rgba(0,200,255,0.45)",
  },
  {
    num: "03",
    id: "tool-gemini",
    title: "Gemini",
    desc: "Google 多模态模型。擅长长文本理解、视觉分析与跨模态推理，用于研究对比与产品探索。",
    tags: ["Antigravity", "Stitch", "Notebooklm"],
    gradient:
      "radial-gradient(circle at 26% 34%, rgba(255,216,74,0.22), transparent 28%), radial-gradient(circle at 70% 30%, rgba(220,180,50,0.16), transparent 26%)",
    accentBorder: "rgba(255,216,74,0.35)",
    glowColor: "rgba(255,216,74,0.45)",
  },
  {
    num: "04",
    id: "tool-vscode",
    title: "VS Code",
    desc: "主要代码编辑器。结合 AI 插件进行 Vibe Coding，快速将产品想法转化为可运行的原型与验证产物。",
    tags: ["Editor", "Vibe Coding", "Debug"],
    gradient:
      "radial-gradient(circle at 24% 24%, rgba(0,60,255,0.22), transparent 28%), radial-gradient(circle at 66% 36%, rgba(30,80,255,0.16), transparent 26%)",
    accentBorder: "rgba(0,100,255,0.35)",
    glowColor: "rgba(0,100,255,0.45)",
  },
  {
    num: "05",
    id: "tool-typeless",
    title: "Typeless",
    desc: "语音转结构化文字工具。将会议录音、口述想法快速转为可编辑、可检索的结构化文档。",
    tags: ["Voice-to-Text", "Structured", "Notes"],
    gradient:
      "radial-gradient(circle at 28% 30%, rgba(255,106,26,0.22), transparent 28%), radial-gradient(circle at 68% 64%, rgba(230,90,20,0.16), transparent 26%)",
    accentBorder: "rgba(255,106,26,0.35)",
    glowColor: "rgba(255,106,26,0.45)",
  },
  {
    num: "06",
    id: "tool-hermes",
    title: "Hermes Agent",
    desc: "可自托管的个人 Agent runtime。重点研究 agent loop、skills、记忆、状态恢复与多渠道 gateway 如何组成可长期运行的系统。",
    tags: ["Agent Runtime", "Skills", "Memory"],
    href: "https://github.com/NousResearch/hermes-agent",
    gradient:
      "radial-gradient(circle at 24% 28%, rgba(40,220,178,0.20), transparent 28%), radial-gradient(circle at 74% 68%, rgba(0,200,255,0.14), transparent 26%)",
    accentBorder: "rgba(40,220,178,0.38)",
    glowColor: "rgba(40,220,178,0.45)",
  },
];

const CARD_COUNT = CARDS.length;
const ANGLE_PER_CARD = 360 / CARD_COUNT;

function CardFace({ card }: { card: CardData }) {
  return (
    <div className="relative z-10 flex h-full flex-col p-5 md:p-6">
      <span className="font-body text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-white/25">
        {card.num}
      </span>
      <h3
        className="mt-4 md:mt-6 text-balance font-semibold leading-[1.02] text-white"
        style={{
          fontFamily:
            '"PingFang SC", "Hiragino Sans GB", "Noto Sans SC", "Microsoft YaHei", sans-serif',
          fontSize: "clamp(1.2rem, 1.4vw, 1.5rem)",
          letterSpacing: "0.02em",
        }}
      >
        {card.title}
      </h3>
      <p className="mt-3 md:mt-4 text-[11.5px] md:text-[12px] leading-[1.9] text-white/52 [overflow-wrap:anywhere]">
        {card.desc}
      </p>
      <div className="mt-auto pt-6 md:pt-8">
        <div className="flex flex-wrap gap-1.5">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.12] bg-white/[0.03] px-2 py-[0.22rem] font-body text-[8.5px] tracking-[0.08em] text-white/45"
            >
              {tag}
            </span>
          ))}
        </div>
        {card.href && (
          <a
            href={card.href}
            target="_blank"
            rel="noopener noreferrer"
            onPointerDown={(event) => event.stopPropagation()}
            className="cursor-target mt-3 inline-flex items-center gap-1.5 font-body text-[9.5px] font-medium tracking-[0.08em] text-[#28dcb2] no-underline transition-colors hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#28dcb2]"
          >
            查看开源项目 <span aria-hidden="true">↗</span>
          </a>
        )}
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
      if (Math.abs(target - displayed) < 0.01) {
        displayRef.current = target;
      } else {
        displayRef.current += (target - displayed) * 0.18;
      }
      ring.style.transform = `rotateY(${-displayRef.current}deg)`;
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
              const facingFactor = Math.abs(Math.cos((relativeAngle * Math.PI) / 180));
              const opacity = 0.55 + facingFactor * 0.45;
              const blur = (1 - facingFactor) * 0.25;
              const z = Math.round(50 + facingFactor * 10);

              let scale: number;
              if (relativeAngle < 36 || relativeAngle > 324) {
                scale = 1.08;
              } else if (relativeAngle < 108 || relativeAngle > 252) {
                scale = 0.92;
              } else {
                scale = 0.60;
              }

              return (
                <div
                  id={card.id}
                  key={card.num}
                  className="scroll-mt-24 absolute rounded-[24px] border text-left shadow-[0_10px_26px_rgba(0,0,0,0.35)] pointer-events-auto"
                  style={{
                    width: "min(21rem, 46vw)",
                    height: "clamp(18rem, 34vw, 22rem)",
                    left: "50%",
                    top: "0px",
                    transform: `translateX(-50%) rotateY(${cardAngle}deg) translateZ(var(--ring-radius)) scale(${scale.toFixed(2)})`,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "visible",
                    WebkitBackfaceVisibility: "visible",
                    borderColor: index === frontIndex ? card.accentBorder : "rgba(255,255,255,0.12)",
                    boxShadow:
                      index === frontIndex
                        ? `0 12px 56px rgba(0,0,0,0.5), 0 0 40px ${card.glowColor.replace("0.45", "0.15")}, inset 0 1px 0 rgba(255,255,255,0.06)`
                        : "0 12px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.03)",
                    backgroundColor: "rgba(13,13,28,0.65)",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                    opacity: opacity.toFixed(4),
                    filter: `blur(${blur.toFixed(2)}px)`,
                    zIndex: String(z),
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
                      borderColor: index === frontIndex ? card.accentBorder : "rgba(255,255,255,0.08)",
                    }}
                  />

                  <div style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                    <CardFace card={card} />
                  </div>
                  <div
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      position: "absolute",
                      inset: 0,
                    }}
                  >
                    <CardFace card={card} />
                  </div>
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
