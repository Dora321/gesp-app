// 2023年6月 GESP C++ 二级真题 (第2次认证)
export const paperData = {
    id: '2023-06-l2',
    title: '2023年6月 GESP C++ 二级真题',
    level: 2,
    year: 2023,
    month: 6,
    session: 2,
    note: '首次开启5-8级',
    timeLimit: 90 * 60,
    questions: [
        { id: 1, type: 'single', question: `高级语言编写的程序需要经过以下（ ）操作，才可以生成在计算机上运行的可执行代码。`, options: ['编辑', '保存', '调试', '编译'], answer: 3, score: 2, explanation: `**答案：D**
        
        **解析：**
        编译把高级语言转换为机器可执行代码。
        
        - **A 编辑**：错误。与题目要求不符，请对照正确解析重新理解。
        - **B 保存**：错误。与题目要求不符，请对照正确解析重新理解。
        - **C 调试**：错误。与题目要求不符，请对照正确解析重新理解。
        - **D 编译**：正确答案。
        
        **考点：** 基础语法
        `,
        tags: ['基础语法']
        },
        { id: 2, type: 'single', question: `能够实现“当条件不成立时反复执行语句块、条件成立时结束循环”流程图功能的伪代码是（ ）。`, options: ['if 条件判断 then 语句块', 'if 条件判断 then 什么也不做 else 语句块', 'while 条件判断 do 语句块', 'while not 条件判断 do 语句块'], answer: 3, score: 2, explanation: `**答案：D**
        
        **解析：**
        题意对应“条件不满足继续循环”。
        
        - **A if 条件判断 then 语句块**：错误。与题目要求不符，请对照正确解析重新理解。
        - **B if 条件判断 then 什么也不做 else 语句块**：错误。与题目要求不符，请对照正确解析重新理解。
        - **C while 条件判断 do 语句块**：错误。与题目要求不符，请对照正确解析重新理解。
        - **D while not 条件判断 do 语句块**：正确答案。
        
        **考点：** 循环、条件判断
        `,
        tags: ['循环', '条件判断']
        },
        { id: 3, type: 'single', question: `下列关于 C++ 语言的叙述，正确的是（ ）。`, options: ['char 类型变量不能赋值给 int 类型变量', '两个 int 类型变量相乘，结果仍为 int 类型', '两个 int 相乘溢出时程序会报错崩溃', 'double 相除且除数为 0.0 时程序会报错崩溃'], answer: 1, score: 2, explanation: `**答案：B**
        
        **解析：**
        int * int 的结果类型仍为 int。
        
        - **A char 类型变量不能赋值给 int 类型变量**：错误。与题目要求不符，请对照正确解析重新理解。
        - **B 两个 int 类型变量相乘，结果仍为 int 类型**：正确答案。
        - **C 两个 int 相乘溢出时程序会报错崩溃**：错误。C++ 对某些写法可能不会报错，而是产生隐式转换。
        - **D double 相除且除数为 0.0 时程序会报错崩溃**：错误。C++ 对某些写法可能不会报错，而是产生隐式转换。
        
        **考点：** 变量与标识符、程序分析
        `,
        tags: ['变量与标识符', '程序分析']
        },
        { id: 4, type: 'single', question: `下列关于 C++ 语句规则的叙述，不正确的是（ ）。`, options: ['if 的判断条件必须放在小括号中', 'for 语句中间循环条件可省略，表示恒为真', '循环体有多条语句时用缩进即可消除二义性', '运算符有优先级，不仅有先乘除后加减'], answer: 2, score: 2, explanation: `**答案：C**
        
        **解析：**
        多条语句必须用花括号，不是靠缩进。
        
        - **A if 的判断条件必须放在小括号中**：错误。与题目要求不符，请对照正确解析重新理解。
        - **B for 语句中间循环条件可省略，表示恒为真**：错误。与题目要求不符，请对照正确解析重新理解。
        - **C 循环体有多条语句时用缩进即可消除二义性**：正确答案。
        - **D 运算符有优先级，不仅有先乘除后加减**：错误。与题目要求不符，请对照正确解析重新理解。
        
        **考点：** 循环、基础语法
        `,
        tags: ['循环', '基础语法']
        },
        { id: 5, type: 'single', question: `以下哪个是 C++ 语言关键字（ ）。`, options: ['main', 'max', 'double', 'sqrt'], answer: 2, score: 2, explanation: `**答案：C**
        
        **解析：**
        double 是关键字，其余是常见标识符/函数名。
        
        - **A main**：错误。与题目要求不符，请对照正确解析重新理解。
        - **B max**：错误。与题目要求不符，请对照正确解析重新理解。
        - **C double**：正确答案。
        - **D sqrt**：错误。与题目要求不符，请对照正确解析重新理解。
        
        **考点：** 变量与标识符
        `,
        tags: ['变量与标识符']
        },
        { id: 6, type: 'single', question: `以下哪个不是 C++ 语言运算符（ ）。`, options: ['>=', '/=', '||', '<>'], answer: 3, score: 2, explanation: `**答案：D**
        
        **解析：**
        <> 不是 C++ 运算符。
        
        - **A >=**：错误。与题目要求不符，请对照正确解析重新理解。
        - **B /=**：错误。与题目要求不符，请对照正确解析重新理解。
        - **C ||**：错误。与题目要求不符，请对照正确解析重新理解。
        - **D <>**：正确答案。
        
        **考点：** 运算符
        `,
        tags: ['运算符']
        },
        { id: 7, type: 'single', question: `若 a 为 int、b 为 char，下列哪个语句不符合 C++ 语法（ ）。`, options: ['a = a+1.0;', 'a = (int)(b-\'0\');', 'b = (char)(a+\'0\');', '(int)b = a;'], answer: 3, score: 2, explanation: `**答案：D**
        
        **解析：**
        强制类型转换结果不是可赋值左值。
        
        - **A a = a+1.0;**：错误。与题目要求不符，请对照正确解析重新理解。
        - **B a = (int)(b-\0\);**：错误。与题目要求不符，请对照正确解析重新理解。
        - **C b = (char)(a+\0\);**：错误。与题目要求不符，请对照正确解析重新理解。
        - **D (int)b = a;**：正确答案。
        
        **考点：** 变量与标识符、运算符
        `,
        tags: ['变量与标识符', '运算符']
        },
        { id: 8, type: 'single', question: `用 int 变量 a、b 表示平行四边形边长，int 变量 h 表示 a 边对应高，以下哪个表达式不能用于计算 b 边对应高（ ）。`, options: ['a / b * (0.0+h)', '(0.0+a * h) / b', 'a * h / (b+0.0)', '(a+0.0) * h / b'], answer: 0, score: 2, explanation: `**答案：A**
        
        **解析：**
        A 中先发生 int/int，易丢失精度。
        
        - **A a / b * (0.0+h)**：正确答案。
        - **B (0.0+a * h) / b**：错误。与题目要求不符，请对照正确解析重新理解。
        - **C a * h / (b+0.0)**：错误。与题目要求不符，请对照正确解析重新理解。
        - **D (a+0.0) * h / b**：错误。与题目要求不符，请对照正确解析重新理解。
        
        **考点：** 运算符、程序分析
        `,
        tags: ['运算符', '程序分析']
        },
        { id: 9, type: 'single', question: `以下哪个循环语句会无限次执行（ ）。`, options: ['for (int a = 0; a; a++) ;', 'for (bool b = false; b <= true; b++) ;', 'for (char c = \'A\'; c < \'z\'; c++) ;', 'for (double d = 0.0; d < 10.0; d += 0.001) ;'], answer: 1, score: 2, explanation: `**答案：B**
        
        **解析：**
        bool 自增后会保持 true，条件始终成立。
        
        - **A for (int a = 0; a; a++) ;**：错误。该代码逻辑与题目要求不符，请逐步推演。
        - **B for (bool b = false; b <= true; b++) ;**：正确答案。
        - **C for (char c = \A\; c < \z\; c++) ;**：错误。该代码逻辑与题目要求不符，请逐步推演。
        - **D for (double d = 0.0; d < 10.0; d += 0.00...**：错误。与题目要求不符，请对照正确解析重新理解。
        
        **考点：** 循环、程序分析
        `,
        tags: ['循环', '程序分析']
        },
        { id: 10, type: 'single', question: `若 char 变量 a 的值为 'C'（ASCII 67），执行 cout << (a+2); 输出（ ）。`, options: ['E', 'C+2', 'C2', '69'], answer: 3, score: 2, explanation: `**答案：D**
        
        **解析：**
        表达式提升为 int，输出数值 69。
        
        - **A E**：错误。与题目要求不符，请对照正确解析重新理解。
        - **B C+2**：错误。与题目要求不符，请对照正确解析重新理解。
        - **C C2**：错误。与题目要求不符，请对照正确解析重新理解。
        - **D 69**：正确答案。
        
        **考点：** 输入输出、运算符
        `,
        tags: ['输入输出', '运算符']
        },
        { id: 11, type: 'single', question: `若 a、b 均为 int，能正确判断“a 等于 1 且 b 等于 1”的表达式是（ ）。`, options: ['(a == b) && (b == 1)', '(a && b)', '(a == b == 1)', '(a * b == 1)'], answer: 0, score: 2, explanation: `**答案：A**
        
        **解析：**
        A 选项明确表达两个条件同时成立。
        
        - **A (a == b) && (b == 1)**：正确答案。
        - **B (a && b)**：错误。与题目要求不符，请对照正确解析重新理解。
        - **C (a == b == 1)**：错误。该代码逻辑与题目要求不符，请逐步推演。
        - **D (a * b == 1)**：错误。该代码逻辑与题目要求不符，请逐步推演。
        
        **考点：** 条件判断、运算符
        `,
        tags: ['条件判断', '运算符']
        },
        { id: 12, type: 'single', question: `若 a 为 char，哪个表达式可正确判断“a 是数字字符”（ ）。`, options: ['\'0\' <= a && a <= \'9\'', '\'1\' <= a && a <= \'0\'', '\'0\' <= a <= \'9\'', '\'1\' <= a <= \'0\''], answer: 0, score: 2, explanation: `**答案：A**
        
        **解析：**
        需使用 && 连接两个比较。
        
        - **A \\'0\\' <= a && a <= \\'9\\'**：正确答案。需要用 && 连接两个比较。
        - **B \\'1\\' <= a && a <= \\'0\\'**：错误。下界和上界的字符顺序反了。
        - **C \\'0\\' <= a <= \\'9\\'**：错误。C++ 不支持连续比较运算符，会先算 \\'0\\' <= a 得到 0 或 1，再与 \\'9\\' 比较。
        - **D \\'1\\' <= a <= \\'0\\'**：错误。同样不支持连续比较，且上下界顺序反了。
        
        **考点：** 条件判断、运算符
        `,
        tags: ['条件判断', '运算符']
        },
        { id: 13, type: 'single', question: `在给定代码横线处填入（ ），使得最终输出字符是 9。`, options: ['(a+b)', '(a+b-\'0\')', '(char)(a+b)', '(char)(a+b-\'0\')'], answer: 3, score: 2, explanation: `**答案：D**
        
        **解析：**
        需先按 ASCII 计算并转换回 char。
        
        - **A (a+b)**：错误。与题目要求不符，请对照正确解析重新理解。
        - **B (a+b-\0\)**：错误。与题目要求不符，请对照正确解析重新理解。
        - **C (char)(a+b)**：错误。与题目要求不符，请对照正确解析重新理解。
        - **D (char)(a+b-\0\)**：正确答案。
        
        **考点：** 程序分析、运算符
        `,
        tags: ['程序分析', '运算符']
        },
        { id: 14, type: 'single', question: `在给定循环代码横线处填写（ ），可以使输出为 42。`, options: ['i % 3 == 0', '20 % i == 0', 'i <= 8', 'i >= 18'], answer: 1, score: 2, explanation: `**答案：B**
        
        **解析：**
        根据原题程序模拟可得 B。
        
        - **A i % 3 == 0**：错误。取模运算的结果需要仔细计算，注意运算符优先级。
        - **B 20 % i == 0**：正确答案。
        - **C i <= 8**：错误。与题目要求不符，请对照正确解析重新理解。
        - **D i >= 18**：错误。与题目要求不符，请对照正确解析重新理解。
        
        **考点：** 循环、程序分析
        `,
        tags: ['循环', '程序分析']
        },
        { id: 15, type: 'single', question: `执行给定 C++ 程序后，输出结果是（ ）。`, options: ['A', 'B', 'C', 'D'], answer: 2, score: 2, explanation: `**答案：C**
        
        **解析：**
        根据原卷答案，第15题为 C。
        
        - **A A**：错误。与题目要求不符，请对照正确解析重新理解。
        - **B B**：错误。与题目要求不符，请对照正确解析重新理解。
        - **C C**：正确答案。
        - **D D**：错误。与题目要求不符，请对照正确解析重新理解。
        
        **考点：** 程序分析
        `,
        tags: ['程序分析']
        },

        { id: 16, type: 'judge', question: `内存 64KB 的 CEC-I 若存放 GB2312 的 6763 个汉字（每字 2 字节），占用不超过 1/5 内存。`, options: ['正确', '错误'], answer: 1, score: 2, explanation: `**答案：错误**
        
        **判定依据：**
        约 13.21KB，超过 64KB 的 1/5。
        
        **纠错：** 原命题说法有误。约 13.21KB，超过 64KB 的 1/5。
        
        **易混概念：** CPU 负责运算和判断，内存负责存储数据，两者职能不同，不能混淆。
        
        **考点：** 判断题
        `,
        tags: ['判断题']
        },
        { id: 17, type: 'judge', question: `域名 gesp.ccf.org.cn 的顶级域名是 gesp。`, options: ['正确', '错误'], answer: 1, score: 2, explanation: `**答案：错误**
        
        **判定依据：**
        顶级域名是最右侧 cn。
        
        **纠错：** 原命题说法有误。顶级域名是最右侧 cn。
        
        **易混概念：** 注意区分相关概念的适用范围和边界条件。
        
        **考点：** 判断题
        `,
        tags: ['判断题']
        },
        { id: 18, type: 'judge', question: `在 C++ 中，使用 sqrt、abs 等数学函数前需包含 <cmath> 或 <math.h>。`, options: ['正确', '错误'], answer: 0, score: 2, explanation: `**答案：正确**
        
        **判定依据：**
        数学函数通常需对应头文件声明。
        
        **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
        
        **考点：** 判断题
        `,
        tags: ['判断题']
        },
        { id: 19, type: 'judge', question: `在 C++ 中，下划线“_”既可用于标识符命名，也是运算符。`, options: ['正确', '错误'], answer: 1, score: 2, explanation: `**答案：错误**
        
        **判定依据：**
        _ 不是 C++ 运算符。
        
        **纠错：** 原命题说法有误。_ 不是 C++ 运算符。
        
        **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
        
        **考点：** 判断题
        `,
        tags: ['判断题']
        },
        { id: 20, type: 'judge', question: `若 a 为 double 且 a=3.5，则 a*10 结果是 35 且类型为 int。`, options: ['正确', '错误'], answer: 1, score: 2, explanation: `**答案：错误**
        
        **判定依据：**
        结果类型为 double。
        
        **纠错：** 原命题说法有误。结果类型为 double。
        
        **易混概念：** C++ 基本数据类型大小固定：char(1字节)、bool(1字节)、int(通常4字节)、double(8字节)。
        
        **考点：** 判断题
        `,
        tags: ['判断题']
        },
        { id: 21, type: 'judge', question: `if 语句中，若条件成立需执行多条语句，可用花括号把这些语句括起来。`, options: ['正确', '错误'], answer: 0, score: 2, explanation: `**答案：正确**
        
        **判定依据：**
        这是标准写法。
        
        **易混概念：** 注意区分相关概念的适用范围和边界条件。
        
        **考点：** 判断题
        `,
        tags: ['判断题']
        },
        { id: 22, type: 'judge', question: `循环语句的循环体有可能无限制执行下去。`, options: ['正确', '错误'], answer: 0, score: 2, explanation: `**答案：正确**
        
        **判定依据：**
        循环条件始终为真时会无限循环。
        
        **易混概念：** 死循环通常因为循环条件永远为真，或循环体内修改循环变量的方式导致条件无法变为假。
        
        **考点：** 判断题
        `,
        tags: ['判断题']
        },
        { id: 23, type: 'judge', question: `++ 和 == 是 C++ 运算符，但 += 不是。`, options: ['正确', '错误'], answer: 1, score: 2, explanation: `**答案：错误**
        
        **判定依据：**
        += 也是运算符。
        
        **纠错：** 原命题说法有误。+= 也是运算符。
        
        **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
        
        **考点：** 判断题
        `,
        tags: ['判断题']
        },
        { id: 24, type: 'judge', question: `若 a 为 char 且值为大写字母 F，执行 a = a+1 后，a 变为 G。`, options: ['正确', '错误'], answer: 0, score: 2, explanation: `**答案：正确**
        
        **判定依据：**
        ASCII 顺延一位。
        
        **易混概念：** C++ 基本数据类型大小固定：char(1字节)、bool(1字节)、int(通常4字节)、double(8字节)。
        
        **考点：** 判断题
        `,
        tags: ['判断题']
        },
        { id: 25, type: 'judge', question: `表达式 sqrt(9.0) 的结果为 3，且结果类型为 int。`, options: ['正确', '错误'], answer: 1, score: 2, explanation: `**答案：错误**
        
        **判定依据：**
        sqrt 返回 double。
        
        **纠错：** 原命题说法有误。sqrt 返回 double。
        
        **易混概念：** C++ 基本数据类型大小固定：char(1字节)、bool(1字节)、int(通常4字节)、double(8字节)。
        
        **考点：** 判断题
        `,
        tags: ['判断题']
        },
    ],
    programmingQuestions: [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `2 10`, output: `4` },
        { input: `98 100`, output: `0` }
      ],
      question: `
# [GESP202306 二级] 找素数

## 题目描述

小明刚刚学习了素数的概念：如果一个大于 $1$ 的正整数，除了 $1$ 和它自身外，不能被其他正整数整除，则这个正整数是素数。现在，小明想找到两个正整数 $A$ 和 $B$ 之间（包括 $A$ 和 $B$）有多少个素数。

## 输入格式

输入只有一行两个正整数 $A, B$。约定 $2 \\le A \\le B \\le 1000$。

## 输出格式

输出一行，包含一个整数 $C$，表示找到 $C$ 个素数。
`,
      score: 25,
      explanation: "在区间 [A,B] 中枚举每个整数，判断它是否是素数；若是素数就把答案加一。",
      tags: ["编程题", "枚举", "素数"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nbool isPrime(int x) {\n    if (x < 2) return false;\n    for (int d = 2; d * d <= x; ++d) {\n        if (x % d == 0) return false;\n    }\n    return true;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int A, B;\n    cin >> A >> B;\n    int ans = 0;\n    for (int x = A; x <= B; ++x) if (isPrime(x)) ++ans;\n    cout << ans << '\\n';\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `3
152
111
153`, output: `F
F
T` },
        { input: `5
8208
548834
88593477
12345
5432`, output: `T
T
T
F
F` }
      ],
      question: `
# [GESP202306 二级] 自幂数判断

## 题目描述

自幂数是指，一个 $N$ 位数，满足各位数字 $N$ 次方之和是本身。例如，$153$ 是 $3$ 位数，其每位数的 $3$ 次方之和，$1^3+5^3+3^3=153$，因此 $153$ 是自幂数；$1634$ 是 $4$ 位数，其每位数的 $4$ 次方之和，$1^4+6^4+3^4+4^4=1634$，因此 $1634$ 是自幂数。现在，输入若干个正整数，请判断它们是否是自幂数。

## 输入格式

输入第一行是一个正整数 $M$，表示有 $M$ 个待判断的正整数。约定 $1 \\le M \\le 100$。

从第 $2$ 行开始的 $M$ 行，每行一个待判断的正整数。约定这些正整数均小于 $10^8$。

## 输出格式

输出 $M$ 行，如果对应的待判断正整数为自幂数，则输出英文大写字母 $\\texttt T$，否则输出英文大写字母 $\\texttt F$。

提示：不需要等到所有输入结束在依次输出，可以输入一个数就判断一个数并输出，再输入下一个数。
`,
      score: 25,
      explanation: "设整数有 len 位，拆出它的每一位并累加 digit^len。若结果恰好等于原数，就是自幂数。",
      tags: ["编程题", "模拟", "数位分解"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nlong long ipow(long long a, int b) {\n    long long r = 1;\n    while (b--) r *= a;\n    return r;\n}\n\nbool ok(long long x) {\n    string s = to_string(x);\n    int len = (int)s.size();\n    long long sum = 0, t = x;\n    while (t > 0) {\n        sum += ipow(t % 10, len);\n        t /= 10;\n    }\n    return sum == x;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int M;\n    cin >> M;\n    while (M--) {\n        long long x;\n        cin >> x;\n        cout << (ok(x) ? 'T' : 'F') << '\\n';\n    }\n    return 0;\n}",
      answer: '',
    }
]
};
