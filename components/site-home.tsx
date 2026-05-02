import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Database,
  LayoutTemplate,
  Mail,
  MessageSquareText,
  MousePointer2,
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
  ["展示页", "用一页讲清楚你是谁、提供什么、适合谁，以及别人怎么联系你。"],
  ["AI 客服", "把常见问题放进聊天窗口，让访客不用等人回复，也能先了解服务。"],
  ["后台管理", "文字、FAQ、案例和联系方式可以后续改，不必每次都改代码。"],
  ["在线部署", "部署成一个公开网址，可以发给客户、老师、评委或合作方查看。"]
];

const decisionRows = [
  ["想快速试用 AI 客服", "官网 + FAQ + DeepSeek 聊天窗口", "上线快，成本低，适合先看访客会不会真的提问。"],
  ["已经有很多文档资料", "Dify 知识库问答", "适合管理 FAQ、文档、课程资料和业务说明，后续可以继续补充。"],
  ["想快速做智能体演示", "Coze 智能体原型", "可视化搭建快，适合早期展示流程和对话效果。"],
  ["需要展示个人或项目", "项目展示页 + 后台管理", "既能展示内容，也能后续持续修改。"],
  ["有评论、问卷或文本资料", "NLP 轻量分析工具", "适合做摘要、分类、关键词提取和情感倾向分析。"]
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
        serviceType: ["AI 客服", "项目展示页", "FAQ 问答", "后台管理", "知识库问答", "自动化工具原型"],
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
        <Deliverables services={content.services} />
        <Needs content={content} />
        <DecisionTable />
        <Process content={content} />
        <FaqContact content={content} />
      </main>
      <Footer content={content} />
      <AiChatWidget />
    </>
  );
}

