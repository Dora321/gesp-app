import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
const stages = [
  { title: '机械基础', prerequisite: '认识工具与材料，能画出结构草图。', task: '描述底盘各部件的作用，记录装配检查结果。', path: '/innovation-foundation', link: '初阶科创课程' },
  { title: '电力驱动', prerequisite: '理解电路、供电与电机的基本作用。', task: '在教师指导下辨认现有设备的供电、控制与执行部件，绘制系统关系图。', path: '/hardware/arduino', link: 'Arduino 电子基础' },
  { title: '电子控制', prerequisite: '会使用变量、条件、循环，理解输入与输出。', task: '先在课堂实验板上验证输入与输出逻辑，再记录测试结果。', path: '/hardware/esp32-curriculum', link: 'ESP32 项目课' },
  { title: '遥测数据', prerequisite: '会记录传感器读数，并区分测量值和估计值。', task: '记录一组数据，注明单位、采样条件和异常读数。', path: '/python/f3', link: '列表与字典' },
  { title: '辅助驾驶探索', prerequisite: '能够解释控制程序的状态与边界，已完成基础测试。', task: '先用模型或模拟情境分析感知与决策，整理误判案例。', path: '/python/ai', link: 'AI 入门项目' },
];
export default function Roadmap() {
  return <div className="mw-lab-page">
    <header><p className="mw-engineering-eyebrow">工程实践 / 阶段指南</p><h1>学习地图</h1><p>按已有基础选择起点。下面是项目准备与产出建议，不代表你已经完成这些阶段；整车实践由教师安排。</p></header>
    <ol className="mw-lab-stages">{stages.map((stage, index) => <li className="mw-lab-card" key={stage.title}>
      <span className="mw-lab-step">阶段 {index + 1}</span><h2>{stage.title}</h2><p><strong>开始前：</strong>{stage.prerequisite}</p><p><strong>这一阶段留下：</strong>{stage.task}</p>
      <Link className="mw-lab-action" to={stage.path}>{stage.link}<ArrowRight size={18} aria-hidden="true" /></Link>
    </li>)}</ol>
    <Link className="mw-lab-action" to="/ekart/toolbox">下载项目记录单<ArrowRight size={18} /></Link>
  </div>;
}
