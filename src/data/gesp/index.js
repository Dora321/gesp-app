// Central Registry for GESP Exam Papers
// Lazy-loaded: each paper is only fetched when accessed via getPaper()

/**
 * Dynamic paper loader — only fetches the paper data when actually needed.
 * This keeps the initial bundle small (~1.6MB saved).
 *
 * Usage:
 *   import { getPaper } from './index';
 *   const paperData = await getPaper('2025-12-l1');
 */
export async function getPaper(paperId) {
  const loaders = {
    // ===== Level 1 =====
    '2023-03-l1': () => import('./level1/2023-03-l1.js').then(m => m.paperData),
    '2023-06-l1': () => import('./level1/2023-06-l1.js').then(m => m.paperData),
    '2023-09-l1': () => import('./level1/2023-09-l1.js').then(m => m.paperData),
    '2023-12-l1': () => import('./level1/2023-12-l1.js').then(m => m.paperData),
    '2024-03-l1': () => import('./level1/2024-03-l1.js').then(m => m.paperData),
    '2024-06-l1': () => import('./level1/2024-06-l1.js').then(m => m.paperData),
    '2024-09-l1': () => import('./level1/2024-09-l1.js').then(m => m.paperData),
    '2024-12-l1': () => import('./level1/2024-12-l1.js').then(m => m.paperData),
    '2025-03-l1': () => import('./level1/2025-03-l1.js').then(m => m.paperData),
    '2025-06-l1': () => import('./level1/2025-06-l1.js').then(m => m.paperData),
    '2025-09-l1': () => import('./level1/2025-09-l1.js').then(m => m.paperData),
    '2025-12-l1': () => import('./level1/2025-12-l1.js').then(m => m.paperData),
    '2026-03-l1': () => import('./level1/2026-03-l1.js').then(m => m.paperData),
    // ===== Level 2 =====
    '2023-03-l2': () => import('./level2/2023-03-l2.js').then(m => m.paperData),
    '2023-06-l2': () => import('./level2/2023-06-l2.js').then(m => m.paperData),
    '2023-09-l2': () => import('./level2/2023-09-l2.js').then(m => m.paperData),
    '2023-12-l2': () => import('./level2/2023-12-l2.js').then(m => m.paperData),
    '2024-03-l2': () => import('./level2/2024-03-l2.js').then(m => m.paperData),
    '2024-06-l2': () => import('./level2/2024-06-l2.js').then(m => m.paperData),
    '2024-09-l2': () => import('./level2/2024-09-l2.js').then(m => m.paperData),
    '2024-12-l2': () => import('./level2/2024-12-l2.js').then(m => m.paperData),
    '2025-03-l2': () => import('./level2/2025-03-l2.js').then(m => m.paperData),
    '2025-06-l2': () => import('./level2/2025-06-l2.js').then(m => m.paperData),
    '2025-09-l2': () => import('./level2/2025-09-l2.js').then(m => m.paperData),
    '2025-12-l2': () => import('./level2/2025-12-l2.js').then(m => m.paperData),
    '2026-03-l2': () => import('./level2/2026-03-l2.js').then(m => m.paperData),
    // ===== Level 3 =====
    '2023-06-l3': () => import('./level3/2023-06-l3.js').then(m => m.paperData),
    '2023-09-l3': () => import('./level3/2023-09-l3.js').then(m => m.paperData),
    '2023-12-l3': () => import('./level3/2023-12-l3.js').then(m => m.paperData),
    '2024-03-l3': () => import('./level3/2024-03-l3.js').then(m => m.paperData),
    '2024-06-l3': () => import('./level3/2024-06-l3.js').then(m => m.paperData),
    '2024-09-l3': () => import('./level3/2024-09-l3.js').then(m => m.paperData),
    '2024-12-l3': () => import('./level3/2024-12-l3.js').then(m => m.paperData),
    '2025-03-l3': () => import('./level3/2025-03-l3.js').then(m => m.paperData),
    '2025-06-l3': () => import('./level3/2025-06-l3.js').then(m => m.paperData),
    '2025-09-l3': () => import('./level3/2025-09-l3.js').then(m => m.paperData),
    '2025-12-l3': () => import('./level3/2025-12-l3.js').then(m => m.paperData),
    '2026-03-l3': () => import('./level3/2026-03-l3.js').then(m => m.paperData),
    // ===== Level 4 =====
    '2023-06-l4': () => import('./level4/2023-06-l4.js').then(m => m.paperData),
    '2023-09-l4': () => import('./level4/2023-09-l4.js').then(m => m.paperData),
    '2023-12-l4': () => import('./level4/2023-12-l4.js').then(m => m.paperData),
    '2024-03-l4': () => import('./level4/2024-03-l4.js').then(m => m.paperData),
    '2024-06-l4': () => import('./level4/2024-06-l4.js').then(m => m.paperData),
    '2024-09-l4': () => import('./level4/2024-09-l4.js').then(m => m.paperData),
    '2024-12-l4': () => import('./level4/2024-12-l4.js').then(m => m.paperData),
    '2025-03-l4': () => import('./level4/2025-03-l4.js').then(m => m.paperData),
    '2025-06-l4': () => import('./level4/2025-06-l4.js').then(m => m.paperData),
    '2025-09-l4': () => import('./level4/2025-09-l4.js').then(m => m.paperData),
    '2025-12-l4': () => import('./level4/2025-12-l4.js').then(m => m.paperData),
    '2026-03-l4': () => import('./level4/2026-03-l4.js').then(m => m.paperData),
    // ===== Level 5 =====
    '2023-09-l5': () => import('./level5/2023-09-l5.js').then(m => m.paperData),
    '2023-12-l5': () => import('./level5/2023-12-l5.js').then(m => m.paperData),
    '2024-03-l5': () => import('./level5/2024-03-l5.js').then(m => m.paperData),
    '2024-06-l5': () => import('./level5/2024-06-l5.js').then(m => m.paperData),
    '2024-09-l5': () => import('./level5/2024-09-l5.js').then(m => m.paperData),
    '2024-12-l5': () => import('./level5/2024-12-l5.js').then(m => m.paperData),
    '2025-03-l5': () => import('./level5/2025-03-l5.js').then(m => m.paperData),
    '2025-06-l5': () => import('./level5/2025-06-l5.js').then(m => m.paperData),
    '2025-09-l5': () => import('./level5/2025-09-l5.js').then(m => m.paperData),
    '2025-12-l5': () => import('./level5/2025-12-l5.js').then(m => m.paperData),
    '2026-03-l5': () => import('./level5/2026-03-l5.js').then(m => m.paperData),
    // ===== Level 6 =====
    '2023-09-l6': () => import('./level6/2023-09-l6.js').then(m => m.paperData),
    '2023-12-l6': () => import('./level6/2023-12-l6.js').then(m => m.paperData),
    '2024-03-l6': () => import('./level6/2024-03-l6.js').then(m => m.paperData),
    '2024-06-l6': () => import('./level6/2024-06-l6.js').then(m => m.paperData),
    '2024-09-l6': () => import('./level6/2024-09-l6.js').then(m => m.paperData),
    '2024-12-l6': () => import('./level6/2024-12-l6.js').then(m => m.paperData),
    '2025-03-l6': () => import('./level6/2025-03-l6.js').then(m => m.paperData),
    '2025-06-l6': () => import('./level6/2025-06-l6.js').then(m => m.paperData),
    '2025-09-l6': () => import('./level6/2025-09-l6.js').then(m => m.paperData),
    '2025-12-l6': () => import('./level6/2025-12-l6.js').then(m => m.paperData),
    '2026-03-l6': () => import('./level6/2026-03-l6.js').then(m => m.paperData),
    // ===== Level 7 =====
    '2023-12-l7': () => import('./level7/2023-12-l7.js').then(m => m.paperData),
    '2024-03-l7': () => import('./level7/2024-03-l7.js').then(m => m.paperData),
    '2024-06-l7': () => import('./level7/2024-06-l7.js').then(m => m.paperData),
    '2024-09-l7': () => import('./level7/2024-09-l7.js').then(m => m.paperData),
    '2024-12-l7': () => import('./level7/2024-12-l7.js').then(m => m.paperData),
    '2025-03-l7': () => import('./level7/2025-03-l7.js').then(m => m.paperData),
    '2025-06-l7': () => import('./level7/2025-06-l7.js').then(m => m.paperData),
    '2025-09-l7': () => import('./level7/2025-09-l7.js').then(m => m.paperData),
    '2025-12-l7': () => import('./level7/2025-12-l7.js').then(m => m.paperData),
    '2026-03-l7': () => import('./level7/2026-03-l7.js').then(m => m.paperData),
    // ===== Level 8 =====
    '2023-12-l8': () => import('./level8/2023-12-l8.js').then(m => m.paperData),
    '2024-03-l8': () => import('./level8/2024-03-l8.js').then(m => m.paperData),
    '2024-06-l8': () => import('./level8/2024-06-l8.js').then(m => m.paperData),
    '2024-09-l8': () => import('./level8/2024-09-l8.js').then(m => m.paperData),
    '2024-12-l8': () => import('./level8/2024-12-l8.js').then(m => m.paperData),
    '2025-03-l8': () => import('./level8/2025-03-l8.js').then(m => m.paperData),
    '2025-06-l8': () => import('./level8/2025-06-l8.js').then(m => m.paperData),
    '2025-09-l8': () => import('./level8/2025-09-l8.js').then(m => m.paperData),
    '2025-12-l8': () => import('./level8/2025-12-l8.js').then(m => m.paperData),
    '2026-03-l8': () => import('./level8/2026-03-l8.js').then(m => m.paperData),
  };

  const loader = loaders[paperId];
  if (!loader) return null;
  return loader();
}

