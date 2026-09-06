import { createSequentialCourseSupport, defineCourse } from './courseSchema.js';
import { cppL8Lessons } from './cppLessonTitles.js';

export { cppL8Lessons } from './cppLessonTitles.js';

// 八级大纲按题库的真实考点分布排定：先补齐该级考得最多的知识点，
// 再进入综合与应试。每节的目标、交付物、检查项与一到六级保持同一套结构，
// 这样课程目录、掌握度追踪和离开前自查都能直接复用。
const qualityByLesson = {
  1: {
    accent: 'indigo',
    goals: ["能区分加法原理与乘法原理", "能处理带限制条件的计数", "能用分类讨论拆解复杂计数"],
    deliverables: ["完成 3 道带限制的排列计数题", "为「至少含一个」类问题写出补集解法", "整理排列与组合的适用判据"],
    checks: ["能判断一个计数问题该用排列还是组合", "能识别「不能相邻」「至少一个」等限制的处理套路", "能用小规模枚举验证公式"],
  },
  2: {
    accent: 'teal',
    goals: ["能推导组合数的递推关系", "能用杨辉三角求组合数", "能处理组合数取模"],
    deliverables: ["用递推打表求 C(n,m)", "验证杨辉三角每行之和等于 2^n", "实现组合数取模并说明为什么要取模"],
    checks: ["能说出 C(n,m)=C(n-1,m-1)+C(n-1,m) 的组合意义", "能估算打表的空间开销", "知道阶乘直接相乘为什么会溢出"],
  },
  3: {
    accent: 'emerald',
    goals: ["能计算古典概型的概率", "能理解期望的线性性", "能用期望解决简单的游戏问题"],
    deliverables: ["计算掷骰子若干次的点数期望", "用期望线性性拆解一个复合问题", "比较概率与频率的差别"],
    checks: ["能说明期望不等于最可能取值", "能用线性性避免复杂的分类讨论", "能判断事件是否独立"],
  },
  4: {
    accent: 'amber',
    goals: ["能说明拷贝构造与赋值运算符的调用时机", "能识别浅拷贝的风险", "能写出正确的资源管理"],
    deliverables: ["为一个持有指针的类补上拷贝构造", "构造一个浅拷贝导致重复释放的例子", "实现赋值运算符并处理自赋值"],
    checks: ["能说明什么时候编译器会生成默认拷贝构造", "能识别需要自定义三件套的场景", "能解释自赋值为什么必须先判断"],
  },
  5: {
    accent: 'violet',
    goals: ["能重载常用运算符", "能说明运算符重载的限制", "能读懂简单的函数模板"],
    deliverables: ["为一个向量类重载 + 与 <<", "写一个求最大值的函数模板", "比较重载与模板各自解决什么问题"],
    checks: ["能说出哪些运算符不能重载", "能判断该重载为成员函数还是友元", "能解释模板在编译期做了什么"],
  },
  6: {
    accent: 'blue',
    goals: ["能把实际问题抽象成图", "能选择合适的图存储方式", "能判断问题属于哪类图论模型"],
    deliverables: ["把三道应用题抽象成点与边", "为稀疏图与稠密图各选一种存储", "整理常见图论模型与对应算法的对照表"],
    checks: ["能识别题目中的隐含边", "能判断图是否连通、有无环", "能估算图算法在给定规模下的可行性"],
  },
  7: {
    accent: 'cyan',
    goals: ["能写出 Dijkstra 的松弛过程", "能说明它为什么不能处理负权", "能选择 Dijkstra 或 Floyd"],
    deliverables: ["手推一次 Dijkstra 的距离数组变化", "实现堆优化版本并对比朴素版复杂度", "用 Floyd 求全源最短路并解释三重循环顺序"],
    checks: ["能说明松弛操作的含义", "能解释负权边为什么会破坏 Dijkstra 的贪心前提", "能根据点数边数选择算法"],
  },
  8: {
    accent: 'lime',
    goals: ["能说明生成树的定义与性质", "能实现 Prim 与 Kruskal", "能用并查集维护连通性"],
    deliverables: ["手推一次 Kruskal 的选边过程", "实现并查集的查找与合并", "比较两种算法在稀疏与稠密图上的表现"],
    checks: ["能说明为什么 MST 有 n-1 条边", "能解释 Kruskal 为什么要判环", "能说出并查集路径压缩的作用"],
  },
  9: {
    accent: 'rose',
    goals: ["能识别区间 DP 的状态设计", "能写出树形 DP 的转移", "能估算这两类 DP 的复杂度"],
    deliverables: ["完成一道石子合并类的区间 DP", "在树上做一次自底向上的 DP", "为两类 DP 各写出状态定义与转移方程"],
    checks: ["能说明区间 DP 为什么要按长度枚举", "能确定树形 DP 的递归顺序", "能识别题目适合区间还是树形"],
  },
  10: {
    accent: 'orange',
    goals: ["能实现素数筛与质因数分解", "能用辗转相除求 gcd", "能写出快速幂"],
    deliverables: ["实现埃氏筛与线性筛并对比", "用 gcd 化简分数", "实现快速幂并处理取模"],
    checks: ["能说明线性筛为什么每个合数只被筛一次", "能解释 gcd 递归的终止条件", "能估算快速幂的复杂度"],
  },
  11: {
    accent: 'sky',
    goals: ["能在任意进制间转换", "能熟练使用位运算技巧", "能理解补码表示"],
    deliverables: ["实现十进制与任意进制的互转", "用位运算完成取位、置位、清位", "解释负数在补码下的表示"],
    checks: ["能手算二进制与十六进制互转", "能说明 x & (x-1) 的作用", "能识别位运算中的优先级陷阱"],
  },
  12: {
    accent: 'fuchsia',
    goals: ["能用主定理分析递归复杂度", "能分析均摊复杂度", "能区分时间与空间的权衡"],
    deliverables: ["用主定理分析三个递归式", "分析一次动态数组扩容的均摊代价", "为一道题给出时间与空间两种方案"],
    checks: ["能识别递归式属于主定理的哪种情形", "能说明均摊与平均的区别", "能判断优化方向该省时间还是省空间"],
  },
  13: {
    accent: 'stone',
    goals: ["能设计分治算法", "能分析分治的复杂度", "能识别可用分治优化的问题"],
    deliverables: ["实现归并排序并统计逆序对", "用分治求平面最近点对的思路框架", "比较分治与 DP 的适用场景"],
    checks: ["能说明分治三步的含义", "能解释归并统计逆序对的原理", "能判断子问题是否独立"],
  },
  14: {
    accent: 'yellow',
    goals: ["能安全使用指针与动态内存", "能识别常见的内存错误", "能使用异常处理"],
    deliverables: ["写出一段有内存泄漏的代码并修正", "演示悬垂指针与重复释放", "用 try/catch 处理一次除零或越界"],
    checks: ["能说明 new 与 delete 必须配对", "能识别野指针的来源", "能判断何时该抛异常而不是返回错误码"],
  },
  15: {
    accent: 'red',
    goals: ["能定位自己的高频错因", "能把错题归类到知识点", "能写出针对性的检查动作"],
    deliverables: ["整理 5 道八级错题并标注错因", "把错因归类为建模、实现、复杂度三类", "为每类写一条下次动手前的检查清单"],
    checks: ["能区分「模型没想对」和「代码写错了」", "能说出自己最常见的两个错因", "能在重做时主动使用检查清单"],
  },
  16: {
    accent: 'slate',
    goals: ["能在限时内合理分配答题顺序", "能识别送分题与难题", "能完成一次完整的考后复盘"],
    deliverables: ["完成一套八级限时模拟并记录每题用时", "标出因时间不足而放弃的题", "隔天重做错题验证是否真正掌握"],
    checks: ["能在开考前浏览全卷并排定顺序", "能果断跳过卡住的题", "能在交卷后立即记录疑问点"],
  },
};

