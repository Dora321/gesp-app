import React, { useMemo, useState } from 'react';
import { AlertTriangle, ClipboardCheck, Search, ShieldCheck, Sigma } from 'lucide-react';
import CppL2LessonSupport from '../../../components/CppL2LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CodeTracer, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '质数判断' },
    { id: 2, title: '定义与试除', category: '核心方法' },
    { id: 3, title: '平方根优化', category: '效率提升' },
    { id: 4, title: '计数与筛选', category: '题型迁移' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function PrimeLab() {
    const [n, setN] = useState(29);

    const info = useMemo(() => {
        if (n < 2) return { prime: false, checks: [], reason: '小于 2 的整数不是质数' };
        const checks = [];
        for (let i = 2; i * i <= n; i += 1) {
            checks.push({ divisor: i, ok: n % i !== 0 });
            if (n % i === 0) return { prime: false, checks, reason: `${n} 能被 ${i} 整除` };
        }
        return { prime: true, checks, reason: '没有找到 2 到平方根范围内的因数' };
    }, [n]);

    return (
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Search className="text-blue-700" />
                <h3 className="text-xl font-black text-slate-950">质数侦探实验</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-blue-100">
                    <label className="block text-sm font-black text-slate-700">待判断数字：{n}</label>
                    <input
                        type="range"
                        min="1"
                        max="80"
                        value={n}
                        onChange={(event) => setN(Number(event.target.value))}
                        className="mt-3 w-full"
                    />
                    <div className={`mt-5 rounded-lg p-4 font-black ${info.prime ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                        {n} {info.prime ? '是质数' : '不是质数'}
                    </div>
                    <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{info.reason}</p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-blue-100">
                    <h4 className="mb-3 font-black text-slate-900">试除记录</h4>
                    {info.checks.length === 0 ? (
                        <p className="rounded-lg bg-slate-100 p-3 text-sm font-semibold text-slate-600">不需要试除，直接根据定义判断。</p>
                    ) : (
                        <div className="grid gap-2 sm:grid-cols-3">
                            {info.checks.map((check) => (
                                <div key={check.divisor} className={`rounded-lg px-3 py-2 text-center font-mono text-sm font-black ${check.ok ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                    ÷ {check.divisor} {check.ok ? '不整除' : '整除'}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '1 是质数吗？',
        answer: '不是',
        reason: '质数必须大于 1，且只有 1 和它本身两个正因数。',
    },
    {
        question: '为什么只需要试到平方根？',
        answer: '因数成对出现',
        reason: '如果 n 有一个大于平方根的因数，一定还有一个小于平方根的配对因数。',
    },
    {
        question: '判断 2 时循环会执行吗？',
        answer: '不会',
        reason: '2 是最小质数，常见写法中 for 条件一开始就不成立。',
    },
];

function PrimeTracer() {
    const n = 13;
    const steps = useMemo(() => {
        const result = [{ active: [0, 1], vars: { n, i: '–', isPrime: 'true' } }];
        let isPrime = true;
        let i = 2;
        for (; i * i <= n; i += 1) {
            if (n % i === 0) {
                isPrime = false;
                result.push({
                    active: [3, 4, 5, 6],
                    vars: { n, i, isPrime: 'false' },
                    action: '下一个 i',
                    row: [`i = ${i}`, `${i}·${i}=${i * i} ≤ ${n} ✓`, `${n} % ${i} = 0`, '找到因数 → break'],
                });
                break;
            }
            result.push({
                active: [3, 4],
                vars: { n, i, isPrime: 'true' },
                action: i === 2 ? '开始试除' : '下一个 i',
                row: [`i = ${i}`, `${i}·${i}=${i * i} ≤ ${n} ✓`, `${n} % ${i} = ${n % i} ≠ 0`, '继续'],
            });
        }
        if (isPrime) {
            result.push({
                active: [3, 8],
                vars: { n, i, isPrime: 'true' },
                action: '判断并退出',
                exit: `${i}·${i}=${i * i} > ${n}，循环结束`,
                output: `isPrime = true → ${n} 是质数`,
            });
        } else {
            result.push({
                active: [8],
                vars: { n, i, isPrime: 'false' },
                action: '退出',
                output: `isPrime = false → ${n} 不是质数`,
            });
        }
        return result;
    }, []);

    return (
        <CodeTracer
            title="质数判断追踪器"
            code={`bool isPrime = true;
if (n < 2) isPrime = false;

for (int i = 2; i * i <= n; i++) {
  if (n % i == 0) {
    isPrime = false;
    break;
  }
}`}
            varOrder={['n', 'i', 'isPrime']}
            columns={['试除', 'i·i ≤ n ?', 'n % i', '动作']}
            steps={steps}
            hint="点击「开始试除」，看试到平方根就够了 →"
        />
    );
}

function PrimePredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'判断质数把循环写成 for (int i=2; i<=n; i++)（包含 n 自己），会怎样？'}
                options={['正常', '所有数都被判成「非质数」']}
                correctIndex={1}
                explanation="i 一直试到 n，n % n == 0 总成立，于是每个数都被当成有因数 → 非质数。试除范围只能到 n-1 或 i*i<=n，不含 n 本身。"
                misconception="试除范围包含了 n 自己，导致全部判成非质数。"
            />
            <PredictCheck
                prompt={'判断 n=2，for (int i=2; i*i<=n; i++) 的循环体执行几次？'}
                options={['1 次', '0 次（4 > 2，循环不进）']}
                correctIndex={1}
                explanation="n=2 时 i=2，i*i=4 > 2，条件一开始就为假，循环 0 次，isPrime 保持 true，正确判定 2 是质数。"
                misconception="以为至少要试除一次才能下结论。"
            />
            <PredictCheck
                prompt={'不写 if (n<2) 这个边界，1 会被判成什么？'}
                options={['非质数', '质数（循环 0 次，isPrime 保持 true）']}
                correctIndex={1}
                explanation="n=1 时 i*i<=1 一开始就不成立，循环 0 次，isPrime 仍是 true，会错判 1 为质数。必须先 if (n<2) isPrime = false。"
                misconception="以为不写边界，1 也能自动判成非质数。"
            />
        </div>
    );
}

