import { useState } from 'react';
import { Code, Lightbulb, AlertTriangle, CheckCircle, Trophy, Clock, Target, XCircle } from 'lucide-react';
import { TemplateBlock } from './Shared';

export const TemplatesModule = () => (
  <div className="space-y-6 animate-fade-in">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3"><Code /> 万能代码模板</h2>
      <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-bold">背诵 + 理解</span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TemplateBlock
        title="1. 数位拆解 (Do-While/While)"
        desc="提取每一位数字，常用于水仙花数、数字反转"
        code={`int n;
cin >> n;
while (n > 0) {
    int digit = n % 10; // 取出末位
    // 处理 digit...
    n /= 10;            // 去掉末位
}`}
      />
      <TemplateBlock
        title="2. 质数判断 (Prime Check)"
        desc="判断是否只有1和它本身两个因数"
        code={`bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}`}
      />
      <TemplateBlock
        title="3. 最大公约数 (GCD)"
        desc="欧几里得算法，解决分式化简、倍数问题"
        code={`int gcd(int a, int b) {
    while (b != 0) {
        int temp = a % b;
        a = b;
        b = temp;
    }
    return a;
}`}
      />
      <TemplateBlock
        title="4. 图形打印通用框架"
        desc="双层循环控制行(i)和列(j)"
        code={`for (int i = 1; i <= n; i++) {     // 行
    for (int j = 1; j <= n; j++) { // 列
        if (/* 满足条件 */)
            cout << "*";
        else
            cout << " ";
    }
    cout << endl; // 每行结束后换行
}`}
      />
    </div>
  </div>
);

export const ExamTipsModule = () => (
  <div className="space-y-6 animate-fade-in">
    <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-3"><Lightbulb /> 考场秘籍</h2>
      <p className="text-amber-100">GESP 二级考试策略与注意事项，助你稳定发挥。</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
        <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2"><Clock size={20} /> 时间管理</h3>
        <ul className="space-y-2 text-sm text-blue-900">
          <li>• <strong>选择/判断题 (30分)</strong>: 控制在20分钟内，遇到不确定的先标记，别卡壳。</li>
          <li>• <strong>编程题 (50分)</strong>: 预留至少60分钟。第一题通常是基础计算或图形，必须拿下；第二题如果是复杂逻辑，先写出部分分代码。</li>
          <li>• <strong>检查时间</strong>: 最后留10分钟检查文件名、变量类型(long long)和分号。</li>
        </ul>
      </div>
      <div className="bg-green-50 p-6 rounded-xl border border-green-100">
        <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2"><Target size={20} /> 拿分技巧</h3>
        <ul className="space-y-2 text-sm text-green-900">
          <li>• <strong>审题第一</strong>: 注意数据范围！如果 N=10^9，必须用 long long，且不能用 O(N) 算法。</li>
          <li>• <strong>暴力出奇迹</strong>: 二级题目数据通常较小(1000以内)，双层循环 O(N^2) 通常能过。</li>
          <li>• <strong>测试边界</strong>: 测 N=1, N=0, N=Max 的情况。</li>
        </ul>
      </div>
      <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
        <h3 className="font-bold text-purple-800 mb-4 flex items-center gap-2"><AlertTriangle size={20} /> 常见低级错误</h3>
        <ul className="space-y-2 text-sm text-purple-900">
          <li>• 变量未初始化 (int sum; sum++) ❌</li>
          <li>• 误用赋值符 (if (a=1)) ❌</li>
          <li>• 整数除法丢失精度 (double a = 3/2) ❌</li>
          <li>• 输出格式多空格/少换行 ❌</li>
        </ul>
      </div>
    </div>
  </div>
);

