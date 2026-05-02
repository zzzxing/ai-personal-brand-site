import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getAbsoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "关于｜智页 AI Lab",
  description: "了解智页 AI Lab 的服务定位、AI 应用样板间结构、适合场景和轻量项目交付方式。",
  alternates: {
    canonical: getAbsoluteUrl("/about")
  }
};

export default function AboutPage() {
  return (
    <TrustPageShell title="关于智页 AI Lab" eyebrow="About" updatedAt="2026-05-02">
      <p>
        智页 AI Lab 是面向个人、小企业、教育项目和早期团队的 AI 应用落地样板间。它不是一页普通介绍，而是展示如何把
        AI 客服、FAQ 问答、项目展示页、后台内容管理、云数据库和 Vercel 部署组合成一个能访问、能演示、能继续改的网页应用。
      </p>
      <h2>服务定位</h2>
      <p>
        智页更适合从小而完整的版本开始：先做一个能打开的网址，讲清楚服务、项目、资料和联系入口，再根据真实访问和提问继续优化。
        对于小企业、个人品牌、课程项目或早期 AI 想法，这比一开始规划复杂系统更容易落地。
      </p>
      <h2>技术与交付原则</h2>
      <p>
        智页优先使用 Next.js、Tailwind CSS、Vercel、Neon Postgres、DeepSeek API，以及 Dify/Coze 的智能体扩展思路。
        这些选择的共同目标是降低首版上线风险，让项目先变成可访问、可反馈、可维护的版本。
      </p>
      <h2>适合沟通的场景</h2>
      <p>
        适合需要 AI 客服演示站、个人品牌官网、小企业落地页、课程或研学项目原型、FAQ 问答页、文本资料整理工具和轻量自动化流程的场景。
      </p>
    </TrustPageShell>
  );
}

function TrustPageShell({
  title,
  eyebrow,
  updatedAt,
  children
}: {
  title: string;
  eyebrow: string;
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="section-shell py-16 sm:py-24">
        <a className="text-sm font-semibold text-teal-700" href="/">返回首页</a>
        <article className="mt-8 max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-sm font-semibold text-teal-700">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-950">{title}</h1>
          <p className="mt-4 text-sm text-slate-500">最近更新：{updatedAt}</p>
          <div className="prose-trust mt-8">{children}</div>
        </article>
      </div>
    </main>
  );
}
