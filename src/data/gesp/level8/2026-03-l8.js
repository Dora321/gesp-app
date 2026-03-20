// 2026年3月 GESP C++ 八级真题
// 注意：2026-03 为最新考试，材料待搜集，目前基于已知信息和占位符构建

const programmingQuestions = [
    {
        id: 26,
        type: "programming",
        title: "消息查找工具",
        problemNumber: "2026-03-23-08-C-01",
        description: "题目关于实现一个‘消息查找工具’。给定若干条消息，每条消息包含时间戳、发送者和内容。你需要实现各种查找功能（如：按发送者查找、按关键词查找、按时间范围查找等）。",
        inputDescription: "输入描述待补充。",
        outputDescription: "输出描述待补充。",
        samples: [],
        tags: ["编程题", "数据结构", "字符串", "模拟"],
        template: "#include <iostream>\n#include <string>\n#include <vector>\n#include <map>\nusing namespace std;\n\nint main() {\n    return 0;\n}",
        referenceCode: "// 待补充"
    },
    {
        id: 27,
        type: "programming",
        title: "编程题 2",
        problemNumber: "2026-03-23-08-C-02",
        description: "题目内容待补充。",
        inputDescription: "输入描述待补充。",
        outputDescription: "输出描述待补充。",
        samples: [],
        tags: ["编程题", "GESP8级"],
        template: "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}",
        referenceCode: "// 待补充"
    }
];

export const paperData = {
    id: '2026-03-l8',
    title: '2026年3月 GESP C++ 八级真题',
    level: 8,
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
            tags: ["客观题", "单选题", "GESP8级"]
        })),
        ...Array.from({ length: 10 }, (_, i) => ({
            id: i + 16,
            type: "judge",
            question: `第${i+1}题（判断）：题目内容待补充。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "真题解析待补充。",
            tags: ["客观题", "判断题", "GESP8级"]
        })),
        ...programmingQuestions
    ]
};
