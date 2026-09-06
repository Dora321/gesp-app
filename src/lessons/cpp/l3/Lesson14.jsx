import React, { useMemo, useState } from 'react';
import { Binary, ClipboardCheck, Database, Repeat, Search } from 'lucide-react';
import CppL3LessonSupport from '../../../components/CppL3LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CodeTracer, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '转换模型' },
    { id: 2, title: '十进制转其他进制', category: '短除法' },
    { id: 3, title: '其他进制转十进制', category: '按权展开' },
    { id: 4, title: '代码模板', category: '函数封装' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function BaseConvertLab() {
    const [value, setValue] = useState(42);
    const [base, setBase] = useState(2);

    const converted = useMemo(() => value.toString(base).toUpperCase(), [base, value]);

    return (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Binary className="text-rose-700" />
                <h3 className="text-xl font-black text-slate-950">进制转换实验台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-rose-100">
                    <label className="block text-sm font-black text-slate-700">十进制数：{value}</label>
                    <input type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} className="mt-3 w-full" />
                    <label className="mt-5 block text-sm font-black text-slate-700">目标进制：{base}</label>
                    <input type="range" min="2" max="16" value={base} onChange={(event) => setBase(Number(event.target.value))} className="mt-3 w-full" />
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-rose-100">
                    <p className="text-sm font-black text-slate-500">转换结果</p>
                    <p className="mt-2 break-all font-mono text-4xl font-black text-rose-700">{converted}</p>
                    <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">
                        十进制 {value} 转成 {base} 进制是 {converted}。
                    </p>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '十进制转 k 进制为什么要反转余数？',
        answer: '先得到的是低位',
        reason: '短除法每次取余得到当前最低位，所以最后要倒序输出。',
    },
    {
        question: '二进制 1011 等于十进制多少？',
        answer: '11',
        reason: '1*8 + 0*4 + 1*2 + 1 = 11。',
    },
    {
        question: '十六进制 A 表示多少？',
        answer: '10',
        reason: '十六进制用 A 到 F 表示 10 到 15。',
    },
];

function BaseConvertTracer() {
    const digits = '0123456789ABCDEF';
    const k = 2;
    const steps = useMemo(() => {
        const result = [{ active: [0], vars: { n: 29, ans: '""' } }];
        let n = 29;
        let ans = '';
        let round = 0;
        while (n > 0) {
            round += 1;
            const before = n;
            const r = n % k;
            const ch = digits[r];
            ans += ch;
            n = Math.floor(n / k);
            result.push({
                active: [1, 2, 3],
                vars: { n, ans: `"${ans}"` },
                action: round === 1 ? '开始转换' : '下一轮',
                row: [`第 ${round} 轮`, before, `${before} % ${k} = ${r}`, ch, `"${ans}"`],
            });
        }
        const reversed = [...ans].reverse().join('');
        result.push({
            active: [1, 5],
            vars: { n, ans: `"${ans}"` },
            action: '退出并反转',
            exit: 'n = 0，循环结束',
            output: `reverse → ${reversed}（29 的二进制）`,
        });
        return result;
    }, []);

    return (
        <CodeTracer
            title="进制转换追踪器"
            code={`string ans = "";
while (n > 0) {
  ans += digits[n % k];
  n /= k;
}
reverse(ans.begin(), ans.end());`}
            varOrder={['n', 'ans']}
            columns={['轮次', 'n', 'n % k', 'digits[n%k]', 'ans']}
            steps={steps}
            hint="点击「开始转换」，看余数倒着拼、最后反转 →"
        />
    );
}

function BasePredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'用 while (n > 0) 的短除模板把 n = 0 转成二进制，会输出什么？'}
                options={["'0'（模板自动处理）", '什么都不输出（空字符串）']}
                correctIndex={1}
                explanation={'n = 0 时循环一次都不进，ans 是空串。所以模板前必须特判：if (n == 0) ans = "0"。这是进制编程题最常见的丢分点。'}
                misconception="以为模板对所有输入都成立，忘了 0 这个边界。"
            />
            <PredictCheck
                prompt={'把 29 转二进制，取余依次得到 1、0、1、1、1。直接按这个顺序输出 10111 对吗？'}
                options={['对，余数顺序就是答案', '错，要反转成 11101']}
                correctIndex={1}
                explanation="短除法先取到的是最低位。1、0、1、1、1 是从个位往高位排的，输出前必须 reverse，得到 11101。"
                misconception="忘了余数是从低位开始产生的。"
            />
            <PredictCheck
                prompt={"字符转数字时对 'B' 也用 c - '0'，会得到几？"}
                options={['11（编译器自动认识字母）', "18（'B' 是 66，66 - 48 = 18，结果错误）"]}
                correctIndex={1}
                explanation="c - '0' 只对数字字符成立。字母必须单独分支：c - 'A' + 10，'B' 才能正确变成 11。"
                misconception="把数字字符的转换套路套到所有字符上。"
            />
        </div>
    );
}

const baseMasteryItems = [
    {
        label: '拿到题先判断转换方向。',
        evidence: '能说出“离开十进制用短除，回到十进制用滚动乘加”。',
        retryHint: '回到第 2、3 节各自的开头对照。',
    },
    {
        label: '能写取余反转模板并处理 n = 0。',
        evidence: '模板前有 if (n == 0) 特判，末尾有 reverse。',
        retryHint: '重做 n = 0 预测题。',
    },
    {
        label: '能用 ans = ans * k + 位值 滚动计算。',
        evidence: '能手推 2F(16) → 2 → 47 的两步过程。',
        retryHint: '回到滚动计算的手推表。',
    },
    {
        label: '能双向处理 A-F 与 10-15。',
        evidence: "数字转字符用 digits[x]，字符转数字分数字/字母两个分支。",
        retryHint: '回到“代码模板”小节的两个工具函数。',
    },
];

