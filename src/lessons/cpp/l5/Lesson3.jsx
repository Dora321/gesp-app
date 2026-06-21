import React, { useMemo, useState } from 'react';
import { ClipboardCheck, Calculator, Search, ShieldAlert, PlusCircle } from 'lucide-react';
import CppL5LessonSupport from '../../../components/CppL5LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '大整数模型' },
    { id: 2, title: '高精度表示', category: '字符串与数组' },
    { id: 3, title: '高精加法', category: '进位模板' },
    { id: 4, title: '高精减法', category: '借位模板' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function addStrings(a, b) {
    let i = a.length - 1;
    let j = b.length - 1;
    let carry = 0;
    let answer = '';

    while (i >= 0 || j >= 0 || carry) {
        const x = i >= 0 ? Number(a[i]) : 0;
        const y = j >= 0 ? Number(b[j]) : 0;
        const sum = x + y + carry;
        answer = String(sum % 10) + answer;
        carry = Math.floor(sum / 10);
        i--;
        j--;
    }

    return answer;
}

function BigAddLab() {
    const [a, setA] = useState('987654321987654321');
    const [b, setB] = useState('123456789123456789');
    const cleanA = a.replace(/\D/g, '') || '0';
    const cleanB = b.replace(/\D/g, '') || '0';
    const sum = useMemo(() => addStrings(cleanA, cleanB), [cleanA, cleanB]);

    return (
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Calculator className="text-amber-700" />
                <h3 className="text-xl font-black text-slate-950">高精加法实验台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-amber-100">
                    <label className="block text-sm font-black text-slate-700">大整数 A</label>
                    <input value={a} onChange={(event) => setA(event.target.value)} className="mt-2 w-full rounded-lg border border-amber-100 px-3 py-2 font-mono text-sm font-bold outline-none focus:border-amber-400" />
                    <label className="mt-4 block text-sm font-black text-slate-700">大整数 B</label>
                    <input value={b} onChange={(event) => setB(event.target.value)} className="mt-2 w-full rounded-lg border border-amber-100 px-3 py-2 font-mono text-sm font-bold outline-none focus:border-amber-400" />
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-amber-100">
                    <div className="text-sm font-black text-slate-500">A + B =</div>
                    <div className="mt-3 break-all rounded-lg bg-slate-950 p-4 font-mono text-lg font-black text-amber-200">
                        {sum}
                    </div>
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">逐位从右往左相加，超过 9 就向前进位。</p>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '高精度为什么常反向存储？',
        answer: '方便从低位开始算',
        reason: '加减法从个位开始，反向数组让下标从 0 往后走。',
    },
    {
        question: '加法结束后还要检查什么？',
        answer: '最后的进位',
        reason: '例如 999 + 1 最后会多出一个最高位 1。',
    },
    {
        question: '减法前通常要先判断什么？',
        answer: '谁更大',
        reason: '如果 a < b，需要处理负号或交换后输出负号。',
    },
];

export default function CppL5Lesson3() {
    return (
        <CppLessonShell
            lessonNumber={3}
            lessonTitle="超级计算器 (高精加减)"
            lessonSubtitle="把大整数拆成一位一位处理"
            accent="amber"
            levelTitle="C++ 专家"
            levelCode="L5"
            sections={sections}
            previousPath="/lesson/5/2"
            nextPath="/lesson/5/4"
            topSupport={<CppL5LessonSupport lessonId={3} />}
            bottomSupport={<CppL5LessonSupport lessonId={3} placement="bottom" />}
            hero={{
                title: '高精度的核心不是更大的类型，而是自己模拟竖式计算',
                description: '本课学习如何用字符串和数组表示超长整数，完成加法进位和减法借位。',
            }}
            goals={['能解释高精度整数的存储方式', '能写出高精加法模板', '能处理高精减法的借位和前导零']}
            childrenBySection={{
                1: <BigAddLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">高精度表示：字符串读入，数组计算</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                当数字超过 <code>long long</code> 范围时，可以把它当成字符串读入，再把每一位拆到数组里。
                            </p>
                        </div>
                        <CodeBlock>{`string s;
cin >> s;

vector<int> a;
for (int i = s.size() - 1; i >= 0; i--) {
  a.push_back(s[i] - '0');
}`}</CodeBlock>
                        <Callout icon={PlusCircle} title="为什么反向存" tone="amber">
                            个位存在 <code>a[0]</code>，十位存在 <code>a[1]</code>，这样进位时下标自然向后移动。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">高精加法：逐位相加，维护 carry</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                和小学竖式一样：当前位等于两数当前位加进位，个位留下，十位进到下一位。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`vector<int> add(vector<int> a, vector<int> b) {
  vector<int> c;
  int carry = 0;
  for (int i = 0; i < a.size() || i < b.size() || carry; i++) {
    int sum = carry;
    if (i < a.size()) sum += a[i];
    if (i < b.size()) sum += b[i];
    c.push_back(sum % 10);
    carry = sum / 10;
  }
  return c;
}`}</CodeBlock>
                            <StepList steps={[
                                '从最低位开始算',
                                '缺失的高位按 0 处理',
                                'sum % 10 是当前位',
                                'sum / 10 是下一位进位',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">高精减法：不够减就向高位借 1</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                下面模板默认 <code>a &gt;= b</code>。真实题目要先比较大小，必要时交换并输出负号。
                            </p>
                        </div>
                        <CodeBlock>{`vector<int> sub(vector<int> a, vector<int> b) {
  vector<int> c;
  int borrow = 0;
  for (int i = 0; i < a.size(); i++) {
    int x = a[i] - borrow;
    int y = i < b.size() ? b[i] : 0;
    if (x < y) {
      x += 10;
      borrow = 1;
    } else {
      borrow = 0;
    }
    c.push_back(x - y);
  }
  while (c.size() > 1 && c.back() == 0) c.pop_back();
  return c;
}`}</CodeBlock>
                        <Callout icon={ShieldAlert} title="两个必要检查" tone="amber">
                            减法前比较大小；减法后删除前导零，但至少保留一位 0。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                高精度题最吃细节。建议每写一步就用短数字手推验证。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>读入两个非负大整数，输出它们的和。</li>
                                <li>读入两个非负大整数，输出大数减小数。</li>
                                <li>扩展减法：支持输出负数结果。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课学习高精乘除，继续沿用“数组模拟竖式”的思路。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
