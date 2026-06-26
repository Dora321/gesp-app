import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    AlertTriangle,
    ArrowLeftRight,
    ArrowRight,
    BookOpen,
    Calculator,
    CheckCircle2,
    ClipboardCheck,
    Code2,
    Menu,
    X
} from 'lucide-react';
import CppL2LessonSupport from '../../../components/CppL2LessonSupport';
import CodeSnippet from '../CodeSnippet';
import { MasteryCheck, PredictCheck, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '问题场景' },
    { id: 2, title: '类型提升', category: '核心概念' },
    { id: 3, title: '强制转换', category: '核心概念' },
    { id: 4, title: '整数除法', category: '高频陷阱' },
    { id: 5, title: '字符与数字', category: '真题连接' },
    { id: 6, title: '练习与作业', category: '复盘输出' },
];

const conversionRules = [
    {
        title: '自动类型提升',
        code: 'double ans = 5 / 2.0;',
        result: '2.5',
        note: '表达式里出现 double，int 会先提升成 double 再计算。',
    },
    {
        title: '整数除法截断',
        code: 'int ans = 5 / 2;',
        result: '2',
        note: '两个整数相除，结果仍按整数处理，小数部分直接丢掉。',
    },
    {
        title: '显式强制转换',
        code: 'double ans = (double)5 / 2;',
        result: '2.5',
        note: '先把 5 变成 double，整个除法就按小数计算。',
    },
];

const quiz = [
    {
        question: 'cout << 7 / 2; 输出什么？',
        answer: '3',
        reason: '7 和 2 都是 int，发生整数除法，小数部分被截断。',
    },
    {
        question: 'cout << 7 / 2.0; 输出什么？',
        answer: '3.5',
        reason: '2.0 是 double，7 会提升为 double，再进行小数除法。',
    },
    {
        question: "cout << (int)'A'; 输出什么？",
        answer: '65',
        reason: "'A' 的 ASCII 编码是 65，强制转换为 int 后输出编码值。",
    },
];

const typeMasteryItems = [
    {
        label: '能判断一个表达式的结果类型。',
        evidence: '只要有 double 就提升成 double，全是 int 结果就是 int。',
        retryHint: '回到类型提升实验室试不同组合。',
    },
    {
        label: '能解释整数除法是截断而非四舍五入。',
        evidence: '7 / 2 = 3、9 / 2 = 4，小数部分直接丢掉。',
        retryHint: '回到「整数除法」一节。',
    },
    {
        label: '能用强制转换修正整数除法。',
        evidence: '写 (double)a / b 或 5 / 2.0，让至少一边变 double。',
        retryHint: '回到推荐写法，别等赋值给 double 才补救。',
    },
    {
        label: '能在 char 和 int 之间转换。',
        evidence: "(int)'A'=65、(char)66='B'，记住 '0'=48、'A'=65、'a'=97。",
        retryHint: '回到「记忆坐标」。',
    },
];

function CodeBlock({ children }) {
    return <CodeSnippet code={children} />;
}

function RuleCard({ rule }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-3">
                <h4 className="font-black text-slate-900">{rule.title}</h4>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
                    输出 {rule.result}
                </span>
            </div>
            <CodeBlock>{rule.code}</CodeBlock>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{rule.note}</p>
        </div>
    );
}

