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

import GESP2_2025_12 from './data/gesp/level2/GESP2_2025_12';

import PythonFoundation1 from './courses/python/foundation/PythonFoundation1';
import PythonFoundation2 from './courses/python/foundation/PythonFoundation2';
import PythonFoundation3 from './courses/python/foundation/PythonFoundation3';
import PythonFoundation4 from './courses/python/foundation/PythonFoundation4';
import PythonFoundation5 from './courses/python/foundation/PythonFoundation5';

import PythonAdvanced1 from './courses/python/advanced/PythonAdvanced1';
import PythonAdvanced2 from './courses/python/advanced/PythonAdvanced2';
import PythonAI from './courses/python/advanced/PythonAI';
import PythonCrawler from './courses/python/advanced/PythonCrawler';
import BinarySearchProject from './courses/python/advanced/BinarySearchProject';
import PythonEncryptionProject from './courses/python/advanced/PythonEncryptionProject';
import PythonSortingProject from './courses/python/advanced/PythonSortingProject';
import PythonMorseProject from './courses/python/advanced/PythonMorseProject';
import ClassroomPoints from './components/ClassroomPoints';
import AnnouncementBar from './components/AnnouncementBar';
import ComputingMuseum from './pages/ComputingMuseum'; // New Import

import QuestionBankHome from './pages/QuestionBankHome';
import ExamPaper from './pages/ExamPaper';

import Navigation from './Navigation'; // Import Navigation component

// E-Kart Imports
import EkartLayout from './ekart/EkartLayout';
import EkartHome from './ekart/pages/Home';
import EkartRoadmap from './ekart/pages/Roadmap';
import EkartToolbox from './ekart/pages/Toolbox';
import EkartGallery from './ekart/pages/Gallery';
import EkartParentPortal from './ekart/pages/ParentPortal';

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

        {/* Python Advanced */}
        <Route path="/python/a1" element={<PythonAdvanced1 />} />
        <Route path="/python/a2" element={<PythonAdvanced2 />} />
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

        <Route path="/gesp/2025-12-l2" element={<GESP2_2025_12 />} />
      </Routes>
      <ClassroomPoints />
    </BrowserRouter>
  );
}

export default App;