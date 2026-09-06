import React, { useMemo, useState } from 'react';
import { AlertTriangle, Grid3x3, Sigma, Triangle } from 'lucide-react';
import CppL8LessonSupport from '../../../components/CppL8LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '为什么不直接算阶乘' },
    { id: 2, title: '递推关系', category: '一格等于上面两格之和' },
    { id: 3, title: '杨辉三角', category: '打表求组合数' },
    { id: 4, title: '取模与溢出', category: '数字太大怎么办' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

const ROWS = 9;

// 杨辉三角。每一格都由上一行相邻两格相加而来——这就是组合数递推。
function buildPascal(rows) {
    const table = [];
    for (let n = 0; n < rows; n += 1) {
        table[n] = [];
        for (let m = 0; m <= n; m += 1) {
            table[n][m] = (m === 0 || m === n) ? 1 : table[n - 1][m - 1] + table[n - 1][m];
        }
    }
    return table;
}

function PascalLab() {
    const table = useMemo(() => buildPascal(ROWS), []);
    const [picked, setPicked] = useState({ n: 5, m: 2 });
    const { n, m } = picked;
    const isEdge = m === 0 || m === n;

    return (
        <div className="rounded-2xl border border-teal-100 bg-teal-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Triangle className="text-teal-700" aria-hidden="true" />
                <h3 className="text-xl font-black text-slate-950">杨辉三角与组合数递推</h3>
            </div>
            <p className="mb-5 text-sm font-semibold leading-6 text-slate-600">
                点任意一格，看它是由上一行哪两格相加得来的。
                第 n 行第 m 个数就是 <code className="font-mono font-bold">C(n, m)</code>。
            </p>

            <div className="overflow-x-auto rounded-xl bg-white p-5 ring-1 ring-teal-100">
                <div className="min-w-[24rem] space-y-1">
                    {table.map((row, rowIndex) => {
                        const rowSum = row.reduce((a, b) => a + b, 0);
                        return (
                            <div key={rowIndex} className="flex items-center gap-2">
                                <span className="w-10 shrink-0 text-right text-xs font-black text-slate-400">
                                    n={rowIndex}
                                </span>
                                <div className="flex flex-1 justify-center gap-1">
                                    {row.map((value, colIndex) => {
                                        const isPicked = rowIndex === n && colIndex === m;
                                        const isParent = !isEdge && rowIndex === n - 1
                                            && (colIndex === m - 1 || colIndex === m);
                                        return (
                                            <button
                                                key={colIndex}
                                                type="button"
                                                onClick={() => setPicked({ n: rowIndex, m: colIndex })}
                                                aria-label={`C(${rowIndex},${colIndex}) = ${value}`}
                                                className={`flex h-9 min-w-9 items-center justify-center rounded px-1 font-mono text-xs font-black transition ${isPicked
                                                    ? 'bg-teal-700 text-white ring-2 ring-teal-300'
                                                    : isParent
                                                        ? 'bg-amber-400 text-slate-950'
                                                        : 'bg-slate-100 text-slate-700 hover:bg-teal-100'}`}
                                            >
                                                {value}
                                            </button>
                                        );
                                    })}
                                </div>
                                <span className="w-24 shrink-0 text-right font-mono text-xs font-bold text-slate-400">
                                    和 {rowSum} = 2^{rowIndex}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <div className="rounded-xl bg-slate-900 p-5">
                    <div className="text-xs font-bold text-slate-400">你点的这一格</div>
                    <div className="mt-1 font-mono text-2xl font-black text-teal-300">
                        C({n}, {m}) = {table[n][m]}
                    </div>
                    <p className="mt-3 border-t border-slate-700 pt-3 font-mono text-sm font-bold text-amber-300">
                        {isEdge
                            ? `边界：m = ${m === 0 ? '0' : 'n'}，值恒为 1`
                            : `= C(${n - 1}, ${m - 1}) + C(${n - 1}, ${m}) = ${table[n - 1][m - 1]} + ${table[n - 1][m]}`}
                    </p>
                </div>

                <div className="rounded-xl bg-white p-5 ring-1 ring-teal-100">
                    <div className="text-xs font-black text-slate-500">这条递推的组合意义</div>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                        从 n 个人里选 m 个。<strong>盯住其中某一个人（比如甲）</strong>：
                        <br />· 甲被选中 → 剩下的 m−1 个从其余 n−1 人里选 → C(n−1, m−1)
                        <br />· 甲没被选 → 全部 m 个都从其余 n−1 人里选 → C(n−1, m)
                        <br /><br />
                        两种情形互斥且穷尽，加起来就是全部方案。这就是加法原理。
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function Lesson2() {
    return (
        <CppLessonShell
            lessonNumber={2}
            lessonTitle="组合数与杨辉三角"
            lessonSubtitle="用加法递推绕开阶乘的溢出"
            accent="teal"
            levelTitle="C++ 提高"
            levelCode="L8"
            sections={sections}
            previousPath="/lesson/8/1"
            nextPath="/lesson/8/3"
            prerequisites={['完成上一课的排列组合', '会用二维数组打表', '知道 int 和 long long 的取值范围']}
            topSupport={<CppL8LessonSupport lessonId={2} />}
            bottomSupport={<CppL8LessonSupport lessonId={2} placement="bottom" />}
            hero={{
                title: '20! 刚好塞进 long long，21! 就溢出了',
                description: '本课讲组合数的递推关系与组合意义、杨辉三角打表法，以及为什么组合数题几乎总要取模。',
            }}
            goals={['能推导组合数的递推关系', '能用杨辉三角求组合数', '能处理组合数取模']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={AlertTriangle} title="先看一个具体的数" tone="rose">
                            上一课的组合数公式是 <code className="font-mono">C(n,m) = n! / (m!(n−m)!)</code>。
                            直接按定义算，要先求出三个阶乘。问题是：
                            <br /><br />
                            <strong>20! = 2432902008176640000</strong>，勉强塞进 long long（上限约 9.22×10<sup>18</sup>）。
                            <br /><strong>21! ≈ 5.1×10<sup>19</sup></strong>，<strong>溢出</strong>。
                            <br /><br />
                            但 C(21,2) 只等于 210——一个很小的数。
                            <strong>答案不大，中间过程却爆了</strong>，这是直接算阶乘的致命问题。
                        </Callout>
                        <CompareTable
                            headers={['求 C(n,m) 的方法', '中间值大小', '适用范围', '复杂度']}
                            rows={[
                                ['先算三个阶乘再除', 'n! 级别，n>20 就爆', 'n ≤ 20', 'O(n)'],
                                ['边乘边除', '接近答案，安全得多', 'n 较大且答案不超范围', 'O(m)'],
                                ['递推打表（杨辉三角）', '只有组合数本身', 'n ≤ 几千', 'O(n²)'],
                                ['阶乘 + 逆元取模', '全程在模数以内', 'n 很大且要求取模', 'O(n)'],
                            ]}
                        />
                        <Callout icon={Sigma} title="八级最常用的是第三种" tone="blue">
                            递推打表<strong>只用加法</strong>，中间不出现任何比答案更大的数，
                            也不需要除法和逆元。n 在几千以内时，一张二维表就够，
                            而且能一次查很多个 C(n,m)。这一课的重点就是它。
                        </Callout>
                    </>
                ),
                2: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">核心递推式</h3>
                        <div className="mt-4 rounded-xl bg-slate-900 p-5 text-center">
                            <span className="font-mono text-lg font-black text-amber-300">
                                C(n, m) = C(n−1, m−1) + C(n−1, m)
                            </span>
                        </div>
                        <p className="mt-4 text-base leading-7 text-slate-700">
                            边界是 <code className="font-mono font-bold">C(n, 0) = C(n, n) = 1</code>。
                            有了这两条，任何组合数都能只用加法推出来。
                        </p>
                        <Callout icon={Grid3x3} title="它的组合意义（必须会讲）" tone="blue">
                            这条式子不是背下来的，是<strong>数出来的</strong>。
                            从 n 个人里选 m 个，盯住其中某一个特定的人——就叫甲：
                            <br /><br />
                            · <strong>甲在选中的名单里</strong>：那还要从其余 n−1 人里再选 m−1 个 → C(n−1, m−1)
                            <br />· <strong>甲不在名单里</strong>：那 m 个全部从其余 n−1 人里选 → C(n−1, m)
                            <br /><br />
                            这两种情况<strong>互斥</strong>（甲要么在要么不在）且<strong>穷尽</strong>（没有第三种），
                            按加法原理相加即为总数。
                            <br /><br />
                            考试会直接问「这条递推的组合意义是什么」，答的就是这段。
                        </Callout>
                        <CodeBlock>{`const int N = 2005;
long long C[N][N];      // 注意：n 很大时这张表会很占内存，见下面的估算

void init(int n) {
    for (int i = 0; i <= n; i++) {
        C[i][0] = 1;                            // 边界
        for (int j = 1; j <= i; j++)
            C[i][j] = C[i-1][j-1] + C[i-1][j];  // 只用加法，不会中间溢出
    }
}
// 之后任意查询 C[n][m] 都是 O(1)`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="打表的空间开销要先估" tone="amber">
                            二维 long long 表，每格 8 字节。
                            <br />· n = 2000：2001² × 8 ≈ <strong>30 MB</strong>，多数题的内存限制（通常 256 MB）能接受。
                            <br />· n = 5000：5001² × 8 ≈ <strong>191 MB</strong>，很危险。
                            <br />· n = 10000：约 <strong>763 MB</strong>，必爆。
                            <br /><br />
                            所以打表法的适用上界大约在 n ≤ 几千。n 更大时要改用阶乘加逆元的做法，
                            或者只滚动保留上一行（空间降到 O(n)）。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <PascalLab />
                        <h3 className="mt-8 text-xl font-black text-slate-950">杨辉三角的几条性质</h3>
                        <CompareTable
                            headers={['性质', '式子', '说明']}
                            rows={[
                                ['每行首尾都是 1', 'C(n,0) = C(n,n) = 1', '递推的边界'],
                                ['左右对称', 'C(n,m) = C(n,n−m)', '选 m 个等价于「决定丢掉 n−m 个」'],
                                ['每行之和是 2 的幂', 'ΣC(n,m) = 2ⁿ', '每个元素选或不选，共 2ⁿ 种子集'],
                                ['相邻两格相加得下一行', 'C(n,m) = C(n−1,m−1)+C(n−1,m)', '本课的核心递推'],
                            ]}
                        />
                        <Callout icon={Sigma} title="「每行之和 = 2ⁿ」的组合证明" tone="blue">
                            左边 ΣC(n,m) 是「从 n 个元素里选 0 个、1 个、……、n 个的方案数之和」，
                            也就是<strong>所有子集的个数</strong>。
                            <br /><br />
                            右边 2ⁿ 是从另一个角度数同一件事：<strong>每个元素独立地选或不选</strong>，
                            n 个元素各有 2 种可能，乘起来 2ⁿ。
                            <br /><br />
                            同一个集合用两种方式数，结果必然相等。上面实验台每行右侧都标着行和，
                            可以逐行核对。
                        </Callout>
                        <PredictCheck
                            className="mt-6"
                            prompt="杨辉三角第 6 行（n=6，从 0 开始计）是 1 6 15 20 15 6 1。这一行所有数字之和是多少？"
                            options={['64', '32', '128', '48']}
                            correctIndex={0}
                            explanation="1+6+15+20+15+6+1 = 64 = 2⁶。这正是「每行之和等于 2ⁿ」——它等价于「n 个元素的所有子集个数」，因为每个元素独立地选或不选。实验台里每行右侧都标了行和，可以逐行验证。"
                            misconception="容易把 n 从 1 开始数而算成 2⁵=32。杨辉三角的行号习惯从 0 开始，第 0 行只有一个 1。"
                        />
                    </>
                ),
                4: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">为什么组合数题几乎总要取模</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            组合数长得非常快。C(30,15) 已经超过 1.5 亿；C(60,30) ≈ 1.18×10<sup>17</sup>，
                            还在 long long 以内；但 C(100,50) ≈ 1.0×10<sup>29</sup>，
                            <strong>比 long long 上限大了十个数量级</strong>，根本表示不出来。
                        </p>
                        <Callout icon={AlertTriangle} title="所以题目会说「结果对 10⁹+7 取模」" tone="rose">
                            这句话不是为了增加难度，而是为了让答案能被表示出来。
                            <strong>1000000007</strong> 是个质数，且平方约 10<sup>18</sup>，
                            仍在 long long 范围内——所以两个模内的数相乘不会溢出。这是它被选中的原因。
                        </Callout>
                        <CodeBlock>{`const long long MOD = 1000000007;
const int N = 2005;
long long C[N][N];

void init(int n) {
    for (int i = 0; i <= n; i++) {
        C[i][0] = 1;
        for (int j = 1; j <= i; j++)
            C[i][j] = (C[i-1][j-1] + C[i-1][j]) % MOD;   // 每一步都取模
    }
}`}</CodeBlock>
                        <Callout icon={Sigma} title="加法递推法取模特别省心" tone="blue">
                            因为它<strong>只有加法</strong>。取模对加法和乘法都是「可以随时做」的：
                            <br /><code className="font-mono">(a + b) % p = ((a%p) + (b%p)) % p</code>
                            <br /><code className="font-mono">(a × b) % p = ((a%p) × (b%p)) % p</code>
                            <br /><br />
                            <strong>但对除法不成立</strong>！<code className="font-mono">(a / b) % p ≠ (a%p) / (b%p)</code>。
                            这就是为什么按定义算 <code className="font-mono">n!/(m!(n−m)!)</code> 在取模场景下不能直接除——
                            要用「乘以逆元」代替除法（用快速幂求，见第 10 课）。
                            <br /><br />
                            递推法完全避开了除法，所以它在八级里最实用。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">滚动数组：空间从 O(n²) 降到 O(n)</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            如果只需要第 n 行（而不是任意查询），可以只保留一行，原地更新。
                            注意<strong>必须倒序</strong>——道理和七级第 10 课的一维背包完全一样。
                        </p>
                        <CodeBlock>{`long long c[N] = {1};       // c[0] = 1，其余为 0
for (int i = 1; i <= n; i++)
    for (int j = i; j >= 1; j--)            // ← 倒序！
        c[j] = (c[j] + c[j-1]) % MOD;
// 此时 c[m] 就是 C(n, m)

// 为什么倒序：c[j] 依赖 c[j-1] 的「上一行」值。
// 倒序时 c[j-1] 这一轮还没被更新，读到的正是上一行；
// 正序则会读到已被本轮改过的值，结果错。`}</CodeBlock>
                        <MiniQuiz items={[{
                            question: 'C(n,m)=C(n-1,m-1)+C(n-1,m) 的组合意义是什么？',
                            answer: '按某个特定元素在不在选中集合里分两类',
                            reason: '盯住某一个人：他被选中则要从其余 n-1 人里再选 m-1 个；他没被选则 m 个全从其余 n-1 人里选。两类互斥且穷尽，按加法原理相加。',
                        }, {
                            question: '为什么不直接用 n!/(m!(n-m)!) 算组合数？',
                            answer: '中间的阶乘会溢出',
                            reason: '21! 已超过 long long 上限，而 C(21,2) 只有 210——答案很小但中间过程爆了。递推法只用加法，中间值不超过答案本身。',
                        }, {
                            question: '取模运算对哪种四则运算不成立？',
                            answer: '除法',
                            reason: '(a+b)%p 和 (a×b)%p 都能分步取模，但 (a/b)%p ≠ (a%p)/(b%p)。取模场景下的除法要用「乘以逆元」代替，逆元用快速幂求。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '用递推打表求 C(n,m)，打印前 9 行，与实验台的杨辉三角核对。',
                                '验证每行之和等于 2ⁿ，至少检查到 n=10。',
                                '试着用 n!/(m!(n-m)!) 直接算 C(21,2)，观察阶乘溢出后得到的错误结果。',
                                '给递推加上对 10⁹+7 取模，重新计算 C(60,30)，对比取模前后的值。',
                                '把二维表改成滚动一维数组，注意倒序，验证结果一致。',
                                '估算 n=5000 时二维 long long 表要多少内存，判断是否可行。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt={`一道题：一个 n×m 的网格，从左上角走到右下角，每步只能向右或向下，问有多少条不同的路径？答案对 10⁹+7 取模。n、m ≤ 1000。请给出两种解法，并说明它们的关系。`}
                            hint={`总共要走多少步？其中向右几步、向下几步？这几步的顺序有多少种排法？`}
                            answer={`解法一（组合数）：从左上到右下，必须向右走 m−1 步、向下走 n−1 步，总共 (n−1)+(m−1) 步。一条路径唯一对应「这些步里哪几步是向右的」，所以答案就是 C(n+m−2, m−1)。用本课的递推打表求：n、m ≤ 1000 时最大要算 C(1998, 999)，打一张 2000×2000 的表约 30 MB，可行；每一步取模即可。

解法二（DP 递推）：设 dp[i][j] 为走到格子 (i,j) 的路径数。到 (i,j) 只能从上面或左边过来，所以 dp[i][j] = dp[i-1][j] + dp[i][j-1]，第一行和第一列全为 1（只有一条直走的路）。答案是 dp[n][m]，复杂度 O(nm)。

两种解法的关系：它们本质是同一件事。把网格 DP 的表斜着看，dp 的递推式 dp[i][j] = dp[i-1][j] + dp[i][j-1] 和组合数递推 C(n,m) = C(n-1,m-1) + C(n-1,m) 是同一个形状——网格路径数表其实就是旋转过的杨辉三角。这也解释了为什么杨辉三角的递推「只用加法」：它在数的就是这种逐格累加的路径。

如果题目加了限制（比如某些格子是障碍不能走），组合数解法就失效了，必须用 DP——因为 DP 能在递推时跳过障碍格（把它的 dp 值设为 0），而组合数公式没法表达「绕开某一格」。所以 DP 的适用面更广，组合数解法的优势是当没有障碍时可以 O(n) 出答案。`}
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能说出 C(n,m)=C(n-1,m-1)+C(n-1,m) 的组合意义，而不只是背式子',
                                '我能估算打表的空间开销，判断 n 多大时二维表会爆内存',
                                '我知道阶乘直接相乘为什么会溢出——21! 已超 long long，而答案可能很小',
                                '我知道取模对加法乘法可以分步做、对除法不行，因此递推法在取模场景下最省心',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
