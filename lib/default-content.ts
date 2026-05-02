import type { SiteContent } from "@/lib/types";

export const defaultContent: SiteContent = {
  locale: "zh",
  name: "AI zing",
  tagline: "AI应用开发者｜用网页、智能体与自动化工具解决真实问题",
  heroTitle: "把 AI 想法做成能上线、能演示、能带来客户的应用",
  heroSubtitle:
    "这是一个起步阶段的 AI 应用开发者个人官网。我帮助小企业、老师、个人品牌和轻量创业项目快速搭建网站原型、AI 客服、智能体流程与自动化工具，让创意更快变成可演示、可上线、可继续优化的产品。",
  intro:
    "我关注真实业务场景：客户咨询太多、内容更新太慢、服务流程不清晰、项目想法缺少可演示原型。首版会先把服务表达、页面质感、咨询入口和上线流程跑通，再根据真实反馈逐步接入 AI 客服、数据看板、自动化和案例内容。",
  heroHighlights: ["7天内完成首版原型", "支持 Vercel 快速上线", "预留 AI 客服与双语扩展"],
  services: [
    {
      icon: "layout",
      title: "网页与落地页原型",
      description: "为个人品牌、小企业服务页、课程活动页制作高质感网页，适合展示、获客和投放测试。"
    },
    {
      icon: "bot",
      title: "AI 客服与知识库",
      description: "基于 Dify、Coze 或定制方案搭建咨询入口，让访客快速了解服务、价格和合作流程。"
    },
    {
      icon: "agent",
      title: "智能体工作流",
      description: "把重复沟通、资料整理、表单收集、内容生成等流程做成可复用的 AI 助手。"
    },
    {
      icon: "workflow",
      title: "自动化工具",
      description: "连接表格、消息、网页和数据接口，减少人工复制粘贴，提高小团队执行效率。"
    },
    {
      icon: "mobile",
      title: "小程序与应用原型",
      description: "先做能演示的交互原型和业务闭环，再根据反馈决定是否继续开发正式版本。"
    }
  ],
  audiences: [
    {
      title: "小企业与门店",
      description: "需要一个专业官网、咨询入口或自动回复流程，降低客户理解成本。"
    },
    {
      title: "个人品牌",
      description: "想展示服务、案例和方法论，让潜在客户更快建立信任。"
    },
    {
      title: "教育/研学场景",
      description: "适合课程展示、活动报名、学习助手、资料整理和项目成果页。"
    },
    {
      title: "轻量创业项目",
      description: "先快速做 MVP、落地页和演示后台，验证需求再继续投入。"
    }
  ],
  projects: [
    {
      title: "小企业 AI 客服演示站",
      category: "演示案例",
      description: "为本地服务商设计咨询入口，支持常见问题、服务介绍、联系方式引导，并预留 Dify 与 Coze 接入方式。",
      result: "把咨询路径压缩为 3 步：了解服务、匹配需求、留下联系方式",
      tags: ["Dify", "知识库", "落地页"]
    },
    {
      title: "课程活动报名原型",
      category: "可替换案例",
      description: "为研学/课程活动制作移动端友好的展示页与报名信息结构，重点优化老师和家长的阅读顺序。",
      result: "首屏说明对象、收益、流程和报名入口，适合朋友圈、社群和二维码传播",
      tags: ["Next.js", "表单", "移动端"]
    },
    {
      title: "自动化内容整理助手",
      category: "演示案例",
      description: "把资料收集、摘要生成、表格整理流程做成可重复使用的工具，减少手动复制和反复排版。",
      result: "把资料收集、摘要、归档拆成 3 个固定步骤，方便小团队复用",
      tags: ["Agent", "工作流", "数据看板"]
    }
  ],
  process: [
    {
      step: "01",
      title: "需求沟通",
      description: "明确目标用户、服务内容、必须上线的页面和最小可用版本。"
    },
    {
      step: "02",
      title: "快速搭建",
      description: "先做高质感首版页面、管理后台和基础数据结构，方便你审核效果。"
    },
    {
      step: "03",
      title: "上线部署",
      description: "部署到 Vercel，配置数据库、环境变量、域名和基础 SEO。"
    },
    {
      step: "04",
      title: "迭代优化",
      description: "根据反馈、geocheck、真实客户咨询和案例积累继续优化。"
    }
  ],
  skills: [
    "Next.js",
    "React",
    "Vercel",
    "Neon Postgres",
    "AI Agent",
    "Dify / Coze",
    "自动化流程",
    "数据看板",
    "SEO",
    "小程序原型"
  ],
  faqs: [
    {
      question: "我只有一个想法，没有详细需求，可以做吗？",
      answer: "可以。首轮会先把目标用户、服务内容、转化目标和最小可上线版本梳理清楚，再做一个能展示、能收集反馈的版本。"
    },
    {
      question: "AI 客服一定要一开始就接真实平台吗？",
      answer: "不一定。首版可以先用模拟窗口展示效果，等你拿到 Dify 或 Coze 的链接后，再通过环境变量启用真实客服，降低首次部署失败风险。"
    },
    {
      question: "小企业官网和 AI 应用一般多久能看到首版？",
      answer: "简单展示型页面通常 3 到 7 天能看到首版原型；涉及后台、数据库和 AI 接入时，会先保证稳定上线，再逐步增强。"
    },
    {
      question: "后续能继续加博客、案例和数据看板吗？",
      answer: "可以。项目结构已经为内容管理、SEO、双语、AI 客服和数据看板预留扩展空间，后续可以按真实客户反馈继续增加栏目。"
    }
  ],
  contact: {
    email: "请在后台填写邮箱",
    wechat: "请在后台填写微信",
    note: "欢迎先发一句：我想做一个 AI 客服/网站/自动化工具。联系方式请在后台替换为你的真实信息。"
  },
  seo: {
    title: "AI应用开发者｜AI客服、网站原型与自动化工具",
    description:
      "为小企业、个人品牌、教育场景和轻量创业项目搭建 AI 客服、网站原型、智能体工作流与自动化工具，支持 Vercel 部署、后台管理和后续 GEO/SEO 优化。",
    keywords: ["AI应用开发者", "AI客服", "网页原型", "智能体", "自动化工具", "Vercel", "Next.js"]
  }
};
