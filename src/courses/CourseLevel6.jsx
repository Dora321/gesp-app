import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code, Terminal, CheckCircle, AlertTriangle, Play, ChevronRight, Calculator, Cpu, Hash, Trophy, Eye, Lightbulb, Copy, Check, Unlock, ArrowRight, Grid, Info, ArrowRightLeft, RefreshCw, Clock, Target, XCircle, Layout, GitCommit, Layers, Box, AlignJustify, Divide, Table, Database, MousePointer, Share2, Menu, X } from 'lucide-react';
import CppLevelSupport from '../components/CppLevelSupport';
import CppLessonDirectory from '../components/CppLessonDirectory';
import { cppL6Lessons } from '../data/cppL6CourseFlow';

// --- Shared Components ---
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-md overflow-hidden border border-slate-100 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, variant = "primary", className = "", disabled = false }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
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

// --- Modules ---

// Overview Module
const OverviewModule = ({ onStart }) => (
  <div className="space-y-6 animate-fade-in">
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
      <h1 className="text-3xl font-bold mb-4">GESP C++ 六级冲刺指南</h1>
      <p className="text-indigo-100 text-lg mb-6">
        跨越编程分水岭。掌握面向对象(Class)、指针操作与高精度算法，开启高级编程大门。
      </p>
      <button
        onClick={() => onStart('class')}
        className="bg-white text-indigo-700 px-6 py-2 rounded-full font-bold hover:bg-indigo-50 transition flex items-center gap-2"
      >
        开始学习 <ArrowRight size={18} />
      </button>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
          <Box size={24} />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">类与对象</h3>
        <p className="text-slate-600 text-sm">
          从 Struct 到 Class。理解封装、构造函数、访问权限(public/private)。
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
        <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-4">
          <MousePointer size={24} />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">指针精讲</h3>
        <p className="text-slate-600 text-sm">
          内存的坐标。理解 `&` 取地址与 `*` 解引用，指针与数组的关系。
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
        <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
          <Cpu size={24} />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">算法进阶</h3>
        <p className="text-slate-600 text-sm">
          高精度计算(BigInt)加减乘除、简单贪心算法及其证明。
        </p>
      </div>
    </div>

    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Calculator className="text-indigo-500" /> GESP 六级分数构成
      </h3>
      <div className="flex gap-2 mb-4">
        {[
          { name: "选择题", score: 30, color: "bg-blue-500", desc: "15题 指针/类/逻辑" },
          { name: "判断题", score: 20, color: "bg-green-500", desc: "10题 概念辨析" },
          { name: "编程题", score: 50, color: "bg-purple-500", desc: "2题 BigInt/Greedy" },
        ].map((item, idx) => (
          <div key={idx} className="flex-1">
            <div className={`h-10 ${item.color} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
              {item.name}: {item.score}分
            </div>
            <div className="text-xs text-slate-500 text-center mt-1">{item.desc}</div>
          </div>
        ))}
      </div>
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <p className="text-indigo-800 text-sm">
          <strong>💡 考级分水岭：</strong>六级是初级到中高级的跳板。<b>指针</b>是C/C++的灵魂，理解了指针，才算真正入了门。编程题常考<b>高精度运算</b>，必须背诵模板。
        </p>
      </div>
    </div>

    {/* Self Assessment */}
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Lightbulb className="text-yellow-500" /> 六级核心技能自测
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { skill: "Class Definition", icon: "📦", hint: "private/public" },
          { skill: "Constructors", icon: "🔨", hint: "ClassName()" },
          { skill: "Pointer &", icon: "📍", hint: "Address Of" },
          { skill: "Pointer *", icon: "🔑", hint: "Dereference" },
          { skill: "Pointer Array", icon: "🚋", hint: "*(p+i)" },
          { skill: "Struct Pointer", icon: "👉", hint: "p->member" },
          { skill: "BigInt Add", icon: "➕", hint: "Column Math" },
          { skill: "Greedy Algo", icon: "🍰", hint: "Local Optimal" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-lg border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="font-medium text-slate-700 text-sm group-hover:text-indigo-600">{item.skill}</div>
            <div className="text-xs text-slate-400 mt-1">{item.hint}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- Topic Modules ---

// 专题一：类与对象 (ClassModule)
const ClassModule = () => {
  // Class Inspector State
  const [petName] = useState("Lucky");
  const [petAge, setPetAge] = useState(3);
  const [isPrivateVisible, setIsPrivateVisible] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState([]);

  const log = (msg) => setConsoleOutput(prev => [...prev.slice(-4), msg]);

  const handleBark = () => {
    log(`${petName}: Woof! Woof!`);
  };

  const handleBirthday = () => {
    setPetAge(a => a + 1);
    log(`${petName} is now ${petAge + 1} years old!`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
        <h3 className="font-bold text-indigo-800 mb-2">核心心法</h3>
        <p className="text-indigo-700">Class 是 Struct 的升级版。核心在于<b>封装</b>：把数据 (member variables) 和操作数据的方法 (member functions) 打包在一起，并控制谁能访问 (public/private)。</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Code size={18} /> 类定义模板</h4>
          <CodeBlock
            title="Dog Class Definition"
            code={`class Dog {
private:
    int age;        // 私有成员
public:
    string name;    // 公有成员

    // 构造函数
    Dog(string n, int a) {
        name = n;
        age = a;
    }

    void bark() {
        cout << name << ": Woof!" << endl;
    }
};`}
          />
        </div>

        <Card className="p-5 bg-white">
          <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><Box size={18} /> 对象透视镜 (Object Inspector)</h4>

          <div className="flex gap-4 mb-6 items-center">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-4xl border-4 border-indigo-200">
              🐶
            </div>
            <div>
              <div className="font-bold text-xl text-slate-800">Object: myDog</div>
              <div className="text-xs text-slate-500 font-mono">Address: 0x7ffd8a40</div>
            </div>
          </div>

          <div className="space-y-3 font-mono text-sm">
            <div className="p-3 bg-green-50 rounded border border-green-200 flex justify-between items-center">
              <span className="text-green-800 font-bold">public: string name</span>
              <div className="flex items-center gap-2">
                <span className="bg-white px-2 py-1 rounded border text-slate-600">"{petName}"</span>
              </div>
            </div>

            <div className="p-3 bg-red-50 rounded border border-red-200 flex justify-between items-center relative overflow-hidden">
              <span className="text-red-800 font-bold">private: int age</span>
              <div className="flex items-center gap-2">
                {isPrivateVisible ? (
                  <span className="bg-white px-2 py-1 rounded border text-slate-600">{petAge}</span>
                ) : (
                  <span className="text-slate-400 italic">Hidden</span>
                )}
                <button onClick={() => setIsPrivateVisible(!isPrivateVisible)} className="p-1 hover:bg-red-100 rounded text-red-600">
                  {isPrivateVisible ? <Eye size={14} /> : <Unlock size={14} />}
                </button>
              </div>
              {!isPrivateVisible && <div className="absolute inset-0 bg-slate-100/50 flex items-center justify-center text-xs text-slate-500 backdrop-blur-[1px]">Inaccessible from outside</div>}
            </div>
          </div>

          <div className="mt-6 border-t pt-4">
            <h5 className="text-xs font-bold text-slate-500 uppercase mb-3">Member Functions (Methods)</h5>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleBark}>myDog.bark()</Button>
              <Button size="sm" variant="secondary" onClick={handleBirthday}>myDog.birthday()</Button>
            </div>
            {consoleOutput.length > 0 && (
              <div className="mt-4 bg-slate-900 text-green-400 p-3 rounded text-xs font-mono">
                {consoleOutput.map((l, i) => <div key={i}>{'>'} {l}</div>)}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

// 专题二：指针精讲 (PointerModule)
const PointerModule = () => {
  // Memory Visualizer
  const [arrValues, setArrValues] = useState([10, 20, 30, 40]);
  const baseAddr = 1000;
  const [ptrIndex, setPtrIndex] = useState(0);

  return (
    <div className="space-y-6">
      <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
        <h3 className="font-bold text-teal-800 mb-2">核心心法</h3>
        <p className="text-teal-700">指针就是<b>地址</b>。<code>int *p = &a;</code> 意思是 p 存了 a 的地址。<code>*p</code> 则是去那个地址里拿东西。数组名本质上就是首地址。</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Code size={18} /> 核心代码模板</h4>
          <CodeBlock
            title="指针基础与遍历"
            code={`int a = 10;
int *p = &a; // p 指向 a
cout << *p;  // 输出 10

// 数组与指针
int arr[5] = {1,2,3,4,5};
int *ptr = arr; // 指向 arr[0]
*(ptr + 1);     // 访问 arr[1]
ptr++;          // 指向下一个元素`}
          />
        </div>

        <Card className="p-5 bg-white">
          <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><MousePointer size={18} /> 内存显微镜 (int ptr)</h4>

          <div className="relative pt-8 pb-4">
            {/* Memory Cells */}
            <div className="flex gap-0 border-2 border-slate-300 rounded-lg overflow-hidden bg-slate-100 w-fit mx-auto">
              {arrValues.map((val, idx) => (
                <div key={idx} className="w-16 h-20 border-r border-slate-300 last:border-r-0 flex flex-col items-center justify-center relative group">
                  <span className="font-bold text-slate-800 text-lg">{val}</span>
                  <span className="text-[10px] text-slate-500 font-mono absolute bottom-1">{baseAddr + idx * 4}</span>
                  <span className="text-[10px] text-purple-500 font-mono absolute top-1 opacity-0 group-hover:opacity-100">arr[{idx}]</span>
                </div>
              ))}
            </div>

            {/* Pointer Arrow */}
            <div
              className="absolute top-0 transition-all duration-300 flex flex-col items-center"
              style={{ left: `calc(50% - ${arrValues.length * 32}px + ${ptrIndex * 64}px + 16px)` }} // Simplified positioning logic
            >
              <div className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 mb-1 shadow-sm">
                p (ptr)
              </div>
              <div className="text-indigo-600">▼</div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg text-sm space-y-2 font-mono border border-slate-200 mt-4">
            <div className="flex justify-between">
              <span>CURRENT ADDRESS (p):</span>
              <span className="font-bold text-indigo-600">{baseAddr + ptrIndex * 4}</span>
            </div>
            <div className="flex justify-between">
              <span>DEREFERENCE (*p):</span>
              <span className="font-bold text-green-600">{arrValues[ptrIndex]}</span>
            </div>
          </div>

          <div className="flex gap-2 mt-4 justify-center">
            <Button size="sm" disabled={ptrIndex === 0} onClick={() => setPtrIndex(i => i - 1)} variant="secondary">p--</Button>
            <Button size="sm" onClick={() => setArrValues(prev => {
              const n = [...prev];
              n[ptrIndex]++;
              return n;
            })} variant="outline">(*p)++</Button>
            <Button size="sm" disabled={ptrIndex === arrValues.length - 1} onClick={() => setPtrIndex(i => i + 1)} variant="secondary">p++</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

// 专题三：算法进阶 (AlgoModule)
const AlgoModule = () => (
  <div className="space-y-6">
    <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
      <h3 className="font-bold text-amber-800 mb-2">核心心法</h3>
      <p className="text-amber-700">六级两座大山：<b>高精度运算</b>（普通 integer 装不下的超大整数）和<b>贪心算法</b>（在当前看来最好的选择）。高精度必须背模板，贪心重在找策略。</p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Code size={18} /> 高精度加法模板</h4>
        <CodeBlock
          title="BigInt Add"
          code={`// C = A + B
for(int i=0; i<A.size() || i<B.size(); i++) {
    if(i < A.size()) c[i] += A[i];
    if(i < B.size()) c[i] += B[i];
    if(c[i] >= 10) {
        c[i+1] += 1; // 进位
        c[i] -= 10;
    }
}`}
        />
        <div className="bg-white p-3 rounded border border-slate-200 mt-4 text-sm text-slate-600">
          <strong>Tip:</strong> 通常用 string 读入，然后<b>倒序</b>存入 vector/int数组 进行计算，方便处理进位。
        </div>
      </div>

      <Card className="p-5 bg-white">
        <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><Database size={18} /> 高精度原理演示</h4>
        <div className="flex items-center justify-center gap-4 text-2xl font-mono p-6 bg-slate-50 rounded-lg">
          <div className="flex flex-col items-end gap-1">
            <div className="tracking-widest text-slate-400">01</div>
            <div>8 9</div>
            <div>+ 3 4</div>
            <div className="w-full h-0.5 bg-slate-800 my-1"></div>
            <div className="text-indigo-600 font-bold">1 2 3</div>
          </div>
          <div className="text-sm text-slate-500 ml-4 max-w-[150px]">
            9+4=13, 进1留3<br />
            8+3+1=12, 进1留2<br />
            最高位补1
          </div>
        </div>
        <div className="text-center mt-4 text-xs text-slate-400">
          实际上数组是倒着存的：<br />
          A: [9, 8], B: [4, 3] &rarr; C: [3, 2, 1]
        </div>
      </Card>
    </div>
  </div>
);

// -----------------------------------------------------------------------------
// Module: Code Trace
// -----------------------------------------------------------------------------
const CodeTraceModule = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedExample, setSelectedExample] = useState(0);

  const examples = [
    {
      title: "递归求阶乘 (Fact)",
      code: `long long fact(int n) {\n    if (n == 1) return 1;\n    return n * fact(n - 1);\n}\n// Call: fact(3)`,
      steps: [
        { line: 5, vars: { n: 3 }, desc: "Initial call: fact(3)", output: "" },
        { line: 1, vars: { n: 3 }, desc: "Enter fact(3)", output: "" },
        { line: 2, vars: { n: 3 }, desc: "n == 1? False", output: "" },
        { line: 3, vars: { n: 3 }, desc: "Recurse: 3 * fact(2)", output: "" },
        { line: 1, vars: { n: 2 }, desc: "Enter fact(2)", output: "" },
        { line: 2, vars: { n: 2 }, desc: "n == 1? False", output: "" },
        { line: 3, vars: { n: 2 }, desc: "Recurse: 2 * fact(1)", output: "" },
        { line: 1, vars: { n: 1 }, desc: "Enter fact(1)", output: "" },
        { line: 2, vars: { n: 1 }, desc: "n == 1? True! Return 1", output: "" },
        { line: 3, vars: { res: 1 }, desc: "Return 1 to fact(2)... compute 2 * 1", output: "" },
        { line: 3, vars: { res: 2 }, desc: "Return 2 to fact(3)... compute 3 * 2", output: "6" }
      ]
    },
    {
      title: "指针遍历数组",
      code: `int a[] = {10, 20};\nint *p = a;\nint sum = 0;\nfor(int i=0; i<2; i++) {\n    sum += *p;\n    p++;\n}`,
      steps: [
        { line: 1, vars: { a: "{10, 20}", p: "?", sum: "?" }, desc: "Init array", output: "" },
        { line: 2, vars: { p: "&a[0]", sum: 0 }, desc: "p points to a[0] (10)", output: "" },
        { line: 3, vars: { sum: 0 }, desc: "Init sum", output: "" },
        { line: 4, vars: { i: 0 }, desc: "Loop i=0", output: "" },
        { line: 5, vars: { sum: 10 }, desc: "sum += *p (10) -> sum=10", output: "" },
        { line: 6, vars: { p: "&a[1]" }, desc: "p++ (moves to 20)", output: "" },
        { line: 4, vars: { i: 1 }, desc: "Loop i=1", output: "" },
        { line: 5, vars: { sum: 30 }, desc: "sum += *p (20) -> sum=30", output: "" },
        { line: 6, vars: { p: "&a[2]" }, desc: "p++ (out of bounds but ok if not dereferenced)", output: "" }
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
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
          <Eye /> 代码跟踪模拟器
        </h2>
        <p className="text-cyan-100">
          透视递归调用栈与指针移动轨迹。
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
            trace.cpp
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
        title="1. struct 构造函数"
        desc="初始化更方便"
        code={`struct Node {
    int x, y;
    // 构造函数
    Node(int _x, int _y) {
        x = _x;
        y = _y;
    }
};
// 使用
Node a(10, 20);`}
      />
      <TemplateBlock
        title="2. 高精度结构体 (BigInt)"
        desc="基础框架"
        code={`struct BigInt {
    int len;
    int digit[1005];
    BigInt() {
        len = 0;
        memset(digit, 0, sizeof(digit));
    }
};`}
      />
      <TemplateBlock
        title="3. 贪心排序比较"
        desc="区间问题常用"
        code={`struct Range {
    int l, r;
};
bool cmp(Range a, Range b) {
    return a.r < b.r; // 按右端点排序
}
sort(arr, arr+n, cmp);`}
      />
      <TemplateBlock
        title="4. 文件读写 (freopen)"
        desc="老版竞赛常用 / 调试用"
        code={`freopen("in.txt", "r", stdin);
freopen("out.txt", "w", stdout);

// ... code ...

fclose(stdin);
fclose(stdout);`}
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
      <p className="text-amber-100">GESP 六级满分避坑指南。</p>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
        <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2"><Clock size={20} /> 时间与空间</h3>
        <ul className="space-y-2 text-sm text-blue-900">
          <li>• <strong>高精度效率</strong>: 使用 `vector{'<'}int{'>'}` 存大数时，注意 push_back 的开销，最好 vector.reserve() 或直接用 array。</li>
        </ul>
      </div>
      <div className="bg-green-50 p-6 rounded-xl border border-green-100">
        <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2"><Target size={20} /> 代码规范</h3>
        <ul className="space-y-2 text-sm text-green-900">
          <li>• <strong>类内变量初始化</strong>: 只有 C++11 后才支持 `int a = 0;` 直接初始化。考试时更推荐在构造函数里写 `a=0;`。</li>
        </ul>
      </div>
      <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
        <h3 className="font-bold text-purple-800 mb-4 flex items-center gap-2"><AlertTriangle size={20} /> 致命陷阱</h3>
        <ul className="space-y-2 text-sm text-purple-900">
          <li>• <strong>空指针</strong>: 对 `nullptr` 进行解引用 (`*p`) 会直接 Runtime Error (RE)。</li>
          <li>• <strong>野指针</strong>: 定义指针不初始化 `int *p;` 是非常危险的，一定要 `int *p = nullptr;`。</li>
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
      q: "int a=10; int *p=&a; *p=20; 此时 a 的值是？",
      opts: ["10", "20", "未知", "编译错误"],
      ans: 1,
      expl: "*p 就是 a 本身。修改 *p 等于修改 a。"
    },
    {
      q: "关于 Class 和 Struct 的区别，默认访问权限分别是？",
      opts: ["都是 public", "都是 private", "Class默认private, Struct默认public", "Class默认public, Struct默认private"],
      ans: 2,
      expl: "这是 C++ 中 Class 和 Struct 唯一的实质区别。"
    },
    {
      q: "若有 Class Dog，实例化一个对象 d，调用成员函数 bark 的正确写法是？",
      opts: ["Dog.bark()", "d.bark()", "d->bark()", "bark(d)"],
      ans: 1,
      expl: "对象使用点号 . 访问成员。指针才用箭头 -> 。"
    },
    {
      q: "高精度加法中，两个 N 位数相加，结果最多是多少位？",
      opts: ["N", "N+1", "2N", "N^2"],
      ans: 1,
      expl: "99 + 99 = 198 (2位变3位)。最多进一位。"
    },
    {
      q: "int *p = new int; 使用完后忘记 delete p 会导致什么？",
      opts: ["编译错误", "内存泄漏 (Memory Leak)", "野指针", "系统崩溃"],
      ans: 1,
      expl: "new 出来的内存必须手动 delete，否则占用的堆内存永远不会释放。"
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
                    : 'border-slate-100 hover:border-indigo-400 hover:bg-indigo-50 text-slate-700'}`}
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

// -----------------------------------------------------------------------------
// Module: CheckList
// -----------------------------------------------------------------------------
const CheckListModule = () => {
  const items = [
    "类：成员变量默认 private，要加 public: 才能在外面访问。",
    "指针：int *p = &a; *p 取值，&a 取地址。p++ 移动 sizeof(type) 字节。",
    "算法：高精度运算别忘了处理进位 (carry) 和借位。",
    "调试：遇到段错误 (Segmentation Fault) 99% 是指针越界或访问了空指针。",
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
};

// --- Main Component ---

export default function CourseLevel6() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'overview', label: '知识体系', icon: BookOpen },
    { id: 'class', label: '类与对象', icon: Box },
    { id: 'pointer', label: '指针精讲', icon: MousePointer },
    { id: 'algo', label: '算法进阶', icon: Layers },
    { id: 'trace', label: '代码跟踪', icon: Eye },
    { id: 'templates', label: '万能模板', icon: Code },
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
          <span className="bg-pink-600 text-white px-2 py-0.5 rounded text-xs">C++</span>
          GESP 六级
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
            <h1 className="text-xl font-bold text-slate-800">GESP 六级</h1>
          </div>
          <p className="text-xs text-slate-500">深度搜索 2025版</p>
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
                  ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100'
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
          <p className="text-xs text-slate-400">© 2025 GESP 备考互动课件</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pt-16 md:pt-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 justify-between shrink-0">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            {activeTabInfo?.icon && <activeTabInfo.icon className="text-indigo-600" size={24} />}
            {activeTabInfo?.label}
          </h2>
          <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">Level 6</span>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto">
            {activeTab === 'overview' && <CppLevelSupport level={6} />}
            {activeTab === 'overview' && (
              <div className="mb-6"><CppLessonDirectory level={6} lessons={cppL6Lessons} accent="orange" /></div>
            )}
            {activeTab === 'overview' && <OverviewModule onStart={setActiveTab} />}
            {activeTab === 'class' && <div className="animate-fade-in"><ClassModule /></div>}
            {activeTab === 'pointer' && <div className="animate-fade-in"><PointerModule /></div>}
            {activeTab === 'algo' && <div className="animate-fade-in"><AlgoModule /></div>}
            {activeTab === 'trace' && <div className="animate-fade-in"><CodeTraceModule /></div>}
            {activeTab === 'templates' && <div className="animate-fade-in"><TemplatesModule /></div>}
            {activeTab === 'tips' && <div className="animate-fade-in"><ExamTipsModule /></div>}
            {activeTab === 'practice' && <div className="animate-fade-in"><PracticeModule /></div>}
            {activeTab === 'checklist' && <div className="animate-fade-in"><CheckListModule /></div>}
            {activeTab === menuItems[menuItems.length - 1]?.id && (
              <CppLevelSupport level={6} placement="bottom" />
            )}
          </div>
          <footer className="text-center text-slate-400 py-8 text-sm mt-8 border-t border-slate-100">
            GESP C++ 六级备考互动课件 | 面向对象与指针
          </footer>
        </main>
      </div>
    </div>
  );
}
