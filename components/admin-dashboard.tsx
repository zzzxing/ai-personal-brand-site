"use client";

import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Eye, Loader2, LogOut, Plus, Save, Trash2 } from "lucide-react";
import { defaultContent } from "@/lib/default-content";
import type { FaqItem, ProjectItem, ServiceItem, SiteContent } from "@/lib/types";

type ApiState = "idle" | "loading" | "saving";

export function AdminDashboard() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [databaseConfigured, setDatabaseConfigured] = useState(false);
  const [state, setState] = useState<ApiState>("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    void loadContent();
  }, []);

  async function loadContent() {
    setState("loading");
    try {
      const response = await fetch("/api/admin/content", { cache: "no-store" });
      if (response.status === 401) {
        setLoggedIn(false);
        setState("idle");
        return;
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "读取失败");

      setContent(data.content);
      setDatabaseConfigured(data.databaseConfigured);
      setLoggedIn(true);
      setMessage("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "读取失败");
    } finally {
      setState("idle");
    }
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "登录失败");
      await loadContent();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "登录失败");
    } finally {
      setState("idle");
    }
  }

  async function handleSave() {
    setState("saving");
    setMessage("");

    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "保存失败");
      setContent(data.content);
      setMessage("已保存，刷新首页即可看到新内容。");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "保存失败");
    } finally {
      setState("idle");
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setLoggedIn(false);
  }

  if (!loggedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5 py-12">
        <form onSubmit={handleLogin} className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <p className="text-sm font-semibold text-teal-700">后台管理</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950">登录后修改首页内容</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            账号密码来自 `.env.local` 和 Vercel 环境变量，不会写死在代码里。
          </p>
          <div className="mt-7 space-y-4">
            <Field label="管理员账号" value={username} onChange={setUsername} placeholder="admin" />
            <Field label="管理员密码" value={password} onChange={setPassword} placeholder="请输入密码" type="password" />
          </div>
          {message ? <p className="mt-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{message}</p> : null}
          <button
            type="submit"
            className="focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-teal-700"
            disabled={state === "loading"}
          >
            {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            登录
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="text-sm font-semibold text-teal-700">内容后台</p>
            <h1 className="text-2xl font-semibold text-slate-950">个人品牌官网管理</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href="/"
              target="_blank"
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
            >
              <Eye className="h-4 w-4" />
              预览首页
            </a>
            <button
              type="button"
              onClick={handleSave}
              disabled={state === "saving"}
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
            >
              {state === "saving" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              保存
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
            >
              <LogOut className="h-4 w-4" />
              退出
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-semibold text-slate-950">状态</p>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <StatusLine label="数据库" value={databaseConfigured ? "已配置，可保存" : "未配置，仅默认数据"} good={databaseConfigured} />
            <StatusLine label="语言" value="中文主内容，英文接口已预留" good />
            <StatusLine label="AI 客服" value="环境变量启用真实服务，否则模拟" good />
          </div>
          {message ? <p className="mt-5 rounded-xl bg-teal-50 p-3 text-sm text-teal-800">{message}</p> : null}
        </aside>

        <section className="space-y-6">
          <Panel title="基础信息">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="个人名称/昵称" value={content.name} onChange={(value) => setContent({ ...content, name: value })} />
              <Field label="定位标签" value={content.tagline} onChange={(value) => setContent({ ...content, tagline: value })} />
            </div>
            <Field label="主标题" value={content.heroTitle} onChange={(value) => setContent({ ...content, heroTitle: value })} />
            <TextArea label="副标题" value={content.heroSubtitle} onChange={(value) => setContent({ ...content, heroSubtitle: value })} />
            <TextArea label="简介" value={content.intro} onChange={(value) => setContent({ ...content, intro: value })} />
            <Field
              label="首屏亮点，用中文逗号分隔"
              value={content.heroHighlights.join("，")}
              onChange={(value) => setContent({ ...content, heroHighlights: splitText(value) })}
            />
          </Panel>

          <Panel title="关于我">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="区块小标题"
                value={content.about.eyebrow}
                onChange={(value) => setContent({ ...content, about: { ...content.about, eyebrow: value } })}
              />
              <Field
                label="区块主标题"
                value={content.about.title}
                onChange={(value) => setContent({ ...content, about: { ...content.about, title: value } })}
              />
            </div>
            <TextArea
              label="区块说明"
              value={content.about.description}
              onChange={(value) => setContent({ ...content, about: { ...content.about, description: value } })}
            />
            <TextArea
              label="正文段落，每段之间空一行"
              value={content.about.paragraphs.join("\n\n")}
              onChange={(value) =>
                setContent({
                  ...content,
                  about: {
                    ...content.about,
                    paragraphs: splitParagraphs(value)
                  }
                })
              }
            />
          </Panel>

          <Panel title="服务模块">
            <EditableServices
              items={content.services}
              onChange={(services) => setContent({ ...content, services })}
            />
          </Panel>

          <Panel title="作品案例">
            <EditableProjects
              items={content.projects}
              onChange={(projects) => setContent({ ...content, projects })}
            />
          </Panel>

          <Panel title="技术能力">
            <Field
              label="技术标签，用中文逗号分隔"
              value={content.skills.join("，")}
              onChange={(value) => setContent({ ...content, skills: splitText(value) })}
            />
          </Panel>

          <Panel title="FAQ">
            <EditableFaqs items={content.faqs} onChange={(faqs) => setContent({ ...content, faqs })} />
          </Panel>

          <Panel title="联系方式">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="邮箱" value={content.contact.email} onChange={(value) => setContent({ ...content, contact: { ...content.contact, email: value } })} />
              <Field label="微信" value={content.contact.wechat} onChange={(value) => setContent({ ...content, contact: { ...content.contact, wechat: value } })} />
            </div>
            <TextArea label="联系说明" value={content.contact.note} onChange={(value) => setContent({ ...content, contact: { ...content.contact, note: value } })} />
          </Panel>

          <Panel title="SEO">
            <Field label="SEO 标题" value={content.seo.title} onChange={(value) => setContent({ ...content, seo: { ...content.seo, title: value } })} />
            <TextArea label="SEO 描述" value={content.seo.description} onChange={(value) => setContent({ ...content, seo: { ...content.seo, description: value } })} />
            <Field
              label="SEO 关键词，用中文逗号分隔"
              value={content.seo.keywords.join("，")}
              onChange={(value) => setContent({ ...content, seo: { ...content.seo, keywords: splitText(value) } })}
            />
          </Panel>
        </section>
      </div>
    </main>
  );
}

function EditableServices({ items, onChange }: { items: ServiceItem[]; onChange: (items: ServiceItem[]) => void }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={`${item.title}-${index}`} className="rounded-2xl border border-slate-200 p-4">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-slate-800">服务 {index + 1}</p>
            <IconButton label="删除服务" onClick={() => onChange(items.filter((_, currentIndex) => currentIndex !== index))} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="标题" value={item.title} onChange={(value) => updateArray(items, index, { ...item, title: value }, onChange)} />
            <Field label="图标标识" value={item.icon} onChange={(value) => updateArray(items, index, { ...item, icon: value }, onChange)} />
          </div>
          <TextArea label="描述" value={item.description} onChange={(value) => updateArray(items, index, { ...item, description: value }, onChange)} />
          <Field label="适合对象" value={item.fit ?? ""} onChange={(value) => updateArray(items, index, { ...item, fit: value }, onChange)} />
        </div>
      ))}
      <AddButton label="新增服务" onClick={() => onChange([...items, { title: "新服务", description: "服务描述", icon: "layout", fit: "适合对象" }])} />
    </div>
  );
}

