import React, { useMemo, useState } from 'react';
import { ClipboardCheck, MoveLeft, Search, Rows3 } from 'lucide-react';
import CppL4LessonSupport from '../../../components/CppL4LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList } from '../CppLessonShell';

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

function InsertionPredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'插入排序里，不先写 int key = a[i] 就开始右移元素，会怎样？'}
                options={['没影响', 'a[i] 被覆盖，原值丢了']}
                correctIndex={1}
                explanation="右移时 a[j + 1] = a[j] 会覆盖掉 a[i]。必须先把它存进 key，最后再放回空位。"
                misconception="以为可以边移动边读 a[i]，忘了它已经被覆盖。"
            />
            <PredictCheck
                prompt={'内层写成 while (a[j] > key)，漏了 j >= 0，会怎样？'}
                options={['没问题', 'j 可能减到 -1，访问 a[-1] 越界']}
                correctIndex={1}
                explanation="当 key 比有序区所有数都小时，j 会一直减到 -1。没有 j >= 0 拦着，就会访问 a[-1] 越界。"
                misconception="只盯着「比 key 大就右移」，忘了左边界保护。"
            />
            <PredictCheck
                prompt={'外层循环为什么从 i = 1 开始，而不是 i = 0？'}
                options={['从 0 开始也一样', '下标 0 单个元素天然有序']}
                correctIndex={1}
                explanation="只有一个元素时本来就有序，所以从第 2 个（下标 1）开始往左插。"
                misconception="习惯所有循环都从 0 开始，没意识到第一个元素不用插。"
            />
        </div>
    );
}

const insertionMasteryItems = [
    {
        label: '能解释有序区和无序区。',
        evidence: '左边已排好，右边逐个取出 key 插入进去。',
        retryHint: '回到插入排序演示台，盯住绿色有序区如何扩大。',
    },
    {
        label: '能写出「先暂存 key，再右移」的模板。',
        evidence: '知道 int key = a[i] 必须写在右移之前。',
        retryHint: '回到「易错点」，想想不存 key 会丢掉什么。',
    },
    {
        label: '能解释 while 两个条件缺一不可。',
        evidence: 'j >= 0 防越界，a[j] > key 决定是否继续右移。',
        retryHint: '想一想 key 最小时 j 会一直减到哪里。',
    },
    {
        label: '能区分插入 / 冒泡 / 选择并迁移到降序。',
        evidence: '插入右移、冒泡相邻交换、选择找最值；把 a[j] > key 改成 < 即降序。',
        retryHint: '回到「对比冒泡」表，逐行说一遍核心动作。',
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
            topSupport={<CppL4LessonSupport lessonId={10} />}
            bottomSupport={<CppL4LessonSupport lessonId={10} placement="bottom" />}
            hero={{
                title: '插入排序像摸牌：新牌拿到后，插进左边正确的位置',
                description: '本课强调“有序区”的概念：左边始终排好序，右边逐个取出元素插入进去。',
            }}
            goals={['能解释有序区和无序区', '能写出元素右移模板', '能区分插入排序和冒泡排序']}
            prerequisites={['会遍历一维数组', '写 while 循环并控制边界', '会交换两个数组元素']}
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
                        <InsertionPredictionChecks />
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
                        <MasteryCheck
                            title="C++ L4-10 插入排序离开前检查"
                            description="插入排序最怕“没存 key 就右移”和“while 漏了 j>=0”。勾选前先用 5 张牌手推一轮。"
                            items={insertionMasteryItems}
                        />
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
