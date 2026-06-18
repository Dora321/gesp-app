const pythonFoundationLessons = [
  { id: 'f1', title: 'F1：Python 入门', path: '/python/f1' },
  { id: 'f2', title: 'F2：控制流程', path: '/python/f2' },
  { id: 'f3', title: 'F3：列表与字典', path: '/python/f3' },
  { id: 'f4', title: 'F4：函数与模块', path: '/python/f4' },
  { id: 'f5', title: 'F5：绘图魔法', path: '/python/f5' },
  { id: 'f6', title: 'F6：随机世界', path: '/python/f6' },
  { id: 'f7', title: 'F7：集合宝藏', path: '/python/f7' },
];

const lessonDetails = {
  f1: {
    accent: 'indigo',
    focus: '从零建立“代码能和人交互”的第一印象。',
    bridge: '变量、输入输出和基础类型是后续条件判断、循环和数据结构的共同地基。',
    checkpoint: '能独立写出一个会提问、保存答案、计算并输出结果的小程序。',
    reviewTasks: ['把 print、input、变量各写 1 个最小例子。', '解释一次报错来自括号、引号、拼写还是类型问题。'],
  },
  f2: {
    accent: 'blue',
    focus: '把程序从“一步一步执行”升级成“会判断、会重复”。',
    bridge: '条件和循环会直接支撑列表遍历、字典查询和后续小游戏规则。',
    checkpoint: '能用 if / elif / else 和 for / while 写出一个有规则的小程序。',
    reviewTasks: ['画出一个分支流程图，并标出每个条件的真假。', '预测一个循环执行次数，再运行代码验证。'],
  },
  f3: {
    accent: 'teal',
    focus: '学会用列表、字典和字符串组织真实数据。',
    bridge: '数据结构稳定后，函数才能把这些处理步骤封装成可复用工具。',
    checkpoint: '能判断一个任务应该用 list、dict 还是 string，并写出增删查改代码。',
    reviewTasks: ['用 list 保存 5 个名字，并完成新增、删除、查找。', '用 dict 描述一个学生信息卡，再读出其中 2 个字段。'],
  },
  f4: {
    accent: 'indigo',
    focus: '把重复逻辑封装成函数，并开始借用模块能力。',
    bridge: '函数和模块是绘图、随机游戏、算法项目里复用代码的核心方式。',
    checkpoint: '能定义有参数和返回值的函数，并说明什么时候该 return。',
    reviewTasks: ['把一段重复代码改造成函数调用。', '解释形参、实参、返回值三者的关系。'],
  },
  f5: {
    accent: 'teal',
    focus: '用 turtle 把循环、角度和坐标变成可见作品。',
    bridge: '绘图作品训练“状态变化”的直觉，后面做随机游戏和项目会更容易调试。',
    checkpoint: '能用循环画出规则图形，并调整颜色、画笔和角度。',
    reviewTasks: ['用循环画一个正多边形，并说明每次转多少度。', '改 3 个参数，让同一段代码生成不同图案。'],
  },
  f6: {
    accent: 'indigo',
    focus: '理解随机模块，让程序拥有不确定性和游戏感。',
    bridge: '随机选择会连接到项目课中的游戏生成、模拟实验和测试数据设计。',
    checkpoint: '能用 randint、choice、shuffle 做一个带随机规则的小程序。',
    reviewTasks: ['写一个猜数字或抽签程序，并记录随机范围。', '解释 randint 的边界是否包含起点和终点。'],
  },
  f7: {
    accent: 'teal',
    focus: '用集合处理唯一性、成员判断和两组数据关系。',
    bridge: '集合课完成后，基础语法线闭环，可以进入算法思维和项目综合训练。',
    checkpoint: '能用 set 去重，并完成交集、并集、差集分析。',
    reviewTasks: ['把一个有重复元素的列表转换成 set，并解释变化。', '用两组兴趣标签求共同兴趣和各自独有兴趣。'],
  },
};

const nextReason = {
  f1: '有了输入、输出、变量和类型，下一课开始让程序根据条件做选择、按规则重复。',
  f2: '控制流程会让程序动起来；下一课用列表、字典和字符串承载更多真实数据。',
  f3: '数据结构能装住信息；下一课把处理信息的步骤封装成函数和模块。',
  f4: '函数让代码可以复用；下一课用 turtle 把循环和函数变成可见作品。',
  f5: '绘图训练了状态变化和参数调整；下一课加入随机性，做更像游戏的程序。',
  f6: '随机规则已经能做小游戏；下一课用集合处理去重和两组数据关系。',
  f7: '基础语法线已经闭环，接下来进入算法思维入门，把语法组合成解题策略。',
};

const previousReason = {
  f2: '如果变量、输入输出或类型还不稳，先回到 F1 补地基。',
  f3: '列表和字典会大量依赖条件与循环，F2 是直接前置。',
  f4: '函数通常封装数据处理步骤，F3 的 list、dict、string 是主要原料。',
  f5: '绘图代码会反复用到函数、参数和模块导入，F4 是关键前置。',
  f6: '随机程序需要条件、循环和函数协作，前面几课会一起用上。',
  f7: '集合会和列表、循环、成员判断一起出现，F3 与 F6 都是重要前置。',
};

export function getPythonFoundationSupport(lessonId) {
  const index = pythonFoundationLessons.findIndex((item) => item.id === lessonId);
  const current = pythonFoundationLessons[index];
  const previous = pythonFoundationLessons[index - 1];
  const next = pythonFoundationLessons[index + 1];
  const details = lessonDetails[lessonId];

  if (!current || !details) return null;

  return {
    current,
    accent: details.accent,
    focus: details.focus,
    bridge: details.bridge,
    checkpoint: details.checkpoint,
    previous: previous
      ? {
          title: previous.title,
          path: previous.path,
          reason: previousReason[lessonId],
        }
      : null,
    next: next
      ? {
          title: next.title,
          path: next.path,
          reason: nextReason[lessonId],
        }
      : {
          title: 'A1：算法思维入门',
          path: '/python/a1',
          reason: nextReason[lessonId],
        },
    practiceLinks: [
      { label: '回到首页查看 Python 学习路径', path: '/' },
      { label: '进入 Python 项目线', path: '/python/a1' },
    ],
    reviewTasks: details.reviewTasks,
  };
}
