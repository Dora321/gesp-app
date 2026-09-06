import { createSequentialCourseSupport, defineCourse } from './courseSchema.js';
import { cppL7Lessons } from './cppLessonTitles.js';

export { cppL7Lessons } from './cppLessonTitles.js';

// 七级大纲按题库的真实考点分布排定：先补齐该级考得最多的知识点，
// 再进入综合与应试。每节的目标、交付物、检查项与一到六级保持同一套结构，
// 这样课程目录、掌握度追踪和离开前自查都能直接复用。
const qualityByLesson = {
  1: {
    accent: 'indigo',
    goals: ["能按循环层数与规模估算时间复杂度", "能区分最好、平均、最坏情况", "能用复杂度判断算法在数据范围下是否可行"],
    deliverables: ["为 5 段代码分别写出时间复杂度并说明理由", "整理常见复杂度与可承受数据规模的对照表", "把一段 O(n²) 代码改写为 O(n log n) 并对比运行时间"],
    checks: ["能数清嵌套循环的实际执行次数", "能说明为什么忽略常数与低阶项", "能根据 n 的范围反推该用什么复杂度的算法"],
  },
  2: {
    accent: 'teal',
    goals: ["能用数组和指针两种方式存储二叉树", "能写出前中后序的递归与迭代实现", "能由两种遍历序列还原二叉树"],
    deliverables: ["写出三种递归遍历并各配一次手推验证", "用栈实现一次非递归中序遍历", "由前序加中序还原一棵树并画出结构"],
    checks: ["能说出根节点在三种遍历中的访问位置", "能处理空子树与单孩子节点的边界", "知道为什么先序加后序不能唯一还原"],
  },
  3: {
    accent: 'emerald',
    goals: ["能说明 BST 的有序性质", "能实现查找、插入与删除", "能解释退化为链表时复杂度的变化"],
    deliverables: ["实现 BST 的插入与查找并测试重复值", "实现删除操作，处理零、一、两个孩子三种情况", "构造一个使 BST 退化的插入序列"],
    checks: ["能说明删除两孩子节点为什么要找中序后继", "能解释查找复杂度为什么是 O(h) 而不是 O(log n)", "能判断一棵树是不是合法的 BST"],
  },
  4: {
    accent: 'amber',
    goals: ["能说明哈希表的基本原理", "能比较开放定址与链地址两种冲突处理", "能估算装载因子对性能的影响"],
    deliverables: ["用线性探测实现一张小哈希表并手推插入过程", "用链地址法重做同一组数据并对比", "写出装载因子与平均查找长度的关系"],
    checks: ["能手动模拟冲突时的探测路径", "能说明为什么删除元素在开放定址法里比较麻烦", "能判断哈希表最坏情况何时退化为 O(n)"],
  },
  5: {
    accent: 'blue',
    goals: ["能用邻接表与邻接矩阵存图", "能根据稀疏或稠密选择存储方式", "能读懂图论题给出的输入格式"],
    deliverables: ["把同一张图分别用两种结构存下来", "统计每个顶点的度数并验证握手定理", "写出无向图双向加边的模板"],
    checks: ["能说出两种存储的空间复杂度差别", "能处理重边与自环", "知道有向图与无向图在建边上的区别"],
  },
  6: {
    accent: 'violet',
    goals: ["能写出 DFS 的递归与栈式实现", "能用 visited 数组避免重复访问", "能用 DFS 求连通块与路径"],
    deliverables: ["用 DFS 统计网格连通块数量", "输出图中两点间的一条路径", "把递归 DFS 改写成显式栈版本"],
    checks: ["能说明 visited 的标记时机为什么重要", "能处理递归深度过大的风险", "能区分树的 DFS 与图的 DFS"],
  },
  7: {
    accent: 'cyan',
    goals: ["能写出 BFS 的队列模板", "能用 BFS 求无权图最短路", "能说明 BFS 与 DFS 的适用场景差别"],
    deliverables: ["写网格 BFS 最短路并测试无解情况", "记录每个点的层数并解释它等于最短距离", "比较同一问题用 BFS 与 DFS 的结果差异"],
    checks: ["能说明为什么入队时标记而不是出队时标记", "能处理起点等于终点的情况", "知道 BFS 求最短路的前提是边权相同"],
  },
  8: {
    accent: 'orange',
    goals: ["能识别搜索中的重复状态", "能设计判重与剪枝条件", "能估算搜索空间大小"],
    deliverables: ["为八皇后加上列与对角线剪枝", "用哈希或数组给状态判重", "对比加剪枝前后的搜索次数"],
    checks: ["能说明剪枝为什么不改变正确性", "能设计一个状态的唯一编码", "知道什么时候搜索比 DP 更合适"],
  },
  9: {
    accent: 'rose',
    goals: ["能识别线性 DP 的状态与转移", "能写出 DP 四件套（状态、转移、初值、答案）", "能把递归改写成递推"],
    deliverables: ["完成最长上升子序列并解释状态含义", "完成最大子段和的两种写法", "把一道记忆化搜索改写成递推"],
    checks: ["能说明状态定义为什么必须无后效性", "能确定初值与答案的位置", "能估算 DP 的时间与空间复杂度"],
  },
  10: {
    accent: 'lime',
    goals: ["能区分 0/1 背包与完全背包", "能写出一维滚动数组优化", "能说明遍历方向的作用"],
    deliverables: ["先写二维 0/1 背包再压缩为一维", "实现完全背包并解释容量为什么正序", "完成一道恰好装满的变形题"],
    checks: ["能说明一维倒序为什么能避免重复选取", "能处理恰好装满时的初值设置", "能识别题目属于哪一类背包"],
  },
  11: {
    accent: 'sky',
    goals: ["能定义类并区分成员与访问权限", "能写出构造函数与析构函数", "能说明封装带来的好处"],
    deliverables: ["写一个管理动态数组的类", "为它补上构造、析构与初始化列表", "把一个全 public 的类改造成封装良好的版本"],
    checks: ["能说明构造函数为什么不能是虚函数", "能判断何时需要自定义析构函数", "能解释初始化列表与函数体内赋值的差别"],
  },
  12: {
    accent: 'fuchsia',
    goals: ["能通过基类指针实现多态", "能说明虚函数表的作用", "能判断何时需要虚析构函数"],
    deliverables: ["写 Shape/Circle/Rectangle 并通过基类指针调用", "去掉 virtual 观察输出变化", "为基类补上虚析构并验证释放顺序"],
    checks: ["能区分覆盖（override）与隐藏", "能说明基类指针 delete 派生对象的风险", "知道 override 关键字能在编译期发现什么错误"],
  },
  13: {
    accent: 'stone',
    goals: ["能使用命名空间组织代码", "能说明作用域与生命周期", "能解释 using 声明的影响范围"],
    deliverables: ["把两组同名函数放进不同命名空间并调用", "比较局部、全局、静态变量的生命周期", "写出一个作用域遮蔽的例子并解释"],
    checks: ["能说明 using namespace std 的潜在风险", "能判断一个名字在某处解析到哪个定义", "能区分声明与定义"],
  },
  14: {
    accent: 'yellow',
    goals: ["能说出常见排序的复杂度与稳定性", "能根据场景选择排序算法", "能手推一趟排序的中间结果"],
    deliverables: ["手推冒泡、选择、插入各一趟的结果", "用一组含相同键值的数据验证稳定性", "比较 sort 与 stable_sort 的差别"],
    checks: ["能解释稳定性在多关键字排序中的意义", "能说明选择排序为什么不稳定", "能判断题目是否要求稳定排序"],
  },
  15: {
    accent: 'red',
    goals: ["能定位自己的高频错因", "能把错题归类到知识点", "能写出针对性的检查动作"],
    deliverables: ["整理 5 道七级错题并标注错因", "把错因归类为概念、边界、复杂度三类", "为每类写一条下次动手前的检查清单"],
    checks: ["能区分「不会」和「会但做错」", "能说出自己最常见的两个错因", "能在重做时主动使用检查清单"],
  },
  16: {
    accent: 'slate',
    goals: ["能在限时内合理分配答题顺序", "能识别送分题与难题", "能完成一次完整的考后复盘"],
    deliverables: ["完成一套七级限时模拟并记录每题用时", "标出因时间不足而放弃的题", "隔天重做错题验证是否真正掌握"],
    checks: ["能在开考前 1 分钟浏览全卷并排序", "能果断跳过卡住的题", "能在交卷后立即记录疑问点"],
  },
};

