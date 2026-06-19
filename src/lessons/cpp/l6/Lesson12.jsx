import React, { useMemo, useState } from 'react';
import { ClipboardCheck, PackageCheck, Search, ShoppingCart } from 'lucide-react';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '选择或不选' },
    { id: 2, title: '状态定义', category: '容量限制' },
    { id: 3, title: '二维模板', category: '前 i 件物品' },
    { id: 4, title: '一维优化', category: '倒序枚举' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

const items = [
    { name: 'A', weight: 2, value: 6 },
    { name: 'B', weight: 3, value: 10 },
    { name: 'C', weight: 4, value: 12 },
    { name: 'D', weight: 5, value: 15 },
];

function solveKnapsack(capacity) {
    const dp = Array(capacity + 1).fill(0);
    for (const item of items) {
        for (let bag = capacity; bag >= item.weight; bag--) {
            dp[bag] = Math.max(dp[bag], dp[bag - item.weight] + item.value);
        }
    }
    return dp;
}

function KnapsackLab() {
    const [capacity, setCapacity] = useState(7);
    const dp = useMemo(() => solveKnapsack(capacity), [capacity]);

    return (
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <ShoppingCart className="text-amber-700" />
                <h3 className="text-xl font-black text-slate-950">0/1 背包容量实验室</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-amber-100">
                    <label className="block text-sm font-black text-slate-700">背包容量 = {capacity}</label>
                    <input type="range" min="3" max="12" value={capacity} onChange={(event) => setCapacity(Number(event.target.value))} className="mt-3 w-full" />
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        每件物品只能选一次，所以叫 0/1 背包：要么选，要么不选。
                    </p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-amber-100">
                    <div className="mb-3 grid gap-2 sm:grid-cols-4">
                        {items.map((item) => (
                            <div key={item.name} className="rounded-lg bg-amber-100 p-3 text-sm font-black text-amber-800">
                                {item.name}: w{item.weight}/v{item.value}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {dp.map((value, bag) => (
                            <span key={bag} className="rounded-lg bg-slate-100 px-3 py-2 font-mono text-xs font-black text-slate-700">
                                c{bag}:{value}
                            </span>
                        ))}
                    </div>
                    <p className="mt-4 text-sm font-bold text-slate-500">最大价值：{dp[capacity]}</p>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '0/1 背包每件物品能选几次？',
        answer: '最多一次',
        reason: '0/1 表示选或不选，不能重复选。',
    },
    {
        question: '一维优化为什么倒序枚举容量？',
        answer: '防止重复使用同一物品',
        reason: '倒序保证本轮转移用的是上一轮物品状态。',
    },
    {
        question: 'dp[j] 通常表示什么？',
        answer: '容量 j 的最大价值',
        reason: '在一维优化里，j 是当前背包容量。',
    },
];

export default function CppL6Lesson12() {
    return (
        <CppLessonShell
            lessonNumber={12}
            lessonTitle="背包问题 (0/1 背包)"
            lessonSubtitle="每件物品选或不选"
            accent="amber"
            levelTitle="C++ 大师"
            levelCode="L6"
            sections={sections}
            previousPath="/lesson/6/11"
            nextPath="/lesson/6/13"
            hero={{
                title: '0/1 背包是 DP 的经典训练场：选择、不选、容量限制',
                description: '本课从二维状态开始，再过渡到一维倒序优化，建立背包问题的核心模板。',
            }}
            goals={['能定义前 i 件物品容量 j 的状态', '能写出选与不选的转移方程', '能解释一维优化为什么要倒序']}
            childrenBySection={{
                1: <KnapsackLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">状态定义：看前 i 件物品，容量不超过 j 的最大价值</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                0/1 背包最重要的问题是“当前物品选不选”。不选沿用上一行，选则占用容量并增加价值。
                            </p>
                        </div>
                        <CompareTable
                            headers={['符号', '含义', '例子']}
                            rows={[
                                ['w[i]', '第 i 件物品重量', '占用容量'],
                                ['v[i]', '第 i 件物品价值', '得到收益'],
                                ['dp[i][j]', '前 i 件、容量 j 的最大价值', '答案通常是 dp[n][W]'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">二维模板：不选当前物品，或选择当前物品</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                如果容量不够，只能不选；如果容量够，就比较“选”和“不选”哪个价值更大。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`for (int i = 1; i <= n; i++) {
  for (int j = 0; j <= W; j++) {
    dp[i][j] = dp[i - 1][j];
    if (j >= w[i]) {
      dp[i][j] = max(dp[i][j], dp[i - 1][j - w[i]] + v[i]);
    }
  }
}`}</CodeBlock>
                            <StepList steps={[
                                '先继承不选当前物品的答案',
                                '容量够时尝试选当前物品',
                                '选物品会占用 w[i] 容量',
                                '两种选择取最大价值',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">一维优化：容量必须倒序枚举</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                倒序的本质是防止同一件物品在一轮里被用多次。如果正序，就变成了完全背包的味道。
                            </p>
                        </div>
                        <CodeBlock>{`int dp[1005] = {0};

for (int i = 1; i <= n; i++) {
  for (int j = W; j >= w[i]; j--) {
    dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
  }
}`}</CodeBlock>
                        <Callout icon={PackageCheck} title="背包口令" tone="amber">
                            0/1 背包倒序枚举容量；完全背包正序枚举容量。顺序错了，模型就变了。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                背包题要先写二维版本，再做一维优化。跳太快容易只背模板、不懂顺序。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>用二维 DP 实现 0/1 背包。</li>
                                <li>把二维版本改成一维倒序优化。</li>
                                <li>用一个小样例说明正序为什么会重复选同一物品。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课学习完全背包和简单 DP，对比“能选一次”和“能选多次”的区别。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
