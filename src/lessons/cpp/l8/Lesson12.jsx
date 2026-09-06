import React, { useMemo, useState } from 'react';
import { AlertTriangle, Gauge, Scale, TrendingUp } from 'lucide-react';
import CppL8LessonSupport from '../../../components/CppL8LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '递归式怎么解' },
    { id: 2, title: '主定理', category: '三种情形' },
    { id: 3, title: '均摊分析', category: 'vector 扩容的代价' },
    { id: 4, title: '时空权衡', category: '省时间还是省空间' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

// 主定理判定：T(n) = a·T(n/b) + O(n^d)
// 比较 log_b(a) 与 d，分三种情形。这些例子的结论都是标准结果。
const RECURRENCES = [
    {
        id: 'merge',
        expr: 'T(n) = 2T(n/2) + O(n)',
        a: 2, b: 2, d: 1,
        example: '归并排序、归并统计逆序对',
        answer: 'O(n log n)',
        note: 'log₂2 = 1 = d，属于情形二：分治与合并的代价相当，两者都不可忽略，结果多一个 log。',
    },
    {
        id: 'binary',
        expr: 'T(n) = T(n/2) + O(1)',
        a: 1, b: 2, d: 0,
        example: '二分查找',
        answer: 'O(log n)',
        note: 'log₂1 = 0 = d，情形二。每层只做常数工作，共 log n 层。',
    },
    {
        id: 'karatsuba',
        expr: 'T(n) = 3T(n/2) + O(n)',
        a: 3, b: 2, d: 1,
        example: 'Karatsuba 大数乘法',
        answer: 'O(n^1.585)',
        note: 'log₂3 ≈ 1.585 > d = 1，情形一：递归产生的子问题总量占主导，合并的代价可以忽略。',
    },
    {
        id: 'linear',
        expr: 'T(n) = 2T(n/2) + O(n²)',
        a: 2, b: 2, d: 2,
        example: '合并代价很高的分治',
        answer: 'O(n²)',
        note: 'log₂2 = 1 < d = 2，情形三：合并的代价占主导，总复杂度就等于顶层那一次合并的代价。',
    },
    {
        id: 'quick',
        expr: 'T(n) = T(n−1) + O(n)',
        a: null, b: null, d: null,
        example: '快排最坏情况、朴素递归求和',
        answer: 'O(n²)',
        note: '注意这不是主定理的形式——子问题规模是 n−1 而不是 n/b。要直接展开求和：n + (n−1) + … + 1 = n(n+1)/2。',
    },
];

function MasterTheoremLab() {
    const [id, setId] = useState('merge');
    const current = RECURRENCES.find((r) => r.id === id) || RECURRENCES[0];

    const verdict = useMemo(() => {
        if (current.a === null) return { kind: 'na', label: '不适用主定理', logba: null };
        const logba = Math.log(current.a) / Math.log(current.b);
        const eps = 1e-9;
        if (logba > current.d + eps) return { kind: 1, label: '情形一：递归主导', logba };
        if (Math.abs(logba - current.d) < eps) return { kind: 2, label: '情形二：两者相当', logba };
        return { kind: 3, label: '情形三：合并主导', logba };
    }, [current]);

    const tone = verdict.kind === 'na' ? 'bg-slate-100 ring-slate-300 text-slate-800'
        : verdict.kind === 1 ? 'bg-violet-50 ring-violet-200 text-violet-900'
            : verdict.kind === 2 ? 'bg-emerald-50 ring-emerald-200 text-emerald-900'
                : 'bg-amber-50 ring-amber-200 text-amber-900';

    return (
        <div className="rounded-2xl border border-fuchsia-100 bg-fuchsia-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Gauge className="text-fuchsia-700" aria-hidden="true" />
                <h3 className="text-xl font-black text-slate-950">主定理判定器</h3>
            </div>
            <p className="mb-5 text-sm font-semibold leading-6 text-slate-600">
                主定理处理形如 <code className="font-mono font-bold">T(n) = a·T(n/b) + O(n^d)</code> 的递归式。
                判断方法只有一步：<strong>比较 log_b(a) 和 d 的大小</strong>。
            </p>

            <div className="mb-5 flex flex-wrap gap-2">
                {RECURRENCES.map((r) => (
                    <button
                        key={r.id}
                        type="button"
                        aria-pressed={id === r.id}
                        onClick={() => setId(r.id)}
                        className={`min-h-11 rounded-lg px-3 py-2 font-mono text-xs font-black transition ${id === r.id
                            ? 'bg-fuchsia-700 text-white shadow'
                            : 'bg-white text-slate-700 ring-1 ring-fuchsia-200 hover:bg-fuchsia-100'}`}
                    >
                        {r.expr}
                    </button>
                ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-xl bg-slate-900 p-5">
                    <div className="text-xs font-bold text-slate-400">递归式</div>
                    <div className="mt-1 font-mono text-lg font-black text-fuchsia-300">{current.expr}</div>
                    {current.a !== null ? (
                        <div className="mt-3 space-y-1 border-t border-slate-700 pt-3 font-mono text-xs text-slate-300">
                            <div>a = {current.a}（分成几个子问题）</div>
                            <div>b = {current.b}（规模缩小几倍）</div>
                            <div>d = {current.d}（合并的代价是 n^d）</div>
                            <div className="pt-1 text-amber-300">
                                log_{current.b}({current.a}) = {verdict.logba.toFixed(3)} vs d = {current.d}
                            </div>
                        </div>
                    ) : (
                        <p className="mt-3 border-t border-slate-700 pt-3 text-xs font-bold text-rose-400">
                            子问题规模是 n−1，不是 n/b —— 主定理套不上
                        </p>
                    )}
                </div>

                <div className={`rounded-xl p-5 ring-1 ${tone}`}>
                    <div className="text-xs font-black">{verdict.label}</div>
                    <div className="mt-1 font-mono text-2xl font-black">{current.answer}</div>
                    <p className="mt-3 border-t border-current/20 pt-3 text-sm font-semibold leading-6">
                        {current.note}
                    </p>
                    <p className="mt-2 text-xs font-bold opacity-80">典型例子：{current.example}</p>
                </div>
            </div>
        </div>
    );
}

export default function Lesson12() {
    return (
        <CppLessonShell
            lessonNumber={12}
            lessonTitle="复杂度的严格分析"
            lessonSubtitle="递归式怎么解，均摊怎么算"
            accent="fuchsia"
            levelTitle="C++ 提高"
            levelCode="L8"
            sections={sections}
            previousPath="/lesson/8/11"
            nextPath="/lesson/8/13"
            prerequisites={['完成七级第 1 课的复杂度分析', '知道对数的基本性质', '会写递归函数']}
            topSupport={<CppL8LessonSupport lessonId={12} />}
            bottomSupport={<CppL8LessonSupport lessonId={12} placement="bottom" />}
            hero={{
                title: '为什么归并排序是 O(n log n)',
                description: '本课用主定理解递归式、用均摊分析算 vector 扩容的代价，并讨论时间与空间的权衡。',
            }}
            goals={['能用主定理分析递归复杂度', '能分析均摊复杂度', '能区分时间与空间的权衡']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={TrendingUp} title="七级学的是「数循环」，八级要会「解递归」" tone="blue">
                            七级第 1 课的方法是数嵌套循环的执行次数——对循环有效，
                            但<strong>对递归无效</strong>。
                            <br /><br />
                            归并排序的代码里只有一层循环，可它是 O(n log n)。
                            那个 log n 从哪来？答案在<strong>递归的层数</strong>里，
                            需要一套新方法。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">递归式的写法</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            把递归函数的代价写成一个等式。以归并排序为例：
                        </p>
                        <CodeBlock>{`void mergeSort(int l, int r) {
    if (r - l <= 1) return;              // 边界：O(1)
    int m = (l + r) / 2;
    mergeSort(l, m);                     // 一半规模，代价 T(n/2)
    mergeSort(m, r);                     // 又一半，代价 T(n/2)
    merge(l, m, r);                      // 合并两段有序数组，代价 O(n)
}
// 于是：T(n) = 2·T(n/2) + O(n)`}</CodeBlock>
                        <Callout icon={Gauge} title="递归式的三个要素" tone="amber">
                            <code className="font-mono font-bold">T(n) = a·T(n/b) + O(n^d)</code>
                            <br /><br />
                            · <strong>a</strong>：一次调用分裂成几个子问题（归并排序是 2 个）
                            <br />· <strong>b</strong>：每个子问题的规模缩小几倍（缩到 1/2，所以 b = 2）
                            <br />· <strong>d</strong>：除递归之外，自己还要做多少工作（merge 是 O(n)，所以 d = 1）
                            <br /><br />
                            这三个数一确定，复杂度就能直接查出来——这就是主定理。
                        </Callout>
                    </>
                ),
                2: (
                    <>
                        <MasterTheoremLab />
                        <h3 className="mt-8 text-xl font-black text-slate-950">主定理的三种情形</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            把 <code className="font-mono font-bold">log_b(a)</code> 和 <code className="font-mono font-bold">d</code> 比一比：
                        </p>
                        <CompareTable
                            headers={['情形', '条件', '结果', '含义']}
                            rows={[
                                ['一', 'log_b(a) > d', 'O(n^log_b(a))', '子问题太多，递归的总量占主导，合并代价可忽略'],
                                ['二', 'log_b(a) = d', 'O(n^d · log n)', '两边势均力敌，每层代价相同，共 log n 层'],
                                ['三', 'log_b(a) < d', 'O(n^d)', '合并太贵，顶层那一次就决定了总量'],
                            ]}
                        />
                        <Callout icon={Scale} title="情形二为什么会多一个 log n" tone="blue">
                            以归并排序为例，画出递归树：
                            <br />· 第 0 层：1 个规模 n 的问题，合并代价 n
                            <br />· 第 1 层：2 个规模 n/2 的问题，合并代价共 2 × (n/2) = n
                            <br />· 第 2 层：4 个规模 n/4 的问题，合并代价共 4 × (n/4) = n
                            <br />· ……
                            <br /><br />
                            <strong>每一层的总代价都是 n</strong>。而规模每层折半，
                            从 n 降到 1 需要 <strong>log₂n 层</strong>。
                            总代价 = n × log n。
                            <br /><br />
                            这就是 log 的来源：<strong>它是递归的层数，不是循环的次数</strong>。
                        </Callout>
                        <Callout icon={AlertTriangle} title="主定理有适用条件" tone="rose">
                            它<strong>只处理 T(n) = a·T(n/b) + O(n^d) 这种形状</strong>。
                            <br /><br />
                            <code className="font-mono">T(n) = T(n−1) + O(n)</code> 就套不上——
                            子问题规模是 <strong>n−1</strong>（减法）而不是 <strong>n/b</strong>（除法）。
                            这类要直接展开：T(n) = n + (n−1) + … + 1 = <strong>O(n²)</strong>。
                            这正是快排最坏情况的形式。
                            <br /><br />
                            判断口诀：<strong>规模是「除以」几就用主定理，是「减去」几就展开求和</strong>。
                        </Callout>
                        <PredictCheck
                            className="mt-6"
                            prompt="递归式 T(n) = 2T(n/2) + O(n²) 的复杂度是多少？"
                            options={['O(n log n)', 'O(n²)', 'O(n² log n)', 'O(n³)']}
                            correctIndex={1}
                            explanation="a=2、b=2、d=2，所以 log₂2 = 1 < d = 2，属于情形三：合并的代价占主导。此时总复杂度就等于顶层那一次合并的代价 O(n²)。直观理解：第 0 层代价 n²，第 1 层是 2×(n/2)² = n²/2，第 2 层是 4×(n/4)² = n²/4……每层减半，等比数列求和收敛到 2n²，仍是 O(n²)。选 O(n² log n) 是误套了情形二的公式。"
                            misconception="容易看到「2T(n/2)」就条件反射答 O(n log n)。那个结论只在 d = 1（合并是线性）时成立，d 变了结论就变。"
                        />
                    </>
                ),
                3: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">均摊分析：vector 的 push_back</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            <code className="font-mono">vector::push_back</code> 通常是 O(1)，
                            但空间不够时要<strong>重新分配一块更大的内存并把所有元素搬过去</strong>，
                            那一次是 O(n)。既然有 O(n) 的操作，为什么还说它是 O(1)？
                        </p>
                        <Callout icon={Scale} title="因为扩容很少发生，且成本被摊薄了" tone="blue">
                            vector 的扩容策略是<strong>容量翻倍</strong>（不是加一个固定值）。
                            假设从容量 1 开始，插入 n 个元素，扩容发生在容量为
                            1、2、4、8、…、n 的时刻。
                            <br /><br />
                            各次扩容搬移的元素总数是 1 + 2 + 4 + … + n。
                            这是等比数列，和 <strong>&lt; 2n</strong>。
                            <br /><br />
                            所以 n 次 push_back 的总代价是 O(n)（每次插入 O(1) 加上总共不到 2n 次搬移），
                            <strong>平摊到每次操作就是 O(1)</strong>。
                        </Callout>
                        <CompareTable
                            headers={['扩容策略', 'n 次插入的总搬移量', '均摊代价']}
                            rows={[
                                ['容量翻倍（×2）', '< 2n', 'O(1)'],
                                ['容量 ×1.5', '< 3n', 'O(1)'],
                                ['容量 +1（每次都搬）', '1+2+…+n ≈ n²/2', 'O(n) —— 灾难'],
                                ['容量 +100', '约 n²/200', 'O(n) —— 仍是灾难'],
                            ]}
                        />
                        <Callout icon={AlertTriangle} title="关键在「乘」而不是「加」" tone="rose">
                            只要扩容是<strong>按比例放大</strong>，均摊就是 O(1)；
                            只要是<strong>加一个固定量</strong>，均摊就退化成 O(n)。
                            <br /><br />
                            所以自己写动态数组时，扩容一定写 <code className="font-mono font-bold">capacity *= 2</code>，
                            不要写 <code className="font-mono">capacity += 10</code>。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">均摊 vs 平均：不是一回事</h3>
                        <CompareTable
                            headers={['', '均摊复杂度（amortized）', '平均复杂度（average-case）']}
                            rows={[
                                ['针对什么', '一串操作的总代价除以次数', '单次操作在随机输入下的期望'],
                                ['有没有概率', '没有，是确定性的保证', '有，依赖输入的概率分布'],
                                ['最坏情况', '总代价有严格上界', '单次仍可能很慢'],
                                ['例子', 'vector push_back、并查集路径压缩', '快排 O(n log n)、哈希表查找'],
                            ]}
                        />
                        <Callout icon={Scale} title="这个区别很实在" tone="amber">
                            快排的<strong>平均</strong>是 O(n log n)，但遇到特定输入会退化成 O(n²)——
                            这是概率意义上的保证，<strong>坏运气真的会发生</strong>。
                            <br /><br />
                            vector 的<strong>均摊</strong> O(1) 则是确定性的：
                            无论什么输入，n 次 push_back 的总代价<strong>一定</strong>不超过 O(n)。
                            没有「运气差」这种情况。
                            <br /><br />
                            所以均摊比平均是更强的保证。第 8 课并查集的路径压缩也是均摊结论。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">时间与空间的权衡</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            很多优化的本质是<strong>用空间换时间</strong>：预先算好存起来，查询时直接取。
                        </p>
                        <CompareTable
                            headers={['技巧', '额外空间', '换来什么', '学过的课']}
                            rows={[
                                ['前缀和', 'O(n)', '区间求和从 O(n) 降到 O(1)', '八级 9'],
                                ['打表（组合数）', 'O(n²)', '单次查询从 O(n) 降到 O(1)', '八级 2'],
                                ['记忆化搜索', 'O(状态数)', '避免重复计算，指数降到多项式', '七级 8、9'],
                                ['筛法预处理', 'O(n)', '批量质数判定从 O(n√n) 降到 O(n)', '八级 10'],
                                ['邻接矩阵', 'O(n²)', '查两点是否相邻从 O(deg) 降到 O(1)', '七级 5'],
                            ]}
                        />
                        <Callout icon={Scale} title="但反方向也存在：用时间换空间" tone="blue">
                            · <strong>滚动数组</strong>：DP 只保留上一行，空间 O(n²) → O(n)，代价是无法回溯方案（七级 10、八级 2）。
                            <br />· <strong>邻接表代替矩阵</strong>：空间 O(n²) → O(n+m)，代价是查相邻从 O(1) 变 O(deg)。
                            <br />· <strong>不打表现算</strong>：省下表的空间，每次查询重算。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">怎么判断该往哪个方向优化</h3>
                        <StepList
                            title="先看哪一项先爆"
                            steps={[
                                '算出当前方案的时间和空间，分别对照题目的限制（通常 1 秒约 10⁸ 次运算、内存 256 MB）。',
                                '如果时间超了而空间还很宽裕 → 用空间换时间：预处理、打表、记忆化。',
                                '如果空间超了而时间还有余量 → 用时间换空间：滚动数组、换存储结构、现算不存。',
                                '如果两者都超 → 说明算法本身要换，不是优化常数的问题。',
                            ]}
                        />
                        <Callout icon={AlertTriangle} title="一个常见的判断失误" tone="rose">
                            看到超时就本能地想「优化常数」——比如把 cin 换成 scanf、减少函数调用。
                            <br /><br />
                            但如果算法是 O(n²) 而 n = 10<sup>5</sup>，那是 10<sup>10</sup> 次运算，
                            <strong>优化常数最多快几倍，差着一百倍</strong>。
                            <br /><br />
                            <strong>先看量级对不对，再谈常数。</strong>
                            量级不对时，唯一的出路是换算法。
                        </Callout>
                        <MiniQuiz items={[{
                            question: '递归式 T(n) = 2T(n/2) + O(n) 属于主定理的哪种情形？结果是什么？',
                            answer: '情形二，O(n log n)',
                            reason: 'log₂2 = 1 等于 d = 1，两者相当。递归树每层总代价都是 n，共 log n 层，所以是 n log n。这就是归并排序的复杂度。',
                        }, {
                            question: '均摊复杂度和平均复杂度的区别是什么？',
                            answer: '均摊是确定性保证，平均依赖概率分布',
                            reason: 'vector 的 n 次 push_back 总代价一定不超过 O(n)，无论输入如何；而快排的 O(n log n) 是随机输入下的期望，特定输入仍会退化成 O(n²)。均摊是更强的保证。',
                        }, {
                            question: '自己写动态数组，扩容为什么必须按倍数而不是加固定值？',
                            answer: '加固定值会让均摊退化成 O(n)',
                            reason: '翻倍时总搬移量是等比数列 1+2+4+…+n < 2n，均摊 O(1)。每次加固定值则总搬移量约 n²/常数，均摊变成 O(n)。关键在「乘」而非「加」。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '用主定理分析三个递归式：T(n)=2T(n/2)+O(n)、T(n)=T(n/2)+O(1)、T(n)=2T(n/2)+O(n²)，写出每个的 a、b、d 和情形编号。',
                                '画出归并排序的递归树，标出每层的问题个数、单个规模、该层总代价，验证每层都是 n。',
                                '分析 T(n)=T(n−1)+O(n)，说明为什么主定理不适用，并直接展开求和得到 O(n²)。',
                                '自己实现一个动态数组，扩容策略写成 capacity *= 2，统计插入 n 个元素的总搬移次数，验证小于 2n。',
                                '把扩容改成 capacity += 1，重新统计总搬移次数，对比它接近 n²/2。',
                                '为一道题给出「省时间」和「省空间」两种方案，各写出时间和空间复杂度。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt={`一道题：n ≤ 10⁵ 个数，有 q ≤ 10⁵ 个询问，每次问区间 [l, r] 内所有数的和。你先写了「每次询问都从 l 循环加到 r」的做法，结果超时。请分析原因，给出优化方案，并算出优化前后的时间和空间复杂度。另外如果改成「区间最大值」而不是求和，你的方案还成立吗？`}
                            hint={`先算算原方案总共做了多少次加法。优化的方向是「用空间换时间」还是反过来？`}
                            answer={`原方案的问题：单次询问最坏要遍历整个区间，即 O(n)；q 个询问总共 O(nq) = 10⁵ × 10⁵ = 10¹⁰ 次运算，远超 1 秒能承受的约 10⁸，必然超时。这里量级差了一百倍，优化常数（换 scanf、去掉函数调用）完全救不回来——本课强调的「先看量级再谈常数」正是这个意思。

优化方案是前缀和，典型的用空间换时间。预处理 pre[i] = a[1] + a[2] + … + a[i]，只需一遍 O(n) 循环。之后每个询问用 pre[r] − pre[l−1] 即可 O(1) 回答。总时间从 O(nq) 降到 O(n + q) ≈ 2×10⁵，空间从 O(n) 增加到 O(n)（多一个等长的 pre 数组，常数级增长）。

优化前：时间 O(nq)，空间 O(n)。
优化后：时间 O(n + q)，空间 O(n)。
用一个额外数组的空间，换掉了五个数量级的时间。

改成「区间最大值」后，前缀和的做法不成立。因为前缀和依赖「可减性」——sum[l..r] = pre[r] − pre[l−1] 成立的前提是加法有逆运算。而最大值没有逆运算：知道 max(1..r) 和 max(1..l−1) 推不出 max(l..r)，前面那个大值可能就落在 [1, l−1] 里，无法「减掉」。

区间最大值要用别的结构：ST 表（稀疏表）预处理 O(n log n) 时间和空间，查询 O(1)；或线段树，预处理 O(n)、查询 O(log n) 但支持修改。选哪个看有没有修改操作——只查不改用 ST 表更快，要改就用线段树。这两个八级不要求掌握，但要知道「前缀和只适用于有逆运算的操作」这条界限。`}
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能识别一个递归式属于主定理的哪种情形，并说出结果',
                                '我知道主定理只适用于 T(n)=a·T(n/b)+O(n^d)，规模是「减」的要展开求和',
                                '我能说明均摊与平均的区别，知道均摊是确定性保证',
                                '我能分析动态数组扩容的均摊代价，说清为什么必须按倍数扩容',
                                '我能判断该省时间还是省空间，并知道量级不对时优化常数没用',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
