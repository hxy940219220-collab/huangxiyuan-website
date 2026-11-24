"use client";

import { useState } from "react";
import BlurText from "../reactbits/TextAnimations/BlurText/BlurText";
import ShinyText from "../reactbits/TextAnimations/ShinyText/ShinyText";
import { motion } from "motion/react";
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
      className="relative z-10 w-full px-6 md:px-12 py-16 md:py-24 text-center"
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
          <ShinyText
            text="联系"
            speed={4}
            color="rgba(155,161,184,0.85)"
            shineColor="#f5f7ff"
            className="font-body text-[11px] font-medium tracking-[0.20em] uppercase mb-6"
          />
        </ScrollReveal>

        <BlurText
          segments={["一起构建智能、有用", "且令人难忘的产品。"]}
          className="section-display-heading font-display justify-center text-center text-[clamp(1.95rem,4.2vw,3rem)] leading-[1.28] text-[#f5f7ff] max-w-[560px] mx-auto mb-5"
          delay={75}
          direction="top"
        />

        <ScrollReveal delay={0.12}>
          <p className="mx-auto mb-9 max-w-xl font-body text-[13.5px] md:text-[14px] leading-[1.75] text-text-tertiary">
            关注方向：AI 产品经理（Agent 协作 · 企业工作流 · AI 创新产品）· 欢迎交流产品思考与落地实践
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.18}>
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-3.5 justify-center flex-wrap">
              <motion.a
                href="mailto:hxy940219220@gmail.com"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97, y: 1 }}
                className="cursor-target inline-flex items-center gap-2 px-5 md:px-7 py-3 md:py-3.5 rounded-full font-body text-[13px] md:text-[13.5px] font-semibold tracking-[0.04em] no-underline bg-[#f5f7ff] text-[#050509] border-none transition-all duration-300 hover:bg-neon-cyan hover:shadow-[0_0_36px_rgba(0,200,255,0.35)]"
              >
                <Envelope size={16} weight="bold" />
                邮件联系
              </motion.a>
              <motion.a
                href="https://github.com/hxy940219220-collab"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97, y: 1 }}
                className="cursor-target inline-flex items-center gap-2 px-5 md:px-7 py-3 md:py-3.5 rounded-full font-body text-[13px] md:text-[13.5px] font-medium tracking-[0.04em] text-[#f5f7ff] no-underline bg-white/[0.04] border border-white/[0.16] backdrop-blur-[10px] transition-all duration-300 hover:border-neon-cyan/55 hover:bg-white/[0.08] hover:shadow-[0_0_28px_rgba(0,200,255,0.14)]"
              >
                <GithubLogo size={16} weight="bold" />
                GitHub
              </motion.a>
              <motion.button
                type="button"
                onClick={copyEmail}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97, y: 1 }}
                className="cursor-target inline-flex items-center gap-2 px-5 md:px-7 py-3 md:py-3.5 rounded-full font-body text-[13px] md:text-[13.5px] font-medium tracking-[0.04em] text-[#f5f7ff] bg-white/[0.04] border border-white/[0.16] backdrop-blur-[10px] transition-all duration-300 hover:border-neon-cyan/55 hover:bg-white/[0.08] hover:shadow-[0_0_28px_rgba(0,200,255,0.14)] cursor-pointer"
              >
                {copied ? (
                  <Check size={16} weight="bold" className="text-neon-cyan" />
                ) : (
                  <Copy size={16} weight="bold" />
                )}
                {copied ? "已复制邮箱" : "复制邮箱"}
              </motion.button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
