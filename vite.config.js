import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // 开发环境使用根路径，生产环境使用 GitHub Pages 路径
  base: command === 'serve' ? '/' : '/gesp-app/',
  build: {
    manifest: true,
    rollupOptions: {
      output: {
        // Function form (not the object form): the object form hoists shared
        // vendor chunks into the entry's static graph, which was pulling the
        // heavy markdown + katex chunks (~600KB) onto the first-paint critical
        // path even though they are only reached via lazy routes (question
        // bank) and the lazily-opened AI chat. Returning a chunk name only for
        // node_modules keeps react on a stable vendor chunk while letting the
        // markdown / katex / motion families stay in their own chunks that load
        // on demand from whichever lazy route first needs them.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          // Keep only react + motion as named vendor chunks. The markdown and
          // katex families are deliberately NOT grouped here: they are shared by
          // two dynamic chunks (the lazy AI chat and the lazy question-bank
          // pages), and forcing them into a manual chunk made Rollup hoist that
          // shared chunk into the entry's static graph — pulling ~600KB onto the
          // first-paint critical path. Left ungrouped, Rollup emits an
          // auto-generated shared chunk that loads on demand from whichever lazy
          // route first needs it, so the home page no longer pays for them.
          if (/[\\/]node_modules[\\/]framer-motion[\\/]/.test(id)) return 'vendor-motion';
          if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) return 'vendor-react';
          return undefined;
        },
      },
    },
  },
}))
