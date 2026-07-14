

export const Button = ({ onClick, children, className, variant = 'primary', disabled = false }) => {
    const baseStyle = "px-4 py-2 rounded-lg font-bold transition-all transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg",
        secondary: "bg-white text-blue-600 border-2 border-blue-100 hover:border-blue-200 hover:bg-blue-50",
        success: "bg-green-500 text-white hover:bg-green-600 shadow-md",
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
