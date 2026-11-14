const gateway = (import.meta.env.VITE_CLASSROOM_API_URL || '').replace(/\/$/, '');
const tokenKey = 'classroom_session_token';
let sessionToken = '';
try { sessionToken = gateway ? sessionStorage.getItem(tokenKey) || '' : ''; } catch { /* Memory-only fallback. */ }

export function classroomFetch(path, options = {}) {
    return fetch(`${gateway}${path}`, {
        ...options,
        credentials: gateway ? 'omit' : 'same-origin',
        headers: { ...options.headers, ...(gateway && sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {}) },
    });
}

export async function classroomRequest(path, data) {
    const response = await classroomFetch(path, {
        ...(data === undefined ? {} : { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }),
    });
    const result = await response.json().catch(() => { throw new Error('课堂服务未启动，请联系老师。'); });
    if (!response.ok) throw Object.assign(new Error(result.message || '课堂服务暂时不可用。'), { status: response.status });
    if (gateway && (result.token || path === '/api/logout')) {
        sessionToken = result.token || '';
        try { if (sessionToken) sessionStorage.setItem(tokenKey, sessionToken); else sessionStorage.removeItem(tokenKey); } catch { /* Keep in memory. */ }
        delete result.token;
    }
    return result;
}
