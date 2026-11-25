import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { buildSearchIndex } from '../generate-search-index.cjs';
import { cppLessonPaths } from '../../src/data/cppLessonIndex.js';
import { pythonFoundationLessons, pythonProjects } from '../../src/data/pythonCourseCatalog.js';
import { scienceCourses } from '../../src/data/innovationCourseCatalog.js';
import { paperIds, paperMeta } from '../../src/data/gesp/index.js';
import { getLuoguProblemUrl } from '../../src/data/gesp/codingQuestions.js';

test('checked-in search index is current, compact and only links to published routes', async () => {
  const [raw, sitemap, rebuilt] = await Promise.all([
    readFile(new URL('../../public/search-index.json', import.meta.url)),
    readFile(new URL('../../public/sitemap.xml', import.meta.url), 'utf8'),
    buildSearchIndex(),
  ]);
  const index = JSON.parse(raw);
  assert.deepEqual(index, rebuilt);
  assert.ok(raw.length < 75 * 1024);
  assert.ok(gzipSync(raw).length < 18 * 1024);
  const paths = new Set([...sitemap.matchAll(/<loc>[^<]+\/gesp-app(\/[^<]*)<\/loc>/g)]
    .map(([, pathname]) => pathname.replace(/\/$/, '')));
  for (const entry of index) {
    assert.deepEqual(Object.keys(entry).sort(), ['c', 'p', 's', 't']);
    assert.ok(entry.t && entry.s && paths.has(entry.p), JSON.stringify(entry));
  }
});

test('search indexes all course lines, exhibits and formal papers with their known judge IDs', async () => {
  const index = await buildSearchIndex();
  const courses = index.filter(row => row.c === 'course');
  const expectedCourses = [
    ...cppLessonPaths,
    ...Array.from({ length: 8 }, (_, index) => `/level${index + 1}`),
    ...[...pythonFoundationLessons, ...pythonProjects].map(lesson => lesson.path),
    ...Object.values(scienceCourses).flatMap(course => course.lessons.map(lesson => lesson.path)),
  ];
  assert.equal(courses.length, 227);
  assert.deepEqual(new Set(courses.map(row => row.p)), new Set(expectedCourses));
  const exhibits = index.filter(row => row.c === 'museum');
  assert.equal(exhibits.length, 100);
  assert.ok(exhibits.some(row => row.p === '/museum' && row.t === '第一只 Bug' && row.s === '1947'));
  const papers = index.filter(row => row.c === 'paper');
  const official = paperIds.filter(id => !paperMeta[id].unofficial);
  assert.equal(papers.length, 108);
  assert.deepEqual(new Set(papers.map(row => row.p.split('/').at(-1))), new Set(official));
  for (const row of papers) {
    const id = row.p.split('/').at(-1);
    assert.ok(row.s.includes(id.slice(0, 7)));
    for (const question of [26, 27]) {
      const url = getLuoguProblemUrl(id, question);
      if (url) assert.ok(row.s.includes(url.split('/').at(-1)), id);
    }
  }
  assert.match(papers.find(row => row.p.endsWith('/2026-09-l3')).s, /位运算.*数组.*字符串/);
});
