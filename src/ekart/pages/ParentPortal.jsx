import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LearningDataManager from '../../components/LearningDataManager';
import { LEARNING_DATA_EVENT, readLearningData } from '../../utils/learningData';
import { arduinoLessons, innovationLessons, foundationLessons, contestLessons } from '../../data/innovationCourseCatalog';

const courses = [...arduinoLessons, ...innovationLessons, ...foundationLessons, ...contestLessons];
export default function ParentPortal() {
  const [data, setData] = useState(readLearningData);
  useEffect(() => {
    const refresh = () => setData(readLearningData());
    window.addEventListener(LEARNING_DATA_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => { window.removeEventListener(LEARNING_DATA_EVENT, refresh); window.removeEventListener('storage', refresh); };
  }, []);
  const records = courses.filter(course => data.lessons[course.path]).map(course => ({ ...course, progress: data.lessons[course.path] }))
    .sort((a, b) => (b.progress.visitedAt || 0) - (a.progress.visitedAt || 0));
  return <div className="mw-lab-page">
    <header><p className="mw-engineering-eyebrow">工程实践 / 我的记录</p><h1>学习记录</h1><p>这里展示当前浏览器保存的科创课程记录。浏览记录不等于掌握情况，也不是出勤或教师评分。</p></header>
    <section className="mw-lab-card" aria-labelledby="lab-records"><h2 id="lab-records">科创课程 · 已浏览 {records.length} 课</h2>
      {records.length ? <ul className="mw-lab-records">{records.map(course => <li key={course.path}><Link to={course.path}>{course.title}</Link><span>{course.progress.status === 'mastered' ? '已过关' : '学习中'}{course.progress.visitedAt ? ' · ' + new Date(course.progress.visitedAt).toLocaleDateString('zh-CN') : ''}</span></li>)}</ul>
        : <div className="mw-lab-empty"><p>还没有科创课程记录。进入一节课学习后，再回这里查看。</p><Link className="mw-lab-action" to="/hardware">选择一节科创课</Link></div>}
    </section>
    <section className="mw-lab-card"><h2>E-Kart 实践记录</h2><p>整车项目目前使用记录单线下整理，尚未接入在线提交或教师评价。请下载记录单，随实际测试填写，再交给授课教师。</p><Link className="mw-lab-action" to="/ekart/toolbox">获取项目记录单</Link></section>
    <LearningDataManager />
  </div>;
}
