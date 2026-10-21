"use client";

import BlurText from "../reactbits/TextAnimations/BlurText/BlurText";
import { ScrollReveal } from "./ScrollReveal";

const CAPABILITIES = [
  {
    num: "01",
    id: "about-product",
    title: "模型与产品判断",
    subtitle: "选型、边界与人机分工",
    desc: "基于 GPT、Claude、Gemini 的实际使用经验，先判断任务需要推理、长上下文、编码还是多模态，再设计交互、成本、人工确认点与失败兜底。",
    tags: ["模型选型", "能力边界", "人机协同"],
  },
  {
    num: "02",
    id: "about-agent",
    title: "Agent 系统设计",
    subtitle: "Loop、Runtime、Memory 与 Tools",
    desc: "围绕 agent loop 与 runtime 组织任务推进，用记忆、状态和工具调用承接长周期执行，并把重试、回滚、人工审批与恢复机制落进真实工作流。",
    tags: ["Agent Loop", "Runtime", "Memory & State", "Tool Calling"],
  },
  {
    num: "03",
    id: "about-validation",
    title: "软硬件快速验证",
    subtitle: "从界面工作流到实体交互",
    desc: "用 Vibe Coding、skills、MCP 与 Harness Engineering 快速构建软件原型，也能用 Raspberry Pi、STM32、ESP32-S3、传感器和实体按键验证真实交互闭环。",
    tags: ["Vibe Coding", "Raspberry Pi / ESP32", "Harness & Evals"],
  },
];

export function About() {
  return (
    <section
      id="about"
      className="relative z-10 w-full px-6 md:px-12 py-16 md:py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* Left */}
        <div>
          <ScrollReveal>
            <p className="font-body text-[10.5px] font-medium tracking-[0.20em] text-text-tertiary uppercase mb-6">
              关于
            </p>
          </ScrollReveal>

          <BlurText
            text="在模型能力与真实世界之间。"
            className="font-display italic text-[clamp(32px,4.5vw,48px)] leading-[1.12] text-white mb-7"
            delay={40}
            animateBy="words"
            direction="top"
          />

          <ScrollReveal delay={0.3}>
            <p className="text-[15px] text-text-secondary leading-relaxed mb-4 max-w-[480px]">
              我是黄锡源 (HXY)，一名聚焦模型应用、Agent 系统与软硬件原型的 AI 产品经理。我持续使用 GPT、Claude 与 Gemini 完成研究、规划、编码和长文档任务，也部署 Hermes Agent，理解 loop、runtime、记忆、状态与工具调用如何共同支撑长期运行。
            </p>
            <p className="text-sm text-text-tertiary leading-relaxed mb-9">
              我的项目从 macOS 划词工具、PDF 内容 Agent 和移动端产品，延伸到树莓派距离感知装置与 ESP32-S3 Agent 实体审批台。目标不是堆砌技术名词，而是把模型能力、软件工作流和物理交互收敛成可理解、可验证、能持续迭代的产品系统。
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex flex-wrap gap-2.5">
              {["模型选型与能力边界", "Agent Runtime & Loop", "Harness Engineering", "AI 产品化", "软硬件原型", "嵌入式交互"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 md:px-5 py-2 rounded-full font-body text-[12px] font-medium tracking-[0.04em] text-text-secondary bg-white/[0.04] border border-white/[0.1]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Right: capabilities */}
        <div className="flex flex-col gap-8">
          {CAPABILITIES.map((cap, i) => (
            <ScrollReveal key={cap.num} delay={0.12 * (i + 1)}>
              <div id={cap.id} className="scroll-mt-28 border-l border-white/[0.1] pl-6 transition-colors duration-500 hover:border-neon-cyan">
                <p className="font-body text-[11px] font-medium tracking-[0.12em] text-text-muted mb-1">
                  {cap.num}
                </p>
                <h3 className="font-display italic text-[26px] text-white mb-1">
                  {cap.title}
                </h3>
                <p className="font-body text-[12px] tracking-[0.08em] text-text-muted uppercase mb-2">{cap.subtitle}</p>
                <p className="text-sm text-text-tertiary leading-relaxed mb-3">
                  {cap.desc}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {cap.tags.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full font-body text-[10.5px] text-text-muted bg-white/[0.03] border border-white/[0.06]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
