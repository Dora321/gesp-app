import React, { useMemo, useState } from 'react';
import { ClipboardCheck, Search, Timer, Trophy } from 'lucide-react';
import CppL6LessonSupport from '../../../components/CppL6LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '全真节奏' },
    { id: 2, title: '时间策略', category: '先稳后冲' },
    { id: 3, title: '题型分配', category: '六级地图' },
    { id: 4, title: '赛后复盘', category: '二轮订正' },
    { id: 5, title: '练习与作业', category: '六级收官' },
];

const checklist = [
    '先扫全卷并标记题型',
    '搜索题先画状态图',
    'OOP 题先画类图',
    'DP 题先写四件套',
    '最后检查输出格式和边界',
];

function MockExamLab() {
    const [done, setDone] = useState(['先扫全卷并标记题型', 'DP 题先写四件套']);
    const score = useMemo(() => Math.round((done.length / checklist.length) * 100), [done]);

    const toggle = (item) => {
        setDone((current) => current.includes(item)
            ? current.filter((value) => value !== item)
            : [...current, item]);
    };

    return (
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Trophy className="text-amber-700" />
                <h3 className="text-xl font-black text-slate-950">六级模拟准备度</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-amber-100">
                    <div className="text-xs font-black uppercase text-slate-400">准备度</div>
                    <div className="mt-2 text-5xl font-black text-amber-700">{score}%</div>
                    <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                        六级模拟要同时检查算法选择、代码结构和调试节奏。准备度来自可执行动作，不是感觉。
                    </p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-amber-100">
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
        question: '六级 DP 题动手前先写什么？',
        answer: 'DP 四件套',
        reason: '状态、初值、转移、答案能防止盲写模板。',
    },
    {
        question: 'OOP 综合题动手前先画什么？',
        answer: '类图',
        reason: '类图能让职责和继承关系先清楚起来。',
    },
    {
        question: '模拟后最重要的动作是什么？',
        answer: '二轮订正',
        reason: '隔天重做能验证自己是真会了，不是刚看懂答案。',
    },
];

const masteryItems = [
    {
        label: '能按题型安排六级作答顺序。',
        evidence: '先扫全卷标出搜索、OOP、DP，先做最确定的模板题，再攻综合题。',
        retryHint: '回到「时间策略」的阶段表。',
    },
    {
        label: '动笔前会为每类题写专用草稿。',
        evidence: '搜索画状态图，OOP 画类图，DP 写四件套，背包先定 0/1 还是完全、容量方向。',
        retryHint: '回到「题型分配」的草稿模板。',
    },
    {
        label: '能用六级复盘表归类错题。',
        evidence: '题型、错因（审题/模型/初始化/循环方向/输出格式）、二轮订正日期。',
        retryHint: '回到「赛后复盘」的表格。',
    },
    {
        label: '知道错题什么时候才算真正掌握。',
        evidence: '隔天能独立重做，才说明这道题进入了能力库。',
        retryHint: '回到「复盘标准」。',
    },
];

export default function CppL6Lesson16() {
    return (
        <CppLessonShell
            prerequisites={['已完成六级易错题诊疗室', '熟悉 GESP 六级的题型分布', '会在限定时间内取舍难题']}
            lessonNumber={16}
            lessonTitle="全真模拟考试"
            lessonSubtitle="用流程把能力稳定输出"
            accent="amber"
            levelTitle="C++ 大师"
            levelCode="L6"
            sections={sections}
            previousPath="/lesson/6/15"
            nextPath="/level6"
            topSupport={<CppL6LessonSupport lessonId={16} />}
            bottomSupport={<CppL6LessonSupport lessonId={16} placement="bottom" />}
            hero={{
                title: '六级收官要练的不是单点知识，而是整场考试的稳定性',
                description: '本课把树、搜索、OOP、格雷码、DP 和背包整合成全真模拟流程。',
            }}
            goals={['能制定六级模拟考试时间分配', '能根据题型选择搜索/OOP/DP 策略', '能完成赛后错题分类和二轮订正']}
            childrenBySection={{
                1: <MockExamLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">时间策略：先扫题型，再安排作答顺序</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                六级题型跨度大，不要被第一道卡题拖住。先判断题型，再决定先拿哪部分分。
                            </p>
                        </div>
                        <CompareTable
                            headers={['阶段', '动作', '目标']}
                            rows={[
                                ['前 5 分钟', '通读全卷，标搜索/OOP/DP', '知道题型分布'],
                                ['中段', '先做最确定的模板题', '稳定拿分'],
                                ['后段', '处理综合题和优化题', '冲高分'],
                                ['最后 5 分钟', '检查边界、输出、循环方向', '减少低级失误'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">题型分配：不同题型先写不同草稿</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                搜索题先画状态图，OOP 题先画类图，DP 题先写四件套。草稿越清楚，代码越少返工。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`六级草稿模板：
搜索题：状态、转移、visited、队列/递归
OOP 题：类、成员、接口、关系
DP 题：状态、初值、转移、答案
背包题：0/1 或完全、容量方向、答案位置`}</CodeBlock>
                            <StepList steps={[
                                '先标题型，不急着写代码',
                                '为每类题写专用草稿',
                                '确认复杂度能过数据范围',
                                '提交前按错题清单检查',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">赛后复盘：错题必须进入二轮订正</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                只看答案不算复盘。六级错题要隔天重做，并记录自己是否能独立写出关键转移或类结构。
                            </p>
                        </div>
                        <CodeBlock>{`六级复盘表：
题目：
题型：树 / BFS / DFS / OOP / 格雷码 / DP / 背包
错因：审题 / 模型 / 初始化 / 循环方向 / 输出格式
关键草稿：
正确代码要点：
二轮订正日期：
下次检查动作：`}</CodeBlock>
                        <Callout icon={Timer} title="复盘标准" tone="amber">
                            隔天能独立重做，才说明这道题真正进入能力库。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                六级收官作业要做完整闭环：模拟、订正、复测、整理模板。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <MasteryCheck
                            title="C++ L6-16 全真模拟离开前检查"
                            description="六级收官检查的是整场考试的稳定性。勾选前先把四类题的草稿模板各默写一遍。"
                            items={masteryItems}
                        />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>完成一套六级限时模拟，记录每题用时和题型。</li>
                                <li>把错题按搜索、OOP、DP、背包、输出格式分类。</li>
                                <li>整理一页六级提交前检查清单。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一阶段建议" tone="blue">
                            六级完成后，建议先刷真题巩固搜索和 DP，再进入七级图论、复杂数据结构和更综合的算法专题。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
