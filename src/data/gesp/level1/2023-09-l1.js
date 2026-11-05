import { LEVEL1_TAGS } from './shared.js';

export const paperData = {
  id: '2023-09-l1',
  title: '2023年9月 GESP C++ 一级真题',
  level: 1,
  year: 2023,
  month: 9,
  session: 3,
  timeLimit: 5400,
  source: {
    officialPdf: '',
    url: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2023%E5%B9%B49%E6%9C%88-C%2B%2B1%E7%BA%A7.pdf',
    type: 'public-recovery',
  },
  verification: {
  status: "verified",
  reviewedBy: "AI-Codex",
  reviewedAt: "2026-11-06",
  scope: "全卷五维逐题核验；2道编程题独立编译运行。",
  notes: "AI-Codex对照mirror PDF全部8页文本及渲染，Git blob SHA 799df3436d987adf8ecbb6ec1513d1dd02fcb66b一致；答案未改。编程代码GNU C++17共84组检查通过，另10组客观代码通过。",
  dimensions: {
    statement: "verified",
    options: "verified",
    answer: "verified",
    explanation: "verified",
    referenceCode: "verified"
  }
},
  questions: [
    {
      id: 1,
      type: 'single',
      question: `我们通常说的“内存”属于计算机中的（ ）。`,
      options: ['输出设备', '输入设备', '存储设备', '打印设备'],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\n内存用于保存运行中的程序和数据，属于存储设备，选C。显示器、打印机等属于输出设备，键盘等属于输入设备。运算器和控制器构成CPU的主要部分，不能把内存也算入CPU。",
            tags: ['计算机基础', '输入输出'],
        },
    {
      id: 2,
      type: 'single',
      question: `以下 C++ 不可以作为变量的名称的是（ ）。`,
      options: ['redStar', 'RedStar', 'red_star', 'red star'],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\n变量名不能含有空格，因此red star会被分成两个记号，选D。redStar、RedStar与red_star均符合命名规则；C++区分大小写，也允许下划线。",
            tags: ['变量与标识符'],
        },
    {
      id: 3,
      type: 'single',
      question: `C++ 表达式 2-1 && 2 % 10 的值是（ ）。`,
      options: ['0', '1', '2', '3'],
      answer: 1,
      score: 2,
      explanation: "**答案：B**\n\n先做算术运算：2-1=1，2%10=2；两个值都非零，因此逻辑与结果为true，按数值表示为1，选B。逻辑与不会返回原操作数2。\n\n逻辑运算符的结果类型是bool；默认输出流没有启用boolalpha时，true显示为1。注意算术运算得到的1与2只用于判断真假，不能把二者相加作为本题结果。",
            tags: ['运算符'],
        },
    {
      id: 4,
      type: 'single',
      question: `下面C++代码段执行后的输出是（ ）。

\`\`\`cpp
int a = 3, b = 4;
cout << "a+b=" << a+b;
\`\`\``,
      options: ['3+4= 7', '3+4=7', 'a+b=7', 'a+b=a+b'],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\n双引号内的a+b=作为字符串原样输出；引号外a+b计算3+4得到7，合起来为a+b=7，选C。A与B都错误地把字符串中的变量名替换成了数字，两项仅空格不同。",
            tags: ['输入输出', '运算符'],
        },
    {
      id: 5,
      type: 'single',
      question: `在 C++ 语言中，int 类型的变量 x、y、z 的值分别为 2、4、6，以下表达式的值为真的是（ ）。`,
      options: ["x > y || x > z","x != z - y","z > y + x","x < y || !x < z"],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\n代入x=2、y=4、z=6：A的两个比较均假；B为2!=2，假；C为6>6，假。D左侧2<4为真，逻辑或短路，整体为真，选D。原选项!x < z按(!x)<z结合：!2为false，转为0后0<6也是真，不能改写成!(x<z)。",
            tags: ['数据类型', '运算符'],
        },
    {
      id: 6,
      type: 'single',
      question: `对 int 类型的变量 a、b、c，下列语句不符合 C++ 语法的是（ ）。`,
      options: ['c += 5;', 'b = c % 2.5;', 'a = (b = 3, c = 4, b+c);', 'a -= a = (b = 6) / (c = 2);'],
      answer: 1,
      score: 2,
      explanation: "**答案：B**\n\n求余运算符%要求整数操作数，2.5为double，因此B不能编译。A为复合赋值，C为依次赋值再取b+c的逗号表达式，均合法。D按赋值的右结合规则解析，在C++17下右侧先求值，先把b=6、c=2及a=3完成，再执行a-=3；本题考语法，不应把难读的连续赋值误判成语法错误。",
            tags: ['数据类型'],
        },
    {
      id: 7,
      type: 'single',
      question: `下面 C++ 代码执行后的输出是（　）。

\`\`\`cpp
int m = 14;
int n = 12;
if (m % 2 == 0 && n % 2 == 0)
    cout << "都是偶数";
else if (m % 2 == 1 && n % 2 == 1)
    cout << "都是奇数";
else
    cout << "不都是偶数或奇数";
\`\`\``,
      options: ["都是偶数", "都是奇数", "不都是偶数或奇数", "以上说法都不正确"],
      answer: 0,
      score: 2,
      explanation: "**答案：A**\n\nm=14与n=12均为偶数，两个余数都为0，首个条件m%2==0 && n%2==0为真，输出“都是偶数”，选A。后面的else if与else被跳过。",
            tags: ['条件判断', '输入输出'],
        },
    {
      id: 8,
      type: 'single',
      question: "下面 C++ 代码执行后的输出是（ ）。\n\n```cpp\nint m = 14;\nint n = 12;\nif (m % 2 && n % 2)\n    cout << \"都是偶数\";\nelse if (m % 2 == 1 && n % 2 == 1)\n    cout << \"都是奇数\";\nelse\n    cout << \"不都是偶数或奇数\";\n```",
      options: ["都是偶数","都是奇数","不都是偶数或奇数","以上说法都不正确"],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\n14%2与12%2均为0，首个条件0&&0为假；第二个条件要求两个余数都为1，也为假。于是执行else，输出“不都是偶数或奇数”，选C。首个输出文字虽写“都是偶数”，但其条件实际判断两个余数非零，不能只看输出文字。",
            tags: ['条件判断', '输入输出'],
        },
    {
      id: 9,
      type: 'single',
      question: "下面 C++ 代码执行后的输出是（ ）。\n\n```cpp\nint m = 7;\nif (m / 5 || m / 3)\n    cout << 0;\nelse if (m / 3)\n    cout << 1;\nelse if (m / 5)\n    cout << 2;\nelse\n    cout << 3;\n```",
      options: ['0', '1', '2', '3'],
      answer: 0,
      score: 2,
      explanation: "**答案：A**\n\nm=7，整数除法m/5=1、m/3=2，均为非零。首个条件1||2为真，程序输出0并跳过其余分支，选A。此处是整数除法与逻辑或，不能擅自换成取余或独立的if语句。",
            tags: ['条件判断', '输入输出'],
        },
    {
      id: 10,
      type: 'single',
      question: "下面 C++ 代码段执行后的输出是（ ）。\n\n```cpp\nint cnt = 0;\nfor (int i = 1; i <= 5; i++)\n    cnt = cnt + 1;\ncout << cnt;\n```",
      options: ["1","4","5","10"],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\ni依次为1、2、3、4、5，共执行循环体5次。每次cnt仅加1，从0变为5，输出5，选C。注意cnt=cnt+1统计次数，不能当作cnt+=i求和得到15。",
            tags: ['循环', '输入输出'],
        },
    {
      id: 11,
      type: 'single',
      question: "下面 C++ 代码执行后的输出是（ ）。\n\n```cpp\nint tnt = 0;\nfor (int i = 1; i < 5; i += 2)\n    tnt = tnt + i;\ncout << tnt;\n```",
      options: ["2","4","9","10"],
      answer: 1,
      score: 2,
      explanation: "**答案：B**\n\n循环变量i从1开始，每次加2，且要求i<5，因此仅取1与3。tnt从0依次变成1、4；i更新到5时退出，输出4，选B。上界5不参与累加，9是误把5也加进来的结果。",
            tags: ['循环', '输入输出'],
        },
    {
      id: 12,
      type: 'single',
      question: `下面 C++ 代码段执行后的输出是（ ）。\n\`\`\`cpp\nint n = 5; int cnt = 1;\nwhile (n >= 0) {\n cnt += 1;\n n -= 2;\n}\ncout << cnt;\n\`\`\``,
      options: ["3","4","6","7"],
      answer: 1,
      score: 2,
      explanation: "**答案：B**\n\nn进入循环体时依次为5、3、1，共3轮；cnt从1开始，每轮加1，最终为4。第三轮后n变为-1，条件n>=0为假，输出4，选B。初值cnt=1，不能把输出当成循环次数3。",
            tags: ['循环', '输入输出'],
        },
    {
      id: 13,
      type: 'single',
      question: "下面 C++ 代码用于求正整数的所有因数，即输出所有能整除一个正整数的数。如，输入10，则输出为1、2、5、10；输入12，则输出为1、2、3、4、6、12；输入17，则输出为1、17。在横线处应填入代码是（ ）。\n\n```cpp\nint n = 0;\ncout << \"请输入一个正整数：\";\ncin >> n;\n\nfor (____________________) // 此处填写代码\n    if (n % i == 0)\n        cout << i << endl;\n```",
      options: ["int i = 1; i < n; i + 1","int i = 1; i < n + 1; i + 1","int i = 1; i < n; i++","int i = 1; i < n + 1; i++"],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\n正整数n的因数包含1和n本身，因此枚举应覆盖1至n。D以i=1开始，i<n+1等价于i<=n，每轮i++推动循环。A和B中的i+1只计算而不更新i，会使i停在1；C漏掉n。选择D，每个余数为0的i恰好输出一次。",
            tags: ['循环', '条件判断'],
        },
    {
      id: 14,
      type: 'single',
      question: "在下列代码的横线处填写（ ），可以使得输出是正整数1234各位数字的平方和。\n\n```cpp\nint n = 1234, s = 0;\nfor (; n; n /= 10)\n    s += __________; // 此处填写代码\ncout << s << endl;\n```",
      options: ["n / 10","(n / 10) * (n / 10)","n % 10","(n % 10) * (n % 10)"],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\n每轮n%10取得个位，平方为(n%10)*(n%10)，因此选D。循环末n/=10去掉已处理的个位，依次处理4、3、2、1，s依次为16、25、29、30。A、B处理的是去掉个位后的数，C只累加数字而没有平方。",
            tags: ['循环', '条件判断'],
        },
    {
      id: 15,
      type: 'single',
      question: "执行以下 C++ 语言程序后，输出结果是（ ）。\n\n```cpp\nint n = 5, s = 1;\nfor (; n = 0; n--)\n    s *= n;\ncout << s << endl;\n```",
      options: ["1","0","120","无法确定"],
      answer: 0,
      score: 2,
      explanation: "**答案：A**\n\nfor的条件是n=0，即赋值而非比较。第一次判断就把n设为0，赋值表达式的值也是0，条件为假，因此循环体与n--都不执行。s保持初值1，输出1，选A。不能把它误读成n!=0而计算5的阶乘120。",
            tags: ['循环', '条件判断'],
        },
    {
      id: 16,
      type: 'judge',
      question: "早期计算机内存不够大，可以将字库固化在一个包含只读存储器的扩展卡中插入计算机主板帮助处理汉字。",
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: "**判断：正确**\n\n只读存储器可以固化汉字字形等字库数据，安装相应扩展卡可辅助早期计算机处理汉字，题目叙述正确。只读指通常运行时不能像RAM那样随意改写，并不妨碍系统读取已保存的字库。",
            tags: ['计算机基础'],
        },
    {
      id: 17,
      type: 'judge',
      question: `“神威·太湖之光”超级计算机是中国自主研制的超级计算机，在全球超级计算机 TOP500 排行榜中多次荣膺榜首。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: "**判断：正确**\n\n这是对历史成绩的描述：神威·太湖之光是中国自主研制的超级计算机，曾多次位居TOP500榜首，因此判断正确。题目没有声称它在任何时刻都保持第一，不能把历史描述误读为当前排名。",
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 18,
      type: 'judge',
      question: `C++ 表达式 int(3.14) 的值为 3。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: "**判断：正确**\n\nint(3.14)把浮点数显式转换为int，舍弃小数部分，得到3，因此正确。转换是向零截断，而不是四舍五入；例如int(3.9)仍为3。\n\n对于负数同样向零截断，例如int(-3.9)为-3。不能因为原数小数部分较大就使用四舍五入，也不应把函数式转换写法误认成数学函数求整。",
            tags: ['数据类型'],
        },
    {
      id: 19,
      type: 'judge',
      question: `C++ 语句 cout << (2, 3, "23") 的输出为 2,3,23。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\n圆括号中是逗号表达式，依次求值2、3、\"23\"，整个表达式取最后一项字符串\"23\"。cout因此只输出23，不输出逗号或前两项，原叙述错误。逗号表达式不同于连续使用多个输出运算符。",
            tags: ['输入输出'],
        },
    {
      id: 20,
      type: 'judge',
      question: `C++ 的循环语句 for (int i = 0; i < 10; i += 2) 表示 i 从 0 开始到 10 结束但不包含 10，间隔为 2。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: "**判断：正确**\n\ni从0开始，每轮执行后加2，条件要求i<10，因此依次取0、2、4、6、8，更新为10后退出。题目明确不包含10，与实际执行一致，判断正确。",
            tags: ['循环', '数据类型'],
        },
    {
      id: 21,
      type: 'judge',
      question: `C++ 表达式 ('1'+'1') 的值为 '2'。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\n字符相加前发生整数提升。在常见ASCII兼容编码中，字符'1'的编码为49，49+49=98，而'2'的编码为50，二者不同，故错误。字符数字并不会自动转成其表示的数值再相加。",
            tags: ['字符与ASCII'],
        },
    {
      id: 22,
      type: 'judge',
      question: `在C++语言中，do-while 循环不可能导致死循环，但 while 有可能。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\ndo-while先执行循环体再判断条件，但并不保证终止。比如do {} while (true);会一直执行；while (true) {}也会一直执行，因此原叙述错误。是否死循环取决于条件能否变假或能否通过break等路径退出。",
      tags: ['循环结构'],
        },
    {
      id: 23,
      type: 'judge',
      question: `在下面的C++代码中，由于循环中的 continue 是无条件被执行，因此将导致死循环。\n\n\`\`\`cpp\nfor (int i = 1; i < 10; i++) continue;\n\`\`\``,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\nfor中的continue会跳过循环体剩余语句，随后仍执行更新表达式i++，再检查i<10。i从1依次取到9，共9轮，之后变为10退出，因此不会死循环，判断错误。不能把for中的continue理解成跳过更新步骤。",
      tags: ['循环结构'],
        },
    {
      id: 24,
      type: 'judge',
      question: `在C++代码中，不可以将变量命名为 cout，因为 cout 是C++的关键字。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\ncout不是C++关键字，而是标准库std命名空间中的输出流对象名。因此“因为cout是关键字所以不能命名”错误。局部变量可以叫cout并遮蔽通过using引入的名字，此时可用std::cout访问标准输出；同一作用域冲突则须另行分析。",
      tags: ['变量与标识符'],
        },
    {
      id: 25,
      type: 'judge',
      question: `C++ 是一种高级程序设计语言。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: "**判断：正确**\n\nC++属于高级程序设计语言，提供变量、类型、表达式、控制结构等抽象，通常经编译器翻译成机器指令执行，因此判断正确。可以进行底层内存操作并不改变其高级语言的分类。",
      tags: ['计算机基础'],
        },
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `1
1
1
20`, output: `Yes
10` },
        { input: `1
1
1
5`, output: `No
5` }
      ],
      referenceCode: "#include <iostream>\nusing namespace std;\nint main() {\n    int x, y, z, q;\n    cin >> x >> y >> z >> q;\n    int cost = 2 * x + 5 * y + 3 * z;\n    if (q >= cost) {\n        cout << \"Yes\" << endl << q - cost << endl;\n    } else {\n        cout << \"No\" << endl << cost - q << endl;\n    }\n    return 0;\n}",
      question: "\n# [GESP202309 一级] 买文具\n\n## 题目描述\n\n开学了，小明来到文具店选购文具。签字笔 $2$ 元一支，他需要 $X$ 支；记事本 $5$ 元一本，他需要 $Y$ 本；直尺 $3$ 元一把，他需要 $Z$ 把。小明手里有 $Q$ 元钱。请你通过编程帮小明算算，他手里的钱是否够买他需要的文具。\n\n## 输入格式\n\n输入 $4$ 行。\n\n第一行包含一个正整数 $X$，是小明购买签字笔的数量。约定 $1 \\le X \\le 10$。\n\n第二行包含一个正整数 $Y$，是小明购买记事本的数量。约定 $1 \\le Y \\le 10$。\n\n第三行包含一个正整数 $Z$，是小明购买直尺的数量。约定 $1 \\le Z \\le 10$。\n\n第四行包含一个正整数 $Q$，是小明手里的钱数（单位：元）。\n\n## 输出格式\n\n输出 $2$ 行。如果小明手里的钱够买他需要的文具，则第一行输出 `Yes`，第二行输出小明会剩下的钱数（单位：元）；否则，第一行输出 `No`，第二行输出小明缺少的钱数（单位：元）。\n",
      template: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}`,
      
      score: 25,
      explanation: "**解析**\n\n先读入X、Y、Z、Q，计算cost=2*X+5*Y+3*Z。若Q>=cost，输出Yes并在下一行输出Q-cost；否则输出No与cost-Q。相等时钱恰好够用，应输出Yes与0。两官方样例总价均为10，Q为20时剩10，为5时缺5。数量均不超过10，总价最多100；时间与额外空间均O(1)。",
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.operator],
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `7
1
10`, output: `7` },
        { input: `7
