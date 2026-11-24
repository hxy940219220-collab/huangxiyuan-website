import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

const title = "个人智能体与多 Agent 产品设计";
const description =
  "从个人智能体的记忆与授权，到多 Agent 分工、A2A 跨系统交接，以及长任务的 Harness 与任务级评测。";

export const metadata: Metadata = {
  title: `${title} | HXY 研究`,
  description,
  alternates: { canonical: "/research/agent-product" },
};

const notes = [
  {
    id: "personal-agent",
    num: "01",
    nav: "身份与授权",
    title: "个人智能体要让用户知道它在替谁做事",
    paragraphs: [
      "持续运行的个人智能体可以记住偏好、按计划跟进，或等事件发生再开始处理。我会把用户授权、可长期保留的记忆和单次任务上下文分开设计。用户能查看、修正或撤销这些设置，涉及发信、发布、写入时，可以先看清待执行的操作。",
      "QuickNote 验证了一个具体场景：用户勾选 Codex 可以读取的便签位置，隐藏和敏感便签被自动排除。即使开启写入提议，用户仍要在应用里确认每次新建或追加。",
    ],
    sources: [
      { label: "Grok Bot 运行机制", href: "https://docs.x.ai/grok-bot/how-grok-bot-works" },
      { label: "OpenAI dots 产品介绍", href: "https://openai.com/index/introducing-dots/" },
    ],
    project: {
      badge: "实证项目 · 05",
      label: "QuickNote · 便签授权与写入确认机制",
      desc: "查看 macOS 端 MCP 读写边界与待确认提议的真实界面",
      href: "/projects/quicknote",
    },
  },
  {
    id: "multi-agent",
    num: "02",
    nav: "多专家分工",
    title: "多 Agent 分工从可检查的交付物开始",
    paragraphs: [
      "只有能独立推进、能检查结果的工作，才值得拆给不同 Agent。比如竞品研究可以先收集资料，再交给文案和设计专家分别生成标题与主图。交接时带上适用渠道、来源、已知限制和阶段产物，负责整合的 Agent 才能识别冲突和遗漏。",
      "Tango 将多个专家的阶段进度、研究报告和设计图放在同一条任务里。用户可以打开原始报告核对判断，也能直接下载最终设计产物。",
    ],
    sources: [
      {
        label: "Anthropic 多 Agent 研究系统",
        href: "https://www.anthropic.com/research/multi-agent-research-system",
      },
      {
        label: "OpenAI 多 Agent 文档",
        href: "https://developers.openai.com/api/docs/guides/agents-api/multi-agent",
      },
    ],
    project: {
      badge: "实证项目 · 01",
      label: "Tango · 跨境电商多专家协作工作台",
      desc: "查看竞品顾问、Listing 文案与视觉设计如何在同一会话中接力交付",
      href: "/projects/tango",
    },
  },
  {
    id: "protocols",
    num: "03",
    nav: "A2A 与 MCP",
    title: "跨系统交接用 A2A，接入工具和数据用 MCP",
    paragraphs: [
      "A2A（Agent-to-Agent）允许独立 Agent 查询对方提供的能力，交付任务并接收状态与产物。例如研究 Agent 把有来源的调研文档交给另一个系统里的写作 Agent，后者可以追问缺项并返回草稿。产品侧还要定义每次交接允许传递哪些字段，以及超时或权限不足时由谁接管。",
      "MCP 解决 Agent 如何使用工具、读取资源或连接数据源。一个接受 A2A 任务的 Agent 可以在授权范围内通过 MCP 查资料，再把完成的产物交回。两种协议可以出现在同一条链路的不同环节。",
    ],
    sources: [
      { label: "A2A 官方规范", href: "https://a2a-protocol.org/latest/specification/" },
      { label: "MCP 架构说明", href: "https://modelcontextprotocol.io/docs/learn/architecture" },
    ],
    project: {
      badge: "实证项目 · 02",
      label: "Foldframe · 本机多引擎与 13 平台分发链路",
      desc: "查看多模型路由与跨平台内容排期如何串成统一工作台",
      href: "/projects/foldframe",
    },
  },
  {
    id: "harness-evals",
    num: "04",
    nav: "Harness 与评测",
    title: "用 Harness 和任务级评测看交付是否可靠",
    paragraphs: [
      "把上下文、工具、运行权限、重试和检查点交给 Harness。对长任务尤其要保留进度和执行证据，允许用户暂停、修改任务或从上一个有效检查点恢复。",
      "评测用真实任务和失败案例。例行记录产物通过率、人工介入率、完成时间与单次交付成本。升级模型或修改工具后复跑同一套样本，检查它是否真的减少了返工。",
    ],
    sources: [
      {
        label: "OpenAI Agents API 与托管 Harness",
        href: "https://openai.com/index/introducing-the-agents-api/",
      },
      {
        label: "任务轨迹与评测实践",
        href: "https://developers.openai.com/cookbook/examples/agents_sdk/agent_improvement_loop",
      },
    ],
  },
];

