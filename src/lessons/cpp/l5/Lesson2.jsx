import React, { useMemo, useState } from 'react';
import { ClipboardCheck, Divide, RefreshCw, Search, Sigma } from 'lucide-react';
import CppL5LessonSupport from '../../../components/CppL5LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '公因数模型' },
    { id: 2, title: '欧几里得算法', category: 'GCD 模板' },
    { id: 3, title: '最小公倍数', category: 'LCM 模板' },
    { id: 4, title: '应用题型', category: '数论工具' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function gcd(a, b) {
    let x = Math.abs(a);
    let y = Math.abs(b);
    while (y !== 0) {
        const r = x % y;
        x = y;
        y = r;
    }
    return x;
}

function GcdLab() {
    const [a, setA] = useState(84);
    const [b, setB] = useState(36);
    const result = useMemo(() => {
        const g = gcd(a, b);
        return {
            g,
            lcm: g === 0 ? 0 : Math.abs(a / g * b),
        };
    }, [a, b]);

    return (
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Divide className="text-amber-700" />
                <h3 className="text-xl font-black text-slate-950">GCD / LCM 实验台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-amber-100">
                    <label className="block text-sm font-black text-slate-700">a = {a}</label>
                    <input type="range" min="2" max="150" value={a} onChange={(event) => setA(Number(event.target.value))} className="mt-3 w-full" />
                    <label className="mt-5 block text-sm font-black text-slate-700">b = {b}</label>
                    <input type="range" min="2" max="150" value={b} onChange={(event) => setB(Number(event.target.value))} className="mt-3 w-full" />
                </div>
                <div className="grid gap-3">
                    <div className="rounded-xl bg-white p-4 font-mono font-black text-amber-800 ring-1 ring-amber-100">gcd({a}, {b}) = {result.g}</div>
                    <div className="rounded-xl bg-white p-4 font-mono font-black text-emerald-700 ring-1 ring-amber-100">lcm({a}, {b}) = {result.lcm}</div>
                    <div className="rounded-xl bg-white p-4 text-sm font-bold leading-6 text-slate-600 ring-1 ring-amber-100">
                        关系式：a * b = gcd(a, b) * lcm(a, b)
                    </div>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: 'gcd(a, b) 的含义是什么？',
        answer: '最大公约数',
        reason: '它是能同时整除 a 和 b 的最大正整数。',
    },
    {
        question: '欧几里得算法的核心关系是什么？',
        answer: 'gcd(a,b)=gcd(b,a%b)',
        reason: '余数保留了两个数的公因数信息。',
    },
    {
        question: '为什么 lcm 常写成 a/gcd*a？',
        answer: '避免先乘溢出',
        reason: '应写成 a / gcd(a,b) * b，先除再乘更安全。',
    },
];

export default function CppL5Lesson2() {
    return (
        <CppLessonShell
            lessonNumber={2}
            lessonTitle="公约数与公倍数 (GCD)"
            lessonSubtitle="用欧几里得算法快速处理整除关系"
            accent="amber"
            levelTitle="C++ 专家"
            levelCode="L5"
            sections={sections}
            previousPath="/lesson/5/1"
            nextPath="/lesson/5/3"
            topSupport={<CppL5LessonSupport lessonId={2} />}
            bottomSupport={<CppL5LessonSupport lessonId={2} placement="bottom" />}
            hero={{
                title: 'GCD 是数论题的扳手：化简比例、处理周期、计算最小公倍数都靠它',
                description: '本课从最大公约数出发，掌握欧几里得算法、最小公倍数公式和常见应用模型。',
            }}
            goals={['能手写递归和循环版 gcd', '能用 gcd 计算 lcm', '能识别周期、比例、分组中的 gcd 模型']}
            childrenBySection={{
                1: <GcdLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">欧几里得算法：不断用余数缩小问题</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                如果 <code>a = b * k + r</code>，那么 a 和 b 的公约数，也会是 b 和 r 的公约数。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`long long gcd(long long a, long long b) {
  while (b != 0) {
    long long r = a % b;
    a = b;
    b = r;
  }
  return a;
}`}</CodeBlock>
                            <StepList steps={[
                                '用 a % b 得到余数',
                                '把问题变成 gcd(b, r)',
                                '当 b 变成 0 时结束',
                                '最后的 a 就是最大公约数',
                            ]} />
                        </div>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">最小公倍数：先除再乘，避免溢出</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                <code>lcm(a,b)</code> 可以用 <code>a / gcd(a,b) * b</code> 计算。不要先算 <code>a*b</code>。
                            </p>
                        </div>
                        <CodeBlock>{`long long lcm(long long a, long long b) {
  return a / gcd(a, b) * b;
}`}</CodeBlock>
                        <Callout icon={RefreshCw} title="递归版 gcd" tone="amber">
                            <CodeBlock>{`long long gcd(long long a, long long b) {
  return b == 0 ? a : gcd(b, a % b);
}`}</CodeBlock>
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">应用题型：周期、分组、比例化简</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                看到“同时出现”“最小共同周期”“平均分组”“化成最简比”，都要想到 gcd 或 lcm。
                            </p>
                        </div>
                        <CompareTable
                            headers={['题型', '使用工具', '例子']}
                            rows={[
                                ['最简分数', 'gcd', '分子分母同时除以最大公约数'],
                                ['共同周期', 'lcm', '两个事件下一次同时发生'],
                                ['平均分组', 'gcd', '最多能分成几组且每组相同'],
                            ]}
                        />
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                数论题最怕公式会背但模型不会认。练习时请先写出“为什么是 gcd 或 lcm”。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>读入 a、b，输出 gcd 和 lcm。</li>
                                <li>把分数 a/b 化成最简形式。</li>
                                <li>求两个周期事件下一次同时发生的时间。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课进入高精度加减。普通整数装不下时，就要把数字当成字符串和数组处理。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
