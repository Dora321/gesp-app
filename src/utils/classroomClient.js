import { assistantStorage } from './classroomAssistant';

const gateways = (import.meta.env.VITE_CLASSROOM_API_URL || '')
    .split(',')
    .map(url => url.trim().replace(/\/$/, ''))
    .filter(Boolean);
let activeGateway = gateways[0] || '';
const tokenKey = 'classroom_session_token';
const conversationKey = 'ai_conversation_id';
let conversationId = assistantStorage.get('sessionStorage', conversationKey);
let sessionToken = '';
try { sessionToken = activeGateway ? sessionStorage.getItem(tokenKey) || '' : ''; } catch { /* Memory-only fallback. */ }

export function classroomConversationId(reset = false) {
    if (reset || !conversationId) {
        conversationId = crypto.randomUUID();
        assistantStorage.set('sessionStorage', conversationKey, conversationId);
    }
    return conversationId;
}

export async function classroomFetch(path, options = {}) {
    const buildInit = (gateway) => ({
        ...options,
        credentials: gateway ? 'omit' : 'same-origin',
        headers: { ...options.headers, ...(gateway && sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {}) },
    });

    if (gateways.length <= 1) {
        return fetch(`${activeGateway}${path}`, buildInit(activeGateway));
    }

    const candidates = [activeGateway, ...gateways.filter(g => g !== activeGateway)];
    let lastError;
    let lastResponse;
    for (const candidate of candidates) {
        try {
            const response = await fetch(`${candidate}${path}`, buildInit(candidate));
            if (response.status >= 502 && response.status <= 504 && candidate !== candidates.at(-1)) {
                lastResponse = response;
                continue;
            }
            activeGateway = candidate;
            return response;
        } catch (err) {
            lastError = err;
            if (options.signal?.aborted) throw err;
        }
    }
    if (lastResponse) return lastResponse;
    throw lastError;
}

export async function classroomRequest(path, data) {
    const response = await classroomFetch(path, {
        ...(data === undefined ? {} : { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }),
    });
    const result = await response.json().catch(() => { throw new Error('课堂服务未启动，请联系老师。'); });
    if (!response.ok) throw Object.assign(new Error(result.message || '课堂服务暂时不可用。'), { status: response.status });
    if (activeGateway && (result.token || path === '/api/logout')) {
        sessionToken = result.token || '';
        try { if (sessionToken) sessionStorage.setItem(tokenKey, sessionToken); else sessionStorage.removeItem(tokenKey); } catch { /* Keep in memory. */ }
        delete result.token;
    }
    return result;
}
