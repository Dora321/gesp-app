import React, { useState, useEffect } from 'react';
import CppL1LessonSupport from '../../../components/CppL1LessonSupport';
import LegacyCppLessonShell from '../LegacyCppLessonShell';
import { MasteryCheck, TransferCheck } from '../CppLessonShell';
import {
  Backpack,
  Box,
  Tag,
  ArrowRight,
  Check,
  X,
  AlertTriangle,
  Play,
  RotateCcw,
  Trophy,
  Search,
  BookOpen,
  Code,
  Menu
} from 'lucide-react';

const lesson2MasteryItems = [
  {
    label: '能说清变量是“带名字的数据盒子”。',
    evidence: '能用 int a = 5; 说明类型、变量名、赋值号、初始值和分号。',
    retryHint: '回到“造盒子：变量定义”，逐个点击代码组成部分。',
  },
  {
    label: '能判断变量名是否合法。',
    evidence: '能检查是否有空格/减号、是否数字开头、是否用了 int 等关键字。',
    retryHint: '回到三条起名纪律，把每条规则各写一个反例。',
  },
  {
    label: '能解释大小写和下划线在变量名里的作用。',
    evidence: '知道 score、Score、my_score 是不同名字，下划线合法但减号不合法。',
    retryHint: '回到侦探挑战，用 super_man 和 super-man 对比。',
  },
  {
    label: '能写出两个变量并输出它们的和。',
    evidence: '例如 int apple = 10; int pen = 20; cout << apple + pen;',
    retryHint: '回到“上机实操 & 总结”，先模仿 final homework example。',
  },
];

// --- 课件内容数据 ---
const sections = [
  { id: 1, title: '乱糟糟的书包', icon: 'backpack', component: () => <IntroSlide />, category: "概念引入" },
  { id: 2, title: '造盒子：变量定义', icon: 'box', component: () => <DefinitionSlide />, category: "概念引入" },
  { id: 3, title: '起名纪律一：白名单', icon: 'alert', component: () => <RuleSlide data={{ title: '起名纪律一：白名单', rule: '只能用：英文字母、数字、下划线', forbidden: '空格、标点符号 (@, #, -)' }} />, category: "变量规则" },
  { id: 4, title: '起名纪律二：排头兵', icon: 'alert', component: () => <RuleSlide data={{ title: '起名纪律二：排头兵', rule: '数字不能当排头兵！', example: '1box (❌) vs box1 (✅)' }} />, category: "变量规则" },
  { id: 5, title: '起名纪律三：关键字', icon: 'alert', component: () => <RuleSlide data={{ title: '起名纪律三：关键字', rule: '不能抢系统的“专用词”', example: 'int, if, return, class' }} />, category: "变量规则" },
  { id: 6, title: '侦探眼力大挑战', icon: 'search', component: () => <GameSlide />, category: "实战演练" },
  { id: 7, title: '真题实战 (2023.12)', icon: 'trophy', component: () => <QuizSlide data={{ question: '以下 C++ 不可以作为变量的名称的是（ ）。', options: ['CCF GESP', 'ccfGESP', 'CCFgesp', 'CCF_GESP'], correct: 0, analysis: 'A选项中间有空格，变量名必须连在一起！D选项下划线是合法的。' }} />, category: "实战演练" },
  { id: 8, title: '真题实战 (2024.06)', icon: 'trophy', component: () => <QuizSlide data={{ question: '在 C++ 中，下列不可做变量的是（ ）。', options: ['five-Star', 'five_star', 'fiveStar', '_fiveStar'], correct: 0, analysis: 'A选项包含减号(-)，计算机认为是减法运算。B选项下划线是合法的。' }} />, category: "实战演练" },
  { id: 9, title: '上机实操 & 总结', icon: 'code', component: () => <SummarySlide />, category: "实战演练" },
  {
    id: 10,
    title: '离开前检查',
    icon: 'check',
    category: "实战演练",
    component: () => (
      <div className="py-6">
        <TransferCheck
            prompt={'换个例子：int age = 10; age = age + 5; 执行后 age 是多少？这两行分别做了什么？'}
            hint="= 是赋值：把右边算出来的值放进左边的盒子。"
            answer="age = 15。"
            steps={[
                'int age = 10; 创建盒子 age，放入 10。',
                'age = age + 5; 先算右边 10+5=15，再存回 age。',
                'age 变成 15。',
            ]}
        />
        <MasteryCheck
          title="C++ L1-2 变量与数据离开前检查"
          description="如果能解释变量、判断变量名、区分大小写和下划线、写出两个变量求和，就可以进入数据类型课。"
          items={lesson2MasteryItems}
        />
      </div>
    ),
  },
];


