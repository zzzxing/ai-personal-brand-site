"use client";

import { useMemo, useState } from "react";
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
    text: "你好，我是 AI 客服演示助手。你可以问我：小企业怎么接 AI 客服？网站原型多久能上线？自动化工具能解决什么问题？"
  }
];

const quickReplies = ["我想做 AI 客服", "我需要一个官网", "自动化工具怎么做"];

export function AiChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [input, setInput] = useState("");

  const difyEmbedUrl =
    process.env.NEXT_PUBLIC_DIFY_EMBED_URL ||
    (process.env.NEXT_PUBLIC_DIFY_CHATBOT_TOKEN
      ? `https://udify.app/chatbot/${process.env.NEXT_PUBLIC_DIFY_CHATBOT_TOKEN}`
      : "");

  const provider = useMemo(() => {
    if (difyEmbedUrl) {
      return "dify";
    }

    return "mock";
  }, [difyEmbedUrl]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    addMockReply(trimmed);
    setInput("");
  }

  function addMockReply(text: string) {
    setMessages((current) => [
      ...current,
      { role: "user", text },
      {
        role: "assistant",
        text:
          "收到。首版建议先做一个清晰的服务页和咨询入口，再把常见问题整理成知识库。这样小企业客户进来后，能马上知道你能做什么、怎么合作、下一步联系谁。"
      }
    ]);
    setOpen(true);
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
                <p className="text-sm font-semibold">AI 客服演示</p>
                <p className="text-xs text-white/80">
                  {provider === "mock" ? "模拟模式，可随时替换 Dify / Coze" : `已检测到 ${provider} 配置`}
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

          {provider === "dify" && difyEmbedUrl ? (
            <iframe
              title="Dify AI 客服"
              src={difyEmbedUrl}
              className="h-[520px] w-full border-0"
              loading="lazy"
            />
          ) : (
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
              </div>

              <div className="border-t border-slate-200 bg-white p-3">
                <div className="mb-3 flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      type="button"
                      className="focus-ring rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700"
                      onClick={() => addMockReply(reply)}
                    >
                      {reply}
                    </button>
                  ))}
                </div>
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="问问 AI 客服能帮你做什么"
                    className="focus-ring min-w-0 flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm"
                  />
                  <button
                    type="submit"
                    className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white transition hover:bg-teal-700"
                    aria-label="发送消息"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="focus-ring group flex items-center gap-3 rounded-full bg-slate-950 px-5 py-4 text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-teal-700"
        aria-label="打开 AI 客服演示窗口"
      >
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/12">
          <MessageCircle className="h-5 w-5" />
          <Sparkles className="absolute -right-1 -top-1 h-4 w-4 text-amber-300" />
        </span>
        <span className="text-sm font-semibold">问问 AI 客服</span>
      </button>
    </div>
  );
}
