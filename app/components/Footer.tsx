"use client";

import { ArrowUp } from "@phosphor-icons/react";

export function Footer() {
  const year = new Date().getFullYear();

  const backToTop = () => {
    document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 w-full px-6 md:px-12 py-10 md:py-11 flex flex-col md:flex-row justify-between md:items-end gap-6 border-t border-white/[0.08]">
      <div>
        <p className="font-display text-[13px] tracking-[0.04em] text-text-secondary">
          黄锡源 · AI 产品经理
        </p>
        <p className="mt-1.5 font-body text-[11.5px] tracking-[0.02em] text-text-muted">
          © {year} 黄锡源 HXY · hxy940219220@gmail.com
        </p>
      </div>
      <div className="flex items-center md:items-end gap-5">
        <p className="font-body text-xs text-text-tertiary tracking-[0.04em]">
          Personal Agent · 多 Agent 协作 · Harness
        </p>
        <button
          type="button"
          onClick={backToTop}
          aria-label="返回顶部"
          className="cursor-target inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/[0.14] bg-white/[0.04] text-text-secondary transition-all duration-300 hover:text-[#f5f7ff] hover:border-neon-cyan hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(0,200,255,0.18)] cursor-pointer"
        >
          <ArrowUp size={15} weight="light" />
        </button>
      </div>
    </footer>
  );
}
