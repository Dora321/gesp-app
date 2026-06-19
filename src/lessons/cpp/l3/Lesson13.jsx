import React, { useMemo, useState } from 'react';
import { ClipboardCheck, Grid3X3, Layers, Search, Triangle } from 'lucide-react';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '图形模型' },
    { id: 2, title: '矩形与三角形', category: '嵌套循环' },
    { id: 3, title: '空格与对齐', category: '输出控制' },
    { id: 4, title: '图形题拆解', category: '行列规律' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function PatternLab() {
    const [size, setSize] = useState(5);
    const [mode, setMode] = useState('triangle');

    const lines = useMemo(() => {
        const next = [];
        for (let i = 1; i <= size; i++) {
            if (mode === 'square') next.push('*'.repeat(size));
            if (mode === 'triangle') next.push('*'.repeat(i));
            if (mode === 'pyramid') next.push(' '.repeat(size - i) + '*'.repeat(2 * i - 1));
        }
        return next;
    }, [mode, size]);

    return (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Grid3X3 className="text-rose-700" />
                <h3 className="text-xl font-black text-slate-950">图形打印实验台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-rose-100">
                    <label className="block text-sm font-black text-slate-700">尺寸：{size}</label>
                    <input type="range" min="2" max="9" value={size} onChange={(event) => setSize(Number(event.target.value))} className="mt-3 w-full" />
                    <div className="mt-5 grid grid-cols-3 gap-2">
                        {[
                            ['square', '矩形'],
                            ['triangle', '三角'],
                            ['pyramid', '金字塔'],
                        ].map(([id, label]) => (
                            <button
                                key={id}
                                onClick={() => setMode(id)}
                                className={`rounded-lg px-3 py-2 text-sm font-black ${mode === id ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
                <pre className="min-h-48 rounded-xl bg-slate-950 p-5 font-mono text-lg font-black leading-8 text-emerald-300 ring-1 ring-rose-100">
                    {lines.join('\n')}
                </pre>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '图形题外层循环通常控制什么？',
        answer: '行数',
        reason: '一行一行输出，外层循环天然对应第几行。',
    },
    {
        question: '内层循环通常控制什么？',
        answer: '每行输出几个字符',
        reason: '每一行的星号、空格或数字数量由内层循环决定。',
    },
    {
        question: '金字塔为什么先输出空格？',
        answer: '为了对齐',
        reason: '左侧空格让星号整体向右移动，形成居中效果。',
    },
];

export default function CppL3Lesson13() {
    return (
        <CppLessonShell
            lessonNumber={13}
            lessonTitle="图形打印大师"
            lessonSubtitle="用行列规律控制输出形状"
            accent="rose"
            levelTitle="C++ 高阶"
            levelCode="L3"
            sections={sections}
            previousPath="/lesson/3/12"
            nextPath="/lesson/3/14"
            hero={{
                title: '图形打印题考的不是画画，而是行列规律',
                description: '本课用嵌套循环拆解矩形、三角形、金字塔和对齐问题，训练把图案转成每一行的输出规则。',
            }}
            goals={['能用外层循环控制行', '能用内层循环控制每行字符数', '能处理空格对齐和换行']}
            childrenBySection={{
                1: <PatternLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">矩形与三角形：先看每行有几个星号</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                矩形每行数量固定，三角形每行数量随行号变化。行号 <code>i</code> 是发现规律的钥匙。
                            </p>
                        </div>
                        <CompareTable
                            headers={['图形', '第 i 行星号数', '内层循环']}
                            rows={[
                                ['n x n 矩形', 'n', 'j <= n'],
                                ['左下三角', 'i', 'j <= i'],
                                ['倒三角', 'n - i + 1', 'j <= n - i + 1'],
                            ]}
                        />
                        <CodeBlock>{`for (int i = 1; i <= n; i++) {
  for (int j = 1; j <= i; j++) {
    cout << "*";
  }
  cout << endl;
}`}</CodeBlock>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">空格与对齐：空格也是输出内容</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                很多图形题错在忽略空格。金字塔每行先输出若干空格，再输出星号。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`for (int i = 1; i <= n; i++) {
  for (int j = 1; j <= n - i; j++) {
    cout << " ";
  }
  for (int j = 1; j <= 2 * i - 1; j++) {
    cout << "*";
  }
  cout << endl;
}`}</CodeBlock>
                            <StepList steps={[
                                '先确定第 i 行',
                                '输出 n - i 个前导空格',
                                '输出 2 * i - 1 个星号',
                                '每行结束后换行',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">图形题拆解：写出前三行和最后一行</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                不要盯着整张图看。把第 1 行、第 2 行、第 3 行、第 n 行分别写出来，规律通常就出现了。
                            </p>
                        </div>
                        <Callout icon={Layers} title="拆解模板" tone="rose">
                            <ul className="space-y-2">
                                <li>第 i 行前面有多少空格？</li>
                                <li>第 i 行中间有多少目标字符？</li>
                                <li>每行结尾是否要多余空格？</li>
                            </ul>
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                图形题请先手写 n = 4 的输出，再把每行规律翻译成循环。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>打印 n 行左下三角。</li>
                                <li>打印 n 行倒三角。</li>
                                <li>打印 n 行居中金字塔。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课做进制转换编程专场，把前面学过的进制知识真正写成代码。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
