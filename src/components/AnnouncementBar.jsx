import React, { useState, useEffect } from 'react';
import { Megaphone, X, ArrowRight } from 'lucide-react';

const AnnouncementBar = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Announcement configuration
    const announcementId = 'announcement_2024_01'; // Update this ID to show a new announcement
    const message = '🎉 欢迎来到魔丸聚集地！全新的 Python 2048 趣味项目现已上线，快报名前往探索吧！';
    const linkText = '查看项目';
    const linkPath = '/python/a2';

    useEffect(() => {
        const hasBeenClosed = localStorage.getItem(`closed_${announcementId}`);
        if (!hasBeenClosed) {
            setIsVisible(true);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem(`closed_${announcementId}`, 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="relative isolate z-[100] flex items-center gap-x-6 overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-2.5 sm:px-3.5 sm:before:flex-1 shadow-2xl">
            <div
                className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                aria-hidden="true"
            >
                <div
                    className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                    style={{
                        clipPath:
                            'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
            <div
                className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                aria-hidden="true"
            >
                <div
                    className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                    style={{
                        clipPath:
                            'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="text-sm leading-6 text-white flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-yellow-300 animate-bounce" />
                    <strong className="font-semibold">{message}</strong>
                </p>
                <a
                    href={linkPath}
                    className="flex-none rounded-full bg-white/10 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-all flex items-center gap-1"
                >
                    {linkText} <ArrowRight className="w-4 h-4" />
                </a>
            </div>

            <div className="flex flex-1 justify-end">
                <button
                    type="button"
                    className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
                    onClick={handleClose}
                >
                    <span className="sr-only">关闭</span>
                    <X className="h-5 w-5 text-white hover:scale-125 transition-transform" aria-hidden="true" />
                </button>
            </div>
        </div>
    );
};

export default AnnouncementBar;
