import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ada AI导航｜发现真正好用的 AI 工具",
  description:
    "Ada AI导航收录并分类优质 AI 工具，帮助你快速找到适合对话、设计、视频、写作、编程与智能体场景的产品。",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
