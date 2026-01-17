import React from 'react';

const AnimatedCounter = ({ value, label, unit, color }) => {
    return (
        <div className="relative group cursor-default">
            <div className="absolute inset-0 bg-white/5 blur-xl group-hover:bg-white/10 transition-colors duration-500 rounded-full" />
            <div className="relative border-l border-white/20 pl-4 bg-gradient-to-r from-white/5 to-transparent backdrop-blur-sm">
                <div className={`text-5xl font-black font-mono text-white tracking-tighter tabular-nums drop-shadow-[0_0_25px_rgba(6,182,212,0.4)]`}>
                    {value}<span className={`text-xl ml-1 ${color}`}>{unit}</span>
                </div>
                <div className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mt-1 font-bold">{label}</div>
            </div>
        </div>
    )
}

export default AnimatedCounter;
