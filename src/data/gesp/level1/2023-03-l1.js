import { LEVEL1_TAGS } from './shared.js';

export const paperData = {
  id: '2023-03-l1',
  title: '2023年03月 GESP C++ 一级认证真题',
  level: 1,
  year: 2023,
  month: 3,
  session: 1,
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
      question: `中国计算机学会（CCF）在（ ）年推出了 GESP 认证考试？`,
      options: ['2021', '2022', '2023', '2024'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**
      
      **解析：**
      GESP (编程能力等级认证) 是由 CCF 于 2022 年底正式推出。
      
      - **A 2021**：错误。
      - **B 2022**：正确答案。
      - **C 2023**：错误。
      - **D 2024**：错误。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 2,
      type: 'single',
      question: `第 2 代计算机主要使用的电子元件是（ ）。`,
      options: ['晶体管', '电子管', '集成电路', '超大规模集成电路'],
      answer: 0,
      score: 2,
      explanation: `**答案：A**
      
      **解析：**
      计算机发展史知识。第一代是电子管，第二代是晶体管。
      
      - **A 晶体管**：正确答案。
      - **B 电子管**：错误。
      - **C 集成电路**：错误。
      - **D 超大规模集成电路**：错误。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 3,
      type: 'single',
      question: `512MB 等于（ ）。`,
      options: [
        '512 * 1024 * 1024 字节',
        '512 * 1024 字节',
        '512 * 1000 * 1000 字节',
        '512 字节'
      ],
      answer: 0,
      score: 2,
      explanation: `**答案：A**
      
      **解析：**
      存储单位转换：1MB = 1024KB, 1KB = 1024B。
      
      - **A 512 * 1024 * 1024 字节**：正确答案。
      - **B 512 * 1024 字节**：错误。
      - **C 512 * 1000 * 1000 字节**：错误。
      - **D 512 字节**：错误。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 4,
      type: 'single',
      question: `下列哪个不是 C++ 语言的关键字？`,
      options: ['double', 'using', 'longlong', 'namespace'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**
      
      **解析：**
      标准关键字是 long long（带空格），longlong 并非关键字。
      
      - **A double**：错误。
      - **B using**：错误。
      - **C longlong**：正确答案。
      - **D namespace**：错误。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 5,
      type: 'single',
      question: `执行语句 int a = 0.6; 后，变量 a 的值为（ ）。`,
      options: ['0.6', '0', '1', '报错'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**
      
      **解析：**
      浮点数赋值给整型变量会发生截断，向下取整。
      
      - **A 0.6**：错误。
      - **B 0**：正确答案。
      - **C 1**：错误。
      - **D 报错**：错误。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 6,
      type: 'single',
      question: `符合 C++ 语法的标识符是（ ）。`,
      options: ['8th_exam', 'exam 8th', 'exam#8th', 'exam_8th'],
      answer: 3,
      score: 2,
      explanation: `**答案：D**
      
      **解析：**
      标识符命名规则。
      
      - **A 8th_exam**：错误。
      - **B exam 8th**：错误。
      - **C exam#8th**：错误。
      - **D exam_8th**：正确答案。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 7,
      type: 'single',
      question: `不符合 C++ 语法的表达式是（ ）。`,
      options: ['a = 3+2;', 'a = (b = 3)+2;', 'int a = 3.5;', 'int a = 3.5 % 2;'],
      answer: 3,
      score: 2,
      explanation: `**答案：D**
      
      **解析：**
      取模运算符 % 左右必须为整数。3.5 是浮点数。
      
      - **A a = 3+2;**：错误。
      - **B a = (b = 3)+2;**：错误。
      - **C int a = 3.5;**：错误。
      - **D int a = 3.5 % 2;**：正确答案。
      
      **考点：** 运算符`,
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 8,
      type: 'single',
      question: `表达式 15 % 4 * 10 / 2 的计算结果是（ ）。`,
      options: ['15', '1.5', '1', '0'],
      answer: 0,
      score: 2,
      explanation: `**答案：A**
      
      **解析：**
      15 % 4 = 3; 3 * 10 = 30; 30 / 2 = 15。
      
      - **A 15**：正确答案。
      - **B 1.5**：错误。
      - **C 1**：错误。
      - **D 0**：错误。
      
      **考点：** 运算符`,
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 9,
      type: 'single',
      question: `表达式 (5 && 2) 的计算结果是（ ）。`,
      options: ['true', 'false', '0', '1'],
      answer: 0, // C++ 中任何非零值作为布尔判断均为真。
      score: 2,
      explanation: `**答案：A**
      
      **解析：**
      5 和 2 均为非零值，在逻辑与运算中判定为真。
      
      - **A true**：正确答案。
      - **B false**：错误。
      - **C 0**：错误。
      - **D 1**：错误。
      
      **考点：** 运算符`,
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 10,
      type: 'single',
      question: `执行语句 (a = 2) && (b = 0) 后，a 和 b 的值分别为（ ）。`,
      options: ['a = 2, b = 2', 'a = 0, b = 0', 'a = 1, b = 0', 'a = 2, b = 0'],
      answer: 3,
      score: 2,
      explanation: `**答案：D**
      
      **解析：**
      赋值表达式的结果是所赋的值。a=2后判定为真，继续执行 b=0。
      
      - **A a = 2, b = 2**：错误。
      - **B a = 0, b = 0**：错误。
      - **C a = 1, b = 0**：错误。
      - **D a = 2, b = 0**：正确答案。
      
      **考点：** 运算符、基础语法`,
      tags: [LEVEL1_TAGS.operator, LEVEL1_TAGS.basics]
    },
    {
      id: 11,
      type: 'single',
      question: `判断变量 a 是否为偶数的正确表达式是（ ）。`,
      options: ['a / 2 == 0', 'a % 2 == 0', 'a % 2 = 0', 'a / 2 = 0'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**
      
      **解析：**
      判断整除性。
      
      - **A a / 2 == 0**：错误。
      - **B a % 2 == 0**：正确答案。
      - **C a % 2 = 0**：错误。
      - **D a / 2 = 0**：错误。
      
      **考点：** 运算符、基础语法`,
      tags: [LEVEL1_TAGS.operator, LEVEL1_TAGS.basics]
    },
    {
      id: 12,
      type: 'single',
      question: `判断三条边 a, b, c 能否构成三角形的逻辑表达式是（ ）。`,
      options: [
        'a+b>c || a+c>b || b+c>a',
        'a+b<c && a+c<b && b+c<a',
        'a+b>c && a+c>b && b+c>a',
        'a+b==c'
      ],
      answer: 2,
      score: 2,
      explanation: `**答案：C**
      
      **解析：**
      任意两边之和大于第三边。
      
      - **A a+b>c || a+c>b || b+c>a**：错误。
      - **B a+b<c && a+c<b && b+c<a**：错误。
      - **C a+b>c && a+c>b && b+c>a**：正确答案。
      - **D a+b==c**：错误。
      
      **考点：** 条件判断、运算符`,
      tags: [LEVEL1_TAGS.condition, LEVEL1_TAGS.operator]
    },
    {
      id: 13,
      type: 'single',
      question: `执行 printf("5%%%%2={%%d}\\n", 5 %% 2); 结果为（ ）。`,
      options: ['5%2={1}', '5%%2={1}', '5%2={%d}', '5%%2={%d}'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**
      
      **解析：**
      转义 %。
      
      - **A 5%2={1}**：错误。
      - **B 5%%2={1}**：正确答案。
      - **C 5%2={%d}**：错误。
      - **D 5%%2={%d}**：错误。
      
      **考点：** 输入输出`,
      tags: [LEVEL1_TAGS.io]
    },
    {
      id: 14,
      type: 'single',
      question: `代码执行后的输出是 ( )。\n\`\`\`cpp\nint a = 0;\nfor (int i = 1; i <= 4; i++)\n a = a+i;\ncout << a;\n\`\`\``,
      options: ['4', '10', '15', '0'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**
      
      **解析：**
      1+2+3+4 = 10。
      
      - **A 4**：错误。
      - **B 10**：正确答案。
      - **C 15**：错误。
      - **D 0**：错误。
      
      **考点：** 循环`,
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 15,
      type: 'single',
      question: `代码执行后的输出是 ( )。\n\`\`\`cpp\nint a = 5, b = 10;\nif (a > b) a = a+b;\nelse a = b-a;\ncout << a;\n\`\`\``,
      options: ['15', '10', '5', '0'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**
      
      **解析：**
      10-5 = 5。
      
      - **A 15**：错误。
      - **B 10**：错误。
      - **C 5**：正确答案。
      - **D 0**：错误。
      
      **考点：** 条件判断、基础语法`,
      tags: [LEVEL1_TAGS.condition, LEVEL1_TAGS.basics]
    },

    // 16-25 判断题
    {
      id: 16,
      type: 'judge',
      question: `在计算机存储单位中，1KB 等于 1000 字节。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**
      
      **判定依据：**
      1KB = 1024B。
      
      **纠错：** 原命题说法有误。1KB = 1024B。
      
      **易混概念：** 注意区分关键字与标识符、编译器与操作系统的职能边界。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 17,
      type: 'judge',
      question: `编译器的主要作用是将高级语言编写的源代码翻译成目标代码。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      编译型语言的核心过程。
      
      **易混概念：** 注意区分关键字与标识符、编译器与操作系统的职能边界。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 18,
      type: 'judge',
      question: `C++ 语言中，变量名不区分字母的大小写。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**
      
      **判定依据：**
      C++ 严格区分大小写。
      
      **纠错：** 原命题说法有误。C++ 严格区分大小写。
      
      **易混概念：** 注意区分关键字与标识符、编译器与操作系统的职能边界。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 19,
      type: 'judge',
      question: `C++ 数据类型中，char 类型通常占用 1 个字节的内存空间。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      正确。
      
      **易混概念：** 注意区分关键字与标识符、编译器与操作系统的职能边界。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 20,
      type: 'judge',
      question: `在 C++ 中，执行语句 cout << 3 / 2; 的输出结果是 1.5。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**
      
      **判定依据：**
      整除运算，结果为 1。
      
      **纠错：** 原命题说法有误。整除运算，结果为 1。
      
      **易混概念：** 注意运算符优先级与整除/取模的区分，容易混淆不同运算的结果。
      
      **考点：** 输入输出、运算符`,
      tags: [LEVEL1_TAGS.io, LEVEL1_TAGS.operator]
    },
    {
      id: 21,
      type: 'judge',
      question: `if 语句中的条件表达式必须是布尔类型（bool）。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**
      
      **判定依据：**
      可以是任何能隐式转换为布尔值的类型（如整型，非零为真）。
      
      **纠错：** 原命题说法有误。可以是任何能隐式转换为布尔值的类型（如整型，非零为真）。
      
      **易混概念：** 注意逻辑运算符 && 和 || 的短路求值特性，以及运算符优先级。
      
      **考点：** 条件判断`,
      tags: [LEVEL1_TAGS.condition]
    },
    {
      id: 22,
      type: 'judge',
      question: `for 循环的三个参数（初始化、条件、迭代）都可以省略。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      如 for(;;)。
      
      **易混概念：** 注意循环变量的终值是在循环外使用的，以及 continue/break 的区别。
      
      **考点：** 循环`,
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 23,
      type: 'judge',
      question: `break 语句只能用于跳出当前的循环结构（或 switch 语句）。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      正确用途。
      
      **易混概念：** 注意循环变量的终值是在循环外使用的，以及 continue/break 的区别。
      
      **考点：** 循环`,
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 24,
      type: 'judge',
      question: `逻辑表达式 (5 > 2) || (3 < 1) 的值为 true。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      true || false 结果为真。
      
      **易混概念：** 注意运算符优先级与整除/取模的区分，容易混淆不同运算的结果。
      
      **考点：** 运算符`,
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 25,
      type: 'judge',
      question: `C++ 程序必须包含 iostream 头文件才能运行。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**
      
      **判定依据：**
      只有需要使用输入输出流时才需要，最简单的程序可以不包含它。
      
      **纠错：** 原命题说法有误。只有需要使用输入输出流时才需要，最简单的程序可以不包含它。
      
      **易混概念：** 注意区分关键字与标识符、编译器与操作系统的职能边界。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },

    // 26-27 编程题
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `4`, output: `2` },
        { input: `6`, output: `2` }
      ],
      referenceCode: `#include <iostream>\nusing namespace std;\nint main() {\n    int n, count = 0;\n    cin >> n;\n    for (int i = 1; i * i <= n; i++) {\n        if (n % i == 0) {\n            count++;\n        }\n    }\n    cout << count << endl;\n    return 0;\n}`,
      question: `
# [GESP202303 一级] 长方形面积

## 题目描述

小明刚刚学习了如何计算长方形面积。他发现，如果一个长方形的长和宽都是整数，它的面积一定也是整数。现在，小明想知道如果给定长方形的面积，有多少种可能的长方形，满足长和宽都是整数？如果两个长方形的长相等、宽也相等，则认为是同一种长方形。约定长方形的长大于等于宽。正方形是长方形的特例，即长方形的长和宽可以相等。

## 输入格式

输入一行，包含一个整数 $A$，表示长方形的面积。约定 $2 \\leq A \\leq 1000$。

## 输出格式

输出一行，包含一个整数 $C$，表示有 $C$ 种可能的长方形。
`,
      template: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}`,
      
      score: 25,
      explanation: '枚举宽 $i$ 从 1 到 $\\sqrt{N}$，如果 $N$ 能被 $i$ 整除，则对应一种长和宽都为整数的方案。LuoGu B3834。',
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.operator, LEVEL1_TAGS.loop],
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `2022 1`, output: `31` },
        { input: `2020 2`, output: `29` }
      ],
      referenceCode: `#include <iostream>\nusing namespace std;\nint main() {\n    int y, m;\n    cin >> y >> m;\n    if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) {\n        cout << 31 << endl;\n    } else if (m == 4 || m == 6 || m == 9 || m == 11) {\n        cout << 30 << endl;\n    } else {\n        if ((y % 4 == 0 && y % 100 != 0) || (y % 400 == 0)) {\n            cout << 29 << endl;\n        } else {\n            cout << 28 << endl;\n        }\n    }\n    return 0;\n}`,
      question: `
# [GESP202303 一级] 每月天数

## 题目描述

小明刚刚学习了每月有多少天，以及如何判断平年和闰年，想到可以使用编程方法求出给定的月份有多少天。你能做到吗？

## 输入格式

输入一行，包含两个整数 $A, B$，分别表示一个日期的年、月。约定 $2000 \\leq A \\leq 3000$，$1 \\leq B \\leq 12$。

## 输出格式

输出一行，包含一个整数，表示输入月份有多少天。
`,
      template: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}`,
      
      score: 25,
      explanation: '考查条件判断与逻辑运算。需要特殊处理 2 月并判断闰年。LuoGu B3835。',
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.condition],
    }
  ]
};
