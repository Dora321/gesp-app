import React, { useState, useEffect } from 'react';
import { Brain, Cpu, Database, Eye, Activity, Play, ArrowRight, RefreshCw, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

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


const sections = [
    { id: 1, title: '机器学习基础 (KNN)', icon: Target, component: KNNDemo },
    { id: 2, title: '神经网络可视化', icon: Activity, component: NNDemo },
];

export default function PythonAI() {
    const [activeSection, setActiveSection] = useState(1);
    const ActiveComponent = sections.find(s => s.id === activeSection)?.component || (() => <div>Coming Soon</div>);

    return (
        <div className="flex h-screen bg-slate-900 font-sans text-slate-200 selection:bg-yellow-500/30">
            {/* Sidebar */}
            <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col flex-shrink-0">
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center gap-2">
                        <Link to="/" className="hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden border border-slate-700">
                                <span className="text-lg">🤖</span>
                            </div>
                        </Link>
                        A3: AI 初探
                    </h1>
                    <p className="text-xs text-slate-500 mt-2 font-medium">Python 进阶项目</p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 font-medium border
                        ${activeSection === section.id
                                    ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30 shadow-[0_0_10px_rgba(234,179,8,0.1)]'
                                    : 'border-transparent text-slate-500 hover:bg-slate-800 hover:text-slate-300'}
                    `}
                        >
                            <section.icon size={18} className={activeSection === section.id ? 'text-yellow-400' : 'text-slate-600'} />
                            {section.title}
                        </button>
                    ))}
                </div>

                <div className="p-4 border-t border-slate-800 bg-black/20">
                    <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border border-yellow-500/20 rounded-xl p-4 text-slate-300 shadow-lg transform hover:scale-105 transition-transform cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-yellow-500/50 text-xs font-bold uppercase tracking-wider">NEXT</span>
                            <Zap size={16} className="text-yellow-500/50" />
                        </div>
                        <div className="font-bold text-sm text-yellow-100">A4: 网络爬虫实战</div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-8 relative">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1),rgba(0,0,0,1))] -z-10"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-600/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="max-w-4xl mx-auto">
                    <header className="mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                            <span className="p-2 bg-yellow-500/10 rounded-lg">
                                {React.createElement(sections.find(s => s.id === activeSection)?.icon, { size: 32, className: 'text-yellow-400' })}
                            </span>
                            {sections.find(s => s.id === activeSection)?.title}
                        </h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mt-4"></div>
                    </header>

                    <ActiveComponent />

                    <div className="mt-12 flex justify-between border-t border-slate-800 pt-8">
                        <Button
                            variant="secondary"
                            onClick={() => setActiveSection(prev => Math.max(1, prev - 1))}
                            className={activeSection === 1 ? 'opacity-0 pointer-events-none' : ''}
                        >
                            上一章
                        </Button>
                        <Button
                            onClick={() => setActiveSection(prev => Math.min(sections.length, prev + 1))}
                            className={activeSection === sections.length ? 'opacity-0 pointer-events-none' : ''}
                        >
                            继续学习 <ArrowRight size={18} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
