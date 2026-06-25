import React, { useMemo, useState } from 'react';
import { AlertTriangle, ClipboardCheck, GitBranch, Repeat, Search } from 'lucide-react';
import CppL4LessonSupport from '../../../components/CppL4LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '递归模型' },
    { id: 2, title: '递归是什么', category: '自己调用自己' },
    { id: 3, title: '边界条件', category: '停止规则' },
    { id: 4, title: '递归展开', category: '调用栈直觉' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function RecursionLab() {
    const [n, setN] = useState(5);

    const rows = useMemo(() => {
        const result = [];
        let current = n;
        while (current > 1) {
            result.push(`fact(${current}) = ${current} * fact(${current - 1})`);
            current--;
        }
        result.push('fact(1) = 1');
        return result;
    }, [n]);

    const answer = useMemo(() => {
        let total = 1;
        for (let i = 2; i <= n; i++) total *= i;
        return total;
    }, [n]);

    return (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Repeat className="text-indigo-700" />
                <h3 className="text-xl font-black text-slate-950">递归展开实验台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <label className="block text-sm font-black text-slate-700">n = {n}</label>
                    <input type="range" min="1" max="7" value={n} onChange={(event) => setN(Number(event.target.value))} className="mt-3 w-full" />
                    <p className="mt-5 text-3xl font-black text-indigo-700">{n}! = {answer}</p>
                </div>
                <div className="grid gap-2">
                    {rows.map((row) => (
                        <div key={row} className="rounded-lg bg-white px-4 py-3 font-mono text-sm font-black text-slate-700 ring-1 ring-indigo-100">
                            {row}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '递归函数最不能缺什么？',
        answer: '边界条件',
        reason: '没有边界条件，函数会一直调用自己，直到程序崩溃。',
    },
    {
        question: 'fact(1) = 1 属于什么？',
        answer: '递归边界',
        reason: '它让阶乘递归有明确停止点。',
    },
    {
        question: '递归适合什么问题？',
        answer: '能拆成同类小问题的问题',
        reason: '例如阶乘、斐波那契、树遍历和搜索。',
    },
];

function RecursionPredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'int fact(int n){ return n * fact(n-1); } 漏了边界 if(n==1)，会怎样？'}
                options={['算到 fact(0) 自动停', '一直往下调，栈溢出崩溃']}
                correctIndex={1}
                explanation="没有边界，n 会一路减到 0、-1、-2…… 永不停止，调用栈被撑爆，程序崩溃。必须先写 if(n==1) return 1。"
                misconception="以为递归会自己在某个地方停下来。"
            />
            <PredictCheck
                prompt={'写成 return n * fact(n)（参数没变小），会怎样？'}
                options={['没问题', '参数不变，无限递归']}
                correctIndex={1}
                explanation="每次都用同样的 n 调用自己，永远到不了边界。递归关系必须让问题变小，比如 fact(n-1)。"
                misconception="忘了每次调用都要更靠近边界。"
            />
            <PredictCheck
                prompt={'求 fact(4) 时，最先算出具体数值的是哪一层？'}
                options={['fact(4) 先算出来', 'fact(1) 先返回 1']}
                correctIndex={1}
                explanation="递归先一路调用到边界 fact(1)=1，再逐层往回乘：2、6、24。最外层最后才得到结果。"
                misconception="以为从 fact(4) 就能直接算，没意识到要先到底再逐层返回。"
            />
        </div>
    );
}

const recursionMasteryItems = [
    {
        label: '能说出递归的两个必备部分。',
        evidence: '边界条件（最小问题答案）+ 递归关系（拆成更小的同类问题）。',
        retryHint: '回到「两个部分」，缺哪个都会出问题。',
    },
    {
        label: '能写出阶乘 / 求和递归并定对边界。',
        evidence: 'if (n == 1) return 1; return n * fact(n - 1)。',
        retryHint: '先写最小问题的答案，再写怎么把问题变小。',
    },
    {
        label: '能解释为什么参数必须每次变小。',
        evidence: '不变小就到不了边界，会无限递归直到栈溢出。',
        retryHint: '回到「递归不能原地打转」。',
    },
    {
        label: '能手动展开一次调用与返回。',
        evidence: '能写出 fact(4) 一路调用到 fact(1)，再 1→2→6→24 逐层返回。',
        retryHint: '回到递归展开表，分「等待什么」和「返回」两列。',
    },
];

export default function CppL4Lesson4() {
    return (
        <CppLessonShell
            lessonNumber={4}
            lessonTitle="递归初探 (函数调用自己)"
            lessonSubtitle="把大问题拆成同类小问题"
            accent="indigo"
            levelTitle="C++ 资深"
            levelCode="L4"
            sections={sections}
            previousPath="/lesson/4/3"
            nextPath="/lesson/4/5"
            topSupport={<CppL4LessonSupport lessonId={4} />}
            bottomSupport={<CppL4LessonSupport lessonId={4} placement="bottom" />}
            hero={{
                title: '递归是函数能力的第一次升级：自己调用自己',
                description: '本课从阶乘入门递归，重点理解递归关系、边界条件和调用展开。先建立直觉，再进入后续搜索与树。',
            }}
            goals={['能解释递归函数如何调用自己', '能写出阶乘递归', '能指出递归边界和递归关系']}
            prerequisites={['会定义和调用函数', '理解函数有返回值 return', '会写 if 条件判断']}
            childrenBySection={{
                1: <RecursionLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">递归是什么：把大问题交给更小的自己</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                如果一个问题能拆成“当前一步 + 更小的同类问题”，就可以尝试递归。
                            </p>
                        </div>
                        <CodeBlock>{`int fact(int n) {
  if (n == 1) return 1;
  return n * fact(n - 1);
}`}</CodeBlock>
                        <Callout icon={GitBranch} title="两个部分" tone="indigo">
                            递归函数必须包含边界条件和递归关系。缺任何一个都会出问题。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">边界条件：递归必须知道什么时候停</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                边界条件是最小问题的答案。比如 <code>fact(1) = 1</code>，不用再继续拆。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`int sumTo(int n) {
  if (n == 1) return 1;
  return n + sumTo(n - 1);
}`}</CodeBlock>
                            <StepList steps={[
                                '先写最小问题答案',
                                '再写如何拆成更小问题',
                                '保证每次调用离边界更近',
                                '检查 n = 1 或 n = 0 的情况',
                            ]} />
                        </div>
                        <Callout icon={AlertTriangle} title="递归不能原地打转" tone="amber">
                            如果写成 <code>return n * fact(n);</code>，参数没有变小，会无限递归。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">递归展开：先一路调用，再逐层返回</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                理解递归时，可以把它想成一摞等待完成的函数调用。到达边界后，答案从最里面一层层返回。
                            </p>
                        </div>
                        <CompareTable
                            headers={['调用', '等待什么', '返回']}
                            rows={[
                                ['fact(4)', '4 * fact(3)', '24'],
                                ['fact(3)', '3 * fact(2)', '6'],
                                ['fact(2)', '2 * fact(1)', '2'],
                                ['fact(1)', '边界', '1'],
                            ]}
                        />
                        <RecursionPredictionChecks />
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                递归入门阶段，先用小数据手动展开，不要直接背代码。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <MasteryCheck
                            title="C++ L4-4 递归初探离开前检查"
                            description="递归最怕“能背阶乘，但说不清为什么会停、按什么顺序返回”。勾选前先用 fact(4) 手动展开一次。"
                            items={recursionMasteryItems}
                        />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>写递归函数计算 n!。</li>
                                <li>写递归函数计算 1 + 2 + ... + n。</li>
                                <li>手动展开 <code>fact(4)</code> 的调用和返回过程。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课进入指针入门。函数和递归解决“代码结构”，指针开始解决“数据位置”。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
