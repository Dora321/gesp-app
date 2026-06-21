import React, { useMemo, useState } from 'react';
import { AlertTriangle, ClipboardCheck, Search, ShieldCheck, Trophy } from 'lucide-react';
import CppL4LessonSupport from '../../../components/CppL4LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '考前策略' },
    { id: 2, title: '模拟卷流程', category: '时间分配' },
    { id: 3, title: '四级高频坑', category: '错题防线' },
    { id: 4, title: '复盘模板', category: '考后提升' },
    { id: 5, title: '练习与作业', category: '闭环输出' },
];

const examItems = [
    { name: '函数与参数', minutes: 12 },
    { name: '数组/结构体', minutes: 18 },
    { name: '排序/递推', minutes: 25 },
    { name: '检查与重测', minutes: 10 },
];

function ExamPlanLab() {
    const [extraCheck, setExtraCheck] = useState(5);
    const total = useMemo(() => examItems.reduce((sum, item) => sum + item.minutes, extraCheck), [extraCheck]);

    return (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Trophy className="text-indigo-700" />
                <h3 className="text-xl font-black text-slate-950">模拟考试时间表</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <label className="block text-sm font-black text-slate-700">额外检查时间：{extraCheck} 分钟</label>
                    <input
                        type="range"
                        min="0"
                        max="15"
                        value={extraCheck}
                        onChange={(event) => setExtraCheck(Number(event.target.value))}
                        className="mt-3 w-full"
                    />
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        不要把所有时间都花在写代码，最后必须留出重测和检查。
                    </p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <div className="space-y-3">
                        {[...examItems, { name: '额外检查', minutes: extraCheck }].map((item) => (
                            <div key={item.name} className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-lg bg-indigo-50 px-4 py-3">
                                <span className="font-black text-slate-800">{item.name}</span>
                                <span className="font-mono font-black text-indigo-800">{item.minutes} min</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 rounded-lg bg-slate-900 px-4 py-3 text-right font-mono text-sm font-black text-white">
                        总计 {total} min
                    </div>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '四级综合题卡住 10 分钟怎么办？',
        answer: '先降级拿部分分',
        reason: '先写可过小数据或核心步骤，再回来补完整。',
    },
    {
        question: '排序题提交前最该检查什么？',
        answer: '边界和比较条件',
        reason: '升降序、同分规则、j+1 越界都很常见。',
    },
    {
        question: '错题复盘要记录什么？',
        answer: '错因和修正策略',
        reason: '只记答案没有用，要知道下次如何避免。',
    },
];

export default function CppL4Lesson16() {
    return (
        <CppLessonShell
            lessonNumber={16}
            lessonTitle="全真模拟与避坑 (2)"
            lessonSubtitle="把四级知识点整理成考试执行流程"
            accent="indigo"
            levelTitle="C++ 资深"
            levelCode="L4"
            sections={sections}
            previousPath="/lesson/4/15"
            nextPath="/level4"
            topSupport={<CppL4LessonSupport lessonId={16} />}
            bottomSupport={<CppL4LessonSupport lessonId={16} placement="bottom" />}
            hero={{
                title: '最后一课不是再堆知识，而是把知识变成稳定得分动作',
                description: '本课整理四级高频错误、模拟卷时间分配和复盘模板，让学生知道考场上先做什么、卡住时怎么办。',
            }}
            goals={['能制定四级模拟卷做题顺序', '能检查函数、数组、排序、递推的高频错误', '能用错题模板完成复盘闭环']}
            childrenBySection={{
                1: <ExamPlanLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">模拟卷流程：先稳基础，再攻综合</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                考试时不要从最难题死磕。先把能确定的分拿到，再把剩余时间投给综合题和检查。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`// 考场执行顺序
1. 快速浏览题目和数据范围
2. 先做熟悉题型，拿稳定分
3. 综合题先写输入输出和基础逻辑
4. 卡住时先保留部分正确代码
5. 最后用边界样例重测`}</CodeBlock>
                            <StepList steps={[
                                '先读数据范围，判断算法复杂度',
                                '能一眼确定的题先完成',
                                '综合题先搭框架，不追求一步到位',
                                '最后留时间检查边界和格式',
                            ]} />
                        </div>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">四级高频坑：把错误变成检查清单</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                四级错误集中在函数参数、数组下标、结构体排序、递推初始值和输出格式。
                            </p>
                        </div>
                        <CompareTable
                            headers={['模块', '高频坑', '检查动作']}
                            rows={[
                                ['函数', '传值修改不影响原变量', '需要修改时用引用或返回值'],
                                ['数组', '下标越界', '确认循环条件和数组容量'],
                                ['排序', '比较规则写反', '用 3 个元素手推一轮'],
                                ['递推', '初始值漏写', '先列 f[0]、f[1] 或 f[1]、f[2]'],
                            ]}
                        />
                        <Callout icon={AlertTriangle} title="输出格式" tone="amber">
                            很多题不是算法错，而是多输出空格、少换行、或输出顺序和题面不一致。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">复盘模板：每道错题都要能归类</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                错题复盘不是抄答案。要把错误放进分类：审题、语法、边界、算法、调试习惯。
                            </p>
                        </div>
                        <CodeBlock>{`题目：
错因分类：审题 / 语法 / 边界 / 算法 / 输出格式
原错误：
正确做法：
下次检查动作：
相似题：`}</CodeBlock>
                        <Callout icon={ShieldCheck} title="复盘目标" tone="blue">
                            每次复盘都要产出一句可执行提醒，例如“排序题先手推比较规则，再写代码”。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                最后一课要完成一次闭环：限时做题、记录卡点、订正、复测。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>完成一套四级模拟卷，并记录每题用时。</li>
                                <li>把错题按审题、边界、算法、输出格式分类。</li>
                                <li>选 2 道错题隔天重做，确认不是只看懂了答案。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一阶段建议" tone="blue">
                            四级完成后，可以先刷四级真题巩固，再进入五级的数论、高精度、链表、二分和贪心。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
