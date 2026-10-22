import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUp, Bot, Cpu, Landmark } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/useShouldRunDecorativeMotion';
import { arduinoLessons, innovationLessons, scienceCourses } from '../data/innovationCourseCatalog';

const items = [
    {
        title: '计算博物馆',
        desc: '从古代算法到人工智能，按年代浏览 100 件计算史展品。适合课前五分钟，也适合课后自己逛。',
        action: '进入博物馆',
        route: '/museum',
        icon: Landmark,
    },
    {
        title: scienceCourses.advanced.title,
        desc: `ESP32 与 MicroPython 网页课件，${innovationLessons.length} 节课分五个阶段：从点亮 LED 到联网和 AI 作品。`,
        action: '查看硬件课',
        route: '/hardware',
        icon: Cpu,
    },
    {
        title: 'Arduino 与 ESP32 硬件课',
        desc: `Arduino UNO 零基础课程已上线 ${arduinoLessons.length} 课，并可继续进入 ESP32 MicroPython 高阶科创。`,
        action: '查看 Arduino 课程',
        route: '/hardware/arduino',
        icon: Cpu,
    },
    {
        title: 'E-Kart Lab',
        desc: '智能小车项目站：路线图、工具箱、作品展，还有写给家长的说明页。',
        action: '进入项目站',
        route: '/ekart',
        icon: Bot,
    },
];

export default function ExploreMore() {
    const prefersReducedMotion = usePrefersReducedMotion();

    // 页面很长，读到最后可以一键回到首屏重新选线路（桌面端首屏右侧就是线路图）。
    const scrollToTarget = (target) => {
        document.getElementById(target)?.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
    };

    return (
        <section className="home-section home-explore" aria-labelledby="home-explore-title">
            <div className="home-container">
                <div className="home-section-head">
                    <div>
                        <p className="mw-kicker">探索内容</p>
                        <h2 id="home-explore-title">课后继续探索</h2>
                        <p>计算机文化、硬件实践和项目展示，适合课堂之外自己逛。</p>
                    </div>
                </div>

                <ul className="home-explore-list">
                    {items.map(({ title, desc, action, route, icon: Icon }) => (
                        <li key={route} className="home-explore-item">
                            <Icon size={24} aria-hidden="true" />
                            <h3>
                                <Link to={route} className="home-explore-link">{title}</Link>
                            </h3>
                            <p>{desc}</p>
                            <span className="home-explore-cta" aria-hidden="true">
                                {action}
                                <ArrowRight size={15} />
                            </span>
                        </li>
                    ))}
                </ul>

                <button
                    type="button"
                    onClick={() => scrollToTarget('home-title')}
                    className="mw-text-link home-explore-back"
                >
                    <ArrowUp size={16} aria-hidden="true" />
                    回到页首重新选线路
                </button>
            </div>
        </section>
    );
}
