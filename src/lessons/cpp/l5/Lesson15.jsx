import React, { useMemo, useState } from 'react';
import { ClipboardCheck, ListChecks, Search, Target } from 'lucide-react';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '题型识别' },
    { id: 2, title: '读题流程', category: '输入输出' },
    { id: 3, title: '策略选择', category: '算法工具箱' },
    { id: 4, title: '调试清单', category: '边界检查' },
    { id: 5, title: '练习与作业', category: '专项训练' },
];

const signals = {
    '有序数组里找答案': ['二分查找', '检查单调性', '写清楚 left/right/mid 更新'],
    '最多选择不冲突区间': ['贪心', '按结束时间排序', '维护 lastEnd'],
    '大整数超出 long long': ['高精度', '用字符串或 vector 存每一位', '处理进位和前导零'],
    '链式删除或环形报数': ['链表/模拟', '保护 next 指针', '删除后更新当前位置'],
};

function StrategyLab() {
    const [signal, setSignal] = useState('有序数组里找答案');
    const advice = useMemo(() => signals[signal], [signal]);

    return (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Target className="text-emerald-700" />
                <h3 className="text-xl font-black text-slate-950">题型信号选择器</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-emerald-100">
                    <label className="block text-sm font-black text-slate-700">题面信号</label>
                    <select value={signal} onChange={(event) => setSignal(event.target.value)} className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold">
                        {Object.keys(signals).map((item) => <option key={item}>{item}</option>)}
                    </select>
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        专项训练的目标是把题面信号翻译成算法选择，而不是看到题就直接敲代码。
                    </p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-emerald-100">
                    <div className="text-sm font-black text-slate-500">推荐处理</div>
                    <ol className="mt-3 space-y-2">
                        {advice.map((item, index) => (
                            <li key={item} className="rounded-lg bg-emerald-100 px-4 py-3 text-sm font-black text-emerald-800">
                                {index + 1}. {item}
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '专项训练第一步是什么？',
        answer: '读清输入输出',
        reason: '输入规模、输出要求、边界条件会决定算法和实现细节。',
    },
    {
        question: '看到“最大最小值答案”常想什么？',
        answer: '二分答案',
        reason: '如果答案具有单调性，就可以用二分缩小范围。',
    },
    {
        question: '调试时先看哪类数据？',
        answer: '最小和边界',
        reason: 'n=0/1、相等元素、极大值最容易暴露错误。',
    },
];

export default function CppL5Lesson15() {
    return (
        <CppLessonShell
            lessonNumber={15}
            lessonTitle="编程题专项训练"
            lessonSubtitle="从题面信号到算法选择"
            accent="emerald"
            levelTitle="C++ 专家"
            levelCode="L5"
            sections={sections}
            previousPath="/lesson/5/14"
            nextPath="/lesson/5/16"
            hero={{
                title: '专项训练要练“选择算法”的能力，而不是只刷代码量',
                description: '本课把五级核心知识点组合成读题、选策略、写模板、查边界的完整流程。',
            }}
            goals={['能从题面提取算法信号', '能为不同数据范围选择策略', '能用调试清单检查边界错误']}
            childrenBySection={{
                1: <StrategyLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">读题流程：先把题目翻译成可执行任务</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                五级题常常把多个知识点包装在故事里。先提取输入、输出、限制、目标，再决定算法。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`读题四问：
1. 输入规模是多少？
2. 要输出一个答案，还是一组方案？
3. 数据是否有序、可排序、可分段？
4. 是否存在边界：0、1、重复、极大值？`}</CodeBlock>
                            <StepList steps={[
                                '圈出 n、m、数据范围',
                                '用一句话写目标',
                                '判断是否有单调性或重复状态',
                                '先写样例推导再写代码',
                            ]} />
                        </div>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">策略选择：把知识点放进工具箱</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                一个题面可能有多个可行写法。优先选择能解释正确性、复杂度也能通过的方案。
                            </p>
                        </div>
                        <CompareTable
                            headers={['题面信号', '优先工具', '检查点']}
                            rows={[
                                ['质数、约数、倍数', '筛法 / GCD', '范围是否允许暴力'],
                                ['大整数计算', '高精度', '进位、借位、前导零'],
                                ['有序或答案单调', '二分', '边界更新是否收敛'],
                                ['局部选择', '贪心', '能否构造反例'],
                                ['重复子问题', '记忆化', '状态是否定义清楚'],
                            ]}
                        />
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">调试清单：先查最容易错的地方</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                调试不是随机改代码。五级常见错误集中在边界、下标、初始化、输出格式和复杂度。
                            </p>
                        </div>
                        <CodeBlock>{`提交前检查：
□ 数组下标是否从 0/1 统一？
□ int 是否会溢出，需要 long long 吗？
□ 二分循环是否一定收敛？
□ 链表删除是否保留后继节点？
□ 输出格式是否和题面完全一致？`}</CodeBlock>
                        <Callout icon={ListChecks} title="调试顺序" tone="emerald">
                            先用最小样例，再用边界样例，最后再用随机或大规模样例。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                本课建议做成限时训练：每题先写策略，再写代码，最后复盘错误类型。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>完成 1 道数论、1 道二分、1 道贪心专项题。</li>
                                <li>每题提交前写出复杂度。</li>
                                <li>把错题归类到边界、算法选择、实现细节或输出格式。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课进行全真模拟，把时间分配、审题节奏和提交策略一起练出来。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
