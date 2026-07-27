# 部署说明

## 单一代码源

GitHub 仓库 `wyx729/ada-ai-nav` 的 `main` 分支是 Ada AI导航唯一正式代码源。ChatGPT Sites 与 Vercel 均应部署 `main` 上同一个已验证的 Git commit。

## ChatGPT Sites

- 现有项目 ID 保存在 `.openai/hosting.json`。
- 不创建新的 Sites 项目，也不更换现有正式地址。
- Sites 使用 `npm run build`（等同于 `npm run build:sites`）生成并校验 `dist` Worker 产物。
- 每次 Sites 发布后，记录其对应的 Git commit，并确认该 commit 已存在于 GitHub `main`。

## Vercel

在 Vercel 中导入 GitHub 仓库并使用：

| 配置项 | 值 |
| --- | --- |
| Production Branch | `main` |
| Framework Preset | Next.js |
| Root Directory | `.` |
| Install Command | `npm ci` |
| Build Command | `npm run build:vercel` |
| Output Directory | 留空 |
| Node.js | 22.x |

`vercel.json` 只声明双部署场景必需的框架、安装和构建命令，不覆盖 Next.js 的标准输出行为。

Vercel Production 仅跟踪 `main`；Pull Request 和其他分支生成 Preview Deployment。

## 环境变量

当前版本不需要环境变量。

未来新增变量时：

- `NEXT_PUBLIC_*` 会被打包到浏览器代码中，只能保存可公开内容。
- API Key、Token、密码和数据库连接必须使用无 `NEXT_PUBLIC_` 前缀的服务端变量。
- Production 的真实凭据只配置到 Vercel Production。
- Preview 使用隔离的测试凭据。
- Development 使用本地 `.env.local`，该文件已被 Git 忽略。
- `.env.example` 只记录变量名和示例格式，不保存真实值。

## 域名原则

不要在同一个域名上同时配置两个生产部署平台。可保留 ChatGPT Sites 默认域名，并将自定义正式域名只绑定到 Vercel；或为两个平台使用不同子域名。

## 正式发布检查

1. 从干净依赖状态执行 `npm ci`。
2. 执行 `npm run lint`、`npm run build:vercel` 和 `npm test`。
3. 检查 Git 状态与敏感信息。
4. 提交并推送 `main`。
5. 让 Vercel 部署该 commit。
6. 让 ChatGPT Sites 发布同一个 commit。
7. 核对两个平台的页面、静态资源、二维码和外链。
