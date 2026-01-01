
import React from 'react';

const Gallery = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-white mb-4">🏆 车队展厅</h1>
                <p className="text-gray-400">荣耀时刻：每一台车都承载着孩子们的梦想。</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-500/50 transition-all group">
                        <div className="aspect-video bg-gray-900 flex items-center justify-center text-gray-600 relative overflow-hidden">
                            <span className="z-10">[Gallery Item {item}]</span>
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Team Alpha 0{item}</h3>
                            <p className="text-gray-400 text-sm mb-4">Completed: Summer 2025</p>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 bg-cyan-900/30 text-cyan-400 text-xs rounded border border-cyan-800">Top Speed: 25km/h</span>
                                <span className="px-2 py-1 bg-purple-900/30 text-purple-400 text-xs rounded border border-purple-800">Best Design</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
