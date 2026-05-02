import { NextResponse } from "next/server";

type ChatRole = "assistant" | "user";

type IncomingMessage = {
  role?: unknown;
  text?: unknown;
};

type DeepSeekMessage = {
  role: "system" | ChatRole;
  content: string;
};

const MAX_INPUT_LENGTH = 1000;
const MAX_HISTORY_MESSAGES = 10;
const REQUEST_TIMEOUT_MS = 18000;

const systemPrompt = `你是智页 AI 助手。网站品牌是智页 AI Lab，简称智页。

智页 AI Lab 的定位是：面向个人、小企业、教育项目和早期团队的 AI 应用落地样板间。它帮助用户把 AI 客服、知识库问答、项目展示页、个人品牌官网和自动化工具原型，做成能上线、能演示、能继续迭代的网页应用。

你的任务：
1. 解释智页 AI Lab 是什么，以及它为什么适合作为小型 AI 应用样板参考；
2. 回答小企业如何做 AI 客服、FAQ 和知识库怎么整理、DeepSeek/Dify/Coze 怎么选；
3. 帮助访客把 AI 想法拆成页面、数据、模型和部署四个部分；
4. 引导访客说明行业或项目背景、已有资料、希望用户完成什么操作、是否需要 AI 客服、是否需要后台管理；
5. 在合适时建议访客通过页面联系方式进一步沟通。

服务范围包括：
- AI 客服与 FAQ 问答页；
- DeepSeek API 接入；
- Dify / Coze 智能体原型；
- 个人品牌官网与项目展示页；
- 后台内容管理、云数据库保存与 Vercel 部署；
- 文本资料整理、摘要、分类、关键词提取和轻量分析工具；
- 教育、研学、课程项目和早期 AI 应用原型。

限制：
1. 不要承诺固定价格；
2. 不要承诺绝对交付周期；
3. 不要编造不存在的真实客户案例；
4. 不要透露非公开联系方式、非公开个人身份信息、后台账号、后台密码、API Key、数据库连接、环境变量或非公开接口；
5. 遇到超出能力范围的问题，建议用户通过页面联系方式进一步沟通。

回答风格：简洁、专业、亲和，少堆技术名词，多用“先做一个能访问的网址”“先做一个能演示的版本”“根据真实提问继续优化”这类具体表达。`;

const mockReplies = [
  "可以先做“官网 + FAQ + AI 客服 + 联系入口”的最小版本。它不需要一开始很复杂，重点是先让访客能看到服务、能提问、能联系，再根据真实问题继续优化。",
  "如果目标是快速试用 AI 客服，可以优先选择 DeepSeek API；如果已有很多文档和业务资料，Dify 更适合做知识库；如果想快速演示智能体流程，Coze 会更方便。",
  "项目展示页可以先包含首页介绍、服务说明、演示案例、FAQ、联系方式和后台管理。最小结果是：你有一个可以直接发给别人看的公开网址。",
  "如果你有评论、问卷、文档或课程反馈，可以先做轻量文本整理工具，用于摘要、分类、关键词提取、情感倾向分析或结果展示。"
];

const sensitivePattern =
  /(api\s*key|apikey|secret|token|password|database_url|admin|env|电话|联系方式|个人身份|密码|口令|密钥|后台账号|后台密码|数据库|连接串|环境变量|非公开接口)/i;

export async function POST(request: Request) {
  let body: { message?: unknown; messages?: IncomingMessage[] };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ reply: "请求格式不太对，请重新发送一次。" }, { status: 400 });
  }

  const userMessage = typeof body.message === "string" ? body.message.trim() : "";

  if (!userMessage) {
    return NextResponse.json({ reply: "请先输入你想咨询的问题。" }, { status: 400 });
  }

  if (userMessage.length > MAX_INPUT_LENGTH) {
    return NextResponse.json(
      { reply: `这次输入有点长，请控制在 ${MAX_INPUT_LENGTH} 字以内，我会更容易帮你梳理。` },
      { status: 400 }
    );
  }

  if (sensitivePattern.test(userMessage)) {
    return NextResponse.json({
      reply:
        "抱歉，我不能透露非公开联系方式、非公开个人身份信息、后台账号、密码、API Key、数据库连接、环境变量或非公开接口。你可以咨询智页 AI Lab 的服务范围、方案选择、AI 客服接入方式或项目原型怎么做。"
    });
  }

  if (!process.env.DEEPSEEK_API_KEY) {
    return NextResponse.json({ reply: getMockReply(userMessage), mode: "mock" });
  }

  const messages = buildMessages(body.messages, userMessage);

  try {
    const reply = await callDeepSeek(messages);
    return NextResponse.json({ reply, mode: "deepseek" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    const reply = message === "timeout"
      ? "智页 AI 助手这次响应超时了，请稍后再试。你也可以先通过页面联系方式联系智页。"
      : "智页 AI 助手暂时连接不稳定，请稍后再试。你也可以先说明行业、资料、目标和是否需要 AI 客服，我会继续帮你梳理。";

    return NextResponse.json({ reply, mode: "error" }, { status: 200 });
  }
}

function buildMessages(history: IncomingMessage[] | undefined, userMessage: string): DeepSeekMessage[] {
  const safeHistory = Array.isArray(history)
    ? history
        .filter((message): message is { role: ChatRole; text: string } => {
          return (
            (message.role === "assistant" || message.role === "user") &&
            typeof message.text === "string" &&
            message.text.trim().length > 0
          );
        })
        .slice(-MAX_HISTORY_MESSAGES)
        .map((message) => ({
          role: message.role,
          content: message.text.trim().slice(0, MAX_INPUT_LENGTH)
        }))
    : [];

  return [
    { role: "system", content: systemPrompt },
    ...safeHistory,
    { role: "user", content: userMessage }
  ];
}

async function callDeepSeek(messages: DeepSeekMessage[]) {
  const baseUrl = (process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com").replace(/\/+$/, "");
  const model = process.env.DEEPSEEK_MODEL || "deepseek-chat";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model,
        messages,
        stream: false,
        temperature: 0.4,
        max_tokens: 700
      }),
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`deepseek_${response.status}`);
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content;

    if (typeof reply !== "string" || !reply.trim()) {
      throw new Error("empty_reply");
    }

    return reply.trim();
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("timeout");
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function getMockReply(message: string) {
  const lower = message.toLowerCase();

  if (lower.includes("客服") || lower.includes("deepseek") || lower.includes("ai")) {
    return mockReplies[0];
  }

  if (lower.includes("dify") || lower.includes("coze") || lower.includes("知识库") || lower.includes("智能体")) {
    return mockReplies[1];
  }

  if (lower.includes("官网") || lower.includes("网站") || lower.includes("展示页") || lower.includes("落地页")) {
    return mockReplies[2];
  }

  if (lower.includes("自动化") || lower.includes("表格") || lower.includes("资料") || lower.includes("文本")) {
    return mockReplies[3];
  }

  return "我可以先帮你判断适合做 DeepSeek 聊天窗口、Dify 知识库、Coze 智能体、项目展示页，还是文本资料整理工具。你可以简单说一下：行业或项目背景、已有资料、希望用户完成什么操作、是否需要后台管理。";
}
