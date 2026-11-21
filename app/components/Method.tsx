"use client";

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

const RESEARCH_TOPICS = [
  {
    num: "01",
    title: "个人智能体与多 Agent 产品设计",
    desc: "从 Personal Agent 的记忆和权限，到多 Agent 分工、A2A 跨系统交接以及任务级评测。",
    href: "/research/agent-product",
  },
  {
    num: "02",
    title: "AI 前沿时间线",
    desc: "追踪 GPT-6.2 Astra、Claude Fable 5.2、Gemini 4 Carbon 等模型，以及个人智能体与托管运行时的演进。",
    href: "/ai-frontier-timeline.html",
  },
  {
    num: "03",
    title: "Harness Engineering",
    desc: "从提示词之外的上下文、工具、验证器、反馈与恢复机制出发，研究如何让 Agent 在长周期任务中稳定交付。",
    href: "/harness-engineering.html",
  },
  {
    num: "04",
    title: "Claude Code 源码设计逻辑",
    desc: "关注客户端中的任务组织、工具协作与交互设计，理解工程实现如何映射产品判断。",
    href: "https://learn-claude-code-visual.vercel.app/index.html",
  },
  {
    num: "05",
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
          <p className="font-body text-[10.5px] font-medium tracking-[0.20em] text-text-tertiary uppercase mb-6">
            Agent 产品方法
          </p>
        </ScrollReveal>
        <div className="flex flex-col items-center gap-0">
          <div className="flex flex-col items-center gap-0 md:hidden">
            <BlurText
              text="从定义任务"
              className="font-display justify-center text-center text-[clamp(1.5rem,6.5vw,2.5rem)] font-semibold leading-[1.25] text-white"
              delay={40}
              animateBy="letters"
              direction="top"
            />
            <BlurText
              text="到验收交付"
              className="font-display justify-center text-center text-[clamp(1.5rem,6.5vw,2.5rem)] font-semibold leading-[1.25] text-text-tertiary"
              delay={40}
              animateBy="letters"
              direction="top"
            />
          </div>
          <div className="hidden md:flex flex-col items-center gap-0">
            <BlurText
              text="从定义任务，到验收交付"
              className="font-display justify-center text-center text-[clamp(1.5rem,4.8vw,3.5rem)] font-semibold leading-[1.18] text-white"
              delay={40}
              animateBy="letters"
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
          <ScrollReveal key={step.letter} delay={0.08 * (i + 1)}>
            <div className="relative z-[1] mx-auto w-full max-w-[360px] text-left flex gap-5 items-start lg:mx-0 lg:max-w-none">
              {/* 左列：圆点 + 字母（移动端）；电脑端只显示圆点 */}
              <div className="flex flex-col items-center gap-3 flex-shrink-0 pt-1.5 w-10 lg:w-auto lg:block">
                <div className={`relative z-[2] w-3 h-3 rounded-full ${step.color}`}>
                  <div className="absolute -inset-1.5 rounded-full border border-white/[0.15] animate-[dotPulse_3s_ease-in-out_infinite]" />
                </div>
                <p className="font-display text-[2.5rem] font-semibold leading-none text-white lg:hidden">
                  {step.letter}
                </p>
              </div>
              {/* 右列：内容；电脑端字母仍显示在内容顶部 */}
              <div className="min-w-0 flex-1">
                <p className="hidden lg:block font-display text-[2.75rem] font-semibold leading-none text-white mb-3">
                  {step.letter}
                </p>
                <h3 className="font-body text-sm font-semibold tracking-[0.06em] text-text-secondary uppercase mb-1">
                  {step.title}
                </h3>
                <p className="font-body text-[10.5px] tracking-[0.1em] text-text-muted mb-2.5 uppercase">{step.label}</p>
                <p className="text-[13px] text-text-tertiary leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Research Archive */}
      <div>
        <ScrollReveal>
          <p className="font-body text-[10.5px] font-medium tracking-[0.20em] text-text-tertiary uppercase mb-8 text-center">
            研究归档
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {RESEARCH_TOPICS.map((topic, i) => {
            const Card = topic.href ? 'a' : 'div';
            const isClickable = !!topic.href;
            return (
            <ScrollReveal key={topic.num} delay={0.1 * (i + 1)}>
              <Card
                {...(topic.href ? { href: topic.href, target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`group block p-6 rounded-2xl bg-[#0c0c1a] border transition-all duration-500
                  ${isClickable
                    ? 'border-white/[0.12] cursor-pointer cursor-target no-underline hover:border-neon-cyan/50 hover:bg-[#0e0e1e] hover:-translate-y-1 hover:shadow-[0_0_48px_rgba(0,200,255,0.10),0_20px_56px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.04)]'
                    : 'border-dashed border-white/[0.1] bg-transparent opacity-70 shadow-none'
                  }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <p className={`font-body text-[11px] font-medium tracking-[0.12em] ${isClickable ? 'text-neon-cyan' : 'text-text-muted'}`}>
                    {topic.num}
                  </p>
                  {isClickable ? (
                    <span className="inline-flex items-center gap-1.5 text-neon-cyan/70 text-[11px] font-medium tracking-[0.06em] transition-all duration-400 group-hover:text-neon-cyan group-hover:gap-2">
                      查看 <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-[10px] transition-all duration-400 group-hover:bg-neon-cyan/20 group-hover:border-neon-cyan/40 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">&rarr;</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-white/[0.1] text-text-muted text-[10px] font-medium tracking-[0.1em] uppercase">
                      整理中
                    </span>
                  )}
                </div>
                <h3 className="font-display text-[1.375rem] font-semibold leading-snug text-white mb-2 transition-colors duration-400 group-hover:text-neon-cyan/90">
                  {topic.title}
                </h3>
                <p className="text-[13px] text-text-tertiary leading-relaxed">
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