function ConversionLab() {
    const [left, setLeft] = useState('int');
    const [right, setRight] = useState('double');

    const result = useMemo(() => {
        if (left === 'double' || right === 'double') {
            return {
                type: 'double',
                value: '2.5',
                note: '只要表达式里有一个 double，另一个 int 会被提升。',
            };
        }

        if (left === 'char' || right === 'char') {
            return {
                type: 'int',
                value: '67',
                note: 'char 参与算术时会按 ASCII 编码参与计算。',
            };
        }

        return {
            type: 'int',
            value: '2',
            note: '两个 int 相除仍是 int，小数部分不会保留。',
        };
    }, [left, right]);

    const options = ['int', 'double', 'char'];

    return (
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Calculator className="text-blue-700" />
                <h3 className="text-xl font-black text-slate-950">类型提升实验室</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
                <div>
                    <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">左操作数</label>
                    <select
                        value={left}
                        onChange={(event) => setLeft(event.target.value)}
                        className="w-full rounded-lg border border-blue-200 bg-white px-4 py-3 font-bold text-slate-800 outline-none focus:border-blue-500"
                    >
                        {options.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                <ArrowLeftRight className="hidden text-blue-500 md:block" />
                <div>
                    <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">右操作数</label>
                    <select
                        value={right}
                        onChange={(event) => setRight(event.target.value)}
                        className="w-full rounded-lg border border-blue-200 bg-white px-4 py-3 font-bold text-slate-800 outline-none focus:border-blue-500"
                    >
                        {options.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="mt-5 rounded-xl bg-white p-5 ring-1 ring-blue-100">
                <div className="text-sm font-black text-slate-500">表达式结果类型</div>
                <div className="mt-2 flex flex-wrap items-end gap-4">
                    <span className="text-4xl font-black text-blue-700">{result.type}</span>
                    <span className="text-xl font-black text-slate-800">示例结果：{result.value}</span>
                </div>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{result.note}</p>
            </div>
        </div>
    );
}

export default function CppL2Lesson3() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState(1);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const currentIndex = sections.findIndex((section) => section.id === activeSection);
    const currentSection = sections[currentIndex] || sections[0];

    const goPrev = () => setActiveSection(Math.max(1, activeSection - 1));
    const goNext = () => {
        if (activeSection < sections.length) {
            setActiveSection(activeSection + 1);
            return;
        }

        navigate('/lesson/2/4');
    };

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-800">
            <div className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-slate-200 bg-white p-4 shadow-sm md:hidden">
                <h1 className="text-lg font-black text-blue-700">C++ 进阶第 3 课</h1>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="打开课程目录">
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <aside className={`fixed inset-y-0 left-0 z-50 flex h-full w-72 flex-col border-r border-slate-200 bg-white shadow-lg transition-transform md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="border-b border-slate-100 p-6">
                    <Link to="/" className="font-black text-blue-600">返回首页</Link>
                    <h2 className="mt-2 text-sm text-slate-500">C++ 进阶 · L2-3 类型转换</h2>
                </div>
                <div className="flex-1 overflow-y-auto py-4">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => {
                                setActiveSection(section.id);
                                setIsMobileMenuOpen(false);
                            }}
                            className={`w-full px-6 py-3 text-left transition-colors ${activeSection === section.id ? 'border-r-4 border-blue-600 bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
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
                        <h2 className="text-lg font-black text-slate-950">第 3 课：数据变形记 · 类型转换</h2>
                        <p className="text-xs font-bold text-slate-500">{currentSection.category} / {currentSection.title}</p>
                    </div>
                    <div className="hidden rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700 sm:block">
                        {activeSection}/{sections.length}
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto">
                    <div className="mx-auto max-w-5xl space-y-8 p-6 sm:p-10">
                        {activeSection === 1 && <CppL2LessonSupport lessonId={3} />}
                        {activeSection === 1 && (
                            <section className="space-y-6">
                                <div className="rounded-3xl bg-gradient-to-br from-blue-700 to-indigo-800 p-8 text-white shadow-xl">
                                    <div className="mb-4 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-black uppercase tracking-wider">
                                        Lesson 3
                                    </div>
                                    <h1 className="text-4xl font-black tracking-tight">同一个数字，为什么算出来不一样？</h1>
                                    <p className="mt-4 max-w-2xl text-lg font-semibold leading-8 text-blue-100">
                                        C++ 会根据数据类型决定计算方式。今天要把 int、double、char 的转换规则讲清楚，尤其是 GESP 二级常考的整数除法和 ASCII 转换。
                                    </p>
                                </div>

                                <div className="grid gap-4 md:grid-cols-3">
                                    {['能判断表达式结果类型', '能解释整数除法截断', '能用强制转换修正计算'].map((goal) => (
                                        <div key={goal} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                                            <CheckCircle2 className="mb-3 text-emerald-600" />
                                            <p className="font-black text-slate-800">{goal}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                                    <div className="mb-3 flex items-center gap-2 text-amber-800">
                                        <AlertTriangle />
                                        <h3 className="text-xl font-black">本节高频坑</h3>
                                    </div>
                                    <p className="font-semibold leading-7 text-amber-900">
                                        `5 / 2` 的结果不是 2.5，而是 2。因为两个操作数都是整数，C++ 会先按整数除法完成计算，再把结果交给变量。
                                    </p>
                                </div>
                            </section>
                        )}

                        {activeSection === 2 && (
                            <section className="space-y-6">
                                <div>
                                    <h3 className="text-3xl font-black text-slate-950">自动类型提升：谁更“宽”，听谁的</h3>
                                    <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                        当一个表达式里混合不同类型时，C++ 会把较窄的类型提升为较宽的类型。常见顺序可以先记成：char 会先变成 int，int 遇到 double 会变成 double。
                                    </p>
                                </div>

                                <ConversionLab />

                                <div className="grid gap-4 md:grid-cols-3">
                                    {conversionRules.map((rule) => (
                                        <RuleCard key={rule.title} rule={rule} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {activeSection === 3 && (
                            <section className="space-y-6">
                                <div>
                                    <h3 className="text-3xl font-black text-slate-950">强制转换：明确告诉编译器怎么变</h3>
                                    <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                        自动转换是编译器帮你判断，强制转换是程序员主动指定。考试里最常见的是把 int 变成 double，避免整数除法截断。
                                    </p>
                                </div>

                                <div className="grid gap-5 lg:grid-cols-2">
                                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                        <h4 className="mb-4 flex items-center gap-2 text-xl font-black text-slate-900">
                                            <Code2 className="text-blue-600" />
                                            推荐写法
                                        </h4>
                                        <CodeBlock>{`int a = 5, b = 2;
double ans = (double)a / b;
cout << ans;  // 2.5`}</CodeBlock>
                                        <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                                            只要把除法的一边先转成 double，另一边会自动提升，结果就会保留小数。
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
                                        <h4 className="mb-4 flex items-center gap-2 text-xl font-black text-red-900">
                                            <AlertTriangle />
                                            不要这样掉坑
                                        </h4>
                                        <CodeBlock>{`int a = 5, b = 2;
double ans = a / b;
cout << ans;  // 2`}</CodeBlock>
                                        <p className="mt-4 text-sm font-semibold leading-6 text-red-800">
                                            右边先做完整数除法得到 2，再赋值给 double。变量是 double，也救不回已经丢掉的小数。
                                        </p>
                                    </div>
                                </div>
                            </section>
                        )}

                        {activeSection === 4 && (
                            <section className="space-y-6">
                                <div>
                                    <h3 className="text-3xl font-black text-slate-950">整数除法：截断，不是四舍五入</h3>
                                    <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                        C++ 的整数除法会直接去掉小数部分。`7 / 2` 是 3，`9 / 4` 是 2，`1 / 3` 是 0。
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="mb-5 flex items-center gap-2">
                                        <Calculator className="text-indigo-600" />
                                        <h4 className="text-xl font-black text-slate-900">三步判断法</h4>
                                    </div>
                                    <ol className="grid gap-4 md:grid-cols-3">
                                        {[
                                            '先看除号两边的类型',
                                            '如果都是整数，先按整数除法算',
                                            '要小数，就让至少一边变成 double',
                                        ].map((step, index) => (
                                            <li key={step} className="rounded-xl bg-slate-50 p-4">
                                                <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-black text-white">
                                                    {index + 1}
                                                </span>
                                                <p className="font-black leading-6 text-slate-800">{step}</p>
                                            </li>
                                        ))}
                                    </ol>
                                </div>

                                <CodeBlock>{`cout << 10 / 4;        // 2
cout << 10 / 4.0;      // 2.5
cout << (double)10 / 4;// 2.5`}</CodeBlock>

                                <div className="grid gap-4 lg:grid-cols-3">
                                    <PredictCheck
                                        prompt={'double ans = 5 / 2; ans 是 2.5 吗？'}
                                        options={['是 2.5', '是 2（右边先做了整数除法）']}
                                        correctIndex={1}
                                        explanation="5 和 2 都是 int，先算 5 / 2 = 2（整数除法），再赋给 double 还是 2.0。变量是 double 也救不回已经丢掉的小数。要写 5 / 2.0 或 (double)5 / 2。"
                                        misconception="以为赋给 double 变量就会自动保留小数。"
                                    />
                                    <PredictCheck
                                        prompt={'整数除法 7 / 2 = 3，那 9 / 2 等于几？'}
                                        options={['5（四舍五入）', '4（去掉小数部分）']}
                                        correctIndex={1}
                                        explanation="整数除法是直接去掉小数部分（截断），不是四舍五入。9 / 2 = 4.5 → 4。"
                                        misconception="以为整数除法会四舍五入。"
                                    />
                                    <PredictCheck
                                        prompt={"cout << (int)'A'; 会输出什么？"}
                                        options={['A', "65（'A' 的 ASCII 码）"]}
                                        correctIndex={1}
                                        explanation="char 在内存里存的是编码，'A' 的 ASCII 是 65，转成 int 就输出编码值。"
                                        misconception="以为 (int)'A' 还是输出字母 A。"
                                    />
                                </div>
                            </section>
                        )}

                        {activeSection === 5 && (
                            <section className="space-y-6">
                                <div>
                                    <h3 className="text-3xl font-black text-slate-950">字符与数字：char 也能参加计算</h3>
                                    <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                        char 在内存里本质上也存着一个编码。把字符转成 int，会看到它的 ASCII 编码；把编码转成 char，会得到对应字符。
                                    </p>
                                </div>

                                <div className="grid gap-5 lg:grid-cols-2">
                                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                        <h4 className="mb-3 text-xl font-black text-slate-900">字符变数字</h4>
                                        <CodeBlock>{`char c = 'A';
cout << (int)c;  // 65`}</CodeBlock>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                        <h4 className="mb-3 text-xl font-black text-slate-900">数字变字符</h4>
                                        <CodeBlock>{`int x = 66;
cout << (char)x; // B`}</CodeBlock>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
                                    <h4 className="mb-3 flex items-center gap-2 text-xl font-black text-emerald-900">
                                        <BookOpen />
                                        记忆坐标
                                    </h4>
                                    <p className="font-semibold leading-7 text-emerald-900">
                                        `'0'` 是 48，`'A'` 是 65，`'a'` 是 97。判断字符大小、大小写转换、加密偏移时都会用到这些基准点。
                                    </p>
                                </div>
                            </section>
                        )}

                        {activeSection === 6 && (
                            <section className="space-y-6">
                                <div>
                                    <h3 className="text-3xl font-black text-slate-950">课堂练习与课后输出</h3>
                                    <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                        这一节的重点不是背语法，而是能解释“为什么输出这个结果”。每道题都要写出类型判断过程。
                                    </p>
                                </div>

                                <div className="grid gap-4 md:grid-cols-3">
                                    {quiz.map((item) => (
                                        <div key={item.question} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                            <h4 className="min-h-[3rem] font-black leading-6 text-slate-900">{item.question}</h4>
                                            <div className="mt-4 rounded-lg bg-blue-50 px-3 py-2 text-sm font-black text-blue-700">
                                                答案：{item.answer}
                                            </div>
                                            <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{item.reason}</p>
                                        </div>
                                    ))}
                                </div>

                                <TransferCheck
                                    prompt="换个例子：double x = 3.9; int y = x; 执行后 y 是多少？为什么不是 4？"
                                    hint="double 转 int 是「截断」（直接去掉小数），不是四舍五入。"
                                    answer="y = 3。"
                                    steps={[
                                        'x = 3.9，赋给 int y 时发生类型转换。',
                                        'int 转换是截断：直接丢掉小数 .9，不进位。',
                                        '所以 y = 3（不是 4）。要四舍五入得用 round。',
                                    ]}
                                />
                                <MasteryCheck
                                    title="C++ L2-3 类型转换离开前检查"
                                    description="类型转换最怕“以为 double 变量能救回整数除法、整数除法当成四舍五入”。勾选前先口算 5/2、9/2、(int)'A'。"
                                    items={typeMasteryItems}
                                />

                                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <h4 className="mb-4 flex items-center gap-2 text-xl font-black text-slate-900">
                                        <ClipboardCheck className="text-blue-600" />
                                        课后作业
                                    </h4>
                                    <ul className="space-y-3 text-sm font-semibold leading-6 text-slate-700">
                                        <li className="flex gap-2"><CheckCircle2 className="mt-1 text-emerald-600" size={16} />整理 5 个整数除法表达式，并写出是否会截断。</li>
                                        <li className="flex gap-2"><CheckCircle2 className="mt-1 text-emerald-600" size={16} />写一个程序：输入两个整数，分别输出整数除法结果和小数除法结果。</li>
                                        <li className="flex gap-2"><CheckCircle2 className="mt-1 text-emerald-600" size={16} />记住 `'0'`、`'A'`、`'a'` 三个 ASCII 基准值，并各写一个转换例子。</li>
                                    </ul>
                                </div>
                            </section>
                        )}
                        {activeSection === sections.length && <CppL2LessonSupport lessonId={3} placement="bottom" />}
                    </div>
                </main>

                <footer className="flex h-20 items-center justify-between border-t border-slate-200 bg-white px-6">
                    <button
                        onClick={goPrev}
                        disabled={activeSection === 1}
                        className="rounded-lg px-4 py-2 text-sm font-black text-slate-500 transition hover:bg-slate-100 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        上一节
                    </button>
                    <button
                        onClick={goNext}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-500"
                    >
                        {activeSection === sections.length ? '进入下一课' : '下一节'}
                        <ArrowRight size={16} />
                    </button>
                </footer>
            </div>
        </div>
    );
}
