import React, { useMemo, useState } from 'react';
import { ClipboardCheck, Hash, Repeat2, Route, Search } from 'lucide-react';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '进制直觉' },
    { id: 2, title: '按权展开', category: '核心定义' },
    { id: 3, title: '十进制转二进制', category: '短除法' },
    { id: 4, title: '进制互转', category: '题型迁移' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function BaseLab() {
    const [value, setValue] = useState(37);

    const binary = value.toString(2);
    const octal = value.toString(8);
    const hex = value.toString(16).toUpperCase();
    const powers = useMemo(() => {
        return binary.split('').reverse().map((digit, index) => ({
            digit,
            weight: 2 ** index,
            value: Number(digit) * (2 ** index),
        })).reverse();
    }, [binary]);

    return (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Hash className="text-rose-700" />
                <h3 className="text-xl font-black text-slate-950">进制观察台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-rose-100">
                    <label className="block text-sm font-black text-slate-700">十进制数：{value}</label>
                    <input
                        type="range"
                        min="1"
                        max="255"
                        value={value}
                        onChange={(event) => setValue(Number(event.target.value))}
                        className="mt-3 w-full"
                    />
                    <div className="mt-5 grid gap-3">
                        <div className="rounded-lg bg-slate-950 p-4 font-mono text-green-400">二进制：{binary}</div>
                        <div className="rounded-lg bg-slate-950 p-4 font-mono text-green-400">八进制：{octal}</div>
                        <div className="rounded-lg bg-slate-950 p-4 font-mono text-green-400">十六进制：{hex}</div>
                    </div>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-rose-100">
                    <h4 className="mb-3 font-black text-slate-900">二进制按权展开</h4>
                    <div className="grid gap-2">
                        {powers.map((item, index) => (
                            <div key={`${item.digit}-${item.weight}-${index}`} className="grid grid-cols-3 rounded-lg bg-rose-100 px-3 py-2 text-sm font-black text-rose-900">
                                <span>位值 {item.digit}</span>
                                <span>权重 {item.weight}</span>
                                <span>贡献 {item.value}</span>
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
        question: '二进制 1011 等于十进制多少？',
        answer: '11',
        reason: '1*8 + 0*4 + 1*2 + 1*1 = 11。',
    },
    {
        question: '十六进制 A 表示十进制多少？',
        answer: '10',
        reason: '十六进制用 A-F 表示 10 到 15。',
    },
    {
        question: '十进制转二进制为什么要倒读余数？',
        answer: '先得到低位',
        reason: '短除法每次除 2 的余数是从个位开始产生的。',
    },
];

export default function CppL3Lesson1() {
    return (
        <CppLessonShell
            lessonNumber={1}
            lessonTitle="变身数字魔术师 (进制)"
            lessonSubtitle="GESP 三级入口：理解同一个数量的不同写法"
            accent="rose"
            levelTitle="C++ 高阶"
            levelCode="L3"
            sections={sections}
            previousPath="/lesson/2/16"
            nextPath="/lesson/3/2"
            hero={{
                title: '进制不是新数字，是同一个数量换了一套记号',
                description: '三级开始会频繁出现二进制、八进制、十六进制。今天先把按权展开和短除法打稳，后面的补码和位运算才不会悬空。',
            }}
            goals={['能用按权展开读懂任意进制数', '能把十进制整数转成二进制', '能在二、八、十六进制之间建立联系']}
            childrenBySection={{
                1: <BaseLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">按权展开：每一位都有自己的权重</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                十进制的 372 表示 3 个百、7 个十、2 个一。二进制、八进制、十六进制也是一样，只是每一位的权重变成对应进制的幂。
                            </p>
                        </div>
                        <CodeBlock>{`(1011)_2 = 1 * 2^3 + 0 * 2^2 + 1 * 2^1 + 1 * 2^0
         = 8 + 0 + 2 + 1
         = 11`}</CodeBlock>
                        <CompareTable
                            headers={['进制', '每位可用数字', '权重变化']}
                            rows={[
                                ['二进制', '0, 1', '1, 2, 4, 8, 16...'],
                                ['八进制', '0 到 7', '1, 8, 64, 512...'],
                                ['十六进制', '0 到 9, A 到 F', '1, 16, 256, 4096...'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">十进制转二进制：除 2 取余，倒序读</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                短除法每次取到的是当前最低位，所以最后要从下往上读余数。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`37 / 2 = 18 ... 1
18 / 2 = 9  ... 0
9  / 2 = 4  ... 1
4  / 2 = 2  ... 0
2  / 2 = 1  ... 0
1  / 2 = 0  ... 1

倒读余数：100101`}</CodeBlock>
                            <StepList steps={[
                                '不断除以目标进制',
                                '每一步记录余数',
                                '商变成 0 时停止',
                                '从最后一个余数倒着读',
                            ]} />
                        </div>
                        <Callout icon={Repeat2} title="代码思路" tone="rose">
                            用 <code>n % 2</code> 取当前二进制最低位，用 <code>n /= 2</code> 删除这一位。这和 L2 数位拆解是同一套动作。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">二、八、十六进制：按 3 位或 4 位分组</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                因为 8 = 2^3，16 = 2^4，所以二进制和八/十六进制互转时可以直接分组。
                            </p>
                        </div>
                        <CompareTable
                            headers={['转换', '分组方式', '例子']}
                            rows={[
                                ['二进制转八进制', '从右往左每 3 位一组', '101101 -> 55'],
                                ['二进制转十六进制', '从右往左每 4 位一组', '101101 -> 2D'],
                                ['八/十六转二进制', '每位展开成 3/4 位二进制', 'F -> 1111'],
                            ]}
                        />
                        <Callout icon={Route} title="考试策略" tone="blue">
                            阅读题里看到很长的二进制数，不要硬按权展开。能分组时先分组，会快很多。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                本课练习要同时写出“计算过程”和“答案”，避免只报结果。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>把 <code>(110101)_2</code> 转成十进制。</li>
                                <li>把十进制 58 转成二进制和十六进制。</li>
                                <li>解释为什么二进制转十六进制可以每 4 位分一组。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课进入补码。补码不是孤立知识，它建立在二进制位权和固定宽度表示之上。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
