import React, { useMemo, useState } from 'react';
import { Binary, ClipboardCheck, Search, Target } from 'lucide-react';
import CppL6LessonSupport from '../../../components/CppL6LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '最优编码' },
    { id: 2, title: '哈夫曼思想', category: '小的先合并' },
    { id: 3, title: '优先队列', category: '取最小' },
    { id: 4, title: '编码代价', category: '带权路径' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

const presets = {
    '5 7 10 15': [5, 7, 10, 15],
    '2 3 8 13 21': [2, 3, 8, 13, 21],
    '1 1 2 3 5 8': [1, 1, 2, 3, 5, 8],
};

function huffmanSteps(weights) {
    const heap = [...weights].sort((a, b) => a - b);
    const steps = [];
    let cost = 0;

    while (heap.length > 1) {
        const a = heap.shift();
        const b = heap.shift();
        const merged = a + b;
        cost += merged;
        steps.push({ a, b, merged, cost });
        heap.push(merged);
        heap.sort((x, y) => x - y);
    }

    return steps;
}

function HuffmanLab() {
    const [preset, setPreset] = useState('5 7 10 15');
    const steps = useMemo(() => huffmanSteps(presets[preset]), [preset]);

    return (
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Binary className="text-amber-700" />
                <h3 className="text-xl font-black text-slate-950">哈夫曼合并演示台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-amber-100">
                    <label className="block text-sm font-black text-slate-700">权值集合</label>
                    <select value={preset} onChange={(event) => setPreset(event.target.value)} className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold">
                        {Object.keys(presets).map((item) => <option key={item}>{item}</option>)}
                    </select>
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        每轮取两个最小权值合并，合并代价加入总成本，新的权值再放回集合。
                    </p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-amber-100">
                    <div className="grid gap-2">
                        {steps.map((step, index) => (
                            <div key={`${step.a}-${step.b}-${index}`} className="rounded-lg bg-amber-100 px-4 py-3 text-sm font-black text-amber-800">
                                第 {index + 1} 次：{step.a} + {step.b} = {step.merged}，累计代价 {step.cost}
                            </div>
                        ))}
                    </div>
                    <p className="mt-4 text-sm font-bold text-slate-500">最终总代价：{steps[steps.length - 1]?.cost ?? 0}</p>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '哈夫曼每次合并哪两个节点？',
        answer: '权值最小的两个',
        reason: '让低权值节点更深，高权值节点更浅，从而降低总成本。',
    },
    {
        question: '实现哈夫曼常用什么容器？',
        answer: '优先队列',
        reason: '需要反复取出当前最小的两个元素。',
    },
    {
        question: '合并后的新权值要做什么？',
        answer: '放回队列',
        reason: '它会继续参与后面的合并。',
    },
];

function HuffmanPredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'哈夫曼要每次取最小，直接用 priority_queue<int> pq; 行吗？'}
                options={['行', '不行，默认是大根堆，会取到最大']}
                correctIndex={1}
                explanation="C++ priority_queue 默认是大根堆，top() 是最大值。哈夫曼要最小，得写 priority_queue<int, vector<int>, greater<int>> 建小根堆。"
                misconception="以为 priority_queue 默认就能取最小。"
            />
            <PredictCheck
                prompt={'合并出的新权值 a+b，要不要放回队列？'}
                options={['不用，已经算进代价了', '要放回，它还要继续参与后面的合并']}
                correctIndex={1}
                explanation="新合并出的节点会作为一个新权值，继续和别的权值合并，必须 push 回堆。不放回结果就错了。"
                misconception="以为合并完就结束，忘了新节点还要继续参与。"
            />
            <PredictCheck
                prompt={'每次「取两个最小合并」，能改成「取最小和最大合并」吗？'}
                options={['能，结果一样', '不能，哈夫曼的最优性靠每次取两个最小']}
                correctIndex={1}
                explanation="哈夫曼贪心的正确性依赖每次合并两个最小权值（让小权值落在更深处）。取最大会破坏最优。"
                misconception="以为合并顺序不影响总代价。"
            />
        </div>
    );
}

const huffmanMasteryItems = [
    {
        label: '能手推哈夫曼合并过程。',
        evidence: '每轮取两个最小合并，代价累加，新权值放回。',
        retryHint: '回到哈夫曼合并演示台。',
    },
    {
        label: '能用小根堆取最小权值。',
        evidence: 'priority_queue<int, vector<int>, greater<int>>。',
        retryHint: '默认是大根堆，要加 greater。',
    },
    {
        label: '能解释为什么每次取两个最小最优。',
        evidence: '小权值放在更深处、大权值靠近根，总代价最小。',
        retryHint: '回到编码代价。',
    },
    {
        label: '能识别哈夫曼题型。',
        evidence: '合并果子、最优编码、每次合并有代价。',
        retryHint: '回到题型提醒。',
    },
];

