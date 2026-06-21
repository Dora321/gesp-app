const cppL5Lessons = [
  { id: 1, title: '第 1 课：素数大筛选 (埃氏/线性)' },
  { id: 2, title: '第 2 课：公约数与公倍数 (GCD)' },
  { id: 3, title: '第 3 课：超级计算器 (高精加减)' },
  { id: 4, title: '第 4 课：超级计算器 (高精乘除)' },
  { id: 5, title: '第 5 课：数论综合实战' },
  { id: 6, title: '第 6 课：链表的诞生 (节点/指针)' },
  { id: 7, title: '第 7 课：链表的增删改 (先连后断)' },
  { id: 8, title: '第 8 课：复杂的链表 (双向/循环)' },
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
  5: {
    accent: 'amber',
    goals: ['能根据题面选择筛法、gcd、lcm 或高精度', '能把数论工具组合成完整解法', '能用数据范围判断是否会溢出'],
    deliverables: ['写出题面信号到算法工具的匹配表', '完成素数筛加 gcd 条件统计程序', '写出 n! 高精度计算并解释末尾 0 的来源'],
    checks: ['能先判断算法模型再判断数据类型', '能说明为什么 lcm 要先除后乘', '能把预处理、枚举和统计逻辑拆开'],
  },
  6: {
    accent: 'amber',
    goals: ['能写出单链表节点结构体', '能解释 head、tail 和 next 的职责', '能遍历链表并正确停止'],
    deliverables: ['画出 head 到每个节点再到 nullptr 的链表图', '写出尾插法创建单链表模板', '写出遍历链表统计节点数和总和的程序'],
    checks: ['能说明 p->next = nullptr 的含义', '能区分数组下标移动和链表指针移动', '能避免空链表和尾节点 next 未初始化'],
  },
  7: {
    accent: 'amber',
    goals: ['能在指定节点后插入新节点', '能删除指定节点并保持链表不断开', '能处理头节点和空链表边界'],
    deliverables: ['写出插入节点的两步指针修改顺序', '写出删除第一个 target 节点的程序', '整理删除头节点、中间节点、尾节点的边界表'],
    checks: ['能解释为什么插入要先接住后半段', '能在 delete 前保存仍需使用的指针', '能说明删除头节点时为什么必须移动 head'],
  },
  8: {
    accent: 'amber',
    goals: ['能写出双向链表节点结构', '能解释循环链表的停止条件', '能根据题型选择单链表、双向链表或循环链表'],
    deliverables: ['画出双向链表 prev 和 next 的双向连接图', '写出循环链表遍历一圈的 do while 模板', '整理三类链表适用题型和风险点'],
    checks: ['能说明双向链表插删要维护更多指针', '能避免循环链表无限循环', '能识别报数淘汰类题目适合循环链表'],
  },
};

const nextReasonByLesson = {
  1: '素数预处理打通后，下一课进入整除关系的核心工具：最大公约数和最小公倍数。',
  2: 'gcd/lcm 稳定后，下一课处理普通整数装不下的情况，进入高精加减。',
  3: '高精加减掌握进位和借位后，下一课继续扩展到高精乘低精和除低精。',
  4: '高精四则的基础模板完成后，下一课把素数、gcd 和高精放进数论综合题。',
  5: '数论工具会选了之后，下一课切换到新的数据结构：用节点和指针表达关系。',
  6: '链表能创建和遍历后，下一课开始真正修改链表：插入、删除和边界处理。',
  7: '单链表增删稳定后，下一课扩展到双向链表和循环链表，指针维护会更复杂。',
  8: '复杂链表结构理解后，下一课用循环链表解决约瑟夫环，把结构应用到综合问题。',
};

const previousReasonByLesson = {
  1: '五级默认四级函数、数组、排序和递推已过关；筛法卡住时先回 L4-16 复盘数组边界和复杂度。',
  2: '欧几里得算法需要基本取模和循环稳定，先确认第 1 课能估算试除和筛法的运行量。',
  3: '高精加减依赖数组和字符串处理，先确认第 2 课的整数运算边界和取模思路稳定。',
  4: '高精乘除建立在高精存储和进位借位上，先确认第 3 课能正确处理低位优先的数组表示。',
  5: '数论综合要调用前四课工具，先确认筛法、gcd/lcm 和高精模板都能独立写出。',
  6: '链表入门需要结构体和指针基础，先确认第 5 课已经能把问题模型拆清楚。',
  7: '链表增删建立在创建和遍历之上，先确认第 6 课能画出 head、tail、next 的关系。',
  8: '双向和循环链表依赖单链表增删顺序，先确认第 7 课能稳定处理先连后断。',
};

const practiceByLesson = {
  1: [{ label: 'GESP 五级真题：素数筛与预处理', path: '/question-bank/5/2023-09-l5' }],
  2: [{ label: 'GESP 五级真题：GCD 与整除关系', path: '/question-bank/5/2023-12-l5' }],
  3: [{ label: 'GESP 五级真题：高精加减', path: '/question-bank/5/2024-03-l5' }],
  4: [{ label: 'GESP 五级真题：高精乘除', path: '/question-bank/5/2024-06-l5' }],
  5: [{ label: 'GESP 五级真题：数论综合与边界', path: '/question-bank/5/2024-09-l5' }],
  6: [{ label: 'GESP 五级真题：链表节点模型', path: '/question-bank/5/2024-12-l5' }],
  7: [{ label: 'GESP 五级真题：链表增删操作', path: '/question-bank/5/2025-03-l5' }],
  8: [{ label: 'GESP 五级真题：复杂链表与环形过程', path: '/question-bank/5/2025-06-l5' }],
};

const reviewTasksByLesson = {
  1: ['写埃氏筛求出 1 到 n 的所有素数。', '比较 10000 次素数询问时试除和筛法的思路差异。'],
  2: ['写递归版 gcd 和循环版 gcd，并用同一组数据测试。', '用 gcd 计算两个数的 lcm，并解释为什么先除后乘。'],
  3: ['完成两个非负大整数的高精加法。', '完成大数减小数的高精减法，并处理结果为 0 的情况。'],
  4: ['完成大整数乘一位或多位 int 的程序。', '完成大整数除 int，输出商和余数。'],
  5: ['给三道数论题分别写出“题面信号、选择工具、边界风险”。', '完成一个筛法 + gcd 条件统计练习。'],
  6: ['用尾插法创建一条单链表并输出所有节点。', '画出 head、tail、cur 在创建和遍历过程中的位置变化。'],
  7: ['实现删除链表中第一个 target 节点。', '实现删除链表中所有 target 节点，并单独测试删除头节点。'],
  8: ['写出双向链表节点定义，并说明插入时要改哪几条边。', '用循环链表遍历一圈，说明停止条件为什么不是 nullptr。'],
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
          title: '第 9 课：链表综合应用 (约瑟夫环)',
          path: '/lesson/5/9',
          reason: nextReasonByLesson[lessonId],
        },
    practiceLinks: practiceByLesson[lessonId] || [],
    reviewTasks: reviewTasksByLesson[lessonId] || [],
  };
}
