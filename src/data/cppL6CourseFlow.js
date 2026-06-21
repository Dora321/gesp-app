const cppL6Lessons = [
  { id: 1, title: '第 1 课：树的初相识 (性质/存储)' },
  { id: 2, title: '第 2 课：树的遍历 (前/中/后序)' },
  { id: 3, title: '第 3 课：最优二叉树 (哈夫曼)' },
  { id: 4, title: '第 4 课：地毯式搜索 (BFS)' },
];

const qualityByLesson = {
  1: {
    accent: 'teal',
    goals: ['能说出树的基本概念和 n-1 条边性质', '能区分父节点、孩子、叶子和根', '能用邻接表保存一棵树'],
    deliverables: ['画出样例树并标出根、叶子、父子关系', '写出无向边建邻接表的 C++ 模板', '整理 parent 数组、度数和叶子统计表'],
    checks: ['能用 n-1 条边检查树输入是否合法', '能区分节点编号、父节点编号和孩子列表', '能在邻接表中双向加边并避免遍历时走回父节点'],
  },
  2: {
    accent: 'indigo',
    goals: ['能手推三种遍历序列', '能写出二叉树递归遍历模板', '能说明根节点访问时机的区别'],
    deliverables: ['手推一棵二叉树的前序、中序、后序结果', '写出 preorder、inorder、postorder 三个递归函数', '用前序加中序定位根节点并拆分左右子树'],
    checks: ['能准确说出根节点在三种遍历中的访问位置', '能处理空子树和叶子节点的递归出口', '能保持左子树、右子树顺序不反转'],
  },
  3: {
    accent: 'amber',
    goals: ['能手推哈夫曼合并过程', '能用 priority_queue 取最小权值', '能计算合并总代价'],
    deliverables: ['手推一组权值的完整哈夫曼合并表', '写出 priority_queue 小根堆实现', '统计每轮合并权值并累加总代价'],
    checks: ['能记住 C++ 默认 priority_queue 是大根堆', '能把合并后的新权值重新放回堆里', '能用 long long 保存累计代价避免溢出'],
  },
  4: {
    accent: 'blue',
    goals: ['能解释 BFS 按层扩展的过程', '能写出网格最短路模板', '能正确使用队列、visited 和 dist'],
    deliverables: ['画出样例网格前两层 BFS 扩展过程', '写出带 dist 数组的网格 BFS 模板', '整理入队、标记、出队和扩展的顺序清单'],
    checks: ['能说明队列先进先出如何保证按层扩展', '能理解无权图第一次到达就是最短距离', '能在入队时标记 visited 并拒绝用于带权最短路'],
  },
};

const nextReasonByLesson = {
  1: '树的存储方式明确后，下一课进入树上最基础的访问顺序：前序、中序和后序遍历。',
  2: '遍历能手推和编码后，下一课用二叉树结构解决最优合并问题：哈夫曼树。',
  3: '哈夫曼练熟小根堆和合并代价后，下一课进入图与网格搜索的核心模板：BFS。',
  4: 'BFS 掌握按层扩展和最短步数后，下一课切换到一条路走到底再回退的 DFS。',
};

const previousReasonByLesson = {
  1: '五级已经打通链表、二分、分治和贪心；进入六级前先从总览确认树、图、动态规划的主线。',
  2: '遍历建立在树的节点、边和邻接表存储上，先确认第 1 课能画出父子关系并完成建树。',
  3: '哈夫曼属于二叉树上的最优结构，先确认第 2 课能稳定区分根、左子树和右子树。',
  4: 'BFS 从树扩展到图和网格，先确认第 3 课的小根堆与结构化过程追踪已经稳定。',
};

const practiceByLesson = {
  1: [{ label: 'GESP 六级真题：树的性质与存储', path: '/question-bank/6/2023-09-l6' }],
  2: [{ label: 'GESP 六级真题：树遍历与递归', path: '/question-bank/6/2023-12-l6' }],
  3: [{ label: 'GESP 六级真题：哈夫曼与优先队列', path: '/question-bank/6/2024-03-l6' }],
  4: [{ label: 'GESP 六级真题：BFS 与最短步数', path: '/question-bank/6/2024-06-l6' }],
};

const reviewTasksByLesson = {
  1: ['给一组边画出树，并标出根、叶子、每个节点的父节点。', '用邻接表保存一棵树，统计每个节点的度数和叶子数量。'],
  2: ['手推同一棵树的三种遍历序列，再用程序输出验证。', '写一个递归遍历函数，并在访问根节点的位置旁写下注释。'],
  3: ['手推 5 个权值的哈夫曼合并过程，记录每轮堆中元素。', '用小根堆写哈夫曼总代价程序，并用 long long 存答案。'],
  4: ['画出一个迷宫从起点扩展的前两层 BFS 队列变化。', '写网格 BFS 最短路模板，单独测试起点等于终点和无路可达。'],
};

export function getCppL6LessonSupport(lessonId) {
  const lesson = cppL6Lessons.find((item) => item.id === lessonId);
  const previousLesson = cppL6Lessons.find((item) => item.id === lessonId - 1);
  const nextLesson = cppL6Lessons.find((item) => item.id === lessonId + 1);

  if (!lesson) return null;

  return {
    lesson,
    quality: qualityByLesson[lessonId],
    previous: previousLesson
      ? {
          title: previousLesson.title,
          path: `/lesson/6/${previousLesson.id}`,
          reason: previousReasonByLesson[lessonId],
        }
      : {
          title: '六级课程总览',
          path: '/level6',
          reason: previousReasonByLesson[lessonId],
        },
    next: nextLesson
      ? {
          title: nextLesson.title,
          path: `/lesson/6/${nextLesson.id}`,
          reason: nextReasonByLesson[lessonId],
        }
      : {
          title: '第 5 课：不撞南墙不回头 (DFS)',
          path: '/lesson/6/5',
          reason: nextReasonByLesson[lessonId],
        },
    practiceLinks: practiceByLesson[lessonId] || [],
    reviewTasks: reviewTasksByLesson[lessonId] || [],
  };
}
