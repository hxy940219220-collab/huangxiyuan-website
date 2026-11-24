import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../showcase.module.css";
import { LightboxProvider, LightboxTrigger, type LightboxItem } from "../LightboxGallery";
import { ProjectPager } from "../ProjectPager";

const title = "PostPilot · AI 内容策划、视觉创作与多端排期工作台";
const description =
  "覆盖 AI 运营策划与五格式打包导出、7 平台仿真手机排版工坊、商业生图/短视频/无限画布/6 维自定义改图、发布排期日历与专用排版草稿箱、14 项技能广场及本机多模型路由的一体化工作台。";
const cover = {
  url: "/projects/postpilot/layout-workshop.webp",
  alt: "PostPilot 仿真手机排版工坊：冷萃茶瓶 3 图笔记实时呈现在小红书仿真手机预览中，支持 7 平台切换、竖排比例裁剪与一键排期发布",
  width: 2880,
  height: 1800,
};

export const metadata: Metadata = {
  title: `${title} | HXY Projects`,
  description,
  alternates: { canonical: "/projects/postpilot" },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/projects/postpilot",
    siteName: "HXY / EVAN",
    locale: "zh_CN",
    images: [cover],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [cover.url],
  },
};

const scenes = [
  {
    id: "planner",
    label: "1. AI 策划台",
    title: "1. AI 运营策划台：一句话跨平台改写，模型与上下文精准掌控",
    description:
      "顶部可自由勾选小红书、抖音、B站、X、Instagram、YouTube、视频号目标平台，一句话或上传参考图即可一鱼多吃产出各端原生语感成稿。输入框右下角紧凑集成上下文 token 占比圆环与逐层零闪烁模型选择器（仅显示模型名与思考强度，鼠标移出自动收起）。",
    image: "/projects/postpilot/planner.webp",
    alt: "PostPilot AI 策划台首页：午夜靛紫轻奢玻璃视觉，右下角集成上下文圆环与精简模型选择器，展示多平台标签与近期实操案例",
    width: 2880,
    height: 1800,
  },
  {
    id: "chat-export",
    label: "2. 点赞与导出",
    title: "2. 对话详情：红心点赞筛选 + Word / PDF / HTML / Excel / Markdown 五格式打包下载",
    description:
      "去掉无实际价值的评分打断，聚焦真实交付闭环：支持对高价值策划内容一键红心点赞沉淀，方便在任务记录中随时筛选复盘；顶栏内置「导出」菜单，可将整段对话与排版正文、表格、素材链接一键打包下载为 Word（.doc）、PDF、HTML、Excel（.csv）与 Markdown。",
    image: "/projects/postpilot/chat-export.webp",
    alt: "PostPilot 对话详情页：顶栏展示已点赞、分享与五格式打包导出菜单，右下角紧凑排布上下文圆环与模型切换器",
    width: 2880,
    height: 1800,
  },
  {
    id: "layout",
    label: "3. 排版工坊",
    title: "3. 仿真手机排版工坊：7 大平台实时预览，一键直达排期发布",
    description:
      "入口严格分离「图文发布」与「视频发布」。右侧仿真手机实时同步小红书、抖音、B站、X、Instagram、YouTube、视频号 7 大平台的成片页与封面流，手机旁配备 3:4 / 1:1 / 4:3 / 原图切换、拖拽微调与裁剪工具；确认后既可「存入草稿箱」，也能点「一键排期发布」自动携带图文与标签进入发布弹框。",
    image: "/projects/postpilot/layout-workshop.webp",
    alt: "PostPilot 排版工坊：高硼硅冷萃茶瓶 3 图笔记实时呈现在小红书仿真手机预览中，底部提供存入草稿箱与一键排期发布",
    width: 2880,
    height: 1800,
  },
  {
    id: "workspace",
    label: "4. 视觉工作台",
    title: "4. 视觉创作工作台：商业主图、写实人像、海报与宣传短片一站生成",
    description:
      "专注于商业视觉资产生产：在一个界面里生成电商产品精修图、写实人物照、品牌海报与 Seedance 商业宣传短片。支持按全部 / 草稿 / 视频 / 图片多维筛选，点开任意成品可查看完整提示词、模型、尺寸与积分消耗。",
    image: "/projects/postpilot/workspace.webp",
    alt: "PostPilot 视觉创作工作台：展示冷萃茶瓶、旗舰钛金属降噪耳机宣传短片、先锋运动鞋、精钢机械腕表与写实人像等商业素材",
    width: 2880,
    height: 1800,
  },
  {
    id: "canvas",
    label: "5. 无限画布",
    title: "5. 无限画布：全屏居中铺陈，画布 @ 引用与多模型协作",
    description:
      "进入画布后自动收起侧边导航，所有图片和视频居中铺开比稿；点中节点即可就近改词、换模型与比例继续出新，右侧画布 Agent 抽屉支持上传本地文件、拖拽参考图、直接 @ 引用画布素材以及文本 / 图片 / 视频三类模型自由切换。",
    image: "/projects/postpilot/canvas.webp",
    alt: "PostPilot 无限画布：居中排布商业人像、产品图与广告大片，底部配备创作与画布 Agent 协作工具栏",
    width: 2880,
    height: 1800,
  },
  {
    id: "remix",
    label: "6. 多维改图",
    title: "6. 多维改图：6 维细化画风与穿搭预设 + 全维度自定义输入",
    description:
      "选好人物照或产品主图后，按「换镜头角度、换光影氛围、换背景场景、换画风质感（细分真人 / 2D / 3D 国风与漫剧流派）、换穿搭造型、换表情动作」六个方向微调；每个下拉框均提供「自定义」入口满足专业精细控图，并支持批量出图与首尾帧转短视频。",
    image: "/projects/postpilot/remix.webp",
    alt: "PostPilot 多维改图：中心展示写实人物主体，左右排布六组含专业预设与自定义输入的微调卡片",
    width: 2880,
    height: 1800,
  },
  {
    id: "publish",
    label: "7. 排期日历",
    title: "7. 发布排期日历：周数与公历节日清晰呈现，点击任意空白格直接排期",
    description:
      "周视图清晰标出当前周数与起止日期（如第 48 周 · 11月23日 - 29日）并保留公历节日，去除繁杂节气干扰。点击任意非过去时间单元格空白处即可基于该时间点直接唤起发布弹框，排期卡片展示真实平台角标与实拍缩略图，支持点击查看详情与拖拽改期。",
    image: "/projects/postpilot/publish-queue.webp",
    alt: "PostPilot 发布排期周日历：展示第 48 周小红书、Instagram 与 X 排期卡片，顶栏集成排期日历与排版草稿箱切换",
    width: 2880,
    height: 1800,
  },
  {
    id: "draft-box",
    label: "8. 排版草稿箱",
    title: "8. 专用「排版草稿箱」：承接排版工坊成稿，一键填入多平台发布区",
    description:
      "彻底剥离发布弹框内多余的创作表单，独立沉淀在排版工坊整理好的待发布图文与短视频草稿。支持按平台快速筛选、点击「一键排期发布」自动匹配平台并预填全部标题、正文、话题与多图，也可点「精修」一键回跳排版工坊继续微调，覆盖 13+ 国内外社媒平台。",
    image: "/projects/postpilot/draft-box.webp",
    alt: "PostPilot 专用排版草稿箱：展示冷萃茶瓶、降噪耳机短片、联名运动鞋与极简桌面等图文/视频待发布草稿卡片",
    width: 2880,
    height: 1800,
  },
  {
    id: "models",
    label: "9. 模型接入",
    title: "9. 模型接入中心：5 大本机引擎 + 第三方 API 快捷条 + 思考强度路由",
    description:
      "顶部优先展示本机已登录的 Antigravity、Codex（GPT）、即梦 AI（实时显示剩余积分）、Grok 与 WorkBuddy，并内置 DeepSeek / 硅基流动 / 智谱 GLM / 通义千问 / OpenAI / Anthropic / Gemini / OpenRouter 第三方 API 快捷接入条；下方四大创作场景独立拆分「使用模型」与「思考强度 / 清晰度」。",
    image: "/projects/postpilot/models-hub.webp",
    alt: "PostPilot 模型接入中心：统一深靛紫渐变图标、五大平台真实 App 徽标、第三方 API 快捷条与四场景模型及思考强度配置",
    width: 2880,
    height: 1800,
  },
  {
    id: "skills",
    label: "10. 技能广场",
    title: "10. 技能管理广场：14 项商业创作工作流与全新清新扁平图标体系",
    description:
      "将多平台运营策划、图像生成、视频生成、短剧解说、视频剪辑、多轨合成、图片精修、字幕移除、风格转绘、出海翻译、视频拆解与封面提取等 14 项高频能力封装为标准化 Skill，配以全新绘制的清新扁平 App 图标体系，支持分类检索与规范查阅。",
    image: "/projects/postpilot/skills-catalog.webp",
    alt: "PostPilot 技能管理广场：展示全部 14 项内置工作流技能与清新扁平风格 App 图标",
    width: 2880,
    height: 1800,
  },
];

