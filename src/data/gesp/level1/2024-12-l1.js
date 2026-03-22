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
      question: '2024年诺贝尔物理学奖授予了三位科学家，理由是他们在( )领域的奠基性贡献。',
      options: [
        '量子力学',
        '黑洞研究',
        '人工智能/神经网络',
        '引力波探测'
      ],
      answer: 2,
      score: 2,
      explanation: '2024年诺贝尔物理学奖授予约翰·霍普菲尔德和杰弗里·辛顿，表彰他们在使用人工神经网络进行机器学习方面的基础性发现和发明。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 2,
      type: 'single',
      question: '下列设备中，既是输入设备又是输出设备的是( )。',
      options: ['键盘', '打印机', '触摸屏', '扫描仪'],
      answer: 2,
      score: 2,
      explanation: '触摸屏可以点击输入，也可以显示输出。',
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.io]
    },
    {
      id: 3,
      type: 'single',
      question: '下列 C++ 变量名合法的是( )。',
      options: ['123_xiaoyang', 'xiaoyang@bit', 'int', '_xiaoyang123'],
      answer: 3,
      score: 2,
      explanation: '变量名不能以数字开头，不能包含特殊符号@，不能是关键字 int。下划线开头是合法的。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 4,
      type: 'single',
      question: '下列哪个是 C++ 的关键字？',
      options: ['include', 'public', 'printf', 'main'],
      answer: 1,
      score: 2,
      explanation: 'public 是类成员访问修饰关键字。include 是预处理指令，printf 是函数，main 是特殊函数名。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 5,
      type: 'single',
      question: '对于语句 int a = 10; double b = 20.5; 则变量 a 和 b 的数据类型分别是 ( )。',
      options: ['浮点型和整型', '整型和浮点型', '字符型和整型', '整型和字符型'],
      answer: 1,
      score: 2,
      explanation: 'int 表示整型，double 表示双精度浮点型。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 6,
      type: 'single',
      question: '在逻辑电路中，只有当两个输入同时为“真”时，输出才为“真”的门电路是( )。',
      options: ['非门', '或门', '异或门', '与门'],
      answer: 3,
      score: 2,
      explanation: '与门（AND gate）的逻辑关系是“全 1 则 1”。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 7,
      type: 'single',
      question: '循环语句 for(int i = 0; i <= 10; i++) 执行次数是 ( )。',
      options: ['10', '11', '9', '无尽次'],
      answer: 1,
      score: 2,
      explanation: 'i 从 0 循环到 10，包含 0 和 10，共 11 次。',
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 8,
      type: 'single',
      question: '数组 int a[5] 的合法下标范围是( )。',
      options: ['1 到 5', '0 到 5', '0 到 4', '1 到 4'],
      answer: 2,
      score: 2,
      explanation: 'C++ 数组下标从 0 开始。',
      tags: [LEVEL1_TAGS.array]
    },
    {
      id: 9,
      type: 'single',
      question: '在 C++ 中，double 类型通常占用多少个字节？',
      options: ['2', '4', '8', '16'],
      answer: 2,
      score: 2,
      explanation: '标准环境下 double 占用 8 字节。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 10,
      type: 'single',
      question: '小写字母 \'a\' 的 ASCII 码值是( )。',
      options: ['48', '65', '97', '98'],
      answer: 2,
      score: 2,
      explanation: '\'a\' 的 ASCII 码是 97，\'A\' 是 65。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 11,
      type: 'single',
      question: '表达式 15 / 2.0 的值是( )。',
      options: ['7', '7.0', '8', '7.5'],
      answer: 3,
      score: 2,
      explanation: '浮点数除法。',
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 12,
      type: 'single',
      question: '执行逻辑运算 !true || false 的结果是( )。',
      options: ['true', '1', 'false', '0'],
      answer: 2,
      score: 2,
      explanation: '!true 为 false，false || false 为 false。',
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 13,
      type: 'single',
      question: '程序中包含头文件以支持输入输出，正确的写法是( )。',
      options: ['#include <iostream.h>', '#include iostream', 'import iostream', '#include <iostream>'],
      answer: 3,
      score: 2,
      explanation: 'C++ 标准头文件写法。',
      tags: [LEVEL1_TAGS.io]
    },
    {
      id: 14,
      type: 'single',
      question: '二进制数 1011 转换为十进制数是( )。',
      options: ['9', '11', '13', '15'],
      answer: 1,
      score: 2,
      explanation: '1*8+0*4+1*2+1*1 = 11。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 15,
      type: 'single',
      question: '下列代码中存在哪种错误？\n```cpp\nint main() {\n  int a = 10\n  return 0;\n}\n```',
      options: ['逻辑错误', '运行错误', '内存溢出', '语法错误'],
      answer: 3,
      score: 2,
      explanation: '缺少分号。',
      tags: [LEVEL1_TAGS.basics]
    },

    // 16-25 判断题
    {
      id: 16,
      type: 'judge',
      question: 'ENIAC 是世界上第一台通用电子计算机。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '1946 年诞生于美国宾夕法尼亚大学。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 17,
      type: 'judge',
      question: '鼠标属于计算机的输入设备。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '它是指示性的输入设备。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.io]
    },
    {
      id: 18,
      type: 'judge',
      question: '123name 是一个合法的 C++ 变量名。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '不能以数字开头。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 19,
      type: 'judge',
      question: 'bool 数据类型只能存储 true 或 false。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '布尔型专门用于逻辑判断。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 20,
      type: 'judge',
      question: 'break 语句可以用于跳出当前所在的循环。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: 'break 的核心功能。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.loop]
    },
    {
      id: 21,
      type: 'judge',
      question: 'for 循环的三个部分必须全部写在括号内，不能省略。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '可以省略，例如 for(;;)。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.loop]
    },
    {
      id: 22,
      type: 'judge',
      question: 'a && b 为真当且仅当 a 和 b 都为非零值。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '逻辑与的特性。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.operator]
    },
    {
      id: 23,
      type: 'judge',
      question: '数组的元素在内存中是连续存储的。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '这是数组的核心特征，支持 $O(1)$ 随机访问。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.array]
    },
    {
      id: 24,
      type: 'judge',
      question: 'void main() 是 C++11 标准规定的标准程序入口。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '标准规定入口应为 int main()。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 25,
      type: 'judge',
      question: '编译器会忽略以后缀 // 开头的单行注释。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '注释仅供程序员阅读。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },

    // 26-27 编程题
    {
      id: 26,
      type: 'programming',
      samples: [{ input: '待补充', output: '待补充' }],
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

小杨最近学习了开尔文温度、摄氏温度和华氏温度的转换。令符号 \$K\$ 表开尔文温度，符号 \$C\$ 表摄氏温度，符号 \$F\$ 表华氏温度，这三者的转换公式如下：

\$
C=K-273.15\\\\
F=C\\times 1.8+32
\$

现在小杨想编写一个程序计算某一开尔文温度对应的摄氏温度和华氏温度，你能帮帮他吗?

## 输入格式

一行，一个实数 \$K\$，表示开尔文温度。

## 输出格式

一行，若输入开尔文温度对应的华氏温度高于 \$212\$，输出 \`Temperature is too high!\`；

否则，输出两个由空格分隔的实数 \$C\$ 和 \$F\$，分别表示摄氏温度和华氏度，保留两位小数。
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
      samples: [{ input: '待补充', output: '待补充' }],
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

小杨有 \$n\$ 个正整数，他想知道其中的奇数有多少个，偶数有多少个。

## 输入格式

第一行包含一个正整数 \$n\$，代表正整数个数。

之后 \$n\$ 行，每行包含一个正整数。

## 输出格式

输出两个正整数（英文空格间隔），代表奇数的个数和偶数的个数。如奇数或偶数的个数为 \$0\$，则对应输出 \$0\$。
`,
      template: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}`,
      answer: '',
      score: 25,
      explanation: '循环读取，条件判断奇偶并计数，最后相减取 abs。',
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.condition, LEVEL1_TAGS.loop],
    }
  ]
};
