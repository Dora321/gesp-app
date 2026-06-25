import React, { useMemo, useState } from 'react';
import { ClipboardCheck, Grid3X3, Route, Search } from 'lucide-react';
import CppL6LessonSupport from '../../../components/CppL6LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '矩阵状态' },
    { id: 2, title: '路径计数', category: '障碍处理' },
    { id: 3, title: '最小路径和', category: '权值 DP' },
    { id: 4, title: '编程模板', category: '边界初始化' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

const baseGrid = [
    [1, 3, 1, 2],
    [2, 8, 2, 1],
    [4, 2, 1, 3],
    [1, 5, 2, 1],
];

function minPathTable(size) {
    const dp = Array.from({ length: size }, () => Array(size).fill(0));
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cost = baseGrid[i][j];
            if (i === 0 && j === 0) dp[i][j] = cost;
            else {
                const up = i > 0 ? dp[i - 1][j] : Infinity;
                const left = j > 0 ? dp[i][j - 1] : Infinity;
                dp[i][j] = Math.min(up, left) + cost;
            }
        }
    }
    return dp;
}

function MatrixLab() {
    const [size, setSize] = useState(4);
    const dp = useMemo(() => minPathTable(size), [size]);

    return (
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Grid3X3 className="text-blue-700" />
                <h3 className="text-xl font-black text-slate-950">矩阵最小路径演示台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-blue-100">
                    <label className="block text-sm font-black text-slate-700">矩阵大小 {size} x {size}</label>
                    <input type="range" min="2" max="4" value={size} onChange={(event) => setSize(Number(event.target.value))} className="mt-3 w-full" />
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        每格有进入代价，只能向右或向下走。dp[i][j] 表示走到当前位置的最小代价。
                    </p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-blue-100">
                    <div className="grid w-fit gap-2" style={{ gridTemplateColumns: `repeat(${size}, 4rem)` }}>
                        {dp.flatMap((row, i) => row.map((value, j) => (
                            <div key={`${i}-${j}`} className="rounded-lg bg-blue-100 p-2 text-center font-mono text-sm font-black text-blue-800">
                                <div className="text-xs text-blue-500">w{baseGrid[i][j]}</div>
                                <div>{value}</div>
                            </div>
                        )))}
                    </div>
                    <p className="mt-4 text-sm font-bold text-slate-500">右下角最小代价：{dp[size - 1][size - 1]}</p>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '矩阵路径 DP 的状态常写成什么？',
        answer: 'dp[i][j]',
        reason: '它表示走到第 i 行第 j 列时的答案。',
    },
    {
        question: '有障碍的格子应该怎样处理？',
        answer: '不可转移',
        reason: '障碍格不能到达，也不能作为后续路径来源。',
    },
    {
        question: '最小路径和用什么转移？',
        answer: 'min',
        reason: '目标是总代价最小，所以从上方和左方取较小值。',
    },
];

function MatrixPredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'求最小路径和时，转移用 dp[i-1][j] + dp[i][j-1] 对吗？'}
                options={['对，把两个方向加起来', '不对，应是 min(上, 左) + 当前代价']}
                correctIndex={1}
                explanation="一条路径只从一个方向进入。求最小代价是在两个来源里取较小的那个再加当前格代价，不是把两个方向相加（相加是路径计数的写法）。"
                misconception="把「方案数相加」的转移套到「最小代价」上。"
            />
            <PredictCheck
                prompt={'第一行某格只能从左边来，却也去取了上方 dp[i-1][j]，会怎样？'}
                options={['没事，上方是 0', '会取到越界/未初始化值，结果偏小或出错']}
                correctIndex={1}
                explanation="第一行没有上方、第一列没有左方。不处理边界就会读到越界或脏值。常见做法：单独初始化首行首列，或把不可达位置设为 INF。"
                misconception="忘了首行首列的来源只有一个方向，直接套通用转移。"
            />
            <PredictCheck
                prompt={'带障碍的路径计数里，障碍格的 dp 值应设为？'}
                options={['照常 = 上 + 左', '设为 0，且不向后传递']}
                correctIndex={1}
                explanation="障碍格走不到，路径数是 0；它也不能作为别人的来源。设 0 后继续递推，后面的格子自然不会经过它。"
                misconception="对障碍格仍照常累加，等于允许穿墙。"
            />
        </div>
    );
}

