import React, { Suspense, lazy } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

import HeroSection from './components/HeroSection';
import LearningPaths from './components/LearningPaths';
import DeferredSection from './components/DeferredSection';
import ClassroomPoints from './components/ClassroomPoints';
import AIChat from './components/AIChat';

const LessonCatalog = lazy(() => import('./components/LessonCatalog'));
const FeaturedProjects = lazy(() => import('./components/FeaturedProjects'));
const TheLab = lazy(() => import('./components/TheLab'));
const ExploreMore = lazy(() => import('./components/ExploreMore'));

const SectionFallback = ({ minHeight = 480 }) => (
    <div className="bg-slate-50" style={{ minHeight }} aria-hidden="true" />
);

export default function Home() {
    return (
        <div className="font-sans text-brand-slate bg-slate-50 min-h-screen">
            <Navigation
                mobileActions={(
                    <div className="flex items-center gap-1" role="toolbar" aria-label="快捷工具">
                        <ClassroomPoints mobileInline />
                        <AIChat mobileInline />
                    </div>
                )}
            />

            <main>
                <HeroSection />
                <LearningPaths />
                <DeferredSection id="lesson-catalog" minHeight={1180} rootMargin="300px 0px">
                    <Suspense fallback={<SectionFallback minHeight={1180} />}>
                        <LessonCatalog />
                    </Suspense>
                </DeferredSection>
                <DeferredSection id="projects-section" minHeight={720}>
                    <Suspense fallback={<SectionFallback minHeight={720} />}>
                        <FeaturedProjects />
                    </Suspense>
                </DeferredSection>
                <DeferredSection id="tools-section" minHeight={620}>
                    <Suspense fallback={<SectionFallback minHeight={620} />}>
                        <TheLab />
                    </Suspense>
                </DeferredSection>
                <DeferredSection id="explore-section" minHeight={520}>
                    <Suspense fallback={<SectionFallback minHeight={520} />}>
                        <ExploreMore />
                    </Suspense>
                </DeferredSection>
            </main>

            <Footer />
        </div>
    );
}
