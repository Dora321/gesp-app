import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'tmp', '.agent', '.claude', 'scripts', 'src/data/gesp']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // ESLint 9+ counts JSX-referenced identifiers (e.g. lowercase `motion`) as
      // used on its own, so eslint-plugin-react is no longer needed for that —
      // it was pinned to eslint <=9 and pulled a vulnerable brace-expansion.
      'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^[A-Z_]' }],
      // The course visualizers intentionally drive animation state from effects.
      // The stricter React 19 advisory is not actionable for these timer/canvas flows.
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/static-components': 'warn',
      'react-hooks/preserve-manual-memoization': 'warn',
      'react-hooks/purity': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/rules-of-hooks': 'warn',
    },
  },
])
