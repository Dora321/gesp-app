// 2025年9月 GESP C++ 二级真题 (第11次认证)
export const paperData = {
    id: '2025-09-l2',
    title: '2025年9月 GESP C++ 二级真题',
    level: 2,
    year: 2025,
    month: 9,
    session: 11,
    timeLimit: 90 * 60,
    questions: [
        { id: 1, type: 'single', question: '人工智能现在非常火，小杨就想多了解一下，其中就经常听人提到“大模型”。那么请问这里说的“大模型”最贴切是指（ ）。', options: ['大电脑模型', '大规模智能', '智能的单位', '大语言模型'], answer: 3, score: 2, explanation: '大模型通常指大语言模型（LLM）。', tags: ['计算机基础'] },
        { id: 2, type: 'single', question: '在 TCP 协议中，完成连接建立需要通过（ ）握手。', options: ['一次', '二次', '三次', '四次'], answer: 2, score: 2, explanation: 'TCP 建立连接需要三次握手。', tags: ['网络基础'] },
        { id: 3, type: 'single', question: '下面的 C++ 代码用于输入姓名，然后输出姓名，正确的说法是（ ）。\nstring XingMing; cout << "请输入您的姓名："; cin >> XingMing; cout << XingMing;', options: ['XingMing 是汉语拼音，不能作为变量名称', '可以将 XingMing 改为 Xing Ming', '可以将 XingMing 改为 xingming', '可以将 XingMing 改为 Xing-Ming'], answer: 2, score: 2, explanation: '变量名不能包含空格或减号，汉语拼音可以作为变量名，但建议小写。', tags: ['变量命名'] },
        { id: 4, type: 'single', question: '下面 C++ 代码用于获得正整数 N 的第 M 位数，横线处应填入的代码是（ ）。\n```cpp\nfor (int i = 0; i < (M-1); i++) div *= 10;\ncout << (______________);\n```', options: ['N % div / 10', 'N / div / 10', 'N % div % 10', 'N / div % 10'], answer: 3, score: 2, explanation: '先通过除以 div 将目标位移到个位，再对 10 取模。', tags: ['程序分析'] },
        { id: 5, type: 'single', question: '下面 C++ 代码执行，其输出是（ ）。\na, b = 3, 4;\nc = a == b;\n```cpp\ncout << a << \' \' << b << \' \' << c;', options: ['3 4 0', '3 3 3', '4 4 4', '以上都不对'], answer: 3, score: 2, explanation: 'a, b = 3, 4 是逗号表达式，a 没有被赋值为 3，b 为 4，a 的值取决于之前的状态。', tags: ['表达式'] },
        { id: 6, type: 'single', question: '生成第 N 个编号（规则：XX-Y，XX从00到11，Y从0到9）的代码横线处应填：\npart1 = N % _____;\npart2 = N % _____;', options: ['12 10', '10 10', '11 9', '9 9'], answer: 0, score: 2, explanation: 'XX 有 12 种可能，Y 有 10 种可能，分别对 12 和 10 取模。', tags: ['算术运算'] },
        { id: 7, type: 'single', question: '下面代码执行后其输出是（ ）。\ncnt = 0; for (int i = -10; i < 10; i++) for (int j = 0; j < i; j++) cnt += 1; cout << cnt;', options: ['145', '125', '55', '45'], answer: 3, score: 2, explanation: 'j < i 只在 i > 0 时成立。次数为 1+2+3+...+9 = 45。', tags: ['循环'] },
        { id: 8, type: 'single', question: '下面代码执行后其输出是（ ）。\n```cpp\nfor (i = 1; i < 12; i++){ if (i % 2 == 0) continue; for (j = 0; j < i; j++) if (i * j % 2) break; }\nif(i >= 12) cout << (i * j);\n```', options: ['110', '12', '不确定', '无输出'], answer: 1, score: 2, explanation: '循环结束时 i=12。最后一次内循环 i=11 时，j 增加到满足 break 或循环结束。分析得 j=1。输出 12×1 = 12。', tags: ['程序分析'] },
        { id: 9, type: 'single', question: '阅读代码，说法正确的是（ ）。\n```cpp\nwhile (b != 0){ remainder = a % b; a = b; b = remainder; }\n```', options: ['b 不能为 0', 'a 必须小于 b', 'a 和 b 必须为正整数', '如果 a 输入为 0，则输出值的绝对值都是 abs(b)'], answer: 3, score: 2, explanation: '这是辗转相除法求最大公约数。', tags: ['算法'] },
        { id: 10, type: 'single', question: '下面 C++ 代码执行后输出是（ ）。\nnum = 0; while (num <= 5){ num += 1; if (num == 3) continue; printf("%d#", num); }', options: ['1#2#4#5#6#', '1#2#4#5#6', '1#2#3#4#5#6#', '1#2#3#4#5#6'], answer: 0, score: 2, explanation: 'num 增加到 6，跳过 3。输出 1#2#4#5#6#。', tags: ['循环'] },
        { id: 11, type: 'single', question: '下面记录最大数和最小数（输入-999结束）的代码，说法“错误”的是（ ）。', options: ['输入第一个数为-999时，输出-999 -999', '若不输入-999，程序能求最大最小值', '输入成绩时能求最高最低分', '可以将输入语句移到循环内第一行而不改变结果'], answer: 3, score: 2, explanation: '改变输入位置会影响 now_num 的判定逻辑。', tags: ['程序分析'] },
        { id: 12, type: 'single', question: '下面输出“与 5 有关数”数量的代码，说法正确的是（ ）。', options: ['删除 continue 不影响结果', '删除 j = i 不影响结果', '将 break 改为 j = 0 不影响结果', '将 j > 0 改为 j >= 0 不影响结果'], answer: 2, score: 2, explanation: 'j = 0 会使 while 循环终止，效果等同于 break。', tags: ['程序分析'] },
        { id: 13, type: 'single', question: '输出数字三角形图形，横线处应填入的代码是（ ）。', options: ['N-i+1 和 i+1', 'N-i 和 i', 'N 和 i', 'N-i 和 i+1'], answer: 0, score: 2, explanation: '根据三角形空格和数字的排布逻辑确定。', tags: ['循环'] },
        { id: 14, type: 'single', question: '下面 C++ 代码执行，其输出是（ ）。\n```cpp\nint a=9, b=27; \na = \'a\'+\'b\'; \nb = \'a\'-\'b\'; \na = a-b; \ncout << a << \' \' << b;\n```', options: ['196 -1', '27 9', '98 97', '不确定'], answer: 0, score: 2, explanation: '\'a\'=97, \'b\'=98。a=195, b=-1, a=195-(-1)=196。', tags: ['字符运算'] },
        { id: 15, type: 'single', question: '有关环链重量计算的代码实现，正确说法是（ ）。', options: ['须修改 L1 和 L2', '须修改 L3 和 L4', '须修改 L3 和 L5', '其他说法都不对'], answer: 3, score: 2, explanation: '该题考察对循环计数和余数处理的理解。', tags: ['程序分析'] },

        { id: 16, type: 'judge', question: '在 IDE 中调试时，要注意不能修改源程序，否则要重新打开才能调试。', options: ['正确', '错误'], answer: 1, score: 2, explanation: '现代 IDE 支持边调试边修改代码（热重载或重新编译）。', tags: ['开发环境'] },
        { id: 17, type: 'judge', question: 'N 为正整数且大于 100，N / 100 将舍弃个位和十位。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '整数除以 100 即截断最后两位。', tags: ['算术运算'] },
        { id: 18, type: 'judge', question: '代码 cout << (a < 10 and 20); 在 a=5 时输出为 1。', options: ['正确', '错误'], answer: 0, score: 2, explanation: 'a < 10 为真，20 也视为真。整个表达式结果为 1。但题目逻辑描述可能存疑。', tags: ['布尔运算'] },
        { id: 19, type: 'judge', question: 'x, y, z = 5, 10, 15; result = x < y < z; cout << result; 输出为 1。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '5 < 10 为 1，1 < 15 为真 (1)。', tags: ['比较运算'] },
        { id: 20, type: 'judge', question: '输入 99.99 给 int 变量，会输出“及格”。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '99.99 被截断为 99，大于 60。', tags: ['数据类型'] },
        { id: 21, type: 'judge', question: '输入 123 时，循环输出 (char)(\'A\'+a % 10) 的结果是 DCB。', options: ['正确', '错误'], answer: 1, score: 2, explanation: '依题目具体实现，可能是顺序不对或字符集问题，官方给出的判定通常为错误。', tags: ['程序分析'] },
        { id: 22, type: 'judge', question: '代码 for 循环跳过 i=2 后输出 i#，结果为 +#+#3#。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '输出两次 +# 后，循环结束 i=3，输出 3#。', tags: ['循环'] },
        { id: 23, type: 'judge', question: '通过 a = b+a; a = b-a; 实现变量交换或数列递推。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '这是一种不使用第三变量交换数值的算法。', tags: ['算法'] },
        { id: 24, type: 'judge', question: '移动 L1 代码行到 L2 位置可以实现矩阵输出效果。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '通常指内循环后的换行操作。', tags: ['图形输出'] },
        { id: 25, type: 'judge', question: 'cout << (\'5\'+4); 执行后输出为 9。', options: ['正确', '错误'], answer: 1, score: 2, explanation: '\'5\' 的 ASCII 是 53，53+4 = 57，输出 57。', tags: ['数据类型'] }
    ],
    programmingQuestions: [
    {
        "id": 26,
        "type": "programming",
        "title": "优美的数字",
        "problemNumber": "B4411",
        "description": "如果一个正整数在十进制下的所有数位都相同，小 A 就会觉得这个正整数很优美。例如，正整数 6 的数位都是 6，所以 6 是优美的。正整数 99 的数位都是 9，所以 99 是优美的。正整数 123 的数位不都相同，所以 123 并不优美。 \n小 A 想知道不超过 n 的正整数中有多少优美的数字。你能帮他数一数吗？",
        "inputDescription": "一行，一个正整数 n。",
        "outputDescription": "一行，一个正整数，表示不超过 n 的优美正整数的数量。",
        "samples": [
            {
                "input": "120",
                "output": "18"
            }
        ],
        "explanation": "优美数字形如 1, 2, ..., 9, 11, 22, ..., 99, 111...。统计不超过 n 的个数即可。",
        "tags": [
            "编程题",
            "模拟",
            "构造"
        ],
        "template": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    long long n;\n    cin >> n;\n    // 在此填写代码\n    return 0;\n}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    long long n;\n    cin >> n;\n    int ans = 0;\n    for (int d = 1; d <= 9; ++d) {\n        long long x = 0;\n        while (true) {\n            x = x * 10+d;\n            if (x > n) break;\n            ans++;\n        }\n    }\n    cout << ans << endl;\n    return 0;\n}"
    },
    {
        "id": 27,
        "type": "programming",
        "title": "菱形",
        "problemNumber": "B4412",
        "description": "小 A 想绘制一个菱形。具体来说，需要绘制的菱形是一个 n 行 n 列的字符画，n 是一个大于 1 的奇数。菱形的四个顶点依次位于第 1 行、第 1 列、第 n 行、第 n 列的正中间，使用 # 绘制。相邻顶点之间也用 # 连接。其余位置都是 .。",
        "inputDescription": "一行，一个正整数 n。",
        "outputDescription": "输出共 n 行，表示对应的菱形。",
        "samples": [
            {
                "input": "5",
                "output": "..#..\n.#.#.\n#...#\n.#.#.\n..#.."
            }
        ],
        "explanation": "计算每个点相对于中心点的曼哈顿距离。若距离等于 n/2，则输出 #。",
        "tags": [
            "编程题",
            "循环",
            "曼哈顿距离"
        ],
        "template": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此填写代码\n    return 0;\n}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int mid = n / 2;\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < n; j++) {\n            if (abs(i-mid)+abs(j-mid) == mid) cout << '#';\n            else cout << '.';\n        }\n        cout << endl;\n    }\n    return 0;\n}"
    }
]
};
