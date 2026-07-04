import React, { useMemo, useState } from 'react';
import { ClipboardCheck, Divide, RefreshCw, Search, Sigma } from 'lucide-react';
import CppL5LessonSupport from '../../../components/CppL5LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

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
        question: '为什么 lcm 常写成 a / gcd(a,b) * b？',
        answer: '避免先乘溢出',
        reason: '先除后乘能防止 a * b 中间结果溢出，且 gcd 整除 a，先除不丢精度。',
    },
];

function GcdPredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'求 lcm 写成 a * b / gcd(a,b)，a、b 很大时有什么风险？'}
                options={['没问题', 'a * b 先算可能溢出']}
                correctIndex={1}
                explanation="a * b 可能超过 long long 范围而溢出。应写 a / gcd(a,b) * b，先除再乘，结果一样但不会溢出。"
                misconception="以为先乘后除和先除后乘没区别，忽略了中间结果溢出。"
            />
            <PredictCheck
                prompt={'欧几里得 gcd 的循环什么时候停下来？'}
                options={['a == b 时', 'b == 0 时，返回 a']}
                correctIndex={1}
                explanation="不断把 (a, b) 变成 (b, a % b)，当 b 变成 0 时，a 就是最大公约数。"
                misconception="以为要等两个数相等才停止。"
            />
            <PredictCheck
                prompt={'gcd(a, b) 和 gcd(b, a % b) 相等吗？'}
                options={['不一定', '相等，这正是欧几里得算法的核心']}
                correctIndex={1}
                explanation="a 和 b 的公约数也是 b 和余数 r = a % b 的公约数，所以 gcd(a,b) = gcd(b, a%b)，问题不断缩小。"
                misconception="不理解为什么取余之后还能保留公约数。"
            />
        </div>
    );
}

const gcdMasteryItems = [
    {
        label: '能手写循环和递归版 gcd。',
        evidence: 'while (b) 把 (a,b) 变成 (b, a%b)；递归 b==0 ? a : gcd(b, a%b)。',
        retryHint: '回到欧几里得算法。',
    },
    {
        label: '能解释 gcd(a,b) = gcd(b, a%b)。',
        evidence: '余数保留了两个数的公因数信息。',
        retryHint: '回到核心关系式。',
    },
    {
        label: '能用 gcd 算 lcm 且避免溢出。',
        evidence: '写 a / gcd(a,b) * b，先除再乘。',
        retryHint: '回到最小公倍数，别先算 a*b。',
    },
    {
        label: '能识别周期 / 分组 / 比例的 gcd / lcm 模型。',
        evidence: '最简比、平均分组用 gcd；共同周期用 lcm。',
        retryHint: '回到应用题型表。',
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
            prerequisites={['理解取余运算 a % b', '会写 while 循环', '理解整除与公约数概念']}
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
                        <GcdPredictionChecks />
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
                        <TransferCheck
                            prompt="换个例子：用辗转相除法（欧几里得）求 gcd(24, 18)。写出每一步的余数。"
                            hint="gcd(a,b)=gcd(b, a%b)，直到余数为 0，此时除数就是答案。"
                            answer="gcd(24, 18) = 6。"
                            steps={[
                                '24 % 18 = 6 → 转成 gcd(18, 6)。',
                                '18 % 6 = 0 → 余数为 0，停止。',
                                '此时除数 6 就是最大公约数。',
                            ]}
                        />
                        <MasteryCheck
                            title="C++ L5-2 公约数与公倍数离开前检查"
                            description="GCD 最怕“lcm 先乘 a*b 溢出、循环终止条件记错”。勾选前先手推一遍 gcd(84, 36)。"
                            items={gcdMasteryItems}
                        />
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
