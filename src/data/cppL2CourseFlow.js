const cppL2Lessons = [
  { id: 1, title: '第 1 课：存储器与网络基础' },
  { id: 2, title: '第 2 课：ASCII 与字符运算' },
  { id: 3, title: '第 3 课：类型转换与整数除法' },
  { id: 4, title: '第 4 课：switch 多路选择' },
  { id: 5, title: '第 5 课：嵌套循环基础' },
  { id: 6, title: '第 6 课：图形打印实战' },
  { id: 7, title: '第 7 课：流程图的秘密' },
  { id: 8, title: '第 8 课：数学工具箱 (cmath)' },
];

const qualityByLesson = {
  1: {
    accent: 'indigo',
    goals: ['理解 RAM、ROM、外存的区别', '认识 B、KB、MB、GB、TB 的容量关系', '能说清 IP、DNS 和网络访问的基本流程'],
    deliverables: ['完成一张存储器对比表', '记录一次设备容量观察', '画出域名访问网页的简化路线'],
    checks: ['能解释断电后哪些数据会丢失', '能完成 1024 进位换算', '能区分域名、IP 和服务器的作用'],
  },
  2: {
    accent: 'emerald',
    goals: ['记住常用 ASCII 关键编码', '会在 char 和 int 之间转换', '能用字符运算处理大小写和数字字符'],
    deliverables: ['完成一张 ASCII 关键路标卡', '写出字符转数字的小实验', '完成一道字符运算真题复盘'],
    checks: ['能说出字符 0、大写 A、小写 a 的编码', '能解释 char 参与运算时会先变成整数', '能判断单引号字符和双引号字符串的差异'],
  },
  3: {
    accent: 'blue',
    goals: ['能判断表达式结果类型', '能解释整数除法截断', '能用强制转换修正计算结果'],
    deliverables: ['完成一张类型转换规则表', '写出 3 组 int / double 对比代码', '整理整数除法易错题的纠错说明'],
    checks: ['能预测 7 / 2 与 7 / 2.0 的结果', '能说明赋值给 double 为什么救不回已截断的小数', '能把需要小数的表达式改成安全写法'],
  },
  4: {
    accent: 'indigo',
    goals: ['读懂 switch-case 的入口匹配流程', '知道 break 如何防止穿透', '会用 default 处理异常输入'],
    deliverables: ['完成一个菜单选择程序', '写出 break 穿透对比样例', '整理 switch 与 if 的选型表'],
    checks: ['能判断 case 命中后会执行到哪里', '能发现漏写 break 的输出陷阱', '能说明范围判断为什么更适合 if / else if'],
  },
  5: {
    accent: 'indigo',
    goals: ['能手动追踪 i 和 j 的变化', '能计算双层循环总次数', '能区分外层控制行、内层控制列'],
    deliverables: ['完成一张双层循环追踪表', '写出矩形和数对枚举两个程序', '用文字说明每个循环变量的角色'],
    checks: ['能解释为什么总次数通常是外层次数乘内层次数', '能判断内层变量什么时候重新初始化', '能把“每行/每列/所有组合”翻译成双层循环'],
  },
  6: {
    accent: 'emerald',
    goals: ['能写矩形和基础三角形', '能用空格控制右对齐', '能从目标图形反推循环边界'],
    deliverables: ['完成三种图形打印程序', '整理一张行号、空格数、符号数对照表', '给右对齐三角代码补上变量说明注释'],
    checks: ['能说明外层循环为什么控制行数', '能把空格当作正式输出内容处理', '能从前 3 行推导第 i 行公式'],
  },
  7: {
    accent: 'indigo',
    goals: ['能识别流程图常用符号', '能追踪分支和循环路径', '能把流程图翻译成 C++ 代码'],
    deliverables: ['画出判断奇偶的流程图', '把求和流程图改写成 while 程序', '完成一张流程图变量追踪表'],
    checks: ['能说出圆角框、矩形框、菱形框分别对应什么', '能顺着箭头判断分支路径', '能发现循环回边和变量更新位置'],
  },
  8: {
    accent: 'amber',
    goals: ['会引入 cmath 并调用常用函数', '能区分 ceil 和 floor', '知道 pow/sqrt 的浮点精度风险'],
    deliverables: ['完成一张 cmath 函数用途卡', '写出两点距离小程序', '记录一个 pow 或 sqrt 的类型转换风险案例'],
    checks: ['能说明 sqrt、pow、ceil、floor 的返回值特点', '能判断向上取整和向下取整的适用场景', '能解释质数判断为什么只需要枚举到平方根附近'],
  },
};

