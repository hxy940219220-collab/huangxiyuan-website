import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../showcase.module.css";

const title = "HR 搭档 · AI 人事工作台";
const description = "从组织地图找到一位同事，从招聘看板打开一份简历，再让 AI 带着当前岗位的资料准备面试。";
const base = "/projects/hr-studio";
const cover = { url: base + "/office-map.webp", alt: "组织总览里的部门办公区、员工角色与空缺工位", width: 1697, height: 1092 };

export const metadata: Metadata = {
  title: title + " | HXY Projects",
  description,
  alternates: { canonical: base },
  openGraph: { title, description, url: base, type: "website", images: [cover] },
  twitter: { card: "summary_large_image", title, description, images: [cover.url] },
};

const scenes = [
  { id: "office", label: "角色与工位", title: "从一个工位认识一位同事",
    text: "部门名册映射为一排排工位。角色的发型、着装和小动作各有变化，点选工位即可查看员工档案。",
    image: "office-characters.webp", alt: "技术研发部工位特写，桌前坐着不同造型的员工角色", width: 1200, height: 927 },
  { id: "lounge", label: "办公室场景", title: "从工位走到休息区",
    text: "桌前的同事、两张沙发和咖啡台都在同一张办公室地图里。拉近视角，可以查看工位陈设和公共区域的细节。",
    image: "office-lounge.webp", alt: "员工工位旁的休息区，沙发与茶几邻近咖啡台", width: 1928, height: 587 },
  { id: "pipeline", label: "招聘看板", title: "看清每位候选人到了哪一步",
    text: "漏斗显示各阶段的人数，候选人卡片保留岗位、薪资线索和面试进度。面试官可以从卡片进入档案，核对简历原文。",
    image: "hiring-board.webp", alt: "招聘漏斗下方按面试阶段排列的候选人看板", width: 2088, height: 1363 },
  { id: "interview", label: "面试准备", title: "带着证据与追问去面试",
    text: "在岗位会话中选择候选人，工作台把已有经历和有待确认的问题整理成面试准备单。点开来源即可回到相关档案。",
    image: "ai-interview.webp", alt: "AI 对话中的候选人面试准备单与引用资料", width: 2088, height: 1363 },
  { id: "scope", label: "岗位会话", title: "在同一段对话里核对岗位资料",
    text: "每段会话可以绑定部门、员工或招聘需求。讨论岗位时，可随时打开资料抽屉，对照薪资预算与候选人进度。",
    image: "ai-context.webp", alt: "岗位会话和对应资料面板，展示薪资与候选人情况", width: 2088, height: 1363 },
];

export default function HRStudioPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.wrap}>
          <Link href="/" className={styles.wordmark}>HXY / EVAN</Link>
          <Link href="/#project-hr-studio" className={styles.back}>← 返回项目</Link>
        </div>
      </header>
      <section className={`${styles.wrap} ${styles.hero}`} aria-labelledby="hr-title">
        <h1 id="hr-title" className={styles.longTitle}>{title}</h1>
        <p className={styles.lead}>{description}</p>
        <a className={styles.demoLink} href="https://hr-dadang.vercel.app/" target="_blank" rel="noopener noreferrer">打开示例工作台 ↗</a>
        <figure>
          <a href={cover.url} target="_blank" rel="noreferrer" aria-label="查看组织地图原图">
            <Image src={cover.url} alt={cover.alt} width={cover.width} height={cover.height} preload
              sizes="(min-width: 1190px) 1150px, calc(100vw - 40px)" className={styles.heroImage} />
          </a>
          <figcaption className={styles.caption}>示例组织的办公室全景。每个工位连接对应的员工或招聘岗位。</figcaption>
        </figure>
      </section>
      <section className={`${styles.wrap} ${styles.demo}`} aria-labelledby="hr-scenes">
        <div className={styles.demoHeading}>
          <h2 id="hr-scenes">功能截图</h2>
          <nav aria-label="跳到功能截图" className={styles.jump}>
            {scenes.map(scene => <a key={scene.id} href={`#${scene.id}`}>{scene.label}</a>)}
          </nav>
        </div>
        {scenes.map(scene => (
          <article id={scene.id} key={scene.id} className={styles.step}>
            <h3>{scene.title}</h3>
            <p>{scene.text}</p>
            <a className={styles.frame} href={`${base}/${scene.image}`} target="_blank" rel="noreferrer" aria-label={`查看${scene.label}原图`}>
              <Image src={`${base}/${scene.image}`} alt={scene.alt} width={scene.width} height={scene.height}
                sizes="(min-width: 1190px) 1150px, calc(100vw - 40px)" />
            </a>
          </article>
        ))}
      </section>
      <footer className={`${styles.wrap} ${styles.footer}`}>
        <p>单文件 Web 应用 · 示例数据保存在当前浏览器</p>
        <Link href="/#work">查看其他项目 ↗</Link>
      </footer>
    </main>
  );
}
