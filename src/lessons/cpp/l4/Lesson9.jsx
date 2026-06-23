import React, { useMemo, useState } from 'react';
import { ArrowRightLeft, ClipboardCheck, Repeat, Search } from 'lucide-react';
import CppL4LessonSupport from '../../../components/CppL4LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CodeTracer, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '相邻比较' },
    { id: 2, title: '冒泡思想', category: '排序模型' },
    { id: 3, title: '代码模板', category: '双重循环' },
    { id: 4, title: '边界与优化', category: '易错诊断' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

const startArray = [5, 1, 4, 2, 8];

function bubbleStates() {
    const states = [{ arr: [...startArray], note: '初始数组，还没有开始比较。' }];
    const arr = [...startArray];

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
        states.push({
            arr: [...arr],
            note: `第 ${i + 1} 轮结束：当前未排序区间里的最大值已经沉到右侧。`,
        });
    }

    return states;
}

function BubbleSortLab() {
    const [round, setRound] = useState(0);
    const states = useMemo(() => bubbleStates(), []);
    const current = states[round];

    return (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Repeat className="text-indigo-700" />
                <h3 className="text-xl font-black text-slate-950">冒泡排序演示台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <label className="block text-sm font-black text-slate-700">完成轮数：{round}</label>
                    <input
                        type="range"
                        min="0"
                        max={states.length - 1}
                        value={round}
                        onChange={(event) => setRound(Number(event.target.value))}
                        className="mt-3 w-full"
                    />
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">{current.note}</p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <div className="flex flex-wrap gap-3">
                        {current.arr.map((value, index) => (
                            <div
                                key={`${value}-${index}`}
                                className={`flex h-16 w-16 items-center justify-center rounded-xl font-mono text-xl font-black ${index >= current.arr.length - round && round > 0
                                    ? 'bg-emerald-100 text-emerald-800 ring-2 ring-emerald-200'
                                    : 'bg-indigo-100 text-indigo-800'
                                }`}
                            >
                                {value}
                            </div>
                        ))}
                    </div>
                    <p className="mt-4 text-xs font-bold text-slate-500">绿色区域表示每轮已经归位的最大值。</p>
                </div>
            </div>
        </div>
    );
}

const bubbleTraceCode = `int a[5] = {5, 1, 4, 2, 8};

for (int i = 0; i < 4; i++) {
  for (int j = 0; j < 4 - i; j++) {
    if (a[j] > a[j + 1]) {
      swap(a[j], a[j + 1]);
    }
  }
}`;

const formatArray = (items) => items.join(' ');

const bubbleTraceSteps = (() => {
    const arr = [...startArray];
    const steps = [
        {
            active: [0],
            vars: { i: '未开始', j: '-', '数组': formatArray(arr) },
            action: '进入第 1 轮',
        },
    ];

    for (let i = 0; i < arr.length - 1; i += 1) {
        steps.push({
            active: [2],
            vars: { i, j: 0, '数组': formatArray(arr) },
            row: [`第 ${i + 1} 轮开始`, i, '-', formatArray(arr), `右侧已有 ${i} 个元素归位`],
            action: `比较 j = 0`,
        });

        for (let j = 0; j < arr.length - 1 - i; j += 1) {
            const left = arr[j];
            const right = arr[j + 1];
            const shouldSwap = left > right;

            steps.push({
                active: [3, 4],
                vars: { i, j, '数组': formatArray(arr) },
                row: [`比较 a[${j}] 和 a[${j + 1}]`, i, j, `${left} 与 ${right}`, shouldSwap ? '前大后小，需要交换' : '顺序正确，不交换'],
                action: shouldSwap ? `交换 ${left} 和 ${right}` : (j === arr.length - 2 - i ? '结束本轮扫描' : `比较 j = ${j + 1}`),
            });

            if (shouldSwap) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                steps.push({
                    active: [5],
                    vars: { i, j, '数组': formatArray(arr) },
                    row: ['交换后', i, j, formatArray(arr), `${right} 向左，${left} 向右`],
                    action: j === arr.length - 2 - i ? '结束本轮扫描' : `比较 j = ${j + 1}`,
                });
            }
        }

        steps.push({
            active: [3],
            vars: { i, j: arr.length - 1 - i, '数组': formatArray(arr) },
            exit: i === arr.length - 2
                ? `第 ${i + 1} 轮结束：最后两个元素也已经排好，冒泡排序完成。`
                : `第 ${i + 1} 轮结束：${arr[arr.length - 1 - i]} 已经在右侧归位，下一轮内层条件变成 j < ${arr.length - 2 - i}。`,
            action: i === arr.length - 2 ? '查看最终输出' : `进入第 ${i + 2} 轮`,
        });
    }

    steps.push({
        active: [7],
        vars: { i: 4, j: '-', '数组': formatArray(arr) },
        action: '显示最终结果',
        output: `排序完成：${formatArray(arr)}`,
    });

    return steps;
})();

