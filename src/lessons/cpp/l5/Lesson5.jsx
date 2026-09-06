import React, { useMemo, useState } from 'react';
import { ClipboardCheck, Hash, Search, Sigma } from 'lucide-react';
import CppL5LessonSupport from '../../../components/CppL5LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

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

function NumberTheoryPredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'求 LCM 时，a * b / gcd(a, b) 和 a / gcd(a, b) * b 哪种写法更安全？'}
                options={['一样，乘除顺序不影响结果', '先除后乘更安全：a * b 可能先溢出']}
                correctIndex={1}
                explanation="a、b 都接近 10⁹ 时 a * b ≈ 10¹⁸，乘法先做就可能溢出。gcd 整除 a，先除不丢精度，中间值小得多。这是五级数论题的高频扣分点。"
                misconception="以为数学上等价的式子在代码里也完全等价。"
            />
            <PredictCheck
                prompt={'求三个数 12、18、24 的最大公约数，应该怎么算？'}
                options={['两两求 gcd 取最小值', '滚动计算：gcd(gcd(12, 18), 24) = 6']}
                correctIndex={1}
                explanation="gcd 满足结合律，多个数直接滚动：先 gcd(12,18)=6，再 gcd(6,24)=6。lcm 同理滚动。“两两取最小”没有数学依据。"
                misconception="对多个数的 gcd 没有滚动计算的概念，自创错误规则。"
            />
            <PredictCheck
                prompt={'要回答 10⁵ 次“x 是不是素数”（x ≤ 10⁶），每次现场试除还是先筛？'}
                options={['每次试除 O(√x)，代码短', '筛一次预处理，之后每次查询 O(1)']}
                correctIndex={1}
                explanation="试除总量 ≈ 10⁵ × 10³ = 10⁸，压着时限的天花板；埃氏筛预处理一次，之后每次查 isPrime[x] 是 O(1)。查询次数多时，预处理永远是第一选择。"
                misconception="只估单次查询的成本，忽略查询次数的乘法效应。"
            />
        </div>
    );
}

const numberTheoryMasteryItems = [
    {
        label: '能按题面信号选择工具。',
        evidence: '多次判素数→筛法、平均分组→GCD、同时出现→LCM、答案巨大→高精度。',
        retryHint: '回到“数论题拆解”的信号对照表。',
    },
    {
        label: 'LCM 永远写成 a / gcd(a, b) * b。',
        evidence: '能解释先乘后除为什么会溢出、先除为什么不丢精度。',
        retryHint: '重做 LCM 溢出预测题。',
    },
    {
        label: '多个数的 gcd / lcm 会滚动计算。',
        evidence: '能写出 for 循环里 g = gcd(g, a[i]) 的滚动式。',
        retryHint: '重做三个数 gcd 预测题。',
    },
    {
        label: '会用“先定模型、再查类型”两步判断。',
        evidence: '先确认算法，再估答案上限决定 int / long long / 高精度。',
        retryHint: '回看“判断顺序”提示框。',
    },
];

export default function CppL5Lesson5() {
    return (
        <CppLessonShell
            prerequisites={['会用循环判断素数', '会用取模做整除判断', '会用数组记录标记信息']}
            lessonNumber={5}
            lessonTitle="数论综合实战"
            lessonSubtitle="在筛法、GCD、LCM 和高精度之间选择工具"
            accent="amber"
            levelTitle="C++ 专家"
            levelCode="L5"
            sections={sections}
            previousPath="/lesson/5/4"
            nextPath="/lesson/5/6"
            topSupport={<CppL5LessonSupport lessonId={5} />}
            bottomSupport={<CppL5LessonSupport lessonId={5} placement="bottom" />}
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
                        <div>
                            <h4 className="text-xl font-black text-slate-900">多个数的 gcd / lcm：滚动着算</h4>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-2">
                            <CodeBlock>{`// n 个数的最大公约数
int g = a[0];
for (int i = 1; i < n; i++) {
  g = gcd(g, a[i]);
}`}</CodeBlock>
                            <CodeBlock>{`// n 个数的最小公倍数
long long l = a[0];
for (int i = 1; i < n; i++) {
  l = l / gcd(l, (long long)a[i]) * a[i];
}   // 先除后乘，防溢出`}</CodeBlock>
                        </div>
                        <NumberTheoryPredictionChecks />
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
                        <TransferCheck
                            prompt={'换个例子：三路公交分别每 6、8、10 分钟发一班，刚才同时发车。多少分钟后三路再次同时发车？'}
                            hint="“同时再次出现”是 LCM 信号；三个数滚动算，每步先除后乘。"
                            answer="120 分钟后。lcm(6, 8) = 24，lcm(24, 10) = 120。"
                            steps={[
                                '识别模型：“同时再次发生”→ 最小公倍数。',
                                'lcm(6, 8)：6 / gcd(6,8) × 8 = 6 / 2 × 8 = 24。',
                                'lcm(24, 10)：24 / gcd(24,10) × 10 = 24 / 2 × 10 = 120。',
                                '验证：120 = 6×20 = 8×15 = 10×12 ✓。',
                            ]}
                        />
                        <MasteryCheck
                            title="C++ L5-5 数论综合离开前检查"
                            description="综合题拼的是工具选择速度。勾选前先不看笔记，把四类题面信号和对应工具默写出来。"
                            items={numberTheoryMasteryItems}
                        />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>统计 1 到 n 中与 m 互质的素数个数。</li>
                                <li>求多个数的最大公约数和最小公倍数（写滚动版）。</li>
                                <li>用高精度计算 n!，并统计结果末尾 0 的个数。</li>
                                <li>挑战：解释末尾 0 的个数为什么等于 1..n 中因子 5 的总个数，并用它验证高精度结果。</li>
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
