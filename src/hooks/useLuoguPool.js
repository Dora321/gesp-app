import { useCallback, useEffect, useState } from 'react';
import { fetchLuoguPool } from '../data/gesp/codingQuestions';

/**
 * 按需加载某等级的洛谷题池（考试模式与解析模式共用）。
 * 返回 { status: 'ready' | 'loading' | 'error', pool, retry }。
 * needed 为 false（卷文件已内嵌 26/27 题）时直接 ready，不发请求。
 * 页面应在 loading 时等待、error 时明确提示，避免题数从 25 跳到 27
 * 或者失败后静默留下「题面暂缺」的占位题。
 */
// 稳定引用：下游 useMemo 依赖 pool，不该因为每次渲染返回新的 [] 而重算。
const EMPTY_POOL = Object.freeze([]);

export default function useLuoguPool(level, needed) {
    const [attempt, setAttempt] = useState(0);
    const [result, setResult] = useState({ key: null, pool: EMPTY_POOL, error: false });
    const requestKey = needed && level != null ? `${level}#${attempt}` : null;

    useEffect(() => {
        if (!requestKey) return undefined;
        let cancelled = false;
        fetchLuoguPool(level).then(
            (pool) => { if (!cancelled) setResult({ key: requestKey, pool, error: false }); },
            () => { if (!cancelled) setResult({ key: requestKey, pool: EMPTY_POOL, error: true }); },
        );
        return () => { cancelled = true; };
    }, [requestKey, level]);

    const retry = useCallback(() => setAttempt((value) => value + 1), []);

    if (!requestKey) return { status: 'ready', pool: EMPTY_POOL, retry };
    if (result.key !== requestKey) return { status: 'loading', pool: EMPTY_POOL, retry };
    return { status: result.error ? 'error' : 'ready', pool: result.pool, retry };
}
