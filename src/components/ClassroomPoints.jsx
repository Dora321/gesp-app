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
                className="fixed bottom-4 left-4 z-30 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 group sm:bottom-24 sm:left-6 sm:w-14 sm:h-14"
                aria-label="打开课堂积分榜"
                title="打开课堂积分榜"
            >
                <Trophy size={22} className="group-hover:rotate-12 transition-transform sm:size-6" />
                {studentCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
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
