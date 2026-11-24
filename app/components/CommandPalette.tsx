"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowElbowDownLeft,
  ArrowUpRight,
  Article,
  Check,
  Copy,
  Cpu,
  FolderOpen,
  GithubLogo,
  MagnifyingGlass,
  Sparkle,
} from "@phosphor-icons/react";

type PaletteGroup = "代表项目" | "研究归档" | "AI 工具栈" | "快捷操作";

type PaletteItem = {
  id: string;
  group: PaletteGroup;
  title: string;
  subtitle: string;
  keywords: string;
  kind: "route" | "external" | "project-anchor" | "tool" | "section" | "copy-email";
  target: string;
};

const PALETTE_ITEMS: PaletteItem[] = [
  // 代表项目
  {
    id: "proj-tango",
    group: "代表项目",
    title: "01 · Tango · 跨境电商 AI 工作台",
    subtitle: "多专家接力完成竞品研究、Listing 文案与主图交付",
    keywords: "tango 跨境 电商 amazon 多专家 agent 工作台",
    kind: "route",
    target: "/projects/tango",
  },
  {
    id: "proj-foldframe",
    group: "代表项目",
    title: "02 · Foldframe · AI 内容创作与多端发布工作台",
    subtitle: "商业生图、短视频、手机排版与 13 平台分发 + 本机模型接入",
    keywords: "foldframe 小红书 抖音 社媒 发布 画布 生图 视频 antigravity codex",
    kind: "route",
    target: "/projects/foldframe",
  },
  {
    id: "proj-hr",
    group: "代表项目",
    title: "03 · HR 搭档 · AI 人事工作台",
    subtitle: "组织地图、薪酬绩效台账与岗位 AI 面试协作",
    keywords: "hr 搭档 人事 招聘 简历 面试 薪酬 组织地图 企业",
    kind: "route",
    target: "/projects/hr-studio",
  },
  {
    id: "proj-framepop",
    group: "代表项目",
    title: "04 · Framepop · 灵感设计 AI 工作台",
    subtitle: "节点画布编排文案、分镜与多视频生成模型",
    keywords: "framepop 分镜 画布 视频 kling seedance vidu",
    kind: "route",
    target: "/projects/framepop",
  },
  {
    id: "proj-quicknote",
    group: "代表项目",
    title: "05 · QuickNote · AI 便签",
    subtitle: "macOS 文字/图片识别、全文检索与 Codex MCP 便签授权",
    keywords: "quicknote macos swift 便签 翻译 识图 mcp codex",
    kind: "route",
    target: "/projects/quicknote",
  },
  {
    id: "proj-eureka",
    group: "代表项目",
    title: "06 · 尤里卡 · IP 内容创作",
    subtitle: "联网热点核验、结构化视频脚本与逐字口播稿工作台",
    keywords: "eureka 尤里卡 口播 脚本 内容 ip electron",
    kind: "route",
    target: "/projects/eureka",
  },
  {
    id: "proj-call-home",
    group: "代表项目",
    title: "07 · Call Home · 给父母的一通电话",
    subtitle: "Raspberry Pi 5 + STM32 距离感知与听筒三态互动装置",
    keywords: "call home 树莓派 stm32 硬件 嵌入式 装置",
    kind: "project-anchor",
    target: "#project-call-home",
  },
  {
    id: "proj-claude-signal",
    group: "代表项目",
    title: "08 · Claude Signal · 实体审批台",
    subtitle: "ESP32-S3 多会话状态指示与街机键硬件审批原型",
    keywords: "claude signal esp32 硬件 审批 oled 嵌入式",
    kind: "project-anchor",
    target: "#project-claude-signal",
  },

  // 研究归档
  {
    id: "res-agent-product",
    group: "研究归档",
    title: "个人智能体与多 Agent 产品设计",
    subtitle: "记忆与权限隔离、多专家分工、A2A / MCP 与任务级评测",
    keywords: "研究 agent a2a mcp 评测 权限 记忆",
    kind: "route",
    target: "/research/agent-product",
  },
  {
    id: "res-timeline",
    group: "研究归档",
    title: "AI 前沿时间线",
    subtitle: "追踪 GPT-6.2、Claude 5、Gemini 4 与托管运行时演进",
    keywords: "前沿 时间线 timeline 模型 演进",
    kind: "external",
    target: "/ai-frontier-timeline.html",
  },
  {
    id: "res-harness",
    group: "研究归档",
    title: "Harness Engineering",
    subtitle: "上下文、验证器、反馈闭环与长任务恢复机制",
    keywords: "harness engineering 验证 恢复 工程",
    kind: "external",
    target: "/harness-engineering.html",
  },
  {
    id: "res-claude-code",
    group: "研究归档",
    title: "Claude Code 源码设计逻辑",
    subtitle: "拆解客户端任务组织、工具协作与工程映射产品判断",
    keywords: "claude code 源码 拆解 架构",
    kind: "external",
    target: "https://learn-claude-code-visual.vercel.app/index.html",
  },
  {
    id: "res-hermes",
    group: "研究归档",
    title: "Hermes × OpenClaw 历史对比",
    subtitle: "早期个人智能体的消息入口、记忆与本地执行范式对比",
    keywords: "hermes openclaw 对比 历史 个人智能体",
    kind: "external",
    target: "/hermes-vs-openclaw.html",
  },

  // AI 工具栈
  {
    id: "tool-gpt",
    group: "AI 工具栈",
    title: "GPT (GPT-6.2 Astra / Sol)",
    subtitle: "复杂推理、产品研究与代码评审",
    keywords: "gpt openai astra sol 工具",
    kind: "tool",
    target: "tool-gpt",
  },
  {
    id: "tool-claude",
    group: "AI 工具栈",
    title: "Claude (Fable 5.2 / Opus 5.5)",
    subtitle: "技术问题拆解、架构评审与长任务规划",
    keywords: "claude anthropic fable opus 工具",
    kind: "tool",
    target: "tool-claude",
  },
  {
    id: "tool-grok-bot",
    group: "AI 工具栈",
    title: "Grok Bot",
    subtitle: "云端授权执行日常信息整理与跨应用任务",
    keywords: "grok xai bot personal agent 工具",
    kind: "tool",
    target: "tool-grok-bot",
  },
  {
    id: "tool-gemini",
    group: "AI 工具栈",
    title: "Gemini (Gemini 4 Carbon)",
    subtitle: "多模态文档、图表与截图对照研究",
    keywords: "gemini google carbon 多模态 工具",
    kind: "tool",
    target: "tool-gemini",
  },
  {
    id: "tool-deepseek-harness",
    group: "AI 工具栈",
    title: "DeepSeek Harness (V4.1 Flash)",
    subtitle: "代码阅读、改动定位与执行轨迹核验",
    keywords: "deepseek flash harness 工具",
    kind: "tool",
    target: "tool-deepseek-harness",
  },
  {
    id: "tool-typeless",
    group: "AI 工具栈",
    title: "Typeless",
    subtitle: "口述想法实时转成结构化需求与任务说明",
    keywords: "typeless 语音 输入 口述 工具",
    kind: "tool",
    target: "tool-typeless",
  },

  // 快捷操作
  {
    id: "act-copy-email",
    group: "快捷操作",
    title: "复制联系邮箱",
    subtitle: "hxy940219220@gmail.com",
    keywords: "email 邮箱 联系 复制 mail",
    kind: "copy-email",
    target: "hxy940219220@gmail.com",
  },
  {
    id: "act-github",
    group: "快捷操作",
    title: "打开 GitHub 主页",
    subtitle: "github.com/hxy940219220-collab",
    keywords: "github 源码 仓库 开源",
    kind: "external",
    target: "https://github.com/hxy940219220-collab",
  },
  {
    id: "act-about",
    group: "快捷操作",
    title: "跳转到「关于我」",
    subtitle: "了解黄锡源的产品方法与实践背景",
    keywords: "about 关于 个人简介 经历",
    kind: "section",
    target: "#about",
  },
];

