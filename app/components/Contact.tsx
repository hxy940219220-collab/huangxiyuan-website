"use client";

import { useState } from "react";
import BlurText from "../reactbits/TextAnimations/BlurText/BlurText";
import { ScrollReveal } from "./ScrollReveal";
import { GithubLogo, Envelope, Copy, Check } from "@phosphor-icons/react";

const EMAIL = "hxy940219220@gmail.com";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = EMAIL;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="relative z-10 w-full px-6 md:px-12 py-14 md:py-22 text-center"
    >
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        aria-hidden="true"
      >
        <span className="font-display text-[clamp(6rem,18vw,16rem)] text-white/[0.02] leading-[0.8] select-none">
          HXY
        </span>
      </div>

      <div className="relative z-[1]">
        <ScrollReveal>
          <p className="font-body text-[11px] font-medium tracking-[0.20em] text-text-tertiary uppercase mb-5">
            联系
          </p>
        </ScrollReveal>

        <BlurText
          segments={["一起构建智能、有用", "且令人难忘的产品。"]}
          className="section-display-heading font-display justify-center text-center text-[clamp(1.85rem,4vw,2.9rem)] leading-[1.28] text-[#f5f7ff] max-w-[540px] mx-auto mb-4"
          delay={60}
          direction="top"
        />

        <ScrollReveal delay={0.1}>
          <p className="mx-auto mb-8 max-w-lg font-body text-[13px] md:text-[13.5px] leading-[1.7] text-text-tertiary">
            AI 产品经理（Agent 协作 · 企业工作流 · 创新产品）· 欢迎交流
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.14}>
          <div className="flex gap-3 justify-center flex-wrap">
            <a
              href="mailto:hxy940219220@gmail.com"
              className="cursor-target inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-full font-body text-[13px] font-semibold tracking-[0.04em] no-underline bg-[#f5f7ff] text-[#050509] transition-colors duration-200 hover:bg-neon-cyan"
            >
              <Envelope size={16} weight="bold" />
              邮件联系
            </a>
            <a
              href="https://github.com/hxy940219220-collab"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-target inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-full font-body text-[13px] font-medium tracking-[0.04em] text-[#f5f7ff] no-underline bg-white/[0.04] border border-white/[0.16] transition-colors duration-200 hover:border-neon-cyan/55 hover:bg-white/[0.08]"
            >
              <GithubLogo size={16} weight="bold" />
              GitHub
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="cursor-target inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-full font-body text-[13px] font-medium tracking-[0.04em] text-[#f5f7ff] bg-white/[0.04] border border-white/[0.16] transition-colors duration-200 hover:border-neon-cyan/55 hover:bg-white/[0.08] cursor-pointer"
            >
              {copied ? (
                <Check size={16} weight="bold" className="text-neon-cyan" />
              ) : (
                <Copy size={16} weight="bold" />
              )}
              {copied ? "已复制邮箱" : "复制邮箱"}
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
