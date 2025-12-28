<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1jX8MYesYWPE-vhuNcraNYo8tSJWhdxVH

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. （可选）配置 LLM API：
   - 项目已内置公司内部 LLM API 的默认配置，通常无需额外配置
   - 如需覆盖，可在 `.env.local` 文件中设置：
     - `VITE_LLM_API_URL`: LLM API 地址
     - `VITE_LLM_AUTH_TOKEN`: 认证 Token
     - `VITE_LLM_DEFAULT_MODEL`: 默认模型名称

3. Run the app:
   ```bash
   npm run dev
   ```
