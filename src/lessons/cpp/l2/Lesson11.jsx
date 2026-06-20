import React, { useMemo, useState } from 'react';
import { AlertTriangle, Calculator, ClipboardCheck, ListChecks, Search, Sigma } from 'lucide-react';
import CppLessonShell, { Callout, CodeBlock, CodeTracer, CompareTable, MiniQuiz } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '整除关系' },
    { id: 2, title: '因数判断', category: '核心定义' },
    { id: 3, title: '枚举因数', category: '循环应用' },
    { id: 4, title: '倍数与公因数', category: '题型迁移' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function FactorLab() {
    const [n, setN] = useState(36);

    const factors = useMemo(() => {
        const result = [];
        for (let i = 1; i <= n; i += 1) {
            if (n % i === 0) result.push(i);
        }
        return result;
    }, [n]);

    return (
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Calculator className="text-blue-700" />
                <h3 className="text-xl font-black text-slate-950">因数扫描实验</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-blue-100">
                    <label className="block text-sm font-black text-slate-700">目标数字：{n}</label>
                    <input
                        type="range"
                        min="1"
                        max="80"
                        value={n}
                        onChange={(event) => setN(Number(event.target.value))}
                        className="mt-3 w-full"
                    />
                    <div className="mt-5 rounded-lg bg-slate-950 p-4 font-mono text-green-400">
                        因数个数：{factors.length}
                    </div>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-blue-100">
                    <h4 className="mb-3 font-black text-slate-900">{n} 的因数</h4>
                    <div className="flex flex-wrap gap-2">
                        {factors.map((factor) => (
                            <span key={factor} className="rounded-lg bg-blue-600 px-3 py-2 font-mono text-sm font-black text-white">
                                {factor}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: 'a 是 b 的因数，代码怎么判断？',
        answer: 'b % a == 0',
        reason: 'b 能被 a 整除，说明 a 是 b 的因数。',
    },
    {
        question: '0 可以当除数判断取余吗？',
        answer: '不可以',
        reason: '对 0 取余没有意义，程序会出错。',
    },
    {
        question: '枚举 n 的因数时常从几开始？',
        answer: '1',
        reason: '1 是所有正整数的因数。',
    },
];

function FactorTracer() {
    const n = 12;
    const steps = useMemo(() => {
        const result = [{ active: [0], vars: { n, i: '–' } }];
        const found = [];
        for (let i = 1; i <= n; i += 1) {
            const hit = n % i === 0;
            if (hit) found.push(i);
            result.push({
                active: hit ? [0, 1, 2] : [0, 1],
                vars: { n, i },
                action: i === 1 ? '开始枚举' : '下一个 i',
                row: [`i = ${i}`, `${n} % ${i} = ${n % i}`, hit ? '✓ 是因数，输出' : '✗ 跳过'],
            });
        }
        result.push({
            active: [4],
            vars: { n, i: n },
            action: '退出',
            output: `cout 输出因数：${found.join(' ')}`,
        });
        return result;
    }, []);

    return (
        <CodeTracer
            title="因数枚举追踪器"
            code={`for (int i = 1; i <= n; i++) {
  if (n % i == 0) {
    cout << i << " ";
  }
}`}
            varOrder={['n', 'i']}
            columns={['枚举', 'n % i', '是因数?']}
            steps={steps}
            hint="点击「开始枚举」，看哪些 i 能整除 12 →"
        />
    );
}

export default function CppL2Lesson11() {
    return (
        <CppLessonShell
            lessonNumber={11}
            lessonTitle="因数与倍数"
            lessonSubtitle="把整除关系变成可判断、可统计的代码"
            accent="blue"
            sections={sections}
            previousPath="/lesson/2/10"
            nextPath="/lesson/2/12"
            hero={{
                title: '因数倍数题，本质是反复问“能不能整除”',
                description: '从质数判断到数位拆解，我们一直在用取余。今天把取余正式变成解题工具，用来找因数、判倍数、统计公因数。',
            }}
            goals={['能用取余判断整除关系', '能枚举一个数的所有因数', '能处理倍数、公因数等常见题型']}
            childrenBySection={{
                1: <FactorLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">定义翻译：整除就是余数为 0</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                如果 <code>b % a == 0</code>，说明 b 能被 a 整除，也就是说 a 是 b 的因数，b 是 a 的倍数。
                            </p>
                        </div>
                        <CodeBlock>{`int a, b;
cin >> a >> b;

if (a != 0 && b % a == 0) {
  cout << "a 是 b 的因数";
}`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="先排除除数为 0" tone="amber">
                            只要写到 <code>% a</code>，就要确认 a 不是 0。虽然二级题常给正整数，但养成这个习惯很值。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">枚举因数：从 1 到 n 逐个试</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                最直观的写法是枚举每个 i，只要 n 能被 i 整除，就输出或统计它。
                            </p>
                        </div>
                        <FactorTracer />
                        <Callout icon={Search} title="和质数判断的关系" tone="emerald">
                            质数判断是在找“有没有 1 和自己以外的因数”；枚举因数是在把所有能整除的 i 都找出来。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">倍数与公因数：换个问法，还是整除</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                公因数题需要同时满足两个整除条件；倍数题则常常枚举一个范围内所有符合条件的数。
                            </p>
                        </div>
                        <CompareTable
                            headers={['题型', '判断条件', '常见输出']}
                            rows={[
                                ['a 是否为 b 的因数', 'b % a == 0', '是 / 否'],
                                ['x 是否为 a 和 b 的公因数', 'a % x == 0 且 b % x == 0', '公因数列表'],
                                ['1..n 中 k 的倍数', 'i % k == 0', '倍数个数或总和'],
                            ]}
                        />
                        <CodeBlock>{`int cnt = 0;
for (int x = 1; x <= min(a, b); x++) {
  if (a % x == 0 && b % x == 0) {
    cnt++;
  }
}`}</CodeBlock>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                因数倍数题最重要的是把中文关系翻译成取余表达式。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>输入 n，输出 n 的所有因数。</li>
                                <li>输入 n 和 k，统计 1 到 n 中有多少个 k 的倍数。</li>
                                <li>输入 a 和 b，输出它们所有公因数。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Sigma} title="下一课衔接" tone="blue">
                            下一课进入数组。以前我们每次只处理一个数；数组让我们一次保存一组数，再统一统计、查找、修改。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
