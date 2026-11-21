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
  demoDescription: "截图来自运行中的 Tango。对话使用虚构商品和演示响应，模型设置使用示例地址。",
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
      description: "以咖啡量勺在 Amazon 美国站上架为例。竞品顾问先梳理差异，标题顾问接着拟好英文标题，设计师再给出主图和 A+ 建议。三份结果按交付顺序保留在同一条对话中。",
      image: "/projects/tango/workflow-complete.webp",
      imageAlt: "Tango 展示咖啡量勺的竞品对照、英文标题和主图建议，三位专家均已完成交付",
      ...screenshotSize,
    },
    {
      number: "03",
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
