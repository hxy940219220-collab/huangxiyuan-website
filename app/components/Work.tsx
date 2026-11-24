"use client";

import Image from "next/image";
import quickNote from "./QuickNoteShowcase.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GithubLogo, ArrowUpRight, Cpu } from "@phosphor-icons/react";
import { ScrollReveal } from "./ScrollReveal";
import BlurText from "../reactbits/TextAnimations/BlurText/BlurText";
import {
  LightboxProvider,
  LightboxTrigger,
  type LightboxItem,
} from "../projects/LightboxGallery";

type ProjectCategory = "all" | "workbench" | "tool" | "hardware";

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
  category: Exclude<ProjectCategory, "all">;
  title: string;
  image: string;
  imageAlt: string;
  imageFit?: "cover" | "contain" | "map-cover" | "poster";
  imageBg?: string;
  cardHref?: string;
  lightboxIndex?: number;
  primaryTag: string;
  primaryTagClass: string;
  hoverBorderClass: string;
  tags: string[];
  summary: string;
  hardwareSpec?: { status: string; spec: string; dotClass: string };
  actions?: ProjectAction[];
};

const CATEGORIES: Array<{ id: ProjectCategory; label: string }> = [
  { id: "all", label: "全部" },
  { id: "workbench", label: "工作台" },
  { id: "tool", label: "效率工具" },
  { id: "hardware", label: "硬件" },
];

