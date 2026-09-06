import React, { useMemo, useState } from 'react';
import { AlertTriangle, Network, Rows3, Table2 } from 'lucide-react';
import CppL7LessonSupport from '../../../components/CppL7LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '从树到图' },
    { id: 2, title: '两种存储结构', category: '矩阵还是链表' },
    { id: 3, title: '度与握手定理', category: '数一数边' },
    { id: 4, title: '重边、自环与有向图', category: '边界情况' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

// 一张 5 个顶点的小图，贯穿全课。edges 用「无向」语义，加边时双向都记。
const VERTICES = [1, 2, 3, 4, 5];
const BASE_EDGES = [[1, 2], [1, 3], [2, 3], [2, 4], [3, 5], [4, 5]];

const GRAPH_PRESETS = [
    { id: 'sparse', label: '稀疏图：5 个点 6 条边', edges: BASE_EDGES },
    {
        id: 'dense',
        label: '稠密图：5 个点 10 条边（完全图）',
        edges: [[1, 2], [1, 3], [1, 4], [1, 5], [2, 3], [2, 4], [2, 5], [3, 4], [3, 5], [4, 5]],
    },
    { id: 'special', label: '含重边与自环：1-2 两条、3 自环', edges: [[1, 2], [1, 2], [2, 3], [3, 3], [3, 4], [4, 5]] },
];

function GraphStorageLab() {
    const [presetId, setPresetId] = useState('sparse');
    const [directed, setDirected] = useState(false);
    const preset = GRAPH_PRESETS.find((item) => item.id === presetId) || GRAPH_PRESETS[0];

    const { matrix, adjacency, degrees, edgeCount } = useMemo(() => {
        const size = VERTICES.length;
        const m = Array.from({ length: size }, () => new Array(size).fill(0));
        const adj = Object.fromEntries(VERTICES.map((v) => [v, []]));
        preset.edges.forEach(([u, v]) => {
            m[u - 1][v - 1] += 1;
            adj[u].push(v);
            if (!directed) {
                // 无向图：同一条边要在两个方向都记。自环 u==v 时只加一次，
                // 否则矩阵上会变成 2，但它本来就该在度数里算 2——见下面 degrees。
                if (u !== v) {
                    m[v - 1][u - 1] += 1;
                    adj[v].push(u);
                }
            }
        });
        // 无向图的度：邻接表长度即为度，但自环要额外加 1（它贡献 2 度）
        const deg = Object.fromEntries(VERTICES.map((v) => {
            const selfLoops = preset.edges.filter(([a, b]) => a === v && b === v).length;
            return [v, adj[v].length + (directed ? 0 : selfLoops)];
        }));
        return { matrix: m, adjacency: adj, degrees: deg, edgeCount: preset.edges.length };
    }, [preset, directed]);

    const degreeSum = Object.values(degrees).reduce((sum, value) => sum + value, 0);
    const matrixCells = VERTICES.length * VERTICES.length;
    const listCells = directed ? edgeCount : edgeCount * 2;

    return (
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Network className="text-blue-700" aria-hidden="true" />
                <h3 className="text-xl font-black text-slate-950">同一张图，两种存法</h3>
            </div>
            <p className="mb-5 text-sm font-semibold leading-6 text-slate-600">
                切换图的稀疏程度，看两种结构各占多少格子。这决定了做题时该选哪种。
            </p>

            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <div>
                    <label htmlFor="graph-preset" className="block text-sm font-black text-slate-700">选一张图</label>
                    <select
                        id="graph-preset"
                        value={presetId}
                        onChange={(event) => setPresetId(event.target.value)}
                        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold"
                    >
                        {GRAPH_PRESETS.map((item) => (
                            <option key={item.id} value={item.id}>{item.label}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-end">
                    <button
                        type="button"
                        aria-pressed={directed}
                        onClick={() => setDirected((prev) => !prev)}
                        className={`min-h-11 rounded-lg px-4 py-2 text-sm font-black transition ${directed
                            ? 'bg-blue-700 text-white shadow'
                            : 'bg-white text-slate-700 ring-1 ring-blue-200 hover:bg-blue-100'}`}
                    >
                        {directed ? '当前：有向图' : '当前：无向图'}
                    </button>
                </div>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-2">
                <div className="rounded-xl bg-white p-5 ring-1 ring-blue-100">
                    <h4 className="flex items-center gap-2 text-sm font-black text-slate-700">
                        <Table2 size={16} aria-hidden="true" /> 邻接矩阵 g[u][v]
                    </h4>
                    <div className="mt-3 overflow-x-auto">
                        <table className="text-center font-mono text-sm">
                            <thead>
                                <tr className="text-slate-400">
                                    <th className="px-2 py-1" />
                                    {VERTICES.map((v) => <th key={v} className="px-2.5 py-1 font-black">{v}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {VERTICES.map((u) => (
                                    <tr key={u}>
                                        <td className="px-2 py-1 font-black text-slate-400">{u}</td>
                                        {VERTICES.map((v) => {
                                            const value = matrix[u - 1][v - 1];
                                            return (
                                                <td key={v} className="px-1 py-1">
                                                    <span className={`flex h-8 w-8 items-center justify-center rounded font-black ${value > 0
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-slate-100 text-slate-300'}`}>
                                                        {value}
                                                    </span>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-3 text-xs font-bold text-slate-500">
                        固定占 {VERTICES.length}×{VERTICES.length} = {matrixCells} 格，与边数无关
                    </p>
                </div>

                <div className="rounded-xl bg-white p-5 ring-1 ring-blue-100">
                    <h4 className="flex items-center gap-2 text-sm font-black text-slate-700">
                        <Rows3 size={16} aria-hidden="true" /> 邻接表 adj[u]
                    </h4>
                    <ul className="mt-3 space-y-2 font-mono text-sm">
                        {VERTICES.map((u) => (
                            <li key={u} className="flex items-start gap-2">
                                <span className="w-8 shrink-0 font-black text-slate-400">{u}:</span>
                                <span className="flex flex-wrap gap-1">
                                    {adjacency[u].length === 0 && <span className="text-slate-300">（空）</span>}
                                    {adjacency[u].map((v, index) => (
                                        <span key={`${v}-${index}`} className="rounded bg-blue-600 px-2 py-0.5 font-black text-white">
                                            {v}
                                        </span>
                                    ))}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-3 text-xs font-bold text-slate-500">
                        共 {listCells} 个元素，与边数成正比
                    </p>
                </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-900 p-4">
                    <div className="text-xs font-bold text-slate-400">边数 |E|</div>
                    <div className="mt-1 text-2xl font-black text-slate-100">{edgeCount}</div>
                </div>
                <div className="rounded-xl bg-slate-900 p-4">
                    <div className="text-xs font-bold text-slate-400">{directed ? '各点出度之和' : '各点度数之和'}</div>
                    <div className="mt-1 text-2xl font-black text-amber-300">{degreeSum}</div>
                </div>
                <div className="rounded-xl bg-slate-900 p-4">
                    <div className="text-xs font-bold text-slate-400">{directed ? '出度和 ÷ 边数' : '度数和 ÷ 边数'}</div>
                    <div className="mt-1 text-2xl font-black text-emerald-400">
                        {edgeCount ? (degreeSum / edgeCount).toFixed(0) : '—'}
                    </div>
                </div>
            </div>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                {directed
                    ? '有向图里每条边只贡献 1 个出度，所以出度之和恰好等于边数。'
                    : '无向图里每条边给两个端点各贡献 1 个度（自环给同一个点贡献 2），所以度数之和恒等于边数的 2 倍——这就是握手定理。'}
            </p>
        </div>
    );
}

export default function Lesson5() {
    return (
        <CppLessonShell
            lessonNumber={5}
            lessonTitle="图的存储：邻接表与邻接矩阵"
            lessonSubtitle="稀疏用表、稠密用矩阵——先看数据范围再决定"
            accent="blue"
            levelTitle="C++ 冲刺"
            levelCode="L7"
            sections={sections}
            previousPath="/lesson/7/4"
            nextPath="/lesson/7/6"
            prerequisites={['会用二维数组', '会用 vector 存变长数据', '知道时间与空间复杂度的估算方法']}
            topSupport={<CppL7LessonSupport lessonId={5} />}
            bottomSupport={<CppL7LessonSupport lessonId={5} placement="bottom" />}
            hero={{
                title: '图是最自由的结构，也最需要选对存法',
                description: '本课讲邻接矩阵与邻接表的取舍、度数与握手定理，以及重边、自环、有向图这些容易出错的边界。',
            }}
            goals={['能用邻接表与邻接矩阵存图', '能根据稀疏或稠密选择存储方式', '能读懂图论题给出的输入格式']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={Network} title="图和树差在哪" tone="blue">
                            树是<strong>受约束的图</strong>：n 个节点恰好 n-1 条边、连通、无环、有明确的父子方向。
                            图把这些约束全部去掉——可以有环、可以不连通、边可以有方向也可以没有、
                            两点之间还能有多条边。<strong>约束一少，就必须先解决「怎么存」。</strong>
                        </Callout>
                        <p className="mt-5 text-base leading-7 text-slate-700">
                            几个贯穿后续三课的术语先定下来：<strong>顶点</strong>（vertex，记 n 或 |V|）、
                            <strong>边</strong>（edge，记 m 或 |E|）、<strong>度</strong>（degree，一个顶点连了几条边）。
                            有向图里度分成<strong>入度</strong>和<strong>出度</strong>。
                        </p>
                        <Callout icon={AlertTriangle} title="先看数据范围，再选存法" tone="amber">
                            这是图论题的第一步。题面给的 n 和 m 直接决定该用哪种结构：
                            n ≤ 1000 时邻接矩阵只要 10<sup>6</sup> 个格子，随便用；
                            但 n ≤ 100000 时矩阵要 10<sup>10</sup> 个格子，<strong>内存直接爆</strong>，
                            只能用邻接表。
                        </Callout>
                    </>
                ),
                2: (
                    <>
                        <GraphStorageLab />
                        <h3 className="mt-8 text-xl font-black text-slate-950">邻接矩阵：一个二维数组</h3>
                        <CodeBlock>{`int g[1005][1005];   // g[u][v] = 1 表示 u 到 v 有边

int n, m;
cin >> n >> m;
for (int i = 0; i < m; i++) {
    int u, v;
    cin >> u >> v;
    g[u][v] = 1;
    g[v][u] = 1;     // 无向图必须双向都置 1，漏掉这行是最常见的错
}

// 查询 u 和 v 之间有没有边：O(1)
if (g[u][v]) { /* ... */ }
// 遍历 u 的所有邻居：O(n)，即使 u 只有一个邻居也要扫 n 格
for (int v = 1; v <= n; v++) if (g[u][v]) { /* ... */ }`}</CodeBlock>

                        <h3 className="mt-8 text-xl font-black text-slate-950">邻接表：每个点挂一串邻居</h3>
                        <CodeBlock>{`vector<int> adj[100005];   // adj[u] 存 u 的所有邻居

int n, m;
cin >> n >> m;
for (int i = 0; i < m; i++) {
    int u, v;
    cin >> u >> v;
    adj[u].push_back(v);
    adj[v].push_back(u);   // 同样，无向图要加两次
}

// 遍历 u 的所有邻居：O(deg(u))，只走实际存在的边
for (int v : adj[u]) { /* ... */ }
// 但查询 u、v 之间有没有边：O(deg(u))，要扫一遍链`}</CodeBlock>
                        <Callout icon={Rows3 } title="带权图只要把元素换成 pair" tone="blue">
                            <code className="font-mono font-bold">vector&lt;pair&lt;int,int&gt;&gt; adj[N];</code>，
                            存 <code className="font-mono">{'{'}邻居, 边权{'}'}</code>。
                            遍历写成 <code className="font-mono">for (auto [v, w] : adj[u])</code>。
                            八级的最短路和最小生成树都建在这个结构上。
                        </Callout>
                        <CompareTable
                            headers={['操作', '邻接矩阵', '邻接表']}
                            rows={[
                                ['空间', 'O(n²)，与边数无关', 'O(n + m)'],
                                ['查 u、v 是否相邻', 'O(1)', 'O(deg(u))'],
                                ['遍历 u 的所有邻居', 'O(n)', 'O(deg(u))'],
                                ['遍历整张图', 'O(n²)', 'O(n + m)'],
                                ['适合', '稠密图、n 小（≤ 2000）', '稀疏图、n 大'],
                            ]}
                        />
                        <PredictCheck
                            className="mt-6"
                            prompt="一道题给出 n ≤ 100000 个顶点、m ≤ 200000 条边。用邻接矩阵存需要多少个 int？"
                            options={['约 2×10⁵', '约 4×10⁵', '约 10¹⁰', '约 10⁵']}
                            correctIndex={2}
                            explanation="邻接矩阵的空间是 n²，与边数完全无关。n = 10⁵ 时 n² = 10¹⁰ 个 int，约 40 GB——远超任何评测机的内存限制。而邻接表只需 n + 2m ≈ 5×10⁵ 个元素，几 MB 就够。看到 n 上十万，必须用邻接表。"
                            misconception="容易把空间按边数估成 2×10⁵。邻接矩阵的格子数只由顶点数决定，一条边都不加也要占满 n²。"
                        />
                    </>
                ),
                3: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">握手定理：度数之和 = 边数 × 2</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            无向图里，每条边都连着两个端点，给<strong>各端点各贡献 1 个度</strong>。
                            所以把所有顶点的度加起来，每条边都被数了正好两次：
                        </p>
                        <div className="mt-4 rounded-xl bg-slate-900 p-5 text-center">
                            <span className="font-mono text-lg font-black text-amber-300">
                                Σ deg(v) = 2 × |E|
                            </span>
                        </div>
                        <Callout icon={Table2} title="一个直接推论：奇度顶点必有偶数个" tone="blue">
                            度数之和是偶数（2|E|）。偶度顶点加起来仍是偶数，
                            那么剩下的奇度顶点之和也必须是偶数——<strong>奇数个奇数相加得奇数</strong>，
                            所以奇度顶点的个数只能是偶数。这个结论在判断「一笔画」（欧拉路）时会用到。
                        </Callout>
                        <p className="mt-5 text-base leading-7 text-slate-700">
                            有向图不一样：每条边贡献 1 个出度和 1 个入度，所以
                            <strong>出度之和 = 入度之和 = |E|</strong>，不是 2|E|。
                            上面的实验台可以切换有向/无向，对照这两条式子。
                        </p>
                        <CodeBlock>{`// 用邻接表统计每个点的度并验证握手定理
int degreeSum = 0;
for (int u = 1; u <= n; u++) {
    int deg = adj[u].size();
    cout << u << " 的度是 " << deg << '\\n';
    degreeSum += deg;
}
cout << "度数之和 = " << degreeSum
     << "，边数 × 2 = " << m * 2 << '\\n';   // 无向图里两者必然相等`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="邻接矩阵里怎么算度" tone="amber">
                            无向图：<code className="font-mono">deg(u)</code> 是第 u 行的和。
                            有向图：第 u 行的和是<strong>出度</strong>，第 u 列的和是<strong>入度</strong>。
                            记混行列是考试里的常见失分点。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">三种容易翻车的边界</h3>
                        <Callout icon={AlertTriangle} title="重边（multiple edges）" tone="rose">
                            两点之间有多条边。<strong>邻接矩阵会丢信息</strong>——
                            <code className="font-mono">g[u][v] = 1</code> 执行两次结果还是 1，第二条边消失了。
                            如果题目在意重边（比如求最短路时两条边权不同），
                            要么把矩阵改成存<strong>计数</strong>或<strong>最小边权</strong>，要么直接用邻接表。
                            邻接表天然支持重边：push_back 两次就是两条。
                        </Callout>
                        <Callout icon={AlertTriangle} title="自环（self loop）" tone="rose">
                            一条边从 u 连回 u 自己。两个坑：
                            <br />① 加边时如果无脑写两遍 <code className="font-mono">adj[u].push_back(v); adj[v].push_back(u);</code>，
                            u == v 时同一条自环会被记两次。
                            <br />② 度数上，<strong>一个自环给该顶点贡献 2 个度</strong>（两端都在它身上），
                            握手定理才成立。
                        </Callout>
                        <Callout icon={AlertTriangle} title="有向图与无向图的建边差别" tone="rose">
                            无向图<strong>必须</strong>双向加边，有向图<strong>只能</strong>单向加。
                            把有向图当无向图建（多加了反向边）会让不该连通的点连通；
                            把无向图当有向图建（漏了反向边）会让搜索走不回去。
                            这是图论题最高频的一类 bug，而且往往在小样例上看不出来。
                        </Callout>
                        <CodeBlock>{`// 一个能同时处理自环的安全写法
void addEdge(int u, int v, bool directed) {
    adj[u].push_back(v);
    if (!directed && u != v) adj[v].push_back(u);   // 自环不重复加
}`}</CodeBlock>
                        <MiniQuiz items={[{
                            question: '一张无向图有 6 个顶点，各点度数为 3、3、2、2、1、1。它有多少条边？',
                            answer: '6 条',
                            reason: '由握手定理，度数之和 = 2|E|。3+3+2+2+1+1 = 12，所以 |E| = 12 / 2 = 6。',
                        }, {
                            question: 'n = 100000、m = 200000 的图，该用邻接矩阵还是邻接表？',
                            answer: '邻接表',
                            reason: '邻接矩阵要 n² = 10¹⁰ 个格子，内存必爆。邻接表只需 O(n + m) ≈ 5×10⁵ 个元素。',
                        }, {
                            question: '无向图里一个自环给它所在的顶点贡献几个度？',
                            answer: '2 个',
                            reason: '自环的两个端点都是同一个顶点，各贡献 1 度。只有这样算，握手定理 Σdeg = 2|E| 才对自环成立。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '把本课的 5 点 6 边小图分别用邻接矩阵和邻接表存下来，各自打印出来核对。',
                                '写一段代码统计每个顶点的度，并输出「度数之和」与「边数 × 2」验证握手定理。',
                                '把同一份输入按有向图再建一次，对比出度之和与边数的关系。',
                                '故意漏写无向图的反向加边，观察从顶点 5 出发的搜索会漏掉哪些点。',
                                '给加边函数补上自环判断，用「3 连到 3」这条边测试度数是否算成 2。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt="某题给出 n ≤ 2000 个顶点、m ≤ 10⁶ 条边，且需要频繁查询「任意两点之间是否直接相连」。该选哪种存储？为什么？如果改成 n ≤ 10⁵、m ≤ 2×10⁵ 且只需要遍历每个点的邻居，答案会变吗？"
                            hint="分别算一算两种结构的空间，再看题目要的是「随机查询」还是「顺序遍历」。"
                            answer="第一种情况选邻接矩阵。n = 2000 时矩阵是 4×10⁶ 个格子（约 16 MB，可接受），而它的查询是 O(1)；若用邻接表，m 高达 10⁶ 意味着某些点的度可能很大，每次查询要 O(deg(u)) 扫一遍链，频繁查询会很慢。第二种情况必须换成邻接表：n = 10⁵ 时矩阵要 10¹⁰ 个格子，内存直接爆；而只做邻居遍历正是邻接表的强项，总代价 O(n + m)。结论是存储方式由「数据范围 + 主要操作」共同决定，不存在哪种绝对更好。"
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能说出邻接矩阵与邻接表的空间复杂度差别，并据此按数据范围选结构',
                                '我能正确处理重边与自环，知道自环在度数上算 2',
                                '我知道有向图与无向图在建边上的区别，以及漏写反向边会导致什么后果',
                                '我能用握手定理由度数反推边数，并说明为什么奇度顶点必有偶数个',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
