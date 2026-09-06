import React, { useMemo, useState } from 'react';
import { AlertTriangle, GitMerge, Scissors, Split } from 'lucide-react';
import CppL8LessonSupport from '../../../components/CppL8LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '分治三步' },
    { id: 2, title: '归并排序', category: '合并才是重点' },
    { id: 3, title: '统计逆序对', category: '在合并时顺手数' },
    { id: 4, title: '分治还是 DP', category: '子问题独立吗' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

const INPUT = [2, 3, 8, 6, 1];

// 归并统计逆序对的完整过程。逆序对总数 5，与暴力枚举一致（验算过）。
function mergeCountTrace(values) {
    const events = [];
    let total = 0;

    const sort = (arr, depth, label) => {
        if (arr.length <= 1) return arr;
        const mid = arr.length >> 1;
        const left = sort(arr.slice(0, mid), depth + 1, `${label}L`);
        const right = sort(arr.slice(mid), depth + 1, `${label}R`);
        const out = [];
        const picks = [];
        let i = 0;
        let j = 0;
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                out.push(left[i]);
                picks.push({ from: 'L', value: left[i], add: 0 });
                i += 1;
            } else {
                const add = left.length - i;
                total += add;
                out.push(right[j]);
                picks.push({ from: 'R', value: right[j], add, remaining: left.slice(i) });
                j += 1;
            }
        }
        while (i < left.length) { out.push(left[i]); picks.push({ from: 'L', value: left[i], add: 0 }); i += 1; }
        while (j < right.length) { out.push(right[j]); picks.push({ from: 'R', value: right[j], add: 0 }); j += 1; }
        events.push({ depth, left, right, out, picks, runningTotal: total });
        return out;
    };

    const sorted = sort([...values], 0, '');
    return { events, total, sorted };
}

