// 2024年6月 GESP C++ 三级真题 (第6次认证)
// 数据说明：本卷优先依据官方真题 PDF 回填；其中大部分客观题题面可直接由 PDF 文本层提取。
//-客观题 1~5、7~15、16~25：题面主要来自官方 PDF 文本层，少量代码/版式做了等价整理。
//-客观题 6、8、21、23、24：官方 PDF 为流程图/代码截图，现按官方题面+公开解析做等价还原。
//-判断题答案来自公开解析并与官方题面逐题复核；第 8~10 题的代码细节在 PDF 文本层有截断，现保留可核对题意。
//-编程题 2 题题名、题意、样例与参考代码来自官方 PDF，同时与公开 OJ 题号 B4003/B4004 对齐。
export const paperData = {
    id: '2024-06-l3',
    title: '2024年6月 GESP C++ 三级真题',
    level: 3,
    year: 2024,
    month: 6,
    session: 6,
    timeLimit: 90 * 60,
    source: {
        officialPdf: 'https://gesp.ccf.org.cn/101/attach/1621071490973728.pdf',
        notes: '客观题 25 题已尽量补齐；其中 6、8、21、23、24 题按官方题面结合公开解析等价还原；编程题已补 2 题摘要、样例与参考代码。'
    },
    questions: [
        {
            id: 1,
            type: 'single',
            question: `小杨父母带他到某培训机构给他报名参加 CCF 组织的 GESP 认证考试的第 1 级，那他可以选择的认证语言有（ ）种。`,
            options: ['1', '2', '3', '4'],
            answer: 2,
            score: 2,
            explanation: `**答案：C (3)**

**核心解析：**
GESP 认证体系基础知识

**选项逐项分析：**
- **A 1**：❌ 错误。/ B 2 / D 4： 错误。
- **B 2**：❌ 错误。该选项的中间运算结果或优先级处理不正确，建议逐步列出表达式求值过程。
- **C 3**：✅ 正确。GESP（编程能力等级认证）一级可选的语言目前共有三种：图形化编程、Python 和 C++。
- **D 4**：❌ 错误。该选项的中间运算结果或优先级处理不正确，建议逐步列出表达式求值过程。

**解题步骤：**
1. 先处理括号和单目运算
2. 再按乘除取模、加减、关系、逻辑的顺序计算
3. 遇到整数除法或取模时单独确认结果
4. 把每一步中间结果写出，避免心算跳步

**易错提醒：**
- 整数除法会截断小数部分
- % 只适用于整数运算

**考点：** GESP 认证体系基础知识`,
            tags: ['程序分析'],
        },
        {
            id: 2,
            type: 'single',
            question: `下面流程图在 yr 输入 2024 时，可以判定 yr 代表闰年，并输出 2 月是 29 天，则图中菱形框中应该填入（ ）。`,
            options: ['(yr%400==0) || (yr%4==0)', '(yr%400==0) || (yr%4==0 && yr%100!=0)', '(yr%400==0) && (yr%4==0)', '(yr%400==0) && (yr%4==0 && yr%100!=0)'],
            answer: 1,
            score: 2,
            explanation: `**答案：B ((yr%400==0) || (yr%4==0 && yr%100!=0))**

**核心解析：**
逻辑表达式综合应用（闰年判定算法）

**选项逐项分析：**
- **A (yr%400==0) || (yr%4==0)**：❌ 错误。漏掉了“不能被 100 整除”的限制条件，会导致像 1900 这种年份被错误判定。
- **B (yr%400==0) || (yr%4==0 && yr%100!=0)**：✅ 正确。这完整体现了闰年的定义：公历年份是 400 的倍数，或者是 4 的倍数但不是 100 的倍数。
- **C (yr%400==0) && (yr%4==0)**：❌ 错误。该选项没有沿着实际命中的分支执行，或误解了条件短路/互斥关系。
- **D (yr%400==0) && (yr%4==0 && yr%100!=0)**：❌ 错误。该选项没有沿着实际命中的分支执行，或误解了条件短路/互斥关系。

**解题步骤：**
1. 先处理括号和单目运算
2. 再按乘除取模、加减、关系、逻辑的顺序计算
3. 遇到整数除法或取模时单独确认结果
4. 把每一步中间结果写出，避免心算跳步

**易错提醒：**
- 整数除法会截断小数部分
- % 只适用于整数运算

**考点：** 逻辑表达式综合应用（闰年判定算法）`,
            tags: ['位运算', '流程图', '逻辑判断'],
        },
        {
            id: 3,
            type: 'single',
            question: `一般默认 64 位计算机系统中整型变量（int）仍是 32 位，则整数能够表示的数据范围是（ ）。`,
            options: ['-2^15 ~ 2^15-1', '-2^31 ~ 2^31', '-2^31 ~ 2^31-1', '-2^32 ~ 2^32-1'],
            answer: 2,
            score: 2,
            explanation: `**答案：C (-2^31 ~ 2^31-1)**
            
**选项逐项分析：**
- **A -2^15 ~ 2^15-1**：❌ 错误。这是 16 位有符号整数的范围。
- **B -2^31 ~ 2^31**：❌ 错误。正数范围由于包含 0，最大值应为 $2^{31}-1$。
- **C -2^31 ~ 2^31-1**：✅ 正确。在 32 位补码表示中，负数范围是 $-2^{31}$，正数范围是 $0$ 到 $2^{31}-1$。
- **D -2^32 ~ 2^32-1**：❌ 错误。这是 33 位有符号或 32 位无符号整数的范畴。

**考点：** 计算机数值表示（有符号整型的存储范围与补码原理）`,
            tags: ['位运算', '按位取反'],
        },
        {
            id: 4,
            type: 'single',
            question: `下列代码将十进制转化成八进制，则横线上应填入（ ）。\n\`\`\`cpp\n#include <iostream>\nusing namespace std;\nvoid decimal2octal(int decimal) {\n int oct_number[100];\n int i = 0;\n while (decimal > 0) {\n __________________________\n }\n for (int j = i-1; j >= 0; j--) cout << oct_number[j];\n cout << endl;\n}\n\`\`\``,
            options: ['oct_number[i] = decimal % 8;    decimal /= 8;', 'oct_number[i] = decimal / 8;    decimal %/= 8;', 'oct_number[i++] = decimal % 8;    decimal /= 8;', 'oct_number[i++] = decimal / 8;    decimal %= 8;'],
            answer: 2,
            score: 2,
            explanation: `**答案：C (oct_number[i++] = decimal % 8; decimal /= 8;)**

**核心解析：**
进制转换（短除法）的程序实现

**选项逐项分析：**
- **A oct_number[i] = decimal % 8; decimal /= 8;**：❌ 错误。该选项对循环执行次数、边界或变量更新的判断不准确。
- **B oct_number[i] = decimal / 8; decimal %/= 8;**：❌ 错误。该选项对循环执行次数、边界或变量更新的判断不准确。
- **C oct_number[i++] = decimal % 8; decimal /= 8;**：✅ 正确。正确项契合核心依据：1. decimal % 8：通过取模运算获取当前最低位的八进制数值。 2. oct_number[i++]：将数值存入数组并移动索引 i。 3. decimal /= 8：通过除法去掉已处理的低位，进入下一轮循环。
- **D oct_number[i++] = decimal / 8; decimal %= 8;**：❌ 错误。该选项对循环执行次数、边界或变量更新的判断不准确。

**解题步骤：**
1. 审题：明确代码输入、输出目标和会改变结果的语句
2. 追踪：逐行执行代码，记录关键变量或输出片段
3. 按访问顺序标记每一次读写位置
4. 验证：用最终变量状态或输出结果逐项排除

**易错提醒：**
- 把第 n 个元素写成下标 n
- 二维数组行列顺序写反

**考点：** 进制转换（短除法）的程序实现`,
            tags: ['进制转换', '位运算', '循环', '逻辑判断'],
        },
        {
            id: 5,
            type: 'single',
            question: `二进制数 101.11 对应的十进制数是（ ）。`,
            options: ['6.5', '5.5', '5.75', '5.25'],
            answer: 2,
            score: 2,
            explanation: `**答案：C (5.75)**
            
**选项逐项分析：**
- **C 5.75**：✅ 正确。计算过程如下：
  - 整数部分：$101_2 = 1 \times 2^2 + 0 \times 2^1 + 1 \times 2^0 = 4 + 0 + 1 = 5$
  - 小数部分：$0.11_2 = 1 \times 2^{-1} + 1 \times 2^{-2} = 0.5 + 0.25 = 0.75$
  - 合计：$5 + 0.75 = 5.75$。
- **A/B/D**：❌ 错误。

**考点：** 二进制小数向十进制的转换原理`,
            tags: ['二进制', '补码', '数制转换'],
        },
        {
            id: 6,
            type: 'single',
            question: `下列流程图的输出结果是（ ）。`,
            options: ['5', '10', '20', '30'],
            answer: 1,
            score: 2,
            explanation: `**答案：B (10)**
            
**选项逐项分析：**
- **B 10**：✅ 正确。根据题意对应的流程图逻辑模拟，该算法最终输出的数值为 10。
- **A/C/D**：❌ 错误。

**考点：** 流程图逻辑模拟与执行流程分析`,
            tags: ['流程图'],
        },
        {
            id: 7,
            type: 'single',
            question: `下列代码的输出结果是（ ）。\n\`\`\`cpp\n#include <iostream>\nusing namespace std;\nint main() {\n int a = 12;\n int result = a >> 2;\n cout << result << endl;\n return 0;\n}\n\`\`\``,
            options: ['12', '6', '3', '1'],
            answer: 2,
            score: 2,
            explanation: `**答案：C (3)**
            
**选项逐项分析：**
- **C 3**：✅ 正确。\`12\` 的二进制为 \`1100\`。右移 2 位后得到 \`0011\`，其十进制值为 3。右移 $n$ 位在数值上等同于整除 $2^n$，$12 / 2^2 = 3$。
- **A/B/D**：❌ 错误。

**考点：** 位运算（右移 \`>>\`）的数值含义`,
            tags: ['二进制', '补码', '位运算'],
        },
        {
            id: 8,
            type: 'single',
            question: `下列代码的输出结果是（ ）。\n\`\`\`cpp\n#include <iostream>\nusing namespace std;\nint main() {\n int a = 5;\n int b = 10;\n a = a ^ b;\n b = a ^ b;\n a = a ^ b;\n cout << "a = " << a << ", b = " << b << endl;\n return 0;\n}\n\`\`\``,
            options: ['a = 5, b = 10', 'a = 5, b = 5', 'a = 10, b = 5', 'a = 10, b = 10'],
            answer: 2,
            score: 2,
            explanation: `**答案：C (a = 10, b = 5)**
            
**选项逐项分析：**
- **C a = 10, b = 5**：✅ 正确。这是利用异或运算特性实现两个变量值交换的经典算法。执行三次异或后，\`a\` 得到了原始的 \`b\` (10)，\`b\` 得到了原始的 \`a\` (5)。
- **A/B/D**：❌ 错误。

**考点：** 位运算（异或 \`^\`）及其在变量交换中的应用`,
            tags: ['位运算', '异或'],
        },
        {
            id: 9,
            type: 'single',
            question: `如果字符串定义为 char str[] = "GESP";，则字符数组 str 的长度为（ ）。`,
            options: ['0', '4', '5', '6'],
            answer: 2,
            score: 2,
            explanation: `**答案：C (5)**
            
**选项逐项分析：**
- **C 5**：✅ 正确。字符数组定义为 \`char str[] = "GESP";\` 时，不仅包含 "G", "E", "S", "P" 这 4 个可见字符，还会自动在末尾添加一个空字符 \`\\0\`。因此数组的总长度（占用空间）为 5。
- **B 4**：❌ 错误。这是字符串的可见长度（由 \`strlen\` 返回），而非字符数组 \`str\` 的分配长度。
- **A/D**：❌ 错误。

**考点：** C 风格字符串存储机制与数组空间分配`,
            tags: ['字符与ASCII', '字符串', '字符数组', '数组'],
        },
        {
            id: 10,
            type: 'single',
            question: `在下列代码的横线处填写（ ），可以使得输出是“7”。\n\`\`\`cpp\n#include <iostream>\nusing namespace std;\nint main() {\n int array[5] = {3, 7, 5, 2, 4};\n int max = 0;\n for (int i = 0; i < 5; i++)\n if (______________)\n max = array[i];\n cout << max << endl;\n return 0;\n}\n\`\`\``,
            options: ['max > array[i]', 'max < array[i]', 'max = array[i]', '以上均不对'],
            answer: 1,
            score: 2,
            explanation: `**答案：B (max < array[i])**

**核心解析：**
循环遍历与最值维护算法

**选项逐项分析：**
- **A max > array[i]**：❌ 错误。这会输出数组的最小值（如果 max 初始值足够大）。
- **B max < array[i]**：✅ 正确。求最大值的逻辑是遍历数组，当发现当前元素 array[i] 大于已知最大值 max 时，更新 max。
- **C max = array[i]**：❌ 错误。混淆了比较运算符 ==（或 <）与赋值运算符 =。
- **D 以上均不对**：❌ 错误。题目中已经存在符合条件的正确选项，因此这个总括性的否定选项不成立。

**解题步骤：**
1. 审题：明确代码输入、输出目标和会改变结果的语句
2. 追踪：逐行执行代码，记录关键变量或输出片段
3. 按访问顺序标记每一次读写位置
4. 验证：用最终变量状态或输出结果逐项排除

**易错提醒：**
- 把第 n 个元素写成下标 n
- 二维数组行列顺序写反

**考点：** 循环遍历与最值维护算法`,
            tags: ['位运算', '循环'],
        },
        {
            id: 11,
            type: 'single',
            question: `小杨在做数学题，题目要求找出从 1 到 35 中能被 7 整除的数字，即 [7, 14, 21, 28, 35]，则横线处应填入哪个代码？（ ）\n\`\`\`cpp\n#include <iostream>\nusing namespace std;\nint main() {\n int arr[35];\n int count = 0;\n for (int i = 1; i <= 35; i++) {\n if (i % 7 == 0)\n __________________________\n }\n for (int i = 0; i < count; i++) cout << arr[i] << endl;\n return 0;\n}\n\`\`\``,
            options: ['arr[count++] = i;', 'arr[i] = count++;', 'arr[i] = count;', 'arr[count] = count++;'],
            answer: 0,
            score: 2,
            explanation: `**答案：A (arr[count++] = i;)**
            
**选项逐项分析：**
- **A arr[count++] = i;**：✅ 正确。先将符合条件的数字 \`i\` 存入数组的当前计数位置 \`arr[count]\`，随后将计数器 \`count\` 自增 1。
- **B/C/D**：❌ 错误。下标逻辑混乱或变量赋值顺序错误。

**考点：** 数组索引操作与后置自增运算的应用`,
            tags: ['位运算', '循环', '逻辑判断'],
        },
        {
            id: 12,
            type: 'single',
            question: `已知字符 '0' 的 ASCII 编码的十进制表示为 48，则执行下面 C++ 代码后，输出是（ ）。\n#include <iostream>\nusing namespace std;\nint main() {\n string s = "0629";\n int n = s.length();\n int x = 0;\n for (int i = 0; i < n; i++) x += s[i];\n cout << x << endl;\n return 0;\n}`,
            options: ['17', '158', '209', '316'],
            answer: 2,
            score: 2,
            explanation: `**答案：C (209)**
            
**选项逐项分析：**
- **C 209**：✅ 正确。
  - '0' 的 ASCII 为 48
  - '6' 的 ASCII 为 54
  - '2' 的 ASCII 为 50
  - '9' 的 ASCII 为 57
  累加总和：$48 + 54 + 50 + 57 = 209$。
- **A/B/D**：❌ 错误。

**考点：** 字符的 ASCII 编码性质与算术累加`,
            tags: ['位运算', '字符与ASCII', '循环'],
        },
        {
            id: 13,
            type: 'single',
            question: `某小学男子篮球队招募新成员，要求加入球队的成员身高在 135 厘米以上（不含 135 厘米）。本次报名的人员有 10 人，他们的身高分别是 125、127、136、134、137、138、126、135、140、145。完善以下代码，求出本次球队能够招募到新成员的人数？（ ）\n\`\`\`cpp\n#include <iostream>\nusing namespace std;\nint main() {\n int arr[10] = {125, 127, 136, 134, 137, 138, 126, 135, 140, 145};\n int count = 0;\n for (int i = 0; i < 10; i++)\n __________________________\n cout << count << endl;\n return 0;\n}\n\`\`\``,
            options: ['count = arr[i] > 135 ? 1 : 0;', 'count += arr[i] > 135 ? 1 : 0;', 'count++;', '以上都不对'],
            answer: 1,
            score: 2,
            explanation: `**答案：B (count += arr[i] > 135 ? 1 : 0;)**

**核心解析：**
统计计数算法与三目运算符的应用

**选项逐项分析：**
- **A count = arr[i] > 135 ? 1 : 0;**：❌ 错误。这会导致 count 每次循环都被重置，而非累加。
- **B count += arr[i] > 135 ? 1 : 0;**：✅ 正确。利用三目运算符判断身高是否超过 135：若超过则加 1，否则加 0，从而实现人数统计。
- **C count++;**：❌ 错误。无论条件是否满足都会增加。
- **D 以上都不对**：❌ 错误。题目中已经存在符合条件的正确选项，因此这个总括性的否定选项不成立。

**解题步骤：**
1. 审题：明确代码输入、输出目标和会改变结果的语句
2. 追踪：逐行执行代码，记录关键变量或输出片段
3. 按访问顺序标记每一次读写位置
4. 验证：用最终变量状态或输出结果逐项排除

**易错提醒：**
- 把第 n 个元素写成下标 n
- 二维数组行列顺序写反

**考点：** 统计计数算法与三目运算符的应用`,
            tags: ['循环', '逻辑判断'],
        },
        {
            id: 14,
            type: 'single',
            question: `下面可以正确输出 They're planning a party for their friend's birthday. 的 C++ 语句是？（ ）`,
            options: ['cout << \'They\\\'re planning a party for their friend\'\\s birthday." << endl;', 'cout << "They\\\'re planning a party for their friend\'s birthday.\'<< endl;', 'cout << \'They\'re planning a party for their friend\'s birthday.\'<< endl;', 'cout << "They\\\'re planning a party for their friend\\\'s birthday." << endl;'],
            answer: 3,
            score: 2,
            explanation: `**答案：D (cout << "They're planning a party for their friend's birthday." << endl;)**
            
**选项逐项分析：**
- **D**：✅ 正确。字符串内部包含单引号时，使用双引号包裹整个字符串是最简单且正确的做法。
- **A/B/C**：❌ 错误。引号嵌套不当或转义符缺失导致语法错误。

**考点：** 字符串字面量的定义与引号嵌套规则`,
            tags: ['位运算', '字符串', '逻辑判断'],
        },
        {
            id: 15,
            type: 'single',
            question: `如果执行下面 C++ 代码后，输出的结果是“gesp ccf org cn ”，则横线上应填入哪个代码？（ ）\n\`\`\`cpp\n#include <iostream>\nusing namespace std;\nint main() {\n string str = "gesp.ccf.org.cn";\n string delimiter = ".";\n string result = "";\n string token;\n size_t found = str.find(delimiter);\n while (found != string::npos) {\n token = str.substr(0, found);\n result += token;\n result += " ";\n __________________________\n found = str.find(delimiter);\n }\n result += str;\n result += " ";\n cout << result << endl;\n return 0;\n}\n\`\`\``,
            options: ['str = str.substr(found+delimiter.length(), str.length()-1);', 'str = str.substr(found, str.length());', 'str = str.substr(found, str.length()-1);', '以上都不对'],
            answer: 0,
            score: 2,
            explanation: `**答案：A (str = str.substr(found+delimiter.length(), str.length()-1);)**

**核心解析：**
字符串的分割逻辑与 substr() 函数应用

**选项逐项分析：**
- **A str = str.substr(found+delimiter.length(), str.length()-1);**：✅ 正确。循环题要抓住三件事：初始值、继续条件、每轮更新。先列变量表，再判断循环结束时的状态。
- **B str = str.substr(found, str.length());**：❌ 错误。提取范围逻辑错误，会导致死循环或截断错误。
- **C str = str.substr(found, str.length()-1);**：❌ 错误。该选项对循环执行次数、边界或变量更新的判断不准确。
- **D 以上都不对**：❌ 错误。题目中已经存在符合条件的正确选项，因此这个总括性的否定选项不成立。

**解题步骤：**
1. 审题：明确代码输入、输出目标和会改变结果的语句
2. 追踪：逐行执行代码，记录关键变量或输出片段
3. 涉及字符运算时转成 ASCII 值理解
4. 验证：用最终变量状态或输出结果逐项排除

**易错提醒：**
- '0' 的 ASCII 值是 48，不等于整数 0
- C 风格字符串以 \\0 结尾

**考点：** 字符串的分割逻辑与 substr() 函数应用`,
            tags: ['字符串', 'substr', '循环'],
        },
        {
            id: 16,
            type: 'judge',
            question: `GESP 测试是对认证者的编程能力进行等级认证，同一级别的能力基本上与编程语言无关。`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
            
**判定依据：**
GESP（编程能力等级认证）设计的核心理念是评估考生的通用算法思维和编程逻辑，而非特定语言的语法糖。虽然各级别提供 C++ 和 Python 等选项，但在相同级别下，其考查的逻辑结构、数学基础和算法复杂度要求是一致的。

**考点：** GESP 认证体系与编程通用能力定义`,
            tags: ['判断题'],
        },
        {
            id: 17,
            type: 'judge',
            question: `整数 -6 的 16 位补码可用十六进制表示为 FFFA。`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
            
**判定依据：**
1. **原码计算**：正数 \`6\` 的 16 位原码为 \`0000 0000 0000 0110\`。
2. **负数原码**：\`-6\` 的原码为 \`1000 0000 0000 0110\`。
3. **补码转换**：符号位不变，数值位取反加 1。
   - 取反：\`1111 1111 1111 1001\`
   - 加 1：\`1111 1111 1111 1010\`
4. **十六进制转换**：每 4 位二进制对应一位十六进制，即 \`F F F A\`。

**考点：** 负数的补码计算流程、进制转换（二进制与十六进制）`,
            tags: ['判断题', '二进制', '补码', '进制转换'],
        },
        {
            id: 18,
            type: 'judge',
            question: `补码的优点是可以将减法运算转化为加法运算，从而简化计算机的硬件设计。`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
            
**判定依据：**
补码的设计使得计算机可以使用同一套加法器电路来处理加法和减法运算（将减法 $A-B$ 转换为加法 $A + [-B]_{补}$）。这种统一性极大地简化了中央处理器（CPU）中算术逻辑单元（ALU）的设计难度和硬件成本。

**考点：** 补码的设计初衷与计算机硬件实现原理`,
            tags: ['判断题', '二进制', '补码'],
        },
        {
            id: 19,
            type: 'judge',
            question: `字符常量 '\\0' 常用来表示字符串结束，和字符常量 '0' 相同。`,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**
            
**判定依据：**
1. **\\0 (空字符)**：ASCII 码值为 0，主要用于标记 C 风格字符串的结尾。
2. **'0' (字符零)**：ASCII 码值为 48。
在程序逻辑中，\`\\0\` 被视为布尔假（false），而 \`'0'\` 的数值非零，被视为布尔真（true）。

**考点：** 字符常量、空字符与 ASCII 编码的差异`,
            tags: ['判断题', '字符与ASCII', '字符串'],
        },
        {
            id: 20,
            type: 'judge',
            question: `数组的所有元素在内存中可以不连续存放。`,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**
            
**判定依据：**
数组（Array）是一种**线性表**数据结构，它在内存中使用一组**连续的内存空间**来存储一组具有相同类型的数据。这种连续性正是数组能够实现“随机访问”（通过下标 O(1) 时间复杂度定位元素）的物理基础。

**考点：** 数组的物理存储特性（连续空间分配）`,
            tags: ['判断题', '数组', '计算机基础'],
        },
        {
            id: 21,
            type: 'judge',
            question: `C++ 中可以对数组和数组的每个基础类型的元素赋值。`,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**
            
**判定依据：**
在 C++ 中，数组名代表数组的首地址，是一个常量指针，不支持在定义后进行整体赋值（如 \`arr1 = arr2;\` 是非法的）。虽然可以使用初始化列表在定义时赋值，或者使用 \`std::copy\`、\`memcpy\` 及循环进行元素迁移，但“对数组赋值”这一宽泛表述在语法层面通常被判定为错误。

**考点：** 数组名的常量性质、数组整体赋值的限制`,
            tags: ['判断题', '数组'],
        },
        {
            id: 22,
            type: 'judge',
            question: `如果 a 为 int 类型变量，且表达式 ((a | 3) == 3) 的值为 true，则说明 a 在从 0 到 3 之间（可能为 0，也可能为 3）。`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
            
**判定依据：**
1. \`3\` 的二进制为 \`00...0011\`。
2. 表达式 \`(a | 3) == 3\` 意味着 \`a\` 的所有二进制位中，除了最低两位可能为 1 之外，其余位必须全部为 0。
3. 因此 \`a\` 可能的值为 \`00 (0)\`, \`01 (1)\`, \`10 (2)\`, \`11 (3)\`。
4. 这些值确实都在 0 到 3 的闭区间内。

**考点：** 位运算（按位或）的逻辑性质与数值范围判定`,
            tags: ['判断题', '位运算', '按位取反'],
        },
        {
            id: 23,
            type: 'judge',
            question: `执行下面 C++ 代码后，输出的结果是 8。\n\`\`\`cpp\nint a = 0b1010;\nint b = 01100;\nint c = a & b;\ncout << c << endl;\n\`\`\``,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**
            
**判定依据：**
1. \`a = 0b1010\`（二进制）：十进制值为 10。
2. \`b = 01100\`（八进制）：前导 \`0\` 表示八进制，其十进制值为 $1 \times 8^3 + 1 \times 8^2 = 512 + 64 = 576$。
3. \`c = a & b\`：即 \`10 & 576\`。由于 576 的低位（二进制 \`1001000000\`）与 10（二进制 \`1010\`）进行按位与，结果为 0，而非 8。

**考点：** C++ 数值字面量的前缀含义（0b、0、0x）、按位与运算`,
            tags: ['判断题', '进制转换', '位运算'],
        },
        {
            id: 24,
            type: 'judge',
            question: `执行下面 C++ 代码后，输出的结果不可能是 89781。\n\`\`\`cpp\n#include <iostream>\n#include <cstdlib>\n#include <ctime>\nusing namespace std;\nint main() {\n srand(time(NULL));\n int i = 1;\n int s[5];\n while (i <= 5) {\n int a = rand() % 10;\n if (a % 3 == (i+1) % 3)\n s[i++] = a;\n }\n for (int i = 1; i <= 5; i++) cout << s[i];\n cout << endl;\n return 0;\n}\n\`\`\``,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
            
**判定依据：**
1. **核心逻辑**：代码要求 \`a % 3 == (i+1) % 3\`。
2. **位置约束**（设输出数字序列为 $s_1 s_2 s_3 s_4 s_5$）：
   - $i=1$: $s_1 \% 3 = 2 \% 3 = 2$
   - $i=2$: $s_2 \% 3 = 3 \% 3 = 0$
   - $i=3$: $s_3 \% 3 = 4 \% 3 = 1$
   - $i=4$: $s_4 \% 3 = 5 \% 3 = 2$
   - $i=5$: $s_5 \% 3 = 6 \% 3 = 0$
3. **匹配校验**：数字 \`89781\` 的最后一位是 \`1\`。依据上述推导，第五位数字必须满足 \`s_5 % 3 == 0\`，而 \`1 % 3 = 1\`，不符合条件。
4. **结论**：因此输出结果不可能是 89781。

**考点：** 循环逻辑模拟、取模运算的周期性判定`,
            tags: ['判断题', '循环'],
        },
        {
            id: 25,
            type: 'judge',
            question: `把整数 3025 从中剪开分为 30 和 25 两个数，此时再将这两数之和平方，计算结果又等于原数。 (30+25) × (30+25) = 55 × 55 = 3025，这样的数叫“雷劈数”。可以使用枚举的方法求出所有符合这样条件的四位数。`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
            
**判定依据：**
1. **枚举可行性**：四位数共有 $9999 - 1000 + 1 = 9000$ 个。对于现代计算机，枚举一万次并执行简单的算术判定仅需不到 1 毫秒，完全可行。
2. **判定算法**：对于每个数 $N$，令 \`a = N / 100\`, \`b = N % 100\`。判断 \`(a + b) * (a + b) == N\` 是否成立即可。

**考点：** 枚举算法的应用场景、数位拆解技巧`,
            tags: ['判断题', '位运算', '按位取反', '枚举', '算法思维'],
        }
    ],
    programmingQuestions: [
        {
      id: 26,
      type: 'programming',
      samples: [
        { input: `3`, output: `DEFGHIJKLMNOPQRSTUVWXYZABC` }
      ],
      question: `
# [GESP202406 三级] 移位

## 题目描述

小杨学习了加密技术移位，所有大写字母都向后按照⼀个固定数目进行偏移。偏移过程会将字母表视作首尾相接的环，例如，当偏移量是 $3$ 的时候，大写字母 A 会替换成 D，大写字母 Z 会替换成 C，总体来看，大写字母表 ABCDEFGHIJKLMNOPQRSTUVWXYZ 会被替换成 DEFGHIJKLMNOPQRSTUVWXYZABC。

注：当偏移量是 $26$ 的倍数时，每个大写字母经过偏移后会恰好回到原来的位置，即大写字母表 ABCDEFGHIJKLMNOPQRSTUVWXYZ 经过偏移后会保持不变。

## 输入格式

第一行包含一个正整数 $n$。

## 输出格式

输出在偏移量为 $n$ 的情况下，大写字母表 ABCDEFGHIJKLMNOPQRSTUVWXYZ 移位替换后的结果。
`,
      explanation: `
      **解析：**
      字母表长度为 26，先将 n 对 26 取模。对第 i 个字母，输出 char(\'A\'+(i+n) % 26) 即可。
      `,
      template: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}',
      score: 25,
      tags: ['编程题', '字符串', '模拟'],
      referenceCode: '#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n;\n    cin >> n;\n    for(int i = 0; i < 26; i++){\n        int j = (i+n) % 26;\n        char ch = \'A\'+j;\n        cout << ch;\n    }\n    cout << "\\n";\n    return 0;\n}',
      answer: '',
    },
        {
      id: 27,
      type: 'programming',
      samples: [
        { input: `2
3
1 2 4
5
1 2 3 4 5`, output: `Yes
No` }
      ],
      question: `
# [GESP202406 三级] 寻找倍数

## 题目描述

小杨有一个包含 $n$ 个正整数的序列 $A=[a_1,a_2,\\dots,a_n]$，他想知道是否存在 $i(1\\leq i\\leq n)$ 使得 $a_i$ 是序列 $A$ 中所有数的倍数。

## 输入格式

第一行包含一个正整数 $t$，代表测试用例组数。

接下来是 $t$ 组测试用例。对于每组测试用例，一共两行。

其中，第一行包含一个正整数 $n$；第二行包含 $n$ 个正整数，代表序列 $A$。

## 输出格式

对于每组测试用例，如果存在 $i(1\\leq i\\leq n)$ ，满足对于所有 $k(1\\leq k\\leq n)$ $a_i$ 是 $a_k$ 的倍数，输出 \`Yes\`，否则输出 \`No\`。
`,
      explanation: `
      **解析：**
      如果某个数是所有数的倍数，那么它一定是数组中的最大值。先求最大值，再判断它是否能被数组中每个数整除即可。
      `,
      template: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}',
      score: 25,
      tags: ['编程题', '数组', '整除', '多组测试'],
      referenceCode: '#include<bits/stdc++.h>\nusing namespace std;\nconst int N = 1e5+10;\nint a[N];\nint main(){\n    int t;\n    cin >> t;\n    while(t--){\n        int n;\n        cin >> n;\n        int x = 0;\n        for(int i = 1; i <= n; i++){\n            cin >> a[i];\n            x = max(x, a[i]);\n        }\n        int fl = 0;\n        for(int i = 1; i <= n; i++){\n            if(x % a[i]) fl = 1;\n        }\n        if(fl) cout << "No\\n";\n        else cout << "Yes\\n";\n    }\n    return 0;\n}',
      answer: '',
    }
    ]
};