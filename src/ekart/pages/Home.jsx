import { Link } from 'react-router-dom';
import { ArrowRight, Battery, Code2, Cpu, Gauge, Map, Wrench, Images, ClipboardList } from 'lucide-react';

const modules = [
    { title: '机械结构', Icon: Wrench, description: '认识材料与工具，从底盘结构、装配到机械传动，理解车辆怎样承载和运动。', outcome: '搭建与检查底盘' },
    { title: '电子电路', Icon: Battery, description: '沿着电能的路径理解电池、控制器与电机，学习接线、供电和系统检查。', outcome: '连接与验证动力系统' },
    { title: '嵌入式编程', Icon: Code2, description: '用 ESP32 读取输入、控制电机，再把速度、电压等信息带到仪表盘。', outcome: '编写与调试控制程序' },
];
const stages = ['机械基础', '电力驱动', '电子控制', '遥测数据', '辅助驾驶'];
const entries = [
    { path: '/ekart/toolbox', title: '工具箱', text: '查找搭建和调试时需要的工具与资料。', Icon: Wrench },
    { path: '/ekart/gallery', title: '作品展厅', text: '查看项目作品，观察结构和实现思路。', Icon: Images },
    { path: '/ekart/parent-portal', title: '学习记录', text: '回看学习过程、项目进度与实践成果。', Icon: ClipboardList },
];

export default function EkartHome() {
    return (
        <div className="mw-ekart-home">
            <section className="mw-engineering-hero" aria-labelledby="ekart-title">
                <div>
                    <p className="mw-engineering-eyebrow"><Cpu size={18} />科创线路 · 工程实践</p>
                    <h1 id="ekart-title">从一个零件，<br />到一辆电动卡丁车。</h1>
                    <p className="mw-engineering-intro">E-Kart 工程实践课，把机械、电路与编程放进同一个项目。亲手搭建、测试和改进，让每一项知识都能在作品中找到位置。</p>
                    <div className="mw-engineering-actions">
                        <Link to="/ekart/roadmap" className="mw-engineering-primary">查看学习地图<ArrowRight size={18} /></Link>
                        <Link to="/ekart/gallery" className="mw-engineering-secondary">浏览项目作品<Images size={18} /></Link>
                    </div>
                    <p className="mw-engineering-note">机械结构 / 电子电路 / 嵌入式编程</p>
                </div>
                <figure className="mw-system-map">
                    <figcaption><span>项目拆解</span><strong>一辆车里的三个系统</strong></figcaption>
                    <div className="mw-system-row"><Battery size={24} /><div><strong>电池与供电</strong><span>提供电能，检查连接</span></div><span className="mw-system-number">01</span></div>
                    <div className="mw-system-connection" aria-hidden="true">↓ 电能</div>
                    <div className="mw-system-row"><Cpu size={24} /><div><strong>控制器与程序</strong><span>读取输入，控制输出</span></div><span className="mw-system-number">02</span></div>
                    <div className="mw-system-connection" aria-hidden="true">↓ 控制信号</div>
                    <div className="mw-system-row"><Gauge size={24} /><div><strong>电机与传动</strong><span>把指令变成车辆运动</span></div><span className="mw-system-number">03</span></div>
                    <p>学习示意：从能量与信号的流动理解整车。</p>
                </figure>
            </section>

            <section className="mw-engineering-section" aria-labelledby="ekart-modules">
                <div className="mw-engineering-section-heading"><span>01 / 课程内容</span><h2 id="ekart-modules">三门学科，一起解决真实问题</h2></div>
                <div className="mw-engineering-modules">
                    {modules.map(({ title, Icon, description, outcome }, index) => (
                        <article key={title}>
                            <div className="mw-engineering-module-label"><Icon size={24} /><span>0{index + 1}</span></div>
                            <h3>{title}</h3><p>{description}</p><footer>{outcome}</footer>
                        </article>
                    ))}
                </div>
            </section>

            <section className="mw-engineering-section" aria-labelledby="ekart-path">
                <div className="mw-engineering-section-heading"><span>02 / 学习顺序</span><h2 id="ekart-path">每一步，都让作品更完整</h2></div>
                <ol className="mw-engineering-stations">{stages.map((stage, index) => <li key={stage}><span>{index + 1}</span><strong>{stage}</strong></li>)}</ol>
                <Link to="/ekart/roadmap" className="mw-engineering-text-link"><Map size={18} />查看各阶段任务<ArrowRight size={18} /></Link>
            </section>

            <nav className="mw-engineering-resources" aria-label="工程实践资源">
                {entries.map(({ path, title, text, Icon }) => <Link key={path} to={path}><Icon size={22} /><div><h2>{title}</h2><p>{text}</p></div><ArrowRight size={18} /></Link>)}
            </nav>
        </div>
    );
}
