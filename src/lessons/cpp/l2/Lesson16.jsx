import React, { useState } from 'react';
import { ClipboardCheck, Clock, FileText, ListChecks, Trophy } from 'lucide-react';
import CppL2LessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from './CppL2LessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '模拟考试' },
    { id: 2, title: '考点地图', category: '知识复盘' },
    { id: 3, title: '答题节奏', category: '时间管理' },
    { id: 4, title: '考后复盘', category: '提分闭环' },
    { id: 5, title: '结课任务', category: '下一阶段' },
];

function ExamChecklist() {
    const items = ['输入输出与类型转换', 'switch 与分支流程', '嵌套循环与图形', '质数、数位、因数倍数', '数组统计与模拟'];
    const [checked, setChecked] = useState([true, true, false, false, false]);

    const done = checked.filter(Boolean).length;

    return (
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Trophy className="text-amber-700" />
                <h3 className="text-xl font-black text-slate-950">考前能力自检</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-amber-100">
                    <div className="text-3xl font-black text-amber-700">{done}/{items.length}</div>
                    <p className="mt-2 text-sm font-semibold text-slate-600">已确认掌握模块</p>
                    <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">
                        <div className="h-full bg-amber-500 transition-all" style={{ width: `${(done / items.length) * 100}%` }} />
                    </div>
                </div>
                <div className="grid gap-2">
                    {items.map((item, index) => (
                        <button
                            key={item}
                            onClick={() => setChecked((current) => current.map((value, i) => (i === index ? !value : value)))}
                            className={`rounded-lg px-4 py-3 text-left text-sm font-black transition ${checked[index] ? 'bg-amber-500 text-slate-950' : 'bg-white text-slate-700 ring-1 ring-amber-100'}`}
                        >
                            {checked[index] ? '已掌握：' : '待复习：'}{item}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '模拟考前最该先复习什么？',
        answer: '自己反复错的模块',
        reason: '短时间提分优先处理高频错因，而不是平均用力。',
    },
    {
        question: '编程题卡住 10 分钟怎么办？',
        answer: '先写暴力或跳过',
        reason: '考试要保护总分，不能被一题拖垮节奏。',
    },
    {
        question: '考后复盘只看分数够吗？',
        answer: '不够',
        reason: '要按知识点和错因分类，才能知道下一轮怎么练。',
    },
];

export default function CppL2Lesson16() {
    return (
        <CppL2LessonShell
            lessonNumber={16}
            lessonTitle="全真模拟考试"
            lessonSubtitle="把二级知识链条收束成考试策略"
            accent="amber"
            sections={sections}
            previousPath="/lesson/2/15"
            nextPath="/level2"
            hero={{
                title: '最后一课不是结束，是把知识变成稳定得分',
                description: '二级课程已经覆盖分支、循环、数学、数位、数组和模拟。现在要用一套考试流程，把会的东西稳定交出来。',
            }}
            goals={['能按模块复盘二级知识', '能建立模拟考答题节奏', '能用错题分类规划下一轮训练']}
            childrenBySection={{
                1: <ExamChecklist />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">考点地图：二级是一条连续能力链</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                不要把 16 节课当成散点。二级题经常把循环、取余、数组和模拟混在一起考。
                            </p>
                        </div>
                        <CompareTable
                            headers={['模块', '核心能力', '代表题型']}
                            rows={[
                                ['分支与 switch', '按条件选择路径', '菜单、等级、流程图'],
                                ['嵌套循环', '二维过程枚举', '图形、乘法表、数对'],
                                ['数学与取余', '判断整除和数位', '质数、数位和、因数'],
                                ['数组与模拟', '保存并更新一组状态', '统计、最高值、过程模拟'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">答题节奏：先稳分，再攻难题</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                模拟考不是展示聪明，而是管理风险。先拿确定分，再处理需要推演的题。
                            </p>
                        </div>
                        <StepList steps={[
                            '先快速扫题，标出熟悉题型',
                            '先做输入输出、分支、基础循环题',
                            '流程图和模拟题画状态表',
                            '编程题先保证能过样例',
                            '最后回头检查边界和类型',
                        ]} />
                        <Callout icon={Clock} title="时间提醒" tone="amber">
                            一道题如果 8 到 10 分钟没有推进，先写下卡点并跳过。二级考试要保护整体完成度。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">考后复盘：把错题变成下一轮训练计划</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                复盘不能只写“粗心”。要把错误归类到知识点、读题、边界、代码实现或时间分配。
                            </p>
                        </div>
                        <CodeBlock>{`错题复盘模板：
1. 题型：数组统计 / 数位 / 模拟 / ...
2. 错因：边界 / 类型 / 读题 / 漏条件
3. 修法：具体改哪一行
4. 下次检查：提交前必须看什么`}</CodeBlock>
                        <Callout icon={FileText} title="复盘标准" tone="emerald">
                            能写出“以后遇到同类题怎么检查”，这道错题才算真正复盘完。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">结课任务</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                完成这一页后，学生应该进入二级真题训练，而不是立刻跳到更高级内容。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="二级结课清单" tone="slate">
                            <ul className="space-y-2">
                                <li>完成一套二级模拟卷，并按模块记录错题。</li>
                                <li>整理 10 个高频检查点：边界、类型、数组、取余、模拟顺序。</li>
                                <li>从错题里选 3 道重写，要求不看答案独立通过样例。</li>
                            </ul>
                        </Callout>
                        <Callout icon={ListChecks} title="下一阶段建议" tone="blue">
                            如果二级模拟卷稳定通过，再进入三级的进制、位运算、字符串和枚举专题；如果模拟题不稳，先继续刷二级综合题。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
