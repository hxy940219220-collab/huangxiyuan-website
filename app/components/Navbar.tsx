"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";
import { BackgroundMusic } from "./BackgroundMusic";

type NavSub = {
  label: string;
  href: string;
};

type NavItem = {
  label: string;
  href: string;
  sectionId: string;
  subs: NavSub[];
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "作品",
    href: "#work",
    sectionId: "work",
    subs: [
      { label: "Tango · 跨境电商 AI 工作台", href: "#project-tango" },
      { label: "PostPilot · AI 内容策划与多端发布工作台", href: "#project-postpilot" },
      { label: "HR 搭档 · AI 人事工作台", href: "#project-hr-studio" },
      { label: "Framepop · 灵感设计 AI 工作台", href: "#project-framepop" },
      { label: "QuickNote · AI 便签", href: "#project-quicknote" },
      { label: "尤里卡 · IP 内容创作", href: "#project-eureka" },
      { label: "Call Home · 互动装置", href: "#project-call-home" },
      { label: "Claude Signal · 实体审批台", href: "#project-claude-signal" },
    ],
  },
  {
    label: "思考",
    href: "#method",
    sectionId: "method",
    subs: [
      { label: "个人智能体与多 Agent 产品设计", href: "/research/agent-product" },
      { label: "AI 前沿时间线", href: "/ai-frontier-timeline.html" },
      { label: "Harness Engineering", href: "/harness-engineering.html" },
      { label: "Claude Code 源码设计逻辑", href: "https://learn-claude-code-visual.vercel.app/index.html" },
      { label: "Hermes × OpenClaw 历史对比", href: "/hermes-vs-openclaw.html" },
    ],
  },
  {
    label: "工具栈",
    href: "#capabilities",
    sectionId: "capabilities",
    subs: [
      { label: "GPT-6.2 Astra", href: "#tool-gpt" },
      { label: "Claude Fable 5.2 / Opus 5.5", href: "#tool-claude" },
      { label: "Grok Bot", href: "#tool-grok-bot" },
      { label: "Gemini 4 Carbon", href: "#tool-gemini" },
      { label: "DeepSeek Harness", href: "#tool-deepseek-harness" },
      { label: "Typeless", href: "#tool-typeless" },
    ],
  },
  {
    label: "关于",
    href: "#about",
    sectionId: "about",
    subs: [
      { label: "业务流程与个人智能体", href: "#about-product" },
      { label: "多 Agent 协作与混合路由", href: "#about-agent" },
      { label: "Harness 验证与原型实证", href: "#about-validation" },
    ],
  },
  {
    label: "联系",
    href: "#contact",
    sectionId: "contact",
    subs: [
      { label: "GitHub", href: "https://github.com/hxy940219220-collab" },
      { label: "huangxiyuan.net", href: "https://www.huangxiyuan.net" },
      { label: "hxy940219220@gmail.com", href: "mailto:hxy940219220@gmail.com" },
    ],
  },
];

