"use client";

import { useState, useRef, useCallback, useEffect, type ComponentType } from "react";
import { useReducedMotion } from "motion/react";
import {
  CaretLeft,
  CaretRight,
  Cpu,
  Diamond,
  Robot,
  Sparkle,
  TerminalWindow,
  Waveform,
  type IconProps,
} from "@phosphor-icons/react";

/* ------------------------------------------------------------------ */
/* 3D 旋转卡片 — 窄长方形 + 前半球展示 + 键盘 / 侧翼点击 / 导航联动      */
/* ------------------------------------------------------------------ */

interface CardData {
  num: string;
  id: string;
  title: string;
  desc: string;
  tags: string[];
  gradient: string;
  accentBorder: string;
  accentText: string;
  glowColor: string;
  Icon: ComponentType<IconProps>;
}

const CARDS: CardData[] = [
  {
    num: "01",
    id: "tool-gpt",
    title: "GPT",
    desc: "用 GPT-6.2 Astra 做复杂推理、产品研究和代码评审。日常迭代与批量任务可用 GPT-6.2 Sol。",
    tags: ["GPT-6.2 Astra", "GPT-6.2 Sol"],
    gradient:
      "radial-gradient(circle at 28% 24%, rgba(0,200,255,0.22), transparent 26%), radial-gradient(circle at 76% 60%, rgba(0,180,230,0.14), transparent 30%)",
    accentBorder: "rgba(0,200,255,0.38)",
    accentText: "#5ce1ff",
    glowColor: "rgba(0,200,255,0.45)",
    Icon: Sparkle,
  },
  {
    num: "02",
    id: "tool-claude",
    title: "Claude",
    desc: "用 Claude Fable 5.2 拆解复杂技术问题，用 Claude Opus 5.5 做架构评审和长任务规划。",
    tags: ["Fable 5.2", "Opus 5.5"],
    gradient:
      "radial-gradient(circle at 24% 28%, rgba(216,76,255,0.20), transparent 28%), radial-gradient(circle at 72% 72%, rgba(180,50,230,0.14), transparent 26%)",
    accentBorder: "rgba(216,76,255,0.38)",
    accentText: "#e09eff",
    glowColor: "rgba(216,76,255,0.45)",
    Icon: Cpu,
  },
  {
    num: "03",
    id: "tool-grok-bot",
    title: "Grok Bot",
    desc: "在云端电脑里按授权操作工具，完成定期的信息整理和跨应用任务。需要确认的动作由人审批。",
    tags: ["Personal Agent", "任务授权"],
    gradient:
      "radial-gradient(circle at 24% 28%, rgba(40,220,178,0.18), transparent 28%), radial-gradient(circle at 74% 68%, rgba(0,200,255,0.12), transparent 28%)",
    accentBorder: "rgba(40,220,178,0.40)",
    accentText: "#6cead0",
    glowColor: "rgba(40,220,178,0.45)",
    Icon: Robot,
  },
  {
    num: "04",
    id: "tool-gemini",
    title: "Gemini",
    desc: "用 Gemini 4 Carbon 对照文档、图表和截图，完成多步骤研究，并核对关键结论的依据。",
    tags: ["Gemini 4 Carbon", "多模态研究"],
    gradient:
      "radial-gradient(circle at 26% 34%, rgba(255,216,74,0.20), transparent 28%), radial-gradient(circle at 70% 30%, rgba(220,180,50,0.14), transparent 28%)",
    accentBorder: "rgba(255,216,74,0.38)",
    accentText: "#ffe27a",
    glowColor: "rgba(255,216,74,0.45)",
    Icon: Diamond,
  },
  {
    num: "05",
    id: "tool-deepseek-harness",
    title: "DeepSeek Harness",
    desc: "用 DeepSeek V4.1 Flash 辅助读代码、定位改动和运行测试，通过工具执行轨迹核对结果。",
    tags: ["DeepSeek V4.1 Flash", "执行轨迹"],
    gradient:
      "radial-gradient(circle at 24% 24%, rgba(0,90,255,0.22), transparent 28%), radial-gradient(circle at 66% 36%, rgba(30,110,255,0.14), transparent 28%)",
    accentBorder: "rgba(74,144,255,0.40)",
    accentText: "#8ab8ff",
    glowColor: "rgba(74,144,255,0.45)",
    Icon: TerminalWindow,
  },
  {
    num: "06",
    id: "tool-typeless",
    title: "Typeless",
    desc: "把口述想法转成可编辑的需求、会议要点和给 Agent 的任务说明。",
    tags: ["语音输入", "任务说明"],
    gradient:
      "radial-gradient(circle at 28% 30%, rgba(255,106,26,0.20), transparent 28%), radial-gradient(circle at 68% 64%, rgba(230,90,20,0.14), transparent 28%)",
    accentBorder: "rgba(255,106,26,0.38)",
    accentText: "#ffa570",
    glowColor: "rgba(255,106,26,0.45)",
    Icon: Waveform,
  },
];

const CARD_COUNT = CARDS.length;
const ANGLE_PER_CARD = 360 / CARD_COUNT;

