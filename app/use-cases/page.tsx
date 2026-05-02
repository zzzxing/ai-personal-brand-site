import type { Metadata } from "next";
import { useCases } from "@/lib/zhiye-pages";
import { getAbsoluteUrl, getSiteUrl } from "@/lib/site-url";

const title = "智页 AI Lab 适合参考的使用场景";
const description =
  "说明不同用户应该如何使用智页 AI Lab 的思路开始做 AI 客服、项目展示页、知识库问答页或自动化工具原型。";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: getAbsoluteUrl("/use-cases")
  },
  openGraph: {
    title,
    description,
    url: getAbsoluteUrl("/use-cases"),
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

export default function UseCasesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: getAbsoluteUrl("/use-cases"),
    isPartOf: {
      "@type": "WebSite",
      name: "智页 AI Lab",
      url: getSiteUrl()
    },
    hasPart: useCases.map((item) => ({
      "@type": "WebPage",
      name: item.title,
      description: item.problem
    }))
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="section-shell py-14 sm:py-16 lg:py-24">
        <PageNav />
        <section className="mt-10 max-w-3xl">
          <p className="text-sm font-semibold text-teal-700">Use cases</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-slate-950 md:text-5xl">{title}</h1>
          <p className="mt-5 text-base leading-8 text-slate-600">{description}</p>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-2">
          {useCases.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950">{item.title}</h2>
              <Info label="典型问题" value={item.problem} />
              <Info label="先做什么" value={item.start} />
              <Info label="最小版本" value={item.minimum} />
              <Info label="后续升级方向" value={item.upgrade} />
              <a className="mt-5 inline-flex text-sm font-semibold text-teal-700 hover:text-teal-800" href={item.related}>
                查看对应服务
              </a>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-5">
      <h3 className="text-sm font-semibold text-teal-700">{label}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-600">{value}</p>
    </div>
  );
}

function PageNav() {
  return (
    <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600">
      <a className="font-semibold text-teal-700" href="/">首页</a>
      <a href="/services">服务</a>
      <a href="/answers">问答</a>
      <a href="/starter">启动清单</a>
      <a href="/about">关于</a>
    </nav>
  );
}
