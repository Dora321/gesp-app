import React, { useMemo, useState } from 'react';
import { AlertTriangle, ArrowRightLeft, Grid3x3, Layers } from 'lucide-react';
import CppL7LessonSupport from '../../../components/CppL7LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '重复计算的代价' },
    { id: 2, title: 'DP 四件套', category: '写 DP 的固定套路' },
    { id: 3, title: '最长上升子序列', category: '填表实战' },
    { id: 4, title: '最大子段和', category: '两种状态定义' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

const LIS_INPUT = [2, 5, 3, 7, 4, 8, 6];

// LIS 的 O(n²) 填表：dp[i] = 以 a[i] 结尾的最长上升子序列长度。
// 顺带记录每一格是从哪一格转移来的，好把「状态含义」讲实。
function buildLis(values) {
    const dp = values.map(() => 1);
    const from = values.map(() => -1);
    const steps = [];
    for (let i = 0; i < values.length; i += 1) {
        const candidates = [];
        for (let j = 0; j < i; j += 1) {
            if (values[j] < values[i] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                from[i] = j;
            }
            if (values[j] < values[i]) candidates.push({ j, value: values[j], dpj: dp[j] });
        }
        steps.push({
            i,
            dp: [...dp],
            from: [...from],
            candidates,
            picked: from[i],
        });
    }
    return { dp, from, steps };
}

// 顺着 from 链条回溯出一条最优子序列
function traceLis(values, dp, from) {
    let best = 0;
    for (let i = 1; i < dp.length; i += 1) if (dp[i] > dp[best]) best = i;
    const chain = [];
    let cursor = best;
    while (cursor !== -1) {
        chain.unshift(values[cursor]);
        cursor = from[cursor];
    }
    return { chain, length: dp[best] };
}

function LisLab() {
    const { dp, from, steps } = useMemo(() => buildLis(LIS_INPUT), []);
    const [stage, setStage] = useState(steps.length - 1);
    const current = steps[stage];
    const answer = useMemo(() => traceLis(LIS_INPUT, dp, from), [dp, from]);

    const inChain = useMemo(() => {
        // 只有填完整张表才谈得上最优链条
        if (stage < steps.length - 1) return new Set();
        const set = new Set();
        let best = 0;
        for (let i = 1; i < dp.length; i += 1) if (dp[i] > dp[best]) best = i;
        let cursor = best;
        while (cursor !== -1) { set.add(cursor); cursor = from[cursor]; }
        return set;
    }, [stage, steps.length, dp, from]);

    return (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Grid3x3 className="text-rose-700" aria-hidden="true" />
                <h3 className="text-xl font-black text-slate-950">最长上升子序列填表器</h3>
            </div>
            <p className="mb-5 text-sm font-semibold leading-6 text-slate-600">
                <code className="font-mono font-bold">dp[i]</code> ={' '}
                <strong>以 a[i] 这个数结尾</strong>的最长上升子序列长度。
                注意「结尾」两个字——状态定义里少了它，转移就无从下手。
            </p>

            <div className="rounded-xl bg-white p-5 ring-1 ring-rose-100">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[26rem] text-center font-mono text-sm">
                        <thead className="text-slate-400">
                            <tr>
                                <th className="px-2 py-1.5 text-left font-black">下标 i</th>
                                {LIS_INPUT.map((_, i) => <th key={i} className="px-2 py-1.5 font-black">{i}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t border-slate-100">
                                <td className="px-2 py-2 text-left font-black text-slate-400">a[i]</td>
                                {LIS_INPUT.map((value, i) => (
                                    <td key={i} className="px-1 py-2">
                                        <span className={`flex h-9 w-9 items-center justify-center rounded font-black ${i === current.i
                                            ? 'bg-rose-700 text-white'
                                            : inChain.has(i) ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-700'}`}>
                                            {value}
                                        </span>
                                    </td>
                                ))}
                            </tr>
                            <tr className="border-t border-slate-100">
                                <td className="px-2 py-2 text-left font-black text-slate-400">dp[i]</td>
                                {LIS_INPUT.map((_, i) => (
                                    <td key={i} className="px-1 py-2">
                                        <span className={`flex h-9 w-9 items-center justify-center rounded font-black ${i <= current.i
                                            ? 'bg-rose-100 text-rose-900'
                                            : 'bg-slate-50 text-slate-300'}`}>
                                            {i <= current.i ? current.dp[i] : '?'}
                                        </span>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

                <label htmlFor="lis-stage" className="mt-4 block text-sm font-black text-slate-700">
                    正在算 dp[{current.i}]（第 {stage + 1} / {steps.length} 格）
                </label>
                <input
                    id="lis-stage"
                    type="range"
                    min="0"
                    max={steps.length - 1}
                    value={stage}
                    onChange={(event) => setStage(Number(event.target.value))}
                    className="mt-2 w-full"
                />
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <div className="rounded-xl bg-slate-900 p-5">
                    <div className="text-xs font-bold text-slate-400">这一格的转移过程</div>
                    <p className="mt-2 text-sm font-bold leading-6 text-slate-100">
                        a[{current.i}] = {LIS_INPUT[current.i]}。
                        {current.candidates.length === 0
                            ? ' 前面没有比它小的数，接不上任何序列，所以 dp = 1（只有它自己）。'
                            : ` 前面比它小的有 ${current.candidates.map((c) => `a[${c.j}]=${c.value}(dp=${c.dpj})`).join('、')}。取其中 dp 最大的那个加 1。`}
                    </p>
                    {current.picked >= 0 && (
                        <p className="mt-3 border-t border-slate-700 pt-3 font-mono text-sm font-black text-amber-300">
                            dp[{current.i}] = dp[{current.picked}] + 1 = {current.dp[current.i]}
                        </p>
                    )}
                </div>

                <div className="rounded-xl bg-slate-900 p-5">
                    <div className="text-xs font-bold text-slate-400">答案在哪</div>
                    <p className="mt-2 text-sm font-bold leading-6 text-slate-100">
                        答案<strong className="text-white">不是 dp[n-1]</strong>，而是整张表的最大值——
                        最长的那条上升子序列不一定正好在最后一个数结尾。
                    </p>
                    <div className="mt-3 border-t border-slate-700 pt-3">
                        <div className="text-xs font-bold text-slate-400">max(dp) 与对应的一条子序列</div>
                        <div className="mt-1 text-2xl font-black text-emerald-400">{answer.length}</div>
                        <div className="mt-1 font-mono text-sm font-bold text-emerald-300">
                            {answer.chain.join(' → ')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Lesson9() {
    return (
        <CppLessonShell
            lessonNumber={9}
            lessonTitle="动态规划入门：线性 DP"
            lessonSubtitle="状态、转移、初值、答案——四件套凑齐才算写完"
            accent="rose"
            levelTitle="C++ 冲刺"
            levelCode="L7"
            sections={sections}
            previousPath="/lesson/7/8"
            nextPath="/lesson/7/10"
            prerequisites={['会写递归并理解重复子问题', '完成上一课的剪枝与判重', '会用一维数组做累加统计']}
            topSupport={<CppL7LessonSupport lessonId={9} />}
            bottomSupport={<CppL7LessonSupport lessonId={9} placement="bottom" />}
            hero={{
                title: '把算过的答案记下来，别再算第二遍',
                description: '本课建立 DP 四件套的固定套路，用最长上升子序列和最大子段和两道题把「状态定义」讲实。',
            }}
            goals={['能识别线性 DP 的状态与转移', '能写出 DP 四件套（状态、转移、初值、答案）', '能把递归改写成递推']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={Layers} title="从上一课的判重接上来" tone="blue">
                            上一课末尾说过：搜索 + 判重 + 记住每个状态的答案，就是<strong>记忆化搜索</strong>；
                            而它和动态规划算的是同一件事，只是方向相反。这一课把「记下来」这件事做彻底。
                        </Callout>
                        <p className="mt-5 text-base leading-7 text-slate-700">
                            经典的例子是斐波那契。朴素递归 <code className="font-mono">f(n) = f(n-1) + f(n-2)</code>
                            会把 <code className="font-mono">f(n-2)</code> 算两遍、<code className="font-mono">f(n-3)</code> 算三遍……
                            总调用次数是指数级的。而每个 <code className="font-mono">f(k)</code> 的值<strong>其实只有一个</strong>，
                            算一次存起来就够。
                        </p>
                        <CompareTable
                            headers={['写法', 'f(40) 的调用次数', '复杂度']}
                            rows={[
                                ['朴素递归', '约 3.3 亿次', 'O(2ⁿ)'],
                                ['记忆化搜索', '约 80 次', 'O(n)'],
                                ['递推（DP）', '40 次循环', 'O(n)'],
                            ]}
                        />
                        <Callout icon={AlertTriangle} title="DP 能用的前提：无后效性" tone="rose">
                            「无后效性」是说：<strong>一个状态的值一旦确定，就不会因为后面怎么走而改变</strong>。
                            换句话说，我只需要知道「现在处于什么状态」，不需要知道「我是怎么走到这里的」。
                            <br /><br />
                            这正是上一课「状态 = 影响后续决策的全部信息」的另一面。
                            如果两个不同的历史路径走到同一个状态、后续能做的事却不同，
                            说明状态定义漏了信息，DP 会算错。
                        </Callout>
                    </>
                ),
                2: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">写 DP 就是回答四个问题</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            不要凭感觉写。每道 DP 题都按这个顺序把四件套写在纸上，代码几乎是顺手抄下来的。
                        </p>
                        <StepList
                            title="DP 四件套"
                            steps={[
                                '状态：dp[i] 到底表示什么？必须一句话说清，且带上「以…结尾」「前 i 个」这类限定词。',
                                '转移：dp[i] 由哪些更小的状态算出来？写成一个等式。',
                                '初值：最小的那些状态是多少？通常是 dp[0] 或 dp[1]，边界错了整张表都歪。',
                                '答案：最终要的是 dp 的哪一格？是最后一格，还是整张表的最大值？',
                            ]}
                        />
                        <Callout icon={ArrowRightLeft} title="状态定义里的限定词最容易被省掉" tone="amber">
                            「dp[i] 是最长上升子序列的长度」——这句话是<strong>错的</strong>，或者说没定义完。
                            前 i 个数里的最长？还是以 a[i] 结尾的最长？两者的转移方程完全不同。
                            <br /><br />
                            判断标准很简单：<strong>按你的定义，能不能写出转移方程</strong>。
                            写不出来，就是定义没到位，回去改定义，别硬凑方程。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">记忆化搜索 → 递推的机械改写</h3>
                        <CodeBlock>{`// 写法一：记忆化搜索（自顶向下）
int memo[105];
bool done[105];
int f(int n) {
    if (n <= 1) return n;                  // 边界 = DP 的初值
    if (done[n]) return memo[n];           // 判重 = 查表
    done[n] = true;
    return memo[n] = f(n - 1) + f(n - 2);  // 递归式 = 转移方程
}

// 写法二：递推（自底向上）——把上面倒过来写
int dp[105];
dp[0] = 0; dp[1] = 1;                      // 初值照抄边界
for (int i = 2; i <= n; i++)
    dp[i] = dp[i - 1] + dp[i - 2];         // 转移照抄递归式
// 答案是 dp[n]`}</CodeBlock>
                        <Callout icon={Layers} title="改写时唯一要动脑的地方：填表顺序" tone="blue">
                            递推要保证<strong>算 dp[i] 时它依赖的格子都已经算好了</strong>。
                            上面的例子里 dp[i] 依赖 i-1 和 i-2，所以 i 从小到大正序循环即可。
                            <br /><br />
                            顺序搞错的典型症状：结果偏小或全是初值——因为读到的是还没填的格子。
                            下一课的一维背包会遇到必须<strong>倒序</strong>的情况。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <LisLab />
                        <h3 className="mt-8 text-xl font-black text-slate-950">LIS 的四件套</h3>
                        <CompareTable
                            headers={['四件套', 'LIS 的答案']}
                            rows={[
                                ['状态', 'dp[i] = 以 a[i] 结尾的最长上升子序列长度'],
                                ['转移', 'dp[i] = max(dp[j] + 1)，其中 j < i 且 a[j] < a[i]'],
                                ['初值', '全部为 1（每个数自己就是一个长度 1 的序列）'],
                                ['答案', 'max(dp[0..n-1])，不是 dp[n-1]'],
                            ]}
                        />
                        <CodeBlock>{`int a[1005], dp[1005];
int n;
// ...读入 a[0..n-1]

int answer = 0;
for (int i = 0; i < n; i++) {
    dp[i] = 1;                          // 初值：只有自己
    for (int j = 0; j < i; j++) {
        if (a[j] < a[i])                // 能接在 a[j] 后面
            dp[i] = max(dp[i], dp[j] + 1);
    }
    answer = max(answer, dp[i]);        // 答案是全表最大值
}
cout << answer;                          // O(n²)`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="为什么状态必须带「以 a[i] 结尾」" tone="rose">
                            如果定义成「前 i 个数里的最长上升子序列」，那么算 dp[i] 时你<strong>不知道
                            那条最长序列的末尾是几</strong>，也就无法判断 a[i] 能不能接上去——转移写不出来。
                            <br /><br />
                            加上「以 a[i] 结尾」之后，末尾确定了，接不接得上一比大小就知道。
                            这就是限定词的作用：<strong>把转移需要的信息塞进状态里</strong>。
                        </Callout>
                        <PredictCheck
                            className="mt-6"
                            prompt="序列 2 5 3 7 4 8 6，用上面的方法算完整张 dp 表后，答案取哪一格？"
                            options={['dp[6]，最后一格', '整张表的最大值', 'dp[0]，第一格', 'dp 表的和']}
                            correctIndex={1}
                            explanation="这个序列的 dp 表是 1 2 2 3 3 4 4，最大值 4（对应 2→5→7→8 或 2→3→4→6 等）。而 dp[6] = 4 恰好也等于 4，容易误以为「取最后一格」也对。但把序列改成 2 5 3 7 4 8 6 1，dp[7] = 1（数字 1 前面没有更小的数），此时最后一格远小于答案。所以必须取全表最大值。"
                            misconception="很多 DP 的答案确实在最后一格，于是形成惯性。判断依据是状态定义：「以 a[i] 结尾」意味着答案可能落在任何一格。"
                        />
                    </>
                ),
                4: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">最大子段和：两种状态定义</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            题目：给一个可能含负数的序列，求<strong>连续</strong>一段的最大和。
                            这道题能很好地说明「同一道题可以有不同的状态定义」。
                        </p>
                        <h4 className="mt-6 text-base font-black text-slate-900">写法一：以 i 结尾</h4>
                        <CodeBlock>{`// dp[i] = 以 a[i] 结尾的最大子段和
// 决策只有两种：要么接在前面那段后面，要么从 a[i] 重新开始
dp[0] = a[0];
int answer = dp[0];
for (int i = 1; i < n; i++) {
    dp[i] = max(dp[i - 1] + a[i], a[i]);   // 接上 或 重开
    answer = max(answer, dp[i]);
}`}</CodeBlock>
                        <Callout icon={ArrowRightLeft} title="那个 max 就是全部的决策" tone="blue">
                            <code className="font-mono">dp[i-1] + a[i]</code> 是「延续前面那段」，
                            <code className="font-mono">a[i]</code> 是「丢掉前面，从我这儿重新开始」。
                            什么时候该重开？当 <code className="font-mono">dp[i-1] &lt; 0</code> 时——
                            前面那段是负担，带着它只会更小。
                        </Callout>
                        <h4 className="mt-6 text-base font-black text-slate-900">写法二：滚动变量（空间 O(1)）</h4>
                        <CodeBlock>{`// dp[i] 只用到 dp[i-1]，那就不必开整个数组
int cur = a[0], answer = a[0];
for (int i = 1; i < n; i++) {
    cur = max(cur + a[i], a[i]);
    answer = max(answer, cur);
}`}</CodeBlock>
                        <Callout icon={Layers} title="能不能压空间，看转移依赖谁" tone="amber">
                            <code className="font-mono">dp[i]</code> 只依赖 <code className="font-mono">dp[i-1]</code>，
                            所以一个变量就够。反过来 LIS 的 <code className="font-mono">dp[i]</code> 依赖
                            <strong>前面所有</strong>的 dp[j]，就不能压成变量。
                            <br /><br />
                            这个「看依赖决定能否降维」的思路，下一课压缩背包的二维数组时会再用一次。
                        </Callout>
                        <Callout icon={AlertTriangle} title="全是负数时的坑" tone="rose">
                            如果把 answer 初始化成 <code className="font-mono">0</code>，
                            遇到全负数的序列（如 -3 -1 -5）会输出 0，但正确答案是 <strong>-1</strong>
                            （题目要求至少选一个数时）。所以要初始化成 <code className="font-mono">a[0]</code>，
                            而不是 0。这是最大子段和最高频的错。
                        </Callout>
                        <MiniQuiz items={[{
                            question: 'LIS 的状态为什么必须定义成「以 a[i] 结尾」？',
                            answer: '否则写不出转移方程',
                            reason: '定义成「前 i 个数里的最长」时，你不知道那条序列末尾是几，无法判断 a[i] 能否接上去。加上「以 a[i] 结尾」把末尾信息塞进了状态里。',
                        }, {
                            question: '最大子段和里 answer 初始化成 0，什么数据会出错？',
                            answer: '全是负数的序列',
                            reason: '如 -3 -1 -5，正确答案是 -1，但初值 0 会让答案停在 0。应初始化为 a[0]。',
                        }, {
                            question: '什么样的转移方程可以把 dp 数组压成一个变量？',
                            answer: '只依赖 dp[i-1] 的',
                            reason: '最大子段和的 dp[i] 只用 dp[i-1]，一个滚动变量即可。LIS 的 dp[i] 依赖前面所有 dp[j]，不能压。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '把 2 5 3 7 4 8 6 的 dp 表手算一遍，与上面填表器逐格核对。',
                                '实现 O(n²) 的 LIS，并额外用 from 数组回溯输出一条具体的最长子序列。',
                                '把序列改成 2 5 3 7 4 8 6 1，验证答案仍是 4 而 dp 最后一格是 1——确认答案必须取全表最大值。',
                                '用两种写法各实现一次最大子段和，并用全负数数据测试初值是否正确。',
                                '把斐波那契的记忆化搜索改写成递推，对比两者的代码结构，找出「边界→初值」「递归式→转移」的对应关系。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt="有一排 n 个房子，每个房子里有 a[i] 元钱。规则是不能同时取相邻两个房子的钱，求最多能取多少。请写出这道题的 DP 四件套，并说明状态为什么这样定义。"
                            hint="站在第 i 个房子前，你需要知道的是「第 i-1 个房子取没取」——想想怎么把这个信息放进状态。"
                            answer={`状态：dp[i] = 只考虑前 i 个房子（第 i 个可取可不取）时能取到的最大金额。转移：dp[i] = max(dp[i-1], dp[i-2] + a[i])——第一项是不取第 i 个（那么答案就是前 i-1 个的最优解），第二项是取第 i 个（此时第 i-1 个必须不取，所以从 dp[i-2] 接过来）。初值：dp[0] = 0，dp[1] = a[1]（下标从 1 开始）。答案：dp[n]。

状态这样定义的关键在于「不能相邻」这个约束：转移时需要知道第 i-1 个取没取。这里用的技巧是取第 i 个时直接从 dp[i-2] 转移，从而绕开了「第 i-1 个取没取」这个额外维度。另一种等价写法是开二维 dp[i][0/1] 显式记录第 i 个取没取，转移更直白但空间大一倍。两种都对，前者更简洁。

注意这道题的答案在最后一格（因为状态是「前 i 个」而非「以 i 结尾」），和 LIS 不同——这正好说明「答案在哪」这一件套必须由状态定义决定，不能靠记。`}
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能说明状态定义为什么必须满足无后效性，以及定义里的限定词起什么作用',
                                '我能确定一道 DP 的初值与答案位置，知道答案不一定在最后一格',
                                '我能估算 DP 的时间与空间复杂度，并判断能否把数组压成滚动变量',
                                '我能把一段记忆化搜索机械地改写成递推，并说清填表顺序为什么那样定',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
