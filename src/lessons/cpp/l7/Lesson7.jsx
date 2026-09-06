import React, { useMemo, useState } from 'react';
import { AlertTriangle, Ruler, Waves, Workflow } from 'lucide-react';
import CppL7LessonSupport from '../../../components/CppL7LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '一层一层往外扩' },
    { id: 2, title: '队列模板', category: '标准写法' },
    { id: 3, title: '层数就是最短距离', category: '为什么成立' },
    { id: 4, title: '入队时标记', category: '最关键的一行' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

// 5×6 网格。'#' 可走、'X' 是墙。起点左上、终点右下。
const GRID = [
    '#####X',
    'X###X#',
    '##X###',
    '#X####',
    '###X##',
];
const ROWS = GRID.length;
const COLS = GRID[0].length;
const START = [0, 0];
const GOAL = [4, 5];
const DIRS = [[-1, 0], [1, 0], [0, -1], [0, 1]];

// 录下 BFS 的每一步：出队谁、把谁入队、每个点的距离。
function recordBfs() {
    const dist = Array.from({ length: ROWS }, () => new Array(COLS).fill(-1));
    const events = [];
    const queue = [START];
    dist[START[0]][START[1]] = 0;
    events.push({
        kind: 'start',
        queue: [...queue],
        dist: dist.map((row) => [...row]),
        text: `起点 (0,0) 入队，dist = 0。注意：入队的同时就把距离写好了。`,
    });

    let head = 0;
    while (head < queue.length) {
        const [x, y] = queue[head];
        head += 1;
        const pushed = [];
        for (const [dx, dy] of DIRS) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx < 0 || nx >= ROWS || ny < 0 || ny >= COLS) continue;
            if (GRID[nx][ny] === 'X') continue;
            if (dist[nx][ny] !== -1) continue;
            dist[nx][ny] = dist[x][y] + 1;
            queue.push([nx, ny]);
            pushed.push([nx, ny]);
        }
        events.push({
            kind: 'expand',
            current: [x, y],
            queue: queue.slice(head),
            dist: dist.map((row) => [...row]),
            text: pushed.length
                ? `出队 (${x},${y})，dist=${dist[x][y]}。它的邻居 ${pushed.map(([a, b]) => `(${a},${b})`).join('、')} 首次到达，标上 dist=${dist[x][y] + 1} 并入队。`
                : `出队 (${x},${y})，dist=${dist[x][y]}。四周没有新格子——邻居要么是墙、要么已经有距离了。`,
        });
    }
    return events;
}

