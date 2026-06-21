import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Home, Menu, X } from 'lucide-react';

// 与 CppLessonShell 共用同一套配色 token，保证 C++ / Python 两套课视觉统一
const accentMap = {
    blue: { text: 'text-blue-700', bg: 'bg-blue-600', light: 'bg-blue-50', border: 'border-blue-600', ring: 'ring-blue-100', shadow: 'shadow-blue-200', gradient: 'from-blue-700 to-slate-900', soft: 'bg-blue-50 border-blue-100 text-blue-900', icon: 'text-blue-600' },
    indigo: { text: 'text-indigo-700', bg: 'bg-indigo-600', light: 'bg-indigo-50', border: 'border-indigo-600', ring: 'ring-indigo-100', shadow: 'shadow-indigo-200', gradient: 'from-indigo-700 to-slate-900', soft: 'bg-indigo-50 border-indigo-100 text-indigo-900', icon: 'text-indigo-600' },
    emerald: { text: 'text-emerald-700', bg: 'bg-emerald-600', light: 'bg-emerald-50', border: 'border-emerald-600', ring: 'ring-emerald-100', shadow: 'shadow-emerald-200', gradient: 'from-emerald-700 to-slate-900', soft: 'bg-emerald-50 border-emerald-100 text-emerald-900', icon: 'text-emerald-600' },
    teal: { text: 'text-teal-700', bg: 'bg-teal-600', light: 'bg-teal-50', border: 'border-teal-600', ring: 'ring-teal-100', shadow: 'shadow-teal-200', gradient: 'from-teal-700 to-slate-900', soft: 'bg-teal-50 border-teal-100 text-teal-900', icon: 'text-teal-600' },
    violet: { text: 'text-violet-700', bg: 'bg-violet-600', light: 'bg-violet-50', border: 'border-violet-600', ring: 'ring-violet-100', shadow: 'shadow-violet-200', gradient: 'from-violet-700 to-slate-900', soft: 'bg-violet-50 border-violet-100 text-violet-900', icon: 'text-violet-600' },
    amber: { text: 'text-amber-700', bg: 'bg-amber-500', light: 'bg-amber-50', border: 'border-amber-500', ring: 'ring-amber-100', shadow: 'shadow-amber-200', gradient: 'from-amber-600 to-slate-900', soft: 'bg-amber-50 border-amber-100 text-amber-900', icon: 'text-amber-600' },
};

function getAccent(accent) {
    return accentMap[accent] ?? accentMap.blue;
}

/* ---------- 设计系统原语 ---------- */

// 统一按钮：取代每课各写一份的 Button
export function Button({ onClick, children, className = '', variant = 'primary', disabled = false, accent = 'indigo' }) {
    const color = getAccent(accent);
    const base = 'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50';
    const variants = {
        primary: `${color.bg} text-white shadow-sm hover:brightness-110`,
        secondary: `border-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50`,
        ghost: `text-slate-600 hover:bg-slate-100`,
    };
    return (
        <button onClick={onClick} disabled={disabled} className={`${base} ${variants[variant] || variants.primary} ${className}`}>
            {children}
        </button>
    );
}

// 统一代码块
export function CodeBlock({ code, children }) {
    return (
        <div className="overflow-hidden rounded-xl bg-slate-950 shadow-inner ring-1 ring-slate-700/50">
            <div className="px-4 pt-2 text-xs font-mono uppercase tracking-widest text-slate-500">Python</div>
            <pre className="overflow-x-auto px-4 pb-4 pt-1 font-mono text-sm leading-6 text-slate-100">{code ?? children}</pre>
        </div>
    );
}

// 统一的小节导语：取代每课五颜六色的彩色头部盒子（去彩虹）
export function SlideHeader({ icon: Icon, title, children, accent = 'blue' }) {
    const color = getAccent(accent);
    return (
        <div className={`rounded-2xl border p-6 ${color.soft}`}>
            <h2 className="mb-2 flex items-center gap-2 text-2xl font-black">
                {Icon && <Icon className={color.icon} />}
                {title}
            </h2>
            <div className="text-base font-semibold leading-7 text-slate-600">{children}</div>
        </div>
    );
}

// 统一白卡容器
export function Panel({ title, children, className = '' }) {
    return (
        <div className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}>
            {title && <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-slate-500">{title}</h3>}
            {children}
        </div>
    );
}

/* ---------- 外壳 ---------- */

