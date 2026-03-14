// 2023年9月 GESP C++ 三级真题 (第3次认证)
// 数据说明：本卷基于官方真题 PDF 与公开解析回填。
// - 单选题 1~13、判断题 1~10、编程题 1~2 题面来自官方 PDF 文本提取
// - 单选题 14~15 的代码截图在 PDF 文本层中缺失，当前按公开解析做“题意级”还原
//   （答案可靠，题面不是逐字转写）
export const paperData = {
    id: '2023-09-l3',
    title: '2023年9月 GESP C++ 三级真题',
    level: 3,
    year: 2023,
    month: 9,
    session: 3,
    timeLimit: 90 * 60,
    source: {
        officialPdf: 'https://gesp.ccf.org.cn/101/attach/1570611239321632.pdf',
        notes: '编程题与大部分客观题已按官方 PDF 回填；第14~15题仍需补截图版原题面。'
    },
    questions: [
        {
            id: 1,
            type: 'single',
            question: '人们所使用的手机上安装的 App 通常指的是（   ）。',
            options: ['一款操作系统', '一款应用软件', '一种通话设备', '以上都不对'],
            answer: 1,
            score: 2,
            explanation: 'App 是 application 的简称，通常指安装在手机上的应用软件。'
        },
        {
            id: 2,
            type: 'single',
            question: '下列流程图的输出结果是（   ）。',
            options: ['60', '20', '5', '1'],
            answer: 1,
            score: 2,
            explanation: '根据公开解析，流程图满足条件时执行循环，最终 s = 5 × 4 = 20。'
        },
        {
            id: 3,
            type: 'single',
            question: "已知大写字符 'A' 的 ASCII 编码的十六进制表示为 0x41，则字符 'L' 的 ASCII 编码的十六进制表示为（   ）。",
            options: ['4A', '4B', '4C', '52'],
            answer: 2,
            score: 2,
            explanation: "'L' 比 'A' 大 11，0x41 + 0x0B = 0x4C。"
        },
        {
            id: 4,
            type: 'single',
            question: '以下哪个不是 C++ 语言中的运算符？（   ）',
            options: ['~', '~~', '<', '<<'],
            answer: 1,
            score: 2,
            explanation: 'C++ 中不存在 ~~ 这个运算符；~、<、<< 都是合法运算符。'
        },
        {
            id: 5,
            type: 'single',
            question: '如果数组定义为 long long array[] = {3, 5, 7, 2};，则数组 array 占用的字节数为（   ）。',
            options: ['32', '16', '8', '4'],
            answer: 0,
            score: 2,
            explanation: '数组共有 4 个 long long 元素，通常每个元素占 8 字节，总计 32 字节。'
        },
        {
            id: 6,
            type: 'single',
            question: '一个数组定义为 double array[3];，则可合理访问这个数组的元素的下标最大为（   ）。',
            options: ['2', '3', '23', '24'],
            answer: 0,
            score: 2,
            explanation: '长度为 3 的数组下标范围是 0~2，所以最大合法下标为 2。'
        },
        {
            id: 7,
            type: 'single',
            question: '以下数组定义，符合 C++ 语言语法的是（   ）。',
            options: ['double a[];', "double b[] = {1, 2.0, '3'};", 'double c[3.0];', 'double[] d = new double[3];'],
            answer: 1,
            score: 2,
            explanation: 'B 选项可由初始化列表自动推断长度；A 未给长度也未初始化；C 数组大小必须是整数；D 不是 C++ 的数组定义写法。'
        },
        {
            id: 8,
            type: 'single',
            question: '下列关于进制的叙述，正确的是（   ）。',
            options: [
                '只有十进制和二进制能够用来表示小数，八进制和十六进制不可以。',
                '常用的进制包括二进制、八进制、十进制、十六进制，其他进制在日常生活中很少使用。',
                '对任意正整数，其二进制表示不会比它的十进制表示更短。',
                '正整数的八进制表示中，每一位可能出现的最大数字是 8。'
            ],
            answer: 2,
            score: 2,
            explanation: 'A、D 明显错误；B 过于绝对且并非题目所考查的数学性质；C 正确，二进制表示位数不会少于十进制位数。'
        },
        {
            id: 9,
            type: 'single',
            question: '下列关于 C++ 语言中数组的叙述，不正确的是（   ）。',
            options: [
                '可以定义 0 个元素的数组。',
                '不能定义 -1 个元素的数组。',
                '数组下标越界访问会产生编译错误。',
                '程序运行时发生数组下标的越界访问，程序依然可能正常结束。'
            ],
            answer: 2,
            score: 2,
            explanation: '数组越界通常属于运行期未定义行为，不一定在编译阶段报错，因此 C 不正确。'
        },
        {
            id: 10,
            type: 'single',
            question: '如果 a 是 int 类型的变量，下列哪个表达式的值一定为 true？（   ）',
            options: ['a + 1000 - 1000 == a', 'a * 2 / 2 == a', '(a & 1) == 1', '(a | 1) == a + 1'],
            answer: 0,
            score: 2,
            explanation: 'A 恒成立；B 可能因溢出失效；C 只对奇数成立；D 对奇数不成立。'
        },
        {
            id: 11,
            type: 'single',
            question: '如果 a 和 b 均为 int 类型的变量，下列表达式不能正确判断“a 等于 b”的是（   ）。',
            options: ['((a >= b) && (a <= b))', '((a >> 1) == (b >> 1))', '((a + b) == (a + a))', '((a ^ b) == 0)'],
            answer: 1,
            score: 2,
            explanation: '右移一位后相等并不能推出原数相等，例如 4 和 5 右移一位后都等于 2。'
        },
        {
            id: 12,
            type: 'single',
            question: '如果 a 为 char 类型的变量，下列哪个表达式可以正确判断“a 是大写字母”？（   ）',
            options: ["a - 'A' <= 26", "'A' <= a <= 'Z'", "'A' <= 'a' <= 'Z'", "('A' <= a) && (a <= 'Z')"],
            answer: 3,
            score: 2,
            explanation: '正确写法是分别判断上下界并用 && 连接；链式比较在 C++ 中不会按数学意义解释。'
        },
        {
            id: 13,
            type: 'single',
            question: '在下列代码的横线处填写（   ），可以使得输出是“20 10”。',
            options: ['a = a >> 8; b = a & 0xff;', 'b = a >> 8; a = a & 0xff;', 'a = b; b = a & 0xff;', 'b = a; a = b;'],
            answer: 1,
            score: 2,
            explanation: '按公开解析，程序把 a 的高 8 位保存旧值、低 8 位保存新值；先右移得到原高位，再与 0xff 按位与取低 8 位。'
        },
        {
            id: 14,
            type: 'single',
            question: '【题面按公开解析还原】在给定数组循环处理中，横线处填入哪条语句，才能使程序最终输出 120？',
            options: ['res += array[i];', 'res *= array[i]', 'res = array[i]', '以上均不对'],
            answer: 3,
            score: 2,
            explanation: '官方 PDF 的代码截图文本层缺失，当前依据公开解析保留答案 D：把 A/B/C 分别代入后都不能得到题目要求的输出 120。'
        },
        {
            id: 15,
            type: 'single',
            question: '【题面按公开解析还原】某段双重循环与数组更新代码的输出结果是（   ）。',
            options: ['15', '28', '45', '55'],
            answer: 1,
            score: 2,
            explanation: '根据公开解析，数组初值为 0~9，随后按 p=2 到 9 的规则更新并求和，最终结果为 28。原始代码截图仍待从扫描版 PDF 补录。'
        },
        {
            id: 16,
            type: 'judge',
            question: '二进制数 101.101 在十进制下是 5.005。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '101.101₂ = 4 + 1 + 1/2 + 1/8 = 5.625，不是 5.005。'
        },
        {
            id: 17,
            type: 'judge',
            question: '在 C++ 语言中，位运算符也有类似“先乘除、后加减”的优先级规则，因此使用时应注意合理使用括号。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '位运算确实有优先级规则，和算术、比较等运算混用时建议加括号避免歧义。'
        },
        {
            id: 18,
            type: 'judge',
            question: "字符常量 '3' 的值和 int 类型常量 3 的值是相同的，只是占用的字节数不同。",
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: "'3' 的字符编码值通常是 51，而整数常量 3 的值就是 3，两者并不相同。"
        },
        {
            id: 19,
            type: 'judge',
            question: '在 C++ 语言中，长度为 3 的数组，访问下标为 3 的元素会引起编译错误。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '这通常不会引起编译错误，而是在运行时形成越界访问，属于未定义行为。'
        },
        {
            id: 20,
            type: 'judge',
            question: '在 C++ 语言中，所有 int 类型的值，经过若干次左移操作（<<）后，它们的值总会变为 0。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '在本题语境下按补 0 左移理解，经过足够多次左移后，各位会被移出，结果可变为 0。'
        },
        {
            id: 21,
            type: 'judge',
            question: '在 C++ 语言中，数组下标的大小决定元素在逻辑上的先后顺序，与元素在内存中位置的先后顺序无关。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '数组元素在逻辑顺序和内存中的顺序是对应的，两者并非“无关”。'
        },
        {
            id: 22,
            type: 'judge',
            question: '在 C++ 语言中，定义数组时，[] 中必须指定元素个数。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '如果提供初始化列表，数组长度可以由编译器自动推断，例如 int a[] = {1, 2, 3};。'
        },
        {
            id: 23,
            type: 'judge',
            question: '著名的哥德巴赫猜想：任一大于 2 的偶数都可写成两个素数之和。我们可以通过枚举法来证明它。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '枚举可以验证有限范围内的情况，但不能据此完成对所有偶数的数学证明。'
        },
        {
            id: 24,
            type: 'judge',
            question: '在 C++ 语言中，表达式 (0xff == 255) 的值为 true。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '0xff 是十六进制的 255，因此比较结果为 true。'
        },
        {
            id: 25,
            type: 'judge',
            question: '如果 a 为 int 类型的变量，且表达式 ((a & 1) == 0) 的值为 true，则说明 a 是偶数。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '整数最低位为 0 表示偶数，利用 a & 1 可以快速判断奇偶性。'
        }
    ],
    codingQuestions: [
        {
            id: '2023-09-23-03-C-01',
            title: '小杨的储蓄',
            score: 25,
            source: 'official-pdf',
            summary: '有 n 个储蓄罐，编号 0 到 n-1。第 i 天会向编号为 a_i 的储蓄罐存入 i 元。给定连续 d 天的选择记录，输出每个储蓄罐最终金额。',
            input: '第一行两个整数 n, d；第二行 d 个整数 a_i，表示第 i 天选择的储蓄罐编号。',
            output: '输出 n 个整数，第 j 个整数表示编号 j 的储蓄罐中的钱数。',
            samples: [
                { input: '2 3\n0 1 0', output: '4 2' },
                { input: '4 5\n0 0 0 2 0', output: '11 0 4 0' }
            ]
        },
        {
            id: '2023-09-23-03-C-02',
            title: '进制判断',
            score: 25,
            source: 'official-pdf',
            summary: '给出若干仅由数字和大写字母组成的字符串，判断每个字符串是否可能表示二进制、八进制、十进制、十六进制数。',
            input: '第一行一个整数 n；接下来 n 行，每行一个字符串。',
            output: '输出 n 行，每行 4 个 0/1，分别表示是否可能为二进制、八进制、十进制、十六进制数。',
            samples: [
                { input: '2\n15A6F\n1011', output: '0 0 0 1\n1 1 1 1' },
                { input: '4\n1234567\n12345678\nFF\nGG', output: '0 1 1 1\n0 0 1 1\n0 0 0 1\n0 0 0 0' }
            ]
        }
    ]
};
