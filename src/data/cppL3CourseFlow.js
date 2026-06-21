const cppL3Lessons = [
  { id: 1, title: '第 1 课：变身数字魔术师 (进制)' },
  { id: 2, title: '第 2 课：负数的真面目 (补码)' },
  { id: 3, title: '第 3 课：位运算大冒险 (上)' },
  { id: 4, title: '第 4 课：位运算大冒险 (下)' },
  { id: 5, title: '第 5 课：一维数组的奥秘' },
  { id: 6, title: '第 6 课：数组操作实战' },
  { id: 7, title: '第 7 课：字符串魔法 (string)' },
  { id: 8, title: '第 8 课：字符串进阶操作' },
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
  5: {
    accent: 'rose',
    goals: ['能解释数组下标从 0 开始', '能写出遍历数组的标准循环', '能避免 a[n] 这类越界错误'],
    deliverables: ['完成一个成绩录入和按下标查询程序', '整理一张容量、实际长度、合法下标范围表', '写出原样输出、倒序输出、首尾元素查询三个小程序'],
    checks: ['能区分 MAXN 容量和 n 实际长度', '能用 i < n 遍历 a[0] 到 a[n - 1]', '能在访问前判断 i < 0 或 i >= n 的越界风险'],
  },
  6: {
    accent: 'rose',
    goals: ['能用累计变量求和和平均数', '能正确初始化最大值和最小值', '能理解前缀和的区间查询思路'],
    deliverables: ['完成一份数组统计报表程序', '写出求和、最值、条件计数三个归约模板', '用前缀和数组回答至少 2 个区间和查询'],
    checks: ['能解释 sum、cnt、mx、mn 各自保存什么', '能用 a[0] 初始化最值避免负数数据错误', '能写出 s[r] - s[l - 1] 并说明 1-based 前缀和含义'],
  },
  7: {
    accent: 'rose',
    goals: ['能读入和输出 string', '能用 size() 获取长度并遍历字符', '能理解 cin 和 getline 的区别'],
    deliverables: ['完成一个按行读入并输出长度的程序', '写出逐字符输出下标和值的小程序', '整理一张 cin 与 getline 的读入差异表'],
    checks: ['能说明 cin >> s 遇到空白会停止', '能用 i < s.size() 遍历每个字符', '能正确写出 s[s.size() - 1] 获取最后一个字符'],
  },
  8: {
    accent: 'rose',
    goals: ['能统计数字、字母、空格等字符类型', '能用 ASCII 规则进行大小写转换', '能使用 find 和 substr 处理子串'],
    deliverables: ['完成一个字符分类统计程序', '写出大小写转换和关键词查找两个小工具', '用 find 与 substr 完成一次子串定位和截取'],
    checks: ['能用字符范围判断数字、字母和空格', '能在转换大小写前先判断目标字符范围', '能用 string::npos 判断 find 没有找到的情况'],
  },
};

const nextReasonByLesson = {
  1: '进制按权展开打稳后，下一课进入补码，理解计算机如何在固定宽度里保存负数。',
  2: '补码把负数变成位模式，下一课继续把整数看成一排开关，学习 &、|、^ 的按位操作。',
  3: '&、|、^ 的逐位规则稳定后，下一课加入移位和 1 << k，形成完整的位操作模板。',
  4: '位运算训练的是按位拆解和掩码操作，下一课进入数组，把“按位置处理”迁移到一组数据上。',
  5: '数组下标和遍历稳定后，下一课把遍历升级为求和、最值、计数和前缀和等聚合操作。',
  6: '数组统计训练的是一组数字的遍历，下一课把同样的下标和循环迁移到 string 字符序列。',
  7: 'string 的读入、长度和遍历打稳后，下一课进入字符统计、大小写转换、查找和子串。',
  8: '字符串进阶操作会和数组计数合流，下一课进入数组与字符串综合，处理字符频率和去重。',
};

const previousReasonByLesson = {
  1: '三级默认已经完成二级的循环、数组和模拟训练；卡住时先回 L2-16 做总复盘。',
  2: '补码建立在二进制按权展开和固定位数上，先确认 L3-1 的进制转换不会摇晃。',
  3: '位运算需要先理解补码和位模式，否则看到负数或高位时容易误读。',
  4: '移位和掩码直接依赖 &、|、^ 的逐位规则，先保证 L3-3 能手算 4 位表达式。',
  5: '数组题需要循环和下标意识，先确认移位课里的“按位置理解”已经稳定。',
  6: '数组操作实战直接建立在第 5 课的遍历模板上，先保证不会越界。',
  7: 'string 可以看作更好用的字符序列，先复习数组的下标和循环遍历。',
  8: '字符串进阶依赖第 7 课的逐字符遍历模型，读入和边界没稳时先回看上一课。',
};

const practiceByLesson = {
  1: [{ label: 'GESP 三级真题：进制与按权展开', path: '/question-bank/3/2024-03-l3' }],
  2: [{ label: 'GESP 三级真题：补码与整数范围', path: '/question-bank/3/2024-06-l3' }],
  3: [{ label: 'GESP 三级真题：基础位运算表达式', path: '/question-bank/3/2024-09-l3' }],
  4: [{ label: 'GESP 三级真题：移位与掩码模板', path: '/question-bank/3/2024-12-l3' }],
  5: [{ label: 'GESP 三级真题：数组下标与遍历', path: '/question-bank/3/2025-03-l3' }],
  6: [{ label: 'GESP 三级真题：数组统计与前缀和', path: '/question-bank/3/2025-06-l3' }],
  7: [{ label: 'GESP 三级真题：string 读入与遍历', path: '/question-bank/3/2025-09-l3' }],
  8: [{ label: 'GESP 三级真题：字符串统计与子串', path: '/question-bank/3/2025-12-l3' }],
};

const reviewTasksByLesson = {
  1: ['把十进制 58 转成二进制、八进制、十六进制。', '写出 (110101)_2 的按权展开过程。'],
  2: ['写出 -5 的 8 位补码完整四步。', '解释为什么 8 位有符号整数最大值是 127。'],
  3: ['手算 12 & 10、12 | 10、12 ^ 10。', '解释 x & 1 为什么可以判断奇偶。'],
  4: ['写出检查、设置、清除、翻转第 k 位的模板。', '手算 7 << 2 和 29 >> 3 的二进制变化。'],
  5: ['写出长度为 n 的数组合法下标范围。', '读入 n 个整数，分别原样输出和倒序输出。'],
  6: ['读入 n 个整数，输出和、平均数、最大值、最小值。', '用前缀和回答两个区间和查询。'],
  7: ['用 cin 和 getline 分别读入一段文本，记录结果差异。', '逐行输出一个字符串每个字符的下标和值。'],
  8: ['统计字符串中的数字、字母和空格数量。', '把小写字母转大写，并用 find 查找关键词位置。'],
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
          title: '第 9 课：数组与字符串综合',
          path: '/lesson/3/9',
          reason: nextReasonByLesson[lessonId],
        },
    practiceLinks: practiceByLesson[lessonId] || [],
    reviewTasks: reviewTasksByLesson[lessonId] || [],
  };
}