const PROJECTS: ProjectItem[] = [
  {
    index: "01",
    id: "project-tango",
    category: "workbench",
    title: "Tango · 跨境电商 AI 工作台",
    image: "/projects/tango/home.webp",
    imageAlt: "Tango 工作台首页，显示跨境运营任务和常用专家",
    imageFit: "cover",
    cardHref: "/projects/tango",
    primaryTag: "跨境电商 Agent",
    primaryTagClass: "border-[#ff6a1a]/45 bg-[#ff6a1a]/[0.08] text-[#ffb17d]",
    hoverBorderClass: "hover:border-[#ff6a1a]/45",
    tags: ["多专家协作", "本机模型 / API"],
    summary:
      "最多四位专家在同一会话接力完成竞品分析、Listing 文案与主图交付，阶段进度可查、产物可直接复用。",
    actions: [
      { label: "查看产品演示", href: "/projects/tango", variant: "primary", icon: "arrow" },
    ],
  },
  {
    index: "02",
    id: "project-foldframe",
    category: "workbench",
    title: "Foldframe · AI 内容创作与多端发布工作台",
    image: "/projects/foldframe/layout-workshop.webp",
    imageAlt: "Foldframe 排版工坊：3:4 极简琥珀护肤精华商业主图完整呈现在小红书仿真手机预览中，右侧配备竖排比例工具栏",
    imageFit: "cover",
    cardHref: "/projects/foldframe",
    primaryTag: "社媒创作与发布",
    primaryTagClass: "border-neon-pink/45 bg-neon-pink/[0.08] text-[#d896ff]",
    hoverBorderClass: "hover:border-neon-pink/45",
    tags: ["商业生图 / 视频", "多平台发布", "本机模型接入"],
    summary:
      "整合商业生图、短视频、仿真手机排版与 13 平台定时发布，支持直连本机 Antigravity、Codex、即梦与 Grok 引擎。",
    actions: [
      { label: "查看产品演示", href: "/projects/foldframe", variant: "primary", icon: "arrow" },
    ],
  },
  {
    index: "03",
    id: "project-hr-studio",
    category: "workbench",
    title: "HR 搭档 · AI 人事工作台",
    image: "/projects/hr-studio/office-card.webp",
    imageAlt: "HR 搭档组织地图，六个部门的同事与招聘工位",
    imageFit: "map-cover",
    imageBg: "bg-[#f7f8f7]",
    cardHref: "/projects/hr-studio",
    primaryTag: "AI 人事工作台",
    primaryTagClass: "border-[#75ba9c]/45 bg-[#75ba9c]/[0.08] text-[#a1dfc2]",
    hoverBorderClass: "hover:border-[#75ba9c]/45",
    tags: ["组织地图", "招聘与面试", "档案问答"],
    summary:
      "在办公室地图点选工位直达员工档案与薪酬台账，结合岗位专属会话辅助简历核验与面试追问。",
    actions: [
      { label: "查看产品演示", href: "/projects/hr-studio", variant: "primary", icon: "arrow" },
    ],
  },
  {
    index: "04",
    id: "project-framepop",
    category: "workbench",
    title: "Framepop · 灵感设计 AI 工作台",
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
      "在同一张节点画布上串联创意简报、分镜脚本与多种视频生成模型，一站产出画面、短片与配音。",
    actions: [
      { label: "查看产品演示", href: "/projects/framepop", variant: "primary", icon: "arrow" },
    ],
  },
  {
    index: "05",
    id: "project-quicknote",
    category: "tool",
    title: "QuickNote · AI 便签",
    image: "/projects/quicknote/recognition-scenes.webp",
    imageAlt: "QuickNote 图片识别窗口展示框选的新用户转化漏斗，文字识别浮窗翻译报告中鼠标选中的英文句子",
    imageFit: "poster",
    imageBg: "bg-[#17130e]",
    cardHref: "/projects/quicknote",
    primaryTag: "AI 便签",
    primaryTagClass: "border-[#efc768]/45 bg-[#efc768]/[0.08] text-[#f5d782]",
    hoverBorderClass: "hover:border-[#efc768]/45",
    tags: ["macOS", "Codex / MCP"],
    summary:
      "选中文本即翻译提问，框选图表即识图分析；支持窗口置顶、本机全文检索与 Codex 授权读写。",
    actions: [
      { label: "查看产品演示", href: "/projects/quicknote", variant: "primary", icon: "arrow" },
      { label: "GitHub", href: "https://github.com/hxy940219220-collab/QuickNote-IOS", external: true, variant: "secondary", icon: "github" },
    ],
  },
  {
    index: "06",
    id: "project-eureka",
    category: "tool",
    title: "尤里卡 · IP 内容创作",
    image: "/eureka-project-card.webp",
    imageAlt: "尤里卡 IP 内容创作 AI 工作台",
    imageFit: "poster",
    cardHref: "/projects/eureka",
    primaryTag: "AI 内容创作",
    primaryTagClass: "border-neon-gold/45 bg-neon-gold/[0.08] text-neon-gold",
    hoverBorderClass: "hover:border-neon-gold/40",
    tags: ["Agent Workflow", "Electron"],
    summary:
      "从联网热点检索与来源核验出发，一键生成结构化视频脚本、逐字口播稿与多平台发布包。",
    actions: [
      { label: "查看产品演示", href: "/projects/eureka", variant: "primary", icon: "arrow" },
    ],
  },
  {
    index: "07",
    id: "project-call-home",
    category: "hardware",
    title: "Call Home · 给父母的一通电话",
    image: "/call-home-project-card.webp",
    imageAlt: "Call Home 给父母的一通电话互动装置",
    imageFit: "poster",
    lightboxIndex: 0,
    primaryTag: "嵌入式开发",
    primaryTagClass: "border-neon-pink/45 bg-neon-pink/[0.08] text-[#e68aff]",
    hoverBorderClass: "hover:border-neon-pink/40",
    tags: ["Raspberry Pi 5", "STM32"],
    summary:
      "树莓派 5 联动超声波测距、STM32 与听筒微动开关，设计从靠近唤醒到拿起联系的三态交互体验。",
    hardwareSpec: {
      status: "实物原型 · 三态联动",
      spec: "Raspberry Pi 5 · STM32",
      dotClass: "bg-neon-pink shadow-[0_0_8px_#d84cff]",
    },
  },
  {
    index: "08",
    id: "project-claude-signal",
    category: "hardware",
    title: "Claude Signal · 实体审批台",
    image: "/claude-signal-project-card.webp",
    imageAlt: "Claude Signal 多会话 Agent 实体审批台",
    imageFit: "poster",
    lightboxIndex: 1,
    primaryTag: "嵌入式开发",
    primaryTagClass: "border-[#4ade80]/45 bg-[#4ade80]/[0.08] text-[#6ee7a0]",
    hoverBorderClass: "hover:border-[#4ade80]/40",
    tags: ["ESP32-S3", "Agent 审批"],
    summary:
      "ESP32-S3 汇总多路 Claude Code 会话状态，通过红黄绿灯、OLED 与街机键实现脱离屏幕的实体审批。",
    hardwareSpec: {
      status: "实物原型 · 多会话监控",
      spec: "ESP32-S3 · OLED · 实体按键",
      dotClass: "bg-[#4ade80] shadow-[0_0_8px_#4ade80]",
    },
  },
];

