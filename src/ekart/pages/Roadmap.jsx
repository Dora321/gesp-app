
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CodeBlock from '../components/CodeBlock';

const Roadmap = () => {
    const [selectedLevel, setSelectedLevel] = useState(null);

    return (
        <div className="min-h-screen bg-gray-900 overflow-hidden relative pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-white mb-4">🗺️ 工程师闯关地图</h1>
                    <p className="text-gray-400">完成每一天的任务，解锁通往首席赛车工程师的道路。</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                    {levels.map((level, index) => (
                        <LevelCard
                            key={level.id}
                            level={level}
                            index={index}
                            onClick={() => setSelectedLevel(level)}
                        />
                    ))}
                </div>
            </div>

            {/* Modal for Level Details */}
            <AnimatePresence>
                {selectedLevel && (
                    <LevelModal level={selectedLevel} onClose={() => setSelectedLevel(null)} />
                )}
            </AnimatePresence>
        </div>
    );
};

const LevelCard = ({ level, index, onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={onClick}
            className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all hover:-translate-y-2 hover:shadow-2xl group ${level.status === 'locked'
                ? 'bg-gray-800/50 border-gray-700 opacity-60 grayscale'
                : 'bg-gray-800 border-cyan-500/30 hover:border-cyan-400'
                }`}
        >
            <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${level.status === 'locked' ? 'bg-gray-600' : 'bg-cyan-600'
                }`}>
                {level.id}
            </div>

            <div className="text-4xl mb-4">{level.icon}</div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {level.title}
            </h3>
            <p className="text-xs font-mono text-cyan-500 mb-2">{level.days}</p>
            <p className="text-gray-400 text-sm line-clamp-2">{level.desc}</p>

            {level.status === 'locked' && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40 rounded-2xl">
                    <span className="text-2xl">🔒</span>
                </div>
            )}
        </motion.div>
    );
};

const LevelModal = ({ level, onClose }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative bg-gray-800 w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-700 overflow-hidden"
            >
                <div className="bg-gradient-to-r from-cyan-900 to-blue-900 p-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <span className="text-4xl">{level.icon}</span>
                        {level.title}
                    </h2>
                    <p className="text-cyan-200 mt-2">{level.days} • 任务清单</p>
                </div>

                <div className="p-6 max-h-[60vh] overflow-y-auto">
                    {level.tasks.map((task, i) => (
                        <div key={i} className="mb-6 last:mb-0">
                            <h4 className="text-lg font-bold text-white mb-2">{task.name}</h4>
                            <ul className="space-y-2">
                                {task.items.map((item, j) => (
                                    <li key={j} className="flex items-start gap-2 text-gray-300 text-sm">
                                        <span className="text-cyan-500 mt-1">Example:</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}


                    {level.codeSnippets && (
                        <div className="mt-8 pt-6 border-t border-gray-700">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Code Snippets</h4>
                            {level.codeSnippets.map((snippet, i) => (
                                <CodeBlock key={i} title={snippet.title} code={snippet.code} />
                            ))}
                        </div>
                    )}

                    {level.downloads && (
                        <div className="mt-8 pt-6 border-t border-gray-700">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Downloads</h4>
                            <div className="flex flex-wrap gap-3">
                                {level.downloads.map((file, i) => (
                                    <button key={i} className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                                        📄 {file}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-gray-700 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                    >
                        关闭
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

const levels = [
    {
        id: 1,
        title: '机械觉醒',
        days: 'Day 1-3',
        icon: '🔩',
        desc: '开启工程大门，掌握工具使用，完成底盘与转向系统的核心组装。',
        status: 'unlocked',
        tasks: [
            { name: '任务', items: ['观看“卡丁车集锦视频”', '通过安全准入考试'] },
            { name: '图纸', items: ['下载转向系统三视图', '阿克曼转向几何图解'] }
        ],
        downloads: ['Tool_Safety_exam.pdf', 'Steering_System_Blueprint.pdf']
    },
    {
        id: 2,
        title: '动力注入',
        days: 'Day 4-5',
        icon: '⚡',
        desc: '揭秘电池与电机，亲手打造强劲的动力心脏，点亮能量之源。',
        status: 'unlocked',
        tasks: [
            { name: '知识库', items: ['锂电池 vs 铅酸电池对比图表'] },
            { name: '互动', items: ['虚拟电路连接小游戏'] }
        ],
        downloads: ['Motor_Wiring_Guide.pdf']
    },
    {
        id: 3,
        title: '智能大脑',
        days: 'Day 6-8',
        icon: '🧠',
        desc: 'Code is Power. 用代码赋予赛车灵魂，实现灯光秀与倒车雷达。',
        status: 'unlocked',
        tasks: [
            { name: 'Arduino 挑战', items: ['WS2812 呼吸灯编程', 'HC-SR04 超声波避障'] }
        ],
        codeSnippets: [
            {
                title: 'WS2812_Blink.ino',
                code: `#include <Adafruit_NeoPixel.h>
#define PIN 6
#define NUMPIXELS 12
Adafruit_NeoPixel pixels(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);

void setup() {
  pixels.begin();
}

void loop() {
  pixels.clear();
  for(int i=0; i<NUMPIXELS; i++) {
    pixels.setPixelColor(i, pixels.Color(0, 150, 0));
    pixels.show();
    delay(50);
  }
}`
            },
            {
                title: 'Ultrasonic_Radar.ino',
                code: `const int trigPin = 9;
const int echoPin = 10;
long duration;
int distance;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2;
  Serial.print("Distance: ");
  Serial.println(distance);
}`
            }
        ],
        downloads: ['WS2812_Blink.ino', 'Ultrasonic_Radar.ino']
    },
    {
        id: 4,
        title: '终极赛车',
        days: 'Day 9-10',
        icon: '🏆',
        desc: '赛道见真章。安全检查、路演答辩，然后拿下属于你的奖杯！',
        status: 'locked',
        tasks: [
            { name: '准备', items: ['赛前安全检查表', '路演PPT制作'] }
        ],
        downloads: ['Checklist.pdf', 'Pitch_Template.pptx']
    }
];

export default Roadmap;
