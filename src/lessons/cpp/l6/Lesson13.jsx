import React, { useMemo, useState } from 'react';
import { ClipboardCheck, PackageCheck, Repeat2, Search } from 'lucide-react';
import CppL6LessonSupport from '../../../components/CppL6LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '可重复选择' },
    { id: 2, title: '模型对比', category: '0/1 与完全' },
    { id: 3, title: '一维模板', category: '正序枚举' },
    { id: 4, title: '简单 DP 扩展', category: '计数与最值' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

const goods = [
    { name: 'A', weight: 2, value: 5 },
    { name: 'B', weight: 3, value: 7 },
    { name: 'C', weight: 5, value: 12 },
];

function solveCompleteKnapsack(capacity) {
    const dp = Array(capacity + 1).fill(0);
    for (const item of goods) {
        for (let bag = item.weight; bag <= capacity; bag++) {
            dp[bag] = Math.max(dp[bag], dp[bag - item.weight] + item.value);
        }
    }
    return dp;
}

function CompleteBagLab() {
    const [capacity, setCapacity] = useState(10);
    const dp = useMemo(() => solveCompleteKnapsack(capacity), [capacity]);

    return (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <PackageCheck className="text-emerald-700" />
                <h3 className="text-xl font-black text-slate-950">完全背包容量实验室</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-emerald-100">
                    <label className="block text-sm font-black text-slate-700">容量 = {capacity}</label>
                    <input type="range" min="4" max="16" value={capacity} onChange={(event) => setCapacity(Number(event.target.value))} className="mt-3 w-full" />
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        完全背包的物品可以重复选择，所以容量循环要正序，让当前物品能被本轮继续使用。
                    </p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-emerald-100">
                    <div className="mb-3 grid gap-2 sm:grid-cols-3">
                        {goods.map((item) => (
                            <div key={item.name} className="rounded-lg bg-emerald-100 p-3 text-sm font-black text-emerald-800">
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
        question: '完全背包每件物品能选几次？',
        answer: '可以选多次',
        reason: '这正是它和 0/1 背包的核心差别。',
    },
    {
        question: '完全背包一维优化容量怎么枚举？',
        answer: '正序',
        reason: '正序允许当前物品在同一轮继续被使用。',
    },
    {
        question: '0/1 和完全背包最容易混淆什么？',
        answer: '容量循环方向',
        reason: '方向错了，模型就会从只能选一次变成可重复选，或反过来。',
    },
];

function CompleteBagPredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'完全背包一维优化，容量循环写成倒序，会变成什么？'}
                options={['还是完全背包', '退化成 0/1 背包（每件只选一次）']}
                correctIndex={1}
                explanation="倒序时 dp[j-w] 是上一轮（不含当前物品）的值，每件只能用一次，就成了 0/1 背包。完全背包必须正序。"
                misconception="以为方向只是写法，不影响物品能不能重复选。"
            />
            <PredictCheck
                prompt={'求「凑出金额的方案数」，转移该用什么运算？'}
                options={['max', '加法 dp[j] += dp[j-coin]']}
                correctIndex={1}
                explanation="求方案数是把各种凑法的数目累加，所以用加法。求最大价值才用 max。目标不同，转移运算就不同。"
                misconception="不管求什么都套 max。"
            />
            <PredictCheck
                prompt={'计数 DP 的初值 dp[0] 应该设成几？'}
                options={['0', '1（凑出 0 元有 1 种方案：什么都不选）']}
                correctIndex={1}
                explanation="dp[0] = 1 表示凑出金额 0 有一种方案（空选）。设成 0 会让所有方案数连锁变成 0。"
                misconception="把计数 DP 的初值也想当然设成 0。"
            />
        </div>
    );
}

const completeBagMasteryItems = [
    {
        label: '能区分 0/1 与完全背包的循环方向。',
        evidence: '0/1 倒序、完全正序，方向决定物品能否重复选。',
        retryHint: '回到模型对比表。',
    },
    {
        label: '能写完全背包一维正序模板。',
        evidence: '容量从 w[i] 正序到 W，可以叠加同一件物品。',
        retryHint: '回到一维模板。',
    },
    {
        label: '能按目标选择转移运算。',
        evidence: '求最大用 max、求方案数用加法、求可达用逻辑或。',
        retryHint: '回到「迁移口令」。',
    },
    {
        label: '能定对计数 DP 的初值。',
        evidence: 'dp[0] = 1 表示「凑 0 元」的空方案。',
        retryHint: '先问自己「凑 0 元有几种」。',
    },
];

export default function CppL6Lesson13() {
    return (
        <CppLessonShell
            lessonNumber={13}
            lessonTitle="完全背包与简单 DP"
            lessonSubtitle="从只能选一次，到可以重复选"
            accent="emerald"
            levelTitle="C++ 大师"
            levelCode="L6"
            sections={sections}
            previousPath="/lesson/6/12"
            nextPath="/lesson/6/14"
            topSupport={<CppL6LessonSupport lessonId={13} />}
            bottomSupport={<CppL6LessonSupport lessonId={13} placement="bottom" />}
            hero={{
                title: '完全背包和 0/1 背包只差一步，但这一步决定循环方向',
                description: '本课对比 0/1 背包与完全背包，并把 DP 思路扩展到计数和最值模型。',
            }}
            goals={['能区分 0/1 背包和完全背包', '能写出完全背包一维正序模板', '能把 DP 四件套迁移到简单计数题']}
            prerequisites={['理解 0/1 背包的状态与转移', '会用一维数组做 DP', '会写嵌套 for 循环']}
            childrenBySection={{
                1: <CompleteBagLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">模型对比：物品能否重复选，决定转移方向</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                0/1 背包每件物品最多选一次，完全背包每件物品可以选多次。模板相似，但容量循环方向相反。
                            </p>
                        </div>
                        <CompareTable
                            headers={['模型', '物品使用次数', '一维容量循环']}
                            rows={[
                                ['0/1 背包', '最多一次', '从 W 到 w[i] 倒序'],
                                ['完全背包', '可重复多次', '从 w[i] 到 W 正序'],
                                ['简单计数 DP', '看题目限制', '按状态依赖决定顺序'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">一维模板：正序枚举容量</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                正序枚举时，<code>dp[j - w[i]]</code> 可能已经使用过第 i 件物品，因此可以继续叠加同一物品。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`int dp[1005] = {0};

for (int i = 1; i <= n; i++) {
  for (int j = w[i]; j <= W; j++) {
    dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
  }
}`}</CodeBlock>
                            <StepList steps={[
                                '定义 dp[j] 为容量 j 的最大价值',
                                '枚举每种物品',
                                '容量从小到大正序枚举',
                                '尝试继续使用当前物品',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">简单 DP 扩展：不是所有 DP 都求最大值</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                有些 DP 求方案数，有些求最小代价，有些求是否可达。转移里的运算会随目标变化。
                            </p>
                        </div>
                        <CodeBlock>{`// 硬币凑金额：每种硬币可以用多次，求方案数
dp[0] = 1;
for (int i = 1; i <= n; i++) {
  for (int j = coin[i]; j <= target; j++) {
    dp[j] += dp[j - coin[i]];
  }
}`}</CodeBlock>
                        <Callout icon={Repeat2} title="迁移口令" tone="emerald">
                            先判断目标是最大、最小、计数还是可达，再决定转移里用 max、min、加法还是逻辑或。
                        </Callout>
                        <CompleteBagPredictionChecks />
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                本课作业请把 0/1 背包和完全背包放在一起对比，循环方向必须讲清楚。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <MasteryCheck
                            title="C++ L6-13 完全背包离开前检查"
                            description="完全背包最怕“方向写反就变回 0/1、计数题套了 max、初值忘了设 1”。勾选前先用一个小样例对比正序倒序。"
                            items={completeBagMasteryItems}
                        />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>实现完全背包最大价值。</li>
                                <li>实现硬币凑金额的方案数。</li>
                                <li>写一段话解释完全背包为什么容量正序。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课把 DP 放进矩阵和路径场景里，处理障碍、权值和路径统计。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
