import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AI应用开发者｜网页、智能体与自动化工具",
    template: "%s"
  },
  description: "为小企业、个人品牌和教育场景搭建 AI 客服、网页原型、智能体与自动化工具。",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "AI应用开发者个人品牌官网"
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="zh-CN" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