// --- 组件部分 ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-lg p-6 ${className} transition-all duration-300`}>
    {children}
  </div>
);

const Button = ({ onClick, children, variant = 'primary', disabled = false, className = '' }) => {
  const baseStyle = "px-6 py-2 rounded-lg font-bold transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200",
    secondary: "bg-green-500 text-white hover:bg-green-600 shadow-green-200",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "border-2 border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-500"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1 shadow-md'} ${className}`}
    >
      {children}
    </button>
  );
};

// 1. 乱糟糟的书包
const IntroSlide = () => {
  const [isOrganized, setIsOrganized] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">想象你的书包...</h2>
        <p className="text-gray-600">如果所有东西都混在一起，找数学书是不是很慢？</p>
      </div>

      <div className="relative w-full max-w-md h-64 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 p-4 overflow-hidden transition-all duration-500">
        {!isOrganized ? (
          <div className="animate-pulse">
            <Backpack className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-gray-400 opacity-20" />
            <span className="absolute top-10 left-10 text-2xl animate-bounce">🍎</span>
            <span className="absolute top-20 right-10 text-3xl animate-bounce" style={{ animationDelay: '0.2s' }}>📚</span>
            <span className="absolute bottom-10 left-20 text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>✏️</span>
            <span className="absolute bottom-20 right-20 text-3xl animate-bounce" style={{ animationDelay: '0.1s' }}>🎮</span>
            <span className="absolute top-1/2 left-1/2 text-xl font-bold text-red-500 transform -translate-x-1/2 -translate-y-1/2 rotate-12 border-4 border-red-500 p-2 rounded">
              乱七八糟！
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="bg-blue-100 rounded-lg flex flex-col items-center justify-center border border-blue-300">
              <span className="text-3xl">📚</span>
              <span className="text-xs font-bold text-blue-600 mt-1 bg-white px-2 rounded-full border border-blue-200">变量: 书</span>
            </div>
            <div className="bg-green-100 rounded-lg flex flex-col items-center justify-center border border-green-300">
              <span className="text-3xl">🍎</span>
              <span className="text-xs font-bold text-green-600 mt-1 bg-white px-2 rounded-full border border-green-200">变量: 零食</span>
            </div>
            <div className="bg-yellow-100 rounded-lg flex flex-col items-center justify-center border border-yellow-300">
              <span className="text-3xl">✏️</span>
              <span className="text-xs font-bold text-yellow-600 mt-1 bg-white px-2 rounded-full border border-yellow-200">变量: 文具</span>
            </div>
            <div className="bg-purple-100 rounded-lg flex flex-col items-center justify-center border border-purple-300">
              <span className="text-3xl">🎮</span>
              <span className="text-xs font-bold text-purple-600 mt-1 bg-white px-2 rounded-full border border-purple-200">变量: 玩具</span>
            </div>
          </div>
        )}
      </div>

      <Button onClick={() => setIsOrganized(!isOrganized)} variant={isOrganized ? "outline" : "primary"}>
        {isOrganized ? <><RotateCcw size={18} /> 打乱它</> : <><Tag size={18} /> 给物品分类贴标签（定义变量）</>}
      </Button>

      <div className="bg-blue-50 p-4 rounded-lg text-blue-800 text-sm max-w-md">
        <strong className="block mb-1">计算机的智慧：</strong>
        为了不乱丢数据，计算机需要制造“贴标签的小盒子”，它的名字叫——<strong>变量 (Variable)</strong>。
      </div>
    </div>
  );
};

