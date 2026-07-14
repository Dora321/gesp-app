

export const Button = ({ onClick, children, className, variant = 'primary', disabled = false }) => {
    const baseStyle = "px-4 py-2 rounded-lg font-bold transition-all transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
        primary: "bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]",
        secondary: "bg-slate-800 text-cyan-400 border border-cyan-500/30 hover:bg-slate-700",
        success: "bg-green-500 text-white hover:bg-green-600 shadow-[0_0_15px_rgba(34,197,94,0.4)]",
    };
    return (
        <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
            {children}
        </button>
    );
};

export const CodeBlock = ({ code }) => (
    <div className="bg-black/50 text-cyan-50 p-4 rounded-xl font-mono text-sm shadow-inner border border-cyan-900/50 overflow-x-auto backdrop-blur-sm">
        <pre>{code}</pre>
    </div>
);
