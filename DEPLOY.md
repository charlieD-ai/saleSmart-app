# 部署指南

本项目是一个 Vite + React 前端应用，可以通过以下免费平台部署：

## 🚀 推荐平台（按推荐顺序）

### 1. Vercel（最推荐 ⭐）
- **优点**：对 Vite 支持最好，自动检测配置，部署最快
- **免费额度**：无限次部署，100GB 带宽/月
- **部署步骤**：
  1. 访问 [vercel.com](https://vercel.com)
  2. 使用 GitHub/GitLab/Bitbucket 账号登录
  3. 点击 "New Project"
  4. 导入你的 Git 仓库
  5. 在 "Environment Variables" 中添加：
     - `VITE_GEMINI_API_KEY` 或 `GEMINI_API_KEY`: 你的 Gemini API 密钥
     - ⚠️ **重要**：必须配置此环境变量，否则应用会报错
  6. 点击 "Deploy"
  7. 等待部署完成，会获得一个 `xxx.vercel.app` 的链接

### 2. Netlify
- **优点**：功能强大，支持表单、函数等
- **免费额度**：100GB 带宽/月，300 分钟构建时间/月
- **部署步骤**：
  1. 访问 [netlify.com](https://netlify.com)
  2. 使用 GitHub 账号登录
  3. 点击 "Add new site" → "Import an existing project"
  4. 选择你的 Git 仓库
  5. 构建设置会自动检测（已配置 `netlify.toml`）
  6. 在 "Site settings" → "Environment variables" 中添加：
     - `VITE_GEMINI_API_KEY` 或 `GEMINI_API_KEY`: 你的 Gemini API 密钥
     - ⚠️ **重要**：必须配置此环境变量，否则应用会报错
  7. 点击 "Deploy site"
  8. 获得 `xxx.netlify.app` 的链接

### 3. Cloudflare Pages
- **优点**：全球 CDN，速度快，免费额度大
- **免费额度**：无限次部署，无限带宽
- **部署步骤**：
  1. 访问 [pages.cloudflare.com](https://pages.cloudflare.com)
  2. 使用 GitHub 账号登录
  3. 点击 "Create a project"
  4. 选择你的 Git 仓库
  5. 构建配置：
     - Build command: `npm run build`
     - Build output directory: `dist`
  6. 在 "Environment variables" 中添加：
     - `VITE_GEMINI_API_KEY` 或 `GEMINI_API_KEY`: 你的 Gemini API 密钥
     - ⚠️ **重要**：必须配置此环境变量，否则应用会报错
  7. 点击 "Save and Deploy"
  8. 获得 `xxx.pages.dev` 的链接

### 4. GitHub Pages（需要 GitHub Actions）
- **优点**：完全免费，与 GitHub 集成
- **免费额度**：1GB 存储，100GB 带宽/月
- **部署步骤**：
  1. 在项目根目录创建 `.github/workflows/deploy.yml`（见下方）
  2. 推送代码到 GitHub
  3. 在仓库 Settings → Pages 中启用 GitHub Pages
  4. 选择 GitHub Actions 作为源
  5. 在仓库 Settings → Secrets 中添加：
     - `VITE_GEMINI_API_KEY` 或 `GEMINI_API_KEY`: 你的 Gemini API 密钥
     - ⚠️ **重要**：必须配置此环境变量，否则应用会报错

## 📝 注意事项

1. **环境变量**（⚠️ 必须配置）：
   - 环境变量名称：`VITE_GEMINI_API_KEY` 或 `GEMINI_API_KEY`（两种都可以）
   - 值：你的 Gemini API 密钥
   - **重要**：如果不配置此环境变量，应用会报错 "An API Key must be set when running in a browser"
   - 配置后需要重新部署才能生效
2. **Git 仓库**：大部分平台需要将代码推送到 Git 仓库（GitHub/GitLab/Bitbucket）
3. **自定义域名**：所有平台都支持免费添加自定义域名
4. **环境变量生效**：修改环境变量后，需要重新触发部署才能生效

## 🔧 本地测试构建

部署前建议先在本地测试构建：

```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 预览构建结果
npm run preview
```

## 📦 手动部署（如果不想用 Git）

如果不想使用 Git，也可以：

1. **Vercel CLI**：
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Netlify CLI**：
   ```bash
   npm i -g netlify-cli
   netlify deploy --prod
   ```

## 🎯 推荐选择

- **最简单**：Vercel（自动检测配置，零配置部署）
- **最快速**：Cloudflare Pages（全球 CDN）
- **最灵活**：Netlify（功能最丰富）

建议优先尝试 **Vercel**，部署体验最好！

