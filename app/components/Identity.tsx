"use client";

import BlurText from "../reactbits/TextAnimations/BlurText/BlurText";
import { ScrollReveal } from "./ScrollReveal";

const TOOLS = [
  { label: "模型选型与边界", desc: "并行使用 GPT、Claude、Gemini，按推理、长文档、编码与成本选择模型" },
  { label: "Agent 系统设计", desc: "理解 agent loop、runtime、memory、state 与 tool calling 的协作机制" },
  { label: "Harness Engineering", desc: "用 skills、MCP、验证器、反馈与恢复机制提升长任务可靠性" },
  { label: "软硬件原型", desc: "把 AI 工作流连接到 macOS、Raspberry Pi、STM32 与 ESP32-S3" },
];

const FOCUS = [
  { label: "Agent 产品化", desc: "把记忆、工具与人机确认组织成稳定体验" },
  { label: "AI × 嵌入式交互", desc: "让模型与 Agent 状态进入传感器、灯光、屏幕和实体按键" },
  { label: "模型能力边界", desc: "理解不同模型能做什么、何时失败，以及如何设计兜底" },
];

export function Identity() {
  return (
    <section
      id="identity"
      className="relative z-10 w-full px-6 md:px-12 py-16 md:py-24"
    >
      <ScrollReveal>
        <p className="font-body text-[10.5px] font-medium tracking-[0.20em] text-text-tertiary uppercase mb-6">
          个人定位 // HX-01
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* Left */}
        <div>
          <BlurText
            text="把模型、Agent 与硬件做成真实可用的产品"
            className="font-display italic text-[clamp(36px,5vw,56px)] leading-[1.08] tracking-[-0.02em] text-white"
            delay={40}
            animateBy="letters"
            direction="top"
          />
          <ScrollReveal delay={0.3}>
            <p className="font-body text-[15px] text-text-tertiary mt-5 leading-relaxed">
              从模型选型和 Agent 运行机制，到 macOS 工具、文档工作流与嵌入式交互，我关注能力怎样进入用户路径、怎样被验证，以及失败时怎样恢复。
            </p>
          </ScrollReveal>
        </div>

        {/* Right: tools + focus */}
        <div className="flex flex-col gap-7">
          <ScrollReveal delay={0.2}>
            <div>
              <p className="font-body text-[11px] font-medium tracking-[0.12em] text-text-muted uppercase mb-4">
                核心工具栈
              </p>
              <div className="flex flex-wrap gap-2.5">
                {TOOLS.map((t) => (
                  <span key={t.label} title={t.desc}
                    className="px-4 py-2 rounded-full font-body text-[12px] font-medium tracking-[0.04em] text-text-secondary bg-white/[0.04] border border-white/[0.1] cursor-default"
                  >
                    {t.label}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div>
              <p className="font-body text-[11px] font-medium tracking-[0.12em] text-text-muted uppercase mb-4">
                当前关注
              </p>
              <div className="flex flex-wrap gap-2.5">
                {FOCUS.map((f) => (
                  <span key={f.label} title={f.desc}
                    className="px-4 py-2 rounded-full font-body text-[12px] font-medium tracking-[0.04em] text-neon-cyan bg-neon-cyan/[0.06] border border-neon-cyan/[0.2] cursor-default"
                  >
                    {f.label}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
