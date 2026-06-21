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

function assertCppLessonShellSupportsLessonSupport() {
  const shell = read('src/lessons/cpp/CppLessonShell.jsx');

  assert(
    shell.includes('topSupport = null') &&
      shell.includes('bottomSupport = null') &&
      shell.includes('{topSupport}') &&
      shell.includes('activeSection === sections.length && bottomSupport'),
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
    { paperIds, paperMeta },
    { paperStats },
    { pythonFoundationLessons, getPythonFoundationSupport },
    { pythonProjects, getPythonProjectSupport },
  ] = await Promise.all([
    import(pathToFileURL(path.join(srcRoot, 'data', 'cppLevelFlow.js')).href),
    import(pathToFileURL(path.join(srcRoot, 'data', 'cppL1CourseFlow.js')).href),
    import(pathToFileURL(path.join(srcRoot, 'data', 'cppL2CourseFlow.js')).href),
    import(pathToFileURL(path.join(srcRoot, 'data', 'cppL3CourseFlow.js')).href),
    import(pathToFileURL(path.join(srcRoot, 'data', 'cppL4CourseFlow.js')).href),
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
  assertPythonProjectSupportUsesPrerequisites();
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
      projectId !== 'a1' || support?.previous?.path === '/python/f7',
      'Python project A1 should link back to Python F7 as the foundation-to-project bridge.'
    );
    assert(support?.prerequisiteLinks?.length >= 2, `Python project ${projectId} needs at least 2 prerequisite review links.`);
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
      projectId === 'file-ops' || practicePaths.includes(support?.next?.path),
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
