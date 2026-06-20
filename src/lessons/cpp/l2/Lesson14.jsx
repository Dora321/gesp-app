import React, { useMemo, useState } from 'react';
import { ClipboardCheck, Database, ListChecks, PlayCircle, ShieldCheck } from 'lucide-react';
import CppL2LessonSupport from '../../../components/CppL2LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '综合模拟' },
    { id: 2, title: '多状态更新', category: '核心方法' },
    { id: 3, title: '数组记录过程', category: '历史信息' },
    { id: 4, title: '样例调试', category: '正确性验证' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function ScoreSimulator() {
    const [answers, setAnswers] = useState(['Y', 'N', 'Y', 'Y', 'N']);
    const scores = [10, 20, 10, 30, 20];

    const trace = useMemo(() => {
        let total = 0;
        return answers.map((answer, index) => {
            if (answer === 'Y') total += scores[index];
            return { index: index + 1, answer, score: scores[index], total };
        });
    }, [answers]);

    const toggle = (index) => {
        setAnswers((current) => current.map((answer, i) => (i === index ? (answer === 'Y' ? 'N' : 'Y') : answer)));
    };

    return (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <PlayCircle className="text-emerald-700" />
                <h3 className="text-xl font-black text-slate-950">答题得分模拟</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-emerald-100">
                    <p className="text-sm font-black text-slate-700">点击 Y/N 切换每题是否答对</p>
                    <div className="mt-4 grid gap-2">
                        {answers.map((answer, index) => (
                            <button
                                key={`${answer}-${index}`}
                                onClick={() => toggle(index)}
                                className={`rounded-lg px-4 py-3 text-sm font-black transition ${answer === 'Y' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'}`}
                            >
                                第 {index + 1} 题：{answer}，分值 {scores[index]}
                            </button>
                        ))}
                    </div>
                </div>
                <StepList steps={trace.map((item) => `第 ${item.index} 题 ${item.answer}，本题 ${item.score} 分，累计 ${item.total}`)} />
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '多状态模拟最怕什么？',
        answer: '更新顺序错',
        reason: '先判断再更新，还是先更新再判断，结果可能完全不同。',
    },
    {
        question: '为什么要保存历史数据？',
        answer: '后面可能还要查询',
        reason: '如果题目问最高分、某一步状态，就需要数组记录过程。',
    },
    {
        question: '样例不通过时先查哪里？',
        answer: '状态表',
        reason: '状态表能定位是哪一步和题目描述不一致。',
    },
];

export default function CppL2Lesson14() {
    return (
        <CppLessonShell
            lessonNumber={14}
            lessonTitle="模拟算法实战 2"
            lessonSubtitle="多个变量一起变化时，先稳住顺序"
            accent="emerald"
            sections={sections}
            previousPath="/lesson/2/13"
            nextPath="/lesson/2/15"
            topSupport={<CppL2LessonSupport lessonId={14} />}
            bottomSupport={<CppL2LessonSupport lessonId={14} placement="bottom" />}
            hero={{
                title: '综合模拟题的难点，是同时照看几个会变的量',
                description: '这一课把条件、循环、数组放在同一题里训练。重点是更新顺序、历史记录和样例调试。',
            }}
            goals={['能处理多个状态变量', '能用数组记录过程数据', '能用样例反查模拟步骤']}
            childrenBySection={{
                1: <ScoreSimulator />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">多状态更新：每一步都要清楚谁先变</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                综合模拟题通常不止一个变量变化。分数、次数、最大值、当前位置可能同时更新，顺序必须和题意一致。
                            </p>
                        </div>
                        <CodeBlock>{`int total = 0, best = 0;
for (int i = 0; i < n; i++) {
  char ok;
  int score;
  cin >> ok >> score;

  if (ok == 'Y') total += score;
  if (total > best) best = total;
}`}</CodeBlock>
                        <Callout icon={ShieldCheck} title="更新顺序检查" tone="emerald">
                            如果题目说“本次操作后记录最高值”，就先更新 total，再更新 best。顺序错一行，答案可能就变。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">数组记录过程：未来要查，就先存下来</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                有些模拟题不只问最终结果，还问第几步、最大状态、某个位置的历史值。这时数组就要登场。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-2">
                            <CodeBlock>{`int history[100];
int total = 0;
for (int i = 0; i < n; i++) {
  total += change;
  history[i] = total;
}`}</CodeBlock>
                            <CodeBlock>{`int best = history[0];
for (int i = 1; i < n; i++) {
  if (history[i] > best) {
    best = history[i];
  }
}`}</CodeBlock>
                        </div>
                        <CompareTable
                            headers={['只问最终值', '问过程值', '推荐做法']}
                            rows={[
                                ['可以不存数组', '需要查每一步', '用数组保存历史'],
                                ['边读边算即可', '后面还会比较', '先保存再遍历'],
                                ['变量少', '信息多', '状态表辅助调试'],
                            ]}
                        />
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">样例调试：别只盯最终输出</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                模拟题样例不通过时，最终答案只能告诉你错了，状态表才能告诉你从哪一步开始错。
                            </p>
                        </div>
                        <StepList steps={[
                            '把样例输入拆成一行一个操作',
                            '手算每一步状态变化',
                            '在代码里临时输出关键变量',
                            '对比从哪一步开始不同',
                            '修正更新顺序或边界条件',
                        ]} />
                        <Callout icon={Database} title="调试输出" tone="blue">
                            可以临时输出 <code>i</code>、<code>cmd</code>、<code>total</code>、<code>best</code> 等关键变量。提交前再删掉调试输出。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                这一课所有练习都要求提交一张状态表，不能只交代码。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>模拟答题得分：答对加对应分值，输出总分和最高累计分。</li>
                                <li>模拟余额变化：每次收入或支出后，记录余额历史。</li>
                                <li>设计一个数组保存每天步数，输出最高步数和出现日期。</li>
                            </ul>
                        </Callout>
                        <Callout icon={ListChecks} title="下一课衔接" tone="blue">
                            下一课做易错题诊疗，把二级课程里最容易丢分的边界、循环和数组错误集中处理。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
