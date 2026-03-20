// 2024年3月 GESP C++ 三级真题 (第5次认证)
// 数据说明：本卷以官方真题 PDF 为主完成回填。
//-客观题 1~25 的题面均来自官方 PDF 文本提取，未使用公开解析还原题面
//-判断题答案表在 PDF 文本层中未被完整提取，当前答案按题面语义逐题复核填写
//-编程题 1~2 题名、题意、样例与参考代码来自官方 PDF，同时与公开 OJ 题号 B3956/B3957 对齐
export const paperData = {
    id: '2024-03-l3',
    title: '2024年3月 GESP C++ 三级真题',
    level: 3,
    year: 2024,
    month: 3,
    session: 5,
    timeLimit: 90 * 60,
    source: {
        officialPdf: 'https://gesp.ccf.org.cn/101/attach/1602047101108256.pdf',
        notes: '客观题 25 题已补齐；判断题答案表系依据官方题面逐题复核补入；编程题已补 2 题摘要与参考代码。'
    },
    questions: [
        {
            id: 1,
            type: 'single',
            question: '整数 -5 的 16 位补码表示是（   ）。',
            options: ['1005', '1006', 'FFFA', 'FFFB'],
            answer: 3,
            score: 2,
            explanation: '-5 的 16 位补码为 1111 1111 1111 1011，即十六进制 FFFB。'
        },
        {
            id: 2,
            type: 'single',
            question: '如果 16 位短整数 -2 的十六进制表示是 "FFFE"，则短整数 -4 的十六进制是（   ）。',
            options: ['FF04', 'FFFA', 'FFFC', 'FFFH'],
            answer: 2,
            score: 2,
            explanation: '-4 的 16 位补码是 1111 1111 1111 1100，对应十六进制 FFFC。'
        },
        {
            id: 3,
            type: 'single',
            question: '下面 C++ 代码执行后的输出是（   ）。\n```cpp\nint main() {\n    cout << (3 | 16) << endl;\n    return 0;\n}\n```',
            options: ['3', '16', '19', '48'],
            answer: 2,
            score: 2,
            explanation: '3 的二进制是 0011，16 的二进制是 10000，按位或后得到 10011，即 19。'
        },
        {
            id: 4,
            type: 'single',
            question: '定义整数 int x = -5，则执行 C++ 代码 cout << (x == (x << 1 >> 1)) 输出是（   ）。',
            options: ['0', '1', '-5', '5'],
            answer: 1,
            score: 2,
            explanation: '按本题语境的补码与移位规则理解，左移再右移后恢复原值，因此比较结果为真，输出 1。'
        },
        {
            id: 5,
            type: 'single',
            question: '已知字符 \"0\" 的 ASCII 编码的十进制表示为 48，则执行下面 C++ 代码后，输出是（   ）。\n```cpp\nint main() {\n    string s = "316";\n    int n = s.length();\n    int x = 0;\n    for (int i = 0; i < n; i++) x += s[i];\n    cout << x << endl;\n    return 0;\n}\n```',
            options: ['10', '58', '154', '316'],
            answer: 2,
            score: 2,
            explanation: '字符 3、1、6 的 ASCII 分别是 51、49、54，和为 154。'
        },
        {
            id: 6,
            type: 'single',
            question: '下面 C++ 代码执行后数组中大于 0 的数的特征是（   ）。\n```cpp\nint main() {\n    int a[20], i;\n    for (i = 0; i < 20; i++) a[i] = i+1;\n    for (int i = 0; i < 20; i++)\n        if ((a[i] % 2) && (a[i] % 3)) a[i] = 0;\n    for (i = 0; i < 20; i++)\n        if (a[i]) cout << a[i] << " ";\n    return 0;\n}\n```',
            options: ['2 的倍数', '3 的倍数', '能被 2 或 3 整除的数', '能被 2 和 3 同时整除的数'],
            answer: 2,
            score: 2,
            explanation: '只有既不能被 2 整除又不能被 3 整除的数才被置为 0，因此留下的是能被 2 或 3 整除的数。'
        },
        {
            id: 7,
            type: 'single',
            question: '执行下面 C++ 代码后输出的第一个数是（   ）。\n```cpp\nint main() {\n    int a[20], i;\n    for (i = 0; i < 20; i++) a[i] = i+1;\n    for (; i > 0; i--) cout << a[i-1] << " ";\n    return 0;\n}\n```',
            options: ['20', '19', '1', '不确定'],
            answer: 0,
            score: 2,
            explanation: '第二个循环从 i=20 开始，首次输出 a[19]，即 20。'
        },
        {
            id: 8,
            type: 'single',
            question: '在下列代码的横线处填写（   ），可以使得输出是 GESP IS INTERESTING。\n```cpp\nint main() {\n    string str = "gEsP is Interesting";\n    int x = str.length();\n    for (int i = 0; i < x; i++)\n        if ((str[i] >= \"a\"[0]) && (str[i] <= \"z\"[0]))\n            ________________________;\n    cout << str << endl;\n    return 0;\n}\n```',
            options: ["str[i] += 'a'-'A'", 'str[i] += 20', "str[i] += 'A'-'a'", '无法实现'],
            answer: 2,
            score: 2,
            explanation: '把小写字母转成大写应减去 32，即加上 \"A\"-\"a\"。'
        },
        {
            id: 9,
            type: 'single',
            question: '假设英文句子由若干词构成。下面 C++ 代码统计输出的词数是（   ）。\n```cpp\nint main() {\n    string str = "gEsP is  Interesting  !";\n    int x = str.length();\n    int nwords = 0;\n    for (int i = 0; i < x; i++)\n        if (str[i] == \" \"[0]) {\n            nwords++;\n            while (str[++i] == \" \"[0]);\n        }\n    cout << nwords << endl;\n    return 0;\n}\n```',
            options: ['1', '2', '3', '4'],
            answer: 2,
            score: 2,
            explanation: '代码统计的是“连续空格段”的个数。该字符串共有 3 段空格，因此输出 3。'
        },
        {
            id: 10,
            type: 'single',
            question: 'C++ 的字符变量的码值是整数，下面字面量形式的字符码值最大的是（   ）。',
            options: ['100', '075', '0x70', '0x60'],
            answer: 2,
            score: 2,
            explanation: '100 是十进制 100；075 是八进制 75，即十进制 61；0x70 是十六进制 112；0x60 是十六进制 96，最大的是 0x70。'
        },
        {
            id: 11,
            type: 'single',
            question: '下面 C++ 程序执行的结果是（   ）。\n```cpp\nint main() {\n    int a[20], i;\n    int cnt = 0;\n    for (i = 0; i < 20; i++) a[i] = i+1;\n    for (; i > 1; i--)\n        if ((a[i-1]+a[i-2]) % 3) cnt++;\n    cout << cnt << endl;\n    return 0;\n}\n```',
            options: ['5', '6', '10', '12'],
            answer: 3,
            score: 2,
            explanation: '共检查 19 对相邻数，其和依次为 3,5,7,...,39，其中 7 对能被 3 整除，其余 12 对使 cnt 增加。'
        },
        {
            id: 12,
            type: 'single',
            question: '定义字符数组 char str[20] = {\'G\', \'E\', \'S\', \'P\'};，则 str 的字符串长度为（   ）。',
            options: ['4', '5', '19', '20'],
            answer: 0,
            score: 2,
            explanation: '部分初始化时其余元素自动补 0，因此该字符数组等价于以空字符结尾的字符串 "GESP"，长度为 4。'
        },
        {
            id: 13,
            type: 'single',
            question: '定义整型变量 int a = 3, b = 16，则 a | b 的值和 a+b 的关系是（   ）。',
            options: ['大于', '等于', '小于', '等于或小于'],
            answer: 1,
            score: 2,
            explanation: '3 | 16 = 19，而 3+16 = 19，因此两者相等。'
        },
        {
            id: 14,
            type: 'single',
            question: '小杨的父母最近刚刚给他买了一块华为手表，他说手表上跑的是鸿蒙，这个鸿蒙是（   ）。',
            options: ['小程序', '计时器', '操作系统', '神话人物'],
            answer: 2,
            score: 2,
            explanation: '鸿蒙（HarmonyOS）是操作系统。'
        },
        {
            id: 15,
            type: 'single',
            question: '中国计算机学会（CCF）在 2024 年 1 月 27 日的颁奖典礼上颁布了王选奖，王选先生的重大贡献是（   ）。',
            options: ['制造自动驾驶汽车', '创立培训学校', '发明汉字激光照排系统', '成立方正公司'],
            answer: 2,
            score: 2,
            explanation: '王选先生的重要贡献是汉字激光照排系统。'
        },
        {
            id: 16,
            type: 'judge',
            question: '任意整数 a 的二进制反码与补码都有 1 位不同。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '并非任意整数都只差 1 位；正数的反码和补码相同，负数反码加 1 得补码时变化位数也不固定。'
        },
        {
            id: 17,
            type: 'judge',
            question: '对整型变量 int a = 3，执行 C++ 代码 a << 2 将把 2 输出到 a 中。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: 'a << 2 是表达式，不会修改变量 a；其值是 12，也不是 2。'
        },
        {
            id: 18,
            type: 'judge',
            question: '下面 C++ 代码可以计算 1 到 100 的累加和，采用的是穷举法。\n```cpp\nint main() {\n    int i, sum = 0;\n    for (int i = 1; i <= 100; i++) sum += i;\n    cout << sum << endl;\n    return 0;\n}\n```',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '程序逐个枚举 1 到 100 的整数并累加，属于直接枚举/遍历求和。'
        },
        {
            id: 19,
            type: 'judge',
            question: '一个 int 类型变量 a，执行操作 (a << 2 >> 2) 后的值一定是 a。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '左移会丢失高位信息，且对负数还涉及符号位问题，因此结果不一定恢复为原值。'
        },
        {
            id: 20,
            type: 'judge',
            question: '在 C++ 语言中，(010 << 1) 执行结果是 100。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '010 是八进制数，等于十进制 8，左移 1 位得到 16，不是 100。'
        },
        {
            id: 21,
            type: 'judge',
            question: '执行下面 C++ 代码后将输出 2。\n```cpp\nint main() {\n    string str = "gEsP is Interesting";\n    int x = str.find("s");\n    cout << x << endl;\n    return 0;\n}\n```',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '字符串中字符 s 首次出现的位置下标为 2。'
        },
        {
            id: 22,
            type: 'judge',
            question: '在 C++ 语言中，字符数组被定义时，它的大小可以调整。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '普通数组长度在定义时就固定，之后不能像 vector/string 那样动态调整。'
        },
        {
            id: 23,
            type: 'judge',
            question: '对定义的数组 int a[7] = {2, 0, 2, 4, 3, 1, 6}，可以用简单循环就找到其中最小的整数。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '顺序扫描数组并维护当前最小值即可。'
        },
        {
            id: 24,
            type: 'judge',
            question: '小杨今年春节回奶奶家了，奶奶家的数字电视要设置 IP 地址并接入到 WIFI 盒子才能收看节目，那这个 WIFI 盒子具有路由器的功能。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '题目语境下，WIFI 盒子负责网络接入与地址配置，具备路由/联网功能。'
        },
        {
            id: 25,
            type: 'judge',
            question: '任何一个 for 循环都可以转化为等价的 while 循环。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: 'for 循环的初始化、条件、迭代部分都可以改写为 while 结构中的对应语句。'
        }
    ],
    programmingQuestions: [
        {
            id: 26,
            type: 'programming',
            title: '字母求和',
            problemNumber: 'B3956',
            source: 'official-pdf+luogu-mapping',
            description: '给定一个只含大小写英文字母的字符串。小写字母按其在字母表中的位置记为正整数（a=1, b=2, ...），大写字母按其 ASCII 码的相反数记为负整数（如 A=-65）。求整串字符对应数值之和。',
            inputDescription: '第一行一个正整数 n，表示字符串中字母个数；第二行一个长度为 n 的字符串。',
            outputDescription: '输出一个整数，表示该字符串解密后的数值。',
            samples: [
                {
                    input: '3\naAc',
                    output: '-61'
                }
            ],
            explanation: '遍历字符串：若是小写字母，加上 c-\'a\'+1；若是大写字母，减去其 ASCII 码值。按题意直接模拟即可。',
            tags: ['编程题', '字符串', '模拟'],
            template: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}',
            referenceCode: '#include <iostream>\n#include <assert.h>\n#include <cstdlib>\n#include <cstdio>\n#include <cstring>\nusing namespace std;\nconst int N = 100005;\nchar str[N];\nint main() {\n    int n;\n    cin >> n;\n    cin >> str;\n    assert(n == strlen(str));\n    int ans = 0;\n    for (int i = 0; i < n; i++) {\n        if (str[i] >= \'a\' && str[i] <= \'z\')\n            ans += str[i]-\'a\'+1;\n        else if (str[i] >= \'A\' && str[i] <= \'Z\')\n            ans -= str[i];\n        else\n            assert(false);\n    }\n    cout << ans << endl;\n    return 0;\n}'
        },
        {
            id: 27,
            type: 'programming',
            title: '完全平方数',
            problemNumber: 'B3957',
            source: 'official-pdf+luogu-mapping',
            description: '给定一个包含 n 个非负整数的序列 A，统计满足 1 ≤ i < j ≤ n 且 A_i+A_j 为完全平方数的下标对数量。',
            inputDescription: '第一行一个整数 n；第二行输入 n 个非负整数 A_1...A_n。',
            outputDescription: '输出一个整数，表示满足条件的数对个数。',
            samples: [
                {
                    input: '5\n1 4 3 3 5',
                    output: '3'
                }
            ],
            explanation: '直接双重循环枚举所有下标对，计算两数之和后判断其是否为完全平方数；三级数据范围下，$O(N^2)$ 的直接枚举即可通过。',
            tags: ['编程题', '枚举', '数学'],
            template: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}',
            referenceCode: '#include <bits/stdc++.h>\nusing namespace std;\nconst int N = 1010;\nint a[N];\nint main(){\n    int n;\n    cin >> n;\n    for(int i = 1; i <= n; i++) cin >> a[i];\n    int ans = 0;\n    for(int i = 1; i <= n; i++){\n        for(int j = i+1; j <= n; j++){\n            int m = a[i]+a[j];\n            int t = sqrt(m+1e-7);\n            if(t * t == m) ans++;\n        }\n    }\n    cout << ans << "\\n";\n}'
        }
    ]
};
