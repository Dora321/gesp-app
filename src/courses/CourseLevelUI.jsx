import React from 'react';

// CourseLevel4-8 五个总览页此前各自定义了同一套 Card / Button：Card 五份逐字
// 相同，Button 只差一个主色（四、五级用蓝，六到八级用靛蓝）。改一次圆角、阴影
// 或 disabled 态要动五个文件，实际结果就是它们慢慢长歪。
//
// 主色作为显式 prop 传入，而不是把两种配色合并成一种——每一级的强调色是有意
// 区分的，统一掉是设计决定，不该藏在去重里。

export const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden border border-slate-100 ${className}`}>
        {children}
    </div>
);

const ACCENTS = {
    blue: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    },
    indigo: {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
        outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50',
    },
};

export const Button = ({
    children,
    onClick,
    variant = 'primary',
    accent = 'indigo',
    className = '',
    disabled = false,
}) => {
    const accentStyles = ACCENTS[accent] || ACCENTS.indigo;
    const variants = {
        primary: accentStyles.primary,
        secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
        outline: accentStyles.outline,
        success: 'bg-green-600 text-white hover:bg-green-700',
        danger: 'bg-red-600 text-white hover:bg-red-700',
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
};
