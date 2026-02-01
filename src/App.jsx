import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import CourseLevel1 from './courses/CourseLevel1';
import CourseLevel2 from './courses/CourseLevel2';
import CourseLevel3 from './courses/CourseLevel3';
import CourseLevel4 from './courses/CourseLevel4';
import CourseLevel5 from './courses/CourseLevel5';
import CourseLevel6 from './courses/CourseLevel6';
import CourseLevel7 from './courses/CourseLevel7';
import CourseLevel8 from './courses/CourseLevel8';
import Lesson1 from './lessons/Lesson1';
import Lesson2 from './lessons/Lesson2';
import Lesson3 from './lessons/Lesson3';
import Lesson4 from './lessons/Lesson4';
import Lesson5 from './lessons/Lesson5';
import Lesson6 from './lessons/Lesson6';
import Lesson7 from './lessons/Lesson7';
import Lesson8 from './lessons/Lesson8';
import Lesson9 from './lessons/Lesson9';
import Lesson10 from './lessons/Lesson10';
import Lesson11 from './lessons/Lesson11';
import Lesson12 from './lessons/Lesson12';
import Lesson13 from './lessons/Lesson13';
import Lesson14 from './lessons/Lesson14';
import Lesson15 from './lessons/Lesson15';
import Lesson16 from './lessons/Lesson16';
import AdvLesson1 from './lessons/AdvLesson1';
import AdvLesson2 from './lessons/AdvLesson2';
import AdvLesson3 from './lessons/AdvLesson3';
import AdvLesson4 from './lessons/AdvLesson4';
import AdvLesson5 from './lessons/AdvLesson5';
import AdvLesson6 from './lessons/AdvLesson6';
import AdvLesson7 from './lessons/AdvLesson7';
import AdvLesson8 from './lessons/AdvLesson8';
import AdvLesson9 from './lessons/AdvLesson9';
import AdvLesson10 from './lessons/AdvLesson10';
import AdvLesson11 from './lessons/AdvLesson11';
import AdvLesson12 from './lessons/AdvLesson12';
import AdvLesson13 from './lessons/AdvLesson13';
import AdvLesson14 from './lessons/AdvLesson14';
import AdvLesson15 from './lessons/AdvLesson15';
import AdvLesson16 from './lessons/AdvLesson16';

// Level 3
import ExpertLesson1 from './lessons/ExpertLesson1';
import ExpertLesson2 from './lessons/ExpertLesson2';
import ExpertLesson3 from './lessons/ExpertLesson3';
import ExpertLesson4 from './lessons/ExpertLesson4';
import ExpertLesson5 from './lessons/ExpertLesson5';
import ExpertLesson6 from './lessons/ExpertLesson6';
import ExpertLesson7 from './lessons/ExpertLesson7';
import ExpertLesson8 from './lessons/ExpertLesson8';
import ExpertLesson9 from './lessons/ExpertLesson9';
import ExpertLesson10 from './lessons/ExpertLesson10';
import ExpertLesson11 from './lessons/ExpertLesson11';
import ExpertLesson12 from './lessons/ExpertLesson12';
import ExpertLesson13 from './lessons/ExpertLesson13';
import ExpertLesson14 from './lessons/ExpertLesson14';
import ExpertLesson15 from './lessons/ExpertLesson15';
import ExpertLesson16 from './lessons/ExpertLesson16';

// Level 4
import SeniorLesson1 from './lessons/SeniorLesson1';
import SeniorLesson2 from './lessons/SeniorLesson2';
import SeniorLesson3 from './lessons/SeniorLesson3';
import SeniorLesson4 from './lessons/SeniorLesson4';
import SeniorLesson5 from './lessons/SeniorLesson5';
import SeniorLesson6 from './lessons/SeniorLesson6';
import SeniorLesson7 from './lessons/SeniorLesson7';
import SeniorLesson8 from './lessons/SeniorLesson8';
import SeniorLesson9 from './lessons/SeniorLesson9';
import SeniorLesson10 from './lessons/SeniorLesson10';
import SeniorLesson11 from './lessons/SeniorLesson11';
import SeniorLesson12 from './lessons/SeniorLesson12';
import SeniorLesson13 from './lessons/SeniorLesson13';
import SeniorLesson14 from './lessons/SeniorLesson14';
import SeniorLesson15 from './lessons/SeniorLesson15';
import SeniorLesson16 from './lessons/SeniorLesson16';

