# Ada AI导航

Ada AI导航是一个面向中文用户的 AI 工具发现与分类导航站。项目采用近黑底色与蓝紫光感设计，支持桌面端与移动端，并内置按使用意图推荐分类和工具的搜索体验。

## 技术栈

- Next.js 16（App Router）
- React 19
- TypeScript 5
- Tailwind CSS 4
- npm
- Node.js 22 LTS
- ChatGPT Sites：Vinext + Vite + Cloudflare Worker 构建适配层

`app/` 是两个部署平台共用的唯一页面源码。`.openai/hosting.json` 保存现有 ChatGPT Sites 项目标识，不得删除或更换其中的 `project_id`。

## 本地开发

```bash
npm ci
npm run dev
```

打开 `http://localhost:3000`。

常用命令：

```bash
npm run build:vercel  # 标准 Next.js 生产构建
npm run start         # 预览 Next.js 生产构建
npm run build:sites   # 生成并校验 ChatGPT Sites 构建产物
npm test              # 校验 Sites 构建及渲染结果
npm run lint
```

## Deploy to Vercel

1. 在 Vercel 中选择 **Add New → Project**，导入 GitHub 仓库 `wyx729/ada-ai-nav`。
2. 生产分支选择 `main`。
3. 使用以下配置：

| 配置项 | 值 |
| --- | --- |
| Framework Preset | Next.js |
| Root Directory | `.` |
| Install Command | `npm ci` |
| Build Command | `npm run build:vercel` |
| Output Directory | 留空（使用 Next.js 默认输出） |
| Node.js | 22.x |

项目当前不需要环境变量。若未来增加浏览器可见变量，名称应以 `NEXT_PUBLIC_` 开头；API Key、Token 等敏感变量不得使用该前缀，并且只能在服务端读取。

### 自定义域名

在 Vercel 项目的 **Settings → Domains** 中添加域名，然后按 Vercel 提示配置 DNS。不要把同一生产域名同时指向 Vercel 和 ChatGPT Sites。

## 版本与发布

- GitHub `main` 是唯一正式代码源。
- Vercel Production 连接 `main`。
- Pull Request 和其他分支用于 Vercel Preview。
- ChatGPT Sites 发布必须使用与 GitHub `main` 相同的 Git commit。
- 每次正式更新均需提交并推送到 GitHub，再发布对应的 Sites 版本。

双部署维护流程见 [DEPLOYMENT.md](./DEPLOYMENT.md)。
