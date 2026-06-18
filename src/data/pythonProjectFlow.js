const pythonProjects = [
  { id: 'a1', title: 'A1：算法思维入门', path: '/python/a1' },
  { id: 'a2', title: 'A2：2048 游戏项目', path: '/python/a2' },
  { id: 'ai', title: 'A3：AI 初探', path: '/python/ai' },
  { id: 'crawler', title: 'A4：网络爬虫项目', path: '/python/crawler' },
  { id: 'binary-search', title: 'A5：二分搜索项目', path: '/python/binary-search' },
  { id: 'encryption', title: 'A6：加密解密项目', path: '/python/encryption' },
  { id: 'sorting', title: 'A7：排序算法项目', path: '/python/sorting' },
  { id: 'file-ops', title: 'A8：文件操作项目', path: '/python/file-ops' },
  { id: 'morse', title: 'A9：摩斯电码项目', path: '/python/morse' },
];

const projectDetails = {
  a1: {
    accent: 'indigo',
    brief: {
      audience: '学完 Python 基础语法，准备进入算法和项目的学生',
      outcome: '能用枚举、贪心、递归描述解决问题的基本策略',
      artifact: '一份算法策略对比表和 3 个最小代码实验',
      duration: '2-3 课时',
    },
    goals: ['理解枚举、贪心、递归三类基础算法思维', '能用生活场景解释算法策略', '能判断一个小问题适合哪种策略'],
    deliverables: ['完成算法策略对比表', '写出至少 2 个最小 Python 代码片段', '完成结业测验并记录错因'],
    checks: ['能说清“试所有可能”和“每步选最好”的区别', '能指出递归的终止条件', '能把题目拆成输入、过程、输出'],
    practice: ['用枚举找出 1-100 中满足条件的数字。', '把一个生活问题分别用贪心和枚举描述。'],
  },
  a2: {
    accent: 'teal',
    brief: {
      audience: '已经掌握列表、循环和函数的学生',
      outcome: '做出一个可玩的 2048 核心逻辑原型',
      artifact: '2048 棋盘、移动合并逻辑和胜负判断',
      duration: '3-4 课时',
    },
    goals: ['理解二维列表表示棋盘的方法', '掌握移动、合并、随机生成方块的拆解方式', '能把游戏规则转成函数'],
    deliverables: ['画出 2048 数据结构图', '实现一组移动合并函数', '完成一次游戏逻辑测试记录'],
    checks: ['能用 grid[row][col] 定位格子', '能解释一次左移的扫描顺序', '能用样例验证合并规则没有重复合并'],
    practice: ['给 4x4 棋盘设计 3 组测试用例。', '把“左移”拆成压缩、合并、再压缩三个步骤。'],
  },
  ai: {
    accent: 'indigo',
    brief: {
      audience: '想了解 AI 但还没系统学机器学习的学生',
      outcome: '理解 KNN、神经网络、线性回归的直观含义',
      artifact: '一个可解释的小型 AI 概念演示',
      duration: '2-3 课时',
    },
    goals: ['用可视化理解分类、回归和神经网络', '能解释训练数据和预测结果的关系', '建立 AI 项目的边界意识'],
    deliverables: ['完成 KNN 分类实验', '记录一次线性回归拟合过程', '写下一个 AI 模型适用和不适用的例子'],
    checks: ['能说清模型不是魔法，而是根据数据找规律', '能解释最近邻分类的判断依据', '能指出数据偏差会影响结果'],
    practice: ['设计一组猫狗分类的二维特征。', '用表格描述输入特征、模型判断和输出结果。'],
  },
  crawler: {
    accent: 'teal',
    brief: {
      audience: '会函数和文件操作，想做自动化工具的学生',
      outcome: '理解 HTTP 请求、网页结构和基础爬取流程',
      artifact: '一个遵守规则的网页信息抓取小工具',
      duration: '3-4 课时',
    },
    goals: ['理解请求、响应、状态码和请求头', '能用 Python 获取网页并解析目标信息', '建立爬虫伦理和 robots 规则意识'],
    deliverables: ['完成一个网页请求实验', '解析并保存一段公开网页数据', '写出爬虫使用边界说明'],
    checks: ['能解释 200、404、403 的含义', '能说明为什么要设置 User-Agent', '能区分公开数据练习和不应抓取的数据'],
    practice: ['抓取一个公开页面标题并保存到文本文件。', '给项目写 3 条爬虫安全和合规规则。'],
  },
  'binary-search': {
    accent: 'indigo',
    brief: {
      audience: '理解列表和循环，准备学习高效查找的学生',
      outcome: '掌握二分搜索的边界更新和效率优势',
      artifact: '一个可视化查找过程和 Python 二分函数',
      duration: '2 课时',
    },
    goals: ['理解有序数据是二分搜索的前提', '掌握 left、right、mid 的更新规则', '能避免死循环和漏查边界'],
    deliverables: ['完成一次猜数字二分过程表', '写出二分搜索函数', '用 3 组样例验证边界'],
    checks: ['能说明为什么每次排除一半', '能解释 mid 命中、偏大、偏小时怎么更新', '能处理目标不存在的情况'],
    practice: ['用二分法猜 1-100 的数字并记录步骤。', '测试目标在开头、结尾、不存在三种情况。'],
  },
  encryption: {
    accent: 'teal',
    brief: {
      audience: '对密码、字符和字符串处理感兴趣的学生',
      outcome: '做出凯撒密码类加密和解密工具',
      artifact: '一个支持字符位移和解密验证的文本工具',
      duration: '2-3 课时',
    },
    goals: ['理解字符编码和 ord / chr 的关系', '掌握字符串遍历和字符转换', '能区分加密、解密和暴力尝试'],
    deliverables: ['完成凯撒密码加密函数', '完成对应解密函数', '记录一个加密文本的破解过程'],
    checks: ['能解释字符为什么能转换成数字', '能处理字母边界回绕', '能说明简单位移密码并不安全'],
    practice: ['把自己的英文昵称加密再解密。', '尝试 3 个不同位移量并比较输出。'],
  },
  sorting: {
    accent: 'blue',
    brief: {
      audience: '已经学过列表、循环和比较的学生',
      outcome: '理解常见排序算法的过程和差异',
      artifact: '排序算法可视化和一个 Python 排序函数集合',
      duration: '4-5 课时',
    },
    goals: ['理解冒泡、选择、插入等基础排序过程', '能比较不同排序方法的步骤数量', '能用可视化检查算法状态变化'],
    deliverables: ['完成 3 种排序过程记录', '写出至少 2 个排序函数', '整理排序算法适用场景'],
    checks: ['能说清每一轮排序确定了什么', '能处理重复数字和空列表', '能用样例验证排序前后元素不丢失'],
    practice: ['手动排序一组 6 个数字并记录每轮变化。', '比较冒泡排序和选择排序的交换次数。'],
  },
  'file-ops': {
    accent: 'indigo',
    brief: {
      audience: '想把程序结果保存下来、做小工具的学生',
      outcome: '掌握文本文件读取、写入和 with 语句',
      artifact: '一个读写文件并统计内容的小工具',
      duration: '2 课时',
    },
    goals: ['理解文件路径、打开模式和编码', '掌握 with open 的安全读写方式', '能把程序数据保存成文本文件'],
    deliverables: ['完成一次写文件和读文件实验', '实现一个简单文本统计工具', '记录常见文件错误和处理方法'],
    checks: ['能区分 r、w、a 三种模式', '能说明 with 为什么能自动关闭文件', '能处理文件不存在或编码错误'],
    practice: ['把课堂输出保存到 result.txt。', '读取一个文本文件并统计行数和字符数。'],
  },
  morse: {
    accent: 'teal',
    brief: {
      audience: '学过字典、字符串和函数的学生',
      outcome: '做出文本和摩斯电码互相转换的小工具',
      artifact: '一个摩斯编码字典、转换函数和交互演示',
      duration: '2-3 课时',
    },
    goals: ['理解字典映射关系', '掌握字符串拆分、拼接和大小写处理', '能把编码规则封装成函数'],
    deliverables: ['完成摩斯码字典', '实现文本转摩斯和摩斯转文本', '设计一个可测试的密文样例'],
    checks: ['能处理未知字符', '能说明字母之间和单词之间如何分隔', '能用样例验证双向转换'],
    practice: ['把一句英文短句转换成摩斯码。', '给同学一段摩斯码并让对方解码。'],
  },
};

