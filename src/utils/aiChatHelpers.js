/** Pure helpers for AI chat widget (history trim + error copy). */

/** 发给 API 的对话历史上限：最近若干条 + 字符预算（不含 system）。 */
export const MAX_HISTORY_MESSAGES = 16; // 约 8 轮问答
export const MAX_HISTORY_CHARS = 24000;
export const HISTORY_WARN_MESSAGES = 12;
export const HISTORY_WARN_CHARS = 18000;

export const estimateMessagesChars = (msgs) =>
    msgs.reduce((sum, message) => sum + (typeof message?.content === 'string' ? message.content.length : 0), 0);

export const truncateChatHistory = (msgs) => {
    let truncated = Array.isArray(msgs) ? [...msgs] : [];

    if (truncated.length > MAX_HISTORY_MESSAGES) {
        truncated = truncated.slice(-MAX_HISTORY_MESSAGES);
        const firstUser = truncated.findIndex((message) => message?.role === 'user');
        if (firstUser > 0) truncated = truncated.slice(firstUser);
    }

    let total = estimateMessagesChars(truncated);
    while (truncated.length > 2 && total > MAX_HISTORY_CHARS) {
        const removed = truncated.shift();
        total -= typeof removed?.content === 'string' ? removed.content.length : 0;
        if (truncated[0]?.role === 'assistant') {
            const dropped = truncated.shift();
            total -= typeof dropped?.content === 'string' ? dropped.content.length : 0;
        }
    }

    return truncated;
};

export const isHistoryNearLimit = (msgs) => {
    if (!Array.isArray(msgs) || msgs.length === 0) return false;
    return msgs.length >= HISTORY_WARN_MESSAGES || estimateMessagesChars(msgs) >= HISTORY_WARN_CHARS;
};

export const readErrorBodySnippet = async (response) => {
    try {
        const raw = await response.text();
        if (!raw) return '';
        try {
            const data = JSON.parse(raw);
            return data?.error?.message || data?.message || raw.slice(0, 160);
        } catch {
            return raw.slice(0, 160);
        }
    } catch {
        return '';
    }
};

export const mapHttpErrorMessage = async (response) => {
    const detail = await readErrorBodySnippet(response);
    const suffix = detail ? `（${detail}）` : '';
    switch (response.status) {
        case 401:
            return `密钥无效或已过期，请在设置里重新填写 API Key${suffix}`;
        case 402:
            return `账户余额不足，请到 DeepSeek 充值后再试${suffix}`;
        case 429:
            return `请求太频繁了，请稍等一会儿再试${suffix}`;
        case 500:
        case 502:
        case 503:
        case 504:
            return `DeepSeek 服务暂时异常，请稍后再试${suffix}`;
        default:
            return `请求失败（${response.status}），请稍后再试${suffix}`;
    }
};

export const mapCatchErrorMessage = (error) => {
    if (!error) return '出错了，请稍后再试。';
    if (error.name === 'AbortError') return null;
    const message = String(error.message || '');
    if (
        error.name === 'TypeError'
        || /Failed to fetch|NetworkError|network|Load failed|ERR_INTERNET/i.test(message)
    ) {
        return '网络不通，请检查网络连接后重试。';
    }
    // Already localized from mapHttpErrorMessage / explicit throws
    if (/密钥|余额|频繁|服务暂时|网络不通|请求失败|ReadableStream/.test(message)) {
        return message;
    }
    return `出错了：${message}`;
};
