// 2026年3月 GESP C++ 二级真题
export const paperData = {
    id: '2026-03-l2',
    title: '2026年3月 GESP C++ 二级真题',
    level: 2,
    year: 2026,
    month: 3,
    session: 13,
    timeLimit: 90 * 60,
    source: {
        officialPdf: 'https://gesp.ccf.org.cn/101/attach/1734124601606176.pdf',
        type: 'official',
        notes: '客观题与编程题均按官方 PDF 回填；少量图形题按官方版式做等价转写。',
    },
    questions: [
        {
            id: 1,
            type: 'single',
            question: '2026 年春节联欢晚会上一个武术表演节目《武 BOT》。节目中多个人形机器人会表演空翻，它们落地可能会有微微踉跄，但都会迅速调整姿态站稳，并适当移动来和前后左右的其他机器人保持原来队列。如果将机器人视作一个计算机系统，那么在该计算机系统中下面哪一项不能作为输入设备（ ）。',
            options: ['检测重心的重力传感器', '预装的 AI 算法程序', '接收动作指令的遥控器', '拍摄其他机器人的摄像头'],
            answer: 1,
            score: 2,
            explanation: '算法程序属于软件而不是输入设备。',
            tags: ['计算机基础'],
        },
        {
            id: 2,
            type: 'single',
            question: '下面代码用来找出输入的 `N` 个正整数中最大的一个。如果将代码段用流程图来表示，则 `L1` 标记的代码行应该使用的图形是（ ）。\n```cpp\nint N, max = 0, val;\ncin >> N;\nwhile (N) {\n    cin >> val;\n    if (val > max) // L1\n        max = val;\n    N--;\n}\ncout << max;\n```',
            options: ['圆形框', '椭圆形框', '平行四边形框', '菱形框'],
            answer: 3,
            score: 2,
            explanation: '`if (val > max)` 是条件判断，对应流程图中的菱形框。',
            tags: ['流程图', '程序结构'],
        },
        {
            id: 3,
            type: 'single',
            question: '下面 C++ 代码可以执行，有关说法正确的是（ ）。\n```cpp\ndouble PI = 3.1415926;\ncout << (PI);\n```',
            options: [
                '为了方便初学者，`cout << (PI)` 和 `cout << (pi)` 效果相同，即变量的大小写不敏感',
                '把 `cout << (PI)` 修改为 `cout << (Pi)` 能正常执行',
                '不能用 `PI` 做变量名，因为要保存圆周率这个常量',
                '将程序中全部 `PI` 都改写为 `Pai`，将能正常执行，不会报错',
            ],
            answer: 3,
            score: 2,
            explanation: '只要定义和使用保持一致，变量名改成 `Pai` 依然可以正常工作。',
            tags: ['变量与标识符'],
        },
        {
            id: 4,
            type: 'single',
            question: '下面选择项中，与 C++ 表达式 `!(x > 5 && y <= 10)` 等价的是（ ）。',
            options: ['`x <= 5 && y > 10`', '`x > 5 || y <= 10`', '`x <= 5 || y > 10`', '`!x > 5 && !y <= 10`'],
            answer: 2,
            score: 2,
            explanation: '由德摩根律可得 `!(A && B)` 等价于 `!A || !B`，因此答案是 `x <= 5 || y > 10`。',
            tags: ['逻辑运算'],
        },
        {
            id: 5,
            type: 'single',
            question: '某同学执行 C++ 代码 `cout << ((0.1 + 0.2) == 0.3)` 时输出 `0`，下面最可能的原因是（ ）。',
            options: [
                'C++ 的 `+` 运算符在处理小数时存在 bug',
                '`0.1`、`0.2` 和 `0.3` 在计算机中无法用二进制浮点数精确表示，导致 `0.1 + 0.2` 的结果与 `0.3` 存在微小误差',
                '`==` 运算符不能用于比较浮点数，只能用于整数',
                '因为 `0.1 + 0.2` 的数学结果不等于 `0.3`',
            ],
            answer: 1,
            score: 2,
            explanation: '浮点数存在二进制表示误差，因此直接用 `==` 比较常常得不到预期结果。',
            tags: ['浮点数'],
        },
        {
            id: 6,
            type: 'single',
            question: '下面的 C++ 代码段执行后其输出是（ ）。\n```cpp\ntnt = 0;\nfor (int i = 0; i < 5; i++) {\n    for (int j = 0; j < i; j++)\n        tnt += 1;\n    cout << tnt << \"#\";\n}\ncout << tnt;\n```',
            options: ['`0#1#3#6#10#10`', '`1#2#3#4#5#6#7#8#9#10#10`', '`10#10`', '`10`'],
            answer: 0,
            score: 2,
            explanation: '`tnt` 依次累加 `0,1,2,3,4`，输出过程为 `0#1#3#6#10#`，最后再输出 `10`。',
            tags: ['循环', '程序分析'],
        },
        {
            id: 7,
            type: 'single',
            question: '下面的 C++ 代码执行之后的输出是（ ）。\n```cpp\nfor (int i = -2; i < 2; i++)\n    if (not i % 3)\n        cout << i << \"#\";\n```',
            options: ['`0#`', '`-2#-1#1#`', '`-1#0#`', '`-2#0#1#`'],
            answer: 0,
            score: 2,
            explanation: '`not i` 只在 `i=0` 时为真，因此最终只输出 `0#`。',
            tags: ['逻辑运算', '程序分析'],
        },
        {
            id: 8,
            type: 'single',
            question: '下面的 C++ 代码执行后其输出是（ ）。\n```cpp\nint cnt = 0, i, j;\nfor (i = 1; i < 5; i++) {\n    for (j = 0; j < i; j++)\n        cout << j << \"#\";\n    break;\n}\nif (i >= 5)\n    cout << (i * j);\n```',
            options: ['`0#0#1#0#1#2#0#1#2#3#12`', '`0#0#1#0#1#2#0#1#2#3#`', '`0#`', '`1#`'],
            answer: 2,
            score: 2,
            explanation: '外层循环第一次 `i=1` 时内层只输出一次 `0#`，随后立即 `break`，且 `i<5`，不会执行最后一行输出。',
            tags: ['循环', '程序分析'],
        },
        {
            id: 9,
            type: 'single',
            question: '下面 C++ 代码执行后其输出是（ ）。\n```cpp\nint count = 0;\nfor (int i = 1; i < 4; i++)\n    for (int j = 1; j < 5; j++) {\n        if (j == 3)\n            continue;\n        if (i == 2)\n            break;\n        count += 1;\n    }\ncout << (count);\n```',
            options: ['2', '4', '6', '8'],
            answer: 2,
            score: 2,
            explanation: '`i=1` 时增加 3 次，`i=2` 时每次都会在加之前跳出，`i=3` 时再增加 3 次，总计 6。',
            tags: ['循环', '程序分析'],
        },
        {
            id: 10,
            type: 'single',
            question: '下面 4 个选项中，与下面 C++ 代码段具有相同效果的是（ ）。\n```cpp\ni = 0;\nwhile (i < 5) {\n    cout << i;\n    i += 1;\n}\n```',
            options: [
                '```cpp\nfor (i = 0; i < 5; i++)\n    cout << i;\n```',
                '```cpp\nfor (i = 1; i < 5; i++)\n    cout << i;\n```',
                '```cpp\nfor (i = 0; i < 6; i++)\n    cout << i;\n```',
                '```cpp\nfor (i = 1; i < 6; i++)\n    cout << i;\n```',
            ],
            answer: 0,
            score: 2,
            explanation: '原程序输出 `01234`，只有选项 A 与之完全一致。',
            tags: ['循环', '等价变换'],
        },
        {
            id: 11,
            type: 'single',
            question: '下面 C++ 代码执行后输出是（ ）。\n```cpp\nint n = 10;\nwhile (n > 0) {\n    n -= 1;\n    if (n % 3 == 0)\n        continue;\n    if (n == 5)\n        break;\n}\ncout << n;\n```',
            options: ['0', '5', '6', '7'],
            answer: 1,
            score: 2,
            explanation: '`n` 依次变成 `9,8,7,6,5`；当 `n=5` 时触发 `break`，最终输出 `5`。',
            tags: ['循环', '程序分析'],
        },
        {
            id: 12,
            type: 'single',
            question: '下面 C++ 代码段执行后，其输出是（ ）。\n```cpp\nint i, j, cnt;\ncnt = 0;\nfor (i = 0; i < 5; i++) {\n    i = -i;\n    for (j = i; j < -i; j++)\n        cnt += 1;\n    i = -i;\n}\ncout << cnt;\n```',
            options: ['5', '15', '20', '30'],
            answer: 2,
            score: 2,
            explanation: '每轮内层循环次数分别为 `0,2,4,6,8`，总和为 `20`。',
            tags: ['循环', '程序分析'],
        },
        {
            id: 13,
            type: 'single',
            question: '某学校图书馆的借阅卡号由 6 位整数组成。前 5 位是顺序编号，第 6 位是校验码：将前 5 位数字相加后除以 10 的余数，就是第 6 位。下面的 C++ 代码段用于判断卡号是否正确，横线处应填入的代码是（ ）。\n```cpp\ncout << \"请输入卡号：\";\ncin >> N;\norder_num = N / 10;\ncheck_num = N % 10;\ntnt = 0;\nfor (i = 0; i < 5; i++) {\n    ________________;\n    order_num /= 10;\n}\nif (__________________)\n    cout << \"符合校验规则\";\nelse\n    cout << \"不符合校验规则\";\n```',
            options: [
                '`tnt += order_num / 10`\n`tnt / 10 == check_num`',
                '`tnt += order_num % 10`\n`tnt % 10 == check_num`',
                '`tnt = order_num / 10 + tnt`\n`tnt % 10 == check_num`',
                '`tnt = order_num % 10`\n`tnt / 10 == check_num`',
            ],
            answer: 1,
            score: 2,
            explanation: '每次要取出当前最后一位数字累加，因此应使用 `order_num % 10`；最后再比较 `tnt % 10` 与校验码。',
            tags: ['循环', '运算符'],
        },
        {
            id: 14,
            type: 'single',
            question: '下面的 C++ 代码段正常执行后其输出的数字图形是（ ）。\n```cpp\nfor (i = 1; i < 5; i++) {\n    for (j = 1; j < i + 1; j++)\n        cout << j;\n    cout << endl;\n}\n```',
            options: ['1\n12\n123\n1234', '1\n22\n333\n4444', '1\n21\n321\n4321', '4\n34\n234\n1234'],
            answer: 0,
            score: 2,
            explanation: '第 `i` 行从 `1` 递增输出到 `i`，因此图形为 `1 / 12 / 123 / 1234`。',
            tags: ['循环', '图形'],
        },
        {
            id: 15,
            type: 'single',
            question: '某学校举办“校园演讲比赛”，每位选手由 8 位评委打分（0~10 的整数），若至少有 5 位评委给出大于等于 6 分，则成绩有效，最终得分为所有 8 位评委的总分。以下核心程序段依次输入 8 个分数，并计算最终得分。横线处应填入（ ）。\n```cpp\ntotal_score = 0;\nhigh_count = 0;\nfor (i = 0; i < 8; i++) {\n    cout << \"请输入评委分数: \";\n    cin >> score;\n    ____________________;\n    if (score >= 6)\n        ________________;\n}\nif (high_count >= 5)\n    cout << total_score;\nelse\n    cout << 0;\n```',
            options: [
                '`total_score += score`\n`high_count += 1`',
                '`total_score += score`\n`high_count += score`',
                '`high_count += 1`\n`total_score += score`',
                '`total_score *= score`\n`high_count *= 1`',
            ],
            answer: 0,
            score: 2,
            explanation: '总分应累加每位评委的分数；当分数不低于 6 时，高分人数加 1。',
            tags: ['循环', '程序分析'],
        },
        {
            id: 16,
            type: 'judge',
            question: '小明的妈妈最近刚刚给他买了一块电话手表，除了可以看时间，小明也可以用它和妈妈打电话、收发信息，那么可以推测这块手表中装有一款特定操作系统。',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '电话手表具备通信和应用管理能力，通常需要操作系统支持。',
            tags: ['判断题'],
        },
        {
            id: 17,
            type: 'judge',
            question: 'C++ 语句 `cout << (\'4\' % \'2\' == \'2\' * \'2\' % 2);` 执行后的输出是 `1`。',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: "字符 `'4'`、`'2'` 参与运算时使用其 ASCII 值，表达式结果并不是 1。",
            tags: ['判断题'],
        },
        {
            id: 18,
            type: 'judge',
            question: '下面的 C++ 代码段执行时将报错，因为 `10` 是整数类型，`a` 是布尔类型。由于类型不同，不能进行加法运算。\n```cpp\nbool a = true;\ncout << (10 + a);\n```',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '布尔值可以隐式转换为整数参与加法运算，因此这里不会因为类型不同而报错。',
            tags: ['判断题'],
        },
        {
            id: 19,
            type: 'judge',
            question: '下面 C++ 代码段执行后将输出 `0-3-6-9-`。\n```cpp\nfor (int i = 0; i < 10; i++) {\n    if (i % 3)\n        continue;\n    cout << i << \"-\";\n}\n```',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '只有 `i` 能被 3 整除时才会输出，因此结果正是 `0-3-6-9-`。',
            tags: ['判断题'],
        },
        {
            id: 20,
            type: 'judge',
            question: '执行下面的 C++ 代码段，如果 `N` 是基本数据类型，则语句 `cout << (N);` 将被执行 0 次或无数次（即死循环）。\n```cpp\ncin >> N;\nwhile (N)\n    cout << (N);\n```',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '输入 `0` 时不执行循环；输入非 0 且循环内不改变 `N` 时会无限输出。',
            tags: ['判断题'],
        },
        {
            id: 21,
            type: 'judge',
            question: '下面的 C++ 代码段可正常执行，删除 `continue` 不影响执行效果。\n```cpp\nfor (i = 0; i < 10; i++) {\n    i += 1;\n    continue;\n}\ncout << (i);\n```',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '循环体中 `continue` 后本来就没有其他语句，因此删掉不会改变效果。',
            tags: ['判断题'],
        },
        {
            id: 22,
            type: 'judge',
            question: '下面的 C++ 代码段用于计算 1 到 `N` 之间且包含 `N` 的所有数字中含有的 `3` 的个数。如果将 `while (i != 0)` 改为 `while (abs(i))`，则执行结果相同。\n```cpp\ncout << \"请输入正整数N：\";\ncin >> N;\ncnt = 0;\nfor (k = 1; k < N + 1; k++) {\n    i = k;\n    while (i != 0) {\n        if (i % 10 == 3)\n            cnt += 1;\n        i /= 10;\n    }\n}\ncout << cnt;\n```',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '这里 `i` 始终为正整数或 0，`i != 0` 与 `abs(i)` 的真值效果一致。',
            tags: ['判断题'],
        },
        {
            id: 23,
            type: 'judge',
            question: '下面的 C++ 代码段执行将不会有输出，因为内层循环 `j` 总是 0 开始，`i * j % 10 == 0` 将会被满足，执行 `break`，故而 `i` 小于 10，不会满足 `if` 判断条件。\n```cpp\nfor (i = 1; i < 10; i++)\n    for (j = 0; j < i; j++)\n        if (i * j % 10 == 0)\n            break;\nif (i >= 10)\n    cout << (i * j);\n```',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '外层循环结束后 `i` 最终会变为 10，因此条件 `i >= 10` 成立，仍会有输出。',
            tags: ['判断题'],
        },
        {
            id: 24,
            type: 'judge',
            question: '下列 C++ 代码执行后将输出 `1#4#9#16#16`。\n```cpp\ncnt = 0;\nfor (i = 1; i < 5; i++) {\n    for (j = 1; j < i + 1; j++)\n        if (i * j % 10 == 0)\n            break;\n    if (j >= i + 1)\n        cout << (i * i) << \"#\";\n}\nif (i >= 5)\n    cout << (i * i);\n```',
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: '并非每一轮都会按题干给出的方式输出，最终结果不是 `1#4#9#16#16`。',
            tags: ['判断题'],
        },
        {
            id: 25,
            type: 'judge',
            question: '下面 C++ 代码执行后输出如左图所示，将 `\" %d\"` 修改为 `\"%3d\"` 即可实现右图输出。\n```cpp\nfor (i = 1; i < 10; i++) {\n    for (j = 1; j < 10; j++)\n        printf(\" %d\", i * j);\n    printf(\"\\n\");\n}\n```',
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '`%3d` 会把每个数字按宽度 3 对齐，正好得到题面右图那种整齐的乘法表布局。',
            tags: ['判断题'],
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


# 数数

## 题目描述

对于正整数 \\\\\\\\\\\\\\\`n\\\\\\\\\\\\\\\`，如果 \\\\\\\\\\\\\\\`n\\\\\\\\\\\\\\\` 的所有数位中包含恰好 \\\\\\\\\\\\\\\`3\\\\\\\\\\\\\\\` 个数字 \\\\\\\\\\\\\\\`2\\\\\\\\\\\\\\\`，Alice 会认为这个正整数是美丽的。例如，\\\\\\\\\\\\\\\`2221\\\\\\\\\\\\\\\` 中包含 3 个 \\\\\\\\\\\\\\\`2\\\\\\\\\\\\\\\`，所以它是美丽的；\\\\\\\\\\\\\\\`132\\\\\\\\\\\\\\\` 中只包含 1 个 \\\\\\\\\\\\\\\`2\\\\\\\\\\\\\\\`，不是美丽的；\\\\\\\\\\\\\\\`212322\\\\\\\\\\\\\\\` 中包含 4 个 \\\\\\\\\\\\\\\`2\\\\\\\\\\\\\\\`，也不是美丽的。给定正整数 \\\\\\\\\\\\\\\`L\\\\\\\\\\\\\\\` 和 \\\\\\\\\\\\\\\`R\\\\\\\\\\\\\\\`，请统计区间 \\\\\\\\\\\\\\\`[L, R]\\\\\\\\\\\\\\\` 中有多少个美丽的正整数。

## 输入格式

输入共两行，第一行为正整数 \\\\\\\\\\\\\\\`L\\\\\\\\\\\\\\\`，第二行为正整数 \\\\\\\\\\\\\\\`R\\\\\\\\\\\\\\\`。

## 输出格式

输出一行，包含一个整数，表示从 \\\\\\\\\\\\\\\`L\\\\\\\\\\\\\\\` 到 \\\\\\\\\\\\\\\`R\\\\\\\\\\\\\\\` 中美丽数的数量。
`,
      score: 25,
      explanation: '区间 `[2221, 2223]` 中，`2221` 与 `2223` 都恰好包含 3 个数字 `2`，而 `2222` 包含 4 个数字 `2`，因此答案为 2。',
      tags: ['编程题', '模拟', '枚举'],
      template: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int l, r;\n    cin >> l >> r;\n    // 在此编写代码\n    return 0;\n}',
      referenceCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int l, r, ans = 0;\n    cin >> l >> r;\n    for (int i = l; i <= r; i++) {\n        int c = 0, t = i;\n        while (t) {\n            if (t % 10 == 2)\n                c++;\n            t /= 10;\n        }\n        if (c == 3)\n            ans++;\n    }\n    cout << ans;\n    return 0;\n}',
      answer: '',
      problemNumber: 'B4497',
    },
        {
      id: 27,
      type: 'programming',
      question: `
# 编程题


# 编程题


# 编程题


# 画画

## 题目描述

输入一个正整数 \\\\\\\\\\\\\\\`n\\\\\\\\\\\\\\\`，你需要绘制一个 \\\\\\\\\\\\\\\`n\\\\\\\\\\\\\\\` 行 \\\\\\\\\\\\\\\`n\\\\\\\\\\\\\\\` 列的正方形，绘制规则如下：正方形的四个顶点使用 \\\\\\\\\\\\\\\`+\\\\\\\\\\\\\\\` 绘制；除顶点外，第 1 行与第 \\\\\\\\\\\\\\\`n\\\\\\\\\\\\\\\` 行使用 \\\\\\\\\\\\\\\`-\\\\\\\\\\\\\\\` 绘制；除顶点外，第 1 列与第 \\\\\\\\\\\\\\\`n\\\\\\\\\\\\\\\` 列使用 \\\\\\\\\\\\\\\`|\\\\\\\\\\\\\\\` 绘制；正方形内部使用 \\\\\\\\\\\\\\\`*\\\\\\\\\\\\\\\` 绘制。

## 输入格式

输入一行，一个正整数 \\\\\\\\\\\\\\\`n\\\\\\\\\\\\\\\`。

## 输出格式

输出共 \\\\\\\\\\\\\\\`n\\\\\\\\\\\\\\\` 行，表示对应尺寸的正方形。
`,
      score: 25,
      explanation: '边框四角是 `+`，上下边是 `-`，左右边是 `|`，内部全部填 `*`。',
      tags: ['编程题', '模拟', '字符串'],
      template: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}',
      referenceCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < n; j++) {\n            if (j == 0 || j == n - 1) {\n                if (i == 0 || i == n - 1)\n                    cout << \'+\';\n                else\n                    cout << \'|\';\n            } else {\n                if (i == 0 || i == n - 1)\n                    cout << \'-\';\n                else\n                    cout << \'*\';\n            }\n        }\n        if (i + 1 != n)\n            cout << endl;\n    }\n    return 0;\n}',
      answer: '',
      problemNumber: 'B4498',
    },
    ],
};
