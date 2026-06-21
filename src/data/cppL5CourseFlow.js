const cppL5Lessons = [
  { id: 1, title: '第 1 课：素数大筛选 (埃氏/线性)' },
  { id: 2, title: '第 2 课：公约数与公倍数 (GCD)' },
  { id: 3, title: '第 3 课：超级计算器 (高精加减)' },
  { id: 4, title: '第 4 课：超级计算器 (高精乘除)' },
];

const qualityByLesson = {
  1: {
    accent: 'amber',
    goals: ['能解释素数定义和试除复杂度', '能写出埃氏筛模板', '能判断何时需要预处理素数表'],
    deliverables: ['写出 isPrime 试除版并估算单次复杂度', '写出埃氏筛 isPrime 数组预处理模板', '整理从 i*i 开始标记倍数的原因卡'],
    checks: ['能正确处理 0、1 不是素数', '能说明筛法适合多次素数询问', '能避免 j += i 和数组上界写错'],
  },
  2: {
    accent: 'amber',
    goals: ['能手写递归和循环版 gcd', '能用 gcd 计算 lcm', '能识别周期、比例、分组中的 gcd 模型'],
    deliverables: ['写出欧几里得算法递归版和循环版', '写出 lcm(a,b)=a/gcd(a,b)*b 并解释防溢出顺序', '整理最大公约数与最小公倍数题型识别卡'],
    checks: ['能手推 gcd(48,18) 的取模过程', '能说明 gcd(a,0)=a 的边界', '能区分求最大可分组大小和最小共同周期'],
  },
  3: {
    accent: 'amber',
    goals: ['能解释高精度整数的存储方式', '能写出高精加法模板', '能处理高精减法的借位和前导零'],
    deliverables: ['把字符串大整数逆序存入数组或 vector', '写出高精加法并输出结果', '写出高精减法并去掉多余前导零'],
    checks: ['能说明为什么低位放在数组前面更方便进位', '能处理 999+1、1000-1、相等相减等边界', '能先比较大小再决定减法符号'],
  },
  4: {
    accent: 'amber',
    goals: ['能写出高精乘低精模板', '能写出高精除低精模板', '能处理前导零、进位和余数'],
    deliverables: ['写出大整数乘 int 的逐位进位模板', '写出大整数除 int 的从高位到低位模板', '整理乘法 carry 和除法 remainder 的状态变化表'],
    checks: ['能正确处理乘数或被除数为 0', '能说明除法必须从高位开始扫', '能输出商并保留最终余数用于检查'],
  },
};

const nextReasonByLesson = {
  1: '素数预处理打通后，下一课进入整除关系的核心工具：最大公约数和最小公倍数。',
  2: 'gcd/lcm 稳定后，下一课处理普通整数装不下的情况，进入高精加减。',
  3: '高精加减掌握进位和借位后，下一课继续扩展到高精乘低精和除低精。',
  4: '高精四则的基础模板完成后，下一课把素数、gcd 和高精放进数论综合题。',
};

const previousReasonByLesson = {
  1: '五级默认四级函数、数组、排序和递推已过关；筛法卡住时先回 L4-16 复盘数组边界和复杂度。',
  2: '欧几里得算法需要基本取模和循环稳定，先确认第 1 课能估算试除和筛法的运行量。',
  3: '高精加减依赖数组和字符串处理，先确认第 2 课的整数运算边界和取模思路稳定。',
  4: '高精乘除建立在高精存储和进位借位上，先确认第 3 课能正确处理低位优先的数组表示。',
};

const practiceByLesson = {
  1: [{ label: 'GESP 五级真题：素数筛与预处理', path: '/question-bank/5/2023-09-l5' }],
  2: [{ label: 'GESP 五级真题：GCD 与整除关系', path: '/question-bank/5/2023-12-l5' }],
  3: [{ label: 'GESP 五级真题：高精加减', path: '/question-bank/5/2024-03-l5' }],
  4: [{ label: 'GESP 五级真题：高精乘除', path: '/question-bank/5/2024-06-l5' }],
};

const reviewTasksByLesson = {
  1: ['写埃氏筛求出 1 到 n 的所有素数。', '比较 10000 次素数询问时试除和筛法的思路差异。'],
  2: ['写递归版 gcd 和循环版 gcd，并用同一组数据测试。', '用 gcd 计算两个数的 lcm，并解释为什么先除后乘。'],
  3: ['完成两个非负大整数的高精加法。', '完成大数减小数的高精减法，并处理结果为 0 的情况。'],
  4: ['完成大整数乘一位或多位 int 的程序。', '完成大整数除 int，输出商和余数。'],
};

export function getCppL5LessonSupport(lessonId) {
  const lesson = cppL5Lessons.find((item) => item.id === lessonId);
  const previousLesson = cppL5Lessons.find((item) => item.id === lessonId - 1);
  const nextLesson = cppL5Lessons.find((item) => item.id === lessonId + 1);

  if (!lesson) return null;

  return {
    lesson,
    quality: qualityByLesson[lessonId],
    previous: previousLesson
      ? {
          title: previousLesson.title,
          path: `/lesson/5/${previousLesson.id}`,
          reason: previousReasonByLesson[lessonId],
        }
      : {
          title: '第 16 课：全真模拟与避坑 (2)',
          path: '/lesson/4/16',
          reason: previousReasonByLesson[lessonId],
        },
    next: nextLesson
      ? {
          title: nextLesson.title,
          path: `/lesson/5/${nextLesson.id}`,
          reason: nextReasonByLesson[lessonId],
        }
      : {
          title: '第 5 课：数论综合实战',
          path: '/lesson/5/5',
          reason: nextReasonByLesson[lessonId],
        },
    practiceLinks: practiceByLesson[lessonId] || [],
    reviewTasks: reviewTasksByLesson[lessonId] || [],
  };
}
