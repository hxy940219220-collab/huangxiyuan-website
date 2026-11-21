import type { Metadata } from "next";
import { ProjectDemo, type ProjectDemoData } from "../ProjectDemo";

const title = "Tango · 跨境电商 Agent 工作台";
const description = "为跨境电商运营组织一支 AI 专家团队。带上商品资料，在同一个工作台完成竞品分析、商品页策划与内容制作。";
const homeImage = "/projects/tango/home.webp";
const homeAlt = "Tango 工作台首页，显示常用专家和四类跨境运营任务";
const screenshotSize = { width: 1800, height: 1125 };

export const metadata: Metadata = {
  title: `${title} | HXY Projects`,
  description,
  alternates: { canonical: "/projects/tango" },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/projects/tango",
    siteName: "HXY / EVAN",
    locale: "zh_CN",
    images: [{ url: homeImage, alt: homeAlt, ...screenshotSize }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [homeImage],
  },
};

const project: ProjectDemoData = {
  index: "01",
  eyebrow: "跨境电商 Agent 工作台",
  title: "Tango",
  subtitle: "让竞品研究、商品页和内容制作在同一条任务里接力。",
  description:
    "从一个具体任务出发，把商品资料、运营目标和参考文件带进对话。按平台与职责选择专家，跟踪每一步进度，再把阶段结果交给下一位专家。",
  heroImage: homeImage,
  heroAlt: homeAlt,
  heroSize: screenshotSize,
  accent: "#ffb17d",
  accentSoft: "rgba(255, 177, 125, 0.13)",
  github: "https://github.com/hxy940219220-collab/tango-workbench",
  privateRepository: true,
  demoDescription: "截图来自运行中的 Tango。商品和竞品数据为演示样本，主图与 A+ 图用上传的示例商品照在工作台内生成。",
  stats: [
    { value: "商品运营、选品与竞品、短视频、达人合作", label: "任务入口" },
    { value: "最多四位专家顺序执行", label: "同一会话" },
    { value: "本机模型或第三方 API", label: "模型选择" },
  ],
  thesis: "让专家围绕同一份商品资料工作。",
  principles: [
    {
      label: "01 / 专家分工",
      title: "按交付选人",
      description: "根据平台和任务挑选专家，把竞品对照、搜索词或主图设计分配给不同角色。",
    },
    {
      label: "02 / 执行过程",
      title: "每一步都有进度",
      description: "执行状态与逐步生成的内容显示在同一对话里。运营随时可以停止，并从中断的步骤重试。",
    },
    {
      label: "03 / 模型选择",
      title: "按任务切换模型",
      description: "可以使用本机模型，也可以添加自有的兼容 API，并在对话中切换。",
    },
  ],
  steps: [
    {
      number: "01",
      title: "为任务挑选跨境专家",
      description: "在专家库按平台与职责浏览，从竞品研究、搜索词与标题、主图与 A+ 设计等角色中，选出需要接力的团队。",
      image: "/projects/tango/experts.webp",
      imageAlt: "Tango 跨境专家库，显示平台分类与各类专家职责",
      ...screenshotSize,
    },
    {
      number: "02",
      title: "在同一条对话中接力",
      description: "用一张咖啡量勺商品照演示 Amazon 美国站上架。竞品顾问交付研究报告，标题顾问给出可直接复制的英文标题，设计师制作白底主图和 A+ 图。两张 PNG 可分别预览和下载。",
      image: "/projects/tango/workflow-deliverables.webp",
      imageAlt: "Tango 对话显示竞品研究报告卡片、可复制的英文标题，以及可逐张下载的商品主图和 A+ 图片",
      ...screenshotSize,
    },
    {
      number: "03",
      title: "打开完整的竞品研究报告",
      description: "在对话中先看结论摘要。打开报告可查阅样本价格和功能差异、商品页机会，以及上架前要核实的事项。报告也可下载为 Markdown。",
      image: "/projects/tango/competition-report.webp",
      imageAlt: "Tango 的亚马逊竞品研究报告预览，显示结论、虚构样本对照、商品页机会和上架前验证",
      ...screenshotSize,
    },
    {
      number: "04",
      title: "添加并测试模型 API",
      description: "填入服务地址和模型 ID，按服务要求提供密钥。测试连接后保存配置，再在对话中选用。",
      image: "/projects/tango/models.webp",
      imageAlt: "Tango 添加 API 模型窗口，显示示例地址和测试连接按钮",
      ...screenshotSize,
    },
  ],
  stack: ["Electron", "Node.js", "SQLite", "llama.cpp", "OpenAI Chat Completions"],
  boundary:
    "Tango 在本地运行。需要实时平台指标时，由运营提供报表或配置数据连接。选择第三方模型后，当前消息和所引用的资料会发送到所选服务。",
};

export default function TangoProjectPage() {
  return <ProjectDemo project={project} />;
}
