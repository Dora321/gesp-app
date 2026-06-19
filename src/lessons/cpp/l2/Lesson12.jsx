import React, { useMemo, useState } from 'react';
import { AlertTriangle, ClipboardCheck, Database, ListChecks, Search, Sigma } from 'lucide-react';
import CppL2LessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from './CppL2LessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '一组数据' },
    { id: 2, title: '数组定义', category: '基础语法' },
    { id: 3, title: '下标访问', category: '易错边界' },
    { id: 4, title: '遍历统计', category: '常见题型' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function ArrayLab() {
    const [selected, setSelected] = useState(0);
    const values = [72, 88, 64, 95, 81, 59];

    const summary = useMemo(() => ({
        sum: values.reduce((total, value) => total + value, 0),
        max: Math.max(...values),
        pass: values.filter((value) => value >= 60).length,
    }), []);

    return (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Database className="text-indigo-700" />
                <h3 className="text-xl font-black text-slate-950">数组下标实验</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                        {values.map((value, index) => (
                            <button
                                key={`${value}-${index}`}
                                onClick={() => setSelected(index)}
                                className={`rounded-xl border-2 p-3 text-center transition ${selected === index ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300'}`}
                            >
                                <div className="text-xs font-black">a[{index}]</div>
                                <div className="mt-1 text-xl font-black">{value}</div>
                            </button>
                        ))}
                    </div>
                    <div className="mt-5 rounded-lg bg-slate-950 p-4 font-mono text-green-400">
                        当前访问：a[{selected}] = {values[selected]}
                    </div>
                </div>
                <div className="grid gap-3">
                    <div className="rounded-xl bg-white p-4 ring-1 ring-indigo-100">
                        <div className="text-sm font-black text-slate-500">总和</div>
                        <div className="text-2xl font-black text-slate-950">{summary.sum}</div>
                    </div>
                    <div className="rounded-xl bg-white p-4 ring-1 ring-indigo-100">
                        <div className="text-sm font-black text-slate-500">最大值</div>
                        <div className="text-2xl font-black text-slate-950">{summary.max}</div>
                    </div>
                    <div className="rounded-xl bg-white p-4 ring-1 ring-indigo-100">
                        <div className="text-sm font-black text-slate-500">及格人数</div>
                        <div className="text-2xl font-black text-slate-950">{summary.pass}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '长度为 5 的数组，下标范围是多少？',
        answer: '0 到 4',
        reason: 'C++ 数组下标从 0 开始，最后一个元素是 a[4]。',
    },
    {
        question: '输入 n 个数通常用什么结构？',
        answer: 'for 循环',
        reason: '数组和循环经常配合使用，逐个读入或访问。',
    },
    {
        question: 'a[5] 是第几个元素？',
        answer: '第 6 个',
        reason: '下标 0 对应第 1 个，下标 5 对应第 6 个。',
    },
];

export default function CppL2Lesson12() {
    return (
        <CppL2LessonShell
            lessonNumber={12}
            lessonTitle="一维数组初探"
            lessonSubtitle="从单个变量，升级到一排变量"
            accent="indigo"
            sections={sections}
            previousPath="/lesson/2/11"
            nextPath="/lesson/2/13"
            hero={{
                title: '当数据不止一个，变量就该排队了',
                description: '数组让我们保存一组同类型数据。二级常见任务包括读入 n 个数、求和、找最大值、统计满足条件的元素。',
            }}
            goals={['会定义和访问一维数组', '能解释下标从 0 开始', '能用循环遍历数组完成统计']}
            childrenBySection={{
                1: <ArrayLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">数组定义：一口气准备多个同类型位置</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                普通变量只能存一个值；数组可以存一组值。定义时要说明类型、名字和容量。
                            </p>
                        </div>
                        <CodeBlock>{`int score[100];   // 最多保存 100 个整数
double temp[30];  // 最多保存 30 个小数
char s[20];       // 最多保存 20 个字符`}</CodeBlock>
                        <CompareTable
                            headers={['写法', '含义', '提醒']}
                            rows={[
                                ['int a[10]', '准备 10 个 int 位置', '下标是 0 到 9'],
                                ['a[0]', '第 1 个元素', '不是第 0 个学生，而是下标 0'],
                                ['a[i]', '第 i 个下标位置', 'i 必须在合法范围内'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">下标访问：从 0 开始，别越界</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                C++ 数组最常见错误是越界。长度为 n 的数组，如果只使用前 n 个数据，下标通常是 0 到 n - 1。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`int a[5] = {10, 20, 30, 40, 50};

cout << a[0];  // 10
cout << a[4];  // 50
// a[5] 越界，不要访问`}</CodeBlock>
                            <StepList steps={[
                                'a[0] 是第 1 个元素',
                                'a[1] 是第 2 个元素',
                                '长度为 5 时最后一个是 a[4]',
                                '访问 a[5] 已经越界',
                            ]} />
                        </div>
                        <Callout icon={AlertTriangle} title="边界口诀" tone="amber">
                            有 n 个元素，循环通常写 <code>for (int i = 0; i &lt; n; i++)</code>，不是 <code>i &lt;= n</code>。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">遍历统计：数组题离不开 for</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                输入、求和、找最大值、统计个数，都是同一个遍历框架。变化的是循环体里做什么。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-2">
                            <CodeBlock>{`int n, a[100];
cin >> n;
for (int i = 0; i < n; i++) {
  cin >> a[i];
}`}</CodeBlock>
                            <CodeBlock>{`int sum = 0;
for (int i = 0; i < n; i++) {
  sum += a[i];
}`}</CodeBlock>
                        </div>
                        <Callout icon={Search} title="找最大值模板" tone="emerald">
                            通常先令 <code>mx = a[0]</code>，再从下标 1 开始比较。不要随便把最大值初始成 0，因为数据可能全是负数。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                数组题要先确定下标范围，再写循环；边界比语法更容易出错。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>输入 n 个整数，输出它们的总和。</li>
                                <li>输入 n 个成绩，统计不低于 60 分的人数。</li>
                                <li>输入 n 个整数，输出最大值和最大值所在下标。</li>
                            </ul>
                        </Callout>
                        <Callout icon={ListChecks} title="下一课衔接" tone="blue">
                            下一课进入模拟算法实战。数组会成为保存状态的工具，让程序不再只能处理一个值。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
