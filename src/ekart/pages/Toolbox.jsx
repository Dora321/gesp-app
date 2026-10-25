import { Link } from 'react-router-dom';
import { Download, BookOpen, ArrowRight } from 'lucide-react';

const resources = [
  { title: '项目记录单', file: 'project-notebook.md', description: '记录目标、结构草图、测试结果和改进过程。Markdown 文件，可用文本编辑器打开。' },
  { title: '作品整理清单', file: 'portfolio-checklist.md', description: '整理照片、程序、测试证据与个人贡献，准备一次有依据的作品展示。' },
];
export default function Toolbox() {
  return <div className="mw-lab-page">
    <header><p className="mw-engineering-eyebrow">工程实践 / 资料</p><h1>工具箱</h1><p>从记录一次测试开始，让每次搭建和调试都有迹可循。</p></header>
    <div className="mw-lab-grid">{resources.map(resource => <article className="mw-lab-card" key={resource.file}>
      <Download aria-hidden="true" /><h2>{resource.title}</h2><p>{resource.description}</p>
      <a className="mw-lab-action" href={import.meta.env.BASE_URL + 'resources/ekart/' + resource.file} download>下载{resource.title}<Download size={18} aria-hidden="true" /></a>
    </article>)}</div>
    <section className="mw-lab-card"><h2>先补齐基础，再开始搭建</h2><p>使用站内已有课程准备编程与电子基础。整车图纸、固件和接线方案尚未发布；应以教师确认的实际设备资料为准。</p>
      <div className="mw-lab-links"><Link to="/hardware/arduino"><BookOpen size={18} />Arduino 入门<ArrowRight size={18} /></Link><Link to="/hardware/esp32-curriculum">ESP32 项目课<ArrowRight size={18} /></Link><Link to="/python/bridge">Python 综合小程序<ArrowRight size={18} /></Link></div>
    </section>
  </div>;
}
