
import React from 'react';
import { motion } from 'framer-motion';

const ParentPortal = () => {
    // Mock daily logs
    const dailyLogs = [
        {
            day: 'Day 3',
            title: '操控系统集成',
            date: '2026-08-12',
            skills: ['游标卡尺精细读数', '阿克曼转向几何原理', '尼龙防松螺母的使用'],
            feedback: '今天孩子们表现非常棒！特别是在安装转向拉杆时，因为是反牙螺纹，很多同学一开始拧不进去，但经过仔细观察螺纹方向后都独立解决了问题。这种遇到问题不放弃的精神比知识更重要。',
            images: ['placeholder_welding.jpg', 'placeholder_teamwork.jpg'],
            alert: { type: 'warning', msg: '明日预告：明天将进行第一次通电测试，请确保孩子穿着橡胶底运动鞋，不要穿凉鞋。' }
        },
        {
            day: 'Day 2',
            title: '底盘结构搭建',
            date: '2026-08-11',
            skills: ['铝型材连接件使用', '电动扳手扭矩控制'],
            feedback: '底盘是赛车的骨架。今天我们重点强调了“对角拧紧”原则，孩子们从一开始的手忙脚乱到后来能够熟练配合，团队默契度直线上升。',
            images: ['placeholder_chassis_day2.jpg']
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-white mb-2">📝 家长日报</h1>
                <p className="text-gray-400">见证每一天的成长与蜕变</p>
            </div>

            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-700 before:to-transparent">
                {dailyLogs.map((log, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                    >
                        {/* Icon */}
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-gray-900 bg-gray-800 group-[.is-active]:bg-cyan-600 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                            <span className="text-xs font-bold">{log.day.split(' ')[1]}</span>
                        </div>

                        {/* Card */}
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-white text-lg">{log.title}</h3>
                                    <time className="text-xs text-gray-500 font-mono">{log.date}</time>
                                </div>
                                <span className="px-2 py-1 bg-gray-700 text-cyan-400 text-xs rounded font-bold">{log.day}</span>
                            </div>

                            <div className="mb-4">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">🎓 新学技能</h4>
                                <div className="flex flex-wrap gap-2">
                                    {log.skills.map(skill => (
                                        <span key={skill} className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded border border-gray-600">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">💬 导师寄语</h4>
                                <p className="text-gray-300 text-sm leading-relaxed italic">
                                    "{log.feedback}"
                                </p>
                            </div>

                            {log.alert && (
                                <div className={`p-3 rounded-lg text-sm mb-4 ${log.alert.type === 'warning' ? 'bg-amber-900/30 text-amber-200 border border-amber-800' : 'bg-blue-900/30 text-blue-200'
                                    }`}>
                                    ⚠️ {log.alert.msg}
                                </div>
                            )}

                            {/* Image Grid Placeholder */}
                            <div className="grid grid-cols-2 gap-2 mt-4">
                                {log.images.map((img, i) => (
                                    <div key={i} className="aspect-video bg-gray-900 rounded flex items-center justify-center text-xs text-gray-600 border border-gray-800 border-dashed">
                                        [Image]
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ParentPortal;
