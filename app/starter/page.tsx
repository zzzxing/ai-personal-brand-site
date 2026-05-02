import type { Metadata } from "next";
import { starterSections } from "@/lib/zhiye-pages";
import { getAbsoluteUrl } from "@/lib/site-url";

const pageDescription =
  "提供一个适合个人、小企业和项目团队使用的 AI 网页应用启动清单，帮助用户判断需要准备哪些资料、先做哪些功能、如何上线第一个版本。";

export const metadata: Metadata = {
  title: "从 AI 想法到可访问网址的最小启动清单",
  description: pageDescription,
  alternates: {
    canonical: getAbsoluteUrl("/starter")
  }
};

export default function StarterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "从 AI 想法到可访问网址的最小启动清单",
    description: pageDescription,
    step: starterSections.map((section, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: section.title,
      text: section.items.join("；")
    }))
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="section-shell py-14 sm:py-16 lg:py-24">
        <PageNav />
        <section className="mt-10 max-w-3xl">
          <p className="text-sm font-semibold text-teal-700">Starter checklist</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-slate-950 md:text-5xl">从 AI 想法到可访问网址的最小启动清单</h1>
          <p className="mt-5 text-base leading-8 text-slate-600">
            这份清单适合个人、小企业和项目团队使用，用来判断需要准备哪些资料、先做哪些功能、如何上线第一个版本。
          </p>
        </section>
        <section className="mt-10 grid gap-5 md:grid-cols-2">
          {starterSections.map((section, index) => (
            <article key={section.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-teal-700">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-5 text-xl font-semibold text-slate-950">{section.title}</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                {section.items.map((item) => (
                  <li key={item} className="rounded-xl bg-slate-50 px-4 py-3">{item}</li>
                ))}
              </ul>
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
      <a href="/answers">问答</a>
    </nav>
  );
}
