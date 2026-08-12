import type { Metadata } from "next";
import { ProjectDemo, type ProjectDemoData } from "../ProjectDemo";

export const metadata: Metadata = {
  title: "QuickNote · 快速便签 | HXY Projects",
  description: "QuickNote 是一款本地优先的 macOS 便签工具，用全局快捷键、原生富文本、划词 AI 与截图识图让记录贴着当前任务发生。",
  alternates: { canonical: "/projects/quicknote" },
  openGraph: {
    title: "QuickNote · 快速便签",
    description: "随手记下，不离开当前任务。",
    type: "website",
    url: "/projects/quicknote",
    siteName: "HXY / EVAN",
    locale: "zh_CN",
    images: [
      {
        url: "/quicknote-project-card.webp",
        width: 1672,
        height: 941,
        alt: "QuickNote macOS 快速便签产品演示",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickNote · 快速便签",
    description: "随手记下，不离开当前任务。",
    images: ["/quicknote-project-card.webp"],
  },
};

const project: ProjectDemoData = {
  index: "01",
  eyebrow: "QuickNote / Local-first macOS Notes",
  title: "QuickNote",
  subtitle: "随手记下，不离开当前任务。",
  description:
    "双击 Command 即刻唤起，用原生富文本、文件夹与主题整理内容；按 Option + Space 分析选中文字，或按 Command + Shift 截图识图，并将结果直接导入便签。",
  heroImage: "/quicknote-project-card.webp",
  heroAlt: "QuickNote 快速便签界面与划词 AI 操作展示",
  accent: "#8B7CFF",
  accentSoft: "rgba(139, 124, 255, 0.14)",
  github: "https://github.com/hxy940219220-collab/QuickNote",
  stats: [
    { value: "2× ⌘", label: "Global trigger" },
    { value: "⌥ Space", label: "Selection AI" },
    { value: "⌘ ⇧ · 6 APIs", label: "Screenshot AI · Routing" },
  ],
  thesis: "不做重型知识库，而让记录贴着当前任务发生。",
  principles: [
    {
      label: "01 / Capture",
      title: "记录入口比功能数量更重要",
      description: "双击 Command 直接打开当前便签，减少寻找窗口和切换应用带来的注意力损耗。",
    },
    {
      label: "02 / Local",
      title: "内容默认留在这台 Mac",
      description: "笔记以 RTFD 保存在本机，基础记录不依赖网络，API Key 则进入 macOS 系统钥匙串。",
    },
    {
      label: "03 / Assist",
      title: "AI 只在主动调用时出现",
      description: "只有主动分析选中文字或截图时才调用模型；文字与图片任务自动路由到用户设置的不同模型。",
    },
  ],
  steps: [
    {
      number: "01",
      title: "四项常用编辑操作",
      description: "格式、清单、表格与附件集中在编辑器顶部；格式面板继续提供标题层级、文字样式、颜色、对齐与列表。",
      image: "/projects/quicknote/feature-editing.webp",
      imageAlt: "QuickNote 格式、清单、表格与附件编辑工具",
      width: 1672,
      height: 941,
    },
    {
      number: "02",
      title: "双击 Command 即刻唤起",
      description: "不必先找到应用窗口。连续按两次 Command 打开当前便签，再次双击即可收起并回到原任务。",
      image: "/projects/quicknote/feature-command.webp",
      imageAlt: "QuickNote 双击 Command 全局快捷键",
      width: 1672,
      height: 941,
    },
    {
      number: "03",
      title: "划词与截图调用 AI",
      description: "按 Option + Space 分析选中文字，或按 Command + Shift 截取屏幕区域；结果保留结构，并可与原图一同导入便签。",
      image: "/projects/quicknote/feature-ai.webp",
      imageAlt: "QuickNote 划词 AI 分析与导入便签",
      width: 1672,
      height: 941,
    },
    {
      number: "04",
      title: "六种阅读环境",
      description: "系统默认之外，暖纸、鼠尾草、暮光紫、午夜墨与雾蓝覆盖不同光线和阅读偏好，不改变笔记本身。",
      image: "/projects/quicknote/feature-themes.webp",
      imageAlt: "QuickNote 系统默认与五套主题配色",
      width: 1672,
      height: 941,
    },
  ],
  stack: ["Swift 6", "SwiftUI", "AppKit", "RTFD", "Keychain", "Multimodal model routing"],
  boundary:
    "当前版本面向 macOS 14+。双击 Command 与截图快捷键需要输入监控权限，读取选中文字需要辅助功能权限；只有用户主动调用 AI 时，所选文字或截图才会发送到对应的模型服务。",
};

export default function QuickNoteProjectPage() {
  return <ProjectDemo project={project} />;
}
