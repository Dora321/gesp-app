import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    AlertTriangle,
    ArrowRight,
    BookOpen,
    CheckCircle2,
    ClipboardCheck,
    Code2,
    GitBranch,
    ListChecks,
    Menu,
    PlayCircle,
    ShieldCheck,
    X
} from 'lucide-react';
import CppL2LessonSupport from '../../../components/CppL2LessonSupport';
import CodeSnippet from '../CodeSnippet';
import { MasteryCheck, PredictCheck, TransferCheck } from '../CppLessonShell';

const switchMasteryItems = [
    {
        label: '能读懂 switch-case 的执行顺序。',
        evidence: '从匹配的 case 往下执行，遇到 break 才停。',
        retryHint: '回到 break 穿透实验，逐句跟一遍。',
    },
    {
        label: '能用 break 防止穿透。',
        evidence: '每个 case 末尾写 break，避免落进下一个 case。',
        retryHint: '回到「考试提醒」。',
    },
    {
        label: '能区分 switch 和 if 的适用场景。',
        evidence: '固定值用 switch，范围 / 大小判断用 if。',
        retryHint: '回到「选择口诀」。',
    },
    {
        label: '能用 default 兜底，并知道 case 后要常量。',
        evidence: 'default 处理没命中；case 后是常量，不能写范围或变量。',
        retryHint: '回到 default 兜底一节。',
    },
];

const sections = [
    { id: 1, title: '课程导入', category: '菜单选择' },
    { id: 2, title: 'switch 结构', category: '核心语法' },
    { id: 3, title: 'break 防穿透', category: '高频陷阱' },
    { id: 4, title: 'default 兜底', category: '鲁棒性' },
    { id: 5, title: 'if 对比', category: '选择策略' },
    { id: 6, title: '练习与作业', category: '复盘输出' },
];

const menuItems = {
    1: '开始游戏',
    2: '读取存档',
    3: '设置音量',
    4: '退出程序',
};

const quiz = [
    {
        question: 'switch 后面的表达式可以是 double 吗？',
        answer: '不建议，也不能作为标准 case 匹配类型',
        reason: 'switch 常用于整数、字符、枚举等离散值；小数比较不稳定，应使用 if。',
    },
    {
        question: 'case 1 后面忘记 break 会怎样？',
        answer: '继续执行后面的 case',
        reason: 'switch 命中入口后会顺着往下跑，直到遇到 break 或整个 switch 结束。',
    },
    {
        question: 'default 必须写吗？',
        answer: '语法上不是必须，但强烈建议写',
        reason: 'default 能处理所有未匹配输入，避免程序遇到异常选项时没有反馈。',
    },
];

function CodeBlock({ children }) {
    return <CodeSnippet code={children} />;
}

function MenuSimulator() {
    const [choice, setChoice] = useState('2');

    const output = useMemo(() => menuItems[choice] ?? '无效选项，请重新输入', [choice]);

    return (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <PlayCircle className="text-indigo-700" />
                <h3 className="text-xl font-black text-slate-950">游戏菜单模拟器</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">
                        输入菜单编号
                    </label>
                    <select
                        value={choice}
                        onChange={(event) => setChoice(event.target.value)}
                        className="w-full rounded-lg border border-indigo-200 bg-white px-4 py-3 font-black text-slate-800 outline-none focus:border-indigo-500"
                    >
                        <option value="1">1 - 开始游戏</option>
                        <option value="2">2 - 读取存档</option>
                        <option value="3">3 - 设置音量</option>
                        <option value="4">4 - 退出程序</option>
                        <option value="9">9 - 异常输入</option>
                    </select>
                    <div className="mt-5 rounded-lg bg-slate-950 p-4 font-mono text-green-400">
                        输出：{output}
                    </div>
                </div>
                <CodeBlock>{`switch (choice) {
  case 1:
    cout << "开始游戏";
    break;
  case 2:
    cout << "读取存档";
    break;
  case 3:
    cout << "设置音量";
    break;
  case 4:
    cout << "退出程序";
    break;
  default:
    cout << "无效选项";
}`}</CodeBlock>
            </div>
        </div>
    );
}

