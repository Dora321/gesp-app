import { LEVEL1_TAGS } from './shared.js';

export const paperData = {
  id: '2024-09-l1',
  title: '2024年9月GESP C++ 一级认证真题',
  level: 1,
  year: 2024,
  month: 9,
  session: 7,
  timeLimit: 5400,
  source: {
    officialPdf: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B1%E7%BA%A7.pdf',
    type: 'official-verified',
  },
  verification: {
  status: "partial",
  reviewedBy: "AI-Codex",
  reviewedAt: "2026-11-06",
  scope: "全卷逐题原卷核验，Q6/Q22保留隔离。",
  notes: "AI-Codex对照mirror PDF全部8页文本及渲染；Git blob SHA 013db5576f8e687d6bf7a167e48f8621190e6d15一致。Q6原卷无效printf格式、Q22判断依据不明确，保留原文和答案隔离；25个answer均未改。解析为AI逻辑复核，非人工核验，参考代码有独立运行证据。",
  dimensions: {
    statement: "partial",
    options: "partial",
    answer: "partial",
    explanation: "partial",
    referenceCode: "partial"
  }
},
  confidence: {
    answer: 1.0,
    statement: 0.9,
  },
  questions: [
    {
      id: 1,
      type: 'single',
      question: "据有关资料，山东大学于1972年研制成功DJL-1计算机，并于1973年投入运行，其综合性能居当时全国第三位。DJL-1计算机运算控制部分所使用的磁心存储元件由磁心颗粒组成，设计存贮周期为2μs（微秒）。那么该磁心存储元件相当于现代计算机的（ ）。",
      options: ['内存', '磁盘', 'CPU', '显示器'],
      answer: 0,
      score: 2,
      explanation: "**答案：A**\n\n题干中的磁心存储元件负责保存供运算控制部分读取的数据，功能对应主存，即现代计算机的内存，选A。磁盘属于外部辅助存储，CPU主要负责执行指令，显示器属于输出设备。磁心存储与现代半导体内存的实现材料不同，但本题比较的是在系统中的功能。",
            tags: ['计算机基础'],
        },
    {
      id: 2,
      type: 'single',
      question: `C++ 程序执行出现错误，不太常见的调试手段是（ ）。`,
      options: ['阅读源代码', '单步调试', '输出执行中间结果', '跟踪汇编码'],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\n阅读源代码、单步执行和输出中间结果都是初学C++时常用的调试方法。跟踪汇编代码需要结合处理器指令理解程序，层次更底，通常不作为这类基础程序的首选手段，故选D。本题问“不太常见”，不表示汇编调试无效或完全不能使用，也不能据此断言各开发工具的快捷键相同。",
            tags: ['计算机基础'],
        },
    {
      id: 3,
      type: 'single',
      question: `在 C++ 中，下列表达式错误的是（ ）。`,
      options: [
        'cout << "Hello,GESP!" << endl;',
        "cout << 'Hello,GESP!' << endl;",
        'cout << """Hello,GESP!""" << endl;',
        'cout << "Hello,GESP!\' << endl;'
      ],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\n选D：双引号开始的字符串没有匹配的结束双引号，单引号不能将其闭合，会出现编译错误。A为普通字符串输出；C由空字符串、Hello,GESP!字符串、空字符串相邻拼接，语法可成立。B是多字符字面量，在本次GNU C++17环境可编译但有警告，数值依赖实现，不能当普通字符串使用。",
            tags: ['基础语法'],
        },
    {
      id: 4,
      type: 'single',
      question: `C++ 表达式 \`10 - 3 * 2\` 的值是（ ）。`,
      options: ['14', '4', '1', '0'],
      answer: 1,
      score: 2,
      explanation: "**答案：B**\n\n先计算乘法3*2=6，再计算10-6=4，选B。A的14来自误把表达式按(10-3)*2分组。乘法的优先级高于减法，若想先做减法，必须在源代码中为10-3添加括号，而不能自行改变原表达式的分组。",
            tags: ['运算符'],
        },
    {
      id: 5,
      type: 'single',
      question: `在 C++ 中，假设 \`N\` 为正整数 \`10\`，则 \`cout << (N / 3 + N % 3)\` 将输出（ ）。`,
      options: ['6', '4.3', '4', '2'],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\nN=10是整数，因此N/3采用整数除法得到3，N%3得到余数1，两者相加为4，选C。此处没有浮点操作数，不能把10/3算成3.333再输出4.3；也不能用商替代余数。商余关系10=3*3+1可以用来核对结果。",
            tags: ['运算符', '输入输出'],
        },
    {
      id: 6,
      sourceIntegrity: 'official-source-defect',
      integrityNote: "ANSWER-DOUBT：原卷p2为6%2={%d}，无效printf格式说明，不能保证官方D输出；恢复原文，保留answer=3并暂停计分。",
      type: 'single',
      question: "C++语句 `printf(\"6%2={%d}\", 6%2)` 执行后的输出是（ ）。",
      options: ['"6%2={6%2}"', '6%2={6%2}', '0=0', '6%2={0}'],
      answer: 3,
      score: 2,
      explanation: "**原卷疑点，暂停计分**\n\nANSWER-DOUBT：mirror原卷p2确实写printf(\"6%2={%d}\",6%2)，只有一个百分号。%后面的2被当作宽度，而=不是有效转换说明符；无效格式说明导致未定义行为，不能保证输出D的6%2={0}。题库之前擅自补成%%，现恢复原文，保留answer=3并暂停计分。若源格式为6%%2={%d}才可按通常转义规则得到D，但不能用这一修复替代原题。",
            tags: ['输入输出', '运算符'],
        },
    {
      id: 7,
      type: 'single',
      question: `成功执行下面的 C++ 代码，先后从键盘输入 \`5\` 回车和 \`2\` 回车，输出是（ ）。\n\`\`\`cpp\ncin >> a;\ncin >> b;\ncout << a + b;\n\`\`\``,
      options: [
        '将输出整数 7',
        '将输出 52，5 和 2 之间没有空格',
        '将输出 5 和 2，5 和 2 之间有空格',
        '执行结果不确定，因为代码段没有显示 a 和 b 的数据类型'
      ],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\n题目明确代码能够成功执行，但未给a、b类型。若都是int，输入5、2得到7；若都是string，得到拼接结果52。两种都能成功执行的情况输出不同，故仅凭片段无法唯一确定，选D。这是题目信息不足，不等同于C++程序必然具有未定义行为；若类型组合不支持相加，则与题目成功执行的前提不符。",
            tags: ['输入输出'],
        },
    {
      id: 8,
      type: 'single',
      question: `下面 C++ 代码执行后输出是（ ）。\n\`\`\`cpp\nint Sum = 0;\nfor (int i = 0; i < 10; i++)\n Sum += i;\ncout << Sum;\n\`\`\``,
      options: ['55', '45', '10', '9'],
      answer: 1,
      score: 2,
      explanation: "**答案：B**\n\ni依次取0至9，共10次。Sum从0开始累加这些值，得到0+1+2+3+4+5+6+7+8+9=45，因此选B。循环条件i<10不包含10，55是错误地把10也加入后得到的结果；不要混淆累加变量的最终值与循环变量或循环次数。",
            tags: ['循环', '输入输出'],
        },
    {
      id: 9,
      type: 'single',
      question: `下面 C++ 代码执行后输出的是（ ）。\n\`\`\`cpp\nint N = 0;\nfor (int i = 0; i < 10; i++)\n N += 1;\ncout << N;\n\`\`\``,
      options: ['55', '45', '10', '9'],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\n每次循环执行N+=1，i依次为0至9，共10次。N初始为0，最终变成10，选C。该程序统计执行次数，而不是把i加入N；45和55对应累加数值的误读，9则漏算了一轮，起点i=0也会执行循环体。",
            tags: ['循环', '输入输出'],
        },
    {
      id: 10,
      type: 'single',
      question: `下面 C++ 代码执行后输出的是（ ）。\n\`\`\`cpp\nint N = 0;\nfor (int i = 1; i < 10; i += 2) {\n if (i % 2 == 1)\n continue;\n N += 1;\n}\ncout << N;\n\`\`\``,
      options: ['5', '4', '2', '0'],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\ni从1开始每次加2，循环体内依次取1、3、5、7、9，全为奇数。每轮都执行continue，跳过后面的N+=1，因此N始终为0，输出0，选D。continue之后仍执行for的i+=2更新，所以循环会正常终止，而非死循环。",
            tags: ['循环', '条件判断'],
        },
    {
      id: 11,
      type: 'single',
      question: `下面 C++ 代码执行时输入 \`14+7\` 后，正确的输出是（ ）。\n\`\`\`cpp\nint P;\nprintf("请输入正整数P: ");\nscanf("%d", &P);\nif (P % 3 || P % 7)\n printf("第5行代码%d, %d", P % 3, P % 7);\nelse\n printf("第7行代码%2d", P % 3 && P % 7);\n\`\`\``,
      options: ['第5行代码2, 0', '第5行代码1, 0', '第7行代码 1', '第7行代码 0'],
      answer: 0,
      score: 2,
      explanation: "**答案：A**\n\nscanf的%d从14+7中成功读取整数14，+7留在输入流。14%3=2，14%7=0，条件2||0为真，执行第5行，输出“第5行代码2, 0”，选A。代码还会先输出输入提示，选项仅列分支结果。不能把输入字符14+7自动求成21，也不能把逻辑或误当成两边必须都非零。",
            tags: ['条件判断', '输入输出'],
        },
    {
      id: 12,
      type: 'single',
      question: `执行下面 C++ 代码后得到的输出是（ ）。\n\`\`\`cpp\nint count = 0, i, s;\nfor (i = 0, s = 0; i < 20; i++, count++)\n s += i++;\ncout << s << " " << count;\n\`\`\``,
      options: ['190 20', '95 10', '90 19', '90 10'],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\n循环体中的i++先把当前i加入s，再使i加1；for更新处又执行一次i++并使count加1。因此参与累加的i依次为0、2、4、…、18，共10项，总和90。最后i变为20时退出，count=10，输出90 10，选D。不能漏看循环体里的后置自增。",
            tags: ['循环', '输入输出'],
        },
    {
      id: 13,
      type: 'single',
      question: "下面 C++ 代码拟用于计算整数 `N` 的位数，比如对 `123` 则输出 `123是3位整数`，但代码中可能存在 bug。下列描述正确的是（ ）。\n```cpp\nint N, N0, rc = 0;\ncout << \"请输入整数：\";\ncin >> N;\nN0 = N;\nwhile (N) {\n rc++;\n N /= 10;\n}\nprintf(\"%d是%d位整数\\n\", N, rc); // L11\n```",
      options: [
        '变量 N0 占用额外空间，可以去掉',
        '代码对所有整数都能计算出正确位数',
        'L11 标记的代码行简单修改后可以对正整数给出正确输出',
        'L11 标记的代码行的输出格式有误'
      ],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\n循环不断执行N/=10，正整数最终变为0，rc记录位数，但原输出行使用已变成0的N。把该行第一个数值参数改成备份N0，即可为正整数输出原数及正确位数，因此选C。0不会进入循环，rc仍为0，所以不能宣称全部整数都正确；格式%d本身适合int参数，不是格式串错误。",
            tags: ['循环', '输入输出'],
        },
    {
      id: 14,
      type: 'single',
      question: "下面的 C++ 代码用于求连续输入的若干正五位数的百位数之和。例如输入 `32488 25731 41232 0`，则输出 `3个正五位数的百位数之和为13`。有关描述错误的是（ ）。\n```cpp\nint M, Sum = 0, rc = 0;\ncout << \"请输入正整数：\";\ncin >> M;\nwhile (M) {\n M = (M / 100 % 10); // L6\n Sum += M;\n rc++;\n cin >> M;\n}\ncout << rc << \"个正五位数的百位数之和为\" << Sum;\n```",
      options: [
        '如果输入 `23221 23453 12345 11111 0`，则最后一行中 Sum 的值是 10',
        '如果输入 `2322 2345 1234 1111 0`，程序也能运行',
        '将 L6 改为 `M = (M % 1000 / 100);` 同样能实现题目要求',
        '将 L6 改为 `M = (M % 100 / 10);` 同样能实现题目要求'
      ],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\nM/100%10与M%1000/100都取正整数的百位，而M%100/10取十位，所以D不能完成所需功能。A的百位依次为2、4、3、1，总和10；四位数同样可以执行这段取位代码，B并不错误。每轮末重新读入M，输入0时退出，不能因中途把M改成一位数就认定循环无法继续。",
            tags: ['循环', '输入输出'],
        },
    {
      id: 15,
      type: 'single',
      question: `如果一个正整数 \`N\` 能够表示成 \`X * (X + 1)\` 的形式，这里称它是一个“兄弟数”。例如，输入 6，则输出“6是一个兄弟数”。下面 C++ 代码用来判断 \`N\` 是否为一个“兄弟数”，在横线处应填入的代码可从 i)-iv) 中选择，则有几个能完成功能？（ ）\n\`\`\`cpp\nint N;\ncin >> N;\nfor (int i = 0; i <= N; i++)\n    if (________)\n        cout << N << "是一个兄弟数\\n";\n\`\`\`\ni) \`N == i * (i + 1)\`\nii) \`N == i * (i - 1)\`\niii) \`N / (i + 1) == i\`\niv) \`N / (i - 1) == i\``,
      options: ['1', '2', '3', '4'],
      answer: 1,
      score: 2,
      explanation: "**答案：B**\n\n按通常不溢出的整数范围，i)直接检查N=i(i+1)，ii)检查N=i(i-1)，只是用较大的相邻数作候选，都能判定兄弟数，所以选B，共2个。iii)整数除法会丢余数，N=3、i=1时3/2=1会误报；iv)枚举到i=1会出现除零，不能完成一般输入。原卷未设N上界，实际程序还应采用更宽类型避免候选乘法溢出。",
            tags: ['条件判断', '运算符'],
        },
    {
      id: 16,
      type: 'judge',
      question: `小杨最近开始学习 C++ 编程，老师说 C++ 是一门面向对象的编程语言，也是一门高级语言。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: "**判断：正确**\n\nC++支持面向对象编程，也属于高级程序设计语言，题目叙述正确。它同时支持过程式等编程方式，并不因为可以操作底层内存就成为机器语言。编译器负责把源程序翻译成目标代码，语言支持的抽象层次与是否可以访问底层资源是不同问题。",
            tags: ['计算机基础'],
        },
    {
      id: 17,
      type: 'judge',
      question: `在 C++ 中，表达式 \`10 / 4\` 和 \`10 % 4\` 的值相同，都是整数 \`2\`，说明 \`/\` 和 \`%\` 可以互相替换。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\n10/4和10%4在这组输入下碰巧都为2，但/求整数商，%求余数，不能据此互换。例如11/4=2，而11%4=3，两个运算已经不同。一个样例得到相同结果不足以证明两种运算等价，因此原叙述错误。",
            tags: ['运算符'],
        },
    {
      id: 18,
      type: 'judge',
      question: `N 是 C++ 程序中的整型变量，则语句 \`scanf("%d", &N)\` 能接收正整数、负整数和 \`0\` 输入，但如果输入含字母或带小数点的数，将导致程序无法执行。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\n%d会尝试读取整数，不会因输入里出现字母或小数点而自动使整个程序不能执行。例如3.14能成功读入3，返回成功转换数1，.14留在流中；abc无法形成整数时，匹配失败返回0，原变量不会被赋新值。程序需检查返回值，并避免使用未初始化变量；题目的绝对断言错误。",
            tags: ['输入输出', '数据类型'],
        },
    {
      id: 19,
      type: 'judge',
      question: `下面 C++ 代码能够执行，则将输出 \`45\`。\n\`\`\`cpp\nfor (int i = 0; i < 10; i++)\n Sum += i;\ncout << Sum;\n\`\`\``,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\n代码没有交代Sum原值，因此不能保证输出45，判断错误。若此前Sum=0，累加0至9后确为45；若此前Sum=1，则为46，两种都可以成功执行。若完全没有声明Sum则无法编译，但不能无视题目“能够执行”的前提，只以片段未展示声明作为唯一判错依据。",
            tags: ['循环', '输入输出'],
        },
    {
      id: 20,
      type: 'judge',
      question: `在 C++ 代码中整型变量 \`X\` 被赋值为 \`20.24\`，则 \`cout << (X++, X + 1) / 10\` 执行后输出的是 \`2.124\`。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\nX为int，赋值20.24后截断为20。逗号表达式先执行X++，X变为21；再求X+1得到22，整个括号的值为22。随后整数除法22/10得到2，所以输出2而不是2.124，判断错误。逗号运算对左右两部分提供顺序，不能把它误当成一次同时求值。",
            tags: ['输入输出', '数据类型'],
        },
    {
      id: 21,
      type: 'judge',
      question: `下面 C++ 代码执行后，最后一次输出是 \`10\`。\n\`\`\`cpp\nfor (int i = 1; i < 10; i += 3)\n cout << i << endl;\n\`\`\``,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\ni在循环体执行时依次为1、4、7，分别输出后再加3。更新到10时i<10不成立，循环退出，不会输出10，最后一次输出是7，判断错误。循环变量到达退出值与该值进入循环体是两回事，不能把更新序列的最后一个值直接当最后一次输出。",
            tags: ['循环', '输入输出'],
        },
    {
      id: 22,
      sourceIntegrity: 'official-source-defect',
      integrityNote: "ANSWER-DOUBT：原卷p5将break通常与if配合判错，题干并非必须配合，旧解析不能证明该判断；保留answer=1并暂停计分，等待来源澄清。",
      type: 'judge',
      question: `在 C++ 中，\`break\` 语句通常与 \`if\` 语句配合使用。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**原卷疑点，暂停计分**\n\nANSWER-DOUBT：原卷p5判断表为×，但题干是“break语句通常与if语句配合使用”，并非“必须”。if(条件) break是有效且常见的循环提前退出写法；switch中也可使用break，只能说明if不是必要条件，不能推出“通常”这一经验描述为假。旧解析还误称switch的break强制。保留answer=1及原文，暂停计分，等待来源澄清。",
            tags: ['循环', '条件判断'],
        },
    {
      id: 23,
      type: 'judge',
      question: `在 C++ 代码中，不可以将变量命名为 \`five-star\`，因为变量名中不可以出现 \`-\`（减号）符号。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: "**判断：正确**\n\nfive-star含有减号，不是单个合法标识符；编译器会将其分成five、减号、star三个记号，所以原叙述正确。下划线与减号不同，five_star在通常场景是合法命名；字母与数字也可参与名字，但首字符不能是数字，不能把这些符号混在一起记忆。",
            tags: ['变量与标识符'],
        },
    {
      id: 24,
      type: 'judge',
      question: `在 C++ 语言中，整型、实数型、字符型、布尔型是不相同的数据类型，但这四种类型的变量间都可以比较大小。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: "**判断：正确**\n\n这些算术类型的值可以按语言规则转换后参与大小比较，判断正确。bool可提升为int的0或1，char比较其编码值，混合浮点与整数比较时还会发生相应转换。以常见ASCII编码为例，A为65、a为97、0字符为48，顺序是a>A>0字符；不要像旧解析那样把65写成大于97。",
            tags: ['数据类型'],
        },
    {
      id: 25,
      type: 'judge',
      question: `C++ 中，定义变量 \`int a = 5, b = 4, c = 3\`，则表达式 \`(a < b < c)\` 的值为逻辑假。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\n连续关系运算按左结合分组为(a<b)<c。a=5、b=4时5<4为false，参与下一次比较时转为0；0<3为true，因此整个表达式为真，题目声称逻辑假，判断错误。语法允许这样连续书写，但并不表达数学上的a<b且b<c；后者应使用两个比较再用&&连接。",
            tags: ['数据类型'],
        },
    {
      id: 26,
      type: 'programming',
      question: "\n# [GESP202409 一级] 小杨购物\n\n## 题目描述\n\n小杨有 $n$ 元钱用于购物。商品 A 的单价是 $a$ 元，商品 B 的单价是 $b$ 元。小杨想购买**相同数量**的商品 A 和商品 B。请你编写程序，计算他最多能够购买多少个商品 A 和多少个商品 B。\n\n## 输入格式\n\n第一行包含一个正整数 $n$，表示小杨用于购物的钱数。\n\n第二行包含一个正整数 $a$，表示商品 A 的单价。\n\n第三行包含一个正整数 $b$，表示商品 B 的单价。\n\n对于全部数据，保证 $1 \\le n,a,b \\le 10^5$。\n\n## 输出格式\n\n输出一行，包含一个整数，表示小杨最多能够购买的商品 A 和商品 B 的数量。\n",
      samples: [
        { input: `12\n1\n2`, output: `4` },
        { input: `13\n1\n2`, output: `4` }
      ],
      template: `#include <iostream>
using namespace std;

int main() {
    // 在此填写代码
    return 0;
}`,
      referenceCode: `#include <iostream>
using namespace std;

int main() {
    int n, a, b;
    cin >> n >> a >> b;
    cout << n / (a + b) << "\\n";
    return 0;
}`,
      answer: '',
      score: 25,
      explanation: "**解析**\n\n每购买1件A与1件B合计花a+b元，购买同样数量q件各需q(a+b)元。因此最大q为整数商n/(a+b)，输出的是每一种商品的数量，并非两种数量之和。样例12元与13元、单价1和2都只能各买4件。原卷1<=n,a,b<=100000，a+b最大200000，int足够；钱不足一对时应输出0。时间和额外空间均O(1)。",
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.operator],
    },
    {
      id: 27,
      type: 'programming',
      question: "\n# [GESP202409 一级] 美丽数字\n\n## 题目描述\n\n小杨有 $n$ 个正整数。他认为一个正整数是美丽数字，当且仅当这个正整数是 **9 的倍数但不是 8 的倍数**。请你编写程序，计算这 $n$ 个正整数中美丽数字的数量。\n\n## 输入格式\n\n第一行包含一个正整数 $n$，表示正整数的个数。\n\n第二行包含 $n$ 个正整数 $a_1, a_2, ..., a_n$。\n\n对于全部数据，保证 $1 \\le n \\le 10^5$，$1 \\le a_i \\le 10^5$。\n\n## 输出格式\n\n输出一个整数，表示其中美丽数字的数量。\n",
      samples: [{"input":"3\n1\n9\n72","output":"1"}],
      template: `#include <iostream>
using namespace std;

int main() {
    // 在此填写代码
    return 0;
}`,
      referenceCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int count = 0;
    while (n--) {
        int val;
        cin >> val;
        if (val % 9 == 0 && val % 8 != 0) {
            count++;
        }
    }
    cout << count << "\\n";
    return 0;
}`,
      answer: '',
      score: 25,
      explanation: "**解析**\n\n逐个读取n个正整数，若val%9==0且val%8!=0则计数加1，条件以&&连接，计数初始为0。样例1、9、72中只有9符合，结果1。数字可以重复，每次出现都按一个输入元素统计，不能先去重。原卷n与每个数最大100000，计数至多n；时间O(n)，额外空间O(1)。",
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.condition],
    }
  ]
};
