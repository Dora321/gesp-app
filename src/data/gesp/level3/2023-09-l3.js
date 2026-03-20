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
        notes: '编程题与客观题已按官方 PDF 回填。'
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
            question: '如果要使得下面代码输出 120，则横线处应填入（   ）。\n```cpp\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int array[5] = {1, 2, 3, 4, 5};\n    int res = 0;\n    for (int i = 0; i < 5; i++)\n        _______; // 在此处填入代码\n    cout << res << endl;\n    return 0;\n}\n```',
            options: ['res += array[i];', 'res *= array[i]', 'res = array[i]', '以上均不对'],
            answer: 3,
            score: 2,
            explanation: '由于 res 初始化为 0，无论填入 A、B 还是 C，最终输出都不会是 120。如果是 res *= array[i] 但 res 初始为 1，则输出 120。'
        },
        {
            id: 15,
            type: 'single',
            question: '下面代码执行后的输出是（   ）。\n```cpp\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int array[10];\n    for (int i = 0; i < 10; i++)\n        array[i] = i;\n    for (int p = 2; p < 10; p++)\n        if (array[p] == p)\n            for (int n = p; n < 10; n += p)\n                array[n] = array[n] / p * (p - 1);\n    int res = 0;\n    for (int n = 1; n < 10; n++)\n        res += array[n];\n    cout << res << endl;\n    return 0;\n}\n```',
            options: ['15', '28', '45', '55'],
            answer: 1,
            score: 2,
            explanation: '该算法计算的是 1 到 9 的欧拉函数之和（φ(1)+φ(2)+...+φ(9)）。φ(1)=1, φ(2)=1, φ(3)=2, φ(4)=2, φ(5)=4, φ(6)=2, φ(7)=6, φ(8)=4, φ(9)=6。总和为 1+1+2+2+4+2+6+4+6 = 28。'
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
    programmingQuestions: [
        {
            id: 26,
            type: 'programming',
            title: '小杨的储蓄',
            description: '小杨拥有 N 个储蓄罐，它们的编号从 0 到 $N-1$。从第 1 天开始，小杨每天都会往其中的一个储蓄罐里存钱。具体来说，在第 i 天，他会选择一个储蓄罐 a_i，并存入 i 元钱。D 天过后，小杨已经记不清每个储蓄罐里具体存了多少钱。你需要编写程序帮助他计算出每个储蓄罐当前的存款总额。',
            inputDescription: '输入包含两行。第一行包含两个整数 N 和 D，用单个空格分隔（1 ≤ N, D ≤ 1,000）。第二行包含 D 个整数，每个整数代表 a_i，表示第 i 天小杨选择存钱的储蓄罐编号（0 ≤ a_i ≤ $N-1$）。',
            outputDescription: '输出一行 N 个整数，用单个空格隔开。其中，第 i 个整数表示编号为 i-1 的储蓄罐中的总金额。',
            samples: [
                {
                    input: '2 3\n0 1 0',
                    output: '4 2',
                    explanation: '第 1 天向罐 0 存 1 元；第 2 天向罐 1 存 2 元；第 3 天向罐 0 存 3 元。最终罐 0 有 1+3=4 元，罐 1 有 2 元。'
                },
                {
                    input: '4 5\n0 0 0 2 0',
                    output: '11 0 4 0',
                    explanation: '第 1, 2, 3, 5 天向罐 0 存钱，总计 1+2+3+5=11 元。第 4 天向罐 2 存 4 元。'
                }
            ],
            score: 25,
            explanation: '使用一个数组记录每个储蓄罐的余额。循环 D 天，累加金额到对应编号的数组元素中。',
            tags: ['数组', '模拟'],
            referenceCode: `
#include <iostream>
#include <vector>
using namespace std;

long long savings[1005];

int main() {
    int N, D;
    cin >> N >> D;
    for (int i = 1; i <= D; i++) {
        int a;
        cin >> a;
        savings[a] += i;
    }
    for (int i = 0; i < N; i++) {
        cout << savings[i] << (i == N - 1 ? "" : " ");
    }
    cout << endl;
    return 0;
}
`
        },
        {
            id: 27,
            type: 'programming',
            title: '进制判断',
            description: 'N 进制数是一种逢 N 进一的计数制度。题目将给出一些字符串，需要判断每个字符串是否能分别作为二进制、八进制、十进制或十六进制数。\n- 二进制：仅包含 0, 1。\n- 八进制：包含 0-7。\n- 十进制：包含 0-9。\n- 十六进制：包含 0-9 和 A-F。',
            inputDescription: '第一行包含一个正整数 n，表示接下来需要判断的字符串数量。随后的 n 行，每行包含一个由数字和大写字母组成的字符串。',
            outputDescription: '输出共 n 行。每一行应包含 4 个用空格分隔的数字，依次表示该字符串是否可以作为二进制数、八进制数、十进制数和十六进制数。如果可以，则输出 1；如果不能，则输出 0。',
            samples: [
                {
                    input: '2\n15A6F\n1011',
                    output: '0 0 0 1\n1 1 1 1',
                    explanation: '15A6F 含有 A 和 F，只能是十六进制。1011 仅含 0 和 1，四种进制皆有可能。'
                },
                {
                    input: '4\n1234567\n12345678\nFF\nGG',
                    output: '0 1 1 1\n0 0 1 1\n0 0 0 1\n0 0 0 0',
                    explanation: '1234567 无 8, 9, A-F，可能是八、十、十六进制。12345678 含 8，可能是十、十六进制。FF 含 F，只能是十六进制。GG 含 G，不属于任何一种。'
                }
            ],
            score: 25,
            explanation: '遍历字符串的每个字符，找出其中最大的字符等级。如果最大字符是 0-1，则四种都行；如果是 0-7，则后三种行；如果是 0-9，则后两种行；如果是 0-F，则只有十六进制行。否则都不行。',
            tags: ['字符串', '位运算', '逻辑判断'],
            referenceCode: `
#include <iostream>
#include <string>
#include <vector>
using namespace std;

void solve() {
    string s;
    cin >> s;
    bool b2 = true, b8 = true, b10 = true, b16 = true;
    for (char c : s) {
        int val;
        if (c >= '0' && c <= '9') val = c - '0';
        else if (c >= 'A' && c <= 'F') val = 10 + (c - 'A');
        else val = 100; // 非法

        if (val >= 2) b2 = false;
        if (val >= 8) b8 = false;
        if (val >= 10) b10 = false;
        if (val >= 16) b16 = false;
    }
    cout << (b2 ? 1 : 0) << " " << (b8 ? 1 : 0) << " " << (b10 ? 1 : 0) << " " << (b16 ? 1 : 0) << endl;
}

int main() {
    int n;
    cin >> n;
    while (n--) {
        solve();
    }
    return 0;
}
`
        }
    ]
};
