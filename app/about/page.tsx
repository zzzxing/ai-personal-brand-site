import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getAbsoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "关于｜AI应用开发者",
  description: "了解本站作者的服务方向、交付原则、技术栈和适合合作的 AI 应用开发场景。",
  alternates: {
    canonical: getAbsoluteUrl("/about")
  }
};

export default function AboutPage() {
  return (
    <TrustPageShell title="关于我" eyebrow="About" updatedAt="2026-05-02">
      <p>
        我是一个面向真实业务场景的 AI 应用开发者，主要帮助小企业、个人品牌、老师和轻量创业项目，把网站、
        AI 客服、智能体流程和自动化工具做成可以上线、可以演示、可以继续迭代的版本。
      </p>
      <h2>服务定位</h2>
      <p>
        本站的核心定位是“AI应用开发者｜用网页、智能体与自动化工具解决真实问题”。首版交付优先关注页面美观、
        稳定部署和服务转化，再逐步扩展后台、数据库、AI 客服、博客、案例和数据看板。
      </p>
      <h2>技术与交付原则</h2>
      <p>
        项目采用 Next.js、React、Tailwind CSS、Vercel、Neon Postgres、Dify/Coze 预留接口等技术方案。
        这些选择的共同目标是降低部署失败风险，让非技术用户也能按步骤完成上线、内容修改和后续优化。
      </p>
      <h2>适合合作的场景</h2>
      <p>
        适合需要快速验证服务表达的小企业官网、AI 客服演示站、课程活动页、个人品牌页、自动化资料整理工具、
        智能体工作流原型和小程序概念验证项目。
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
