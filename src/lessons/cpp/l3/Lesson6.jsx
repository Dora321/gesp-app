import React, { useMemo, useState } from 'react';
import { BarChart3, ClipboardCheck, Gauge, Search, Sigma } from 'lucide-react';
import CppL3LessonSupport from '../../../components/CppL3LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CodeTracer, CompareTable, MasteryCheck, MiniQuiz, PredictCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '数组实战' },
    { id: 2, title: '求和与平均数', category: '累计变量' },
    { id: 3, title: '最大值与最小值', category: '更新答案' },
    { id: 4, title: '计数与前缀和', category: '题型模板' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function ArrayStatsLab() {
    const [values, setValues] = useState('8 3 12 7 12 5');

    const stats = useMemo(() => {
        const nums = values
            .trim()
            .split(/\s+/)
            .map(Number)
            .filter((item) => Number.isFinite(item));
        const sum = nums.reduce((total, item) => total + item, 0);
        const max = nums.length ? Math.max(...nums) : 0;
        const min = nums.length ? Math.min(...nums) : 0;
        const evenCount = nums.filter((item) => item % 2 === 0).length;
        return { nums, sum, max, min, evenCount, average: nums.length ? (sum / nums.length).toFixed(2) : '0.00' };
    }, [values]);

    return (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <BarChart3 className="text-rose-700" />
                <h3 className="text-xl font-black text-slate-950">数组统计实验台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-rose-100">
                    <label className="block text-sm font-black text-slate-700">输入一组整数，用空格分隔</label>
                    <textarea
                        value={values}
                        onChange={(event) => setValues(event.target.value)}
                        className="mt-3 h-28 w-full rounded-xl border border-slate-200 p-3 font-mono text-sm font-bold outline-none focus:border-rose-400"
                    />
                    <p className="mt-3 text-xs font-bold text-slate-500">已识别 {stats.nums.length} 个数</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                    {[
                        ['sum', stats.sum],
                        ['average', stats.average],
                        ['max', stats.max],
                        ['min', stats.min],
                        ['even count', stats.evenCount],
                        ['n', stats.nums.length],
                    ].map(([label, value]) => (
                        <div key={label} className="rounded-xl bg-white p-4 ring-1 ring-rose-100">
                            <p className="text-xs font-black uppercase text-slate-400">{label}</p>
                            <p className="mt-1 text-2xl font-black text-rose-700">{value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '求数组和时，sum 初始值通常是多少？',
        answer: '0',
        reason: '累计变量从 0 开始，每看到一个元素就加上去。',
    },
    {
        question: '求最大值时，ans 可以初始化为 a[0] 吗？',
        answer: '可以',
        reason: '这样能避免全是负数时把答案错写成 0。',
    },
    {
        question: '前缀和 s[i] 表示什么？',
        answer: '前 i 个数的和',
        reason: '常见定义是 s[i] = a[1] + a[2] + ... + a[i]。',
    },
];

const sumDemo = [4, 8, 15, 16, 23];

function SumTracer() {
    const n = sumDemo.length;
    const steps = useMemo(() => {
        const result = [{ active: [0], vars: { i: '–', sum: 0 } }];
        let sum = 0;
        for (let i = 0; i < n; i += 1) {
            const before = sum;
            sum += sumDemo[i];
            result.push({
                active: [1, 2],
                vars: { i, sum },
                action: i === 0 ? '开始累加' : '下一个 i',
                row: [`i = ${i}`, sumDemo[i], `${before} + ${sumDemo[i]} = ${sum}`],
            });
        }
        result.push({
            active: [1, 4],
            vars: { i: n, sum },
            action: '判断并退出',
            exit: `i = ${n}，循环结束`,
            output: `sum = ${sum}，avg = 1.0 * ${sum} / ${n} = ${(sum / n).toFixed(1)}`,
        });
        return result;
    }, [n]);

    return (
        <CodeTracer
            title="数组求和追踪器"
            code={`int sum = 0;
for (int i = 0; i < n; i++) {
  sum += a[i];
}
double avg = 1.0 * sum / n;`}
            varOrder={['i', 'sum']}
            columns={['i', 'a[i]', 'sum += a[i]']}
            steps={steps}
            hint="点击「开始累加」，看 sum 一步步攒起来 →"
        />
    );
}

function ArrayOpsPredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'5 个数和是 12，写 double avg = sum / 5; avg 是多少？'}
                options={['2.4', '2.0（先做了整数除法）']}
                correctIndex={1}
                explanation="sum 和 5 都是整数，先算 12 / 5 = 2，再赋给 double 还是 2.0。要写 1.0 * sum / 5。"
                misconception="以为结果赋给 double 就会自动变成小数。"
            />
            <PredictCheck
                prompt={'求最大值把 mx 初始成 0，数组全是负数会怎样？'}
                options={['没问题', 'mx 错停在 0，比所有数都大']}
                correctIndex={1}
                explanation="全是负数时没有元素能超过 0，mx 停在 0，是个根本不存在的最大值。应初始化为 a[0]。"
                misconception="以为最大值初始成 0 总是安全的。"
            />
            <PredictCheck
                prompt={'前缀和 s[i] 是前 i 个的和，区间 [l, r] 的和写哪个？'}
                options={['s[r] - s[l]', 's[r] - s[l - 1]']}
                correctIndex={1}
                explanation="s[r] - s[l] 会漏掉 a[l]。减 s[l - 1] 才包含从 l 到 r 的全部元素。"
                misconception="减错了前缀和的起点，把左端点 a[l] 丢掉。"
            />
        </div>
    );
}

const arrayOpsMasteryItems = [
    {
        label: '能用累计变量求和，并避开整数除法。',
        evidence: '知道平均数要写 1.0 * sum / n，否则会被截成整数。',
        retryHint: '回到“平均数的类型坑”，想想 12 / 5 等于几。',
    },
    {
        label: '能正确初始化最大值和最小值。',
        evidence: '用 a[0] 当初值、从 i = 1 开始比较，全负数也不会出错。',
        retryHint: '回到“为什么从 i = 1 开始”，别再把 mx 设成 0。',
    },
    {
        label: '能写出条件计数模板并换条件。',
        evidence: '遍历 + if 判断 + cnt++，能从“偶数”改成“大于 x”。',
        retryHint: '回到题型表，只改 if 那一行。',
    },
    {
        label: '能用前缀和回答区间和。',
        evidence: '知道区间 [l, r] 的和是 s[r] - s[l - 1]。',
        retryHint: '回到前缀和模板，盯住为什么减的是 s[l - 1]。',
    },
];

export default function CppL3Lesson6() {
    return (
        <CppLessonShell
            lessonNumber={6}
            lessonTitle="数组操作实战"
            lessonSubtitle="求和、最值、计数和前缀和"
            accent="rose"
            levelTitle="C++ 高阶"
            levelCode="L3"
            sections={sections}
            previousPath="/lesson/3/5"
            nextPath="/lesson/3/7"
            topSupport={<CppL3LessonSupport lessonId={6} />}
            bottomSupport={<CppL3LessonSupport lessonId={6} placement="bottom" />}
            hero={{
                title: '数组题的第一层能力，是把一组数据稳定扫完',
                description: '本课把数组遍历变成四个高频模板：求和、最大最小、条件计数、前缀和。三级题里，这些模板经常组合出现。',
            }}
            goals={['能用累计变量求和和平均数', '能正确初始化最大值和最小值', '能理解前缀和的区间查询思路']}
            childrenBySection={{
                1: <ArrayStatsLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">求和：每扫到一个数，就把它累加进答案</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                求和题的核心变量叫累计变量。它保存“目前为止看到的总和”。
                            </p>
                        </div>
                        <SumTracer />
                        <Callout icon={Sigma} title="平均数的类型坑" tone="rose">
                            如果写 <code>sum / n</code>，两个都是整数时会做整数除法。需要写 <code>1.0 * sum / n</code>。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">最大值与最小值：看到更优答案就更新</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                最值题不要随便把最大值初始化为 0。更稳的做法是先用第一个元素作为初始答案。
                            </p>
                        </div>
                        <CodeBlock>{`int mx = a[0];
int mn = a[0];

for (int i = 1; i < n; i++) {
  if (a[i] > mx) mx = a[i];
  if (a[i] < mn) mn = a[i];
}`}</CodeBlock>
                        <Callout icon={Gauge} title="为什么从 i = 1 开始？" tone="blue">
                            因为 <code>a[0]</code> 已经被用作初始答案了，后面只需要检查剩下的元素。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">计数与前缀和：把条件和区间变简单</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                条件计数适合回答“有几个满足条件”。前缀和适合快速回答“某一段的和是多少”。
                            </p>
                        </div>
                        <CompareTable
                            headers={['题型', '核心变量', '典型写法']}
                            rows={[
                                ['偶数个数', 'cnt', 'if (a[i] % 2 == 0) cnt++;'],
                                ['大于 x 的个数', 'cnt', 'if (a[i] > x) cnt++;'],
                                ['区间和', 's[i]', 's[r] - s[l - 1]'],
                            ]}
                        />
                        <CodeBlock>{`// 1-based 前缀和模板
s[0] = 0;
for (int i = 1; i <= n; i++) {
  cin >> a[i];
  s[i] = s[i - 1] + a[i];
}

cout << s[r] - s[l - 1];`}</CodeBlock>
                        <ArrayOpsPredictionChecks />
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                这一课的练习都要写出“变量含义”，比如 sum 表示目前总和，cnt 表示满足条件的数量。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <MasteryCheck
                            title="C++ L3-6 数组操作实战离开前检查"
                            description="数组实战题最怕“模板背下来，但类型和边界悄悄写错”。勾选前先用一个小例子手推一次。"
                            items={arrayOpsMasteryItems}
                        />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>读入 n 个整数，输出最大值和最小值。</li>
                                <li>读入 n 个整数，统计正数、负数和 0 的个数。</li>
                                <li>读入 n 个整数和一个区间 [l, r]，用前缀和输出区间和。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            数组处理的是“一组数字”，下一课的 string 处理的是“一串字符”。它们都离不开下标和循环。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
