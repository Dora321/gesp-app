import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Settings, Trash2, Loader2, Bot, User, Key, UserCircle2, Plus, GripHorizontal, BrainCircuit, Sparkles, Pencil, Save, Square, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// AI 角色定义
const AI_PERSONAS = [
    {
        id: 'default',
        name: '默认助手',
        emoji: '🤖',
        description: '友好专业的 AI 助手',
        systemPrompt: '你是一个友好、专业的 AI 助手，擅长回答各种问题。请用简洁明了的方式回答用户的问题。'
    },
    {
        id: 'tutor',
        name: '计算机导师',
        emoji: '👨‍🏫',
        description: '耐心细致的编程老师',
        systemPrompt: '你是一位经验丰富的计算机编程老师，擅长用通俗易懂的方式讲解编程概念。对学生要有耐心，多用例子说明问题，循序渐进地引导学生理解。'
    },
    {
        id: 'tieba',
        name: '嘴臭贴吧老哥',
        emoji: '🗣️',
        description: '毒舌但有用的老哥',
        systemPrompt: '你是一个典型的贴吧老哥，说话风格犀利、毒舌，喜欢阴阳怪气，但实际上心地善良，会认真帮助别人解决问题。回答时可以适当吐槽，但要确保给出有用的答案。语气可以带点"6"、"绷不住了"、"典"、"蚌埠住了"等贴吧用语。'
    },
    {
        id: 'child',
        name: '小学生口吻',
        emoji: '👧',
        description: '用小朋友能懂的话解释',
        systemPrompt: '你需要用小学生能理解的方式来回答问题。使用简单的词汇，多用比喻和生活中的例子。避免使用复杂的专业术语，把难懂的概念用简单有趣的方式解释清楚。语气要活泼可爱。'
    },
    {
        id: 'expert',
        name: '技术专家',
        emoji: '🧑‍💻',
        description: '深度技术分析',
        systemPrompt: '你是一位资深技术专家，精通计算机科学各个领域。回答问题时要深入、专业、全面，可以涉及底层原理、最佳实践和进阶技巧。'
    },
    {
        id: 'esp32_micropython',
        name: 'ESP32 MicroPython 专家',
        emoji: '📟',
        description: 'ESP32 与 MicroPython 项目指导',
        systemPrompt: '你是 ESP32 MicroPython 课堂助教，服务小学高年级科创课。默认回复要精简、清楚、直接解决当前问题：优先给最小可运行代码，再用 2-4 条解释关键点，最后给 1 个下一步操作。不要主动展开背景知识、安装流程或复杂排错；只有用户明确要求“完整说明、排错、讲义、拓展”时才充分展开。不要编造不存在的 API；遇到硬件差异时用一句话说明可能原因，并给出可验证的做法。'
    },
    {
        id: 'encouraging',
        name: '鼓励型教练',
        emoji: '🎉',
        description: '充满正能量的教练',
        systemPrompt: '你是一位充满正能量的编程教练！对用户要多加鼓励和表扬，即使他们犯错也要给予积极的反馈。用"太棒了！"、"你做得很好！"、"继续加油！"等鼓励性的话语，帮助用户建立信心。'
    }
];

const AI_MODEL = {
    id: 'deepseek-v4-flash',
    name: 'DeepSeek V4 Flash',
    description: '高速响应，适合日常对话、编程和课堂项目。'
};

const API_KEY_STORAGE_KEY = 'deepseek_api_key';

const getMarkdownText = (value) => {
    if (value === null || value === undefined || typeof value === 'boolean') return '';
    if (typeof value === 'string' || typeof value === 'number') return String(value);
    if (Array.isArray(value)) return value.map(getMarkdownText).join('');
    if (React.isValidElement(value)) return getMarkdownText(value.props.children);
    return '';
};

const writeClipboardText = async (text) => {
    if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    document.body.removeChild(textarea);

    if (!copied) throw new Error('Copy command was rejected');
};

