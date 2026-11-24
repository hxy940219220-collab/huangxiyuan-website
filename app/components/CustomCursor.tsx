"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/* High-Performance Reticle Cursor:
   - 按需调度 rAF（鼠标静止时 0% CPU 占用，不再无限空转）
   - 使用 pointerover/pointerout 事件委托替代逐帧 document.elementsFromPoint()
   - 滚动时自动释放吸附框，零滚动期 getBoundingClientRect() 强制重排
   - 全程使用 GPU translate3d 合成移动，仅在桌面端精细指针下挂载 */

const CORNER_SIZE = 9;
const DOT_SIZE = 4;

function isButtonLike(el: Element): boolean {
  if (el.tagName === "BUTTON") return true;
  if (el.tagName === "A" && (el as HTMLAnchorElement).href) {
    const cls = typeof el.className === "string" ? el.className : "";
    if (cls.includes("rounded-full") || cls.includes("btn") || cls.includes("cta")) return true;
  }
  return false;
}

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
  const selectingRef = useRef(false);
  const hoverModeRef = useRef<"roam" | "view" | "target">("roam");
  const targetRectRef = useRef<DOMRect | null>(null);
  const targetInsetRef = useRef(0);

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

    const renderFrame = () => {
      rafRef.current = 0;
      const { x, y } = posRef.current;
      const translate = `translate3d(${x}px, ${y}px, 0)`;

      dot.style.transform = translate;
      spin.style.transform = translate;
      pill.style.transform =
        hoverModeRef.current === "view" && visibleRef.current && !selectingRef.current
          ? `${translate} translate(-50%, -50%) scale(1)`
          : `${translate} translate(-50%, -50%) scale(0.85)`;

      if (!visibleRef.current || selectingRef.current || !mq.matches) {
        dot.style.opacity = "0";
        pill.style.opacity = "0";
        corners.forEach((c) => {
          c.style.opacity = "0";
        });
        return;
      }

      if (hoverModeRef.current === "view") {
        dot.style.opacity = "0";
        corners.forEach((c) => {
          c.style.opacity = "0";
        });
        pill.style.opacity = "1";
        return;
      }

      pill.style.opacity = "0";

      if (hoverModeRef.current === "target" && targetRectRef.current) {
        const rect = targetRectRef.current;
        const inset = targetInsetRef.current;
        dot.style.opacity = "0";
        corners.forEach((c) => {
          c.style.opacity = "0.88";
        });

        corners[0].style.transform = `translate3d(${rect.left - x + inset}px, ${rect.top - y + inset}px, 0)`;
        corners[1].style.transform = `translate3d(${rect.right - x - CORNER_SIZE - inset}px, ${rect.top - y + inset}px, 0)`;
        corners[2].style.transform = `translate3d(${rect.right - x - CORNER_SIZE - inset}px, ${rect.bottom - y - CORNER_SIZE - inset}px, 0)`;
        corners[3].style.transform = `translate3d(${rect.left - x + inset}px, ${rect.bottom - y - CORNER_SIZE - inset}px, 0)`;
      } else {
        dot.style.opacity = "0.85";
        corners.forEach((c) => {
          c.style.opacity = "0.24";
        });

        corners[0].style.transform = "translate3d(-13px, -13px, 0)";
        corners[1].style.transform = "translate3d(4px, -13px, 0)";
        corners[2].style.transform = "translate3d(4px, 4px, 0)";
        corners[3].style.transform = "translate3d(-13px, 4px, 0)";
      }
    };

    const scheduleRender = () => {
      if (rafRef.current === 0) {
        rafRef.current = window.requestAnimationFrame(renderFrame);
      }
    };

    const syncBodyCursor = () => {
      document.body.style.cursor = mq.matches ? "none" : "";
      if (!mq.matches) visibleRef.current = false;
      scheduleRender();
    };
    syncBodyCursor();
    mq.addEventListener("change", syncBodyCursor);

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      visibleRef.current = true;
      scheduleRender();
    };

    const onPointerOver = (e: PointerEvent) => {
      const el = e.target instanceof Element ? e.target : null;
      if (!el) return;

      const viewEl = el.closest(".cursor-view");
      if (viewEl) {
        hoverModeRef.current = "view";
        targetRectRef.current = null;
        scheduleRender();
        return;
      }

      const targetEl = el.closest(".cursor-target");
      if (targetEl) {
        hoverModeRef.current = "target";
        targetRectRef.current = targetEl.getBoundingClientRect();
        targetInsetRef.current = isButtonLike(targetEl) ? 4 : -2;
        scheduleRender();
        return;
      }

      if (hoverModeRef.current !== "roam") {
        hoverModeRef.current = "roam";
        targetRectRef.current = null;
        scheduleRender();
      }
    };

    const onScroll = () => {
      // 滚动期间释放吸附框，零强制重排
      if (hoverModeRef.current === "target") {
        hoverModeRef.current = "roam";
        targetRectRef.current = null;
        scheduleRender();
      }
    };

    const onLeave = () => {
      visibleRef.current = false;
      scheduleRender();
    };

    const onSelectionChange = () => {
      const sel = window.getSelection();
      selectingRef.current = !!(sel && sel.toString().length > 0 && sel.type === "Range");
      scheduleRender();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("selectionchange", onSelectionChange);
    scheduleRender();

    return () => {
      document.body.style.cursor = "";
      mq.removeEventListener("change", syncBodyCursor);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("selectionchange", onSelectionChange);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [reduced, active]);

  if (reduced || !active) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] hidden pointer-events-none md:block [@media(pointer:coarse)]:hidden"
      aria-hidden="true"
    >
      {/* 中心微光点 */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 rounded-full -ml-[2px] -mt-[2px] will-change-transform transition-opacity duration-150"
        style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          backgroundColor: "#5ce1ff",
          boxShadow: "0 0 8px rgba(0,200,255,0.7)",
          opacity: 0,
        }}
      />

      {/* 项目封面悬停药丸 */}
      <div
        ref={pillRef}
        className="absolute left-0 top-0 inline-flex items-center gap-1 rounded-full border border-white/[0.18] bg-[#080812]/88 px-3.5 py-1.5 font-body text-[11.5px] font-medium tracking-[0.06em] text-[#f5f7ff] shadow-[0_10px_28px_rgba(0,0,0,0.45)] will-change-transform transition-opacity duration-150 whitespace-nowrap"
        style={{ opacity: 0 }}
      >
        查看 ↗
      </div>

      {/* 四角括号容器 */}
      <div ref={spinRef} className="absolute left-0 top-0 h-0 w-0 will-change-transform">
        {["tl", "tr", "br", "bl"].map((pos, i) => (
          <div
            key={pos}
            ref={(el) => {
              if (el) cornersRef.current[i] = el;
            }}
            className="absolute left-0 top-0 will-change-transform transition-[transform,opacity] duration-150 ease-out"
            style={{
              width: CORNER_SIZE,
              height: CORNER_SIZE,
              borderLeft: pos.includes("l") ? "1.5px solid #00c8ff" : "none",
              borderRight: !pos.includes("l") ? "1.5px solid #00c8ff" : "none",
              borderTop: pos.includes("t") ? "1.5px solid #00c8ff" : "none",
              borderBottom: !pos.includes("t") ? "1.5px solid #00c8ff" : "none",
              opacity: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
