import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Settings, Trash2, Loader2, Bot, User, Key, UserCircle2, Plus } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css'; // 使用 GitHub Dark 主题代码高亮

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
        id: 'encouraging',
        name: '鼓励型教练',
        emoji: '🎉',
        description: '充满正能量的教练',
        systemPrompt: '你是一位充满正能量的编程教练！对用户要多加鼓励和表扬，即使他们犯错也要给予积极的反馈。用"太棒了！"、"你做得很好！"、"继续加油！"等鼓励性的话语，帮助用户建立信心。'
    }
];

const AIChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [apiKey, setApiKey] = useState('');
    const [tempApiKey, setTempApiKey] = useState('');
    const [showSettings, setShowSettings] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPersona, setSelectedPersona] = useState('default');
    const messagesEndRef = useRef(null);

    // Load API key from localStorage
    useEffect(() => {
        const savedKey = localStorage.getItem('deepseek_api_key');
        if (savedKey) {
            setApiKey(savedKey);
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

    // Scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const saveApiKey = () => {
        if (tempApiKey.trim()) {
            localStorage.setItem('deepseek_api_key', tempApiKey.trim());
            setApiKey(tempApiKey.trim());
            setShowSettings(false);
            setTempApiKey('');
        }
    };

    const clearChat = () => {
        setMessages([]);
        sessionStorage.removeItem('ai_chat_messages');
    };

    const sendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const currentPersona = AI_PERSONAS.find(p => p.id === selectedPersona) || AI_PERSONAS[0];
        const userMessage = { role: 'user', content: inputValue.trim() };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInputValue('');
        setIsLoading(true);

        // Construct messages with system prompt
        const apiMessages = [
            { role: 'system', content: currentPersona.systemPrompt },
            ...newMessages.map(m => ({ role: m.role, content: m.content }))
        ];

        try {
            const response = await fetch('https://api.deepseek.com/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'deepseek-chat',
                    messages: apiMessages,
                    stream: false
                })
            });

            if (!response.ok) {
                throw new Error(`API 请求失败: ${response.status}`);
            }

            const data = await response.json();
            const assistantMessage = {
                role: 'assistant',
                content: data.choices[0].message.content
            };
            setMessages([...newMessages, assistantMessage]);
        } catch (error) {
            setMessages([...newMessages, {
                role: 'assistant',
                content: `❌ 错误: ${error.message}。请检查 API Key 是否正确。`
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    // Floating button when closed
    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-24 right-6 z-[100] w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 group"
                title="AI 问答助手"
            >
                <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
                {messages.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                        {messages.length}
                    </span>
                )}
            </button>
        );
    }

    const currentPersonaInfo = AI_PERSONAS.find(p => p.id === selectedPersona);

    // Chat window when open
    return (
        <div className="fixed bottom-24 right-6 z-[100] w-[360px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-120px)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">
            {/* Header */}
            <header className="flex justify-between items-center p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shrink-0">
                <div className="flex items-center gap-2">
                    <span className="text-xl">{currentPersonaInfo?.emoji}</span>
                    <span className="font-bold">{currentPersonaInfo?.name || 'AI 问答助手'}</span>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={clearChat}
                        className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                        title="新对话"
                    >
                        <Plus size={18} />
                    </button>
                    <button
                        onClick={() => {
                            setShowSettings(!showSettings);
                            setTempApiKey(apiKey);
                        }}
                        className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                        title="设置"
                    >
                        <Settings size={18} />
                    </button>
                    <button
                        onClick={clearChat}
                        className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                        title="清空记录"
                    >
                        <Trash2 size={18} />
                    </button>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                        title="关闭"
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
                            <span className="text-sm font-medium text-slate-700">DeepSeek API Key</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="password"
                                value={tempApiKey}
                                onChange={(e) => setTempApiKey(e.target.value)}
                                placeholder="输入你的 API Key..."
                                className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            />
                            <button
                                onClick={saveApiKey}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                                保存
                            </button>
                        </div>
                    </div>

                    {/* Persona Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <UserCircle2 size={16} className="text-slate-500" />
                            <span className="text-sm font-medium text-slate-700">选择角色风格</span>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            {AI_PERSONAS.map(persona => (
                                <button
                                    key={persona.id}
                                    onClick={() => {
                                        setSelectedPersona(persona.id);
                                        // setShowSettings(false); // Optional: close settings on selection
                                    }}
                                    className={`flex items-center gap-3 p-2 rounded-lg border transition-all text-left ${selectedPersona === persona.id
                                        ? 'bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500'
                                        : 'bg-white border-slate-200 hover:border-indigo-300'
                                        }`}
                                >
                                    <span className="text-2xl">{persona.emoji}</span>
                                    <div>
                                        <div className={`text-sm font-bold ${selectedPersona === persona.id ? 'text-indigo-700' : 'text-slate-700'}`}>
                                            {persona.name}
                                        </div>
                                        <div className="text-xs text-slate-500">{persona.description}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50">
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
                        <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed overflow-hidden ${msg.role === 'user'
                            ? 'bg-indigo-600 text-white rounded-br-sm'
                            : 'bg-white text-slate-700 rounded-bl-sm border border-slate-200 shadow-sm'
                            }`}>
                            {msg.role === 'user' ? (
                                <div className="whitespace-pre-wrap break-words">{msg.content}</div>
                            ) : (
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeHighlight]}
                                    components={{
                                        code({ node, inline, className, children, ...props }) {
                                            const match = /language-(\w+)/.exec(className || '')
                                            return !inline ? (
                                                <div className="rounded-md overflow-hidden my-2">
                                                    <div className="bg-slate-800 text-slate-200 text-xs px-3 py-1 flex justify-between items-center">
                                                        <span>{match ? match[1] : 'code'}</span>
                                                    </div>
                                                    <code className={`${className} block bg-slate-900 p-3 text-white overflow-x-auto`} {...props}>
                                                        {children}
                                                    </code>
                                                </div>
                                            ) : (
                                                <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-mono text-xs" {...props}>
                                                    {children}
                                                </code>
                                            )
                                        },
                                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                        ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
                                        ol: ({ children }) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
                                        li: ({ children }) => <li className="mb-1">{children}</li>,
                                        h1: ({ children }) => <h1 className="text-lg font-bold mb-2 mt-2">{children}</h1>,
                                        h2: ({ children }) => <h2 className="text-base font-bold mb-2 mt-2">{children}</h2>,
                                        h3: ({ children }) => <h3 className="text-sm font-bold mb-1 mt-1">{children}</h3>,
                                        blockquote: ({ children }) => <blockquote className="border-l-4 border-slate-300 pl-3 italic text-slate-500 my-2">{children}</blockquote>,
                                        a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">{children}</a>
                                    }}
                                >
                                    {msg.content}
                                </ReactMarkdown>
                            )}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                            <Bot size={16} className="text-slate-600" />
                        </div>
                        <div className="bg-white p-3 rounded-2xl rounded-bl-sm border border-slate-200 shadow-sm">
                            <Loader2 size={18} className="animate-spin text-indigo-500" />
                        </div>
                    </div>
                )}

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
                        onClick={sendMessage}
                        disabled={!apiKey || !inputValue.trim() || isLoading}
                        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors flex items-center gap-1"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIChatWidget;
