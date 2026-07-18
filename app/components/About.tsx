"use client";

import BlurText from "../reactbits/TextAnimations/BlurText/BlurText";
import { ScrollReveal } from "./ScrollReveal";

const CAPABILITIES = [
  {
    num: "01",
    id: "about-product",
    title: "产品化能力",
    subtitle: "模型边界与产品落地",
    desc: "先判断模型能力边界、任务风险与真实需求，再决定交互、工作流和人工确认点，把实验能力收敛为可解释、可恢复、可衡量的产品路径。",
    tags: ["模型边界", "人机分工", "评测闭环"],
  },
  {
    num: "02",
    id: "about-agent",
    title: "Agent 系统",
    subtitle: "Loop、Runtime 与状态",
    desc: "从 agent loop 与 runtime 出发，理解状态如何跨轮次保存、短期与长期记忆如何检索、工具如何注册调用，以及失败后如何重试、回滚与恢复。",
    tags: ["Agent Loop", "Runtime", "Memory & State", "Tool Calling"],
  },
  {
    num: "03",
    id: "about-validation",
    title: "快速验证",
    subtitle: "Skills 与 Harness Engineering",
    desc: "用 skills、MCP、subagents 与 Harness Engineering 组织目标、约束、上下文、验证器和反馈，再通过 Vibe Coding 快速做出可运行、可评测的原型。",
    tags: ["Skills & MCP", "Harness Engineering", "Evals & Recovery"],
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
            text="在产品逻辑与创意直觉之间。"
            className="font-display italic text-[clamp(32px,4.5vw,48px)] leading-[1.12] text-white mb-7"
            delay={40}
            animateBy="words"
            direction="top"
          />

          <ScrollReveal delay={0.3}>
            <p className="text-[15px] text-text-secondary leading-relaxed mb-4 max-w-[480px]">
              我是黄锡源 (HXY)，一名聚焦模型、Agent 与 Workflow 的 AI 产品经理。我关心的不只是模型“能不能回答”，更关心 agent loop 如何推进任务、runtime 如何承载状态，以及记忆、工具调用与人工确认如何共同形成稳定体验。
            </p>
            <p className="text-sm text-text-tertiary leading-relaxed mb-9">
              我会先判断模型能力边界和失败成本，再用基础 skills、MCP 与 Harness Engineering 组织上下文、约束、评测和恢复机制。目标不是堆砌技术名词，而是把复杂能力拆成可理解、可验证、能持续迭代的产品系统。
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex flex-wrap gap-2.5">
              {["AI 产品规划", "用户体验设计", "原型搭建", "增长与商业分析", "多 Agent / 自动化系统", "个人品牌与创意表达"].map((tag) => (
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
