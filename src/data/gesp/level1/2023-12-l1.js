import { LEVEL1_TAGS } from './shared.js';

export const paperData = {
  id: '2023-12-l1',
  title: '2023年12月 GESP C++ 一级认证真题',
  level: 1,
  year: 2023,
  month: 12,
  session: 4,
  timeLimit: 5400,
  source: {
    officialPdf: '',
    url: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2023%E5%B9%B412%E6%9C%88-C%2B%2B1%E7%BA%A7.pdf',
    type: 'public-recovery',
  },
  confidence: {
    answer: 1.0,
    statement: 1.0,
  },
  verification: {
  "status": "partial",
  "reviewedBy": "AI-Codex",
  "reviewedAt": "2026-11-06",
  "scope": "原卷逐题核验，Q18源缺陷隔离；参考代码独立运行。",
  "notes": "AI-Codex对照mirror PDF，本地镜像Git blob SHA fc1710d0b0364bfaf1f8e2a963828b643690fdd3一致；8页文本与全部渲染核对。Q18原卷语法缺陷保留隔离，不能宣称全过。所有answer字段未改，解析为AI逻辑复核，参考代码另有编译运行证据。",
  "dimensions": {
    "statement": "partial",
    "options": "partial",
    "answer": "partial",
    "explanation": "partial",
    "referenceCode": "verified"
  }
},
  questions: [
    // 1-15 单选题
    {
      id: 1,
      type: 'single',
      question: `以下 C++ 不可以作为变量的名称的是 ( ) 。`,
      options: ["CCF GESP", "ccfGESP", "CCFgesp", "CCF_GESP"],
      answer: 0,
      score: 2,
      explanation: "**答案：A**\n\nCCF GESP内部含有空格，不能作为一个变量名，因此选A。其余三个名字均以字母开头，只包含字母或下划线，符合命名规则。C++允许大小写字母，但大小写不同的名字是不同的标识符。",
            tags: ['变量与标识符'],
        },
    {
      id: 2,
      type: 'single',
      question: `C++表达式 10-3 * (2+1) % 10 的值是( )。`,
      options: ["0","1","2","3"],
      answer: 1,
      score: 2,
      explanation: "**答案：B**\n\n先计算括号2+1=3，再按同级从左到右计算3*3%10=9%10=9，最后10-9=1，因此选B。不能把减法提前，也不能把整个10-9再按其他结合方式计算。",
            tags: ['运算符'],
        },
    {
      id: 3,
      type: 'single',
      question: `假设现在是上午十点，求出N小时（正整数）后是第几天几时，如输入20小时则为第2天6点，如N输入4则为今天14点。为实现相应功能，应在横线处填写代码是( )。\n\`\`\`cpp\nint N, dayX, hourX;\ncin >> N;\ndayX = ________, hourX = ________;\nif (dayX == 0)\n    cout << "今天" << hourX << "点";\nelse\n    cout << "第" << (dayX + 1) << "天" << hourX << "点";\n\`\`\``,
      options: ['(10 + N) % 24 , (10 + N) / 24', '(10 + N) / 24 , (10 + N) % 24', 'N % 24 , N / 24', '10 / 24 , 10 % 24'],
      answer: 1,
      score: 2,
      explanation: "**答案：B**\n\n从今天零点起算，N小时后的总小时数是10+N。整除24得到跨过的天数dayX，对24取余得到当天小时hourX，因此选B。N=20时得到dayX=1、hourX=6，输出第2天6点；N=4时得到0与14，输出今天14点。",
            tags: ['运算符'],
        },
    {
      id: 4,
      type: 'single',
      question: `下面的程序用于判断N是否为偶数，横线处应填写代码是（ ）。\n\`\`\`cpp\ncin >> N;\nif (______)\n    cout << "偶数";\nelse\n    cout << "奇数";\n\`\`\``,
      options: ['N % 2 == 0', 'N % 2 = 0', 'N % 2', 'N % 2 != 0'],
      answer: 0,
      score: 2,
      explanation: "**答案：A**\n\n整数N是偶数当且仅当N%2==0，因此选A。B试图给N%2的计算结果赋值，不符合语法；C把余数直接作真假判断，非零才真，反而对应奇数；D也是奇数条件。负偶数除以2的余数仍为0，此判断同样适用。",
            tags: ['运算符'],
        },
    {
      id: 5,
      type: 'single',
      question: `下面对C++代码执行后输出的描述，正确的是（ ）。\n\`\`\`cpp\ncin >> N;\ncnt = 0;\nfor(int i = 1; i < N; i++)\n    cnt += 1;\ncout << cnt;\n\`\`\``,
      options: ['如果输入的N是小于等于2整数，第5行将输出0。', '如果输入的N是大于等于2整数，第5行将输出N-1。', '如果输入的N是大于等于2整数，第5行将输出N。', '以上说法均不正确。'],
      answer: 1,
      score: 2,
      explanation: "**答案：B**\n\n当N>=2时，i从1依次取到N-1，共N-1次，每次cnt加1，最终输出N-1，因此选B。A在N=2时已经不成立，因为此时循环执行1次，输出1而非0；C把循环次数多算了一次。",
            tags: ['循环'],
        },
    {
      id: 6,
      type: 'single',
      question: `下面C++代码执行后的输出是（　）。

\`\`\`cpp
cnt = 0;
for(int i = 1; i < 10; i++){
    cnt += 1;
    i += 2;
}
cout << cnt;
\`\`\``,
      options: ["10", "9", "3", "1"],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\n每轮中cnt加1，i先在循环体内加2，再在for更新处加1，因此相邻两轮起点相差3。进入循环体时i依次为1、4、7，第三轮更新后为10，不再满足i<10。共3轮，输出3，选C。",
            tags: ['数据类型', '变量与标识符'],
        },
    {
      id: 7,
      type: 'single',
      question: `下面C++代码执行后的输出是（　）。

\`\`\`cpp
cnt = 0;
for(int i = 1; i < 20; i++){
    if(i%2)
        continue;
    else if(i%3==0 && i%5==0)
        break;
    cnt += i;
}
cout << cnt;
\`\`\``,
      options: ["90", "44", "20", "10"],
      answer: 0,
      score: 2,
      explanation: "**答案：A**\n\n奇数首先触发continue，跳过后面的判断和累加；偶数才进入else if。能同时被3和5整除的数是15的倍数，1至19中仅15，但它是奇数，已被continue跳过。因此break不会执行，累加2+4+6+8+10+12+14+16+18=90，选A。",
            tags: ['循环', '输入输出'],
        },
    {
      id: 8,
      type: 'single',
      question: `下面 C++ 代码执行后的输出是（　）。

\`\`\`cpp
N = 10;
cnt = 0;
while (1) {
    if (N == 0) break;
    cnt += 1;
    N -= 2;
}
cout << cnt;
\`\`\``,
      options: ['11', '10', '5', '4'],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\n每轮先检查N==0，未为0才计数并减2。计数时N依次为10、8、6、4、2，共5轮；随后N=0，下一次检查break退出且不再计数。输出5，选C。while(1)提供恒真条件，但程序仍可通过break终止。",
      tags: ['循环', '程序分析'],
      sourceVerified: true,
      sourcePage: 3,
      sourceUrl: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2023%E5%B9%B412%E6%9C%88-C%2B%2B1%E7%BA%A7.pdf',
      reviewedBy: "AI-Codex",
      reviewedAt: "2026-11-06",
        },
    {
      id: 9,
      type: 'single',
      question: `下面 C++ 代码用于判断一个数是否为质数（素数），在横线处应填入代码是（　）。

\`\`\`cpp
cin >> N;
cnt = 0;
for (int i = 1; i < N + 1; i++)
    if (N % i == 0)
        ________;
if (cnt == 2)
    cout << N << "是质数。";
else
    cout << N << "不是质数。";
\`\`\``,
      options: ["cnt = 1", "cnt = 2", "cnt =+ 1", "cnt += 1"],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\n循环枚举1至N，N%i==0时找到一个因数，应把cnt加1，故选D。质数恰有1和自身两个正因数，故cnt==2时判质数。A和B反复覆盖计数，C的cnt=+1只是把正数1赋给cnt，均不能统计因数个数。",
            tags: ['输入输出'],
        },
    {
      id: 10,
      type: 'single',
      question: `对下面的代码，描述正确的是（　）。

\`\`\`cpp
#include <stdlib.h>

using namespace std;

int main(){
    int arr[] = {2,6,3,5,4,8,1,0,9,10};
    for(int i = 0;i < 10;i++)
        cout << arr[i] << " ";
    cout << i << endl;

    cout << endl;
    return 0;
}
\`\`\``,
      options: ["输出2 6 3 5 4 8 1 0 9 10 10", "输出2 6 3 5 4 8 1 0 9 9", "输出2 6 3 5 4 8 1 0 9 10", "提示有编译错误"],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\n选D，程序不能编译。仅包含stdlib.h，缺少声明cout与endl的iostream；此外i在for初始化处声明，其作用域在for结束时终止，后面的cout<<i越界使用。即使补上iostream，仍存在i未声明的问题，因此A、B、C的输出都不会发生。",
            tags: ['条件判断', '输入输出'],
        },
    {
      id: 11,
      type: 'single',
      question: `执行下面 C++ 代码后输出是（　）。

\`\`\`cpp
cnt = 0;
for (i = 10; i > 3; i -= 3)
    cnt = cnt + i;
cout << cnt;
\`\`\``,
      options: ["3", "21", "27", "49"],
      answer: 1,
      score: 2,
      explanation: "**答案：B**\n\ni从10开始，每轮减3，且要求i>3，因此进入循环体时依次为10、7、4，cnt累计为10、17、21。下一次i=1，不满足条件，输出21，选B。不要把退出时的1也加进去。",
            tags: ['字符与ASCII', '计算机基础'],
        },
    {
      id: 12,
      type: 'single',
      question: `定义变量char c，下面对c赋值的语句，不符合语法的是 ( ) 。`,
      options: ["c = (char)66;", "c = (char)(66);", "c = char(66);", "c = char 66;"],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\nA和B是C风格显式转换，C是函数式转换，均把66转换为char。D的char 66缺少函数式转换所需的圆括号，语法不合法，因此选D。转换后若使用ASCII兼容编码，对应字符B，但这不影响本题语法判断。",
            tags: ['进制转换'],
        },
    {
      id: 13,
      type: 'single',
      question: `下图所示 C++ 代码对大写字母'A'到'Z'分组，对每个字母输出所属的组号，那么输入'C'时将输出的组号是？（　）

\`\`\`cpp
char c;
while(1){
    cin >> c;
    if(c=='q') break;
    switch(c){
        case 'A': cout << "1 "; break;
        case 'B': cout << "3 ";
        case 'C': cout << "3 ";
        case 'D': cout << "5 "; break;
        case 'E': cout << "5 "; break;
        default: cout << "9 ";
    }
    cout << endl;
}
\`\`\``,
      options: ["3", "3 5", "3 5 9", "以上都不对"],
      answer: 1,
      score: 2,
      explanation: "**答案：B**\n\n输入C后从case C进入，先输出3。该分支没有break，继续执行case D，输出5，随后遇到break退出switch，所以输出3 5，选B。不会倒回执行case B，也不会越过case D的break进入后续分支。",
            tags: ['计算机基础'],
        },
    {
      id: 14,
      type: 'single',
      question: `某公司新出了一款无人驾驶的小汽车，通过声控智能驾驶系统，乘客只要告诉汽车目的地，车子就能自动
选择一条优化路线，告诉乘客后驶达那里。请问下面哪项不是驾驶系统完成选路所必须的。（ ）`,
      options: ["麦克风", "扬声器", "油量表", "传感器"],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\n按题目所述的声控选路功能，麦克风接收目的地，扬声器告知路线，传感器提供环境信息；油量表用于显示油量，不是该功能选路所必需，因此选C。不要把“有助于驾驶的设备”都等同于“完成本题选路所必需的设备”。",
            tags: ['计算机基础'],
        },
    {
      id: 15,
      type: 'single',
      question: `现代计算机是指电子计算机，它所基于的是（ ）体系结构。`,
      options: ['艾伦·图灵', '冯·诺依曼', '阿塔纳索夫', '埃克特-莫克利'],
      answer: 1,
      score: 2,
      explanation: "**答案：B**\n\n本题所考的基础体系结构是冯·诺依曼体系结构，因此选B。它以存储程序为核心，程序指令和数据保存在存储器中，由运算器、控制器、存储器、输入设备和输出设备协同工作。不能把图灵的理论模型与本题所问的体系结构名称混淆。",
            tags: ['计算机基础'],
        },

    // 16-25 判断题
    {
      id: 16,
      type: 'judge',
      question: `C++ 表达式 int(3.14) 的值为 3。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: "**判断：正确**\n\nint(3.14)把浮点数显式转换为int，丢弃小数部分，得到3，判断正确。该转换向零截断，不是四舍五入；例如int(3.9)也得到3。\n\n同理int(-3.9)得到-3，说明它按向零方向舍弃小数部分；转换不会保留浮点类型，也不根据小数点后第一位决定是否进位。",
      tags: ['数据类型'],
        },
    {
      id: 17,
      type: 'judge',
      question: `C++ 语句 cout << (2 * 3, 3 % 10, 2 + 3) 的输出为 6,3,5 。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\n括号内是逗号表达式，依次计算2*3、3%10、2+3，整个表达式的值取最后一项5。cout只输出5，不会依次输出6、3、5，因此判断错误。若需要分别输出三个值，必须分别使用输出运算符。",
      tags: ['运算符'],
        },
    {
      id: 18,
      sourceIntegrity: 'official-source-defect',
      integrityNote: 'SOURCE-DOUBT：mirror原卷p5的for更新表达式后多分号，语法不合法；保留原文及answer=1，暂停计分，等待来源澄清。',
      type: 'judge',
      question: "for(int i = 1; i < 10; i += 3;) ; 表示i从1开始到10结束间隔为3，相当于1、4、7、10。",
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**原卷缺陷，暂停计分**\n\n原卷p5确实写成for(int i = 1; i < 10; i += 3;) ;，更新表达式后的额外分号导致语法错误，不能编译。保留原文及官方“错误”答案，标记official-source-defect并暂停计分，等待来源澄清。若删除该分号，则循环体执行时i为1、4、7，更新到10后条件为假；但这只是对可能意图的说明，不能替代原卷或声称i从未更新到10。",
      tags: ['循环'],
        },
    {
      id: 19,
      type: 'judge',
      question: `C++ 表达式 010 + 100 + 001 的值为 111。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\n以0开头的整数常量010和001采用八进制：010等于十进制8，001等于1，而100为十进制100。相加得到8+100+1=109，并非111，因此判断错误。不能把前导0一律当作无意义的格式补位。",
      tags: ['进制转换'],
        },
    {
      id: 20,
      type: 'judge',
      question: `if 语句中的条件表达式的结果可以为 int 类型。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: "**判断：正确**\n\nif条件可以使用int表达式，求值后会转换为真假：0为假，非0为真，因此判断正确。条件不要求必须写成关系表达式或bool变量，但应注意赋值和比较的区别。",
      tags: ['条件判断'],
    },
    {
      id: 21,
      type: 'judge',
      question: `在下面的C++代码 while(1) continue; 中，由于循环中的 continue 是无条件被执行，因此将导致死循环。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: "**判断：正确**\n\nwhile(1)的条件恒为真，循环体只有continue，它使控制回到下一次条件判断，仍为真。因此此代码不会自然终止，判断正确。死循环来自恒真条件且没有退出路径，不能推广为任何出现continue的循环都会死循环。",
      tags: ['循环'],
        },
    {
      id: 22,
      type: 'judge',
      question: "C++表达式 ('1'+'1'=='2'? flag=1:flag=2) 的结果值和表达式 (flag==2) 的相同。",
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\n按常见ASCII兼容编码，'1'+'1'得到98，'2'为50，条件为假，因此选择flag=2分支。赋值表达式的结果值为2；随后flag==2为true，按数值表示为1，两者不相等，原叙述错误。表达式结果是数值2，与“该数作为条件时为真”是不同的问题。",
      tags: ['运算符'],
    },
    {
      id: 23,
      type: 'judge',
      question: `在C++的程序中，不能用 scanf 作变量名。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\nscanf是标准库函数名，不是C++关键字。局部作用域可以声明同名变量，从而遮蔽外层同名函数，因此“不能用scanf作为变量名”的绝对说法错误。同一作用域与既有函数声明冲突的情况需另行判断，实际编程应避免这样的命名。",
      tags: ['变量与标识符'],
        },
    {
      id: 24,
      type: 'judge',
      question: `小杨最近在准备考GESP，他用Dev C++来练习和运行程序，所以Dev C++也是一个小型操作系统。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\nDev C++是用于编写、编译和调试程序的集成开发环境，运行在操作系统之上，不负责操作系统的全部资源管理职责，因此原叙述错误。能够运行程序的软件不一定就是操作系统。",
      tags: ['计算机基础'],
    },
    {
      id: 25,
      type: 'judge',
      question: `任何一个 while 循环都可以转化为等价的 for 循环。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: "**判断：正确**\n\nwhile(条件){循环体}可以写成for(;条件;){循环体}，省略for的初始化与更新部分，保留原条件和循环体，因此判断正确。此转换不会新增更新表达式，原有continue也会重新检查条件，控制流程保持一致。",
      tags: ['循环'],
        },

    // 26-27 编程题
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `1
6`, output: `7` },
        { input: `5
3`, output: `1` }
      ],
      referenceCode: "#include <iostream>\nusing namespace std;\nint main() {\n    int x, n;\n    cin >> x >> n;\n    int res = (x + n) % 7;\n    if (res == 0) res = 7;\n    cout << res << endl;\n    return 0;\n}",
      question: "\n# [GESP202312 一级] 小杨的考试\n\n## 题目描述\n\n今天是星期 $X$，小杨还有 $N$ 天就要考试了，你能推算出小杨考试那天是星期几吗？（本题中使用 $7$ 表示星期日）\n\n## 输入格式\n\n输入 $2$ 行，第一行一个整数 $X(1\\le X \\le 7)$；第二行一个整数 $N(1≤N≤364)$。\n\n## 输出格式\n\n输出一个整数，表示小杨考试那天是星期几。\n\n## 特别提醒\n\n在本场考试中，请不要在输入、输出中附带任何提示信息。\n",
      template: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}`,
      
      score: 25,
      explanation: "**解析**\n\n参考程序先计算res=(X+N)%7，结果为0时改为7，以符合星期日用7表示的约定。这与(X-1+N)%7+1等价。样例1为(1+6)%7=0，输出7；样例2为(5+3)%7=1，输出1。N为7的倍数时星期保持不变。时间O(1)，空间O(1)，输出不附带提示。",
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.operator, LEVEL1_TAGS.condition],
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `5
2`, output: `1
3
5` },
        { input: `10
