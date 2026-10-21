import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

export type DemoStep = {
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  width: number;
  height: number;
};

export type ProjectDemoData = {
  index: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  heroAlt: string;
  accent: string;
  accentSoft: string;
  github: string;
  stats: Array<{ value: string; label: string }>;
  thesis: string;
  principles: Array<{ label: string; title: string; description: string }>;
  steps: DemoStep[];
  stack: string[];
  boundary: string;
};

type ProjectStyle = CSSProperties & {
  "--project-accent": string;
  "--project-accent-soft": string;
};

export function ProjectDemo({ project }: { project: ProjectDemoData }) {
  const projectStyle: ProjectStyle = {
    "--project-accent": project.accent,
    "--project-accent-soft": project.accentSoft,
  };

  return (
    <main
      style={projectStyle}
      className="relative z-10 min-h-screen overflow-hidden bg-bg-deepest text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[52rem] bg-[radial-gradient(circle_at_50%_0%,var(--project-accent-soft),transparent_62%)]"
      />

      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#050509]/80 px-5 py-4 backdrop-blur-2xl md:px-10">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4">
          <Link
            href="/"
            className="cursor-target text-[12px] font-semibold tracking-[0.16em] text-white no-underline"
          >
            HXY <span className="text-text-muted">/ PROJECTS</span>
          </Link>
          <Link
            href="/#work"
            className="cursor-target rounded-full border border-white/[0.14] px-4 py-2 text-[11px] tracking-[0.08em] text-text-tertiary no-underline transition-colors hover:border-[var(--project-accent)] hover:text-white"
          >
            ← 返回项目栏
          </Link>
        </div>
      </header>

      <section className="relative mx-auto max-w-[1320px] px-5 pb-16 pt-20 md:px-10 md:pb-24 md:pt-28">
        <div className="grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-[fadeUp_0.9s_cubic-bezier(0.16,1,0.3,1)_both]">
            <div className="mb-6 flex items-center gap-3 text-[10px] font-medium tracking-[0.2em] text-[var(--project-accent)] uppercase">
              <span>{project.index}</span>
              <span className="h-px w-10 bg-[var(--project-accent)]" />
              <span>{project.eyebrow}</span>
            </div>
            <h1 className="max-w-4xl font-display text-[clamp(4rem,10vw,8.8rem)] italic leading-[0.84] tracking-[-0.045em] text-white">
              {project.title}
            </h1>
            <p className="mt-7 max-w-xl text-[clamp(1.1rem,2.1vw,1.6rem)] font-light leading-snug text-text-secondary">
              {project.subtitle}
            </p>
          </div>

          <div className="animate-[fadeUp_0.9s_0.12s_cubic-bezier(0.16,1,0.3,1)_both] lg:pb-1">
            <p className="max-w-xl text-[14px] leading-7 text-text-tertiary md:text-[15px]">
              {project.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-target rounded-full bg-[var(--project-accent)] px-5 py-2.5 text-[12px] font-semibold tracking-[0.04em] text-[#050509] no-underline transition-transform hover:-translate-y-0.5"
              >
                GitHub 源码 ↗
              </a>
              <a
                href="#demo"
                className="cursor-target rounded-full border border-white/[0.16] bg-white/[0.04] px-5 py-2.5 text-[12px] font-medium tracking-[0.04em] text-white no-underline transition-colors hover:border-white/35 hover:bg-white/[0.08]"
              >
                查看产品流程 ↓
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 overflow-hidden rounded-[22px] border border-white/[0.12] bg-[#0b0b14] shadow-[0_40px_120px_rgba(0,0,0,0.48)] md:mt-20 md:rounded-[30px]">
          <Image
            src={project.heroImage}
            alt={project.heroAlt}
            width={1672}
            height={941}
            priority
            sizes="(min-width: 1320px) 1240px, calc(100vw - 40px)"
            className="h-auto w-full"
          />
        </div>

        <dl className="grid border-x border-b border-white/[0.08] sm:grid-cols-3">
          {project.stats.map((stat) => (
            <div
              key={stat.label}
              className="border-b border-white/[0.08] px-6 py-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 md:px-8"
            >
              <dt className="text-[10px] tracking-[0.14em] text-text-muted uppercase">
                {stat.label}
              </dt>
              <dd className="mt-2 text-[17px] font-medium text-white">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="relative mx-auto max-w-[1320px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-medium tracking-[0.18em] text-[var(--project-accent)] uppercase">
              Product thesis
            </p>
            <h2 className="mt-4 max-w-md font-display text-[clamp(2.8rem,5vw,5rem)] italic leading-[0.94] tracking-[-0.03em]">
              {project.thesis}
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.08] sm:grid-cols-3">
            {project.principles.map((principle) => (
              <article key={principle.label} className="bg-[#080812] p-6 md:p-8">
                <p className="text-[10px] tracking-[0.15em] text-[var(--project-accent)] uppercase">
                  {principle.label}
                </p>
                <h3 className="mt-5 text-[17px] font-medium leading-snug text-white">
                  {principle.title}
                </h3>
                <p className="mt-3 text-[12px] leading-6 text-text-tertiary">
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="demo" className="relative mx-auto max-w-[1320px] scroll-mt-24 px-5 py-16 md:px-10 md:py-24">
        <div className="mb-12 flex flex-col justify-between gap-5 border-b border-white/[0.1] pb-8 md:mb-16 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] font-medium tracking-[0.18em] text-[var(--project-accent)] uppercase">
              Product demo
            </p>
            <h2 className="mt-3 font-display text-[clamp(3rem,6vw,5.8rem)] italic leading-none tracking-[-0.035em]">
              从输入到结果
            </h2>
          </div>
          <p className="max-w-md text-[12px] leading-6 text-text-tertiary">
            这里展示的均为产品真实界面与完整主流程，不使用概念原型替代实际能力。
          </p>
        </div>

        <div className="space-y-7 md:space-y-10">
          {project.steps.map((step, index) => (
            <article
              key={step.number}
              className="grid overflow-hidden rounded-[22px] border border-white/[0.1] bg-[#0a0a14] lg:grid-cols-[0.34fr_0.66fr]"
            >
              <div className="flex flex-col justify-between border-b border-white/[0.08] p-7 lg:border-b-0 lg:border-r lg:p-9">
                <span className="font-display text-[3.25rem] italic leading-none text-[var(--project-accent)]">
                  {step.number}
                </span>
                <div className="mt-16 lg:mt-32">
                  <p className="text-[9px] tracking-[0.15em] text-text-muted uppercase">
                    Step {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-[22px] font-medium tracking-[-0.02em] text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[12px] leading-6 text-text-tertiary">
                    {step.description}
                  </p>
                </div>
              </div>
              <div className="flex min-h-[260px] items-center justify-center bg-[radial-gradient(circle_at_center,var(--project-accent-soft),transparent_70%)] p-4 sm:p-7 lg:min-h-[440px]">
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  width={step.width}
                  height={step.height}
                  loading="lazy"
                  sizes="(min-width: 1320px) 820px, (min-width: 1024px) 66vw, calc(100vw - 40px)"
                  className="h-auto max-h-[620px] w-full rounded-[12px] object-contain shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[1320px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-8 border-y border-white/[0.1] py-10 md:grid-cols-2 md:gap-16 md:py-14">
          <div>
            <p className="text-[10px] tracking-[0.16em] text-text-muted uppercase">Built with</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/[0.12] bg-white/[0.03] px-3.5 py-2 text-[10px] tracking-[0.08em] text-text-secondary uppercase"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.16em] text-text-muted uppercase">Current boundary</p>
            <p className="mt-5 max-w-xl text-[13px] leading-7 text-text-tertiary">
              {project.boundary}
            </p>
          </div>
        </div>
      </section>

      <footer className="relative px-5 pb-10 pt-16 md:px-10 md:pt-24">
        <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-10 rounded-[24px] border border-white/[0.1] bg-[linear-gradient(135deg,var(--project-accent-soft),rgba(255,255,255,0.02))] p-8 md:flex-row md:items-end md:p-12">
          <div>
            <p className="text-[10px] tracking-[0.17em] text-[var(--project-accent)] uppercase">Explore the build</p>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(2.6rem,5vw,5.2rem)] italic leading-[0.96] tracking-[-0.03em]">
              看见界面，也看见产品判断。
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-target rounded-full bg-white px-5 py-2.5 text-[12px] font-semibold text-[#050509] no-underline"
            >
              打开 GitHub ↗
            </a>
            <Link
              href="/#work"
              className="cursor-target rounded-full border border-white/[0.18] px-5 py-2.5 text-[12px] text-white no-underline"
            >
              查看其他项目
            </Link>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-[1320px] text-[10px] tracking-[0.12em] text-text-muted">
          HXY / EVAN · PRODUCT DEMO {project.index}
        </p>
      </footer>
    </main>
  );
}
