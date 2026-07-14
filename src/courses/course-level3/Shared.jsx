import { useState } from 'react';
import { Code, Copy, Check } from 'lucide-react';

export const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden border border-slate-100 ${className}`}>
        {children}
    </div>
);

export const Button = ({ children, onClick, variant = "primary", className = "" }) => {
    const baseStyle = "px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
        outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
        success: "bg-green-600 text-white hover:bg-green-700"
    };
    return (
        <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
            {children}
        </button>
    );
};

export const CodeBlock = ({ code, title }) => (
    <div className="bg-slate-900 rounded-lg overflow-hidden my-4 text-sm font-mono text-slate-50">
        {title && (
            <div className="bg-slate-800 px-4 py-2 text-xs text-slate-400 border-b border-slate-700 flex items-center gap-2">
                <Code size={14} />
                {title}
            </div>
        )}
        <pre className="p-4 overflow-x-auto">
            <code>{code}</code>
        </pre>
    </div>
);

export const SectionTitle = ({ icon: Icon, title }) => (
    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4 mt-6 border-b pb-2">
        <Icon className="text-blue-600" size={24} />
        {title}
    </h2>
);

export const TemplateBlock = ({ title, desc, code }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-slate-700 text-sm">{title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                </div>
                <button onClick={handleCopy} className="text-slate-500 hover:text-blue-600 flex items-center gap-1 text-xs bg-white px-2 py-1 rounded border">
                    {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? '已复制' : '复制'}
                </button>
            </div>
            <div className="p-4 bg-slate-900 overflow-x-auto">
                <pre className="text-sm font-mono text-green-400"><code>{code}</code></pre>
            </div>
        </div>
    );
};
