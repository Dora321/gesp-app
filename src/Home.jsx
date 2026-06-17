import React from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

import HeroSection from './components/HeroSection';
import FeaturedProjects from './components/FeaturedProjects';
import LearningPaths from './components/LearningPaths';
import ExploreMore from './components/ExploreMore';
import TheLab from './components/TheLab';
import LessonCatalog from './components/LessonCatalog';

export default function Home() {
    return (
        <div className="font-sans text-brand-slate bg-slate-50 min-h-screen">
            <Navigation />

            <main>
                <HeroSection />
                <LearningPaths />
                <LessonCatalog />
                <FeaturedProjects />
                <TheLab />
                <ExploreMore />
            </main>

            <Footer />
        </div>
    );
}
