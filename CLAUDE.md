# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

GESP App is a React 19 + Vite 6 interactive teaching site for GESP C++/Python exam prep. It bundles a historical exam question bank (levels 1–8), course/lesson pages, an in-browser AI chat tutor, and topic sub-modules (`ekart`, `hardware`). It deploys as a static SPA to GitHub Pages.

## Commands

```bash
npm run dev              # Vite dev server (base path "/")
npm run build            # Production build to dist/ + static metadata shells for every route (prerender-static-routes.mjs)
npm run preview          # Serve the production build locally
npm run lint             # ESLint over the whole repo

npm run generate:papers  # Regenerate src/data/gesp/_generated.js AND public/sitemap.xml from the level{1-8}/ dirs
npm run validate:bank    # Validate every paper file (imports each, checks fields/forbidden fragments)
npm run check:level1     # Cross-check level1 paper files against the registry

npm test                 # node --test over scripts/tests/*.test.mjs (exam scoring, route meta, bank audits…)
npm run check            # check:course-flow + check:links (course catalog/flow data, internal route links)
npm run smoke            # Playwright smoke: ~18 key routes × desktop/mobile (self-starts dev on 127.0.0.1:4176)
npm run check:a11y       # axe-core accessibility over key routes × 2 viewports (vite preview)
npm run visual           # Layout-fingerprint regression vs scripts/visual-baseline.json (visual:update to rebaseline)
npm run check:bundle     # Enforce bundle-size budgets over dist/ (run after build)
npm run check:prerender  # Verify per-route static metadata + PWA assets in dist/ (run after build)
```

Unit tests run via **`node --test`** (no jest/vitest); everything else above is a script-driven gate — CI (deploy.yml) runs all of them, with the browser checks (smoke/a11y/visual/mastery-UI) in a parallel job. The Playwright checks must target **127.0.0.1, not localhost** (Chromium resolves localhost to IPv6; vite only listens on IPv4). The `legacy:*` scripts and the ~100 ad-hoc files in `scripts/` are one-off data-maintenance tools (LaTeX cleanup, explanation backfill, per-paper patches) — not part of the normal dev loop. Only the npm-script-referenced ones are maintained.

## Architecture

### Routing
`src/App.jsx` is the single route table, using **`BrowserRouter` unconditionally** (basename follows the Vite base path). GitHub Pages SPA fallback is handled by the deploy workflow copying `index.html` → `404.html`, so production URLs are clean paths (`/gesp-app/question-bank`). Every page (including `Home`) is `lazy()`-loaded. `vite.config.js`'s `manualChunks` (function form) names only **react and motion** vendor chunks; the markdown/katex families are deliberately left ungrouped — forcing them into a manual chunk makes Rollup hoist ~600KB onto the first-paint critical path (see the comment in `vite.config.js`).

Two dynamic routers replace what would be hundreds of hand-written routes:
- **`LessonRouter`** (`/lesson/:level/:lessonId`) dynamically imports `lessons/cpp/l{level}/Lesson{id}.jsx` (level 1–6, lesson 1–16).
- **`ExamPaper`** (`/question-bank/:level/:paperId`) loads any paper by id via the registry.

### Question bank — the registry is generated, not hand-edited
Papers live as one file per exam: `src/data/gesp/level{N}/{YYYY-MM-lN}.js`, each doing `export const paperData = { id, title, level, year, month, timeLimit, questions: [...] }`. Question shape: `{ id, type: 'single'|'judge', question, options, answer (index), score, explanation, tags }`. Some papers also carry `programmingQuestions` / `codingQuestions`.

`src/data/gesp/index.js` exposes `getPaper(id)` (async, lazy-imports one paper), `paperIds`, and `paperMeta` (lightweight list for the home page — no questions loaded). These come from `_generated.js`, which is **auto-generated** by `scripts/generate-paper-registry.cjs`.

**When you add, remove, or rename a paper file you must run `npm run generate:papers`** or it won't appear in the app. Don't hand-edit `_generated.js`.

`ExamPaper.jsx` is a state container that drives two modes: exam mode (`exam/ExamModeView.jsx` + sidebar/result dialogs) and analysis mode (`question-bank/InteractiveAnalysisPage.jsx`). `enhancedPaperRegistry.js` currently maps every paper id to the same `EnhancedPaperPage` component.

### AI chat tutor — client-side, DeepSeek, localStorage
`src/components/AIChatWidget.jsx` (mounted globally in `App.jsx`) calls the **DeepSeek API directly from the browser** (`https://api.deepseek.com/chat/completions`). The user's API key is stored in `localStorage` under `deepseek_api_key`; selected persona/custom persona are also localStorage-backed. There are several built-in `AI_PERSONAS` (system prompts).

Note: the `.env` `OPENAI_*` / `LLM_MODEL` vars are **not** used by the runtime widget — they're only for the Node maintenance scripts that batch-generate explanations.

### Lessons — three shells, shared teaching components
Lesson pages don't hand-roll chrome; they use one of three shells: `src/lessons/cpp/CppLessonShell.jsx` (section-keyed children), `src/lessons/cpp/LegacyCppLessonShell.jsx` (parent owns `activeSection` + renders a switch as children; used by C++ L1 ×16 and L2-1/2), and `src/courses/python/shell/PythonLessonShell.jsx` (light/dark themes). The shells provide reusable teaching components — `PredictCheck` (predict-then-verify), `MasteryCheck` (exit checklist; checking all items records "mastered" in localStorage via `src/utils/lessonProgress.js`), `Prerequisites`, `TransferCheck` (transfer exercise) — every shell lesson must include a `MasteryCheck` or it can never reach mastered state. `scripts/check-course-flow.cjs` asserts shell/lesson invariants; sync it when changing shell rendering.

### Sub-modules
`src/ekart/` and `src/hardware/` are self-contained feature areas with their own `*Layout.jsx` and nested routes. `hardware/pages/Esp32AiCourseSystem.jsx` ties into the ESP32/MicroPython course (see the `esp32-debug` skill for the physical hardware).

## Deployment
`.github/workflows/deploy.yml` runs the full gate suite (audit/lint/validate/tests/checks, then build + prerender/bundle checks, with browser checks in a parallel job) on push to `main` and publishes `dist/` to GitHub Pages. It copies `index.html` → `404.html` and adds `.nojekyll` for SPA routing. The `/gesp-app/` base path in `vite.config.js` is tied to the repo name — changing the repo name requires updating `base`.
