import React from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

import HeroSection from './components/HeroSection';
import FeaturedProjects from './components/FeaturedProjects';

// Placeholder components for sections
// In a real refactor, these should be separate files in /components

import RoadmapSection from './components/RoadmapSection';
import CourseSystem from './components/CourseSystem';
import TheLab from './components/TheLab';
import HallOfFame from './components/HallOfFame';
import LessonCatalog from './components/LessonCatalog';

// Components imported above

export default function Home() {
    return (
        <div className="font-sans text-brand-slate bg-slate-50 min-h-screen">
            <Navigation />

            <main>
                <HeroSection />
                <FeaturedProjects />
                <RoadmapSection />
                <CourseSystem />
                <LessonCatalog />
                <TheLab />
                <HallOfFame />
            </main>

            <Footer />
        </div>
    );
}
