// ESP32 × AI 科创课程（第五版）——面向小学高年级的 35 课时体系。
//
// 内容整合自本地课件库「5.ESP32_Micropython项目(AI深度参与版)」：每课都有教案、
// 学生讲义、课堂 PPT 三件套，这里抽取的是学生讲义里的课程目标与起步代码——
// 也就是学生真正要动手做的那部分。
//
// 课程的主线不是 MicroPython 语法，而是 AI 角色的五段演进：
// 代码打印机 → 实习程序员 → 工具箱 → 协作伙伴 → 系统部件。
// 改动课号或阶段划分时，要同时检查相邻课的前后引用。

import { stage1Lessons } from './esp32/stage1.js';
import { stage2Lessons } from './esp32/stage2.js';
import { stage3Lessons } from './esp32/stage3.js';
import { stage4Lessons } from './esp32/stage4.js';
import { stage5Lessons } from './esp32/stage5.js';

export const esp32Stages = [
 {
 id: 1,
 title: '读懂 AI',
 color: 'emerald',
 aiRole: 'AI 是「代码打印机」',
 description: '学生只读代码不写代码，先建立「能看懂、能判断」的底气。',
 drivingQuestion: 'AI 写出来的代码，我们能不能相信？',
 lessonRange: 'L1–L5',
 lessonCount: 5,
 },
 {
 id: 2,
 title: '指挥 AI',
 color: 'blue',
 aiRole: 'AI 是「实习程序员」',
 description: '用提问五要素（语言 / 硬件 / 引脚 / 效果 / 约束）把需求说清楚。',
 drivingQuestion: '怎么让 AI 写出我真正想要的代码？',
 lessonRange: 'L6–L10',
 lessonCount: 5,
 },
 {
 id: 3,
 title: '超越 AI',
 color: 'violet',
 aiRole: 'AI 是「工具箱」',
 description: '从「完成老师的题」转向「定义自己的问题」，做出属于自己的作品。',
 drivingQuestion: '我想解决的问题是什么？',
 lessonRange: 'L11–L16',
 lessonCount: 6,
 },
 {
 id: 4,
 title: '驾驭 AI · 物联网',
 color: 'amber',
 aiRole: 'AI 是「协作伙伴」',
 description: '作品第一次连上云：能连、能传、能控，还要能应对断网。',
 drivingQuestion: '作品离开这张桌子还能用吗？',
 lessonRange: 'L17–L27',
 lessonCount: 11,
 },
 {
 id: 5,
 title: '融合 AI',
 color: 'rose',
 aiRole: 'AI 是「系统部件」',
 description: '把语音、视觉这些 AI 能力装进自己的作品里。',
 drivingQuestion: 'AI 不只是帮我写代码，它能成为作品的一部分吗？',
 lessonRange: 'L28–L35',
 lessonCount: 8,
 },
];


export const esp32Lessons = [
    ...stage1Lessons,
    ...stage2Lessons,
    ...stage3Lessons,
    ...stage4Lessons,
    ...stage5Lessons,
];

const STAGE_BY_ID = new Map(esp32Stages.map((stage) => [stage.id, stage]));

export const getEsp32Stage = (stageId) => STAGE_BY_ID.get(Number(stageId)) || null;

export const getEsp32Lesson = (num) => esp32Lessons.find((lesson) => lesson.num === Number(num)) || null;

export const esp32LessonsByStage = (stageId) => esp32Lessons.filter((lesson) => lesson.stageId === Number(stageId));

/** 带可运行起步代码的课时——实操课，区别于选题、设计、发布这类纸面课。 */
export const esp32PracticalLessons = esp32Lessons.filter((lesson) => Boolean(lesson.starterCode));
