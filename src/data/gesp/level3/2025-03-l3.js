// 2025年3月 GESP C++ 三级真题 (第9次认证)
// 数据说明：本卷以官方真题 PDF 为主完成回填。
//-客观题 1~15：题面、选项与单选答案可由官方 PDF 文本层直接提取并整理。
//-判断题 16~25：题面来自官方 PDF；官方 PDF 文本层未完整带出答案表，当前答案依据官方题面+公开解析交叉复核填写。
//-编程题 26~27：题名、题意、样例与参考代码主体来自官方 PDF；其中个别数学符号/数据范围因 PDF 文本层缺字，按官方题意做等价整理。
export const paperData = {
    id: '2025-03-l3',
    title: '2025年3月 GESP C++ 三级真题',
    level: 3,
    year: 2025,
    month: 3,
    session: 9,
    timeLimit: 90 * 60,
    source: {
        officialPdf: 'https://gesp.ccf.org.cn/101/attach/1670868226801696.pdf',
        notes: '客观题 25 题已尽量补齐；其中判断题答案因官方 PDF 文本层未完整带出答案表，现依据官方题面与公开解析交叉复核。编程题 2 题已补题意、样例与参考代码；少量公式符号按官方题意等价整理。'
    },
    questions: [
        {
            id: 1,
            type: 'single',
            question: `Base64 编码将每 3 字节的输入数据编码为 4 字节的输出数据。如果输入数据长度不是 3 的倍数，会用 = 号填充。在 Base64 编码中，如果输入字符串的长度为 10 字节，编码后的字符串长度是多少（ ）`,
            options: ['12 字节', '13 字节', '14 字节', '16 字节'],
            answer: 3,
            score: 2,
            explanation: `**答案：D (16 字节)**
            
**选项逐项分析：**
- **D 16 字节**：✅ 正确。
  1. Base64 编码的原理是将每 3 字节的原始数据处理为 4 字节的编码数据。
  2. 10 字节的输入数据可以看作：$3 \text{字节} + 3 \text{字节} + 3 \text{字节} + 1 \text{字节}$，共需要占用 4 个编码块。
  3. 每个块无论输入是 3 字节还是 1 字节（剩余部分会补 \`=\`），最终输出都是 4 字节。
  4. 因此，编码后的总长度为 $4 \times 4 = 16$ 字节。
- **A/B/C**：❌ 错误。

**考点：** Base64 编码原理与长度计算规则`,
            tags: ['字符与ASCII', '字符串', '计算机基础'],
        },
        {
            id: 2,
            type: 'single',
            question: `UTF-8 编码规则如下：\n1 字节：0xxxxxxx\n2 字节：110xxxxx 10xxxxxx\n3 字节：1110xxxx 10xxxxxx 10xxxxxx\n4 字节：11110xxx 10xxxxxx 10xxxxxx 10xxxxxx\n以下哪个字节序列是合法的 UTF-8 编码（ ）`,
            options: ['0xC0 0x80', '0xF0 0x90 0x80 0x80', '0x80 0x80 0x80', '0xFF 0xFE 0xFD'],
            answer: 1,
            score: 2,
            explanation: `**答案：B (0xF0 0x90 0x80 0x80)**
            
**选项逐项分析：**
- **B 0xF0 0x90 0x80 0x80**：✅ 正确。\`0xF0\` 的二进制是 \`11110000\`，匹配 4 字节 UTF-8 的起始格式。随后的三个字节均以 \`10\` 开头（\`0x90\`, \`0x80\`），符合规则。
- **A 0xC0 0x80**：❌ 错误。虽然格式匹配 2 字节，但属于“过长编码”（可以用 1 字节表示的字符强行用 2 字节表示），在标准中是非法的。
- **C 0x80 0x80 0x80**：❌ 错误。UTF-8 序列不能以续字节 \`10xxxxxx\` 开头。
- **D 0xFF 0xFE 0xFD**：❌ 错误。\`0xFF\` 和 \`0xFE\` 在 UTF-8 编码中不是合法的起始字节。

**考点：** UTF-8 编码的多字节表示规则`,
            tags: ['进制转换', '计算机基础'],
        },
        {
            id: 3,
            type: 'single',
            question: `在 8 位二进制原码表示中，八进制数 -5 的二进制形式是什么（ ）`,
            options: ['10000101', '11111010', '11111011', '00000101'],
            answer: 0,
            score: 2,
            explanation: `**答案：A (10000101)**
            
**选项逐项分析：**
- **A 10000101**：✅ 正确。
  1. 题目要求的是 8 位原码。
  2. \`-5\` 是负数，符号位（最高位）设为 1。
  3. 数值部分 5 的二进制是 \`0000101\`（补齐 7 位）。
  4. 拼接得到 \`10000101\`。
- **B/C**：❌ 错误。分别是 -5 的反码和补码。
- **D**：❌ 错误。这是正数 5 的原码。

**考点：** 二进制原码表示法`,
            tags: ['二进制', '补码', '进制转换'],
        },
        {
            id: 4,
            type: 'single',
            question: `十进制数 111.111 的二进制表示可以是下面的（ ）`,
            options: ['1101111.0001110001', '1101110.1001110001', '1101111.1001110001', '1101111.0011110001'],
            answer: 0,
            score: 2,
            explanation: `**答案：A (1101111.0001110001)**
            
**选项逐项分析：**
- **A 1101111.0001110001**：✅ 正确。
  1. 整数部分：$111 = 64 + 32 + 8 + 4 + 2 + 1 \to 1101111_2$。
  2. 小数部分：$0.111 \times 2 = 0.222 (0) \to 0.444 (0) \to 0.888 (0) \to 1.776 (1) \dots$ 得到 \`0.0001...\`。
  3. 组合即得 A。
- **B/C/D**：❌ 错误。整数部分或小数起始位不匹配。

**考点：** 十进制转二进制（整数除 2 取余，小数乘 2 取整）`,
            tags: ['二进制', '补码', '数制转换'],
        },
        {
            id: 5,
            type: 'single',
            question: `在 C++ 中，补码的主要作用是（ ）`,
            options: ['提高浮点数的精度', '简化整数的加减法运算', '增加整数的表示范围', '优化内存分配'],
            answer: 1,
            score: 2,
            explanation: `**答案：B (简化整数的加减法运算)**
            
**选项逐项分析：**
- **B 简化整数的加减法运算**：✅ 正确。补码的主要设计目标是统一加法和减法运算，使得计算机内部只需一套加法器硬件电路即可完成加减法，极大简化了逻辑电路设计。
- **A/C/D**：❌ 错误。不是补码的主要作用。

**考点：** 补码的设计意图与运算优势`,
            tags: ['二进制', '补码', '计算机基础'],
        },
        {
            id: 6,
            type: 'single',
            question: `在 C++ 中，一个 8 位有符号整数（使用补码表示）的范围是（ ）`,
            options: ['-128 到 127', '-127 到 128', '-256 到 255', '0 到 255'],
            answer: 0,
            score: 2,
            explanation: `**答案：A (-128 到 127)**
            
**选项逐项分析：**
- **A -128 到 127**：✅ 正确。8 位有符号整数包含 1 位符号位和 7 位数值位。补码表示法下，正数最大为 $01111111 (127)$，负数最小为 $10000000 (-128)$。
- **B/C/D**：❌ 错误。

**考点：** 有符号整型（补码表示）的数值范围计算`,
            tags: ['二进制', '补码'],
        },
        {
            id: 7,
            type: 'single',
            question: `在 C++ 中，以下代码的输出是什么（ ）\n\`\`\`cpp\nint a = -5;\nunsigned int b = a;\ncout << b;\n\`\`\``,
            options: ['-5', '5', '4294967291', '编译错误'],
            answer: 2,
            score: 2,
            explanation: `**答案：C (4294967291)**
            
**选项逐项分析：**
- **C 4294967291**：✅ 正确。
  1. \`-5\` 在 32 位系统中的补码表示为 \`0xFFFFFFFB\`。
  2. 当将其赋值给 \`unsigned int\` 时，内存位模式保持不变，但解释方式变为无符号数。
  3. \`0xFFFFFFFB\` 对应的无符号十进制值为 $2^{32} - 5 = 4294967296 - 5 = 4294967291$。
- **A/B/D**：❌ 错误。

**考点：** 补码内存表示与有符号/无符号类型的强制转换机制`,
            tags: ['二进制', '补码', '位运算', '类型转换', '运算符', '未定义行为', '计算机基础'],
        },
        {
            id: 8,
            type: 'single',
            question: `下列程序的作用是（ ）\n\`\`\`cpp\nint main() {\n int decimal = 25;\n cout << oct << decimal;\n return 0;\n}\n\`\`\``,
            options: ['将十进制数转换成八进制数', '将八进制数转换成十进制数', '将二进制数转换成八进制数', '将八进制数转换成 16 进制数'],
            answer: 0,
            score: 2,
            explanation: `**答案：A (将十进制数转换成八进制数)**
            
**选项逐项分析：**
- **A**：✅ 正确。\`oct\` 是 C++ 的流操纵符（Manipulator），它会告诉输出流 \`cout\` 以八进制形式显示后续的整数值。
- **B/C/D**：❌ 错误。

**考点：** C++ I/O 流操纵符（oct, hex, dec）的使用`,
            tags: ['二进制', '补码', '进制转换', '数制转换', '位运算'],
        },
        {
            id: 9,
            type: 'single',
            question: `下面程序是将十进制转十六进制，横线处应该填入的是（ ）\n\`\`\`cpp\n#include <iostream>\nusing namespace std;\nint main() {\n int decimal = 255;\n ________________________\n return 0;\n}\n\`\`\``,
            options: ['cout << oct << decimal;', 'cout << decimal << decimal;', 'cout << hex << decimal;', '不能正确执行'],
            answer: 2,
            score: 2,
            explanation: `**答案：C (cout << hex << decimal;)**

**核心解析：**
C++ 输出格式控制

**选项逐项分析：**
- **A cout << oct << decimal;**：❌ 错误。该选项与题干条件或 C++ 规则不一致，属于干扰项。
- **B cout << decimal << decimal;**：❌ 错误。该选项与题干条件或 C++ 规则不一致，属于干扰项。
- **C cout << hex << decimal;**：✅ 正确。输入输出题要区分“原样输出的字符串”和“会被计算的表达式”，并检查空格、换行、格式占位是否完全匹配。
- **D 不能正确执行**：❌ 错误。该选项与题干条件或 C++ 规则不一致，属于干扰项。

**解题步骤：**
1. 审题：明确代码输入、输出目标和会改变结果的语句
2. 追踪：逐行执行代码，记录关键变量或输出片段
3. 涉及字符运算时转成 ASCII 值理解
4. 验证：用最终变量状态或输出结果逐项排除

**易错提醒：**
- '0' 的 ASCII 值是 48，不等于整数 0
- C 风格字符串以 \\0 结尾

**考点：** C++ 输出格式控制`,
            tags: ['进制转换', '位运算', '逻辑判断'],
        },
        {
            id: 10,
            type: 'single',
            question: `以下代码的说法正确的是什么（ ）\n\`\`\`cpp\n#include <iostream>\nusing namespace std;\nint main() {\n int a = 0b1101;\n int b = 0b1011;\n cout << (a ^ b);\n return 0;\n}\n\`\`\``,
            options: ['进行的是整体异或运算', '进行的是按位同或运算', '进行的是按位与运算', '进行的是按位异或运算'],
            answer: 3,
            score: 2,
            explanation: `**答案：D (进行的是按位异或运算)**
            
**选项逐项分析：**
- **D**：✅ 正确。在 C++ 中，\`^\` 运算符代表按位异或（Bitwise XOR）。
- **A**：❌ 错误。不存在所谓的“整体异或”逻辑概念。
- **B**：❌ 错误。同或运算在 C++ 中没有直接的位运算符。
- **C**：❌ 错误。按位与是 \`&\`。

**考点：** C++ 位运算符的符号含义辨析`,
            tags: ['位运算', '异或'],
        },
        {
            id: 11,
            type: 'single',
            question: `下面枚举法查找最大值索引程序中，横线处应该填写的是（ ）\n\`\`\`cpp\n#include <iostream>\nusing namespace std;\nint main() {\n int arr[] = {3, 7, 2, 9, 5};\n int maxIndex = 0;\n for (int i = 1; i < 5; i++) {\n ____________________________\n {\n maxIndex = i;\n }\n }\n cout << maxIndex;\n return 0;\n}\n\`\`\``,
            options: ['if (arr[maxIndex] > arr[i])', 'if (arr[i]-1 > arr[maxIndex])', 'if (arr[i]+1 > arr[maxIndex])', 'if (arr[i] > arr[maxIndex])'],
            answer: 3,
            score: 2,
            explanation: `**答案：D (if (arr[i] > arr[maxIndex]))**
            
**选项逐项分析：**
- **D**：✅ 正确。查找最大值索引的逻辑是：如果当前位置的元素 \`arr[i]\` 大于之前记录的最大值元素 \`arr[maxIndex]\`，则更新索引 \`maxIndex\` 为当前位置 \`i\`。
- **A/B/C**：❌ 错误。

**考点：** 查找最值算法中的逻辑判断`,
            tags: ['位运算', '枚举', '算法思维', '循环'],
        },
        {
            id: 12,
            type: 'single',
            question: `以下代码的功能是将数组中的奇数和偶数分别放在数组的前半部分和后半部分，横线处应该填入的是（ ）\n\`\`\`cpp\nint arr[] = {1, 2, 3, 4, 5};\nint left = 0, right = 4;\nwhile (left < right) {\n while (arr[left] % 2 == 1 && left < right) left++;\n ________________________________\n if (left < right) {\n swap(arr[left], arr[right]);\n }\n}\nfor (int i = 0; i < 5; i++) {\n cout << arr[i] << " ";\n}\n\`\`\``,
            options: ['while (arr[left] % 2 == 0 && left < right) right--;', 'while (arr[right] % 2 == 0 && left < right) left--;', 'while (arr[right] % 2 != 0 && left < right) right--;', 'while (arr[right] % 2 == 0 && left < right) right--;'],
            answer: 3,
            score: 2,
            explanation: `**答案：D (while (arr[right] % 2 == 0 && left < right) right--;)**
            
**选项逐项分析：**
- **D**：✅ 正确。该算法旨在使用双指针将奇数置前。当右指针指向偶数时，它是已经在“后半部分”的合法位置，因此右指针应向左移动（\`right--\`）跳过这些偶数，去寻找需要交换的奇数。
- **A/B/C**：❌ 错误。指针移动逻辑或判断条件有误。

**考点：** 双指针划分算法及其循环不变性维护`,
            tags: ['数组', '循环', '逻辑判断'],
        },
        {
            id: 13,
            type: 'single',
            question: `下面程序最后能够得到 HelloC++ 的是（ ）\n\`\`\`cpp\nint main() {\n string str = "HelloWorld";\n ___________________\n cout << str;\n return 0;\n}\n\`\`\``,
            options: ['str.replace(0, 5, "C++");', 'str.replace(5, 5, "C++");', 'str.replace(1, 5, "C++");', 'str.replace(4, 5, "C++");'],
            answer: 1,
            score: 2,
            explanation: `**答案：B (str.replace(5, 5, "C++");)**
            
**选项逐项分析：**
- **B str.replace(5, 5, "C++")**：✅ 正确。\`str = "HelloWorld"\`。下标 5 开始的子串是 \`"World"\`（长度为 5）。替换后变为 \`"Hello" + "C++" = "HelloC++"\`。
- **A/C/D**：❌ 错误。替换位置或范围不正确。

**考点：** string 类的 replace() 方法应用`,
            tags: ['位运算', '逻辑判断'],
        },
        {
            id: 14,
            type: 'single',
            question: `想要得到字符串 World，下面程序横线处应该填入的是（ ）\n\`\`\`cpp\n#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n string str = "HelloC++";\n _________________\n _________________\n return 0;\n}\n\`\`\``,
            options: ['str.insert(4, "World");\ncout << str.substr(4, 4);', 'cout << str.substr(5, 5);', 'str.insert("World");\ncout << str.substr(5, 5);', 'str.insert(5, "World");\ncout << str.substr(5, 5);'],
            answer: 3,
            score: 2,
            explanation: `**答案：D (str.insert(5, "World");\ncout << str.substr(5, 5);)**
            
**选项逐项分析：**
- **D**：✅ 正确。
  1. \`str.insert(5, "World")\`：在 \`"HelloC++"\` 的下标 5（即 \`C\` 的位置）插入 \`"World"\`，字符串变为 \`"HelloWorldC++"\`。
  2. \`str.substr(5, 5)\`：从下标 5 开始截取长度为 5 的子串，正好是 \`"World"\`。
- **A/B/C**：❌ 错误。

**考点：** string 类的 insert() 与 substr() 联合应用`,
            tags: ['位运算', '字符串', 'substr', '逻辑判断'],
        },
        {
            id: 15,
            type: 'single',
            question: `有 n 个正整数，假设一个正整数是美丽数字当且仅当该正整数是 9 的倍数但不是 8 的倍数。下面的程序是编写计算 n 个正整数中美丽数字的数量，横线处应该填入的是（ ）\n\`\`\`cpp\nfor (int i = 1; i <= n; i++) {\n cin >> a;\n ________________________\n cnt++;\n}\n\`\`\``,
            options: ['if (a % 9 != 0 && a % 8 != 0)', 'if (a % 9 == 0 & a % 8 == 0)', 'if (a % 9 == 0 && a % 8 != 0)', 'if (a % 9 == 0 & a % 8 != 0)'],
            answer: 2,
            score: 2,
            explanation: `**答案：C (if (a % 9 == 0 && a % 8 != 0))**
            
**选项逐项分析：**
- **C**：✅ 正确。逻辑与运算符 \`&&\` 用于同时满足两个条件：“是 9 的倍数” (\`a % 9 == 0\`) 且 “不是 8 的倍数” (\`a % 8 != 0\`)。
- **A**：❌ 错误。逻辑是“既不是 9 的倍数也不是 8 的倍数”。
- **B/D**：❌ 错误。\`&\` 是按位与运算符，不建议在逻辑判断中直接代替 \`&&\`；且 B 的判断逻辑有误。

**考点：** 逻辑复合条件判定`,
            tags: ['位运算', '循环', '逻辑判断'],
        },
        {
            id: 16,
            type: 'judge',
            question: `判断一个三角形是否成立的条件只有：任意两边长度之和大于第三条边的长度。`,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**
            
            **判定依据：**
            现版本按公开解析与常见教材口径复核为错误；题解通常将“三边关系完整表述”视为不止这一条。该题答案不在官方 PDF 文本层中。
            
            **考点：** 
            `,
            tags: ['判断题'],
        },
        {
            id: 17,
            type: 'judge',
            question: `这段程序进行的是判断一个从键盘输入的字符的 ASCII 是否是奇数，若是，输出 YES，否则，输出 NO。\n\`\`\`cpp\nint main() {\n char x;\n scanf("%c", &x);\n int ASCII = (int)x;\n cout << (x & 1 ? "YES" : "NO") << "\\n";\n return 0;\n}\n\`\`\``,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
            
            **判定依据：**
            字符参与位运算时会按其 ASCII 值处理，x & 1 可判断最低位是否为 1，即是否为奇数。
            
            **考点：** 位运算、字符与ASCII
            `,
            tags: ['判断题', '位运算', '字符与ASCII'],
        },
        {
            id: 18,
            type: 'judge',
            question: `闰年的定义：普通闰年是公历年份是 4 的倍数且不是 100 的倍数；世纪闰年必须是 400 的倍数。下面程序是判断是否是闰年的正确程序。\ncin >> n;\n\`\`\`cpp\ncout << ((n % 4 == 0 && n % 100 != 0) || (n % 400 == 0)) ? 1 : 0;\nreturn 0;\n\`\`\``,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
            
            **判定依据：**
            按题意判断逻辑本身是对的；现版本仍保留官方题面主体，答案来自公开解析复核。
            
            **考点：** 位运算、逻辑判断
            `,
            tags: ['判断题', '位运算', '逻辑判断'],
        },
        {
            id: 19,
            type: 'judge',
            question: `C++ 语句 cout << (n % 15 == 0 ? "YES" : "NO"); 能够判断一个整数能否被 3 和 5 同时整除。`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
            
            **判定依据：**
            能被 3 和 5 同时整除等价于能被 15 整除。
            
            **考点：** 位运算
            `,
            tags: ['判断题', '位运算'],
        },
        {
            id: 20,
            type: 'judge',
            question: `有 n 个同学，从中抽取任意个人数来参加学校组织的大合唱，共有 2 的 n 次幂个方法。`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
            
            **判定依据：**
            每个同学均有“选/不选”两种独立决策，因此总方案数为 $2^n$。
            
            **考点：** 
            `,
            tags: ['判断题'],
        },
        {
            id: 21,
            type: 'judge',
            question: `若将一个正整数化为二进制数，在此二进制数中，我们将数字 1 的个数是偶数的这类二进制数称为 A 类数，否则就称其为 B 类数。判断 (2025)10 化为二进制后，1 的个数为偶数个，因此 2025 为 A 类数。`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
            
            **判定依据：**
            2025 的二进制为 11111101001，其中 1 的个数是 8 个，为偶数。
            
            **考点：** 二进制、补码
            `,
            tags: ['判断题', '二进制', '补码'],
        },
        {
            id: 22,
            type: 'judge',
            question: `该段程序将 n 不停地除以 2，并输出此时的商和余数，直到 n = 0 为止。\nlong long n;\ncin >> n;\n\`\`\`cpp\nwhile (n != 0) {\n cout << n / 2 << " " << n % 2 << "\\n";\n n /= 2;\n}\n\`\`\``,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
            
            **判定依据：**
            循环每次输出当前 n 除以 2 的商与余数，再令 n /= 2，直到变为 0。
            
            **考点：** 位运算、循环
            `,
            tags: ['判断题', '位运算', '循环'],
        },
        {
            id: 23,
            type: 'judge',
            question: `两个 13 进制的数 A 和 B，在 10 进制下分别表示 10 和 11。 (A+B)13 = (18)13，也就是说 13 进制数 A 加上 13 进制数 B，和是 13 进制数 18。`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
            
            **判定依据：**
            A=10，B=11，和为 21；13 进制的 18 也表示 1×13+8=21，因此说法正确。
            
            **考点：** 
            `,
            tags: ['判断题'],
        },
        {
            id: 24,
            type: 'judge',
            question: `k 进制，逢 k 进第二位，逢 k² 进百位，逢 k³ 进千位。`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
            
            **判定依据：**
            这是位权表示的基本规则：个位、k 位、k² 位、k³ 位……。
            
            **考点：** 
            `,
            tags: ['判断题'],
        },
        {
            id: 25,
            type: 'judge',
            question: `CCF（十九进制）= 21AC（十三进制）（不区分大小写）。`,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**
            
            **判定依据：**
            CCF₁₉ = 12×19²+12×19+15 = 4575；21AC₁₃ = 2×13³+1×13²+10×13+12 = 4705，二者不相等。
            
            **考点：** 数制转换、字符与ASCII
            `,
            tags: ['判断题', '数制转换', '字符与ASCII'],
        }
    ],
    programmingQuestions: [
        {
      id: 26,
      type: 'programming',
      samples: [
        { input: `1025`, output: `1000` }
      ],
      question: `
# [GESP202503 三级] 2025

## 题目描述

小 A 有一个整数 $x$，他想找到最小的正整数 $y$ 使得下式成立：

$(x \\ \\operatorname{and} \\ y) + (x \\ \\operatorname{or} \\ y) = 2025$

其中 $\\operatorname{and}$ 表示二进制按位与运算，$\\operatorname{or}$ 表示二进制按位或运算。如果不存在满足条件的 $y$，则输出 $-1$。

## 输入格式

一行，一个整数 $x$。

## 输出格式

一行，一个整数，若满足条件的 $y$ 存在则输出 $y$，否则输出 $-1$。
`,
      explanation: `
      **解析：**
      由按位恒等式 (x & y)+(x | y) = x+y，可知只要 2025-x > 0，答案就是 2025-x；否则不存在正整数解。官方 PDF 参考程序使用 1..2025 暴力枚举，但可直接化简。
      `,
      template: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}',
      score: 25,
      tags: ['编程题', '位运算', '数学'],
      referenceCode: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long x;\n    cin >> x;\n    long long y = 2025-x;\n    if (y > 0) cout << y << "\\n";\n    else cout << -1 << "\\n";\n    return 0;\n}',
      answer: '',
    },
        {
      id: 27,
      type: 'programming',
      samples: [
        { input: `6
Apple
banana
apple
Orange
banana
apple`, output: `apple` }
      ],
      question: `
# [GESP202503 三级] 词频统计

## 题目描述

在文本处理中，统计单词出现的频率是一个常见的任务。现在，给定 $n$ 个单词，你需要找出其中出现次数最多的单词。在本题中，忽略单词中字母的大小写（即 \`Apple\`、\`apple\`、\`APPLE\`、\`aPPle\` 等均视为同一个单词）。

请你编写一个程序，输入 $n$ 个单词，输出其中出现次数最多的单词。

## 输入格式

第一行，一个整数 $n$，表示单词的个数；

接下来 $n$ 行，每行包含一个单词，单词由大小写英文字母组成。

输入保证，出现次数最多的单词只会有一个。

## 输出格式

输出一行，包含出现次数最多的单词（输出单词为小写形式）。
`,
      explanation: `
      **解析：**
      把每个单词统一转为小写后，用 map / unordered_map 统计出现次数，最后输出频次最大的那个单词即可。
      `,
      template: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}',
      score: 25,
      tags: ['编程题', '字符串', '哈希表'],
      referenceCode: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    map<string, int> cnt;\n    int best = -1;\n    string ans;\n\n    for (int i = 0; i < n; ++i) {\n        string s;\n        cin >> s;\n        for (char &c : s) c = tolower(static_cast<unsigned char>(c));\n        int cur = ++cnt[s];\n        if (cur > best) {\n            best = cur;\n            ans = s;\n        }\n    }\n\n    cout << ans << "\\n";\n    return 0;\n}',
      answer: '',
    }
    ]
};
