import React from 'react';
import { Terminal, Repeat, Layers, Box, MousePointer2, Star, Award, Search, Key, ArrowUp, Zap, Map } from 'lucide-react';

export const courseCategories = [
    {
        id: 'game-creator',
        title: '游戏创造者',
        subtitle: 'Game Creator',
        desc: '不做玩家做主宰。用代码创造规则，设计属于你的虚拟世界。',
        icon: 'Gamepad2',
        color: 'blue',
        courses: [
            {
                id: 'py_a2',
                title: 'Python 游戏工坊',
                desc: '2048、贪吃蛇实战开发。掌握二维列表与事件处理。',
                tags: ['Python', 'GameDev'],
                path: '/python/a2',
                icon: <Terminal className="text-yellow-400" />
            },
            {
                id: 'py_f5',
                title: 'Python 绘图魔法',
                desc: 'Turtle 海龟画图。用代码绘制几何分形与艺术图案。',
                tags: ['Python', 'Art'],
                path: '/python/f5',
                icon: <MousePointer2 className="text-emerald-400" />
            },
            {
                id: 'c_l1',
                title: 'C++ 逻辑游乐场',
                desc: '零基础入门。在“陷阱卡”游戏中掌握变量与运算。',
                tags: ['C++', 'Logic'],
                path: '/level1',
                icon: <Star className="text-emerald-400" />
            }
        ]
    },
    {
        id: 'logic-master',
        title: '逻辑思维大师',
        subtitle: 'Logic Master',
        desc: '挑战大脑极限。学习算法，像计算机科学家一样思考。',
        icon: 'Brain',
        color: 'purple',
        courses: [
            {
                id: 'py_bs',
                title: 'Python 猜数字专家',
                desc: '二分查找初探。体验“对半劈”的高效搜索策略。',
                tags: ['Python', 'Algorithm'],
                path: '/python/binary-search',
                icon: <Search className="text-yellow-400" />
            },
            {
                id: 'c_l3',
                title: 'C++ 算法进阶',
                desc: '可视化算法逻辑。位运算模拟与真题实战。',
                tags: ['C++', 'GESP 3级'],
                path: '/level3',
                icon: <Award className="text-blue-400" />
            },
            {
                id: 'c_l5',
                title: 'C++ 核心算法',
                desc: '贪心策略与动态规划入门。解决复杂优化问题。',
                tags: ['C++', 'GESP 5级'],
                path: '/level5',
                icon: <Star className="text-purple-400" />
            }
        ]
    },
    {
        id: 'full-stack',
        title: '计算机全栈',
        subtitle: 'Full Stack',
        desc: '从底层原理到应用开发，建立完整的计算机认知体系。',
        icon: 'Layers',
        color: 'emerald',
        courses: [
            {
                id: 'py_f4',
                title: 'Python 函数模块',
                desc: '掌握代码封装与复用。像搭积木一样构建程序。',
                tags: ['Python', 'Core'],
                path: '/python/f4',
                icon: <Box className="text-teal-400" />
            },
            {
                id: 'c_l8',
                title: 'C++ 大师之路',
                desc: '图论与组合数学。挑战信息学奥赛难度的算法。',
                tags: ['C++', 'GESP 8级'],
                path: '/level8',
                icon: <Star className="text-rose-400" />
            },
            {
                id: 'py_crawler',
                title: 'Python 网络爬虫',
                desc: '数据获取与分析。编写脚本自动收集全网信息。',
                tags: ['Python', 'Data'],
                path: '/python/crawler',
                icon: <Map className="text-yellow-400" />
            }
        ]
    }
];
