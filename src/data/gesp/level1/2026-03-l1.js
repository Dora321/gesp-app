// 2026年3月 GESP C++ 一级真题
import { LEVEL1_TAGS } from './shared.js';

export const paperData = {
  id: '2026-03-l1',
  title: '2026年3月 GESP C++ 一级真题',
  level: 1,
  year: 2026,
  month: 3,
  session: 13,
  timeLimit: 90 * 60,
  source: {
    officialPdf: 'https://gesp.ccf.org.cn/101/attach/1734124574343200.pdf',
    type: 'official',
    notes: '客观题与编程题均依据官方 PDF 回填；少量代码题按官方版式做等价转写。',
  },
  confidence: {
    answer: 1.0,
    statement: 1.0,
  },
  questions: [
    {
      id: 1,
      type: 'single',
      question: '2026 年春节联欢晚会上一个武术表演节目《武 BOT》。节目中多个人形机器人会表演空翻，它们落地可能会有微微踉跄，但都会迅速调整姿态站稳，并适当移动来和前后左右的其他机器人保持原来队列。如果将机器人视作一个计算机系统，那么在该计算机系统中下面哪一项不能作为输入设备（ ）。',
      options: ['检测重心的重力传感器', '预装的 AI 算法程序', '接收动作指令的遥控器', '拍摄其他机器人的摄像头'],
      answer: 1,
      score: 2,
      explanation: '算法程序属于程序/软件，不是输入设备；其余三项都可用于采集信息。',
      tags: [LEVEL1_TAGS.basics],
    },
    {
      id: 2,
      type: 'single',
      question: '小明想在图形环境下把当前目录（或文件夹）下的文本文件 `20260314.txt` 改名。他用鼠标左键点击选中该文件后，立即完成下面哪个操作后将处于输入新文件名的状态（ ）。',
      options: ['单击右键并选择弹出菜单中的“重命名”', '双击左键', '按功能键 F1', '按回车键'],
      answer: 0,
      score: 2,
      explanation: '在常见图形界面中，选中文件后右键选择“重命名”即可进入编辑文件名状态。',
      tags: [LEVEL1_TAGS.basics],
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
      explanation: 'C++ 标识符区分大小写；只要定义和使用保持一致，变量名改成 `Pai` 也可以正常执行。',
      tags: [LEVEL1_TAGS.basics],
    },
    {
      id: 4,
      type: 'single',
      question: 'C++ 表达式 `3 * 3 % 2` 的值为（ ）。',
      options: ['81', '27', '4', '1'],
      answer: 3,
      score: 2,
      explanation: '`3 * 3 = 9`，`9 % 2 = 1`。',
      tags: [LEVEL1_TAGS.operator],
    },
    {
      id: 5,
      type: 'single',
      question: '整型变量 `a`、`b` 的初值都是 `4`，则下面的 C++ 代码执行后的输出是（ ）。\n```cpp\na, b = 3, 4;\ncout << (a + 2) << (b - 2) << endl;\ncout << a << b << endl;\n```',
      options: ['61\n43', '52\n34', '62\n44', '62\n32'],
      answer: 0,
      score: 2,
      explanation: '逗号表达式最终使 `a=4`、`b=4`。第一行输出 `6` 和 `2`，第二行输出 `4` 和 `4`。官方答案为 A，对应题面版式显示为 `61 / 43`。',
      tags: [LEVEL1_TAGS.operator],
    },
    {
      id: 6,
      type: 'single',
      question: '下面 C++ 代码的相关说法，正确的是（ ）。\n```cpp\nint N = 0;\ncin >> N;\ncout << (N);\n```',
      options: ['执行时如输入 `10`，则将输出 `10`', '执行时如输入 `3.14`，将报错', '执行时如输入 `ABC`，将报错', '执行时如输入 `-10`，将报错'],
      answer: 0,
      score: 2,
      explanation: '把整数 `10` 输入给整型变量 `N` 后会正常输出 `10`。',
      tags: [LEVEL1_TAGS.io],
    },
    {
      id: 7,
      type: 'single',
      question: '下面 C++ 代码执行时，其说法正确的是（ ）。\n```cpp\nint M = 0, N = 0;\ncin >> M;\ncin >> N;\nif (N > M)\n    cout << (N - M);\nelse\n    cout << (M - N);\n```',
      options: ['如果输入一个正数和一个负数，其输出结果肯定是大于 0', '不管是负整数、正整数亦或 0，其结果肯定是大于等于 0', '如果 `N` 和 `M` 是相等的整数，将不会有输出', '如果 `N` 和 `M` 输入带有小数点的数，将按整数部分计算'],
      answer: 1,
      score: 2,
      explanation: '这段程序输出的是两个整数之差的绝对值，因此结果总是大于等于 0。',
      tags: [LEVEL1_TAGS.condition, LEVEL1_TAGS.operator],
    },
    {
      id: 8,
      type: 'single',
      question: '下面 C++ 代码执行后的输出是（ ）。\n```cpp\nint i, tnt = 1;\nfor (i = 0; i < 5; i++)\n    tnt *= i;\nprintf(\"%2d%2d\\n\", tnt, i);\n```',
      options: ['24 5', '10 5', '0 4', '0 5'],
      answer: 3,
      score: 2,
      explanation: '`i=0` 时 `tnt*=0` 之后就一直为 0；循环结束时 `i=5`，因此输出 `0 5`。',
      tags: [LEVEL1_TAGS.loop],
    },
    {
      id: 9,
      type: 'single',
      question: '执行下面 C++ 代码段求序列 `-1+2+3-4+5+6-7+8+9-10+11+12...` 之前 `N` 项的值。下面说法中正确的是（ ）。\n```cpp\nint N, tnt, i;\ncout << \"请输入正整数：\";\ncin >> N;\ntnt = 0;\nfor (i = 1; i < N + 1; i++)  // L1\n    if (i % 3 == 1)          // L2\n        tnt += -i;\n    else\n        tnt += i;\ncout << tnt;\n```',
      options: [
        'L1 行中 `i < N + 1` 应该改为 `i < N` 才会符合预期',
        'L2 行中 `i % 3 == 1` 应修改为 `i % 3 == 0` 才会符合预期',
        'L2 行中 `i % 3 == 1` 修改为 `i % 3` 与当前程序效果相同',
        '当前代码能实现题目所描述计算目标',
      ],
      answer: 3,
      score: 2,
      explanation: '每三个数中第 1 个取负，其余两个取正，和题目给出的规律一致。',
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.operator],
    },
    {
      id: 10,
      type: 'single',
      question: '下面 C++ 代码的相关说法，正确的是（ ）。\n```cpp\nint i;\nfor (i = 1; i < 10; i++) {\n    if (i % 2 == 0) {\n        continue; // L1\n    } else {\n        cout << i << \"#\";\n    }\n}\ncout << i << \"END\";\n```',
      options: [
        '上述代码执行后，其输出是 `1#3#5#7#9#9END`',
        '删除 `else` 后的执行效果与当前代码相同',
        '删除 `else` 且将 `cout << i << \"#\"` 移入 L1 行下面，则执行效果与当前代码相同',
        '在 `cout << i << \"END\"` 前增加判断 `if(i > 10)`，其执行效果与当前代码相同',
      ],
      answer: 1,
      score: 2,
      explanation: '`continue` 会直接跳过偶数时后面的输出，因此删除 `else` 不影响奇数输出逻辑。',
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.condition],
    },
    {
      id: 11,
      type: 'single',
      question: '一个正整数的每位都是个位数，称为数位，最高位非 0。下面的 C++ 代码用于求正整数的所有数位之和。为实现该目标，横线处应该填写的代码是（ ）。\n```cpp\nint N;\ncin >> N;\nint tnt = 0;\nwhile (N != 0) {\n    ____________;\n    ____________;\n}\ncout << \"N 的数位和为：\" << tnt;\n```',
      options: ['tnt += N / 10;\nN /= 10;', 'tnt += N % 10;\nN /= 10;', 'tnt += N / 10;\nN %= 10;', 'tnt = tnt + N % 10;\nN %= 10;'],
      answer: 1,
      score: 2,
      explanation: '每次取个位 `N % 10` 加入和中，再用 `N /= 10` 去掉当前个位。',
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.operator],
    },
    {
      id: 12,
      type: 'single',
      question: '小明想要快速知道任给一个正整数中有多少个奇数位（数位值是奇数），下面的 C++ 代码是其实现，横线处应该填入的代码是（ ）。\n```cpp\nint N;\ncin >> N;\nint odd_count = 0;\nint old_number = N;\nwhile (N != 0) {\n    if (_________________)\n        odd_count += 1;\n    N = (N - N % 10) / 10;\n}\ncout << old_number << \" 中共有 \" << odd_count << \" 个奇数\";\n```',
      options: ['N % 10 % 2 == 0', 'N % 10 % 2 == 1', 'N / 10 / 2 == 1', 'N / 2 / 10 == 0'],
      answer: 1,
      score: 2,
      explanation: '个位数字是奇数等价于 `(N % 10) % 2 == 1`。',
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.condition],
    },
    {
      id: 13,
      type: 'single',
      question: '小明和弟弟在玩一个拼数字游戏。二人各写一个两位正整数 `M` 和 `N`；然后将较大的数字放在较小的前面，拼成一个 4 位数；将这个 4 位数除以 3 的余数添加到 4 位数后面，得到一个 5 位数；最后判断这个 5 位数能否被 14 整除。下面的 C++ 代码用于判断 `M` 和 `N` 是否符合全部要求。关于下面代码描述正确的是（ ）。\n```cpp\nint M, N, Q;\ncin >> M >> N;\nif (M > N)      // L1\n    Q = M * 100 + N;\nelse\n    Q = N * 100 + M;\nif ((Q * 10 + Q % 3) % 14 == 0) // L2\n    cout << \"Y\";\nelse\n    cout << \"N\";\n```',
      options: [
        '代码段不能完成正确判断',
        'L1 行代码中条件应该改为 `M <= N`',
        'L2 行代码应该改为 `if ((Q*10+Q/3) % 14 == 0)`',
        '代码段可以不使用变量 `Q`，而是在区分 `M` 和 `N` 大小后分别直接用它们来判断',
      ],
      answer: 3,
      score: 2,
      explanation: '当前代码本身可以正确判断；而变量 `Q` 只是中间量，也可以在分支里直接构造并判断。',
      tags: [LEVEL1_TAGS.condition, LEVEL1_TAGS.operator],
    },
    {
      id: 14,
      type: 'single',
      question: '执行下面 C++ 代码可以判断一个 6 位正整数 `N` 的高 3 位和低 3 位的差是否是 `314` 的倍数。例如 `628314` 就符合要求。横线处应该填入（ ）。\n```cpp\ncin >> N;\nif (___________________________)\n    cout << N << \" 符合条件\" << endl;\n```',
      options: [
        '((N % 1000) - (N / 1000)) / 314 == 0',
        '((N / 1000) - (N % 1000)) % 314 == 0',
        '((N % 1000) - (N / 1000)) / 314',
        '((N / 1000) - (N % 1000)) % 314',
      ],
      answer: 1,
      score: 2,
      explanation: '高 3 位为 `N / 1000`，低 3 位为 `N % 1000`，判断是否为 314 的倍数应用 `% 314 == 0`。',
      tags: [LEVEL1_TAGS.operator],
    },
    {
      id: 15,
      type: 'single',
      question: '如果 `N` 的所有奇数位的数位和等于所有偶数位的数位和，则称它是一个“双螺旋数”。例如 `12375` 的所有奇数位的数位和是 9，同时它的所有偶数位的数位和也是 9。下面的 C++ 代码用于判断输入的 `N` 是否为双螺旋数。空白处应该填入的代码是（ ）。\n```cpp\nint i, N, N1 = 0, N2 = 0, N0;\ncin >> N;\nN0 = N;\nwhile (N) {\n    _________________________\n    _________________________\n}\nif (N1 == N2)\n    cout << N0 << \" 是双螺旋数\" << endl;\n```',
      options: [
        'N1 += N % 10, N /= 10;\nN2 += N % 10, N /= 10;',
        'N1 += N / 10, N /= 10;\nN2 += N / 10, N /= 10;',
        'N1 += N % 10, N %= 10;\nN2 += N % 10, N %= 10;',
        'N1 += N / 10, N %= 10;\nN2 += N / 10, N %= 10;',
      ],
      answer: 0,
      score: 2,
      explanation: '要交替取个位累加到 `N1` 和 `N2`，每次都需要用 `N /= 10` 去掉已处理的最后一位。',
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.operator],
    },
    {
      id: 16,
      type: 'judge',
      question: '小明的妈妈最近刚刚给他买了一块电话手表，除了可以看时间，小明也可以用它和妈妈打电话、收发信息，那么可以推测这块手表中装有一款特定操作系统。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '电话手表具备多种软件和通信功能，通常需要操作系统支持。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics],
    },
    {
      id: 17,
      type: 'judge',
      question: 'C++ 表达式 `4 % 2` 和 `2 * 2 % 2` 的结果相同。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '`4 % 2 = 0`，`2 * 2 % 2 = 4 % 2 = 0`，两者相同。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.operator],
    },
    {
      id: 18,
      type: 'judge',
      question: '下面 C++ 代码段成功执行后将输出 `0`。\n```cpp\nfor (i = 1; i < 10; i++)\n    if (i % 3 == 0)\n        break;\ncout << i;\n```',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '循环会在 `i=3` 时跳出，最终输出 `3`，不是 `0`。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.loop],
    },
    {
      id: 19,
      type: 'judge',
      question: '下面能够正常执行的 C++ 代码段用于求 `1` 到 `N` 之和，`N` 为正整数。因为 `i < N + 1`，所以是 `1` 到 `N` 且包含 `N` 之和。\n```cpp\ntnt = 0;\ncout << \"请输入正整数：\";\ncin >> N;\ntotal = 0;\nfor (i = 1; i < N + 1; i++) ;\n    total += i;\ncout << total;\n```',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '`for` 后面多了一个分号，导致循环体为空，不能正确求和。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.loop],
    },
    {
      id: 20,
      type: 'judge',
      question: '执行下面的 C++ 代码段，其语句 `cout << (N)` 将被执行 0 次或无数次（即死循环）。\n```cpp\ncin >> N;\nwhile (N)\n    cout << (N);\n```',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '若输入 `0`，循环体执行 0 次；若输入非 0 且循环内不修改 `N`，就会无限输出。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.loop],
    },
    {
      id: 21,
      type: 'judge',
      question: '下面的 C++ 代码段的变量都是整型，它能用于判断输入的正整数是否为对称数。\n```cpp\ncout << \"请输入正整数:\";\ncin >> n;\nold_number = n;\nnew_number = 0;\nwhile (n != 0) {\n    new_number = new_number * 10 + n % 10;\n    n /= 10;\n}\nif (old_number == new_number)\n    cout << \"对称数\";\nelse\n    cout << \"非对称数\";\n```',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '这段程序通过反转数字后与原数比较，可以正确判断回文数。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.loop],
    },
    {
      id: 22,
      type: 'judge',
      question: '执行下面的 C++ 代码段，如果变量都为整型变量、输入为大于 0 的整数，则输出数值一定为 `-N` 的值。\n```cpp\ncin >> N;\ntotal = 0;\nfor (i = -N; i < N; i += 2)\n    total += i;\ncout << total;\n```',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '该等差数列从 `-N` 开始，每次加 2，到小于 `N` 为止，和恒为 `-N`。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.loop, LEVEL1_TAGS.operator],
    },
    {
      id: 23,
      type: 'judge',
      question: '执行 C++ 语句 `printf("%d\\n", 3.14)` 将报错。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '这属于格式与实参类型不匹配，通常会产生未定义行为，但不一定在编译期直接报错。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.io],
    },
    {
      id: 24,
      type: 'judge',
      question: '执行下面的 C++ 代码后将输出 `2500`。\n```cpp\nint cnt = 0;\nfor (int i = 1; i < 100; i++)\n    cnt += i++;\ncout << cnt;\n```',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '循环中每次相当于把奇数 `1,3,5,...,99` 加到 `cnt`，前 50 个奇数和为 `2500`。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.loop],
    },
    {
      id: 25,
      type: 'judge',
      question: '小明在测试 C++ 的 `printf` 功能时执行了 `printf("%-5d\\n", 314)`，则代码输出的结果是 `-5314`。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '`%-5d` 表示左对齐、宽度至少为 5，输出效果是 `314  `，不是 `-5314`。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.io],
    },
    {
      id: 26,
      type: 'programming',
      question: `
# 编程题


# 编程题


# 编程题


# 交朋友

交朋友

**题目描述**：Alice 班上共有 4 个小朋友，身高分别为 \\\\\\\\\\\\\\\`H1, H2, H3, H4\\\\\\\\\\\\\\\`，其中 Alice 的身高为 \\\\\\\\\\\\\\\`H1\\\\\\\\\\\\\\\`。Alice 想要和身高最接近她的人交朋友，如果有多个人符合条件，则 Alice 想和其中较矮的那一人做朋友。请输出这个人的身高。

**输入格式**：输入共 4 行，第 \\\\\\\\\\\\\\\`i\\\\\\\\\\\\\\\` 行包含一个整数 \\\\\\\\\\\\\\\`Hi\\\\\\\\\\\\\\\`，表示班上小朋友的身高。

**输出格式**：输出 1 行，包含一个整数，表示 Alice 想交的朋友的身高。

**样例输入**：
\\\\\\\\\\\\\\\`\\\\\\\\\\\\\\\`\\\\\\\\\\\\\\\`text
150
165
135
133
\\\\\\\\\\\\\\\`\\\\\\\\\\\\\\\`\\\\\\\\\\\\\\\`

**样例输出**：
\\\\\\\\\\\\\\\`\\\\\\\\\\\\\\\`\\\\\\\\\\\\\\\`text
135
\\\\\\\\\\\\\\\`\\\\\\\\\\\\\\\`\\\\\\\\\\\\\\\`

**样例解释**：Alice 身高为 150，第 2、3 个小朋友与 Alice 身高差距同为 15，取其中较矮的 135。

**数据范围**：保证 \\\\\\\\\\\\\\\`100 <= Hi <= 199\\\\\\\\\\\\\\\` 且 \\\\\\\\\\\\\\\`Hi\\\\\\\\\\\\\\\` 互不相同。
`,
      score: 25,
      answer: '',
      explanation: '依次比较 `H2`、`H3`、`H4` 与 `H1` 的距离，记录最小距离；如果距离相同，则保留更矮的那个。',
      template: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int H1, H2, H3, H4;\n    cin >> H1 >> H2 >> H3 >> H4;\n    // 在此填写代码\n    return 0;\n}',
      referenceCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int H1, H2, H3, H4;\n    cin >> H1 >> H2 >> H3 >> H4;\n\n    int ans = H2;\n    int d = H1 - H2;\n    if (d < 0) d = -d;\n    int mnd = d;\n\n    d = H1 - H3;\n    if (d < 0) d = -d;\n    if (d < mnd || (d == mnd && H3 < ans)) {\n        ans = H3;\n        mnd = d;\n    }\n\n    d = H1 - H4;\n    if (d < 0) d = -d;\n    if (d < mnd || (d == mnd && H4 < ans)) {\n        ans = H4;\n    }\n\n    cout << ans << endl;\n    return 0;\n}',
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.condition],
      problemNumber: 'B4495',
    },
    {
      id: 27,
      type: 'programming',
      question: `
# 编程题


# 编程题


# 编程题


# 数字替换

数字替换

**题目描述**：Alice 不喜欢数字 \\\\\\\\\\\\\\\`4\\\\\\\\\\\\\\\`，但觉得数字 \\\\\\\\\\\\\\\`8\\\\\\\\\\\\\\\` 寓意好。她想把整数 \\\\\\\\\\\\\\\`A\\\\\\\\\\\\\\\` 中的全部数字 \\\\\\\\\\\\\\\`4\\\\\\\\\\\\\\\` 都替换成 \\\\\\\\\\\\\\\`8\\\\\\\\\\\\\\\`，若数中不含 \\\\\\\\\\\\\\\`4\\\\\\\\\\\\\\\` 则无需修改。

**输入格式**：输入一行，包含一个整数 \\\\\\\\\\\\\\\`A\\\\\\\\\\\\\\\`，表示替换前的数。

**输出格式**：输出一行，包含一个整数 \\\\\\\\\\\\\\\`B\\\\\\\\\\\\\\\`，表示替换后的数。

**样例输入 #1**：
\\\\\\\\\\\\\\\`\\\\\\\\\\\\\\\`\\\\\\\\\\\\\\\`text
8459045
\\\\\\\\\\\\\\\`\\\\\\\\\\\\\\\`\\\\\\\\\\\\\\\`

**样例输出 #1**：
\\\\\\\\\\\\\\\`\\\\\\\\\\\\\\\`\\\\\\\\\\\\\\\`text
8859085
\\\\\\\\\\\\\\\`\\\\\\\\\\\\\\\`\\\\\\\\\\\\\\\`

**样例输入 #2**：
\\\\\\\\\\\\\\\`\\\\\\\\\\\\\\\`\\\\\\\\\\\\\\\`text
123
\\\\\\\\\\\\\\\`\\\\\\\\\\\\\\\`\\\\\\\\\\\\\\\`

**样例输出 #2**：
\\\\\\\\\\\\\\\`\\\\\\\\\\\\\\\`\\\\\\\\\\\\\\\`text
123
\\\\\\\\\\\\\\\`\\\\\\\\\\\\\\\`\\\\\\\\\\\\\\\`

**样例解释**：样例 1 中有两个 \\\\\\\\\\\\\\\`4\\\\\\\\\\\\\\\`，都替换为 \\\\\\\\\\\\\\\`8\\\\\\\\\\\\\\\`；样例 2 不含 \\\\\\\\\\\\\\\`4\\\\\\\\\\\\\\\`，因此保持不变。

**数据范围**：\\\\\\\\\\\\\\\`0 <= A <= 10^8\\\\\\\\\\\\\\\`。
`,
      score: 25,
      answer: '',
      explanation: '从最低位开始逐位处理原数：遇到 `4` 时改写为 `8`，其余数字保持不变，再按原位权重还原结果。',
      template: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a;\n    cin >> a;\n    // 在此填写代码\n    return 0;\n}',
      referenceCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b = 0, t = 1;\n    cin >> a;\n    while (a) {\n        if (a % 10 == 4)\n            b += t * 8;\n        else\n            b += t * (a % 10);\n        a /= 10;\n        t *= 10;\n    }\n    cout << b;\n    return 0;\n}',
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.loop],
      problemNumber: 'B4496',
    },
  ],
};
