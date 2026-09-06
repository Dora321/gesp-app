import React, { Suspense, lazy } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

import HeroSection from './components/HeroSection';
import ContinueLearning from './components/ContinueLearning';
import LearningPaths from './components/LearningPaths';
import QuestionBankHighlight from './components/QuestionBankHighlight';
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
                {/* 有学习记录时才出现；新访客直接看到下面的路径卡，不会多出空白 */}
                <ContinueLearning />
                <LearningPaths />
                {/* 题库是最强资产，放在路径卡之后、课程目录之前 */}
                <QuestionBankHighlight />
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
                {/* 工具演示与课后探索同属一条暗色带，合成一个延迟区块，
                    去掉中间那道 dark→dark 的接缝和重复的区块标题。 */}
                <DeferredSection id="tools-section" minHeight={900}>
                    <Suspense fallback={<SectionFallback minHeight={900} />}>
                        <>
                            <TheLab />
                            <ExploreMore />
                        </>
                    </Suspense>
                </DeferredSection>
            </main>

            <Footer />
        </div>
    );
}
