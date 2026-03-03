// 2024年3月 GESP C++ 四级真题
export const paperData = {
    id: '2024-03-l4',
    title: '2024年3月 GESP C++ 四级真题',
    level: 4,
    year: 2024,
    month: 3,
    session: 5,
    note: '2024年首场',
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "若函数声明为int f(int &x){ x+=3; return x; }，则对声明的变量int a=3，下面哪个调用能够改 变a的值 ( ) 。",
            options: [
                "f(&a);",
                "f(*a);",
                "f(a);",
                "f(a-3);",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 2,
            type: "single",
            question: "下面 C++ 代码执⾏后，输出的是 ( ) 。",
            options: [
                "G",
                "e",
                "n",
                "P",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: "下面 C++ 代码执⾏后输出是 ( ) 。 int main() { int x[]={2, 0, 2, 4}; char geSP[]=\"Grade Examination of SP\"; cout << geSP[sizeof(x)] << endl; cout << endl; return 0; } 1 2 3 4 5 6 7 8 9 10 int foo(float *f) { return int(*f*2); } int main() 1 2 3 4 5 6",
            options: [
                "1",
                "1.1",
                "3",
                "3.1",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: "对二维数组int arr[3][16];，则arr[1]占用内存的大小为（ ）字节。",
            options: [
                "4",
                "16",
                "48",
                "64",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: "对二维数组int arr[3][16];，若arr的地址是0x28cbc0，则arr[1]的值是（ ）。",
            options: [
                "0x28cbc4",
                "0x28cbd0",
                "0x28cc00",
                "不确定",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: "下面 C++ 代码执⾏后输出是（ ）。",
            options: [
                "e",
                "I lov",
                "e GESP!",
                "GESP!",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: "下面 C++ 代码执⾏以后输出的是（ ）。 { float fnum[10]={1.1}; fnum[1]=foo(fnum); cout << fnum[0]+fnum[1] << endl; cout << endl; return 0; } 7 8 9 10 11 12 13 14 int main() { char *p=\"I love GESP!\"; cout << p+5 << endl; cout << endl; return 0; } 1 2 3 4 5 6 7 8",
            options: [
                "0",
                "1",
                "6",
                "不确定",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: "下面 C++ 函数中采用的算法是（ ）。",
            options: [
                "递推",
                "递归",
                "迭代",
                "循环",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: "插入排序在最好情况下的时间复杂度是（ ）。",
            options: [
                "选项A",
                "选项B",
                "选项C",
                "选项D",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: "在如下的 C++ 代码执⾏后，设第 11 和 12 ⾏的输出地址值分别为X和Y，则下面正确的是（ ）。 int rc=5; int main() { int rc; cout << ++rc << endl; cout << endl; return 0; } 1 2 3 4 5 6 7 8 9 10 int fib(int n) { int i, f[n]={0, 1}; for(int i=2; i<=n; i++) f[i]=f[i-1]+f[i-2]; return f[n]; } 1 2 3 4 5 6 7 8 9 10 struct pass{ int no; char name[20]; int level; }; 1 2 3 4 5",
            options: [
                "X>Y",
                "X==Y",
                "X<Y",
                "不确定",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: "如果文件1.txt中的内容如下，则执⾏下面 C++ 代码时，注释了####那⾏代码所输出的x的值为（ ）。",
            options: [
                "5",
                "2024",
                "3",
                "0",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: "执⾏下列 C++ 代码时输出中的第 2 ⾏是（ ）。 int main() { struct pass XiaoYang; cout << \"&XiaoYang=\" << &XiaoYang << endl; // 第 11 行 cout << \"&(XiaoYang.no)=\" << &(XiaoYang.no) << endl; // 第 12 行 cout << endl; return 0; } 6 7 8 9 10 11 12 13 14 15 16 50 2024 3.16 I love GESP! 1 2 3 int main() { ifstream fin; string line; int x; fin.open(\"1.txt\",ios::in); for (int i=0; i< 2; i++){ fin >> line; cout << line << endl; } fin>>x; cout << x << endl; //#### cout << endl; return 0; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 题号 1 2 3 4 5 6 7 8 9 10 答案",
            options: [
                "2024",
                "3.16",
                "024",
                "3",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: "C++ 语⾔中下面哪个关键字能够限定对象的作用域（ ）。",
            options: [
                "extern",
                "static",
                "inline",
                "public",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: "小杨的⽗母最近刚刚给他买了一块华为⼿表，他说⼿表上跑的是鸿蒙，这个鸿蒙是（ ）。",
            options: [
                "小程序",
                "计时器",
                "操作系统",
                "神话⼈物",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: "中国计算机学会（ CCF ）在 2024 年 1 月 27 日的颁奖典礼上颁布了王选奖，王选先生的重大贡献是（ ）。",
            options: [
                "制造⾃动驾驶汽车",
                "创⽴培训学校",
                "发明汉字激光照排系统",
                "成⽴方正公司",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "对int a[]={2,0,2,4,3,1,6}，执⾏第一趟选择排序处理后a中数据变为{0,2,2,4,3,1,6}。 ( )",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "如果待排序数据不能都装进内存，需要使用外排序算法。（ ） int main() { char *s[]={(char*)\"2024\",(char*)\"3.16\",(char*)\"GESP\"}; for (int i=0; i< 2; i++){ cout << *s+i << endl; } cout << endl; return 0; } 1 2 3 4 5 6 7 8 9 10 11",
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "定义变量int a=5, 则cout << &++a会输出6。 ( )",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "两个函数之间可以使用全局变量来传递数据。 ( )",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "定义数组int a[2024][3][16]={2,0,2,4,3,1,6}，则cout << a[2023][2][15]的结果不确定。（ ）",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "在 C++ 语⾔中，函数的参数为指针时，可以在函数内部修改该参数的值。（ ）",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "在 C++ 语⾔中try子句⾥抛出的结构体等类型的异常无法被catch捕获。（ ）",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "C++ 语⾔中cout << 9^2 << endl;会输出 81 。（ ）",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "小杨今年春节回奶奶家了，奶奶家的数字电视要设置 ip 地址并接入到 WIFI 盒子才能收看节目，那这个 WIFI 盒 子具有路由器的功能。（ ）",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "任何一个for循环都可以转化为等价的while循环（ ）。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        }
    ]
};
