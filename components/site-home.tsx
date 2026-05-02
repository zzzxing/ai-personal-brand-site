import {
  ArrowRight,
  Award,
  Bot,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Database,
  Globe2,
  GraduationCap,
  LayoutTemplate,
  Mail,
  MessageSquareText,
  MousePointer2,
  Rocket,
  Search,
  Settings2,
  Sparkles,
  Workflow
} from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { AiChatWidget } from "@/components/ai-chat-widget";
import { getSiteUrl } from "@/lib/site-url";
import type { ServiceItem, SiteContent } from "@/lib/types";

const serviceIconMap = {
  bot: Bot,
  layout: LayoutTemplate,
  agent: BrainCircuit,
  workflow: Workflow,
  mobile: Database
};

const credibilityTags = [
  "湖北师范大学硕士研究生",
  "研究生国家奖学金",
  "AIGC 创新赛全国三等奖",
  "9 项软件著作权",
  "多模态/NLP/LLM 应用实践"
];

const abilityDetails = [
  {
    icon: Bot,
    title: "AI 客服与知识库问答",
    description:
      "适合小企业、个人品牌和教育项目把常见问题、服务介绍、资料说明整理成可问答入口。可使用 DeepSeek API、Dify、Coze、提示工程和知识库组织方式，解决重复咨询、资料检索和需求初筛问题。"
  },
  {
    icon: LayoutTemplate,
    title: "个人品牌官网与项目展示页",
    description:
      "适合研究生、个人开发者、学生团队、小企业和课程项目展示身份、成果、服务、案例和联系方式。可使用 Next.js、Tailwind、Vercel、SEO/GEO 结构化内容，把简历或项目说明变成可访问的网址。"
  },
  {
    icon: BrainCircuit,
    title: "智能体与轻量 AI 原型",
    description:
      "适合想验证 AI 应用想法的人，把任务拆成需求理解、资料整理、文本生成、问答检索和结果展示。可结合 LLM、提示工程、少样本示例、工作流编排和前端交互，先做可体验版本。"
  },
  {
    icon: Search,
    title: "NLP 与数据分析工具",
    description:
      "适合文本分类、情感分析、数据清洗、趋势预测、报表生成和智能检索场景。可结合 BERT/ERNIE、LSTM、DeepAR、PyTorch、可视化和误差分析，把研究与数据处理经验转化为小工具。"
  },
  {
    icon: Database,
    title: "后台管理与数据保存",
    description:
      "适合需要持续更新内容的网站和工具。可使用 Neon Postgres、API Routes、环境变量、后台表单和基础权限控制，让服务介绍、案例、FAQ、联系方式和 SEO 信息可以被维护。"
  }
];

const experienceCards = [
  {
    title: "多注意力融合的多模态情感分类研究",
    summary:
      "参与文本与图像共同建模的多模态情感分类研究，关注细粒度对齐、跨模态特征融合和多注意力机制。",
    skills:
      "涉及 PyTorch 训练、文本/图像特征处理、消融实验、可视化分析和误差分析。",
    value:
      "这段经历支撑我理解多源信息如何进入 AI 系统，也能帮助我设计更适合图文资料、评论内容和业务语料的智能分析原型。"
  },
  {
    title: "大语言模型自动生成 ABSA 数据集",
    summary:
      "参与利用大语言模型自动生成方面级情感分析数据集的研究，探索从提示设计到数据过滤的生成流程。",
    skills:
      "涉及提示工程、LLM 生成-过滤流水线、数据一致性校验、BERT/ERNIE 微调和实验评估。",
    value:
      "这段经历让我更重视 AI 应用中的数据质量、提示词边界和评估流程，适合转化为知识库问答、客服语料构建和智能体测试方法。"
  },
  {
    title: "Llama-2 微调与少样本 ABSA 研究",
    summary:
      "参与基于 Llama-2 微调与少样本学习的方面级情感分析研究，关注低资源场景下的抽取与判断。",
    skills:
      "涉及 LoRA、少样本提示、指令微调、方面-情感联合抽取模板和实验对比。",
    value:
      "这段经历支撑我把大模型能力落到具体任务模板中，而不是只做泛泛聊天，适合智能体原型、资料抽取和业务问答设计。"
  },
  {
    title: "后端开发与数据处理实践",
    summary:
      "曾参与后端开发与数据处理相关实践，面向真实系统中的数据标准化、查询、分析和性能优化问题。",
    skills:
      "涉及智能检索、NLP 语义分析、标准化数据管道、报表生成、系统性能优化和接口协作。",
    value:
      "这段经历让我能把 AI 功能和网站后台、数据库、报表、检索流程结合起来，做出更接近可用系统的轻量应用。"
  },
  {
    title: "软件著作权与系统开发成果",
    summary:
      "已获得 9 项计算机软件著作权，方向覆盖自然语言处理、教育评估、数据挖掘、智能检索、企业级信息系统和社会治理应用。",
    skills:
      "这些成果体现了从需求理解、系统设计、功能实现到成果整理的持续实践能力。",
    value:
      "它们为个人品牌提供了可信基础，也说明我不是只停留在概念表达，而是持续参与 AI 与信息系统的实践产出。"
  }
];

