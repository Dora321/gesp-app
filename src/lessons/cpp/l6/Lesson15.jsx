import React, { useMemo, useState } from 'react';
import { AlertTriangle, ClipboardCheck, Search, ShieldCheck } from 'lucide-react';
import CppL6LessonSupport from '../../../components/CppL6LessonSupport';
import CppLessonShell, { Callout, CodeBlock, CompareTable, MasteryCheck, MiniQuiz, StepList } from '../CppLessonShell';

const sections = [
    { id: 1, title: '课程导入', category: '错误分类' },
    { id: 2, title: '搜索易错', category: 'BFS/DFS' },
    { id: 3, title: 'OOP 易错', category: '访问与虚函数' },
    { id: 4, title: 'DP 易错', category: '状态与顺序' },
    { id: 5, title: '练习与作业', category: '复盘输出' },
];

const errorMap = {
    'BFS 重复入队': ['入队时立刻 visited=true', 'dist 初始值设为 -1', '先过滤越界和障碍'],
    'DFS 回溯漏撤销': ['递归返回后 pop_back', 'used 状态恢复 false', '画递归树检查兄弟分支'],
    '多态没有生效': ['父类函数加 virtual', '子类函数加 override', '通过指针或引用调用'],
    '背包答案异常': ['检查容量循环方向', '确认 0/1 还是完全背包', '先写二维版本对照'],
};

