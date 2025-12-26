import React, { useState, useEffect } from 'react';
import { Terminal, Key, Cpu, Shield, ArrowRight, CheckCircle, XCircle, RefreshCw, Lock, Unlock, Quote, ArrowDownUp, AlertTriangle, Play, BookOpen, User, Binary, Menu, X } from 'lucide-react';

const sections = [
  { id: 1, title: '任务简报', icon: 'shield', component: (props) => <WelcomeStage {...props} /> },
  { id: 2, title: '第一条军规：单引号法则', icon: 'quote', component: () => <QuoteRuleStage /> },
  { id: 3, title: '字符解码器', icon: 'key', component: () => <CharDecoderStage /> },
  { id: 4, title: '情报局密码本', icon: 'book', component: () => <AsciiTableStage /> },
  { id: 5, title: '字符运算实验室', icon: 'cpu', component: () => <CharMathStage /> },
  { id: 6, title: '大小写转换密室', icon: 'refresh', component: () => <CaseSwitcherStage /> },
  { id: 7, title: '传奇特工档案', icon: 'user', component: () => <BooleScientistStage /> },
  { id: 8, title: '布尔测谎仪', icon: 'lock', component: () => <BoolDetectorStage /> },
  { id: 9, title: '真题挑战 1', icon: 'check', component: () => <QuizStage1 /> },
  { id: 10, title: '真题挑战 2', icon: 'check', component: () => <QuizStage2 /> },
  { id: 11, title: '任务总结', icon: 'flag', component: () => <SummaryStage /> },
];