const previousReasonByLesson = {
  "1": "从七级的第一课开始。",
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
  "16": "完成七级全部课程，去题库检验。"
};

const practiceByLesson = {
  "1": [
    {
      "label": "GESP 七级真题：按考点练习",
      "path": "/question-bank/topics/7"
    }
  ],
  "2": [
    {
      "label": "GESP 七级真题：按考点练习",
      "path": "/question-bank/topics/7"
    }
  ],
  "3": [
    {
      "label": "GESP 七级真题：按考点练习",
      "path": "/question-bank/topics/7"
    }
  ],
  "4": [
    {
      "label": "GESP 七级真题：按考点练习",
      "path": "/question-bank/topics/7"
    }
  ],
  "5": [
    {
      "label": "GESP 七级真题：按考点练习",
      "path": "/question-bank/topics/7"
    }
  ],
  "6": [
    {
      "label": "GESP 七级真题：按考点练习",
      "path": "/question-bank/topics/7"
    }
  ],
  "7": [
    {
      "label": "GESP 七级真题：按考点练习",
      "path": "/question-bank/topics/7"
    }
  ],
  "8": [
    {
      "label": "GESP 七级真题：按考点练习",
      "path": "/question-bank/topics/7"
    }
  ],
  "9": [
    {
      "label": "GESP 七级真题：按考点练习",
      "path": "/question-bank/topics/7"
    }
  ],
  "10": [
    {
      "label": "GESP 七级真题：按考点练习",
      "path": "/question-bank/topics/7"
    }
  ],
  "11": [
    {
      "label": "GESP 七级真题：按考点练习",
      "path": "/question-bank/topics/7"
    }
  ],
  "12": [
    {
      "label": "GESP 七级真题：按考点练习",
      "path": "/question-bank/topics/7"
    }
  ],
  "13": [
    {
      "label": "GESP 七级真题：按考点练习",
      "path": "/question-bank/topics/7"
    }
  ],
  "14": [
    {
      "label": "GESP 七级真题：按考点练习",
      "path": "/question-bank/topics/7"
    }
  ],
  "15": [
    {
      "label": "GESP 七级真题：按考点练习",
      "path": "/question-bank/topics/7"
    }
  ],
  "16": [
    {
      "label": "GESP 七级真题：按考点练习",
      "path": "/question-bank/topics/7"
    }
  ]
};