/**
 * List of all available paper IDs (for QuestionBankHome to enumerate papers).
 * This is lightweight — no actual paper data is loaded.
 */
export const paperIds = [
  '2023-03-l1', '2023-06-l1', '2023-09-l1', '2023-12-l1',
  '2024-03-l1', '2024-06-l1', '2024-09-l1', '2024-12-l1',
  '2025-03-l1', '2025-06-l1', '2025-09-l1', '2025-12-l1',
  '2026-03-l1',
  '2023-03-l2', '2023-06-l2', '2023-09-l2', '2023-12-l2',
  '2024-03-l2', '2024-06-l2', '2024-09-l2', '2024-12-l2',
  '2025-03-l2', '2025-06-l2', '2025-09-l2', '2025-12-l2',
  '2026-03-l2',
  '2023-06-l3', '2023-09-l3', '2023-12-l3',
  '2024-03-l3', '2024-06-l3', '2024-09-l3', '2024-12-l3',
  '2025-03-l3', '2025-06-l3', '2025-09-l3', '2025-12-l3',
  '2026-03-l3',
  '2023-06-l4', '2023-09-l4', '2023-12-l4',
  '2024-03-l4', '2024-06-l4', '2024-09-l4', '2024-12-l4',
  '2025-03-l4', '2025-06-l4', '2025-09-l4', '2025-12-l4',
  '2026-03-l4',
  '2023-09-l5', '2023-12-l5',
  '2024-03-l5', '2024-06-l5', '2024-09-l5', '2024-12-l5',
  '2025-03-l5', '2025-06-l5', '2025-09-l5', '2025-12-l5',
  '2026-03-l5',
  '2023-09-l6', '2023-12-l6',
  '2024-03-l6', '2024-06-l6', '2024-09-l6', '2024-12-l6',
  '2025-03-l6', '2025-06-l6', '2025-09-l6', '2025-12-l6',
  '2026-03-l6',
  '2023-12-l7',
  '2024-03-l7', '2024-06-l7', '2024-09-l7', '2024-12-l7',
  '2025-03-l7', '2025-06-l7', '2025-09-l7', '2025-12-l7',
  '2026-03-l7',
  '2023-12-l8',
  '2024-03-l8', '2024-06-l8', '2024-09-l8', '2024-12-l8',
  '2025-03-l8', '2025-06-l8', '2025-09-l8', '2025-12-l8',
  '2026-03-l8',
];

