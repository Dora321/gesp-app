import React, { useMemo, useState } from 'react';
import { ClipboardCheck, MousePointer2, Search, Trophy } from 'lucide-react';
import CppL4LessonSupport from '../../../components/CppL4LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '挑选最小' },
    { id: 2, title: '选择思想', category: '排序模型' },
    { id: 3, title: '代码模板', category: '最值下标' },
    { id: 4, title: '三种排序对比', category: '策略辨析' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

const startArray = [6, 4, 9, 1, 5];

function selectionState(round) {
    const arr = [...startArray];
    for (let i = 0; i < round; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    return arr;
}

function SelectionSortLab() {
    const [round, setRound] = useState(0);
    const arr = useMemo(() => selectionState(round), [round]);

    return (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Trophy className="text-indigo-700" />
                <h3 className="text-xl font-black text-slate-950">选择排序演示台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <label className="block text-sm font-black text-slate-700">完成轮数：{round}</label>
                    <input
                        type="range"
                        min="0"
                        max={startArray.length - 1}
                        value={round}
                        onChange={(event) => setRound(Number(event.target.value))}
                        className="mt-3 w-full"
                    />
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        每一轮都从右侧未排序区间里挑出最小值，放到左侧边界。
                    </p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <div className="flex flex-wrap gap-3">
                        {arr.map((value, index) => (
                            <div
                                key={`${value}-${index}`}
                                className={`flex h-16 w-16 items-center justify-center rounded-xl font-mono text-xl font-black ${index < round
                                    ? 'bg-emerald-100 text-emerald-800 ring-2 ring-emerald-200'
                                    : 'bg-indigo-100 text-indigo-800'
                                }`}
                            >
                                {value}
                            </div>
                        ))}
                    </div>
                    <p className="mt-4 text-xs font-bold text-slate-500">绿色区域表示已经选出的最小值序列。</p>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '选择排序每轮要找什么？',
        answer: '未排序区最小值',
        reason: '升序排序时，把最小值放到当前左边界。',
    },
    {
        question: '为什么通常记录 minIndex？',
        answer: '方便最后交换',
        reason: '扫描过程中只记录位置，等一轮结束再交换。',
    },
    {
        question: '选择排序每轮交换几次？',
        answer: '最多一次',
        reason: '找到最小值下标后，把它和 a[i] 交换即可。',
    },
];

export default function CppL4Lesson11() {
    return (
        <CppLessonShell
            lessonNumber={11}
            lessonTitle="挑选最小的：选择排序"
            lessonSubtitle="每轮挑出目标元素放到固定位置"
            accent="indigo"
            levelTitle="C++ 资深"
            levelCode="L4"
            sections={sections}
            previousPath="/lesson/4/10"
            nextPath="/lesson/4/12"
            topSupport={<CppL4LessonSupport lessonId={11} />}
            bottomSupport={<CppL4LessonSupport lessonId={11} placement="bottom" />}
            hero={{
                title: '选择排序的核心：先找到目标，再交换到边界',
                description: '本课用升序排序讲“选择最小值”。同样的方法也可以改成每轮选择最大值，关键是记录目标下标。',
            }}
            goals={['能用 minIndex 记录最小值位置', '能写出选择排序双重循环', '能比较冒泡、插入、选择三种策略']}
            childrenBySection={{
                1: <SelectionSortLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">选择思想：在剩余元素里挑出最小值</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                选择排序的每一轮都很直接：从当前位置开始往后找最小值，找到后和当前位置交换。
                            </p>
                        </div>
                        <CompareTable
                            headers={['步骤', '动作', '结果']}
                            rows={[
                                ['设 minIndex = i', '先假设当前位置最小', '有一个候选答案'],
                                ['扫描 j = i+1 到 n-1', '发现更小值就更新下标', '找到真正最小值'],
                                ['swap(a[i], a[minIndex])', '目标值放到左边界', '有序区扩大一格'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">代码模板：先找下标，再交换</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                选择排序不要边找边交换。边扫描边更新下标，一轮结束再交换，逻辑更清楚。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`for (int i = 0; i < n - 1; i++) {
  int minIndex = i;
  for (int j = i + 1; j < n; j++) {
    if (a[j] < a[minIndex]) {
      minIndex = j;
    }
  }
  swap(a[i], a[minIndex]);
}`}</CodeBlock>
                            <StepList steps={[
                                'i 是当前要确定的位置',
                                'minIndex 保存最小值下标',
                                'j 扫描右侧未排序区',
                                '一轮只在最后交换一次',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">三种排序对比：看清每轮确定了什么</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                冒泡、插入、选择都能排序，但它们的“每轮任务”不同。题目要求解释过程时，这一点最重要。
                            </p>
                        </div>
                        <CompareTable
                            headers={['排序', '每轮任务', '关键词']}
                            rows={[
                                ['冒泡排序', '通过相邻交换把最大值送到右侧', '相邻交换'],
                                ['插入排序', '把新元素插入左侧有序区', '右移空位'],
                                ['选择排序', '找出最小值并换到左侧边界', '最值下标'],
                            ]}
                        />
                        <Callout icon={MousePointer2} title="改成降序" tone="blue">
                            把 <code>a[j] &lt; a[minIndex]</code> 改成 <code>a[j] &gt; a[maxIndex]</code>，每轮就会选择最大值。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                本课作业重点不是背代码，而是能说清楚每个下标变量的职责。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>读入 n 个整数，用选择排序升序输出。</li>
                                <li>把选择排序改成降序，变量名改为 maxIndex。</li>
                                <li>比较三种排序在同一组数据上的每轮结果。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课进入递推算法。排序关注“顺序变化”，递推关注“从前一项推出后一项”。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
