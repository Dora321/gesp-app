import { useState } from 'react';
import { ArrowRight, RotateCw, RefreshCw, Box, Trophy, CheckCircle, XCircle } from 'lucide-react';

export const TransformSlide = () => {
    const [mode, setMode] = useState('normal'); // normal, transpose, reverse

    const grid = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16]
    ];

    const getTransposed = () => {
        return grid[0].map((_, colIndex) => grid.map(row => row[colIndex]));
    };

    const getReversed = () => {
        return grid.map(row => [...row].reverse());
    };

    const currentGrid = mode === 'transpose' ? getTransposed() : (mode === 'reverse' ? getReversed() : grid);

    return (
        <div className="flex flex-col items-center h-full gap-6">
            <div className="text-center max-w-2xl">
                <div className="text-sm font-bold text-indigo-500 mb-1">第三阶段：空间变换 (任务 6-8)</div>
                <h3 className="text-2xl font-bold text-slate-800">偷懒的艺术：矩阵变换</h3>
                <p className="text-slate-500 mt-2">
                    不想写“向上”、“向右”的代码？<br />
                    把棋盘 <strong>转一下 (Transpose)</strong> 或者 <strong>翻个面 (Reverse)</strong>，再用“向左”的代码就行啦！
                </p>
            </div>

            <div className="flex gap-8 items-center">
                <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-slate-200">
                    <div className="grid grid-cols-4 gap-1">
                        {currentGrid.map((row, r) =>
                            row.map((val, c) => (
                                <div key={`${r}-${c}`} className="w-10 h-10 bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600 rounded">
                                    {val}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => setMode('normal')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 transition-all ${mode === 'normal' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-slate-200'}`}
                    >
                        <RefreshCw size={18} /> 还原
                    </button>
                    <button
                        onClick={() => setMode('transpose')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 transition-all ${mode === 'transpose' ? 'bg-purple-50 border-purple-500 text-purple-700' : 'bg-white border-slate-200'}`}
                    >
                        <RotateCw size={18} /> 转置 (行列互换)
                    </button>
                    <button
                        onClick={() => setMode('reverse')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 transition-all ${mode === 'reverse' ? 'bg-orange-50 border-orange-500 text-orange-700' : 'bg-white border-slate-200'}`}
                    >
                        <RefreshCw size={18} className="scale-x-[-1]" /> 左右翻转
                    </button>
                </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg text-yellow-800 text-sm max-w-xl border border-yellow-200">
                <ul className="list-disc list-inside space-y-1">
                    <li><strong>想向右滑？</strong> 先左右翻转 &rarr; 向左滑 &rarr; 再左右翻转回来。</li>
                    <li><strong>想向上滑？</strong> 先转置 &rarr; 向左滑 &rarr; 再转置回来。</li>
                </ul>
            </div>
        </div>
    );
};

export const SummarySlide = () => {
    const [view, setView] = useState('logic'); // 'logic' or 'code'

    const fullCode = `# 2048 小学生代码版 (简单易懂)
import random
import os

# --- 1. 初始化 & 随机生成 ---
def init_grid():
    """创建一个 4x4 的全0棋盘"""
    grid = []
    for i in range(4):
        grid.append([0, 0, 0, 0])

    # 先生成两个数字
    add_random(grid)
    add_random(grid)
    return grid

def add_random(grid):
    """在空位子里随机放一个 2 或 4"""
    # 1. 找到所有空位 (是 0 的地方)
    empty_spots = []
    for r in range(4):
        for c in range(4):
            if grid[r][c] == 0:
                empty_spots.append((r, c))

    # 2. 从空位里随机选一个
    if len(empty_spots) > 0:
        r, c = random.choice(empty_spots)

        # 3. 决定放 2 还是 4 (90% 是 2)
        if random.random() > 0.9:
            grid[r][c] = 4
        else:
            grid[r][c] = 2

# --- 2. 核心魔法：合并一行 ---
def merge(row):
    """把一行数字向左合并"""
    # 步骤 1: 挤泡泡 (把 0 去掉)
    new_row = []
    for num in row:
        if num != 0:
            new_row.append(num)

    # 步骤 2: 相同合并
    for i in range(len(new_row) - 1):
        # 如果相邻两个一样，且不是0
        if new_row[i] == new_row[i+1] and new_row[i] != 0:
            new_row[i] = new_row[i] * 2  # 变成两倍
            new_row[i+1] = 0             # 后面的变成0

    # 步骤 3: 再次去零 & 补齐
    final_row = []
    for num in new_row:
        if num != 0:
            final_row.append(num)

    # 补 0 直到长度为 4
    while len(final_row) < 4:
        final_row.append(0)

    return final_row

# --- 3. 空间变换魔法 ---
def transpose(grid):
    """矩阵转置：横竖交换"""
    new_grid = []
    for c in range(4):
        new_row = []
        for r in range(4):
            new_row.append(grid[r][c])
        new_grid.append(new_row)
    return new_grid

def reverse(grid):
    """左右翻转"""
    new_grid = []
    for row in grid:
        new_grid.append(row[::-1]) # 倒序
    return new_grid

def move(grid, direction):
    """根据方向移动棋盘"""
    # 1. 先变换，把所有方向都变成“向左”
    if direction == 'Left':
        # 向左不用变
        pass
    elif direction == 'Right':
        # 向右 = 左右翻转 -> 向左
        grid = reverse(grid)
    elif direction == 'Up':
        # 向上 = 转置 -> 向左
        grid = transpose(grid)
    elif direction == 'Down':
        # 向下 = 转置 -> 左右翻转 -> 向左
        grid = transpose(grid)
        grid = reverse(grid)

    # 2. 执行合并 (对每一行做 merge)
    new_grid = []
    for row in grid:
        new_grid.append(merge(row))
    grid = new_grid

    # 3. 变回来 (怎么变的就怎么倒回去)
    if direction == 'Left':
        pass
    elif direction == 'Right':
        grid = reverse(grid)
    elif direction == 'Up':
        grid = transpose(grid)
    elif direction == 'Down':
        grid = reverse(grid)
        grid = transpose(grid)

    return grid

# --- 4. 游戏开始！ ---
def main():
    grid = init_grid()

    while True:
        # 清屏
        os.system('cls' if os.name == 'nt' else 'clear')

        print("-" * 25)
        print("   2048 小学生版")
        print("-" * 25)

        # 打印棋盘
        for row in grid:
            print(f"| {row[0]:4} {row[1]:4} {row[2]:4} {row[3]:4} |")
        print("-" * 25)

        # 问玩家怎么走
        cmd = input("请输入方向 (WASD) 或 Q 退出: ").upper()

        if cmd == 'Q':
            print("再见！")
            break

        old_grid = [row[:] for row in grid]

        if cmd == 'A': grid = move(grid, 'Left')
        elif cmd == 'D': grid = move(grid, 'Right')
        elif cmd == 'W': grid = move(grid, 'Up')
        elif cmd == 'S': grid = move(grid, 'Down')

        # 如果动了，就生个新数字
        if grid != old_grid:
            add_random(grid)

if __name__ == "__main__":
    main()`;

    return (
        <div className="flex flex-col h-full gap-6">
            <div className="text-center">
                <div className="text-sm font-bold text-indigo-500 mb-1">第四阶段：赋予生命 (任务 9)</div>
                <h3 className="text-2xl font-bold text-slate-800">完整逻辑蓝图</h3>
            </div>

            {/* Tab 切换 */}
            <div className="flex justify-center gap-4 bg-slate-100 p-1 rounded-xl mx-auto">
                <button
                    onClick={() => setView('logic')}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${view === 'logic' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-200'}`}
                >
                    逻辑图解
                </button>
                <button
                    onClick={() => setView('code')}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${view === 'code' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-200'}`}
                >
                    完整代码
                </button>
            </div>

            <div className="flex-1 bg-slate-900 rounded-xl p-6 overflow-y-auto custom-scrollbar border border-slate-700 shadow-2xl relative">
                {view === 'logic' ? (
                    <div className="font-mono text-sm text-slate-300 space-y-2 animate-in fade-in duration-300">
                        <p><span className="text-purple-400">def</span> <span className="text-blue-400">merge</span>(row):</p>
                        <p className="pl-4 text-slate-500"># 1. 挤泡泡 (Remove Zeros)</p>
                        <p className="pl-4">new_row = [i <span className="text-purple-400">for</span> i <span className="text-purple-400">in</span> row <span className="text-purple-400">if</span> i != 0]</p>
                        <p className="pl-4 text-slate-500"># 2. 合并 (Merge)</p>
                        <p className="pl-4"><span className="text-purple-400">for</span> i <span className="text-purple-400">in</span> range(len(new_row)-1):</p>
                        <p className="pl-8"><span className="text-purple-400">if</span> new_row[i] == new_row[i+1]:</p>
                        <p className="pl-12">new_row[i] *= 2</p>
                        <p className="pl-12">new_row[i+1] = 0</p>
                        <p className="pl-4 text-slate-500"># 3. 再次清理 & 补零</p>
                        <p className="pl-4">new_row = [i <span className="text-purple-400">for</span> i <span className="text-purple-400">in</span> new_row <span className="text-purple-400">if</span> i != 0]</p>
                        <p className="pl-4"><span className="text-purple-400">while</span> len(new_row) &lt; 4: new_row.append(0)</p>
                        <p className="pl-4"><span className="text-purple-400">return</span> new_row</p>
                    </div>
                ) : (
                    <div className="font-mono text-xs sm:text-sm text-slate-300 whitespace-pre animate-in fade-in duration-300">
                        {fullCode}
                    </div>
                )}
            </div>

            <div className="flex justify-center gap-4">
                <div className="flex items-center gap-2 text-slate-600">
                    <CheckCircle className="text-green-500" /> 学会了列表推导式
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                    <CheckCircle className="text-green-500" /> 学会了矩阵变换
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
            question: "在 Python 二维列表 grid 中，要获取第 2 行第 3 列的数据，应该用？",
            options: [
                "A. grid[2][3]",
                "B. grid[1][2]",
                "C. grid[3][2]"
            ],
            correct: 1,
            explanation: "注意索引从 0 开始哦！第 2 行的索引是 1，第 3 列的索引是 2。"
        },
        {
            id: 2,
            question: "在我们的 2048 算法中，[2, 2, 0, 4] 向左合并后会变成？",
            options: [
                "A. [4, 4, 0, 0]",
                "B. [2, 2, 4, 0]",
                "C. [4, 0, 4, 0]"
            ],
            correct: 0,
            explanation: "没错！两个 2 合并成 4，剩下的 4 移过来，最后补零。"
        },
        {
            id: 3,
            question: "“转置” (Transpose) 一个矩阵意味着什么？",
            options: [
                "A. 把矩阵顺时针旋转 90 度",
                "B. 把矩阵上下颠倒",
                "C. 行列互换 (行变列，列变行)"
            ],
            correct: 2,
            explanation: "Bingo! 转置就是沿着对角线翻转，行变成列。"
        },
        {
            id: 4,
            question: "Python 中用来简化列表创建的魔法语法是？",
            options: [
                "A. 列表推导式 (List Comprehension)",
                "B. 列表压缩 (List Compression)",
                "C. 列表魔法 (List Magic)"
            ],
            correct: 0,
            explanation: "就是 [i for i in list] 这种写法，既简洁又强大！"
        }
    ];

    const handleOptionClick = (index) => {
        if (showExplanation) return;
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
                <div className="bg-white rounded-2xl shadow-xl border-2 border-orange-100 p-10 w-full animate-in zoom-in duration-300">
                    <Trophy className="mx-auto text-yellow-400 mb-4" size={64} />
                    <h3 className="text-3xl font-bold text-slate-800 mb-2">挑战完成！</h3>
                    <p className="text-slate-500 mb-8">你的得分是</p>

                    <div className="text-6xl font-black text-orange-600 mb-8">
                        {score} <span className="text-2xl text-slate-400 font-normal">/ {questions.length}</span>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={resetQuiz}
                            className="px-8 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center gap-2"
                        >
                            <RefreshCw size={18} /> 再来一次
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
            <div className="bg-white rounded-2xl shadow-lg border-2 border-orange-100 overflow-hidden w-full transition-all duration-300">
                <div className="bg-orange-500 px-6 py-4 text-white flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Trophy className="text-yellow-300" size={24} />
                        <span className="font-bold text-lg">Python 猎人挑战</span>
                    </div>
                    <div className="bg-orange-600 px-3 py-1 rounded-full text-sm font-mono">
                        {currentQIndex + 1} / {questions.length}
                    </div>
                </div>

                <div className="p-8">
                    <p className="text-xl text-slate-800 font-bold mb-8 leading-relaxed">
                        {currentQ.question}
                    </p>

                    <div className="space-y-3">
                        {currentQ.options.map((option, index) => {
                            let stateStyle = "border-slate-100 hover:border-orange-300 hover:bg-orange-50";

                            if (showExplanation) {
                                if (index === currentQ.correct) {
                                    stateStyle = "bg-green-100 border-green-400 text-green-800";
                                } else if (index === selectedOption) {
                                    stateStyle = "bg-red-50 border-red-200 text-red-800";
                                } else {
                                    stateStyle = "opacity-50 border-slate-100";
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
                                    {isCorrect ? <CheckCircle className="shrink-0 mt-0.5" /> : <XCircle className="shrink-0 mt-0.5" />}
                                    <div>
                                        <div className="font-bold text-lg mb-1">{isCorrect ? '回答正确！' : '再接再厉！'}</div>
                                        <p>{currentQ.explanation}</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleNext}
                                className="w-full py-4 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 shadow-lg shadow-orange-200 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
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

export const PackagingSlide = () => {
    return (
        <div className="flex flex-col items-center h-full gap-6">
            <div className="text-center">
                <div className="text-sm font-bold text-indigo-500 mb-1">额外技能：分享你的游戏</div>
                <h3 className="text-2xl font-bold text-slate-800">将 Python 程序打包成 exe</h3>
                <p className="text-slate-500 mt-2">做好了游戏，怎么发给没装 Python 的朋友玩呢？打包成 exe 吧！</p>
            </div>

            <div className="w-full max-w-3xl space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-500">
                    <h4 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <Box className="text-indigo-500" size={24} />
                        方法一：使用 PyInstaller（推荐）
                    </h4>
                    <p className="text-slate-600 mb-4">这是行业标准工具，功能强大且支持大多数 Python 库。</p>

                    <div className="space-y-4">
                        <div>
                            <div className="font-bold text-slate-700 mb-1">1. 安装 PyInstaller</div>
                            <div className="bg-slate-800 text-green-400 p-3 rounded-lg font-mono text-sm">
                                pip install pyinstaller
                            </div>
                        </div>

                        <div>
                            <div className="font-bold text-slate-700 mb-1">2. 基本打包命令</div>
                            <p className="text-sm text-slate-500 mb-2">进入你的 Python 脚本所在的文件夹，运行：</p>
                            <div className="bg-slate-800 text-green-400 p-3 rounded-lg font-mono text-sm">
                                pyinstaller -F 你的文件名.py
                            </div>
                            <div className="mt-2 text-sm text-slate-600 bg-orange-50 p-2 rounded border border-orange-100">
                                <span className="font-bold text-orange-600">结果：</span>
                                生成的 .exe 文件会在自动创建的 <code>dist</code> 文件夹中。
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
