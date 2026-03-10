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
        { id: 1, type: 'single', question: '飞行控制系统中执行“判断与决策”的核心部件最可能是（ ）。', options: ['辐射传感器', '处理器', '内存单元', '输出设备'], answer: 1, score: 2, explanation: '官方答案 B。', tags: ['基础语法'] },
        { id: 2, type: 'single', question: '教学楼内局域范围使用的网络类型通常是（ ）。', options: ['PAN', 'LAN', 'MAN', 'WAN'], answer: 1, score: 2, explanation: '官方答案 B。', tags: ['基础语法'] },
        { id: 3, type: 'single', question: '关于 C++ 变量命名说法正确的是（ ）。', options: ['for 不能作变量名，因为它是关键字', '_tnt 不能作变量名', '_tnt_ 不能作变量名', 'printf 是关键字，所以不建议作变量名'], answer: 0, score: 2, explanation: '官方答案 A。', tags: ['变量与标识符'] },
        { id: 4, type: 'single', question: '小数 0.123123123... 的第 N 位数字可由下列哪一表达式得到（ ）。', options: ['N % 3', '(N - 1) % 3', 'N / 3', '(N - 1) / 3'], answer: 1, score: 2, explanation: '官方答案 B。', tags: ['循环', '程序分析'] },
        { id: 5, type: 'single', question: 'printf("%g", 3 + 3.1415926535) 输出 6.14159 的最可能原因是（ ）。', options: ['整数与浮点运算存在精度误差', 'printf 的 %g 默认控制显示位数', '3.1415926535 是无限循环小数', 'CPU 运算错误'], answer: 1, score: 2, explanation: '官方答案 B。', tags: ['输入输出', '运算符', '程序分析'] },
        { id: 6, type: 'single', question: '工号校验题中，两处横线应分别填写（ ）。', options: ['N % 3；rst / 10', 'N % 3；rst % 10', 'N / 3；rst / 10', 'N / 3；rst % 10'], answer: 3, score: 2, explanation: '官方答案 D。', tags: ['输入输出', '运算符', '程序分析'] },
        { id: 7, type: 'single', question: '给定代码执行后的输出是（ ）。', options: ['-1#1#', '-1#0#1#', '-2#-1#1#', '-2#-1#1#2#'], answer: 0, score: 2, explanation: '官方答案 A。', tags: ['循环', '条件判断', '输入输出'] },
        { id: 8, type: 'single', question: '给定 C++ 代码执行后的输出是（ ）。', options: ['100', '55', '45', '25'], answer: 3, score: 2, explanation: '官方答案 D。', tags: ['输入输出', '程序分析'] },
        { id: 9, type: 'single', question: '给定 C++ 代码执行后其输出是（ ）。', options: ['0 0', '11', '0', '0 11'], answer: 2, score: 2, explanation: '官方答案 C。', tags: ['输入输出', '程序分析'] },
        { id: 10, type: 'single', question: '与题干给定 C++ 输出效果“不一致”的代码是（ ）。', options: ['选项A（原卷）', '选项B（原卷）', '选项C（原卷）', '选项D（原卷）'], answer: 1, score: 2, explanation: '官方答案 B。', tags: ['循环', '条件判断', '输入输出'] },
        { id: 11, type: 'single', question: '下列给定代码执行后输出是（ ）。', options: ['3#6#', '3#6#6', '1#2#3#4#5#6#', '1#2#3#4#5#6#6'], answer: 1, score: 2, explanation: '官方答案 B。', tags: ['输入输出', '程序分析'] },
        { id: 12, type: 'single', question: '关于多段 while/for 代码的执行结果，正确选项是（ ）。', options: ['9', '10', '14', '20'], answer: 1, score: 2, explanation: '官方答案 B。', tags: ['循环', '条件判断', '输入输出'] },
        { id: 13, type: 'single', question: '关于“完整漂亮数”判定代码的说法，正确的是（ ）。', options: ['代码本身完全正确', '应先保存原 N，再在 L1 使用原 N 判定', 'while 中可加 else 将 Flag 置 0', '输入 0 和 3 必输出“0是3的完整漂亮数”'], answer: 1, score: 2, explanation: '官方答案 B。', tags: ['条件判断', '输入输出', '运算符'] },
        { id: 14, type: 'single', question: '输入 5 时，给定代码输出的字符图形是（ ）。', options: ['倒三角（原卷A）', '正金字塔（原卷B）', '左对齐三角（原卷C）', '右对齐三角（原卷D）'], answer: 1, score: 2, explanation: '官方答案 B。', tags: ['输入输出', '程序分析'] },
        { id: 15, type: 'single', question: '“十佳歌手”评分程序相关说法正确的是（ ）。', options: ['必须排序，否则逻辑错误', 'max/min/total 初始化应移到外层循环外', 'L1 与 L2 可改写为 if 或 ?: 语句', 'total_score += now_score 不能改写为等价形式'], answer: 2, score: 2, explanation: '官方答案 C。', tags: ['基础语法'] },

        { id: 16, type: 'judge', question: '操作系统（如鸿蒙）能够将正确源程序翻译成目标程序并运行。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '判断题答案依据官方答案。', tags: ['判断题'] },
        { id: 17, type: 'judge', question: 'C++ 表达式 5 < 10 && 20 的逻辑值为 true。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '判断题答案依据官方答案。', tags: ['判断题', '循环', '条件判断'] },
        { id: 18, type: 'judge', question: 'C++ 表达式 10 / 0.333333 == 10 / (1 / 3) 的值为 true。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '判断题答案依据官方答案。', tags: ['判断题'] },
        { id: 19, type: 'judge', question: '给定代码中 N 为整数时，无论输入负数、0或正数，输出都为 0。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '判断题答案依据官方答案。', tags: ['判断题', '输入输出', '程序分析'] },
        { id: 20, type: 'judge', question: '给定代码执行后输出是“4 0”。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '判断题答案依据官方答案。', tags: ['判断题', '输入输出', '程序分析'] },
        { id: 21, type: 'judge', question: '表达式 (\'Z\'-\'A\') < (\'z\'-\'A\') 的结果输出为 0。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '判断题答案依据官方答案。', tags: ['判断题', '输入输出', '程序分析'] },
        { id: 22, type: 'judge', question: '给定代码可用于判断正整数 N 的位数。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '判断题答案依据官方答案。', tags: ['判断题', '程序分析'] },
        { id: 23, type: 'judge', question: '将 Flag = -Flag 改为 Flag -= Flag，交叉加减程序效果相同。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '判断题答案依据官方答案。', tags: ['判断题', '变量与标识符', '程序分析'] },
        { id: 24, type: 'judge', question: '给定代码段执行后将输出 55。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '判断题答案依据官方答案。', tags: ['判断题', '输入输出', '程序分析'] },
        { id: 25, type: 'judge', question: '九九乘法表代码中删除 printf("\\n") 不会影响输出效果。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '判断题答案依据官方答案。', tags: ['判断题'] }
    ],
    programmingQuestions: [
    {
        "id": 26,
        "type": "programming",
        "title": "环保能量球",
        "problemNumber": "B4447",
        "description": "小杨最近在玩一个环保主题的游戏。在游戏中，小杨每行走 1 公里就可以获得 1 点“环保能量”。 为了激励玩家，游戏设置了“里程奖励”：小杨每行走 x 公里，游戏就会额外奖励 1 点能量。 现在已知小杨总共行走了 n 公里，请你帮他计算，他一共能获得多少点环保能量？",
        "inputDescription": "第一行包含一个正整数 t，代表测试数据组数。 对于每组测试数据： - 第一行包含一个正整数 n，代表行走的公里数。 - 第二行包含一个正整数 x，代表奖励触发的间隔。",
        "outputDescription": "对于每组测试数据，输出一个整数，代表小杨获得的环保能量总数。",
        "samples": [
            {
                "input": "2\n10\n3\n8\n5",
                "output": "13\n9"
            }
        ],
        "explanation": "基础能量是走过的公里数 n，额外奖励次数是 floor(n/x)，两者相加即可。",
        "tags": [
            "编程题",
            "模拟",
            "整数除法"
        ],
        "template": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int t;\n    cin >> t;\n    while (t--) {\n        long long n, x;\n        cin >> n >> x;\n        cout << n + n / x << '\\n';\n    }\n    return 0;\n}"
    },
    {
        "id": 27,
        "type": "programming",
        "title": "黄金格",
        "problemNumber": "B4448",
        "description": "小杨在探险时发现了一张神奇的矩形地图，地图有 H 行和 W 列。每个格子的坐标是 (r, c)，其中 r 表示行号从 1 到 H，c 表示列号 1 到 W。 小杨听说地图中隐藏着一些“黄金格”，这些格子满足一个神秘的数学挑战：当格子坐标 (r, c) 代入特定的不等式关系成立时，该格子就是黄金格。具体来说，黄金格的条件是：\\sqrt{r^2 + c^2} ≤ x + r - c。 例如，如果参数 x = 5，那么格子 (4, 3) 就是黄金格。因为左边坐标平方和的平方根 \\sqrt{4^2 + 3^2} 算出来是 5，而右边 5 + 4 - 3 算出来是 6，5 小于等于 6，符合条件。",
        "inputDescription": "三行，每行一个正整数，分别表示 H,W,x。含义如题面所示。",
        "outputDescription": "一行一个整数，代表黄金格数量。",
        "samples": [
            {
                "input": "4\n5\n5",
                "output": "17"
            }
        ],
        "explanation": "不等式两边都非负，可平方化简：r^2+c^2 <= (x+r-c)^2。随后在 1..H、1..W 中枚举每个格子并统计满足条件的数量。",
        "tags": [
            "编程题",
            "枚举",
            "数学"
        ],
        "template": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long H, W, x;\n    cin >> H >> W >> x;\n    long long ans = 0;\n    for (long long r = 1; r <= H; ++r) {\n        for (long long c = 1; c <= W; ++c) {\n            long long left = r * r + c * c;\n            long long right = x + r - c;\n            if (right >= 0 && left <= right * right) ++ans;\n        }\n    }\n    cout << ans << '\\n';\n    return 0;\n}"
    }
]
};
