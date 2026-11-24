"use client";

import BlurText from "../reactbits/TextAnimations/BlurText/BlurText";
import { ScrollReveal } from "./ScrollReveal";

const CAPABILITIES = [
  {
    num: "01",
    id: "about-product",
    title: "业务流程与个人智能体",
    desc: "深入具体工作场景厘清角色分工与敏感数据边界，在 HR 搭档与 QuickNote 中验证受控授权与人工确认。",
    tags: ["业务拆解", "权限范围", "人工确认"],
  },
  {
    num: "02",
    id: "about-agent",
    title: "多 Agent 协作与混合路由",
    desc: "在 Tango 与 Foldframe 中组织多专家接力与本机/云端多模型接入，持续跟进 A2A 跨系统交接。",
    tags: ["Multi-Agent", "A2A / MCP", "多模型接入"],
  },
  {
    num: "03",
    id: "about-validation",
    title: "Harness 验证与原型实证",
    desc: "保持高频前沿拆解，遇到关键交互假设时直接做出桌面工具或实体审批硬件（Claude Signal）检验闭环。",
    tags: ["Harness", "任务评测", "软硬件原型"],
  },
];

export function About() {
  return (
    <section
      id="about"
      className="relative z-10 w-full px-6 md:px-12 py-12 md:py-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-16 items-start">
        {/* Left */}
        <div>
          <ScrollReveal>
            <p className="font-body text-[11px] font-medium tracking-[0.20em] text-text-tertiary uppercase mb-4">
              关于
            </p>
          </ScrollReveal>

          <BlurText
            segments={["把前沿判断落进业务，", "做成可检验的产品。"]}
            className="section-display-heading font-display text-[clamp(1.85rem,4vw,2.9rem)] leading-[1.24] text-[#f5f7ff] mb-5"
            delay={55}
            direction="top"
          />

          <ScrollReveal delay={0.12}>
            <p className="text-[14.5px] md:text-[15px] text-text-secondary leading-[1.75] mb-6 max-w-[480px]">
              我是黄锡源（HXY），AI 产品经理。我习惯先理清业务里的角色分工、交付标准与权限边界，再设计模型与 Agent 协作；同时持续追踪前沿演进迭代工具链，用可运行的软件与硬件原型验证产品取舍。
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.18}>
            <div className="flex flex-wrap gap-2">
              {["企业工作流", "个人智能体", "多 Agent 协作", "Harness 与评测", "快速原型验证"].map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 rounded-full font-body text-[11.5px] font-medium tracking-[0.03em] text-text-secondary bg-white/[0.04] border border-white/[0.11]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Right: capabilities */}
        <div className="flex flex-col gap-6">
          {CAPABILITIES.map((cap, i) => (
            <ScrollReveal key={cap.num} delay={0.05 * (i + 1)}>
              <div id={cap.id} className="scroll-mt-28 border-l border-white/[0.12] pl-5 transition-colors duration-250 hover:border-neon-cyan">
                <div className="flex items-baseline gap-2.5 mb-1">
                  <span className="font-display text-[12px] tabular-nums tracking-[0.12em] text-neon-cyan">
                    {cap.num}
                  </span>
                  <h3 className="card-display-title font-display text-[1.28rem] md:text-[1.35rem] leading-snug text-[#f5f7ff]">
                    {cap.title}
                  </h3>
                </div>
                <p className="text-[13px] md:text-[13.5px] text-text-tertiary leading-[1.68] mb-2.5">
                  {cap.desc}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {cap.tags.map((t) => (
                    <span key={t} className="px-2.5 py-0.5 rounded-full font-body text-[10.5px] tracking-[0.03em] text-text-tertiary bg-white/[0.03] border border-white/[0.09]">
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
