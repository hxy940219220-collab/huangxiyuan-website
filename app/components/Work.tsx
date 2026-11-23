"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { GithubLogo, ArrowUpRight } from "@phosphor-icons/react";
import { ScrollReveal } from "./ScrollReveal";
import BlurText from "../reactbits/TextAnimations/BlurText/BlurText";

/* 3D Tilt card wrapper */
function TiltWrap({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { damping: 25, stiffness: 120, mass: 1.5 });
  const rotateY = useSpring(useMotionValue(0), { damping: 25, stiffness: 120, mass: 1.5 });

  function handleMouse(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    rotateX.set((offsetY / (rect.height / 2)) * -4);
    rotateY.set((offsetX / (rect.width / 2)) * 4);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div ref={ref} className={`[perspective:900px] ${className}`} onMouseMove={handleMouse} onMouseLeave={handleLeave}>
      <motion.div style={{ rotateX, rotateY }} className="[transform-style:preserve-3d] h-full">
        {children}
      </motion.div>
    </div>
  );
}

type ProjectAction = {
  label: string;
  href: string;
  external?: boolean;
  variant: "primary" | "secondary";
  icon?: "github" | "arrow";
};

type ProjectItem = {
  index: string;
  id: string;
  title: string;
  iconSrc?: string;
  image: string;
  imageAlt: string;
  imageFit?: "cover" | "contain";
  imageBg?: string;
  cardHref?: string;
  primaryTag: string;
  primaryTagClass: string;
  hoverBorderClass: string;
  tags: string[];
  summary: string;
  thesis?: string;
  detail?: string;
  cornerBadge?: { label: string; dotClass: string };
  hardwareSpec?: { status: string; spec: string; dotClass: string };
  actions?: ProjectAction[];
};

