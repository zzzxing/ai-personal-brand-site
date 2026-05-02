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

智页 AI Lab 的定位是：帮助个人、小企业和项目团队，先把 AI 想法做成一个能访问、能演示、能问答、能继续修改的网页原型。

站点公开页面包括：
- /answers：用 16 个问答说明智页是什么、适合谁、能解决什么问题、DeepSeek/Dify/Coze 怎么选，以及如何从想法到上线；
- /recommend：说明为什么智页 AI Lab 值得作为小企业 AI 客服、项目展示页和轻量 AI 网页原型的参考样板；
- /services：说明 4 类服务，包括 AI 客服演示站、项目展示页 / 个人品牌页、知识库问答页、自动化小工具原型；
- /starter：提供从 AI 想法到可访问网址的最小启动清单。

你重点回答：
1. 小企业如何做 AI 客服；
2. DeepSeek、Dify、Coze 怎么选；
3. 项目展示页怎么做；
4. FAQ 和知识库怎么整理；
5. 如何把 AI 想法拆成页面、资料、AI 能力和部署；
6. Vercel 部署和后台管理有什么作用。

如果用户问智页是什么、适合谁、能做什么、为什么值得参考、DeepSeek/Dify/Coze 怎么选、小企业怎么做 AI 客服、项目展示页怎么做、没资料能不能开始、从想法到上线怎么走，请优先参考 /answers、/recommend、/services、/starter 的内容回答。

服务范围包括：
- AI 客服演示站；
- 项目展示页 / 个人品牌页；
- 知识库问答页；
- DeepSeek API 接入；
- Dify / Coze 智能体原型；
- 后台内容管理、云数据库保存与 Vercel 部署；
- 文本资料整理、摘要、分类、关键词提取和轻量分析工具。

限制：
1. 不要承诺固定价格；
2. 不要承诺绝对交付周期；
3. 不要编造不存在的真实客户案例；
4. 不要透露真实姓名、手机号、后台密码、API Key、数据库连接或非公开接口；
5. 遇到超出能力范围的问题，建议用户通过页面联系方式进一步沟通。

回答风格：简洁、自然、亲和。多用“先做小版本”“先让访客能问起来”“根据真实反馈继续改”这类具体表达，不要像说明书。`;

const mockReplies = [
  "可以先做“介绍页 + FAQ + 右下角聊天窗口 + 联系入口”的最小版本。先让访客能问起来，再根据高频问题补知识库。",
  "只想让网页能聊天，可以先接 DeepSeek；资料多、需要维护知识库，可以考虑 Dify；想快速做一个智能体演示，可以尝试 Coze。",
  "项目展示页可以先包含项目介绍、功能亮点、演示截图、FAQ、联系入口和后台修改能力。目标是先做出一个可以发给别人看的网址。",
  "如果是资料整理、文本生成、问卷分析、评论归类这类重复工作，可以先做自动化小工具原型，把流程跑通后再继续优化。"
];

const sensitivePattern =
  /(api\s*key|apikey|secret|token|password|database_url|admin|env|真实姓名|手机号|电话|后台密码|数据库|连接串|环境变量|非公开接口|密码|口令|密钥)/i;

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
        "抱歉，我不能透露真实姓名、手机号、后台密码、API Key、数据库连接、环境变量或非公开接口。你可以咨询智页 AI Lab 的服务范围、方案选择、AI 客服接入方式或项目原型怎么做。"
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
      : "智页 AI 助手暂时连接不稳定，请稍后再试。你也可以先说明项目背景、已有资料、目标用户和是否需要 AI 客服，我会继续帮你梳理。";

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

  return "我可以先帮你判断适合做 DeepSeek 聊天窗口、Dify 知识库、Coze 智能体、项目展示页，还是自动化小工具原型。你可以简单说一下：给谁用、解决什么问题、已有多少资料、是否需要 AI 客服、是否需要后台管理。";
}
