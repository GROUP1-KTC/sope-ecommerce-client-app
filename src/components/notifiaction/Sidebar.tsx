import React, { useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SidebarNavItem from './SidebarNavItem';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
    const [openSection, setOpenSection] = useState<string | null>(
        'notifications',
    );

    const toggleSection = (section: string) => {
        setOpenSection((prev) => (prev === section ? null : section));
    };

    return (
        <aside
            style={{
                width: '240px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                padding: '16px',
                fontSize: '14px',
                flexShrink: 0,
            }}
        >
            <SidebarNavItem
                icon={<NotificationsIcon fontSize="small" />}
                label="Thông Báo"
                isOpen={openSection === 'notifications'}
                onToggle={() => toggleSection('notifications')}
            >
                <li
                    style={{
                        paddingLeft: '8px',
                        cursor: 'pointer',
                        color:
                            activeTab === 'promotions' ? '#ea580c' : '#4b5563',
                        fontWeight:
                            activeTab === 'promotions' ? '500' : 'normal',
                    }}
                    onClick={() => setActiveTab('promotions')}
                >
                    Khuyến Mãi
                </li>
                <li style={{ paddingLeft: '8px', cursor: 'pointer' }}>
                    Cập Nhật Đơn Hàng
                </li>
                <li style={{ paddingLeft: '8px', cursor: 'pointer' }}>
                    Cập Nhật Ví
                </li>
                <li style={{ paddingLeft: '8px', cursor: 'pointer' }}>
                    Cập Nhật Naver
                </li>
            </SidebarNavItem>

            <SidebarNavItem
                icon={<PersonIcon fontSize="small" />}
                label="Tài Khoản Của Tôi"
                isOpen={openSection === 'account'}
                onToggle={() => toggleSection('account')}
            >
                <li style={{ paddingLeft: '8px', cursor: 'pointer' }}>Hồ Sơ</li>
                <li style={{ paddingLeft: '8px', cursor: 'pointer' }}>
                    Ngân Hàng
                </li>
                <li style={{ paddingLeft: '8px', cursor: 'pointer' }}>
                    Địa Chỉ
                </li>
                <li style={{ paddingLeft: '8px', cursor: 'pointer' }}>
                    Đổi Mật Khẩu
                </li>
                <li style={{ paddingLeft: '8px', cursor: 'pointer' }}>
                    Cài Đặt Thông Báo
                </li>
                <li style={{ paddingLeft: '8px', cursor: 'pointer' }}>
                    Thiết Lập Riêng
                </li>
                <li style={{ paddingLeft: '8px', cursor: 'pointer' }}>
                    Thông Tin Cá Nhân
                </li>
            </SidebarNavItem>

            <SidebarNavItem
                icon={<InventoryIcon fontSize="small" />}
                label="Đơn Mua"
                isOpen={false}
                onToggle={() => {}}
                isActive={activeTab === 'orders'}
                onClick={() => setActiveTab('orders')}
            />

            <SidebarNavItem
                icon={<ConfirmationNumberIcon fontSize="small" />}
                label="Kho Voucher"
                isOpen={false}
                onToggle={() => {}}
            />

            <SidebarNavItem
                icon={<MonetizationOnIcon fontSize="small" />}
                label="Naver Xu"
                isOpen={false}
                onToggle={() => {}}
            />
        </aside>
    );
};

export default Sidebar;
