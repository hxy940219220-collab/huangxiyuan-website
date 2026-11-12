import type { Metadata } from "next";
import { ProjectDemo, type ProjectDemoData } from "../ProjectDemo";

const overviewImage = "/projects/quicknote/current-overview.webp";
const projectDescription = "本地优先的 macOS 便签，支持富文本、离线语音转写和带出处的便签问答，并通过 Codex CLI 和 MCP 双向连接 Codex。";

export const metadata: Metadata = {
  title: "QuickNote · 快速便签 | HXY Projects",
  description: projectDescription,
  alternates: { canonical: "/projects/quicknote" },
  openGraph: {
    title: "QuickNote · 快速便签",
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
    title: "QuickNote · 快速便签",
    description: projectDescription,
    images: [overviewImage],
  },
};

const project: ProjectDemoData = {
  index: "01",
  eyebrow: "QuickNote / Local-first macOS Notes",
  title: "QuickNote",
  subtitle: "随手记下，不离开当前任务。",
  description:
    "双击 Command 打开便签，在本机写富文本、转写语音、搜索正文。选中文字或截取屏幕，就能用 ChatGPT 账号通过 Codex 分析并把结果存入便签。也可以从 Codex 搜索和读取自己授权的 QuickNote 内容。",
  heroImage: overviewImage,
  heroAlt: "QuickNote 的文件夹、便签清单和富文本编辑器",
  accent: "#8B7CFF",
  accentSoft: "rgba(139, 124, 255, 0.14)",
  github: "https://github.com/hxy940219220-collab/QuickNote-IOS",
  stats: [
    { value: "2× ⌘", label: "唤起便签" },
    { value: "RTFD", label: "本机存储" },
    { value: "Codex CLI + MCP", label: "双向连接" },
  ],
  thesis: "记录留在本机，AI 读取由你授权。",
  principles: [
    {
      label: "01 / Capture",
      title: "在当前任务里就能记",
      description: "双击 Command 打开或收起便签。用原生富文本、清单、表格、附件和文件夹整理内容，也可为便签设置标签或切换阅读主题。",
    },
    {
      label: "02 / Local",
      title: "编辑、搜索和转写在本机",
      description: "便签和附件以 RTFD 存在这台 Mac。全文检索和离线语音转写可在设备上完成。自行配置的 API Key 存入 macOS 钥匙串。",
    },
    {
      label: "03 / Access",
      title: "逐项授权 Codex 读取",
      description: "通过 MCP 从 Codex 搜索和读取时，仅开放你勾选的便签集或文件夹，敏感便签始终排除。写入提议需单独开启，且每次由你在 QuickNote 预览并确认。",
    },
  ],
  steps: [
    {
      number: "01",
      title: "使用 ChatGPT 账号连接 Codex",
      description: "安装 Codex CLI 后，在 AI 模型设置中用 ChatGPT 登录，无需另配 API Key。划词、识图、AI 排版、语音整理和便签问答可分别选用 Codex 或配置的 API。你可以切换模型和推理强度，也可以查看 Codex 返回的额度。",
      image: "/projects/quicknote/current-codex-settings.webp",
      imageAlt: "QuickNote 的 AI 模型设置，显示演示用 ChatGPT 账号、用量和推理强度",
      width: 1440,
      height: 1164,
    },
    {
      number: "02",
      title: "从 Codex 读取授权便签",
      description: "通过 MCP 在 Codex 搜索 QuickNote，打开获授权便签的标题与正文。可选开启新建或追加提议，每次都要在 QuickNote 中审核并确认。",
      image: "/projects/quicknote/current-mcp-authorization.webp",
      imageAlt: "QuickNote 的 Codex 读取开关、写入提议开关和授权文件夹",
      width: 784,
      height: 834,
    },
    {
      number: "03",
      title: "全文搜索与带出处的问答",
      description: "按 Command + Shift + F 搜索标题、正文和标签。在「问我的便签」中，本机先检索相关片段，再交给选定模型回答。点回答中的引用可定位原文，敏感便签不进入问答取材。",
      image: "/projects/quicknote/current-note-ask.webp",
      imageAlt: "QuickNote 根据两条合成便签回答问题，回答内标出可点击的原文引用",
      width: 1184,
      height: 594,
    },
    {
      number: "04",
      title: "选中文字，解释、翻译或继续问",
      description: "按 Option + Space 在选区旁打开面板，选择解释、分析、翻译或拓展，也可直接输入问题。按住标题或空白处可移动面板，再次划词时会回到新选区附近。结果可存入指定便签。",
      image: "/projects/quicknote/current-selection.webp",
      imageAlt: "QuickNote 划词面板被拖动后仍显示所选文字和提问输入框",
      width: 832,
      height: 728,
    },
    {
      number: "05",
      title: "截图后提问、提取文字或整理表格",
      description: "按 Command + Shift 框选屏幕区域。预览按比例显示，支持总结要点、提取原文、翻译中文、整理表格、生成待办和排查问题。结果出现时窗口向下展开，图片与分析结果都可存入便签。",
      image: "/projects/quicknote/current-image-result.webp",
      imageAlt: "QuickNote 对社区菜园活动截图进行识图并显示分析结果",
      width: 1440,
      height: 828,
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
      description: "使用清单、表格、附件和文字样式处理笔记。AI 排版先生成标题层级和间距的预览，由你决定是否应用。系统默认之外另有暖纸、鼠尾草、暮光紫、午夜墨和雾蓝五套主题。",
      image: "/projects/quicknote/feature-editing.webp",
      imageAlt: "QuickNote 的文字格式、清单、表格与附件编辑入口",
      width: 1672,
      height: 941,
    },
  ],
  stack: ["Swift 6", "SwiftUI", "AppKit", "RTFD", "Codex CLI", "MCP", "SenseVoice"],
  boundary:
    "支持 macOS 14 及以上。全局快捷键和划词需按系统提示授权，录音需要麦克风权限。Codex CLI 在本机启动，模型推理由 OpenAI 服务处理。使用在线模型时，当前任务需要的文字、图片或检索片段会发送给所选服务。",
};

export default function QuickNoteProjectPage() {
  return <ProjectDemo project={project} />;
}
