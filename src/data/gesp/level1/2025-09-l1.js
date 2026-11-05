import { LEVEL1_TAGS } from './shared.js';

export const paperData = {
  id: '2025-09-l1',
  title: '2025年09月 GESP C++ 一级认证真题',
  level: 1,
  year: 2025,
  month: 9,
  session: 11,
  timeLimit: 5400,
  source: {
    officialPdf: '',
    url: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B1%E7%BA%A7.pdf",
    type: 'public-recovery',
  },
  confidence: {
    answer: 1.0,
    statement: 1.0,
  },
  verification: {
  status: "partial",
  reviewedBy: "AI-Codex",
  reviewedAt: "2026-11-06",
  scope: "全卷五维逐题对照mirror PDF；参考代码独立编译运行，源疑点保持隔离。",
  notes: "AI-Codex对照mirror PDF全部8页文本及渲染，Git blob SHA 41a17a499b75ee176ccf1b1e8666e8dde9cd7b21一致。恢复Q20源代码缺分号并保留官方正确答案隔离；补编程范围，25个answer字段未改。解析为AI逻辑复核，参考代码有独立GNU C++17运行证据。",
  dimensions: {
    statement: "partial",
    options: "partial",
    answer: "partial",
    explanation: "partial",
    referenceCode: "partial"
  }
},
  questions: [
    {
      id: 1,
      type: 'single',
      question: `人工智能现在非常火，小杨就想多了解一下，其中就经常听人提到“大模型”。那么请问这里说的“大模型”最贴切是指 ( )。`,
      options: ['大电脑模型', '大规模智能', '智能的单位', '大语言模型'],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\n在给定四个选项中，大语言模型最贴近题目所指的“大模型”，选D。它通过大量训练数据学习语言模式，可用于理解和生成文本。A是硬件外观模型，B不是明确技术名称，C也不是智能的计量单位；同时“大模型”这一广义词还可包括视觉等模型，并非所有大模型都只能处理语言。",
      sourceVerified: true,
      sourcePage: 1,
      reviewedBy: "AI-Codex",
      reviewedAt: "2026-11-06",
      tags: ["客观题", "单选题", "GESP1级"]
    },
    {
      id: 2,
      type: 'single',
      question: `小杨这学期刚开学就选修了一门编程课，然后就想编写程序来计算1到10001之间的所有偶数的和。他希望程序采用简单累加整数的方法，同时希望源程序尽可能清晰、简洁，则下面关于实现累加时采用的主要控制结构的哪个说法最不合适（ ）。`,
      options: ['使用循环结构', '使用循环和分支的组合', '仅使用顺序结构', '不使用分支结构'],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\n题目限定采用简单累加整数的方法并希望源码简洁，循环最适合反复累加，选C为最不合适。可枚举所有整数再用分支选偶数，也可从2开始每次加2而无需分支。将几千次累加全部写成顺序语句虽可表达，但冗长；不能脱离题目限定用等差数列公式否定循环的选择。",
      sourceVerified: true,
      sourcePage: 1,
      reviewedBy: "AI-Codex",
      reviewedAt: "2026-11-06",
      tags: ["客观题", "单选题", "GESP1级"]
    },
    {
      id: 3,
      type: 'single',
      question: `下面的C++代码用于输入姓名，然后输出姓名，正确的说法是( )。
\`\`\`cpp
string XingMing;
cout << "请输入您的姓名：";
cin >> XingMing;
cout << XingMing;
\`\`\``,
      options: ['XingMing 是汉语拼音，不能作为变量名称', '可以将 XingMing 改为 Xing Ming', '可以将 XingMing 改为 xingming', '可以将 XingMing 改为 Xing-Ming'],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\n变量名可以采用汉语拼音，XingMing和xingming都是合法标识符，所以可统一改为xingming，选C。重命名时声明和使用处都要同步修改。Xing Ming含空格，Xing-Ming含减号，均不能作为单个变量名；区分大小写不等于禁止使用小写名字。",
      sourceVerified: true,
      sourcePage: 1,
      reviewedBy: "AI-Codex",
      reviewedAt: "2026-11-06",
      tags: ["客观题", "单选题", "GESP1级"]
    },
    {
      id: 4,
      type: 'single',
      question: `下列C++代码中a和b都是整型变量，执行后，其结果是( )。
\`\`\`cpp
a = 13;
b = 5;
cout << a / b << a %// b << a % b;
a*b;
\`\`\``,
      options: ['2 3', '23', '20', '以上都不准确'],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\n//把第三行其后的内容注释掉，但不会使前面未完成的表达式结束。接上下行后，输出语句实际为cout<<a/b<<a%a*b;。/、%、*按相应优先级和左结合分组，13/5=2，(13%13)*5=0，两个输出之间没有空格，得到20，选C。不能把下一行a*b单独看成与上一行无关的语句。",
      sourceVerified: true,
      sourcePage: 1,
      reviewedBy: "AI-Codex",
      reviewedAt: "2026-11-06",
      tags: ["客观题", "单选题", "GESP1级"]
    },
    {
      id: 5,
      type: 'single',
      question: `C++表达式 3 * 4 % 5 / 6 的值是( )。`,
      options: ['10', '5', '2', '0'],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\n乘法、求余与除法同级且左结合，依次计算3*4=12，12%5=2，2/6为整数除法得到0，因此选D。不能先计算5/6，也不能把最后一次除法自动改为浮点运算。只有显式参与浮点操作数时才可能得到小数结果。",
      sourceVerified: true,
      sourcePage: 2,
      reviewedBy: "AI-Codex",
      reviewedAt: "2026-11-06",
      tags: ["客观题", "单选题", "GESP1级"]
    },
    {
      id: 6,
      type: 'single',
      question: `下面的C++代码中变量N和M都是整型，则执行时如果先输入10并输入一个制表符后输入20并回车，其输出的数值是( )。
\`\`\`cpp
scanf("%d", &N);
scanf("%d", &M);
printf("{%d}",N+M);
\`\`\``,
      options: ['{30}', '1020', '{N+M}', '不输出，继续等待输入'],
      answer: 0,
      score: 2,
      explanation: "**答案：A**\n\n%d读取整数时会跳过作为分隔符的空白，包括制表符。两次输入分别得到N=10和M=20，N+M=30；printf中的花括号是普通字符，所以输出{30}，选A。它不会把输入拼接成1020，也不会把格式串中的表达式文本原样当作数值。",
      sourceVerified: true,
      sourcePage: 2,
      reviewedBy: "AI-Codex",
      reviewedAt: "2026-11-06",
      tags: ["客观题", "单选题", "GESP1级"]
    },
    {
      id: 7,
      type: 'single',
      question: `当前是9月，编写C++代码求N个月后的月份。横线处应填入的代码是（ ）。
\`\`\`cpp
int N, M;
cin >> N;
M = _____________;
if (M == 0)
    printf("%d个月后12月", N);
else
    printf("%d个月后是%d月", N, M);
\`\`\``,
      options: ['N % 12', '9 + N % 12', '(9 + N) / 12', '(9 + N) % 12'],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\n从9月开始再过N个月，将9+N对12取余可得到周期位置，余数0另外表示12月，选D。例如N=3时余数0，输出12月；N=4时余数1，输出1月。B的9+N%12没有对总和回绕，C求商表示跨过的周期数，也不是所求月份。",
      sourceVerified: true,
      sourcePage: 2,
      reviewedBy: "AI-Codex",
      reviewedAt: "2026-11-06",
      tags: ["客观题", "单选题", "GESP1级"]
    },
    {
      id: 8,
      type: 'single',
      question: `下面C++代码执行后的输出是（ ）。
\`\`\`cpp
int n = 0;
for (int i = 0; i < 100; i++)
    n += i % 2;
cout << n;
\`\`\``,
      options: ['5050', '4950', '50', '49'],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\ni从0到99，每个偶数i%2为0、每个奇数为1。区间有50个奇数，因此n累加50次1，最后输出50，选C。程序没有把i本身累加，所以不输出4950或5050；起点0也参与循环，但它贡献的余数为0。",
      sourceVerified: true,
      sourcePage: 2,
      reviewedBy: "AI-Codex",
      reviewedAt: "2026-11-06",
      tags: ["客观题", "单选题", "GESP1级"]
    },
    {
      id: 9,
      type: 'single',
      question: `下面的C++代码执行后输出是（ ）。
\`\`\`cpp
int N = 0, i;
for (i = -100; i < 100; i++)
    N += i % 10;
cout << N;
\`\`\``,
      options: ['900', '100', '0', '-100'],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\n正负配对的k%10与(-k)%10互为相反数，-99至99中所有余数之和为0；额外的-100%10也等于0，因此总和为0，选C。C++负整数求余的符号与被除数一致，不能把所有负数余数都按0至9处理。",
      sourceVerified: true,
      sourcePage: 2,
      reviewedBy: "AI-Codex",
      reviewedAt: "2026-11-06",
      tags: ["客观题", "单选题", "GESP1级"]
    },
    {
      id: 10,
      type: 'single',
      question: `下面C++代码执行后输出是（ ）。
\`\`\`cpp
int i;
for(i = 1; i < 5; i++){
    if(i % 3 == 0)
        break;
    printf("%d#",i);
}
if(i > 5) printf("END\\n");
\`\`\``,
      options: ['1#2#', '1#2#END', '1#2', '1#2#3#4#END'],
      answer: 0,
      score: 2,
      explanation: "**答案：A**\n\ni=1、2时没有触发break，分别输出1#、2#。i=3时条件成立，在输出前就break，循环停止且不会再更新i。循环外检查i>5为假，因此不输出END，完整结果为1#2#，选A。不要把break后的循环变量当作自然结束值。",
      sourceVerified: true,
      sourcePage: 3,
      reviewedBy: "AI-Codex",
      reviewedAt: "2026-11-06",
      tags: ["客观题", "单选题", "GESP1级"]
    },
    {
      id: 11,
      type: 'single',
      question: `下面的C++代码用于求N的镜面数（N的个位到最高位的各位数字依次反过来出现在数字中，但高位0将被忽略，不输出），如输入1234，则将输出 4321 ，又如输入120，则将输出 21 ，错误的选项是（ ）。
\`\`\`cpp
cout << "请输入个位数不为0的正整数：";
cin >> N;
rst = 0; // 保存逆序结果
while (______________){
    rst = rst * 10 + N % 10;
    N = N / 10;
}
cout << rst << endl;
\`\`\``,
      options: ['N != 0', 'not (N == 0)', 'N = 0', 'N > 0'],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\nA、B、D在正整数N尚未归零时继续循环，均能逐位取末位并构造逆序数。B的not是!的替代记号。C的N=0为赋值，第一次判断就把N改为0并得到假值，循环不执行，故错误项为C。提示文字说个位不为0，但它不构成程序的检查，原题120逆序为21也可由算法处理。",
      sourceVerified: true,
      sourcePage: 3,
      reviewedBy: "AI-Codex",
      reviewedAt: "2026-11-06",
      tags: ["客观题", "单选题", "GESP1级"]
    },
    {
      id: 12,
      type: 'single',
      question: `下面C++代码用于交换两个正整数a和b的值，不能实现交换的代码是（ ）。`,
      options: [`\`\`\`cpp
cout << "输入第一个正整数: ";
cin >> a;
cout <<"输入第二个正整数: ";
cin >> b;
temp = a;
a = b;
b = temp;
cout << "a=" << a << " b=" << b << endl;
\`\`\``, `\`\`\`cpp
cout << "输入第一个正整数: ";
cin >> a;
cout <<"输入第二个正整数: ";
cin >> b;
b = a - b;
a = a - b;
b = a + b;
cout << "a=" << a << " b=" << b << endl;
\`\`\``, `\`\`\`cpp
cout << "输入第一个正整数: ";
cin >> a;
cout <<"输入第二个正整数: ";
cin >> b;
a = a + b;
b = a - b;
a = a - b;
cout << "a=" << a << " b=" << b << endl;
\`\`\``, `\`\`\`cpp
cout << "输入第一个正整数: ";
cin >> a;
cout <<"输入第二个正整数: ";
cin >> b;
a, b = b, a;
cout << "a=" << a << " b=" << b << endl;
\`\`\``],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\nD中的a,b=b,a使用逗号表达式，不是Python式的同时交换。它按逗号的结合关系仅使b取得原b，a也保持不变，一般不能交换，选D。A使用临时变量；B和C在中间运算不溢出时可通过差与和交换。正数相等时D可能碰巧结果一样，但不能因此判作通用交换算法。",
      sourceVerified: true,
      sourcePage: 3,
      reviewedBy: "AI-Codex",
      reviewedAt: "2026-11-06",
      tags: ["客观题", "单选题", "GESP1级"]
    },
    {
      id: 13,
      type: 'single',
      question: `下面C++代码用于获得正整数N的第M位数，约定个位数为第1位，如N等于1234，M等于2，则输出3。假设M的值是大于等于1且小于等于N的位数。横线处应填入的代码是( )。
\`\`\`cpp
int N, M, div=1;
cout << "请输入一个正整数：";
cin >> N;
cout <<"请输入从右到左取第几位数：";
cin >> M;
for (int i =0; i < (M - 1); i++) div *= 10;
cout << (______________);
\`\`\``,
      options: ['N % div / 10', 'N / div / 10', 'N % div % 10', 'N / div % 10'],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\ndiv先从1乘10共M-1次，得到10的M-1次方。N/div去掉右侧M-1位，再%10保留当前个位，即原数第M位，选D。以N=1234、M=2为例，1234/10=123，再对10取余为3；M=1时div=1，也能正确取个位。",
      sourceVerified: true,
      sourcePage: 4,
      reviewedBy: "AI-Codex",
      reviewedAt: "2026-11-06",
      tags: ["客观题", "单选题", "GESP1级"]
    },
    {
      id: 14,
      type: 'single',
      question: `下面C++代码执行后输出是（ ）。
\`\`\`cpp
num = 0;
while (num <= 5){
    num += 1;
    if (num == 3)
        continue;
    printf("%d#", num);
}
\`\`\``,
      options: ['1#2#4#5#6#', '1#2#4#5#6', '1#2#3#4#5#6#', '1#2#3#4#5#6'],
      answer: 0,
      score: 2,
      explanation: "**答案：A**\n\nnum从0开始，进入循环后先加1。依次到1、2时输出，3时continue跳过输出，4、5正常输出；以num=5进入的最后一轮先变为6，仍会输出6#，之后条件为假。完整为1#2#4#5#6#，选A，末尾井号也不能漏掉。",
      sourceVerified: true,
      sourcePage: 4,
      reviewedBy: "AI-Codex",
      reviewedAt: "2026-11-06",
      tags: ["客观题", "单选题", "GESP1级"]
    },
    {
      id: 15,
      type: 'single',
      question: `下面C++代码用于记录多个输入数中的最大数和最小数（输入 -999 则输入结束），相关说法错误的是（ ）。
\`\`\`cpp
cin >> now_num;
min_num = max_num = now_num;

while (now_num != -999){
    if (max_num < now_num)
        max_num = now_num;

    if (min_num > now_num)
        min_num = now_num;

    cin >> now_num;
}
cout << min_num << ' ' << max_num;
\`\`\``,
      options: ['程序运行时如果第一个数输入 -999 ，则输出将是 -999 -999', '程序输入过程中，如果输入的第一个数不是 -999 ，则如果待输入的数据中没有 -999 ，则程序能求出已输入整数中的最大数和最小数', '如果用于输入考试成绩，即成绩中不可能有 -999 ，则程序能求出已输入成绩中的最高成绩和最低成绩', '可以将 cin >> now_num; 移动到 while (now_num != -999) { 下面，结果不变'],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\nD把循环末读数移到循环开头，会先读到结束标志-999后仍进行本轮最大最小比较，把标志误当数据，因此不等价。A首个输入即-999时直接输出初始化的-999 -999。B、C按有效数据不含结束标志且最终另输入-999结束的通常用法理解；若从不输入标志，原程序不会到达最终输出。",
      sourceVerified: true,
      sourcePage: 5,
      reviewedBy: "AI-Codex",
      reviewedAt: "2026-11-06",
      tags: ["客观题", "单选题", "GESP1级"]
    },
    {
        id: 16,
        type: "judge",
        question: `在集成开发环境里调试程序时，要注意不能修改源程序，因为如果修改，就要终止调试、关闭该文件并重新打开，才能再次开始调试。`,
        options: ["正确", "错误"],
        answer: 1,
        score: 2,
        explanation: "**判断：错误**\n\n调试修改源程序后通常需要重新编译并启动相应调试，但不必一律关闭文件再重新打开，因此题目的绝对限制错误。编辑源码、编译生成程序与正在执行的调试进程是不同层次，不能因当前进程未立即反映修改，就推导出必须重新打开文件。",
        sourceVerified: true,
        sourcePage: 5,
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-06",
        tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
        id: 17,
        type: "judge",
        question: `执行 C++ 表达式 \`10 % 0.5\` 将报错，因为 0.5 所在位置只能是整数。`,
        options: ["正确", "错误"],
        answer: 0,
        score: 2,
        explanation: "**判断：正确**\n\n内建求余运算符%要求操作数为整数类型，0.5是double，因此10%0.5不能通过类型检查，原叙述正确。它不是“余数算出来为多少”的运行问题，也不等同于除法/，后者允许浮点操作数。若确需浮点余数，应使用对应数学库函数。",
        sourceVerified: true,
        sourcePage: 5,
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-06",
        tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.operator]
    },
    {
        id: 18,
        type: "judge",
        question: `下面 C++ 代码执行后将输出 9。

\`\`\`cpp
for (i = 0; i < 10; i++)
    break;
cout << i;
\`\`\``,
        options: ["正确", "错误"],
        answer: 1,
        score: 2,
        explanation: "**判断：错误**\n\n循环先令i=0，条件0<10成立，立即执行break，退出时i仍为0，输出0而非9，因此判断错误。break会跳过该轮之后的更新i++，不能按循环自然完成时的值推测i。题目片段假设i已有可用声明。",
        sourceVerified: true,
        sourcePage: 5,
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-06",
        tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.loop]
    },
    {
        id: 19,
        type: "judge",
        question: `下面 C++ 代码执行后将输出 55。

\`\`\`cpp
n = 0;
for (int i = 0; i > -10; i--)
    n = n + i * -1;
cout << n;
\`\`\``,
        options: ["正确", "错误"],
        answer: 1,
        score: 2,
        explanation: "**判断：错误**\n\ni依次为0、-1、…、-9，i*-1依次为0至9，累加得到45而非55，判断错误。循环条件i>-10排除了-10，也就不包含对应贡献10。负数乘以-1和直接累加负数是不同操作，不能将符号或上界遗漏。",
        sourceVerified: true,
        sourcePage: 5,
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-06",
        tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.loop]
    },
    {
        id: 20,
      sourceIntegrity: 'official-source-defect',
      integrityNote: "ANSWER-DOUBT：mirror p5最后输出行cout<<cnt缺分号，官方判断√无法按原代码执行验证。恢复原文，保留answer=0并暂停计分，等待来源澄清。",
        type: "judge",
        question: "将下面C++代码中的L1行的i = 0修改为i = 1，其输出与当前代码输出相同。\n\n```cpp\ncnt = 0;\nfor (int i = 0; i < 100; i++) // L1\n    cnt += i;\ncout << cnt\n```",
        options: ["正确", "错误"],
        answer: 0,
        score: 2,
        explanation: "**原卷疑点，暂停计分**\n\nANSWER-DOUBT：mirror原卷p5最后一行是cout<<cnt，缺少分号，代码不能编译。题库此前补了分号；现恢复原文，保留官方“正确”answer=0并暂停计分。若额外补上分号，去掉起始加数0确实不改变0..99的总和4950，但不能拿修复后的算法替代原卷并宣称已无疑点。",
        sourceVerified: true,
        sourcePage: 5,
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-06",
        tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.loop]
    },
    {
        id: 21,
        type: "judge",
        question: `将下面 C++ 代码中的 \`i < 10\` 修改为 \`i <= 10\`，其执行后输出相同。

\`\`\`cpp
int n, i;
n = i = 0;
while (i < 10) {
    n += i;
    i += 1;
}
cout << n;
\`\`\``,
        options: ["正确", "错误"],
        answer: 1,
        score: 2,
        explanation: "**判断：错误**\n\n原循环在累加前检查i<10，加入0至9，总和45。改成i<=10后多加入10，总和55，所以两次输出不同，判断错误。n=i=0同时给两个变量赋确定初值，这与未初始化变量问题不同，应按条件边界具体分析。",
        sourceVerified: true,
        sourcePage: 6,
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-06",
        tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.loop]
    },
    {
        id: 22,
        type: "judge",
        question: `下面的 C++ 代码执行后将输出 45。

\`\`\`cpp
int n, i;
n = i = 0;
while (i < 10) {
    i += 1;
    n += i;
}
cout << n;
\`\`\``,
        options: ["正确", "错误"],
        answer: 1,
        score: 2,
        explanation: "**判断：错误**\n\n每轮先i+=1再将i加到n，故本轮实际加入1至10，而非0至9。总和为55，原叙述声称输出45，判断错误。进入最后一轮时i=9，条件仍成立，先增到10并加入总和，下次判断才会停止。",
        sourceVerified: true,
        sourcePage: 6,
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-06",
        tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.loop]
    },
    {
        id: 23,
        type: "judge",
        question: `执行 C++ 代码 \`cout << (12 + 12.12)\` 将报错，因为 12 是 \`int\` 类型，而 12.12 是 \`float\` 类型，不同类型不能直接运算。`,
        options: ["正确", "错误"],
        answer: 1,
        score: 2,
        explanation: "**判断：错误**\n\n12为int、12.12默认为double，C++会进行常规算术转换后相加，表达式合法，默认输出24.12，因此判断错误。不同算术类型并非一概不能共同运算；题目还把12.12的默认类型误称为float，应与12.12f区别。",
        sourceVerified: true,
        sourcePage: 6,
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-06",
        tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.operator]
    },
    {
        id: 24,
        type: "judge",
        question: `下面 C++ 代码执行时将导致无限循环（也称死循环）。

\`\`\`cpp
int count = 0;
while (count < 5) {
    count += 1;
    if (count == 3)
        continue;
    cout << count << ' ';
}
\`\`\``,
        options: ["正确", "错误"],
        answer: 1,
        score: 2,
        explanation: "**判断：错误**\n\ncount在每轮continue之前已经加1，因此会依次变成1、2、3、4、5，条件最终变假，循环正常终止。仅在3时跳过输出，输出1 2 4 5，原叙述错误。判断死循环应检查条件相关变量是否持续更新，不能只因出现continue就下结论。",
        sourceVerified: true,
        sourcePage: 6,
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-06",
        tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.loop]
    },
    {
        id: 25,
        type: "judge",
        question: `下列 C++ 代码用于求斐波那契数列，即第 1 个数为 0，第 2 个数为 1，从第三个数开始，依次是其前两个数之和。如果输入的值为大于 1 的正整数，该代码能实现所求。

\`\`\`cpp
cin >> n;
a = 0, b = 1;
for (int j = 0; j < n; j++) {
    cout << a << " ";
    b = b + a;
    a = b - a;
}
\`\`\``,
        options: ["正确", "错误"],
        answer: 0,
        score: 2,
        explanation: "**判断：正确**\n\n每轮开始时a、b分别保存相邻两项，先输出a，再令b=b+a得下一项，随后a=b-a用新的b减旧a，使a变成原b。这样正确输出0、1、1、2、3等，按题目正常数值范围判断正确。实际固定宽度整型实现仍应限制n，防止长期递推超过类型范围；不能推广为任意大n均无溢出。",
        sourceVerified: true,
        sourcePage: 6,
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-06",
        tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.loop]
    },
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `8\n7\n9\n10`, output: `3.00` },
        { input: `8\n7\n2\n11`, output: `2.20` }
      ],
      referenceCode: `#include <iostream>
#include <iomanip>
using namespace std;
int main() {
    long long x, y, n, p;
    cin >> x >> y >> n >> p;
    double p1 = p;
    if (p >= x) p1 -= y;
    double p2 = p * n / 10.0;
    if (p1 < p2) cout << fixed << setprecision(2) << p1 << "\\n";
    else cout << fixed << setprecision(2) << p2 << "\\n";
    return 0;
}`,
      question: "\n# [GESP202509 一级] 商店折扣\n\n## 题目描述\n\n商店正在开展促销活动，给出了两种方案的折扣优惠。第一种方案是购物满 $x$ 元减 $y$ 元；第二种方案是直接打 $n$ 折，也就是说价格变为原先的 $n\\div 10$。这里的 $x, y, n$ 均是正整数，并且 $1 \\le y < x$，$1 \\le n < 10$。\n\n需要注意的是，第一种方案中满减优惠只能使用一次。例如购物满 $10$ 元减 $3$ 元时，若挑选了价格总和为 $33$ 元的物品，只能减免 $3$ 元，需要支付 $30$ 元。\n\n小明在商店挑选了价格总和为 $p$ 元的物品，结账时只能使用一种优惠方案。小明最少需要支付多少钱呢？\n\n## 输入格式\n\n四行，四个正整数 $x, y, n, p$，含义见题目描述。\n\n对于所有测试点，保证 $1 \\le y < x \\le 100$，$1 \\le n < 10$，$1 \\le p \\le 100$。\n\n## 输出格式\n\n一行，一个小数，表示小明最少需要支付多少钱，保留两位小数。\n",
      template: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}`,
      answer: '',
      score: 25,
      explanation: "**解析**\n\n分别计算一次满减后的价格p1和打折价格p2，再输出较小者，不能把两种优惠叠加。只有p>=x时满减才生效，且只减一次y；折扣价为p*n/10.0。样例10元在满8减7下为3.00，11元打2折为2.20。原卷1<=y<x<=100、1<=n<10、1<=p<=100，时间与额外空间均O(1)，输出固定两位小数。",
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.condition, LEVEL1_TAGS.operator],
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `2`, output: `5` },
        { input: `5`, output: `55` }
      ],
      referenceCode: `#include <iostream>
