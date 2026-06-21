import React, { useMemo, useState } from 'react';
import { AlertTriangle, ClipboardCheck, Gauge, Search, Timer } from 'lucide-react';
import CppL4LessonSupport from '../../../components/CppL4LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '规模意识' },
    { id: 2, title: '复杂度入门', category: '时间估算' },
    { id: 3, title: '异常与边界', category: '稳定程序' },
    { id: 4, title: '调试检查表', category: '错误定位' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

const complexityProfiles = {
    100: { linear: 100, square: 10000, cubic: 1000000 },
    1000: { linear: 1000, square: 1000000, cubic: 1000000000 },
    10000: { linear: 10000, square: 100000000, cubic: 1000000000000 },
};

function formatCount(value) {
    if (value >= 1000000000) {
        return `${(value / 1000000000).toFixed(value % 1000000000 === 0 ? 0 : 1)}B`;
    }
    if (value >= 1000000) {
        return `${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1)}M`;
    }
    if (value >= 1000) {
        return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}K`;
    }
    return String(value);
}

function ComplexityLab() {
    const [n, setN] = useState(1000);
    const profile = useMemo(() => complexityProfiles[n], [n]);

    return (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Gauge className="text-indigo-700" />
                <h3 className="text-xl font-black text-slate-950">复杂度估算台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <label className="block text-sm font-black text-slate-700">数据规模 n = {n}</label>
                    <input
                        type="range"
                        min="0"
                        max="2"
                        value={[100, 1000, 10000].indexOf(n)}
                        onChange={(event) => setN([100, 1000, 10000][Number(event.target.value)])}
                        className="mt-3 w-full"
                    />
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        同样是看起来不长的循环，套一层和套两层差别会非常大。
                    </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                    {[
                        ['O(n)', profile.linear, '一次循环'],
                        ['O(n^2)', profile.square, '双重循环'],
                        ['O(n^3)', profile.cubic, '三重循环'],
                    ].map(([label, value, hint]) => (
                        <div key={label} className="rounded-xl bg-white p-4 text-center ring-1 ring-indigo-100">
                            <div className="text-sm font-black text-slate-500">{hint}</div>
                            <div className="mt-2 text-xl font-black text-indigo-800">{label}</div>
                            <div className="mt-2 font-mono text-sm font-black text-slate-700">{formatCount(value)} 次</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '一层 for 循环通常是什么复杂度？',
        answer: 'O(n)',
        reason: '循环次数大致随 n 成正比增长。',
    },
    {
        question: '双重循环 i 和 j 都跑 n 次通常是什么复杂度？',
        answer: 'O(n^2)',
        reason: '外层 n 次，内层每次 n 次，总量约 n*n。',
    },
    {
        question: '为什么要先看数据范围？',
        answer: '判断算法能不能跑完',
        reason: '同一段算法在 n=100 和 n=100000 时表现完全不同。',
    },
];

export default function CppL4Lesson14() {
    return (
        <CppLessonShell
            lessonNumber={14}
            lessonTitle="异常处理与复杂度"
            lessonSubtitle="让程序既能跑对，也能跑得完"
            accent="indigo"
            levelTitle="C++ 资深"
            levelCode="L4"
            sections={sections}
            previousPath="/lesson/4/13"
            nextPath="/lesson/4/15"
            topSupport={<CppL4LessonSupport lessonId={14} />}
            bottomSupport={<CppL4LessonSupport lessonId={14} placement="bottom" />}
            hero={{
                title: '好程序不只答案正确，还要在规定时间和边界里稳定运行',
                description: '本课建立复杂度估算、边界样例和异常意识，帮助学生从“能写”走向“可靠”。',
            }}
            goals={['能用 O(n)、O(n^2) 粗略估算运行量', '能根据数据范围选择循环结构', '能用边界样例检查程序稳定性']}
            childrenBySection={{
                1: <ComplexityLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">复杂度入门：看循环层数，也看数据范围</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                复杂度不是精确计时，而是估算算法增长速度。四级阶段先抓住循环层数和数组规模。
                            </p>
                        </div>
                        <CompareTable
                            headers={['复杂度', '常见代码', '直觉']}
                            rows={[
                                ['O(1)', '只做固定几步', 'n 变大也差不多'],
                                ['O(n)', '一层循环扫数组', 'n 多大就扫多久'],
                                ['O(n^2)', '双重循环两两比较', 'n 翻倍，次数约变 4 倍'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">异常与边界：用极端样例逼出问题</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                入门阶段不必复杂使用 <code>try/catch</code>，更重要的是主动检查数组越界、除零、空数据和最大数据。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`if (n <= 0) {
  cout << 0 << endl;
  return 0;
}

for (int i = 0; i < n; i++) {
  cin >> a[i];
}

if (b != 0) {
  cout << a / b << endl;
}`}</CodeBlock>
                            <StepList steps={[
                                '先处理 n=0 或 n=1 的极小情况',
                                '数组循环必须保证下标不越界',
                                '除法前检查除数是否为 0',
                                '用最大数据估算是否会超时',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">调试检查表：从输入、边界、复杂度三处排查</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                程序出错时不要只盯着最后一行输出。先定位是读入错、边界错，还是算法太慢。
                            </p>
                        </div>
                        <CompareTable
                            headers={['症状', '可能原因', '排查动作']}
                            rows={[
                                ['样例都过，隐藏点错', '边界没覆盖', '测 n=1、重复值、最大值'],
                                ['运行时错误', '越界或除零', '检查数组大小和除法'],
                                ['超时', '复杂度过高', '估算循环次数，减少嵌套'],
                            ]}
                        />
                        <Callout icon={AlertTriangle} title="四级常见坑" tone="amber">
                            排序题最容易错在 <code>j + 1</code> 越界；二维数组题最容易错在行列范围写反。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                每道题提交前都写 3 个自测样例：最小、普通、最大或特殊。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>判断三段循环代码分别是 O(1)、O(n) 还是 O(n^2)。</li>
                                <li>给冒泡排序程序设计 4 个边界测试样例。</li>
                                <li>找出一段数组程序里的越界风险并修正。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课进入综合编程实战，把函数、数组、结构体、排序和复杂度意识放到一道题里。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
