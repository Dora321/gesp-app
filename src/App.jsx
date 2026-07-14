import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Eagerly loaded: global components needed on every page
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import RouteSeo from './components/RouteSeo';

// Lazy loaded: route-level pages — only fetched when user navigates to them
const Home = lazy(() => import('./Home'));
const ComputingMuseum = lazy(() => import('./pages/ComputingMuseum'));
const QuestionBankHome = lazy(() => import('./pages/QuestionBankHome'));
const ExamPaper = lazy(() => import('./pages/ExamPaper'));
const TopicPractice = lazy(() => import('./pages/question-bank/TopicPracticePage'));

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
const HardwareLayout = lazy(() => import('./hardware/HardwareLayout'));
const HardwareLanding = lazy(() => import('./hardware/pages/HardwareLanding'));
const HardwareLessonDetail = lazy(() => import('./hardware/pages/HardwareLessonDetail'));
const Esp32AiCourseSystem = lazy(() => import('./hardware/pages/Esp32AiCourseSystem'));

// Floating widgets are useful outside focus flows, but should not tax deep links.
const ClassroomPoints = lazy(() => import('./components/ClassroomPoints'));
const AIChat = lazy(() => import('./components/AIChat'));

// Loading fallback
import LoadingScreen from './components/LoadingScreen';
const PageLoader = () => <LoadingScreen message="正在为您加载" />;

const GlobalWidgets = () => {
  const { pathname } = useLocation();
  const isQuestionBankFlow = pathname.startsWith('/question-bank');
  const usesHeaderActions = pathname === '/' || pathname === '/museum';

  if (isQuestionBankFlow) return null;

  return (
    <Suspense fallback={null}>
      <div
        className={usesHeaderActions ? 'hidden md:contents' : 'hidden sm:contents'}
        role="toolbar"
        aria-label="快捷工具"
      >
        <ClassroomPoints mobileDocked={!usesHeaderActions} />
        <AIChat mobileDocked={!usesHeaderActions} />
      </div>
    </Suspense>
  );
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
        <RouteSeo />
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/museum" element={<ComputingMuseum />} />
            <Route path="/question-bank" element={<QuestionBankHome />} />
            <Route path="/question-bank/topics/:level" element={<TopicPractice />} />
            <Route path="/question-bank/:level/:paperId" element={<ExamPaper />} />
            <Route path="/" element={<Home />} />

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

            {/* Hardware Module Routes */}
            <Route path="/hardware" element={<HardwareLayout />}>
              <Route index element={<HardwareLanding />} />
              <Route path="esp32-ai" element={<Esp32AiCourseSystem />} />
              <Route path="lesson/:id" element={<HardwareLessonDetail />} />
            </Route>

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
        <GlobalWidgets />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
