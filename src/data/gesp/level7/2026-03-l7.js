// 2026年3月 GESP C++ 七级真题
// 注意：2026-03 为最新考试，材料待搜集，目前基于占位符构建

const programmingQuestions = [
    {
        id: 26,
        type: "programming",
        title: "编程题 1",
        problemNumber: "2026-03-23-07-C-01",
        description: "题目内容待补充。",
        inputDescription: "输入描述待补充。",
        outputDescription: "输出描述待补充。",
        samples: [],
        tags: ["编程题", "GESP7级"],
        template: "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        referenceCode: "// 待补充"
    },
    {
        id: 27,
        type: "programming",
        title: "编程题 2",
        problemNumber: "2026-03-23-07-C-02",
        description: "题目内容待补充。",
        inputDescription: "输入描述待补充。",
        outputDescription: "输出描述待补充。",
        samples: [],
        tags: ["编程题", "GESP7级"],
        template: "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        referenceCode: "// 待补充"
    }
];

export const paperData = {
    id: '2026-03-l7',
    title: '2026年3月 GESP C++ 七级真题',
    level: 7,
    year: 2026,
    month: 3,
    session: 13,
    timeLimit: 5400,
    questions: [
        ...Array.from({ length: 15 }, (_, i) => ({
            id: i + 1,
            type: "single",
            question: `第${i+1}题（单选）：题目内容待补充。`,
            options: ["选项A", "选项B", "选项C", "选项D"],
            answer: 0,
            score: 2,
            explanation: "真题解析待补充。",
            tags: ["客观题", "单选题", "GESP7级"]
        })),
        ...Array.from({ length: 10 }, (_, i) => ({
            id: i + 16,
            type: "judge",
            question: `第${i+1}题（判断）：题目内容待补充。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "真题解析待补充。",
            tags: ["客观题", "判断题", "GESP7级"]
        })),
        ...programmingQuestions
    ]
};
