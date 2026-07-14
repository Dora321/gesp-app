import { useState } from 'react';
import { HelpCircle, CheckCircle, BookOpen } from 'lucide-react';
import { MasteryCheck, SlideHeader } from '../../shell/PythonLessonShell';
import { Button } from './Shared';

export const QuizSlide = () => {
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [showHints, setShowHints] = useState({});

    const questions = [
        { id: 'q1', text: 'True and False 的结果是？', options: ['True', 'False', 'Unknown'], correct: 'False', difficulty: '简单', hint: 'and 要求两个都是 True 才返回 True' },
        { id: 'q2', text: 'if 5 > 3: print("A") else: print("B") 输出？', options: ['A', 'B', 'Error'], correct: 'A', difficulty: '简单', hint: '5 确实大于 3，所以条件为 True' },
        { id: 'q3', text: 'for i in range(3): print(i) 最后输出？', options: ['0', '1', '2'], correct: '2', difficulty: '中等', hint: 'range(3) 生成 0, 1, 2，最后输出的是2' },
        { id: 'q4', text: '18 >= 18 的结果是？', options: ['True', 'False'], correct: 'True', difficulty: '简单', hint: '>= 表示大于或等于' },
        { id: 'q5', text: 'not True or False 的结果是？', options: ['True', 'False'], correct: 'False', difficulty: '中等', hint: 'not True 是 False，False or False 是 False' },
        { id: 'q6', text: 'while 条件为 False 时，循环体会执行吗？', options: ['会', '不会', '报错'], correct: '不会', difficulty: '中等', hint: 'while 只在条件为 True 时才执行' },
    ];

    const checkAnswers = () => {
        let correctCount = 0;
        questions.forEach(q => {
            if (answers[q.id] === q.correct) correctCount++;
        });
        setScore(correctCount);
    };

    const getAchievement = () => {
        const percentage = (score / questions.length) * 100;
        if (percentage === 100) return { emoji: '🏆', text: '完美大师', color: 'text-yellow-600' };
        if (percentage >= 80) return { emoji: '🌟', text: '优秀学员', color: 'text-blue-600' };
        if (percentage >= 60) return { emoji: '👍', text: '继续加油', color: 'text-green-600' };
        return { emoji: '💪', text: '再接再厉', color: 'text-orange-600' };
    };

    const toggleHint = (qid) => {
        setShowHints(prev => ({ ...prev, [qid]: !prev[qid] }));
    };

    const allAnswered = questions.every(q => answers[q.id]);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="blue" icon={HelpCircle} title="逻辑大师挑战赛">
                证明你是逻辑鬼才的时候到了！答对全部题目即可通关。
            </SlideHeader>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 space-y-6">
                {questions.map((q, idx) => (
                    <div key={q.id} className="pb-4 border-b border-slate-100 last:border-0">
                        <div className="flex items-start justify-between mb-3">
                            <p className="font-bold text-slate-700">{idx + 1}. {q.text}</p>
                            <span className={`text-xs px-2 py-1 rounded-full font-bold ${q.difficulty === '简单' ? 'bg-green-100 text-green-700' :
                                q.difficulty === '中等' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-red-100 text-red-700'
                                }`}>
                                {q.difficulty}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {q.options.map(opt => (
                                <button
                                    key={opt}
                                    onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt }))}
                                    disabled={score !== null}
                                    className={`px-4 py-2 rounded-lg text-sm border transition-all
                                        ${answers[q.id] === opt
                                            ? 'bg-purple-600 text-white border-purple-600'
                                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}
                                        ${score !== null ? 'cursor-not-allowed opacity-60' : ''}
                                    `}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                        {showHints[q.id] && (
                            <div className="mt-2 text-xs bg-blue-50 text-blue-700 p-2 rounded-lg">
                                💡 提示: {q.hint}
                            </div>
                        )}
                        {score === null && (
                            <button
                                onClick={() => toggleHint(q.id)}
                                className="text-xs text-blue-600 hover:text-blue-700 mt-1"
                            >
                                {showHints[q.id] ? '隐藏提示' : '显示提示'}
                            </button>
                        )}
                    </div>
                ))}

                {score === null ? (
                    <Button
                        onClick={checkAnswers}
                        variant="primary"
                        disabled={!allAnswered}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                        {allAnswered ? '提交答案' : `请回答所有问题 (${Object.keys(answers).length}/${questions.length})`}
                    </Button>
                ) : (
                    <div className="text-center animate-in zoom-in space-y-4">
                        <div className="text-6xl">{getAchievement().emoji}</div>
                        <h3 className={`text-2xl font-bold ${getAchievement().color}`}>
                            {getAchievement().text}
                        </h3>
                        <div className="text-xl text-slate-700">
                            你答对了 <span className="font-bold text-purple-600">{score}</span> / {questions.length} 题
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-purple-500 to-pink-600 h-full transition-all duration-1000"
                                style={{ width: `${(score / questions.length) * 100}%` }}
                            ></div>
                        </div>
                        {score < questions.length && (
                            <Button onClick={() => { setScore(null); setAnswers({}); setShowHints({}); }} variant="secondary" className="mt-4">
                                再试一次
                            </Button>
                        )}
                        {score === questions.length && (
                            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mt-4">
                                <div className="text-green-700 font-bold">🎉 完美通关！你已经掌握了流程控制的精髓！</div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const f2MasteryItems = [
    {
        label: '能先预测 if / elif / else 会走哪一个分支。',
        evidence: '给一个分数或年龄，能在运行前说出哪个条件最先变成 True。',
        retryHint: '回到“条件判断”，按从上到下的顺序逐句判断真/假。',
    },
    {
        label: '能解释 range(start, stop, step) 的终点为什么不包含。',
        evidence: '能写出 range(2, 10, 2) 会产生 2、4、6、8，不会到 10。',
        retryHint: '回到“循环”，把每次 i 的值写成一列，不要只看公式。',
    },
    {
        label: '能判断 for 和 while 该选哪一个。',
        evidence: '次数明确用 for，等某个条件发生再停用 while，并能说出停止条件。',
        retryHint: '回到“While 循环与中断”，先问自己“我知道要重复几次吗”。',
    },
    {
        label: '能找出一个死循环为什么停不下来。',
        evidence: '能指出循环条件里的变量有没有在循环体里被改变。',
        retryHint: '回到“逻辑大师挑战赛”，用表格追踪变量每一轮的变化。',
    },
];

export const SummarySlide = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SlideHeader accent="blue" icon={BookOpen} title="小结与下一步">
            这一课，你让程序学会了「判断」和「重复」。把下面三件事记牢，控制流程就稳了。
        </SlideHeader>

        <div className="grid gap-4 md:grid-cols-3">
            {[
                ['真与假', '布尔值和比较运算的结果只有 True / False，是所有判断的基础。'],
                ['会判断', 'if / elif / else 让程序按条件走不同分支。'],
                ['会重复', 'for 按次数重复，while 按条件重复——记得让条件能停下来。'],
            ].map(([title, desc]) => (
                <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-2 text-sm font-black text-blue-700">{title}</div>
                    <p className="text-sm font-semibold leading-7 text-slate-600">{desc}</p>
                </div>
            ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2 font-black text-slate-800">
                <CheckCircle size={16} className="text-blue-600" /> 学完自测
            </div>
            <ul className="grid gap-2 text-sm font-semibold text-slate-600 sm:grid-cols-3">
                <li className="flex gap-2"><span className="text-blue-500">✓</span> 能说出条件真/假各走哪段代码</li>
                <li className="flex gap-2"><span className="text-blue-500">✓</span> 能解释 range 的起点、终点和步长</li>
                <li className="flex gap-2"><span className="text-blue-500">✓</span> 能避免 while 条件不变导致死循环</li>
            </ul>
        </div>

        <MasteryCheck
            title="F2 控制流程离开前检查"
            description="如果能预测分支、手推 range、区分 for/while、定位死循环，就可以进入数据结构。"
            accent="blue"
            items={f2MasteryItems}
        />

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <div className="mb-1 font-black text-blue-800">下一课：F3 列表与字典</div>
            <p className="text-sm font-semibold leading-7 text-blue-900">
                控制流程让程序「动」起来；下一课用列表、字典和字符串「装」更多真实数据，再配合循环批量处理。
            </p>
        </div>
    </div>
);
