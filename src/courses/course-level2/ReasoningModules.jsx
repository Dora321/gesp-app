import { useState, useEffect } from 'react';
import { Play, Lightbulb, AlertTriangle, CheckCircle, ArrowRight, Bug, AlertOctagon, Eye, RefreshCw, ArrowRightLeft, Info } from 'lucide-react';
import { InteractiveChecklist, PredictionQuiz, PitfallCard } from './Shared';

export const ErrorAnalysisModule = () => {
  const [activeCase, setActiveCase] = useState(0);

  const errorCases = [
    {
      id: 1,
      title: "致命的等号：Assignment vs Equality",
      severity: "critical",
      badCode: `int i = 0;
while (i < 5) {
    if (i = 1) { // 错误！这是赋值，不是判断
        cout << "Found 1" << endl;
    }
    i++;
}`,
      goodCode: `int i = 0;
while (i < 5) {
    if (i == 1) { // 正确：使用双等号进行比较
        cout << "Found 1" << endl;
    }
    i++;
}`,
      consequence: "死循环 (Infinite Loop) 或 逻辑错误",
      explanation: "在 C++ 中，`i = 1` 是一个赋值表达式，它的值是 1 (True)。因此 `if (i = 1)` 永远为真，而且每次循环都会把 i 重置为 1，导致 i 永远无法达到 5，形成死循环。",
      visual: (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="flex items-center gap-4 text-xl font-bold">
            <div className="p-4 bg-slate-800 rounded-lg border border-red-500/50 text-red-400">
              if (i = 1)
              <div className="text-xs font-normal text-slate-400 mt-1">赋值操作 (Assignment)</div>
            </div>
            <ArrowRight className="text-slate-500" />
            <div className="p-4 bg-slate-800 rounded-lg border border-red-500 text-red-500 animate-pulse">
              Always TRUE
            </div>
          </div>
          <div className="text-sm text-slate-400">后果：循环条件被破坏，程序卡死</div>
        </div>
      )
    },
    {
      id: 2,
      title: "整数溢出陷阱 (Integer Overflow)",
      severity: "critical",
      badCode: `int a = 100000;
int b = 100000;
int c = a * b;  // 溢出！
cout << c;      // 输出错误结果`,
      goodCode: `int a = 100000;
int b = 100000;
long long c = 1LL * a * b;  // 正确
cout << c;  // 输出 10000000000`,
      consequence: "数据溢出，结果错误 (可能为负数或乱码)",
      explanation: "虽然 c 是 long long，但 a*b 计算时两个 int 相乘，结果会先存在 int 里（超过 21亿会溢出），然后再赋值给 c。必须用 1LL 强制转换其中一个数为 long long。",
      visual: (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="text-center">
            <div className="text-sm text-slate-400 mb-2">100,000 × 100,000 = 10,000,000,000</div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-slate-800 rounded-lg border border-amber-500">
                <div className="text-xs text-amber-400">int 范围</div>
                <div className="text-lg font-mono text-amber-300">±2,147,483,647</div>
              </div>
              <ArrowRight className="text-red-500" />
              <div className="p-3 bg-red-900/30 rounded-lg border border-red-500 animate-pulse">
                <div className="text-xs text-red-400">超出范围！</div>
                <div className="text-lg font-mono text-red-300">OVERFLOW</div>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-900/20 rounded-lg border border-green-500">
            <div className="text-sm text-green-400">✓ 解决方案: 1LL * a * b 强制使用 long long 运算</div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "数组越界访问 (Array Out of Bounds)",
      severity: "critical",
      badCode: `int arr[5];  // 定义了5个元素的数组
for (int i = 1; i <= 5; i++) {
    arr[i] = i * 10;  // 错误！i=5时越界
}`,
      goodCode: `int arr[5];  // 下标范围: 0, 1, 2, 3, 4
for (int i = 0; i < 5; i++) {
    arr[i] = i * 10;  // 正确
}`,
      consequence: "访问非法内存，程序崩溃或产生随机结果",
      explanation: "数组下标从 0 开始！int arr[5] 有效下标是 0-4，访问 arr[5] 越界。常见错误：循环从 1 开始、或条件写成 i<=5。",
      visual: (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="text-sm text-slate-400 mb-2">int arr[5] 的内存布局</div>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-900/30 border-2 border-green-500 rounded flex items-center justify-center">
                  <span className="text-green-400 font-mono text-sm">arr[{i}]</span>
                </div>
                <div className="text-xs text-green-400 mt-1">✓ 合法</div>
              </div>
            ))}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-red-900/30 border-2 border-red-500 rounded flex items-center justify-center animate-pulse">
                <span className="text-red-400 font-mono text-sm">arr[5]</span>
              </div>
              <div className="text-xs text-red-400 mt-1">✗ 越界</div>
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-400">提示: 数组大小为 N，则下标范围是 [0, N-1]</div>
        </div>
      )
    }
  ];

  const currentCase = errorCases[activeCase];

  return (
    <div className="space-y-8">
      <div className="bg-slate-900 p-1 rounded-xl inline-flex">
        {errorCases.map((c, idx) => (
          <button
            key={c.id}
            onClick={() => setActiveCase(idx)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeCase === idx
              ? 'bg-red-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-white'
              }`}
          >
            Case {c.id}: {c.title}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Code Comparison */}
        <div className="space-y-6">
          <div className="bg-red-950/30 border border-red-900/50 rounded-xl overflow-hidden">
            <div className="bg-red-900/20 px-4 py-2 border-b border-red-900/50 flex items-center justify-between">
              <span className="text-red-400 font-bold flex items-center gap-2">
                <Bug size={18} /> 错误示范 (Bad Code)
              </span>
              <span className="text-xs bg-red-900/50 text-red-300 px-2 py-1 rounded">Don't do this</span>
            </div>
            <pre className="p-4 font-mono text-sm text-red-100 overflow-x-auto">
              <code>{currentCase.badCode}</code>
            </pre>
          </div>

          <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-xl overflow-hidden">
            <div className="bg-emerald-900/20 px-4 py-2 border-b border-emerald-900/50 flex items-center justify-between">
              <span className="text-emerald-400 font-bold flex items-center gap-2">
                <CheckCircle size={18} /> 正确写法 (Good Code)
              </span>
              <span className="text-xs bg-emerald-900/50 text-emerald-300 px-2 py-1 rounded">Do this</span>
            </div>
            <pre className="p-4 font-mono text-sm text-emerald-100 overflow-x-auto">
              <code>{currentCase.goodCode}</code>
            </pre>
          </div>
        </div>

        {/* Right: Analysis & Visual */}
        <div className="space-y-6">
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <AlertOctagon className="text-red-500" />
              后果分析
            </h3>
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg mb-4">
              <p className="text-red-200 font-bold text-lg">{currentCase.consequence}</p>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {currentCase.explanation}
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 min-h-[200px]">
            {currentCase.visual}
          </div>
        </div>
      </div>
    </div>
  );
};

export const LogicModule = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Play className="text-indigo-600" />
          逻辑模拟：预测与验证 (POE)
        </h2>
        <p className="text-slate-600 mb-6">
          逻辑题往往藏着陷阱。先预测结果，再看答案，是发现思维盲区的最好方法。
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <PredictionQuiz
            title="陷阱 1：数据溢出"
            code={`int a = 100000;
int b = 100000;
long long c = a * b;
cout << c;`}
            options={[
              "10000000000 (100亿)",
              "1410065408 (乱码/溢出)",
              "Error (编译错误)"
            ]}
            correctIndex={1}
            explanation="虽然 c 是 long long，但 a*b 计算时两个 int 相乘，结果会先存在 int 里（导致溢出），然后再赋值给 c。正确写法是 1LL * a * b。"
          />

          <PredictionQuiz
            title="陷阱 2：循环边界"
            code={`int sum = 0;
for(int i = 1; i < 5; i++) {
    if(i % 2 == 0) continue;
    sum += i;
}
cout << sum;`}
            options={[
              "4 (1+3)",
              "9 (1+3+5)",
              "5 (1+4)"
            ]}
            correctIndex={0}
            explanation="i < 5 意味着 i 取值 1, 2, 3, 4。当 i=2,4 时 continue。所以 sum = 1 + 3 = 4。注意 i 不包含 5。"
          />
        </div>
      </div>

      <InteractiveChecklist />
    </div>
  );
};

export const PitfallsModule = () => (
  <div className="space-y-6 animate-fade-in">
    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
      <h2 className="text-2xl font-bold text-red-700 flex items-center gap-3">
        <AlertTriangle /> 考场高频失误榜
      </h2>
      <p className="text-red-600 mt-2">点击卡片"拆除炸弹"，查看正确解法！</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <PitfallCard
        title="数据溢出 Boom!"
        code="int sum = 0;"
        fix="long long sum = 0;"
        desc="当题目涉及'累加求和'或'乘积'且N较大(大于10^5)时，结果往往超过 21亿（int上限）。必须使用 long long。二级常见于大数相乘、累加题。"
      />
      <PitfallCard
        title="整数除法丢失小数"
        code="double ans = 5 / 2;"
        fix="double ans = 5.0 / 2;"
        result="2.0 (错误) vs 2.5 (正确)"
        desc="整数除整数，结果永远是整数。5/2=2。必须有一个操作数是小数才能得到小数结果。或使用强制类型转换：(double)5/2。"
      />
      <PitfallCard
        title="变量未初始化"
        code="int count; count++;"
        fix="int count = 0; count++;"
        desc="局部变量如果不初始化，初始值是随机垃圾值，导致结果莫名其妙的大。务必养成初始化习惯：int sum=0, cnt=0, max=INT_MIN。"
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <PitfallCard
        title="数组下标从0开始"
        code="int a[5]; a[5] = 10;"
        fix="int a[5]; a[4] = 10;"
        desc="数组下标范围是 [0, N-1]。常见错误：循环写成 i小于等于5 或从 i=1 开始。正确写法：for(int i=0; i小于5; i++) 或 for(int i=0; i小于等于4; i++)。"
      />
      <PitfallCard
        title="输出格式错误"
        code='cout << a << " " << b;'
        fix='cout << a << " " << b << endl;'
        result="多余空格或缺少换行都会导致判题失败"
        desc="输出题目要求严格：题目说'每两个数之间一个空格'就不能多也不能少；说'每行输出后换行'就必须加 endl 或 换行符。注意行末是否有多余空格。"
      />
    </div>

    <div className="bg-white p-6 rounded-xl border border-slate-200 mt-6">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <Lightbulb className="text-yellow-500" /> 考前检查清单
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h4 className="font-bold text-blue-800 mb-2">编码前</h4>
          <ul className="text-sm text-blue-900 space-y-1">
            <li>• 看清数据范围 (N≤10^5 用int, N≤10^9 用long long)</li>
            <li>• 理解输出格式要求 (空格/换行)</li>
            <li>• 确认边界条件 (1到N 包含N吗？)</li>
          </ul>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <h4 className="font-bold text-green-800 mb-2">编码后</h4>
          <ul className="text-sm text-green-900 space-y-1">
            <li>• 所有变量都初始化了吗？</li>
            <li>• 数组访问有越界风险吗？</li>
            <li>• 输出语句格式正确吗？</li>
            <li>• 用样例数据手动跑一遍</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export const CodeTraceModule = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedExample, setSelectedExample] = useState(0);

  const examples = [
    {
      title: "双层循环 (打印图形)",
      code: `for(int i=1; i<=3; i++) {
    for(int j=1; j<=i; j++) {
        cout << "*";
    }
    cout << endl;
}`,
      steps: [
        { line: 1, vars: { i: 1 }, desc: "外层循环 i=1, 1<=3 成立" },
        { line: 2, vars: { i: 1, j: 1 }, desc: "内层循环 j=1, 1<=1 成立" },
        { line: 3, vars: { i: 1, j: 1 }, desc: "输出 *", output: "*" },
        { line: 2, vars: { i: 1, j: 2 }, desc: "j++, j=2, 2<=1 不成立，内层结束" },
        { line: 5, vars: { i: 1 }, desc: "换行", output: "\\n" },
        { line: 1, vars: { i: 2 }, desc: "i++, i=2, 2<=3 成立" },
        { line: 2, vars: { i: 2, j: 1 }, desc: "内层循环 j=1, 1<=2 成立" },
        { line: 3, vars: { i: 2, j: 1 }, desc: "输出 *", output: "*" },
        { line: 2, vars: { i: 2, j: 2 }, desc: "j++, j=2, 2<=2 成立" },
        { line: 3, vars: { i: 2, j: 2 }, desc: "输出 *", output: "**" },
        { line: 2, vars: { i: 2, j: 3 }, desc: "j++, j=3, 3<=2 不成立，内层结束" },
        { line: 5, vars: { i: 2 }, desc: "换行", output: "\\n" },
        { line: 1, vars: { i: 3 }, desc: "i++, i=3, 3<=3 成立" },
        { line: 2, vars: { i: 3, j: 1 }, desc: "内层循环 j=1" },
        { line: 3, vars: { i: 3, j: 1 }, desc: "输出 *", output: "*" },
        { line: 2, vars: { i: 3, j: 2 }, desc: "内层循环 j=2" },
        { line: 3, vars: { i: 3, j: 2 }, desc: "输出 *", output: "**" },
        { line: 2, vars: { i: 3, j: 3 }, desc: "内层循环 j=3" },
        { line: 3, vars: { i: 3, j: 3 }, desc: "输出 *", output: "***" },
        { line: 5, vars: { i: 3 }, desc: "换行", output: "\\n" },
        { line: 1, vars: { i: 4 }, desc: "i++, i=4, 4<=3 不成立，程序结束" }
      ]
    },
    {
      title: "Break与Continue",
      code: `for(int i=1; i<=5; i++) {
    if(i == 3) continue;
    if(i == 5) break;
    cout << i << " ";
}`,
      steps: [
        { line: 1, vars: { i: 1 }, desc: "i=1" },
        { line: 2, vars: { i: 1 }, desc: "1==3? False" },
        { line: 3, vars: { i: 1 }, desc: "1==5? False" },
        { line: 4, vars: { i: 1 }, desc: "输出 1", output: "1 " },
        { line: 1, vars: { i: 2 }, desc: "i=2" },
        { line: 2, vars: { i: 2 }, desc: "2==3? False" },
        { line: 3, vars: { i: 2 }, desc: "2==5? False" },
        { line: 4, vars: { i: 2 }, desc: "输出 2", output: "2 " },
        { line: 1, vars: { i: 3 }, desc: "i=3" },
        { line: 2, vars: { i: 3 }, desc: "3==3? True! 执行 continue" },
        { line: 1, vars: { i: 4 }, desc: "直接跳到 i++, i=4" },
        { line: 2, vars: { i: 4 }, desc: "4==3? False" },
        { line: 3, vars: { i: 4 }, desc: "4==5? False" },
        { line: 4, vars: { i: 4 }, desc: "输出 4", output: "4 " },
        { line: 1, vars: { i: 5 }, desc: "i=5" },
        { line: 2, vars: { i: 5 }, desc: "5==3? False" },
        { line: 3, vars: { i: 5 }, desc: "5==5? True! 执行 break" },
        { line: 1, vars: { i: 5 }, desc: "跳出循环，程序结束" }
      ]
    }
  ];

  const example = examples[selectedExample];
  const step = example.steps[currentStep];

  useEffect(() => {
    if (isPlaying && currentStep < example.steps.length - 1) {
      const timer = setTimeout(() => setCurrentStep(c => c + 1), 1500);
      return () => clearTimeout(timer);
    } else if (currentStep >= example.steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, example.steps.length]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
          <Eye /> 代码跟踪模拟器
        </h2>
        <p className="text-cyan-100">
          GESP二级重点考察嵌套循环和流程控制，通过模拟器看清每一步是如何执行的。
        </p>
      </div>

      <div className="flex gap-2">
        {examples.map((ex, idx) => (
          <button
            key={idx}
            onClick={() => { setSelectedExample(idx); setCurrentStep(0); setIsPlaying(false); }}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedExample === idx
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
          >
            示例 {idx + 1}: {ex.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg">
          <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="ml-2 text-slate-400 text-xs font-mono">trace.cpp</span>
          </div>
          <div className="p-4 font-mono text-sm leading-relaxed">
            {example.code.split('\n').map((line, idx) => (
              <div key={idx} className={`py-1 px-2 rounded flex ${step.line === idx + 1 ? 'bg-yellow-500/30 border-l-4 border-yellow-400' : ''}`}>
                <span className="text-slate-600 w-6 text-right mr-4 select-none">{idx + 1}</span>
                <span className="text-blue-100">{line}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-slate-700 flex items-center gap-2"><Play size={18} className="text-blue-600" /> 执行控制</h4>
              <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">Step {currentStep + 1}/{example.steps.length}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded text-slate-600 text-sm">上一步</button>
              <button onClick={() => setIsPlaying(!isPlaying)} className={`px-4 py-2 rounded text-white text-sm font-bold flex-1 ${isPlaying ? 'bg-orange-500' : 'bg-blue-600 hover:bg-blue-700'}`}>
                {isPlaying ? '⏸ 暂停' : '▶ 自动播放'}
              </button>
              <button onClick={() => setCurrentStep(Math.min(example.steps.length - 1, currentStep + 1))} className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded text-slate-600 text-sm">下一步</button>
              <button onClick={() => { setCurrentStep(0); setIsPlaying(false); }} className="px-3 py-2 bg-red-100 hover:bg-red-200 rounded text-red-600"><RefreshCw size={16} /></button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2"><ArrowRightLeft size={18} className="text-purple-600" /> 变量监视</h4>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(step.vars).map(([k, v]) => (
                <div key={k} className="bg-slate-50 p-3 rounded border border-slate-100">
                  <div className="text-xs text-slate-400 mb-1">{k}</div>
                  <div className="text-lg font-bold text-slate-800 font-mono">{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`p-4 rounded-xl border ${step.output ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
            <div className="flex gap-3">
              <div className={`mt-0.5 ${step.output ? 'text-green-600' : 'text-blue-600'}`}>
                {step.output ? <CheckCircle size={18} /> : <Info size={18} />}
              </div>
              <div>
                <div className={`font-medium text-sm ${step.output ? 'text-green-800' : 'text-blue-800'}`}>{step.desc}</div>
                {step.output && <div className="mt-2 bg-slate-900 text-green-400 px-2 py-1 rounded text-xs font-mono inline-block">Output: {step.output}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
