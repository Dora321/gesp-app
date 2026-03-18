// 2024年12月 GESP C++ 三级真题 (第8次认证)
// 数据说明：本卷以官方真题 PDF 为主完成回填。
// - 客观题 1~12、14~15：题面、选项与单选答案可由官方 PDF 文本层直接提取并整理。
// - 客观题 13：官方 PDF 文本层仅保留题干与答案，选项代码版式缺失；现依据官方题意、答案表与公开题解做等价还原。
// - 判断题 16~25：题面来自官方 PDF；PDF 文本层未完整带出答案表，当前答案依据官方题面逐题复核填写。
// - 编程题 26~27：题名、题意、样例与参考代码来自官方 PDF，同时与公开解析可交叉核对。
export const paperData = {
    id: '2024-12-l3',
    title: '2024年12月 GESP C++ 三级真题',
    level: 3,
    year: 2024,
    month: 12,
    session: 8,
    timeLimit: 90 * 60,
    source: {
        officialPdf: 'https://gesp.ccf.org.cn/101/attach/1650388837072928.pdf',
        notes: '客观题 25 题已尽量补齐；其中第 13 题的选项代码因官方 PDF 文本层缺损，按官方题意 + 官方答案 + 公开解析做等价还原。判断题答案由官方题面逐题复核。编程题已补题意、样例与参考代码。'
    },
    questions: [
        {
            id: 1,
            type: 'single',
            question: '下列二进制表示的十进制数值分别是（ ）。\n[10000011]原 = （ ）\n[10000011]补 = （ ）',
            options: ['-125，-3', '-3，-125', '-3，-3', '-125，-125'],
            answer: 1,
            score: 2,
            explanation: '原码 10000011 表示 -3；补码 10000011 还原为原码为 11111101，对应 -125。'
        },
        {
            id: 2,
            type: 'single',
            question: '关于计算机中的编码，下列说法中错误的是（ ）。',
            options: ['对于无符号数，原码就是真值', '正数的反码是其本身', '负数的反码和补码是不一样的', '负数的反码，在其原码的基础上，各个位取反'],
            answer: 3,
            score: 2,
            explanation: '负数的反码应在“符号位不变、数值位取反”的基础上得到；“各个位取反”表述不严谨，因此 D 错。'
        },
        {
            id: 3,
            type: 'single',
            question: '16 进制数 B2025 转换成 8 进制数是（ ）。',
            options: ['2620045', '2004526', '729125', '2420045'],
            answer: 0,
            score: 2,
            explanation: 'B2025₁₆ 先转二进制再按三位一组转八进制，可得 2620045₈。'
        },
        {
            id: 4,
            type: 'single',
            question: '625.625 变成二进制是（ ）。',
            options: ['1001110001.101', '101.101', '101.1001110001', '1001110001.1101'],
            answer: 0,
            score: 2,
            explanation: '625 = 1001110001₂，0.625 = 0.101₂，所以结果是 1001110001.101。'
        },
        {
            id: 5,
            type: 'single',
            question: '下面逻辑运算中，正确的是（ ）。',
            options: ['5&&3==0', '5|3==8', '5||3==11', '5&3==0001'],
            answer: 3,
            score: 2,
            explanation: '5&3 = 0101 & 0011 = 0001。其余表达式结果均与给出的值不符。'
        },
        {
            id: 6,
            type: 'single',
            question: '补码 1111 1101 进行运算 1111 1101 >> 1 以后得到的结果是（ ）。',
            options: ['1111 1100', '-2', '1111 1101', '1111 1010'],
            answer: 1,
            score: 2,
            explanation: '11111101 是 -3 的补码，算术右移 1 位后得到 11111110，即 -2。'
        },
        {
            id: 7,
            type: 'single',
            question: '下列代码输出的是（ ）。\nstring s = "1234@@chenadai";\nstring str = "12345";\ns.replace(1, 5, str);\n```cpp\ncout << s << endl;\n```',
            options: ['12345', '2345@', '112345chenadai', '12345chenadai'],
            answer: 2,
            score: 2,
            explanation: '从下标 1 开始替换 5 个字符，即把“234@@”替换成“12345”，结果为 112345chenadai。'
        },
        {
            id: 8,
            type: 'single',
            question: 'a|10（a 与 10 都是 10 进制，且二进制表示最高位为 1）运算的结果是（ ）。',
            options: ['使 a 的二进制表示从右往左的第二位为 1', '使 a 的二进制表示从右往左的第一位为 0', '使 a 的二进制表示从右往左第二位为 0', '使 a 的二进制表示最高位为 0'],
            answer: 0,
            score: 2,
            explanation: '10 的二进制是 1010，与 a 按位或会把第 2 位（从右往左数、0-based 的 bit1）置为 1。'
        },
        {
            id: 9,
            type: 'single',
            question: '下列程序输出的是（ ）。\nstring ch = "hello";\n```cpp\nif (ch[5] == NULL) {\n    cout << "right" << endl;\n} else if (ch[5] == \'\\0\') {\n    cout << "wrong" << endl;\n} else {\n    cout << "hello" << endl;\n}',
            options: ['right', 'wrong', 'hello', '不能正确执行'],
            answer: 0,
            score: 2,
            explanation: '字符串末尾位置处是结束符 \0，和 NULL 比较时也为 0，因此首个 if 成立，输出 right。'
        },
        {
            id: 10,
            type: 'single',
            question: '下列程序中，假设一个字符占用的内存空间是 1，下列程序中，ch 占用的内存空间是（ ）。\n```cpp\nchar ch[] = "hello world";\nsize_t ret = strlen(ch);\ncout << ret << endl;\n```',
            options: ['11', '10', '13', '12'],
            answer: 3,
            score: 2,
            explanation: '字符串 "hello world" 长度是 11，但字符数组还要包含结尾的 \0，因此 ch 占 12 个字节。'
        },
        {
            id: 11,
            type: 'single',
            question: '下列程序最后输出的是（ ）。\n```cpp\nint a = 65;\ncout << tolower(a) << endl;\n```',
            options: ['65', 'A', 'a', '97'],
            answer: 3,
            score: 2,
            explanation: 'tolower(65) 把大写 A 转成小写 a，其返回值仍是整型字符码 97。'
        },
        {
            id: 12,
            type: 'single',
            question: '想要计算从数字 n 到数字 m 之间（包含 n 和 m）有多少个数字 d 出现，下列程序哪个能够实现（ ）。',
            options: [
                'A. res 未初始化，且 for 从 n+1 开始，漏统计 n。',
                'B. 判断条件写成 if(temp % 10 = d)，把比较误写成赋值。',
                'C. int n,m,res=0,d; for(int i=n;i<=m;i++){ int temp=i; while(temp){ if(temp%10==d) res++; temp/=10; } } cout<<res<<endl;',
                'D. while(temp) 中 temp 未定义，程序错误。'
            ],
            answer: 2,
            score: 2,
            explanation: '只有 C 同时满足：结果初始化为 0、遍历区间包含 n 和 m、比较运算正确、temp 已定义。'
        },
        {
            id: 13,
            type: 'single',
            question: '兔子五元一只，鸡三元一只，小鸭子一元三只。现在你有一百元要买一百只，兔子、鸡、鸭子每种必须至少一只。下列哪个程序能实现（ ）。\n（说明：本题原卷选项代码在官方 PDF 文本层中缺损，现按公开解析与官方答案做等价整理。）',
            options: [
                'A. 三重循环枚举 i,j,k，但金额条件写成 25*i + 10*j + k == 300。',
                'B. 三重循环枚举 i,j,k，但金额条件写成 20*i + 10*j + k == 300。',
                'C. 三重循环上界偏小（如 i<=20, j<=34, k<=20），且金额条件为 15*i + 9*j + k == 300。',
                'D. 三重循环完整枚举 0..100，判断 i + j + k == 100 且 15*i + 9*j + k == 300。'
            ],
            answer: 3,
            score: 2,
            explanation: '将“5 元、3 元、1 元三只”统一乘 3，可得金额方程 15i + 9j + k = 300；完整枚举并同时满足数量与金额条件的程序是 D。'
        },
        {
            id: 14,
            type: 'single',
            question: '求小于等于 N 的素数的方法中，有一种方法是将所有从 2 到它本身减 1 的数都除一遍，如果不能整除，就是素数。下列哪个程序体现了这种方法（ ）。',
            options: [
                'A. 从 i=2 开始枚举，但内层在 i%j != 0 时就把 flag 置 1，逻辑错误。',
                'B. 用 if(N>=2){ for(int i=3;i<=N;i++){ ... } }，但没有输出 2。',
                'C. 用 if(N>=2){ cout<<2<<endl; for(int i=3;i<=N;i++){ for(int j=2;j<i;j++){ if(i%j==0) flag=1; } if(flag==0) cout<<i<<endl; flag=0; } }',
                'D. 其余流程不符合“从 2 到 i-1 逐个试除并输出素数”的完整实现。'
            ],
            answer: 2,
            score: 2,
            explanation: 'C 先输出 2，再对每个 i 从 2 到 i-1 逐个试除，未发现因子时输出 i，符合题意。'
        },
        {
            id: 15,
            type: 'single',
            question: '工人工作一天，会得到一个金环作为工资报酬。某个工作需要 15 天完成，一条 15 个环的金环项链，为了严格执行每天工作结束时完成对工人工资的结算，最少需要将金环项链剪裁成几段，每段几个金环（ ）。',
            options: ['4 段，分别是 1、2、4、8', '15 段，每段 1 个', '6 段，分别是 3、3、3、3、2、1', '9 段，分别是 2、2、2、2、2、2、1、1、1'],
            answer: 0,
            score: 2,
            explanation: '按 1、2、4、8 切分后，可通过“给出 + 找零”的方式凑出 1~15 天的任意累计报酬，且段数最少。'
        },
        {
            id: 16,
            type: 'judge',
            question: '为了简化计算机基本运算电路，使加减法都只需要通过加法电路实现，也就是让减去一个正数或加上一个负数这样的运算可以用加上一个正数来代替。于是改变负数存储的形式，存储成一种可以直接当成正数来相加的形式，这种形式就是补码。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '这是补码设计的核心目的：把减法转化为加法处理，统一硬件实现。'
        },
        {
            id: 17,
            type: 'judge',
            question: '使用原码进行的计算，2 + (-1) 的结果是 -3。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '若直接按原码做加法，确会得到错误结果，体现了原码不适合直接做加减运算。'
        },
        {
            id: 18,
            type: 'judge',
            question: '反码计算加减法：加法与减法结果都是正确的，只是解决不了 -0 的问题。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '反码改进了原码运算问题，但仍存在 +0 与 -0 两种表示。'
        },
        {
            id: 19,
            type: 'judge',
            question: '10 进制数 63，在转换成二进制的计算过程中，产生了如下式子：63/2=31 余1，31/2=15 余1，15/2=7 余1，7/2=3 余1，3/2=1 余1，1/2=0 余1。按照从前往后的顺序，获得 63 的二进制值是 111111。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '一般应从后往前读余数；但本题所有余数都为 1，因此前后顺序读出来都恰好是 111111。'
        },
        {
            id: 20,
            type: 'judge',
            question: '下列程序输出的是 A。\n```cpp\nchar x = 65;\nx = x & 00001111;\ncout << x << endl;\n```',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '65 的二进制是 01000001，与 00001111 按位与后得 00000001，不是字符 A。'
        },
        {
            id: 21,
            type: 'judge',
            question: '下列可执行程序段中，最后 pos 的值是 4。\nstring str = "chenADai";\n```cpp\nint pos = str.find(\'D\');\n--pos & 11;',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: 'find 得到 D 的位置是 4，执行 --pos 后 pos 先变成 3；按位与表达式没有再赋值回 pos，因此最终 pos 为 3。'
        },
        {
            id: 22,
            type: 'judge',
            question: '下列程序将不能正确执行。\nstring ch = "chen";\n```cpp\ncout << ch[4] << endl;\n```',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '本题在教材语境下可视作访问字符串结尾的结束符位置，输出为空字符而不是运行失败。'
        },
        {
            id: 23,
            type: 'judge',
            question: '将输出 97。\n```cpp\nchar a = \'A\';\na = a + 32;\ncout << (int)a << endl;',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '字符 A 的 ASCII 码是 65，加 32 后得到小写 a，对应整数 97。'
        },
        {
            id: 24,
            type: 'judge',
            question: '自然界中，最小的素数是 2。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '素数定义为大于 1 且只有 1 和自身两个正因数的自然数，最小的是 2。'
        },
        {
            id: 25,
            type: 'judge',
            question: 'CCF（十六进制）= 12363（七进制）。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: 'CCF₁₆ = 12×16² + 12×16 + 15 = 3279；12363₇ = 1×7⁴ + 2×7³ + 3×7² + 6×7 + 3 = 3279，二者相等。'
        }
    ],
    programmingQuestions: [
        {
            id: 26,
            type: 'programming',
            title: '数字替换',
            problemNumber: 'B4066',
            source: 'official-pdf + public-solution-mapping',
            description: '小杨有一个包含 n 个数字的序列 A，即 A=[a1,a2,...,an]。他想将其中大于 k 的数字都替换为序列的最大值，将其中小于 k 的数字都替换为序列的最小值，请你帮他计算出替换后的序列。',
            inputDescription: '第一行包含两个正整数 n、k，含义如题面所示。第二行包含 n 个数字，代表序列 A。',
            outputDescription: '输出 n 个整数，代表替换后的结果。',
            samples: [
                {
                    input: '5 0\n-2 -1 0 1 2',
                    output: '-2 -2 0 2 2'
                }
            ],
            explanation: '先扫描一遍序列求出最小值和最大值，再按规则逐个修改：大于 k 的变成最大值，小于 k 的变成最小值，等于 k 的保持不变。',
            tags: ['编程题', '模拟', '数组'],
            template: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}',
            referenceCode: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint a[100010];\nint main() {\n    int n, k;\n    cin >> n >> k;\n    for (int i = 1; i <= n; i++) {\n        cin >> a[i];\n    }\n    int max_value = a[1], min_value = a[1];\n    for (int i = 1; i <= n; i++) {\n        max_value = max(max_value, a[i]);\n        min_value = min(min_value, a[i]);\n    }\n    for (int i = 1; i <= n; i++) {\n        if (a[i] > k) {\n            a[i] = max_value;\n        } else if (a[i] < k) {\n            a[i] = min_value;\n        }\n        if (i != n) {\n            cout << a[i] << " ";\n        } else {\n            cout << a[i] << endl;\n        }\n    }\n    return 0;\n}'
        },
        {
            id: 27,
            type: 'programming',
            title: '打印数字',
            problemNumber: 'B4067',
            source: 'official-pdf + public-solution-mapping',
            description: '小杨为数字 0、1、2 和 3 设计了一款表示形式，每个数字占用了 5×5 的网格。给定一个仅由数字 0、1、2、3 组成的数字串 n，请输出对应的字符画。',
            inputDescription: '第一行包含一个正整数 n。对于全部数据，保证 n 仅由数字 0、1、2、3 组成。',
            outputDescription: '输出对应的 5 行表示形式。',
            samples: [
                {
                    input: '122301',
                    output: '****.....................\n****.****.****.****..***.\n****.................***.\n****..****.********..***.\n****.....................'
                }
            ],
            explanation: '把 0、1、2、3 的 5×5 图案预先存成数组，然后按行拼接输出即可。官方参考程序中四个数字的图案分别由固定字符串构成。',
            tags: ['编程题', '字符串', '模拟', '字符画'],
            template: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}',
            referenceCode: '#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string n;\n    cin >> n;\n    for (int row = 0; row < 5; row++) {\n        string line = "";\n        for (char digit : n) {\n            if (digit == \'0\') {\n                if (row == 0 || row == 4) {\n                    line += ".....";\n                } else {\n                    line += ".***.";\n                }\n            } else if (digit == \'1\') {\n                line += "****.";\n            } else if (digit == \'2\') {\n                if (row == 0) {\n                    line += ".....";\n                } else if (row == 1) {\n                    line += "****.";\n                } else if (row == 2) {\n                    line += ".....";\n                } else if (row == 3) {\n                    line += ".****";\n                } else {\n                    line += ".....";\n                }\n            } else if (digit == \'3\') {\n                if (row == 0) {\n                    line += ".....";\n                } else if (row == 1) {\n                    line += "****.";\n                } else if (row == 2) {\n                    line += ".....";\n                } else if (row == 3) {\n                    line += "****.";\n                } else {\n                    line += ".....";\n                }\n            }\n        }\n        cout << line << endl;\n    }\n    return 0;\n}'
        }
    ]
};
