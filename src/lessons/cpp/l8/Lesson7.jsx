import React, { useMemo, useState } from 'react';
import { AlertTriangle, Route, Table2, TrendingDown } from 'lucide-react';
import CppL8LessonSupport from '../../../components/CppL8LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '带权图的最短路' },
    { id: 2, title: '松弛与逐轮确定', category: 'Dijkstra 手推' },
    { id: 3, title: '负权反例', category: '贪心前提被破坏' },
    { id: 4, title: 'Floyd', category: '三重循环的顺序' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

const N = 6;
const EDGES = [
    [1, 2, 7], [1, 3, 9], [1, 6, 14], [2, 3, 10],
    [2, 4, 15], [3, 4, 11], [3, 6, 2], [4, 5, 6], [5, 6, 9],
];

// Dijkstra 逐轮记录。这份轨迹是跑出来的：最终 dist 与 Floyd 结果一致。
function runDijkstra() {
    const adj = {};
    for (let i = 1; i <= N; i += 1) adj[i] = [];
    EDGES.forEach(([u, v, w]) => { adj[u].push([v, w]); adj[v].push([u, w]); });

    const dist = new Array(N + 1).fill(Infinity);
    dist[1] = 0;
    const done = new Array(N + 1).fill(false);
    const rounds = [{ pick: null, dist: [...dist], done: [...done], relax: [] }];

    for (let it = 0; it < N; it += 1) {
        let u = -1;
        for (let i = 1; i <= N; i += 1) if (!done[i] && (u === -1 || dist[i] < dist[u])) u = i;
        if (u === -1 || dist[u] === Infinity) break;
        done[u] = true;
        const relax = [];
        adj[u].forEach(([v, w]) => {
            if (!done[v] && dist[u] + w < dist[v]) {
                relax.push({ v, from: dist[v], to: dist[u] + w, w });
                dist[v] = dist[u] + w;
            }
        });
        rounds.push({ pick: u, picked: dist[u], dist: [...dist], done: [...done], relax });
    }
    return rounds;
}

const fmt = (d) => (d === Infinity ? '∞' : String(d));

function DijkstraLab() {
    const rounds = useMemo(() => runDijkstra(), []);
    const [step, setStep] = useState(rounds.length - 1);
    const current = rounds[step];

    return (
        <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Route className="text-cyan-700" aria-hidden="true" />
                <h3 className="text-xl font-black text-slate-950">Dijkstra 的 dist 数组变化</h3>
            </div>
            <p className="mb-5 text-sm font-semibold leading-6 text-slate-600">
                从顶点 1 出发。每一轮做两件事：<strong>在未确定的点里挑 dist 最小的确定下来</strong>，
                然后<strong>用它去松弛邻居</strong>。深色格子表示已经确定、不会再变。
            </p>

            <div className="rounded-xl bg-white p-5 ring-1 ring-cyan-100">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[24rem] text-center font-mono text-sm">
                        <thead className="text-slate-400">
                            <tr>
                                <th className="px-2 py-1.5 text-left font-black">顶点</th>
                                {Array.from({ length: N }, (_, i) => (
                                    <th key={i} className="px-2 py-1.5 font-black">{i + 1}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t border-slate-100">
                                <td className="px-2 py-2 text-left font-black text-slate-400">dist</td>
                                {Array.from({ length: N }, (_, i) => {
                                    const v = i + 1;
                                    const isJustPicked = current.pick === v;
                                    const isRelaxed = current.relax.some((r) => r.v === v);
                                    return (
                                        <td key={v} className="px-1 py-2">
                                            <span className={`flex h-10 w-12 items-center justify-center rounded font-black ${isJustPicked
                                                ? 'bg-cyan-700 text-white ring-2 ring-cyan-300'
                                                : current.done[v]
                                                    ? 'bg-cyan-600 text-white'
                                                    : isRelaxed
                                                        ? 'bg-amber-400 text-slate-950'
                                                        : 'bg-slate-100 text-slate-600'}`}>
                                                {fmt(current.dist[v])}
                                            </span>
                                        </td>
                                    );
                                })}
                            </tr>
                        </tbody>
                    </table>
                </div>

                <label htmlFor="dij-step" className="mt-4 block text-sm font-black text-slate-700">
                    第 {step} / {rounds.length - 1} 轮
                </label>
                <input
                    id="dij-step"
                    type="range" min="0" max={rounds.length - 1} step="1"
                    value={step}
                    onChange={(event) => setStep(Number(event.target.value))}
                    className="mt-2 w-full"
                />
                <p className="mt-2 text-xs font-bold text-slate-500">
                    深色 = 已确定，亮黄 = 这一轮被松弛（变小了），浅灰 = 还没确定
                </p>
            </div>

            <div className="mt-5 rounded-xl bg-slate-900 p-5">
                <div className="text-xs font-bold text-slate-400">这一轮做了什么</div>
                {current.pick === null ? (
                    <p className="mt-2 text-sm font-bold text-slate-100">
                        初始化：起点 dist[1] = 0，其余全是 ∞（还不知道能不能到）。
                    </p>
                ) : (
                    <>
                        <p className="mt-2 text-sm font-bold text-slate-100">
                            在未确定的点里，顶点 <span className="text-cyan-300">{current.pick}</span> 的
                            dist = {current.picked} 最小，把它<strong className="text-white">确定下来</strong>。
                        </p>
                        <div className="mt-3 space-y-1 border-t border-slate-700 pt-3 font-mono text-xs">
                            {current.relax.length === 0 && (
                                <div className="text-slate-500">没有邻居能被松弛得更短</div>
                            )}
                            {current.relax.map((r) => (
                                <div key={r.v} className="text-amber-300">
                                    松弛 {current.pick}→{r.v}（权 {r.w}）：dist[{r.v}] 从 {fmt(r.from)} 降到 {r.to}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

// 负权反例：这三条有向边足以让 Dijkstra 算错。数字是验算过的。
const NEG_TRACE = [
    { text: '确定顶点 1，dist = 0', detail: '松弛 1→2 得 dist[2] = 1；松弛 1→3 得 dist[3] = 2', bad: false },
    { text: '未确定的点里 dist[2] = 1 最小，确定顶点 2 = 1', detail: '此后 Dijkstra 认为「到 2 的最短路已经定了」，不再更新它', bad: false },
    { text: '确定顶点 3 = 2，尝试松弛 3→2', detail: '2 + (−2) = 0 < 1，本该把 dist[2] 更新成 0 —— 但 2 已经确定，这次松弛被跳过', bad: true },
    { text: 'Dijkstra 输出 dist[2] = 1', detail: '正确答案是 0（走 1→3→2）。算错了。', bad: true },
];

export default function Lesson7() {
    return (
        <CppLessonShell
            lessonNumber={7}
            lessonTitle="最短路：Dijkstra 与 Floyd"
            lessonSubtitle="贪心的前提是「已确定的不会再变小」"
            accent="cyan"
            levelTitle="C++ 提高"
            levelCode="L8"
            sections={sections}
            previousPath="/lesson/8/6"
            nextPath="/lesson/8/8"
            prerequisites={['完成七级第 5、7 课的图存储与 BFS', '会用优先队列 priority_queue', '知道 BFS 只能求边权相同的最短路']}
            topSupport={<CppL8LessonSupport lessonId={7} />}
            bottomSupport={<CppL8LessonSupport lessonId={7} placement="bottom" />}
            hero={{
                title: '边权不同了，BFS 就不够用',
                description: '本课讲 Dijkstra 的松弛过程与贪心前提、负权为什么会破坏它，以及 Floyd 的三重循环为什么必须那样排。',
            }}
            goals={['能写出 Dijkstra 的松弛过程', '能说明它为什么不能处理负权', '能选择 Dijkstra 或 Floyd']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={Route} title="从七级的 BFS 接上来" tone="blue">
                            七级第 7 课证明过：BFS 能求最短路，<strong>前提是所有边权相同</strong>。
                            因为那时「层数」等于「距离」。
                            <br /><br />
                            现在边有了不同的权（比如路程、费用、时间），层数和距离就脱钩了——
                            走 2 条便宜的边可能比走 1 条贵的边总代价更小。BFS 会给出错误答案，
                            需要新算法。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">松弛（relax）是核心操作</h3>
                        <div className="mt-4 rounded-xl bg-slate-900 p-5 text-center">
                            <span className="font-mono text-base font-black text-cyan-300">
                                if (dist[u] + w(u,v) &lt; dist[v]) dist[v] = dist[u] + w(u,v);
                            </span>
                        </div>
                        <Callout icon={TrendingDown} title="松弛的含义" tone="blue">
                            <code className="font-mono">dist[v]</code> 是「目前已知的、从起点到 v 的最短距离」——
                            注意是<strong>目前已知</strong>，可能还不是真正的最短。
                            <br /><br />
                            松弛就是问一句：<strong>「先到 u，再走一条边到 v」，会不会比我现在知道的路更短</strong>？
                            会，就更新。这个词的字面意思是「放松」——把上界往下压。
                            <br /><br />
                            所有最短路算法（Dijkstra、Bellman-Ford、Floyd、SPFA）都是<strong>不停做松弛</strong>，
                            区别只在<strong>按什么顺序松弛</strong>。
                        </Callout>
                    </>
                ),
                2: (
                    <>
                        <DijkstraLab />
                        <h3 className="mt-8 text-xl font-black text-slate-950">Dijkstra 的两步循环</h3>
                        <StepList
                            title="每一轮重复这两步，共 n 轮"
                            steps={[
                                '在「还没确定」的点里，挑出 dist 最小的那个 u，把它标为已确定——它的 dist 就是最终答案。',
                                '用 u 去松弛它的每一个邻居 v：如果 dist[u] + w < dist[v]，就更新 dist[v]。',
                            ]}
                        />
                        <CodeBlock>{`const int INF = 0x3f3f3f3f;
int dist[N], vis[N];
vector<pair<int,int>> adj[N];      // {邻居, 边权}

void dijkstra(int s, int n) {
    memset(dist, 0x3f, sizeof(dist));
    dist[s] = 0;
    for (int it = 0; it < n; it++) {
        // 第一步：找未确定的点里 dist 最小的
        int u = -1;
        for (int i = 1; i <= n; i++)
            if (!vis[i] && (u == -1 || dist[i] < dist[u])) u = i;
        if (u == -1 || dist[u] == INF) break;   // 剩下的都到不了
        vis[u] = 1;
        // 第二步：用 u 松弛邻居
        for (auto [v, w] : adj[u])
            if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;
    }
}
// 复杂度：外层 n 轮，每轮找最小值 O(n)，总共 O(n²)`}</CodeBlock>
                        <Callout icon={Table2} title="堆优化：把「找最小」换成优先队列" tone="blue">
                            朴素版每轮花 O(n) 去扫一遍找最小值，总共 O(n²)。
                            用小根堆维护候选点，取最小变成 O(log n)：
                            <br /><br />
                            <code className="font-mono font-bold">priority_queue&lt;pair&lt;int,int&gt;, vector&lt;...&gt;, greater&lt;...&gt;&gt; pq;</code>
                            <br /><br />
                            复杂度变成 <strong>O((n + m) log n)</strong>。
                            <strong>稀疏图</strong>（m 远小于 n²）上堆优化快得多；
                            <strong>稠密图</strong>（m 接近 n²）上两者差不多，朴素版还更省心。
                        </Callout>
                        <CodeBlock>{`// 堆优化 Dijkstra
priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
dist[s] = 0;
pq.push({0, s});                        // {距离, 顶点}，距离在前才能按距离排序
while (!pq.empty()) {
    auto [d, u] = pq.top(); pq.pop();
    if (d > dist[u]) continue;          // ← 关键：过期的旧记录，跳过
    for (auto [v, w] : adj[u])
        if (dist[u] + w < dist[v]) {
            dist[v] = dist[u] + w;
            pq.push({dist[v], v});      // 同一个点可能被多次入堆
        }
}`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="那句 if (d > dist[u]) continue 不能省" tone="rose">
                            同一个顶点可能被松弛多次，于是堆里会有它的<strong>多条记录</strong>，
                            距离各不相同。取出来时如果 d 比当前已知的 dist[u] 大，说明这是一条
                            <strong>过期记录</strong>，必须跳过——否则会用一个错误的旧距离去松弛邻居。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">Dijkstra 的贪心前提</h3>
                        <Callout icon={TrendingDown} title="它凭什么敢「确定」一个点" tone="blue">
                            Dijkstra 每轮挑出 dist 最小的点 u，就断定<strong>这个 dist 已经是最终答案</strong>。
                            凭什么？
                            <br /><br />
                            推理是：任何还没确定的点 v，它的 dist ≥ dist[u]。如果存在一条<strong>更短</strong>的
                            路径通向 u，这条路必然要经过某个还没确定的点 v，那么这条路的长度
                            ≥ dist[v] ≥ dist[u]——<strong>不可能更短</strong>。矛盾。
                            <br /><br />
                            注意这个推理里有个隐含假设：<strong>「继续往后走，路径长度不会变小」</strong>。
                            这要求所有边权<strong>非负</strong>。
                        </Callout>
                        <Callout icon={AlertTriangle} title="负权把这个假设直接推翻" tone="rose">
                            边权可以是负数时，「走得更远反而更短」就成立了，
                            于是 Dijkstra 提前确定的点可能是错的。看下面这个只有三条边的反例。
                        </Callout>
                        <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-5">
                            <h4 className="font-black text-rose-900">最小反例（有向图）</h4>
                            <div className="mt-2 font-mono text-sm font-bold text-rose-800">
                                1 → 2 权 1 · 1 → 3 权 2 · 3 → 2 权 −2
                            </div>
                            <ol className="mt-4 space-y-2">
                                {NEG_TRACE.map((item, index) => (
                                    <li key={item.text} className={`rounded-lg p-3 ${item.bad ? 'bg-rose-200' : 'bg-white'}`}>
                                        <div className={`text-sm font-black ${item.bad ? 'text-rose-900' : 'text-slate-800'}`}>
                                            {index + 1}. {item.text}
                                        </div>
                                        <div className={`mt-1 text-xs font-semibold leading-5 ${item.bad ? 'text-rose-800' : 'text-slate-600'}`}>
                                            {item.detail}
                                        </div>
                                    </li>
                                ))}
                            </ol>
                            <p className="mt-4 border-t border-rose-200 pt-3 text-sm font-bold text-rose-900">
                                错因不在「有负数」本身，而在<strong>顶点 2 被过早确定</strong>：
                                确定之后 Dijkstra 就不再更新它，于是后来发现的更短路径被丢掉了。
                            </p>
                        </div>
                        <Callout icon={Route} title="有负权该用什么" tone="amber">
                            <strong>Bellman-Ford</strong>：不做「确定」这个动作，而是把所有边反复松弛 n−1 轮，
                            复杂度 O(nm)。它还能<strong>检测负权环</strong>——第 n 轮仍能松弛就说明有负环
                            （沿着负环绕圈，路径可以无限变短，最短路无意义）。
                            <br />
                            <strong>SPFA</strong>：Bellman-Ford 的队列优化版，平均更快但最坏仍是 O(nm)。
                            <br /><br />
                            八级只要求知道<strong>「负权不能用 Dijkstra，要换 Bellman-Ford」</strong>这个结论和原因。
                        </Callout>
                        <PredictCheck
                            className="mt-6"
                            prompt="有向图三条边：1→2 权 1、1→3 权 2、3→2 权 −2。用 Dijkstra 从顶点 1 出发，算出的 dist[2] 是多少？正确答案又是多少？"
                            options={[
                                'Dijkstra 得 1，正确答案 0',
                                'Dijkstra 得 0，正确答案 0',
                                'Dijkstra 得 −1，正确答案 −1',
                                'Dijkstra 得 1，正确答案 1',
                            ]}
                            correctIndex={0}
                            explanation="Dijkstra 先确定顶点 1（dist=0），松弛得 dist[2]=1、dist[3]=2。下一轮未确定的点里 dist[2]=1 最小，于是把顶点 2 确定为 1。再下一轮确定顶点 3（dist=2），尝试松弛 3→2 得 2+(−2)=0 < 1——但顶点 2 已经确定，这次松弛被跳过。所以 Dijkstra 输出 1，而真正的最短路是 1→3→2 = 2−2 = 0。关键在于顶点 2 被过早确定了。"
                            misconception="容易以为「有负边就一定算错」。其实不一定——如果负边所在的路径恰好先被处理，结果可能碰巧正确。不能靠试几个例子判断，要靠原理。"
                        />
                    </>
                ),
                4: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">Floyd：三行代码求全源最短路</h3>
                        <CodeBlock>{`int g[N][N];        // g[i][j] 是 i 到 j 的边权，没有边则为 INF，g[i][i] = 0

for (int k = 1; k <= n; k++)          // ← k 必须在最外层！
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            if (g[i][k] + g[k][j] < g[i][j])
                g[i][j] = g[i][k] + g[k][j];
// 结束后 g[i][j] 就是 i 到 j 的最短距离。复杂度 O(n³)`}</CodeBlock>
                        <Callout icon={Table2} title="k 为什么必须在最外层" tone="rose">
                            这三重循环其实是一个 DP。状态的完整含义是：
                            <strong>「只允许经过编号在 1..k 之间的点做中转时，i 到 j 的最短距离」</strong>。
                            <br /><br />
                            k 在最外层，意味着<strong>逐个放开中转点</strong>：
                            先算「不许中转」，再算「只许经过 1」，再「可经过 1、2」……
                            每一轮都建立在上一轮已经完整算好的基础上。
                            <br /><br />
                            如果把 k 放到内层，某些 <code className="font-mono">g[i][k]</code> 还没被更新完
                            就被用来更新 <code className="font-mono">g[i][j]</code>，
                            相当于用没算完的中间结果做决策——结果会偏大。
                            <strong>这是八级最常考的一个细节</strong>。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">Dijkstra 还是 Floyd</h3>
                        <CompareTable
                            headers={['', 'Dijkstra（堆优化）', 'Floyd']}
                            rows={[
                                ['求什么', '单源：一个点到所有点', '全源：所有点到所有点'],
                                ['复杂度', 'O((n+m) log n)', 'O(n³)'],
                                ['存储', '邻接表', '邻接矩阵'],
                                ['负权边', '不行', '可以（但不能有负环）'],
                                ['代码量', '较长', '三行'],
                                ['适用规模', 'n 可到 10⁵', 'n ≤ 几百'],
                            ]}
                        />
                        <Callout icon={Route} title="按题目要求选" tone="blue">
                            · <strong>问「A 到 B 最短距离」或「A 到所有点」</strong> → Dijkstra。
                            <br />· <strong>问「任意两点之间」，且 n 不大（≤ 300 左右）</strong> → Floyd，三行就写完。
                            <br />· <strong>n 很大但要多次查询不同起点</strong> → 每次跑一遍 Dijkstra，别用 Floyd（n³ 会爆）。
                            <br />· <strong>有负权边</strong> → Bellman-Ford 或 Floyd。
                            <br /><br />
                            注意 n = 500 时 Floyd 是 1.25×10<sup>8</sup>，勉强能过；
                            n = 1000 就是 10<sup>9</sup>，必然超时。
                        </Callout>
                        <MiniQuiz items={[{
                            question: '松弛操作 if (dist[u]+w < dist[v]) dist[v] = dist[u]+w; 的含义是什么？',
                            answer: '试试「经过 u 到 v」是否比已知路径更短',
                            reason: 'dist[v] 存的是「目前已知」的最短距离，是一个上界。松弛就是用一条新路径去尝试压低这个上界。所有最短路算法都由松弛构成，区别只在松弛的顺序。',
                        }, {
                            question: '负权边为什么会破坏 Dijkstra？',
                            answer: '让已确定的点可能仍有更短路',
                            reason: 'Dijkstra 的贪心依赖「继续走下去路径不会变短」，因此敢把 dist 最小的点直接定死。负权让「走得更远反而更短」成立，于是过早确定的点就错了，而算法不会再更新它。',
                        }, {
                            question: 'Floyd 的三重循环，k 为什么必须在最外层？',
                            answer: 'k 是逐步放开的中转点范围',
                            reason: '状态含义是「只允许经过 1..k 做中转时的最短距离」。k 在外层保证每一轮都基于上一轮完整的结果。k 放内层会用到还没算完的 g[i][k]，结果偏大。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '把本课的 6 点 9 边图敲进代码，跑朴素 Dijkstra，每轮打印 dist 数组，与实验台核对（最终应为 0 7 9 20 20 11）。',
                                '改写成堆优化版本，验证结果一致；故意去掉 if (d > dist[u]) continue，观察是否仍然正确。',
                                '用同一张图跑 Floyd，验证第 1 行与 Dijkstra 的结果完全相同。',
                                '把 Floyd 的 k 循环挪到最内层，重新运行，观察哪些格子算错了。',
                                '构造反例 1→2 权 1、1→3 权 2、3→2 权 −2，跑 Dijkstra 得到错误的 dist[2]=1。',
                                '给同一个反例写一个 Bellman-Ford（所有边松弛 n−1 轮），验证它得出正确的 0。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt={`一道题：n 个城市、m 条双向道路，每条路有通行费。有 q 个询问，每次问「从城市 a 到城市 b 的最小花费」。给定 n ≤ 300、m ≤ 5000、q ≤ 10⁵。该选哪个算法？如果改成 n ≤ 10⁵、m ≤ 2×10⁵、q ≤ 10，答案会变吗？`}
                            hint={`注意 q 的大小。询问很多次意味着什么？先算一算两种算法的总代价。`}
                            answer={`第一种情况选 Floyd。n = 300 时 Floyd 是 300³ = 2.7×10⁷，跑一次就把所有点对的最短距离都算好了，之后每个询问 O(1) 查表，q = 10⁵ 个询问总共只要 10⁵ 次查询。总代价约 2.7×10⁷，轻松通过。

如果这里用 Dijkstra：每个询问跑一次堆优化 Dijkstra 是 O((n+m) log n) ≈ 5300 × 8 ≈ 4×10⁴，乘上 10⁵ 个询问是 4×10⁹——必然超时。即使按起点去重（最多 300 个不同起点），也要跑 300 次共 1.2×10⁷，虽然可行但比 Floyd 麻烦，还得额外写去重逻辑。

第二种情况必须换成 Dijkstra。n = 10⁵ 时 Floyd 有两个致命问题：一是时间 n³ = 10¹⁵，完全不可能；二是空间，邻接矩阵要 10¹⁰ 个 int 约 40 GB，直接爆内存。而询问只有 10 个，每次跑一遍堆优化 Dijkstra 是 (10⁵ + 2×10⁵) × 17 ≈ 5×10⁶，十次共 5×10⁷，可以接受。

结论是选择依据不只看 n 和 m，还要看 q。判断方法是把两种方案的总代价都算出来再比：Floyd 是「一次 n³ 加 q 次 O(1)」，Dijkstra 是「q 次 (n+m)log n」。q 大而 n 小时 Floyd 划算，n 大时 Floyd 连内存都放不下。`}
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能说明松弛操作的含义，知道 dist 数组存的是「目前已知」的上界',
                                '我能解释负权边为什么破坏 Dijkstra 的贪心前提，并能说出那个三边反例',
                                '我能根据点数、边数和询问次数选择 Dijkstra 或 Floyd',
                                '我知道 Floyd 的 k 必须在最外层，以及它的状态含义是「只经过 1..k 中转」',
                                '我知道堆优化里那句 if (d > dist[u]) continue 是为了跳过过期记录',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
