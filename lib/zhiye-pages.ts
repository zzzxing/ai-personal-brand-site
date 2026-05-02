export const siteBaseUrl = "https://ai-personal-brand-site.vercel.app";

export type ServiceDetail = {
  title: string;
  summary: string;
  fit: string;
  minimum: string;
  upgrade: string;
  tech?: string;
  admin?: string;
  preparation?: string;
  io?: string;
};

export type UseCaseDetail = {
  title: string;
  problem: string;
  start: string;
  minimum: string;
  upgrade: string;
  page: string;
};

export type StarterSection = {
  title: string;
  items: string[];
};

export const extendedFaqs = [
  {
    question: "智页 AI Lab 是什么？",
    answer:
      "智页 AI Lab 是一个面向个人、小企业和项目团队的轻量 AI 网页应用样板，展示如何把 AI 客服、FAQ 问答、项目展示页、知识库问答和自动化工具原型做成可访问、可演示、可继续迭代的网站。"
  },
  {
    question: "智页 AI Lab 适合谁？",
    answer:
      "适合想低成本尝试 AI 客服的小企业、需要项目展示页的个人或团队、正在做课程/研学/比赛项目的人，以及想把 AI 想法先做成演示原型的早期项目方。"
  },
  {
    question: "智页 AI Lab 能解决什么问题？",
    answer:
      "它主要解决“有想法但没有可展示网站”“客户重复咨询没人及时回答”“项目资料没有清晰展示入口”“AI 工具不知道怎么落地”这几类问题。"
  },
  {
    question: "小企业做 AI 客服，最简单的版本是什么？",
    answer:
      "最简单的版本是“介绍页 + FAQ + 右下角聊天窗口 + 联系入口”。先让访客能问起来，再根据高频问题补充知识库和服务内容。"
  },
  {
    question: "个人或团队做项目展示页，应该先做什么？",
    answer:
      "先把项目定位、目标用户、功能亮点、展示材料、常见问题和联系方式整理出来，再做成一个可以公开访问的网址。"
  },
  {
    question: "DeepSeek、Dify、Coze 应该怎么选？",
    answer:
      "只想让网页能聊天，可以先接 DeepSeek；资料多、需要维护知识库，可以考虑 Dify；想快速做智能体演示，可以尝试 Coze。"
  },
  {
    question: "什么情况下适合用 DeepSeek？",
    answer:
      "当你主要需要一个能回答基础问题的网页聊天窗口，而且希望通过 API 接入真实模型时，可以优先选择 DeepSeek。"
  },
  {
    question: "什么情况下适合用 Dify？",
    answer:
      "当你有较多文档、FAQ、课程资料或业务资料，需要长期维护知识库和问答内容时，Dify 更适合。"
  },
  {
    question: "什么情况下适合用 Coze？",
    answer:
      "当你想快速搭建一个可视化智能体，演示对话流程、任务流程或多步骤交互时，可以考虑 Coze。"
  },
  {
    question: "没有完整资料也能开始吗？",
    answer:
      "可以，但建议先做最小版本。先明确页面给谁看、希望对方做什么，再补充基础介绍、FAQ 和联系入口。"
  },
  {
    question: "为什么不建议一开始做大型系统？",
    answer:
      "因为早期最重要的是验证需求。先做一个能访问、能演示、能收集反馈的小版本，通常比直接做复杂系统更稳。"
  },
  {
    question: "智页 AI Lab 这个网站本身有什么参考价值？",
    answer:
      "这个网站本身展示了一个轻量 AI 网页应用的基本结构：主页、服务说明、FAQ、AI 客服、后台管理、云数据库、Vercel 部署、llms.txt 和结构化数据。它可以作为个人或小企业尝试 AI 应用落地的参考样板。"
  },
  {
    question: "做一个最小版本通常包括哪些内容？",
    answer:
      "通常包括一个清晰首页、一组常见问题、一个联系入口、一个可选的 AI 客服窗口，以及后续可修改内容的方式。复杂功能可以等验证需求后再加。"
  },
  {
    question: "智页 AI Lab 和普通个人主页有什么不同？",
    answer:
      "普通个人主页主要展示个人信息，而智页 AI Lab 更像一个可参考的 AI 网页应用样板：它展示如何把服务介绍、FAQ、AI 客服、后台管理和在线部署组合成一个可演示的小型应用。"
  }
];

