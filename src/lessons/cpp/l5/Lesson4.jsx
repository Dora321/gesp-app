import React, { useMemo, useState } from 'react';
import { ClipboardCheck, DivideCircle, Search, ShieldCheck, XCircle } from 'lucide-react';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '竖式扩展' },
    { id: 2, title: '高精乘低精', category: '乘法模板' },
    { id: 3, title: '高精除低精', category: '除法模板' },
    { id: 4, title: '边界处理', category: '前导零与余数' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function multiplyStringByInt(value, multiplier) {
    let carry = 0;
    let answer = '';
    for (let i = value.length - 1; i >= 0; i--) {
        const product = Number(value[i]) * multiplier + carry;
        answer = String(product % 10) + answer;
        carry = Math.floor(product / 10);
    }
    while (carry > 0) {
        answer = String(carry % 10) + answer;
        carry = Math.floor(carry / 10);
    }
    return answer.replace(/^0+(?=\d)/, '');
}

function divideStringByInt(value, divisor) {
    let remainder = 0;
    let answer = '';
    for (const digit of value) {
        const current = remainder * 10 + Number(digit);
        answer += String(Math.floor(current / divisor));
        remainder = current % divisor;
    }
    return {
        quotient: answer.replace(/^0+(?=\d)/, ''),
        remainder,
    };
}

function BigMulDivLab() {
    const [value, setValue] = useState('123456789123456789');
    const [factor, setFactor] = useState(12);
    const cleanValue = value.replace(/\D/g, '') || '0';
    const product = useMemo(() => multiplyStringByInt(cleanValue, factor), [cleanValue, factor]);
    const division = useMemo(() => divideStringByInt(cleanValue, factor), [cleanValue, factor]);

    return (
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <DivideCircle className="text-amber-700" />
                <h3 className="text-xl font-black text-slate-950">高精乘除实验台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-amber-100">
                    <label className="block text-sm font-black text-slate-700">大整数 A</label>
                    <input value={value} onChange={(event) => setValue(event.target.value)} className="mt-2 w-full rounded-lg border border-amber-100 px-3 py-2 font-mono text-sm font-bold outline-none focus:border-amber-400" />
                    <label className="mt-4 block text-sm font-black text-slate-700">低精整数 b = {factor}</label>
                    <input type="range" min="2" max="30" value={factor} onChange={(event) => setFactor(Number(event.target.value))} className="mt-3 w-full" />
                </div>
                <div className="grid gap-3">
                    <div className="rounded-xl bg-white p-4 ring-1 ring-amber-100">
                        <div className="text-xs font-black text-slate-500">A * b</div>
                        <div className="mt-2 break-all font-mono text-sm font-black text-amber-800">{product}</div>
                    </div>
                    <div className="rounded-xl bg-white p-4 ring-1 ring-amber-100">
                        <div className="text-xs font-black text-slate-500">A / b</div>
                        <div className="mt-2 break-all font-mono text-sm font-black text-emerald-700">
                            {division.quotient} 余 {division.remainder}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '高精乘低精从哪一位开始？',
        answer: '最低位',
        reason: '和加法一样，从个位开始处理进位。',
    },
    {
        question: '高精除低精从哪一位开始？',
        answer: '最高位',
        reason: '除法竖式需要从左到右维护当前余数。',
    },
    {
        question: '高精除法要保存什么？',
        answer: '商和余数',
        reason: '当前余数会参与下一位计算，最终也可能是题目答案。',
    },
];

export default function CppL5Lesson4() {
    return (
        <CppLessonShell
            lessonNumber={4}
            lessonTitle="超级计算器 (高精乘除)"
            lessonSubtitle="处理大整数乘低精和除低精"
            accent="amber"
            levelTitle="C++ 专家"
            levelCode="L5"
            sections={sections}
            previousPath="/lesson/5/3"
            nextPath="/lesson/5/5"
            hero={{
                title: '乘法继续从低位进位，除法则要从高位维护余数',
                description: '本课先掌握最常考、最稳定的高精乘低精和高精除低精，为后续数论综合题打基础。',
            }}
            goals={['能写出高精乘低精模板', '能写出高精除低精模板', '能处理前导零、进位和余数']}
            childrenBySection={{
                1: <BigMulDivLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">高精乘低精：逐位乘，再处理进位</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                高精乘低精指一个超长整数乘一个普通整数。每一位乘 b，再加上上一位带来的进位。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`vector<int> mul(vector<int> a, int b) {
  vector<int> c;
  int carry = 0;
  for (int i = 0; i < a.size() || carry; i++) {
    if (i < a.size()) carry += a[i] * b;
    c.push_back(carry % 10);
    carry /= 10;
  }
  while (c.size() > 1 && c.back() == 0) c.pop_back();
  return c;
}`}</CodeBlock>
                            <StepList steps={[
                                '从最低位开始乘',
                                '当前乘积加上 carry',
                                '当前位保留 carry % 10',
                                'carry / 10 进入下一位',
                            ]} />
                        </div>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">高精除低精：从高位到低位维护余数</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                除法和加减乘不同，要从最高位开始。当前值等于上一轮余数乘 10 加当前位。
                            </p>
                        </div>
                        <CodeBlock>{`vector<int> div(vector<int> a, int b, int &remainder) {
  vector<int> c;
  remainder = 0;
  for (int i = a.size() - 1; i >= 0; i--) {
    remainder = remainder * 10 + a[i];
    c.push_back(remainder / b);
    remainder %= b;
  }
  reverse(c.begin(), c.end());
  while (c.size() > 1 && c.back() == 0) c.pop_back();
  return c;
}`}</CodeBlock>
                        <Callout icon={ShieldCheck} title="存储方向提醒" tone="amber">
                            如果数组是反向存储，除法遍历时要从 <code>a.size() - 1</code> 走到 0。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">边界处理：0、前导零、除数不能为 0</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                高精度模板最容易在边界上翻车。删除前导零时，要保证答案至少保留一位。
                            </p>
                        </div>
                        <CompareTable
                            headers={['边界', '风险', '处理方式']}
                            rows={[
                                ['结果为 0', '删空数组', '至少保留一个 0'],
                                ['乘数为 0', '进位逻辑异常', '直接输出 0 或统一去前导零'],
                                ['除数为 0', '非法运算', '题目通常不会给，仍要有意识'],
                            ]}
                        />
                        <Callout icon={XCircle} title="当前范围" tone="blue">
                            本课先学“高精乘低精”和“高精除低精”。高精乘高精会在后续进阶题里再展开。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                高精乘除题请务必用小数字对照竖式，再用超长数字测边界。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>读入大整数 A 和整数 b，输出 A*b。</li>
                                <li>读入大整数 A 和整数 b，输出 A/b 的商和余数。</li>
                                <li>实现大整数阶乘 n!，其中 n 不超过 100。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课做数论综合实战，把筛法、GCD、LCM 和高精度放到同一类题里判断使用。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
