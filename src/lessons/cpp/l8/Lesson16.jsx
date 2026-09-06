import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Flag, Hourglass, Timer } from 'lucide-react';
import CppL8LessonSupport from '../../../components/CppL8LessonSupport';
import CppLessonShell, { Callout, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '八级的卷面结构' },
    { id: 2, title: '配时方案', category: '算一算再定' },
    { id: 3, title: '两个决策点', category: '开考与放弃' },
    { id: 4, title: '考后复盘', category: '交卷才是开始' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

// 八级卷的真实构成（取自本站十套八级真题，与七级同构）：
// 15 道单选 × 2 分 + 10 道判断 × 2 分 + 2 道编程 × 25 分 = 100 分，90 分钟。
const TOTAL_MINUTES = 90;

function TimePlanner() {
    const [perSingle, setPerSingle] = useState(1.5);
    const [perJudge, setPerJudge] = useState(1);
    const [reserve, setReserve] = useState(5);

    const plan = useMemo(() => {
        const singleTime = 15 * perSingle;
        const judgeTime = 10 * perJudge;
        const codingTime = TOTAL_MINUTES - singleTime - judgeTime - reserve;
        return { singleTime, judgeTime, codingTime, perCoding: codingTime / 2, feasible: codingTime / 2 >= 15 };
    }, [perSingle, perJudge, reserve]);

    const rows = [
        { label: '15 道单选', minutes: plan.singleTime, score: 30, color: 'bg-slate-600' },
        { label: '10 道判断', minutes: plan.judgeTime, score: 20, color: 'bg-slate-500' },
        { label: '2 道编程', minutes: plan.codingTime, score: 50, color: 'bg-emerald-600' },
        { label: '检查留白', minutes: reserve, score: 0, color: 'bg-amber-500' },
    ];

    return (
        <div className="rounded-2xl border border-slate-300 bg-slate-100 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Hourglass className="text-slate-700" aria-hidden="true" />
                <h3 className="text-xl font-black text-slate-950">90 分钟配时器</h3>
            </div>
            <p className="mb-5 text-sm font-semibold leading-6 text-slate-600">
                八级卷与七级同构：<strong>15 单选 + 10 判断（各 2 分）+ 2 编程（各 25 分）= 100 分</strong>。
                但八级的客观题更耗时间——数学计数和 C++ 语言细节题往往要真算一遍。
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
                <div>
                    <label htmlFor="l8-single" className="block text-xs font-black text-slate-700">
                        每道单选 {perSingle} 分钟
                    </label>
                    <input id="l8-single" type="range" min="1" max="4" step="0.5"
                        value={perSingle} onChange={(e) => setPerSingle(Number(e.target.value))}
                        className="mt-2 w-full" />
                </div>
                <div>
                    <label htmlFor="l8-judge" className="block text-xs font-black text-slate-700">
                        每道判断 {perJudge} 分钟
                    </label>
                    <input id="l8-judge" type="range" min="0.5" max="3" step="0.5"
                        value={perJudge} onChange={(e) => setPerJudge(Number(e.target.value))}
                        className="mt-2 w-full" />
                </div>
                <div>
                    <label htmlFor="l8-reserve" className="block text-xs font-black text-slate-700">
                        检查留白 {reserve} 分钟
                    </label>
                    <input id="l8-reserve" type="range" min="0" max="15" step="1"
                        value={reserve} onChange={(e) => setReserve(Number(e.target.value))}
                        className="mt-2 w-full" />
                </div>
            </div>

            <div className="mt-5 rounded-xl bg-white p-5">
                <div className="flex h-8 overflow-hidden rounded-lg">
                    {rows.map((row) => (
                        <div key={row.label}
                            className={`${row.color} flex items-center justify-center text-[10px] font-black text-white`}
                            style={{ width: `${Math.max((row.minutes / TOTAL_MINUTES) * 100, 0)}%` }}
                            title={`${row.label}：${row.minutes.toFixed(1)} 分钟`}>
                            {row.minutes >= 8 ? `${Math.round(row.minutes)}′` : ''}
                        </div>
                    ))}
                </div>
                <ul className="mt-4 space-y-2">
                    {rows.map((row) => (
                        <li key={row.label} className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                            <span className="flex items-center gap-2 font-black text-slate-800">
                                <span className={`h-3 w-3 rounded ${row.color}`} aria-hidden="true" />
                                {row.label}
                            </span>
                            <span className="font-mono font-black text-slate-700">
                                {row.minutes.toFixed(1)} 分钟
                                {row.score > 0 && (
                                    <span className="ml-2 text-xs font-bold text-slate-500">
                                        {row.score} 分 · 每分钟 {(row.score / Math.max(row.minutes, 0.1)).toFixed(2)} 分
                                    </span>
                                )}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={`mt-5 rounded-xl p-5 ring-1 ${plan.feasible
                ? 'bg-emerald-50 ring-emerald-200' : 'bg-rose-50 ring-rose-200'}`}>
                <div className={`text-xs font-black ${plan.feasible ? 'text-emerald-800' : 'text-rose-800'}`}>
                    每道编程题能分到 {plan.perCoding.toFixed(1)} 分钟
                </div>
                <p className={`mt-2 text-sm font-semibold leading-6 ${plan.feasible ? 'text-emerald-900' : 'text-rose-900'}`}>
                    {plan.feasible
                        ? '够用。八级编程题往往要先想清模型（第 6 课）再动手，留出想的时间很重要——直接开写往往写到一半才发现模型不对。'
                        : '不够。低于 15 分钟写不完一道八级编程题，何况还要想模型。客观题每道只值 2 分，编程题一道 25 分，在客观题上多磨十分钟去抢那 2 分明显亏本。'}
                </p>
            </div>
        </div>
    );
}

export default function Lesson16() {
    return (
        <CppLessonShell
            lessonNumber={16}
            lessonTitle="全真模拟与应试策略"
            lessonSubtitle="八级的客观题更耗时间，但编程题仍占一半分值"
            accent="slate"
            levelTitle="C++ 提高"
            levelCode="L8"
            sections={sections}
            previousPath="/lesson/8/15"
            nextPath="/level8"
            prerequisites={['已完成八级前 15 课', '至少做过一套完整的八级真题', '手边有第 15 课整理的检查清单']}
            topSupport={<CppL8LessonSupport lessonId={16} />}
            bottomSupport={<CppL8LessonSupport lessonId={16} placement="bottom" />}
            hero={{
                title: '会做的题一道都不丢',
                description: '本课把八级卷的分值结构算清楚、定出配时方案，并给出开考前与卡住时的两个决策动作。',
            }}
            goals={['能在限时内合理分配答题顺序', '能识别送分题与难题', '能完成一次完整的考后复盘']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={Timer} title="卷面结构与七级相同，难点分布不同" tone="blue">
                            八级卷同样是 <strong>15 单选（30 分）+ 10 判断（20 分）+ 2 编程（50 分）</strong>，
                            90 分钟，100 分。
                            <br /><br />
                            但客观题的性质变了：七级的客观题多是「读代码说输出」「判断复杂度」，
                            扫一眼就有答案；八级混进了<strong>排列组合计算、概率期望、
                            C++ 语言细节（虚函数、拷贝构造、模板）</strong>——
                            很多题<strong>必须真的算一遍或推一遍</strong>。
                        </Callout>
                        <CompareTable
                            headers={['考点', '十套真题里的题量', '单题耗时']}
                            rows={[
                                ['C++ 综合（语言细节）', '64 题', '中：要仔细读代码，容易看漏一个 virtual'],
                                ['排列组合', '42 题', '长：要真算，还要防算重算漏'],
                                ['面向对象', '38 题', '中：概念题快，代码输出题慢'],
                                ['复杂度分析', '21 题', '短：套第 12 课的方法即可'],
                                ['图论算法（最短路 / MST）', '27 题', '短：多是结论和适用条件'],
                            ]}
                        />
                        <Callout icon={AlertTriangle} title="所以配时要比七级更警惕" tone="rose">
                            七级的客观题一道 1.5 分钟够，八级可能要 2 分钟以上。
                            如果按七级的节奏走，很容易在客观题上超时，挤掉编程题的时间。
                            <br /><br />
                            <strong>但编程题仍然占一半分值。</strong>
                            2 道编程题 50 分，25 道客观题 50 分——
                            一道编程题等于 12.5 道客观题。这个比例没变，
                            所以「客观题不能磨」这条原则更要守住。
                        </Callout>
                    </>
                ),
                2: (
                    <>
                        <TimePlanner />
                        <h3 className="mt-8 text-xl font-black text-slate-950">一个针对八级的配时方案</h3>
                        <CompareTable
                            headers={['阶段', '时间', '做什么']}
                            rows={[
                                ['0–2 分钟', '2 分钟', '浏览全卷：两道编程题的题面和数据范围、客观题里有没有大段代码题'],
                                ['2–30 分钟', '约 28 分钟', '客观题第一遍：会的立刻做，需要动笔算的先标记跳过'],
                                ['30–80 分钟', '约 50 分钟', '两道编程题，各约 25 分钟（含想模型的时间）'],
                                ['80–88 分钟', '约 8 分钟', '回头做跳过的客观题（主要是计数题）'],
                                ['88–90 分钟', '2 分钟', '检查答题卡'],
                            ]}
                        />
                        <Callout icon={Hourglass} title="为什么计数题要先跳过" tone="blue">
                            排列组合题的特点是：<strong>要么几十秒想通，要么卡住十分钟</strong>。
                            而且卡住时很难判断自己离答案有多远——容易一直「再想一分钟」。
                            <br /><br />
                            所以第一遍遇到需要分类讨论的计数题，<strong>直接标记跳过</strong>。
                            等编程题写完回来，往往已经想通了，或者至少能果断用补集法试一下。
                            <br /><br />
                            第 1 课的做法在这里很有用：<strong>把规模缩小到能手数的程度验证一下</strong>，
                            比硬推公式更快也更可靠。
                        </Callout>
                        <PredictCheck
                            className="mt-6"
                            prompt="八级考试进行到 55 分钟，两道编程题都还没动，客观题剩 4 道（都是计数题，共 8 分）。剩下 35 分钟该怎么分配？"
                            options={[
                                '先花 10 分钟做完计数题，再用 25 分钟写编程题',
                                '两道编程题各 15 分钟，最后 5 分钟扫计数题',
                                '放弃一道编程题，专心写另一道并做完计数题',
                                '按顺序做，做到哪算哪',
                            ]}
                            correctIndex={1}
                            explanation="编程题 50 分、计数题 8 分，单位时间得分期望差距巨大。先保编程题：15 分钟一道虽然紧，但足够写出暴力解或较简单的那道的完整解，两道合计有机会拿到 25 分以上；最后 5 分钟扫计数题，即使靠猜（单选 25% 正确率）期望也有 2 分。选项一先做计数题只锁定 8 分，却把编程题压到 25 分钟只够写一道。选项三主动放弃 25 分更不划算——八级编程题多有部分分，写出暴力解通常能拿到一部分。"
                            misconception="时间紧时容易本能地「先做能做完的」。但分值极不对称时，要比的是单位时间得分期望，不是完成的确定性。"
                        />
                    </>
                ),
                3: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">决策点一：开考 2 分钟</h3>
                        <StepList
                            title="开考先做这四件事"
                            steps={[
                                '翻到两道编程题，读题面和数据范围——判断哪道更有把握，先写那道。',
                                '对每道编程题，在心里过一遍第 6 课的建模问题：这是图论、DP、还是数学？',
                                '扫一眼客观题，标记出「有大段代码」和「需要分类讨论计数」的题，第一遍准备跳过它们。',
                                '把两道编程题的 n 范围抄在草稿纸上——这决定了能用什么复杂度的算法。',
                            ]}
                        />
                        <Callout icon={Flag} title="八级编程题一定要先想模型再动手" tone="rose">
                            七级的编程题往往「读完就知道怎么写」，八级不一定。
                            <br /><br />
                            <strong>直接开写的风险是：写到一半发现模型不对，前面二十行全废。</strong>
                            八级编程题的正确流程是：
                            <br />① 读题，写下「点是什么 / 状态是什么」；
                            <br />② 看数据范围，确认这个模型下的算法能过；
                            <br />③ 再动手写。
                            <br /><br />
                            前两步花三五分钟是<strong>值得的投资</strong>，
                            而不是浪费——第 15 课的诊断里「建模型」错因占大头，
                            很多就是因为跳过了这两步。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">决策点二：什么时候果断跳过</h3>
                        <Callout icon={AlertTriangle} title="给自己定硬时限" tone="amber">
                            <strong>客观题：一道超过 3 分钟没头绪 → 标记，跳。</strong>
                            （八级比七级放宽半分钟，因为确实有需要算的题。）
                            <br /><strong>编程题：超过 8 分钟想不出模型 → 换另一道。</strong>
                            <br /><strong>编程题：想出模型但估计写不完 → 立刻改写暴力解。</strong>
                            <br /><br />
                            这几个数字必须<strong>事先定下来</strong>。
                            没有预设时限时人的默认行为是「再想一分钟」，而这一分钟会反复延长。
                        </Callout>
                        <CompareTable
                            headers={['信号', '含义', '动作']}
                            rows={[
                                ['计数题分类分到第四类还没完', '很可能该用补集', '换补集法试；仍不行就跳'],
                                ['代码输出题读第三遍还没头绪', '可能漏看了 virtual / const / 引用', '重点看这几个关键字；仍不行就跳'],
                                ['编程题想不出模型', '建模缺口，当场补不上', '立刻换另一道'],
                                ['最优算法写不完', '取舍问题', '写暴力解拿部分分'],
                                ['样例过了但担心超时', '复杂度判断问题', '按第 12 课算一遍量级再决定要不要优化'],
                            ]}
                        />
                        <Callout icon={Flag} title="暴力解在八级同样有分" tone="blue">
                            多数评测按测试点给分。八级编程题的数据往往分档设置——
                            前几个测试点的 n 很小，正是留给暴力解的。
                            <br /><br />
                            所以最优解想不出来时，<strong>先把暴力解写完整并测通样例</strong>。
                            空着交是 0 分，暴力解可能是 10 分以上。这也是为什么要留够编程题时间。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">交卷后立刻做的一件事</h3>
                        <Callout icon={Timer} title="五分钟内记下三样" tone="blue">
                            ① 哪几道题我不确定；
                            <br />② 哪道题我卡了很久，卡在<strong>哪一步</strong>（读题？建模？写代码？）；
                            <br />③ 有没有哪道题是猜的。
                            <br /><br />
                            第 ② 条对八级特别重要——它直接对应第 15 课的错因分类。
                            「卡在建模」和「卡在实现」的补救方式完全不同，
                            而这个信息<strong>过一晚就想不起来了</strong>。
                        </Callout>
                        <StepList
                            title="四步复盘"
                            steps={[
                                '当天：记录每题用时和卡在哪一步，不看答案。',
                                '当天：对答案，标出错题，但先不看解析——自己再想一遍。',
                                '隔一天：不看提示重做全部错题，用第 15 课的方法分诊建模 / 实现 / 复杂度。',
                                '本周内：建模型的补建模训练，实现型的加进检查清单，复杂度型的养成先算再写的习惯。',
                            ]}
                        />
                        <Callout icon={AlertTriangle} title="八级复盘要多问一句" tone="rose">
                            七级的复盘问「会不会」。八级要多问一句：
                            <strong>「如果有人告诉我这是最小生成树，我能写出来吗？」</strong>
                            <br /><br />
                            答「能」→ 缺口在建模，练第 6 课的拆解流程。
                            <br />答「不能」→ 缺口在算法，回去重学对应课时。
                            <br /><br />
                            这一句能把「不会」这个笼统的判断拆成两种完全不同的病，
                            省下大量走错方向的时间。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">用本站做限时模拟</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            题库的考试模式带 90 分钟倒计时，交卷后记录得分和错题，
                            第 15 课的诊断表读的就是这份数据。
                        </p>
                        <div className="mt-4 flex flex-wrap gap-3">
                            <Link to="/question-bank"
                                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-black text-white transition hover:bg-slate-700">
                                进入题库做限时模拟
                            </Link>
                            <Link to="/lesson/8/15"
                                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-400 px-5 py-2.5 text-sm font-black text-slate-800 transition hover:bg-slate-200">
                                回到诊疗室看诊断
                            </Link>
                        </div>
                        <MiniQuiz items={[{
                            question: '八级客观题比七级更耗时，主要是因为哪类题？',
                            answer: '排列组合计数和 C++ 语言细节题',
                            reason: '八级真题里排列组合 42 题、C++ 综合 64 题，这两类往往要真算一遍或仔细读代码，不像七级的复杂度题扫一眼就有答案。所以配时要留更多给客观题，但仍不能挤掉编程题。',
                        }, {
                            question: '八级编程题为什么要先想模型再动手？',
                            answer: '写到一半发现模型错会全废',
                            reason: '八级的编程题往往不是「读完就知道怎么写」。先花三五分钟写下「点是什么 / 状态是什么」并核对数据范围，比直接开写更省时间——第 15 课的诊断里建模型错因占大头。',
                        }, {
                            question: '复盘时除了问「会不会」，八级还要多问哪一句？',
                            answer: '如果有人告诉我用哪个算法，我能写出来吗',
                            reason: '答「能」说明缺口在建模，要练拆解流程；答「不能」说明缺口在算法，要重学课时。这一句把「不会」拆成两种不同的病，避免走错补救方向。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '用配时器定出你自己的方案：每道单选几分钟、判断几分钟、留多少检查时间。',
                                '在题库做一套完整的八级真题，开考先花 2 分钟浏览全卷并决定编程题顺序。',
                                '做题时计时，记录每一部分实际花了多久，与计划对比。',
                                '记下你在哪几道题上超时，以及是否按预设时限果断跳过。',
                                '对两道编程题，记录「想模型」和「写代码」各花了多久。',
                                '交卷后五分钟内写下：不确定的题、卡最久的题及卡在哪一步、猜的题。',
                                '隔一天不看提示重做全部错题，用第 15 课的方法分诊并处理。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt={`你做完八级限时模拟：客观题用了 50 分钟（计划 28 分钟），编程题只剩 35 分钟，第一道写完了、第二道只写了一半。最终得分 61。请分析问题、给出三条具体改进动作，并估算改进后大概能到多少分。`}
                            hint={`50 分钟做 25 道客观题平均每道 2 分钟，这个平均值对八级算合理。那超时的 22 分钟花在哪了？`}
                            answer={`平均每道 2 分钟对八级是合理节奏，所以问题不在整体速度，而在少数几道题吃掉了大量时间。25 道题里若有 5 道各磨了 5 分钟，就是 25 分钟——接近超时的量。结合八级的考点分布，这几道最可能是排列组合或大段代码输出题。所以真正的缺口是「没有执行跳过机制」，不是基本功慢。

三条改进动作：
① 硬性执行 3 分钟跳过规则，并把它变成动作而不只是念头：在草稿纸上先画一个「跳过题号」栏，跳了就写上去。第一遍只做「看一眼就有思路」的题。
② 计数题一律第一遍跳过。这类题要么几十秒想通、要么卡十分钟，而且卡住时判断不出离答案有多远。等编程题写完回来，先用补集法试，再用小规模枚举验证（第 1 课的方法），比硬推公式快得多。
③ 编程题时间前置。可以试试开考浏览后直接攻编程题（50 分钟），再回头做客观题（38 分钟）。客观题被压缩的损失可控——每道 2 分，判断题还有 50% 兜底；而编程题写不完是整块 25 分。

分数估算：61 分里损失的 39 分，第二道编程题占了大部分。如果按第 3 节的建议，在发现写不完时立刻改写暴力解，很可能拿到 10 分左右的部分分，直接推到 71。再加上跳过机制省下的十几分钟回头做完那几道计数题（就算只对一半也有 4 分），大约能到 75。

所以下次的最低目标是两条：每道编程题至少留 15 分钟（哪怕只写暴力解），以及客观题第一遍严格控制在 30 分钟内。`}
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能在开考 2 分钟内浏览全卷，决定编程题顺序并抄下数据范围',
                                '我给自己定下了客观题和编程题的硬性跳过时限，并在模拟中真的执行了',
                                '我知道八级编程题要先想模型再动手，不会直接开写',
                                '我在交卷后立即记录了「卡在哪一步」，而不只是「哪题错了」',
                                '我知道最优解写不完时该改写暴力解拿部分分，而不是空着',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