const PROJECTS: ProjectItem[] = [
  {
    index: "01",
    id: "project-tango",
    title: "Tango · 跨境电商AI工作台",
    image: "/projects/tango/home.webp",
    imageAlt: "Tango 工作台首页，显示跨境运营任务和常用专家",
    imageFit: "cover",
    cardHref: "/projects/tango",
    primaryTag: "跨境电商 Agent",
    primaryTagClass: "border-[#ff6a1a]/45 bg-[#ff6a1a]/[0.08] text-[#ffb17d]",
    hoverBorderClass: "hover:border-[#ff6a1a]/45",
    tags: ["多专家协作", "本机模型 / API"],
    summary:
      "一个商品上新任务可由最多四位专家接力。竞品分析、商品页文案和设计图留在同一条对话里，运营可以查看每个阶段的进度并复用产物。",
    actions: [
      { label: "查看功能截图", href: "/projects/tango", variant: "primary", icon: "arrow" },
    ],
  },
  {
    index: "02",
    id: "project-foldframe",
    title: "Foldframe · AI内容创作与多端发布工作台",
    image: "/projects/foldframe/layout-workshop.webp",
    imageAlt: "Foldframe 排版工坊：3:4 极简琥珀护肤精华商业主图完整呈现在小红书仿真手机预览中，右侧配备竖排比例工具栏",
    imageFit: "cover",
    cardHref: "/projects/foldframe",
    primaryTag: "社媒创作与发布",
    primaryTagClass: "border-neon-pink/45 bg-neon-pink/[0.08] text-[#d896ff]",
    hoverBorderClass: "hover:border-neon-pink/45",
    tags: ["商业生图 / 视频", "多平台发布", "本机模型接入"],
    summary:
      "覆盖从商业产品图、写实人像、短视频制作、仿真手机排版到 13 个主流社媒平台定时发布的完整工作流。支持直连本机 Antigravity、Codex、即梦 AI、Grok（网页授权）与 WorkBuddy 引擎，一次创作即可多端高效分发。",
    actions: [
      { label: "查看产品展示", href: "/projects/foldframe", variant: "primary", icon: "arrow" },
      { label: "在线展示页", href: "https://foldframe-studio.vercel.app", external: true, variant: "secondary", icon: "arrow" },
      { label: "GitHub", href: "https://github.com/hxy940219220-collab/foldframe", external: true, variant: "secondary", icon: "github" },
    ],
  },
  {
    index: "03",
    id: "project-hr-studio",
    title: "HR 搭档 · AI 人事工作台",
    image: "/projects/hr-studio/office-map.webp",
    imageAlt: "HR 搭档的组织地图，每个部门都有独立办公区和员工角色",
    imageFit: "contain",
    imageBg: "bg-[#f7f8f7]",
    cardHref: "/projects/hr-studio",
    primaryTag: "AI 人事工作台",
    primaryTagClass: "border-[#75ba9c]/45 bg-[#75ba9c]/[0.08] text-[#a1dfc2]",
    hoverBorderClass: "hover:border-[#75ba9c]/45",
    tags: ["组织地图", "招聘与面试", "档案问答"],
    summary: "在办公室地图上点选同事，就能打开员工档案。为招聘岗位开启单独的 AI 会话，可以结合候选人的简历和面试记录拟定追问，并把需要核实的事项建成待办。",
    actions: [
      { label: "查看功能截图", href: "/projects/hr-studio", variant: "primary", icon: "arrow" },
      { label: "体验工作台", href: "https://hr-dadang.vercel.app/", external: true, variant: "secondary", icon: "arrow" },
    ],
  },
  {
    index: "04",
    id: "project-framepop",
    title: "Framepop 灵感设计AI工作台",
    image: "/projects/framepop/video-models.webp",
    imageAlt: "Framepop 水母画布，视频菜单列出 Kling 4.0、MiniMax H3 Max、Seedance 2.5 和 Vidu Q4 Preview",
    imageFit: "contain",
    imageBg: "bg-[#efeff3]",
    cardHref: "/projects/framepop",
    primaryTag: "AI 创作画布",
    primaryTagClass: "border-neon-cyan/45 bg-neon-cyan/[0.08] text-neon-cyan",
    hoverBorderClass: "hover:border-neon-cyan/45",
    tags: ["图像与视频", "多模型接入"],
    summary:
      "从一句想法开始，在画布上编排文案和分镜。连起参考图与视频节点，用自己的模型生成画面、短片或配音。",
    actions: [
      { label: "查看界面演示", href: "/projects/framepop", variant: "primary", icon: "arrow" },
    ],
  },
  {
    index: "05",
    id: "project-quicknote",
    title: "QuickNote · AI 便签",
    iconSrc: "/projects/quicknote/app-icon-current.png",
    image: "/projects/quicknote/native-image-pin.webp",
    imageAlt: "QuickNote 在置顶窗口里分析截图，并提供存入便签的操作",
    imageFit: "contain",
    imageBg: "bg-[#080812]",
    cardHref: "/projects/quicknote",
    primaryTag: "AI 便签",
    primaryTagClass: "border-neon-cyan/45 bg-neon-cyan/[0.08] text-neon-cyan",
    hoverBorderClass: "hover:border-neon-cyan/40",
    tags: ["macOS", "Codex / MCP"],
    summary:
      "读资料时，划词就能翻译或问 AI，截图就能提取文字和整理重点。原图与答案可直接存进指定便签，省下在阅读、聊天和笔记之间来回复制的时间。",
    detail:
      "划词和识图窗口可置顶。存下来的笔记可全文搜索，也能向它们提问并查看答案引用的原文。",
    actions: [
      { label: "查看演示", href: "/projects/quicknote", variant: "primary", icon: "arrow" },
      { label: "GitHub", href: "https://github.com/hxy940219220-collab/QuickNote-IOS", external: true, variant: "secondary", icon: "github" },
    ],
  },
  {
    index: "06",
    id: "project-eureka",
    title: "尤里卡 · IP 内容创作",
    image: "/eureka-project-card.webp",
    imageAlt: "尤里卡 IP 内容创作 AI 工作台",
    imageFit: "cover",
    cardHref: "/projects/eureka",
    primaryTag: "AI 内容创作",
    primaryTagClass: "border-neon-gold/45 bg-neon-gold/[0.08] text-neon-gold",
    hoverBorderClass: "hover:border-neon-gold/40",
    tags: ["Agent Workflow", "Electron"],
    summary: "从联网热点与个人灵感出发，生成可直接执行的视频脚本和逐字口播稿。",
    thesis: "不做空白聊天框，而把“今天讲什么”变成可持续的创作流程",
    detail: "将选题搜索、来源核验、真人口播或双角色脚本、敏感词审查、发布包和数据复盘串成一个本地 AI 工作台。",
    actions: [
      { label: "查看演示", href: "/projects/eureka", variant: "primary", icon: "arrow" },
      { label: "GitHub", href: "https://github.com/hxy940219220-collab/huangxiyuan-website", external: true, variant: "secondary", icon: "github" },
    ],
  },
  {
    index: "07",
    id: "project-call-home",
    title: "Call Home · 给父母的一通电话",
    image: "/call-home-project-card.webp",
    imageAlt: "Call Home 给父母的一通电话互动装置",
    imageFit: "cover",
    primaryTag: "嵌入式开发",
    primaryTagClass: "border-neon-pink/45 bg-neon-pink/[0.08] text-[#e68aff]",
    hoverBorderClass: "hover:border-neon-pink/40",
    tags: ["Raspberry Pi 5", "STM32"],
    summary: "用距离感知与电话听筒，把“想起父母”变成一次真实的联系。",
    thesis: "不是播放一段公益动画，而是设计从靠近到行动的体验路径",
    detail: "以树莓派 5 为主控，联动超声波测距、STM32 与听筒微动开关，完成三态画面切换，并通过二维码唤起预填短信。",
    cornerBadge: { label: "实物原型", dotClass: "bg-neon-pink" },
    hardwareSpec: {
      status: "实物原型 · 三态联动",
      spec: "Raspberry Pi 5 · STM32",
      dotClass: "bg-neon-pink shadow-[0_0_8px_#d84cff]",
    },
  },
  {
    index: "08",
    id: "project-claude-signal",
    title: "Claude Signal · 实体审批台",
    image: "/claude-signal-project-card.webp",
    imageAlt: "Claude Signal 多会话 Agent 实体审批台",
    imageFit: "cover",
    primaryTag: "嵌入式开发",
    primaryTagClass: "border-[#4ade80]/45 bg-[#4ade80]/[0.08] text-[#6ee7a0]",
    hoverBorderClass: "hover:border-[#4ade80]/40",
    tags: ["ESP32-S3", "Agent 审批"],
    summary: "把多个 Claude Code 会话的运行状态，映射成看得见、按得下的硬件信号。",
    thesis: "不是再开一个监控窗口，而是让 Agent 状态离开屏幕",
    detail: "ESP32-S3 汇总后台会话，红黄绿灯与 OLED 提示执行、报错、待审批和完成；需要授权时，街机键可直接完成审批。",
    cornerBadge: { label: "实物原型", dotClass: "bg-[#4ade80]" },
    hardwareSpec: {
      status: "实物原型 · 多会话监控",
      spec: "ESP32-S3 · OLED · 实体按键",
      dotClass: "bg-[#4ade80] shadow-[0_0_8px_#4ade80]",
    },
  },
];