using namespace std;
int main() {
    long long n;
    cin >> n;
    long long sum = 0;
    for(long long i = 1; i <= n; i++) {
        sum += i * i;
    }
    cout << sum << "\\n";
    return 0;
}`,
      question: "\n# [GESP202509 一级] 金字塔\n\n## 题目描述\n\n金字塔由 $n$ 层石块垒成。从塔底向上，每层依次需要 $n \\times n, (n-1) \\times (n-1), \\cdots, 2 \\times 2, 1 \\times 1$ 块石块。请问搭建金字塔总共需要多少块石块？\n\n## 输入格式\n\n一行，一个正整数 $n$，表示金字塔的层数。\n\n对于所有测试点，保证 $1 \\le n \\le 50$。\n\n## 输出格式\n\n一行，一个正整数，表示搭建金字塔所需的石块数量。\n",
      template: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}`,
      answer: '',
      score: 25,
      explanation: "**解析**\n\n各层石块数依次为1平方至n平方，顺序不影响总和。令sum=0，枚举i=1至n将i*i加入即可；n=2得1+4=5，n=5得55。原卷1<=n<=50，最大和42925，long long有足够范围。时间O(n)，额外空间O(1)，不能只求n*n或误把每层方形当成线性i块。",
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.operator],
    }
  ]
};