const DROPDOWN_CLOSE_DELAY = 140;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const navRef = useRef<HTMLElement>(null);
  const closeTimerRef = useRef<number | null>(null);

  // 用布尔阈值替代逐帧动态修改 blur 半径和 borderBottomWidth，彻底消除滚动时 GPU 高斯模糊重绘卡顿
  const { scrollY, scrollYProgress } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > 24;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  const cancelCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openMenu = useCallback(
    (href: string) => {
      cancelCloseTimer();
      setOpenDropdown(href);
    },
    [cancelCloseTimer]
  );

  const scheduleCloseMenu = useCallback(
    (href: string) => {
      cancelCloseTimer();
      closeTimerRef.current = window.setTimeout(() => {
        setOpenDropdown((current) => (current === href ? null : current));
        closeTimerRef.current = null;
      }, DROPDOWN_CLOSE_DELAY);
    },
    [cancelCloseTimer]
  );

  const closeAllDropdowns = useCallback(() => {
    cancelCloseTimer();
    setOpenDropdown(null);
  }, [cancelCloseTimer]);

  useEffect(() => () => cancelCloseTimer(), [cancelCloseTimer]);

  useEffect(() => {
    if (!openDropdown) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (navRef.current && event.target instanceof Node && !navRef.current.contains(event.target)) {
        closeAllDropdowns();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAllDropdowns();
      }
    };
    const handleWindowBlur = () => closeAllDropdowns();

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("blur", handleWindowBlur);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [openDropdown, closeAllDropdowns]);

  useEffect(() => {
    const ids = NAV_ITEMS.map((item) => item.sectionId);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const visibleRatios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleRatios.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleRatios.delete(entry.target.id);
          }
        }
        if (visibleRatios.size === 0) {
          if (window.scrollY < 260) setActiveSection(null);
          return;
        }
        let bestId: string | null = null;
        let bestScore = -1;
        for (const [id, ratio] of visibleRatios.entries()) {
          if (ratio > bestScore) {
            bestScore = ratio;
            bestId = id;
          }
        }
        if (bestId) setActiveSection(bestId);
      },
      { rootMargin: "-20% 0px -45% 0px", threshold: [0, 0.2, 0.5] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback(
    (href: string) => {
      setMenuOpen(false);
      closeAllDropdowns();

      if (href.startsWith("#tool-")) {
        const toolId = href.slice(1);
        window.dispatchEvent(new CustomEvent("hxy:select-tool", { detail: toolId }));
        const capabilitiesEl = document.getElementById("capabilities");
        capabilitiesEl?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
        return;
      }

      if (href.startsWith("#project-")) {
        window.dispatchEvent(new CustomEvent("hxy:reveal-project", { detail: href.slice(1) }));
        window.requestAnimationFrame(() => {
          const target = document.querySelector(href);
          target?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
        });
        return;
      }

      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    },
    [reduced, closeAllDropdowns]
  );

  return (
    <>
      <nav
        ref={navRef}
        onMouseLeave={closeAllDropdowns}
        className={`fixed top-0 left-0 right-0 z-[100] px-4 md:px-6 py-4 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled
            ? "bg-[#080812]/88 backdrop-blur-md border-white/[0.08] shadow-[0_8px_36px_rgba(0,0,0,0.35)]"
            : "bg-transparent border-transparent shadow-none"
        }`}
      >
        <div className="relative w-full flex items-center justify-between">
          {/* Brand */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              e.currentTarget.blur();
              scrollTo("#hero");
            }}
            className="font-display text-[15px] font-semibold tracking-[0.06em] uppercase text-[#f5f7ff] no-underline"
          >
            HXY <span className="text-text-tertiary font-normal">/ EVAN</span>
          </a>

          {/* Desktop nav */}
          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 list-none md:flex">
            {NAV_ITEMS.map((item) => {
              const isOpen = openDropdown === item.href;
              const isActive = activeSection === item.sectionId;

              return (
                <li
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => openMenu(item.href)}
                  onMouseLeave={() => scheduleCloseMenu(item.href)}
                  onBlur={(event) => {
                    if (
                      !(event.relatedTarget instanceof Node) ||
                      !event.currentTarget.contains(event.relatedTarget)
                    ) {
                      setOpenDropdown((current) => (current === item.href ? null : current));
                    }
                  }}
                >
                  <a
                    href={item.href}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    onFocus={(e) => {
                      if (e.currentTarget.matches(":focus-visible")) {
                        openMenu(item.href);
                      }
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.currentTarget.blur();
                      scrollTo(item.href);
                    }}
                    className={`cursor-target relative font-body text-[13px] font-medium tracking-[0.08em] uppercase no-underline transition-colors duration-250
                      after:content-[''] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-px after:bg-neon-cyan after:transition-transform after:duration-250
                      ${
                        isOpen || isActive
                          ? "text-[#f5f7ff] after:scale-x-100"
                          : "text-text-secondary hover:text-[#f5f7ff] after:scale-x-0 hover:after:scale-x-100"
                      }`}
                  >
                    {item.label}
                  </a>

                  <div
                    onMouseEnter={() => openMenu(item.href)}
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ease-out z-50 ${
                      isOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-1.5 pointer-events-none"
                    }`}
                    aria-hidden={!isOpen}
                  >
                    <div className="flex flex-col gap-0.5 py-2 px-1.5 rounded-xl bg-[#0b0b16]/96 border border-white/[0.11] backdrop-blur-md shadow-[0_18px_48px_rgba(0,0,0,0.6)] min-w-[204px]">
                      {item.subs.map((sub) => {
                        const isSectionLink = sub.href.startsWith("#");
                        const isExternal = sub.href.startsWith("http") || sub.href.startsWith("mailto:");
                        return (
                          <a
                            key={sub.label}
                            href={sub.href}
                            tabIndex={isOpen ? 0 : -1}
                            {...(!isSectionLink ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            onClick={(e) => {
                              e.currentTarget.blur();
                              if (isSectionLink) {
                                e.preventDefault();
                                scrollTo(sub.href);
                              } else {
                                closeAllDropdowns();
                              }
                            }}
                            className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg font-body text-[12px] text-text-secondary whitespace-nowrap no-underline transition-colors duration-150 hover:text-white hover:bg-white/[0.07] focus-visible:text-white focus-visible:bg-white/[0.07] focus-visible:outline focus-visible:outline-1 focus-visible:outline-neon-cyan"
                          >
                            <span>{sub.label}</span>
                            {isExternal && (
                              <ArrowUpRight size={12} weight="regular" className="shrink-0 text-text-muted" />
                            )}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="ml-auto flex items-center gap-2">
            <BackgroundMusic />

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.15] bg-white/[0.06] transition-colors duration-200 md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X size={18} weight="light" color="#fff" />
              ) : (
                <List size={18} weight="light" color="#fff" />
              )}
            </button>
          </div>
        </div>

        {/* 1.5px 顶部阅读进度条（纯 transform scaleX，GPU 合成零重排） */}
        {!reduced && scrolled && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-[1.5px] origin-left bg-gradient-to-r from-neon-cyan/60 via-neon-cyan to-neon-pink/75 will-change-transform"
            style={{ scaleX: scrollYProgress }}
          />
        )}
      </nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <div
              className="fixed inset-0 z-[98] md:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "top right" }}
              className="fixed top-[68px] right-4 z-[99] md:hidden w-[200px] p-1.5 rounded-2xl bg-[#0d0d1c]/96 border border-white/[0.12] backdrop-blur-md shadow-[0_16px_48px_rgba(0,0,0,0.55)] flex flex-col"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.sectionId;
                return (
                  <a
                    key={item.label + item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.href);
                    }}
                    className={`block px-4 py-3 rounded-xl font-body text-[14px] font-medium tracking-[0.04em] no-underline transition-colors duration-150 active:bg-white/[0.08] active:text-white ${
                      isActive ? "bg-white/[0.06] text-[#f5f7ff]" : "text-text-secondary"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
