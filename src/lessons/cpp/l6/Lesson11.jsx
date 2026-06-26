import React, { useMemo, useState } from 'react';
import { BrainCircuit, ClipboardCheck, Route, Search } from 'lucide-react';
import CppL6LessonSupport from '../../../components/CppL6LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '状态与转移' },
    { id: 2, title: 'DP 四件套', category: '定义状态' },
    { id: 3, title: '递推顺序', category: '从小到大' },
    { id: 4, title: '路径计数', category: '网格 DP' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function GridDpLab() {
    const [n, setN] = useState(4);
    const dp = useMemo(() => {
        const table = Array.from({ length: n }, () => Array(n).fill(0));
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (i === 0 && j === 0) table[i][j] = 1;
                else table[i][j] = (i > 0 ? table[i - 1][j] : 0) + (j > 0 ? table[i][j - 1] : 0);
            }
        }
        return table;
    }, [n]);

    return (
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <BrainCircuit className="text-blue-700" />
                <h3 className="text-xl font-black text-slate-950">网格 DP 推导台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-blue-100">
                    <label className="block text-sm font-black text-slate-700">网格大小 {n} x {n}</label>
                    <input type="range" min="2" max="7" value={n} onChange={(event) => setN(Number(event.target.value))} className="mt-3 w-full" />
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        每个格子的路径数来自上方和左方：dp[i][j] = dp[i-1][j] + dp[i][j-1]。
                    </p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-blue-100">
                    <div className="grid w-fit gap-2" style={{ gridTemplateColumns: `repeat(${n}, 3rem)` }}>
                        {dp.flatMap((row, i) => row.map((value, j) => (
                            <div key={`${i}-${j}`} className="flex h-12 items-center justify-center rounded-lg bg-blue-100 font-mono text-sm font-black text-blue-800">
                                {value}
                            </div>
                        )))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: 'DP 最先要写清楚什么？',
        answer: '状态含义',
        reason: '不知道 dp[i] 表示什么，就无法写转移。',
    },
    {
        question: '转移方程回答什么问题？',
        answer: '当前从哪里来',
        reason: '它描述怎样由更小状态得到当前状态。',
    },
    {
        question: 'DP 为什么要有初始值？',
        answer: '递推起点',
        reason: '没有起点，后面的状态都无法计算。',
    },
];

function DpBasicPredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'写 DP 时第一步应该做什么？'}
                options={['直接写转移方程', '先用一句话定义 dp[i] 的含义']}
                correctIndex={1}
                explanation="不先定义 dp[i] 表示什么，转移方程就没有意义、很容易抄错。状态定义是 DP 四件套的第一件。"
                misconception="跳过状态定义，照着别人的公式抄。"
            />
            <PredictCheck
                prompt={'dp[i] = dp[i-1] + dp[i-2]，循环却从 i = 0 正着套这个式子，会出问题吗？'}
                options={['不会', '会，dp[0]、dp[1] 是初值要先设好']}
                correctIndex={1}
                explanation="i = 0、1 没有 i-1、i-2，必须当初值直接设定，循环从 i = 2 开始。否则会越界或用到未初始化的值。"
                misconception="不区分「初值」和「转移」，对所有 i 都套转移方程。"
            />
            <PredictCheck
                prompt={'网格 dp[i][j] = dp[i-1][j] + dp[i][j-1]，从右往左、从下往上算，对吗？'}
                options={['对', '不对，会用到还没算的状态']}
                correctIndex={1}
                explanation="dp[i][j] 依赖左边和上边的格子，必须先算它们。逆着算会用到还没计算好的状态。递推顺序要顺着依赖走。"
                misconception="忽略递推顺序，转移时用到了还没算出来的状态。"
            />
        </div>
    );
}

const dpBasicMasteryItems = [
    {
        label: '能用一句话定义 dp 状态。',
        evidence: '能说清 dp[i] 或 dp[i][j] 到底表示什么。',
        retryHint: '回到 DP 四件套第一步，先定义再写转移。',
    },
    {
        label: '能写对初值和边界。',
        evidence: '最小状态（dp[0]/dp[1] 或 dp[1][1]）单独设定。',
        retryHint: '区分「初值」和「转移」，别对最小状态套方程。',
    },
    {
        label: '能按依赖关系确定递推顺序。',
        evidence: '先算被依赖的状态，转移只用已经算好的。',
        retryHint: '回到递推顺序，画一张依赖箭头图。',
    },
    {
        label: '能把 DP 四件套迁移到新题。',
        evidence: '爬楼梯、网格路径都能写出状态/初值/转移/答案。',
        retryHint: '回到「DP 检查口令」。',
    },
];

