"use client";

import BlurText from "../reactbits/TextAnimations/BlurText/BlurText";
import { ScrollReveal } from "./ScrollReveal";

const CAPABILITIES = [
  {
    num: "01",
    id: "about-product",
    title: "个人智能体",
    subtitle: "授权、记忆与持续执行",
    desc: "设计智能体可以读取什么、哪些偏好值得长期记住，以及什么时候需要请用户确认。用 QuickNote 的便签授权与写入审核验证这些交互。",
    tags: ["Personal Agent", "授权范围", "人工确认"],
  },
  {
    num: "02",
    id: "about-agent",
    title: "多 Agent 协作",
    subtitle: "分工、交接与结果汇总",
    desc: "在 Tango 里，让竞品研究、文案和设计专家共享同一个任务的阶段结果。面向跨系统协作时，我研究 A2A 如何传递任务、状态和产物，以及权限如何随交接收紧。",
    tags: ["Multi-Agent", "Agent-to-Agent", "阶段交付"],
  },
  {
    num: "03",
    id: "about-validation",
    title: "Harness 与评测",
    subtitle: "工具调用、错误恢复与人工接管",
    desc: "从失败案例反推运行规则，检查工具调用、重试和交付证据。软件上做写入和发布前的审批，硬件上用 Claude Signal 的实体按钮探索降低审批摩擦。",
    tags: ["Harness Engineering", "任务评测", "软硬件验证"],
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
            text="我做可以交付真实工作的 AI 产品。"
            className="font-display text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.2] text-white mb-7"
            delay={40}
            animateBy="words"
            direction="top"
          />

          <ScrollReveal delay={0.3}>
            <p className="text-[15px] text-text-secondary leading-relaxed mb-4 max-w-[480px]">
              我是黄锡源（HXY），AI 产品经理。我用 GPT、Claude 和 Gemini 验证复杂任务，也用 Grok Bot 和开发 Harness 研究持续运行的 Agent 怎样承接工作、调用工具和交付成果。
            </p>
            <p className="text-sm text-text-tertiary leading-relaxed mb-9">
              我会先定义交付物和验收条件，再决定某个任务适合一个 Agent 完成，还是需要多位专家交接。我用工作台、macOS 工具和实体审批原型检验这些设计。
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex flex-wrap gap-2.5">
              {["个人智能体", "多 Agent 协作", "A2A / MCP", "Harness 与评测", "软硬件原型"].map((tag) => (
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
                <h3 className="font-display text-[1.375rem] font-semibold leading-snug text-white mb-1">
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
