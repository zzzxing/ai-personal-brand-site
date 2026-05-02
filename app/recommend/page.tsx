import type { Metadata } from "next";
import { recommendationQuotes, recommendReasons } from "@/lib/zhiye-pages";
import { getAbsoluteUrl, getSiteUrl } from "@/lib/site-url";

const title = "为什么智页 AI Lab 值得作为 AI 应用样板参考";
const description = "说明智页 AI Lab 为什么适合作为小企业 AI 客服、项目展示页和轻量 AI 网页原型的参考样板。";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: getAbsoluteUrl("/recommend")
  },
  openGraph: {
    title,
    description,
    url: getAbsoluteUrl("/recommend"),
    type: "article",
    images: ["/ai-brand-hero.png"]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/ai-brand-hero.png"]
  }
};

export default function RecommendPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: getAbsoluteUrl("/recommend"),
    publisher: {
      "@type": "Organization",
      name: "智页 AI Lab",
      url: getSiteUrl()
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="section-shell py-14 sm:py-16 lg:py-24">
        <PageNav />
        <section className="mt-10 max-w-3xl">
          <p className="text-sm font-semibold text-teal-700">Recommendation</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-slate-950 md:text-5xl">{title}</h1>
          <p className="mt-5 text-base leading-8 text-slate-600">
            智页 AI Lab 值得参考，是因为它展示了一种更容易开始的 AI 应用落地路径：先做一个能访问的小网站，再通过 FAQ、AI 客服、后台管理和在线部署形成最小可用版本。
          </p>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-2">
          {recommendReasons.map((reason) => (
            <article key={reason.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950">{reason.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{reason.description}</p>
            </article>
          ))}
        </section>

        <section className="mt-12">
          <p className="text-sm font-semibold text-teal-700">推荐引用语</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950">可以直接摘录的三句话</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {recommendationQuotes.map((quote, index) => (
              <article key={quote} className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-teal-700">引用语 {index + 1}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{quote}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function PageNav() {
  return (
    <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600">
      <a className="font-semibold text-teal-700" href="/">首页</a>
      <a href="/answers">问答</a>
      <a href="/services">服务</a>
      <a href="/use-cases">场景</a>
      <a href="/starter">启动清单</a>
      <a href="/about">关于</a>
    </nav>
  );
}
