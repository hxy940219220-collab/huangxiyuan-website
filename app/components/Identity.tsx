"use client";

import BlurText from "../reactbits/TextAnimations/BlurText/BlurText";
import { ScrollReveal } from "./ScrollReveal";

const PERSPECTIVES = [
  {
    num: "01",
    title: "业务场景拆解",
    desc: "结合跨境、人事与内容生产流程，厘清角色分工、台账核验与权限成本边界。",
  },
  {
    num: "02",
    title: "Agent 协作设计",
    desc: "定义单智能体跟进与多专家接力机制，明确 MCP 授权范围与关键节点人工确认。",
  },
  {
    num: "03",
    title: "原型快速实证",
    desc: "借助 AI 研发工具链快速落地桌面、macOS 与硬件原型，在真实运行中校准体验。",
  },
];

const FOCUS = ["权限隔离", "阶段交接", "混合模型路由", "低摩擦审批"];

export function Identity() {
  return (
    <section
      id="identity"
      className="relative z-10 w-full px-6 md:px-12 py-12 md:py-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-14 lg:items-stretch">
        {/* Left: Compact Thesis + Bottom-Aligned Focus Tags (Desktop Equal Height) */}
        <ScrollReveal className="h-full">
          <div className="flex h-full flex-col justify-between">
            <div>
              <p className="font-body text-[11px] font-medium tracking-[0.20em] text-text-tertiary uppercase mb-3.5">
                产品方向
              </p>
              <BlurText
                segments={["把复杂业务拆清楚，", "做成可控的 AI 产品"]}
                className="section-display-heading font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.22] text-[#f5f7ff]"
                delay={55}
                direction="top"
              />
              <p className="font-body text-[14px] md:text-[15px] text-text-tertiary mt-3.5 leading-[1.72] max-w-[46ch]">
                深入跨境上新、组织人事与多端内容生产等真实工作流，用可运行的软件与硬件原型验证 Agent 协作边界。
              </p>
            </div>

            <div className="mt-6 lg:mt-0 pt-2">
              <p className="font-body text-[10.5px] font-medium tracking-[0.14em] text-text-muted uppercase mb-2.5">
                核心关注
              </p>
              <div className="flex flex-wrap gap-2">
                {FOCUS.map((label) => (
                  <span
                    key={label}
                    className="px-3 py-1.5 rounded-full font-body text-[11.5px] font-medium tracking-[0.03em] text-neon-cyan bg-neon-cyan/[0.06] border border-neon-cyan/[0.24]"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Right: Equal-Height Three-Row Perspective Panel */}
        <ScrollReveal delay={0.08} className="h-full">
          <div className="flex h-full flex-col justify-between overflow-hidden rounded-[20px] border border-white/[0.10] bg-[#0b0b14] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] divide-y divide-white/[0.07]">
            {PERSPECTIVES.map((item) => (
              <div
                key={item.num}
                className="flex flex-1 flex-col justify-center px-5 py-4 md:px-6 md:py-5"
              >
                <div className="flex items-baseline gap-2.5">
                  <span className="font-display text-[12.5px] tabular-nums tracking-[0.12em] text-neon-cyan">
                    {item.num}
                  </span>
                  <h3 className="card-display-title font-display text-[1.2rem] md:text-[1.28rem] leading-snug text-[#f5f7ff]">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-1.5 font-body text-[13px] md:text-[13.5px] text-text-tertiary leading-[1.65] pl-0 md:pl-6">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