export const PracticeModule = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState(null);

  const questions = [
    {
      q: "执行 for(int i=0; i<3; i++) cout << i; 的输出是？",
      opts: ["0 1 2", "1 2 3", "012", "0,1,2"],
      ans: 2,
      expl: "没有空格分隔，直接连续输出 012。"
    },
    {
      q: "int a[5]; 定义了一个数组，它的最大下标是？",
      opts: ["5", "4", "6", "0"],
      ans: 1,
      expl: "数组下标从0开始，a[5] 的有效下标是 0,1,2,3,4。"
    },
    {
      q: "if (a && b) 为真，意味着？",
      opts: ["a和b都为真", "a或b有一个为真", "a为假", "b为假"],
      ans: 0,
      expl: "&& 是逻辑与，要求两边都为真。"
    },
    {
      q: "求最大公约数的算法名称是？",
      opts: ["高斯消元", "二分查找", "辗转相除法", "冒泡排序"],
      ans: 2,
      expl: "辗转相除法 (Euclidean Algorithm) 是求 GCD 的经典算法。"
    },
    {
      q: "break 语句的作用是？",
      opts: ["结束本次循环，继续下一次", "结束整个程序", "跳出当前循环", "跳过 output"],
      ans: 2,
      expl: "break 跳出当前所在的循环结构；continue 才是结束本次循环。"
    },
    {
      q: "执行 int x=123; cout << x%10; 输出什么？",
      opts: ["1", "2", "3", "123"],
      ans: 2,
      expl: "% 10 取个位数，123 的个位是 3。"
    },
    {
      q: "双层循环 for(i=1;i<=3;i++) for(j=1;j<=2;j++) 总共执行内层循环多少次？",
      opts: ["3次", "6次", "5次", "2次"],
      ans: 1,
      expl: "外层循环3次，每次内层循环2次，总共 3×2=6 次。"
    },
    {
      q: "int a=5, b=2; cout << a/b; 输出什么？",
      opts: ["2.5", "2", "3", "0"],
      ans: 1,
      expl: "整数除法向下取整，5/2=2（不是2.5）。"
    },
    {
      q: "sqrt(16) 的结果是？（需引入 cmath）",
      opts: ["4", "16", "2", "8"],
      ans: 0,
      expl: "sqrt() 是开平方函数，√16=4。"
    },
    {
      q: "下列哪个是合法的变量名？",
      opts: ["2num", "num-2", "_num2", "int"],
      ans: 2,
      expl: "变量名不能以数字开头、不能有连字符、不能是关键字。_num2 是合法的。"
    },
    {
      q: "abs(-5) 的值是？",
      opts: ["-5", "5", "0", "10"],
      ans: 1,
      expl: "abs() 返回绝对值，|-5|=5。"
    },
    {
      q: "以下代码片段：for(int i=1; i<=5; i+=2) 循环执行几次？",
      opts: ["2次", "3次", "5次", "无限次"],
      ans: 1,
      expl: "i 依次为 1, 3, 5，共3次。i+=2 意味着每次增加2。"
    },
    {
      q: "字符串 s=\"hello\"; cout << s.length(); 输出多少？",
      opts: ["4", "5", "6", "hello"],
      ans: 1,
      expl: "length() 返回字符串长度，\"hello\" 有5个字符。"
    },
    {
      q: "pow(2, 3) 的结果是？（需引入 cmath）",
      opts: ["5", "6", "8", "9"],
      ans: 2,
      expl: "pow(a, b) 计算 a 的 b 次方，2³=8。"
    },
    {
      q: "下列关于数组的说法，正确的是？",
      opts: ["数组大小可以随时改变", "数组下标从1开始", "数组必须先定义再使用", "数组元素类型可以不同"],
      ans: 2,
      expl: "C++ 数组大小固定、下标从0开始、元素类型必须相同、必须先定义。"
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
    <div className="max-w-2xl mx-auto animate-fade-in">
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
                    : 'border-slate-100 hover:border-blue-400 hover:bg-blue-50 text-slate-700'}`}
              >
                <span className="font-medium">{String.fromCharCode(65 + idx)}. {opt}</span>
                {showResult && idx === q.ans && <CheckCircle size={20} className="text-green-600" />}
                {showResult && idx === selected && idx !== q.ans && <XCircle size={20} className="text-red-600" />}
              </button>
            ))}
          </div>
          {showResult && (
            <div className="marginTop-6 animate-in fade-in slide-in-from-bottom-2">
              <div className={`mt-6 p-4 rounded-xl text-sm ${selected === q.ans ? 'bg-green-100 text-green-800' : 'bg-red-50 text-red-800'}`}>
                <p className="font-bold mb-1">{selected === q.ans ? '回答正确！' : '回答错误'}</p>
                <p>{q.expl}</p>
              </div>
              <button onClick={next} className="mt-4 w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200">
                {current < questions.length - 1 ? '下一题' : '查看结果'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
