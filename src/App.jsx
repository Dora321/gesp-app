import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Eagerly loaded: global components needed on every page
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import RouteSeo from './components/RouteSeo';
import { normalizePathname, PLACEMENT_PATH } from './seo/routeMeta';

// Lazy loaded: route-level pages — only fetched when user navigates to them
const InnovationLesson = lazy(() => import('./pages/InnovationLesson'));
const Home = lazy(() => import('./Home'));
const ComputingMuseum = lazy(() => import('./pages/ComputingMuseum'));
const PlacementQuiz = lazy(() => import('./pages/PlacementQuiz'));
const QuestionBankHome = lazy(() => import('./pages/QuestionBankHome'));
const ExamPaper = lazy(() => import('./pages/ExamPaper'));
const TopicPractice = lazy(() => import('./pages/question-bank/TopicPracticePage'));
const QuestionBankReview = lazy(() => import('./pages/question-bank/ReviewPage'));

// Lesson router — dynamically loads lesson by level + lessonId
const LessonRouter = lazy(() => import('./components/LessonRouter'));
const LegacyLessonRedirect = lazy(() => import('./components/LegacyLessonRedirect'));

// C++ Course Levels
const CourseLevel1 = lazy(() => import('./courses/CourseLevel1'));
const CourseLevel2 = lazy(() => import('./courses/CourseLevel2'));
const CourseLevel3 = lazy(() => import('./courses/CourseLevel3'));
const CourseLevel4 = lazy(() => import('./courses/CourseLevel4'));
const CourseLevel5 = lazy(() => import('./courses/CourseLevel5'));
const CourseLevel6 = lazy(() => import('./courses/CourseLevel6'));
const CourseLevel7 = lazy(() => import('./courses/CourseLevel7'));
const CourseLevel8 = lazy(() => import('./courses/CourseLevel8'));

// GESP special page

// Python Foundation
const PythonFoundation1 = lazy(() => import('./courses/python/foundation/PythonFoundation1'));
const PythonFoundation2 = lazy(() => import('./courses/python/foundation/PythonFoundation2'));
const PythonFoundation3 = lazy(() => import('./courses/python/foundation/PythonFoundation3'));
const PythonFoundation4 = lazy(() => import('./courses/python/foundation/PythonFoundation4'));
const PythonFoundation5 = lazy(() => import('./courses/python/foundation/PythonFoundation5'));
const PythonFoundation6 = lazy(() => import('./courses/python/foundation/PythonFoundation6'));
const PythonFoundation7 = lazy(() => import('./courses/python/foundation/PythonFoundation7'));
const PythonBridge = lazy(() => import('./courses/python/foundation/PythonBridge'));

// Python Advanced
const PythonAdvanced1 = lazy(() => import('./courses/python/advanced/PythonAdvanced1'));
const PythonAdvanced2 = lazy(() => import('./courses/python/advanced/PythonAdvanced2'));
const PythonFileOps = lazy(() => import('./courses/python/advanced/PythonFileOps'));
const PythonAI = lazy(() => import('./courses/python/advanced/PythonAI'));
const PythonCrawler = lazy(() => import('./courses/python/advanced/PythonCrawler'));
const BinarySearchProject = lazy(() => import('./courses/python/advanced/BinarySearchProject'));
const PythonEncryptionProject = lazy(() => import('./courses/python/advanced/PythonEncryptionProject'));
const PythonSortingProject = lazy(() => import('./courses/python/advanced/PythonSortingProject'));
const PythonMorseProject = lazy(() => import('./courses/python/advanced/PythonMorseProject'));

// E-Kart
const EkartLayout = lazy(() => import('./ekart/EkartLayout'));
const EkartHome = lazy(() => import('./ekart/pages/Home'));
const EkartRoadmap = lazy(() => import('./ekart/pages/Roadmap'));
const EkartToolbox = lazy(() => import('./ekart/pages/Toolbox'));
const EkartGallery = lazy(() => import('./ekart/pages/Gallery'));
const EkartParentPortal = lazy(() => import('./ekart/pages/ParentPortal'));

// Hardware Module
const HardwareLanding = lazy(() => import('./hardware/pages/HardwareLanding'));

