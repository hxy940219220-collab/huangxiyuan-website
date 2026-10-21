import type { Metadata } from "next";
import { ProjectDemo, type ProjectDemoData } from "../ProjectDemo";

export const metadata: Metadata = {
  title: "尤里卡 · IP 内容创作 | HXY Projects",
  description:
    "尤里卡是一款面向真人出镜创作者的本地 AI 内容工作台，从联网选题到视频脚本、逐字口播稿、发布包与复盘。",
  alternates: { canonical: "/projects/eureka" },
  openGraph: {
    title: "尤里卡 · IP 内容创作",
    description: "把“今天讲什么”变成可持续的内容创作流程。",
    type: "website",
    url: "/projects/eureka",
    siteName: "HXY / EVAN",
    locale: "zh_CN",
    images: [
      {
        url: "/eureka-project-card.webp",
        width: 1672,
        height: 941,
        alt: "尤里卡 AI 内容创作工作台",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "尤里卡 · IP 内容创作",
    description: "把“今天讲什么”变成可持续的内容创作流程。",
    images: ["/eureka-project-card.webp"],
  },
};

const project: ProjectDemoData = {
  index: "01",
  eyebrow: "Eureka / AI Creator Workflow",
  title: "尤里卡",
  subtitle: "把“今天讲什么”变成可持续的内容创作流程。",
  description:
    "面向真人出镜的个人 IP 创作者，从联网热点与个人灵感出发，完成来源核验、选题筛选、视频脚本、逐字口播稿、敏感词审查、发布包与复盘。",
  heroImage: "/eureka-project-card.webp",
  heroAlt: "尤里卡创作台的视频脚本与逐字口播稿双栏界面",
  accent: "#F5B400",
  accentSoft: "rgba(245, 180, 0, 0.12)",
  github: "https://github.com/hxy940219220-collab/huangxiyuan-website",
  stats: [
    { value: "2 种", label: "Shoot formats" },
    { value: "30 min", label: "Max duration" },
    { value: "3 端", label: "Publish platforms" },
  ],
  thesis: "不做空白聊天框，而把“今天讲什么”变成可持续的创作流程。",
  principles: [
    {
      label: "01 / Source",
      title: "每个事实都能返回原文",
      description: "联网收集近期热点，同时保留来源链接、时间与热度依据，避免让生成内容替代事实。",
    },
    {
      label: "02 / Execution",
      title: "不是给建议，而是给可拍内容",
      description: "选定方向后，分别生成可编辑的视频脚本与逐字稿，并按真人口播或双角色形式组织。",
    },
    {
      label: "03 / Habit",
      title: "降低每天开始创作的门槛",
      description: "把选题、写稿、审查、发布与复盘串成一条路径，让有限时间优先用于真人表达。",
    },
  ],
  steps: [
    {
      number: "01",
      title: "从选题到可拍内容",
      description:
        "联网搜索候选并核验来源；选定一个方向后，在同一创作台中生成结构化视频脚本和完整逐字口播稿。",
      image: "/eureka-project-card.webp",
      imageAlt: "尤里卡创作台的视频脚本与逐字口播稿双栏界面",
      width: 1672,
      height: 941,
    },
  ],
  stack: ["Electron", "React", "TypeScript", "SQLite", "OpenAI-compatible API", "UniFuncs Search"],
  boundary:
    "当前版本为本地 macOS 桌面应用 MVP；联网搜索与模型生成需要用户自行配置 API。GitHub 仓库目前为私有仓库，只有获得授权的账号可以访问。",
};

export default function EurekaProjectPage() {
  return <ProjectDemo project={project} />;
}
