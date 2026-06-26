import React, { useMemo, useState } from 'react';
import { ClipboardCheck, ListChecks, Route, Search } from 'lucide-react';
import CppL6LessonSupport from '../../../components/CppL6LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '按层扩展' },
    { id: 2, title: 'BFS 思想', category: '队列' },
    { id: 3, title: '网格模板', category: '最短步数' },
    { id: 4, title: '访问标记', category: '防止重复' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

const grid = [
    ['S', '.', '.', '#', '.'],
    ['#', '#', '.', '#', '.'],
    ['.', '.', '.', '.', '.'],
    ['.', '#', '#', '#', '.'],
    ['.', '.', '.', 'T', '.'],
];

function calcDistances(maxLayer) {
    const n = grid.length;
    const m = grid[0].length;
    const dist = Array.from({ length: n }, () => Array(m).fill(-1));
    const queue = [[0, 0]];
    dist[0][0] = 0;
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    for (let head = 0; head < queue.length; head++) {
        const [x, y] = queue[head];
        if (dist[x][y] >= maxLayer) continue;
        for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
            if (grid[nx][ny] === '#' || dist[nx][ny] !== -1) continue;
            dist[nx][ny] = dist[x][y] + 1;
            queue.push([nx, ny]);
        }
    }

    return dist;
}

function BfsLab() {
    const [layer, setLayer] = useState(4);
    const dist = useMemo(() => calcDistances(layer), [layer]);

    return (
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Route className="text-blue-700" />
                <h3 className="text-xl font-black text-slate-950">BFS 层序扩展演示台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-blue-100">
                    <label className="block text-sm font-black text-slate-700">扩展到第 {layer} 层</label>
                    <input type="range" min="0" max="10" value={layer} onChange={(event) => setLayer(Number(event.target.value))} className="mt-3 w-full" />
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        BFS 像水波一样一层层扩散。第一次到达某个格子的距离，就是从起点到它的最短步数。
                    </p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-blue-100">
                    <div className="grid w-fit grid-cols-5 gap-2">
                        {grid.flatMap((row, x) => row.map((cell, y) => {
                            const value = dist[x][y];
                            const isWall = cell === '#';
                            const isSpecial = cell === 'S' || cell === 'T';
                            return (
                                <div key={`${x}-${y}`} className={`flex h-12 w-12 items-center justify-center rounded-lg font-mono text-sm font-black ${isWall
                                    ? 'bg-slate-900 text-white'
                                    : value >= 0
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-slate-100 text-slate-400'
                                }`}>
                                    {isWall ? '#' : isSpecial ? cell : value >= 0 ? value : '.'}
                                </div>
                            );
                        }))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: 'BFS 用什么数据结构？',
        answer: '队列',
        reason: '先进先出保证按层扩展。',
    },
    {
        question: '为什么第一次到达就是最短？',
        answer: '按距离从小到大扩展',
        reason: '更短路径一定会先被处理。',
    },
    {
        question: 'visited 标记什么时候做最好？',
        answer: '入队时',
        reason: '避免同一个点被重复加入队列。',
    },
];

function BfsPredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'BFS 把 visited 标记放到「出队时」而不是「入队时」，会怎样？'}
                options={['没区别', '同一点被多次入队，队列膨胀、距离可能出错']}
                correctIndex={1}
                explanation="出队才标记时，一个点可能被多个邻居重复入队。入队时立刻标记，才能保证每个点只进一次队。"
                misconception="以为入队标记和出队标记效果一样。"
            />
            <PredictCheck
                prompt={'无权迷宫里，BFS 第一次到达终点 T 时的距离，就是最短步数吗？'}
                options={['不一定', '是，BFS 按距离从小到大扩展']}
                correctIndex={1}
                explanation="BFS 先处理距离小的点，第一次到达 T 一定来自最短路径——这正是 BFS 求最短步数的原理。"
                misconception="以为还要把所有路径都搜完才能确定最短。"
            />
            <PredictCheck
                prompt={'每步代价不同（带权）的最短路，能直接用普通 BFS 吗？'}
                options={['能', '不能，普通 BFS 只对无权 / 等权图正确']}
                correctIndex={1}
                explanation="普通 BFS 假设每一步代价相同。带权最短路要用 Dijkstra 或 01-BFS，直接套 BFS 会算错。"
                misconception="以为 BFS 对任意最短路问题都成立。"
            />
        </div>
    );
}

const bfsMasteryItems = [
    {
        label: '能解释 BFS 按层扩展的过程。',
        evidence: '队列先进先出，先近后远地推进。',
        retryHint: '回到 BFS 思想，画前两层扩展。',
    },
    {
        label: '能写网格最短路模板。',
        evidence: '起点入队设距离 0，方向数组扩展，过滤越界 / 障碍 / 已访问。',
        retryHint: '回到网格模板。',
    },
    {
        label: '能在入队时正确标记 visited / dist。',
        evidence: '入队即标记，避免同一点被重复入队。',
        retryHint: '回到访问标记，别等出队才标记。',
    },
    {
        label: '能判断什么时候不能用普通 BFS。',
        evidence: '带权最短路要换 Dijkstra / 01-BFS。',
        retryHint: '普通 BFS 只适用于无权 / 等权图。',
    },
];

