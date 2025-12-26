import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // 开发环境使用根路径，生产环境使用 GitHub Pages 路径
  base: command === 'serve' ? '/' : '/gesp-app/',
}))