function EditableProjects({ items, onChange }: { items: ProjectItem[]; onChange: (items: ProjectItem[]) => void }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={`${item.title}-${index}`} className="rounded-2xl border border-slate-200 p-4">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-slate-800">案例 {index + 1}</p>
            <IconButton label="删除案例" onClick={() => onChange(items.filter((_, currentIndex) => currentIndex !== index))} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="标题" value={item.title} onChange={(value) => updateArray(items, index, { ...item, title: value }, onChange)} />
            <Field label="分类" value={item.category} onChange={(value) => updateArray(items, index, { ...item, category: value }, onChange)} />
          </div>
          <TextArea label="描述" value={item.description} onChange={(value) => updateArray(items, index, { ...item, description: value }, onChange)} />
          <Field label="结果" value={item.result} onChange={(value) => updateArray(items, index, { ...item, result: value }, onChange)} />
          <Field label="标签，用中文逗号分隔" value={item.tags.join("，")} onChange={(value) => updateArray(items, index, { ...item, tags: splitText(value) }, onChange)} />
        </div>
      ))}
      <AddButton
        label="新增案例"
        onClick={() => onChange([...items, { title: "新案例", category: "AI 应用", description: "案例描述", result: "客户价值", tags: ["Next.js"] }])}
      />
    </div>
  );
}

function EditableFaqs({ items, onChange }: { items: FaqItem[]; onChange: (items: FaqItem[]) => void }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={`${item.question}-${index}`} className="rounded-2xl border border-slate-200 p-4">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-slate-800">FAQ {index + 1}</p>
            <IconButton label="删除 FAQ" onClick={() => onChange(items.filter((_, currentIndex) => currentIndex !== index))} />
          </div>
          <Field label="问题" value={item.question} onChange={(value) => updateArray(items, index, { ...item, question: value }, onChange)} />
          <TextArea label="回答" value={item.answer} onChange={(value) => updateArray(items, index, { ...item, answer: value }, onChange)} />
        </div>
      ))}
      <AddButton label="新增 FAQ" onClick={() => onChange([...items, { question: "新问题", answer: "回答内容" }])} />
    </div>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-slate-950">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text"
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="admin-label">{label}</span>
      <input className="admin-input" type={type} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block space-y-2">
      <span className="admin-label">{label}</span>
      <textarea className="admin-input min-h-28 resize-y" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="focus-ring inline-flex items-center gap-2 rounded-full border border-dashed border-teal-300 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700"
    >
      <Plus className="h-4 w-4" />
      {label}
    </button>
  );
}

function IconButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full border border-rose-100 bg-rose-50 text-rose-600"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}

function StatusLine({ label, value, good }: { label: string; value: string; good: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-3 py-2">
      <span>{label}</span>
      <span className={good ? "font-semibold text-teal-700" : "font-semibold text-amber-700"}>{value}</span>
    </div>
  );
}

function updateArray<T>(items: T[], index: number, next: T, onChange: (items: T[]) => void) {
  onChange(items.map((item, currentIndex) => (currentIndex === index ? next : item)));
}

function splitText(value: string) {
  return value
    .split(/[，,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitParagraphs(value: string) {
  return value
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}
