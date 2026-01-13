// 2024年6月 GESP C++ 二级真题 (第6次认证)
export const paperData = {
    id: '2024-06-l2',
    title: '2024年6月 GESP C++ 二级真题',
    level: 2,
    year: 2024,
    month: 6,
    session: 6,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "以下代码的输出是？for(int i=0; i<5; i++) { if(i==3) continue; cout << i; }",
            options: ["01234", "0124", "012", "01245"],
            answer: 1,
            score: 2,
            explanation: "当 i=3 时 continue 跳过，所以输出 0124。"
        },
        {
            id: 2,
            type: 'single',
            question: "const int SIZE = 10; 之后能否执行 SIZE = 20;？",
            options: ["可以", "不可以", "取决于编译器", "会产生警告但可以"],
            answer: 1,
            score: 2,
            explanation: "const 声明的常量不能被修改，编译时会报错。"
        },
        {
            id: 3,
            type: 'single',
            question: "以下哪个是获取数组长度的正确方法？",
            options: ["arr.length", "sizeof(arr)", "len(arr)", "sizeof(arr)/sizeof(arr[0])"],
            answer: 3,
            score: 2,
            explanation: "C++ 中用 sizeof(arr)/sizeof(arr[0]) 计算数组元素个数。"
        },
        {
            id: 4,
            type: 'judge',
            question: "a++ 和 ++a 的效果完全相同。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "a++ 是后置自增，先使用后增加；++a 是前置自增，先增加后使用。表达式的值不同。"
        }
    ]
};
