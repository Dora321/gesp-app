import { useState } from 'react';
import { Grid3x3, BookOpen, CheckCircle } from 'lucide-react';
import PyCodeTracer from '../../../../components/PyCodeTracer';
import { MasteryCheck, SlideHeader } from '../../shell/PythonLessonShell';
import { CodeBlock } from './Shared';

const grid2dDemo = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

const grid2dTraceCode = `grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]
row = grid[1]
value = grid[1][2]`;

const grid2dTraceSteps = [
    {
        active: [0, 1, 2, 3, 4],
        vars: { row: '-', col: '-', value: '-' },
        action: '选第 1 行',
    },
    {
        active: [5],
        vars: { row: 1, col: '-', value: '[4, 5, 6]' },
        row: ['grid[1]', '第 1 行', '-', '[4, 5, 6]', '行号从 0 开始，所以第 1 行是第二行'],
        action: '选第 2 列',
    },
    {
        active: [6],
        vars: { row: 1, col: 2, value: 6 },
        row: ['grid[1][2]', '第 1 行', '第 2 列', 6, '先拿到这一行，再从这一行里取第 2 列'],
        action: '检查边界',
    },
    {
        active: [6],
        vars: { row: 1, col: 2, value: 6 },
        exit: '二维列表访问顺序固定：grid[行][列]。3x3 表格的合法行列号都是 0、1、2。',
        action: '显示结论',
    },
    {
        active: [5, 6],
        vars: { row: '0..2', col: '0..2', value: '先行后列' },
        output: 'grid[1][2] = 6；读作第 1 行、第 2 列，不是第 1 列、第 2 行。',
    },
];

export const Grid2DTraceCard = () => (
    <PyCodeTracer
        title="二维列表追踪器：先选行，再选列"
        code={grid2dTraceCode}
        varOrder={['row', 'col', 'value']}
        columns={['表达式', '行', '列', '结果', '说明']}
        steps={grid2dTraceSteps}
        hint="把二维列表想成表格：外层列表选行，内层列表选列；行列都从 0 开始。"
    />
);

export const Grid2DSlide = () => {
    const [pos, setPos] = useState({ r: 1, c: 2 });
    const value = grid2dDemo[pos.r][pos.c];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="teal" icon={Grid3x3} title="二维列表：表格与棋盘">
                把列表放进列表，就得到<strong>二维列表</strong>——像一张表格或一个棋盘（2048、井字棋都用它）。用 <code>grid[行][列]</code> 取值：先选第几行，再选第几列；行、列都从 <strong>0</strong> 开始数。
            </SlideHeader>

            <Grid2DTraceCard />

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <p className="mb-4 text-sm font-bold text-slate-500">点一个格子，看它的 [行][列] 坐标 →</p>
                    <div className="inline-grid grid-cols-3 gap-2">
                        {grid2dDemo.map((rowArr, r) =>
                            rowArr.map((v, c) => {
                                const active = pos.r === r && pos.c === c;
                                return (
                                    <button
                                        key={`${r}-${c}`}
                                        onClick={() => setPos({ r, c })}
                                        className={`flex h-16 w-16 items-center justify-center rounded-xl font-mono text-xl font-black transition-all ${active ? 'scale-105 bg-teal-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                    >
                                        {v}
                                    </button>
                                );
                            })
                        )}
                    </div>
                    <div className="mt-4 rounded-xl border border-teal-200 bg-teal-50 p-4 font-mono font-black text-teal-900">
                        grid[<span className="text-teal-600">{pos.r}</span>][<span className="text-teal-600">{pos.c}</span>] = <span className="text-2xl">{value}</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <CodeBlock code={`grid = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9],\n]\nprint(grid[${pos.r}][${pos.c}])  # 输出 ${value}`} />
                    <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-600">
                        <p className="mb-2 font-bold text-slate-700">遍历整个棋盘 = 两层循环：</p>
                        <CodeBlock code={`for r in range(3):\n    for c in range(3):\n        print(grid[r][c])`} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const f3MasteryItems = [
    {
        label: '能判断什么时候用 list、dict、string 或二维 list。',
        evidence: '能说出：一组有顺序的数据用 list；按标签查信息用 dict；文字处理用 string；棋盘/表格用二维 list。',
        retryHint: '回看小结三张卡，再给“学生名单、学生档案、聊天文本、九宫格”各选一次容器。',
    },
    {
        label: '能解释下标、key 和切片的不同访问规则。',
        evidence: '能说明 list/string 用位置，dict 用 key；grid[行][列] 先选行；text[1:4] 不包含 4。',
        retryHint: '分别重做列表、字典、字符串和二维列表的追踪器。',
    },
    {
        label: '能处理越界或找不到键，不让程序直接崩掉。',
        evidence: '能说出 items[3] 会 IndexError，profile["job"] 会 KeyError，可以先判断或用 get(default)。',
        retryHint: '回看列表下标追踪器和字典访问追踪器，把错误名说出来。',
    },
    {
        label: '能把一个小任务拆成“读数据、改数据、遍历处理”。',
        evidence: '例如名单管理：先查名字是否存在，再 append/remove，最后 for 遍历输出。',
        retryHint: '回到列表练习顺序，按“先读下标、再改背包、最后遍历”做一遍。',
    },
];

export const SummarySlide = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SlideHeader accent="teal" icon={BookOpen} title="小结与下一步">
            这一课，你学会了用三种「容器」装真实数据。选对容器，一半的题就解决了。
        </SlideHeader>
        <div className="grid gap-4 md:grid-cols-3">
            {[
                ['列表 List', '有序、可改，按下标取值；二维列表就是列表里装列表，像棋盘。'],
                ['字典 Dict', '用「键」直接查「值」，适合描述一条信息的多个字段。'],
                ['字符串 String', '字符的序列，可遍历、可切片、可拼接。'],
            ].map(([title, desc]) => (
                <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-2 text-sm font-black text-teal-700">{title}</div>
                    <p className="text-sm font-semibold leading-7 text-slate-600">{desc}</p>
                </div>
            ))}
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2 font-black text-slate-800">
                <CheckCircle size={16} className="text-teal-600" /> 学完自测
            </div>
            <ul className="grid gap-2 text-sm font-semibold text-slate-600 sm:grid-cols-2">
                <li className="flex gap-2"><span className="text-teal-500">✓</span> 能说明列表下标从 0 开始</li>
                <li className="flex gap-2"><span className="text-teal-500">✓</span> 能用 grid[行][列] 读取二维列表</li>
                <li className="flex gap-2"><span className="text-teal-500">✓</span> 能选 list 还是 dict 解决任务</li>
                <li className="flex gap-2"><span className="text-teal-500">✓</span> 能处理找不到键或下标越界</li>
            </ul>
        </div>
        <MasteryCheck
            title="F3 数据结构离开前检查"
            description="如果能选容器、说清访问规则、处理错误、迁移到小任务，就可以进入函数课。"
            accent="teal"
            items={f3MasteryItems}
        />
        <div className="rounded-2xl border border-teal-100 bg-teal-50 p-5">
            <div className="mb-1 font-black text-teal-800">下一课：F4 函数与模块</div>
            <p className="text-sm font-semibold leading-7 text-teal-900">
                数据结构能装住信息；下一课把「处理这些数据的步骤」打包成函数，让代码可复用、可组合。
            </p>
        </div>
    </div>
);
