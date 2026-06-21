
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const EkartLayout = () => {
    const location = useLocation();

    const navItems = [
        { path: '/ekart', label: '🏠 首页', id: 'home' },
        { path: '/ekart/roadmap', label: '🗺️ 学习地图', id: 'roadmap' },
        { path: '/ekart/toolbox', label: '🛠️ 工具箱', id: 'toolbox' },
        { path: '/ekart/gallery', label: '🏆 车队展厅', id: 'gallery' },
        { path: '/ekart/parent-portal', label: '📝 家长日报', id: 'parent' },
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-cyan-500 selection:text-white">
            {/* Navigation Bar */}
            <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Left: Logo Section */}
                        <div className="flex items-center gap-3 md:flex-1">
                            <div className="w-8 h-8 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-xl font-bold text-white">E</span>
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                                E-Kart Lab
                            </span>
                        </div>

                        {/* Center: Navigation Items */}
                        <div className="hidden md:flex md:flex-[2] justify-center">
                            <div className="flex items-baseline space-x-6 lg:space-x-8">
                                {navItems.map((item) => {
                                    const isActive = location.pathname === item.path || (item.path !== '/ekart' && location.pathname.startsWith(item.path));
                                    return (
                                        <Link
                                            key={item.id}
                                            to={item.path}
                                            className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isActive
                                                ? 'bg-gray-800 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                                                : 'text-gray-300 hover:text-white hover:bg-gray-700'
                                                }`}
                                        >
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right: Balanced Spacer (previously Student Login) */}
                        <div className="hidden md:block md:flex-1"></div>
                    </div>
                </div>
            </nav>

            {/* Main Content Area with Page Transitions */}
            <main className="relative">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-gray-950 border-t border-gray-800 py-12 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-400">
                        <div>
                            <h3 className="text-white text-lg font-bold mb-4">E-Kart Lab</h3>
                            <p className="text-sm">
                                专注于青少年工程与科创教育，通过打造真正的电动卡丁车，点燃孩子对机械、电子与编程的热爱。
                            </p>
                        </div>
                        <div>
                            <h3 className="text-white text-lg font-bold mb-4">快速链接</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/ekart/roadmap" className="hover:text-cyan-400">课程体系</Link></li>
                                <li><Link to="/ekart/toolbox" className="hover:text-cyan-400">资源下载</Link></li>
                                <li><Link to="/ekart/parent-portal" className="hover:text-cyan-400">家长反馈</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white text-lg font-bold mb-4">联系我们</h3>
                            <p className="text-sm">📧 contact@ekartlab.edu</p>
                            <p className="text-sm">📞 400-123-4567</p>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
                        &copy; 2026 E-Kart Lab. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default EkartLayout;
