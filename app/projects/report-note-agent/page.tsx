import type { Metadata } from "next";
import { ProjectDemo, type ProjectDemoData } from "../ProjectDemo";

export const metadata: Metadata = {
  title: "研报笔记 Agent | HXY Projects",
  description: "将 PDF / DOCX 行业报告整理成可审核、可编辑、可导出的图文笔记工作流。",
  alternates: { canonical: "/projects/report-note-agent" },
  openGraph: {
    title: "研报笔记 Agent",
    description: "从行业报告到可审核图文内容的一体化工作流。",
    type: "website",
    url: "/projects/report-note-agent",
    siteName: "HXY / EVAN",
    locale: "zh_CN",
    images: [
      {
        url: "/report-note-agent-project-card.webp",
        width: 1672,
        height: 941,
        alt: "研报笔记 Agent 产品演示",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "研报笔记 Agent",
    description: "从行业报告到可审核图文内容的一体化工作流。",
    images: ["/report-note-agent-project-card.webp"],
  },
};

const project: ProjectDemoData = {
  index: "02",
  eyebrow: "Report Note / Agent Workflow",
  title: "研报笔记",
  subtitle: "从一份报告，到一套可审核的图文内容。",
  description:
    "把 PDF / DOCX 行业报告拆成文案、封面与报告图片。解析、生成、选择、排序和发布前确认被串成一条清晰工作流，AI 可选提效，人始终保留最终决定权。",
  heroImage: "/report-note-agent-project-card.webp",
  heroAlt: "研报笔记 Agent 从文档到图文内容的工作流展示",
  accent: "#ff6a1a",
  accentSoft: "rgba(255, 106, 26, 0.12)",
  github: "https://github.com/hxy940219220-collab/xhs-report-agent",
  stats: [
    { value: "PDF / DOCX", label: "Source formats" },
    { value: "1–12 页", label: "Report images" },
    { value: "Human-in-loop", label: "Publish control" },
  ],
  thesis: "不止生成摘要，而把内容生产串成可控工作流。",
  principles: [
    {
      label: "01 / Parse",
      title: "先理解文档结构",
      description: "本机提取正文与图片，过滤目录、页码和联系方式等噪声，再进入内容生成。",
    },
    {
      label: "02 / Review",
      title: "每一步都可以人工修改",
      description: "标题、正文、标签、封面和图片顺序都能在发布前审核，不把生成等同于完成。",
    },
    {
      label: "03 / Deliver",
      title: "从分析结果走到可交付内容",
      description: "导出内容包，或在最终确认后同步至官方编辑页，减少重复整理与搬运。",
    },
  ],
  steps: [
    {
      number: "01",
      title: "从 PDF 或 Word 开始",
      description: "拖入报告后在本机解析，最近任务与项目组保留在侧栏，方便继续未完成内容。",
      image: "/projects/report-note-agent/upload.webp",
      imageAlt: "研报笔记 Agent 文档上传首页",
      width: 1920,
      height: 1107,
    },
    {
      number: "02",
      title: "文案与封面一起审核",
      description: "选择标题、编辑正文与标签，同时预览并调整编辑刊物风格封面。",
      image: "/projects/report-note-agent/copy-cover.webp",
      imageAlt: "研报笔记 Agent 文案与封面工作台",
      width: 1920,
      height: 1115,
    },
    {
      number: "03",
      title: "选择真正要发布的报告页",
      description: "PDF 每页生成完整图片，可按顺序选择 1–12 页，也可以对局部内容手动裁切。",
      image: "/projects/report-note-agent/image-selection.webp",
      imageAlt: "研报笔记 Agent 报告图片选择界面",
      width: 1920,
      height: 1090,
    },
    {
      number: "04",
      title: "最终确认，再交付或同步",
      description: "核对封面、标题、正文与图片顺序后导出；需要同步时，仍会在官方编辑页做最后确认。",
      image: "/projects/report-note-agent/review-publish.webp",
      imageAlt: "研报笔记 Agent 最终审核与同步界面",
      width: 1920,
      height: 1105,
    },
  ],
  stack: ["Electron 43", "React 19", "TypeScript", "Vite 7", "PDF.js", "Mammoth", "Playwright"],
  boundary:
    "当前为 Apple Silicon macOS 桌面端 Beta，默认使用本地规则；启用 AI 优化后，报告内容会发送至用户配置的第三方模型服务，API Key 由 Electron safeStorage 在本机加密保存。扫描版 PDF 需要先做 OCR；同步能力依赖第三方平台网页结构，失败时会停止并保留人工确认，不会自动重复发布。",
};

export default function ReportNoteAgentProjectPage() {
  return <ProjectDemo project={project} />;
}
