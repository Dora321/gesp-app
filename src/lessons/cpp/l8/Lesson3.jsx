import React, { useMemo, useState } from 'react';
import { AlertTriangle, BarChart3, Dices, Sigma } from 'lucide-react';
import CppL8LessonSupport from '../../../components/CppL8LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '概率不是频率' },
    { id: 2, title: '古典概型', category: '数分子和分母' },
    { id: 3, title: '期望', category: '加权平均' },
    { id: 4, title: '期望的线性性', category: '拆开算最省事' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

// 掷 k 颗骰子，点数和的完整分布。数字全是枚举出来的，不是估的。
function sumDistribution(dice) {
    let dist = { 0: 1 };
    for (let d = 0; d < dice; d += 1) {
        const next = {};
        Object.entries(dist).forEach(([sum, ways]) => {
            for (let face = 1; face <= 6; face += 1) {
                const key = Number(sum) + face;
                next[key] = (next[key] || 0) + ways;
            }
        });
        dist = next;
    }
    return dist;
}

function DiceLab() {
    const [dice, setDice] = useState(2);
    const dist = useMemo(() => sumDistribution(dice), [dice]);

    const total = useMemo(
        () => Object.values(dist).reduce((a, b) => a + b, 0),
        [dist],
    );
    const expectation = useMemo(
        () => Object.entries(dist).reduce((sum, [value, ways]) => sum + Number(value) * ways, 0) / total,
        [dist, total],
    );
    const mode = useMemo(
        () => Object.entries(dist).reduce((best, cur) => (cur[1] > best[1] ? cur : best))[0],
        [dist],
    );
    const maxWays = Math.max(...Object.values(dist));

    return (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Dices className="text-emerald-700" aria-hidden="true" />
                <h3 className="text-xl font-black text-slate-950">掷骰子的点数和分布</h3>
            </div>
            <p className="mb-5 text-sm font-semibold leading-6 text-slate-600">
                下面的分布是把全部 6<sup>{dice}</sup> = {total} 种结果<strong>逐一枚举</strong>数出来的。
                拖动颗数，注意<strong>期望和「最可能取值」并不总是相等</strong>——
                奇数颗时期望是小数，根本不可能等于任何一个取值。
            </p>

            <label htmlFor="dice-count" className="block text-sm font-black text-slate-700">
                掷 {dice} 颗骰子
            </label>
            <input
                id="dice-count"
                type="range" min="1" max="4" step="1"
                value={dice}
                onChange={(event) => setDice(Number(event.target.value))}
                className="mt-2 w-full"
            />

            <div className="mt-5 overflow-x-auto rounded-xl bg-white p-5 ring-1 ring-emerald-100">
                <div className="flex min-w-[22rem] items-end gap-1" style={{ height: '9rem' }}>
                    {Object.entries(dist).map(([value, ways]) => (
                        <div key={value} className="flex flex-1 flex-col items-center gap-1">
                            <span className="text-[10px] font-bold text-slate-400">{ways}</span>
                            <div
                                className={`w-full rounded-t ${value === mode ? 'bg-emerald-600' : 'bg-emerald-300'}`}
                                style={{ height: `${(ways / maxWays) * 100}%`, minHeight: '2px' }}
                                title={`和为 ${value}：${ways} 种，概率 ${(ways / total * 100).toFixed(2)}%`}
                            />
                            <span className="font-mono text-[10px] font-black text-slate-600">{value}</span>
                        </div>
                    ))}
                </div>
                <p className="mt-3 border-t border-slate-100 pt-3 text-xs font-bold text-slate-500">
                    横轴是点数和，柱高是出现的方式数，深色柱是最可能的取值
                </p>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl bg-slate-900 p-4">
                    <div className="text-xs font-bold text-slate-400">总情形数 6^{dice}</div>
                    <div className="mt-1 font-mono text-2xl font-black text-slate-100">{total}</div>
                </div>
                <div className="rounded-xl bg-slate-900 p-4">
                    <div className="text-xs font-bold text-slate-400">期望 E[和]（枚举得出）</div>
                    <div className="mt-1 font-mono text-2xl font-black text-emerald-400">{expectation}</div>
                </div>
                <div className="rounded-xl bg-slate-900 p-4">
                    <div className="text-xs font-bold text-slate-400">线性性预测 3.5 × {dice}</div>
                    <div className="mt-1 font-mono text-2xl font-black text-amber-300">{3.5 * dice}</div>
                </div>
                <div className="rounded-xl bg-slate-900 p-4">
                    <div className="text-xs font-bold text-slate-400">最可能取值（众数）</div>
                    <div className="mt-1 font-mono text-2xl font-black text-slate-100">{mode}</div>
                </div>
            </div>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                枚举得到的期望和「一颗骰子的期望 3.5 乘以颗数」<strong>完全相等</strong>——
                这就是期望的线性性。左边要枚举 {total} 种情形，右边只要一次乘法。
            </p>
            <p className={`mt-2 text-sm font-bold leading-6 ${Number(mode) === expectation ? 'text-slate-500' : 'text-rose-700'}`}>
                {Number(mode) === expectation
                    ? `这一档里期望 ${expectation} 和众数 ${mode} 恰好相同——分布对称时会这样，但这是巧合，不是规律。`
                    : `注意：期望是 ${expectation}，众数是 ${mode}，两者不等。${dice % 2 === 1 ? '奇数颗骰子的期望是 .5 结尾的小数，不可能等于任何一个整数取值。' : ''}`}
            </p>
        </div>
    );
}

export default function Lesson3() {
    return (
        <CppLessonShell
            lessonNumber={3}
            lessonTitle="概率与期望初步"
            lessonSubtitle="能拆开算的，就别去枚举全部情形"
            accent="emerald"
            levelTitle="C++ 提高"
            levelCode="L8"
            sections={sections}
            previousPath="/lesson/8/2"
            nextPath="/lesson/8/4"
            prerequisites={['完成前两课的计数与组合数', '会算分数与小数', '会用循环枚举全部情形']}
            topSupport={<CppL8LessonSupport lessonId={3} />}
            bottomSupport={<CppL8LessonSupport lessonId={3} placement="bottom" />}
            hero={{
                title: '期望不是「最可能出现的值」',
                description: '本课讲古典概型的算法、期望的定义与线性性，以及独立性判断——八级概率题的全部基础。',
            }}
            goals={['能计算古典概型的概率', '能理解期望的线性性', '能用期望解决简单的游戏问题']}
            childrenBySection={{
                1: (
                    <>
                        <Callout icon={Sigma} title="概率与频率的区别" tone="blue">
                            <strong>概率</strong>是理论值，靠数出来：投硬币正面朝上的概率是 1/2，
                            因为两种等可能结果里有一种是正面。
                            <br /><br />
                            <strong>频率</strong>是实验值：真投 10 次可能出现 6 次正面，频率是 0.6。
                            <br /><br />
                            两者不相等，但投的次数越多，频率会<strong>越来越接近</strong>概率。
                            考试算的是概率，不是频率——所以是<strong>数出来的，不是试出来的</strong>。
                        </Callout>
                        <Callout icon={AlertTriangle} title="一个常见的误解" tone="rose">
                            「连着开出 5 次红，下一次开蓝的概率更大」——<strong>错</strong>。
                            如果每次都是独立事件，那么前面的结果<strong>完全不影响</strong>下一次。
                            下一次开蓝的概率还是原来那个数。
                            <br /><br />
                            这叫「赌徒谬误」。判断标志是问自己：
                            <strong>这一次的结果，会被上一次影响吗</strong>？不会，就是独立的。
                        </Callout>
                        <h3 className="mt-8 text-xl font-black text-slate-950">独立与不独立</h3>
                        <CompareTable
                            headers={['场景', '是否独立', '为什么']}
                            rows={[
                                ['连续投两次硬币', '独立', '硬币没有记忆，第二次不受第一次影响'],
                                ['袋中摸球，摸后放回', '独立', '每次摸之前袋子状态完全相同'],
                                ['袋中摸球，摸后不放回', '不独立', '第一次摸走什么，改变了第二次的袋子构成'],
                                ['掷两颗骰子', '独立', '两颗骰子互不干扰'],
                            ]}
                        />
                        <Callout icon={Sigma} title="独立时才能直接相乘" tone="amber">
                            <code className="font-mono font-bold">P(A 且 B) = P(A) × P(B)</code>
                            <strong>只在 A、B 独立时成立</strong>。
                            <br /><br />
                            不放回摸球：袋里 3 红 2 白，连摸两次都是红的概率是
                            <code className="font-mono">3/5 × 2/4 = 3/10</code>——
                            第二个因子的分子分母都变了，因为第一次已经摸走一个红球。
                            <strong>不能写成 3/5 × 3/5。</strong>
                        </Callout>
                    </>
                ),
                2: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">古典概型：数分子和分母</h3>
                        <div className="mt-4 rounded-xl bg-slate-900 p-5 text-center">
                            <span className="font-mono text-lg font-black text-emerald-300">
                                P(A) = 事件 A 包含的基本事件数 ÷ 全部基本事件数
                            </span>
                        </div>
                        <Callout icon={Sigma} title="古典概型的两个前提" tone="blue">
                            ① 基本事件<strong>有限</strong>个；② 每个基本事件<strong>等可能</strong>。
                            <br /><br />
                            第二条最容易被忽略。掷两颗骰子求「和为 7」的概率，分母必须是
                            <strong>36</strong>（每颗骰子分别记）而不是 <strong>21</strong>
                            （把「1和2」与「2和1」看成同一种）——因为按后者算，各种和出现的可能性并不相等。
                            <br /><br />
                            所以分母怎么数，取决于「什么才是等可能的基本事件」。
                            这一步定错了，整题就错。
                        </Callout>
                        <p className="mt-5 text-base leading-7 text-slate-700">
                            算概率的核心其实是<strong>上两课的计数</strong>：
                            分母是全部方案数，分子是符合条件的方案数。所以「至少」类概率题同样用补集：
                        </p>
                        <CodeBlock>{`// 例：袋中 5 红 3 白，取 3 个球，至少一个红球的概率
// 分母：C(8,3) = 56
// 「至少一个红」的补集是「全是白球」：C(3,3) = 1
// 所以 P = 1 - 1/56 = 55/56

// 用程序枚举验证（规模小的时候一定要做这一步）
int total = 0, hit = 0;
for (int i = 0; i < 8; i++)
  for (int j = i+1; j < 8; j++)
    for (int k = j+1; k < 8; k++) {   // i<j<k 保证是组合不是排列
        total++;
        // 约定 0~4 是红球，5~7 是白球
        if (i < 5 || j < 5 || k < 5) hit++;
    }
cout << hit << "/" << total;          // 输出 55/56`}</CodeBlock>
                        <PredictCheck
                            className="mt-6"
                            prompt="袋中 3 红 2 白，不放回地连摸两个球，两个都是红的概率是多少？"
                            options={['9/25', '3/10', '2/5', '1/2']}
                            correctIndex={1}
                            explanation="不放回意味着两次不独立。第一次摸到红的概率 3/5；此时袋里剩 2 红 2 白共 4 个，第二次摸到红的概率 2/4。相乘得 3/5 × 2/4 = 6/20 = 3/10。选 9/25 是错把它当成有放回（3/5 × 3/5）——那样第二个因子的分母仍是 5，与「摸走一个后只剩 4 个」矛盾。也可以用组合数验证：C(3,2)/C(5,2) = 3/10。"
                            misconception="「不放回」三个字必须先找出来。有放回和不放回的算法完全不同，而题面往往只用一个词区分。"
                        />
                    </>
                ),
                3: (
                    <>
                        <DiceLab />
                        <h3 className="mt-8 text-xl font-black text-slate-950">期望的定义</h3>
                        <div className="mt-4 rounded-xl bg-slate-900 p-5 text-center">
                            <span className="font-mono text-lg font-black text-amber-300">
                                E[X] = Σ (每个取值 × 它的概率)
                            </span>
                        </div>
                        <p className="mt-4 text-base leading-7 text-slate-700">
                            一颗骰子：E = 1×(1/6) + 2×(1/6) + … + 6×(1/6) = 21/6 = <strong>3.5</strong>。
                            注意 3.5 <strong>根本不是骰子能掷出的点数</strong>——期望是加权平均值，
                            不必是可能取值之一。
                        </p>
                        <Callout icon={BarChart3} title="期望 ≠ 最可能取值" tone="rose">
                            这是八级最容易错的一个概念。看一个极端例子：
                            <br /><br />
                            某游戏 90% 的概率得 0 分、10% 的概率得 100 分。
                            <br />· <strong>最可能取值</strong>是 0 分（90% 的概率）。
                            <br />· <strong>期望</strong>是 0.9×0 + 0.1×100 = <strong>10 分</strong>。
                            <br /><br />
                            10 分这个结果<strong>一次都不会出现</strong>，但它是长期平均值。
                            上面的骰子实验里，2 颗和 4 颗时两者恰好相同（分布对称的巧合），
                            但 <strong>3 颗时期望是 10.5、众数是 10</strong>——就不相等了。
                        </Callout>
                        <CompareTable
                            headers={['概念', '含义', '骰子和的例子（2 颗）']}
                            rows={[
                                ['期望', '加权平均值，长期平均', '2 颗时是 7；3 颗时是 10.5'],
                                ['最可能取值（众数）', '概率最大的那个取值', '2 颗时是 7（与期望同）；3 颗时是 10 或 11（与期望不同）'],
                                ['取值范围', '所有可能出现的值', '2 颗时 2~12；k 颗时 k~6k'],
                            ]}
                        />
                    </>
                ),
                4: (
                    <>
                        <h3 className="text-xl font-black text-slate-950">期望的线性性：八级最好用的一条性质</h3>
                        <div className="mt-4 rounded-xl bg-slate-900 p-5 text-center">
                            <span className="font-mono text-lg font-black text-emerald-300">
                                E[X + Y] = E[X] + E[Y]
                            </span>
                        </div>
                        <Callout icon={Sigma} title="它强在「不要求独立」" tone="blue">
                            注意这条性质<strong>对任意 X、Y 都成立</strong>，
                            <strong>不需要它们独立</strong>——这是它比概率乘法法则好用得多的地方。
                            <br /><br />
                            于是遇到「求某个总量的期望」，标准套路是：
                            <strong>把总量拆成一堆小量的和，分别算每个小量的期望再相加</strong>。
                            这样能绕开对整体分布的复杂分类讨论。
                        </Callout>
                        <p className="mt-5 text-base leading-7 text-slate-700">
                            上面实验台就是一次演示：掷 4 颗骰子求点数和的期望。
                        </p>
                        <CompareTable
                            headers={['做法', '要做的事', '工作量']}
                            rows={[
                                ['硬算分布', '枚举 6⁴ = 1296 种情形，统计每个和的方式数，再加权平均', '很大'],
                                ['用线性性', '每颗骰子期望 3.5，四颗相加 = 14', '一次乘法'],
                            ]}
                        />
                        <Callout icon={BarChart3} title="一个更能体现威力的例子" tone="amber">
                            题目：投 100 次硬币，正面记 1 分反面记 0 分，求总分的期望。
                            <br /><br />
                            <strong>硬算</strong>：总分可能是 0 到 100，每个值的概率是 C(100,k)/2<sup>100</sup>，
                            然后加权求和——计算量巨大。
                            <br /><br />
                            <strong>线性性</strong>：设 X<sub>i</sub> 为第 i 次的得分，E[X<sub>i</sub>] = 0.5×1 + 0.5×0 = 0.5。
                            总分 = X<sub>1</sub>+…+X<sub>100</sub>，所以期望 = 100 × 0.5 = <strong>50</strong>。
                            <br /><br />
                            一行就算完了。这就是「把总量拆成小量」的价值。
                        </Callout>
                        <Callout icon={AlertTriangle} title="但乘法不满足线性性" tone="rose">
                            <code className="font-mono">E[X × Y] = E[X] × E[Y]</code>
                            <strong>只在 X、Y 独立时成立</strong>，不是普遍规律。
                            <br /><br />
                            反例：X 是掷一颗骰子的点数，Y = X 本身（显然不独立）。
                            E[X] = E[Y] = 3.5，乘积是 12.25；
                            但 E[X×Y] = E[X²] = (1+4+9+16+25+36)/6 = 91/6 ≈ 15.17。
                            两者不等。
                            <br /><br />
                            记法：<strong>加法随便拆，乘法要先确认独立</strong>。
                        </Callout>
                        <MiniQuiz items={[{
                            question: '期望和「最可能取值」是同一回事吗？',
                            answer: '不是',
                            reason: '期望是加权平均，可能根本不是能取到的值（如一颗骰子期望 3.5）。90% 得 0 分、10% 得 100 分时，最可能取值是 0 而期望是 10——这个 10 一次都不会出现。',
                        }, {
                            question: '期望的线性性 E[X+Y]=E[X]+E[Y] 需要 X、Y 独立吗？',
                            answer: '不需要',
                            reason: '线性性对任意随机变量都成立，这正是它好用的原因。而 E[X×Y]=E[X]×E[Y] 才要求独立。',
                        }, {
                            question: '袋中 3 红 2 白，不放回连摸两个都是红的概率，为什么不是 3/5 × 3/5？',
                            answer: '两次不独立',
                            reason: '第一次摸走一个红球后，袋里只剩 2 红 2 白，第二次的概率变成 2/4。正确答案是 3/5 × 2/4 = 3/10。',
                        }]} />
                    </>
                ),
                5: (
                    <>
                        <StepList
                            title="动手任务"
                            steps={[
                                '算一颗骰子的点数期望（3.5），再用线性性算 2、3、4 颗的期望，与实验台核对。',
                                '写程序枚举掷 3 颗骰子的 216 种情形，统计点数和的分布并算出期望，验证等于 10.5。',
                                '算「袋中 5 红 3 白取 3 个，至少一个红」的概率，用三重循环枚举 56 种组合验证 55/56。',
                                '构造一个「期望不等于最可能取值」的例子，并把两个数都算出来。',
                                '用线性性算「投 100 次硬币总分的期望」，再想一想硬算的话要做什么。',
                                '验证 E[X×X] ≠ E[X]×E[X]：一颗骰子，分别算 91/6 和 12.25。',
                            ]}
                        />
                        <TransferCheck
                            className="mt-6"
                            prompt={`一个游戏：一副牌里有 10 张，其中 3 张是奖券。你随机抽 4 张（不放回），求抽到的奖券张数的期望。请用两种方法计算，并说明哪种更省事。`}
                            hint={`方法一按定义枚举奖券张数 0、1、2、3 的概率。方法二想想「每一张奖券」被抽到的概率是多少——它们可以分别算吗？`}
                            answer={`方法一（按定义）：设 X 为抽到的奖券张数，取值 0~3。用组合数算各自概率，分母都是 C(10,4) = 210。
P(X=0) = C(3,0)×C(7,4)/210 = 35/210
P(X=1) = C(3,1)×C(7,3)/210 = 3×35/210 = 105/210
P(X=2) = C(3,2)×C(7,2)/210 = 3×21/210 = 63/210
P(X=3) = C(3,3)×C(7,1)/210 = 7/210
（四者相加 = 210/210 = 1，这一步一定要验，能挡住绝大多数算错。）
E[X] = (0×35 + 1×105 + 2×63 + 3×7)/210 = (0+105+126+21)/210 = 252/210 = 1.2

方法二（线性性）：把「奖券张数」拆成三个小量。设 Xi = 1 表示第 i 张奖券被抽中、否则为 0（i = 1,2,3），则 X = X1+X2+X3。
对任意一张特定的奖券，它被抽中的概率是多少？抽 4 张、共 10 张，由对称性每张牌被抽中的概率都是 4/10 = 0.4。所以 E[Xi] = 0.4。
由线性性，E[X] = 0.4 × 3 = 1.2。

方法二明显更省事：不需要组合数、不需要分类、不需要验证概率和为 1，一行就出来了。而且它有一个关键优势——这三个 Xi 其实是不独立的（抽中一张奖券会降低抽中另一张的机会），但线性性不要求独立，照样能用。方法一在张数变多时计算量迅速膨胀，方法二则完全不变。

这道题的通用套路值得记住：凡是求「若干个东西里有多少个满足条件」的期望，都先拆成每个东西的 0/1 指示变量，再用线性性相加。`}
                        />
                        <MasteryCheck
                            className="mt-6"
                            items={[
                                '我能说明期望不等于最可能取值，并举出一个两者差别很大的例子',
                                '我能用线性性把总量拆成小量，避免复杂的分类讨论',
                                '我能判断事件是否独立，知道不放回摸球为什么不能直接相乘',
                                '我知道 E[X+Y]=E[X]+E[Y] 不要求独立，而 E[X×Y]=E[X]×E[Y] 要求独立',
                            ]}
                        />
                    </>
                ),
            }}
        />
    );
}
