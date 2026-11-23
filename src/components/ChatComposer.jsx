import { useEffect, useRef, useState } from 'react';
import { Paperclip, Send, Square, X } from 'lucide-react';
import {
    CHAT_IMAGE_FORMATS_LABEL,
    CHAT_IMAGE_INPUT_TYPES,
    CHAT_IMAGE_MAX_FILE_SIZE_MB,
    prepareChatImage,
} from '../utils/chatImages';
import ChatReasoningSelect from './ChatReasoningSelect';

export default function ChatComposer({
    inputRef, value, onChange, onSend, onStop, disabled, loading, placeholder,
    reasoningLevel, onReasoningChange, historyNearLimit, supportsImages, image, onImageChange,
}) {
    const fileInput = useRef(null);
    const mounted = useRef(false);
    const [imageStatus, setImageStatus] = useState('');
    const [preparing, setPreparing] = useState(false);

    useEffect(() => {
        mounted.current = true;
        return () => { mounted.current = false; };
    }, []);

    const attachImage = async file => {
        if (disabled || loading || preparing || !supportsImages || !file) return;
        setPreparing(true);
        setImageStatus('正在准备图片…');
        try {
            const prepared = await prepareChatImage(file);
            if (mounted.current) onImageChange(prepared);
            setImageStatus('');
        } catch (error) {
            setImageStatus(error.message);
        } finally {
            setPreparing(false);
        }
    };

    const cannotSend = disabled || preparing || (!supportsImages && Boolean(image)) || (!value.trim() && !image);

    return (
        <div className="shrink-0 border-t border-slate-200 bg-white px-2.5 py-2">
            <div className="mb-1.5 flex flex-wrap items-center justify-between gap-1.5">
                <div className="flex items-center gap-1.5">
                    <ChatReasoningSelect value={reasoningLevel} disabled={loading} onChange={onReasoningChange} />
                    {supportsImages && <button
                        type="button"
                        aria-label="添加图片"
                        title={`添加图片，支持 ${CHAT_IMAGE_FORMATS_LABEL}，单张不超过 ${CHAT_IMAGE_MAX_FILE_SIZE_MB} MB；也可直接粘贴截图`}
                        onClick={() => fileInput.current?.click()}
                        disabled={disabled || loading || preparing}
                        className="inline-flex h-8 items-center justify-center gap-1 rounded-lg border border-stone-300 px-2.5 text-xs font-medium text-stone-700 hover:bg-stone-100 disabled:opacity-40"
                    >
                        <Paperclip size={14} aria-hidden="true" />
                        <span>图片</span>
                    </button>}
                    <input ref={fileInput} type="file" accept={CHAT_IMAGE_INPUT_TYPES} hidden onChange={event => {
                        const file = event.target.files[0];
                        event.target.value = '';
                        attachImage(file);
                    }} />
                </div>
                {image && (
                    <div className="flex items-center gap-1">
                        <img src={image} alt="待发送的图片" className="h-8 max-w-16 rounded border border-stone-200 object-contain" />
                        <button type="button" aria-label="移除图片" disabled={preparing} onClick={() => { onImageChange(null); setImageStatus(''); }}
                            className="flex h-7 w-7 items-center justify-center rounded-md text-stone-700 hover:bg-stone-100">
                            <X size={14} aria-hidden="true" />
                        </button>
                    </div>
                )}
            </div>
            {(imageStatus || (image && !supportsImages)) && <p role="status" className="mb-1.5 text-xs text-amber-800">
                {image && !supportsImages ? '当前模型无法读取图片，请移除图片后再发送。' : imageStatus}
            </p>}
            {historyNearLimit && <p role="status" className="mb-1.5 rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] leading-4 text-amber-700">
                对话较长，仅附带最近几轮；建议点顶部「+」开启新对话。
            </p>}
            <div className="flex items-end gap-1.5">
                <textarea
                    ref={inputRef}
                    rows={1}
                    value={value}
                    onChange={event => onChange(event.target.value)}
                    onPaste={event => {
                        const file = Array.from(event.clipboardData.files).find(item => item.type.startsWith('image/'));
                        if (!file) return;
                        if (!supportsImages) {
                            setImageStatus('当前模型不支持图片，无法粘贴图片。');
                            return;
                        }
                        event.preventDefault();
                        attachImage(file);
                    }}
                    onKeyDown={event => {
                        if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
                            event.preventDefault();
                            if (!loading && !cannotSend) onSend();
                        }
                    }}
                    placeholder={placeholder}
                    disabled={disabled || loading}
                    aria-label="对话输入"
                    className="min-h-10 max-h-28 min-w-0 flex-1 resize-y rounded-xl border border-slate-300 px-3 py-2 text-sm leading-5 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-100"
                />
                <button
                    type="button"
                    onClick={loading ? onStop : onSend}
                    disabled={!loading && cannotSend}
                    className={`flex h-10 shrink-0 items-center gap-1 rounded-xl px-3.5 font-medium text-white transition-colors ${loading
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-indigo-600 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300'}`}
                    title={loading ? '停止生成' : '发送'}
                    aria-label={loading ? '停止生成' : '发送'}
                >
                    {loading ? <Square size={16} fill="currentColor" /> : <Send size={16} />}
                </button>
            </div>
        </div>
    );
}
