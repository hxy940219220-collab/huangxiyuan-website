import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";

export type ProjectSlug =
  | "tango"
  | "foldframe"
  | "hr-studio"
  | "framepop"
  | "quicknote"
  | "eureka";

const SHOWCASE_ORDER: Array<{
  slug: ProjectSlug;
  index: string;
  title: string;
  subtitle: string;
}> = [
  { slug: "tango", index: "01", title: "Tango", subtitle: "跨境电商 AI 工作台" },
  { slug: "foldframe", index: "02", title: "Foldframe", subtitle: "AI 内容创作与多端发布工作台" },
  { slug: "hr-studio", index: "03", title: "HR 搭档", subtitle: "AI 人事工作台" },
  { slug: "framepop", index: "04", title: "Framepop", subtitle: "灵感设计 AI 工作台" },
  { slug: "quicknote", index: "05", title: "QuickNote", subtitle: "macOS AI 便签" },
  { slug: "eureka", index: "06", title: "尤里卡", subtitle: "IP 内容创作工作台" },
];

export function ProjectPager({
  currentSlug,
  maxWidthClass = "max-w-[1150px]",
}: {
  currentSlug: ProjectSlug;
  maxWidthClass?: string;
}) {
  const idx = SHOWCASE_ORDER.findIndex((item) => item.slug === currentSlug);
  if (idx === -1) return null;

  const prev = SHOWCASE_ORDER[(idx - 1 + SHOWCASE_ORDER.length) % SHOWCASE_ORDER.length];
  const next = SHOWCASE_ORDER[(idx + 1) % SHOWCASE_ORDER.length];

  return (
    <nav
      aria-label="切换其他项目"
      className={`mx-auto mt-16 w-[calc(100%-40px)] ${maxWidthClass} md:mt-24`}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href={`/projects/${prev.slug}`}
          className="cursor-target group flex flex-col justify-between rounded-[18px] border border-white/[0.1] bg-[#0b0b14] p-6 no-underline transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.24] hover:bg-[#0f0f1b]"
        >
          <span className="inline-flex items-center gap-1.5 font-body text-[11px] tracking-[0.12em] text-text-muted uppercase">
            <ArrowLeft size={13} weight="regular" className="transition-transform duration-300 group-hover:-translate-x-0.5" />
            上一个项目 · <span className="tabular-nums">{prev.index}</span>
          </span>
          <div className="mt-3">
            <p className="card-display-title font-display text-[1.35rem] leading-snug text-[#f5f7ff] transition-colors group-hover:text-neon-cyan">
              {prev.title}
            </p>
            <p className="mt-1 font-body text-[12.5px] text-text-tertiary">
              {prev.subtitle}
            </p>
          </div>
        </Link>

        <Link
          href={`/projects/${next.slug}`}
          className="cursor-target group flex flex-col justify-between rounded-[18px] border border-white/[0.1] bg-[#0b0b14] p-6 text-left no-underline transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.24] hover:bg-[#0f0f1b] sm:items-end sm:text-right"
        >
          <span className="inline-flex items-center gap-1.5 font-body text-[11px] tracking-[0.12em] text-text-muted uppercase">
            下一个项目 · <span className="tabular-nums">{next.index}</span>
            <ArrowRight size={13} weight="regular" className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
          <div className="mt-3">
            <p className="card-display-title font-display text-[1.35rem] leading-snug text-[#f5f7ff] transition-colors group-hover:text-neon-cyan">
              {next.title}
            </p>
            <p className="mt-1 font-body text-[12.5px] text-text-tertiary">
              {next.subtitle}
            </p>
          </div>
        </Link>
      </div>
    </nav>
  );
}