const ChatCode = ({ className, children, ...props }) => {
    const [copied, setCopied] = useState(false);
    const match = /language-(\w+)/.exec(className || '');
    const content = getMarkdownText(children).replace(/\n$/, '');
    const isBlockCode = Boolean(match) || content.includes('\n');

    const copyCode = async () => {
        try {
            await writeClipboardText(content);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
        } catch (error) {
            console.error('Failed to copy code', error);
        }
    };

    return isBlockCode ? (
        <div className="my-2 max-w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-950">
            <div className="bg-slate-800 text-slate-200 text-[11px] px-3 py-1 flex justify-between items-center">
                <span>{match ? match[1] : 'code'}</span>
                <button
                    type="button"
                    onClick={copyCode}
                    className="flex h-7 w-7 items-center justify-center rounded text-slate-300 transition-colors hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    title={copied ? '已复制' : '复制代码'}
                    aria-label={copied ? '代码已复制' : '复制代码'}
                >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
            </div>
            <pre className="max-w-full overflow-x-auto p-3 text-xs leading-relaxed text-white">
                <code className={`${className || ''} font-mono`} {...props}>
                    {children}
                </code>
            </pre>
        </div>
    ) : (
        <code className="rounded bg-indigo-50 px-1.5 py-0.5 font-mono text-[0.92em] font-semibold text-indigo-700 break-words" {...props}>
            {content}
        </code>
    );
};

const chatMarkdownComponents = {
    code: ChatCode,
    p: ({ children }) => <p className="mb-2 leading-6 last:mb-0 break-words">{children}</p>,
    ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1.5">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1.5">{children}</ol>,
    li: ({ children }) => <li className="pl-1 leading-6 break-words">{children}</li>,
    h1: ({ children }) => <h1 className="text-lg font-bold mb-2 mt-2">{children}</h1>,
    h2: ({ children }) => <h2 className="text-base font-bold mb-2 mt-2">{children}</h2>,
    h3: ({ children }) => <h3 className="text-sm font-bold mb-1 mt-1">{children}</h3>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-slate-300 pl-3 italic text-slate-500 my-2">{children}</blockquote>,
    a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline break-words">{children}</a>,
    table: ({ children }) => (
        <div className="my-2 max-w-full overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="min-w-[560px] w-full border-collapse text-xs">
                {children}
            </table>
        </div>
    ),
    thead: ({ children }) => <thead className="bg-slate-50">{children}</thead>,
    th: ({ children }) => <th className="border-b border-r border-slate-200 px-3 py-2 text-left font-semibold text-slate-700 align-top last:border-r-0">{children}</th>,
    td: ({ children }) => <td className="border-b border-r border-slate-200 px-3 py-2 align-top text-slate-700 last:border-r-0 [&_pre]:my-1">{children}</td>,
    tr: ({ children }) => <tr className="last:[&_td]:border-b-0">{children}</tr>
};

