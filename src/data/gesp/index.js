// Central Registry for GESP Exam Papers
// Lazy-loaded: each paper is only fetched when accessed via getPaper()
//
// Data is auto-generated from directory scan — run:
//   node scripts/generate-paper-registry.cjs
// to regenerate after adding/removing paper files.

import { paperIds as _paperIds, paperMeta as _paperMeta, loaders as _loaders } from './_generated.js';

/**
 * Dynamic paper loader — only fetches the paper data when actually needed.
 * This keeps the initial bundle small (~1.6MB saved).
 *
 * Usage:
 *   import { getPaper } from './index';
 *   const paperData = await getPaper('2025-12-l1');
 */
export async function getPaper(paperId) {
  const loader = _loaders[paperId];
  if (!loader) return null;
  return loader();
}

/**
 * List of all available paper IDs (for QuestionBankHome to enumerate papers).
 * This is lightweight — no actual paper data is loaded.
 */
export const paperIds = _paperIds;

/**
 * Paper metadata (level, year, month, title, questionCount) — lightweight, no questions.
 * Used by QuestionBankHome to display the paper list without loading actual data.
 */
export const paperMeta = _paperMeta;

// Backward-compatible: paperRegistry as a lazy proxy.
// Accessing paperRegistry[paperId] triggers a dynamic import.
// Note: This only works with await or .then() since the data loads asynchronously.
// For synchronous access (deprecated), use getPaper() instead.
export const paperRegistry = new Proxy({}, {
  get(target, prop) {
    if (prop === Symbol.toPrimitive || prop === 'toString' || prop === 'valueOf') return undefined;
    if (typeof prop === 'string' && prop.includes('-')) {
      console.warn(`[paperRegistry] Synchronous access of "${prop}" is deprecated. Use getPaper("${prop}") instead.`);
    }
    return undefined;
  },
  ownKeys() { return paperIds; },
  has(target, prop) { return paperIds.includes(prop); },
});

export default { getPaper, paperIds, paperMeta, paperRegistry };