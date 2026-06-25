import React, { useMemo, useState } from 'react';
import { AlertTriangle, Boxes, ClipboardCheck, ListChecks, Search } from 'lucide-react';
import CppL3LessonSupport from '../../../components/CppL3LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CodeTracer, CompareTable, MasteryCheck, MiniQuiz, PredictCheck } from '../CppLessonShell';

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

const arrayTraverseDemo = [3, 1, 4, 1, 5];

function ArrayTraverseTracer() {
    const n = arrayTraverseDemo.length;
    const steps = useMemo(() => {
        const result = [{ active: [0, 1], vars: { n, i: '–' } }];
        for (let i = 0; i < n; i += 1) {
            result.push({
                active: [2, 3],
                vars: { n, i },
                action: i === 0 ? '开始遍历' : '下一个 i',
                row: [`i = ${i}`, `${i} < ${n} ✓`, arrayTraverseDemo[i], '输出'],
            });
        }
        result.push({
            active: [2],
            vars: { n, i: n },
            action: '判断并停止',
            exit: `i = ${n}：${n} < ${n} ✗，停止（不会越界）`,
            output: `cout 输出 ${arrayTraverseDemo.join(' ')}`,
        });
        return result;
    }, [n]);

    return (
        <CodeTracer
            title="数组遍历追踪器"
            code={`int n = 5;
int a[5] = {3, 1, 4, 1, 5};
for (int i = 0; i < n; i++) {
  cout << a[i] << " ";
}`}
            varOrder={['n', 'i']}
            columns={['i', 'i < n ?', 'a[i]', '动作']}
            steps={steps}
            hint="点击「开始遍历」，看 i 从 0 走到 n-1 →"
        />
    );
}

function ArrayPredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'int a[5]; 访问 a[5] 会怎样？'}
                options={['正常，取第 5 个元素', '越界，最后一个是 a[4]']}
                correctIndex={1}
                explanation="长度 5 的数组下标只能是 0 到 4，a[5] 已经越界，结果不可预测。"
                misconception="把数组长度直接当成最后一个合法下标。"
            />
            <PredictCheck
                prompt={'容量 MAXN=1005，实际读入 n=3。遍历写 i < MAXN 会怎样？'}
                options={['只处理这 3 个', '会扫到上千个没读入的垃圾值']}
                correctIndex={1}
                explanation="只读入了 3 个，i < MAXN 会一路访问到没赋值的格子，结果出错。要写 i < n。"
                misconception="把数组容量当成本题实际长度来遍历。"
            />
            <PredictCheck
                prompt={'遍历 n 个元素写 for (int i = 0; i <= n; i++)，问题在哪？'}
                options={['没问题', 'i = n 时多访问一次 a[n]，越界']}
                correctIndex={1}
                explanation="i <= n 会让 i 取到 n，访问 a[n] 越界。遍历 n 个元素要写 i < n。"
                misconception="把循环次数和下标边界混在一起。"
            />
        </div>
    );
}

const arrayMasteryItems = [
    {
        label: '能说清长度 n 的数组合法下标是 0 到 n - 1。',
        evidence: '随口举例：a[5] 对应 a[0] 到 a[4]，a[5] 越界。',
        retryHint: '回到数组下标实验台，点最后一个格子看它的下标。',
    },
    {
        label: '能手推一次遍历，解释 i = n 时为什么停。',
        evidence: '能说出 i 走 0 到 n-1，i = n 时 i < n 为假就停止。',
        retryHint: '回到数组遍历追踪器，盯住最后一次判断。',
    },
    {
        label: '能区分数组容量 MAXN 和实际长度 n。',
        evidence: '知道遍历写 i < n，不写 i < MAXN，避免扫到垃圾值。',
        retryHint: '回到“容量与长度的区别”，分清最多放多少和这次给多少。',
    },
    {
        label: '能把遍历模板迁移到倒序或取首尾。',
        evidence: '倒序就让 i 从 n-1 走到 0；取首尾就用 a[0] 和 a[n-1]。',
        retryHint: '先固定遍历框架，只改 i 的起点和终点。',
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
            topSupport={<CppL3LessonSupport lessonId={5} />}
            bottomSupport={<CppL3LessonSupport lessonId={5} placement="bottom" />}
            hero={{
                title: '数组就是一排有编号的格子，适合保存一组数据',
                description: '本课重点掌握数组声明、下标访问、循环遍历和输入输出模板。数组学稳后，统计、排序、字符串综合题都会顺很多。',
            }}
            goals={['能解释数组下标从 0 开始', '能写出遍历数组的标准循环', '能避免 a[n] 这类越界错误']}
            prerequisites={['用变量保存一个值', '写 for 循环重复执行', '用 cin 读入若干个数']}
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
                        <ArrayTraverseTracer />
                        <ArrayPredictionChecks />
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
                        <MasteryCheck
                            title="C++ L3-5 一维数组离开前检查"
                            description="数组题最怕“看懂代码，但下标一写就越界”。勾选前先拿一个小数组手推一次边界。"
                            items={arrayMasteryItems}
                        />
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
