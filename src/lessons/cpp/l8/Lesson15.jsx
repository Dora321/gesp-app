import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, AlertTriangle, ClipboardList, Stethoscope } from 'lucide-react';
import CppL8LessonSupport from '../../../components/CppL8LessonSupport';
import CppLessonShell, { Callout, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';
import { getPaper, paperMeta } from '../../../data/gesp/index';
import { resolveTopicTags } from '../../../data/gesp/topics';
import { aggregateWeakTopics, latestWrongIdsByPaper, readExamAttempts } from '../../../utils/examHistory';
import { LEARNING_DATA_EVENT } from '../../../utils/learningData';

const sections = [
    { id: 1, title: '课程导入', category: '八级错在哪一层' },
    { id: 2, title: '我的错题诊断', category: '从真实记录读起' },
    { id: 3, title: '三类错因', category: '建模、实现、复杂度' },
    { id: 4, title: '检查清单', category: '动手前先过一遍' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

// 考点 → 该回去复习哪一课。标签取自八级十套真题里实际出现的那些。
const TOPIC_TO_LESSON = {
    排列组合: 1, 计数: 1, 组合数学: 1,
    杨辉三角: 2, 组合数: 2,
    概率与期望: 3,
    面向对象: 4, 'C++综合': 14, 指针: 14, 内存管理: 14,
    图论: 6, 图的遍历: 6, DFS: 6,
    最短路: 7, Dijkstra: 7,
    最小生成树: 8,
    动态规划: 9, 树形DP: 9, 树与二叉树: 9, 树: 9,
    数论: 10,
    进制转换: 11, 字符串: 11,
    复杂度分析: 12,
    分治: 13, 排序算法: 13,
    哈希表: 4, LCA: 6, 倍增: 6, 重链剖分: 6,
};

// 八级的错因三分法与七级不同：七级分「概念/边界/复杂度」，
// 八级把「概念」拆细成「建模」——因为八级的题往往不是不会算法，而是没看出该用哪个模型。
const CAUSE_TYPES = [
    {
        id: 'model',
        label: '建模型',
        tone: 'bg-rose-50 ring-rose-200 text-rose-900',
        symptom: '算法都会，但没看出这道题该用哪个模型；或者建模建错了（点边定义错、状态漏了一维）。',
        signal: '看了题解一句「这是最小生成树」就立刻会做了。',
        cure: '重做第 6 课的建模训练：读完题先写「点是什么、边是什么」再动手。',
    },
    {
        id: 'impl',
        label: '实现型',
        tone: 'bg-amber-50 ring-amber-200 text-amber-900',
        symptom: '思路完全正确，但代码写错：循环方向、初值、边界、溢出、指针顺序。',
        signal: '隔天重写能对，但当时确实错了。',
        cure: '不用重学原理，需要一份检查清单，每次写完过一遍。',
    },
    {
        id: 'complexity',
        label: '复杂度型',
        tone: 'bg-violet-50 ring-violet-200 text-violet-900',
        symptom: '算法对、代码对，但超时或超内存；或者没意识到该换更优的算法。',
        signal: '样例过了，提交 TLE / MLE。',
        cure: '养成读题先看数据范围的习惯，用第 12 课的方法先算再写。',
    },
];

const CHECKLIST = {
    model: [
        '这道题的模型是什么：图论、DP、数学计数、还是模拟',
        '如果是图论：点是什么、边是什么、有向还是无向、有权还是无权',
        '如果是 DP：状态、转移、初值、答案四件套都写全了吗',
        '状态有没有漏掉一维（走过几次、用过几次机会、当前在谁手里）',
        '有没有「凭空产生」的操作需要加超级源点',
        '「至少 / 至多」类计数是不是该用补集',
    ],
    impl: [
        '区间 DP 的外层循环是 len 吗（不是 i 或 j）',
        '一维背包是倒序吗；完全背包是正序吗',
        'Floyd 的 k 在最外层吗',
        '组合数、逆序对、阶乘这类计数量用了 long long 吗',
        '位运算加括号了吗（x & 1 == 0 是错的）',
        '1 << k 当 k ≥ 31 时改成 1LL << k 了吗',
        'new / delete 配对吗；new[] 用的是 delete[] 吗',
        'gcd / lcm 是先除后乘吗；取模前有没有需要保留整除关系的中间量',
        '数组开够了吗；下标从 0 还是从 1 一致吗',
    ],
    complexity: [
        '题目给的 n、m、q 各是多少，我的算法是几次方',
        'n ≤ 300 才能用 Floyd 或区间 DP（都是 n³）',
        'n ≤ 5000 才能用邻接矩阵，再大必须邻接表',
        'n ≤ 20 才能状态压缩枚举子集（2ⁿ）',
        '询问很多次时，是不是该预处理一次而不是每次都算',
        '递归深度会不会超过 10⁵ 导致爆栈',
        'DP 表的空间算过吗（n=5000 的二维 long long 表是 191 MB）',
    ],
};

function DiagnosisLab() {
    const [attempts, setAttempts] = useState(() => readExamAttempts());
    const [wrongByPaper, setWrongByPaper] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const refresh = () => setAttempts(readExamAttempts());
        window.addEventListener(LEARNING_DATA_EVENT, refresh);
        window.addEventListener('storage', refresh);
        return () => {
            window.removeEventListener(LEARNING_DATA_EVENT, refresh);
            window.removeEventListener('storage', refresh);
        };
    }, []);

    const l8WrongIds = useMemo(() => {
        const all = latestWrongIdsByPaper(attempts);
        return Object.fromEntries(
            Object.entries(all).filter(([paperId]) => paperMeta[paperId]?.level === 8),
        );
    }, [attempts]);

    useEffect(() => {
        let cancelled = false;
        const paperIds = Object.keys(l8WrongIds);
        if (paperIds.length === 0) {
            setWrongByPaper({});
            setLoading(false);
            return () => { cancelled = true; };
        }
        setLoading(true);
        Promise.all(paperIds.map(async (id) => {
            const paper = await getPaper(id);
            const ids = new Set(l8WrongIds[id]);
            return [id, (paper?.questions || []).filter((q) => ids.has(q.id))];
        })).then((pairs) => {
            if (!cancelled) {
                setWrongByPaper(Object.fromEntries(pairs));
                setLoading(false);
            }
        });
        return () => { cancelled = true; };
    }, [l8WrongIds]);

    const weakTopics = useMemo(
        () => aggregateWeakTopics(wrongByPaper, resolveTopicTags),
        [wrongByPaper],
    );
    const totalWrong = useMemo(
        () => Object.values(wrongByPaper).reduce((sum, list) => sum + list.length, 0),
        [wrongByPaper],
    );
    const hasData = Object.keys(l8WrongIds).length > 0;

    return (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Stethoscope className="text-red-700" aria-hidden="true" />
                <h3 className="text-xl font-black text-slate-950">我的八级错题诊断</h3>
            </div>

            {!hasData && (
                <>
                    <p className="text-sm font-semibold leading-6 text-slate-600">
                        这里读的是<strong>你自己在本站做过的八级真题记录</strong>，
                        目前还没有数据——先去题库做一套八级卷子，回来这里就会按考点列出你的薄弱环节。
                    </p>
                    <Link
                        to="/question-bank"
                        className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-black text-white transition hover:bg-red-800"
                    >
                        去做一套八级真题
                    </Link>
                    <p className="mt-4 text-xs font-bold leading-5 text-slate-500">
                        记录只保存在这台设备的浏览器里，不会上传。
                    </p>
                </>
            )}

            {hasData && loading && (
                <p className="text-sm font-bold text-slate-500">正在读取你的做题记录……</p>
            )}

            {hasData && !loading && (
                <>
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="rounded-xl bg-white p-4 ring-1 ring-red-200">
                            <div className="text-xs font-bold text-slate-500">做过的八级卷</div>
                            <div className="mt-1 text-2xl font-black text-slate-900">{Object.keys(l8WrongIds).length} 套</div>
                        </div>
                        <div className="rounded-xl bg-white p-4 ring-1 ring-red-200">
                            <div className="text-xs font-bold text-slate-500">最近一次的错题</div>
                            <div className="mt-1 text-2xl font-black text-red-700">{totalWrong} 道</div>
                        </div>
                        <div className="rounded-xl bg-white p-4 ring-1 ring-red-200">
                            <div className="text-xs font-bold text-slate-500">涉及考点</div>
                            <div className="mt-1 text-2xl font-black text-slate-900">{weakTopics.length} 个</div>
                        </div>
                    </div>

                    {weakTopics.length > 0 && (
                        <div className="mt-5 rounded-xl bg-white p-5 ring-1 ring-red-200">
                            <h4 className="text-sm font-black text-slate-700">按错题数排序的薄弱考点</h4>
                            <p className="mt-1 text-xs font-bold text-slate-500">
                                排在最前面的两三个就是该优先补的地方——不必平均用力。
                            </p>
                            <ul className="mt-4 space-y-2">
                                {weakTopics.slice(0, 8).map((topic) => {
                                    const lessonId = TOPIC_TO_LESSON[topic.tag];
                                    const width = Math.max((topic.wrongCount / weakTopics[0].wrongCount) * 100, 8);
                                    return (
                                        <li key={topic.tag} className="rounded-lg bg-slate-50 p-3">
                                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                                                <span className="text-sm font-black text-slate-800">{topic.tag}</span>
                                                <span className="font-mono text-sm font-black text-red-700">
                                                    错 {topic.wrongCount} 道
                                                </span>
                                            </div>
                                            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                                                <div className="h-full rounded-full bg-red-600" style={{ width: `${width}%` }} />
                                            </div>
                                            {lessonId && (
                                                <Link
                                                    to={`/lesson/8/${lessonId}`}
                                                    className="mt-2 inline-flex min-h-11 items-center text-xs font-black text-red-700 hover:underline"
                                                >
                                                    回到第 {lessonId} 课复习 →
                                                </Link>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}

                    <Link
                        to="/question-bank/review"
                        className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-black text-white transition hover:bg-red-800"
                    >
                        打开错题本逐题重做
                    </Link>
                </>
            )}
        </div>
    );
}

function ChecklistPicker() {
    const [type, setType] = useState('impl');
    const items = CHECKLIST[type];

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="mb-4 flex items-center gap-2">
                <ClipboardList className="text-slate-600" aria-hidden="true" />
                <h3 className="text-lg font-black text-slate-950">动手前的检查清单</h3>
            </div>
            <p className="mb-4 text-sm font-semibold leading-6 text-slate-600">
                这三份清单是给不同错因用的。<strong>只抄你真的犯过的三到五条</strong>——
                清单写长了考场上就不会看。
            </p>

            <div className="mb-4 flex flex-wrap gap-2">
                {CAUSE_TYPES.map((cause) => (
                    <button
                        key={cause.id}
                        type="button"
                        aria-pressed={type === cause.id}
                        onClick={() => setType(cause.id)}
                        className={`min-h-11 rounded-lg px-4 py-2 text-sm font-black transition ${type === cause.id
                            ? 'bg-slate-900 text-white shadow'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                    >
                        {cause.label}
                    </button>
                ))}
            </div>

            <ul className="space-y-2">
                {items.map((item, index) => (
                    <li key={item} className="flex gap-3 rounded-lg bg-slate-50 p-3 text-sm font-semibold leading-6 text-slate-700">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-slate-900 text-xs font-black text-white">
                            {index + 1}
                        </span>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function Lesson15() {
    return (
        <CppLessonShell
            lessonNumber={15}
            lessonTitle="易错题诊疗室"
            lessonSubtitle="八级最常见的不是「不会算法」，是「没看出该用哪个模型」"
            accent="red"
            levelTitle="C++ 提高"
            levelCode="L8"
            sections={sections}
            previousPath="/lesson/8/14"
            nextPath="/lesson/8/16"
            prerequisites={['已完成八级前 14 课的大部分内容', '在本站做过至少一套八级真题', '手边有自己的错题记录']}
            topSupport={<CppL8LessonSupport lessonId={15} />}
            bottomSupport={<CppL8LessonSupport lessonId={15} placement="bottom" />}
            hero={{
                title: '分清「模型没想对」和「代码写错了」',
                description: '本课用你自己的做题记录找出最该补的考点，并按建模、实现、复杂度三类给出可带进考场的检查清单。',
            }}
            goals={['能定位自己的高频错因', '能把错题归类到知识点', '能写出针对性的检查动作']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={Activity} title="八级的错因分层和七级不一样" tone="blue">
                            七级把错因分成<strong>概念 / 边界 / 复杂度</strong>三类。
                            八级要把「概念」再拆一层，因为最常见的情况变成了：
                            <br /><br />
                            <strong>算法你都会，但没看出这道题该用哪个算法。</strong>
                            <br /><br />
                            比如「n 个村庄通水，可以打井也可以铺管道」——
                            会 Kruskal 的人未必想到要加一个虚拟水源点。这不是「不会最小生成树」，
                            是<strong>建模没到位</strong>。
                        </Callout>
                        <CompareTable
                            headers={['', '七级的分层', '八级的分层']}
                            rows={[
                                ['第一类', '概念型：不会这个知识点', '建模型：会算法但没认出模型'],
                                ['第二类', '边界型：会但写错细节', '实现型：会但写错细节（种类更多）'],
                                ['第三类', '复杂度型：超时', '复杂度型：超时或超内存'],
                            ]}
                        />
                        <Callout icon={AlertTriangle} title="判断标准：看题解的哪一句话让你会了" tone="amber">
                            这是区分「建模型」和「不会算法」最快的办法。
                            <br /><br />
                            · 看到题解第一句「<strong>这是一道最小生成树</strong>」就立刻会做了
                            → <strong>建模型</strong>，算法本身没问题，是没认出来。
                            <br />· 看完「这是 MST」还得把 Kruskal 重学一遍
                            → 真的是<strong>算法不会</strong>，要回去补第 8 课。
                            <br /><br />
                            两者的补救完全不同：前者练建模（第 6 课的方法），后者重学算法。
                        </Callout>
                    </>
                ),
                2: (
                    <>
                        <DiagnosisLab />
                        <Callout icon={Activity} title="八级真题的考点分布" tone="blue">
                            从本站十套八级真题统计，出现最多的考点依次是：
                            <strong>C++ 综合（64 题）、排列组合（42）、面向对象（38）、
                            复杂度分析（21）、最短路（15）、最小生成树（12）、动态规划（11）</strong>。
                            <br /><br />
                            注意前三名：<strong>C++ 语言本身和数学计数占了大头</strong>，
                            比图论算法多得多。这和很多人的预期相反——
                            八级不是「更难的算法题」，而是<strong>加了数学和 C++ 深度</strong>。
                            <br /><br />
                            所以如果你的错题集中在「C++ 综合」或「排列组合」，
                            那是很正常的分布，也是最值得优先补的两块。
                        </Callout>
                        <PredictCheck
                            className="mt-6"
                            prompt="一次八级模拟里，你在「C++ 综合」错了 5 道，「最短路」错了 1 道，「排列组合」错了 3 道。接下来最该做什么？"
                            options={[
                                '重点补 C++ 综合和排列组合',
                                '三块平均分配时间',
                                '优先补最短路，因为算法题更重要',
                                '多做几套新卷子看看还会错什么',
                            ]}
                            correctIndex={0}
                            explanation="错题集中在 C++ 综合（5 道）和排列组合（3 道），这两块正是八级真题里题量最大的两个考点（64 题和 42 题），补它们的收益最高。最短路只错 1 道更可能是粗心或边界，用检查清单处理就够。选「优先补算法题」是把主观印象当依据——八级的实际分布里 C++ 语言和数学比图论算法多得多。多做新卷子在补完瓶颈之前只会重复得到同一个诊断。"
                            misconception="容易觉得「算法题才是硬骨头」，于是把时间投在题量少的考点上。诊断的价值就在于让你按真实分布而不是印象来分配时间。"
                        />
                    </>
                ),
                3: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">三类错因</h3>
                        <div className="mt-5 space-y-4">
                            {CAUSE_TYPES.map((cause) => (
                                <div key={cause.id} className={`rounded-2xl p-5 ring-1 ${cause.tone}`}>
                                    <h4 className="text-base font-black">{cause.label}</h4>
                                    <dl className="mt-3 space-y-2 text-sm font-semibold leading-6">
                                        <div>
                                            <dt className="inline font-black">症状：</dt>
                                            <dd className="inline">{cause.symptom}</dd>
                                        </div>
                                        <div>
                                            <dt className="inline font-black">识别信号：</dt>
                                            <dd className="inline">{cause.signal}</dd>
                                        </div>
                                        <div>
                                            <dt className="inline font-black">补救动作：</dt>
                                            <dd className="inline">{cause.cure}</dd>
                                        </div>
                                    </dl>
                                </div>
                            ))}
                        </div>
                        <Callout icon={AlertTriangle} title="八级最高频的十个具体错因" tone="rose">
                            这些是从八级的考点分布和本册前十四课的内容反推出来的：
                            <br /><br />
                            ① <strong>区间 DP 按 i 循环而不是按 len</strong>——静默算出偏小的值（第 9 课）。
                            <br />② <strong>Floyd 的 k 没放最外层</strong>——结果偏大（第 7 课）。
                            <br />③ <strong>逆序对 / 组合数用了 int</strong>——溢出成负数（第 2、13 课）。
                            <br />④ <strong>负权图用了 Dijkstra</strong>——过早确定顶点（第 7 课）。
                            <br />⑤ <strong>持有裸指针的类没写三件套</strong>——双重释放（第 4 课）。
                            <br />⑥ <strong>基类析构没加 virtual</strong>——派生类资源泄漏（七级第 12 课）。
                            <br />⑦ <strong>位运算没加括号</strong>——<code className="font-mono">x &amp; 1 == 0</code> 恒为假（第 11 课）。
                            <br />⑧ <strong>「至少」类计数正面算</strong>——算重或算漏，该用补集（第 1 课）。
                            <br />⑨ <strong>lcm 写成 a*b/gcd</strong>——中间溢出（第 10 课）。
                            <br />⑩ <strong>邻接矩阵开在 n=10⁵ 上</strong>——40 GB，必爆（第 6 课）。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <ChecklistPicker />
                        <Callout icon={ClipboardList} title="清单的用法" tone="amber">
                            三个使用时机：
                            <br />· <strong>读完题、动手前</strong>：过一遍「建模型」清单，
                            确认模型认对了、状态没漏维、数据范围支持这个算法。
                            <br />· <strong>写完、编译前</strong>：过一遍「实现型」清单，
                            重点看循环方向、初值、类型、括号。
                            <br />· <strong>样例过了、提交前</strong>：再看一眼数据范围，确认不会 TLE / MLE。
                            <br /><br />
                            清单是活的：反复犯的新错误就加一条，已经变成条件反射的就划掉。
                            <strong>长期不变的清单说明你没在用它。</strong>
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">一个特别值得单独记的检查</h3>
                        <Callout icon={AlertTriangle} title="「我这个中间量提前取模了吗」" tone="rose">
                            八级引入取模之后多了一类新错误：<strong>该取模的没取（溢出）、
                            不该取模的取了（破坏整除和比较关系）</strong>。
                            <br /><br />
                            规则是：<strong>纯加乘的累积量可以随时取模；
                            后续还要做除法、gcd、大小比较的量绝不能提前取模。</strong>
                            <br /><br />
                            第 10 课末尾那道「多个数的 lcm 取模」就是典范：
                            累积 lcm 一旦取模就再也没法继续求 gcd 了，必须改用质因数分解。
                        </Callout>
                        <MiniQuiz items={[{
                            question: '怎么区分「建模型」错因和真的「算法不会」？',
                            answer: '看题解哪一句话让你会了',
                            reason: '看到「这是最小生成树」就立刻会做，说明算法没问题、是没认出模型，属于建模型；还得把 Kruskal 重学一遍才会，那是真的算法不会。两者的补救动作完全不同。',
                        }, {
                            question: '八级真题里题量最大的三个考点是什么？',
                            answer: 'C++ 综合、排列组合、面向对象',
                            reason: '本站十套八级真题统计：C++ 综合 64 题、排列组合 42 题、面向对象 38 题，都超过图论算法。八级不是「更难的算法」，而是加了数学和 C++ 语言深度。',
                        }, {
                            question: '什么样的中间量绝不能提前取模？',
                            answer: '后续要做除法、gcd 或大小比较的量',
                            reason: '取模会破坏整除关系和大小顺序。纯加乘的累积量可以随时取模，但要继续求 gcd、做真除法或比大小的量取模后就全错了——第 10 课的 lcm 取模题就是这个坑。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '在题库做一套八级真题，回到本课第 2 节看诊断表列出的薄弱考点。',
                                '挑出排最前面的两三个考点，点进对应课时把讲义重看一遍。',
                                '整理 5 道八级错题，给每道标注错因属于建模、实现、复杂度哪一类。',
                                '对每道「建模型」的错题，补写一遍「点是什么 / 状态是什么」的拆解。',
                                '从第 4 节挑出你真的犯过的三到五条，抄在纸上。',
                                '隔一天，不看提示重做这 5 道题，记录哪些做对了、哪些又错在同一个地方。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt={`你做完一套八级卷，错了 6 道。分析后发现：3 道是「读完题不知道用什么算法」，2 道是「思路对但循环方向写错」，1 道是「算法对但 TLE」。请说明这三组各该怎么处理，并指出哪一组的处理最花时间、为什么。`}
                            hint={`三组的缺口分别在哪一层？知识、流程、还是判断？`}
                            answer={`第一组 3 道是建模型，缺口在「把题面翻译成模型」这一层。处理方式不是重学算法（算法你会），而是练建模流程：对每道题补写一遍第 6 课的拆解——顶点是什么、边是什么、有向无向、有权无权、要求什么；DP 题则写状态、转移、初值、答案四件套。练完之后再找同类题验证能不能独立认出模型。

第二组 2 道是实现型，缺口在「执行精度」。找出具体错在哪一行，抽象成一条检查动作加进清单。比如「区间 DP 写成了 for(i)」就抽象成清单里的「区间 DP 的外层循环必须是 len」。不需要重学任何原理。

第三组 1 道是复杂度型，缺口在「读题时的判断习惯」。补救是养成动手前先算的流程：把 n、m、q 抄在草稿纸上，算出自己方案的量级，对照 10⁸ 这条线。这一道题的处理最快——因为它不是知识缺口，是流程缺口，加一个动作就行。

最花时间的是第一组。原因是建模能力无法靠背清单获得，它需要「读题 → 尝试拆解 → 对照答案 → 发现自己漏了什么」这个循环反复多次才能形成。实现型和复杂度型都可以靠加一条检查动作立刻止损，但建模型必须真的多做几道题。

所以时间分配应该是：第一组占大部分（练建模），第二组和第三组各花十几分钟把检查动作写进清单即可。这也解释了为什么第 2 节的诊断表按考点排序有用——它能告诉你建模缺口集中在哪一类模型上（比如全是图论建模，还是全是计数建模），从而精准地找同类题练。`}
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能区分「模型没想对」和「代码写错了」，知道用「题解哪句话让我会了」来判断',
                                '我能说出自己最常见的两个错因，并指出各属于建模、实现、复杂度哪一类',
                                '我已经写出一份不超过五条的检查清单，并在重做时主动使用了它',
                                '我知道八级题量最大的三个考点，会按真实分布而不是印象分配时间',
                                '我知道哪些中间量不能提前取模',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
