import { useState } from 'react';
import { Code, CheckCircle, AlertTriangle, Trophy, Lightbulb, Clock, Target, XCircle } from 'lucide-react';
import { Button, TemplateBlock } from './Shared';

export const TemplatesModule = () => (
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

export const ExamTipsModule = () => (
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

export const PracticeModule = () => {
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
