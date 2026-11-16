import test from 'node:test';
import assert from 'node:assert/strict';
import { redact } from '../../server/usage/redact.mjs';
import { CLASSIFIER_VERSION, PROMPT_TYPE_LABELS, classifyPrompt, knowledgeTags } from '../../server/usage/classify.mjs';

test('redact covers phone, id card, email, QQ and WeChat', () => {
  const cases = [
    ['电话 13800138000', 'phone', '13800138000'],
    ['电话 138 0013 8000', 'phone', '138 0013 8000'],
    ['电话 +86 138-0013-8000', 'phone', '138-0013-8000'],
    ['身份证 11010519491231002X', 'idcard', '11010519491231002X'],
    ['身份证 110105194912310021', 'idcard', '110105194912310021'],
    ['邮箱 student.demo+tag@example.com', 'email', 'student.demo+tag@example.com'],
    ['QQ：123456789', 'qq', '123456789'],
    ['qq号 12345678', 'qq', '12345678'],
    ['QQ号是 87654321', 'qq', '87654321'],
    ['微信: abc_123', 'wechat', 'abc_123'],
    ['微信号是 abc_123', 'wechat', 'abc_123'],
    ['vx：wxid_student01', 'wechat', 'wxid_student01'],
    ['wx: classmate_42', 'wechat', 'classmate_42'],
  ];
  for (const [input, flag, secret] of cases) {
    const result = redact(input);
    assert.ok(result.flags.includes(flag), `${input} should flag ${flag}: ${result.flags}`);
    assert.equal(result.text.includes(secret), false, `${input} should hide ${secret}`);
    assert.match(result.text, /【已脱敏】/);
  }
});

test('redact merges rules and de-duplicates flags', () => {
  const result = redact('电话 13800138000 / 13900139000，邮箱 a@b.com，QQ：123456');
  assert.deepEqual(result.flags, ['email', 'qq', 'phone']);
  assert.equal(result.text.includes('13800138000'), false);
  assert.equal(result.text.includes('13900139000'), false);
  assert.equal(result.text.includes('a@b.com'), false);
  assert.equal(result.text.includes('123456'), false);
});

test('redact no longer masks self-described names, student-number phrases or classes', () => {
  for (const text of ['我叫张三', '我的名字是李四', '学号 20230101', '我是三年二班的', '我在五年三班']) {
    assert.deepEqual(redact(text), { text, flags: [] });
  }
});

test('redact leaves ordinary C++ numbers and array lengths alone', () => {
  for (const code of [
    'const int MOD = 1000000007;',
    'int a[100005];',
    'for (int i = 0; i < 100005; i++) sum += a[i] % 1000000007;',
    'vector<int> data(1000000);',
  ]) {
    assert.deepEqual(redact(code), { text: code, flags: [] });
  }
  assert.deepEqual(redact('1380013800').flags, []);
});

test('classifier labels every prompt type with stable fixed examples', () => {
  assert.equal(CLASSIFIER_VERSION, 'rules-v1');
  assert.deepEqual(PROMPT_TYPE_LABELS, {
    follow_up: '追问',
    answer_seeking: '直接要答案',
    verification: '验证',
    debugging: '调试',
    concept: '概念提问',
    other: '其他',
  });
  const examples = {
    follow_up: ['那这道题怎么做', '上一题再讲一遍', '刚才说的没听懂', { text: '什么是循环', turnIndex: 2 }],
    answer_seeking: ['答案是什么', '直接告诉我答案', '帮我写一个完整代码', '把第三题做了', '给我个答案', '直接写答案'],
    verification: ['这样对吗', '帮我检查一下', '结果应该是 42 吗', '对不对', '行不行', '可不可以'],
    debugging: ['这段代码报错了', '为什么不行', '段错误怎么改', '运行失败，报 error', '怎么解决', '代码跑不了'],
    concept: ['什么是递归', '二分查找是什么意思', '解释一下时间复杂度', '为什么要用数组'],
    other: ['今天学了新内容', '你好', '推荐一道练习题', '这道题我不会'],
  };
  for (const [expected, prompts] of Object.entries(examples)) {
    for (const prompt of prompts) {
      const text = typeof prompt === 'string' ? prompt : prompt.text;
      const turnIndex = typeof prompt === 'string' ? 1 : prompt.turnIndex;
      assert.equal(classifyPrompt(text, { turnIndex }), expected, `${text} should be ${expected}`);
    }
  }
  assert.equal(classifyPrompt('', { turnIndex: 1 }), 'other');
  assert.equal(classifyPrompt('随便问问', { turnIndex: 3 }), 'follow_up');
});

test('knowledge tags follow the fixed keyword examples and cap at four', () => {
  const cases = [
    ['for 循环怎么写', '循环结构'],
    ['if 条件判断', '条件分支'],
    ['数组下标越界', '数组与容器'],
    ['string 字符串拼接', '字符串处理'],
    ['递归函数怎么写', '函数与递归'],
    ['冒泡排序', '排序算法'],
    ['二分查找', '搜索策略'],
    ['时间复杂度 O(n)', '复杂度分析'],
    ['按位异或', '位运算'],
    ['取模运算求余数', '数论基础'],
    ['printf 输出结果', '输入输出'],
    ['布尔逻辑表达式', '逻辑表达式'],
  ];
  for (const [text, tag] of cases) assert.ok(knowledgeTags(text).includes(tag), `${text} should include ${tag}`);
  assert.deepEqual(knowledgeTags('cin >> n'), ['位运算', '输入输出']);
  assert.deepEqual(knowledgeTags('循环 条件 数组 字符串 递归 排序 二分 复杂度'),
    ['循环结构', '条件分支', '数组与容器', '字符串处理']);
  assert.deepEqual(knowledgeTags('const int MOD = 1000000007; int a[100005];'), []);
});

test('knowledge tags do not treat bare &, | or ^ as bitwise operators', () => {
  assert.deepEqual(knowledgeTags('a & b'), []);
  assert.deepEqual(knowledgeTags('a | b'), []);
  assert.deepEqual(knowledgeTags('a ^ b'), []);
  assert.deepEqual(knowledgeTags('左移和右移'), ['位运算']);
});
