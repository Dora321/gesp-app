import React, { useEffect, useRef, useState } from 'react';
import { Clock } from 'lucide-react';
import { formatClock, remainingSeconds } from '../../utils/examTimer';

/**
 * 独立的倒计时显示。只有这个小组件每秒重渲染，题目区的 Markdown/KaTeX 不跟着刷新。
 * 显示值由 endsAt 与 Date.now() 现算；到 0 时调用一次 onExpire（自动交卷）。
 * frozenSeconds 不为空时（已交卷）只显示定格的剩余时间。
 */
const ExamTimer = ({ endsAt, frozenSeconds = null, onExpire }) => {
    const [now, setNow] = useState(() => Date.now());
    const onExpireRef = useRef(onExpire);
    const firedRef = useRef(false);

    useEffect(() => {
        onExpireRef.current = onExpire;
    }, [onExpire]);

    useEffect(() => {
        firedRef.current = false;
    }, [endsAt]);

    const running = frozenSeconds === null && Number.isFinite(endsAt);

    useEffect(() => {
        if (!running) return undefined;
        const tick = () => {
            const current = Date.now();
            setNow(current);
            if (!firedRef.current && remainingSeconds(endsAt, current) <= 0) {
                firedRef.current = true;
                onExpireRef.current?.();
            }
        };
        // 恢复的存档可能已经超时：下一拍就检查一次，不必等满 1 秒。
        const first = setTimeout(tick, 0);
        const timer = setInterval(tick, 1000);
        // 切回前台时立刻校准，不必等下一次（可能被节流的）interval。
        document.addEventListener('visibilitychange', tick);
        return () => {
            clearTimeout(first);
            clearInterval(timer);
            document.removeEventListener('visibilitychange', tick);
        };
    }, [running, endsAt]);

    const seconds = frozenSeconds !== null ? frozenSeconds : remainingSeconds(endsAt, now);
    const urgent = frozenSeconds === null && seconds < 300;

    return (
        <div
            className={`flex items-center gap-1 md:gap-2 font-mono text-base md:text-xl font-bold ${urgent ? 'text-red-500 animate-pulse' : 'text-slate-700'}`}
        >
            <Clock size={20} /> <span className="sr-only">剩余时间</span>{formatClock(seconds)}
        </div>
    );
};

export default ExamTimer;
