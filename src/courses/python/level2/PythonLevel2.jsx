import React, { useState, useEffect, useCallback } from 'react';
import {
    Grid, ArrowUp, ArrowDown, ArrowLeft, ArrowRight,
    RotateCw, RefreshCw, Play, Code, Box,
    ChevronDown, Layers, Hash, HelpCircle, Trophy,
    CheckCircle, XCircle, MousePointer
} from 'lucide-react';

// --- 辅助组件 ---
const Icon = ({ name, size = 20, className = "" }) => {
    const icons = {
        "grid": <Grid size={size} className={className} />,
        "arrow-up": <ArrowUp size={size} className={className} />,
        "rotate": <RotateCw size={size} className={className} />,
        "play": <Play size={size} className={className} />,
        "code": <Code size={size} className={className} />,
        "box": <Box size={size} className={className} />,
        "hash": <Hash size={size} className={className} />,
        "trophy": <Trophy size={size} className={className} />,
        "help": <HelpCircle size={size} className={className} />
    };
    return icons[name] || null;
};

// --- Slide 组件 ---

// 1. 游戏体验导入
const IntroSlide = () => {
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
        let moved = false;

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

// 1.5 任务总览
const RoadmapSlide = () => {
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

// 2. 数据结构：二维列表
const DataStructureSlide = () => {
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

// 3. 核心算法：向左合并
const MergeLogicSlide = () => {
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

// 4. 矩阵变换：转置与反转
const TransformSlide = () => {
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

// 5. 总结与代码全览
const SummarySlide = () => {
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

// 6. 课间小测验
const QuizSlide = () => {
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

// --- 主布局 ---

const sections = [
    { id: 1, title: '游戏初体验', icon: 'play', component: IntroSlide },
    { id: 1.5, title: '开发任务书', icon: 'hash', component: RoadmapSlide }, // New Slide
    { id: 2, title: '构建世界', icon: 'grid', component: DataStructureSlide },
    { id: 3, title: '核心魔法', icon: 'arrow-up', component: MergeLogicSlide }, // Arrow left icon fallback to up if not precise match
    { id: 4, title: '空间变换', icon: 'rotate', component: TransformSlide },
    { id: 5, title: '代码全览', icon: 'code', component: SummarySlide },
    { id: 6, title: '课间小测验', icon: 'trophy', component: QuizSlide }, // Added QuizSlide
];

const Lesson4 = () => {
    const [activeSection, setActiveSection] = useState(1);
    const ActiveComponent = sections.find(s => s.id === activeSection)?.component || (() => <div>Coming Soon</div>);

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-800">
            {/* 侧边栏 */}
            <div className="w-64 bg-white border-r border-slate-200 flex flex-col h-full shadow-lg z-20 flex-shrink-0">
                <div className="p-5 border-b border-slate-100 bg-gradient-to-br from-orange-50 to-white">
                    <h1 className="text-lg font-bold flex items-center gap-2 text-orange-700">
                        <span className="bg-orange-500 text-white p-1 rounded">Python</span>
                        <span>实战课堂</span>
                    </h1>
                    <p className="text-xs text-orange-400 mt-2 font-medium pl-1">第 4 课：2048 大作战 🎮</p>
                </div>

                <div className="flex-1 overflow-y-auto w-full py-2 custom-scrollbar">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full text-left px-5 py-3 transition-all duration-200 flex items-center gap-3 border-l-4 group relative
                ${activeSection === section.id
                                    ? 'bg-orange-50 border-orange-500 text-orange-700 font-bold shadow-sm'
                                    : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700 hover:border-slate-300'
                                }`}
                        >
                            <div className={`
                p-1.5 rounded-lg transition-colors flex-shrink-0
                ${activeSection === section.id ? 'bg-white text-orange-500 shadow-sm' : 'bg-slate-100 text-slate-400 group-hover:bg-white group-hover:text-slate-600'}
              `}>
                                <Icon name={section.icon} size={16} />
                            </div>
                            <span className="truncate text-sm font-medium">{section.title}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* 主内容区 */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-50">
                {/* Header */}
                <header className="bg-white border-b border-slate-200 shadow-sm h-16 flex items-center justify-between px-6 z-10 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                            <Icon name={sections.find(s => s.id === activeSection)?.icon} size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-slate-800 truncate">
                            {sections.find(s => s.id === activeSection)?.title}
                        </h2>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setActiveSection(Math.max(1, activeSection - 1))}
                            disabled={activeSection === 1}
                            className="px-4 py-2 text-sm rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-1"
                        >
                            <ChevronDown className="rotate-90" size={16} /> 上一步
                        </button>
                        <button
                            onClick={() => setActiveSection(Math.min(sections.length, activeSection + 1))}
                            disabled={activeSection === sections.length}
                            className="px-4 py-2 text-sm rounded-lg bg-orange-600 text-white hover:bg-orange-700 shadow-md shadow-orange-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5 font-medium flex items-center gap-1"
                        >
                            下一步 <ArrowRight size={16} />
                        </button>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
                    <div className="max-w-5xl mx-auto h-full flex flex-col">
                        <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full">
                            <ActiveComponent />
                        </div>
                    </div>
                </main>
            </div>

            <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
      `}</style>
        </div>
    );
};

export default Lesson4;