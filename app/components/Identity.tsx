"use client";

import BlurText from "../reactbits/TextAnimations/BlurText/BlurText";
import { ScrollReveal } from "./ScrollReveal";

const TOOLS = [
  { label: "Personal Agent", desc: "让智能体记住经确认的偏好，并按工作区权限和执行频率处理任务" },
  { label: "多 Agent 编排", desc: "给专家分配可验收的子任务，明确交接材料和最终汇总人" },
  { label: "A2A / MCP", desc: "研究独立 Agent 如何交接任务，以及怎样接入工具和数据" },
  { label: "Harness 与评测", desc: "为长任务设计状态记录、断点恢复、验证规则和人工接管" },
];

const FOCUS = [
  { label: "记忆与权限", desc: "区分用户确认的长期记忆和一次任务的临时信息" },
  { label: "交接与产物", desc: "在任务交接时同时传递要求、证据、当前状态与可检查的产物" },
  { label: "人工接管", desc: "到达审批点时展示将执行的操作和影响，方便批准、修改或停止" },
];

export function Identity() {
  return (
    <section
      id="identity"
      className="relative z-10 w-full px-6 md:px-12 py-16 md:py-24"
    >
      <ScrollReveal>
        <p className="font-body text-[11px] font-medium tracking-[0.20em] text-text-tertiary uppercase mb-6">
          产品方向
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* Left */}
        <div>
          <BlurText
            segments={["把\u00A0Agent\u00A0的任务进度和", "交付结果交给用户看"]}
            className="section-display-heading font-display text-[clamp(2rem,4.4vw,3.35rem)] leading-[1.22] text-[#f5f7ff]"
            delay={70}
            direction="top"
          />
          <ScrollReveal delay={0.18}>
            <p className="font-body text-[15px] text-text-tertiary mt-5 leading-[1.75] max-w-[56ch]">
              我关注用户把一件事交给 Agent 之后的体验。Tango 展示专家怎样接力完成同一项任务，QuickNote 让用户决定 Codex 能读哪些便签、何时能写入。
            </p>
          </ScrollReveal>
        </div>

        {/* Right: tools + focus */}
        <div className="flex flex-col gap-7">
          <ScrollReveal delay={0.14}>
            <div>
              <p className="font-body text-[11px] font-medium tracking-[0.14em] text-text-tertiary uppercase mb-3.5">
                产品设计
              </p>
              <div className="flex flex-wrap gap-2.5">
                {TOOLS.map((t) => (
                  <span key={t.label} title={t.desc}
                    className="px-4 py-2 rounded-full font-body text-[12px] font-medium tracking-[0.03em] text-text-secondary bg-white/[0.04] border border-white/[0.11] cursor-default"
                  >
                    {t.label}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.22}>
            <div>
              <p className="font-body text-[11px] font-medium tracking-[0.14em] text-text-tertiary uppercase mb-3.5">
                当前关注
              </p>
              <div className="flex flex-wrap gap-2.5">
                {FOCUS.map((f) => (
                  <span key={f.label} title={f.desc}
                    className="px-4 py-2 rounded-full font-body text-[12px] font-medium tracking-[0.04em] text-neon-cyan bg-neon-cyan/[0.06] border border-neon-cyan/[0.24] cursor-default"
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
