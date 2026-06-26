import React, { useMemo, useState } from 'react';
import { Binary, ClipboardCheck, Layers3, Lightbulb, ToggleLeft } from 'lucide-react';
import CppL3LessonSupport from '../../../components/CppL3LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '按位思维' },
    { id: 2, title: '与或非', category: '基础运算' },
    { id: 3, title: '异或', category: '翻转特性' },
    { id: 4, title: '掩码应用', category: '实战读法' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function BitwiseLab() {
    const [a, setA] = useState(12);
    const [b, setB] = useState(10);

    const rows = useMemo(() => {
        const pad = (n) => n.toString(2).padStart(4, '0');
        return [
            ['a', pad(a), a],
            ['b', pad(b), b],
            ['a & b', pad(a & b), a & b],
            ['a | b', pad(a | b), a | b],
            ['a ^ b', pad(a ^ b), a ^ b],
        ];
    }, [a, b]);

    return (
        <div className="rounded-2xl border border-teal-100 bg-teal-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Binary className="text-teal-700" />
                <h3 className="text-xl font-black text-slate-950">位运算实验台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-teal-100">
                    <label className="block text-sm font-black text-slate-700">a = {a}</label>
                    <input type="range" min="0" max="15" value={a} onChange={(event) => setA(Number(event.target.value))} className="mt-3 w-full" />
                    <label className="mt-5 block text-sm font-black text-slate-700">b = {b}</label>
                    <input type="range" min="0" max="15" value={b} onChange={(event) => setB(Number(event.target.value))} className="mt-3 w-full" />
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-teal-100">
                    <div className="grid gap-2">
                        {rows.map(([label, bits, decimal]) => (
                            <div key={label} className="grid grid-cols-[80px_1fr_60px] items-center rounded-lg bg-teal-100 px-3 py-2 font-mono text-sm font-black text-teal-900">
                                <span>{label}</span>
                                <span className="tracking-widest">{bits}</span>
                                <span>{decimal}</span>
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
        question: '1 & 0 的结果是什么？',
        answer: '0',
        reason: '与运算要求两边都为 1。',
    },
    {
        question: '1 | 0 的结果是什么？',
        answer: '1',
        reason: '或运算只要有一边为 1。',
    },
    {
        question: '1 ^ 1 的结果是什么？',
        answer: '0',
        reason: '异或表示不同为 1，相同为 0。',
    },
];

function BitwisePredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'判断 x 是否奇数，写 x & 1 和 x && 1 一样吗？'}
                options={['一样', '不一样：& 是按位与，&& 是逻辑与']}
                correctIndex={1}
                explanation="x & 1 取 x 的最低位（奇数=1、偶数=0），能判奇偶。x && 1 是逻辑与，只要 x 非 0 就是 1，判不了奇偶。一个 & 和两个 & 完全不同。"
                misconception="把按位与 & 和逻辑与 && 混用。"
            />
            <PredictCheck
                prompt={'x ^ 1（和 1 异或）会对 x 的最低位做什么？'}
                options={['置成 1', '翻转（0↔1）']}
                correctIndex={1}
                explanation="异或 1 是翻转：最低位 0 变 1、1 变 0。和 0 异或才保持不变。"
                misconception="以为 ^ 1 是把那一位强行置成 1。"
            />
            <PredictCheck
                prompt={'6 & 3 等于几？（6 = 110，3 = 011）'}
                options={['7', '2']}
                correctIndex={1}
                explanation="逐位与：110 & 011 = 010 = 2。不是相加也不是取最大，而是每一位都「都为 1 才为 1」。"
                misconception="把 & 当成加法或别的整体运算，没有逐位算。"
            />
        </div>
    );
}

const bitwiseMasteryItems = [
    {
        label: '能逐位算 &、|、^。',
        evidence: '把两个数对齐，每一位独立按规则算，再转回十进制。',
        retryHint: '回到位运算实验台，盯住二进制位。',
    },
    {
        label: '能区分 & 和 &&、| 和 ||。',
        evidence: '单个是按位运算，两个是逻辑运算。',
        retryHint: 'x & 1 能判奇偶，x && 1 不行。',
    },
    {
        label: '能用异或做翻转。',
        evidence: 'x ^ 1 翻转那一位，x ^ 0 保持不变。',
        retryHint: '回到「翻转记忆」。',
    },
    {
        label: '能读懂掩码和 1 << k。',
        evidence: '1 << k 是只有第 k 位为 1 的掩码，用 & 检查该位。',
        retryHint: '回到「读掩码题」。',
    },
];

export default function CppL3Lesson3() {
    return (
        <CppLessonShell
            lessonNumber={3}
            lessonTitle="位运算大冒险 (上)"
            lessonSubtitle="把整数拆成一排二进制开关来操作"
            accent="teal"
            levelTitle="C++ 高阶"
            levelCode="L3"
            sections={sections}
            previousPath="/lesson/3/2"
            nextPath="/lesson/3/4"
            topSupport={<CppL3LessonSupport lessonId={3} />}
            bottomSupport={<CppL3LessonSupport lessonId={3} placement="bottom" />}
            hero={{
                title: '位运算不是神秘符号，而是在操作每一位开关',
                description: '本课先掌握 &、|、^、~ 的基本含义。三级题里，很多看似复杂的表达式都可以按位拆开读。',
            }}
            goals={['能解释 &、|、^ 的逐位规则', '能手算 4 位以内位运算表达式', '能理解掩码筛选某些位的作用']}
            prerequisites={['理解十进制转二进制', '会逐位读二进制', '理解奇偶与最低位的关系']}
            childrenBySection={{
                1: <BitwiseLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">与、或、非：逐位对齐，一位一位算</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                位运算会把两个整数的二进制位对齐，然后每一位独立运算。不要把它当成普通逻辑表达式整体判断。
                            </p>
                        </div>
                        <CompareTable
                            headers={['运算', '规则', '常见用途']}
                            rows={[
                                ['&', '都为 1 才为 1', '保留某些位'],
                                ['|', '有 1 就为 1', '把某些位置 1'],
                                ['~', '0 变 1，1 变 0', '按位取反'],
                            ]}
                        />
                        <CodeBlock>{`a = 1100
b = 1010

a & b = 1000
a | b = 1110`}</CodeBlock>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">异或：相同为 0，不同为 1</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                异或最重要的特性是“翻转”。一个位和 1 异或会翻转，和 0 异或保持不变。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`0 ^ 0 = 0
0 ^ 1 = 1
1 ^ 0 = 1
1 ^ 1 = 0`}</CodeBlock>
                            <StepList steps={[
                                '先把两个数写成二进制',
                                '从右往左对齐',
                                '每一位按“不同为 1”计算',
                                '最后把结果转回十进制',
                            ]} />
                        </div>
                        <Callout icon={ToggleLeft} title="翻转记忆" tone="teal">
                            <code>x ^ 1</code> 会把一位翻转，<code>x ^ 0</code> 会保持原样。这是很多位运算题的钥匙。
                        </Callout>
                        <BitwisePredictionChecks />
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">掩码：用一个数挑选或修改特定位</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                掩码就是一串有意设计的二进制位。用 & 可以保留目标位，用 | 可以打开目标位，用 ^ 可以翻转目标位。
                            </p>
                        </div>
                        <CodeBlock>{`int x = 13;      // 1101
int mask = 4;    // 0100

if (x & mask) {
  cout << "第 3 位是 1";
}`}</CodeBlock>
                        <Callout icon={Layers3} title="读掩码题" tone="blue">
                            看到 <code>1 &lt;&lt; k</code> 这类表达式，先把它理解成“只有第 k 位为 1 的掩码”。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                位运算练习必须写出二进制中间过程，不能只用计算器给答案。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <TransferCheck
                            prompt="换个例子：6 的二进制是 110，3 是 011。算出 6 & 3 和 6 | 3 的结果（十进制）。"
                            hint="& 是按位与（都为 1 才 1），| 是按位或（有 1 就 1），逐位对齐算。"
                            answer="6 & 3 = 2；6 | 3 = 7。"
                            steps={[
                                '6 = 110，3 = 011，对齐逐位。',
                                '& ：1&0=0, 1&1=1, 0&1=0 → 010 = 2。',
                                '| ：1|0=1, 1|1=1, 0|1=1 → 111 = 7。',
                            ]}
                        />
                        <MasteryCheck
                            title="C++ L3-3 位运算（上）离开前检查"
                            description="位运算最怕“把 & 当 &&、不逐位算”。勾选前先把 6 & 3、6 ^ 3 在二进制上手推一遍。"
                            items={bitwiseMasteryItems}
                        />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>手算 <code>12 & 10</code>、<code>12 | 10</code>、<code>12 ^ 10</code>。</li>
                                <li>解释为什么 <code>x & 1</code> 可以判断奇偶。</li>
                                <li>写一个程序，输入 x，判断它的最低位是否为 1。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Lightbulb} title="下一课衔接" tone="blue">
                            下一课继续位运算，重点进入左移、右移，以及它们和乘除 2 的关系。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
