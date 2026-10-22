import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getCppLevelCatalogItem } from '../data/cppLevelCatalog';
import { pythonFoundationLessons, pythonProjects } from '../data/pythonCourseCatalog';
import { cppLessonIndex } from '../data/cppLessonIndex';
import { foundationLessons } from '../data/innovationCourseCatalog';

const cppStart = getCppLevelCatalogItem(1);

// 每条路径归属一条线路（line），颜色、站点样式都从线路取，见 docs/site-design-language.md。
const paths = [
    {
        id: 'gesp',
        line: 'cpp',
        lineCode: 'C++',
        title: 'C++ · 算法进阶',
        badge: '考级成长',
        route: cppStart.path,
        audience: '有明确考级目标，想系统提升编程能力',
        description: '从基础语法到算法思维，每一步都有互动课和练习相伴。',
        steps: ['语法入门', '算法进阶', 'GESP 检验'],
        meta: `${cppLessonIndex.length} 节互动课 · GESP 1–8 级`,
        cta: '开启 C++ 学习',
    },
    {
        id: 'python',
        line: 'python',
        lineCode: 'Python',
        title: 'Python · 趣味入门',
        badge: '零基础友好',
        route: pythonFoundationLessons[0].path,
        audience: '第一次接触代码，想从兴趣开始',
        description: '用简洁的代码画图、做游戏，在看得见的变化中理解编程。',
        steps: ['认识代码', '逻辑与循环', '综合小程序'],
        meta: `${pythonFoundationLessons.length} 个基础单元 · 循序渐进`,
        cta: '写下第一行代码',
    },
    {
        id: 'project',
        line: 'python',
        lineCode: 'Python',
        title: '项目 · 创作工坊',
        badge: '学以致用',
        route: pythonProjects[0].path,
        audience: '掌握基础语法，想把知识变成作品',
        description: '探索游戏、密码与 AI，把一个个灵感做成可以展示的项目。',
        steps: ['拆解问题', '动手实现', '完善作品'],
        meta: `${pythonProjects.length} 个项目单元 · 实践驱动`,
        cta: '进入项目工坊',
    },
    {
        id: 'science',
        line: 'maker',
        lineCode: '科创',
        title: '科创 · 探索实验室',
        badge: '动手探索',
        route: '/innovation-foundation',
        audience: '喜欢拆解、搭建，对真实世界充满好奇',
        description: '从电与磁的小实验出发，逐步探索 ESP32、传感器与智能硬件。',
        steps: ['电路启蒙', '硬件编程', '智能作品'],
        meta: `${foundationLessons.length} 节初阶实验课 · 衔接高阶科创`,
        cta: '开始科创探索',
    },
];

export default function LearningPaths() {
    return (
        <section id="learning-paths" className="home-section home-paths" aria-labelledby="home-paths-title">
            <div className="home-container">
                <div className="home-section-head">
                    <div>
                        <p className="mw-kicker">学习路径</p>
                        <h2 id="home-paths-title">先选一条线路</h2>
                        <p>按兴趣和目标挑起点。每条线都写清了适合谁、沿途学什么、学完去哪。</p>
                    </div>
                    <a href="#lesson-catalog" className="mw-text-link">
                        浏览完整课程
                        <ArrowRight size={17} aria-hidden="true" />
                    </a>
                </div>

                <ul className="home-routes">
                    {paths.map((path) => (
                        <li key={path.id} className={`home-route mw-line-${path.line}`}>
                            <div className="home-route-name">
                                <div className="home-route-tags">
                                    <span className="mw-line-badge">{path.lineCode}</span>
                                    <span>{path.badge}</span>
                                </div>
                                <h3>
                                    <Link to={path.route} className="home-route-link">{path.title}</Link>
                                </h3>
                            </div>
                            <div className="home-route-body">
                                <p>{path.description}</p>
                                <p className="home-route-for">
                                    <span>适合</span>
                                    {path.audience}
                                </p>
                            </div>
                            <ol className="home-route-steps" aria-label={`${path.title}沿途三站`}>
                                {path.steps.map((step) => (
                                    <li key={step}>
                                        <span className="mw-station" aria-hidden="true" />
                                        {step}
                                    </li>
                                ))}
                            </ol>
                            <div className="home-route-go">
                                <p className="home-route-meta">{path.meta}</p>
                                {/* 整行由标题链接覆盖，这里只是视觉上的去向提示 */}
                                <span className="home-route-cta" aria-hidden="true">
                                    {path.cta}
                                    <ArrowRight size={16} />
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>

                <p className="home-paths-tip">
                    <strong>还没想好从哪里开始？</strong>
                    第一次接触编程，可以从 <Link to={pythonFoundationLessons[0].path}>Python 第一课</Link>
                    {' '}开始；喜欢动手，就试试 <Link to="/innovation-foundation">初阶科创</Link>。
                </p>
            </div>
        </section>
    );
}
