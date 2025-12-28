import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    // 支持多种环境变量名称（Vercel/Netlify 等平台可能使用不同的名称）
    const apiKey = env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY || '';
    
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        // 注入到 process.env（兼容 Node.js 风格）
        'process.env.API_KEY': JSON.stringify(apiKey),
        'process.env.GEMINI_API_KEY': JSON.stringify(apiKey),
        // 注入到 import.meta.env（Vite 标准方式）
        'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(apiKey),
        'import.meta.env.GEMINI_API_KEY': JSON.stringify(apiKey),
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
