import { getCppLesson } from './cppLessonIndex.js';

export const placementQuestions = [
  {
    id: 'io', level: 1, topic: '顺序执行与输入输出',
    prompt: '输入按顺序给出 7 和 3。下面的代码会输出什么？',
    code: 'int a, b;\nstd::cin >> a >> b;\na = a - b;\nstd::cout << a << " " << b;',
    options: ['7 3', '4 3', '4 7', '3 4'], answer: 1,
    explanation: '先读入 a = 7、b = 3，再把 7 − 3 的结果存回 a。b 不变，按 a、b 的顺序输出 4 3。',
    prerequisites: [6, 5],
  },
  {
    id: 'branch-loop', level: 1, topic: '分支与循环',
    prompt: '循环结束后，sum 等于多少？',
    code: 'int sum = 0;\nfor (int i = 1; i <= 5; ++i) {\n    if (i % 2 == 0) sum += i;\n}',
    options: ['2', '9', '15', '6'], answer: 3,
    explanation: '循环检查 1 到 5。只有 2 和 4 除以 2 的余数是 0，因此 sum = 2 + 4 = 6。',
    prerequisites: [8, 10],
  },
  {
    id: 'nested-digits', level: 2, topic: '嵌套循环与数位',
    prompt: '这段代码输出几个加号？',
    code: 'for (int n = 21; n <= 23; ++n) {\n    for (int j = 0; j < n % 10; ++j) {\n        std::cout << "+";\n    }\n}',
    options: ['6', '3', '9', '12'], answer: 0,
    explanation: 'n % 10 取个位。内层循环分别执行 1、2、3 次，一共输出 6 个加号。',
    prerequisites: [5, 10],
  },
  {
    id: 'prime', level: 2, topic: '质数边界',
    prompt: '判断 1 ≤ n ≤ 100 的 n 是否为质数。先排除 n < 2，再从 d = 2 逐个试除，整除就判定为合数。哪条试除规则正确？',
    options: ['只检查 d = 2', '仅检查 d * d < n 的 d', '检查所有 d * d <= n 的 d', '检查所有 d <= n 的 d'], answer: 2,
    explanation: '合数至少有一个大于 1 且不超过平方根的因数。等号必须检查，例如 49 的因数 7。把 n 自己也纳入试除则会误判质数。',
    prerequisites: [9, 11],
  },
  {
    id: 'sequence', level: 3, topic: '数组与字符串下标',
    prompt: '下面两次下标访问都从 0 开始。代码会输出哪个字符？',
    code: 'int a[] = {2, 0, 1};\nstd::string s = "ABC";\nstd::cout << s[a[0]];',
    options: ['A', 'B', '无法确定', 'C'], answer: 3,
    explanation: 'a[0] 是 2，所以访问 s[2]。字符串从 0 开始编号，s[2] 是 C。',
    prerequisites: [5, 7],
  },
  {
    id: 'bitwise', level: 3, topic: '位运算',
    prompt: 'C++ 表达式 (6 & 3) 的结果是多少？',
    options: ['1', '2', '5', '7'], answer: 1,
    explanation: '6 的二进制是 110，3 是 011。按位与只保留双方都是 1 的位，得到 010，也就是 2。',
    prerequisites: [3, 4],
  },
  {
    id: 'sort-records', level: 4, topic: '函数、结构体与排序',
    prompt: '两条记录分数都是 80，id 分别为 9 和 4。把 comesFirst 作为排序的比较函数，排序后第一个 id 是多少？',
    code: 'struct Record { int score; int id; };\nbool comesFirst(Record a, Record b) {\n    if (a.score != b.score) return a.score > b.score;\n    return a.id < b.id;\n}',
    options: ['4', '9', '取决于输入顺序', '取决于排序是否稳定'], answer: 0,
    explanation: '分数相等时，比较函数让 id 较小的记录排前面，所以 id 为 4 的排第一。稳定性影响的是比较关系等价的记录。',
    prerequisites: [1, 7, 9],
  },
  {
    id: 'strategy', level: 5, topic: '贪心与二分的适用条件',
    prompt: '任务甲是在升序数组中找一个指定数。任务乙是选出尽可能多的互不重叠会议。每场会议都有正时长，前一场结束时可接下一场。哪组方法能分别完成这两个任务？',
    options: ['甲用二分，乙总选最早开始的会议', '甲用二分，乙总选时长最短的会议', '甲用二分，乙每次选能衔接且最早结束的会议', '甲总检查数组中点，乙总选最早开始的会议'], answer: 2,
    explanation: '升序保证二分可按比较结果缩小范围。会议选择时，把当前第一场换成最早结束的一场，只会让后续可用时间更多。',
    prerequisites: [10, 12],
  },
  {
    id: 'linked-list', level: 5, topic: '单链表链接',
    prompt: '单链表原来是 A → B → C。已知 a、b、c 分别指向这三个节点。要让 A 直接指向 C，同时保留 B 供稍后处理，应执行哪一行？',
    options: ['b->next = a;', 'a->next = c;', 'c->next = a;', 'b = c;'], answer: 1,
    explanation: '改写 A 的 next 就能跳过 B，让 A 直接指向 C。指针 b 仍指向 B，所以还可单独处理 B。',
    prerequisites: [6, 7],
  },
  {
    id: 'tree-dp', level: 6, topic: '树、广度优先搜索与动态规划',
    prompt: '任务甲是在无权图中求起点到各可达点的最少边数。任务乙已知根树节点权值，求从根到叶的最大权值和。哪组做法都正确？',
    options: [
      '甲用 DFS 首次到访的深度；乙每次只选权值最大的孩子',
      '甲用 BFS；乙把每个节点的所有孩子的路径和相加',
      '甲用 DFS 首次到访的深度；乙自底向上取最大的孩子路径和',
      '甲用 BFS；乙从叶子向上计算，非叶节点取自身权值加最大的孩子路径和',
    ],
    answer: 3,
    explanation: 'BFS 按边数逐层扩展，首次到访就是最短距离。根到叶只经过一个孩子，叶节点的路径和等于自身权值，父节点在已有的孩子结果中取最大。',
    prerequisites: [2, 4, 11],
  },
].map(question => ({
  ...question,
  lessons: question.prerequisites.map(id => getCppLesson(question.level, id)),
}));

// 先补最早出现缺口的一段。全对时仍在诊断覆盖的最高等级用真题验证。
export function scorePlacement(answers) {
  const responses = placementQuestions.map(question => ({
    ...question,
    selected: answers[question.id],
    correct: answers[question.id] === question.answer,
  }));
  const firstGap = responses.find(question => !question.correct);
  const level = firstGap?.level ?? placementQuestions.at(-1).level;
  const atLevel = responses.filter(question => question.level === level);
  const ranked = [...atLevel.filter(question => !question.correct), ...atLevel.filter(question => question.correct)];
  return {
    level,
    firstGap: firstGap?.topic ?? null,
    correctCount: responses.filter(question => question.correct).length,
    lessons: [...new Set(ranked.flatMap(question => question.lessons))].slice(0, 3),
    paperPath: `/question-bank/${level}/2026-09-l${level}`,
    paperTitle: `2026 年 9 月 GESP C++ ${level} 级真题`,
    responses,
  };
}
