/**
 * GESP 全局标签体系 —— 统一管理 1-8 级知识点标签
 *
 * 设计原则：
 * 1. 题目类型标签（"选择题"/"判断题"/"编程题"）不再手写，从 type 字段自动推导
 * 2. 级别标签（"GESP4级"等）不再手写，从 paperData.level 自动获取
 * 3. 每个标签键名 = 英文语义标识，值 = 中文显示名
 * 4. 各级别 shared.js 可通过别名引用保持向后兼容
 */

export const TAGS = {
  // ===== Level 1–2 基础概念 =====
  basics:       '基础语法',
  io:           '输入输出',
  operator:     '运算符',
  condition:    '条件判断',
  loop:         '循环',
  array:        '数组与字符串',
  functions:    '函数',
  computer:     '计算机常识',

  // ===== Level 3 =====
  binary:       '进制与编码',
  bitwise:      '位运算',
  charAscii:    '字符与ASCII',
  stringOps:    '字符串操作',
  enumeration:  '枚举',

  // ===== Level 4 =====
  pointer:      '指针',
  arrayMemory:  '数组与内存',
  funcParam:    '函数传参',
  sorting:      '排序算法',
  network:      '计算机网络',

  // ===== Level 5 =====
  linkedList:   '链表',
  recursion:    '递归',
  binarySearch: '二分查找',
  mergeSort:    '归并排序',
  quickSort:    '快速排序',
  divideConquer:'分治',
  numberTheory: '数论',
  sieve:        '筛法',
  highPrecision:'高精度',

  // ===== Level 6 =====
  stack:        '栈',
  queue:        '队列',
  hashTable:    '哈希表',
  greedy:       '贪心',
  dp:           '动态规划',
  prefixSum:    '前缀和',
  twoPointer:   '双指针',

  // ===== Level 7 =====
  tree:         '树与二叉树',
  bfs:          'BFS',
  dfs:          'DFS',
  graph:        '图论',
  shortestPath: '最短路',
  lcs:          '最长公共子序列',
  huffman:      '哈夫曼编码',
  complexity:   '时间复杂度',

  // ===== Level 8 =====
  oop:          '面向对象',
  spanningTree: '生成树',
  combinatorics:'组合数学',
  lis:          '最长上升子序列',
  probability:  '概率',
};

/**
 * 从 type 字段推导题型标签（不再手写）
 */
export const TYPE_LABELS = {
  single:      '选择题',
  judge:       '判断题',
  programming: '编程题',
  coding:      '编程题',
  tf:          '判断题',
  choice:      '选择题',
};

/**
 * 获取级别的中文标签
 */
export const LEVEL_LABELS = {
  1: 'GESP1级',
  2: 'GESP2级',
  3: 'GESP3级',
  4: 'GESP4级',
  5: 'GESP5级',
  6: 'GESP6级',
  7: 'GESP7级',
  8: 'GESP8级',
};

/**
 * 标签迁移映射表 —— 将旧硬编码标签映射到 TAGS 常量
 * 用于批量迁移脚本和运行时兼容
 */
export const TAG_MIGRATION_MAP = {
  // 题型冗余标签 → 移除（不映射）
  '客观题': null,
  '单选题': null,
  '判断题': null,
  '编程题': null,
  '判断题技巧': null,
  '单选题策略': null,
  '上机编程': null,

  // 级别冗余标签 → 移除
  'GESP1级': null, 'GESP2级': null, 'GESP3级': null, 'GESP4级': null,
  'GESP5级': null, 'GESP6级': null, 'GESP7级': null, 'GESP8级': null,

  // Level 1 旧标签 → TAGS
  '基础语法': 'basics',
  '函数': 'functions',
  '输入输出': 'io',
  '条件判断': 'condition',
  '循环': 'loop',
  '数组与字符串': 'array',
  '运算符': 'operator',

  // Level 2 常见硬编码 → TAGS
  '计算机基础': 'computer',
  '编程环境': 'computer',
  '变量与标识符': 'basics',
  '逻辑运算': 'operator',
  '浮点数': 'basics',
  '程序分析': 'basics',
  '程序结构': 'basics',
  '流程图': 'basics',
  '等价变换': 'basics',
  '图形': 'loop',
  '运算': 'operator',

  // Level 3 常见硬编码 → TAGS
  '进制转换': 'binary',
  '字符与ASCII': 'charAscii',
  '字符常量': 'charAscii',
  '字符串操作': 'stringOps',
  '位运算': 'bitwise',
  '枚举': 'enumeration',
  '模拟': 'enumeration',

  // Level 4 常见硬编码 → TAGS
  '指针': 'pointer',
  '指针数组': 'pointer',
  '指针函数': 'pointer',
  '数组内存': 'arrayMemory',
  '二维数组': 'arrayMemory',
  '函数传参': 'funcParam',
  '排序算法': 'sorting',
  '稳定性': 'sorting',
  '排序': 'sorting',
  '计算机网络': 'network',
  '结构体': 'funcParam',

  // Level 5 常见硬编码 → TAGS
  '链表': 'linkedList',
  '递归': 'recursion',
  '二分查找': 'binarySearch',
  '归并排序': 'mergeSort',
  '快速排序': 'quickSort',
  '分治': 'divideConquer',
  '数论': 'numberTheory',
  '筛法': 'sieve',
  '高精度': 'highPrecision',

  // Level 6 常见硬编码 → TAGS
  '栈': 'stack',
  '队列': 'queue',
  '哈希表': 'hashTable',
  '贪心': 'greedy',
  '动态规划': 'dp',
  '前缀和': 'prefixSum',
  '双指针': 'twoPointer',

  // Level 7 常见硬编码 → TAGS
  '树与二叉树': 'tree',
  '二叉树': 'tree',
  'BFS': 'bfs',
  'DFS': 'dfs',
  '图论': 'graph',
  '最短路': 'shortestPath',
  '最长公共子序列': 'lcs',
  '哈夫曼编码': 'huffman',
  '时间复杂度': 'complexity',

  // Level 8 常见硬编码 → TAGS
  '面向对象': 'oop',
  '生成树': 'spanningTree',
  '组合数学': 'combinatorics',
  '最长上升子序列': 'lis',
  '概率': 'probability',
};

/**
 * 将旧标签数组迁移到新 TAGS 体系
 * - 冗余标签（题型/级别）被移除
 * - 知识点标签映射到 TAGS 常量值
 * - 无法映射的标签保留原样
 */
export function migrateTags(oldTags, questionType, level) {
  const result = [];

  for (const tag of oldTags) {
    const mapping = TAG_MIGRATION_MAP[tag];
    if (mapping === null) {
      // 冗余标签，跳过
      continue;
    }
    if (typeof mapping === 'string') {
      // 映射到 TAGS 常量
      result.push(TAGS[mapping]);
    } else {
      // 无法映射，保留原样
      result.push(tag);
    }
  }

  // 确保至少有一个知识点标签
  if (result.length === 0) {
    result.push(TAGS.basics);
  }

  return result;
}