export default function CppL6Lesson11() {
    return (
        <CppLessonShell
            lessonNumber={11}
            lessonTitle="记忆的魔法 (DP 基础)"
            lessonSubtitle="把递归思路整理成表格"
            accent="blue"
            levelTitle="C++ 大师"
            levelCode="L6"
            sections={sections}
            previousPath="/lesson/6/10"
            nextPath="/lesson/6/12"
            topSupport={<CppL6LessonSupport lessonId={11} />}
            bottomSupport={<CppL6LessonSupport lessonId={11} placement="bottom" />}
            hero={{
                title: '动态规划不是神秘公式，而是“状态定义 + 转移顺序”',
                description: '本课用爬楼梯和网格路径建立 DP 四件套：状态、初值、转移、答案。',
            }}
            goals={['能写清楚 dp 状态含义', '能根据依赖关系确定递推顺序', '能完成基础路径计数 DP']}
            prerequisites={['会写递归并理解重叠子问题', '会用一维和二维数组', '会写嵌套 for 循环']}
            childrenBySection={{
                1: <GridDpLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">DP 四件套：状态、初值、转移、答案</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                写 DP 时不要先背公式。先用一句话定义 <code>dp[i]</code> 或 <code>dp[i][j]</code> 的含义。
                            </p>
                        </div>
                        <CompareTable
                            headers={['步骤', '要回答的问题', '例子']}
                            rows={[
                                ['状态', 'dp 表示什么', 'dp[i] 表示到第 i 阶的方法数'],
                                ['初值', '最小状态是多少', 'dp[0]=1, dp[1]=1'],
                                ['转移', '当前从哪里来', 'dp[i]=dp[i-1]+dp[i-2]'],
                                ['答案', '最终输出哪里', 'dp[n]'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">递推顺序：先算被依赖的状态</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                如果 <code>dp[i]</code> 依赖 <code>dp[i-1]</code>，就从小到大算；如果依赖右边或后面，顺序就要调整。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`int dp[1005];
dp[0] = 1;
dp[1] = 1;

for (int i = 2; i <= n; i++) {
  dp[i] = dp[i - 1] + dp[i - 2];
}

cout << dp[n] << endl;`}</CodeBlock>
                            <StepList steps={[
                                '定义 dp[i] 的含义',
                                '写出最小状态初值',
                                '观察当前状态依赖谁',
                                '按依赖顺序循环递推',
                            ]} />
                        </div>
                        <DpBasicPredictionChecks />
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">路径计数：二维 DP 的第一块拼图</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                从左上角走到当前位置，只能从上方或左方来，所以当前路径数就是两者相加。
                            </p>
                        </div>
                        <CodeBlock>{`dp[1][1] = 1;
for (int i = 1; i <= n; i++) {
  for (int j = 1; j <= m; j++) {
    if (i == 1 && j == 1) continue;
    dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
  }
}`}</CodeBlock>
                        <Callout icon={Route} title="DP 检查口令" tone="blue">
                            状态说清楚，初值不遗漏，转移只用已算状态，答案位置别输出错。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                DP 作业必须先写四件套，再写代码。否则很容易变成“看着答案抄公式”。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <TransferCheck
                            prompt="换个例子：爬楼梯每次 1 或 2 阶，用 DP 求到第 4 阶的方法数。写出 dp 数组。"
                            hint="dp[i]=dp[i-1]+dp[i-2]，dp[1]=1, dp[2]=2。"
                            answer="到第 4 阶有 5 种（dp[4]=5）。"
                            steps={[
                                'dp[1]=1, dp[2]=2。',
                                'dp[3]=dp[2]+dp[1]=3。',
                                'dp[4]=dp[3]+dp[2]=5。',
                            ]}
                        />
                        <MasteryCheck
                            title="C++ L6-11 DP 基础离开前检查"
                            description="DP 最怕“跳过状态定义直接抄公式”。勾选前先给爬楼梯写出状态、初值、转移、答案四句话。"
                            items={dpBasicMasteryItems}
                        />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>完成爬楼梯方法数。</li>
                                <li>完成无障碍网格路径计数。</li>
                                <li>给每题写出状态、初值、转移、答案四件套。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课学习 0/1 背包，这是六级 DP 最经典的模型之一。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
