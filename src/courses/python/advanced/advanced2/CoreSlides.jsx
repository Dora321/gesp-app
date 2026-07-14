import { useState } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Code, XCircle } from 'lucide-react';

export const IntroSlide = () => {
    const [board, setBoard] = useState([
        [0, 2, 0, 0],
        [0, 0, 4, 0],
        [0, 0, 0, 0],
        [2, 0, 0, 0]
    ]);

    // --- 2048 核心逻辑 ---
    // 1. 合并单行 (向左)
    const mergeRow = (row) => {
        // 去掉 0
        let newRow = row.filter(val => val !== 0);
        // 合并相同
        for (let i = 0; i < newRow.length - 1; i++) {
            if (newRow[i] !== 0 && newRow[i] === newRow[i + 1]) {
                newRow[i] *= 2;
                newRow[i + 1] = 0;
            }
        }
        // 再次去掉 0 (因为合并产生了新的 0)
        newRow = newRow.filter(val => val !== 0);
        // 补齐 0
        while (newRow.length < 4) {
            newRow.push(0);
        }
        return newRow;
    };

    // 2. 矩阵操作工具
    const transpose = (grid) => grid[0].map((_, c) => grid.map(r => r[c]));
    const reverse = (grid) => grid.map(r => [...r].reverse());

    // 3. 移动总控
    const move = (dir) => {
        let newBoard = [...board];

        // 根据方向变换矩阵，统一转换为“向左移”的问题
        if (dir === 'right') newBoard = reverse(newBoard);
        if (dir === 'up') newBoard = transpose(newBoard);
        if (dir === 'down') newBoard = reverse(transpose(newBoard)); // Transpose -> Reverse (Rotate -90 effectively for columns mapping to rows reversed)

        // 执行合并 (对每一行)
        const mergedBoard = newBoard.map(row => mergeRow(row));

        // 还原矩阵方向
        let finalBoard = mergedBoard;
        if (dir === 'right') finalBoard = reverse(finalBoard);
        if (dir === 'up') finalBoard = transpose(finalBoard);
        if (dir === 'down') finalBoard = transpose(reverse(finalBoard)); // Reverse -> Transpose (Inverse of Down)

        // 检查是否有变化
        if (JSON.stringify(board) !== JSON.stringify(finalBoard)) {
            // 生成新数字
            const emptySpots = [];
            for (let r = 0; r < 4; r++) {
                for (let c = 0; c < 4; c++) {
                    if (finalBoard[r][c] === 0) emptySpots.push({ r, c });
                }
            }
            if (emptySpots.length > 0) {
                const spot = emptySpots[Math.floor(Math.random() * emptySpots.length)];
                finalBoard[spot.r][spot.c] = Math.random() > 0.9 ? 4 : 2;
            }
            setBoard(finalBoard);
        }
    };

    const getColor = (val) => {
        const colors = {
            0: 'bg-slate-200',
            2: 'bg-yellow-100 text-slate-700',
            4: 'bg-yellow-200 text-slate-700',
            8: 'bg-orange-300 text-white',
            16: 'bg-orange-400 text-white',
            32: 'bg-orange-500 text-white',
            64: 'bg-red-500 text-white',
        };
        return colors[val] || 'bg-yellow-500 text-white';
    };

    return (
        <div className="flex flex-col items-center justify-center h-full gap-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">玩过 2048 吗？</h2>
                <p className="text-slate-500">在这个简单的格子里，藏着很多 Python 列表的秘密哦！</p>
            </div>

            <div className="bg-slate-700 p-4 rounded-xl shadow-2xl relative">
                <div className="grid grid-cols-4 gap-3 w-64 h-64 sm:w-80 sm:h-80">
                    {board.map((row, r) =>
                        row.map((val, c) => (
                            <div
                                key={`${r}-${c}`}
                                className={`rounded-lg flex items-center justify-center text-2xl font-bold transition-all duration-200 transform hover:scale-105 ${getColor(val)}`}
                            >
                                {val > 0 ? val : ''}
                            </div>
                        ))
                    )}
                </div>

                {/* 控制按钮 */}
                <div className="absolute -bottom-20 left-0 right-0 flex justify-center gap-4">
                    <button onClick={() => move('left')} className="p-3 bg-slate-200 rounded-full hover:bg-slate-300"><ArrowLeft /></button>
                    <div className="flex flex-col gap-2">
                        <button onClick={() => move('up')} className="p-3 bg-slate-200 rounded-full hover:bg-slate-300"><ArrowUp /></button>
                        <button onClick={() => move('down')} className="p-3 bg-slate-200 rounded-full hover:bg-slate-300"><ArrowDown /></button>
                    </div>
                    <button onClick={() => move('right')} className="p-3 bg-slate-200 rounded-full hover:bg-slate-300"><ArrowRight /></button>
                </div>
            </div>

            <div className="mt-12 p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-800 text-sm max-w-md">
                <strong>思考：</strong> 它是如何存储这些数字的？<br />
                答案：二维列表 (2D List) —— 也就是“列表里的列表”。
            </div>
        </div>
    );
};

