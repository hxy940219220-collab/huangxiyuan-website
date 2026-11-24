import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Screenshot from "./Screenshot";
import Link from "next/link";
import styles from "../showcase.module.css";
import gallery from "./gallery.module.css";
import { LightboxProvider, LightboxTrigger, type LightboxItem } from "../LightboxGallery";
import { ProjectPager } from "../ProjectPager";

const title = "HR 搭档 · AI 人事工作台";
const description = "以 AI 同事、待办审批、企业人才库与交互式组织地图为核心的 AI-Native 人事工作台。日常巡检由 AI 主动起草并汇总确认，员工档案、薪酬绩效与全流程招聘在同一工作区内闭环联动。";
const base = "/projects/hr-studio";
const cover = {
  url: base + "/workspace-overview.webp",
  alt: "HR 搭档工作台首页，包括左侧导航、组织指标、六个部门的工位地图、常驻 AI 同事条与当日事项",
  width: 2880,
  height: 2822,
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

const aiNative: Scene[] = [
  {
    id: "ai-colleagues",
    title: "四位专职 AI 同事，规则透明可控",
    text: "寻访、面试、初筛与核薪四位搭档各司其职，卡片直接标明触发时机与执行方式。可随时暂停、调整规则与偏好记忆，并在同事列表、运行记录与技能广场之间一键切换。",
    image: "ai-colleagues.webp",
    width: 2880,
    height: 1720,
    alt: "AI 同事页面，展示寻访搭档、面试搭档、初筛搭档与核薪搭档的触发规则与启停开关",
  },
  {
    id: "ai-inbox",
    title: "待办审批：日常待办与 AI 建议同屏处理",
    text: "同一页统一承接日常待办、AI 待确认与已处理记录。AI 产出的排期、催评、翻库推荐与核薪异常按事务分组，支持一键批量确认、改期或驳回并记住偏好。",
    image: "ai-inbox.webp",
    width: 2880,
    height: 1840,
    alt: "待办审批页面，按事务分组展示 AI 待确认建议，支持批量确认与切换日常待办",
  },
  {
    id: "talent-pool",
    title: "独立沉淀企业人才库",
    text: "将银牌候选人、可回流前员工与在职活水沉淀为独立人才资产，直接标出经面试验证的技能、期望薪资、90 天冷却期与授权状态，避免重复打扰。",
    image: "talent-pool.webp",
    width: 2880,
    height: 1800,
    alt: "企业人才库列表，展示银牌候选人、前员工、验证技能与筛选标签",
  },
  {
    id: "talent-rediscover",
    title: "开新岗先翻库，一键激活或建岗",
    text: "按在招岗位自动匹配库内高契合人选，点按即可加入候选人进入流程；也支持一句话输入需求直接建岗，优先盘活已有储备。",
    image: "talent-rediscover.webp",
    width: 2880,
    height: 1800,
    alt: "按岗位匹配人才库视图，展示匹配度与一键加入候选人操作",
  },
];

const office: Scene = {
  id: "office",
  title: "点开工位，查看这位同事的档案",
  text: "点开产品设计部顾思远的工位，右侧就能读到他的岗位职责、工作经历和在司奖励。想看更近的变动，可以切到薪酬记录或绩效回顾。关上档案就回到原来的地图。",
  image: "office-person-drawer.webp",
  width: 2880,
  height: 1800,
  alt: "从组织地图点开员工后，右侧显示员工档案，背景仍可见原来的部门与工位",
};

const employee: Scene[] = [
  {
    id: "payroll",
    title: "核对本月工资",
    text: "薪酬台账按月列出固定薪资、奖津和扣减。筛出入职、调薪或请假带来的异动，逐条核对后，再批量确认其余草稿。",
    image: "payroll.webp",
    alt: "薪酬台账的汇总指标、异动筛选与员工工资构成",
  },
  {
    id: "performance",
    title: "回顾目标进度",
    text: "按考核周期查看员工目标、完成进度和反馈。切换到卡片视图，可以在面谈前找出仍需跟进的目标。",
    image: "employee-performance.webp",
    width: 2304,
    height: 1500,
    alt: "绩效回顾页面中的员工目标、进度和考核记录",
  },
  {
    id: "training",
    title: "跟进新人培训",
    text: "在新人培训页查看课程、参训员工和截止日期，跟进仍在进行的学习任务，并登记完成情况。",
    image: "employee-training.webp",
    width: 2304,
    height: 1500,
    alt: "新人培训工作台中的课程与员工学习记录",
  },
  {
    id: "leave",
    title: "审批请假与工作交接",
    text: "顾思远提交了两天年假申请。负责人能在详情里核对起止日期，读到他对设计评审的交接安排，再决定批准或驳回。",
    image: "employee-leave-approval.webp",
    width: 2310,
    height: 1418,
    alt: "员工年假审批详情，含申请日期、工作交接说明和审批操作",
  },
];

const hiring: Scene[] = [
  {
    id: "jobs",
    title: "明确岗位需求",
    text: "岗位卡片把招聘部门、薪资预算、任职条件和工作职责列在一起。打开关联候选人，就能继续核对这个岗位的实际进展。",
    image: "job-details.webp",
    alt: "资深产品设计师岗位详情，列出薪资、职责与招聘条件",
  },
  {
    id: "pipeline",
    title: "沿着招聘看板跟进人选",
    text: "从上方漏斗选中一个阶段，查看相应的候选人。看板卡片保留岗位和面试安排，拖动到新阶段可继续办理。",
    image: "hiring-board.webp",
    width: 2880,
    height: 1840,
    alt: "招聘漏斗及按面试阶段排列的人选卡片",
  },
  {
    id: "resume",
    title: "打开候选人的简历",
    text: "从候选人卡片查看简历中的教育和工作经历，结合来源、应聘岗位及面试反馈，列出下一轮要核实的细节。",
    image: "candidate-resume.webp",
    alt: "招聘看板上打开的候选人简历抽屉",
  },
  {
    id: "questions",
    title: "为这个岗位准备问题",
    text: "面试题库按能力维度整理题目。展开一道题，可以查阅考察重点、参考追问和评分锚点，也能用这套题做面试演练。",
    image: "question-bank.webp",
    alt: "按岗位整理的面试题库，一道题展开了追问和评分锚点",
  },
  {
    id: "schedule",
    title: "安排面试、跟进反馈",
    text: "按面试时间核对候选人、轮次和面试官。准备下一场时可打开面试准备单，结束后从同一条安排登记反馈。",
    image: "interview-schedule.webp",
    alt: "面试日程中的候选人、面试时间与跟进操作",
  },
  {
    id: "onboarding",
    title: "从录用跟进到入职",
    text: "人选按薪酬沟通、Offer 发放和入职交接分列。谈薪时核对金额与材料，报到前再确认接收部门、负责人和交接清单。",
    image: "offer-onboarding.webp",
    alt: "招聘管理中用于核对录用与入职办理信息的页面",
  },
];

const assistant: Scene[] = [
  {
    id: "scope",
    title: "绑定业务对象，边对话边核对资料",
    text: "从左侧新建对话一键绑定部门、员工或招聘需求，顶部路径明确标注当前对象。讨论岗位或薪资时展开右侧资料，即可对照预算、人选期望与面试进度，并支持内置引擎离线秒查。",
    image: "ai-context.webp",
    width: 2880,
    height: 1800,
    alt: "对照岗位资料抽屉与候选人薪资信息的 AI 对话界面，顶部清晰标出当前绑定的招聘需求",
  },
  {
    id: "skills",
    title: "技能广场：复用与导入 HR 工作法",
    text: "按招聘、面试、薪酬与组织场景沉淀标准技能，也支持导入 SKILL.md 扩展自定义流程，在 AI 对话中一键带入执行。",
    image: "skills.webp",
    width: 2880,
    height: 1840,
    alt: "技能广场页面，支持按分类筛选、搜索以及导入自定义技能",
  },
  {
    id: "interview",
    title: "根据简历和岗位准备追问",
    text: "在岗位会话中选定候选人，生成面试准备单。已记录的经历和有待确认的问题分开呈现，点击引用可以回到来源档案。",
    image: "ai-interview.webp",
    alt: "岗位会话里的候选人面试准备单与资料引用",
  },
];

const allScenes: Scene[] = [...aiNative, office, ...employee, ...hiring, ...assistant];
const indexById = new Map<string, number>(allScenes.map((s, i) => [s.id, i + 1]));

const lightboxItems: LightboxItem[] = [
  { src: cover.url, alt: cover.alt, title: "HR 搭档 · 完整工作台总览", caption: "青屿科技示例工作区" },
  ...allScenes.map((scene) => ({
    src: `${base}/${scene.image}`,
    alt: scene.alt,
    title: scene.title,
    caption: scene.text,
  })),
];

const pageAccent = {
  "--accent": "#75ba9c",
  "--accent-soft": "rgba(117, 186, 156, 0.14)",
} as CSSProperties;

function Screen({ scene, fitContent = false }: { scene: Scene; fitContent?: boolean }) {
  const src = base + "/" + scene.image;
  const lbIndex = indexById.get(scene.id) ?? 0;
  return (
    <figure id={scene.id} className={gallery.scene}>
      <figcaption>
        <h3>{scene.title}</h3>
        <p>{scene.text}</p>
      </figcaption>
      <LightboxTrigger
        index={lbIndex}
        label={`放大查看：${scene.title}`}
        fitContent={fitContent}
        className={gallery.imageLink}
      >
        <Screenshot original={src} alt={scene.alt} width={scene.width ?? 2088} height={scene.height ?? 1363} />
      </LightboxTrigger>
    </figure>
  );
}

export default function HRStudioPage() {
  return (
    <LightboxProvider items={lightboxItems}>
      <main className={styles.page} style={pageAccent}>
        <header className={styles.header}>
          <div className={styles.wrap}>
            <Link href="/" className={`cursor-target ${styles.wordmark}`}>HXY / EVAN</Link>
            <Link href="/#project-hr-studio" className={`cursor-target ${styles.back}`}>← 返回项目栏</Link>
          </div>
        </header>
        <section className={`${styles.wrap} ${styles.hero}`} aria-labelledby="hr-title">
          <p className={styles.kicker}>03 · AI 人事工作台</p>
          <h1 id="hr-title" className={styles.longTitle}>{title}</h1>
          <p className={styles.lead}>{description}</p>
          <a
            href="https://hr-dadang.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={`cursor-target ${styles.demoLink}`}
          >
            在线体验 ↗
          </a>
          <figure className={gallery.overview}>
            <LightboxTrigger
              index={0}
              label="放大查看完整工作台原图"
              fitContent
              className={gallery.imageLink}
            >
              <Screenshot original={cover.url} alt={cover.alt} width={cover.width} height={cover.height} cover />
            </LightboxTrigger>
            <figcaption className={styles.caption}>青屿科技示例工作区。点击任意截图可在当前页放大预览并左右切换。</figcaption>
          </figure>
        </section>
        <div className={styles.wrap}>
          <nav className={gallery.contents} aria-label="功能导览">
            <a href="#ai-native">AI 同事与人才库</a>
            <a href="#employees">员工管理</a>
            <a href="#recruitment">招聘管理</a>
            <a href="#ai">AI 对话与技能</a>
          </nav>
          <section id="ai-native" className={gallery.chapter} aria-labelledby="ai-native-title">
            <h2 id="ai-native-title">AI 同事与人才库</h2>
            <div className={gallery.grid}>
              {aiNative.map((scene) => <Screen key={scene.id} scene={scene} />)}
            </div>
          </section>
          <section id="employees" className={gallery.chapter} aria-labelledby="employees-title">
            <h2 id="employees-title">员工管理</h2>
            <Screen scene={office} fitContent />
            <div className={gallery.grid}>
              {employee.map((scene) => <Screen key={scene.id} scene={scene} />)}
            </div>
          </section>
          <section id="recruitment" className={gallery.chapter} aria-labelledby="recruitment-title">
            <h2 id="recruitment-title">招聘管理</h2>
            <div className={gallery.grid}>
              {hiring.map((scene) => <Screen key={scene.id} scene={scene} />)}
            </div>
          </section>
          <section id="ai" className={gallery.chapter} aria-labelledby="ai-title">
            <h2 id="ai-title">AI 对话与技能</h2>
            <div className={gallery.grid}>
              {assistant.map((scene) => <Screen key={scene.id} scene={scene} />)}
            </div>
          </section>
        </div>

        <ProjectPager currentSlug="hr-studio" />

        <footer className={`${styles.wrap} ${styles.footer}`}>
          <p>单文件 Web 应用 · 示例数据保存在当前浏览器</p>
          <Link href="/#work">返回全部项目 ↗</Link>
        </footer>
      </main>
    </LightboxProvider>
  );
}
