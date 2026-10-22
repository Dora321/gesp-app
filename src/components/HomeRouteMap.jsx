import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { paperStats } from '../data/gesp/_stats';
import { cppLevelCatalog } from '../data/cppLevelCatalog';
import { cppLessonIndex } from '../data/cppLessonIndex';
import { pythonFoundationLessons, pythonProjects } from '../data/pythonCourseCatalog';
import { arduinoLessons, contestLessons, foundationLessons, innovationLessons, scienceCourses } from '../data/innovationCourseCatalog';

// 首屏的「全站线路图」：每个学习体系是一条线，每一站都是真实入口。
// 站名、课数全部从课程目录读取，目录变了线路图跟着变，不手写数字。

const LEVEL_NAMES = '一二三四五六七八';

const countCppLessons = (level) => cppLessonIndex.filter((lesson) => lesson.level === level).length;

const pythonBridge = pythonFoundationLessons.find((lesson) => lesson.id === 'bridge');
const pythonUnits = pythonFoundationLessons.filter((lesson) => lesson !== pythonBridge);
const scienceLessonCount = foundationLessons.length + arduinoLessons.length + innovationLessons.length + contestLessons.length;

const LINES = [
    {
        id: 'cpp',
        badge: 'C++',
        title: 'C++ · GESP 一至八级',
        detail: `${cppLessonIndex.length} 节互动课`,
        stops: [
            ...cppLevelCatalog.map((level) => ({
                key: `level-${level.level}`,
                label: LEVEL_NAMES[level.level - 1],
                unit: '级',
                to: level.path,
                info: `${level.title} · ${countCppLessons(level.level)} 节课，进入等级页`,
            })),
            {
                key: 'bank',
                label: '真题',
                to: '/question-bank',
                interchange: true,
                info: `GESP 真题题库 · ${paperStats.paperCount} 套官方真题、${paperStats.questionCount} 道题`,
            },
        ],
    },
    {
        id: 'python',
        badge: 'Python',
        title: 'Python · 从入门到项目',
        detail: `${pythonUnits.length} 个基础单元 · ${pythonProjects.length} 个项目`,
        stops: [
            ...pythonUnits.map((lesson) => ({
                key: lesson.id,
                label: lesson.id.toUpperCase(),
                to: lesson.path,
                info: lesson.title,
            })),
            {
                key: pythonBridge.id,
                label: '综合',
                to: pythonBridge.path,
                info: `${pythonBridge.title} · 基础课收尾的${pythonBridge.catalogTitle}`,
            },
            {
                key: 'projects',
                label: '项目',
                to: pythonProjects[0].path,
                info: `Python 项目课 · ${pythonProjects.length} 个项目，从「${pythonProjects[0].title}」开始`,
            },
        ],
    },
    {
        id: 'maker',
        badge: '科创',
        title: '科创 · 电与磁到 ESP32',
        detail: `${scienceLessonCount} 节网页课件`,
        stops: [
            {
                key: 'foundation',
                label: '电与磁',
                to: scienceCourses.foundation.path,
                info: `${scienceCourses.foundation.title} · ${foundationLessons.length} 节探究课`,
            },
            {
                key: 'arduino',
                label: 'Arduino',
                to: scienceCourses.arduino.path,
                info: `${scienceCourses.arduino.title} · ${arduinoLessons.length} 节课`,
            },
            {
                key: 'advanced',
                label: 'ESP32',
                to: scienceCourses.advanced.path,
                info: `${scienceCourses.advanced.title} · ${innovationLessons.length} 节课`,
            },
            {
                key: 'contest',
                label: '竞赛',
                to: scienceCourses.contest.path,
                info: `${scienceCourses.contest.title} · ${contestLessons.length} 节选修课`,
            },
        ],
    },
];

// 所有线路共用同一组列，站点才能上下对齐；站少的线路均匀铺开。
const COLUMNS = Math.max(...LINES.map((line) => line.stops.length));

const placeStop = (index, total) => (
    total === COLUMNS ? index + 1 : 1 + Math.round((index * (COLUMNS - 1)) / (total - 1))
);

const DEFAULT_CAPTION = '点任意一站直接进入；C++ 线的终点是真题题库。';

export default function HomeRouteMap() {
    const [caption, setCaption] = useState(DEFAULT_CAPTION);
    const resetCaption = () => setCaption(DEFAULT_CAPTION);

    return (
        <nav id="home-route-map" className="home-map" aria-labelledby="home-map-title">
            <div className="home-map-head">
                <h2 id="home-map-title">全站线路图</h2>
                <span className="home-map-legend" aria-hidden="true">
                    <span><span className="mw-station" />课程入口</span>
                    <span><span className="mw-station mw-station--interchange" />题库入口</span>
                </span>
            </div>

            <ul className="home-map-lines" style={{ '--stops': COLUMNS }}>
                {LINES.map((line) => (
                    <li key={line.id} className={`home-map-line mw-line-${line.id}`}>
                        <div className="home-map-line-head">
                            <span className="mw-line-badge">{line.badge}</span>
                            <strong>{line.title}</strong>
                            <span>{line.detail}</span>
                        </div>
                        <ol className="home-map-track" aria-label={`${line.title}站点`}>
                            {line.stops.map((stop, index) => (
                                <li
                                    key={stop.key}
                                    className="home-map-stop"
                                    style={{ gridColumn: placeStop(index, line.stops.length) }}
                                >
                                    <Link
                                        to={stop.to}
                                        className="home-map-stop-link"
                                        onMouseEnter={() => setCaption(stop.info)}
                                        onMouseLeave={resetCaption}
                                        onFocus={() => setCaption(stop.info)}
                                        onBlur={resetCaption}
                                    >
                                        <span
                                            className={`mw-station${stop.interchange ? ' mw-station--interchange' : ''}`}
                                            aria-hidden="true"
                                        />
                                        <span className="home-map-stop-label">
                                            {stop.label}
                                            {stop.unit && <span className="home-map-stop-unit">{stop.unit}</span>}
                                        </span>
                                        <span className="mw-sr-only">：{stop.info}</span>
                                    </Link>
                                </li>
                            ))}
                        </ol>
                    </li>
                ))}
            </ul>

            <p className="home-map-caption" aria-hidden="true">{caption}</p>
        </nav>
    );
}
