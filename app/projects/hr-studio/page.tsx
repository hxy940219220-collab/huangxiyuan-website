import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../showcase.module.css";
import gallery from "./gallery.module.css";

const title = "HR 搭档 · AI 人事工作台";
const description = "从工位打开员工档案，核对薪酬、绩效和培训记录。招聘团队可以从岗位需求跟进到面试和入职，也能在岗位会话里让 AI 整理面试材料。";
const base = "/projects/hr-studio";
const cover = {
  url: base + "/workspace-overview.webp",
  alt: "HR 搭档完整工作台，包括左侧导航、组织指标、六个部门的工位地图和当日事项",
  width: 2304, height: 2223,
};

export const metadata: Metadata = {
  title: title + " | HXY Projects",
  description,
  alternates: { canonical: base },
  openGraph: { title, description, url: base, type: "website", images: [cover] },
  twitter: { card: "summary_large_image", title, description, images: [cover.url] },
};

type Scene = {
  id: string;
  title: string;
  text: string;
  image: string;
  alt: string;
  width?: number;
  height?: number;
};

const office: Scene = {
  id: "office", title: "点开工位，查看这位同事的档案",
  text: "点开产品设计部顾思远的工位，右侧就能读到他的岗位职责、工作经历和在司奖励。想看更近的变动，可以切到薪酬记录或绩效回顾。关上档案就回到原来的地图。",
  image: "office-person-drawer.webp", width: 2304, height: 1500, alt: "从组织地图点开员工后，右侧显示员工档案，背景仍可见原来的部门与工位",
};

const employee: Scene[] = [
  { id: "payroll", title: "核对本月工资", text: "薪酬台账按月列出固定薪资、奖津和扣减。筛出入职、调薪或请假带来的异动，逐条核对后，再批量确认其余草稿。",
    image: "payroll.webp", alt: "薪酬台账的汇总指标、异动筛选与员工工资构成" },
  { id: "performance", title: "回顾目标进度", text: "按考核周期查看员工目标、完成进度和反馈。切换到卡片视图，可以在面谈前找出仍需跟进的目标。",
    image: "employee-performance.webp", width: 2304, height: 1500, alt: "绩效回顾页面中的员工目标、进度和考核记录" },
  { id: "training", title: "跟进新人培训", text: "在新人培训页查看课程、参训员工和截止日期，跟进仍在进行的学习任务，并登记完成情况。",
    image: "employee-training.webp", width: 2304, height: 1500, alt: "新人培训工作台中的课程与员工学习记录" },
  { id: "leave", title: "审批请假与工作交接", text: "顾思远提交了两天年假申请。负责人能在详情里核对起止日期，读到他对设计评审的交接安排，再决定批准或驳回。",
    image: "employee-leave-approval.webp", width: 2310, height: 1418, alt: "员工年假审批详情，含申请日期、工作交接说明和审批操作" },
];

const hiring: Scene[] = [
  { id: "jobs", title: "明确岗位需求", text: "岗位卡片把招聘部门、薪资预算、任职条件和工作职责列在一起。打开关联候选人，就能继续核对这个岗位的实际进展。",
    image: "job-details.webp", alt: "资深产品设计师岗位详情，列出薪资、职责与招聘条件" },
  { id: "pipeline", title: "沿着招聘看板跟进人选", text: "从上方漏斗选中一个阶段，查看相应的候选人。看板卡片保留岗位和面试安排，拖动到新阶段可继续办理。",
    image: "hiring-board.webp", alt: "招聘漏斗及按面试阶段排列的人选卡片" },
  { id: "resume", title: "打开候选人的简历", text: "从候选人卡片查看简历中的教育和工作经历，结合来源、应聘岗位及面试反馈，列出下一轮要核实的细节。",
    image: "candidate-resume.webp", alt: "招聘看板上打开的候选人简历抽屉" },
  { id: "questions", title: "为这个岗位准备问题", text: "面试题库按能力维度整理题目。展开一道题，可以查阅考察重点、参考追问和评分锚点，也能用这套题做面试演练。",
    image: "question-bank.webp", alt: "按岗位整理的面试题库，一道题展开了追问和评分锚点" },
  { id: "schedule", title: "安排面试、跟进反馈", text: "按面试时间核对候选人、轮次和面试官。准备下一场时可打开面试准备单，结束后从同一条安排登记反馈。",
    image: "interview-schedule.webp", alt: "面试日程中的候选人、面试时间与跟进操作" },
  { id: "onboarding", title: "从录用跟进到入职", text: "人选按薪酬沟通、Offer 发放和入职交接分列。谈薪时核对金额与材料，报到前再确认接收部门、负责人和交接清单。",
    image: "offer-onboarding.webp", alt: "招聘管理中用于核对录用与入职办理信息的页面" },
];

