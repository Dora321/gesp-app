import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFile, readdir } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { embeddedAiPages, embedAiLauncher } from './scripts/lib/embedded-ai-pages.mjs'
import { applyVerifiedQuestionCorrections } from './src/data/gesp/verifiedQuestionCorrections.js'
import { buildKnowledgeTagStats } from './src/utils/knowledgeTagStats.js'

const ROOT_DIR = fileURLToPath(new URL('.', import.meta.url))
const GESP_LEVEL_DIRS = ['level1', 'level2', 'level3', 'level4', 'level5', 'level6', 'level7', 'level8']
const TAG_STATS_ID = 'virtual:gesp-tag-stats'
const RESOLVED_TAG_STATS_ID = `\0${TAG_STATS_ID}`
let paperImportNonce = 0

// 知识点页签的标签统计必须跟题库一起变，不能提交一份需要手改的计数文件。
// 构建/开发时直接导入各试卷文件，只把计数内联进虚拟模块，题目内容不进 bundle。
async function loadQuestionBankPapers() {
  const papers = []
  for (const levelDir of GESP_LEVEL_DIRS) {
    const dirPath = resolve(ROOT_DIR, 'src/data/gesp', levelDir)
    let files
    try {
      files = await readdir(dirPath)
    } catch {
      continue
    }
    const paperFiles = files.filter(name => /^\d{4}-\d{2}-l\d\.js$/.test(name)).sort()
    const modules = await Promise.all(paperFiles.map((name) => {
      const fileUrl = pathToFileURL(join(dirPath, name)).href
      // 带 query 导入：开发时改卷后重新 load 不会拿到 Node 的模块缓存。
      return import(`${fileUrl}?gespTagStats=${paperImportNonce++}`)
    }))
    for (const module of modules) {
      // 与 getPaper 同一条勘误链路：修正过的 tags 也要进统计。
      if (module?.paperData) papers.push(applyVerifiedQuestionCorrections(module.paperData))
    }
  }
  return papers
}

const gespTagStats = () => ({
  name: 'gesp-tag-stats',
  resolveId(id) {
    if (id === TAG_STATS_ID) return RESOLVED_TAG_STATS_ID
  },
  async load(id) {
    if (id !== RESOLVED_TAG_STATS_ID) return null
    const stats = buildKnowledgeTagStats(await loadQuestionBankPapers())
    return `export const tagStats = ${JSON.stringify(stats)};\n`
  },
  configureServer(server) {
    const refresh = (file) => {
      if (!/[\\/]src[\\/]data[\\/]gesp[\\/]level\d[\\/]/.test(file)) return
      const virtualModule = server.moduleGraph.getModuleById(RESOLVED_TAG_STATS_ID)
      if (virtualModule) server.moduleGraph.invalidateModule(virtualModule)
      server.ws.send({ type: 'full-reload' })
    }
    server.watcher.on('add', refresh)
    server.watcher.on('change', refresh)
    server.watcher.on('unlink', refresh)
  },
})

const embeddedAiPreview = {
  name: 'embedded-ai-preview',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.method !== 'GET') return next();
      let page;
      try { page = decodeURIComponent(new URL(req.url, 'http://localhost').pathname.slice(1)); }
      catch { return next(); }
      if (page.endsWith('/')) page += 'index.html';
      if (!embeddedAiPages.has(page)) return next();
      try {
        const html = await readFile(new URL(`./public/${page}`, import.meta.url), 'utf8');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(embedAiLauncher(html, '/src/embeddedAILauncher.js'));
      } catch (error) { next(error); }
    });
  },
}

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), embeddedAiPreview, gespTagStats()],
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8787',
      '/classroom-admin': 'http://127.0.0.1:8787',
    },
  },
  // 开发环境使用根路径，生产环境使用 GitHub Pages 路径
  base: command === 'serve' ? '/' : '/gesp-app/',
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        index: 'index.html',
        assistant: 'ai-assistant.html',
        assistantLauncher: 'src/embeddedAILauncher.js',
      },
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
