import React, { useMemo, useState } from 'react';
import { ClipboardCheck, Filter, Search, ShieldCheck, Sparkles } from 'lucide-react';
import CppL5LessonSupport from '../../../components/CppL5LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '素数密度' },
    { id: 2, title: '从试除到筛法', category: '效率升级' },
    { id: 3, title: '埃氏筛模板', category: '核心代码' },
    { id: 4, title: '线性筛初识', category: '进阶视野' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function primesUpTo(limit) {
    const isPrime = Array(limit + 1).fill(true);
    isPrime[0] = false;
    isPrime[1] = false;

    for (let i = 2; i * i <= limit; i++) {
        if (!isPrime[i]) continue;
        for (let j = i * i; j <= limit; j += i) {
            isPrime[j] = false;
        }
    }

    return Array.from({ length: limit - 1 }, (_, index) => index + 2).filter((value) => isPrime[value]);
}

function SieveLab() {
    const [limit, setLimit] = useState(60);
    const primes = useMemo(() => primesUpTo(limit), [limit]);

    return (
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Filter className="text-amber-700" />
                <h3 className="text-xl font-black text-slate-950">素数筛选实验台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-amber-100">
                    <label className="block text-sm font-black text-slate-700">筛选范围：2 到 {limit}</label>
                    <input
                        type="range"
                        min="20"
                        max="120"
                        value={limit}
                        onChange={(event) => setLimit(Number(event.target.value))}
                        className="mt-3 w-full"
                    />
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        埃氏筛会从小素数出发，把它的倍数批量划掉。
                    </p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-amber-100">
                    <div className="flex flex-wrap gap-2">
                        {primes.map((prime) => (
                            <span key={prime} className="rounded-lg bg-amber-100 px-3 py-2 font-mono text-sm font-black text-amber-800">
                                {prime}
                            </span>
                        ))}
                    </div>
                    <p className="mt-4 text-xs font-bold text-slate-500">共 {primes.length} 个素数</p>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '1 是素数吗？',
        answer: '不是',
        reason: '素数要求大于 1，并且只有 1 和自身两个正因数。',
    },
    {
        question: '埃氏筛为什么从 i*i 开始划？',
        answer: '更小倍数已被划过',
        reason: '例如 2*i、3*i 这些小倍数早在处理 2、3 时已经处理。',
    },
    {
        question: '筛法适合什么场景？',
        answer: '批量判断素数',
        reason: '如果要多次询问某个数是否为素数，预处理筛表更划算。',
    },
];

function SievePredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'埃氏筛划 i 的倍数，从 2*i 开始还是 i*i 开始更好？'}
                options={['2*i（划得更全）', 'i*i（更小的倍数已被划过）']}
                correctIndex={1}
                explanation="i 的小倍数（2i、3i…(i-1)i）在处理 2、3… 时已经划过了，从 i*i 开始划不会漏，还能减少重复标记。"
                misconception="从 2*i 开始，重复划那些早已划过的数。"
            />
            <PredictCheck
                prompt={'筛法外层 for (int i=2; i*i<=n; i++)，只到 sqrt(n) 够吗？'}
                options={['不够，要一路到 n', '够，大于 sqrt(n) 的数不会再有新倍数要划']}
                correctIndex={1}
                explanation="大于 sqrt(n) 的 i，它的 i*i 已经超过 n，没有倍数落在范围内要划。所以外层只需到 sqrt(n)。"
                misconception="以为外层要一路枚举到 n。"
            />
            <PredictCheck
                prompt={'只判断 1 个数是否素数，用埃氏筛（建整张表）划算吗？'}
                options={['划算', '不划算，单次判断用试除更省']}
                correctIndex={1}
                explanation="筛法要 O(n) 的时间和空间建表，适合批量 / 多次查询。只判一个数，用试除到 sqrt 更省。看是单次还是批量。"
                misconception="不分场景，单次判断也去建整张筛表。"
            />
        </div>
    );
}

