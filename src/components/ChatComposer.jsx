import { useEffect, useRef, useState } from 'react';
import { Paperclip, Send, Square, X } from 'lucide-react';
import { CHAT_IMAGE_INPUT_TYPES, prepareChatImage } from '../utils/chatImages';
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
        <div className="shrink-0 border-t border-slate-200 bg-white p-3">
            <div className="flex flex-wrap items-start gap-2">
                <ChatReasoningSelect value={reasoningLevel} disabled={loading} onChange={onReasoningChange} />
                {supportsImages && <button
                    type="button"
                    aria-label="添加图片"
                    title="添加图片，也可直接粘贴截图"
                    onClick={() => fileInput.current?.click()}
                    disabled={disabled || loading || preparing}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 disabled:opacity-40"
                ><Paperclip size={17} aria-hidden="true" /></button>}
                <input ref={fileInput} type="file" accept={CHAT_IMAGE_INPUT_TYPES} hidden onChange={event => {
                    const file = event.target.files[0];
                    event.target.value = '';
                    attachImage(file);
                }} />
            </div>
            {image && (
                <div className="mb-2 flex items-center gap-2">
                    <img src={image} alt="待发送的图片" className="max-h-16 max-w-28 rounded border border-stone-200 object-contain" />
                    <button type="button" aria-label="移除图片" disabled={preparing} onClick={() => { onImageChange(null); setImageStatus(''); }}
                        className="flex h-11 w-11 items-center justify-center rounded-lg text-stone-700 hover:bg-stone-100">
                        <X size={16} aria-hidden="true" />
                    </button>
                </div>
            )}
            {(imageStatus || (image && !supportsImages)) && <p role="status" className="mb-2 text-xs text-amber-800">
                {image && !supportsImages ? '当前模型无法读取图片，请移除图片后再发送。' : imageStatus}
            </p>}
            {historyNearLimit && <p role="status" className="mb-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-700">
                对话已经比较长，发送时只会带上最近几轮。建议点左上角「新对话」再问，回答更稳、也更省额度。
            </p>}
            <div className="flex items-end gap-2">
                <textarea
                    ref={inputRef}
                    rows={2}
                    value={value}
                    onChange={event => onChange(event.target.value)}
                    onPaste={event => {
                        const file = Array.from(event.clipboardData.files).find(item => item.type.startsWith('image/'));
                        if (!file || !supportsImages) return;
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
                    className="min-h-11 max-h-36 min-w-0 flex-1 resize-y rounded-xl border border-slate-300 px-4 py-2.5 text-sm leading-6 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-100"
                />
                <button
                    type="button"
                    onClick={loading ? onStop : onSend}
                    disabled={!loading && cannotSend}
                    className={`flex min-h-11 shrink-0 items-center gap-1 rounded-xl px-4 py-2.5 font-medium text-white transition-colors ${loading
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-indigo-600 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300'}`}
                    title={loading ? '停止生成' : '发送'}
                    aria-label={loading ? '停止生成' : '发送'}
                >
                    {loading ? <Square size={18} fill="currentColor" /> : <Send size={18} />}
                </button>
            </div>
        </div>
    );
}