// Floating widgets are useful outside focus flows, but should not tax deep links.
const ClassroomPoints = lazy(() => import('./components/ClassroomPoints'));
const LearningStorageNotice = lazy(() => import('./components/LearningStorageNotice'));
const AIChat = lazy(() => import('./components/AIChat'));
const PageAnnotations = lazy(() => import('./components/PageAnnotations'));
const SiteSearchOverlay = lazy(() => import('./components/Navigation').then(
  module => ({ default: module.SiteSearchOverlay }),
));
import { useExamFocus, useTeacherTools } from './utils/teacherTools';

// Loading fallback
import LoadingScreen from './components/LoadingScreen';
const PageLoader = () => <LoadingScreen message="正在为您加载" />;

const GlobalWidgets = () => {
  const { pathname } = useLocation();
  const usesHeaderActions = pathname === '/' || pathname === '/museum';
  // Science lessons mount their own button inside the fullscreen stage.
  if (/^\/(?:innovation(?:-foundation)?|hardware\/(?:esp32(?:-contest)?|arduino))\/[^/]+/.test(pathname)) return null;
  if (pathname.startsWith('/question-bank')) {
    return <Suspense fallback={null}><AIChat corner /></Suspense>;
  }

  return (
    <Suspense fallback={null}>
      <div
        className={usesHeaderActions ? 'hidden md:contents' : 'hidden sm:contents'}
        role="toolbar"
        aria-label="快捷工具"
      >
        <ClassroomPoints mobileDocked={!usesHeaderActions} />
      </div>
      <div className={usesHeaderActions ? 'hidden md:contents' : 'contents'}><AIChat desktopOnly={usesHeaderActions} /></div>
    </Suspense>
  );
};

// 有些课程和真题页面使用独立页眉，快捷键仍由路由外壳统一处理。
const GlobalSearch = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const show = () => setOpen(true);
    const shortcut = event => {
      if ((event.metaKey || event.ctrlKey) && !event.altKey && !event.shiftKey && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        show();
      }
    };
    window.addEventListener('gesp:open-search', show);
    window.addEventListener('keydown', shortcut);
    return () => {
      window.removeEventListener('gesp:open-search', show);
      window.removeEventListener('keydown', shortcut);
    };
  }, []);
  return open ? <Suspense fallback={null}><SiteSearchOverlay onClose={() => setOpen(false)} /></Suspense> : null;
};

// 页面标注是老师投屏用的，默认不给学生显示（?teacher=1 打开），考试模式不挂载。
const TeacherWidgets = () => {
  const { search } = useLocation();
  const enabled = useTeacherTools(search);
  const examFocus = useExamFocus();
  if (!enabled || examFocus) return null;
  return <Suspense fallback={null}><PageAnnotations /></Suspense>;
};

// GitHub Pages 会把 /question-bank 301 到 /question-bank/。带斜杠的 pathname 会让
// 标题、canonical、课程范围说明、浮钮规则等全等/`$` 结尾的判断走错分支，
// 所以在路由层统一去掉尾斜杠，下游只会看到一种写法。
const TrailingSlashGuard = ({ children }) => {
  const { pathname, search, hash } = useLocation();
  const normalized = normalizePathname(pathname);
  if (normalized !== pathname) return <Navigate replace to={{ pathname: normalized, search, hash }} />;
  return children;
};

const RoutedLesson = () => {
  const { pathname } = useLocation();
  return <LessonRouter key={pathname} />;
};

