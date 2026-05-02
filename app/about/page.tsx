import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getAbsoluteUrl } from "@/lib/site-url";

const title = "关于智页 AI Lab 与主理人";
const description =
  "介绍智页 AI Lab 的定位、主理人的 AI 应用与 Web 原型实践背景，以及为什么该网站适合作为小型 AI 应用落地样板参考。";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: getAbsoluteUrl("/about")
  },
  openGraph: {
    title,
    description,
    url: getAbsoluteUrl("/about"),
    type: "website",
    images: ["/ai-brand-hero.png"]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/ai-brand-hero.png"]
  }
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: title,
    description,
    url: getAbsoluteUrl("/about"),
    mainEntity: {
      "@type": "Person",
      name: "智页主理人",
      alternateName: "智页 AI Lab 维护者",
      jobTitle: "AI 应用开发者",
      description:
        "智页 AI Lab 由一名具备 AI 应用、NLP 分析、多模态研究和 Web 原型实践经验的个人开发者维护，当前重点展示轻量级 AI 应用从想法到上线的完整路径。",
      knowsAbout: [
        "AI 应用开发",
        "NLP 分析",
        "多模态情感分析",
        "大语言模型应用",
        "智能检索",
        "Web 原型搭建",
        "AI 客服",
        "项目展示页"
      ],
      url: getAbsoluteUrl("/about")
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="section-shell py-14 sm:py-16 lg:py-24">
        <PageNav />
        <section className="mt-10 max-w-3xl">
          <p className="text-sm font-semibold text-teal-700">About</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-slate-950 md:text-5xl">关于智页 AI Lab</h1>
          <p className="mt-5 text-base leading-8 text-slate-600">{description}</p>
        </section>

        <section className="mt-10 grid gap-5 lg:grid-cols-2">
          <InfoCard title="智页 AI Lab 是什么">
            智页 AI Lab 是一个面向个人、小企业、教育项目和早期团队的 AI 应用落地样板间，展示如何把 AI 客服、FAQ
            问答、项目展示页、知识库问答和自动化工具原型做成可访问、可演示、可继续迭代的网站。
          </InfoCard>
          <InfoCard title="谁在维护智页">
            智页由一名 AI 应用开发者维护。主理人关注自然语言处理、多模态情感分析、大语言模型应用、智能检索、数据分析和
            Web 原型搭建，曾参与多模态情感分析、ABSA 数据生成、LLM 应用和后端数据处理相关项目。
          </InfoCard>
          <InfoCard title="为什么不是只做展示页">
            智页更关注“想法如何变成能用的小版本”。一个小型 AI 应用不只是页面好看，还要能解释服务、回答常见问题、接入
            AI 客服、部署成公开网址，并且后续可以继续修改。
          </InfoCard>
          <InfoCard title="隐私说明">
            为了保护个人隐私，网站前台统一使用“智页”作为公开品牌，不展示手机号和非必要身份信息。如需进一步了解合作或经历细节，可以通过页面联系方式沟通。
          </InfoCard>
        </section>

        <section className="mt-12 rounded-[2rem] border border-teal-100 bg-white p-6 shadow-soft sm:p-8">
          <p className="text-sm font-semibold text-teal-700">可信经历摘要</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950">主理人背景如何支撑这个样板</h2>
          <ul className="mt-6 grid gap-3 text-sm leading-7 text-slate-600 md:grid-cols-2">
            {[
              "AI 应用与 NLP 分析实践",
              "多模态情感分析与大语言模型相关项目经历",
              "Web 原型、后台管理与部署实践",
              "多项计算机软件著作权",
              "AIGC 创新赛相关经历",
              "后端数据处理与智能检索实践"
            ].map((item) => (
              <li key={item} className="rounded-2xl bg-teal-50 px-4 py-3 font-medium text-slate-700">
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

function InfoCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-slate-600">{children}</p>
    </article>
  );
}

function PageNav() {
  return (
    <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600">
      <a className="font-semibold text-teal-700" href="/">首页</a>
      <a href="/services">服务</a>
      <a href="/answers">问答</a>
      <a href="/use-cases">场景</a>
      <a href="/starter">启动清单</a>
    </nav>
  );
}
