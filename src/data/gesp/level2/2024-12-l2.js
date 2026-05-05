// 2024年12月 GESP C++ 二级真题 (第8次认证)
export const paperData = {
    id: '2024-12-l2',
    title: '2024年12月 GESP C++ 二级真题',
    level: 2,
    year: 2024,
    month: 12,
    session: 8,
    note: '年度收官',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: `2024年10月8日，诺贝尔物理学奖“意外地”颁给了两位计算机科学家（Hopfield、Hinton），两人的主要研究方向是（ ）。`,
            options: ['天体物理', '流体力学', '人工智能', '量子理论'],
            answer: 2,
            score: 2,
            explanation: `**答案：C (人工智能)**

**选项逐项分析：**
- **A 天体物理**：❌ 错误。天体物理是研究宇宙天体物理性质的学科。
- **B 流体力学**：❌ 错误。流体力学研究流体运动规律。
- **C 人工智能**：✅ 正确。2024年诺贝尔物理学奖授予了 John Hopfield 和 Geoffrey Hinton，以表彰他们在利用人工神经网络实现机器学习方面的奠基性发现。
- **D 量子理论**：❌ 错误。并非本次获奖的直接研究领域。

**考点：** 计算机发展前沿资讯、人工智能史实`,
            tags: ['计算机基础']
        },
        {
            id: 2,
            type: 'single',
            question: `计算机系统中存储的基本单位用 B 表示，它代表的是（ ）。`,
            options: ['Byte', 'Block', 'Bulk', 'Bit'],
            answer: 0,
            score: 2,
            explanation: `**答案：A (Byte)**

**选项逐项分析：**
- **A Byte**：✅ 正确。大写字母 \`B\` 代表 Byte（字节），是计算机存储的基本单位，1 Byte = 8 bits。
- **B Block**：❌ 错误。指磁盘或文件系统的“块”。
- **C Bulk**：❌ 错误。非标准容量单位。
- **D Bit**：❌ 错误。Bit（位）通常用小写字母 \`b\` 表示。

**考点：** 计算机存储单位及其缩写规范`,
            tags: ['计算机基础']
        },
        {
            id: 3,
            type: 'single',
            question: `C++ 语句 cout << (3 + 3 % 3 * 2 - 1) 执行后输出的值是（ ）。`,
            options: ['-1', '4', '56', '2'],
            answer: 3,
            score: 2,
            explanation: `**答案：D (2)**

**解析：**
遵循运算符优先级（先乘除模，后加减）：
1. \`3 % 3 = 0\`（取模）
2. \`0 * 2 = 0\`（乘法）
3. \`3 + 0 - 1 = 2\`（加减）
因此最终输出结果为 2。

**考点：** 算术运算符优先级判定`,
            tags: ['算术运算']
        },
        {
            id: 4,
            type: 'single',
            question: `下面 C++ 代码执行后其输出是（ ）。\n\`\`\`cpp\nfor (int i = 0; i < 10; i++) printf("%d", i);\n\`\`\``,
            options: ['0123456789', '0,1,2,3,4,5,6,7,8,9', '0 1 2 3 4 5 6 7 8 9', '12345678910'],
            answer: 0,
            score: 2,
            explanation: `**答案：A (0123456789)**

**解析：**
1. 循环从 \`i=0\` 开始，到 \`i=9\` 结束（不含 10）。
2. \`printf("%d", i)\` 格式化字符串中没有任何空格或逗号。
3. 因此所有输出的数字会连续紧挨着排列。

**考点：** for 循环边界、printf 格式化输出控制`,
            tags: ['程序分析']
        },
        {
            id: 5,
            type: 'single',
            question: `下面 C++ 代码的相关说法中，正确的是（ ）。\n\`\`\`cpp\nint tnt; for (int i = 0; i < 10; i++) tnt += i; cout << tnt;\n\`\`\``,
            options: ['求 1-10 的和（含10）', '求 1-10 的和（不含10）', '求 0-10 的和（不含10）', '将输出不确定的值'],
            answer: 3,
            score: 2,
            explanation: `**答案：D (将输出不确定的值)**

**解析：**
在 C++ 中，局部变量 \`int tnt;\` 被定义时如果没有显式初始化，其初始值是存储在该内存位置的随机数据。虽然循环逻辑是在做 0-9 的累加，但由于起始值不确定，最终结果也将是不确定的随机值。

**考点：** 变量初始化的必要性、未定义行为风险`,
            tags: ['变量初始化']
        },
        {
            id: 6,
            type: 'single',
            question: `下面 C++ 代码执行后其输出是（ ）。\n\`\`\`cpp\nint i = 1; for ( ; i < 10; i++) { if (i % 2) continue; else break; } cout << i;\n\`\`\``,
            options: ['1', '2', '10', '11'],
            answer: 1,
            score: 2,
            explanation: `**答案：B (2)**

**解析：**
1. \`i = 1\`: \`1 % 2\` 为真，执行 \`continue\`，跳转到 \`i++\`。此时 \`i\` 变 2。
2. \`i = 2\`: \`2 % 2\` 为假，执行 \`else\` 分支的 \`break\`，立即退出循环。
3. 循环结束后输出 \`i\` 的当前值 2。

**考点：** continue 与 break 在循环控制中的逻辑分歧`,
            tags: ['循环控制']
        },
        {
            id: 7,
            type: 'single',
            question: `下面 C++ 代码执行后其输出是（ ）。\n\`\`\`cpp\nint i = 0; for ( ; i < 10; i++) { if (i % 3) continue; cout << "0#"; } cout << "1#";\n\`\`\``,
            options: ['0#0#0#0#1#', '0#1#', '0#0#1#', '0#0#0#0#'],
            answer: 0,
            score: 2,
            explanation: `**答案：A (0#0#0#0#1#)**

**解析：**
1. 循环 \`i\` 从 0 到 9。
2. 当 \`i % 3\` 不为 0 时（即不被 3 整除时），执行 \`continue\` 跳过。
3. 满足 \`i % 3 == 0\` 的数字有：0, 3, 6, 9。
4. 这 4 个数字每个都会输出一个 \`0#\`。
5. 循环结束，最后输出一个 \`1#\`。

**考点：** 逻辑过滤、循环外语句执行顺序`,
            tags: ['程序分析']
        },
        {
            id: 8,
            type: 'single',
            question: `下面代码输出 0 到 99 能被 7 整除但不能被 3 整除的数，横线处“不能”填入的代码是（ ）。`,
            options: ['i % 7 == 0 && i % 3 != 0', '!(i % 7) && i % 3 != 0', 'i % 7 && i % 3', 'i % 7 == 0 && !(i % 3 == 0)'],
            answer: 2,
            score: 2,
            explanation: `**答案：C (i % 7 && i % 3)**

**选项逐项分析：**
- **A / B / D**：❌ 错误（它们都能正确表达）。
- **C i % 7 && i % 3**：✅ 正确（该写法是错误的）。\`i % 7\` 在 C++ 中为真意味着结果非 0，即“不能被 7 整除”。这与题干“能被 7 整除”完全相反。

**考点：** 逻辑运算符的应用、数值真假的判定`,
            tags: ['逻辑运算']
        },
        {
            id: 9,
            type: 'single',
            question: `下面代码求正整数各位数字之和，横线处“不应”填入的是（ ）。\n\`\`\`cpp\nwhile (N != 0) { ____________ N /= 10; }\n\`\`\``,
            options: ['tnt = tnt + N % 10;', 'tnt += N % 10;', 'tnt = N % 10 + tnt;', 'tnt = N % 10;'],
            answer: 3,
            score: 2,
            explanation: `**答案：D (tnt = N % 10;)**

**选项逐项分析：**
- **A / B / C**：❌ 错误（它们都具有累加效果）。
- **D tnt = N % 10;**：✅ 正确（该写法是错误的）。该语句会覆盖 \`tnt\` 之前的值，而不是累加。最终 \`tnt\` 只会记录原数的最高位。

**考点：** 累加逻辑的正确实现、数位拆解模版`,
            tags: ['程序分析']
        },
        {
            id: 10,
            type: 'single',
            question: `执行下面 C++ 代码后其输出是（ ）。\n\`\`\`cpp\nint a = 3, b = 2;\nif (a = b) cout << "1#";\nelse cout << "2#";\ncout << a << b;\n\`\`\``,
            options: ['1#32', '2#32', '1#22', '2#22'],
            answer: 2,
            score: 2,
            explanation: `**答案：C (1#22)**

**解析：**
1. \`if (a = b)\` 这里的 \`=\` 是**赋值**运算符，而不是 \`==\`。
2. 该表达式将 \`b\` 的值 (2) 赋给 \`a\`。
3. 赋值表达式的结果为被赋的值，即 2。
4. 2 在 C++ 中视为“真”，因此执行 \`if\` 分支，输出 \`1#\`。
5. 此时 $a=2, b=2$，最后的 \`cout << a << b\` 输出 \`22\`。

**考点：** 赋值运算符的返回值、数值与布尔逻辑的隐式转换、常见赋值陷阱`,
            tags: ['程序分析']
        },
        {
            id: 11,
            type: 'single',
            question: `关于输出九九乘法表代码的说法，错误的是（ ）。`,
            options: ['将换行语句移入内层循环效果相同', 'printf("\\n") 与 cout << endl 效果一致', '%-2d 代表左对齐占据 2 个字符', '循环条件 Hang < 10 可改为 Hang <= 9'],
            answer: 0,
            score: 2,
            explanation: `**答案：A (将换行语句移入内层循环效果相同)**

**选项逐项分析：**
- **A**：✅ 正确（说法错误）。移入内层会导致每打印一个等式就换行。
- **B / C / D**：❌ 错误（说法正确）。

**考点：** 嵌套循环逻辑、格式化输出`,
            tags: ['程序设计']
        },
        {
            id: 12,
            type: 'single',
            question: `计算 1!+2!+...+10! 的正确初始化方案是（ ）。`,
            options: ['i从1到9累加', 'nowNum初始化为0', 'nowNum从0开始乘积', 'tnt=0, nowNum=1, i从1到10循环'],
            answer: 3,
            score: 2,
            explanation: `**答案：D (tnt=0, nowNum=1, i从1到10循环)**

**解析：**
累加器 \`tnt\` 必须从 0 开始。累乘器 \`nowNum\`（用于算阶乘）必须从 1 开始。循环应覆盖到 10。

**考点：** 累加与累乘器的初始化规范`,
            tags: ['算法']
        },
        {
            id: 13,
            type: 'single',
            question: `求 1 到 M 之间的所有孪生素数，若判断条件为 (isPrime(i) && isPrime(i+2))，则循环上界应为（ ）。`,
            options: ['M', 'M-2', 'M+2', 'M / 2'],
            answer: 1,
            score: 2,
            explanation: `**答案：B (M-2)**

**解析：**
为了保证 \`isPrime(i+2)\` 中的 \`i+2\` 不超过上限 \`M\`，循环变量 \`i\` 的最大值必须是 \`M - 2\`。

**考点：** 边界控制、索引越界预防`,
            tags: ['程序分析']
        },
        {
            id: 14,
            type: 'single',
            question: `输出高度为 5 的金字塔图形，第 i 行（i 从 0 开始）的空格和星号规律应为（ ）。`,
            options: ['height-i, i * 2-1', 'height-i-1, i * 2+1', 'height-i, i * 2+1', 'height-i-1, i * 2-1'],
            answer: 1,
            score: 2,
            explanation: `**答案：B (height-i-1, i * 2+1)**

**解析：**
- 第 0 行：4 空格 (5-0-1)，1 星号 (2*0+1)
- 第 1 行：3 空格 (5-1-1)，3 星号 (2*1+1)
符合该规律的公式为 B。

**考点：** 字符图形模拟、数列规律推演`,
            tags: ['图形输出']
        },
        {
            id: 15,
            type: 'single',
            question: `以下哪个 C++ 表达式的结果不是 30？`,
            options: ['max(10, max(20, 30))', 'min(30, (10+20))', 'sqrt(10+20+30)', '(10+20+30) / 2'],
            answer: 2,
            score: 2,
            explanation: `**答案：C (sqrt(10+20+30))**

**解析：**
\`sqrt(60)\` 约等于 7.746，显然不是 30。

**考点：** 数学函数应用`,
            tags: ['数学函数']
        },
        {
            id: 16,
            type: 'judge',
            question: `Windows 系统中，可通过快捷键 Ctrl+C 和 Ctrl+V 把一个文件复制多份副本。`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
Ctrl+C 复制，多次执行 Ctrl+V 粘贴即可建立多个副本。

**考点：** 操作系统基本操作`,
            tags: ['操作系统']
        },
        {
            id: 17,
            type: 'judge',
            question: `表达式 (N-N / 10 * 10) 的值就是整数 N 的个位数。`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
\`N / 10 * 10\` 抹去了个位。\`N\` 减去它即得个位。

**考点：** 算术运算特性`,
            tags: ['算术运算']
        },
        {
            id: 18,
            type: 'judge',
            question: `表达式 (10 <= N <= 12) 的值不论 N 为多少，其结果总是为真。`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
\`10 <= N\` 结果是 0 或 1，均小于等于 12。

**考点：** 逻辑运算结合性`,
            tags: ['逻辑运算']
        },
        {
            id: 19,
            type: 'judge',
            question: `int a = sqrt(N); 执行后，a 是 N 算术平方根的整数部分。`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
浮点数强制转换为整型会直接截断小数部分。

**考点：** 类型转换与数学函数`,
            tags: ['数学函数']
        },
        {
            id: 20,
            type: 'judge',
            question: `代码 printf("%%a*%%b=%d", a*b); 执行后其输出为 a*b=6。`,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
\`%%\` 会输出一个 \`%\` 字符。输出应为 \`%a*%b=6\`。

**考点：** printf 格式化转义`,
            tags: ['输入输出']
        },
        {
            id: 21,
            type: 'judge',
            question: `变量名不论长短，只要是由英文字母组成的，都是合法的。`,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
C++ 规定关键字（如 \`int\`, \`if\` 等）不能作为变量名。

**考点：** 标识符命名规范`,
            tags: ['变量命名']
        },
        {
            id: 22,
            type: 'judge',
            question: `执行 \`for (int i=0; i<10; i++) if(i < 10) continue; break;\` 后，循环退出时 i 的值是 0。`,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
当 \`i < 10\` 时一直执行 \`continue\`，直到 \`i\` 增加到 10。

**考点：** 循环追踪分析`,
            tags: ['程序分析']
        },
        {
            id: 23,
            type: 'judge',
            question: `计算 8, 6, 4 的累加和，输出结果为 18。`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
$8 + 6 + 4 = 18$。

**考点：** 算术基础`,
            tags: ['组合计数']
        },
        {
            id: 24,
            type: 'judge',
            question: `循环 \`if(i % 2) tnt++;\` 能够正确统计 0 到 10 之间的奇数个数。`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
奇数对 2 取模余 1（真），偶数余 0（假）。

**考点：** 逻辑判定与取模运算`,
            tags: ['程序分析']
        },
        {
            id: 25,
            type: 'judge',
            question: `通常说来，for 循环都可以用 while 循环实现。`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
两种循环结构在逻辑上是等价的，可以互换。

**考点：** 循环结构转换`,
            tags: ['循环结构']
        }
    ],
    programmingQuestions: [
        {
            id: 26,
            type: 'programming',
            title: "寻找数字",
            samples: [
                {
                    input: `3\n16\n81\n10`,
                    output: `2\n3\n-1`
                }
            ],
            question: `
# [GESP202412 二级] 寻找数字

## 题目描述

小杨有一个正整数 $a$，小杨想知道是否存在一个正整数 $b$ 满足 $a=b^4$。

## 输入格式

第一行包含一个正整数 $t$，代表测试数据组数。
对于每组测试数据，第一行包含一个正整数代表 $a$。

## 输出格式

对于每组测试数据，如果存在满足条件的正整数 $b$，则输出 $b$，否则输出 $-1$。
`,
            score: 25,
            explanation: `**解析：**
本题考察数学运算与精度校验。
1. **开方策略**：求 $a$ 的 4 次方根。可以使用 \`pow(a, 0.25)\` 或连续两次 \`sqrt\`。
2. **精度处理**：由于浮点运算存在微小误差，开方结果应使用 \`round\` 或 \`+0.5\` 后取整。
3. **合法性验证**：必须再次计算 $b^4$ 并与原数 $a$ 对比，确保它是精确的整数解。

**核心逻辑提示：**
\`\`\`cpp
long long b = round(pow(a, 0.25));
if (b * b * b * b == a) cout << b;
else cout << -1;
\`\`\``,
            tags: ["编程题", "数学", "开方"],
            template: "#include <iostream>\n#include <cmath>\nusing namespace std;\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <iostream>\n#include <cmath>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int t; cin >> t;\n    while(t--) {\n        long long a; cin >> a;\n        long long b = round(pow(a, 0.25));\n        if (b * b * b * b == a) cout << b << endl;\n        else cout << -1 << endl;\n    }\n    return 0;\n}"
        },
        {
            id: 27,
            type: 'programming',
            title: "数位和",
            samples: [
                {
                    input: `3\n16\n81\n10`,
                    output: `9`
                }
            ],
            question: `
# [GESP202412 二级] 数位和

## 题目描述

小杨有 $n$ 个正整数，小杨想知道这些正整数的数位和中最大值是多少。

## 输入格式

第一行包含一个正整数 $n$，代表正整数个数。
之后 $n$ 行，每行包含一个正整数。

## 输出格式

输出这些正整数的数位和的最大值。
`,
            score: 25,
            explanation: `**解析：**
本题考察数位拆解与最值维护。
1. **拆解函数**：编写一个函数或在循环内利用 \`% 10\` 和 \`/ 10\` 提取每一位数字并求和。
2. **维护最大值**：设置初始变量 \`max_sum = 0\`，每算出一个数的数位和，就用 \`max\` 函数更新一次最大值。
3. **数据类型**：题目未明确数字上限，建议使用 \`long long\` 接收输入以保安全。

**核心逻辑提示：**
\`\`\`cpp
int current_sum = 0;
while (num > 0) {
    current_sum += num % 10;
    num /= 10;
}
res = max(res, current_sum);
\`\`\``,
            tags: ["编程题", "数位处理", "统计"],
            template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <iostream>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    int ans = 0;\n    while(n--) {\n        long long a; cin >> a;\n        int s = 0;\n        while(a > 0) { s += a % 10; a /= 10; }\n        ans = max(ans, s);\n    }\n    cout << ans << endl;\n    return 0;\n}"
        }
    ]
};
