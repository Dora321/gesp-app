import React, { useMemo, useState } from 'react';
import { AlertTriangle, GitMerge, Link2, TreePine } from 'lucide-react';
import CppL8LessonSupport from '../../../components/CppL8LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '生成树是什么' },
    { id: 2, title: 'Kruskal 选边', category: '排序加判环' },
    { id: 3, title: '并查集', category: '判环靠它' },
    { id: 4, title: 'Prim 与选择', category: '稀疏还是稠密' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

const N = 6;
// 与第 7 课同一张图，方便对照：那里求最短路，这里求最小生成树。
const EDGES = [
    [1, 2, 7], [1, 3, 9], [1, 6, 14], [2, 3, 10],
    [2, 4, 15], [3, 4, 11], [3, 6, 2], [4, 5, 6], [5, 6, 9],
];

// Kruskal 完整轨迹。总权重 33、恰好 5 条边，都是跑出来验证过的。
function runKruskal() {
    const sorted = [...EDGES].sort((a, b) => a[2] - b[2]);
    const fa = Array.from({ length: N + 1 }, (_, i) => i);
    const find = (x) => (fa[x] === x ? x : (fa[x] = find(fa[x])));
    const steps = [];
    let total = 0;
    let picked = 0;

    sorted.forEach(([u, v, w]) => {
        const ru = find(u);
        const rv = find(v);
        if (ru === rv) {
            steps.push({ u, v, w, taken: false, total, picked, groups: fa.slice(1).map((_, i) => find(i + 1)) });
            return;
        }
        fa[ru] = rv;
        total += w;
        picked += 1;
        steps.push({ u, v, w, taken: true, total, picked, groups: fa.slice(1).map((_, i) => find(i + 1)) });
    });
    return { steps, total, picked };
}

const GROUP_COLORS = ['bg-emerald-500', 'bg-blue-500', 'bg-amber-500', 'bg-violet-500', 'bg-rose-500', 'bg-cyan-500'];

function KruskalLab() {
    const { steps, total, picked } = useMemo(() => runKruskal(), []);
    const [index, setIndex] = useState(steps.length - 1);
    const current = steps[index];

    // 把根编号映射成 0..k，用于上色
    const colorOf = useMemo(() => {
        const roots = [...new Set(current.groups)];
        return (v) => GROUP_COLORS[roots.indexOf(current.groups[v - 1]) % GROUP_COLORS.length];
    }, [current]);

    return (
        <div className="rounded-2xl border border-lime-100 bg-lime-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <GitMerge className="text-lime-700" aria-hidden="true" />
                <h3 className="text-xl font-black text-slate-950">Kruskal 的选边过程</h3>
            </div>
            <p className="mb-5 text-sm font-semibold leading-6 text-slate-600">
                把 9 条边<strong>按权升序</strong>逐条考察：两端不在同一集合就选，
                在同一集合就说明会成环，跳过。下面顶点的颜色表示当前所属的连通集合。
            </p>

            <div className="rounded-xl bg-white p-5 ring-1 ring-lime-100">
                <div className="mb-4 flex flex-wrap gap-2">
                    {Array.from({ length: N }, (_, i) => (
                        <span
                            key={i}
                            className={`flex h-10 w-10 items-center justify-center rounded-lg font-mono text-sm font-black text-white transition ${colorOf(i + 1)}`}
                        >
                            {i + 1}
                        </span>
                    ))}
                </div>
                <p className="text-xs font-bold text-slate-500">
                    同色 = 已经连通。全部同色时生成树就完成了。
                </p>

                <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[22rem] text-left text-sm">
                        <thead className="text-slate-400">
                            <tr>
                                <th className="px-2 py-1.5 font-black">边</th>
                                <th className="px-2 py-1.5 font-black">权</th>
                                <th className="px-2 py-1.5 font-black">决定</th>
                            </tr>
                        </thead>
                        <tbody className="font-mono">
                            {steps.slice(0, index + 1).map((s) => (
                                <tr key={`${s.u}-${s.v}`} className="border-t border-slate-100">
                                    <td className="px-2 py-1.5 font-black text-slate-700">{s.u}–{s.v}</td>
                                    <td className="px-2 py-1.5 text-slate-600">{s.w}</td>
                                    <td className={`px-2 py-1.5 font-black ${s.taken ? 'text-emerald-700' : 'text-rose-700'}`}>
                                        {s.taken ? `选中（累计 ${s.total}）` : '跳过：会成环'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <label htmlFor="kruskal-step" className="mt-4 block text-sm font-black text-slate-700">
                    已考察 {index + 1} / {steps.length} 条边
                </label>
                <input
                    id="kruskal-step"
                    type="range" min="0" max={steps.length - 1} step="1"
                    value={index}
                    onChange={(event) => setIndex(Number(event.target.value))}
                    className="mt-2 w-full"
                />
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-900 p-4">
                    <div className="text-xs font-bold text-slate-400">已选边数</div>
                    <div className="mt-1 font-mono text-2xl font-black text-lime-300">{current.picked} / {N - 1}</div>
                </div>
                <div className="rounded-xl bg-slate-900 p-4">
                    <div className="text-xs font-bold text-slate-400">当前总权重</div>
                    <div className="mt-1 font-mono text-2xl font-black text-slate-100">{current.total}</div>
                </div>
                <div className="rounded-xl bg-slate-900 p-4">
                    <div className="text-xs font-bold text-slate-400">最终 MST 权重</div>
                    <div className="mt-1 font-mono text-2xl font-black text-emerald-400">{total}</div>
                </div>
            </div>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                最终选中 {picked} 条边（= n − 1 = {N - 1}），总权重 {total}。
                注意被跳过的边并不是「权太大」，而是<strong>两端已经连通了</strong>——再连就成环。
            </p>
        </div>
    );
}

export default function Lesson8() {
    return (
        <CppLessonShell
            lessonNumber={8}
            lessonTitle="最小生成树：Prim 与 Kruskal"
            lessonSubtitle="用最小的代价把所有点连起来，且不留环"
            accent="lime"
            levelTitle="C++ 提高"
            levelCode="L8"
            sections={sections}
            previousPath="/lesson/8/7"
            nextPath="/lesson/8/9"
            prerequisites={['完成上一课的 Dijkstra', '会用 sort 加自定义比较函数', '知道树的边数是 n−1']}
            topSupport={<CppL8LessonSupport lessonId={8} />}
            bottomSupport={<CppL8LessonSupport lessonId={8} placement="bottom" />}
            hero={{
                title: '不是求最短路，是求「连通的总代价最小」',
                description: '本课讲生成树的性质、Kruskal 的排序加判环、并查集的实现与路径压缩，以及两种算法的选择。',
            }}
            goals={['能说明生成树的定义与性质', '能实现 Prim 与 Kruskal', '能用并查集维护连通性']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={TreePine} title="最小生成树在求什么" tone="blue">
                            给一张连通的带权无向图，要<strong>选出一部分边</strong>，使得：
                            <br />① 所有顶点仍然连通；② 选出的边的<strong>总权重最小</strong>。
                            <br /><br />
                            典型场景：n 个村庄要通电，给出任意两村之间架线的成本，
                            问最少花多少钱能让所有村庄都通上电。
                        </Callout>
                        <Callout icon={AlertTriangle} title="和最短路是完全不同的问题" tone="rose">
                            上一课的 Dijkstra 求「<strong>某一个点</strong>到其他点各自的最短距离」。
                            <br />
                            本课的 MST 求「让<strong>所有点</strong>连通的总代价最小」。
                            <br /><br />
                            两者的解通常<strong>不一样</strong>。用同一张图对比：
                            上一课 Dijkstra 从顶点 1 出发得到 dist = 0 7 9 20 20 11；
                            本课的 MST 总权重是 33，它<strong>不保证任何一对点之间是最短路</strong>——
                            MST 上 1 到 5 的路径可能比图中的最短路更长。
                            <br /><br />
                            <strong>MST 优化的是「边权总和」，不是「点对之间的距离」。</strong>
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">为什么 MST 恰好有 n − 1 条边</h3>
                        <Callout icon={TreePine} title="生成树的定义就锁定了边数" tone="blue">
                            「生成树」= 包含<strong>全部 n 个顶点</strong>的<strong>树</strong>。
                            而树的定义是「连通且无环」。
                            <br /><br />
                            推理：从 n 个孤立的点开始，每加一条<strong>有效边</strong>（连接两个不同的连通块），
                            连通块数就<strong>减少 1</strong>。要从 n 个块合并成 1 个块，
                            必须恰好加 <strong>n − 1</strong> 条有效边。
                            <br /><br />
                            少于 n−1 条 → 还没连通；多于 n−1 条 → 必然出现环（这是抽屉原理的直接结果）。
                            所以生成树的边数<strong>不可能是别的数</strong>。
                        </Callout>
                    </>
                ),
                2: (
                    <>
                        <KruskalLab />
                        <h3 className="mt-8 text-xl font-black text-slate-950">Kruskal：两步而已</h3>
                        <StepList
                            title="算法全貌"
                            steps={[
                                '把所有边按权重从小到大排序。',
                                '逐条考察：如果这条边的两个端点还不连通，就选它；已经连通就跳过（否则成环）。',
                                '选够 n − 1 条边就停（此时全部点已连通）。',
                            ]}
                        />
                        <CodeBlock>{`struct Edge { int u, v, w; };
Edge e[M];
int fa[N];

int find(int x) { return fa[x] == x ? x : fa[x] = find(fa[x]); }

int kruskal(int n, int m) {
    sort(e, e + m, [](const Edge& a, const Edge& b) { return a.w < b.w; });
    for (int i = 1; i <= n; i++) fa[i] = i;      // 初始每点各自一个集合

    int total = 0, cnt = 0;
    for (int i = 0; i < m; i++) {
        int ru = find(e[i].u), rv = find(e[i].v);
        if (ru == rv) continue;                  // 已连通 → 跳过，否则成环
        fa[ru] = rv;                             // 合并两个集合
        total += e[i].w;
        if (++cnt == n - 1) break;               // 选够了
    }
    return cnt == n - 1 ? total : -1;            // -1 表示原图不连通
}
// 复杂度：排序 O(m log m) 是瓶颈，并查集操作近似 O(1)`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="Kruskal 为什么必须判环" tone="rose">
                            如果不判环，会出现这种情况：1–2、2–3 都已选中，此时 1–3 这条边的两端
                            <strong>本来就已经连通了</strong>。选它不会让任何新的点加入，
                            却<strong>白白增加了权重</strong>，同时制造出一个环。
                            <br /><br />
                            上面实验台里被跳过的那些边就是这种情况。注意它们不是因为「权太大」被跳过——
                            <strong>是因为两端已经在同一个集合里</strong>。
                        </Callout>
                        <PredictCheck
                            className="mt-6"
                            prompt="6 个顶点的图跑 Kruskal，最终选中的边数是多少？如果选够之前就发现所有剩余边都会成环，说明什么？"
                            options={[
                                '5 条；说明原图不连通',
                                '6 条；说明有重边',
                                '5 条；说明输入有误',
                                '取决于边权大小',
                            ]}
                            correctIndex={0}
                            explanation="生成树必然有 n−1 = 5 条边。如果所有边都考察完了却不足 5 条，说明这些点无法全部连通——原图本身就不是连通图，此时不存在生成树，应返回 -1 或输出「无解」。代码里 return cnt == n-1 ? total : -1; 这一句就是在处理这种情况，很多人会漏掉它。"
                            misconception="容易只关注权重而忘了检查边数。连通性检查是 Kruskal 的必要收尾，不然不连通的图会返回一个「部分森林」的权重和。"
                        />
                    </>
                ),
                3: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">并查集：维护「谁和谁连通」</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            Kruskal 需要反复回答「这两个点连通吗」并「把两个集合合并」。
                            并查集（Disjoint Set Union）就是为这两个操作设计的。
                        </p>
                        <CodeBlock>{`int fa[N];

// 初始化：每个点自成一个集合，自己是自己的代表
for (int i = 1; i <= n; i++) fa[i] = i;

// 查找：一路往上找代表元（根）
int find(int x) {
    if (fa[x] == x) return x;
    return fa[x] = find(fa[x]);      // ← 路径压缩：顺手把整条链挂到根上
}

// 合并：把 x 的根挂到 y 的根下面
void merge(int x, int y) { fa[find(x)] = find(y); }

// 判断连通：两者的根是否相同
bool same(int x, int y) { return find(x) == find(y); }`}</CodeBlock>
                        <Callout icon={Link2} title="路径压缩起什么作用" tone="blue">
                            没有压缩时，树可能退化成一条长链：1 → 2 → 3 → … → n。
                            此时 find(1) 要走 n 步，<strong>单次操作 O(n)</strong>。
                            <br /><br />
                            <code className="font-mono font-bold">fa[x] = find(fa[x])</code> 这个写法很巧妙：
                            递归回来的路上，<strong>把这条路径上的每个点都直接挂到根上</strong>。
                            <br /><br />
                            于是同一条路径第二次查询就只有一步。加上路径压缩后，
                            单次操作的<strong>均摊复杂度接近 O(1)</strong>
                            （严格说是反阿克曼函数，实际上小于 5）。
                        </Callout>
                        <div className="mt-5 grid gap-4 md:grid-cols-2">
                            <div className="rounded-xl border border-rose-200 bg-rose-50 p-5">
                                <h4 className="text-sm font-black text-rose-900">压缩前：链</h4>
                                <div className="mt-3 font-mono text-xs text-rose-800">
                                    5 → 4 → 3 → 2 → 1（根）
                                    <br /><br />find(5) 要走 4 步
                                </div>
                            </div>
                            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                                <h4 className="text-sm font-black text-emerald-900">压缩后：全部直连根</h4>
                                <div className="mt-3 font-mono text-xs text-emerald-800">
                                    5 → 1，4 → 1，3 → 1，2 → 1
                                    <br /><br />之后任何 find 都是 1 步
                                </div>
                            </div>
                        </div>
                        <Callout icon={AlertTriangle} title="并查集只能合并，不能分离" tone="amber">
                            它支持「把两个集合并成一个」，但<strong>不支持把一个集合拆开</strong>。
                            所以遇到「删边之后问连通性」这类题，并查集直接用不了——
                            常见技巧是<strong>把操作离线倒序处理</strong>，把删边变成加边。
                            八级不要求这个技巧，但要知道并查集的这个局限。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">Prim：从一个点开始长出去</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            Kruskal 的视角是「<strong>边</strong>」——按权排序逐条挑。
                            Prim 的视角是「<strong>点</strong>」——像 Dijkstra 那样从一个点开始，
                            每次把「离当前树最近的点」拉进来。
                        </p>
                        <CodeBlock>{`int g[N][N];        // 邻接矩阵
int dis[N];         // dis[v] = v 到「当前这棵树」的最短距离（注意不是到起点）
bool inTree[N];

int prim(int n) {
    memset(dis, 0x3f, sizeof(dis));
    dis[1] = 0;
    int total = 0;
    for (int it = 0; it < n; it++) {
        int u = -1;
        for (int i = 1; i <= n; i++)            // 找离树最近的点
            if (!inTree[i] && (u == -1 || dis[i] < dis[u])) u = i;
        if (dis[u] == 0x3f3f3f3f) return -1;    // 图不连通
        inTree[u] = true;
        total += dis[u];
        for (int v = 1; v <= n; v++)            // 用 u 更新其余点到树的距离
            if (!inTree[v] && g[u][v] < dis[v]) dis[v] = g[u][v];
    }
    return total;
}
// 复杂度 O(n²)，与边数无关`}</CodeBlock>
                        <Callout icon={GitMerge} title="Prim 和 Dijkstra 长得很像，但 dis 的含义不同" tone="rose">
                            这是最容易混的一点：
                            <br /><br />
                            · <strong>Dijkstra</strong>：<code className="font-mono">dis[v]</code> 是「v 到<strong>起点</strong>的距离」，
                            松弛时写 <code className="font-mono">dis[u] + w &lt; dis[v]</code>——<strong>要累加</strong>。
                            <br />· <strong>Prim</strong>：<code className="font-mono">dis[v]</code> 是「v 到<strong>整棵树</strong>的距离」，
                            更新时写 <code className="font-mono">w &lt; dis[v]</code>——<strong>不累加</strong>。
                            <br /><br />
                            写 Prim 时误加上 <code className="font-mono">dis[u]</code> 是高频错误，
                            结果会变成一个奇怪的最短路，不是 MST。
                        </Callout>
                        <CompareTable
                            headers={['', 'Kruskal', 'Prim（朴素）']}
                            rows={[
                                ['视角', '边：排序后逐条挑', '点：每次拉最近的点进来'],
                                ['复杂度', 'O(m log m)', 'O(n²)'],
                                ['存储', '边表', '邻接矩阵'],
                                ['需要', '并查集', '不需要额外结构'],
                                ['适合', '稀疏图（m 小）', '稠密图（m 接近 n²）'],
                                ['不连通时', 'cnt < n−1', 'dis[u] 仍是 INF'],
                            ]}
                        />
                        <Callout icon={TreePine} title="怎么选" tone="blue">
                            · <strong>稀疏图</strong>（如 n = 10⁵、m = 2×10⁵）→ Kruskal，O(m log m) ≈ 3.5×10⁶。
                            用 Prim 朴素版是 10¹⁰，不可能。
                            <br />· <strong>稠密图</strong>（如 n = 1000、m ≈ 5×10⁵）→ Prim，O(n²) = 10⁶。
                            Kruskal 要排 5×10⁵ 条边，也能过但常数更大。
                            <br /><br />
                            实战中 Kruskal 用得更多：代码更短、更好写，而且大多数题的图是稀疏的。
                        </Callout>
                        <MiniQuiz items={[{
                            question: '为什么最小生成树恰好有 n−1 条边？',
                            answer: '每加一条有效边使连通块减 1',
                            reason: '从 n 个孤立点开始，每条连接不同连通块的边使块数减 1，从 n 块合并到 1 块正好需要 n−1 条。少了不连通，多了必然成环。',
                        }, {
                            question: 'Kruskal 为什么要判环？',
                            answer: '两端已连通的边只增权重不增连通性',
                            reason: '若两端已在同一集合，选它不会让新的点加入，只会白白增加总权重并制造环。用并查集比较两端的根即可判断。',
                        }, {
                            question: '并查集路径压缩的作用是什么？',
                            answer: '把查询路径上的点直接挂到根，避免退化成链',
                            reason: 'fa[x] = find(fa[x]) 在递归返回时把整条路径压平。没有压缩时树可能退化成长链，单次 find 是 O(n)；压缩后均摊接近 O(1)。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '把本课的 6 点 9 边图敲进代码，跑 Kruskal，打印每条边的取舍，与实验台核对（总权重应为 33，选中 5 条）。',
                                '实现并查集的 find 和 merge，先不加路径压缩，打印每次 find 走了几步。',
                                '加上路径压缩，对比同一组查询的步数变化。',
                                '故意去掉 Kruskal 的判环，观察总权重变成多少、是否出现环。',
                                '删掉图里的边 3–6 和 5–6 让图变得不连通，验证代码返回 -1 而不是一个错误的权重和。',
                                '用同一张图实现 Prim，验证总权重也是 33；再故意把更新写成 dis[u] + g[u][v] < dis[v]，看结果错成什么。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt={`一道题：n 个村庄要通水。可以在某个村庄自己打井，费用为 w[i]；也可以在两个村庄之间铺管道，费用为 c[i][j]。求让所有村庄都有水的最小总费用。n ≤ 300。这看起来不像 MST，该怎么建模？`}
                            hint={`打井和铺管道是两种不同的操作，但都要花钱。有没有办法把「打井」也变成一条边？`}
                            answer={`建模的关键是引入一个虚拟顶点。设一个编号为 0 的「水源」节点，把「在村庄 i 打井」看成一条从 0 到 i 的边，权重为 w[i]。铺管道则是村庄之间的普通边，权重 c[i][j]。

这样原问题就转化成了标准 MST：在这张 n+1 个顶点的图上求最小生成树。为什么等价？因为「所有村庄都有水」等价于「每个村庄都能顺着管道追溯到某个水源」，也就是「所有村庄都与 0 号节点连通」；而让 n+1 个点连通且总代价最小，正是 MST 的定义。

生成树会有 (n+1) − 1 = n 条边。其中连到 0 号节点的那些边对应实际打的井，村庄之间的边对应铺的管道。MST 会自动权衡：如果某个村庄离所有村庄都很远而自己打井便宜，算法就会选 0→i 这条边；反之则选管道。

规模上 n ≤ 300，加上虚拟点是 301 个顶点，边数约 301²/2 ≈ 4.5×10⁴——这是一张稠密图，用 Prim 的 O(n²) ≈ 9×10⁴ 最合适；Kruskal 也能过（排序 4.5×10⁴ 条边），但稠密图上 Prim 更直接。

这道题体现的技巧叫「超级源点」，是图论建模里最常用的一招：当题目里有一种「凭空产生」的操作（打井、免费起点、任选起点），就造一个虚拟点把它变成边。上一课末尾提到过 n 大时不能用 Floyd，这里同理——建模改变的是图的结构，规模判断的方法不变。`}
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能说明为什么 MST 恰好有 n−1 条边，以及它和最短路优化的目标不同',
                                '我能解释 Kruskal 为什么要判环，被跳过的边不是因为权太大',
                                '我能说出并查集路径压缩的作用，以及它为什么能把复杂度降到近似 O(1)',
                                '我能根据稀疏还是稠密选择 Kruskal 或 Prim',
                                '我知道 Prim 的 dis 是「到整棵树的距离」，不能像 Dijkstra 那样累加',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
