import React, { useMemo, useState } from 'react';
import { ClipboardCheck, ListFilter, Search, Target, Timer } from 'lucide-react';
import CppL3LessonSupport from '../../../components/CppL3LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CodeTracer, CompareTable, MasteryCheck, MiniQuiz, PredictCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '枚举思想' },
    { id: 2, title: '单层枚举', category: '逐个尝试' },
    { id: 3, title: '双层枚举', category: '组合尝试' },
    { id: 4, title: '剪枝与范围', category: '效率意识' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function EnumerateLab() {
    const [target, setTarget] = useState(12);

    const pairs = useMemo(() => {
        const result = [];
        for (let a = 1; a <= target; a++) {
            for (let b = a; b <= target; b++) {
                if (a + b === target) result.push([a, b]);
            }
        }
        return result;
    }, [target]);

    return (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Target className="text-rose-700" />
                <h3 className="text-xl font-black text-slate-950">枚举配对实验台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-rose-100">
                    <label className="block text-sm font-black text-slate-700">目标和：{target}</label>
                    <input type="range" min="4" max="30" value={target} onChange={(event) => setTarget(Number(event.target.value))} className="mt-3 w-full" />
                    <p className="mt-3 text-xs font-bold text-slate-500">枚举 1 到目标值之间的正整数配对。</p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-rose-100">
                    <p className="text-sm font-black text-slate-500">满足 a + b = {target} 且 a &lt;= b 的配对</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {pairs.map(([a, b]) => (
                            <span key={`${a}-${b}`} className="rounded-lg bg-rose-600 px-3 py-2 font-mono text-sm font-black text-white">
                                {a}+{b}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '枚举法最重要的第一步是什么？',
        answer: '确定枚举范围',
        reason: '范围太小会漏解，范围太大会浪费时间甚至超时。',
    },
    {
        question: '双层循环通常用来枚举什么？',
        answer: '两个变量的组合',
        reason: '例如枚举两个数、两个位置、两个端点。',
    },
    {
        question: '找到第一个答案后可以停吗？',
        answer: '看题目要求',
        reason: '如果只要任意一个答案可以 break；如果要全部答案就不能提前停。',
    },
];

function EnumerateTracer() {
    const n = 4;
    const target = 5;
    const steps = useMemo(() => {
        const result = [{ active: [0], vars: { a: '–', b: '–' } }];
        const hits = [];
        for (let a = 1; a <= n; a += 1) {
            for (let b = a; b <= n; b += 1) {
                const hit = a + b === target;
                if (hit) hits.push(`${a}+${b}`);
                result.push({
                    active: hit ? [0, 1, 2, 3] : [0, 1, 2],
                    vars: { a, b },
                    action: a === 1 && b === 1 ? '开始枚举' : '下一对',
                    row: [`a=${a}, b=${b}`, `${a} + ${b} = ${a + b}`, hit ? '✓ 输出' : '✗'],
                });
            }
        }
        result.push({
            active: [6],
            vars: { a: n, b: n },
            action: '退出',
            output: `找到：${hits.join('、')}`,
        });
        return result;
    }, []);

    return (
        <CodeTracer
            title="枚举追踪器"
            code={`for (int a = 1; a <= n; a++) {
  for (int b = a; b <= n; b++) {
    if (a + b == target) {
      cout << a << " " << b << endl;
    }
  }
}`}
            varOrder={['a', 'b']}
            columns={['枚举 (a, b)', 'a + b', '== 5 ?']}
            steps={steps}
            hint="点击「开始枚举」，看 b 从 a 起避免重复组合 →"
        />
    );
}

function EnumeratePredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'找 a+b=n 的无序对，内层 b 从 1 开始（不是从 a），会怎样？'}
                options={['正常', '(2,5) 和 (5,2) 会被重复算两次']}
                correctIndex={1}
                explanation="内层 b 从 a 开始（b = a..n）能保证 a <= b，避免同一对的两种顺序重复。从 1 开始会把 (2,5) 和 (5,2) 都数进去。"
                misconception="内层从头枚举，导致无序对被重复计数。"
            />
            <PredictCheck
                prompt={'题目要「输出所有满足条件的解」，找到第一个就 break 对吗？'}
                options={['对，省时间', '不对，会漏掉后面的解']}
                correctIndex={1}
                explanation="要全部解就不能提前 break，break 只适合「只要任意一个解」。要看题目是要全部还是要一个。"
                misconception="不看题目要求，一律找到就 break。"
            />
            <PredictCheck
                prompt={'n=10000 的两层枚举（O(n²)），大约要试多少次？'}
                options={['1 万次，很快', '约 1 亿次，可能超时']}
                correctIndex={1}
                explanation="两层各 n 次是 n² = 10⁸ ≈ 1 亿次，对时限是危险的。n 大时两层枚举要谨慎，考虑剪枝或换算法。"
                misconception="以为两层循环也只是几万次。"
            />
        </div>
    );
}

const enumerateMasteryItems = [
    {
        label: '能确定枚举变量和范围。',
        evidence: '想清楚枚举谁、从哪里开始、到哪里结束。',
        retryHint: '回到「枚举三问」。',
    },
    {
        label: '能写单层和双层枚举模板。',
        evidence: '一层枚举一个量，两层枚举两个量的组合。',
        retryHint: '回到双层枚举追踪器。',
    },
    {
        label: '能用范围和去重做剪枝。',
        evidence: 'b 从 a 起避免重复、要一个就 break、缩小范围。',
        retryHint: '回到剪枝与范围表。',
    },
    {
        label: '能估算枚举的复杂度。',
        evidence: '一层 O(n)、两层 O(n²)，n 大时警惕超时。',
        retryHint: '回到复杂度直觉。',
    },
];

export default function CppL3Lesson10() {
    return (
        <CppLessonShell
            lessonNumber={10}
            lessonTitle="暴力破解 (枚举法)"
            lessonSubtitle="系统地试完所有可能"
            accent="rose"
            levelTitle="C++ 高阶"
            levelCode="L3"
            sections={sections}
            previousPath="/lesson/3/9"
            nextPath="/lesson/3/11"
            topSupport={<CppL3LessonSupport lessonId={10} />}
            bottomSupport={<CppL3LessonSupport lessonId={10} placement="bottom" />}
            hero={{
                title: '枚举不是乱试，而是有边界、有顺序地全部尝试',
                description: '本课训练单层枚举、双层枚举和范围剪枝。三级很多逻辑题都可以先用枚举找到稳定解法。',
            }}
            goals={['能确定枚举变量和范围', '能写出单层与双层枚举模板', '能用条件判断筛选合法答案']}
            prerequisites={['会写单层和嵌套 for 循环', '会用 if 判断条件', '理解循环边界（起点和终点）']}
            childrenBySection={{
                1: <EnumerateLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">单层枚举：一个变量从起点试到终点</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                如果题目只有一个未知量，就用一层循环枚举它的所有可能值，再用条件判断是否合法。
                            </p>
                        </div>
                        <CodeBlock>{`// 找 1 到 n 中所有能被 3 整除的数
for (int x = 1; x <= n; x++) {
  if (x % 3 == 0) {
    cout << x << " ";
  }
}`}</CodeBlock>
                        <Callout icon={ListFilter} title="枚举三问" tone="rose">
                            枚举谁？从哪里开始？到哪里结束？这三个问题想清楚，循环边界就不容易错。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">双层枚举：两个变量组合尝试</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                当答案由两个变量共同决定时，可以用两层循环。比如找两个数相加等于目标值。
                            </p>
                        </div>
                        <EnumerateTracer />
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">剪枝与范围：少试明显不可能的情况</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                枚举法要能跑得动，关键是范围合理。题目给的限制、变量之间的关系，都可以用来减少尝试次数。
                            </p>
                        </div>
                        <CompareTable
                            headers={['优化点', '例子', '效果']}
                            rows={[
                                ['减少重复', 'b 从 a 开始', '避免 (2,5) 和 (5,2) 重复'],
                                ['提前停止', '找到唯一答案后 break', '少跑后面的无用情况'],
                                ['缩小范围', 'a + b = n 时 b <= n - a', '减少明显超出的组合'],
                            ]}
                        />
                        <Callout icon={Timer} title="复杂度直觉" tone="amber">
                            一层循环大约是 O(n)，两层循环大约是 O(n²)。n 很大时，两层枚举要格外谨慎。
                        </Callout>
                        <EnumeratePredictionChecks />
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                每道枚举题都先写出“枚举变量”和“枚举范围”，再写代码。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <MasteryCheck
                            title="C++ L3-10 枚举法离开前检查"
                            description="枚举最怕“范围定错漏解、两层 O(n²) 没意识到会超时”。勾选前先想清这道题枚举谁、范围多大。"
                            items={enumerateMasteryItems}
                        />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>枚举 1 到 n 中所有既能被 3 整除又能被 5 整除的数。</li>
                                <li>找出所有 a + b = n 且 a &lt;= b 的正整数对。</li>
                                <li>枚举三位数，输出所有各位数字之和等于 k 的数。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课学习模拟法。枚举负责试可能性，模拟负责按规则一步一步推进状态。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
