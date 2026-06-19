import React, { useMemo, useState } from 'react';
import { ClipboardCheck, Gauge, Search, SplitSquareHorizontal } from 'lucide-react';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '折半思想' },
    { id: 2, title: '二分条件', category: '单调性' },
    { id: 3, title: '查找模板', category: '左右边界' },
    { id: 4, title: '答案二分', category: '可行性判断' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

const values = [3, 7, 11, 18, 24, 31, 39, 45, 52, 68];

function BinaryLab() {
    const [target, setTarget] = useState(31);
    const trace = useMemo(() => {
        let left = 0;
        let right = values.length - 1;
        const steps = [];
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            steps.push({ left, mid, right, value: values[mid] });
            if (values[mid] === target) break;
            if (values[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return steps;
    }, [target]);

    const last = trace[trace.length - 1];
    const found = last?.value === target;

    return (
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <SplitSquareHorizontal className="text-amber-700" />
                <h3 className="text-xl font-black text-slate-950">二分查找演示台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-amber-100">
                    <label className="block text-sm font-black text-slate-700">目标值：{target}</label>
                    <input type="range" min="1" max="70" value={target} onChange={(event) => setTarget(Number(event.target.value))} className="mt-3 w-full" />
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        当前数组已升序。二分每次比较中点，排除一半区间。
                    </p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-amber-100">
                    <div className="flex flex-wrap gap-2">
                        {values.map((value, index) => (
                            <span key={value} className={`rounded-lg px-3 py-2 font-mono text-sm font-black ${last && index === last.mid
                                ? 'bg-emerald-100 text-emerald-800 ring-2 ring-emerald-200'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                                {value}
                            </span>
                        ))}
                    </div>
                    <p className="mt-4 text-sm font-bold text-slate-600">
                        比较 {trace.length} 次，{found ? `找到 ${target}` : `没有找到 ${target}`}。
                    </p>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '二分查找的前提是什么？',
        answer: '有序或单调',
        reason: '只有能判断答案在左边还是右边，才能丢掉一半。',
    },
    {
        question: 'mid 推荐怎么写？',
        answer: 'l + (r-l)/2',
        reason: '避免 l+r 在大数据时溢出。',
    },
    {
        question: '答案二分的核心函数是什么？',
        answer: 'check(mid)',
        reason: '用它判断当前答案是否可行，从而移动边界。',
    },
];

export default function CppL5Lesson10() {
    return (
        <CppLessonShell
            lessonNumber={10}
            lessonTitle="猜数字的艺术 (二分查找)"
            lessonSubtitle="用单调性每次排除一半答案"
            accent="amber"
            levelTitle="C++ 专家"
            levelCode="L5"
            sections={sections}
            previousPath="/lesson/5/9"
            nextPath="/lesson/5/11"
            hero={{
                title: '二分不是只会找数，而是利用单调性缩小答案范围',
                description: '本课从有序数组查找入门，再过渡到答案二分，建立“边界 + check”的思考框架。',
            }}
            goals={['能写出二分查找模板', '能解释单调性为何必要', '能初步使用 check 函数做答案二分']}
            childrenBySection={{
                1: <BinaryLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">二分条件：你必须知道该往哪边走</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                二分查找的本质是做一次判断后，确定某一半不可能有答案。没有单调性，就不能随便丢掉一半。
                            </p>
                        </div>
                        <CompareTable
                            headers={['场景', '能否二分', '原因']}
                            rows={[
                                ['升序数组找 x', '可以', '中点小于 x，答案只可能在右边'],
                                ['乱序数组找 x', '不可以', '中点大小无法说明位置'],
                                ['求最小可行答案', '可以', '可行性通常呈现 false...true'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">查找模板：left、right、mid 三个变量要守住含义</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                下面模板查找目标值是否存在。每次循环都保证答案如果存在，一定在 <code>[left, right]</code> 里。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`int binarySearch(vector<int> a, int target) {
  int left = 0, right = a.size() - 1;
  while (left <= right) {
    int mid = left + (right - left) / 2;
    if (a[mid] == target) return mid;
    if (a[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`}</CodeBlock>
                            <StepList steps={[
                                'mid 是当前区间中点',
                                '相等就返回答案',
                                'mid 太小，移动 left',
                                'mid 太大，移动 right',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">答案二分：不是找元素，而是找最小可行值</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                很多题没有现成数组，但答案范围是单调的。此时要写 <code>check(mid)</code> 判断当前答案是否可行。
                            </p>
                        </div>
                        <CodeBlock>{`int left = 1, right = 1000000, ans = -1;
while (left <= right) {
  int mid = left + (right - left) / 2;
  if (check(mid)) {
    ans = mid;
    right = mid - 1;
  } else {
    left = mid + 1;
  }
}`}</CodeBlock>
                        <Callout icon={Gauge} title="先写 check" tone="amber">
                            答案二分的难点通常不在二分模板，而在 <code>check(mid)</code> 是否正确表达“可行”。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                二分题请写清楚边界含义：当前区间里保存的是可能答案，还是不确定区间。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>在升序数组中查找目标值下标。</li>
                                <li>找第一个大于等于 x 的位置。</li>
                                <li>用答案二分求“最小满足条件的速度/容量”。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课学习分治。二分是分治的一种极简形态：每次把问题切成更小的区间。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
