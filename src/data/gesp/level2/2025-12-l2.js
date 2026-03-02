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
    ]
};