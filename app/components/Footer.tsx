"use client";

import { ScrollReveal } from "./ScrollReveal";
import { ArrowUp } from "@phosphor-icons/react";

export function Footer() {
  const year = new Date().getFullYear();

  const backToTop = () => {
    document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 w-full px-6 md:px-12 py-12 md:pb-10 flex flex-col md:flex-row justify-between md:items-end gap-6 border-t border-white/[0.06]">
      <div>
        <ScrollReveal>
          <p className="text-[11px] text-text-muted">
            AI 产品经理 · 聚焦模型应用、Agent 系统与软硬件原型
          </p>
          <p className="mt-2 text-[11px] text-text-muted/70">
            © {year} 黄锡源 HXY · hxy940219220@gmail.com
          </p>
        </ScrollReveal>
      </div>
      <div className="flex items-end gap-5">
        <ScrollReveal delay={0.12}>
          <p className="font-body text-xs text-text-tertiary tracking-[0.04em]">
            Product &times; Model &times; Agent &times; Hardware
          </p>
        </ScrollReveal>
        <button
          type="button"
          onClick={backToTop}
          aria-label="返回顶部"
          className="cursor-target inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/[0.12] bg-white/[0.04] text-text-tertiary transition-all duration-300 hover:text-white hover:border-neon-cyan hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(0,200,255,0.15)] cursor-pointer"
        >
          <ArrowUp size={15} weight="light" />
        </button>
      </div>
    </footer>
  );
}
