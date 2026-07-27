import { useState } from 'react';
import { RotateCcw, Trophy, ArrowRight, StopCircle, CheckCircle } from 'lucide-react';
import { Icon } from './Shared';
import { StorySlide, MatryoshkaSlide, CodeSlide, RocketSlide, StairsSlide } from './RecursionSlides';

export const RecursionSlide = () => {
    const [activeTab, setActiveTab] = useState('story');

    const tabs = [
        { id: 'story', label: '📜 听故事', icon: 'repeat' },
        { id: 'concept', label: '🪆 套娃', icon: 'layers' },
        { id: 'code', label: '⚠️ 死循环', icon: 'alert' },
        { id: 'rocket', label: '🚀 倒计时', icon: 'rocket' },
        { id: 'stairs', label: '🪜 爬楼梯', icon: 'stairs' }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'story': return <StorySlide />;
            case 'concept': return <MatryoshkaSlide />;
            case 'code': return <CodeSlide />;
            case 'rocket': return <RocketSlide />;
            case 'stairs': return <StairsSlide />;
            default: return <StorySlide />;
        }
    };

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="flex justify-center mb-2">
                <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 inline-flex">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all
                                ${activeTab === tab.id
                                    ? 'bg-indigo-100 text-indigo-700 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}
                            `}
                        >
                            <Icon name={tab.icon} size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 min-h-0 overflow-hidden">
                <div key={activeTab} className="h-full animate-in fade-in zoom-in duration-300">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export const QuizSlide = () => {
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const questions = [
        {
            id: 1,
            question: "如果不知道密码，把 000 到 999 所有的组合都试一遍，这种方法叫什么？",
            options: [
                "A. 贪心算法 (Greedy)",
                "B. 枚举算法 / 暴力破解 (Enumeration)",
                "C. 递归算法 (Recursion)"
            ],
            correct: 1,
            explanation: "正确！枚举就是如果不确定答案，就列举出所有可能的候选者，逐一验证。"
        },
        {
            id: 2,
            question: "玩“凑硬币”游戏时，为了硬币数量最少，每次都尽量拿面值最大的，这是什么思维？",
            options: [
                "A. 贪心思维 (Greedy)",
                "B. 犹豫不决",
                "C. 回溯思维"
            ],
            correct: 0,
            explanation: "宾果！贪心算法的核心就是：只顾眼前的最佳选择（局部最优）。"
        },
        {
            id: 3,
            question: "关于“递归”的描述，哪一项是错误的？",
            options: [
                "A. 递归函数必须要有“出口”",
                "B. 递归就是函数自己调用自己",
                "C. 递归永远比循环快"
            ],
            correct: 2,
            explanation: "注意坑！递归虽然代码简洁，但因为要不断压栈，往往比循环更慢，甚至会导致栈溢出。"
        },
        {
            id: 4,
            question: "在编程中，遇到问题应该优先使用哪种思维？",
            options: [
                "A. 必须用递归，因为它高级",
                "B. 先分析问题特点，适合什么用什么",
                "C. 永远用暴力枚举"
            ],
            correct: 1,
            explanation: "没有最好的算法，只有最合适的算法！枚举适合小数据，贪心适合特定策略，递归适合分治结构。"
        }
    ];

    const handleOptionClick = (index) => {
        if (showExplanation) return; // Prevent changing answer after selection
        setSelectedOption(index);
        setShowExplanation(true);
        if (index === questions[currentQIndex].correct) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (currentQIndex < questions.length - 1) {
            setCurrentQIndex(currentQIndex + 1);
            setSelectedOption(null);
            setShowExplanation(false);
        } else {
            setFinished(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQIndex(0);
        setSelectedOption(null);
        setShowExplanation(false);
        setScore(0);
        setFinished(false);
    };

    if (finished) {
        return (
            <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto w-full text-center">
                <div className="bg-white rounded-2xl shadow-xl border-2 border-indigo-100 p-10 w-full animate-in zoom-in duration-300">
                    <Trophy className="mx-auto text-yellow-400 mb-4" size={64} />
                    <h3 className="text-3xl font-bold text-slate-800 mb-2">挑战完成！</h3>
                    <p className="text-slate-500 mb-8">你的得分是</p>

                    <div className="text-6xl font-black text-indigo-600 mb-8">
                        {score} <span className="text-2xl text-slate-400 font-normal">/ {questions.length}</span>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={resetQuiz}
                            className="px-8 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center gap-2"
                        >
                            <RotateCcw size={18} /> 再来一次
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const currentQ = questions[currentQIndex];
    const isCorrect = selectedOption === currentQ.correct;

    return (
        <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto w-full">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-indigo-100 overflow-hidden w-full transition-all duration-300">
                <div className="bg-indigo-600 px-6 py-4 text-white flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Trophy className="text-yellow-300" size={24} />
                        <span className="font-bold text-lg">递归侦探挑战</span>
                    </div>
                    <div className="bg-indigo-700/50 px-3 py-1 rounded-full text-sm font-mono">
                        {currentQIndex + 1} / {questions.length}
                    </div>
                </div>

                <div className="p-8">
                    <p className="text-xl text-slate-800 font-bold mb-8 leading-relaxed">
                        {currentQ.question}
                    </p>

                    <div className="space-y-3">
                        {currentQ.options.map((option, index) => {
                            let stateStyle = "border-slate-100 hover:border-indigo-300 hover:bg-indigo-50";

                            if (showExplanation) {
                                if (index === currentQ.correct) {
                                    stateStyle = "bg-green-100 border-green-400 text-green-800"; // Correct answer always highlighted
                                } else if (index === selectedOption) {
                                    stateStyle = "bg-red-50 border-red-200 text-red-800"; // Wrong selection
                                } else {
                                    stateStyle = "opacity-50 border-slate-100"; // Other options faded
                                }
                            }

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleOptionClick(index)}
                                    disabled={showExplanation}
                                    className={`w-full p-4 rounded-xl border-2 text-left transition-all font-medium ${stateStyle}`}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </div>

                    {showExplanation && (
                        <div className="mt-8 animate-in slide-in-from-bottom-2 fade-in duration-300">
                            <div className={`p-4 rounded-xl mb-6 ${isCorrect ? 'bg-green-50 text-green-800 border-l-4 border-green-500' : 'bg-red-50 text-red-800 border-l-4 border-red-500'}`}>
                                <div className="flex items-start gap-3">
                                    {isCorrect ? <CheckCircle className="shrink-0 mt-0.5" /> : <StopCircle className="shrink-0 mt-0.5" />}
                                    <div>
                                        <div className="font-bold text-lg mb-1">{isCorrect ? '回答正确！' : '再接再厉！'}</div>
                                        <p>{currentQ.explanation}</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleNext}
                                className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                            >
                                {currentQIndex < questions.length - 1 ? '下一题' : '查看结果'} <ArrowRight size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
