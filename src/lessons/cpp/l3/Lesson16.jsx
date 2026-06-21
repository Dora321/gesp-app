import React, { useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, ClipboardCheck, ListChecks, Search, Trophy } from 'lucide-react';
import CppL3LessonSupport from '../../../components/CppL3LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '模拟考' },
    { id: 2, title: '考前清单', category: '能力确认' },
    { id: 3, title: '易错题诊疗', category: '高频坑' },
    { id: 4, title: '整卷策略', category: '时间分配' },
    { id: 5, title: '练习与作业', category: '收束输出' },
];

function ExamChecklistLab() {
    const [checked, setChecked] = useState({
        base: true,
        bit: true,
        array: true,
        string: false,
        enum: false,
        simulate: false,
    });

    const items = [
        ['base', '进制与补码'],
        ['bit', '位运算'],
        ['array', '数组统计'],
        ['string', '字符串处理'],
        ['enum', '枚举法'],
        ['simulate', '模拟法'],
    ];

    const done = useMemo(() => Object.values(checked).filter(Boolean).length, [checked]);

    return (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Trophy className="text-rose-700" />
                <h3 className="text-xl font-black text-slate-950">三级考前清单</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="grid gap-3 sm:grid-cols-2">
                    {items.map(([id, label]) => (
                        <button
                            key={id}
                            onClick={() => setChecked((current) => ({ ...current, [id]: !current[id] }))}
                            className={`rounded-xl border p-4 text-left font-black transition ${checked[id] ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-slate-200 bg-white text-slate-600'}`}
                        >
                            <CheckCircle2 className="mb-2" size={20} />
                            {label}
                        </button>
                    ))}
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-rose-100">
                    <p className="text-sm font-black text-slate-500">完成度</p>
                    <p className="mt-2 text-4xl font-black text-rose-700">{done}/6</p>
                    <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">
                        未勾选的项目就是下一轮复习优先级。不要用“感觉会了”代替做题验证。
                    </p>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '数组长度为 n，最后一个下标是？',
        answer: 'n - 1',
        reason: '越界是三级数组题最高频错误之一。',
    },
    {
        question: '字符串 find 没找到会返回什么？',
        answer: 'string::npos',
        reason: '不要把没找到当作 0，0 表示在开头找到了。',
    },
    {
        question: '模拟题调试时最该输出什么？',
        answer: '每一步状态',
        reason: '对比手算过程，能快速定位从哪一步开始错。',
    },
];

export default function CppL3Lesson16() {
    return (
        <CppLessonShell
            lessonNumber={16}
            lessonTitle="全真模拟与避坑"
            lessonSubtitle="用清单和错因复盘完成三级闭环"
            accent="rose"
            levelTitle="C++ 高阶"
            levelCode="L3"
            sections={sections}
            previousPath="/lesson/3/15"
            nextPath="/level3"
            topSupport={<CppL3LessonSupport lessonId={16} />}
            bottomSupport={<CppL3LessonSupport lessonId={16} placement="bottom" />}
            hero={{
                title: '最后一课不是再学新知识，而是把失分点关掉',
                description: '本课用考前清单、易错题诊疗、整卷策略和模拟卷任务，把 C++ 三级课程收束成可复习、可应考的闭环。',
            }}
            goals={['能列出三级核心能力清单', '能识别数组、字符串、进制和模拟高频坑', '能制定模拟卷复盘流程']}
            childrenBySection={{
                1: <ExamChecklistLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">考前清单：每个能力都要能做题验证</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                三级覆盖面不算窄。复习时不要只看讲义，要用小题验证每一块能力是否真的稳定。
                            </p>
                        </div>
                        <CompareTable
                            headers={['模块', '必须会做', '自测题型']}
                            rows={[
                                ['进制与补码', '转换、按权展开、补码含义', '给定数值求二进制或十进制'],
                                ['位运算', '与或异或、移位、掩码', '判断或修改某一位'],
                                ['数组字符串', '遍历、统计、查找、转换', '频率统计和字符串处理'],
                                ['枚举模拟', '范围、状态、终止条件', '按规则求最终结果'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">易错题诊疗：错误不是笼统的“粗心”</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                错题要归因到具体类型：边界、类型、顺序、初始化、输出格式。这样下一次才知道防什么。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`// 错题复盘模板
// 错因：
// 1. 下标越界 / 少算最后一个
// 2. 初始化错误 / 全负数最大值
// 3. 字符范围判断错误
// 4. 模拟顺序错误
// 5. 输出格式错误`}</CodeBlock>
                            <StepList steps={[
                                '保存错误输入',
                                '手算正确过程',
                                '找出代码第一次偏离的位置',
                                '给错题贴上具体错因标签',
                            ]} />
                        </div>
                        <Callout icon={AlertTriangle} title="别写“粗心”" tone="amber">
                            “粗心”没有指导价值。写成“<code>i &lt;= n</code> 导致访问 <code>a[n]</code>”才是可修复的错因。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">整卷策略：先拿稳分，再攻难题</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                模拟卷不是为了证明自己厉害，而是为了发现薄弱点。先保证基础题不丢，再处理综合题。
                            </p>
                        </div>
                        <CompareTable
                            headers={['阶段', '目标', '动作']}
                            rows={[
                                ['第一遍', '拿稳会做题', '跳过明显卡住的题'],
                                ['第二遍', '攻综合题', '画状态表或列枚举范围'],
                                ['最后检查', '减少低级失分', '查边界、格式、初始化'],
                            ]}
                        />
                        <Callout icon={ListChecks} title="检查顺序" tone="blue">
                            先查输入输出格式，再查循环边界，再查特殊样例。不要只盯着复杂逻辑。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                完成这一课后，三级不应该只停留在“看过”，而要进入整卷训练和错题复盘。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>完成一套 GESP 三级模拟卷，并记录每题耗时。</li>
                                <li>把错题按边界、初始化、字符、模拟顺序、输出格式分类。</li>
                                <li>从错题中挑 3 道，一周后重做。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="课程收束" tone="rose">
                            三级课程已覆盖进制、补码、位运算、数组、字符串、枚举、模拟和综合复盘。下一步可以进入三级真题或四级函数与结构体。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
