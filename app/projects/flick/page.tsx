import type { Metadata } from "next";
import { ProjectDemo, type ProjectDemoData } from "../ProjectDemo";

export const metadata: Metadata = {
  title: "Flick · 划词 AI | HXY Projects",
  description: "Flick 是一款 macOS 原生划词 AI 工具，在当前上下文中完成解释、总结、翻译、润色与续写。",
  alternates: { canonical: "/projects/flick" },
  openGraph: {
    title: "Flick · 划词 AI",
    description: "划词即拆解，学习不离开上下文。",
    type: "website",
    url: "/projects/flick",
    siteName: "HXY / EVAN",
    locale: "zh_CN",
    images: [
      {
        url: "/flick-project-card.webp",
        width: 1672,
        height: 941,
        alt: "Flick 划词 AI 产品演示",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flick · 划词 AI",
    description: "划词即拆解，学习不离开上下文。",
    images: ["/flick-project-card.webp"],
  },
};

const project: ProjectDemoData = {
  index: "01",
  eyebrow: "Flick / macOS AI Tool",
  title: "Flick",
  subtitle: "划词即拆解，学习不离开上下文。",
  description:
    "在支持文本复制的 macOS 应用中选中文字，按 ⌘E 唤起极简行动菜单。解释、总结、翻译、润色与续写都在光标附近完成，结果原地流式返回。",
  heroImage: "/flick-project-card.webp",
  heroAlt: "Flick 划词 AI 产品主流程展示",
  accent: "#00c8ff",
  accentSoft: "rgba(0, 200, 255, 0.12)",
  github: "https://github.com/think2do/Flick",
  stats: [
    { value: "⌘E", label: "Global trigger" },
    { value: "1–9", label: "Keyboard actions" },
    { value: "macOS 15+", label: "Native platform" },
  ],
  thesis: "不做另一个聊天窗口，而把 AI 变成文本动作。",
  principles: [
    {
      label: "01 / Context",
      title: "不离开正在阅读的地方",
      description: "结果贴近光标出现，减少复制、切换、粘贴与重新建立语境的成本。",
    },
    {
      label: "02 / Speed",
      title: "键盘完成完整链路",
      description: "快捷键唤起，数字键选动作，流式响应即时出现，学习节奏不中断。",
    },
    {
      label: "03 / Control",
      title: "把模型与提示词交还用户",
      description: "兼容 OpenAI 标准接口，提示词可新增、编辑、删除与拖动排序。",
    },
  ],
  steps: [
    {
      number: "01",
      title: "划词后即时唤起",
      description: "选中文字后按 ⌘E，行动菜单出现在光标附近；无需先打开一个新的 AI 对话。",
      image: "/projects/flick/quick-actions.webp",
      imageAlt: "Flick 解释、总结、翻译、润色与续写行动菜单",
      width: 1014,
      height: 582,
    },
    {
      number: "02",
      title: "结果原地流式返回",
      description: "回答逐字出现并支持 Markdown；需要继续处理时，可以留在当前上下文中完成下一步。",
      image: "/projects/flick/streaming-result.webp",
      imageAlt: "Flick 流式解释结果界面",
      width: 1270,
      height: 884,
    },
    {
      number: "03",
      title: "模型由用户选择",
      description: "API Key 存入 macOS 钥匙串，并可连接兼容 OpenAI 标准接口的模型服务。",
      image: "/projects/flick/provider-settings.webp",
      imageAlt: "Flick 模型与 API 设置界面",
      width: 1264,
      height: 1248,
    },
    {
      number: "04",
      title: "动作可以被重新定义",
      description: "内置提示词只是起点。用户可以编辑内容、调整顺序，并建立自己的文本处理工具箱。",
      image: "/projects/flick/prompt-library.webp",
      imageAlt: "Flick 自定义提示词管理界面",
      width: 1264,
      height: 1248,
    },
  ],
  stack: ["Swift 5.9", "SwiftUI", "AppKit", "Keychain", "OpenAI-compatible API"],
  boundary:
    "当前版本面向 macOS 15+，依赖辅助功能权限读取选中文本；模型调用发生在用户主动选择动作之后，文本会发送至用户自行配置的 AI 服务。",
};

export default function FlickProjectPage() {
  return <ProjectDemo project={project} />;
}
