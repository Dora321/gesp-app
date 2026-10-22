import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { paperStats } from '../data/gesp/_stats';
import { cppLessonIndex } from '../data/cppLessonIndex';
import { usePrefersReducedMotion } from '../hooks/useShouldRunDecorativeMotion';
import HomeRouteMap from './HomeRouteMap';

// 首屏只做两件事：说清这里有什么，给出全站线路图让人直接上车。
// 不放假的代码运行器和浮动小标签——站内没有在线执行代码的能力，就不演示。

export default function HeroSection() {
    const prefersReducedMotion = usePrefersReducedMotion();
    const scrollToLearningPaths = () => document.getElementById('learning-paths')?.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });

    return (
        <section className="home-hero" aria-labelledby="home-title">
            <div className="home-container home-hero-grid">
                <div className="home-hero-copy">
                    <p className="mw-kicker">青少年编程与科创学习站</p>
                    <h1 id="home-title">
                        编程与科创，
                        <br />
                        一站一站学明白
                    </h1>
                    {/* JSX 会把行尾换行变成空格，中文句子只在本来就有空格的地方（英文词前后）换行 */}
                    <p className="home-hero-lead">
                        这里有 GESP C++ 一到八级的 {cppLessonIndex.length} 节互动课、Python
                        入门与项目课、电与磁和 ESP32 科创实验课，还收录了 {paperStats.paperCount} 套 GESP
                        官方真题。
                        <span className="home-hero-lead-more">先找到适合自己的线路，再一站一站往前走。</span>
                    </p>
                    <div className="home-hero-actions">
                        <button
                            type="button"
                            onClick={scrollToLearningPaths}
                            className="mw-button mw-button--primary"
                        >
                            帮我选起点
                            <ArrowDown size={18} aria-hidden="true" />
                        </button>
                        <Link to="/question-bank" className="mw-button mw-button--secondary">
                            进入真题题库
                            <ArrowRight size={18} aria-hidden="true" />
                        </Link>
                    </div>
                    <p className="home-hero-note">无需注册，打开就能学；学习进度保存在这台设备的浏览器里。</p>
                </div>
                <HomeRouteMap />
            </div>
        </section>
    );
}
