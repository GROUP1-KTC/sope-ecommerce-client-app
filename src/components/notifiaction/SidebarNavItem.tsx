import React from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface SidebarNavItemProps {
    icon: React.ReactNode;
    label: string;
    isOpen: boolean;
    onToggle: () => void;
    children?: React.ReactNode;
    isActive?: boolean;
    onClick?: () => void;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
    icon,
    label,
    isOpen,
    onToggle,
    children,
    isActive,
    onClick,
}) => {
    return (
        <div>
            <div
                style={{
                    fontWeight: '600',
                    marginTop: children ? '24px' : '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: isActive ? '#2563eb' : '#374151',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '4px',
                }}
                onClick={children ? onToggle : onClick}
            >
                {icon}
                {label}
                {children && (
                    <span style={{ marginLeft: 'auto' }}>
                        {isOpen ? (
                            <ExpandLessIcon fontSize="small" />
                        ) : (
                            <ExpandMoreIcon fontSize="small" />
                        )}
                    </span>
                )}
            </div>

            {isOpen && children && (
                <ul
                    style={{
                        listStyleType: 'none',
                        paddingLeft: '16px',
                        borderLeft: `2px solid ${label === 'Thông Báo' ? '#fdba74' : '#93c5fd'}`,
                        marginLeft: '4px',
                        marginTop: '8px',
                        lineHeight: '1.5',
                        color: '#4b5563',
                    }}
                >
                    {children}
                </ul>
            )}
        </div>
    );
};

export default SidebarNavItem;
