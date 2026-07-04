import React, { useState } from 'react';
import { Rocket, ListChecks, Repeat, FileCode2, Flag, Sparkles } from 'lucide-react';
import PythonLessonShell, { MasteryCheck, SlideHeader, CodeBlock, TransferCheck } from '../shell/PythonLessonShell';

const skillMap = [
    ['想出一个 1–100 的答案', 'F6 随机', 'random.randint(1, 100)'],
    ['一直让玩家猜，直到猜中', 'F2 控制流程', 'while 循环'],
    ['判断太大 / 太小 / 猜中', 'F2 控制流程', 'if / elif / else'],
    ['读入玩家输入的数字', 'F1 入门', 'int(input())'],
    ['记录每次猜的历史', 'F3 列表', 'history.append(n)'],
    ['把提示规则封装出来', 'F4 函数', 'def make_hint(...)'],
    ['统计猜了几次', 'F1 + F2', '计数变量 + 累加'],
];

const bridgeMasteryItems = [
    {
        label: '能把一个小游戏拆成输入、状态、循环、判断、输出。',
        evidence: '能指出猜数字里 input、answer、while、if、print 分别负责什么。',
        retryHint: '回到“拆解规则”，先把游戏步骤写成一张表。',
    },
    {
        label: '能把每个步骤连回 F1-F7 的旧知识，而不是当成新语法硬背。',
        evidence: '至少能说出 F1 输入、F2 循环判断、F3 历史列表、F4 函数、F6 随机各在哪里出现。',
        retryHint: '回到“完整程序”，逐行标注这行代码来自哪节基础课。',
    },
    {
        label: '能在运行前预测一轮循环会发生什么。',
        evidence: '给定 answer=42、guess=30，能说出提示、history 和 count 怎么变。',
        retryHint: '回到“核心循环”，先手推一次“读输入 -> 比较 -> 记录 -> 输出”。',
    },
    {
        label: '能设计一个小改造，把基础能力迁移到项目线。',
        evidence: '例如限制最多猜 7 次、避免重复猜、记录最佳成绩，或把提示规则封装成函数。',
        retryHint: '从一个最小改造开始，只加一个变量或一个函数，不要一次改太多。',
    },
];

const PreviewSlide = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SlideHeader accent="violet" icon={Rocket} title="把学过的，拼成一个能玩的游戏">
            这一课<strong>不学新语法</strong>。我们把 F1–F7 里最常用的本领组合起来，亲手拼出一个能玩的「猜数字大冒险」——这是从"学语法"迈向"做项目"的第一步。
        </SlideHeader>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-3 text-sm font-black uppercase tracking-wider text-violet-600">成品预告</div>
            <p className="text-base font-semibold leading-7 text-slate-600">
                电脑悄悄想一个 1–100 的数字，你来猜。每猜一次，它告诉你"太大"还是"太小"，并记下你猜了几次，直到你猜中为止。
            </p>
        </div>
    </div>
);

