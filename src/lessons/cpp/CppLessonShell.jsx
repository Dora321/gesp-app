import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Flag, Home, Menu, PlayCircle, RotateCcw, SkipForward, X } from 'lucide-react';

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

const cppTypes = new Set([
    'bool',
    'char',
    'double',
    'float',
    'int',
    'long',
    'short',
    'signed',
    'string',
    'unsigned',
    'void',
]);

const cppKeywords = new Set([
    'break',
    'case',
    'class',
    'const',
    'continue',
    'default',
    'do',
    'else',
    'false',
    'for',
    'if',
    'namespace',
    'return',
    'sizeof',
    'struct',
    'switch',
    'true',
    'using',
    'while',
]);

const cppBuiltins = new Set([
    'cin',
    'cout',
    'endl',
    'main',
    'max',
    'min',
    'sort',
    'swap',
    'vector',
]);

const tokenClassMap = {
    comment: 'text-emerald-400/80 italic',
    directive: 'text-fuchsia-300',
    string: 'text-amber-300',
    number: 'text-orange-300',
    type: 'text-sky-300',
    keyword: 'text-violet-300',
    builtin: 'text-cyan-300',
    function: 'text-yellow-200',
    operator: 'text-rose-300',
    plain: 'text-slate-100',
};

const pushToken = (tokens, text, type = 'plain') => {
    if (!text) return;
    tokens.push({ text, type });
};

const readQuotedToken = (line, start) => {
    const quote = line[start];
    let index = start + 1;

    while (index < line.length) {
        if (line[index] === '\\') {
            index += 2;
            continue;
        }

        if (line[index] === quote) {
            index += 1;
            break;
        }

        index += 1;
    }

    return line.slice(start, index);
};