const previousReasonByLesson = {
  "1": "从八级的第一课开始。",
  "2": "承接第 1 课的内容继续深入。",
  "3": "承接第 2 课的内容继续深入。",
  "4": "承接第 3 课的内容继续深入。",
  "5": "承接第 4 课的内容继续深入。",
  "6": "承接第 5 课的内容继续深入。",
  "7": "承接第 6 课的内容继续深入。",
  "8": "承接第 7 课的内容继续深入。",
  "9": "承接第 8 课的内容继续深入。",
  "10": "承接第 9 课的内容继续深入。",
  "11": "承接第 10 课的内容继续深入。",
  "12": "承接第 11 课的内容继续深入。",
  "13": "承接第 12 课的内容继续深入。",
  "14": "承接第 13 课的内容继续深入。",
  "15": "承接第 14 课的内容继续深入。",
  "16": "承接第 15 课的内容继续深入。"
};

const nextReasonByLesson = {
  "1": "进入第 2 课。",
  "2": "进入第 3 课。",
  "3": "进入第 4 课。",
  "4": "进入第 5 课。",
  "5": "进入第 6 课。",
  "6": "进入第 7 课。",
  "7": "进入第 8 课。",
  "8": "进入第 9 课。",
  "9": "进入第 10 课。",
  "10": "进入第 11 课。",
  "11": "进入第 12 课。",
  "12": "进入第 13 课。",
  "13": "进入第 14 课。",
  "14": "进入第 15 课。",
  "15": "进入第 16 课。",
  "16": "完成八级全部课程，去题库检验。"
};

