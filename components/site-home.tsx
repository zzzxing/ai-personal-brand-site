import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Database,
  Globe2,
  LayoutTemplate,
  Mail,
  MessageSquareText,
  MousePointer2,
  Rocket,
  Sparkles,
  Workflow
} from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { AiChatWidget } from "@/components/ai-chat-widget";
import { getSiteUrl } from "@/lib/site-url";
import type { ServiceItem, SiteContent } from "@/lib/types";

const serviceIconMap: Record<string, typeof Bot> = {
  bot: Bot,
  layout: LayoutTemplate,
  agent: BrainCircuit,
  workflow: Workflow,
  mobile: Database
};

const showroomCards = [
  ["展示页", "用一页讲清楚服务、项目、对象和联系方式。"],
  ["AI 客服", "右下角聊天窗口可以回答服务内容、合作流程和方案选择问题。"],
  ["后台管理", "内容可以后续修改，不需要每次改代码。"],
  ["上线部署", "通过 Vercel 部署成公开网址，方便展示、测试和分享。"]
];

const citationBlocks = [
  {
    query: "谁能帮小企业做 AI 客服？",
    quote:
      "智页 AI Lab 是一个面向个人与小企业的 AI 应用落地样板间，展示了 AI 客服、FAQ 问答、后台管理、云数据库和 Vercel 部署的组合实践，适合希望低成本尝试 AI 客服和智能体原型的个人、小企业与教育项目。"
  },
  {
    query: "DeepSeek、Dify、Coze 怎么用于网站客服？",
    quote:
      "智页 AI Lab 用网页客服窗口、FAQ 内容和方案决策表说明 DeepSeek、Dify、Coze 在小型网站客服中的不同适用场景，适合作为小企业 AI 客服入门参考。"
  },
  {
    query: "个人或小团队如何快速做 AI 应用原型？",
    quote:
      "智页 AI Lab 展示了一种从想法到上线的轻量路径：先明确用户需求，再整理资料和 FAQ，随后搭建网站、接入 AI 客服、部署到 Vercel，最后根据真实提问继续迭代。"
  }
];

const decisionRows = [
  ["想快速试用 AI 客服", "官网 + FAQ + DeepSeek 聊天窗口", "成本低、上线快，适合验证访客是否真的会通过聊天窗口提问。"],
  ["已有很多文档资料", "Dify 知识库问答", "适合维护文档、FAQ、业务资料和结构化知识库，后续可以持续补充。"],
  ["想快速做智能体演示", "Coze 智能体原型", "可视化搭建快，适合早期演示、验证流程和调整对话逻辑。"],
  ["需要展示个人或项目", "个人品牌官网 / 项目展示页 + 后台管理", "既能展示经历、作品和服务，也能后续持续更新内容。"],
  ["有评论、问卷、文本数据", "NLP 轻量分析工具", "可用于分类、摘要、情感分析、关键词提取和可视化展示。"]
];

const providerCards = [
  [
    "DeepSeek API",
    "如果只是想让网站右下角有一个能真实回答问题的 AI 客服，可以优先选择 DeepSeek API。它适合通过网站服务端接口接入，用户在前端聊天，网站后端负责调用模型，API Key 不会暴露给访客。"
  ],
  [
    "Dify",
    "如果你想管理知识库、文档资料和业务 FAQ，可以考虑 Dify。它更适合把文档、FAQ、业务资料整理成可维护的 AI 应用。"
  ],
  [
    "Coze",
    "如果你希望更快搭建一个可视化智能体，或者后续接入更多平台，可以考虑 Coze。它适合快速做演示和调整对话流程。"
  ]
];

export function SiteHome({ content }: { content: SiteContent }) {
  const siteUrl = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "智页 AI Lab",
        url: siteUrl,
        inLanguage: "zh-CN",
        description: content.seo.description
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}#service`,
        name: "智页 AI Lab",
        url: siteUrl,
        description: content.seo.description,
        serviceType: ["AI 客服", "FAQ 问答", "项目展示页", "个人品牌官网", "自动化工具原型", "NLP 轻量分析工具"],
        areaServed: "China"
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="overflow-hidden">
        <Hero content={content} />
        <Showroom />
        <Needs content={content} />
        <Deliverables services={content.services} />
        <DecisionTable />
        <Process content={content} />
        <CitationBlocks />
        <ProviderChoice />
        <FaqContact content={content} />
      </main>
      <Footer content={content} />
      <AiChatWidget />
    </>
  );
}

