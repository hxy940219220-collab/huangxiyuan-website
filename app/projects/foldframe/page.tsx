import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../showcase.module.css";
import { LightboxProvider, LightboxTrigger, type LightboxItem } from "../LightboxGallery";
import { ProjectPager } from "../ProjectPager";

const title = "Foldframe · AI 内容创作与多端发布工作台";
const description =
  "覆盖商业产品图、写实人像、品牌海报、短视频制作、仿真手机排版、13 个主流平台发布待办与本机多模型接入的一体化 AI 工作台。";
const cover = {
  url: "/projects/foldframe/layout-workshop.webp",
  alt: "Foldframe 排版工坊：3:4 极简琥珀护肤精华商业主图完整呈现在小红书仿真手机预览中，右侧配备竖排比例与裁剪工具栏",
  width: 2880,
  height: 1800,
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
    label: "1. 创作工作台",
    title: "1. 内容创作工作台：商业生图、生视频、写文案一站完成",
    description:
      "在一个界面里就能完成商业产品图、写实人物照、品牌广告、宣传短视频和图文文案生成。支持直接拖入参考图，点开任意一张成品还能在右侧查看提示词、所用模型、尺寸与积分消耗，方便团队复用和复盘。",
    image: "/projects/foldframe/workspace.webp",
    alt: "Foldframe 内容创作工作台：展示旗舰耳机商业宣传短片、写实男女人物肖像、运动鞋与腕表产品图、新能源车与咖啡品牌广告以及图文草稿",
    width: 2880,
    height: 1800,
  },
  {
    id: "canvas",
    label: "2. 无限画布",
    title: "2. 无限画布：铺开所有素材，点中图片就能直接改图出新",
    description:
      "进入画布后，图片和视频会自动居中排开，不用在文件夹里来回翻找。点中任意一张图，下方就会直接弹出提示词和模型、比例、清晰度设置，改两句话就能继续生成新版本；也能把多张素材连上线作为参考，边做边让 AI 助手帮忙出创意。",
    image: "/projects/foldframe/canvas.webp",
    alt: "Foldframe 无限画布：居中排布的商业人像、产品图与广告大片，选中图片后下方弹出提示词与参数编辑面板",
    width: 2880,
    height: 1800,
  },
  {
    id: "remix",
    label: "3. 多维改图",
    title: "3. 多维改图：不用写复杂提示词，按 6 个方向精准微调画面",
    description:
      "选好一张人物照或产品主图后，直接按「换镜头角度、换光影氛围、换背景场景、换画风质感、换穿搭造型、换表情动作」六个方向微调。每项都内置了常用下拉选项，也可以点开修改提示词再生成；支持一键批量出 4 张，或挑 2 张图直接合成过渡短视频。",
    image: "/projects/foldframe/remix.webp",
    alt: "Foldframe 多维改图：中心完整展示写实人物肖像，左右排布镜头、光影、背景、画风、穿搭与表情六个可编辑微调卡片",
    width: 2880,
    height: 1800,
  },
  {
    id: "assets",
    label: "4. AI 素材库",
    title: "4. AI 生成素材库：按类型与画面比例快速管理全部图片和视频",
    description:
      "所有生成的商业产品图、写实人物、品牌海报和宣传短视频都会自动沉淀在这里。顶部支持按「全部 / 图片 / 视频」分类，以及按「竖版 / 横版 / 方图 / 9:16 / 3:4 / 1:1 / 16:9」一键筛选，每张卡片都会自动标出类型和真实比例，找素材一目了然。",
    image: "/projects/foldframe/assets.webp",
    alt: "Foldframe AI 生成素材库：顶部类型分类与比例筛选框，下方瀑布流展示耳机视频、写实人像及 3:4 / 1:1 / 16:9 多比例商业视觉作品",
    width: 2880,
    height: 1800,
  },
  {
    id: "layout",
    label: "5. 排版工坊",
    title: "5. 排版工坊：所见即所得的手机端预览与图文 / 视频分流",
    description:
      "入口处将「图文发布」与「视频发布」彻底分开。左侧只需点击「+」号即可从本地上传或从素材库选图，标题、正文与话题标签支持 AI 一键辅助生成；右侧仿真手机实时同步小红书、抖音、Instagram 的发布效果，手机旁还能一键切换 3:4 / 1:1 / 4:3 / 原图、拖动微调构图、手动裁剪或一键重构比例。",
    image: "/projects/foldframe/layout-workshop.webp",
    alt: "Foldframe 排版工坊：极简琥珀护肤精华 3:4 主图完整呈现在小红书仿真手机预览中，右侧配备竖排比例与裁剪工具栏",
    width: 2880,
    height: 1800,
  },
  {
    id: "publish",
    label: "6. 发布待办",
    title: "6. 发布待办：多平台账号统一管理、排期与一键分发",
    description:
      "做好的图文和视频可以直接流转到「发布待办」进行日历排期与跨平台分发。支持统一接入小红书、微信视频号、微信公众号、快手、B站、YouTube、TikTok、Instagram、Facebook、X (Twitter)、Threads、LinkedIn、Pinterest 等 13 个国内外主流社媒平台，真正打通从设计制作到多端发布的最后一公里。",
    image: "/projects/foldframe/publish-queue.webp",
    alt: "Foldframe 发布待办：展示小红书、微信视频号、Instagram、快手、YouTube、B站、TikTok、LinkedIn、Facebook、微信公众号等 13 个内容平台的统一连接入口",
    width: 2880,
    height: 1800,
  },
  {
    id: "models",
    label: "7. 模型接入",
    title: "7. 本地模型接入：直连本机 Antigravity、Codex、即梦、Grok 与 WorkBuddy",
    description:
      "不被单一云端厂商锁定。工作台支持直接接入电脑本机已登录的 Antigravity、Codex（含 ChatGPT 账号与 GPT 生图）、即梦 AI（5.0 生图 / Seedance 视频）、Grok（支持一键跳转网页登录）与腾讯 WorkBuddy（国产多模型引擎），也可按需配置 OpenAI、DeepSeek、Gemini 等第三方 API，并为「内容 Agent、文案草稿、图片生成、视频生成」四个场景分别指定默认模型。",
    image: "/projects/foldframe/models-hub.webp",
    alt: "Foldframe 模型接入中心：展示本机 Antigravity、Codex、即梦 AI、Grok 与 WorkBuddy 引擎状态及一键网页登录，以及 Agent、文案、生图、生视频四个场景的模型路由设置",
    width: 2880,
    height: 1800,
  },
];

