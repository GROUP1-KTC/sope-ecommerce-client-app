import React from 'react';
import PromotionIcon from './PromotionIcon';

interface NotificationCardProps {
    iconType: 'discount' | 'cart' | 'gift' | 'shopee';
    title: string;
    description: string;
    images: string[];
    timestamp: string;
    titleColor: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
    iconType,
    title,
    description,
    images,
    timestamp,
    titleColor,
}) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'flex-start',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                marginBottom: '15px',
                padding: '15px',
                width: '100%',
                boxSizing: 'border-box',
            }}
        >
            <div
                style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '15px',
                    backgroundColor: '#fff4f2',
                }}
            >
                <PromotionIcon type={iconType} />
            </div>

            <div style={{ flexGrow: 1 }}>
                <div
                    style={{
                        fontWeight: 'bold',
                        marginBottom: '5px',
                        fontSize: '16px',
                        lineHeight: '1.3',
                        color: titleColor,
                    }}
                >
                    {title}
                </div>
                <div
                    style={{
                        fontSize: '14px',
                        color: '#555',
                        marginBottom: '10px',
                        lineHeight: '1.4',
                        whiteSpace: 'pre-wrap',
                    }}
                >
                    {description}
                </div>

                {images.length > 0 && (
                    <div
                        style={{
                            display: 'flex',
                            gap: '10px',
                            marginTop: '10px',
                            marginBottom: '10px',
                            flexWrap: 'wrap',
                        }}
                    >
                        {images.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`Product ${index + 1}`}
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    objectFit: 'cover',
                                    borderRadius: '4px',
                                    border: '1px solid #eee',
                                }}
                            />
                        ))}
                    </div>
                )}

                <div
                    style={{
                        fontSize: '12px',
                        color: '#888',
                        marginTop: '5px',
                    }}
                >
                    {timestamp}
                </div>
            </div>

            <a
                href="#"
                style={{
                    flexShrink: 0,
                    marginLeft: '20px',
                    padding: '8px 12px',
                    backgroundColor: 'transparent',
                    color: '#007bff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    fontWeight: '500',
                    alignSelf: 'center',
                    whiteSpace: 'nowrap',
                }}
            >
                Xem Chi Tiết
            </a>
        </div>
    );
};

export default NotificationCard;
