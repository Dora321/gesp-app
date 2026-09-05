import { createSequentialCourseSupport, defineCourse } from './courseSchema.js';
import { cppL1Lessons } from './cppLessonTitles.js';

export { cppL1Lessons } from './cppLessonTitles.js';

const qualityByLesson = {
  1: {
    accent: 'blue',
    goals: ['认识计算机的输入、输出、存储和操作系统', '理解 C++ 程序从代码到运行的基本流程', '能写出并运行 Hello World'],
    deliverables: ['画出一张计算机部件关系图', '完成一份 C++ 程序结构标注', '提交一个可运行的 Hello World 程序'],
    checks: ['能区分硬件、软件和操作系统', '能说出 main、cout、分号的作用', '能根据报错定位漏分号或拼写错误'],
  },
  2: {
    accent: 'blue',
    goals: ['理解变量是带名字的数据盒子', '掌握 C++ 变量命名的合法规则', '能用 int、double、char、string 表达不同数据'],
    deliverables: ['完成一组合法/非法变量名分类题', '写出一个记录个人信息的小程序', '整理变量命名避坑表'],
    checks: ['能解释为什么变量名不能有空格和减号', '能根据数据选择合适类型', '能发现未声明变量和关键字冲突问题'],
  },
  3: {
    accent: 'blue',
    goals: ['理解 int 和 double 在除法中的差异', '能判断整数除法会舍弃小数部分', '会用类型选择避免计算结果丢失'],
    deliverables: ['完成平均分计算器', '解释一道整数除法真题', '写出一组 int/double 对比样例'],
    checks: ['能预测 5 / 2 和 5.0 / 2 的结果', '能说明为什么小数会消失', '能把需要小数的表达式改成 double 计算'],
  },
  4: {
    accent: 'blue',
    goals: ['理解 / 求商、% 求余数的不同用途', '能用整除和取模拆解时间、位数和分组问题', '掌握混合运算中的优先级和括号使用'],
    deliverables: ['完成排队分组模拟', '写出分钟转小时分钟的小程序', '完成奇偶判断和个位数提取练习'],
    checks: ['能说清 a / b 与 a % b 各表示什么', '能预测 17 / 5 和 17 % 5 的结果', '能把生活问题翻译成商和余数'],
  },
  5: {
    accent: 'blue',
    goals: ['理解 char 保存单个字符、bool 保存真假结果', '知道字符背后对应 ASCII 编码', '能用字符运算完成大小写转换和简单判断'],
    deliverables: ['完成字符解码器实验', '写出大小写转换小程序', '完成两道字符/布尔真题解析'],
    checks: ['能区分单引号字符和双引号字符串', '能预测字符加减后的结果', '能解释 true、false 与 0、1 的关系'],
  },
  6: {
    accent: 'blue',
    goals: ['理解 &&、||、! 三种逻辑运算', '掌握非零即真的 C++ 布尔规则', '能避免链式比较和优先级陷阱'],
    deliverables: ['完成逻辑门模拟实验', '写出一个门票/权限判断程序', '整理逻辑表达式易错清单'],
    checks: ['能预测复杂逻辑表达式的真假', '能把生活规则翻译成 && 和 ||', '能指出 1 < x < 10 为什么不可靠'],
  },
  7: {
    accent: 'blue',
    goals: ['理解 if 语句如何根据条件决定是否执行', '掌握 if / else 的双分支写法', '能用比较符号完成基础条件判断'],
    deliverables: ['完成红绿灯条件模拟', '写出奇偶数判断程序', '完成一组分号陷阱纠错题'],
    checks: ['能解释条件为真和为假时分别执行什么', '能发现 if 后误加分号的问题', '能选择正确的比较运算符'],
  },
  8: {
    accent: 'blue',
    goals: ['理解 if / else if / else 的多重选择顺序', '能判断条件从上到下只会命中第一个分支', '会设计互斥条件避免遗漏和重复'],
    deliverables: ['完成智能餐厅多分支模拟', '写出成绩等级判断程序', '完成多重选择真题讲解'],
    checks: ['能预测多个条件同时满足时命中哪一支', '能解释 else if 顺序为什么重要', '能发现条件覆盖不完整的问题'],
  },
  9: {
    accent: 'blue',
    goals: ['掌握 for 循环的初始化、条件和更新三段结构', '能准确判断循环次数和循环结束后的变量值', '能用 for 循环完成计数与枚举题'],
    deliverables: ['写出一个 1 到 n 的计数程序', '完成循环变量跟踪表', '解释 i < 10 与 i <= 10 的次数差异'],
    checks: ['能说清楚 for 的三个分号分别控制什么', '能手算循环最后一次执行后的 i 值', '能识别漏写更新语句造成的死循环'],
  },
  10: {
    accent: 'blue',
    goals: ['理解 while 循环先判断再执行的流程', '掌握数位分离中的 / 与 % 组合', '能区分 for 与 while 的适用场景'],
    deliverables: ['写出一个整数各位数字求和程序', '画出 while 条件变化表', '改写一个固定次数循环为 while 形式'],
    checks: ['能说明循环变量如何变化', '能判断 while(1) 何时需要 break', '能用 n % 10 和 n / 10 拆数字'],
  },
  11: {
    accent: 'indigo',
    goals: ['理解 break 和 continue 对循环流程的不同影响', '能跟踪带条件跳转的循环代码', '能判断嵌套循环中 break 的作用范围'],
    deliverables: ['完成一张 break / continue 对比表', '手算两道带跳转语句的循环题', '写出跳过指定数字的打印程序'],
    checks: ['能说清 break 是结束循环而不是结束 if', '能说清 continue 会进入下一轮循环', '能避免把内层 break 误判成跳出全部循环'],
  },
  12: {
    accent: 'indigo',
    goals: ['理解外层循环与内层循环的执行关系', '能计算双重循环的总执行次数', '能用嵌套循环输出基础图形'],
    deliverables: ['画出 i / j 的执行表', '写出九九乘法表或星号三角形', '标注换行语句应该放在哪一层'],
    checks: ['能解释外层一次、内层一轮', '能识别变量名冲突和大括号层级错误', '能用行列关系推导循环边界'],
  },
  13: {
    accent: 'teal',
    goals: ['用取模判断倍数、余数、个位数和闰年条件', '能把数学文字题翻译成 C++ 条件表达式', '能组合 && 与 || 解决复合判断'],
    deliverables: ['写出闰年判断程序', '完成倍数筛选小练习', '把逢七过规则翻译成代码条件'],
    checks: ['能写出 a % b == 0 的含义', '能区分 && 与 || 的使用时机', '能把题目中的且、或、不翻译成代码'],
  },
  14: {
    accent: 'teal',
    goals: ['理解模拟题的状态、规则和更新顺序', '能用变量表示题目中的过程状态', '能按步骤验证边界条件'],
    deliverables: ['写出一份模拟题状态表', '完成一个简单过程模拟程序', '列出输入、更新、输出三段逻辑'],
    checks: ['能先判断下一步是否合法再更新状态', '能区分当前状态和下一状态', '能处理多组数据或重复模拟前的重置'],
  },
  15: {
    accent: 'blue',
    goals: ['掌握筛选、计数和统计类题目的基本套路', '能用条件过滤目标数据', '能把循环、判断和计数器组合起来'],
    deliverables: ['写出一个满足条件计数程序', '完成一张筛选条件拆解表', '提交一题综合训练代码'],
    checks: ['能初始化计数器并在满足条件时更新', '能避免把筛选条件写反', '能用样例手算验证统计结果'],
  },
  16: {
    accent: 'indigo',
    goals: ['串联一级核心考点并形成考前检查清单', '能定位变量、运算、分支、循环中的高频错误', '能用真题思路完成最后复盘'],
    deliverables: ['完成一级考前自查表', '整理 3 个个人易错点', '完成一套小型综合题复盘'],
    checks: ['能独立解释整数除法、取模、逻辑运算和循环边界', '能检查代码中的初始化、分号和大括号', '能根据题目样例反推程序是否正确'],
  },
};