export default function CppL3Lesson14() {
    return (
        <CppLessonShell
            prerequisites={['会用取模和整除拆分数位', '知道二进制、八进制、十六进制的含义', '会用循环逐位处理一个整数']}
            lessonNumber={14}
            lessonTitle="进制转换编程专场"
            lessonSubtitle="把进制知识写成稳定模板"
            accent="rose"
            levelTitle="C++ 高阶"
            levelCode="L3"
            sections={sections}
            previousPath="/lesson/3/13"
            nextPath="/lesson/3/15"
            topSupport={<CppL3LessonSupport lessonId={14} />}
            bottomSupport={<CppL3LessonSupport lessonId={14} placement="bottom" />}
            hero={{
                title: '进制转换靠两个方向：短除法和按权展开',
                description: '本课把第 1 课的进制知识落实成代码模板，覆盖十进制转 k 进制、k 进制转十进制和十六进制字符处理。',
            }}
            goals={['能写十进制转 k 进制模板', '能写 k 进制转十进制模板', '能处理 A-F 这样的十六进制数字']}
            childrenBySection={{
                1: <BaseConvertLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">十进制转其他进制：不断除以 k 取余</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                每次 <code>n % k</code> 得到一位，<code>n /= k</code> 去掉这一位。余数顺序是从低位到高位，所以最后要反转。
                            </p>
                        </div>
                        <BaseConvertTracer />
                        <Callout icon={ClipboardCheck} title="别忘了 n = 0" tone="amber">
                            <code>while (n &gt; 0)</code> 对 n = 0 一轮都不执行，输出会是空串。
                            完整模板要先特判：<code>if (n == 0) ans = "0";</code>——真题评测里 0 几乎必在测试点里。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">其他进制转十进制：从左到右滚动计算</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                可以按权展开，也可以用滚动公式：每读一位，旧答案乘以 k，再加当前位。
                            </p>
                        </div>
                        <CodeBlock>{`int valueOf(char c) {
  if (c >= '0' && c <= '9') return c - '0';
  return c - 'A' + 10;
}

int fromBase(string s, int k) {
  int ans = 0;
  for (int i = 0; i < s.size(); i++) {
    ans = ans * k + valueOf(s[i]);
  }
  return ans;
}`}</CodeBlock>
                        <Callout icon={Database} title="滚动计算更适合写代码" tone="rose">
                            例如二进制 1011：从左到右依次得到 1、2、5、11。
                        </Callout>
                        <div>
                            <h4 className="text-xl font-black text-slate-900">手推一遍：十六进制 2F 转十进制</h4>
                        </div>
                        <CompareTable
                            headers={['读到的字符', '位值 valueOf', '滚动计算 ans = ans * 16 + 位值', 'ans']}
                            rows={[
                                ['（初始）', '—', '—', '0'],
                                ["'2'", '2', '0 × 16 + 2', '2'],
                                ["'F'", '15', '2 × 16 + 15', '47'],
                            ]}
                        />
                        <p className="text-sm font-semibold leading-6 text-slate-600">
                            所以 (2F)₁₆ = 47。验算：47 = 32 + 15 = 2 × 16 + 15 ✓。滚动公式的本质就是按权展开的边读边算版。
                        </p>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">代码模板：把字符和值互相转换</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                进制题最容易错在 10 到 15。建议准备两个小工具：数字转字符、字符转数字。
                            </p>
                        </div>
                        <CompareTable
                            headers={['任务', '函数', '示例']}
                            rows={[
                                ['数字转字符', 'digits[x]', '10 -> A'],
                                ['字符转数字', 'valueOf(c)', 'F -> 15'],
                                ['反转字符串', 'reverse', '低位余数变高位输出'],
                            ]}
                        />
                        <Callout icon={Repeat} title="模板不是死背" tone="blue">
                            真题会改变输入形式和目标进制，但核心动作总是“取余反转”或“滚动乘加”。
                        </Callout>
                        <BasePredictionChecks />
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                每道进制题都先判断方向：是从十进制出发，还是要回到十进制。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <TransferCheck
                            prompt={'换个例子：把十六进制 "3A" 转成十进制，再把结果转成二进制。写出两段完整过程。'}
                            hint="先滚动乘加：ans = ans * 16 + 位值；再对结果做短除取余、反转。"
                            answer="(3A)₁₆ = 58；58 = (111010)₂。"
                            steps={[
                                "滚动：'3' → 0×16+3 = 3；'A' → 3×16+10 = 58。",
                                '短除 58：余数依次 0,1,0,1,1,1（58→29→14→7→3→1→0）。',
                                '反转余数得 111010。验算：32+16+8+2 = 58 ✓。',
                            ]}
                        />
                        <MasteryCheck
                            title="C++ L3-14 进制编程离开前检查"
                            description="进制编程最怕“方向搞反、忘了反转、漏了 0”。勾选前先默写两个模板并跑一遍 n = 0。"
                            items={baseMasteryItems}
                        />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>读入十进制 n 和 k，输出 n 的 k 进制表示（n 可能为 0）。</li>
                                <li>读入 k 进制字符串 s，输出它的十进制值。</li>
                                <li>实现十六进制转十进制，支持 A-F。</li>
                                <li>挑战：写 convert(s, a, b) 把 a 进制字符串转成 b 进制（先转十进制中转）。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课进入综合逻辑挑战，把进制、字符串、数组、枚举和模拟混在一起训练。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
