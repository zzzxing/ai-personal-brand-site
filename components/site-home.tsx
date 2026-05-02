import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Globe2,
  LayoutTemplate,
  Mail,
  MessageSquareText,
  MousePointer2,
  Rocket,
  Settings2,
  Smartphone,
  Sparkles,
  Workflow
} from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { AiChatWidget } from "@/components/ai-chat-widget";
import type { ServiceItem, SiteContent } from "@/lib/types";

const serviceIconMap = {
  layout: LayoutTemplate,
  bot: Bot,
  agent: Sparkles,
  workflow: Workflow,
  mobile: Smartphone
};

export function SiteHome({ content }: { content: SiteContent }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: content.name,
    jobTitle: "AI Application Developer",
    description: content.seo.description,
    knowsAbout: content.skills,
    email: content.contact.email
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="overflow-hidden">
        <Hero content={content} />
        <Services services={content.services} />
        <Audience content={content} />
        <Projects content={content} />
        <Process content={content} />
        <Skills content={content} />
        <FaqContact content={content} />
      </main>
      <AiChatWidget />
    </>
  );
}

function Hero({ content }: { content: SiteContent }) {
  return (
    <section className="relative min-h-[92vh] pb-16 pt-6 sm:pb-20">
      <div className="section-shell">
        <nav className="flex items-center justify-between py-4" aria-label="主导航">
          <a href="#" className="focus-ring flex items-center gap-3 rounded-full">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
              AI
            </span>
            <span className="text-sm font-semibold text-slate-900">{content.name}</span>
          </a>
          <div className="hidden items-center gap-7 text-sm text-slate-600 md:flex">
            <a className="transition hover:text-teal-700" href="#services">服务</a>
            <a className="transition hover:text-teal-700" href="#projects">案例</a>
            <a className="transition hover:text-teal-700" href="#faq">FAQ</a>
            <a className="transition hover:text-teal-700" href="/admin">后台</a>
          </div>
          <a
            href="#contact"
            className="focus-ring hidden rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700 sm:inline-flex"
          >
            联系我
          </a>
        </nav>

        <div className="grid items-center gap-12 pt-14 lg:grid-cols-[1.04fr_0.96fr] lg:pt-20">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white/80 px-4 py-2 text-sm font-medium text-teal-700 shadow-sm">
              <Sparkles className="h-4 w-4" />
              {content.tagline}
            </div>
            <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[1.04] tracking-normal text-slate-950 sm:text-6xl lg:text-7xl">
              {content.heroTitle}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              {content.heroSubtitle}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 px-7 py-4 text-base font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-teal-700"
              >
                先聊一个 AI 项目
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#projects"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-4 text-base font-semibold text-slate-800 transition hover:border-teal-200 hover:text-teal-700"
              >
                看看案例方向
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {content.heroHighlights.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-teal-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-teal-200/40 via-sky-200/50 to-amber-100/70 blur-2xl" />
      <div className="panel relative overflow-hidden rounded-[2rem] p-4">
        <Image
          src="/ai-brand-hero.png"
          alt="明亮现代的 AI 应用、客服与自动化工作流视觉图"
          width={960}
          height={720}
          priority
          className="mb-4 aspect-[16/10] w-full rounded-[1.5rem] object-cover"
        />
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase text-slate-400">AI Service Console</p>
              <p className="mt-1 text-lg font-semibold text-slate-950">访客咨询转化面板</p>
            </div>
            <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              在线演示
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["42", "咨询线索", "text-teal-700"],
              ["86%", "FAQ 命中", "text-blue-700"],
              ["3.2x", "响应效率", "text-amber-700"]
            ].map(([value, label, color]) => (
              <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className={`text-2xl font-semibold ${color}`}>{value}</p>
                <p className="mt-1 text-xs text-slate-500">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="rounded-2xl bg-slate-950 p-4 text-white">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Bot className="h-4 w-4 text-teal-300" />
                AI 客服建议
              </div>
              <div className="mt-5 space-y-3">
                {["先确认客户行业", "推荐官网+客服组合", "收集联系方式"].map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-xl bg-white/8 p-3 text-sm text-white/86">
                    <CheckCircle2 className="h-4 w-4 text-teal-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm font-semibold text-slate-900">本周可交付内容</p>
              <div className="mt-4 space-y-3">
                {[
                  ["品牌首页", 92],
                  ["后台内容管理", 78],
                  ["AI 客服入口", 88]
                ].map(([label, value]) => (
                  <div key={label as string}>
                    <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
                      <span>{label}</span>
                      <span>{value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-teal-500 to-sky-500"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Services({ services }: { services: ServiceItem[] }) {
  return (
    <section id="services" className="py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="我能做什么"
          title="从页面、客服到自动化，把想法变成可以被客户看见的应用"
          description="首版优先聚焦高质感展示和稳定上线，后续再按真实反馈扩展 AI 能力。"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {services.map((service) => {
            const Icon = serviceIconMap[service.icon as keyof typeof serviceIconMap] || Sparkles;
            return (
              <article key={service.title} className="panel rounded-2xl p-6 transition hover:-translate-y-1 hover:shadow-glow">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-950">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Audience({ content }: { content: SiteContent }) {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.86fr_1.14fr]">
          <div>
            <SectionHeading
              eyebrow="服务对象"
              title="让合作方一眼知道：你能把 AI 用在真实场景里"
              description={content.intro}
              align="left"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {content.audiences.map((audience) => (
              <div key={audience.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <BriefcaseBusiness className="mb-5 h-6 w-6 text-teal-700" />
                <h3 className="text-lg font-semibold text-slate-950">{audience.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{audience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects({ content }: { content: SiteContent }) {
  return (
    <section id="projects" className="py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="作品案例"
          title="先用半真实案例建立信任，后续可以在后台持续替换成真实项目"
          description="每个案例都围绕小企业能理解的结果表达，而不是堆技术名词。"
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {content.projects.map((project) => (
            <article key={project.title} className="panel rounded-2xl p-6">
              <div className="mb-6 flex items-center justify-between gap-4">
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                  {project.category}
                </span>
                <ExternalLink className="h-4 w-4 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-950">{project.title}</h3>
              <p className="mt-3 min-h-20 text-sm leading-6 text-slate-600">{project.description}</p>
              <div className="mt-6 rounded-xl bg-teal-50 p-4 text-sm font-medium text-teal-800">
                {project.result}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process({ content }: { content: SiteContent }) {
  return (
    <section className="bg-slate-950 py-20 text-white sm:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="服务流程"
          title="先跑通上线闭环，再根据反馈扩展能力"
          description="对编程小白友好：你只需要审核效果、复制部署命令、反馈问题。"
          tone="dark"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {content.process.map((item) => (
            <div key={item.step} className="rounded-2xl border border-white/10 bg-white/7 p-6">
              <p className="font-mono text-sm text-teal-300">{item.step}</p>
              <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/66">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills({ content }: { content: SiteContent }) {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="技术能力"
              title="技术栈表达专业，但让客户听得懂"
              description="面向客户展示解决问题的能力，面向后续迭代保留 Next.js、AI Agent、Dify/Coze、Vercel、数据看板等扩展空间。"
              align="left"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {content.skills.map((skill) => (
              <div key={skill} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <Settings2 className="h-5 w-5 text-teal-700" />
                <span className="font-medium text-slate-800">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqContact({ content }: { content: SiteContent }) {
  return (
    <section id="faq" className="py-20 sm:py-24">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.82fr]">
          <div>
            <SectionHeading
              eyebrow="常见问题"
              title="用小企业老板听得懂的方式解释服务"
              description="FAQ 内容可在后台持续修改，适合后续沉淀真实咨询问题。"
              align="left"
            />
            <div className="mt-8 space-y-4">
              {content.faqs.map((faq) => (
                <details key={faq.question} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" open>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-slate-950">
                    {faq.question}
                    <ChevronRight className="h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-90" />
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          <aside id="contact" className="h-fit rounded-[2rem] bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700 p-1 shadow-glow">
            <div className="rounded-[1.75rem] bg-white p-7 sm:p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                <MessageSquareText className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-semibold text-slate-950">从一个真实问题开始聊</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{content.contact.note}</p>
              <div className="mt-7 space-y-4">
                <ContactLine icon={<Mail className="h-5 w-5" />} label="邮箱" value={content.contact.email} />
                <ContactLine icon={<MousePointer2 className="h-5 w-5" />} label="微信" value={content.contact.wechat} />
                <ContactLine icon={<Globe2 className="h-5 w-5" />} label="方向" value="AI 客服 / 网站 / 智能体 / 自动化" />
              </div>
              <a
                href={`mailto:${content.contact.email}`}
                className="focus-ring mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-4 font-semibold text-white transition hover:bg-teal-700"
              >
                发邮件咨询
                <Rocket className="h-4 w-4" />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ContactLine({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="text-teal-700">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="truncate text-sm font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light"
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p className={tone === "dark" ? "text-sm font-semibold text-teal-300" : "text-sm font-semibold text-teal-700"}>
        {eyebrow}
      </p>
      <h2 className={tone === "dark" ? "mt-4 text-4xl font-semibold tracking-normal text-white sm:text-5xl" : "mt-4 text-4xl font-semibold tracking-normal text-slate-950 sm:text-5xl"}>
        {title}
      </h2>
      <p className={tone === "dark" ? "mt-5 text-base leading-8 text-white/66" : "mt-5 text-base leading-8 text-slate-600"}>
        {description}
      </p>
    </div>
  );
}
