import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code, Terminal, CheckCircle, AlertTriangle, Play, ChevronRight, Calculator, Cpu, Hash, Trophy, Eye, Lightbulb, Copy, Check, Unlock, ArrowRight, Grid, Info, ArrowRightLeft, RefreshCw, Clock, Target, XCircle, Menu, X } from 'lucide-react';
import CppLevelSupport from '../components/CppLevelSupport';
import CppLessonDirectory from '../components/CppLessonDirectory';
import { cppL3Lessons } from '../data/cppL3CourseFlow';

// --- 组件部分 ---

const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden border border-slate-100 ${className}`}>
        {children}
    </div>
);

const Button = ({ children, onClick, variant = "primary", className = "" }) => {
    const baseStyle = "px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
        outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
        success: "bg-green-600 text-white hover:bg-green-700"
    };
    return (
        <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
            {children}
        </button>
    );
};

const CodeBlock = ({ code, title }) => (
    <div className="bg-slate-900 rounded-lg overflow-hidden my-4 text-sm font-mono text-slate-50">
        {title && (
            <div className="bg-slate-800 px-4 py-2 text-xs text-slate-400 border-b border-slate-700 flex items-center gap-2">
                <Code size={14} />
                {title}
            </div>
        )}
        <pre className="p-4 overflow-x-auto">
            <code>{code}</code>
        </pre>
    </div>
);

const SectionTitle = ({ icon: Icon, title }) => (
    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4 mt-6 border-b pb-2">
        <Icon className="text-blue-600" size={24} />
        {title}
    </h2>
);

// --- 专题模块内容 ---

// 16 节系统课程目录（与 /lesson/3/N 打通）
const LessonDirectory = () => (
    <CppLessonDirectory
        level={3}
        lessons={cppL3Lessons}
        accent="rose"
        subtitle="按顺序学：进制 → 位运算 → 数组 → 字符串 → 枚举与模拟 → 综合"
    />
);

// Overview Module
const OverviewModule = ({ onStart }) => (
    <div className="space-y-6 animate-fade-in">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl">
            <h1 className="text-3xl font-bold mb-4">GESP C++ 三级冲刺指南</h1>
            <p className="text-purple-100 text-lg mb-6">
                基于历年真题归纳，掌握字符串处理、位运算、数组模拟与枚举数学。
            </p>
            <button
                onClick={() => onStart('string')}
                className="bg-white text-purple-700 px-6 py-2 rounded-full font-bold hover:bg-purple-50 transition flex items-center gap-2"
            >
                开始学习 <ArrowRight size={18} />
            </button>
        </div>

        <LessonDirectory />

        <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                    <Terminal size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">字符串处理</h3>
                <p className="text-slate-600 text-sm">
                    掌握 string 类、getline 读取、字符类型判断与 ASCII 转换。
                </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <Hash size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">数组与模拟</h3>
                <p className="text-slate-600 text-sm">
                    一维数组的遍历、极值查找、模拟规则逻辑。
                </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
                    <Cpu size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">位运算</h3>
                <p className="text-slate-600 text-sm">
                    理解二进制、掌握 &、|、^ 运算符，以及进制转换。
                </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
                    <Calculator size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">枚举与数学</h3>
                <p className="text-slate-600 text-sm">
                    质数判断、因数枚举、暴力枚举解题思路。
                </p>
            </div>
        </div>

        {/* Exam Score Breakdown */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Calculator className="text-purple-500" /> GESP 三级分数构成（总分100分）
            </h3>
            <div className="flex gap-2 mb-4">
                {[
                    { name: "选择题", score: 30, color: "bg-blue-500", desc: "15题×2分" },
                    { name: "判断题", score: 20, color: "bg-green-500", desc: "10题×2分" },
                    { name: "编程题", score: 50, color: "bg-purple-500", desc: "2题" },
                ].map((item, idx) => (
                    <div key={idx} className="flex-1">
                        <div className={`h-10 ${item.color} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                            {item.name}: {item.score}分
                        </div>
                        <div className="text-xs text-slate-500 text-center mt-1">{item.desc}</div>
                    </div>
                ))}
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-purple-800 text-sm">
                    <strong>💡 及格线：</strong>60分通过。三级编程题难度较大，建议选择判断拿45分，编程题拿20分以上。
                </p>
            </div>
        </div>

        {/* Self Assessment */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Lightbulb className="text-yellow-500" /> 三级核心技能自测
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                    { skill: "字符串遍历", icon: "📝", hint: "getline + for" },
                    { skill: "ASCII转换", icon: "🔤", hint: "'A'-'0'" },
                    { skill: "位运算基础", icon: "💻", hint: "& | ^ ~" },
                    { skill: "进制转换", icon: "🔢", hint: "% / 循环" },
                    { skill: "数组极值", icon: "📊", hint: "打擂台" },
                    { skill: "质数判断", icon: "🔍", hint: "sqrt优化" },
                    { skill: "枚举技巧", icon: "🎯", hint: "O(N²)暴力" },
                    { skill: "逻辑模拟", icon: "🎮", hint: "读题+规则" },
                ].map((item, idx) => (
                    <div
                        key={idx}
                        className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-lg border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group"
                    >
                        <div className="text-2xl mb-2">{item.icon}</div>
                        <div className="font-medium text-slate-700 text-sm group-hover:text-purple-600">{item.skill}</div>
                        <div className="text-xs text-slate-400 mt-1">{item.hint}</div>
                    </div>
                ))}
            </div>
        </div>

        {/* Study Plan */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
                { week: "第1周", title: "字符串专题", color: "blue", desc: "getline、遍历、ASCII码" },
                { week: "第2周", title: "数组与位运算", color: "green", desc: "极值、二进制、进制转换" },
                { week: "第3周", title: "数学与枚举", color: "purple", desc: "质数、因数、暴力枚举" },
                { week: "第4周", title: "真题冲刺", color: "orange", desc: "历年真题、模拟考试" },
            ].map((item, idx) => (
                <div key={idx} className={`bg-${item.color}-50 p-5 rounded-xl border border-${item.color}-100 hover:shadow-lg transition-shadow`}>
                    <div className="flex items-center gap-3 mb-3">
                        <div className={`bg-${item.color}-500 text-white p-2 rounded-lg text-xs font-bold`}>
                            {item.week}
                        </div>
                    </div>
                    <h4 className={`font-bold text-${item.color}-800 mb-1`}>{item.title}</h4>
                    <p className={`text-sm text-${item.color}-700`}>{item.desc}</p>
                </div>
            ))}
        </div>
    </div>
);

