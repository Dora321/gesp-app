import React, { useMemo, useState } from 'react';
import { AlertTriangle, Calculator, Layers, Sigma } from 'lucide-react';
import CppL8LessonSupport from '../../../components/CppL8LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '加法还是乘法' },
    { id: 2, title: '排列与组合', category: '顺序算不算' },
    { id: 3, title: '带限制的计数', category: '三种套路' },
    { id: 4, title: '枚举验证', category: '公式对不对' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

// 五个人排队的三类限制计数。左边是公式，右边是 120 种全排列里真实数出来的个数——
// 两个数必须相等，这就是「小规模枚举验证公式」的做法。
const CASES = [
    {
        id: 'adjacent',
        label: '甲乙必须相邻',
        formula: '2 × 4! = 48',
        count: 48,
        reason: '把甲乙捆成一个整体，和其余 3 人共 4 个单位全排列得 4! = 24 种；捆内甲乙自己还能换位，乘 2。',
        trick: '捆绑法',
    },
    {
        id: 'notAdjacent',
        label: '甲乙不能相邻',
        formula: '5! − 2 × 4! = 120 − 48 = 72',
        count: 72,
        reason: '「不相邻」直接算很麻烦。用总数减去「相邻」的补集，一步到位。',
        trick: '补集法',
    },
    {
        id: 'notEnd',
        label: '甲不能站两端',
        formula: '3 × 4! = 72',
        count: 72,
        reason: '先安排受限的甲：5 个位置里能站的只有中间 3 个。甲定好后，其余 4 人任意排，4! = 24 种。',
        trick: '特殊位置优先',
    },
];

// 真实枚举：全排列 [1..5]，1 代表甲、2 代表乙。
function enumerate(rule) {
    const result = [];
    const permute = (rest, acc) => {
        if (rest.length === 0) { result.push(acc); return; }
        rest.forEach((x, i) => permute([...rest.slice(0, i), ...rest.slice(i + 1)], [...acc, x]));
    };
    permute([1, 2, 3, 4, 5], []);
    const keep = result.filter((p) => {
        const a = p.indexOf(1);
        const b = p.indexOf(2);
        if (rule === 'adjacent') return Math.abs(a - b) === 1;
        if (rule === 'notAdjacent') return Math.abs(a - b) !== 1;
        return a !== 0 && a !== 4;
    });
    return { total: result.length, keep };
}

const NAMES = ['甲', '乙', '丙', '丁', '戊'];

function CountingLab() {
    const [caseId, setCaseId] = useState('notAdjacent');
    const current = CASES.find((item) => item.id === caseId) || CASES[0];
    const { total, keep } = useMemo(() => enumerate(caseId), [caseId]);
    const matches = keep.length === current.count;

    return (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Calculator className="text-indigo-700" aria-hidden="true" />
                <h3 className="text-xl font-black text-slate-950">用枚举验证计数公式</h3>
            </div>
            <p className="mb-5 text-sm font-semibold leading-6 text-slate-600">
                甲乙丙丁戊五人排队，共 {total} 种排法。左边是公式算的，
                右边是把 {total} 种真的数了一遍——<strong>两个数必须相等，否则公式错了</strong>。
            </p>

            <div className="mb-5 flex flex-wrap gap-2">
                {CASES.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        aria-pressed={caseId === item.id}
                        onClick={() => setCaseId(item.id)}
                        className={`min-h-11 rounded-lg px-4 py-2 text-sm font-black transition ${caseId === item.id
                            ? 'bg-indigo-700 text-white shadow'
                            : 'bg-white text-slate-700 ring-1 ring-indigo-200 hover:bg-indigo-100'}`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <div className="text-xs font-black text-slate-500">公式（{current.trick}）</div>
                    <div className="mt-1 font-mono text-xl font-black text-indigo-700">{current.formula}</div>
                    <p className="mt-3 border-t border-slate-100 pt-3 text-sm font-semibold leading-6 text-slate-600">
                        {current.reason}
                    </p>
                </div>

                <div className={`rounded-xl p-5 ring-1 ${matches ? 'bg-emerald-50 ring-emerald-200' : 'bg-rose-50 ring-rose-200'}`}>
                    <div className={`text-xs font-black ${matches ? 'text-emerald-800' : 'text-rose-800'}`}>
                        枚举实际数出来
                    </div>
                    <div className={`mt-1 font-mono text-3xl font-black ${matches ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {keep.length}
                    </div>
                    <p className={`mt-3 border-t pt-3 text-sm font-black ${matches
                        ? 'border-emerald-200 text-emerald-800'
                        : 'border-rose-200 text-rose-800'}`}>
                        {matches ? '与公式一致 ✓' : '与公式不一致，公式有问题'}
                    </p>
                </div>
            </div>

            <div className="mt-4 rounded-xl bg-slate-900 p-5">
                <div className="text-xs font-bold text-slate-400">符合条件的前 12 种排法</div>
                <div className="mt-2 grid gap-1 font-mono text-xs sm:grid-cols-2 lg:grid-cols-3">
                    {keep.slice(0, 12).map((p) => (
                        <div key={p.join('')} className="text-slate-200">
                            {p.map((x) => NAMES[x - 1]).join(' ')}
                        </div>
                    ))}
                </div>
                {keep.length > 12 && (
                    <p className="mt-2 border-t border-slate-700 pt-2 text-xs font-bold text-slate-500">
                        还有 {keep.length - 12} 种未显示
                    </p>
                )}
            </div>
        </div>
    );
}

export default function Lesson1() {
    return (
        <CppLessonShell
            lessonNumber={1}
            lessonTitle="计数原理与排列组合"
            lessonSubtitle="算不清的时候，先把小规模枚举一遍"
            accent="indigo"
            levelTitle="C++ 提高"
            levelCode="L8"
            sections={sections}
            previousPath="/level8"
            nextPath="/lesson/8/2"
            prerequisites={['会算阶乘', '知道乘法与加法的基本运算', '会写嵌套循环枚举']}
            topSupport={<CppL8LessonSupport lessonId={1} />}
            bottomSupport={<CppL8LessonSupport lessonId={1} placement="bottom" />}
            hero={{
                title: '八级从数学开始',
                description: '本课讲加法与乘法原理的分界、排列与组合的判据，以及「不能相邻」「至少一个」这类限制的固定套路。',
            }}
            goals={['能区分加法原理与乘法原理', '能处理带限制条件的计数', '能用分类讨论拆解复杂计数']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={Sigma} title="八级的数学分量" tone="blue">
                            七级考的是数据结构和算法，八级在此之上加了<strong>数学</strong>：
                            计数、组合、概率期望、数论。这些题往往不需要写代码，
                            但需要把<strong>思路算清楚</strong>——而算错一步，整题就没了。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">加法原理还是乘法原理</h3>
                        <CompareTable
                            headers={['', '加法原理', '乘法原理']}
                            rows={[
                                ['什么时候用', '完成一件事有几类互斥的方式', '完成一件事需要连续几个步骤'],
                                ['关键词', '「或者」「分成几类」', '「并且」「先…再…」'],
                                ['算法', '各类方案数相加', '各步方案数相乘'],
                                ['例子', '从 A 到 B 可以坐车（3 班）或坐船（2 班）→ 3 + 2 = 5', '先选上衣（3 件）再选裤子（2 条）→ 3 × 2 = 6'],
                            ]}
                        />
                        <Callout icon={AlertTriangle} title="判断的核心：这两种方式能不能同时发生" tone="amber">
                            坐车和坐船<strong>不能同时</strong>，是两类互斥的选择 → 加法。
                            <br />选上衣和选裤子<strong>必须都做</strong>，是一件事的两个步骤 → 乘法。
                            <br /><br />
                            题目复杂时，先问自己：「我是在<strong>分类</strong>，还是在<strong>分步</strong>？」
                            分类用加、分步用乘。很多题需要两者混用——先分类，每类内部再分步。
                        </Callout>
                    </>
                ),
                2: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">排列还是组合：只看顺序算不算</h3>
                        <CompareTable
                            headers={['', '排列 A(n,m)', '组合 C(n,m)']}
                            rows={[
                                ['顺序', '算，换个顺序就是另一种方案', '不算，只看选了谁'],
                                ['公式', 'n! / (n−m)!', 'n! / (m! × (n−m)!)'],
                                ['关系', 'A(n,m) = C(n,m) × m!', 'C(n,m) = A(n,m) / m!'],
                                ['典型题面', '排队、编号、选正副班长', '选代表、分小组、买几样东西'],
                            ]}
                        />
                        <Callout icon={Layers} title="一句话判据" tone="blue">
                            <strong>把选出来的那几个交换一下位置，还算同一种方案吗？</strong>
                            <br /><br />
                            算同一种 → 组合。「从 5 人选 2 人当代表」，选甲乙和选乙甲是一回事 → C(5,2) = 10。
                            <br />
                            算不同 → 排列。「从 5 人选 2 人当正副班长」，甲正乙副和乙正甲副不一样 → A(5,2) = 20。
                            <br /><br />
                            注意后者正好是前者的 2! = 2 倍，这就是 A = C × m! 的直观含义。
                        </Callout>
                        <CodeBlock>{`// 排列数：从 n 个里有序取 m 个
long long A(int n, int m) {
    long long r = 1;
    for (int i = 0; i < m; i++) r *= (n - i);   // n × (n-1) × … × (n-m+1)
    return r;
}

// 组合数：先算排列再除以 m!。注意除法要放在乘法之间做，
// 否则分子可能先溢出（下一课会讲更稳的递推打表法）。
long long C(int n, int m) {
    if (m > n - m) m = n - m;      // 利用对称性 C(n,m)=C(n,n-m)，少乘几次
    long long r = 1;
    for (int i = 1; i <= m; i++) r = r * (n - i + 1) / i;
    return r;
}`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="那个 C(n,m) = C(n,n-m)" tone="amber">
                            从 20 个里选 18 个，等价于「决定丢掉哪 2 个」——所以
                            C(20,18) = C(20,2) = 190。计算时取 m 和 n−m 里较小的那个，
                            循环次数从 18 降到 2，也更不容易溢出。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">三种限制，三个固定套路</h3>
                        <StepList
                            title="见到限制先想这三招"
                            steps={[
                                '「必须相邻」→ 捆绑法：把它们看成一个整体参与排列，最后乘上整体内部的排法数。',
                                '「不能相邻」→ 补集法（总数 − 相邻）或插空法（先排其他人，再把它们插进空位）。',
                                '「至少一个」→ 补集法：总数 − 「一个都没有」。正面枚举「至少」会漏或重复。',
                            ]}
                        />
                        <Callout icon={Sigma} title="为什么「至少」几乎一定用补集" tone="rose">
                            「至少含一个红球」正面算要分成「恰好 1 个」+「恰好 2 个」+……，
                            分类多且容易算重。
                            <br /><br />
                            反过来，「一个红球都没有」只有一种情形，好算得多。
                            <strong>总数减掉它就是答案</strong>。
                            <br /><br />
                            同理「至多」也常用补集。判断标志：<strong>正面要分很多类时，看看反面是不是只有一类</strong>。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">特殊位置或特殊元素优先</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            如果限制落在某个<strong>具体位置</strong>（如「首位不能是 0」）或某个
                            <strong>具体元素</strong>（如「甲不能站两端」），先把它安排好，剩下的就自由了。
                        </p>
                        <Callout icon={Layers} title="一个高频的具体例子" tone="blue">
                            用 0、1、2、3、4 组成没有重复数字的三位数，有多少个？
                            <br /><br />
                            <strong>首位不能是 0</strong>，所以先定首位：能选 1、2、3、4 共 <strong>4</strong> 种。
                            首位定了之后，剩下 4 个数字（含 0）任选 2 个有序排在后两位：A(4,2) = 4 × 3 = <strong>12</strong> 种。
                            总共 4 × 12 = <strong>48</strong> 个。
                            <br /><br />
                            如果不先处理首位，直接算 A(5,3) = 60，就把首位是 0 的那 12 个（0 后面接 A(4,2)=12）也算进去了。
                        </Callout>
                        <PredictCheck
                            className="mt-6"
                            prompt="甲乙丙丁戊五人排队，要求甲乙不能相邻，共有多少种排法？"
                            options={['48 种', '72 种', '120 种', '96 种']}
                            correctIndex={1}
                            explanation="用补集法：总数 5! = 120，减去甲乙相邻的情形。相邻时把甲乙捆成一个整体，与其余 3 人共 4 个单位全排列 4! = 24 种，捆内甲乙可互换再乘 2，得 48 种。所以不相邻是 120 − 48 = 72 种。下一节的枚举器会把 120 种真的数一遍，验证这个 72。"
                            misconception="选 48 是算成了「相邻」而不是「不相邻」——读题时要盯住是要正面还是反面。"
                        />
                    </>
                ),
                4: (
                    <>
                        <CountingLab />
                        <h3 className="mt-8 text-xl font-black text-slate-950">为什么一定要枚举验证</h3>
                        <Callout icon={Calculator} title="计数题最大的风险是「算重」和「算漏」" tone="rose">
                            计数没有编译器帮你查错。公式写错了，结果仍是一个看起来很正常的数字，
                            你没有任何提示。
                            <br /><br />
                            所以做计数题的标准动作是：<strong>把规模缩到能手数或能程序枚举的大小，
                            用枚举结果核对公式</strong>。小规模对了，公式基本可信；对不上，说明思路有洞。
                        </Callout>
                        <CodeBlock>{`// 用 next_permutation 枚举验证：五人排队，甲乙不相邻有多少种
#include <algorithm>
int a[5] = {1, 2, 3, 4, 5};      // 1 代表甲，2 代表乙
int total = 0, ok = 0;
do {
    total++;
    int pa = 0, pb = 0;
    for (int i = 0; i < 5; i++) {
        if (a[i] == 1) pa = i;
        if (a[i] == 2) pb = i;
    }
    if (abs(pa - pb) != 1) ok++;
} while (next_permutation(a, a + 5));
cout << total << " " << ok;       // 输出 120 72 —— 与公式一致`}</CodeBlock>
                        <Callout icon={AlertTriangle} title="next_permutation 要求先排好序" tone="amber">
                            它生成的是「字典序的下一个排列」，所以必须从<strong>最小的排列</strong>
                            （即已升序排好的数组）开始，才能遍历到全部 n! 种。
                            数组没排序就直接 do-while，会漏掉一部分。
                        </Callout>
                        <MiniQuiz items={[{
                            question: '从 5 人中选 2 人当正副班长，有多少种？选 2 人当代表呢？',
                            answer: '20 种 / 10 种',
                            reason: '正副班长有顺序之分，是排列 A(5,2) = 5×4 = 20；代表不分先后，是组合 C(5,2) = 20/2! = 10。前者正好是后者的 2! 倍。',
                        }, {
                            question: '「至少含一个红球」这类问题为什么常用补集法？',
                            answer: '正面要分很多类，反面只有一类',
                            reason: '正面算要枚举恰好 1 个、恰好 2 个……分类多且易算重。反面「一个红球都没有」只有一种情形，用总数减掉它更简单。',
                        }, {
                            question: '用 0~4 组成无重复数字的三位数，为什么不能直接算 A(5,3)=60？',
                            answer: '首位不能是 0',
                            reason: 'A(5,3) 把首位是 0 的情形也算进去了（那 12 个不是三位数）。要先定首位（4 种），再排后两位 A(4,2)=12，得 4×12=48。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '完成 3 道带限制的排列题：甲乙相邻、甲乙不相邻、甲不站两端，各写出公式并算出答案。',
                                '用 next_permutation 枚举五人排队的 120 种，对上面三道题各数一遍，与公式核对。',
                                '为「从 5 个红球 3 个白球里取 3 个，至少含一个红球」写出补集解法，并说明为什么不正面算。',
                                '整理一张表：什么样的题面用排列、什么样的用组合，各举两个例子。',
                                '用 0~4 组成无重复的三位数，先算 48，再用程序枚举验证。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt={`一道题：把 6 本不同的书分给甲乙丙三人，要求每人至少 1 本，有多少种分法？请说明思路，并给出一个能验证答案的枚举方案。`}
                            hint={`每本书都要选一个人，这是「每本书分步决定」——先算没有限制时有多少种，再处理「至少 1 本」。`}
                            answer={`先算没有限制的：每本书独立地选甲乙丙之一，共 3 种选择，6 本书就是 3⁶ = 729 种（乘法原理，6 个步骤）。

再处理「每人至少 1 本」，用补集。要减掉的是「有人一本都没拿到」的情形，这里要用容斥：恰好指定 1 个人没拿到的情形有 2⁶ = 64 种（剩下 6 本都分给另外两人），指定谁没拿到有 C(3,1) = 3 种选法，共 3 × 64 = 192；但这样把「有两个人都没拿到」的情形减重了，那种情形是所有书都给同一个人，有 C(3,2) × 1⁶ = 3 种（指定哪两人没拿到），需要加回来。所以答案是 729 − 192 + 3 = 540 种。

验证方案：写六重循环（或递归）枚举每本书的归属，共 729 种组合，逐个检查甲乙丙是否都至少出现一次，数出满足的个数。规模只有 729，程序瞬间跑完，能直接确认 540 对不对。这正是本课强调的做法——容斥这类多步减加最容易算错符号，必须用枚举兜一遍。

注意一个易错点：如果题目改成「6 本相同的书」，答案就完全不同（变成把 6 个相同物品分成 3 份且每份非空，是 C(5,2) = 10 种）。「不同的书」意味着每本可区分、要用乘法原理逐本决定；「相同的书」只关心每人拿几本。读题时必须先确认物品是否可区分。`}
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能判断一个计数问题该用排列还是组合——看交换位置算不算同一种方案',
                                '我能识别「不能相邻」「至少一个」等限制，并说出对应的捆绑、插空、补集套路',
                                '我能用小规模枚举验证公式，知道计数题没有编译器帮我查错',
                                '我能区分分类（用加法）和分步（用乘法），并处理两者混用的题',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
