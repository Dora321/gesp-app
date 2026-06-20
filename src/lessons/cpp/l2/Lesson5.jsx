import React, { useMemo, useState } from 'react';
import { AlertTriangle, Blocks, ClipboardCheck, Repeat2, Target } from 'lucide-react';
import CppLessonShell, { Callout, CodeBlock, CodeTracer, CompareTable, MiniQuiz } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '双层循环' },
    { id: 2, title: '执行顺序', category: '核心模型' },
    { id: 3, title: '变量分工', category: '边界控制' },
    { id: 4, title: '典型题型', category: '考试场景' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function LoopTraceLab() {
    const [rows, setRows] = useState(3);
    const [cols, setCols] = useState(4);

    const cells = useMemo(() => {
        const result = [];
        for (let i = 1; i <= rows; i += 1) {
            for (let j = 1; j <= cols; j += 1) {
                result.push(`${i},${j}`);
            }
        }
        return result;
    }, [rows, cols]);

    return (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Repeat2 className="text-indigo-700" />
                <h3 className="text-xl font-black text-slate-950">双层循环执行实验</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <label className="block text-sm font-black text-slate-700">外层循环 i：行数 {rows}</label>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        value={rows}
                        onChange={(event) => setRows(Number(event.target.value))}
                        className="mt-3 w-full"
                    />
                    <label className="mt-5 block text-sm font-black text-slate-700">内层循环 j：每行次数 {cols}</label>
                    <input
                        type="range"
                        min="1"
                        max="6"
                        value={cols}
                        onChange={(event) => setCols(Number(event.target.value))}
                        className="mt-3 w-full"
                    />
                    <div className="mt-5 rounded-lg bg-slate-950 p-4 font-mono text-sm text-green-400">
                        总执行次数：{rows} * {cols} = {rows * cols}
                    </div>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <div
                        className="grid gap-2"
                        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
                    >
                        {cells.map((cell, index) => (
                            <div key={`${cell}-${index}`} className="rounded-lg bg-indigo-600 px-2 py-3 text-center font-mono text-sm font-black text-white">
                                {cell}
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
        question: '外层循环跑 3 次，内层跑 5 次，总共输出几次？',
        answer: '15 次',
        reason: '内层每轮都会完整执行，次数相乘：3 * 5。',
    },
    {
        question: '打印矩形时，谁通常控制行？',
        answer: '外层循环',
        reason: '每进入一次外层循环，就准备打印新的一行。',
    },
    {
        question: '内层循环结束后，下一步通常做什么？',
        answer: '换行',
        reason: '否则所有字符会挤在同一行，图形结构就乱了。',
    },
];

function NestedLoopTracer() {
    const steps = useMemo(() => {
        const result = [{ active: [0], vars: { i: '–', j: '–' } }];
        let stepNo = 0;
        for (let i = 1; i <= 3; i += 1) {
            for (let j = 1; j <= 4; j += 1) {
                stepNo += 1;
                const rowEnd = j === 4;
                result.push({
                    active: rowEnd ? [0, 1, 2, 4] : [0, 1, 2],
                    vars: { i, j },
                    action: stepNo === 1 ? '开始' : '下一步',
                    row: [stepNo, i, j, rowEnd ? `${i},${j}  ⏎ 换行` : `${i},${j}`],
                });
            }
        }
        return result;
    }, []);

    return (
        <CodeTracer
            title="嵌套循环追踪器"
            code={`for (int i = 1; i <= 3; i++) {
  for (int j = 1; j <= 4; j++) {
    cout << i << "," << j << " ";
  }
  cout << endl;
}`}
            varOrder={['i', 'j']}
            columns={['步', 'i', 'j', '输出']}
            steps={steps}
            hint="点击「开始」，看 i 不动、j 跑完一整轮的执行顺序 →"
        />
    );
}

export default function CppL2Lesson5() {
    return (
        <CppLessonShell
            lessonNumber={5}
            lessonTitle="嵌套循环基础"
            lessonSubtitle="L2 核心能力：把二维过程拆成行与列"
            accent="indigo"
            sections={sections}
            previousPath="/lesson/2/4"
            nextPath="/lesson/2/6"
            hero={{
                title: '循环里面再放循环，题目就从“一排”变成“一片”',
                description: '图形打印、乘法表、二维枚举都离不开嵌套循环。今天先不追求花活，把“外层控制轮次，内层完成每轮细节”这件事讲透。',
            }}
            goals={['能手动追踪 i 和 j 的变化', '能计算双层循环总次数', '能区分外层控制行、内层控制列']}
            childrenBySection={{
                1: <LoopTraceLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">执行顺序：外层一次，内层跑完一整轮</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                不要把两个 for 看成同时变化。程序会先固定一个 i，然后让 j 从头跑到尾，再回到外层让 i 变成下一个值。
                            </p>
                        </div>
                        <NestedLoopTracer />
                        <Callout icon={AlertTriangle} title="高频误区" tone="amber">
                            内层变量每次进入内层循环都会重新初始化。看到 <code>for (int j = 1; ...)</code>，就要意识到 j 不是接着上一行继续数。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">变量分工：i 管第几行，j 管这一行第几个</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                初学嵌套循环最容易乱，是因为把 i、j 当成普通计数器。更稳的读法是给变量分配角色。
                            </p>
                        </div>
                        <CompareTable
                            headers={['变量', '常见角色', '变化时机']}
                            rows={[
                                ['i', '第几行、第几轮、枚举第一个数', '外层每完成一整轮才变化'],
                                ['j', '第几列、这一轮中的第几个、枚举第二个数', '每次进入内层后快速变化'],
                                ['计数器', '累计答案、统计次数、求和', '通常在内层或条件成立时更新'],
                            ]}
                        />
                        <Callout icon={Blocks} title="写题模板" tone="blue">
                            先问“我要重复几行”，写外层；再问“每一行要做几次”，写内层；最后再决定每个位置输出什么。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">典型题型：矩形、乘法表、两数枚举</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                二级题不会只问语法，通常会把嵌套循环藏在输出图形、枚举组合、统计满足条件的数对里。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-2">
                            <CodeBlock>{`// 打印 3 行 5 列星号矩形
for (int i = 1; i <= 3; i++) {
  for (int j = 1; j <= 5; j++) {
    cout << "*";
  }
  cout << endl;
}`}</CodeBlock>
                            <CodeBlock>{`// 统计 1..5 中和为 6 的数对
int cnt = 0;
for (int a = 1; a <= 5; a++) {
  for (int b = 1; b <= 5; b++) {
    if (a + b == 6) cnt++;
  }
}`}</CodeBlock>
                        </div>
                        <Callout icon={Target} title="考试读题抓手" tone="emerald">
                            看到“每一行”“每一个”“所有组合”“数对”“表格”，都要优先怀疑它需要双层循环。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                做嵌套循环题时，先写一张 i、j 追踪表，再写代码。别直接硬敲，边界很容易歪。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>写程序输出 4 行 6 列的 <code>#</code> 矩形。</li>
                                <li>输出 1 到 9 的乘法表，每行只输出同一个 i 对应的结果。</li>
                                <li>枚举 1..20 中所有 <code>a + b == 20</code> 的正整数数对。</li>
                            </ul>
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
