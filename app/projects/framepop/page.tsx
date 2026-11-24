import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../showcase.module.css";
import { LightboxProvider, LightboxTrigger, type LightboxItem } from "../LightboxGallery";
import { ProjectPager } from "../ProjectPager";

const title = "Framepop · 灵感设计 AI 工作台";
const description = "从一句创作简报开始，在同一张画布上排分镜、看视频、切换模型。文案、素材和生成结果随项目保存在本机。";
const cover = {
  url: "/projects/framepop/video-models.webp",
  alt: "水母短片的简报连到视频和分镜，右侧可选择 Kling 4.0、MiniMax H3 Max、Seedance 2.5 和 Vidu Q4 Preview",
  width: 2100,
  height: 1350,
};

export const metadata: Metadata = {
  title: title + " | HXY Projects",
  description,
  alternates: { canonical: "/projects/framepop" },
  openGraph: { title, description, type: "website", url: "/projects/framepop", images: [cover] },
  twitter: { card: "summary_large_image", title, description, images: [cover.url] },
};

const scenes = [
  {
    id: "inspiration",
    label: "创作首页",
    title: "从一句简报或一个案例开始",
    description: "输入短片的主题、时长和想突出的动作，也可以从动画、图像或影视案例中挑一个起点，把提示词带到自己的画布。",
    image: "/projects/framepop/inspiration.webp",
    alt: "创作首页的简报输入框、灵感分类，以及水母、汽车、人像等案例封面",
    width: 2100,
    height: 1350,
  },
  {
    id: "storyboard",
    label: "文案与分镜",
    title: "把故事拆成能拍的镜头",
    description: "在这份 30 秒分镜里，特写开场、中景跟随、全景拉远，各有对应的时段和动作。左侧按节点排开，右侧对话保留文案和镜头表全文。",
    image: "/projects/framepop/storyboard.webp",
    alt: "三张相连的简报、文案和镜头表卡片，右侧对话展示三段分镜",
    width: 1390,
    height: 908,
  },
];

const lightboxItems: LightboxItem[] = [
  {
    src: cover.url,
    alt: cover.alt,
    title: "Framepop · 水母视频画布",
    caption: "画布里是已有的水母示例片段，右侧可切换可灵 Kling 4.0、海螺 MiniMax H3 Max、Seedance 2.5 或首帧驱动 Vidu Q4 Preview。",
  },
  ...scenes.map((scene) => ({
    src: scene.image,
    alt: scene.alt,
    title: scene.title,
    caption: scene.description,
  })),
];

const pageAccent = {
  "--accent": "#00c8ff",
  "--accent-soft": "rgba(0, 200, 255, 0.14)",
} as CSSProperties;

export default function FramepopPage() {
  return (
    <LightboxProvider items={lightboxItems}>
      <main className={styles.page} style={pageAccent}>
        <header className={styles.header}>
          <div className={styles.wrap}>
            <Link href="/" className={`cursor-target ${styles.wordmark}`}>HXY / EVAN</Link>
            <Link href="/#project-framepop" className={`cursor-target ${styles.back}`}>← 返回项目栏</Link>
          </div>
        </header>
        <section className={`${styles.wrap} ${styles.hero}`} aria-labelledby="framepop-title">
          <p className={styles.kicker}>04 · AI 创作画布</p>
          <h1 id="framepop-title" className={styles.longTitle}>{title}</h1>
          <p className={styles.lead}>{description}</p>
          <figure>
            <LightboxTrigger index={0} label="放大查看水母视频画布原图" className={styles.heroImage}>
              <Image
                src={cover.url}
                alt={cover.alt}
                width={cover.width}
                height={cover.height}
                preload
                sizes="(min-width: 1190px) 1150px, calc(100vw - 40px)"
                className="block h-auto w-full"
              />
            </LightboxTrigger>
            <figcaption className={styles.caption}>
              画布里是已有的水母示例片段。为下一条短片选择视频模型时，可以用可灵 Kling 4.0、海螺 MiniMax H3 Max、Seedance 2.5，或用首帧图片驱动 Vidu Q4 Preview。
            </figcaption>
          </figure>
        </section>
        <section className={`${styles.wrap} ${styles.demo}`} aria-labelledby="framepop-gallery">
          <div className={styles.demoHeading}>
            <h2 id="framepop-gallery">界面演示</h2>
            <nav aria-label="跳到演示界面" className={styles.jump}>
              {scenes.map((scene) => <a key={scene.id} href={`#${scene.id}`}>{scene.label}</a>)}
            </nav>
          </div>
          {scenes.map((scene, index) => (
            <article id={scene.id} key={scene.id} className={styles.step}>
              <h3>{scene.title}</h3>
              <p>{scene.description}</p>
              <LightboxTrigger index={index + 1} label={`放大查看${scene.label}原图`} className={styles.frame}>
                <Image
                  src={scene.image}
                  alt={scene.alt}
                  width={scene.width}
                  height={scene.height}
                  sizes="(min-width: 1190px) 1150px, calc(100vw - 40px)"
                />
              </LightboxTrigger>
            </article>
          ))}
        </section>

        <ProjectPager currentSlug="framepop" />

        <footer className={`${styles.wrap} ${styles.footer}`}>
          <p>macOS 桌面应用 · 单文件 HTML</p>
          <Link href="/#work">返回全部项目 ↗</Link>
        </footer>
      </main>
    </LightboxProvider>
  );
}
