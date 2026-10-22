import React, { Suspense, lazy, useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

import HeroSection from './components/HeroSection';
import ContinueLearning from './components/ContinueLearning';
import LearningPaths from './components/LearningPaths';
import QuestionBankHighlight from './components/QuestionBankHighlight';
import DeferredSection from './components/DeferredSection';
import ClassroomPoints from './components/ClassroomPoints';
import AIChat from './components/AIChat';
import './styles/design-tokens.css';
import './home.css';

const LessonCatalog = lazy(() => import('./components/LessonCatalog'));
const FeaturedProjects = lazy(() => import('./components/FeaturedProjects'));
const TheLab = lazy(() => import('./components/TheLab'));
const ExploreMore = lazy(() => import('./components/ExploreMore'));

const SectionFallback = ({ minHeight = 480 }) => (
    <div className="home-fallback" style={{ minHeight }} aria-hidden="true" />
);

export default function Home() {
    useEffect(() => {
        if (['innovation', 'arduino', 'science-foundation', 'python'].includes(new URLSearchParams(window.location.search).get('subject'))) {
            document.getElementById('lesson-catalog')?.scrollIntoView();
        }
    }, []);

    return (
        <div className="learning-home">
            <a className="home-skip-link" href="#home-main">跳到主要内容</a>
            <Navigation
                variant="home"
                mobileActions={(
                    <div className="home-nav-tools" role="toolbar" aria-label="快捷工具">
                        <ClassroomPoints mobileInline />
                        <AIChat mobileInline />
                    </div>
                )}
            />

            <main id="home-main" tabIndex={-1}>
                <HeroSection />
                {/* 有学习记录时才出现；新访客直接看到下面的线路说明，不会多出空白 */}
                <ContinueLearning />
                <LearningPaths />
                {/* 题库是 C++ 线的终点站，放在线路说明之后、课程目录之前 */}
                <QuestionBankHighlight />
                {/* 四个导航锚点都是常驻的外层 div，懒加载完成前也能从导航跳过去 */}
                <DeferredSection id="lesson-catalog" className="home-deferred" minHeight={1240} rootMargin="300px 0px">
                    <Suspense fallback={<SectionFallback minHeight={1240} />}>
                        <LessonCatalog />
                    </Suspense>
                </DeferredSection>
                <DeferredSection id="projects-section" className="home-deferred" minHeight={760}>
                    <Suspense fallback={<SectionFallback minHeight={760} />}>
                        <FeaturedProjects />
                    </Suspense>
                </DeferredSection>
                <DeferredSection id="tools-section" className="home-deferred" minHeight={820}>
                    <Suspense fallback={<SectionFallback minHeight={820} />}>
                        <TheLab />
                    </Suspense>
                </DeferredSection>
                <DeferredSection id="explore-section" className="home-deferred" minHeight={420}>
                    <Suspense fallback={<SectionFallback minHeight={420} />}>
                        <ExploreMore />
                    </Suspense>
                </DeferredSection>
            </main>

            <Footer variant="home" />
        </div>
    );
}
