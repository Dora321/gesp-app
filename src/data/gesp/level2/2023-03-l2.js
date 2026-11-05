// 2023年3月 GESP C++ 二级真题 (第1次认证)
export const paperData = {
    id: '2023-03-l2',
    title: '2023年3月 GESP C++ 二级真题',
    level: 2,
    year: 2023,
    month: 3,
    session: 1,
    note: '首次认证',
    timeLimit: 90 * 60,
    source: {
    url: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2023%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
    type: "official",
    notes: "登记mirror提供的2023年3月GESP C++二级试卷解析，含逐题答案与第三方解析。"
},
    verification: {
    status: "partial",
    reviewedBy: "AI-Codex",
    reviewedAt: "2026-11-06",
    scope: "全卷五维逐题对照mirror解析版PDF，参考程序独立编译运行，源疑点隔离。",
    notes: "AI-Codex对照登记mirror第三方解析版PDF全部15页文本与渲染，Git blob SHA 10fcac8bd8af9d36a17f8f14ae5a4d48821b801d一致。25题answer保持。Q1磁场条件及Q16容量单位口径有疑点并隔离。两参考程序与模板另行GNU C++17编译运行。",
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
            sourceIntegrity: 'official-source-defect',
            integrityNote: "ANSWER-DOUBT。登记解析版p1给D，但题目未限定磁场强度、静态或变化条件。闪存U盘也有抗强磁场产品，不能由光盘非磁存储便排除B。保留answer=3并暂停计分，待来源澄清单选唯一性。",
            type: 'single',
            question: `以下存储器中的数据不会受到附近强磁场干扰的是（ ）。`,
            options: ["硬盘", "U 盘", "内存", "光盘"],
            answer: 3,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\nANSWER-DOUBT。登记解析版给 D，光盘用光学记录信息。但 U 盘采用闪存，不能把磁性介质的机理直接套用到闪存。厂商资料列有可承受 15000 高斯磁场的 USB 闪存产品，足以质疑题目没有条件限定时排除 B 的依据。原解析还把强磁场一概说成产生感应电流，缺少磁通变化等条件。保留原答案并暂停计分，等待来源澄清。[厂商资料](https://www.samsung.com/au/memory-storage/usb-flash-drive/usb-flash-drivetype-c-128gb-muf-128da-apc/)",
            tags: ['计算机基础']
        },
        {
            id: 2,
            type: 'single',
            question: "下列流程图，属于计算机的哪种程序结构？（ ）。\n\n![原卷流程图](/question-assets/2023-03-l2/q2-flowchart.png)",
            options: ["顺序结构", "循环结构", "分支结构", "数据结构"],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n原卷图中先判断是否按下空格键，是则让小猫移动100步，否则让小猫的颜色特效增加25。两条路径随后汇合到结束，没有返回前面步骤的箭头，所以是分支结构，选 C。顺序结构按步骤依次执行，循环结构会重复某段流程，数据结构描述数据的组织方式。判断框的存在应结合箭头走向一起分析。",
            tags: ['流程图', '程序分析']
        },
        {
            id: 3,
            type: 'single',
            question: `下列关于 C++ 语言的叙述，不正确的是（ ）。`,
            options: ["double 类型的变量占用内存的大小是浮动的", "bool 类型的变量占用 1 字节内存", "int 类型变量的取值范围不是无限的", "char 类型的变量有 256 种取值"],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n浮点类型的“浮点”描述数值表示方式，不表示一个 double 变量的存储大小会随数值变化。给定实现中 sizeof(double) 是固定的，故 A 不正确。按本题采用的常见8位字节环境，bool 通常1字节，char 有256种表示，int 范围有限。不同实现的类型宽度可能不同，不能把这些常见宽度说成所有 C++ 实现的强制规定。",
            tags: ['数据类型']
        },
        {
            id: 4,
            type: 'single',
            question: `下列关于 C++ 语言的叙述，不正确的是（ ）。`,
            options: ["变量定义后，可以使用赋值语句改变它的值", "变量定义时，必须指定类型", "变量名必须为合法标识符", "合法标识符可以以数字开始"],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n普通变量声明需要类型及合法名称，合法标识符不能以数字开头，因此 D 不正确。名称中可以含数字，但首字符不能是数字。A 按题目普通可修改变量的情境理解，赋值可以改变值。B 的类型可以通过显式类型说明或 auto 推导提供。标识符还须遵守关键字与实现保留名称的限制。",
            tags: ['变量与标识符', '标识符']
        },
        {
            id: 5,
            type: 'single',
            question: `以下哪个不是 C++ 语言的关键字？`,
            options: ["return", "max", "else", "case"],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\nreturn、else、case 都是 C++ 关键字，分别用于返回、条件分支和 switch 分支标签。max 可作为标准库函数名称使用，本身没有被语言保留为关键字，所以选 B。函数名称与语言关键字的身份不同，调用标准库函数时还应包含所需头文件并正确使用命名空间。",
            tags: ['关键字']
        },
        {
            id: 6,
            type: 'single',
            question: `以下哪个不是 C++语言的运算符？`,
            options: ["`\\=`","`/=`","`-=`","`!=`"],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n选项 A 的反斜杠加等号不是 C++ 运算符。/= 是除后赋值，-= 是减后赋值，!= 是不等于比较，因此选 A。对于简单变量，a/=b 把 a/b 的结果赋回 a，a-=b 把 a-b 的结果赋回 a。要区分求余使用的 % 与反斜杠，比较不等于也不能写成赋值。",
            sourceVerified: true,
            sourcePage: 4,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ["客观题", "单选题", "GESP2级"]
        },
        {
            id: 7,
            type: 'single',
            question: `如果 a 和 b 都是 char 类型的变量，下列哪个语句不符合 C++ 语法？`,
            options: ["b = a+1;", "b = a+'1';", "b = 'a'++;", "b = a++;"],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n后置自增需要可修改的左值。C 把自增用于字符字面量，不能修改该常量，因此语法不成立。A、B 中 char 参与算术会先进行整型提升，计算后赋给 b 时转换回 char，语法允许。D 中 a 是变量，可以自增，b 得到自增前的值。数值是否超出 char 范围是另外的转换问题。",
            tags: ['基础语法', '变量与标识符']
        },
        {
            id: 8,
            type: 'single',
            question: `如果 a、b、c 和 d 都是 int 类型的变量，则下列哪个表达式能够正确计算它们的平均值？`,
            options: ['(a + b + c + d) / 4', '(a + b + c + d) % 4', '(a + b + c + d) / 4.0', '(a + b + c + d) % 4.0'],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n平均值应保留小数，选 C。整数和与4.0进行除法时使用浮点运算。A 的两侧都是整数，除法向零截断，不能表示一般平均值，B 求的是余数，D 用浮点数参与内建求余，不能编译。C 的括号内仍先进行整数相加，因此通常还应确保四数之和没有超出 int 表示范围。",
            sourceVerified: true,
            sourcePage: 5,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ["客观题", "单选题", "GESP2级"]
        },
        {
            id: 9,
            type: 'single',
            question: `如果 a 为 char 类型的变量，且 a 的值为'2'，则下列哪条语句执行后，a 的值不会变为'3'？`,
            options: ['a = a + 1;', 'a + 1;', 'a = 1 + a;', '++a;'],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\na+1 只计算表达式，结果被丢弃，没有赋值或自增，a 仍为字符2，所以 B 符合题意。A、C 把加1后的字符编码赋回 a，D 直接自增，都会得到字符3。十进制数字字符在执行字符集中连续排列，字符2与整数2是不同的值，不能把引号忽略。",
            sourceVerified: true,
            sourcePage: 5,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ["客观题", "单选题", "GESP2级"]
        },
        {
            id: 10,
            type: 'single',
            question: `如果 a 为 int 类型的变量，且 a 的值为 9，则执行 a -= 3; 之后，a 的值会是（）。`,
            options: ['3', '6', '9', '12'],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n对简单整数变量，a-=3 等价于把 a-3 的结果赋回 a。初值为9，减3后为6，所以选 B。复合赋值会更新左侧变量，不是只计算一个表达式后丢弃结果，也不是把 a 直接赋成右侧的3。这里的减法没有超出 int 可表示范围。",
            sourceVerified: true,
            sourcePage: 6,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ["客观题", "单选题", "GESP2级"]
        },
        {
            id: 11,
            type: 'single',
            question: `如果 a 和 b 均为 int 类型的变量，下列表达式能正确判断“a 等于 0 或 b 等于 0”的是（）`,
            options: ['(!a) || (!b)', '(a == b == 0)', '(a == 0) && (b == 0)', '(a == 0) - (b == 0) == 0'],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n!a 在 a=0 时为真，!b 在 b=0 时为真，逻辑或表示至少一个条件成立，故选 A。B 按左结合先算 a==b，再与0比较。C 要求两者同时为0，D 要求两个比较的真假相同，会把两者都非零的情形也接受。可用 a=0,b=1 以及 a=1,b=1 检查各干扰项。",
            sourceVerified: true,
            sourcePage: 6,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ["客观题", "单选题", "GESP2级"]
        },
        {
            id: 12,
            type: 'single',
            question: `如果 a 为 char 类型的变量，下列哪个表达式可以正确判断“a 是小写字母”？`,
            options: ['a <= a <= z', 'a - \'a\' <= \'z\' - \'a\'', '\'a\' <= a <= \'z\'', 'a >= \'a\' && a <= \'z\''],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n在题目采用的 ASCII 环境中，小写字母位于字符a到字符z之间，必须同时检查下界和上界，故 D 正确。B 只有上界，会把字符A等值也接受。C 的连续比较先产生 bool，再与字符z比较，不能当成数学不等式。A 还使用了未加引号的 z，题目没有声明这个变量。",
            sourceVerified: true,
            sourcePage: 7,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ["客观题", "单选题", "GESP2级"]
        },
        {
            id: 13,
            type: 'single',
            question: `在下列代码的横线处填写（），使得输出是 \`50 10\`。
\`\`\`cpp
#include <iostream>
using namespace std;
int main() {
    int a = 10, b = 50;
    ________; // 在此处填入代码
    b -= a;
    a += b;
    cout << a << " " << b << endl;
    return 0;
}
\`\`\``,
            options: ['a -= b', 'a += b', 'a = b - a', 'a = b'],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n填入 a=b-a 后，a 从10变为40。接着 b-=a 使 b=10，a+=b 使 a=50，最终输出50 10，对应 C。其余选项代入后分别输出50 90、50 -10、50 0，均不符合要求。每条语句都使用前一条执行后的新值，不能同时按最初的 a、b 计算所有语句。",
            sourceVerified: true,
            sourcePage: 7,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ["客观题", "单选题", "GESP2级"]
        },
        {
            id: 14,
            type: 'single',
            question: `在下列代码的横线处填写（），可以使得输出是 \`5\`。
\`\`\`cpp
#include <iostream>
using namespace std;
int main() {
    int cnt = 0;
    for (char ch = '1'; ch <= '9'; ch++)
        if (________) // 在此处填入代码
            cnt++;
    cout << cnt << endl;
    return 0;
}
\`\`\``,
            options: ['ch < \'5\'', 'ch >= 5', 'ch >= \'4\'', 'ch % 2 == 1'],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n循环遍历字符1至9。在 ASCII 环境下，其编码49至57中有5个奇数，ch%2==1 可计数得到5，故选 D。A 接受字符1至4，共4个。B 的5没有引号，是整数5，9个数字字符编码都大于它。C 接受字符4至9，共6个。字符比较应区分数字值与编码值。",
            sourceVerified: true,
            sourcePage: 8,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ["客观题", "单选题", "GESP2级"]
        },
        {
            id: 15,
            type: 'single',
            question: "执行以下 C++ 语言程序后，输出结果是（ ）。\n```cpp\n#include <iostream>\nusing namespace std;\nint main() {\n    int n = 17;\n    bool isprime = true;\n    for (int i = 2; i <= n; i++)\n        if (n % i == 0)\n            isprime = false;\n    cout << isprime << endl;\n    return 0;\n}\n```",
            options: ["false", "true", "0", "1"],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n循环条件 i<=n 包含 i=17，17%17 为0，使 isprime 被赋为 false。此后循环结束，cout 在默认未启用 boolalpha 的状态下把 bool 输出为0，所以选 C。17本身是质数，但代码把自身也作为候选因子，算法存在边界错误，不能按变量名或实际质数性质推断输出。",
            tags: ['程序分析', '布尔类型']
        },
        {
            id: 16,
            sourceIntegrity: 'official-source-defect',
            integrityNote: "ANSWER-DOUBT。登记解析版p9判×，解析采用1GB=1024MB。题目没有约定该口径，按十进制GB/MB定义，4096MB大于4GB，命题为真。保留answer=1并暂停计分，待来源澄清容量单位口径。",
            type: 'judge',
            question: `明明和笑笑在“小庙会”上分别抽到一个 4GB 和 4096MB 的 U 盘，容量大的盘是笑笑的（ ）。`,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\nANSWER-DOUBT。登记解析版判错误，按其1024换算口径两者相等。但 NIST 区分十进制 GB、MB 与二进制 GiB、MiB，1GB=10^9字节、1MB=10^6字节，按该定义4096MB比4GB多96000000字节，命题成立。题目没有声明换算口径，因此保留原答案并暂停计分，等待澄清。[单位定义](https://physics.nist.gov/cuu/Units/binary.html)",
            sourceVerified: true,
            sourcePage: 9,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ["客观题", "判断题", "GESP2级"]
        },
        {
            id: 17,
            type: 'judge',
            question: `IPv4 的地址通常用“点分十进制”的表示形式，形如（a.b.c.d），其中 a、b、c、d 都是 1~255 之间的十进制整数（ ）。`,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\nIPv4 点分十进制把32位地址分成4组，每组8位，对应0至255的十进制整数。原题把下界写成1，遗漏0，例如地址中可以出现0这一段，所以判断错误。具体地址是否可分配还受网络号、广播等规则约束，但这不改变每个八位组的表示范围。",
            sourceVerified: true,
            sourcePage: 10,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ["客观题", "判断题", "GESP2级"]
        },
        {
            id: 18,
            type: 'judge',
            question: `C++ 语言中，一个程序不能有多个 main 函数。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n对于题目讨论的通常宿主 C++ 程序，全局 main 是程序入口，只允许一个 main 定义，不能通过重载创建多个入口，因此判断正确。一个项目可以有多个源文件，但链接成同一个程序时仍须遵守入口与定义规则。多个相互独立的程序各有自己的 main，是不同的情境。",
            tags: ['基础语法']
        },
        {
            id: 19,
            type: 'judge',
            question: `标识符中可以有下划线，但不能以下划线开头。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n下划线可以作为标识符的首字符，因此“不能以下划线开头”过于绝对，判断错误。例如函数内部的 _value 可以用作普通局部变量名。还必须遵守实现保留规则，双下划线、下划线紧接大写字母等名称有保留限制，以下划线开头的全局名称也有额外限制。",
            tags: ['变量与标识符']
        },
        {
            id: 20,
            type: 'judge',
            question: `如果 a 是 int 类型的变量，而且值为 1，则表达式'a'的值为'1'。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n加上单引号的字符a是字符字面量，与变量 a 中保存的整数1没有关系。字符a和字符1表示不同字符，所以原判断错误。在 ASCII 环境中它们的编码分别是97和49。只有没有引号的 a 才会读取题目定义的变量，不能把字符名称与变量名混为一谈。",
            tags: ['字符与ASCII']
        },
        {
            id: 21,
            type: 'judge',
            question: `在 if ... else 语句中，else 子句可以嵌套 if ... else 语句，但 if 子句不可以，因为会造成二义性。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\nif 分支和 else 分支都可以嵌套另一个 if/else，原判断错误。没有花括号时，else 按语言规则匹配最近尚未配对的 if，含义由语法规则确定。若程序员需要不同分组，应使用花括号形成复合语句。所谓悬空else问题不意味着禁止在 if 分支中嵌套条件。",
            tags: ['条件判断']
        },
        {
            id: 22,
            type: 'judge',
            question: `while 语句的循环体至少会执行一次。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\nwhile 先检查条件，再决定是否执行循环体。若进入时条件就是假，循环体执行0次，例如 int i=0 后执行 while(i>0) 就不会进入，因此判断错误。do/while 才是先执行一次循环体再检查条件，不能把两种循环的执行顺序与最少次数混淆。",
            tags: ['循环']
        },
        {
            id: 23,
            type: 'judge',
            question: `C++ 语言中 >= 是运算符，但 => 不是。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n大于号后接等号组成 >=，是大于等于关系运算符。反过来的 => 不是 C++ 的一个运算符，不能用来表示大于等于，因此判断正确。书写多字符运算符时顺序由语言规定，例如 <=、==、!= 也都必须准确使用相应字符次序。",
            tags: ['运算符']
        },
        {
            id: 24,
            type: 'judge',
            question: `如果 a 为 char 类型的变量，且取值为小写字母，则执行语句 a = a - 'a' + 'A'; 后，a 的值会变为与原值对应的大写字母。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n在题目采用的 ASCII 编码环境中，a减去字符a得到该小写字母的0至25偏移，再加字符A得到对应大写字母，所以判断正确。例如字符c减字符a为2，加字符A得到字符C。结论基于大小写字母各自连续排列的编码约定，通用跨字符集程序可使用标准字符转换函数。",
            tags: ['字符与ASCII']
        },
        {
            id: 25,
            type: 'judge',
            question: `表达式(10.0 / 2)的计算结果为 5.0，且结果类型为 double。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n字面量10.0的类型是 double，2是 int，通常算术转换将2转换为 double 后再相除，结果是 double 类型的5.0，因此判断正确。表达式类型与 cout 默认是否显示小数点是两回事。若写成10/2，两个操作数均为整数，结果类型才会是整数。",
            tags: ['数据类型']
        }
    ],
    programmingQuestions: [
        {
            id: 26,
            type: 'programming',
            title: "画三角形",
            description: "输入一个正整数 n，请使用大写字母拼成一个三角形图案。第1行有1个字母，第2行有2个字母，以此类推。由上至下、由左至右依次用大写字母A-Z填充，使用Z后从A重新开始。",
            inputDescription: "一个正整数 n (2≤n≤40)。",
            outputDescription: "输出符合要求的三角形图案。注意每行图案的右侧不要有多余的空格。",
            samples: [{"input":"3","output":"A\nBC\nDEF"},{"input":"7","output":"A\nBC\nDEF\nGHIJ\nKLMNO\nPQRSTU\nVWXYZAB"}],
            explanation: "**解析**\n\n外层循环控制第1至n行，内层在第i行输出i个字符。字符ch在所有行间连续保存，输出后自增，超过Z就回到A。因此n=7时第7行是VWXYZAB，覆盖跨行与行内回绕。原实现与解析版按序号模26输出的算法等价。n不超过40，最多输出820个字母，时间O(n²)、额外空间O(1)，每行直接换行而不附空格。",
            tags: ['循环', '字符与ASCII'],
            template: "#include <iostream>\nusing namespace std;\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <iostream>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    char ch = 'A';\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= i; j++) {\n            cout << ch;\n            if (++ch > 'Z') ch = 'A';\n        }\n        cout << endl;\n    }\n    return 0;\n}"
        },
        {
            id: 27,
            type: 'programming',
            title: "百鸡问题",
            description: "“百鸡问题”出自《张丘建算经》。每只公鸡5元、每只母鸡3元、每3只小鸡1元，用100元买100只鸡，求方案数。小明把它扩展为每只公鸡x元、每只母鸡y元、每z只小鸡1元，用n元买m只鸡，求方案数。",
            inputDescription: "输入一行，包含五个整数 x、y、z、n、m。约定1<=x,y,z<=10，1<=n,m<=1000。",
            outputDescription: "输出一行，包含一个整数C，表示有C种方案。",
            samples: [{"input":"5 3 3 100 100","output":"4"},{"input":"1 1 1 100 100","output":"5151"}],
            explanation: "**解析**\n\n枚举公鸡i和母鸡j后，小鸡k=m-i-j唯一确定。用整数等式z*x*i+z*y*j+k=z*n检验钱数，避免k/z的整数截断。该等式也保证k能被z整除，因此允许某类鸡为0且不会漏解。经典样例有4解，所有单价均1且n=m=100时有(101*102)/2=5151解。范围1<=x,y,z<=10、1<=n,m<=1000时整式和计数都在int内，时间O(m²)、空间O(1)。",
            tags: ['枚举', '模拟'],
            template: "#include <iostream>\nusing namespace std;\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <iostream>\nusing namespace std;\nint main() {\n    int x, y, z, n, m;\n    cin >> x >> y >> z >> n >> m;\n    int cnt = 0;\n    for (int i = 0; i <= m; i++) {\n        for (int j = 0; j <= m-i; j++) {\n            int k = m-i-j;\n            if (k >= 0 && (z * x * i + z * y * j + k == z * n)) {\n                cnt++;\n            }\n        }\n    }\n    cout << cnt << endl;\n    return 0;\n}"
        }
    ]
};
