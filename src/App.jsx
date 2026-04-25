import React, { Suspense, lazy } from 'react';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';

// Eagerly loaded: home page + global components (needed on every page)
import Home from './Home';
import ClassroomPoints from './components/ClassroomPoints';
import ScrollToTop from './components/ScrollToTop';
import AIChatWidget from './components/AIChatWidget';

// Lazy loaded: route-level pages — only fetched when user navigates to them
const Navigation = lazy(() => import('./Navigation'));
const ComputingMuseum = lazy(() => import('./pages/ComputingMuseum'));
const QuestionBankHome = lazy(() => import('./pages/QuestionBankHome'));
const ExamPaper = lazy(() => import('./pages/ExamPaper'));

// C++ Course Levels
const CourseLevel1 = lazy(() => import('./courses/CourseLevel1'));
const CourseLevel2 = lazy(() => import('./courses/CourseLevel2'));
const CourseLevel3 = lazy(() => import('./courses/CourseLevel3'));
const CourseLevel4 = lazy(() => import('./courses/CourseLevel4'));
const CourseLevel5 = lazy(() => import('./courses/CourseLevel5'));
const CourseLevel6 = lazy(() => import('./courses/CourseLevel6'));
const CourseLevel7 = lazy(() => import('./courses/CourseLevel7'));
const CourseLevel8 = lazy(() => import('./courses/CourseLevel8'));

// C++ Level 1 Lessons
const CppL1Lesson1 = lazy(() => import('./lessons/cpp/l1/Lesson1'));
const CppL1Lesson2 = lazy(() => import('./lessons/cpp/l1/Lesson2'));
const CppL1Lesson3 = lazy(() => import('./lessons/cpp/l1/Lesson3'));
const CppL1Lesson4 = lazy(() => import('./lessons/cpp/l1/Lesson4'));
const CppL1Lesson5 = lazy(() => import('./lessons/cpp/l1/Lesson5'));
const CppL1Lesson6 = lazy(() => import('./lessons/cpp/l1/Lesson6'));
const CppL1Lesson7 = lazy(() => import('./lessons/cpp/l1/Lesson7'));
const CppL1Lesson8 = lazy(() => import('./lessons/cpp/l1/Lesson8'));
const CppL1Lesson9 = lazy(() => import('./lessons/cpp/l1/Lesson9'));
const CppL1Lesson10 = lazy(() => import('./lessons/cpp/l1/Lesson10'));
const CppL1Lesson11 = lazy(() => import('./lessons/cpp/l1/Lesson11'));
const CppL1Lesson12 = lazy(() => import('./lessons/cpp/l1/Lesson12'));
const CppL1Lesson13 = lazy(() => import('./lessons/cpp/l1/Lesson13'));
const CppL1Lesson14 = lazy(() => import('./lessons/cpp/l1/Lesson14'));
const CppL1Lesson15 = lazy(() => import('./lessons/cpp/l1/Lesson15'));
const CppL1Lesson16 = lazy(() => import('./lessons/cpp/l1/Lesson16'));

// C++ Level 2 Lessons
const CppL2Lesson1 = lazy(() => import('./lessons/cpp/l2/Lesson1'));
const CppL2Lesson2 = lazy(() => import('./lessons/cpp/l2/Lesson2'));
const CppL2Lesson3 = lazy(() => import('./lessons/cpp/l2/Lesson3'));
const CppL2Lesson4 = lazy(() => import('./lessons/cpp/l2/Lesson4'));
const CppL2Lesson5 = lazy(() => import('./lessons/cpp/l2/Lesson5'));
const CppL2Lesson6 = lazy(() => import('./lessons/cpp/l2/Lesson6'));
const CppL2Lesson7 = lazy(() => import('./lessons/cpp/l2/Lesson7'));
const CppL2Lesson8 = lazy(() => import('./lessons/cpp/l2/Lesson8'));
const CppL2Lesson9 = lazy(() => import('./lessons/cpp/l2/Lesson9'));
const CppL2Lesson10 = lazy(() => import('./lessons/cpp/l2/Lesson10'));
const CppL2Lesson11 = lazy(() => import('./lessons/cpp/l2/Lesson11'));
const CppL2Lesson12 = lazy(() => import('./lessons/cpp/l2/Lesson12'));
const CppL2Lesson13 = lazy(() => import('./lessons/cpp/l2/Lesson13'));
const CppL2Lesson14 = lazy(() => import('./lessons/cpp/l2/Lesson14'));
const CppL2Lesson15 = lazy(() => import('./lessons/cpp/l2/Lesson15'));
const CppL2Lesson16 = lazy(() => import('./lessons/cpp/l2/Lesson16'));

