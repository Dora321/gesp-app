import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Settings, Trash2, Loader2, Bot, User, Key, UserCircle2, Plus, GripHorizontal, BrainCircuit, Sparkles, Pencil, Save, Square } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { assistantStorage, loadAssistantKey, saveAssistantKey, buildClassroomPrompt } from '../utils/classroomAssistant';
import {
    truncateChatHistory,
    isHistoryNearLimit,
    mapHttpErrorMessage,
    mapCatchErrorMessage,
    AI_CHAT_SHEET_BREAKPOINT,
    sheetHeightPx,
    resolveSheetDragEnd,
    sheetBottomOffsetPx,
} from '../utils/aiChatHelpers';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AI_PERSONAS, AI_MODEL, API_KEY_STORAGE_KEY } from '../utils/aiChatConstants';
import { chatMarkdownComponents } from './AIChatMarkdown';

const AIChatWidget = ({ onClose }) => {
    const location = useLocation();
    const [keyStatus, setKeyStatus] = useState('');
    const [shareContext, setShareContext] = useState(true);
    const [apiKey, setApiKey] = useState('');
    const [tempApiKey, setTempApiKey] = useState('');
    const [showSettings, setShowSettings] = useState(false);
    const [messages, setMessages] = useState(() => {
        try {
            const stored = JSON.parse(assistantStorage.get('sessionStorage', 'ai_chat_messages') || '[]');
            return Array.isArray(stored) ? stored.filter(message => ['user', 'assistant'].includes(message?.role) && typeof message.content === 'string') : [];
        } catch { return []; }
    });
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPersona, setSelectedPersona] = useState(() => {
        const saved = assistantStorage.get('localStorage', 'ai_selected_persona_id');
        return saved === 'custom' || AI_PERSONAS.some(persona => persona.id === saved) ? saved : 'tutor';
    });
    const selectedModel = AI_MODEL.id;
    const [customPersona, setCustomPersona] = useState(null);
    const [editingCustomPersona, setEditingCustomPersona] = useState(null);
    const [size, setSize] = useState({ width: 360, height: 500 });
    const isResizing = useRef(false);
    const messagesContainerRef = useRef(null);
    const messagesEndRef = useRef(null);
    const shouldAutoScrollRef = useRef(true);
    const abortControllerRef = useRef(null);
    const inputRef = useRef(null);
    const [isSheet, setIsSheet] = useState(() => {
        if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
        return window.matchMedia(`(max-width: ${AI_CHAT_SHEET_BREAKPOINT - 1}px)`).matches;
    });
    const [sheetExpanded, setSheetExpanded] = useState(false);
    const [dragHeight, setDragHeight] = useState(null);
    const [viewportMetrics, setViewportMetrics] = useState(() => {
        if (typeof window === 'undefined') return { height: 800, innerHeight: 800, offsetTop: 0 };
        const vv = window.visualViewport;
        return {
            height: vv?.height ?? window.innerHeight,
            innerHeight: window.innerHeight,
            offsetTop: vv?.offsetTop ?? 0,
        };
    });
    const sheetDragRef = useRef({ active: false, pointerId: null, startY: 0, startHeight: 0 });


    // Initial resize handler
    const startResize = () => {
        isResizing.current = true;
        document.addEventListener('mousemove', handleResize);
        document.addEventListener('mouseup', stopResize);
    };

    const handleResize = (e) => {
        if (!isResizing.current) return;

        // Calculate new size based on mouse position
        // Since it's bottom-right anchored:
        // Width increases as mouse moves left (startX - currentX)
        // Height increases as mouse moves up (startY - currentY) 
        // BUT actually it's easier to just use window dimensions minus mouse coordinates
        // because the element is fixed to bottom-right.

        const newWidth = window.innerWidth - e.clientX - 24; // 24px right margin
        const newHeight = window.innerHeight - e.clientY - 96; // 96px bottom margin (bottom-24)

        setSize({
            width: Math.max(300, Math.min(newWidth, 800)),
            height: Math.max(400, Math.min(newHeight, window.innerHeight - 150))
        });
    };

    const stopResize = () => {
        isResizing.current = false;
        document.removeEventListener('mousemove', handleResize);
        document.removeEventListener('mouseup', stopResize);
    };

    // Narrow screens: bottom sheet. Wide screens: keep the floating side panel.
    useEffect(() => {
        if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;
        const query = window.matchMedia(`(max-width: ${AI_CHAT_SHEET_BREAKPOINT - 1}px)`);
        const sync = () => {
            const next = query.matches;
            setIsSheet(next);
            if (!next) {
                setSheetExpanded(false);
                setDragHeight(null);
            }
        };
        sync();
        query.addEventListener('change', sync);
        return () => query.removeEventListener('change', sync);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;
        const syncViewport = () => {
            const vv = window.visualViewport;
            setViewportMetrics({
                height: vv?.height ?? window.innerHeight,
                innerHeight: window.innerHeight,
                offsetTop: vv?.offsetTop ?? 0,
            });
        };
        syncViewport();
        window.addEventListener('resize', syncViewport);
        const vv = window.visualViewport;
        vv?.addEventListener('resize', syncViewport);
        vv?.addEventListener('scroll', syncViewport);
        return () => {
            window.removeEventListener('resize', syncViewport);
            vv?.removeEventListener('resize', syncViewport);
            vv?.removeEventListener('scroll', syncViewport);
        };
    }, []);

    useEffect(() => {
        if (!isSheet) return undefined;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isSheet]);

    const snapSheetHeight = sheetHeightPx(viewportMetrics.height, sheetExpanded);
    const activeSheetHeight = dragHeight ?? snapSheetHeight;
    const sheetBottom = sheetBottomOffsetPx(
        viewportMetrics.innerHeight,
        viewportMetrics.height,
        viewportMetrics.offsetTop,
    );

    const onSheetPointerDown = (event) => {
        if (!isSheet) return;
        event.preventDefault();
        const target = event.currentTarget;
        target.setPointerCapture?.(event.pointerId);
        sheetDragRef.current = {
            active: true,
            pointerId: event.pointerId,
            startY: event.clientY,
            startHeight: activeSheetHeight,
            currentHeight: activeSheetHeight,
        };
    };

    const onSheetPointerMove = (event) => {
        const drag = sheetDragRef.current;
        if (!drag.active || drag.pointerId !== event.pointerId) return;
        const delta = drag.startY - event.clientY; // drag up → taller
        const next = Math.max(180, Math.min(viewportMetrics.height, drag.startHeight + delta));
        sheetDragRef.current.currentHeight = next;
        setDragHeight(next);
    };

    const finishSheetDrag = (event) => {
        const drag = sheetDragRef.current;
        if (!drag.active || (event && drag.pointerId !== event.pointerId)) return;
        const height = drag.currentHeight ?? drag.startHeight;
        sheetDragRef.current = { ...drag, active: false, pointerId: null };
        setDragHeight(null);
        const result = resolveSheetDragEnd(height, viewportMetrics.height);
        if (result.action === 'close') {
            onClose?.();
            return;
        }
        setSheetExpanded(Boolean(result.expanded));
    };

    // Keep the existing one-time entry and automatic local persistence behavior.
    useEffect(() => {
        const saved = loadAssistantKey();
        setApiKey(saved.key);
        if (saved.key && !assistantStorage.get('localStorage', API_KEY_STORAGE_KEY) && !saveAssistantKey(saved.key)) {
            setKeyStatus('浏览器无法自动保存密钥，请检查存储权限后重试。');
        }
        const savedPersona = assistantStorage.get('localStorage', 'ai_custom_persona');
        if (savedPersona) {
            try {
                setCustomPersona(JSON.parse(savedPersona));
            } catch (e) {
                console.error("Failed to parse custom persona", e);
            }
        }
    }, []);

    // Save messages to sessionStorage
    useEffect(() => {
        assistantStorage.set('sessionStorage', 'ai_chat_messages', JSON.stringify(messages));
    }, [messages]);

    const updateAutoScrollState = () => {
        const container = messagesContainerRef.current;
        if (!container) return;

        const distanceToBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
        shouldAutoScrollRef.current = distanceToBottom < 80;
    };

    const scrollMessagesToBottom = (behavior = 'auto') => {
        messagesEndRef.current?.scrollIntoView({ behavior });
    };

    // Follow new output only while the user is already near the bottom.
    useEffect(() => {
        if (shouldAutoScrollRef.current) {
            scrollMessagesToBottom();
        }
    }, [messages]);

    const saveApiKey = () => {
        const nextApiKey = tempApiKey.trim();
        if (nextApiKey) {
            if (!saveAssistantKey(nextApiKey)) {
                setKeyStatus('浏览器无法保存密钥，请检查存储权限后重试。');
                return;
            }
            setKeyStatus('密钥已自动保存在当前浏览器，下次无需重新输入。');
            setApiKey(nextApiKey);
            setShowSettings(false);
            setTempApiKey('');
        }
    };

    const clearApiKey = () => {
        const sessionCleared = assistantStorage.remove('sessionStorage', API_KEY_STORAGE_KEY);
        const localCleared = assistantStorage.remove('localStorage', API_KEY_STORAGE_KEY);
        setApiKey('');
        setTempApiKey('');
        setKeyStatus(sessionCleared && localCleared ? '已清除保存的密钥。' : '无法清除浏览器存储，请在浏览器设置中清理本站数据。');
    };

    const clearChat = () => {
        shouldAutoScrollRef.current = true;
        setMessages([]);
        assistantStorage.remove('sessionStorage', 'ai_chat_messages');
    };

    // Save selected persona to localStorage
    useEffect(() => {
        assistantStorage.set('localStorage', 'ai_selected_persona_id', selectedPersona);
    }, [selectedPersona]);

    // Open: focus the composer. Escape closes the dialog.
    useEffect(() => {
        const frame = window.requestAnimationFrame(() => {
            inputRef.current?.focus();
        });
        return () => window.cancelAnimationFrame(frame);
    }, []);

    useEffect(() => {
        const onKeyDown = (event) => {
            if (event.key !== 'Escape') return;
            event.stopPropagation();
            onClose?.();
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [onClose]);

    const saveCustomPersona = () => {
        if (!editingCustomPersona?.name || !editingCustomPersona?.systemPrompt) return;

        const newPersona = {
            ...editingCustomPersona,
            id: 'custom',
            // Ensure emoji has a default if missing
            emoji: editingCustomPersona.emoji || '👤'
        };

        setCustomPersona(newPersona);
        assistantStorage.set('localStorage', 'ai_custom_persona', JSON.stringify(newPersona));
        setEditingCustomPersona(null);
        setSelectedPersona('custom');
    };

    const deleteCustomPersona = (e) => {
        e.stopPropagation();
        if (window.confirm('确定要删除自定义角色吗？')) {
            setCustomPersona(null);
            assistantStorage.remove('localStorage', 'ai_custom_persona');
            if (selectedPersona === 'custom') {
                handlePersonaChange('tutor');
            }
        }
    };

    const handlePersonaChange = (personaId) => {
        if (personaId === selectedPersona) return;

        if (messages.length > 0) {
            if (window.confirm('切换角色建议清空当前对话记录，以避免旧角色影响新角色的回答风格。是否清空？')) {
                clearChat();
            }
        }
        setSelectedPersona(personaId);
    };



    const stopGeneration = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
            setIsLoading(false);
        }
    };

    const sendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const currentPersona = (selectedPersona === 'custom' && customPersona)
            ? customPersona
            : (AI_PERSONAS.find(p => p.id === selectedPersona) || AI_PERSONAS[0]);

        const userMessage = { role: 'user', content: inputValue.trim() };
        shouldAutoScrollRef.current = true;

        // Optimistically add user message and empty assistant message placeholder
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInputValue('');
        setIsLoading(true);

        const systemPrompt = buildClassroomPrompt(currentPersona.systemPrompt, shareContext ? {
            path: location.pathname,
            title: document.querySelector('main h1')?.textContent?.trim() || document.title,
        } : null);

        const historyForApi = truncateChatHistory(newMessages);
        const apiMessages = [
            { role: 'system', content: systemPrompt },
            ...historyForApi.map(m => ({ role: m.role, content: m.content }))
        ];

        // Create new AbortController
        abortControllerRef.current = new AbortController();

        try {
            const response = await fetch('https://api.deepseek.com/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: selectedModel,
                    messages: apiMessages,
                    stream: true // Enable streaming
                }),
                signal: abortControllerRef.current.signal
            });

            if (!response.ok) {
                throw new Error(await mapHttpErrorMessage(response));
            }

            if (!response.body) {
                throw new Error('ReadableStream not supported in this browser.');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let assistantContent = '';
            let bufferedChunk = '';

            const updateLastAssistantMessage = (content, replaceEmptyOnly = false) => {
                setMessages(prev => {
                    const updatedMessages = [...prev];
                    const lastMessage = updatedMessages[updatedMessages.length - 1];
                    if (lastMessage?.role === 'assistant') {
                        lastMessage.content = replaceEmptyOnly && lastMessage.content ? lastMessage.content : content;
                    } else {
                        updatedMessages.push({ role: 'assistant', content });
                    }
                    return updatedMessages;
                });
            };

            // Add placeholder for assistant message
            setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                bufferedChunk += chunk;
                const lines = bufferedChunk.split(/\r?\n/);
                bufferedChunk = lines.pop() || '';

                for (const rawLine of lines) {
                    const line = rawLine.trim();
                    if (line.startsWith('data:')) {
                        const payload = line.slice(5).trim();
                        if (!payload || payload === '[DONE]') continue;
                        try {
                            const data = JSON.parse(payload);
                            const delta = data.choices[0]?.delta;

                            if (delta) {
                                const content = delta.content || '';

                                assistantContent += content;

                                // Update last message
                                updateLastAssistantMessage(assistantContent);
                            }
                        } catch (e) {
                            console.error('Error parsing stream chunk', e);
                        }
                    }
                }
            }

            if (!assistantContent.trim()) {
                updateLastAssistantMessage('这次没有收到有效回答。请再问一次，或稍等后重试。', true);
            }

        } catch (error) {
            if (error.name === 'AbortError') {
                setMessages(prev => {
                    const updatedMessages = [...prev];
                    const lastMessage = updatedMessages[updatedMessages.length - 1];
                    if (lastMessage?.role === 'assistant') {
                        lastMessage.content += " *(已停止)*";
                    }
                    return updatedMessages;
                });
            } else {
                const friendly = mapCatchErrorMessage(error) || '出错了，请稍后再试。';
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: `❌ ${friendly}`
                }]);
            }
        } finally {
            setIsLoading(false);
            abortControllerRef.current = null;
        }
    };

    const currentPersonaInfo = selectedPersona === 'custom' && customPersona
        ? customPersona
        : AI_PERSONAS.find(p => p.id === selectedPersona);

    const panelClassName = isSheet
        ? 'mw-surface mw-line-bank mw-chat-panel mw-chat-sheet fixed inset-x-0 z-[100] bg-white rounded-t-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 border-b-0'
        : 'mw-surface mw-line-bank mw-chat-panel fixed bottom-24 right-6 z-[100] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200';

    const panelStyle = isSheet
        ? {
            height: `${Math.min(activeSheetHeight, viewportMetrics.height)}px`,
            maxHeight: `${viewportMetrics.height}px`,
            bottom: `${sheetBottom}px`,
            paddingBottom: 'env(safe-area-inset-bottom, 0px)',
            transition: dragHeight == null ? 'height 180ms ease-out' : 'none',
        }
        : {
            width: `${size.width}px`,
            height: `${size.height}px`,
            maxWidth: 'calc(100vw - 48px)',
            maxHeight: 'calc(100vh - 120px)',
        };

    // Chat window when open
    const panel = (
        <div
            className={panelClassName}
            role="dialog"
            aria-modal="true"
            aria-label="AI 问答助手"
            style={panelStyle}
        >
            {isSheet && (
                <div
                    className="flex shrink-0 touch-none flex-col items-center pt-2 pb-1 cursor-grab active:cursor-grabbing select-none"
                    onPointerDown={onSheetPointerDown}
                    onPointerMove={onSheetPointerMove}
                    onPointerUp={finishSheetDrag}
                    onPointerCancel={finishSheetDrag}
                    onDoubleClick={() => setSheetExpanded((value) => !value)}
                    role="separator"
                    aria-orientation="horizontal"
                    aria-label="拖动调整聊天面板高度，双击切换半屏/更高"
                    title="上拉加高，下滑关闭；双击切换半屏/更高"
                >
                    <div className="h-1.5 w-12 rounded-full bg-slate-300" />
                    <span className="sr-only">拖动手柄</span>
                </div>
            )}
            {/* Header */}
            <header
                className="mw-panel-heading flex justify-between items-center p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shrink-0"
            >
                <div className="flex items-center gap-2 select-none">
                    <span className="text-xl">{currentPersonaInfo?.emoji}</span>
                    <span className="font-bold">{currentPersonaInfo?.name || 'AI 问答助手'}</span>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={clearChat}
                        className="flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/80"
                        title="新对话"
                        aria-label="新对话"
                    >
                        <Plus size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setShowSettings(!showSettings);
                            setTempApiKey(apiKey);
                        }}
                        className="flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/80"
                        title="设置"
                        aria-label="打开 AI 设置"
                        aria-expanded={showSettings}
                    >
                        <Settings size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/80"
                        title="关闭"
                        aria-label="关闭 AI 问答助手"
                    >
                        <X size={18} />
                    </button>
                </div>
            </header>

            {/* Settings Panel */}
            {showSettings && (
                <div className="p-3 bg-slate-50 border-b border-slate-200 animate-in slide-in-from-top duration-200 max-h-[300px] overflow-y-auto">
                    {/* API Key Section */}
                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Key size={16} className="text-slate-500" />
                            <label htmlFor="deepseek-api-key" className="text-sm font-medium text-slate-700">DeepSeek API Key</label>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <input
                                id="deepseek-api-key"
                                type="password"
                                value={tempApiKey}
                                onChange={(e) => setTempApiKey(e.target.value)}
                                placeholder="输入你的 API Key..."
                                autoComplete="off"
                                spellCheck={false}
                                aria-describedby="deepseek-api-key-notice"
                                className="min-h-11 min-w-0 flex-[1_1_180px] rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                                type="button"
                                onClick={saveApiKey}
                                disabled={!tempApiKey.trim()}
                                className="min-h-11 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                            >
                                保存
                            </button>
                            {(apiKey || tempApiKey) && (
                                <button
                                    type="button"
                                    onClick={clearApiKey}
                                    className="flex min-h-11 items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-red-300 hover:text-red-700"
                                >
                                    <Trash2 size={15} aria-hidden="true" />
                                    清除
                                </button>
                            )}
                        </div>
                        {keyStatus && <p role="status" className="text-sm text-slate-700">{keyStatus}</p>}
                        <p id="deepseek-api-key-notice" className="mt-2 text-xs leading-5 text-slate-500">
                            输入并保存一次后，密钥会自动保存在当前浏览器，下次无需重新输入；可随时点击“清除”。提问时，密钥和对话会直接发送到 DeepSeek，本网站不代收密钥。
                        </p>
                    </div>

                    {/* Model */}
                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <BrainCircuit size={16} className="text-slate-500" />
                            <span className="text-sm font-medium text-slate-700">选择模型</span>
                        </div>
                        <div className="flex items-center gap-2 p-2.5 rounded-lg border border-indigo-500 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500">
                            <div className="w-8 h-8 rounded-lg bg-white/80 flex items-center justify-center shrink-0">
                                <Sparkles size={14} />
                            </div>
                            <div className="min-w-0">
                                <div className="text-sm font-bold">{AI_MODEL.name}</div>
                                <div className="text-xs text-indigo-600">{AI_MODEL.description}</div>
                            </div>
                        </div>
                        <p className="text-xs text-slate-400 mt-1.5 px-1">
                            固定使用 DeepSeek Flash，不再提供 V3 / R1 切换。
                        </p>
                    </div>

                    {/* Persona Section */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <UserCircle2 size={16} className="text-slate-500" />
                                <span className="text-sm font-medium text-slate-700">选择角色风格</span>
                            </div>
                            {!editingCustomPersona && !customPersona && (
                                <button
                                    onClick={() => setEditingCustomPersona({ name: '', emoji: '👤', description: '自定义角色', systemPrompt: '' })}
                                    className="text-xs text-indigo-600 hover:underline flex items-center gap-1"
                                >
                                    <Plus size={12} /> 创建自定义角色
                                </button>
                            )}
                        </div>

                        {/* Custom Persona Editor */}
                        {editingCustomPersona && (
                            <div className="mb-4 bg-white p-3 rounded-lg border border-indigo-200 shadow-sm animate-in slide-in-from-top-2">
                                <h4 className="text-xs font-bold text-slate-500 mb-2 uppercase">编辑自定义角色</h4>
                                <div className="space-y-2">
                                    <div className="flex gap-2">
                                        <div className="w-12">
                                            <input
                                                type="text"
                                                value={editingCustomPersona.emoji}
                                                onChange={e => setEditingCustomPersona({ ...editingCustomPersona, emoji: e.target.value })}
                                                placeholder="表情"
                                                className="w-full px-2 py-1 text-center text-lg border rounded focus:border-indigo-500 outline-none"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            value={editingCustomPersona.name}
                                            onChange={e => setEditingCustomPersona({ ...editingCustomPersona, name: e.target.value })}
                                            placeholder="角色名称 (如: 喵星人)"
                                            className="flex-1 px-2 py-1 text-sm border rounded focus:border-indigo-500 outline-none font-bold"
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        value={editingCustomPersona.description}
                                        onChange={e => setEditingCustomPersona({ ...editingCustomPersona, description: e.target.value })}
                                        placeholder="简短描述 (选填)"
                                        className="w-full px-2 py-1 text-xs border rounded focus:border-indigo-500 outline-none"
                                    />
                                    <textarea
                                        value={editingCustomPersona.systemPrompt}
                                        onChange={e => setEditingCustomPersona({ ...editingCustomPersona, systemPrompt: e.target.value })}
                                        placeholder="系统提示词 (System Prompt)... 设置你的角色设定! 比如: 你是一只住在火星的猫..."
                                        className="w-full px-2 py-1 text-xs border rounded focus:border-indigo-500 outline-none h-20 resize-none"
                                    />
                                    <div className="flex gap-2 justify-end">
                                        <button
                                            onClick={() => setEditingCustomPersona(null)}
                                            className="px-3 py-1 text-xs text-slate-500 hover:bg-slate-100 rounded"
                                        >
                                            取消
                                        </button>
                                        <button
                                            onClick={saveCustomPersona}
                                            disabled={!editingCustomPersona.name || !editingCustomPersona.systemPrompt}
                                            className="px-3 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-1"
                                        >
                                            <Save size={12} /> 保存角色
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-2">
                            {/* Custom Persona Button */}
                            {customPersona && !editingCustomPersona && (
                                <div className="relative group">
                                    <button
                                        onClick={() => handlePersonaChange('custom')}
                                        className={`w-full flex items-center gap-3 p-2 rounded-lg border transition-all text-left ${selectedPersona === 'custom'
                                            ? 'bg-fuchsia-50 border-fuchsia-500 ring-1 ring-fuchsia-500'
                                            : 'bg-white border-slate-200 hover:border-fuchsia-300'
                                            }`}
                                    >
                                        <span className="text-2xl">{customPersona.emoji}</span>
                                        <div className="flex-1 overflow-hidden">
                                            <div className={`text-sm font-bold truncate ${selectedPersona === 'custom' ? 'text-fuchsia-700' : 'text-slate-700'} flex items-center gap-2`}>
                                                {customPersona.name}
                                                <span className="text-[10px] bg-fuchsia-100 text-fuchsia-600 px-1.5 py-0.5 rounded-full border border-fuchsia-200 shrink-0">自定义</span>
                                            </div>
                                            <div className="text-xs text-slate-500 truncate">{customPersona.description || '自定义角色'}</div>
                                        </div>
                                    </button>
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setEditingCustomPersona(customPersona); }}
                                            className="min-h-11 min-w-11 p-1.5 bg-white border border-slate-200 rounded text-slate-500 hover:text-indigo-600 hover:border-indigo-300 shadow-sm"
                                            title="编辑"
                                        >
                                            <Pencil size={14} />
                                        </button>
                                        <button
                                            onClick={deleteCustomPersona}
                                            className="min-h-11 min-w-11 p-1.5 bg-white border border-slate-200 rounded text-slate-500 hover:text-red-600 hover:border-red-300 shadow-sm"
                                            title="删除"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {AI_PERSONAS.map(persona => (
                                <button
                                    key={persona.id}
                                    onClick={() => handlePersonaChange(persona.id)}
                                    className={`flex items-center gap-3 p-2 rounded-lg border transition-all text-left ${selectedPersona === persona.id
                                        ? 'bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500'
                                        : 'bg-white border-slate-200 hover:border-indigo-300'
                                        }`}
                                >
                                    <span className="text-2xl">{persona.emoji}</span>
                                    <div className="flex-1 overflow-hidden">
                                        <div className={`text-sm font-bold truncate ${selectedPersona === persona.id ? 'text-indigo-700' : 'text-slate-700'}`}>
                                            {persona.name}
                                        </div>
                                        <div className="text-xs text-slate-500 truncate">{persona.description}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="border-b border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
                <label className="flex min-h-11 items-center gap-2"><input type="checkbox" checked={shareContext} onChange={event => setShareContext(event.target.checked)} />附带当前页面标题与路径</label>
                <p>先说说你试了什么。助教建议需要你运行和核对。</p>
            </div>
            {/* Messages Area */}
            <div
                ref={messagesContainerRef}
                onScroll={updateAutoScrollState}
                className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50"
            >
                {!apiKey && messages.length === 0 && (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Key size={32} className="text-indigo-500" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-700 mb-2">欢迎使用 AI 助手</h3>
                        <p className="text-sm text-slate-500 mb-4">请先设置 DeepSeek API Key</p>
                        <button
                            onClick={() => setShowSettings(true)}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            设置 API Key
                        </button>
                    </div>
                )}

                {apiKey && messages.length === 0 && (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Bot size={32} className="text-indigo-500" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-700 mb-2">把你卡住的那一步告诉我</h3>
                        <p className="text-sm text-slate-500">可以贴出代码、预期结果和实际结果，我们一步步排查。</p>
                    </div>
                )}

                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-200 text-slate-600'
                            }`}>
                            {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                        </div>
                        <div className={`${msg.role === 'user' ? 'max-w-[85%]' : 'flex-1 min-w-0'} p-3 rounded-2xl text-sm leading-relaxed overflow-x-hidden ${msg.role === 'user'
                            ? 'bg-indigo-600 text-white rounded-br-sm'
                            : 'bg-white text-slate-700 rounded-bl-sm border border-slate-200 shadow-sm'
                            }`}>
                            {msg.role === 'user' ? (
                                <div className="whitespace-pre-wrap break-words">{msg.content}</div>
                            ) : (
                                msg.content ? (
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={chatMarkdownComponents}
                                    >
                                        {msg.content}
                                    </ReactMarkdown>
                                ) : (
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <Loader2 size={16} className="animate-spin" />
                                        <span className="text-xs">
                                            思考中...
                                        </span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                ))}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-slate-200 shrink-0">
                {isHistoryNearLimit(messages) && (
                    <p role="status" className="mb-2 text-xs leading-5 text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                        对话已经比较长，发送时只会带上最近几轮。建议点左上角「新对话」再问，回答更稳、也更省额度。
                    </p>
                )}
                <div className="flex gap-2 items-end">
                    <textarea
                        ref={inputRef}
                        rows={2}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                sendMessage();
                            }
                        }}
                        placeholder={apiKey ? "输入你的问题…（Enter 发送，Shift+Enter 换行）" : "请先设置 API Key"}
                        disabled={!apiKey || isLoading}
                        aria-label="对话输入"
                        className="min-h-11 max-h-36 min-w-0 flex-1 resize-y px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all disabled:bg-slate-100 disabled:cursor-not-allowed text-sm leading-6"
                    />
                    <button
                        type="button"
                        onClick={isLoading ? stopGeneration : sendMessage}
                        disabled={!apiKey || (!inputValue.trim() && !isLoading)}
                        className={`shrink-0 min-h-11 px-4 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-1 text-white
                            ${isLoading
                                ? 'bg-red-500 hover:bg-red-600'
                                : 'bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed'
                            }`}
                        title={isLoading ? "停止生成" : "发送"}
                        aria-label={isLoading ? "停止生成" : "发送"}
                    >
                        {isLoading ? <Square size={18} fill="currentColor" /> : <Send size={18} />}
                    </button>
                </div>
            </div>
            {/* Resize Handle — desktop floating panel only */}
            {!isSheet && (
                <div
                    className="absolute left-0 top-0 w-6 h-6 cursor-nwse-resize z-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                    onMouseDown={startResize}
                    title="拖动调整大小"
                >
                    <div className="w-full h-full relative">
                        <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-slate-400 rounded-tl-sm"></div>
                    </div>
                </div>
            )}
        </div>
    );

    if (isSheet) {
        return (
            <>
                <button
                    type="button"
                    className="mw-chat-sheet-backdrop fixed inset-0 z-[99] border-0 bg-slate-900/45 p-0 cursor-default"
                    aria-label="点击遮罩关闭 AI 问答助手"
                    onClick={() => onClose?.()}
                />
                {panel}
            </>
        );
    }

    return panel;
};

export default AIChatWidget;