const primeMasteryItems = [
    {
        label: '能处理 n < 2 的边界。',
        evidence: '先 if (n < 2) isPrime = false，知道 1 不是质数。',
        retryHint: '回到「边界先处理」。',
    },
    {
        label: '能写试除法且范围不含 n。',
        evidence: 'i 从 2 到 n-1 或 i*i<=n，找到因数就 break。',
        retryHint: '别把 n 自己也试除进去。',
    },
    {
        label: '能解释平方根优化为什么成立。',
        evidence: '因数成对出现，小因数找不到大因数也不会单独出现，i*i<=n 即可。',
        retryHint: '回到平方根优化。',
    },
    {
        label: '能迁移到统计 / 输出质数。',
        evidence: '外层枚举 x，内层判质数，是质数就 cnt++。',
        retryHint: '回到题型迁移表。',
    },
];

export default function CppL2Lesson9() {
    return (
        <CppLessonShell
            lessonNumber={9}
            lessonTitle="质数侦探 (Prime)"
            lessonSubtitle="用因数视角判断一个数是否孤独"
            accent="blue"
            sections={sections}
            previousPath="/lesson/2/8"
            nextPath="/lesson/2/10"
            topSupport={<CppL2LessonSupport lessonId={9} />}
            bottomSupport={<CppL2LessonSupport lessonId={9} placement="bottom" />}
            hero={{
                title: '质数题的核心，是找到“有没有第三个因数”',
                description: '质数判断是二级高频题。今天从定义出发，先写稳定的试除法，再用平方根优化减少循环次数。',
            }}
            goals={['能准确处理 n 小于 2 的边界', '能写出试除判断质数', '能解释平方根优化为什么成立']}
            prerequisites={['理解取余 n % i 判断整除', '会写 for 循环和 break', '理解因数的概念']}
            childrenBySection={{
                1: <PrimeLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">定义：只能被 1 和自己整除</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                判断质数不是背表，而是检查有没有额外因数。只要找到一个 2 到 n - 1 之间的因数，它就不是质数。
                            </p>
                        </div>
                        <CodeBlock>{`bool isPrime = true;
if (n < 2) isPrime = false;

for (int i = 2; i <= n - 1; i++) {
  if (n % i == 0) {
    isPrime = false;
    break;
  }
}`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="边界先处理" tone="amber">
                            <code>n &lt; 2</code> 必须单独处理。很多错误答案会把 1 错判成质数。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">平方根优化：不用一路试到 n - 1</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                因数总是成对出现。只要小因数找不到，大因数也不会单独出现，所以试到平方根就够了。
                            </p>
                        </div>
                        <PrimeTracer />
                        <Callout icon={ShieldCheck} title="为什么用 i * i <= n" tone="emerald">
                            用 <code>i * i &lt;= n</code> 可以避免浮点平方根带来的精度细节，也更适合整数题。
                        </Callout>
                        <PrimePredictionChecks />
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">题型迁移：判断一个数，升级成筛选一段数</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                会判断单个数以后，就可以统计 1 到 n 有多少个质数，或者输出区间内所有质数。
                            </p>
                        </div>
                        <CompareTable
                            headers={['题目问法', '外层循环', '内层任务']}
                            rows={[
                                ['判断 n 是否质数', '没有外层', '试除 n'],
                                ['输出 1..n 所有质数', '枚举每个 x', '判断 x 是否质数'],
                                ['统计质数个数', '枚举每个 x', '质数则 cnt++'],
                            ]}
                        />
                        <CodeBlock>{`int cnt = 0;
for (int x = 2; x <= n; x++) {
  bool ok = true;
  for (int i = 2; i * i <= x; i++) {
    if (x % i == 0) {
      ok = false;
      break;
    }
  }
  if (ok) cnt++;
}`}</CodeBlock>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                每道质数题都先写清楚边界，再决定是否需要统计或输出。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <TransferCheck
                            prompt="换个例子：判断 21 是不是质数。只需要试除到哪个数为止？结论是什么？"
                            hint="试除到 sqrt(n) 即可；找到一个能整除的因子就不是质数。"
                            answer="试除到 sqrt(21)≈4；21 能被 3 整除 → 不是质数。"
                            steps={[
                                '只需试除 2 到 sqrt(21)≈4.58，即试 2、3、4。',
                                '21 % 3 == 0 → 有因子 3。',
                                '存在 1 和自身以外的因子 → 21 不是质数（=3×7）。',
                            ]}
                        />
                        <MasteryCheck
                            title="C++ L2-9 质数侦探离开前检查"
                            description="质数题最怕“漏了 n<2 边界、试除范围含 n 自己”。勾选前先用 n=1、2、9 各手推一遍。"
                            items={primeMasteryItems}
                        />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>输入 n，判断 n 是否为质数。</li>
                                <li>输入 n，输出 2 到 n 之间所有质数。</li>
                                <li>统计 1 到 100 中质数的个数，并解释为什么 1 不计入。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Sigma} title="下一课衔接" tone="blue">
                            下一课进入数位拆解，会大量使用 <code>%</code> 和 <code>/</code>。质数题里的取余判断，正好是铺垫。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
