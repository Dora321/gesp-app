import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Key, Music, Lock, Unlock, Check, X, ArrowRight, Play, Info, Volume2, Lightbulb, RefreshCw, Trophy } from 'lucide-react';

// --- Utility Functions ---

const morseDict = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
    'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
    'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
    'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
    'Z': '--..',
    '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
    '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
    ' ': '/'
};

const encode = (text) => {
    return text.toUpperCase().split('').map(char => morseDict[char] || '?').join(' ');
};

// --- Audio Utility ---
const playTone = (duration, freq = 800) => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
};

// --- Slides ---

// 1. Intro Slide (With Typing Effect)
const IntroSlide = () => {
    const [text, setText] = useState('');
    const fullText = "TOP_SECRET_BRIEFING.TXT\n\n特工编号：Student_007\n任务代号：莫斯行动 (Operation Morse)\n状态：高度机密\n\n在数字时代之前，我们如何传递不可破解的情报？\n答案就在那些简单的“滴”与“答”之中。\n\n准备好从零通过 Python 制造你的专属发报机了吗？";

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            setText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(timer);
        }, 30);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="slide-enter space-y-8 h-full flex flex-col justify-center">
            <div className="bg-slate-900 text-green-400 p-6 rounded-xl font-mono border-l-4 border-green-500 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-green-500/20 animate-pulse"></div>
                <div className="whitespace-pre-wrap leading-relaxed min-h-[200px]">
                    {text}
                    <span className="animate-pulse inline-block w-2 h-4 bg-green-400 ml-1 align-middle"></span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800 p-6 rounded-xl flex flex-col items-center justify-center text-center border border-slate-700 hover:border-green-500 transition-colors group cursor-pointer" onClick={() => playTone(0.1)}>
                    <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                        <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                    </div>
                    <h3 className="font-bold text-white mb-1">滴 (Di)</h3>
                    <p className="text-xs text-slate-400">短信号 (Click me)</p>
                </div>
                <div className="bg-slate-800 p-6 rounded-xl flex flex-col items-center justify-center text-center border border-slate-700 hover:border-green-500 transition-colors group cursor-pointer" onClick={() => playTone(0.3)}>
                    <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                        <div className="w-8 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <h3 className="font-bold text-white mb-1">答 (Da)</h3>
                    <p className="text-xs text-slate-400">长信号 (Click me)</p>
                </div>
            </div>
        </div>
    );
};