export default function CppL6Lesson4() {
    return (
        <CppLessonShell
            lessonNumber={4}
            lessonTitle="地毯式搜索 (BFS)"
            lessonSubtitle="用队列一层层找最短路"
            accent="blue"
            levelTitle="C++ 大师"
            levelCode="L6"
            sections={sections}
            previousPath="/lesson/6/3"
            nextPath="/lesson/6/5"
            topSupport={<CppL6LessonSupport lessonId={4} />}
            bottomSupport={<CppL6LessonSupport lessonId={4} placement="bottom" />}
            hero={{
                title: 'BFS 的厉害之处是稳：一层一层推进，第一次到达就是最短',
                description: '本课用迷宫最短路建立 BFS 队列模板，训练方向数组、访问标记和距离数组。',
            }}
            goals={['能解释 BFS 按层扩展的过程', '能写出网格最短路模板', '能正确使用队列、visited 和 dist']}
            prerequisites={['会用 queue 队列', '会遍历二维网格', '理解方向数组 dx/dy']}
            childrenBySection={{
                1: <BfsLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">BFS 思想：从起点开始，先近后远</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                队列保证先入队的点先处理。距离为 1 的点会在距离为 2 的点之前处理，所以 BFS 适合无权图最短路。
                            </p>
                        </div>
                        <CompareTable
                            headers={['搜索方式', '核心结构', '适合目标']}
                            rows={[
                                ['BFS', '队列', '最短步数、层序遍历'],
                                ['DFS', '递归或栈', '连通块、枚举方案'],
                                ['二分', '左右边界', '有单调性的答案'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">网格模板：方向数组让移动规则更干净</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                迷宫题通常用 <code>dx</code>、<code>dy</code> 表示四个方向，先检查边界和障碍，再入队。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`queue<pair<int, int>> q;
q.push({sx, sy});
dist[sx][sy] = 0;

int dx[4] = {1, -1, 0, 0};
int dy[4] = {0, 0, 1, -1};

while (!q.empty()) {
  auto [x, y] = q.front();
  q.pop();

  for (int k = 0; k < 4; k++) {
    int nx = x + dx[k];
    int ny = y + dy[k];
    if (nx < 1 || nx > n || ny < 1 || ny > m) continue;
    if (wall[nx][ny] || dist[nx][ny] != -1) continue;
    dist[nx][ny] = dist[x][y] + 1;
    q.push({nx, ny});
  }
}`}</CodeBlock>
                            <StepList steps={[
                                '起点入队并设置距离 0',
                                '队首出队，扩展四个方向',
                                '过滤越界、障碍、已访问',
                                '新点记录距离并入队',
                            ]} />
                        </div>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">访问标记：入队时就标记，别等出队</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                如果出队时才标记，同一个点可能被多个邻居重复入队，队列会膨胀，距离也更容易出错。
                            </p>
                        </div>
                        <CodeBlock>{`// 推荐：入队时标记
if (!visited[nx][ny]) {
  visited[nx][ny] = true;
  dist[nx][ny] = dist[x][y] + 1;
  q.push({nx, ny});
}`}</CodeBlock>
                        <Callout icon={ListChecks} title="BFS 检查清单" tone="blue">
                            起点是否入队？距离初值是否为 -1？障碍是否跳过？入队时是否立刻标记？
                        </Callout>
                        <BfsPredictionChecks />
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                BFS 题必须画出前两层扩展过程。这样能快速发现方向数组和访问标记问题。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <TransferCheck
                            prompt="换个例子：图的边 1-2, 1-3, 2-4。从 1 出发做 BFS（同层按编号小的先），写出访问顺序。"
                            hint="BFS 用队列，一层一层扩展：先起点，再它的邻居，再邻居的邻居。"
                            answer="1 2 3 4。"
                            steps={[
                                '1 入队、出队访问，邻居 2、3 入队。',
                                '出队访问 2，其邻居 4 入队；出队访问 3。',
                                '出队访问 4。顺序：1 2 3 4。',
                            ]}
                        />
                        <MasteryCheck
                            title="C++ L6-4 BFS 离开前检查"
                            description="BFS 最怕“出队才标记导致重复入队、对带权图错用普通 BFS”。勾选前先在迷宫上画出前两层扩展。"
                            items={bfsMasteryItems}
                        />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>实现迷宫从 S 到 T 的最短步数。</li>
                                <li>输出每个可达格子的最短距离。</li>
                                <li>解释为什么有权边不能直接用普通 BFS 求最短路。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课学习 DFS。BFS 擅长最短距离，DFS 更擅长深入枚举、连通块和方案搜索。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
