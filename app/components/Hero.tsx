"use client";

import { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import SplitText from "../reactbits/TextAnimations/SplitText/SplitText";
export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  const fgVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videos = [videoRef.current, fgVideoRef.current].filter(
      Boolean
    ) as HTMLVideoElement[];
    if (videos.length === 0) return;

    // X5 内核（微信/QQ/部分国产浏览器）私有属性：
    // 防止 video 被提权为原生全屏播放器，盖住整个页面
    videos.forEach((v) => {
      v.setAttribute("webkit-playsinline", "true");
      v.setAttribute("x5-playsinline", "true");
      v.setAttribute("x5-video-player-type", "h5-page");
      v.setAttribute("x5-video-player-fullscreen", "false");
    });

    const play = () => videos.forEach((v) => v.play().catch(() => {}));
    play();
    // 移动端首次触摸也要尝试播放（click 在部分移动浏览器不触发）
    document.addEventListener("click", play, { once: true });
    document.addEventListener("touchstart", play, { once: true });
    return () => {
      document.removeEventListener("click", play);
      document.removeEventListener("touchstart", play);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative z-[10] min-h-[100dvh] flex items-center justify-center overflow-hidden bg-bg-deepest"
    >
      {/* Background blurred layer */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden md:block" aria-hidden="true">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover blur-[40px] brightness-[0.3] scale-110"
        >
          <source src="/HXY-AIPM-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Foreground video */}
      <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
        <video
          ref={fgVideoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        >
          <source src="/HXY-AIPM-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(5,5,9,0.4) 80%, rgba(5,5,9,0.8) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Bottom fade to black */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[3] pointer-events-none h-[40%]"
        style={{
          background: "linear-gradient(to top, #050509 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content overlay - bottom left */}
      <div className="absolute inset-0 z-[4] pointer-events-none flex flex-col justify-end pl-4 md:pl-8 pr-6 md:pr-10 pt-6 md:pt-10 pb-6 md:pb-14 w-full">
        <div className="pointer-events-auto space-y-1.5 md:space-y-2 max-w-[640px]">
          {/* Main title */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={reduced ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {reduced ? (
              <h1 className="font-display text-[clamp(48px,9vw,104px)] leading-[1.15] tracking-[-0.02em] text-white overflow-visible">
                黄锡源
              </h1>
            ) : (
              <div className="overflow-visible">
                <SplitText
                  text="黄锡源"
                  tag="h1"
                  textAlign="left"
                  className="font-display text-[clamp(48px,9vw,104px)] leading-[1.15] tracking-[-0.02em] text-white"
                  delay={50}
                  duration={1.2}
                  from={{ opacity: 0, y: 80, filter: "blur(10px)" }}
                  to={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  ease="power4.out"
                  threshold={0.2}
                  rootMargin="-50px"
                />
              </div>
            )}
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={reduced ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {reduced ? (
              <span className="font-display font-normal text-[clamp(20px,4vw,44px)] text-text-secondary ml-1 md:ml-2">
                AI 产品经理
              </span>
            ) : (
              <div className="overflow-visible">
                <SplitText
                  text="AI 产品经理"
                  tag="span"
                  textAlign="left"
                  className="font-display font-normal text-[clamp(20px,4vw,44px)] text-text-secondary ml-1 md:ml-2"
                  delay={30}
                  duration={0.9}
                  from={{ opacity: 0, y: 24 }}
                  to={{ opacity: 1, y: 0 }}
                  ease="power3.out"
                  threshold={0.2}
                  rootMargin="-50px"
                />
              </div>
            )}
          </motion.div>

          {/* Description */}
          <motion.p
            initial={reduced ? {} : { opacity: 0, y: 20 }}
            animate={reduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-sm md:text-[15px] text-text-tertiary leading-relaxed ml-1 md:ml-2"
          >
            不止是理解 AI，而是把模型、Agent 与 Workflow<br />
            做成好用、有价值、能迭代的产品。
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 20 }}
            animate={reduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-2.5 md:gap-3.5 flex-wrap pt-3"
          >
            <motion.a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="cursor-target inline-flex items-center px-4 md:px-6 py-2.5 md:py-3 rounded-full font-body text-[13px] md:text-[13.5px] font-medium tracking-[0.04em] no-underline cursor-pointer bg-white text-black border-none transition-all duration-300 hover:bg-[#22c55e] hover:text-white hover:shadow-[0_0_36px_rgba(34,197,94,0.4)]"
              >
                查看作品
                <span className="ml-2 text-xs opacity-60 transition-all duration-300 group-hover:translate-x-0.5">&rarr;</span>
              </motion.a>
            <motion.a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="cursor-target inline-flex items-center px-4 md:px-6 py-2.5 md:py-3 rounded-full font-body text-[13px] md:text-[13.5px] font-medium tracking-[0.04em] text-white no-underline border border-white/[0.15] bg-white/[0.04] backdrop-blur-[10px] transition-all duration-300 hover:border-neon-pink hover:bg-white/[0.08] hover:shadow-[0_0_28px_rgba(216,76,255,0.12)]"
              >
                关于我
              </motion.a>
            <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="cursor-target inline-flex items-center px-4 md:px-6 py-2.5 md:py-3 rounded-full font-body text-[13px] md:text-[13.5px] font-medium tracking-[0.04em] text-white no-underline border border-white/[0.15] bg-white/[0.04] backdrop-blur-[10px] transition-all duration-300 hover:border-neon-pink hover:bg-white/[0.08] hover:shadow-[0_0_28px_rgba(216,76,255,0.12)]"
              >
                联系
              </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
