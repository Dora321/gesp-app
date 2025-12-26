import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Calculator,
    ShoppingBag,
    Coins,
    Calendar,
    CheckCircle2,
    XCircle,
    ArrowRight,
    HelpCircle,
    Play,
    RotateCcw,
    Terminal,
    BookOpen,
    Store,
    Pencil,
    Ruler,
    Notebook,
    Bot,

    AlertTriangle,
    Timer,
    Menu,
    X
} from 'lucide-react';

// --- 图标映射组件 ---
const Icon = ({ name, size = 24, color = "currentColor", className = "" }) => {
    const icons = {
        "calc": <Calculator size={size} color={color} className={className} />,
        "bag": <ShoppingBag size={size} color={color} className={className} />,
        "coins": <Coins size={size} color={color} className={className} />,
        "calendar": <Calendar size={size} color={color} className={className} />,
        "check": <CheckCircle2 size={size} color={color} className={className} />,
        "x": <XCircle size={size} color={color} className={className} />,
        "arrow": <ArrowRight size={size} color={color} className={className} />,
        "help": <HelpCircle size={size} color={color} className={className} />,
        "play": <Play size={size} color={color} className={className} />,
        "reset": <RotateCcw size={size} color={color} className={className} />,
        "terminal": <Terminal size={size} color={color} className={className} />,
        "book": <BookOpen size={size} color={color} className={className} />,
        "store": <Store size={size} color={color} className={className} />,
        "pencil": <Pencil size={size} color={color} className={className} />,
        "ruler": <Ruler size={size} color={color} className={className} />,
        "notebook": <Notebook size={size} color={color} className={className} />,
        "store": <Store size={size} color={color} className={className} />,
        "bag": <ShoppingBag size={size} color={color} className={className} />,
        "bot": <Bot size={size} color={color} className={className} />,

        "alert": <AlertTriangle size={size} color={color} className={className} />,
        "timer": <Timer size={size} color={color} className={className} />
    };
    return icons[name] || null;
};

// --- 章节数据 ---
const sections = [
    { id: 1, title: "课程导入：逻辑便利店", icon: "store" },
    { id: 2, title: "必杀技：模拟三部曲", icon: "book" },
    { id: 3, title: "模拟实验室：机器人大冒险", icon: "bot" },
    { id: 4, title: "避坑指南：模拟题雷区", icon: "alert" },
    { id: 5, title: "真题实战 1：买文具", icon: "bag" },
    { id: 6, title: "真题实战 2：小杨的考试", icon: "calendar" },
    { id: 7, title: "总结与作业", icon: "check" }
];