const GROUP_ORDER: PaletteGroup[] = ["代表项目", "研究归档", "AI 工具栈", "快捷操作"];

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (next: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const close = useCallback(() => {
    onOpenChange(false);
    setQuery("");
    setSelectedIndex(0);
  }, [onOpenChange]);

  // 全局 ⌘K / Ctrl+K 快捷键开关
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) {
          close();
        } else {
          setQuery("");
          setSelectedIndex(0);
          onOpenChange(true);
        }
      } else if (event.key === "Escape" && open) {
        event.preventDefault();
        close();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange, close]);

  // 打开时聚焦搜索框并锁定页面滚动
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
    return () => {
      document.body.style.overflow = prevOverflow;
      window.cancelAnimationFrame(frame);
    };
  }, [open]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PALETTE_ITEMS;
    return PALETTE_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q)
    );
  }, [query]);

  const safeIndex =
    filteredItems.length === 0 ? 0 : Math.min(selectedIndex, filteredItems.length - 1);

  useEffect(() => {
    if (!open) return;
    itemRefs.current[safeIndex]?.scrollIntoView({ block: "nearest" });
  }, [safeIndex, open]);

  const executeItem = useCallback(
    async (item: PaletteItem) => {
      if (item.kind === "copy-email") {
        try {
          await navigator.clipboard.writeText(item.target);
        } catch {
          const ta = document.createElement("textarea");
          ta.value = item.target;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
        }
        setCopiedEmail(true);
        window.setTimeout(() => {
          setCopiedEmail(false);
          close();
        }, 650);
        return;
      }

      close();

      if (item.kind === "route") {
        router.push(item.target);
        return;
      }

      if (item.kind === "external") {
        window.open(item.target, "_blank", "noopener,noreferrer");
        return;
      }

      if (item.kind === "project-anchor") {
        window.dispatchEvent(new CustomEvent("hxy:reveal-project", { detail: item.target.slice(1) }));
        window.requestAnimationFrame(() => {
          document.querySelector(item.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        return;
      }

      if (item.kind === "tool") {
        window.dispatchEvent(new CustomEvent("hxy:select-tool", { detail: item.target }));
        document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      if (item.kind === "section") {
        document.querySelector(item.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [close, router]
  );

  const renderLeadingIcon = (item: PaletteItem) => {
    if (item.kind === "copy-email") {
      return copiedEmail ? (
        <Check size={16} weight="bold" className="text-neon-cyan" />
      ) : (
        <Copy size={16} weight="light" />
      );
    }
    if (item.id === "act-github") return <GithubLogo size={16} weight="light" />;
    if (item.group === "代表项目") {
      return item.kind === "project-anchor" ? (
        <Cpu size={16} weight="light" />
      ) : (
        <FolderOpen size={16} weight="light" />
      );
    }
    if (item.group === "研究归档") return <Article size={16} weight="light" />;
    return <Sparkle size={16} weight="light" />;
  };

  let runningIndex = -1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="全站快速检索面板"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          onClick={close}
          className="fixed inset-0 z-[9995] flex items-start justify-center bg-[#050509]/78 px-4 pt-[11vh] backdrop-blur-xl"
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                if (filteredItems.length > 0) {
                  setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
                }
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                if (filteredItems.length > 0) {
                  setSelectedIndex(
                    (prev) => (prev - 1 + filteredItems.length) % filteredItems.length
                  );
                }
              } else if (e.key === "Enter" && filteredItems[safeIndex]) {
                e.preventDefault();
                void executeItem(filteredItems[safeIndex]);
              }
            }}
            className="w-full max-w-[580px] overflow-hidden rounded-[20px] border border-white/[0.13] bg-[rgba(11,11,22,0.97)] shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_32px_100px_rgba(0,0,0,0.75)]"
          >
            {/* Search Input Header */}
            <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3.5">
              <MagnifyingGlass size={17} weight="light" className="shrink-0 text-neon-cyan" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="搜索项目、前沿研究、AI 工具栈或复制邮箱…"
                aria-label="搜索全站内容"
                className="w-full border-0 bg-transparent font-body text-[14px] text-[#f5f7ff] placeholder:text-text-muted focus:outline-none"
              />
              <button
                type="button"
                onClick={close}
                className="shrink-0 rounded-md border border-white/[0.12] bg-white/[0.04] px-2 py-0.5 font-body text-[10.5px] tracking-[0.06em] text-text-muted transition-colors hover:border-white/[0.25] hover:text-text-secondary cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-[56vh] overflow-y-auto p-2">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center font-body text-[13px] text-text-muted">
                  未找到匹配的条目，试试输入「Tango」「HR」「MCP」或「邮箱」
                </div>
              ) : (
                GROUP_ORDER.map((group) => {
                  const groupItems = filteredItems.filter((item) => item.group === group);
                  if (groupItems.length === 0) return null;
                  return (
                    <div key={group} className="mb-2 last:mb-0">
                      <p className="px-3 pb-1.5 pt-2 font-body text-[10.5px] font-medium tracking-[0.14em] text-text-muted uppercase">
                        {group}
                      </p>
                      <div className="space-y-0.5">
                        {groupItems.map((item) => {
                          runningIndex += 1;
                          const itemIdx = runningIndex;
                          const active = itemIdx === safeIndex;
                          return (
                            <button
                              key={item.id}
                              ref={(el) => {
                                itemRefs.current[itemIdx] = el;
                              }}
                              type="button"
                              onMouseEnter={() => setSelectedIndex(itemIdx)}
                              onClick={() => void executeItem(item)}
                              className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-colors cursor-pointer ${
                                active
                                  ? "bg-neon-cyan/[0.11] text-[#f5f7ff]"
                                  : "bg-transparent text-text-secondary hover:bg-white/[0.04]"
                              }`}
                            >
                              <div className="flex min-w-0 items-center gap-3">
                                <span
                                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                                    active
                                      ? "border-neon-cyan/40 bg-neon-cyan/[0.12] text-neon-cyan"
                                      : "border-white/[0.09] bg-white/[0.03] text-text-tertiary"
                                  }`}
                                >
                                  {renderLeadingIcon(item)}
                                </span>
                                <div className="min-w-0">
                                  <p className="truncate font-body text-[13px] font-medium text-[#f5f7ff]">
                                    {item.kind === "copy-email" && copiedEmail
                                      ? "已复制邮箱到剪贴板 ✓"
                                      : item.title}
                                  </p>
                                  <p className="truncate font-body text-[11.5px] text-text-tertiary">
                                    {item.subtitle}
                                  </p>
                                </div>
                              </div>

                              <span
                                className={`shrink-0 transition-opacity ${
                                  active ? "text-neon-cyan opacity-100" : "text-text-muted opacity-45"
                                }`}
                                aria-hidden="true"
                              >
                                {item.kind === "external" ? (
                                  <ArrowUpRight size={14} weight="regular" />
                                ) : (
                                  <ArrowElbowDownLeft size={14} weight="regular" />
                                )}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Hints */}
            <div className="flex items-center justify-between border-t border-white/[0.07] bg-[#080812]/80 px-4 py-2.5 font-body text-[11px] text-text-muted">
              <div className="flex items-center gap-4">
                <span>↑↓ 切换条目</span>
                <span>↵ 立即直达</span>
              </div>
              <span className="tracking-[0.06em]">HXY · QUICK NAV</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
