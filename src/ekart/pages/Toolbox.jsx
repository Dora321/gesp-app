
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Toolbox = () => {
    const [activeTab, setActiveTab] = useState('install'); // 'install' or 'faq'

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-white mb-4">🛠️ 工程师工具箱</h1>
                <p className="text-gray-400">这里存放着所有的技术文档与常见问题解答，是你解决问题的军火库。</p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-10">
                <div className="bg-gray-800 p-1 rounded-xl inline-flex">
                    <button
                        onClick={() => setActiveTab('install')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'install'
                                ? 'bg-cyan-600 text-white shadow-lg'
                                : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        🔧 安装百科
                    </button>
                    <button
                        onClick={() => setActiveTab('faq')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'faq'
                                ? 'bg-cyan-600 text-white shadow-lg'
                                : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        ❓ 常见问题
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[500px]">
                {activeTab === 'install' && <InstallationGuide />}
                {activeTab === 'faq' && <FAQSection />}
            </div>
        </div>
    );
};

const InstallationGuide = () => {
    // Mock steps
    const steps = [
        { id: 1, title: '底盘框架组装', desc: '确保四个角的螺丝对角拧紧，防止应力变形。', img: 'placeholder_chassis.jpg' },
        { id: 2, title: '转向节安装', desc: '注意左右转向节的区别，安装时要在轴承处涂抹少许润滑脂。', img: 'placeholder_steering.jpg' },
        { id: 3, title: '电机固定', desc: '电机轴上的平垫片和弹簧垫片顺序不能错。', img: 'placeholder_motor.jpg' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
        >
            {steps.map((step, idx) => (
                <div key={step.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center font-bold text-xl text-cyan-400 border-2 border-cyan-500/30">
                            {idx + 1}
                        </div>
                    </div>
                    <div className="flex-grow">
                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-gray-300 mb-4">{step.desc}</p>
                        <div className="w-full h-48 bg-gray-900 rounded-lg flex items-center justify-center text-gray-600 border border-gray-700 border-dashed">
                            <span className="text-sm">[Image: {step.img}]</span>
                        </div>
                    </div>
                </div>
            ))}
        </motion.div>
    );
};

const FAQSection = () => {
    const faqs = [
        { q: '电机不转怎么办？', a: '首先检查电池电压是否充足，其次检查控制器霍尔线是否连接牢固（5根细线），最后用万用表测量油门踏板信号。' },
        { q: '超声波测距不准？', a: '检查代码中的 Trig 和 Echo 引脚定义是否与实际接线一致。另外，超声波模块前面不能有遮挡物。' },
        { q: '轮胎跑着跑着掉了？', a: '这是一个很严重的安全隐患！请立即复习 Day 8 的扭矩紧固章节，确保轮毂螺母达到了规定的扭矩值。' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="grid gap-6"
        >
            {faqs.map((faq, idx) => (
                <div key={idx} className="bg-gray-800 p-6 rounded-xl border-l-4 border-cyan-500">
                    <h3 className="text-lg font-bold text-white mb-2">Q: {faq.q}</h3>
                    <p className="text-gray-400">A: {faq.a}</p>
                </div>
            ))}
        </motion.div>
    );
};

export default Toolbox;