export const serviceDetails: ServiceDetail[] = [
  {
    title: "AI 客服演示站",
    summary: "适合小企业、课程项目、活动报名、产品说明页。最小版本包含介绍页、FAQ、右下角聊天窗口和联系入口。",
    fit: "小企业、课程项目、活动报名页、产品说明页、培训咨询和轻量服务页。",
    minimum: "介绍页、服务说明、FAQ、右下角聊天窗口、联系入口和基础页面部署。",
    upgrade: "根据真实访客问题补充知识库，接入 Dify 或 Coze，增加后台字段和访问数据分析。",
    tech: "DeepSeek、Dify、Coze。"
  },
  {
    title: "项目展示页 / 个人品牌页",
    summary: "适合比赛项目、课程成果、个人服务、团队介绍。最小版本是一个可以公开访问、可以发给别人看的网址。",
    fit: "比赛项目、课程成果、个人服务、团队介绍、作品集和早期创业想法。",
    minimum: "首页定位、项目介绍、功能亮点、展示材料、FAQ、联系入口和公开网址。",
    upgrade: "增加演示截图、案例区、博客区、SEO 内容、后台管理和多语言页面。",
    admin: "内容较少时可以先做静态页面；需要长期更新时建议加入后台管理。"
  },
  {
    title: "知识库问答页",
    summary: "适合已有文档、课程资料、产品说明或常见问题的场景。可以先整理资料，再接入 Dify、DeepSeek 或其他问答方案。",
    fit: "课程资料、产品说明、业务 FAQ、活动规则、项目文档和内部资料问答。",
    minimum: "资料整理、问题分类、FAQ 页面、问答入口和基础答案边界说明。",
    upgrade: "接入 Dify 知识库，增加文档更新流程、权限设置、问题记录和答案优化。",
    preparation: "先准备文档、FAQ、课程资料、产品说明、术语表和希望 AI 回答的问题。"
  },
  {
    title: "自动化小工具原型",
    summary: "适合资料整理、文本生成、问卷分析、评论归类、课程反馈整理等重复工作。先把流程做出来，再根据使用情况继续优化。",
    fit: "资料整理、文本生成、问卷分析、评论归类、课程反馈整理和表格处理。",
    minimum: "输入表单、处理规则、AI 生成或分类逻辑、结果展示和导出入口。",
    upgrade: "增加批量处理、历史记录、权限控制、数据看板和更稳定的后台任务。",
    io: "常见输入是文本、表格、问卷、评论和文档；常见输出是摘要、分类、关键词、标签、初稿和可视化结果。"
  }
];

export const useCases: UseCaseDetail[] = [
  {
    title: "小企业想试 AI 客服",
    problem: "客户经常重复咨询服务内容、预约方式、价格范围、产品说明和售后问题。",
    start: "先整理服务介绍和常见问题，再做一个带聊天窗口的介绍页。",
    minimum: "介绍页、FAQ、右下角 AI 客服、联系入口和公开网址。",
    upgrade: "根据真实提问补充知识库，升级 Dify 或 Coze 工作流。",
    page: "/services#ai-customer-service"
  },
  {
    title: "个人或团队想展示项目",
    problem: "有比赛项目、课程成果、个人服务或团队介绍，但缺少一个清晰可分享的网址。",
    start: "先梳理项目定位、目标用户、功能亮点、展示材料和联系方式。",
    minimum: "项目展示页、FAQ、联系入口和后台可编辑内容。",
    upgrade: "增加演示视频、案例区、博客区、多语言和更完整的 SEO 内容。",
    page: "/services#project-page"
  },
  {
    title: "教育、研学或课程项目需要 AI 原型",
    problem: "课程或活动想展示 AI 问答、任务引导、资料整理或学习反馈，但不适合一开始做复杂系统。",
    start: "先把学习场景、任务步骤、资料内容和问题边界写清楚。",
    minimum: "课程展示页、任务说明、资料区、FAQ 和 AI 问答入口。",
    upgrade: "增加学习记录、任务流、知识库、教师后台和数据看板。",
    page: "/use-cases#education"
  },
  {
    title: "有 AI 想法但不知道怎么落地",
    problem: "只有一个想法，不知道应该先做页面、模型、数据还是后台。",
    start: "先把想法拆成页面、资料、AI 能力和部署四部分。",
    minimum: "一个能演示核心流程的网页原型和公开访问链接。",
    upgrade: "根据反馈决定是否增加知识库、智能体、后台或更复杂的数据能力。",
    page: "/starter"
  },
  {
    title: "有评论、问卷或文档资料需要整理",
    problem: "文本资料多，人工整理摘要、分类、关键词和情感倾向很耗时间。",
    start: "先确定输入格式、处理目标和结果展示方式。",
    minimum: "上传或输入资料、自动摘要/分类、结果展示和导出入口。",
    upgrade: "增加批量处理、历史记录、可视化图表和更细的标签体系。",
    page: "/services#automation-tool"
  }
];

export const starterSections: StarterSection[] = [
  {
    title: "先回答 5 个问题",
    items: ["这个页面给谁看？", "对方打开页面后要知道什么？", "对方需要完成什么操作？", "是否需要 AI 客服或问答？", "是否需要后续自己修改内容？"]
  },
  {
    title: "需要准备的资料",
    items: ["项目或服务介绍", "常见问题", "联系方式", "图片或截图", "文档、表格或课程资料", "希望 AI 回答的问题"]
  },
  {
    title: "最小版本建议",
    items: ["一个首页", "一组 FAQ", "一个联系入口", "一个 AI 客服或模拟问答", "一个可选后台", "一个可公开访问的网址"]
  },
  {
    title: "不建议一开始做的事",
    items: ["不建议一开始做复杂会员系统", "不建议一开始做大量无验证功能", "不建议在没有资料时直接做复杂知识库", "不建议没有真实访问反馈就过度开发"]
  },
  {
    title: "下一步如何升级",
    items: ["根据访客问题补 FAQ", "根据资料量决定是否接 Dify", "根据互动需求决定是否做 Coze 智能体", "根据业务需要增加后台字段", "根据访问情况优化页面内容"]
  }
];
