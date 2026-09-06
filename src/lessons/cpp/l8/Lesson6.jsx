import React, { useState } from 'react';
import { AlertTriangle, Boxes, Network, Workflow } from 'lucide-react';
import CppL8LessonSupport from '../../../components/CppL8LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '题面里没有「图」这个字' },
    { id: 2, title: '三道应用题', category: '点是什么，边是什么' },
    { id: 3, title: '模型对照表', category: '认出题型' },
    { id: 4, title: '规模与可行性', category: '先算再写' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

// 三道典型应用题的建模拆解。核心训练：读完题先回答「点是什么、边是什么」。
const PROBLEMS = [
    {
        id: 'maze',
        label: '迷宫最少步数',
        statement: 'n×m 的网格，# 可走、X 是墙。从左上走到右下，每步只能上下左右移动一格，求最少步数。',
        vertex: '每一个可走的格子 (i, j)',
        edge: '相邻且都可走的两个格子之间连一条边，边权都是 1',
        hidden: '边是隐含的——题面从没说「连边」，是「相邻可走」这个条件生成的。所以不需要真的建邻接表，用方向数组 dx/dy 现算即可。',
        model: '无权图单源最短路',
        algo: 'BFS（边权相同）',
        scale: 'n、m ≤ 1000 → 顶点最多 10⁶，BFS 是 O(nm)，可行',
    },
    {
        id: 'friend',
        label: '朋友圈个数',
        statement: 'n 个人，给出 m 对朋友关系。朋友的朋友也算同一个圈子。问一共有多少个朋友圈。',
        vertex: '每一个人',
        edge: '每一对朋友关系连一条无向边',
        hidden: '「朋友的朋友也算」这句话就是「连通性可传递」，也就是求连通块——不需要额外处理传递关系，图的连通性天然满足传递。',
        model: '无向图连通块计数',
        algo: 'DFS / BFS 逐个连通块，或并查集',
        scale: 'n ≤ 10⁵、m ≤ 2×10⁵ → 必须用邻接表；DFS 递归可能过深，建议并查集或迭代 BFS',
    },
    {
        id: 'course',
        label: '课程先修顺序',
        statement: 'n 门课，某些课有先修要求（学 B 之前必须先学 A）。问能不能排出一个合法的学习顺序。',
        vertex: '每一门课',
        edge: '「A 是 B 的先修课」连一条有向边 A → B',
        hidden: '边必须是有向的——先修关系不对称。而「能不能排出顺序」等价于「图中有没有环」：有环就说明互为先修，永远学不了。',
        model: '有向图拓扑排序 / 判环',
        algo: '拓扑排序（入度为 0 入队），排不完即有环',
        scale: 'n ≤ 10⁵ → 邻接表 + 队列，O(n + m)',
    },
];

function ModelingLab() {
    const [id, setId] = useState('maze');
    const current = PROBLEMS.find((p) => p.id === id) || PROBLEMS[0];
    const [revealed, setRevealed] = useState(false);

    const pick = (next) => { setId(next); setRevealed(false); };

    return (
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Network className="text-blue-700" aria-hidden="true" />
                <h3 className="text-xl font-black text-slate-950">建模训练：点是什么，边是什么</h3>
            </div>
            <p className="mb-5 text-sm font-semibold leading-6 text-slate-600">
                读完题面<strong>先自己回答这两个问题</strong>，再点开对照。
                这一步做对了，后面用哪个算法几乎是自动的。
            </p>

            <div className="mb-5 flex flex-wrap gap-2">
                {PROBLEMS.map((p) => (
                    <button
                        key={p.id}
                        type="button"
                        aria-pressed={id === p.id}
                        onClick={() => pick(p.id)}
                        className={`min-h-11 rounded-lg px-4 py-2 text-sm font-black transition ${id === p.id
                            ? 'bg-blue-700 text-white shadow'
                            : 'bg-white text-slate-700 ring-1 ring-blue-200 hover:bg-blue-100'}`}
                    >
                        {p.label}
                    </button>
                ))}
            </div>

            <div className="rounded-xl bg-white p-5 ring-1 ring-blue-100">
                <div className="text-xs font-black text-slate-500">题面</div>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{current.statement}</p>
            </div>

            {!revealed ? (
                <button
                    type="button"
                    onClick={() => setRevealed(true)}
                    className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-black text-white transition hover:bg-blue-800"
                >
                    我想好了，看拆解
                </button>
            ) : (
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    <div className="space-y-3">
                        <div className="rounded-xl bg-white p-4 ring-1 ring-blue-100">
                            <div className="text-xs font-black text-blue-700">顶点是什么</div>
                            <p className="mt-1 text-sm font-semibold leading-6 text-slate-700">{current.vertex}</p>
                        </div>
                        <div className="rounded-xl bg-white p-4 ring-1 ring-blue-100">
                            <div className="text-xs font-black text-blue-700">边是什么</div>
                            <p className="mt-1 text-sm font-semibold leading-6 text-slate-700">{current.edge}</p>
                        </div>
                        <div className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200">
                            <div className="text-xs font-black text-amber-800">隐含条件</div>
                            <p className="mt-1 text-sm font-semibold leading-6 text-amber-900">{current.hidden}</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="rounded-xl bg-slate-900 p-4">
                            <div className="text-xs font-bold text-slate-400">属于哪类模型</div>
                            <div className="mt-1 text-base font-black text-blue-300">{current.model}</div>
                        </div>
                        <div className="rounded-xl bg-slate-900 p-4">
                            <div className="text-xs font-bold text-slate-400">用什么算法</div>
                            <div className="mt-1 text-base font-black text-emerald-400">{current.algo}</div>
                        </div>
                        <div className="rounded-xl bg-slate-900 p-4">
                            <div className="text-xs font-bold text-slate-400">规模与可行性</div>
                            <p className="mt-1 text-sm font-bold leading-6 text-amber-300">{current.scale}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Lesson6() {
    return (
        <CppLessonShell
            lessonNumber={6}
            lessonTitle="图论基础回顾与建模"
            lessonSubtitle="难的不是算法，是看出这道题是图论题"
            accent="blue"
            levelTitle="C++ 提高"
            levelCode="L8"
            sections={sections}
            previousPath="/lesson/8/5"
            nextPath="/lesson/8/7"
            prerequisites={['完成七级第 5 至 8 课的图存储与搜索', '会用邻接表和邻接矩阵', '会估算时间与空间复杂度']}
            topSupport={<CppL8LessonSupport lessonId={6} />}
            bottomSupport={<CppL8LessonSupport lessonId={6} placement="bottom" />}
            hero={{
                title: '题面里往往没有「图」这个字',
                description: '本课训练把实际问题抽象成点与边、识别隐含边、以及按数据规模判断算法可行性。',
            }}
            goals={['能把实际问题抽象成图', '能选择合适的图存储方式', '能判断问题属于哪类图论模型']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={Network} title="八级图论题的真正难点" tone="blue">
                            七级教了图的存储、DFS、BFS。到了八级，算法本身不再是主要障碍——
                            <strong>难点变成「认出这是一道图论题」</strong>。
                            <br /><br />
                            题面会说「城市和道路」「人和朋友关系」「课程和先修要求」「状态和转移」，
                            但<strong>不会说「图」</strong>。你要自己把它翻译过来。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">建模只需回答两个问题</h3>
                        <StepList
                            title="读完题面立刻问自己"
                            steps={[
                                '顶点是什么？——通常是题目里那些「个体」：城市、人、课程、格子、状态。',
                                '边是什么？——通常是题目里那些「关系」：道路、朋友、先修、相邻、一次操作。',
                            ]}
                        />
                        <Callout icon={Workflow} title="回答完这两句，剩下的是套路" tone="amber">
                            点和边定下来之后，接着问三句：
                            <br />· 边<strong>有方向</strong>吗？（先修关系有，朋友关系没有）
                            <br />· 边<strong>有权</strong>吗？（步数没有，通行费有）
                            <br />· 要<strong>求什么</strong>？（连通性、最短路、生成树、拓扑序）
                            <br /><br />
                            这三个答案组合起来，基本就唯一确定了该用哪个算法。
                        </Callout>
                        <Callout icon={Boxes} title="最容易被忽略的一类顶点：状态" tone="rose">
                            七级第 7 课末尾那道「最多打穿 1 面墙」的题，顶点不是格子 (x, y)，
                            而是<strong>状态 (x, y, k)</strong>——k 表示已用掉几次机会。
                            <br /><br />
                            凡是「同一个位置，但你身上的条件不同，能做的事就不同」，
                            顶点就必须把那个条件<strong>包含进去</strong>。
                            这类题叫分层图，是八级建模里最容易漏的一种。
                        </Callout>
                    </>
                ),
                2: (
                    <>
                        <ModelingLab />
                        <Callout icon={AlertTriangle} title="识别隐含边" tone="rose">
                            上面三道题里，边的来源各不相同：
                            <br /><br />
                            · <strong>迷宫</strong>：边由「相邻且都可走」<strong>生成</strong>，题面没有一条条给出来。
                            这类图<strong>不需要建邻接表</strong>，用 dx/dy 方向数组现算邻居就行。
                            <br />· <strong>朋友圈</strong>：边被<strong>直接给出</strong>（m 对关系），要建邻接表或用并查集。
                            <br />· <strong>先修课</strong>：边被给出，但必须注意<strong>方向</strong>——建反了拓扑序就全错。
                            <br /><br />
                            读题时要区分「边是给出来的」还是「边是规则生成的」，
                            这决定了要不要真的建图。
                        </Callout>
                        <PredictCheck
                            className="mt-6"
                            prompt="一道题给出 n×m 网格迷宫（n、m ≤ 1000），求左上到右下的最少步数。这道题需要建邻接表存图吗？"
                            options={[
                                '需要，先把所有相邻格子的边建出来',
                                '不需要，用方向数组现算邻居',
                                '需要用邻接矩阵，因为格子是二维的',
                                '要看边权是否相同',
                            ]}
                            correctIndex={1}
                            explanation="网格的边是由「相邻」这个规则生成的，不是题目一条条给出的。用 dx[]={-1,1,0,0}、dy[]={0,0,-1,1} 现算四个邻居，比建邻接表更省空间也更省代码。建邻接表反而要存约 4×10⁶ 条边，纯属浪费。至于邻接矩阵：顶点数是 10⁶，矩阵要 10¹² 个格子，完全不可能。"
                            misconception="学过邻接表后容易形成惯性「图论题一律先建图」。网格类题目是明确的例外——边由坐标规则决定，现算即可。"
                        />
                    </>
                ),
                3: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">常见模型与对应算法</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            这张表值得抄在纸上。读完题、定下点和边之后，对照它选算法。
                        </p>
                        <CompareTable
                            headers={['题目要求什么', '模型', '算法', '学过的课']}
                            rows={[
                                ['有几个互不相连的group', '连通块计数', 'DFS / BFS / 并查集', '七级 6、八级 8'],
                                ['最少步数（每步代价相同）', '无权最短路', 'BFS', '七级 7'],
                                ['最小花费（边有权，单起点）', '带权单源最短路', 'Dijkstra', '八级 7'],
                                ['任意两点间最短距离', '全源最短路', 'Floyd', '八级 7'],
                                ['把所有点连通且总代价最小', '最小生成树', 'Prim / Kruskal', '八级 8'],
                                ['能否排出合法顺序 / 有无环', '拓扑排序', '入度为 0 入队', '本课'],
                                ['两点是否连通（多次询问）', '连通性维护', '并查集', '八级 8'],
                                ['状态之间的最少转移次数', '状态图最短路', 'BFS + 状态判重', '七级 7、8'],
                            ]}
                        />
                        <h3 className="mt-8 text-xl font-black text-slate-950">拓扑排序：本课新增的一个模型</h3>
                        <CodeBlock>{`// 有向图拓扑排序：入度为 0 的点先输出
vector<int> adj[N];
int indeg[N];

vector<int> topoSort(int n) {
    queue<int> q;
    for (int i = 1; i <= n; i++)
        if (indeg[i] == 0) q.push(i);       // 没有先修课的可以先学

    vector<int> order;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        order.push_back(u);
        for (int v : adj[u])
            if (--indeg[v] == 0) q.push(v); // 学完 u，v 少了一个先修条件
    }
    return order;      // 若 order.size() < n，说明有环，无法排出合法顺序
}`}</CodeBlock>
                        <Callout icon={Workflow} title="拓扑排序顺带就判了环" tone="blue">
                            如果图里有环，环上的每个点都至少有一个入度来自环内，
                            <strong>永远不会降到 0</strong>，于是它们都进不了队列。
                            <br /><br />
                            所以只要检查 <code className="font-mono font-bold">order.size() &lt; n</code>，
                            就知道有环——不需要另写一个判环函数。
                            这也是「课程能不能排出学习顺序」这类题的标准解法。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">先算规模，再决定写什么</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            八级的图往往比七级大。写代码前必须把两件事算清楚：
                            <strong>时间够不够、内存放不放得下</strong>。
                        </p>
                        <CompareTable
                            headers={['n 的规模', '邻接矩阵', '邻接表', 'Floyd O(n³)', 'Dijkstra 堆优化']}
                            rows={[
                                ['n ≤ 300', '可以（约 0.36 MB）', '可以', '2.7×10⁷ 可行', '可行但没必要'],
                                ['n ≤ 2000', '可以（约 16 MB）', '可以', '8×10⁹ 超时', '可行'],
                                ['n ≤ 10⁵', '爆内存（40 GB）', '必须用它', '不可能', '可行'],
                            ]}
                        />
                        <Callout icon={AlertTriangle} title="三条硬线" tone="rose">
                            · <strong>n 超过约 5000，邻接矩阵就别想了</strong>——n² 个 int 已超 100 MB。
                            <br />· <strong>Floyd 只在 n ≤ 300 左右可用</strong>——n=500 是 1.25×10⁸ 勉强，n=1000 就 10⁹ 必超。
                            <br />· <strong>DFS 递归在 n = 10⁵ 且图可能退化成链时会爆栈</strong>——改用迭代或 BFS（七级第 6 课讲过）。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">判断图的基本性质</h3>
                        <CompareTable
                            headers={['要判断什么', '怎么判']}
                            rows={[
                                ['是否连通', '从任一点 DFS/BFS，看访问到的点数是否等于 n'],
                                ['有几个连通块', '外层循环对每个未访问点各发起一次搜索，计数'],
                                ['无向图有无环', '连通块内若边数 ≥ 点数则有环；或 DFS 遇到已访问的非父节点'],
                                ['有向图有无环', '拓扑排序，若排出的点数 < n 则有环'],
                                ['是否是树', '连通 且 边数恰好等于 n − 1'],
                            ]}
                        />
                        <MiniQuiz items={[{
                            question: '网格迷宫求最少步数，顶点和边分别是什么？',
                            answer: '顶点是每个可走格子，边是相邻可走格子之间（权为 1）',
                            reason: '边由「相邻」规则生成而非题目给出，所以用 dx/dy 方向数组现算即可，不必建邻接表。边权相同，用 BFS。',
                        }, {
                            question: '有向图判环，用拓扑排序怎么判？',
                            answer: '排出的点数少于 n 就有环',
                            reason: '环上每个点的入度都有来自环内的贡献，永远降不到 0，因此进不了队列。检查 order.size() < n 即可，不需要额外写判环。',
                        }, {
                            question: 'n = 10⁵ 的图，为什么不能用邻接矩阵？',
                            answer: '需要 10¹⁰ 个格子，约 40 GB',
                            reason: '邻接矩阵空间是 n²，与边数无关。n = 10⁵ 时远超任何内存限制，必须用邻接表（空间 O(n+m)）。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '把实验台三道题的「点是什么、边是什么」先自己写在纸上，再点开对照，看有没有漏掉隐含条件。',
                                '实现网格迷宫 BFS，用方向数组而不是建邻接表，验证 n=m=1000 时内存和时间都够。',
                                '实现朋友圈计数，分别用 DFS 和并查集各写一次，对比代码量。',
                                '实现拓扑排序，故意造一个有环的输入（A→B、B→C、C→A），验证输出点数少于 n。',
                                '把先修关系的边方向建反，观察拓扑序错成什么样。',
                                '抄一份「模型与算法对照表」，遮住右列自己填。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt={`一道题：有 n 个格子排成一行，编号 1 到 n。你在 1 号格子，每次可以往前跳 1 格、往后跳 1 格、或者跳到编号是当前编号两倍的格子（不能超过 n）。求到达 n 号格子的最少跳跃次数。n ≤ 10⁵。请给出建模方案和算法，并说明为什么不能用 Dijkstra。`}
                            hint={`每次跳跃的代价都是「1 次」。顶点是什么？边是由题目给出的还是规则生成的？`}
                            answer={`建模：顶点是格子编号 1..n（共 n 个）。边由跳跃规则生成，从格子 u 出发有最多三条出边：u→u+1、u→u−1、u→2u，条件是目标编号在 1..n 之间。所有边的代价都是「1 次跳跃」，即边权全部相同。

算法用 BFS。因为边权相同，BFS 的层数就等于最少跳跃次数，第一次到达 n 时的层数就是答案（七级第 7 课证明过这一点）。复杂度 O(n)：每个格子最多入队一次，每次扩展常数条边。用 dist 数组兼作访问标记，入队时标记。

为什么不用 Dijkstra：能用，但完全没必要。Dijkstra 是为「边权不同」设计的，它要额外维护一个优先队列，复杂度变成 O(n log n)，代码也更长。边权全相同时 BFS 已经保证最优，多出的 log n 纯属浪费。判断依据很简单：先看边权是否相同——相同就 BFS，不同才考虑 Dijkstra。

一个容易漏的建模细节：u→u−1 这条反向边不能忘。少了它，「先跳过头再退回来」这类更优路径就被排除了。

具体的反例是 n = 31。三条边齐全时最少 7 步：1→2→4→8→16→15→30→31——注意第五步是 16 减到 15，正是靠这一次后退，才能接着 ×2 得到 30。如果只写 +1 和 ×2，最优解退化成 8 步：1→2→3→6→7→14→15→30→31。
这里的关键是 32 = 2⁵ 已经超过 n = 31，不允许先跳到 32 再退回，所以必须在 16 这一步就减 1。三条边缺一条，答案就偏大——这正是「识别隐含边」的训练点：题面把三种跳法都写清楚了，漏掉哪一种完全是自己建模时的失误。`}
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能读完一道应用题就说出顶点是什么、边是什么，并追问方向、权、求什么',
                                '我能识别题目中的隐含边，区分「边是给出的」还是「边是规则生成的」',
                                '我能判断图是否连通、有无环，知道有向图判环可以用拓扑排序顺带完成',
                                '我能按数据规模判断邻接矩阵会不会爆内存、Floyd 会不会超时',
                                '我知道「状态」也可以当顶点，识别出需要分层图的题',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
