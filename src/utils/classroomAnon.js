import { assistantStorage } from './classroomAssistant.js';

export const ANON_ID_STORAGE_KEY = 'gesp_usage_anon_id';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
let memoryAnonId = '';

// 课堂模式专用的匿名浏览器代号。只保存在本机，不包含姓名或学号。
export function classroomAnonId() {
    const saved = assistantStorage.get('localStorage', ANON_ID_STORAGE_KEY);
    if (typeof saved === 'string' && UUID.test(saved)) {
        memoryAnonId = '';
        return saved;
    }
    const generated = crypto.randomUUID();
    if (assistantStorage.set('localStorage', ANON_ID_STORAGE_KEY, generated)) {
        memoryAnonId = '';
        return generated;
    }
    // localStorage 不可用时，同一页面生命周期内保持同一个代号。
    if (!memoryAnonId) memoryAnonId = generated;
    return memoryAnonId;
}
