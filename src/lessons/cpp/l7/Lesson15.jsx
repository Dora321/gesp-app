import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, AlertTriangle, ClipboardList, Stethoscope } from 'lucide-react';
import CppL7LessonSupport from '../../../components/CppL7LessonSupport';
import CppLessonShell, { Callout, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';
import { getPaper, paperMeta } from '../../../data/gesp/index';
import { resolveTopicTags } from '../../../data/gesp/topics';
import { aggregateWeakTopics, latestWrongIdsByPaper, readExamAttempts } from '../../../utils/examHistory';
import { LEARNING_DATA_EVENT } from '../../../utils/learningData';

const sections = [
    { id: 1, title: '课程导入', category: '错因比错题重要' },
    { id: 2, title: '我的错题诊断', category: '从真实记录读起' },
    { id: 3, title: '三类错因', category: '概念、边界、复杂度' },
    { id: 4, title: '检查清单', category: '动手前先过一遍' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

// 考点 → 该回去复习哪一课。标签取自七级十套真题里实际出现的那些。
const TOPIC_TO_LESSON = {
    复杂度分析: 1, 递推: 1, sizeof: 1,
    树与二叉树: 2, 树: 2, 哈夫曼编码: 2, 链表: 2,
    二分查找: 3,
    哈希表: 4, 哈希: 4, STL容器: 4, bitset: 4,
    图论: 5, 度数统计: 5, 二分图: 5,
    深度优先搜索: 6, DFS: 6, 连通块: 6, 递归: 6, 图的遍历: 6,
    广度优先搜索: 7, BFS: 7, 队列: 7, 最短路: 7,
    搜索: 8, 记忆化搜索: 8, 并查集: 8,
    动态规划: 9, 网格DP: 9, 最长不下降子序列: 9,
    '0/1背包': 10,
    面向对象: 11, 结构体: 11, 静态成员: 11, 指针: 11, 参数传递: 11,
    命名空间: 13,
    稳定性: 14, 排序算法: 14, 冒泡排序: 14, 选择排序: 14,
    插入排序: 14, 快速排序: 14, 归并排序: 14,
};

// 错因三分法。归类到这三类，是因为三类的补救动作完全不同。
const CAUSE_TYPES = [
    {
        id: 'concept',
        label: '概念型',
        tone: 'bg-rose-50 ring-rose-200 text-rose-900',
        symptom: '看到题不知道该用什么方法，或者用错了方法。',
        signal: '重做时还是不会，需要回去看讲义。',
        cure: '回到对应课时重学一遍，然后自己复述一遍原理。不要只看答案。',
    },
    {
        id: 'boundary',
        label: '边界型',
        tone: 'bg-amber-50 ring-amber-200 text-amber-900',
        symptom: '方法对了，但在空输入、只有一个元素、最大值、越界等地方出错。',
        signal: '重做时能做对，但当时确实错了——「会但做错」。',
        cure: '不需要重学原理，需要一份检查清单，每次动手前过一遍。',
    },
    {
        id: 'complexity',
        label: '复杂度型',
        tone: 'bg-violet-50 ring-violet-200 text-violet-900',
        symptom: '算法是对的，但超时，或者内存超限。',
        signal: '样例过了，提交却 TLE / MLE。',
        cure: '养成读题先看数据范围的习惯，用第 1 课的对照表反推该用什么复杂度。',
    },
];

// 各类错因对应的检查动作。这份清单是可以直接抄到纸上带进考场的。
const CHECKLIST = {
    boundary: [
        'n = 0 或数组为空时，循环会不会一次都不执行、会不会访问 a[-1]',
        'n = 1 时，需要「相邻两个比较」的逻辑还成立吗',
        '下标从 0 还是从 1 开始，我这份代码里前后一致吗',
        '数组开够了吗（题目 n ≤ 10⁵ 就开 10⁵ + 5）',
        '会不会溢出：两个 int 相加或相乘超过 2×10⁹ 就要用 long long',
        '除法和取模：除数可能为 0 吗，负数取模的结果符号是什么',
        '搜索类：visited 标记的时机对吗（DFS 在入口、BFS 在入队时）',
        '递归：终止条件写了吗，会不会太深',
    ],
    complexity: [
        '题目给的 n 最大是多少，我这个算法是几次方',
        'n ≤ 2000 可以 O(n²)；n ≤ 10⁵ 必须 O(n log n) 或 O(n)',
        '邻接矩阵在 n ≤ 10⁵ 时会爆内存，该用邻接表',
        '有没有把 O(n) 的操作写在 O(n) 的循环里（比如循环里 push_back 之外还 erase）',
        '搜索能不能剪枝，重复状态判重了吗',
        'DP 数组能不能压成一维，避免内存超限',
    ],
    concept: [
        '这道题的模型是什么：图、树、DP、还是模拟',
        '我能不看题解把方法讲给别人听吗',
        '状态定义写全了吗（DP 题：状态、转移、初值、答案四件套）',
        '有没有把两个相似的概念搞混（稳定/不稳定、覆盖/隐藏、正序/倒序）',
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

    // 只看七级的卷子——这一课诊断的是七级的准备情况
    const l7WrongIds = useMemo(() => {
        const all = latestWrongIdsByPaper(attempts);
        return Object.fromEntries(
            Object.entries(all).filter(([paperId]) => paperMeta[paperId]?.level === 7),
        );
    }, [attempts]);

    useEffect(() => {
        let cancelled = false;
        const paperIds = Object.keys(l7WrongIds);
        if (paperIds.length === 0) {
            setWrongByPaper({});
            setLoading(false);
            return () => { cancelled = true; };
        }
        setLoading(true);
        Promise.all(paperIds.map(async (id) => {
            const paper = await getPaper(id);
            const ids = new Set(l7WrongIds[id]);
            return [id, (paper?.questions || []).filter((q) => ids.has(q.id))];
        })).then((pairs) => {
            if (!cancelled) {
                setWrongByPaper(Object.fromEntries(pairs));
                setLoading(false);
            }
        });
        return () => { cancelled = true; };
    }, [l7WrongIds]);

    const weakTopics = useMemo(
        () => aggregateWeakTopics(wrongByPaper, resolveTopicTags),
        [wrongByPaper],
    );

    const totalWrong = useMemo(
        () => Object.values(wrongByPaper).reduce((sum, list) => sum + list.length, 0),
        [wrongByPaper],
    );

    const hasData = Object.keys(l7WrongIds).length > 0;

    return (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Stethoscope className="text-red-700" aria-hidden="true" />
                <h3 className="text-xl font-black text-slate-950">我的七级错题诊断</h3>
            </div>

            {!hasData && (
                <>
                    <p className="text-sm font-semibold leading-6 text-slate-600">
                        这里读的是<strong>你自己在本站做过的七级真题记录</strong>，
                        目前还没有数据——先去题库做一套七级卷子，回来这里就会按考点列出你的薄弱环节。
                    </p>
                    <Link
                        to="/question-bank"
                        className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-black text-white transition hover:bg-red-800"
                    >
                        去做一套七级真题
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
                            <div className="text-xs font-bold text-slate-500">做过的七级卷</div>
                            <div className="mt-1 text-2xl font-black text-slate-900">{Object.keys(l7WrongIds).length} 套</div>
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
                                排在最前面的两三个，就是你该优先补的地方——不必平均用力。
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
                                                    to={`/lesson/7/${lessonId}`}
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
    const [type, setType] = useState('boundary');
    const items = CHECKLIST[type];

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="mb-4 flex items-center gap-2">
                <ClipboardList className="text-slate-600" aria-hidden="true" />
                <h3 className="text-lg font-black text-slate-950">动手前的检查清单</h3>
            </div>
            <p className="mb-4 text-sm font-semibold leading-6 text-slate-600">
                这三份清单是给不同错因用的。选出你最常犯的那类，把它抄在纸上带进考场。
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
            lessonSubtitle="分清「不会」和「会但做错」，两者的补救方式完全不同"
            accent="red"
            levelTitle="C++ 冲刺"
            levelCode="L7"
            sections={sections}
            previousPath="/lesson/7/14"
            nextPath="/lesson/7/16"
            prerequisites={['已完成七级前 14 课的大部分内容', '在本站做过至少一套七级真题', '手边有自己的错题记录']}
            topSupport={<CppL7LessonSupport lessonId={15} />}
            bottomSupport={<CppL7LessonSupport lessonId={15} placement="bottom" />}
            hero={{
                title: '同一道题错两次，问题不在题上',
                description: '本课把错题按错因归类，用你自己的做题记录找出最该补的两三个考点，并给出可以带进考场的检查清单。',
            }}
            goals={['能定位自己的高频错因', '能把错题归类到知识点', '能写出针对性的检查动作']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={Activity} title="收集错题不等于复盘" tone="blue">
                            很多人的错题本是「把题抄一遍 + 抄一遍答案」。下次遇到同类题照样错，
                            因为<strong>抄的是题，没抄错因</strong>。
                            <br /><br />
                            有用的复盘只回答一个问题：<strong>当时我卡在哪一步</strong>？
                            是不知道用什么方法，还是方法对了写错了细节，还是写对了但超时。
                            这三种情况的补救动作完全不同。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">先分清「不会」和「会但做错」</h3>
                        <CompareTable
                            headers={['', '不会', '会但做错']}
                            rows={[
                                ['表现', '看到题没有思路', '有思路，实现时出错'],
                                ['检验方法', '隔天重做，还是不会', '隔天重做，能做对'],
                                ['该做什么', '回去重学这个知识点', '建立检查清单，不用重学'],
                                ['最忌讳', '只看答案就以为懂了', '反复重学已经会的原理'],
                            ]}
                        />
                        <Callout icon={AlertTriangle} title="判断标准：隔天重做" tone="amber">
                            当天看完答案立刻重做，几乎一定能做对——那是<strong>短期记忆</strong>，说明不了任何问题。
                            <br /><br />
                            <strong>隔一天，不看任何提示，从空白开始重写一遍</strong>。
                            还是不会 → 概念型，得回去重学。能写出来但又踩了同一个坑 → 边界型，需要清单。
                            这一步不能省，它决定了你接下来该花时间干什么。
                        </Callout>
                    </>
                ),
                2: (
                    <>
                        <DiagnosisLab />
                        <Callout icon={Activity} title="为什么按考点排序而不是按时间" tone="blue">
                            按时间列错题，你看到的是一串孤立的题目。
                            按考点聚合之后，会出现一件更有用的事实：
                            <strong>错的题往往集中在两三个考点上</strong>。
                            <br /><br />
                            比如「广度优先搜索」错了 5 道、其他考点各错 1 道——
                            那就不该平均用力，应该把时间全押在 BFS 上。
                            上面的诊断表就是替你做这个统计。
                        </Callout>
                        <PredictCheck
                            className="mt-6"
                            prompt="一次七级模拟里，你在「复杂度分析」错了 1 道，「动态规划」错了 4 道，「哈希表」错了 1 道。接下来一周最该做什么？"
                            options={[
                                '三个考点各花三分之一时间',
                                '把大部分时间投在动态规划上',
                                '从第 1 课开始重新过一遍全部内容',
                                '多做几套新卷子看看还会错什么',
                            ]}
                            correctIndex={1}
                            explanation="错题分布不均时，集中的那个考点才是瓶颈。动态规划错 4 道说明这一块的理解有系统性缺口，把时间投在它上面的收益远高于平均分配。另外两个各错 1 道更可能是边界或粗心，用检查清单处理就够。从头重过一遍是最低效的选择——你已经会的部分会占掉大量时间。多做新卷子在补完瓶颈之前也没意义，只会重复得到同一个诊断。"
                            misconception="「哪里都补一点」听起来稳妥，实际上把有限时间摊薄了。诊断的价值就在于允许你不均匀用力。"
                        />
                    </>
                ),
                3: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">三类错因</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            把每道错题归到下面三类之一。归类的意义在于——<strong>三类的补救动作不一样</strong>，
                            归错了会白费功夫。
                        </p>
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
                        <Callout icon={AlertTriangle} title="七级最高频的几个具体错因" tone="rose">
                            这些是从七级真题的考点分布反推出来的，出现频率最高：
                            <br /><br />
                            ① <strong>BST 查找写成 O(log n)</strong>——没说平衡时最坏是 O(n)（第 3 课）。
                            <br />② <strong>邻接矩阵开在 n ≤ 10⁵ 上</strong>——内存必爆（第 5 课）。
                            <br />③ <strong>BFS 在出队时标记</strong>——答案对但队列膨胀（第 7 课）。
                            <br />④ <strong>一维背包写成正序</strong>——0/1 背包变成完全背包（第 10 课）。
                            <br />⑤ <strong>基类析构没加 virtual</strong>——派生类资源泄漏（第 12 课）。
                            <br />⑥ <strong>DP 答案取了最后一格</strong>——「以 i 结尾」的状态要取全表最大（第 9 课）。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <ChecklistPicker />
                        <Callout icon={ClipboardList} title="清单要短到你真的会用" tone="amber">
                            上面每类只列了几条，是有意的。清单写到二十条，
                            考场上就没人看了——<strong>能用的清单必须短</strong>。
                            <br /><br />
                            做法：从上面挑出<strong>你真的犯过</strong>的那三到五条，抄在纸上。
                            没犯过的不要抄，抄了只会稀释注意力。
                            每次做完一道题，回头对着这几条过一遍。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">检查清单怎么用</h3>
                        <StepList
                            title="三个时机"
                            steps={[
                                '动手写之前：确认读懂了数据范围，选对了复杂度量级（复杂度型清单）。',
                                '写完编译之前：过一遍边界清单——n=0、n=1、下标起点、溢出。',
                                '样例过了提交之前：再看一眼数据范围，确认不会 TLE。',
                            ]}
                        />
                        <Callout icon={Activity} title="清单是活的" tone="blue">
                            每次发现一个新的、自己反复犯的错，就往清单里加一条；
                            某一条已经变成条件反射了，就把它划掉。
                            <br /><br />
                            一份长期不变的清单说明你没在用它。
                        </Callout>
                        <MiniQuiz items={[{
                            question: '怎么区分一道错题是「不会」还是「会但做错」？',
                            answer: '隔天不看提示重做一遍',
                            reason: '当天看完答案立刻重做靠的是短期记忆，说明不了问题。隔天从空白开始重写：还是不会就是概念型，能写出来但踩同一个坑就是边界型。',
                        }, {
                            question: '错题集中在一个考点上，其他考点各错一道，该怎么安排时间？',
                            answer: '集中攻那一个考点',
                            reason: '集中的考点说明有系统性缺口，投入产出比最高。零散的一两道更可能是边界或粗心，用检查清单处理即可，不需要重学。',
                        }, {
                            question: '为什么检查清单不能写太长？',
                            answer: '太长就不会被真正使用',
                            reason: '考场时间紧，二十条的清单没人逐条看。只抄自己真正犯过的三到五条，才可能在每道题后真的过一遍。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '在题库里做一套七级真题，然后回到本课第 2 节，看诊断表列出的薄弱考点。',
                                '挑出排最前面的两三个考点，点进对应课时把讲义重看一遍。',
                                '整理 5 道错题，给每道标注错因属于概念、边界、复杂度哪一类。',
                                '统计一下：五道题里三类各占几道？哪一类最多，就重点用那一类的清单。',
                                '从第 4 节的清单里挑出你真的犯过的三到五条，抄在纸上。',
                                '隔一天，不看任何提示重做这 5 道题，记录哪些做对了、哪些又错在同一个地方。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt="你做完一套七级卷，25 道题错了 6 道。隔天重做，其中 4 道做对了、2 道还是不会。请分别说明这两组题接下来该怎么处理，以及为什么处理方式不同。"
                            hint="能重做对的那 4 道，说明原理其实是懂的——那当时为什么错了？"
                            answer={`做对的 4 道属于「会但做错」，也就是边界型或粗心型。原理已经掌握，问题出在实现细节上——可能是 n=1 没考虑、下标起点搞混、int 溢出、或者 visited 标记时机写错。处理方式不是重学，而是逐题找出具体错在哪一行，把它抽象成一条检查动作加进清单。比如「BFS 标记写在出队处」就抽象成清单里的一条「搜索类：确认 BFS 在入队时标记」。重学原理对这 4 道毫无帮助，反而浪费时间。

还是不会的 2 道属于「不会」，也就是概念型。这两道要回到对应课时重新学，而且标准是能不看讲义把方法讲给别人听——只看懂答案不算，看懂答案和自己能想出来之间差着一大步。学完之后隔一天再重做一次验证。

处理方式不同的根本原因是：边界型的缺口在「执行精度」上，靠流程（清单）补；概念型的缺口在「知识」上，靠重学补。用清单去补概念缺口没用，用重学去补边界缺口是浪费。这也是为什么第 1 节强调必须先做「隔天重做」这个分诊动作——不分诊就无法配药。`}
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能区分「不会」和「会但做错」，知道用隔天重做来分诊',
                                '我能说出自己最常见的两个错因，并指出它们各属于哪一类',
                                '我能把错题归类到概念、边界、复杂度三类，并对每类采取不同的补救动作',
                                '我已经写出一份不超过五条的检查清单，并在重做时主动使用了它',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
