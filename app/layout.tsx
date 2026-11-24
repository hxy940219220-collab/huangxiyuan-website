import type { Metadata } from "next";
import { Newsreader, Noto_Serif_SC, Plus_Jakarta_Sans } from "next/font/google";
import "@free-fonts/zhuque-fangsong/zhuque-fangsong.css";
import "misans/lib/Normal/MiSansVF.min.css";
import "./globals.css";
import { CustomCursor } from "./components/CustomCursor";
import { Particles } from "./components/Particles";

const newsreader = Newsreader({
  weight: "variable",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
  adjustFontFallback: false,
});

const notoSerifSC = Noto_Serif_SC({
  weight: "variable",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-serif",
});

const plusJakarta = Plus_Jakarta_Sans({
  weight: "variable",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  adjustFontFallback: false,
});

const SITE_URL = "https://www.huangxiyuan.net";
const SITE_TITLE = "黄锡源 HXY / AIPM - AI 产品经理";
const SITE_DESCRIPTION =
  "黄锡源 HXY，AI 产品经理。设计个人智能体与多 Agent 工作流，研究 Agent-to-Agent 交接、MCP 工具接入、Harness 和评测。项目包括 Tango、Foldframe、HR 搭档、Framepop 与 QuickNote。";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    url: SITE_URL,
    siteName: "HXY / EVAN",
    locale: "zh_CN",
    images: [
      {
        url: "/HXY-AIPM-poster.jpg",
        width: 3184,
        height: 1792,
        alt: "黄锡源 HXY - AI 产品经理",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/HXY-AIPM-poster.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-CN"
      className={`${newsreader.variable} ${notoSerifSC.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg-deepest text-text-primary font-body">
        <CustomCursor />
        <Particles />
        {children}
      </body>
    </html>
  );
}
