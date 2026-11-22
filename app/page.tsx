"use client";

import { useState } from "react";
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

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  const completeIntro = () => {
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
        <Work />
        <Method />
        {/* 3D 旋转卡片 · 能力展示 */}
        <section
          id="capabilities"
          className="relative z-10 w-full px-6 md:px-12 py-20 md:py-32 overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute inset-x-[8%] top-[10%] h-[28rem] bg-[radial-gradient(circle_at_top,rgba(255,132,64,0.06),transparent_68%)] blur-3xl" />
          </div>
          <div className="relative z-10 mx-auto max-w-[1200px]">
            <div className="mb-16 md:mb-24 text-center">
              <ScrollReveal>
                <h2 className="section-display-heading font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.18] text-[#f5f7ff]">
                  AI 工具栈
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.12}>
                <p className="mt-5 text-[15px] leading-[1.75] text-text-tertiary md:text-base max-w-2xl mx-auto">
                  按任务选工具。用不同模型做复杂推理和交叉复核，用个人 Agent 跟进日常事项，再用开发 Harness 查轨迹、跑验证。
                </p>
              </ScrollReveal>
            </div>
            <RotatingCards3D />
          </div>
        </section>
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
