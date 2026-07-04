# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

GESP App is a React 19 + Vite 5 interactive teaching site for GESP C++/Python exam prep. It bundles a historical exam question bank (levels 1–8), course/lesson pages, an in-browser AI chat tutor, and topic sub-modules (`ekart`, `hardware`). It deploys as a static SPA to GitHub Pages.

## Commands

```bash
npm run dev              # Vite dev server (base path "/")
npm run build            # Production build to dist/ (base path "/gesp-app/")
npm run preview          # Serve the production build locally
npm run lint             # ESLint over the whole repo

npm run generate:papers  # Regenerate src/data/gesp/_generated.js from the level{1-8}/ dirs
npm run validate:bank    # Validate every paper file (imports each, checks fields/forbidden fragments)
npm run check:level1     # Cross-check level1 paper files against the registry
```

There is **no test runner** (no `test` script, no jest/vitest). "Testing" the question bank means running `validate:bank` / `check:level1`. The `legacy:*` scripts and the ~100 ad-hoc files in `scripts/` are one-off data-maintenance tools (LaTeX cleanup, explanation backfill, per-paper patches) — not part of the normal dev loop. Only the npm-script-referenced ones are maintained.

## Architecture

### Routing
`src/App.jsx` is the single route table, using **`BrowserRouter` unconditionally** (basename follows the Vite base path). GitHub Pages SPA fallback is handled by the deploy workflow copying `index.html` → `404.html`, so production URLs are clean paths (`/gesp-app/question-bank`). Every page except `Home` is `lazy()`-loaded; `vite.config.js` further splits vendor libs (react, markdown, motion, katex) into separate chunks.

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

### Sub-modules
`src/ekart/` and `src/hardware/` are self-contained feature areas with their own `*Layout.jsx` and nested routes. `hardware/pages/Esp32AiCourseSystem.jsx` ties into the ESP32/MicroPython course (see the `esp32-debug` skill for the physical hardware).

## Deployment
`.github/workflows/deploy.yml` builds on push to `main` and publishes `dist/` to GitHub Pages. It copies `index.html` → `404.html` and adds `.nojekyll` for SPA routing. The `/gesp-app/` base path in `vite.config.js` is tied to the repo name — changing the repo name requires updating `base`.
