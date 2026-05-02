import type { Metadata } from "next";
import { getAbsoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "隐私政策｜AI应用开发者个人品牌官网",
  description: "说明本站如何处理联系信息、后台内容、AI 客服演示数据和第三方服务配置。",
  alternates: {
    canonical: getAbsoluteUrl("/privacy")
  }
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="section-shell py-16 sm:py-24">
        <a className="text-sm font-semibold text-teal-700" href="/">返回首页</a>
        <article className="mt-8 max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-sm font-semibold text-teal-700">Privacy</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-950">隐私政策</h1>
          <p className="mt-4 text-sm text-slate-500">最近更新：2026-05-02</p>
          <div className="prose-trust mt-8">
            <p>
              本站用于展示 AI 应用开发、网站原型、AI 客服和自动化工具服务。默认情况下，网站不会主动收集敏感个人信息。
              当你通过邮箱、微信或表单联系时，相关信息仅用于需求沟通、项目评估和后续服务跟进。
            </p>
            <h2>后台与数据库</h2>
            <p>
              管理后台使用环境变量中的固定管理员账号密码登录。首页内容、FAQ、案例和联系方式可保存到 Neon Postgres
              等数据库中，用于网站展示和内容维护。
            </p>
            <h2>AI 客服演示</h2>
            <p>
              首版 AI 客服支持模拟聊天降级方案。接入 Dify、Coze 或其他第三方服务后，聊天数据可能由对应平台处理，
              具体以第三方平台的隐私政策和配置为准。
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}
