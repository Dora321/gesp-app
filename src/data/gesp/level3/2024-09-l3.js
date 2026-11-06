// 2024-09-l3 五维核验记录见 docs/question-bank-verification
export const paperData = {
    id: "2024-09-l3",
    title: "2024年9月 GESP C++ 三级真题",
    level: 3,
    year: 2024,
    month: 9,
    session: 7,
    timeLimit: 5400,
    source: {
        officialPdf: "https://gesp.ccf.org.cn/101/attach/1644702761746464.pdf",
        notes: "AI-Codex逐页对照登记mirror PDF全部8页文本与渲染，p1单选/p5判断表逐项核对，恢复Q12四个原选项与代码版式、补编程范围。保留Q16旧疑点并补隔离字段，Q9/Q10/Q12/Q13/Q18来源疑点保留官方答案隔离。",
        url: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B3%E7%BA%A7.pdf",
        type: "official"
    },
    verification: {
        status: "partial",
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-06",
        scope: "全卷五维逐题对照mirror PDF，参考程序独立编译运行，源疑点保持隔离。",
        notes: "AI-Codex逐页对照登记mirror PDF全部8页文本与渲染，Git blob SHA b24fa856150b7751d986562d76d1438402e43241一致，p1单选/p5判断表逐项一致。保留Q16旧unresolved，补齐隔离字段，并新增Q9/Q10/Q12/Q13/Q18来源疑点。25客观answer与2编程空answer保持。编程范围及原代码按PDF恢复，参考与模板保持。",
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
            question: "下列代码中，输出结果是（ ）。\n\n```cpp\n#include <iostream>\nusing namespace std;\nint main()\n{\n    double a=0.9;\n    double b=1.0;\n    if(((b-a)==0.1))\n    {\n        cout<<\"Equal\"<<endl;\n    }\n    else\n    {\n        cout<<\"Not equal\"<<endl;\n    }\n}\n```",
            options: [
                "Equal",
                "Not equal",
                "程序不能正确执行",
                "没有输出"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n在本卷采用的常见IEEE二进制浮点实现中，0.9与0.1都不能精确表示，1.0减去存储的0.9后得到的值与存储的0.1不完全相同，因此输出Not equal，选B。程序可正常执行并进入else。本机以17位有效数字观察可见差值约为0.099999999999999978，不能以十进制数学恒等式直接判断浮点相等。实际比较近似结果时需依据任务误差范围选容差。",
            tags: [
                "浮点数",
                "条件判断"
            ]
        },
        {
            id: 2,
            type: "single",
            question: "关于计算机中的编码，下列说法中正确的是（ ）。",
            options: [
                "机器数的形式值和真值是一致的",
                "原码就是符号位加上真值",
                "机器数是带符号的",
                "[-1]=[1000 0001]原=[1111 1111]反"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n按本卷带符号编码的术语，机器数包含符号信息，C正确。形式位串按无符号读出的数值与所代表真值不一定相同，负数就能反驳A。原码把符号位与数值的绝对值编码组合，不能简单说是符号位加真值。固定8位时−1的原码为10000001，反码为11111110，而D写成11111111，故不对。这里明确采用题目的带符号编码语境。",
            tags: [
                "二进制",
                "补码"
            ]
        },
        {
            id: 3,
            type: "single",
            question: "8 进制数 3703 转换成 16 进制数是（ ）。",
            options: [
                "7C3",
                "7A3",
                "7B3",
                "7D3"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n八进制3703先按每位三比特展开为011 111 000 011，去掉最前导0后再每四位分组得到0111 1100 0011，即十六进制7C3，选A。按位权也可算3×512+7×64+0×8+3=1987，再验证0x7C3也是1987。分组方向从整数低位开始，不足四位在最高处补0，不能把八进制数码直接逐位替换成十六进制数码。",
            tags: [
                "进制转换"
            ]
        },
        {
            id: 4,
            type: "single",
            question: "0.8125 变成二进制是（ ）。",
            options: [
                "0.1110",
                "0.1 1111 1011 1101",
                "0.1 1111 1011 1100",
                "0.1101"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n0.8125等于13/16，也就是8/16+4/16+1/16，对应二进制小数点后的1/2、1/4、0/8、1/16，结果为0.1101，选D。也可连续乘2依次取整数位1、1、0、1。A的0.1110为0.875；其余长小数串不等于本题数值。这里分母是2的幂，所以能够用有限位二进制小数准确表示。",
            tags: [
                "二进制",
                "补码",
                "进制转换"
            ]
        },
        {
            id: 5,
            type: "single",
            question: "下面说法正确的是（ ）。",
            options: [
                "（22 & 01）==（22 && 01）成立",
                "(23 | 11) == 30",
                "(23 | 10) == 31",
                "(23 | 01) == 31"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\nC正确，因为23为二进制10111，10为01010，按位或为11111即31。A中22&01=0，而22&&01把两个非零数作逻辑与得到1，二者不同。B的23|11也是31而非30，D的23|01仍为23。前导0的01在这里是八进制1，数值不变，但不能据此把所有多位数字都当作二进制来算。",
            tags: [
                "进制转换",
                "位运算",
                "逻辑判断"
            ]
        },
        {
            id: 6,
            type: "single",
            question: "下列说法正确的是（ ）。",
            options: [
                "2 >> 1 和 1 >> 1 的值是一样的",
                "(2 >> 2) 和 (1 >> 1) 的值是一样的",
                "(11 ^ 00) 和 (1 ^ 0) 的值是一样的",
                "(~0 的输出值是 1)"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n2>>2为0，1>>1也为0，所以B正确。A分别为1和0，C的11^00为11而1^0为1，并不相同。在本机补码整数环境中~0为−1，D声称输出1也不正确。应区分按位异或与逻辑判断，表达式中的11按十进制字面量解释，不应因为邻近位运算符就自行改读成二进制3。",
            tags: [
                "位运算",
                "按位取反",
                "逻辑判断"
            ]
        },
        {
            id: 7,
            type: "single",
            question: "下列代码实现的是（ ）。\n\n```cpp\nvoid Swap(int &a, int &b) {\n    if (a != b) {\n        a ^= b;\n        b ^= a;\n        a ^= b;\n    }\n}\n```",
            options: [
                "a 和 b 的异或",
                "a 和 b 的同或",
                "a 和 b 的值交换",
                "a 和 b 的高低位互换"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n函数以引用接收a与b，三条异或赋值会交换两个变量的值，所以C。初始5、10经第一步成为15、10，第二步成为15、5，第三步成为10、5。条件a!=b使相等值时无需执行，也保护两个引用指向同一对象的情形，不会把该对象异或成0。函数并非仅返回一次异或结果，也不涉及把一个数的高低位片段互换。",
            tags: [
                "位运算",
                "异或"
            ]
        },
        {
            id: 8,
            type: "single",
            question: "a & ~1 运算实现的是（ ）。",
            options: [
                "使 a 的最低位为 1",
                "使 a 的最高位为 1",
                "使 a 的最低位为 0",
                "使 a 的最高位为 0"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n在本卷整数位模式解释下，~1的最低位为0，其余有效位为1，a与它按位与后只清除最低位，其他位保留，因此选C。对于非负a，相当于向下取最近的偶数，例如7变6；负补码值也可按位观察，但不能把任何按位与都概括为数值减小。表达式本身只计算结果，若要修改变量仍需要赋回。",
            tags: [
                "二进制",
                "补码",
                "位运算",
                "按位取反"
            ]
        },
        {
            id: 9,
            type: "single",
            question: "a = 1010 1110，a << 2，下面关于这个说法正确的是（ ）。",
            options: [
                "a 的值变为 1011 1000",
                "a 的值变为 1011 1010",
                "a 的值变为 0101 1101",
                "a 的值变为 0101 1100"
            ],
            answer: 0,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n原表A对应把10101110左移两位后只保留低8位的结果10111000。但原题未给类型、位宽或截断，也没有赋值运算。若a是普通int且值为174，a<<2得到696，即二进制1010111000，单独求表达式还不会改变a。保留官方A并隔离，等待明确8位截断及赋回约定，不能在解析中默默补上这些前提来认证原题。",
            tags: [
                "位运算"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷p3未说明a的类型、位宽和截断，也未写赋回。按普通int取二进制174，a<<2的表达式值为696且a本身仍174，只有另作8位截断模型才得到10111000。保留answer=0及原文/选项，暂停计分，待位宽与操作约定澄清。"
        },
        {
            id: 10,
            type: "single",
            question: "下列程序中，result和result2输出分别是（ ）。\n\n```cpp\nlong a = 123;\nint b = 1;\nlong result = a & b;\ncout<<result<<endl;\n\nlong a2 = -123;\nunsigned int b2 = -1;\nlong result2 = a2 & b2;\ncout<<result2<<endl;\n```",
            options: [
                "123 -1",
                "123 -123",
                "1 -1",
                "1 -123"
            ],
            answer: 3,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\nresult由123&1得到1。第二段先将−1转成unsigned int的最大值，再按通常算术转换求与，结果取决于long的位宽。本机Windows的long和unsigned int均为32位，最终得到−123，与官方D一致；若signed long为64位且能表示所有32位无符号值，则第二项为4294967173。保留D并隔离，实际另用固定宽度类型模型验证差别，不把本机结果推广为所有平台保证。",
            tags: [
                "位运算",
                "计算机基础"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷p3未指定数据模型，官方D依赖long与unsigned int同为32位以及超范围转回signed long的实现。在long为64位、unsigned int为32位的模型，long能表示unsigned int全域，第二个结果为4294967173。保留answer=3及原程序，暂停计分，待平台前提澄清。"
        },
        {
            id: 11,
            type: "single",
            question: "陈 A 歹种植一批农作物：第 1 天浇水 1 次；接下来的 2 天每天浇水 2 次；再接下来的 3 天每天浇水 3 次；……依此类推，接下来的 n 天每天浇水 n 次。请问在 100 天里总共浇了多少次水（ ）。",
            options: [
                "994",
                "996",
                "995",
                "945"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n第k阶段持续k天，每天浇水k次，阶段总次数为k²。前13阶段共1+2+…+13=91天，次数为1²+2²+…+13²=819；还剩9天处于每天14次阶段，再加9×14=126，总共945，选D。不能把第100天简单对应每天100次，也不能把阶段的天数k漏掉。独立按日期构造每日次数序列可复核该累加结果。",
            tags: [
                "程序分析"
            ]
        },
        {
            id: 12,
            type: "single",
            question: "关于一维数组，下列程序能够正确执行的是（ ）。",
            options: [
                "```cpp\nint a[10];\nint sum=0;\nfor(int i=0;i<=10;i++) {\n    sum=sum+a[i];\n}\n```",
                "```cpp\nint a[10]={1,2,3,4,5,6,7,8,9,10};\nint sum=0;\nfor(int i=0;i<=10;i++) {\n    sum=sum+a[i];\n}\n```",
                "```cpp\nint a[10]={1,2,3,4,5,6,7,8,9,10};\nint sum=0;\nfor(int i=0;i<10;i++) {\n    um=sum+a[i];\n}\n```",
                "```cpp\nint a[10]={0};\nint sum=0;\nfor(int i=0;i<=10;i++) {\n    sum=sum+a[i];\n}\n```"
            ],
            answer: 2,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n选项C虽然循环i<10的边界正确，但循环体实际写成um=sum+a[i]，um没有声明，会编译失败。A/B/D均取到下标10，超出长度10数组的合法范围0..9，A还读取未初始化元素。四项原样均不能保证正确执行，官方C保留并隔离。旧库对C和D的实质改写已按原图恢复，去掉u笔误后的求和55只用于说明命题意图。",
            tags: [
                "数组",
                "循环",
                "逻辑判断"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷pp3–4的A/B/D均遍历到越界下标10，A还读取未初始化值。C原图为um=sum+a[i]，um未声明，不能正确编译。旧库曾把C改成全0数组正确循环且把D串成另一题，本轮恢复四个原选项。保留官方answer=2并隔离。"
        },
        {
            id: 13,
            type: "single",
            question: "下面的程序中，会输出（ ）。",
            code: "int a[10]={1,2,3,4,5,6,7,8,9,10};\ncout<<a[10]<<endl;",
            requiresCode: true,
            sourcePage: 4,
            sourceVerified: true,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            options: [
                "1",
                "0",
                "10",
                "不确定的值"
            ],
            answer: 3,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n数组长度10，合法元素下标0到9，原代码访问a[10]是越界读，C++对行为没有保证。它可能显示某个数，也可能异常，不能承诺程序必然输出“不确定的值”。保留官方D及原程序并隔离，等待来源表述澄清。本次只确认下标和长度关系，没有直接运行越界程序并把某次结果当作答案，也没有把下标偷偷改为9。",
            tags: [
                "程序分析"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷p4读取长度10数组的a[10]，行为未定义，不能保证会输出某个不确定值。保留answer=3及原代码/选项，暂停计分，不运行越界表达式采信偶然输出。"
        },
        {
            id: 14,
            type: "single",
            question: "有 A、B、C、D 4 个人，其中一个是小偷，每个人说一句话，只有小偷说的是假话，其中 A 说：不是我。B 说：是 C。C 说：是 D。D 说：C 瞎说，请问谁是小偷（ ）。",
            options: [
                "A",
                "B",
                "C",
                "D"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n假设C是小偷，A说不是我为真，B说是C为真，C说是D为假，D说C瞎说为真，恰好只有小偷C说假话，因此选C。换成A/B/D任一人为小偷，都不能同时满足四人的真假身份约束。可把小偷身份逐个枚举，并要求每人话语真值恰等于“此人不是小偷”，这比仅凭其中两句相互矛盾就直接猜身份更完整。",
            tags: [
                "程序分析"
            ]
        },
        {
            id: 15,
            type: "single",
            question: "下列程序输出的是（ ）。\n\n```cpp\nstring str = \"Hello,CHAD\";\ncout << str.find(\"A\") << '\\n';\n```",
            options: [
                "9",
                "8",
                "7",
                "6"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n字符串Hello,CHAD的下标从0起，H、e、l、l、o、逗号、C、H、A、D分别位于0至9，A第一次出现于下标8，选B。find返回首次匹配的位置，区分大小写；若不存在才返回string::npos。本题原程序输出8并换行，不能把位置按日常第几个字符从1开始计数而选9，也不能把字符串总长度当作查找结果。",
            tags: [
                "位运算",
                "字符与ASCII",
                "字符串"
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "+1 和 -1 的原码进行 1+(-1) 计算的结果是 -2。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n保留旧证据中的原码运算歧义。正确处理正负号的原码加法应使1+(−1)=0；若只把00000001与10000001直接作位串相加，再把10000010当原码读，才得到−2，这是不处理符号的直接相加模型。官方判正确保留，但原句未明确采用这一模型，继续隔离。不能把−2写成数学加法本身的结果，也不能清掉既有unresolved。",
            tags: [
                "二进制",
                "补码"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT，保留旧unresolved。按正确原码异号加法规则，1+(-1)=0。若把8位原码位串00000001和10000001直接按无符号加法相加，再按原码解释10000010，才得到-2。原题未明确采用错误的直接位串加法模型，官方判√保留，暂停计分，等待运算规则澄清。"
        },
        {
            id: 17,
            type: "judge",
            question: "~1 的输出值是 -2。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n在本卷通常采用的补码整数环境中，整数1的二进制有效低位为0001，按位取反得到全部高位1、最低位0，对应−2，原判断正确。本机实际输出~1为−2。这里讨论的是按位取反~，不是逻辑非!；逻辑非1则为0。表达式类型取决于整型提升后的操作数，不能由示意图画了几位就擅自缩短其存储类型。",
            tags: [
                "二进制",
                "补码",
                "位运算",
                "按位取反"
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "~1 = 1111 1110。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n11111110是−2补码的8位示意或~1结果的低8位，但C++整数常量1的类型为int，按位取反作用于整型提升后的完整类型。本机int为32位，完整结果是11111111111111111111111111111110，不能直接把未标位宽的等号右侧8位当作完整int表示。保留官方正确判断并隔离，待明确这是8位示意、低位截取还是完整类型结果。",
            tags: [
                "二进制",
                "补码",
                "位运算",
                "按位取反"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷p5给~1=11111110并判√，但未标位宽。C++中整数常量1是int，~作用于提升后的类型，本机为32位，结果-2的完整补码为32位FFFFFFFE，11111110只是低8位示意。保留answer=0和原文，暂停计分，待位宽约定澄清。"
        },
        {
            id: 19,
            type: "judge",
            question: "取 X 的低四位，可以用 Y = 0000 1111，用 X & Y 获取 X 的低四位。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n按位模式解释，掩码00001111的最低四位为1，高位为0。X&Y保留X最低四位并清除其余位，原判断正确。输出数值是低四位组成的0到15，可用于提取半字节信息；掩码需在实际代码中写成合适的字面量如0x0F，而题目带空格的二进制串是图示，不是可直接粘贴的C++整数语法。",
            tags: [
                "位运算"
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "下列程序输出的是 A。\n```cpp\nchar x = 65;\nx++;\ncout << x++ << endl;\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\nASCII下char x=65初始为A，前一条x++已把它改成B；随后cout<<x++输出自增前的B，再把x改成C。因此声称输出A错误。后缀自增是先取当前表达式值再完成递增，但不能因此忽略之前那条独立自增语句。字符型的流输出显示字符本身，而不是直接显示其编码数字66。",
            tags: [
                "位运算",
                "运算符"
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "下列程序输出的是3。\n\n```cpp\nstring str=\"CHADai\";\nsize_t pos = str.find('D');\ncout<<pos<<endl;\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n字符串CHADai的C、H、A、D依次位于下标0、1、2、3，因此find('D')返回3，原判断正确。这里使用size_t保存string::find的位置类型，与题意一致；find区分大小写，不会把后面的小写字母误作大写D。位置从0编号，日常的第4个字符在程序下标中正是3，不应把两个计数口径混合。",
            tags: [
                "位运算",
                "字符串"
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "下列程序将输出 1。\n```cpp\nint a[10] = {1};\ncout << a[1] << endl;\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n数组a[10]={1}只显式初始化首项为1，其余元素自动补0。输出的是a[1]，即第二项，其值为0，所以原判断错误。若输出a[0]才会得到1，不能把唯一的初始化值当成所有元素的统一填充值。初始化列表与给数组所有元素填充相同数值是不同操作，后者需要遍历或其他填充方法。",
            tags: [
                "位运算",
                "数组"
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "下列程序将输出 A。\n```cpp\nint a = 65;\ncout << (char)a << endl;\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n变量a保存整数65，强制转换为char后，在题目采用的ASCII环境中对应字符A，原判断正确。cout接收char时按字符输出，接收未转换的int时则通常显示数字65，所以转换位置改变了输出重载的选择。不能把(char)a理解成将十进制文本65的首位字符拿出来，也没有字符串数值解析过程。",
            tags: [
                "位运算",
                "字符与ASCII"
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "16 进制数 AB，表示成 2 进制数是 10101011。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n十六进制每位恰对应四个二进制位，A的数码值为10，对应1010，B的数码值为11，对应1011，连接后得到10101011，原判断正确。这里的AB是两位十六进制数，不是两个ASCII字符的编码拼接。若按位权计算10×16+11=171，再转二进制也会得到同样结果，可作独立核对。",
            tags: [
                "进制转换"
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "def（十六进制）= 103231（五进制）。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n十六进制DEF等于13×256+14×16+15=3567。五进制103231等于1×3125+0×625+3×125+2×25+3×5+1=3566，相差1，所以原判断错误。3567的五进制实际为103232。比较不同进制时应统一展开成整数或重新转换，不能只因数码位数更多就判断大或小，也不能把十六进制字母当作ASCII码代入。",
            tags: [
                "进制转换"
            ]
        }
    ],
    programmingQuestions: [
        {
            id: 26,
            type: "programming",
            samples: [
                {
                    input: "3\n3\n1 2 3\n4\n2 3 1 4\n5\n1 2 3 4 5",
                    output: "Yes\nYes\nNo"
                }
            ],
            question: "\n# [GESP202409 三级] 平衡序列\n\n## 题目描述\n\n小杨有一个包含 $n$ 个正整数的序列 $a$。他认为一个序列是平衡的当且仅当存在一个正整数 $i$（$1 \\leq i < n$）使得序列第 $1$ 到第 $i$ 个数字的总和等于第 $i + 1$ 到第 $n$ 个数字的总和。\n\n小杨想请你判断序列 $a$ 是否是平衡的。\n\n## 输入格式\n\n**本题单个测试点内包含多组测试数据**。第一行是一个正整数 $t$，表示测试用例组数。\n\n接下来是 $t$ 组测试用例。对每组测试用例，一共两行。\n\n第一行包含一个正整数 $n$，表示序列长度。\n第二行包含 $n$ 个正整数，代表序列 $a$。\n\n## 输出格式\n\n对每组测试用例输出一行一个字符串。如果 $a$ 是平衡的，输出 $\\texttt{Yes}$，否则输出 $\\texttt{No}$。\n\n\n对于全部数据，保证1 ≤ t ≤ 100，1 ≤ n,a_i ≤ 10000。",
            explanation: "**解析**\n\n先求序列总和，再从左向右累加前缀，检查某个非末尾位置的前缀是否恰为总和的一半。切点只能在1到n−1，所以n=1必定No；正数前提也使末尾空段不可能作为平衡分法。原卷t≤100且n、a_i≤10000，单组总和最多10^8，前缀乘2最多2×10^8，当前int安全。每组时间O(n)、数组空间O(n)，独立检查对候选切点直接分别求左右段和。",
            template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
            score: 25,
            tags: [
                "编程题",
                "前缀和",
                "模拟",
                "多组测试"
            ],
            referenceCode: "#include<bits/stdc++.h>\nusing namespace std;\nint a[10010];\nint main(){\n    int t;\n    cin >> t;\n    while(t--){\n        int n;\n        cin >> n;\n        int sum = 0;\n        for(int i = 1; i <= n; i++){\n            cin >> a[i];\n            sum += a[i];\n        }\n        int pre = 0, ok = 0;\n        for(int i = 1; i < n; i++){\n            pre += a[i];\n            if(pre * 2 == sum){\n                ok = 1;\n                break;\n            }\n        }\n        cout << (ok ? \"Yes\" : \"No\") << \"\\n\";\n    }\n    return 0;\n}",
            answer: "",
            title: "平衡序列",
            timeLimit: 1,
            memoryLimit: 512
        },
        {
            id: 27,
            type: "programming",
            samples: [
                {
                    input: "4\nabcd\naabbb\naaac\nabcdd",
                    output: "No\nYes\nNo\nNo"
                }
            ],
            question: "\n# [GESP202409 三级] 回文拼接\n\n## 题目描述\n\n一个字符串是回文串，当且仅当该字符串从前往后读和从后往前读是一样的，例如，$\\texttt{aabaa}$ 和 $\\texttt{ccddcc}$ 都是回文串，但 $\\texttt{abcd}$ 不是。\n\n小杨有 $n$ 个仅包含小写字母的字符串，他想请你编写程序判断每个字符串是否由两个长度至少为 $2$ 的回文串前后拼接而成。\n\n## 输入格式\n\n第一行包含一个正整数 $n$，代表字符串数量。\n接下来 $n$ 行，每行一个仅包含小写字母的字符串。\n\n## 输出格式\n\n对于每个字符串输出一行，如果该字符串由两个长度至少为 $2$ 的回文串前后拼接而成则输出 Yes，否则输出 No。\n\n\n对于全部数据，保证1 ≤ n ≤ 10，每个字符串长度不超过100。",
            explanation: "**解析**\n\n枚举两个片段的分界j，要求左片段和右片段都至少2个字符，所以2≤j≤m−2。逐段逆序并与原片段比较，找到任一合法分界就输出Yes。样例aabbb可分成aa与bbb，其余样例不满足。长度小于4时没有合法分界。每串长度不超过100、最多10串，当前参考每个分界构造字符串的时间O(m)，总O(m²)、额外空间O(m)。独立预言机用区间回文表检查两个片段，不复用逆串比较流程。",
            template: "#include <bits/stdc++.h>\nusing namespace std;\n\nbool isPal(const string& s, int l, int r) {\n    while (l < r) if (s[l++] != s[r--]) return false;\n    return true;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
            score: 25,
            tags: [
                "编程题",
                "字符串",
                "回文",
                "枚举"
            ],
            referenceCode: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n;\n    cin >> n;\n    for(int i = 1; i <= n; i++){\n        string s;\n        cin >> s;\n        int m = s.length();\n        int ok = 0;\n        for(int j = 2; j <= m-2; j++){\n            string s1 = s.substr(0, j);\n            string s2 = s.substr(j, m-j);\n            string t1 = \"\", t2 = \"\";\n            for(int k = (int)s1.size()-1; k >= 0; k--) t1 += s1[k];\n            for(int k = (int)s2.size()-1; k >= 0; k--) t2 += s2[k];\n            if(t1 == s1 && t2 == s2){\n                ok = 1;\n                break;\n            }\n        }\n        cout << (ok ? \"Yes\" : \"No\") << \"\\n\";\n    }\n    return 0;\n}",
            answer: "",
            title: "回文拼接",
            timeLimit: 1,
            memoryLimit: 512
        }
    ]
};