const HARDWARE_LIGHTBOX_ITEMS: LightboxItem[] = [
  {
    src: "/call-home-project-card.webp",
    alt: "Call Home 给父母的一通电话互动装置",
    title: "07 · Call Home · 给父母的一通电话",
    caption:
      "以 Raspberry Pi 5 为主控，联动超声波测距、STM32 与听筒微动开关，完成靠近唤醒、拿起倾听与扫码联系的三态硬件交互闭环。",
  },
  {
    src: "/claude-signal-project-card.webp",
    alt: "Claude Signal 多会话 Agent 实体审批台",
    title: "08 · Claude Signal · 实体审批台",
    caption:
      "基于 ESP32-S3 汇总后台多路 Claude Code 会话运行状态，通过红黄绿信号灯、OLED 屏幕与实体街机按键实现脱离屏幕的低摩擦人工审批。",
  },
];

function MediaFrame({ project }: { project: ProjectItem }) {
  const mapCover = project.imageFit === "map-cover";
  const poster = project.imageFit === "poster";
  const frameRatio = poster ? "aspect-[1672/941]" : "aspect-[16/10]";
  const fitClass = poster || project.imageFit === "contain" ? "object-contain" : "object-cover";
  const useOverlay = !poster && !mapCover;
  const inner = (
    <div
      className={`relative ${frameRatio} w-full overflow-hidden rounded-[13px] border border-white/[0.09] ${project.imageBg ?? "bg-[#080812]"}`}
    >
      <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        quality={90}
        unoptimized={mapCover}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className={`${fitClass} ${useOverlay ? "transition-transform duration-300 group-hover/card:scale-[1.012]" : ""}`}
      />
      {useOverlay && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[13px] ring-1 ring-inset ring-black/25 bg-[linear-gradient(to_top,rgba(11,11,20,0.42)_0%,transparent_28%)]"
        />
      )}
    </div>
  );

  if (project.cardHref) {
    return (
      <div className="p-2.5 pb-0 shrink-0">
        <Link
          href={project.cardHref}
          aria-label={`查看 ${project.title}`}
          className="cursor-view block rounded-[13px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-cyan"
        >
          {inner}
        </Link>
      </div>
    );
  }

  if (project.lightboxIndex !== undefined) {
    return (
      <div className="p-2.5 pb-0 shrink-0">
        <LightboxTrigger
          index={project.lightboxIndex}
          label={`放大查看 ${project.title} 原型图`}
          className="rounded-[13px] overflow-hidden"
        >
          {inner}
        </LightboxTrigger>
      </div>
    );
  }

  return <div className="p-2.5 pb-0 shrink-0">{inner}</div>;
}

