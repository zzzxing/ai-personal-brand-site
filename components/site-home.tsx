import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  CalendarDays,
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
import { getSiteUrl } from "@/lib/site-url";
import type { ServiceItem, SiteContent } from "@/lib/types";

const serviceIconMap = {
  layout: LayoutTemplate,
  bot: Bot,
  agent: Sparkles,
  workflow: Workflow,
  mobile: Smartphone
};

export function SiteHome({ content }: { content: SiteContent }) {
  const siteUrl = getSiteUrl();
  const updatedAt = content.updatedAt || "2026-05-02";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl || "https://example.com"}#person`,
        name: content.name,
        jobTitle: "AI Application Developer",
        description: content.seo.description,
        knowsAbout: content.skills,
        email: content.contact.email
      },
      {
        "@type": "WebSite",
        name: "AI应用开发者个人品牌官网",
        url: siteUrl || undefined,
        inLanguage: "zh-CN",
        description: content.seo.description
      },
      {
        "@type": "ProfessionalService",
        name: `${content.name} AI 应用开发服务`,
        serviceType: ["AI 客服", "网站原型", "智能体工作流", "自动化工具"],
        areaServed: "China",
        email: content.contact.email
      },
      {
        "@type": "FAQPage",
        mainEntity: content.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer
          }
        }))
      }
    ]
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
        <StarterProjects />
        <Evidence />
        <Audience content={content} />
        <Projects content={content} />
        <Process content={content} />
        <Skills content={content} />
        <Trust content={content} updatedAt={updatedAt} />
        <FaqContact content={content} />
      </main>
      <Footer content={content} updatedAt={updatedAt} />
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
            <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-500">
              {content.name} 是这个个人品牌的项目名，代表“用 AI 把想法快速做成可展示、可验证的小应用”。如果你已经有真实姓名、邮箱和微信，可以在后台替换成你的个人信息。
            </p>
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
              <p className="text-xs font-medium uppercase text-slate-400">Capability Preview</p>
              <p className="mt-1 text-lg font-semibold text-slate-950">AI 应用能力演示面板</p>
            </div>
            <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              非真实业务数据
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["客服入口", "回答常见问题", "text-teal-700"],
              ["内容后台", "修改服务案例", "text-blue-700"],
              ["上线部署", "接入 Vercel", "text-amber-700"]
            ].map(([value, label, color]) => (
              <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className={`text-lg font-semibold ${color}`}>{value}</p>
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
              <p className="text-sm font-semibold text-slate-900">首版项目能力模块</p>
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

function StarterProjects() {
  const items = [
    {
      title: "AI 客服演示站",
      description: "适合小企业先把服务介绍、常见问题和联系入口整理成一个可演示的 AI 咨询窗口。",
      icon: Bot
    },
    {
      title: "个人/小企业落地页",
      description: "适合先建立专业主页，把定位、服务对象、案例方向、FAQ 和联系方式讲清楚。",
      icon: LayoutTemplate
    },
    {
      title: "自动化资料整理工具",
      description: "适合把表单、表格、资料摘要、内容初稿等重复流程做成轻量工具。",
      icon: Workflow
    }
  ];

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="当前适合先做的小项目"
          title="先从真实、轻量、能上线的 3 类项目开始"
          description="这些方向不需要一开始就做成大型系统，更适合起步阶段快速展示能力、收集反馈，并逐步沉淀为真实案例。"
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-teal-700 shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Evidence() {
  const stats = [
    ["3类", "更适合起步阶段先验证的小项目"],
    ["5类", "网站、AI 客服、智能体、自动化、小程序原型"],
    ["4页", "关于、联系、隐私、条款信任页面"],
    ["2套", "Dify 与 Coze 客服接入预留"],
    ["90+", "面向 geocheck 与 Lighthouse 的优化目标"]
  ];

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="可引用摘要"
          title="这个网站面向小企业 AI 应用获客，优先交付可上线、可演示、可持续优化的版本"
          description="我提供个人品牌官网、AI 客服演示、智能体工作流和自动化工具原型，适合预算有限但需要快速验证服务表达的小企业、老师、个人品牌和轻量创业项目。"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-5">
          {stats.map(([value, label]) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
              <p className="text-3xl font-semibold text-teal-700">{value}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <ReferenceCard
            title="Vercel"
            href="https://vercel.com/docs"
            description="用于 Next.js 项目部署、环境变量、Serverless Functions 和自动化预览部署，是本项目首选上线平台。"
          />
          <ReferenceCard
            title="Neon Postgres"
            href="https://neon.com/docs/guides/vercel"
            description="通过 Vercel 集成提供 Serverless Postgres，适合保存首页内容、FAQ、案例和后台配置。"
          />
          <ReferenceCard
            title="schema.org"
            href="https://schema.org/"
            description="用于 Person、WebSite、ProfessionalService 和 FAQPage 结构化数据，帮助搜索引擎与 AI 工具理解页面。"
          />
        </div>
      </div>
    </section>
  );
}

function ReferenceCard({ title, href, description }: { title: string; href: string; description: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-glow"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
        <ExternalLink className="h-4 w-4 text-slate-400" />
      </div>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
    </a>
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
          title="先展示演示案例方向，后续在后台替换成真实项目"
          description="这些内容用于说明可以交付的项目类型，不假装已经是正式商业案例。后续有真实项目后，可以在后台持续替换。"
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

function Trust({ content, updatedAt }: { content: SiteContent; updatedAt: string }) {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="可信度说明"
              title="我用可验证的交付方式建立信任，而不是只展示技术名词"
              description="本项目采用公开可部署的 Next.js 技术栈、Vercel 部署流程、Neon 数据库预留和可编辑后台。首页内容会持续根据真实案例、客户反馈和 geocheck 检测结果更新。"
              align="left"
            />
            <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
              <CalendarDays className="h-4 w-4 text-teal-700" />
              最近更新：{updatedAt}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["交付边界清晰", "首版优先完成首页、后台、数据库预留、AI 客服演示和基础 SEO，避免一开始做得过重。"],
              ["过程适合小白", "你只需要审核页面效果、复制命令、部署和反馈问题，不需要手动改复杂代码。"],
              ["内容可持续维护", "管理员可以在后台修改简介、服务、案例、联系方式、FAQ 和 SEO 描述。"],
              ["面向真实转化", "页面围绕咨询入口、服务对象、案例结果和常见问题组织，方便潜在客户快速判断是否合作。"]
            ].map(([title, description]) => (
              <article key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqContact({ content }: { content: SiteContent }) {
  const hasRealEmail = content.contact.email.includes("@");

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
              {hasRealEmail ? (
                <a
                  href={`mailto:${content.contact.email}`}
                  className="focus-ring mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-4 font-semibold text-white transition hover:bg-teal-700"
                >
                  发邮件咨询
                  <Rocket className="h-4 w-4" />
                </a>
              ) : (
                <div className="mt-8 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  请先在后台填写真实邮箱或微信，再启用正式联系入口。
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Footer({ content, updatedAt }: { content: SiteContent; updatedAt: string }) {
  return (
    <footer className="border-t border-slate-200 bg-white py-10">
      <div className="section-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-slate-950">{content.name}</p>
          <p className="mt-2 text-sm text-slate-500">AI应用开发者｜最近更新：{updatedAt}</p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm text-slate-600" aria-label="信任页面">
          <a className="hover:text-teal-700" href="/about">关于</a>
          <a className="hover:text-teal-700" href="/contact">联系</a>
          <a className="hover:text-teal-700" href="/privacy">隐私</a>
          <a className="hover:text-teal-700" href="/terms">条款</a>
          <a className="hover:text-teal-700" href="/llms.txt">llms.txt</a>
        </nav>
      </div>
    </footer>
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
