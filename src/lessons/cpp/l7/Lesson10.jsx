import React, { useMemo, useState } from 'react';
import { AlertTriangle, ArrowLeftRight, Backpack, Repeat } from 'lucide-react';
import CppL7LessonSupport from '../../../components/CppL7LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '选或不选' },
    { id: 2, title: '二维 0/1 背包', category: '先写对再优化' },
    { id: 3, title: '压成一维', category: '倒序的道理' },
    { id: 4, title: '完全背包与变形', category: '正序与恰好装满' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

const ITEMS = [
    { weight: 2, value: 3 },
    { weight: 3, value: 4 },
    { weight: 4, value: 5 },
];
const CAPACITY = 6;

// 一维数组的逐步填充过程。正序会重复选取同一件物品，倒序不会——
// 把每一步的写入都录下来，差别一眼可见。
function rollOneDimension(items, capacity, ascending) {
    const dp = new Array(capacity + 1).fill(0);
    const rounds = [];
    items.forEach((item, index) => {
        const writes = [];
        const range = [];
        if (ascending) {
            for (let c = item.weight; c <= capacity; c += 1) range.push(c);
        } else {
            for (let c = capacity; c >= item.weight; c -= 1) range.push(c);
        }
        range.forEach((c) => {
            const from = c - item.weight;
            const candidate = dp[from] + item.value;
            if (candidate > dp[c]) {
                writes.push({ c, from, before: dp[c], after: candidate });
                dp[c] = candidate;
            }
        });
        rounds.push({ index, item, dp: [...dp], writes });
    });
    return { dp, rounds };
}

function KnapsackLab() {
    const [ascending, setAscending] = useState(false);
    const result = useMemo(() => rollOneDimension(ITEMS, CAPACITY, ascending), [ascending]);
    const [round, setRound] = useState(ITEMS.length - 1);
    const current = result.rounds[Math.min(round, result.rounds.length - 1)];

    // 满容量的最终结果：倒序是 8（0/1 背包），正序是 9（同一件被拿了三次）
    const finalValue = result.dp[CAPACITY];

    return (
        <div className="rounded-2xl border border-lime-100 bg-lime-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Backpack className="text-lime-700" aria-hidden="true" />
                <h3 className="text-xl font-black text-slate-950">一维背包：正序 vs 倒序</h3>
            </div>
            <p className="mb-5 text-sm font-semibold leading-6 text-slate-600">
                三件物品（重量/价值：2/3、3/4、4/5），背包容量 {CAPACITY}。
                同一份代码只改循环方向，结果就从 0/1 背包变成完全背包。
            </p>

            <div className="mb-5 flex flex-wrap gap-2">
                {[[false, '倒序：容量从大到小'], [true, '正序：容量从小到大']].map(([value, label]) => (
                    <button
                        key={String(value)}
                        type="button"
                        aria-pressed={ascending === value}
                        onClick={() => { setAscending(value); setRound(ITEMS.length - 1); }}
                        className={`min-h-11 rounded-lg px-4 py-2 text-sm font-black transition ${ascending === value
                            ? 'bg-lime-700 text-white shadow'
                            : 'bg-white text-slate-700 ring-1 ring-lime-200 hover:bg-lime-100'}`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div className="rounded-xl bg-white p-5 ring-1 ring-lime-100">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[24rem] text-center font-mono text-sm">
                        <thead className="text-slate-400">
                            <tr>
                                <th className="px-2 py-1.5 text-left font-black">容量 c</th>
                                {Array.from({ length: CAPACITY + 1 }, (_, c) => (
                                    <th key={c} className="px-2 py-1.5 font-black">{c}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t border-slate-100">
                                <td className="px-2 py-2 text-left font-black text-slate-400">dp[c]</td>
                                {current.dp.map((value, c) => {
                                    const write = current.writes.find((w) => w.c === c);
                                    return (
                                        <td key={c} className="px-1 py-2">
                                            <span
                                                className={`flex h-9 w-9 items-center justify-center rounded font-black ${write
                                                    ? 'bg-lime-700 text-white'
                                                    : 'bg-slate-100 text-slate-700'}`}
                                                title={write ? `由 dp[${write.from}] + ${current.item.value} 得到，${write.before} → ${write.after}` : undefined}
                                            >
                                                {value}
                                            </span>
                                        </td>
                                    );
                                })}
                            </tr>
                        </tbody>
                    </table>
                </div>

                <label htmlFor="knapsack-round" className="mt-4 block text-sm font-black text-slate-700">
                    处理完第 {round + 1} 件物品（重 {current.item.weight}、值 {current.item.value}）
                </label>
                <input
                    id="knapsack-round"
                    type="range"
                    min="0"
                    max={ITEMS.length - 1}
                    value={round}
                    onChange={(event) => setRound(Number(event.target.value))}
                    className="mt-2 w-full"
                />
                <p className="mt-2 text-xs font-bold text-slate-500">
                    深色格子是这一轮被更新的位置
                </p>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <div className="rounded-xl bg-slate-900 p-5">
                    <div className="text-xs font-bold text-slate-400">这一轮的写入</div>
                    <ul className="mt-2 space-y-1 font-mono text-xs">
                        {current.writes.length === 0 && (
                            <li className="text-slate-500">（这一轮没有格子被更新）</li>
                        )}
                        {current.writes.map((write) => (
                            <li key={write.c} className="text-slate-200">
                                dp[{write.c}] ← dp[{write.from}] + {current.item.value} = {write.after}
                                <span className="text-slate-500">（原 {write.before}）</span>
                                {ascending && write.from >= current.item.weight && (
                                    <span className="ml-1 font-bold text-rose-400">
                                        ← dp[{write.from}] 本轮已被改过，这件物品又被装了一次
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="rounded-xl bg-slate-900 p-5">
                    <div className="text-xs font-bold text-slate-400">dp[{CAPACITY}] 最终结果</div>
                    <div className={`mt-1 text-3xl font-black ${ascending ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {finalValue}
                    </div>
                    <p className="mt-3 border-t border-slate-700 pt-3 text-sm font-semibold leading-6 text-slate-300">
                        {ascending
                            ? '正序得到 9 = 3 + 3 + 3，也就是把「重 2 值 3」那件装了三次（总重 6）。每件只能拿一次的题里这是错的，但如果题目允许无限次拿，它恰好就是完全背包的正确答案。'
                            : '倒序得到 8 = 3 + 5，即装入「重 2 值 3」和「重 4 值 5」两件，总重 6。每件只用一次，这是 0/1 背包的正确答案。'}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function Lesson10() {
    return (
        <CppLessonShell
            lessonNumber={10}
            lessonTitle="背包问题家族"
            lessonSubtitle="一维数组的循环方向，决定了每件物品能拿几次"
            accent="lime"
            levelTitle="C++ 冲刺"
            levelCode="L7"
            sections={sections}
            previousPath="/lesson/7/9"
            nextPath="/lesson/7/11"
            prerequisites={['完成上一课的 DP 四件套', '会用二维数组填表', '理解滚动数组降维的思路']}
            topSupport={<CppL7LessonSupport lessonId={10} />}
            bottomSupport={<CppL7LessonSupport lessonId={10} placement="bottom" />}
            hero={{
                title: '一个循环方向的差别',
                description: '本课从二维 0/1 背包出发压成一维，讲清倒序为什么能避免重复选取，以及完全背包为什么反而要正序。',
            }}
            goals={['能区分 0/1 背包与完全背包', '能写出一维滚动数组优化', '能说明遍历方向的作用']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={Backpack} title="背包问题的共同形状" tone="blue">
                            有一批物品，每件有<strong>重量</strong>和<strong>价值</strong>；
                            背包有一个<strong>容量上限</strong>。问怎么装能让总价值最大。
                            所有背包题的决策都只有一种：<strong>这件物品拿不拿</strong>。
                        </Callout>
                        <CompareTable
                            headers={['类型', '每件物品可拿次数', '一维循环方向']}
                            rows={[
                                ['0/1 背包', '最多 1 次', '容量倒序'],
                                ['完全背包', '无限次', '容量正序'],
                                ['多重背包', '有限次（各自不同）', '拆成 0/1 或二进制优化'],
                            ]}
                        />
                        <p className="mt-5 text-base leading-7 text-slate-700">
                            七级主要考前两种。这一课的重点不是背下模板，而是搞懂
                            <strong>为什么方向一改，可拿次数就变了</strong>——
                            想通这一点，两个模板就不用记了。
                        </p>
                        <Callout icon={AlertTriangle} title="识别题型的关键词" tone="amber">
                            「每种物品只有一个」「每件最多选一次」→ 0/1 背包。
                            「物品数量不限」「可以重复使用」「硬币可以用任意多枚」→ 完全背包。
                            读题时先把这句话找出来，再决定循环方向。
                        </Callout>
                    </>
                ),
                2: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">先写二维，保证写对</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            二维写法的状态定义最直白，也最不容易错。建议考场上先写二维，
                            确认结果对了、再考虑要不要压维。
                        </p>
                        <CompareTable
                            headers={['四件套', '0/1 背包（二维）']}
                            rows={[
                                ['状态', 'dp[i][c] = 只考虑前 i 件物品、容量为 c 时的最大价值'],
                                ['转移', 'dp[i][c] = max(dp[i-1][c], dp[i-1][c-w[i]] + v[i])'],
                                ['初值', 'dp[0][*] = 0（一件都不考虑时价值为 0）'],
                                ['答案', 'dp[n][C]'],
                            ]}
                        />
                        <CodeBlock>{`int w[105], v[105], dp[105][1005];
int n, C;

for (int i = 1; i <= n; i++) {
    for (int c = 0; c <= C; c++) {
        dp[i][c] = dp[i - 1][c];                  // 不拿第 i 件
        if (c >= w[i])                            // 装得下才谈拿
            dp[i][c] = max(dp[i][c], dp[i - 1][c - w[i]] + v[i]);
    }
}
cout << dp[n][C];`}</CodeBlock>
                        <Callout icon={ArrowLeftRight} title="转移方程里那个 i-1 是关键" tone="blue">
                            拿第 i 件时，从 <code className="font-mono font-bold">dp[i-1][c-w[i]]</code> 转移——
                            注意是 <strong>i-1</strong>，表示「在还没考虑过第 i 件的状态上」加这一件。
                            这就天然保证了<strong>第 i 件只被拿一次</strong>。
                            <br /><br />
                            如果写成 <code className="font-mono">dp[i][c-w[i]]</code>（同一行），
                            那就是允许第 i 件被反复拿——这正是完全背包的二维写法。
                            两种背包的差别在二维形式下一目了然，只是一个下标之差。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <KnapsackLab />
                        <h3 className="mt-8 text-xl font-black text-slate-950">为什么能压成一维</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            观察二维转移：<code className="font-mono font-bold">dp[i][c]</code> 只依赖
                            <code className="font-mono font-bold">dp[i-1][·]</code>，也就是<strong>只依赖上一行</strong>。
                            按上一课「看依赖决定能否降维」的思路，两行就够，甚至一行原地更新即可。
                        </p>
                        <CodeBlock>{`// 0/1 背包一维写法
int dp[1005] = {0};
for (int i = 1; i <= n; i++)
    for (int c = C; c >= w[i]; c--)              // ← 倒序
        dp[c] = max(dp[c], dp[c - w[i]] + v[i]);
cout << dp[C];`}</CodeBlock>
                        <Callout icon={Repeat} title="倒序为什么能避免重复选取" tone="rose">
                            压成一维后，<code className="font-mono">dp[c-w[i]]</code> 这个格子究竟是
                            「上一行的值」还是「本行已被改过的值」？答案取决于遍历顺序。
                            <br /><br />
                            <strong>倒序（c 从大到小）</strong>：处理 dp[c] 时，
                            <code className="font-mono">c-w[i] &lt; c</code>，那个格子这一轮<strong>还没被访问</strong>，
                            存的仍是上一行的值。等价于二维的 <code className="font-mono">dp[i-1][c-w[i]]</code> —— 只拿一次。
                            <br /><br />
                            <strong>正序（c 从小到大）</strong>：处理 dp[c] 时，
                            <code className="font-mono">c-w[i]</code> 这一轮<strong>已经被改过了</strong>，
                            里面可能已经含了第 i 件。等价于 <code className="font-mono">dp[i][c-w[i]]</code> —— 可以反复拿。
                        </Callout>
                        <p className="mt-5 text-base leading-7 text-slate-700">
                            上面实验台切到正序时，dp[6] 变成 9 —— 那是把「重 2 值 3」装了三次（2+2+2=6，3+3+3=9）。
                            日志里也标出了「dp[from] 本轮已被改过」的那些行。
                        </p>
                        <PredictCheck
                            className="mt-6"
                            prompt="三件物品（重/值：2/3、3/4、4/5），容量 6。一维数组用倒序和正序分别算出的 dp[6] 是多少？"
                            options={['都是 8', '倒序 8、正序 9', '倒序 9、正序 8', '都是 9']}
                            correctIndex={1}
                            explanation="倒序 = 0/1 背包，每件最多一次：最优是拿 2/3 和 4/5，总重 6、总值 8。正序 = 完全背包，可重复拿：拿三次「重 2 值 3」，总重 6、总值 9。同一份代码只改一个循环方向，答案就从 8 变成 9——这就是方向的全部作用。"
                            misconception="容易以为方向只影响效率或者会算错。实际上两个方向都「算对了」，只是解的是两道不同的题。"
                        />
                    </>
                ),
                4: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">完全背包：正序就是它的模板</h3>
                        <CodeBlock>{`// 完全背包：每件可拿无限次
int dp[1005] = {0};
for (int i = 1; i <= n; i++)
    for (int c = w[i]; c <= C; c++)              // ← 正序
        dp[c] = max(dp[c], dp[c - w[i]] + v[i]);
cout << dp[C];`}</CodeBlock>
                        <Callout icon={Repeat} title="别把正序当成「写错了但恰好能用」" tone="blue">
                            正序不是 0/1 背包的 bug，而是完全背包的<strong>正解</strong>。
                            <code className="font-mono">dp[c-w[i]]</code> 里已经含了第 i 件，
                            再加一件就是「第二次拿它」，这正是无限次的含义。
                            <br /><br />
                            所以两个模板的差别只有一个字：<strong>倒序 vs 正序</strong>。
                            记不住的时候就回想：倒序读的是「旧值」，所以只能拿一次。
                        </Callout>

                        <h3 className="mt-8 text-xl font-black text-slate-950">变形：恰好装满</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            前面求的都是「容量不超过 C 时的最大价值」，装不满也行。
                            如果题目要求<strong>恰好装满</strong>，代码不用改，
                            <strong>只改初值</strong>。
                        </p>
                        <CompareTable
                            headers={['题目要求', 'dp 初值', '含义']}
                            rows={[
                                ['容量不超过 C，求最大价值', '全部为 0', '任何容量都可以「什么都不装」，合法'],
                                ['恰好装满 C，求最大价值', 'dp[0]=0，其余为 -∞', '除了容量 0，其他容量在没装东西时都是「不合法状态」'],
                                ['恰好装满，求最小价值', 'dp[0]=0，其余为 +∞', '同理，但取 min'],
                                ['恰好装满，求方案数', 'dp[0]=1，其余为 0', '容量 0 有 1 种方案（什么都不拿）'],
                            ]}
                        />
                        <CodeBlock>{`// 恰好装满 + 最大价值
const int NEG = -1e9;
for (int c = 1; c <= C; c++) dp[c] = NEG;   // 只有 dp[0] 保持 0
dp[0] = 0;
for (int i = 1; i <= n; i++)
    for (int c = C; c >= w[i]; c--)
        if (dp[c - w[i]] != NEG)             // 前一个状态必须合法
            dp[c] = max(dp[c], dp[c - w[i]] + v[i]);

if (dp[C] == NEG) cout << "无法恰好装满";
else cout << dp[C];`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="为什么初值能表达「合法性」" tone="rose">
                            dp[c] = -∞ 表示「容量恰好 c 这个状态目前达不到」。
                            由于取的是 max，任何从 -∞ 转移出来的值都会极小，
                            <strong>自然不会被选为最优解</strong>，从而把不合法的状态挡在外面。
                            <br /><br />
                            用 <code className="font-mono">-1e9</code> 而不是 <code className="font-mono">INT_MIN</code>：
                            后者加上 v[i] 会<strong>整数下溢</strong>变成正数，判断彻底失效。
                            这是恰好装满类题目最隐蔽的一个坑。
                        </Callout>
                        <MiniQuiz items={[{
                            question: '0/1 背包压成一维后，容量循环为什么必须倒序？',
                            answer: '保证读到的是上一行的旧值',
                            reason: '倒序时 dp[c-w[i]] 这一轮还没被更新，等价于二维的 dp[i-1][c-w[i]]，第 i 件只被拿一次。正序则会读到本轮已含第 i 件的值，导致重复选取。',
                        }, {
                            question: '「恰好装满」的题目，一维 dp 数组该怎么初始化？',
                            answer: 'dp[0]=0，其余 -∞',
                            reason: '除容量 0 外，其他容量在没装任何东西时都是不可达状态。用极小值表示不合法，取 max 时自然不会被选中。',
                        }, {
                            question: '恰好装满时用 INT_MIN 当 -∞ 会出什么问题？',
                            answer: '加法整数下溢',
                            reason: 'INT_MIN + v[i] 会溢出成一个很大的正数，反而被 max 选中，判断完全失效。应该用 -1e9 这类留有余量的值。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '用三件物品（2/3、3/4、4/5）和容量 6，先写二维 0/1 背包，打印整张表并手工核对。',
                                '压成一维倒序，验证 dp[6] 仍是 8。',
                                '只把循环改成正序，观察 dp[6] 变成 9，并说明这 9 是怎么来的。',
                                '实现完全背包，用「硬币面值 2、3、4，凑出 6 的最大价值」验证。',
                                '把题目改成「恰好装满容量 5」，设置好 -∞ 初值，确认输出「无法恰好装满」还是具体数值。',
                                '故意把 -1e9 换成 INT_MIN，观察答案会错成什么样，理解下溢的后果。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt="一道题：有 n 种硬币，面值各为 a[i]，每种数量无限。问凑出金额 M 最少需要多少枚硬币。请说明这属于哪类背包、循环方向如何、初值怎么设，并写出转移方程。"
                            hint="「数量无限」定类型；「最少枚数」意味着要取 min 而且必须恰好凑出 M。"
                            answer={`这是完全背包（每种硬币无限次），且是「恰好装满 + 求最小」的变形。

状态：dp[c] = 恰好凑出金额 c 所需的最少硬币数。
转移：dp[c] = min(dp[c], dp[c - a[i]] + 1)——每枚硬币的「价值」都是 1 枚，所以加 1 而不是加 v[i]。
循环方向：容量正序（完全背包），即 for (int c = a[i]; c <= M; c++)。
初值：dp[0] = 0，其余全部设为一个很大的数（如 1e9，不要用 INT_MAX，否则 +1 会溢出）。
答案：若 dp[M] 仍是初始大值，说明凑不出，输出 -1；否则输出 dp[M]。

两个要点：一是「求最小」把 max 换成 min、把 -∞ 换成 +∞，结构完全不变；二是这里恰好装满是题目内在要求（金额必须刚好是 M，不能多给），所以初值不能全 0——全 0 会让 dp[M] 直接是 0，答案错成「不需要硬币」。`}
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能说明一维倒序为什么能避免重复选取，以及正序为什么正好是完全背包',
                                '我能处理恰好装满时的初值设置，并知道为什么不能用 INT_MIN 当 -∞',
                                '我能读题识别一道题属于哪一类背包，找出决定类型的那句话',
                                '我能先写二维再压一维，并说清压维的依据是「只依赖上一行」',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
