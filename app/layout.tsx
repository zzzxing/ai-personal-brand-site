import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AI应用开发者｜AI客服、智能体与自动化工具服务",
    template: "%s"
  },
  description:
    "个人 AI 应用开发者官网，展示 AI 客服、智能体原型、个人品牌网站、小企业落地页和自动化工具的搭建能力，支持 DeepSeek、Dify、Coze 与 Vercel 部署实践。",
  openGraph: {
    title: "AI应用开发者｜AI客服、智能体与自动化工具服务",
    description:
      "个人 AI 应用开发者官网，展示 AI 客服、智能体原型、个人品牌网站、小企业落地页和自动化工具的搭建能力，支持 DeepSeek、Dify、Coze 与 Vercel 部署实践。",
    type: "website",
    locale: "zh_CN",
    url: siteUrl,
    siteName: "AI应用开发者个人官网",
    images: [
      {
        url: "/ai-brand-hero.png",
        width: 960,
        height: 720,
        alt: "AI应用开发者个人官网封面图"
      }
    ]
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="zh-CN" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
