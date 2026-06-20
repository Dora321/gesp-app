import React, { useMemo, useState } from 'react';
import { ClipboardCheck, Hash, ListChecks, RotateCcw, ScanLine } from 'lucide-react';
import CppL2LessonSupport from '../../../components/CppL2LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CodeTracer, CompareTable, MiniQuiz } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '数位拆解' },
    { id: 2, title: '取个位', category: '核心操作' },
    { id: 3, title: '循环拆数', category: '完整流程' },
    { id: 4, title: '典型应用', category: '题型迁移' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function DigitLab() {
    const [number, setNumber] = useState(3729);

    const digits = useMemo(() => {
        const result = [];
        let x = number;
        if (x === 0) return [{ step: 1, digit: 0, rest: 0 }];
        let step = 1;
        while (x > 0) {
            result.push({ step, digit: x % 10, rest: Math.floor(x / 10) });
            x = Math.floor(x / 10);
            step += 1;
        }
        return result;
    }, [number]);

    const sum = digits.reduce((total, item) => total + item.digit, 0);
    const reversed = Number(digits.map((item) => item.digit).join(''));

    return (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Hash className="text-emerald-700" />
                <h3 className="text-xl font-black text-slate-950">数位拆解实验台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-emerald-100">
                    <label className="block text-sm font-black text-slate-700">数字：{number}</label>
                    <input
                        type="range"
                        min="0"
                        max="9999"
                        value={number}
                        onChange={(event) => setNumber(Number(event.target.value))}
                        className="mt-3 w-full"
                    />
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-lg bg-slate-950 p-4 font-mono text-green-400">数位和：{sum}</div>
                        <div className="rounded-lg bg-slate-950 p-4 font-mono text-green-400">反转：{reversed}</div>
                    </div>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-emerald-100">
                    <div className="grid gap-2">
                        {digits.map((item) => (
                            <div key={`${item.step}-${item.digit}-${item.rest}`} className="grid grid-cols-3 rounded-lg bg-emerald-100 px-3 py-2 text-sm font-black text-emerald-900">
                                <span>第 {item.step} 步</span>
                                <span>个位 {item.digit}</span>
                                <span>剩下 {item.rest}</span>
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
        question: 'n % 10 得到什么？',
        answer: '个位数字',
        reason: '对 10 取余会留下最后一位。',
    },
    {
        question: 'n / 10 的作用是什么？',
        answer: '去掉个位',
        reason: '整数除法会舍去小数，相当于右移一位。',
    },
    {
        question: '拆数循环什么时候停止？',
        answer: 'n 变成 0',
        reason: '每轮去掉一位，所有位都处理完后 n 就是 0。',
    },
];

function DigitPeelTracer() {
    const steps = useMemo(() => {
        const result = [{ active: [0], vars: { n: 3729 } }];
        let n = 3729;
        let round = 0;
        const digits = [];
        while (n > 0) {
            round += 1;
            const before = n;
            const digit = n % 10;
            digits.push(digit);
            n = Math.floor(n / 10);
            result.push({
                active: [1, 2, 3],
                vars: { n },
                action: round === 1 ? '开始拆' : '下一位',
                row: [`第 ${round} 轮`, before, digit, n],
            });
        }
        result.push({
            active: [1, 4],
            vars: { n },
            action: '判断并退出',
            exit: 'n = 0，循环结束',
            output: `cout 依次输出 ${digits.join(' ')}`,
        });
        return result;
    }, []);

    return (
        <CodeTracer
            title="数位拆解追踪器"
            code={`int n = 3729;
while (n > 0) {
  cout << n % 10;
  n /= 10;
}`}
            varOrder={['n']}
            columns={['轮次', 'n', 'n % 10 (个位)', 'n / 10 后']}
            steps={steps}
            hint="点击「开始拆」，看个位一个个被取走 →"
        />
    );
}

export default function CppL2Lesson10() {
    return (
        <CppLessonShell
            lessonNumber={10}
            lessonTitle="数字拆拆看 (数位)"
            lessonSubtitle="用取余和整除把一个数一位位拆开"
            accent="emerald"
            sections={sections}
            previousPath="/lesson/2/9"
            nextPath="/lesson/2/11"
            topSupport={<CppL2LessonSupport lessonId={10} />}
            bottomSupport={<CppL2LessonSupport lessonId={10} placement="bottom" />}
            hero={{
                title: '一个整数不是黑盒，它是一串可以拆开的数字',
                description: '数位和、反转数、回文数、统计某个数字出现次数，都从同一组动作开始：取个位，再去掉个位。',
            }}
            goals={['会用 n % 10 取个位', '会用 n / 10 去掉个位', '能写数位和、反转数等基础题']}
            childrenBySection={{
                1: <DigitLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">两把钥匙：取余拿个位，整除删个位</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                数位题本质上是重复处理最后一位。<code>% 10</code> 拿到个位，<code>/ 10</code> 去掉个位。
                            </p>
                        </div>
                        <DigitPeelTracer />
                        <Callout icon={ScanLine} title="读题关键词" tone="emerald">
                            看到“各位数字”“数位和”“反转”“回文”“出现次数”，基本都要想到 <code>% 10</code> 和 <code>/ 10</code>。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">循环拆数：每轮处理一位</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                循环条件通常写 <code>while (n &gt; 0)</code>。每一轮先取个位，再更新答案，最后去掉个位。
                            </p>
                        </div>
                        <CodeBlock>{`int sum = 0;
while (n > 0) {
  int digit = n % 10;
  sum += digit;
  n /= 10;
}`}</CodeBlock>
                        <CompareTable
                            headers={['代码', '作用', '注意点']}
                            rows={[
                                ['digit = n % 10', '拿到当前个位', 'digit 是 0 到 9'],
                                ['sum += digit', '累计数位和', '也可换成计数、乘积'],
                                ['n /= 10', '删掉个位', '必须更新，否则死循环'],
                            ]}
                        />
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">典型应用：数位和、反转数、回文判断</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                多数数位题只是“每一位怎么处理”的区别。框架相同，更新答案的方式不同。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-2">
                            <CodeBlock>{`// 反转整数
int rev = 0;
while (n > 0) {
  int d = n % 10;
  rev = rev * 10 + d;
  n /= 10;
}`}</CodeBlock>
                            <CodeBlock>{`// 统计数字 7 出现次数
int cnt = 0;
while (n > 0) {
  if (n % 10 == 7) cnt++;
  n /= 10;
}`}</CodeBlock>
                        </div>
                        <Callout icon={RotateCcw} title="反转数公式" tone="blue">
                            <code>rev = rev * 10 + d</code> 的含义是：原来的反转结果整体左移一位，再把新个位接到末尾。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                每道数位题都先写“取个位、处理、删个位”的三步模板，再把中间处理换成题目需要的逻辑。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>输入 n，输出 n 的数位和。</li>
                                <li>输入 n，输出 n 的反转数。</li>
                                <li>输入 n 和 k，统计数字 k 在 n 中出现了几次。</li>
                            </ul>
                        </Callout>
                        <Callout icon={ListChecks} title="下一课衔接" tone="blue">
                            下一课讲因数与倍数，仍然离不开 <code>%</code>。数位题用它拆个位，因数题用它判断整除。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
