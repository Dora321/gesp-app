// 2026年3月 GESP C++ 三级真题
// 数据说明：
// - 客观题 1~15：依据官方 PDF 回填；少量代码/流程图题按官方版式做等价转写。
// - 判断题 16~25：答案表与题面均由官方 PDF 复核。
// - 编程题 26~27：题名、题意、样例与参考代码来自官方 PDF。
export const paperData = {
    id: '2026-03-l3',
    title: '2026年3月 GESP C++ 三级真题',
    level: 3,
    year: 2026,
    month: 3,
    session: 13,
    timeLimit: 90 * 60,
    source: {
        officialPdf: 'https://gesp.ccf.org.cn/101/attach/1734775052173344.pdf',
        notes: '少量流程图题按官方 PDF 做等价文字整理，保持答案与考点一致。',
    },
    questions: [
        {
            id: 1,
            type: 'single',
            question: '如果字符变量 `_1` 的值是字符 `1`，那么 `(int)_1` 的值是（ ）。',
            options: ['1', '-1', '49', '+1 或者 -1'],
            answer: 2,
            score: 2,
            explanation: '字符 `1` 的 ASCII 码是 49，强制转为 `int` 后得到 49。',
            tags: ['字符与ASCII', '类型转换'],
        },
        {
            id: 2,
            type: 'single',
            question: '`a`、`b` 是整型变量，各自有互不相同的初始值。下列程序实现了什么效果（ ）。\n```cpp\na = a ^ b;\nb = a ^ b;\na = a ^ b;\n```',
            options: ['`a`、`b` 的值从始至终都没有改变', '`a`、`b` 的值实现了互换', '`a`、`b` 的值互换了以后，又还回去了，相当于没有变化', '`a`、`b` 的值最后和原值不一样，没有任何意义'],
            answer: 1,
            score: 2,
            explanation: '这是经典的异或交换写法，执行后 `a` 与 `b` 的值会互换。',
            tags: ['位运算', '异或'],
        },
        {
            id: 3,
            type: 'single',
            question: "关于下列正确的程序段，说法正确的是（ ）。\n```cpp\nchar str1[] = \"Hello\";\nchar str2[] = {'H', 'e', 'l', 'l', '0'};\ncout << str1 << endl;\ncout << str2 << endl;\n```",
            options: ['字符数组 `str1` 和 `str2` 完全相同', '这段程序多次执行将输出不同的结果', '字符数组 `str1` 和 `str2` 不相等', '这两个赋值方式完全相同'],
            answer: 2,
            score: 2,
            explanation: "`str1` 是以 `\\0` 结尾的字符串 `\"Hello\"`；`str2` 最后一个字符是 `'0'` 而不是字符串结束符，因此两者并不相同。",
            tags: ['字符串', '字符数组'],
        },
        {
            id: 4,
            type: 'single',
            question: '关于以下程序段，说法正确的是（ ）。\n```cpp\nint x = 10;\ncout << (x++) + (++x) << endl;\n```',
            options: ['C++11 标准中，这是未定义行为，不同的环境有可能出现不同的结果', '22', '21', '20'],
            answer: 0,
            score: 2,
            explanation: '同一表达式中对变量 `x` 做多次未排序修改，在 C++11 中属于未定义行为。',
            tags: ['运算符', '未定义行为'],
        },
        {
            id: 5,
            type: 'single',
            question: '8 位二进制下，十进制数 `-15` 的补码是（ ）。',
            options: ['11110000', '10001111', '10010000', '11110001'],
            answer: 3,
            score: 2,
            explanation: '`15` 的二进制是 `00001111`，按补码规则取反加一得到 `11110001`。',
            tags: ['二进制', '补码'],
        },
        {
            id: 6,
            type: 'single',
            question: '三进制数 `2102(3)` 转换成十进制是（ ）。',
            options: ['63', '65', '67', '69'],
            answer: 1,
            score: 2,
            explanation: '`2102(3) = 2*27 + 1*9 + 0*3 + 2 = 65`。',
            tags: ['进制转换'],
        },
        {
            id: 7,
            type: 'single',
            question: '二进制数 `10110101` 是某数的 8 位补码，该数的十进制是（ ）。',
            options: ['-73', '-75', '-77', '75'],
            answer: 1,
            score: 2,
            explanation: '最高位为 1，表示负数。取反加一得 `01001011`，即 75，所以原数是 `-75`。',
            tags: ['二进制', '补码'],
        },
        {
            id: 8,
            type: 'single',
            question: '已知 `unsigned char c = 0x0F;`（十六进制 `0F` = 二进制 `00001111`），执行 `c = c << 3;` 后，`c` 的十进制值是（ ）。',
            options: ['64', '72', '80', '120'],
            answer: 3,
            score: 2,
            explanation: '`00001111 << 3 = 01111000`，即十进制 `120`。',
            tags: ['位运算', '左移'],
        },
        {
            id: 9,
            type: 'single',
            question: '补码的情况下，关于按位取反运算，用笔计算的情况下，以下说法错误的是（ ）。',
            options: ['`~5` 的结果是 `-6`（`int` 类型，32 位）', '`~0` 的结果是 `0`（`int` 类型，32 位）', '`~(-3)` 的结果是 `2`（`int` 类型，32 位）', '`~8` 的结果是 `-9`（`int` 类型，32 位）'],
            answer: 1,
            score: 2,
            explanation: '`~0` 在补码下所有位都变成 1，结果是 `-1`，不是 `0`。',
            tags: ['位运算', '按位取反'],
        },
        {
            id: 10,
            type: 'single',
            question: '执行以下 C++ 代码后，`sub` 的值是（ ）。\n```cpp\nstring str = \"GESP2026\";\nstring sub = str.substr(4, 2);\n```',
            options: ['20', '02', '2026', '026'],
            answer: 0,
            score: 2,
            explanation: '`substr(4, 2)` 表示从下标 4 开始取长度 2 的子串，因此结果是 `"20"`。',
            tags: ['字符串', 'substr'],
        },
        {
            id: 11,
            type: 'single',
            question: '执行以下代码后，输出结果是（ ）。\n```cpp\nint arr[] = {5, 10, 15, 20, 25, 30};\nint count = sizeof(arr) / sizeof(arr[0]);\ncout << count;\n```',
            options: ['4', '6', '24', '30'],
            answer: 1,
            score: 2,
            explanation: '数组共有 6 个元素，因此 `count` 为 6。',
            tags: ['数组', 'sizeof'],
        },
        {
            id: 12,
            type: 'single',
            question: '执行以下代码后，输出结果是（ ）。\n```cpp\nchar s[10] = \"abcde\";\nint a = sizeof(s) / sizeof(s[0]);\nint b = strlen(s);\ncout << a - b;\n```',
            options: ['4', '5', '6', '10'],
            answer: 1,
            score: 2,
            explanation: '`sizeof(s)` 为 10，`strlen(s)` 为 5，因此结果是 5。',
            tags: ['字符串', 'sizeof'],
        },
        {
            id: 13,
            type: 'single',
            question: '以下问题中，最不适合用枚举法解决的是（ ）。',
            options: ['找出 `1~100` 之间所有能被 `7` 整除的数', '找出 `100~200` 之间的所有质数', '计算 `1+2+3+...+1000` 的和', '找出三位数中个位、十位、百位数字之和等于 `10` 的数'],
            answer: 2,
            score: 2,
            explanation: '等差求和有直接公式，不需要枚举每一个数。',
            tags: ['枚举', '算法思想'],
        },
        {
            id: 14,
            type: 'single',
            question: '用枚举法解决“鸡兔同笼问题：头共 35 个，脚共 94 只，求鸡和兔的数量”，以下枚举逻辑最合理的是（ ）。',
            options: [
                '枚举鸡的数量 `x`（`0~35`），兔的数量 `y = 35 - x`，判断 `2*x + 4*y == 94`',
                '枚举兔的数量 `y`（`0~94`），鸡的数量 `x = 35 - y`，判断 `2*x + 4*y == 94`',
                '枚举所有整数 `x`（`0~100`）和 `y`（`0~100`），判断 `x+y==35 && 2*x+4*y==94`',
                '枚举脚的总数 `sum`（`0~94`），判断 `sum == 94`',
            ],
            answer: 0,
            score: 2,
            explanation: '利用头数固定这一条件，只需枚举一个变量即可，范围也最小。',
            tags: ['枚举', '应用题'],
        },
        {
            id: 15,
            type: 'single',
            question: "模拟“字符串加密”：规则为“每个字符 ASCII 码 + 3，若超过 `z`（122）则从 `a` 重新开始”，以下代码中正确的条件判断是（ ）。\n```cpp\nfor (int i = 0; i < str.length(); i++) {\n    // 需补充条件：\n    _______________________\n    else {\n        str[i] += 3;\n    }\n}\n```",
            options: [
                '```cpp\nif (str[i] > 122) str[i] = str[i] + 3 - 26;\n```',
                '```cpp\nif (str[i] > 122) str[i] = str[i] - 26;\n```',
                '```cpp\nif (str[i] + 3 > 122) str[i] = str[i] - 26;\n```',
                "```cpp\nif (str[i] + 3 > 'z') str[i] = 'a' + (str[i] + 3 - 'z') - 1;\n```",
            ],
            answer: 3,
            score: 2,
            explanation: "判断是否越过 `z`，越界后要从 `a` 重新接续，选项 D 的处理方式正确。",
            tags: ['字符串', '模拟'],
        },
        {
            id: 16,
            type: 'judge',
            question: '定义 `int arr[5] = {1,2,3};`，则 `arr[3]` 的值为 `0`，`arr[5]` 是合法下标。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '`arr[3]` 确实会补零，但合法下标只能到 `arr[4]`，`arr[5]` 越界。',
            tags: ['判断题', '数组'],
        },
        {
            id: 17,
            type: 'judge',
            question: '定义 `double arr[10];`，未手动初始化时，数组中所有元素的默认值为 `0.0`。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '局部数组不会自动初始化为 0；若未显式初始化，其值是不确定的。',
            tags: ['判断题', '数组'],
        },
        {
            id: 18,
            type: 'judge',
            question: '定义 `int arr[] = {1,2,3};`，则 `sizeof(arr)` 的结果为 `12`（`int` 占 4 字节）。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '数组有 3 个 `int` 元素，`3 * 4 = 12`。',
            tags: ['判断题', 'sizeof'],
        },
        {
            id: 19,
            type: 'judge',
            question: '下面的流程图是用来求 `1+2+3+...+10` 的和。请判断：这个流程图的逻辑正确还是错误？',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '依据官方答案，该流程图逻辑正确，能够得到 1 到 10 的和。',
            tags: ['判断题', '流程图'],
        },
        {
            id: 20,
            type: 'judge',
            question: '下面流程图的功能是计算 `5` 对 `2` 取余数，输出结果为 `1`。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '`5 % 2 = 1`，官方答案判定该流程图功能表述正确。',
            tags: ['判断题', '流程图'],
        },
        {
            id: 21,
            type: 'judge',
            question: '已知大写字符 `A` 的 ASCII 编码的十六进制表示为 `0x41`，计算字符 `m` 的 ASCII 编码的八进制表示为 `155`（八进制）。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '`m` 的十进制 ASCII 码是 109，换成八进制正好是 `155`。',
            tags: ['判断题', '字符与ASCII'],
        },
        {
            id: 22,
            type: 'judge',
            question: '在 C++ 位运算中，各种不同的运算符有优先级的区分，使用括号能够解决优先级的问题。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '括号可以显式指定计算顺序，是处理位运算优先级问题的常用办法。',
            tags: ['判断题', '位运算'],
        },
        {
            id: 23,
            type: 'judge',
            question: "由于在 `0~255` 范围内，`char` 类型和 `int` 类型可以互换，因此在这里 `x` 和 `y` 相等。\n```cpp\nchar x = '1';\nint y = 1;\n```",
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: "字符 `'1'` 的值是 ASCII 码 49，而整数 `1` 的值是 1，两者不相等。",
            tags: ['判断题', '字符与ASCII'],
        },
        {
            id: 24,
            type: 'judge',
            question: '在 C++ 语言中，表达式 `((0xf0 + 0x15) == 255)` 的值为 `true`。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '`0xf0 = 240`，`0x15 = 21`，两者之和为 261，不等于 255。',
            tags: ['判断题', '十六进制'],
        },
        {
            id: 25,
            type: 'judge',
            question: '如果 `a` 为 `int` 类型的变量，且 `a` 的二进制最低位为 `0`，则表达式 `((a & 3 & 1) == 0)` 的值为 `true`。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '最低位为 0 时，与 `1` 按位与的结果一定为 0，因此整个判断成立。',
            tags: ['判断题', '位运算'],
        },
    ],
    programmingQuestions: [
        {
      id: 26,
      type: 'programming',
      question: `
# 编程题


# 编程题


# 编程题


# 二进制回文串

## 题目描述

对于一个正整数 \\\\\\\\\\\\\\\`n\\\\\\\\\\\\\\\`，把它转换成不含前导零的二进制表示；如果这个二进制序列从左向右读与从右向左读完全相同，则称该数为二进制回文数。例如，\\\\\\\\\\\\\\\`9\\\\\\\\\\\\\\\` 的二进制表示为 \\\\\\\\\\\\\\\`1001\\\\\\\\\\\\\\\`，是二进制回文数；\\\\\\\\\\\\\\\`12\\\\\\\\\\\\\\\` 的二进制表示为 \\\\\\\\\\\\\\\`1100\\\\\\\\\\\\\\\`，不是二进制回文数。给定一个正整数 \\\\\\\\\\\\\\\`n\\\\\\\\\\\\\\\`，请计算在 \\\\\\\\\\\\\\\`1\\\\\\\\\\\\\\\` 到 \\\\\\\\\\\\\\\`n\\\\\\\\\\\\\\\` 的范围内二进制回文数的数量。

## 输入格式

输入一行，包含一个正整数 \\\\\\\\\\\\\\\`n\\\\\\\\\\\\\\\`。

## 输出格式

输出一行，包含一个数，表示在 \\\\\\\\\\\\\\\`1\\\\\\\\\\\\\\\` 到 \\\\\\\\\\\\\\\`n\\\\\\\\\\\\\\\` 的范围内二进制回文数的数量。
`,
      score: 25,
      explanation: '在 `1` 到 `15` 中，`1、3、5、7、9、15` 的二进制表示都是回文串，因此答案为 6。',
      tags: ['编程题', '进制转换', '枚举'],
      template: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}',
      referenceCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n, a[50] = {0}, ans = 0;\n    cin >> n;\n    for (int i = 1; i <= n; i++) {\n        int t = i, pos = 0;\n        while (t) {\n            a[pos++] = t % 2;\n            t /= 2;\n        }\n        bool ok = true;\n        for (int j = 0; j < pos; j++)\n            if (a[j] != a[pos - j - 1]) {\n                ok = false;\n                break;\n            }\n        ans += ok;\n    }\n    cout << ans;\n    return 0;\n}',
      answer: '',
      problemNumber: 'B4499',
    },
        {
      id: 27,
      type: 'programming',
      question: `
# 编程题


# 编程题


# 编程题


# 凯撒密码

## 题目描述

凯撒密码是一种替换加密技术，明文中的所有字母都会按照固定偏移量进行整体平移。例如偏移量是 \\\\\\\\\\\\\\\`3\\\\\\\\\\\\\\\` 时，\\\\\\\\\\\\\\\`A\\\\\\\\\\\\\\\` 会替换成 \\\\\\\\\\\\\\\`D\\\\\\\\\\\\\\\`，\\\\\\\\\\\\\\\`B\\\\\\\\\\\\\\\` 会替换成 \\\\\\\\\\\\\\\`E\\\\\\\\\\\\\\\`，……，\\\\\\\\\\\\\\\`X\\\\\\\\\\\\\\\` 会替换成 \\\\\\\\\\\\\\\`A\\\\\\\\\\\\\\\`，\\\\\\\\\\\\\\\`Y\\\\\\\\\\\\\\\` 会替换成 \\\\\\\\\\\\\\\`B\\\\\\\\\\\\\\\`，\\\\\\\\\\\\\\\`Z\\\\\\\\\\\\\\\` 会替换成 \\\\\\\\\\\\\\\`C\\\\\\\\\\\\\\\`。现在给你一组已破解的凯撒密码明文与密文，以及一个使用相同偏移量的待破解密文，请输出它对应的明文。

## 输入格式

输入共三行：第一行是已破解的凯撒密码明文；第二行是对应密文；第三行是待破解的凯撒密码密文。

## 输出格式

输出一行，包含一个字符串，表示待破解的凯撒密码对应的明文。
`,
      score: 25,
      explanation: '样例中由 `A -> D` 可知偏移量为 3，因此解密时把待破解密文中的每个字符都逆向偏移 3 位。',
      tags: ['编程题', '字符串', '模拟'],
      template: '#include <iostream>\n#include <cstring>\nusing namespace std;\n\nint main() {\n    string s1, s2, s3;\n    cin >> s1 >> s2 >> s3;\n    // 在此编写代码\n    return 0;\n}',
      referenceCode: '#include <iostream>\n#include <cstring>\nusing namespace std;\n\nint main() {\n    string s1, s2, s3;\n    cin >> s1 >> s2 >> s3;\n    int d = s1[0] - s2[0];\n    d = (d % 26 + 26) % 26;\n    for (int i = 0; i < s3.length(); i++) {\n        int ch = (s3[i] - \'A\' + d) % 26;\n        cout << (char)(ch + \'A\');\n    }\n    return 0;\n}',
      answer: '',
      problemNumber: 'B4500',
    },
    ],
};
