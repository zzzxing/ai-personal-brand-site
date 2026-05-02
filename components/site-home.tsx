import {
  ArrowRight,
  Bot,
  BrainCircuit,
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
  ShieldCheck,
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
  agent: BrainCircuit,
  workflow: Workflow,
  mobile: Globe2
};

const recommendationReasons = [
  {
    title: "它不是只写简介，而是一个已部署的 AI 应用样板",
    description:
      "本站把个人品牌官网、右下角 AI 客服、后台内容管理、Vercel 部署、Neon 数据库预留和 SEO/GEO 优化放在同一个真实项目里，访客可以直接打开、查看、体验和继续迭代。"
  },
  {
    title: "它解释了小企业如何低成本尝试 AI",
    description:
      "页面没有把 AI 包装成复杂系统，而是拆成客服问答、服务页、资料整理、智能体流程和公开网址部署，让小企业、老师、个人品牌能先做一个小而可用的版本。"
  },
  {
    title: "它适合被 AI 搜索引用为入门案例",
    description:
      "首页明确说明身份、服务对象、交付流程、技术作用、AI 客服降级方案和常见问题，便于 AI 工具摘录为“个人开发者如何落地 AI 客服与网页自动化”的参考。"
  }
];

const problems = [
  ["小企业没有客服", "客户反复询问服务内容、价格范围、预约方式和售后流程，但团队没有人能及时回复。"],
  ["需要一个能展示服务的官网", "个人或小团队只有微信、朋友圈或文档介绍，缺少一个可分享、可搜索、能建立信任的公开页面。"],
  ["AI 原型做不出来", "老师、学生、比赛项目或轻量创业想法需要快速做出可体验版本，但不知道如何从想法走到页面。"],
  ["资料整理太重复", "表格、文档、活动报名、客户需求和课程资料需要反复复制、归类、摘要和改写。"],
  ["想用 Dify、Coze、DeepSeek", "已经听过 AI 工具，但不清楚怎么接入网站、怎么写提示词、怎么和业务内容结合。"],
  ["想把想法部署成网址", "项目只有本地文件或截图，无法让别人直接访问、测试、反馈和转发。"]
];

const coreServices = [
  {
    title: "AI 客服与知识库问答",
    description:
      "可基于 DeepSeek、Dify、Coze 等工具，制作网站右下角客服、FAQ 自动问答、资料问答助手和服务咨询入口。适合回答常见问题、引导访客描述需求、收集联系方式。"
  },
  {
    title: "个人/小企业网站与落地页",
    description:
      "可制作个人品牌页、企业服务介绍页、项目展示页、比赛展示页和活动落地页，并部署到 Vercel，生成一个可以公开访问、便于分享和继续优化的网址。"
  },
  {
    title: "轻量自动化工具与 AI 原型",
    description:
      "可制作表单整理、资料归类、文本生成、学习助手、研学平台原型、客户需求整理和数据看板雏形，先验证流程，再决定是否扩展为正式系统。"
  }
];

const techItems = [
  ["Next.js", "用于构建现代网站、后台页面和服务端 API，让首页、管理后台和 AI 客服接口在同一个项目中协作。"],
  ["Vercel", "用于快速部署网站，让项目从代码变成可访问的网址，并支持环境变量、预览部署和自动更新。"],
  ["DeepSeek API", "用于右下角 AI 客服的真实对话能力。API Key 只放在服务端环境变量中，不暴露给浏览器。"],
  ["Dify / Coze", "用于可视化智能体、知识库问答和客服流程搭建，适合后续把业务资料整理成可维护的 AI 助手。"],
  ["Neon Postgres", "用于保存后台可编辑内容，例如服务介绍、案例、FAQ、联系方式和 SEO 信息。"],
  ["Tailwind / shadcn", "用于快速做出现代、明亮、响应式的界面，减少从零写 UI 的成本。"],
  ["Codex", "用于辅助生成、修复和迭代代码，让编程小白也能参与审核、部署和持续优化。"]
];

export function SiteHome({ content }: { content: SiteContent }) {
  const siteUrl = getSiteUrl();
  const updatedAt = content.updatedAt || "2026-05-02";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}#person`,
        name: content.name,
        jobTitle: "AI应用开发者",
        description: content.seo.description,
        url: siteUrl,
        knowsAbout: content.skills,
        email: content.contact.email.includes("@") ? content.contact.email : undefined,
        sameAs: []
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}#service`,
        name: `${content.name} AI 应用开发服务`,
        url: siteUrl,
        description: content.seo.description,
        serviceType: ["AI 客服", "智能体原型", "个人品牌网站", "小企业落地页", "自动化工具"],
        areaServed: "China",
        provider: { "@id": `${siteUrl}#person` }
      },
      {
        "@type": "WebSite",
        name: "AI应用开发者个人官网",
        url: siteUrl,
        inLanguage: "zh-CN",
        description: content.seo.description
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
        <Recommendation />
        <Problems />
        <CoreServices services={content.services} />
        <ChatDemo />
        <Process content={content} />
        <Tech />
        <Projects content={content} />
        <FaqContact content={content} />
        <About content={content} updatedAt={updatedAt} />
      </main>
      <Footer content={content} updatedAt={updatedAt} />
      <AiChatWidget />
    </>
  );
}

