const cppL2Lessons = [
  { id: 1, title: '第 1 课：存储器与网络基础' },
  { id: 2, title: '第 2 课：ASCII 与字符运算' },
  { id: 3, title: '第 3 课：类型转换与整数除法' },
  { id: 4, title: '第 4 课：switch 多路选择' },
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
};

const nextReasonByLesson = {
  1: '存储和网络概念打底后，下一课进入字符编码，理解电脑如何保存字母。',
  2: '字符编码稳定后，继续学习 int、double、char 混合计算时的类型转换规则。',
  3: '类型转换是读代码输出题的核心，下一课用 switch 处理固定选项的多路选择。',
  4: 'switch 打稳后，进入嵌套循环，把流程控制从“一条路”扩展到“行列结构”。',
};

const previousReasonByLesson = {
  2: '如果存储单位和计算机基础名词还不熟，先回看 L2-1 的概念底座。',
  3: 'ASCII 与 char 转 int 是类型转换题的直接前置。',
  4: 'switch 常处理整数或字符选项，先确认类型转换和字符编码不会混。',
};

const practiceByLesson = {
  1: [{ label: '进入 GESP 二级真题库做概念题复盘', path: '/question-bank' }],
  2: [{ label: 'GESP 二级真题：字符编码与 ASCII', path: '/question-bank/2/2024-03-l2' }],
  3: [{ label: 'GESP 二级真题：类型转换与表达式输出', path: '/question-bank/2/2024-06-l2' }],
  4: [{ label: 'GESP 二级真题：分支与多路选择', path: '/question-bank/2/2024-09-l2' }],
};

const reviewTasksByLesson = {
  1: ['用一句话区分 RAM、ROM 和外存。', '把 1GB 换算成 MB，再解释为什么是 1024。'],
  2: ['默写 0、A、a 的 ASCII 编码。', '写一个把小写字母转成大写字母的最小程序。'],
  3: ['手算 7/2、7/2.0、(double)7/2 的输出。', '找出一道表达式题里最先发生的类型转换。'],
  4: ['写一个带 default 的菜单程序。', '故意删掉一个 break，记录输出如何变化。'],
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
          title: '第 5 课：嵌套循环基础',
          path: '/lesson/2/5',
          reason: nextReasonByLesson[lessonId],
        },
    practiceLinks: practiceByLesson[lessonId] || [],
    reviewTasks: reviewTasksByLesson[lessonId] || [],
  };
}
