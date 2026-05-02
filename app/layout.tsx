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
    default: "曾鑫｜AI应用开发者与智能系统实践者",
    template: "%s"
  },
  description:
    "曾鑫的个人品牌官网，展示自然语言处理、多模态情感分析、大语言模型应用、AI客服、智能体原型、个人品牌网站、小企业落地页与自动化工具开发实践。",
  openGraph: {
    title: "曾鑫｜AI应用开发者与智能系统实践者",
    description:
      "曾鑫的个人品牌官网，展示自然语言处理、多模态情感分析、大语言模型应用、AI客服、智能体原型、个人品牌网站、小企业落地页与自动化工具开发实践。",
    type: "website",
    locale: "zh_CN",
    url: siteUrl,
    siteName: "曾鑫个人品牌官网",
    images: [
      {
        url: "/ai-brand-hero.png",
        width: 960,
        height: 720,
        alt: "曾鑫 AI 应用开发者与智能系统实践者个人官网封面图"
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
