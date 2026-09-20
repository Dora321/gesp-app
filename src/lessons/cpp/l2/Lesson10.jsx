import React, { useMemo, useState } from 'react';
import { ClipboardCheck, Hash, ListChecks, RotateCcw, ScanLine } from 'lucide-react';
import CppL2LessonSupport from '../../../components/CppL2LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CodeTracer, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, TransferCheck } from '../CppLessonShell';

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
                    <label htmlFor="l2-digit-number" className="block text-sm font-black text-slate-700">数字：{number}</label>
                    <input
                        id="l2-digit-number"
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
        reason: '对非负整数取余 10 会得到十进制的最后一位。',
    },
    {
        question: 'n / 10 的作用是什么？',
        answer: '去掉个位',
        reason: '对非负整数做整数除法，会去掉十进制的最后一位。',
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
            output: `cout 依次输出 ${digits.join(' ')}（数字之间有空格）`,
        });
        return result;
    }, []);

    return (
        <CodeTracer
            title="数位拆解追踪器"
            code={`int n = 3729;
while (n > 0) {
  cout << n % 10 << " ";
  n /= 10;
}`}
            varOrder={['n']}
            columns={['轮次', 'n', 'n % 10 (个位)', 'n / 10 后']}
            steps={steps}
            hint="点击「开始拆」，看个位一个个被取走 →"
        />
    );
}

function DigitPredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'数位拆解循环里忘了写 n /= 10，会怎样？'}
                options={['只是少处理几位', '死循环（n 一直 > 0）']}
                correctIndex={1}
                explanation="本例 n 起始为正数；若不更新 n，while (n > 0) 一直成立，会反复处理同一位。每轮都要让 n 逼近 0。"
                misconception="忘了更新 n，导致死循环。"
            />
            <PredictCheck
                prompt={'n % 10 拿到的是哪一位？'}
                options={['最高位', '个位（最低位）']}
                correctIndex={1}
                explanation="% 10 取余得到最后一位，也就是个位。要从最高位开始处理得换思路（比如先转成字符串）。"
                misconception="以为 % 10 取的是最高位。"
            />
            <PredictCheck
                prompt={'求反转数，rev = rev * 10 + d，写成 rev = d * 10 + rev 对吗？'}
                options={['对', '不对，会算出完全不同的值']}
                correctIndex={1}
                explanation="反转要把已有结果整体左移一位（rev * 10），再把新个位 d 接到末尾。写成 d * 10 + rev 完全是另一个数。"
                misconception="把反转公式里乘 10 的对象搞反了。"
            />
        </div>
    );
}

const digitMasteryItems = [
    {
        label: '能用 % 10 取个位、/ 10 删个位。',
        evidence: '每一轮取个位、处理、再删个位。',
        retryHint: '回到「两把钥匙」。',
    },
    {
        label: '能写 while (n>0) 拆数并记得更新 n。',
        evidence: 'n 为正时，每轮要通过 n /= 10 删除个位；n=0 时循环体一次也不执行。',
        retryHint: '回到循环拆数表。',
    },
    {
        label: '能写出反转数公式。',
        evidence: 'rev = rev * 10 + d：左移已有结果再接新个位。',
        retryHint: '回到反转数公式。',
    },
    {
        label: '能把模板迁移到数位和 / 计数 / 回文。',
        evidence: '框架相同，只改中间「怎么处理这一位」。',
        retryHint: '回到典型应用。',
    },
];

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
                description: '本课先处理 0 到 9999 的非负整数：数位和、反转数、回文数、统计某个数字出现次数，都从取个位、去掉个位开始。',
            }}
            goals={['会用 n % 10 取个位', '会用 n / 10 去掉个位', '能写数位和、反转数等基础题']}
            prerequisites={['理解取余 % 和整除 /', '会写 while 循环', '理解整数除法会舍去小数']}
            childrenBySection={{
                1: <DigitLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">两把钥匙：取余拿个位，整除删个位</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                对非负整数，<code>% 10</code> 拿到十进制个位，整数 <code>/ 10</code> 去掉个位。本课实验限定在 0～9999。
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
                        <Callout icon={Hash} title="n = 0 要单独想" tone="amber">
                            <code>while (n &gt; 0)</code> 在 n=0 时一次也不执行。数位和、反转数从 0 开始，结果仍是 0；若统计数字 0 出现的次数，应把整数 0 视为一位，先用 <code>if (n == 0)</code> 单独处理。负数不在本课演示范围内。
                        </Callout>
                        <CompareTable
                            headers={['代码', '作用', '注意点']}
                            rows={[
                                ['digit = n % 10', '拿到当前个位', 'digit 是 0 到 9'],
                                ['sum += digit', '累计数位和', '也可换成计数、乘积'],
                                ['n /= 10', '删掉个位', '必须更新，否则死循环'],
                            ]}
                        />
                        <DigitPredictionChecks />
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
                            <CodeBlock>{`// 统计数字 k 出现次数，0 <= n <= 9999，0 <= k <= 9
int cnt = 0;
if (n == 0) {
  if (k == 0) cnt = 1;
} else {
  while (n > 0) {
    if (n % 10 == k) cnt++;
    n /= 10;
  }
}`}</CodeBlock>
                        </div>
                        <Callout icon={RotateCcw} title="反转数公式" tone="blue">
                            <code>rev = rev * 10 + d</code> 的含义是：原来的反转结果在十进制下左移一位，再把新个位接到末尾。前导 0 不保留，例如 1200 反转得到整数 21；更大范围还需注意结果不能超出整数类型。
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
                        <TransferCheck
                            prompt="换个例子：用 % 和 / 拆出整数 4276 的每一位（从个位开始）。写出每一步。"
                            hint="n%10 取个位，n/=10 去掉个位，循环到 n 为 0。"
                            answer="依次拆出 6、7、2、4。"
                            steps={[
                                '4276 % 10 = 6（个位），4276 / 10 = 427。',
                                '427 % 10 = 7，427 / 10 = 42。',
                                '42 % 10 = 2，42 / 10 = 4；4 % 10 = 4，4 / 10 = 0 停。',
                            ]}
                        />
                        <MasteryCheck
                            title="C++ L2-10 数位拆解离开前检查"
                            description="数位题最怕“忘了 n/=10 死循环、反转公式写反”。勾选前先手推 3729 的数位和与反转数。"
                            items={digitMasteryItems}
                        />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>输入 0～9999 的整数 n，输出 n 的数位和。</li>
                                <li>输入 0～9999 的整数 n，输出 n 的反转数。</li>
                                <li>输入 0～9999 的整数 n 和 0～9 的 k，统计数字 k 在 n 中出现了几次；n=0 时也有一位数字 0。</li>
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
