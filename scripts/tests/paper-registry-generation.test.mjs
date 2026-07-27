import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { pathToFileURL, fileURLToPath } from 'node:url';

import { getPaper } from '../../src/data/gesp/index.js';

const root = fileURLToPath(new URL('../..', import.meta.url));
const EXPECTED_OFFICIAL_QUESTION_COUNT = 2484;
const L8_EXTERNAL_PROGRAMMING_PAPER_IDS = [
  '2024-06-l8',
  '2024-09-l8',
  '2024-12-l8',
  '2025-03-l8',
  '2025-06-l8',
  '2025-09-l8',
  '2025-12-l8',
  '2026-03-l8',
];

function countUniqueQuestions(paper) {
  const questions = [
    ...(paper.questions || []),
    ...(paper.programmingQuestions || []),
    ...(paper.codingQuestions || []),
  ];
  const ids = new Set();
  let questionsWithoutId = 0;

  for (const question of questions) {
    if (question?.id === undefined || question?.id === null) {
      questionsWithoutId++;
    } else {
      ids.add(question.id);
    }
  }

  return ids.size + questionsWithoutId;
}

test('generated question counts match runtime papers and the official total', async () => {
  const outputDir = await mkdtemp(path.join(tmpdir(), 'gesp-paper-registry-'));
  const registryFile = path.join(outputDir, '_generated.mjs');
  const statsFile = path.join(outputDir, '_stats.mjs');

  try {
    execFileSync(process.execPath, ['scripts/generate-paper-registry.cjs'], {
      cwd: root,
      env: {
        ...process.env,
        GESP_REGISTRY_OUTPUT_FILE: registryFile,
        GESP_REGISTRY_STATS_OUTPUT_FILE: statsFile,
      },
      encoding: 'utf8',
    });

    const { paperIds, paperMeta } = await import(pathToFileURL(registryFile));
    const { paperStats } = await import(pathToFileURL(statsFile));
    let actualOfficialQuestionCount = 0;

    for (const paperId of paperIds) {
      const paper = await getPaper(paperId);
      const actualQuestionCount = countUniqueQuestions(paper);

      assert.equal(
        paperMeta[paperId].questionCount,
        actualQuestionCount,
        `${paperId} generated metadata must match its runtime unique question count`,
      );

      if (!paperMeta[paperId].unofficial) {
        actualOfficialQuestionCount += actualQuestionCount;
      }
    }

    for (const paperId of L8_EXTERNAL_PROGRAMMING_PAPER_IDS) {
      assert.equal(
        paperMeta[paperId].questionCount,
        27,
        `${paperId} must include the two externally spread programming questions`,
      );
    }

    assert.equal(actualOfficialQuestionCount, EXPECTED_OFFICIAL_QUESTION_COUNT);
    assert.equal(paperStats.questionCount, EXPECTED_OFFICIAL_QUESTION_COUNT);
  } finally {
    await rm(outputDir, { recursive: true, force: true });
  }
});

test('explicit full-paper verification is not downgraded by question corrections', async () => {
  const outputDir = await mkdtemp(path.join(tmpdir(), 'gesp-review-registry-'));
  const registryFile = path.join(outputDir, '_generated.mjs');
  const statsFile = path.join(outputDir, '_stats.mjs');
  const correctionsFile = path.join(outputDir, 'verified-corrections.js');

  try {
    await writeFile(
      correctionsFile,
      `export const verifiedQuestionCorrections = {
  '2024-03-l1': {
    sourceUrl: 'https://example.com/correction-proof.pdf',
    questions: {},
  },
};\n`,
      'utf8',
    );

    execFileSync(process.execPath, ['scripts/generate-paper-registry.cjs'], {
      cwd: root,
      env: {
        ...process.env,
        GESP_REGISTRY_OUTPUT_FILE: registryFile,
        GESP_REGISTRY_STATS_OUTPUT_FILE: statsFile,
        GESP_VERIFIED_CORRECTIONS_FILE: correctionsFile,
        GESP_VERIFIED_CORRECTIONS_DIR: path.join(outputDir, 'no-corrections-directory'),
      },
      encoding: 'utf8',
    });

    const { paperMeta } = await import(pathToFileURL(registryFile));
    const meta = paperMeta['2024-03-l1'];

    assert.equal(meta.reviewStatus, 'verified');
    assert.equal(meta.reviewedBy, '本站校订');
    assert.equal(meta.reviewedAt, '2026-07-04');
    assert.equal(meta.reviewScope, '题面、代码、选项与答案');
  } finally {
    await rm(outputDir, { recursive: true, force: true });
  }
});
