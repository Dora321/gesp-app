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
    type: 'public-recovery',
  },
  confidence: {
    answer: 1.0,
    statement: 1.0,
  },
  questions: [
    // 1-15 单选题
    {
      id: 1,
      type: 'single',
      question: `2025年4月19日在北京举行了一场颇为瞩目的人形机器人半程马拉松赛... 机器人需要通过各种传感器来获取自身的姿态、平衡以及周围环境的信息。那么这类传感器类似于计算机的( )。`,
      options: ['处理器', '存储器', '输入设备', '输出设备'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**
      
      **解析：**
      传感器获取外界信息并传递给计算机处理，其功能类似于计算器的输入设备。
      
      - **A 处理器**：错误。
      - **B 存储器**：错误。
      - **C 输入设备**：正确答案。
      - **D 输出设备**：错误。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 2,
      type: 'single',
      question: `关于计算机编程环境及断点调试，下列说法是错误的是( )。\n\`\`\`cpp\n1 int N = 0; // L1\n2 cin >> N; // L2\n3 if (N < 9) \n4 printf("N不能大于等于9"); // L4\n\`\`\``,
      options: [
        '断点不可以设置在L1标记的代码行',
        '执行暂停在L2标记的代码行时，可以检测N的值',
        '执行暂停在L3标记的代码行时，可以修改局部变量N',
        '执行有可能暂停在L4标记的代码行'
      ],
      answer: 0,
      score: 2,
      explanation: `**答案：A**
      
      **解析：**
      虽然标记为 L1 的代码行仅为变量声明与初始化，但在现代 IDE 中通常仍是可以设置断点并观察初始化的。
      
      - **A 断点不可以设置在L1标记的代码行**：正确答案。
      - **B 执行暂停在L2标记的代码行时，可以检测N的值**：错误。
      - **C 执行暂停在L3标记的代码行时，可以修改局部变量N**：错误。
      - **D 执行有可能暂停在L4标记的代码行**：错误。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 3,
      type: 'single',
      question: `对于下列C++的代码，描述准确的是 ( )。\n\`\`\`cpp\nint first = 10;\nprintf("%d", First);\n\`\`\``,
      options: [
        '执行后输出10',
        '执行后输出{First}',
        '执行后输出"First"',
        '编译报错，因为First应该是first'
      ],
      answer: 3,
      score: 2,
      explanation: `**答案：D**
      
      **解析：**
      C++ 严格区分大小写，\`first\` 与 \`First\` 是不同的标识符。
      
      - **A 执行后输出10**：错误。
      - **B 执行后输出{First}**：错误。
      - **C 执行后输出"First"**：错误。
      - **D 编译报错，因为First应该是first**：正确答案。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 4,
      type: 'single',
      question: `在C++中，下列可以做变量名的是( )。`,
      options: ['X.cpp', 'X-cpp', 'X#cpp', 'X_cpp'],
      answer: 3,
      score: 2,
      explanation: `**答案：D**
      
      **解析：**
      C++ 变量名只能包含字母、数字和下划线，且不能以数字开头。
      
      - **A X.cpp**：错误。
      - **B X-cpp**：错误。
      - **C X#cpp**：错误。
      - **D X_cpp**：正确答案。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 5,
      type: 'single',
      question: `C++表达式 14-3 * 3 % 2 的值是( )。`,
      options: ['0', '11', '13', '-67'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**
      
      **解析：**
      优先级：* 和 % 相同，从左往右算。3*3=9, 9%2=1, 14-1=13。
      
      - **A 0**：错误。
      - **B 11**：错误。
      - **C 13**：正确答案。
      - **D -67**：错误。
      
      **考点：** 运算符`,
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 6,
      type: 'single',
      question: `下面的C++代码执行后，其输出是 ( )。\n\`\`\`cpp\nint x = 10, y = 20;\nx = x+y;\ny = x-y;\nx = x-y;\ncout << x << " " << y;\n\`\`\``,
      options: ['10 20', '20 10', '10 10', '20 20'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**
      
      **解析：**
      这是经典的通过三步加减法交换两个变量值的算法。x 最终为 20，y 最终为 10。
      
      - **A 10 20**：错误。
      - **B 20 10**：正确答案。
      - **C 10 10**：错误。
      - **D 20 20**：错误。
      
      **考点：** 基础语法、运算符`,
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.operator]
    },
    {
      id: 7,
      type: 'single',
      question: `定义整型变量 int a = 16，则执行 a += ++a % 3 之后，a 的值会是 ( )。`,
      options: ['3', '17', '19', '20'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**
      
      **解析：**
      ++a 先使 a 变为 17，17 % 3 等于 2，此时 a 为 17，17+2 = 19。
      
      - **A 3**：错误。
      - **B 17**：错误。
      - **C 19**：正确答案。
      - **D 20**：错误。
      
      **考点：** 运算符、基础语法`,
      tags: [LEVEL1_TAGS.operator, LEVEL1_TAGS.basics]
    },
    {
      id: 8,
      type: 'single',
      question: `已知 C++ 的 int 类型变量 x 的值为 8，如果执行 cout << (++x)++ ; 则输出和执行后 x 的值分别是 ( )。`,
      options: ['8 9', '9 9', '9 10', '编译错误，无法执行'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**
      
      **解析：**
      ++x 使 x 变为 9，并返回 lvalue (9)。(9)++ 返回当前值 9 后使 x 变为 10。
      
      - **A 8 9**：错误。
      - **B 9 9**：错误。
      - **C 9 10**：正确答案。
      - **D 编译错误，无法执行**：错误。
      
      **考点：** 运算符`,
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 9,
      type: 'single',
      question: `下面 C++ 代码执行后的输出是 ( )。\n\`\`\`cpp\nint a = 3, b = 4;\nprintf("a+b=%d2#a+b={a+b}", a, b, a+b);\n\`\`\``,
      options: [
        'a+b=07#a+b={a+b}',
        'a+b=34#a+b=7',
        'a+b=32#a+b={a+b}',
        'a+b=32#a+b=7'
      ],
      answer: 2,
      score: 2,
      explanation: `**答案：C**
      
      **解析：**
      printf 中的 %d 对应第一个参数 a (3)，后续的 2 是普通字符。参数 b 和 a+b 因为没有对应的格式化占位符，不会被按预期方式打印。
      
      - **A a+b=07#a+b={a+b}**：错误。
      - **B a+b=34#a+b=7**：错误。
      - **C a+b=32#a+b={a+b}**：正确答案。
      - **D a+b=32#a+b=7**：错误。
      
      **考点：** 输入输出`,
      tags: [LEVEL1_TAGS.io]
    },
    {
      id: 10,
      type: 'single',
      question: `下面 C++ 代码用于判断 N 是否为偶数，横线处应填入代码是 ( )。\n\`\`\`cpp\nint N;\ncin >> N;\nif (________)\n cout << N << "是偶数";\nelse\n cout << N << "是奇数";\n\`\`\``,
      options: ['N % 2 = 0', 'N % 2 == 0', 'N / 2 == 0', 'N % 2 != 1'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**
      
      **解析：**
      判断偶数通常使用取余运算 N % 2 == 0。
      
      - **A N % 2 = 0**：错误。
      - **B N % 2 == 0**：正确答案。
      - **C N / 2 == 0**：错误。
      - **D N % 2 != 1**：错误。
      
      **考点：** 运算符、基础语法`,
      tags: [LEVEL1_TAGS.operator, LEVEL1_TAGS.basics]
    },
    {
      id: 11,
      type: 'single',
      question: `下面 C++ 代码执行后的输出是 ( )。\n\`\`\`cpp\nint n = 10, i = 1;\nwhile (i < n) {\n n--;\n i++;\n}\ncout << n << " " << i;\n\`\`\``,
      options: ['5 6', '6 5', '6 6', '5 5'],
      answer: 0,
      score: 2,
      explanation: `**答案：A**
      
      **解析：**
      i和n向中间靠拢。i=1,n=10 -> i=2,n=9 -> i=3,n=8 -> i=4,n=7 -> i=5,n=6 -> i=6,n=5 (退出)。最终 n=5, i=6。
      
      - **A 5 6**：正确答案。
      - **B 6 5**：错误。
      - **C 6 6**：错误。
      - **D 5 5**：错误。
      
      **考点：** 循环、基础语法`,
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.basics]
    },
    {
      id: 12,
      type: 'single',
      question: `15 % 2+15 / 2.0 的值是 ( )。`,
      options: ['8', '8.5', '4.5', '1.5'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**
      
      **解析：**
      15 % 2 = 1；15 / 2.0 = 7.5。1+7.5 = 8.5。
      
      - **A 8**：错误。
      - **B 8.5**：正确答案。
      - **C 4.5**：错误。
      - **D 1.5**：错误。
      
      **考点：** 运算符`,
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 13,
      type: 'single',
      question: `下面 C++ 代码执行后的输出是 ( )。\n\`\`\`cpp\nint n = 10, sum = 0;\nfor (int i = 1; i <= n; i++) {\n if (i % 3 == 0) continue;\n sum += i;\n}\ncout << sum;\n\n\`\`\``,
      options: ['37', '45', '55', '18'],
      answer: 0,
      score: 2,
      explanation: `**答案：A**
      
      **解析：**
      1到10之和为 55。排除 3, 6, 9 (3+6+9=18)。55-18 = 37。
      
      - **A 37**：正确答案。
      - **B 45**：错误。
      - **C 55**：错误。
      - **D 18**：错误。
      
      **考点：** 循环、条件判断`,
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.condition]
    },
    {
      id: 14,
      type: 'single',
      question: `在 C++ 中，下列哪个关键字用于定义整型变量？`,
      options: ['float', 'double', 'char', 'int'],
      answer: 3,
      score: 2,
      explanation: `**答案：D**
      
      **解析：**
      int 是 integer 的缩写，用于定义整型变量。
      
      - **A float**：错误。
      - **B double**：错误。
      - **C char**：错误。
      - **D int**：正确答案。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 15,
      type: 'single',
      question: `已知整型变量 n = 567，下列哪个表达式可以得到其百位上的数字 5？`,
      options: ['n / 100', 'n / 10 % 10', 'n % 100', 'n % 10'],
      answer: 0,
      score: 2,
      explanation: `**答案：A**
      
      **解析：**
      567 / 100 = 5（整除）。
      
      - **A n / 100**：正确答案。
      - **B n / 10 % 10**：错误。
      - **C n % 100**：错误。
      - **D n % 10**：错误。
      
      **考点：** 运算符、基础语法`,
      tags: [LEVEL1_TAGS.operator, LEVEL1_TAGS.basics]
    },

    // 16-25 判断题
    {
      id: 16,
      type: 'judge',
      question: `闭卷考试中，考生不得携带手机、平板、智能手表等智能设备。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      这是考试的基本纪律要求。
      
      **易混概念：** 注意区分关键字与标识符、编译器与操作系统的职能边界。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 17,
      type: 'judge',
      question: `若 N 为 5，则表达式 (N+!N) 的值为 4。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**
      
      **判定依据：**
      !5 为 0，5+0 = 5。
      
      **纠错：** 原命题说法有误。!5 为 0，5+0 = 5。
      
      **易混概念：** 注意运算符优先级与整除/取模的区分，容易混淆不同运算的结果。
      
      **考点：** 运算符`,
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 18,
      type: 'judge',
      question: `while 循环体中必须包含修改循环条件的语句，否则可能陷入死循环。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      没有修改条件的语句会导致条件永远为真，产生死循环。
      
      **易混概念：** 注意循环变量的终值是在循环外使用的，以及 continue/break 的区别。
      
      **考点：** 循环`,
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 19,
      type: 'judge',
      question: `C++ 语言中，一个变量可以多次定义。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**
      
      **判定依据：**
      变量在同一作用域内只能定义一次。
      
      **纠错：** 原命题说法有误。变量在同一作用域内只能定义一次。
      
      **易混概念：** 注意区分关键字与标识符、编译器与操作系统的职能边界。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 20,
      type: 'judge',
      question: `1.0 / 2.0 的值是 0.5。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      浮点数除法。
      
      **易混概念：** 注意运算符优先级与整除/取模的区分，容易混淆不同运算的结果。
      
      **考点：** 运算符`,
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 21,
      type: 'judge',
      question: `if (x = 0) 的判定结果总是 false。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      赋值表达式 x = 0 的值是 0，在 if 中判定为假。
      
      **易混概念：** 注意逻辑运算符 && 和 || 的短路求值特性，以及运算符优先级。
      
      **考点：** 基础语法、条件判断`,
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.condition]
    },
    {
      id: 22,
      type: 'judge',
      question: `在 C++ 中，&& 是逻辑与运算符。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      标准逻辑运算符。
      
      **易混概念：** 注意运算符优先级与整除/取模的区分，容易混淆不同运算的结果。
      
      **考点：** 运算符`,
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 23,
      type: 'judge',
      question: `for(int i=0; i<10; i++) 循环执行 10 次。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      i 从 0 到 9。
      
      **易混概念：** 注意循环变量的终值是在循环外使用的，以及 continue/break 的区别。
      
      **考点：** 循环`,
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 24,
      type: 'judge',
      question: `cin 和 cout 是 C++ 中的标准输入输出流。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      定义在 iostream 头文件中。
      
      **易混概念：** 注意 printf 格式化占位符与参数类型的匹配，以及转义字符的用法。
      
      **考点：** 输入输出`,
      tags: [LEVEL1_TAGS.io]
    },
    {
      id: 25,
      type: 'judge',
      question: `在 C++ 中，3 < x < 5 是检查 x 是否在 3 和 5 之间的正确语法。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**
      
      **判定依据：**
      应使用 x > 3 && x < 5。
      
      **纠错：** 原命题说法有误。应使用 x > 3 && x < 5。
      
      **易混概念：** 注意区分关键字与标识符、编译器与操作系统的职能边界。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
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
    cout << (n < k * t ? n : k * t) << "\n";
    return 0;
}`,
      question: `
# [GESP202506 一级] 假期阅读

## 题目描述

小 A 有一本厚厚的书。这本书总共有 $n$ 页，小 A 一天中最多只能阅读完其中的 $k$ 页。小 A 的假期总共有 $t$ 天，他想知道在假期中最多能阅读完这本书的多少页。

## 输入格式

第一行，一个正整数 $n$，表示书的页数。

第二行，一个正整数 $k$，表示小 A 每天最多阅读的页数。

第三行，一个正整数 $t$，表示小 A 假期的天数。

## 输出格式

一行，一个整数，表示假期中所能阅读的最多页数。
`,
      template: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}`,
      answer: '',
      score: 25,
      explanation: '实际阅读页数为 min(n, k * t)。',
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
    cout << (m / gcd(m, n)) * n << "\n";
    return 0;
}`,
      question: `
# [GESP202506 一级] 值日

## 题目描述

小杨和小红是值日生，负责打扫教室。小杨每 $m$ 天值日一次，小红每 $n$ 天值日一次。今天他们两个一起值日，请问至少多少天后，他们会再次同一天值日？

## 输入格式

第一行，一个正整数 $m$，表示小杨的值日周期；

第二行，一个正整数 $n$，表示小红的值日周期。

## 输出格式

一行，一个整数，表示至少多少天后他们会再次同一天值日。
`,
      template: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}`,
      answer: '',
      score: 25,
      explanation: '寻找两个数的最小公倍数 (LCM)。',
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.operator],
    }
  ]
};
