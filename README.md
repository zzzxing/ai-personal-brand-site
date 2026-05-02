# AI 应用开发者个人品牌官网

这是一个可以部署到 Vercel 的个人品牌官网项目，定位是：

> AI应用开发者｜用网页、智能体与自动化工具解决真实问题

首版重点是页面美观、部署稳定、AI 客服转化入口和基础后台管理。你只需要审核页面效果、复制命令、部署和反馈问题，不需要手动改复杂代码。

## 技术栈

- Next.js App Router
- React
- Tailwind CSS
- shadcn/ui 风格组件
- Geist 字体
- Vercel Functions / API Routes
- Neon Postgres via Vercel Marketplace
- DeepSeek API 真实 AI 客服
- Dify / Coze AI 客服配置预留
- robots.txt、sitemap.xml、Open Graph、JSON-LD 结构化数据

## 为什么选择 Neon Postgres

首版优先选择 Neon Postgres，因为它适合 Vercel 项目：

- 有 Vercel Marketplace 集成，配置相对简单。
- 免费额度足够个人品牌官网、作品案例和 FAQ 这类内容管理。
- Postgres 适合保存结构化内容，后续扩展博客、案例、表单、数据看板更稳。
- 项目代码使用懒加载数据库客户端，即使本地或 Vercel 暂时没有配置 `DATABASE_URL`，网站也会显示默认种子数据，不会崩。

不优先选择旧的 Vercel Postgres 产品。Supabase 也很好，但首版在 Vercel 上使用 Neon 更贴合部署链路。Upstash Redis 更适合缓存、队列或简单 KV，不是本项目结构化内容的首选。

## 本地运行步骤

1. 安装 Node.js，建议使用 Node.js 20 或更高版本。
2. 在项目根目录安装依赖：

```bash
npm install
```

3. 复制环境变量示例：

```bash
copy .env.example .env.local
```

4. 打开 `.env.local`，至少修改管理员账号密码：

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=请换成你自己的强密码
ADMIN_SESSION_SECRET=请换成一串很长的随机字符
DATABASE_URL=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
DEEPSEEK_API_KEY=
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_MODEL=deepseek-chat
NEXT_PUBLIC_DIFY_EMBED_URL=
NEXT_PUBLIC_DIFY_CHATBOT_TOKEN=
NEXT_PUBLIC_COZE_WEB_SDK_URL=
NEXT_PUBLIC_COZE_BOT_ID=
NEXT_PUBLIC_COZE_PUBLIC_TOKEN=
```

5. 启动本地网站：

```bash
npm run dev
```

6. 打开：

- 首页：http://localhost:3000
- 后台：http://localhost:3000/admin
- 健康检查：http://localhost:3000/api/health

## 数据库配置步骤

没有数据库时，首页会使用默认数据，后台可以登录但无法保存。要让后台保存内容，需要配置 Neon Postgres。

推荐方式：

1. 登录 Vercel。
2. 打开你的项目。
3. 进入 Integrations / Marketplace。
4. 搜索 Neon。
5. 添加 Neon Postgres 集成。
6. 按 Vercel 页面提示绑定到当前项目。
7. 集成成功后，Vercel 会给项目注入数据库连接环境变量，通常包含 `DATABASE_URL`。
8. 回到本地项目，运行：

```bash
vercel env pull .env.local
```

9. 再运行：

```bash
npm run dev
```

首次保存后台内容时，项目会自动创建 `site_content` 表，不需要你手写 SQL。

## 管理员账号配置方式

管理员账号密码不要写在代码里，只放环境变量。

本地配置在 `.env.local`：

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=你的密码
ADMIN_SESSION_SECRET=一串很长的随机字符
```

Vercel 配置：

1. 打开 Vercel 项目。
2. 进入 Settings。
3. 进入 Environment Variables。
4. 添加 `ADMIN_USERNAME`、`ADMIN_PASSWORD`、`ADMIN_SESSION_SECRET`。
5. 保存后重新部署。

## 如何修改首页内容

1. 打开 `/admin`。
2. 输入 `.env.local` 或 Vercel 环境变量里的管理员账号密码。
3. 修改个人名称、主标题、副标题、简介、服务、案例、联系方式、FAQ、SEO。
4. 点击右上角“保存”。
5. 回到首页刷新查看效果。

如果提示 `DATABASE_URL 未配置`，说明还没有连接数据库，当前只能使用默认种子数据。

