export const CLASSIFIER_VERSION = 'rules-v1';

export const PROMPT_TYPE_LABELS = {
  follow_up: '追问',
  answer_seeking: '直接要答案',
  verification: '验证',
  debugging: '调试',
  concept: '概念提问',
  other: '其他',
};

const FOLLOW_UP = /^(?:那|还是|再|上一题|刚才|接着|然后|继续|还有|另外)/;
const ANSWER_SEEKING = /答案(?:是什么|是多少|是啥|呢)|直接告诉我|告诉我答案|给(?:我)?(?:一?个)?答案|完整(?:的)?代码|全部代码|把第?\s*[0-9一二三四五六七八九十百]+\s*题.*(?:做|写|解)|帮我写|替我写|给我写|抄(?:一下)?答案|直接(?:写|给|说)(?:我)?(?:答案|结果|代码)|写(?:出|一下)?答案|要答案/;
const VERIFICATION = /对不对|对么|对吗|对吧|是不是(?:这样|对的?)?|这样(?:对|行|可以)吗|行不行|可不可以|行吗|帮我(?:检查|看看|核对)|检查一下|核对一下|结果应该是|验证(?:一下|下)?|有没有问题/;
const DEBUGGING = /报错|错误|error|exception|bug|段错误|崩溃|闪退|超时|为什么不行|为什么(?:会)?(?:错|失败)|怎么改|怎么(?:解决|处理)|如何改|修改|调试|哪里错|错在哪|不(?:对|行|通过|能运行|工作|了)|fail(?:ed)?/i;
const CONCEPT = /什么是|啥是|什么意思|含义|为什么要|为什么(?:会|要|是)?|有什么区别|有啥区别|有何区别|区别(?:是|在)|解释一下|讲解|介绍一下|原理|概念|怎么理解/;

export function classifyPrompt(text, { turnIndex = 1 } = {}) {
  const value = typeof text === 'string' ? text.trim() : '';
  if (!value) return 'other';
  if (Number(turnIndex) > 1 || FOLLOW_UP.test(value)) return 'follow_up';
  if (ANSWER_SEEKING.test(value)) return 'answer_seeking';
  if (VERIFICATION.test(value)) return 'verification';
  if (DEBUGGING.test(value)) return 'debugging';
  if (CONCEPT.test(value)) return 'concept';
  return 'other';
}

// 标签名与 src/pages/question-bank/EnhancedPaperPage.jsx 的 inferKnowledgeTags 保持一致。
const KNOWLEDGE_RULES = [
  [/循环|\bfor\b|\bwhile\b|\bdo\s*while\b/i, '循环结构'],
  [/条件|判断|\bif\b|\belse\b|\bswitch\b|\bcase\b/i, '条件分支'],
  [/数组|vector|下标|索引/i, '数组与容器'],
  [/字符串|string|字符|ASCII/i, '字符串处理'],
  [/函数|递归|参数|返回值/i, '函数与递归'],
  [/排序|冒泡|选择|插入|快排|归并/, '排序算法'],
  [/搜索|查找|二分|DFS|BFS/i, '搜索策略'],
  [/复杂度|O\(|时间复杂度|空间复杂度/i, '复杂度分析'],
  [/位运算|按位|异或|左移|右移|<<|>>/, '位运算'],
  [/模|余数|%|整除/, '数论基础'],
  [/输入|输出|cin|cout|printf|scanf|<<|>>/i, '输入输出'],
  [/逻辑|真|假|布尔/, '逻辑表达式'],
];

export function knowledgeTags(text) {
  const value = typeof text === 'string' ? text : '';
  const tags = [];
  for (const [regex, label] of KNOWLEDGE_RULES) {
    if (regex.test(value)) tags.push(label);
    if (tags.length >= 4) break;
  }
  return Array.from(new Set(tags)).slice(0, 4);
}
