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

import PythonLevel1 from './courses/python/level1/PythonLevel1';
import PythonLevel2 from './courses/python/level2/PythonLevel2';
import PythonAI from './courses/python/ai/PythonAI';
import PythonCrawler from './courses/python/crawler/PythonCrawler';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Course Levels */}
        <Route path="/level1" element={<CourseLevel1 />} />
        <Route path="/level2" element={<CourseLevel2 />} />
        <Route path="/level3" element={<CourseLevel3 />} />
        <Route path="/level4" element={<CourseLevel4 />} />
        <Route path="/level5" element={<CourseLevel5 />} />
        <Route path="/level6" element={<CourseLevel6 />} />
        <Route path="/level7" element={<CourseLevel7 />} />
        <Route path="/level8" element={<CourseLevel8 />} />

        {/* Python Courses */}
        <Route path="/python/level1" element={<PythonLevel1 />} />
        <Route path="/python/level2" element={<PythonLevel2 />} />
        <Route path="/python/ai" element={<PythonAI />} />
        <Route path="/python/crawler" element={<PythonCrawler />} />

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;