// 2023年6月 GESP C++ 六级真题
export const paperData = {
    id: '2023-06-l6',
    title: '2023年6月 GESP C++ 六级真题',
    level: 6,
    year: 2023,
    month: 6,
    session: 2,
    note: '首次开启5-8级',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "使用拓扑排序判断有向图是否有环的根据是？",
            options: ["所有节点都进入了拓扑序列", "存在入度为0的节点", "拓扑序列中的节点数小于图的顶点数", "存在出度为0的节点"],
            answer: 2,
            score: 2,
            explanation: "拓扑排序只能对有向无环图进行。如果排序结束后，进入序列的节点数小于总顶点数，说明图中存在环，导致环上的节点入度永远不为0。"
        }
    ]
};
