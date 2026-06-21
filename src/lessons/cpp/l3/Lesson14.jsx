import React, { useMemo, useState } from 'react';
import { Binary, ClipboardCheck, Database, Repeat, Search } from 'lucide-react';
import CppL3LessonSupport from '../../../components/CppL3LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CodeTracer, CompareTable, MiniQuiz } from '../CppLessonShell';

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

export default function CppL3Lesson14() {
    return (
        <CppLessonShell
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
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>读入十进制 n 和 k，输出 n 的 k 进制表示。</li>
                                <li>读入 k 进制字符串 s，输出它的十进制值。</li>
                                <li>实现十六进制转十进制，支持 A-F。</li>
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
