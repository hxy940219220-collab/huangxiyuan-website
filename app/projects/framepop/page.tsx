import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../showcase.module.css";

const title = "Framepop 灵感设计AI工作台";
const description = "从一句创作简报开始，在同一张画布上排分镜、看视频、切换模型。文案、素材和生成结果随项目保存在本机。";
const cover = {
  url: "/projects/framepop/video-models.webp",
  alt: "水母短片的简报连到视频和分镜，右侧可选择 Kling 4.0、MiniMax H3 Max、Seedance 2.5 和 Vidu Q4 Preview",
  width: 2100, height: 1350,
};

export const metadata: Metadata = {
  title: title + " | HXY Projects",
  description,
  alternates: { canonical: "/projects/framepop" },
  openGraph: { title, description, type: "website", url: "/projects/framepop", images: [cover] },
  twitter: { card: "summary_large_image", title, description, images: [cover.url] },
};

const scenes = [
  { id: "inspiration", label: "创作首页", title: "从一句简报或一个案例开始",
    description: "输入短片的主题、时长和想突出的动作，也可以从动画、图像或影视案例中挑一个起点，把提示词带到自己的画布。",
    image: "/projects/framepop/inspiration.webp", alt: "创作首页的简报输入框、灵感分类，以及水母、汽车、人像等案例封面",
    width: 2100, height: 1350 },
  { id: "storyboard", label: "文案与分镜", title: "把故事拆成能拍的镜头",
    description: "在这份 30 秒分镜里，特写开场、中景跟随、全景拉远，各有对应的时段和动作。左侧按节点排开，右侧对话保留文案和镜头表全文。",
    image: "/projects/framepop/storyboard.webp", alt: "三张相连的简报、文案和镜头表卡片，右侧对话展示三段分镜",
    width: 1390, height: 908 },
];

export default function FramepopPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.wrap}>
          <Link href="/" className={styles.wordmark}>HXY / EVAN</Link>
          <Link href="/#project-framepop" className={styles.back}>← 返回项目</Link>
        </div>
      </header>
      <section className={`${styles.wrap} ${styles.hero}`} aria-labelledby="framepop-title">
        <h1 id="framepop-title" className={styles.longTitle}>{title}</h1>
        <p className={styles.lead}>{description}</p>
        <figure>
          <a href={cover.url} target="_blank" rel="noreferrer" aria-label="查看水母视频画布原图">
            <Image src={cover.url} alt={cover.alt} width={cover.width} height={cover.height} preload
              sizes="(min-width: 1190px) 1150px, calc(100vw - 40px)" className={styles.heroImage} />
          </a>
          <figcaption className={styles.caption}>画布里是已有的水母示例片段。为下一条短片选择视频模型时，可以用可灵 Kling 4.0、海螺 MiniMax H3 Max、Seedance 2.5，或用首帧图片驱动 Vidu Q4 Preview。</figcaption>
        </figure>
      </section>
      <section className={`${styles.wrap} ${styles.demo}`} aria-labelledby="framepop-gallery">
        <div className={styles.demoHeading}>
          <h2 id="framepop-gallery">界面演示</h2>
          <nav aria-label="跳到演示界面" className={styles.jump}>
            {scenes.map(scene => <a key={scene.id} href={`#${scene.id}`}>{scene.label}</a>)}
          </nav>
        </div>
        {scenes.map(scene => (
          <article id={scene.id} key={scene.id} className={styles.step}>
            <h3>{scene.title}</h3>
            <p>{scene.description}</p>
            <a className={styles.frame} href={scene.image} target="_blank" rel="noreferrer" aria-label={`查看${scene.label}原图`}>
              <Image src={scene.image} alt={scene.alt} width={scene.width} height={scene.height}
                sizes="(min-width: 1190px) 1150px, calc(100vw - 40px)" />
            </a>
          </article>
        ))}
      </section>
      <footer className={`${styles.wrap} ${styles.footer}`}>
        <p>macOS 桌面应用 · 单文件 HTML</p>
        <Link href="/#work">查看其他项目 ↗</Link>
      </footer>
    </main>
  );
}
