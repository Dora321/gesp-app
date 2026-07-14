import { useState } from 'react';
import { Book, Calculator, Code, Play, ChevronRight, Star, Zap, Trophy, MousePointerClick, Clock } from 'lucide-react';

export const OverviewSection = ({ changeTab }) => (
  <div className="space-y-8 animate-fade-in">
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
      <h2 className="text-3xl font-bold mb-4">GESP C++ 一级冲刺指南</h2>
      <p className="text-indigo-100 max-w-2xl mb-6">
        基于历年真题（2023-2025）分析，主要考察基本数据类型、算术运算、if-else 逻辑判断及基础循环的综合运用。
      </p>
      <button
        onClick={() => changeTab('topics')}
        className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-indigo-50 transition-colors flex items-center gap-2"
      >
        开始学习 <ChevronRight size={18} />
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Calculator className="text-blue-500" /> 核心考察能力
        </h3>
        <ul className="space-y-3">
          {[
            { title: "基本运算", desc: "整数除法 (/) 与取模 (%) 的区别与应用" },
            { title: "流程控制", desc: "if-else 嵌套与 for/while 循环" },
            { title: "数据类型", desc: "int, long long (大数累加), float/double" },
            { title: "算法思想", desc: "基础枚举法（穷举）与模拟法" }
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5">{idx + 1}</span>
              <div>
                <span className="font-medium text-slate-700">{item.title}</span>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Book className="text-green-500" /> 近期真题趋势
          </h3>
          <div className="space-y-4">
            <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
              <span className="text-xs font-bold text-amber-600 bg-amber-200 px-2 py-0.5 rounded mr-2">25年3月</span>
              <span className="text-sm text-slate-700">更加侧重**数学公式转化**，如“四舍五入”技巧。</span>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
              <span className="text-xs font-bold text-amber-600 bg-amber-200 px-2 py-0.5 rounded mr-2">24年12月</span>
              <span className="text-sm text-slate-700">考察**逻辑判断细节**，如温度转换中的浮点数处理。</span>
            </div>
          </div>
        </div>

        {/* Knowledge Stats Visualization */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Zap className="text-yellow-500" /> 考点掌握度要求
          </h3>
          <div className="space-y-3">
            {[
              { label: '变量与类型', val: 95, color: 'bg-green-500' },
              { label: '逻辑运算 (&& || !)', val: 90, color: 'bg-blue-500' },
              { label: '循环控制 (for/while)', val: 85, color: 'bg-purple-500' },
              { label: '数学应用 (mod/div)', val: 80, color: 'bg-orange-500' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                  <span>{stat.label}</span>
                  <span>{stat.val}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className={`h-2 rounded-full ${stat.color} transition-all duration-1000`} style={{ width: `${stat.val}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Self Assessment Quick Check */}
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Star className="text-yellow-500" /> 备考自测：你掌握了多少？
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { skill: "整数除法特性", icon: "÷", hint: "5/2=?" },
          { skill: "取模运算", icon: "%", hint: "7%3=?" },
          { skill: "闰年判断", icon: "📅", hint: "2024是闰年吗？" },
          { skill: "变量类型", icon: "🔢", hint: "int vs long long" },
          { skill: "冯·诺依曼", icon: "🖥️", hint: "五大部件" },
          { skill: "输入输出", icon: "⌨️", hint: "cin/cout" },
          { skill: "循环结构", icon: "🔄", hint: "for循环次数" },
          { skill: "逻辑运算", icon: "🧠", hint: "&& || !" },
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
      <p className="text-xs text-slate-500 mt-4 text-center">
        💡 如果以上概念你都清楚，说明基础扎实！点击侧边栏进入专题深度学习。
      </p>
    </div>

    {/* Quick Start Guide */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-blue-500 text-white p-2 rounded-lg">
            <Clock size={20} />
          </div>
          <h4 className="font-bold text-blue-800">第1周</h4>
        </div>
        <p className="text-sm text-blue-700">学习基础概念：计算机组成、冯·诺依曼体系、变量类型</p>
      </div>
      <div className="bg-green-50 p-5 rounded-xl border border-green-100 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-green-500 text-white p-2 rounded-lg">
            <Code size={20} />
          </div>
          <h4 className="font-bold text-green-800">第2周</h4>
        </div>
        <p className="text-sm text-green-700">掌握核心运算：整除取模、逻辑运算、循环结构</p>
      </div>
      <div className="bg-purple-50 p-5 rounded-xl border border-purple-100 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-purple-500 text-white p-2 rounded-lg">
            <Trophy size={20} />
          </div>
          <h4 className="font-bold text-purple-800">第3周</h4>
        </div>
        <p className="text-sm text-purple-700">真题模拟：刷历年真题、总结易错点、考前冲刺</p>
      </div>
    </div>
  </div>
);

export const TopicSection = ({ selectedTopic, setSelectedTopic }) => {
  const topics = [
    { title: "数学计算与公式应用", color: "blue", component: <MathTopic /> },
    { title: "取模与整除的妙用", color: "purple", component: <ModuloTopic /> },
    { title: "循环枚举与统计", color: "green", component: <LoopTopic /> },
    { title: "逻辑模拟与分支", color: "orange", component: <LogicTopic /> },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-2 overflow-x-auto pb-4 mb-2">
        {topics.map((t, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedTopic(idx)}
            className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium transition-all ${selectedTopic === idx
              ? `bg-${t.color}-600 text-white shadow-md`
              : `bg-white text-slate-600 border border-slate-200 hover:bg-slate-50`
              }`}
          >
            专题 {idx + 1}: {t.title}
          </button>
        ))}
      </div>
      <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {topics[selectedTopic].component}
      </div>
    </div>
  );
};

export const MathTopic = () => {
  const [roundInput, setRoundInput] = useState(23);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-xl font-bold text-slate-800">数学公式转化为代码</h3>
        <p className="text-slate-600 mt-2">
          重点在于处理整数运算的特性（自动向下取整）。
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded ml-2">5 / 2 = 2</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Play size={18} className="text-blue-500" />
            典型考题：四舍五入 (25年3月)
          </h4>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <p className="text-sm text-slate-600 mb-3">题目：将整数四舍五入到最接近的整十数。</p>
            <div className="flex items-center gap-4 mb-4">
              <input
                type="number"
                value={roundInput}
                onChange={(e) => setRoundInput(Number(e.target.value))}
                className="w-24 px-3 py-2 border rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <span className="text-2xl text-slate-400">→</span>
              <div className="text-xl font-bold text-blue-600">
                {Math.floor((roundInput + 5) / 10) * 10}
              </div>
            </div>
            <div className="bg-slate-800 text-slate-200 p-3 rounded-md font-mono text-sm">
              <span className="text-gray-500">// 核心公式技巧</span><br />
              int ans = (x + 5) / 10 * 10;
            </div>
            <p className="text-xs text-slate-500 mt-2">
              原理：加上5后，如果是大数会进位，小数则不会。整数除以10会自动丢弃个位。
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-slate-700 mb-3">真题案例库</h4>
          <div className="space-y-3">
            <CaseCard
              year="24年12月"
              title="温度转换"
              desc="输入开尔文，输出摄氏和华氏。注意使用 double 和保留小数。"
            />
            <CaseCard
              year="24年3月"
              title="小杨买书"
              desc="求能买几本(m/13)和剩多少钱(m%13)。标准的除法与取模。"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModuloTopic = () => {
  const [year, setYear] = useState(2024);
  const isLeap = (y) => (y % 400 === 0) || (y % 4 === 0 && y % 100 !== 0);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-xl font-bold text-slate-800">取模 (%) 与整除的妙用</h3>
        <p className="text-slate-600 mt-2">
          GESP 一级核心考点，涉及倍数、闰年、星期计算。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Play size={18} className="text-purple-500" />
            模拟：闰年判断器 (23年3月)
          </h4>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <label className="text-sm font-medium">输入年份:</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-24 px-2 py-1 border rounded"
              />
            </div>

            <div className="space-y-2 font-mono text-sm mb-3">
              <div className={`p-2 rounded ${year % 400 === 0 ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-500'}`}>
                {year} % 400 == 0 ? {year % 400 === 0 ? 'YES' : 'NO'}
              </div>
              <div className="text-center text-xs text-slate-400">OR</div>
              <div className={`p-2 rounded ${(year % 4 === 0 && year % 100 !== 0) ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-500'}`}>
                ({year} % 4 == 0) && ({year} % 100 != 0) ? {(year % 4 === 0 && year % 100 !== 0) ? 'YES' : 'NO'}
              </div>
            </div>

            <div className={`text-center font-bold p-2 rounded ${isLeap(year) ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'}`}>
              结论：{isLeap(year) ? "是闰年 (Leap Year)" : "是平年"}
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-slate-700 mb-3">常见公式</h4>
          <div className="bg-slate-800 text-slate-200 p-4 rounded-lg font-mono text-sm space-y-4">
            <div>
              <p className="text-gray-500 mb-1">// 判断 x 是否是 n 的倍数</p>
              if (x % n == 0)
            </div>
            <div>
              <p className="text-gray-500 mb-1">// 星期几计算 (n天后)</p>
              // 假设今天是星期 x
              ans = (x + n - 1) % 7 + 1;
            </div>
            <div>
              <p className="text-gray-500 mb-1">// 取个位数</p>
              last_digit = n % 10;
            </div>
          </div>
          <div className="mt-4">
            <CaseCard year="24年9月" title="美丽数字" desc="判断是否是9的倍数但不是8的倍数：(x % 9 == 0 && x % 8 != 0)" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const LoopTopic = () => {
  const [num, setNum] = useState(12);

  const getFactors = (n) => {
    let factors = [];
    for (let i = 1; i <= n; i++) {
      if (n % i === 0) factors.push(i);
    }
    return factors;
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-xl font-bold text-slate-800">循环枚举与统计</h3>
        <p className="text-slate-600 mt-2">
          遍历区间 1 到 N，找出符合条件的数（找因数、质数、累加）。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Play size={18} className="text-green-500" />
            可视化：找因数 (24年3月)
          </h4>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="mb-4">
              <label className="mr-2 text-sm">输入数字 N:</label>
              <input
                type="number"
                max="100"
                value={num}
                onChange={(e) => setNum(Math.min(100, Math.max(1, Number(e.target.value))))}
                className="w-20 px-2 py-1 border rounded"
              />
              <span className="text-xs text-gray-400 ml-2">(演示限制最大100)</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {Array.from({ length: num }, (_, i) => i + 1).map(i => {
                const isFactor = num % i === 0;
                return (
                  <div
                    key={i}
                    className={`w-8 h-8 flex items-center justify-center text-xs rounded transition-all duration-500 ${isFactor
                      ? 'bg-green-500 text-white font-bold scale-110'
                      : 'bg-gray-100 text-gray-300'
                      }`}
                  >
                    {i}
                  </div>
                )
              })}
            </div>
            <div className="text-sm">
              因数: <span className="font-mono font-bold text-green-600">{getFactors(num).join(', ')}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <CaseCard
            year="25年9月"
            title="金字塔"
            desc="计算垒金字塔需要的石块数，第i层需要 i*i 块。核心：sum += i*i"
          />
          <CaseCard
            year="23年9月"
            title="小明的幸运数"
            desc="统计区间和。⚠️注意：累加变量必须用 long long 防止溢出！"
          />
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p className="font-bold text-yellow-800 text-sm">解题模板</p>
            <pre className="text-xs text-yellow-900 mt-2 font-mono whitespace-pre-wrap">
              {`long long sum = 0;
for (int i = 1; i <= n; i++) {
    if (/* 条件 */) {
        sum += i;
    }
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LogicTopic = () => {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-xl font-bold text-slate-800">逻辑模拟与分支</h3>
        <p className="text-slate-600 mt-2">
          模拟生活场景，通常涉及复杂的 if-else 嵌套或状态更新。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <CaseCard
            year="24年6月"
            title="休息时间 (时间进位)"
            desc="秒加满60进1分，分加满60进1时。这是一种经典的模拟法。"
          />
          <CaseCard
            year="25年3月"
            title="图书馆里的老鼠"
            desc="求剩余书本。注意边界：如果 t % c != 0，说明正在啃一本，这本也不算完整。"
          />
        </div>

        {/* Logic Playground */}
        <div className="bg-slate-900 rounded-xl p-6 shadow-lg text-slate-300">
          <h4 className="font-bold text-white mb-4 flex items-center gap-2">
            <MousePointerClick className="text-purple-400" /> 逻辑实验室
          </h4>
          <div className="flex gap-4 justify-center mb-6">
            <button
              onClick={() => setA(!a)}
              className={`w-16 h-10 rounded font-bold transition-all ${a ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'bg-slate-700 text-slate-500'
                }`}
            >
              A={a ? '1' : '0'}
            </button>
            <button
              onClick={() => setB(!b)}
              className={`w-16 h-10 rounded font-bold transition-all ${b ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'bg-slate-700 text-slate-500'
                }`}
            >
              B={b ? '1' : '0'}
            </button>
          </div>

          <div className="space-y-3 font-mono text-sm">
            <div className="flex justify-between items-center bg-slate-800 p-2 rounded">
              <span>A && B (与)</span>
              <span className={a && b ? 'text-green-400 font-bold' : 'text-slate-500'}>
                {a && b ? 'TRUE' : 'FALSE'}
              </span>
            </div>
            <div className="flex justify-between items-center bg-slate-800 p-2 rounded">
              <span>A || B (或)</span>
              <span className={a || b ? 'text-green-400 font-bold' : 'text-slate-500'}>
                {a || b ? 'TRUE' : 'FALSE'}
              </span>
            </div>
            <div className="flex justify-between items-center bg-slate-800 p-2 rounded">
              <span>!A (非)</span>
              <span className={!a ? 'text-green-400 font-bold' : 'text-slate-500'}>
                {!a ? 'TRUE' : 'FALSE'}
              </span>
            </div>
            <div className="flex justify-between items-center bg-slate-800 p-2 rounded mt-4 border-t border-slate-700 pt-3">
              <span className="text-xs text-slate-400">复杂逻辑: (A && !B)</span>
              <span className={a && !b ? 'text-purple-400 font-bold' : 'text-slate-500'}>
                {a && !b ? 'TRUE' : 'FALSE'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
