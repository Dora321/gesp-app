import React, { useMemo, useState } from 'react';
import { ClipboardCheck, Hash, Repeat2, Route, Search } from 'lucide-react';
import CppL3LessonSupport from '../../../components/CppL3LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

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

function BasePredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'37 短除 2 取余依次得到 1,0,1,0,0,1，二进制是 101001 还是 100101？'}
                options={['101001（按取余顺序读）', '100101（倒着读）']}
                correctIndex={1}
                explanation="短除法每次的余数是从低位开始产生的，最先得到的是最低位。所以要从最后一个余数倒着读：100101。"
                misconception="按取余的先后顺序正着读，把高低位读反了。"
            />
            <PredictCheck
                prompt={'二进制转十六进制分组，从左往右还是从右往左每 4 位一组？'}
                options={['从左往右', '从右往左（左边不足补 0）']}
                correctIndex={1}
                explanation="必须从右（最低位）往左每 4 位一组，左边不足 4 位补 0。从左分组会让低位错位、结果全错。"
                misconception="从左往右分组，导致分组边界错位。"
            />
            <PredictCheck
                prompt={'十六进制的 C 等于十进制几？'}
                options={['11', '12']}
                correctIndex={1}
                explanation="十六进制 A=10、B=11、C=12、D=13、E=14、F=15。"
                misconception="把 A 当 10 后数错位，以为 C 是 11。"
            />
        </div>
    );
}

const baseMasteryItems = [
    {
        label: '能用按权展开读懂任意进制数。',
        evidence: '每一位 × 进制的幂再求和。',
        retryHint: '回到按权展开。',
    },
    {
        label: '能把十进制转二进制并倒读余数。',
        evidence: '除 2 取余，从最后一个余数倒着读。',
        retryHint: '回到短除法，记住余数要倒读。',
    },
    {
        label: '能在二 / 八 / 十六进制间分组互转。',
        evidence: '8 = 2³、16 = 2⁴，从右往左每 3 / 4 位一组。',
        retryHint: '回到分组表，分组要从右往左。',
    },
    {
        label: '能记住十六进制 A–F = 10–15。',
        evidence: 'A=10、B=11、C=12、D=13、E=14、F=15。',
        retryHint: '回到进制对照表。',
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
            topSupport={<CppL3LessonSupport lessonId={1} />}
            bottomSupport={<CppL3LessonSupport lessonId={1} placement="bottom" />}
            hero={{
                title: '进制不是新数字，是同一个数量换了一套记号',
                description: '三级开始会频繁出现二进制、八进制、十六进制。今天先把按权展开和短除法打稳，后面的补码和位运算才不会悬空。',
            }}
            goals={['能用按权展开读懂任意进制数', '能把十进制整数转成二进制', '能在二、八、十六进制之间建立联系']}
            prerequisites={['理解十进制每一位的含义', '会做整数除法和取余', '会数位拆解 n%10、n/10']}
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
                        <BasePredictionChecks />
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
                        <TransferCheck
                            prompt="换个例子：把十进制 13 转成二进制。写出「不断除以 2 取余」的短除法过程，并给出最终二进制。"
                            hint="不断除以 2 记下余数，最后把余数从下往上读。"
                            answer="13 = 1101（二进制）。"
                            steps={[
                                '13 ÷ 2 = 6 余 1',
                                '6 ÷ 2 = 3 余 0',
                                '3 ÷ 2 = 1 余 1',
                                '1 ÷ 2 = 0 余 1',
                                '余数从下往上读：1101。',
                            ]}
                        />
                        <MasteryCheck
                            title="C++ L3-1 进制离开前检查"
                            description="进制最怕“短除余数读反、分组方向搞错”。勾选前先把 58 转二进制、再分组转十六进制。"
                            items={baseMasteryItems}
                        />
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