const nextReasonByLesson = {
  1: '写出第一个程序后，下一步要学会给数据起名字。',
  2: '变量能存数据，接下来要理解不同类型参与计算时的规则。',
  3: '类型规则打底后，继续处理表达式顺序、整除和取模。',
  4: '算术表达式之后进入字符、bool 和编码，补齐一级常见类型坑。',
  5: '理解真假值之后，继续学习 &&、||、! 组合条件。',
  6: '逻辑运算之后进入 if / else，让程序根据条件走不同路线。',
  7: '单个分支稳定后，继续处理多个条件连续判断。',
  8: '多分支之后进入循环，开始让程序重复执行任务。',
  9: '学完固定次数循环后，继续看不确定次数循环和数位分离。',
  10: 'while 之后要掌握循环里的刹车和跳过，这是 GESP 常见陷阱。',
  11: '循环控制之后进入多重循环，开始处理行列、图形和嵌套计数。',
  12: '多重循环打底后，进入数学应用，把条件判断和循环结合起来。',
  13: '数学条件之后，继续练习按题目规则一步步模拟过程。',
  14: '模拟题之后进入筛选统计，把循环、条件和计数器整合起来。',
  15: '最后一课做总复盘，把一级高频坑点集中扫一遍。',
  16: '一级课结束后，建议进入真题库做整卷训练和错题复盘。',
};

