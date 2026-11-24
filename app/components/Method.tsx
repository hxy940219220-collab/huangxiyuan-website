"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import BlurText from "../reactbits/TextAnimations/BlurText/BlurText";
import { ScrollReveal } from "./ScrollReveal";

const STEPS = [
  {
    letter: "A",
    title: "定义任务",
    label: "交付物与权限",
    desc: "先确定谁要用结果、什么样才算完成，以及 Agent 可以读取什么、哪些操作必须请人确认。",
    color: "bg-neon-cyan shadow-[0_0_20px_#00c8ff]",
  },
  {
    letter: "I",
    title: "编排协作",
    label: "分工与交接",
    desc: "能独立验收的子任务交给专家 Agent。交接时带上目标、证据和当前状态，并指定谁负责合并结果。",
    color: "bg-neon-gold shadow-[0_0_20px_#ffd84a]",
  },
  {
    letter: "P",
    title: "验证运行",
    label: "Harness 与恢复",
    desc: "用沙箱隔离执行环境，记录工具调用与检查点。模拟超时、权限被拒和部分完成，验证任务能否恢复或转交人工。",
    color: "bg-neon-pink shadow-[0_0_20px_#d84cff]",
  },
  {
    letter: "M",
    title: "度量交付",
    label: "任务级评测",
    desc: "用真实任务样本比较产物通过率、人工介入率和单次交付成本。模型或工具升级后，复跑曾经失败的案例。",
    color: "bg-neon-orange shadow-[0_0_20px_#ff6a1a]",
  },
];

const EVOLUTION_LOOP = [
  {
    step: "01",
    title: "追踪前沿模型与协议",
    desc: "持续跟进 GPT-6.2、Claude 5、Gemini 4 与 A2A / MCP 演进，评估能力边界变化。",
  },
  {
    step: "02",
    title: "拆解标杆产品机制",
    desc: "深入剖析 Claude Code、Hermes、OpenClaw 等系统的任务组织、工具调度与恢复机制。",
  },
  {
    step: "03",
    title: "迭代日常 AI 工作流",
    desc: "将新模型、个人 Agent 与开发 Harness 融入日常研究、需求梳理与原型验证。",
  },
  {
    step: "04",
    title: "沉淀至新原型与评测",
    desc: "把迭代后的判断投入新工作台与软硬件原型，用真实任务样本检验体验增益。",
  },
];

const RESEARCH_TOPICS = [
  {
    num: "01",
    category: "深度专题",
    title: "个人智能体与多 Agent 产品设计",
    desc: "从 Personal Agent 的记忆和权限，到多 Agent 分工、A2A 跨系统交接以及任务级评测。",
    href: "/research/agent-product",
    internal: true,
  },
  {
    num: "02",
    category: "前沿追踪 · 持续更新",
    title: "AI 前沿时间线",
    desc: "追踪 GPT-6.2 Astra、Claude Fable 5.2、Gemini 4 Carbon 等模型，以及个人智能体与托管运行时的演进。",
    href: "/ai-frontier-timeline.html",
  },
  {
    num: "03",
    category: "工程与产品方法",
    title: "Harness Engineering",
    desc: "从提示词之外的上下文、工具、验证器、反馈与恢复机制出发，研究如何让 Agent 在长周期任务中稳定交付。",
    href: "/harness-engineering.html",
  },
  {
    num: "04",
    category: "源码机制拆解",
    title: "Claude Code 源码设计逻辑",
    desc: "关注客户端中的任务组织、工具协作与交互设计，理解工程实现如何映射产品判断。",
    href: "https://learn-claude-code-visual.vercel.app/index.html",
  },
  {
    num: "05",
    category: "范式对比",
    title: "Hermes × OpenClaw 历史对比",
    desc: "回看两种早期个人智能体如何处理消息入口、记忆与本地执行，保留当时的产品与技术背景。",
    href: "/hermes-vs-openclaw.html",
  },
];

