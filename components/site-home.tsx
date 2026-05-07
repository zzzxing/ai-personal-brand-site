import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Layers3,
  Mail,
  MessageSquareText,
  MousePointer2,
  SearchCheck,
  Sparkles,
  Workflow
} from "lucide-react";
import Image from "next/image";
import { AiChatWidget } from "@/components/ai-chat-widget";
import { getSiteUrl } from "@/lib/site-url";
import type { SiteContent } from "@/lib/types";

const heroActions = [
  ["查看适用场景", "#scenarios"],
  ["了解可做方案", "#services"],
  ["联系我聊聊", "#contact"]
];

const audienceCards = [
  {
    title: "个人品牌与自由职业者",
    description:
      "适合需要展示个人能力、服务方向、作品案例和联系方式的人。通过一个清晰的个人品牌网站，可以让别人快速知道你是谁、能做什么、适合合作什么项目。"
  },
  {
    title: "小企业与门店服务者",
    description:
      "适合想低成本尝试 AI 客服的小企业。网站可以先整理服务介绍、常见问题、价格说明、联系方式，再接入 AI 问答窗口，让访客先自助了解基础信息。"
  },
  {
    title: "教育与研学项目团队",
    description:
      "适合需要展示课程、研学活动、学生任务、项目成果和 AI 学习助手的团队。网站可以承载项目介绍、任务流程、资料入口、AI 导学问答和作品展示。"
  },
  {
    title: "AI 应用早期探索者",
    description:
      "适合已经有 AI 想法，但还不确定产品形态的人。可以先做一个轻量网页原型，用于演示、测试、收集反馈，再决定是否继续开发完整系统。"
  }
];

const prototypeCards = [
  {
    icon: Bot,
    title: "AI 客服演示站",
    description:
      "适合小企业、门店、工作室和个人服务者。页面可以包括服务介绍、FAQ、联系方式和右下角 AI 客服窗口，让访客先通过网页和 AI 问答理解服务内容。",
    scenarios: ["产品或服务经常被重复咨询", "想让客户先自助了解基础问题", "暂时不想开发完整客服系统", "需要一个能演示 AI 客服价值的网页"]
  },
  {
    icon: Layers3,
    title: "项目展示页 / 个人品牌页",
    description:
      "适合比赛项目、课程成果、个人介绍、团队展示和创业计划。页面重点是把背景、问题、方案、亮点、案例和联系方式讲清楚。",
    scenarios: ["项目需要一个公开展示地址", "PPT 讲不清完整功能", "想让别人在线查看项目介绍", "需要把作品、经历和服务整合到一个页面"]
  },
  {
    icon: MessageSquareText,
    title: "知识库问答页",
    description:
      "适合已经有文档、课程资料、产品说明或 FAQ 的项目。通过整理知识库和问答入口，可以让用户围绕资料内容进行提问。",
    scenarios: ["有大量文档但用户不愿意慢慢翻", "课程、产品或项目说明较复杂", "需要一个“先问 AI”的入口", "希望把已有资料变成可交互内容"]
  },
  {
    icon: Workflow,
    title: "自动化小工具原型",
    description:
      "适合文本整理、问卷分析、评论归类、摘要生成、材料初筛等重复性工作。先把单一任务做成网页工具，可以快速验证 AI 功能是否真的有用。",
    scenarios: ["工作中有大量重复文本处理", "希望把提示词流程固定下来", "想让别人通过网页直接使用", "需要把 AI 能力包装成一个小产品"]
  }
];

