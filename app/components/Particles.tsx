"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/* 轻量级环境星尘粒子（仅桌面端挂载）：
   - 移除高开销的全屏 CSS mask-image 与 lighter 混合模式
   - 粒子数精简至 42 个，按颜色分组合并 Path 绘制（每帧仅 5 次 fill + 1 次 stroke）
   - 24fps 帧率限制，页面隐藏或开场动画期间自动暂停，滚动完全零卡顿 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  colorIdx: number;
}

const PALETTE = [
  "rgba(0,200,255,0.28)",
  "rgba(216,76,255,0.24)",
  "rgba(255,216,74,0.24)",
  "rgba(255,106,26,0.22)",
  "rgba(255,255,255,0.22)",
];

const DESKTOP_PARTICLE_COUNT = 42;
const CONNECT_DIST_SQ = 115 * 115;
const FRAME_INTERVAL = 1000 / 24;

function createParticle(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.24,
    vy: (Math.random() - 0.5) * 0.24 - 0.05,
    size: Math.random() * 1.4 + 0.6,
    colorIdx: Math.floor(Math.random() * PALETTE.length),
  };
}

export function Particles() {
  const reduced = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduced) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduced]);

  useEffect(() => {
    if (reduced || !isDesktop) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    let rafId = 0;
    let lastTime = 0;

    const particles: Particle[] = Array.from({ length: DESKTOP_PARTICLE_COUNT }, () =>
      createParticle(w, h)
    );

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    resize();

    const tick = (now: number) => {
      rafId = window.requestAnimationFrame(tick);
      if (document.hidden) return;

      const elapsed = now - lastTime;
      if (elapsed < FRAME_INTERVAL) return;
      lastTime = now - (elapsed % FRAME_INTERVAL);

      ctx.clearRect(0, 0, w, h);

      // 更新位置
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        else if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        else if (p.y > h + 10) p.y = -10;
      }

      // 合并单次描边绘制近邻连线
      ctx.beginPath();
      ctx.strokeStyle = "rgba(150,180,255,0.08)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (dx * dx + dy * dy < CONNECT_DIST_SQ) {
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
          }
        }
      }
      ctx.stroke();

      // 按颜色分批绘制圆点（仅 5 次 fill）
      for (let c = 0; c < PALETTE.length; c++) {
        ctx.beginPath();
        ctx.fillStyle = PALETTE[c];
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          if (p.colorIdx !== c) continue;
          ctx.moveTo(p.x + p.size, p.y);
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        }
        ctx.fill();
      }
    };

    rafId = window.requestAnimationFrame(tick);
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [reduced, isDesktop]);

  if (reduced || !isDesktop) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[6] pointer-events-none"
      aria-hidden="true"
    />
  );
}
