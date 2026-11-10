// 考试计时的纯函数。权威时间是截止时间戳 endsAt（毫秒），显示值每次都用
// Date.now() 现算：后台标签页里的 setInterval 会被浏览器节流，逐秒递减会让
// 考试时钟越走越慢；时间戳不受影响。

export const DEFAULT_TIME_LIMIT_SECONDS = 90 * 60;

/** 卷面 timeLimit（秒）；缺失或非法时退回默认值。 */
export function resolveTimeLimitSeconds(paper) {
    const value = Number(paper?.timeLimit);
    return Number.isFinite(value) && value > 0 ? Math.round(value) : DEFAULT_TIME_LIMIT_SECONDS;
}

/** 剩余整秒数（向上取整，不小于 0）。 */
export function remainingSeconds(endsAt, now = Date.now()) {
    if (!Number.isFinite(endsAt)) return 0;
    return Math.max(0, Math.ceil((endsAt - now) / 1000));
}

/** 已用秒数，夹在 [0, timeLimit] 之间。 */
export function elapsedSeconds(endsAt, timeLimitSeconds, now = Date.now()) {
    return Math.min(timeLimitSeconds, Math.max(0, timeLimitSeconds - remainingSeconds(endsAt, now)));
}

/**
 * 从存档恢复截止时间。
 * - 新存档带 endsAt：原样使用。
 * - 旧存档只有 timeLeft（旧版本逐秒递减，页面关掉时钟就停）：按「保存时剩余的秒数」
 *   从现在重新起算，即 endsAt = now + timeLeft，与旧版本恢复后看到的剩余时间完全一致。
 * - 什么都没有：按整卷时长新开。
 */
export function resolveEndsAt(progress, timeLimitSeconds, now = Date.now()) {
    if (Number.isFinite(progress?.endsAt)) return progress.endsAt;
    if (Number.isFinite(progress?.timeLeft)) {
        const left = Math.min(Math.max(0, progress.timeLeft), timeLimitSeconds);
        return now + left * 1000;
    }
    return now + timeLimitSeconds * 1000;
}

/** 存档里还剩多少秒（给「继续上次练习」卡片显示用）。 */
export function progressRemainingSeconds(progress, timeLimitSeconds, now = Date.now()) {
    return remainingSeconds(resolveEndsAt(progress, timeLimitSeconds, now), now);
}

export function formatClock(seconds) {
    const safe = Math.max(0, Math.floor(seconds || 0));
    const m = Math.floor(safe / 60);
    const s = safe % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

/** 「90分钟」「120分钟」这类文案，直接从卷面 timeLimit（秒）换算。 */
export function formatTimeLimitMinutes(seconds) {
    const value = Number(seconds);
    const safe = Number.isFinite(value) && value > 0 ? value : DEFAULT_TIME_LIMIT_SECONDS;
    return `${Math.round(safe / 60)}分钟`;
}
