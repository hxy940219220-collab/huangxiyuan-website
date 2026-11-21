import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./tango.module.css";

const title = "Tango · 跨境电商 Agent 工作台";
const description = "为跨境电商运营组织一支 AI 专家团队。带上商品资料，在同一个工作台完成竞品分析、商品页策划与内容制作。";
const homeImage = "/projects/tango/home.webp";
const homeAlt = "Tango 工作台首页，显示常用专家和四类跨境运营任务";
const screenshotSize = { width: 1800, height: 1125 };
const repository = "https://github.com/hxy940219220-collab/tango-workbench";

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

const steps = [
  {
    id: "experts",
    nav: "专家目录",
    title: "按任务挑选专家",
    description: "按平台和职责找到合适的人。竞品研究、搜索词与标题、主图和 A+ 设计各有专长，最多四位专家可接力完成同一个任务。",
    image: "/projects/tango/experts.webp",
    alt: "Tango 亚马逊跨境专家目录，显示平台分类与各类专家职责",
  },
  {
    id: "workflow",
    nav: "协作交付",
    title: "在同一条对话中交付",
    description: "以咖啡量勺在 Amazon 美国站上架为例。竞品顾问交付研究报告，标题顾问给出可复制的英文标题，设计师用示例商品照制作主图和 A+ 图。两张 PNG 可分别下载。",
    image: "/projects/tango/workflow-deliverables.webp",
    alt: "Tango 对话显示竞品报告、英文标题和可分别下载的主图与 A+ 图片",
  },
  {
    id: "report",
    nav: "竞品报告",
    title: "打开完整的竞品研究报告",
    description: "先读结论，再通过对照表查看不同样本的价格、功能和差异，接着检查商品页机会与验证计划。报告可下载为 Markdown。截图中的商品和竞品数据为演示样本。",
    image: "/projects/tango/competition-report-layout.webp",
    alt: "暖色页眉和分节排版的报告预览，显示竞品价格对照表、商品页机会和验证计划",
  },
  {
    id: "models",
    nav: "模型接入",
    title: "在本机与第三方模型之间切换",
    description: "本机可运行内置 Qwen2.5，也可连接 Ollama。OpenAI 预设包括 GPT‑6.2、GPT‑6.1 和 Codex，DeepSeek 预设包括 V4.1 Flash 和 V4 Pro。使用自己的 API 密钥测试后，即可在对话里切换。",
    image: "/projects/tango/models-catalog.webp",
    height: 820,
    alt: "Tango 模型设置，列出本机 Qwen、Ollama 以及 OpenAI 和 DeepSeek 的 API 接入预设",
  },
];

export default function TangoProjectPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.wrap}>
          <Link href="/" className={styles.wordmark}>HXY / EVAN</Link>
          <Link href="/#work" className={styles.back}>← 返回项目</Link>
        </div>
      </header>

      <section className={`${styles.wrap} ${styles.hero}`} aria-labelledby="tango-title">
        <p className={styles.kicker}>跨境电商 Agent 工作台</p>
        <h1 id="tango-title">Tango</h1>
        <p className={styles.lead}>让竞品研究、商品页和内容制作在同一条任务里接力。</p>
        <div className={styles.actions}>
          <a href="#demo" className={styles.primary}>查看功能截图 ↓</a>
          <a href={repository} target="_blank" rel="noreferrer" className={styles.secondary}>
            GitHub 私有仓库 ↗
          </a>
        </div>
        <Image
          src={homeImage}
          alt={homeAlt}
          {...screenshotSize}
          preload
          sizes="(min-width: 1260px) 1150px, calc(100vw - 40px)"
          className={styles.heroImage}
        />
      </section>

      <section id="demo" className={`${styles.wrap} ${styles.demo}`} aria-labelledby="tango-demo-title">
        <div className={styles.demoHeading}>
          <h2 id="tango-demo-title">工作台实拍</h2>
          <nav aria-label="跳到功能" className={styles.jump}>
            {steps.map(step => <a key={step.id} href={`#${step.id}`}>{step.nav}</a>)}
          </nav>
        </div>
        {steps.map(step => (
          <article id={step.id} key={step.id} className={styles.step}>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            <a className={styles.frame} href={step.image} target="_blank" rel="noreferrer" aria-label={`查看原图：${step.title}`}>
              <Image
                src={step.image}
                alt={step.alt}
                width={screenshotSize.width}
                height={step.height ?? screenshotSize.height}
                sizes="(min-width: 1260px) 1150px, calc(100vw - 40px)"
                loading="lazy"
              />
            </a>
          </article>
        ))}
      </section>

      <footer className={`${styles.wrap} ${styles.footer}`}>
        <p>Electron · Node.js · SQLite · llama.cpp</p>
        <Link href="/#work">查看其他项目 ↗</Link>
      </footer>
    </main>
  );
}
