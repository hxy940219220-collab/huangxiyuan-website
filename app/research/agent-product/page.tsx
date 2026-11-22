import type { Metadata } from "next";
import Link from "next/link";

const title = "个人智能体与多 Agent 产品设计";
const description = "从个人智能体的记忆与授权，到多 Agent 分工、A2A 跨系统交接，以及长任务的 Harness 与评测。";

export const metadata: Metadata = {
  title: `${title} | HXY 研究`,
  description,
  alternates: { canonical: "/research/agent-product" },
};

const notes = [
  {
    title: "个人智能体要让用户知道它在替谁做事",
    paragraphs: [
      "持续运行的个人智能体可以记住偏好、按计划跟进，或等事件发生再开始处理。我会把用户授权、可长期保留的记忆和单次任务上下文分开设计。用户能查看、修正或撤销这些设置，涉及发信、发布、写入时，可以先看清待执行的操作。",
      "QuickNote 验证了一个具体场景。用户勾选 Codex 可以读的便签位置，隐藏和敏感便签被排除。即使开启写入提议，用户仍要在应用里确认每次新建或追加。",
    ],
    sources: [
      { label: "Grok Bot 运行机制", href: "https://docs.x.ai/grok-bot/how-grok-bot-works" },
      { label: "OpenAI dots 产品介绍", href: "https://openai.com/index/introducing-dots/" },
    ],
    project: { label: "QuickNote 的便签授权", href: "/projects/quicknote" },
  },
  {
    title: "多 Agent 分工从可检查的交付物开始",
    paragraphs: [
      "只有能独立推进、能检查结果的工作，才值得拆给不同 Agent。比如竞品研究可以先收集资料，再交给文案和设计专家分别生成标题与主图。交接时带上适用渠道、来源、已知限制和阶段产物，负责整合的 Agent 才能识别冲突和遗漏。",
      "Tango 将多个专家的阶段进度、研究报告和设计图放在同一条任务里。用户可以打开原始报告核对判断，也能直接下载最终设计产物。",
    ],
    sources: [
      { label: "Anthropic 多 Agent 研究系统", href: "https://www.anthropic.com/research/multi-agent-research-system" },
      { label: "OpenAI 多 Agent 文档", href: "https://developers.openai.com/api/docs/guides/agents-api/multi-agent" },
    ],
    project: { label: "Tango 的专家协作流程", href: "/projects/tango" },
  },
  {
    title: "跨系统交接用 A2A，接入工具和数据用 MCP",
    paragraphs: [
      "A2A（Agent-to-Agent）允许独立 Agent 查询对方提供的能力，交付任务并接收状态与产物。例如研究 Agent 把有来源的调研文档交给另一个系统里的写作 Agent，后者可以追问缺项并返回草稿。产品侧还要定义每次交接允许传递哪些字段，以及超时或权限不足时由谁接管。",
      "MCP 解决 Agent 如何使用工具、读取资源或连接数据源。一个接受 A2A 任务的 Agent 可以在授权范围内通过 MCP 查资料，再把完成的产物交回。两种协议可以出现在同一条链路的不同环节。",
    ],
    sources: [
      { label: "A2A 官方规范", href: "https://a2a-protocol.org/latest/specification/" },
      { label: "MCP 架构说明", href: "https://modelcontextprotocol.io/docs/learn/architecture" },
    ],
  },
  {
    title: "用 Harness 和任务级评测看交付是否可靠",
    paragraphs: [
      "把上下文、工具、运行权限、重试和检查点交给 Harness。对长任务尤其要保留进度和执行证据，允许用户暂停、修改任务或从上一个有效检查点恢复。",
      "评测用真实任务和失败案例。例行记录产物通过率、人工介入率、完成时间与单次交付成本。升级模型或修改工具后复跑同一套样本，检查它是否真的减少了返工。",
    ],
    sources: [
      { label: "OpenAI Agents API 与托管 Harness", href: "https://openai.com/index/introducing-the-agents-api/" },
      { label: "任务轨迹与评测实践", href: "https://developers.openai.com/cookbook/examples/agents_sdk/agent_improvement_loop" },
    ],
  },
];

export default function AgentProductResearchPage() {
  return (
    <main className="relative z-10 min-h-screen bg-bg-deepest">
      <article className="mx-auto max-w-3xl px-6 pb-24 pt-12 md:px-10 md:pt-20">
        <Link href="/#method" className="text-sm text-neon-cyan underline-offset-4 hover:underline">
          ← 返回研究归档
        </Link>
        <header className="mt-10 border-b border-white/15 pb-8 md:mt-14">
          <h1 className="section-display-heading font-display text-balance text-[clamp(2rem,5.2vw,3.4rem)] leading-[1.2] text-[#f5f7ff]">
            {title}
          </h1>
          <p className="mt-5 max-w-prose text-base leading-8 text-text-secondary">{description}</p>
          <time dateTime="2026-11-21" className="mt-5 block font-body text-sm text-text-tertiary">2026 年 11 月 21 日</time>
        </header>
        {notes.map(({ title, paragraphs, sources, project }) => (
          <section key={title} className="border-b border-white/10 py-9 md:py-11">
            <h2 className="card-display-title font-display text-balance text-[clamp(1.35rem,3vw,1.8rem)] leading-snug text-[#f5f7ff]">{title}</h2>
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 max-w-prose text-base leading-8 text-text-secondary">{paragraph}</p>
            ))}
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {project && (
                <li><Link href={project.href} className="text-neon-cyan underline underline-offset-4">{project.label}</Link></li>
              )}
              {sources.map(({ label, href }) => (
                <li key={href}><a href={href} className="text-text-secondary underline underline-offset-4 hover:text-white">{label}</a></li>
              ))}
            </ul>
          </section>
        ))}
      </article>
    </main>
  );
}