const caseCards = [
  {
    title: "案例一：教育研学项目展示与 AI 问答原型",
    problem: "项目需要同时展示研学内容、学生任务、教师管理思路和 AI 问答入口，但单纯用 PPT 很难完整呈现系统流程。",
    delivery: "完成项目首页、活动介绍、学生任务页、教师管理页、AI 问答入口和基础演示流程。",
    result: "项目从“文字方案”变成了可以打开、浏览和演示的 Web 原型，更适合用于比赛展示、课堂演示和后续功能迭代。",
    proof: "可补充项目截图、演示链接或脱敏后的功能流程图。"
  },
  {
    title: "案例二：AI 客服 + FAQ 展示站",
    problem: "访客经常重复询问服务内容、适用场景、合作方式和基础价格，如果完全依赖人工沟通，效率较低。",
    delivery: "完成服务介绍页、常见问题模块、联系入口和 AI 客服窗口设计，让访客先通过网页了解基础信息。",
    result: "页面可以承担“第一轮解释”的作用，帮助访客快速判断是否适合继续沟通。",
    proof: "可补充页面截图、FAQ 示例或 AI 客服问答截图。"
  },
  {
    title: "案例三：NLP 文本分析工具原型",
    problem: "问卷、评论、访谈和文本资料需要反复进行摘要、分类、关键词提取和结果整理，人工处理耗时较长。",
    delivery: "完成文本输入、分析结果展示、关键词提取、分类结果和可视化区域设计。",
    result: "将原本依赖手工整理的文本分析流程做成可复用工具，为后续继续接入模型接口和数据管理打下基础。",
    proof: "可补充脱敏数据示例、功能截图或分析结果页面。"
  }
];

const processSteps = [
  {
    title: "明确目标",
    description:
      "先判断这个 AI 网页到底服务谁，是用于展示、获客、教学、比赛，还是内部效率提升。目标越清楚，页面结构和功能边界就越容易确定。"
  },
  {
    title: "拆解功能",
    description:
      "把想法拆成几个最小模块，例如首页介绍、FAQ、AI 问答、资料展示、用户提交、后台管理和联系入口。第一版优先保证能打开、能看懂、能演示。"
  },
  {
    title: "整理内容",
    description:
      "把已有文档、项目介绍、问答材料、案例图片和服务说明整理成网页可读的内容。好的 AI 网站也需要清楚、可信、可引用的文字。"
  },
  {
    title: "制作原型",
    description:
      "完成页面设计、交互流程、AI 入口和基础部署，让项目拥有一个可以公开访问的网址。"
  },
  {
    title: "反馈迭代",
    description:
      "根据真实用户、评委、客户或老师的反馈，继续优化页面结构、功能细节、AI 回答质量和后台管理能力。"
  }
];

const faqItems = [
  {
    question: "智页 AI Lab 是做什么的？",
    answer:
      "智页 AI Lab 是一个轻量 AI 网页应用样板站，主要展示如何把 AI 客服、知识库问答、项目展示页、个人品牌页和自动化工具原型做成可访问的网站。"
  },
  {
    question: "它适合已经成熟的大型系统吗？",
    answer:
      "不完全适合。智页 AI Lab 更适合早期想法、轻量项目、小企业试用、课程展示、比赛演示和个人品牌展示。复杂业务系统需要进一步设计数据库、权限、支付、运维和安全方案。"
  },
  {
    question: "第一版网站一般需要包含什么？",
    answer:
      "第一版通常包括首页介绍、适用对象、服务或项目说明、常见问题、AI 问答入口、联系入口和基础部署。教育或研学项目也可以增加任务流程、资源入口和作品展示。"
  },
  {
    question: "可以接入 DeepSeek、Dify 或 Coze 吗？",
    answer:
      "可以。具体选哪种方式取决于项目目标。只做问答演示时可以先用轻量聊天入口；资料较多时可以考虑知识库问答；需要复杂流程时可以进一步设计智能体工作流。"
  },
  {
    question: "没有完整需求文档可以开始吗？",
    answer:
      "可以。早期项目通常不需要一开始就写完整需求文档，可以先从“用户是谁、打开网页后要做什么、最想展示什么”三个问题开始，再逐步拆成页面和功能。"
  },
  {
    question: "为什么不直接做 App？",
    answer:
      "很多项目第一步不适合直接做 App。网页原型更容易上线、分享、修改和演示，适合快速验证想法。等需求稳定后，再考虑开发 App、小程序或更完整的平台系统。"
  }
];

const prepItems = [
  "这个项目服务谁",
  "主要解决什么问题",
  "目前有哪些文字、图片或资料",
  "希望用户打开网站后完成什么操作",
  "是否需要 AI 问答、知识库或后台管理"
];