const practiceByLesson = {
  "1": [
    {
      "label": "GESP 八级真题：按考点练习",
      "path": "/question-bank/topics/8"
    }
  ],
  "2": [
    {
      "label": "GESP 八级真题：按考点练习",
      "path": "/question-bank/topics/8"
    }
  ],
  "3": [
    {
      "label": "GESP 八级真题：按考点练习",
      "path": "/question-bank/topics/8"
    }
  ],
  "4": [
    {
      "label": "GESP 八级真题：按考点练习",
      "path": "/question-bank/topics/8"
    }
  ],
  "5": [
    {
      "label": "GESP 八级真题：按考点练习",
      "path": "/question-bank/topics/8"
    }
  ],
  "6": [
    {
      "label": "GESP 八级真题：按考点练习",
      "path": "/question-bank/topics/8"
    }
  ],
  "7": [
    {
      "label": "GESP 八级真题：按考点练习",
      "path": "/question-bank/topics/8"
    }
  ],
  "8": [
    {
      "label": "GESP 八级真题：按考点练习",
      "path": "/question-bank/topics/8"
    }
  ],
  "9": [
    {
      "label": "GESP 八级真题：按考点练习",
      "path": "/question-bank/topics/8"
    }
  ],
  "10": [
    {
      "label": "GESP 八级真题：按考点练习",
      "path": "/question-bank/topics/8"
    }
  ],
  "11": [
    {
      "label": "GESP 八级真题：按考点练习",
      "path": "/question-bank/topics/8"
    }
  ],
  "12": [
    {
      "label": "GESP 八级真题：按考点练习",
      "path": "/question-bank/topics/8"
    }
  ],
  "13": [
    {
      "label": "GESP 八级真题：按考点练习",
      "path": "/question-bank/topics/8"
    }
  ],
  "14": [
    {
      "label": "GESP 八级真题：按考点练习",
      "path": "/question-bank/topics/8"
    }
  ],
  "15": [
    {
      "label": "GESP 八级真题：按考点练习",
      "path": "/question-bank/topics/8"
    }
  ],
  "16": [
    {
      "label": "GESP 八级真题：按考点练习",
      "path": "/question-bank/topics/8"
    }
  ]
};

const reviewTasksByLesson = {
  "1": [
    "完成 3 道带限制的排列计数题",
    "为「至少含一个」类问题写出补集解法"
  ],
  "2": [
    "用递推打表求 C(n,m)",
    "验证杨辉三角每行之和等于 2^n"
  ],
  "3": [
    "计算掷骰子若干次的点数期望",
    "用期望线性性拆解一个复合问题"
  ],
  "4": [
    "为一个持有指针的类补上拷贝构造",
    "构造一个浅拷贝导致重复释放的例子"
  ],
  "5": [
    "为一个向量类重载 + 与 <<",
    "写一个求最大值的函数模板"
  ],
  "6": [
    "把三道应用题抽象成点与边",
    "为稀疏图与稠密图各选一种存储"
  ],
  "7": [
    "手推一次 Dijkstra 的距离数组变化",
    "实现堆优化版本并对比朴素版复杂度"
  ],
  "8": [
    "手推一次 Kruskal 的选边过程",
    "实现并查集的查找与合并"
  ],
  "9": [
    "完成一道石子合并类的区间 DP",
    "在树上做一次自底向上的 DP"
  ],
  "10": [
    "实现埃氏筛与线性筛并对比",
    "用 gcd 化简分数"
  ],
  "11": [
    "实现十进制与任意进制的互转",
    "用位运算完成取位、置位、清位"
  ],
  "12": [
    "用主定理分析三个递归式",
    "分析一次动态数组扩容的均摊代价"
  ],
  "13": [
    "实现归并排序并统计逆序对",
    "用分治求平面最近点对的思路框架"
  ],
  "14": [
    "写出一段有内存泄漏的代码并修正",
    "演示悬垂指针与重复释放"
  ],
  "15": [
    "整理 5 道八级错题并标注错因",
    "把错因归类为建模、实现、复杂度三类"
  ],
  "16": [
    "完成一套八级限时模拟并记录每题用时",
    "标出因时间不足而放弃的题"
  ]
};

export const cppL8Course = defineCourse({
  id: 'cpp-l8', title: 'GESP C++ 八级', language: 'cpp', kind: 'level',
  items: cppL8Lessons, detailsById: qualityByLesson, pathFor: id => `/lesson/8/${id}`,
});

const buildCppL8LessonSupport = createSequentialCourseSupport(cppL8Course, {
  previousReasons: previousReasonByLesson,
  nextReasons: nextReasonByLesson,
  practiceLinksById: practiceByLesson,
  reviewTasksById: reviewTasksByLesson,
  entry: ({ current }) => ({ title: '八级课程总览', path: '/level8', reason: previousReasonByLesson[current.id] }),
  exit: ({ current }) => ({ title: '八级课程总览', path: '/level8', reason: nextReasonByLesson[current.id] }),
});

export function getCppL8LessonSupport(lessonId) {
  return buildCppL8LessonSupport(lessonId);
}
