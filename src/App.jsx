import React from 'react';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import CourseLevel1 from './courses/CourseLevel1';
import CourseLevel2 from './courses/CourseLevel2';
import CourseLevel3 from './courses/CourseLevel3';
import CourseLevel4 from './courses/CourseLevel4';
import CourseLevel5 from './courses/CourseLevel5';
import CourseLevel6 from './courses/CourseLevel6';
import CourseLevel7 from './courses/CourseLevel7';
import CourseLevel8 from './courses/CourseLevel8';
// C++ Levels 1-6
import CppL1Lesson1 from './lessons/cpp/l1/Lesson1';
import CppL1Lesson2 from './lessons/cpp/l1/Lesson2';
import CppL1Lesson3 from './lessons/cpp/l1/Lesson3';
import CppL1Lesson4 from './lessons/cpp/l1/Lesson4';
import CppL1Lesson5 from './lessons/cpp/l1/Lesson5';
import CppL1Lesson6 from './lessons/cpp/l1/Lesson6';
import CppL1Lesson7 from './lessons/cpp/l1/Lesson7';
import CppL1Lesson8 from './lessons/cpp/l1/Lesson8';
import CppL1Lesson9 from './lessons/cpp/l1/Lesson9';
import CppL1Lesson10 from './lessons/cpp/l1/Lesson10';
import CppL1Lesson11 from './lessons/cpp/l1/Lesson11';
import CppL1Lesson12 from './lessons/cpp/l1/Lesson12';
import CppL1Lesson13 from './lessons/cpp/l1/Lesson13';
import CppL1Lesson14 from './lessons/cpp/l1/Lesson14';
import CppL1Lesson15 from './lessons/cpp/l1/Lesson15';
import CppL1Lesson16 from './lessons/cpp/l1/Lesson16';

import CppL2Lesson1 from './lessons/cpp/l2/Lesson1';
import CppL2Lesson2 from './lessons/cpp/l2/Lesson2';
import CppL2Lesson3 from './lessons/cpp/l2/Lesson3';
import CppL2Lesson4 from './lessons/cpp/l2/Lesson4';
import CppL2Lesson5 from './lessons/cpp/l2/Lesson5';
import CppL2Lesson6 from './lessons/cpp/l2/Lesson6';
import CppL2Lesson7 from './lessons/cpp/l2/Lesson7';
import CppL2Lesson8 from './lessons/cpp/l2/Lesson8';
import CppL2Lesson9 from './lessons/cpp/l2/Lesson9';
import CppL2Lesson10 from './lessons/cpp/l2/Lesson10';
import CppL2Lesson11 from './lessons/cpp/l2/Lesson11';
import CppL2Lesson12 from './lessons/cpp/l2/Lesson12';
import CppL2Lesson13 from './lessons/cpp/l2/Lesson13';
import CppL2Lesson14 from './lessons/cpp/l2/Lesson14';
import CppL2Lesson15 from './lessons/cpp/l2/Lesson15';
import CppL2Lesson16 from './lessons/cpp/l2/Lesson16';

import CppL3Lesson1 from './lessons/cpp/l3/Lesson1';
import CppL3Lesson2 from './lessons/cpp/l3/Lesson2';
import CppL3Lesson3 from './lessons/cpp/l3/Lesson3';
import CppL3Lesson4 from './lessons/cpp/l3/Lesson4';
import CppL3Lesson5 from './lessons/cpp/l3/Lesson5';
import CppL3Lesson6 from './lessons/cpp/l3/Lesson6';
import CppL3Lesson7 from './lessons/cpp/l3/Lesson7';
import CppL3Lesson8 from './lessons/cpp/l3/Lesson8';
import CppL3Lesson9 from './lessons/cpp/l3/Lesson9';
import CppL3Lesson10 from './lessons/cpp/l3/Lesson10';
import CppL3Lesson11 from './lessons/cpp/l3/Lesson11';
import CppL3Lesson12 from './lessons/cpp/l3/Lesson12';
import CppL3Lesson13 from './lessons/cpp/l3/Lesson13';
import CppL3Lesson14 from './lessons/cpp/l3/Lesson14';
import CppL3Lesson15 from './lessons/cpp/l3/Lesson15';
import CppL3Lesson16 from './lessons/cpp/l3/Lesson16';

import CppL4Lesson1 from './lessons/cpp/l4/Lesson1';
import CppL4Lesson2 from './lessons/cpp/l4/Lesson2';
import CppL4Lesson3 from './lessons/cpp/l4/Lesson3';
import CppL4Lesson4 from './lessons/cpp/l4/Lesson4';
import CppL4Lesson5 from './lessons/cpp/l4/Lesson5';
import CppL4Lesson6 from './lessons/cpp/l4/Lesson6';
import CppL4Lesson7 from './lessons/cpp/l4/Lesson7';
import CppL4Lesson8 from './lessons/cpp/l4/Lesson8';
import CppL4Lesson9 from './lessons/cpp/l4/Lesson9';
import CppL4Lesson10 from './lessons/cpp/l4/Lesson10';
import CppL4Lesson11 from './lessons/cpp/l4/Lesson11';
import CppL4Lesson12 from './lessons/cpp/l4/Lesson12';
import CppL4Lesson13 from './lessons/cpp/l4/Lesson13';
import CppL4Lesson14 from './lessons/cpp/l4/Lesson14';
import CppL4Lesson15 from './lessons/cpp/l4/Lesson15';
import CppL4Lesson16 from './lessons/cpp/l4/Lesson16';