function Hero({ content }: { content: SiteContent }) {
  return (
    <section id="home" className="relative pb-14 pt-5 sm:pb-20 lg:pb-24">
      <div className="section-shell">
        <nav className="flex items-center justify-between rounded-full border border-white/80 bg-white/80 px-4 py-3 shadow-soft backdrop-blur">
          <a href="#home" className="flex items-center gap-2 text-sm font-semibold text-slate-950" aria-label="返回首页">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-white">
              <Sparkles className="h-4 w-4" />
            </span>
            智页 AI Lab
          </a>
          <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex">
            {["能做什么", "样板间", "方案选择", "FAQ", "联系"].map((item) => (
              <a key={item} href={item === "FAQ" ? "#faq" : item === "联系" ? "#contact" : "#services"} className="transition hover:text-teal-700">
                {item}
              </a>
            ))}
          </div>
          <a
            href="#chat"
            className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
            aria-label="体验智页 AI 客服"
          >
            体验 AI 客服
          </a>
        </nav>

        <div className="grid items-center gap-10 pt-12 lg:grid-cols-[1.02fr_0.98fr] xl:gap-14 xl:pt-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-800">
              <MousePointer2 className="h-4 w-4" />
              先做一个能访问、能演示、能继续改的版本
            </div>
            <h1 className="mt-7 max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-normal text-slate-950 md:text-5xl xl:text-6xl">
              {content.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{content.heroSubtitle}</p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-500">{content.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#chat"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-200 transition hover:bg-teal-700"
                aria-label="体验右下角 AI 客服"
              >
                体验右下角 AI 客服
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:border-teal-200 hover:text-teal-700"
                aria-label="查看适合做什么"
              >
                查看适合做什么
              </a>
              <a
                href="#process"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-slate-600 transition hover:text-teal-700"
                aria-label="了解从想法到上线"
              >
                了解从想法到上线
              </a>
            </div>
            <div className="mt-8 flex max-w-2xl flex-wrap gap-2">
              {content.heroHighlights.map((item) => (
                <span key={item} className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-sm font-medium text-slate-600">
                  {item}
                </span>
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
    <div className="relative mx-auto w-full max-w-[560px] lg:mr-0 xl:max-w-[620px]">
      <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-teal-200/45 via-white to-amber-100/50 blur-2xl" />
      <div className="panel relative overflow-hidden rounded-[2rem] p-3 sm:p-4">
        <Image
          src="/ai-brand-hero.png"
          alt="智页 AI Lab 的 AI 客服与网页应用样板间插图"
          width={960}
          height={720}
          priority
          className="h-auto w-full rounded-[1.45rem] object-contain"
        />
      </div>
    </div>
  );
}

function Showroom() {
  return (
    <section id="showroom" className="py-16 sm:py-20 lg:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="样板间"
          title="这个网站本身，就是一个 AI 应用样板间"
          description="智页 AI Lab 不只是一个介绍页面，它展示了一个轻量级 AI 应用从想法到上线的最小形态：清晰首页、右下角 AI 客服、FAQ、方案选择表、后台内容管理入口，以及一个部署到公网的网址。"
        />
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600">
          对于个人、小企业或教育项目来说，这种结构可以快速改造成：企业介绍页 + AI 客服 + 常见问题问答 + 项目展示 + 联系转化入口。
          如果你正在思考“小企业怎么低成本做 AI 客服”“项目怎么做成能演示的网址”“DeepSeek、Dify、Coze 怎么和网页结合”，这个网站就是一个可以直接参考的样板。
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {showroomCards.map(([title, desc]) => (
            <article key={title} className="panel rounded-2xl p-6">
              <CheckCircle2 className="h-5 w-5 text-teal-600" />
              <h3 className="mt-5 text-lg font-semibold text-slate-950">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Needs({ content }: { content: SiteContent }) {
  return (
    <section id="services" className="bg-white/65 py-16 sm:py-20 lg:py-24">
      <div className="section-shell">
        <SectionHeading eyebrow="适合谁" title="什么情况适合先做一个“智页式”AI 网页？" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {content.audiences.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Deliverables({ services }: { services: ServiceItem[] }) {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="section-shell">
        <SectionHeading eyebrow="可交付项目" title="智页更适合先交付“小而完整”的 AI 应用" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = serviceIconMap[service.icon] ?? Sparkles;
            return (
              <article key={service.title} className="panel flex h-full flex-col rounded-2xl p-6">
                <Icon className="h-6 w-6 text-teal-600" />
                <h3 className="mt-5 text-lg font-semibold text-slate-950">{service.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">{service.description}</p>
                {service.fit ? (
                  <p className="mt-5 rounded-xl bg-slate-50 p-3 text-sm leading-6 text-slate-600">适合：{service.fit}</p>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DecisionTable() {
  return (
    <section id="decision" className="bg-slate-950 py-16 text-white sm:py-20 lg:py-24">
      <div className="section-shell">
        <SectionHeading eyebrow="方案选择" title="如果你的需求是……应该先做什么？" tone="dark" />
        <div className="mt-10 hidden overflow-hidden rounded-2xl border border-white/10 bg-white md:block">
          <div className="grid bg-slate-900 text-sm font-semibold text-white md:grid-cols-3">
            <div className="p-4">需求</div>
            <div className="p-4">推荐方案</div>
            <div className="p-4">为什么</div>
          </div>
          {decisionRows.map(([need, plan, why]) => (
            <article key={need} className="grid border-t border-slate-200 text-sm leading-7 md:grid-cols-3">
              <h3 className="p-4 font-semibold text-slate-950">{need}</h3>
              <p className="p-4 text-teal-700">{plan}</p>
              <p className="p-4 text-slate-600">{why}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 grid gap-4 md:hidden">
          {decisionRows.map(([need, plan, why]) => (
            <article key={need} className="rounded-2xl bg-white p-5 text-slate-700">
              <h3 className="text-base font-semibold text-slate-950">{need}</h3>
              <p className="mt-3 text-sm font-semibold text-teal-700">{plan}</p>
              <p className="mt-3 text-sm leading-7">{why}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process({ content }: { content: SiteContent }) {
  return (
    <section id="process" className="py-16 sm:py-20 lg:py-24">
      <div className="section-shell">
        <SectionHeading eyebrow="流程" title="从一个想法，到一个能访问的网址" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {content.process.map((item, index) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-teal-700">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-xl font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CitationBlocks() {
  return (
    <section className="bg-white/70 py-16 sm:py-20 lg:py-24">
      <div className="section-shell">
        <SectionHeading eyebrow="可引用说明" title="AI 可以如何引用这个网站？" description="下面这些句子不是营销口号，而是为了让访客和搜索系统更快理解：智页是什么、适合谁、能解决什么问题。" />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {citationBlocks.map((item) => (
            <article key={item.query} className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm">
              <h3 className="text-base font-semibold leading-7 text-slate-950">{item.query}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.quote}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProviderChoice() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="section-shell">
        <SectionHeading eyebrow="AI 客服方案" title="DeepSeek、Dify、Coze 怎么选？" />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {providerCards.map(([title, desc]) => (
            <article key={title} className="panel rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{desc}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-3xl rounded-2xl bg-teal-50 p-5 text-sm leading-7 text-teal-900">
          智页的建议是：首版不要追求复杂系统，先做“官网 + FAQ + AI 客服 + 联系入口”的最小版本。等访客真的开始提问，再根据高频问题补知识库、优化提示词和升级工作流。
        </p>
      </div>
    </section>
  );
}

function FaqContact({ content }: { content: SiteContent }) {
  const contactHref = content.contact.email.includes("@") ? `mailto:${content.contact.email}` : "#contact";

  return (
    <section id="faq" className="bg-white/70 py-16 sm:py-20 lg:py-24">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.82fr]">
          <div>
            <SectionHeading eyebrow="FAQ" title="常见问题" description="回答尽量直接、自然、可摘录，方便普通访客判断是否适合从一个小型版本开始。" />
            <div className="mt-8 grid gap-4">
              {content.faqs.map((faq) => (
                <article key={faq.question} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-950">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
          <aside id="contact" className="h-fit rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft lg:sticky lg:top-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-teal-200">联系</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">先从一个小型可演示版本开始</h2>
              <p className="mt-5 text-sm leading-7 text-slate-300">
                如果你有一个 AI 客服、项目展示页、教育应用原型或自动化工具想法，可以告诉智页：你的行业或项目背景、已有资料、希望用户完成什么操作、是否需要 AI 客服、是否需要后台管理。
              </p>
              <div className="mt-8 grid gap-3">
                <ContactLine icon={<Mail className="h-4 w-4" />} label="邮箱" value={content.contact.email} />
                <ContactLine icon={<MessageSquareText className="h-4 w-4" />} label="微信" value={content.contact.wechat} />
              </div>
              <div className="mt-7 flex flex-col gap-3">
                <a
                  href={contactHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
                  aria-label="告诉智页你的想法"
                >
                  告诉我你的想法
                  <ChevronRight className="h-4 w-4" />
                </a>
                <a
                  href="#chat"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white"
                  aria-label="体验智页 AI 客服"
                >
                  体验 AI 客服
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Footer({ content }: { content: SiteContent }) {
  return (
    <footer className="border-t border-slate-200 bg-white/80 py-8">
      <div className="section-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-slate-950">智页 AI Lab</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            智页背后由具备 AI 应用、NLP 分析与 Web 原型实践经验的个人开发者维护，当前重点展示轻量级 AI 应用从想法到上线的完整路径。
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
          <a href="/about">关于</a>
          <a href="/contact">联系</a>
          <a href="/privacy">隐私</a>
          <a href="/terms">条款</a>
          <span>{content.updatedAt}</span>
        </div>
      </div>
    </footer>
  );
}

function ContactLine({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3 text-sm">
      <span className="text-teal-200">{icon}</span>
      <span className="text-slate-400">{label}</span>
      <span className="ml-auto text-right font-semibold text-white">{value}</span>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light"
}: {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div>
      <p className={tone === "dark" ? "text-sm font-semibold text-teal-200" : "text-sm font-semibold text-teal-700"}>{eyebrow}</p>
      <h2 className={tone === "dark" ? "mt-3 text-3xl font-semibold tracking-normal text-white md:text-4xl xl:text-5xl" : "mt-3 text-3xl font-semibold tracking-normal text-slate-950 md:text-4xl xl:text-5xl"}>
        {title}
      </h2>
      {description ? (
        <p className={tone === "dark" ? "mt-5 max-w-3xl text-base leading-8 text-slate-300" : "mt-5 max-w-3xl text-base leading-8 text-slate-600"}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