function FallthroughDemo() {
    const [hasBreak, setHasBreak] = useState(true);

    const trace = hasBreak
        ? ['命中 case 2', '输出：读取存档', '遇到 break，离开 switch']
        : ['命中 case 2', '输出：读取存档', '继续进入 case 3', '输出：设置音量', '继续进入 default', '输出：无效选项'];

    return (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <AlertTriangle className="text-amber-700" />
                    <h3 className="text-xl font-black text-amber-950">break 穿透实验</h3>
                </div>
                <button
                    onClick={() => setHasBreak(!hasBreak)}
                    className={`rounded-full px-4 py-2 text-sm font-black transition ${hasBreak ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}
                >
                    {hasBreak ? '当前：有 break' : '当前：缺少 break'}
                </button>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
                <CodeBlock>{hasBreak ? `case 2:
  cout << "读取存档";
  break;
case 3:
  cout << "设置音量";
  break;` : `case 2:
  cout << "读取存档";
case 3:
  cout << "设置音量";
default:
  cout << "无效选项";`}</CodeBlock>
                <ol className="space-y-3">
                    {trace.map((step, index) => (
                        <li key={`${step}-${index}`} className="flex gap-3 rounded-xl bg-white p-3 text-sm font-bold text-slate-700 ring-1 ring-amber-100">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500 text-white">
                                {index + 1}
                            </span>
                            {step}
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

function ChoiceGuide() {
    const rows = [
        ['switch', '一个变量等于若干固定值', '菜单编号、星期、等级、字符选项'],
        ['if / else if', '条件是范围或复杂逻辑', '分数区间、多个变量组合、大小比较'],
    ];

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-3 bg-slate-900 text-sm font-black text-white">
                <div className="p-4">结构</div>
                <div className="p-4">适合场景</div>
                <div className="p-4">典型例子</div>
            </div>
            {rows.map(([name, scene, example]) => (
                <div key={name} className="grid grid-cols-3 border-t border-slate-200 text-sm font-semibold text-slate-700">
                    <div className="p-4 font-black text-slate-950">{name}</div>
                    <div className="p-4">{scene}</div>
                    <div className="p-4">{example}</div>
                </div>
            ))}
        </div>
    );
}

export default function CppL2Lesson4() {
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

        navigate('/lesson/2/5');
    };

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-800">
            <div className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-slate-200 bg-white p-4 shadow-sm md:hidden">
                <h1 className="text-lg font-black text-blue-700">C++ 进阶第 4 课</h1>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="打开课程目录">
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <aside className={`fixed inset-y-0 left-0 z-50 flex h-full w-72 flex-col border-r border-slate-200 bg-white shadow-lg transition-transform md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="border-b border-slate-100 p-6">
                    <Link to="/" className="font-black text-blue-600">返回首页</Link>
                    <h2 className="mt-2 text-sm text-slate-500">C++ 进阶 · L2-4 Switch</h2>
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
                        <h2 className="text-lg font-black text-slate-950">第 4 课：神奇的开关 · Switch</h2>
                        <p className="text-xs font-bold text-slate-500">{currentSection.category} / {currentSection.title}</p>
                    </div>
                    <div className="hidden rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700 sm:block">
                        {activeSection}/{sections.length}
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto">
                    <div className="mx-auto max-w-5xl space-y-8 p-6 sm:p-10">
                        {activeSection === 1 && <CppL2LessonSupport lessonId={4} />}
                        {activeSection === 1 && (
                            <section className="space-y-6">
                                <div className="rounded-3xl bg-gradient-to-br from-indigo-700 to-slate-900 p-8 text-white shadow-xl">
                                    <div className="mb-4 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-black uppercase tracking-wider">
                                        Lesson 4
                                    </div>
                                    <h1 className="text-4xl font-black tracking-tight">选项很多时，别让 if 排成长队</h1>
                                    <p className="mt-4 max-w-2xl text-lg font-semibold leading-8 text-indigo-100">
                                        游戏菜单、星期判断、等级选项这类“固定编号匹配”场景，用 switch 更清楚。今天要把 case、break、default 这三个关键件装稳。
                                    </p>
                                </div>

                                <div className="grid gap-4 md:grid-cols-3">
                                    {['读懂 switch-case 执行顺序', '知道 break 防止穿透', '会用 default 处理异常输入'].map((goal) => (
                                        <div key={goal} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                                            <CheckCircle2 className="mb-3 text-emerald-600" />
                                            <p className="font-black text-slate-800">{goal}</p>
                                        </div>
                                    ))}
                                </div>

                                <MenuSimulator />
                            </section>
                        )}

                        {activeSection === 2 && (
                            <section className="space-y-6">
                                <div>
                                    <h3 className="text-3xl font-black text-slate-950">switch 结构：先算表达式，再找入口</h3>
                                    <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                        switch 会先计算括号里的表达式，然后寻找值相同的 case。找到后从该位置开始执行语句。
                                    </p>
                                </div>

                                <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr]">
                                    <CodeBlock>{`int choice;
cin >> choice;

switch (choice) {
  case 1:
    cout << "开始游戏";
    break;
  case 2:
    cout << "读取存档";
    break;
  default:
    cout << "无效选项";
}`}</CodeBlock>
                                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                        <h4 className="mb-4 flex items-center gap-2 text-xl font-black text-slate-900">
                                            <GitBranch className="text-indigo-600" />
                                            执行路线
                                        </h4>
                                        <ol className="space-y-3 text-sm font-semibold text-slate-700">
                                            {['计算 choice 的值', '寻找匹配的 case', '从匹配处开始执行', '遇到 break 后跳出 switch'].map((step, index) => (
                                                <li key={step} className="flex gap-3">
                                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white">{index + 1}</span>
                                                    <span className="leading-7">{step}</span>
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                </div>
                            </section>
                        )}

                        {activeSection === 3 && (
                            <section className="space-y-6">
                                <div>
                                    <h3 className="text-3xl font-black text-slate-950">break：每扇门后面的刹车</h3>
                                    <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                        case 只是入口，不是房间。没有 break，程序会继续向下执行后续 case，这叫穿透。
                                    </p>
                                </div>

                                <FallthroughDemo />

                                <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
                                    <h4 className="mb-3 flex items-center gap-2 text-xl font-black text-red-900">
                                        <AlertTriangle />
                                        考试提醒
                                    </h4>
                                    <p className="font-semibold leading-7 text-red-800">
                                        阅读 switch 程序时，不要看到匹配 case 就停。要继续往下看有没有 break，输出题尤其容易在这里设坑。
                                    </p>
                                </div>

                                <div className="grid gap-4 lg:grid-cols-3">
                                    <PredictCheck
                                        prompt={'x=1，case 1: cout<<"A"; case 2: cout<<"B"; break; （case 1 没 break）输出什么？'}
                                        options={['A', 'AB（穿透到 case 2）']}
                                        correctIndex={1}
                                        explanation="case 1 没写 break，匹配后会继续往下执行 case 2 的语句，直到遇到 break。所以输出 AB。每个 case 后通常都要写 break。"
                                        misconception="以为匹配 case 1 执行完就自动停下。"
                                    />
                                    <PredictCheck
                                        prompt={'switch 能直接对 score >= 90 这种范围做判断吗？'}
                                        options={['能', '不能，switch 只能匹配等于某个固定值']}
                                        correctIndex={1}
                                        explanation="case 后面必须是一个具体的常量值（如 case 1、case 'A'），不能写范围或条件。范围判断要用 if / else if。"
                                        misconception="以为 switch 也能做范围或大小比较。"
                                    />
                                    <PredictCheck
                                        prompt={'case 后面能写一个变量，比如 case x: 吗？'}
                                        options={['能', '不能，case 后必须是常量']}
                                        correctIndex={1}
                                        explanation="case 标签必须是编译期常量（整数或字符常量），不能是变量或表达式。"
                                        misconception="以为 case 后面可以放任意变量或表达式。"
                                    />
                                </div>
                            </section>
                        )}

                        {activeSection === 4 && (
                            <section className="space-y-6">
                                <div>
                                    <h3 className="text-3xl font-black text-slate-950">default：所有没匹配上的兜底方案</h3>
                                    <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                        default 会处理没有任何 case 命中的情况。它可以放在最后，也可以放在中间，但放在最后最清楚。
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
                                    <h4 className="mb-4 flex items-center gap-2 text-xl font-black text-emerald-900">
                                        <ShieldCheck />
                                        一个稳健菜单应该这样写
                                    </h4>
                                    <CodeBlock>{`switch (level) {
  case 1:
    cout << "青铜";
    break;
  case 2:
    cout << "白银";
    break;
  case 3:
    cout << "黄金";
    break;
  default:
    cout << "等级输入错误";
}`}</CodeBlock>
                                </div>

                                <div className="grid gap-4 md:grid-cols-3">
                                    {['能提示错误输入', '让程序反馈更完整', '方便调试异常数据'].map((item) => (
                                        <div key={item} className="rounded-xl bg-white p-5 font-black text-slate-800 shadow-sm ring-1 ring-slate-200">
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {activeSection === 5 && (
                            <section className="space-y-6">
                                <div>
                                    <h3 className="text-3xl font-black text-slate-950">switch 不是 if 的替代品</h3>
                                    <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                        switch 适合“一个值等于若干固定选项”。如果题目是范围判断、多个条件组合、大小比较，还是用 if / else if。
                                    </p>
                                </div>

                                <ChoiceGuide />

                                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
                                    <h4 className="mb-3 flex items-center gap-2 text-xl font-black text-blue-950">
                                        <ListChecks />
                                        选择口诀
                                    </h4>
                                    <p className="font-semibold leading-7 text-blue-900">
                                        “固定选项用 switch，范围条件用 if。”看到 <code>score &gt;= 90</code> 这种范围题，不要硬套 switch。
                                    </p>
                                </div>
                            </section>
                        )}

                        {activeSection === 6 && (
                            <section className="space-y-6">
                                <div>
                                    <h3 className="text-3xl font-black text-slate-950">课堂练习与课后输出</h3>
                                    <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                        每道题都按“表达式值 -&gt; 匹配 case -&gt; 是否 break -&gt; default 是否执行”这条线推。
                                    </p>
                                </div>

                                <div className="grid gap-4 md:grid-cols-3">
                                    {quiz.map((item) => (
                                        <div key={item.question} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                            <h4 className="min-h-[3.5rem] font-black leading-6 text-slate-900">{item.question}</h4>
                                            <div className="mt-4 rounded-lg bg-indigo-50 px-3 py-2 text-sm font-black text-indigo-700">
                                                答案：{item.answer}
                                            </div>
                                            <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{item.reason}</p>
                                        </div>
                                    ))}
                                </div>

                                <TransferCheck
                                    prompt={'换个例子：int op=2; switch(op){ case 1: cout<<"A"; case 2: cout<<"B"; case 3: cout<<"C"; default: cout<<"X"; }（没写 break）输出什么？'}
                                    hint="case 命中后若没有 break，会「穿透」继续执行后面的 case。"
                                    answer="输出 BCX。"
                                    steps={[
                                        'op=2 命中 case 2，输出 B。',
                                        '没有 break，穿透到 case 3 输出 C，再到 default 输出 X。',
                                        '结果 BCX。要只输出 B，每个 case 末尾都要加 break。',
                                    ]}
                                />
                                <MasteryCheck
                                    title="C++ L2-4 switch 多路选择离开前检查"
                                    description="switch 最怕“漏 break 穿透、对范围硬套 switch”。勾选前先故意删一个 break，预测输出再验证。"
                                    items={switchMasteryItems}
                                />

                                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <h4 className="mb-4 flex items-center gap-2 text-xl font-black text-slate-900">
                                        <ClipboardCheck className="text-indigo-600" />
                                        课后作业
                                    </h4>
                                    <ul className="space-y-3 text-sm font-semibold leading-6 text-slate-700">
                                        <li className="flex gap-2"><CheckCircle2 className="mt-1 text-emerald-600" size={16} />写一个星期编号程序：输入 1-7，输出 Monday 到 Sunday。</li>
                                        <li className="flex gap-2"><CheckCircle2 className="mt-1 text-emerald-600" size={16} />故意删掉一个 case 后的 break，记录输出变化并解释原因。</li>
                                        <li className="flex gap-2"><CheckCircle2 className="mt-1 text-emerald-600" size={16} />写一个菜单程序，必须包含 default 错误提示。</li>
                                    </ul>
                                </div>
                            </section>
                        )}
                        {activeSection === sections.length && <CppL2LessonSupport lessonId={4} placement="bottom" />}
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