const tokenizeCppLine = (line) => {
    const tokens = [];
    let index = 0;

    while (index < line.length) {
        const rest = line.slice(index);

        if (rest.startsWith('//')) {
            pushToken(tokens, rest, 'comment');
            break;
        }

        if (line[index] === '#') {
            pushToken(tokens, rest, 'directive');
            break;
        }

        if (line[index] === '"' || line[index] === "'") {
            const quoted = readQuotedToken(line, index);
            pushToken(tokens, quoted, 'string');
            index += quoted.length;
            continue;
        }

        const numberMatch = rest.match(/^\d+(?:\.\d+)?/);
        if (numberMatch) {
            pushToken(tokens, numberMatch[0], 'number');
            index += numberMatch[0].length;
            continue;
        }

        const wordMatch = rest.match(/^[A-Za-z_]\w*/);
        if (wordMatch) {
            const word = wordMatch[0];
            const afterWord = line.slice(index + word.length);
            const tokenType = cppTypes.has(word)
                ? 'type'
                : cppKeywords.has(word)
                    ? 'keyword'
                    : cppBuiltins.has(word)
                        ? 'builtin'
                        : /^\s*\(/.test(afterWord)
                            ? 'function'
                            : 'plain';

            pushToken(tokens, word, tokenType);
            index += word.length;
            continue;
        }

        const operatorMatch = rest.match(/^(==|!=|<=|>=|\+\+|--|&&|\|\||<<|>>|[+\-*/%=<>!&|?:;,.[\]{}()])/);
        if (operatorMatch) {
            pushToken(tokens, operatorMatch[0], 'operator');
            index += operatorMatch[0].length;
            continue;
        }

        pushToken(tokens, line[index], 'plain');
        index += 1;
    }

    return tokens;
};

const highlightCppCode = (code) => {
    const normalizedCode = String(code ?? '').replace(/\n$/, '');

    return normalizedCode.split('\n').map((line, lineIndex) => (
        <span key={`line-${lineIndex}`} className="block min-h-7">
            {tokenizeCppLine(line).map((token, tokenIndex) => (
                <span key={`${lineIndex}-${tokenIndex}`} className={tokenClassMap[token.type]}>
                    {token.text}
                </span>
            ))}
        </span>
    ));
};

export function CodeBlock({ children }) {
    const highlightedCode = useMemo(() => highlightCppCode(children), [children]);

    return (
        <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm leading-7 shadow-inner ring-1 ring-white/10">
            <code className="font-mono">{highlightedCode}</code>
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

function TracerCode({ lines, activeLines }) {
    return (
        <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm leading-7 shadow-inner ring-1 ring-white/10">
            <code className="font-mono">
                {lines.map((tokens, lineIndex) => {
                    const active = activeLines.includes(lineIndex);
                    return (
                        <span
                            key={`line-${lineIndex}`}
                            className={`-mx-2 block min-h-7 rounded px-2 transition-colors ${active ? 'bg-indigo-500/25 ring-1 ring-inset ring-indigo-400/40' : ''}`}
                        >
                            {tokens.map((token, tokenIndex) => (
                                <span key={`${lineIndex}-${tokenIndex}`} className={tokenClassMap[token.type]}>
                                    {token.text}
                                </span>
                            ))}
                        </span>
                    );
                })}
            </code>
        </pre>
    );
}

/**
 * 交互式代码执行追踪器。课程只需提供原始代码字符串与逐步的 trace 数据，
 * 组件负责：当前执行行高亮、实时变量卡片、逐步累积的追踪表、最终输出横幅。
 *
 * steps: Array<{
 *   active?: number[]   // 本步高亮的代码行下标（从 0 起）
 *   vars?: object       // 本步的变量快照，配合 varOrder 显示
 *   action?: string     // 推进到「本步」的按钮文案（如「下一轮」）
 *   row?: any[]         // 本步要追加到追踪表的一行（单元格数组，长度 = columns）
 *   exit?: ReactNode    // 本步追加一条跨列的「跳出/结束」行
 *   output?: ReactNode  // 到达本步后显示的输出横幅
 * }>
 */
export function CodeTracer({ title = '执行追踪器', code, varOrder = [], columns = [], steps = [], hint }) {
    const lines = useMemo(
        () => String(code ?? '').replace(/\n$/, '').split('\n').map(tokenizeCppLine),
        [code],
    );
    const [step, setStep] = useState(0);
    const lastStep = steps.length - 1;
    const safeStep = Math.min(step, lastStep);
    const current = steps[safeStep] ?? {};
    const revealed = steps.slice(0, safeStep + 1);
    const tableRows = revealed.filter((entry) => entry.row || entry.exit);
    const output = [...revealed].reverse().find((entry) => entry.output)?.output;
    const finished = step >= lastStep;
    const nextLabel = steps[safeStep + 1]?.action ?? '下一步';

    return (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <PlayCircle className="text-indigo-700" />
                    <h3 className="text-xl font-black text-slate-950">{title}</h3>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setStep((value) => Math.min(value + 1, lastStep))}
                        disabled={finished}
                        className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-black text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                        <SkipForward size={16} />
                        {finished ? '已结束' : nextLabel}
                    </button>
                    <button
                        type="button"
                        onClick={() => setStep(0)}
                        className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm font-black text-slate-600 ring-1 ring-slate-200 transition hover:bg-slate-50"
                    >
                        <RotateCcw size={16} />
                        重置
                    </button>
                </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
                <div className="space-y-4">
                    <TracerCode lines={lines} activeLines={current.active ?? []} />
                    {varOrder.length > 0 && (
                        <div className={`grid gap-3 ${varOrder.length >= 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                            {varOrder.map((name) => (
                                <div key={name} className="rounded-xl bg-white p-4 text-center ring-1 ring-indigo-100">
                                    <div className="text-xs font-black uppercase tracking-wide text-slate-400">{name}</div>
                                    <div className="mt-1 font-mono text-3xl font-black text-indigo-700">
                                        {current.vars?.[name] ?? '–'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-center text-sm">
                            <thead>
                                <tr className="text-xs font-black uppercase tracking-wide text-slate-400">
                                    {columns.map((header) => (
                                        <th key={header} className="border-b border-slate-200 px-2 py-2">{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="font-mono font-bold text-slate-700">
                                {tableRows.map((entry, entryIndex) => (
                                    entry.exit ? (
                                        <tr key={`exit-${entryIndex}`} className="bg-rose-50">
                                            <td className="px-2 py-2 text-rose-600" colSpan={columns.length}>
                                                {entry.exit}
                                            </td>
                                        </tr>
                                    ) : (
                                        <tr key={`row-${entryIndex}`} className="odd:bg-slate-50">
                                            {entry.row.map((cell, cellIndex) => (
                                                <td
                                                    key={cellIndex}
                                                    className={`px-2 py-2 ${cellIndex === 0 ? 'font-sans font-black text-slate-900' : ''}`}
                                                >
                                                    {cell}
                                                </td>
                                            ))}
                                        </tr>
                                    )
                                ))}
                                {tableRows.length === 0 && (
                                    <tr>
                                        <td className="px-2 py-6 font-sans text-sm font-bold text-slate-400" colSpan={columns.length}>
                                            {hint ?? '点击右上角按钮，逐步看变量怎么变 →'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {output && (
                        <div className="mt-4 flex items-center gap-2 rounded-lg bg-slate-950 p-4 font-mono text-green-400">
                            <Flag size={18} className="text-green-400" />
                            {output}
                        </div>
                    )}
                </div>
            </div>
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
    topSupport = null,
    bottomSupport = null,
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
                                {topSupport}
                                {activeContent}
                            </section>
                        )}
                        {activeSection !== 1 && (
                            <section className="space-y-6">
                                {activeContent}
                            </section>
                        )}
                        {activeSection === sections.length && bottomSupport}
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
