// 2025年12月 GESP C++ 三级真题 (第12次认证)
// 数据说明：本卷已按官方真题 PDF 完成主体回填。
//-客观题 1~15：题面、选项与答案表均可由官方 PDF 直接提取；少量代码/流程图片题按官方版式做等价转写。
//-判断题 16~25：题面与答案表均可由官方 PDF 直接核对。
//-编程题 26~27：题名、题意主体、样例与参考代码来自官方 PDF；少量数据范围数字在 PDF 文本层缺失，当前仅保留题意、样例与参考代码级别的可靠内容。
export const paperData = {
    id: '2025-12-l3',
    title: '2025年12月 GESP C++ 三级真题',
    level: 3,
    year: 2025,
    month: 12,
    session: 12,
    timeLimit: 90 * 60,
    source: {
        officialPdf: 'https://gesp.ccf.org.cn/101/attach/1723012369874976.pdf',
        notes: '客观题 25 题已按官方 PDF 回填，其中单选 3/4/9/12/13/15 与判断 4/7/10 含代码或流程图片，当前为依据官方 PDF 的等价排版整理。编程题 2 题已补题意、样例与参考代码；数据范围中的少量数字因 PDF 文本层缺失未强行臆补。'
    },
    questions: [
        {
            id: 1,
            type: 'single',
            question: '请将二进制数 (1101.101)₂ 转换为等值的 10 进制数（ ）。',
            options: ['14.25', '13.625', '13.5', '14.5'],
            answer: 1,
            score: 2,
            explanation: '1101₂=13，.101₂=1/2+1/8=0.625，所以结果是 13.625。'
        },
        {
            id: 2,
            type: 'single',
            question: '以下关于标准 C++ 一维数组的描述，哪一项是错误的？（ ）',
            options: [
                '数组的下标从 0 开始',
                '数组在内存中是连续存放的',
                '数组的长度只能在运行时才能确定',
                '可以在程序中修改数组某个元素的值'
            ],
            answer: 2,
            score: 2,
            explanation: '标准 C++ 中普通数组长度通常需要在编译期确定，因此 C 错误。'
        },
        {
            id: 3,
            type: 'single',
            question: '下列代码段执行后，变量 sum 的值是（ ）。\n{\n    int sum = 0;\n    for (int i = 1; i <= 10; i++) {\n        if (i % 3 == 8 >> 2)\n            continue;\n        sum += i;\n    }\n}',
            options: ['12', '17', '33', '40'],
            answer: 3,
            score: 2,
            explanation: '8>>2=2，所以跳过 i%3==2 的 i，即 2、5、8；1 到 10 总和为 55，减去 2+5+8=15，得 40。'
        },
        {
            id: 4,
            type: 'single',
            question: '执行以下程序段，输出值是（ ）。\n```cpp\nint x = 5;\nif (x == 3 >> 2) x = 8 >> 3;\ncout << x << endl;\n```',
            options: ['0', '5', '120', '1'],
            answer: 1,
            score: 2,
            explanation: '3>>2=0，条件 x==0 不成立，因此 x 保持为 5。'
        },
        {
            id: 5,
            type: 'single',
            question: '已知字符串 s = "C++ Programming"，下列程序运行的结果是（ ）。\n```cpp\ncout << (int)(s.length() | 3) << endl;\n```',
            options: ['14', '15', '16', '17'],
            answer: 1,
            score: 2,
            explanation: '字符串长度为 15，15|3 仍为 15，所以输出 15。'
        },
        {
            id: 6,
            type: 'single',
            question: '以下代码是一个程序的部分代码，能够正确执行，输出的结果是（ ）。\n```cpp\nint arr[5] = {1, 2, 3, 4, 5};\nint p = arr[1];\ncout << (p+2) << endl;\n```',
            options: ['1', '2', '3', '4'],
            answer: 3,
            score: 2,
            explanation: 'arr[1] 为 2，因此 p+2=4。'
        },
        {
            id: 7,
            type: 'single',
            question: '以下关于 C++ 求最小值函数 min() 的描述，不正确的是（ ）。',
            options: [
                '函数必须返回一个值',
                '该函数可以嵌套调用',
                '调用 min(5) 是错误的，不能通过编译',
                '调用 min()（不传任何参数）可以通过编译，结果为 0'
            ],
            answer: 3,
            score: 2,
            explanation: '标准库 min 至少需要参数，min() 不传参无法通过编译，因此 D 不正确。'
        },
        {
            id: 8,
            type: 'single',
            question: '在一个特定的计算机系统中，假如 unsigned int 类型需要占用 2 个字节的存储空间（每个字节有 8 位），则 unsigned int 可以表示的数据范围是（ ）。',
            options: ['0 ~ 65535', '0 ~ 65536', '-65536 ~ 65535', '0 ~ 32767'],
            answer: 0,
            score: 2,
            explanation: '2 字节共 16 位，无符号整数范围是 0 到 2^16-1，即 65535。'
        },
        {
            id: 9,
            type: 'single',
            question: '以下代码执行后，数组 arr 的内容是（ ）。\n```cpp\nint arr[6] = {1, 2, 3, 4, 5, 6};\nfor (int i = 0; i < 6; i += 2) {\n    arr[i] = arr[i]+arr[i+1];\n    arr[i+1] = arr[i]-arr[i+1];\n    arr[i] = arr[i]-arr[i+1];\n}\n```',
            options: ['{2,1,4,3,6,5}', '{1,2,3,4,5,6}', '{3,1,4,2,5,3}', '{1,3,2,5,4,6}'],
            answer: 0,
            score: 2,
            explanation: '这三句实现相邻两个数交换，因此 (1,2)、(3,4)、(5,6) 分别交换，结果为 {2,1,4,3,6,5}。'
        },
        {
            id: 10,
            type: 'single',
            question: 'a & b | (c ^ d)，其中 a = 3，b = 7，c = 15，d = 4，计算结果是（ ）。',
            options: ['十进制 11', '二进制 11', '八进制 11', '十六进制 11'],
            answer: 0,
            score: 2,
            explanation: '3&7=3，15^4=11，最后 3|11=11，所以结果是十进制 11。'
        },
        {
            id: 11,
            type: 'single',
            question: '整型变量 x 的初始值为 10，以下代码的输出结果是（ ）。\n```cpp\nint t = x--;\nt -= x;\ncout << t << endl;\n```',
            options: ['0', '-1', '1', '死循环'],
            answer: 2,
            score: 2,
            explanation: 't 先取到 10，之后 x 变成 9，再执行 t-=x 得到 1。'
        },
        {
            id: 12,
            type: 'single',
            question: '根据下面的流程图，如果成绩 score 输入 60，输出的结果是（ ）。',
            options: ['优秀', '及格', '不及格', '没有输出'],
            answer: 1,
            score: 2,
            explanation: '60 不满足 score≥90，但满足 score≥60，因此输出“及格”。'
        },
        {
            id: 13,
            type: 'single',
            question: '以下代码运行后，sum 的结果是（ ）。\n```cpp\nint arr[5] = {2, 4, 6, 8, 10};\nint sum = 0;\nfor (int i = 0; i < 5; i++) {\n    switch (arr[i] % (1 | 2)) {\n        case 0: sum += 1; break;\n        case 1: sum += 2; break;\n        case 2: sum += 3; break;\n    }\n}\n```',
            options: ['10', '11', '14', '15'],
            answer: 1,
            score: 2,
            explanation: '1|2=3。各元素对 3 取模依次为 2、1、0、2、1，对 sum 的贡献为 3+2+1+3+2=11。'
        },
        {
            id: 14,
            type: 'single',
            question: '以下关于 C++ 中 abs() 函数的描述，正确的是（ ）。',
            options: [
                'abs() 函数可用于计算 int 类型整数的绝对值，头文件为 <cmath> 或 <cstdlib>',
                '调用 abs(3.14) 可以四舍五入得到 3',
                'abs(-1, -2) 的返回值是 1',
                '若传入负数浮点数，abs() 会自动截断小数部分后返回整数绝对值'
            ],
            answer: 0,
            score: 2,
            explanation: 'A 是正确表述；B、D 都误解了 abs 对浮点数的处理，C 也不是合法调用方式。'
        },
        {
            id: 15,
            type: 'single',
            question: '如果字符串 s 的值是 GESP，以下代码 s 的最后结果是（ ）。\n```cpp\nfor (int i = 0; i < s.length(); i++) {\n    s[i] = toupper(s[i]+i);\n}\n```',
            options: ['GESP', 'HFTR', 'hesp', 'GFUS'],
            answer: 3,
            score: 2,
            explanation: '字符分别加上 0、1、2、3：G→G，E→F，S→U，P→S；toupper 后仍为大写，所以结果是 GFUS。'
        },
        {
            id: 16,
            type: 'judge',
            question: '在 C++ 中，数组名不能改变，数组名不能被赋值。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '数组名不是可修改左值，不能像普通变量那样整体赋值。'
        },
        {
            id: 17,
            type: 'judge',
            question: '整型变量 a 的值为 3，浮点数变量 b 的值为 3.5，在 C++ 编译环境下，经过 a *= b 计算后，a 的值变为 10.5，此时如果输出 a，将输出 10.5。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: 'a 是整型，复合赋值后结果会转换回 int，输出不是 10.5。'
        },
        {
            id: 18,
            type: 'judge',
            question: 'strcmp(str1, str2) 返回 0 表示 str1 大于 str2，返回正数表示两者相等。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: 'strcmp 返回 0 表示两字符串相等，正数表示 str1 大于 str2。'
        },
        {
            id: 19,
            type: 'judge',
            question: '以下代码输出结果为 8。\n```cpp\nint a = 5, b = 3;\nint c = a+++++b;\ncout << c << endl;\n```',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: 'a++ 取 5，++b 变 4，c=5+4=9，不是 8。'
        },
        {
            id: 20,
            type: 'judge',
            question: '位运算符 &、|、^、~ 的优先级高于算术运算符 +、-、*、/。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '算术运算符的优先级高于大多数位运算符。'
        },
        {
            id: 21,
            type: 'judge',
            question: '在 C++ 中，int a[] = {1, 2, 3, 4, 5}; 可以定义一个包含 5 个元素的整型数组。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '编译器会根据初始化列表自动推断数组长度为 5。'
        },
        {
            id: 22,
            type: 'judge',
            question: 'C++ 表达式 z = a > b ? x : y 等同于：\n```cpp\nif (a > b) {\n    z = x;\n} else {\n    z = y;\n}\n```',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '条件运算符在这里正是“若 a>b 取 x，否则取 y”的含义。'
        },
        {
            id: 23,
            type: 'judge',
            question: '在 C++ 中，++ 和 -- 运算符只能用于整型变量，不能用于浮点数变量。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '浮点类型也可以使用 ++ 和 --。'
        },
        {
            id: 24,
            type: 'judge',
            question: '给定一个正整数 a，当需要计算 -a 的补码时，有这样一个计算技巧：将 a 的二进制形式从右往左扫描，遇到第一个 1 之后，将找到的第一个 1 左边的所有位都取反，能得到 -a 的补码。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '这是由补码求负数的一种常见技巧，等价于“保留最低位 1 及其右侧，左侧全部取反”。'
        },
        {
            id: 25,
            type: 'judge',
            question: '以下代码中，Hello 将被输出 5 次。\n```cpp\nfor (int i = 0; i < 5; i++);\n{\n    cout << "Hello" << endl;\n}\n```',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: 'for 语句后多了分号，循环体为空；后面的代码块只会独立执行一次。'
        }
    ],
    programmingQuestions: [
        {
            id: 26,
            type: 'programming',
            title: '密码强度',
            problemNumber: 'B4449',
            source: 'official-pdf+luogu-mapping',
            description: '小杨是学校网络安全小组的成员，今天他的任务是设计一个“密码强度检测器”，帮助同学们检查自己的密码是否足够安全。一个安全的密码需要同时满足：长度至少为 8；至少包含一个大写字母；至少包含一个数字。若满足输出 Y，否则输出 N。',
            inputDescription: '第一行一个正整数 T，表示需要安全检测的密码组数。接下来 T 行，每行一个仅由大小写字母和数字组成的字符串，表示一个待检测密码。',
            outputDescription: '对每组密码输出一行，满足强度要求输出 Y，否则输出 N。',
            samples: [
                {
                    input: '6\nPAs1s2an\n1a2bCql3\nPa12bsna\nab1da3cd\nPaabdbcd\nPa2',
                    output: 'Y\nY\nY\nN\nN\nN'
                }
            ],
            explanation: '逐个字符串检查三个条件：长度、是否含大写字母、是否含数字。三个条件都满足则输出 Y。官方 PDF 文本层中的数据范围数字有缺失，但不影响题意、样例与解法理解。',
            tags: ['编程题', '字符串', '模拟'],
            template: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}',
            referenceCode: '#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    int T;\n    cin >> T;\n    while (T--) {\n        string password;\n        cin >> password;\n        bool has_upper = false;\n        bool has_digit = false;\n        for (size_t i = 0; i < password.length(); ++i) {\n            if (isupper(password[i])) {\n                has_upper = true;\n            }\n            if (isdigit(password[i])) {\n                has_digit = true;\n            }\n        }\n        if (password.length() >= 8 && has_upper && has_digit) {\n            cout << "Y\\n";\n        } else {\n            cout << "N\\n";\n        }\n    }\n    return 0;\n}'
        },
        {
            id: 27,
            type: 'programming',
            title: '小杨的智慧购物',
            problemNumber: 'B4450',
            source: 'official-pdf+luogu-mapping',
            description: '小杨需要购买 M 种不同的文具，商店共有 N 件文具，每件文具有种类编号和价格。对于每种文具，小杨只会购买该种类中最便宜的一件。请计算买齐这 M 种文具一共要花多少钱。',
            inputDescription: '第一行输入两个正整数 M 和 N，分别表示文具种类数与商品总数。接下来 N 行每行两个正整数 K 和 P，表示某件文具的种类编号和价格。保证每个种类至少出现一次。',
            outputDescription: '输出一个整数，表示购买这 M 种文具的最小总花费。',
            samples: [
                {
                    input: '2 5\n1 1\n1 2\n1 1\n2 3\n2 10',
                    output: '4'
                }
            ],
            explanation: '分别维护每个种类的最低价格，最后把 1..M 的最小值累加即可。样例中种类 1 取 1，种类 2 取 3，总价为 4。官方 PDF 文本层里的数据范围数字未完整提取，因此当前未补具体上界。',
            tags: ['编程题', '模拟', '最值统计', '数组'],
            template: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}',
            referenceCode: '#include <iostream>\n#include <cstring>\nusing namespace std;\nint min_price[100005];\nint main() {\n    int M, N;\n    cin >> M >> N;\n    for (int i = 0; i <= M; i ++)\n        min_price[i] = 1000000000;\n    for (int i = 0; i < N; ++i) {\n        int K, P;\n        cin >> K >> P;\n        min_price[K] = min(min_price[K], P);\n    }\n    int total_cost = 0;\n    for (int k = 1; k <= M; ++k) {\n        total_cost += min_price[k];\n    }\n    cout << total_cost;\n    return 0;\n}'
        }
    ]
};
