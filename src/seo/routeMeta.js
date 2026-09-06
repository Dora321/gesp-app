export const SITE_NAME = '魔丸聚集地';
export const SITE_ORIGIN = 'https://Dora321.github.io/gesp-app';
export const DEFAULT_DESCRIPTION = 'GESP C++/Python 历年真题题库、互动课程讲解、ESP32 硬件项目与内置 AI 编程助教。';

const LEVEL_FOCUS = {
  1: '输入输出、变量类型、运算与分支循环等入门语法',
  2: '循环嵌套、数学判断与过程模拟',
  3: '数组、字符串与基础算法',
  4: '指针、结构体、函数与排序递推',
  5: '链表、递归、素数筛与复杂度分析',
  6: '树与二叉树、栈队列、动态规划与图的遍历',
  7: '高级数据结构、图论算法与复杂度推导',
  8: '综合算法、面向对象与竞赛级问题建模',
};

export const routeMeta = (pathname) => {
  if (pathname === '/') return { title: 'GESP 编程备考与编程课堂', description: DEFAULT_DESCRIPTION };
  if (pathname === '/question-bank') return { title: 'GESP C++ 真题题库', description: '按等级和年份练习 GESP C++ 真题，支持考试模式、逐题解析和错题复盘。' };
  if (pathname === '/museum') return { title: '计算机博物馆', description: '通过互动展品认识计算机发展史、硬件组成和编程世界。' };
  // 内容全部来自本机学习记录，不进 sitemap；这里只是给标签页一个准确的标题。
  if (pathname === '/question-bank/review') return { title: '错题本与成绩历史', description: '回看历次交卷成绩、仍未订正的错题，以及按考点汇总的薄弱环节。' };

  let match = pathname.match(/^\/question-bank\/topics\/(\d+)$/);
  if (match) return { title: `GESP C++ ${match[1]}级考点练习`, description: `按知识点练习 GESP C++ ${match[1]}级题目，集中巩固薄弱环节。` };

  match = pathname.match(/^\/question-bank\/(\d+)\/((\d{4})-(\d{2})-l\d+)$/);
  if (match) {
    const level = Number(match[1]);
    // 93 张卷子曾经共用同一句描述，逐字重复只差年月——典型的重复内容信号。
    // 补上该等级的考查重点，让每一页至少说清自己考什么。
    const focus = LEVEL_FOCUS[level] || 'GESP C++ 考级';
    return {
      title: `${match[3]}年${Number(match[4])}月 GESP C++ ${match[1]}级真题`,
      description: `${match[3]}年${Number(match[4])}月 GESP C++ ${match[1]}级真题在线练习，考查${focus}。支持计时考试模式、逐题解析与错题复盘。`,
    };
  }

  match = pathname.match(/^\/lesson\/(\d+)\/(\d+)$/);
  if (match) return { title: `GESP C++ ${match[1]}级第${match[2]}课`, description: `GESP C++ ${match[1]}级互动课程第${match[2]}课。` };

  match = pathname.match(/^\/level(\d+)$/);
  if (match) return { title: `GESP C++ ${match[1]}级知识体系`, description: `系统学习 GESP C++ ${match[1]}级知识点、代码模板和实战方法。` };

  if (pathname.startsWith('/python/')) return { title: 'Python 互动编程课程', description: '面向青少年的 Python 基础、进阶与项目式互动课程。' };
  match = pathname.match(/^\/hardware\/esp32\/(\d+)$/);
  if (match) return { title: `ESP32 × AI 第 ${match[1]} 课`, description: `ESP32 × AI 科创课程第 ${match[1]} 课：自学模式给出目标、起步代码、操作要点与完成检查单；上课模式给出保底目标、课前准备与常见问题预案。` };
  if (pathname === '/hardware/esp32-curriculum') return { title: 'ESP32 × AI 科创课程 35 课时', description: '面向小学高年级的 ESP32 与 MicroPython 课程体系：五个阶段 35 课时，主线是学生与 AI 关系的演进，实操课均附可运行起步代码。' };
  if (pathname === '/hardware/esp32-map') return { title: 'ESP32 × AI 科创课程学习地图', description: '五阶段 35 课加 7 讲竞赛延伸的全程地图，每一课标注学习状态，可打印贴墙。' };
  if (pathname === '/hardware/esp32-contest') return { title: 'ESP32 科创竞赛延伸班', description: '选修 7 讲：不写代码，把做好的硬件作品整理成一句话课题、实验记录、数据图表、说明书展板与答辩问答共七样参赛材料。' };
  if (pathname.startsWith('/hardware')) return { title: 'ESP32 智能硬件实验室', description: '使用 ESP32 和 MicroPython 完成循序渐进的智能硬件项目。' };
  if (pathname.startsWith('/ekart')) return { title: 'E-Kart 智能车实验室', description: '智能车学习路线、工具箱、作品展示与家长学习报告。' };

  return { title: 'GESP 编程备考与编程课堂', description: DEFAULT_DESCRIPTION };
};

/**
 * 课名精修。96 节课如果共用同一套模板标题，对搜索引擎就是 96 个重复页面；
 * 但课名索引不该进首屏包，所以这里只接收已解析好的课程对象：
 * 运行时由 RouteSeo 动态 import 后调用，构建期由预渲染脚本静态调用。
 */
export const lessonRouteMeta = (level, lessonId, lesson) => (lesson ? {
  title: `${lesson.title} · GESP C++ ${level}级第${lessonId}课`,
  description: `GESP C++ ${level}级第 ${lessonId} 课「${lesson.title}」互动讲解：预测验证、动手练习与离开前的掌握自查。`,
} : null);

export const withSiteMeta = (meta, pathname) => ({
  ...meta,
  fullTitle: `${meta.title} | ${SITE_NAME}`,
  canonicalUrl: `${SITE_ORIGIN}${pathname === '/' ? '/' : pathname}`,
});

export const getRouteSeo = (pathname) => {
  return withSiteMeta(routeMeta(pathname), pathname);
};