const audienceItems = [
  ["小企业或个体商家", "适合需要 AI 客服、服务介绍页、FAQ 问答、预约说明和公开展示入口的团队。"],
  ["个人品牌或学生团队", "适合需要展示研究、作品、比赛项目、服务能力和联系方式的个人或小组。"],
  ["教育与研学项目", "适合课程展示、活动报名、学习助手、资料问答、项目成果页和研学平台原型。"],
  ["早期 AI 应用想法", "适合还没有完整技术方案，但希望先做出可演示、可部署、可反馈版本的轻量项目。"]
];

const processItems = [
  ["01", "需求梳理", "你说明目标用户、使用场景、已有资料和希望达到的效果；我帮助判断先做 AI 客服、展示页、智能体原型还是数据工具。"],
  ["02", "资料整理", "把文本、图片、表格、FAQ、项目说明或论文经历整理成页面结构、知识库内容、字段和功能清单。"],
  ["03", "原型设计", "先设计可体验的首页、问答流程、后台字段和演示路径，避免一开始就做成过重系统。"],
  ["04", "开发部署", "使用 Next.js、Vercel、DeepSeek/Dify/Coze、数据库和后台管理，把原型部署成可访问网址。"],
  ["05", "反馈优化", "根据真实访问、geocheck、客户问题和新增资料继续优化内容、交互、SEO/GEO 和 AI 客服回复。"]
];

