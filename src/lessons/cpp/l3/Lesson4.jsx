import React, { useMemo, useState } from 'react';
import { AlertTriangle, ArrowLeftRight, ClipboardCheck, MoveRight, Search } from 'lucide-react';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '移位操作' },
    { id: 2, title: '左移', category: '乘 2 模型' },
    { id: 3, title: '右移', category: '除 2 模型' },
    { id: 4, title: '位检查与设置', category: '综合应用' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function ShiftLab() {
    const [value, setValue] = useState(6);
    const [shift, setShift] = useState(1);

    const data = useMemo(() => {
        const pad = (n) => n.toString(2).padStart(8, '0');
        return {
            source: pad(value),
            left: pad(value << shift),
            right: pad(value >> shift),
            leftValue: value << shift,
            rightValue: value >> shift,
        };
    }, [value, shift]);

    return (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <ArrowLeftRight className="text-indigo-700" />
                <h3 className="text-xl font-black text-slate-950">移位实验台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <label className="block text-sm font-black text-slate-700">x = {value}</label>
                    <input type="range" min="1" max="31" value={value} onChange={(event) => setValue(Number(event.target.value))} className="mt-3 w-full" />
                    <label className="mt-5 block text-sm font-black text-slate-700">移动位数：{shift}</label>
                    <input type="range" min="1" max="3" value={shift} onChange={(event) => setShift(Number(event.target.value))} className="mt-3 w-full" />
                </div>
                <div className="grid gap-3">
                    <div className="rounded-xl bg-white p-4 font-mono font-black text-slate-800 ring-1 ring-indigo-100">x：{data.source}</div>
                    <div className="rounded-xl bg-white p-4 font-mono font-black text-emerald-700 ring-1 ring-indigo-100">x &lt;&lt; {shift}：{data.left} = {data.leftValue}</div>
                    <div className="rounded-xl bg-white p-4 font-mono font-black text-blue-700 ring-1 ring-indigo-100">x &gt;&gt; {shift}：{data.right} = {data.rightValue}</div>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: 'x << 1 通常相当于什么？',
        answer: '乘以 2',
        reason: '左移一位会让二进制整体向高位移动，低位补 0。',
    },
    {
        question: '1 << k 常用来生成什么？',
        answer: '第 k 位掩码',
        reason: '它只有第 k 位为 1，适合检查或设置某一位。',
    },
    {
        question: '右移负数时要随便套除法吗？',
        answer: '不要',
        reason: '负数右移涉及实现和符号位细节，考试应按题目给定规则分析。',
    },
];

export default function CppL3Lesson4() {
    return (
        <CppLessonShell
            lessonNumber={4}
            lessonTitle="位运算大冒险 (下)"
            lessonSubtitle="移位、掩码和常见位操作模板"
            accent="indigo"
            levelTitle="C++ 高阶"
            levelCode="L3"
            sections={sections}
            previousPath="/lesson/3/3"
            nextPath="/lesson/3/5"
            hero={{
                title: '移位让二进制整体搬家，也让位操作真正好用起来',
                description: '本课接上 &、|、^，重点掌握 <<、>>、1 << k，以及检查、设置、清除某一位的常见模板。',
            }}
            goals={['能解释左移和右移的数值变化', '能用 1 << k 生成掩码', '能写出检查、设置、清除某位的模板']}
            childrenBySection={{
                1: <ShiftLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">左移：整体向左，低位补 0</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                对非负整数来说，左移一位通常相当于乘以 2，左移 k 位通常相当于乘以 2 的 k 次方。
                            </p>
                        </div>
                        <CodeBlock>{`int x = 6;      // 00000110
cout << (x << 1); // 00001100 = 12
cout << (x << 2); // 00011000 = 24`}</CodeBlock>
                        <Callout icon={MoveRight} title="别忘了括号" tone="indigo">
                            输出移位表达式时建议写 <code>cout &lt;&lt; (x &lt;&lt; 1)</code>，避免和输出运算符混在一起读不清。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">右移：向右丢低位，常用于除以 2</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                对非负整数来说，右移一位通常相当于整除 2。低位被丢掉，所以结果是向下取整。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`int x = 13;     // 00001101
cout << (x >> 1); // 00000110 = 6
cout << (x >> 2); // 00000011 = 3`}</CodeBlock>
                            <StepList steps={[
                                '写出 x 的二进制',
                                '整体向右移动 k 位',
                                '低位被丢弃',
                                '非负整数高位补 0',
                            ]} />
                        </div>
                        <Callout icon={AlertTriangle} title="负数右移谨慎处理" tone="amber">
                            负数右移涉及符号位和实现细节。三级入门阶段先把非负整数模型学稳，遇到负数按题目说明分析。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">位检查与设置：1 &lt;&lt; k 是核心工具</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                <code>1 &lt;&lt; k</code> 会生成一个只有第 k 位为 1 的掩码。配合 &、|、^ 可以做很多位操作。
                            </p>
                        </div>
                        <CompareTable
                            headers={['目标', '写法', '含义']}
                            rows={[
                                ['检查第 k 位', 'x & (1 << k)', '结果非 0 表示该位是 1'],
                                ['设置第 k 位', 'x | (1 << k)', '把该位变成 1'],
                                ['翻转第 k 位', 'x ^ (1 << k)', '0 变 1，1 变 0'],
                            ]}
                        />
                        <CodeBlock>{`int mask = 1 << k;

if (x & mask) {
  cout << "第 k 位是 1";
}`}</CodeBlock>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                本课练习要把十进制结果和二进制变化都写出来，训练双重视角。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>手算 <code>7 &lt;&lt; 2</code> 和 <code>29 &gt;&gt; 3</code>。</li>
                                <li>写程序判断整数 x 的第 k 位是否为 1。</li>
                                <li>写程序把整数 x 的第 k 位翻转。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课进入一维数组的奥秘。位运算训练的是“按位拆”，数组训练的是“按位置管理一组数据”。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