function InversionLab() {
    const { events, total, sorted } = useMemo(() => mergeCountTrace(INPUT), []);
    const [index, setIndex] = useState(events.length - 1);
    const current = events[index];

    return (
        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <GitMerge className="text-stone-700" aria-hidden="true" />
                <h3 className="text-xl font-black text-slate-950">在归并时顺手数逆序对</h3>
            </div>
            <p className="mb-5 text-sm font-semibold leading-6 text-slate-600">
                原数组 {INPUT.join('、')}。逆序对 = 满足 i &lt; j 且 a[i] &gt; a[j] 的对数。
                下面按<strong>合并发生的顺序</strong>展示每一次归并。
            </p>

            <div className="rounded-xl bg-white p-5 ring-1 ring-stone-200">
                <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="w-16 shrink-0 text-xs font-black text-slate-400">左半</span>
                        {current.left.map((v, k) => (
                            <span key={`l-${k}`} className="flex h-9 w-9 items-center justify-center rounded bg-stone-600 font-mono text-sm font-black text-white">
                                {v}
                            </span>
                        ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="w-16 shrink-0 text-xs font-black text-slate-400">右半</span>
                        {current.right.map((v, k) => (
                            <span key={`r-${k}`} className="flex h-9 w-9 items-center justify-center rounded bg-amber-600 font-mono text-sm font-black text-white">
                                {v}
                            </span>
                        ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
                        <span className="w-16 shrink-0 text-xs font-black text-slate-400">合并后</span>
                        {current.out.map((v, k) => (
                            <span key={`o-${k}`} className="flex h-9 w-9 items-center justify-center rounded bg-emerald-600 font-mono text-sm font-black text-white">
                                {v}
                            </span>
                        ))}
                    </div>
                </div>

                <label htmlFor="inv-step" className="mt-4 block text-sm font-black text-slate-700">
                    第 {index + 1} / {events.length} 次归并
                </label>
                <input
                    id="inv-step"
                    type="range" min="0" max={events.length - 1} step="1"
                    value={index}
                    onChange={(event) => setIndex(Number(event.target.value))}
                    className="mt-2 w-full"
                />
            </div>

            <div className="mt-5 rounded-xl bg-slate-900 p-5">
                <div className="text-xs font-bold text-slate-400">这次归并每一步取谁，以及数了几对</div>
                <div className="mt-2 space-y-1 font-mono text-xs">
                    {current.picks.map((p, k) => (
                        <div key={k} className={p.add > 0 ? 'text-amber-300' : 'text-slate-400'}>
                            取{p.from === 'L' ? '左' : '右'}边的 {p.value}
                            {p.add > 0
                                ? ` → 左边还剩 ${p.remaining.join('、')}（共 ${p.add} 个），它们都比 ${p.value} 大且在前面，一次加 ${p.add} 对`
                                : ' → 不产生逆序对'}
                        </div>
                    ))}
                </div>
                <div className="mt-3 border-t border-slate-700 pt-3 font-mono text-sm font-black text-emerald-400">
                    累计逆序对 = {current.runningTotal}
                </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-white p-4 ring-1 ring-stone-200">
                    <div className="text-xs font-black text-slate-500">最终逆序对总数</div>
                    <div className="mt-1 font-mono text-3xl font-black text-stone-700">{total}</div>
                    <p className="mt-1 text-xs font-bold text-slate-500">暴力双循环枚举结果也是 {total}</p>
                </div>
                <div className="rounded-xl bg-white p-4 ring-1 ring-stone-200">
                    <div className="text-xs font-black text-slate-500">排序结果</div>
                    <div className="mt-1 font-mono text-lg font-black text-stone-700">{sorted.join(' ')}</div>
                    <p className="mt-1 text-xs font-bold text-slate-500">排序是副产品，逆序对才是目的</p>
                </div>
            </div>
        </div>
    );
}

export default function Lesson13() {
    return (
        <CppLessonShell
            lessonNumber={13}
            lessonTitle="分治与递归优化"
            lessonSubtitle="拆开、各自解决、再合起来——难点在最后一步"
            accent="stone"
            levelTitle="C++ 提高"
            levelCode="L8"
            sections={sections}
            previousPath="/lesson/8/12"
            nextPath="/lesson/8/14"
            prerequisites={['完成上一课的主定理', '会写归并排序', '知道 DP 的状态与转移']}
            topSupport={<CppL8LessonSupport lessonId={13} />}
            bottomSupport={<CppL8LessonSupport lessonId={13} placement="bottom" />}
            hero={{
                title: '归并排序真正值钱的地方不是排序',
                description: '本课讲分治三步、归并统计逆序对的原理，以及分治与动态规划的分界线。',
            }}
            goals={['能设计分治算法', '能分析分治的复杂度', '能识别可用分治优化的问题']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={Split} title="分治三步" tone="blue">
                            <strong>① 分（Divide）</strong>：把问题拆成几个规模更小的<strong>同类</strong>子问题。
                            <br /><strong>② 治（Conquer）</strong>：递归解决每个子问题；规模足够小时直接算。
                            <br /><strong>③ 合（Combine）</strong>：把子问题的答案<strong>合并</strong>成原问题的答案。
                            <br /><br />
                            前两步几乎是模板化的，<strong>第三步才是每道题的关键</strong>——
                            怎么合并，决定了这个分治有没有价值。
                        </Callout>
                        <CompareTable
                            headers={['算法', '分', '治', '合']}
                            rows={[
                                ['归并排序', '对半切', '递归排两半', '合并两个有序数组（O(n)）'],
                                ['快速排序', '按基准分成小于/大于两部分', '递归排两边', '不用合并（分的时候就归好位了）'],
                                ['二分查找', '对半切', '只递归一半', '不用合并'],
                                ['求最大值', '对半切', '递归求两半的最大值', '取两者较大'],
                            ]}
                        />
                        <Callout icon={Scissors} title="快排和归并的代价分配正好相反" tone="amber">
                            <strong>归并排序</strong>：分很容易（直接取中点），<strong>合很费力</strong>（要归并）。
                            <br /><strong>快速排序</strong>：<strong>分很费力</strong>（要按基准 partition 一遍），合不用做。
                            <br /><br />
                            两者的递归式都是 T(n) = 2T(n/2) + O(n)，
                            所以都是 O(n log n)——只是那个 O(n) 花在了不同的地方。
                            <br /><br />
                            但快排的「分」不保证均匀：基准选得差时可能切成 1 和 n−1，
                            递归式退化成 T(n) = T(n−1) + O(n) = <strong>O(n²)</strong>。
                            归并的对半切则永远均匀，所以它的 O(n log n) 是最坏保证。
                        </Callout>
                    </>
                ),
                2: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">归并排序的实现</h3>
                        <CodeBlock>{`int a[N], tmp[N];

void mergeSort(int l, int r) {          // 处理区间 [l, r)
    if (r - l <= 1) return;             // 只剩一个元素，天然有序
    int m = l + (r - l) / 2;
    mergeSort(l, m);
    mergeSort(m, r);

    // 合并 [l,m) 和 [m,r) 两段有序序列
    int i = l, j = m, k = l;
    while (i < m && j < r)
        tmp[k++] = (a[i] <= a[j]) ? a[i++] : a[j++];    // <= 保证稳定
    while (i < m) tmp[k++] = a[i++];
    while (j < r) tmp[k++] = a[j++];
    for (int t = l; t < r; t++) a[t] = tmp[t];          // 写回
}`}</CodeBlock>
                        <Callout icon={GitMerge} title="那个 <= 决定了稳定性" tone="blue">
                            两边元素相等时，<code className="font-mono">a[i] &lt;= a[j]</code> 会
                            <strong>优先取左边</strong>。左边的元素在原数组里本来就在前面，
                            所以相等元素的相对顺序被保住了——<strong>归并排序是稳定的</strong>。
                            <br /><br />
                            如果写成 <code className="font-mono">&lt;</code>，相等时取右边，
                            就变成不稳定的了。这与七级第 14 课「稳定性由实现细节决定」完全一致。
                        </Callout>
                        <Callout icon={AlertTriangle} title="两个实现细节" tone="rose">
                            ① <strong>tmp 数组要开在函数外</strong>。写成局部数组的话，
                            每层递归都分配一次，n = 10<sup>5</sup> 时栈直接爆。
                            <br />② <strong>中点写 <code className="font-mono">l + (r-l)/2</code> 而不是 <code className="font-mono">(l+r)/2</code></strong>。
                            后者在 l、r 都很大时会溢出 int。虽然本题规模下不会，但这是应该养成的习惯。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <InversionLab />
                        <h3 className="mt-8 text-xl font-black text-slate-950">为什么合并时能顺手数出逆序对</h3>
                        <Callout icon={GitMerge} title="关键洞察" tone="blue">
                            合并时，如果<strong>右半的 a[j] 比左半的 a[i] 小</strong>，
                            要先取 a[j]。此时想一想：
                            <br /><br />
                            左半剩下的元素（从 i 到 m−1，共 <code className="font-mono font-bold">m − i</code> 个）
                            <strong>全都 ≥ a[i] &gt; a[j]</strong>（因为左半已排好序），
                            而它们在原数组里的位置<strong>全都在 a[j] 前面</strong>（左半整体在右半之前）。
                            <br /><br />
                            所以它们每一个都和 a[j] 构成一个逆序对——
                            <strong>一次性加上 m − i，不用逐个比较</strong>。
                            <br /><br />
                            这就是把 O(n²) 降到 O(n log n) 的地方：
                            每次取右边元素时，一次结算一批。
                        </Callout>
                        <CodeBlock>{`long long inversions = 0;

void mergeSort(int l, int r) {
    if (r - l <= 1) return;
    int m = l + (r - l) / 2;
    mergeSort(l, m);
    mergeSort(m, r);

    int i = l, j = m, k = l;
    while (i < m && j < r) {
        if (a[i] <= a[j]) {
            tmp[k++] = a[i++];
        } else {
            inversions += m - i;        // ← 只多这一行
            tmp[k++] = a[j++];
        }
    }
    while (i < m) tmp[k++] = a[i++];
    while (j < r) tmp[k++] = a[j++];
    for (int t = l; t < r; t++) a[t] = tmp[t];
}`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="逆序对数量要用 long long" tone="rose">
                            n 个元素的逆序对最多有 <code className="font-mono font-bold">n(n−1)/2</code> 个
                            （完全倒序时）。n = 10<sup>5</sup> 时约 5×10<sup>9</sup>，
                            <strong>远超 int 上限 2.1×10<sup>9</sup></strong>。
                            <br /><br />
                            这是这道经典题最高频的错误：算法完全正确，但计数变量用了 int，
                            大数据下溢出成负数。
                        </Callout>
                        <PredictCheck
                            className="mt-6"
                            prompt="数组 2 3 8 6 1 的逆序对个数是多少？"
                            options={['3', '5', '7', '10']}
                            correctIndex={1}
                            explanation="逐对检查：(2,1)、(3,1)、(8,6)、(8,1)、(6,1) 共 5 对。注意 (2,3)、(2,8)、(2,6)、(3,8)、(3,6) 这些都是正序不算。归并法会分三次结算这 5 对，实验台里可以逐步看到累计过程。如果算成 10，那是 C(5,2) 即所有对数，不是逆序对。"
                            misconception="容易漏掉「1」贡献的那几对——它在最后一位且是最小值，前面每个元素都和它构成逆序对，共 4 对。"
                        />
                        <h3 className="mt-8 text-xl font-black text-slate-950">分治求平面最近点对（思路框架）</h3>
                        <StepList
                            title="O(n log n) 的做法"
                            steps={[
                                '把所有点按 x 坐标排序，取中位数把平面切成左右两半。',
                                '递归求出左半的最近距离 d1、右半的最近距离 d2，令 d = min(d1, d2)。',
                                '合并：只需检查「横跨中线、且与中线距离小于 d」的那条竖带里的点对——带外的点对距离必然 ≥ d。',
                                '带内的点按 y 排序后，每个点只需和后面常数个点比较（可以证明不超过 6 个），所以合并是 O(n)。',
                            ]}
                        />
                        <Callout icon={Scissors} title="第 3 步是分治的精髓" tone="amber">
                            朴素做法要检查所有 C(n,2) 对点，O(n²)。
                            分治之后，<strong>大部分点对被「距离必然 ≥ d」这个判断直接排除</strong>，
                            只剩一条窄带要查。
                            <br /><br />
                            这和上一课的剪枝是同一个思想：<strong>用已经算出的信息排除大片可能</strong>。
                            八级只要求理解思路，不要求写出完整代码。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">分治与 DP 的分界线</h3>
                        <Callout icon={Split} title="看子问题会不会重叠" tone="blue">
                            <strong>分治</strong>：子问题<strong>互不重叠</strong>，各算各的，算完合并。
                            归并排序的左右两半没有任何公共元素。
                            <br /><br />
                            <strong>DP</strong>：子问题<strong>大量重叠</strong>，同一个子问题会被反复需要，
                            所以必须记下来避免重算。斐波那契的 f(n−2) 会被 f(n) 和 f(n−1) 都用到。
                            <br /><br />
                            判断方法：<strong>画出递归树，看有没有重复的节点</strong>。
                            没有重复 → 分治；大量重复 → DP 或记忆化。
                        </Callout>
                        <CompareTable
                            headers={['', '分治', '动态规划']}
                            rows={[
                                ['子问题关系', '互不重叠、独立', '大量重叠'],
                                ['要不要存表', '不用', '必须存'],
                                ['典型复杂度', 'O(n log n)（主定理）', 'O(状态数 × 转移代价)'],
                                ['方向', '自顶向下拆', '自底向上填（或记忆化自顶向下）'],
                                ['例子', '归并排序、快排、二分、最近点对', 'LIS、背包、区间 DP、树形 DP'],
                            ]}
                        />
                        <Callout icon={AlertTriangle} title="有的题两者都能用，但代价不同" tone="rose">
                            求数组最大值：分治写法 T(n) = 2T(n/2) + O(1) = O(n)，
                            但一层循环也是 O(n) 且常数更小——<strong>这种情况没必要分治</strong>。
                            <br /><br />
                            分治值得用的标志是：<strong>合并这一步能利用子问题已排好的结构</strong>，
                            从而把朴素的 O(n²) 降下来。逆序对就是典范：
                            如果只是想排序，用 sort 就行；正因为「顺手数逆序对」利用了有序性，
                            分治才有价值。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">递归优化的两个常见手段</h3>
                        <CompareTable
                            headers={['手段', '做什么', '效果']}
                            rows={[
                                ['记忆化', '把算过的子问题结果存下来', '指数降到多项式（子问题重叠时）'],
                                ['小规模改暴力', 'n < 16 时直接插入排序而不再递归', '减少递归开销，常数变小'],
                                ['尾递归改循环', '把递归的最后一步改成 while', '避免栈溢出'],
                                ['提前剪枝', '发现不可能出解就返回', '砍掉整棵子树（七级第 8 课）'],
                            ]}
                        />
                        <MiniQuiz items={[{
                            question: '归并排序统计逆序对时，为什么取右边元素能一次加 m−i 对？',
                            answer: '左半剩余元素都比它大且在它前面',
                            reason: '左半已排序，所以从 i 到 m−1 的元素全 ≥ a[i] > a[j]；而左半整体位于右半之前，所以它们与 a[j] 都构成逆序对。一次结算一批，这是把 O(n²) 降到 O(n log n) 的关键。',
                        }, {
                            question: '分治和 DP 的根本区别是什么？',
                            answer: '子问题是否重叠',
                            reason: '分治的子问题互不重叠，各算各的不必存表；DP 的子问题大量重叠，必须记下结果避免重复计算。判断方法是画递归树看有没有重复节点。',
                        }, {
                            question: 'n = 10⁵ 时统计逆序对，计数变量该用什么类型？',
                            answer: 'long long',
                            reason: '最多 n(n−1)/2 ≈ 5×10⁹ 对，超过 int 上限 2.1×10⁹。这是这道题最高频的错误：算法对但计数溢出成负数。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '实现归并排序，注意 tmp 数组开在函数外、中点用 l + (r-l)/2。',
                                '加一行 inversions += m - i 统计逆序对，用 2 3 8 6 1 验证结果是 5。',
                                '再写一个暴力双循环统计逆序对，用随机数据对拍两种做法。',
                                '把计数变量改成 int，用一个 10⁵ 的完全倒序数组测试，观察它溢出成负数。',
                                '把归并里的 <= 改成 <，用含重复元素的数据验证排序变得不稳定。',
                                '画出归并排序处理 5 个元素的递归树，标出每次合并的左右两半，与实验台核对。',
                                '写一个分治求数组最大值的函数，对比它和一层循环的运行时间，理解「不是所有问题都值得分治」。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt={`一道题：给一个长度为 n 的数组（n ≤ 10⁵），求有多少对 (i, j) 满足 i < j 且 a[i] > 2 × a[j]。请说明能不能改造归并排序来做，怎么改，以及复杂度是多少。`}
                            hint={`标准逆序对的条件是 a[i] > a[j]。这里条件变了，合并时「一次加一批」的逻辑还能用吗？`}
                            answer={`能用，思路完全一样，只是合并时的比较条件和指针推进方式要改。

标准逆序对在合并时借助「左半有序」一次结算一批：取右边元素 a[j] 时，左半剩余的都比它大。这里条件变成 a[i] > 2·a[j]，同样的单调性依然成立——左半已排序，所以如果 a[i] > 2·a[j]，那么 a[i] 之后的元素也都满足。所以「一次加一批」的逻辑仍然有效。

具体改法是把统计和归并拆成两个独立的扫描：
第一步，用两个指针 i 和 j 专门统计。j 从右半第一个元素开始，i 从左半第一个开始；对每个 j，把 i 向右推进到第一个满足 a[i] > 2·a[j] 的位置，此时左半从 i 到 m−1 全都满足条件，一次加上 m − i。由于 a[j] 递增时这个临界位置只会右移，两个指针各只走一遍，这一步是 O(n)。
第二步，照常做普通归并把两段合并成有序（比较用 a[i] <= a[j]，与统计无关）。

不能像标准逆序对那样把统计混在归并的同一个 while 里，因为两者的比较条件不同：归并要按 a[i] <= a[j] 决定取谁，统计要按 a[i] > 2·a[j] 计数，混在一起会互相干扰。分成两遍扫描各 O(n)，不影响总复杂度。

复杂度仍是 O(n log n)：递归式 T(n) = 2T(n/2) + O(n)，按上一课的主定理，log₂2 = 1 = d，属于情形二。

两个必须注意的点：一是计数变量用 long long，最坏情况对数仍是 n²/2 量级；二是 2·a[j] 若 a[j] 可能很大要防溢出，稳妥的写法是比较 a[i] / 2 > a[j]（注意整数除法的边界）或者把 a[j] 转成 long long 再乘。`}
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能说明分治三步的含义，知道「合」才是每道题的关键',
                                '我能解释归并统计逆序对的原理，说清为什么能一次加 m−i 对',
                                '我能判断子问题是否独立，据此选择分治还是 DP',
                                '我知道逆序对计数要用 long long，以及 tmp 数组不能开在递归函数内',
                                '我知道快排的「分」不均匀时会退化成 O(n²)，而归并的对半切是最坏保证',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