// 2. 变量定义
const DefinitionSlide = () => {
  const [step, setStep] = useState(0);
  const [val, setVal] = useState(5);

  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="bg-gray-800 text-white p-6 rounded-xl font-mono text-2xl shadow-2xl relative w-full max-w-lg text-center">
        <span
          className={`cursor-pointer hover:text-blue-300 transition-colors ${step === 1 ? 'text-blue-400 font-bold scale-110 inline-block' : ''}`}
          onClick={() => setStep(1)}
        >
          int
        </span>
        &nbsp;
        <span
          className={`cursor-pointer hover:text-yellow-300 transition-colors ${step === 2 ? 'text-yellow-400 font-bold scale-110 inline-block' : ''}`}
          onClick={() => setStep(2)}
        >
          a
        </span>
        &nbsp;
        <span
          className={`cursor-pointer hover:text-red-300 transition-colors ${step === 3 ? 'text-red-400 font-bold scale-110 inline-block' : ''}`}
          onClick={() => setStep(3)}
        >
          =
        </span>
        &nbsp;
        <span
          className={`cursor-pointer hover:text-green-300 transition-colors ${step === 4 ? 'text-green-400 font-bold scale-110 inline-block' : ''}`}
          onClick={() => setStep(4)}
        >
          {val}
        </span>
        <span
          className={`cursor-pointer hover:text-gray-300 transition-colors ${step === 5 ? 'text-gray-400 font-bold scale-110 inline-block' : ''}`}
          onClick={() => setStep(5)}
        >
          ;
        </span>

        {step > 0 && (
          <div className="absolute -bottom-16 left-0 right-0 text-sm bg-white text-gray-800 p-2 rounded-lg border shadow-lg z-10 animate-fade-in-up">
            {step === 1 && "📢 类型：告诉计算机造一个装整数的盒子"}
            {step === 2 && "🏷️ 变量名：给盒子贴的标签"}
            {step === 3 && "📥 赋值号：把右边的东西放进左边"}
            {step === 4 && "🔢 初始值：一开始放进去的数据"}
            {step === 5 && "🛑 结束符：这句话说完了"}
          </div>
        )}
      </div>

      <div className="flex gap-8 items-center mt-12">
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 bg-yellow-100 border-4 border-yellow-400 rounded-lg flex items-center justify-center shadow-lg transform transition-all">
            <span className="text-4xl font-bold text-gray-700">{val}</span>
            <div className="absolute -top-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow">
              int a
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500">内存空间</p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-600">尝试修改值：</label>
          <input
            type="number"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="border-2 border-gray-300 rounded-lg px-3 py-2 w-32 text-center focus:border-blue-500 outline-none"
          />
          <p className="text-xs text-gray-400">输入数字，看看左边盒子的变化</p>
        </div>
      </div>
    </div>
  );
};