export const RoadmapSlide = () => {
    const [selectedTask, setSelectedTask] = useState(null);

    const phases = [
        {
            title: "第一阶段：构建世界",
            desc: "初始化棋盘与随机数",
            tasks: [
                {
                    name: "任务1：创建 4x4 棋盘",
                    code: "def init_grid():\n    grid = []\n    for i in range(4):\n        grid.append([0, 0, 0, 0])\n    return grid"
                },
                {
                    name: "任务2：随机生成数字",
                    code: "import random\n\ndef add_random(grid):\n    empty = []\n    # 1. 找到所有空位置\n    for r in range(4):\n        for c in range(4):\n            if grid[r][c] == 0:\n                empty.append((r, c))\n    \n    # 2. 如果有空位，随机选一个\n    if len(empty) > 0:\n        r, c = random.choice(empty)\n        # 10% 概率生成 4，90% 生成 2\n        if random.random() > 0.9:\n            grid[r][c] = 4\n        else:\n            grid[r][c] = 2"
                }
            ]
        },
        {
            title: "第二阶段：核心魔法",
            desc: "推导法则与合并逻辑",
            tasks: [
                {
                    name: "任务3：挤泡泡 (去零)",
                    code: "row = [2, 0, 2, 0]\nnew_row = []\n\n# 把不是 0 的数字拿出来\nfor num in row:\n    if num != 0:\n        new_row.append(num)\n\n# 结果: [2, 2]"
                },
                {
                    name: "任务4：两两合并",
                    code: "# 如果相邻两个数字一样，且不为0\nfor i in range(len(new_row) - 1):\n    if new_row[i] != 0 and new_row[i] == new_row[i+1]:\n        new_row[i] = new_row[i] * 2  # 变大两倍\n        new_row[i+1] = 0           # 后面的变成 0"
                },
                {
                    name: "任务5：补齐空位",
                    code: "def merge(row):\n    # ...去零 & 合并...\n    \n    # 再次去零 (因为合并可能产生新的0)\n    final_row = []\n    for num in new_row:\n        if num != 0:\n            final_row.append(num)\n            \n    # 补齐 0，直到长度为 4\n    while len(final_row) < 4:\n        final_row.append(0)\n        \n    return final_row"
                }
            ]
        },
        {
            title: "第三阶段：空间变换",
            desc: "矩阵转置与翻转",
            tasks: [
                {
                    name: "任务6：矩阵转置",
                    code: "def transpose(grid):\n    new_grid = []\n    for c in range(4):\n        new_row = []\n        for r in range(4):\n            # 行变列，列变行\n            new_row.append(grid[r][c])\n        new_grid.append(new_row)\n    return new_grid"
                },
                {
                    name: "任务7：矩阵翻转",
                    code: "def reverse(grid):\n    new_grid = []\n    for row in grid:\n        # [::-1] 是倒序切片的意思\n        new_row = row[::-1]\n        new_grid.append(new_row)\n    return new_grid"
                },
                {
                    name: "任务8：万能移动函数",
                    code: "def move(grid, direction):\n    if direction == 'Left':\n        # 对每一行执行 merge\n        new_grid = []\n        for row in grid:\n            new_grid.append(merge(row))\n        return new_grid\n    # ...其他方向先变换再 merge..."
                }
            ]
        },
        {
            title: "第四阶段：赋予生命",
            desc: "游戏主循环",
            tasks: [
                {
                    name: "任务9：交互与显示",
                    code: "while True:\n    cmd = input('请输入方向(WASD): ')\n    if cmd == 'A':\n        grid = move(grid, 'Left')\n    # ...\n    \n    # 打印棋盘\n    for row in grid:\n        print(row)"
                }
            ]
        }
    ];

    return (
        <div className="flex flex-col items-center h-full gap-6 relative">
            <h3 className="text-2xl font-bold text-slate-800">2048 开发任务书</h3>
            <p className="text-slate-500">点击任务查看参考代码 👇</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl overflow-y-auto custom-scrollbar p-2">
                {phases.map((phase, i) => (
                    <div key={i} className="bg-white p-5 rounded-xl border-l-4 border-indigo-500 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="font-bold text-lg text-slate-800">{phase.title}</h4>
                            <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded font-mono">Phase {i + 1}</span>
                        </div>
                        <p className="text-sm text-slate-400 mb-4">{phase.desc}</p>
                        <ul className="space-y-2">
                            {phase.tasks.map((task, j) => (
                                <li
                                    key={j}
                                    className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer hover:text-indigo-600 hover:bg-slate-50 p-1 rounded transition-colors group"
                                    onClick={() => setSelectedTask(task)}
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-indigo-400"></div>
                                    <span className="flex-1">{task.name}</span>
                                    <Code size={14} className="opacity-0 group-hover:opacity-100" />
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* 代码弹窗 */}
            {selectedTask && (
                <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-slate-200 overflow-hidden">
                        <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center text-white">
                            <h4 className="font-bold text-lg flex items-center gap-2">
                                <Code size={20} />
                                {selectedTask.name}
                            </h4>
                            <button
                                onClick={() => setSelectedTask(null)}
                                className="hover:bg-indigo-700 p-1 rounded-full transition-colors"
                            >
                                <XCircle size={24} />
                            </button>
                        </div>
                        <div className="p-6 bg-slate-50">
                            <pre className="bg-slate-800 text-slate-300 p-4 rounded-xl font-mono text-sm overflow-x-auto">
                                {selectedTask.code}
                            </pre>
                            <div className="mt-4 text-center">
                                <button
                                    onClick={() => setSelectedTask(null)}
                                    className="px-6 py-2 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 font-medium"
                                >
                                    关闭
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export const DataStructureSlide = () => {
    const [highlightRow, setHighlightRow] = useState(null);

    const gridData = [
        [0, 2, 0, 0],
        [0, 0, 4, 0],
        [2, 0, 2, 8],
        [0, 0, 0, 0]
    ];

    return (
        <div className="flex flex-col items-center justify-center h-full gap-8">
            <div className="text-center">
                <div className="text-sm font-bold text-indigo-500 mb-1">第一阶段：构建世界 (任务 1 & 2)</div>
                <h3 className="text-2xl font-bold text-slate-800">地图的秘密：二维列表</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-center w-full max-w-4xl">
                {/* 可视化 Grid */}
                <div className="bg-slate-800 p-4 rounded-xl shadow-lg">
                    <div className="grid grid-cols-4 gap-2">
                        {gridData.map((row, r) =>
                            row.map((val, c) => (
                                <div
                                    key={`${r}-${c}`}
                                    className={`w-14 h-14 rounded flex items-center justify-center font-bold text-lg transition-colors
                    ${val === 0 ? 'bg-slate-600 text-slate-500' : 'bg-yellow-200 text-slate-800'}
                    ${highlightRow === r ? 'ring-4 ring-blue-400 scale-105 z-10' : ''}
                  `}
                                >
                                    {val}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* 代码表示 */}
                <div className="bg-white p-6 rounded-xl border-2 border-slate-200 shadow-sm font-mono text-sm sm:text-base">
                    <div className="text-purple-600 font-bold mb-2"># Python 代码表示</div>
                    <div className="text-slate-700">
                        <span className="text-blue-600">grid</span> = [
                        {gridData.map((row, i) => (
                            <div
                                key={i}
                                className={`pl-4 cursor-pointer transition-colors p-1 rounded ${highlightRow === i ? 'bg-blue-100 font-bold' : 'hover:bg-slate-50'}`}
                                onMouseEnter={() => setHighlightRow(i)}
                                onMouseLeave={() => setHighlightRow(null)}
                            >
                                [{row.join(', ')}], <span className="text-slate-400">// 第 {i} 行 (Index {i})</span>
                            </div>
                        ))}
                        ]
                    </div>
                    <div className="mt-4 text-xs text-slate-500 bg-slate-100 p-2 rounded">
                        试着把鼠标移到代码行上，看看左边谁亮了？👆
                    </div>
                </div>
            </div>
        </div>
    );
};

export const MergeLogicSlide = () => {
    const [step, setStep] = useState(0);

    // 定义每一步的状态
    const stepsData = [
        {
            vals: [2, 2, 0, 4],
            desc: "1. 原始行数据",
            code: "row = [2, 2, 0, 4]",
            highlight: []
        },
        {
            vals: [2, 2, 4],
            desc: "2. 挤泡泡：把 0 挤出去",
            code: "new_row = [i for i in row if i != 0]",
            highlight: []
        },
        {
            vals: [2, 2, 4],
            desc: "3. 检查邻居：前两个一样吗？",
            code: "if new_row[0] == new_row[1]: # 2 == 2",
            highlight: [0, 1] // Indices to highlight
        },
        {
            vals: [4, 4],
            desc: "4. 合并！变身！",
            code: "new_row[0] *= 2 # 变成 4\ndel new_row[1]  # 删掉后一个",
            highlight: [0]
        },
        {
            vals: [4, 4],
            desc: "5. 继续检查：下一个邻居",
            code: "# 只有一个 4 了，没有邻居，结束检查",
            highlight: [1]
        },
        {
            vals: [4, 4, 0, 0],
            desc: "6. 补齐空位",
            code: "while len(new_row) < 4: new_row.append(0)",
            highlight: [2, 3]
        }
    ];

    const currentStepData = stepsData[step];

    return (
        <div className="flex flex-col items-center h-full gap-6">
            <div className="text-center">
                <div className="text-sm font-bold text-indigo-500 mb-1">第二阶段：核心魔法 (任务 3-5)</div>
                <h3 className="text-2xl font-bold text-slate-800">向左看齐：分步拆解</h3>
                <p className="text-slate-500">别急，我们要像慢动作回放一样看清楚发生了什么。</p>
            </div>

            {/* 演示区域 */}
            <div className="w-full max-w-2xl bg-indigo-50 rounded-2xl p-8 border border-indigo-100 flex flex-col items-center">

                {/* 步骤进度条 */}
                <div className="flex gap-1 mb-8 w-full max-w-md">
                    {stepsData.map((_, i) => (
                        <div
                            key={i}
                            className={`h-2 flex-1 rounded-full transition-colors ${i <= step ? 'bg-indigo-500' : 'bg-indigo-200'}`}
                        />
                    ))}
                </div>

                {/* 数字展示 */}
                <div className="flex gap-4 mb-8 h-20 items-center justify-center">
                    {currentStepData.vals.map((val, i) => (
                        <div key={i} className="relative">
                            <div className={`
                                w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold shadow-sm transition-all duration-300
                                ${val === 0 ? 'bg-white text-slate-300' : 'bg-yellow-400 text-white'}
                                ${currentStepData.highlight.includes(i) ? 'ring-4 ring-red-400 scale-110 z-10' : ''}
                            `}>
                                {val}
                            </div>
                            {/* 指针/标记 */}
                            {currentStepData.highlight.includes(i) && (
                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-red-500 font-bold text-xs animate-bounce">
                                    ↑ 关注
                                </div>
                            )}
                        </div>
                    ))}
                    {/* 占位符确保不抖动 */}
                    {Array.from({ length: 4 - currentStepData.vals.length }).map((_, i) => (
                        <div key={`empty-${i}`} className="w-16 h-16 border-2 border-dashed border-slate-200 rounded-lg"></div>
                    ))}
                </div>

                {/* 说明与控制 */}
                <div className="w-full text-center space-y-4">
                    <div className="text-xl font-bold text-indigo-800 h-8">{currentStepData.desc}</div>

                    <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm text-green-400 min-h-[80px] flex items-center justify-center text-left w-full">
                        <pre>{currentStepData.code}</pre>
                    </div>

                    <div className="flex justify-center gap-4 mt-4">
                        <button
                            onClick={() => setStep(Math.max(0, step - 1))}
                            disabled={step === 0}
                            className="px-6 py-2 rounded-full bg-white text-slate-600 border border-slate-300 hover:bg-slate-50 disabled:opacity-50"
                        >
                            上一步
                        </button>
                        <button
                            onClick={() => setStep(Math.min(stepsData.length - 1, step + 1))}
                            disabled={step === stepsData.length - 1}
                            className="px-6 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 shadow-lg shadow-indigo-200"
                        >
                            下一步
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
