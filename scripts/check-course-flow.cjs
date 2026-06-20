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

function extractCatalogPaths(sectionId) {
  const catalog = read('src/components/LessonCatalog.jsx');
  const sectionMatch = catalog.match(
    new RegExp(`id: '${sectionId}',[\\s\\S]*?lessons: \\[([\\s\\S]*?)\\]\\n\\s*\\}`)
  );

  if (!sectionMatch) {
    fail(`LessonCatalog is missing section ${sectionId}.`);
    return [];
  }

  return [...sectionMatch[1].matchAll(/path: '([^']+)'/g)].map((match) => match[1]);
}

function extractFlowPaths(relativePath) {
  return [...read(relativePath).matchAll(/\{ id: '[^']+', title: '[^']+', path: '([^']+)' \}/g)].map(
    (match) => match[1]
  );
}

function extractReadyLessonIds(sectionId) {
  const catalog = read('src/components/LessonCatalog.jsx');
  const readyMapMatch = catalog.match(/const readyLessonIdsBySection = \{([\s\S]*?)\n\};/);

  if (!readyMapMatch) {
    fail('LessonCatalog is missing readyLessonIdsBySection.');
    return [];
  }

  const escapedSectionId = sectionId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const sectionMatch = readyMapMatch[1].match(
    new RegExp(`['"]?${escapedSectionId}['"]?: \\[([^\\]]*)\\]`)
  );

  if (!sectionMatch) {
    fail(`readyLessonIdsBySection is missing ${sectionId}.`);
    return [];
  }

  return [...sectionMatch[1].matchAll(/\d+/g)].map((match) => Number(match[0]));
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

async function main() {
  const [{ getCppLevelSupport }, { getCppL1LessonSupport }] = await Promise.all([
    import(pathToFileURL(path.join(srcRoot, 'data', 'cppLevelFlow.js')).href),
    import(pathToFileURL(path.join(srcRoot, 'data', 'cppL1CourseFlow.js')).href),
  ]);

  assertCatalogSubjectCopy();

  assertSameArray(
    'Python foundation catalog order',
    extractCatalogPaths('python-basic'),
    extractFlowPaths('src/data/pythonFoundationFlow.js')
  );
  assertSameArray(
    'Python project catalog order',
    extractCatalogPaths('python-advanced'),
    extractFlowPaths('src/data/pythonProjectFlow.js')
  );

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
    assertSameArray(
      `C++ ${sectionId} ready lesson status`,
      extractReadyLessonIds(sectionId),
      getActualReadyCppLessonIds(level)
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
