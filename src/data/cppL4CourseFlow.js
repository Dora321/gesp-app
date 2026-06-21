const cppL4Lessons = [
  { id: 1, title: '第 1 课：代码的积木：自定义函数' },
  { id: 2, title: '第 2 课：数据的替身：传值与传参' },
  { id: 3, title: '第 3 课：特殊的参数：数组进函数' },
  { id: 4, title: '第 4 课：递归初探 (函数调用自己)' },
];

const qualityByLesson = {
  1: {
    accent: 'indigo',
    goals: ['能解释函数为什么能降低复杂度', '能写出函数定义和调用', '能理解参数、返回值和 main 的关系'],
    deliverables: ['写出 int maxOf(int a, int b) 并在 main 中调用', '整理返回类型、函数名、参数列表、函数体四要素卡', '把一段重复代码抽成函数，让 main 只保留流程'],
    checks: ['能指出函数定义、调用和声明分别在哪里', '能区分 void 与 int 返回类型并写出对应 return', '能说明形参和实参是两个不同变量'],
  },
  2: {
    accent: 'indigo',
    goals: ['能区分传值和引用传参', '能写出引用交换两个变量', '能选择返回值或引用传参'],
    deliverables: ['同时写传值版和引用版 swap 并对比结果', '整理值传和引用传选择卡', '写出 divmod 函数，用引用一次带回商和余数'],
    checks: ['能说明传值时函数内改动不影响实参', '能写出 void f(int &x) 并解释参数表里 & 的含义', '能判断一道题该用值传还是引用传并说明理由'],
  },
  3: {
    accent: 'indigo',
    goals: ['能写数组作为函数参数的语法', '能解释为什么长度 n 要单独传入', '能封装求和、最大值和修改数组的函数'],
    deliverables: ['写出 int sumArray(int a[], int n) 并在 main 中调用', '整理数组传参其实传首地址的说明卡', '写一个会修改原数组的函数并验证 main 中数组变化'],
    checks: ['能说明数组名作参数时传的是首地址而不是整份拷贝', '能解释函数内拿不到数组长度所以必须传 n', '能预测函数内修改数组元素后 main 中数组会同步变化'],
  },
  4: {
    accent: 'indigo',
    goals: ['能解释递归函数如何调用自己', '能写出阶乘递归', '能指出递归边界和递归关系'],
    deliverables: ['写出递归版 factorial(n) 并画出 n=4 的调用展开图', '整理递归终止条件和递归式两要素卡', '写递归求斐波那契第 n 项并标注重复计算问题'],
    checks: ['能先写终止条件再写递归调用', '能说明缺少终止条件会无限递归或栈溢出', '能手画递去和归来的逐层调用返回过程'],
  },
};

const nextReasonByLesson = {
  1: '函数会写、会调之后，下一课追问参数到底传进去了什么，进入传值与引用。',
  2: '单个变量的引用打通后，下一课把传地址推广到一整组数据，学习数组进函数。',
  3: '函数会处理一组数据后，下一课让函数调用自己，把大问题拆成同型小问题。',
  4: '递归讲清函数调用自己后，下一课进入指针入门，揭开引用与数组传参背后的地址本质。',
};

const previousReasonByLesson = {
  1: '四级默认三级的数组、字符串、枚举和模拟已过关；函数卡住时先回 L3-16 用整卷复盘确认地基。',
  2: '引用传参的前提是理解形参和实参，先确认第 1 课函数定义与调用不会摇晃。',
  3: '数组传参的会被修改是引用思路的延伸，先确认第 2 课能分清值传和引用传。',
  4: '递归靠函数调用、参数和返回值驱动，先确认第 3 课的函数传参与返回已经稳定。',
};

const practiceByLesson = {
  1: [{ label: 'GESP 四级真题：函数定义与调用', path: '/question-bank/4/2023-06-l4' }],
  2: [{ label: 'GESP 四级真题：参数传递与引用', path: '/question-bank/4/2024-03-l4' }],
  3: [{ label: 'GESP 四级真题：数组作为函数参数', path: '/question-bank/4/2024-09-l4' }],
  4: [{ label: 'GESP 四级真题：递归与函数调用', path: '/question-bank/4/2024-12-l4' }],
};

const reviewTasksByLesson = {
  1: ['写 bool isPrime(int n)，并在 main 里测试 5 个数。', '把求和与求平均拆成两个函数，main 只负责输入输出。'],
  2: ['写 swap(int&, int&) 并验证交换成功。', '用引用参数让一个函数同时返回一组数的最大值与最小值。'],
  3: ['写 int maxInArray(int a[], int n) 返回最大值。', '写 void reverseArray(int a[], int n) 原地反转，并在 main 输出验证。'],
  4: ['写递归 sum1ToN(n) 求 1 到 n 之和。', '写递归 power(a, b) 求 a 的 b 次方。'],
};

export function getCppL4LessonSupport(lessonId) {
  const lesson = cppL4Lessons.find((item) => item.id === lessonId);
  const previousLesson = cppL4Lessons.find((item) => item.id === lessonId - 1);
  const nextLesson = cppL4Lessons.find((item) => item.id === lessonId + 1);

  if (!lesson) return null;

  return {
    lesson,
    quality: qualityByLesson[lessonId],
    previous: previousLesson
      ? {
          title: previousLesson.title,
          path: `/lesson/4/${previousLesson.id}`,
          reason: previousReasonByLesson[lessonId],
        }
      : {
          title: '第 16 课：全真模拟与避坑',
          path: '/lesson/3/16',
          reason: previousReasonByLesson[lessonId],
        },
    next: nextLesson
      ? {
          title: nextLesson.title,
          path: `/lesson/4/${nextLesson.id}`,
          reason: nextReasonByLesson[lessonId],
        }
      : {
          title: '第 5 课：神秘的门牌号：指针入门',
          path: '/lesson/4/5',
          reason: nextReasonByLesson[lessonId],
        },
    practiceLinks: practiceByLesson[lessonId] || [],
    reviewTasks: reviewTasksByLesson[lessonId] || [],
  };
}