const lightboxItems: LightboxItem[] = [
  {
    src: cover.url,
    alt: cover.alt,
    title: "PostPilot · 7 平台仿真手机排版工坊",
    caption:
      "「策划与排版 → 排版工坊」将商业多图素材、AI 辅助写作、7 平台手机实时预览与「存入草稿箱 / 一键排期发布」整合在同一屏。",
  },
  ...scenes.map((scene) => ({
    src: scene.image,
    alt: scene.alt,
    title: scene.title,
    caption: scene.description,
  })),
];

const pageAccent = {
  "--accent": "#a78bfa",
  "--accent-soft": "rgba(167, 139, 250, 0.14)",
} as CSSProperties;

export default function PostPilotProjectPage() {
  return (
    <LightboxProvider items={lightboxItems}>
      <main className={styles.page} style={pageAccent}>
        <header className={styles.header}>
          <div className={styles.wrap}>
            <Link href="/" className={`cursor-target ${styles.wordmark}`}>HXY / EVAN</Link>
            <Link href="/#project-postpilot" className={`cursor-target ${styles.back}`}>← 返回项目栏</Link>
          </div>
        </header>

        <section className={`${styles.wrap} ${styles.hero}`} aria-labelledby="postpilot-title">
          <p className={styles.kicker}>02 · AI 内容策划、视觉创作与多端排期工作台</p>
          <h1 id="postpilot-title">PostPilot</h1>
          <p className={styles.lead}>
            把 AI 多平台策划与五格式导出、7 平台仿真手机排版工坊、商业生图 / 无限画布 / 6 维自定义改图、排期日历与专用排版草稿箱，以及 5 大本机多模型引擎和 14 项商业技能整合进同一个本地优先工作台。
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "22px" }}>
            <a
              href="https://foldframe-studio.vercel.app"
              target="_blank"
              rel="noreferrer"
              className={`cursor-target ${styles.demoLink}`}
              style={{ marginTop: 0 }}
            >
              打开独立展示页 ↗
            </a>
            <a
              href="https://github.com/hxy940219220-collab/postpilot"
              target="_blank"
              rel="noreferrer"
              className={`cursor-target ${styles.demoLink}`}
              style={{
                marginTop: 0,
                background: "rgba(255,255,255,0.04)",
                color: "var(--text)",
                borderColor: "rgba(255,255,255,0.16)",
              }}
            >
              GitHub 源码 ↗
            </a>
            <a
              href="#demo"
              className={`cursor-target ${styles.demoLink}`}
              style={{
                marginTop: 0,
                background: "transparent",
                color: "var(--body-strong)",
                borderColor: "rgba(255,255,255,0.12)",
              }}
            >
              查看 10 组实拍界面 ↓
            </a>
          </div>

          <figure>
            <LightboxTrigger index={0} label="放大查看 PostPilot 排版工坊高清原图" className={styles.heroImage}>
              <Image
                src={cover.url}
                alt={cover.alt}
                width={cover.width}
                height={cover.height}
                quality={92}
                unoptimized
                preload
                sizes="(min-width: 1190px) 1150px, calc(100vw - 40px)"
                className="block h-auto w-full"
              />
            </LightboxTrigger>
            <figcaption className={styles.caption}>
              「策划与排版 → 排版工坊」将商业多图素材、AI 辅助写作、7 平台仿真手机实时预览与「存入草稿箱 / 一键排期发布」整合在同一屏，彻底打通从选题策划到多端排期的最后一公里。
            </figcaption>
          </figure>
        </section>

        <section id="demo" className={`${styles.wrap} ${styles.demo}`} aria-labelledby="postpilot-gallery">
          <div className={styles.demoHeading}>
            <h2 id="postpilot-gallery">核心功能实拍（1–10）</h2>
            <nav aria-label="跳到核心功能" className={styles.jump}>
              {scenes.map((scene) => (
                <a key={scene.id} href={`#${scene.id}`}>{scene.label}</a>
              ))}
            </nav>
          </div>

          {scenes.map((scene, index) => (
            <article id={scene.id} key={scene.id} className={styles.step}>
              <h3>{scene.title}</h3>
              <p>{scene.description}</p>
              <LightboxTrigger
                index={index + 1}
                label={`放大查看：${scene.title}`}
                className={styles.frame}
              >
                <Image
                  src={scene.image}
                  alt={scene.alt}
                  width={scene.width}
                  height={scene.height}
                  quality={92}
                  unoptimized
                  sizes="(min-width: 1190px) 1150px, calc(100vw - 40px)"
                  loading="lazy"
                />
              </LightboxTrigger>
            </article>
          ))}
        </section>

        <ProjectPager currentSlug="postpilot" />

        <footer className={`${styles.wrap} ${styles.footer}`}>
          <p>Next.js 14 · NestJS · MongoDB · 支持直连本机 Antigravity / Codex / 即梦 AI / Grok / WorkBuddy 与 13+ 主流社媒平台</p>
          <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
            <a href="https://foldframe-studio.vercel.app" target="_blank" rel="noreferrer">独立展示页 ↗</a>
            <a href="https://github.com/hxy940219220-collab/postpilot" target="_blank" rel="noreferrer">GitHub ↗</a>
            <Link href="/#work">返回全部项目 ↗</Link>
          </div>
        </footer>
      </main>
    </LightboxProvider>
  );
}
