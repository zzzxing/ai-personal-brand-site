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
    default: "Zing AI Lab｜AI客服、智能体原型与小企业AI应用落地",
    template: "%s"
  },
  description:
    "Zing AI Lab 是面向个人、小企业、教育项目和早期团队的 AI 应用落地样板间，展示 AI 客服、DeepSeek 接入、Dify/Coze 智能体、个人品牌官网、后台管理、云数据库与 Vercel 部署实践。",
  openGraph: {
    title: "Zing AI Lab｜AI客服、智能体原型与小企业AI应用落地",
    description:
      "Zing AI Lab 是面向个人、小企业、教育项目和早期团队的 AI 应用落地样板间，展示 AI 客服、DeepSeek 接入、Dify/Coze 智能体、个人品牌官网、后台管理、云数据库与 Vercel 部署实践。",
    type: "website",
    locale: "zh_CN",
    url: siteUrl,
    siteName: "Zing AI Lab",
    images: [
      {
        url: "/ai-brand-hero.png",
        width: 960,
        height: 720,
        alt: "Zing AI Lab AI 应用落地样板间封面图"
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
