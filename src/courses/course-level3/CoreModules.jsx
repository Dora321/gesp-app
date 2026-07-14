import { useState, useEffect } from 'react';
import { Code, Terminal, AlertTriangle, Play, Calculator, Cpu, Hash, Lightbulb, ArrowRight } from 'lucide-react';
import CppLessonDirectory from '../../components/CppLessonDirectory';
import { cppL3Lessons } from '../../data/cppL3CourseFlow';
import { Card, Button, CodeBlock } from './Shared';

export const LessonDirectory = () => (
    <CppLessonDirectory
        level={3}
        lessons={cppL3Lessons}
        accent="rose"
        subtitle="按顺序学：进制 → 位运算 → 数组 → 字符串 → 枚举与模拟 → 综合"
    />
);

export const OverviewModule = ({ onStart }) => (
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

export const StringModule = () => {
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

export const ArrayModule = () => {
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
