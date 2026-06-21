import React, { useMemo, useState } from 'react';
import { ClipboardCheck, GitBranch, Search, TrendingUp } from 'lucide-react';
import CppL4LessonSupport from '../../../components/CppL4LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '由前推后' },
    { id: 2, title: '递推三要素', category: '建模方法' },
    { id: 3, title: '斐波那契模板', category: '数组递推' },
    { id: 4, title: '递推与递归', category: '方法辨析' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function fibonacci(limit) {
    const values = [0, 1];
    for (let i = 2; i <= limit; i++) {
        values[i] = values[i - 1] + values[i - 2];
    }
    return values.slice(0, limit + 1);
}

function RecurrenceLab() {
    const [n, setN] = useState(8);
    const values = useMemo(() => fibonacci(n), [n]);

    return (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <TrendingUp className="text-indigo-700" />
                <h3 className="text-xl font-black text-slate-950">递推数列演示台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <label className="block text-sm font-black text-slate-700">计算到 f[{n}]</label>
                    <input
                        type="range"
                        min="2"
                        max="12"
                        value={n}
                        onChange={(event) => setN(Number(event.target.value))}
                        className="mt-3 w-full"
                    />
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        每一项都由前两项推出：f[i] = f[i-1] + f[i-2]。
                    </p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <div className="grid gap-2 sm:grid-cols-4">
                        {values.map((value, index) => (
                            <div key={index} className="rounded-lg bg-indigo-100 px-3 py-2 text-center font-mono text-sm font-black text-indigo-800">
                                f[{index}] = {value}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '递推最先要确定什么？',
        answer: '初始值',
        reason: '没有起点，就无法推出后面的状态。',
    },
    {
        question: 'f[i] = f[i-1] + f[i-2] 属于什么？',
        answer: '递推关系',
        reason: '它说明当前项如何由前面的项计算出来。',
    },
    {
        question: '递推一般按什么方向计算？',
        answer: '从小到大',
        reason: '先算出小状态，再推出大状态。',
    },
];

export default function CppL4Lesson12() {
    return (
        <CppLessonShell
            lessonNumber={12}
            lessonTitle="找规律高手：递推算法"
            lessonSubtitle="从已知起点一步步推出后续答案"
            accent="indigo"
            levelTitle="C++ 资深"
            levelCode="L4"
            sections={sections}
            previousPath="/lesson/4/11"
            nextPath="/lesson/4/13"
            topSupport={<CppL4LessonSupport lessonId={12} />}
            bottomSupport={<CppL4LessonSupport lessonId={12} placement="bottom" />}
            hero={{
                title: '递推不是猜答案，而是写清楚“下一步怎么来”',
                description: '本课建立递推三要素：初始值、递推关系、计算顺序。它是后续动态规划的入口。',
            }}
            goals={['能找出递推初始值', '能写出简单递推关系', '能用数组从小到大计算答案']}
            childrenBySection={{
                1: <RecurrenceLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">递推三要素：起点、关系、顺序</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                递推题不要急着写循环。先问三个问题：已知哪些起点？后一项怎么由前面推出？应该按什么顺序计算？
                            </p>
                        </div>
                        <CompareTable
                            headers={['要素', '问题', '例子']}
                            rows={[
                                ['初始值', '最开始已知什么？', 'f[0] = 0, f[1] = 1'],
                                ['递推关系', '当前项怎么计算？', 'f[i] = f[i-1] + f[i-2]'],
                                ['计算顺序', '先算谁后算谁？', 'i 从 2 到 n'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">斐波那契模板：用数组保存中间结果</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                斐波那契数列是最经典的递推模型。数组 <code>f</code> 用来保存已经算出的结果，后面直接复用。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`int f[105];
f[0] = 0;
f[1] = 1;

for (int i = 2; i <= n; i++) {
  f[i] = f[i - 1] + f[i - 2];
}

cout << f[n];`}</CodeBlock>
                            <StepList steps={[
                                '先写出最小状态的答案',
                                '循环从能被推出的位置开始',
                                '每次只依赖已经算过的状态',
                                '最后输出目标状态',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">递推与递归：方向不同，目标相近</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                递归像从大问题往小问题拆，递推像从小答案往大答案推。四级阶段，简单数列题优先用递推，执行更稳定。
                            </p>
                        </div>
                        <CompareTable
                            headers={['方法', '思考方向', '适合场景']}
                            rows={[
                                ['递推', '从已知小状态推到大状态', '数列、台阶、简单计数'],
                                ['递归', '把大问题拆成更小问题', '树形结构、搜索、分治'],
                                ['动态规划', '带状态设计的递推', '后续更复杂的最优值问题'],
                            ]}
                        />
                        <Callout icon={GitBranch} title="递推题审题口令" tone="blue">
                            看到“第 n 项”“走到第 n 阶”“前一天影响后一天”，优先尝试写状态和递推关系。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                递推练习请先用自然语言写出关系式，再转成 C++ 循环。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>计算斐波那契数列第 n 项。</li>
                                <li>台阶问题：每次走 1 或 2 阶，求走到第 n 阶的方法数。</li>
                                <li>给定每天新增人数规则，写出第 n 天人数。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课学习文件输入输出。它会把算法题从键盘输入扩展到文件读写场景。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
