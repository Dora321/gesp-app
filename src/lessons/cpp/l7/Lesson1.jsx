import React, { useMemo, useState } from 'react';
import { Gauge, ListChecks, Timer, TrendingUp } from 'lucide-react';
import CppL7LessonSupport from '../../../components/CppL7LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '为什么要估算' },
    { id: 2, title: '数循环次数', category: '从代码到式子' },
    { id: 3, title: '常见量级', category: '对照与取舍' },
    { id: 4, title: '最好与最坏', category: '同一段代码的两面' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

// 各复杂度在 1 秒（约 10^8 次基本运算）内大致能处理的 n。
// 这是七级最常考的判断：给定数据范围，反推该用什么复杂度的算法。
const SCALES = [
    { label: 'O(log n)', limit: '几乎不受限', example: '二分查找' },
    { label: 'O(n)', limit: '约 10^8', example: '一遍扫描、前缀和' },
    { label: 'O(n log n)', limit: '约 10^6', example: '排序、归并' },
    { label: 'O(n²)', limit: '约 10^4', example: '双重循环、朴素最短路' },
    { label: 'O(n³)', limit: '约 500', example: 'Floyd 全源最短路' },
    { label: 'O(2ⁿ)', limit: '约 25', example: '子集枚举' },
    { label: 'O(n!)', limit: '约 11', example: '全排列枚举' },
];

const SNIPPETS = {
    single: {
        label: '单层循环',
        code: `for (int i = 0; i < n; i++) {\n    sum += a[i];\n}`,
        count: (n) => n,
        big: 'O(n)',
        why: '循环体执行 n 次，每次都是常数时间。',
    },
    nested: {
        label: '双重循环',
        code: `for (int i = 0; i < n; i++) {\n    for (int j = 0; j < n; j++) {\n        sum += a[i] * a[j];\n    }\n}`,
        count: (n) => n * n,
        big: 'O(n²)',
        why: '外层每转一圈，内层完整跑 n 次，相乘得 n²。',
    },
    triangle: {
        label: '三角形循环',
        code: `for (int i = 0; i < n; i++) {\n    for (int j = i; j < n; j++) {\n        sum += a[j];\n    }\n}`,
        count: (n) => (n * (n + 1)) / 2,
        big: 'O(n²)',
        why: '内层次数是 n + (n-1) + … + 1 = n(n+1)/2，仍是 n² 量级。',
    },
    halving: {
        label: '每次减半',
        code: `int k = n;\nwhile (k > 0) {\n    k /= 2;\n    cnt++;\n}`,
        count: (n) => Math.floor(Math.log2(n)) + 1,
        big: 'O(log n)',
        why: 'n 每次折半，除到 0 大约需要 log₂n 步。',
    },
};

function CountingLab() {
    const [snippet, setSnippet] = useState('nested');
    const [n, setN] = useState(8);
    const current = SNIPPETS[snippet];
    const times = useMemo(() => current.count(n), [current, n]);

    return (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Gauge className="text-indigo-700" aria-hidden="true" />
                <h3 className="text-xl font-black text-slate-950">循环次数计数器</h3>
            </div>
            <p className="mb-5 text-sm font-semibold leading-6 text-slate-600">
                复杂度不是背出来的，是数出来的。先数清楚循环体到底执行了多少次，再看这个次数随 n 怎么长。
            </p>

            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <label htmlFor="snippet-select" className="block text-sm font-black text-slate-700">选一段代码</label>
                    <select
                        id="snippet-select"
                        value={snippet}
                        onChange={(event) => setSnippet(event.target.value)}
                        className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold"
                    >
                        {Object.entries(SNIPPETS).map(([key, item]) => (
                            <option key={key} value={key}>{item.label}</option>
                        ))}
                    </select>

                    <label htmlFor="n-range" className="mt-5 block text-sm font-black text-slate-700">
                        取 n = {n}
                    </label>
                    <input
                        id="n-range"
                        type="range"
                        min="2"
                        max="32"
                        value={n}
                        onChange={(event) => setN(Number(event.target.value))}
                        className="mt-3 w-full"
                    />
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">{current.why}</p>
                </div>

                <div className="rounded-xl bg-slate-900 p-5 font-mono text-sm text-slate-100">
                    <pre className="whitespace-pre-wrap">{current.code}</pre>
                    <div className="mt-5 border-t border-slate-700 pt-4 font-sans">
                        <div className="text-xs font-bold text-slate-400">循环体执行次数</div>
                        <div className="mt-1 text-3xl font-black text-emerald-400">{times}</div>
                        <div className="mt-3 text-xs font-bold text-slate-400">时间复杂度</div>
                        <div className="mt-1 text-2xl font-black text-amber-300">{current.big}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Lesson1() {
    return (
        <CppLessonShell
            lessonNumber={1}
            lessonTitle="复杂度分析实战"
            lessonSubtitle="先把循环次数数清楚，复杂度自然就出来了"
            accent="indigo"
            levelTitle="C++ 冲刺"
            levelCode="L7"
            sections={sections}
            previousPath="/level7"
            nextPath="/lesson/7/2"
            prerequisites={['会读懂嵌套循环的执行流程', '知道数组下标从 0 开始', '能手算等差数列求和']}
            topSupport={<CppL7LessonSupport lessonId={1} />}
            bottomSupport={<CppL7LessonSupport lessonId={1} placement="bottom" />}
            hero={{
                title: '复杂度不是背出来的，是数出来的',
                description: '本课从「循环体到底执行了多少次」入手，建立从代码到量级、再到数据规模判断的完整链条。',
            }}
            goals={['能按循环层数与规模估算时间复杂度', '能区分最好、平均、最坏情况', '能用复杂度判断算法在数据范围下是否可行']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={Timer} title="为什么七级开始必须会估复杂度" tone="blue">
                            七级的题目规模变大了。同一道题，写成 O(n²) 可能超时，写成 O(n log n) 就能过。
                            考试里更常见的是反过来问：<strong>给定 n 的范围，判断某个算法能不能用</strong>。
                            这一步不需要精确计时，只需要数量级。
                        </Callout>
                        <p className="mt-5 text-base leading-7 text-slate-700">
                            复杂度描述的是「执行次数随 n 增长的趋势」，不是具体耗时。所以我们忽略常数和低阶项——
                            当 n 很大时，n² 项会把 100n 这样的项远远甩开。
                        </p>
                    </>
                ),
                2: (
                    <>
                        <CountingLab />
                        <PredictCheck
                            className="mt-6"
                            prompt="把「三角形循环」的 n 从 8 改成 16，循环体执行次数会变成原来的几倍？"
                            options={['约 2 倍', '约 4 倍', '约 8 倍', '不变']}
                            correctIndex={1}
                            explanation="次数是 n(n+1)/2。n=8 时是 36，n=16 时是 136，约 3.8 倍——接近 4 倍，这正是 O(n²) 的特征：n 翻倍，次数翻四倍。"
                        />
                    </>
                ),
                3: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">常见量级与可承受的数据规模</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            竞赛与考试通常按「1 秒约 10<sup>8</sup> 次基本运算」估算。记住下面这张表，
                            看到数据范围就能反推该用什么算法。
                        </p>
                        <div className="mt-5 overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-100 text-slate-600">
                                    <tr>
                                        <th className="px-4 py-3 font-black">复杂度</th>
                                        <th className="px-4 py-3 font-black">n 的大致上限</th>
                                        <th className="px-4 py-3 font-black">典型算法</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {SCALES.map((row) => (
                                        <tr key={row.label} className="border-t border-slate-100">
                                            <td className="px-4 py-3 font-mono font-bold text-indigo-700">{row.label}</td>
                                            <td className="px-4 py-3 font-semibold text-slate-700">{row.limit}</td>
                                            <td className="px-4 py-3 text-slate-600">{row.example}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Callout icon={TrendingUp} title="反过来用这张表" tone="amber">
                            题目说 n ≤ 2000，那 O(n²) 是 4×10<sup>6</sup>，完全可以；
                            但 n ≤ 200000 时 O(n²) 就是 4×10<sup>10</sup>，必然超时，必须想 O(n log n) 的做法。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">同一段代码的最好与最坏</h3>
                        <CodeBlock>{`// 在数组里找 target，找到就立刻返回\nfor (int i = 0; i < n; i++) {\n    if (a[i] == target) return i;\n}\nreturn -1;`}</CodeBlock>
                        <CompareTable
                            headers={['情况', '比较次数', '复杂度']}
                            rows={[
                                ['最好：第一个就是', '1 次', 'O(1)'],
                                ['平均：大致在中间', '约 n/2 次', 'O(n)'],
                                ['最坏：不存在或在末尾', 'n 次', 'O(n)'],
                            ]}
                        />
                        <Callout icon={ListChecks} title="考试里问的通常是最坏情况" tone="rose">
                            没有特别说明时，「时间复杂度」默认指<strong>最坏情况</strong>。
                            这也是为什么退化的二叉排序树要按 O(n) 算，而不是按平均的 O(log n) 算。
                        </Callout>
                        <MiniQuiz items={[{
                            question: '在有 n 个节点的二叉排序树中查找一个元素，最坏情况的时间复杂度是？',
                            answer: 'O(n)',
                            reason: '插入顺序有序时 BST 退化成一条链，查找要一路走到底，共 n 次比较。只有树保持平衡时才是 O(log n)。',
                        }, {
                            question: '题目说 n ≤ 200000，O(n²) 的算法可行吗？',
                            answer: '不可行',
                            reason: 'n² 约 4×10^10 次运算，远超 1 秒能承受的 10^8，必须换成 O(n log n) 的做法。',
                        }, {
                            question: '「三角形循环」跑了 n(n+1)/2 次，复杂度是 O(n²) 还是 O(n²/2)？',
                            answer: 'O(n²)',
                            reason: '复杂度忽略常数因子，1/2 不影响增长趋势，写成 O(n²) 即可。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '为下面五段代码分别写出时间复杂度：单层循环、双重循环、三角形循环、每次减半、双重循环里再套一个减半。',
                                '把「常见量级对照表」抄一遍，遮住第二列自己填。',
                                '找一道你做过的七级真题，先看数据范围，再判断该用什么复杂度的算法。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt="有一段代码是「双重循环，内层每次把 j 乘以 2 直到超过 n」。它的时间复杂度是多少？为什么？"
                            hint="外层 n 次，内层每次 j 翻倍，从 1 到 n 需要 log₂n 步。"
                            answer="O(n log n)。外层循环 n 次，内层因为 j 每次翻倍而只需 log₂n 次，两者相乘。这正是排序类算法常见的量级。"
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能数清一段嵌套循环的实际执行次数，而不是只看有几层循环',
                                '我能说明为什么复杂度要忽略常数和低阶项',
                                '我能根据题目给的 n 的范围，反推该用什么复杂度的算法',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