const previousReasonByLesson = {
  2: '如果程序结构还不熟，先回看 Hello World 的输入输出框架。',
  3: '变量命名和类型声明是理解表达式计算的前提。',
  4: '先确认 int、double 和类型转换，再看复杂表达式。',
  5: '整除、取模和优先级是字符与 bool 混合题的基础。',
  6: 'char、bool 与非零即真，是逻辑表达式的前置概念。',
  7: '&&、||、! 是 if 条件判断的核心积木。',
  8: 'if / else 的二选一结构，是多分支判断的基础。',
  9: '如果循环边界还不稳，先回看多分支判断和基础条件。',
  10: 'for 循环的边界和变量变化，是理解 while 的前置基础。',
  11: 'while 的停止条件不清楚时，break / continue 会更容易混。',
  12: '先确认 break / continue 只影响当前循环层级，再看嵌套。',
  13: '多重循环训练的是行列和次数，是很多数学枚举题的底座。',
  14: '数学应用中的取模和复合条件，是模拟题规则翻译的基础。',
  15: '模拟题训练过程状态，筛选统计训练目标条件，两者经常组合。',
  16: '综合训练课能暴露最后的薄弱点，适合考前回看。',
};

const practiceByLesson = {
  1: [{ label: 'GESP 一级真题库：先看程序结构题', path: '/question-bank' }],
  2: [{ label: 'GESP 一级真题：变量命名与标识符', path: '/question-bank/1/2024-06-l1' }],
  3: [{ label: 'GESP 一级真题：整数、小数和类型转换', path: '/question-bank/1/2024-03-l1' }],
  4: [{ label: 'GESP 一级真题：表达式与运算优先级', path: '/question-bank/1/2024-09-l1' }],
  5: [{ label: 'GESP 一级真题：字符、bool 与 ASCII', path: '/question-bank/1/2025-03-l1' }],
  6: [{ label: 'GESP 一级真题：逻辑运算与真假判断', path: '/question-bank/1/2025-06-l1' }],
  7: [{ label: 'GESP 一级真题：if / else 条件判断', path: '/question-bank/1/2023-12-l1' }],
  8: [{ label: 'GESP 一级真题：多分支与条件顺序', path: '/question-bank/1/2025-09-l1' }],
  9: [{ label: 'GESP 一级真题：循环次数与变量跟踪', path: '/question-bank/1/2024-12-l1' }],
  10: [{ label: 'GESP 一级真题：while 与 break', path: '/question-bank/1/2023-12-l1' }],
  11: [{ label: 'GESP 一级真题：continue / break 代码跟踪', path: '/question-bank/1/2024-12-l1' }],
  12: [{ label: 'GESP 一级真题：多重循环与图形输出', path: '/question-bank/1/2024-06-l1' }],
  13: [{ label: 'GESP 一级真题：取模、闰年与逻辑判断', path: '/question-bank/1/2024-09-l1' }],
  14: [{ label: 'GESP 一级真题：过程模拟题', path: '/question-bank/1/2025-03-l1' }],
  15: [{ label: 'GESP 一级真题：筛选与统计', path: '/question-bank/1/2025-06-l1' }],
  16: [{ label: '进入 GESP 一级真题库做整卷训练', path: '/question-bank' }],
};

