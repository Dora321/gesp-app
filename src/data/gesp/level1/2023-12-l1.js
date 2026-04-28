import { LEVEL1_TAGS } from './shared.js';

export const paperData = {
  id: '2023-12-l1',
  title: '2023年12月 GESP C++ 一级认证真题',
  level: 1,
  year: 2023,
  month: 12,
  session: 4,
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
      question: `下列不可做变量名的是( )。`,
      options: ['CCF_GESP', 'CCF-GESP', 'CCFGESP', 'ccfGesp'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**
      
      **解析：**
      变量名不能包含减号。
      
      - **A CCF_GESP**：错误。变量名不能包含减号。
      - **B CCF-GESP**：正确。变量名不能包含减号。
      - **C CCFGESP**：错误。变量名不能包含减号。
      - **D ccfGesp**：错误。变量名不能包含减号。
      
      **考点：** 基础语法`,
    },
    {
      id: 2,
      type: 'single',
      question: `C++表达式 10-3 * (2+1) % 10 的值是( )。`,
      options: ['0', '1', '7', '10'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**
      
      **解析：**
      10-3 * 3 % 10 = 10-9 = 1。
      
      - **A 0**：错误。可能差一错误（off-by-one），如循环条件用了 <= 而非 <。正确结果为 1。
      - **B 1**：正确。10-3 * 3 % 10 = 10-9 = 1。
      - **C 7**：错误。10-3 * 3 % 10 = 10-9 = 1。
      - **D 10**：错误。10-3 * 3 % 10 = 10-9 = 1。
      
      **考点：** 运算符`,
    },
    {
      id: 3,
      type: 'single',
      question: `小杨同学现在是上午10点，求 N 小时后的时间是几点（24小时制）。横线处应选 ( )。\n\`\`\`cpp\nint N;\ncin >> N;\ncout << ____________;\n\`\`\``,
      options: ['(10+N) % 12', '(10+N) % 24', '(10+N) / 24', '10+N'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**
      
      **解析：**
      使用取余运算计算 24 小时制时间。
      
      - **A (10+N) % 12**：错误。使用取余运算计算 24 小时制时间。
      - **B (10+N) % 24**：正确。使用取余运算计算 24 小时制时间。
      - **C (10+N) / 24**：错误。整数除法会截断小数部分，请仔细验算。
      - **D 10+N**：错误。使用取余运算计算 24 小时制时间。
      
      **考点：** 运算符、基础语法`,
    },
    {
      id: 4,
      type: 'single',
      question: `判断正整数 N 是否为偶数的正确表达式是( )。`,
      options: ['N % 2 == 0', 'N / 2 == 0', 'N % 2 = 0', 'N % 2 != 0'],
      answer: 0,
      score: 2,
      explanation: `**答案：A**
      
      **解析：**
      常用判断偶数方法。
      
      - **A N % 2 == 0**：正确。常用判断偶数方法。
      - **B N / 2 == 0**：错误。整数除法会截断小数部分，请仔细验算。
      - **C N % 2 = 0**：错误。混淆了比较 == 和赋值 =，条件判断应使用 ==。
      - **D N % 2 != 0**：错误。混淆了比较 == 和赋值 =，条件判断应使用 ==。
      
      **考点：** 运算符、基础语法`,
    },
    {
      id: 5,
      type: 'single',
      question: `C++表达式 sqrt(9.0) 的结果是( )。`,
      options: ['3', '3.0', '9', '81'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**
      
      **解析：**
      sqrt 返回浮点数。
      
      - **A 3**：错误。sqrt 返回浮点数。
      - **B 3.0**：正确。sqrt 返回浮点数。
      - **C 9**：错误。sqrt 返回浮点数。
      - **D 81**：错误。sqrt 返回浮点数。
      
      **考点：** 运算符、基础语法`,
    },
    {
      id: 6,
      type: 'single',
      question: `下列哪个语句可以定义一个整型变量 a 并初始化为 10？`,
      options: ['int a = 10;', 'float a = 10;', 'char a = 10;', 'a = 10;'],
      answer: 0,
      score: 2,
      explanation: `**答案：A**
      
      **解析：**
      标准定义与初始化。
      
      - **A int a = 10;**：正确。标准定义与初始化。
      - **B float a = 10;**：错误。标准定义与初始化。
      - **C char a = 10;**：错误。代码逻辑与正确答案不符。
      - **D a = 10;**：错误。标准定义与初始化。
      
      **考点：** 基础语法`,
    },
    {
      id: 7,
      type: 'single',
      question: `代码执行后的输出是 ( )。\n\`\`\`cpp\nint Sum = 0;\nfor (int i = 1; i <= 10; i++)\n Sum += i;\ncout << Sum;\n\`\`\``,
      options: ['45', '50', '55', '60'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**
      
      **解析：**
      1 到 10 之和为 55。
      
      - **A 45**：错误。1 到 10 之和为 55。
      - **B 50**：错误。1 到 10 之和为 55。
      - **C 55**：正确。1 到 10 之和为 55。
      - **D 60**：错误。1 到 10 之和为 55。
      
      **考点：** 循环`,
    },
    {
      id: 8,
      type: 'single',
      question: `在 C++ 中，下列哪个运算符的优先级最高？`,
      options: ['+', '*', '&&', '!'],
      answer: 3,
      score: 2,
      explanation: `**答案：D**
      
      **解析：**
      逻辑非 ! 的优先级最高。
      
      - **A +**：错误。逻辑非 ! 的优先级最高。
      - **B **：错误。逻辑非 ! 的优先级最高。
      - **C &&**：错误。逻辑非 ! 的优先级最高。
      - **D !**：正确。逻辑非 ! 的优先级最高。
      
      **考点：** 运算符`,
    },
    {
      id: 9,
      type: 'single',
      question: `下列哪个函数用于在终端输出内容？`,
      options: ['cin', 'scanf', 'cout', 'abs'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**
      
      **解析：**
      cout 是标准输出流。
      
      - **A cin**：错误。cout 是标准输出流。
      - **B scanf**：错误。cout 是标准输出流。
      - **C cout**：正确。cout 是标准输出流。
      - **D abs**：错误。cout 是标准输出流。
      
      **考点：** 输入输出`,
    },
    {
      id: 10,
      type: 'single',
      question: `代码执行后的输出是 ( )。\n\`\`\`cpp\nint a = 5, b = 2;\nif (a / b > 2) cout << "OK";\nelse cout << "KO";\n\`\`\``,
      options: ['OK', 'KO', '2.5', '报错'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**
      
      **解析：**
      5 / 2 = 2。2 > 2 不成立，输出 KO。
      
      - **A OK**：错误。5 / 2 = 2。2 > 2 不成立，输出 KO。
      - **B KO**：正确。5 / 2 = 2。2 > 2 不成立，输出 KO。
      - **C 2.5**：错误。5 / 2 = 2。2 > 2 不成立，输出 KO。
      - **D 报错**：错误。5 / 2 = 2。2 > 2 不成立，输出 KO。
      
      **考点：** 条件判断、运算符`,
    },
    {
      id: 11,
      type: 'single',
      question: `在 C++ 中，char 类型的变量占用的内存字节数是( )。`,
      options: ['1', '2', '4', '8'],
      answer: 0,
      score: 2,
      explanation: `**答案：A**
      
      **解析：**
      char 占 1 字节。
      
      - **A 1**：正确。char 占 1 字节。
      - **B 2**：错误。char 占 1 字节。
      - **C 4**：错误。char 占 1 字节。
      - **D 8**：错误。char 占 1 字节。
      
      **考点：** 基础语法`,
    },
    {
      id: 12,
      type: 'single',
      question: `二进制数 1101 转换为十进制数是( )。`,
      options: ['11', '12', '13', '14'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**
      
      **解析：**
      1*8+1*4+0*2+1*1 = 13。
      
      - **A 11**：错误。1*8+1*4+0*2+1*1 = 13。
      - **B 12**：错误。可能差一错误（off-by-one），如循环条件用了 <= 而非 <。正确结果为 13。
      - **C 13**：正确。1*8+1*4+0*2+1*1 = 13。
      - **D 14**：错误。可能差一错误（off-by-one），如循环条件用了 <= 而非 <。正确结果为 13。
      
      **考点：** 基础语法`,
    },
    {
      id: 13,
      type: 'single',
      question: `C++ 程序开发的最后一个步骤通常是( )。`,
      options: ['编辑', '编译', '运行/调试', '发布'],
      answer: 3,
      score: 2,
      explanation: `**答案：D**
      
      **解析：**
      发布是软件交付的最后阶段。
      
      - **A 编辑**：错误。编辑是修改源代码的操作，不会生成可执行代码，此选项不是正确答案。
      - **B 编译**：错误。编译是将高级语言源代码翻译成机器可执行代码的过程，此选项不是正确答案。
      - **C 运行/调试**：错误。调试是查找和修复程序错误的过程，不是生成可执行代码，此选项不是正确答案。
      - **D 发布**：正确。发布是软件交付的最后阶段。
      
      **考点：** 基础语法`,
    },
    {
      id: 14,
      type: 'single',
      question: `下列关于注释的说法，错误的是( )。`,
      options: [
        '注释不参与编译',
        '// 用于单行注释',
        '/* */ 用于多行注释',
        '注释必须写在代码之后'
      ],
      answer: 3,
      score: 2,
      explanation: `**答案：D**
      
      **解析：**
      注释可以写在程序的任何位置。
      
      - **A 注释不参与编译**：错误。编译是将高级语言源代码翻译成机器可执行代码的过程，此选项不是正确答案。
      - **B // 用于单行注释**：错误。注释可以写在程序的任何位置。
      - **C /* */ 用于多行注释**：错误。与题目要求不符，请对照正确解析重新理解。
      - **D 注释必须写在代码之后**：正确。注释可以写在程序的任何位置。
      
      **考点：** 基础语法`,
    },
    {
      id: 15,
      type: 'single',
      question: `典型的计算机体系结构采用的是( )。`,
      options: ['图灵机', '冯·诺依曼架构', '哈佛架构', '神经元架构'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**
      
      **解析：**
      现代通用计算机大多采用冯·诺依曼架构。
      
      - **A 图灵机**：错误。现代通用计算机大多采用冯·诺依曼架构。
      - **B 冯·诺依曼架构**：正确。现代通用计算机大多采用冯·诺依曼架构。
      - **C 哈佛架构**：错误。现代通用计算机大多采用冯·诺依曼架构。
      - **D 神经元架构**：错误。现代通用计算机大多采用冯·诺依曼架构。
      
      **考点：** 基础语法`,
    },

    // 16-25 判断题
    {
      id: 16,
      type: 'judge',
      question: `C++ 是一种强类型语言，所有的变量都必须先定义后使用。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      C++ 要求严格声明类型。
      
      **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
      
      **考点：** 基础语法`,

    },
    {
      id: 17,
      type: 'judge',
      question: `逻辑表达式 true && false 的结果是 true。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**
      
      **判定依据：**
      逻辑与要求两边都为真。
      
      **纠错：** 原命题说法有误。逻辑与要求两边都为真。
      
      **易混概念：** && 遇假即停，|| 遇真即停。短路求值意味着后面的表达式可能根本不会执行。
      
      **考点：** 运算符`,

    },
    {
      id: 18,
      type: 'judge',
      question: `在 C++ 中，一条语句必须以分号结尾。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      分号是语句结束符。
      
      **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
      
      **考点：** 基础语法`,

    },
    {
      id: 19,
      type: 'judge',
      question: `010 在 C++ 中表示一个八进制数。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      以 0 开头的整数字面量表示八进制。
      
      **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
      
      **考点：** 基础语法`,

    },
    {
      id: 20,
      type: 'judge',
      question: `for 循环一定会有结束条件，否则会无限执行。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      逻辑结论。
      
      **易混概念：** 注意循环变量的终值是在循环外使用的，以及 continue/break 的区别。
      
      **考点：** 循环`,
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 21,
      type: 'judge',
      question: `continue 语句用于跳出整个循环。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**
      
      **判定依据：**
      continue 只跳过当次。
      
      **纠错：** 原命题说法有误。continue 只跳过当次。
      
      **易混概念：** continue 跳过本次循环剩余语句，直接进入下一轮判断；break 直接跳出整个循环。两者效果完全不同。
      
      **考点：** 循环`,

    },
    {
      id: 22,
      type: 'judge',
      question: `数组的下标从 1 开始。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**
      
      **判定依据：**
      C++ 从 0 开始。
      
      **纠错：** 原命题说法有误。C++ 从 0 开始。
      
      **易混概念：** 注意区分相关概念的适用范围和边界条件。
      
      **考点：** 数组与字符串`,
      tags: [LEVEL1_TAGS.array]
    },
    {
      id: 23,
      type: 'judge',
      question: `标识符 Name 和 name 在 C++ 中是相同的。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**
      
      **判定依据：**
      C++ 区分大小写。
      
      **纠错：** 原命题说法有误。C++ 区分大小写。
      
      **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
      
      **考点：** 基础语法`,

    },
    {
      id: 24,
      type: 'judge',
      question: `! (10 > 5) 的值是 false。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      !(true) 为 false。
      
      **易混概念：** 注意运算符优先级与整除/取模的区分，容易混淆不同运算的结果。
      
      **考点：** 运算符`,
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 25,
      type: 'judge',
      question: `编译器会将高级语言翻译成机器语言。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      编译器的主要工作。
      
      **易混概念：** 操作系统负责管理硬件和软件资源，编译器负责将源代码翻译成目标代码，两者职能不同。
      
      **考点：** 基础语法`,

    },

    // 26-27 编程题
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `1
6`, output: `7` },
        { input: `5
3`, output: `1` }
      ],
      referenceCode: `#include <iostream>\nusing namespace std;\nint main() {\n    int x, y;\n    cin >> x >> y;\n    int res = (y+x-1) % 7;\n    if (res == 0) res = 7;\n    cout << res << endl;\n    return 0;\n}`,
      question: `
# [GESP202312 一级] 小杨的考试

## 题目描述

今天是星期 $X$，小杨还有 $N$ 天就要考试了，你能推算出小杨考试那天是星期几吗？（本题中使用 $7$ 表示星期日）

## 输入格式

输入 $2$ 行，第一行一个整数 $X(1\\le X \\le 7)$；第二行一个整数 $N(1≤N≤364)$。

## 输出格式

输出一个整数，表示小杨考试那天是星期几。
`,
      template: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}`,
      
      score: 25,
      explanation: `
      **解析：**
      考查周期性计算。可以使用 $(start+days-1) \\% 7$ 得到结果，注意余数为 0 时对应星期日 (7)。LuoGu B3921。
      `,
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.operator, LEVEL1_TAGS.condition],
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `5
2`, output: `1
3
5` },
        { input: `10
3`, output: `1
2
4
5
7
8
10` }
      ],
      referenceCode: `#include <iostream>\nusing namespace std;\nbool contains(int n, int x) {\n    while (n > 0) {\n        if (n % 10 == x) return true;\n        n /= 10;\n    }\n    return false;\n}\nint main() {\n    int n, x, count = 0;\n    cin >> n >> x;\n    for (int i = 1; i <= n; i++) {\n        if (i % x == 0 || contains(i, x)) {\n            count++;\n        }\n    }\n    cout << count << endl;\n    return 0;\n}`,
      question: `
# [GESP202312 一级] 小杨报数

## 题目描述

小杨需要从 $1$ 到 $N$ 报数。在报数过程中，小杨希望跳过 $M$ 的倍数。例如，如果 $N=5$， $M=2$ ，那么小杨就需要依次报出 $1$、$3$、$5$。

现在，请你依次输出小杨报的数。

## 输入格式

输入 $2$ 行，第一行一个整数 $N（1 \\le N \\le 1,000）$；第二行一个整数 $M（2 \\le M \\le 100）$。

## 输出格式

输出若干行，依次表示小杨报的数。
`,
      template: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}`,
      
      score: 25,
      explanation: `
      **解析：**
      包含判断与整除判断。通过 while 循环拆解数字判断是否包含数字 $x$。LuoGu B3922。
      `,
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.condition],
    }
  ]
};
