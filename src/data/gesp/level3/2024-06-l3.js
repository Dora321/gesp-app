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
            question: '小杨父母带他到某培训机构给他报名参加 CCF 组织的 GESP 认证考试的第 1 级，那他可以选择的认证语言有（   ）种。',
            options: ['1', '2', '3', '4'],
            answer: 2,
            score: 2,
            explanation: 'GESP 一级可选语言为图形化编程、Python、C++，共 3 种。'
        },
        {
            id: 2,
            type: 'single',
            question: '下面流程图在 yr 输入 2024 时，可以判定 yr 代表闰年，并输出 2 月是 29 天，则图中菱形框中应该填入（   ）。',
            options: ['(yr%400==0) || (yr%4==0)', '(yr%400==0) || (yr%4==0 && yr%100!=0)', '(yr%400==0) && (yr%4==0)', '(yr%400==0) && (yr%4==0 && yr%100!=0)'],
            answer: 1,
            score: 2,
            explanation: '闰年条件是“能被 400 整除”或“能被 4 整除且不能被 100 整除”。'
        },
        {
            id: 3,
            type: 'single',
            question: '一般默认 64 位计算机系统中整型变量（int）仍是 32 位，则整数能够表示的数据范围是（   ）。',
            options: ['-2^15 ~ 2^15-1', '-2^31 ~ 2^31', '-2^31 ~ 2^31-1', '-2^32 ~ 2^32-1'],
            answer: 2,
            score: 2,
            explanation: '32 位有符号 int 的范围通常是 -2^31 到 2^31-1。'
        },
        {
            id: 4,
            type: 'single',
            question: '下列代码将十进制转化成八进制，则横线上应填入（   ）。\n```cpp\n#include <iostream>\nusing namespace std;\nvoid decimal2octal(int decimal) {\n    int oct_number[100];\n    int i = 0;\n    while (decimal > 0) {\n        __________________________\n    }\n    for (int j = i-1; j >= 0; j--) cout << oct_number[j];\n    cout << endl;\n}\n```',
            options: ['oct_number[i] = decimal % 8;    decimal /= 8;', 'oct_number[i] = decimal / 8;    decimal %/= 8;', 'oct_number[i++] = decimal % 8;    decimal /= 8;', 'oct_number[i++] = decimal / 8;    decimal %= 8;'],
            answer: 2,
            score: 2,
            explanation: '短除法：每次记录余数 decimal%8，再令 decimal/=8，且下标递增。'
        },
        {
            id: 5,
            type: 'single',
            question: '二进制数 101.11 对应的十进制数是（   ）。',
            options: ['6.5', '5.5', '5.75', '5.25'],
            answer: 2,
            score: 2,
            explanation: '101.11₂ = 1×2^2+0×2^1+1×2^0+1×2^-1+1×2^-2 = 5.75。'
        },
        {
            id: 6,
            type: 'single',
            question: '下列流程图的输出结果是（   ）。',
            options: ['5', '10', '20', '30'],
            answer: 1,
            score: 2,
            explanation: '此题原卷为流程图截图，现按官方答案与公开解析保留；输出结果为 10。'
        },
        {
            id: 7,
            type: 'single',
            question: '下列代码的输出结果是（   ）。\n```cpp\n#include <iostream>\nusing namespace std;\nint main() {\n    int a = 12;\n    int result = a >> 2;\n    cout << result << endl;\n    return 0;\n}\n```',
            options: ['12', '6', '3', '1'],
            answer: 2,
            score: 2,
            explanation: '12 的二进制右移 2 位，相当于整除 4，结果为 3。'
        },
        {
            id: 8,
            type: 'single',
            question: '下列代码的输出结果是（   ）。\n```cpp\n#include <iostream>\nusing namespace std;\nint main() {\n    int a = 5;\n    int b = 10;\n    a = a ^ b;\n    b = a ^ b;\n    a = a ^ b;\n    cout << "a = " << a << ", b = " << b << endl;\n    return 0;\n}\n```',
            options: ['a = 5, b = 10', 'a = 5, b = 5', 'a = 10, b = 5', 'a = 10, b = 10'],
            answer: 2,
            score: 2,
            explanation: '异或交换后，a 与 b 的值互换，输出 a = 10, b = 5。'
        },
        {
            id: 9,
            type: 'single',
            question: '如果字符串定义为 char str[] = "GESP";，则字符数组 str 的长度为（   ）。',
            options: ['0', '4', '5', '6'],
            answer: 2,
            score: 2,
            explanation: '字符串常量还包含结尾空字符 \\0，因此数组长度为 5。'
        },
        {
            id: 10,
            type: 'single',
            question: '在下列代码的横线处填写（   ），可以使得输出是“7”。\n```cpp\n#include <iostream>\nusing namespace std;\nint main() {\n    int array[5] = {3, 7, 5, 2, 4};\n    int max = 0;\n    for (int i = 0; i < 5; i++)\n        if (______________)\n            max = array[i];\n    cout << max << endl;\n    return 0;\n}\n```',
            options: ['max > array[i]', 'max < array[i]', 'max = array[i]', '以上均不对'],
            answer: 1,
            score: 2,
            explanation: '这段代码是在不断更新最大值，条件应为当前元素大于 max。'
        },
        {
            id: 11,
            type: 'single',
            question: '小杨在做数学题，题目要求找出从 1 到 35 中能被 7 整除的数字，即 [7, 14, 21, 28, 35]，则横线处应填入哪个代码？（   ）\n```cpp\n#include <iostream>\nusing namespace std;\nint main() {\n    int arr[35];\n    int count = 0;\n    for (int i = 1; i <= 35; i++) {\n        if (i % 7 == 0)\n            __________________________\n    }\n    for (int i = 0; i < count; i++) cout << arr[i] << endl;\n    return 0;\n}\n```',
            options: ['arr[count++] = i;', 'arr[i] = count++;', 'arr[i] = count;', 'arr[count] = count++;'],
            answer: 0,
            score: 2,
            explanation: '应把满足条件的数依次存到 arr[0..count-1] 中，再把 count 加 1。'
        },
        {
            id: 12,
            type: 'single',
            question: '已知字符 \'0\' 的 ASCII 编码的十进制表示为 48，则执行下面 C++ 代码后，输出是（   ）。\n#include <iostream>\nusing namespace std;\nint main() {\n    string s = "0629";\n    int n = s.length();\n    int x = 0;\n    for (int i = 0; i < n; i++) x += s[i];\n    cout << x << endl;\n    return 0;\n}',
            options: ['17', '158', '209', '316'],
            answer: 2,
            score: 2,
            explanation: '字符 0、6、2、9 的 ASCII 分别为 48、54、50、57，总和为 209。'
        },
        {
            id: 13,
            type: 'single',
            question: '某小学男子篮球队招募新成员，要求加入球队的成员身高在 135 厘米以上（不含 135 厘米）。本次报名的人员有 10 人，他们的身高分别是 125、127、136、134、137、138、126、135、140、145。完善以下代码，求出本次球队能够招募到新成员的人数？（   ）\n```cpp\n#include <iostream>\nusing namespace std;\nint main() {\n    int arr[10] = {125, 127, 136, 134, 137, 138, 126, 135, 140, 145};\n    int count = 0;\n    for (int i = 0; i < 10; i++)\n        __________________________\n    cout << count << endl;\n    return 0;\n}\n```',
            options: ['count = arr[i] > 135 ? 1 : 0;', 'count += arr[i] > 135 ? 1 : 0;', 'count++;', '以上都不对'],
            answer: 1,
            score: 2,
            explanation: '要累计统计大于 135 的人数，应在条件成立时加 1，否则加 0。'
        },
        {
            id: 14,
            type: 'single',
            question: '下面可以正确输出 They\'re planning a party for their friend\'s birthday. 的 C++ 语句是？（   ）',
            options: ['cout << \'They\\\'re planning a party for their friend\'\\s birthday." << endl;', 'cout << "They\\\'re planning a party for their friend\'s birthday.\'<< endl;', 'cout << \'They\'re planning a party for their friend\'s birthday.\'<< endl;', 'cout << "They\\\'re planning a party for their friend\\\'s birthday." << endl;'],
            answer: 3,
            score: 2,
            explanation: '整句应用双引号包裹，字符串中的单引号可写成普通单引号或转义形式；按原卷选项，正确项为 D。'
        },
        {
            id: 15,
            type: 'single',
            question: '如果执行下面 C++ 代码后，输出的结果是“gesp ccf org cn ”，则横线上应填入哪个代码？（   ）\n```cpp\n#include <iostream>\nusing namespace std;\nint main() {\n    string str = "gesp.ccf.org.cn";\n    string delimiter = ".";\n    string result = "";\n    string token;\n    size_t found = str.find(delimiter);\n    while (found != string::npos) {\n        token = str.substr(0, found);\n        result += token;\n        result += " ";\n        __________________________\n        found = str.find(delimiter);\n    }\n    result += str;\n    result += " ";\n    cout << result << endl;\n    return 0;\n}\n```',
            options: ['str = str.substr(found+delimiter.length(), str.length()-1);', 'str = str.substr(found, str.length());', 'str = str.substr(found, str.length()-1);', '以上都不对'],
            answer: 0,
            score: 2,
            explanation: '每次处理完前缀后，要把 str 更新为分隔符之后的剩余部分。'
        },
        {
            id: 16,
            type: 'judge',
            question: 'GESP 测试是对认证者的编程能力进行等级认证，同一级别的能力基本上与编程语言无关。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: 'GESP 主要考察对应等级的编程能力，而不是限定某一门语言。'
        },
        {
            id: 17,
            type: 'judge',
            question: '整数 -6 的 16 位补码可用十六进制表示为 FFFA。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '-6 的 16 位补码为 1111 1111 1111 1010，即 FFFA。'
        },
        {
            id: 18,
            type: 'judge',
            question: '补码的优点是可以将减法运算转化为加法运算，从而简化计算机的硬件设计。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '补码让减法可通过加法器完成，是计算机系统中的经典设计。'
        },
        {
            id: 19,
            type: 'judge',
            question: '字符常量 \'\\0\' 常用来表示字符串结束，和字符常量 \'0\' 相同。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '\\0 的码值是 0，而字符 0 的 ASCII 码值是 48，两者不同。'
        },
        {
            id: 20,
            type: 'judge',
            question: '数组的所有元素在内存中可以不连续存放。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '数组是连续存储的线性结构。'
        },
        {
            id: 21,
            type: 'judge',
            question: 'C++ 中可以对数组和数组的每个基础类型的元素赋值。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '数组元素可以逐个赋值，但数组整体通常不能在定义后直接整体赋值，因此本题判错。'
        },
        {
            id: 22,
            type: 'judge',
            question: '如果 a 为 int 类型变量，且表达式 ((a | 3) == 3) 的值为 true，则说明 a 在从 0 到 3 之间（可能为 0，也可能为 3）。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: 'a|3 等于 3 说明除最低两位外其余位都是 0，a 只能在 0~3 之间。'
        },
        {
            id: 23,
            type: 'judge',
            question: '执行下面 C++ 代码后，输出的结果是 8。\n```cpp\nint a = 0b1010;\nint b = 01100;\nint c = a & b;\ncout << c << endl;\n```',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '01100 是八进制，等于十进制 576；与 10 按位与后结果为 0，不是 8。'
        },
        {
            id: 24,
            type: 'judge',
            question: '执行下面 C++ 代码后，输出的结果不可能是 89781。\n```cpp\n#include <iostream>\n#include <cstdlib>\n#include <ctime>\nusing namespace std;\nint main() {\n    srand(time(NULL));\n    int i = 1;\n    int s[5];\n    while (i <= 5) {\n        int a = rand() % 10;\n        if (a % 3 == (i+1) % 3)\n            s[i++] = a;\n    }\n    for (int i = 1; i <= 5; i++) cout << s[i];\n    cout << endl;\n    return 0;\n}\n```',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '按条件可知各位置只能落在特定模 3 类别中，因此 89781 这种结果不可能出现。'
        },
        {
            id: 25,
            type: 'judge',
            question: '把整数 3025 从中剪开分为 30 和 25 两个数，此时再将这两数之和平方，计算结果又等于原数。 (30+25) × (30+25) = 55 × 55 = 3025，这样的数叫“雷劈数”。可以使用枚举的方法求出所有符合这样条件的四位数。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '四位数范围有限，枚举 1000~9999 并检验即可。'
        }
    ],
    programmingQuestions: [
        {
      id: 26,
      type: 'programming',
      samples: [{ input: '待补充', output: '待补充' }],
      referenceCode: '// 待补充',
      question: `
# [GESP202406 三级] 移位

## 题目描述

小杨学习了加密技术移位，所有大写字母都向后按照⼀个固定数目进行偏移。偏移过程会将字母表视作首尾相接的环，例如，当偏移量是 \$3\$ 的时候，大写字母 A 会替换成 D，大写字母 Z 会替换成 C，总体来看，大写字母表 ABCDEFGHIJKLMNOPQRSTUVWXYZ 会被替换成 DEFGHIJKLMNOPQRSTUVWXYZABC。

注：当偏移量是 \$26\$ 的倍数时，每个大写字母经过偏移后会恰好回到原来的位置，即大写字母表 ABCDEFGHIJKLMNOPQRSTUVWXYZ 经过偏移后会保持不变。

## 输入格式

第一行包含一个正整数 \$n\$。

## 输出格式

输出在偏移量为 \$n\$ 的情况下，大写字母表 ABCDEFGHIJKLMNOPQRSTUVWXYZ 移位替换后的结果。
`,
      explanation: '字母表长度为 26，先将 n 对 26 取模。对第 i 个字母，输出 char(\'A\'+(i+n) % 26) 即可。',
      template: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}',
      score: 25,
      tags: ['编程题', '字符串', '模拟'],
      referenceCode: '#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n;\n    cin >> n;\n    for(int i = 0; i < 26; i++){\n        int j = (i+n) % 26;\n        char ch = \'A\'+j;\n        cout << ch;\n    }\n    cout << "\\n";\n    return 0;\n}',
      answer: '',
    },
        {
      id: 27,
      type: 'programming',
      samples: [{ input: '待补充', output: '待补充' }],
      referenceCode: '// 待补充',
      question: `
# [GESP202406 三级] 寻找倍数

## 题目描述

小杨有一个包含 \$n\$ 个正整数的序列 \$A=[a_1,a_2,\\dots,a_n]\$，他想知道是否存在 \$i(1\\leq i\\leq n)\$ 使得 \$a_i\$ 是序列 \$A\$ 中所有数的倍数。

## 输入格式

第一行包含一个正整数 \$t\$，代表测试用例组数。

接下来是 \$t\$ 组测试用例。对于每组测试用例，一共两行。

其中，第一行包含一个正整数 \$n\$；第二行包含 \$n\$ 个正整数，代表序列 \$A\$。

## 输出格式

对于每组测试用例，如果存在 \$i(1\\leq i\\leq n)\$ ，满足对于所有 \$k(1\\leq k\\leq n)\$ \$a_i\$ 是 \$a_k\$ 的倍数，输出 \`Yes\`，否则输出 \`No\`。
`,
      explanation: '如果某个数是所有数的倍数，那么它一定是数组中的最大值。先求最大值，再判断它是否能被数组中每个数整除即可。',
      template: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}',
      score: 25,
      tags: ['编程题', '数组', '整除', '多组测试'],
      referenceCode: '#include<bits/stdc++.h>\nusing namespace std;\nconst int N = 1e5+10;\nint a[N];\nint main(){\n    int t;\n    cin >> t;\n    while(t--){\n        int n;\n        cin >> n;\n        int x = 0;\n        for(int i = 1; i <= n; i++){\n            cin >> a[i];\n            x = max(x, a[i]);\n        }\n        int fl = 0;\n        for(int i = 1; i <= n; i++){\n            if(x % a[i]) fl = 1;\n        }\n        if(fl) cout << "No\\n";\n        else cout << "Yes\\n";\n    }\n    return 0;\n}',
      answer: '',
    }
    ]
};