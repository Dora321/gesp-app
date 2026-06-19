import React, { useMemo, useState } from 'react';
import { AlertTriangle, Boxes, ClipboardCheck, ListChecks, Search } from 'lucide-react';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '数组模型' },
    { id: 2, title: '下标与长度', category: '核心规则' },
    { id: 3, title: '遍历数组', category: '循环模板' },
    { id: 4, title: '数组输入输出', category: '实战模板' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function ArrayIndexLab() {
    const [activeIndex, setActiveIndex] = useState(0);
    const values = [12, 7, 35, 18, 26, 9];

    const current = values[activeIndex];
    const hint = useMemo(() => {
        if (activeIndex === 0) return '第一个元素的下标是 0，不是 1。';
        if (activeIndex === values.length - 1) return `最后一个元素的下标是 n - 1，也就是 ${values.length - 1}。`;
        return `a[${activeIndex}] 表示从左往右数第 ${activeIndex + 1} 个格子。`;
    }, [activeIndex, values.length]);

    return (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Boxes className="text-rose-700" />
                <h3 className="text-xl font-black text-slate-950">数组下标实验台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-rose-100">
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                        {values.map((value, index) => (
                            <button
                                key={`${value}-${index}`}
                                onClick={() => setActiveIndex(index)}
                                className={`rounded-xl border p-3 text-center transition ${activeIndex === index ? 'border-rose-500 bg-rose-600 text-white shadow-lg shadow-rose-200' : 'border-slate-200 bg-white text-slate-700 hover:border-rose-200'}`}
                            >
                                <span className="block text-xs font-black opacity-75">a[{index}]</span>
                                <span className="mt-1 block text-2xl font-black">{value}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-rose-100">
                    <p className="text-sm font-black text-slate-500">当前访问</p>
                    <p className="mt-2 font-mono text-3xl font-black text-rose-700">a[{activeIndex}] = {current}</p>
                    <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">{hint}</p>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '长度为 n 的数组，最后一个合法下标是？',
        answer: 'n - 1',
        reason: 'C++ 数组从 0 开始编号，所以下标范围是 0 到 n - 1。',
    },
    {
        question: 'for (int i = 0; i < n; i++) 能访问哪些元素？',
        answer: 'a[0] 到 a[n-1]',
        reason: 'i < n 保证 i 最大只能到 n - 1，正好覆盖全部元素。',
    },
    {
        question: 'a[n] 可以访问吗？',
        answer: '不可以',
        reason: 'a[n] 已经越过最后一个格子，是数组越界。',
    },
];

export default function CppL3Lesson5() {
    return (
        <CppLessonShell
            lessonNumber={5}
            lessonTitle="一维数组的奥秘"
            lessonSubtitle="用一排格子保存一组同类型数据"
            accent="rose"
            levelTitle="C++ 高阶"
            levelCode="L3"
            sections={sections}
            previousPath="/lesson/3/4"
            nextPath="/lesson/3/6"
            hero={{
                title: '数组就是一排有编号的格子，适合保存一组数据',
                description: '本课重点掌握数组声明、下标访问、循环遍历和输入输出模板。数组学稳后，统计、排序、字符串综合题都会顺很多。',
            }}
            goals={['能解释数组下标从 0 开始', '能写出遍历数组的标准循环', '能避免 a[n] 这类越界错误']}
            childrenBySection={{
                1: <ArrayIndexLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">数组声明：先确定类型和容量</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                一维数组可以保存多个同类型数据。<code>int a[100];</code> 表示准备 100 个整数格子，下标从 0 到 99。
                            </p>
                        </div>
                        <CompareTable
                            headers={['写法', '含义', '合法下标']}
                            rows={[
                                ['int a[5];', '5 个整数', '0, 1, 2, 3, 4'],
                                ['double score[30];', '30 个小数', '0 到 29'],
                                ['char s[101];', '101 个字符', '0 到 100'],
                            ]}
                        />
                        <Callout icon={AlertTriangle} title="数组越界是高频坑" tone="amber">
                            如果数组长度是 n，最后一个元素是 <code>a[n - 1]</code>。访问 <code>a[n]</code> 不会自动报错，但结果不可预测。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">遍历数组：用循环按下标扫一遍</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                数组题通常不是单独访问一个格子，而是按顺序处理每个元素。标准模板是从 0 开始，到 n 之前停止。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`int n;
int a[1005];
cin >> n;

for (int i = 0; i < n; i++) {
  cin >> a[i];
}

for (int i = 0; i < n; i++) {
  cout << a[i] << " ";
}`}</CodeBlock>
                            <StepList steps={[
                                '读入 n，表示实际使用几个格子',
                                '从 i = 0 开始',
                                '每次访问 a[i]',
                                '当 i == n 时停止，避免越界',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">输入输出模板：容量和实际长度分开想</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                声明时的 1005 是最大容量，读入的 n 是本次实际长度。写题时要围绕 n 遍历，而不是把整个容量都扫一遍。
                            </p>
                        </div>
                        <CodeBlock>{`const int MAXN = 1005;
int a[MAXN];

int n;
cin >> n;

for (int i = 0; i < n; i++) {
  cin >> a[i];
}`}</CodeBlock>
                        <Callout icon={ListChecks} title="容量与长度的区别" tone="rose">
                            <ul className="space-y-2">
                                <li><code>MAXN</code>：最多能放多少个。</li>
                                <li><code>n</code>：这道题实际给了多少个。</li>
                                <li>遍历时一般写 <code>i &lt; n</code>，不要写 <code>i &lt; MAXN</code>。</li>
                            </ul>
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                本课作业的目标不是做复杂算法，而是把下标边界练到不会写错。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>读入 n 个整数，原样输出。</li>
                                <li>读入 n 个整数，倒序输出。</li>
                                <li>读入 n 个整数，输出第一个数和最后一个数。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课开始做数组操作实战：求和、最大值、计数和前缀和。这些都建立在“正确遍历数组”之上。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
