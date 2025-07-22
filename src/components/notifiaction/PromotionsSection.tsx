import React from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationCard from './NotificationCard';

interface Promotion {
    id: number;
    iconType: 'discount' | 'cart' | 'gift' | 'shopee';
    title: string;
    description: string;
    timestamp: string;
    titleColor: string;
    images: string[];
}

interface PromotionsSectionProps {
    promotions: Promotion[];
}

const PromotionsSection: React.FC<PromotionsSectionProps> = ({
    promotions,
}) => {
    return (
        <div style={{ padding: '0px' }}>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '24px',
                }}
            >
                <NotificationsIcon
                    style={{ color: '#f97316', marginRight: '8px' }}
                />
                <h2
                    style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#374151',
                    }}
                >
                    Thông Báo Của Tôi
                </h2>
            </div>

            {promotions.map((promo) => (
                <NotificationCard
                    key={promo.id}
                    iconType={promo.iconType}
                    title={promo.title}
                    description={promo.description}
                    images={promo.images}
                    timestamp={promo.timestamp}
                    titleColor={promo.titleColor}
                />
            ))}
        </div>
    );
};

export default PromotionsSection;