const lightboxItems: LightboxItem[] = [
  {
    src: cover.url,
    alt: cover.alt,
    title: "Foldframe · 排版工坊主预览",
    caption:
      "「AI 发布 → 排版工坊」将商业产品主图、AI 辅助写作与仿真手机预览放在同一屏：左侧管理多图素材与标题正文，右侧实时预览小红书、抖音、Instagram 效果。",
  },
  ...scenes.map((scene) => ({
    src: scene.image,
    alt: scene.alt,
    title: scene.title,
    caption: scene.description,
  })),
];

const pageAccent = {
  "--accent": "#d896ff",
  "--accent-soft": "rgba(216, 76, 255, 0.14)",
} as CSSProperties;

export default function FoldframeProjectPage() {
  return (
    <LightboxProvider items={lightboxItems}>
      <main className={styles.page} style={pageAccent}>
        <header className={styles.header}>
          <div className={styles.wrap}>
            <Link href="/" className={`cursor-target ${styles.wordmark}`}>HXY / EVAN</Link>
            <Link href="/#project-foldframe" className={`cursor-target ${styles.back}`}>← 返回项目栏</Link>
          </div>
        </header>

        <section className={`${styles.wrap} ${styles.hero}`} aria-labelledby="foldframe-title">
          <p className={styles.kicker}>02 · AI 内容创作与多端发布工作台</p>
          <h1 id="foldframe-title">Foldframe</h1>
          <p className={styles.lead}>
            把商业生图、短视频制作、仿真手机排版、13 个平台发布待办和本机多模型接入整合进同一个工作台。
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "22px" }}>
            <a
              href="https://foldframe-studio.vercel.app"
              target="_blank"
              rel="noreferrer"
              className={`cursor-target ${styles.demoLink}`}
              style={{ marginTop: 0 }}
            >
              打开独立展示页 ↗
            </a>
            <a
              href="https://github.com/hxy940219220-collab/foldframe"
              target="_blank"
              rel="noreferrer"
              className={`cursor-target ${styles.demoLink}`}
              style={{
                marginTop: 0,
                background: "rgba(255,255,255,0.04)",
                color: "var(--text)",
                borderColor: "rgba(255,255,255,0.16)",
              }}
            >
              GitHub 源码 ↗
            </a>
            <a
              href="#demo"
              className={`cursor-target ${styles.demoLink}`}
              style={{
                marginTop: 0,
                background: "transparent",
                color: "var(--body-strong)",
                borderColor: "rgba(255,255,255,0.12)",
              }}
            >
              查看 7 大核心功能 ↓
            </a>
          </div>

          <figure>
            <LightboxTrigger index={0} label="放大查看 Foldframe 排版工坊 2K 原图" className={styles.heroImage}>
              <Image
                src={cover.url}
                alt={cover.alt}
                width={cover.width}
                height={cover.height}
                quality={92}
                unoptimized
                preload
                sizes="(min-width: 1190px) 1150px, calc(100vw - 40px)"
                className="block h-auto w-full"
              />
            </LightboxTrigger>
            <figcaption className={styles.caption}>
              「AI 发布 → 排版工坊」将商业产品主图、AI 辅助写作与仿真手机预览放在同一屏：左侧管理多图素材与标题正文，右侧实时预览小红书、抖音、Instagram 效果，并可在手机旁一键切换比例、裁剪或重构构图。
            </figcaption>
          </figure>
        </section>

        <section id="demo" className={`${styles.wrap} ${styles.demo}`} aria-labelledby="foldframe-gallery">
          <div className={styles.demoHeading}>
            <h2 id="foldframe-gallery">核心功能实拍（1–7）</h2>
            <nav aria-label="跳到核心功能" className={styles.jump}>
              {scenes.map((scene) => (
                <a key={scene.id} href={`#${scene.id}`}>{scene.label}</a>
              ))}
            </nav>
          </div>

          {scenes.map((scene, index) => (
            <article id={scene.id} key={scene.id} className={styles.step}>
              <h3>{scene.title}</h3>
              <p>{scene.description}</p>
              <LightboxTrigger
                index={index + 1}
                label={`放大查看：${scene.title}`}
                className={styles.frame}
              >
                <Image
                  src={scene.image}
                  alt={scene.alt}
                  width={scene.width}
                  height={scene.height}
                  quality={92}
                  unoptimized
                  sizes="(min-width: 1190px) 1150px, calc(100vw - 40px)"
                  loading="lazy"
                />
              </LightboxTrigger>
            </article>
          ))}
        </section>

        <ProjectPager currentSlug="foldframe" />

        <footer className={`${styles.wrap} ${styles.footer}`}>
          <p>Next.js 14 · NestJS · MongoDB · 支持直连本机 Antigravity / Codex / 即梦 AI / Grok / WorkBuddy 与 13 个主流社媒平台</p>
          <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
            <a href="https://foldframe-studio.vercel.app" target="_blank" rel="noreferrer">独立展示页 ↗</a>
            <a href="https://github.com/hxy940219220-collab/foldframe" target="_blank" rel="noreferrer">GitHub ↗</a>
            <Link href="/#work">返回全部项目 ↗</Link>
          </div>
        </footer>
      </main>
    </LightboxProvider>
  );
}