const sieveMasteryItems = [
    {
        label: '能区分试除法和筛法的适用场景。',
        evidence: '少量数字用试除，批量 / 多次查询用筛法。',
        retryHint: '回到方法对比表。',
    },
    {
        label: '能写出埃氏筛模板。',
        evidence: '只用还没被划掉的 i 去划倍数，从 i*i 开始。',
        retryHint: '回到埃氏筛模板。',
    },
    {
        label: '能解释为什么从 i*i 开始、外层到 sqrt。',
        evidence: '小倍数已被划、大于 sqrt 的 i 没有倍数要划。',
        retryHint: '回到模板的四个步骤。',
    },
    {
        label: '能为素数题选对方法。',
        evidence: '先判断是单次判断还是批量查询，再决定试除或筛。',
        retryHint: '先问：这题要查几次素数？',
    },
];

export default function CppL5Lesson1() {
    return (
        <CppLessonShell
            lessonNumber={1}
            lessonTitle="素数大筛选 (埃氏/线性)"
            lessonSubtitle="从一个个试除升级到批量预处理"
            accent="amber"
            levelTitle="C++ 专家"
            levelCode="L5"
            sections={sections}
            previousPath="/lesson/4/16"
            nextPath="/lesson/5/2"
            topSupport={<CppL5LessonSupport lessonId={1} />}
            bottomSupport={<CppL5LessonSupport lessonId={1} placement="bottom" />}
            hero={{
                title: '筛法的本质：不用反复问“它是不是素数”，而是一次性标出所有答案',
                description: '本课用埃氏筛建立批量素数判断能力，并初步认识线性筛为什么能进一步减少重复标记。',
            }}
            goals={['能解释素数定义和试除复杂度', '能写出埃氏筛模板', '能判断何时需要预处理素数表']}
            prerequisites={['理解素数定义和试除法', '会用布尔数组做标记', '会写嵌套 for 循环']}
            childrenBySection={{
                1: <SieveLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">从试除到筛法：把重复判断变成预处理</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                判断一个数是否为素数，可以试除到平方根；但如果题目要判断很多个数，逐个试除会重复做很多工作。
                            </p>
                        </div>
                        <CompareTable
                            headers={['方法', '适合场景', '核心代价']}
                            rows={[
                                ['试除法', '只判断少量数字', '每个数最多试到 sqrt(n)'],
                                ['埃氏筛', '批量判断 1..n', '预处理后 O(1) 查询'],
                                ['线性筛', '更大范围预处理', '每个合数尽量只被标记一次'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">埃氏筛模板：素数留下，倍数划掉</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                初始假设所有大于 1 的数都是素数。遇到还没被划掉的 i，就把 i 的倍数划掉。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`const int N = 1000000;
bool isPrime[N + 1];

void sieve(int n) {
  for (int i = 0; i <= n; i++) isPrime[i] = true;
  isPrime[0] = isPrime[1] = false;

  for (int i = 2; i * i <= n; i++) {
    if (!isPrime[i]) continue;
    for (int j = i * i; j <= n; j += i) {
      isPrime[j] = false;
    }
  }
}`}</CodeBlock>
                            <StepList steps={[
                                '初始化 isPrime 数组',
                                '0 和 1 不是素数',
                                '只用未被划掉的 i 去划倍数',
                                '从 i*i 开始划，减少重复',
                            ]} />
                        </div>
                        <SievePredictionChecks />
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">线性筛初识：每个合数只被最小质因子划掉</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                线性筛的代码更抽象，五级阶段先理解思想：记录已经发现的素数，用“最小质因子”控制标记次数。
                            </p>
                        </div>
                        <CodeBlock>{`vector<int> primes;
bool isComposite[N + 1];

for (int i = 2; i <= n; i++) {
  if (!isComposite[i]) primes.push_back(i);
  for (int p : primes) {
    if (i * p > n) break;
    isComposite[i * p] = true;
    if (i % p == 0) break;
  }
}`}</CodeBlock>
                        <Callout icon={Sparkles} title="先掌握埃氏筛" tone="amber">
                            线性筛是加分项。做题时如果数据范围不极端，埃氏筛已经足够稳定。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                素数题请先判断是“单次判断”还是“批量查询”，这会直接决定方法。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <MasteryCheck
                            title="C++ L5-1 素数筛离开前检查"
                            description="筛法最怕“从 2*i 重复划、单次判断也建整张表”。勾选前先想清这题是单次还是批量查询。"
                            items={sieveMasteryItems}
                        />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>输出 1 到 n 之间所有素数。</li>
                                <li>读入 q 次询问，每次判断 x 是否为素数。</li>
                                <li>统计 1 到 n 中素数的个数。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课学习 GCD 和 LCM。素数和最大公约数都是数论题的基础工具。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