function MediaFrame({ project }: { project: ProjectItem }) {
  const inner = (
    <div
      className={`relative aspect-[16/10] w-full overflow-hidden rounded-[13px] border border-white/[0.09] ${project.imageBg ?? "bg-[#080812]"}`}
    >
      <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        quality={92}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className={
          project.imageFit === "contain"
            ? "object-contain transition-transform duration-500 group-hover/card:scale-[1.015]"
            : "object-cover transition-transform duration-500 group-hover/card:scale-[1.015]"
        }
      />
      {/* 柔和内边缘与底部暗角过渡，消除高亮浅色截图在深色面板上的刺眼跳跃 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[13px] ring-1 ring-inset ring-black/25 bg-[linear-gradient(to_top,rgba(11,11,20,0.42)_0%,transparent_28%)]"
      />
      {project.cornerBadge && (
        <div className="pointer-events-none absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/[0.14] bg-[#050509]/80 px-2.5 py-1 backdrop-blur-md">
          <span className={`h-1.5 w-1.5 rounded-full ${project.cornerBadge.dotClass}`} />
          <span className="font-body text-[10.5px] font-medium tracking-[0.08em] text-[#f5f7ff]">
            {project.cornerBadge.label}
          </span>
        </div>
      )}
    </div>
  );

  if (project.cardHref) {
    return (
      <div className="p-2.5 pb-0 shrink-0">
        <Link
          href={project.cardHref}
          aria-label={`查看 ${project.title}`}
          className="cursor-target block rounded-[13px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-cyan"
        >
          {inner}
        </Link>
      </div>
    );
  }

  return <div className="p-2.5 pb-0 shrink-0">{inner}</div>;
}

export function Work() {
  return (
    <section
      id="work"
      className="relative z-10 w-full px-6 md:px-12 py-16 md:py-24"
    >
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-14 mb-12">
        <BlurText
          text="代表项目"
          className="section-display-heading font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.16] text-[#f5f7ff]"
          delay={50}
          animateBy="words"
          direction="top"
        />
        <ScrollReveal delay={0.14}>
          <p className="text-[15px] text-text-tertiary leading-[1.75] self-end pb-1">
            Tango 展示多位电商专家怎样接力交付，Framepop 把分镜、参考素材和生成模型放进同一张画布，QuickNote 让 Codex 在授权范围内读写便签。项目页可以看到每种设计怎样落到实际操作里。
          </p>
        </ScrollReveal>
      </div>

      {/* Project cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {PROJECTS.map((project, idx) => (
          <ScrollReveal key={project.id} delay={0.04 * (idx % 2)} className="h-full">
            <TiltWrap className="h-full">
              <motion.article
                id={project.id}
                whileHover={{ y: -5 }}
                className={`group/card relative flex h-full scroll-mt-24 flex-col overflow-hidden rounded-[20px] border border-white/[0.10] bg-[#0b0b14] shadow-[0_12px_48px_rgba(0,0,0,0.45)] transition-all duration-300 ${project.hoverBorderClass} hover:shadow-[0_20px_60px_rgba(0,0,0,0.55),0_0_36px_rgba(0,200,255,0.08)]`}
              >
                <MediaFrame project={project} />

                <div className="flex flex-1 flex-col p-6 md:p-7">
                  {/* Tag Chips */}
                  <div className="mb-3.5 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full border px-3 py-1 font-body text-[11px] font-medium tracking-[0.04em] ${project.primaryTagClass}`}
                    >
                      {project.primaryTag}
                    </span>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/[0.10] bg-white/[0.025] px-3 py-1 font-body text-[11px] tracking-[0.03em] text-text-tertiary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="card-display-title mb-2.5 flex items-center gap-2.5 font-display text-[1.45rem] md:text-[1.55rem] leading-snug text-[#f5f7ff]">
                    {project.iconSrc && (
                      <Image
                        src={project.iconSrc}
                        alt=""
                        width={30}
                        height={30}
                        className="size-[30px] shrink-0 object-contain"
                      />
                    )}
                    <span>{project.title}</span>
                  </h3>

                  {/* Summary */}
                  <p className="mb-3 max-w-prose text-[14.5px] leading-[1.7] text-text-secondary">
                    {project.summary}
                  </p>

                  {/* Optional Thesis + Mechanism Detail */}
                  {project.thesis && (
                    <p className="mb-1.5 font-body text-[12px] font-medium tracking-[0.04em] text-text-secondary/90">
                      {project.thesis}
                    </p>
                  )}
                  {project.detail && (
                    <p className="mb-5 text-[13px] leading-[1.68] text-text-tertiary">
                      {project.detail}
                    </p>
                  )}
                  {!project.detail && <div className="mb-3" />}

                  {/* Footer Actions or Hardware Telemetry Readout */}
                  <div className="mt-auto pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 min-h-[52px]">
                    {project.actions ? (
                      <div className="flex flex-wrap items-center gap-2.5">
                        {project.actions.map((action) => {
                          const cls =
                            action.variant === "primary"
                              ? "cursor-target inline-flex min-h-10 items-center gap-1.5 rounded-full bg-neon-cyan px-5 py-2 font-body text-[12px] font-semibold tracking-[0.04em] text-[#050509] no-underline transition-all duration-300 hover:bg-[#5ce1ff] hover:shadow-[0_0_24px_rgba(0,200,255,0.25)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-neon-cyan"
                              : "cursor-target inline-flex min-h-10 items-center gap-1.5 rounded-full border border-white/[0.14] bg-white/[0.04] px-4 py-2 font-body text-[12px] font-medium tracking-[0.03em] text-[#f5f7ff] no-underline transition-all duration-300 hover:border-neon-cyan/50 hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-neon-cyan";

                          const content = (
                            <>
                              {action.icon === "github" && <GithubLogo size={14} weight="fill" />}
                              <span>{action.label}</span>
                              {action.icon === "arrow" && <ArrowUpRight size={13} weight="bold" />}
                            </>
                          );

                          if (action.external) {
                            return (
                              <a
                                key={action.label}
                                href={action.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cls}
                              >
                                {content}
                              </a>
                            );
                          }

                          return (
                            <Link key={action.label} href={action.href} className={cls}>
                              {content}
                            </Link>
                          );
                        })}
                      </div>
                    ) : project.hardwareSpec ? (
                      <div className="flex w-full flex-wrap items-center justify-between gap-2 py-1">
                        <span className="inline-flex items-center gap-2 font-body text-[12px] font-medium text-text-secondary">
                          <span className={`h-2 w-2 rounded-full ${project.hardwareSpec.dotClass}`} />
                          {project.hardwareSpec.status}
                        </span>
                        <span className="font-body text-[11.5px] tracking-[0.04em] text-text-tertiary">
                          {project.hardwareSpec.spec}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </motion.article>
            </TiltWrap>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
