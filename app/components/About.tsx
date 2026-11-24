"use client";

import BlurText from "../reactbits/TextAnimations/BlurText/BlurText";
import { ScrollReveal } from "./ScrollReveal";

const CAPABILITIES = [
  {
    num: "01",
    id: "about-product",
    title: "业务流程与个人智能体",
    subtitle: "角色边界、记忆与授权控制",
    desc: "深入具体工作场景梳理谁在用、哪些信息敏感、何时必须由人拍板。在 HR 搭档中围绕组织架构与招聘台账设计 AI 辅助，在 QuickNote 中验证便签勾选授权与写入确认。",
    tags: ["业务流程拆解", "授权范围", "人工确认"],
  },
  {
    num: "02",
    id: "about-agent",
    title: "多 Agent 协作与混合路由",
    subtitle: "专家分工、交接与多模型组合",
    desc: "在 Tango 中让竞品、文案与设计专家围绕同一上新任务接力交付；在 Foldframe 中打通商业生图到 13 端发布并支持本机与云端多模型路由；同时持续研究 A2A 跨系统交接。",
    tags: ["Multi-Agent", "A2A / MCP", "本机与云端接入"],
  },
  {
    num: "03",
    id: "about-validation",
    title: "Harness 验证与极客造物",
    subtitle: "轨迹核验、持续迭代与原型实证",
    desc: "紧跟前沿模型与开源架构演进，从失败样本反推运行规则与重试边界。遇到交互假设时直接动手做成桌面工具或像 Claude Signal 这样的实体审批装置，用可运行产物说话。",
    tags: ["Harness Engineering", "任务级评测", "软硬件原型验证"],
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
            <p className="font-body text-[11px] font-medium tracking-[0.20em] text-text-tertiary uppercase mb-6">
              关于
            </p>
          </ScrollReveal>

          <BlurText
            segments={["把前沿判断落进业务场景，", "做成可检验的产品。"]}
            className="section-display-heading font-display text-[clamp(2rem,4.1vw,3rem)] leading-[1.24] text-[#f5f7ff] mb-7"
            delay={70}
            direction="top"
          />

          <ScrollReveal delay={0.18}>
            <p className="text-[15px] text-text-secondary leading-[1.78] mb-4 max-w-[500px]">
              我是黄锡源（HXY），AI 产品经理。相比停留在概念讨论，我更习惯深入真实业务流程——先理清角色分工、交付标准与数据权限，再设计模型与 Agent 的协作方式。
            </p>
            <p className="text-[14px] text-text-tertiary leading-[1.78] mb-9 max-w-[500px]">
              日常我保持高频的一手前沿追踪与机制拆解，持续迭代自己的 AI 工具链；当产生新的产品或交互设想时，会借助 AI Coding 工具快速做出桌面工作台、macOS 工具或硬件交互原型，在真实运行中验证取舍。
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.26}>
            <div className="flex flex-wrap gap-2.5">
              {["企业工作流拆解", "个人智能体", "多 Agent 协作", "Harness 与评测", "快速原型实证"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full font-body text-[12px] font-medium tracking-[0.03em] text-text-secondary bg-white/[0.04] border border-white/[0.11]"
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
            <ScrollReveal key={cap.num} delay={0.08 * (i + 1)}>
              <div id={cap.id} className="scroll-mt-28 border-l border-white/[0.12] pl-6 transition-colors duration-300 hover:border-neon-cyan">
                <p className="font-display text-[12.5px] tabular-nums tracking-[0.12em] text-text-muted mb-1">
                  {cap.num}
                </p>
                <h3 className="card-display-title font-display text-[1.4rem] leading-snug text-[#f5f7ff] mb-1">
                  {cap.title}
                </h3>
                <p className="font-body text-[11.5px] tracking-[0.06em] text-text-tertiary uppercase mb-2.5">{cap.subtitle}</p>
                <p className="text-[13.5px] text-text-tertiary leading-[1.74] mb-3.5">
                  {cap.desc}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {cap.tags.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full font-body text-[10.5px] tracking-[0.03em] text-text-tertiary bg-white/[0.03] border border-white/[0.09]">
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
