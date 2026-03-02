// 2024年12月 GESP C++ 二级真题 (第8次认证)
export const paperData = {
    id: '2024-12-l2',
    title: '2024年12月 GESP C++ 二级真题',
    level: 2,
    year: 2024,
    month: 12,
    session: 8,
    timeLimit: 90 * 60,
    questions: [
        { id: 1, type: 'single', question: '2024年诺贝尔物理学奖“意外地”颁给两位计算机科学家（Hopfield、Hinton），两人的主要研究方向是（ ）。', options: ['天体物理', '流体力学', '人工智能', '量子理论'], answer: 2, score: 2, explanation: '官方答案 C。', tags: ['基础语法'] },
        { id: 2, type: 'single', question: '计算机系统中存储的基本单位用 B 表示，它代表的是（ ）。', options: ['Byte', 'Block', 'Bulk', 'Bit'], answer: 0, score: 2, explanation: '官方答案 A。', tags: ['基础语法'] },
        { id: 3, type: 'single', question: 'C++ 语句 cout << (3 + 3 % 3 * 2 - 1) 执行后输出的值是（ ）。', options: ['-1', '4', '56', '2'], answer: 3, score: 2, explanation: '官方答案 D。', tags: ['输入输出', '运算符'] },
        { id: 4, type: 'single', question: '给定代码 for (int i=0; i<10; i++) printf("%d", i); 其输出是（ ）。', options: ['123456789', '0123456789', '12345678910', '012345678910'], answer: 1, score: 2, explanation: '官方答案 B。', tags: ['输入输出', '程序分析'] },
        { id: 5, type: 'single', question: '关于给定代码片段（变量未初始化后参与累加）的说法，正确的是（ ）。', options: ['输出相当于求 1-10 的和（含10）', '输出相当于求 1-10 的和（不含10）', '输出相当于求 0-10 的和（不含10）', '输出不确定值'], answer: 3, score: 2, explanation: '官方答案 D。', tags: ['程序分析'] },
        { id: 6, type: 'single', question: '给定代码执行后输出是（ ）。', options: ['1', '2', '9', '10'], answer: 1, score: 2, explanation: '官方答案 B。', tags: ['输入输出', '程序分析'] },
        { id: 7, type: 'single', question: '给定含 continue 与 if(i>=10) 的代码执行后的输出是（ ）。', options: ['0#0#0#0#0#0#0#1#', '0#0#0#0#0#0#1#', '0#0#0#0#1#', '0#0#0#0#'], answer: 2, score: 2, explanation: '官方答案 C。', tags: ['输入输出', '程序分析'] },
        { id: 8, type: 'single', question: '用于筛选“0-100内能被7整除但不能被3整除”的条件应填（ ）。', options: ['i % 7 == 0 && i % 3 != 0', '!(i % 7) && i % 3 != 0', 'i % 7 && i % 3', 'i % 7 == 0 && !(i % 3 == 0)'], answer: 2, score: 2, explanation: '官方答案 C。', tags: ['循环', '条件判断', '输入输出'] },
        { id: 9, type: 'single', question: '求正整数各位数字之和的代码中，横线处“不应填入”的是（ ）。', options: ['tnt = tnt + N % 10', 'tnt += N % 10', 'tnt = N % 10 + tnt', 'tnt = N % 10'], answer: 3, score: 2, explanation: '官方答案 D。', tags: ['程序分析'] },
        { id: 10, type: 'single', question: '下图给定 C++ 程序执行后的输出是（ ）。', options: ['0010120123', '01012012301234', '001012012301234', '01012012301234012345'], answer: 0, score: 2, explanation: '官方答案 A。', tags: ['输入输出', '程序分析'] },
        { id: 11, type: 'single', question: '关于给定九九乘法表代码的说法，错误的是（ ）。', options: ['将 L1 的换行语句移到 L2 位置，效果相同', '将 printf("\\n") 改为 print("%c", \'\\n\') 效果相同', 'Lie * Hang > 9 改为 Lie * Hang >= 10 效果相同', 'Lie * Hang > 9 改为 Hang * Lie > 9 效果相同'], answer: 0, score: 2, explanation: '官方答案 A。', tags: ['循环', '条件判断', '输入输出'] },
        { id: 12, type: 'single', question: '实现 1!+2!+...+N! 的代码中，“不能实现”的填空方案是（ ）。', options: ['nowNum *= i; tnt += nowNum;', 'nowNum = nowNum * i; tnt = tnt + nowNum;', 'nowNum *= i; tnt = nowNum + tnt;', '其余一项（原卷 D）'], answer: 3, score: 2, explanation: '官方答案 D。', tags: ['程序分析'] },
        { id: 13, type: 'single', question: '输出 N 到 M（含）之间孪生素数时，for 循环上界应填（ ）。', options: ['M - 2', 'M - 1', 'M', 'M + 1'], answer: 1, score: 2, explanation: '官方答案 B。', tags: ['输入输出', '数学逻辑', '程序分析'] },
        { id: 14, type: 'single', question: '输出指定金字塔图形时，两个横线分别应填（ ）。', options: ['height - i；2 * i', 'height - i；2 * i + 1', 'height - i - 1；2 * i + 1', '其余一项（原卷 D）'], answer: 3, score: 2, explanation: '官方答案 D。', tags: ['输入输出', '程序分析'] },
        { id: 15, type: 'single', question: '若给定代码输出为 30，则横线处“不能填入”的是（ ）。', options: ['max(max(a, b), c)', 'min(a+b, c)', 'sqrt(a+b+c)', '(a+b+c)/2'], answer: 2, score: 2, explanation: '官方答案 C。', tags: ['基础语法'] },

        { id: 16, type: 'judge', question: '在 Windows 资源管理器中，为已有文件建立副本可用 Ctrl+C 后 Ctrl+V。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '判断题答案依据官方答案。', tags: ['判断题'] },
        { id: 17, type: 'judge', question: '若 N 为正整数，表达式 N - N / 10 * 10 可以得到 N 的个位数。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '判断题答案依据官方答案。', tags: ['判断题', '输入输出', '程序分析'] },
        { id: 18, type: 'judge', question: '表达式 (10 <= N <= 12) 在 N=12 时输出为 1。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '判断题答案依据官方答案。', tags: ['判断题', '输入输出'] },
        { id: 19, type: 'judge', question: '若 int(sqrt(N))*int(sqrt(N)) == N 为真，则 N 一定是完全平方数。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '判断题答案依据官方答案。', tags: ['判断题'] },
        { id: 20, type: 'judge', question: '给定代码执行后会输出 2*3=6。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '判断题答案依据官方答案。', tags: ['判断题', '输入输出', '程序分析'] },
        { id: 21, type: 'judge', question: 'for (int _ = 0; _ < 10; _++) 中下划线 _ 不能作为循环变量名。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '判断题答案依据官方答案。', tags: ['判断题', '循环', '输入输出'] },
        { id: 22, type: 'judge', question: '给定含 continue 与 break 的循环代码，因有 break，最终输出 0。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '判断题答案依据官方答案。', tags: ['判断题', '循环', '输入输出'] },
        { id: 23, type: 'judge', question: '给定双层循环代码执行后将输出 18 行“OK”。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '判断题答案依据官方答案。', tags: ['判断题', '输入输出', '程序分析'] },
        { id: 24, type: 'judge', question: '将给定代码中的 i=1 改为 i=0，输出结果相同。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '判断题答案依据官方答案。', tags: ['判断题', '输入输出', '程序分析'] },
        { id: 25, type: 'judge', question: 'for 循环和 while 循环通常可相互改写，给定两段“求 1 到 10 的和”代码运行结果相同。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '判断题答案依据官方答案。', tags: ['判断题'] }
    ]
};