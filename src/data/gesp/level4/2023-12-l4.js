// 2023-12-l4 五维核验记录见 docs/question-bank-verification
export const paperData = {
    id: "2023-12-l4",
    title: "2023年12月 GESP C++ 四级真题",
    level: 4,
    year: 2023,
    month: 12,
    session: 4,
    note: "年度收官",
    timeLimit: 5400,
    backfilled: true,
    source: {
        officialPdf: "https://gesp.ccf.org.cn/101/attach/1601236293910560.pdf",
        notes: "AI-Codex逐页对照登记mirror PDF全部10页；Q6/Q9前提疑点、Q16/Q20原文与判定冲突保持隔离；全部answer字段保持。",
        url: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2023%E5%B9%B412%E6%9C%88-C%2B%2B4%E7%BA%A7.pdf",
        type: "official"
    },
    verification: {
        status: "partial",
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-08",
        scope: "全卷五维逐题对照mirror PDF，参考程序独立编译运行，源疑点保持隔离。",
        notes: "AI-Codex逐页对照登记mirror PDF全部10页，Git blob SHA 35a12a9b23ece4c7477614c2e862ab8233af8612一致，p1单选及p5判断表逐项一致，27个answer字段保持。Q6大小前提、Q9编码前提、Q16原声明非法/判断冲突、Q20文件未写却判错隔离；恢复Q4选项布局、Q26完整字符集和样例1句点，两参考与模板保持。",
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
            type: "single",
            question: "下面有关函数参数的说法，正确的是 ( ) 。",
            options: [
                "函数参数传递时，主函数当中采用值传递方式将参数传递给子函数时，若子函数将参数值改变，主函数当中 的参数值不变。",
                "函数参数传递时，主函数当中采用值传递方式将参数传递给子函数时，若子函数将参数值改变，主函数当中 的参数值将随子函数一样改变而改变。",
                "函数参数传递时，主函数如果将参数的地址传递给子函数，若子函数将参数值改变，主函数当中的参数值将 不改变。",
                "函数参数传递可以不满足子函数的参数个数要求。"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n按普通对象的值传递语义，形参得到实参的值，函数内直接给形参重新赋值不会改变调用方的原变量，所以A成立。B把这一效果写反。传入地址后若通过解引用写入被指向对象，可以改变调用方对象，不能笼统认为一定不变；仅给指针形参重新赋地址则另当别论。调用还必须满足必要参数要求，有默认值的参数可按规则省略，D并非允许任意缺参。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 2,
            type: "single",
            question: "下面 C++ 代码执行后，输出的是 ( ) 。",
            code: "int arr[10]={1};\nstring strArr=\"chen a dai\";\ncout<<strArr[arr[1]]<<endl;",
            requiresCode: true,
            sourcePage: 1,
            sourceVerified: true,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-08",
            options: [
                "chen",
                "c",
                "chen a dai",
                "dai"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\nint arr[10]={1}只把首元素初始化为1，其余元素补零，因此arr[1]=0。strArr[arr[1]]就是字符串第0个字符c，输出c，选B。方括号对string进行字符索引，不是按空格分词，也不会把整个字符串或最后一个单词输出。原数组容量为10，不应误读成全部十个元素都等于1。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 3,
            type: "single",
            question: "下面 C++ 代码最后执行后输出是 ( ) 。",
            code: "int fun1(int *n)\n{\n    return *n**n;\n}\nint main()\n{\n    int arr[10]={2};\n    arr[1]=fun1(arr);\n    cout<<arr[1]<<endl;\n}",
            requiresCode: true,
            sourcePage: 1,
            sourceVerified: true,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-08",
            options: [
                "1",
                "2",
                "3",
                "4"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\narr[10]={2}使arr[0]=2，其余元素为0。调用fun1(arr)时，数组名转换为指向首元素的指针，*n取得2。表达式*n**n在词法和优先级下相当于(*n)*(*n)，得到4，写入arr[1]后输出4，选D。这里的两个星号并非幂运算符，也不是对int值进行二次解引用；应结合乘法和一元解引用的上下文解析。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 4,
            type: "single",
            question: "下面 C++ 代码执行后的结果是 ( ) 。",
            code: "int arr[3][3]={{1,2,3},{4,5,6},{7,8,9}};\nfor(int i=0;i<3;i++)\n{\n    for(int j=2;j>=0;j--)\n    {\n        cout<<arr[i][j]<<\" \";\n    }\n    cout<<endl;\n}",
            requiresCode: true,
            sourcePage: 2,
            sourceVerified: true,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-08",
            options: [
                "```text\n1 2 3\n4 5 6\n7 8 9\n```",
                "`1 2 3 4 5 6 7 8 9`",
                "```text\n3 2 1\n6 5 4\n9 8 7\n```",
                "`9 8 7 6 5 4 3 2 1`"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n外层i从0到2逐行处理，内层j从2减到0，故每一行按列逆序输出，三行分别为3 2 1、6 5 4、9 8 7，对应C。每个数字后还输出一个空格，行末输出换行。不是把行的先后顺序倒过来，也不是转置矩阵；本轮按原卷恢复A/C的三行结构及B/D的单行顺序，避免压缩选项后失去排列含义。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 5,
            type: "single",
            question: "下面 C++ 代码执行后输出是（ ）。",
            code: "int arr[3]={1,2,3};\nint *p=NULL;\np=arr;\np++;\ncout<<*p<<endl;",
            requiresCode: true,
            sourcePage: 2,
            sourceVerified: true,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-08",
            options: [
                "1,2,3",
                "1",
                "2",
                "3"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\np最初为NULL，随后执行p=arr，使其指向arr[0]，再执行p++后指向arr[1]。解引用*p取得第二个元素2，选C。指针加1按元素类型向后移动一个元素，不是给该元素的值加1；这里数组有三个元素，移动后的位置合法，原来的空指针在解引用之前已经被有效数组地址替换。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 6,
            type: "single",
            question: "如果变量 x 的地址是 0x6ffe14, 下面 C++ 代码执行以后输出的是（ ）。",
            code: "int *p=NULL;\nint x=2;\np=&x;\np++;\ncout<<p<<endl;",
            requiresCode: true,
            sourcePage: 2,
            sourceVerified: true,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-08",
            options: [
                "0x6ffe11",
                "0x6ffe14",
                "0x6ffe18",
                "0x6ffe15"
            ],
            answer: 2,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n单个int对象可按长度1数组的规则形成尾后指针，p++本身不等于越界解引用。地址差按对象大小计，是sizeof(int)。仅在int为4字节且采用题给地址记法时，0x6ffe14+4=0x6ffe18，对应源C；未给这一平台大小和显示约定，不能无条件断言。保留answer=2并隔离。核验只测本机尾后地址整数表示差，不解引用尾后指针或伪造固定地址。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT Q6。原卷p2代码p++向后移动sizeof(int)个字节，只有sizeof(int)=4时从0x6ffe14到0x6ffe18。题面未给int四字节或地址输出格式前提，源C/题库2保持，等待平台约定澄清。可形成单对象尾后指针，但不能解引用。"
        },
        {
            id: 7,
            type: "single",
            question: "在 C++ 中 , 执行下面代码后，输出的是（ ）。",
            code: "int point(int *p)\n{\n    return *p**p;\n}\nint main()\n{\n    int a=20;\n    int *p=&a;\n    *p=point(p);\n    cout<<*p<<endl;\n}",
            requiresCode: true,
            sourcePage: 3,
            sourceVerified: true,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-08",
            options: [
                "400",
                "200",
                "20",
                "100"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\np指向a，point(p)中的*p为20，返回表达式*p**p即20*20=400。随后*p=point(p)把400存入a，再输出*p得到400，选A。函数形参是一个指针值副本，但仍能通过它访问原对象；返回值在赋值完成前已计算好，不会因为a随后改变而重新计算乘法。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 8,
            type: "single",
            question: "下列 C++ 语句执行以后结果是 true 的是（ ）。",
            options: [
                "3&&false",
                "5&&2",
                "101&&000",
                "4&true"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n逻辑与&&把操作数按真假判断，两个都非零时结果true。5&&2为true，B正确；3&&false为false，101&&000中000的数值为0，因此false。4&true使用按位与而非逻辑与，true转换为1，4的二进制100与001按位相与为0。表达式是否“有两个非零值”必须先分清使用的是&&还是&。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 9,
            type: "single",
            question: "在如下的 C++ 代码中实现了对字符串中出现的 26 个字母的个数统计，横线处应填入是（ ）。",
            code: "string str=\"HELLO CHEN A DAI\";\nint strlen=str.length();\nchar alpha[26]={65};\nint cnt[26]={0};\nfor(int i=1;i<26;i++)\n{\n    ________________;\n}\nfor(int i=0;i<26;i++)\n{\n    cout<<alpha[i]<<\" \";\n}\ncout<<endl;\nfor(int i=0;i<26;i++)\n{\n    for(int j=0;j<strlen;j++)\n    {\n        if(alpha[i]==str[j])\n        {\n            cnt[i]++;\n        }\n    }\n}\nfor(int i=0;i<26;i++)\n{\n    cout<<cnt[i]<<\" \";\n}",
            requiresCode: true,
            sourcePage: 3,
            sourceVerified: true,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-08",
            options: [
                "alpha[i]=alpha[i-1]+1;",
                "alpha[i]=alpha[i]+1;",
                "alpha[i+1]=alpha[i]+1;",
                "alpha[i-1]=alpha[i]+1;"
            ],
            answer: 0,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n在ASCII兼容编码下，alpha[0]=65就是A；循环让alpha[i]=alpha[i-1]+1便依次生成B..Z，源表选A。B把各初始零项加1，不能生成字母；C不仅初始值不对，i=25时还写alpha[26]越界；D反向覆盖前项。原题未约定ASCII兼容字符集，C++不保证65为A或字母连续，所以本轮保留源A/题库0并隔离，运行结果仅验证当前工具链，不上升为所有实现的保证。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT Q9。原卷p3用char alpha[26]={65}及逐次+1生成大写字母，源A依赖ASCII兼容执行字符集及A..Z连续。题面未给这一编码前提，C++不保证65就是A或字母编码连续；保留源A/题库0，待平台约定澄清。"
        },
        {
            id: 10,
            type: "single",
            question: "下面 C++ 代码执行后生成的文件其字节数为（ ）。",
            code: "ofstream fout;\nfout.open(\"1.txt\");\nfor(int i=1;i<=10;i++)\n{\n    if(i%5==0)\n    {\n        int x=6;\n        fout<<x;\n    }\n    else\n    {\n        char ch='A';\n        fout<<ch;\n    }\n}",
            requiresCode: true,
            sourcePage: 4,
            sourceVerified: true,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-08",
            options: [
                "10",
                "16",
                "40",
                "24"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\nofstream以格式化文本输出写入数据。i=1..10中，5和10两次写整数6，产生字符6；其余八次各写字符A，内容合起来为AAAA6AAAA6，共10个字符，在题设通常字符文件环境下为10字节，对应A。整数6的格式化表示不是把int对象的全部内存原样写出，因此不能按两次sizeof(int)另加八个字符来算。核验文件在外部证据目录创建，未覆盖仓库文件。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 11,
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2023%E5%B9%B412%E6%9C%88-C%2B%2B4%E7%BA%A7.pdf",
            verificationNote: "AI-Codex 对照CCF原卷镜像 https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2023%E5%B9%B412%E6%9C%88-C%2B%2B4%E7%BA%A7.pdf 第4页文本及渲染图核对。",
            sourcePages: [
                4
            ],
            type: "single",
            question: "下列 C++ 代码输入1,2,3,4，执行后，将输出的是（ ）。",
            code: "string str=\"\";\ncin>>str;\nint strlen=str.length();\nfor(int i=0;i<strlen;i++)\n{\n    if(str[i]<='9'&&str[i]>='0')\n    {\n        cout<<str[i];\n    }\n    else\n    {\n        cout<<\"#\";\n    }\n}",
            requiresCode: true,
            sourcePage: 4,
            sourceVerified: true,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-08",
            options: [
                "1#4#",
                "1#3#",
                "1#2#3#4#",
                "1#2#3#4"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\ncin>>str把没有空格的1,2,3,4整个读入字符串。循环逐字符处理，数字1/2/3/4原样输出，三个逗号各替换为#，最终得到1#2#3#4，选D。最后一个字符是4而非逗号，所以末尾没有额外#。这里输入不是四个独立整数，逗号也不会被字符串输入自动丢弃或作为空白分隔。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 12,
            type: "single",
            question: "以下 C++ 代码用于实现每个整数对应的因数，如输入12，则输出1 2 3 4 6 12；如输入18，则输出1 2 3 6 9 18。横线处应填入代码是（ ）。",
            code: "int n;\ncin>>n;\nfor(int i=1;i<=n;i++)\n{\n    ________\n    {\n        cout<<i<<\" \";\n    }\n}",
            requiresCode: true,
            sourcePage: 4,
            sourceVerified: true,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-08",
            options: [
                "if(n%i==0)",
                "if(n/i==0)",
                "if(n%i!=0)",
                "if(n/i!=0)"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n正整数n的正因数i恰好满足n%i==0。因此从1枚举到n并在余数为0时输出，填A。n/i==0在这个枚举范围内通常不会成立；n%i!=0选的是非因数；n/i!=0则几乎把整个1..n都输出。原题例子12与18的输出都包含1和自身，循环端点不应漏掉n。本轮补全原代码并对多个正整数按乘积配对预言机核对。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 13,
            type: "single",
            question: "某公司新出了一款无人驾驶的小汽车，通过声控智能驾驶系统，乘客只要告诉汽车目的地，车子就能自动 选择一条优化路线，告诉乘客后驶达那里。请问下面哪项不是驾驶系统完成选路所必须的。（ ）",
            options: [
                "麦克风",
                "扬声器",
                "油量表",
                "传感器"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n按题目描述的语音目的地输入、路线选择、告知乘客这一完整系统，麦克风用于接收语音，扬声器用于告知结果，传感器提供行驶感知信息。油量表用于显示燃料状态，不是所述声控选路功能所必须的组件，因此源表选C。这里判断的是题目给定任务中的用途，不能把“并非必须”误解为车辆中绝对不能安装该设备。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 14,
            type: "single",
            question: "现代计算机是指电子计算机，它所基于的是（ ）体系结构。",
            options: [
                "艾伦·图灵",
                "冯·诺依曼",
                "阿塔纳索夫",
                "埃克特-莫克利"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n本题按计算机基础教材中的经典存储程序体系结构提问，答案为冯·诺依曼，选B。其核心是把程序与数据存储起来，由运算器、控制器、存储器、输入和输出等部分协作执行指令。图灵等人的理论或历史贡献不等同于这一本题指定的体系结构名称。这个教材分类也不应延伸成现实所有电子设备只可能采用完全相同的内部结构。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 15,
            type: "single",
            question: "输入一 个正整数N（N>=7)，想找出它所有相邻的因数对，比 如，输入 12，因数对有(1,2)、(2,3)、(3.4) 。下面 哪段代码找不到所有的因数对?()",
            options: [
                "`for(i=1;i<N;i++) if(!(N%i) && !(N%(i+1))) printf(\"(%d,%d)\\n\", i, i+1);`",
                "`for(i=2;i<N;i++) if(!(N%i) && !(N%(i+1))) printf(\"(%d,%d)\\n\", i, i+1);`",
                "`for(i=2;i<N/2;i++) if(!(N%(i-1)) && !(N%i)) printf(\"(%d,%d)\\n\", i-1, i);`",
                "`for(i=1;i<N/2;i++) if(!(N%i) && !(N%(i+1))) printf(\"(%d,%d)\\n\", i, i+1);`"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n相邻因数对指相差1且都整除N的一对。B从i=2开始，只枚举(2,3)及以后，会漏掉偶数N的(1,2)，因此不能保证找全，选B。A/D从1开始；C用i作为后一项，从2开始可枚举(1,2)。对于N>=7，相邻因数对的较大项小于N/2；等于N/2只可能导致N为4或6，已被范围排除，所以C的上界不会再漏合法对。N为奇数时没有这种相邻对，不影响B作为一般算法有反例。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "C++的内置函数 sort() 支持数组的局部排序。例如 int a={10,9,8,7,6,5,4,3,2,1} ，可以用 sort(a,a+5) ,排序成 {6,7,8,9,10,5,4,3,2,1} 。( )",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n源文写的是int a={10,9,8,7,6,5,4,3,2,1}，缺少数组声明的[]，这是给标量int过多初始化元素，不能编译；sort(a,a+5)也不适用于这个标量。若明确改成int a[]再排序前五项，才会得到6、7、8、9、10、5、4、3、2、1，但本轮不擅自改原文。源判断√与原代码冲突，题库answer=0保持并隔离。仅以编译诊断验证原声明非法，补[]版本另作为带标注的条件说明运行。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级"
            ],
            sourceIntegrity: "answer-key-conflict",
            integrityNote: "ANSWER-DOUBT Q16。mirror p5原文明确写int a={10,9,8,7,6,5,4,3,2,1}，没有[]，标量int不能以多个元素初始化，随后sort也不能接受整数作迭代器。原表√与原代码冲突，题库answer=0保持，不擅自加[]改写原卷。"
        },
        {
            id: 17,
            verificationNote: "AI-Codex 对照CCF原卷镜像 https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2023%E5%B9%B412%E6%9C%88-C%2B%2B4%E7%BA%A7.pdf 第5页文本及渲染图核对。",
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2023%E5%B9%B412%E6%9C%88-C%2B%2B4%E7%BA%A7.pdf",
            sourcePage: 5,
            sourcePages: [
                5
            ],
            reviewedAt: "2026-11-08",
            reviewedBy: "AI-Codex",
            sourceVerified: true,
            type: "judge",
            question: "用递归法求 n 的阶乘，时间复杂度是 O(n)。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n常见递归阶乘写成n<=1时返回1，否则计算n*fact(n-1)。每层仅做常量次操作，共约n层，按固定宽整数模型时间复杂度O(n)，原判断正确；递归栈空间也为O(n)。这不表示任意大的n都能用普通整数精确表示阶乘，大整数乘法成本和固定宽整数溢出是另外需要说明的限制。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级"
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "[(1,2)*2]*3 在C++中是合法的表达式。( )",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n方括号不是C++里可随意替代圆括号的数学分组符号。[(1,2)*2]*3在这种独立表达式位置不满足合法下标表达式或lambda语法，无法编译，所以原判断错误。(1,2)内部可作为逗号表达式，其值为2，但这不能挽救外面的非法方括号。不能先把所有括号都按数学括号算值，再反推C++语法合法。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级"
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "在下面的C++代码中，将对1.txt文件写入 hello 。( )",
            code: "ifstream filein;\nofstream fileout;\nfilein.open(\"1.txt\");\nfileout<<\"hello\";",
            requiresCode: true,
            sourcePage: 5,
            sourceVerified: true,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-08",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n代码只把filein这个输入流关联到1.txt，fileout输出流没有open文件。向尚未关联文件的fileout写入hello会使流写入失败，并不会因为变量名字相似就自动写入filein打开的文件，所以判断错误。文件流对象是彼此独立的，必须把真正承担输出的对象关联到目标文件。核验检查失败状态并确认输入文件内容保持。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级"
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "文本文件 1.txt 第1行由 01234 共5个字符组成其间没有空格，当用C++代码正常打开文件成功并执行如下 代码以后，第1行长度为5（ ）",
            code: "ifstream filein;\nint buff;\nfilein.open(\"1.txt\");\nfilein>>buff;\ncout<<buff<<endl;",
            requiresCode: true,
            sourcePage: 6,
            sourceVerified: true,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-08",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\nfilein以输入模式读取原文件01234，默认十进制解析得到整数1234，随后cout输出1234到标准输出。代码没有任何向文件写回的语句，文件第一行仍保留01234共5个字符，因此按原题“第1行长度为5”指原文件时应成立。源表却为×，题库answer=1保持并隔离；若原意是标准输出长度，需由来源澄清，不能自行把文件改成标准输出。外部只读见证同时保存stdout和文件前后字节。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级"
            ],
            sourceIntegrity: "answer-key-conflict",
            integrityNote: "ANSWER-DOUBT Q20。mirror p5-6只ifstream读取01234到int buff，再cout输出1234，没有修改文件。原文件第一行仍是5字符，与题源判断表×/题库answer=1冲突；不能把标准输出4字符冒充文件已重写。严格保持answer=1并暂停计分。"
        },
        {
            id: 21,
            type: "judge",
            question: "执行 C++ 代码cout<<(5||2);后将输出1。（ ）",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n5和2都为非零整数，转换为布尔值均为true。逻辑或||只要有一个操作数为真就产生true，cout默认未启用boolalpha时把布尔真输出为1，所以原判断正确。这里不进行按位或，也不把两个整数加起来；若另行开启boolalpha才会改变显示文本，给定代码本身没有设置该格式。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级"
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "在 C++ 中，两个字符串相加的运算符为+相当于字符串的合并运算。下面 C++ 代码执行后，将输出 chenadai。（ ）",
            code: "string a=\"chen\";\nstring b=\"a\";\nstring c=\"dai\";\nstring name=a+b+c;\ncout<<name<<endl;",
            requiresCode: true,
            sourcePage: 6,
            sourceVerified: true,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-08",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\na、b、c都是std::string，+用于字符串连接，先把chen与a连接，再与dai连接，得到chenadai，输出与原句一致，判断正确。连接不会自动在词之间加入空格或分隔符；若是两个裸字符串字面量之间直接使用+，则是不同的类型和语法问题，不能混同本题已定义的string对象。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级"
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "C++ 内置函数sort()可以对整数、浮点数、字符数组进行从大到小，从小到大，局部排序。（ ）",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n标准库std::sort可用于具备随机访问迭代器的区间，普通整数、浮点数、字符数组都可提供这样的首尾指针。默认比较器按升序排列，也可提供合适比较器降序；指定子区间则只排序该范围，判断正确。它属于标准库算法，并非语言关键字；浮点数测试使用普通有限值，含NaN时还需要满足比较器严格弱序的要求。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级"
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "小杨最近在准备考 GESP ，他用的 Dev C++ 来练习和运行程序，所以 Dev C++ 也是一个小型操作系统。（ ）",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\nDev-C++是用于编辑、编译和运行程序的集成开发环境，属于应用软件。操作系统则管理硬件资源、文件与进程，并为各种应用提供运行环境，两者职责不同。能够启动编译器或运行用户程序不意味着这个应用本身就是操作系统，所以原判断错误。题目在考软件类别，而不是由窗口体积或功能多少决定系统类别。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级"
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "任何一个 while 循环都可以转化为等价的 for 循环（ ）。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\nwhile(condition){body}可以直接改写为for(;condition;){body}，初始化和更新两栏都留空，循环条件与主体保持。这种改写连continue的去向也一致，都是转到下一次条件检查，因此原判断正确。不能随意把主体里的更新语句挪到for第三栏后仍声称总是等价，因为原body中的continue可能跳过该更新。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级"
            ]
        },
        {
            id: 26,
            type: "programming",
            samples: [
                {
                    input: "2\nabc a\nd def\nabc.d.d.abc.abcd.",
                    output: "a.def.def.a.UNK."
                },
                {
                    input: "3\nabc a\nd def\nabcd xxxx\nabc,(d)d!-abc?abcd",
                    output: "a,(def)def!-a?xxxx"
                },
                {
                    input: "1\nabcdefghij klmnopqrst\n!()-[]{}\\|;:'\",./?<>abcdefghijklmnopqrstuvwxyz",
                    output: "!()-[]{}\\|;:'\",./?<>UNK"
                }
            ],
            question: "\n# [GESP202312 四级] 小杨的字典\n\n## 题目描述\n\n在遥远的星球，有两个国家 A 国和 B 国，他们使用着不同的语言：A 语言和 B 语言。小杨是 B 国的翻译官，他的工作是将 A 语言的文章翻译成 B 语言的文章。\n\n为了顺利完成工作，小杨制作了一本字典，里面记录了 $N$ 个 A 语言单词对应的 B 语言单词，巧合的是，这些单词都由地球上的 26 个小写英文字母组成。\n\n小杨希望你写一个程序，帮助他根据这本字典翻译一段 A 语言文章。这段文章由标点符号 `!()-[]{}\\|;:'\",./?<>` 和一些 A 语言单词构成，每个单词之间必定由至少一个标点符号分割，你的程序需要把这段话中的所有 A 语言单词替换成它的 B 语言翻译。特别地，如果遇到不在字典中的单词，请使用大写 UNK 来替换它。\n\n例如，小杨的字典中包含 $2$ 个 A 语言单词 `abc` 和 `d`，它们的 B 语言翻译分别为 `a` 和 `def`，那么我们可以把 A 语言文章 `abc.d.d.abc.abcd.` 翻译成 B 语言文章 `a.def.def.a.UNK.` 其中，单词 `abcd` 不在词典内，因此我们需要使用 UNK 来替换它。\n\n## 输入格式\n\n第一行一个整数 $N$，表示词典中的条目数。保证 $N \\le 100$。\n\n接下来 $N$ 行，每行两个用单个空格隔开的字符串 $A$， $B$ ,分别表示字典中的一个 A 语言单词以及它对应的 B 语言翻译。保证所有 $A$ 不重复；保证 $A$ 和 $B$ 的长度不超过 $10$。\n\n最后一行一个字符串 $S$ ，表示需要翻译的 A 语言文章。保证字符串 $S$ 的长度不超过 $1000$，保证字符串 $S$ 只包含小写字母以及标点符号 `!()-[]{}\\|;:'\",./?<>` 。\n\n## 输出格式\n\n输出一行，表示翻译后的结果。\n\n## 限制与提醒\n\n时间限制1.0秒，内存限制128 MB。不要在输入、输出中附带提示信息。\n",
            score: 25,
            explanation: "**解析**\n\n把小写字母连续段视为单词，遇到标点就结束当前词：查字典，存在则输出翻译，不存在则输出UNK，标点原样保留。末尾若是单词，也要额外结算；不能把长词拆成字典中短词替换。字典最多100项、词长至多10，文章至多1000字符；用map查找，时间约O(S乘单词查找成本)，空间O(字典与输出长度)。原范围包含<>，题库漏录已恢复；原样例1末尾有句点，输入和输出同时按PDF补回。独立正则分段预言机保留所有分隔符，最大输出可比输入长，不应使用固定1000输出缓冲。参考及模板保持。",
            tags: [
                "编程题",
                "哈希",
                "集合"
            ],
            template: "#include <iostream>\n#include <string>\n#include <set>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <iostream>\n#include <string>\n#include <map>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    map<string, string> dict;\n    for (int i = 0; i < n; i++) {\n        string a, b;\n        cin >> a >> b;\n        dict[a] = b;\n    }\n    string s;\n    cin >> s;\n    string result, word;\n    auto flush = [&]() {\n        if (word.empty()) return;\n        auto it = dict.find(word);\n        result += (it != dict.end()) ? it->second : string(\"UNK\");\n        word.clear();\n    };\n    for (char c : s) {\n        if (c >= 'a' && c <= 'z') {\n            word += c;\n        } else {\n            flush();\n            result += c;\n        }\n    }\n    flush();\n    cout << result << endl;\n    return 0;\n}"
        },
        {
            id: 27,
            type: "programming",
            samples: [
                {
                    input: "3\n1 3 5\n2 4 6",
                    output: "2"
                },
                {
                    input: "5\n10 3 5 8 7\n4 6 1 2 9",
                    output: "5"
                }
            ],
            question: "\n# [GESP202312 四级] 田忌赛马\n\n## 题目描述\n\n你要和田忌赛马。你们各自有 $N$ 匹马，并且要进行 $N$ 轮比赛，每轮比赛，你们都要各派出一匹马决出胜负。\n\n你的马匹的速度分别为 $u_1,u_2,\\cdots,u_n$，田忌的马匹的速度分别为 $v_1,v_2,\\cdots,v_n$。田忌会按顺序派出他的马匹，请问你要如何排兵布阵，才能赢得最多轮次的比赛？巧合的是，你和田忌的所有马匹的速度两两不同，因此不可能出现平局。\n\n## 输入格式\n\n第一行一个整数 $N$。保证 $1\\le N \\le 5\\times 10^4$\n\n接下来一行 $N$ 个用空格隔开的整数，依次为 $u_1,u_2,\\cdots,u_n$，表示你的马匹们的速度。保证 $1\\le u_i\\le 2N$。\n\n接下来一行 $N$ 个用空格隔开的整数，依次为 $v_1,v_2,\\cdots,v_n$，表示田忌的马匹们的速度。保证 $1\\le v_i\\le 2N$。\n\n## 输出格式\n\n输出一行，表示你最多能获胜几轮。\n\n## 限制、提醒与样例说明\n\n时间限制1.0秒，内存限制128 MB。不要在输入、输出中附带提示信息。\n\n样例1可依次派速度3、5、1的马，对战田忌的2、4、6，获胜前两轮，共2轮。\n",
            score: 25,
            explanation: "**解析**\n\n把双方速度升序处理，用当前最慢可获胜的马去战胜田忌尚未匹配的最慢马；若自己的当前马仍不够快，它也无法战胜对方更快的马，可作为无法增加胜场的匹配。交换论证表明，用更快的马替代这一最小可胜选择不会增加已获得的胜场，因此贪心得到最多胜场。虽然实际对手顺序固定，匹配好的己方马可按相应轮次派出，排序只是计算最优配对。时间O(NlogN)、额外空间O(N)，N<=50000，两方全部速度互异且在1..2N。独立小规模预言机按状态子集动态规划/增广匹配求最优，不复用参考双指针；最大输入用可证明胜场构造。",
            tags: [
                "编程题",
                "贪心",
                "双指针"
            ],
            template: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> u(n), v(n);\n    for (auto &x : u) cin >> x;\n    for (auto &x : v) cin >> x;\n    sort(u.begin(), u.end());\n    sort(v.begin(), v.end());\n    int wins = 0, i = 0;\n    for (int j = 0; i < n && j < n; i++) {\n        if (u[i] > v[j]) { wins++; j++; }\n    }\n    cout << wins << endl;\n    return 0;\n}"
        }
    ]
};
