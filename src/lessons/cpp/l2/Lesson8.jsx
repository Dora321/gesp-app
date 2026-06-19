import React, { useMemo, useState } from 'react';
import { Calculator, ClipboardCheck, FunctionSquare, Ruler, Sigma, Triangle } from 'lucide-react';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '数学工具' },
    { id: 2, title: '常用函数', category: 'cmath 基础' },
    { id: 3, title: '类型与精度', category: '易错点' },
    { id: 4, title: '几何应用', category: '实战题型' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function MathToolLab() {
    const [x, setX] = useState(12);
    const [y, setY] = useState(5);

    const result = useMemo(() => ({
        sqrt: Math.sqrt(x).toFixed(3),
        pow: Math.pow(x, 2).toFixed(0),
        abs: Math.abs(x - y),
        ceil: Math.ceil(x / y),
        floor: Math.floor(x / y),
    }), [x, y]);

    return (
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Calculator className="text-amber-700" />
                <h3 className="text-xl font-black text-slate-950">cmath 工具实验台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-amber-100">
                    <label className="block text-sm font-black text-slate-700">x = {x}</label>
                    <input
                        type="range"
                        min="1"
                        max="50"
                        value={x}
                        onChange={(event) => setX(Number(event.target.value))}
                        className="mt-3 w-full"
                    />
                    <label className="mt-5 block text-sm font-black text-slate-700">y = {y}</label>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={y}
                        onChange={(event) => setY(Number(event.target.value))}
                        className="mt-3 w-full"
                    />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                    {[
                        [`sqrt(x)`, result.sqrt],
                        [`pow(x, 2)`, result.pow],
                        [`abs(x - y)`, result.abs],
                        [`ceil(x / y)`, result.ceil],
                        [`floor(x / y)`, result.floor],
                    ].map(([name, value]) => (
                        <div key={name} className="rounded-xl bg-white p-4 ring-1 ring-amber-100">
                            <div className="font-mono text-sm font-black text-amber-700">{name}</div>
                            <div className="mt-2 text-2xl font-black text-slate-950">{value}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '使用 sqrt 前要包含哪个头文件？',
        answer: '#include <cmath>',
        reason: 'sqrt、pow、ceil、floor 等数学函数来自 cmath。',
    },
    {
        question: 'pow(2, 10) 的返回值类型通常是什么？',
        answer: '浮点类型',
        reason: 'pow 返回 double，整数题里经常需要注意转换和精度。',
    },
    {
        question: '向上取整应该用哪个函数？',
        answer: 'ceil',
        reason: 'ceil(2.1) 得到 3，floor(2.9) 得到 2。',
    },
];

export default function CppL2Lesson8() {
    return (
        <CppLessonShell
            lessonNumber={8}
            lessonTitle="数学工具箱 (cmath)"
            lessonSubtitle="用标准库函数减少重复造轮子"
            accent="amber"
            sections={sections}
            previousPath="/lesson/2/7"
            nextPath="/lesson/2/9"
            hero={{
                title: '会用数学工具，代码会短一截，也稳一截',
                description: '平方根、幂、绝对值、上下取整是二级常见工具。关键不是背函数名，而是知道什么时候能用，什么时候要小心类型和精度。',
            }}
            goals={['会引入 cmath 并调用常用函数', '能区分 ceil 和 floor', '知道 pow/sqrt 的浮点精度风险']}
            childrenBySection={{
                1: <MathToolLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">常用函数：先会读，再会用</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                <code>cmath</code> 里的函数能帮我们处理常见数学计算。考试里更常见的是阅读程序输出，所以要知道每个函数的含义。
                            </p>
                        </div>
                        <CompareTable
                            headers={['函数', '含义', '例子']}
                            rows={[
                                ['sqrt(x)', '平方根', 'sqrt(16) 得到 4'],
                                ['pow(a, b)', 'a 的 b 次方', 'pow(2, 3) 得到 8'],
                                ['abs(x)', '绝对值', 'abs(-7) 得到 7'],
                                ['ceil(x)', '向上取整', 'ceil(3.2) 得到 4'],
                                ['floor(x)', '向下取整', 'floor(3.8) 得到 3'],
                            ]}
                        />
                        <CodeBlock>{`#include <iostream>
#include <cmath>
using namespace std;

int main() {
  cout << sqrt(25) << endl;
  cout << pow(2, 5) << endl;
  cout << ceil(7.0 / 3) << endl;
  return 0;
}`}</CodeBlock>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">类型与精度：数学函数不是全都返回 int</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                <code>sqrt</code>、<code>pow</code>、<code>ceil</code>、<code>floor</code> 常和 double 打交道。整数题里要格外注意输出格式和强制转换。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-2">
                            <CodeBlock>{`double a = sqrt(2);
cout << a;        // 约等于 1.41421

int b = sqrt(16);
cout << b;        // 4`}</CodeBlock>
                            <CodeBlock>{`int x = pow(10, 2);  // 通常可以

// 大数或严格整数判断时，不要盲信浮点
// 更稳做法：用循环或整数运算验证`}</CodeBlock>
                        </div>
                        <Callout icon={FunctionSquare} title="稳妥原则" tone="amber">
                            如果题目要求精确整数结果，优先用整数运算；如果必须用 <code>pow</code> 或 <code>sqrt</code>，要检查转换后的值是否符合题意。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">几何应用：距离、圆、三角形</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                <code>cmath</code> 常出现在几何题中，例如两点距离、圆面积、勾股定理。先把公式翻译成代码，再处理输入输出。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`double x1, y1, x2, y2;
cin >> x1 >> y1 >> x2 >> y2;

double dx = x1 - x2;
double dy = y1 - y2;
double d = sqrt(dx * dx + dy * dy);

cout << d;`}</CodeBlock>
                            <StepList steps={[
                                '读入两个点的坐标',
                                '分别计算横向差和纵向差',
                                '平方后相加',
                                '开平方得到距离',
                            ]} />
                        </div>
                        <Callout icon={Triangle} title="公式翻译" tone="emerald">
                            数学公式不要整行硬塞进 cout。先拆成 <code>dx</code>、<code>dy</code>、<code>d</code>，中间结果更容易调试。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                这一课的目标是把数学函数用得准确，不是把所有公式背完。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>输入一个整数 n，输出它的平方根，保留 3 位小数。</li>
                                <li>输入 a 和 b，输出 <code>a</code> 的 <code>b</code> 次方。</li>
                                <li>输入两个点坐标，计算两点距离，并解释为什么要用 <code>sqrt</code>。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Ruler} title="下一课衔接" tone="blue">
                            下一课进入质数判断。今天的 <code>sqrt(n)</code> 会直接派上用场：判断因数时只需要枚举到平方根附近。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