// 2. Interactive Simulator (With Real Audio & Visual Sync)
const SimulatorSlide = () => {
    const [input, setInput] = useState('SOS');
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeSignal, setActiveSignal] = useState(null); // '.' or '-' or null

    const playSequence = async () => {
        if (isPlaying) return;
        setIsPlaying(true);
        const code = encode(input);
        const symbols = code.split('');

        for (let s of symbols) {
            setActiveSignal(s);
            if (s === '.') {
                playTone(0.1);
                await new Promise(r => setTimeout(r, 100)); // sound duration
                await new Promise(r => setTimeout(r, 100)); // gap
            } else if (s === '-') {
                playTone(0.3);
                await new Promise(r => setTimeout(r, 300)); // sound duration
                await new Promise(r => setTimeout(r, 100)); // gap
            } else if (s === ' ' || s === '/') {
                await new Promise(r => setTimeout(r, 300)); // word gap
            }
            setActiveSignal(null);
        }
        setIsPlaying(false);
    };

    return (
        <div className="slide-enter space-y-6">
            <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
                <Volume2 size={24} /> 摩斯电台模拟器
            </h2>

            <div className="bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-700 relative">
                {/* Signal Light */}
                <div className={`absolute top-4 right-4 w-6 h-6 rounded-full transition-all duration-75 ${activeSignal ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)] scale-110' : 'bg-slate-800 border border-slate-700'}`}></div>

                <div className="mb-6">
                    <label className="block text-slate-400 text-sm font-bold mb-2">输入情报 (English Only)</label>
                    <div className="flex gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 bg-slate-800 text-white p-4 rounded-xl font-mono text-xl border border-slate-600 focus:border-cyan-500 outline-none uppercase placeholder-slate-600 tracking-wider"
                            placeholder="HELLO"
                            maxLength={20}
                        />
                        <button
                            onClick={playSequence}
                            disabled={isPlaying || !input}
                            className={`px-6 rounded-xl font-bold flex items-center justify-center transition-all ${isPlaying ? 'bg-slate-700 text-slate-500' : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg cursor-pointer'}`}
                        >
                            {isPlaying ? <RefreshCw className="animate-spin" /> : <Play fill="currentColor" />}
                        </button>
                    </div>
                </div>

                <div className="bg-black/80 p-6 rounded-xl border border-cyan-500/30 min-h-[120px] flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="text-xs text-slate-500 mb-2 font-mono">SIGNAL OUPUT</div>
                    <div className={`text-2xl md:text-3xl font-mono font-bold tracking-widest break-all ${isPlaying ? 'text-green-400' : 'text-cyan-400'}`}>
                        {encode(input).split('').map((char, idx) => {
                            // Minimal highlight logic could go here, but complex to sync perfectly with simple loop
                            return <span key={idx} className={activeSignal && isPlaying ? "opacity-100" : "opacity-80"}>{char}</span>
                        })}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-8 gap-2 text-xs font-mono text-slate-500">
                {Object.entries(morseDict).slice(0, 16).map(([k, v]) => (
                    <div key={k} className="bg-slate-800/50 p-1.5 rounded text-center border border-slate-700/50 hover:bg-slate-700 transition">
                        <span className="font-bold text-white block">{k}</span> <span className="text-cyan-400">{v}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// 3. Quiz Slide (New Feature)
const QuizSlide = () => {
    const questions = [
        { q: 'SOS', hint: '国际通用求救信号' },
        { q: 'PYTHON', hint: '最好的编程语言' },
        { q: 'HI', hint: '打招呼' },
        { q: 'AI', hint: '人工智能' },
        { q: 'CODE', hint: '程序员每天写的东西' }
    ];

    const [currentQ, setCurrentQ] = useState(0);
    const [userGuess, setUserGuess] = useState('');
    const [status, setStatus] = useState('idle'); // idle, playing, correct, wrong
    const [isPlaying, setIsPlaying] = useState(false);

    const playQuestion = async () => {
        if (isPlaying) return;
        setIsPlaying(true);
        const code = encode(questions[currentQ].q);
        const symbols = code.split('');

        for (let s of symbols) {
            if (s === '.') {
                playTone(0.1);
                await new Promise(r => setTimeout(r, 200));
            } else if (s === '-') {
                playTone(0.3);
                await new Promise(r => setTimeout(r, 400));
            } else if (s === ' ' || s === '/') {
                await new Promise(r => setTimeout(r, 400));
            }
        }
        setIsPlaying(false);
    };

    const checkAnswer = () => {
        if (userGuess.toUpperCase() === questions[currentQ].q) {
            setStatus('correct');
            playTone(0.05, 1200); // Success ping
            setTimeout(() => playTone(0.05, 1200), 100);
        } else {
            setStatus('wrong');
            playTone(0.3, 200); // Error buzz
        }
    };

    const nextQuestion = () => {
        setCurrentQ((prev) => (prev + 1) % questions.length);
        setUserGuess('');
        setStatus('idle');
    };

    return (
        <div className="slide-enter space-y-6">
            <h2 className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
                <Trophy size={24} /> 听力挑战 LEVEL {currentQ + 1}
            </h2>

            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700 text-center space-y-6">
                <div className="flex justify-center">
                    <button
                        onClick={playQuestion}
                        disabled={isPlaying}
                        className={`w-24 h-24 rounded-full flex items-center justify-center border-4 transition-all ${isPlaying ? 'bg-yellow-900/20 border-yellow-600 scale-95' : 'bg-slate-800 border-yellow-500 hover:scale-105 hover:bg-slate-700 shadow-[0_0_30px_rgba(234,179,8,0.3)]'}`}
                    >
                        {isPlaying ? <Volume2 size={40} className="text-yellow-500 animate-pulse" /> : <Play size={40} className="text-yellow-400 ml-1" />}
                    </button>
                </div>

                <p className="text-slate-400 text-sm flex items-center justify-center gap-2">
                    <Lightbulb size={16} /> 提示: {questions[currentQ].hint}
                </p>

                <div className="max-w-xs mx-auto space-y-4">
                    <input
                        value={userGuess}
                        onChange={(e) => {
                            setUserGuess(e.target.value);
                            setStatus('idle');
                        }}
                        placeholder="输入你听到的单词..."
                        className={`w-full bg-slate-800 text-center text-xl font-bold text-white p-3 rounded-lg border-2 outline-none uppercase transition-colors ${status === 'correct' ? 'border-green-500' : status === 'wrong' ? 'border-red-500' : 'border-slate-600 focus:border-yellow-500'}`}
                    />

                    {status === 'idle' && (
                        <button onClick={checkAnswer} className="w-full py-3 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg font-bold transition-colors">
                            提交答案
                        </button>
                    )}

                    {status === 'correct' && (
                        <div className="animate-bounce">
                            <button onClick={nextQuestion} className="w-full py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold flex items-center justify-center gap-2">
                                <Check size={20} /> 正确！下一题
                            </button>
                        </div>
                    )}

                    {status === 'wrong' && (
                        <div className="text-red-400 font-bold flex items-center justify-center gap-2">
                            <X size={20} /> 听错了，再试试？
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// 4. Coding Slide
const CodingSlide = () => (
    <div className="slide-enter space-y-6 h-full flex flex-col">
        <h2 className="text-2xl font-bold text-blue-400 flex items-center gap-2">
            <Terminal size={24} /> 核心代码解密
        </h2>
        <div className="grid lg:grid-cols-2 gap-6 flex-1 overflow-hidden">
            <div className="space-y-4 overflow-y-auto pr-2">
                <div className="bg-slate-800 p-4 rounded-xl border-l-4 border-blue-500">
                    <h3 className="font-bold text-white mb-1 flex items-center gap-2"><span className="bg-blue-500 text-xs px-2 py-0.5 rounded text-white">STEP 1</span> 密码本</h3>
                    <p className="text-slate-400 text-sm">
                        在 Python 中使用 <code className="text-blue-300">dict</code> (字典) 存储映射关系。Key 是字母，Value 是摩斯码。
                    </p>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl border-l-4 border-purple-500">
                    <h3 className="font-bold text-white mb-1 flex items-center gap-2"><span className="bg-purple-500 text-xs px-2 py-0.5 rounded text-white">STEP 2</span> 翻译逻辑</h3>
                    <p className="text-slate-400 text-sm">
                        <code className="text-purple-300">for char in msg:</code> 遍历每个字符。
                        如果字典里有，就查出来；如果不认识（比如中文），就用 <code className="text-purple-300">?</code> 代替。
                    </p>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl border-l-4 border-green-500">
                    <h3 className="font-bold text-white mb-1 flex items-center gap-2"><span className="bg-green-500 text-xs px-2 py-0.5 rounded text-white">STEP 3</span> 拼接</h3>
                    <p className="text-slate-400 text-sm">
                        将查到的密码拼接到结果字符串中，别忘了每个字母之间加个空格，方便区分！
                    </p>
                </div>
            </div>

            <div className="bg-slate-900 rounded-xl p-4 overflow-auto border border-slate-700 shadow-inner font-mono text-sm relative group">
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">Python</span>
                </div>
                <pre className="text-slate-300 leading-relaxed">
                    <span className="text-pink-400"># 1. 定义摩斯密码字典</span>{'\n'}
                    morse_dict = {'{'}{'\n'}
                    {'    '}<span className="text-green-400">'A'</span>: <span className="text-yellow-300">'.-'</span>,{'\n'}
                    {'    '}<span className="text-green-400">'B'</span>: <span className="text-yellow-300">'-...'</span>,{'\n'}
                    {'    '}<span className="text-green-400">' '</span>: <span className="text-yellow-300">'/'</span>{'\n'}
                    {'}'}{'\n'}
                    {'\n'}
                    <span className="text-pink-400"># 2. 获取用户输入</span>{'\n'}
                    message = <span className="text-blue-400">input</span>(<span className="text-green-400">"请输入消息: "</span>).upper(){'\n'}
                    result = <span className="text-green-400">""</span>{'\n'}
                    {'\n'}
                    <span className="text-pink-400"># 3. 循环转换</span>{'\n'}
                    <span className="text-purple-400">for</span> char <span className="text-purple-400">in</span> message:{'\n'}
                    {'    '}<span className="text-purple-400">if</span> char <span className="text-purple-400">in</span> morse_dict:{'\n'}
                    {'        '}<span className="text-slate-500"># 查字典，加空格分隔</span>{'\n'}
                    {'        '}result += morse_dict[char] + <span className="text-green-400">" "</span>{'\n'}
                    {'    '}<span className="text-purple-400">else</span>:{'\n'}
                    {'        '}<span className="text-slate-500"># 未知字符</span>{'\n'}
                    {'        '}result += <span className="text-green-400">"? "</span>{'\n'}
                    {'\n'}
                    <span className="text-pink-400"># 4. 输出结果</span>{'\n'}
                    <span className="text-blue-400">print</span>(<span className="text-green-400">"发送: "</span> + result)
                </pre>
            </div>
        </div>
    </div>
);

// 5. Advanced Challenge
const AdvancedSlide = () => (
    <div className="slide-enter space-y-8 text-center h-full flex flex-col justify-center">
        <h2 className="text-3xl font-black text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            特工进阶任务
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-purple-500 transition-all hover:scale-105 group">
                <div className="w-16 h-16 bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform">
                    <Volume2 size={32} className="text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">挑战 1：真实发声</h3>
                <p className="text-slate-400 text-sm mb-4">
                    使用 Python 的 <code className="bg-slate-900 px-1 rounded text-purple-300">winsound</code> 模块，让你的程序真的“滴滴答答”响起来！
                </p>
                <div className="bg-black/50 p-2 rounded text-left">
                    <code className="text-xs font-mono text-purple-300">
                        import winsound<br />
                        winsound.Beep(800, 200) <span className="text-slate-500"># 频率800Hz, 200ms</span>
                    </code>
                </div>
            </div>

            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-pink-500 transition-all hover:scale-105 group">
                <div className="w-16 h-16 bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:-rotate-12 transition-transform">
                    <Unlock size={32} className="text-pink-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">挑战 2：编写解密机</h3>
                <p className="text-slate-400 text-sm mb-4">
                    既然能编码，那能解码吗？<br />
                    输入 <code className="bg-slate-900 px-1 rounded text-pink-300">... --- ...</code>，输出 <code className="bg-slate-900 px-1 rounded text-green-300">SOS</code>。
                    提示：你需要翻转字典！
                </p>
            </div>
        </div>
    </div>
);


const PythonMorseProject = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        { id: 'intro', component: <IntroSlide /> },
        { id: 'sim', component: <SimulatorSlide /> },
        { id: 'quiz', component: <QuizSlide /> },
        { id: 'code', component: <CodingSlide /> },
        { id: 'adv', component: <AdvancedSlide /> }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-cyan-500/30">
            {/* Header */}
            <div className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-10">
                <h1 className="font-bold text-lg flex items-center gap-2 text-cyan-400">
                    <Link to="/" className="hover:opacity-80 transition-opacity">
                        <img src="/logo.jpg" alt="Logo" className="w-8 h-8 rounded-lg object-cover border border-slate-700" />
                    </Link>
                    Project: Morse Translator
                </h1>
                <div className="flex gap-2">
                    {slides.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-cyan-500 w-8' : 'bg-slate-700 w-2 hover:bg-slate-600'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 relative p-4 md:p-8 flex items-center justify-center overflow-hidden">
                <div className="w-full max-w-5xl h-full flex flex-col transition-all duration-500 ease-in-out">
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {slides[currentSlide].component}
                    </div>
                </div>
            </div>

            {/* Footer Controls */}
            <div className="h-20 bg-slate-900 border-t border-slate-800 flex items-center justify-between px-8">
                <button
                    onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                    disabled={currentSlide === 0}
                    className="px-6 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold text-slate-300"
                >
                    Previous
                </button>
                <div className="text-slate-500 text-sm font-mono hidden md:block">
                    SLIDE {currentSlide + 1} / {slides.length}
                </div>
                <button
                    onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
                    disabled={currentSlide === slides.length - 1}
                    className="px-6 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold shadow-lg shadow-cyan-900/20 hover:shadow-cyan-500/30 flex items-center gap-2"
                >
                    Next <ArrowRight size={18} />
                </button>
            </div>

            <style>{`
                .slide-enter {
                    animation: fadeIn 0.5s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #0f172a; 
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #334155; 
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #475569; 
                }
            `}</style>
        </div>
    );
};

export default PythonMorseProject;
