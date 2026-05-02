import type { Metadata } from "next";
import { serviceDetails } from "@/lib/zhiye-pages";
import { getAbsoluteUrl, getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "智页 AI Lab 可做的小型 AI 网页项目",
  description:
    "列出智页 AI Lab 适合先做的轻量项目类型，包括 AI 客服演示站、项目展示页、知识库问答页和自动化工具原型。",
  alternates: {
    canonical: getAbsoluteUrl("/services")
  }
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "智页 AI Lab 可做的小型 AI 网页项目",
    url: getAbsoluteUrl("/services"),
    serviceType: serviceDetails.map((service) => service.title),
    provider: {
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
          <p className="text-sm font-semibold text-teal-700">Services</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-slate-950 md:text-5xl">智页 AI Lab 可做的小型 AI 网页项目</h1>
          <p className="mt-5 text-base leading-8 text-slate-600">
            智页更适合先做小而完整的版本：能展示、能问答、能上线，后续再根据真实反馈继续升级。
          </p>
        </section>
        <section className="mt-10 grid gap-5 md:grid-cols-2">
          {serviceDetails.map((service, index) => (
            <article id={index === 0 ? "ai-customer-service" : index === 1 ? "project-page" : index === 3 ? "automation-tool" : undefined} key={service.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-950">{service.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{service.summary}</p>
              <Info label="适合谁" value={service.fit} />
              <Info label="最小版本包含什么" value={service.minimum} />
              <Info label="后续可以怎么升级" value={service.upgrade} />
              {"tech" in service ? <Info label="可选技术" value={service.tech} /> : null}
              {"admin" in service ? <Info label="是否需要后台管理" value={service.admin} /> : null}
              {"preparation" in service ? <Info label="资料准备建议" value={service.preparation} /> : null}
              {"io" in service ? <Info label="常见输入输出" value={service.io} /> : null}
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-5 rounded-xl bg-slate-50 p-4">
      <h3 className="text-sm font-semibold text-slate-950">{label}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-600">{value}</p>
    </div>
  );
}

function PageNav() {
  return (
    <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600">
      <a className="font-semibold text-teal-700" href="/">首页</a>
      <a href="/use-cases">场景</a>
      <a href="/answers">问答</a>
      <a href="/starter">启动清单</a>
    </nav>
  );
}
