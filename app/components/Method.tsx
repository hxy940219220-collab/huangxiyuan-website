"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import BlurText from "../reactbits/TextAnimations/BlurText/BlurText";
import { ScrollReveal } from "./ScrollReveal";

const STEPS = [
  {
    letter: "A",
    title: "定义任务",
    label: "交付物与权限",
    desc: "明确验收标准、可读取范围与必须由人确认的操作。",
    color: "bg-neon-cyan shadow-[0_0_16px_#00c8ff]",
  },
  {
    letter: "I",
    title: "编排协作",
    label: "分工与交接",
    desc: "独立子任务交给专家 Agent，交接时同步目标、依据与状态。",
    color: "bg-neon-gold shadow-[0_0_16px_#ffd84a]",
  },
  {
    letter: "P",
    title: "验证运行",
    label: "Harness 与恢复",
    desc: "隔离执行环境并保留检查点，超时或受阻时可恢复或转交人工。",
    color: "bg-neon-pink shadow-[0_0_16px_#d84cff]",
  },
  {
    letter: "M",
    title: "度量交付",
    label: "任务级评测",
    desc: "跟踪真实样本通过率与人工介入率，模型升级后复跑失败案例。",
    color: "bg-neon-orange shadow-[0_0_16px_#ff6a1a]",
  },
];

const EVOLUTION_LOOP = [
  {
    step: "01",
    title: "追踪前沿演进",
    desc: "跟进最新模型与 A2A / MCP 协议边界变化。",
  },
  {
    step: "02",
    title: "拆解标杆机制",
    desc: "剖析 Claude Code、OpenClaw 等任务调度与恢复设计。",
  },
  {
    step: "03",
    title: "迭代日常工作流",
    desc: "将新模型与 Harness 融入日常研究与原型开发。",
  },
  {
    step: "04",
    title: "沉淀原型与评测",
    desc: "投入新工作台与硬件原型，用真实样本检验增益。",
  },
];

const RESEARCH_TOPICS = [
  {
    num: "01",
    category: "深度专题",
    title: "个人智能体与多 Agent 产品设计",
    desc: "探讨记忆与权限隔离、多专家分工、A2A / MCP 交接及任务级评测。",
    href: "/research/agent-product",
    internal: true,
  },
  {
    num: "02",
    category: "前沿追踪",
    title: "AI 前沿时间线",
    desc: "追踪主流旗舰模型、个人智能体与托管运行时的关键演进。",
    href: "/ai-frontier-timeline.html",
  },
  {
    num: "03",
    category: "方法论",
    title: "Harness Engineering",
    desc: "研究上下文、验证器与恢复机制如何保障长任务稳定交付。",
    href: "/harness-engineering.html",
  },
  {
    num: "04",
    category: "源码拆解",
    title: "Claude Code 源码设计逻辑",
    desc: "拆解客户端任务组织与工具协作，理解工程实现背后的产品判断。",
    href: "https://learn-claude-code-visual.vercel.app/index.html",
  },
  {
    num: "05",
    category: "范式对比",
    title: "Hermes × OpenClaw 历史对比",
    desc: "对比早期个人智能体在消息入口、记忆与本地执行上的取舍。",
    href: "/hermes-vs-openclaw.html",
  },
];

