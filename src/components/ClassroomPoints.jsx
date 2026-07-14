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

const ClassroomPoints = ({ mobileDocked = false, mobileInline = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const studentCount = isOpen ? 0 : getStudentCount();

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className={`${mobileInline
                    ? 'relative flex h-11 w-11 items-center justify-center rounded-lg bg-amber-500 text-white shadow-sm'
                    : mobileDocked
                        ? 'relative flex h-11 w-11 items-center justify-center rounded-full bg-amber-500 text-white shadow-sm sm:fixed sm:bottom-56 sm:right-6 sm:z-30 sm:h-14 sm:w-14 sm:shadow-xl'
                        : 'fixed bottom-36 right-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-white shadow-xl sm:bottom-56 sm:right-6 sm:h-14 sm:w-14'
                    } group transition hover:scale-105 hover:bg-amber-600`}
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
