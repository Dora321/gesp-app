import { LEVEL1_TAGS } from './shared.js';

export const paperData = {
  id: '2025-03-l1',
  title: '2025年03月 GESP C++ 一级认证真题',
  level: 1,
  year: 2025,
  month: 3,
  session: 9,
  timeLimit: 5400,
  source: {
    officialPdf: '',
    url: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B1%E7%BA%A7.pdf",
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
  scope: "全卷逐题对照mirror PDF，Q3命名源疑点隔离，参考代码独立运行。",
  notes: "AI-Codex对照登记mirror PDF全部8页文本和渲染；Git blob SHA 73dcbdb76e08af3211536ada0b83076da9ae440c一致。恢复Q6美元符号、原输入提示与编程范围/保证。Q3保留原卷保留标识符疑点隔离；25个answer字段全部保持。解析为AI逻辑复核，参考代码有独立运行证据。",
  dimensions: {
    statement: "partial",
    options: "partial",
    answer: "partial",
    explanation: "partial",
    referenceCode: "partial"
  }
},
  questions: [
    // 1-15 单选题
    {
      id: 1,
      type: 'single',
      question: `2025年春节有两件轰动全球的事件，一个是DeepSeek横空出世，另一个是贺岁片《哪吒2》票房惊人，入了全球票房榜。下面关于DeepSeek与《哪吒2》的描述成立的是( )。`,
      options: [
        '《哪吒2》是一款新型操作系统',
        'DeepSeek是深海钻探软件',
        '《哪吒2》可以生成新的软件',
        'DeepSeek可以根据《哪吒2》的场景生成剧情脚本'
      ],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\n按题目当时的应用背景，DeepSeek可根据用户提供的电影场景信息生成剧情脚本文本，选D。《哪吒2》是电影，不能因此被归类为操作系统或程序生成工具；DeepSeek这一名字也不表示它属于深海钻探软件。本题考查生成式AI的文本应用类别，不表示生成内容一定与原电影一致。",
            tags: ['计算机基础'],
        },
    {
      id: 2,
      type: 'single',
      question: `在某集成开发环境中编辑一个源代码文件时不可以执行下面（ ）操作。`,
      options: [
        '修改变量定义',
        '保存代码修改',
        '撤销代码修改',
        '插入执行截图'
      ],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\n编辑源代码文件通常支持修改变量定义、保存与撤销文本修改；执行截图是图像资料，不属于C++源代码文本本身，按本题选D。可在注释里写图片路径，也可用工具另外查看截图，但不能据此把图片直接嵌入当作C++语句。应区分编辑源码和撰写图文报告。",
            tags: ['计算机基础'],
        },
    {
      id: 3,
      sourceIntegrity: 'official-source-defect',
      integrityNote: 'ANSWER-DOUBT：官方D的_Var_1以下划线接大写V开头，属于C++实现保留标识符；题干未区分词法形状与用户可用变量名，保留answer=3并暂停计分，等待来源澄清。',
      type: 'single',
      question: `在C++中，下列可以做变量的是( )。`,
      options: [
        'Var-1',
        '$1',
        '%%1',
        '_Var_1'
      ],
      answer: 3,
      score: 2,
      explanation: "**原卷命名疑点，暂停计分**\n\nANSWER-DOUBT：官方D为_Var_1，按初学者的字母数字下划线词法规则可识别为标识符，但下划线后立即接大写字母V的名字属于C++实现保留标识符，不能无条件推荐用户声明。A含减号，C含百分号，B的美元符号也不是标准基本标识符写法，部分编译器仅以扩展接受。题目未说明只考词法形状，保留answer=3及原文并隔离，等待来源澄清。",
            tags: ['变量与标识符'],
        },
    {
      id: 4,
      type: 'single',
      question: `以下哪个是C++语言的关键字？（ ）`,
      options: [
        'abs',
        'cin',
        'do',
        'endl'
      ],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\ndo是C++关键字，与while组合形成先执行循环体再判断条件的do-while循环，因此选C。abs是常见标准库求绝对值函数名，cin为标准输入流对象名，endl为输出流操纵符；标准库经常使用的名字并不都属于语言关键字。",
            tags: ['变量与标识符'],
        },
    {
      id: 5,
      type: 'single',
      question: `下面的框架在L1和L2标记的两行处分别填写选项中的代码，哪组不能通过编译（ ）。\n\`\`\`cpp\nint main () {\n int i = 0;\n ______________ // L1\n break;\n ______________ // L2\n return 0;\n}\n\`\`\``,
      options: [
        'do { (L1) 和 } while (i != 0); (L2)',
        'for (; i < 10; i++) { (L1) 和 } (L2)',
        'if (i == 0) { (L1) 和 } (L2)',
        'switch (i) { (L1) 和 } (L2)'
      ],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\nbreak必须位于循环或switch内部。do-while、for和switch填入框架时均为break提供合法外围结构，唯独单独的if语句不满足此要求，选C。switch即使没有case标签也可以形成合法语法结构，不能因其分支不会被进入就误判为编译错误。",
            tags: ['计算机基础', '循环'],
        },
    {
      id: 6,
      type: 'single',
      question: "下面C++语句（ ）执行后的输出是 `__ 0322$$`。",
      options: ["```cpp\nprintf(\"__ %2d%02d$$\", 3, 22)\n```","```cpp\nprintf(\"__ %02d%2d$$\", 3, 22)\n```","```cpp\nprintf(\"__ %02d%02d$$$$\", 3, 22)\n```","```cpp\nprintf(\"____ %02d%02d$$$$\", 3, 22)\n```"],
      answer: 1,
      score: 2,
      explanation: "**答案：B**\n\n原卷目标为__ 0322$$，B先原样输出两个下划线和一个空格，再以%02d把3补成03，%2d输出22，末尾两个美元符号原样保留，恰好匹配。A把3补为空格3而非03；C多输出两个美元符号；D既多了下划线也多了美元符号。恢复末尾字符后四个选项可区分，答案仍为B。",
            tags: ['输入输出'],
        },
    {
      id: 7,
      type: 'single',
      question: `有关下列C++代码的说法，错误的是( )。\n\`\`\`cpp\nprintf("我爱码代码！");\n\`\`\``,
      options: [
        '配对双引号内的汉字改为英文 Hello，C++代码能正确执行',
        '配对双引号内的汉字改为 Hello代码！，C++代码能正确执行',
        '代码中的每个双引号，都可以改为两个单引号',
        '代码中的每个双引号，都可以改为三个双引号'
      ],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\n选C，两个单引号构成空字符字面量，不能用来替代字符串双引号，语法不成立。A、B只是更换普通字符串的内容；D的三个双引号可分成空字符串、中间字符串、空字符串，利用相邻字符串字面量拼接，语法可以成立。不要将C++字符串拼接与其他语言的三引号语法混为一谈。",
            tags: ['字符与ASCII', '输入输出'],
        },
    {
      id: 8,
      type: 'single',
      question: `C++表达式 \`16 / 4 % 2\` 的值是( )。`,
      options: [
        '8',
        '4',
        '2',
        '0'
      ],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\n除法/与求余%同级，按左结合分组为(16/4)%2。先得整数商4，再求4%2=0，因此选D。若把它误写成16/(4%2)，会产生除数0，但这不是原表达式的分组。优先级相同并不表示可任意交换计算关系。",
            tags: ['运算符'],
        },
    {
      id: 9,
      type: 'single',
      question: `N是C++的正整数，值为12，则 \`cout << (N % 3 + N / 5)\` 的输出是( )。`,
      options: [
        '6.4',
        '2.4',
        '6',
        '2'
      ],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\nN=12为整数，N%3=0，N/5执行整数除法得到2，两者相加为2，选D。整数商向零截断，不会得到2.4；本表达式也没有浮点数操作数。求余取的是除法剩余部分，不能把N%3错误当成N/3而加出6。",
            tags: ['输入输出'],
        },
    {
      id: 10,
      type: 'single',
      question: `下面C++代码执行后的输出是( )。\n\`\`\`cpp\nint N = 10;\nprintf("{N}*{N}={%d*%d}", N, N, N * N);\n\`\`\``,
      options: [
        '10*10={10*10}',
        '100=10',
        'N*N=100',
        '{N}*{N}={10*10}'
      ],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\n格式串内的{N}*{N}=是普通文本，不会读取变量N。两个%d依次消耗参数N和N，均为10，中间的*也原样输出，完整结果为{N}*{N}={10*10}，选D。多传入的N*N参数会被求值但没有对应转换说明，不会再输出成100，也不导致本次调用格式参数不足。",
            tags: ['输入输出', '数据类型'],
        },
    {
      id: 11,
      type: 'single',
      question: "执行下面的C++代码，在键盘上先后输入100和200，输出是（ ）。\n```cpp\nint first,second;\ncout << \"请输入第1个正整数：\";\ncin >> first;\ncout << \"请输入第2个正整数：\";\ncin >> second;\ncout << (first / second * second) << endl;\n```",
      options: [
        '200',
        '100',
        '1',
        '0'
      ],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\nfirst=100，second=200，整数除法first/second得到0，再乘200仍为0，因此最后输出0，选D。代码还会先后输出两个输入提示；选项列的是数值结果。不能把整数除法当成0.5，也不能将先除再乘当作必定相互抵消。",
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 12,
      type: 'single',
      question: "下面C++代码执行后，将输出能被2整除且除以7余数为2的数。下列选项不能实现的是（ ）。\n```cpp\nfor (int i = 0; i < 100; i++)\n    if _______________________\n        cout << i << \"  \";\n```",
      options: [
        '((i % 2 == 0) && (i % 7 == 2))',
        '((!(i % 2)) && (i % 7 == 2))',
        '((!(i % 2)) && (!(i % 7)))',
        '((i % 2 != 1) && (i % 7 == 2))'
      ],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\n目标是偶数且除以7余2，A直接表达该条件。i在0至99中非负，!(i%2)与i%2!=1也都判偶数，因此B、D等价于A。C的!(i%7)要求余数为0，选出的却是同时被2、7整除的数，所以不能完成目标，选C。例如i=2应被选中，却不满足C。",
            tags: ['循环', '条件判断'],
        },
    {
      id: 13,
      type: 'single',
      question: `下面C++代码执行后输出是（ ）。\n\`\`\`cpp\nint tnt = 0;\nfor (int i = -1000; i < 1000; i++)\n tnt += i;\ncout << tnt << endl;\n\`\`\``,
      options: [
        '-1000',
        '0',
        '999',
        '1000'
      ],
      answer: 0,
      score: 2,
      explanation: "**答案：A**\n\n从-999至999的整数可以正负配对抵消，循环还额外包含-1000，故总和为-1000，选A。上界i<1000不包含1000，不能把区间误看成关于0完全对称。循环每次加1，tnt初始为0，因此可直接使用配对法核对逐项累加结果。",
            tags: ['循环', '输入输出'],
        },
    {
      id: 14,
      type: 'single',
      question: `下面C++代码执行后输出的是（ ）。\n\`\`\`cpp\nint i;\nfor (i = 1; i < 100; i += 5)\n continue;\ncout << i << endl;\n\`\`\``,
      options: [
        '101',
        '100',
        '99',
        '96'
      ],
      answer: 0,
      score: 2,
      explanation: "**答案：A**\n\ni从1开始，每轮加5，进入循环体时依次为1、6、…、96。continue结束当前空操作后仍执行i+=5，更新到101时条件i<100为假，退出循环。i声明在for外，循环后仍可使用，所以输出101，选A。100不是步长序列中的值。",
            tags: ['循环', '输入输出'],
        },
    {
      id: 15,
      type: 'single',
      question: `下面C++代码执行后输出的是（ ）。\n\`\`\`cpp\nint tnt = 0;\nfor (int i = 5; i < 100; i += 5){\n if (i % 2 == 0) continue;\n tnt += 1;\n if (i % 3 == 0 && i % 7 == 0) break;\n}\ncout << tnt << endl;\n\`\`\``,
      options: [
        '500',
        '450',
        '10',
        '1'
      ],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\ni依次是5、10、…、95，偶数被continue跳过，仅5、15、25、…、95这10个奇数让tnt加1。break要求i同时被3与7整除，即为21的倍数，而本循环的5倍数中最小共同倍数105已超上界。因此不会break，最终输出10，选C；tnt统计次数，不累加i的数值。",
            tags: ['循环', '条件判断'],
        },

    // 16-25 判断题
    {
      id: 16,
      type: 'judge',
      question: `C++、Python都是高级编程语言，它们的每条语句最终都要通过机器指令来完成。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: "**判断：正确**\n\nC++与Python都属于高级编程语言，程序最终需要由处理器执行机器指令完成，按本题判断正确。两者实现方式可以不同，C++常先编译，Python常由解释器处理字节码。不能把“最终由机器指令执行”误解成每条源语句都只对应一条机器指令。",
            tags: ['计算机基础'],
        },
    {
      id: 17,
      type: 'judge',
      question: `在C++中表达式 \`N * 2 % N\` 中如果N的值为正整数，则其值为2。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\n在乘法不溢出的范围，N*2是N的倍数，再对正整数N求余得到0，不是2，因此判断错误。例如N=3时6%3=0，足以否定题目断言。大数程序还需留意N*2是否超出类型范围，但无须依靠溢出情况才能判本题为假。",
            tags: ['运算符'],
        },
    {
      id: 18,
      type: 'judge',
      question: "执行如下C++代码如果在键盘上输入10，执行后将输出20。\n```cpp\nchar N;\nprintf(\"请输入正整数：\");\ncin >> N;\nprintf(\"%d\\n\", N * 2);\n```",
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\nN为char，cin读入10时只提取第一个字符1，字符0留在输入流。常见ASCII兼容编码中字符1为49，整数提升后49*2=98，printf的%d输出98，并非20，判断错误。代码先输出输入提示，但提示不会改变读取目标类型，不能当作整数10读入。",
            tags: ['字符与ASCII', '计算机基础'],
        },
    {
      id: 19,
      type: 'judge',
      question: `删除下面C++代码中的continue不影响程序的执行效果。\n\`\`\`cpp\nfor (int i = 0; i < 100; i++) {\n if (i % 2 == 0) {\n printf("偶数");\n continue;\n } else \n printf("奇数");\n}\n\`\`\``,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: "**判断：正确**\n\n偶数进入if后输出“偶数”，奇数进入else输出“奇数”。if/else之后已经到循环体末尾，continue没有跳过额外处理语句；删去后同样执行for更新再继续，所以原叙述正确。此结论只针对给定结构，若末尾还有其他语句，则删除continue可能改变行为。",
            tags: ['循环', '条件判断'],
        },
    {
      id: 20,
      type: 'judge',
      question: `下面C++代码执行时将报错，因为 \`_\` 所在位置应该是变量名，而 \`_\` 不可以做变量名。\n\`\`\`cpp\nfor(int _ = 0; _ < 100; _++) cout<< "*" <<endl;\n\`\`\``,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\n单个下划线是可在这段局部作用域使用的标识符，for中的声明及后续引用一致，因此不会因为名字为_而报错，判断错误。循环从0执行至99共100次，每次输出一个星号及换行。与下划线后接大写字母、双下划线等实现保留命名模式应作区别。",
            tags: ['变量与标识符', '循环'],
        },
    {
      id: 21,
      type: 'judge',
      question: `下面C++代码被执行后，将先后输出3和5。\n\`\`\`cpp\nfor (int i = 3; i < 5; i += 2)\n printf("%d ", i);\n\`\`\``,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\ni初始为3，3<5成立，输出3并执行i+=2变为5。下一次5<5为假，退出，不再输出5，原叙述错误。输出语句位于循环体内，只有检查条件成立时才会执行；更新到了5并不意味着已经打印了5。",
            tags: ['循环', '输入输出'],
        },
    {
      id: 22,
      type: 'judge',
      question: `下面的C++代码执行后将先后输出7个true。\n\`\`\`cpp\nfor (int i = 0; i < 10; i++)\n cout << (i * 2 < i * i) << " ";\n\`\`\``,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\ni=0、1、2时i*2<i*i为假，i=3至9时为真，共7个真值；但默认cout把bool输出为0或1，而非文本true。因此实际依次输出3个0、7个1，原叙述按输出文本判断为错误。若显式使用boolalpha，显示形式才会改为false与true。",
            tags: ['循环', '输入输出'],
        },
    {
      id: 23,
      type: 'judge',
      question: `在C++代码中，\`user_Name\`、\`_userName\`、\`user-Name\`、\`userName_\`都是合法的变量名。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\nuser-Name含有减号，会被分成user、减号、Name几个记号，不是一个合法变量名，因此“全都合法”错误。其余名字包含字母或下划线，_userName可用于通常局部变量场景，但仍应注意以下划线开头的名字在全局作用域等位置的保留限制。",
            tags: ['变量与标识符'],
        },
    {
      id: 24,
      type: 'judge',
      question: `C++语言中continue语句可以来提前结束循环。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\ncontinue跳过当前一轮循环体剩余部分，并进入更新或条件判断过程；它不会像break那样直接跳出整个循环，故本题“提前结束循环”的说法错误。for中的continue仍会执行更新表达式，while中的continue则转回条件判断，使用时要避免跳过必要的变量更新。",
            tags: ['循环'],
        },
    {
      id: 25,
      type: 'judge',
      question: `C++中定义整型变量N，执行语句 \`scanf("%d", &N); cout << N / 3 * 5;\` 时输入3.6，则输出是6。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\nscanf的%d从3.6中成功提取整数3，.6留在输入流，不会把N读成浮点3.6。随后N/3=1，1*5=5，所以输出5而非6，判断错误。这里的乘除是同级左结合的整数运算，不能先用浮点数完成计算再将输出截断。",
            tags: ['输入输出', '数据类型'],
        },

    // 26-27 编程题
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `10\n2\n3`, output: `8` },
        { input: `5\n2\n4`, output: `3` }
      ],
      referenceCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n, x, y;\n    cin >> n >> x >> y;\n    int eaten = (y + x - 1) / x;\n    int remain = n - eaten;\n    if (remain < 0) remain = 0;\n    cout << remain << "\\n";\n    return 0;\n}`,
      question: "# [GESP202503 一级] 图书馆里的老鼠\n\n## 题目描述\n\n图书馆里有 $n$ 本书，不幸的是，还混入了一只老鼠，老鼠每 $x$ 小时能啃光一本书，假设老鼠在啃光一本书之前，不会啃另一本。请问 $y$ 小时后图书馆里还剩下多少本完整的书。\n\n## 输入格式\n\n三行，第一行一个正整数 $n$，表示图书馆里书的数量；第二行一个正整数 $x$，表示老鼠啃光一本书需要的时间；第三行一个正整数 $y$，表示经过的总时间。\n\n输入数据保证 $y$ 小时后至少会剩下一本完整的书。对于所有测试点，保证 $1 \\le n,x,y \\le 1000$。\n\n## 输出格式\n\n一行，一个整数，表示 $y$ 小时后图书馆里还剩下多少本完整的书。",
      template: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}`,
      answer: '',
      score: 25,
      explanation: "**解析**\n\n每开始啃一本，该书就不再完整，因此受损本数为向上取整y/x，即(y+x-1)/x，完整本数为n减去它。原卷1<=n,x,y<=1000，且保证结果至少1。样例10、2、3中受损2本，剩8；5、2、4恰好损2本，剩3。参考程序额外的负数截零分支在合法输入中不会触发；时间和额外空间均O(1)。",
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.condition, LEVEL1_TAGS.operator],
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `5\n43\n58\n25\n67\n90`, output: `40\n60\n30\n70\n90` }
      ],
      referenceCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    for(int i = 0; i < n; i++) {\n        int a;\n        cin >> a;\n        int rem = a % 10;\n        if (rem >= 5) a += 10 - rem;\n        else a -= rem;\n        cout << a << "\\n";\n    }\n    return 0;\n}`,
      question: "# [GESP202503 一级] 四舍五入\n\n## 题目描述\n\n四舍五入是一种常见的近似计算方法。现在，给定 $n$ 个整数，你需要将每个整数四舍五入到最接近的整十数。例如，$43$ 四舍五入后为 $40$，$58$ 四舍五入后为 $60$。\n\n## 输入格式\n\n共 $n+1$ 行，第一行一个整数 $n$，表示接下来输入的整数个数。接下来 $n$ 行，每行一个整数 $a_i$，表示需要四舍五入的整数。\n\n对于所有测试点，保证 $1 \\le n \\le 100$，$1 \\le a_i \\le 10000$。\n\n## 输出格式\n\n$n$ 行，每行一个整数，表示每个整数四舍五入后的结果。",
      template: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}`,
      answer: '',
      score: 25,
      explanation: "**解析**\n\n取个位rem=a%10，若rem>=5则加10-rem进到下一整十数，否则减rem退到当前整十数。此规则与(a+5)/10*10对原卷正整数范围等价。43得40，58得60，25得30，90保持90；原卷1<=n<=100、1<=a<=10000，结果用int足够。每行输出一个结果；时间O(n)，额外空间O(1)。",
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.basics],
    }
  ]
};
