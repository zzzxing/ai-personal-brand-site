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

const systemPrompt = `你是这个个人品牌官网的 AI 客服助手。网站主人的定位是：AI应用开发者，擅长用网页、智能体与自动化工具解决真实问题。

你的任务：
1. 向访客介绍网站主人能提供的服务；
2. 帮助小企业、个人品牌、教育/研学项目、轻量创业项目理解 AI 客服、网站原型、智能体工作流和自动化工具；
3. 引导访客说明自己的行业、需求、已有资料和期望效果；
4. 在合适的时候引导访客通过页面联系方式联系网站主人；
5. 回答要简洁、专业、亲和，不要堆技术名词。

服务范围包括：
- 个人品牌官网/企业落地页
- AI 客服与知识库问答
- Dify/Coze/DeepSeek 等 AI 应用接入
- 智能体工作流设计
- 表单、表格、资料整理等自动化工具
- 课程、研学、活动展示页
- 小程序或 Web 应用原型

限制：
1. 不要承诺固定价格；
2. 不要承诺绝对交付周期；
3. 不要编造不存在的真实客户案例；
4. 不要透露后台账号、密码、API Key、数据库连接信息；
5. 遇到超出能力范围的问题，要建议用户联系网站主人进一步沟通。`;

const mockReplies = [
  "可以的。建议先从一个清晰的服务页和 AI 客服入口开始：把你的服务对象、常见问题、联系方式和合作流程整理出来，再接入知识库问答。",
  "如果是小企业官网，首版可以先做首页、服务说明、案例/演示案例、FAQ 和联系入口。后续再根据真实咨询补后台、博客和数据看板。",
  "自动化工具通常适合处理资料收集、表格整理、摘要生成、重复通知等流程。你可以先告诉我行业、已有资料和希望减少哪一步人工操作。",
  "智能体工作流适合把固定流程拆成几个步骤，例如收集需求、整理信息、生成初稿、提醒跟进。具体方案需要结合你的业务细节评估。"
];

const sensitivePattern =
  /(api\s*key|apikey|secret|token|password|密码|口令|密钥|后台账号|后台密码|数据库|database_url|连接串|环境变量|env)/i;

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
        "抱歉，我不能透露后台账号、密码、API Key、数据库连接信息或环境变量。你可以咨询服务范围、合作流程、AI 客服方案或网站原型怎么做。"
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
      ? "AI 客服这次响应超时了，请稍后再试。你也可以先通过页面联系方式联系我。"
      : "AI 客服暂时连接不稳定，请稍后再试。你也可以先简单说明行业、需求和期望效果，我会继续帮你梳理。";

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

  if (lower.includes("客服") || lower.includes("ai")) {
    return mockReplies[0];
  }

  if (lower.includes("官网") || lower.includes("网站") || lower.includes("落地页")) {
    return mockReplies[1];
  }

  if (lower.includes("自动化") || lower.includes("表格") || lower.includes("资料")) {
    return mockReplies[2];
  }

  if (lower.includes("智能体") || lower.includes("agent")) {
    return mockReplies[3];
  }

  return "我可以先帮你判断适合做 AI 客服、网站原型、智能体工作流还是自动化工具。你可以简单说一下：你的行业、目标用户、目前最耗时间的流程，以及希望上线后达到什么效果。";
}
