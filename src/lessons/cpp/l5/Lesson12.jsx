import React, { useMemo, useState } from 'react';
import { CheckCircle2, ClipboardCheck, Coins, Search } from 'lucide-react';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '局部最优' },
    { id: 2, title: '贪心判断', category: '策略证明' },
    { id: 3, title: '区间选择', category: '经典模型' },
    { id: 4, title: '反例意识', category: '不能乱贪' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

const activities = [
    { name: 'A', start: 1, end: 3 },
    { name: 'B', start: 2, end: 5 },
    { name: 'C', start: 4, end: 6 },
    { name: 'D', start: 6, end: 8 },
    { name: 'E', start: 5, end: 9 },
];

function GreedyLab() {
    const [sortByEnd, setSortByEnd] = useState(true);
    const chosen = useMemo(() => {
        const sorted = [...activities].sort((a, b) => sortByEnd ? a.end - b.end : a.start - b.start);
        const result = [];
        let lastEnd = 0;
        for (const item of sorted) {
            if (item.start >= lastEnd) {
                result.push(item.name);
                lastEnd = item.end;
            }
        }
        return result;
    }, [sortByEnd]);

    return (
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <CheckCircle2 className="text-amber-700" />
                <h3 className="text-xl font-black text-slate-950">区间贪心演示台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-amber-100">
                    <label className="flex items-center gap-3 text-sm font-black text-slate-700">
                        <input type="checkbox" checked={sortByEnd} onChange={(event) => setSortByEnd(event.target.checked)} />
                        按结束时间排序
                    </label>
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        区间选择问题的经典贪心是：优先选结束最早的活动，给后面留下更多空间。
                    </p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-amber-100">
                    <div className="grid gap-2">
                        {activities.map((item) => (
                            <div key={item.name} className={`rounded-lg px-4 py-3 font-mono text-sm font-black ${chosen.includes(item.name)
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 text-slate-500'
                            }`}>
                                {item.name}: [{item.start}, {item.end})
                            </div>
                        ))}
                    </div>
                    <p className="mt-4 text-xs font-bold text-slate-500">选中：{chosen.join(', ')}</p>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '贪心算法每一步做什么？',
        answer: '当前看起来最优的选择',
        reason: '但必须证明这种局部最优能导向整体最优。',
    },
    {
        question: '区间选择为什么按结束时间排序？',
        answer: '给后面留更多空间',
        reason: '结束越早，越不容易挡住后续区间。',
    },
    {
        question: '贪心最危险的点是什么？',
        answer: '策略不一定正确',
        reason: '看起来合理的贪心可能被反例推翻。',
    },
];

export default function CppL5Lesson12() {
    return (
        <CppLessonShell
            lessonNumber={12}
            lessonTitle="眼下的最优 (贪心策略)"
            lessonSubtitle="每一步选择当前最优，但要能说明为什么"
            accent="amber"
            levelTitle="C++ 专家"
            levelCode="L5"
            sections={sections}
            previousPath="/lesson/5/11"
            nextPath="/lesson/5/13"
            hero={{
                title: '贪心不是“凭感觉选最大”，而是有理由地做局部最优选择',
                description: '本课通过区间选择、硬币模型和反例意识，建立贪心策略的判断框架。',
            }}
            goals={['能说出贪心策略的局部选择', '能用排序辅助贪心', '能用反例检查贪心是否可靠']}
            childrenBySection={{
                1: <GreedyLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">贪心判断：策略必须能解释“为什么不会后悔”</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                贪心常常搭配排序。真正难的是选择排序规则，并说明按这个规则选不会错过最优答案。
                            </p>
                        </div>
                        <CompareTable
                            headers={['问题', '常见贪心', '检查方式']}
                            rows={[
                                ['区间选择', '按结束时间早排序', '选完后剩余空间最大'],
                                ['最少硬币', '每次拿最大面额', '只在特定币制下可靠'],
                                ['任务排序', '按截止时间或收益排序', '需要看题目目标'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">区间选择：结束越早，越给后面机会</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                目标是选尽可能多的不重叠区间。按结束时间从小到大排序，每次能选就选。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`sort(a, a + n, [](Task x, Task y) {
  return x.end < y.end;
});

int ans = 0, lastEnd = -1;
for (int i = 0; i < n; i++) {
  if (a[i].start >= lastEnd) {
    ans++;
    lastEnd = a[i].end;
  }
}`}</CodeBlock>
                            <StepList steps={[
                                '按结束时间升序排序',
                                '维护已选区间的结束时间',
                                '当前区间不冲突就选择',
                                '更新 lastEnd',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">反例意识：不是所有“拿最大”都正确</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                贪心题要主动找反例。比如硬币面额是 1、3、4，要凑 6，先拿 4 会得到 4+1+1，但最优是 3+3。
                            </p>
                        </div>
                        <CodeBlock>{`// 反例：面额 1, 3, 4，凑 6
贪心：4 + 1 + 1，共 3 枚
最优：3 + 3，共 2 枚`}</CodeBlock>
                        <Callout icon={Coins} title="贪心检查口令" tone="amber">
                            先写策略，再试小反例。如果找到了反例，这题就不能用这个贪心。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                贪心作业必须写出策略理由。只有代码没有解释，说明还没真正掌握。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>实现最多不重叠区间选择。</li>
                                <li>为一个错误贪心策略构造反例。</li>
                                <li>总结 3 个“适合先排序再贪心”的题面信号。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课学习记忆化递归。它适合那些贪心不能保证正确、但重复子问题很多的场景。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
