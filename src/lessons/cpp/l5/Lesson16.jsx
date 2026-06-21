import React, { useMemo, useState } from 'react';
import { ClipboardCheck, Search, ShieldCheck, Trophy } from 'lucide-react';
import CppL5LessonSupport from '../../../components/CppL5LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '模拟节奏' },
    { id: 2, title: '考试策略', category: '先稳后冲' },
    { id: 3, title: '时间分配', category: '限时训练' },
    { id: 4, title: '错题复盘', category: '闭环提升' },
    { id: 5, title: '练习与作业', category: '五级收官' },
];

const checklist = [
    '读完所有题并标记难度',
    '先拿确定能做的分',
    '每题写复杂度估算',
    '提交前检查边界和输出',
    '赛后完成错题复盘',
];

function MockLab() {
    const [done, setDone] = useState(['读完所有题并标记难度']);
    const score = useMemo(() => Math.round((done.length / checklist.length) * 100), [done]);

    const toggle = (item) => {
        setDone((current) => current.includes(item)
            ? current.filter((value) => value !== item)
            : [...current, item]);
    };

    return (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Trophy className="text-rose-700" />
                <h3 className="text-xl font-black text-slate-950">模拟考试准备度</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-rose-100">
                    <div className="text-xs font-black uppercase text-slate-400">准备度</div>
                    <div className="mt-2 text-5xl font-black text-rose-700">{score}%</div>
                    <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                        模拟不是为了证明已经会了，而是提前暴露节奏、边界和心态问题。
                    </p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-rose-100">
                    <div className="grid gap-2">
                        {checklist.map((item) => (
                            <label key={item} className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-black ${done.includes(item) ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                                <input type="checkbox" checked={done.includes(item)} onChange={() => toggle(item)} />
                                {item}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '模拟考试先做什么题？',
        answer: '确定能拿分的题',
        reason: '先稳住基础分，再把剩余时间投入难题。',
    },
    {
        question: '卡题超过多久要先跳过？',
        answer: '约 8-10 分钟',
        reason: '长时间卡住会挤压后面可得分题的时间。',
    },
    {
        question: '赛后复盘最重要产物是什么？',
        answer: '下次检查动作',
        reason: '复盘要变成可执行习惯，而不是只知道答案。',
    },
];

export default function CppL5Lesson16() {
    return (
        <CppLessonShell
            lessonNumber={16}
            lessonTitle="全真模拟与技巧"
            lessonSubtitle="把能力转化成稳定得分"
            accent="rose"
            levelTitle="C++ 专家"
            levelCode="L5"
            sections={sections}
            previousPath="/lesson/5/15"
            nextPath="/level5"
            topSupport={<CppL5LessonSupport lessonId={16} />}
            bottomSupport={<CppL5LessonSupport lessonId={16} placement="bottom" />}
            hero={{
                title: '五级收官不是再塞知识点，而是练稳定、节奏和复盘',
                description: '本课用全真模拟策略把数论、高精度、链表、二分、贪心和记忆化串成考试闭环。',
            }}
            goals={['能制定一套模拟考试时间分配', '能按难度顺序稳定拿分', '能把错题复盘成下次检查动作']}
            childrenBySection={{
                1: <MockLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">考试策略：先稳后冲，别让难题吞掉整场考试</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                五级题的区分度更高。最可靠的策略是先扫全卷，把确定题做完，再集中处理高风险题。
                            </p>
                        </div>
                        <CompareTable
                            headers={['阶段', '动作', '目标']}
                            rows={[
                                ['前 5 分钟', '通读题目，标记 easy / medium / hard', '知道分布'],
                                ['中段', '先做确定能过样例的题', '稳定拿分'],
                                ['后段', '处理卡点题和优化复杂度', '冲更高分'],
                                ['最后 5 分钟', '检查输出格式和边界', '减少低级失误'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">时间分配：给每题设置止损线</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                卡住并不等于失败，但一直卡住会损失全局分数。模拟训练时要练“暂时放下”的能力。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`建议节奏：
0-5 分钟：扫题，标记难度
5-35 分钟：完成最有把握的题
35-70 分钟：攻克中等题
70-85 分钟：处理难题或补部分分
最后 5 分钟：检查输出、边界、文件名`}</CodeBlock>
                            <StepList steps={[
                                '先读全卷，不急着敲第一题',
                                '每题先写算法和复杂度',
                                '卡住 8-10 分钟先跳过',
                                '最后统一检查格式和边界',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">错题复盘：把错误变成下次的检查动作</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                有效复盘必须能回答：错在哪里、为什么当时没发现、下次怎样提前发现。
                            </p>
                        </div>
                        <CodeBlock>{`五级错题复盘表：
题目：
知识点：数论 / 高精度 / 链表 / 二分 / 贪心 / 记忆化
错因：审题 / 边界 / 算法选择 / 实现 / 复杂度 / 输出
当时信号：
正确做法：
下次检查动作：`}</CodeBlock>
                        <Callout icon={ShieldCheck} title="复盘标准" tone="rose">
                            如果复盘后没有产生“下次提交前要检查什么”，这次复盘还不够。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                五级收官作业要闭环：限时模拟、订正、隔天复测。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>完成一次五级限时模拟，并记录每题用时。</li>
                                <li>把所有错题按错因归类。</li>
                                <li>隔天重做 2 道错题，确认不依赖记忆答案。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一阶段建议" tone="blue">
                            五级完成后，先用真题巩固 2-3 轮；确认基础稳定后，再进入六级的数据结构和综合算法。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