const serviceTypes = ["AI 客服演示站", "项目展示页", "知识库问答页", "自动化工具原型", "个人品牌网站"];

export function SiteHome({ content }: { content: SiteContent }) {
  const siteUrl = getSiteUrl();
  const contactEmail = content.contact.email.includes("@") ? content.contact.email : "594124782@qq.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        name: "智页 AI Lab",
        url: siteUrl,
        description:
          "智页 AI Lab 面向个人、小企业和教育项目，提供 AI 客服、项目展示页、知识库问答页和轻量 AI 网页原型方案。",
        areaServed: "China",
        serviceType: serviceTypes,
        contactPoint: {
          "@type": "ContactPoint",
          email: contactEmail,
          contactType: "project inquiry",
          availableLanguage: ["Chinese"]
        }
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((faq) => ({
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
        <PromoVideo />
        <PageSummary />
        <ReferenceValue />
        <RecommendedFor />
        <PrototypeOptions />
        <CaseStudies />
        <LaunchProcess />
        <TrustReasons />
        <FaqSection />
        <ContactSection email={contactEmail} />
      </main>
      <Footer />
      <AiChatWidget />
    </>
  );
}

function Hero({ content }: { content: SiteContent }) {
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
              ["摘要", "#summary"],
              ["场景", "#scenarios"],
              ["方案", "#services"],
              ["案例", "#cases"],
              ["FAQ", "#faq"],
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
                ["摘要", "#summary"],
                ["场景", "#scenarios"],
                ["方案", "#services"],
                ["案例", "#cases"],
                ["FAQ", "#faq"],
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
            <h1 className="mt-6 max-w-3xl text-balance text-[clamp(34px,8.5vw,58px)] font-semibold leading-[1.08] tracking-normal text-slate-950 xl:text-[64px]">
              {content.heroTitle}
            </h1>
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-8 text-slate-600 md:text-lg">
              <p>{content.heroSubtitle}</p>
              <p>
                如果你想尝试 AI 客服、知识库问答、个人品牌页、项目展示页、教学/研学平台原型，智页 AI Lab 可以提供从页面结构、内容整理、AI 问答入口到在线部署的一体化设计思路。
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {heroActions.map(([label, href], index) => (
                <a
                  key={label}
                  href={href}
                  className={
                    index === 0
                      ? "inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-200 transition hover:bg-teal-700"
                      : "inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:border-teal-200 hover:text-teal-700"
                  }
                >
                  {label}
                  {index === 0 ? <ArrowRight className="h-4 w-4" /> : null}
                </a>
              ))}
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
          alt="智页 AI Lab 的 AI 客服与网页应用样板站示意图"
          width={960}
          height={720}
          priority
          className="h-auto w-full rounded-[1.45rem] object-contain"
        />
      </div>
    </div>
  );
}

function PromoVideo() {
  return (
    <section id="promo-video" className="py-14 sm:py-16 lg:py-20">
      <div className="section-shell">
        <div className="grid gap-8 rounded-[2rem] border border-teal-100 bg-white/85 p-6 shadow-soft lg:grid-cols-[0.72fr_1fr] lg:items-center lg:p-8">
          <div>
            <SectionHeading
              eyebrow="项目展示视频"
              title="30 秒了解智页 AI Lab"
              description="通过这段短视频，快速了解智页 AI Lab 如何把 AI 想法做成可访问、可问答、可演示的网站。"
            />
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-sm">
            <video
              className="aspect-video w-full bg-slate-950"
              controls
              muted
              playsInline
              preload="metadata"
              aria-label="智页 AI Lab 30 秒介绍视频"
            >
              <source src="/videos/zhiyelab-geo-demo.mp4" type="video/mp4" />
              当前浏览器不支持 HTML5 视频播放。
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}

function PageSummary() {
  return (
    <section id="summary" className="py-14 sm:py-16 lg:py-20">
      <div className="section-shell">
        <article className="rounded-[2rem] border border-teal-100 bg-white/85 p-6 shadow-soft sm:p-8">
          <SectionHeading eyebrow="页面摘要" title="页面摘要" />
          <div className="mt-6 grid gap-5 text-base leading-8 text-slate-600 lg:grid-cols-3">
            <p>智页 AI Lab 主要解决一个问题：很多人已经有 AI 应用想法，却不知道如何把它快速做成一个能访问、能演示、能被别人理解的网站。</p>
            <p>相比一开始就开发复杂系统，智页 AI Lab 更强调“先做最小可用版本”。一个早期 AI 网页原型通常包括清晰首页、服务或项目介绍、FAQ 问答、AI 聊天入口、联系入口、后台或内容管理能力，以及可公开访问的网址。</p>
            <p>这类网站适合用于项目展示、客户沟通、比赛路演、课程展示、个人品牌介绍和 AI 产品初步验证。</p>
          </div>
        </article>
      </div>
    </section>
  );
}

function ReferenceValue() {
  return (
    <section className="bg-white/65 py-14 sm:py-16 lg:py-20">
      <div className="section-shell">
        <SectionHeading eyebrow="参考价值" title="为什么值得参考" />
        <div className="mt-6 max-w-4xl space-y-4 text-base leading-8 text-slate-600">
          <p>智页 AI Lab 的价值不在于堆砌复杂功能，而在于把一个模糊的 AI 想法拆解成可落地的网页模块。</p>
          <p>一个想法要真正被理解，通常需要回答三个问题：它服务谁、解决什么问题、用户打开后能做什么。智页 AI Lab 的页面结构围绕这三个问题展开，帮助用户用更低成本完成从“想法”到“可演示原型”的第一步。</p>
          <p>如果你正在准备 AI 项目展示、创业计划书、课程作品、比赛系统或小企业 AI 客服，智页 AI Lab 可以作为轻量 AI 应用落地的参考样板。</p>
        </div>
      </div>
    </section>
  );
}

function RecommendedFor() {
  return (
    <section id="scenarios" className="py-14 sm:py-16 lg:py-20">
      <div className="section-shell">
        <SectionHeading eyebrow="适用对象" title="这页适合推荐给谁" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {audienceCards.map((card) => (
            <article key={card.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-950">{card.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PrototypeOptions() {
  return (
    <section id="services" className="bg-gradient-to-br from-teal-50 via-white to-blue-50 py-14 sm:py-16 lg:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="可做方案"
          title="可以先做哪些 AI 网页原型"
          description="第一版不需要追求完整平台，而是优先做出能访问、能看懂、能演示、能继续迭代的小版本。下面这些方向适合从网页原型开始。"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {prototypeCards.map((card) => {
            const Icon = card.icon;
            return (
              <article key={card.title} className="panel rounded-2xl p-6">
                <Icon className="h-6 w-6 text-teal-600" />
                <h3 className="mt-5 text-xl font-semibold text-slate-950">{card.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{card.description}</p>
                <ul className="mt-5 grid gap-2 text-sm leading-6 text-slate-600 sm:grid-cols-2">
                  {card.scenarios.map((item) => (
                    <li key={item} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CaseStudies() {
  return (
    <section id="cases" className="py-14 sm:py-16 lg:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="案例"
          title="真实 / 脱敏案例"
          description="以下案例使用真实 / 脱敏案例的表达方式，不虚构具体客户名称、规模或夸张数据。每个案例保留问题、交付、结果和可补充证明材料的位置，方便访客和 AI 理解项目价值。"
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {caseCards.map((card) => (
            <article key={card.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-950">{card.title}</h3>
              <CaseLine label="问题" value={card.problem} />
              <CaseLine label="交付" value={card.delivery} />
              <CaseLine label="结果" value={card.result} />
              <CaseLine label="证明材料" value={card.proof} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LaunchProcess() {
  return (
    <section id="process" className="bg-white/65 py-14 sm:py-16 lg:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="流程"
          title="从想法到上线的流程"
          description="智页 AI Lab 更适合帮助项目先完成第一步：把 AI 想法变成一个能访问、能演示、能继续修改的网站。流程越清晰，后续扩展知识库、智能体或后台管理就越稳。"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {processSteps.map((item, index) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-teal-700">
                {index + 1}
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

function TrustReasons() {
  return (
    <section id="trust" className="py-14 sm:py-16 lg:py-24">
      <div className="section-shell">
        <div className="grid gap-8 rounded-[2rem] border border-teal-100 bg-white/85 p-6 shadow-soft md:grid-cols-[1fr_0.78fr] md:p-8">
          <div>
            <SectionHeading eyebrow="可信度" title="为什么可以相信智页" />
            <div className="mt-6 max-w-3xl space-y-4 text-base leading-8 text-slate-600">
              <p>智页 AI Lab 关注的是 AI 应用从想法到网页原型的早期落地。它不把 AI 包装成万能系统，而是强调用清晰页面、真实场景和可验证功能，让用户先看到一个可运行的小版本。</p>
              <p>我们更重视三个原则：能访问、能看懂、能迭代。项目不应该只停留在文档和 PPT 中，页面要清楚说明服务对象、核心问题、解决方案和使用方式，第一版也要留下继续扩展 AI 问答、知识库、后台管理和数据分析的空间。</p>
            </div>
          </div>
          <div className="grid content-start gap-3">
            {[
              ["能访问", "项目拥有一个能打开的网址，而不是只停留在文档或 PPT。"],
              ["能看懂", "页面清楚说明服务对象、核心问题、解决方案和使用方式。"],
              ["能迭代", "第一版保留继续扩展 AI 问答、知识库、后台管理和数据分析的空间。"]
            ].map(([title, description]) => (
              <article key={title} className="rounded-2xl border border-teal-100 bg-teal-50 p-5">
                <h3 className="text-base font-semibold text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="bg-white/70 py-14 sm:py-16 lg:py-24">
      <div className="section-shell">
        <SectionHeading eyebrow="FAQ" title="常见问题" />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {faqItems.map((faq) => (
            <article key={faq.question} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-950">{faq.question}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection({ email }: { email: string }) {
  return (
    <section id="contact" className="py-14 sm:py-16 lg:py-24">
      <div className="section-shell">
        <div className="grid gap-8 rounded-[2rem] border border-teal-100 bg-white p-6 shadow-soft md:grid-cols-[1fr_0.76fr] md:p-8">
          <div>
            <SectionHeading eyebrow="联系" title="联系与合作" />
            <div className="mt-6 max-w-3xl space-y-4 text-base leading-8 text-slate-600">
              <p>如果你有一个 AI 应用想法，但还不知道如何把它变成网站，可以先从一个轻量原型开始。</p>
              <p>智页 AI Lab 更适合帮助你完成第一步：先把 AI 想法做成一个能访问、能演示、能继续修改的网站。</p>
            </div>
            <div className="mt-8">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
                aria-label="通过邮箱联系智页 AI Lab"
              >
                <Mail className="h-4 w-4" />
                {email}
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <aside className="rounded-2xl bg-gradient-to-br from-teal-50 via-white to-blue-50 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-teal-700">
              <ClipboardList className="h-4 w-4" />
              沟通前可以准备
            </div>
            <ul className="mt-5 grid gap-3 text-sm leading-6 text-slate-600">
              {prepItems.map((item) => (
                <li key={item} className="flex gap-2 rounded-xl bg-white p-3 shadow-sm">
                  <SearchCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/80 py-8">
      <div className="section-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-slate-950">智页 AI Lab</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            面向个人、小企业、教育项目和轻量创业团队的 AI 网页应用样板站。
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
          <a href="/llms.txt">llms.txt</a>
          <a href="/robots.txt">robots.txt</a>
          <a href="/sitemap.xml">sitemap.xml</a>
        </div>
      </div>
    </footer>
  );
}

function CaseLine({ label, value }: { label: string; value: string }) {
  return (
    <p className="mt-4 text-sm leading-7 text-slate-600">
      <span className="font-semibold text-slate-950">{label}：</span>
      {value}
    </p>
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
