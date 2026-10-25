import { Link } from 'react-router-dom';
import { Images, ArrowRight, Download } from 'lucide-react';

export default function Gallery() {
  return <div className="mw-lab-page">
    <header><p className="mw-engineering-eyebrow">工程实践 / 成果</p><h1>作品展厅</h1><p>用真实的设计过程、测试数据和改进记录，讲清楚一个作品。</p></header>
    <section className="mw-lab-card mw-lab-empty" aria-labelledby="gallery-empty">
      <Images size={36} aria-hidden="true" /><h2 id="gallery-empty">还没有发布的学生作品</h2><p>作品经作者授权并核实资料后，再由教师整理发布。这里暂不展示示意图片或虚构的性能数据。</p>
      <div className="mw-lab-links"><a href={import.meta.env.BASE_URL + 'resources/ekart/portfolio-checklist.md'} download><Download size={18} />下载作品整理清单</a><Link to="/ekart/roadmap">查看学习地图<ArrowRight size={18} /></Link></div>
    </section>
    <section className="mw-lab-grid" aria-label="作品需要哪些材料">
      {[['设计过程', '说明要解决的问题、用到的材料和选择这个方案的理由。'], ['测试证据', '写明测试条件、实际结果和测量方法；没有测过的数据不填写。'], ['改进记录', '保存失败尝试、修改前后的差别，以及你自己完成的部分。']].map(([title, text]) => <article className="mw-lab-card" key={title}><h2>{title}</h2><p>{text}</p></article>)}
    </section>
  </div>;
}
