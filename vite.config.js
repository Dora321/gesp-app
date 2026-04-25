import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // 开发环境使用根路径，生产环境使用 GitHub Pages 路径
  base: command === 'serve' ? '/' : '/gesp-app/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries into separate chunks for better caching
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-markdown': ['react-markdown', 'remark-gfm', 'remark-math', 'rehype-highlight', 'rehype-katex'],
          'vendor-motion': ['framer-motion'],
          'vendor-katex': ['katex'],
        },
      },
    },
  },
}))