// C++ Level 3 Lessons
const CppL3Lesson1 = lazy(() => import('./lessons/cpp/l3/Lesson1'));
const CppL3Lesson2 = lazy(() => import('./lessons/cpp/l3/Lesson2'));
const CppL3Lesson3 = lazy(() => import('./lessons/cpp/l3/Lesson3'));
const CppL3Lesson4 = lazy(() => import('./lessons/cpp/l3/Lesson4'));
const CppL3Lesson5 = lazy(() => import('./lessons/cpp/l3/Lesson5'));
const CppL3Lesson6 = lazy(() => import('./lessons/cpp/l3/Lesson6'));
const CppL3Lesson7 = lazy(() => import('./lessons/cpp/l3/Lesson7'));
const CppL3Lesson8 = lazy(() => import('./lessons/cpp/l3/Lesson8'));
const CppL3Lesson9 = lazy(() => import('./lessons/cpp/l3/Lesson9'));
const CppL3Lesson10 = lazy(() => import('./lessons/cpp/l3/Lesson10'));
const CppL3Lesson11 = lazy(() => import('./lessons/cpp/l3/Lesson11'));
const CppL3Lesson12 = lazy(() => import('./lessons/cpp/l3/Lesson12'));
const CppL3Lesson13 = lazy(() => import('./lessons/cpp/l3/Lesson13'));
const CppL3Lesson14 = lazy(() => import('./lessons/cpp/l3/Lesson14'));
const CppL3Lesson15 = lazy(() => import('./lessons/cpp/l3/Lesson15'));
const CppL3Lesson16 = lazy(() => import('./lessons/cpp/l3/Lesson16'));

// C++ Level 4 Lessons
const CppL4Lesson1 = lazy(() => import('./lessons/cpp/l4/Lesson1'));
const CppL4Lesson2 = lazy(() => import('./lessons/cpp/l4/Lesson2'));
const CppL4Lesson3 = lazy(() => import('./lessons/cpp/l4/Lesson3'));
const CppL4Lesson4 = lazy(() => import('./lessons/cpp/l4/Lesson4'));
const CppL4Lesson5 = lazy(() => import('./lessons/cpp/l4/Lesson5'));
const CppL4Lesson6 = lazy(() => import('./lessons/cpp/l4/Lesson6'));
const CppL4Lesson7 = lazy(() => import('./lessons/cpp/l4/Lesson7'));
const CppL4Lesson8 = lazy(() => import('./lessons/cpp/l4/Lesson8'));
const CppL4Lesson9 = lazy(() => import('./lessons/cpp/l4/Lesson9'));
const CppL4Lesson10 = lazy(() => import('./lessons/cpp/l4/Lesson10'));
const CppL4Lesson11 = lazy(() => import('./lessons/cpp/l4/Lesson11'));
const CppL4Lesson12 = lazy(() => import('./lessons/cpp/l4/Lesson12'));
const CppL4Lesson13 = lazy(() => import('./lessons/cpp/l4/Lesson13'));
const CppL4Lesson14 = lazy(() => import('./lessons/cpp/l4/Lesson14'));
const CppL4Lesson15 = lazy(() => import('./lessons/cpp/l4/Lesson15'));
const CppL4Lesson16 = lazy(() => import('./lessons/cpp/l4/Lesson16'));