function BubbleSortTracer() {
    return (
        <CodeTracer
            title="冒泡排序追踪器：相邻比较，把最大值送到右侧"
            code={bubbleTraceCode}
            varOrder={['i', 'j', '数组']}
            columns={['阶段', 'i', 'j', '当前内容', '动作']}
            steps={bubbleTraceSteps}
            hint="先看一轮：只比较相邻两格，右侧会确定一个最大值。"
        />
    );
}

const quiz = [
    {
        question: '冒泡排序每一轮通常确定哪个元素？',
        answer: '当前最大值',
        reason: '升序排序时，大的数会通过相邻交换逐步移动到右侧。',
    },
    {
        question: '为什么内层循环要减去 i？',
        answer: '右侧已有 i 个元素归位',
        reason: '归位元素不需要重复比较，否则只是浪费时间。',
    },
    {
        question: '冒泡排序的核心动作是什么？',
        answer: '相邻比较并交换',
        reason: '只比较 a[j] 和 a[j+1]，顺序不对就交换。',
    },
];

export default function CppL4Lesson9() {
    return (
        <CppLessonShell
            lessonNumber={9}
            lessonTitle="排队的智慧：冒泡排序"
            lessonSubtitle="用相邻交换把最大值一轮轮送到队尾"
            accent="indigo"
            levelTitle="C++ 资深"
            levelCode="L4"
            sections={sections}
            previousPath="/lesson/4/8"
            nextPath="/lesson/4/10"
            topSupport={<CppL4LessonSupport lessonId={9} />}
            bottomSupport={<CppL4LessonSupport lessonId={9} placement="bottom" />}
            hero={{
                title: '冒泡排序的诀窍：只盯住相邻两个人，顺序错了就交换',
                description: '本课把排序拆成可观察的轮次：每一轮都把当前最大值推到右边，最终整个数组从小到大排好。',
            }}
            goals={['能解释冒泡排序每一轮的作用', '能写出双重循环边界', '能用交换模板修正相邻元素顺序']}
            childrenBySection={{
                1: <BubbleSortLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">冒泡思想：比较相邻元素，让大的往后走</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                冒泡排序不需要一次看完整个数组。它只重复做一件事：比较相邻的两个数，如果前面比后面大，就交换。
                            </p>
                        </div>
                        <CompareTable
                            headers={['动作', '含义', '结果']}
                            rows={[
                                ['比较 a[j] 和 a[j+1]', '只看相邻两个元素', '判断顺序是否正确'],
                                ['如果 a[j] > a[j+1]', '升序时前大后小不合理', '交换两个元素'],
                                ['一轮结束', '最大值一路向右移动', '队尾确定一个元素'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">代码模板：外层轮数，内层相邻比较</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                数组有 n 个数，最多需要 n-1 轮。第 i 轮结束后，右侧 i 个元素已经有序，所以内层比较范围会变短。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`for (int i = 0; i < n - 1; i++) {
  for (int j = 0; j < n - 1 - i; j++) {
    if (a[j] > a[j + 1]) {
      swap(a[j], a[j + 1]);
    }
  }
}`}</CodeBlock>
                            <StepList steps={[
                                '外层 i 表示已经完成了几轮',
                                '内层 j 扫描尚未归位的部分',
                                '只访问 a[j] 和 a[j+1]',
                                '比较范围必须保证 j+1 不越界',
                            ]} />
                        </div>
                        <BubbleSortTracer />
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">边界与优化：没有交换就可以提前结束</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                如果某一轮没有发生交换，说明数组已经有序，可以提前停止。
                            </p>
                        </div>
                        <CodeBlock>{`for (int i = 0; i < n - 1; i++) {
  bool changed = false;
  for (int j = 0; j < n - 1 - i; j++) {
    if (a[j] > a[j + 1]) {
      swap(a[j], a[j + 1]);
      changed = true;
    }
  }
  if (!changed) break;
}`}</CodeBlock>
                        <Callout icon={ArrowRightLeft} title="边界提醒" tone="amber">
                            内层条件写成 <code>j &lt; n - 1 - i</code>，因为循环体里会访问 <code>a[j + 1]</code>。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                做排序题时，先手推一轮，确认“谁被确定下来”，再写循环边界。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>读入 n 个整数，用冒泡排序升序输出。</li>
                                <li>把冒泡排序改成降序排序。</li>
                                <li>输出冒泡排序中一共发生了多少次交换。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课学习插入排序。它不再把最大值送到队尾，而是维护一个“左侧有序区”。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