function App() {
  // Prod deploy serves 404.html (a copy of index.html) for unknown paths, so
  // BrowserRouter deep links work as long as basename matches the base path
  // (`/` in dev, `/gesp-app` in prod — derived from Vite's BASE_URL).
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

  return (
    <BrowserRouter
      basename={basename}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <ErrorBoundary>
        <TrailingSlashGuard>
        <RouteSeo />
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/museum" element={<ComputingMuseum />} />
            <Route path={PLACEMENT_PATH} element={<PlacementQuiz />} />
            <Route path="/question-bank" element={<QuestionBankHome />} />
            <Route path="/question-bank/review" element={<QuestionBankReview />} />
            <Route path="/question-bank/topics/:level" element={<TopicPractice />} />
            <Route path="/question-bank/:level/:paperId" element={<ExamPaper />} />
            <Route path="/" element={<Home />} />
            <Route path="/innovation/:id" element={<InnovationLesson redirectLegacy />} />
            <Route path="/innovation-foundation" element={<HardwareLanding courseId="foundation" />} />
            <Route path="/innovation-foundation/:id" element={<InnovationLesson courseId="foundation" />} />

            {/* C++ Lessons — parameterized: /lesson/:level(1-6)/:lessonId(1-16) */}
            <Route path="/lesson/:level/:lessonId" element={<RoutedLesson />} />

            {/* E-Kart Lab Routes */}
            <Route path="/ekart" element={<EkartLayout />}>
              <Route index element={<EkartHome />} />
              <Route path="roadmap" element={<EkartRoadmap />} />
              <Route path="toolbox" element={<EkartToolbox />} />
              <Route path="gallery" element={<EkartGallery />} />
              <Route path="parent-portal" element={<EkartParentPortal />} />
            </Route>

            {/* The current HTML courses replace the retired ESP32 curriculum. */}
            <Route path="/hardware" element={<HardwareLanding />} />
            <Route path="/hardware/esp32-curriculum" element={<HardwareLanding />} />
            <Route path="/hardware/esp32/:num" element={<InnovationLesson />} />
            <Route path="/hardware/arduino" element={<HardwareLanding courseId="arduino" />} />
            <Route path="/hardware/arduino/:num" element={<InnovationLesson courseId="arduino" />} />
            <Route path="/hardware/esp32-contest" element={<HardwareLanding courseId="contest" />} />
            <Route path="/hardware/esp32-contest/:num" element={<InnovationLesson courseId="contest" />} />
            <Route path="/hardware/*" element={<Navigate to="/hardware/esp32-curriculum" replace />} />

            {/* Course Levels */}
            <Route path="/level1" element={<CourseLevel1 />} />
            <Route path="/level2" element={<CourseLevel2 />} />
            <Route path="/level3" element={<CourseLevel3 />} />
            <Route path="/level4" element={<CourseLevel4 />} />
            <Route path="/level5" element={<CourseLevel5 />} />
            <Route path="/level6" element={<CourseLevel6 />} />
            <Route path="/level7" element={<CourseLevel7 />} />
            <Route path="/level8" element={<CourseLevel8 />} />

            {/* Python Foundation */}
            <Route path="/python/f1" element={<PythonFoundation1 />} />
            <Route path="/python/f2" element={<PythonFoundation2 />} />
            <Route path="/python/f3" element={<PythonFoundation3 />} />
            <Route path="/python/f4" element={<PythonFoundation4 />} />
            <Route path="/python/f5" element={<PythonFoundation5 />} />
            <Route path="/python/f6" element={<PythonFoundation6 />} />
            <Route path="/python/f7" element={<PythonFoundation7 />} />
            <Route path="/python/bridge" element={<PythonBridge />} />

            {/* Python Advanced */}
            <Route path="/python/a1" element={<PythonAdvanced1 />} />
            <Route path="/python/a2" element={<PythonAdvanced2 />} />
            <Route path="/python/file-ops" element={<PythonFileOps />} />
            <Route path="/python/ai" element={<PythonAI />} />
            <Route path="/python/crawler" element={<PythonCrawler />} />
            <Route path="/python/binary-search" element={<BinarySearchProject />} />
            <Route path="/python/encryption" element={<PythonEncryptionProject />} />
            <Route path="/python/sorting" element={<PythonSortingProject />} />
            <Route path="/python/morse" element={<PythonMorseProject />} />

            {/* 旧版内嵌真题页已并入题库，保留 URL 兼容 */}
            <Route path="/gesp/2025-12-l2" element={<Navigate to="/question-bank/2/2025-12-l2" replace />} />

            {/* Legacy lesson redirects — old /lessonN, /adv-lessonN etc. → /lesson/:level/:id */}
            <Route path="/*" element={<LegacyLessonRedirect />} />
          </Routes>
        </Suspense>
        <Suspense fallback={null}><LearningStorageNotice /></Suspense>
        <GlobalWidgets />
        <GlobalSearch />
        <TeacherWidgets />
        </TrailingSlashGuard>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