export function Work() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");

  useEffect(() => {
    const handleReveal = () => setActiveCategory("all");
    window.addEventListener("hxy:reveal-project", handleReveal);
    return () => window.removeEventListener("hxy:reveal-project", handleReveal);
  }, []);

  const visibleProjects =
    activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeCategory);

  const countFor = (cat: ProjectCategory) =>
    cat === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.category === cat).length;

  return (
    <LightboxProvider items={HARDWARE_LIGHTBOX_ITEMS}>
      <section
        id="work"
        className="relative z-10 w-full px-6 md:px-12 py-12 md:py-20"
      >
        {/* Concise Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-10 mb-6 md:mb-8">
          <BlurText
            text="代表项目"
            className="section-display-heading font-display text-[clamp(1.9rem,4.8vw,3.35rem)] leading-[1.15] text-[#f5f7ff]"
            delay={45}
            animateBy="words"
            direction="top"
          />
          <ScrollReveal delay={0.08}>
            <p className="text-[13.5px] md:text-[14.5px] text-text-tertiary leading-[1.65] md:pb-1">
              覆盖企业工作台、个人效率工具与硬件交互原型的实证作品。
            </p>
          </ScrollReveal>
        </div>

        {/* Compact Single-Row Category Filter Tabs */}
        <ScrollReveal delay={0.06}>
          <div
            role="tablist"
            aria-label="按项目类型筛选"
            className="mb-7 md:mb-9 flex flex-wrap items-center gap-1.5 sm:gap-2"
          >
            {CATEGORIES.map((cat) => {
              const selected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`cursor-target inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-body text-[12px] tracking-[0.03em] transition-colors duration-200 cursor-pointer ${
                    selected
                      ? "border-neon-cyan/55 bg-neon-cyan/[0.12] text-[#f5f7ff]"
                      : "border-white/[0.11] bg-white/[0.02] text-text-tertiary hover:border-white/[0.22] hover:text-text-secondary"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`font-body text-[11px] tabular-nums ${
                      selected ? "text-neon-cyan" : "text-text-muted"
                    }`}
                  >
                    {countFor(cat.id)}
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Project cards — pure CSS GPU hover transform, zero layout thrashing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
          {visibleProjects.map((project) => (
            <article
              key={project.id}
              id={project.id}
              className={`${project.id === "project-quicknote" ? quickNote.card : ""} group/card relative flex h-full scroll-mt-24 flex-col overflow-hidden rounded-[20px] border border-white/[0.10] bg-[#0b0b14] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_40px_rgba(0,0,0,0.4)] transition-[transform,border-color,box-shadow] duration-250 ease-out hover:-translate-y-1 ${project.hoverBorderClass} hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_18px_52px_rgba(0,0,0,0.5)]`}
            >
              <MediaFrame project={project} />

              <div className="flex flex-1 flex-col p-5 md:p-6">
                {/* Monograph Index + Tag Chips */}
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="font-display text-[12px] tabular-nums tracking-[0.12em] text-text-muted">
                    {project.index}
                  </span>
                  <span className="h-3 w-px bg-white/[0.12] mr-0.5" aria-hidden="true" />
                  <span
                    className={`rounded-full border px-2.5 py-0.5 font-body text-[11px] font-medium tracking-[0.04em] ${project.primaryTagClass}`}
                  >
                    {project.primaryTag}
                  </span>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.10] bg-white/[0.025] px-2.5 py-0.5 font-body text-[11px] tracking-[0.03em] text-text-tertiary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="card-display-title mb-2 font-display text-[1.35rem] md:text-[1.5rem] leading-snug text-[#f5f7ff]">
                  {project.title}
                </h3>

                {/* Single Concise Core Summary */}
                <p className="mb-4 max-w-prose text-[13.5px] md:text-[14px] leading-[1.68] text-text-secondary/90">
                  {project.summary}
                </p>

                {/* Footer Actions or Hardware Telemetry Readout */}
                <div className="mt-auto pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 min-h-[48px]">
                  {project.actions ? (
                    <div className="flex flex-wrap items-center gap-2.5">
                      {project.actions.map((action) => {
                        const cls =
                          action.variant === "primary"
                            ? "cursor-target inline-flex min-h-9.5 items-center gap-1.5 rounded-full bg-neon-cyan px-4.5 py-2 font-body text-[12px] font-semibold tracking-[0.04em] text-[#050509] no-underline transition-colors duration-200 hover:bg-[#5ce1ff] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-neon-cyan"
                            : "cursor-target inline-flex min-h-9.5 items-center gap-1.5 rounded-full border border-white/[0.14] bg-white/[0.04] px-4 py-2 font-body text-[12px] font-medium tracking-[0.03em] text-[#f5f7ff] no-underline transition-colors duration-200 hover:border-neon-cyan/50 hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-neon-cyan";

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
                      <span className="inline-flex items-center gap-1.5 font-body text-[11.5px] tracking-[0.04em] text-text-tertiary">
                        <Cpu size={14} weight="light" className="text-text-muted" />
                        {project.hardwareSpec.spec}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </LightboxProvider>
  );
}
