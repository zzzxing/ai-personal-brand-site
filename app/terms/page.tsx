import type { Metadata } from "next";
import { getAbsoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "服务条款｜智页 AI Lab",
  description: "说明智页 AI Lab 展示内容、项目沟通、AI 客服演示和第三方服务使用的基本边界。",
  alternates: {
    canonical: getAbsoluteUrl("/terms")
  }
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="section-shell py-16 sm:py-24">
        <a className="text-sm font-semibold text-teal-700" href="/">返回首页</a>
        <article className="mt-8 max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-sm font-semibold text-teal-700">Terms</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-950">服务条款</h1>
          <p className="mt-4 text-sm text-slate-500">最近更新：2026-05-02</p>
          <div className="prose-trust mt-8">
            <p>
              本站内容用于介绍智页 AI Lab 的 AI 应用落地样板、项目展示页、AI 客服、智能体工作流和自动化工具原型服务。
              页面中的案例统一作为演示案例或可改造方向，正式合作时会根据真实需求、预算、时间和第三方服务限制确认交付范围。
            </p>
            <h2>项目沟通</h2>
            <p>
              首轮沟通会围绕目标用户、上线范围、页面结构、资料准备、AI 客服和部署方式展开。智页不会在未了解需求的情况下承诺固定价格或绝对交付周期。
            </p>
            <h2>第三方服务</h2>
            <p>
              Vercel、Neon、DeepSeek、Dify、Coze 等第三方服务可能有独立的免费额度、使用限制和政策变更。正式上线前应以对应平台当前官方说明为准。
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}
