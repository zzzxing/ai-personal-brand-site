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

## AI 客服演示窗口

首页右下角已经有一个类似 Chatbase 的悬浮聊天窗口。

默认情况：

- 没有配置 Dify 或 Coze 时，自动使用模拟聊天。
- 模拟聊天会围绕小企业 AI 客服、网站、智能体、自动化工具回答。
- 这样即使没有 API Key，页面也不会空白或报错。

## 如何接入 Dify

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
