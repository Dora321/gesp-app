import React, { useState } from 'react';
import { AlertTriangle, ClipboardCheck, ListChecks, Search, ShieldAlert } from 'lucide-react';
import CppL2LessonSupport from '../../../components/CppL2LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '错因分类' },
    { id: 2, title: '边界错误', category: '循环数组' },
    { id: 3, title: '类型错误', category: '表达式结果' },
    { id: 4, title: '调试流程', category: '修错方法' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function BugClinic() {
    const [caseId, setCaseId] = useState('loop');

    const cases = {
        loop: {
            title: '循环多跑一次',
            bad: `for (int i = 0; i <= n; i++) {
  sum += a[i];
}`,
            fix: `for (int i = 0; i < n; i++) {
  sum += a[i];
}`,
            reason: '数组前 n 个元素下标是 0 到 n - 1。',
        },
        type: {
            title: '整数除法丢小数',
            bad: `double avg = sum / n;`,
            fix: `double avg = 1.0 * sum / n;`,
            reason: 'sum 和 n 都是 int 时会先做整数除法。',
        },
        init: {
            title: '最大值初始错误',
            bad: `int mx = 0;`,
            fix: `int mx = a[0];`,
            reason: '如果所有数据都是负数，mx = 0 会得到不存在的结果。',
        },
    };

    const current = cases[caseId];

    return (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <ShieldAlert className="text-red-700" />
                <h3 className="text-xl font-black text-slate-950">易错诊疗台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
                <div className="grid gap-2 rounded-xl bg-white p-5 ring-1 ring-red-100">
                    {Object.entries(cases).map(([id, item]) => (
                        <button
                            key={id}
                            onClick={() => setCaseId(id)}
                            className={`rounded-lg px-4 py-3 text-left text-sm font-black transition ${caseId === id ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                        >
                            {item.title}
                        </button>
                    ))}
                </div>
                <div className="grid gap-4">
                    <h4 className="text-xl font-black text-red-950">{current.title}</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                        <CodeBlock>{current.bad}</CodeBlock>
                        <CodeBlock>{current.fix}</CodeBlock>
                    </div>
                    <p className="rounded-xl bg-white p-4 text-sm font-semibold leading-7 text-slate-700 ring-1 ring-red-100">
                        {current.reason}
                    </p>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '数组长度 n，循环条件通常怎么写？',
        answer: 'i < n',
        reason: '合法下标是 0 到 n - 1。',
    },
    {
        question: '求平均值为什么要乘 1.0？',
        answer: '避免整数除法',
        reason: '让表达式进入浮点计算，保留小数。',
    },
    {
        question: '最大值为什么常用 a[0] 初始化？',
        answer: '数据范围更安全',
        reason: '不依赖额外假设，负数数据也能正确处理。',
    },
];

const masteryItems = [
    {
        label: '能一眼判断循环边界该用 < 还是 <=。',
        evidence: '遍历下标 0 到 n-1 用 i < n；枚举 1 到 n 用 i <= n。',
        retryHint: '回到「边界错误」的对照表。',
    },
    {
        label: '能解释整数除法为什么丢小数、怎么修。',
        evidence: 'sum 和 n 都是 int 时先做整除；乘 1.0 让计算进入浮点。',
        retryHint: '回到「类型错误」的两段代码对比。',
    },
    {
        label: '能说出最大值为什么用 a[0] 初始化。',
        evidence: 'mx = 0 在全负数数据下会输出不存在的结果。',
        retryHint: '回到易错诊疗台的「最大值初始错误」。',
    },
    {
        label: '能按调试流程定位第一步出错的位置。',
        evidence: '复现样例、手算关键变量、临时输出、找到第一处不同。',
        retryHint: '回到「调试流程」的五步清单。',
    },
];

export default function CppL2Lesson15() {
    return (
        <CppLessonShell
            lessonNumber={15}
            lessonTitle="易错题诊疗室"
            lessonSubtitle="把常见丢分点变成检查清单"
            accent="blue"
            sections={sections}
            previousPath="/lesson/2/14"
            nextPath="/lesson/2/16"
            topSupport={<CppL2LessonSupport lessonId={15} />}
            bottomSupport={<CppL2LessonSupport lessonId={15} placement="bottom" />}
            hero={{
                title: '二级真正拉开差距的，不是会不会写，而是错不错边界',
                description: '这一课集中处理循环、数组、类型、初始化和调试流程。目标是让学生形成提交前自查习惯。',
            }}
            goals={['能识别循环边界错误', '能避开整数除法和初始化坑', '能用样例和状态表定位 bug']}
            childrenBySection={{
                1: <BugClinic />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">边界错误：多一次、少一次、越界一次</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                二级错题里，边界问题出现频率极高。循环起点、终点、数组下标必须逐个检查。
                            </p>
                        </div>
                        <CompareTable
                            headers={['场景', '推荐写法', '常见错误']}
                            rows={[
                                ['遍历 n 个数组元素', 'i = 0; i < n', 'i <= n 导致越界'],
                                ['枚举 1 到 n', 'i = 1; i <= n', '写成 i < n 漏掉 n'],
                                ['试除到平方根', 'i * i <= n', '少判断完全平方数'],
                            ]}
                        />
                        <Callout icon={AlertTriangle} title="边界自问" tone="amber">
                            写完循环后问自己：第一个值会不会处理？最后一个值会不会处理？会不会多处理一个不存在的位置？
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">类型错误：表达式先算，再赋值</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                很多同学以为左边是 double，右边就会自动保留小数。实际上右边表达式会先按自己的类型规则计算。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-2">
                            <CodeBlock>{`int sum = 7, n = 2;
double avg = sum / n;
// avg 得到 3，不是 3.5`}</CodeBlock>
                            <CodeBlock>{`int sum = 7, n = 2;
double avg = 1.0 * sum / n;
// avg 得到 3.5`}</CodeBlock>
                        </div>
                        <Callout icon={Search} title="类型检查点" tone="blue">
                            除法、平均值、百分比、cmath 返回值，这四类代码写完都要检查类型。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">调试流程：从样例到最小反例</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                不要靠盯代码修 bug。先让错误可复现，再缩小范围，最后修一处验证一处。
                            </p>
                        </div>
                        <StepList steps={[
                            '确认样例输入输出抄对',
                            '手算样例中的关键变量变化',
                            '在代码中临时输出变量',
                            '找到第一步不同的位置',
                            '修改后重新跑样例和边界样例',
                        ]} />
                        <Callout icon={ListChecks} title="边界样例库" tone="emerald">
                            每道题至少试：最小输入、最大附近输入、刚好卡条件的输入、全相等或全相反的数据。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                这节课的作业不是多刷题，而是训练错因分类。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <MasteryCheck
                            title="C++ L2-15 易错诊疗离开前检查"
                            description="这节课的产出是提交前自查习惯。勾选前先用一道自己的错题过一遍四个检查点。"
                            items={masteryItems}
                        />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>整理 5 个自己写错过的循环边界错误。</li>
                                <li>给数组求和、平均值、最大值各写 2 个边界样例。</li>
                                <li>把一道错题按“错因、修法、以后检查点”复盘。</li>
                            </ul>
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
