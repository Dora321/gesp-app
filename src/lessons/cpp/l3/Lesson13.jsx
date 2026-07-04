import React, { useMemo, useState } from 'react';
import { ClipboardCheck, Grid3X3, Layers, Search, Triangle } from 'lucide-react';
import CppL3LessonSupport from '../../../components/CppL3LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CodeTracer, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, TransferCheck } from '../CppLessonShell';

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

function TriangleTracer() {
    const n = 4;
    const steps = useMemo(() => {
        const result = [{ active: [0], vars: { i: '–', 空格: '–', 星号: '–' } }];
        for (let i = 1; i <= n; i += 1) {
            const spaces = n - i;
            const stars = 2 * i - 1;
            result.push({
                active: [0, 1, 4, 7],
                vars: { i, 空格: spaces, 星号: stars },
                action: i === 1 ? '画第 1 行' : '下一行',
                row: [`第 ${i} 行`, spaces, stars, `${'·'.repeat(spaces)}${'★'.repeat(stars)}`],
            });
        }
        return result;
    }, []);

    return (
        <CodeTracer
            title="三角形追踪器"
            code={`for (int i = 1; i <= n; i++) {
  for (int j = 1; j <= n - i; j++) {
    cout << " ";
  }
  for (int j = 1; j <= 2 * i - 1; j++) {
    cout << "*";
  }
  cout << endl;
}`}
            varOrder={['i', '空格', '星号']}
            columns={['行', '空格 n-i', '星号 2i-1', '输出（·=空格）']}
            steps={steps}
            hint="点击「画第 1 行」，看空格递减、星号按 2i-1 递增 →"
        />
    );
}

function PatternPredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'n = 4 的居中金字塔，第 3 行有几个星号？'}
                options={['5 个（星号数 2i - 1）', '3 个（星号数就是行号 i）']}
                correctIndex={0}
                explanation="金字塔每行比上一行左右各长一格，星号数是 1、3、5、7 的等差数列，公式 2i - 1。第 3 行是 2×3-1 = 5。行号 i 是左下三角的规律，别直接搬过来。"
                misconception="把左下三角“第 i 行 i 个星号”的规律套到金字塔上。"
            />
            <PredictCheck
                prompt={'镂空正方形规则：i==1 || i==n || j==1 || j==n 时输出 *，否则输出空格。n = 4 时第 2 行是什么？'}
                options={['*··*（两端星号，中间 2 个空格）', '****（每行都是满的）']}
                correctIndex={0}
                explanation="第 2 行 i=2，既不是第一行也不是最后一行，所以只有 j=1 和 j=4 两个边界列输出星号，中间全是空格。"
                misconception="只看行条件不看列条件，把中间行也画满。"
            />
            <PredictCheck
                prompt={'写金字塔时嫌麻烦，把输出空格的循环删掉了，图形会变成什么？'}
                options={['还是金字塔，空格自动补上', '变成左对齐的奇数三角']}
                correctIndex={1}
                explanation="空格是输出内容，不是排版效果。没有前导空格，每行的 1、3、5、7 个星号都从最左边开始，金字塔塌成左对齐三角。"
                misconception="以为控制台会自动居中，空格可以省略。"
            />
        </div>
    );
}

