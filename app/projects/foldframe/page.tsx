import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../showcase.module.css";

const title = "Foldframe · AI内容创作与发布工作台";
const description =
  "把多模态内容创作、无限画布节点二创与多平台仿真排版发布串成一条本地工作流。创作端直连本机多模型 CLI，发布端严格分流图文与视频，并在仿真手机里实时调比例、裁剪与写文案。";
const cover = {
  url: "/projects/foldframe/layout-workshop.webp",
  alt: "Foldframe 排版工坊：左侧图文发布编辑区与右侧小红书仿真手机预览及竖排比例工具栏",
  width: 1024,
  height: 640,
};

export const metadata: Metadata = {
  title: `${title} | HXY Projects`,
  description,
  alternates: { canonical: "/projects/foldframe" },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/projects/foldframe",
    siteName: "HXY / EVAN",
    locale: "zh_CN",
    images: [cover],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [cover.url],
  },
};

const scenes = [
  {
    id: "workspace",
    label: "快捷工作台",
    title: "把文案草稿与多模态生图拆开跑",
    description:
      "收拢式提示词栏支持直接拖拽参考图。生成图文或视频草稿时直连本机大语言模型产出结构化文案，图片与视频走独立生成管线；点开任意作品即可在右侧核对提示词、所用模型、分辨率、耗时与真实积分消耗。",
    image: "/projects/foldframe/workspace.webp",
    alt: "Foldframe 快捷工作台：左侧导航栏、精简提示词栏与图文草稿混合资源网格",
    width: 1024,
    height: 640,
  },
  {
    id: "canvas",
    label: "无限画布",
    title: "选中任意图片，在下方就近调参与连线衍生",
    description:
      "进入画布自动收起侧栏并水平居中排布素材，支持平滑阻尼缩放与一键居中整理。点击图片或视频节点后，下方就近弹出可编辑的提示词与模型、比例、画质面板，并能通过节点连线把多份素材串成二次创作参考流。",
    image: "/projects/foldframe/canvas.webp",
    alt: "Foldframe 无限画布：居中排布的素材网格、底部工具栏与选中图片下方弹出的参数面板",
    width: 1024,
    height: 640,
  },
  {
    id: "remix",
    label: "多维改图",
    title: "围绕原图按六个维度改镜头、光影与画风",
    description:
      "中心保持原图真实比例完整呈现，左右六个卡片分别控制镜头角度、光影氛围、背景场景、画风质感、穿搭造型与表情动作。每项内置景别、视角、风格下拉选项，并允许展开提示词微调后再生成；参考图支持二次确认删除与选 2 张合成过渡视频。",
    image: "/projects/foldframe/remix.webp",
    alt: "Foldframe 多维改图：中心完整原图与左右六个可编辑预设和提示词卡片",
    width: 1024,
    height: 640,
  },
  {
    id: "assets",
    label: "AI 素材库",
    title: "按类型与画面比例快速找回所有生成产物",
    description:
      "集中沉淀所有 AI 生成的图片与视频。顶部提供「全部 / 图片 / 视频」分类计数和比例筛选框（竖版、横版、方图及 9:16、3:4、1:1、16:9 等），前端自动检测真实像素尺寸并在卡片标注类型与比例角标。",
    image: "/projects/foldframe/assets.webp",
    alt: "Foldframe AI 生成素材页：顶部类型切换、比例筛选下拉框与带 9:16 角标的瀑布流卡片",
    width: 1024,
    height: 640,
  },
];

export default function FoldframeProjectPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.wrap}>
          <Link href="/" className={styles.wordmark}>HXY / EVAN</Link>
          <Link href="/#project-foldframe" className={styles.back}>← 返回项目</Link>
        </div>
      </header>

      <section className={`${styles.wrap} ${styles.hero}`} aria-labelledby="foldframe-title">
        <p className={styles.kicker}>AI 内容创作与发布工作台</p>
        <h1 id="foldframe-title">Foldframe</h1>
        <p className={styles.lead}>把多模态内容创作、无限画布节点二创与多平台仿真排版发布串成一条本地工作流。</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "20px" }}>
          <a
            href="https://foldframe-studio.vercel.app"
            target="_blank"
            rel="noreferrer"
            className={styles.demoLink}
            style={{ marginTop: 0 }}
          >
            打开独立展示页 ↗
          </a>
          <a
            href="https://github.com/hxy940219220-collab/foldframe"
            target="_blank"
            rel="noreferrer"
            className={styles.demoLink}
            style={{
              marginTop: 0,
              background: "transparent",
              color: "var(--text)",
              borderColor: "var(--line)",
            }}
          >
            GitHub 源码 ↗
          </a>
          <a
            href="#demo"
            className={styles.demoLink}
            style={{
              marginTop: 0,
              background: "transparent",
              color: "var(--body)",
              borderColor: "var(--line)",
            }}
          >
            查看界面实拍 ↓
          </a>
        </div>

        <figure>
          <a href={cover.url} target="_blank" rel="noreferrer" aria-label="查看 Foldframe 排版工坊原图">
            <Image
              src={cover.url}
              alt={cover.alt}
              width={cover.width}
              height={cover.height}
              preload
              sizes="(min-width: 1190px) 1150px, calc(100vw - 40px)"
              className={styles.heroImage}
            />
          </a>
          <figcaption className={styles.caption}>
            「AI 发布 → 排版工坊」将图文发布与视频发布在入口处彻底分开。左侧仅保留唯一的「+」号支持本地上传或从资产库选择；右侧仿真手机同步呈现小红书、抖音、Instagram 的笔记与封面效果，手机右侧竖排比例栏整合了 3:4 / 1:1 / 4:3 / 原图切换、拖拽取景、单击自由裁剪与按比例重构。
          </figcaption>
        </figure>
      </section>

      <section id="demo" className={`${styles.wrap} ${styles.demo}`} aria-labelledby="foldframe-gallery">
        <div className={styles.demoHeading}>
          <h2 id="foldframe-gallery">核心界面实拍</h2>
          <nav aria-label="跳到演示界面" className={styles.jump}>
            {scenes.map(scene => (
              <a key={scene.id} href={`#${scene.id}`}>{scene.label}</a>
            ))}
          </nav>
        </div>

        {scenes.map(scene => (
          <article id={scene.id} key={scene.id} className={styles.step}>
            <h3>{scene.title}</h3>
            <p>{scene.description}</p>
            <a
              className={styles.frame}
              href={scene.image}
              target="_blank"
              rel="noreferrer"
              aria-label={`查看原图：${scene.title}`}
            >
              <Image
                src={scene.image}
                alt={scene.alt}
                width={scene.width}
                height={scene.height}
                sizes="(min-width: 1190px) 1150px, calc(100vw - 40px)"
                loading="lazy"
              />
            </a>
          </article>
        ))}
      </section>

      <footer className={`${styles.wrap} ${styles.footer}`}>
        <p>Next.js 14 · NestJS · MongoDB · 本机多模型 CLI 桥接（即梦 5.0 / Seedance / GPT Image 2 / 本机 LLM）</p>
        <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
          <a href="https://foldframe-studio.vercel.app" target="_blank" rel="noreferrer">独立展示页 ↗</a>
          <a href="https://github.com/hxy940219220-collab/foldframe" target="_blank" rel="noreferrer">GitHub ↗</a>
          <Link href="/#work">查看其他项目 ↗</Link>
        </div>
      </footer>
    </main>
  );
}
