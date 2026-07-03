import React, { useMemo, useState } from 'react';
import { AlertTriangle, ClipboardCheck, Diamond, Route } from 'lucide-react';
import CppL2LessonSupport from '../../../components/CppL2LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CodeTracer, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

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

function LoopTraceLab() {
    const steps = useMemo(() => {
        const result = [{ active: [0], vars: { i: 1, sum: 0 } }];
        let i = 1;
        let sum = 0;
        let round = 0;
        while (i <= 5) {
            round += 1;
            const startI = i;
            const startSum = sum;
            sum += i;
            i += 1;
            result.push({
                active: [1, 2, 3],
                vars: { i, sum },
                action: round === 1 ? '开始第 1 轮' : '下一轮',
                row: [`第 ${round} 轮`, `${startI} ≤ 5 ✓`, `${startSum} + ${startI} = ${sum}`, `${i}`],
            });
        }
        result.push({
            active: [1, 5],
            vars: { i, sum },
            action: '判断并跳出',
            exit: `${i} ≤ 5 ✗ 不成立，结束循环`,
            output: `cout << sum; → 输出 ${sum}`,
        });
        return result;
    }, []);

    return (
        <CodeTracer
            title="循环追踪器"
            code={`int i = 1, sum = 0;
while (i <= 5) {
  sum += i;
  i++;
}
cout << sum;`}
            varOrder={['i', 'sum']}
            columns={['轮次', 'i ≤ 5 ?', 'sum += i', 'i++ 后']}
            steps={steps}
            hint="点击「开始第 1 轮」，逐轮看变量怎么变 →"
        />
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

function FlowPredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'score = 60，流程图先判断 score >= 90（否），再判断 score >= 60，最后输出什么？'}
                options={['通过（60 满足 >= 60）', '继续练习（60 不算及格）']}
                correctIndex={0}
                explanation=">= 是“大于或等于”，60 恰好落在 score >= 60 的 True 分支。边界值要代入符号计算，不能凭感觉。"
                misconception="凭生活直觉判断边界值，忽略 >= 里的等号。"
            />
            <PredictCheck
                prompt={'菱形“i <= 3?”的 False 箭头指向“输出 sum”。当 i = 4 时走哪条路？'}
                options={['离开循环，直接输出 sum', '再执行一次循环体']}
                correctIndex={0}
                explanation="判断在前、执行在后：i = 4 时 i <= 3 为 False，沿 False 箭头离开循环，第 4 轮循环体不会执行。"
                misconception="以为“走到判断就再跑一轮”，结果多算一次。"
            />
            <PredictCheck
                prompt={'循环体里忘了 i++，这张流程图执行起来会怎样？'}
                options={['多跑几轮后自己停下来', '条件永远相同，进入死循环']}
                correctIndex={1}
                explanation="没有更新语句，每次回到菱形时 i 都没变，判断结果永远一样。读图先检查回头箭头路径上有没有变量更新。"
                misconception="以为循环跑够“次数”就会自动停。"
            />
        </div>
    );
}

const flowMasteryItems = [
    {
        label: '能把三种符号对应到代码结构。',
        evidence: '圆角框 = 开始/结束，矩形 = 语句，菱形 = 条件。',
        retryHint: '回到“流程图符号”小节的对照表。',
    },
    {
        label: '遇到菱形先写变量值，再判真假。',
        evidence: '读分支图时会在草稿上标出当前 score，再选路径。',
        retryHint: '回到“分支流程”，用 60 分重新走一遍。',
    },
    {
        label: '能追踪循环直到条件不成立。',
        evidence: '能列出 1 到 4 求和的每轮 i、sum 变量表。',
        retryHint: '回到循环追踪实验，逐轮点击观察。',
    },
    {
        label: '能识别死循环风险。',
        evidence: '读图先检查回头箭头路径上是否有变量更新语句。',
        retryHint: '重做 i++ 缺失的预测题。',
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
            topSupport={<CppL2LessonSupport lessonId={7} />}
            bottomSupport={<CppL2LessonSupport lessonId={7} placement="bottom" />}
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
                        <FlowPredictionChecks />
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
                        <TransferCheck
                            prompt={'换个例子：流程图为 sum=0、i=1 → 菱形 i<=4?（True：sum+=i、i++ 后回到菱形；False：输出 sum）。最终输出多少？'}
                            hint="列变量表：每轮记录 i 和 sum，直到 i <= 4 为 False。"
                            answer="输出 10（1 + 2 + 3 + 4）。"
                            steps={[
                                'i=1，sum=1；i=2，sum=3。',
                                'i=3，sum=6；i=4，sum=10。',
                                'i=5 时 i<=4 为 False，离开循环输出 10。',
                            ]}
                        />
                        <MasteryCheck
                            title="C++ L2-7 流程图离开前检查"
                            description="流程图题最怕“看着都懂，一到边界和回头箭头就走错”。勾选前先手推一遍 1 到 4 求和的变量表。"
                            items={flowMasteryItems}
                        />
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
