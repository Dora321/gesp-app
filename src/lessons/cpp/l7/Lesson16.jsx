import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Flag, Hourglass, Timer } from 'lucide-react';
import CppL7LessonSupport from '../../../components/CppL7LessonSupport';
import CppLessonShell, { Callout, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '90 分钟怎么花' },
    { id: 2, title: '配时方案', category: '算一算再定' },
    { id: 3, title: '开考与放弃', category: '两个决策点' },
    { id: 4, title: '考后复盘', category: '交卷才是开始' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

// 七级卷的真实构成（取自本站十套七级真题）：
// 15 道单选 × 2 分 + 10 道判断 × 2 分 + 2 道编程 × 25 分 = 100 分，90 分钟。
const PAPER = {
    minutes: 90,
    parts: [
        { id: 'single', label: '单选题', count: 15, each: 2, suggestMin: 1.5 },
        { id: 'judge', label: '判断题', count: 10, each: 2, suggestMin: 1 },
        { id: 'coding', label: '编程题', count: 2, each: 25, suggestMin: 25 },
    ],
};

function TimePlanner() {
    const [perSingle, setPerSingle] = useState(1.5);
    const [perJudge, setPerJudge] = useState(1);
    const [reserve, setReserve] = useState(5);

    const plan = useMemo(() => {
        const singleTime = 15 * perSingle;
        const judgeTime = 10 * perJudge;
        const codingTime = PAPER.minutes - singleTime - judgeTime - reserve;
        const perCoding = codingTime / 2;
        return {
            singleTime, judgeTime, codingTime, perCoding,
            objectiveScore: 15 * 2 + 10 * 2,
            codingScore: 2 * 25,
            feasible: perCoding >= 15,
        };
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
                七级卷：<strong>15 单选 + 10 判断（各 2 分）+ 2 编程（各 25 分）= 100 分</strong>。
                调一调客观题的用时，看留给编程题的时间够不够。
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
                <div>
                    <label htmlFor="per-single" className="block text-xs font-black text-slate-700">
                        每道单选 {perSingle} 分钟
                    </label>
                    <input
                        id="per-single" type="range" min="1" max="4" step="0.5"
                        value={perSingle}
                        onChange={(event) => setPerSingle(Number(event.target.value))}
                        className="mt-2 w-full"
                    />
                </div>
                <div>
                    <label htmlFor="per-judge" className="block text-xs font-black text-slate-700">
                        每道判断 {perJudge} 分钟
                    </label>
                    <input
                        id="per-judge" type="range" min="0.5" max="3" step="0.5"
                        value={perJudge}
                        onChange={(event) => setPerJudge(Number(event.target.value))}
                        className="mt-2 w-full"
                    />
                </div>
                <div>
                    <label htmlFor="reserve" className="block text-xs font-black text-slate-700">
                        检查留白 {reserve} 分钟
                    </label>
                    <input
                        id="reserve" type="range" min="0" max="15" step="1"
                        value={reserve}
                        onChange={(event) => setReserve(Number(event.target.value))}
                        className="mt-2 w-full"
                    />
                </div>
            </div>

            <div className="mt-5 rounded-xl bg-white p-5">
                <div className="flex h-8 overflow-hidden rounded-lg">
                    {rows.map((row) => (
                        <div
                            key={row.label}
                            className={`${row.color} flex items-center justify-center text-[10px] font-black text-white`}
                            style={{ width: `${Math.max((row.minutes / PAPER.minutes) * 100, 0)}%` }}
                            title={`${row.label}：${row.minutes.toFixed(1)} 分钟`}
                        >
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
                ? 'bg-emerald-50 ring-emerald-200'
                : 'bg-rose-50 ring-rose-200'}`}>
                <div className={`text-xs font-black ${plan.feasible ? 'text-emerald-800' : 'text-rose-800'}`}>
                    每道编程题能分到 {plan.perCoding.toFixed(1)} 分钟
                </div>
                <p className={`mt-2 text-sm font-semibold leading-6 ${plan.feasible ? 'text-emerald-900' : 'text-rose-900'}`}>
                    {plan.feasible
                        ? '够用。编程题占 50 分——占了一半分值，必须留出足够时间读题、想算法、写代码、测样例。客观题拖太久是七级最常见的失分方式。'
                        : '不够。低于 15 分钟基本写不完一道完整的编程题。客观题每道只值 2 分，而编程题一道 25 分；在客观题上多磨 10 分钟去抢那 2 分，是明显的亏本交易。把客观题的单题用时压下来。'}
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
            lessonSubtitle="编程题占一半分值，客观题别磨"
            accent="slate"
            levelTitle="C++ 冲刺"
            levelCode="L7"
            sections={sections}
            previousPath="/lesson/7/15"
            nextPath="/level7"
            prerequisites={['已完成七级前 15 课', '至少做过一套完整的七级真题', '手边有第 15 课整理的检查清单']}
            topSupport={<CppL7LessonSupport lessonId={16} />}
            bottomSupport={<CppL7LessonSupport lessonId={16} placement="bottom" />}
            hero={{
                title: '会做的题一道都不丢',
                description: '本课把七级卷的分值结构算清楚，定出配时方案，并给出开考前和卡住时的两个决策动作。',
            }}
            goals={['能在限时内合理分配答题顺序', '能识别送分题与难题', '能完成一次完整的考后复盘']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={Timer} title="先看清分值结构" tone="blue">
                            七级卷 100 分、90 分钟，构成是：
                            <strong>15 道单选（30 分）+ 10 道判断（20 分）+ 2 道编程（50 分）</strong>。
                            <br /><br />
                            注意这个比例：<strong>25 道客观题一共 50 分，2 道编程题也是 50 分</strong>。
                            一道编程题的分值等于 12.5 道客观题。
                        </Callout>
                        <p className="mt-5 text-base leading-7 text-slate-700">
                            这个结构直接决定了策略：<strong>客观题不能磨</strong>。
                            在一道 2 分的选择题上纠结 5 分钟，代价是编程题少了 5 分钟——
                            而那 5 分钟可能值 25 分。
                        </p>
                        <CompareTable
                            headers={['题型', '道数', '总分', '占比', '每道分值']}
                            rows={[
                                ['单选', '15', '30 分', '30%', '2 分'],
                                ['判断', '10', '20 分', '20%', '2 分'],
                                ['编程', '2', '50 分', '50%', '25 分'],
                            ]}
                        />
                        <Callout icon={AlertTriangle} title="应试策略不是投机" tone="amber">
                            这一课讲的不是「怎么猜答案」，而是<strong>怎么不浪费已经会的部分</strong>。
                            真正的失分大头往往不是「不会」，而是「会但没时间写」和「会但看错题」。
                            前 15 课解决「会不会」，这一课解决「会了能不能全拿到」。
                        </Callout>
                    </>
                ),
                2: (
                    <>
                        <TimePlanner />
                        <h3 className="mt-8 text-xl font-black text-slate-950">一个可以直接用的配时方案</h3>
                        <CompareTable
                            headers={['阶段', '时间', '做什么']}
                            rows={[
                                ['0–1 分钟', '1 分钟', '浏览全卷，特别是两道编程题的题面长度和难度'],
                                ['1–23 分钟', '约 22 分钟', '客观题一遍过：会的立刻做，卡住的标记跳过'],
                                ['23–78 分钟', '约 55 分钟', '两道编程题，各约 27 分钟'],
                                ['78–88 分钟', '约 10 分钟', '回头处理跳过的客观题'],
                                ['88–90 分钟', '2 分钟', '检查答题卡有没有漏填'],
                            ]}
                        />
                        <Callout icon={Hourglass} title="为什么客观题要「一遍过」而不是「做完再走」" tone="blue">
                            客观题里必然有两三道你一时想不起来的。
                            如果坚持当场解决，很容易在那里耗掉 10 分钟。
                            <br /><br />
                            正确做法是<strong>第一遍只做会的</strong>，卡住立刻标记跳过。
                            等编程题写完，回头再看那几道——很多时候这中间大脑已经想通了，
                            或者从编程题里得到了提示。这一步能把有效时间提高 15% 以上。
                        </Callout>
                        <PredictCheck
                            className="mt-6"
                            prompt="考试进行到 60 分钟，你还有 1 道编程题（25 分）完全没动，和 3 道客观题（共 6 分）没做。剩下 30 分钟该先做什么？"
                            options={[
                                '先把 3 道客观题做完，再写编程题',
                                '先写编程题，最后几分钟处理客观题',
                                '放弃编程题，把客观题做扎实',
                                '两边交替做，平衡推进',
                            ]}
                            correctIndex={1}
                            explanation="编程题 25 分需要连续的思考时间，被打断后重新进入状态的成本很高；而 3 道客观题只值 6 分，且能在几分钟内快速处理。所以先用 25 分钟攻编程题，留最后 5 分钟扫客观题——即使客观题只能靠判断蒙，期望损失也远小于编程题写不完的 25 分。放弃编程题是最差的选择：25 分的题即使只写出部分分（很多评测有部分分）也比 6 分多。交替做会让编程题的思路反复中断。"
                            misconception="「先做简单的」是通用建议，但在分值极不对称时失效。要比的是「单位时间的得分期望」，不是题目难度。"
                        />
                    </>
                ),
                3: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">决策点一：开考前 1 分钟</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            拿到卷子先不要从第 1 题开始写。花 1 分钟做这三件事：
                        </p>
                        <StepList
                            title="开考三件事"
                            steps={[
                                '翻到两道编程题，读一眼题面和数据范围——判断哪道更好下手。',
                                '看客观题里有没有明显是「代码阅读输出」的大题（这类耗时最长），心里标记一下。',
                                '决定编程题的先后顺序：先写你更有把握的那道。',
                            ]}
                        />
                        <Callout icon={Flag} title="编程题的顺序值得先定" tone="blue">
                            两道编程题难度往往不对等。<strong>先写更有把握的那道</strong>，
                            拿稳 25 分再去攻难的——这样即使第二道没写完，也已经锁定了一半的编程分。
                            <br /><br />
                            反过来先攻难题，很可能在它上面耗掉 40 分钟仍没写对，
                            结果本来会做的那道也没时间了。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">决策点二：什么时候果断跳过</h3>
                        <Callout icon={AlertTriangle} title="给自己设一个硬时限" tone="rose">
                            <strong>客观题：一道超过 2.5 分钟没头绪 → 标记，跳。</strong>
                            <br /><strong>编程题：超过 8 分钟还没想出算法 → 换另一道。</strong>
                            <br /><br />
                            这两个数字不是绝对的，但<strong>必须事先定下来</strong>。
                            没有预设时限时，人的默认行为是「再想一分钟就好」，
                            而这一分钟会反复延长——这是考场上最常见的时间黑洞。
                        </Callout>
                        <CompareTable
                            headers={['信号', '含义', '动作']}
                            rows={[
                                ['读了两遍还不懂题意', '可能是题面复杂，不是你不会', '跳过，回头再读'],
                                ['知道方法但推不出细节', '接近了，值得再给 1 分钟', '再想一下，仍不行就标记'],
                                ['完全没有思路', '知识缺口，当场补不上', '立刻跳'],
                                ['编程题算法想出来了但估计写不完', '取舍问题', '先写能拿部分分的暴力解'],
                            ]}
                        />
                        <Callout icon={Flag} title="暴力解也有分" tone="amber">
                            如果最优算法想不出来，<strong>先把暴力解写完整</strong>。
                            很多评测按测试点给分，暴力解能过掉数据规模小的那些点，
                            拿到部分分。空着交是 0 分，暴力解可能是 10 分。
                            <br /><br />
                            这也是为什么要留够编程题时间——写暴力解也需要时间。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">交卷后立刻做的一件事</h3>
                        <Callout icon={Timer} title="趁记忆还热，记下疑问点" tone="blue">
                            走出考场的<strong>五分钟内</strong>，把这三样写下来：
                            <br />① 哪几道题我不确定；
                            <br />② 哪道题我卡了很久，卡在哪一步；
                            <br />③ 有没有哪道题我最后是猜的。
                            <br /><br />
                            这三条过一晚就想不起来了，而它们正是最有价值的复盘素材——
                            比对答案发现的错误更能说明问题，因为它记录了<strong>当时的思维状态</strong>。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">完整的复盘流程</h3>
                        <StepList
                            title="四步复盘"
                            steps={[
                                '当天：记录每题用时和疑问点，不看答案。',
                                '当天：对答案，标出错题，但先不看解析——自己再想一遍。',
                                '隔一天：不看提示重做全部错题，用第 15 课的方法分诊「不会」还是「会但做错」。',
                                '本周内：概念型的回课时重学，边界型的加进检查清单。',
                            ]}
                        />
                        <Callout icon={AlertTriangle} title="最没用的复盘方式" tone="rose">
                            考完立刻对答案、看解析、点头「哦原来是这样」，然后合上卷子。
                            <br /><br />
                            这样做<strong>什么都留不下</strong>：看解析时的「懂了」是被动理解，
                            和下次能不能自己想出来是两件事。第 15 课的「隔天重做」之所以是必须的，
                            就是因为它能把这两件事区分开。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">用本站做一次限时模拟</h3>
                        <p className="mt-3 text-base leading-7 text-slate-700">
                            题库的考试模式带 90 分钟倒计时，交卷后会记录得分和错题，
                            第 15 课的诊断表读的就是这份数据。
                        </p>
                        <div className="mt-4 flex flex-wrap gap-3">
                            <Link
                                to="/question-bank"
                                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-black text-white transition hover:bg-slate-700"
                            >
                                进入题库做限时模拟
                            </Link>
                            <Link
                                to="/lesson/7/15"
                                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-400 px-5 py-2.5 text-sm font-black text-slate-800 transition hover:bg-slate-200"
                            >
                                回到诊疗室看诊断
                            </Link>
                        </div>
                        <MiniQuiz items={[{
                            question: '七级卷里 2 道编程题占多少分？',
                            answer: '50 分，占一半',
                            reason: '15 单选 + 10 判断各 2 分共 50 分，2 道编程题各 25 分共 50 分。一道编程题的分值等于 12.5 道客观题，所以客观题绝不能磨。',
                        }, {
                            question: '剩 30 分钟，还差 1 道编程题（25 分）和 3 道客观题（6 分），先做哪个？',
                            answer: '先做编程题',
                            reason: '编程题需要连续思考时间，中断后重新进入状态代价高；客观题只值 6 分且能快速处理。按单位时间得分期望排序，编程题优先。',
                        }, {
                            question: '最优算法想不出来时该怎么办？',
                            answer: '写完整的暴力解',
                            reason: '多数评测按测试点给分，暴力解能过小规模数据拿部分分。空着交是 0 分，暴力解可能有 10 分。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '用配时器定出你自己的方案：每道单选几分钟、判断几分钟、留多少检查时间。',
                                '在题库里做一套完整的七级真题，开考前先花 1 分钟浏览全卷并决定编程题顺序。',
                                '做题时给自己计时，记录每一部分实际花了多久，与计划对比。',
                                '记下你在哪几道题上超时了，以及是否果断跳过。',
                                '交卷后五分钟内，写下不确定的题、卡最久的题、以及猜的题。',
                                '隔一天不看提示重做全部错题，用第 15 课的方法分诊并处理。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt="你做完一次限时模拟：客观题用了 45 分钟（计划 22 分钟），编程题只剩 40 分钟，第二道没写完。最终得分 68。请分析问题出在哪，并给出下次的具体改进动作——不要只说「加快速度」。"
                            hint="45 分钟做 25 道客观题，平均每道 1.8 分钟。这个平均值本身不算慢，那超时的 23 分钟去哪了？"
                            answer={`平均每道 1.8 分钟其实是合理的，所以问题不在整体速度，而在少数几道题吃掉了大量时间。25 道题若有 4 道各磨了 5 分钟，就是 20 分钟——刚好是超时的量。这说明真正的问题是没有执行跳过机制，而不是基本功慢。

三个具体改进动作：
① 硬性执行 2.5 分钟跳过规则。做题时看一眼时钟，超过就标记跳过，不给自己「再想一下」的余地。可以在草稿纸上先画一个「跳过题号」栏，跳了就写上去，形成动作而不只是念头。
② 调整顺序：客观题第一遍只做「看一眼就有思路」的，其余全部先跳。先把 22 分钟的额度守住，进入编程题。
③ 编程题时间前置。这次编程题只剩 40 分钟且没写完，说明必须更早开始。下次可以试试先做编程题：开考浏览后直接攻两道编程题（55 分钟），再回头做客观题（30 分钟）。客观题被压缩时的损失可控（每道 2 分，且判断题有 50% 兜底），而编程题写不完是整块 25 分。

另外值得算一笔：68 分里损失的 32 分，第二道编程题占了大部分。如果那道题按第 3 节的建议写了暴力解，很可能拿到 10 分左右的部分分——单这一项就能把分数推到 78 上下。所以下次的最低目标是：每道编程题都留出至少 15 分钟，哪怕只写暴力解。`}
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能在开考前 1 分钟浏览全卷，并决定两道编程题的先后顺序',
                                '我给自己定下了客观题和编程题的硬性跳过时限，并在模拟中真的执行了',
                                '我知道编程题占一半分值，客观题上多花的时间是亏本交易',
                                '我在交卷后立即记录了疑问点，并在隔天完成了错题重做',
                                '我知道最优算法想不出时该写暴力解拿部分分，而不是空着',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