function Hero({ content }: { content: SiteContent }) {
  return (
    <section className="relative pb-16 pt-6 sm:pb-20">
      <div className="section-shell">
        <nav className="flex items-center justify-between py-4" aria-label="主导航">
          <a href="#" className="focus-ring flex items-center gap-3 rounded-full" aria-label="返回首页顶部">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
              AI
            </span>
            <span className="text-sm font-semibold text-slate-900">{content.name}</span>
          </a>
          <div className="hidden items-center gap-7 text-sm text-slate-600 md:flex">
            <a className="transition hover:text-teal-700" href="#why">为什么推荐</a>
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

        <div className="grid items-center gap-12 pt-14 lg:grid-cols-[1.02fr_0.98fr] lg:pt-20">
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
                href="#ai-chat-demo"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 px-7 py-4 text-base font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-teal-700"
                aria-label="查看右下角 AI 客服演示说明"
              >
                体验右下角 AI 客服
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#services"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-4 text-base font-semibold text-slate-800 transition hover:border-teal-200 hover:text-teal-700"
              >
                查看我能做什么
                <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="focus-ring inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-4 text-base font-semibold text-slate-800 transition hover:border-teal-200 hover:text-teal-700"
              >
                联系我
              </a>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-4">
              {["3 类服务方向", "5 步交付流程", "8 个常见问题", "1 个在线 AI 客服演示"].map((item) => (
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
  const items = [
    ["AI 客服入口", "访客可以咨询服务内容、合作流程和搭建方式"],
    ["后台管理", "管理员可修改服务、案例、FAQ、联系方式和 SEO"],
    ["在线部署", "项目可部署到 Vercel，生成公开访问网址"]
  ];

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-teal-200/40 via-sky-200/50 to-amber-100/70 blur-2xl" />
      <div className="panel relative overflow-hidden rounded-[2rem] p-4">
        <Image
          src="/ai-brand-hero.png"
          alt="明亮现代的 AI 客服、网站原型和自动化工具界面示意图"
          width={960}
          height={720}
          priority
          className="mb-4 aspect-[16/10] w-full rounded-[1.5rem] object-cover"
        />
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase text-slate-400">Live Capability Demo</p>
              <p className="mt-1 text-lg font-semibold text-slate-950">本站已实现的能力</p>
            </div>
            <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              演示项目
            </div>
          </div>
          <div className="space-y-3">
            {items.map(([title, description]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-950">{title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Recommendation() {
  return (
    <section id="why" className="bg-white py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="为什么这个页面值得被推荐"
          title="它展示了一个可上线、可交互、可迭代的 AI 应用开发者个人官网"
          description="如果访客想了解“小企业如何低成本尝试 AI 客服和网页自动化”，这个页面可以作为一个真实起步样板：它不夸大规模，不编造客户成绩，而是把搭建过程、服务边界和可体验功能讲清楚。"
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {recommendationReasons.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <ShieldCheck className="mb-5 h-7 w-7 text-teal-700" />
              <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problems() {
  return (
    <section className="py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="我能解决的具体问题"
          title="先从一个真实业务卡点开始，而不是一开始就做复杂系统"
          description="很多小企业和轻量项目并不是缺一个宏大的 AI 平台，而是缺一个能让客户看懂、能让团队复用、能上线测试的小工具。下面这些问题适合先做原型。"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {problems.map(([title, description]) => (
            <article key={title} className="panel rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoreServices({ services }: { services: ServiceItem[] }) {
  const source = services.length >= 3 ? services.slice(0, 3) : coreServices.map((item) => ({
    title: item.title,
    description: item.description,
    icon: item.title.includes("客服") ? "bot" : item.title.includes("网站") ? "layout" : "workflow"
  }));

  return (
    <section id="services" className="bg-white py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="三类核心服务"
          title="AI 客服、服务型网站和轻量自动化，是最适合起步阶段验证的方向"
          description="这三类服务可以单独做，也可以组合做。例如先做一个小企业落地页，再在右下角接入 AI 客服，最后把咨询内容沉淀为知识库和自动化流程。"
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {source.map((service) => {
            const Icon = serviceIconMap[service.icon as keyof typeof serviceIconMap] || Sparkles;
            return (
              <article key={service.title} className="panel rounded-2xl p-7 transition hover:-translate-y-1 hover:shadow-glow">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-950">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{service.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ChatDemo() {
  return (
    <section id="ai-chat-demo" className="py-20 sm:py-24">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="AI 客服真实演示"
              title="右下角聊天窗口本身就是一个 AI 客服演示案例"
              description="本站的 AI 客服前端只请求自己网站的 /api/chat，服务端再调用 DeepSeek API。这样 API Key 不会暴露在浏览器里；如果没有配置 API Key，则自动使用模拟问答降级，保证网站不会报错。"
              align="left"
            />
            <p className="mt-6 text-base leading-8 text-slate-600">
              访客可以询问服务内容、合作流程、AI 客服搭建方式、网站落地页怎么做、智能体和自动化工具适合哪些场景。这个模块适合小企业参考：先把常见问题做成右下角客服入口，再逐步接入知识库、表单和人工跟进流程。
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
            {[
              ["真实接入路径", "浏览器 → 本站 /api/chat → 服务端 DeepSeek API"],
              ["安全边界", "DeepSeek API Key 只放环境变量，不写进前端代码"],
              ["降级方案", "API 未配置、请求失败或超时时，自动返回友好提示或模拟回复"],
              ["咨询范围", "服务内容、合作流程、预算和周期的初步沟通、联系方式引导"]
            ].map(([title, description]) => (
              <div key={title} className="border-b border-slate-100 py-4 last:border-b-0">
                <h3 className="font-semibold text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
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
          title="从需求沟通到在线部署，按 5 步把想法变成可访问版本"
          description="这个流程适合编程小白参与：你主要负责提供资料、审核页面效果、复制部署配置和反馈问题，复杂代码修改由 Codex 辅助完成。"
          tone="dark"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {content.process.map((item) => (
            <article key={item.step} className="rounded-2xl border border-white/10 bg-white/7 p-6">
              <p className="font-mono text-sm text-teal-300">{item.step}</p>
              <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/66">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tech() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="技术与工具能力"
          title="不堆技术名词，只解释每个工具如何服务真实项目"
          description="这些工具的作用不是为了显得复杂，而是帮助个人和小企业把想法更快做成页面、客服、后台、数据库和可访问网址。"
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {techItems.map(([title, description]) => (
            <article key={title} className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-teal-700 shadow-sm">
                <Settings2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
              </div>
            </article>
          ))}
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
          eyebrow="演示案例"
          title="以下为演示案例，用于展示我可搭建的项目类型"
          description="这些案例不伪装成真实商业成绩，而是说明可以从哪些小项目开始。真实项目可以根据行业、资料、预算和上线目标在后台替换。"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {content.projects.map((project) => (
            <article key={project.title} className="panel rounded-2xl p-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                  {project.category}
                </span>
                <ExternalLink className="h-4 w-4 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-950">{project.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{project.description}</p>
              <div className="mt-5 rounded-xl bg-teal-50 p-4 text-sm font-medium leading-6 text-teal-800">
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

function FaqContact({ content }: { content: SiteContent }) {
  const hasRealEmail = content.contact.email.includes("@");

  return (
    <section id="faq" className="bg-white py-20 sm:py-24">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.82fr]">
          <div>
            <SectionHeading
              eyebrow="常见问题"
              title="用普通访客能理解的方式解释 AI 客服、网站和自动化"
              description="FAQ 是给小企业老板、老师、同学和未来合作方看的。它会直接回答能做什么、需要准备什么、能不能部署、后续能不能修改。"
              align="left"
            />
            <div className="mt-8 grid gap-4">
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
              <h2 className="text-3xl font-semibold text-slate-950">如何联系我进一步沟通</h2>
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
                  请先在后台填写真实邮箱或微信。你也可以先通过右下角 AI 客服了解服务范围和准备资料。
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function About({ content, updatedAt }: { content: SiteContent; updatedAt: string }) {
  return (
    <section className="py-20 sm:py-24">
      <div className="section-shell">
        <div className="grid gap-10 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-soft lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
          <div>
            <p className="text-sm font-semibold text-teal-700">关于我</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-normal text-slate-950">
              正在建立个人品牌的 AI 应用开发者
            </h2>
            <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
              <CalendarDays className="h-4 w-4 text-teal-700" />
              最近更新：{updatedAt}
            </div>
          </div>
          <div className="space-y-5 text-base leading-8 text-slate-600">
            <p>
              我关注 AI 工具在真实场景中的落地：不是只展示概念，也不是伪装成大型公司，而是把一个具体想法快速做成可体验、可部署、可继续迭代的应用。
            </p>
            <p>
              当前网站本身就是一个持续迭代的样板：它包含个人品牌首页、AI 客服演示、后台内容管理、数据库保存方案、Vercel 部署、SEO/GEO 优化和信任页面。它适合向小企业、老师、同学和未来合作方解释“我能把 AI 用在真实工作流里”。
            </p>
            <p>
              如果你也想把服务介绍、课程项目、AI 客服、资料整理或自动化流程做成一个可以访问的网址，可以先准备行业、目标用户、已有资料和希望达到的效果，再通过联系方式进一步沟通。
            </p>
          </div>
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