const reviewTasksByLesson = {
  1: ['在本机重新敲一遍 Hello World，并修改输出文本。', '用一句话解释 #include、main 和 cout 各自负责什么。'],
  2: ['列出 5 个合法变量名和 3 个非法变量名。', '把生活中的数据分成 int、double、char、string 四类。'],
  3: ['手算 5/2、5%2、5.0/2 的结果并解释差异。', '找出一个表达式中发生类型转换的位置。'],
  4: ['给复杂表达式加括号，标出计算顺序。', '准备 2 道整除和取模混合题做手算验证。'],
  5: ['查出 A、a、0 三个字符的 ASCII 值。', '解释 bool 输出为什么通常是 0 或 1。'],
  6: ['把生活中的“且、或、非”各写成一个 C++ 条件。', '手算 3 个含 &&、||、! 的表达式。'],
  7: ['写一个根据分数输出是否及格的 if / else 程序。', '检查条件边界：等于时应该走哪一支。'],
  8: ['把一个多条件题按优先顺序画成判断树。', '准备一组输入逐个验证 else-if 是否覆盖完整。'],
  9: ['手算 3 个不同边界的 for 循环次数。', '把本课代码中的 i < 10 改成 i <= 10，比较输出变化。'],
  10: ['用 while 写一个求数字位数的程序。', '解释为什么 while 循环体内必须让条件发生变化。'],
  11: ['分别写一个使用 break 和 continue 的最小程序。', '用表格跟踪每轮循环中变量的变化。'],
  12: ['用 i、j 表格推导一个 4 行三角形。', '检查换行语句写在外层还是内层。'],
  13: ['把“是 3 的倍数且不是 5 的倍数”翻译成 C++ 条件。', '默写闰年判断表达式并用 1900、2000、2024 验证。'],
  14: ['给一道模拟题列出状态变量、更新规则和停止条件。', '用样例手算每一步，确认程序输出。'],
  15: ['写出筛选统计题的三步模板：遍历、判断、计数。', '准备 2 个样例验证条件有没有写反。'],
  16: ['整理自己的 3 个高频错因。', '做一套一级真题后，把错题按变量、运算、分支、循环分类。'],
};

export const cppL1Course = defineCourse({
  id: 'cpp-l1', title: 'GESP C++ 一级', language: 'cpp', kind: 'level',
  items: cppL1Lessons, detailsById: qualityByLesson, pathFor: id => `/lesson/1/${id}`,
});

const buildCppL1LessonSupport = createSequentialCourseSupport(cppL1Course, {
  previousReasons: previousReasonByLesson,
  nextReasons: nextReasonByLesson,
  practiceLinksById: practiceByLesson,
  reviewTasksById: reviewTasksByLesson,
  exit: ({ current }) => ({ title: 'GESP 一级真题库', path: '/question-bank', reason: nextReasonByLesson[current.id] }),
});

export function getCppL1LessonSupport(lessonId) {
  return buildCppL1LessonSupport(lessonId);
}