// C++ Level 5 Lessons
const CppL5Lesson1 = lazy(() => import('./lessons/cpp/l5/Lesson1'));
const CppL5Lesson2 = lazy(() => import('./lessons/cpp/l5/Lesson2'));
const CppL5Lesson3 = lazy(() => import('./lessons/cpp/l5/Lesson3'));
const CppL5Lesson4 = lazy(() => import('./lessons/cpp/l5/Lesson4'));
const CppL5Lesson5 = lazy(() => import('./lessons/cpp/l5/Lesson5'));
const CppL5Lesson6 = lazy(() => import('./lessons/cpp/l5/Lesson6'));
const CppL5Lesson7 = lazy(() => import('./lessons/cpp/l5/Lesson7'));
const CppL5Lesson8 = lazy(() => import('./lessons/cpp/l5/Lesson8'));
const CppL5Lesson9 = lazy(() => import('./lessons/cpp/l5/Lesson9'));
const CppL5Lesson10 = lazy(() => import('./lessons/cpp/l5/Lesson10'));
const CppL5Lesson11 = lazy(() => import('./lessons/cpp/l5/Lesson11'));
const CppL5Lesson12 = lazy(() => import('./lessons/cpp/l5/Lesson12'));
const CppL5Lesson13 = lazy(() => import('./lessons/cpp/l5/Lesson13'));
const CppL5Lesson14 = lazy(() => import('./lessons/cpp/l5/Lesson14'));
const CppL5Lesson15 = lazy(() => import('./lessons/cpp/l5/Lesson15'));
const CppL5Lesson16 = lazy(() => import('./lessons/cpp/l5/Lesson16'));

// C++ Level 6 Lessons
const CppL6Lesson1 = lazy(() => import('./lessons/cpp/l6/Lesson1'));
const CppL6Lesson2 = lazy(() => import('./lessons/cpp/l6/Lesson2'));
const CppL6Lesson3 = lazy(() => import('./lessons/cpp/l6/Lesson3'));
const CppL6Lesson4 = lazy(() => import('./lessons/cpp/l6/Lesson4'));
const CppL6Lesson5 = lazy(() => import('./lessons/cpp/l6/Lesson5'));
const CppL6Lesson6 = lazy(() => import('./lessons/cpp/l6/Lesson6'));
const CppL6Lesson7 = lazy(() => import('./lessons/cpp/l6/Lesson7'));
const CppL6Lesson8 = lazy(() => import('./lessons/cpp/l6/Lesson8'));
const CppL6Lesson9 = lazy(() => import('./lessons/cpp/l6/Lesson9'));
const CppL6Lesson10 = lazy(() => import('./lessons/cpp/l6/Lesson10'));
const CppL6Lesson11 = lazy(() => import('./lessons/cpp/l6/Lesson11'));
const CppL6Lesson12 = lazy(() => import('./lessons/cpp/l6/Lesson12'));
const CppL6Lesson13 = lazy(() => import('./lessons/cpp/l6/Lesson13'));
const CppL6Lesson14 = lazy(() => import('./lessons/cpp/l6/Lesson14'));
const CppL6Lesson15 = lazy(() => import('./lessons/cpp/l6/Lesson15'));
const CppL6Lesson16 = lazy(() => import('./lessons/cpp/l6/Lesson16'));

// GESP special page
const GESP2_2025_12 = lazy(() => import('./data/gesp/level2/GESP2_2025_12'));

// Python Foundation
const PythonFoundation1 = lazy(() => import('./courses/python/foundation/PythonFoundation1'));
const PythonFoundation2 = lazy(() => import('./courses/python/foundation/PythonFoundation2'));
const PythonFoundation3 = lazy(() => import('./courses/python/foundation/PythonFoundation3'));
const PythonFoundation4 = lazy(() => import('./courses/python/foundation/PythonFoundation4'));
const PythonFoundation5 = lazy(() => import('./courses/python/foundation/PythonFoundation5'));
const PythonFoundation6 = lazy(() => import('./courses/python/foundation/PythonFoundation6'));
const PythonFoundation7 = lazy(() => import('./courses/python/foundation/PythonFoundation7'));

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

// Loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-950">
    <div className="flex flex-col items-center gap-4">
      <img src={`${import.meta.env.BASE_URL}cxk-dance.gif`} alt="加载中..." className="w-20 h-20 object-contain drop-shadow-lg animate-bounce" />
      <span className="text-slate-400 text-sm font-medium tracking-widest">正在为您加载...</span>
    </div>
  </div>
);