/**
 * Paper metadata (level, year, month, title) — lightweight, no questions.
 * Used by QuestionBankHome to display the paper list without loading actual data.
 */
export const paperMeta = {
  // ===== Level 1 =====
  '2023-03-l1': { level: 1, year: 2023, month: 3, title: '2023年3月 GESP C++ 一级真题' },
  '2023-06-l1': { level: 1, year: 2023, month: 6, title: '2023年6月 GESP C++ 一级真题' },
  '2023-09-l1': { level: 1, year: 2023, month: 9, title: '2023年9月 GESP C++ 一级真题' },
  '2023-12-l1': { level: 1, year: 2023, month: 12, title: '2023年12月 GESP C++ 一级真题' },
  '2024-03-l1': { level: 1, year: 2024, month: 3, title: '2024年3月 GESP C++ 一级真题' },
  '2024-06-l1': { level: 1, year: 2024, month: 6, title: '2024年6月 GESP C++ 一级真题' },
  '2024-09-l1': { level: 1, year: 2024, month: 9, title: '2024年9月 GESP C++ 一级真题' },
  '2024-12-l1': { level: 1, year: 2024, month: 12, title: '2024年12月 GESP C++ 一级真题' },
  '2025-03-l1': { level: 1, year: 2025, month: 3, title: '2025年3月 GESP C++ 一级真题' },
  '2025-06-l1': { level: 1, year: 2025, month: 6, title: '2025年6月 GESP C++ 一级真题' },
  '2025-09-l1': { level: 1, year: 2025, month: 9, title: '2025年9月 GESP C++ 一级真题' },
  '2025-12-l1': { level: 1, year: 2025, month: 12, title: '2025年12月 GESP C++ 一级真题' },
  '2026-03-l1': { level: 1, year: 2026, month: 3, title: '2026年3月 GESP C++ 一级真题' },
  // ===== Level 2 =====
  '2023-03-l2': { level: 2, year: 2023, month: 3, title: '2023年3月 GESP C++ 二级真题' },
  '2023-06-l2': { level: 2, year: 2023, month: 6, title: '2023年6月 GESP C++ 二级真题' },
  '2023-09-l2': { level: 2, year: 2023, month: 9, title: '2023年9月 GESP C++ 二级真题' },
  '2023-12-l2': { level: 2, year: 2023, month: 12, title: '2023年12月 GESP C++ 二级真题' },
  '2024-03-l2': { level: 2, year: 2024, month: 3, title: '2024年3月 GESP C++ 二级真题' },
  '2024-06-l2': { level: 2, year: 2024, month: 6, title: '2024年6月 GESP C++ 二级真题' },
  '2024-09-l2': { level: 2, year: 2024, month: 9, title: '2024年9月 GESP C++ 二级真题' },
  '2024-12-l2': { level: 2, year: 2024, month: 12, title: '2024年12月 GESP C++ 二级真题' },
  '2025-03-l2': { level: 2, year: 2025, month: 3, title: '2025年3月 GESP C++ 二级真题' },
  '2025-06-l2': { level: 2, year: 2025, month: 6, title: '2025年6月 GESP C++ 二级真题' },
  '2025-09-l2': { level: 2, year: 2025, month: 9, title: '2025年9月 GESP C++ 二级真题' },
  '2025-12-l2': { level: 2, year: 2025, month: 12, title: '2025年12月 GESP C++ 二级真题' },
  '2026-03-l2': { level: 2, year: 2026, month: 3, title: '2026年3月 GESP C++ 二级真题' },
  // ===== Level 3 =====
  '2023-06-l3': { level: 3, year: 2023, month: 6, title: '2023年6月 GESP C++ 三级真题' },
  '2023-09-l3': { level: 3, year: 2023, month: 9, title: '2023年9月 GESP C++ 三级真题' },
  '2023-12-l3': { level: 3, year: 2023, month: 12, title: '2023年12月 GESP C++ 三级真题' },
  '2024-03-l3': { level: 3, year: 2024, month: 3, title: '2024年3月 GESP C++ 三级真题' },
  '2024-06-l3': { level: 3, year: 2024, month: 6, title: '2024年6月 GESP C++ 三级真题' },
  '2024-09-l3': { level: 3, year: 2024, month: 9, title: '2024年9月 GESP C++ 三级真题' },
  '2024-12-l3': { level: 3, year: 2024, month: 12, title: '2024年12月 GESP C++ 三级真题' },
  '2025-03-l3': { level: 3, year: 2025, month: 3, title: '2025年3月 GESP C++ 三级真题' },
  '2025-06-l3': { level: 3, year: 2025, month: 6, title: '2025年6月 GESP C++ 三级真题' },
  '2025-09-l3': { level: 3, year: 2025, month: 9, title: '2025年9月 GESP C++ 三级真题' },
  '2025-12-l3': { level: 3, year: 2025, month: 12, title: '2025年12月 GESP C++ 三级真题' },
  '2026-03-l3': { level: 3, year: 2026, month: 3, title: '2026年3月 GESP C++ 三级真题' },
  // ===== Level 4 =====
  '2023-06-l4': { level: 4, year: 2023, month: 6, title: '2023年6月 GESP C++ 四级真题' },
  '2023-09-l4': { level: 4, year: 2023, month: 9, title: '2023年9月 GESP C++ 四级真题' },
  '2023-12-l4': { level: 4, year: 2023, month: 12, title: '2023年12月 GESP C++ 四级真题' },
  '2024-03-l4': { level: 4, year: 2024, month: 3, title: '2024年3月 GESP C++ 四级真题' },
  '2024-06-l4': { level: 4, year: 2024, month: 6, title: '2024年6月 GESP C++ 四级真题' },
  '2024-09-l4': { level: 4, year: 2024, month: 9, title: '2024年9月 GESP C++ 四级真题' },
  '2024-12-l4': { level: 4, year: 2024, month: 12, title: '2024年12月 GESP C++ 四级真题' },
  '2025-03-l4': { level: 4, year: 2025, month: 3, title: '2025年3月 GESP C++ 四级真题' },
  '2025-06-l4': { level: 4, year: 2025, month: 6, title: '2025年6月 GESP C++ 四级真题' },
  '2025-09-l4': { level: 4, year: 2025, month: 9, title: '2025年9月 GESP C++ 四级真题' },
  '2025-12-l4': { level: 4, year: 2025, month: 12, title: '2025年12月 GESP C++ 四级真题' },
  '2026-03-l4': { level: 4, year: 2026, month: 3, title: '2026年3月 GESP C++ 四级真题' },
  // ===== Level 5 =====
  '2023-09-l5': { level: 5, year: 2023, month: 9, title: '2023年9月 GESP C++ 五级真题' },
  '2023-12-l5': { level: 5, year: 2023, month: 12, title: '2023年12月 GESP C++ 五级真题' },
  '2024-03-l5': { level: 5, year: 2024, month: 3, title: '2024年3月 GESP C++ 五级真题' },
  '2024-06-l5': { level: 5, year: 2024, month: 6, title: '2024年6月 GESP C++ 五级真题' },
  '2024-09-l5': { level: 5, year: 2024, month: 9, title: '2024年9月 GESP C++ 五级真题' },
  '2024-12-l5': { level: 5, year: 2024, month: 12, title: '2024年12月 GESP C++ 五级真题' },
  '2025-03-l5': { level: 5, year: 2025, month: 3, title: '2025年3月 GESP C++ 五级真题' },
  '2025-06-l5': { level: 5, year: 2025, month: 6, title: '2025年6月 GESP C++ 五级真题' },
  '2025-09-l5': { level: 5, year: 2025, month: 9, title: '2025年9月 GESP C++ 五级真题' },
  '2025-12-l5': { level: 5, year: 2025, month: 12, title: '2025年12月 GESP C++ 五级真题' },
  '2026-03-l5': { level: 5, year: 2026, month: 3, title: '2026年3月 GESP C++ 五级真题' },
  // ===== Level 6 =====
  '2023-09-l6': { level: 6, year: 2023, month: 9, title: '2023年9月 GESP C++ 六级真题' },
  '2023-12-l6': { level: 6, year: 2023, month: 12, title: '2023年12月 GESP C++ 六级真题' },
  '2024-03-l6': { level: 6, year: 2024, month: 3, title: '2024年3月 GESP C++ 六级真题' },
  '2024-06-l6': { level: 6, year: 2024, month: 6, title: '2024年6月 GESP C++ 六级真题' },
  '2024-09-l6': { level: 6, year: 2024, month: 9, title: '2024年9月 GESP C++ 六级真题' },
  '2024-12-l6': { level: 6, year: 2024, month: 12, title: '2024年12月 GESP C++ 六级真题' },
  '2025-03-l6': { level: 6, year: 2025, month: 3, title: '2025年3月 GESP C++ 六级真题' },
  '2025-06-l6': { level: 6, year: 2025, month: 6, title: '2025年6月 GESP C++ 六级真题' },
  '2025-09-l6': { level: 6, year: 2025, month: 9, title: '2025年9月 GESP C++ 六级真题' },
  '2025-12-l6': { level: 6, year: 2025, month: 12, title: '2025年12月 GESP C++ 六级真题' },
  '2026-03-l6': { level: 6, year: 2026, month: 3, title: '2026年3月 GESP C++ 六级真题' },
  // ===== Level 7 =====
  '2023-12-l7': { level: 7, year: 2023, month: 12, title: '2023年12月 GESP C++ 七级真题' },
  '2024-03-l7': { level: 7, year: 2024, month: 3, title: '2024年3月 GESP C++ 七级真题' },
  '2024-06-l7': { level: 7, year: 2024, month: 6, title: '2024年6月 GESP C++ 七级真题' },
  '2024-09-l7': { level: 7, year: 2024, month: 9, title: '2024年9月 GESP C++ 七级真题' },
  '2024-12-l7': { level: 7, year: 2024, month: 12, title: '2024年12月 GESP C++ 七级真题' },
  '2025-03-l7': { level: 7, year: 2025, month: 3, title: '2025年3月 GESP C++ 七级真题' },
  '2025-06-l7': { level: 7, year: 2025, month: 6, title: '2025年6月 GESP C++ 七级真题' },
  '2025-09-l7': { level: 7, year: 2025, month: 9, title: '2025年9月 GESP C++ 七级真题' },
  '2025-12-l7': { level: 7, year: 2025, month: 12, title: '2025年12月 GESP C++ 七级真题' },
  '2026-03-l7': { level: 7, year: 2026, month: 3, title: '2026年3月 GESP C++ 七级真题' },
  // ===== Level 8 =====
  '2023-12-l8': { level: 8, year: 2023, month: 12, title: '2023年12月 GESP C++ 八级真题' },
  '2024-03-l8': { level: 8, year: 2024, month: 3, title: '2024年3月 GESP C++ 八级真题' },
  '2024-06-l8': { level: 8, year: 2024, month: 6, title: '2024年6月 GESP C++ 八级真题' },
  '2024-09-l8': { level: 8, year: 2024, month: 9, title: '2024年9月 GESP C++ 八级真题' },
  '2024-12-l8': { level: 8, year: 2024, month: 12, title: '2024年12月 GESP C++ 八级真题' },
  '2025-03-l8': { level: 8, year: 2025, month: 3, title: '2025年3月 GESP C++ 八级真题' },
  '2025-06-l8': { level: 8, year: 2025, month: 6, title: '2025年6月 GESP C++ 八级真题' },
  '2025-09-l8': { level: 8, year: 2025, month: 9, title: '2025年9月 GESP C++ 八级真题' },
  '2025-12-l8': { level: 8, year: 2025, month: 12, title: '2025年12月 GESP C++ 八级真题' },
  '2026-03-l8': { level: 8, year: 2026, month: 3, title: '2026年3月 GESP C++ 八级真题' },
};

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
