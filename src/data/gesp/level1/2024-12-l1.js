import { LEVEL1_TAGS } from './shared.js';

export const paperData = {
  id: '2024-12-l1',
  title: '2024年12月 GESP C++ 一级认证真题',
  level: 1,
  year: 2024,
  month: 12,
  session: 8,
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
      question: `2024年诺贝尔物理学奖授予了三位科学家，理由是他们在( )领域的奠基性贡献。`,
      options: [
        '量子力学',
        '黑洞研究',
        '人工智能/神经网络',
        '引力波探测'
      ],
      answer: 2,
      score: 2,
      explanation: `**答案：C**
      
      **解析：**
      2024年诺贝尔物理学奖授予约翰·霍普菲尔德和杰弗里·辛顿，表彰他们在使用人工神经网络进行机器学习方面的基础性发现和发明。
      
      - **A 量子力学**：错误。此说法不正确。2024年诺贝尔物理学奖授予约翰·霍普菲尔德和杰弗里·辛顿，表彰他们在使用人工神经网络进行机器学习方面的基础性发现和发明…
      - **B 黑洞研究**：错误。此说法不正确。2024年诺贝尔物理学奖授予约翰·霍普菲尔德和杰弗里·辛顿，表彰他们在使用人工神经网络进行机器学习方面的基础性发现和发明…
      - **C 人工智能/神经网络**：正确。2024年诺贝尔物理学奖授予约翰·霍普菲尔德和杰弗里·辛顿，表彰他们在使用人工神经网络进行机器学习方面的基础性发现和发明。
      - **D 引力波探测**：错误。此说法不正确。2024年诺贝尔物理学奖授予约翰·霍普菲尔德和杰弗里·辛顿，表彰他们在使用人工神经网络进行机器学习方面的基础性发现和发明…
      
      **考点：** 基础语法`,
    },
    {
      id: 2,
      type: 'single',
      question: `下列设备中，既是输入设备又是输出设备的是( )。`,
      options: ['键盘', '打印机', '触摸屏', '扫描仪'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**
      
      **解析：**
      触摸屏可以点击输入，也可以显示输出。
      
      - **A 键盘**：错误。此说法不正确。触摸屏可以点击输入，也可以显示输出。
      - **B 打印机**：错误。此说法不正确。触摸屏可以点击输入，也可以显示输出。
      - **C 触摸屏**：正确。触摸屏可以点击输入，也可以显示输出。
      - **D 扫描仪**：错误。此说法不正确。触摸屏可以点击输入，也可以显示输出。
      
      **考点：** 基础语法、输入输出`,
    },
    {
      id: 3,
      type: 'single',
      question: `下列 C++ 变量名合法的是( )。`,
      options: ['123_xiaoyang', 'xiaoyang@bit', 'int', '_xiaoyang123'],
      answer: 3,
      score: 2,
      explanation: `**答案：D**
      
      **解析：**
      变量名不能以数字开头，不能包含特殊符号@，不能是关键字 int。下划线开头是合法的。
      
      - **A 123_xiaoyang**：错误。此说法不正确。变量名不能以数字开头，不能包含特殊符号@，不能是关键字 int。下划线开头是合法的。
      - **B xiaoyang@bit**：错误。此说法不正确。变量名不能以数字开头，不能包含特殊符号@，不能是关键字 int。下划线开头是合法的。
      - **C int**：错误。此说法不正确。变量名不能以数字开头，不能包含特殊符号@，不能是关键字 int。下划线开头是合法的。
      - **D _xiaoyang123**：正确。变量名不能以数字开头，不能包含特殊符号@，不能是关键字 int。下划线开头是合法的。
      
      **考点：** 基础语法`,
    },
    {
      id: 4,
      type: 'single',
      question: `下列哪个是 C++ 的关键字？`,
      options: ['include', 'public', 'printf', 'main'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**
      
      **解析：**
      public 是类成员访问修饰关键字。include 是预处理指令，printf 是函数，main 是特殊函数名。
      
      - **A include**：错误。此说法不正确。public 是类成员访问修饰关键字。include 是预处理指令，printf 是函数，main 是特殊函数名。
      - **B public**：正确。public 是类成员访问修饰关键字。include 是预处理指令，printf 是函数，main 是特殊函数名。
      - **C printf**：错误。代码逻辑有误。public 是类成员访问修饰关键字。include 是预处理指令，printf 是函数，main 是特殊函数名。
      - **D main**：错误。对函数的定义或调用规则理解有误。
      
      **考点：** 基础语法`,
    },
    {
      id: 5,
      type: 'single',
      question: `对于语句 int a = 10; double b = 20.5; 则变量 a 和 b 的数据类型分别是 ( )。`,
      options: ['浮点型和整型', '整型和浮点型', '字符型和整型', '整型和字符型'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**
      
      **解析：**
      int 表示整型，double 表示双精度浮点型。
      
      - **A 浮点型和整型**：错误。对浮点数精度问题的理解有误。
      - **B 整型和浮点型**：正确。int 表示整型，double 表示双精度浮点型。
      - **C 字符型和整型**：错误。此说法不正确。int 表示整型，double 表示双精度浮点型。
      - **D 整型和字符型**：错误。此说法不正确。int 表示整型，double 表示双精度浮点型。
      
      **考点：** 基础语法`,
    },
    {
      id: 6,
      type: 'single',
      question: `在逻辑电路中，只有当两个输入同时为“真”时，输出才为“真”的门电路是( )。`,
      options: ['非门', '或门', '异或门', '与门'],
      answer: 3,
      score: 2,
      explanation: `**答案：D**
      
      **解析：**
      与门（AND gate）的逻辑关系是“全 1 则 1”。
      
      - **A 非门**：错误。此说法不正确。与门（AND gate）的逻辑关系是“全 1 则 1”。
      - **B 或门**：错误。此说法不正确。与门（AND gate）的逻辑关系是“全 1 则 1”。
      - **C 异或门**：错误。此说法不正确。与门（AND gate）的逻辑关系是“全 1 则 1”。
      - **D 与门**：正确。与门（AND gate）的逻辑关系是“全 1 则 1”。
      
      **考点：** 基础语法`,
    },
    {
      id: 7,
      type: 'single',
      question: `循环语句 for(int i = 0; i <= 10; i++) 执行次数是 ( )。`,
      options: ['10', '11', '9', '无尽次'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**
      
      **解析：**
      i 从 0 循环到 10，包含 0 和 10，共 11 次。
      
      - **A 10**：错误。可能差一错误（off-by-one），如循环条件用了 <= 而非 <。正确结果为 11。
      - **B 11**：正确。i 从 0 循环到 10，包含 0 和 10，共 11 次。
      - **C 9**：错误。计算有误。i 从 0 循环到 10，包含 0 和 10，共 11 次。
      - **D 无尽次**：错误。此说法不正确。i 从 0 循环到 10，包含 0 和 10，共 11 次。
      
      **考点：** 循环`,
    },
    {
      id: 8,
      type: 'single',
      question: `数组 int a[5] 的合法下标范围是( )。`,
      options: ['1 到 5', '0 到 5', '0 到 4', '1 到 4'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**
      
      **解析：**
      C++ 数组下标从 0 开始。
      
      - **A 1 到 5**：错误。此说法不正确。C++ 数组下标从 0 开始。
      - **B 0 到 5**：错误。此说法不正确。C++ 数组下标从 0 开始。
      - **C 0 到 4**：正确。C++ 数组下标从 0 开始。
      - **D 1 到 4**：错误。此说法不正确。C++ 数组下标从 0 开始。
      
      **考点：** 数组与字符串`,
    },
    {
      id: 9,
      type: 'single',
      question: `在 C++ 中，double 类型通常占用多少个字节？`,
      options: ['2', '4', '8', '16'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**
      
      **解析：**
      标准环境下 double 占用 8 字节。
      
      - **A 2**：错误。标准环境下 double 占用 8 字节。
      - **B 4**：错误。标准环境下 double 占用 8 字节。
      - **C 8**：正确。标准环境下 double 占用 8 字节。
      - **D 16**：错误。标准环境下 double 占用 8 字节。
      
      **考点：** 基础语法`,
    },
    {
      id: 10,
      type: 'single',
      question: `小写字母 'a' 的 ASCII 码值是( )。`,
      options: ['48', '65', '97', '98'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**
      
      **解析：**
      'a' 的 ASCII 码是 97，'A' 是 65。
      
      - **A 48**：错误。计算有误。'a' 的 ASCII 码是 97，'A' 是 65。
      - **B 65**：错误。计算有误。'a' 的 ASCII 码是 97，'A' 是 65。
      - **C 97**：正确。'a' 的 ASCII 码是 97，'A' 是 65。
      - **D 98**：错误。可能差一错误（off-by-one），如循环条件用了 <= 而非 <。正确结果为 97。
      
      **考点：** 基础语法`,
    },
    {
      id: 11,
      type: 'single',
      question: `表达式 15 / 2.0 的值是( )。`,
      options: ['7', '7.0', '8', '7.5'],
      answer: 3,
      score: 2,
      explanation: `**答案：D**
      
      **解析：**
      浮点数除法。
      
      - **A 7**：错误。计算结果不正确，正确结果为 7.5。
      - **B 7.0**：错误。计算结果不正确，正确结果为 7.5。
      - **C 8**：错误。计算结果不正确，正确结果为 7.5。
      - **D 7.5**：正确。浮点数除法。
      
      **考点：** 运算符`,
    },
    {
      id: 12,
      type: 'single',
      question: `执行逻辑运算 !true || false 的结果是( )。`,
      options: ['true', '1', 'false', '0'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**
      
      **解析：**
      !true 为 false，false || false 为 false。
      
      - **A true**：错误。此说法不正确。!true 为 false，false || false 为 false。
      - **B 1**：错误。计算有误。!true 为 false，false || false 为 false。
      - **C false**：正确。!true 为 false，false || false 为 false。
      - **D 0**：错误。计算有误。!true 为 false，false || false 为 false。
      
      **考点：** 运算符`,
    },
    {
      id: 13,
      type: 'single',
      question: `程序中包含头文件以支持输入输出，正确的写法是( )。`,
      options: ['#include <iostream.h>', '#include iostream', 'import iostream', '#include <iostream>'],
      answer: 3,
      score: 2,
      explanation: `**答案：D**
      
      **解析：**
      C++ 标准头文件写法。
      
      - **A #include <iostream.h>**：错误。此说法不正确。C++ 标准头文件写法。
      - **B #include iostream**：错误。此说法不正确。C++ 标准头文件写法。
      - **C import iostream**：错误。此说法不正确。C++ 标准头文件写法。
      - **D #include <iostream>**：正确。C++ 标准头文件写法。
      
      **考点：** 输入输出`,
    },
    {
      id: 14,
      type: 'single',
      question: `二进制数 1011 转换为十进制数是( )。`,
      options: ['9', '11', '13', '15'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**
      
      **解析：**
      1*8+0*4+1*2+1*1 = 11。
      
      - **A 9**：错误。计算有误。1*8+0*4+1*2+1*1 = 11。
      - **B 11**：正确。1*8+0*4+1*2+1*1 = 11。
      - **C 13**：错误。计算有误。1*8+0*4+1*2+1*1 = 11。
      - **D 15**：错误。计算有误。1*8+0*4+1*2+1*1 = 11。
      
      **考点：** 基础语法`,
    },
    {
      id: 15,
      type: 'single',
      question: `下列代码中存在哪种错误？\n\`\`\`cpp\nint main() {\n int a = 10\n return 0;\n}\n\`\`\``,
      options: ['逻辑错误', '运行错误', '内存溢出', '语法错误'],
      answer: 3,
      score: 2,
      explanation: `**答案：D**
      
      **解析：**
      缺少分号。
      
      - **A 逻辑错误**：错误。此选项说法有误。
      - **B 运行错误**：错误。此选项说法有误。
      - **C 内存溢出**：错误。内存（RAM）是易失性存储，断电后数据丢失，基于电子存储，此选项不是正确答案。
      - **D 语法错误**：正确。与题意完全吻合。
      
      **考点：** 基础语法`,
    },

    // 16-25 判断题
    {
      id: 16,
      type: 'judge',
      question: `ENIAC 是世界上第一台通用电子计算机。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      1946 年诞生于美国宾夕法尼亚大学。
      
      **易混概念：** 注意区分关键字与标识符、编译器与操作系统的职能边界。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 17,
      type: 'judge',
      question: `鼠标属于计算机的输入设备。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      它是指示性的输入设备。
      
      **易混概念：** 输入设备负责采集信息传入计算机，输出设备负责呈现结果。传感器属于输入设备。
      
      **考点：** 输入输出`,

    },
    {
      id: 18,
      type: 'judge',
      question: `123name 是一个合法的 C++ 变量名。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**
      
      **判定依据：**
      不能以数字开头。
      
      **纠错：** 原命题说法有误。不能以数字开头。
      
      **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
      
      **考点：** 基础语法`,

    },
    {
      id: 19,
      type: 'judge',
      question: `bool 数据类型只能存储 true 或 false。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      布尔型专门用于逻辑判断。
      
      **易混概念：** 注意区分关键字与标识符、编译器与操作系统的职能边界。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 20,
      type: 'judge',
      question: `break 语句可以用于跳出当前所在的循环。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      break 的核心功能。
      
      **易混概念：** break 跳出当前所在的最内层循环或 switch，不影响外层循环。它只能用于循环和 switch 中。
      
      **考点：** 循环`,

    },
    {
      id: 21,
      type: 'judge',
      question: `for 循环的三个部分必须全部写在括号内，不能省略。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**
      
      **判定依据：**
      可以省略，例如 for(;;)。
      
      **纠错：** 原命题说法有误。可以省略，例如 for(;;)。
      
      **易混概念：** 注意区分相关概念的适用范围和边界条件。
      
      **考点：** 循环`,

    },
    {
      id: 22,
      type: 'judge',
      question: `a && b 为真当且仅当 a 和 b 都为非零值。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      逻辑与的特性。
      
      **易混概念：** && 遇假即停，|| 遇真即停。短路求值意味着后面的表达式可能根本不会执行。
      
      **考点：** 运算符`,

    },
    {
      id: 23,
      type: 'judge',
      question: `数组的元素在内存中是连续存储的。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      这是数组的核心特征，支持 $O(1)$ 随机访问。
      
      **易混概念：** CPU 负责运算和判断，内存负责存储数据，两者职能不同，不能混淆。
      
      **考点：** 数组与字符串`,

    },
    {
      id: 24,
      type: 'judge',
      question: `void main() 是 C++11 标准规定的标准程序入口。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**
      
      **判定依据：**
      标准规定入口应为 int main()。
      
      **纠错：** 原命题说法有误。标准规定入口应为 int main()。
      
      **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
      
      **考点：** 基础语法`,

    },
    {
      id: 25,
      type: 'judge',
      question: `编译器会忽略以后缀 // 开头的单行注释。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      注释仅供程序员阅读。
      
      **易混概念：** 操作系统负责管理硬件和软件资源，编译器负责将源代码翻译成目标代码，两者职能不同。
      
      **考点：** 基础语法`,

    },

    // 26-27 编程题
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `412.00`, output: `Temperature is too high!` },
        { input: `173.56`, output: `-99.59 -147.26` }
      ],
      referenceCode: `#include <iostream>
#include <iomanip>
using namespace std;
int main() {
    double k, c, f;
    cin >> k;
    c = k - 273.15;
    f = c * 1.8 + 32;
    if (f > 212) cout << "Temperature is too high!\n";
    else cout << fixed << setprecision(2) << c << " " << f << "\n";
    return 0;
}`,
      question: `
# [GESP202412 一级] 温度转换

## 题目描述

小杨最近学习了开尔文温度、摄氏温度和华氏温度的转换。令符号 $K$ 表开尔文温度，符号 $C$ 表摄氏温度，符号 $F$ 表华氏温度，这三者的转换公式如下：

$
C=K-273.15\\\\
F=C\\times 1.8+32
$

现在小杨想编写一个程序计算某一开尔文温度对应的摄氏温度和华氏温度，你能帮帮他吗?

## 输入格式

一行，一个实数 $K$，表示开尔文温度。

## 输出格式

一行，若输入开尔文温度对应的华氏温度高于 $212$，输出 \`Temperature is too high!\`；

否则，输出两个由空格分隔的实数 $C$ 和 $F$，分别表示摄氏温度和华氏度，保留两位小数。
`,
      template: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}`,
      answer: '',
      score: 25,
      explanation: '按公式计算并使用 setprecision(2) 输出。',
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.condition, LEVEL1_TAGS.operator],
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `5
1
2
3
4
5`, output: `3 2` }
      ],
      referenceCode: `#include <iostream>
using namespace std;
int main() {
    int n, odd = 0, even = 0;
    cin >> n;
    for(int i = 0; i < n; i++) {
        int x;
        cin >> x;
        if(x % 2 != 0) odd++;
        else even++;
    }
    cout << odd << " " << even << "\n";
    return 0;
}`,
      question: `
# [GESP202412 一级] 奇数和偶数

## 题目描述

小杨有 $n$ 个正整数，他想知道其中的奇数有多少个，偶数有多少个。

## 输入格式

第一行包含一个正整数 $n$，代表正整数个数。

之后 $n$ 行，每行包含一个正整数。

## 输出格式

输出两个正整数（英文空格间隔），代表奇数的个数和偶数的个数。如奇数或偶数的个数为 $0$，则对应输出 $0$。
`,
      template: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}`,
      answer: '',
      score: 25,
      explanation: '循环读取，条件判断奇偶并计数，最后相减取 abs。',
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.condition, LEVEL1_TAGS.loop],
    }
  ]
};