function App() {
  const Router = import.meta.env.DEV ? BrowserRouter : HashRouter;

  return (
    <Router basename={import.meta.env.DEV ? '/' : '/'}>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/navigation" element={<Navigation />} />
          <Route path="/museum" element={<ComputingMuseum />} />
          <Route path="/question-bank" element={<QuestionBankHome />} />
          <Route path="/question-bank/:level/:paperId" element={<ExamPaper />} />
          <Route path="/" element={<Home />} />

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

          {/* C++ Level 1 */}
          <Route path="/lesson1" element={<CppL1Lesson1 />} />
          <Route path="/lesson2" element={<CppL1Lesson2 />} />
          <Route path="/lesson3" element={<CppL1Lesson3 />} />
          <Route path="/lesson4" element={<CppL1Lesson4 />} />
          <Route path="/lesson5" element={<CppL1Lesson5 />} />
          <Route path="/lesson6" element={<CppL1Lesson6 />} />
          <Route path="/lesson7" element={<CppL1Lesson7 />} />
          <Route path="/lesson8" element={<CppL1Lesson8 />} />
          <Route path="/lesson9" element={<CppL1Lesson9 />} />
          <Route path="/lesson10" element={<CppL1Lesson10 />} />
          <Route path="/lesson11" element={<CppL1Lesson11 />} />
          <Route path="/lesson12" element={<CppL1Lesson12 />} />
          <Route path="/lesson13" element={<CppL1Lesson13 />} />
          <Route path="/lesson14" element={<CppL1Lesson14 />} />
          <Route path="/lesson15" element={<CppL1Lesson15 />} />
          <Route path="/lesson16" element={<CppL1Lesson16 />} />

          {/* C++ Level 2 */}
          <Route path="/adv-lesson1" element={<CppL2Lesson1 />} />
          <Route path="/adv-lesson2" element={<CppL2Lesson2 />} />
          <Route path="/adv-lesson3" element={<CppL2Lesson3 />} />
          <Route path="/adv-lesson4" element={<CppL2Lesson4 />} />
          <Route path="/adv-lesson5" element={<CppL2Lesson5 />} />
          <Route path="/adv-lesson6" element={<CppL2Lesson6 />} />
          <Route path="/adv-lesson7" element={<CppL2Lesson7 />} />
          <Route path="/adv-lesson8" element={<CppL2Lesson8 />} />
          <Route path="/adv-lesson9" element={<CppL2Lesson9 />} />
          <Route path="/adv-lesson10" element={<CppL2Lesson10 />} />
          <Route path="/adv-lesson11" element={<CppL2Lesson11 />} />
          <Route path="/adv-lesson12" element={<CppL2Lesson12 />} />
          <Route path="/adv-lesson13" element={<CppL2Lesson13 />} />
          <Route path="/adv-lesson14" element={<CppL2Lesson14 />} />
          <Route path="/adv-lesson15" element={<CppL2Lesson15 />} />
          <Route path="/adv-lesson16" element={<CppL2Lesson16 />} />

          {/* C++ Level 3 */}
          <Route path="/expert-lesson1" element={<CppL3Lesson1 />} />
          <Route path="/expert-lesson2" element={<CppL3Lesson2 />} />
          <Route path="/expert-lesson3" element={<CppL3Lesson3 />} />
          <Route path="/expert-lesson4" element={<CppL3Lesson4 />} />
          <Route path="/expert-lesson5" element={<CppL3Lesson5 />} />
          <Route path="/expert-lesson6" element={<CppL3Lesson6 />} />
          <Route path="/expert-lesson7" element={<CppL3Lesson7 />} />
          <Route path="/expert-lesson8" element={<CppL3Lesson8 />} />
          <Route path="/expert-lesson9" element={<CppL3Lesson9 />} />
          <Route path="/expert-lesson10" element={<CppL3Lesson10 />} />
          <Route path="/expert-lesson11" element={<CppL3Lesson11 />} />
          <Route path="/expert-lesson12" element={<CppL3Lesson12 />} />
          <Route path="/expert-lesson13" element={<CppL3Lesson13 />} />
          <Route path="/expert-lesson14" element={<CppL3Lesson14 />} />
          <Route path="/expert-lesson15" element={<CppL3Lesson15 />} />
          <Route path="/expert-lesson16" element={<CppL3Lesson16 />} />

          {/* C++ Level 4 */}
          <Route path="/senior-lesson1" element={<CppL4Lesson1 />} />
          <Route path="/senior-lesson2" element={<CppL4Lesson2 />} />
          <Route path="/senior-lesson3" element={<CppL4Lesson3 />} />
          <Route path="/senior-lesson4" element={<CppL4Lesson4 />} />
          <Route path="/senior-lesson5" element={<CppL4Lesson5 />} />
          <Route path="/senior-lesson6" element={<CppL4Lesson6 />} />
          <Route path="/senior-lesson7" element={<CppL4Lesson7 />} />
          <Route path="/senior-lesson8" element={<CppL4Lesson8 />} />
          <Route path="/senior-lesson9" element={<CppL4Lesson9 />} />
          <Route path="/senior-lesson10" element={<CppL4Lesson10 />} />
          <Route path="/senior-lesson11" element={<CppL4Lesson11 />} />
          <Route path="/senior-lesson12" element={<CppL4Lesson12 />} />
          <Route path="/senior-lesson13" element={<CppL4Lesson13 />} />
          <Route path="/senior-lesson14" element={<CppL4Lesson14 />} />
          <Route path="/senior-lesson15" element={<CppL4Lesson15 />} />
          <Route path="/senior-lesson16" element={<CppL4Lesson16 />} />

          {/* C++ Level 5 */}
          <Route path="/expert5-lesson1" element={<CppL5Lesson1 />} />
          <Route path="/expert5-lesson2" element={<CppL5Lesson2 />} />
          <Route path="/expert5-lesson3" element={<CppL5Lesson3 />} />
          <Route path="/expert5-lesson4" element={<CppL5Lesson4 />} />
          <Route path="/expert5-lesson5" element={<CppL5Lesson5 />} />
          <Route path="/expert5-lesson6" element={<CppL5Lesson6 />} />
          <Route path="/expert5-lesson7" element={<CppL5Lesson7 />} />
          <Route path="/expert5-lesson8" element={<CppL5Lesson8 />} />
          <Route path="/expert5-lesson9" element={<CppL5Lesson9 />} />
          <Route path="/expert5-lesson10" element={<CppL5Lesson10 />} />
          <Route path="/expert5-lesson11" element={<CppL5Lesson11 />} />
          <Route path="/expert5-lesson12" element={<CppL5Lesson12 />} />
          <Route path="/expert5-lesson13" element={<CppL5Lesson13 />} />
          <Route path="/expert5-lesson14" element={<CppL5Lesson14 />} />
          <Route path="/expert5-lesson15" element={<CppL5Lesson15 />} />
          <Route path="/expert5-lesson16" element={<CppL5Lesson16 />} />

          {/* C++ Level 6 */}
          <Route path="/master-lesson1" element={<CppL6Lesson1 />} />
          <Route path="/master-lesson2" element={<CppL6Lesson2 />} />
          <Route path="/master-lesson3" element={<CppL6Lesson3 />} />
          <Route path="/master-lesson4" element={<CppL6Lesson4 />} />
          <Route path="/master-lesson5" element={<CppL6Lesson5 />} />
          <Route path="/master-lesson6" element={<CppL6Lesson6 />} />
          <Route path="/master-lesson7" element={<CppL6Lesson7 />} />
          <Route path="/master-lesson8" element={<CppL6Lesson8 />} />
          <Route path="/master-lesson9" element={<CppL6Lesson9 />} />
          <Route path="/master-lesson10" element={<CppL6Lesson10 />} />
          <Route path="/master-lesson11" element={<CppL6Lesson11 />} />
          <Route path="/master-lesson12" element={<CppL6Lesson12 />} />
          <Route path="/master-lesson13" element={<CppL6Lesson13 />} />
          <Route path="/master-lesson14" element={<CppL6Lesson14 />} />
          <Route path="/master-lesson15" element={<CppL6Lesson15 />} />
          <Route path="/master-lesson16" element={<CppL6Lesson16 />} />

          <Route path="/gesp/2025-12-l2" element={<GESP2_2025_12 />} />
        </Routes>
      </Suspense>
      <ClassroomPoints />
      <AIChatWidget />
    </Router>
  );
}

export default App;
