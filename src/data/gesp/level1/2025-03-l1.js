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
      question: '关于2025年春节期间发生的热点事件(如 DeepSeek 爆火、电影《哪吒2》热映)，下列说法错误的是( )。',
      options: [
        'DeepSeek R1 模型在研发中大规模使用了强化学习技术',
        '在电影院观看《哪吒2》时，在大银幕上看到的画面是连续的',
        '放映机放映电影利用了“视觉暂留”原理',
        '是因为人脑处理图像的速度太快，所以才感觉画面是连续的'
      ],
      answer: 3,
      score: 2,
      explanation: '画面连续是因为“视觉暂留”原理，即人脑处理图像的速度不够快，从而将快速切换的静态画面看作连续运动。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 2,
      type: 'single',
      question: '下列哪个不是集成电路(IC)的基本组成元器件？',
      options: ['晶体管', '电阻器', '电感器', '塑料外壳'],
      answer: 3,
      score: 2,
      explanation: '塑料外壳是集成电路的封装材料，不是其内部参与电路运算或控制的基本电子元器件。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 3,
      type: 'single',
      question: '下列哪个 C++ 变量名是合法的？',
      options: ['3_Var', 'int', '_Var_1', 'a+b'],
      answer: 2,
      score: 2,
      explanation: 'A以数字开头，B是关键字，D包含非法符号+。只有下划线或字母开头的变量名合法。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 4,
      type: 'single',
      question: '下列哪个是 C++ 关键字？',
      options: ['abs', 'cin', 'do', 'endl'],
      answer: 2,
      score: 2,
      explanation: 'do 是 C++ 循环控制的关键字。abs 是函数，cin 和 endl 是标准库定义的标识符。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 5,
      type: 'single',
      question: '在一段 C++ 代码中，如果在一个 for 循环外使用了 break 语句，会发生什么？',
      options: ['程序正常运行', '程序运行崩溃', '编译报错', '跳过下一行代码执行'],
      answer: 2,
      score: 2,
      explanation: 'break 语句只能用在循环语句（for, while, do-while）或 switch 语句中，否则会引起编译阶段的语法错误。',
      tags: [LEVEL1_TAGS.condition, LEVEL1_TAGS.loop]
    },
    {
      id: 6,
      type: 'single',
      question: '执行代码 `printf("__%02d%2d\\$", 3, 22);` 的输出结果是 ( )。',
      options: ['`__322\\$`', '`__0322\\$`', '`__ 322\\$`', '`__03 22\\$`'],
      answer: 1,
      score: 2,
      explanation: '%02d 表示宽度为2，不足补0。%2d 表示宽度为2。3 补 0 变为 03，22 宽度刚好为 2。',
      tags: [LEVEL1_TAGS.io]
    },
    {
      id: 7,
      type: 'single',
      question: '关于 C++ 中的引号，下列说法错误的是( )。',
      options: [
        '单引号用于表示字符常量',
        '双引号用于表示字符串常量',
        '单引号和双引号在 C++ 中可以互换使用',
        '\'a\' 和 "a" 是不同的数据类型'
      ],
      answer: 2,
      score: 2,
      explanation: 'C++ 中单引号表示 char，双引号表示 string，两者性质完全不同，不能互换。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 8,
      type: 'single',
      question: '表达式 16 / 4 % 2 的值是( )。',
      options: ['4', '2', '1', '0'],
      answer: 3,
      score: 2,
      explanation: '16 / 4 = 4；4 % 2 = 0。',
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 9,
      type: 'single',
      question: 'for(int i = 1; i < 10; i += 2) 循环体会执行多少次？',
      options: ['10', '9', '6', '5'],
      answer: 3,
      score: 2,
      explanation: 'i 的取值分别为 1, 3, 5, 7, 9，共 5 次。',
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 10,
      type: 'single',
      question: '已知 a = 5, b = 10，执行语句 if(a > b) cout << a; else cout << b; 的输出是 ( )。',
      options: ['5', '15', 'true', '10'],
      answer: 3,
      score: 2,
      explanation: '5 > 10 为假，执行 else 分支，输出 b 的值 10。',
      tags: [LEVEL1_TAGS.condition, LEVEL1_TAGS.basics]
    },
    {
      id: 11,
      type: 'single',
      question: '字符 \'A\' 的 ASCII 码值是( )。',
      options: ['48', '97', '32', '65'],
      answer: 3,
      score: 2,
      explanation: '标准 ASCII 码中，\'A\' 为 65，\'a\' 为 97，\'0\' 为 48。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 12,
      type: 'single',
      question: '逻辑运算符的优先级从高到低排列正确的是( )。',
      options: [
        '&&, ||, !',
        '||, &&, !',
        '!, &&, ||',
        '!, ||, &&'
      ],
      answer: 2,
      score: 2,
      explanation: '逻辑非（!）最高，其次是逻辑与（&&），最低是逻辑或（||）。',
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 13,
      type: 'single',
      question: '下列哪个组件在断电后会丢失存储的数据？',
      options: ['RAM', 'ROM', '硬盘', 'U 盘'],
      answer: 0,
      score: 2,
      explanation: 'RAM (随机存取存储器) 是易失性存储器，断电后数据丢失。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 14,
      type: 'single',
      question: '在 C++ 中，cin >> a >> b; 的作用是( )。',
      options: ['从键盘输入两个变量的值', '向屏幕输出两个变量的值', '比较两个变量的大小', '交换两个变量的值'],
      answer: 0,
      score: 2,
      explanation: 'cin 是 standard 输入流，用于从终端读取数据。',
      tags: [LEVEL1_TAGS.io]
    },
    {
      id: 15,
      type: 'single',
      question: '下列 C++ 嵌套循环中，共会执行多少次 printf("*"); 操作？\n```cpp\nfor(int i = 0; i < 3; i++)\n  for(int j = 0; j < 4; j++)\n    printf("*");\n```',
      options: ['7', '12', '4', '3'],
      answer: 1,
      score: 2,
      explanation: '外层循环 3 次，每层内层循环 4 次，共 3 * 4 = 12 次。',
      tags: [LEVEL1_TAGS.loop]
    },

    // 16-25 判断题
    {
      id: 16,
      type: 'judge',
      question: 'C++ 语言通过区分字母的大小写来识别不同的变量。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: 'C++ 是强类型且区分大小写的语言。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 17,
      type: 'judge',
      question: '第一块集成电路出现在 20 世纪 50 年代末。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '1958 年杰克·基尔比研制出第一块集成电路。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 18,
      type: 'judge',
      question: '在函数内部声明的变量通常是局部变量。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '局部变量的作用域仅限于其定义的函数块内部。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 19,
      type: 'judge',
      question: '(5 > 3) && (2 > 4) 的结果是 true。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: 'true && false 结果为 false。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.operator]
    },
    {
      id: 20,
      type: 'judge',
      question: '在 C++ 中，可以用 const 关键字来定义常量。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: 'const 用于修饰变量，使其值不可更改。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 21,
      type: 'judge',
      question: 'while(false) 循环的循环体一次都不会执行。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: 'while 是先判断后执行。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.loop, LEVEL1_TAGS.condition]
    },
    {
      id: 22,
      type: 'judge',
      question: '% 运算符可以用于对浮点数（如 5.5）进行取余运算。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: 'C++ 中的 % 运算符操作数必须是整型。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.operator]
    },
    {
      id: 23,
      type: 'judge',
      question: '计算机的键盘属于输出设备。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '键盘是常见的输入设备。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.io]
    },
    {
      id: 24,
      type: 'judge',
      question: '每一个 C++ 程序都必须包含一个 main 函数。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: 'main 函数是程序的入口。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 25,
      type: 'judge',
      question: '在 C++ 中，花括号 {} 用于定义一个代码块。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '花括号界定作用域或复合语句。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },

    // 26-27 编程题
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `10
2
3`, output: `8` },
        { input: `5
2
4`, output: `3` }
      ],
      referenceCode: `#include <iostream>
using namespace std;
int main() {
    int n, x, y;
    cin >> n >> x >> y;
    int eaten = (y + x - 1) / x;
    cout << (n > eaten ? n - eaten : 0) << "\n";
    return 0;
}`,
      question: `
# [GESP202503 一级] 图书馆里的老鼠

## 题目描述

图书馆里有 \$n\$ 本书，不幸的是，还混入了一只老鼠，老鼠每 \$x\$ 小时能啃光一本书，假设老鼠在啃光一本书之前，不会啃另一本。请问 \$y\$ 小时后图书馆里还剩下多少本完整的书。

## 输入格式

三行，第一行一个正整数 \$n\$，表示图书馆里书的数量；

第二行，一个正整数 \$x\$，表示老鼠啃光一本书需要的时间；

第三行，一个正整数 \$y\$，表示经过的总时间；

输入数据保证 \$y\$ 小时后至少会剩下一本完整的书。

## 输出格式

一行，一个整数，表示 \$y\$ 小时后图书馆里还剩下多少本完整的书。
`,
      template: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}`,
      answer: '',
      score: 25,
      explanation: '遍历 a 到 b，使用 i % 2 == 0 判断并累加。',
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.condition, LEVEL1_TAGS.operator],
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `5
43
58
25
67
90`, output: `40
60
30
70
90` }
      ],
      referenceCode: `#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    for(int i = 0; i < n; i++) {
        int a;
        cin >> a;
        int rem = a % 10;
        if (rem >= 5) a += 10 - rem;
        else a -= rem;
        cout << a << "\n";
    }
    return 0;
}`,
      question: `
# [GESP202503 一级] 四舍五入

## 题目描述

四舍五入是一种常见的近似计算方法。现在，给定 \$n\$ 个整数，你需要将每个整数四舍五入到最接近的整十数。例如，\$43\$ 四舍五入后为 \$40\$，\$58\$ 四舍五入后为 \$60\$。

## 输入格式

共 \$n+1\$ 行，第一行，一个整数 \$n\$，表示接下来输入的整数个数。

接下来 \$n\$ 行，每行一个整数 \$a_1, \\cdots, a_n\$，表示需要四舍五入的整数。

## 输出格式

\$n\$ 行，每行一个整数，表示每个整数四舍五入后的结果。
`,
      template: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}`,
      answer: '',
      score: 25,
      explanation: '转换公式为：\'z\'-(c-\'a\')。',
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.basics],
    }
  ]
};
