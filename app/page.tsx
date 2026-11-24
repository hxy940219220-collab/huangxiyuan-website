"use client";

import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { EvanIntro } from "./components/EvanIntro";
import { Identity } from "./components/Identity";
import { Work } from "./components/Work";
import { Method } from "./components/Method";
import { RotatingCards3D } from "./components/RotatingCards3D";
import { ScrollReveal } from "./components/ScrollReveal";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

const INTRO_SESSION_KEY = "hxy-intro-seen";
let introSeenInSession = false;

export default function Home() {
  const [introDone, setIntroDone] = useState(() => introSeenInSession);

  useEffect(() => {
    if (introDone) return;
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(INTRO_SESSION_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen) {
      introSeenInSession = true;
      const frame = window.requestAnimationFrame(() => setIntroDone(true));
      return () => window.cancelAnimationFrame(frame);
    }
  }, [introDone]);

  const completeIntro = () => {
    introSeenInSession = true;
    try {
      window.sessionStorage.setItem(INTRO_SESSION_KEY, "1");
    } catch {
      // Ignore storage failures in restricted browsing contexts.
    }
    setIntroDone(true);
    window.dispatchEvent(new Event("hxy:bgm-play"));
  };

  return (
    <>
      {/* 无 JS 兜底：关掉开场遮罩、强制 Hero 文案可见 */}
      <noscript>
        <style>{`
          [data-evan-intro] { display: none !important; }
          #hero [style] { opacity: 1 !important; transform: none !important; filter: none !important; }
        `}</style>
      </noscript>
      {!introDone && <EvanIntro onComplete={completeIntro} />}
      <Navbar />
      <main>
        <Hero active={introDone} />
        <Identity />
        <div className="section-hairline" aria-hidden="true" />
        <Work />
        <div className="section-hairline" aria-hidden="true" />
        <Method />
        <div className="section-hairline" aria-hidden="true" />
        {/* 3D 旋转卡片 · 能力展示 */}
        <section
          id="capabilities"
          className="relative z-10 w-full px-6 md:px-12 py-14 md:py-24 overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute inset-x-[12%] top-[8%] h-[22rem] bg-[radial-gradient(circle_at_top,rgba(255,132,64,0.06),transparent_68%)]" />
          </div>
          <div className="relative z-10 mx-auto max-w-[1200px]">
            <div className="mb-10 md:mb-16 text-center">
              <ScrollReveal>
                <h2 className="section-display-heading font-display text-[clamp(1.9rem,4.8vw,3.35rem)] leading-[1.18] text-[#f5f7ff]">
                  AI 工具栈
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.08}>
                <p className="mt-3.5 text-[14px] leading-[1.7] text-text-tertiary md:text-[15px] max-w-xl mx-auto">
                  按任务选工具：多模型交叉推理、个人 Agent 日常跟进、开发 Harness 核对执行轨迹。
                </p>
              </ScrollReveal>
            </div>
            <RotatingCards3D />
          </div>
        </section>
        <div className="section-hairline" aria-hidden="true" />
        <About />
        <div className="section-hairline" aria-hidden="true" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
