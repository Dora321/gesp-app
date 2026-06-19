import React, { useMemo, useState } from 'react';
import { ClipboardCheck, Hash, Search, Sigma } from 'lucide-react';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '工具选择' },
    { id: 2, title: '数论题拆解', category: '模型识别' },
    { id: 3, title: '综合模板', category: '筛法 + GCD' },
    { id: 4, title: '高精度衔接', category: '大数边界' },
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

function FactorLab() {
    const [a, setA] = useState(48);
    const [b, setB] = useState(180);
    const g = useMemo(() => gcd(a, b), [a, b]);
    const factors = useMemo(() => {
        return Array.from({ length: g }, (_, index) => index + 1).filter((value) => g % value === 0);
    }, [g]);

    return (
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Hash className="text-amber-700" />
                <h3 className="text-xl font-black text-slate-950">公因数工具台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-amber-100">
                    <label className="block text-sm font-black text-slate-700">a = {a}</label>
                    <input type="range" min="2" max="240" value={a} onChange={(event) => setA(Number(event.target.value))} className="mt-3 w-full" />
                    <label className="mt-5 block text-sm font-black text-slate-700">b = {b}</label>
                    <input type="range" min="2" max="240" value={b} onChange={(event) => setB(Number(event.target.value))} className="mt-3 w-full" />
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-amber-100">
                    <div className="font-mono text-lg font-black text-amber-800">gcd({a}, {b}) = {g}</div>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {factors.map((factor) => (
                            <span key={factor} className="rounded-lg bg-amber-100 px-3 py-2 font-mono text-sm font-black text-amber-800">
                                {factor}
                            </span>
                        ))}
                    </div>
                    <p className="mt-4 text-xs font-bold text-slate-500">所有公因数一定是 gcd 的因数。</p>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '批量判断素数优先用什么？',
        answer: '筛法',
        reason: '一次预处理后，每次查询只看标记数组。',
    },
    {
        question: '求最多能平均分几组通常想到什么？',
        answer: 'GCD',
        reason: '每组相同要求同时整除多个数量。',
    },
    {
        question: '答案可能特别大时要注意什么？',
        answer: '高精度',
        reason: '普通整数可能溢出，需要字符串或数组模拟。',
    },
];

export default function CppL5Lesson5() {
    return (
        <CppLessonShell
            lessonNumber={5}
            lessonTitle="数论综合实战"
            lessonSubtitle="在筛法、GCD、LCM 和高精度之间选择工具"
            accent="amber"
            levelTitle="C++ 专家"
            levelCode="L5"
            sections={sections}
            previousPath="/lesson/5/4"
            nextPath="/lesson/5/6"
            hero={{
                title: '数论综合题的关键不是会几个模板，而是知道什么时候用哪个模板',
                description: '本课把前四节工具合并成解题流程：读数据范围、识别模型、选择模板、检查溢出和边界。',
            }}
            goals={['能根据题面选择筛法、GCD 或 LCM', '能把多个数论工具组合使用', '能识别答案溢出并切换高精度思路']}
            childrenBySection={{
                1: <FactorLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">数论题拆解：先找关键词，再看数据范围</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                看到“素数”“约数”“倍数”“周期”“最简”“特别大”，不要急着套模板，先判断它到底在问哪类关系。
                            </p>
                        </div>
                        <CompareTable
                            headers={['题面信号', '常用工具', '提醒']}
                            rows={[
                                ['多次判断素数', '埃氏筛', '先预处理，再 O(1) 查询'],
                                ['最多平均分组', 'GCD', '多个数可以连续取 gcd'],
                                ['同时再次出现', 'LCM', '先除再乘，防止溢出'],
                                ['答案位数巨大', '高精度', '字符串读入，数组计算'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">综合模板：筛出素数，再对目标做统计</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                常见综合题会先让你找素数，再统计满足条件的数量。把预处理和统计逻辑分开，程序会更稳。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`sieve(n);
int count = 0;
for (int x = 2; x <= n; x++) {
  if (isPrime[x] && gcd(x, m) == 1) {
    count++;
  }
}
cout << count << endl;`}</CodeBlock>
                            <StepList steps={[
                                '先根据最大 n 做筛法预处理',
                                '循环枚举候选数字',
                                '用 isPrime 快速判断素数',
                                '再叠加 gcd 等其他条件',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">高精度衔接：大数题也可能藏着数论</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                有些题答案特别大，但判断条件仍然是数论模型。例如阶乘、组合计数、重复乘法都可能需要高精度。
                            </p>
                        </div>
                        <CodeBlock>{`vector<int> ans(1, 1);
for (int i = 2; i <= n; i++) {
  ans = mul(ans, i);
}
print(ans);`}</CodeBlock>
                        <Callout icon={Sigma} title="判断顺序" tone="amber">
                            先问“算法模型是什么”，再问“数据类型装不装得下”。这两个问题要分开判断。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                本节练习要求写出“工具选择理由”，不要只贴代码。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>统计 1 到 n 中与 m 互质的素数个数。</li>
                                <li>求多个数的最大公约数和最小公倍数。</li>
                                <li>用高精度计算 n!，并统计结果末尾 0 的个数。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课进入链表。数论处理“数字关系”，链表处理“节点关系”，两者都要求模型清楚。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
