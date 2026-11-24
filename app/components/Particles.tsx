"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/* 轻量高帧率环境星尘粒子：
   - 桌面端 96 颗 / 移动端 24 颗，在保留星空氛围的同时维持极低 CPU/GPU 开销
   - 按颜色分批合并 Path（每帧仅 5 次 fill + 1 次 stroke），全程零 Math.sqrt
   - 移除高开销的全屏 CSS mask-image 与 lighter 混合模式，页面隐藏自动暂停 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  colorIdx: number;
}

const PALETTE = [
  "rgba(0,200,255,0.38)",
  "rgba(216,76,255,0.32)",
  "rgba(255,216,74,0.32)",
  "rgba(255,106,26,0.28)",
  "rgba(255,255,255,0.30)",
];

const DESKTOP_PARTICLE_COUNT = 96;
const MOBILE_PARTICLE_COUNT = 24;
const CONNECT_DIST_SQ = 125 * 125;
const MOUSE_RADIUS_SQ = 135 * 135;
const MAX_LINKS_PER_PARTICLE = 3;
const FRAME_INTERVAL = 1000 / 30;

function createParticle(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.28,
    vy: (Math.random() - 0.5) * 0.28 - 0.06,
    size: Math.random() * 1.45 + 0.65,
    colorIdx: Math.floor(Math.random() * PALETTE.length),
  };
}

export function Particles() {
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    let isDesktop = w >= 768;
    let rafId = 0;
    let lastTime = 0;
    const mouse = { x: -9999, y: -9999 };

    let particles: Particle[] = [];

    const syncParticles = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      isDesktop = w >= 768;
      canvas.width = w;
      canvas.height = h;
      const target = isDesktop ? DESKTOP_PARTICLE_COUNT : MOBILE_PARTICLE_COUNT;
      if (particles.length !== target) {
        particles = Array.from({ length: target }, () => createParticle(w, h));
      }
    };
    syncParticles();

    const onMove = (e: MouseEvent) => {
      if (!isDesktop) return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const tick = (now: number) => {
      rafId = window.requestAnimationFrame(tick);
      if (document.hidden) return;

      const elapsed = now - lastTime;
      if (elapsed < FRAME_INTERVAL) return;
      lastTime = now - (elapsed % FRAME_INTERVAL);

      ctx.clearRect(0, 0, w, h);

      // 更新粒子位置（桌面端带轻量鼠标微推开，零 Math.sqrt）
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (isDesktop && mouse.x > -1000) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MOUSE_RADIUS_SQ && d2 > 4) {
            const factor = (1 - d2 / MOUSE_RADIUS_SQ) * 0.0022;
            p.vx += dx * factor;
            p.vy += dy * factor;
          }
        }

        // 柔和阻尼并限速
        p.vx *= 0.992;
        p.vy *= 0.992;
        if (p.vx > 0.6) p.vx = 0.6;
        else if (p.vx < -0.6) p.vx = -0.6;
        if (p.vy > 0.6) p.vy = 0.6;
        else if (p.vy < -0.6) p.vy = -0.6;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -12) p.x = w + 12;
        else if (p.x > w + 12) p.x = -12;
        if (p.y < -12) p.y = h + 12;
        else if (p.y > h + 12) p.y = -12;
      }

      // 合并单次描边绘制近邻连线（限制单粒子最大连线数，防局部聚集掉帧）
      ctx.beginPath();
      ctx.strokeStyle = "rgba(150,180,255,0.12)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        let links = 0;
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (dx * dx + dy * dy < CONNECT_DIST_SQ) {
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            links += 1;
            if (links >= MAX_LINKS_PER_PARTICLE) break;
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
    window.addEventListener("resize", syncParticles, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", syncParticles);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
