import React, { useMemo, useState } from 'react';
import { ClipboardCheck, MoveLeft, Search, Rows3 } from 'lucide-react';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '有序区' },
    { id: 2, title: '插入思想', category: '排序模型' },
    { id: 3, title: '代码模板', category: '移动元素' },
    { id: 4, title: '对比冒泡', category: '算法辨析' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

const startArray = [7, 3, 5, 2, 6];

function insertionState(step) {
    const arr = [...startArray];
    for (let i = 1; i <= step; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}

function InsertionSortLab() {
    const [step, setStep] = useState(0);
    const arr = useMemo(() => insertionState(step), [step]);

    return (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Rows3 className="text-indigo-700" />
                <h3 className="text-xl font-black text-slate-950">插入排序演示台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <label className="block text-sm font-black text-slate-700">已插入到第 {step + 1} 个元素</label>
                    <input
                        type="range"
                        min="0"
                        max={startArray.length - 1}
                        value={step}
                        onChange={(event) => setStep(Number(event.target.value))}
                        className="mt-3 w-full"
                    />
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        左侧绿色区间保持有序，新元素会向左寻找自己的位置。
                    </p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <div className="flex flex-wrap gap-3">
                        {arr.map((value, index) => (
                            <div
                                key={`${value}-${index}`}
                                className={`flex h-16 w-16 items-center justify-center rounded-xl font-mono text-xl font-black ${index <= step
                                    ? 'bg-emerald-100 text-emerald-800 ring-2 ring-emerald-200'
                                    : 'bg-indigo-100 text-indigo-800'
                                }`}
                            >
                                {value}
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
        question: '插入排序维护的是什么区间？',
        answer: '左侧有序区',
        reason: '每次把新元素插入左边已经排好序的部分。',
    },
    {
        question: '移动元素时为什么从右往左看？',
        answer: '要给 key 腾位置',
        reason: '比 key 大的元素整体右移，空出来的位置放 key。',
    },
    {
        question: '插入排序从哪个下标开始？',
        answer: '通常从 1 开始',
        reason: '下标 0 的单个元素天然有序。',
    },
];

export default function CppL4Lesson10() {
    return (
        <CppLessonShell
            lessonNumber={10}
            lessonTitle="打扑克牌：插入排序"
            lessonSubtitle="像整理手牌一样维护左侧有序区"
            accent="indigo"
            levelTitle="C++ 资深"
            levelCode="L4"
            sections={sections}
            previousPath="/lesson/4/9"
            nextPath="/lesson/4/11"
            hero={{
                title: '插入排序像摸牌：新牌拿到后，插进左边正确的位置',
                description: '本课强调“有序区”的概念：左边始终排好序，右边逐个取出元素插入进去。',
            }}
            goals={['能解释有序区和无序区', '能写出元素右移模板', '能区分插入排序和冒泡排序']}
            childrenBySection={{
                1: <InsertionSortLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">插入思想：把新元素放进已有顺序里</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                插入排序适合用“整理扑克牌”来理解：手里左边的牌已经有序，每摸到一张新牌，就找到它应该插入的位置。
                            </p>
                        </div>
                        <CompareTable
                            headers={['区域', '含义', '处理方式']}
                            rows={[
                                ['左侧有序区', '已经排好序', '保持顺序不乱'],
                                ['当前 key', '准备插入的新元素', '暂存起来'],
                                ['右侧无序区', '还没处理', '后续逐个插入'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">代码模板：暂存 key，再向右挪元素</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                插入排序最容易写错的地方是移动顺序：先保存当前元素，再移动比它大的元素，最后把 key 放进空位。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`for (int i = 1; i < n; i++) {
  int key = a[i];
  int j = i - 1;

  while (j >= 0 && a[j] > key) {
    a[j + 1] = a[j];
    j--;
  }

  a[j + 1] = key;
}`}</CodeBlock>
                            <StepList steps={[
                                'key 暂存当前要插入的元素',
                                'j 从有序区最右侧开始向左找',
                                '比 key 大的元素右移一格',
                                '循环结束后把 key 放到 j+1',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">对比冒泡：一个交换相邻，一个移动空位</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                冒泡排序的主角是相邻交换；插入排序的主角是把元素移出空位，再插入 key。
                            </p>
                        </div>
                        <CompareTable
                            headers={['算法', '核心动作', '每轮结果']}
                            rows={[
                                ['冒泡排序', '相邻比较并交换', '右侧确定最大值'],
                                ['插入排序', '向右移动并插入', '左侧有序区扩大'],
                                ['选择排序', '找最小值并交换', '左侧确定最小值'],
                            ]}
                        />
                        <Callout icon={MoveLeft} title="易错点" tone="amber">
                            不要在移动过程中覆盖 <code>a[i]</code> 后才想起来保存它。必须先写 <code>int key = a[i];</code>。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                手推插入排序时，请画出“有序区边界”，这比只盯着代码更稳。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>读入 n 个整数，用插入排序升序输出。</li>
                                <li>输出每轮插入后数组的状态。</li>
                                <li>把比较条件改成降序，并解释变化。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课学习选择排序。它每一轮先找最小值，再把它换到前面。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