const techItems = [
  ["自然语言处理", "用于文本分类、语义分析、方面级情感分析、智能检索和资料问答。"],
  ["多模态情感分析", "用于理解图文内容之间的关系，支撑图文资料分析、评论理解和多源信息融合。"],
  ["大语言模型应用", "用于 DeepSeek、Llama-2、提示工程、数据生成、少样本学习和智能体原型。"],
  ["Web 开发与部署", "用于把 AI 能力做成可访问页面、后台管理、API 接口和 Vercel 部署项目。"],
  ["数据处理与评估", "用于数据清洗、实验评估、可视化、误差分析、报表生成和预测分析。"],
  ["系统成果整理", "用于把研究、软著、项目和服务能力组织成可被人和 AI 检索系统理解的内容结构。"]
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
        name: "曾鑫",
        jobTitle: "AI 应用开发者与智能系统实践者",
        description: content.seo.description,
        url: siteUrl,
        affiliation: {
          "@type": "CollegeOrUniversity",
          name: "湖北师范大学"
        },
        knowsAbout: [
          "自然语言处理",
          "多模态情感分析",
          "大语言模型应用",
          "智能检索",
          "AI 客服",
          "智能体原型",
          "轻量级 AI 应用开发"
        ],
        award: ["研究生国家奖学金", "中国高校计算机大赛 AIGC 创新赛全国三等奖", "9 项计算机软件著作权"],
        email: content.contact.email.includes("@") ? content.contact.email : undefined,
        sameAs: []
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}#service`,
        name: "曾鑫 AI 应用开发与智能系统实践服务",
        url: siteUrl,
        description: content.seo.description,
        serviceType: ["AI 客服", "知识库问答", "智能体原型", "个人品牌网站", "小企业落地页", "NLP 数据分析工具"],
        areaServed: "China",
        provider: { "@id": `${siteUrl}#person` }
      },
      {
        "@type": "WebSite",
        name: "曾鑫个人品牌官网",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="overflow-hidden">
        <Hero content={content} />
        <About updatedAt={updatedAt} />
        <Abilities content={content} />
        <Experiences />
        <Audience />
        <Process />
        <Tech />
        <ChatDemo />
        <FaqContact content={content} />
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
              曾
            </span>
            <span className="text-sm font-semibold text-slate-900">{content.name}</span>
          </a>
          <div className="hidden items-center gap-7 text-sm text-slate-600 md:flex">
            <a className="transition hover:text-teal-700" href="#about">关于</a>
            <a className="transition hover:text-teal-700" href="#abilities">能力</a>
            <a className="transition hover:text-teal-700" href="#experience">经历</a>
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
                体验 AI 客服演示
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#abilities"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-4 text-base font-semibold text-slate-800 transition hover:border-teal-200 hover:text-teal-700"
              >
                查看我的能力
                <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="focus-ring inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-4 text-base font-semibold text-slate-800 transition hover:border-teal-200 hover:text-teal-700"
              >
                联系我
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {credibilityTags.map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-teal-600" />
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
  const items = [
    ["研究基础", "NLP、多模态情感分析、LLM 数据生成与少样本学习"],
    ["工程实践", "智能检索、数据管道、报表生成、后端开发与性能优化"],
    ["落地方向", "AI 客服、智能体原型、个人品牌官网与轻量自动化工具"]
  ];

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-teal-200/40 via-sky-200/50 to-amber-100/70 blur-2xl" />
      <div className="panel relative overflow-hidden rounded-[2rem] p-4">
        <Image
          src="/ai-brand-hero.png"
          alt="曾鑫 AI 应用开发者个人官网的智能系统与应用原型示意图"
          width={960}
          height={720}
          priority
          className="mb-4 aspect-[16/10] w-full rounded-[1.5rem] object-cover"
        />
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase text-slate-400">Profile Signal</p>
              <p className="mt-1 text-lg font-semibold text-slate-950">真实背景与应用方向</p>
            </div>
            <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              无虚假数据
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

function About({ updatedAt }: { updatedAt: string }) {
  return (
    <section id="about" className="bg-white py-20 sm:py-24">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <SectionHeading
              eyebrow="关于我"
              title="从 NLP 与多模态研究，走向可上线的 AI 应用实践"
              description="这部分回答 geocheck 提到的身份信息和可信度问题：我是谁、做过什么、为什么能做 AI 应用落地。"
              align="left"
            />
            <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
              <CalendarDays className="h-4 w-4 text-teal-700" />
              最近更新：{updatedAt}
            </div>
          </div>
          <div className="space-y-5 text-base leading-8 text-slate-600">
            <p>
              我是曾鑫，湖北师范大学硕士研究生，定位是 AI 应用开发者与智能系统实践者。我的研究和实践主要围绕自然语言处理、多模态情感分析、大语言模型应用、智能检索和轻量级 AI 应用开发展开。相比只做静态网页展示，我更关注如何把模型能力、数据处理、检索流程和 Web 应用结合起来，做成别人能打开、能体验、能继续迭代的系统原型。
            </p>
            <p>
              在研究经历中，我参与过多注意力融合的多模态情感分类、利用大语言模型自动生成 ABSA 数据集、基于 Llama-2 微调与少样本学习的 ABSA 研究，也做过名字流行度时间序列预测。这些工作涉及 PyTorch、BERT/ERNIE、LSTM、DeepAR、LoRA、提示工程、数据一致性校验、消融实验、可视化与误差分析，让我理解 AI 应用不能只看“能不能回答”，还要关注数据质量、评估方法和错误边界。
            </p>
            <p>
              在工程实践方面，我有后端开发与数据处理经历，接触过智能检索、NLP 语义分析、标准化数据管道、报表生成和系统性能优化。结合 9 项计算机软件著作权、研究生国家奖学金、研究生学业一等奖学金、中国高校计算机大赛 AIGC 创新赛全国三等奖等成果，我希望把研究训练和工程实践转化为更轻量、更可用的 AI 客服、智能体原型、数据分析工具和个人/小企业展示网站。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Abilities({ content }: { content: SiteContent }) {
  const source = content.services.length >= 5 ? content.services.slice(0, 5) : abilityDetails.map((item) => ({
    title: item.title,
    description: item.description,
    icon: item.title.includes("客服") ? "bot" : item.title.includes("官网") ? "layout" : item.title.includes("智能体") ? "agent" : item.title.includes("数据") ? "mobile" : "workflow"
  }));

  return (
    <section id="abilities" className="py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="我能提供的能力"
          title="把研究、数据处理和 Web 开发组合成可用的小型 AI 应用"
          description="下面 5 类能力面向真实场景：既说明适合谁，也说明能解决什么问题和可能使用的技术。"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {source.map((service) => {
            const Icon = serviceIconMap[service.icon as keyof typeof serviceIconMap] || Sparkles;
            return (
              <article key={service.title} className="panel rounded-2xl p-6 transition hover:-translate-y-1 hover:shadow-glow">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-950">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Experiences() {
  return (
    <section id="experience" className="bg-white py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="代表性项目经历"
          title="这些经历说明我的可信度来自研究训练、工程实践和系统成果"
          description="以下内容基于真实简历背景整理，用于说明做过什么、用到什么能力，以及这些经历如何支撑现在的 AI 应用开发。"
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {experienceCards.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
              <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
                <p><strong className="text-slate-900">做了什么：</strong>{item.summary}</p>
                <p><strong className="text-slate-900">用到能力：</strong>{item.skills}</p>
                <p><strong className="text-slate-900">如何支撑应用开发：</strong>{item.value}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Audience() {
  return (
    <section className="py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="适合找我做什么"
          title="从小项目、演示页和 AI 客服原型开始，更容易快速验证"
          description="我不会把所有需求都包装成大型系统。对个人、小企业和教育项目来说，先做一个能访问、能演示、能收集反馈的版本通常更现实。"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {audienceItems.map(([title, description]) => (
            <article key={title} className="panel rounded-2xl p-6">
              <GraduationCap className="mb-5 h-7 w-7 text-teal-700" />
              <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="bg-slate-950 py-20 text-white sm:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="服务流程"
          title="从需求梳理到反馈优化，按 5 步做出可上线版本"
          description="流程尽量清晰、轻量，适合先做小项目、演示页、AI 客服原型或数据工具。"
          tone="dark"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {processItems.map(([step, title, description]) => (
            <article key={step} className="rounded-2xl border border-white/10 bg-white/7 p-6">
              <p className="font-mono text-sm text-teal-300">{step}</p>
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/66">{description}</p>
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
          title="用研究方法理解 AI，用工程工具把它落到网页和系统里"
          description="这里不是堆技术名词，而是说明我如何把 NLP、多模态、LLM、智能检索和 Web 开发转化为可体验的应用。"
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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

function ChatDemo() {
  return (
    <section id="ai-chat-demo" className="py-20 sm:py-24">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="AI 客服演示说明"
              title="本站右下角 AI 客服是一个真实 AI 应用演示案例"
              description="聊天窗口支持 DeepSeek API 接入：前端只请求本站 /api/chat，服务端再调用 DeepSeek，API Key 不暴露在浏览器里。如果未配置 API Key，则使用模拟问答降级，保证网站不会报错。"
              align="left"
            />
            <p className="mt-6 text-base leading-8 text-slate-600">
              访客可以询问我能做什么、AI 客服适合哪些场景、合作流程、需要准备什么资料、能否接入 Dify/Coze/DeepSeek，以及如何联系进一步沟通。这个客服本身就是“轻量 AI 应用如何嵌入个人官网”的可体验样例。
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
            {[
              ["真实接入路径", "浏览器 → 本站 /api/chat → 服务端 DeepSeek API"],
              ["安全边界", "DeepSeek API Key 只放环境变量，不写进前端代码"],
              ["降级方案", "API 未配置、请求失败或超时时，自动返回友好提示或模拟回复"],
              ["适合场景", "个人官网客服、小企业 FAQ、课程资料问答、项目介绍助手"]
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

function FaqContact({ content }: { content: SiteContent }) {
  const hasRealEmail = content.contact.email.includes("@");

  return (
    <section id="faq" className="bg-white py-20 sm:py-24">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.82fr]">
          <div>
            <SectionHeading
              eyebrow="常见问题"
              title="围绕 AI 应用、客服原型、公开网址和可信度的常见问题"
              description="这些问题帮助普通访客理解我能做什么、和普通网页制作者有什么不同、需要准备什么，以及需求模糊时如何开始。"
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
              <h2 className="text-3xl font-semibold text-slate-950">联系我</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{content.contact.note}</p>
              <div className="mt-7 space-y-4">
                <ContactLine icon={<Mail className="h-5 w-5" />} label="邮箱" value={content.contact.email} />
                <ContactLine icon={<MousePointer2 className="h-5 w-5" />} label="微信" value={content.contact.wechat} />
                <ContactLine icon={<Globe2 className="h-5 w-5" />} label="方向" value="AI 客服 / 智能体 / NLP 工具 / 网站" />
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
                  手机号不会在前台公开。请在后台填写确认后的邮箱或微信，也可以先通过右下角 AI 客服了解服务范围。
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
          <p className="mt-2 text-sm text-slate-500">AI 应用开发者与智能系统实践者｜最近更新：{updatedAt}</p>
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