const matrixMasteryItems = [
    {
        label: '能定义矩阵路径状态。',
        evidence: 'dp[i][j] = 走到第 i 行第 j 列的答案。',
        retryHint: '回到课程导入演示台。',
    },
    {
        label: '能按目标选对转移运算。',
        evidence: '方案数用加法、最小代价用 min、最大收益用 max。',
        retryHint: '回到「目标决定转移」提示。',
    },
    {
        label: '能正确处理边界与障碍。',
        evidence: '首行首列单独处理或设 INF；障碍格设 0 不传递。',
        retryHint: '回到编程模板的边界初始化。',
    },
    {
        label: '能写出完整递推顺序。',
        evidence: '定状态→设初值→处理起点→按行列递推→读右下角。',
        retryHint: '回到编程模板步骤列表。',
    },
];

export default function CppL6Lesson14() {
    return (
        <CppLessonShell
            lessonNumber={14}
            lessonTitle="编程实战：矩阵与路径"
            lessonSubtitle="把二维状态放进网格"
            accent="blue"
            levelTitle="C++ 大师"
            levelCode="L6"
            sections={sections}
            previousPath="/lesson/6/13"
            nextPath="/lesson/6/15"
            topSupport={<CppL6LessonSupport lessonId={14} />}
            bottomSupport={<CppL6LessonSupport lessonId={14} placement="bottom" />}
            hero={{
                title: '矩阵 DP 是二维思维训练：当前位置的答案来自附近格子',
                description: '本课用路径计数、障碍处理和最小路径和，把 DP 从一维背包扩展到二维网格。',
            }}
            goals={['能定义矩阵路径状态 dp[i][j]', '能处理边界和障碍格', '能写出路径计数与最小路径和模板']}
            prerequisites={['理解一维 DP 的状态与转移', '会用二维数组 dp[i][j]', '理解「只能向右/向下走」的转移来源']}
            childrenBySection={{
                1: <MatrixLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">路径计数：障碍格没有路径，不能贡献给别人</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                如果只能向右或向下走，那么每个可达格子的路径数来自上方和左方。
                            </p>
                        </div>
                        <CompareTable
                            headers={['情况', '处理方式', '原因']}
                            rows={[
                                ['起点', 'dp[1][1] = 1', '递推起点'],
                                ['障碍', 'dp[i][j] = 0', '不能走到这里'],
                                ['普通格', '上方 + 左方', '只能从这两个方向进入'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">最小路径和：把“方案数相加”换成“代价取小”</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                同样是矩阵 DP，目标不同，转移运算也不同。求最小值时要用 <code>min</code>。
                            </p>
                        </div>
                        <CodeBlock>{`dp[1][1] = cost[1][1];
for (int i = 1; i <= n; i++) {
  for (int j = 1; j <= m; j++) {
    if (i == 1 && j == 1) continue;
    dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + cost[i][j];
  }
}`}</CodeBlock>
                        <Callout icon={Route} title="目标决定转移" tone="blue">
                            求方案数用加法；求最小代价用 min；求最大收益用 max。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">编程模板：边界初始化别偷懒</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                处理第一行、第一列时，经常会访问越界。可以单独初始化，也可以给不可达位置设极大值。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`const int INF = 1e9;
for (int i = 0; i <= n; i++) {
  for (int j = 0; j <= m; j++) {
    dp[i][j] = INF;
  }
}

dp[1][1] = cost[1][1];
for (int i = 1; i <= n; i++) {
  for (int j = 1; j <= m; j++) {
    if (i == 1 && j == 1) continue;
    dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + cost[i][j];
  }
}`}</CodeBlock>
                            <StepList steps={[
                                '定义状态含义',
                                '设置不可达初值',
                                '处理起点',
                                '按行列顺序递推',
                            ]} />
                        </div>
                        <MatrixPredictionChecks />
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                本课作业要把同一个网格分别做“路径数”和“最小代价”，看清目标如何改变转移。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <MasteryCheck
                            title="C++ L6-14 矩阵路径离开前检查"
                            description="矩阵 DP 最怕“最小代价用了加法、边界没单独处理、障碍格照常累加”。勾选前先在 4×4 网格手推一遍。"
                            items={matrixMasteryItems}
                        />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>实现带障碍的网格路径计数。</li>
                                <li>实现矩阵最小路径和。</li>
                                <li>写出两题的状态、初值、转移、答案位置。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课进入易错题诊疗，把六级高频错误变成提交前检查清单。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
