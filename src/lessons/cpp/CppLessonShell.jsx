import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Home, Menu, X } from 'lucide-react';

const accentMap = {
    blue: {
        text: 'text-blue-700',
        bg: 'bg-blue-600',
        light: 'bg-blue-50',
        border: 'border-blue-600',
        shadow: 'shadow-blue-200',
        gradient: 'from-blue-700 to-slate-900',
    },
    indigo: {
        text: 'text-indigo-700',
        bg: 'bg-indigo-600',
        light: 'bg-indigo-50',
        border: 'border-indigo-600',
        shadow: 'shadow-indigo-200',
        gradient: 'from-indigo-700 to-slate-900',
    },
    emerald: {
        text: 'text-emerald-700',
        bg: 'bg-emerald-600',
        light: 'bg-emerald-50',
        border: 'border-emerald-600',
        shadow: 'shadow-emerald-200',
        gradient: 'from-emerald-700 to-slate-900',
    },
    amber: {
        text: 'text-amber-700',
        bg: 'bg-amber-500',
        light: 'bg-amber-50',
        border: 'border-amber-500',
        shadow: 'shadow-amber-200',
        gradient: 'from-amber-600 to-slate-900',
    },
    rose: {
        text: 'text-rose-700',
        bg: 'bg-rose-600',
        light: 'bg-rose-50',
        border: 'border-rose-600',
        shadow: 'shadow-rose-200',
        gradient: 'from-rose-700 to-slate-900',
    },
    purple: {
        text: 'text-purple-700',
        bg: 'bg-purple-600',
        light: 'bg-purple-50',
        border: 'border-purple-600',
        shadow: 'shadow-purple-200',
        gradient: 'from-purple-700 to-slate-900',
    },
    teal: {
        text: 'text-teal-700',
        bg: 'bg-teal-600',
        light: 'bg-teal-50',
        border: 'border-teal-600',
        shadow: 'shadow-teal-200',
        gradient: 'from-teal-700 to-slate-900',
    },
};

export function CodeBlock({ children }) {
    return (
        <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm leading-7 text-slate-100 shadow-inner">
            <code>{children}</code>
        </pre>
    );
}

export function GoalCards({ goals }) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            {goals.map((goal) => (
                <div key={goal} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <CheckCircle2 className="mb-3 text-emerald-600" />
                    <p className="font-black leading-6 text-slate-800">{goal}</p>
                </div>
            ))}
        </div>
    );
}

export function Callout({ icon: Icon, title, children, tone = 'blue' }) {
    const toneMap = {
        blue: 'border-blue-100 bg-blue-50 text-blue-950',
        emerald: 'border-emerald-100 bg-emerald-50 text-emerald-950',
        amber: 'border-amber-200 bg-amber-50 text-amber-950',
        red: 'border-red-200 bg-red-50 text-red-950',
        slate: 'border-slate-200 bg-white text-slate-950',
        rose: 'border-rose-100 bg-rose-50 text-rose-950',
        purple: 'border-purple-100 bg-purple-50 text-purple-950',
        teal: 'border-teal-100 bg-teal-50 text-teal-950',
    };

    return (
        <div className={`rounded-2xl border p-6 ${toneMap[tone] ?? toneMap.blue}`}>
            <h4 className="mb-3 flex items-center gap-2 text-xl font-black">
                {Icon && <Icon size={22} />}
                {title}
            </h4>
            <div className="text-sm font-semibold leading-7">{children}</div>
        </div>
    );
}

export function StepList({ steps }) {
    return (
        <ol className="space-y-3">
            {steps.map((step, index) => (
                <li key={step} className="flex gap-3 rounded-xl bg-white p-3 text-sm font-bold text-slate-700 ring-1 ring-slate-200">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white">
                        {index + 1}
                    </span>
                    <span className="leading-7">{step}</span>
                </li>
            ))}
        </ol>
    );
}

export function MiniQuiz({ items }) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            {items.map((item) => (
                <div key={item.question} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h4 className="min-h-[3.25rem] font-black leading-6 text-slate-900">{item.question}</h4>
                    <div className="mt-4 rounded-lg bg-slate-100 px-3 py-2 text-sm font-black text-slate-800">
                        {item.answer}
                    </div>
                    <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{item.reason}</p>
                </div>
            ))}
        </div>
    );
}

export function CompareTable({ headers, rows }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="grid bg-slate-900 text-sm font-black text-white" style={{ gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))` }}>
                {headers.map((header) => (
                    <div key={header} className="p-4">{header}</div>
                ))}
            </div>
            {rows.map((row) => (
                <div
                    key={row.join('-')}
                    className="grid border-t border-slate-200 text-sm font-semibold text-slate-700"
                    style={{ gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))` }}
                >
                    {row.map((cell, index) => (
                        <div key={`${cell}-${index}`} className={`p-4 ${index === 0 ? 'font-black text-slate-950' : ''}`}>
                            {cell}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default function CppLessonShell({
    lessonNumber,
    lessonTitle,
    lessonSubtitle,
    sections,
    goals,
    hero,
    childrenBySection,
    previousPath,
    nextPath,
    accent = 'blue',
    levelTitle = 'C++ 进阶',
    levelCode = 'L2',
    homePath = '/',
    homeLabel = '返回首页',
}) {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState(1);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const color = accentMap[accent] ?? accentMap.blue;

    const currentIndex = sections.findIndex((section) => section.id === activeSection);
    const currentSection = sections[currentIndex] || sections[0];
    const activeContent = useMemo(() => childrenBySection[activeSection], [activeSection, childrenBySection]);

    useEffect(() => {
        setActiveSection(1);
        setIsMobileMenuOpen(false);
    }, [lessonNumber]);

    const goPrev = () => {
        if (activeSection > 1) {
            setActiveSection(activeSection - 1);
            return;
        }

        if (previousPath) {
            navigate(previousPath);
        }
    };

    const goNext = () => {
        if (activeSection < sections.length) {
            setActiveSection(activeSection + 1);
            return;
        }

        if (nextPath) {
            navigate(nextPath);
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-800">
            <div className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-slate-200 bg-white p-4 shadow-sm md:hidden">
                <h1 className={`text-lg font-black ${color.text}`}>{levelTitle}第 {lessonNumber} 课</h1>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="打开课程目录">
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <aside className={`fixed inset-y-0 left-0 z-50 flex h-full w-72 flex-col border-r border-slate-200 bg-white shadow-lg transition-transform md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
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
                        {activeSection}/{sections.length}
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto">
                    <div className="mx-auto max-w-5xl space-y-8 p-6 sm:p-10">
                        {activeSection === 1 && (
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
                                <GoalCards goals={goals} />
                                {activeContent}
                            </section>
                        )}
                        {activeSection !== 1 && (
                            <section className="space-y-6">
                                {activeContent}
                            </section>
                        )}
                    </div>
                </main>

                <footer className="flex h-20 items-center justify-between border-t border-slate-200 bg-white px-6">
                    <button
                        onClick={goPrev}
                        className="rounded-lg px-4 py-2 text-sm font-black text-slate-500 transition hover:bg-slate-100 hover:text-blue-700"
                    >
                        {activeSection === 1 ? '上一课' : '上一节'}
                    </button>
                    <button
                        onClick={goNext}
                        className={`inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-black text-white shadow-lg transition hover:brightness-110 ${color.bg} ${color.shadow}`}
                    >
                        {activeSection === sections.length ? '进入下一课' : '下一节'}
                        <ArrowRight size={16} />
                    </button>
                </footer>
            </div>
        </div>
    );
}