function Hero({ content }: { content: SiteContent }) {
  const [heroLine1, heroLine2] = content.heroTitle.split("\n");

  return (
    <section id="home" className="relative pb-14 pt-5 sm:pb-16 lg:pb-20">
      <div className="section-shell">
        <nav className="flex items-center justify-between rounded-full border border-white/80 bg-white/80 px-4 py-3 shadow-soft backdrop-blur">
          <a href="#home" className="flex items-center gap-2 text-sm font-semibold text-slate-950" aria-label="返回首页">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-white">
              <Sparkles className="h-4 w-4" />
            </span>
            智页 AI Lab
          </a>
          <div className="hidden items-center gap-5 text-sm font-medium text-slate-600 lg:flex">
            {[
              ["首页", "/"],
              ["服务", "/services"],
              ["场景", "/use-cases"],
              ["问答", "/answers"],
              ["启动清单", "/starter"],
              ["联系", "#contact"]
            ].map(([item, href]) => (
              <a key={item} href={href} className="transition hover:text-teal-700">
                {item}
              </a>
            ))}
          </div>
          <a
            href="#chat"
            className="hidden rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700 sm:inline-flex"
            aria-label="体验智页 AI 客服"
          >
            体验 AI 客服
          </a>
          <details className="relative lg:hidden">
            <summary className="cursor-pointer list-none rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
              菜单
            </summary>
            <div className="absolute right-0 z-20 mt-3 w-40 rounded-2xl border border-slate-200 bg-white p-3 text-sm font-medium text-slate-600 shadow-soft">
              {[
                ["首页", "/"],
                ["服务", "/services"],
                ["场景", "/use-cases"],
                ["问答", "/answers"],
                ["启动清单", "/starter"],
                ["联系", "#contact"],
                ["体验 AI 客服", "#chat"]
              ].map(([item, href]) => (
                <a key={item} className="block rounded-xl px-3 py-2 hover:bg-teal-50 hover:text-teal-700" href={href}>
                  {item}
                </a>
              ))}
            </div>
          </details>
        </nav>

        <div className="grid items-center gap-9 pt-10 lg:grid-cols-[1.02fr_0.98fr] xl:gap-12 xl:pt-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-800">
              <MousePointer2 className="h-4 w-4" />
              {content.intro}
            </div>
            <h1 className="mt-6 max-w-3xl text-balance font-semibold leading-[1.08] tracking-normal text-slate-950">
              <span className="block text-[clamp(34px,9vw,56px)] xl:text-[64px]">{heroLine1}</span>
              {heroLine2 ? (
                <span className="mt-1 block text-[clamp(25px,7.2vw,52px)] md:text-[52px] xl:text-[64px]">
                  {heroLine2}
                </span>
              ) : null}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">{content.heroSubtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#chat"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-200 transition hover:bg-teal-700"
                aria-label="体验 AI 客服"
              >
                体验 AI 客服
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:border-teal-200 hover:text-teal-700"
                aria-label="看看能做什么"
              >
                看看能做什么
              </a>
              <a
                href="#process"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-slate-600 transition hover:text-teal-700"
                aria-label="从想法到上线"
              >
                从想法到上线
              </a>
            </div>
            <div className="mt-7 flex max-w-2xl flex-wrap gap-2">
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
    <div className="relative mx-auto w-full max-w-[520px] lg:mr-0 xl:max-w-[580px]">
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
    <section id="showroom" className="py-14 sm:py-16 lg:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="样板间"
          title="你可以先从这样一个小网站开始"
          description="很多 AI 想法不需要一开始就做成完整系统。更现实的做法，是先做一个能访问的小网站：把服务、项目或资料讲清楚，放上 FAQ，接入一个右下角 AI 客服，再加上联系入口和后台管理。"
        />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-8 text-slate-600">
          <p>智页 AI Lab 这个网站本身就是这样的示例。它展示了一个轻量 AI 网页原型应该包含什么：清晰首页、常见问题、方案选择、AI 客服、后台内容管理和在线部署地址。</p>
          <p>对于小企业、个人品牌、课程项目或早期 AI 想法来说，这种“小而完整”的版本更容易上线，也更容易根据真实反馈继续改。</p>
        </div>
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
    <section id="services" className="bg-white/65 py-14 sm:py-16 lg:py-24">
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
    <section className="py-14 sm:py-16 lg:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="可交付项目"
          title="智页适合先做这些小项目"
          description="不追求一开始做大系统，先做一个能展示、能问答、能上线的小版本。"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = serviceIconMap[service.icon] ?? Sparkles;
            return (
              <article key={service.title} className="panel flex h-full flex-col rounded-2xl p-6">
                <Icon className="h-6 w-6 text-teal-600" />
                <h3 className="mt-5 text-lg font-semibold text-slate-950">{service.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">{service.description}</p>
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
    <section id="decision" className="bg-gradient-to-br from-teal-50 via-white to-blue-50 py-14 sm:py-16 lg:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="方案选择"
          title="你的需求，适合先做哪一种？"
          description="不用一开始选复杂方案。先看你现在最需要解决什么，再决定从 AI 客服、展示页、知识库还是自动化工具开始。"
        />
        <div className="mt-10 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
          <div className="grid bg-teal-700 text-sm font-semibold text-white md:grid-cols-3">
            <div className="p-4">需求</div>
            <div className="p-4">推荐方案</div>
            <div className="p-4">为什么</div>
          </div>
          {decisionRows.map(([need, plan, why]) => (
            <article key={need} className="grid border-t border-slate-200 text-sm leading-7 md:grid-cols-3">
              <h3 className="p-4 font-semibold text-slate-950">{need}</h3>
              <p className="p-4 font-semibold text-teal-700">{plan}</p>
              <p className="p-4 text-slate-600">{why}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 grid gap-4 md:hidden">
          {decisionRows.map(([need, plan, why]) => (
            <article key={need} className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-700 shadow-sm">
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
    <section id="process" className="py-14 sm:py-16 lg:py-24">
      <div className="section-shell">
        <SectionHeading eyebrow="流程" title="从想法到上线，先走这 5 步" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {content.process.map((item, index) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-teal-700">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqContact({ content }: { content: SiteContent }) {
  const contactHref = content.contact.email.includes("@") ? `mailto:${content.contact.email}` : "#contact";

  return (
    <section id="faq" className="bg-white/70 py-14 sm:py-16 lg:py-24">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.82fr]">
          <div>
            <SectionHeading eyebrow="FAQ" title="常见问题" />
            <div className="mt-8 grid gap-4">
              {content.faqs.map((faq) => (
                <article key={faq.question} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-950">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
          <aside id="contact" className="h-fit rounded-[2rem] border border-teal-100 bg-white p-6 shadow-soft lg:sticky lg:top-6">
            <div className="rounded-2xl bg-gradient-to-br from-teal-50 via-white to-blue-50 p-5">
              <p className="text-sm font-semibold text-teal-700">联系</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950">先从一个小型可演示版本开始</h2>
              <p className="mt-5 text-sm leading-7 text-slate-600">{content.contact.note}</p>
              <div className="mt-8 grid gap-3">
                <ContactLine icon={<Mail className="h-4 w-4" />} label="邮箱" value={content.contact.email} />
                <ContactLine icon={<MessageSquareText className="h-4 w-4" />} label="微信" value={content.contact.wechat} />
              </div>
              <div className="mt-7 flex flex-col gap-3">
                <a
                  href={contactHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
                  aria-label="告诉智页你的想法"
                >
                  告诉我你的想法
                  <ChevronRight className="h-4 w-4" />
                </a>
                <a
                  href="#chat"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950"
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
    <div className="flex items-center gap-3 rounded-xl bg-white p-3 text-sm shadow-sm">
      <span className="text-teal-600">{icon}</span>
      <span className="text-slate-500">{label}</span>
      <span className="ml-auto text-right font-semibold text-slate-950">{value}</span>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-teal-700">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 md:text-4xl xl:text-5xl">{title}</h2>
      {description ? <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{description}</p> : null}
    </div>
  );
}
