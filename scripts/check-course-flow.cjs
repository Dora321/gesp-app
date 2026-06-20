const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const repoRoot = path.resolve(__dirname, '..');
const srcRoot = path.join(repoRoot, 'src');

const failures = [];

function read(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

function fail(message) {
  failures.push(message);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function extractCppCatalogLessonIds(sectionId, level) {
  const catalog = read('src/components/LessonCatalog.jsx');
  const sectionMatch = catalog.match(
    new RegExp(`id: '${sectionId}',[\\s\\S]*?lessons: toCppLessons\\(${level}, \\[([\\s\\S]*?)\\]\\)`)
  );

  if (!sectionMatch) {
    fail(`LessonCatalog is missing C++ generated lessons for section ${sectionId}.`);
    return [];
  }

  const lessonCount = [...sectionMatch[1].matchAll(/'[^']+'/g)].length;
  return Array.from({ length: lessonCount }, (_, index) => index + 1);
}

function extractUnavailableLessonIds(sectionId) {
  const catalog = read('src/components/LessonCatalog.jsx');
  const unavailableMapMatch = catalog.match(/const unavailableLessonIdsBySection = \{([\s\S]*?)\n\};/);

  if (!unavailableMapMatch) {
    fail('LessonCatalog is missing unavailableLessonIdsBySection.');
    return [];
  }

  const escapedSectionId = sectionId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const sectionMatch = unavailableMapMatch[1].match(
    new RegExp(`['"]?${escapedSectionId}['"]?: \\[([^\\]]*)\\]`)
  );

  return sectionMatch ? [...sectionMatch[1].matchAll(/\d+/g)].map((match) => Number(match[0])) : [];
}

function getActualReadyCppLessonIds(level) {
  const readyIds = [];

  for (let lesson = 1; lesson <= 16; lesson += 1) {
    const page = read(`src/lessons/cpp/l${level}/Lesson${lesson}.jsx`);
    if (!/内容准备中|正在精心打造|敬请期待/.test(page)) {
      readyIds.push(lesson);
    }
  }

  return readyIds;
}

function assertSameArray(label, actual, expected) {
  const actualJson = JSON.stringify(actual);
  const expectedJson = JSON.stringify(expected);
  assert(actualJson === expectedJson, `${label} mismatch.\n  expected: ${expectedJson}\n  actual:   ${actualJson}`);
}

function countMatches(text, pattern) {
  return (text.match(pattern) || []).length;
}

function assertFileContains(relativePath, pattern, message) {
  const text = read(relativePath);
  assert(pattern.test(text), `${relativePath}: ${message}`);
}

function extractObjectField(objectText, fieldName) {
  const match = objectText.match(new RegExp(`${fieldName}: '([^']+)'`));
  return match?.[1] ?? null;
}

function assertFeaturedProjectCard(projectId, expected) {
  const featuredProjects = read('src/components/FeaturedProjects.jsx');
  const projectMatch = featuredProjects.match(
    new RegExp(`\\{\\s*id: '${projectId}',[\\s\\S]*?\\n\\s*\\}`)
  );

  assert(projectMatch, `FeaturedProjects is missing project ${projectId}.`);
  if (!projectMatch) return;

  for (const [fieldName, expectedValue] of Object.entries(expected.fields)) {
    const actualValue = extractObjectField(projectMatch[0], fieldName);
    assert(
      actualValue === expectedValue,
      `FeaturedProjects project ${projectId} should use ${fieldName}=${expectedValue}, got ${actualValue}.`
    );
  }

  for (const descSnippet of expected.descIncludes ?? []) {
    const desc = extractObjectField(projectMatch[0], 'desc') ?? '';
    assert(
      desc.includes(descSnippet),
      `FeaturedProjects project ${projectId} description should mention ${descSnippet}.`
    );
  }
}

function assertLearningPathRoute(pathId, expectedRoute) {
  const learningPaths = read('src/components/LearningPaths.jsx');
  const pathMatch = learningPaths.match(
    new RegExp(`id: '${pathId}',[\\s\\S]*?route: '([^']+)'`)
  );

  assert(pathMatch, `LearningPaths is missing path ${pathId}.`);
  if (!pathMatch) return;

  assert(
    pathMatch[1] === expectedRoute,
    `LearningPaths path ${pathId} should route to ${expectedRoute}, got ${pathMatch[1]}.`
  );
}

function assertCatalogSubjectCopy() {
  const catalog = read('src/components/LessonCatalog.jsx');

  assert(
    !catalog.includes('readyLessonIdsBySection'),
    'LessonCatalog should not duplicate every ready lesson id in a hard-coded allowlist.'
  );
  assert(
    catalog.includes('unavailableLessonIdsBySection'),
    'LessonCatalog should track only unavailable lesson exceptions.'
  );
  assert(
    /function toCppLessons\(level, titles\)/.test(catalog),
    'LessonCatalog should generate C++ lesson ids and paths from level and title lists.'
  );
  for (let level = 1; level <= 6; level += 1) {
    assert(
      catalog.includes(`lessons: toCppLessons(${level}, [`),
      `LessonCatalog should generate C++ level ${level} lessons with toCppLessons.`
    );
  }
  assert(
    !catalog.includes("{ id: 1, title: '你好，计算机', path: '/lesson/1/1' }"),
    'LessonCatalog should not hard-code C++ lesson id/path objects now that toCppLessons owns the route pattern.'
  );
  assert(
    catalog.includes("import { pythonFoundationLessons } from '../data/pythonFoundationFlow';") &&
      catalog.includes("import { pythonProjects } from '../data/pythonProjectFlow';"),
    'LessonCatalog should import Python catalog lessons from the shared Python flow modules.'
  );
  assert(
    catalog.includes('lessons: toCatalogLessons(pythonFoundationLessons)') &&
      catalog.includes('lessons: toCatalogLessons(pythonProjects)'),
    'LessonCatalog should generate Python lesson lists from shared Python flow data.'
  );
  assert(
    !catalog.includes("{ id: 1, title: 'Python 入门', path: '/python/f1' }") &&
      !catalog.includes("{ id: 1, title: '算法思维', path: '/python/a1' }"),
    'LessonCatalog should not hard-code Python lesson arrays now that shared flow data owns them.'
  );
  assert(
    /function getSubjectSummaryStats\(subject\)/.test(catalog),
    'LessonCatalog should derive subject summary stats from lesson sections.'
  );
  assert(
    /function getSectionSubtitle\(section\)/.test(catalog),
    'LessonCatalog should derive section subtitles from each section lesson count.'
  );
  assert(
    !/stats:\s*\[/.test(catalog),
    'LessonCatalog subject summary stats should not be hard-coded arrays.'
  );
  for (const staleStat of [
    '6 个系统课段',
    '96 节等级课',
    'L1-L8 冲刺入口',
    '7 节基础课',
    '9 个项目课',
    '16 课时 · GESP',
    '7 课时 · 趣味编程',
    '9 个项目 · 实战演练',
  ]) {
    assert(
      !catalog.includes(staleStat),
      `LessonCatalog should not hard-code stale summary stat: ${staleStat}`
    );
  }
  assert(
    /function getUnavailableLessonHint\(section, subject\)/.test(catalog),
    'LessonCatalog should generate unavailable lesson hints by subject.'
  );
  assert(
    catalog.includes('建议先完成已上线基础课，再进入项目线做作品'),
    'Python basic unavailable hint should point to the project path, not GESP exam review.'
  );
  assert(
    catalog.includes('建议先复习 Python 基础课，再回到项目课继续推进'),
    'Python project unavailable hint should point back to Python prerequisites.'
  );
  assert(
    catalog.includes('建议先看冲刺课和真题复盘'),
    'C++ unavailable hint should still point to GESP sprint and paper review.'
  );
}

function assertHeroUsesPaperStats() {
  const hero = read('src/components/HeroSection.jsx');

  assert(
    hero.includes("import { paperStats } from '../data/gesp/_stats';"),
    'HeroSection should read GESP paper counters from the lightweight stats module.'
  );
  assert(
    !/\d+\s*套真题/.test(hero),
    'HeroSection should not hard-code the GESP paper count.'
  );
  assert(
    hero.includes('useShouldAnimateCodePulse') &&
      hero.includes('(min-width: 1024px)') &&
      hero.includes('(prefers-reduced-motion: reduce)'),
    'HeroSection code animation should only run on large screens and respect reduced-motion preferences.'
  );
  assert(
    hero.includes('if (!shouldAnimate)') && hero.includes('setInterval'),
    'HeroSection code animation interval should be gated by shouldAnimate.'
  );
}

function countPaperPlaceholderMarkers(paperId) {
  const [, , , level] = paperId.match(/^(\d{4})-(\d{2})-l(\d)$/) || [];
  if (!level) {
    fail(`Invalid paper id: ${paperId}`);
    return 0;
  }

  const paper = read(`src/data/gesp/level${level}/${paperId}.js`);
  const markers = [
    /待补充/g,
    /待补全/g,
    /题面暂缺/g,
    /提取异常/g,
    /\[待补充选项\]/g,
    /\/\*\s*TODO\s*\*\//g,
    /\/\/\s*TODO/g,
  ];

  return markers.reduce((total, marker) => total + (paper.match(marker) || []).length, 0);
}

function assertQuestionBankReviewCopy() {
  const questionBankHome = read('src/pages/QuestionBankHome.jsx');

  assert(
    questionBankHome.includes('解析待精修'),
    'QuestionBankHome should label papers that still need explanation polish.'
  );
  assert(
    questionBankHome.includes('paperStats.reviewPaperCount'),
    'QuestionBankHome should surface the count of papers that need review.'
  );
  assert(
    questionBankHome.includes('paperStats.firstYear') && questionBankHome.includes('paperStats.latestYear'),
    'QuestionBankHome should render the paper year range from generated stats.'
  );
  assert(
    !/收录\s+\d{4}-\d{4}\s+年/.test(questionBankHome),
    'QuestionBankHome should not hard-code the paper year range.'
  );
}

function assertSameNumber(label, actual, expected) {
  assert(actual === expected, `${label} mismatch. expected ${expected}, got ${actual}`);
}

async function main() {
  const [
    { getCppLevelSupport },
    { getCppL1LessonSupport },
    { paperIds, paperMeta },
    { paperStats },
    { pythonFoundationLessons },
    { pythonProjects },
  ] = await Promise.all([
    import(pathToFileURL(path.join(srcRoot, 'data', 'cppLevelFlow.js')).href),
    import(pathToFileURL(path.join(srcRoot, 'data', 'cppL1CourseFlow.js')).href),
    import(pathToFileURL(path.join(srcRoot, 'data', 'gesp', '_generated.js')).href),
    import(pathToFileURL(path.join(srcRoot, 'data', 'gesp', '_stats.js')).href),
    import(pathToFileURL(path.join(srcRoot, 'data', 'pythonFoundationFlow.js')).href),
    import(pathToFileURL(path.join(srcRoot, 'data', 'pythonProjectFlow.js')).href),
  ]);

  assertCatalogSubjectCopy();
  assertHeroUsesPaperStats();
  assertQuestionBankReviewCopy();

  const generatedQuestionCount = paperIds.reduce((sum, id) => sum + (paperMeta[id]?.questionCount || 0), 0);
  const generatedReviewPaperCount = paperIds.filter(id => paperMeta[id]?.needsReview).length;
  assertSameNumber('GESP stats paperCount', paperStats.paperCount, paperIds.length);
  assertSameNumber('GESP stats questionCount', paperStats.questionCount, generatedQuestionCount);
  assertSameNumber('GESP stats reviewPaperCount', paperStats.reviewPaperCount, generatedReviewPaperCount);
  assertSameNumber('GESP stats levelCount', paperStats.levelCount, new Set(paperIds.map(id => paperMeta[id]?.level)).size);
  assertSameNumber('GESP stats firstYear', paperStats.firstYear, Math.min(...paperIds.map(id => paperMeta[id]?.year)));
  assertSameNumber('GESP stats latestYear', paperStats.latestYear, Math.max(...paperIds.map(id => paperMeta[id]?.year)));

  for (const paperId of paperIds) {
    const placeholderCount = countPaperPlaceholderMarkers(paperId);
    assertSameNumber(`GESP paper ${paperId} placeholderCount`, paperMeta[paperId]?.placeholderCount, placeholderCount);
    assert(
      paperMeta[paperId]?.needsReview === (placeholderCount > 0),
      `GESP paper ${paperId} needsReview should match placeholderCount.`
    );
  }

  for (const [label, items] of [
    ['Python foundation lessons', pythonFoundationLessons],
    ['Python project lessons', pythonProjects],
  ]) {
    assert(items.length > 0, `${label} should not be empty.`);
    for (const item of items) {
      assert(item.path?.startsWith('/python/'), `${label} item ${item.id} should define a Python route.`);
      assert(item.title && item.catalogTitle, `${label} item ${item.id} should define title and catalogTitle.`);
    }
  }

  assertFeaturedProjectCard('game2048', {
    fields: {
      title: '2048 游戏工坊',
      time: '3-4课时',
      path: '/python/a2',
    },
    descIncludes: ['二维列表', '移动', '合并'],
  });
  assertFeaturedProjectCard('morse', {
    fields: {
      title: 'A8 摩斯电码',
      time: '2-3课时',
      path: '/python/morse',
    },
    descIncludes: ['字典映射', '摩斯电码'],
  });
  assertFeaturedProjectCard('bfs-maze', {
    fields: {
      title: '图搜索与迷宫寻路',
      time: '4-5课时',
      path: '/level7',
    },
    descIncludes: ['C++ 七级', 'BFS', '最短路'],
  });

  assertLearningPathRoute('gesp', '/question-bank');
  assertLearningPathRoute('python', '/python/f1');
  assertLearningPathRoute('project', '/python/a1');

  const cppCatalogSections = [
    ['basic', 1],
    ['advanced', 2],
    ['expert', 3],
    ['senior', 4],
    ['expert5', 5],
    ['master', 6],
  ];

  for (const [sectionId, level] of cppCatalogSections) {
    const catalogLessonIds = extractCppCatalogLessonIds(sectionId, level);
    const readyLessonIds = getActualReadyCppLessonIds(level);
    const expectedUnavailableLessonIds = catalogLessonIds.filter(id => !readyLessonIds.includes(id));

    assertSameArray(
      `C++ ${sectionId} unavailable lesson status`,
      extractUnavailableLessonIds(sectionId),
      expectedUnavailableLessonIds
    );
  }

  for (let level = 1; level <= 8; level += 1) {
    const support = getCppLevelSupport(level);
    assert(support, `C++ level ${level} is missing support data.`);
    if (!support) continue;

    assert(support.path === `/level${level}`, `C++ level ${level} has wrong path: ${support.path}`);
    assert(support.goals?.length >= 3, `C++ level ${level} needs at least 3 goals.`);
    assert(support.deliverables?.length >= 3, `C++ level ${level} needs at least 3 deliverables.`);
    assert(support.checks?.length >= 3, `C++ level ${level} needs at least 3 checks.`);
    assert(support.practiceLinks?.length >= 1, `C++ level ${level} needs practice links.`);
    assert(support.reviewTasks?.length >= 3, `C++ level ${level} needs review tasks.`);
    assert(level === 1 ? support.previous === null : support.previous?.path === `/level${level - 1}`, `C++ level ${level} has wrong previous link.`);
    assert(
      level === 8 ? support.next?.path === '/question-bank' : support.next?.path === `/level${level + 1}`,
      `C++ level ${level} has wrong next link.`
    );

    const pagePath = `src/courses/CourseLevel${level}.jsx`;
    assertFileContains(pagePath, new RegExp(`CppLevelSupport level=\\{${level}\\}`), `missing top CppLevelSupport for level ${level}.`);
    assertFileContains(
      pagePath,
      new RegExp(`CppLevelSupport level=\\{${level}\\} placement="bottom"`),
      `missing bottom CppLevelSupport for level ${level}.`
    );
  }

  for (let lesson = 1; lesson <= 16; lesson += 1) {
    const support = getCppL1LessonSupport(lesson);
    assert(support?.quality?.goals?.length >= 3, `C++ L1 lesson ${lesson} needs at least 3 goals.`);
    assert(support?.quality?.deliverables?.length >= 3, `C++ L1 lesson ${lesson} needs at least 3 deliverables.`);
    assert(support?.quality?.checks?.length >= 3, `C++ L1 lesson ${lesson} needs at least 3 checks.`);
    assert(support?.practiceLinks?.length >= 1, `C++ L1 lesson ${lesson} needs practice links.`);
    assert(support?.reviewTasks?.length >= 2, `C++ L1 lesson ${lesson} needs review tasks.`);

    const pagePath = `src/lessons/cpp/l1/Lesson${lesson}.jsx`;
    const page = read(pagePath);
    assert(
      countMatches(page, new RegExp(`CppL1LessonSupport lessonId=\\{${lesson}\\}`, 'g')) >= 2,
      `${pagePath}: should include top and bottom CppL1LessonSupport.`
    );
    assert(
      new RegExp(`CppL1LessonSupport lessonId=\\{${lesson}\\} placement="bottom"`).test(page),
      `${pagePath}: missing bottom CppL1LessonSupport.`
    );
  }

  const foundationPages = [
    ['f1', 'PythonFoundation1.jsx'],
    ['f2', 'PythonFoundation2.jsx'],
    ['f3', 'PythonFoundation3.jsx'],
    ['f4', 'PythonFoundation4.jsx'],
    ['f5', 'PythonFoundation5.jsx'],
    ['f6', 'PythonFoundation6.jsx'],
    ['f7', 'PythonFoundation7.jsx'],
  ];

  for (const [lessonId, fileName] of foundationPages) {
    const pagePath = `src/courses/python/foundation/${fileName}`;
    const page = read(pagePath);
    assert(
      countMatches(page, new RegExp(`PythonFoundationSupport lessonId="${lessonId}"`, 'g')) >= 2,
      `${pagePath}: should include top and bottom PythonFoundationSupport.`
    );
    assert(
      new RegExp(`PythonFoundationSupport lessonId="${lessonId}" placement="bottom"`).test(page),
      `${pagePath}: missing bottom PythonFoundationSupport.`
    );
  }

  const projectPages = [
    ['a1', 'PythonAdvanced1.jsx'],
    ['a2', 'PythonAdvanced2.jsx'],
    ['ai', 'PythonAI.jsx'],
    ['crawler', 'PythonCrawler.jsx'],
    ['binary-search', 'BinarySearchProject.jsx'],
    ['encryption', 'PythonEncryptionProject.jsx'],
    ['sorting', 'PythonSortingProject.jsx'],
    ['morse', 'PythonMorseProject.jsx'],
    ['file-ops', 'PythonFileOps.jsx'],
  ];

  for (const [projectId, fileName] of projectPages) {
    const pagePath = `src/courses/python/advanced/${fileName}`;
    const page = read(pagePath);
    assert(
      countMatches(page, new RegExp(`PythonProjectSupport projectId="${projectId}"`, 'g')) >= 2,
      `${pagePath}: should include top and bottom PythonProjectSupport.`
    );
    assert(
      new RegExp(`PythonProjectSupport projectId="${projectId}" placement="bottom"`).test(page),
      `${pagePath}: missing bottom PythonProjectSupport.`
    );
  }

  if (failures.length > 0) {
    console.error('Course flow checks failed:\n');
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }

  console.log('Course flow checks passed.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
