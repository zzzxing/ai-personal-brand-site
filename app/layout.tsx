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
    default: "智页 AI Lab｜AI客服、项目展示页与小企业AI应用样板间",
    template: "%s"
  },
  description:
    "智页 AI Lab 是面向个人、小企业、教育项目和早期团队的 AI 应用落地样板间，展示 AI 客服、FAQ 问答、DeepSeek 接入、Dify/Coze 方案、项目展示页、后台管理、云数据库与 Vercel 部署实践。",
  openGraph: {
    title: "智页 AI Lab｜AI客服、项目展示页与小企业AI应用样板间",
    description:
      "智页 AI Lab 是面向个人、小企业、教育项目和早期团队的 AI 应用落地样板间，展示 AI 客服、FAQ 问答、DeepSeek 接入、Dify/Coze 方案、项目展示页、后台管理、云数据库与 Vercel 部署实践。",
    type: "website",
    locale: "zh_CN",
    url: siteUrl,
    siteName: "智页 AI Lab",
    images: [
      {
        url: "/ai-brand-hero.png",
        width: 960,
        height: 720,
        alt: "智页 AI Lab 的 AI 客服与网页应用样板间插图"
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
