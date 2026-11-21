"use client";

import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";
import Link from "next/link";
import BlurText from "../reactbits/TextAnimations/BlurText/BlurText";
import { GooglePlayLogo, GithubLogo } from "@phosphor-icons/react";

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
    rotateX.set((offsetY / (rect.height / 2)) * -5);
    rotateY.set((offsetX / (rect.width / 2)) * 5);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div ref={ref} className={`[perspective:800px] ${className}`} onMouseMove={handleMouse} onMouseLeave={handleLeave}>
      <motion.div style={{ rotateX, rotateY }} className="[transform-style:preserve-3d] h-full">
        {children}
      </motion.div>
    </div>
  );
}

export function Work() {
  return (
    <section
      id="work"
      className="relative z-10 w-full px-6 md:px-12 py-16 md:py-24"
    >
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 mb-12">
        <BlurText
          text="代表项目"
          className="font-display italic text-[clamp(40px,6vw,64px)] leading-[1.05] text-white"
          delay={50}
          animateBy="words"
          direction="top"
        />
        <ScrollReveal delay={0.2}>
          <p className="text-[15px] text-text-tertiary leading-relaxed self-end pb-2">
            从跨境电商 Agent 工作台、macOS AI 便签到内容创作和实体审批台，这些项目从具体任务出发，把模型能力、操作流程和人工判断落到可运行的产品里。
          </p>
        </ScrollReveal>
      </div>

      {/* Project cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {/* Tango */}
        <ScrollReveal delay={0.02}>
          <TiltWrap className="h-full">
            <motion.article
              id="project-tango"
              whileHover={{ y: -6 }}
              className="relative flex h-full scroll-mt-24 flex-col overflow-hidden rounded-[20px] border border-white/[0.10] bg-[#0c0c1a] transition-colors hover:border-[#ffb17d]/45"
            >
              <Link
                href="/projects/tango"
                aria-label="查看 Tango 项目"
                className="cursor-target block aspect-[16/10] shrink-0 overflow-hidden border-b border-white/[0.12] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-neon-cyan"
              >
                <Image
                  src="/projects/tango/home.webp"
                  alt="Tango 工作台首页，显示跨境运营任务和常用专家"
                  width={1800}
                  height={1125}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </Link>
              <div className="flex flex-1 flex-col p-6 md:p-7">
                <div className="mb-3.5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-[#ffb17d]/50 px-3 py-1.5 font-body text-[11px] font-medium text-[#ffb17d]">跨境电商 Agent</span>
                  <span className="rounded-full border border-white/[0.12] px-3 py-1.5 font-body text-[11px] text-text-tertiary">多专家协作</span>
                  <span className="rounded-full border border-white/[0.12] px-3 py-1.5 font-body text-[11px] text-text-tertiary">本机模型 / API</span>
                </div>
                <h3 className="mb-2 font-display text-[26px] italic text-[#f5f7ff]">
                  Tango · 跨境电商工作台
                </h3>
                <p className="mb-5 max-w-prose text-[14px] leading-relaxed text-text-tertiary">
                  从商品运营、选品与竞品、短视频制作或达人合作开始。把任务交给相关专家，在同一次对话里看进度、查阅各阶段结果。
                </p>
                <div className="mt-auto flex flex-wrap gap-3">
                  <Link
                    href="/projects/tango"
                    className="cursor-target inline-flex min-h-11 items-center rounded-full bg-neon-cyan px-5 py-2.5 font-body text-[12px] font-semibold text-[#050509] no-underline transition-colors hover:bg-[#78e4ff] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-neon-cyan"
                  >
                    查看功能截图 ↗
                  </Link>
                  <a
                    href="https://github.com/hxy940219220-collab/tango-workbench"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-target inline-flex min-h-11 items-center gap-2 rounded-full border border-white/[0.18] px-5 py-2.5 font-body text-[12px] font-medium text-text-secondary no-underline transition-colors hover:border-white/45 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-neon-cyan"
                  >
                    <GithubLogo size={14} weight="fill" aria-hidden="true" />
                    GitHub 私有仓库
                  </a>
                </div>
              </div>
            </motion.article>
          </TiltWrap>
        </ScrollReveal>

        {/* QuickNote */}
        <ScrollReveal delay={0.02}>
          <TiltWrap className="h-full">
            <motion.div
              id="project-quicknote"
              whileHover={{ y: -6 }}
              className="scroll-mt-24 relative rounded-[20px] overflow-hidden bg-[#0c0c1a] border border-white/[0.10] shadow-[0_4px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.03)] transition-all duration-[550ms] hover:border-neon-cyan/30 hover:shadow-[0_0_60px_rgba(0,200,255,0.10),0_32px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] flex flex-col h-full"
            >
              <div className="aspect-[16/9] relative overflow-hidden bg-[#0c0c1a] shrink-0 border-b border-white/[0.12]">
                <Image
                  src="/projects/quicknote/current-overview.webp"
                  alt="QuickNote 的文件夹、便签清单和富文本编辑器"
                  width={1672}
                  height={941}
                  loading="lazy"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-7 flex flex-col flex-1">
                <div className="flex gap-2 flex-wrap mb-3.5">
                  <span className="font-body text-[10.5px] font-medium tracking-[0.08em] uppercase px-3 py-1.5 rounded-full border border-neon-cyan text-neon-cyan">AI 便签</span>
                  <span className="font-body text-[10.5px] font-medium tracking-[0.08em] uppercase px-3 py-1.5 rounded-full border border-white/[0.12] text-text-tertiary">macOS</span>
                  <span className="font-body text-[10.5px] font-medium tracking-[0.08em] uppercase px-3 py-1.5 rounded-full border border-white/[0.12] text-text-tertiary">Codex / MCP</span>
                </div>
                <h3 className="font-display italic text-[26px] text-white mb-1.5">
                  QuickNote · AI 便签
                </h3>
                <p className="text-[13px] text-text-tertiary leading-relaxed mb-4">
                  选中文字或截一张图，让 AI 翻译、解释、分析或回答问题。把有用的结果直接存入便签，读到新资料时接着补充、整理。
                </p>
                <p className="text-[11px] tracking-[0.12em] uppercase text-text-muted mb-1.5">ChatGPT 账号 / 模型 API</p>
                <p className="text-[12px] text-text-tertiary/60 leading-relaxed mb-4">
                  可以用 ChatGPT 账号登录，也可以配置模型 API。本机 Codex 可通过 MCP 读取和整理获授权的便签，确认后写回。
                </p>
                <div className="flex flex-wrap gap-3 mt-auto">
                  <a
                    href="/projects/quicknote"
                    className="cursor-target inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neon-cyan text-[#050509] font-body text-[12px] font-semibold tracking-[0.04em] no-underline transition-all duration-400 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(0,200,255,0.2)]"
                  >
                    查看演示 ↗
                  </a>
                  <a
                    href="https://github.com/hxy940219220-collab/QuickNote-IOS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-target inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan font-body text-[12px] font-medium tracking-[0.04em] no-underline transition-all duration-400 hover:bg-neon-cyan/20"
                  >
                    <GithubLogo size={14} weight="fill" />
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </TiltWrap>
        </ScrollReveal>

        {/* Eureka */}
        <ScrollReveal delay={0.04}>
          <TiltWrap className="h-full">
            <motion.div
              id="project-eureka"
              whileHover={{ y: -6 }}
              className="scroll-mt-24 relative rounded-[20px] overflow-hidden bg-[#0c0c1a] border border-white/[0.10] shadow-[0_4px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.03)] transition-all duration-[550ms] hover:border-[#F5B400]/35 hover:shadow-[0_0_60px_rgba(245,180,0,0.11),0_32px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] flex flex-col h-full"
            >
              <div className="aspect-[16/9] relative overflow-hidden bg-[#0c0c1a] shrink-0 border-b border-white/[0.12]">
                <img
                  src="/eureka-project-card.webp"
                  alt="尤里卡 IP 内容创作 AI 工作台"
                  width={1672}
                  height={941}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-7 flex flex-col flex-1">
                <div className="flex gap-2 flex-wrap mb-3.5">
                  <span className="font-body text-[10.5px] font-medium tracking-[0.08em] uppercase px-3 py-1.5 rounded-full border border-[#F5B400] text-[#F5B400]">AI 内容创作</span>
                  <span className="font-body text-[10.5px] font-medium tracking-[0.08em] uppercase px-3 py-1.5 rounded-full border border-white/[0.12] text-text-tertiary">Agent Workflow</span>
                  <span className="font-body text-[10.5px] font-medium tracking-[0.08em] uppercase px-3 py-1.5 rounded-full border border-white/[0.12] text-text-tertiary">Electron</span>
                </div>
                <h3 className="font-display italic text-[26px] text-white mb-1.5">
                  尤里卡 · IP 内容创作
                </h3>
                <p className="text-[13px] text-text-tertiary leading-relaxed mb-4">
                  从联网热点与个人灵感出发，生成可直接执行的视频脚本和逐字口播稿。
                </p>
                <p className="text-[11px] tracking-[0.12em] uppercase text-text-muted mb-1.5">不做空白聊天框，而把“今天讲什么”变成可持续的创作流程</p>
                <p className="text-[12px] text-text-tertiary/60 leading-relaxed mb-4">
                  将选题搜索、来源核验、真人口播或双角色脚本、敏感词审查、发布包和数据复盘串成一个本地 AI 工作台。
                </p>
                <div className="flex flex-wrap gap-3 mt-auto">
                  <a
                    href="/projects/eureka"
                    className="cursor-target inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F5B400] text-[#050509] font-body text-[12px] font-semibold tracking-[0.04em] no-underline transition-all duration-400 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(245,180,0,0.2)]"
                  >
                    查看演示 ↗
                  </a>
                  <a
                    href="https://github.com/hxy940219220-collab/huangxiyuan-website"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-target inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F5B400]/10 border border-[#F5B400]/30 text-[#F5B400] font-body text-[12px] font-medium tracking-[0.04em] no-underline transition-all duration-400 hover:bg-[#F5B400]/20"
                  >
                    <GithubLogo size={14} weight="fill" />
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </TiltWrap>
        </ScrollReveal>

        {/* Report Note Agent */}
        <ScrollReveal delay={0.16}>
          <TiltWrap className="h-full">
            <motion.div
              id="project-report-note"
              whileHover={{ y: -6 }}
              className="scroll-mt-24 relative rounded-[20px] overflow-hidden bg-[#0c0c1a] border border-white/[0.10] shadow-[0_4px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.03)] transition-all duration-[550ms] hover:border-neon-orange/30 hover:shadow-[0_0_60px_rgba(255,106,26,0.10),0_32px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] flex flex-col h-full"
            >
              <div className="aspect-[16/9] relative overflow-hidden bg-[#0c0c1a] shrink-0 border-b border-white/[0.12]">
                <img
                  src="/report-note-agent-project-card.webp"
                  alt="研报笔记 Agent 桌面应用"
                  width={1672}
                  height={941}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-7 flex flex-col flex-1">
                <div className="flex gap-2 flex-wrap mb-3.5">
                  <span className="font-body text-[10.5px] font-medium tracking-[0.08em] uppercase px-3 py-1.5 rounded-full border border-neon-orange text-neon-orange">文档 Agent</span>
                  <span className="font-body text-[10.5px] font-medium tracking-[0.08em] uppercase px-3 py-1.5 rounded-full border border-white/[0.12] text-text-tertiary">Human-in-the-loop</span>
                  <span className="font-body text-[10.5px] font-medium tracking-[0.08em] uppercase px-3 py-1.5 rounded-full border border-white/[0.12] text-text-tertiary">Electron</span>
                </div>
                <h3 className="font-display italic text-[26px] text-white mb-1.5">
                  研报笔记 Agent
                </h3>
                <p className="text-[13px] text-text-tertiary leading-relaxed mb-4">
                  把 PDF / DOCX 行业报告拆成可审核、可编辑、可导出的文案、封面与报告图片。
                </p>
                <p className="text-[11px] tracking-[0.12em] uppercase text-text-muted mb-1.5">不止生成摘要，而把内容生产串成可控工作流</p>
                <p className="text-[12px] text-text-tertiary/60 leading-relaxed mb-4">
                  本机解析文档，生成可编辑草稿与封面，选择报告页面，经人工审核后导出或同步到发布编辑页。
                </p>
                <div className="flex flex-wrap gap-3 mt-auto">
                  <a
                    href="/projects/report-note-agent"
                    className="cursor-target inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neon-orange text-[#050509] font-body text-[12px] font-semibold tracking-[0.04em] no-underline transition-all duration-400 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(255,106,26,0.2)]"
                  >
                    查看演示 ↗
                  </a>
                  <a
                    href="https://github.com/hxy940219220-collab/xhs-report-agent"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-target inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neon-orange/10 border border-neon-orange/30 text-neon-orange font-body text-[12px] font-medium tracking-[0.04em] no-underline transition-all duration-400 hover:bg-neon-orange/20"
                  >
                    <GithubLogo size={14} weight="fill" />
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </TiltWrap>
        </ScrollReveal>

        {/* Call Home */}
        <ScrollReveal delay={0.24}>
          <TiltWrap className="h-full">
            <motion.div
              id="project-call-home"
              whileHover={{ y: -6 }}
              className="scroll-mt-24 relative rounded-[20px] overflow-hidden bg-[#0c0c1a] border border-white/[0.10] shadow-[0_4px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.03)] transition-all duration-[550ms] hover:border-neon-pink/30 hover:shadow-[0_0_60px_rgba(216,76,255,0.10),0_32px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] flex flex-col h-full"
            >
              <div className="aspect-[16/9] relative overflow-hidden bg-[#0c0c1a] shrink-0 border-b border-white/[0.12]">
                <img
                  src="/call-home-project-card.webp"
                  alt="Call Home 给父母的一通电话互动装置"
                  width={1672}
                  height={941}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-7 flex flex-col flex-1">
                <div className="flex gap-2 flex-wrap mb-3.5">
                  <span className="font-body text-[10.5px] font-medium tracking-[0.08em] uppercase px-3 py-1.5 rounded-full border border-neon-pink text-neon-pink">嵌入式开发</span>
                  <span className="font-body text-[10.5px] font-medium tracking-[0.08em] uppercase px-3 py-1.5 rounded-full border border-white/[0.12] text-text-tertiary">Raspberry Pi 5</span>
                  <span className="font-body text-[10.5px] font-medium tracking-[0.08em] uppercase px-3 py-1.5 rounded-full border border-white/[0.12] text-text-tertiary">STM32</span>
                </div>
                <h3 className="font-display italic text-[26px] text-white mb-1.5">
                  Call Home · 给父母的一通电话
                </h3>
                <p className="text-[13px] text-text-tertiary leading-relaxed mb-4">
                  用距离感知与电话听筒，把“想起父母”变成一次真实的联系。
                </p>
                <p className="text-[11px] tracking-[0.12em] uppercase text-text-muted mb-1.5">不是播放一段公益动画，而是设计从靠近到行动的体验路径</p>
                <p className="text-[12px] text-text-tertiary/60 leading-relaxed mb-4">
                  以树莓派 5 为主控，联动超声波测距、STM32 与听筒微动开关，完成三态画面切换，并通过二维码唤起预填短信。
                </p>
                <div className="flex flex-wrap gap-3 mt-auto">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neon-pink/10 border border-neon-pink/30 text-neon-pink font-body text-[12px] font-medium tracking-[0.04em]">
                    实物原型 · 三态联动
                  </span>
                </div>
              </div>
            </motion.div>
          </TiltWrap>
        </ScrollReveal>

        {/* Claude Signal */}
        <ScrollReveal delay={0.32}>
          <TiltWrap className="h-full">
            <motion.div
              id="project-claude-signal"
              whileHover={{ y: -6 }}
              className="scroll-mt-24 relative rounded-[20px] overflow-hidden bg-[#0c0c1a] border border-white/[0.10] shadow-[0_4px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.03)] transition-all duration-[550ms] hover:border-[#4ade80]/35 hover:shadow-[0_0_60px_rgba(74,222,128,0.10),0_32px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] flex flex-col h-full"
            >
              <div className="aspect-[16/9] relative overflow-hidden bg-[#0c0c1a] shrink-0 border-b border-white/[0.12]">
                <img
                  src="/claude-signal-project-card.webp"
                  alt="Claude Signal 多会话 Agent 实体审批台"
                  width={1672}
                  height={941}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-7 flex flex-col flex-1">
                <div className="flex gap-2 flex-wrap mb-3.5">
                  <span className="font-body text-[10.5px] font-medium tracking-[0.08em] uppercase px-3 py-1.5 rounded-full border border-[#4ade80] text-[#4ade80]">嵌入式开发</span>
                  <span className="font-body text-[10.5px] font-medium tracking-[0.08em] uppercase px-3 py-1.5 rounded-full border border-white/[0.12] text-text-tertiary">ESP32-S3</span>
                  <span className="font-body text-[10.5px] font-medium tracking-[0.08em] uppercase px-3 py-1.5 rounded-full border border-white/[0.12] text-text-tertiary">Agent 审批</span>
                </div>
                <h3 className="font-display italic text-[26px] text-white mb-1.5">
                  Claude Signal · 实体审批台
                </h3>
                <p className="text-[13px] text-text-tertiary leading-relaxed mb-4">
                  把多个 Claude Code 会话的运行状态，映射成看得见、按得下的硬件信号。
                </p>
                <p className="text-[11px] tracking-[0.12em] uppercase text-text-muted mb-1.5">不是再开一个监控窗口，而是让 Agent 状态离开屏幕</p>
                <p className="text-[12px] text-text-tertiary/60 leading-relaxed mb-4">
                  ESP32-S3 汇总后台会话，红黄绿灯与 OLED 提示执行、报错、待审批和完成；需要授权时，街机键可直接完成审批。
                </p>
                <div className="flex flex-wrap gap-3 mt-auto">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80] font-body text-[12px] font-medium tracking-[0.04em]">
                    实物原型 · 多会话监控
                  </span>
                </div>
              </div>
            </motion.div>
          </TiltWrap>
        </ScrollReveal>

        {/* IdeaFlash */}
        <ScrollReveal delay={0.4}>
          <TiltWrap className="h-full">
            <motion.div
              id="project-ideaflash"
              whileHover={{ y: -6 }}
              className="scroll-mt-24 relative rounded-[20px] overflow-hidden bg-[#0c0c1a] border border-white/[0.10] shadow-[0_4px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.03)] transition-all duration-[550ms] hover:border-neon-cyan/30 hover:shadow-[0_0_60px_rgba(0,200,255,0.10),0_32px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] flex flex-col h-full"
            >
              <div className="aspect-[16/9] relative overflow-hidden bg-[#0c0c1a] shrink-0 border-b border-white/[0.12]">
                <img
                  src="/ideaflash.webp"
                  alt="IdeaFlash 灵感胶囊"
                  width={1672}
                  height={941}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-7 flex flex-col flex-1">
                <div className="flex gap-2 flex-wrap mb-3.5">
                  <span className="font-body text-[10.5px] font-medium tracking-[0.08em] uppercase px-3 py-1.5 rounded-full border border-neon-cyan text-neon-cyan">语音 AI</span>
                  <span className="font-body text-[10.5px] font-medium tracking-[0.08em] uppercase px-3 py-1.5 rounded-full border border-white/[0.12] text-text-tertiary">灵感捕捉</span>
                  <span className="font-body text-[10.5px] font-medium tracking-[0.08em] uppercase px-3 py-1.5 rounded-full border border-white/[0.12] text-text-tertiary">Android</span>
                </div>
                <h3 className="font-display italic text-[26px] text-white mb-1.5">
                  IdeaFlash · 灵感胶囊
                </h3>
                <p className="text-[13px] text-text-tertiary leading-relaxed mb-4">
                  用最快路径捕捉转瞬即逝灵感，交给 AI 自动转写、提炼、生成卡片。
                </p>
                <p className="text-[11px] tracking-[0.12em] uppercase text-text-muted mb-1.5">不做复杂笔记，而做灵感捕捉器</p>
                <p className="text-[12px] text-text-tertiary/60 leading-relaxed mb-4">
                  核心不是让用户写得更完整，而是在想法最脆弱的一瞬间把它接住，整理与结构化交给 AI 在后面完成。
                </p>
                <div className="mt-auto">
                  <a
                    href="https://raw.githubusercontent.com/think2do/FlashMind/main/APK/%E7%81%B5%E6%84%9F%E8%83%B6%E5%9B%8A1.03.apk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-target inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neon-orange/10 border border-neon-orange/30 text-neon-orange font-body text-[12px] font-medium tracking-[0.04em] no-underline transition-all duration-400 hover:bg-neon-orange/20 hover:shadow-[0_0_24px_rgba(255,106,26,0.2)] self-start"
                  >
                    <GooglePlayLogo size={14} weight="fill" />
                    点击即刻下载
                  </a>
                  <p className="mt-2.5 text-[10.5px] tracking-[0.06em] text-text-muted">
                    v1.03 · Android APK · 约 6.7 MB
                  </p>
                </div>
              </div>
            </motion.div>
          </TiltWrap>
        </ScrollReveal>

        {/* FocusMeow */}
        <ScrollReveal delay={0.48}>
          <TiltWrap className="h-full">
            <motion.div
              id="project-focusmeow"
              whileHover={{ y: -6 }}
              className="scroll-mt-24 relative rounded-[20px] overflow-hidden bg-[#0c0c1a] border border-white/[0.10] shadow-[0_4px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.03)] transition-all duration-[550ms] hover:border-neon-pink/30 hover:shadow-[0_0_60px_rgba(216,76,255,0.10),0_32px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] flex flex-col h-full"
            >
              <div className="aspect-[16/9] relative overflow-hidden bg-[#0c0c1a] shrink-0 border-b border-white/[0.12]">
                <img
                  src="/focusmeow.webp"
                  alt="FocusMeow 专注喵"
                  width={1672}
                  height={941}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-7 flex flex-col flex-1">
                <div className="flex gap-2 flex-wrap mb-3.5">
                  <span className="font-body text-[10.5px] font-medium tracking-[0.08em] uppercase px-3 py-1.5 rounded-full border border-neon-pink text-neon-pink">AI 陪伴</span>
                  <span className="font-body text-[10.5px] font-medium tracking-[0.08em] uppercase px-3 py-1.5 rounded-full border border-white/[0.12] text-text-tertiary">Habit Design</span>
                  <span className="font-body text-[10.5px] font-medium tracking-[0.08em] uppercase px-3 py-1.5 rounded-full border border-white/[0.12] text-text-tertiary">React Native</span>
                </div>
                <h3 className="font-display italic text-[26px] text-white mb-1.5">
                  FocusMeow · 专注喵
                </h3>
                <p className="text-[13px] text-text-tertiary leading-relaxed mb-4">
                  用猫咪陪伴、成长奖励与 AI 反馈，驱动长期专注习惯形成的情感化 app。
                </p>
                <p className="text-[11px] tracking-[0.12em] uppercase text-text-muted mb-1.5">不把它做成「又一个番茄钟」</p>
                <p className="text-[12px] text-text-tertiary/60 leading-relaxed mb-4">
                  四层叠加的产品骨架——专注工具层、游戏养成层、情感陪伴层、智能解释层，让效率与情绪同时成立。
                </p>
                <div className="flex gap-3 flex-wrap mt-auto">
                  <a
                    href="https://github.com/think2do/FocusMeow"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-target inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neon-pink/10 border border-neon-pink/30 text-neon-pink font-body text-[12px] font-medium tracking-[0.04em] no-underline transition-all duration-400 hover:bg-neon-pink/20 hover:shadow-[0_0_24px_rgba(216,76,255,0.2)]"
                  >
                    <GithubLogo size={14} weight="fill" />
                    GitHub
                  </a>
                  <a
                    href="https://www.producthunt.com/products/focus-meow/focus-meow/launch-day?utm_source=my-products"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-target inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.05] border border-white/[0.15] text-white font-body text-[12px] font-medium tracking-[0.04em] no-underline transition-all duration-400 hover:border-neon-cyan hover:bg-white/[0.1]"
                  >
                    Product Hunt
                  </a>
                </div>
              </div>
            </motion.div>
          </TiltWrap>
        </ScrollReveal>
      </div>
    </section>
  );
}
