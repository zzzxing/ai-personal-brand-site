"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Bot, MessageCircle, Minimize2, Send, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ChatMessage = {
  role: "assistant" | "user";
  text: string;
};

const starterMessages: ChatMessage[] = [
  {
    role: "assistant",
    text: "你好，我是智页 AI 助手。你可以问我：小企业如何接入 AI 客服、DeepSeek/Dify/Coze 怎么选、项目展示页怎么做，或者如何把一个 AI 想法做成可上线原型。"
  }
];

const quickReplies = ["小企业接 AI 客服", "DeepSeek/Dify/Coze 怎么选", "AI 想法怎么上线"];
const fallbackReply =
  "收到。智页建议先做“官网 + FAQ + AI 客服 + 联系入口”的最小版本，等访客真的开始提问后，再根据高频问题补知识库、优化提示词和升级工作流。";

export function AiChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    await sendMessage(trimmed);
    setInput("");
  }

  async function sendMessage(text: string) {
    setOpen(true);
    const nextMessages: ChatMessage[] = [...messages, { role: "user", text }];
    setMessages(nextMessages);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: text,
          messages: messages.slice(-10)
        })
      });

      const data = await response.json().catch(() => null);
      const reply = typeof data?.reply === "string" && data.reply.trim() ? data.reply.trim() : fallbackReply;

      setMessages((current) => [...current, { role: "assistant", text: reply }]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: "AI 客服暂时连接不稳定，请稍后再试。你也可以先通过页面联系方式联系我。"
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open ? (
        <div className="w-[min(380px,calc(100vw-2.5rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/18">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">智页 AI 助手</p>
                <p className="text-xs text-white/80">
                  DeepSeek 未配置时自动降级为模拟问答
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="focus-ring rounded-full p-2 text-white/80 transition hover:bg-white/15 hover:text-white"
                aria-label="最小化聊天窗口"
                onClick={() => setOpen(false)}
              >
                <Minimize2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="focus-ring rounded-full p-2 text-white/80 transition hover:bg-white/15 hover:text-white"
                aria-label="关闭聊天窗口"
                onClick={() => {
                  setOpen(false);
                  setMessages(starterMessages);
                }}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex h-[520px] flex-col">
            <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50/80 p-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6",
                      message.role === "user"
                        ? "bg-teal-600 text-white"
                        : "border border-slate-200 bg-white text-slate-700"
                    )}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {loading ? (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
                    正在思考...
                  </div>
                </div>
              ) : null}
            </div>

            <div className="border-t border-slate-200 bg-white p-3">
              <div className="mb-3 flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    className="focus-ring rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700"
                    onClick={() => sendMessage(reply)}
                    disabled={loading}
                  >
                    {reply}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="问智页能怎么落地 AI 应用"
                  className="focus-ring min-w-0 flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm"
                  maxLength={1000}
                  disabled={loading}
                />
                <button
                  type="submit"
                  className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                  aria-label="发送消息"
                  disabled={loading}
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="focus-ring group flex items-center gap-3 rounded-full bg-slate-950 px-5 py-4 text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-teal-700"
        aria-label="打开智页 AI 客服演示窗口"
      >
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/12">
          <MessageCircle className="h-5 w-5" />
          <Sparkles className="absolute -right-1 -top-1 h-4 w-4 text-amber-300" />
        </span>
        <span className="text-sm font-semibold">问智页 AI</span>
      </button>
    </div>
  );
}
