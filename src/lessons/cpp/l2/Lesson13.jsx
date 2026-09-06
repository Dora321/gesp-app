import React, { useMemo, useState } from 'react';
import { ClipboardCheck, Footprints, ListChecks, PlayCircle, Route } from 'lucide-react';
import CppL2LessonSupport from '../../../components/CppL2LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, PredictCheck, StepList, TransferCheck } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '模拟思想' },
    { id: 2, title: '按题意执行', category: '核心方法' },
    { id: 3, title: '状态变量', category: '过程记录' },
    { id: 4, title: '输入输出设计', category: '实战步骤' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function WalkSimulator() {
    const [commands, setCommands] = useState(['R', 'R', 'L', 'R', 'R']);

    const trace = useMemo(() => {
        const rows = [];
        let position = 0;
        for (let index = 0; index < commands.length; index += 1) {
            position += commands[index] === 'R' ? 1 : -1;
            rows.push({ step: index + 1, command: commands[index], position });
        }
        return rows;
    }, [commands]);

    const toggleCommand = (index) => {
        setCommands((current) => current.map((command, i) => (i === index ? (command === 'R' ? 'L' : 'R') : command)));
    };

    return (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Footprints className="text-indigo-700" />
                <h3 className="text-xl font-black text-slate-950">机器人行走模拟</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                    <p className="text-sm font-black text-slate-700">点击指令切换 L / R</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {commands.map((command, index) => (
                            <button
                                key={`${command}-${index}`}
                                onClick={() => toggleCommand(index)}
                                className="rounded-lg bg-indigo-600 px-4 py-3 font-mono text-lg font-black text-white transition hover:bg-indigo-500"
                            >
                                {command}
                            </button>
                        ))}
                    </div>
                    <div className="mt-5 rounded-lg bg-slate-950 p-4 font-mono text-green-400">
                        最终位置：{trace.at(-1)?.position ?? 0}
                    </div>
                </div>
                <StepList steps={trace.map((item) => `第 ${item.step} 步执行 ${item.command}，当前位置 ${item.position}`)} />
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '模拟题第一步应该做什么？',
        answer: '找状态变量',
        reason: '状态变量记录过程变化，比如位置、余额、分数、次数。',
    },
    {
        question: '为什么模拟题要按顺序处理输入？',
        answer: '因为后一步依赖前一步状态',
        reason: '顺序错了，状态就会被错误更新。',
    },
    {
        question: '模拟题适合强行套公式吗？',
        answer: '不适合',
        reason: '模拟题考的是按题意复现过程，不是背公式。',
    },
];

function SimulationPredictionChecks() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <PredictCheck
                prompt={'指令串 "RRLRR"，pos 从 0 开始，左减右加，最终 pos 是多少？'}
                options={['3（逐步左减右加）', '5（数指令条数）']}
                correctIndex={0}
                explanation="逐字符更新：R→1、R→2、L→1、R→2、R→3。L 会抵消一步，所以最终是 3，不是指令条数 5。"
                misconception="把“走了几步”当成“位置变化”，忘了 L 会往回走。"
            />
            <PredictCheck
                prompt={'计分规则“答对 +10、答错 -5、分数不能低于 0”。当前 0 分答错一题，分数变成多少？'}
                options={['-5，最后输出时再改成 0', '0，每步更新后就要检查边界']}
                correctIndex={1}
                explanation="“不低于 0”是过程规则：每次扣分后立刻检查 if (score < 0) score = 0;。留到最后才处理，中间的状态都会错。"
                misconception="把每一步都要生效的边界规则，拖到最后输出时才处理。"
            />
            <PredictCheck
                prompt={'循环处理 n 条指令时，循环体里应该先做哪件事？'}
                options={['先 cin 读入本轮指令，再更新状态', '先更新状态，再读入下一条']}
                correctIndex={0}
                explanation="每一轮要先拿到本轮输入，再按规则更新。顺序反了，更新用的就是上一轮的旧指令。"
                misconception="觉得循环体里语句顺序无所谓，结果状态用了旧输入。"
            />
        </div>
    );
}

const simulationMasteryItems = [
    {
        label: '能在读题时圈出状态变量和更新规则。',
        evidence: '拿 L/R 移动题能说出：状态是 pos，规则是左减右加。',
        retryHint: '回到“状态变量”小节的场景对照表。',
    },
    {
        label: '能先写单步更新，再放进循环。',
        evidence: '能解释循环体里为什么要先 cin 再更新状态。',
        retryHint: '回到“输入输出设计”小节，对照两段代码。',
    },
    {
        label: '能手推 2~3 轮草稿表验证顺序。',
        evidence: '给 RRLRR 能列出每一步的 pos 变化表。',
        retryHint: '回到“机器人行走模拟”，逐条指令点一遍。',
    },
    {
        label: '能处理“分数不低于 0”这类每步边界。',
        evidence: '能把 if (score < 0) score = 0; 放在每次扣分之后。',
        retryHint: '重做计分边界预测题。',
    },
];

