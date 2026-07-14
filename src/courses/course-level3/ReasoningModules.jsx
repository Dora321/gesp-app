import { useState, useEffect } from 'react';
import { Code, CheckCircle, AlertTriangle, Play, Calculator, Cpu, Eye, Info, ArrowRightLeft, RefreshCw } from 'lucide-react';
import { Card, Button, CodeBlock } from './Shared';

export const BitModule = () => {
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

export const MathModule = () => {
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

export const CheckListModule = () => {
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

export const CodeTraceModule = () => {
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
