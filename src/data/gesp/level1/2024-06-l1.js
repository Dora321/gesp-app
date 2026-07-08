const TAGS = {
  basics: '基础语法',
  io: '输入输出',
  condition: '条件判断',
  loop: '循环',
  operator: '运算符',
  system: '计算机基础',
};

export const paperData = {
  id: '2024-06-l1',
  title: '2024年6月 GESP C++ 一级真题',
  level: 1,
  year: 2024,
  month: 6,
  session: 6,
  timeLimit: 5400,
  source: {
    officialPdf: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B46%E6%9C%88-C%2B%2B1%E7%BA%A7.pdf',
    type: 'official-verified',
  },
  verification: {
    status: 'verified',
    reviewedBy: '本站校订',
    reviewedAt: '2026-07-04',
    scope: '题面、代码、选项与答案',
  },
  confidence: {
    answer: 1.0,
    statement: 1.0,
  },
  questions: [
    {
      id: 1,
      type: 'single',
      question: `在 C++ 中，下列不可做变量的是（ ）。`,
      options: ['five-Star', 'five_star', 'fiveStar', '_fiveStar'],
      answer: 0,
      score: 2,
      explanation: `**答案：A**

C++ 变量名只能由字母、数字、下划线组成，且不能以数字开头。\`five-Star\` 中的 \`-\` 会被当作减号，不是合法变量名字符。`,
      tags: ['变量与标识符'],
    },
    {
      id: 2,
      type: 'single',
      question: `C++ 表达式 \`3 - 3 * 3 / 5\` 的值是（ ）。`,
      options: ['-1.2', '1', '0', '2'],
      answer: 3,
      score: 2,
      explanation: `**答案：D**

先算乘除：\`3 * 3 = 9\`，\`9 / 5\` 是整数除法，结果为 \`1\`。最后 \`3 - 1 = 2\`。`,
      tags: [TAGS.operator],
    },
    {
      id: 3,
      type: 'single',
      question: `在 C++ 中，假设 \`N\` 为正整数，则表达式 \`cout << (N % 3 + N % 7)\` 可能输出的最大值是（ ）。`,
      options: ['6', '8', '9', '10'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**

\`N % 3\` 最大为 2，\`N % 7\` 最大为 6，二者和最大可能为 8。例如 \`N = 20\` 时，\`20 % 3 = 2\`，\`20 % 7 = 6\`。`,
      tags: [TAGS.operator],
    },
    {
      id: 4,
      type: 'single',
      question: `C++ 语句 \`printf("5%%2={%d}\\n",5 % 2)\` 执行后的输出是（ ）。`,
      options: ['1={1}', '5%2={5%2}', '5%2={1}', '5 ={1}'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**

\`%%\` 在 \`printf\` 中表示输出一个百分号，\`%d\` 会被 \`5 % 2\` 的结果 1 替换，所以输出 \`5%2={1}\`。`,
      tags: [TAGS.io, TAGS.operator],
    },
    {
      id: 5,
      type: 'single',
      question: `对整型变量 \`i\`，执行 C++ 语句 \`cin >> i, cout << i\` 时如果输入 \`5+2\`，下述说法正确的是（ ）。`,
      options: [
        '将输出整数 7',
        '将输出 5',
        '语句执行将报错，输入表达式不能作为输出的参数',
        '语句能执行，但输出内容不确定',
      ],
      answer: 1,
      score: 2,
      explanation: `**答案：B**

\`i\` 是整型变量，\`cin >> i\` 读取 \`5+2\` 时会先读入整数部分 \`5\`，遇到 \`+\` 停止，不会计算 \`5+2\`。`,
      tags: [TAGS.io],
    },
    {
      id: 6,
      type: 'single',
      question: `下面 C++ 代码执行后的输出是（ ）。\n\n\`\`\`cpp\nfloat a;\na = 101.101;\na = 101;\nprintf("a+1={%.0f}", a+1);\n\`\`\``,
      options: ['102={102}', 'a+1={a+1}', 'a+1={102}', 'a 先被赋值为浮点数，后被赋值为整数，执行将报错'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**

\`a\` 最后被赋值为 \`101\`，\`a + 1\` 为 \`102\`。\`%.0f\` 表示按浮点数格式输出且不保留小数位，所以结果是 \`a+1={102}\`。`,
      tags: [TAGS.io, TAGS.basics],
    },
    {
      id: 7,
      type: 'single',
      question: `表达式 \`9/4 - 6 % (6 - 2) * 10\` 的值是（ ）。`,
      options: ['-17.75', '-18', '-14', '-12.75'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**

先算括号：\`6 - 2 = 4\`。整数除法 \`9 / 4 = 2\`，取余 \`6 % 4 = 2\`，所以原式为 \`2 - 2 * 10 = -18\`。`,
      tags: [TAGS.operator],
    },
    {
      id: 8,
      type: 'single',
      question: `下面 C++ 代码执行时输入 \`10\` 后，正确的输出是（ ）。\n\n\`\`\`cpp\nint N;\ncout << "请输入正整数：";\ncin >> N;\nif (N % 3)\n    printf("第5行代码%2d", N % 3);\nelse\n    printf("第6行代码%2d", N % 3);\n\`\`\``,
      options: ['第5行代码1', '第6行代码1', '第5行代码 1', '第6行代码 1'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**

输入 \`10\` 时，\`10 % 3 = 1\`，条件 \`N % 3\` 为真，执行第 5 行。\`%2d\` 表示宽度为 2，输出一位数时前面补一个空格，因此结果是 \`第5行代码 1\`。`,
      tags: [TAGS.condition, TAGS.io, TAGS.operator],
    },
    {
      id: 9,
      type: 'single',
      question: `下面 C++ 代码执行后输出是（ ）。\n\n\`\`\`cpp\nint Sum = 0, i = 0;\nfor ( ; i < 10; )\n    Sum += i++;\ncout << i << " " << Sum;\n\`\`\``,
      options: ['9 45', '10 55', '10 45', '11 55'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**

\`i++\` 先使用旧值再自增，因此 \`Sum\` 累加的是 \`0 + 1 + ... + 9 = 45\`。循环结束时 \`i = 10\`，所以输出 \`10 45\`。`,
      tags: [TAGS.loop, TAGS.operator],
    },
    {
      id: 10,
      type: 'single',
      question: `下面 C++ 代码用于判断 \`N\` 是否为质数（只能被 1 和它本身整除的正整数）。程序执行后，下面有关描述正确的是（ ）。\n\n\`\`\`cpp\nint N;\ncout << "请输入整数：";\ncin >> N;\nbool Flag = false;\nif (N >= 2){\n    Flag = true;\n    for (int i=2; i < N; i++)\n        if (N % i == 0){\n            Flag = false;\n            break;\n        }\n}\nif(Flag)\n    cout << "是质数";\nelse\n    cout << "不是质数";\n\`\`\``,
      options: [
        '如果输入负整数，可能输出“是质数”',
        '如果输入 2，将输出“不是质数”，因为此时循环不起作用',
        '如果输入 2，将输出“是质数”，即便此时循环体没有被执行',
        '如果将 if (N >= 2) 改为 if (N > 2) 将能正确判断 N 是否质数',
      ],
      answer: 2,
      score: 2,
      explanation: `**答案：C**

输入 \`2\` 时，\`N >= 2\` 成立，\`Flag\` 被设为 \`true\`。循环条件 \`i < N\` 一开始为假，循环体不执行，最后输出“是质数”。`,
      tags: [TAGS.condition, TAGS.loop],
    },
    {
      id: 11,
      type: 'single',
      question: `下面的 C++ 代码用于求 \`1~N\` 之间所有奇数之和，其中 \`N\` 为正整数，如果 \`N\` 为奇数，则求和时包括 \`N\`。有关描述错误的是（ ）。\n\n\`\`\`cpp\nint N;\ncout << "请输入正整数：";\ncin >> N;\nint i = 1, Sum = 0;\nwhile (i <= N){\n    if (i % 2 == 1)\n        Sum += i;\n    i += 1;\n}\ncout << i << " " << Sum;\n\`\`\``,
      options: [
        '执行代码时如果输入 10，则最后一行输出将是 11 25',
        '执行代码时如果输入 5，则最后一行输出将是 6 9',
        '将 i += 1 移到 if (i % 2 == 1) 前一行，同样能实现题目要求',
        '删除 if (i % 2 == 1)，并将 i += 1 改为 i += 2，同样可以实现题目要求',
      ],
      answer: 2,
      score: 2,
      explanation: `**答案：C**

如果把 \`i += 1\` 移到判断前面，循环会先跳过 \`1\`，求和逻辑改变，不能实现原要求。`,
      tags: [TAGS.loop, TAGS.condition],
    },
    {
      id: 12,
      type: 'single',
      question: `如果一个整数 \`N\` 能够表示为 \`X*X\` 的形式，那么它就是一个完全平方数，下面 C++ 代码用于完成判断 \`N\` 是否为一个完全平方数，在横线处应填入的代码是（ ）。\n\n\`\`\`cpp\nint N;\ncin >> N;\nfor(int i = 0; i <= N; i++)\n    if(___________________)\n        cout << N << "是一个完全平方数\\n";\n\`\`\``,
      options: ['i == N*N', 'i*10 == N', 'i+i == N', 'i*i == N'],
      answer: 3,
      score: 2,
      explanation: `**答案：D**

完全平方数需要存在整数 \`i\`，使得 \`i * i == N\`。`,
      tags: [TAGS.loop, TAGS.condition],
    },
    {
      id: 13,
      type: 'single',
      question: `执行下面 C++ 代码后输出的 \`cnt\` 的值是（ ）。\n\n\`\`\`cpp\nint cnt=0;\nfor(int i = 0; i*i < 64; i+=2)\n    cnt++;\ncout << cnt;\n\`\`\``,
      options: ['8', '7', '4', '1'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**

\`i\` 依次为 \`0, 2, 4, 6\` 时满足 \`i*i < 64\`，到 \`i = 8\` 时不满足。一共执行 4 次。`,
      tags: [TAGS.loop],
    },
    {
      id: 14,
      type: 'single',
      question: `小杨父母带他到某培训机构给他报名参加 CCF 组织的 GESP 认证考试的第 1 级，那他可以选择的认证语言有几种？（ ）`,
      options: ['1', '2', '3', '4'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**

GESP 一级可以选择 Scratch、Python、C++ 三类认证语言。`,
      tags: [TAGS.system],
    },
    {
      id: 15,
      type: 'single',
      question: `ENIAC 于 1946 年投入运行，是世界上第一台真正意义上的计算机，它的主要部件都是（ ）组成的。`,
      options: ['感应线圈', '电子管', '晶体管', '集成电路'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**

ENIAC 属于第一代电子计算机，主要部件是电子管。`,
      tags: [TAGS.system],
    },
    {
      id: 16,
      type: 'judge',
      question: `在 C++ 代码中变量 \`X\` 被赋值为 \`16.44\`，则 \`cout << X / 10\` 执行后输出的一定是 \`1\`。（ ）`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**

如果 \`X\` 是浮点类型，\`X / 10\` 的结果约为 \`1.644\`，不一定输出 \`1\`。`,
      tags: [TAGS.operator],
    },
    {
      id: 17,
      type: 'judge',
      question: `C++ 的整型变量 \`N\` 被赋值为 \`10\`，则语句 \`cout << N / 4 << "->" << N % 4 << "->" << N / 4.0\` 执行后输出是 \`2->2->2.0\`。（ ）`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**

\`N / 4\` 为 \`2\`，\`N % 4\` 为 \`2\`，但 \`N / 4.0\` 是浮点除法，结果为 \`2.5\`。`,
      tags: [TAGS.operator],
    },
    {
      id: 18,
      type: 'judge',
      question: `定义 C++ 的 \`float\` 型变量 \`N\`，则语句 \`cin >> N; cout << int(float(N))\` 可以输入正负整数和浮点数，并将其转换为整数后输出。（ ）`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**

\`float\` 可以读取整数或浮点数，\`int(float(N))\` 会把数值转换为整数，转换时直接截断小数部分。`,
      tags: [TAGS.basics, TAGS.io],
    },
    {
      id: 19,
      type: 'judge',
      question: `C++ 的整型 \`N\` 被赋值为 \`5\`，语句 \`printf("%d*2",N)\` 执行后将输出 \`10\`。（ ）`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**

\`%d\` 被 \`N\` 的值 5 替换，\`*2\` 是普通字符，原样输出，所以结果是 \`5*2\`。`,
      tags: [TAGS.io],
    },
    {
      id: 20,
      type: 'judge',
      question: `在 C++ 中，\`break\` 语句用于终止当前层次的循环，循环可以是 \`for\` 循环，也可以是 \`while\` 循环。（ ）`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**

\`break\` 可以终止当前所在的 \`for\`、\`while\`、\`do-while\` 循环。`,
      tags: [TAGS.loop],
    },
    {
      id: 21,
      type: 'judge',
      question: `在 C++，\`continue\` 语句通常与 \`if\` 语句配合使用。（ ）`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**

\`continue\` 常用于“满足某个条件时跳过本次循环剩余语句”，因此通常会和 \`if\` 条件判断配合使用。`,
      tags: [TAGS.loop, TAGS.condition],
    },
    {
      id: 22,
      type: 'judge',
      question: `在 C++ 代码中，不可以将变量命名为 \`printf\`，因为 \`printf\` 是 C++ 语言的关键字。（ ）`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**

\`printf\` 是标准库函数名，不是 C++ 关键字。实际编程中不建议重名，但“因为它是关键字”这个说法错误。`,
      tags: ['变量与标识符'],
    },
    {
      id: 23,
      type: 'judge',
      question: `在 C++ 中有整型变量 \`N\`，则表达式 \`N += 8/4//2\` 相当于 \`N += 8/(4/2)\`。（ ）`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**

C++ 中 \`//\` 是单行注释的开始，不是整除运算符，因此不能把它理解为 \`8/(4/2)\`。`,
      tags: ['运算符'],
    },
    {
      id: 24,
      type: 'judge',
      question: `C++ 中定义变量 \`int N\`，则表达式 \`(!!N)\` 的值也是 \`N\` 的值。（ ）`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**

\`!!N\` 会把 \`N\` 转换成布尔意义上的 \`0\` 或 \`1\`。例如 \`N = 5\` 时，\`!!N\` 的值是 \`1\`，不是 \`5\`。`,
      tags: [TAGS.operator],
    },
    {
      id: 25,
      type: 'judge',
      question: `GESP 测试是对认证者的编程能力进行等级认证，同一级别的能力基本上与编程语言无关。（ ）`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**

GESP 重点认证编程能力和计算思维。同一级别在不同语言之间的核心能力要求基本对齐。`,
      tags: [TAGS.system],
    },
    {
      id: 26,
      type: 'programming',
      question: `
# [GESP202406 一级] 休息时间

## 题目描述

小杨计划在某个时刻开始学习，并决定在学习 $k$ 秒后开始休息。小杨想知道自己开始休息的时刻是多少。

## 输入格式

前三行每行包含一个整数，分别表示小杨开始学习时刻的时 $h$、分 $m$、秒 $s$。第四行包含一个整数 $k$，表示小杨学习的总秒数。

## 输出格式

输出一行，包含三个整数，分别表示小杨开始休息时刻的时、分、秒。`,
      samples: [
        { input: `12\n59\n59\n10`, output: `13 0 9` },
      ],
      template: `#include <iostream>
using namespace std;

int main() {
    // 在此填写代码
    return 0;
}`,
      referenceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int h, m, s;
    cin >> h >> m >> s;
    int k;
    cin >> k;
    int now = h * 60 * 60 + m * 60 + s;
    now += k;
    int hh = now / 3600;
    now %= 3600;
    int mm = now / 60;
    now %= 60;
    cout << hh << " " << mm << " " << now << "\\n";
    return 0;
}`,
      answer: '',
      score: 25,
      explanation: `**解析：**
本题考查时间换算。先把开始的时、分、秒统一换算成总秒数 \`now = h*3600 + m*60 + s\`，再加上学习时长 \`k\` 得到休息时刻的总秒数。
然后依次换算回时、分、秒：
- 时 \`hh = now / 3600\`，剩余 \`now %= 3600\`；
- 分 \`mm = now / 60\`，剩余 \`now %= 60\`；
- 秒即为 \`now\`。
样例 \`12:59:59\` 学习 \`10\` 秒后为 \`13:0:9\`，验证正确。`,
      tags: [TAGS.operator, TAGS.io],
    },
    {
      id: 27,
      type: 'programming',
      question: `
# [GESP202406 一级] 立方数

## 题目描述

小杨有一个正整数 $n$，他想知道 $n$ 是否是一个立方数。一个正整数是立方数，当且仅当存在一个正整数 $x$ 满足 $x \\times x \\times x = n$。

## 输入格式

第一行包含一个正整数 $n$。

## 输出格式

如果正整数 $n$ 是一个立方数，输出 \`Yes\`，否则输出 \`No\`。`,
      samples: [
        { input: `8`, output: `Yes` },
        { input: `9`, output: `No` },
      ],
      template: `#include <iostream>
using namespace std;

int main() {
    // 在此填写代码
    return 0;
}`,
      referenceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    int fl = 0;
    for (int i = 1; i <= n; i++) {
        if (i * i * i == n) {
            fl = 1;
            break;
        }
    }
    if (fl) cout << "Yes\\n";
    else cout << "No\\n";
    return 0;
}`,
      answer: '',
      score: 25,
      explanation: `**解析：**
立方数指存在正整数 \`x\` 使 \`x*x*x = n\`。枚举 \`i\` 从 \`1\` 到 \`n\`，若 \`i*i*i == n\` 则标记找到并跳出；枚举结束未找到则输出 \`No\`。
注意上界可优化为 \`i*i*i <= n\` 以提前终止。样例 \`n = 8\` 时 \`2*2*2 = 8\` 输出 \`Yes\`，\`n = 9\` 输出 \`No\`。`,
      tags: [TAGS.loop, TAGS.condition],
    },
  ],
};
