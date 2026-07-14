import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Home } from 'lucide-react';
import LessonMobileHeader from '../../components/LessonMobileHeader';
import { recordLessonVisit } from '../../utils/lessonProgress';
import { GoalCards, Prerequisites } from './CppLessonComponents';
import { accentMap } from './cppLessonTheme';

export {
    Callout,
    CodeBlock,
    CodeTracer,
    CompareTable,
    GoalCards,
    MasteryCheck,
    MiniQuiz,
    PredictCheck,
    Prerequisites,
    StepList,
    TransferCheck,
} from './CppLessonComponents';

export default function CppLessonShell({
    lessonNumber,
    lessonTitle,
    lessonSubtitle,
    sections,
    goals,
    prerequisites,
    hero,
    childrenBySection,
    previousPath,
    nextPath,
    topSupport = null,
    bottomSupport = null,
    accent = 'blue',
    levelTitle = 'C++ 进阶',
    levelCode = 'L2',
    homePath = '/',
    homeLabel = '返回首页',
}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeSection, setActiveSection] = useState(sections[0]?.id ?? 1);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const scrollRef = useRef(null);
    const color = accentMap[accent] ?? accentMap.blue;

    const currentIndex = sections.findIndex((section) => section.id === activeSection);
    const currentSection = sections[currentIndex] || sections[0];
    const isFirst = currentIndex <= 0;
    const isLast = currentIndex === sections.length - 1;
    const firstSectionId = sections[0]?.id ?? 1;
    const activeContent = useMemo(() => childrenBySection[activeSection], [activeSection, childrenBySection]);

    useEffect(() => {
        setActiveSection(firstSectionId);
        setIsMobileMenuOpen(false);
    }, [lessonNumber, firstSectionId]);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: 0 });
    }, [activeSection]);

    useEffect(() => {
        recordLessonVisit(location.pathname);
    }, [location.pathname]);

    const goPrev = () => {
        if (!isFirst) {
            setActiveSection(sections[currentIndex - 1].id);
            return;
        }

        if (previousPath) {
            navigate(previousPath);
        }
    };

    const goNext = () => {
        if (!isLast && currentIndex >= 0) {
            setActiveSection(sections[currentIndex + 1].id);
            return;
        }

        if (nextPath) {
            navigate(nextPath);
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-800">
            <LessonMobileHeader
                label={`${levelTitle} · ${levelCode}-${lessonNumber}`}
                labelClass={`${color.bg} text-white`}
                open={isMobileMenuOpen}
                onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />

            {isMobileMenuOpen && (
                <button
                    type="button"
                    aria-label="关闭课程目录遮罩"
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <aside className={`fixed inset-y-0 left-0 z-50 flex h-full w-72 flex-col border-r border-slate-200 bg-white shadow-lg transition-transform md:relative md:visible md:translate-x-0 ${isMobileMenuOpen ? 'visible translate-x-0' : 'invisible -translate-x-full'}`}>
                <div className="border-b border-slate-100 p-6">
                    <Link to={homePath} className={`inline-flex items-center gap-2 font-black ${color.text}`}>
                        <Home size={16} />
                        {homeLabel}
                    </Link>
                    <h2 className="mt-2 text-sm font-semibold text-slate-500">{levelTitle} · {levelCode}-{lessonNumber}</h2>
                </div>
                <div className="flex-1 overflow-y-auto py-4">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => {
                                setActiveSection(section.id);
                                setIsMobileMenuOpen(false);
                            }}
                            className={`w-full px-6 py-3 text-left transition-colors ${activeSection === section.id ? `border-r-4 ${color.border} ${color.light} ${color.text}` : 'text-slate-600 hover:bg-slate-50'}`}
                        >
                            <span className="block text-sm font-black">{section.title}</span>
                            <span className="mt-1 block text-xs font-semibold text-slate-400">{section.category}</span>
                        </button>
                    ))}
                </div>
            </aside>

            <div className="flex h-full flex-1 flex-col pt-16 md:pt-0">
                <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
                    <div>
                        <h2 className="text-lg font-black text-slate-950">第 {lessonNumber} 课：{lessonTitle}</h2>
                        <p className="text-xs font-bold text-slate-500">{currentSection.category} / {currentSection.title}</p>
                    </div>
                    <div className={`hidden rounded-full px-3 py-1 text-xs font-black sm:block ${color.light} ${color.text}`}>
                        {currentIndex + 1}/{sections.length}
                    </div>
                </header>

                <main ref={scrollRef} className="flex-1 overflow-y-auto">
                    <div className="mx-auto max-w-5xl space-y-8 p-6 sm:p-10">
                        {isFirst && (
                            <section className="space-y-6">
                                <div className={`rounded-3xl bg-gradient-to-br ${color.gradient} p-8 text-white shadow-xl`}>
                                    <div className="mb-4 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-black uppercase tracking-wider">
                                        Lesson {lessonNumber}
                                    </div>
                                    <h1 className="text-4xl font-black tracking-tight">{hero.title}</h1>
                                    <p className="mt-4 max-w-2xl text-lg font-semibold leading-8 text-white/80">
                                        {hero.description}
                                    </p>
                                    {lessonSubtitle && (
                                        <div className="mt-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-black text-white/90">
                                            {lessonSubtitle}
                                        </div>
                                    )}
                                </div>
                                {prerequisites && <Prerequisites items={prerequisites} />}
                                <GoalCards goals={goals} />
                                {topSupport}
                                <div data-lesson-active-content="true">{activeContent}</div>
                            </section>
                        )}
                        {!isFirst && (
                            <section className="space-y-6">
                                <div data-lesson-active-content="true">{activeContent}</div>
                            </section>
                        )}
                        {isLast && bottomSupport}
                    </div>
                </main>

                <footer className="flex h-20 items-center justify-between border-t border-slate-200 bg-white px-6">
                    <button
                        onClick={goPrev}
                        disabled={isFirst && !previousPath}
                        className="rounded-lg px-4 py-2 text-sm font-black text-slate-500 transition hover:bg-slate-100 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        {isFirst ? '上一课' : '上一节'}
                    </button>
                    <button
                        onClick={goNext}
                        className={`inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-black text-white shadow-lg transition hover:brightness-110 ${color.bg} ${color.shadow}`}
                    >
                        {isLast ? '进入下一课' : '下一节'}
                        <ArrowRight size={16} />
                    </button>
                </footer>
            </div>
        </div>
    );
}