// --- 互动组件 1：逻辑便利店收银台 ---
const ConvenienceStore = () => {
    const [lollipops, setLollipops] = useState(5);
    const [spicyStrips, setSpicyStrips] = useState(3);
    const [money, setMoney] = useState(50);

    const priceLollipop = 2;
    const priceSpicyStrip = 5;

    const totalCost = lollipops * priceLollipop + spicyStrips * priceSpicyStrip;
    const isEnough = money >= totalCost;
    const change = money - totalCost;
    const shortage = totalCost - money;

    return (
        <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200 my-4 shadow-sm">
            <h3 className="font-bold text-lg text-orange-700 mb-4 flex items-center gap-2">
                <Store className="text-orange-600" /> 逻辑便利店收银台
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="font-bold text-gray-700 mb-2 border-b pb-1">🛒 顾客清单 (输入)</h4>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm">🍭 棒棒糖 ($2):</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="range" min="0" max="20" value={lollipops} onChange={(e) => setLollipops(parseInt(e.target.value))}
                                    className="accent-orange-500 w-24"
                                />
                                <span className="font-mono font-bold w-8 text-center">{lollipops}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm">🌶️ 辣条 ($5):</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="range" min="0" max="20" value={spicyStrips} onChange={(e) => setSpicyStrips(parseInt(e.target.value))}
                                    className="accent-red-500 w-24"
                                />
                                <span className="font-mono font-bold w-8 text-center">{spicyStrips}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t mt-2">
                            <label className="text-sm font-bold text-green-700">💵 顾客付款:</label>
                            <input
                                type="number" value={money} onChange={(e) => setMoney(parseInt(e.target.value) || 0)}
                                className="border rounded px-2 py-1 w-20 text-center font-bold text-green-700"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-slate-800 text-white p-4 rounded-lg font-mono text-sm flex flex-col justify-center">
                    <div className="text-gray-400 mb-2">// 你的大脑运算过程</div>
                    <div><span className="text-purple-400">int</span> total = {lollipops} * 2 + {spicyStrips} * 5; <span className="text-gray-500">// = {totalCost}</span></div>
                    <div className="mt-2"><span className="text-purple-400">if</span> (money &gt;= total) &#123;</div>
                    <div className="pl-4 text-green-400">// 钱够了</div>
                    <div className="pl-4">cout &lt;&lt; "找零: " &lt;&lt; money - total;</div>
                    <div>&#125; <span className="text-purple-400">else</span> &#123;</div>
                    <div className="pl-4 text-red-400">// 钱不够</div>
                    <div className="pl-4">cout &lt;&lt; "还差: " &lt;&lt; total - money;</div>
                    <div>&#125;</div>
                </div>
            </div>

            <div className={`mt-4 p-4 rounded-xl text-center font-bold text-xl transition-all ${isEnough ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'}`}>
                {isEnough
                    ? `✅ 交易成功！找零 ${change} 元`
                    : `🚫 交易失败！还差 ${shortage} 元`}
            </div>
        </div>
    );
};

