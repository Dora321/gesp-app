import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

// Tailwind 需要静态类名，按级别主题色写全量字符串
const tones = {
    blue: {
        icon: 'text-blue-500',
        badge: 'bg-blue-500',
        hover: 'hover:border-blue-300 hover:bg-blue-50',
        text: 'group-hover:text-blue-700',
    },
    purple: {
        icon: 'text-purple-500',
        badge: 'bg-purple-500',
        hover: 'hover:border-purple-300 hover:bg-purple-50',
        text: 'group-hover:text-purple-700',
    },
    rose: {
        icon: 'text-rose-500',
        badge: 'bg-rose-500',
        hover: 'hover:border-rose-300 hover:bg-rose-50',
        text: 'group-hover:text-rose-700',
    },
    indigo: {
        icon: 'text-indigo-500',
        badge: 'bg-indigo-500',
        hover: 'hover:border-indigo-300 hover:bg-indigo-50',
        text: 'group-hover:text-indigo-700',
    },
    emerald: {
        icon: 'text-emerald-500',
        badge: 'bg-emerald-500',
        hover: 'hover:border-emerald-300 hover:bg-emerald-50',
        text: 'group-hover:text-emerald-700',
    },
    orange: {
        icon: 'text-orange-500',
        badge: 'bg-orange-500',
        hover: 'hover:border-orange-300 hover:bg-orange-50',
        text: 'group-hover:text-orange-700',
    },
};

export default function CppLessonDirectory({ level, lessons, accent = 'indigo', subtitle }) {
    const tone = tones[accent] || tones.indigo;

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <BookOpen className={tone.icon} /> 系统课程（{lessons.length} 课）
                </h3>
                {subtitle && <span className="text-xs text-slate-500">{subtitle}</span>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {lessons.map((lesson) => (
                    <Link
                        key={lesson.id}
                        to={`/lesson/${level}/${lesson.id}`}
                        className={`group flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 hover:shadow-sm transition-all ${tone.hover}`}
                    >
                        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-bold text-white ${tone.badge}`}>
                            {lesson.id}
                        </span>
                        <span className={`text-sm font-medium text-slate-700 ${tone.text}`}>
                            {lesson.title.replace(/^第 \d+ 课：/, '')}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
