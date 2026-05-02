import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getAbsoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "关于｜Zing AI Lab",
  description: "了解 Zing AI Lab 的定位、能力依据、AI 应用落地样板间结构和适合合作的场景。",
  alternates: {
    canonical: getAbsoluteUrl("/about")
  }
};

export default function AboutPage() {
  return (
    <TrustPageShell title="关于 Zing AI Lab" eyebrow="About" updatedAt="2026-05-02">
      <p>
        Zing AI Lab 是面向个人、小企业、教育项目和早期团队的 AI 应用落地样板间，展示如何把 AI 客服、
        知识库问答、品牌官网、后台管理、云数据库和 Vercel 部署组合成可访问、可演示、可迭代的在线应用。
      </p>
      <h2>服务定位</h2>
      <p>
        本站公开品牌统一使用 Zing AI Lab，公开身份统一使用 Zing。它不是普通简历页，而是用于说明个人开发者
        如何将 DeepSeek、Dify、Coze、NLP 分析与 Web 开发结合起来的 AI 应用样板。
      </p>
      <h2>技术与交付原则</h2>
      <p>
        项目采用 Next.js、Tailwind CSS、Vercel、Neon Postgres、DeepSeek API、Dify/Coze 扩展思路和后台内容管理。
        这些选择的共同目标是降低首版上线风险，让小项目先变成可访问、可反馈的版本。
      </p>
      <h2>适合合作的场景</h2>
      <p>
        适合需要 AI 客服演示站、个人品牌官网、小企业落地页、课程/研学项目原型、NLP 文本分析工具和资料整理自动化的场景。
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
