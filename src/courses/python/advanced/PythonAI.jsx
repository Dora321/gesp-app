import React, { useState, useEffect } from 'react';
import { Brain, Cpu, Database, Eye, Activity, Play, ArrowRight, RefreshCw, Zap, Target, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import PythonProjectSupport from '../../../components/PythonProjectSupport';
import PythonLessonShell from '../shell/PythonLessonShell';

// --- Shared Components ---
const Button = ({ onClick, children, className, variant = 'primary', disabled = false }) => {
    const baseStyle = "px-4 py-2 rounded-lg font-bold transition-all transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
        primary: "bg-yellow-500 text-black hover:bg-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.4)]",
        secondary: "bg-slate-800 text-yellow-400 border border-yellow-500/30 hover:bg-slate-700",
        success: "bg-green-500 text-white hover:bg-green-600 shadow-[0_0_15px_rgba(34,197,94,0.4)]",
    };
    return (
        <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
            {children}
        </button>
    );
};

// --- Visualization Components ---

// 1. KNN Classification Demo
const KNNDemo = () => {
    const [points, setPoints] = useState([
        { x: 20, y: 80, type: 'cat' }, { x: 30, y: 70, type: 'cat' }, { x: 25, y: 90, type: 'cat' },
        { x: 80, y: 20, type: 'dog' }, { x: 70, y: 30, type: 'dog' }, { x: 90, y: 25, type: 'dog' },
    ]);
    const [newPoint, setNewPoint] = useState(null);
    const [result, setResult] = useState(null);

    const handlePlace = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setNewPoint({ x, y });
        setResult(null); // Reset result
    };

    const predict = () => {
        if (!newPoint) return;
        // Simple 1-NN (Nearest Neighbor)
        let minDist = Infinity;
        let nearestType = '';

        points.forEach(p => {
            const d = Math.sqrt(Math.pow(p.x - newPoint.x, 2) + Math.pow(p.y - newPoint.y, 2));
            if (d < minDist) {
                minDist = d;
                nearestType = p.type;
            }
        });

        // Simulate a delay
        setTimeout(() => {
            setResult(nearestType);
            if (nearestType) {
                setPoints([...points, { ...newPoint, type: nearestType }]);
                setNewPoint(null);
            }
        }, 500);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                    <Target size={20} /> 这是一个什么动物？(KNN 算法)
                </h3>
                <p className="text-slate-300 mb-4">
                    点击屏幕放置一个新点。机器会计算它离谁最近，从而判断它是猫还是狗。
                    <br /><span className="text-xs text-slate-500">原理：近朱者赤，近墨者黑 (K-Nearest Neighbors)</span>
                </p>

                <div className="relative w-full h-80 bg-slate-900 rounded-xl border-2 border-slate-700 overflow-hidden cursor-crosshair" onClick={handlePlace}>
                    {/* Grid lines */}
                    <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-10 pointer-events-none">
                        {[...Array(16)].map((_, i) => <div key={i} className="border border-slate-500"></div>)}
                    </div>

                    {/* Existing Points */}
                    {points.map((p, i) => (
                        <div
                            key={i}
                            className={`
                                absolute w-8 h-8 -ml-4 -mt-4 flex items-center justify-center text-lg shadow-sm transition-all
                                ${p.type === 'cat' ? 'text-indigo-400' : 'text-orange-400'}
                            `}
                            style={{ left: `${p.x}%`, top: `${p.y}%` }}
                        >
                            {p.type === 'cat' ? '🐱' : '🐶'}
                        </div>
                    ))}

                    {/* New Point */}
                    {newPoint && (
                        <div
                            className="absolute w-8 h-8 -ml-4 -mt-4 bg-white rounded-full opacity-80 animate-pulse border-2 border-yellow-400"
                            style={{ left: `${newPoint.x}%`, top: `${newPoint.y}%` }}
                        ></div>
                    )}
                </div>

                <div className="mt-4 flex justify-between items-center h-12">
                    <div className="text-slate-400 text-sm">
                        {newPoint ? '位置已选定，点击预测...' : '请在上方黑框中点击...'}
                    </div>
                    <Button onClick={predict} disabled={!newPoint} variant="primary">
                        {result ? `识别结果: ${result === 'cat' ? '🐱 猫' : '🐶 狗'}` : '🤖 开始预测'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

// 2. Neural Network Visualization
const NNDemo = () => {
    const [training, setTraining] = useState(false);
    const [epoch, setEpoch] = useState(0);
    const [loss, setLoss] = useState(1.0);

    useEffect(() => {
        let interval;
        if (training) {
            interval = setInterval(() => {
                setEpoch(e => {
                    if (e >= 100) {
                        setTraining(false);
                        return 100;
                    }
                    return e + 1;
                });
                setLoss(l => Math.max(0.01, l * 0.95));
            }, 50);
        }
        return () => clearInterval(interval);
    }, [training]);

    const startTraining = () => {
        setEpoch(0);
        setLoss(1.0);
        setTraining(true);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                    <Activity size={20} /> 神经网络训练 (Neural Networks)
                </h3>
                <p className="text-slate-300 mb-6">
                    大脑由无数个神经元连接而成。AI 模仿这个结构，通过不断“训练”来减少犯错（Loss）。
                </p>

                <div className="flex flex-col md:flex-row gap-8 items-center">
                    {/* Network Viz */}
                    <div className="flex-1 flex justify-center gap-12 relative">
                        {/* Input Layer */}
                        <div className="flex flex-col gap-4 justify-center">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-500 flex items-center justify-center text-xs text-slate-300 shadow-lg">In{i}</div>
                            ))}
                        </div>

                        {/* Connecting Lines (Simulated SVG) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                            {[0, 1, 2].map(i => [0, 1, 2, 3].map(j => (
                                <line
                                    key={`${i}-${j}`}
                                    x1="50" y1={40 + i * 56}
                                    x2="150" y2={30 + j * 45}
                                    stroke={training ? '#eab308' : '#64748b'}
                                    strokeWidth={training ? Math.random() * 2 + 0.5 : 1}
                                    className="transition-colors duration-300"
                                />
                            )))}
                            {[0, 1, 2, 3].map(i => [0, 1].map(j => (
                                <line
                                    key={`h-${i}-${j}`}
                                    x1="190" y1={30 + i * 45}
                                    x2="290" y2={60 + j * 60}
                                    stroke={training ? '#22c55e' : '#64748b'}
                                    strokeWidth={training ? Math.random() * 2 + 0.5 : 1}
                                    className="transition-colors duration-300"
                                />
                            )))}
                        </svg>

                        {/* Hidden Layer */}
                        <div className="flex flex-col gap-4 justify-center z-10">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className={`w-10 h-10 rounded-full border-2 transition-colors duration-300 ${training ? 'bg-yellow-500/20 border-yellow-400 animate-pulse' : 'bg-slate-700 border-slate-500'}`}></div>
                            ))}
                        </div>

                        {/* Output Layer */}
                        <div className="flex flex-col gap-8 justify-center z-10">
                            {[1, 2].map(i => (
                                <div key={i} className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-colors duration-300 ${training ? 'bg-green-500/20 border-green-400' : 'bg-slate-700 border-slate-500 text-slate-400'}`}>Out{i}</div>
                            ))}
                        </div>
                    </div>

                    {/* Metrics Controls */}
                    <div className="w-full md:w-64 space-y-4">
                        <div className="bg-black/30 p-4 rounded-xl border border-slate-700 font-mono text-sm space-y-2">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Epoch:</span>
                                <span className="text-white">{epoch} / 100</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Loss:</span>
                                <span className={loss < 0.1 ? 'text-green-400' : 'text-red-400'}>{loss.toFixed(4)}</span>
                            </div>
                            {/* Progress Bar */}
                            <div className="w-full h-2 bg-slate-700 rounded-full mt-2 overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-yellow-500 to-green-500 transition-all duration-75" style={{ width: `${epoch}%` }}></div>
                            </div>
                        </div>

                        <Button onClick={startTraining} disabled={training} className="w-full">
                            {training ? '训练中...' : '🔥 开始训练模型'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};



// 3. Linear Regression Demo
const LinearRegressionDemo = () => {
    const [points, setPoints] = useState([]);
    const [line, setLine] = useState(null); // { m, b }

    const handlePlace = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = 100 - ((e.clientY - rect.top) / rect.height) * 100; // Flip Y for cartesian-like feel
        setPoints([...points, { x, y }]);
        setLine(null); // Reset line on new point
    };

    const trainModel = () => {
        if (points.length < 2) return;

        // Simple Least Squares
        const n = points.length;
        let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;

        points.forEach(p => {
            sumX += p.x;
            sumY += p.y;
            sumXY += p.x * p.y;
            sumXX += p.x * p.x;
        });

        const m = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const b = (sumY - m * sumX) / n;

        setLine({ m, b });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                    <Activity size={20} /> 线性回归 (Linear Regression)
                </h3>
                <p className="text-slate-300 mb-4">
                    点击屏幕放置数据点。AI 会尝试画一条直线来“拟合”这些点，找出它们之间的规律。
                    <br /><span className="text-xs text-slate-500">原理：最小二乘法 (Least Squares)</span>
                </p>

                <div className="relative w-full h-80 bg-slate-900 rounded-xl border-2 border-slate-700 overflow-hidden cursor-crosshair" onClick={handlePlace}>
                    {/* Grid lines */}
                    <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-10 pointer-events-none">
                        {[...Array(16)].map((_, i) => <div key={i} className="border border-slate-500"></div>)}
                    </div>

                    {/* Points */}
                    {points.map((p, i) => (
                        <div
                            key={i}
                            className="absolute w-3 h-3 bg-blue-500 rounded-full shadow-lg border border-white"
                            style={{ left: `${p.x}%`, bottom: `${p.y}%`, transform: 'translate(-50%, 50%)' }}
                        ></div>
                    ))}

                    {/* Regression Line */}
                    {line && (
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            <line
                                x1="0%"
                                y1={`${100 - (line.m * 0 + line.b)}%`}
                                x2="100%"
                                y2={`${100 - (line.m * 100 + line.b)}%`}
                                stroke="#3b82f6"
                                strokeWidth="4"
                                strokeDasharray="10,5"
                                className="animate-in fade-in duration-1000"
                            />
                        </svg>
                    )}
                </div>

                <div className="mt-4 flex justify-between items-center h-12">
                    <div className="text-slate-400 text-sm">
                        {points.length > 0 ? `已有点数: ${points.length}` : '请点击上方区域添加数据点...'}
                    </div>
                    <Button onClick={trainModel} disabled={points.length < 2} variant="primary" className="bg-blue-500 hover:bg-blue-600 shadow-blue-500/20 text-white">
                        {line ? '⚡ 已拟合' : '📐 训练模型'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

// 4. Quiz Section
const Quiz = () => {
    const questions = [
        {
            q: "KNN (K-Nearest Neighbors) 主要是用来做什么的？",
            options: ["分类 (Classification)", "回归 (Regression)", "聚类 (Clustering)"],
            a: 0
        },
        {
            q: "在神经网络中，Loss (损失) 代表什么？",
            options: ["网络的层数", "模型的准确度", "模型预测与真实值的误差"],
            a: 2
        },
        {
            q: "线性回归试图找到什么样的线？",
            options: ["连接所有点的折线", "拟合数据趋势的直线", "任意曲线"],
            a: 1
        }
    ];

    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleSelect = (qIdx, oIdx) => {
        if (submitted) return;
        setAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
    };

    const getScore = () => {
        let score = 0;
        questions.forEach((q, i) => {
            if (answers[i] === q.a) score++;
        });
        return score;
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                <h3 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
                    <Brain size={24} /> 知识小测验
                </h3>

                <div className="space-y-8">
                    {questions.map((q, i) => (
                        <div key={i} className="space-y-3">
                            <p className="font-semibold text-lg text-white">{i + 1}. {q.q}</p>
                            <div className="space-y-2">
                                {q.options.map((opt, oIdx) => {
                                    const isSelected = answers[i] === oIdx;
                                    const isCorrect = q.a === oIdx;
                                    const showResult = submitted;

                                    let btnClass = "w-full text-left p-3 rounded-lg border transition-all ";
                                    if (showResult) {
                                        if (isCorrect) btnClass += "bg-green-500/20 border-green-500 text-green-300";
                                        else if (isSelected) btnClass += "bg-red-500/20 border-red-500 text-red-300";
                                        else btnClass += "border-slate-700 text-slate-500 opacity-50";
                                    } else {
                                        if (isSelected) btnClass += "bg-yellow-500/20 border-yellow-500 text-yellow-300";
                                        else btnClass += "bg-slate-900/50 border-slate-700 hover:bg-slate-700";
                                    }

                                    return (
                                        <button
                                            key={oIdx}
                                            onClick={() => handleSelect(i, oIdx)}
                                            className={btnClass}
                                            disabled={submitted}
                                        >
                                            {opt}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-700 flex justify-between items-center">
                    <div className="text-slate-300">
                        {submitted && <span className="font-bold text-xl">得分: {getScore()} / {questions.length}</span>}
                    </div>
                    <Button
                        onClick={() => setSubmitted(true)}
                        disabled={Object.keys(answers).length < questions.length || submitted}
                        className={submitted ? 'opacity-50' : ''}
                    >
                        {submitted ? '🎉 完成' : '提交答案'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

const sections = [
    { id: 1, title: '机器学习基础 (KNN)', category: '最近邻分类', icon: Target, component: KNNDemo },
    { id: 2, title: '神经网络可视化', category: '神经元直觉', icon: Activity, component: NNDemo },
    { id: 3, title: '线性回归 (Regression)', category: '拟合一条线', icon: Activity, component: LinearRegressionDemo },
    { id: 4, title: '课后测验 (Quiz)', category: '复盘', icon: Brain, component: Quiz },
];

export default function PythonAI() {
    return (
        <PythonLessonShell
            eyebrow="PYTHON 项目"
            lessonCode="A8"
            lessonTitle="AI 初探"
            lessonSubtitle="看懂 AI 不是魔法，是找规律"
            accent="indigo"
            theme="dark"
            hero={{
                title: 'AI 不是魔法，而是从数据里找规律',
                description: '用可视化理解 KNN 分类、神经网络和线性回归——建立对 AI 的直观认知和边界意识。',
            }}
            sections={sections}
            previousPath="/python/a2"
            nextPath="/python/crawler"
            nextLabel="下一个：A9 网络爬虫"
            topSupport={<PythonProjectSupport projectId="ai" theme="dark" />}
            bottomSupport={<PythonProjectSupport projectId="ai" placement="bottom" theme="dark" />}
        />
    );
}