export default function CppL6Lesson3() {
    return (
        <CppLessonShell
            lessonNumber={3}
            lessonTitle="最优二叉树 (哈夫曼)"
            lessonSubtitle="高频走短路，低频走长路"
            accent="amber"
            levelTitle="C++ 大师"
            levelCode="L6"
            sections={sections}
            previousPath="/lesson/6/2"
            nextPath="/lesson/6/4"
            topSupport={<CppL6LessonSupport lessonId={3} />}
            bottomSupport={<CppL6LessonSupport lessonId={3} placement="bottom" />}
            hero={{
                title: '哈夫曼树的贪心选择很朴素：每次把最小的两个合并',
                description: '本课从最优编码问题进入哈夫曼思想，理解优先队列和带权路径长度。',
            }}
            goals={['能手推哈夫曼合并过程', '能用 priority_queue 取最小权值', '能计算合并总代价']}
            prerequisites={['理解二叉树和带权路径', '会用 priority_queue 基本操作', '理解贪心思想']}
            childrenBySection={{
                1: <HuffmanLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">哈夫曼思想：权值越大，路径越短越划算</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                如果一个字符出现次数很多，就应该用更短的编码。哈夫曼树通过反复合并最小权值，构造总代价最小的二叉树。
                            </p>
                        </div>
                        <CompareTable
                            headers={['概念', '含义', '在题目中的样子']}
                            rows={[
                                ['权值', '频率或代价', '字符出现次数、果子重量'],
                                ['合并代价', '两个权值之和', '搬运、合并、编码成本'],
                                ['总成本', '每次合并代价累加', '题目要求的最小总代价'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">优先队列模板：C++ 默认是大根堆，要改成小根堆</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                哈夫曼每次要取最小值，所以用 <code>greater&lt;int&gt;</code> 建小根堆。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`priority_queue<int, vector<int>, greater<int>> pq;

for (int i = 1; i <= n; i++) {
  int x;
  cin >> x;
  pq.push(x);
}

long long ans = 0;
while (pq.size() > 1) {
  int a = pq.top(); pq.pop();
  int b = pq.top(); pq.pop();
  ans += a + b;
  pq.push(a + b);
}`}</CodeBlock>
                            <StepList steps={[
                                '把所有权值放入小根堆',
                                '取出两个最小值',
                                '把合并代价加入答案',
                                '将新权值放回堆',
                            ]} />
                        </div>
                        <HuffmanPredictionChecks />
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">编码代价：别只记合并，更要知道为什么最优</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                哈夫曼的贪心理由是：权值小的节点可以放得更深，权值大的节点应尽量靠近根。
                            </p>
                        </div>
                        <CodeBlock>{`权值：5, 7, 10, 15
合并 5 + 7 = 12，代价 12
合并 10 + 12 = 22，代价 22
合并 15 + 22 = 37，代价 37
总代价 = 12 + 22 + 37 = 71`}</CodeBlock>
                        <Callout icon={Target} title="题型提醒" tone="amber">
                            “合并果子”“最优编码”“每次合并有代价”这类题，优先想到哈夫曼。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                哈夫曼题要先手推两轮合并，确认自己拿的是最小的两个。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <TransferCheck
                            prompt="换个例子：权值 {2, 3, 4, 5}，用哈夫曼每次合并最小的两个。写出每次合并和最终总代价。"
                            hint="每次取两个最小权值合并，代价=两者之和，新权值放回。"
                            answer="总代价 = 5 + 9 + 14 = 28。"
                            steps={[
                                '取最小的 2 和 3 合并 = 5，代价 5。集合变 {4, 5, 5}。',
                                '取 4 和 5 合并 = 9，代价 9。集合变 {5, 9}。',
                                '取 5 和 9 合并 = 14。总代价 5+9+14 = 28。',
                            ]}
                        />
                        <MasteryCheck
                            title="C++ L6-3 哈夫曼离开前检查"
                            description="哈夫曼最怕“默认大根堆取了最大、新权值忘了放回”。勾选前先手推 1/2/3/4/5 两轮合并。"
                            items={huffmanMasteryItems}
                        />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>手推权值 1、2、3、4、5 的哈夫曼合并过程。</li>
                                <li>实现合并果子最小总代价。</li>
                                <li>解释为什么 priority_queue 默认不能直接取最小值。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课学习 BFS。它和哈夫曼都依赖“正确的数据结构”，但 BFS 用队列按层推进。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