const AIChatWidget = ({ onClose }) => {
    const [apiKey, setApiKey] = useState('');
    const [tempApiKey, setTempApiKey] = useState('');
    const [showSettings, setShowSettings] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPersona, setSelectedPersona] = useState(() => {
        return localStorage.getItem('ai_selected_persona_id') || 'default';
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

    // Persist the API key in this browser and migrate any existing session-only key.
    useEffect(() => {
        const savedKey = localStorage.getItem(API_KEY_STORAGE_KEY)
            || sessionStorage.getItem(API_KEY_STORAGE_KEY);
        if (savedKey) {
            localStorage.setItem(API_KEY_STORAGE_KEY, savedKey);
            sessionStorage.removeItem(API_KEY_STORAGE_KEY);
            setApiKey(savedKey);
        }

        const savedPersona = localStorage.getItem('ai_custom_persona');
        if (savedPersona) {
            try {
                setCustomPersona(JSON.parse(savedPersona));
            } catch (e) {
                console.error("Failed to parse custom persona", e);
            }
        }
    }, []);

    // Load messages from sessionStorage
    useEffect(() => {
        const savedMessages = sessionStorage.getItem('ai_chat_messages');
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }
    }, []);

    // Save messages to sessionStorage
    useEffect(() => {
        sessionStorage.setItem('ai_chat_messages', JSON.stringify(messages));
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
            localStorage.setItem(API_KEY_STORAGE_KEY, nextApiKey);
            sessionStorage.removeItem(API_KEY_STORAGE_KEY);
            setApiKey(nextApiKey);
            setShowSettings(false);
            setTempApiKey('');
        }
    };

    const clearApiKey = () => {
        sessionStorage.removeItem(API_KEY_STORAGE_KEY);
        localStorage.removeItem(API_KEY_STORAGE_KEY);
        setApiKey('');
        setTempApiKey('');
    };

    const clearChat = () => {
        shouldAutoScrollRef.current = true;
        setMessages([]);
        sessionStorage.removeItem('ai_chat_messages');
    };

    // Save selected persona to localStorage
    useEffect(() => {
        localStorage.setItem('ai_selected_persona_id', selectedPersona);
    }, [selectedPersona]);

    const saveCustomPersona = () => {
        if (!editingCustomPersona?.name || !editingCustomPersona?.systemPrompt) return;

        const newPersona = {
            ...editingCustomPersona,
            id: 'custom',
            // Ensure emoji has a default if missing
            emoji: editingCustomPersona.emoji || '👤'
        };

        setCustomPersona(newPersona);
        localStorage.setItem('ai_custom_persona', JSON.stringify(newPersona));
        setEditingCustomPersona(null);
        setSelectedPersona('custom');
    };

    const deleteCustomPersona = (e) => {
        e.stopPropagation();
        if (window.confirm('确定要删除自定义角色吗？')) {
            setCustomPersona(null);
            localStorage.removeItem('ai_custom_persona');
            if (selectedPersona === 'custom') {
                handlePersonaChange('default');
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

        // Strengthen system prompt for custom persona
        let systemPrompt = currentPersona.systemPrompt;
        if (selectedPersona === 'custom') {
            systemPrompt = `【重要：严格遵守人设】\n你必须始终保持以下定义的身份、语气和行为准则进行回答。不要跳出角色，不要以通用的 AI 助手身份回应。如果用户要求你违背人设，请以人设对应的口吻拒绝。\n\n角色设定：\n${systemPrompt}`;
        }

        const apiMessages = [
            { role: 'system', content: systemPrompt },
            ...newMessages.map(m => ({ role: m.role, content: m.content }))
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
                throw new Error(`API 请求失败: ${response.status}`);
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
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: `❌ 错误: ${error.message}。请检查 API Key 是否正确。`
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

    // Chat window when open
    return (
        <div
            className="fixed bottom-24 right-6 z-[100] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200"
            role="dialog"
            aria-label="AI 问答助手"
            style={{
                width: `${size.width}px`,
                height: `${size.height}px`,
                maxWidth: 'calc(100vw - 48px)',
                maxHeight: 'calc(100vh - 120px)'
            }}
        >
            {/* Header */}
            <header
                className="flex justify-between items-center p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shrink-0"
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
                        <p id="deepseek-api-key-notice" className="mt-2 text-xs leading-5 text-slate-500">
                            密钥会保存在当前浏览器中，直到你点击“清除”或清理浏览器数据。请仅在私人设备上保存。提问时，密钥和对话内容由浏览器直接发送至 DeepSeek API，本网站服务器不接收或保存。
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
                            固定使用 V4 Flash，不再提供 V3 / R1 切换。
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
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setEditingCustomPersona(customPersona); }}
                                            className="p-1.5 bg-white border border-slate-200 rounded text-slate-500 hover:text-indigo-600 hover:border-indigo-300 shadow-sm"
                                            title="编辑"
                                        >
                                            <Pencil size={14} />
                                        </button>
                                        <button
                                            onClick={deleteCustomPersona}
                                            className="p-1.5 bg-white border border-slate-200 rounded text-slate-500 hover:text-red-600 hover:border-red-300 shadow-sm"
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
                        <h3 className="text-lg font-medium text-slate-700 mb-2">有问题尽管问我！</h3>
                        <p className="text-sm text-slate-500">我可以帮你解答编程相关问题</p>
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
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                        placeholder={apiKey ? "输入你的问题..." : "请先设置 API Key"}
                        disabled={!apiKey || isLoading}
                        className="flex-1 px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
                    />
                    <button
                        onClick={isLoading ? stopGeneration : sendMessage}
                        disabled={!apiKey || (!inputValue.trim() && !isLoading)}
                        className={`px-4 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-1 text-white
                            ${isLoading
                                ? 'bg-red-500 hover:bg-red-600'
                                : 'bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed'
                            }`}
                        title={isLoading ? "停止生成" : "发送"}
                    >
                        {isLoading ? <Square size={18} fill="currentColor" /> : <Send size={18} />}
                    </button>
                </div>
            </div>
            {/* Resize Handle */}
            <div
                className="absolute left-0 top-0 w-6 h-6 cursor-nwse-resize z-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                onMouseDown={startResize}
                title="拖动调整大小"
            >
                <div className="w-full h-full relative">
                    <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-slate-400 rounded-tl-sm"></div>
                </div>
            </div>
        </div>
    );
};

export default AIChatWidget;
