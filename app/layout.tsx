import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const siteUrl = getSiteUrl();
const title = "智页 AI Lab｜AI 客服、项目展示页与轻量 AI 网页原型";
const description =
  "智页 AI Lab 是一个轻量 AI 网页应用样板，面向个人、小企业、教育项目和轻量创业团队，展示如何把 AI 客服、项目展示页、知识库问答、FAQ 问答和自动化工具原型做成可访问、可演示、可继续迭代的网站。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s｜智页 AI Lab"
  },
  description,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title,
    description,
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
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/ai-brand-hero.png"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="zh-CN" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
