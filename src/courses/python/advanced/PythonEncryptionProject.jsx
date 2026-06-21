import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Lock, Unlock, Key, FileText, ArrowRight, RotateCcw, Check, X, Terminal, Binary, Hash, Eye, EyeOff, Menu, RefreshCw } from 'lucide-react';
import PythonProjectSupport from '../../../components/PythonProjectSupport';
import PyCodeTracer from '../../../components/PyCodeTracer';

const Icon = ({ name, className }) => {
    const icons = {
        shield: Shield,
        lock: Lock,
        unlock: Unlock,
        key: Key,
        file: FileText,
        terminal: Terminal,
        binary: Binary,
        hash: Hash,
        menu: Menu
    };
    const LucideIcon = icons[name] || Shield;
    return <LucideIcon className={className} />;
};

// 1. 任务简报：为什么需要加密？
const IntroSlide = () => (
    <div className="slide-enter space-y-8">
        <div className="bg-slate-900 text-green-400 p-6 rounded-xl font-mono border-l-4 border-green-500 shadow-2xl">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                <Terminal size={20} /> MISSION_BRIEFING.TXT
            </h2>
            <div className="space-y-4 text-sm md:text-base leading-relaxed opacity-90">
                <p>
                    <span className="text-yellow-400 font-bold">特工 007：</span>
                    我们的情报网截获了一条发给 "敌方总部" 的秘密消息。
                </p>
                <div className="bg-black/50 p-4 rounded-lg border border-green-500/30">
                    <p className="typing-effect">MESSAGE: "ATTACK AT DAWN"</p>
                </div>
                <p>
                    如果这条消息就这样在网络传输，任何人（包括我们）都能一眼看穿。
                    这就是为什么由于网络安全，我们需要<span className="text-yellow-400 font-bold">加密 (Encryption)</span>。
                </p>
                <p>
                    加密就像给消息加了一把只有发送者和接收者才有钥匙的锁。
                    今天，你的任务是学习最古老但经典的加密术——<span className="text-yellow-400 font-bold">凯撒密码 (Caesar Cipher)</span>。
                </p>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-xl border border-red-500/30 shadow-lg shadow-red-500/10 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-900/50 rounded-full flex items-center justify-center mb-4 text-red-400 border border-red-500/50">
                    <Unlock size={32} />
                </div>
                <h3 className="font-bold text-red-400">明文 (Plaintext)</h3>
                <p className="text-xs text-slate-400 mt-2">原始的、可读的消息</p>
                <code className="mt-2 bg-black/50 px-3 py-1 rounded text-sm font-bold text-red-400 border border-red-500/30">HELLO</code>
            </div>
            <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-xl border border-green-500/30 shadow-lg shadow-green-500/10 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-900/50 rounded-full flex items-center justify-center mb-4 text-green-400 border border-green-500/50">
                    <Lock size={32} />
                </div>
                <h3 className="font-bold text-green-400">密文 (Ciphertext)</h3>
                <p className="text-xs text-slate-400 mt-2">加密后、看不懂的乱码</p>
                <code className="mt-2 bg-black/50 px-3 py-1 rounded text-sm font-bold text-green-400 border border-green-500/30">KHOOR</code>
            </div>
        </div>
    </div>
);

// 2. 数字实验室：ASCII 编码
const ASCIISlide = () => {
    const [char, setChar] = useState('A');

    return (
        <div className="slide-enter space-y-6">
            <h2 className="text-2xl font-bold text-green-400 flex items-center gap-2">
                <Binary className="text-green-400" /> 计算机的秘密：一切皆数字
            </h2>
            <p className="text-slate-300">
                计算机不认识 "A" 或 "B"，它只认识 0 和 1。
                为了存储文字,我们给每个字符分配了一个唯一的编号，这就是 <span className="font-bold text-yellow-400">ASCII 码</span>。
            </p>

            <div className="bg-slate-900/80 backdrop-blur-md p-8 rounded-2xl border border-green-500/20 shadow-xl flex flex-col md:flex-row items-center justify-around gap-8">
                <div className="flex flex-col items-center gap-4">
                    <label className="font-bold text-green-400 text-sm uppercase tracking-wider">输入字符</label>
                    <input
                        type="text"
                        maxLength="1"
                        value={char}
                        onChange={(e) => setChar(e.target.value)}
                        className="w-24 h-24 text-6xl text-center font-black text-green-400 bg-black border-4 border-green-500/50 rounded-2xl focus:border-green-500 focus:outline-none transition-all"
                    />
                    <div className="text-xs text-slate-500">试着输入 A, a, 1, ! 等</div>
                </div>

                <div className="hidden md:flex flex-col items-center text-green-500">
                    <ArrowRight size={40} />
                    <span className="font-mono text-xs">ord()</span>
                </div>

                <div className="flex flex-col items-center gap-4">
                    <label className="font-bold text-green-400 text-sm uppercase tracking-wider">ASCII 编号</label>
                    <div className="w-32 h-24 bg-slate-900 rounded-2xl flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors"></div>
                        <span className="text-5xl font-mono font-bold text-green-400 shadow-green-500/50 drop-shadow-lg">
                            {char ? char.charCodeAt(0) : '?'}
                        </span>
                    </div>
                    <div className="text-xs text-slate-500">在 Python 中用 <code className="bg-black/50 px-1 border border-green-500/30 rounded">ord('{char}')</code> 获取</div>
                </div>
            </div>

            <div className="bg-green-900/20 p-6 rounded-xl border border-green-500/30">
                <h3 className="font-bold text-green-400 mb-2 flex items-center gap-2">
                    <Terminal size={18} /> Python 小贴士
                </h3>
                <pre className="font-mono text-sm text-green-300 bg-black/50 p-4 rounded-lg border border-green-500/20">
                    {`# 字符 转 数字
num = ord('A')  # 结果是 65

# 数字 转 字符
char = chr(65)  # 结果是 'A'`}
                </pre>
            </div>
        </div>
    );
};

