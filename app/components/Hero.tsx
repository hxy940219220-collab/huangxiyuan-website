"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import SplitText from "../reactbits/TextAnimations/SplitText/SplitText";

export function Hero({ active = true }: { active?: boolean }) {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(true);

  // 只在桌面端挂载氛围背景，移动端使用静态海报以降低开销。
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    if (!active) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [active]);

  // 默认开放首屏视频；劫持型浏览器、节省流量与减少动态效果用户保留海报兜底。
  useEffect(() => {
    const hijacker = /Quark|UCBrowser|UCWEB|baiduboxapp|BaiduHD/i.test(
      navigator.userAgent
    );
    const connection = navigator as Navigator & {
      connection?: { saveData?: boolean };
    };

    const shouldShow = active && !reduced && !hijacker && !connection.connection?.saveData;
    const frame = window.requestAnimationFrame(() => setShowVideo(shouldShow));
    return () => window.cancelAnimationFrame(frame);
  }, [active, reduced]);

  // 兼容微信 / QQ 的 X5 内核，并在数据就绪或首次交互时补发播放请求。
  useEffect(() => {
    const video = videoRef.current;
    if (!showVideo || !video) return;

    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("x5-playsinline", "true");
    video.setAttribute("x5-video-player-type", "h5-page");
    video.setAttribute("x5-video-player-fullscreen", "false");

    const play = () => video.play().catch(() => undefined);
    interface WeixinWindow extends Window {
      WeixinJSBridge?: {
        invoke: (api: string, options: object, callback: () => void) => void;
      };
    }
    const wxWindow = window as WeixinWindow;
    const playInWeixin = () => {
      if (wxWindow.WeixinJSBridge) {
        wxWindow.WeixinJSBridge.invoke("getNetworkType", {}, play);
      } else {
        void play();
      }
    };

    void play();
    playInWeixin();
    video.addEventListener("loadeddata", play, { once: true });
    document.addEventListener("WeixinJSBridgeReady", playInWeixin, { once: true });
    document.addEventListener("click", play, { once: true });
    document.addEventListener("touchstart", play, { once: true });

    return () => {
      video.removeEventListener("loadeddata", play);
      document.removeEventListener("WeixinJSBridgeReady", playInWeixin);
      document.removeEventListener("click", play);
      document.removeEventListener("touchstart", play);
    };
  }, [showVideo]);

  // 鼠标视差：海报与 Aurora 反向微移，形成纵深
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 42, stiffness: 55, mass: 1 });
  const sy = useSpring(my, { damping: 42, stiffness: 55, mass: 1 });
  const posterX = useTransform(sx, (v) => v * 10);
  const posterY = useTransform(sy, (v) => v * 7);
  const auroraX = useTransform(sx, (v) => v * -20);
  const auroraY = useTransform(sy, (v) => v * -12);

  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduced]);

  return (
    <section
      id="hero"
      className="relative z-[10] min-h-[100dvh] flex items-center justify-center overflow-hidden bg-bg-deepest"
    >
      {/* 静态氛围光替代持续运行的 WebGL，保留色彩纵深并降低 GPU 开销。 */}
      {active && isDesktop && !reduced && (
        <motion.div
          className="absolute inset-[-5%] z-0 pointer-events-none"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          style={{
            x: auroraX,
            y: auroraY,
            background:
              "radial-gradient(circle at 18% 32%, rgba(255,106,26,0.16), transparent 34%), radial-gradient(circle at 52% 18%, rgba(216,76,255,0.14), transparent 38%), radial-gradient(circle at 82% 44%, rgba(0,200,255,0.14), transparent 38%)",
          }}
        >
          {/* 压暗背景，让前景照片与文字突出 */}
          <div className="absolute inset-0 bg-[#050509]/40" />
        </motion.div>
      )}

      {/* 前景海报 + 自动播放视频（海报始终作为首帧与兼容性兜底） */}
      <motion.div
        className="absolute inset-0 z-[1] pointer-events-none"
        aria-hidden="true"
        style={reduced ? undefined : { x: posterX, y: posterY, scale: 1.04 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/HXY-AIPM-poster.jpg"
          alt=""
          fetchPriority="high"
          className="hero-poster-mask w-full h-full object-cover"
        />
        {active && showVideo && !reduced && (
          <video
            ref={videoRef}
            data-hero-video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/HXY-AIPM-poster.jpg"
            className="hero-poster-mask absolute inset-0 h-full w-full object-cover"
          >
            <source src="/HXY-AIPM-video.mp4" type="video/mp4" />
          </video>
        )}
      </motion.div>

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
      <div className="absolute inset-0 z-[4] pointer-events-none flex flex-col justify-end pl-5 md:pl-10 pr-6 md:pr-12 pt-6 md:pt-10 pb-8 md:pb-14 w-full">
        <div className="pointer-events-auto space-y-2 md:space-y-2.5 max-w-[640px]">
          {/* Main title */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={reduced ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {reduced ? (
              <h1 className="hero-display-title font-display text-[clamp(3.1rem,7.8vw,6.25rem)] leading-[1.14] text-[#f5f7ff] overflow-visible">
                黄锡源
              </h1>
            ) : (
              <div className="overflow-visible">
                <SplitText
                  text="黄锡源"
                  tag="h1"
                  textAlign="left"
                  className="hero-display-title font-display text-[clamp(3.1rem,7.8vw,6.25rem)] leading-[1.14] text-[#f5f7ff]"
                  delay={55}
                  duration={1.0}
                  from={{ opacity: 0, y: 48, filter: "blur(8px)" }}
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
            initial={reduced ? {} : { opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={reduced ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.85, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {reduced ? (
              <span className="hero-display-subtitle font-display text-[clamp(20px,3.6vw,40px)] text-text-secondary ml-1 md:ml-1.5">
                AI 产品经理
              </span>
            ) : (
              <div className="overflow-visible">
                <SplitText
                  text="AI 产品经理"
                  tag="span"
                  textAlign="left"
                  className="hero-display-subtitle font-display text-[clamp(20px,3.6vw,40px)] text-text-secondary ml-1 md:ml-1.5"
                  delay={28}
                  duration={0.8}
                  from={{ opacity: 0, y: 20 }}
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
            initial={reduced ? {} : { opacity: 0, y: 16 }}
            animate={reduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-sm md:text-[15px] text-text-tertiary leading-[1.75] pl-0.5 md:pl-1"
          >
            设计个人智能体与多 Agent 工作流。<br />
            从任务交接到人工审批，让交付过程可查、结果可验。
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 16 }}
            animate={reduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
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
                className="cursor-target inline-flex items-center px-5 md:px-6 py-2.5 md:py-3 rounded-full font-body text-[13px] md:text-[13.5px] font-semibold tracking-[0.04em] no-underline cursor-pointer bg-[#f5f7ff] text-[#050509] border-none transition-all duration-300 hover:bg-neon-cyan hover:text-[#050509] hover:shadow-[0_0_32px_rgba(0,200,255,0.32)]"
              >
                查看作品
                <span className="ml-2 font-mono text-xs opacity-75 transition-all duration-300 group-hover:translate-x-0.5">&rarr;</span>
              </motion.a>
            <motion.a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="cursor-target inline-flex items-center px-5 md:px-6 py-2.5 md:py-3 rounded-full font-body text-[13px] md:text-[13.5px] font-medium tracking-[0.04em] text-[#f5f7ff] no-underline border border-white/[0.16] bg-white/[0.04] backdrop-blur-[10px] transition-all duration-300 hover:border-neon-cyan/55 hover:bg-white/[0.08] hover:shadow-[0_0_24px_rgba(0,200,255,0.14)]"
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
                className="cursor-target inline-flex items-center px-5 md:px-6 py-2.5 md:py-3 rounded-full font-body text-[13px] md:text-[13.5px] font-medium tracking-[0.04em] text-[#f5f7ff] no-underline border border-white/[0.16] bg-white/[0.04] backdrop-blur-[10px] transition-all duration-300 hover:border-neon-cyan/55 hover:bg-white/[0.08] hover:shadow-[0_0_24px_rgba(0,200,255,0.14)]"
              >
                联系
              </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
