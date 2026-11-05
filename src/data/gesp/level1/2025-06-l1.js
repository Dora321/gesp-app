import { LEVEL1_TAGS } from './shared.js';

export const paperData = {
  id: '2025-06-l1',
  title: '2025年06月 GESP C++ 一级认证真题',
  level: 1,
  year: 2025,
  month: 6,
  session: 10,
  timeLimit: 5400,
  source: {
    officialPdf: '',
    url: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B1%E7%BA%A7.pdf",
    type: 'public-recovery',
  },
  confidence: {
    answer: 1.0,
    statement: 1.0,
  },
  verification: {
  status: "verified",
  reviewedBy: "AI-Codex",
  reviewedAt: "2026-11-06",
  scope: "全卷五维逐题对照mirror PDF；参考代码独立编译运行，源疑点保持隔离。",
  notes: "AI-Codex对照mirror PDF全部8页文本及渲染；Git blob SHA 6db00b1b0e08ad52afae2ace659ac6ec63160f15一致。恢复Q2/Q3/Q10/Q11原题及编程范围、可编译模板；25个answer字段保持。解析为AI逻辑复核，参考代码有GNU C++17独立运行证据。",
  dimensions: {
    statement: "verified",
    options: "verified",
    answer: "verified",
    explanation: "verified",
    referenceCode: "verified"
  }
},
  questions: [
    // 1-15 单选题
    {
      id: 1,
      type: 'single',
      question: "2025年4月19日在北京举行了一场颇为瞩目的人形机器人半程马拉松赛。比赛期间，跑动着的机器人会利用身上安装的多个传感器所反馈的数据来调整姿态、保持平衡等，那么这类传感器类似于计算机的（ ）。",
      options: ['处理器', '存储器', '输入设备', '输出设备'],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\n传感器把机器人的姿态、平衡等状态转为数据送入控制系统，功能对应计算机的输入设备，选C。处理器据此计算控制方案，存储器保存数据，输出设备将结果向外呈现。判断硬件类别应看数据流向，不能因为传感器用于平衡控制就把它归为处理器。",
            tags: ['计算机基础', '输入输出'],
        },
    {
      id: 2,
      type: 'single',
      question: "在某集成开发环境中调试下面代码段时尝试设置断点和检查局部变量，下面哪个说法是错误的（ ）。\n\n```cpp\nint i,N = 0; // L1\ncin >> N; // L2\nfor (i = 1; i < 9; i++)\n    if (N % i == 0) break; // L3\nif (i < 9)\n    printf(\"N不能大于9\\n\"); // L4\n```",
      options: ["断点不可以设在L1标记的代码行","执行暂停在L2标记的代码行时，可以检测i的值","执行暂停在L3标记的代码行时，可以修改i的值","执行有可能暂停在L4标记的代码行"],
      answer: 0,
      score: 2,
      explanation: "**答案：A**\n\n断点通常可以设置在含可执行初始化的L1处，所以A的“不可以”错误。程序暂停时调试器可查看作用域内局部变量，也通常可以修改其值；到L3时i已由for初始化。L2处i尚未初始化，查看其内容不代表它具有可依赖的确定值。正常未优化调试场景下，N能被1整除使L4可达。",
            tags: ['计算机基础', '条件判断'],
        },
    {
      id: 3,
      type: 'single',
      question: "对下列C++的代码，描述准确的是（ ）。\n\n```cpp\nint first = 10;\nprintf(\"{%d}\\n\", First)\n```",
      options: ["执行后输出10","执行后输出{First}","执行后输出\"{First}\"","编译报错，因为First应该是first"],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\nC++区分大小写，只声明first而使用First，后者并未声明，不能编译，选D。原卷printf一行还没有末尾分号，完整语句同样需要补分号；不能据此编造一个运行输出。格式串中的花括号若在合法调用中会原样输出，但本题在编译阶段已失败。",
            tags: ['计算机基础', '输入输出'],
        },
    {
      id: 4,
      type: 'single',
      question: `在C++中，下列可以做变量名的是( )。`,
      options: ['X.cpp', 'X-cpp', 'X#cpp', 'X_cpp'],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\nX_cpp由字母和下划线组成，并以字母开头，是合法标识符，选D。X.cpp含点号，X-cpp含减号，X#cpp含井号，都不能作为单个变量名。文件名允许出现的字符不等同于C++标识符允许的字符，不能因为X.cpp像源码文件名就判其能做变量名。",
            tags: ['变量与标识符'],
        },
    {
      id: 5,
      type: 'single',
      question: `C++表达式 14-3 * 3 % 2 的值是( )。`,
      options: ['0', '11', '13', '-67'],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\n先算3*3=9，再求9%2=1，最后14-1=13，选C。乘法和求余同级，按左结合分组；它们的优先级均高于减法。不能先计算14-3，也不能把余数当成商。所有操作数都是整数，计算过程没有小数类型转换。",
            tags: ['运算符'],
        },
    {
      id: 6,
      type: 'single',
      question: "下面的C++代码执行后，其输出是 ( )。\n```cpp\nint x = 10, y = 20;\nx = x+y;\ny = x-y;\nx = x-y;\ncout << x << ' ' << y;\n```",
      options: ['10 20', '20 10', '10 10', '20 20'],
      answer: 1,
      score: 2,
      explanation: "**答案：B**\n\n开始x=10、y=20。执行x=x+y后x=30；执行y=x-y后y=10；最后x=x-y得到20，输出20 10，选B。每一步都使用当前变量值，不能把x一直看成原来的10。该方法完成交换，但对任意大整数使用加法交换仍需防止溢出。",
            tags: ['输入输出', '数据类型'],
        },
    {
      id: 7,
      type: 'single',
      question: `定义整型变量 int a=16 ，则执行 ++a += 3 之后，a的值会是（ ）。`,
      options: ["3", "17", "19", "20"],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\n前置++a先把a从16改为17，并得到指向a的可修改左值。再对它执行+=3，将a改为20，所以选D。++a并非只能作为一次性的数值结果使用，不能因为它写在复合赋值左边就判语法错误；也不能漏掉前置自增带来的1。",
            tags: ['数据类型', '运算符'],
        },
    {
      id: 8,
      type: 'single',
      question: `已知 C++ 的 int 类型变量 x 的值为 8，如果执行 cout << (++x)++ ; 则输出和执行后 x 的值分别是 ( )。`,
      options: ['8 9', '9 9', '9 10', '编译错误，无法执行'],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\n先执行前置++x，将8改为9，并返回x的左值；外层后置++可作用在该左值上，先产生旧值9供cout输出，再把x改为10。因此选C，输出9而执行后x为10。这里不是两个互不相关的未排序自增，不能简单套用“多个++必然错误”的判断。",
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 9,
      type: 'single',
      question: `下面 C++ 代码执行后的输出是（　）。

\`\`\`cpp
int a, b;
a = 3;
b = 4;
printf("a+b=%02d#a+b={a+b}", a + b, a + b);
\`\`\``,
      options: ["a+b=07#a+b={a+b}", "a+b= 7#a+b=7", "a+b=7#a+b={a+b}", "a+b=7#a+b=7"],
      answer: 0,
      score: 2,
      explanation: "**答案：A**\n\na+b=7，%02d以最小宽度2并用0填充，输出07。格式串其余部分a+b=与#a+b={a+b}均原样输出，完整为a+b=07#a+b={a+b}，选A。格式串只有一个转换说明，多提供的第二个a+b参数会被求值但不会再追加到输出。",
            tags: ['输入输出', '数据类型'],
        },
    {
      id: 10,
      type: 'single',
      question: `下面的C++代码用于求M天后是星期几，两处横线处分别应填入的代码是（ ）。\n\`\`\`cpp\nint N, M, D;\ncout << "当前星期几? "; // 星期日是0\ncin >> N;\ncout << "求多少天后? "; // 输入正整数\ncin >> M;\nD = ____________;\nif (____________)\n    printf("%d天后是星期日", M);\nelse\n    printf("%d天后是星期%d", M, D);\n\`\`\``,
      options: ["```cpp\n(N + M) / 7\nD == 0\n```","```cpp\n(N + M) % 7\nD == 0\n```","```cpp\n(N + M) / 7\nD <= 0\n```","```cpp\n(N + M) % 7\nD = 0\n```"],
      answer: 1,
      score: 2,
      explanation: "**答案：B**\n\n星期周期为7，N+M对7取余才能得到0至6范围内的新星期数；D==0表示星期日，故选B。A、C用了商，不能得到周期位置。D的第二行实际是D=0赋值，不是D<=0，会把D改为0且条件为假，因此错误，不能沿用旧题库的重复比较选项。",
            tags: ['运算符', '条件判断'],
        },
    {
      id: 11,
      type: 'single',
      question: "下面C++代码执行后输出是（ ）。\n\n```cpp\nint i;\nfor (i = 1; i < 11; i += 3){\n    continue;\n    if (i % 2 == 0)\n        break;\n    printf(\"%d#\", i);\n}\nif (i >= 11)\n    printf(\"END\");\n```",
      options: ["END","1#","1#4#END","1#4#7#10#END"],
      answer: 0,
      score: 2,
      explanation: "**答案：A**\n\n每轮循环一进入就执行continue，后面的if、break和printf全部被跳过，但for更新i+=3仍执行。i依次进入1、4、7、10四轮，随后更新为13，i<11为假退出。13>=11成立，最后只输出END，选A。原卷不是题库此前错置的while相向更新题。",
            tags: ['循环', '输入输出'],
        },
    {
      id: 12,
      type: 'single',
      question: `下面的 C++ 代码用于求 N 的所有因数（即能将 N 整除的数），如输入 12 则将输出 12,6,4,3,2,1。横线处应填入（　）。

\`\`\`cpp
int i, N;
cin >> N;
i = N;
while (_______){
    if (N % i == 0)
        printf("%d,", i);
    i -= 1;
}
printf("1");
\`\`\``,
      options: ["i -= 1", "i == 1", "i > 1", "i >= 1"],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\ni从N向下枚举，循环只处理大于1的候选；因数命中时输出数字及逗号，循环外最后单独输出1，故应填i>1，选C。填i>=1会让1被打印两次，且其中一次带逗号。i==1不能完成从N开始的下降枚举，i-=1还会在条件中额外修改i。",
            tags: ['运算符'],
        },
    {
      id: 13,
      type: 'single',
      question: `下面 C++ 代码执行后输出的是（　）。

\`\`\`cpp
int Sum = 0;
for (int i = 0; i < 10; i++){
    if (i % 2 == 0)
        continue;
    if (i % 5 == 0)
        break;
    Sum += i;
}
cout << Sum;
\`\`\``,
      options: ["55", "15", "9", "4"],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\n偶数首先continue，所以0、2、4等不再进行后续判断。i=1时加入1，i=3时加入3，Sum=4；i=5为奇数但又满足i%5==0，于累加前break，之后所有数字不处理。因此输出4，选D。判断和累加的先后位置决定5不会加入。",
            tags: ['循环', '条件判断'],
        },
    {
      id: 14,
      type: 'single',
      question: `试图编译并执行下面 C++ 代码，下面描述正确的是（　）。

\`\`\`cpp
float x;
x = 101;
x++;
cout << ++x;
\`\`\``,
      options: ["输出101", "输出102", "输出103", "编译将报错，无法执行"],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\nfloat也允许前置和后置自增。x=101后x++使其变为102，随后++x先改为103再传给cout，输出103，选C。默认流格式在这个整数值上无需显示小数点，不会因为变量为float就自动输出103.000000，更不构成编译错误。",
            tags: ['变量与标识符', '数据类型'],
        },
    {
      id: 15,
      type: 'single',
      question: `以下 C++ 代码可以找出百位、十位和个位满足特定条件的三位数，横线处应该填入的是（ ）。

\`\`\`cpp
int count = 0;
for (int i = 100; i <= 999; i++) {
    int a = i / 100;
    _________________________
    int c = i % 10;
    if (a * a + b * b == c * c) {
        count++;
    }
}
\`\`\``,
      options: ["int b = (i / 10) / 10;", "int b = (i / 10) % 10;", "int b = (i % 10) / 10;", "int b = (i % 10) % 10;"],
      answer: 1,
      score: 2,
      sourceVerified: true,
      sourcePage: 5,
      sourcePages: [4, 5],
      reviewedBy: "AI-Codex",
      reviewedAt: "2026-11-06",
      explanation: "**答案：B**\n\n十位数字应先用i/10去掉个位，再对10求余得到，所以填int b=(i/10)%10，选B。A再次除10得到百位，C把个位除10恒得0，D得到的仍是个位。与已有a=i/100、c=i%10配合，才能按百位平方加十位平方等于个位平方的条件筛选。",
            tags: ['数位分离', '整除与取模'],
        },

    // 16-25 判断题
    {
      id: 16,
      type: 'judge',
      question: `人们在参加很多闭卷考试时通常都不允许带智能手机、平板电脑等，此外很多种智能手表同样因具有嵌入式操作系统及通信等功能，所以也不允许随身携带。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: "**判断：正确**\n\n题目描述的是许多闭卷考试对可存储信息或通信的智能设备的常见限制。智能手表也可能具有嵌入式操作系统、存储和通信能力，因此按本题判断正确。该基础知识题不能当作每场考试的具体携带规则；实际规则应以相应考试要求为准。",
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 17,
      type: 'judge',
      question: `如果N是C++的整型变量，值为5，则表达式 (N + !N) 的值为4。 ( )`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\nN=5为非零值，所以!N为false，参与整数运算时转为0。N+!N=5+0=5，而非4，因此判断错误。逻辑非改变的是真假状态，并不表示把数值减1，也不能把!N看作负数-N。",
            tags: ['运算符'],
        },
    {
      id: 18,
      type: 'judge',
      question: `在下面C++代码中，删除break语句对程序执行结果没有影响。\n\n\`\`\`cpp\nint i;\nfor (i = 0; i < 10; i++){\n    continue;\n    cout << i << "#";\n    break;\n}\nif (i >= 10)\n    cout << "END";\n\`\`\``,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: "**判断：正确**\n\n循环体第一条continue使其后的cout和break都不可达。因此无论是否删除break，i均按for的更新从0走到10，循环体内无输出，循环后输出END，叙述正确。不可达语句被删去并不改变这里的执行轨迹，不能误把它当作必执行的退出语句。",
            tags: ['循环'],
        },
    {
      id: 19,
      type: 'judge',
      question: `删除下面C++代码中的continue后其输出是0#2#4#6#8#。\n\n\`\`\`cpp\nint i;\nfor (i = 0; i < 10; i++){\n    if (i % 2 == 0){\n        cout << i << "#";\n        continue;\n    }\n}\nif (i >= 10)\n    cout << "END";\n\`\`\``,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\n删去continue后仍只在偶数时输出i#，因为if结束后已经到循环体末尾。循环正常完成后i=10，外面的条件i>=10成立，还会输出END。因此完整输出为0#2#4#6#8#END，原叙述漏了END，判断错误。",
            tags: ['循环'],
        },
    {
      id: 20,
      type: 'judge',
      question: `将下面C++代码中的 i < 100; i = i + 1 修改为 i < 200; i += i + 1，其输出与当前代码输出相同。\n\n\`\`\`cpp\nint cnt = 0;\nfor (int i = 0; i < 100; i = i + 1)\n    cnt += 1;\ncout << cnt;\n\`\`\``,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\n原循环i=0至99，共100轮，输出100。修改后的i+=i+1使新i=2*i+1，进入循环时依次是0、1、3、7、15、31、63、127，共8轮，随后更新为255退出，输出8。两者不同，判断错误；i+=i+1不是i=i+1。",
            tags: ['循环'],
        },
    {
      id: 21,
      type: 'judge',
      question: `交换下面C++代码中的 i += 2 和 cnt += 1，交换前后分别运行的两次输出相同。\n\n\`\`\`cpp\nint i, cnt = 0;\ncnt = 0;\nwhile (i < 10){\n    i += 2;\n    cnt += 1;\n}\ncout << cnt;\n\`\`\``,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\n局部变量i没有初始化，第一次while(i<10)就读取未确定的值，不能保证原程序具有确定结果，更不能保证两次独立运行输出相同，判断错误。cnt初始化为0不会顺便初始化i。可以解释若先给i确定值时两条独立更新的次序，但不能擅自在原题补初值。",
            tags: ['变量与标识符', '循环'],
        },
    {
      id: 22,
      type: 'judge',
      question: `下面的C++代码执行后将输出45。\n\n\`\`\`cpp\nint cnt;\nfor (int i = 0; i < 10; i++)\n    cnt += 1;\ncout << cnt;\n\`\`\``,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\ncnt未初始化却在cnt+=1中先读取旧值，程序不能保证有确定的输出，更不能断言45，判断错误。即使另外把cnt设为0，这段循环也只是每轮加1，共10轮得到10，并非求0至9之和45。不要将未初始化说成一个可预测的随机整数。",
            tags: ['循环'],
        },
    {
      id: 23,
      type: 'judge',
      question: `执行C++代码 cout << (12 + 12.12) 将报错，因为12是int型，而12.12是float型，不同类型不能直接运算。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\nC++允许算术类型按常规转换规则共同运算。12为int，12.12是默认double字面量而非float；12会转为double后相加，默认输出24.12，不会因类型不同而报错，所以判断错误。值的精确二进制表示和流显示格式是另外的问题。",
            tags: ['数据类型', '运算符'],
        },
    {
      id: 24,
      type: 'judge',
      question: `在C++代码中，不可以将变量命名为false，因为false是C++语言的关键字。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: "**判断：正确**\n\nfalse是C++关键字，用于布尔字面量，不能被用户用作变量名，原叙述正确。它不是某个库函数或普通对象名，不会像cout、printf那样仅涉及名字遮蔽。判断命名是否合法时，除字符组成之外还需排除语言保留关键字。",
            tags: ['变量与标识符'],
        },
    {
      id: 25,
      type: 'judge',
      question: `X是C++的整型变量，则表达式 3 < X < 5 求值结果是4。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\n3<X<5按左结合分组为(3<X)<5。第一次比较得到bool的false或true，第二次比较时相应转为0或1，两者都小于5，所以结果为true，不能为数值4，判断错误。若要表示3与5之间的整数，应写3<X && X<5。",
            tags: ['运算符', '条件判断'],
        },

    // 26-27 编程题
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `8
3
2`, output: `6` },
        { input: `19
3
30`, output: `19` }
      ],
      referenceCode: `#include <iostream>
using namespace std;
int main() {
    long long n, k, t;
    cin >> n >> k >> t;
    cout << (n < k * t ? n : k * t) << "\\n";
    return 0;
}`,
      question: "\n# [GESP202506 一级] 假期阅读\n\n## 题目描述\n\n小 A 有一本厚厚的书。这本书总共有 $n$ 页，小 A 一天中最多只能阅读完其中的 $k$ 页。小 A 的假期总共有 $t$ 天，他想知道在假期中最多能阅读完这本书的多少页。\n\n## 输入格式\n\n第一行，一个正整数 $n$，表示书的页数。\n\n第二行，一个正整数 $k$，表示小 A 每天最多阅读的页数。\n\n第三行，一个正整数 $t$，表示小 A 假期的天数。\n\n对于所有测试点，保证 $n,k,t$ 均不超过 $1000$。\n\n## 输出格式\n\n一行，一个整数，表示假期中所能阅读的最多页数。\n",
      template: "#include <iostream>\nusing namespace std;\nint main() {\n    // 在此填写代码\n    return 0;\n}",
      answer: '',
      score: 25,
      explanation: "**解析**\n\n最多可读的页数既不能超过每天k页乘t天的总量，也不能超过全书n页，所以取min(n,k*t)。样例8、3、2得到6；19、3、30即使容量90页，也只能读19页。原卷n,k,t为不超过1000的正整数，乘积至多1000000；参考程序long long足够，时间和额外空间均O(1)。",
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.condition, LEVEL1_TAGS.operator],
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `4
6`, output: `12` }
      ],
      referenceCode: `#include <iostream>
using namespace std;
long long gcd(long long a, long long b) {
    return b == 0 ? a : gcd(b, a % b);
}
int main() {
    long long m, n;
    cin >> m >> n;
    cout << (m / gcd(m, n)) * n << "\\n";
    return 0;
}`,
      question: "\n# [GESP202506 一级] 值日\n\n## 题目描述\n\n小杨和小红是值日生，负责打扫教室。小杨每 $m$ 天值日一次，小红每 $n$ 天值日一次。今天他们两个一起值日，请问至少多少天后，他们会再次同一天值日？\n\n## 输入格式\n\n第一行，一个正整数 $m$，表示小杨的值日周期；\n\n第二行，一个正整数 $n$，表示小红的值日周期。\n\n对于所有测试点，保证 $1 \\le m,n \\le 100$。\n\n## 输出格式\n\n一行，一个整数，表示至少多少天后他们会再次同一天值日。\n",
      template: "#include <iostream>\nusing namespace std;\nint main() {\n    // 在此填写代码\n    return 0;\n}",
      answer: '',
      score: 25,
      explanation: "**解析**\n\n再次同时值日所经过的正天数必须同时是m和n的倍数，最小值为最小公倍数。参考代码用gcd递归求最大公约数，再计算m/gcd(m,n)*n；先除再乘可降低中间乘积。样例4与6得到12，同周期时结果就是该周期。原卷1<=m,n<=100，结果不超过10000，时间O(log min(m,n))，额外递归空间同阶。",
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.operator],
    }
  ]
};
