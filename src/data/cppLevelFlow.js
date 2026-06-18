const cppLevels = {
  2: {
    title: 'GESP C++ 二级',
    path: '/level2',
    badge: '循环与数学冲刺',
    accent: 'blue',
    focus: '从一级语法过渡到嵌套循环、数位拆解、数学判断和过程模拟。',
    bridge: '二级是“会写语句”到“会拆题”的转折层，重点训练循环边界、状态跟踪和输出格式。',
    goals: ['熟练使用多层循环处理图形、枚举和统计题', '掌握取模、整除、数学函数和基础数论判断', '能用状态表拆解模拟题并规避常见考场坑'],
    deliverables: ['完成一套二级核心题型模板', '整理一张循环边界和数位拆解错题表', '至少完成 2 套二级真题复盘'],
    checks: ['能手算双层循环总执行次数', '能解释 1LL、防溢出和整数除法坑点', '能用样例逐步验证模拟题状态更新'],
    previous: {
      title: 'GESP C++ 一级',
      path: '/level1',
      reason: '如果变量、分支、基础循环还不稳，先回一级复盘语法地基。',
    },
    next: {
      title: 'GESP C++ 三级',
      path: '/level3',
      reason: '二级的循环和数学拆题能力稳定后，三级会加入字符串、数组、位运算和更强的枚举。',
    },
    practiceLinks: [
      { label: '进入 GESP 二级真题库', path: '/question-bank' },
      { label: '查看 2025-12 二级真题解析', path: '/gesp/2025-12-l2' },
    ],
    reviewTasks: ['用一张表复盘图形打印题的行、列、输出字符。', '把数位拆解模板默写一遍，并解释 % 和 / 各自作用。', '做完真题后把错题分成边界、溢出、格式、模拟顺序四类。'],
  },
  3: {
    title: 'GESP C++ 三级',
    path: '/level3',
    badge: '字符串、数组与枚举',
    accent: 'indigo',
    focus: '在二级拆题能力上，加入字符串处理、数组模拟、位运算和枚举数学。',
    bridge: '三级要求学生能把数据结构、输入处理和算法模板组合起来，开始接近正式算法训练。',
    goals: ['掌握 string、getline、字符遍历和 ASCII 转换', '能用数组完成统计、极值、模拟和状态记录', '理解位运算、进制转换、质数判断与暴力枚举'],
    deliverables: ['完成一份三级专题模板清单', '整理字符串输入和数组下标的高频坑', '完成至少 2 套三级真题复盘'],
    checks: ['能区分 cin 与 getline 的输入边界', '能检查数组下标是否越界', '能估算枚举复杂度是否适合题目范围'],
    previous: {
      title: 'GESP C++ 二级',
      path: '/level2',
      reason: '三级会大量使用二级的循环、数位和模拟能力，薄弱时应先回二级补齐。',
    },
    next: {
      title: 'GESP C++ 四级',
      path: '/level4',
      reason: '三级专题稳定后，可以进入更系统的算法与数据结构训练。',
    },
    practiceLinks: [{ label: '进入 GESP 三级真题库', path: '/question-bank' }],
    reviewTasks: ['用 3 个样例验证 getline、字符遍历和 ASCII 转换。', '给数组题写出下标范围和初始化方式。', '把枚举题的循环层数、数据范围和最坏次数写清楚。'],
  },
};

export function getCppLevelSupport(level) {
  return cppLevels[level] || null;
}