// --- 互动组件 2：文具店计算器 ---
const StationeryShop = () => {
    const [x, setX] = useState(1); // 签字笔
    const [y, setY] = useState(1); // 记事本
    const [z, setZ] = useState(1); // 直尺
    const [q, setQ] = useState(20); // 钱

    const total = x * 2 + y * 5 + z * 3;
    const isEnough = q >= total;

    return (
        <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200 my-4">
            <h3 className="font-bold text-lg text-blue-700 mb-4 flex items-center gap-2">
                <ShoppingBag className="text-blue-600" /> 真题实战：买文具
            </h3>
            <div className="bg-gray-100 text-xs text-gray-500 mb-4 px-2 py-1 rounded inline-block font-mono">2023年9月 GESP 一级 编程题第1题</div>

            <div className="flex flex-wrap gap-4 mb-6">
                <div className="bg-white p-3 rounded shadow-sm flex-1 min-w-[120px] border border-blue-100">
                    <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Pencil size={12} /> 签字笔 ($2)</div>
                    <input type="number" value={x} onChange={e => setX(Math.max(0, parseInt(e.target.value) || 0))} className="w-full font-bold text-center border-b focus:outline-none" />
                </div>
                <div className="bg-white p-3 rounded shadow-sm flex-1 min-w-[120px] border border-blue-100">
                    <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Notebook size={12} /> 记事本 ($5)</div>
                    <input type="number" value={y} onChange={e => setY(Math.max(0, parseInt(e.target.value) || 0))} className="w-full font-bold text-center border-b focus:outline-none" />
                </div>
                <div className="bg-white p-3 rounded shadow-sm flex-1 min-w-[120px] border border-blue-100">
                    <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Ruler size={12} /> 直尺 ($3)</div>
                    <input type="number" value={z} onChange={e => setZ(Math.max(0, parseInt(e.target.value) || 0))} className="w-full font-bold text-center border-b focus:outline-none" />
                </div>
                <div className="bg-green-50 p-3 rounded shadow-sm flex-1 min-w-[120px] border border-green-200">
                    <div className="text-xs text-green-700 mb-1 flex items-center gap-1"><Coins size={12} /> 钱包 ($)</div>
                    <input type="number" value={q} onChange={e => setQ(Math.max(0, parseInt(e.target.value) || 0))} className="w-full font-bold text-center border-b border-green-300 bg-transparent text-green-800 focus:outline-none" />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="bg-slate-900 text-gray-300 p-4 rounded-lg font-mono text-sm flex-1 w-full">
                    <div><span className="text-purple-400">int</span> total = x*2 + y*5 + z*3; <span className="text-gray-500">// {total}</span></div>
                    <div><span className="text-purple-400">if</span> (q &gt;= total) &#123;</div>
                    <div className={`pl-4 ${isEnough ? 'text-green-400 font-bold' : 'opacity-50'}`}>
                        cout &lt;&lt; "Yes" &lt;&lt; endl;<br />
                        cout &lt;&lt; q - total;
                    </div>
                    <div>&#125; <span className="text-purple-400">else</span> &#123;</div>
                    <div className={`pl-4 ${!isEnough ? 'text-red-400 font-bold' : 'opacity-50'}`}>
                        cout &lt;&lt; "No" &lt;&lt; endl;<br />
                        cout &lt;&lt; total - q; <span className="text-yellow-500 text-xs">// 注意是大减小！</span>
                    </div>
                    <div>&#125;</div>
                </div>

                <div className="flex-1 w-full text-center">
                    <div className="text-sm text-gray-500 mb-2">程序输出</div>
                    <div className={`p-4 rounded-lg font-mono text-xl font-bold border-2 ${isEnough ? 'bg-white border-green-500 text-green-600' : 'bg-white border-red-500 text-red-600'}`}>
                        {isEnough ? (
                            <>
                                <div>Yes</div>
                                <div>{q - total}</div>
                            </>
                        ) : (
                            <>
                                <div>No</div>
                                <div>{total - q}</div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 互动组件 3：星期推算器 ---
const WeekCalculator = () => {
    const [startDay, setStartDay] = useState(1); // 1-7
    const [daysPassed, setDaysPassed] = useState(6);

    // (x - 1 + n) % 7 + 1 formula
    // startDay is 1-based, we convert to 0-based for modulo, then back
    const resultDay = (startDay - 1 + daysPassed) % 7 + 1;

    const weekDays = ["日", "一", "二", "三", "四", "五", "六"];
    // Map result 1-7 to array index (1->1... 7->0) for display purposes if we used standard JS date, 
    // but problem says 7 is Sunday.
    // Display string:
    const getDayName = (d) => d === 7 ? "日" : numToChinese(d);

    function numToChinese(n) {
        const map = ["", "一", "二", "三", "四", "五", "六", "日"];
        return map[n];
    }

    return (
        <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200 my-4">
            <h3 className="font-bold text-lg text-purple-700 mb-4 flex items-center gap-2">
                <Calendar className="text-purple-600" /> 真题实战：小杨的考试
            </h3>
            <div className="bg-gray-100 text-xs text-gray-500 mb-4 px-2 py-1 rounded inline-block font-mono">2023年12月 GESP 一级 编程题第1题</div>

            <div className="flex flex-wrap gap-6 mb-8 justify-center">
                <div className="flex flex-col items-center">
                    <label className="text-sm font-bold text-gray-600 mb-1">今天是星期 (x)</label>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5, 6, 7].map(d => (
                            <button
                                key={d}
                                onClick={() => setStartDay(d)}
                                className={`w-8 h-8 rounded-full font-bold transition-all ${startDay === d ? 'bg-purple-600 text-white scale-110 shadow-lg' : 'bg-white text-gray-400 border hover:bg-purple-50'}`}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <label className="text-sm font-bold text-gray-600 mb-1">过了多少天 (n)</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="number" value={daysPassed} onChange={(e) => setDaysPassed(Math.max(0, parseInt(e.target.value) || 0))}
                            className="w-20 text-center font-bold text-xl border-b-2 border-purple-300 bg-transparent focus:outline-none"
                        />
                        <span className="text-purple-400 font-bold">天</span>
                    </div>
                </div>
            </div>

            <div className="relative h-24 bg-white rounded-xl border border-purple-100 overflow-hidden flex items-center justify-center mb-6 shadow-inner">
                {/* Visualizing the cycle */}
                <div className="flex gap-4 items-center">
                    <div className="text-center opacity-50">
                        <div className="text-xs text-gray-500">Start</div>
                        <div className="font-bold text-2xl">星期{getDayName(startDay)}</div>
                    </div>
                    <ArrowRight className="text-purple-300" />
                    <div className="text-center">
                        <div className="text-xs text-purple-600 font-bold animate-pulse">Exam Day</div>
                        <div className="font-bold text-3xl text-purple-700">星期{getDayName(resultDay)}</div>
                        <div className="text-xs text-gray-400 font-mono">({resultDay})</div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800 text-white p-4 rounded-lg font-mono text-sm">
                <div className="text-gray-400 mb-2">// 核心公式推导</div>
                <div>
                    <span className="text-yellow-400">1. 平移：</span> (x - 1) <span className="text-gray-500">// 把1-7变成0-6，方便取模</span>
                </div>
                <div>
                    <span className="text-yellow-400">2. 加天数：</span> (x - 1 + n)
                </div>
                <div>
                    <span className="text-yellow-400">3. 转圈圈：</span> (x - 1 + n) % 7
                </div>
                <div>
                    <span className="text-yellow-400">4. 还原：</span> ans = <span className="text-green-400">((x - 1 + n) % 7) + 1</span>;
                </div>
                <div className="mt-2 border-t border-gray-700 pt-2 text-blue-300">
                    Calculation: ({startDay} - 1 + {daysPassed}) % 7 + 1 = {resultDay}
                </div>
            </div>
        </div>
    );
};

// --- 互动组件 4：模拟实验室 (机器人大冒险) ---
const RobotSimulator = () => {
    // 5x5 网格，起始 (0,0) 左下角
    const [robotPos, setRobotPos] = useState({ x: 0, y: 0 });
    const [commands, setCommands] = useState("");
    const [history, setHistory] = useState([]); // 记录每一步的位置
    const [errorMsg, setErrorMsg] = useState(null);

    const gridSize = 5;

    const runSimulation = () => {
        let x = 0;
        let y = 0;
        let path = [{ x: 0, y: 0 }];
        let error = null;

        for (let char of commands.toUpperCase()) {
            if (char === 'U') y++;
            else if (char === 'D') y--;
            else if (char === 'R') x++;
            else if (char === 'L') x--;
            else continue; // 忽略非法字符

            // 边界检查
            if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) {
                error = `撞墙了！在 (${x},${y}) 处走出了地图。`;
                break;
            }
            path.push({ x, y });
        }

        setRobotPos({ x: error ? path[path.length - 2].x : x, y: error ? path[path.length - 2].y : y });
        setHistory(path);
        setErrorMsg(error);
    };

    const reset = () => {
        setRobotPos({ x: 0, y: 0 });
        setCommands("");
        setHistory([]);
        setErrorMsg(null);
    };

    return (
        <div className="bg-white p-6 rounded-xl border-2 border-slate-100 my-6 shadow-sm">
            <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                <Bot className="text-blue-500" /> 模拟实验室：机器人大冒险
            </h3>

            <div className="flex flex-col md:flex-row gap-8">
                {/* 地图区域 */}
                <div className="bg-gray-50 border-2 border-gray-200 p-2 rounded-lg relative w-64 h-64 grid grid-rows-5 grid-cols-5 gap-1">
                    {/* 网格生成 */}
                    {Array.from({ length: gridSize * gridSize }).map((_, i) => {
                        // 计算网格坐标 (col, row)
                        // grid 0 is top-left (0, 4) in cartesian? No, CSS Grid rows go 1..5 top-down
                        // Let's map visual row 0 -> y=4, row 4 -> y=0
                        const visualRow = Math.floor(i / gridSize);
                        const visualCol = i % gridSize;
                        const cartX = visualCol;
                        const cartY = gridSize - 1 - visualRow;

                        const isRobotHere = robotPos.x === cartX && robotPos.y === cartY;
                        const isPath = history.some(p => p.x === cartX && p.y === cartY);
                        const isStart = cartX === 0 && cartY === 0;

                        return (
                            <div key={i} className={`rounded flex items-center justify-center text-xs relative
                                ${isStart ? 'bg-green-100' : 'bg-white'} 
                                ${isPath && !isRobotHere ? 'bg-blue-50' : ''}
                                border border-gray-100`
                            }>
                                {isStart && <span className="absolute text-gray-300 transform scale-50">START</span>}
                                {isRobotHere && <Bot className={`text-blue-600 ${errorMsg ? 'animate-bounce text-red-500' : ''}`} size={24} />}
                                <span className="absolute bottom-0 right-0 text-[8px] text-gray-300">({cartX},{cartY})</span>
                            </div>
                        );
                    })}
                </div>

                {/* 控制区域 */}
                <div className="flex-1 space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">输入指令 (U上 D下 L左 R右)</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={commands}
                                onChange={(e) => setCommands(e.target.value.toUpperCase())}
                                placeholder="例如: UURD"
                                className="flex-1 p-2 border-2 border-gray-300 rounded font-mono uppercase tracking-widest focus:border-blue-500 focus:outline-none"
                            />
                            <button onClick={runSimulation} className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700">执行</button>
                            <button onClick={reset} className="bg-gray-200 text-gray-600 px-4 py-2 rounded font-bold hover:bg-gray-300"><RotateCcw size={18} /></button>
                        </div>
                    </div>

                    <div className="bg-slate-800 text-green-400 p-4 rounded-lg font-mono text-sm max-h-40 overflow-y-auto">
                        <div>&gt; 机器人数值状态:</div>
                        <div>x = {robotPos.x};</div>
                        <div>y = {robotPos.y};</div>
                        {errorMsg && <div className="text-red-400 mt-2">&gt; ERROR: {errorMsg}</div>}
                    </div>

                    <div className="text-sm text-gray-500">
                        <p>💡 提示：这就是“模拟”的核心——用变量 x, y 记录状态，根据输入修改变量。</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 互动组件 5：避坑指南 (模拟题雷区) ---
const SimPitfalls = () => {
    const [activeTab, setActiveTab] = useState(0);

    const traps = [
        {
            title: "陷阱1：变量忘记初始化",
            badCode: "int sum;\nfor(int i=0; i<n; i++) {\n  sum += i; // sum 是多少？\n}",
            goodCode: "int sum = 0; // 必须清零！\nfor(int i=0; i<n; i++) {\n  sum += i;\n}",
            desc: "在C++中，如果直接声明 `int sum;`，它的值可能是任意的“垃圾值”。模拟题中通常需要累加器，千万别忘了初始值！"
        },
        {
            title: "陷阱2：边界溢出",
            badCode: "int map[10][10];\n// 访问 map[10][5]",
            goodCode: "// 数组下标从0开始\n// map[10] 最大下标是 9\nif (x >= 0 && x < 10) ...",
            desc: "模拟机器人移动时，一定要先判断下一步是否在地图内，再进行移动。否则程序会直接崩溃 (Runtime Error)。"
        },
        {
            title: "陷阱3：多测清空",
            badCode: "// 多组数据测试\nwhile (cin >> n) {\n  solve(); // 上一次留下的痕迹还在吗？\n}",
            goodCode: "while (cin >> n) {\n  memset(a, 0, sizeof(a));\n  solve();\n}",
            desc: "如果是多组数据输入，记得在每一轮开始前把地图、计数器等“清空”，否则上一次的结果会干扰这一次的模拟。"
        }
    ];

    const current = traps[activeTab];

    return (
        <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200 my-6">
            <h3 className="font-bold text-lg text-orange-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="text-orange-600" /> 避坑指南：模拟题雷区
            </h3>

            <div className="flex gap-2 mb-4">
                {traps.map((t, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveTab(i)}
                        className={`px-3 py-1 rounded-full text-sm font-bold transition ${activeTab === i ? 'bg-orange-500 text-white' : 'bg-orange-200 text-orange-800 hover:bg-orange-300'}`}
                    >
                        {t.title.split('：')[0]}
                    </button>
                ))}
            </div>

            <div className="bg-white p-5 rounded-lg border border-orange-100 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-3">{current.title}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-red-50 p-3 rounded border border-red-100">
                        <div className="text-red-600 font-bold text-xs mb-1">❌ 错误写法</div>
                        <pre className="text-xs font-mono text-gray-700 whitespace-pre-wrap">{current.badCode}</pre>
                    </div>
                    <div className="bg-green-50 p-3 rounded border border-green-100">
                        <div className="text-green-600 font-bold text-xs mb-1">✅ 正确写法</div>
                        <pre className="text-xs font-mono text-gray-700 whitespace-pre-wrap">{current.goodCode}</pre>
                    </div>
                </div>
                <div className="text-sm text-gray-600 flex gap-2">
                    <span className="text-orange-500 mt-1"><BookOpen size={16} /></span>
                    {current.desc}
                </div>
            </div>
        </div>
    );
};


export default function App() {
    const [activeSection, setActiveSection] = useState(1);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const nextSection = () => {
        if (activeSection < sections.length) setActiveSection(activeSection + 1);
    };

    const prevSection = () => {
        if (activeSection > 1) setActiveSection(activeSection - 1);
    };

    const renderContent = () => {
        switch (activeSection) {
            case 1:
                return (
                    <div className="slide-enter text-center">
                        <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-12 rounded-2xl shadow-xl mb-8">
                            <div className="flex justify-center gap-4 mb-6">
                                <Store size={60} className="text-yellow-300 animate-bounce" />
                                <Calculator size={60} className="text-white animate-pulse" />
                            </div>
                            <h2 className="text-3xl font-extrabold mb-2 text-green-100">GESP C++ 一级 第14课</h2>
                            <h1 className="text-5xl font-bold mb-6 drop-shadow-md">模拟与逻辑</h1>
                            <div className="inline-block bg-white/20 px-6 py-2 rounded-full backdrop-blur-sm border border-white/30">
                                <span className="font-bold tracking-wide text-lg">🧮 副标题：小小精算师的挑战</span>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-left">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                                <ArrowRight className="text-green-600" /> 教学目标
                            </h3>
                            <ul className="space-y-4 text-gray-600">
                                <li className="flex items-center gap-3">
                                    <span className="bg-green-100 text-green-600 p-2 rounded"><Terminal size={18} /></span>
                                    理解什么是“模拟”：把现实生活中的数学题翻译成 C++ 代码。
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="bg-teal-100 text-teal-600 p-2 rounded"><BookOpen size={18} /></span>
                                    学会分析题目中的“变量”、“逻辑”和“输出”。
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="bg-orange-100 text-orange-600 p-2 rounded"><ShoppingBag size={18} /></span>
                                    通过真题演练，掌握简单的购物结算和日期推算逻辑。
                                </li>
                            </ul>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Store className="text-orange-600" size={32} /> 情景导入：逻辑便利店
                        </h2>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                            <p className="text-lg text-gray-600 mb-4">
                                欢迎来到“逻辑便利店”！我是店长。计算器坏了，需要你这个“人肉CPU”来帮忙算账！
                            </p>
                            <ConvenienceStore />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-blue-50 p-4 rounded-xl border-t-4 border-blue-500 shadow-sm">
                                <h4 className="font-bold text-blue-800 mb-2">第1招：找变量</h4>
                                <p className="text-sm text-gray-600">像侦探一样，找出变化的数字。<br /><code>int a, b, money;</code></p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-xl border-t-4 border-purple-500 shadow-sm">
                                <h4 className="font-bold text-purple-800 mb-2">第2招：写算式</h4>
                                <p className="text-sm text-gray-600">像翻译官一样，把总价翻译成代码。<br /><code>total = a*2 + b*5;</code></p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-xl border-t-4 border-green-500 shadow-sm">
                                <h4 className="font-bold text-green-800 mb-2">第3招：做判断</h4>
                                <p className="text-sm text-gray-600">像法官一样，判断钱够不够。<br /><code>if (money &gt;= total)</code></p>
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Bot className="text-blue-600" size={32} /> 模拟实验室：机器人大冒险
                        </h2>
                        <div className="bg-white p-4 rounded-xl border-l-4 border-blue-500 shadow-sm mb-6">
                            <p className="text-gray-600">
                                很多模拟题都是“按照指令行动”。<br />
                                比如：输入一串指令 <code>UURD</code>，问机器人最后在哪里？<br />
                                让我们亲眼看看 <strong>变量 x, y</strong> 是怎么随着指令变化的！
                            </p>
                        </div>
                        <RobotSimulator />
                    </div>
                );
            case 4:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <AlertTriangle className="text-orange-500" size={32} /> 避坑指南：模拟题雷区
                        </h2>
                        <SimPitfalls />
                    </div>
                );
            case 5:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <ShoppingBag className="text-blue-600" size={32} /> 真题实战 1：买文具
                        </h2>
                        <div className="bg-gray-100 text-xs text-gray-500 mb-4 px-2 py-1 rounded inline-block font-mono">2023年9月 GESP 一级 编程题第1题</div>
                        <StationeryShop />
                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 text-yellow-800 rounded-r-lg">
                            <strong>💡 重点提醒：</strong>
                            <p>一定要看清题目是让你输出“剩余的钱”还是“缺少的钱”！<br />如果是缺少，得用 <code>total - money</code>，不然算出负数就错了。</p>
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Calendar className="text-purple-600" size={32} /> 真题实战 2：小杨的考试
                        </h2>
                        <div className="bg-gray-100 text-xs text-gray-500 mb-4 px-2 py-1 rounded inline-block font-mono">2023年12月 GESP 一级 编程题第1题</div>
                        <WeekCalculator />
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mt-4">
                            <h4 className="font-bold text-gray-700 mb-2">难点突破：为什么要 -1 再 +1 ？</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                星期几是 1~7，但取模运算 <code>% 7</code> 的结果是 0~6。<br />
                                如果直接算，7 % 7 = 0，但题目要求输出 7 (星期日)。<br />
                                所以我们用 <strong>“平移大法”</strong>：先把 1~7 减成 0~6，算完模之后，再加回来。
                            </p>
                        </div>
                    </div>
                );
            case 7:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">🎓 总结与作业</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-indigo-700 border-b pb-2">
                                    <CheckCircle2 size={20} /> 知识点回顾
                                </h3>
                                <ul className="space-y-3 text-gray-700 font-medium">
                                    <li className="flex items-start gap-2">
                                        <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-1">1</span>
                                        <span><strong>模拟核心：</strong> 用变量记录状态 (Pos, Count)，用循环更新状态。</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-1">2</span>
                                        <span><strong>避坑：</strong> 必须初始化！必须检查边界！</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-1">3</span>
                                        <span><strong>周期问题：</strong> 凡是“转圈圈”的，一定离不开取模 <code>%</code>。</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-teal-500 to-green-600 text-white p-6 rounded-xl shadow-lg flex flex-col justify-center">
                                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                                    <BookOpen size={24} /> 课后思考
                                </h3>
                                <p className="text-teal-100 mb-4">
                                    如果机器人走的不是网格，而是数轴。它还可以“穿越”！<br />
                                    从 x=5 瞬间传送到 x=10。这在代码里怎么模拟？
                                </p>
                                <div className="bg-white/10 p-3 rounded-lg text-sm border border-white/20">
                                    <p>提示：</p>
                                    <ul className="list-disc list-inside mt-1 opacity-90">
                                        <li>if (x == 5) x = 10;</li>
                                        <li>这是什么？这就是“传送门”的模拟逻辑！</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <button onClick={() => setActiveSection(1)} className="px-8 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition font-bold shadow-sm flex items-center gap-2 mx-auto">
                                <RotateCcw size={18} /> 重新开始学习
                            </button>
                        </div>
                    </div>
                );
            default:
                return <div>Content Not Found</div>;
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-gray-900">
            <style>{`
        .slide-enter { animation: slideIn 0.5s ease-out; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

            {/* Mobile Menu Button - Fixed Top */}
            <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-200 p-4 flex items-center justify-between shadow-sm">
                <h1 className="text-lg font-bold text-blue-700 flex items-center gap-2">
                    <Link to="/" className="hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm">
                            <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Logo" className="w-full h-full object-cover" />
                        </div>
                    </Link>
                    <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs">C++</span>
                    <span>一级趣味课堂</span>
                </h1>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col h-full overflow-y-auto transition-transform duration-300 shadow-lg md:shadow-none
                md:relative md:translate-x-0
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-5 border-b border-slate-100 bg-gradient-to-br from-blue-50 to-white">
                    <h1 className="text-lg font-bold flex items-center gap-2 text-blue-700">
                        <Link to="/" className="hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm">
                                <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Logo" className="w-full h-full object-cover" />
                            </div>
                        </Link>
                        <span className="bg-blue-600 text-white p-1 rounded">C++</span>
                        <span>一级趣味课堂</span>
                    </h1>
                    <p className="text-xs text-blue-400 mt-2 font-medium pl-1">第 14 课：模拟与算法 🤖</p>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => {
                                setActiveSection(section.id);
                                setIsMobileMenuOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all flex items-center gap-3 font-medium
                ${activeSection === section.id
                                    ? 'bg-green-100 text-green-800 shadow-sm'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                        >
                            <i className={`p-1 rounded ${activeSection === section.id ? 'bg-white/50' : 'bg-gray-100'}`}>
                                <Icon name={section.icon} size={16} />
                            </i>
                            {section.title}
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-100 text-xs text-center text-gray-400">
                    逻辑一号老师 © 2025
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden w-full relative pt-16 md:pt-0">
                {/* 背景装饰 */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl pointer-events-none"></div>

                <header className="h-16 bg-white/90 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10">
                    <h2 className="text-lg font-bold text-gray-800 truncate flex items-center gap-2">
                        <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-xs">Section {activeSection}</span>
                        {sections.find(s => s.id === activeSection)?.title}
                    </h2>
                    <div className="flex gap-2 text-sm text-gray-500">
                        <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden mt-2">
                            <div
                                className="h-full bg-green-500 transition-all duration-500 ease-out"
                                style={{ width: `${(activeSection / sections.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-8 z-0">
                    <div className="max-w-4xl mx-auto pb-12">
                        {renderContent()}
                    </div>
                </main>

                <footer className="h-20 bg-white border-t border-gray-200 flex items-center justify-between px-8 z-20">
                    <button
                        onClick={prevSection}
                        disabled={activeSection === 1}
                        className={`px-5 py-2.5 rounded-lg flex items-center gap-2 font-bold transition-all
              ${activeSection === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100 hover:shadow-sm'}`}
                    >
                        <ArrowRight className="rotate-180" size={18} /> 上一步
                    </button>

                    <button
                        onClick={nextSection}
                        disabled={activeSection === sections.length}
                        className={`px-6 py-2.5 rounded-lg flex items-center gap-2 font-bold transition-all shadow-sm
              ${activeSection === sections.length ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-md hover:-translate-y-0.5'}`}
                    >
                        下一步 <ArrowRight size={18} color="white" />
                    </button>
                </footer>
            </div>
        </div>
    );
}