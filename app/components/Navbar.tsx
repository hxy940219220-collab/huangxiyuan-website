"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "motion/react";
import { List, X } from "@phosphor-icons/react";

const NAV_ITEMS = [
  {
    label: "作品",
    href: "#work",
    subs: [
      { label: "IdeaFlash · 灵感胶囊" },
      { label: "FocusMeow · 专注喵" },
    ],
  },
  {
    label: "思考",
    href: "#method",
    subs: [
      { label: "AIPM 工作流蓝图" },
      { label: "Harness Engineering" },
      { label: "Claude Code 设计逻辑" },
      { label: "Hermes × OpenClaw" },
    ],
  },
  {
    label: "工具栈",
    href: "#capabilities",
    subs: [
      { label: "Claude" },
      { label: "GPT" },
      { label: "Gemini" },
      { label: "VS Code" },
      { label: "Typeless" },
    ],
  },
  {
    label: "关于",
    href: "#about",
    subs: [
      { label: "产品化能力" },
      { label: "Agent 系统" },
      { label: "快速验证" },
    ],
  },
  {
    label: "联系",
    href: "#contact",
    subs: [
      { label: "GitHub", href: "https://github.com/hxy940219220-collab/huangxiyuan-website" },
      { label: "huangxiyuan.net", href: "https://huangxiyuan.net" },
      { label: "hxy940219220@gmail.com", href: "mailto:hxy940219220@gmail.com" },
    ],
  },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();

  // Scroll-driven 背景透明度 (用 MotionValue 避免 React 重渲染)
  const { scrollY } = useScroll();
  const navBgOpacity = useTransform(scrollY, [0, 100, 200], [0, 0.55, 0.85]);
  const navBorderOpacity = useTransform(scrollY, [0, 200], [0, 1]);
  const navShadowOpacity = useTransform(scrollY, [0, 200], [0, 0.35]);


  const scrollTo = useCallback((href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }, [reduced]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-6 py-4"
        style={{
          backgroundColor: useTransform(navBgOpacity, (v) => `rgba(8,8,18,${v})`),
          backdropFilter: useTransform(navBgOpacity, (v) => v > 0.1 ? `blur(${Math.round(v * 26)}px)` : "none"),
          WebkitBackdropFilter: useTransform(navBgOpacity, (v) => v > 0.1 ? `blur(${Math.round(v * 26)}px)` : "none"),
          borderBottomWidth: useTransform(navBorderOpacity, (v) => `${v}px`),
          borderBottomStyle: "solid",
          borderBottomColor: "rgba(255,255,255,0.08)",
          boxShadow: useTransform(navShadowOpacity, (v) => `0 8px 48px rgba(0,0,0,${v})`),
        }}
      >
        <div className="w-full flex items-center justify-between">
          {/* Brand */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
            className="font-body text-[15px] font-semibold tracking-[0.06em] uppercase text-white no-underline"
          >
            HXY <span className="text-text-tertiary font-normal">/ EVAN</span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-9 list-none">
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className="relative group">
                <a
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
                  className="cursor-target relative font-body text-[13px] font-medium tracking-[0.08em] uppercase text-text-secondary no-underline transition-colors duration-300 hover:text-white
                    after:content-[''] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-px after:bg-neon-cyan after:scale-x-0 after:transition-transform after:duration-300
                    hover:after:scale-x-100"
                >
                  {item.label}
                </a>
                {/* 下拉子项 */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                  <div className="flex flex-col gap-0.5 py-2 px-1 rounded-xl bg-[rgba(13,13,28,0.94)] border border-white/[0.10] backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.55)] min-w-[180px]">
                    {item.subs.map((sub) =>
                      "href" in sub && sub.href ? (
                        <a
                          key={sub.label}
                          href={sub.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-3 py-2 rounded-lg font-body text-[12px] text-text-secondary whitespace-nowrap no-underline transition-colors duration-200 hover:text-white hover:bg-white/[0.06]"
                        >
                          {sub.label}
                        </a>
                      ) : (
                        <span
                          key={sub.label}
                          className="block px-3 py-2 rounded-lg font-body text-[12px] text-text-secondary whitespace-nowrap transition-colors duration-200 hover:text-white hover:bg-white/[0.06]"
                        >
                          {sub.label}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97, y: 1 }}
              className="cursor-target hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] border border-white/[0.18] text-white font-body text-[12.5px] font-medium tracking-[0.06em] uppercase no-underline cursor-pointer transition-all duration-300 backdrop-blur-[10px] hover:bg-white/[0.12] hover:border-neon-cyan hover:shadow-[0_0_28px_rgba(0,200,255,0.18)]"
            >
              聊聊
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/[0.1] text-[11px] transition-all duration-300 group-hover:bg-neon-cyan group-hover:text-black">
                &#x2197;
              </span>
          </motion.a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.15] cursor-pointer gap-[5px] transition-all duration-400"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <X size={18} weight="light" color="#fff" />
            ) : (
              <List size={18} weight="light" color="#fff" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* 点击空白处关闭 */}
            <div
              className="fixed inset-0 z-[98] md:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "top right" }}
              className="fixed top-[68px] right-4 z-[99] md:hidden w-[200px] p-1.5 rounded-2xl bg-[rgba(13,13,28,0.96)] border border-white/[0.12] backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.55)] flex flex-col"
            >
              {[...NAV_ITEMS, { label: "聊聊", href: "#contact", subs: [] as {label:string; href?:string}[] }].map(
                (item) => (
                  <a
                    key={item.label + item.href}
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
                    className="block px-4 py-3 rounded-xl font-body text-[14px] font-medium tracking-[0.04em] text-text-secondary no-underline transition-colors duration-200 active:bg-white/[0.08] active:text-white"
                  >
                    {item.label}
                  </a>
                )
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
