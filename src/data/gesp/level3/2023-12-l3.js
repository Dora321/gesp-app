// 2023年12月 GESP C++ 三级真题 (第4次认证)
// 数据说明：本卷基于官方真题 PDF 与公开解析回填。
//-官方 PDF：可核对题号、客观题答案、判断题题干、编程题题面/样例/参考程序
//-由于官方 PDF 的文本层对多道“代码截图题”缺失，部分客观题题面按公开解析做题意级还原
//-其中单选 4~8、11~12 以及判断 2、4~8 含还原成分；答案已与官方 PDF 答案表核对
export const paperData = {
    id: '2023-12-l3',
    title: '2023年12月 GESP C++ 三级真题',
    level: 3,
    year: 2023,
    month: 12,
    session: 4,
    timeLimit: 90 * 60,
    source: {
        officialPdf: 'https://gesp.ccf.org.cn/101/attach/1584917876047904.pdf',
        notes: '客观题已补至 25 题；其中多道代码截图题按公开解析还原，已在文件头注明范围。'
    },
    questions: [
        {
            id: 1,
            type: 'single',
            question: '下面 C++ 数组的定义中，会丢失数据的是（   ）。',
            options: [
                "char dict_key[] = {'p','t','o'};",
                'int dict_value[] = {33,22,11};',
                "char dict_name[] = {'chen','wang','zhou'};",
                'float dict_value[] = {3,2,1};'
            ],
            answer: 2,
            score: 2,
            explanation: '字符数组不能这样直接装多个字符串字面量，C 项会导致类型/存储方式不匹配。'
        },
        {
            id: 2,
            type: 'single',
            question: '在下列编码中，不能够和二进制“1101 1101”相等的是（   ）。',
            options: ['（221）10进制', '（335）8进制', '（dd）16进制', '（5d）16进制'],
            answer: 3,
            score: 2,
            explanation: '1101 1101 对应十六进制 DD，不是 5D。'
        },
        {
            id: 3,
            type: 'single',
            question: '下面 C++ 代码执行后不能输出“GESP”的是（   ）。',
            options: [
                'string str("GESP"); cout << str << endl;',
                'string str = "GESP"; cout << str << endl;',
                'string str("GESP"); cout << str[1] << str[2] << str[3] << str[4] << endl;',
                'string str{"GESP"}; cout << str << endl;'
            ],
            answer: 2,
            score: 2,
            explanation: '下标从 0 开始，C 项输出的是 ESP 加越界访问结果，不能正确输出完整的 GESP。'
        },
        {
            id: 4,
            type: 'single',
            question: '【题面按公开解析还原】执行下面 C++ 代码后输出是（   ）。\n```cpp\nint temp = 0;\nfor (int i = 1; i < 7; i++) {\n    for (int j = 1; j < 5; j++) {\n        if (i / j == 2) temp++;\n    }\n}\ncout << temp << endl;\n```',
            options: ['10', '8', '4', '3'],
            answer: 2,
            score: 2,
            explanation: '满足 i/j==2 的共有 4 次：i=2,j=1；i=4,j=2；i=5,j=2；i=6,j=3。'
        },
        {
            id: 5,
            type: 'single',
            question: '【题面按公开解析还原】执行下面 C++ 代码后，输出是（   ）。\n```cpp\nstring str = "chen";\nint x = str.length();\nint temp = 0;\nfor (int i = 0; i <= x; i++) temp++;\ncout << temp << endl;\n```',
            options: ['4', '2', '5', '3'],
            answer: 2,
            score: 2,
            explanation: '字符串长度 x 为 4，循环从 0 到 4 共执行 5 次。'
        },
        {
            id: 6,
            type: 'single',
            question: '【题面按公开解析还原】执行下面 C++ 代码后输出是（   ）。\n```cpp\nstring str = "chen";\nint x = str.length();\ncout << x << endl;\n```',
            options: ['4', '3', '2', '5'],
            answer: 0,
            score: 2,
            explanation: '字符串 chen 长度为 4。'
        },
        {
            id: 7,
            type: 'single',
            question: '【题面按公开解析还原】执行下面 C++ 代码后输出的是（   ）。\n```cpp\nstring str = "chen";\ncout << str[5] << endl;\n```',
            options: ['输出未知的数', "输出 'n'", "输出 '\\0'", '输出空格'],
            answer: 0,
            score: 2,
            explanation: '有效下标只有 0~3，访问 str[5] 属于越界，行为未定义。'
        },
        {
            id: 8,
            type: 'single',
            question: '【题面按公开解析还原】下面 C++ 代码执行后的输出是（   ）。\n```cpp\nchar ch[10] = {\'1\'};\ncout << ch[2] << endl;\n```',
            options: ['0', '1', '输出空格', '什么也不输出'],
            answer: 3,
            score: 2,
            explanation: '公开解析给出的答案为 D；该题原始截图题面仍建议后续再由扫描版复核。'
        },
        {
            id: 9,
            type: 'single',
            question: '下面 C++ 代码用于统计每种字符出现的次数，当输出为 3 时，横线上不能填入的代码是（   ）。\n```cpp\nstring str = "GESP is a good programming test!";\nint cnt = 0;\nfor (int i = 0; i < str.length(); i++) {\n    if (_______) cnt++;\n}\ncout << cnt << endl;\n```',
            options: ["str[i]=='o'", "str[i]=='a'+14", 'str[i]==115', 'str[i]==111'],
            answer: 2,
            score: 2,
            explanation: '字符串中 "o" 出现 3 次（good 中两个，programming 中一个）。"o" 的 ASCII 码是 111，a+14 也是 111。而 115 是 "s"，在字符串中（以小写计）仅出现 2 次（is, test），不符合输出 3 的条件。',
            tags: ['字符串', 'ASCII 码']
        },
        {
            id: 10,
            type: 'single',
            question: '32 位计算机中，C++ 的整型变量 int 能够表示的数据范围是（   ）。',
            options: ['2^31~(2^31)-1', '2^32', '-2^31~+(2^31)-1', '-(2^31)+1~2^31'],
            answer: 2,
            score: 2,
            explanation: '通常 32 位 int 的范围是 -2^31 到 2^31-1。'
        },
        {
            id: 11,
            type: 'single',
            question: '【题面按公开解析还原】下面 C++ 程序执行的结果是（   ）。\n```cpp\nint cnt = 0;\nfor (int i = 0; i <= 20; i++) {\n    if (i % 3 == 0 && i % 5 == 0) cnt++;\n}\ncout << cnt;\n```',
            options: ['2', '3', '5', '4'],
            answer: 0,
            score: 2,
            explanation: '0 和 15 同时满足被 3 和 5 整除，共 2 个。'
        },
        {
            id: 12,
            type: 'single',
            question: '【题面按公开解析还原】C++ 的数据类型转换让人很难琢磨透，下列代码输出的值是（   ）。\n```cpp\nint a = 3;\nint b = 2;\ncout << a / b * 1.0 << endl;\n```',
            options: ['1.5', '1', '2', '1.50'],
            answer: 1,
            score: 2,
            explanation: '先做整数除法 3/2 得 1，再乘 1.0 得 1.0，默认输出为 1。'
        },
        {
            id: 13,
            type: 'single',
            question: 'C++ 代码用于抽取字符串中的电话号码。约定：电话号码全部是数字，数字之间没有其他符号如连字符或空格等。代码中变量 strSrc 仅仅是示例，可以包含更多字符。下面有关代码说法，正确的是（   ）。',
            options: [
                '代码将换行输出各个含有数字的电话号码。',
                '代码将不换行输出各个含有数字的电话号码，号码中间没有分隔。',
                '代码将不换行输出各个含有数字的电话号码，号码中间有分隔。',
                '不能够输出数字电话号码。'
            ],
            answer: 0,
            score: 2,
            explanation: '遇到连续数字就拼接，遇到非数字且 tel 不为空就输出并换行。'
        },
        {
            id: 14,
            type: 'single',
            question: '某公司新出了一款无人驾驶的小汽车，通过声控智能驾驶系统，乘客只要告诉汽车目的地，车子就能自动选择一条优化路线，告诉乘客后驶达那里。请问下面哪项不是驾驶系统完成选路所必须的。（   ）',
            options: ['麦克风', '扬声器', '油量表', '传感器'],
            answer: 2,
            score: 2,
            explanation: '麦克风、扬声器、传感器都直接参与交互或感知，油量表不是“选路”所必需。'
        },
        {
            id: 15,
            type: 'single',
            question: '现代计算机是指电子计算机，它所基于的是（   ）体系结构。',
            options: ['艾伦·图灵', '冯·诺依曼', '阿塔纳索夫', '埃克特-莫克利'],
            answer: 1,
            score: 2,
            explanation: '现代电子计算机通常基于冯·诺依曼体系结构。'
        },
        {
            id: 16,
            type: 'judge',
            question: '执行 C++ 代码 cout << (5 && 2) << endl; 后将输出 1。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '两个操作数都非 0，逻辑与结果为真，输出 1。'
        },
        {
            id: 17,
            type: 'judge',
            question: '【题面按公开解析还原】C++ 程序执行后，输入 chen a dai，输出应该为：chen。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: 'cin 读取字符串默认以空白符分隔，第一次读到的就是 chen。'
        },
        {
            id: 18,
            type: 'judge',
            question: '执行 C++ 代码 cout << (5 || 2); 后将输出 1。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '两个操作数都非 0，逻辑或结果为真，输出 1。'
        },
        {
            id: 19,
            type: 'judge',
            question: '【题面按公开解析还原】执行下面 C++ 代码后将输出 “China”。\nstring a = "china";\na.replace(0, 1, "C");\n```cpp\ncout << a << endl;\n```',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '把首字符替换成大写 C 后，字符串变为 China。'
        },
        {
            id: 20,
            type: 'judge',
            question: '【题面按公开解析还原】执行 C++ 代码将输出 0 5，5 之后还有一个空格。\n```cpp\nint list[10] = {1,2,3,4,5,6,7,8,9,10};\nfor (int i = 0; i < 10; i++)\n    if (i % 5 == 0)\n        cout << list[i] << " ";\n```',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '满足条件的是 i=0 和 i=5，输出 list[0] 与 list[5]，即 1 6，而不是 0 5。'
        },
        {
            id: 21,
            type: 'judge',
            question: '【题面按公开解析还原】下面 C++ 代码将输出 1。\n```cpp\nint list[10] = {1};\ncout << list << endl;\n```',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '直接输出数组名会退化为地址，不会输出首元素 1。'
        },
        {
            id: 22,
            type: 'judge',
            question: '【题面按公开解析还原】下面 C++ 程序将输出 1。\n```cpp\nint arr[10] = {1};\ncout << arr[0] << endl;\n```',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: 'arr[0] 初始化为 1，因此会输出 1。'
        },
        {
            id: 23,
            type: 'judge',
            question: '【题面按公开解析还原】执行 C++ 代码，将输出 1 3 5 7 9，9 之后还有一个空格。\n```cpp\nint list[10] = {1,2,3,4,5,6,7,8,9,10};\nfor (int i = 0; i < 10; i += 2) {\n    cout << list[i] << " ";\n}\n```',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '访问下标 0、2、4、6、8，对应输出 1 3 5 7 9，每次后面都有空格。'
        },
        {
            id: 24,
            type: 'judge',
            question: '小杨最近在准备考 GESP，他用的 Dev C++ 来练习和运行程序，所以 Dev C++ 也是一个小型操作系统。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: 'Dev C++ 是集成开发环境，不是操作系统。'
        },
        {
            id: 25,
            type: 'judge',
            question: '任何一个 while 循环都可以转化为等价的 for 循环。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: 'for 与 while 在表达能力上等价，可以相互改写。'
        }
    ],
    programmingQuestions: [
        {
      id: 26,
      type: 'programming',
      samples: [{ input: '待补充', output: '待补充' }],
      referenceCode: '// 待补充',
      question: `
# [GESP202312 三级] 小猫分鱼

## 题目描述

海滩上有一堆鱼，\$N\$ 只小猫来分。第一只小猫把这堆鱼平均分为 \$N\$ 份，多了 \$i

## 输入格式

总共 \$2\$ 行。第一行一个整数 \$N\$，第二行一个整数 \$i\$。

保证 \$0

## 输出格式

一行一个整数，表示满足要求的海滩上最少的鱼数。
`,
      explanation: '从小到大枚举初始鱼数，逐只小猫模拟“余 i、扔掉 i 条、拿走一份”的过程，找到第一个全过程都合法的鱼数即可。',
      template: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}',
      score: 25,
      tags: ['编程题', '模拟', '枚举'],
      referenceCode: '#include <bits/stdc++.h>\nusing namespace std;\n\nbool check(long long x, int N, int i) {\n    long long cur = x;\n    for (int t = 0; t < N; ++t) {\n        if (cur % N != i) return false;\n        cur -= i;\n        if (cur < 0 || cur % N != 0) return false;\n        cur = cur / N * (N-1);\n    }\n    return true;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int N, i;\n    cin >> N >> i;\n    for (long long x = 1; ; ++x) {\n        if (check(x, N, i)) {\n            cout << x << "\\n";\n            break;\n        }\n    }\n    return 0;\n}',
      answer: '',
    },
        {
      id: 27,
      type: 'programming',
      samples: [{ input: '待补充', output: '待补充' }],
      referenceCode: '// 待补充',
      question: `
# [GESP202312 三级] 单位转换

## 题目描述

小杨这周的数学作业是做单位转换，喜欢编程的小杨决定编程帮他解决这些问题。

小杨只学了长度单位和重量单位，具体来说：

- 长度单位包括千米（\`km\`）、米（\`m\`）、毫米（\`mm\`），它们之间的关系是：\$1\\text{km} = 1000\\text{m} = 1000000\\text{mm}\$。

- 重量单位包括千克（\`kg\`）、克（\`g\`）、毫克（\`mg\`），它们之间的关系是：\$1\\text{kg} = 1000\\text{g} = 1000000\\text{mg}\$。

小杨的作业只涉及将更大的单位转换为更小的单位，也就是说，小杨的作业只会包含如下题型：米转换为毫米，千米转换为毫米，千米转换为米，克转换为毫克，千克转换为毫克，千克转换为克。

现在，请你帮忙完成单位转换的程序。

## 输入格式

输入的第一行为一个整数，表示题目数量。

接下来 \$N\$ 行，每行一个字符串，表示转换单位的题目，格式为 \$x\$ 单位 \$1 = ?\$ 单位 \$2\$。其中，\$x\$ 为一个不超过 \$1000\$ 的非负整数， 单位 \$1\$ 和 单位 \$2\$ 分别为两个单位的英文缩写，保证它们都是长度单位或都是重量单位，且 **单位 1** 比 **单位 2** 更大。

例如，如果题目需要你将 \$1\\text{km}\$ 转换为 \$\\text{mm}\$，则输入为 \`1 km = ? mm\`。

保证 \$1\\le N \\le 1000\$。

## 输出格式

输出 \$N\$ 行，依次输出所有题目的答案，输出时，只需要将输入中的 \$?\$ 代入答案，其余部分一字不差地输出即可。由于小杨的题目只涉及将更大的单位转换为更小的单位，并且输入的 \$x\$ 是整数，因此答案一定也是整数。

例如，如果题目需要你将 \$1\\text{km}\$ 转换为 \$\\text{mm}\$，则输入为 \`1 km = ? mm\`。则你需要输出 \`1 km = 1000000 mm\`。
`,
      explanation: '识别源单位和目标单位，乘上相应换算倍数后按题目原格式输出即可。',
      template: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}',
      score: 25,
      tags: ['编程题', '字符串', '模拟'],
      referenceCode: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int N;\n    cin >> N;\n    map<pair<string, string>, long long> mp;\n    mp[{"m", "mm"}] = 1000;\n    mp[{"km", "mm"}] = 1000000;\n    mp[{"km", "m"}] = 1000;\n    mp[{"g", "mg"}] = 1000;\n    mp[{"kg", "mg"}] = 1000000;\n    mp[{"kg", "g"}] = 1000;\n\n    while (N--) {\n        long long x;\n        string u1, eq, ques, u2;\n        cin >> x >> u1 >> eq >> ques >> u2;\n        cout << x << " " << u1 << " = " << x * mp[{u1, u2}] << " " << u2 << "\\n";\n    }\n    return 0;\n}',
      answer: '',
    }
    ]
};
