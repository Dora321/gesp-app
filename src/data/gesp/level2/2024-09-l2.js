// 2024年9月 GESP C++ 二级真题 (第7次认证)
export const paperData = {
    id: '2024-09-l2',
    title: '2024年9月 GESP C++ 二级真题',
    level: 2,
    year: 2024,
    month: 9,
    session: 7,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "山东大学于 1972 年研制成功 DJL-1 计算机，设计存贮周期为 2μs，相当于现代计算机的（ ）。",
            options: ["内存", "磁盘", "CPU", "显示器"],
            answer: 0,
            score: 2,
            explanation: '磁心存储器具有随机存取特性和较快速度，在当时相当于现代计算机的内存（RAM）。',
            tags: ["基础知识", "计算机历史"]
        },
        {
            id: 2,
            type: 'single',
            question: "IPv4 版本的因特网总共有（ ）个 A 类地址网络。",
            options: ["65000", "200 万", "126", "128"],
            answer: 2,
            score: 2,
            explanation: 'A 类地址网络号占 1 字节，首位为 0，除去全 0 和全 1 的保留地址，共有 126 个。',
            tags: ["基础语法", "网络协议"]
        },
        {
            id: 3,
            type: 'single',
            question: "在 C++ 中，下列不可做变量的是 （ ） 。",
            options: ["ccf-gesp", "ccf_gesp", "ccfGesp", "_ccfGesp"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["变量与标识符"]
        },
        {
            id: 4,
            type: 'single',
            question: "在 C++ 中，与for (int i = 1; i < 10; i++)效果相同的是 （ ） 。",
            options: ["for (int i = 0; i < 10; i++)", "for (int i = 0; i < 11; i++)", "for (int i = 1; i < 10; ++i)", "for (int i = 0; i < 11; ++i)"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["循环"]
        },
        {
            id: 5,
            type: 'single',
            question: "在 C++ 中，`cout << (5 / 2+5 % 3)` 的输出是（ ）。",
            options: ["1", "2", "4", "5"],
            answer: 2,
            score: 2,
            explanation: '5 / 2 = 2 (整数除法)，5 % 3 = 2。2+2 = 4。',
            tags: ["输入输出", "运算符"]
        },
        {
            id: 6,
            type: 'single',
            question: "假定变量 a 和 b 可能是整型、字符型或浮点型，则下⾯ C++ 代码执行时先后输入 -2 和 3.14 后，其输出不可能是（ ）。",
            options: ["（该选项文本提取异常，待按原卷补录）", "1.14", "（该选项文本提取异常，待按原卷补录）", "将触发异常"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "变量与标识符", "程序分析"]
        },
        {
            id: 7,
            type: 'single',
            question: "在 C++ 代码中假设 N 为正整数，则下⾯代码能获得个位数的是（ ）。",
            options: ["N % 10", "N / 10", "N && 10", "以上选项均不正确"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["程序分析"]
        },
        {
            id: 8,
            type: 'single',
            question: "下⾯ C++ 代码执行后的输出是（ ）。",
            options: ["0#", "1#", "0#0#1", "没有输出"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 9,
            type: 'single',
            question: "执行下⾯ C++ 代码并输入 1 和 0 ，有关说法正确的是（ ）。 cin >> a; cin >> b; cout << (a+b); int i; for (i = 0; i < 10; i++){ if (i % 2) break; cout << \"0#\"; } if(i==10) cout << \"1#\";。",
            options: ["（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["循环", "条件判断", "输入输出"]
        },
        {
            id: 10,
            type: 'single',
            question: "下⾯ C++ 代码执行后的输出是（ ）。",
            options: ["（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 11,
            type: 'single',
            question: "下图是 C++ 程序执行后的输出（右对角线对齐图案）。横线处应填入代码是（ ）。\n```cpp\nfor (int i = 1; i < 6; i++) {\n    for (int j = ________________; j++) \n        cout << j;\n    cout << endl;\n}\n```",
            options: ["j = i; j < i", "j = 1; j < i", "j = i; j < i * 2", "j = i+1; j < i+i"],
            answer: 2,
            score: 2,
            explanation: 'j 从 i 开始到 2*i-1 结束，输出项数随 i 增加。',
            tags: ["循环", "规律分析"]
        },
        {
            id: 12,
            type: 'single',
            question: "下⾯ C++ 代码执行后输出逆序数。横线处应填入（ ）。\n```cpp\nint N, rst = 0;\ncin >> N;\nwhile (N) {\n    ________________;\n    ________________;\n}\ncout << rst;\n```",
            options: ["rst = rst * 10+N % 10; N = N / 10;", "rst += N % 10; N = N / 10;", "rst = rst * 10+N / 10; N = N % 10;", "rst += N / 10; N = N % 10;"],
            answer: 0,
            score: 2,
            explanation: 'rst = rst * 10+N % 10 实现将末位加入反转数。N /= 10 去掉末位。',
            tags: ["循环", "数字处理"]
        },
        {
            id: 13,
            type: 'single',
            question: "下⾯的 C++ 代码用于输入学⽣成绩计算平均成绩。说法错误的是（ ）。\n```cpp\nfloat Sum = 0;\nint cnt = 0, score;\nwhile (1) {\n    cin >> score;\n    if (score < 0) break;\n    Sum += score;\n    cnt++;\n}\ncout << Sum / cnt;\n```",
            options: ["代码 while (1) 写法错误", "如果输入负数，将结束输入并输出", "变量 int score 初始值不确定不影响逻辑", "若 cnt 为 0 可能除零错误"],
            answer: 0,
            score: 2,
            explanation: 'while(1) 是合法的死循环写法，通常配合 break 使用。',
            tags: ["循环", "结构设计"]
        },
        {
            id: 14,
            type: 'single',
            question: "以下 C++ 代码判断正整数 N 是否为质数。横线上填写（ ）。\n```cpp\nint N;\ncin >> N;\nbool Flag = (N >= 2);\nfor (int i = 2; i * i <= N; i++) {\n    if (________________) {\n        Flag = false;\n        break;\n    }\n}\n```",
            options: ["num % i", "N % i == 0", "N / i", "N / i == 0"],
            answer: 1,
            score: 2,
            explanation: '判断质数的核心是看 N 能否被 i 整除。',
            tags: ["循环", "质数判定"]
        },
        {
            id: 15,
            type: 'single',
            question: "假设输入正整数 N，以下 C++ 代码用于实现十进制转二进制。横线处应填写（ ）。\n```cpp\nint N;\ncin >> N;\nstring s = \"\";\nwhile (N > 0) {\n    ________________;\n    N /= 2;\n}\ncout << s;\n```",
            options: ["s = to_string(N % 2)+s", "s = s+to_string(N % 2)", "s = to_string(N / 2)+s", "s = s+to_string(N / 2)"],
            answer: 0,
            score: 2,
            explanation: '十进制转二进制通过余数逆序排列实现。',
            tags: ["数制转换", "字符串"]
        },
        {
            id: 16,
            type: 'judge',
            question: "C++ 是一门面向对象的编程语言，也是一门高级语言。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "C++ 支持面向对象特性，属于高级编程语言。",
            tags: ["判断题", "基础知识"]
        },
        {
            id: 17,
            type: 'judge',
            question: "C++ 语句 `cout << (3, 4, 5);` 执行后，将输出 `3 4 5`，且每个输出项之间用空格分开。",
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: "这是逗号运算符的用法。逗号运算符返回最后一个表达式的值，故只会输出 5。",
            tags: ["判断题", "运算符"]
        },
        {
            id: 18,
            type: 'judge',
            question: "C++ 表达式 `12 % 10 % 10` 的值为 2。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "12 % 10 = 2，2 % 10 = 2。",
            tags: ["判断题", "运算符"]
        },
        {
            id: 19,
            type: 'judge',
            question: "C++ 语句 `cout << rand << ' ' << rand;` 的第二个输出值通常比第一个大。",
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: "rand() 生成的是伪随机数，没有单调递增规律。且题目中缺少括号调用函数，直接输出函数地址也是不固定的。",
            tags: ["判断题", "输入输出"]
        },
        {
            id: 20,
            type: 'judge',
            question: "定义 C++ 的 int 类型的变量 ch，而且值为 '1'，则语句 `cout << int(ch);` 的输出为 1。",
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: "字符 '1' 的 ASCII 码是 49，输出应为 49。",
            tags: ["判断题", "数据类型"]
        },
        {
            id: 21,
            type: 'judge',
            question: "下⾯ C++ 代码执行后的输出是 10。\n```cpp\nint i;\nfor (i = 0; i < 10; i++) continue;\nif (i == 10) cout << i;\n```",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "循环结束后 i 的值为 10，if 条件成立，输出 10。",
            tags: ["判断题", "循环控制"]
        },
        {
            id: 22,
            type: 'judge',
            question: "下⾯ C++ 代码能实现：如果 N 大于 M，则交换 N 和 M 的值。\n```cpp\nif (N > M) {\n    int tmp = N; N = M; M = tmp;\n}\n```",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "这是标准的三变量交换逻辑。",
            tags: ["判断题", "变量交换"]
        },
        {
            id: 23,
            type: 'judge',
            question: "下⾯ C++ 代码中的 L3 标记的代码行调整为 `for (int i = 0; i < 5; i++)` 后，输出结果可能不同。",
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: "循环次数如果相同且逻辑一致，输出通常相同。具体需对比原代码段，此处假设逻辑对等。",
            tags: ["判断题", "循环分析"]
        },
        {
            id: 24,
            type: 'judge',
            question: "下⾯ C++ 代码用于求第 N 个斐波那契数，N 限定为大于 2。\n```cpp\nint f1 = 1, f2 = 1, f3;\nfor (int i = 3; i <= N; i++) {\n    f3 = f1+f2; f1 = f2; f2 = f3;\n}\ncout << f3;\n```",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "这是标准的斐波那契数列叠代求解方法。",
            tags: ["判断题", "递推逻辑"]
        },
        {
            id: 25,
            type: 'judge',
            question: "在 C++ 代码中，`continue` 语句只能用于 `for` 循环中。",
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: "continue 也可以用于 while 循环。",
            tags: ["判断题", "基础语法"]
        }
    ],
    programmingQuestions: [
    {
      id: 26,
      type: 'programming',
      samples: [{ input: '待补充', output: '待补充' }],
      referenceCode: '// 待补充',
      question: `
# [GESP202409 二级] 数位之和

## 题目描述

小杨有 \$n\$ 个正整数，他认为一个正整数是美丽数字当且仅当该正整数每一位数字的总和是 \$7\$ 的倍数。

小杨想请你编写一个程序判断 \$n\$ 个正整数哪些是美丽数字。

## 输入格式

第一行包含一个正整数 \$n\$，表示正整数个数。  
之后 \$n\$ 行，每行一个包含一个正整数 \$a_i\$。

## 输出格式

对于每个正整数输出一行一个字符串，如果是美丽数字则输出 \`Yes\`，否则输出 \`No\`。
`,
      score: 25,
      explanation: "对每个数求十进制数位和，若数位和是 7 的倍数则输出 Yes，否则输出 No。",
      tags: ["编程题", "模拟", "数位分解"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint digitSum(long long x) {\n    int s = 0;\n    while (x > 0) { s += x % 10; x /= 10; }\n    return s;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    while (n--) {\n        long long x;\n        cin >> x;\n        cout << (digitSum(x) % 7 == 0 ? \"Yes\" : \"No\") << '\\n';\n    }\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [{ input: '待补充', output: '待补充' }],
      referenceCode: '// 待补充',
      question: `
# [GESP202409 二级] 小杨的 N 字矩阵

## 题目描述

小杨想要构造一个 \$m \\times m\$ 的 \$N\$ 字矩阵（\$m\$ 为奇数），这个矩阵的从左上角到右下角的对角线、第 \$1\$ 列和第 \$m\$ 列都是半角加号 \`+\` ，其余都是半角减号 \`-\` 。例如，一个 \$5 \\times 5\$ 的 N 字矩阵如下：

\`\`\`plain
+---+
++--+
+-+-+
+--++
+---+
\`\`\`

请你帮小杨根据给定的 \$m\$ 打印出对应的 N 字矩阵。

## 输入格式

输入只有一行包含一个正整数 \$m\$。

## 输出格式

输出对应的 \$N\$ 字矩阵。
`,
      score: 25,
      explanation: "第 1 列、第 m 列和主对角线位置输出 +，其余位置输出 -，逐行打印即可。",
      tags: ["编程题", "字符画", "模拟"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int m;\n    cin >> m;\n    for (int i = 0; i < m; ++i) {\n        for (int j = 0; j < m; ++j) {\n            if (j == 0 || j == m-1 || i == j) cout << '+';\n            else cout << '-';\n        }\n        cout << '\\n';\n    }\n    return 0;\n}",
      answer: '',
    }
]
};
