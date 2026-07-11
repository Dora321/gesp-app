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

function assertPracticeLinksResolve(label, links, paperIds) {
  for (const link of links || []) {
    if (link.path === '/question-bank') continue;

    const paperMatch = link.path.match(/^\/question-bank\/\d\/(.+)$/);
    if (paperMatch) {
      assert(paperIds.includes(paperMatch[1]), `${label} links to missing paper ${link.path}.`);
      continue;
    }

    const gespMatch = link.path.match(/^\/gesp\/(.+)$/);
    if (gespMatch) {
      assert(paperIds.includes(gespMatch[1]), `${label} links to missing paper ${link.path}.`);
      continue;
    }

    const lessonMatch = link.path.match(/^\/lesson\/(\d+)\/(\d+)$/);
    if (lessonMatch) {
      const [, level, lesson] = lessonMatch;
      assert(
        fs.existsSync(path.join(srcRoot, 'lessons', 'cpp', `l${level}`, `Lesson${lesson}.jsx`)),
        `${label} links to missing lesson ${link.path}.`
      );
      continue;
    }

    fail(`${label} has unsupported practice link path: ${link.path}`);
  }
}

function assertFeaturedProjectsUseSharedData() {
  const featuredProjects = read('src/components/FeaturedProjects.jsx');

  assert(
    featuredProjects.includes("import { getCppLevelCatalogItem } from '../data/cppLevelCatalog';") &&
      featuredProjects.includes("import { getPythonProjectSupport } from '../data/pythonProjectFlow';"),
    'FeaturedProjects should derive featured project routes and copy from shared course data.'
  );
  assert(
    featuredProjects.includes("getPythonProjectCard('a2'") &&
      featuredProjects.includes("getPythonProjectCard('morse'") &&
      featuredProjects.includes("const pythonProjectStart = getPythonProjectSupport('a1');") &&
      featuredProjects.includes('support.current.title') &&
      featuredProjects.includes('support.brief.duration') &&
      featuredProjects.includes('support.current.path'),
    'FeaturedProjects Python cards should derive title, duration and path from Python project support data.'
  );
  assert(
    featuredProjects.includes('navigate(pythonProjectStart.current.path)') &&
      featuredProjects.includes('pythonProjectStart.current.title'),
    'FeaturedProjects Python project line CTA should derive its route and label from the first project.'
  );
  assert(
    featuredProjects.includes('getCppLevelCatalogItem(7)') &&
      featuredProjects.includes('path: cppLevel7.path') &&
      featuredProjects.includes('cppLevel7.title'),
    'FeaturedProjects C++ algorithm card should derive its level route from the C++ catalog.'
  );
  for (const staleSnippet of [
    "title: '2048 游戏工坊'",
    "title: 'A8 摩斯电码'",
    "path: '/python/a2'",
    "path: '/python/morse'",
    "path: '/level7'",
    "navigate('/python/a1')",
  ]) {
    assert(
      !featuredProjects.includes(staleSnippet),
      `FeaturedProjects should not hard-code stale card data: ${staleSnippet}`
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

function assertLearningPathsUseSharedData() {
  const learningPaths = read('src/components/LearningPaths.jsx');

  assert(
    learningPaths.includes("import { getCppLevelCatalogItem } from '../data/cppLevelCatalog';") &&
      learningPaths.includes("import { paperStats } from '../data/gesp/_stats';") &&
      learningPaths.includes("import { pythonFoundationLessons, pythonProjects } from '../data/pythonCourseCatalog';"),
    'LearningPaths should derive route steps from lightweight course catalog and paper data.'
  );
  assert(
    learningPaths.includes('cppStart.title') &&
      learningPaths.includes('cppEnd.title') &&
      learningPaths.includes('paperStats.firstYear') &&
      learningPaths.includes('paperStats.latestYear') &&
      learningPaths.includes('paperStats.reviewPaperCount'),
    'LearningPaths GESP path should stay aligned with C++ level and generated paper stats.'
  );
  assert(
    learningPaths.includes('firstPythonLesson.path') &&
      learningPaths.includes('firstPythonProject.path') &&
      learningPaths.includes('lastPythonLesson.title') &&
      learningPaths.includes('lastPythonProject.title'),
    'LearningPaths Python paths should stay aligned with shared Python flow data.'
  );
  for (const staleStep of [
    "steps: ['C++ 等级课程', '真题分卷练习', '解析复盘与错题回看']",
    "steps: ['输入输出与变量', '条件循环与容器', '小项目巩固语法']",
    "steps: ['算法思维入门', '游戏、AI 与爬虫项目', '算法作品与文件收尾']",
    "route: '/python/f1'",
    "route: '/python/a1'",
  ]) {
    assert(
      !learningPaths.includes(staleStep),
      `LearningPaths should not hard-code stale route step: ${staleStep}`
    );
  }
}

function assertFooterUsesSharedData() {
  const footer = read('src/components/Footer.jsx');

  assert(
    footer.includes("import { getCppLevelCatalogItem } from '../data/cppLevelCatalog';") &&
      footer.includes("import { pythonFoundationLessons, pythonProjects } from '../data/pythonCourseCatalog';"),
    'Footer should derive course links from lightweight shared course catalogs.'
  );
  assert(
    footer.includes('pythonStart.path') &&
      footer.includes('cppStart.path') &&
      footer.includes('algorithmStart.path') &&
      footer.includes('aiProject.path'),
    'Footer course links and primary CTA should use shared catalog paths.'
  );
  for (const staleSnippet of [
    "path: '/python/f1'",
    "path: '/level1'",
    "path: '/level5'",
    "path: '/python/ai'",
    "navigate('/python/f1')",
  ]) {
    assert(
      !footer.includes(staleSnippet),
      `Footer should not hard-code stale course route: ${staleSnippet}`
    );
  }
}

function assertAnnouncementUsesSharedData() {
  const announcement = read('src/components/AnnouncementBar.jsx');

  assert(
    announcement.includes("import { getPythonProjectSupport } from '../data/pythonProjectFlow';") &&
      announcement.includes("const featuredProject = getPythonProjectSupport('a2');"),
    'AnnouncementBar should derive its featured project from Python project support data.'
  );
  assert(
    announcement.includes('featuredProject.current.title') &&
      announcement.includes('featuredProject.brief.artifact') &&
      announcement.includes('featuredProject.current.path') &&
      announcement.includes('useNavigate'),
    'AnnouncementBar should use shared project title, artifact and route without a full page reload.'
  );
  assert(
    !announcement.includes("const linkPath = '/python/a2';") &&
      !announcement.includes('href={linkPath}') &&
      !announcement.includes('Python 2048 趣味项目'),
    'AnnouncementBar should not hard-code the featured project link or stale copy.'
  );
}

function assertNotFoundUsesSharedData() {
  const notFound = read('src/pages/NotFound.jsx');

  assert(
    notFound.includes("import { pythonFoundationLessons } from '../data/pythonCourseCatalog';") &&
      notFound.includes('const pythonStart = pythonFoundationLessons[0];'),
    'NotFound should derive its recovery course link from the shared Python catalog.'
  );
  assert(
    notFound.includes('to={pythonStart.path}') &&
      notFound.includes('{pythonStart.catalogTitle}'),
    'NotFound should use shared Python route and title for the recovery CTA.'
  );
  assert(
    !notFound.includes('to="/python/f1"') &&
      !notFound.includes('Python F1'),
    'NotFound should not hard-code the first Python course route or title.'
  );
}

function assertCatalogSubjectCopy() {
  const catalog = read('src/components/LessonCatalog.jsx');

  assert(
    catalog.includes("import { getCppLevelCatalogItem } from '../data/cppLevelCatalog';") &&
      catalog.includes("import { pythonFoundationLessons, pythonProjects } from '../data/pythonCourseCatalog';"),
    'LessonCatalog should import C++ and Python catalog data from lightweight shared catalog modules.'
  );
  assert(
    catalog.includes('pythonStart.path') &&
      catalog.includes('pythonProjectStart.path') &&
      catalog.includes('pythonFileProject.path') &&
      catalog.includes('getCppLevelCatalogItem(7).path') &&
      catalog.includes('getCppLevelCatalogItem(8).path'),
    'LessonCatalog should derive C++ sprint and Python progression routes from shared catalogs.'
  );
  for (const staleRoute of [
    "examPath: '/level1'",
    "examPath: '/level2'",
    "examPath: '/level3'",
    "examPath: '/level4'",
    "examPath: '/level5'",
    "examPath: '/level6'",
    "ctaPath: '/python/f1'",
    "path: '/python/a1'",
    "path: '/python/f1'",
    "path: '/python/file-ops'",
    "path: '/level7'",
    "path: '/level8'",
  ]) {
    assert(
      !catalog.includes(staleRoute),
      `LessonCatalog should not hard-code stale catalog route: ${staleRoute}`
    );
  }
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
  const motionHook = read('src/hooks/useShouldRunDecorativeMotion.js');

  assert(
    hero.includes("import { paperStats } from '../data/gesp/_stats';"),
    'HeroSection should read GESP paper counters from the lightweight stats module.'
  );
  assert(
    !/\d+\s*套真题/.test(hero),
    'HeroSection should not hard-code the GESP paper count.'
  );
  assert(
    hero.includes("from '../hooks/useShouldRunDecorativeMotion';") &&
      hero.includes('useShouldRunDecorativeMotion') &&
      hero.includes('const shouldAnimate = useShouldRunDecorativeMotion();') &&
      motionHook.includes('minWidth = 1024') &&
      motionHook.includes('`(min-width: ${minWidth}px)`') &&
      motionHook.includes('(prefers-reduced-motion: reduce)') &&
      motionHook.includes('matchMedia'),
    'HeroSection code animation should use the shared decorative motion hook.'
  );
  assert(
    hero.includes('if (!shouldAnimate)') && hero.includes('setInterval'),
    'HeroSection code animation interval should be gated by shouldAnimate.'
  );
}

function assertTheLabUsesMotionPreference() {
  const lab = read('src/components/TheLab.jsx');

  assert(
    lab.includes("import { useShouldRunDecorativeMotion } from '../hooks/useShouldRunDecorativeMotion';") &&
      lab.includes('const shouldAnimate = useShouldRunDecorativeMotion();'),
    'TheLab should use the shared decorative motion preference hook.'
  );
  assert(
    lab.includes('if (!shouldAnimate)') &&
      lab.includes('setActiveLine(1)') &&
      lab.includes('setInterval') &&
      lab.includes('[shouldAnimate]'),
    'TheLab debug animation interval should only run when decorative motion is allowed.'
  );
}

function assertLoadingScreenUsesMotionPreference() {
  const loading = read('src/components/LoadingScreen.jsx');

  assert(
    loading.includes("import { useShouldRunDecorativeMotion } from '../hooks/useShouldRunDecorativeMotion';") &&
      loading.includes('const shouldAnimateDecorations = useShouldRunDecorativeMotion();'),
    'LoadingScreen should use the shared decorative motion preference hook.'
  );
  assert(
    loading.includes('if (!shouldAnimateDecorations)') &&
      loading.includes("setDots('')") &&
      loading.includes('setInterval') &&
      loading.includes('[shouldAnimateDecorations]'),
    'LoadingScreen animated dots should only run when decorative motion is allowed.'
  );
  assert(
    loading.includes('!canvas || !shouldAnimateDecorations') &&
      loading.includes('requestAnimationFrame(draw)'),
    'LoadingScreen canvas particles should not start when decorative motion is disabled.'
  );
  assert(
    loading.includes("shouldAnimateDecorations ? 'loader-spin") &&
      loading.includes("shouldAnimateDecorations ? 'loader-pulse") &&
      loading.includes("shouldAnimateDecorations ? 'loader-shimmer") &&
      loading.includes("shouldAnimateDecorations ? 'loader-progress") &&
      loading.includes("width: shouldAnimateDecorations ? undefined : '70%'"),
    'LoadingScreen CSS animations should be gated by decorative motion preference.'
  );
}

function assertNavigationRespectsMotionPreference() {
  const navigation = read('src/components/Navigation.jsx');
  const motionHook = read('src/hooks/useShouldRunDecorativeMotion.js');

  assert(
    motionHook.includes('export function usePrefersReducedMotion()') &&
      motionHook.includes('prefers-reduced-motion: reduce'),
    'Motion hook should expose a reduced-motion preference reader for interaction components.'
  );
  assert(
    navigation.includes("import { usePrefersReducedMotion } from '../hooks/useShouldRunDecorativeMotion';") &&
      navigation.includes('const prefersReducedMotion = usePrefersReducedMotion();'),
    'Navigation should read the reduced-motion preference.'
  );
  assert(
    navigation.includes('const scrollToSection =') &&
      navigation.includes("behavior: prefersReducedMotion ? 'auto' : 'smooth'") &&
      !navigation.includes("scrollIntoView({ behavior: 'smooth' })"),
    'Navigation section scrolling should avoid smooth scrolling when reduced motion is requested.'
  );
  assert(
    navigation.includes("prefersReducedMotion ? 'transition-none'") &&
      navigation.includes("transitionDelay: prefersReducedMotion ? '0ms'") &&
      navigation.includes("transform: prefersReducedMotion || isMobileMenuOpen ? 'translateY(0)'"),
    'Navigation mobile menu transitions should respect reduced-motion preferences.'
  );
}

function assertHomeScrollControlsRespectMotionPreference() {
  const hero = read('src/components/HeroSection.jsx');
  const footer = read('src/components/Footer.jsx');
  const explore = read('src/components/ExploreMore.jsx');
  const scrollToTop = read('src/components/ScrollToTop.jsx');

  for (const [label, source] of [
    ['HeroSection', hero],
    ['Footer', footer],
    ['ExploreMore', explore],
  ]) {
    assert(
      source.includes("usePrefersReducedMotion") &&
        source.includes("behavior: prefersReducedMotion ? 'auto' : 'smooth'") &&
        !source.includes("scrollIntoView({ behavior: 'smooth' })"),
      `${label} home scroll controls should respect reduced-motion preferences.`
    );
  }
  assert(
    scrollToTop.includes("import { usePrefersReducedMotion } from '../hooks/useShouldRunDecorativeMotion';") &&
      scrollToTop.includes('const prefersReducedMotion = usePrefersReducedMotion();') &&
      scrollToTop.includes("behavior: prefersReducedMotion ? 'auto' : 'smooth'") &&
      !scrollToTop.includes('behavior: "smooth"') &&
      !scrollToTop.includes("behavior: 'smooth'"),
    'ScrollToTop should avoid smooth scrolling when reduced motion is requested.'
  );
  assert(
    hero.includes('const scrollToLearningPaths =') &&
      footer.includes('const scrollToSection =') &&
      explore.includes('const prefersReducedMotion = usePrefersReducedMotion();'),
    'Home scroll entry points should centralize their reduced-motion aware scroll behavior.'
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

function assertPythonFoundationSupportUsesQualityBar() {
  const foundationSupport = read('src/components/PythonFoundationSupport.jsx');

  assert(
    foundationSupport.includes("import LessonQualityBar from './LessonQualityBar';") &&
      foundationSupport.includes('<LessonQualityBar') &&
      foundationSupport.includes('goals={support.quality.goals}') &&
      foundationSupport.includes('deliverables={support.quality.deliverables}') &&
      foundationSupport.includes('checks={support.quality.checks}') &&
      foundationSupport.includes('accent={support.quality.accent}'),
    'PythonFoundationSupport should render the shared quality bar from foundation support data.'
  );
}

function assertLessonQualityBarSupportsCourseAccents() {
  const qualityBar = read('src/components/LessonQualityBar.jsx');
  const styleMatch = qualityBar.match(/const accentStyles = \{([\s\S]*?)\n\};/);
  const styleAccents = new Set(
    styleMatch ? [...styleMatch[1].matchAll(/^\s{2}([a-z]+): \{/gm)].map((match) => match[1]) : []
  );
  const flowFiles = [
    'src/data/cppLevelFlow.js',
    'src/data/cppL1CourseFlow.js',
    'src/data/cppL2CourseFlow.js',
    'src/data/cppL3CourseFlow.js',
    'src/data/cppL4CourseFlow.js',
    'src/data/cppL5CourseFlow.js',
    'src/data/cppL6CourseFlow.js',
    'src/data/pythonFoundationFlow.js',
    'src/data/pythonProjectFlow.js',
  ];
  const requiredAccents = new Set(
    flowFiles.flatMap((file) => [...read(file).matchAll(/accent: '([^']+)'/g)].map((match) => match[1]))
  );

  for (const accent of requiredAccents) {
    assert(
      styleAccents.has(accent),
      `LessonQualityBar should define an explicit ${accent} accent style.`
    );
  }
}

function assertLessonQualityBarKeepsLearningLoop() {
  const qualityBar = read('src/components/LessonQualityBar.jsx');

  assert(
    qualityBar.includes('今日学习闭环') &&
      qualityBar.includes('马上动手') &&
      qualityBar.includes('做完立刻检查'),
    'LessonQualityBar should keep the short goal -> evidence -> immediate feedback learning loop.'
  );
}

function assertLessonNextStepsKeepsErrorDiagnosis() {
  const nextSteps = read('src/components/LessonNextSteps.jsx');

  assert(
    nextSteps.includes('错因诊断') &&
      nextSteps.includes('复现') &&
      nextSteps.includes('定位') &&
      nextSteps.includes('验证') &&
      nextSteps.includes('正常、边界、特殊三组样例'),
    'LessonNextSteps should teach students to diagnose mistakes with reproduce -> locate -> verify prompts.'
  );
}

function assertCppLoopLessonKeepsExecutionTrace() {
  const lesson = read('src/lessons/cpp/l1/Lesson9.jsx');

  assert(
    lesson.includes('CodeTracer') &&
      lesson.includes('陷阱追踪器：循环结束时 i 到底是多少？') &&
      lesson.includes('再次判断 10 < 10 为假') &&
      lesson.includes('N + i = 9 + 10 = 19'),
    'C++ L1 lesson 9 should keep the step-by-step execution trace for the for-loop boundary trap.'
  );
}

function assertCppPredictCheckKeepsLearningLoop() {
  const shell = read('src/lessons/cpp/CppLessonShell.jsx');

  assert(
    shell.includes('export function PredictCheck') &&
      shell.includes('先预测，再验证') &&
      shell.includes('常见错因') &&
      shell.includes('再试一次'),
    'CppLessonShell should export a reusable PredictCheck component for prediction -> feedback -> misconception learning loops.'
  );
  assert(
    shell.includes("current.action ?? '下一步'") &&
      !shell.includes("steps[safeStep + 1]?.action ?? '下一步'"),
    'CppLessonShell CodeTracer should use the current step action so button labels match the next student action.'
  );
  assert(
    shell.includes('export function MasteryCheck') &&
      shell.includes('离开前过关检查') &&
      shell.includes('能预测、能改错、能换一个例子再做') &&
      shell.includes('可以进入下一课') &&
      shell.includes('if (ready)') &&
      shell.includes('recordLessonMastered(location.pathname)') &&
      shell.includes('scrollRef.current?.scrollTo({ top: 0 })'),
    'CppLessonShell should export a reusable MasteryCheck component for lightweight before-next-lesson checks.'
  );
}

function assertLegacyCppLessonShellKeepsLearningProgressAccurate() {
  const shell = read('src/lessons/cpp/LegacyCppLessonShell.jsx');

  assert(
    shell.includes("import { recordLessonVisit } from '../../utils/lessonProgress'") &&
      !shell.includes('recordLessonMastered') &&
      shell.includes('scrollRef.current?.scrollTo({ top: 0 })') &&
      shell.includes('setActiveSection(sections[currentIndex + 1].id)') &&
      shell.includes('setActiveSection(sections[currentIndex - 1].id)'),
    'LegacyCppLessonShell should track visits without granting mastery, reset content scroll, and navigate by section order.'
  );
}

function assertCppLessonsKeepPredictionChecks() {
  const loopLesson = read('src/lessons/cpp/l1/Lesson9.jsx');
  const arrayLesson = read('src/lessons/cpp/l2/Lesson12.jsx');
  const bubbleLesson = read('src/lessons/cpp/l4/Lesson9.jsx');

  assert(
    loopLesson.includes('ForLoopPredictionChecks') &&
      loopLesson.includes('for (i = 1; i < 10; i++) 结束后') &&
      loopLesson.includes('把最后一次执行的 i 值，当成循环结束后的 i 值') &&
      loopLesson.includes('for (int i = 0; i < 5; i++) 最后一次进入循环体时 i 是多少？'),
    'C++ L1 lesson 9 should keep for-loop prediction checks for execution count and final i traps.'
  );
  assert(
    arrayLesson.includes('ArrayPredictionChecks') &&
      arrayLesson.includes('访问 a[5] 合法吗？') &&
      arrayLesson.includes('i < n') &&
      arrayLesson.includes('mx 一定可以先写成 0 吗？') &&
      arrayLesson.includes('把元素个数和最大合法下标混了'),
    'C++ L2 lesson 12 should keep array prediction checks for bounds, traversal condition, and max initialization.'
  );
  assert(
    bubbleLesson.includes('BubblePredictionChecks') &&
      bubbleLesson.includes('做完第一轮冒泡后，谁会归位？') &&
      bubbleLesson.includes('为什么内层边界是 j < n - 1 - i？') &&
      bubbleLesson.includes('什么时候需要交换 a[j] 和 a[j+1]？') &&
      bubbleLesson.includes('以为第一轮会排好所有数'),
    'C++ L4 lesson 9 should keep bubble-sort prediction checks for pass outcome, shrinking bounds, and swap condition.'
  );
  assert(
    loopLesson.includes('forLoopMasteryItems') &&
      loopLesson.includes('C++ L1-9 for 循环离开前检查') &&
      loopLesson.includes('能手推循环结束后 i 的值') &&
      loopLesson.includes('把“最后一次进入”和“循环结束后”分成两列写') &&
      loopLesson.includes('nextLessonPath="/lesson/1/10"'),
    'C++ L1 lesson 9 should keep the before-next-lesson mastery check for loop boundaries.'
  );
  assert(
    arrayLesson.includes('arrayMasteryItems') &&
      arrayLesson.includes('数组课离开前检查') &&
      arrayLesson.includes('能手推一次遍历表') &&
      arrayLesson.includes('能把求和模板迁移到计数或最大值题'),
    'C++ L2 lesson 12 should keep the before-next-lesson mastery check for array bounds and transfer.'
  );
  assert(
    bubbleLesson.includes('bubbleMasteryItems') &&
      bubbleLesson.includes('冒泡排序离开前检查') &&
      bubbleLesson.includes('能手推第一轮冒泡') &&
      bubbleLesson.includes('能把升序冒泡改成降序冒泡'),
    'C++ L4 lesson 9 should keep the before-next-lesson mastery check for bubble-sort transfer.'
  );
}

function assertCppLevel1IntroLessonsKeepMasteryChecks() {
  const lessons = [
    {
      path: 'src/lessons/cpp/l1/Lesson1.jsx',
      title: 'C++ L1-1 你好计算机离开前检查',
      concepts: ['输入设备和输出设备', 'ENIAC 使用电子管', '冯·诺依曼体系结构', '#include、main、cout、分号'],
      nextPath: '/lesson/1/2',
      message: 'C++ L1 lesson 1 should keep a mastery check for input/output devices, computing history, C++ skeleton, and Hello World errors.',
    },
    {
      path: 'src/lessons/cpp/l1/Lesson2.jsx',
      title: 'C++ L1-2 变量与数据离开前检查',
      concepts: ['带名字的数据盒子', '类型、变量名、赋值号、初始值和分号', '空格/减号', 'apple + pen'],
      nextPath: '/lesson/1/3',
      message: 'C++ L1 lesson 2 should keep a mastery check for variable definition, naming rules, identifier traps, and simple output transfer.',
    },
    {
      path: 'src/lessons/cpp/l1/Lesson3.jsx',
      title: 'C++ L1-3 数字的魔法离开前检查',
      concepts: ['int 和 double', '整数除法', '5.0 / 2', '3 - 3 * 3 / 5'],
      nextPath: '/lesson/1/4',
      message: 'C++ L1 lesson 3 should keep a mastery check for numeric types, integer division, decimal-preserving division, and expression tracing.',
    },
    {
      path: 'src/lessons/cpp/l1/Lesson4.jsx',
      title: 'C++ L1-4 余数的妙用离开前检查',
      concepts: ['/ 求商和 % 求余数', '17 / 5', '生活问题翻译成商和余数', 'n % 2 == 0'],
      nextPath: '/lesson/1/5',
      message: 'C++ L1 lesson 4 should keep a mastery check for quotient/remainder meaning, life translation, priority tracing, and parity checks.',
    },
    {
      path: 'src/lessons/cpp/l1/Lesson5.jsx',
      title: 'C++ L1-5 字符与 ASCII 离开前检查',
      concepts: ['单引号字符和双引号字符串', 'ASCII 编码', '小写转大写', 'bool、true、false 和 0/1'],
      nextPath: '/lesson/1/6',
      message: 'C++ L1 lesson 5 should keep a mastery check for char/string differences, ASCII, char arithmetic, and bool output.',
    },
    {
      path: 'src/lessons/cpp/l1/Lesson6.jsx',
      title: 'C++ L1-6 逻辑运算离开前检查',
      concepts: ['&&、||、!', '只有 0 是 false', 'x > 1 && x < 10', '含逻辑运算的表达式'],
      nextPath: '/lesson/1/7',
      message: 'C++ L1 lesson 6 should keep a mastery check for logical operators, truthiness, chained-comparison traps, and expression tracing.',
    },
    {
      path: 'src/lessons/cpp/l1/Lesson7.jsx',
      title: 'C++ L1-7 条件判断离开前检查',
      concepts: ['if 和 else 的分工', 'if (条件);', '==、!=、>、>=、<、<=', 'n % 2 == 0'],
      nextPath: '/lesson/1/8',
      message: 'C++ L1 lesson 7 should keep a mastery check for if/else flow, semicolon traps, comparison operators, and parity branching.',
    },
    {
      path: 'src/lessons/cpp/l1/Lesson8.jsx',
      title: 'C++ L1-8 多重选择结构离开前检查',
      concepts: ['if / else if / else 的顺序', '只会命中第一个成立分支', '被 3 整除', '互斥且有兜底'],
      nextPath: '/lesson/1/9',
      message: 'C++ L1 lesson 8 should keep a mastery check for else-if order, first-match behavior, ordering traps, and exhaustive categorization.',
    },
  ];

  for (const lesson of lessons) {
    const text = read(lesson.path);
    assert(
      text.includes('MasteryCheck') &&
        text.includes(lesson.title) &&
        lesson.concepts.every((concept) => text.includes(concept)),
      lesson.message
    );
    assert(
      text.includes(`navigate('${lesson.nextPath}')`) || text.includes(`nextLessonPath="${lesson.nextPath}"`),
      `${lesson.path}: should keep the next lesson route ${lesson.nextPath}.`
    );
  }
}

function assertCppWhileLessonKeepsDigitTrace() {
  const lesson = read('src/lessons/cpp/l1/Lesson10.jsx');

  assert(
    lesson.includes('CodeTracer') &&
      lesson.includes('数位分离追踪器：n 怎样一位一位消失？') &&
      lesson.includes('再次判断 0 > 0 为假') &&
      lesson.includes('123 一共有 3 位'),
    'C++ L1 lesson 10 should keep the step-by-step digit-splitting trace for while-loop state changes.'
  );
  assert(
    lesson.includes('MasteryCheck') &&
      lesson.includes('C++ L1-10 while 循环离开前检查') &&
      lesson.includes('能说清 while 是先判断再执行') &&
      lesson.includes('能指出循环变量必须变化') &&
      lesson.includes('能手推数位分离过程') &&
      lesson.includes('能判断什么时候用 while 而不是 for') &&
      lesson.includes('nextLessonPath="/lesson/1/11"'),
    'C++ L1 lesson 10 should keep a mastery check for while flow, loop progress, digit splitting, and while-vs-for choice.'
  );
}

function assertCppNestedLoopLessonKeepsExecutionTrace() {
  const lesson = read('src/lessons/cpp/l1/Lesson12.jsx');

  assert(
    lesson.includes('CodeTracer') &&
      lesson.includes('嵌套循环追踪器：外层定一行，内层跑全套') &&
      lesson.includes('j 会重新初始化为 1') &&
      lesson.includes('再次判断 4 <= 3 为假') &&
      lesson.includes('输出顺序：1-1 1-2 1-3 1-4'),
    'C++ L1 lesson 12 should keep the step-by-step nested-loop trace for outer/inner loop execution order.'
  );
  assert(
    lesson.includes('MasteryCheck') &&
      lesson.includes('C++ L1-12 嵌套循环离开前检查') &&
      lesson.includes('能说清外层循环和内层循环各负责什么') &&
      lesson.includes('能手推内层每次都会重新开始') &&
      lesson.includes('能计算双层循环总执行次数') &&
      lesson.includes('能把图形题拆成行数、列数和换行') &&
      (lesson.includes("navigate('/lesson/1/13')") || lesson.includes('nextLessonPath="/lesson/1/13"')),
    'C++ L1 lesson 12 should keep a mastery check for nested loop roles, inner-loop reset, execution counts, and pattern decomposition.'
  );
}

function assertCppBreakContinueLessonKeepsMasteryCheck() {
  const lesson = read('src/lessons/cpp/l1/Lesson11.jsx');

  assert(
    lesson.includes('MasteryCheck') &&
      lesson.includes('C++ L1-11 break 和 continue 离开前检查') &&
      lesson.includes('能区分 break 和 continue') &&
      lesson.includes('能手推 continue 后下一步去哪') &&
      lesson.includes('能判断 break 在嵌套循环里只跳出一层') &&
      lesson.includes('能手推含 break/continue 的输出') &&
      lesson.includes('nextLessonPath="/lesson/1/12"'),
    'C++ L1 lesson 11 should keep a mastery check for break/continue differences, continue flow, nested break scope, and output tracing.'
  );
}

function assertCppLevel1FinalLessonsKeepMasteryChecks() {
  const lessons = [
    {
      path: 'src/lessons/cpp/l1/Lesson13.jsx',
      title: 'C++ L1-13 数学与取模综合离开前检查',
      concepts: ['能用 % 判断倍数和个位', '能写出完整闰年条件', '能把 && 和 || 用在分类条件里', '能把数学规则改写成程序判断'],
      nextPath: '/lesson/1/14',
      message: 'C++ L1 lesson 13 should keep a mastery check for modulo math, leap years, logical composition, and rule-to-code translation.',
    },
    {
      path: 'src/lessons/cpp/l1/Lesson14.jsx',
      title: 'C++ L1-14 模拟题离开前检查',
      concepts: ['能把模拟题拆成输入、状态、规则三部分', '能逐步更新变量而不是凭感觉算答案', '能处理条件分支对状态的影响', '能用取模解决周期模拟'],
      nextPath: '/lesson/1/15',
      message: 'C++ L1 lesson 14 should keep a mastery check for simulation inputs, state updates, branch effects, and cyclic modulo modeling.',
    },
    {
      path: 'src/lessons/cpp/l1/Lesson15.jsx',
      title: 'C++ L1-15 计数与筛选离开前检查',
      concepts: ['能先初始化计数器', '能写出“遍历每个候选”的循环', '能把筛选条件放进 if', '能手推计数变量最终值'],
      nextPath: '/lesson/1/16',
      message: 'C++ L1 lesson 15 should keep a mastery check for counter initialization, candidate traversal, filter conditions, and count tracing.',
    },
    {
      path: 'src/lessons/cpp/l1/Lesson16.jsx',
      title: 'C++ L1-16 一级总复习离开前检查',
      concepts: ['能审题后先列变量和类型', '能按优先级手推综合表达式', '能选择合适的分支或循环结构', '能用样例和边界值自查答案'],
      nextPath: '/',
      message: 'C++ L1 lesson 16 should keep a final mastery check for variable modeling, expression tracing, control-flow choice, and boundary testing.',
    },
  ];

  for (const lesson of lessons) {
    const text = read(lesson.path);
    assert(
      text.includes('MasteryCheck') &&
        text.includes(lesson.title) &&
        lesson.concepts.every((concept) => text.includes(concept)),
      lesson.message
    );
    assert(
      text.includes(`navigate('${lesson.nextPath}')`) || text.includes(`nextLessonPath="${lesson.nextPath}"`),
      `${lesson.path}: should keep the next route ${lesson.nextPath}.`
    );
  }
}

function assertCppArrayLessonKeepsTraversalTrace() {
  const lesson = read('src/lessons/cpp/l2/Lesson12.jsx');

  assert(
    lesson.includes('CodeTracer') &&
      lesson.includes('数组遍历追踪器：每次只访问一个合法下标') &&
      lesson.includes('再次判断 5 < 5 为假') &&
      lesson.includes('不能访问 a[5]') &&
      lesson.includes('sum = 400, mx = 95'),
    'C++ L2 lesson 12 should keep the step-by-step array traversal trace for index bounds, sum, and max updates.'
  );
}

function assertCppBubbleSortLessonKeepsExecutionTrace() {
  const lesson = read('src/lessons/cpp/l4/Lesson9.jsx');

  assert(
    lesson.includes('CodeTracer') &&
      lesson.includes('冒泡排序追踪器：相邻比较，把最大值送到右侧') &&
      lesson.includes('前大后小，需要交换') &&
      lesson.includes('已经在右侧归位') &&
      lesson.includes('const startArray = [5, 1, 4, 2, 8]') &&
      lesson.includes('output: `排序完成：${formatArray(arr)}`'),
    'C++ L4 lesson 9 should keep the step-by-step bubble-sort trace for adjacent comparisons, swaps, and sorted suffixes.'
  );
}

function assertPythonProjectSupportUsesPrerequisites() {
  const projectSupport = read('src/components/PythonProjectSupport.jsx');

  assert(
    projectSupport.includes('support.prerequisiteLinks') &&
      projectSupport.includes('建议先复习') &&
      projectSupport.includes("import { Link } from 'react-router-dom';") &&
      projectSupport.includes('BookOpenCheck'),
    'PythonProjectSupport should surface project-specific prerequisite review links.'
  );
}

function assertPythonSortingProjectKeepsBubbleTrace() {
  const project = read('src/courses/python/advanced/PythonSortingProject.jsx');
  const data = read('src/courses/python/advanced/sortingProjectData.js');
  const source = `${project}\n${data}`;

  assert(
    source.includes('PyCodeTracer') &&
      source.includes('Python 冒泡追踪器：相邻比较，右侧逐轮归位') &&
      source.includes('前大后小，交换') &&
      source.includes('已经在右侧归位') &&
      source.includes('排序完成：${formatPythonList(numbers)}'),
    'Python sorting project should keep the step-by-step bubble-sort trace for adjacent comparisons, swaps, and sorted suffixes.'
  );
}

function assertPythonFoundationListKeepsIndexTrace() {
  const lesson = read('src/courses/python/foundation/PythonFoundation3.jsx');

  assert(
    lesson.includes('PyCodeTracer') &&
      lesson.includes('列表下标追踪器：从 0 开始，越界会报错') &&
      lesson.includes('items[-1]') &&
      lesson.includes('IndexError') &&
      lesson.includes('first = 剑, last = 地图, len = 3'),
    'Python foundation F3 should keep the step-by-step list index trace for zero-based indexes, negative indexes, and IndexError.'
  );
}

function assertPythonFoundationListKeepsFocusedPracticeFlow() {
  const lesson = read('src/courses/python/foundation/PythonFoundation3.jsx');

  assert(
    lesson.includes('listFocusModes') &&
      lesson.includes('别一次打开所有工具，按三步走') &&
      lesson.includes('1 先读下标') &&
      lesson.includes('2 再改背包') &&
      lesson.includes('3 最后遍历') &&
      lesson.includes("focusMode === 'modify'") &&
      lesson.includes("focusMode === 'loop'") &&
      lesson.includes('过关信号'),
    'Python foundation F3 list playground should keep the focused three-step practice flow to reduce cognitive load.'
  );
}

function assertPythonFoundationGridKeepsRowColumnTrace() {
  const lesson = read('src/courses/python/foundation/PythonFoundation3.jsx');

  assert(
    lesson.includes('Grid2DTraceCard') &&
      lesson.includes('二维列表追踪器：先选行，再选列') &&
      lesson.includes('grid[1][2]') &&
      lesson.includes('先拿到这一行，再从这一行里取第 2 列') &&
      lesson.includes('合法行列号都是 0、1、2') &&
      lesson.includes('grid[1][2] = 6；读作第 1 行、第 2 列') &&
      lesson.includes('能用 grid[行][列] 读取二维列表'),
    'Python foundation F3 should keep the 2D-list row/column trace and summary check.'
  );
}

function assertPythonFoundationDictKeepsAccessTrace() {
  const lesson = read('src/courses/python/foundation/PythonFoundation3.jsx');

  assert(
    lesson.includes('DictAccessTraceCard') &&
      lesson.includes('字典访问追踪器：键不存在时，dict[key] 会报错') &&
      lesson.includes('profile.get("job", "未设置")') &&
      lesson.includes('KeyError：字典里没有这个键') &&
      lesson.includes('先用 key in dict 或 get(default) 兜底'),
    'Python foundation F3 should keep the step-by-step dictionary access trace for get defaults and KeyError.'
  );
}

function assertPythonFoundationStringKeepsTraceAndFocusFlow() {
  const lesson = read('src/courses/python/foundation/PythonFoundation3.jsx');

  assert(
    lesson.includes('StringTraceCard') &&
      lesson.includes('字符串追踪器：切片左闭右开，变形会产生新字符串') &&
      lesson.includes('text[1:4]') &&
      lesson.includes('字符串不可变') &&
      lesson.includes('切片是左闭右开；字符串方法通常返回新字符串。') &&
      lesson.includes('stringFocusModes') &&
      lesson.includes('字符串按“位置、查找、变形、拆合”走') &&
      lesson.includes("focusMode === 'slice'") &&
      lesson.includes("focusMode === 'search'") &&
      lesson.includes("focusMode === 'transform'") &&
      lesson.includes("focusMode === 'split'"),
    'Python foundation F3 string slide should keep the step-by-step string trace and focused practice flow.'
  );
}

function assertPythonLessonShellKeepsMasteryCheck() {
  const shell = read('src/courses/python/shell/PythonLessonShell.jsx');

  assert(
    shell.includes('export function MasteryCheck') &&
      shell.includes('离开前过关检查') &&
      shell.includes('能解释、能验证、能换一个例子做') &&
      shell.includes('可以进入下一课') &&
      shell.includes('if (ready)') &&
      shell.includes('recordLessonMastered(location.pathname)') &&
      shell.includes('scrollRef.current?.scrollTo(0, 0)'),
    'PythonLessonShell should export a reusable MasteryCheck component for before-next-lesson checks.'
  );
}

function assertPythonFoundationF3KeepsMasteryCheck() {
  const lesson = read('src/courses/python/foundation/PythonFoundation3.jsx');

  assert(
    lesson.includes('f3MasteryItems') &&
      lesson.includes('F3 数据结构离开前检查') &&
      lesson.includes('能判断什么时候用 list、dict、string 或二维 list') &&
      lesson.includes('能解释下标、key 和切片的不同访问规则') &&
      lesson.includes('能处理越界或找不到键') &&
      lesson.includes('能把一个小任务拆成“读数据、改数据、遍历处理”'),
    'Python foundation F3 should keep the before-next-lesson mastery check for data-structure selection, access rules, errors, and transfer.'
  );
}

function assertPythonFoundationCoreLessonsKeepMasteryChecks() {
  const lessons = [
    {
      path: 'src/courses/python/foundation/PythonFoundation1.jsx',
      title: 'F1 入门基础离开前检查',
      concepts: ['print、input 和变量', '字符串、整数和小数', '/、// 和 %', '括号、引号、拼写和缩进'],
      message: 'Python foundation F1 should keep mastery checks for I/O, variables, types, arithmetic, and basic debugging.',
    },
    {
      path: 'src/courses/python/foundation/PythonFoundation2.jsx',
      title: 'F2 控制流程离开前检查',
      concepts: ['if / elif / else', 'range(start, stop, step)', 'for 和 while', '死循环'],
      message: 'Python foundation F2 should keep mastery checks for branching, range, loop choice, and infinite-loop diagnosis.',
    },
    {
      path: 'src/courses/python/foundation/PythonFoundation4.jsx',
      title: 'F4 函数与异常离开前检查',
      concepts: ['重复代码改成函数', 'print 是展示，return 是交回结果', '变量在函数里面还是外面有效', 'try / except'],
      message: 'Python foundation F4 should keep mastery checks for function extraction, return values, scope, and error handling.',
    },
    {
      path: 'src/courses/python/foundation/PythonFoundation5.jsx',
      title: 'F5 turtle 绘图离开前检查',
      concepts: ['forward 和 right', 'for 循环', 'penup()', '图形变体'],
      message: 'Python foundation F5 should keep mastery checks for turtle movement, loops, pen state, and visual transfer.',
    },
    {
      path: 'src/courses/python/foundation/PythonFoundation6.jsx',
      title: 'F6 随机世界离开前检查',
      concepts: ['import random', 'randint(a, b)', 'shuffle 原地改列表并返回 None', '随机规则'],
      message: 'Python foundation F6 should keep mastery checks for random APIs, boundaries, return values, and playful transfer.',
    },
    {
      path: 'src/courses/python/foundation/PythonFoundation7.jsx',
      title: 'F7 集合宝藏离开前检查',
      concepts: ['唯一、无序、不能用下标访问', 'list(set(data))', 'name in seen', 'A | B、A & B、A - B'],
      message: 'Python foundation F7 should keep mastery checks for set traits, deduplication, membership, and set operations.',
    },
  ];

  for (const lesson of lessons) {
    const text = read(lesson.path);
    assert(
      text.includes('MasteryCheck') &&
        text.includes(lesson.title) &&
        lesson.concepts.every((concept) => text.includes(concept)),
      lesson.message
    );
  }
}

function assertPythonBridgeKeepsProjectReadinessCheck() {
  const bridge = read('src/courses/python/foundation/PythonBridge.jsx');
  const foundationFlow = read('src/data/pythonFoundationFlow.js');

  assert(
    bridge.includes('bridgeMasteryItems') &&
      bridge.includes('项目线入口离开前检查') &&
      bridge.includes('输入、状态、循环、判断、输出') &&
      bridge.includes('F1-F7') &&
      bridge.includes('answer=42、guess=30') &&
      bridge.includes('限制最多猜 7 次') &&
      bridge.includes('def make_hint') &&
      bridge.includes('F5 的状态变化直觉') &&
      bridge.includes('F7 的去重和成员判断'),
    'Python bridge should keep a concrete before-project readiness check that proves decomposition, transfer, loop tracing, and project extension.'
  );
  assert(
    foundationFlow.includes("label: '进入桥梁课：猜数字大冒险', path: '/python/bridge'") &&
      !foundationFlow.includes("label: '进入 A1：算法思维入门', path: '/python/a1'"),
    'Python F7 support links should route students through the bridge lesson before A1.'
  );
}

function assertPythonProjectsKeepMasteryChecks() {
  const projects = [
    {
      path: 'src/courses/python/advanced/PythonAdvanced1.jsx',
      title: 'A1 算法思维项目过关检查',
      concepts: ['输入、过程、输出', '枚举、贪心、递归', '递归一定要有终止条件', '最小代码实验'],
      message: 'Python A1 should keep a project mastery check for decomposition, strategy choice, recursion base cases, and minimal experiments.',
    },
    {
      path: 'src/courses/python/advanced/BinarySearchProject.jsx',
      title: 'A2 二分搜索项目过关检查',
      concepts: ['数据有序', 'low、high、mid', '找到、偏小、偏大、找不到', '三组边界样例'],
      message: 'Python binary-search project should keep a mastery check for sorted preconditions, boundary updates, miss cases, and edge tests.',
    },
    {
      path: 'src/courses/python/advanced/PythonSortingProject.jsx',
      supportPath: 'src/courses/python/advanced/sortingProjectData.js',
      title: 'A3 排序算法项目过关检查',
      concepts: ['O(n²)', '元素不丢、不多、不乱改', 'O(n log n)', '外层循环和内层比较'],
      message: 'Python sorting project should keep a mastery check for process tracing, test cases, complexity comparison, and loop explanation.',
    },
    {
      path: 'src/courses/python/advanced/PythonEncryptionProject.jsx',
      title: 'A4 加密解密项目过关检查',
      concepts: ['ord / chr', '大小写、非字母和边界回绕', '加密和解密是可逆', '凯撒密码为什么只是学习工具'],
      nextPath: '/python/morse',
      requiresDarkMasteryCheck: true,
      message: 'Python encryption project should keep a mastery check for character encoding, edge cases, reversibility, and security limits.',
    },
    {
      path: 'src/courses/python/advanced/PythonMorseProject.jsx',
      title: 'A5 摩斯电码项目过关检查',
      concepts: ['字符到摩斯码的映射', '大小写、空格和未知字符', '字典翻转', '双向转换'],
      nextPath: '/python/file-ops',
      requiresDarkMasteryCheck: true,
      message: 'Python Morse project should keep a mastery check for dictionary mapping, unknown characters, reverse lookup, and round-trip verification.',
    },
    {
      path: 'src/courses/python/advanced/PythonFileOps.jsx',
      title: 'A6 文件操作项目过关检查',
      concepts: ['r、w、a 三种打开模式', 'with open', 'FileNotFoundError', '保存成可复盘的文本文件'],
      nextPath: '/python/a2',
      message: 'Python file-ops project should keep a mastery check for modes, safe with-open usage, file errors, and saved artifacts.',
    },
    {
      path: 'src/courses/python/advanced/PythonAdvanced2.jsx',
      title: 'A7 2048 游戏项目过关检查',
      concepts: ['二维列表表示 2048 棋盘', '压缩、合并、再压缩', '旋转或转置', '满盘、可合并、不可移动、移动后生成新块'],
      nextPath: '/python/ai',
      message: 'Python 2048 project should keep a mastery check for board representation, move decomposition, direction reuse, and rule tests.',
    },
    {
      path: 'src/courses/python/advanced/PythonAI.jsx',
      title: 'A8 AI 初探项目过关检查',
      concepts: ['AI 不是魔法', '最近的 K 个邻居', '分类、回归和神经网络', '数据偏差'],
      nextPath: '/python/crawler',
      requiresDarkMasteryCheck: true,
      message: 'Python AI project should keep a mastery check for data-model reasoning, KNN, task types, and bias risk.',
    },
    {
      path: 'src/courses/python/advanced/PythonCrawler.jsx',
      title: 'A9 网络爬虫项目过关检查',
      concepts: ['请求、响应和状态码', 'robots、频率和公开数据边界', '请求、解析、清洗和存储', '空结果、分页和异常情况'],
      nextPath: '/',
      requiresDarkMasteryCheck: true,
      message: 'Python crawler project should keep a mastery check for HTTP states, crawling boundaries, pipeline decomposition, and failure handling.',
    },
  ];

  for (const project of projects) {
    const text = [project.path, project.supportPath].filter(Boolean).map(read).join('\n');
    assert(
      text.includes('MasteryCheck') &&
        text.includes("title: '项目过关'") &&
        text.includes(project.title) &&
        project.concepts.every((concept) => text.includes(concept)),
      project.message
    );
    if (project.nextPath) {
      assert(
        text.includes(`nextPath="${project.nextPath}"`),
        `${project.path}: project mastery check should keep the next lesson route ${project.nextPath}.`
      );
    }
    if (project.requiresDarkMasteryCheck) {
      assert(
        text.includes('theme="dark"') &&
          /<MasteryCheck[\s\S]*?theme="dark"[\s\S]*?items=/.test(text),
        `${project.path}: dark project pages should keep a dark-themed MasteryCheck.`
      );
    }
  }
}

function assertPyCodeTracerKeepsClearFinalActionLabel() {
  const tracer = read('src/components/PyCodeTracer.jsx');

  assert(
    tracer.includes("current.action ?? '下一步'"),
    'PyCodeTracer should use the current step action so each transition keeps a clear button label.'
  );
}

function assertCppLessonShellSupportsLessonSupport() {
  const shell = read('src/lessons/cpp/CppLessonShell.jsx');

  assert(
    shell.includes('topSupport = null') &&
      shell.includes('bottomSupport = null') &&
      shell.includes('{topSupport}') &&
      shell.includes('isLast && bottomSupport'),
    'CppLessonShell should render optional top and bottom lesson support slots.'
  );
}

function assertSameNumber(label, actual, expected) {
  assert(actual === expected, `${label} mismatch. expected ${expected}, got ${actual}`);
}

async function main() {
  const [
    { getCppLevelSupport },
    { getCppL1LessonSupport },
    { getCppL2LessonSupport },
    { getCppL3LessonSupport },
    { getCppL4LessonSupport },
    { getCppL5LessonSupport },
    { getCppL6LessonSupport },
    { paperIds, paperMeta },
    { paperStats },
    { pythonFoundationLessons, getPythonFoundationSupport },
    { pythonProjects, getPythonProjectSupport, GENERIC_PREREQUISITE_FOCUS },
  ] = await Promise.all([
    import(pathToFileURL(path.join(srcRoot, 'data', 'cppLevelFlow.js')).href),
    import(pathToFileURL(path.join(srcRoot, 'data', 'cppL1CourseFlow.js')).href),
    import(pathToFileURL(path.join(srcRoot, 'data', 'cppL2CourseFlow.js')).href),
    import(pathToFileURL(path.join(srcRoot, 'data', 'cppL3CourseFlow.js')).href),
    import(pathToFileURL(path.join(srcRoot, 'data', 'cppL4CourseFlow.js')).href),
    import(pathToFileURL(path.join(srcRoot, 'data', 'cppL5CourseFlow.js')).href),
    import(pathToFileURL(path.join(srcRoot, 'data', 'cppL6CourseFlow.js')).href),
    import(pathToFileURL(path.join(srcRoot, 'data', 'gesp', '_generated.js')).href),
    import(pathToFileURL(path.join(srcRoot, 'data', 'gesp', '_stats.js')).href),
    import(pathToFileURL(path.join(srcRoot, 'data', 'pythonFoundationFlow.js')).href),
    import(pathToFileURL(path.join(srcRoot, 'data', 'pythonProjectFlow.js')).href),
  ]);

  assertCatalogSubjectCopy();
  assertHeroUsesPaperStats();
  assertTheLabUsesMotionPreference();
  assertLoadingScreenUsesMotionPreference();
  assertNavigationRespectsMotionPreference();
  assertHomeScrollControlsRespectMotionPreference();
  assertQuestionBankReviewCopy();
  assertLearningPathsUseSharedData();
  assertFooterUsesSharedData();
  assertAnnouncementUsesSharedData();
  assertNotFoundUsesSharedData();
  assertPythonFoundationSupportUsesQualityBar();
  assertLessonQualityBarSupportsCourseAccents();
  assertLessonQualityBarKeepsLearningLoop();
  assertLessonNextStepsKeepsErrorDiagnosis();
  assertCppLoopLessonKeepsExecutionTrace();
  assertCppPredictCheckKeepsLearningLoop();
  assertLegacyCppLessonShellKeepsLearningProgressAccurate();
  assertCppLessonsKeepPredictionChecks();
  assertCppLevel1IntroLessonsKeepMasteryChecks();
  assertCppWhileLessonKeepsDigitTrace();
  assertCppBreakContinueLessonKeepsMasteryCheck();
  assertCppNestedLoopLessonKeepsExecutionTrace();
  assertCppLevel1FinalLessonsKeepMasteryChecks();
  assertCppArrayLessonKeepsTraversalTrace();
  assertCppBubbleSortLessonKeepsExecutionTrace();
  assertPythonProjectSupportUsesPrerequisites();
  assertPythonSortingProjectKeepsBubbleTrace();
  assertPythonFoundationListKeepsIndexTrace();
  assertPythonFoundationListKeepsFocusedPracticeFlow();
  assertPythonFoundationGridKeepsRowColumnTrace();
  assertPythonFoundationDictKeepsAccessTrace();
  assertPythonFoundationStringKeepsTraceAndFocusFlow();
  assertPythonLessonShellKeepsMasteryCheck();
  assertPythonFoundationCoreLessonsKeepMasteryChecks();
  assertPythonFoundationF3KeepsMasteryCheck();
  assertPythonBridgeKeepsProjectReadinessCheck();
  assertPythonProjectsKeepMasteryChecks();
  assertPyCodeTracerKeepsClearFinalActionLabel();
  assertCppLessonShellSupportsLessonSupport();

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

  assertFeaturedProjectsUseSharedData();

  assertLearningPathRoute('gesp', '/question-bank');

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
    assert(support.readiness?.length >= 3, `C++ level ${level} needs at least 3 readiness checks.`);
    assert(
      support.readiness?.every((item) => item.label?.length >= 4 && item.focus?.length >= 16),
      `C++ level ${level} readiness checks need concrete labels and focus text.`
    );
    assert(
      new Set(support.readiness?.map((item) => item.label)).size === support.readiness?.length,
      `C++ level ${level} readiness check labels should be unique.`
    );
    assert(support.practiceLinks?.length >= 1, `C++ level ${level} needs practice links.`);
    assertPracticeLinksResolve(`C++ level ${level}`, support.practiceLinks, paperIds);
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
    assertPracticeLinksResolve(`C++ L1 lesson ${lesson}`, support.practiceLinks, paperIds);
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

  for (let lesson = 1; lesson <= 16; lesson += 1) {
    const support = getCppL2LessonSupport(lesson);
    assert(support?.quality?.goals?.length >= 3, `C++ L2 lesson ${lesson} needs at least 3 goals.`);
    assert(support?.quality?.deliverables?.length >= 3, `C++ L2 lesson ${lesson} needs at least 3 deliverables.`);
    assert(support?.quality?.checks?.length >= 3, `C++ L2 lesson ${lesson} needs at least 3 checks.`);
    assert(support?.practiceLinks?.length >= 1, `C++ L2 lesson ${lesson} needs practice links.`);
    assertPracticeLinksResolve(`C++ L2 lesson ${lesson}`, support.practiceLinks, paperIds);
    assert(support?.reviewTasks?.length >= 2, `C++ L2 lesson ${lesson} needs review tasks.`);
    assert(
      lesson === 1 ? support.previous?.path === '/lesson/1/16' : support.previous?.path === `/lesson/2/${lesson - 1}`,
      `C++ L2 lesson ${lesson} has wrong previous link.`
    );
    assert(
      lesson === 16 ? support.next?.path === '/question-bank' : support.next?.path === `/lesson/2/${lesson + 1}`,
      `C++ L2 lesson ${lesson} has wrong next link.`
    );

    const pagePath = `src/lessons/cpp/l2/Lesson${lesson}.jsx`;
    const page = read(pagePath);
    assert(
      page.includes("import CppL2LessonSupport from '../../../components/CppL2LessonSupport';"),
      `${pagePath}: missing CppL2LessonSupport import.`
    );

    if (lesson <= 4) {
      assert(
        countMatches(page, new RegExp(`CppL2LessonSupport lessonId=\\{${lesson}\\}`, 'g')) >= 2,
        `${pagePath}: should include top and bottom CppL2LessonSupport.`
      );
      assert(
        new RegExp(`CppL2LessonSupport lessonId=\\{${lesson}\\} placement="bottom"`).test(page),
        `${pagePath}: missing bottom CppL2LessonSupport.`
      );
    } else {
      assert(
        new RegExp(`topSupport=\\{<CppL2LessonSupport lessonId=\\{${lesson}\\} />\\}`).test(page),
        `${pagePath}: missing topSupport CppL2LessonSupport.`
      );
      assert(
        new RegExp(`bottomSupport=\\{<CppL2LessonSupport lessonId=\\{${lesson}\\} placement="bottom" />\\}`).test(page),
        `${pagePath}: missing bottomSupport CppL2LessonSupport.`
      );
    }
  }

  for (let lesson = 1; lesson <= 16; lesson += 1) {
    const support = getCppL3LessonSupport(lesson);
    assert(support?.quality?.goals?.length >= 3, `C++ L3 lesson ${lesson} needs at least 3 goals.`);
    assert(support?.quality?.deliverables?.length >= 3, `C++ L3 lesson ${lesson} needs at least 3 deliverables.`);
    assert(support?.quality?.checks?.length >= 3, `C++ L3 lesson ${lesson} needs at least 3 checks.`);
    assert(support?.practiceLinks?.length >= 1, `C++ L3 lesson ${lesson} needs practice links.`);
    assertPracticeLinksResolve(`C++ L3 lesson ${lesson}`, support.practiceLinks, paperIds);
    assert(support?.reviewTasks?.length >= 2, `C++ L3 lesson ${lesson} needs review tasks.`);
    assert(
      lesson === 1 ? support.previous?.path === '/lesson/2/16' : support.previous?.path === `/lesson/3/${lesson - 1}`,
      `C++ L3 lesson ${lesson} has wrong previous link.`
    );
    assert(
      support.next?.path === (lesson === 16 ? '/level3' : `/lesson/3/${lesson + 1}`),
      `C++ L3 lesson ${lesson} has wrong next link.`
    );

    const pagePath = `src/lessons/cpp/l3/Lesson${lesson}.jsx`;
    const page = read(pagePath);
    assert(
      page.includes("import CppL3LessonSupport from '../../../components/CppL3LessonSupport';"),
      `${pagePath}: missing CppL3LessonSupport import.`
    );
    assert(
      new RegExp(`topSupport=\\{<CppL3LessonSupport lessonId=\\{${lesson}\\} />\\}`).test(page),
      `${pagePath}: missing topSupport CppL3LessonSupport.`
    );
    assert(
      new RegExp(`bottomSupport=\\{<CppL3LessonSupport lessonId=\\{${lesson}\\} placement="bottom" />\\}`).test(page),
      `${pagePath}: missing bottomSupport CppL3LessonSupport.`
    );
  }

  for (let lesson = 1; lesson <= 16; lesson += 1) {
    const support = getCppL4LessonSupport(lesson);
    assert(support?.quality?.goals?.length >= 3, `C++ L4 lesson ${lesson} needs at least 3 goals.`);
    assert(support?.quality?.deliverables?.length >= 3, `C++ L4 lesson ${lesson} needs at least 3 deliverables.`);
    assert(support?.quality?.checks?.length >= 3, `C++ L4 lesson ${lesson} needs at least 3 checks.`);
    assert(support?.practiceLinks?.length >= 1, `C++ L4 lesson ${lesson} needs practice links.`);
    assertPracticeLinksResolve(`C++ L4 lesson ${lesson}`, support.practiceLinks, paperIds);
    assert(support?.reviewTasks?.length >= 2, `C++ L4 lesson ${lesson} needs review tasks.`);
    assert(
      support.previous?.path === (lesson === 1 ? '/lesson/3/16' : `/lesson/4/${lesson - 1}`),
      `C++ L4 lesson ${lesson} has wrong previous link.`
    );
    assert(
      support.next?.path === (lesson === 16 ? '/level4' : `/lesson/4/${lesson + 1}`),
      `C++ L4 lesson ${lesson} has wrong next link.`
    );

    const pagePath = `src/lessons/cpp/l4/Lesson${lesson}.jsx`;
    const page = read(pagePath);
    assert(
      page.includes("import CppL4LessonSupport from '../../../components/CppL4LessonSupport';"),
      `${pagePath}: missing CppL4LessonSupport import.`
    );
    assert(
      new RegExp(`topSupport=\\{<CppL4LessonSupport lessonId=\\{${lesson}\\} />\\}`).test(page),
      `${pagePath}: missing topSupport CppL4LessonSupport.`
    );
    assert(
      new RegExp(`bottomSupport=\\{<CppL4LessonSupport lessonId=\\{${lesson}\\} placement="bottom" />\\}`).test(page),
      `${pagePath}: missing bottomSupport CppL4LessonSupport.`
    );
  }

  for (let lesson = 1; lesson <= 16; lesson += 1) {
    const support = getCppL5LessonSupport(lesson);
    assert(support?.quality?.goals?.length >= 3, `C++ L5 lesson ${lesson} needs at least 3 goals.`);
    assert(support?.quality?.deliverables?.length >= 3, `C++ L5 lesson ${lesson} needs at least 3 deliverables.`);
    assert(support?.quality?.checks?.length >= 3, `C++ L5 lesson ${lesson} needs at least 3 checks.`);
    assert(support?.practiceLinks?.length >= 1, `C++ L5 lesson ${lesson} needs practice links.`);
    assertPracticeLinksResolve(`C++ L5 lesson ${lesson}`, support.practiceLinks, paperIds);
    assert(support?.reviewTasks?.length >= 2, `C++ L5 lesson ${lesson} needs review tasks.`);
    assert(
      support.previous?.path === (lesson === 1 ? '/lesson/4/16' : `/lesson/5/${lesson - 1}`),
      `C++ L5 lesson ${lesson} has wrong previous link.`
    );
    assert(
      support.next?.path === (lesson === 16 ? '/level5' : `/lesson/5/${lesson + 1}`),
      `C++ L5 lesson ${lesson} has wrong next link.`
    );

    const pagePath = `src/lessons/cpp/l5/Lesson${lesson}.jsx`;
    const page = read(pagePath);
    assert(
      page.includes("import CppL5LessonSupport from '../../../components/CppL5LessonSupport';"),
      `${pagePath}: missing CppL5LessonSupport import.`
    );
    assert(
      new RegExp(`topSupport=\\{<CppL5LessonSupport lessonId=\\{${lesson}\\} />\\}`).test(page),
      `${pagePath}: missing topSupport CppL5LessonSupport.`
    );
    assert(
      new RegExp(`bottomSupport=\\{<CppL5LessonSupport lessonId=\\{${lesson}\\} placement="bottom" />\\}`).test(page),
      `${pagePath}: missing bottomSupport CppL5LessonSupport.`
    );
  }

  for (let lesson = 1; lesson <= 16; lesson += 1) {
    const support = getCppL6LessonSupport(lesson);
    assert(support?.quality?.goals?.length >= 3, `C++ L6 lesson ${lesson} needs at least 3 goals.`);
    assert(support?.quality?.deliverables?.length >= 3, `C++ L6 lesson ${lesson} needs at least 3 deliverables.`);
    assert(support?.quality?.checks?.length >= 3, `C++ L6 lesson ${lesson} needs at least 3 checks.`);
    assert(support?.practiceLinks?.length >= 1, `C++ L6 lesson ${lesson} needs practice links.`);
    assertPracticeLinksResolve(`C++ L6 lesson ${lesson}`, support.practiceLinks, paperIds);
    assert(support?.reviewTasks?.length >= 2, `C++ L6 lesson ${lesson} needs review tasks.`);
    assert(
      support.previous?.path === (lesson === 1 ? '/level6' : `/lesson/6/${lesson - 1}`),
      `C++ L6 lesson ${lesson} has wrong previous link.`
    );
    assert(
      support.next?.path === (lesson === 16 ? '/level6' : `/lesson/6/${lesson + 1}`),
      `C++ L6 lesson ${lesson} has wrong next link.`
    );

    const pagePath = `src/lessons/cpp/l6/Lesson${lesson}.jsx`;
    const page = read(pagePath);
    assert(
      page.includes("import CppL6LessonSupport from '../../../components/CppL6LessonSupport';"),
      `${pagePath}: missing CppL6LessonSupport import.`
    );
    assert(
      new RegExp(`topSupport=\\{<CppL6LessonSupport lessonId=\\{${lesson}\\} />\\}`).test(page),
      `${pagePath}: missing topSupport CppL6LessonSupport.`
    );
    assert(
      new RegExp(`bottomSupport=\\{<CppL6LessonSupport lessonId=\\{${lesson}\\} placement="bottom" />\\}`).test(page),
      `${pagePath}: missing bottomSupport CppL6LessonSupport.`
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
  const pythonCoursePaths = new Set([
    '/',
    ...pythonFoundationLessons.map((lesson) => lesson.path),
    ...pythonProjects.map((project) => project.path),
  ]);
  const foundationPracticeSignatures = new Set();

  for (const [lessonId, fileName] of foundationPages) {
    const support = getPythonFoundationSupport(lessonId);
    assert(support?.quality?.goals?.length >= 3, `Python foundation ${lessonId} needs at least 3 goals.`);
    assert(support?.quality?.deliverables?.length >= 3, `Python foundation ${lessonId} needs at least 3 deliverables.`);
    assert(support?.quality?.checks?.length >= 3, `Python foundation ${lessonId} needs at least 3 checks.`);
    assert(support?.reviewTasks?.length >= 2, `Python foundation ${lessonId} needs review tasks.`);
    assert(support?.practiceLinks?.length >= 2, `Python foundation ${lessonId} needs targeted practice links.`);
    assert(
      support?.practiceLinks?.every((item) => pythonCoursePaths.has(item.path)),
      `Python foundation ${lessonId} has a practice link outside the Python course map.`
    );
    foundationPracticeSignatures.add(JSON.stringify(support?.practiceLinks?.map((item) => item.path)));

    const pagePath = `src/courses/python/foundation/${fileName}`;
    const page = read(pagePath);
    assert(
      !page.includes("import LessonQualityBar from '../../../components/LessonQualityBar';"),
      `${pagePath}: should derive quality bar through PythonFoundationSupport instead of importing LessonQualityBar directly.`
    );
    assert(
      !page.includes('<LessonQualityBar'),
      `${pagePath}: should not render a second hard-coded LessonQualityBar.`
    );
    assert(
      !page.includes('const lessonQuality ='),
      `${pagePath}: should not keep hard-coded lessonQuality once support data owns the quality checklist.`
    );
    assert(
      countMatches(page, new RegExp(`PythonFoundationSupport lessonId="${lessonId}"`, 'g')) >= 2,
      `${pagePath}: should include top and bottom PythonFoundationSupport.`
    );
    assert(
      new RegExp(`PythonFoundationSupport lessonId="${lessonId}" placement="bottom"`).test(page),
      `${pagePath}: missing bottom PythonFoundationSupport.`
    );
  }
  assert(
    foundationPracticeSignatures.size > 1,
    'Python foundation practice links should be lesson-specific instead of the same generic links for every lesson.'
  );

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
  const projectPracticeSignatures = new Set();

  for (const [projectId, fileName] of projectPages) {
    const support = getPythonProjectSupport(projectId);
    assert(
      projectId !== 'a1' || support?.previous?.path === '/python/bridge',
      'Python project A1 should link back to the bridge lesson as the foundation-to-project bridge.'
    );
    assert(support?.prerequisiteLinks?.length >= 2, `Python project ${projectId} needs at least 2 prerequisite review links.`);
    assert(
      support?.prerequisiteLinks?.every((item) => typeof item.focus === 'string' && item.focus.length >= 12),
      `Python project ${projectId} prerequisite links need project-specific review focus text.`
    );
    assert(
      support?.prerequisiteLinks?.every((item) => item.focus !== GENERIC_PREREQUISITE_FOCUS),
      `Python project ${projectId} prerequisite links should not fall back to generic review focus text.`
    );
    const prerequisitePaths = new Set(support?.prerequisiteLinks?.map((item) => item.path));
    const practicePaths = support?.practiceLinks?.map((item) => item.path) || [];
    assert(
      support?.practiceLinks?.length >= 2,
      `Python project ${projectId} needs project-specific practice links.`
    );
    assert(
      support?.practiceLinks?.every((item) => pythonCoursePaths.has(item.path)),
      `Python project ${projectId} has a practice link outside the Python course map.`
    );
    assert(
      practicePaths.some((itemPath) => !prerequisitePaths.has(itemPath)),
      `Python project ${projectId} practice links should not only repeat prerequisite review lessons.`
    );
    assert(
      JSON.stringify(practicePaths) !== JSON.stringify(support?.prerequisiteLinks?.map((item) => item.path)),
      `Python project ${projectId} practice links should not mirror prerequisite review links.`
    );
    assert(
      projectId === 'crawler' || practicePaths.includes(support?.next?.path),
      `Python project ${projectId} practice links should include the next project path.`
    );
    projectPracticeSignatures.add(JSON.stringify(practicePaths));
    assert(
      !(
        support?.practiceLinks?.length === 1 &&
        support.practiceLinks[0]?.path === '/python/f1'
      ),
      `Python project ${projectId} should not fall back to a single generic F1 review link.`
    );
    if (projectId === 'crawler') {
      const crawlerText = [
        support.brief.audience,
        support.brief.artifact,
        ...support.quality.deliverables,
        ...support.reviewTasks,
      ].join('\n');
      assert(
        !crawlerText.includes('文件操作') && !crawlerText.includes('保存到文本文件'),
        'Python crawler should not require file operations before the A9 file-ops project.'
      );
    }

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
  assert(
    projectPracticeSignatures.size > 1,
    'Python project practice links should be project-specific instead of the same generic links for every project.'
  );

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
