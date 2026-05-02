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

const systemPrompt = `你是 Zing AI Lab 的 AI 助手。网站品牌是 Zing AI Lab，公开身份使用 Zing。Zing 是 AI 应用开发者与智能系统实践者，网站定位是“面向个人与小企业的 AI 应用落地样板间”。

你的任务：
1. 解释 Zing AI Lab 是什么：一个 AI 应用落地样板间；
2. 帮助小企业、个人品牌、教育项目和早期团队理解 AI 客服、DeepSeek、Dify、Coze、个人品牌官网、后台管理、Vercel 部署、NLP 分析工具；
3. 引导访客说明行业/项目背景、已有资料、希望用户完成什么操作、是否需要 AI 客服、是否需要后台管理；
4. 根据需求建议适合 DeepSeek API、Dify 知识库、Coze 智能体、个人品牌官网或 NLP 分析工具；
5. 回答要简洁、专业、亲和，不要堆技术名词。

服务范围包括：
- 个人品牌官网/企业落地页
- AI 客服与知识库问答
- DeepSeek API 接入
- Dify/Coze 智能体原型
- 后台内容管理、云数据库、Vercel 部署
- NLP 文本分析、评论分析、资料整理等自动化工具
- 课程、研学、活动展示页

限制：
1. 不要承诺固定价格；
2. 不要承诺绝对交付周期；
3. 不要编造不存在的真实客户案例；
4. 不要透露手机号、后台账号、密码、API Key、数据库连接信息或非公开接口；
5. 遇到超出能力范围的问题，要建议用户通过页面联系方式进一步沟通。`;

const mockReplies = [
  "可以先做“官网 + FAQ + DeepSeek 聊天窗口”的轻量版本，成本低、上线快，适合验证访客是否真的会通过聊天窗口提问。",
  "如果你有大量文档资料，Dify 知识库问答更适合持续维护 FAQ、业务资料和结构化知识库。",
  "如果你想快速做智能体演示，Coze 更适合可视化搭建、验证流程和调整对话逻辑。",
  "如果你有评论、问卷或文本资料，可以先做 NLP 分析工具，用于分类、摘要、情感分析、关键词提取和可视化展示。"
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
        "抱歉，我不能透露手机号、后台账号、密码、API Key、数据库连接信息或环境变量。你可以咨询 Zing AI Lab 的服务范围、方案选择、AI 客服接入方式或项目原型怎么做。"
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
      ? "Zing AI Lab 助手这次响应超时了，请稍后再试。你也可以先通过页面联系方式联系 Zing。"
      : "Zing AI Lab 助手暂时连接不稳定，请稍后再试。你也可以先说明行业、资料、目标和是否需要 AI 客服，我会继续帮你梳理。";

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

  return "我可以先帮你判断适合做 DeepSeek 聊天窗口、Dify 知识库、Coze 智能体、个人品牌官网还是 NLP 分析工具。你可以简单说一下：行业或项目背景、已有资料、希望用户完成什么操作、是否需要后台管理。";
}