const nextReason = {
  a1: '算法思维打底后，用 2048 项目训练列表、状态和规则拆解。',
  a2: '游戏状态项目之后，继续看 AI 概念，理解数据如何影响判断。',
  ai: 'AI 初探之后，进入网络爬虫，学习数据从哪里来。',
  crawler: '会获取数据后，用二分搜索训练更高效的查找策略。',
  'binary-search': '查找之后进入加密项目，继续练字符、字符串和映射。',
  encryption: '字符映射稳定后，进入排序项目，观察列表状态如何一步步变化。',
  sorting: '排序项目之后，学习文件操作，把程序结果保存下来。',
  'file-ops': '文件读写之后，用摩斯项目把字典、字符串和函数组合成作品。',
  morse: 'Python 项目线完成后，可以回到课程中心选择真题、硬件或更完整的作品迭代。',
};

const previousReason = {
  a2: '如果算法策略还不清楚，先回看 A1 的枚举、贪心和递归。',
  ai: '2048 项目训练了状态和规则拆解，是理解模型输入输出的好前置。',
  crawler: 'AI 项目需要数据意识，爬虫课继续回答数据来源和边界。',
  'binary-search': '爬虫项目之后常会面对大量数据，二分搜索能提升查找效率。',
  encryption: '二分搜索训练边界控制，加密项目继续训练字符和函数封装。',
  sorting: '加密项目中的映射与遍历，是排序项目处理列表状态的前置练习。',
  'file-ops': '排序项目输出的是内存结果，文件操作让结果可以保存和复用。',
  morse: '文件和字符串处理稳定后，摩斯项目更容易做成可交付小工具。',
};

export function getPythonProjectSupport(projectId) {
  const index = pythonProjects.findIndex((item) => item.id === projectId);
  const current = pythonProjects[index];
  const previous = pythonProjects[index - 1];
  const next = pythonProjects[index + 1];
  const details = projectDetails[projectId];

  if (!current || !details) return null;

  return {
    current,
    brief: details.brief,
    quality: {
      accent: details.accent,
      goals: details.goals,
      deliverables: details.deliverables,
      checks: details.checks,
    },
    previous: previous
      ? {
          title: previous.title,
          path: previous.path,
          reason: previousReason[projectId],
        }
      : null,
    next: next
      ? {
          title: next.title,
          path: next.path,
          reason: nextReason[projectId],
        }
      : {
          title: '课程中心',
          path: '/',
          reason: nextReason[projectId],
        },
    practiceLinks: [{ label: '回到 Python 基础线复习前置知识', path: '/python/f1' }],
    reviewTasks: details.practice,
  };
}
