"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/* Refined Reticle Cursor — 5 种状态：
   1. 默认 · 漫游 — 柔和微光圆点 + 轻盈四角括号缓慢旋转
   2. 链接悬停 · 聚焦 — 圆点隐去，四角括号贴附元素边缘
   3. 按钮悬停 · 磁吸 — 四角贴附按钮圆角边缘
   4. 封面预览 · 查看 — 悬停项目海报时呈现柔和毛玻璃「查看 ↗」药丸
   5. 文字选择 / 离开视口 · 隐退 — 整体淡出
   严格仅在精细指针设备（hover: hover + pointer: fine）且首次鼠标移动后挂载。 */

function isButtonLike(el: Element): boolean {
  if (el.tagName === "BUTTON") return true;
  if (el.tagName === "A" && (el as HTMLAnchorElement).href) {
    const cls = typeof el.className === "string" ? el.className : "";
    if (cls.includes("rounded-full") || cls.includes("btn") || cls.includes("cta")) return true;
  }
  return false;
}

const CORNER_SIZE = 9;
const DOT_SIZE = 4;

export function CustomCursor() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const rafRef = useRef(0);
  const posRef = useRef({ x: -100, y: -100 });
  const visibleRef = useRef(true);
  const dirtyRef = useRef(true);
  const selectingRef = useRef(false);

  // 严格限制仅在桌面端真实鼠标设备首次移动后启用，移动端/触屏/窄屏零渲染
  useEffect(() => {
    if (reduced || active) return;
    if (typeof window === "undefined") return;
    const fineDesktopPointer = window.matchMedia(
      "(min-width: 768px) and (hover: hover) and (pointer: fine)"
    ).matches;
    if (!fineDesktopPointer) return;

    const handleFirstMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      visibleRef.current = true;
      dirtyRef.current = true;
      setActive(true);
    };

    window.addEventListener("mousemove", handleFirstMove, { passive: true, once: true });
    return () => window.removeEventListener("mousemove", handleFirstMove);
  }, [reduced, active]);

  useEffect(() => {
    if (reduced || !active) return;

    const dot = dotRef.current;
    const spin = spinRef.current;
    const pill = pillRef.current;
    const corners = cornersRef.current;
    if (!dot || !spin || !pill || corners.length < 4) return;

    const mq = window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)");
    const syncBodyCursor = () => {
      document.body.style.cursor = mq.matches ? "none" : "";
      if (!mq.matches) {
        visibleRef.current = false;
        dirtyRef.current = true;
      }
    };
    syncBodyCursor();
    mq.addEventListener("change", syncBodyCursor);

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      visibleRef.current = true;
      dirtyRef.current = true;
    };

    const onLeave = () => {
      visibleRef.current = false;
      dirtyRef.current = true;
    };

    const onSelectionChange = () => {
      const sel = window.getSelection();
      selectingRef.current = !!(sel && sel.toString().length > 0 && sel.type === "Range");
      dirtyRef.current = true;
    };

    const onScroll = () => {
      dirtyRef.current = true;
    };

    const hideAll = () => {
      dot.style.opacity = "0";
      pill.style.opacity = "0";
      pill.style.transform = "translate(-50%, -50%) scale(0.85)";
      corners.forEach((c) => {
        c.style.opacity = "0";
      });
      spin.classList.remove("cursor-spin");
    };

    const loop = () => {
      if (!dirtyRef.current) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }
      dirtyRef.current = false;

      const { x, y } = posRef.current;

      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      spin.style.left = `${x}px`;
      spin.style.top = `${y}px`;
      pill.style.left = `${x}px`;
      pill.style.top = `${y}px`;

      if (!visibleRef.current || selectingRef.current) {
        hideAll();
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      const els = document.elementsFromPoint(x, y);
      let viewTarget: Element | null = null;
      let target: Element | null = null;
      let isButton = false;

      for (const el of els) {
        if (el.matches?.(".cursor-view") || el.closest?.(".cursor-view")) {
          viewTarget = el.matches?.(".cursor-view") ? el : el.closest(".cursor-view");
          break;
        }
        if (el.matches?.(".cursor-target")) {
          target = el;
          isButton = isButtonLike(el);
          break;
        }
        const closest = el.closest?.(".cursor-target");
        if (closest) {
          target = closest;
          isButton = isButtonLike(closest);
          break;
        }
      }

      if (viewTarget) {
        spin.classList.remove("cursor-spin");
        dot.style.opacity = "0";
        corners.forEach((c) => {
          c.style.opacity = "0";
        });
        pill.style.opacity = "1";
        pill.style.transform = "translate(-50%, -50%) scale(1)";
      } else if (target) {
        spin.classList.remove("cursor-spin");
        pill.style.opacity = "0";
        pill.style.transform = "translate(-50%, -50%) scale(0.85)";

        const rect = target.getBoundingClientRect();
        const inset = isButton ? 4 : -2;
        const speed = isButton ? "0.14s" : "0.17s";

        corners.forEach((c) => {
          c.style.transition = `left ${speed} ease-out, top ${speed} ease-out, opacity 0.15s`;
          c.style.opacity = "0.9";
        });

        corners[0].style.left = `${rect.left - x + inset}px`;
        corners[0].style.top = `${rect.top - y + inset}px`;
        corners[1].style.left = `${rect.right - x - CORNER_SIZE - inset}px`;
        corners[1].style.top = `${rect.top - y + inset}px`;
        corners[2].style.left = `${rect.right - x - CORNER_SIZE - inset}px`;
        corners[2].style.top = `${rect.bottom - y - CORNER_SIZE - inset}px`;
        corners[3].style.left = `${rect.left - x + inset}px`;
        corners[3].style.top = `${rect.bottom - y - CORNER_SIZE - inset}px`;

        dot.style.opacity = "0";
      } else {
        spin.classList.add("cursor-spin");
        pill.style.opacity = "0";
        pill.style.transform = "translate(-50%, -50%) scale(0.85)";

        corners.forEach((c) => {
          c.style.transition = "opacity 0.18s";
          c.style.opacity = "0.24";
        });

        corners[0].style.left = `${-13}px`; corners[0].style.top = `${-13}px`;
        corners[1].style.left = `${4}px`;   corners[1].style.top = `${-13}px`;
        corners[2].style.left = `${4}px`;   corners[2].style.top = `${4}px`;
        corners[3].style.left = `${-13}px`; corners[3].style.top = `${4}px`;

        dot.style.opacity = "0.85";
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("selectionchange", onSelectionChange);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      document.body.style.cursor = "";
      mq.removeEventListener("change", syncBodyCursor);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("selectionchange", onSelectionChange);
      cancelAnimationFrame(rafRef.current);
    };
  }, [reduced, active]);

  if (reduced || !active) return null;

  return (
    <div className="fixed inset-0 z-[9999] hidden pointer-events-none md:block [@media(pointer:coarse)]:hidden" aria-hidden="true">
      {/* 中心微光点 */}
      <div
        ref={dotRef}
        className="absolute rounded-full -ml-[2px] -mt-[2px] transition-opacity duration-150"
        style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          backgroundColor: "#5ce1ff",
          boxShadow: "0 0 10px rgba(0,200,255,0.75)",
          opacity: 0,
        }}
      />

      {/* 项目封面悬停药丸 */}
      <div
        ref={pillRef}
        className="absolute inline-flex items-center gap-1 rounded-full border border-white/[0.18] bg-[rgba(8,8,18,0.84)] px-3.5 py-1.5 font-body text-[11.5px] font-medium tracking-[0.06em] text-[#f5f7ff] shadow-[0_12px_32px_rgba(0,0,0,0.45)] backdrop-blur-md transition-[opacity,transform] duration-200 ease-out whitespace-nowrap"
        style={{
          opacity: 0,
          transform: "translate(-50%, -50%) scale(0.85)",
        }}
      >
        查看 ↗
      </div>

      {/* 四角括号旋转容器 */}
      <div ref={spinRef} className="cursor-spin absolute" style={{ left: 0, top: 0, width: 0, height: 0 }}>
        {["tl", "tr", "br", "bl"].map((pos, i) => (
          <div
            key={pos}
            ref={(el) => {
              if (el) cornersRef.current[i] = el;
            }}
            className="absolute"
            style={{
              width: CORNER_SIZE,
              height: CORNER_SIZE,
              borderLeft: pos.includes("l") ? "1.5px solid #00c8ff" : "none",
              borderRight: !pos.includes("l") ? "1.5px solid #00c8ff" : "none",
              borderTop: pos.includes("t") ? "1.5px solid #00c8ff" : "none",
              borderBottom: !pos.includes("t") ? "1.5px solid #00c8ff" : "none",
              boxShadow: "0 0 7px rgba(0,200,255,0.45)",
              left: "-100px",
              top: "-100px",
              opacity: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
