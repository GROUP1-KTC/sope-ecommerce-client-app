'use client';
import Sidebar from '~/components/order/SideBar';
import { ReactNode } from 'react';

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className="order-detail-page bg-gray-50 px-16">
            <div className="flex flex-col min-h-screen">
                <div className="flex flex-1 ">
                    <Sidebar />
                    <div className="flex-1 bg-white rounded-lg">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