10
20`, output: `31` }
      ],
      referenceCode: "#include <iostream>\nusing namespace std;\nint main() {\n    long long k, l, r, sum = 0;\n    cin >> k >> l >> r;\n    for (long long i = l; i <= r; i++) {\n        if (i % 10 == k || i % k == 0) {\n            sum += i;\n        }\n    }\n    cout << sum << endl;\n    return 0;\n}",
      question: `
# [GESP202309 一级] 小明的幸运数

## 题目描述

所有个位数为 $k$ 的正整数，以及所有 $k$ 的倍数，都被小明称为“ $k$ 幸运数”。小明想知道正整数 $L$ 和 $R$ 之间（包括 $L$ 和 $R$）所有 $k$ 幸运数的和，你能帮帮他吗？

## 输入格式

输入 $3$ 行。第一行包含一个正整数 $k$，第二行包含一个正整数 $L$，第三行包含一个正整数 $R$。约定 $2 \\le k \\le 9$，$1 \\le L \\le R \\le 1000$。

## 输出格式

输出 $1$ 行，符合题意的幸运数之和。
`,
      template: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}`,
      
      score: 25,
      explanation: "**解析**\n\n枚举闭区间[L,R]，以i%10==k判断个位为k，以i%k==0判断k的倍数，两条件用||连接，满足任一条件便将i加入sum一次。sum初始为0；即使两个条件同时满足也只能加一次。样例1只有7符合，结果7；样例2为14与17，结果31。时间O(R-L+1)，空间O(1)，总和不超过1至1000之和500500，32位整数足够，参考程序使用long long也正确。",
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.condition, LEVEL1_TAGS.operator],
    }
  ]
};