3`, output: `1
2
4
5
7
8
10` }
      ],
      referenceCode: "#include <iostream>\nusing namespace std;\nint main() {\n    int n, m;\n    cin >> n >> m;\n    for (int i = 1; i <= n; i++) {\n        if (i % m != 0) {\n            cout << i << \"\\n\";\n        }\n    }\n    return 0;\n}",
      question: "\n# [GESP202312 一级] 小杨报数\n\n## 题目描述\n\n小杨需要从 $1$ 到 $N$ 报数。在报数过程中，小杨希望跳过 $M$ 的倍数。例如，如果 $N=5$， $M=2$ ，那么小杨就需要依次报出 $1$、$3$、$5$。\n\n现在，请你依次输出小杨报的数。\n\n## 输入格式\n\n输入 $2$ 行，第一行一个整数 $N（1 \\le N \\le 1,000）$；第二行一个整数 $M（2 \\le M \\le 100）$。\n\n## 输出格式\n\n输出若干行，依次表示小杨报的数。\n\n## 特别提醒\n\n在本场考试中，请不要在输入、输出中附带任何提示信息。\n",
      template: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}`,
      
      score: 25,
      explanation: "**解析**\n\n从1依次枚举到N，若i%M!=0便输出i，每个数占一行；余数为0时跳过。枚举上界必须包含N，且只能跳过M的倍数。N=5、M=2时输出1、3、5；N=10、M=3时跳过3、6、9，输出1、2、4、5、7、8、10。时间O(N)，额外空间O(1)，M大于N时应输出全部1至N。",
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.condition],
    }
  ]
};
