import React, { Suspense, lazy, useState } from 'react';
import { Trophy } from 'lucide-react';

const ClassroomPointsPanel = lazy(() => import('./ClassroomPointsPanel'));

const getStudentCount = () => {
    try {
        return JSON.parse(localStorage.getItem('classroom_students') || '[]').length;
    } catch {
        return 0;
    }
};

const PanelFallback = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl shadow-2xl px-6 py-4 flex items-center gap-3 text-slate-500">
            <span className="w-4 h-4 border-2 border-slate-300 border-t-indigo-600 rounded-full animate-spin" />
            正在加载积分榜…
        </div>
    </div>
);

const ClassroomPoints = () => {
    const [isOpen, setIsOpen] = useState(false);
    const studentCount = isOpen ? 0 : getStudentCount();

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 left-6 z-[100] w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 hover:bg-indigo-700 transition-all duration-300 group"
                aria-label="打开课堂积分榜"
                title="打开课堂积分榜"
            >
                <Trophy size={24} className="group-hover:rotate-12 transition-transform" />
                {studentCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-slate-900">
                        {studentCount}
                    </span>
                )}
            </button>
        );
    }

    return (
        <Suspense fallback={<PanelFallback />}>
            <ClassroomPointsPanel onClose={() => setIsOpen(false)} />
        </Suspense>
    );
};

export default ClassroomPoints;
