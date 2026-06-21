const cppL3Lessons = [
  { id: 1, title: '第 1 课：变身数字魔术师 (进制)' },
  { id: 2, title: '第 2 课：负数的真面目 (补码)' },
  { id: 3, title: '第 3 课：位运算大冒险 (上)' },
  { id: 4, title: '第 4 课：位运算大冒险 (下)' },
];

const qualityByLesson = {
  1: {
    accent: 'rose',
    goals: ['能用按权展开读懂任意进制数', '能把十进制整数转成二进制', '能在二、八、十六进制之间建立联系'],
    deliverables: ['完成一张二、八、十六进制权重表', '写出 3 道进制转换的完整计算过程', '整理一张二进制分组转八/十六进制速查卡'],
    checks: ['能写出按权展开式而不是只报答案', '能说明短除法为什么要倒读余数', '能解释 8 = 2^3、16 = 2^4 和分组转换的关系'],
  },
  2: {
    accent: 'purple',
    goals: ['知道补码必须在固定位数下讨论', '能求简单负数的 8 位补码', '能解释有符号整数范围和溢出风险'],
    deliverables: ['完成一张 8 位和 16 位范围对比表', '写出 -1、-5、-16 的补码四步过程', '用位模式解释 127 + 1 的溢出变化'],
    checks: ['能先声明位数再谈补码', '能按“原码、取反、加 1”写出负数补码', '能说明 8 位有符号整数为什么是 -128 到 127'],
  },
  3: {
    accent: 'teal',
    goals: ['能解释 &、|、^ 的逐位规则', '能手算 4 位以内位运算表达式', '能理解掩码筛选某些位的作用'],
    deliverables: ['完成一张 &、|、^ 真值表', '手算 3 组 4 位位运算表达式', '写出 x & 1 判断奇偶的小程序'],
    checks: ['能把两个数先写成二进制再逐位计算', '能说明异或的“相同为 0，不同为 1”规则', '能解释掩码为什么可以保留目标位'],
  },
  4: {
    accent: 'indigo',
    goals: ['能解释左移和右移的数值变化', '能用 1 << k 生成掩码', '能写出检查、设置、清除某位的模板'],
    deliverables: ['手算 3 组移位表达式并写出二进制变化', '整理检查、设置、清除、翻转某位模板卡', '写出判断、翻转、清除第 k 位的三个小程序'],
    checks: ['能说明非负整数左移和乘以 2 的关系', '能把 1 << k 解释成第 k 位掩码', '能写出 x & ~(1 << k) 清除某位并说明含义'],
  },
};

const nextReasonByLesson = {
  1: '进制按权展开打稳后，下一课进入补码，理解计算机如何在固定宽度里保存负数。',
  2: '补码把负数变成位模式，下一课继续把整数看成一排开关，学习 &、|、^ 的按位操作。',
  3: '&、|、^ 的逐位规则稳定后，下一课加入移位和 1 << k，形成完整的位操作模板。',
  4: '位运算训练的是按位拆解和掩码操作，下一课进入数组，把“按位置处理”迁移到一组数据上。',
};

const previousReasonByLesson = {
  1: '三级默认已经完成二级的循环、数组和模拟训练；卡住时先回 L2-16 做总复盘。',
  2: '补码建立在二进制按权展开和固定位数上，先确认 L3-1 的进制转换不会摇晃。',
  3: '位运算需要先理解补码和位模式，否则看到负数或高位时容易误读。',
  4: '移位和掩码直接依赖 &、|、^ 的逐位规则，先保证 L3-3 能手算 4 位表达式。',
};

const practiceByLesson = {
  1: [{ label: 'GESP 三级真题：进制与按权展开', path: '/question-bank/3/2024-03-l3' }],
  2: [{ label: 'GESP 三级真题：补码与整数范围', path: '/question-bank/3/2024-06-l3' }],
  3: [{ label: 'GESP 三级真题：基础位运算表达式', path: '/question-bank/3/2024-09-l3' }],
  4: [{ label: 'GESP 三级真题：移位与掩码模板', path: '/question-bank/3/2024-12-l3' }],
};

const reviewTasksByLesson = {
  1: ['把十进制 58 转成二进制、八进制、十六进制。', '写出 (110101)_2 的按权展开过程。'],
  2: ['写出 -5 的 8 位补码完整四步。', '解释为什么 8 位有符号整数最大值是 127。'],
  3: ['手算 12 & 10、12 | 10、12 ^ 10。', '解释 x & 1 为什么可以判断奇偶。'],
  4: ['写出检查、设置、清除、翻转第 k 位的模板。', '手算 7 << 2 和 29 >> 3 的二进制变化。'],
};

export function getCppL3LessonSupport(lessonId) {
  const lesson = cppL3Lessons.find((item) => item.id === lessonId);
  const previousLesson = cppL3Lessons.find((item) => item.id === lessonId - 1);
  const nextLesson = cppL3Lessons.find((item) => item.id === lessonId + 1);

  if (!lesson) return null;

  return {
    lesson,
    quality: qualityByLesson[lessonId],
    previous: previousLesson
      ? {
          title: previousLesson.title,
          path: `/lesson/3/${previousLesson.id}`,
          reason: previousReasonByLesson[lessonId],
        }
      : {
          title: '第 16 课：全真模拟考试',
          path: '/lesson/2/16',
          reason: previousReasonByLesson[lessonId],
        },
    next: nextLesson
      ? {
          title: nextLesson.title,
          path: `/lesson/3/${nextLesson.id}`,
          reason: nextReasonByLesson[lessonId],
        }
      : {
          title: '第 5 课：一维数组的奥秘',
          path: '/lesson/3/5',
          reason: nextReasonByLesson[lessonId],
        },
    practiceLinks: practiceByLesson[lessonId] || [],
    reviewTasks: reviewTasksByLesson[lessonId] || [],
  };
}
