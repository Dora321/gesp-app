import React, { useMemo, useState } from 'react';
import { AlertTriangle, Fingerprint, Scissors, Sigma } from 'lucide-react';
import CppL7LessonSupport from '../../../components/CppL7LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '搜索空间有多大' },
    { id: 2, title: '剪枝：八皇后实测', category: '砍掉不可能的分支' },
    { id: 3, title: '状态判重', category: '同一个状态只算一次' },
    { id: 4, title: '搜索还是 DP', category: '怎么选' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

// 实测数据：三种策略下 N 皇后的搜索节点数与解的个数。
// 这些数字是跑出来的，不是估的——解的个数三列完全相同，正是「剪枝不改变正确性」的证据。
const QUEENS_DATA = [
    { n: 4, none: 341, colOnly: 65, full: 17, solutions: 2 },
    { n: 6, none: 55987, colOnly: 1957, full: 153, solutions: 4 },
    { n: 8, none: 19173961, colOnly: 109601, full: 2057, solutions: 92 },
];

const STRATEGIES = [
    { key: 'none', label: '不剪枝', desc: '每行任选一列，摆满 n 行后才检查是否合法' },
    { key: 'colOnly', label: '只剪列冲突', desc: '同一列已有皇后就跳过，对角线留到最后检查' },
    { key: 'full', label: '列 + 两条对角线', desc: '放下之前就检查三个方向，冲突立刻回溯' },
];

function PruningLab() {
    const [n, setN] = useState(8);
    const row = QUEENS_DATA.find((item) => item.n === n) || QUEENS_DATA[2];
    const max = row.none;

    const ratio = useMemo(() => (row.none / row.full).toFixed(0), [row]);

    return (
        <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Scissors className="text-orange-700" aria-hidden="true" />
                <h3 className="text-xl font-black text-slate-950">剪枝的实测效果</h3>
            </div>
            <p className="mb-5 text-sm font-semibold leading-6 text-slate-600">
                N 皇后问题，三种策略搜索的节点数。注意最右一列——
                <strong>解的个数三种策略完全相同</strong>，这就是「剪枝只砍不可能的分支，不改变答案」的证据。
            </p>

            <div className="mb-5 flex flex-wrap gap-2">
                {QUEENS_DATA.map((item) => (
                    <button
                        key={item.n}
                        type="button"
                        aria-pressed={n === item.n}
                        onClick={() => setN(item.n)}
                        className={`min-h-11 rounded-lg px-5 py-2 text-sm font-black transition ${n === item.n
                            ? 'bg-orange-600 text-white shadow'
                            : 'bg-white text-slate-700 ring-1 ring-orange-200 hover:bg-orange-100'}`}
                    >
                        n = {item.n}
                    </button>
                ))}
            </div>

            <div className="space-y-3">
                {STRATEGIES.map((strategy) => {
                    const value = row[strategy.key];
                    const percent = Math.max((value / max) * 100, 0.4);
                    return (
                        <div key={strategy.key} className="rounded-xl bg-white p-4 ring-1 ring-orange-100">
                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                                <span className="text-sm font-black text-slate-800">{strategy.label}</span>
                                <span className="font-mono text-lg font-black text-orange-700">
                                    {value.toLocaleString('en-US')} 个节点
                                </span>
                            </div>
                            <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className="h-full rounded-full bg-orange-500 transition-all duration-500"
                                    style={{ width: `${percent}%` }}
                                />
                            </div>
                            <p className="mt-2 text-xs font-bold leading-5 text-slate-500">{strategy.desc}</p>
                        </div>
                    );
                })}
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-900 p-4">
                    <div className="text-xs font-bold text-slate-400">找到的解的个数（三种策略都一样）</div>
                    <div className="mt-1 text-3xl font-black text-emerald-400">{row.solutions}</div>
                </div>
                <div className="rounded-xl bg-slate-900 p-4">
                    <div className="text-xs font-bold text-slate-400">完整剪枝比不剪枝少搜索</div>
                    <div className="mt-1 text-3xl font-black text-amber-300">{Number(ratio).toLocaleString('en-US')} 倍</div>
                </div>
            </div>
        </div>
    );
}

export default function Lesson8() {
    return (
        <CppLessonShell
            lessonNumber={8}
            lessonTitle="搜索的剪枝与状态判重"
            lessonSubtitle="砍掉不可能的分支，认出重复的状态"
            accent="orange"
            levelTitle="C++ 冲刺"
            levelCode="L7"
            sections={sections}
            previousPath="/lesson/7/7"
            // 第 9 课尚未建成，先回本级目录——指向未建成的课会让动态 import 失败。
            nextPath="/level7"
            prerequisites={['会写递归 DFS 与回溯', '完成 BFS 一课', '会用数组或 set 做标记']}
            topSupport={<CppL7LessonSupport lessonId={8} />}
            bottomSupport={<CppL7LessonSupport lessonId={8} placement="bottom" />}
            hero={{
                title: '搜索能不能过，取决于你砍掉了多少',
                description: '本课讲怎么估算搜索空间、怎么设计剪枝条件与状态编码，以及什么时候该改用动态规划。',
            }}
            goals={['能识别搜索中的重复状态', '能设计判重与剪枝条件', '能估算搜索空间大小']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={Sigma} title="先算搜索空间，再决定能不能搜" tone="blue">
                            暴力搜索的代价是<strong>分支数的乘积</strong>。八皇后每行有 8 种选法、共 8 行，
                            朴素做法要枚举 8<sup>8</sup> ≈ 1.7×10<sup>7</sup> 种摆法。
                            这个数字如果超过 10<sup>8</sup>，直接搜必然超时——必须剪。
                        </Callout>
                        <CompareTable
                            headers={['问题形态', '搜索空间', 'n 能到多大']}
                            rows={[
                                ['每步 2 选 1（选或不选）', '2ⁿ', '约 25'],
                                ['全排列枚举', 'n!', '约 11'],
                                ['每步 k 选 1，共 n 步', 'kⁿ', '看 k 和 n'],
                                ['n 皇后（加列剪枝后）', 'n!', '朴素约 11，加对角剪枝可到 13+'],
                            ]}
                        />
                        <p className="mt-5 text-base leading-7 text-slate-700">
                            这一课要讲的两个手段，作用完全不同，别混为一谈：
                        </p>
                        <StepList
                            steps={[
                                '剪枝（pruning）：提前判断某个分支「一定不可能出解」，直接不往下走。砍的是无效分支。',
                                '判重（deduplication）：认出「这个状态之前算过了」，不重复算。砍的是重复分支。',
                            ]}
                        />
                    </>
                ),
                2: (
                    <>
                        <PruningLab />
                        <h3 className="mt-8 text-xl font-black text-slate-950">剪枝为什么不改变正确性</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            上面实测里，三种策略找到的解个数完全一样（n=8 时都是 92 个）。原因很简单：
                            <strong>剪掉的分支里本来就没有解</strong>。
                        </p>
                        <Callout icon={Scissors} title="合法剪枝的判断标准" tone="blue">
                            剪枝条件必须是「<strong>如果条件成立，那么这个分支下的所有方案都不合法</strong>」。
                            八皇后里，第 3 行已经和第 1 行同列了——继续往下摆，
                            无论后面 5 行怎么放，这两个皇后的冲突都消不掉。所以剪掉是安全的。
                            <br /><br />
                            反过来，如果条件只是「这个分支<em>大概</em>不太可能出解」，那就不是剪枝而是
                            <strong>启发式</strong>，可能漏解。做题时要严格区分。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">八皇后的标准写法</h3>
                        <CodeBlock>{`int n, answer = 0;
bool col[20];      // col[c]：第 c 列已有皇后
bool diag1[40];    // 主对角线，同一条上 r - c 相同（+n 防负下标）
bool diag2[40];    // 副对角线，同一条上 r + c 相同

void search(int r) {
    if (r == n) { answer++; return; }        // 摆满 n 行，得到一个解
    for (int c = 0; c < n; c++) {
        if (col[c] || diag1[r - c + n] || diag2[r + c]) continue;   // ← 三个剪枝
        col[c] = diag1[r - c + n] = diag2[r + c] = true;            // 放下
        search(r + 1);
        col[c] = diag1[r - c + n] = diag2[r + c] = false;           // 撤销（回溯）
    }
}`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="两条对角线的编号是关键" tone="amber">
                            <strong>主对角线（↘）上的格子 r - c 是常数</strong>，
                            <strong>副对角线（↙）上的格子 r + c 是常数</strong>。
                            所以只要开两个一维数组、用这两个值当下标，就能 O(1) 判断对角冲突。
                            r - c 可能是负数，所以要 <code className="font-mono">+ n</code> 平移。
                            这个技巧值得背下来。
                        </Callout>
                        <Callout icon={Scissors} title="别忘了撤销" tone="rose">
                            回溯的铁律：<strong>进去时改了什么，出来时就要改回什么</strong>。
                            上面代码里三个标记设了 true，递归返回后必须全部置回 false，
                            否则后续分支会误以为这些位置还被占着，直接漏解。
                            这是回溯类题目最高频的 bug。
                        </Callout>
                        <PredictCheck
                            className="mt-6"
                            prompt="n = 8 时，加上列和两条对角线的剪枝后，搜索的节点数从 1917 万降到多少？"
                            options={['约 110 万', '约 11 万', '约 2000', '约 92']}
                            correctIndex={2}
                            explanation="实测是 2057 个节点，降了约 9300 倍。中间那档「只剪列冲突」是 109601（约 11 万）——可见对角线剪枝又额外砍掉了 50 多倍。而 92 是解的个数，不是搜索节点数：搜索必然要走过许多最终失败的分支，节点数一定远大于解数。"
                            misconception="容易把「解的个数」当成「搜索节点数」。搜索树上大部分节点都是走到一半发现不行而回溯的。"
                        />
                    </>
                ),
                3: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">什么叫「同一个状态」</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            上一课的网格 BFS 里，<code className="font-mono font-bold">dist[x][y] != -1</code> 就是一次判重——
                            「我到过 (x,y) 了，不用再来」。这里的状态就是坐标。
                            但很多题里，<strong>状态不只是位置</strong>。
                        </p>
                        <Callout icon={Fingerprint} title="状态 = 影响后续决策的全部信息" tone="blue">
                            判断两个局面是不是「同一个状态」，标准是：
                            <strong>从它们出发能做的事、能得到的结果完全一样</strong>。
                            <br /><br />
                            上一课末尾那道「最多打穿 1 面墙」的题：站在同一个格子上，
                            「还没用过打穿机会」和「已经用掉了」能做的事不同，所以是<strong>两个</strong>状态。
                            这就是为什么 dist 要加一维变成 <code className="font-mono">dist[x][y][k]</code>。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">怎么给状态编码</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            判重需要把一个状态变成能查表的东西。三种常用做法：
                        </p>
                        <CompareTable
                            headers={['做法', '写法', '适用']}
                            rows={[
                                ['多维数组', 'vis[x][y][k]', '每一维范围都小且已知'],
                                ['编码成整数', 'id = x * m + y，或按位压缩', '状态能压进 int / long long'],
                                ['丢进 set / map', 'set<string> 或 set<int>', '状态难以估界，或本身就是字符串'],
                            ]}
                        />
                        <CodeBlock>{`// 例：3×3 拼图，把 9 个格子的排列编码成一个字符串
// 这样任意局面都能唯一表示，直接扔进 set 判重
set<string> seen;

void bfsPuzzle(string start) {
    queue<pair<string,int>> q;      // {局面, 步数}
    q.push({start, 0});
    seen.insert(start);             // 入队时判重 —— 和上一课同一个道理
    while (!q.empty()) {
        auto [state, step] = q.front(); q.pop();
        if (state == "123456780") { cout << step; return; }
        for (string next : moves(state)) {
            if (seen.count(next)) continue;    // 这个局面之前出现过，跳过
            seen.insert(next);
            q.push({next, step + 1});
        }
    }
}`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="编码必须是「一一对应」的" tone="rose">
                            两个不同状态编出同一个码，会导致<strong>误判重、漏解</strong>；
                            同一个状态编出两个码，则判重失效、白搜一遍。
                            <br /><br />
                            常见错误：用 <code className="font-mono">x + y</code> 当坐标编码——
                            (1,3) 和 (3,1) 会撞成同一个 4。正确写法是
                            <code className="font-mono font-bold">x * m + y</code>（m 是列数），
                            这才保证唯一。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">搜索 + 判重，和动态规划的关系</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            「搜索 + 判重 + 记住每个状态的答案」这件事有个名字：<strong>记忆化搜索</strong>。
                            而它和动态规划算的是同一个东西，只是<strong>方向相反</strong>。
                        </p>
                        <CompareTable
                            headers={['对比项', '记忆化搜索', '动态规划（递推）']}
                            rows={[
                                ['方向', '从目标往回问（自顶向下）', '从边界往前推（自底向上）'],
                                ['写法', '递归 + 查表', '循环 + 填表'],
                                ['算哪些状态', '只算真正用到的', '通常整张表都填'],
                                ['优势', '状态转移复杂时更好写', '没有递归开销，常数更小'],
                                ['风险', '递归深度可能爆栈', '要想清楚填表顺序'],
                            ]}
                        />
                        <Callout icon={Sigma} title="什么时候搜索比 DP 更合适" tone="blue">
                            ① <strong>状态难以枚举或界不明确</strong>——比如拼图局面，你没法开一个数组把所有局面都列出来，
                            但可以用 set 边搜边记。
                            <br />② <strong>只需要一个解或最优解，而且剪枝很强</strong>——
                            搜索可以一找到就返回，DP 得把表填完。
                            <br />③ <strong>要输出方案本身而不只是最优值</strong>——回溯天然带着当前路径。
                            <br /><br />
                            反过来，如果状态数明确且不大、每个状态都会被用到，那 DP 更快更稳——
                            这就是下一课要讲的内容。
                        </Callout>
                        <MiniQuiz items={[{
                            question: '剪枝为什么不会改变搜索结果的正确性？',
                            answer: '被剪掉的分支里本来就没有解',
                            reason: '合法的剪枝条件必须保证「条件成立时该分支下所有方案都不合法」。八皇后实测中三种剪枝强度找到的解个数完全相同（n=8 都是 92），就是这一点的证据。',
                        }, {
                            question: '用 x + y 给网格坐标编码判重，会出什么问题？',
                            answer: '不同坐标会撞成同一个码',
                            reason: '(1,3) 和 (3,1) 都编成 4，会被误判为同一个状态而漏解。正确写法是 x * m + y，其中 m 是列数，这样才是一一对应。',
                        }, {
                            question: '八皇后里判断主对角线冲突，用哪个量当下标？',
                            answer: 'r - c（要加偏移防负）',
                            reason: '主对角线（↘）上所有格子的 r - c 相同，副对角线（↙）上 r + c 相同。r - c 可能为负，所以开数组时下标要 +n 平移。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '实现不剪枝的 n 皇后（摆满 n 行才检查），加一个全局计数器统计搜索节点数，跑 n = 4 和 n = 6。',
                                '加上列剪枝，再加上两条对角线剪枝，对比三次的节点数与解的个数，与上面实验台核对。',
                                '故意注释掉回溯时的三行撤销代码，观察 n = 4 的解会从 2 个变成几个，理解「不撤销」的后果。',
                                '写一个把 3×3 网格局面编码成字符串的函数，用 set 判重实现拼图 BFS。',
                                '把「最多打穿 1 面墙」的网格最短路写出来，用 dist[x][y][k] 三维数组判重。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt="一道题：n×n 网格，从左上走到右下，只能往右或往下走，格子上有数字，求路径上数字和的最大值。n ≤ 500。用带判重的搜索能过吗？如果能，状态是什么？和直接写 DP 相比有什么差别？"
                            hint="先估算状态数，再想想每个状态会不会被重复到达。"
                            answer="能过。状态就是坐标 (x,y)——因为只能往右往下走，「从 (x,y) 出发能拿到的最大和」与你是怎么到达 (x,y) 的无关，所以坐标足以描述状态。状态数是 n² = 25 万，每个状态两个转移，总代价 O(n²)，完全可行。不加判重则不行：到 (x,y) 的路径条数是组合数级别，会指数爆炸。加了判重之后这就是记忆化搜索，和自底向上的 DP dp[x][y] = max(dp[x+1][y], dp[x][y+1]) + a[x][y] 算的是同一件事，差别只在：记忆化是递归写法，n = 500 时递归深度约 1000 层还安全，但 n 再大就有爆栈风险；DP 是双重循环，没有递归开销，常数更小也更稳。这道题两种都能过，规模再大就该选 DP。"
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能说明剪枝为什么不改变正确性，并判断一个剪枝条件是否合法',
                                '我能为一个问题设计出唯一的状态编码，知道 x + y 这类写法为什么错',
                                '我知道什么时候搜索比 DP 更合适，也知道记忆化搜索与 DP 的关系',
                                '我能估算搜索空间大小，据此判断暴力搜索能不能过',
                                '我记得回溯时必须撤销进入时做的所有修改',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