const PlanSlide = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SlideHeader accent="violet" icon={ListChecks} title="先拆规则：每一步用到哪节课">
            做项目的第一招是<strong>拆解</strong>——把"做个猜数字游戏"拆成一条条小步骤，再给每步找到对应的本领。
        </SlideHeader>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-xs font-black uppercase tracking-wider text-slate-500">
                    <tr>
                        <th className="px-4 py-3">游戏步骤</th>
                        <th className="px-4 py-3">用到的课</th>
                        <th className="px-4 py-3 font-mono">关键写法</th>
                    </tr>
                </thead>
                <tbody>
                    {skillMap.map(([step, lesson, code]) => (
                        <tr key={step} className="border-t border-slate-100">
                            <td className="px-4 py-3 font-semibold text-slate-700">{step}</td>
                            <td className="px-4 py-3"><span className="rounded-full bg-violet-50 px-2 py-1 text-xs font-black text-violet-700">{lesson}</span></td>
                            <td className="px-4 py-3 font-mono text-slate-600">{code}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const PlaySlide = () => {
    const [target, setTarget] = useState(() => Math.floor(Math.random() * 100) + 1);
    const [guess, setGuess] = useState('');
    const [history, setHistory] = useState([]);
    const [won, setWon] = useState(false);

    const submit = () => {
        const n = parseInt(guess, 10);
        if (Number.isNaN(n) || won) return;
        let hint;
        if (n === target) { hint = '🎉 猜中了'; setWon(true); }
        else if (n < target) hint = '太小了 ↑';
        else hint = '太大了 ↓';
        setHistory((h) => [...h, { n, hint }]);
        setGuess('');
    };

    const reset = () => {
        setTarget(Math.floor(Math.random() * 100) + 1);
        setHistory([]);
        setWon(false);
        setGuess('');
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="violet" icon={Repeat} title="核心循环：一直猜到对为止">
                整个游戏的心脏，是一个 <code>while</code> 循环：只要还没猜中，就重复"读输入 → 比较 → 给提示"。先玩一局，再看右边的代码。
            </SlideHeader>
            <div className="grid gap-8 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <span className="text-sm font-black text-slate-500">猜一个 1–100 的数字</span>
                        <button onClick={reset} className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-600 hover:bg-slate-200">重开一局</button>
                    </div>
                    <div className="flex gap-2">
                        <input
                            value={guess}
                            onChange={(e) => setGuess(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && submit()}
                            disabled={won}
                            placeholder="输入你的猜测…"
                            className="flex-1 rounded-xl border border-slate-200 p-3 font-mono font-bold outline-none focus:border-violet-400 disabled:bg-slate-50"
                        />
                        <button onClick={submit} disabled={won} className="rounded-xl bg-violet-600 px-5 font-black text-white hover:bg-violet-700 disabled:opacity-50">猜</button>
                    </div>
                    <div className="mt-4 space-y-1.5">
                        {history.map((h, i) => (
                            <div key={i} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 font-mono text-sm font-bold text-slate-700">
                                <span>第 {i + 1} 次：{h.n}</span>
                                <span className={h.hint.includes('猜中') ? 'text-emerald-600' : 'text-amber-600'}>{h.hint}</span>
                            </div>
                        ))}
                        {history.length === 0 && <p className="text-sm text-slate-400">还没开始，输入一个数字试试 →</p>}
                    </div>
                    {won && <div className="mt-4 rounded-xl border-2 border-emerald-200 bg-emerald-50 p-4 text-center font-black text-emerald-700">🏆 用 {history.length} 次猜中！</div>}
                </div>
                <div>
                    <CodeBlock code={`import random\n\nanswer = random.randint(1, 100)\ncount = 0\n\nwhile True:\n    guess = int(input("猜一个数: "))\n    count = count + 1\n    if guess == answer:\n        print("猜中了！用了", count, "次")\n        break\n    elif guess < answer:\n        print("太小了")\n    else:\n        print("太大了")`} />
                </div>
            </div>
        </div>
    );
};

const FullCodeSlide = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SlideHeader accent="violet" icon={FileCode2} title="完整程序：多节基础课拼成一个游戏">
            把刚才的核心循环加上"函数封装"和"记录历史"，就是完整的程序。读一遍，注意它如何把基础课的本领串在一起。
        </SlideHeader>
        <CodeBlock code={`import random                              # F6 随机\n\ndef make_hint(guess, answer):              # F4 函数封装\n    if guess == answer:                    # F2 判断\n        return "猜中了！"\n    elif guess < answer:\n        return "太小了"\n    else:\n        return "太大了"\n\nanswer = random.randint(1, 100)           # F6 出题\nhistory = []                              # F3 列表记录\n\nwhile True:                               # F2 一直循环\n    guess = int(input("猜一个数: "))       # F1 读输入\n    history.append(guess)                 # F3 存历史\n    hint = make_hint(guess, answer)        # F4 调用函数\n    print(hint)\n    if guess == answer:\n        print("用了", len(history), "次")\n        break                             # 跳出循环\n\nprint("你的猜测记录：", history)`} />
        <div className="rounded-2xl border border-violet-100 bg-violet-50 p-5 text-sm font-semibold leading-7 text-violet-900">
            看出来了吗？做项目不是学一堆全新的东西，而是<strong>把学过的小本领按规则拼起来</strong>。F5 的状态变化直觉、F7 的去重和成员判断，也会在后面的游戏和数据项目里继续出现。
        </div>
    </div>
);

const WrapSlide = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SlideHeader accent="violet" icon={Flag} title="你已经会「拼」程序了">
            从这一课起，你的身份从"学语法的人"变成了"做东西的人"。
        </SlideHeader>
        <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-2 flex items-center gap-2 font-black text-slate-800"><Sparkles size={16} className="text-violet-600" /> 这一课你做到了</div>
                <ul className="space-y-1.5 text-sm font-semibold text-slate-600">
                    <li>· 把一个需求拆成可执行的小步骤</li>
                    <li>· 用 while + if 搭出游戏主循环</li>
                    <li>· 把随机、列表、输入输出组合成一个作品</li>
                </ul>
            </div>
            <div className="rounded-2xl border border-violet-100 bg-violet-50 p-5">
                <div className="mb-2 font-black text-violet-800">下一站：A1 算法思维</div>
                <p className="text-sm font-semibold leading-7 text-violet-900">
                    你已经能"拼"出程序。接下来项目线会教你<strong>怎么拼得聪明</strong>——枚举、贪心、递归，让程序又对又快。
                </p>
            </div>
        </div>
        <TransferCheck
            prompt="换个例子：用「对半猜」策略猜 1~100 之间的神秘数字，最坏情况下几次一定能猜中？"
            hint="每猜一次，剩余范围就砍一半：100 → 50 → 25 → …，数一数砍几刀能到 1。"
            answer="7 次（2⁷ = 128 ≥ 100，7 次对半足以覆盖 100 个数）。"
            steps={[
                '每次猜区间正中间，无论大了还是小了，剩余范围都只剩一半。',
                '100 → 50 → 25 → 13 → 7 → 4 → 2 → 1，共砍 7 刀。',
                '这正是 A2 二分搜索要正式学的思想。',
            ]}
        />
        <MasteryCheck
            title="项目线入口离开前检查"
            description="如果能拆规则、连回旧知识、手推一轮循环、设计一个小改造，就可以进入 A1。"
            accent="violet"
            items={bridgeMasteryItems}
        />
    </div>
);

const sections = [
    { id: 1, title: '成品预告', category: '要做什么', icon: Rocket, component: PreviewSlide },
    { id: 2, title: '拆解规则', category: '步骤对照课', icon: ListChecks, component: PlanSlide },
    { id: 3, title: '核心循环', category: '边玩边学', icon: Repeat, component: PlaySlide },
    { id: 4, title: '完整程序', category: '串起六节课', icon: FileCode2, component: FullCodeSlide },
    { id: 5, title: '小结与下一步', category: '进入项目线', icon: Flag, component: WrapSlide },
];

export default function PythonBridge() {
    return (
        <PythonLessonShell
            eyebrow="PYTHON 桥梁课"
            lessonCode="桥梁"
            lessonTitle="猜数字大冒险"
            lessonSubtitle="用 F1–F7 拼出第一个完整程序"
            accent="violet"
            hero={{
                title: '从"学语法"到"做项目"的第一步',
                description: '不学新知识，只用前面学过的本领，亲手拼一个能玩的猜数字游戏——跨过基础线和项目线之间的台阶。',
            }}
            sections={sections}
            previousPath="/python/f7"
            nextPath="/python/a1"
            nextLabel="进入项目线：A1 算法思维"
            homeLabel="返回课程"
        />
    );
}
