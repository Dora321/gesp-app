import React, { useMemo, useState } from 'react';
import { ClipboardCheck, Gauge, Search, Timer } from 'lucide-react';
import CppL5LessonSupport from '../../../components/CppL5LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '规模估算' },
    { id: 2, title: '复杂度符号', category: 'O 表示法' },
    { id: 3, title: '循环分析', category: '看层数' },
    { id: 4, title: '考试估算', category: '能否通过' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function formatNumber(value) {
    if (value >= 100000000) return `${(value / 100000000).toFixed(1)} 亿`;
    if (value >= 10000) return `${(value / 10000).toFixed(1)} 万`;
    return String(Math.round(value));
}

function ComplexityLab() {
    const [n, setN] = useState(1000);
    const rows = useMemo(() => {
        const log = Math.log2(n);
        return [
            ['O(log n)', log],
            ['O(n)', n],
            ['O(n log n)', n * log],
            ['O(n^2)', n * n],
            ['O(2^n)', n <= 30 ? 2 ** n : Infinity],
        ];
    }, [n]);

    return (
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Gauge className="text-blue-700" />
                <h3 className="text-xl font-black text-slate-950">复杂度估算仪</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-blue-100">
                    <label className="block text-sm font-black text-slate-700">数据规模 n = {n}</label>
                    <input type="range" min="10" max="100000" step="10" value={n} onChange={(event) => setN(Number(event.target.value))} className="mt-3 w-full" />
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        考试估算不用精确到每条指令，先看增长级别：一层循环、两层循环、二分、排序，差距会非常大。
                    </p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-blue-100">
                    <div className="grid gap-2">
                        {rows.map(([name, value]) => (
                            <div key={name} className="grid grid-cols-[7rem_1fr] items-center gap-3">
                                <span className="font-mono text-sm font-black text-slate-700">{name}</span>
                                <span className={`rounded-lg px-3 py-2 text-sm font-black ${value > 100000000 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                    {Number.isFinite(value) ? formatNumber(value) : '爆炸'}
                                </span>
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
        question: '一重 for 循环通常是什么复杂度？',
        answer: 'O(n)',
        reason: '循环次数和输入规模 n 近似成正比。',
    },
    {
        question: '二分查找为什么是 O(log n)？',
        answer: '每次砍半',
        reason: '规模不断除以 2，能砍的次数就是 log n。',
    },
    {
        question: 'n=100000 时一般不要写什么？',
        answer: 'O(n^2)',
        reason: '约 100 亿级操作，通常会超时。',
    },
];

export default function CppL5Lesson14() {
    return (
        <CppLessonShell
            lessonNumber={14}
            lessonTitle="算法有多快？(复杂度)"
            lessonSubtitle="先估算，再写代码"
            accent="blue"
            levelTitle="C++ 专家"
            levelCode="L5"
            sections={sections}
            previousPath="/lesson/5/13"
            nextPath="/lesson/5/15"
            topSupport={<CppL5LessonSupport lessonId={14} />}
            bottomSupport={<CppL5LessonSupport lessonId={14} placement="bottom" />}
            hero={{
                title: '复杂度是考试里的“可行性雷达”：先判断跑不跑得完',
                description: '本课训练从循环结构、数据规模和常见算法模型快速估算时间复杂度。',
            }}
            goals={['能区分 O(log n)、O(n)、O(n log n)、O(n^2)', '能根据数据范围选择算法', '能从循环结构估算复杂度']}
            childrenBySection={{
                1: <ComplexityLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">O 表示法：只看增长最快的主要部分</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                复杂度不是数机器指令，而是看输入规模变大时，操作次数按什么速度增长。
                            </p>
                        </div>
                        <CompareTable
                            headers={['复杂度', '常见来源', '直觉']}
                            rows={[
                                ['O(log n)', '二分查找', '每次砍半'],
                                ['O(n)', '一重循环', '每个元素看一次'],
                                ['O(n log n)', '排序、分治', '分层处理每个元素'],
                                ['O(n^2)', '两重循环枚举', '每个元素配每个元素'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">循环分析：看循环次数，不只看缩进层数</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                多层循环不一定都是 O(n^2)，也可能因为内层次数递减、倍增或提前结束而不同。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`// O(n^2)
for (int i = 1; i <= n; i++) {
  for (int j = 1; j <= n; j++) {
    ans++;
  }
}

// O(log n)
while (n > 1) {
  n /= 2;
}`}</CodeBlock>
                            <StepList steps={[
                                '先找输入规模 n',
                                '估算每个循环会执行多少次',
                                '嵌套循环通常相乘',
                                '连续代码段通常取较大的复杂度',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">考试估算：数据范围就是出题人的提示</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                如果 n 只有 20，可能允许搜索；如果 n 是 100000，就要优先想到排序、二分、前缀、贪心或 DP。
                            </p>
                        </div>
                        <CompareTable
                            headers={['数据范围', '可考虑复杂度', '常见策略']}
                            rows={[
                                ['n <= 20', 'O(2^n) 或搜索', '枚举、回溯、状态压缩'],
                                ['n <= 1000', 'O(n^2)', '双重循环、区间 DP'],
                                ['n <= 100000', 'O(n log n)', '排序、二分、堆'],
                                ['n >= 1000000', 'O(n) 或 O(log n)', '一次扫描、数学公式'],
                            ]}
                        />
                        <Callout icon={Timer} title="粗略经验" tone="amber">
                            1 秒通常按一千万到一亿级简单操作估算。具体还要看常数、语言和判题机。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                以后每道题写代码前，先在草稿区写一句复杂度估算。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>判断 5 段循环代码的时间复杂度。</li>
                                <li>给 n=1000、n=100000 的题分别选择可行算法。</li>
                                <li>整理一张“数据范围到算法选择”的速查表。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课进入编程题专项训练，把数论、链表、二分、贪心、记忆化放到真实题型里选择。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