export default function PythonLessonShell({
    eyebrow = 'PYTHON FOUNDATION',
    lessonCode,
    lessonTitle,
    lessonSubtitle,
    hero,
    sections,
    accent = 'blue',
    previousPath,
    nextPath,
    nextLabel = '下一课',
    topSupport = null,
    bottomSupport = null,
    homePath = '/',
    homeLabel = '返回课程',
}) {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState(sections[0]?.id ?? 1);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const color = getAccent(accent);
    const scrollRef = React.useRef(null);

    const currentIndex = sections.findIndex((s) => s.id === activeSection);
    const currentSection = sections[currentIndex] || sections[0];
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === sections.length - 1;
    const Active = currentSection?.component;

    useEffect(() => {
        scrollRef.current?.scrollTo(0, 0);
    }, [activeSection]);

    const goPrev = () => {
        if (!isFirst) { setActiveSection(sections[currentIndex - 1].id); return; }
        if (previousPath) navigate(previousPath);
    };
    const goNext = () => {
        if (!isLast) { setActiveSection(sections[currentIndex + 1].id); return; }
        if (nextPath) navigate(nextPath);
    };

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-800">
            {/* 移动端顶栏 */}
            <div className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-slate-200 bg-white p-4 shadow-sm md:hidden">
                <h1 className={`text-lg font-black ${color.text}`}>{lessonCode}：{lessonTitle}</h1>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="打开课程目录" aria-expanded={isMobileMenuOpen}>
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* 侧边栏 */}
            <aside className={`fixed inset-y-0 left-0 z-50 flex h-full w-72 flex-col border-r border-slate-200 bg-white shadow-lg transition-transform md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="border-b border-slate-100 p-6">
                    <Link to={homePath} className={`inline-flex items-center gap-2 text-sm font-black ${color.text}`}>
                        <Home size={16} />
                        {homeLabel}
                    </Link>
                    <div className={`mt-3 text-xs font-black uppercase tracking-wider ${color.text}`}>{eyebrow}</div>
                    <h2 className="mt-1 text-lg font-black text-slate-900">{lessonCode}：{lessonTitle}</h2>
                    {lessonSubtitle && <p className="mt-1 text-xs font-semibold text-slate-500">{lessonSubtitle}</p>}
                </div>
                <div className="flex-1 overflow-y-auto py-4">
                    {sections.map((section, i) => {
                        const active = activeSection === section.id;
                        const Icon = section.icon;
                        return (
                            <button
                                key={section.id}
                                onClick={() => { setActiveSection(section.id); setIsMobileMenuOpen(false); }}
                                className={`flex w-full items-center gap-3 px-6 py-3 text-left transition-colors ${active ? `border-r-4 ${color.border} ${color.light} ${color.text}` : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-black ${active ? `${color.bg} text-white` : 'bg-slate-100 text-slate-400'}`}>
                                    {Icon ? <Icon size={15} /> : i + 1}
                                </span>
                                <span className="min-w-0">
                                    <span className="block truncate text-sm font-black">{section.title}</span>
                                    {section.category && <span className="mt-0.5 block truncate text-xs font-semibold text-slate-400">{section.category}</span>}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </aside>

            {/* 主区 */}
            <div className="flex h-full flex-1 flex-col pt-16 md:pt-0">
                <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
                    <div className="min-w-0">
                        <h2 className="truncate text-lg font-black text-slate-950">{lessonCode}：{lessonTitle}</h2>
                        <p className="truncate text-xs font-bold text-slate-500">{currentSection?.category || ''} / {currentSection?.title}</p>
                    </div>
                    <div className={`hidden shrink-0 rounded-full px-3 py-1 text-xs font-black sm:block ${color.light} ${color.text}`}>
                        {currentIndex + 1} / {sections.length}
                    </div>
                </header>

                <main ref={scrollRef} className="flex-1 overflow-y-auto">
                    <div className="mx-auto max-w-5xl space-y-8 p-4 sm:p-8 lg:p-10">
                        {isFirst && hero && (
                            <section className={`rounded-3xl bg-gradient-to-br ${color.gradient} p-8 text-white shadow-xl`}>
                                <div className="mb-4 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-black uppercase tracking-wider">
                                    {lessonCode} · {eyebrow}
                                </div>
                                <h1 className="text-3xl font-black tracking-tight sm:text-4xl">{hero.title}</h1>
                                <p className="mt-4 max-w-2xl text-base font-semibold leading-8 text-white/80 sm:text-lg">{hero.description}</p>
                                {lessonSubtitle && (
                                    <div className="mt-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-black text-white/90">{lessonSubtitle}</div>
                                )}
                            </section>
                        )}

                        {isFirst && topSupport}

                        <section className="space-y-6">
                            {Active && <Active />}
                        </section>

                        {isLast && bottomSupport}
                    </div>
                </main>

                <footer className="flex h-20 shrink-0 items-center justify-between border-t border-slate-200 bg-white px-6">
                    <button
                        onClick={goPrev}
                        disabled={isFirst && !previousPath}
                        className="rounded-lg px-4 py-2 text-sm font-black text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        {isFirst ? '上一课' : '上一节'}
                    </button>
                    <div className="hidden items-center gap-1.5 sm:flex">
                        {sections.map((s, i) => (
                            <span key={s.id} className={`h-1.5 rounded-full transition-all ${i === currentIndex ? `w-6 ${color.bg}` : 'w-1.5 bg-slate-200'}`} />
                        ))}
                    </div>
                    <button
                        onClick={goNext}
                        className={`inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-black text-white shadow-lg transition hover:brightness-110 ${color.bg} ${color.shadow}`}
                    >
                        {isLast ? nextLabel : '下一节'}
                        <ArrowRight size={16} />
                    </button>
                </footer>
            </div>
        </div>
    );
}