// 专题一：字符串处理
const StringModule = () => {
    const [inputText, setInputText] = useState("Hello GESP 2026!");
    const [shift, setShift] = useState(1);
    const [cipherText, setCipherText] = useState("");

    useEffect(() => {
        // 简单的凯撒密码模拟
        const result = inputText.split('').map(char => {
            if (char >= 'A' && char <= 'Z') {
                return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
            } else if (char >= 'a' && char <= 'z') {
                // 虽然题目通常只考大写，但模拟器做得全面点
                return String.fromCharCode(((char.charCodeAt(0) - 97 + shift) % 26) + 97);
            }
            return char;
        }).join('');
        setCipherText(result);
    }, [inputText, shift]);

    return (
        <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-blue-800 mb-2">核心心法</h3>
                    <p className="text-blue-700 leading-relaxed">熟练掌握 <code>string</code> 类。注意 <code>getline(cin, s)</code> 读取带空格字符串，以及字符与 ASCII 码的转换（'0' 与 0 的区别）。</p>
                </div>
                <div className="hidden md:block bg-white p-2 rounded shadow-sm border border-blue-200 text-[10px] font-mono whitespace-pre text-slate-400">
                    {'cin.ignore(); // 扫除换行'}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Code size={18} /> 核心代码模板</h4>
                    <CodeBlock
                        title="遍历与类型判断"
                        code={`string s;
getline(cin, s); 

for (int i = 0; i < s.length(); i++) {
    if (isdigit(s[i])) { 
        // 处理数字 '0'-'9'
    } else if (isupper(s[i])) {
        // 处理大写 'A'-'Z'
    }
}`}
                    />
                </div>

                <Card className="p-5 bg-white">
                    <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><Terminal size={18} /> 互动演示：移位加密</h4>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">输入字符串 (cin &gt;&gt; s)</label>
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                className="w-full p-2 border rounded font-mono text-slate-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">移位量 N (int n)</label>
                            <input
                                type="number"
                                value={shift}
                                onChange={(e) => setShift(parseInt(e.target.value) || 0)}
                                className="w-full p-2 border rounded font-mono text-slate-700"
                            />
                        </div>
                        <div className="p-3 bg-slate-100 rounded border border-slate-200">
                            <span className="text-xs text-slate-500 uppercase">Output Result</span>
                            <div className="font-mono text-lg text-blue-600 break-all">{cipherText}</div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* 新增：缓冲区陷阱 */}
            <Card className="p-5 border-l-4 border-red-500 bg-red-50/30">
                <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                    <AlertTriangle size={18} /> 致命陷阱：输入缓冲区残留
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-sm text-slate-700 space-y-3 leading-relaxed">
                        <p><strong>场景：</strong>在 <code>cin &gt;&gt; n;</code> 之后，如果立即使用 <code>getline(cin, s);</code>，你会发现程序竟然直接跳过了读取字符串的步骤！</p>
                        <p><strong>原因：</strong><code>cin &gt;&gt; n</code> 只读取了数字，而你按下的【回车键】(\n) 依然留在缓冲区。<code>getline</code> 看到这个回车符，就会认为你已经输入了一个空字符串并结束读取。</p>
                        <div className="bg-red-100 p-2 rounded border border-red-200 font-bold text-red-700">
                            ✨ 解决方案：在 getline 之前加一句 <code>cin.ignore();</code>
                        </div>
                    </div>
                    <CodeBlock
                        title="正确处理姿势"
                        code={`int n;
cin >> n;
cin.ignore(); // ⚡ 核心步骤：扫掉残留回车符

string s;
getline(cin, s); // 此时才能正常读取字符串`}
                    />
                </div>
            </Card>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 flex items-start gap-3">
                <AlertTriangle className="text-yellow-600 shrink-0 mt-1" />
                <div>
                    <h4 className="font-bold text-yellow-800">易错点警示</h4>
                    <ul className="list-disc list-inside text-yellow-700 text-sm space-y-1 mt-1">
                        <li>遇到空格会停止读取？用 <code>getline(cin, s)</code> 别用 <code>cin &gt;&gt; s</code>。</li>
                        <li><strong>清理缓冲区</strong>：在 <code>cin &gt;&gt; n</code> 之后紧接着用 <code>getline</code>，务必先用 <code>cin.ignore()</code> 吃掉换行符。</li>
                        <li>访问 <code>s[i+1]</code> 时，务必确保 <code>i+1 &lt; s.length()</code>。</li>
                        <li>字符转整数：<code>int num = s[i] - '0';</code> 别忘了减 '0'！</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

// 专题二：数组与模拟
const ArrayModule = () => {
    const [arrayData] = useState([12, 45, 7, 89, 23, 56]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [maxVal, setMaxVal] = useState(-1);
    const [isRunning, setIsRunning] = useState(false);

    const startSimulation = () => {
        if (isRunning) return;
        setIsRunning(true);
        setCurrentIndex(0);
        setMaxVal(arrayData[0]);
    };

    useEffect(() => {
        if (isRunning && currentIndex < arrayData.length) {
            const timer = setTimeout(() => {
                if (arrayData[currentIndex] > maxVal) {
                    setMaxVal(arrayData[currentIndex]);
                }

                if (currentIndex < arrayData.length - 1) {
                    setCurrentIndex(prev => prev + 1);
                } else {
                    setIsRunning(false); // End
                }
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, isRunning, arrayData, maxVal]);

    return (
        <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="font-bold text-blue-800 mb-2">核心心法</h3>
                <p className="text-blue-700">数组是数据的容器，模拟是操作的规则。读题要仔细，一定要通过样例验证逻辑。</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Code size={18} /> 核心代码模板</h4>
                    <CodeBlock
                        title="极值查找 (Find Max)"
                        code={`int maxVal = -1e9; // 初始化为极小值
int maxIdx = -1;

for (int i = 0; i < n; i++) {
    if (a[i] > maxVal) {
        maxVal = a[i];
        maxIdx = i; 
    }
}`}
                    />
                </div>

                <Card className="p-5 bg-white">
                    <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><Play size={18} /> 算法可视化：打擂台求最大值</h4>

                    <div className="flex gap-2 mb-6 justify-center flex-wrap">
                        {arrayData.map((num, idx) => (
                            <div
                                key={idx}
                                className={`w-10 h-10 flex items-center justify-center rounded border-2 transition-all duration-300 font-bold
                  ${idx === currentIndex ? 'border-blue-500 bg-blue-100 scale-110' : 'border-slate-200 bg-slate-50'}
                  ${idx === currentIndex && num > maxVal ? 'bg-green-200 border-green-500' : ''}
                `}
                            >
                                {num}
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center bg-slate-50 p-3 rounded mb-4">
                        <div>
                            <span className="text-sm text-slate-500 block">Current Max (maxVal)</span>
                            <span className="text-xl font-bold text-blue-600">{isRunning || currentIndex > -1 ? maxVal : '?'}</span>
                        </div>
                        <Button onClick={startSimulation} disabled={isRunning} variant="outline" className="text-sm">
                            {isRunning ? 'Running...' : '开始遍历 (Start)'}
                        </Button>
                    </div>
                    <p className="text-xs text-slate-500">
                        * 绿色高亮表示当前元素大于 maxVal，更新擂主。
                    </p>
                </Card>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 flex items-start gap-3">
                <AlertTriangle className="text-yellow-600 shrink-0 mt-1" />
                <div>
                    <h4 className="font-bold text-yellow-800">易错点警示</h4>
                    <ul className="list-disc list-inside text-yellow-700 text-sm space-y-1 mt-1">
                        <li><strong>数组越界</strong>：N=1000 时，数组最好开 a[1005]。</li>
                        <li><strong>初始化</strong>：找最大值时 `maxVal` 初始值要足够小（如 -1e9），找最小值时要足够大。</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

// 专题三：位运算
const BitModule = () => {
    const [numA, setNumA] = useState(20);
    const [numB, setNumB] = useState(25);

    const toBin = (n) => (n >>> 0).toString(2).padStart(8, '0');

    return (
        <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="font-bold text-blue-800 mb-2">核心心法</h3>
                <p className="text-blue-700">理解二进制每一位的含义。常用：<code>&</code> (提取/判断)，<code>|</code> (设置)，<code>^</code> (找不同/取反)。</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Code size={18} /> 核心代码模板</h4>
                    <CodeBlock
                        title="统计二进制中 1 的个数"
                        code={`int countOnes(int n) {
    int cnt = 0;
    while (n > 0) {
        if (n & 1) cnt++; // 判断末位
        n >>= 1;          // 右移
    }
    return cnt;
}`}
                    />
                </div>

                <Card className="p-5 bg-white">
                    <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><Cpu size={18} /> 位运算实验室</h4>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="text-xs text-slate-500">Number A</label>
                            <input type="number" value={numA} onChange={(e) => setNumA(Number(e.target.value))} className="w-full border rounded p-1" />
                            <div className="text-xs font-mono text-slate-400 mt-1">{toBin(numA)}</div>
                        </div>
                        <div>
                            <label className="text-xs text-slate-500">Number B</label>
                            <input type="number" value={numB} onChange={(e) => setNumB(Number(e.target.value))} className="w-full border rounded p-1" />
                            <div className="text-xs font-mono text-slate-400 mt-1">{toBin(numB)}</div>
                        </div>
                    </div>

                    <div className="space-y-2 text-sm font-mono">
                        <div className="flex justify-between items-center bg-slate-50 p-2 rounded">
                            <span>A & B (AND)</span>
                            <div className="text-right">
                                <div className="font-bold text-blue-600">{numA & numB}</div>
                                <div className="text-xs text-slate-400">{toBin(numA & numB)}</div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center bg-slate-50 p-2 rounded">
                            <span>A | B (OR)</span>
                            <div className="text-right">
                                <div className="font-bold text-green-600">{numA | numB}</div>
                                <div className="text-xs text-slate-400">{toBin(numA | numB)}</div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center bg-slate-50 p-2 rounded">
                            <span>A ^ B (XOR)</span>
                            <div className="text-right">
                                <div className="font-bold text-purple-600">{numA ^ numB}</div>
                                <div className="text-xs text-slate-400">{toBin(numA ^ numB)}</div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 flex items-start gap-3">
                <AlertTriangle className="text-yellow-600 shrink-0 mt-1" />
                <div>
                    <h4 className="font-bold text-yellow-800">易错点警示</h4>
                    <ul className="list-disc list-inside text-yellow-700 text-sm space-y-1 mt-1">
                        <li><strong>优先级陷阱</strong>：位运算优先级低，混合运算必须加括号！例如：<code>if ((n & 1) == 0)</code>。</li>
                        <li><strong>数据溢出</strong>：进制转换累加时，结果容易超 <code>int</code>，建议用 <code>long long</code>。</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

// 专题四：枚举与数学
const MathModule = () => {
    const [checkNum, setCheckNum] = useState(17);
    const [isPrime, setIsPrime] = useState(true);

    useEffect(() => {
        // 简单的质数检测
        if (checkNum < 2) {
            setIsPrime(false);
            return;
        }
        let prime = true;
        for (let i = 2; i * i <= checkNum; i++) {
            if (checkNum % i === 0) {
                prime = false;
                break;
            }
        }
        setIsPrime(prime);
    }, [checkNum]);

    return (
        <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="font-bold text-blue-800 mb-2">核心心法</h3>
                <p className="text-blue-700">不需要高级算法，只要会“暴力”枚举。数据范围小（N≤1000），O(N²) 甚至 O(N³) 都是安全的。</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Code size={18} /> 核心代码模板</h4>
                    <CodeBlock
                        title="质数判断 (优化版)"
                        code={`bool isPrime(int x) {
    if (x < 2) return false;
    // 核心优化：只枚举到 sqrt(x)
    for (int i = 2; i * i <= x; i++) { 
        if (x % i == 0) return false;
    }
    return true;
}`}
                    />
                </div>

                <Card className="p-5 bg-white">
                    <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><Calculator size={18} /> 质数检测器</h4>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-slate-600 mb-1">输入数字</label>
                        <input
                            type="number"
                            value={checkNum}
                            onChange={(e) => setCheckNum(parseInt(e.target.value) || 0)}
                            className="w-full p-2 border rounded font-mono text-slate-700"
                        />
                    </div>

                    <div className={`p-4 rounded-lg flex items-center gap-4 ${isPrime ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {isPrime ? <CheckCircle size={32} /> : <AlertTriangle size={32} />}
                        <div>
                            <div className="text-2xl font-bold">{isPrime ? '是质数 (Prime)' : '不是质数'}</div>
                            <div className="text-sm opacity-80">
                                {isPrime
                                    ? `无法被 2 到 ${Math.floor(Math.sqrt(checkNum))} 之间的数整除`
                                    : '存在除 1 和自身以外的因数'}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 flex items-start gap-3">
                <AlertTriangle className="text-yellow-600 shrink-0 mt-1" />
                <div>
                    <h4 className="font-bold text-yellow-800">易错点警示</h4>
                    <ul className="list-disc list-inside text-yellow-700 text-sm space-y-1 mt-1">
                        <li><strong>边界条件</strong>：注意是否包含 1（不是质数）和本身。</li>
                        <li><strong>完全平方数</strong>：使用 <code>int r = sqrt(x); return r*r == x;</code> 判断。</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

// 考前清单
const CheckListModule = () => {
    const items = [
        "头文件：#include <bits/stdc++.h> 或 iostream, string, cmath, algorithm",
        "数据类型：涉及累加、乘积用 long long",
        "调试：题目样例必须过，且测过 0, 1, 空串等边界",
        "格式：检查是否需要 endl 换行或空格分隔",
        "变量：多组数据时，是否重置了计数器？"
    ];
    return (
        <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-600" />
                考前冲刺 CheckList
            </h3>
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 divide-y divide-slate-100">
                {items.map((item, idx) => (
                    <div key={idx} className="p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors">
                        <div className="w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center text-xs font-bold text-slate-400 mt-0.5">
                            {idx + 1}
                        </div>
                        <span className="text-slate-700">{item}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

// -----------------------------------------------------------------------------
// Module: Code Trace
// -----------------------------------------------------------------------------
const CodeTraceModule = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedExample, setSelectedExample] = useState(0);

    const examples = [
        {
            title: "字符串遍历与转换",
            code: `string s = "ABC";\nfor(int i=0; i<s.length(); i++) {\n    if(s[i] >= 'A' && s[i] <= 'Z') {\n        s[i] = s[i] - 'A' + 'a';\n    }\n    cout << s[i];\n}`,
            steps: [
                { line: 1, vars: { s: "ABC", i: "-" }, desc: "初始化字符串 s = \"ABC\"", output: "" },
                { line: 2, vars: { s: "ABC", i: 0 }, desc: "i=0, 0<3 成立", output: "" },
                { line: 3, vars: { s: "ABC", i: 0 }, desc: "s[0]='A', 是大写字母", output: "" },
                { line: 4, vars: { s: "aBC", i: 0 }, desc: "转换 'A' -> 'a'", output: "" },
                { line: 6, vars: { s: "aBC", i: 0 }, desc: "输出 s[0]='a'", output: "a" },
                { line: 2, vars: { s: "aBC", i: 1 }, desc: "i++, i=1, 1<3 成立", output: "a" },
                { line: 3, vars: { s: "aBC", i: 1 }, desc: "s[1]='B', 是大写字母", output: "a" },
                { line: 4, vars: { s: "abC", i: 1 }, desc: "转换 'B' -> 'b'", output: "a" },
                { line: 6, vars: { s: "abC", i: 1 }, desc: "输出 s[1]='b'", output: "ab" },
                { line: 2, vars: { s: "abC", i: 2 }, desc: "i++, i=2, 2<3 成立", output: "ab" },
                { line: 3, vars: { s: "abC", i: 2 }, desc: "s[2]='C', 是大写字母", output: "ab" },
                { line: 4, vars: { s: "abc", i: 2 }, desc: "转换 'C' -> 'c'", output: "ab" },
                { line: 6, vars: { s: "abc", i: 2 }, desc: "输出 s[2]='c'", output: "abc" },
                { line: 2, vars: { s: "abc", i: 3 }, desc: "i=3, 循环结束", output: "abc" }
            ]
        },
        {
            title: "打擂台找最大值",
            code: `int a[] = {12, 45, 7, 89};\nint maxVal = a[0];\nfor(int i=1; i<4; i++) {\n    if(a[i] > maxVal) {\n        maxVal = a[i];\n    }\n}`,
            steps: [
                { line: 1, vars: { a: "{...}", maxVal: "-", i: "-" }, desc: "数组初始化", output: "" },
                { line: 2, vars: { a: "{...}", maxVal: 12, i: "-" }, desc: "假设第一个数是最大值", output: "" },
                { line: 3, vars: { a: "{...}", maxVal: 12, i: 1 }, desc: "从第二个元素开始遍历", output: "" },
                { line: 4, vars: { a: "{...}", maxVal: 12, i: 1 }, desc: "45 > 12? True", output: "" },
                { line: 5, vars: { a: "{...}", maxVal: 45, i: 1 }, desc: "更新最大值 maxVal=45", output: "" },
                { line: 3, vars: { a: "{...}", maxVal: 45, i: 2 }, desc: "i++, i=2", output: "" },
                { line: 4, vars: { a: "{...}", maxVal: 45, i: 2 }, desc: "7 > 45? False", output: "" },
                { line: 3, vars: { a: "{...}", maxVal: 45, i: 3 }, desc: "i++, i=3", output: "" },
                { line: 4, vars: { a: "{...}", maxVal: 45, i: 3 }, desc: "89 > 45? True", output: "" },
                { line: 5, vars: { a: "{...}", maxVal: 89, i: 3 }, desc: "更新最大值 maxVal=89", output: "" },
                { line: 3, vars: { a: "{...}", maxVal: 89, i: 4 }, desc: "i=4, 循环结束", output: "" }
            ]
        }
    ];

    const example = examples[selectedExample];
    const step = example.steps[currentStep];

    useEffect(() => {
        if (isPlaying && currentStep < example.steps.length - 1) {
            const timer = setTimeout(() => setCurrentStep(c => c + 1), 1500);
            return () => clearTimeout(timer);
        } else {
            setIsPlaying(false);
        }
    }, [isPlaying, currentStep, example.steps.length]);

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                    <Eye /> 代码跟踪模拟器
                </h2>
                <p className="text-cyan-100">
                    通过单步执行，直观理解字符串遍历和数组算法的执行过程。
                </p>
            </div>

            <div className="flex gap-2">
                {examples.map((ex, idx) => (
                    <Button
                        key={idx}
                        variant={selectedExample === idx ? "primary" : "secondary"}
                        onClick={() => { setSelectedExample(idx); setCurrentStep(0); setIsPlaying(false); }}
                        className="text-sm"
                    >
                        {ex.title}
                    </Button>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-700">
                    <div className="bg-slate-800 px-4 py-2 text-xs text-slate-400 border-b border-slate-700 font-mono flex gap-2">
                        <div className="flex gap-1.5 pt-1">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                        </div>
                        source.cpp
                    </div>
                    <div className="p-4 font-mono text-sm">
                        {example.code.split('\n').map((line, idx) => (
                            <div key={idx} className={`py-1 px-2 rounded flex ${step.line === idx + 1 ? 'bg-yellow-500/30 border-l-4 border-yellow-400' : ''}`}>
                                <span className="text-slate-600 w-6 text-right mr-4 select-none">{idx + 1}</span>
                                <span className="text-blue-100 whitespace-pre">{line}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <Card className="p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-bold text-slate-700 flex items-center gap-2"><Play size={18} className="text-blue-600" /> 控制台</h4>
                            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">Step {currentStep + 1}/{example.steps.length}</span>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="secondary" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}><ArrowRightLeft size={16} className="rotate-180" /></Button>
                            <Button
                                variant={isPlaying ? "success" : "primary"}
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="flex-1"
                            >
                                {isPlaying ? '⏸ 暂停' : '▶ 播放'}
                            </Button>
                            <Button variant="secondary" onClick={() => setCurrentStep(Math.min(example.steps.length - 1, currentStep + 1))}><ArrowRightLeft size={16} /></Button>
                            <Button variant="secondary" onClick={() => { setCurrentStep(0); setIsPlaying(false); }}><RefreshCw size={16} /></Button>
                        </div>
                    </Card>

                    <Card className="p-4">
                        <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2"><ArrowRightLeft size={18} className="text-purple-600" /> 变量监视</h4>
                        <div className="grid grid-cols-2 gap-3">
                            {Object.entries(step.vars).map(([k, v]) => (
                                <div key={k} className="bg-slate-50 p-2 rounded border border-slate-100">
                                    <div className="text-xs text-slate-400 mb-1">{k}</div>
                                    <div className="font-bold text-slate-800 font-mono truncate">{v}</div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <div className={`p-4 rounded-xl border transition-colors ${step.output ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
                        <div className="flex gap-3">
                            <div className={`mt-0.5 ${step.output ? 'text-green-600' : 'text-slate-400'}`}>
                                {step.output ? <CheckCircle size={18} /> : <Info size={18} />}
                            </div>
                            <div>
                                <div className={`font-medium text-sm ${step.output ? 'text-green-800' : 'text-slate-600'}`}>{step.desc}</div>
                                {step.output && <div className="mt-2 bg-slate-900 text-green-400 px-2 py-1 rounded text-xs font-mono inline-block">Output: {step.output}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// -----------------------------------------------------------------------------
// Module: Templates
// -----------------------------------------------------------------------------
const TemplateBlock = ({ title, desc, code }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-slate-700 text-sm">{title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                </div>
                <button onClick={handleCopy} className="text-slate-500 hover:text-blue-600 flex items-center gap-1 text-xs bg-white px-2 py-1 rounded border">
                    {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? '已复制' : '复制'}
                </button>
            </div>
            <div className="p-4 bg-slate-900 overflow-x-auto">
                <pre className="text-sm font-mono text-green-400"><code>{code}</code></pre>
            </div>
        </div>
    );
};

const TemplatesModule = () => (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3"><Code /> 万能代码模板</h2>
            <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-bold">背诵 + 理解</span>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
            <TemplateBlock
                title="1. 字符串读取与遍历"
                desc="处理带空格字符串，遍历每一位"
                code={`int n;
cin >> n;
cin.ignore(); // ⚡ 重要：清除缓冲区残留回车

string s;
getline(cin, s);
for(int i=0; i<s.length(); i++) {
    // 处理 s[i]
}`}
            />
            <TemplateBlock
                title="2. 质数判断 (Prime Check)"
                desc="O(sqrt(N)) 复杂度，高效判断"
                code={`bool isPrime(int n) {
    if(n < 2) return false;
    for(int i=2; i*i<=n; i++) {
        if(n % i == 0) return false;
    }
    return true;
}`}
            />
            <TemplateBlock
                title="3. 进制转换 (只读)"
                desc="模 N 取余，除 N 取整，逆序输出"
                code={`void toBase(int n, int base) {
    string res = "";
    while(n > 0) {
        int r = n % base;
        res += (char)(r < 10 ? r+'0' : r-10+'A');
        n /= base;
    }
    reverse(res.begin(), res.end());
    cout << res;
}`}
            />
            <TemplateBlock
                title="4. 数组最大值及其下标"
                desc="打擂台法，初始化极小值"
                code={`int maxVal = -1e9, idx = -1;
for(int i=0; i<n; i++) {
    if(a[i] > maxVal) {
        maxVal = a[i];
        idx = i;
    }
}`}
            />
        </div>
    </div>
);

// -----------------------------------------------------------------------------
// Module: Exam Tips
// -----------------------------------------------------------------------------
const ExamTipsModule = () => (
    <div className="space-y-6">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-3"><Lightbulb /> 考场秘籍</h2>
            <p className="text-amber-100">GESP 三级考试策略与注意事项，助你稳定发挥。</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2"><Clock size={20} /> 时间管理</h3>
                <ul className="space-y-2 text-sm text-blue-900">
                    <li>• <strong>单选判断 (30+20分)</strong>: 20分钟内完成，相信第一直觉。</li>
                    <li>• <strong>编程题 (50分)</strong>: 剩下的时间都留给它。先通读两题，先做简单的。</li>
                    <li>• <strong>最后5分钟</strong>: 检查文件名、return 0、分号。</li>
                </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2"><Target size={20} /> 编码规范</h3>
                <ul className="space-y-2 text-sm text-green-900">
                    <li>• <strong>头文件</strong>: 推荐 <code>#include &lt;bits/stdc++.h&gt;</code>。</li>
                    <li>• <strong>变量名</strong>: 见名知意，避免使用 `time`, `next` 等可能冲突的词。</li>
                    <li>• <strong>注释</strong>: 关键逻辑适当写注释，防止自己乱了阵脚。</li>
                </ul>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                <h3 className="font-bold text-purple-800 mb-4 flex items-center gap-2"><AlertTriangle size={20} /> 高频坑点</h3>
                <ul className="space-y-2 text-sm text-purple-900">
                    <li>• <code>string</code> 下标从 0 开始，长度是 <code>.length()</code>。</li>
                    <li>• 字符运算：<code>'9' - '0' = 9</code>，别直接用 '9' 计算。</li>
                    <li>• 数组越界：开数组比题目范围大一点点 (如 1005)。</li>
                </ul>
            </div>
        </div>
    </div>
);

// -----------------------------------------------------------------------------
// Module: Practice
// -----------------------------------------------------------------------------
const PracticeModule = () => {
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selected, setSelected] = useState(null);

    const questions = [
        {
            q: "char c = 'C'; c = c + 32; cout << c; 输出结果是？",
            opts: ["C", "c", "67", "99"],
            ans: 1,
            expl: "大写字母 + 32 变为对应的小写字母。'C' -> 'c'。"
        },
        {
            q: "int a = 5, b = 2; cout << (double)a / b; 输出结果是？",
            opts: ["2", "2.5", "2.0", "3"],
            ans: 1,
            expl: "强制转换 a 为 double 后，进行浮点数除法，结果为 2.5。"
        },
        {
            q: "string s = \"GESP\"; cout << s[4]; 会发生什么？",
            opts: ["输出空", "输出 P", "数组越界/未定义行为", "输出 0"],
            ans: 2,
            expl: "s 长度为 4，有效下标是 0, 1, 2, 3。访问 s[4] 越界。"
        },
        {
            q: "若 a=3 (011), b=5 (101), 则 a & b 的结果是？",
            opts: ["1", "7", "3", "5"],
            ans: 0,
            expl: "011 & 101 = 001 (十进制 1)。"
        },
        {
            q: "判断 n 是否为奇数的最高效位运算是？",
            opts: ["n % 2 == 1", "n & 1", "n | 1", "n ^ 1"],
            ans: 1,
            expl: "n & 1 检查二进制最后一位，若是 1 则为奇数，效率高于取模。"
        }
    ];

    const q = questions[current];

    const handleAnswer = (idx) => {
        setSelected(idx);
        setShowResult(true);
        if (idx === q.ans) setScore(score + 1);
    };

    const next = () => {
        if (current < questions.length - 1) {
            setCurrent(current + 1);
            setShowResult(false);
            setSelected(null);
        } else {
            alert(`练习结束！得分：${score + (selected === q.ans ? 0 : 0)}/${questions.length}`);
            setCurrent(0);
            setScore(0);
            setShowResult(false);
            setSelected(null);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 p-6 border-b border-slate-200 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2"><Trophy className="text-yellow-500" /> 真题模拟小测</h3>
                    <span className="text-xs bg-white border px-2 py-1 rounded text-slate-500">Q {current + 1} / {questions.length}</span>
                </div>
                <div className="p-8">
                    <h4 className="text-lg font-bold text-slate-800 mb-6">{q.q}</h4>
                    <div className="space-y-3">
                        {q.opts.map((opt, idx) => (
                            <button
                                key={idx}
                                disabled={showResult}
                                onClick={() => handleAnswer(idx)}
                                className={`w-full p-4 rounded-xl text-left border-2 transition-all flex justify-between items-center
                    ${showResult
                                        ? idx === q.ans
                                            ? 'border-green-500 bg-green-50 text-green-900'
                                            : idx === selected
                                                ? 'border-red-500 bg-red-50 text-red-900'
                                                : 'opacity-50 border-slate-100'
                                        : 'border-slate-100 hover:border-blue-400 hover:bg-blue-50 text-slate-700'}`}
                            >
                                <span className="font-medium">{String.fromCharCode(65 + idx)}. {opt}</span>
                                {showResult && idx === q.ans && <CheckCircle size={20} className="text-green-600" />}
                                {showResult && idx === selected && idx !== q.ans && <XCircle size={20} className="text-red-600" />}
                            </button>
                        ))}
                    </div>
                    {showResult && (
                        <div className="mt-6 animate-fade-in">
                            <div className={`p-4 rounded-xl text-sm ${selected === q.ans ? 'bg-green-100 text-green-800' : 'bg-red-50 text-red-800'}`}>
                                <p className="font-bold mb-1">{selected === q.ans ? '回答正确！' : '回答错误'}</p>
                                <p>{q.expl}</p>
                            </div>
                            <Button onClick={next} variant="primary" className="w-full mt-4">
                                {current < questions.length - 1 ? '下一题' : '查看结果'}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- 主应用组件 ---
export default function CourseLevel3() {
    const [activeTab, setActiveTab] = useState('overview');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [
        { id: 'overview', label: '知识体系', icon: BookOpen },
        { id: 'string', label: '字符串处理', icon: Terminal },
        { id: 'array', label: '数组与模拟', icon: Hash },
        { id: 'bit', label: '位运算', icon: Cpu },
        { id: 'math', label: '枚举与数学', icon: Calculator },
        { id: 'trace', label: '代码跟踪模拟', icon: Eye },
        { id: 'templates', label: '万能代码模板', icon: Code },
        { id: 'tips', label: '考场秘籍', icon: Lightbulb },
        { id: 'practice', label: '真题实战', icon: Trophy },
        { id: 'checklist', label: '考前清单', icon: CheckCircle },
    ];

    const activeTabInfo = menuItems.find(item => item.id === activeTab);

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
            {/* Mobile Menu Button - Fixed Top */}
            <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-200 p-4 flex items-center justify-between shadow-sm">
                <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Link to="/" className="hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm">
                            <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Logo" className="w-full h-full object-cover" />
                        </div>
                    </Link>
                    <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs">C++</span>
                    GESP 三级
                </h1>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                    aria-label={isMobileMenuOpen ? '关闭课程目录' : '打开课程目录'}
                    aria-expanded={isMobileMenuOpen}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar Overlay (Mobile) */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 transition-transform duration-300
                md:relative md:translate-x-0
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 border-b border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                        <Link to="/" className="hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm">
                                <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Logo" className="w-full h-full object-cover" />
                            </div>
                        </Link>
                        <h1 className="text-xl font-bold text-slate-800">GESP 三级</h1>
                    </div>
                    <p className="text-xs text-slate-500">实战强化 2026版</p>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                setIsMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                                ${activeTab === item.id
                                    ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                            `}
                        >
                            <item.icon size={18} />
                            {item.label}
                            {activeTab === item.id && <ChevronRight size={16} className="ml-auto opacity-50" />}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100 text-center">
                    <p className="text-xs text-slate-400">© 2026 GESP 备考互动课件</p>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 pt-16 md:pt-0">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 justify-between shrink-0">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        {activeTabInfo?.icon && <activeTabInfo.icon className="text-blue-600" size={24} />}
                        {activeTabInfo?.label}
                    </h2>
                    <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">Level 3</span>
                </header>

                <main className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-5xl mx-auto">
                        {activeTab === 'overview' && <CppLevelSupport level={3} />}
                        {activeTab === 'overview' && <OverviewModule onStart={setActiveTab} />}
                        {activeTab === 'string' && <div className="animate-fade-in"><StringModule /></div>}
                        {activeTab === 'array' && <div className="animate-fade-in"><ArrayModule /></div>}
                        {activeTab === 'bit' && <div className="animate-fade-in"><BitModule /></div>}
                        {activeTab === 'math' && <div className="animate-fade-in"><MathModule /></div>}
                        {activeTab === 'trace' && <CodeTraceModule />}
                        {activeTab === 'templates' && <TemplatesModule />}
                        {activeTab === 'tips' && <ExamTipsModule />}
                        {activeTab === 'practice' && <PracticeModule />}
                        {activeTab === 'checklist' && <div className="animate-fade-in"><CheckListModule /></div>}
                        {activeTab === menuItems[menuItems.length - 1]?.id && (
                            <CppLevelSupport level={3} placement="bottom" />
                        )}
                    </div>
                    <footer className="text-center text-slate-400 py-8 text-sm mt-8 border-t border-slate-100">
                        GESP C++ 三级备考互动课件 | 基于历年真题归纳
                    </footer>
                </main>
            </div>
        </div>
    );
}