// 3, 4, 5. 规则卡片
const RuleSlide = ({ data }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-6">
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-8 rounded-2xl shadow-xl max-w-2xl w-full text-center">
        <h2 className="text-3xl font-bold mb-6 flex items-center justify-center gap-3">
          <AlertTriangle className="text-yellow-300" size={32} />
          {data.title}
        </h2>
        <div className="space-y-6 text-lg">
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/20">
            <h3 className="font-bold text-green-300 mb-2 text-xl">✅ 允许 (白名单)</h3>
            <p>{data.rule}</p>
          </div>

          {data.forbidden && (
            <div className="bg-red-500/20 p-4 rounded-lg backdrop-blur-sm border border-red-400/30">
              <h3 className="font-bold text-red-200 mb-2 text-xl">❌ 禁止 (黑名单)</h3>
              <p>{data.forbidden}</p>
            </div>
          )}

          {data.example && (
            <div className="bg-yellow-500/20 p-4 rounded-lg backdrop-blur-sm border border-yellow-400/30">
              <h3 className="font-bold text-yellow-200 mb-2 text-xl">💡 举例</h3>
              <p className="font-mono">{data.example}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 6. 侦探游戏
const GameSlide = () => {
  const [solved, setSolved] = useState([]);
  const [message, setMessage] = useState(null);

  const items = [
    { id: 1, text: 'super_man', valid: true },
    { id: 2, text: 'super man', valid: false, reason: '有空格！变量名必须连在一起' },
    { id: 3, text: 'super-man', valid: false, reason: '减号是数学运算，不能做名字' },
    { id: 4, text: 'man2024', valid: true },
    { id: 5, text: '2024man', valid: false, reason: '数字不能排第一位！' },
    { id: 6, text: 'int', valid: false, reason: 'int 是关键字（老师的名字）' },
  ];

  const handleInspect = (item) => {
    if (solved.includes(item.id)) return;

    if (!item.valid) {
      setSolved([...solved, item.id]);
      setMessage({ type: 'success', text: `抓到了！${item.text} ❌ ${item.reason}` });
    } else {
      setMessage({ type: 'error', text: `${item.text} 是好人（合法变量），不要抓错了！` });
    }
  };

  return (
    <div className="flex flex-col items-center h-full">
      <div className="mb-6 text-center">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 justify-center">
          <Search /> 任务：点击所有 <span className="text-red-600">不合法</span> 的变量名
        </h3>
        <p className="text-sm text-gray-500 mt-1">目前已抓获：{solved.length} / 4 个坏蛋</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
        {items.map(item => {
          const isCaught = solved.includes(item.id);
          return (
            <button
              key={item.id}
              onClick={() => handleInspect(item)}
              className={`
                 p-6 rounded-xl font-mono text-lg font-bold border-2 transition-all duration-300 relative overflow-hidden
                 ${isCaught
                  ? 'bg-red-100 border-red-500 text-red-700 opacity-60 cursor-default'
                  : 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-lg hover:-translate-y-1'
                }
               `}
            >
              {item.text}
              {isCaught && <div className="absolute inset-0 flex items-center justify-center bg-red-500/10 rotate-12 text-4xl">👮</div>}
            </button>
          );
        })}
      </div>

      {message && (
        <div className={`mt-6 p-4 rounded-lg flex items-center gap-2 animate-bounce-short ${message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
          {message.type === 'success' ? <Check size={20} /> : <X size={20} />}
          {message.text}
        </div>
      )}

      {solved.length === 4 && (
        <div className="mt-4 text-2xl font-bold text-yellow-500 animate-pulse">
          🏆 任务完成！你真是火眼金睛！
        </div>
      )}
    </div>
  );
};

// 7 & 8. 测验
const QuizSlide = ({ data }) => {
  const [selected, setSelected] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelected(null);
    setShowAnalysis(false);
  }, [data]);

  const handleSelect = (index) => {
    if (showAnalysis) return;
    setSelected(index);
    setShowAnalysis(true);
  };

  return (
    <div className="max-w-2xl w-full mx-auto">
      <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500">
        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded mb-4 inline-block">真题演练</span>
        <h3 className="text-xl font-bold text-gray-800 mb-6">{data.question}</h3>

        <div className="space-y-3">
          {data.options.map((opt, idx) => {
            let itemStyle = "border-gray-200 hover:bg-gray-50";
            let icon = null;

            if (showAnalysis) {
              if (idx === data.correct) {
                itemStyle = "bg-green-100 border-green-500 text-green-800";
                icon = <Check className="text-green-600" />;
              } else if (idx === selected) {
                itemStyle = "bg-red-100 border-red-500 text-red-800";
                icon = <X className="text-red-600" />;
              } else {
                itemStyle = "opacity-50 border-gray-100";
              }
            }

            return (
              <div
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all flex justify-between items-center ${itemStyle}`}
              >
                <span className="font-mono text-lg">{opt}</span>
                {icon}
              </div>
            );
          })}
        </div>

        {showAnalysis && (
          <div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg animate-fade-in">
            <h4 className="font-bold text-yellow-800 mb-1 flex items-center gap-2">
              <BookOpen size={16} /> 老师解析：
            </h4>
            <p className="text-yellow-900">{data.analysis}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// 9. 总结
const SummarySlide = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6 h-full items-center">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-blue-800 border-b pb-2">📜 记忆口诀</h2>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm border border-blue-100 text-lg leading-loose font-medium text-gray-700">
          <p>🔢 字母数字下划线，组成名字三条线。</p>
          <p>🚫 数字不能站最前，关键字要靠边站。</p>
          <p>🔗 中间不能有空格，大小写要分辨。</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2"><Code size={18} /> 课后挑战</h3>
          <ul className="list-disc list-inside text-sm text-green-900 space-y-1">
            <li>纠错员：检查家里人的微信名或手机联系人，哪些不符合 C++ 变量规则？</li>
            <li>编码：在 IDE 中定义两个变量 a 和 b，分别赋值 10 和 20，输出它们的和。</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 text-white font-mono shadow-2xl h-full flex flex-col">
        <div className="flex gap-1.5 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 space-y-2 text-sm md:text-base overflow-auto">
          <p className="text-gray-400">// Final Homework Example</p>
          <p><span className="text-purple-400">#include</span> <span className="text-green-400">&lt;iostream&gt;</span></p>
          <p><span className="text-purple-400">using</span> <span className="text-purple-400">namespace</span> std;</p>
          <p>&nbsp;</p>
          <p><span className="text-blue-400">int</span> main() {'{'}</p>
          <p className="pl-4"><span className="text-gray-400">// Step 1: Define</span></p>
          <p className="pl-4"><span className="text-blue-400">int</span> apple = <span className="text-yellow-300">10</span>;</p>
          <p className="pl-4"><span className="text-blue-400">int</span> pen = <span className="text-yellow-300">20</span>;</p>
          <p>&nbsp;</p>
          <p className="pl-4"><span className="text-gray-400">// Step 2: Add</span></p>
          <p className="pl-4"><span className="text-blue-400">int</span> total = apple + pen;</p>
          <p>&nbsp;</p>
          <p className="pl-4"><span className="text-gray-400">// Step 3: Output</span></p>
          <p className="pl-4">cout &lt;&lt; <span className="text-green-300">"Total: "</span> &lt;&lt; total;</p>
          <p className="pl-4"><span className="text-purple-400">return</span> <span className="text-yellow-300">0</span>;</p>
          <p>{'}'}</p>
        </div>
      </div>
    </div>
  );
};

// --- 主应用外壳 ---

// --- 布局组件 ---
const Icon = ({ name, size = 20, className = "" }) => {
  const icons = {
    "backpack": <Backpack size={size} className={className} />,
    "box": <Box size={size} className={className} />,
    "alert": <AlertTriangle size={size} className={className} />,
    "search": <Search size={size} className={className} />,
    "trophy": <Trophy size={size} className={className} />,
    "code": <Code size={size} className={className} />,
    "arrow-right": <ArrowRight size={size} className={className} />,
    "check": <Check size={size} className={className} />
  };
  return icons[name] || null;
};

function App() {
  const [activeSection, setActiveSection] = useState(1);

  // 获得当前组件
  const ActiveComponent = sections.find(s => s.id === activeSection)?.component;

  return (
    <LegacyCppLessonShell
      lessonNumber={2}
      lessonTitle="变量与数据"
      sections={sections}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      nextLessonPath="/lesson/1/3"
      renderIcon={(name, size) => <Icon name={name} size={size} />}
      topSupport={<CppL1LessonSupport lessonId={2} />}
      bottomSupport={<CppL1LessonSupport lessonId={2} placement="bottom" />}
    >
      {ActiveComponent ? React.createElement(ActiveComponent) : <div>Coming Soon</div>}
    </LegacyCppLessonShell>
  );
}

export default App;
