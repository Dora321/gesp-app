
import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MessageSquare, BarChart2, Calendar, CheckCircle, AlertCircle, Clock, Activity } from 'lucide-react';

const StatCard = ({ label, value, trend, trendUp, icon: Icon, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.4 }}
        className="bg-[#0a0b10] border border-white/10 rounded-xl p-6 relative overflow-hidden group"
    >
        <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-white/5 rounded-lg text-gray-400 group-hover:text-cyan-400 transition-colors">
                <Icon className="w-6 h-6" />
            </div>
            {trend && (
                <div className={`px-2 py-1 rounded text-[10px] font-mono font-bold ${trendUp ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {trend}
                </div>
            )}
        </div>
        <div className="text-3xl font-black text-white mb-1 tabular-nums">{value}</div>
        <div className="text-xs text-gray-500 uppercase tracking-widest font-mono">{label}</div>

        {/* Animated Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: delay + 0.5, duration: 1 }}
                className="h-full bg-cyan-500 opacity-50"
            />
        </div>
    </motion.div>
);

const ActivityItem = ({ title, time, type, status }) => (
    <div className="flex gap-4 p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors rounded-lg">
        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}`} />
        <div className="flex-1">
            <h4 className="text-white font-bold text-sm">{title}</h4>
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1 font-mono">
                <Clock className="w-3 h-3" /> {time}
                <span className="px-1.5 py-0.5 bg-white/5 rounded text-[10px] uppercase border border-white/5">{type}</span>
            </div>
        </div>
    </div>
);

const EkartParentPortal = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white mb-2">
                            家长控制台 <span className="text-cyan-500">.</span>
                        </h1>
                        <p className="text-gray-400 font-mono text-sm">
                            // 实时同步学生课堂表现与项目进度
                        </p>
                    </div>
                    <div className="flex items-center gap-4 mt-6 md:mt-0">
                        <div className="text-right hidden md:block">
                            <div className="text-white font-bold">陈小明 (Alexander)</div>
                            <div className="text-xs text-gray-500 font-mono">LEVEL 3 见习工程师</div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-xl ring-2 ring-white/10">
                            陈
                        </div>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Left Column: Stats & Progress */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="grid md:grid-cols-3 gap-4">
                            <StatCard label="本学期出勤率" value="98%" trend="+2%" trendUp={true} icon={Calendar} delay={0} />
                            <StatCard label="综合技能评分" value="850" trend="+45 分" trendUp={true} icon={BarChart2} delay={0.1} />
                            <StatCard label="完成项目数" value="04" trend="进度正常" trendUp={true} icon={CheckCircle} delay={0.2} />
                        </div>

                        {/* Chart Area (Simplified Visual) */}
                        <div className="bg-[#0a0b10] border border-white/10 rounded-xl p-8 min-h-[300px] relative overflow-hidden group">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Activity className="text-cyan-500 w-5 h-5" /> 学习表现趋势
                                </h3>
                                <div className="flex gap-2">
                                    {['按周', '按月', '按年'].map(period => (
                                        <button key={period} className="px-3 py-1 text-xs font-mono rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                            {period}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Decorative Graph Lines */}
                            <div className="absolute bottom-0 left-0 right-0 h-48 flex items-end justify-between px-8 pb-8 gap-2 opacity-50 group-hover:opacity-80 transition-opacity">
                                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        whileInView={{ height: `${h}%` }}
                                        transition={{ delay: i * 0.05, duration: 0.8 }}
                                        className="w-full bg-gradient-to-t from-cyan-900/50 to-cyan-500 rounded-t-sm"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Activity Feed & Contact */}
                    <div className="space-y-8">
                        <div className="bg-[#0a0b10] border border-white/10 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 border-b border-white/5 pb-4">近期动态</h3>
                            <div className="space-y-2">
                                <ActivityItem title="完成单元：直流电机控制" time="2 小时前" type="课程" status="completed" />
                                <ActivityItem title="提交作业：底盘设计草图 v1" time="昨天" type="项目" status="completed" />
                                <ActivityItem title="测验：实验室安全规范" time="2 天前" type="考试" status="completed" />
                                <ActivityItem title="日程提醒：赛道测试日" time="5 天后" type="活动" status="pending" />
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-xl p-6 relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold text-white mb-2">需要联系导师？</h3>
                                <p className="text-gray-400 text-sm mb-4">直接联系实验室教务主管或主讲老师。</p>
                                <button className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded transition-colors flex items-center justify-center gap-2">
                                    <MessageSquare className="w-4 h-4" /> 发送消息
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EkartParentPortal;
