/**
 * 返回上一页；直接打开链接（站内历史 idx 为 0）时没有上一页，改去 fallback。
 * react-router v7 的 BrowserRouter 会把站内历史序号写进 window.history.state.idx，
 * 直接打开/刷新后的第一条记录是 0，站内跳转后 > 0。
 */
export function hasInAppHistory() {
    if (typeof window === 'undefined') return false;
    const idx = window.history.state?.idx;
    return Number.isInteger(idx) && idx > 0;
}

export function navigateBack(navigate, fallback) {
    if (hasInAppHistory()) {
        navigate(-1);
        return;
    }
    navigate(fallback, { replace: true });
}
