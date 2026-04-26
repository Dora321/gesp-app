import { LEVEL1_TAGS } from './shared.js';

export const paperData = {
  id: '2024-06-l1',
  title: '2024年6月 GESP C++ 一级认证真题',
  level: 1,
  year: 2024,
  month: 6,
  session: 6,
  timeLimit: 5400,
  source: {
    officialPdf: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B46%E6%9C%88-C%2B%2B1%E7%BA%A7.pdf',
    type: 'official-verified',
  },
  confidence: {
    answer: 1.0,
    statement: 0.9,
  },
  questions: [
    {
      id: 1,
      type: 'single',
      question: `在 C++ 中，下列不可作为变量名的是（ ）。`,
      options: ['five-Star', 'five_star', 'fiveStar', '_fiveStar'],
      answer: 0,
      score: 2,
      explanation: `**答案：A**
      
      **解析：**
      变量名不能包含连字符 \`-\`。
      
      - **A five-Star**：正确答案。
      - **B five_star**：错误。
      - **C fiveStar**：错误。
      - **D _fiveStar**：错误。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics],
    },
    {
      id: 2,
      type: 'single',
      question: `C++ 表达式 \`3 - 3 * 3 / 5\` 的值是（ ）。`,
      options: ['-1.2', '1', '0', '2'],
      answer: 3,
      score: 2,
      explanation: `**答案：D**
      
      **解析：**
      先算乘除，\`3*3=9\`，整数除法 \`9/5=1\`，再算 \`3-1=2\`。
      
      - **A -1.2**：错误。
      - **B 1**：错误。
      - **C 0**：错误。
      - **D 2**：正确答案。
      
      **考点：** 运算符`,
      tags: [LEVEL1_TAGS.operator],
    },
    {
      id: 3,
      type: 'single',
      question: `设 \`N\` 为正整数，则 \`N % 3 + N % 7\` 可能输出的最大值是（ ）。`,
      options: ['6', '8', '9', '10'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**
      
      **解析：**
      \`N % 3\` 最大为 2，\`N % 7\` 最大为 6，总和最大为 8。
      
      - **A 6**：错误。
      - **B 8**：正确答案。
      - **C 9**：错误。
      - **D 10**：错误。
      
      **考点：** 运算符`,
      tags: [LEVEL1_TAGS.operator],
    },
    {
      id: 4,
      type: 'single',
      question: `语句 \`printf("5%%2={%d}\\n", 5 % 2);\` 的输出是（ ）。`,
      options: ['1={1}', '5%2={5%2}', '5%2={1}', '5 ={1}'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**
      
      **解析：**
      \`%%\` 输出一个 \`%\`，\`5 % 2\` 的值为 \`1\`。
      
      - **A 1={1}**：错误。
      - **B 5%2={5%2}**：错误。
      - **C 5%2={1}**：正确答案。
      - **D 5 ={1}**：错误。
      
      **考点：** 输入输出`,
      tags: [LEVEL1_TAGS.io],
    },
    {
      id: 5,
      type: 'single',
      question: `对整型变量 \`i\` 执行 \`cin >> i; cout << i;\`，若输入 \`5+2\`，正确说法是（ ）。`,
      options: ['将输出 7', '将输出 5', '语句会报错', '输出不确定'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**
      
      **解析：**
      \`cin\` 读取整数时遇到 \`+\` 会停止，因此只读到 \`5\`。
      
      - **A 将输出 7**：错误。
      - **B 将输出 5**：正确答案。
      - **C 语句会报错**：错误。
      - **D 输出不确定**：错误。
      
      **考点：** 输入输出、基础语法`,
      tags: [LEVEL1_TAGS.io, LEVEL1_TAGS.basics],
    },
    {
      id: 6,
      type: 'single',
      question: `下面代码执行后的输出是（ ）。\n\`\`\`cpp\ndouble a = 101.1;\na = (int)a;\nprintf("a + 1 = {%d}", (int)(a + 1));\n\`\`\``,
      options: ['102={102}', 'a+1={a+1}', 'a + 1 = {102}', '会报错'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**
      
      **解析：**
      \`(int)101.1\` 得到 \`101\`，所以输出 \`a + 1 = {102}\`。
      
      - **A 102={102}**：错误。
      - **B a+1={a+1}**：错误。
      - **C a + 1 = {102}**：正确答案。
      - **D 会报错**：错误。
      
      **考点：** 运算符、输入输出`,
      tags: [LEVEL1_TAGS.operator, LEVEL1_TAGS.io],
    },
    {
      id: 7,
      type: 'single',
      question: `表达式 \`9/4 - 6 % (6 - 2) * 10\` 的值是（ ）。`,
      options: ['-17.75', '-18', '-14', '-12.75'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**
      
      **解析：**
      \`9/4=2\`，\`6%(6-2)=2\`，所以 \`2-2*10=-18\`。
      
      - **A -17.75**：错误。
      - **B -18**：正确答案。
      - **C -14**：错误。
      - **D -12.75**：错误。
      
      **考点：** 运算符`,
      tags: [LEVEL1_TAGS.operator],
    },
    {
      id: 8,
      type: 'single',
      question: `输入 \`10\` 后，下面代码的正确输出是（ ）。\n\`\`\`cpp\nint n;\ncin >> n;\nif (n % 3 == 1)\n printf("第5行代码%2d", n % 3);\nelse\n printf("第6行代码%2d", n % 3);\n\`\`\``,
      options: ['第5行代码1', '第6行代码1', '第5行代码 1', '第6行代码 1'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**
      
      **解析：**
      \`10 % 3 == 1\`，进入 \`if\` 分支，\`%2d\` 会保留宽度 2，因此前面有一个空格。
      
      - **A 第5行代码1**：错误。
      - **B 第6行代码1**：错误。
      - **C 第5行代码 1**：正确答案。
      - **D 第6行代码 1**：错误。
      
      **考点：** 输入输出、条件判断`,
      tags: [LEVEL1_TAGS.io, LEVEL1_TAGS.condition],
    },
    {
      id: 9,
      type: 'single',
      question: `下面代码执行后输出是（ ）。\n\`\`\`cpp\nint i = 0, sum = 0;\nfor (; i < 10; sum += i, i++);\ncout << i << " " << sum << endl;\n\`\`\``,
      options: ['9 45', '10 55', '10 45', '11 55'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**
      
      **解析：**
      循环结束时 \`i=10\`，\`sum\` 为 \`0+1+...+9=45\`。
      
      - **A 9 45**：错误。
      - **B 10 55**：错误。
      - **C 10 45**：正确答案。
      - **D 11 55**：错误。
      
      **考点：** 循环`,
      tags: [LEVEL1_TAGS.loop],
    },
    {
      id: 10,
      type: 'single',
      question: `有关判断质数程序的说法，正确的是（ ）。`,
      options: ['输入负数可能输出“是质数”', '输入 2 会输出“不是质数”', '输入 2 会输出“是质数”，即使循环体未执行', '把 `N>=2` 改成 `N>2` 仍然正确'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**
      
      **解析：**
      标准质数判定中，\`N=2\` 时循环可能一次也不执行，但它仍然是质数。
      
      - **A 输入负数可能输出“是质数”**：错误。
      - **B 输入 2 会输出“不是质数”**：错误。
      - **C 输入 2 会输出“是质数”，即使循环体未执行**：正确答案。
      - **D 把 \`N>=2\` 改成 \`N>2\` 仍然正确**：错误。
      
      **考点：** 条件判断`,
      tags: [LEVEL1_TAGS.condition],
    },
    {
      id: 11,
      type: 'single',
      question: `关于“求 1~N 奇数之和”的程序，错误说法是（ ）。`,
      options: ['输入 10 时最后一行会输出 `11 25`', '输入 5 时最后一行会输出 `6 9`', '把 `i += 1` 移到 `if` 前面仍然正确', '删去 `if` 并改成 `i += 2` 也可实现'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**
      
      **解析：**
      把 \`i += 1\` 提前会改变奇偶判断时机，程序逻辑会被破坏。
      
      - **A 输入 10 时最后一行会输出 \`11 25\`**：错误。
      - **B 输入 5 时最后一行会输出 \`6 9\`**：错误。
      - **C 把 \`i += 1\` 移到 \`if\` 前面仍然正确**：正确答案。
      - **D 删去 \`if\` 并改成 \`i += 2\` 也可实现**：错误。
      
      **考点：** 循环、运算符`,
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.operator],
    },
    {
      id: 12,
      type: 'single',
      question: `判断完全平方数时，横线处应填（ ）。\n\`\`\`cpp\nfor (int i = 1; i * i <= N; i++) {\n if (________) {\n flag = true;\n break;\n }\n}\n\`\`\``,
      options: ['i == N*N', 'i*10 == N', 'i+i == N', 'i*i == N'],
      answer: 3,
      score: 2,
      explanation: `**答案：D**
      
      **解析：**
      当存在 \`i*i == N\` 时，\`N\` 就是完全平方数。
      
      - **A i == N*N**：错误。
      - **B i*10 == N**：错误。
      - **C i+i == N**：错误。
      - **D i*i == N**：正确答案。
      
      **考点：** 运算符`,
      tags: [LEVEL1_TAGS.operator],
    },
    {
      id: 13,
      type: 'single',
      question: `执行代码后 \`cnt\` 的值是（ ）。\n\`\`\`cpp\nint cnt = 0;\nfor (int i = 0; i < 10; i += 2) {\n if (i <= 6) cnt++;\n}\n\`\`\``,
      options: ['8', '7', '4', '1'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**
      
      **解析：**
      \`i\` 依次为 \`0,2,4,6,8\`，其中满足 \`i<=6\` 的共有 4 个。
      
      - **A 8**：错误。
      - **B 7**：错误。
      - **C 4**：正确答案。
      - **D 1**：错误。
      
      **考点：** 循环、条件判断`,
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.condition],
    },
    {
      id: 14,
      type: 'single',
      question: `GESP 一级可以选择的认证语言有几种？`,
      options: ['1', '2', '3', '4'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**
      
      **解析：**
      通常为 Scratch、Python、C++ 三种。
      
      - **A 1**：错误。
      - **B 2**：错误。
      - **C 3**：正确答案。
      - **D 4**：错误。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics],
    },
    {
      id: 15,
      type: 'single',
      question: `ENIAC 的主要器件是（ ）。`,
      options: ['感应线圈', '电子管', '晶体管', '集成电路'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**
      
      **解析：**
      第一代计算机主要使用电子管。
      
      - **A 感应线圈**：错误。
      - **B 电子管**：正确答案。
      - **C 晶体管**：错误。
      - **D 集成电路**：错误。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics],
    },
    {
      id: 16,
      type: 'judge',
      question: `若变量 \`X\` 被赋值为 \`16.44\`，则 \`cout << X / 10\` 的输出一定是 \`1\`。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**
      
      **判定依据：**
      如果 \`X\` 是浮点型，结果可能是 \`1.644\`，不一定是 \`1\`。
      
      **纠错：** 原命题说法有误。如果 \`X\` 是浮点型，结果可能是 \`1.644\`，不一定是 \`1\`。
      
      **易混概念：** 注意区分关键字与标识符、编译器与操作系统的职能边界。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics],
    },
    {
      id: 17,
      type: 'judge',
      question: `当 \`N=10\` 时，\`N/4\` 和 \`N%4\` 的值相等，且 \`N/4.0\` 的结果为 \`2.5\`。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**
      
      **判定依据：**
      虽然数值上前两者都为 2，但题干整体被判为错误。
      
      **纠错：** 原命题说法有误。虽然数值上前两者都为 2，但题干整体被判为错误。
      
      **易混概念：** 注意运算符优先级与整除/取模的区分，容易混淆不同运算的结果。
      
      **考点：** 运算符`,
      tags: [LEVEL1_TAGS.operator],
    },
    {
      id: 18,
      type: 'judge',
      question: `定义 \`float N\` 后，语句 \`cin >> N; cout << int(float(N));\` 可以输入整数和浮点数，并把它们转成整数输出。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      显式类型转换后可以按整数形式输出。
      
      **易混概念：** 注意 printf 格式化占位符与参数类型的匹配，以及转义字符的用法。
      
      **考点：** 输入输出`,
      tags: [LEVEL1_TAGS.io],
    },
    {
      id: 19,
      type: 'judge',
      question: `当 \`N=5\` 时，\`printf("%d*2", N)\` 的输出是 \`10\`。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**
      
      **判定依据：**
      它会输出字符串 \`5*2\`，而不是计算结果。
      
      **纠错：** 原命题说法有误。它会输出字符串 \`5*2\`，而不是计算结果。
      
      **易混概念：** 注意 printf 格式化占位符与参数类型的匹配，以及转义字符的用法。
      
      **考点：** 输入输出`,
      tags: [LEVEL1_TAGS.io],
    },
    {
      id: 20,
      type: 'judge',
      question: `\`break\` 语句可以终止当前层次的 \`for\` 循环，也可以终止当前层次的 \`while\` 循环。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      这是 \`break\` 的标准作用。
      
      **易混概念：** 注意循环变量的终值是在循环外使用的，以及 continue/break 的区别。
      
      **考点：** 循环`,
      tags: [LEVEL1_TAGS.loop],
    },
    {
      id: 21,
      type: 'judge',
      question: `\`continue\` 语句通常会和 \`if\` 语句配合使用。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      常见写法是先判断条件，再决定是否跳过本轮剩余语句。
      
      **易混概念：** 注意循环变量的终值是在循环外使用的，以及 continue/break 的区别。
      
      **考点：** 循环`,
      tags: [LEVEL1_TAGS.loop],
    },
    {
      id: 22,
      type: 'judge',
      question: `在 C++ 中，不可以把变量命名为 \`printf\`，因为它是关键字。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**
      
      **判定依据：**
      \`printf\` 是库函数名，不是语言关键字。
      
      **纠错：** 原命题说法有误。\`printf\` 是库函数名，不是语言关键字。
      
      **易混概念：** 注意区分关键字与标识符、编译器与操作系统的职能边界。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics],
    },
    {
      id: 23,
      type: 'judge',
      question: `表达式 \`N += 8/4//2\` 等价于 \`N += 8/(4/2)\`。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**
      
      **判定依据：**
      \`//\` 会被解析为单行注释，不是除法组合。
      
      **纠错：** 原命题说法有误。\`//\` 会被解析为单行注释，不是除法组合。
      
      **易混概念：** 注意运算符优先级与整除/取模的区分，容易混淆不同运算的结果。
      
      **考点：** 运算符`,
      tags: [LEVEL1_TAGS.operator],
    },
    {
      id: 24,
      type: 'judge',
      question: `对于整型变量 \`N\`，表达式 \`!!N\` 的值总是与 \`N\` 本身相同。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**
      
      **判定依据：**
      \`!!N\` 的结果只会是 \`0\` 或 \`1\`。
      
      **纠错：** 原命题说法有误。\`!!N\` 的结果只会是 \`0\` 或 \`1\`。
      
      **易混概念：** 注意运算符优先级与整除/取模的区分，容易混淆不同运算的结果。
      
      **考点：** 运算符`,
      tags: [LEVEL1_TAGS.operator],
    },
    {
      id: 25,
      type: 'judge',
      question: `GESP 是对编程能力进行等级认证，同一级别考察的核心能力基本与具体语言无关。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      同一级别主要考察相近的计算思维和程序设计能力。
      
      **易混概念：** 注意区分关键字与标识符、编译器与操作系统的职能边界。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics],
    },
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `12\n59\n59\n10`, output: `13 0 9` },
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
    cout << h << " " << m << " " << s << "\\n";
    return 0;
}`,
      question: `
# [GESP202406 一级] 休息时间

## 题目描述

小杨在某个时刻开始学习，并决定在学习 $k$ 秒后开始休息。 
已知开始学习时刻的时、分、秒，请输出开始休息时刻。

## 输入格式

前 3 行分别输入开始时刻的时 $h$、分 $m$、秒 $s$。 
第 4 行输入学习时长 $k$。

## 输出格式

输出一行，包含 3 个整数，分别表示休息时刻的时、分、秒。
`,
      template: `#include <iostream>
using namespace std;

int main() {
    // 在此填写代码
    return 0;
}`,
      answer: '',
      score: 25,
      explanation: '标准时间进位题：先加秒，再处理分和时的进位。',
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.operator],
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `8`, output: `Yes` },
        { input: `9`, output: `No` },
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
    if (ok) cout << "Yes\\n";
    else cout << "No\\n";
    return 0;
}`,
      question: `
# [GESP202406 一级] 立方数

## 题目描述

给定一个正整数 $n$，判断它是否是立方数。 
如果存在正整数 $x$，使得 $x \\times x \\times x = n$，则称 $n$ 是立方数。

## 输入格式

输入一个正整数 $n$。

## 输出格式

如果 $n$ 是立方数，输出 \`Yes\`，否则输出 \`No\`。
`,
      template: `#include <iostream>
using namespace std;

int main() {
    // 在此填写代码
    return 0;
}`,
      answer: '',
      score: 25,
      explanation: '枚举整数并判断是否存在 `i*i*i == n`。',
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.condition],
    },
  ],
};