export default function Lesson5() {
  const [activeSection, setActiveSection] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const nextSection = () => {
    if (activeSection < sections.length) setActiveSection(activeSection + 1);
  };

  const prevSection = () => {
    if (activeSection > 1) setActiveSection(activeSection - 1);
  };

  const currentSection = sections.find(s => s.id === activeSection);

  // Helper for icons in sidebar
  const getIcon = (name) => {
    const icons = {
      shield: <Shield size={16} />,
      quote: <Quote size={16} />,
      key: <Key size={16} />,
      book: <BookOpen size={16} />,
      cpu: <Cpu size={16} />,
      refresh: <ArrowDownUp size={16} />,
      user: <User size={16} />,
      lock: <Lock size={16} />,
      check: <CheckCircle size={16} />,
      flag: <CheckCircle size={16} />
    };
    return icons[name] || <Terminal size={16} />;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans text-gray-900">
      {/* Mobile Menu Button - Fixed Top */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm">
        <h1 className="text-lg font-bold text-blue-600 flex items-center gap-2">
          <Terminal size={24} />
          GESP C++ 一级
        </h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
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

      {/* 侧边栏 */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col h-full overflow-y-auto shrink-0 transition-transform duration-300
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h1 className="font-bold text-xl text-blue-600 flex items-center gap-2">
            <Terminal size={24} />
            GESP C++ 一级
          </h1>
          <p className="text-xs text-gray-500 mt-1">第 5 课：字符与布尔</p>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2
                ${activeSection === section.id
                  ? 'bg-blue-100 text-blue-800 font-bold shadow-sm ring-1 ring-blue-200'
                  : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <span className="opacity-70">{getIcon(section.icon)}</span>
              <span className="truncate">{section.title}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* 主内容区 Outer Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden pt-16 md:pt-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10 shrink-0">
          <h2 className="text-lg font-bold text-gray-800 truncate flex items-center gap-2">
            {currentSection?.title}
          </h2>
          <div className="flex gap-2 text-sm text-gray-500">
            <span>{activeSection}</span> / <span>{sections.length}</span>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden min-h-[500px] p-8 border border-slate-700 text-slate-100">
              {/* 
                    This wrapper preserves the Dark Mode / Agent theme of the inner components 
                    while fitting into the Light Mode shell. 
                 */}
              {currentSection?.component({ onNext: nextSection })}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="h-16 bg-white border-t border-gray-200 flex items-center justify-between px-8 shrink-0">
          <button
            onClick={prevSection}
            disabled={activeSection === 1}
            className={`px-4 py-2 rounded flex items-center gap-2 font-medium transition
              ${activeSection === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            上一步
          </button>

          <div className="w-1/3 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${(activeSection / sections.length) * 100}%` }}
            ></div>
          </div>

          <button
            onClick={nextSection}
            disabled={activeSection === sections.length}
            className={`px-4 py-2 rounded flex items-center gap-2 font-medium transition
              ${activeSection === sections.length ? 'text-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'}`}
          >
            下一步 <ArrowRight size={16} />
          </button>
        </footer>
      </div>
    </div>
  );
}

// 0. 欢迎界面 (Updated for layout)
function WelcomeStage({ onNext }) {
  return (
    <div className="text-center space-y-6 animate-fadeIn">
      <div className="inline-block p-4 bg-slate-800 rounded-full mb-4 border border-green-500/30">
        <Shield size={64} className="text-green-400" />
      </div>
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
        字符与布尔特工
      </h1>
      <p className="text-xl text-slate-300 leading-relaxed">
        欢迎归队，新晋特工！<br />
        今天的任务是破解计算机的两种秘密代码：<br />
        <span className="text-yellow-400 font-bold">单字符伪装术 (char)</span> 和 <span className="text-blue-400 font-bold">真假测谎仪 (bool)</span>。
      </p>
      <div className="bg-slate-800 p-4 rounded-xl text-left border-l-4 border-green-500 mx-4">
        <h3 className="font-bold text-green-400 mb-2 flex items-center gap-2">
          <Terminal size={16} /> 任务目标：
        </h3>
        <ul className="space-y-2 text-sm text-slate-300">
          <li>1. <strong className="text-white">识别伪装：</strong> 区分字符(char)与字符串(string)。</li>
          <li>2. <strong className="text-white">解码行动：</strong> 破解 ASCII 身份证号码。</li>
          <li>3. <strong className="text-white">逻辑判断：</strong> 掌握计算机世界的真(1)与假(0)。</li>
        </ul>
      </div>
    </div>
  );
}

// 1. 单引号法则
function QuoteRuleStage() {
  const [feedback, setFeedback] = useState(null);

  const handleCheck = (type) => {
    if (type === 'char') setFeedback('correct');
    else if (type === 'string') setFeedback('wrong-string');
    else setFeedback('wrong-syntax');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <Quote className="text-purple-400" /> 第一条军规：单引号法则
        </h2>
        <p className="text-slate-400 text-sm">
          计算机很挑剔。<br />
          <span className="text-yellow-400">单引号 ' '</span> 只能装一个字符 (char)。<br />
          <span className="text-blue-400">双引号 " "</span> 是给字符串 (string) 用的。
        </p>
      </div>

      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
        <h3 className="text-center mb-4 font-bold text-lg">👇 哪个才是合法的 char 定义？</h3>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => handleCheck('string')} className="p-4 bg-slate-700 rounded-xl hover:bg-slate-600 transition border-2 border-transparent focus:border-blue-500">
            <code className="text-xl">"A"</code>
          </button>
          <button onClick={() => handleCheck('char')} className="p-4 bg-slate-700 rounded-xl hover:bg-slate-600 transition border-2 border-transparent focus:border-green-500">
            <code className="text-xl">'A'</code>
          </button>
          <button onClick={() => handleCheck('wrong-syntax')} className="p-4 bg-slate-700 rounded-xl hover:bg-slate-600 transition border-2 border-transparent focus:border-red-500">
            <code className="text-xl">A</code>
          </button>
          <button onClick={() => handleCheck('wrong-syntax')} className="p-4 bg-slate-700 rounded-xl hover:bg-slate-600 transition border-2 border-transparent focus:border-red-500">
            <code className="text-xl">'AB'</code>
          </button>
        </div>
      </div>

      {feedback && (
        <div className={`p-4 rounded-xl animate-fadeIn ${feedback === 'correct' ? 'bg-green-900/50 border border-green-500' : 'bg-red-900/50 border border-red-500'}`}>
          {feedback === 'correct' && (
            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-400 shrink-0 mt-1" />
              <div>
                <p className="font-bold text-green-300">正确！</p>
                <p className="text-sm text-green-100">char 就像独轮车，只能载一个人，用轻便的单引号。</p>
              </div>
            </div>
          )}
          {feedback === 'wrong-string' && (
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-red-400 shrink-0 mt-1" />
              <div>
                <p className="font-bold text-red-300">那是字符串！</p>
                <p className="text-sm text-red-100">双引号是火车的车头车尾，那是 string 类型的装备。</p>
              </div>
            </div>
          )}
          {feedback === 'wrong-syntax' && (
            <div className="flex items-start gap-3">
              <XCircle className="text-red-400 shrink-0 mt-1" />
              <div>
                <p className="font-bold text-red-300">语法错误！</p>
                <p className="text-sm text-red-100">不加引号计算机会以为是变量名，单引号里也不能装两个字。</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 2. 字符解码器
function CharDecoderStage() {
  const [inputChar, setInputChar] = useState('A');
  const ascii = inputChar ? inputChar.charCodeAt(0) : '?';

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <Key className="text-yellow-400" /> 字符解码器
        </h2>
        <p className="text-slate-400">
          计算机不认识字母，它只认识数字。
          <br />每一个字符 (char) 都有一个秘密的 ASCII 身份证号。
        </p>
      </div>

      <div className="bg-slate-800 rounded-2xl p-8 flex flex-col items-center gap-6 border border-slate-700 shadow-xl">
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-slate-400">输入字符</span>
            <div className="relative">
              <span className="absolute -left-4 top-2 text-3xl text-yellow-500 font-serif font-bold">'</span>
              <input
                type="text"
                maxLength={1}
                value={inputChar}
                onChange={(e) => setInputChar(e.target.value)}
                className="w-20 h-20 bg-black text-center text-4xl font-bold rounded-xl border-2 border-slate-600 focus:border-green-500 focus:outline-none text-white transition-all uppercase"
              />
              <span className="absolute -right-4 top-2 text-3xl text-yellow-500 font-serif font-bold">'</span>
            </div>
            <span className="text-xs text-yellow-500 mt-1">必须用单引号!</span>
          </div>

          <ArrowRight className="text-slate-500 animate-pulse" size={32} />

          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-slate-400">内存记录 (int)</span>
            <div className="w-24 h-24 rounded-full bg-green-900/30 border-4 border-green-500 flex items-center justify-center text-3xl font-mono font-bold text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
              {ascii}
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 p-4 rounded-lg w-full">
          <h4 className="text-sm font-bold text-slate-400 mb-2">🕵️‍♂️ 特工必背代码表：</h4>
          <div className="grid grid-cols-3 gap-2 text-sm font-mono text-center">
            <div className="bg-slate-800 p-2 rounded border border-slate-700">'0' {'->'} 48</div>
            <div className="bg-slate-800 p-2 rounded border border-slate-700">'A' {'->'} 65</div>
            <div className="bg-slate-800 p-2 rounded border border-slate-700">'a' {'->'} 97</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. [新增] ASCII 码表
function AsciiTableStage() {
  const [activeTab, setActiveTab] = useState('digits'); // digits, upper, lower

  const renderGrid = (start, end, label) => {
    const items = [];
    for (let i = start; i <= end; i++) {
      const char = String.fromCharCode(i);
      items.push(
        <div key={i} className="flex flex-col items-center bg-slate-800 p-2 rounded border border-slate-700 hover:border-green-500 hover:bg-slate-700 transition">
          <span className="text-yellow-400 font-bold text-lg">'{char}'</span>
          <span className="text-slate-400 text-xs font-mono">{i}</span>
        </div>
      );
    }
    return (
      <div className="space-y-2 animate-fadeIn">
        <h4 className="text-sm text-green-400 font-bold uppercase tracking-wider">{label}</h4>
        <div className="grid grid-cols-5 gap-2">
          {items}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <BookOpen className="text-blue-400" /> 情报局密码本 (ASCII)
        </h2>
        <p className="text-slate-400 text-sm">
          这是特工专用的速查表。不需要全部背下来，<br />但要记住每个区域的 <span className="text-yellow-400">“领头羊”</span>。
        </p>
      </div>

      <div className="bg-slate-900 p-1 rounded-xl flex gap-1 justify-center border border-slate-700">
        <button
          onClick={() => setActiveTab('digits')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${activeTab === 'digits' ? 'bg-slate-700 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
        >
          数字 '0'-'9'
        </button>
        <button
          onClick={() => setActiveTab('upper')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${activeTab === 'upper' ? 'bg-slate-700 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
        >
          大写 'A'-'Z'
        </button>
        <button
          onClick={() => setActiveTab('lower')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${activeTab === 'lower' ? 'bg-slate-700 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
        >
          小写 'a'-'z'
        </button>
      </div>

      <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 min-h-[260px]">
        {activeTab === 'digits' && (
          <div>
            {renderGrid(48, 57, "数字区域 (从 48 开始)")}
            <div className="mt-4 p-3 bg-blue-900/20 text-blue-200 text-sm rounded border border-blue-500/20">
              💡 <strong>注意：</strong> 数字 0 的 ASCII 码是 0，但字符 '0' 的 ASCII 码是 48！不要混淆。
            </div>
          </div>
        )}
        {activeTab === 'upper' && renderGrid(65, 90, "大写字母 (从 65 开始)")}
        {activeTab === 'lower' && renderGrid(97, 122, "小写字母 (从 97 开始)")}
      </div>
    </div>
  );
}

// 4. 字符运算实验室
function CharMathStage() {
  const [baseChar, setBaseChar] = useState('A');
  const [addNum, setAddNum] = useState(1);

  const baseAscii = baseChar.charCodeAt(0);
  const resultAscii = baseAscii + addNum;
  const resultChar = String.fromCharCode(resultAscii);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 text-blue-400 flex items-center justify-center gap-2">
          <Cpu /> 字符运算实验室
        </h2>
        <p className="text-slate-400 text-sm">
          一旦字符参与加法运算，它就会立刻变回数字身份！
          <br />公式：<span className="font-mono text-green-400">字符 + 整数 = 新字符的数字</span>
        </p>
      </div>

      <div className="bg-slate-800 p-6 rounded-2xl border border-blue-500/30 relative overflow-hidden">
        {/* 代码展示 */}
        <div className="font-mono text-lg bg-black p-4 rounded-lg text-slate-300 mb-6 border-l-4 border-blue-500 shadow-inner">
          <span className="text-purple-400">char</span> c = <span className="text-yellow-400">'{baseChar}'</span>;<br />
          <span className="text-blue-400">cout</span> &lt;&lt; c + <span className="text-orange-400">{addNum}</span>;
          <span className="text-slate-500 ml-2">// 输出结果是什么？</span>
        </div>

        {/* 互动控制 */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center gap-4 text-xl font-bold">
            <div className="flex flex-col items-center group">
              <span className="text-yellow-400 text-3xl group-hover:scale-110 transition">'{baseChar}'</span>
              <span className="text-xs text-slate-500 font-mono">({baseAscii})</span>
            </div>
            <span className="text-slate-400">+</span>
            <div className="flex items-center gap-2 bg-slate-700 rounded-lg p-1">
              <button onClick={() => setAddNum(Math.max(1, addNum - 1))} className="w-8 h-8 rounded bg-slate-600 hover:bg-slate-500 text-white">-</button>
              <span className="text-orange-400 text-2xl w-8 text-center font-mono">{addNum}</span>
              <button onClick={() => setAddNum(Math.min(25, addNum + 1))} className="w-8 h-8 rounded bg-slate-600 hover:bg-slate-500 text-white">+</button>
            </div>
            <span className="text-slate-400">=</span>
            <div className="flex flex-col items-center">
              <span className="text-white text-3xl animate-pulse">{resultAscii}</span>
              <span className="text-xs text-blue-400 font-mono">(对应 '{resultChar}')</span>
            </div>
          </div>
        </div>

        <div className="mt-6 p-3 bg-blue-900/20 text-blue-200 text-sm rounded border border-blue-500/20 flex gap-2 items-start">
          <div className="mt-1 shrink-0"><Cpu size={16} /></div>
          <div>
            <strong>特工提示：</strong> C++ 的 <code className="bg-black/50 px-1 rounded">cout</code> 会直接输出计算结果 <strong>{resultAscii}</strong> (数字)。
            想要变回字母，必须使用强制转换：<code className="bg-black/50 px-1 rounded">(char)(c + {addNum})</code>。
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. 大小写转换密室
function CaseSwitcherStage() {
  const [offset, setOffset] = useState(0); // 0 or 32
  const baseChar = 'A';
  const baseAscii = 65;
  const resultAscii = baseAscii + offset;
  const resultChar = String.fromCharCode(resultAscii);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <ArrowDownUp className="text-green-400" /> 大小写转换密室
        </h2>
        <p className="text-slate-400 text-sm">
          大写字母和小写字母之间相差一个神奇的数字：<span className="text-green-400 font-bold">32</span>。
        </p>
      </div>

      <div className="bg-slate-800 p-8 rounded-2xl border border-green-500/30 flex flex-col items-center">

        <div className="flex items-center gap-4 mb-8">
          <div className={`text-4xl font-mono font-bold transition-all duration-500 ${offset === 0 ? 'text-yellow-400 scale-110' : 'text-slate-500'}`}>
            'A' <span className="text-sm block text-center">(65)</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => setOffset(offset === 0 ? 32 : 0)}
              className={`px-6 py-2 rounded-full font-bold transition-all flex items-center gap-2 ${offset === 32 ? 'bg-green-600 hover:bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'bg-slate-600 hover:bg-slate-500'}`}
            >
              {offset === 0 ? '加上魔法 (+32)' : '解除魔法 (-32)'}
            </button>
            <ArrowRight className={`transition-transform duration-300 ${offset === 32 ? 'rotate-90 text-green-400' : 'text-slate-600'}`} />
          </div>

          <div className={`text-4xl font-mono font-bold transition-all duration-500 ${offset === 32 ? 'text-green-400 scale-110' : 'text-slate-500'}`}>
            'a' <span className="text-sm block text-center">(97)</span>
          </div>
        </div>

        <div className="w-full bg-black/50 p-4 rounded-lg font-mono text-sm text-slate-300">
           // C++ 代码实战 <br />
          char big = <span className="text-yellow-400">'A'</span>; <br />
          char small = big + <span className="text-green-400">32</span>; <br />
          cout &lt;&lt; small; <span className="text-slate-500">// 输出 'a'</span>
        </div>
      </div>
    </div>
  );
}

// 6. [新增] 传奇特工档案
function BooleScientistStage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <User className="text-indigo-400" /> 传奇特工档案
        </h2>
        <p className="text-slate-400 text-sm">
          为什么布尔类型叫 <code>bool</code>？是为了纪念一位数学家。
        </p>
      </div>

      <div className="bg-slate-800 rounded-2xl p-6 border border-indigo-500/30 flex flex-col items-center text-center shadow-lg">
        <div className="w-24 h-24 bg-slate-200 rounded-full mb-4 overflow-hidden border-4 border-indigo-500 flex items-center justify-center">
          {/* 使用图标代替真实照片，保持风格统一 */}
          <Binary size={48} className="text-indigo-900" />
        </div>

        <h3 className="text-2xl font-bold text-white mb-1">乔治·布尔 (George Boole)</h3>
        <p className="text-indigo-300 text-sm font-bold mb-4">1815 - 1864 | 英国数学家</p>

        <div className="bg-black/30 p-4 rounded-xl text-left space-y-3 text-slate-300 text-sm leading-relaxed">
          <p>
            🧩 <strong>主要成就：</strong> 在计算机发明的一百年前，他就发明了只用 <strong className="text-green-400">0</strong> 和 <strong className="text-green-400">1</strong> 来进行逻辑运算的数学体系。
          </p>
          <p>
            💻 <strong>深远影响：</strong> 他的理论奠定了现代计算机科学的基础。为了纪念他，我们在 C++ 中把这种“非真即假”的变量类型命名为 <code>bool</code>。
          </p>
          <p className="italic text-slate-400 border-t border-slate-700 pt-2 mt-2">
            "逻辑的世界里没有'可能'，只有'是'与'否'。"
          </p>
        </div>
      </div>
    </div>
  );
}

// 7. 布尔测谎仪 & 逻辑分析仪
function BoolDetectorStage() {
  const [isOn, setIsOn] = useState(true);

  // Logic Analyzer State
  const [num1, setNum1] = useState(5);
  const [num2, setNum2] = useState(3);
  const [op, setOp] = useState('>');

  const checkLogic = () => {
    switch (op) {
      case '>': return num1 > num2;
      case '<': return num1 < num2;
      case '==': return num1 == num2;
      default: return false;
    }
  };
  const logicResult = checkLogic();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          {isOn ? <Unlock className="text-green-400" /> : <Lock className="text-red-400" />}
          布尔测谎仪 (bool)
        </h2>
        <p className="text-slate-400 text-sm">
          bool 变量性格最直爽，只有两种状态：真(1) 或 假(0)。
        </p>
      </div>

      {/* Toggle Switch Section */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setIsOn(!isOn)}
          className={`relative w-48 h-20 rounded-full transition-all duration-300 shadow-inner flex items-center px-2 ${isOn ? 'bg-green-600 shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)]' : 'bg-slate-700 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]'}`}
        >
          <div className={`absolute w-16 h-16 bg-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center font-bold text-lg ${isOn ? 'translate-x-28 text-green-600' : 'translate-x-0 text-slate-600'}`}>
            {isOn ? 'ON' : 'OFF'}
          </div>
        </button>
      </div>

      {/* True/False Display */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className={`p-3 rounded-xl border-2 text-center transition-all ${isOn ? 'bg-green-900/30 border-green-500 opacity-100 scale-105' : 'bg-slate-800 border-slate-700 opacity-50'}`}>
          <h3 className="text-green-400 font-bold">true (真)</h3>
          <p className="text-2xl font-mono font-bold text-white">1</p>
        </div>
        <div className={`p-3 rounded-xl border-2 text-center transition-all ${!isOn ? 'bg-red-900/30 border-red-500 opacity-100 scale-105' : 'bg-slate-800 border-slate-700 opacity-50'}`}>
          <h3 className="text-red-400 font-bold">false (假)</h3>
          <p className="text-2xl font-mono font-bold text-white">0</p>
        </div>
      </div>

      {/* Logic Analyzer */}
      <div className="bg-slate-800 p-4 rounded-xl border-t-2 border-slate-700">
        <h3 className="text-sm font-bold text-slate-400 mb-3 flex items-center gap-2">
          <Terminal size={14} /> 逻辑分析仪 (Logic Analyzer)
        </h3>
        <div className="flex items-center justify-center gap-2 bg-black/40 p-3 rounded-lg">
          <input type="number" value={num1} onChange={e => setNum1(Number(e.target.value))} className="w-12 bg-transparent text-center border-b border-slate-500 text-white font-mono outline-none focus:border-green-500" />
          <select value={op} onChange={e => setOp(e.target.value)} className="bg-slate-700 rounded px-2 py-1 text-sm outline-none">
            <option value=">">&gt;</option>
            <option value="<">&lt;</option>
            <option value="==">==</option>
          </select>
          <input type="number" value={num2} onChange={e => setNum2(Number(e.target.value))} className="w-12 bg-transparent text-center border-b border-slate-500 text-white font-mono outline-none focus:border-green-500" />

          <span className="mx-2 text-slate-500">→</span>

          <div className={`px-3 py-1 rounded font-mono font-bold transition-all ${logicResult ? 'text-green-400 bg-green-900/30' : 'text-red-400 bg-red-900/30'}`}>
            {logicResult ? 'true (1)' : 'false (0)'}
          </div>
        </div>
        <p className="text-xs text-center mt-2 text-slate-500">改变数字，看看结果是 1 还是 0</p>
      </div>
    </div>
  );
}

// 8. 真题挑战 1
function QuizStage1() {
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const options = [
    { id: 'A', text: "'E'", correct: false },
    { id: 'B', text: "C+2", correct: false },
    { id: 'C', text: "672", correct: false },
    { id: 'D', text: "69", correct: true },
  ];

  const handleSelect = (id) => {
    if (showResult) return;
    setSelected(id);
    setShowResult(true);
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 p-4 rounded-t-2xl border-b border-indigo-500 shadow-lg">
        <span className="bg-indigo-500 text-xs px-2 py-1 rounded text-white font-bold shadow">2024年6月 GESP一级真题</span>
        <h3 className="font-mono mt-3 text-lg leading-relaxed">
          已知 'C' 的 ASCII 码为 67。<br />
          <span className="text-purple-300">char</span> a = <span className="text-yellow-300">'C'</span>;<br />
          <span className="text-blue-300">cout</span> &lt;&lt; (a + 2); <br />
          输出结果是？
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleSelect(opt.id)}
            className={`p-4 rounded-xl border-2 text-left flex justify-between items-center transition-all
              ${!showResult
                ? 'bg-slate-800 border-slate-700 hover:border-indigo-500 hover:bg-slate-700'
                : opt.correct
                  ? 'bg-green-900/40 border-green-500 text-green-300'
                  : selected === opt.id
                    ? 'bg-red-900/40 border-red-500 text-red-300'
                    : 'bg-slate-800 border-slate-700 opacity-50'
              }
            `}
          >
            <span className="font-bold text-lg"><span className="opacity-50 text-sm mr-2">{opt.id}.</span> {opt.text}</span>
            {showResult && opt.correct && <CheckCircle className="text-green-500" />}
            {showResult && selected === opt.id && !opt.correct && <XCircle className="text-red-500" />}
          </button>
        ))}
      </div>

      {showResult && (
        <div className="bg-slate-800 p-4 rounded-xl border-t-4 border-yellow-500 animate-fadeIn">
          <h4 className="font-bold text-yellow-400 mb-1">🕵️‍♂️ 特工分析：</h4>
          <p className="text-sm text-slate-300">
            变量 <code className="bg-black px-1 rounded">a</code> 是字符 'C' (67)。<br />
            计算 <code className="bg-black px-1 rounded">a + 2</code> 时，'C' 变身成数字 67，结果是 69。<br />
            因为没有强制转回 char，cout 默认输出数字 <strong>69</strong>。
          </p>
        </div>
      )}
    </div>
  );
}

// 9. 真题挑战 2
function QuizStage2() {
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const options = [
    { id: 'A', text: "double (小数)", correct: true },
    { id: 'B', text: "int (整数)", correct: false },
    { id: 'C', text: "char (字符)", correct: false },
    { id: 'D', text: "bool (布尔)", correct: false },
  ];

  const handleSelect = (id) => {
    if (showResult) return;
    setSelected(id);
    setShowResult(true);
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 p-4 rounded-t-2xl border-b border-indigo-500 shadow-lg">
        <span className="bg-indigo-500 text-xs px-2 py-1 rounded text-white font-bold shadow">2023年3月 GESP一级真题</span>
        <h3 className="font-mono mt-3 text-lg leading-relaxed">
          表达式 <code className="bg-black/30 px-1 rounded text-sm">((3 == 0) + 'A' + 1 + 3.0)</code> 的结果类型为？
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleSelect(opt.id)}
            className={`p-4 rounded-xl border-2 text-left flex justify-between items-center transition-all
              ${!showResult
                ? 'bg-slate-800 border-slate-700 hover:border-indigo-500 hover:bg-slate-700'
                : opt.correct
                  ? 'bg-green-900/40 border-green-500 text-green-300'
                  : selected === opt.id
                    ? 'bg-red-900/40 border-red-500 text-red-300'
                    : 'bg-slate-800 border-slate-700 opacity-50'
              }
            `}
          >
            <span className="font-bold text-lg"><span className="opacity-50 text-sm mr-2">{opt.id}.</span> {opt.text}</span>
            {showResult && opt.correct && <CheckCircle className="text-green-500" />}
            {showResult && selected === opt.id && !opt.correct && <XCircle className="text-red-500" />}
          </button>
        ))}
      </div>

      {showResult && (
        <div className="bg-slate-800 p-4 rounded-xl border-t-4 border-yellow-500 animate-fadeIn">
          <h4 className="font-bold text-yellow-400 mb-1">🕵️‍♂️ 拆解分析：</h4>
          <ul className="text-sm text-slate-300 space-y-1">
            <li>1. <code className="bg-black px-1 rounded">3==0</code> 是假，变成 <strong>0</strong>。</li>
            <li>2. <code className="bg-black px-1 rounded">'A'</code> 变成数字 <strong>65</strong>。</li>
            <li>3. 关键点：出现了 <code className="text-yellow-400 font-bold">3.0</code> (double)！</li>
            <li><strong>结论：</strong> C++有“传染病原则”，只要算式里有小数，结果统统变成小数 (double)。</li>
          </ul>
        </div>
      )}
    </div>
  );
}

// 10. 总结
function SummaryStage() {
  return (
    <div className="text-center space-y-8 animate-fadeIn">
      <div className="inline-block p-6 bg-green-500 rounded-full shadow-[0_0_30px_rgba(34,197,94,0.5)]">
        <CheckCircle size={64} className="text-white" />
      </div>

      <div>
        <h2 className="text-3xl font-bold text-white mb-2">特工任务完成！</h2>
        <p className="text-slate-400">你已经掌握了本课的核心机密。</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-left">
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <h3 className="font-bold text-yellow-400 mb-2 border-b border-slate-600 pb-2">Char (字符)</h3>
          <ul className="text-sm text-slate-300 space-y-2">
            <li>• 用单引号 <code className="bg-black px-1 rounded">' '</code></li>
            <li>• 背后的数字：ASCII</li>
            <li>• '0'{'->'}48, 'A'{'->'}65, 'a'{'->'}97</li>
          </ul>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <h3 className="font-bold text-blue-400 mb-2 border-b border-slate-600 pb-2">Bool (布尔)</h3>
          <ul className="text-sm text-slate-300 space-y-2">
            <li>• 只有真(true) 和 假(false)</li>
            <li>• true 是 1</li>
            <li>• false 是 0</li>
            <li>• 乔治·布尔是 0 和 1 的鼻祖</li>
          </ul>
        </div>
      </div>

      <button onClick={() => window.location.reload()} className="text-slate-500 hover:text-white flex items-center justify-center gap-2 mx-auto mt-8">
        <RefreshCw size={16} /> 再复习一遍
      </button>
    </div>
  );
}