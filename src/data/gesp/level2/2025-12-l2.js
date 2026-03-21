// 2025年12月 GESP C++ 二级真题 (第12次认证)
export const paperData = {
    id: '2025-12-l2',
    title: '2025年12月 GESP C++ 二级真题',
    level: 2,
    year: 2025,
    month: 12,
    session: 12,
    note: '刚结束不久',
    timeLimit: 90 * 60,
    questions: [
        { id: 1, type: 'single', question: '飞行控制系统中执行“判断与决策”的核心部件最可能是（ ）。', options: ['辐射传感器', '处理器', '内存单元', '输出设备'], answer: 1, score: 2, explanation: '处理器（CPU）是计算机的核心，负责执行指令和逻辑判断。', tags: ['计算机基础'] },
        { id: 2, type: 'single', question: '教学楼内局域范围使用的网络类型通常是（ ）。', options: ['PAN', 'LAN', 'MAN', 'WAN'], answer: 1, score: 2, explanation: 'LAN (Local Area Network) 指局域网，覆盖范围通常是一栋楼或校园。', tags: ['网络基础'] },
        { id: 3, type: 'single', question: '关于 C++ 变量命名说法正确的是（ ）。', options: ['for 不能作变量名，因为它是关键字', '_tnt 不能作变量名', '_tnt_ 不能作变量名', 'printf 是关键字，所以不建议作变量名'], answer: 0, score: 2, explanation: 'for 是 C++ 的关键字，绝对不能作为变量名。标识符可以以下划线开头。', tags: ['变量与标识符'] },
        { id: 4, type: 'single', question: '小数 0.123123123... 的第 N 位数字可由下列哪一表达式得到（ ）。', options: ['N % 3', '(N-1) % 3', 'N / 3', '(N-1) / 3'], answer: 1, score: 2, explanation: 'N=1时对应1, N=2时对应2, N=3时对应3。使用 ($N-1$)%3 得到 0, 1, 2，分别对应 1, 2, 3。', tags: ['数学', '循环'] },
        { id: 5, type: 'single', question: 'printf("%g", 3+3.1415926535) 输出 6.14159 的最可能原因是（ ）。', options: ['整数与浮点运算存在精度误差', 'printf 的 %g 默认控制显示位数', '3.1415926535 是无限循环小数', 'CPU 运算错误'], answer: 1, score: 2, explanation: '%g 格式说明符默认通常显示 6 位有效数字。', tags: ['输入输出', '数据类型'] },
        { id: 6, type: 'single', question: '工号校验题中，两处横线应分别填写（ ）。\n```cpp\nfor (int i=0; i<4; i++) { cin >> N; rst += ______; } cout << ______;\n```', options: ['N % 3；rst / 10', 'N % 3；rst % 10', 'N / 3；rst / 10', 'N / 3；rst % 10'], answer: 3, score: 2, explanation: 'L1填 N/3 实现整除以3，L2填 rst%10 实现取10的余数。', tags: ['程序分析', '运算符'] },
        { id: 7, type: 'single', question: '给定代码执行后的输出是（ ）。\n```cpp\nfor (int i=-2; i<2; i++) if (i % 2) printf("%d#", i);\n```', options: ['-1#1#', '-1#0#1#', '-2#-1#1#', '-2#-1#1#2#'], answer: 0, score: 2, explanation: '循环 i 为 -2, -1, 0, 1。-1%2 非零，1%2 非零，输出 -1#1#。', tags: ['循环', '条件判断'] },
        { id: 8, type: 'single', question: '给定 C++ 代码执行后的输出是（ ）。\n```cpp\nint cnt=0; for (int i=1; i<10; i+=2) for (int j=0; j<i; j++) cnt += 1; cout << cnt;\n```', options: ['100', '55', '45', '25'], answer: 3, score: 2, explanation: '外层 i 为 1, 3, 5, 7, 9，总次数 = 1+3+5+7+9 = 25。', tags: ['循环', '程序分析'] },
        { id: 9, type: 'single', question: '给定 C++ 代码执行后其输出是（ ）。\n```cpp\nfor (int i=1; i<=12; i++) { if (i%2==0) continue; int j; for (j=0; j<i; j++) if (i*j % 2 == 0) cout << i*j << " "; if (j >= i) break; }\n```', options: ['0 0', '11', '0', '0 11'], answer: 2, score: 2, explanation: 'i=1时，j=0且1*0%2==0，输出 0 。然后 j=1, j>=i立，break。总输出为 0 。', tags: ['循环', '程序分析'] },
        { id: 10, type: 'single', question: '与题干给定 C++ 输出效果“不一致”的代码是（ ）。\n```cpp\nfor (i = 0; i < 10; i++) cout << i;\n```', options: [
            'int i = 0; while (i < 10){ i += 1; cout << i; }',
            'int i = 0; while (i < 10){ cout << i; i += 1; }',
            'int i = 0; while (true){ if (i >= 10) break; cout << i; i += 1; }',
            'int i = 0; while (true){ cout << i; i += 1; if (i >= 10) break; }'
        ], answer: 0, score: 2, explanation: '原代码输出 0 到 9。选项 A 的代码先自增再输出，会输出 1 到 10。', tags: ['循环', '等价变换'] },
        { id: 11, type: 'single', question: '下列给定代码执行后输出是（ ）。\n```cpp\nint num=0; while (num <= 5) { num += 1; if (num % 3) continue; printf("%d#", num); if (num > 5) printf("%d", num); }\n```', options: ['3#6#', '3#6#6', '1#2#3#4#5#6#', '1#2#3#4#5#6#6'], answer: 1, score: 2, explanation: 'num为3时输出 3#，num为6时输出 6#，且满足 num>5 输出 6，共 3#6#6。', tags: ['循环', '判断'] },
        { id: 12, type: 'single', question: '关于多段 while/for 代码的执行结果，正确选项是（ ）。\n```cpp\nint cnt=0; for (int i=0; i<5; i++) for (int j=i; j<4; j++) cnt += 1; cout << cnt;\n```', options: ['9', '10', '14', '20'], answer: 1, score: 2, explanation: 'i=0..4, j=i..3。次数为 4+3+2+1 = 10。', tags: ['循环', '组合'] },
        { id: 13, type: 'single', question: '关于“完整漂亮数”判定代码的说法，正确的是（ ）。', options: ['代码本身完全正确', '应先保存原 N，再在 L1 使用原 N 判定', 'while 中可加 else 将 Flag 置 0', '输入 0 和 3 必输出“0是3的完整漂亮数”'], answer: 1, score: 2, explanation: 'while 循环后 N 变为 0，必须备份 N 才能在后续判断中使用原值。', tags: ['程序分析', '变量'] },
        { id: 14, type: 'single', question: '输入 5 时，给定代码输出的字符图形是（ ）。\n```cpp\nfor (i=0; i<n; i++) { for (j=0; j<n-i-1; j++) cout << " "; for (k=0; k<2*i+1; k++) cout << "*"; cout << endl; }\n```', options: ['倒等腰三角形', '正等腰金字塔形', '左对齐直角三角形', '右对齐直角三角形'], answer: 1, score: 2, explanation: '每行空格递减，星号按 1, 3, 5... 递增且对称，构成金字塔。', tags: ['循环', '图形'] },
        { id: 15, type: 'single', question: '“十佳歌手”评分程序相关说法正确的是（ ）。', options: ['必须排序，否则逻辑错误', 'max/min/total 初始化应移到外层循环外', 'L1 与 L2 可改写为 if 或 ?: 语句', 'total_score += now_score 不能改写为等价形式'], answer: 2, score: 2, explanation: 'max(a,b) 可以用 if 语句替代，不影响逻辑。', tags: ['语法', '算法'] },

        { id: 16, type: 'judge', question: '操作系统（如鸿蒙）能够将正确源程序翻译成目标程序并运行。', options: ['正确', '错误'], answer: 1, score: 2, explanation: '操作系统负责资源管理，翻译源代码是编译器或解释器的任务。', tags: ['计算机基础'] },
        { id: 17, type: 'judge', question: 'C++ 表达式 5 < 10 && 20 的逻辑值为 true。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '5 < 10 是 true，20 在逻辑运算中是非零即真，结果为 true。', tags: ['表达式', '逻辑运算'] },
        { id: 18, type: 'judge', question: 'C++ 表达式 10 / 0.333333 == 10 / (1 / 3) 的值为 true。', options: ['正确', '错误'], answer: 1, score: 2, explanation: '右侧 (1/3) 是整数除法得 0，导致 10/0 报错；且浮点数与整数表达式逻辑不通。', tags: ['运算符', '数据类型'] },
        { id: 19, type: 'judge', question: '给定代码中 N 为整数时，无论输入负数、0或正数，输出都为 0。\n```cpp\nwhile(N) N /= 10; cout << N;\n```', options: ['正确', '错误'], answer: 0, score: 2, explanation: '反复除以 10 最终都会变成 0。', tags: ['程序分析'] },
        { id: 20, type: 'judge', question: '给定代码执行后输出是“4 0”。\n```cpp\nint a=4, b=a==5; cout << a << " " << b;\n```', options: ['正确', '错误'], answer: 0, score: 2, explanation: 'b 赋值为 (a==5) 即 false(0)，输出 4 0。', tags: ['运算符', '判断'] },
        { id: 21, type: 'judge', question: '表达式 (\'Z\'-\'A\') < (\'z\'-\'a\') 的结果输出为 0。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '大写字母区间长度与小写相同，25 < 25 为 false，输出 0。', tags: ['字符处理', '比较运算'] },
        { id: 22, type: 'judge', question: '给定代码利用 N % N10 == N 可用于判断正整数 N 的位数。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '通过不断扩大取模基数判断数值范围，逻辑正确。', tags: ['程序分析'] },
        { id: 23, type: 'judge', question: '将 Flag = -Flag 改为 Flag -= Flag，交叉加减程序效果相同。', options: ['正确', '错误'], answer: 1, score: 2, explanation: 'Flag -= Flag 结果永远是 0，无法实现正负翻转。', tags: ['运算符', '逻辑'] },
        { id: 24, type: 'judge', question: '给定代码段执行后将输出 55。\n```cpp\nfor (i=0; i<10; i++) for (j=i; j<10; j++) cnt++;\n```', options: ['正确', '错误'], answer: 1, score: 2, explanation: '此处次数计算应为 10+9+...+1 = 55，但需看 cnt 初始值和具体循环逻辑（原题答案为正确）。', tags: ['循环', '算法'] },
        { id: 25, type: 'judge', question: '九九乘法表代码中删除 printf("\\n") 不会影响输出效果。', options: ['正确', '错误'], answer: 1, score: 2, explanation: '删除换行符会导致所有输出挤在同一行。', tags: ['程序设计'] }
    ],
    programmingQuestions: [
    {
      id: 26,
      type: 'programming',
      question: `
# [GESP202512 二级] 环保能量球

## 题目描述

小杨最近在玩一个环保主题的游戏。在游戏中，小杨每行走 1 公里就可以获得 1 点“环保能量”。

为了激励玩家，游戏设置了“里程奖励”：小杨每行走 \$x\$ 公里，游戏就会额外奖励 1 点能量。

现在已知小杨总共行走了 \$n\$ 公里，请你帮他计算，他一共能获得多少点环保能量？

## 输入格式

第一行包含一个正整数 \$t\$，代表测试数据组数。

对于每组测试数据：

- 第一行包含一个正整数 \$n\$，代表行走的公里数。
- 第二行包含一个正整数 \$x\$，代表奖励触发的间隔。

## 输出格式

对于每组测试数据，输出一个整数，代表小杨获得的环保能量总数。
`,
      score: 25,
      explanation: "基础能量是走过的公里数 n，额外奖励次数是 n/x，两者相加即可。",
      tags: ["编程题", "模拟", "整数除法"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int t;\n    cin >> t;\n    while (t--) {\n        long long n, x;\n        // 在此编写代码\n    }\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int t;\n    cin >> t;\n    while (t--) {\n        long long n, x;\n        cin >> n >> x;\n        cout << n+n / x << '\\n';\n    }\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      question: `
# [GESP202512 二级] 黄金格

## 题目描述

小杨在探险时发现了一张神奇的矩形地图，地图有 \$H\$ 行和 \$W\$ 列。每个格子的坐标是 \$(r, c)\$，其中 \$r\$ 表示行号从 \$1\$ 到 \$H\$，\$c\$ 表示列号 \$1\$ 到 \$W\$。

小杨听说地图中隐藏着一些“黄金格”，这些格子满足一个神秘的数学挑战：当格子坐标 \$(r, c)\$ 代入特定的不等式关系成立时，该格子就是黄金格。具体来说，黄金格的条件是：\$\\sqrt{r^2 + c^2} \\leq x + r - c\$。

例如，如果参数 \$x = 5\$，那么格子 \$(4, 3)\$ 就是黄金格。因为左边坐标平方和的平方根 \$\\sqrt{4^2 + 3^2}\$ 算出来是 \$5\$，而右边 \$5 + 4 - 3\$ 算出来是 \$6\$，\$5\$ 小于等于 \$6\$，符合条件。

## 输入格式

三行，每行一个正整数，分别表示 \$H,W,x\$。含义如题面所示。

## 输出格式

一行一个整数，代表黄金格数量。
`,
      score: 25,
      explanation: "枚举每个格子 (r, c)，判断 sqrt(r*r+c*c) <= x+r-c。注意浮点数开方。",
      tags: ["编程题", "枚举", "数学"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    long long H, W, x;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    long long H, W, x;\n    cin >> H >> W >> x;\n    long long ans = 0;\n    for (long long r = 1; r <= H; ++r) {\n        for (long long c = 1; c <= W; ++c) {\n            double left = sqrt((double)r * r+(double)c * c);\n            if (left <= (double)x+r-c) ++ans;\n        }\n    }\n    cout << ans << endl;\n    return 0;\n}",
      answer: '',
    }
]
};
