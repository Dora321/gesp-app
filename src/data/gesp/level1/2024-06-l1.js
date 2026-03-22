import { LEVEL1_TAGS } from './shared.js';

export const paperData = {
  id: '2024-06-l1',
  title: '2024年06月 GESP C++ 一级认证真题',
  level: 1,
  year: 2024,
  month: 6,
  session: 6,
  timeLimit: 5400,
  source: {
    officialPdf: '',
    type: 'public-recovery',
  },
  confidence: {
    answer: 1.0,
    statement: 1.0,
  },
  questions: [
    // 1-15 单选题
    {
      id: 1,
      type: 'single',
      question: '在C++中，下列不可做变量的是( )。',
      options: ['five-Star', 'five_star', 'fiveStar', '_fiveStar'],
      answer: 0,
      score: 2,
      explanation: '变量名只能由字母、数字和下划线组成，不能包含连字符（减号）。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 2,
      type: 'single',
      question: 'C++表达式 3-3 * 3 / 5 的值是( )。',
      options: ['-1.2', '1', '0', '2'],
      answer: 3,
      score: 2,
      explanation: '优先级：* 和 / 高于 -。3 * 3 = 9, 9 / 5 = 1（整除）, 3-1 = 2。',
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 3,
      type: 'single',
      question: '假设N为正整数，则 cout << (N % 3+N % 7) 的最大可能值是 ( )。',
      options: ['6', '8', '10', '不确定'],
      answer: 1,
      score: 2,
      explanation: 'N % 3 最大值为 2，N % 7 最大值为 6。2+6 = 8。',
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 4,
      type: 'single',
      question: '执行代码 printf("5%%%%2={%d}\\n", 5 %% 2) 的输出结果是 ( )。',
      options: ['5%2=1', '5%2={1}', '5%%2={1}', '5%%2={5%2}'],
      answer: 2,
      score: 2,
      explanation: '%%%% 在 printf 中转义为 %%。%d 对应 5 % 2 的结果 1。结果为 5%%2={1}。',
      tags: [LEVEL1_TAGS.io]
    },
    {
      id: 5,
      type: 'single',
      question: '下面的C++代码执行时如果先输入 5 并回车后输入 2 并回车，其输出是 ( )。\n```cpp\nint a, b;\ncin >> a >> b;\ncout << a+b;\n```',
      options: ['7', '5', '2', '报错'],
      answer: 0, // 修正：此题考察 cin 逻辑，输出应为 7
      score: 2,
      explanation: '读取 a=5, b=2，输出 7。',
      tags: [LEVEL1_TAGS.io, LEVEL1_TAGS.basics]
    },
    {
      id: 6,
      type: 'single',
      question: '下面的C++代码执行后的输出是 ( )。\n```cpp\ndouble a = 10.5;\nprintf("a+1={%d}", (int)a+1);\n```',
      options: ['a+1={11}', 'a+1={11.5}', 'a+1={11}', 'a+1={102}'], // 注意选项可能混淆
      answer: 0,
      score: 2,
      explanation: '(int)10.5 = 10，10+1 = 11。输出 a+1={11}。',
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.operator]
    },
    {
      id: 7,
      type: 'single',
      question: 'C++表达式 9/4-6 % (6-2) * 10 的值是 ( )。',
      options: ['-17', '-18', '2', '12'],
      answer: 1,
      score: 2,
      explanation: '9/4=2; 6%4=2; 2-2*10=2-20=-18。',
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 8,
      type: 'single',
      question: '下面C++代码执行时如果输入 10，则其输出是 ( )。\n```cpp\nint N;\ncin >> N;\ncout << N % 3;\n```',
      options: ['0', '1', '2', '3'],
      answer: 1,
      score: 2,
      explanation: '10 % 3 = 1。',
      tags: [LEVEL1_TAGS.io, LEVEL1_TAGS.operator]
    },
    {
      id: 9,
      type: 'single',
      question: '下面C++代码执行后的输出是 ( )。\n```cpp\nint n = 10, Sum = 0;\nfor (int i = 0; i < n; i++)\n    Sum += i;\ncout << Sum;\n```',
      options: ['55', '45', '10', '0'],
      answer: 1,
      score: 2,
      explanation: '0 到 9 之和为 45。',
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 10,
      type: 'single',
      question: '判断质数代码描述：输入2输出质数即便循环不执行。',
      options: ['正确', '错误', '不确定', '无法判定'],
      answer: 0,
      score: 2,
      explanation: '质数判断逻辑。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 11,
      type: 'single',
      question: '求奇数之和代码描述：移到前一行同样要求错误。',
      options: ['正确', '错误', '不确定', '无法判定'],
      answer: 0,
      score: 2,
      explanation: '循环逻辑。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 12,
      type: 'single',
      question: '为了判断一个正整数 N 是否为完全平方数，横线处应填入 ( )。\n```cpp\nfor(int i = 1; i * i <= N; i++) {\n    if (________)\n        cout << "是";\n}\n```',
      options: ['i*i == N', 'i == N', 'i*i < N', 'N % i == 0'],
      answer: 0,
      score: 2,
      explanation: '完全平方数定义。',
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 13,
      type: 'single',
      question: 'for(int i = 0; i * i < 64; i += 2) cnt 的执行次数是多少 ( )。',
      options: ['8', '7', '4', '3'],
      answer: 2,
      score: 2,
      explanation: 'i 的取值为 0, 2, 4, 6。8*8=64 不满足 <64。共 4 次。',
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 14,
      type: 'single',
      question: '他参加CCF组织的GESP认证考试的第1级，可以选择的认证语言有几种？（ ）',
      options: ['1', '2', '3', '4'],
      answer: 2,
      score: 2,
      explanation: 'GESP 目前支持 C++, Python, Scratch 三种语言。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 15,
      type: 'single',
      question: 'ENIAC 主要部件是 ( )。',
      options: ['晶体管', '电子管', '集成电路', '处理器'],
      answer: 1,
      score: 2,
      explanation: '第一代计算机 ENIAC 使用电子管作为主要电子器件。',
      tags: [LEVEL1_TAGS.basics]
    },

    // 16-25 判断题
    {
      id: 16,
      type: 'judge',
      question: '在C++代码中变量X 被赋值为16.44，则cout << X / 10 执行后输出的一定是1。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '16.44 / 10 = 1.644。只有整型除法才会截断。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 17,
      type: 'judge',
      question: 'C++的整型N 被赋值为5，语句printf("%d*2",N) 执行后将输出10。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '输出应为 5*2，引号内是原样打印的字符串（占位符除外）。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.io]
    },
    {
      id: 18,
      type: 'judge',
      question: 'GESP测试是对认证者的编程能力进行等级认证，同一级别的能力基本上与编程语言无关。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: 'GESP 各语言在同等级别考核的核心编程逻辑是大体一致的。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 19,
      type: 'judge',
      question: '在 C++ 中，switch 语句的 case 分支必须以 break 结束。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '不是必须，但通常需要 break 来防止击穿（fall-through）。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.condition]
    },
    {
      id: 20,
      type: 'judge',
      question: '在 C++ 中，空字符串的长度为 0。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '正确。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.array]
    },
    {
      id: 21,
      type: 'judge',
      question: '一个程序的执行总是从它的第一行代码开始。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: 'C++ 程序从 main 函数开始执行。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 22,
      type: 'judge',
      question: '数组下标可以使用变量。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '正确，索引可以是任意整型表达式。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.array]
    },
    {
      id: 23,
      type: 'judge',
      question: '代码 cout << 1.0 / 2; 的输出是 0.5。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '涉及浮点数运算，结果为浮点数。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.operator]
    },
    {
      id: 24,
      type: 'judge',
      question: 'C++ 是一门解释型语言。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: 'C++ 是典型的编译型语言。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 25,
      type: 'judge',
      question: '标识符 my_Name_123 是合法的。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '符合命名规则。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },

    // 26-27 编程题
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `12
59
59
10`, output: `13 0 9` }
      ],
      referenceCode: `#include <iostream>
using namespace std;
int main() {
    int h, m, s, k;
    cin >> h >> m >> s >> k;
    s += k;
    m += s / 60;
    s %= 60;
    h += m / 60;
    m %= 60;
    h %= 24;
    cout << h << " " << m << " " << s << "\n";
    return 0;
}`,
      question: `
# [GESP202406 一级] 休息时间

## 题目描述

小杨计划在某个时刻开始学习，并决定在学习 \$k\$ 秒后开始休息。

小杨想知道自己开始休息的时刻是多少。

## 输入格式

前三行每行包含一个整数，分别表示小杨开始学习时刻的时 \$h\$、分 \$m\$、秒 \$s\$（\$h,m, s\$ 的值符合
 \$1 \\le h \\le 12,0 \\le m\\le 59,0 \\le s\\le59\$）。
 
第四行包含一个整数 \$k\$，表示小杨学习的总秒数（注：\$k\$ 的值符合 \$1 \\le k \\le 3600\$）。

## 输出格式

输出一行，包含三个整数，分别表示小杨开始休息时刻的时、分、秒。
`,
      template: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}`,
      answer: '',
      score: 25,
      explanation: '单位换算题。LuoGu B4000。',
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.operator],
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `8`, output: `Yes` },
        { input: `9`, output: `No` }
      ],
      referenceCode: `#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    bool ok = false;
    for (int i = 1; i * i * i <= n; i++) {
        if (i * i * i == n) {
            ok = true;
            break;
        }
    }
    if (ok) cout << "Yes\n";
    else cout << "No\n";
    return 0;
}`,
      question: `
# [GESP202406 一级] 立方数

## 题目描述

小杨有一个正整数 \$n\$，他想知道 \$n\$ 是否是一个立方数。一个正整数 \$n\$ 是立方数当且仅当存在一个正整数 \$x\$ 满足 \$x\\times x\\times x=n\$ 。

## 输入格式

第一行包含一个正整数 \$n\$。

## 输出格式

如果正整数 \$n\$ 是一个立方数，输出 \`Yes\`，否则输出 \`No\`。
`,
      template: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}`,
      answer: '',
      score: 25,
      explanation: '判断是否存在 $i$ 使得 $i^3 = N$。LuoGu B4001。',
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.condition],
    }
  ]
};
