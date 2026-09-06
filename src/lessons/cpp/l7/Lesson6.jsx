import React, { useMemo, useState } from 'react';
import { AlertTriangle, Boxes, Layers, Route } from 'lucide-react';
import CppL7LessonSupport from '../../../components/CppL7LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '一条路走到底' },
    { id: 2, title: '递归实现与递归栈', category: '看清回溯' },
    { id: 3, title: 'visited 的标记时机', category: '最关键的一行' },
    { id: 4, title: '连通块与路径', category: '两个经典应用' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

// 贯穿本课的图。邻接表按升序，保证 DFS 的访问顺序是确定的、可预测的。
const ADJ = {
    1: [2, 3],
    2: [1, 4, 5],
    3: [1, 5],
    4: [2],
    5: [2, 3],
    6: [7],
    7: [6],
};
const NODES = [1, 2, 3, 4, 5, 6, 7];

// 把 DFS 的每一步（进入 / 回溯）录成一串事件，用来驱动动画。
function recordDfs(start) {
    const visited = new Set();
    const events = [];
    const stack = [];

    const dive = (u) => {
        visited.add(u);
        stack.push(u);
        events.push({ kind: 'enter', node: u, stack: [...stack], visited: new Set(visited) });
        for (const v of ADJ[u]) {
            if (visited.has(v)) {
                events.push({ kind: 'skip', node: v, from: u, stack: [...stack], visited: new Set(visited) });
                continue;
            }
            dive(v);
        }
        stack.pop();
        events.push({ kind: 'leave', node: u, stack: [...stack], visited: new Set(visited) });
    };

    dive(start);
    return events;
}

const LAYOUT = {
    1: { x: 50, y: 10 },
    2: { x: 24, y: 40 },
    3: { x: 74, y: 40 },
    4: { x: 10, y: 74 },
    5: { x: 48, y: 74 },
    6: { x: 84, y: 76 },
    7: { x: 84, y: 16 },
};
const EDGES = [[1, 2], [1, 3], [2, 4], [2, 5], [3, 5], [6, 7]];

const EVENT_TEXT = {
    enter: (e) => `进入 ${e.node}：标记 visited[${e.node}] = true，压入递归栈`,
    skip: (e) => `从 ${e.from} 看邻居 ${e.node}：已访问过，跳过（这一步防住了死循环）`,
    leave: (e) => `${e.node} 的邻居都处理完了：函数返回，弹出递归栈（回溯）`,
};

function DfsLab() {
    const events = useMemo(() => recordDfs(1), []);
    const [index, setIndex] = useState(events.length - 1);
    const current = events[index];
    const order = useMemo(
        () => events.slice(0, index + 1).filter((e) => e.kind === 'enter').map((e) => e.node),
        [events, index],
    );

    return (
        <div className="rounded-2xl border border-violet-100 bg-violet-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Route className="text-violet-700" aria-hidden="true" />
                <h3 className="text-xl font-black text-slate-950">DFS 与递归栈</h3>
            </div>
            <p className="mb-5 text-sm font-semibold leading-6 text-slate-600">
                从顶点 1 出发。右边那一栏是<strong>递归栈</strong>——它变短的时刻就是「回溯」。
                注意顶点 6、7 属于另一个连通块，从 1 出发永远到不了。
            </p>

            <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-violet-100">
                    <div className="relative h-60 w-full" role="img" aria-label={`图的搜索状态，已访问顺序 ${order.join(' ')}`}>
                        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
                            {EDGES.map(([from, to]) => (
                                <line
                                    key={`${from}-${to}`}
                                    x1={`${LAYOUT[from].x}%`} y1={`${LAYOUT[from].y + 5}%`}
                                    x2={`${LAYOUT[to].x}%`} y2={`${LAYOUT[to].y + 5}%`}
                                    stroke="#c4b4ff" strokeWidth="2"
                                />
                            ))}
                        </svg>
                        {NODES.map((node) => {
                            const position = order.indexOf(node);
                            const inStack = current.stack.includes(node);
                            const isCurrent = current.stack[current.stack.length - 1] === node;
                            return (
                                <div
                                    key={node}
                                    className="absolute flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full text-sm font-black transition-all duration-300"
                                    style={{
                                        left: `${LAYOUT[node].x}%`,
                                        top: `${LAYOUT[node].y}%`,
                                        backgroundColor: isCurrent ? '#7008e7' : inStack ? '#a684ff' : position >= 0 ? '#ddd6ff' : '#f1f5f9',
                                        color: isCurrent || inStack ? '#ffffff' : '#0f172a',
                                        boxShadow: isCurrent ? '0 0 0 4px #ddd6ff' : 'none',
                                    }}
                                >
                                    {node}
                                    {position >= 0 && (
                                        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[10px] font-black text-white">
                                            {position + 1}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <label htmlFor="dfs-step" className="mt-3 block text-sm font-black text-slate-700">
                        第 {index + 1} / {events.length} 步
                    </label>
                    <input
                        id="dfs-step"
                        type="range"
                        min="0"
                        max={events.length - 1}
                        value={index}
                        onChange={(event) => setIndex(Number(event.target.value))}
                        className="mt-2 w-full"
                    />
                </div>

                <div className="space-y-4">
                    <div className="rounded-xl bg-slate-900 p-5">
                        <div className="text-xs font-bold text-slate-400">当前这一步</div>
                        <p className="mt-1 text-sm font-bold leading-6 text-slate-100">
                            {EVENT_TEXT[current.kind](current)}
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-900 p-5">
                        <div className="text-xs font-bold text-slate-400">递归栈（栈底在下）</div>
                        <div className="mt-2 flex flex-col-reverse gap-1">
                            {current.stack.length === 0 && (
                                <span className="text-sm font-bold text-slate-500">（空——搜索结束）</span>
                            )}
                            {current.stack.map((node, depth) => (
                                <span
                                    key={node}
                                    className="rounded bg-violet-500 px-3 py-1 font-mono text-sm font-black text-white"
                                    style={{ marginLeft: `${depth * 12}px` }}
                                >
                                    dfs({node})
                                </span>
                            ))}
                        </div>
                        <p className="mt-3 border-t border-slate-700 pt-3 text-xs font-bold text-slate-400">
                            栈深 {current.stack.length}——递归层数就是这个值，n 很大时它会撑爆系统栈
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-900 p-5">
                        <div className="text-xs font-bold text-slate-400">访问顺序</div>
                        <div className="mt-2 flex flex-wrap gap-1.5 font-mono">
                            {order.map((node) => (
                                <span key={node} className="rounded bg-emerald-400 px-2 py-1 text-sm font-black text-slate-950">
                                    {node}
                                </span>
                            ))}
                            {order.length === 0 && <span className="text-sm font-bold text-slate-500">（还没开始）</span>}
                        </div>
                        <p className="mt-3 border-t border-slate-700 pt-3 text-xs font-bold text-slate-400">
                            已访问 {order.length} / 7 个顶点——6 和 7 在另一个连通块里，到不了
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Lesson6() {
    return (
        <CppLessonShell
            lessonNumber={6}
            lessonTitle="深度优先搜索 DFS"
            lessonSubtitle="一条路走到底，走不通再退回来换一条"
            accent="violet"
            levelTitle="C++ 冲刺"
            levelCode="L7"
            sections={sections}
            previousPath="/lesson/7/5"
            nextPath="/lesson/7/7"
            prerequisites={['会用邻接表存图', '理解递归的调用与返回过程', '会用二维数组表示网格']}
            topSupport={<CppL7LessonSupport lessonId={6} />}
            bottomSupport={<CppL7LessonSupport lessonId={6} placement="bottom" />}
            hero={{
                title: '走到底、退回来、换一条',
                description: '本课讲 DFS 的递归与栈式两种写法、visited 的标记时机，以及求连通块和路径这两个必会应用。',
            }}
            goals={['能写出 DFS 的递归与栈式实现', '能用 visited 数组避免重复访问', '能用 DFS 求连通块与路径']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={Route} title="DFS 的一句话策略" tone="blue">
                            站在一个顶点上，<strong>随便挑一个没去过的邻居就往下走</strong>，
                            一直走到无路可走；然后退回上一个顶点，换下一个没去过的邻居。
                            退回来的这个动作叫<strong>回溯</strong>。
                        </Callout>
                        <p className="mt-5 text-base leading-7 text-slate-700">
                            上一课的二叉树遍历其实就是 DFS——前中后序都是「先把一棵子树走穿，再走另一棵」。
                            图上的 DFS 只多了一件事：<strong>图有环，可能绕回已经走过的点</strong>，
                            所以必须记住哪些点去过了。这就是 visited 数组存在的唯一理由。
                        </p>
                        <Callout icon={AlertTriangle} title="树的 DFS 与图的 DFS 差在哪" tone="amber">
                            树上不需要 visited：往下走只有孩子方向，不可能回到祖先。
                            图上如果不写 visited，遇到环就会 1 → 2 → 3 → 1 → 2 …… <strong>无限递归直到栈溢出</strong>。
                            这是从树过渡到图时最常见的一个错。
                        </Callout>
                    </>
                ),
                2: (
                    <>
                        <DfsLab />
                        <h3 className="mt-8 text-xl font-black text-slate-950">递归实现：五行就够</h3>
                        <CodeBlock>{`vector<int> adj[100005];
bool visited[100005];

void dfs(int u) {
    visited[u] = true;              // 进来先标记
    cout << u << ' ';               // 访问这个点
    for (int v : adj[u]) {
        if (!visited[v]) dfs(v);    // 只往没去过的邻居递归
    }
}                                   // 函数返回 = 回溯`}</CodeBlock>
                        <p className="mt-4 text-base leading-7 text-slate-700">
                            没有显式的「退回」代码——<strong>回溯是函数返回自动完成的</strong>。
                            上面实验台里递归栈变短的那一刻，对应的就是这里的函数返回。
                        </p>

                        <h3 className="mt-8 text-xl font-black text-slate-950">显式栈实现：把递归摊开</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            当 n 达到 10<sup>5</sup> 以上、图又可能退化成一条长链时，递归深度会撑爆系统栈
                            （典型表现是运行时直接崩溃，而不是超时）。这时要改成手写栈。
                        </p>
                        <CodeBlock>{`void dfsIterative(int start) {
    stack<int> st;
    st.push(start);
    visited[start] = true;          // 入栈时就标记，理由见下一节
    while (!st.empty()) {
        int u = st.top(); st.pop();
        cout << u << ' ';
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                st.push(v);
            }
        }
    }
}`}</CodeBlock>
                        <Callout icon={Layers} title="两种写法的访问顺序不一定相同" tone="amber">
                            栈是后进先出，所以邻居会<strong>按逆序</strong>被弹出。
                            递归版从 1 出发访问 1→2→4→5→3，栈版可能是 1→3→5→2→4。
                            两者都是合法的 DFS 序，但如果题目要求<strong>字典序最小</strong>的遍历，
                            用栈版就得把邻居<strong>倒着入栈</strong>。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">为什么标记时机这么要紧</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            递归版 DFS 里，<code className="font-mono font-bold">visited[u] = true</code> 必须写在
                            <strong>函数一进来</strong>，而不是递归调用之后。看下面这个错误写法：
                        </p>
                        <CodeBlock>{`// ❌ 错误：标记太晚
void dfsWrong(int u) {
    for (int v : adj[u]) {
        if (!visited[v]) dfsWrong(v);
    }
    visited[u] = true;      // 等所有邻居都处理完才标记——太晚了
}`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="这个错误会怎么爆" tone="rose">
                            以本课的图为例：dfsWrong(1) 进来时 visited[1] 还是 false，
                            于是走到 2，2 的邻居里有 1，而 visited[1] <strong>仍然是 false</strong>，
                            于是又调 dfsWrong(1) …… 1 → 2 → 1 → 2 无限递归，栈溢出。
                            <br /><br />
                            规律：<strong>标记必须发生在「有别人可能来看我」之前</strong>。
                        </Callout>
                        <CompareTable
                            headers={['写法', '标记位置', '结果']}
                            rows={[
                                ['递归 DFS', '函数入口', '正确'],
                                ['递归 DFS', '递归调用之后', '有环时无限递归'],
                                ['栈式 DFS', '入栈时', '正确，且每个点只入栈一次'],
                                ['栈式 DFS', '出栈时', '同一个点可能被重复入栈，效率变差'],
                            ]}
                        />
                        <PredictCheck
                            className="mt-6"
                            prompt="本课的图从顶点 1 出发做递归 DFS（邻接表按升序），访问顺序是什么？"
                            options={['1 2 3 4 5', '1 2 4 5 3', '1 3 5 2 4', '1 2 4 5 3 6 7']}
                            correctIndex={1}
                            explanation="1 的邻居是 2、3，先走 2。2 的邻居是 1（已访问，跳过）、4、5，先走 4。4 只连 2，回溯。回到 2 走 5。5 的邻居 2、3，2 已访问，走 3。3 的邻居 1、5 都访问过，回溯到底。所以顺序是 1 2 4 5 3。顶点 6、7 是另一个连通块，从 1 出发到不了，所以不在序列里。"
                            misconception="选「1 2 4 5 3 6 7」是忘了一次 DFS 只能覆盖起点所在的那个连通块——要遍历整张图必须在外面套一层循环。"
                        />
                    </>
                ),
                4: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">应用一：数连通块</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            一次 DFS 只能走遍<strong>起点所在的那一块</strong>。
                            所以数连通块的套路是：在外面套一层循环，每遇到一个还没访问过的点，
                            就从它出发做一次 DFS，<strong>发起的次数就是连通块个数</strong>。
                        </p>
                        <CodeBlock>{`int components = 0;
for (int u = 1; u <= n; u++) {
    if (!visited[u]) {
        components++;    // 每发起一次 DFS，就是发现了一个新的连通块
        dfs(u);
    }
}
cout << "连通块个数：" << components << '\\n';   // 本课的图答案是 2`}</CodeBlock>
                        <Callout icon={Boxes} title="网格版：把格子当顶点" tone="blue">
                            「数岛屿」这类题不给邻接表，而是给一个 01 网格。
                            这时<strong>每个格子就是一个顶点</strong>，上下左右四个方向就是边。
                            用方向数组写起来最省事，也不容易漏。
                        </Callout>
                        <CodeBlock>{`char g[105][105];
bool vis[105][105];
int n, m;
// 上下左右四个方向。八连通就再加四个斜向。
int dx[] = {-1, 1, 0, 0};
int dy[] = {0, 0, -1, 1};

void dfsGrid(int x, int y) {
    vis[x][y] = true;
    for (int d = 0; d < 4; d++) {
        int nx = x + dx[d], ny = y + dy[d];
        if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;  // 先判越界
        if (vis[nx][ny] || g[nx][ny] != '#') continue;         // 再判访问过和能不能走
        dfsGrid(nx, ny);
    }
}`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="越界判断必须在访问数组之前" tone="rose">
                            如果把顺序写反，先读 <code className="font-mono">vis[nx][ny]</code> 再判越界，
                            nx 为 -1 时就已经越界读内存了。这类错误在小样例上常常「看起来能过」，
                            换个数据就崩——先判边界是铁律。
                        </Callout>

                        <h3 className="mt-8 text-xl font-black text-slate-950">应用二：输出一条路径</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            DFS 找到的是<strong>某一条</strong>路径，不保证最短（求最短要用下一课的 BFS）。
                            做法是维护一个路径数组，进入时压入、回溯时弹出。
                        </p>
                        <CodeBlock>{`vector<int> path;
bool found = false;

void dfsPath(int u, int target) {
    visited[u] = true;
    path.push_back(u);
    if (u == target) { found = true; return; }   // 找到就不再往下
    for (int v : adj[u]) {
        if (!visited[v]) {
            dfsPath(v, target);
            if (found) return;                   // 剪掉后续分支
        }
    }
    path.pop_back();      // ← 关键：走不通就把自己从路径里摘掉
}`}</CodeBlock>
                        <Callout icon={Layers} title="pop_back 是「回溯」的显式形态" tone="amber">
                            前面说过回溯由函数返回自动完成，但那只针对递归栈。
                            <strong>你自己维护的状态必须自己撤销</strong>——
                            路径数组、当前和、已选方案，进去时改了，退出时就要改回来。
                            这个模式在下一课的剪枝和八皇后里会反复出现。
                        </Callout>
                        <MiniQuiz items={[{
                            question: '递归 DFS 里 visited[u] = true 为什么必须写在函数入口？',
                            answer: '否则有环时会无限递归',
                            reason: '标记晚了，邻居回头看当前点时发现它还没被标记，就会再次递归进来，形成 1→2→1→2 的无限循环直到栈溢出。',
                        }, {
                            question: '要统计整张图的连通块个数，只调用一次 dfs(1) 够吗？',
                            answer: '不够',
                            reason: '一次 DFS 只覆盖起点所在的连通块。必须在外面套 for 循环，对每个还没访问过的点各发起一次 DFS，发起次数即连通块数。',
                        }, {
                            question: 'DFS 找到的两点间路径是最短路径吗？',
                            answer: '不一定',
                            reason: 'DFS 一条路走到底，先找到的是「某条」通路，长度取决于邻居的遍历顺序。求无权图最短路要用 BFS。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '用本课的 7 点图跑一次递归 DFS，把访问顺序与上面实验台核对。',
                                '在外面套一层循环统计连通块个数，验证结果是 2。',
                                '把递归 DFS 改写成显式栈版本，对比两者的访问顺序差异，并想办法让栈版也输出字典序最小的序列。',
                                '写网格版 DFS 统计 01 矩阵里的连通块（岛屿）数量，注意先判越界再判访问。',
                                '实现 dfsPath 输出顶点 1 到顶点 5 的一条路径，故意删掉 pop_back 观察输出会错成什么样。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt="某题的图有 n = 10⁵ 个顶点，且这张图可能是一条长链（1-2-3-…-n）。直接用递归 DFS 会出什么问题？有哪两种解决办法？"
                            hint="想一想这种图上 DFS 的递归深度最深能到多少。"
                            answer="长链上从一端出发做 DFS，递归深度会达到 10⁵ 层。每层函数调用都要占用系统栈空间（局部变量、返回地址等），默认栈通常只有几 MB，10⁵ 层很可能直接栈溢出——表现是程序崩溃（RE），而不是超时。两种解法：① 改写成显式栈的迭代版 DFS，把状态存在堆上的 stack 容器里，深度不再受系统栈限制；② 如果题目只要求遍历或求最短路，改用 BFS，它天然是迭代的、队列也在堆上。部分评测环境还允许手动扩栈，但不如换写法可靠。"
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能说明 visited 的标记时机为什么必须在函数入口，以及标记晚了会怎么爆',
                                '我能处理递归深度过大的风险，知道该改成显式栈或换 BFS',
                                '我能区分树的 DFS 与图的 DFS，说清图为什么必须有 visited',
                                '我能用 DFS 统计连通块个数，也能输出两点间的一条路径并正确回溯',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
