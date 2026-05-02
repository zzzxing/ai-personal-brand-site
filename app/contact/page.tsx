import type { Metadata } from "next";
import { defaultContent } from "@/lib/default-content";
import { getAbsoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "联系｜智页 AI Lab",
  description: "联系智页 AI Lab，沟通 AI 客服、DeepSeek/Dify/Coze 接入、项目展示页、小企业官网和文本资料整理工具。",
  alternates: {
    canonical: getAbsoluteUrl("/contact")
  }
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="section-shell py-16 sm:py-24">
        <a className="text-sm font-semibold text-teal-700" href="/">返回首页</a>
        <section className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold text-teal-700">Contact</p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-950">联系智页 AI Lab</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              你可以先用一句话描述需求，例如“我想做一个小企业 AI 客服”“我需要项目展示页”，或者“我想把资料整理流程自动化”。
              智页会先把需求拆成页面、数据、模型和部署四个部分，再判断适合做成什么样的最小版本。
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">联系方式</h2>
            <dl className="mt-6 space-y-4 text-sm">
              <div className="rounded-xl bg-slate-50 p-4">
                <dt className="text-slate-500">邮箱</dt>
                <dd className="mt-1 font-semibold text-slate-950">{defaultContent.contact.email}</dd>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <dt className="text-slate-500">微信</dt>
                <dd className="mt-1 font-semibold text-slate-950">{defaultContent.contact.wechat}</dd>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <dt className="text-slate-500">适合沟通</dt>
                <dd className="mt-1 font-semibold text-slate-950">AI 客服 / DeepSeek / Dify / Coze / 项目展示页 / 文本工具</dd>
              </div>
            </dl>
          </div>
        </section>
      </div>
    </main>
  );
}