export function Method() {
  return (
    <section
      id="method"
      className="relative z-10 w-full px-6 md:px-12 py-12 md:py-20"
    >
      {/* Header */}
      <div className="text-center mb-11 md:mb-14">
        <ScrollReveal>
          <p className="font-body text-[11px] font-medium tracking-[0.20em] text-text-tertiary uppercase mb-4">
            Agent 产品方法
          </p>
        </ScrollReveal>
        <div className="flex flex-col items-center gap-0">
          <BlurText
            segments={["从定义任务，", "到验收交付"]}
            className="section-display-heading font-display justify-center text-center text-[clamp(1.7rem,4.6vw,3.2rem)] leading-[1.2] text-[#f5f7ff]"
            delay={55}
            direction="top"
          />
        </div>
      </div>

      {/* A-I-P-M Timeline */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
        <div
          className="hidden lg:block absolute top-6 left-[60px] right-[60px] h-px z-0 opacity-40"
          style={{
            background:
              "linear-gradient(90deg, #00c8ff, #ffd84a, #d84cff, #ff6a1a)",
          }}
          aria-hidden="true"
        />

        {STEPS.map((step, i) => (
          <ScrollReveal key={step.letter} delay={0.04 * (i + 1)}>
            <div className="relative z-[1] mx-auto w-full max-w-[360px] text-left flex gap-4 items-start lg:mx-0 lg:max-w-none">
              <div className="flex flex-col items-center gap-2.5 flex-shrink-0 pt-1.5 w-9 lg:w-auto lg:block">
                <div className={`relative z-[2] w-2.5 h-2.5 rounded-full ${step.color}`} />
                <p className="font-display text-[2.2rem] leading-none text-[#f5f7ff] lg:hidden">
                  {step.letter}
                </p>
              </div>
              <div className="min-w-0 flex-1">
                <p className="hidden lg:block font-display text-[2.75rem] leading-none text-[#f5f7ff] mb-2.5">
                  {step.letter}
                </p>
                <h3 className="font-body text-[14.5px] font-medium tracking-[0.04em] text-[#f5f7ff] mb-0.5">
                  {step.title}
                </h3>
                <p className="font-body text-[10.5px] tracking-[0.08em] text-text-muted mb-2 uppercase">
                  {step.label}
                </p>
                <p className="text-[13px] text-text-tertiary leading-[1.65]">
                  {step.desc}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Compact Continuous Evolution Strip */}
      <ScrollReveal delay={0.06}>
        <div className="mb-14 md:mb-18 overflow-hidden rounded-[20px] border border-white/[0.10] bg-[#0b0b14] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.07] px-5 py-3.5 md:px-6">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-neon-gold" aria-hidden="true" />
              <p className="font-body text-[11px] font-medium tracking-[0.14em] text-text-secondary uppercase">
                持续迭代闭环
              </p>
            </div>
            <span className="rounded-full border border-neon-gold/30 bg-neon-gold/[0.07] px-2.5 py-0.5 font-body text-[10px] font-medium tabular-nums tracking-[0.06em] text-neon-gold">
              持续演进 · 2026
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-x divide-white/[0.07] lg:divide-y-0">
            {EVOLUTION_LOOP.map((item) => (
              <div key={item.step} className="p-4 md:p-5">
                <p className="font-display text-[11px] tabular-nums tracking-[0.12em] text-text-muted">
                  {item.step}
                </p>
                <h3 className="card-display-title mt-1 font-display text-[1.05rem] md:text-[1.15rem] leading-snug text-[#f5f7ff]">
                  {item.title}
                </h3>
                <p className="mt-1 font-body text-[12px] md:text-[12.5px] leading-[1.6] text-text-tertiary">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Research Archive */}
      <div>
        <ScrollReveal>
          <p className="font-body text-[11px] font-medium tracking-[0.20em] text-text-tertiary uppercase mb-6 text-center">
            研究归档
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {RESEARCH_TOPICS.map((topic, i) => {
            const Card = topic.href ? "a" : "div";
            const isClickable = !!topic.href;
            const isFeatured = i === 0;
            const linkProps = topic.href
              ? topic.internal
                ? { href: topic.href }
                : { href: topic.href, target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <Card
                key={topic.num}
                {...linkProps}
                className={`group flex h-full flex-col justify-between p-5 md:p-6 rounded-[18px] bg-[#0b0b14] border shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-[transform,border-color,background-color] duration-250 ${
                  isFeatured ? "sm:col-span-2" : ""
                } ${
                  isClickable
                    ? "border-white/[0.11] cursor-pointer cursor-target no-underline hover:border-neon-cyan/50 hover:bg-[#0e0e1c] hover:-translate-y-0.5"
                    : "border-dashed border-white/[0.1] bg-transparent opacity-70 shadow-none"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2">
                      <p className={`font-display text-[12.5px] tabular-nums tracking-[0.12em] ${isClickable ? "text-neon-cyan" : "text-text-muted"}`}>
                        {topic.num}
                      </p>
                      <span className="h-3 w-px bg-white/[0.12]" aria-hidden="true" />
                      <span className="font-body text-[11px] tracking-[0.05em] text-text-muted">
                        {topic.category}
                      </span>
                    </div>
                    {isClickable && (
                      <span className="inline-flex items-center gap-1 font-body text-neon-cyan/80 text-[11.5px] font-medium tracking-[0.04em] transition-colors group-hover:text-neon-cyan">
                        阅读
                        <ArrowUpRight size={12} weight="bold" />
                      </span>
                    )}
                  </div>
                  <h3
                    className={`card-display-title text-balance font-display ${
                      isFeatured ? "text-[1.35rem] md:text-[1.6rem]" : "text-[1.25rem] md:text-[1.4rem]"
                    } leading-snug text-[#f5f7ff] mb-1.5 transition-colors duration-200 group-hover:text-neon-cyan`}
                  >
                    {topic.title}
                  </h3>
                </div>
                <p className={`text-[13px] md:text-[13.5px] text-text-tertiary leading-[1.65] ${isFeatured ? "max-w-3xl" : ""}`}>
                  {topic.desc}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
