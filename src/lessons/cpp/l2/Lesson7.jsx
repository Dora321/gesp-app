import React, { useMemo, useState } from 'react';
import { AlertTriangle, ClipboardCheck, Diamond, Flag, RotateCcw, Route, SkipForward } from 'lucide-react';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '读图能力' },
    { id: 2, title: '流程图符号', category: '基础规则' },
    { id: 3, title: '分支流程', category: '条件判断' },
    { id: 4, title: '循环流程', category: '执行追踪' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function FlowNode({ children, kind = 'process', active = false }) {
    if (kind === 'decision') {
        return (
            <div className="mx-auto flex h-40 items-center justify-center">
                <div className={`flex h-28 w-28 rotate-45 items-center justify-center border-2 bg-white text-center text-sm font-black shadow-sm ${active ? 'border-indigo-600 text-indigo-700' : 'border-slate-300 text-slate-700'}`}>
                    <span className="-rotate-45 px-3">{children}</span>
                </div>
            </div>
        );
    }

    const shapeClass = kind === 'terminal' ? 'rounded-full' : 'rounded-xl';

    return (
        <div className={`mx-auto flex h-20 w-40 items-center justify-center border-2 bg-white text-center text-sm font-black shadow-sm ${shapeClass} ${active ? 'border-indigo-600 text-indigo-700' : 'border-slate-300 text-slate-700'}`}>
            <span className="px-4">{children}</span>
        </div>
    );
}

function FlowTraceLab() {
    const [score, setScore] = useState(72);

    const result = useMemo(() => {
        if (score >= 90) return { label: '优秀', path: ['开始', '输入分数', 'score >= 90?', '输出优秀', '结束'] };
        if (score >= 60) return { label: '通过', path: ['开始', '输入分数', 'score >= 90?', 'score >= 60?', '输出通过', '结束'] };
        return { label: '继续练习', path: ['开始', '输入分数', 'score >= 90?', 'score >= 60?', '输出继续练习', '结束'] };
    }, [score]);

    return (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Route className="text-indigo-700" />
                <h3 className="text-xl font-black text-slate-950">流程追踪实验</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <label className="block text-sm font-black text-slate-700">输入分数：{score}</label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={score}
                        onChange={(event) => setScore(Number(event.target.value))}
                        className="mt-3 w-full"
                    />
                    <div className="mt-5 rounded-lg bg-slate-950 p-4 font-mono text-green-400">
                        输出：{result.label}
                    </div>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <StepList steps={result.path} />
                </div>
            </div>
        </div>
    );
}

const codeLines = [
    [['kw', 'int'], ['pl', ' i = '], ['nm', '1'], ['pl', ', sum = '], ['nm', '0'], ['pl', ';']],
    [['kw', 'while'], ['pl', ' (i <= '], ['nm', '5'], ['pl', ') {']],
    [['pl', '  sum += i;']],
    [['pl', '  i++;']],
    [['pl', '}']],
    [['fn', 'cout'], ['pl', ' << sum;']],
];

const tokenColor = {
    kw: 'text-fuchsia-400',
    fn: 'text-sky-400',
    nm: 'text-orange-300',
    pl: 'text-slate-200',
};

function TracedCode({ activeLines }) {
    return (
        <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm leading-7 shadow-inner ring-1 ring-white/10">
            <code className="font-mono">
                {codeLines.map((tokens, lineIndex) => {
                    const active = activeLines.includes(lineIndex);
                    return (
                        <span
                            key={`line-${lineIndex}`}
                            className={`block min-h-7 -mx-2 rounded px-2 transition-colors ${active ? 'bg-indigo-500/25 ring-1 ring-inset ring-indigo-400/40' : ''}`}
                        >
                            {tokens.map(([type, text], tokenIndex) => (
                                <span key={tokenIndex} className={tokenColor[type]}>{text}</span>
                            ))}
                        </span>
                    );
                })}
            </code>
        </pre>
    );
}

function LoopTraceLab() {
    const trace = useMemo(() => {
        const rows = [];
        let i = 1;
        let sum = 0;
        while (i <= 5) {
            const startI = i;
            const startSum = sum;
            sum += i;
            i += 1;
            rows.push({ round: rows.length + 1, startI, startSum, newSum: sum, newI: i });
        }
        return rows;
    }, []);

    const lastStep = trace.length + 1; // 0=初始, 1..5=每一轮, 6=跳出并输出
    const [step, setStep] = useState(0);

    const revealed = Math.min(step, trace.length);
    const finished = step >= lastStep;
    const current = step === 0
        ? { i: 1, sum: 0 }
        : { i: trace[revealed - 1].newI, sum: trace[revealed - 1].newSum };

    let activeLines = [0];
    if (finished) activeLines = [1, 5];
    else if (step >= 1) activeLines = [1, 2, 3];

    const nextLabel = step === 0 ? '开始第 1 轮' : step < trace.length ? '下一轮' : step === trace.length ? '判断并跳出' : '已结束';

    return (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <Route className="text-indigo-700" />
                    <h3 className="text-xl font-black text-slate-950">循环追踪器</h3>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setStep((value) => Math.min(value + 1, lastStep))}
                        disabled={finished}
                        className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-black text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                        <SkipForward size={16} />
                        {nextLabel}
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
                    <TracedCode activeLines={activeLines} />
                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl bg-white p-4 text-center ring-1 ring-indigo-100">
                            <div className="text-xs font-black uppercase tracking-wide text-slate-400">变量 i</div>
                            <div className="mt-1 font-mono text-3xl font-black text-indigo-700">{current.i}</div>
                        </div>
                        <div className="rounded-xl bg-white p-4 text-center ring-1 ring-indigo-100">
                            <div className="text-xs font-black uppercase tracking-wide text-slate-400">变量 sum</div>
                            <div className="mt-1 font-mono text-3xl font-black text-indigo-700">{current.sum}</div>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-center text-sm">
                            <thead>
                                <tr className="text-xs font-black uppercase tracking-wide text-slate-400">
                                    <th className="border-b border-slate-200 px-2 py-2">轮次</th>
                                    <th className="border-b border-slate-200 px-2 py-2">i ≤ 5 ?</th>
                                    <th className="border-b border-slate-200 px-2 py-2">sum += i</th>
                                    <th className="border-b border-slate-200 px-2 py-2">i++ 后</th>
                                </tr>
                            </thead>
                            <tbody className="font-mono font-bold text-slate-700">
                                {trace.slice(0, revealed).map((row) => (
                                    <tr key={row.round} className="odd:bg-slate-50">
                                        <td className="px-2 py-2 font-sans font-black text-slate-900">第 {row.round} 轮</td>
                                        <td className="px-2 py-2 text-emerald-600">{row.startI} ≤ 5 ✓</td>
                                        <td className="px-2 py-2">{row.startSum} + {row.startI} = <span className="text-indigo-700">{row.newSum}</span></td>
                                        <td className="px-2 py-2">{row.newI}</td>
                                    </tr>
                                ))}
                                {finished && (
                                    <tr className="bg-rose-50">
                                        <td className="px-2 py-2 font-sans font-black text-slate-900">跳出</td>
                                        <td className="px-2 py-2 text-rose-600" colSpan={3}>6 ≤ 5 ✗ 不成立，结束循环</td>
                                    </tr>
                                )}
                                {revealed === 0 && !finished && (
                                    <tr>
                                        <td className="px-2 py-6 text-sm font-sans font-bold text-slate-400" colSpan={4}>
                                            点击「开始第 1 轮」，逐轮看变量怎么变 →
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {finished && (
                        <div className="mt-4 flex items-center gap-2 rounded-lg bg-slate-950 p-4 font-mono text-green-400">
                            <Flag size={18} className="text-green-400" />
                            cout &lt;&lt; sum; → 输出 {current.sum}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '菱形通常表示什么？',
        answer: '条件判断',
        reason: '菱形会根据条件真假走不同路径。',
    },
    {
        question: '流程图里箭头代表什么？',
        answer: '执行方向',
        reason: '读流程图时必须顺着箭头走，不能按视觉顺序乱跳。',
    },
    {
        question: '循环流程最容易漏看什么？',
        answer: '回到条件判断的箭头',
        reason: '循环不是只执行一次，回边决定它会重复执行。',
    },
];

export default function CppL2Lesson7() {
    return (
        <CppLessonShell
            lessonNumber={7}
            lessonTitle="流程图的秘密"
            lessonSubtitle="把图读成代码，把代码画成路线"
            accent="indigo"
            sections={sections}
            previousPath="/lesson/2/6"
            nextPath="/lesson/2/8"
            hero={{
                title: '流程图不是装饰，它是程序执行路线图',
                description: 'GESP 二级常把程序逻辑画成流程图考你。会读符号、会顺箭头追踪变量，就能把图重新翻译成 if、while 和 for。',
            }}
            goals={['能识别流程图常用符号', '能追踪分支和循环路径', '能把流程图翻译成 C++ 代码']}
            childrenBySection={{
                1: <FlowTraceLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">先认符号：不同形状代表不同动作</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                流程图的重点不是画得漂亮，而是每个形状背后的程序含义。先把符号和代码结构对应起来。
                            </p>
                        </div>
                        <div className="grid gap-5 md:grid-cols-3">
                            <div className="rounded-2xl border border-slate-200 bg-white p-5">
                                <FlowNode kind="terminal">开始 / 结束</FlowNode>
                                <p className="mt-4 text-center text-sm font-semibold text-slate-600">程序入口或出口</p>
                            </div>
                            <div className="rounded-2xl border border-slate-200 bg-white p-5">
                                <FlowNode>输入 / 处理</FlowNode>
                                <p className="mt-4 text-center text-sm font-semibold text-slate-600">赋值、计算、输出</p>
                            </div>
                            <div className="rounded-2xl border border-slate-200 bg-white p-5">
                                <FlowNode kind="decision">条件?</FlowNode>
                                <p className="mt-4 text-center text-sm font-semibold text-slate-600">对应 if 或循环条件</p>
                            </div>
                        </div>
                        <CompareTable
                            headers={['流程图符号', '代码含义', '读图提醒']}
                            rows={[
                                ['圆角框', '开始或结束', '通常只有一个入口或出口'],
                                ['矩形框', '执行语句', '可能是赋值、计算、输出'],
                                ['菱形框', '判断条件', '必须看 True 和 False 分别去哪里'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">分支流程：菱形就是路口</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                分支题要先看条件，再看两条箭头分别执行什么。多重分支就是多个菱形连续出现。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-2">
                            <CodeBlock>{`if (score >= 90) {
  cout << "优秀";
} else if (score >= 60) {
  cout << "通过";
} else {
  cout << "继续练习";
}`}</CodeBlock>
                            <StepList steps={[
                                '输入 score',
                                '判断 score >= 90 是否成立',
                                '如果不成立，再判断 score >= 60',
                                '只会进入其中一条输出路径',
                            ]} />
                        </div>
                        <Callout icon={Diamond} title="读分支的关键" tone="blue">
                            每遇到一个菱形，都要在草稿纸上写出当前变量值，再判断条件真假。不要凭感觉选路线。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">循环流程：看到回头箭头就要重复追踪</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                循环流程图通常有一条箭头回到条件判断。读这种题时，要记录每一轮变量变化，直到条件不成立。
                            </p>
                        </div>
                        <LoopTraceLab />
                        <Callout icon={AlertTriangle} title="考试坑点" tone="amber">
                            如果循环体里忘记更新 i，流程图会一直回到同一个判断，程序可能进入死循环。读图时一定检查变量有没有变化。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                流程图题的标准动作：顺箭头、记变量、判条件、写输出。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>把“判断奇偶”的 C++ 程序画成流程图。</li>
                                <li>把 1 到 n 求和流程图翻译成 while 程序。</li>
                                <li>找一道二级流程图题，写出每一步变量表。</li>
                            </ul>
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
