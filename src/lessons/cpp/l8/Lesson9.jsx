import React, { useMemo, useState } from 'react';
import { AlertTriangle, Grid3x3, Layers, TreeDeciduous } from 'lucide-react';
import CppL8LessonSupport from '../../../components/CppL8LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '两类新的 DP' },
    { id: 2, title: '区间 DP', category: '按长度枚举' },
    { id: 3, title: '石子合并填表', category: '看清依赖关系' },
    { id: 4, title: '树形 DP', category: '递归顺序就是转移顺序' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

const STONES = [4, 5, 9, 4];

// 石子合并区间 DP。答案 44 与各中间值都是跑出来验证过的。
function buildIntervalDp(values) {
    const n = values.length;
    const prefix = [0];
    values.forEach((v, i) => prefix.push(prefix[i] + v));
    const dp = Array.from({ length: n }, () => new Array(n).fill(0));
    const split = Array.from({ length: n }, () => new Array(n).fill(-1));
    const stages = [];

    for (let len = 2; len <= n; len += 1) {
        const cells = [];
        for (let i = 0; i + len - 1 < n; i += 1) {
            const j = i + len - 1;
            dp[i][j] = Infinity;
            const sum = prefix[j + 1] - prefix[i];
            const tries = [];
            for (let k = i; k < j; k += 1) {
                const cost = dp[i][k] + dp[k + 1][j] + sum;
                tries.push({ k, cost, left: dp[i][k], right: dp[k + 1][j] });
                if (cost < dp[i][j]) { dp[i][j] = cost; split[i][j] = k; }
            }
            cells.push({ i, j, len, sum, value: dp[i][j], best: split[i][j], tries });
        }
        stages.push({ len, cells, dp: dp.map((row) => [...row]) });
    }
    return { dp, stages, answer: dp[0][n - 1] };
}

function IntervalDpLab() {
    const { stages, answer } = useMemo(() => buildIntervalDp(STONES), []);
    const [stageIndex, setStageIndex] = useState(stages.length - 1);
    const stage = stages[stageIndex];
    const n = STONES.length;

    return (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Grid3x3 className="text-rose-700" aria-hidden="true" />
                <h3 className="text-xl font-black text-slate-950">石子合并：按区间长度填表</h3>
            </div>
            <p className="mb-5 text-sm font-semibold leading-6 text-slate-600">
                石子堆 {STONES.join('、')}。每次只能合并<strong>相邻两堆</strong>，
                代价是两堆之和；求全部合成一堆的最小总代价。
                <code className="font-mono font-bold">dp[i][j]</code> = 把第 i 到 j 堆合成一堆的最小代价。
            </p>

            <div className="rounded-xl bg-white p-5 ring-1 ring-rose-100">
                <div className="overflow-x-auto">
                    <table className="mx-auto text-center font-mono text-sm">
                        <thead className="text-slate-400">
                            <tr>
                                <th className="px-2 py-1.5 text-left font-black">i \ j</th>
                                {Array.from({ length: n }, (_, j) => (
                                    <th key={j} className="px-2 py-1.5 font-black">{j}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: n }, (_, i) => (
                                <tr key={i} className="border-t border-slate-100">
                                    <td className="px-2 py-1.5 text-left font-black text-slate-400">{i}</td>
                                    {Array.from({ length: n }, (_, j) => {
                                        if (j < i) return <td key={j} className="px-1 py-1.5" />;
                                        const filled = j - i + 1 <= stage.len;
                                        const isCurrent = stage.cells.some((c) => c.i === i && c.j === j);
                                        return (
                                            <td key={j} className="px-1 py-1.5">
                                                <span className={`flex h-10 w-12 items-center justify-center rounded font-black ${isCurrent
                                                    ? 'bg-rose-700 text-white ring-2 ring-rose-300'
                                                    : filled
                                                        ? 'bg-rose-100 text-rose-900'
                                                        : 'bg-slate-50 text-slate-300'}`}>
                                                    {filled ? stage.dp[i][j] : '?'}
                                                </span>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <label htmlFor="interval-stage" className="mt-4 block text-sm font-black text-slate-700">
                    正在填长度为 {stage.len} 的区间
                </label>
                <input
                    id="interval-stage"
                    type="range" min="0" max={stages.length - 1} step="1"
                    value={stageIndex}
                    onChange={(event) => setStageIndex(Number(event.target.value))}
                    className="mt-2 w-full"
                />
                <p className="mt-2 text-xs font-bold text-slate-500">
                    对角线（i = j）是长度 1 的区间，一堆不用合并，代价 0
                </p>
            </div>

            <div className="mt-5 space-y-3">
                {stage.cells.map((cell) => (
                    <div key={`${cell.i}-${cell.j}`} className="rounded-xl bg-slate-900 p-5">
                        <div className="font-mono text-sm font-black text-rose-300">
                            dp[{cell.i}][{cell.j}]（第 {cell.i} 到 {cell.j} 堆，区间和 = {cell.sum}）
                        </div>
                        <div className="mt-2 space-y-1 font-mono text-xs">
                            {cell.tries.map((t) => (
                                <div key={t.k} className={t.k === cell.best ? 'text-emerald-300' : 'text-slate-400'}>
                                    在 k={t.k} 处切：dp[{cell.i}][{t.k}] + dp[{t.k + 1}][{cell.j}] + {cell.sum}
                                    {' = '}{t.left} + {t.right} + {cell.sum} = {t.cost}
                                    {t.k === cell.best ? '  ← 最小' : ''}
                                </div>
                            ))}
                        </div>
                        <div className="mt-2 border-t border-slate-700 pt-2 font-mono text-sm font-black text-amber-300">
                            dp[{cell.i}][{cell.j}] = {cell.value}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-5 rounded-xl bg-white p-5 ring-1 ring-rose-100">
                <div className="text-xs font-black text-slate-500">最终答案</div>
                <div className="mt-1 font-mono text-3xl font-black text-rose-700">dp[0][{n - 1}] = {answer}</div>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                    注意填表顺序：<strong>必须先填短区间，再填长区间</strong>。
                    因为 dp[i][j] 依赖的 dp[i][k] 和 dp[k+1][j] 都比它<strong>短</strong>。
                </p>
            </div>
        </div>
    );
}

export default function Lesson9() {
    return (
        <CppLessonShell
            lessonNumber={9}
            lessonTitle="动态规划：区间与树形"
            lessonSubtitle="填表顺序由依赖关系决定，不能凭感觉"
            accent="rose"
            levelTitle="C++ 提高"
            levelCode="L8"
            sections={sections}
            previousPath="/lesson/8/8"
            nextPath="/lesson/8/10"
            prerequisites={['完成七级第 9、10 课的线性 DP 与背包', '会用前缀和快速求区间和', '会写树的递归遍历']}
            topSupport={<CppL8LessonSupport lessonId={9} />}
            bottomSupport={<CppL8LessonSupport lessonId={9} placement="bottom" />}
            hero={{
                title: '状态从「一个下标」变成「一段区间」或「一棵子树」',
                description: '本课讲区间 DP 为什么要按长度枚举、树形 DP 的递归顺序，以及两类的识别方法。',
            }}
            goals={['能识别区间 DP 的状态设计', '能写出树形 DP 的转移', '能估算这两类 DP 的复杂度']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={Layers} title="七级的 DP 状态都是一维下标" tone="blue">
                            七级第 9 课的 <code className="font-mono">dp[i]</code>「以 a[i] 结尾」、
                            第 10 课的 <code className="font-mono">dp[c]</code>「容量为 c」——
                            状态都是<strong>一个数</strong>。
                            <br /><br />
                            八级引入两种新的状态形状：
                            <br />· <strong>区间 DP</strong>：<code className="font-mono">dp[i][j]</code> 表示「区间 [i, j] 的答案」
                            <br />· <strong>树形 DP</strong>：<code className="font-mono">dp[u]</code> 表示「以 u 为根的子树的答案」
                        </Callout>
                        <CompareTable
                            headers={['', '线性 DP', '区间 DP', '树形 DP']}
                            rows={[
                                ['状态', 'dp[i]', 'dp[i][j]', 'dp[u]（有时 dp[u][0/1]）'],
                                ['依赖', '更小的下标', '更短的区间', '子节点'],
                                ['填表顺序', 'i 从小到大', '按区间长度从小到大', '递归回来时（后序）'],
                                ['典型题', 'LIS、最大子段和', '石子合并、回文划分', '树上最大独立集、树的直径'],
                                ['复杂度', 'O(n) 或 O(n²)', '通常 O(n³)', '通常 O(n)'],
                            ]}
                        />
                        <Callout icon={AlertTriangle} title="这一课的核心是「填表顺序」" tone="rose">
                            七级第 9 课讲过：递推必须保证「算 dp[X] 时它依赖的都已经算好」。
                            <br /><br />
                            线性 DP 里这件事很自然（i 从小到大）。
                            但区间 DP 的依赖关系不是「下标更小」而是「<strong>区间更短</strong>」，
                            按 i 或 j 循环都会读到还没填的格子。这是本课最容易错的地方。
                        </Callout>
                    </>
                ),
                2: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">区间 DP 的四件套</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            以石子合并为例：n 堆石子排成一行，每次<strong>只能合并相邻两堆</strong>，
                            代价是这两堆的石子总数。求全部合成一堆的最小总代价。
                        </p>
                        <CompareTable
                            headers={['四件套', '石子合并的答案']}
                            rows={[
                                ['状态', 'dp[i][j] = 把第 i 到第 j 堆合成一堆的最小代价'],
                                ['转移', 'dp[i][j] = min(dp[i][k] + dp[k+1][j] + sum(i..j))，k 取 i..j−1'],
                                ['初值', 'dp[i][i] = 0（一堆不用合并）'],
                                ['答案', 'dp[0][n−1]'],
                            ]}
                        />
                        <Callout icon={Layers} title="转移方程里那个 sum(i..j) 为什么是固定的" tone="blue">
                            不管中间怎么切分，<strong>最后一次合并</strong>总是把左右两块合成一块，
                            代价必然是这两块的总和，也就是 <code className="font-mono">sum(i..j)</code>——
                            <strong>与 k 的选择无关</strong>。
                            <br /><br />
                            所以枚举 k 时只需比较 <code className="font-mono">dp[i][k] + dp[k+1][j]</code> 的大小，
                            那个 sum 是所有方案共有的。用<strong>前缀和</strong>可以 O(1) 求出它。
                        </Callout>
                        <CodeBlock>{`int a[N], prefix[N];
long long dp[N][N];

// 前缀和：sum(i..j) = prefix[j+1] - prefix[i]
prefix[0] = 0;
for (int i = 0; i < n; i++) prefix[i+1] = prefix[i] + a[i];

// 初值：长度 1 的区间代价为 0（memset 已置 0，这里显式写出便于理解）
for (int i = 0; i < n; i++) dp[i][i] = 0;

// 关键：外层枚举区间长度，而不是枚举 i 或 j
for (int len = 2; len <= n; len++) {
    for (int i = 0; i + len - 1 < n; i++) {
        int j = i + len - 1;
        dp[i][j] = LLONG_MAX;
        int sum = prefix[j+1] - prefix[i];       // 与 k 无关，提到循环外
        for (int k = i; k < j; k++)              // 枚举切分点
            dp[i][j] = min(dp[i][j], dp[i][k] + dp[k+1][j] + sum);
    }
}
cout << dp[0][n-1];
// 复杂度：len × i × k 三层，共 O(n³)`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="为什么必须按长度枚举" tone="rose">
                            <code className="font-mono">dp[i][j]</code> 依赖 <code className="font-mono">dp[i][k]</code> 和
                            <code className="font-mono">dp[k+1][j]</code>，这两个区间都<strong>比 [i,j] 短</strong>。
                            <br /><br />
                            如果写成 <code className="font-mono">for (i...) for (j...)</code>，
                            算 dp[0][3] 时会用到 dp[1][3]——而按 i 递增的顺序，i=1 那一行还没开始填。
                            读到的是 0（初始值），结果偏小。
                            <br /><br />
                            <strong>按 len 从小到大枚举，保证所有更短的区间都已经填好。</strong>
                            这就是区间 DP 的标志性写法，见到 dp[i][j] 就该想到它。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <IntervalDpLab />
                        <PredictCheck
                            className="mt-6"
                            prompt="石子堆 4 5 9 4，用区间 DP 求最小合并代价。填表时如果误写成 for(i) for(j) 而不是 for(len)，会发生什么？"
                            options={[
                                '结果偏大，因为漏了一些切分方案',
                                '结果偏小，因为读到了还没填的 0',
                                '结果不变，只是慢一些',
                                '程序崩溃',
                            ]}
                            correctIndex={1}
                            explanation="按 i 递增填表时，算 dp[0][3] 需要用到 dp[1][3]，但 i=1 那一行还没填过，读到的是初始值 0。于是 dp[0][3] 被算成一个偏小的值（把 dp[1][3] 当成了 0，相当于「合并第 1 到 3 堆不要钱」）。正确答案是 44，错误的顺序会得到更小的数。结果偏小而不是崩溃，所以这个 bug 不会有任何报错提示——只能靠理解依赖关系来避免。"
                            misconception="容易以为「反正都会遍历到所有格子，顺序不影响」。DP 的正确性完全依赖填表顺序：读到未填的格子不会报错，只会静默算错。"
                        />
                        <Callout icon={Grid3x3} title="区间 DP 的复杂度" tone="amber">
                            三层循环：len 有 O(n) 种，每种 len 下 i 有 O(n) 个位置，
                            每个格子枚举 k 又是 O(n)——总共 <strong>O(n³)</strong>。
                            <br /><br />
                            所以区间 DP 的适用规模是 <strong>n ≤ 几百</strong>：
                            n = 300 时 2.7×10<sup>7</sup> 可行，n = 1000 就是 10<sup>9</sup> 必然超时。
                            <br /><br />
                            空间是 O(n²)。n = 1000 时 long long 表要 8 MB，还行；
                            n = 5000 就是 200 MB，危险。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">树形 DP：递归回来时做转移</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            经典题：一棵有 n 个节点的树，每个节点有权值。要选出一些节点使权值和最大，
                            但<strong>不能同时选一个节点和它的父节点</strong>（树上最大独立集）。
                        </p>
                        <CompareTable
                            headers={['四件套', '树上最大独立集']}
                            rows={[
                                ['状态', 'dp[u][0] = u 不选时，u 的子树能取的最大值；dp[u][1] = u 选时'],
                                ['转移', 'dp[u][0] = Σ max(dp[v][0], dp[v][1])；dp[u][1] = w[u] + Σ dp[v][0]'],
                                ['初值', '叶子：dp[u][0] = 0，dp[u][1] = w[u]'],
                                ['答案', 'max(dp[root][0], dp[root][1])'],
                            ]}
                        />
                        <Callout icon={TreeDeciduous} title="两个状态而不是一个" tone="blue">
                            为什么要 <code className="font-mono">dp[u][0/1]</code> 两个状态？
                            因为孩子能不能选，<strong>取决于父节点选没选</strong>。
                            <br /><br />
                            · u <strong>不选</strong>时，每个孩子 v 自由选择——取 max(dp[v][0], dp[v][1])。
                            <br />· u <strong>选了</strong>时，孩子全都不能选——只能取 dp[v][0]。
                            <br /><br />
                            这和七级第 9 课末尾那道「打家劫舍」（不能取相邻房子）是同一个思路，
                            只是从一条链变成了一棵树。
                        </Callout>
                        <CodeBlock>{`vector<int> adj[N];
int w[N];
long long dp[N][2];

void dfs(int u, int parent) {
    dp[u][0] = 0;
    dp[u][1] = w[u];
    for (int v : adj[u]) {
        if (v == parent) continue;      // 无向图存树，要避免走回父节点
        dfs(v, u);                      // ← 先把子树算完
        dp[u][0] += max(dp[v][0], dp[v][1]);   // u 不选：孩子自由
        dp[u][1] += dp[v][0];                  // u 选了：孩子必须不选
    }
}

dfs(1, 0);
cout << max(dp[1][0], dp[1][1]);
// 复杂度 O(n)：每个节点、每条边各处理一次`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="递归顺序天然就是正确的填表顺序" tone="blue">
                            树形 DP 不用像区间 DP 那样操心顺序——<strong>递归本身解决了这个问题</strong>。
                            <br /><br />
                            <code className="font-mono">dfs(v, u)</code> 在使用 dp[v] <strong>之前</strong>被调用，
                            所以用到 dp[v] 时它一定已经算好了。这叫<strong>自底向上</strong>：
                            叶子先算完，然后一层层往根汇总。
                            <br /><br />
                            换句话说，转移写在<strong>递归调用之后</strong>（后序位置），
                            写在之前就会读到未初始化的值。
                        </Callout>
                        <Callout icon={TreeDeciduous} title="两个高频细节" tone="rose">
                            ① <strong>必须传 parent 参数</strong>：树通常用无向邻接表存，
                            如果不判 <code className="font-mono">v == parent</code>，会从子节点走回父节点造成无限递归。
                            <br />② <strong>n 很大时递归可能爆栈</strong>：n = 10⁵ 且树退化成一条链时，
                            递归深度 10⁵ 层——和七级第 6 课的 DFS 一样的风险，
                            需要改成迭代或用 BFS 序反向遍历。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">怎么识别是哪一类</h3>
                        <CompareTable
                            headers={['题面特征', '属于哪类', '为什么']}
                            rows={[
                                ['「合并相邻两个」「删除一段」「区间染色」', '区间 DP', '答案由子区间拼出，状态必须是两个端点'],
                                ['「回文」「括号匹配」', '区间 DP', '这类结构天然从两端往中间收缩'],
                                ['给的是一棵树，问子树相关', '树形 DP', '答案由子树汇总，状态是节点'],
                                ['「不能同时选父子」「树上路径」', '树形 DP', '约束发生在父子之间'],
                            ]}
                        />
                        <MiniQuiz items={[{
                            question: '区间 DP 为什么必须按区间长度枚举？',
                            answer: 'dp[i][j] 依赖的都是更短的区间',
                            reason: 'dp[i][j] 用到 dp[i][k] 和 dp[k+1][j]，两者都比 [i,j] 短。按 len 递增能保证它们已填好；按 i 或 j 循环会读到未填的 0，结果偏小且没有任何报错。',
                        }, {
                            question: '树形 DP 的转移该写在递归调用之前还是之后？',
                            answer: '之后（后序位置）',
                            reason: '必须先 dfs(v) 把子树算完，才能用 dp[v] 更新 dp[u]。写在递归之前会读到未初始化的值。递归本身就保证了自底向上的正确顺序。',
                        }, {
                            question: '树上最大独立集为什么需要 dp[u][0] 和 dp[u][1] 两个状态？',
                            answer: '孩子能否选取决于父节点选没选',
                            reason: 'u 不选时孩子自由（取两者较大），u 选了则孩子必须不选（只能取 dp[v][0]）。把「u 选没选」放进状态，才能正确表达这个约束。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '把石子堆 4 5 9 4 的区间 DP 手算一遍，与实验台逐格核对（答案 44）。',
                                '实现区间 DP，用前缀和 O(1) 求区间和，验证结果为 44。',
                                '故意把外层循环从 len 改成 i，观察答案变成多少、为什么偏小。',
                                '把石子数扩到 n=300 随机数据，测一下 O(n³) 要跑多久，验证 n=1000 会超时。',
                                '建一棵 5 个节点的树，手算树上最大独立集，再写代码验证。',
                                '故意去掉 dfs 里的 if (v == parent) continue，观察程序是否无限递归。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt={`一道题：给一个字符串 s（长度 n ≤ 500），每次可以删掉一个回文子串，问最少删几次能把整个串删空。请说明这属于哪类 DP、状态怎么定、转移怎么写、以及为什么不能用线性 DP。`}
                            hint={`答案能由「前 i 个字符」推出来吗？还是必须知道一段的两个端点？`}
                            answer={`这是区间 DP。状态定义：dp[i][j] = 把子串 s[i..j] 删空所需的最少次数。

转移分两种情况：
① 拆分：把区间切成两段各自删空，dp[i][j] = min(dp[i][k] + dp[k+1][j])，k 取 i..j−1。
② 合并优化：如果 s[i] == s[j]，那么这两个字符可以「搭上同一次删除」，即 dp[i][j] 可以取 dp[i+1][j-1]（当 j−i ≥ 2）或 1（当 j−i == 1，两个相同字符本身就是回文）。直觉是：删中间那段时，首尾这对相同字符可以并入某次回文删除里，不额外花次数。

初值：dp[i][i] = 1（单个字符本身是回文，一次删完）。答案 dp[0][n−1]。填表必须按 len 从小到大，因为两种转移用到的都是更短的区间。复杂度 O(n³)，n = 500 时是 1.25×10⁸，勉强可行。

为什么不能用线性 DP：线性 DP 的状态是「前 i 个字符」，但这道题的关键操作是「删掉中间一段」——删完之后剩下的是左右两段拼在一起，「前 i 个」这个描述无法表达「中间被掏空后首尾相接」的局面。而且第二种转移必须同时知道首尾两个字符是否相同，一个下标给不出这个信息。凡是需要同时盯住一段的两端、或者答案由子区间拼合而成的题，状态就必须是 dp[i][j]。

这也是识别区间 DP 的通用标志：题面里出现「相邻合并」「区间删除」「回文」「括号匹配」这类词，基本都是区间 DP。`}
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能说明区间 DP 为什么要按长度枚举，以及顺序错了会静默算错而不报错',
                                '我能确定树形 DP 的递归顺序，知道转移必须写在递归调用之后',
                                '我能识别一道题适合区间还是树形——看答案是由子区间拼出还是由子树汇总',
                                '我能估算区间 DP 的 O(n³) 复杂度，判断 n 多大时会超时',
                                '我知道树形 DP 要传 parent 参数，以及 n 很大时递归有爆栈风险',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
