
import React from 'react';
import { motion } from 'framer-motion';

const LicenseCard = ({ name = "Student Name", level = "Intern Engineer", id = "EK-2026-001" }) => {
    return (
        <div className="relative w-96 h-56 rounded-xl overflow-hidden shadow-2xl bg-gray-900 text-white font-mono border border-cyan-500/50">
            {/* Background Graphic */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 z-0"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -ml-10 -mb-10"></div>

            {/* Content */}
            <div className="relative z-10 p-6 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-6 h-6 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded flex items-center justify-center text-xs font-bold">E</div>
                            <span className="font-bold tracking-wider text-sm">E-KART LAB</span>
                        </div>
                        <h2 className="text-xs text-gray-400 uppercase tracking-widest">Official License</h2>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-cyan-400 font-bold">{level.toUpperCase()}</div>
                        <div className="text-[10px] text-gray-500">ID: {id}</div>
                    </div>
                </div>

                <div className="flex gap-4 items-end">
                    <div className="w-20 h-24 bg-gray-800 rounded border border-gray-700 flex items-center justify-center text-gray-600 text-xs">
                        PHOTO
                    </div>
                    <div className="flex-grow">
                        <div className="mb-2">
                            <div className="text-[10px] text-gray-500 uppercase">Name</div>
                            <div className="text-lg font-bold truncate">{name}</div>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <div className="text-[10px] text-gray-500 uppercase">Issued</div>
                                <div className="text-xs">2026-08-01</div>
                            </div>
                            <div>
                                <div className="text-[10px] text-gray-500 uppercase">Valid Until</div>
                                <div className="text-xs">PERMANENT</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Holographic Strip overlay */}
            <div className="absolute top-4 right-4 w-16 h-16 opacity-30 pointer-events-none">
                <div className="w-full h-full border-2 border-cyan-500 rounded-full flex items-center justify-center text-[8px] text-cyan-500 font-bold rotate-[-15deg]">
                    AUTHORIZED
                </div>
            </div>
        </div>
    );
};

export default LicenseCard;
