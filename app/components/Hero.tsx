"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

export function Hero({ active = true }: { active?: boolean }) {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(true);
  const [inViewport, setInViewport] = useState(true);

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

  // 首屏滚出视口时自动暂停视频解码，滚回首屏恢复播放，大幅降低滚动期间 GPU 开销
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInViewport(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // 兼容微信 / QQ 的 X5 内核，并在数据就绪或首次交互时补发播放请求。
  useEffect(() => {
    const video = videoRef.current;
    if (!showVideo || !video) return;

    if (!inViewport) {
      video.pause();
      return;
    }

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
  }, [showVideo, inViewport]);

  // 鼠标视差：仅在首屏可见且为大屏精细指针时启用
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 45, stiffness: 50, mass: 1 });
  const sy = useSpring(my, { damping: 45, stiffness: 50, mass: 1 });
  const posterX = useTransform(sx, (v) => v * 8);
  const posterY = useTransform(sy, (v) => v * 5);

  useEffect(() => {
    if (
      reduced ||
      !inViewport ||
      !window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches
    ) {
      return;
    }
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduced, inViewport]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative z-[10] min-h-[100dvh] flex items-center justify-center overflow-hidden bg-bg-deepest"
    >
      {/* 静态氛围光 */}
      {active && isDesktop && !reduced && (
        <div
          className="absolute inset-[-5%] z-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at 18% 32%, rgba(255,106,26,0.16), transparent 34%), radial-gradient(circle at 52% 18%, rgba(216,76,255,0.14), transparent 38%), radial-gradient(circle at 82% 44%, rgba(0,200,255,0.14), transparent 38%)",
          }}
        >
          <div className="absolute inset-0 bg-[#050509]/40" />
        </div>
      )}

      {/* 前景海报 + 自动播放视频 */}
      <motion.div
        className="absolute inset-0 z-[1] pointer-events-none"
        aria-hidden="true"
        style={reduced || !isDesktop ? undefined : { x: posterX, y: posterY, scale: 1.03 }}
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
        <div className="pointer-events-auto space-y-2 md:space-y-2.5 max-w-[600px]">
          {/* Main title */}
          <motion.h1
            initial={reduced ? {} : { opacity: 0, y: 24 }}
            animate={reduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="hero-display-title font-display text-[clamp(3.1rem,7.8vw,6.25rem)] leading-[1.14] text-[#f5f7ff]"
          >
            黄锡源
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={reduced ? {} : { opacity: 0, y: 16 }}
            animate={reduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="hero-display-subtitle font-display text-[clamp(20px,3.6vw,40px)] leading-[1.2] text-text-secondary ml-1 md:ml-1.5"
          >
            AI 产品经理
          </motion.p>

          {/* Concise Description */}
          <motion.p
            initial={reduced ? {} : { opacity: 0, y: 14 }}
            animate={reduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-sm md:text-[15px] text-text-tertiary leading-[1.75] pl-0.5 md:pl-1 max-w-[46ch]"
          >
            围绕真实业务场景设计个人智能体与多 Agent 协作流，<br className="hidden sm:inline" />
            用可运行的软件与硬件原型验证交互边界与交付体验。
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 14 }}
            animate={reduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.74, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-2.5 md:gap-3.5 flex-wrap pt-3"
          >
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="cursor-target inline-flex items-center px-5 md:px-6 py-2.5 md:py-3 rounded-full font-body text-[13px] md:text-[13.5px] font-semibold tracking-[0.04em] no-underline cursor-pointer bg-[#f5f7ff] text-[#050509] border-none transition-colors duration-250 hover:bg-neon-cyan hover:text-[#050509]"
            >
              查看作品
              <span className="ml-2 font-mono text-xs opacity-75">&rarr;</span>
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="cursor-target inline-flex items-center px-5 md:px-6 py-2.5 md:py-3 rounded-full font-body text-[13px] md:text-[13.5px] font-medium tracking-[0.04em] text-[#f5f7ff] no-underline border border-white/[0.16] bg-[#080812]/70 transition-colors duration-250 hover:border-neon-cyan/55 hover:bg-white/[0.08]"
            >
              关于我
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="cursor-target inline-flex items-center px-5 md:px-6 py-2.5 md:py-3 rounded-full font-body text-[13px] md:text-[13.5px] font-medium tracking-[0.04em] text-[#f5f7ff] no-underline border border-white/[0.16] bg-[#080812]/70 transition-colors duration-250 hover:border-neon-cyan/55 hover:bg-white/[0.08]"
            >
              联系
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
