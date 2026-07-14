export { pythonFoundationLessons } from './pythonCourseCatalog.js';
import { pythonFoundationLessons } from './pythonCourseCatalog.js';
import { createSequentialCourseSupport, defineCourse } from './courseSchema.js';

const lessonDetails = {
  f1: {
    accent: 'indigo',
    focus: '从零建立“代码能和人交互”的第一印象。',
    bridge: '变量、输入输出和基础类型是后续条件判断、循环和数据结构的共同地基。',
    checkpoint: '能独立写出一个会提问、保存答案、计算并输出结果的小程序。',
    goals: ['会用 print 输出文字和数字。', '会用 input 接收用户输入。', '能用变量保存并组合信息。'],
    deliverables: ['完成一个自我介绍程序。', '写出一个简单计算器片段。', '整理 3 个常见语法错误。'],
    checks: ['能解释字符串为什么要加引号。', '能区分变量名和值。', '能根据报错定位括号、引号或拼写问题。'],
    reviewTasks: ['把 print、input、变量各写 1 个最小例子。', '解释一次报错来自括号、引号、拼写还是类型问题。'],
  },
  f2: {
    accent: 'blue',
    focus: '把程序从“一步一步执行”升级成“会判断、会重复”。',
    bridge: '条件和循环会直接支撑列表遍历、字典查询和后续小游戏规则。',
    checkpoint: '能用 if / elif / else 和 for / while 写出一个有规则的小程序。',
    goals: ['会用 if / elif / else 做分支判断。', '会用 for / while 重复执行任务。', '能预测循环执行次数。'],
    deliverables: ['完成一个分支流程图。', '写出一个计数或猜数小程序。', '完成一张循环变量跟踪表。'],
    checks: ['能说出条件为真/假分别执行哪段代码。', '能解释 range 的起点、终点和步长。', '能避免 while 条件不变化导致死循环。'],
    reviewTasks: ['画出一个分支流程图，并标出每个条件的真假。', '预测一个循环执行次数，再运行代码验证。'],
  },
  f3: {
    accent: 'teal',
    focus: '学会用列表、字典和字符串组织真实数据。',
    bridge: '数据结构稳定后，函数才能把这些处理步骤封装成可复用工具。',
    checkpoint: '能判断一个任务应该用 list、dict 还是 string，并写出增删查改代码。',
    goals: ['会用 list 保存一组数据。', '会用 dict 描述键值信息。', '会遍历字符串并处理字符。'],
    deliverables: ['完成一个名单管理小程序。', '完成一张学生信息字典卡。', '写出 2 个字符串处理例子。'],
    checks: ['能说明列表下标从 0 开始。', '能选择 list 或 dict 解决不同任务。', '能处理查找不到键或下标越界的情况。'],
    reviewTasks: ['用 list 保存 5 个名字，并完成新增、删除、查找。', '用 dict 描述一个学生信息卡，再读出其中 2 个字段。'],
  },
  f4: {
    accent: 'indigo',
    focus: '把重复逻辑封装成函数，并开始借用模块能力。',
    bridge: '函数和模块是绘图、随机游戏、算法项目里复用代码的核心方式。',
    checkpoint: '能定义有参数和返回值的函数，并说明什么时候该 return。',
    goals: ['会定义并调用函数。', '能设计参数和返回值。', '会导入并使用常见模块。'],
    deliverables: ['把重复代码封装成函数。', '完成一个带返回值的小工具。', '整理一次模块导入实验记录。'],
    checks: ['能区分 print 和 return。', '能说明形参和实参的关系。', '能判断哪些变量只在函数内部有效。'],
    reviewTasks: ['把一段重复代码改造成函数调用。', '解释形参、实参、返回值三者的关系。'],
  },
  f5: {
    accent: 'teal',
    focus: '用 turtle 把循环、角度和坐标变成可见作品。',
    bridge: '绘图作品训练“状态变化”的直觉，后面做随机游戏和项目会更容易调试。',
    checkpoint: '能用循环画出规则图形，并调整颜色、画笔和角度。',
    goals: ['会用 turtle 控制画笔移动和转向。', '能用循环绘制重复图形。', '能用参数调整作品效果。'],
    deliverables: ['完成一个正多边形绘图程序。', '提交一个参数可调的图案作品。', '记录颜色、角度、步长的变化效果。'],
    checks: ['能解释角度和边数的关系。', '能把重复绘图步骤放进循环。', '能定位图形跑偏来自角度、坐标还是循环次数。'],
    reviewTasks: ['用循环画一个正多边形，并说明每次转多少度。', '改 3 个参数，让同一段代码生成不同图案。'],
  },
  f6: {
    accent: 'indigo',
    focus: '理解随机模块，让程序拥有不确定性和游戏感。',
    bridge: '随机选择会连接到项目课中的游戏生成、模拟实验和测试数据设计。',
    checkpoint: '能用 randint、choice、shuffle 做一个带随机规则的小程序。',
    goals: ['会使用 random 生成随机数。', '能用 choice / shuffle 处理随机选择。', '能设计公平的小游戏规则。'],
    deliverables: ['完成一个猜数字或抽签程序。', '写出一组随机测试数据。', '记录随机边界和测试结果。'],
    checks: ['能说清 randint 是否包含两端。', '能解释随机结果为什么每次不同。', '能给随机程序设计可验证的测试办法。'],
    reviewTasks: ['写一个猜数字或抽签程序，并记录随机范围。', '解释 randint 的边界是否包含起点和终点。'],
  },
  f7: {
    accent: 'teal',
    focus: '用集合处理唯一性、成员判断和两组数据关系。',
    bridge: '集合课完成后，基础语法线闭环，可以进入算法思维和项目综合训练。',
    checkpoint: '能用 set 去重，并完成交集、并集、差集分析。',
    goals: ['会用 set 完成去重。', '能判断元素是否属于集合。', '会用交集、并集、差集比较两组数据。'],
    deliverables: ['完成一个列表去重实验。', '做一张兴趣标签集合分析表。', '写出集合运算的小工具。'],
    checks: ['能说明 set 为什么不保留重复项。', '能区分交集、并集和差集。', '能判断集合是否适合当前任务。'],
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
  f7: '基础语法线已经闭环，先用一节桥梁课把学过的本领拼成一个完整小游戏，再进入算法思维。',
};

const previousReason = {
  f2: '如果变量、输入输出或类型还不稳，先回到 F1 补地基。',
  f3: '列表和字典会大量依赖条件与循环，F2 是直接前置。',
  f4: '函数通常封装数据处理步骤，F3 的 list、dict、string 是主要原料。',
  f5: '绘图代码会反复用到函数、参数和模块导入，F4 是关键前置。',
  f6: '随机程序需要条件、循环和函数协作，前面几课会一起用上。',
  f7: '集合会和列表、循环、成员判断一起出现，F3 与 F6 都是重要前置。',
};

const practiceLinksByLesson = {
  f1: [
    { label: '复盘 F1：输入、输出与变量', path: '/python/f1' },
    { label: '预习 F2：让程序会判断和重复', path: '/python/f2' },
  ],
  f2: [
    { label: '复盘 F1：变量和类型地基', path: '/python/f1' },
    { label: '预习 F3：列表、字典和字符串', path: '/python/f3' },
  ],
  f3: [
    { label: '复盘 F2：条件和循环', path: '/python/f2' },
    { label: '预习 F4：函数与模块封装', path: '/python/f4' },
  ],
  f4: [
    { label: '复盘 F3：数据结构选择', path: '/python/f3' },
    { label: '预习 F5：用 turtle 做可见作品', path: '/python/f5' },
  ],
  f5: [
    { label: '复盘 F4：函数、参数和模块', path: '/python/f4' },
    { label: '预习 F6：随机规则小游戏', path: '/python/f6' },
  ],
  f6: [
    { label: '复盘 F2：循环和条件判断', path: '/python/f2' },
    { label: '预习 F7：集合去重和关系分析', path: '/python/f7' },
  ],
  f7: [
    { label: '复盘 F3：列表、字典和字符串', path: '/python/f3' },
    { label: '进入桥梁课：猜数字大冒险', path: '/python/bridge' },
  ],
};

export const pythonFoundationCourse = defineCourse({
  id: 'python-foundation',
  title: 'Python 基础课程',
  language: 'python',
  kind: 'foundation',
  items: pythonFoundationLessons.filter(item => item.id !== 'bridge'),
  detailsById: lessonDetails,
});

const foundationPracticeLinks = Object.fromEntries(
  pythonFoundationCourse.items.map(item => [
    item.id,
    [...(practiceLinksByLesson[item.id] || []), { label: '查看 Python 学习路径', path: '/' }],
  ]),
);

const buildPythonFoundationSupport = createSequentialCourseSupport(pythonFoundationCourse, {
  previousReasons: previousReason,
  nextReasons: nextReason,
  practiceLinksById: foundationPracticeLinks,
  exit: ({ current }) => ({ title: '桥梁：猜数字大冒险', path: '/python/bridge', reason: nextReason[current.id] }),
  getExtra: current => ({
    accent: current.details.accent,
    focus: current.details.focus,
    bridge: current.details.bridge,
    checkpoint: current.details.checkpoint,
  }),
});

export function getPythonFoundationSupport(lessonId) {
  return buildPythonFoundationSupport(lessonId);
}
