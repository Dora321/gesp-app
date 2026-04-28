// 2023年6月 GESP C++ 四级真题
export const paperData = {
    id: '2023-06-l4',
    title: '2023年6月 GESP C++ 四级真题',
    level: 4,
    year: 2023,
    month: 6,
    session: 2,
    timeLimit: 5400,
    backfilled: true,
    questions: [
        {
            id: 1,
            type: "single",
            question: `高级语言编写的程序需要经过以下（ ）操作，可以生成在计算机上运行的可执行代码。`,
            options: [
                "编辑",
                "保存",
                "调试",
                "编译",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**
            
            **解析：**
            高级语言编写的程序要经过编译操作，才能生成计算机可以直接执行的机器码或字节码，从而生成可执行文件。
            
            **考点：** `,
            tags: ["编程环境", "单选题", "GESP4级"]
        },
        {
            id: 2,
            type: "single",
            question: `排序算法是稳定的(Stable Sorting)，就是指排序算法可以保证，在待排序数据中有两个相等记录的关键字R和S(R出现在S之前)，在排序后的列表中R也一定在S前。下面关于排序稳定性的描述，正确的是（ ）。`,
            options: [
                "冒泡排序是不稳定的",
                "插入排序是不稳定的",
                "选择排序是不稳定的",
                "以上都不正确",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**
            
            **解析：**
            选择排序是不稳定的算法；冒泡排序和插入排序通常是稳定的。
            
            **考点：** `,
            tags: ["排序算法", "稳定性", "单选题", "GESP4级"]
        },
        {
            id: 3,
            type: "single",
            question: `下列关于C++语言中指针的叙述，不正确的是（ ）。`,
            options: [
                "指针变量中存储的是内存地址。",
                "定义指针变量时必须指定其指向的类型。",
                "指针变量只能指向基本类型变量，不能指向指针变量。",
                "指针变量指向的内存地址不一定能够合法访问。",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**
            
            **解析：**
            指针变量可以指向任何类型，包括另一个指针变量（多级指针）。
            
            **考点：** `,
            tags: ["指针", "单选题", "GESP4级"]
        },
        {
            id: 4,
            type: "single",
            question: `下列关于C++语言中数组的叙述，不正确的是（ ）。`,
            options: [
                "一维数组在内存中一定是连续存放的。",
                "二维数组是一维数组的一维数组。",
                "二维数组中的每个一维数组在内存中都是连续存放的。",
                "二维数组在内存中可以不是连续存放的。",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**
            
            **解析：**
            在C++中，无论是几维数组，在内存中都是按序连续存放的。
            
            **考点：** `,
            tags: ["数组", "单选题", "GESP4级"]
        },
        {
            id: 5,
            type: "single",
            question: `下列关于C++语言中函数的叙述，正确的是（ ）。`,
            options: [
                "函数必须有名字。",
                "函数必须有参数。",
                "函数必须有返回值。",
                "函数定义必须写在函数调用前。",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            函数名是必须的；参数、返回值、定义位置（可先声明后调用）都不是绝对必须的。
            
            **考点：** `,
            tags: ["函数", "单选题", "GESP4级"]
        },
        {
            id: 6,
            type: "single",
            question: `下列关于C++语言中变量的叙述，正确的是（ ）。`,
            options: [
                "变量定义后可以一直使用。",
                "两个变量的变量名不能是相同的。",
                "两个变量的变量名可以相同，但它们的类型必须是不同的。",
                "两个变量的变量名可以相同，但它们的作用域必须是不同的。",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**
            
            **解析：**
            作用域不同的变量可以重名，例如全局变量和局部变量。
            
            **考点：** `,
            tags: ["变量作用域", "单选题", "GESP4级"]
        },
        {
            id: 7,
            type: "single",
            question: `一个二维数组定义为 double array[3][10]; ，则这个二维数组占用内存的大小为（ ）。`,
            options: [
                "30",
                "60",
                "120",
                "240",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**
            
            **解析：**
            3 * 10 * sizeof(double) = 30 * 8 = 240 字节。
            
            **考点：** `,
            tags: ["数组内存", "单选题", "GESP4级"]
        },
        {
            id: 8,
            type: "single",
            question: `一个变量定义为 int *p = nullptr; ，则下列说法正确的是（ ）。`,
            options: [
                "该指针变量的类型为int。",
                "该指针变量指向的类型为int。",
                "该指针变量指向的内存地址是随机的。",
                "访问该指针变量指向的内存会出现编译错误。",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            p 的类型是 int*，它指向的类型是 int。nullptr 是空指针，地址为 0 而非随机。
            
            **考点：** `,
            tags: ["指针", "单选题", "GESP4级"]
        },
        {
            id: 9,
            type: "single",
            question: `一个二维数组定义为 int array[5][3]; ，则 array[1][2] 和 array[2][1] 在内存中的位置相差多少字节?`,
            options: [
                "2字节",
                "4字节",
                "8字节",
                "无法确定",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**
            
            **解析：**
            array[1][2] 的序号是 1*3+2=5，array[2][1] 的序号是 2*3+1=7。相差 2 个 int，即 8 字节。
            
            **考点：** `,
            tags: ["数组内存", "单选题", "GESP4级"]
        },
        {
            id: 10,
            type: "single",
            question: `如果a为int类型的变量，且a的值为6，则执行 a &= 3; 之后，a的值会是（ ）。`,
            options: [
                "3",
                "9",
                "2",
                "7",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**
            
            **解析：**
            6 (110) & 3 (011) = 2 (010)。
            
            **考点：** `,
            tags: ["位运算", "单选题", "GESP4级"]
        },
        {
            id: 11,
            type: "single",
            question: `一个数组定义为 int a[5]={1, 2, 3, 4, 5}; ，一个指针定义为 int *p=&a[2]; ，则执行 a[1] = *p; 后，数组a中的值会变为（ ）。`,
            options: [
                "{1, 3, 3, 4, 5}",
                "{2, 2, 3, 4, 5}",
                "{1, 2, 2, 4, 5}",
                "{1, 2, 3, 4, 5}",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            *p 是 a[2] 即 3。a[1] 被赋值为 3，所以数组变为 {1, 3, 3, 4, 5}。
            
            **考点：** `,
            tags: ["指针数组", "单选题", "GESP4级"]
        },
        {
            id: 12,
            type: "single",
            question: `以下哪个函数声明在调用时可以传递二维数组的名字作为参数?`,
            options: [
                "void BubbleSort(int a[][4]);",
                "void BubbleSort(int a[3][]);",
                "void BubbleSort(int a[][]);",
                "void BubbleSort(int ** a);",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            作为参数的二维数组，除第一维外，其他维度必须固定大小。
            
            **考点：** `,
            tags: ["函数参数", "数组", "单选题", "GESP4级"]
        },
        {
            id: 13,
            type: "single",
            question: `在下列代码的横线处填写（ ），可以使得输出是“20 10”。\nvoid xchg(______) { int t = *x; *x = *y; *y = t; }\nint main() { int a = 10, b = 20; xchg(&a, &b); cout << a << ' ' << b << endl; }`,
            options: [
                "int x, int y",
                "int *x, int *y",
                "int a, int b",
                "int & a, int & b",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            调用时传入的是地址 &a, &b，函数内部用了解引用 *x, *y，因此参数应为指针类型。
            
            **考点：** `,
            tags: ["指针函数", "单选题", "GESP4级"]
        },
        {
            id: 14,
            type: "single",
            question: `执行以下C++语言程序后，输出结果是（ ）。\nint main() { int array[3][3]; for(int i=0; i<3; i++) for(int j=0; j<3; j++) array[i][j] = i*10+j; int sum=0; for(int i=0; i<3; i++) sum += array[i][i]; cout << sum << endl; }`,
            options: [
                "3",
                "30",
                "33",
                "无法确定",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**
            
            **解析：**
            累加主对角线元素：array[0][0]=0, array[1][1]=11, array[2][2]=22。0+11+22=33。
            
            **考点：** `,
            tags: ["二维数组", "单选题", "GESP4级"]
        },
        {
            id: 15,
            type: "single",
            question: `在下列代码的横线处填写（ ），完成对有n个int类型元素的数组array由小到大排序。\nvoid SelectionSort(int array[], int n) { int i, j, min, temp; for(i=0; i<$n-1$; i++) { min = i; for(j=i+1; j<n; j++) if(______) min = j; temp=array[min]; array[min]=array[i]; array[i]=temp; } }`,
            options: [
                "array[min] > array[j]",
                "array[min] > array[i]",
                "min > array[j]",
                "min > array[i]",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            选择排序需寻找剩余部分的最小值，如果 array[j] 比当前最小值小，则更新 min 指向 j。
            
            **考点：** `,
            tags: ["选择排序", "单选题", "GESP4级"]
        },
        {
            id: 16,
            type: "judge",
            question: `域名是由一串用点分隔的名字来标识互联网上一个计算机或计算机组的名称，CCF编程能力等级认证官方网站的域名是gesp.ccf.org.cn，其中顶级域名是gesp。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            顶级域名（TLD）是域名最后面的部分，如 .cn。gesp 是三级域名。
            
            **易混概念：** 注意区分相关概念的适用范围和边界条件。
            
            **考点：** `,
            tags: ["计算机网络", "判断题", "GESP4级"]
        },
        {
            id: 17,
            type: "judge",
            question: `斐波那契数列计算体现了递推的编程思想。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            通过已知项推导出未知项，是典型的递推思想。
            
            **易混概念：** 注意区分相关概念的适用范围和边界条件。
            
            **考点：** `,
            tags: ["编程思想", "判断题", "GESP4级"]
        },
        {
            id: 18,
            type: "judge",
            question: `在C++语言中，函数的参数默认以引用传递方式进行传递。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            C++默认是按值传递（Pass by Value）。
            
            **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
            
            **考点：** `,
            tags: ["函数传参", "判断题", "GESP4级"]
        },
        {
            id: 19,
            type: "judge",
            question: `在C++语言中，可以定义四维数组，但在解决实际问题时不可能用到，因为世界是三维的。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            四维及更高维数组在物理模拟、数据科学等领域有广泛应用，并不限于三维现实空间。
            
            **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
            
            **考点：** `,
            tags: ["数组基础", "判断题", "GESP4级"]
        },
        {
            id: 20,
            type: "judge",
            question: `在C++语言中，一个函数没有被调用时，它的参数不占用内存。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            参数是函数栈帧的一部分，只有函数被调用（创建栈帧）时才分配内存。
            
            **易混概念：** CPU 负责运算和判断，内存负责存储数据，两者职能不同。
            
            **考点：** `,
            tags: ["内存管理", "判断题", "GESP4级"]
        },
        {
            id: 21,
            type: "judge",
            question: `在C++语言中，如果一个函数可能抛出异常，那么一定要在try子句里调用这个函数。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            不强制在 try 中调用，但未捕获的异常会导致程序非正常终止。
            
            **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
            
            **考点：** `,
            tags: ["异常处理", "判断题", "GESP4级"]
        },
        {
            id: 22,
            type: "judge",
            question: `如果希望记录10个最长为99字节的字符串，可以将字符串数组定义为 char s[100][10]; 。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            应该是 s[10][100]，第一维是数量，第二维是长度（含结尾符）。
            
            **易混概念：** 在 C++ 中，无论是几维数组，在内存中都是按序连续存放的。
            
            **考点：** `,
            tags: ["字符串数组", "判断题", "GESP4级"]
        },
        {
            id: 23,
            type: "judge",
            question: `字符常量 '@' 和 "\\0" 是等价的。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            前者是字符常量（ASCII 64），后者是包含空字符的字符串常量。
            
            **易混概念：** 字符运算本质是 ASCII 码值运算，'0'=48, 'A'=65, 'a'=97。字符加减是码值加减。
            
            **考点：** `,
            tags: ["字符常量", "判断题", "GESP4级"]
        },
        {
            id: 24,
            type: "judge",
            question: `>= 和 >>= 都是C++语言的运算符。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            >= 是大于等于，>>= 是右移赋值。
            
            **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
            
            **考点：** `,
            tags: ["运算符", "判断题", "GESP4级"]
        },
        {
            id: 25,
            type: "judge",
            question: `由于文件重定向操作，程序员在使用C++语言编写程序时无法确定通过cout输出的内容是否会被输出到屏幕上。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            重定向是在外部控制的，程序运行时内部通过标准流输出，无法预知最终流向（屏幕、文件或管道）。
            
            **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
            
            **考点：** `,
            tags: ["输入输出", "判断题", "GESP4级"]
        }
    ]
};

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        {
          input: `2
16347
76344`,
          output: `T
F`
        }
      ],
      question: `
# [GESP202306 四级] 幸运数

## 题目描述

小明发明了一种“幸运数”。一个正整数从个位开始编号，第 1、3、5... 位上的数字都要做一次变换，第 2、4、6... 位上的数字保持不变。

对奇数位上的数字 $t$，变换规则为：

- 先计算 $t \\times 7$；
- 如果结果不大于 $9$，就把它作为变换结果；
- 否则不断把各位数字相加，直到结果不大于 $9$。

把所有数位处理完成后，再将最终各位数字求和；如果这个和是 $8$ 的倍数，则称原数是幸运数。

## 输入格式

第一行一个正整数 $N$，表示待判断的整数个数。 
接下来 $N$ 行，每行一个正整数 $x$。

## 输出格式

输出 $N$ 行。若对应整数是幸运数，输出 \`T\`；否则输出 \`F\`。
`,
      score: 25,
      answer: '',
      explanation: `
      **解析：**
      按位从低到高扫描整数。偶数位直接累加，奇数位先做题目规定的数位变换后再累加，最后判断总和是否能被 8 整除即可。
      `,
      tags: ['编程题', '模拟'],
      template: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 在此编写代码
    return 0;
}`,
      referenceCode: `#include <iostream>
using namespace std;

int trans(int t) {
    if (t == 0) return 0;
    return (t * 7 - 1) % 9 + 1;
}

bool judge(long long x) {
    int sum = 0;
    for (int d = 1; x > 0; d++, x /= 10) {
        int t = static_cast<int>(x % 10);
        if (d % 2 == 0) sum += t;
        else sum += trans(t);
    }
    return sum % 8 == 0;
}

int main() {
    int n;
    cin >> n;
    while (n--) {
        long long x;
        cin >> x;
        cout << (judge(x) ? "T" : "F") << "\n";
    }
    return 0;
}`,
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        {
          input: `10
00FFCFAB00FFAC09071B5CCFAB76
00AFCBAB11FFAB09981D34CFAF56
01BFCEAB00FFAC0907F25FCFBA65
10FBCBAB11FFAB09981DF4CFCA67
00FFCBFB00FFAC0907A25CCFFC76
00FFCBAB1CFFCB09FC1AC4CFCF67
01FCCBAB00FFAC0F071A54CFBA65
10EFCBAB11FFAB09981B34CFCF67
01FFCBAB00FFAC0F071054CFAC76
1000CBAB11FFAB0A981B84CFCF66`,
          output: `ABCFFF00CB09AC07101198011B6776FC
321032657CD10E
36409205ACC16D
B41032657FD16D
8F409205ACF14D
324F326570D1FE
3240C245FC411D
BF4032687CD16D
8F409205ACC11D
B240326878D16E
83409205ACE11D`
        }
      ],
      question: `
# [GESP202306 四级] 图像压缩

## 题目描述

给定一幅 256 级灰度图像，其中每个像素都用两位十六进制数表示，范围从 \`00\` 到 \`FF\`。

现在需要把它压缩为 16 级灰度图，规则如下：

- 先统计整幅图中每种灰度出现的次数；
- 选出出现次数最多的 16 种灰度，按“出现次数从多到少、灰度值从小到大”的规则编号为 \`0\` 到 \`F\`；
- 其他灰度映射到这 16 种灰度中“最接近”的一种；若距离相同，则选择编号更小的那种。

## 输入格式

第一行一个正整数 $N$，表示图像共有 $N$ 行。 
接下来 $N$ 行，每行是一个长度为偶数的十六进制字符串，每两位表示一个像素。

## 输出格式

第一行输出被选中的 16 种灰度的十六进制编码，共 32 个字符。 
随后输出压缩后的图像，每个像素用一位十六进制数表示。
`,
      score: 25,
      answer: '',
      explanation: `
      **解析：**
      先统计灰度直方图并选出 16 个代表灰度，再把每个像素映射到最近的代表灰度，输出代表灰度表和压缩后的图像。
      `,
      tags: ['编程题', '模拟', '字符串', '统计'],
      template: `#include <iostream>
#include <cstring>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 在此编写代码
    return 0;
}`,
      referenceCode: `#include <iostream>
#include <cstring>
using namespace std;

int image[20][20];
int cpimg[20][20];
int his[256];
int color[16];

int trans(char a) {
    if (a <= '9') return a - '0';
    return a - 'A' + 10;
}

char itrans(int n) {
    if (n >= 10) return static_cast<char>(n - 10 + 'A');
    return static_cast<char>(n + '0');
}

int compress(int c) {
    int dis = 256, res = -1;
    for (int i = 0; i < 16; i++) {
        int d = c - color[i];
        if (d < 0) d = -d;
        if (d < dis) {
            dis = d;
            res = i;
        }
    }
    return res;
}

int main() {
    int n = 0, m = 0;
    cin >> n;
    memset(his, 0, sizeof(his));
    for (int i = 0; i < n; i++) {
        char line[50];
        cin >> line;
        m = static_cast<int>(strlen(line)) / 2;
        for (int j = 0; j < m; j++) {
            int c = trans(line[j * 2]) * 16 + trans(line[j * 2 + 1]);
            image[i][j] = c;
            his[c]++;
        }
    }
    for (int c = 0; c < 16; c++) {
        int mx = -1, mx_id = -1;
        for (int i = 0; i < 256; i++) {
            if (his[i] > mx) {
                mx = his[i];
                mx_id = i;
            }
        }
        color[c] = mx_id;
        his[mx_id] = -1;
    }
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cpimg[i][j] = compress(image[i][j]);
        }
    }
    for (int c = 0; c < 16; c++) {
        cout << itrans(color[c] / 16) << itrans(color[c] % 16);
    }
    cout << "\n";
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cout << itrans(cpimg[i][j]);
        }
        cout << "\n";
    }
    return 0;
}`,
    }
];

paperData.questions.push(...programmingQuestions);
