// 2025年6月 GESP C++ 三级真题 (第10次认证)
// 数据说明：本卷以官方真题 PDF 为主完成回填。
//-客观题 1~15：题面、选项与单选答案可由官方 PDF 文本层直接提取并整理。
//-判断题 16~25：题面来自官方 PDF；官方 PDF 文本层未完整带出答案表，当前答案依据公开解析交叉复核填写。
//-编程题 26~27：题名、题意、样例与参考代码主体来自官方 PDF；少量公式变量/范围符号因 PDF 文本层缺字，按官方题意做等价整理。
export const paperData = {
    id: '2025-06-l3',
    title: '2025年6月 GESP C++ 三级真题',
    level: 3,
    year: 2025,
    month: 6,
    session: 10,
    timeLimit: 90 * 60,
    source: {
        officialPdf: 'https://gesp.ccf.org.cn/101/attach/1699464809021472.pdf',
        notes: '客观题 25 题已尽量补齐；其中判断题答案因官方 PDF 文本层未完整带出答案表，现依据公开解析交叉复核。编程题 2 题已补题意、样例与参考代码；少量变量符号按官方题意等价整理。'
    },
    questions: [
        {
            id: 1,
            type: 'single',
            question: `8 位二进制原码能表示的最小整数是（ ）。`,
            options: ['-127', '-128', '-255', '-256'],
            answer: 0,
            score: 2,
            explanation: `**答案：A (-127)**
            
**选项逐项分析：**
- **A -127**：✅ 正确。8 位原码包含 1 位符号位和 7 位数值位。最大值为 $01111111 (+127)$，最小值为 $11111111 (-127)$。原码中 \`0\` 有两种表示（\`00000000\` 和 \`10000000\`），因此总共能表示 255 个不同的整数。
- **B -128**：❌ 错误。这是 8 位补码能表示的最小值。
- **C** / **D**：❌ 错误。

**考点：** 原码的存储结构与数值范围计算`,
            tags: ['二进制', '补码'],
        },
        {
            id: 2,
            type: 'single',
            question: `反码表示中，零的表示形式有（ ）。`,
            options: ['1 种', '2 种', '8 种', '16 种'],
            answer: 1,
            score: 2,
            explanation: `**答案：B (2 种)**
            
**选项逐项分析：**
- **B 2 种**：✅ 正确。在反码表示法中，数字 \`0\` 有两种编码形式：
  1. 正零 (\`+0\`)：二进制位全部为 0。
  2. 负零 (\`-0\`)：二进制位全部为 1（符号位为 1，数值位是原码全 0 的按位取反）。
- **A 1 种**：❌ 错误。这是补码的特性，补码通过规定 \`10000000\` 为 \`-128\` 消除了负零，使 0 只有一种表示。
- **C/D**：❌ 错误。

**考点：** 原码、反码、补码中“零”的编码多样性辨析`,
            tags: ['二进制', '补码'],
        },
        {
            id: 3,
            type: 'single',
            question: `补码 1011 1011 对应的真值是（ ）。`,
            options: ['-69', '-59', '-68', '-58'],
            answer: 0,
            score: 2,
            explanation: `**答案：A (-69)**
            
**选项逐项分析：**
- **A -69**：✅ 正确。
  1. 补码 \`1011 1011\` 最高位为 1，说明是负数。
  2. 逆向推导原码：先减 1 得到 \`1011 1010\`。
  3. 数值位（后 7 位）取反得到 \`1100 0101\`。
  4. 转换为十进制：$-(64 + 4 + 1) = -69$。
- **B/C/D**：❌ 错误。

**考点：** 负数补码向真值的转换计算`,
            tags: ['二进制', '补码'],
        },
        {
            id: 4,
            type: 'single',
            question: `若 X 的 8 位补码为 0000 1010，则 X / 2 的补码是（ ）。`,
            options: ['0000 0101', '1000 0101', '0000 0101 或 1000 0101', '算术右移后结果取决于符号位'],
            answer: 0,
            score: 2,
            explanation: `**答案：A (0000 0101)**
            
**选项逐项分析：**
- **A 0000 0101**：✅ 正确。
  1. 补码 \`0000 1010\` 符号位为 0，是正数，真值为 $8 + 2 = 10$。
  2. $10 / 2 = 5$。
  3. 正数 5 的 8 位补码即其原码：\`0000 0101\`。
- **B/C/D**：❌ 错误。

**考点：** 补码性质与算术右移（除法）的等价性`,
            tags: ['二进制', '补码', '位运算'],
        },
        {
            id: 5,
            type: 'single',
            question: `二进制数 1101.101 对应的十进制数是（ ）。`,
            options: ['13.625', '12.75', '11.875', '14.5'],
            answer: 0,
            score: 2,
            explanation: `**答案：A (13.625)**
            
**选项逐项分析：**
- **A 13.625**：✅ 正确。计算过程如下：
  - 整数部分：$1101_2 = 1 \times 2^3 + 1 \times 2^2 + 0 \times 2^1 + 1 \times 2^0 = 8 + 4 + 0 + 1 = 13$
  - 小数部分：$0.101_2 = 1 \times 2^{-1} + 0 \times 2^{-2} + 1 \times 2^{-3} = 0.5 + 0 + 0.125 = 0.625$
  - 合计：$13 + 0.625 = 13.625$。
- **B/C/D**：❌ 错误。

**考点：** 二进制小数向十进制的转换原理`,
            tags: ['二进制', '补码', '数制转换'],
        },
        {
            id: 6,
            type: 'single',
            question: `补码加法中，若符号位无进位而次高位有进位，则说明（ ）。`,
            options: ['结果正确', '发生上溢', '发生下溢', '结果符号位错误'],
            answer: 1,
            score: 2,
            explanation: `**答案：B (发生上溢)**
            
**选项逐项分析：**
- **B 发生上溢**：✅ 正确。在补码加法中，检测溢出的常用规则是：
  - 若符号位进位 $C_{sign}$ 与次高位进位 $C_{next}$ 不同，则发生溢出。
  - 本题中 $C_{sign} = 0, C_{next} = 1$，异或结果为 1，确认溢出。由于是正数相加导致结果进位到符号位，表现为“正正得负”，称为上溢。
- **A/C/D**：❌ 错误。

**考点：** 补码运算中的溢出检测原理（双进位判定法）`,
            tags: ['二进制', '补码'],
        },
        {
            id: 7,
            type: 'single',
            question: `八进制数 35.6 对应的十进制数是（ ）。`,
            options: ['29.75', '28.5', '27.625', '30.25'],
            answer: 0,
            score: 2,
            explanation: `**答案：A (29.75)**
            
**选项逐项分析：**
- **A 29.75**：✅ 正确。计算过程如下：
  - 整数部分：$35_8 = 3 \times 8^1 + 5 \times 8^0 = 24 + 5 = 29$
  - 小数部分：$0.6_8 = 6 \times 8^{-1} = 6/8 = 0.75$
  - 合计：$29 + 0.75 = 29.75$。
- **B/C/D**：❌ 错误。

**考点：** 八进制小数向十进制的转换原理`,
            tags: ['进制转换'],
        },
        {
            id: 8,
            type: 'single',
            question: `二进制数 1010 | 1100 的结果是（ ）。`,
            options: ['1000', '1110', '1010', '1100'],
            answer: 1,
            score: 2,
            explanation: `**答案：B (1110)**
            
**选项逐项分析：**
- **B 1110**：✅ 正确。按位或运算（\`|\`）规则：只要对应位有一个为 1，结果位即为 1。
  - \`1010\`
  - \`1100\`
  - \`----\`
  - \`1110\`
- **A/C/D**：❌ 错误。

**考点：** 位运算（按位或 \`|\`）的规则`,
            tags: ['二进制', '补码', '位运算'],
        },
        {
            id: 9,
            type: 'single',
            question: `以下哪个位运算可以交换两个变量的值（无需临时变量）（ ）。`,
            options: [
                'a = a ^ b; b = a ^ b; a = a ^ b;',
                'a = a & b; b = a | b; a = a & b;',
                'a = a | b; b = a ^ b; a = a ^ b;',
                'a = ~a; b = ~b; a = ~a;'
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A (a = a ^ b; b = a ^ b; a = a ^ b;)**
            
**选项逐项分析：**
- **A a = a ^ b; b = a ^ b; a = a ^ b;**：✅ 正确。利用异或运算的自反性（\`x ^ x = 0\`）和交换律实现交换：
  1. \`a = a ^ b\` (此时 \`a\` 存储了两个数的差异信息)
  2. \`b = (a ^ b) ^ b = a ^ (b ^ b) = a ^ 0 = a\` (此时 \`b\` 得到了原 \`a\` 的值)
  3. \`a = (a ^ b) ^ a = b ^ (a ^ a) = b ^ 0 = b\` (此时 \`a\` 得到了原 \`b\` 的值)
- **B/C/D**：❌ 错误。

**考点：** 位运算（异或 \`^\`）在变量交换中的应用`,
            tags: ['位运算', '异或', '按位取反', '逻辑判断'],
        },
        {
            id: 10,
            type: 'single',
            question: `如何正确定义一个长度为 5 的整型数组（ ）。`,
            options: ['int array = new int[5];', 'array int[5];', 'int[] array = {1,2,3,4,5};', 'int array[5];'],
            answer: 3,
            score: 2,
            explanation: `**答案：D (int array[5];)**
            
**选项逐项分析：**
- **D int array[5];**：✅ 正确。这是 C++ 中定义固定长度静态整型数组的标准语法。
- **A int array = new int[5];**：❌ 错误。\`new\` 返回的是指针，应定义为 \`int* array = new int[5];\`。
- **C int[] array = {1,2,3,4,5};**：❌ 错误。这是 Java/C# 的语法，C++ 中数组中括号应位于变量名之后。

**考点：** C++ 数组定义语法规范`,
            tags: ['数组'],
        },
        {
            id: 11,
            type: 'single',
            question: `下面程序使用枚举法（穷举法）求解满足条件的三位数，横线处应该填入的是（ ）。\n\`\`\`cpp\n#include <iostream>\nusing namespace std;\nint main() {\n int count = 0;\n for (int i = 100; i <= 999; i++) {\n int a = i / 100;\n __________________\n int c = i % 10;\n if (a * a+b * b == c * c) {\n count++;\n }\n }\n cout << count << endl;\n return 0;\n}\n\`\`\``,
            options: ['int b = (i / 10) / 10;', 'int b = (i / 10) % 10;', 'int b = (i % 10) / 10;', 'int b = (i % 10) % 10;'],
            answer: 1,
            score: 2,
            explanation: `**答案：B (int b = (i / 10) % 10;)**
            
**选项逐项分析：**
- **B int b = (i / 10) % 10;**：✅ 正确。提取三位数十位数字的标准方法是：先整除 10 去掉个位数，再对 10 取模得到个位（即原数的十位）。
- **A/C/D**：❌ 错误。

**考点：** 整数位值提取技巧（整除与取模组合使用）`,
            tags: ['位运算', '枚举', '算法思维', '循环', '逻辑判断'],
        },
        {
            id: 12,
            type: 'single',
            question: `下面程序模拟了一个简单的小球反弹过程，横线处应该填入的是（ ）。\n\`\`\`cpp\n#include <iostream>\nusing namespace std;\nint main() {\n int height = 10;\n int distance = 0;\n for (int i = 1; i <= 5; i++) { // 模拟 5 次落地\n __________________\n height /= 2;\n distance += height;\n }\n cout << distance << endl;\n return 0;\n}\n\`\`\``,
            options: ['distance += height / 2;', 'distance += height;', 'distance += height * 2;', 'distance += height+1;'],
            answer: 1,
            score: 2,
            explanation: `**答案：B (distance += height;)**
            
**选项逐项分析：**
- **B distance += height;**：✅ 正确。在计算总路程时，每次落地前，小球下落的距离等于它当前的高度 \`height\`。
- **A distance += height / 2;**：❌ 错误。路程不完整。
- **C distance += height * 2;**：❌ 错误。虽然反弹再落地总路程是高度的 2 倍，但由于循环内已经有一次 \`distance += height\`（反弹后的路程更新），此处只需加下落高度。

**考点：** 物理过程的循环逻辑模拟`,
            tags: ['位运算', '循环', '逻辑判断'],
        },
        {
            id: 13,
            type: 'single',
            question: `C++ 代码 \`string s = "GESP考试";\` 中，s 占据的字节数是（ ）。`,
            options: ['10', '8', '8 或 10', '取决于计算机采用什么编码'],
            answer: 3,
            score: 2,
            explanation: `**答案：D (取决于计算机采用什么编码)**
            
**选项逐项分析：**
- **D**：✅ 正确。\`std::string\` 内部存储的是字节序列。
  - 若采用 **UTF-8** 编码：中文字符占 3 字节，"GESP" (4B) + "考试" (6B) = 10 字节。
  - 若采用 **GBK** 编码：中文字符占 2 字节，"GESP" (4B) + "考试" (4B) = 8 字节。
- **A/B/C**：❌ 错误。

**考点：** 字符编码与 C++ 字符串底层存储的关系`,
            tags: ['字符与ASCII', '字符串', '计算机基础'],
        },
        {
            id: 14,
            type: 'single',
            question: `C++ 语句 \`string s = "Gesp Test";\` 执行 \`s.rfind("e")\` 以后，输出的是（ ）。`,
            options: ['1', '2', '6', '3'],
            answer: 2,
            score: 2,
            explanation: `**答案：C (6)**
            
**选项逐项分析：**
- **C 6**：✅ 正确。\`rfind\` 方法从字符串末尾开始查找指定的子串。
  - 字符串 \`"Gesp Test"\` 的索引：\`G(0), e(1), s(2), p(3), (4), T(5), e(6), s(7), t(8)\`。
  - 从后往前数，第一个出现的 \`"e"\` 位于索引 6。
- **A 1**：❌ 错误。这是 \`find\`（正向查找）的结果。
- **B/D**：❌ 错误。

**考点：** string 类的反向查找方法 rfind()`,
            tags: ['字符与ASCII', '字符串'],
        },
        {
            id: 15,
            type: 'single',
            question: `字符串 "Gesp考试" 的字符数是（ ）。`,
            options: ['10', '8', '6', '字符数多少取决于编码'],
            answer: 2,
            score: 2,
            explanation: `**答案：C (6)**
            
**选项逐项分析：**
- **C 6**：✅ 正确。字符串 "Gesp考试" 包含 4 个英文字母 ("G", "e", "s", "p") 和 2 个中文字符 ("考", "试")，总字符数为 6。
- **A 10**：❌ 错误。这是在 UTF-8 编码下的字节数。
- **B 8**：❌ 错误。这是在 GBK 编码下的字节数。
- **D**：❌ 错误。字符数（Character count）是逻辑概念，不随编码改变；编码只改变字节数（Byte count）。

**考点：** 字符数与字节数的概念辨析`,
            tags: ['字符与ASCII', '字符串', '计算机基础'],
        },
        {
            id: 16,
            type: 'judge',
            question: `C++ 中 string 的 == 运算符比较的是字符串的内存地址，而非内容。`,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**
            
            **判定依据：**
            string 的 == 比较的是字符串内容。
            
            **考点：** 字符串、计算机基础
            `,
            tags: ['判断题', '字符串', '计算机基础'],
        },
        {
            id: 17,
            type: 'judge',
            question: `string 的 substr(1, 3) 返回从下标 1 开始的 3 个字符的子串。`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
            
            **判定依据：**
            substr(pos, len) 的含义正是从 pos 开始取 len 个字符。
            
            **考点：** 字符串、substr
            `,
            tags: ['判断题', '字符串', 'substr'],
        },
        {
            id: 18,
            type: 'judge',
            question: `x 是浮点数，(x >> 1) 等价于 x / 2。`,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**
            
            **判定依据：**
            位移运算不能直接用于浮点数。
            
            **考点：** 位运算
            `,
            tags: ['判断题', '位运算'],
        },
        {
            id: 19,
            type: 'judge',
            question: `string("hello") == "hello" 的比较结果为 true。`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
            
            **判定依据：**
            两边内容相同，比较结果为 true。
            
            **考点：** 
            `,
            tags: ['判断题'],
        },
        {
            id: 20,
            type: 'judge',
            question: `sort 可以直接用于排序 set 中的元素。`,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**
            
            **判定依据：**
            set 自带有序性，且其迭代器不支持 sort 所需的随机访问。
            
            **考点：** 排序
            `,
            tags: ['判断题', '排序'],
        },
        {
            id: 21,
            type: 'judge',
            question: `(x & 1) == 0 可以判断整数 x 是否为偶数。`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
            
            **判定依据：**
            偶数最低位为 0，因此与 1 按位与后结果为 0。
            
            **考点：** 位运算
            `,
            tags: ['判断题', '位运算'],
        },
        {
            id: 22,
            type: 'judge',
            question: `string 的 substr(2, 10) 在字符串长度不足时会抛出异常。`,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**
            
            **判定依据：**
            当起始位置合法但长度超出时，substr 会截到字符串末尾，不会因此抛异常。
            
            **考点：** 字符串、substr
            `,
            tags: ['判断题', '字符串', 'substr'],
        },
        {
            id: 23,
            type: 'judge',
            question: `在数学纸面计算中，pow(2, 3) 的计算结果一定是 8，但是在 C++ 中，如果遇到数据类型是浮点数，那就不一定正确。`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
            
            **判定依据：**
            浮点计算存在精度误差，结果在某些场景下可能不是精确整数表示。
            
            **考点：** 
            `,
            tags: ['判断题'],
        },
        {
            id: 24,
            type: 'judge',
            question: `在 C++ 中，枚举的底层类型可以是非整型（如 float 或 double）。`,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**
            
            **判定依据：**
            枚举的底层类型必须是整型。
            
            **考点：** 枚举、算法思维
            `,
            tags: ['判断题', '枚举', '算法思维'],
        },
        {
            id: 25,
            type: 'judge',
            question: `函数声明 \`double f();\` 返回 int 时，会自动转换为 double。`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
            
            **判定依据：**
            返回表达式会按函数声明的返回类型自动转换。
            
            **考点：** 类型转换
            `,
            tags: ['判断题', '类型转换'],
        }
    ],
    programmingQuestions: [
        {
      id: 26,
      type: 'programming',
      samples: [
        { input: `4
71 69 83 80`, output: `13 1` },
        { input: `6
1 2 4 8 16 32`, output: `6 0` }
      ],
      question: `
# [GESP202506 三级] 奇偶校验

## 题目描述

数据在传输过程中可能出错，因此接收方收到数据后通常会校验传输的数据是否正确，奇偶校验是经典的校验方式之一。

给定 $n$ 个非负整数 $c_1, c_2, \\ldots, c_n$ 代表所传输的数据，它们的校验码取决于这些整数在二进制下 1 的数量之和的奇偶性。如果这些整数在二进制下共有奇数个 1，那么校验码为 1；否则校验码为 0。你能求出这些整数的校验码吗？

## 输入格式

第一行，一个正整数 $n$，表示所传输的数据量。

第二行，$n$ 个非负整数 $c_1, c_2, \\ldots, c_n$，表示所传输的数据。

## 输出格式

输出一行，两个整数，以一个空格分隔：

第一个整数表示 $c_1, c_2, \\ldots, c_n$ 在二进制下 1 的总数量；

第二个整数表示校验码（0 或 1）。
`,
      explanation: `
      **解析：**
      遍历所有输入数字，统计其二进制中 1 的个数之和 s，答案即为 \`s\` 和 \`s % 2\`。
      `,
      template: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}',
      score: 25,
      tags: ['编程题', '位运算', '统计'],
      referenceCode: '#include <cstdio>\nusing namespace std;\n\nint n, v;\n\nint main() {\n    scanf("%d", &n);\n    for (int i = 1; i <= n; i++) {\n        int c;\n        scanf("%d", &c);\n        while (c) {\n            v += c & 1;\n            c >>= 1;\n        }\n    }\n    printf("%d %d\\n", v, v & 1);\n    return 0;\n}',
      answer: '',
    },
        {
      id: 27,
      type: 'programming',
      samples: [
        { input: `4
1 4 3 3`, output: `16` },
        { input: `15
314 15926 53589793 238462643 383279502 8 8 4 1 9 7 1 6 9 3`, output: `4508143253` }
      ],
      question: `
# [GESP202506 三级] 分糖果

## 题目描述

有 $n$ 位小朋友排成一队等待老师分糖果。第 $i$ 位小朋友想要至少 $a_i$ 颗糖果，并且分给他的糖果数量必须比分给前一位小朋友的糖果数量更多，不然他就会不开心。

老师想知道至少需要准备多少颗糖果才能让所有小朋友都开心。你能帮帮老师吗？

## 输入格式

第一行，一个正整数 $n$，表示小朋友的人数。

第二行，$n$ 个正整数 $a_1, a_2, \\ldots, a_n$，依次表示每位小朋友至少需要的糖果数量。

## 输出格式

输出一行，一个整数，表示最少需要准备的糖果数量。
`,
      explanation: `
      **解析：**
      从左到右贪心。设前一位拿到 prev 颗，则当前位至少应拿 \`max(ai, prev+1)\` 颗，把这些值累加即可。
      `,
      template: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}',
      score: 25,
      tags: ['编程题', '贪心', '数组'],
      referenceCode: '#include <cstdio>\n#include <algorithm>\nusing namespace std;\n\nconst int N = 1005;\nint n, a[N];\nlong long ans;\n\nint main() {\n    scanf("%d", &n);\n    for (int i = 1; i <= n; i++) {\n        scanf("%d", &a[i]);\n        a[i] = max(a[i-1]+1, a[i]);\n        ans += a[i];\n    }\n    printf("%lld\\n", ans);\n    return 0;\n}',
      answer: '',
    }
    ]
};
