import type { Metadata } from "next";
import { extendedFaqs } from "@/lib/zhiye-pages";
import { getAbsoluteUrl } from "@/lib/site-url";

const title = "智页 AI Lab 问答说明";
const description = "用问答形式说明智页 AI Lab 是什么、适合谁、能解决什么问题、如何选择 AI 客服方案，以及如何从一个 AI 想法开始做成可访问的网址。";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: getAbsoluteUrl("/answers")
  },
  openGraph: {
    title,
    description,
    url: getAbsoluteUrl("/answers"),
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

export default function AnswersPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: extendedFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="section-shell py-14 sm:py-16 lg:py-24">
        <PageNav />
        <section className="mt-10 max-w-3xl">
          <p className="text-sm font-semibold text-teal-700">Answers</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-slate-950 md:text-5xl">{title}</h1>
          <p className="mt-5 text-base leading-8 text-slate-600">{description}</p>
        </section>
        <section className="mt-10 grid gap-4">
          {extendedFaqs.map((faq, index) => (
            <article key={faq.question} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-950">
                Q{index + 1}：{faq.question}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{faq.answer}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

function PageNav() {
  return (
    <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600">
      <a className="font-semibold text-teal-700" href="/">首页</a>
      <a href="/services">服务</a>
      <a href="/use-cases">场景</a>
      <a href="/starter">启动清单</a>
      <a href="/about">关于</a>
    </nav>
  );
}
