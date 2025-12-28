import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    
    // 内部 LLM 配置（支持环境变量覆盖）
    const llmApiUrl = env.VITE_LLM_API_URL || env.LLM_API_URL || 'https://ymcas-llm.yxt.com/ymcas-ai/multi-model/v1/chat/completions';
    const llmAuthToken = env.VITE_LLM_AUTH_TOKEN || env.LLM_AUTH_TOKEN || 'aItutor-47bf6e80-0979-4f13-95b4-d0db46e5f62c';
    const llmDefaultModel = env.VITE_LLM_DEFAULT_MODEL || env.LLM_DEFAULT_MODEL || 'qwen3-max';
    
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        // 注入 LLM 配置到 import.meta.env（Vite 标准方式）
        'import.meta.env.VITE_LLM_API_URL': JSON.stringify(llmApiUrl),
        'import.meta.env.VITE_LLM_AUTH_TOKEN': JSON.stringify(llmAuthToken),
        'import.meta.env.VITE_LLM_DEFAULT_MODEL': JSON.stringify(llmDefaultModel),
        // 兼容非 VITE_ 前缀的环境变量
        'import.meta.env.LLM_API_URL': JSON.stringify(llmApiUrl),
        'import.meta.env.LLM_AUTH_TOKEN': JSON.stringify(llmAuthToken),
        'import.meta.env.LLM_DEFAULT_MODEL': JSON.stringify(llmDefaultModel),
        // 注入到 process.env（兼容 Node.js 风格）
        'process.env.LLM_API_URL': JSON.stringify(llmApiUrl),
        'process.env.LLM_AUTH_TOKEN': JSON.stringify(llmAuthToken),
        'process.env.LLM_DEFAULT_MODEL': JSON.stringify(llmDefaultModel),
        // 添加调试信息（仅在开发环境）
        'import.meta.env.DEV': JSON.stringify(mode === 'development'),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