// Level 5
import Expert5Lesson1 from './lessons/Expert5Lesson1';
import Expert5Lesson2 from './lessons/Expert5Lesson2';
import Expert5Lesson3 from './lessons/Expert5Lesson3';
import Expert5Lesson4 from './lessons/Expert5Lesson4';
import Expert5Lesson5 from './lessons/Expert5Lesson5';
import Expert5Lesson6 from './lessons/Expert5Lesson6';
import Expert5Lesson7 from './lessons/Expert5Lesson7';
import Expert5Lesson8 from './lessons/Expert5Lesson8';
import Expert5Lesson9 from './lessons/Expert5Lesson9';
import Expert5Lesson10 from './lessons/Expert5Lesson10';
import Expert5Lesson11 from './lessons/Expert5Lesson11';
import Expert5Lesson12 from './lessons/Expert5Lesson12';
import Expert5Lesson13 from './lessons/Expert5Lesson13';
import Expert5Lesson14 from './lessons/Expert5Lesson14';
import Expert5Lesson15 from './lessons/Expert5Lesson15';
import Expert5Lesson16 from './lessons/Expert5Lesson16';

// Level 6
import MasterLesson1 from './lessons/MasterLesson1';
import MasterLesson2 from './lessons/MasterLesson2';
import MasterLesson3 from './lessons/MasterLesson3';
import MasterLesson4 from './lessons/MasterLesson4';
import MasterLesson5 from './lessons/MasterLesson5';
import MasterLesson6 from './lessons/MasterLesson6';
import MasterLesson7 from './lessons/MasterLesson7';
import MasterLesson8 from './lessons/MasterLesson8';
import MasterLesson9 from './lessons/MasterLesson9';
import MasterLesson10 from './lessons/MasterLesson10';
import MasterLesson11 from './lessons/MasterLesson11';
import MasterLesson12 from './lessons/MasterLesson12';
import MasterLesson13 from './lessons/MasterLesson13';
import MasterLesson14 from './lessons/MasterLesson14';
import MasterLesson15 from './lessons/MasterLesson15';
import MasterLesson16 from './lessons/MasterLesson16';

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
  return (
    <BrowserRouter basename={import.meta.env.DEV ? '/' : '/gesp-app'}>
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

        {/* Fun Lessons */}
        <Route path="/lesson1" element={<Lesson1 />} />
        <Route path="/lesson2" element={<Lesson2 />} />
        <Route path="/lesson3" element={<Lesson3 />} />
        <Route path="/lesson4" element={<Lesson4 />} />
        <Route path="/lesson5" element={<Lesson5 />} />
        <Route path="/lesson6" element={<Lesson6 />} />
        <Route path="/lesson7" element={<Lesson7 />} />
        <Route path="/lesson8" element={<Lesson8 />} />
        <Route path="/lesson9" element={<Lesson9 />} />
        <Route path="/lesson10" element={<Lesson10 />} />
        <Route path="/lesson11" element={<Lesson11 />} />
        <Route path="/lesson12" element={<Lesson12 />} />
        <Route path="/lesson13" element={<Lesson13 />} />
        <Route path="/lesson14" element={<Lesson14 />} />
        <Route path="/lesson15" element={<Lesson15 />} />
        <Route path="/lesson16" element={<Lesson16 />} />
        <Route path="/adv-lesson1" element={<AdvLesson1 />} />
        <Route path="/adv-lesson2" element={<AdvLesson2 />} />
        <Route path="/adv-lesson3" element={<AdvLesson3 />} />
        <Route path="/adv-lesson4" element={<AdvLesson4 />} />
        <Route path="/adv-lesson5" element={<AdvLesson5 />} />
        <Route path="/adv-lesson6" element={<AdvLesson6 />} />
        <Route path="/adv-lesson7" element={<AdvLesson7 />} />
        <Route path="/adv-lesson8" element={<AdvLesson8 />} />
        <Route path="/adv-lesson9" element={<AdvLesson9 />} />
        <Route path="/adv-lesson10" element={<AdvLesson10 />} />
        <Route path="/adv-lesson11" element={<AdvLesson11 />} />
        <Route path="/adv-lesson12" element={<AdvLesson12 />} />
        <Route path="/adv-lesson13" element={<AdvLesson13 />} />
        <Route path="/adv-lesson14" element={<AdvLesson14 />} />
        <Route path="/adv-lesson15" element={<AdvLesson15 />} />
        <Route path="/adv-lesson16" element={<AdvLesson16 />} />

        {/* Level 3 */}
        <Route path="/expert-lesson1" element={<ExpertLesson1 />} />
        <Route path="/expert-lesson2" element={<ExpertLesson2 />} />
        <Route path="/expert-lesson3" element={<ExpertLesson3 />} />
        <Route path="/expert-lesson4" element={<ExpertLesson4 />} />
        <Route path="/expert-lesson5" element={<ExpertLesson5 />} />
        <Route path="/expert-lesson6" element={<ExpertLesson6 />} />
        <Route path="/expert-lesson7" element={<ExpertLesson7 />} />
        <Route path="/expert-lesson8" element={<ExpertLesson8 />} />
        <Route path="/expert-lesson9" element={<ExpertLesson9 />} />
        <Route path="/expert-lesson10" element={<ExpertLesson10 />} />
        <Route path="/expert-lesson11" element={<ExpertLesson11 />} />
        <Route path="/expert-lesson12" element={<ExpertLesson12 />} />
        <Route path="/expert-lesson13" element={<ExpertLesson13 />} />
        <Route path="/expert-lesson14" element={<ExpertLesson14 />} />
        <Route path="/expert-lesson15" element={<ExpertLesson15 />} />
        <Route path="/expert-lesson16" element={<ExpertLesson16 />} />

        {/* Level 4 */}
        <Route path="/senior-lesson1" element={<SeniorLesson1 />} />
        <Route path="/senior-lesson2" element={<SeniorLesson2 />} />
        <Route path="/senior-lesson3" element={<SeniorLesson3 />} />
        <Route path="/senior-lesson4" element={<SeniorLesson4 />} />
        <Route path="/senior-lesson5" element={<SeniorLesson5 />} />
        <Route path="/senior-lesson6" element={<SeniorLesson6 />} />
        <Route path="/senior-lesson7" element={<SeniorLesson7 />} />
        <Route path="/senior-lesson8" element={<SeniorLesson8 />} />
        <Route path="/senior-lesson9" element={<SeniorLesson9 />} />
        <Route path="/senior-lesson10" element={<SeniorLesson10 />} />
        <Route path="/senior-lesson11" element={<SeniorLesson11 />} />
        <Route path="/senior-lesson12" element={<SeniorLesson12 />} />
        <Route path="/senior-lesson13" element={<SeniorLesson13 />} />
        <Route path="/senior-lesson14" element={<SeniorLesson14 />} />
        <Route path="/senior-lesson15" element={<SeniorLesson15 />} />
        <Route path="/senior-lesson16" element={<SeniorLesson16 />} />

        {/* Level 5 */}
        <Route path="/expert5-lesson1" element={<Expert5Lesson1 />} />
        <Route path="/expert5-lesson2" element={<Expert5Lesson2 />} />
        <Route path="/expert5-lesson3" element={<Expert5Lesson3 />} />
        <Route path="/expert5-lesson4" element={<Expert5Lesson4 />} />
        <Route path="/expert5-lesson5" element={<Expert5Lesson5 />} />
        <Route path="/expert5-lesson6" element={<Expert5Lesson6 />} />
        <Route path="/expert5-lesson7" element={<Expert5Lesson7 />} />
        <Route path="/expert5-lesson8" element={<Expert5Lesson8 />} />
        <Route path="/expert5-lesson9" element={<Expert5Lesson9 />} />
        <Route path="/expert5-lesson10" element={<Expert5Lesson10 />} />
        <Route path="/expert5-lesson11" element={<Expert5Lesson11 />} />
        <Route path="/expert5-lesson12" element={<Expert5Lesson12 />} />
        <Route path="/expert5-lesson13" element={<Expert5Lesson13 />} />
        <Route path="/expert5-lesson14" element={<Expert5Lesson14 />} />
        <Route path="/expert5-lesson15" element={<Expert5Lesson15 />} />
        <Route path="/expert5-lesson16" element={<Expert5Lesson16 />} />

        {/* Level 6 */}
        <Route path="/master-lesson1" element={<MasterLesson1 />} />
        <Route path="/master-lesson2" element={<MasterLesson2 />} />
        <Route path="/master-lesson3" element={<MasterLesson3 />} />
        <Route path="/master-lesson4" element={<MasterLesson4 />} />
        <Route path="/master-lesson5" element={<MasterLesson5 />} />
        <Route path="/master-lesson6" element={<MasterLesson6 />} />
        <Route path="/master-lesson7" element={<MasterLesson7 />} />
        <Route path="/master-lesson8" element={<MasterLesson8 />} />
        <Route path="/master-lesson9" element={<MasterLesson9 />} />
        <Route path="/master-lesson10" element={<MasterLesson10 />} />
        <Route path="/master-lesson11" element={<MasterLesson11 />} />
        <Route path="/master-lesson12" element={<MasterLesson12 />} />
        <Route path="/master-lesson13" element={<MasterLesson13 />} />
        <Route path="/master-lesson14" element={<MasterLesson14 />} />
        <Route path="/master-lesson15" element={<MasterLesson15 />} />
        <Route path="/master-lesson16" element={<MasterLesson16 />} />

        <Route path="/gesp/2025-12-l2" element={<GESP2_2025_12 />} />
      </Routes>
      <ClassroomPoints />
      <AIChatWidget />
      <ScrollToTop />
    </BrowserRouter>
  );
}

export default App;