function CardFace({ card, isFront }: { card: CardData; isFront: boolean }) {
  const { Icon } = card;
  return (
    <div className="relative z-10 flex h-full flex-col p-6 md:p-7">
      <div className="flex items-center justify-between">
        <span className="font-display text-[12px] tabular-nums uppercase tracking-[0.16em] text-text-muted">
          {card.num}
        </span>
        <span
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border bg-white/[0.03] transition-colors duration-300"
          style={{
            borderColor: isFront ? card.accentBorder : "rgba(255,255,255,0.1)",
            color: isFront ? card.accentText : "rgba(255,255,255,0.5)",
          }}
          aria-hidden="true"
        >
          <Icon size={16} weight="light" />
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
      <p className="mt-3 md:mt-4 font-body text-[13px] leading-[1.78] text-text-secondary/85 [overflow-wrap:anywhere]">
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
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const displayRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef(0);

  const snapToNearest = useCallback((rot: number) => {
    return Math.round(rot / ANGLE_PER_CARD) * ANGLE_PER_CARD;
  }, []);

  const rotateToIndex = useCallback(
    (index: number) => {
      if (reduced) return;
      const snapped = snapToNearest(targetRef.current);
      const targetCard = index * ANGLE_PER_CARD;
      // 取最短旋转路径，避免跨圈空转
      const delta = ((((targetCard - snapped) % 360) + 540) % 360) - 180;
      const destination = snapped + delta;
      targetRef.current = destination;
      setRotation(destination);
    },
    [reduced, snapToNearest]
  );

  const rotateTo = useCallback(
    (direction: "prev" | "next") => {
      if (reduced) return;
      const delta = direction === "next" ? ANGLE_PER_CARD : -ANGLE_PER_CARD;
      targetRef.current = snapToNearest(targetRef.current) + delta;
      setRotation(targetRef.current);
    },
    [reduced, snapToNearest]
  );

  // 响应导航栏「工具栈」下拉项点击，自动旋转对应卡片到正面
  useEffect(() => {
    const handleSelectTool = (event: Event) => {
      const toolId = (event as CustomEvent<string>).detail;
      const idx = CARDS.findIndex((c) => c.id === toolId);
      if (idx >= 0) rotateToIndex(idx);
    };
    window.addEventListener("hxy:select-tool", handleSelectTool);
    return () => window.removeEventListener("hxy:select-tool", handleSelectTool);
  }, [rotateToIndex]);

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
      ref={containerRef}
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
          height: "clamp(22.5rem, 44vw, 27rem)",
          maxWidth: "1200px",
        }}
      >
        {/* 桌面端两侧悬浮切换按钮（移动端移至底部避免遮挡卡片正文） */}
        {!reduced && (
          <>
            <button
              type="button"
              onClick={() => rotateTo("prev")}
              className="cursor-target hidden md:flex absolute left-3 z-[80] h-13 w-13 -translate-y-1/2 top-1/2 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.06] text-white/55 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-neon-cyan/40 hover:bg-white/[0.12] hover:text-white hover:shadow-[0_0_24px_rgba(0,200,255,0.18)] cursor-pointer"
              aria-label="上一张工具卡片"
            >
              <CaretLeft size={22} weight="light" />
            </button>
            <button
              type="button"
              onClick={() => rotateTo("next")}
              className="cursor-target hidden md:flex absolute right-3 z-[80] h-13 w-13 -translate-y-1/2 top-1/2 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.06] text-white/55 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-neon-cyan/40 hover:bg-white/[0.12] hover:text-white hover:shadow-[0_0_24px_rgba(0,200,255,0.18)] cursor-pointer"
              aria-label="下一张工具卡片"
            >
              <CaretRight size={22} weight="light" />
            </button>
          </>
        )}

        <div
          className="absolute left-1/2 top-4"
          style={{
            width: "min(32rem, 80vw)",
            height: "23rem",
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
              const isFront = index === frontIndex;
              const opacity = isRear ? 0 : 0.36 + frontness * 0.64;
              const blur = isRear ? 4 : (1 - frontness) * 1.4;
              const z = Math.round(30 + (cosAngle + 1) * 20);

              let scale: number;
              if (relativeAngle < 36 || relativeAngle > 324) {
                scale = 1.05;
              } else if (relativeAngle < 108 || relativeAngle > 252) {
                scale = 0.89;
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
                  className="scroll-mt-24 absolute rounded-[24px] border text-left shadow-[0_10px_26px_rgba(0,0,0,0.35)] w-[min(19.5rem,74vw)] md:w-[min(21.5rem,36vw)]"
                  style={{
                    height: "clamp(18.5rem, 34vw, 22rem)",
                    left: "50%",
                    top: "0px",
                    transform: `translateX(-50%) rotateY(${cardAngle}deg) translateZ(var(--ring-radius)) scale(${scale.toFixed(2)})`,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    borderColor: isFront ? card.accentBorder : "rgba(255,255,255,0.12)",
                    boxShadow: isFront
                      ? `0 16px 56px rgba(0,0,0,0.55), 0 0 40px ${card.glowColor.replace("0.45", "0.16")}, inset 0 1px 0 rgba(255,255,255,0.06)`
                      : "0 12px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.03)",
                    backgroundColor: "rgba(11,11,20,0.94)",
                    opacity: opacity.toFixed(4),
                    filter: blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : "none",
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
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-[1px] rounded-[23px] border"
                    style={{
                      borderColor: isFront ? card.accentBorder : "rgba(255,255,255,0.06)",
                    }}
                  />

                  <CardFace card={card} isFront={isFront} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 底部控制区：移动端集成左右切换箭头 + 分页指示点，绝不遮挡卡片 */}
      <div className="mt-5 md:mt-8 flex items-center justify-center gap-4">
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
              className="h-2 w-2 rounded-full transition-all duration-300 border-0 cursor-pointer"
              style={{
                backgroundColor: index === frontIndex ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.18)",
                boxShadow: index === frontIndex ? `0 0 10px ${CARDS[frontIndex].glowColor}` : "none",
                transform: index === frontIndex ? "scale(1.45)" : "scale(1)",
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