const patternMasteryItems = [
    {
        label: '能推导金字塔星号数为什么是 2i - 1。',
        evidence: '能说出“每行左右各长一格，等差 +2，首项 1”。',
        retryHint: '回到三角形追踪器，逐行看星号列。',
    },
    {
        label: '能写出常见图形的行规律表。',
        evidence: '矩形 n、左三角 i、倒三角 n-i+1、金字塔空格 n-i 星号 2i-1。',
        retryHint: '回到“矩形与三角形”的对照表默写一遍。',
    },
    {
        label: '能用行列坐标条件画镂空图形。',
        evidence: '能解释边框条件 i==1 || i==n || j==1 || j==n 的含义。',
        retryHint: '回到“图形题拆解”的镂空正方形例子。',
    },
    {
        label: '拿到新图形先手写 n = 4 的输出再翻译成循环。',
        evidence: '能展示菱形的逐行空格数、星号数草稿表。',
        retryHint: '重做迁移练习的菱形推导。',
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
            topSupport={<CppL3LessonSupport lessonId={13} />}
            bottomSupport={<CppL3LessonSupport lessonId={13} placement="bottom" />}
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
                        <div>
                            <h4 className="text-xl font-black text-slate-900">输出的不一定是星号：数字图形</h4>
                            <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                                三级真题喜欢把星号换成数字。规律不变，只是把 <code>cout &lt;&lt; "*"</code> 换成和 <code>j</code>（或 <code>i</code>）有关的内容。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-2">
                            <CodeBlock>{`// 第 i 行输出 1 到 i
for (int i = 1; i <= n; i++) {
  for (int j = 1; j <= i; j++) {
    cout << j;
  }
  cout << endl;
}`}</CodeBlock>
                            <CodeBlock>{`n = 4 的输出：
1
12
123
1234`}</CodeBlock>
                        </div>
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
                        <TriangleTracer />
                        <Callout icon={Triangle} title="为什么金字塔星号数是 2i - 1" tone="rose">
                            每往下一行，星号左右各多长一格，也就是每行比上一行多 2 个；首行 1 个。
                            1、3、5、7…… 是首项为 1、公差为 2 的等差数列，第 i 项正是 <code>2i - 1</code>。
                            考场上忘了公式，就默写前三行数一数。
                        </Callout>
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
                        <div>
                            <h4 className="text-xl font-black text-slate-900">进阶思路：用行列坐标条件画镂空图形</h4>
                            <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                                复杂图形还有第二种拆法：把每个位置看成坐标 (i, j)，写一个“这个位置输出什么”的条件。
                                镂空正方形（只画边框）就是典型：在边界上输出星号，其余输出空格。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-2">
                            <CodeBlock>{`for (int i = 1; i <= n; i++) {
  for (int j = 1; j <= n; j++) {
    if (i == 1 || i == n ||
        j == 1 || j == n) {
      cout << "*";
    } else {
      cout << " ";
    }
  }
  cout << endl;
}`}</CodeBlock>
                            <CodeBlock>{`n = 5 的输出：
*****
*   *
*   *
*   *
*****`}</CodeBlock>
                        </div>
                        <CompareTable
                            headers={['拆法', '适用图形', '思考方式']}
                            rows={[
                                ['按行计数', '三角、金字塔、倒三角', '第 i 行先输出几个空格、再输出几个符号'],
                                ['按坐标条件', '镂空、对角线、棋盘', '位置 (i, j) 满足什么条件时输出目标字符'],
                            ]}
                        />
                        <PatternPredictionChecks />
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
                        <TransferCheck
                            prompt={'换个例子：n = 4 的菱形（上半 4 行金字塔 + 下半 3 行倒金字塔）。写出上、下半每行的空格数和星号数公式。'}
                            hint="上半 i 从 1 到 n；下半就是上半去掉最后一行后倒着放，公式相同、i 反着跑。"
                            answer="每行都是：空格 n - i 个、星号 2i - 1 个。上半 i = 1..4（星号 1,3,5,7），下半 i = 3..1（星号 5,3,1）。"
                            steps={[
                                '上半：i=1..4，空格 3,2,1,0，星号 1,3,5,7。',
                                '下半是上半去掉第 4 行后上下翻转：i=3,2,1。',
                                '两段共用同一套公式，只是第二个循环写成 for (int i = n - 1; i >= 1; i--)。',
                            ]}
                        />
                        <MasteryCheck
                            title="C++ L3-13 图形打印离开前检查"
                            description="图形题最怕“看图会，公式一列就错”。勾选前先默写 n = 4 金字塔每行的空格数和星号数。"
                            items={patternMasteryItems}
                        />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>打印 n 行左下三角、倒三角、居中金字塔。</li>
                                <li>打印 n 行数字三角：第 i 行输出 1 到 i。</li>
                                <li>打印 n × n 镂空正方形（只画边框）。</li>
                                <li>挑战：打印完整菱形，并解释上下两段循环的边界。</li>
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
