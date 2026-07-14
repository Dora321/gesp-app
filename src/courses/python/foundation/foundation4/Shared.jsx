

export const Button = ({ onClick, children, className, variant = 'primary', disabled = false }) => {
    const baseStyle = "px-4 py-2 rounded-lg font-bold transition-all transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg",
        secondary: "bg-white text-indigo-600 border-2 border-indigo-100 hover:border-indigo-200 hover:bg-indigo-50",
        success: "bg-purple-500 text-white hover:bg-purple-600 shadow-md",
        danger: "bg-red-500 text-white hover:bg-red-600 shadow-md",
    };
    return (
        <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
            {children}
        </button>
    );
};

export const CodeBlock = ({ code }) => (
    <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-sm shadow-inner border border-slate-700 overflow-x-auto">
        <pre>{code}</pre>
    </div>
);

export const NavButton = ({ section, activeSection, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${activeSection === section.id
            ? 'bg-indigo-50 text-indigo-700 font-medium'
            : 'text-slate-600 hover:bg-slate-50'
            }`}
    >
        <section.icon size={18} className={activeSection === section.id ? 'text-indigo-600' : 'text-slate-400'} />
        {section.title}
    </button>
);