function DiagnosisLab() {
    const [error, setError] = useState('背包答案异常');
    const actions = useMemo(() => errorMap[error], [error]);

    return (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6">
            <div className="mb-5 flex items-center gap-2">
                <AlertTriangle className="text-rose-700" />
                <h3 className="text-xl font-black text-slate-950">六级错因诊断台</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-xl bg-white p-5 ring-1 ring-rose-100">
                    <label className="block text-sm font-black text-slate-700">错误现象</label>
                    <select value={error} onChange={(event) => setError(event.target.value)} className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold">
                        {Object.keys(errorMap).map((item) => <option key={item}>{item}</option>)}
                    </select>
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                        六级错误通常不是“不会写”，而是模型选错、初始化漏掉、循环方向写反或对象关系没理清。
                    </p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-rose-100">
                    <div className="text-sm font-black text-slate-500">建议检查动作</div>
                    <ol className="mt-3 space-y-2">
                        {actions.map((item, index) => (
                            <li key={item} className="rounded-lg bg-rose-100 px-4 py-3 text-sm font-black text-rose-800">
                                {index + 1}. {item}
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
}

const quiz = [
    {
        question: 'BFS visited 最好什么时候标记？',
        answer: '入队时',
        reason: '这样能防止同一个点被多个邻居重复加入队列。',
    },
    {
        question: '0/1 背包一维容量方向是什么？',
        answer: '倒序',
        reason: '倒序避免同一物品被重复使用。',
    },
    {
        question: '多态失效先检查什么？',
        answer: 'virtual 和调用方式',
        reason: '没有 virtual，或不用指针/引用，都可能看不到动态绑定效果。',
    },
];

const masteryItems = [
    {
        label: '能说出 BFS visited 的标记时机。',
        evidence: '入队时立刻标记，防止同一个点被多个邻居重复加入队列。',
        retryHint: '回到「搜索易错」的对照表。',
    },
    {
        label: '能检查回溯是否恢复现场。',
        evidence: '递归返回后 pop_back、used 恢复 false，画递归树检查兄弟分支。',
        retryHint: '回到错因诊断台的「DFS 回溯漏撤销」。',
    },
    {
        label: '能按清单排查多态失效。',
        evidence: '父类函数加 virtual、子类加 override、通过指针或引用调用，三样缺一不可。',
        retryHint: '回到「OOP 易错」的检查清单。',
    },
    {
        label: '能用 DP 四件套定位背包异常。',
        evidence: '状态含义、初值、转移来源、容量循环方向（0/1 背包一维要倒序）。',
        retryHint: '回到「DP 易错」的调试表。',
    },
];

export default function CppL6Lesson15() {
    return (
        <CppLessonShell
            lessonNumber={15}
            lessonTitle="易错题诊疗室"
            lessonSubtitle="把错误变成提交前动作"
            accent="rose"
            levelTitle="C++ 大师"
            levelCode="L6"
            sections={sections}
            previousPath="/lesson/6/14"
            nextPath="/lesson/6/16"
            topSupport={<CppL6LessonSupport lessonId={15} />}
            bottomSupport={<CppL6LessonSupport lessonId={15} placement="bottom" />}
            hero={{
                title: '六级冲刺的关键不是再学新名词，而是减少高频失误',
                description: '本课把搜索、OOP、DP 的常见错误整理成诊断表和提交前检查清单。',
            }}
            goals={['能快速定位 BFS/DFS 常见错误', '能检查 OOP 访问控制和多态问题', '能用 DP 四件套排查状态和循环顺序']}
            childrenBySection={{
                1: <DiagnosisLab />,
                2: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">搜索易错：队列、递归、标记都要有节奏</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                BFS 和 DFS 都依赖 visited，但标记时机不同场景会带来不同问题。最常见的是 BFS 重复入队、DFS 无限递归。
                            </p>
                        </div>
                        <CompareTable
                            headers={['错误', '表现', '检查动作']}
                            rows={[
                                ['BFS 重复入队', '队列变大、距离异常', '入队时立刻标记'],
                                ['DFS 忘记出口', '栈溢出或死循环', '先写递归终止条件'],
                                ['回溯漏撤销', '方案重复或缺失', '递归返回后恢复现场'],
                            ]}
                        />
                    </>
                ),
                3: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">OOP 易错：接口、访问权限和对象生命周期</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                面向对象题最怕“为了能跑，把所有东西都 public”。这会让类失去封装，也让错误更难定位。
                            </p>
                        </div>
                        <CodeBlock>{`OOP 提交前检查：
□ 成员变量是否应该 private/protected？
□ 构造函数是否初始化了所有关键成员？
□ 重写父类函数是否写了 override？
□ 基类析构函数是否需要 virtual？
□ 是否通过指针或引用体现多态？`}</CodeBlock>
                        <Callout icon={ShieldCheck} title="OOP 诊断口令" tone="rose">
                            数据少公开，接口要清楚；继承看 is-a，多态看 virtual。
                        </Callout>
                    </>
                ),
                4: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">DP 易错：状态没定义清楚，后面全靠猜</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                DP 错误大多来自四件套缺失：状态含义模糊、初值漏写、转移引用了未计算状态、答案位置输出错。
                            </p>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                            <CodeBlock>{`DP 调试表：
状态：dp[i][j] 表示什么？
初值：最小状态在哪里？
转移：当前从哪些状态来？
顺序：被依赖的状态是否已经算好？
答案：最终输出 dp 的哪个位置？`}</CodeBlock>
                            <StepList steps={[
                                '先用小样例手推表格',
                                '检查第一行和第一列',
                                '检查容量循环方向',
                                '确认答案位置不是中间状态',
                            ]} />
                        </div>
                    </>
                ),
                5: (
                    <>
                        <div>
                            <h3 className="text-3xl font-black text-slate-950">练习与作业</h3>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                                这一课的目标是建立“错题能复用”的习惯：每个错误都要产出下次检查动作。
                            </p>
                        </div>
                        <MiniQuiz items={quiz} />
                        <MasteryCheck
                            title="C++ L6-15 易错诊疗离开前检查"
                            description="六级冲刺靠的是减少高频失误。勾选前先拿自己最近一道搜索或 DP 错题，按检查动作走一遍。"
                            items={masteryItems}
                        />
                        <Callout icon={ClipboardCheck} title="课后任务" tone="slate">
                            <ul className="space-y-2">
                                <li>整理 5 道六级错题，标注搜索/OOP/DP/审题/输出格式。</li>
                                <li>给每道错题写一个下次提交前检查动作。</li>
                                <li>把背包循环方向和 BFS 标记时机写成速查卡。</li>
                            </ul>
                        </Callout>
                        <Callout icon={Search} title="下一课衔接" tone="blue">
                            下一课进入六级全真模拟，把知识点、节奏和检查清单组合成考试流程。
                        </Callout>
                    </>
                ),
            }}
        />
    );
}
