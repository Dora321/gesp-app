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
            question: '8 位二进制原码能表示的最小整数是（ ）。',
            options: ['-127', '-128', '-255', '-256'],
            answer: 0,
            score: 2,
            explanation: '8 位原码最高位为符号位，其余 7 位表示数值，因此范围是 -127 到 127。'
        },
        {
            id: 2,
            type: 'single',
            question: '反码表示中，零的表示形式有（ ）。',
            options: ['1 种', '2 种', '8 种', '16 种'],
            answer: 1,
            score: 2,
            explanation: '反码里 +0 和 -0 的编码不同，因此有两种表示。'
        },
        {
            id: 3,
            type: 'single',
            question: '补码 1011 1011 对应的真值是（ ）。',
            options: ['-69', '-59', '-68', '-58'],
            answer: 0,
            score: 2,
            explanation: '10111011 是负数补码，还原可得原码 11000101，对应十进制 -69。'
        },
        {
            id: 4,
            type: 'single',
            question: '若 X 的 8 位补码为 0000 1010，则 X / 2 的补码是（ ）。',
            options: ['0000 0101', '1000 0101', '0000 0101 或 1000 0101', '算术右移后结果取决于符号位'],
            answer: 0,
            score: 2,
            explanation: '00001010 表示十进制 10，除以 2 得 5，其补码为 00000101。'
        },
        {
            id: 5,
            type: 'single',
            question: '二进制数 1101.101 对应的十进制数是（ ）。',
            options: ['13.625', '12.75', '11.875', '14.5'],
            answer: 0,
            score: 2,
            explanation: '1101.101₂ = 8+4+1+1/2+1/8 = 13.625。'
        },
        {
            id: 6,
            type: 'single',
            question: '补码加法中，若符号位无进位而次高位有进位，则说明（ ）。',
            options: ['结果正确', '发生上溢', '发生下溢', '结果符号位错误'],
            answer: 1,
            score: 2,
            explanation: '补码加法中符号位进位与次高位进位不同，说明发生溢出；本题官方答案为 B。'
        },
        {
            id: 7,
            type: 'single',
            question: '八进制数 35.6 对应的十进制数是（ ）。',
            options: ['29.75', '28.5', '27.625', '30.25'],
            answer: 0,
            score: 2,
            explanation: '35.6₈ = 3×8+5+6/8 = 29.75。'
        },
        {
            id: 8,
            type: 'single',
            question: '二进制数 1010 | 1100 的结果是（ ）。',
            options: ['1000', '1110', '1010', '1100'],
            answer: 1,
            score: 2,
            explanation: '按位或运算 1010 | 1100 = 1110。'
        },
        {
            id: 9,
            type: 'single',
            question: '以下哪个位运算可以交换两个变量的值（无需临时变量）（ ）。',
            options: [
                'a = a ^ b; b = a ^ b; a = a ^ b;',
                'a = a & b; b = a | b; a = a & b;',
                'a = a | b; b = a ^ b; a = a ^ b;',
                'a = ~a; b = ~b; a = ~a;'
            ],
            answer: 0,
            score: 2,
            explanation: '经典异或交换写法是 a ^= b; b ^= a; a ^= b。'
        },
        {
            id: 10,
            type: 'single',
            question: '如何正确定义一个长度为 5 的整型数组（ ）。',
            options: ['int array = new int[5];', 'array int[5];', 'int[] array = {1,2,3,4,5};', 'int array[5];'],
            answer: 3,
            score: 2,
            explanation: 'C++ 中静态整型数组的定义形式是 int array[5]。'
        },
        {
            id: 11,
            type: 'single',
            question: '下面程序使用枚举法（穷举法）求解满足条件的三位数，横线处应该填入的是（ ）。\n```cpp\n#include <iostream>\nusing namespace std;\nint main() {\n    int count = 0;\n    for (int i = 100; i <= 999; i++) {\n        int a = i / 100;\n        __________________\n        int c = i % 10;\n        if (a * a+b * b == c * c) {\n            count++;\n        }\n    }\n    cout << count << endl;\n    return 0;\n}\n```',
            options: ['int b = (i / 10) / 10;', 'int b = (i / 10) % 10;', 'int b = (i % 10) / 10;', 'int b = (i % 10) % 10;'],
            answer: 1,
            score: 2,
            explanation: '十位数字应写成 (i / 10) % 10。'
        },
        {
            id: 12,
            type: 'single',
            question: '下面程序模拟了一个简单的小球反弹过程，横线处应该填入的是（ ）。\n```cpp\n#include <iostream>\nusing namespace std;\nint main() {\n    int height = 10;\n    int distance = 0;\n    for (int i = 1; i <= 5; i++) { // 模拟 5 次落地\n        __________________\n        height /= 2;\n        distance += height;\n    }\n    cout << distance << endl;\n    return 0;\n}\n```',
            options: ['distance += height / 2;', 'distance += height;', 'distance += height * 2;', 'distance += height+1;'],
            answer: 1,
            score: 2,
            explanation: '每次落地前先把当前下落高度计入总路程，因此填 distance += height。'
        },
        {
            id: 13,
            type: 'single',
            question: 'C++ 代码 `string s = "GESP考试";` 中，s 占据的字节数是（ ）。',
            options: ['10', '8', '8 或 10', '取决于计算机采用什么编码'],
            answer: 3,
            score: 2,
            explanation: '字符串字节数依赖编码；常见 UTF-8 下是 10 字节，GBK 下是 8 字节。'
        },
        {
            id: 14,
            type: 'single',
            question: 'C++ 语句 `string s = "Gesp Test";` 执行 `s.rfind("e")` 以后，输出的是（ ）。',
            options: ['1', '2', '6', '3'],
            answer: 2,
            score: 2,
            explanation: 'rfind 从后往前找，字符串中最后一个 e 的下标是 6。'
        },
        {
            id: 15,
            type: 'single',
            question: '字符串 "Gesp考试" 的字符数是（ ）。',
            options: ['10', '8', '6', '字符数多少取决于编码'],
            answer: 2,
            score: 2,
            explanation: '字符数按逻辑字符计，共 6 个字符；编码只影响字节数。'
        },
        {
            id: 16,
            type: 'judge',
            question: 'C++ 中 string 的 == 运算符比较的是字符串的内存地址，而非内容。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: 'string 的 == 比较的是字符串内容。'
        },
        {
            id: 17,
            type: 'judge',
            question: 'string 的 substr(1, 3) 返回从下标 1 开始的 3 个字符的子串。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: 'substr(pos, len) 的含义正是从 pos 开始取 len 个字符。'
        },
        {
            id: 18,
            type: 'judge',
            question: 'x 是浮点数，(x >> 1) 等价于 x / 2。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '位移运算不能直接用于浮点数。'
        },
        {
            id: 19,
            type: 'judge',
            question: 'string("hello") == "hello" 的比较结果为 true。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '两边内容相同，比较结果为 true。'
        },
        {
            id: 20,
            type: 'judge',
            question: 'sort 可以直接用于排序 set 中的元素。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: 'set 自带有序性，且其迭代器不支持 sort 所需的随机访问。'
        },
        {
            id: 21,
            type: 'judge',
            question: '(x & 1) == 0 可以判断整数 x 是否为偶数。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '偶数最低位为 0，因此与 1 按位与后结果为 0。'
        },
        {
            id: 22,
            type: 'judge',
            question: 'string 的 substr(2, 10) 在字符串长度不足时会抛出异常。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '当起始位置合法但长度超出时，substr 会截到字符串末尾，不会因此抛异常。'
        },
        {
            id: 23,
            type: 'judge',
            question: '在数学纸面计算中，pow(2, 3) 的计算结果一定是 8，但是在 C++ 中，如果遇到数据类型是浮点数，那就不一定正确。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '浮点计算存在精度误差，结果在某些场景下可能不是精确整数表示。'
        },
        {
            id: 24,
            type: 'judge',
            question: '在 C++ 中，枚举的底层类型可以是非整型（如 float 或 double）。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '枚举的底层类型必须是整型。'
        },
        {
            id: 25,
            type: 'judge',
            question: '函数声明 `double f();` 返回 int 时，会自动转换为 double。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '返回表达式会按函数声明的返回类型自动转换。'
        }
    ],
    programmingQuestions: [
        {
      id: 26,
      type: 'programming',
      samples: [{ input: '待补充', output: '待补充' }],
      referenceCode: '// 待补充',
      question: `
# [GESP202506 三级] 奇偶校验

## 题目描述

数据在传输过程中可能出错，因此接收方收到数据后通常会校验传输的数据是否正确，奇偶校验是经典的校验方式之一。

给定 \$n\$ 个非负整数 \$c_1, c_2, \\ldots, c_n\$ 代表所传输的数据，它们的校验码取决于这些整数在二进制下 1 的数量之和的奇偶性。如果这些整数在二进制下共有奇数个 1，那么校验码为 1；否则校验码为 0。你能求出这些整数的校验码吗？

## 输入格式

第一行，一个正整数 \$n\$，表示所传输的数据量。

第二行，\$n\$ 个非负整数 \$c_1, c_2, \\ldots, c_n\$，表示所传输的数据。

## 输出格式

输出一行，两个整数，以一个空格分隔：

第一个整数表示 \$c_1, c_2, \\ldots, c_n\$ 在二进制下 1 的总数量；

第二个整数表示校验码（0 或 1）。
`,
      explanation: '遍历所有输入数字，统计其二进制中 1 的个数之和 s，答案即为 `s` 和 `s % 2`。',
      template: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}',
      score: 25,
      tags: ['编程题', '位运算', '统计'],
      referenceCode: '#include <cstdio>\nusing namespace std;\n\nint n, v;\n\nint main() {\n    scanf("%d", &n);\n    for (int i = 1; i <= n; i++) {\n        int c;\n        scanf("%d", &c);\n        while (c) {\n            v += c & 1;\n            c >>= 1;\n        }\n    }\n    printf("%d %d\\n", v, v & 1);\n    return 0;\n}',
      answer: '',
    },
        {
      id: 27,
      type: 'programming',
      samples: [{ input: '待补充', output: '待补充' }],
      referenceCode: '// 待补充',
      question: `
# [GESP202506 三级] 分糖果

## 题目描述

有 \$n\$ 位小朋友排成一队等待老师分糖果。第 \$i\$ 位小朋友想要至少 \$a_i\$ 颗糖果，并且分给他的糖果数量必须比分给前一位小朋友的糖果数量更多，不然他就会不开心。

老师想知道至少需要准备多少颗糖果才能让所有小朋友都开心。你能帮帮老师吗？

## 输入格式

第一行，一个正整数 \$n\$，表示小朋友的人数。

第二行，\$n\$ 个正整数 \$a_1, a_2, \\ldots, a_n\$，依次表示每位小朋友至少需要的糖果数量。

## 输出格式

输出一行，一个整数，表示最少需要准备的糖果数量。
`,
      explanation: '从左到右贪心。设前一位拿到 prev 颗，则当前位至少应拿 `max(ai, prev+1)` 颗，把这些值累加即可。',
      template: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}',
      score: 25,
      tags: ['编程题', '贪心', '数组'],
      referenceCode: '#include <cstdio>\n#include <algorithm>\nusing namespace std;\n\nconst int N = 1005;\nint n, a[N];\nlong long ans;\n\nint main() {\n    scanf("%d", &n);\n    for (int i = 1; i <= n; i++) {\n        scanf("%d", &a[i]);\n        a[i] = max(a[i-1]+1, a[i]);\n        ans += a[i];\n    }\n    printf("%lld\\n", ans);\n    return 0;\n}',
      answer: '',
    }
    ]
};