const reviewTasksByLesson = {
  "1": [
    "为 5 段代码分别写出时间复杂度并说明理由",
    "整理常见复杂度与可承受数据规模的对照表"
  ],
  "2": [
    "写出三种递归遍历并各配一次手推验证",
    "用栈实现一次非递归中序遍历"
  ],
  "3": [
    "实现 BST 的插入与查找并测试重复值",
    "实现删除操作，处理零、一、两个孩子三种情况"
  ],
  "4": [
    "用线性探测实现一张小哈希表并手推插入过程",
    "用链地址法重做同一组数据并对比"
  ],
  "5": [
    "把同一张图分别用两种结构存下来",
    "统计每个顶点的度数并验证握手定理"
  ],
  "6": [
    "用 DFS 统计网格连通块数量",
    "输出图中两点间的一条路径"
  ],
  "7": [
    "写网格 BFS 最短路并测试无解情况",
    "记录每个点的层数并解释它等于最短距离"
  ],
  "8": [
    "为八皇后加上列与对角线剪枝",
    "用哈希或数组给状态判重"
  ],
  "9": [
    "完成最长上升子序列并解释状态含义",
    "完成最大子段和的两种写法"
  ],
  "10": [
    "先写二维 0/1 背包再压缩为一维",
    "实现完全背包并解释容量为什么正序"
  ],
  "11": [
    "写一个管理动态数组的类",
    "为它补上构造、析构与初始化列表"
  ],
  "12": [
    "写 Shape/Circle/Rectangle 并通过基类指针调用",
    "去掉 virtual 观察输出变化"
  ],
  "13": [
    "把两组同名函数放进不同命名空间并调用",
    "比较局部、全局、静态变量的生命周期"
  ],
  "14": [
    "手推冒泡、选择、插入各一趟的结果",
    "用一组含相同键值的数据验证稳定性"
  ],
  "15": [
    "整理 5 道七级错题并标注错因",
    "把错因归类为概念、边界、复杂度三类"
  ],
  "16": [
    "完成一套七级限时模拟并记录每题用时",
    "标出因时间不足而放弃的题"
  ]
};

export const cppL7Course = defineCourse({
  id: 'cpp-l7', title: 'GESP C++ 七级', language: 'cpp', kind: 'level',
  items: cppL7Lessons, detailsById: qualityByLesson, pathFor: id => `/lesson/7/${id}`,
});

const buildCppL7LessonSupport = createSequentialCourseSupport(cppL7Course, {
  previousReasons: previousReasonByLesson,
  nextReasons: nextReasonByLesson,
  practiceLinksById: practiceByLesson,
  reviewTasksById: reviewTasksByLesson,
  entry: ({ current }) => ({ title: '七级课程总览', path: '/level7', reason: previousReasonByLesson[current.id] }),
  exit: ({ current }) => ({ title: '七级课程总览', path: '/level7', reason: nextReasonByLesson[current.id] }),
});

export function getCppL7LessonSupport(lessonId) {
  return buildCppL7LessonSupport(lessonId);
}
