import React, { useMemo, useState } from 'react';
import { AlertTriangle, Binary, ClipboardCheck, LockKeyhole, RotateCcw } from 'lucide-react';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '负数表示' },
    { id: 2, title: '固定宽度', category: '前提条件' },
    { id: 3, title: '补码规则', category: '核心方法' },
    { id: 4, title: '溢出与范围', category: '考试易错' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function ComplementLab() {
    const [value, setValue] = useState(-5);

    const bits = useMemo(() => {
        const normalized = value < 0 ? 256 + value : value;
        return normalized.toString(2).padStart(8, '0');
    }, [value]);

    const sign = bits[0] === '1' ? '负数或高位为 1' : '非负数';

    return (
        <div className="rounded-2xl border border-purple-100 bg-purple-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Binary className="text-purple-700" />
                <h3 className="text-xl font-black text-slate-950">8 位补码观察台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-purple-100">
                    <label className="block text-sm font-black text-slate-700">整数：{value}</label>
                    <input
                        type="range"
                        min="-16"
                        max="16"
                        value={value}
                        onChange={(event) => setValue(Number(event.target.value))}
                        className="mt-3 w-full"
                    />
                    <div className="mt-5 rounded-lg bg-slate-950 p-4 font-mono text-green-400">
                        8 位表示：{bits}
                    </div>
                    <p className="mt-3 text-sm font-semibold text-slate-600">{sign}</p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-purple-100">
                    <h4 className="mb-3 font-black text-slate-900">每一位</h4>
                    <div className="grid grid-cols-8 gap-2">
                        {bits.split('').map((bit, index) => (
                            <div key={`${bit}-${index}`} className={`rounded-lg px-2 py-3 text-center font-mono text-lg font-black ${index === 0 ? 'bg-purple-700 text-white' : 'bg-purple-100 text-purple-900'}`}>
                                {bit}
                            </div>
                        ))}
                    </div>
                    <p className="mt-3 text-sm font-semibold text-slate-600">最左边是符号相关的高位，固定宽度下它不能随便省略。</p>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '8 位补码能表示的有符号整数范围？',
        answer: '-128 到 127',
        reason: '8 位共有 256 种状态，一半表示负数，一半表示非负数。',
    },
    {
        question: '求 -5 的补码要先写什么？',
        answer: '+5 的二进制',
        reason: '负数补码通常从对应正数出发，按位取反再加 1。',
    },
    {
        question: '补码为什么强调固定位数？',
        answer: '高位含义依赖宽度',
        reason: '8 位和 16 位下，同一串低位前面补什么会影响数值解释。',
    },
];

export default function CppL3Lesson2() {
    return (
        <CppLessonShell
            lessonNumber={2}
            lessonTitle="负数的真面目 (补码)"
            lessonSubtitle="理解计算机如何用二进制保存负数"
            accent="purple"
            levelTitle="C++ 高阶"
            levelCode="L3"
            sections={sections}
            previousPath="/lesson/3/1"
            nextPath="/lesson/3/3"
            hero={{
                title: '负数不是多一个减号，而是一套固定宽度的编码规则',
                description: '补码让加法器同时处理正数和负数。三级题里，补码常和二进制、位运算、溢出一起出现。',
            }}
            goals={['知道补码必须在固定位数下讨论', '能求简单负数的 8 位补码', '能解释有符号整数范围和溢出风险']}
            childrenBySection={{
                1: <ComplementLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">固定宽度：先说几位，再谈补码</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                补码不是无限长的二进制。讨论 8 位、16 位、32 位时，最高位和可表示范围都不同。
                            </p>
                        </div>
                        <CompareTable
                            headers={['位数', '状态数', '有符号范围']}
                            rows={[
                                ['8 位', '256', '-128 到 127'],
                                ['16 位', '65536', '-32768 到 32767'],
                                ['32 位', '约 42 亿', '-2147483648 到 2147483647'],
                            ]}
                        />
                        <Callout icon={LockKeyhole} title="宽度锁定" tone="purple">
                            计算补码前先写清楚“8 位”还是“16 位”。没有宽度，补码问题就不完整。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">负数补码：正数二进制，取反，加 1</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                以 8 位的 -5 为例：先写 +5，再按位取反，最后加 1。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`+5  = 00000101
取反 = 11111010
加 1 = 11111011

所以 -5 的 8 位补码是 11111011`}</CodeBlock>
                            <StepList steps={[
                                '确定固定位数：8 位',
                                '写出绝对值 5 的二进制',
                                '每一位 0/1 互换',
                                '结果加 1',
                            ]} />
                        </div>
                        <Callout icon={RotateCcw} title="反推负数" tone="blue">
                            看到最高位为 1 的补码，也可以再次“取反加 1”得到绝对值，再加负号。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">溢出：固定宽度装不下更多状态</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                8 位有符号整数最大是 127。如果再加 1，位模式会变成 10000000，按补码解释是 -128。
                            </p>
                        </div>
                        <CodeBlock>{`01111111  // 127
+00000001 // +1
---------
10000000  // 8 位下解释为 -128`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="考试提醒" tone="amber">
                            题目问“8 位有符号整数”时，不能按普通数学无限增长理解。要回到固定宽度的位模式。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                写补码题时，过程比答案更重要：位数、原码、取反、加 1 都要写出来。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>写出 -1、-8、-16 的 8 位补码。</li>
                                <li>解释为什么 8 位有符号整数最小值是 -128。</li>
                                <li>判断 <code>11110110</code> 作为 8 位补码表示哪个十进制数。</li>
                            </ul>
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
