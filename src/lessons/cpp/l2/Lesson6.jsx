import React, { useMemo, useState } from 'react';
import { AlertTriangle, ClipboardCheck, Grid3X3, Layers3, PencilRuler } from 'lucide-react';
import CppL2LessonSupport from '../../../components/CppL2LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CodeTracer, CompareTable, MiniQuiz } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '图形问题' },
    { id: 2, title: '矩形与三角形', category: '基础图形' },
    { id: 3, title: '空格控制', category: '对齐关键' },
    { id: 4, title: '反推循环', category: '解题方法' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function PatternLab() {
    const [size, setSize] = useState(5);
    const [type, setType] = useState('right');

    const lines = useMemo(() => {
        const result = [];
        for (let i = 1; i <= size; i += 1) {
            if (type === 'square') result.push('*'.repeat(size));
            if (type === 'right') result.push('*'.repeat(i));
            if (type === 'align') result.push(`${' '.repeat(size - i)}${'*'.repeat(i)}`);
        }
        return result;
    }, [size, type]);

    return (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Grid3X3 className="text-emerald-700" />
                <h3 className="text-xl font-black text-slate-950">图形打印实验台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-emerald-100">
                    <label className="block text-sm font-black text-slate-700">图形尺寸 {size}</label>
                    <input
                        type="range"
                        min="2"
                        max="8"
                        value={size}
                        onChange={(event) => setSize(Number(event.target.value))}
                        className="mt-3 w-full"
                    />
                    <div className="mt-5 grid gap-2">
                        {[
                            ['square', '矩形'],
                            ['right', '左三角'],
                            ['align', '右对齐三角'],
                        ].map(([value, label]) => (
                            <button
                                key={value}
                                onClick={() => setType(value)}
                                className={`rounded-lg px-4 py-3 text-sm font-black transition ${type === value ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
                <pre className="min-h-64 rounded-xl bg-slate-950 p-6 font-mono text-xl font-black leading-8 text-green-400 shadow-inner">
                    {lines.join('\n')}
                </pre>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '第 i 行打印 i 个星号，是什么图形？',
        answer: '左下三角',
        reason: '每往下一行，星号数量增加 1。',
    },
    {
        question: '右对齐三角多了哪个控制量？',
        answer: '前导空格',
        reason: '先打印 n - i 个空格，再打印 i 个星号。',
    },
    {
        question: '每行结束必须做什么？',
        answer: '输出换行',
        reason: '没有 endl 或换行符，所有字符会连成一行。',
    },
];

function PyramidTracer() {
    const n = 5;
    const steps = useMemo(() => {
        const result = [{ active: [0], vars: { i: '–', 空格: '–', 星号: '–' } }];
        for (let i = 1; i <= n; i += 1) {
            const spaces = n - i;
            const stars = i;
            result.push({
                active: [1, 2, 5, 8],
                vars: { i, 空格: spaces, 星号: stars },
                action: i === 1 ? '画第 1 行' : '下一行',
                row: [`第 ${i} 行`, spaces, stars, `${'·'.repeat(spaces)}${'★'.repeat(stars)}`],
            });
        }
        return result;
    }, []);

    return (
        <CodeTracer
            title="金字塔追踪器"
            code={`int n = 5;
for (int i = 1; i <= n; i++) {
  for (int s = 1; s <= n - i; s++) {
    cout << " ";
  }
  for (int j = 1; j <= i; j++) {
    cout << "*";
  }
  cout << endl;
}`}
            varOrder={['i', '空格', '星号']}
            columns={['行', '空格 n-i', '星号 i', '输出（·=空格）']}
            steps={steps}
            hint="点击「画第 1 行」，看每行空格与星号怎么算 →"
        />
    );
}

export default function CppL2Lesson6() {
    return (
        <CppLessonShell
            lessonNumber={6}
            lessonTitle="图形打印实战"
            lessonSubtitle="从看图写循环，到按行反推规则"
            accent="emerald"
            sections={sections}
            previousPath="/lesson/2/5"
            nextPath="/lesson/2/7"
            topSupport={<CppL2LessonSupport lessonId={6} />}
            bottomSupport={<CppL2LessonSupport lessonId={6} placement="bottom" />}
            hero={{
                title: '图形题不是靠猜，是一行一行拆出来的',
                description: '二级图形打印的核心不是星号，而是“第 i 行有几个空格、几个符号”。能把图形拆成行规则，代码就自然出来了。',
            }}
            goals={['能写矩形和基础三角形', '能用空格控制右对齐', '能从目标图形反推循环边界']}
            childrenBySection={{
                1: <PatternLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">矩形最简单：行数固定，列数固定</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                矩形题是图形打印的起点。外层循环控制行，内层循环控制每行输出几个字符。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-2">
                            <CodeBlock>{`for (int i = 1; i <= 4; i++) {
  for (int j = 1; j <= 6; j++) {
    cout << "*";
  }
  cout << endl;
}`}</CodeBlock>
                            <CodeBlock>{`******
******
******
******`}</CodeBlock>
                        </div>
                        <Callout icon={Layers3} title="三角形的变化点" tone="emerald">
                            矩形每行列数一样；三角形每行列数和 i 有关。比如第 i 行打印 i 个星号，就是最常见的左三角。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">空格也是输出内容，不是空气</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                右对齐、金字塔、菱形都靠空格撑位置。考试里很多同学错在只数星号，不数空格。
                            </p>
                        </div>
                        <PyramidTracer />
                        <Callout icon={AlertTriangle} title="调试技巧" tone="amber">
                            看不清空格时，可以临时把空格输出成点号 <code>.</code>，确认对齐后再改回空格。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">反推循环：先列前 3 行，再找公式</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                看到复杂图形时，不要一上来写代码。先做表格：第几行、空格数、符号数，再把表格翻译成循环。
                            </p>
                        </div>
                        <CompareTable
                            headers={['行 i', '空格数', '星号数']}
                            rows={[
                                ['1', 'n - 1', '1'],
                                ['2', 'n - 2', '2'],
                                ['3', 'n - 3', '3'],
                                ['i', 'n - i', 'i'],
                            ]}
                        />
                        <Callout icon={PencilRuler} title="图形题三问" tone="blue">
                            <ol className="space-y-2">
                                <li>一共有几行？</li>
                                <li>第 i 行先输出几个空格？</li>
                                <li>第 i 行再输出几个符号？</li>
                            </ol>
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                作业要求不是只写出图形，而是能解释每个循环变量的作用。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>输入 n，输出 n 行 n 列的正方形。</li>
                                <li>输入 n，输出左下三角：第 i 行有 i 个 <code>*</code>。</li>
                                <li>输入 n，输出右对齐三角，并用注释说明空格循环。</li>
                            </ul>
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
