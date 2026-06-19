import React, { useMemo, useState } from 'react';
import { ClipboardCheck, Grid3X3, Rows3, Search, Table2 } from 'lucide-react';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '矩阵模型' },
    { id: 2, title: '二维数组声明', category: '行与列' },
    { id: 3, title: '遍历矩阵', category: '双重循环' },
    { id: 4, title: '行列统计', category: '应用模板' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function MatrixLab() {
    const [rows, setRows] = useState(3);
    const [cols, setCols] = useState(4);

    const matrix = useMemo(() => {
        return Array.from({ length: rows }, (_, i) => Array.from({ length: cols }, (_, j) => i * cols + j + 1));
    }, [cols, rows]);

    return (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Grid3X3 className="text-indigo-700" />
                <h3 className="text-xl font-black text-slate-950">矩阵实验台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <label className="block text-sm font-black text-slate-700">行数 n：{rows}</label>
                    <input type="range" min="2" max="5" value={rows} onChange={(event) => setRows(Number(event.target.value))} className="mt-3 w-full" />
                    <label className="mt-5 block text-sm font-black text-slate-700">列数 m：{cols}</label>
                    <input type="range" min="2" max="6" value={cols} onChange={(event) => setCols(Number(event.target.value))} className="mt-3 w-full" />
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
                        {matrix.flatMap((row, i) => row.map((value, j) => (
                            <div key={`${i}-${j}`} className="rounded-lg bg-indigo-50 px-3 py-2 text-center font-mono text-sm font-black text-indigo-800">
                                a[{i}][{j}]<br />{value}
                            </div>
                        )))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '二维数组 a[n][m] 有几个方向？',
        answer: '行和列',
        reason: '第一个下标通常表示行，第二个下标通常表示列。',
    },
    {
        question: '遍历 n 行 m 列需要几层循环？',
        answer: '两层',
        reason: '外层扫行，内层扫列。',
    },
    {
        question: 'a[i][j] 表示什么？',
        answer: '第 i 行第 j 列元素',
        reason: '和一维数组一样，下标通常从 0 开始。',
    },
];

export default function CppL4Lesson8() {
    return (
        <CppLessonShell
            lessonNumber={8}
            lessonTitle="二维数组与矩阵"
            lessonSubtitle="用行和列保存表格数据"
            accent="indigo"
            levelTitle="C++ 资深"
            levelCode="L4"
            sections={sections}
            previousPath="/lesson/4/7"
            nextPath="/lesson/4/9"
            hero={{
                title: '二维数组是一张表：第一个下标管行，第二个下标管列',
                description: '本课把一维数组升级成矩阵模型，学习声明、读入、遍历、行列统计和常见边界。',
            }}
            goals={['能声明和读入二维数组', '能用双重循环遍历矩阵', '能完成行和列的统计任务']}
            childrenBySection={{
                1: <MatrixLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">二维数组声明：准备 n 行 m 列的格子</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                二维数组适合保存表格、棋盘、地图和矩阵。声明时要给出最大行数和最大列数。
                            </p>
                        </div>
                        <CodeBlock>{`int a[105][105];
int n, m;
cin >> n >> m;`}</CodeBlock>
                        <CompareTable
                            headers={['写法', '含义', '常见场景']}
                            rows={[
                                ['a[i][j]', '第 i 行第 j 列', '矩阵元素'],
                                ['n', '实际行数', '外层循环范围'],
                                ['m', '实际列数', '内层循环范围'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">遍历矩阵：外层行，内层列</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                二维数组的遍历通常是两层循环：先确定当前行，再扫这一行的每一列。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`for (int i = 0; i < n; i++) {
  for (int j = 0; j < m; j++) {
    cin >> a[i][j];
  }
}

for (int i = 0; i < n; i++) {
  for (int j = 0; j < m; j++) {
    cout << a[i][j] << " ";
  }
  cout << endl;
}`}</CodeBlock>
                            <StepList steps={[
                                '外层 i 控制行',
                                '内层 j 控制列',
                                '每行输出结束后换行',
                                '循环边界分别是 n 和 m',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">行列统计：把二维问题拆成多次一维统计</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                求某一行的和，就是固定行号扫列；求某一列的和，就是固定列号扫行。
                            </p>
                        </div>
                        <CodeBlock>{`// 第 r 行的和
int rowSum = 0;
for (int j = 0; j < m; j++) {
  rowSum += a[r][j];
}

// 第 c 列的和
int colSum = 0;
for (int i = 0; i < n; i++) {
  colSum += a[i][c];
}`}</CodeBlock>
                        <Callout icon={Rows3} title="先固定一个下标" tone="indigo">
                            行统计固定 <code>i</code>，列统计固定 <code>j</code>。别把行列循环范围写反。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                做二维数组题时，先画一个小矩阵，标出行号和列号，再写循环。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>读入 n 行 m 列矩阵，原样输出。</li>
                                <li>输出每一行的和。</li>
                                <li>输出主对角线元素之和。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课进入冒泡排序。排序会回到一维数组，但更强调交换和比较过程。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
