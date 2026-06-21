import React, { useMemo, useState } from 'react';
import { ClipboardCheck, GitBranch, Layers2, Search } from 'lucide-react';
import CppL5LessonSupport from '../../../components/CppL5LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '拆分问题' },
    { id: 2, title: '分治三步', category: '拆解/解决/合并' },
    { id: 3, title: '归并排序', category: '经典模板' },
    { id: 4, title: '复杂度分析', category: '递归树' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function splitRanges(left, right, depth = 0) {
    if (left === right) return [{ left, right, depth }];
    const mid = Math.floor((left + right) / 2);
    return [
        { left, right, depth },
        ...splitRanges(left, mid, depth + 1),
        ...splitRanges(mid + 1, right, depth + 1),
    ];
}

function DivideLab() {
    const [n, setN] = useState(8);
    const ranges = useMemo(() => splitRanges(1, n), [n]);

    return (
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <GitBranch className="text-amber-700" />
                <h3 className="text-xl font-black text-slate-950">分治拆分演示台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-amber-100">
                    <label className="block text-sm font-black text-slate-700">区间长度 n = {n}</label>
                    <input type="range" min="4" max="12" value={n} onChange={(event) => setN(Number(event.target.value))} className="mt-3 w-full" />
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        分治会把大区间递归拆成小区间，再把小答案合并成大答案。
                    </p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-amber-100">
                    <div className="space-y-2">
                        {ranges.slice(0, 14).map((range, index) => (
                            <div key={`${range.left}-${range.right}-${index}`} className="font-mono text-sm font-black text-amber-800" style={{ paddingLeft: `${range.depth * 18}px` }}>
                                [{range.left}, {range.right}]
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
        question: '分治通常分成哪三步？',
        answer: '拆分、解决、合并',
        reason: '先分成子问题，分别解决，再合并结果。',
    },
    {
        question: '递归出口有什么作用？',
        answer: '停止继续拆分',
        reason: '没有出口，递归会无限调用。',
    },
    {
        question: '归并排序的合并过程做什么？',
        answer: '合并两个有序区间',
        reason: '左右两边已经有序，只需要双指针线性合并。',
    },
];

export default function CppL5Lesson11() {
    return (
        <CppLessonShell
            lessonNumber={11}
            lessonTitle="分而治之 (分治思想)"
            lessonSubtitle="把大问题拆成小问题，再合并答案"
            accent="amber"
            levelTitle="C++ 专家"
            levelCode="L5"
            sections={sections}
            previousPath="/lesson/5/10"
            nextPath="/lesson/5/12"
            topSupport={<CppL5LessonSupport lessonId={11} />}
            bottomSupport={<CppL5LessonSupport lessonId={11} placement="bottom" />}
            hero={{
                title: '分治的力量：把一个难题拆成两个相似的小题',
                description: '本课用区间拆分和归并排序建立分治框架，训练递归边界、子问题和合并过程。',
            }}
            goals={['能解释分治三步', '能写出区间递归框架', '能理解归并排序的拆分和合并']}
            childrenBySection={{
                1: <DivideLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">分治三步：拆分、解决、合并</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                分治题的子问题通常和原问题长得很像，只是规模更小。递归负责解决子问题，合并负责得到总答案。
                            </p>
                        </div>
                        <CompareTable
                            headers={['步骤', '问题', '例子']}
                            rows={[
                                ['拆分', '怎么分成更小问题？', '区间分成左右两半'],
                                ['解决', '子问题何时能直接回答？', '长度为 1 时已有序'],
                                ['合并', '小答案如何变成大答案？', '合并两个有序数组'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">归并排序：分治最经典的排序例子</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                归并排序先把数组拆到单个元素，再两两合并成有序区间。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`void mergeSort(int l, int r) {
  if (l >= r) return;
  int mid = (l + r) / 2;
  mergeSort(l, mid);
  mergeSort(mid + 1, r);
  merge(l, mid, r);
}`}</CodeBlock>
                            <StepList steps={[
                                '递归出口：区间长度为 1',
                                '拆成左右两个区间',
                                '分别排序左右区间',
                                '合并两个有序区间',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">复杂度分析：每层合并 O(n)，一共约 log n 层</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                归并排序每层都要处理全部元素，而拆分层数大约是 <code>log n</code>，所以复杂度是 <code>O(n log n)</code>。
                            </p>
                        </div>
                        <CodeBlock>{`// 合并两个有序区间
while (i <= mid && j <= r) {
  if (a[i] <= a[j]) temp.push_back(a[i++]);
  else temp.push_back(a[j++]);
}`}</CodeBlock>
                        <Callout icon={Layers2} title="空间代价" tone="amber">
                            归并排序通常需要额外数组暂存合并结果，这也是它和原地排序的差异。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                分治题请先写出递归函数的参数含义，再写出口和拆分方式。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>实现归并排序并输出排序结果。</li>
                                <li>用分治求数组最大值。</li>
                                <li>画出 n=8 时递归拆分树。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课学习贪心。分治先拆问题，贪心则每一步都做当前最优选择。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