export function Method() {
  return (
    <section
      id="method"
      className="relative z-10 w-full px-6 md:px-12 py-16 md:py-24"
    >
      {/* Header */}
      <div className="text-center mb-14">
        <ScrollReveal>
          <p className="font-body text-[11px] font-medium tracking-[0.20em] text-text-tertiary uppercase mb-5">
            Agent 产品方法
          </p>
        </ScrollReveal>
        <div className="flex flex-col items-center gap-0">
          <div className="flex flex-col items-center gap-0 md:hidden">
            <BlurText
              text="从定义任务"
              className="section-display-heading font-display justify-center text-center text-[clamp(1.5rem,6.5vw,2.5rem)] leading-[1.25] text-[#f5f7ff]"
              delay={40}
              animateBy="letters"
              direction="top"
            />
            <BlurText
              text="到验收交付"
              className="section-display-heading font-display justify-center text-center text-[clamp(1.5rem,6.5vw,2.5rem)] leading-[1.25] text-text-tertiary"
              delay={40}
              animateBy="letters"
              direction="top"
            />
          </div>
          <div className="hidden md:flex flex-col items-center gap-0">
            <BlurText
              segments={["从定义任务，", "到验收交付"]}
              className="section-display-heading font-display justify-center text-center text-[clamp(1.75rem,4.6vw,3.4rem)] leading-[1.2] text-[#f5f7ff]"
              delay={75}
              direction="top"
            />
          </div>
        </div>
      </div>

      {/* A-I-P-M Timeline */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8 mb-16">
        <div
          className="hidden lg:block absolute top-6 left-[60px] right-[60px] h-px z-0 opacity-40"
          style={{
            background:
              "linear-gradient(90deg, #00c8ff, #ffd84a, #d84cff, #ff6a1a)",
          }}
          aria-hidden="true"
        />

        {STEPS.map((step, i) => (
          <ScrollReveal key={step.letter} delay={0.06 * (i + 1)}>
            <div className="relative z-[1] mx-auto w-full max-w-[360px] text-left flex gap-5 items-start lg:mx-0 lg:max-w-none">
              {/* 左列：圆点 + 字母（移动端）；电脑端只显示圆点 */}
              <div className="flex flex-col items-center gap-3 flex-shrink-0 pt-1.5 w-10 lg:w-auto lg:block">
                <div className={`relative z-[2] w-3 h-3 rounded-full ${step.color}`}>
                  <div className="absolute -inset-1.5 rounded-full border border-white/[0.15] animate-[dotPulse_3s_ease-in-out_infinite]" />
                </div>
                <p className="font-display text-[2.6rem] leading-none text-[#f5f7ff] lg:hidden">
                  {step.letter}
                </p>
              </div>
              {/* 右列：内容；电脑端字母仍显示在内容顶部 */}
              <div className="min-w-0 flex-1">
                <p className="hidden lg:block font-display text-[3rem] leading-none text-[#f5f7ff] mb-3">
                  {step.letter}
                </p>
                <h3 className="font-body text-[15px] font-medium tracking-[0.04em] text-[#f5f7ff] mb-1">
                  {step.title}
                </h3>
                <p className="font-body text-[11px] tracking-[0.08em] text-text-tertiary mb-2.5 uppercase">{step.label}</p>
                <p className="text-[13.5px] text-text-tertiary leading-[1.72]">
                  {step.desc}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Continuous Frontier & Self-Evolution Loop */}
      <ScrollReveal delay={0.08}>
        <div className="mb-20 overflow-hidden rounded-[22px] border border-white/[0.10] bg-[#0b0b14] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_12px_48px_rgba(0,0,0,0.4)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-6 py-4 md:px-7">
            <div className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-neon-gold shadow-[0_0_8px_#ffd84a]" aria-hidden="true" />
              <p className="font-body text-[11px] font-medium tracking-[0.16em] text-text-secondary uppercase">
                认知与工作流迭代链路 · Continuous Evolution
              </p>
            </div>
            <span className="rounded-full border border-neon-gold/30 bg-neon-gold/[0.07] px-3 py-1 font-body text-[10.5px] font-medium tabular-nums tracking-[0.06em] text-neon-gold">
              持续演进 · 2026
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.07]">
            {EVOLUTION_LOOP.map((item) => (
              <div key={item.step} className="p-6 md:p-6">
                <p className="font-display text-[12px] tabular-nums tracking-[0.14em] text-text-muted">
                  STEP {item.step}
                </p>
                <h3 className="card-display-title mt-2 font-display text-[1.18rem] leading-snug text-[#f5f7ff]">
                  {item.title}
                </h3>
                <p className="mt-2 font-body text-[13px] leading-[1.7] text-text-tertiary">
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
          <p className="font-body text-[11px] font-medium tracking-[0.20em] text-text-tertiary uppercase mb-8 text-center">
            研究归档
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
              <ScrollReveal
                key={topic.num}
                delay={0.06 * (i + 1)}
                className={`h-full ${isFeatured ? "sm:col-span-2" : ""}`}
              >
                <Card
                  {...linkProps}
                  className={`group flex h-full flex-col justify-between p-6 md:p-7 rounded-[20px] bg-[#0b0b14] border shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300
                    ${
                      isClickable
                        ? "border-white/[0.11] cursor-pointer cursor-target no-underline hover:border-neon-cyan/50 hover:bg-[#0e0e1c] hover:-translate-y-1 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_40px_rgba(0,200,255,0.10),0_16px_48px_rgba(0,0,0,0.45)]"
                        : "border-dashed border-white/[0.1] bg-transparent opacity-70 shadow-none"
                    }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3.5">
                      <div className="flex items-center gap-2.5">
                        <p className={`font-display text-[13px] tabular-nums tracking-[0.12em] ${isClickable ? "text-neon-cyan" : "text-text-muted"}`}>
                          {topic.num}
                        </p>
                        <span className="h-3 w-px bg-white/[0.12]" aria-hidden="true" />
                        <span className="font-body text-[11px] tracking-[0.06em] text-text-muted">
                          {topic.category}
                        </span>
                      </div>
                      {isClickable ? (
                        <span className="inline-flex items-center gap-1.5 font-body text-neon-cyan/80 text-[11.5px] font-medium tracking-[0.06em] transition-all duration-300 group-hover:text-neon-cyan group-hover:gap-2">
                          阅读
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-neon-cyan/10 border border-neon-cyan/25 transition-all duration-300 group-hover:bg-neon-cyan/20 group-hover:border-neon-cyan/45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                            <ArrowUpRight size={11} weight="bold" />
                          </span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-white/[0.1] font-body text-text-muted text-[10px] font-medium tracking-[0.1em] uppercase">
                          整理中
                        </span>
                      )}
                    </div>
                    <h3
                      className={`card-display-title text-balance font-display ${
                        isFeatured ? "text-[1.5rem] md:text-[1.75rem]" : "text-[1.35rem] md:text-[1.45rem]"
                      } leading-snug text-[#f5f7ff] mb-2 transition-colors duration-300 group-hover:text-neon-cyan`}
                    >
                      {topic.title}
                    </h3>
                  </div>
                  <p className={`text-[13.5px] text-text-tertiary leading-[1.72] ${isFeatured ? "max-w-3xl" : ""}`}>
                    {topic.desc}
                  </p>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
