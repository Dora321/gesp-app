import React, { useMemo, useState } from 'react';
import { ClipboardCheck, PackageCheck, Search, ShoppingCart } from 'lucide-react';
import CppL6LessonSupport from '../../../components/CppL6LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

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

function KnapsackPredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'0/1 背包一维优化，容量循环写成正序（j 从小到大），会怎样？'}
                options={['没问题', '同一件物品被重复选，变成完全背包']}
                correctIndex={1}
                explanation="正序时 dp[j - w] 已经是本轮（含当前物品）的值，导致一件物品被选多次。0/1 背包必须倒序枚举容量。"
                misconception="以为正序、倒序只是写法差异，不影响结果。"
            />
            <PredictCheck
                prompt={'二维背包「选当前物品」的转移，价值应该从哪里来？'}
                options={['dp[i][j-w[i]] + v[i]', 'dp[i-1][j-w[i]] + v[i]']}
                correctIndex={1}
                explanation="选第 i 件后，剩余容量 j - w[i] 只能用「前 i-1 件」来装（每件只一次），所以是 dp[i-1][…]。用 dp[i][…] 会重复用第 i 件。"
                misconception="转移里用了 dp[i][…]，让同一物品被选了多次。"
            />
            <PredictCheck
                prompt={'0/1 背包和完全背包，一维代码唯一的关键区别是？'}
                options={['转移方程不同', '容量枚举方向：0/1 倒序，完全正序']}
                correctIndex={1}
                explanation="两者一维转移几乎一样，区别就在容量循环方向。倒序保证每件只用一次，正序允许重复使用。"
                misconception="以为两者要写完全不同的转移方程。"
            />
        </div>
    );
}

const knapsackMasteryItems = [
    {
        label: '能定义前 i 件、容量 j 的状态。',
        evidence: 'dp[i][j] 表示前 i 件、容量不超过 j 的最大价值。',
        retryHint: '回到状态定义。',
    },
    {
        label: '能写「选 / 不选」的二维转移。',
        evidence: '不选 dp[i-1][j]；选 dp[i-1][j-w[i]] + v[i]，两者取 max。',
        retryHint: '选当前物品后，剩余容量只能用前 i-1 件来装。',
    },
    {
        label: '能解释一维优化为什么必须倒序。',
        evidence: '倒序防止同一件物品在本轮被重复使用。',
        retryHint: '回到背包口令，正序会退化成完全背包。',
    },
    {
        label: '能区分 0/1 背包与完全背包。',
        evidence: '0/1 倒序枚举容量、完全正序枚举容量。',
        retryHint: '关键差异只在容量枚举方向。',
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
            topSupport={<CppL6LessonSupport lessonId={12} />}
            bottomSupport={<CppL6LessonSupport lessonId={12} placement="bottom" />}
            hero={{
                title: '0/1 背包是 DP 的经典训练场：选择、不选、容量限制',
                description: '本课从二维状态开始，再过渡到一维倒序优化，建立背包问题的核心模板。',
            }}
            goals={['能定义前 i 件物品容量 j 的状态', '能写出选与不选的转移方程', '能解释一维优化为什么要倒序']}
            prerequisites={['理解 DP 状态与转移', '会用一维和二维数组', '会写嵌套 for 循环']}
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
                        <KnapsackPredictionChecks />
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
                        <TransferCheck
                            prompt="换个例子：0/1 背包，容量 5，物品（重,值）=(2,3),(3,4),(4,5)，每件最多一次，最大价值是多少？"
                            hint="每件选或不选；dp[j]=max(dp[j], dp[j-w]+v)，j 从大到小。"
                            answer="最大价值 7（拿前两件：重 2+3=5，值 3+4=7）。"
                            steps={[
                                '拿 (2,3)+(3,4)：重 5，值 7。',
                                '(4,5) 单件值 5；(2,3)+(4,5) 重 6 超容量。',
                                '最优是前两件，最大价值 7。',
                            ]}
                        />
                        <MasteryCheck
                            title="C++ L6-12 0/1 背包离开前检查"
                            description="背包最怕“一维优化把容量循环写正序，物品就被重复选了”。勾选前先用一个小样例验证正序为什么会重复选。"
                            items={knapsackMasteryItems}
                        />
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
