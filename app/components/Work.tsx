"use client";

import { ScrollReveal } from "./ScrollReveal";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";
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
            项目从 macOS 划词工具、PDF 内容 Agent，延伸到树莓派距离感知装置与 ESP32 Agent 实体审批台。共同方法是先找到真实任务，再判断模型边界，把交互、工作流与硬件做成可运行的闭环。
          </p>
        </ScrollReveal>
      </div>

      {/* Project cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {/* Flick */}
        <ScrollReveal delay={0.08}>
          <TiltWrap className="h-full">
            <motion.div
              id="project-flick"
              whileHover={{ y: -6 }}
              className="scroll-mt-24 relative rounded-[20px] overflow-hidden bg-[#0c0c1a] border border-white/[0.10] shadow-[0_4px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.03)] transition-all duration-[550ms] hover:border-neon-cyan/30 hover:shadow-[0_0_60px_rgba(0,200,255,0.10),0_32px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] flex flex-col h-full"
            >
              <div className="aspect-[16/9] relative overflow-hidden bg-[#0c0c1a] shrink-0 border-b border-white/[0.12]">
                <img
                  src="/flick-project-card.webp"
                  alt="Flick macOS 划词 AI 工具"
                  width={1672}
                  height={941}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-7 flex flex-col flex-1">
                <div className="flex gap-2 flex-wrap mb-3.5">
                  <span className="font-body text-[10.5px] font-medium tracking-[0.08em] uppercase px-3 py-1.5 rounded-full border border-neon-cyan text-neon-cyan">AI 原生交互</span>
                  <span className="font-body text-[10.5px] font-medium tracking-[0.08em] uppercase px-3 py-1.5 rounded-full border border-white/[0.12] text-text-tertiary">macOS</span>
                  <span className="font-body text-[10.5px] font-medium tracking-[0.08em] uppercase px-3 py-1.5 rounded-full border border-white/[0.12] text-text-tertiary">SwiftUI</span>
                </div>
                <h3 className="font-display italic text-[26px] text-white mb-1.5">
                  Flick · 划词 AI
                </h3>
                <p className="text-[13px] text-text-tertiary leading-relaxed mb-4">
                  在支持文本复制的 macOS 应用中选中文字，按 ⌘E 唤起解释、总结、翻译与润色。
                </p>
                <p className="text-[11px] tracking-[0.12em] uppercase text-text-muted mb-1.5">不做另一个聊天窗口，而把 AI 变成文本动作</p>
                <p className="text-[12px] text-text-tertiary/60 leading-relaxed mb-4">
                  全局快捷键唤起光标附近的极简浮层，数字键选择预设动作，结果原地流式返回，让阅读和学习不必离开当前应用。
                </p>
                <div className="flex flex-wrap gap-3 mt-auto">
                  <a
                    href="/projects/flick"
                    className="cursor-target inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neon-cyan text-[#050509] font-body text-[12px] font-semibold tracking-[0.04em] no-underline transition-all duration-400 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(0,200,255,0.2)]"
                  >
                    查看演示 ↗
                  </a>
                  <a
                    href="https://github.com/hxy940219220-collab/Flick"
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