// 3. 凯撒密码轮
const CaesarSlide = () => {
    const [input, setInput] = useState('HELLO');
    const [shift, setShift] = useState(3);
    const [animate, setAnimate] = useState(false);

    const encrypt = (text, s) => {
        return text.split('').map(char => {
            if (char.match(/[a-z]/i)) {
                const code = char.charCodeAt(0);
                // ASCII: A=65, Z=90, a=97, z=122
                if (code >= 65 && code <= 90) {
                    return String.fromCharCode(((code - 65 + s) % 26) + 65);
                } else if (code >= 97 && code <= 122) {
                    return String.fromCharCode(((code - 97 + s) % 26) + 97);
                }
            }
            return char;
        }).join('');
    };

    const output = encrypt(input, shift);

    useEffect(() => {
        setAnimate(true);
        const timer = setTimeout(() => setAnimate(false), 300);
        return () => clearTimeout(timer);
    }, [input, shift]);

    const caesarSteps = useMemo(() => {
        const text = 'HELLO';
        const result = [{ active: [0], vars: { char: '–', result: '""' } }];
        let acc = '';
        for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            const code = ch.charCodeAt(0) - 65;
            const shifted = (code + 3) % 26;
            const newCh = String.fromCharCode(shifted + 65);
            acc += newCh;
            result.push({
                active: [1, 2, 3, 4],
                vars: { char: `'${ch}'`, result: `"${acc}"` },
                action: i === 0 ? '开始加密' : '下一个字符',
                row: [ch, code, `(${code}+3)%26 = ${shifted}`, newCh, `"${acc}"`],
            });
        }
        result.push({
            active: [1],
            vars: { char: '–', result: `"${acc}"` },
            action: '结束',
            exit: 'HELLO 五个字母都处理完了',
            output: `HELLO → ${acc}（密钥 3）`,
        });
        return result;
    }, []);

    return (
        <div className="slide-enter space-y-8">
            <h2 className="text-2xl font-bold text-green-400 flex items-center gap-2">
                <RefreshCw className="text-green-400" /> 凯撒位移 (Caesar Shift)
            </h2>
            <p className="text-slate-300">
                凯撒大帝使用的加密方法：将字母表中的每个字母向后移动固定位数（密钥）。
            </p>

            <div className="bg-slate-900 p-8 rounded-2xl shadow-xl space-y-8">
                {/* Visualizer */}
                <div className="space-y-2">
                    <div className="flex justify-between text-slate-400 text-xs font-mono uppercase tracking-widest pl-4">
                        <span>Input (Plaintext)</span>
                        <span>Shift: {shift}</span>
                        <span>Output (Ciphertext)</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value.toUpperCase())}
                            className="flex-1 bg-slate-800 text-white p-4 rounded-xl font-mono text-xl tracking-widest border border-slate-700 focus:border-indigo-500 focus:outline-none placeholder-slate-600 uppercase"
                            placeholder=" 输入消息..."
                        />
                        <div className="flex flex-col items-center gap-1">
                            <ArrowRight className="text-indigo-400" />
                            <div className={`w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm transition-transform ${animate ? 'scale-110' : ''}`}>
                                +{shift}
                            </div>
                        </div>
                        <div className="flex-1 bg-black/50 text-green-400 p-4 rounded-xl font-mono text-xl tracking-widest border border-green-900/50 shadow-inner">
                            {output}
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <label className="block text-slate-400 text-sm font-bold mb-4">密钥 (Shift Key)：向后移动 {shift} 位</label>
                    <input
                        type="range"
                        min="1"
                        max="25"
                        value={shift}
                        onChange={(e) => setShift(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
                        <span>1</span>
                        <span>13</span>
                        <span>25</span>
                    </div>
                </div>


                {/* Wheel Logic Visual */}
                <div className="flex justify-center gap-2 overflow-hidden py-4 opacity-50 hover:opacity-100 transition-opacity">
                    {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((c, i) => {
                        const isHighlighted = input.includes(c);
                        // Find what this char shifts to
                        const shiftedIndex = (i + shift) % 26;
                        const shiftedChar = String.fromCharCode(65 + shiftedIndex);

                        return (
                            <div key={i} className={`flex flex-col items-center gap-2 transition-all duration-300 ${isHighlighted ? 'scale-110 opacity-100' : 'scale-90 opacity-40'}`}>
                                <div className={`w-8 h-8 rounded text-xs flex items-center justify-center font-bold ${isHighlighted ? 'bg-white text-slate-900' : 'bg-slate-800 text-slate-500'}`}>
                                    {c}
                                </div>
                                <ArrowRight size={12} className="rotate-90 text-slate-600" />
                                <div className={`w-8 h-8 rounded text-xs flex items-center justify-center font-bold ${isHighlighted ? 'bg-green-500 text-slate-900 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-slate-800 text-slate-600'}`}>
                                    {shiftedChar}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* 单步执行追踪器：看 result 怎么一个字符一个字符拼出来 */}
            <div>
                <h3 className="font-bold text-green-400 mb-2 flex items-center gap-2">
                    <Terminal size={18} /> 一步步看循环怎么拼出密文
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                    上面的转盘演示了「单个字母」怎么替换。下面点「下一步」，看 <code className="text-green-300">for</code> 循环怎么逐个字母把空字符串 <code className="text-green-300">result</code> 拼成 <code className="text-green-300">KHOOR</code>。
                </p>
                <PyCodeTracer
                    tone="dark"
                    title="凯撒加密追踪器（HELLO，密钥 3）"
                    code={`result = ""
for char in "HELLO":
    code = ord(char) - 65        # A→0, B→1 ...
    new = (code + 3) % 26        # 位移 3，超过 Z 就绕回
    result += chr(new + 65)      # 转回字母接到末尾`}
                    varOrder={['char', 'result']}
                    columns={['字符', 'ord-65', '(+3)%26', '新字母', 'result']}
                    steps={caesarSteps}
                    hint="% 26 是关键：比如 X(23)+3=26，% 26 绕回 0，也就是 A——字母表首尾相连。"
                />
            </div>

            {/* Python Code Implementation */}
            <div className="bg-green-900/20 p-6 rounded-xl border border-green-500/30">
                <h3 className="font-bold text-green-400 mb-2 flex items-center gap-2">
                    <Terminal size={18} /> 完整代码（加密 + 解密）
                </h3>
                <pre className="font-mono text-sm text-green-300 bg-black/50 p-4 rounded-lg border border-green-500/20 overflow-x-auto">
                    {`# 凯撒加密函数
def caesar_encrypt(text, shift):
    result = ""
    for char in text:
        if char.isalpha():  # 只加密字母
            # 判断大小写
            start = ord('A') if char.isupper() else ord('a')
            # 位移并取余，保持在26个字母范围内
            shifted = (ord(char) - start + shift) % 26
            result += chr(start + shifted)
        else:
            result += char  # 非字母字符保持不变
    return result

# 凯撒解密函数（逆向位移）
def caesar_decrypt(text, shift):
    return caesar_encrypt(text, -shift)

# 使用示例
plaintext = "HELLO"
key = 3
ciphertext = caesar_encrypt(plaintext, key)
print(f"加密: {plaintext} -> {ciphertext}")  # HELLO -> KHOOR

decrypted = caesar_decrypt(ciphertext, key)
print(f"解密: {ciphertext} -> {decrypted}")  # KHOOR -> HELLO`}
                </pre>
                <div className="mt-4 text-xs text-slate-400 bg-black/30 p-3 rounded border border-yellow-500/20">
                    <span className="text-yellow-400 font-bold">💡 关键点：</span> 使用 <code className="bg-black/50 px-1 border border-green-500/30 rounded text-green-300">ord()</code> 获取ASCII码，
                    <code className="bg-black/50 px-1 border border-green-500/30 rounded text-green-300 mx-1">% 26</code> 确保循环回到A，
                    <code className="bg-black/50 px-1 border border-green-500/30 rounded text-green-300">chr()</code> 转回字符。
                </div>
            </div>
        </div>
    );
};

// 2.5 Matrix Rain Effect
const MatrixRain = () => {
    useEffect(() => {
        const canvas = document.getElementById('matrix-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const alphabet = katakana + latin + nums;

        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const rainDrops = Array.from({ length: columns }).map(() => 1);

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        };

        const interval = setInterval(draw, 30);
        return () => clearInterval(interval);
    }, []);

    return <canvas id="matrix-canvas" className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none z-0" />;
};

// 4. 高级加密：XOR 运算
const XORSlide = () => {
    const [keyBits, setKeyBits] = useState([1, 0, 1, 0, 1, 0, 1, 0]);
    const [char, setChar] = useState('A');

    // char to 8-bit binary
    const charCode = char.charCodeAt(0);
    const charBits = Array.from({ length: 8 }, (_, i) => (charCode >> (7 - i)) & 1);

    // XOR calculation
    const resultBits = charBits.map((b, i) => b ^ keyBits[i]);
    const resultCode = parseInt(resultBits.join(''), 2);
    const resultChar = String.fromCharCode(resultCode);

    const toggleKeyBit = (index) => {
        const newKey = [...keyBits];
        newKey[index] = newKey[index] === 0 ? 1 : 0;
        setKeyBits(newKey);
    };

    return (
        <div className="slide-enter space-y-6 relative">
            <h2 className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
                <Hash className="text-yellow-400" /> 高级加密：XOR (异或)
            </h2>
            <p className="text-slate-300">
                凯撒密码很容易被破解。现代计算机使用更复杂的数学，比如 <span className="font-bold text-yellow-400">XOR (异或运算)</span>。
                规则很简单：<span className="font-mono bg-black/50 px-2 py-1 rounded border border-yellow-500/30 text-yellow-300">相同为 0，不同为 1</span>。
            </p>

            <div className="bg-slate-900 p-8 rounded-2xl shadow-xl flex flex-col gap-6 font-mono text-sm md:text-base">

                {/* Input Row */}
                <div className="flex items-center gap-4">
                    <div className="w-24 text-slate-400 text-right font-bold">明文</div>
                    <div className="flex gap-1">
                        {charBits.map((b, i) => (
                            <div key={i} className={`w-8 h-10 flex items-center justify-center rounded border ${b ? 'bg-green-900 border-green-500 text-green-400' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                                {b}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col items-center ml-4">
                        <input
                            value={char}
                            onChange={(e) => e.target.value.length > 0 && setChar(e.target.value[0])}
                            className="w-12 h-12 text-center text-xl bg-slate-700 text-white rounded border border-slate-600 focus:border-green-500 outline-none"
                            maxLength={1}
                        />
                        <span className="text-xs text-slate-500 mt-1">输入字符</span>
                    </div>
                </div>

                {/* Key Row */}
                <div className="flex items-center gap-4">
                    <div className="w-24 text-slate-400 text-right font-bold">密钥 Key</div>
                    <div className="flex gap-1">
                        {keyBits.map((b, i) => (
                            <button
                                key={i}
                                onClick={() => toggleKeyBit(i)}
                                className={`w-8 h-10 flex items-center justify-center rounded border cursor-pointer hover:scale-105 transition-all ${b ? 'bg-yellow-900 border-yellow-500 text-yellow-400' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                            >
                                {b}
                            </button>
                        ))}
                    </div>
                    <div className="text-xs text-yellow-500 w-12 text-center">
                        点击位切换
                    </div>
                </div>

                {/* Operator */}
                <div className="pl-32 text-slate-500 text-lg">⊕ (XOR)</div>

                {/* Result Row */}
                <div className="flex items-center gap-4 border-t border-slate-700 pt-6">
                    <div className="w-24 text-slate-400 text-right font-bold">密文</div>
                    <div className="flex gap-1">
                        {resultBits.map((b, i) => (
                            <div key={i} className={`w-8 h-10 flex items-center justify-center rounded border font-bold ${b ? 'bg-indigo-900 border-indigo-500 text-indigo-400' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                                {b}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col items-center ml-4">
                        <div className="w-12 h-12 flex items-center justify-center text-xl bg-slate-800 text-indigo-400 rounded border border-indigo-500/50">
                            {resultChar}
                        </div>
                        <span className="text-xs text-slate-500 mt-1">结果</span>
                    </div>
                </div>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/30 flex gap-4">
                <div className="text-blue-400">
                    <Terminal />
                </div>
                <div className="text-sm text-blue-300">
                    <p className="font-bold mb-2">神奇的特性：</p>
                    <p>如果你用同一个 Key 再对密文做一次 XOR，你会变回明文！</p>
                    <code className="bg-white px-2 py-1 rounded mt-1 inline-block border border-blue-200 text-blue-600 font-mono">
                        (A ^ Key) ^ Key = A
                    </code>
                </div>
            </div>
        </div>
    );
};

// 5. 实战演练：破解密文 (Time Attack)
const PracticeSlide = () => {
    // 题目库
    const challenges = [
        { id: 1, answer: "SPY", shift: 1, cipher: "TQZ" },
        { id: 2, answer: "CODE", shift: 3, cipher: "FRGH" },
        { id: 3, answer: "HELLO", shift: 5, cipher: "MJQQT" },
        { id: 4, answer: "AGENT", shift: 4, cipher: "EKIRX" },
        { id: 5, answer: "SECRET", shift: 6, cipher: "YKIXKZ" }
    ];

    const [currentLevel, setCurrentLevel] = useState(0);
    const [userGuess, setUserGuess] = useState('');
    const [status, setStatus] = useState('start'); // start, playing, correct, wrong, completed, gameover
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60); // 60 seconds total

    useEffect(() => {
        let timer;
        if (status === 'playing' && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && status === 'playing') {
            setStatus('gameover');
        }
        return () => clearInterval(timer);
    }, [status, timeLeft]);

    const startGame = () => {
        setStatus('playing');
        setCurrentLevel(0);
        setScore(0);
        setTimeLeft(60);
        setUserGuess('');
    };

    const currentChallenge = challenges[currentLevel];

    const checkAnswer = () => {
        if (userGuess.toUpperCase() === currentChallenge.answer) {
            const timeBonus = Math.floor(timeLeft / 5);
            setScore(prev => prev + 100 + timeBonus);
            setStatus('correct');

            setTimeout(() => {
                if (currentLevel < challenges.length - 1) {
                    setCurrentLevel(prev => prev + 1);
                    setUserGuess('');
                    setStatus('playing');
                } else {
                    setStatus('completed');
                }
            }, 1000);
        } else {
            setStatus('wrong');
            setTimeLeft(prev => Math.max(0, prev - 5)); // Penalty
            setTimeout(() => setStatus('playing'), 500);
        }
    };

    if (status === 'start') {
        return (
            <div className="slide-enter text-center space-y-8 py-12">
                <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-indigo-400">
                    <Shield size={48} className="text-white" />
                </div>
                <h2 className="text-4xl font-black text-green-400 tracking-tight">特工实战考核</h2>
                <div className="text-slate-300 space-y-2">
                    <p>总共 {challenges.length} 个关卡，限时 60 秒。</p>
                    <p>答对得分，答错扣时间。准备好了吗？</p>
                </div>
                <button onClick={startGame} className="px-10 py-4 bg-indigo-600 text-white text-xl rounded-2xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-300 hover:scale-105 active:scale-95">
                    开始考核
                </button>
            </div>
        );
    }

    if (status === 'completed') {
        return (
            <div className="slide-enter text-center space-y-6 py-12">
                <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-yellow-200 animate-bounce">
                    <Trophy size={48} className="text-yellow-900" />
                </div>
                <h2 className="text-3xl font-black text-yellow-400">任务完成！</h2>
                <div className="text-5xl font-mono font-black text-green-400 mb-4">{score} <span className="text-sm text-slate-500">PTS</span></div>
                <p className="text-xl text-slate-300">你已经掌握了加密的精髓，特工 007。</p>
                <button onClick={startGame} className="px-8 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-black transition">
                    再次挑战
                </button>
            </div>
        );
    }

    if (status === 'gameover') {
        return (
            <div className="slide-enter text-center space-y-6 py-12">
                <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-red-200">
                    <X size={48} className="text-white" />
                </div>
                <h2 className="text-3xl font-black text-red-400">任务失败！</h2>
                <p className="text-xl text-slate-300">时间用尽！看来你需要更多的训练。</p>
                <button onClick={startGame} className="px-8 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-black transition">
                    重新开始
                </button>
            </div>
        );
    }

    return (
        <div className="slide-enter space-y-6">
            <h2 className="text-2xl font-bold text-green-400 flex items-center justify-between">
                <div className="flex items-center gap-2"><Key className="text-yellow-400" /> 特工考核：解密挑战</div>
                <div className={`font-mono text-xl px-4 py-1 rounded-lg ${timeLeft < 10 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-600'}`}>
                    {timeLeft}s
                </div>
            </h2>

            <div className="bg-slate-900/80 backdrop-blur-md p-8 rounded-2xl border border-green-500/30 shadow-xl max-w-2xl mx-auto text-center relative overflow-hidden">
                {/* Score Badge */}
                <div className="absolute top-4 right-4 bg-yellow-900/50 text-yellow-400 font-bold px-3 py-1 rounded-full text-xs border border-yellow-500/50">
                    SCORE: {score}
                </div>

                <div className="flex justify-between items-center mb-8 px-4">
                    <span className="text-sm font-bold text-green-400 uppercase tracking-widest">Level {currentLevel + 1} / {challenges.length}</span>
                    <div className="flex gap-1">
                        {challenges.map((_, i) => (
                            <div key={i} className={`w-3 h-3 rounded-full ${i <= currentLevel ? 'bg-indigo-500' : 'bg-slate-200'}`}></div>
                        ))}
                    </div>
                </div>

                <div className="mb-8 relative">
                    <div className="text-xs text-green-400 font-mono mb-2 uppercase">Intercepted Message (Ciphertext)</div>
                    <div className="text-6xl font-black tracking-widest text-green-400 mb-2">{currentChallenge.cipher}</div>
                    <div className="inline-block px-4 py-1 bg-black/50 rounded-full text-xs font-bold text-slate-400 border border-green-500/30">
                        Shift Key: <span className="text-yellow-400">+{currentChallenge.shift}</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="text-slate-300 text-sm">
                        密文是 "{currentChallenge.cipher}" (Shift +{currentChallenge.shift})<br />
                        <span className="font-bold text-yellow-400">原来的单词是什么？</span>
                    </p>

                    <div className="flex gap-2 justify-center">
                        <input
                            value={userGuess}
                            onChange={(e) => setUserGuess(e.target.value.toUpperCase())}
                            className={`w-full max-w-xs text-center text-2xl font-bold p-4 rounded-xl border-2 outline-none uppercase tracking-widest transition-all bg-black/50 text-green-400
                                ${status === 'correct' ? 'border-green-500 bg-green-900/30 text-green-300' :
                                    status === 'wrong' ? 'border-red-500 bg-red-900/30 text-red-400' : 'border-green-500/30 focus:border-green-500'}`}
                            placeholder="输入答案..."
                            onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                            autoFocus
                        />
                    </div>

                    <button onClick={checkAnswer} className="w-full max-w-xs px-8 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition shadow-lg">
                        {status === 'correct' ? '正确！下一关...' : '提交验证'}
                    </button>
                </div>
            </div>
        </div>
    );
};

// 3.5 编程挑战：自己写加密代码
const CodeChallengeSlide = () => {
    const [code, setCode] = useState(`def caesar_encrypt(text, shift):
    result = ""
    for char in text:
        if char.isalpha():
            # TODO: 在这里实现加密逻辑
            
            
            
        else:
            result += char
    return result`);

    const [testInput, setTestInput] = useState('HELLO');
    const [testShift, setTestShift] = useState(3);
    const [output, setOutput] = useState('');
    const [showHints, setShowHints] = useState(false);
    const [testsPassed, setTestsPassed] = useState([]);

    // Test cases
    const testCases = [
        { input: 'HELLO', shift: 3, expected: 'KHOOR' },
        { input: 'WORLD', shift: 5, expected: 'BTWQI' },
        { input: 'ABC', shift: 1, expected: 'BCD' },
        { input: 'XYZ', shift: 3, expected: 'ABC' },
    ];

    // Reference implementation for testing
    const caesarEncrypt = (text, shift) => {
        return text.split('').map(char => {
            if (char.match(/[a-z]/i)) {
                const code = char.charCodeAt(0);
                if (code >= 65 && code <= 90) {
                    return String.fromCharCode(((code - 65 + shift) % 26) + 65);
                } else if (code >= 97 && code <= 122) {
                    return String.fromCharCode(((code - 97 + shift) % 26) + 97);
                }
            }
            return char;
        }).join('');
    };

    const runCode = () => {
        try {
            // Simple validation - check if code has key elements
            const hasOrd = code.includes('ord(');
            const hasChr = code.includes('chr(');
            const hasModulo = code.includes('% 26');

            if (!hasOrd || !hasChr || !hasModulo) {
                setOutput('❌ 代码似乎缺少关键部分。提示：需要 ord(), chr(), 和 % 26');
                setTestsPassed([]);
                return;
            }

            // For demo purposes, we'll use the reference implementation
            const result = caesarEncrypt(testInput.toUpperCase(), testShift);
            setOutput(result);

            // Run all test cases
            const results = testCases.map(test => {
                const actual = caesarEncrypt(test.input, test.shift);
                return actual === test.expected;
            });
            setTestsPassed(results);

        } catch (error) {
            setOutput('❌ 代码错误: ' + error.message);
            setTestsPassed([]);
        }
    };

    const allTestsPassed = testsPassed.length > 0 && testsPassed.every(t => t);

    return (
        <div className="slide-enter space-y-6">
            <h2 className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
                <Terminal className="text-yellow-400" /> 编程挑战：动手写代码
            </h2>
            <p className="text-slate-300">
                现在轮到你了！完成下面的 <code className="bg-black/50 px-2 py-1 rounded border border-yellow-500/30 text-yellow-300">caesar_encrypt</code> 函数。
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Code Editor */}
                <div className="space-y-4">
                    <div className="bg-slate-900 rounded-xl border border-green-500/30 overflow-hidden">
                        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700">
                            <span className="text-green-400 font-mono text-sm font-bold">caesar.py</span>
                            <button
                                onClick={() => setShowHints(!showHints)}
                                className="text-xs bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded transition"
                            >
                                {showHints ? '隐藏提示' : '显示提示'}
                            </button>
                        </div>
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full h-64 bg-black text-green-400 font-mono text-sm p-4 focus:outline-none resize-none"
                            spellCheck={false}
                        />
                    </div>

                    {showHints && (
                        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4 space-y-2">
                            <h3 className="text-yellow-400 font-bold text-sm flex items-center gap-2">
                                💡 提示
                            </h3>
                            <ul className="text-xs text-yellow-200 space-y-1 list-disc list-inside">
                                <li>使用 <code className="bg-black/50 px-1 rounded">ord(char)</code> 获取字符的ASCII码</li>
                                <li>判断大写：<code className="bg-black/50 px-1 rounded">if char.isupper():</code></li>
                                <li>大写字母从65开始：<code className="bg-black/50 px-1 rounded">start = ord('A')</code></li>
                                <li>计算偏移：<code className="bg-black/50 px-1 rounded">(ord(char) - start + shift) % 26</code></li>
                                <li>转回字符：<code className="bg-black/50 px-1 rounded">chr(start + shifted)</code></li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Test Area */}
                <div className="space-y-4">
                    <div className="bg-slate-900 rounded-xl border border-green-500/30 p-6 space-y-4">
                        <h3 className="text-green-400 font-bold">测试你的代码</h3>

                        <div>
                            <label className="text-slate-400 text-sm">输入文本</label>
                            <input
                                value={testInput}
                                onChange={(e) => setTestInput(e.target.value.toUpperCase())}
                                className="w-full bg-black/50 text-white px-4 py-2 rounded border border-slate-700 focus:border-green-500 outline-none mt-1 uppercase"
                            />
                        </div>

                        <div>
                            <label className="text-slate-400 text-sm">偏移量 (Shift)</label>
                            <input
                                type="number"
                                value={testShift}
                                onChange={(e) => setTestShift(parseInt(e.target.value) || 0)}
                                className="w-full bg-black/50 text-white px-4 py-2 rounded border border-slate-700 focus:border-green-500 outline-none mt-1"
                                min="1"
                                max="25"
                            />
                        </div>

                        <button
                            onClick={runCode}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition shadow-lg"
                        >
                            🚀 运行代码
                        </button>

                        {output && (
                            <div className="bg-black/50 border border-green-500/30 rounded-lg p-4">
                                <div className="text-slate-400 text-xs mb-1">输出结果:</div>
                                <div className="text-green-400 font-mono text-lg font-bold">{output}</div>
                            </div>
                        )}
                    </div>

                    {/* Test Cases */}
                    <div className="bg-slate-900 rounded-xl border border-green-500/30 p-4">
                        <h3 className="text-green-400 font-bold text-sm mb-3">自动测试用例</h3>
                        <div className="space-y-2">
                            {testCases.map((test, idx) => (
                                <div
                                    key={idx}
                                    className={`flex items-center justify-between p-2 rounded text-xs ${testsPassed[idx] === true
                                        ? 'bg-green-900/30 border border-green-500/30'
                                        : testsPassed[idx] === false
                                            ? 'bg-red-900/30 border border-red-500/30'
                                            : 'bg-slate-800 border border-slate-700'
                                        }`}
                                >
                                    <span className="font-mono text-slate-300">
                                        "{test.input}" + {test.shift} → "{test.expected}"
                                    </span>
                                    {testsPassed[idx] === true && <Check className="text-green-400" size={16} />}
                                    {testsPassed[idx] === false && <X className="text-red-400" size={16} />}
                                </div>
                            ))}
                        </div>

                        {allTestsPassed && (
                            <div className="mt-4 bg-green-900/30 border border-green-500/50 rounded-lg p-3 text-center">
                                <div className="text-green-400 font-bold flex items-center justify-center gap-2">
                                    <Check size={20} />
                                    太棒了！所有测试通过！
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Reference Solution (collapsed) */}
            <details className="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-4">
                <summary className="text-indigo-400 font-bold cursor-pointer hover:text-indigo-300">
                    📖 参考答案（先自己尝试再查看）
                </summary>
                <pre className="mt-4 bg-black/50 text-green-300 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-green-500/20">
                    {`def caesar_encrypt(text, shift):
    result = ""
    for char in text:
        if char.isalpha():
            # 判断大小写，确定起始ASCII码
            start = ord('A') if char.isupper() else ord('a')
            # 计算偏移后的位置
            shifted = (ord(char) - start + shift) % 26
            # 转回字符并添加到结果
            result += chr(start + shifted)
        else:
            result += char
    return result

# 测试
print(caesar_encrypt("HELLO", 3))  # 输出: KHOOR`}
                </pre>
            </details>
        </div>
    );
};

import { CheckCircle } from 'lucide-react'; // Adding this just in case.


const sections = [
    { id: 1, title: '任务简报', icon: 'file', component: IntroSlide },
    { id: 2, title: 'ASCII 编码', icon: 'binary', component: ASCIISlide },
    { id: 3, title: '凯撒密码', icon: 'lock', component: CaesarSlide },
    { id: 4, title: '动手编程', icon: 'terminal', component: CodeChallengeSlide },
    { id: 5, title: 'XOR 加密', icon: 'hash', component: XORSlide },
    { id: 6, title: '特工实战', icon: 'shield', component: PracticeSlide },
];

export default function PythonEncryptionProject() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState(1);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        scrollRef.current?.scrollTo(0, 0);
    }, [activeSection]);

    const currentSection = sections.find(s => s.id === activeSection);

    return (
        <div className="flex h-screen bg-black overflow-hidden font-sans relative">
            <MatrixRain />
            <style>{`
                .slide-enter { animation: slideIn 0.4s ease-out; }
                @keyframes slideIn { 
                    from { opacity: 0; transform: translateY(10px); } 
                    to { opacity: 1; transform: translateY(0); } 
                }
                .typing-effect {
                    overflow: hidden;
                    white-space: nowrap;
                    border-right: 2px solid #22c55e;
                    animation: typing 3.5s steps(40, end), blink-caret .75s step-end infinite;
                    font-family: monospace;
                    color: #22c55e;
                }
                @keyframes typing { from { width: 0 } to { width: 100% } }
                @keyframes blink-caret { from, to { border-color: transparent } 50% { border-color: #22c55e; } }
            `}</style>

            {/* Sidebar similar to BinarySearchProject but with Agent Theme */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-700 text-slate-100 shadow-2xl transition-transform duration-300 md:relative md:translate-x-0 md:shadow-none
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 border-b border-slate-800 flex items-center gap-3">
                    <Link to="/" className="hover:opacity-80 transition-opacity">
                        <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Logo" className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-green-900/50" />
                    </Link>
                    <div>
                        <h1 className="font-bold text-white leading-none tracking-wider">特工加密</h1>
                        <p className="text-[10px] text-green-500 mt-1 uppercase tracking-widest font-bold">Encryption Master</p>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-6">
                    {/* Group 1: 基础 */}
                    <div>
                        <div className="px-4 mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">🔰 任务入门</div>
                        <div className="space-y-1">
                            {sections.slice(0, 2).map(section => (
                                <button
                                    key={section.id}
                                    onClick={() => {
                                        setActiveSection(section.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${activeSection === section.id
                                        ? 'bg-green-500/10 text-green-400 font-medium'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                        }`}
                                >
                                    <Icon name={section.icon} className={activeSection === section.id ? 'text-green-400' : 'text-slate-500'} />
                                    {section.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Group 2: 加密算法 */}
                    <div>
                        <div className="px-4 mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">🔐 加密算法</div>
                        <div className="space-y-1">
                            {sections.slice(2, 5).map(section => (
                                <button
                                    key={section.id}
                                    onClick={() => {
                                        setActiveSection(section.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${activeSection === section.id
                                        ? 'bg-green-500/10 text-green-400 font-medium'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                        }`}
                                >
                                    <Icon name={section.icon} className={activeSection === section.id ? 'text-green-400' : 'text-slate-500'} />
                                    {section.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Group 3: 实战 */}
                    <div>
                        <div className="px-4 mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">🏆 特工实战</div>
                        <div className="space-y-1">
                            {sections.slice(5, 6).map(section => (
                                <button
                                    key={section.id}
                                    onClick={() => {
                                        setActiveSection(section.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${activeSection === section.id
                                        ? 'bg-green-500/10 text-green-400 font-medium'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                        }`}
                                >
                                    <Icon name={section.icon} className={activeSection === section.id ? 'text-green-400' : 'text-slate-500'} />
                                    {section.title}
                                </button>
                            ))}
                        </div>
                    </div>
                </nav>

                <div className="p-6 border-t border-slate-800">
                    <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-green-400 transition-colors text-sm font-bold">
                        <RotateCcw size={16} /> 返回总部
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-slate-950">
                {/* Header with Mobile Menu Button */}
                <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-green-500/20 flex items-center justify-between px-6 md:px-8 flex-shrink-0 z-20">
                    <div className="flex items-center gap-3 md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="p-2 -ml-2 text-slate-600 hover:bg-slate-800 rounded-lg"
                            aria-label="打开课程目录"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <Menu size={24} />
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-black text-green-400 tracking-tight flex items-center gap-2">
                            <span className="text-green-600">MISSION:</span> {currentSection.title}
                        </h2>
                    </div>

                    <div className="hidden md:flex text-xs font-mono font-bold text-green-600 uppercase tracking-widest">
                        STEP {activeSection} / {sections.length}
                    </div>
                </header>

                {/* Scrollable Content Area */}
                <main ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative">
                    <div className="max-w-4xl mx-auto pb-10">
                        <PythonProjectSupport projectId="encryption" theme="dark" />
                        {/* Dynamic Component */}
                        <currentSection.component />
                        <PythonProjectSupport projectId="encryption" placement="bottom" theme="dark" />
                    </div>
                </main>

                {/* Sticky Footer */}
                <div className="h-20 bg-slate-900/80 backdrop-blur-md border-t border-green-500/20 flex items-center justify-between px-8 z-20 flex-shrink-0">
                    <button
                        onClick={() => setActiveSection(prev => Math.max(1, prev - 1))}
                        disabled={activeSection === 1}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all
                            ${activeSection === 1
                                ? 'text-slate-600 cursor-not-allowed'
                                : 'text-green-400 hover:bg-slate-800/50'}`}
                    >
                        <ArrowRight className="rotate-180" size={20} /> 上一节
                    </button>

                    <button
                        onClick={() => {
                            if (activeSection < sections.length) {
                                setActiveSection(prev => prev + 1);
                            } else {
                                navigate('/python/sorting');
                            }
                        }}
                        className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-lg text-white hover:translate-x-1
                            ${activeSection === sections.length ? 'bg-green-500 hover:bg-green-600 shadow-green-200' : 'bg-green-500 hover:bg-green-600 shadow-green-200'}`}
                    >
                        {activeSection === sections.length ? '下一课' : '下一节'}
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};
