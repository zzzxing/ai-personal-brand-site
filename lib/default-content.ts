import type { SiteContent } from "@/lib/types";

export const defaultContent: SiteContent = {
  locale: "zh",
  contentVersion: "geo-home-v2",
  name: "AI zing",
  tagline: "AI应用开发者｜用网页、智能体与自动化工具解决真实问题",
  heroTitle: "AI应用开发者：用网页、智能体与自动化工具解决真实问题",
  heroSubtitle:
    "我可以帮助个人、小企业和轻量项目快速搭建 AI 客服、个人品牌网站、智能体原型和自动化工具，并部署到可访问的网址。这个网站本身也是一个可上线、可交互、可迭代的 AI 应用开发者个人官网样板。",
  intro:
    "我关注真实业务场景：客户咨询太多、内容更新太慢、服务流程不清晰、项目想法缺少可演示原型。首版会先把服务表达、页面质感、咨询入口和上线流程跑通，再根据真实反馈逐步接入 AI 客服、数据看板、自动化和案例内容。",
  heroHighlights: ["3 类服务方向", "5 步交付流程", "8 个常见问题", "1 个在线 AI 客服演示"],
  services: [
    {
      icon: "bot",
      title: "AI 客服与知识库",
      description: "可基于 DeepSeek、Dify、Coze 等工具，制作网站右下角客服、FAQ 自动问答、资料问答助手和服务咨询入口。适合回答常见问题、引导访客描述需求、收集联系方式。"
    },
    {
      icon: "layout",
      title: "个人/小企业网站与落地页",
      description: "可制作个人品牌页、企业服务介绍页、项目展示页、比赛展示页和活动落地页，并部署到 Vercel，生成一个可以公开访问、便于分享和继续优化的网址。"
    },
    {
      icon: "workflow",
      title: "轻量自动化工具与 AI 原型",
      description: "可制作表单整理、资料归类、文本生成、学习助手、研学平台原型、客户需求整理和数据看板雏形，先验证流程，再决定是否扩展为正式系统。"
    }
  ],
  audiences: [
    {
      title: "小企业与门店",
      description: "适合需要官网、AI 客服、FAQ 自动回复、预约说明和客户咨询入口的小企业、门店和本地服务团队。"
    },
    {
      title: "个人品牌",
      description: "适合想展示服务、项目、方法论和联系方式的个人开发者、老师、咨询顾问和自由职业者。"
    },
    {
      title: "教育/研学场景",
      description: "适合课程展示、活动报名、学习助手、资料整理、比赛项目页和学生作品原型。"
    },
    {
      title: "轻量创业项目",
      description: "适合先快速做 MVP、落地页、AI 原型和演示后台，验证需求再继续投入。"
    }
  ],
  projects: [
    {
      title: "小企业 AI 客服演示站",
      category: "演示案例",
      description: "为本地服务商设计右下角 AI 客服入口，支持服务介绍、常见问题、合作流程、联系方式引导，并可接入 DeepSeek、Dify 或 Coze。",
      result: "用于演示小企业如何先把重复咨询整理成可问答的知识库。",
      tags: ["DeepSeek", "Dify", "FAQ"]
    },
    {
      title: "个人品牌官网",
      category: "演示案例",
      description: "为正在建立个人影响力的开发者、老师或服务者制作首页、服务说明、案例方向、FAQ、联系方式和后台管理。",
      result: "用于把个人能力从聊天记录和文档，整理成一个可分享、可搜索、可持续更新的网址。",
      tags: ["Next.js", "Vercel", "SEO"]
    },
    {
      title: "教育/研学 AI 助手",
      category: "可替换案例",
      description: "为课程、研学、比赛或学生项目制作 AI 助手原型，支持资料问答、活动说明、学习路径提示和成果展示。",
      result: "用于让老师、同学或评委直接体验项目，而不是只看 PPT 截图。",
      tags: ["AI 助手", "课程展示", "原型"]
    },
    {
      title: "自动化资料整理工具",
      category: "演示案例",
      description: "把表单、表格、文档、客户需求和课程资料整理成可复用流程，减少重复复制、摘要和归类。",
      result: "用于演示轻量自动化工具如何先解决一个明确、重复、可验证的问题。",
      tags: ["自动化", "表格", "工作流"]
    }
  ],
  process: [
    {
      step: "01",
      title: "需求沟通",
      description: "你提供行业、目标用户、已有资料和期望效果；我帮你判断适合先做 AI 客服、网站落地页、智能体原型还是自动化工具。"
    },
    {
      step: "02",
      title: "资料整理",
      description: "你提供文字、图片、FAQ、服务说明或表格；我把内容整理成页面结构、客服知识点和可执行的原型范围。"
    },
    {
      step: "03",
      title: "原型搭建",
      description: "搭建首页、服务模块、案例区、FAQ、联系入口、后台内容管理和 AI 客服接口，让你能直接审核效果。"
    },
    {
      step: "04",
      title: "在线部署",
      description: "部署到 Vercel，配置环境变量、数据库、站点地址、robots、sitemap、llms.txt 和基础结构化数据。"
    },
    {
      step: "05",
      title: "迭代优化",
      description: "根据 geocheck、真实访客咨询、客户反馈和新增案例继续优化内容深度、转化路径、AI 客服和后台能力。"
    }
  ],
  skills: [
    "Next.js",
    "Vercel",
    "DeepSeek API",
    "Dify / Coze 智能体",
    "Neon Postgres 内容保存",
    "Tailwind / shadcn UI",
    "Codex 辅助开发",
    "AI 客服知识库",
    "自动化工作流",
    "SEO",
    "GEO / llms.txt"
  ],
  faqs: [
    {
      question: "我可以帮小企业做什么？",
      answer: "可以先帮小企业做一个清晰的服务型官网、右下角 AI 客服、常见问题问答、服务流程说明、联系方式引导和轻量自动化工具。首版重点是让客户看懂你能提供什么，并能通过公开网址访问。"
    },
    {
      question: "AI 客服适合哪些店铺或团队？",
      answer: "适合重复咨询较多的本地服务、小企业、课程活动、个人品牌、研学项目和轻量创业团队。常见问题包括服务内容、预约方式、资料准备、合作流程、售后说明和联系方式。"
    },
    {
      question: "需要客户提前准备什么资料？",
      answer: "最好准备服务介绍、目标客户、常见问题、联系方式、已有图片或文档、希望展示的案例方向。如果资料不完整，也可以先从一句话需求开始，我会帮助整理成页面和客服知识点。"
    },
    {
      question: "可以接入 DeepSeek、Dify 或 Coze 吗？",
      answer: "可以。本站当前已经预留 DeepSeek API 的服务端接入方式，也保留 Dify 和 Coze 的后续扩展思路。API Key 会放在服务端环境变量中，不会写进前端代码。"
    },
    {
      question: "网站能部署成公开网址吗？",
      answer: "可以。项目优先部署到 Vercel，部署成功后会得到一个可访问的网址。后续也可以绑定自定义域名，并补充 sitemap、robots、Open Graph、JSON-LD 和 llms.txt。"
    },
    {
      question: "能不能后续继续修改？",
      answer: "可以。后台可以修改首页关键内容，包括服务、案例、FAQ、联系方式和 SEO 信息。后续也可以继续增加博客、真实案例、数据看板、表单和更完整的 AI 客服知识库。"
    },
    {
      question: "如果我只是有想法，没有技术方案怎么办？",
      answer: "可以先说清楚你面对的人群、想解决的问题、已有资料和希望别人看到什么结果。我会先帮你拆成最小可上线版本，不会一开始就要求你准备完整技术方案。"
    },
    {
      question: "如何联系我进一步沟通？",
      answer: "你可以先通过页面右下角 AI 客服了解服务范围，也可以在联系方式区域查看邮箱或微信。当前默认联系方式是占位内容，正式上线前建议在后台替换成你的真实邮箱和微信。"
    }
  ],
  contact: {
    email: "请在后台填写邮箱",
    wechat: "请在后台填写微信",
    note: "欢迎先发一句：我想做一个 AI 客服/网站/自动化工具。联系方式请在后台替换为你的真实信息。"
  },
  seo: {
    title: "AI应用开发者｜AI客服、智能体与自动化工具服务",
    description:
      "个人 AI 应用开发者官网，展示 AI 客服、智能体原型、个人品牌网站、小企业落地页和自动化工具的搭建能力，支持 DeepSeek、Dify、Coze 与 Vercel 部署实践。",
    keywords: ["AI应用开发者", "AI客服", "智能体", "自动化工具", "个人品牌官网", "小企业落地页", "DeepSeek", "Dify", "Coze", "Vercel"]
  }
};
