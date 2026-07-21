import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "./components/SmoothScroll";
import { CustomCursor } from "./components/CustomCursor";
import { Particles } from "./components/Particles";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const SITE_URL = "https://www.huangxiyuan.net";
const SITE_TITLE = "黄锡源 HXY / AIPM - AI 产品经理";
const SITE_DESCRIPTION =
  "黄锡源 (HXY)，AI 产品经理。聚焦模型应用、Agent 系统与软硬件原型，把前沿能力做成可运行、可验证、能迭代的产品。";

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
      className={`${instrumentSerif.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg-deepest text-text-primary font-body">
        <SmoothScroll />
        <CustomCursor />
        <Particles />
        {children}
      </body>
    </html>
  );
}
