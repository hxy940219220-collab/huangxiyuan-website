"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  CaretLeft,
  CaretRight,
  MagnifyingGlassPlus,
  X,
} from "@phosphor-icons/react";

export type LightboxItem = {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
};

type LightboxContextValue = {
  openAt: (index: number) => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function LightboxProvider({
  items,
  children,
}: {
  items: LightboxItem[];
  children: ReactNode;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openAt = useCallback(
    (index: number) => {
      if (index >= 0 && index < items.length) {
        setActiveIndex(index);
      }
    },
    [items.length]
  );

  const close = useCallback(() => setActiveIndex(null), []);

  const step = useCallback(
    (delta: number) => {
      setActiveIndex((current) => {
        if (current === null || items.length === 0) return null;
        return (current + delta + items.length) % items.length;
      });
    },
    [items.length]
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      } else if (event.key === "ArrowLeft" && items.length > 1) {
        event.preventDefault();
        step(-1);
      } else if (event.key === "ArrowRight" && items.length > 1) {
        event.preventDefault();
        step(1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, step, items.length]);

  const currentItem = activeIndex !== null ? items[activeIndex] : null;

  return (
    <LightboxContext.Provider value={{ openAt }}>
      {children}

      <AnimatePresence>
        {currentItem && activeIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={currentItem.title ?? currentItem.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 z-[9998] flex flex-col justify-between bg-[#050509]/92 p-4 backdrop-blur-2xl md:p-8"
          >
            {/* 顶栏：序号、标题、打开原图、关闭 */}
            <div
              className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="shrink-0 rounded-full border border-white/[0.14] bg-white/[0.05] px-3 py-1 font-body text-[11.5px] tabular-nums tracking-[0.06em] text-text-secondary">
                  {activeIndex + 1} / {items.length}
                </span>
                {currentItem.title && (
                  <p className="truncate font-display text-[15px] text-[#f5f7ff] md:text-[17px]">
                    {currentItem.title}
                  </p>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={currentItem.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/[0.14] bg-white/[0.05] px-3.5 font-body text-[12px] text-text-secondary no-underline transition-colors hover:border-white/[0.3] hover:text-white"
                >
                  <span>打开原图</span>
                  <ArrowUpRight size={13} weight="bold" />
                </a>
                <button
                  type="button"
                  onClick={close}
                  aria-label="关闭大图预览"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.16] bg-white/[0.06] text-white/80 transition-colors hover:border-white/[0.32] hover:bg-white/[0.12] hover:text-white cursor-pointer"
                >
                  <X size={17} weight="light" />
                </button>
              </div>
            </div>

            {/* 中央主图区 */}
            <div className="relative mx-auto my-4 flex min-h-0 w-full max-w-[1440px] flex-1 items-center justify-center">
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  aria-label="上一张截图"
                  className="absolute left-0 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.15] bg-[#0b0b14]/85 text-white/75 backdrop-blur-md transition-all hover:scale-105 hover:border-white/[0.32] hover:text-white cursor-pointer md:left-2"
                >
                  <CaretLeft size={20} weight="light" />
                </button>
              )}

              <motion.div
                key={currentItem.src}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="flex max-h-full max-w-full items-center justify-center px-2 md:px-16"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentItem.src}
                  alt={currentItem.alt}
                  className="max-h-[76vh] max-w-full rounded-[14px] border border-white/[0.12] bg-[#0b0b14] object-contain shadow-[0_32px_100px_rgba(0,0,0,0.75)]"
                />
              </motion.div>

              {items.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  aria-label="下一张截图"
                  className="absolute right-0 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.15] bg-[#0b0b14]/85 text-white/75 backdrop-blur-md transition-all hover:scale-105 hover:border-white/[0.32] hover:text-white cursor-pointer md:right-2"
                >
                  <CaretRight size={20} weight="light" />
                </button>
              )}
            </div>

            {/* 底部说明 */}
            <div
              className="mx-auto flex w-full max-w-3xl items-center justify-center text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-body text-[12.5px] leading-relaxed text-text-tertiary md:text-[13px]">
                {currentItem.caption ?? currentItem.alt}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
}

export function LightboxTrigger({
  index,
  label,
  className = "",
  fitContent = false,
  children,
}: {
  index: number;
  label: string;
  className?: string;
  fitContent?: boolean;
  children: ReactNode;
}) {
  const ctx = useContext(LightboxContext);
  return (
    <button
      type="button"
      onClick={() => ctx?.openAt(index)}
      aria-label={label}
      className={`group/lb relative block appearance-none border-0 bg-transparent p-0 text-left cursor-zoom-in ${
        fitContent ? "w-fit max-w-full" : "w-full"
      } ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full border border-white/[0.18] bg-[#050509]/80 px-3 py-1.5 font-body text-[11px] font-medium tracking-[0.04em] text-[#f5f7ff] opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover/lb:opacity-100"
      >
        <MagnifyingGlassPlus size={13} weight="light" />
        <span>放大预览</span>
      </span>
    </button>
  );
}