const nextReads = [
  {
    num: "02",
    title: "AI 前沿时间线",
    subtitle: "追踪 GPT-6.2、Claude 5、Gemini 4 与个人智能体运行时演进",
    href: "/ai-frontier-timeline.html",
  },
  {
    num: "03",
    title: "Harness Engineering",
    subtitle: "提示词之外的上下文、工具、验证器与长周期任务恢复机制",
    href: "/harness-engineering.html",
  },
];

export default function AgentProductResearchPage() {
  return (
    <main className="relative z-10 min-h-screen overflow-hidden bg-bg-deepest text-text-primary">
      {/* Top Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[44rem] bg-[radial-gradient(circle_at_50%_0%,rgba(0,200,255,0.10),transparent_62%)]"
      />

      {/* Sticky Editorial Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#050509]/82 px-5 py-4 backdrop-blur-2xl md:px-10">
        <div className="mx-auto flex max-w-[1040px] items-center justify-between gap-4">
          <Link
            href="/"
            className="cursor-target font-display text-[13px] tracking-[0.14em] text-[#f5f7ff] no-underline"
          >
            HXY <span className="font-body text-[11.5px] text-text-tertiary">/ RESEARCH</span>
          </Link>
          <Link
            href="/#method"
            className="cursor-target rounded-full border border-white/[0.14] bg-white/[0.03] px-4 py-2 font-body text-[11.5px] tracking-[0.06em] text-text-secondary no-underline transition-colors hover:border-neon-cyan hover:text-[#f5f7ff]"
          >
            ← 返回研究归档
          </Link>
        </div>
      </header>

      <article className="relative mx-auto max-w-[820px] px-6 pb-24 pt-16 md:px-10 md:pt-24">
        {/* Monograph Header */}
        <header className="border-b border-white/[0.11] pb-10">
          <div className="mb-5 flex flex-wrap items-center gap-3 font-body text-[11px] font-medium tracking-[0.16em] text-neon-cyan uppercase">
            <span>RESEARCH MONOGRAPH · 01</span>
            <span className="h-px w-8 bg-neon-cyan/60" aria-hidden="true" />
            <time dateTime="2026-11-21" className="text-text-tertiary">
              2026.11 更新
            </time>
          </div>
          <h1 className="section-display-heading font-display text-balance text-[clamp(2.15rem,5.2vw,3.55rem)] leading-[1.18] text-[#f5f7ff]">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl font-body text-[15.5px] leading-[1.82] text-text-secondary">
            {description}
          </p>

          {/* Chapter Anchor Bar */}
          <nav
            aria-label="章节导览"
            className="mt-8 flex flex-wrap items-center gap-2"
          >
            {notes.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="cursor-target inline-flex items-center gap-1.5 rounded-full border border-white/[0.11] bg-white/[0.03] px-3.5 py-1.5 font-body text-[12px] text-text-tertiary no-underline transition-colors hover:border-neon-cyan/45 hover:text-[#f5f7ff]"
              >
                <span className="font-display text-[11px] tabular-nums text-neon-cyan">
                  {n.num}
                </span>
                <span>{n.nav}</span>
              </a>
            ))}
          </nav>
        </header>

        {/* Sections */}
        <div className="divide-y divide-white/[0.09]">
          {notes.map(({ id, num, title: sectionTitle, paragraphs, sources, project }) => (
            <section key={id} id={id} className="scroll-mt-24 py-11 md:py-14">
              <div className="mb-3 flex items-center gap-3">
                <span className="font-display text-[14px] tabular-nums tracking-[0.14em] text-neon-cyan">
                  {num}
                </span>
                <span className="h-px w-6 bg-white/[0.14]" aria-hidden="true" />
              </div>

              <h2 className="card-display-title font-display text-balance text-[clamp(1.42rem,3vw,1.9rem)] leading-snug text-[#f5f7ff]">
                {sectionTitle}
              </h2>

              <div className="mt-5 space-y-4">
                {paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="font-body text-[15.5px] leading-[1.85] text-text-secondary"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Linked Portfolio Evidence Callout */}
              {project && (
                <Link
                  href={project.href}
                  className="cursor-target group mt-7 flex items-center justify-between gap-4 rounded-[16px] border border-white/[0.11] bg-[#0b0b14] p-5 no-underline shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 hover:border-neon-cyan/45 hover:bg-[#0e0e1b]"
                >
                  <div>
                    <p className="font-body text-[10.5px] font-medium tracking-[0.14em] text-neon-cyan uppercase">
                      {project.badge}
                    </p>
                    <p className="card-display-title mt-1.5 font-display text-[1.15rem] text-[#f5f7ff] transition-colors group-hover:text-neon-cyan">
                      {project.label}
                    </p>
                    <p className="mt-1 font-body text-[12.5px] text-text-tertiary">
                      {project.desc}
                    </p>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] text-text-secondary transition-all duration-300 group-hover:border-neon-cyan/45 group-hover:text-neon-cyan">
                    <ArrowRight size={15} weight="regular" />
                  </span>
                </Link>
              )}

              {/* Primary Sources */}
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="mr-1 font-body text-[11px] tracking-[0.08em] text-text-muted uppercase">
                  参考来源：
                </span>
                {sources.map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-target inline-flex items-center gap-1.5 rounded-full border border-white/[0.11] bg-white/[0.03] px-3 py-1 font-body text-[12px] text-text-secondary no-underline transition-colors hover:border-white/[0.26] hover:text-[#f5f7ff]"
                  >
                    <span>{label}</span>
                    <ArrowUpRight size={12} weight="regular" className="text-text-muted" />
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Further Reading Pager */}
        <nav aria-label="延伸研究阅读" className="mt-12 border-t border-white/[0.11] pt-12">
          <p className="mb-5 font-body text-[11px] font-medium tracking-[0.18em] text-text-muted uppercase">
            延伸阅读 · Further Research
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {nextReads.map((item) => (
              <a
                key={item.num}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-target group flex flex-col justify-between rounded-[18px] border border-white/[0.10] bg-[#0b0b14] p-6 no-underline shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-neon-cyan/45 hover:bg-[#0e0e1b]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-[12.5px] tabular-nums tracking-[0.12em] text-neon-cyan">
                    {item.num}
                  </span>
                  <ArrowUpRight
                    size={15}
                    weight="regular"
                    className="text-text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neon-cyan"
                  />
                </div>
                <div className="mt-4">
                  <p className="card-display-title font-display text-[1.3rem] leading-snug text-[#f5f7ff] transition-colors group-hover:text-neon-cyan">
                    {item.title}
                  </p>
                  <p className="mt-1.5 font-body text-[12.5px] leading-relaxed text-text-tertiary">
                    {item.subtitle}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </nav>
      </article>
    </main>
  );
}
