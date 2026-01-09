// 2025年3月 GESP C++ 八级真题
export const paperData = {
    id: '2025-03-l8',
    title: '2025年3月 GESP C++ 八级真题',
    level: 8,
    year: 2025,
    month: 3,
    session: 9,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "中国剩余定理（CRT）在模数不互质时的扩展版本是？",
            options: ["Lucas 定理", "ExCRT", "BSGS", "Pollard-Rho"],
            answer: 1,
            score: 2,
            explanation: "ExCRT（扩展中国剩余定理）使用两两合并同余方程的方法解决模数不互质的情况。"
        }
    ]
};