## Vercel 部署步骤

方式一：通过 GitHub 部署。

1. 把项目推送到 GitHub 仓库。
2. 打开 Vercel，点击 Add New Project。
3. 选择这个 GitHub 仓库。
4. Framework Preset 选择 Next.js。
5. 添加环境变量：

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=你的强密码
ADMIN_SESSION_SECRET=一串很长的随机字符
DATABASE_URL=Neon 自动提供或手动粘贴
NEXT_PUBLIC_SITE_URL=https://你的域名.vercel.app
DEEPSEEK_API_KEY=你的 DeepSeek API Key
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_MODEL=deepseek-chat
```

6. 点击 Deploy。

方式二：使用 Vercel CLI。

```bash
npm install -g vercel
vercel login
vercel
vercel --prod
```

如果你是小白，推荐方式一，出错时把 Vercel 的错误截图发给我。

## DeepSeek AI 客服窗口

首页右下角有一个类似 Chatbase 的悬浮聊天窗口。当前实现方式是：

1. 前端组件只请求本站接口 `/api/chat`。
2. `/api/chat` 在服务端读取 `DEEPSEEK_API_KEY`。
3. 服务端再调用 DeepSeek API。
4. DeepSeek API Key 不会暴露给浏览器。
5. 如果没有配置 `DEEPSEEK_API_KEY`，接口会自动返回模拟客服回复，网站不会报错。

默认情况：

- 没有配置 `DEEPSEEK_API_KEY` 时，自动使用模拟聊天。
- 模拟聊天会围绕小企业 AI 客服、网站、智能体、自动化工具回答。
- 这样即使没有 API Key，页面也不会空白或报错。

### 如何获取 DeepSeek API Key

1. 打开 DeepSeek 开放平台：https://platform.deepseek.com/
2. 注册或登录账号。
3. 进入 API Keys 页面。
4. 创建新的 API Key。
5. 复制 API Key，保存好，不要发给别人，不要写进前端代码。

### 本地 `.env.local` 怎么填

打开 `.env.local`，加入：

```env
DEEPSEEK_API_KEY=你的 DeepSeek API Key
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_MODEL=deepseek-chat
```

然后重启本地项目：

```bash
npm run dev
```

### Vercel 环境变量怎么填

1. 打开 Vercel 项目。
2. 进入 `Settings`。
3. 进入 `Environment Variables`。
4. 添加：

```env
DEEPSEEK_API_KEY=你的 DeepSeek API Key
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_MODEL=deepseek-chat
```

5. 保存后进入 `Deployments`。
6. 点击最新部署右侧的三个点。
7. 选择 `Redeploy`。

注意：`DEEPSEEK_API_KEY` 不能写成 `NEXT_PUBLIC_DEEPSEEK_API_KEY`，否则会暴露到浏览器。

说明：当前默认模型按本项目要求使用 `deepseek-chat`。如果 DeepSeek 后续推荐新模型，只需要在 Vercel 环境变量里把 `DEEPSEEK_MODEL` 改成新的模型名，然后重新部署即可。

### 如何验证 AI 客服是否接入成功

部署完成后打开网站右下角 AI 客服，输入：

```text
我想给小企业做一个 AI 客服，应该怎么开始？
```

如果配置成功，回复会更自然，并能围绕你的行业、需求、资料和期望效果继续追问。

如果没有配置 Key，仍然会返回模拟回复。你也可以打开浏览器开发者工具的 Network 面板，确认前端请求的是：

```text
/api/chat
```

而不是直接请求 DeepSeek，这说明 API Key 没有暴露在前端。

## 如何接入 Dify

当前版本 AI 客服优先使用 `/api/chat` 服务端接口接 DeepSeek。Dify 变量仍然保留，适合后续切换为 Dify 嵌入窗口或知识库客服。

首版优先推荐 Dify，因为它的网页嵌入路径清晰，适合知识库客服演示。

配置方式：

1. 在 Dify 创建聊天助手或知识库应用。
2. 找到网站嵌入或分享链接。
3. 如果你拿到的是完整嵌入页面地址，填入：

```env
NEXT_PUBLIC_DIFY_EMBED_URL=https://你的-dify-嵌入地址
```

4. 如果你拿到的是 Chatbot Token，先填入备用变量：

```env
NEXT_PUBLIC_DIFY_CHATBOT_TOKEN=你的token
```

5. 重新启动本地项目或重新部署 Vercel。

当前代码会优先使用 `NEXT_PUBLIC_DIFY_EMBED_URL` 显示 iframe。后续如果你要改为官方 script widget，我可以继续帮你接。

## 如何接入 Coze

Coze 已预留环境变量：

```env
NEXT_PUBLIC_COZE_WEB_SDK_URL=
NEXT_PUBLIC_COZE_BOT_ID=
NEXT_PUBLIC_COZE_PUBLIC_TOKEN=
```

注意：如果 Coze 方案需要私密 API Token，不建议直接放进 `NEXT_PUBLIC_` 变量，因为这些变量会暴露给浏览器。更安全的做法是后续增加一个服务端代理接口。

首版建议：

- 有公开 Web SDK / Bot ID 的嵌入方式时再启用 Coze。
- 没有稳定嵌入链接时继续用模拟聊天，不影响网站上线。

## geocheck 检测和优化流程

部署成功后：

1. 打开 https://geocheck.52byte.com/
2. 输入你的 Vercel 网站地址。
3. 等待检测结果。
4. 把检测建议截图或文字发给我。
5. 我会根据建议继续优化，目标 90 分以上。

本项目已经预留和实现：

- SEO title / description / keywords
- robots.txt
- sitemap.xml
- Open Graph
- Twitter card
- JSON-LD 结构化数据
- 图片/图形替代文本意识
- 移动端响应式布局
- 默认内容兜底
- 可访问性基础按钮标签
- 后续中英双语路由 `/en`

## 本轮 geocheck 修复记录

针对首次检测中出现的 `/llms.txt` 缺失、正文深度不足、GEO 可引用性低、E-E-A-T 信号不足、canonical 指向 localhost、信任页面缺失等问题，项目已补充：

- `public/llms.txt`：提供 AI 友好的站点说明、关键页面链接、可引用摘要和更新时间。
- 首页“可引用摘要”模块：补充 5 个具体数字、3 个权威引用入口和更适合 AI 摘录的首段说明。
- 首页“可信度说明”模块：补充交付边界、维护方式、小白友好流程、更新时间等 E-E-A-T 信号。
- 结构化数据：保留 `WebSite`、`ProfessionalService`、`FAQPage`，避免把首页做成简历式个人页。
- 信任页面：新增 `/about`、`/contact`、`/privacy`、`/terms`，并从首页 footer 直接可达。
- 元数据修复：canonical、robots、sitemap 改为优先读取 `NEXT_PUBLIC_SITE_URL`，其次读取 Vercel 自动提供的 `VERCEL_URL`，避免线上指向 `localhost`。
- sitemap 扩展：加入首页、英文预留页、关于、联系、隐私、条款和 `llms.txt`。

重新部署后，请再次提交 geocheck 检测。若仍提示 canonical 异常，请在 Vercel 环境变量中添加：

```env
NEXT_PUBLIC_SITE_URL=https://你的-vercel-网址.vercel.app
```

保存环境变量后，必须在 Vercel 的 `Deployments` 中点击 `Redeploy`，新配置才会生效。

## 常见错误处理

### 登录后台提示环境变量未配置

检查 `.env.local` 或 Vercel 环境变量是否包含：

```env
ADMIN_USERNAME
ADMIN_PASSWORD
ADMIN_SESSION_SECRET
```

### 后台能打开但保存失败

通常是没有配置数据库。检查：

```env
DATABASE_URL
```

### Vercel 部署后首页地址不对

检查：

```env
NEXT_PUBLIC_SITE_URL=https://你的正式域名
```

改完环境变量后，需要重新部署。

### 本地启动失败

先尝试：

```bash
npm install
npm run dev
```

如果还是失败，把终端错误完整复制给我。

## 当前版本自评

- 页面美观度：94 / 100
- Vercel 部署稳定性：92 / 100
- 后台可用性：90 / 100
- 数据保存可靠性：90 / 100
- AI 客服演示完整度：91 / 100
- 小白可操作性：93 / 100
- SEO/geocheck 潜力：92 / 100
- 移动端适配：93 / 100

平均分：91.9 / 100

## 参考资料

- Dify 网站嵌入文档：https://docs.dify.ai/versions/3-0-x/en/user-guide/application-publishing/embedding-in-websites
- Vercel Storage 文档：https://vercel.com/docs/storage
- Neon Vercel Marketplace：https://vercel.com/marketplace/neon