const assistant: Scene[] = [
  { id: "interview", title: "根据简历和岗位准备追问", text: "在岗位会话中选定候选人，生成面试准备单。已记录的经历和有待确认的问题分开呈现，点击引用可以回到来源档案。",
    image: "ai-interview.webp", alt: "岗位会话里的候选人面试准备单与资料引用" },
  { id: "scope", title: "边对话，边核对岗位资料", text: "会话可以绑定部门、员工或招聘需求。讨论薪资时展开右侧资料，可同时查看岗位预算、候选人的期望和面试进度。",
    image: "ai-context.webp", alt: "对照岗位资料抽屉与候选人薪资信息的会话界面" },
];

function Screen({ scene, wide = false }: { scene: Scene; wide?: boolean }) {
  const src = base + "/" + scene.image;
  return (
    <figure id={scene.id} className={gallery.scene}>
      <figcaption>
        <h3>{scene.title}</h3>
        <p>{scene.text}</p>
      </figcaption>
      <a className={gallery.imageLink} href={src} target="_blank" rel="noreferrer" aria-label={`查看原图：${scene.title}`}>
        <Image src={src} alt={scene.alt} width={scene.width ?? 2088} height={scene.height ?? 1363} quality={92}
          sizes={wide ? "(min-width: 1190px) 1150px, calc(100vw - 40px)" : "(min-width: 1190px) 555px, (min-width: 850px) 47vw, calc(100vw - 40px)"} />
      </a>
    </figure>
  );
}

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
        <figure className={gallery.overview}>
          <a className={gallery.imageLink} href={cover.url} target="_blank" rel="noreferrer" aria-label="查看完整工作台原图">
            <Image src={cover.url} alt={cover.alt} width={cover.width} height={cover.height} quality={92} preload
              sizes="(min-width: 1190px) 1150px, calc(100vw - 40px)" />
          </a>
          <figcaption className={styles.caption}>青屿科技示例工作区。点击图片可查看原图。</figcaption>
        </figure>
      </section>
      <div className={styles.wrap}>
        <nav className={gallery.contents} aria-label="功能导览">
          <a href="#employees">员工管理</a><a href="#recruitment">招聘管理</a><a href="#ai">AI 面试协作</a>
        </nav>
        <section id="employees" className={gallery.chapter} aria-labelledby="employees-title">
          <h2 id="employees-title">员工管理</h2>
          <Screen scene={office} wide />
          <div className={gallery.grid}>{employee.map(scene => <Screen key={scene.id} scene={scene} />)}</div>
        </section>
        <section id="recruitment" className={gallery.chapter} aria-labelledby="recruitment-title">
          <h2 id="recruitment-title">招聘管理</h2>
          <div className={gallery.grid}>{hiring.map(scene => <Screen key={scene.id} scene={scene} />)}</div>
        </section>
        <section id="ai" className={gallery.chapter} aria-labelledby="ai-title">
          <h2 id="ai-title">AI 面试协作</h2>
          <div className={gallery.grid}>{assistant.map(scene => <Screen key={scene.id} scene={scene} />)}</div>
        </section>
      </div>
      <footer className={`${styles.wrap} ${styles.footer}`}>
        <p>单文件 Web 应用 · 示例数据保存在当前浏览器</p>
        <Link href="/#work">查看其他项目 ↗</Link>
      </footer>
    </main>
  );
}
