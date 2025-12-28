# 部署指南

本项目是一个 Vite + React 前端应用，使用公司内部 LLM API，可以通过以下免费平台部署：

## 🔧 LLM 配置

项目已配置使用公司内部 LLM API，默认配置如下：
- **API URL**: `https://ymcas-llm.yxt.com/ymcas-ai/multi-model/v1/chat/completions`
- **Auth Token**: `aItutor-47bf6e80-0979-4f13-95b4-d0db46e5f62c`
- **默认模型**: `qwen3-max`

如需覆盖默认配置，可在部署平台的环境变量中设置：
- `VITE_LLM_API_URL` 或 `LLM_API_URL`
- `VITE_LLM_AUTH_TOKEN` 或 `LLM_AUTH_TOKEN`
- `VITE_LLM_DEFAULT_MODEL` 或 `LLM_DEFAULT_MODEL`

## 🚀 推荐平台（按推荐顺序）

### 1. Vercel（最推荐 ⭐）
- **优点**：对 Vite 支持最好，自动检测配置，部署最快
- **免费额度**：无限次部署，100GB 带宽/月
- **部署步骤**：
  1. 访问 [vercel.com](https://vercel.com)
  2. 使用 GitHub/GitLab/Bitbucket 账号登录
  3. 点击 "New Project"
  4. 导入你的 Git 仓库
  5. （可选）在 "Environment Variables" 中配置 LLM API：
     - 项目已内置默认 LLM 配置，通常无需额外配置
     - 如需覆盖，可添加：
       - `VITE_LLM_API_URL`: LLM API 地址
       - `VITE_LLM_AUTH_TOKEN`: 认证 Token
       - `VITE_LLM_DEFAULT_MODEL`: 默认模型名称
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
  6. （可选）在 "Site settings" → "Environment variables" 中配置 LLM API：
     - 项目已内置默认 LLM 配置，通常无需额外配置
     - 如需覆盖，可添加 `VITE_LLM_API_URL`、`VITE_LLM_AUTH_TOKEN`、`VITE_LLM_DEFAULT_MODEL`
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
  6. （可选）在 "Environment variables" 中配置 LLM API：
     - 项目已内置默认 LLM 配置，通常无需额外配置
     - 如需覆盖，可添加 `VITE_LLM_API_URL`、`VITE_LLM_AUTH_TOKEN`、`VITE_LLM_DEFAULT_MODEL`
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
  5. （可选）在仓库 Settings → Secrets 中配置 LLM API：
     - 项目已内置默认 LLM 配置，通常无需额外配置
     - 如需覆盖，可添加 `VITE_LLM_API_URL`、`VITE_LLM_AUTH_TOKEN`、`VITE_LLM_DEFAULT_MODEL`

## 📝 注意事项

1. **LLM 配置**（可选）：
   - 项目已内置公司内部 LLM API 的默认配置，**无需额外配置即可使用**
   - 如需覆盖默认配置，可在环境变量中设置：
     - `VITE_LLM_API_URL` 或 `LLM_API_URL`: LLM API 地址
     - `VITE_LLM_AUTH_TOKEN` 或 `LLM_AUTH_TOKEN`: 认证 Token
     - `VITE_LLM_DEFAULT_MODEL` 或 `LLM_DEFAULT_MODEL`: 默认模型名称
   - 配置环境变量后，**必须重新部署**项目才能生效
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

