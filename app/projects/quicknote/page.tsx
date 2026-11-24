import styles from "../../components/QuickNoteShowcase.module.css";
import type { Metadata } from "next";
import { ProjectDemo, type ProjectDemoData } from "../ProjectDemo";

const cover = {
  url: "/projects/quicknote/project-cover.webp",
  width: 1672,
  height: 941,
  alt: "QuickNote 划词翻译与截图识别，展示选中原文、译文、活动截图和识别结果",
};

const screenshotDemo = {
  url: "/projects/quicknote/native-image-pin.webp",
  width: 1440,
  height: 906,
  alt: "QuickNote 在置顶窗口里分析活动截图，显示 AI 答案和存入便签的按钮",
};
const projectDescription = "QuickNote 是一款 macOS AI 便签。划词翻译、截图提问，原图和 AI 答案直接存入便签。支持窗口置顶、本机全文搜索、带引用的便签问答和离线语音转写。";

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
    images: [cover],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickNote · macOS AI 便签",
    description: projectDescription,
    images: [cover.url],
  },
};

const project: ProjectDemoData = {
  index: "01",
  eyebrow: "macOS AI 便签",
  appIcon: "/projects/quicknote/app-icon-current.png",
  title: "QuickNote",
  subtitle: "读到难懂的地方，当场弄懂，顺手记下。",
  description:
    "读资料时，把一段话复制进聊天窗口，再把答案贴回笔记，容易打断思路。用 QuickNote 在选区旁翻译或提问，框选屏幕就能让 AI 读图。原图和答案都能直接存进指定便签，下次读到相关资料再接着补充。",
  heroImage: cover.url,
  heroAlt: cover.alt,
  heroSize: { width: cover.width, height: cover.height },
  accent: "#F5D782",
  accentSoft: "rgba(225, 177, 69, 0.13)",
  github: "https://github.com/hxy940219220-collab/QuickNote-IOS",
  stats: [
    { value: "⌥ Space / ⌘ ⇧", label: "划词 / 截图" },
    { value: "原图 + AI 答案", label: "存入便签" },
    { value: "本机全文搜索", label: "找回笔记" },
  ],
  thesis: "从一段摘录到下次复习，都在同一条便签里。",
  principles: [
    {
      label: "01 / Read",
      title: "留在正在读的页面",
      description: "选中文字或框选图片就能打开分析窗口。点图钉置顶，切到其他窗口查资料时还能对照原文和答案。",
    },
    {
      label: "02 / Save",
      title: "把当时的理解存下来",
      description: "按文件夹和关键词找到目标便签，也可以新建一条。原图、摘录和 AI 结果可以各自存入，方便回头核对细节。",
    },
    {
      label: "03 / Revisit",
      title: "以后还找得回来",
      description: "在这台 Mac 搜索便签标题、正文和标签。记不清关键词时，直接问已有便签，再从回答的引用跳回原文。",
    },
  ],
  demoDescription: "界面截图使用演示资料。从一段外文或一张课程截图开始，看看它们怎样变成能继续整理的便签。",
  steps: [
    {
      number: "01",
      title: "划词后翻译、解释、分析或提问",
      description: "按 Option + Space 在选区旁打开划词窗口。翻译外文、解释术语、拆解论证，或就这段内容追问。把窗口置顶，边核对原文边看答案，再存入指定便签。",
      image: "/projects/quicknote/native-selection-pin.webp",
      imageAlt: "置顶的 QuickNote 划词窗口，显示英文原文、中文译文和存入便签的按钮",
      width: 720,
      height: 466,
    },
    {
      number: "02",
      title: "截图后读图、分析或提问",
      description: "按 Command + Shift 框选屏幕，从课件、图表或网页里提取文字、总结要点、翻译、整理表格或生成待办。也可以直接提问。使用 Codex 时，可在窗口内选择模型和推理强度。截图和答案分别存入便签，随时能对照原图。",
      image: screenshotDemo.url,
      imageAlt: screenshotDemo.alt,
      width: screenshotDemo.width,
      height: screenshotDemo.height,
    },
    {
      number: "03",
      title: "想找以前的笔记，直接搜或问",
      description: "按 Command + Shift + F 搜索标题、正文和标签。「问我的便签」先在本机找相关片段，再交给选用的 AI 回答。点击答案中的引用可回到原文，隐藏和敏感便签不用于问答。",
      image: "/projects/quicknote/current-note-ask.webp",
      imageAlt: "QuickNote 根据两条合成便签回答问题，回答内标出可点击的原文引用",
      width: 1184,
      height: 594,
    },
    {
      number: "04",
      title: "离线语音转写，整理后再存入",
      description: "录音在本机识别为文字，可修改或保留原话。启用语音整理后，选定模型只接收转写文本。整理结果可以新建便签或追加到已有便签。",
      image: "/projects/quicknote/current-voice.webp",
      imageAlt: "QuickNote 语音转写文字、存入便签和 Codex 整理去向",
      width: 680,
      height: 380,
    },
    {
      number: "05",
      title: "富文本编辑与可预览的 AI 排版",
      description: "双击 Command 打开便签，用富文本、清单、表格、附件和文件夹整理资料。AI 排版先给出可预览的调整，由你决定是否应用。",
      image: "/projects/quicknote/editing-toolbar.webp",
      imageAlt: "QuickNote 的文字格式、清单、表格与附件编辑入口",
      width: 996,
      height: 787,
    },
    {
      number: "06",
      title: "用 ChatGPT 账号，或配置模型 API",
      description: "安装 Codex CLI 后，可在「接入 AI 模型」里登录 ChatGPT 账号，无需另外配置 API Key。也可以接入自己的模型服务，为划词、识图和便签整理等任务分别选择模型来源。",
      image: "/projects/quicknote/current-codex-settings.webp",
      imageAlt: "QuickNote 的 AI 模型设置，显示演示用 ChatGPT 账号、用量和推理强度",
      width: 1440,
      height: 1164,
    },
    {
      number: "07",
      title: "让 Codex 查读授权便签，确认后写回",
      description: "通过 MCP 连接后，Codex 可以搜索和读取你勾选位置中的便签，把分散的记录归纳起来。开启写入提议后，新建或追加都要先在 QuickNote 中确认。隐藏和敏感便签始终排除。",
      image: "/projects/quicknote/current-mcp-authorization.webp",
      imageAlt: "QuickNote 的 Codex 读取开关、写入提议开关和授权文件夹",
      width: 784,
      height: 834,
    },
  ],
  stack: ["Swift 6", "SwiftUI", "AppKit", "RTFD", "Codex CLI", "MCP", "SenseVoice"],
  boundary:
    "支持 macOS 14 及以上。便签与附件保存在这台 Mac。全文检索和离线语音转写可以在本机完成。使用在线模型时，本次任务需要的文字、图片或检索片段会发送给所选服务。Codex CLI 在本机启动，ChatGPT 请求仍由 OpenAI 服务处理。",
};

export default function QuickNoteProjectPage() {
  return <div className={styles.showcase}><ProjectDemo project={project} /></div>;
}
