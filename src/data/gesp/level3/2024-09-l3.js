// 2024年9月 GESP C++ 三级真题 (第7次认证)
// 数据说明：本卷以官方真题 PDF 为主完成回填。
// - 客观题 1~11、14~15、16~25 与两道编程题：题面主体可由官方 PDF 文本层直接提取并整理。
// - 客观题 12~13：官方 PDF 文本层可提取到选项代码，但版式有截断，现按官方文本层 + 题意做等价整理。
// - 客观题 7、10、13：原卷为代码/截图排版题，当前保留可核对题意；其中第 13 题代码截图未能从官方 PDF 文本层完整提取，现仅保留题干、选项与答案语义。
// - 判断题答案表在 PDF 文本层中未完整提取，当前答案依据官方题面逐题复核填写。
// - 编程题题名、题意、样例与参考代码来自官方 PDF，同时与公开 OJ 题号 B4038/B4039 对齐。
export const paperData = {
    id: '2024-09-l3',
    title: '2024年9月 GESP C++ 三级真题',
    level: 3,
    year: 2024,
    month: 9,
    session: 7,
    timeLimit: 90 * 60,
    source: {
        officialPdf: 'https://gesp.ccf.org.cn/101/attach/1644702761746464.pdf',
        notes: '客观题 25 题已尽量补齐；其中 12~13 题含截图/版式缺损，按官方 PDF 文本层与公开题解做等价整理；判断题答案依据官方题面逐题复核；编程题已补 2 题题意、样例与参考代码。'
    },
    questions: [
        {
            id: 1,
            type: 'single',
            question: '下列代码中，输出结果是（ ）。\n#include <iostream>\nusing namespace std;\nint main() {\n    double a = 0.9;\n    double b = 1.0;\n    if ((b - a) == 0.1) cout << "Equal" << endl;\n    else cout << "Not equal" << endl;\n}',
            options: ['Equal', 'Not equal', '程序不能正确执行', '没有输出'],
            answer: 1,
            score: 2,
            explanation: '浮点数存在精度误差，1.0-0.9 的结果通常不能被精确表示为 0.1，因此条件不成立，输出 Not equal。'
        },
        {
            id: 2,
            type: 'single',
            question: '关于计算机中的编码，下列说法中正确的是（ ）。',
            options: ['机器数的形式值和真值是一致的', '原码就是符号位加上真值', '机器数是带符号的', '[-1]=[1000 0001]原=[1111 1111]反'],
            answer: 2,
            score: 2,
            explanation: '机器数通常指带符号的编码表示；A、B、D 均不严谨或错误。'
        },
        {
            id: 3,
            type: 'single',
            question: '8 进制数 3703 转换成 16 进制数是（ ）。',
            options: ['7C3', '7A3', '7B3', '7D3'],
            answer: 0,
            score: 2,
            explanation: '3703₈ = 3×8^3 + 7×8^2 + 3 = 1987₁₀ = 7C3₁₆。'
        },
        {
            id: 4,
            type: 'single',
            question: '0.8125 变成二进制是（ ）。',
            options: ['0.1110', '0.1 1111 1011 1101', '0.1 1111 1011 1100', '0.1101'],
            answer: 3,
            score: 2,
            explanation: '0.8125 = 13/16 = 0.1101₂。'
        },
        {
            id: 5,
            type: 'single',
            question: '下面说法正确的是（ ）。',
            options: ['（22 & 01）==（22 && 01）成立', '(23 | 11) == 30', '(23 | 10) == 31', '(23 | 01) == 31'],
            answer: 2,
            score: 2,
            explanation: '23|10 = 10111₂ | 01010₂ = 11111₂ = 31。'
        },
        {
            id: 6,
            type: 'single',
            question: '下列说法正确的是（ ）。',
            options: ['2 >> 1 和 1 >> 1 的值是一样的', '(2 >> 2) 和 (1 >> 1) 的值是一样的', '(11 ^ 00) 和 (1 ^ 0) 的值是一样的', '(~0 的输出值是 1)'],
            answer: 1,
            score: 2,
            explanation: '2>>2 和 1>>1 都等于 0。其余说法错误。'
        },
        {
            id: 7,
            type: 'single',
            question: '下列代码实现的是（ ）。\nvoid Swap(int &a, int &b) {\n    if (a != b) {\n        a ^= b;\n        b ^= a;\n        a ^= b;\n    }\n}',
            options: ['a 和 b 的异或', 'a 和 b 的同或', 'a 和 b 的值交换', 'a 和 b 的高低位互换'],
            answer: 2,
            score: 2,
            explanation: '这是经典的异或交换写法，执行后 a 与 b 的值互换。'
        },
        {
            id: 8,
            type: 'single',
            question: 'a & ~1 运算实现的是（ ）。',
            options: ['使 a 的最低位为 1', '使 a 的最高位为 1', '使 a 的最低位为 0', '使 a 的最高位为 0'],
            answer: 2,
            score: 2,
            explanation: '~1 的二进制最低位为 0，其余位为 1，与 a 按位与后可把最低位清零。'
        },
        {
            id: 9,
            type: 'single',
            question: 'a = 1010 1110，执行 a << 2 后，下面关于结果的说法正确的是（ ）。',
            options: ['a 的值变为 1011 1000', 'a 的值变为 1011 1010', 'a 的值变为 0101 1101', 'a 的值变为 1011 1000（高位移出，低位补 0 后按 8 位观察应为 1011 1000）'],
            answer: 0,
            score: 2,
            explanation: '按 8 位观察，1010 1110 左移 2 位后得到 1011 1000。官方答案为 A。'
        },
        {
            id: 10,
            type: 'single',
            question: '下列程序中，result 和 result2 输出分别是（ ）。\nlong a = 123;\nint b = 1;\nlong result = a & b;\ncout << result << endl;\n\nlong a2 = -123;\nunsigned int b2 = -1;\nlong result2 = a2 & b2;\ncout << result2 << endl;',
            options: ['123 -1', '123 -123', '1 -1', '1 -123'],
            answer: 3,
            score: 2,
            explanation: '123&1 只保留最低位，结果为 1；-1 的无符号表示全为 1，与 -123 按位与后仍为 -123。'
        },
        {
            id: 11,
            type: 'single',
            question: '陈 A 歹种植一批农作物：第 1 天浇水 1 次；接下来的 2 天每天浇水 2 次；再接下来的 3 天每天浇水 3 次；……依此类推，接下来的 n 天每天浇水 n 次。请问在 100 天里总共浇了多少次水（ ）。',
            options: ['994', '996', '995', '945'],
            answer: 3,
            score: 2,
            explanation: '前 13 轮共 1+2+...+13=91 天，用水次数为 1^2+2^2+...+13^2=819；剩余 9 天属于第 14 轮，再加 9×14=126，共 945。'
        },
        {
            id: 12,
            type: 'single',
            question: '关于一维数组，下列程序能够正确执行的是（ ）。',
            options: [
                'A. int a[10]; int sum = 0; for (int i = 0; i <= 10; i++) sum += a[i];',
                'B. int a[10] = {1,2,3,4,5,6,7,8,9,10}; int sum = 0; for (int i = 0; i <= 10; i++) sum += a[i];',
                'C. int a[10] = {0}; int sum = 0; for (int i = 0; i < 10; i++) sum += a[i];',
                'D. int a[10] = {1,2,3,4,5,6,7,8,9,10}; cout << a[10] << endl;'
            ],
            answer: 2,
            score: 2,
            explanation: '只有 C 同时满足下标不越界且变量已定义/初始化。A、B、D 都访问了 a[10]，越界。'
        },
        {
            id: 13,
            type: 'single',
            question: '下面的程序中，会输出（ ）。\n（说明：本题原卷代码截图在官方 PDF 文本层中未完整提取，当前仅保留“输出结果不确定”的可核对结论。）',
            options: ['1', '0', '10', '不确定的值'],
            answer: 3,
            score: 2,
            explanation: '本题属于截图代码题，官方答案为 D。结合公开解析可知，该程序依赖未定义/不确定状态，因此输出不确定。'
        },
        {
            id: 14,
            type: 'single',
            question: '有 A、B、C、D 4 个人，其中 1 个是小偷。每个人说一句话，且只有小偷说的是假话。\nA 说：不是我。\nB 说：是 C。\nC 说：是 D。\nD 说：C 瞎说。\n请问谁是小偷（ ）。',
            options: ['A', 'B', 'C', 'D'],
            answer: 2,
            score: 2,
            explanation: '若 C 是小偷，则 C 说“是 D”是假话，其余 A、B、D 的说法都可为真，条件恰好满足。'
        },
        {
            id: 15,
            type: 'single',
            question: '下列程序输出的是（ ）。\nstring str = "Hello,CHAD";\ncout << str.find("A") << "\\n";',
            options: ['9', '8', '7', '6'],
            answer: 1,
            score: 2,
            explanation: '字符串下标从 0 开始，A 位于下标 8。'
        },
        {
            id: 16,
            type: 'judge',
            question: '+1 和 -1 的原码进行 1 + (-1) 计算的结果是 -2。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '该说法错误。原码运算不能简单按普通无符号加法理解，1 与 -1 相加的真值应为 0。'
        },
        {
            id: 17,
            type: 'judge',
            question: '~1 的输出值是 -2。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '在常见补码表示下，~1 等于 -2。'
        },
        {
            id: 18,
            type: 'judge',
            question: '~1 = 1111 1110。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '按 8 位补码表示时，1 为 0000 0001，按位取反后得到 1111 1110。'
        },
        {
            id: 19,
            type: 'judge',
            question: '取 X 的低四位，可以用 Y = 0000 1111，用 X & Y 获取 X 的低四位。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '与 0000 1111 按位与即可保留低四位、清零高位。'
        },
        {
            id: 20,
            type: 'judge',
            question: '下列程序输出的是 A。\nchar x = 65;\nx++;\ncout << x++ << endl;',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: 'x 初值为 A，先自增到 B，再输出 x++ 的旧值 B，所以不是 A。'
        },
        {
            id: 21,
            type: 'judge',
            question: '下列程序输出的是 3。\nstring str = "CHADai";\nsize_t pos = str.find(\'D\');\ncout << pos << endl;',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: 'D 在字符串中的下标是 3。'
        },
        {
            id: 22,
            type: 'judge',
            question: '下列程序将输出 1。\nint a[10] = {1};\ncout << a[1] << endl;',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '只有 a[0] 被初始化为 1，其余元素均为 0，因此输出 0。'
        },
        {
            id: 23,
            type: 'judge',
            question: '下列程序将输出 A。\nint a = 65;\ncout << (char)a << endl;',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '65 对应 ASCII 字符 A。'
        },
        {
            id: 24,
            type: 'judge',
            question: '16 进制数 AB，表示成 2 进制数是 10101011。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: 'A=1010，B=1011，因此 AB₁₆ = 1010 1011₂。'
        },
        {
            id: 25,
            type: 'judge',
            question: 'def（十六进制）= 103231（五进制）。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: 'def₁₆ = 3567₁₀，换算成五进制应为 103232，不是 103231。'
        }
    ],
    programmingQuestions: [
        {
            id: 26,
            type: 'programming',
            title: '平衡序列',
            problemNumber: 'B4038',
            source: 'official-pdf + luogu-mapping',
            description: '小杨有一个包含 n 个正整数的序列 a。他认为一个序列是平衡的，当且仅当存在一个正整数 i（1 ≤ i < n），使得序列第 1 到第 i 个数字的总和等于第 i+1 到第 n 个数字的总和。请你判断序列 a 是否是平衡的。',
            inputDescription: '第一行包含一个正整数 t，代表测试用例组数。接下来 t 组测试用例，每组两行：第一行一个正整数 n，表示序列长度；第二行包含 n 个正整数，表示序列 a。',
            outputDescription: '对于每组测试用例，若序列是平衡的输出 Yes，否则输出 No。',
            samples: [
                {
                    input: '3\n3\n1 2 3\n4\n2 3 1 4\n5\n1 2 3 4 5',
                    output: 'Yes\nYes\nNo'
                }
            ],
            explanation: '先求整个序列总和 sum，再从左到右维护前缀和 pre。若某个位置满足 pre * 2 == sum，则左右两段和相等，序列平衡。',
            tags: ['编程题', '前缀和', '模拟', '多组测试'],
            template: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}',
            referenceCode: '#include<bits/stdc++.h>\nusing namespace std;\nint a[10010];\nint main(){\n    int t;\n    cin >> t;\n    while(t--){\n        int n;\n        cin >> n;\n        int sum = 0;\n        for(int i = 1; i <= n; i++){\n            cin >> a[i];\n            sum += a[i];\n        }\n        int pre = 0, ok = 0;\n        for(int i = 1; i < n; i++){\n            pre += a[i];\n            if(pre * 2 == sum){\n                ok = 1;\n                break;\n            }\n        }\n        cout << (ok ? "Yes" : "No") << "\\n";\n    }\n    return 0;\n}'
        },
        {
            id: 27,
            type: 'programming',
            title: '回文拼接',
            problemNumber: 'B4039',
            source: 'official-pdf + luogu-mapping',
            description: '一个字符串是回文串，当且仅当该字符串从前往后读和从后往前读是一样的，例如 aabaa 和 ccddcc 都是回文串，但 abcd 不是。小杨有 n 个仅包含小写字母的字符串，请判断每个字符串是否由两个长度至少为 2 的回文串前后拼接而成。',
            inputDescription: '第一行包含一个正整数 n，代表字符串数量。之后 n 行，每行一个仅包含小写字母的字符串。',
            outputDescription: '对于每个字符串，若它可以拆成两个长度都至少为 2 的回文串，则输出 Yes，否则输出 No。',
            samples: [
                {
                    input: '4\nabcd\naabbb\naaac\nabcdd',
                    output: 'No\nYes\nNo\nNo'
                }
            ],
            explanation: '枚举分割点 j，把字符串拆成前后两段，要求两段长度都至少为 2，并分别判断是否为回文串。只要存在一种可行拆分就输出 Yes。',
            tags: ['编程题', '字符串', '回文', '枚举'],
            template: '#include <bits/stdc++.h>\nusing namespace std;\n\nbool isPal(const string& s, int l, int r) {\n    while (l < r) if (s[l++] != s[r--]) return false;\n    return true;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}',
            referenceCode: '#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n;\n    cin >> n;\n    for(int i = 1; i <= n; i++){\n        string s;\n        cin >> s;\n        int m = s.length();\n        int ok = 0;\n        for(int j = 2; j <= m - 2; j++){\n            string s1 = s.substr(0, j);\n            string s2 = s.substr(j, m - j);\n            string t1 = "", t2 = "";\n            for(int k = (int)s1.size() - 1; k >= 0; k--) t1 += s1[k];\n            for(int k = (int)s2.size() - 1; k >= 0; k--) t2 += s2[k];\n            if(t1 == s1 && t2 == s2){\n                ok = 1;\n                break;\n            }\n        }\n        cout << (ok ? "Yes" : "No") << "\\n";\n    }\n    return 0;\n}'
        }
    ]
};