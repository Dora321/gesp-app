import React, { useMemo, useState } from 'react';
import { ClipboardCheck, Footprints, Play, RefreshCw, Search } from 'lucide-react';
import CppLessonShell, { Callout, CodeBlock, CodeTracer, CompareTable, MiniQuiz } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '模拟思想' },
    { id: 2, title: '状态变量', category: '记录当前局面' },
    { id: 3, title: '按规则推进', category: '一步一步做' },
    { id: 4, title: '边界与终止', category: '防止跑偏' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

function SimulationLab() {
    const [steps, setSteps] = useState('R R U L D');

    const path = useMemo(() => {
        const moves = steps.trim().split(/\s+/).filter(Boolean);
        let x = 0;
        let y = 0;
        const points = [{ move: 'start', x, y }];
        for (const move of moves) {
            if (move === 'R') x++;
            if (move === 'L') x--;
            if (move === 'U') y++;
            if (move === 'D') y--;
            points.push({ move, x, y });
        }
        return points;
    }, [steps]);

    const last = path[path.length - 1];

    return (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <Footprints className="text-rose-700" />
                <h3 className="text-xl font-black text-slate-950">坐标模拟实验台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-rose-100">
                    <label className="block text-sm font-black text-slate-700">移动序列：R L U D，用空格分隔</label>
                    <input
                        value={steps}
                        onChange={(event) => setSteps(event.target.value.toUpperCase())}
                        className="mt-3 w-full rounded-xl border border-slate-200 p-3 font-mono text-sm font-bold outline-none focus:border-rose-400"
                    />
                    <p className="mt-3 text-sm font-black text-rose-700">终点：({last.x}, {last.y})</p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-rose-100">
                    <p className="text-sm font-black text-slate-500">状态变化</p>
                    <div className="mt-3 grid gap-2">
                        {path.map((point, index) => (
                            <div key={`${point.move}-${index}-${point.x}-${point.y}`} className="rounded-lg bg-slate-100 px-3 py-2 font-mono text-sm font-black text-slate-700">
                                {index}. {point.move} {'->'} ({point.x}, {point.y})
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: '模拟题最先要确定什么？',
        answer: '状态变量',
        reason: '状态变量记录当前局面，比如位置、方向、分数、剩余次数。',
    },
    {
        question: '为什么要按输入顺序处理？',
        answer: '规则有先后影响',
        reason: '模拟题强调过程，顺序错了状态就会错。',
    },
    {
        question: '循环什么时候停止？',
        answer: '达到题目终止条件',
        reason: '可能是步数用完、到达目标、生命值为 0 或没有可操作项。',
    },
];

function MoveTracer() {
    const s = 'RRUL';
    const steps = useMemo(() => {
        const result = [{ active: [0, 1], vars: { x: 0, y: 0 } }];
        let x = 0;
        let y = 0;
        const lineOf = { R: 4, L: 5, U: 6, D: 7 };
        for (let i = 0; i < s.length; i += 1) {
            const cmd = s[i];
            if (cmd === 'R') x += 1;
            if (cmd === 'L') x -= 1;
            if (cmd === 'U') y += 1;
            if (cmd === 'D') y -= 1;
            result.push({
                active: [3, lineOf[cmd]],
                vars: { x, y },
                action: i === 0 ? '开始走' : '下一步',
                row: [`i = ${i}`, cmd, x, y],
            });
        }
        result.push({
            active: [3, 10],
            vars: { x, y },
            action: '退出',
            exit: `i = ${s.length}，遍历结束`,
            output: `cout 输出 ${x} ${y}（终点坐标）`,
        });
        return result;
    }, []);

    return (
        <CodeTracer
            title="坐标模拟追踪器"
            code={`string s = "RRUL";
int x = 0, y = 0;

for (int i = 0; i < s.size(); i++) {
  if (s[i] == 'R') x++;
  if (s[i] == 'L') x--;
  if (s[i] == 'U') y++;
  if (s[i] == 'D') y--;
}

cout << x << " " << y;`}
            varOrder={['x', 'y']}
            columns={['i', '指令', 'x', 'y']}
            steps={steps}
            hint="点击「开始走」，看每条指令怎么改坐标 →"
        />
    );
}

export default function CppL3Lesson11() {
    return (
        <CppLessonShell
            lessonNumber={11}
            lessonTitle="按部就班 (模拟法)"
            lessonSubtitle="把题目规则翻译成状态变化"
            accent="rose"
            levelTitle="C++ 高阶"
            levelCode="L3"
            sections={sections}
            previousPath="/lesson/3/10"
            nextPath="/lesson/3/12"
            hero={{
                title: '模拟题的本质，是让程序照着规则走一遍',
                description: '本课训练状态变量、规则分支、循环推进和终止条件。只要状态设计清楚，模拟题就会从混乱变得可控。',
            }}
            goals={['能找出模拟题的状态变量', '能按输入顺序更新状态', '能处理边界和终止条件']}
            childrenBySection={{
                1: <SimulationLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">状态变量：记录当前局面</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                模拟题不是只算一个公式，而是维护一组会变化的变量。先找清楚“现在是什么状态”。
                            </p>
                        </div>
                        <CompareTable
                            headers={['场景', '状态变量', '含义']}
                            rows={[
                                ['坐标移动', 'x, y', '当前位置'],
                                ['方向旋转', 'dir', '当前朝向'],
                                ['游戏计分', 'score, hp', '分数和生命值'],
                            ]}
                        />
                        <Callout icon={RefreshCw} title="状态会被规则更新" tone="rose">
                            每读入一个操作，就根据规则修改状态变量。最后输出的通常就是某个最终状态。
                        </Callout>
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">按规则推进：读一个操作，处理一次</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                模拟坐标移动时，每个字符对应一个方向。程序要按输入顺序逐个处理。
                            </p>
                        </div>
                        <MoveTracer />
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">边界与终止：模拟不能一直跑</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                有些模拟题需要在撞墙、到达目标、次数用完时停止。终止条件要写在循环里最合适的位置。
                            </p>
                        </div>
                        <CodeBlock>{`for (int i = 0; i < n; i++) {
  // 先根据规则更新状态
  position += step;

  // 再判断是否到达终止条件
  if (position == target) {
    cout << i + 1;
    break;
  }
}`}</CodeBlock>
                        <Callout icon={Play} title="调试技巧" tone="blue">
                            模拟题出错时，可以在每一步后输出状态，检查程序和手算过程从哪一步开始不一致。
                        </Callout>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                练习模拟题时，不要急着压缩代码。先把规则逐条翻译成 if 和状态更新。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>读入一串 R/L/U/D，输出最终坐标。</li>
                                <li>模拟一个计分游戏：答对加 10，答错扣 5，分数不低于 0。</li>
                                <li>模拟机器人移动，遇到边界不能继续前进。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课做加密与解密。本质仍然是模拟：每个字符按规则变成另一个字符。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