export default function CppL2Lesson13() {
    return (
        <CppLessonShell
            prerequisites={['会用循环和分支组合解题', '会按题意逐步模拟过程', '会用变量记录状态的变化']}
            lessonNumber={13}
            lessonTitle="模拟算法实战 1"
            lessonSubtitle="把题目描述翻译成一步步状态变化"
            accent="indigo"
            sections={sections}
            previousPath="/lesson/2/12"
            nextPath="/lesson/2/14"
            topSupport={<CppL2LessonSupport lessonId={13} />}
            bottomSupport={<CppL2LessonSupport lessonId={13} placement="bottom" />}
            hero={{
                title: '模拟题不神秘，就是让程序照着规则走一遍',
                description: '从这一课开始，我们把前面的条件、循环、数组组合起来。目标不是学新语法，而是学会把题目规则拆成状态和操作。',
            }}
            goals={['能找出模拟题中的状态变量', '能按输入顺序更新状态', '能用草稿表追踪每一步结果']}
            childrenBySection={{
                1: <WalkSimulator />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">模拟算法：题目怎么说，程序就怎么做</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                模拟题的关键是忠实执行规则。先不要想着优化，先把过程写正确。
                            </p>
                        </div>
                        <CodeBlock>{`int pos = 0;
string s;
cin >> s;

for (int i = 0; i < s.size(); i++) {
  if (s[i] == 'L') pos--;
  if (s[i] == 'R') pos++;
}

cout << pos;`}</CodeBlock>
                        <Callout icon={Route} title="模拟题四步" tone="blue">
                            <ol className="space-y-2">
                                <li>找状态：哪些量会变化？</li>
                                <li>找操作：每次输入会改变什么？</li>
                                <li>按顺序循环处理。</li>
                                <li>输出最终状态或统计值。</li>
                            </ol>
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">状态变量：模拟题的记忆</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                没有状态变量，程序就不知道当前走到哪、剩多少钱、累计了几次。每个变量都应该对应题目中的一个含义。
                            </p>
                        </div>
                        <CompareTable
                            headers={['场景', '状态变量', '更新方式']}
                            rows={[
                                ['机器人移动', 'pos', '左减右加'],
                                ['计分游戏', 'score', '答对加分，答错扣分'],
                                ['排队处理', 'cnt 或 wait', '每处理一次更新人数'],
                            ]}
                        />
                        <Callout icon={PlayCircle} title="草稿表习惯" tone="emerald">
                            模拟题至少手算 2 到 3 轮。表头写“步骤、输入、状态变化、当前结果”，能提前发现代码顺序问题。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">输入输出设计：先处理一条，再放进循环</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                如果一次操作都写不清楚，循环只会放大混乱。先写单步更新，再把它放进 for 或 while。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-2">
                            <CodeBlock>{`// 单步规则
if (cmd == 'L') pos--;
else if (cmd == 'R') pos++;`}</CodeBlock>
                            <CodeBlock>{`// 放入循环
for (int i = 0; i < n; i++) {
  cin >> cmd;
  if (cmd == 'L') pos--;
  else if (cmd == 'R') pos++;
}`}</CodeBlock>
                        </div>
                        <SimulationPredictionChecks />
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                本课练习重点是“过程复现”，每题都要写出状态表。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <TransferCheck
                            prompt={'换个例子：指令串 "RRLLL"，起点 0。最终位置是多少？过程中离起点最远（|pos| 最大）是多少？'}
                            hint="逐字符更新 pos，每步顺手记录 |pos| 的最大值。"
                            answer="最终位置 -1；最远 |pos| = 2（走完第 2 步时）。"
                            steps={[
                                'R→1，R→2，L→1，L→0，L→-1。',
                                '每步 |pos|：1、2、1、0、1。',
                                '最终位置 -1，最远距离 2。',
                            ]}
                        />
                        <MasteryCheck
                            title="C++ L2-13 模拟算法（1）离开前检查"
                            description="模拟题最怕“看懂规则，但更新顺序和边界一写就乱”。勾选前先拿 RRLRR 手推一张状态表。"
                            items={simulationMasteryItems}
                        />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>输入一串 L/R 指令，输出机器人最终位置。</li>
                                <li>输入 n 次得分变化，输出最终分数和最高分。</li>
                                <li>设计一个“余额变化”模拟：收入加、支出减，余额不能低于 0。</li>
                            </ul>
                        </Callout>
                        <Callout icon={ListChecks} title="下一课衔接" tone="blue">
                            下一课继续模拟，但会加入更多条件分支和数组记录，训练更接近二级综合题。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
