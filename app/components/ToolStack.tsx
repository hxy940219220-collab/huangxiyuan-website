"use client";

import { ScrollReveal } from "./ScrollReveal";

/* ------------------------------------------------------------------ */
/* AI 工具栈 — 桌面端网格 / 移动端横向滚动吸附                              */
/* 替代原 3D 旋转卡片：一次看全 5 款工具，无镜像文字、无隐藏内容               */
/* ------------------------------------------------------------------ */

interface ToolCard {
  num: string;
  id: string;
  title: string;
  desc: string;
  tags: string[];
  href?: string;
  gradient: string;
  accentBorder: string;
  glowColor: string;
}

const TOOLS: ToolCard[] = [
  {
    num: "01",
    id: "tool-claude",
    title: "Claude",
    desc: "主力 AI 编程助手。日常用 Claude Code 做产品原型、代码生成与架构设计，是最高频使用的 AI 工具。",
    tags: ["Claude Code", "Agent", "Prototype"],
    gradient:
      "radial-gradient(circle at 24% 28%, rgba(216,76,255,0.22), transparent 26%), radial-gradient(circle at 72% 72%, rgba(180,50,230,0.16), transparent 24%)",
    accentBorder: "rgba(216,76,255,0.35)",
    glowColor: "rgba(216,76,255,0.45)",
  },
  {
    num: "02",
    id: "tool-gpt",
    title: "GPT",
    desc: "OpenAI 旗舰模型。重点使用 Image2 与 Codex CLI，覆盖视觉创作与自动化编码两大高频场景。",
    tags: ["Image2", "Codex", "DALL·E"],
    gradient:
      "radial-gradient(circle at 28% 24%, rgba(0,200,255,0.24), transparent 24%), radial-gradient(circle at 76% 60%, rgba(0,180,230,0.16), transparent 28%)",
    accentBorder: "rgba(0,200,255,0.35)",
    glowColor: "rgba(0,200,255,0.45)",
  },
  {
    num: "03",
    id: "tool-gemini",
    title: "Gemini",
    desc: "Google 多模态模型。擅长长文本理解、视觉分析与跨模态推理，用于研究对比与产品探索。",
    tags: ["Antigravity", "Stitch", "Notebooklm"],
    gradient:
      "radial-gradient(circle at 26% 34%, rgba(255,216,74,0.22), transparent 28%), radial-gradient(circle at 70% 30%, rgba(220,180,50,0.16), transparent 26%)",
    accentBorder: "rgba(255,216,74,0.35)",
    glowColor: "rgba(255,216,74,0.45)",
  },
  {
    num: "04",
    id: "tool-vscode",
    title: "VS Code",
    desc: "主要代码编辑器。结合 AI 插件进行 Vibe Coding，快速将产品想法转化为可运行的原型与验证产物。",
    tags: ["Editor", "Vibe Coding", "Debug"],
    gradient:
      "radial-gradient(circle at 24% 24%, rgba(0,60,255,0.22), transparent 28%), radial-gradient(circle at 66% 36%, rgba(30,80,255,0.16), transparent 26%)",
    accentBorder: "rgba(0,100,255,0.35)",
    glowColor: "rgba(0,100,255,0.45)",
  },
  {
    num: "05",
    id: "tool-typeless",
    title: "Typeless",
    desc: "语音转结构化文字工具。将会议录音、口述想法快速转为可编辑、可检索的结构化文档。",
    tags: ["Voice-to-Text", "Structured", "Notes"],
    gradient:
      "radial-gradient(circle at 28% 30%, rgba(255,106,26,0.22), transparent 28%), radial-gradient(circle at 68% 64%, rgba(230,90,20,0.16), transparent 26%)",
    accentBorder: "rgba(255,106,26,0.35)",
    glowColor: "rgba(255,106,26,0.45)",
  },
  {
    num: "06",
    id: "tool-hermes",
    title: "Hermes Agent",
    desc: "可自托管的个人 Agent runtime。重点研究 agent loop、skills、记忆、状态恢复与多渠道 gateway 如何组成可长期运行的系统。",
    tags: ["Agent Runtime", "Skills", "Memory"],
    href: "https://github.com/NousResearch/hermes-agent",
    gradient:
      "radial-gradient(circle at 24% 28%, rgba(40,220,178,0.20), transparent 28%), radial-gradient(circle at 74% 68%, rgba(0,200,255,0.14), transparent 26%)",
    accentBorder: "rgba(40,220,178,0.38)",
    glowColor: "rgba(40,220,178,0.45)",
  },
];

/* 桌面端 6 列网格：两排各 3 张，保证比较阅读的一致性 */
const SPANS = [
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
];

export function ToolStack() {
  return (
    <div className="no-scrollbar flex lg:grid lg:grid-cols-6 gap-4 md:gap-5 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none -mx-6 px-6 md:-mx-12 md:px-12 lg:mx-0 lg:px-0 pb-4 lg:pb-0">
      {TOOLS.map((tool, i) => (
        <ScrollReveal
          key={tool.num}
          delay={0.06 * (i + 1)}
          className={`min-w-[80vw] sm:min-w-[21rem] lg:min-w-0 snap-center ${SPANS[i]}`}
        >
          <div
            id={tool.id}
            className="group scroll-mt-24 relative h-full min-h-[15rem] lg:min-h-[16rem] rounded-[24px] border border-white/[0.12] bg-[rgba(13,13,28,0.65)] backdrop-blur-[18px] overflow-hidden text-left transition-all duration-500 hover:-translate-y-1"
            style={{
              boxShadow: "0 12px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.03)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = tool.accentBorder;
              el.style.boxShadow = `0 12px 56px rgba(0,0,0,0.5), 0 0 40px ${tool.glowColor.replace("0.45", "0.15")}, inset 0 1px 0 rgba(255,255,255,0.06)`;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "rgba(255,255,255,0.12)";
              el.style.boxShadow = "0 12px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.03)";
            }}
          >
            {/* 渐变覆盖 */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[24px]"
              style={{ backgroundImage: tool.gradient }}
            />
            {/* 内容 */}
            <div className="relative z-10 flex h-full flex-col p-5 md:p-6">
              <div className="flex items-center justify-between">
                <span className="font-body text-[11px] uppercase tracking-[0.18em] text-white/25">
                  {tool.num}
                </span>
                <span
                  className="h-1.5 w-1.5 rounded-full opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ backgroundColor: tool.accentBorder, boxShadow: `0 0 10px ${tool.glowColor}` }}
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-4 md:mt-5 font-display italic text-[26px] leading-[1.05] text-white">
                {tool.title}
              </h3>
              <p className="mt-3 text-[12px] leading-[1.85] text-white/55 [overflow-wrap:anywhere]">
                {tool.desc}
              </p>
              <div className="mt-auto pt-5 flex flex-wrap gap-1.5">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.12] bg-white/[0.03] px-2 py-[0.22rem] font-body text-[9px] tracking-[0.08em] text-white/45"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {tool.href && (
                <a
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-target mt-4 inline-flex w-fit items-center gap-1.5 font-body text-[10px] font-medium tracking-[0.08em] text-[#28dcb2] no-underline transition-colors hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#28dcb2]"
                >
                  查看开源项目 <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
