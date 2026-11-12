import type { Metadata } from "next";
import { ProjectDemo, type ProjectDemoData } from "../ProjectDemo";

const overviewImage = "/projects/quicknote/current-overview.webp";
const projectDescription = "QuickNote 是一款 macOS AI 便签。选中文字或截图，让 AI 翻译、解释、分析或回答问题，再把结果直接存入便签。支持 ChatGPT 账号登录与模型 API，也可通过 MCP 连接本机 Codex。";

export const metadata: Metadata = {
  title: "QuickNote · macOS AI 便签 | HXY Projects",
  description: projectDescription,
  alternates: { canonical: "/projects/quicknote" },
  openGraph: {
    title: "QuickNote · macOS AI 便签",
    description: projectDescription,
    type: "website",
    url: "/projects/quicknote",
    siteName: "HXY / EVAN",
    locale: "zh_CN",
    images: [
      {
        url: overviewImage,
        width: 1672,
        height: 941,
        alt: "QuickNote 的文件夹、便签清单和富文本编辑器",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickNote · macOS AI 便签",
    description: projectDescription,
    images: [overviewImage],
  },
};

const project: ProjectDemoData = {
  index: "01",
  eyebrow: "macOS AI 便签",
  title: "QuickNote",
  subtitle: "选中文字或截图，让 AI 分析并存入便签。",
  description:
    "读资料时遇到难懂的一段，可以划词让 AI 解释。看到一张图表，可以截图提取重点或直接提问。把有用的结果存进指定便签，读到新资料时再接着补充和整理，让笔记跟着自己的理解一起更新。",
  heroImage: overviewImage,
  heroAlt: "QuickNote 的文件夹、便签清单和富文本编辑器",
  accent: "#8B7CFF",
  accentSoft: "rgba(139, 124, 255, 0.14)",
  github: "https://github.com/hxy940219220-collab/QuickNote-IOS",
  stats: [
    { value: "划词 / 截图", label: "选取资料" },
    { value: "直接存入便签", label: "保留分析结果" },
    { value: "ChatGPT 账号 / API", label: "选择 AI 接入方式" },
  ],
  thesis: "把摘录、分析和后续整理留在同一条便签里。",
  principles: [
    {
      label: "01 / Record",
      title: "把理解存回正在整理的笔记",
      description: "从当前选区或截图发起分析，结果可以直接存入指定便签。下次学到相关内容，再补进同一条笔记。",
    },
    {
      label: "02 / Connect",
      title: "两种方式接入 AI",
      description: "可以通过本机 Codex CLI 使用 ChatGPT 账号，无需填写 API Key。也可以配置模型服务的 API，按功能选择使用哪种方式。",
    },
    {
      label: "03 / Access",
      title: "让本机 Codex 整理你授权的便签",
      description: "通过 MCP，Codex 可以搜索和读取你勾选位置里的非敏感便签，再提出新建或追加建议。每次写入前，都在 QuickNote 里由你审核并确认。",
    },
  ],
  steps: [
    {
      number: "01",
      title: "划词后翻译、解释、分析或提问",
      description: "选中一段文字，按 Option + Space 打开划词面板。可以翻译外文、解释术语、分析一段论证，也可以就选中的内容提问。挑出有用的结果，直接存入你正在整理的便签。",
      image: "/projects/quicknote/current-selection.webp",
      imageAlt: "QuickNote 划词面板显示所选文字、AI 操作和提问输入框",
      width: 832,
      height: 728,
    },
    {
      number: "02",
      title: "截图后读图、分析或提问",
      description: "按 Command + Shift 框选屏幕。对截图提取文字、翻译、总结重点、整理表格，或输入自己的问题。图片和分析结果都可以存入便签，方便之后对照原图继续补充。",
      image: "/projects/quicknote/current-image-result.webp",
      imageAlt: "QuickNote 分析社区菜园活动截图，并显示结果与存入便签入口",
      width: 1440,
      height: 828,
    },
    {
      number: "03",
      title: "用 ChatGPT 账号登录，或配置模型 API",
      description: "安装 Codex CLI 后，可在 QuickNote 的 AI 模型设置里登录 ChatGPT 账号，无需另填 API Key。已有模型服务的话，也可以配置它的 API。划词、识图、排版、语音整理和便签问答可以分别选择接入方式。",
      image: "/projects/quicknote/current-codex-settings.webp",
      imageAlt: "QuickNote 的 AI 模型设置，显示演示用 ChatGPT 账号、用量和推理强度",
      width: 1440,
      height: 1164,
    },
    {
      number: "04",
      title: "让本机 Codex 读取、整理并提议写回",
      description: "把本机 Codex 通过 MCP 接到 QuickNote，即可搜索和阅读获授权便签的标题与正文，归纳分散在多条便签中的内容。开启写入提议后，Codex 可以建议新建或追加。内容由你在 QuickNote 内确认后写入，敏感便签始终排除。",
      image: "/projects/quicknote/current-mcp-authorization.webp",
      imageAlt: "QuickNote 的 Codex 读取开关、写入提议开关和授权文件夹",
      width: 784,
      height: 834,
    },
    {
      number: "05",
      title: "全文搜索与带出处的问答",
      description: "按 Command + Shift + F 搜索标题、正文和标签。在「问我的便签」中，本机先检索相关片段，再交给选定模型回答。点回答中的引用可定位原文，敏感便签不进入问答取材。",
      image: "/projects/quicknote/current-note-ask.webp",
      imageAlt: "QuickNote 根据两条合成便签回答问题，回答内标出可点击的原文引用",
      width: 1184,
      height: 594,
    },
    {
      number: "06",
      title: "离线语音转写，整理后再存入",
      description: "录音在本机识别为文字，可修改或保留原话。启用语音整理后，选定模型只接收转写文本。整理结果可以新建便签或追加到已有便签。",
      image: "/projects/quicknote/current-voice.webp",
      imageAlt: "QuickNote 语音转写文字、存入便签和 Codex 整理去向",
      width: 680,
      height: 380,
    },
    {
      number: "07",
      title: "富文本编辑与可预览的 AI 排版",
      description: "双击 Command 打开便签，用清单、表格、附件和文字样式整理积累下来的内容。AI 排版先生成标题层级和间距的预览，由你决定是否应用。",
      image: "/projects/quicknote/feature-editing.webp",
      imageAlt: "QuickNote 的文字格式、清单、表格与附件编辑入口",
      width: 1672,
      height: 941,
    },
  ],
  stack: ["Swift 6", "SwiftUI", "AppKit", "RTFD", "Codex CLI", "MCP", "SenseVoice"],
  boundary:
    "支持 macOS 14 及以上。便签与附件保存在这台 Mac。全文检索和离线语音转写可以在本机完成。使用在线模型时，本次任务需要的文字、图片或检索片段会发送给所选服务。Codex CLI 在本机启动，ChatGPT 请求仍由 OpenAI 服务处理。",
};

export default function QuickNoteProjectPage() {
  return <ProjectDemo project={project} />;
}
