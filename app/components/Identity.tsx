"use client";

import BlurText from "../reactbits/TextAnimations/BlurText/BlurText";
import { ScrollReveal } from "./ScrollReveal";

const PERSPECTIVES = [
  {
    num: "01",
    title: "企业与业务场景拆解",
    en: "Business & Org Workflow",
    desc: "结合跨境电商上新（Tango）、组织人事与招聘台账（HR 搭档）、多平台内容生产（Foldframe），厘清角色分工、权限隔离、本机/云端混合接入与成本边界。",
  },
  {
    num: "02",
    title: "Agent 协作与交互定义",
    en: "Agent & Protocol Design",
    desc: "判断何时由单智能体持续跟进、何时拆给多专家接力，定义 A2A 交接上下文、MCP 工具读写授权范围与关键节点的人工确认。",
  },
  {
    num: "03",
    title: "AI 原生快速原型验证",
    en: "Hands-on Prototyping",
    desc: "善用 AI 辅助研发工具链，把产品假设快速做成桌面工作台、macOS 工具与实体交互装置，在实际运行中校准体验细节。",
  },
];

const FOCUS = [
  { label: "记忆与权限隔离", desc: "区分用户确认的长期记忆与单次任务临时上下文" },
  { label: "阶段交接与证据留痕", desc: "交接时同步传递要求、来源依据、当前状态与可核验产物" },
  { label: "本机与云端混合接入", desc: "按隐私和成本灵活组合本地模型与云端 API，避免单一厂商锁定" },
  { label: "低摩擦人工审批", desc: "到达关键执行点时清晰展示影响范围，降低用户确认与接管成本" },
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

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] gap-10 md:gap-16 items-start">
        {/* Left: Core Thesis + Focus Pills */}
        <div>
          <BlurText
            segments={["从真实业务流程出发，", "把前沿能力变成可控产品"]}
            className="section-display-heading font-display text-[clamp(2rem,4.1vw,3.2rem)] leading-[1.24] text-[#f5f7ff]"
            delay={70}
            direction="top"
          />
          <ScrollReveal delay={0.16}>
            <p className="font-body text-[15px] text-text-tertiary mt-5 leading-[1.78] max-w-[54ch]">
              我关注 AI 进入具体工作场景后的真实闭环：既在 Tango、HR 搭档与 Foldframe 中拆解跨岗位分工、业务台账与多平台分发，也在 QuickNote 与 Claude Signal 中探索工具授权边界与低摩擦的人工审批。
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.24}>
            <div className="mt-8">
              <p className="font-body text-[11px] font-medium tracking-[0.14em] text-text-muted uppercase mb-3.5">
                当前重点命题
              </p>
              <div className="flex flex-wrap gap-2.5">
                {FOCUS.map((f) => (
                  <span
                    key={f.label}
                    title={f.desc}
                    className="px-3.5 py-1.5 rounded-full font-body text-[12px] font-medium tracking-[0.03em] text-neon-cyan bg-neon-cyan/[0.06] border border-neon-cyan/[0.24] cursor-default"
                  >
                    {f.label}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right: Three-Layer Product Perspective Panel */}
        <ScrollReveal delay={0.14}>
          <div className="overflow-hidden rounded-[22px] border border-white/[0.10] bg-[#0b0b14] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_12px_48px_rgba(0,0,0,0.45)] divide-y divide-white/[0.07]">
            {PERSPECTIVES.map((item) => (
              <div
                key={item.num}
                className="p-6 md:p-7 transition-colors duration-300 hover:bg-white/[0.015]"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-[13px] tabular-nums tracking-[0.12em] text-neon-cyan">
                      {item.num}
                    </span>
                    <h3 className="card-display-title font-display text-[1.3rem] md:text-[1.38rem] leading-snug text-[#f5f7ff]">
                      {item.title}
                    </h3>
                  </div>
                  <span className="font-body text-[10.5px] tracking-[0.12em] text-text-muted uppercase">
                    {item.en}
                  </span>
                </div>
                <p className="font-body text-[13.5px] text-text-tertiary leading-[1.74] pl-0 md:pl-7">
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