const nextReasonByLesson = {
  1: '存储和网络概念打底后，下一课进入字符编码，理解电脑如何保存字母。',
  2: '字符编码稳定后，继续学习 int、double、char 混合计算时的类型转换规则。',
  3: '类型转换是读代码输出题的核心，下一课用 switch 处理固定选项的多路选择。',
  4: 'switch 打稳后，进入嵌套循环，把流程控制从“一条路”扩展到“行列结构”。',
  5: '双层循环能追踪清楚后，下一课把它用于图形打印，训练按行反推规则。',
  6: '图形打印会把行列关系可视化，下一课进入流程图，继续训练执行路径追踪。',
  7: '流程图把分支和循环路线理清后，下一课学习 cmath，用工具函数处理数学题。',
  8: 'cmath 的 sqrt 会直接服务下一课质数判断，把枚举范围从 n 缩到平方根附近。',
};

const previousReasonByLesson = {
  2: '如果存储单位和计算机基础名词还不熟，先回看 L2-1 的概念底座。',
  3: 'ASCII 与 char 转 int 是类型转换题的直接前置。',
  4: 'switch 常处理整数或字符选项，先确认类型转换和字符编码不会混。',
  5: '嵌套循环前要先确认 switch、if 和基础循环的执行顺序已经稳定。',
  6: '图形打印直接依赖嵌套循环的“外层行、内层列”模型。',
  7: '流程图里的循环路径需要先能手动追踪图形打印里的变量变化。',
  8: 'cmath 前先复习流程图和分支循环，避免数学函数和执行路径同时卡住。',
};

const practiceByLesson = {
  1: [{ label: '进入 GESP 二级真题库做概念题复盘', path: '/question-bank' }],
  2: [{ label: 'GESP 二级真题：字符编码与 ASCII', path: '/question-bank/2/2024-03-l2' }],
  3: [{ label: 'GESP 二级真题：类型转换与表达式输出', path: '/question-bank/2/2024-06-l2' }],
  4: [{ label: 'GESP 二级真题：分支与多路选择', path: '/question-bank/2/2024-09-l2' }],
  5: [{ label: 'GESP 二级真题：嵌套循环与枚举', path: '/question-bank/2/2024-12-l2' }],
  6: [{ label: 'GESP 二级真题：图形打印与循环边界', path: '/question-bank/2/2025-03-l2' }],
  7: [{ label: 'GESP 二级真题：流程图与执行路径', path: '/question-bank/2/2025-06-l2' }],
  8: [{ label: 'GESP 二级真题：数学函数与质数前置', path: '/question-bank/2/2025-09-l2' }],
};

const reviewTasksByLesson = {
  1: ['用一句话区分 RAM、ROM 和外存。', '把 1GB 换算成 MB，再解释为什么是 1024。'],
  2: ['默写 0、A、a 的 ASCII 编码。', '写一个把小写字母转成大写字母的最小程序。'],
  3: ['手算 7/2、7/2.0、(double)7/2 的输出。', '找出一道表达式题里最先发生的类型转换。'],
  4: ['写一个带 default 的菜单程序。', '故意删掉一个 break，记录输出如何变化。'],
  5: ['手画 3 行 4 列双层循环追踪表。', '写一个统计 a + b == 20 的数对枚举程序。'],
  6: ['把一个右对齐三角拆成“行号、空格数、星号数”表格。', '写出正方形、左三角、右对齐三角三个程序。'],
  7: ['把判断奇偶程序画成流程图。', '找一张循环流程图，逐轮写出变量变化。'],
  8: ['整理 sqrt、pow、ceil、floor 的用途和返回值特点。', '写一个两点距离程序，并说明为什么用 sqrt。'],
};

export function getCppL2LessonSupport(lessonId) {
  const lesson = cppL2Lessons.find((item) => item.id === lessonId);
  const previousLesson = cppL2Lessons.find((item) => item.id === lessonId - 1);
  const nextLesson = cppL2Lessons.find((item) => item.id === lessonId + 1);

  if (!lesson) return null;

  return {
    lesson,
    quality: qualityByLesson[lessonId],
    previous: previousLesson
      ? {
          title: previousLesson.title,
          path: `/lesson/2/${previousLesson.id}`,
          reason: previousReasonByLesson[lessonId],
        }
      : {
          title: '第 16 课：一级考前冲刺',
          path: '/lesson/1/16',
          reason: '二级课程默认已经掌握一级的变量、分支和循环基础，卡住时先回 L1-16 做总复盘。',
        },
    next: nextLesson
      ? {
          title: nextLesson.title,
          path: `/lesson/2/${nextLesson.id}`,
          reason: nextReasonByLesson[lessonId],
        }
      : {
          title: '第 9 课：质数侦探 (Prime)',
          path: '/lesson/2/9',
          reason: nextReasonByLesson[lessonId],
        },
    practiceLinks: practiceByLesson[lessonId] || [],
    reviewTasks: reviewTasksByLesson[lessonId] || [],
  };
}
