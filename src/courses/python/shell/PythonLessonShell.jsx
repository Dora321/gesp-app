import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { recordLessonMastered, recordLessonVisit } from '../../../utils/lessonProgress';
import { ArrowRight, CheckCircle2, Flag, HelpCircle, Home, Menu, RotateCcw, X } from 'lucide-react';

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

export function MasteryCheck({
    title = '离开前过关检查',
    description = '先确认自己能解释规则、能处理错误、能换一个小例子再做。',
    items = [],
    accent = 'teal',
    className = '',
    theme = 'light',
}) {
    const color = getAccent(accent);
    const isDark = theme === 'dark';
    const [checked, setChecked] = useState(() => new Set());
    const total = items.length;
    const done = checked.size;
    const ready = total > 0 && done === total;

    const toggle = (index) => {
        setChecked((current) => {
            const next = new Set(current);
            if (next.has(index)) {
                next.delete(index);
            } else {
                next.add(index);
            }
            return next;
        });
    };

    const reset = () => setChecked(new Set());

    return (
        <section className={`rounded-2xl border p-5 shadow-sm ${isDark ? 'border-slate-700 bg-slate-900/80' : 'border-slate-200 bg-white'} ${className}`} aria-label="离开前过关检查">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-black ring-1 ${color.light} ${color.text} ${color.ring}`}>
                        <CheckCircle2 size={14} />
                        掌握检查
                    </div>
                    <h3 className={`mt-2 text-xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>{title}</h3>
                    <p className={`mt-1 text-sm font-semibold leading-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{description}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-black ${ready ? (isDark ? 'bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-400/30' : 'bg-emerald-100 text-emerald-700') : (isDark ? 'bg-slate-800 text-slate-300 ring-1 ring-slate-700' : 'bg-slate-100 text-slate-500')}`}>
                        {done}/{total}
                    </span>
                    {done > 0 && (
                        <button
                            type="button"
                            onClick={reset}
                            className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-black ring-1 transition ${isDark ? 'bg-slate-800 text-slate-300 ring-slate-700 hover:bg-slate-700' : 'bg-slate-50 text-slate-500 ring-slate-200 hover:bg-slate-100'}`}
                        >
                            <RotateCcw size={13} />
                            重置
                        </button>
                    )}
                </div>
            </div>

            <div className="grid gap-3">
                {items.map((item, index) => {
                    const active = checked.has(index);
                    return (
                        <button
                            key={item.label}
                            type="button"
                            onClick={() => toggle(index)}
                            aria-pressed={active}
                            className={`rounded-xl border p-4 text-left transition ${active ? (isDark ? 'border-emerald-400/60 bg-emerald-500/15' : 'border-emerald-300 bg-emerald-50') : isDark ? 'border-slate-700 bg-slate-800/70 hover:border-teal-400/50 hover:bg-slate-800' : 'border-slate-200 bg-slate-50 hover:border-teal-200 hover:bg-white'}`}
                        >
                            <div className="flex gap-3">
                                <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-black ${active ? (isDark ? 'bg-emerald-300 text-slate-950' : 'bg-emerald-600 text-white') : isDark ? 'bg-slate-900 text-slate-400 ring-1 ring-slate-700' : 'bg-white text-slate-400 ring-1 ring-slate-200'}`}>
                                    {active ? '✓' : index + 1}
                                </span>
                                <span className="min-w-0">
                                    <span className={`block text-sm font-black leading-6 ${active ? (isDark ? 'text-emerald-50' : 'text-slate-900') : isDark ? 'text-slate-100' : 'text-slate-900'}`}>{item.label}</span>
                                    {item.evidence && (
                                        <span className={`mt-1 block text-sm font-semibold leading-6 ${active ? (isDark ? 'text-emerald-100/80' : 'text-slate-600') : isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.evidence}</span>
                                    )}
                                    {item.retryHint && !active && (
                                        <span className={`mt-2 block text-xs font-bold leading-5 ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>还不稳：{item.retryHint}</span>
                                    )}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>

            <div className={`mt-4 rounded-xl px-4 py-3 text-sm font-bold leading-6 ${ready ? (isDark ? 'bg-emerald-500/15 text-emerald-100 ring-1 ring-emerald-400/30' : 'bg-emerald-50 text-emerald-800') : (isDark ? 'bg-amber-500/15 text-amber-100 ring-1 ring-amber-300/30' : 'bg-amber-50 text-amber-800')}`}>
                {ready
                    ? '可以进入下一课：你已经能用自己的解释和例子证明这节课不是只看懂。'
                    : '建议先补齐未勾选项：过关标准是能解释、能验证、能换一个例子做。'}
            </div>
        </section>
    );
}

// 先预测，再验证：强制学生在看答案前做一次预测，补齐「预测-运行-解释」闭环
// 与 CppLessonShell 的 PredictCheck 视觉对齐（amber 预测色），支持浅色课 / 深色项目
export function PredictCheck({
    title = '先预测，再验证',
    prompt,
    options = [],
    correctIndex = 0,
    explanation,
    misconception,
    className = '',
    theme = 'light',
}) {
    const isDark = theme === 'dark';
    const [selected, setSelected] = useState(null);
    const [revealed, setRevealed] = useState(false);
    const normalizedOptions = options.map((option) => (typeof option === 'string' ? { label: option } : option));
    const hasOptions = normalizedOptions.length > 0;
    const isAnswered = selected !== null || revealed;
    const isCorrect = selected === correctIndex;

    const reset = () => {
        setSelected(null);
        setRevealed(false);
    };

    return (
        <div className={`rounded-2xl border p-5 ${isDark ? 'border-amber-400/30 bg-amber-500/10' : 'border-amber-200 bg-amber-50'} ${className}`}>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-black ring-1 ${isDark ? 'bg-slate-900 text-amber-200 ring-amber-400/30' : 'bg-white text-amber-800 ring-amber-200'}`}>
                    <HelpCircle size={14} />
                    {title}
                </div>
                {isAnswered && (
                    <button
                        type="button"
                        onClick={reset}
                        className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-black ring-1 transition ${isDark ? 'bg-slate-900 text-slate-300 ring-amber-400/30 hover:bg-slate-800' : 'bg-white text-slate-500 ring-amber-200 hover:bg-amber-100'}`}
                    >
                        <RotateCcw size={13} />
                        再试一次
                    </button>
                )}
            </div>

            <p className={`text-base font-black leading-7 ${isDark ? 'text-amber-50' : 'text-slate-950'}`}>{prompt}</p>

            {hasOptions ? (
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {normalizedOptions.map((option, index) => {
                        const chosen = selected === index;
                        const correct = index === correctIndex;
                        const showState = selected !== null;
                        const stateClass = showState && correct
                            ? (isDark ? 'border-emerald-400/60 bg-emerald-500/15 text-emerald-100' : 'border-emerald-500 bg-emerald-50 text-emerald-900')
                            : showState && chosen
                                ? (isDark ? 'border-rose-400/60 bg-rose-500/15 text-rose-100' : 'border-rose-400 bg-rose-50 text-rose-900')
                                : (isDark ? 'border-slate-700 bg-slate-900 text-slate-200 hover:border-amber-400/40 hover:bg-slate-800' : 'border-white bg-white text-slate-700 hover:border-amber-300 hover:bg-amber-100');

                        return (
                            <button
                                key={option.label}
                                type="button"
                                onClick={() => setSelected(index)}
                                disabled={selected !== null}
                                className={`min-h-14 rounded-lg border-2 px-3 py-2 text-left text-sm font-bold leading-6 transition disabled:cursor-default ${stateClass}`}
                            >
                                <span className={`mr-2 inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-black ring-1 ${isDark ? 'bg-slate-950 text-slate-400 ring-slate-700' : 'bg-white text-slate-500 ring-slate-200'}`}>
                                    {String.fromCharCode(65 + index)}
                                </span>
                                {option.label}
                            </button>
                        );
                    })}
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => setRevealed(true)}
                    disabled={revealed}
                    className="mt-4 rounded-lg bg-amber-600 px-4 py-2 text-sm font-black text-white shadow-sm transition hover:bg-amber-700 disabled:cursor-default disabled:bg-slate-300"
                >
                    显示答案
                </button>
            )}

            {isAnswered && (
                <div className="mt-4 space-y-3">
                    {hasOptions && (
                        <div className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-black ${isCorrect ? (isDark ? 'bg-emerald-500/15 text-emerald-200' : 'bg-emerald-100 text-emerald-800') : (isDark ? 'bg-rose-500/15 text-rose-200' : 'bg-rose-100 text-rose-800')}`}>
                            <CheckCircle2 size={16} />
                            {isCorrect ? '预测正确' : `正确答案：${normalizedOptions[correctIndex]?.label}`}
                        </div>
                    )}
                    {explanation && (
                        <p className={`rounded-lg p-3 text-sm font-bold leading-7 ring-1 ${isDark ? 'bg-slate-900 text-slate-200 ring-amber-400/20' : 'bg-white text-slate-700 ring-amber-100'}`}>
                            {explanation}
                        </p>
                    )}
                    {misconception && (
                        <p className={`rounded-lg border p-3 text-sm font-semibold leading-7 ${isDark ? 'border-rose-400/30 bg-slate-900 text-rose-200' : 'border-rose-100 bg-white text-rose-700'}`}>
                            常见错因：{misconception}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

// 前置知识：开课前先确认「我已经会哪些」。与 CppLessonShell.Prerequisites 视觉对齐
export function Prerequisites({ items = [], theme = 'light' }) {
    if (!items.length) return null;
    const isDark = theme === 'dark';
    return (
        <div className={`rounded-2xl border p-5 ${isDark ? 'border-amber-400/30 bg-amber-500/10' : 'border-amber-200 bg-amber-50'}`}>
            <h3 className={`mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-wider ${isDark ? 'text-amber-200' : 'text-amber-800'}`}>
                <Flag size={16} />
                学这节课前，你应该已经会
            </h3>
            <ul className="grid gap-2 sm:grid-cols-2">
                {items.map((item) => (
                    <li key={item} className={`flex items-start gap-2 text-sm font-semibold leading-6 ${isDark ? 'text-amber-50' : 'text-amber-950'}`}>
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

/* ---------- 外壳 ---------- */

// 外壳底色：浅色课与深色项目两套 chrome（内容区交由各课自己渲染）
const CHROME = {
    light: {
        outer: 'bg-slate-50 text-slate-800', bar: 'border-slate-200 bg-white', aside: 'border-slate-200 bg-white',
        divider: 'border-slate-100', title: 'text-slate-900', subtitle: 'text-slate-500',
        sectionIdle: 'text-slate-600 hover:bg-slate-50', sectionIconIdle: 'bg-slate-100 text-slate-400', sectionCat: 'text-slate-400',
        header: 'border-slate-200 bg-white', headerTitle: 'text-slate-950', headerSub: 'text-slate-500',
        footer: 'border-slate-200 bg-white', prev: 'text-slate-500 hover:bg-slate-100 hover:text-slate-800', dotIdle: 'bg-slate-200',
    },
    dark: {
        outer: 'bg-slate-950 text-slate-200', bar: 'border-slate-800 bg-slate-900', aside: 'border-slate-800 bg-slate-900',
        divider: 'border-slate-800', title: 'text-white', subtitle: 'text-slate-400',
        sectionIdle: 'text-slate-400 hover:bg-slate-800', sectionIconIdle: 'bg-slate-800 text-slate-500', sectionCat: 'text-slate-500',
        header: 'border-slate-800 bg-slate-900', headerTitle: 'text-white', headerSub: 'text-slate-400',
        footer: 'border-slate-800 bg-slate-900', prev: 'text-slate-400 hover:bg-slate-800 hover:text-white', dotIdle: 'bg-slate-700',
    },
};

export default function PythonLessonShell({
    eyebrow = 'PYTHON FOUNDATION',
    lessonCode,
    lessonTitle,
    lessonSubtitle,
    hero,
    prerequisites,
    sections,
    accent = 'blue',
    previousPath,
    nextPath,
    nextLabel = '下一课',
    topSupport = null,
    bottomSupport = null,
    homePath = '/',
    homeLabel = '返回课程',
    theme = 'light',
}) {
    const t = CHROME[theme] || CHROME.light;
    const navigate = useNavigate();
    const location = useLocation();
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

    // Learning-status tracking for the course catalog: opening = 学习中,
    // reaching the last (小结与衔接) section = 已过关.
    useEffect(() => {
        recordLessonVisit(location.pathname);
    }, [location.pathname]);

    useEffect(() => {
        if (isLast) {
            recordLessonMastered(location.pathname);
        }
    }, [isLast, location.pathname]);

    const goPrev = () => {
        if (!isFirst) { setActiveSection(sections[currentIndex - 1].id); return; }
        if (previousPath) navigate(previousPath);
    };
    const goNext = () => {
        if (!isLast) { setActiveSection(sections[currentIndex + 1].id); return; }
        if (nextPath) navigate(nextPath);
    };

    return (
        <div className={`flex h-screen overflow-hidden font-sans ${t.outer}`}>
            {/* 移动端顶栏 */}
            <div className={`fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b ${t.bar} p-4 shadow-sm md:hidden`}>
                <h1 className={`text-lg font-black ${color.text}`}>{lessonCode}：{lessonTitle}</h1>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="打开课程目录" aria-expanded={isMobileMenuOpen}>
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* 侧边栏 */}
            <aside className={`fixed inset-y-0 left-0 z-50 flex h-full min-h-0 w-72 flex-col border-r ${t.aside} shadow-lg transition-transform md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className={`border-b ${t.divider} p-6`}>
                    <Link to={homePath} className={`inline-flex items-center gap-2 text-sm font-black ${color.text}`}>
                        <Home size={16} />
                        {homeLabel}
                    </Link>
                    <div className={`mt-3 text-xs font-black uppercase tracking-wider ${color.text}`}>{eyebrow}</div>
                    <h2 className={`mt-1 text-lg font-black ${t.title}`}>{lessonCode}：{lessonTitle}</h2>
                    {lessonSubtitle && <p className={`mt-1 text-xs font-semibold ${t.subtitle}`}>{lessonSubtitle}</p>}
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto py-4">
                    {sections.map((section, i) => {
                        const active = activeSection === section.id;
                        const Icon = section.icon;
                        return (
                            <button
                                key={section.id}
                                onClick={() => { setActiveSection(section.id); setIsMobileMenuOpen(false); }}
                                className={`flex w-full items-center gap-3 px-6 py-3 text-left transition-colors ${active ? `border-r-4 ${color.border} ${theme === 'dark' ? 'bg-slate-800 text-white' : `${color.light} ${color.text}`}` : t.sectionIdle}`}
                            >
                                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-black ${active ? `${color.bg} text-white` : t.sectionIconIdle}`}>
                                    {Icon ? <Icon size={15} /> : i + 1}
                                </span>
                                <span className="min-w-0">
                                    <span className="block truncate text-sm font-black">{section.title}</span>
                                    {section.category && <span className={`mt-0.5 block truncate text-xs font-semibold ${t.sectionCat}`}>{section.category}</span>}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </aside>

            {/* 主区 */}
            <div className="flex h-full flex-1 flex-col pt-16 md:pt-0">
                <header className={`flex h-16 items-center justify-between border-b ${t.header} px-6`}>
                    <div className="min-w-0">
                        <h2 className={`truncate text-lg font-black ${t.headerTitle}`}>{lessonCode}：{lessonTitle}</h2>
                        <p className={`truncate text-xs font-bold ${t.headerSub}`}>{currentSection?.category || ''} / {currentSection?.title}</p>
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

                        {isFirst && prerequisites && <Prerequisites items={prerequisites} theme={theme} />}

                        {isFirst && topSupport}

                        <section className="space-y-6">
                            {Active && <Active />}
                        </section>

                        {isLast && bottomSupport}
                    </div>
                </main>

                <footer className={`flex h-20 shrink-0 items-center justify-between border-t ${t.footer} px-6`}>
                    <button
                        onClick={goPrev}
                        disabled={isFirst && !previousPath}
                        className={`rounded-lg px-4 py-2 text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-40 ${t.prev}`}
                    >
                        {isFirst ? '上一课' : '上一节'}
                    </button>
                    <div className="hidden items-center gap-1.5 sm:flex">
                        {sections.map((s, i) => (
                            <span key={s.id} className={`h-1.5 rounded-full transition-all ${i === currentIndex ? `w-6 ${color.bg}` : `w-1.5 ${t.dotIdle}`}`} />
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
