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
import Aurora from "../reactbits/Backgrounds/Aurora/Aurora";

export function Hero() {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(true);

  // 只在桌面端挂载 WebGL 背景（移动端用静态海报，省流量省性能）
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // 默认开放首屏视频；劫持型浏览器、节省流量与减少动态效果用户保留海报兜底。
  useEffect(() => {
    const hijacker = /Quark|UCBrowser|UCWEB|baiduboxapp|BaiduHD/i.test(
      navigator.userAgent
    );
    const connection = navigator as Navigator & {
      connection?: { saveData?: boolean };
    };

    const shouldShow = !reduced && !hijacker && !connection.connection?.saveData;
    const frame = window.requestAnimationFrame(() => setShowVideo(shouldShow));
    return () => window.cancelAnimationFrame(frame);
  }, [reduced]);

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
      {/* WebGL Aurora 背景（视频边缘渐隐后的氛围底色） */}
      {isDesktop && !reduced && (
        <motion.div
          className="absolute inset-[-5%] z-0 pointer-events-none"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          style={{ x: auroraX, y: auroraY }}
        >
          <Aurora
            colorStops={["#ff6a1a", "#d84cff", "#00c8ff"]}
            amplitude={1.15}
            blend={0.55}
            speed={0.5}
          />
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
        {showVideo && !reduced && (
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
            从模型选型与 Agent 系统，到软硬件交互原型<br />
            把前沿能力做成可运行、可验证、能迭代的产品。
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