function BfsLab() {
    const events = useMemo(() => recordBfs(), []);
    const [index, setIndex] = useState(events.length - 1);
    const current = events[index];
    const goalDist = current.dist[GOAL[0]][GOAL[1]];

    return (
        <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Waves className="text-cyan-700" aria-hidden="true" />
                <h3 className="text-xl font-black text-slate-950">BFS 的水波纹</h3>
            </div>
            <p className="mb-5 text-sm font-semibold leading-6 text-slate-600">
                格子里的数字是它到起点的距离。拖动进度条会看到：
                <strong>距离总是按 0、1、2、3 的顺序一圈圈铺开</strong>，绝不会跳着来。
                这正是 BFS 能求最短路的原因。
            </p>

            <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-cyan-100">
                    <div className="overflow-x-auto">
                        <table className="mx-auto border-collapse">
                            <tbody>
                                {GRID.map((row, x) => (
                                    <tr key={x}>
                                        {[...row].map((cell, y) => {
                                            const d = current.dist[x][y];
                                            const isWall = cell === 'X';
                                            const isCurrent = current.current
                                                && current.current[0] === x && current.current[1] === y;
                                            const isGoal = x === GOAL[0] && y === GOAL[1];
                                            const isStart = x === START[0] && y === START[1];
                                            return (
                                                <td key={y} className="p-0.5">
                                                    <div
                                                        className="flex h-10 w-10 flex-col items-center justify-center rounded text-sm font-black transition-all duration-200"
                                                        style={{
                                                            backgroundColor: isWall ? '#314158'
                                                                : isCurrent ? '#00786f'
                                                                    : d >= 0 ? `hsl(190 90% ${Math.max(38, 88 - d * 5)}%)`
                                                                        : '#f1f5f9',
                                                            color: isWall ? '#62748b'
                                                                : isCurrent ? '#ffffff'
                                                                    : d >= 0 && d > 6 ? '#ffffff' : '#0f172a',
                                                        }}
                                                    >
                                                        {isWall ? '墙' : d >= 0 ? d : ''}
                                                        {(isStart || isGoal) && (
                                                            <span className="text-[9px] leading-none opacity-80">
                                                                {isStart ? '起' : '终'}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <label htmlFor="bfs-step" className="mt-4 block text-sm font-black text-slate-700">
                        第 {index + 1} / {events.length} 步
                    </label>
                    <input
                        id="bfs-step"
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
                        <p className="mt-1 text-sm font-bold leading-6 text-slate-100">{current.text}</p>
                    </div>

                    <div className="rounded-xl bg-slate-900 p-5">
                        <div className="text-xs font-bold text-slate-400">队列（队首在左）</div>
                        <div className="mt-2 flex flex-wrap gap-1.5 font-mono">
                            {current.queue.length === 0 && (
                                <span className="text-sm font-bold text-slate-500">（空——搜索结束）</span>
                            )}
                            {current.queue.map(([x, y]) => (
                                <span key={`${x}-${y}`} className="rounded bg-cyan-500 px-2 py-1 text-xs font-black text-white">
                                    {x},{y}
                                </span>
                            ))}
                        </div>
                        <p className="mt-3 border-t border-slate-700 pt-3 text-xs font-bold text-slate-400">
                            队列里的元素距离最多只差 1——BFS 的这个性质是它正确的关键
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-900 p-5">
                        <div className="text-xs font-bold text-slate-400">终点 (4,5) 的最短距离</div>
                        <div className={`mt-1 text-3xl font-black ${goalDist >= 0 ? 'text-emerald-400' : 'text-slate-600'}`}>
                            {goalDist >= 0 ? goalDist : '还没到达'}
                        </div>
                        <p className="mt-3 border-t border-slate-700 pt-3 text-xs font-bold text-slate-400">
                            {goalDist >= 0
                                ? '这个数字第一次被写上时就是最终答案，后面不会再变小'
                                : '继续拖动进度条，看水波纹什么时候扩到右下角'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Lesson7() {
    return (
        <CppLessonShell
            lessonNumber={7}
            lessonTitle="广度优先搜索 BFS"
            lessonSubtitle="一层一层往外扩，第一次到达就是最短"
            accent="cyan"
            levelTitle="C++ 冲刺"
            levelCode="L7"
            sections={sections}
            previousPath="/lesson/7/6"
            nextPath="/lesson/7/8"
            prerequisites={['会用邻接表或网格表示图', '知道 queue 的先进先出特性', '完成上一课的 DFS']}
            topSupport={<CppL7LessonSupport lessonId={7} />}
            bottomSupport={<CppL7LessonSupport lessonId={7} placement="bottom" />}
            hero={{
                title: '为什么第一次到达就一定是最短的',
                description: '本课讲 BFS 的队列模板、层数与最短距离的关系，以及那个必须记住的细节——标记要在入队时做，不是出队时。',
            }}
            goals={['能写出 BFS 的队列模板', '能用 BFS 求无权图最短路', '能说明 BFS 与 DFS 的适用场景差别']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={Waves} title="BFS 的一句话策略" tone="blue">
                            DFS 是「一条路走到底」，BFS 是「<strong>把所有距离 1 的点都看完，再看距离 2 的</strong>」。
                            像往水里扔石头，波纹一圈一圈往外扩，绝不会跳过任何一圈。
                        </Callout>
                        <p className="mt-5 text-base leading-7 text-slate-700">
                            实现上唯一的差别：<strong>DFS 用栈（后进先出），BFS 用队列（先进先出）</strong>。
                            换一个容器，遍历顺序就从「纵向钻」变成「横向铺」。
                        </p>
                        <CompareTable
                            headers={['对比项', 'DFS', 'BFS']}
                            rows={[
                                ['容器', '栈（或递归栈）', '队列'],
                                ['扩展顺序', '纵向：一条路走到底', '横向：一层一层往外'],
                                ['求最短路', '不能直接求', '无权图上天然求出最短路'],
                                ['空间开销', 'O(树高)，链状图上很大', 'O(最宽一层)，宽图上很大'],
                                ['擅长', '连通块、路径存在性、回溯枚举', '最短步数、层次关系'],
                            ]}
                        />
                        <Callout icon={AlertTriangle} title="两者的空间开销谁大不固定" tone="amber">
                            长链状的图上 DFS 递归深度爆炸、BFS 队列很短；
                            扁而宽的图上（比如一个点连着 10<sup>5</sup> 个邻居）反过来，BFS 队列会很长。
                            <strong>选哪个主要看要解的问题，不是看哪个更省</strong>。
                        </Callout>
                    </>
                ),
                2: (
                    <>
                        <BfsLab />
                        <h3 className="mt-8 text-xl font-black text-slate-950">图上的 BFS 模板</h3>
                        <CodeBlock>{`vector<int> adj[100005];
int dist[100005];

void bfs(int start) {
    memset(dist, -1, sizeof(dist));   // -1 表示还没到达
    queue<int> q;
    q.push(start);
    dist[start] = 0;                  // 入队时就把距离写好
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (dist[v] != -1) continue;   // 已经有距离了，说明来过
            dist[v] = dist[u] + 1;         // 关键：由上一层 + 1 得到
            q.push(v);
        }
    }
}`}</CodeBlock>
                        <Callout icon={Workflow} title="dist 数组一人干两件事" tone="blue">
                            它既是<strong>距离表</strong>，又是<strong>visited 标记</strong>——
                            <code className="font-mono">dist[v] != -1</code> 就等于「访问过」。
                            这样就不用再开一个 visited 数组，代码更短也更不容易出现两者不同步的 bug。
                        </Callout>

                        <h3 className="mt-8 text-xl font-black text-slate-950">网格上的 BFS</h3>
                        <CodeBlock>{`int dist[105][105];
int dx[] = {-1, 1, 0, 0}, dy[] = {0, 0, -1, 1};

int bfsGrid(int sx, int sy, int tx, int ty) {
    memset(dist, -1, sizeof(dist));
    queue<pair<int,int>> q;
    q.push({sx, sy});
    dist[sx][sy] = 0;
    while (!q.empty()) {
        auto [x, y] = q.front(); q.pop();
        if (x == tx && y == ty) return dist[x][y];   // 到终点，直接返回
        for (int d = 0; d < 4; d++) {
            int nx = x + dx[d], ny = y + dy[d];
            if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;  // 先判越界
            if (g[nx][ny] == 'X' || dist[nx][ny] != -1) continue;
            dist[nx][ny] = dist[x][y] + 1;
            q.push({nx, ny});
        }
    }
    return -1;      // 队列空了还没到 = 走不通
}`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="两个容易漏的边界" tone="rose">
                            ① <strong>无解</strong>：队列空了终点仍是 -1，必须返回 -1 或输出「无法到达」，
                            不能直接输出 <code className="font-mono">dist[tx][ty]</code> 了事。
                            <br />② <strong>起点等于终点</strong>：答案是 0。上面的写法天然正确
                            （起点入队时 dist=0，第一次出队就命中返回）。
                            如果把判断写在入队处而不是出队处，就要单独处理这种情况。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">为什么「第一次到达」就是最短</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            这是 BFS 唯一需要真正理解的地方。关键在队列的一个性质：
                        </p>
                        <div className="mt-4 rounded-xl bg-slate-900 p-5">
                            <p className="text-sm font-bold leading-7 text-cyan-200">
                                在整个 BFS 过程中，队列里的元素距离<strong className="text-white">单调不减</strong>，
                                且最大值与最小值最多相差 1。
                            </p>
                        </div>
                        <p className="mt-4 text-base leading-7 text-slate-700">
                            也就是说队列里永远只有「第 k 层」和「第 k+1 层」两种元素，
                            而且第 k 层全部排在前面。于是：
                        </p>
                        <StepList
                            title="推理三步"
                            steps={[
                                '出队顺序一定是先把所有距离 k 的点出完，才开始出距离 k+1 的点。',
                                '一个点被赋距离的时刻，是它第一次被某个已出队的点看到；那个点的距离是当前最小的 k，所以它得到的是 k+1。',
                                '之后再有别的点看到它，那个点的距离 ≥ k，给出的候选距离 ≥ k+1，不可能更小。所以第一次写上的值就是最短距离。',
                            ]}
                        />
                        <Callout icon={Ruler} title="这个结论有个前提" tone="rose">
                            <strong>所有边的权值必须相同</strong>（无权图，或者说每条边都算 1 步）。
                            如果边权不同，「层数」和「距离」就脱钩了——走 2 条便宜的边可能比走 1 条贵的边总代价更小，
                            BFS 会给出错误答案。带权最短路要用 Dijkstra（八级内容）。
                        </Callout>
                        <PredictCheck
                            className="mt-6"
                            prompt="一张图里，边权分别是 1 和 100。用 BFS 求起点到终点的最小总权值，结果会怎样？"
                            options={['正确', '可能偏大', '可能偏小', '一定正确但很慢']}
                            correctIndex={1}
                            explanation="BFS 求的是「最少经过几条边」，不是「总权值最小」。假设 A→B 权 100 是一条边，而 A→C→B 是两条权 1 的边（总共 2）。BFS 会先找到只走 1 条边的路径并返回它，得到 100，而真正的最小值是 2——所以结果偏大。带权图必须用 Dijkstra。"
                            misconception="容易觉得「BFS 求最短路」是无条件成立的。它成立的前提是边权全部相同。"
                        />
                    </>
                ),
                4: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">标记必须在入队时，不能在出队时</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            这是 BFS 最经典的一个坑。看下面的错误写法：
                        </p>
                        <CodeBlock>{`// ❌ 错误：出队时才标记
void bfsWrong(int start) {
    queue<int> q;
    q.push(start);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        if (visited[u]) continue;   // 出队才检查
        visited[u] = true;
        for (int v : adj[u]) {
            if (!visited[v]) q.push(v);   // 没标记就入队
        }
    }
}`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="它的问题不是答案错，是会爆" tone="rose">
                            这个写法算出的距离<strong>其实是对的</strong>（靠出队时的 continue 挡住重复处理），
                            但<strong>同一个点会被入队多次</strong>——有多少个邻居指向它，它就可能进队多少次。
                            <br /><br />
                            在稠密图上，队列长度会从 O(n) 膨胀到 O(m)。n = 10<sup>5</sup>、m = 10<sup>6</sup> 时，
                            内存和时间双双恶化，典型表现是 MLE 或 TLE。
                        </Callout>
                        <CompareTable
                            headers={['标记时机', '距离是否正确', '每个点入队次数', '后果']}
                            rows={[
                                ['入队时标记', '正确', '恰好 1 次', '标准写法'],
                                ['出队时标记', '正确', '最多 deg(v) 次', '队列膨胀，可能 MLE / TLE'],
                                ['完全不标记', '错误', '无限次', '死循环'],
                            ]}
                        />
                        <p className="mt-5 text-base leading-7 text-slate-700">
                            用 <code className="font-mono font-bold">dist[v] != -1</code> 当标记时，
                            这个坑会自动避开——因为赋距离和入队是<strong>写在一起的两行</strong>，
                            不可能只做一件。这也是推荐用 dist 兼作 visited 的实际好处。
                        </p>
                        <MiniQuiz items={[{
                            question: 'BFS 为什么要在入队时标记而不是出队时标记？',
                            answer: '避免同一个点重复入队',
                            reason: '出队时才标记的话，一个点有几个邻居指向它就可能入队几次，队列长度从 O(n) 膨胀到 O(m)，可能导致内存超限或超时。距离结果仍然对，但代价大得多。',
                        }, {
                            question: '起点和终点是同一个格子时，BFS 应该返回什么？',
                            answer: '0',
                            reason: '起点入队时 dist 就设成 0，第一次出队即命中终点判断，返回 0。如果把终点判断写在入队处，就要单独处理这种情况。',
                        }, {
                            question: '边权有 1 和 5 两种的图，能用 BFS 求最小总权值吗？',
                            answer: '不能',
                            reason: 'BFS 求的是最少边数。边权不同时，边数少的路径总权值可能反而更大。带权最短路要用 Dijkstra 或 SPFA。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '把本课的 5×6 网格抄进代码，用 BFS 求左上到右下的最短步数，与上面实验台的结果核对。',
                                '把某几个格子改成墙，构造一个「走不通」的数据，验证你的代码输出 -1 而不是崩溃或输出 0。',
                                '测试起点等于终点的情况，确认输出是 0。',
                                '把 BFS 改成 DFS 求同一对起终点的路径长度，对比两者结果，说明为什么 DFS 的结果可能更大。',
                                '故意把标记改到出队时做，加一个计数器统计总入队次数，对比两种写法的差距。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt="一道题要求：在 n×m 网格里从起点走到终点，最多可以打穿 1 面墙。还能用 BFS 吗？该怎么改？"
                            hint="想一想「同一个格子」在这道题里是不是同一个状态。"
                            answer="能用，但要扩展状态。原来一个格子只有一个状态，现在要区分「到这个格子时还没用过打穿机会」和「已经用掉了」——这是两个不同的状态，最短距离也不同。所以 dist 数组变成三维：dist[x][y][k]，k = 0 或 1 表示已打穿几面墙。入队的元素也带上 k。从 (x,y,k) 扩展时：走到空地是 (nx,ny,k)；走到墙则只有 k = 0 时可以走，变成 (nx,ny,1)。答案取 min(dist[tx][ty][0], dist[tx][ty][1])。这个技巧叫「分层图 BFS」，本质是把「状态」而不是「位置」当作图的顶点——下一课的状态判重讲的就是这件事。"
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能说明为什么入队时标记而不是出队时标记，以及出队标记会带来什么后果',
                                '我能处理起点等于终点、以及无法到达这两种边界情况',
                                '我知道 BFS 求最短路的前提是边权相同，边权不同时该换 Dijkstra',
                                '我能解释为什么一个点第一次被赋的距离就是最短距离',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