import CppL5Lesson1 from './lessons/cpp/l5/Lesson1';
import CppL5Lesson2 from './lessons/cpp/l5/Lesson2';
import CppL5Lesson3 from './lessons/cpp/l5/Lesson3';
import CppL5Lesson4 from './lessons/cpp/l5/Lesson4';
import CppL5Lesson5 from './lessons/cpp/l5/Lesson5';
import CppL5Lesson6 from './lessons/cpp/l5/Lesson6';
import CppL5Lesson7 from './lessons/cpp/l5/Lesson7';
import CppL5Lesson8 from './lessons/cpp/l5/Lesson8';
import CppL5Lesson9 from './lessons/cpp/l5/Lesson9';
import CppL5Lesson10 from './lessons/cpp/l5/Lesson10';
import CppL5Lesson11 from './lessons/cpp/l5/Lesson11';
import CppL5Lesson12 from './lessons/cpp/l5/Lesson12';
import CppL5Lesson13 from './lessons/cpp/l5/Lesson13';
import CppL5Lesson14 from './lessons/cpp/l5/Lesson14';
import CppL5Lesson15 from './lessons/cpp/l5/Lesson15';
import CppL5Lesson16 from './lessons/cpp/l5/Lesson16';

import CppL6Lesson1 from './lessons/cpp/l6/Lesson1';
import CppL6Lesson2 from './lessons/cpp/l6/Lesson2';
import CppL6Lesson3 from './lessons/cpp/l6/Lesson3';
import CppL6Lesson4 from './lessons/cpp/l6/Lesson4';
import CppL6Lesson5 from './lessons/cpp/l6/Lesson5';
import CppL6Lesson6 from './lessons/cpp/l6/Lesson6';
import CppL6Lesson7 from './lessons/cpp/l6/Lesson7';
import CppL6Lesson8 from './lessons/cpp/l6/Lesson8';
import CppL6Lesson9 from './lessons/cpp/l6/Lesson9';
import CppL6Lesson10 from './lessons/cpp/l6/Lesson10';
import CppL6Lesson11 from './lessons/cpp/l6/Lesson11';
import CppL6Lesson12 from './lessons/cpp/l6/Lesson12';
import CppL6Lesson13 from './lessons/cpp/l6/Lesson13';
import CppL6Lesson14 from './lessons/cpp/l6/Lesson14';
import CppL6Lesson15 from './lessons/cpp/l6/Lesson15';
import CppL6Lesson16 from './lessons/cpp/l6/Lesson16';

import GESP2_2025_12 from './data/gesp/level2/GESP2_2025_12';

import PythonFoundation1 from './courses/python/foundation/PythonFoundation1';
import PythonFoundation2 from './courses/python/foundation/PythonFoundation2';
import PythonFoundation3 from './courses/python/foundation/PythonFoundation3';
import PythonFoundation4 from './courses/python/foundation/PythonFoundation4';
import PythonFoundation5 from './courses/python/foundation/PythonFoundation5';
import PythonFoundation6 from './courses/python/foundation/PythonFoundation6';
import PythonFoundation7 from './courses/python/foundation/PythonFoundation7';

import PythonAdvanced1 from './courses/python/advanced/PythonAdvanced1';
import PythonAdvanced2 from './courses/python/advanced/PythonAdvanced2';
import PythonFileOps from './courses/python/advanced/PythonFileOps';
import PythonAI from './courses/python/advanced/PythonAI';
import PythonCrawler from './courses/python/advanced/PythonCrawler';
import BinarySearchProject from './courses/python/advanced/BinarySearchProject';
import PythonEncryptionProject from './courses/python/advanced/PythonEncryptionProject';
import PythonSortingProject from './courses/python/advanced/PythonSortingProject';
import PythonMorseProject from './courses/python/advanced/PythonMorseProject';
import ClassroomPoints from './components/ClassroomPoints';
import AnnouncementBar from './components/AnnouncementBar';
import ScrollToTop from './components/ScrollToTop';
import ComputingMuseum from './pages/ComputingMuseum'; // New Import

import QuestionBankHome from './pages/QuestionBankHome';
import ExamPaper from './pages/ExamPaper';

import Navigation from './Navigation'; // Import Navigation component
import AIChatWidget from './components/AIChatWidget'; // AI Chat Widget

// E-Kart Imports
import EkartLayout from './ekart/EkartLayout';
import EkartHome from './ekart/pages/Home';
import EkartRoadmap from './ekart/pages/Roadmap';
import EkartToolbox from './ekart/pages/Toolbox';
import EkartGallery from './ekart/pages/Gallery';
import EkartParentPortal from './ekart/pages/ParentPortal';

// Hardware Module Imports
import HardwareLayout from './hardware/HardwareLayout';
import HardwareLanding from './hardware/pages/HardwareLanding';
import HardwareLessonDetail from './hardware/pages/HardwareLessonDetail';

function App() {
  const Router = import.meta.env.DEV ? BrowserRouter : HashRouter;

  return (
    <Router basename={import.meta.env.DEV ? '/' : '/'}>
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
      <ClassroomPoints />
      <AIChatWidget />
      <ScrollToTop />
    </Router>
  );
}

export default App;