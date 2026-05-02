import type { Metadata } from "next";
import { defaultContent } from "@/lib/default-content";
import { getAbsoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "联系｜AI客服、网站与自动化工具咨询",
  description: "联系 AI 应用开发者，咨询小企业 AI 客服、个人品牌官网、智能体流程和自动化工具原型。",
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
            <h1 className="mt-4 text-4xl font-semibold text-slate-950">从一个真实问题开始聊</h1>
            <p className="mt-5 text-base leading-8 text-slate-600">
              你可以先用一句话描述需求，例如“我想做一个小企业 AI 客服”“我想做个人品牌官网”
              或“我想把资料整理流程自动化”。首轮沟通会先判断目标用户、上线范围、内容结构和最小可交付版本。
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
                <dt className="text-slate-500">服务方向</dt>
                <dd className="mt-1 font-semibold text-slate-950">AI 客服 / 网站 / 智能体 / 自动化工具</dd>
              </div>
            </dl>
          </div>
        </section>
      </div>
    </main>
  );
}
