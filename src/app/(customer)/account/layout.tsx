'use client';
import { useState, useEffect } from 'react';
import Sidebar from '~/components/order/SideBar';
import type { ReactNode } from 'react';
import { Menu } from 'lucide-react';

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="order-detail-page bg-gray-50 px-4 lg:px-16 min-h-screen">
            <div className="flex min-h-screen">
                {/* Mobile menu button */}
                <div className="lg:hidden py-4 pl-2">
                    <button
                        onClick={toggleSidebar}
                        className="flex items-center gap-2 text-gray-800 cursor-pointer hover:text-gray-600 transition"
                    >
                        <Menu size={24} />
                    </button>
                </div>

                <div className="flex flex-1 relative">
                    {/* Desktop Sidebar */}
                    <div className="hidden lg:block">
                        <Sidebar />
                    </div>

                    <div className="flex-1 relative bg-white rounded-lg overflow-hidden">
                        <div className="relative z-0">{children}</div>

                        {/* Mobile Sidebar Overlay */}
                        <div
                            className={`absolute inset-0 z-40 transition-all duration-300 ${isSidebarOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
                        >
                            <div
                                className={`absolute top-0 left-0 h-full max-w-xs bg-white shadow-lg transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
                            >
                                <Sidebar />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
