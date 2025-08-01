'use client';

import React, { useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import StoreIcon from '@mui/icons-material/Store';
import Image from 'next/image';

// Interfaces
interface PromotionIconProps {
    type: 'discount' | 'cart' | 'gift' | 'shopee';
}

interface NotificationCardProps {
    iconType: 'discount' | 'cart' | 'gift' | 'shopee';
    title: string;
    description: string;
    images: string[];
    timestamp: string;
    titleColor: string;
}

interface Promotion {
    id: number;
    iconType: 'discount' | 'cart' | 'gift' | 'shopee';
    title: string;
    description: string;
    timestamp: string;
    titleColor: string;
    images: string[];
}

interface Order {
    id: string;
    date: string;
    status: 'completed' | 'cancelled' | 'processing';
    items: number;
    total: number;
}

// Utility function to format numbers consistently for Vietnamese currency
const formatCurrency = (number: number): string => {
    return number
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.') // Use dot as thousands separator
        .concat(' đ');
};

const PromotionIcon = ({ type }: PromotionIconProps) => {
    switch (type) {
        case 'discount':
            return (
                <LocalOfferIcon style={{ fontSize: '30px', color: 'white' }} />
            );
        case 'cart':
            return (
                <ShoppingCartIcon
                    style={{ fontSize: '30px', color: 'white' }}
                />
            );
        case 'gift':
            return (
                <CardGiftcardIcon
                    style={{ fontSize: '30px', color: 'white' }}
                />
            );
        case 'shopee':
            return <StoreIcon style={{ fontSize: '30px', color: 'white' }} />;
        default:
            return (
                <LocalOfferIcon style={{ fontSize: '30px', color: 'white' }} />
            );
    }
};

const NotificationCard = ({
    iconType,
    title,
    description,
    images,
    timestamp,
    titleColor,
}: NotificationCardProps) => {
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

                {images && images.length > 0 && (
                    <div
                        style={{
                            display: 'flex',
                            gap: '10px',
                            marginTop: '10px',
                            marginBottom: '10px',
                            flexWrap: 'wrap',
                        }}
                    >
                        {images.map((src: string, index: number) => (
                            <Image
                                key={index}
                                src={src}
                                alt={`Product ${index + 1}`}
                                width={40}
                                height={40}
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

export default function VoucherPage() {
    const [openSection, setOpenSection] = useState<string | null>(
        'notifications',
    );
    const [activeTab, setActiveTab] = useState('promotions');

    const toggleSection = (section: string) => {
        setOpenSection((prev: string | null) =>
            prev === section ? null : section,
        );
    };

    const promotions: Promotion[] = [
        {
            id: 1,
            iconType: 'shopee',
            title: 'CƠ HỘI CUỐI CHỐT DEAL GIẢM 50%',
            description:
                'Tại Ngày hội Thương hiệu LIXIBOX 📦 Cũng mà giảm độc quyền đến 600K 💎 Mở bán độc quyền: bàn chải điện, máy triệt lông 💡 Quà tặng mọi đơn 🎉 Freeship toàn quốc',
            timestamp: '13:46 16-07-2025',
            titleColor: '#ff5722',
            images: [],
        },
        {
            id: 2,
            iconType: 'discount',
            title: 'Giảm đậm hơn 20% 🎉',
            description:
                '8479_phmthinc ơi! Đừng bỏ lỡ khuyến mãi của sản phẩm bạn yêu thích! 🏃‍♀️',
            timestamp: '12:03 16-07-2025',
            titleColor: '#ff3b30',
            images: [
                'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-mbrvsy68cnl656',
                'https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m8vrng76gv473b',
                'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-mbq7huohazca48',
            ],
        },
        {
            id: 3,
            iconType: 'cart',
            title: 'Giỏ hàng đang chờ bạn chốt đơn 🛒',
            description:
                'Hàng còn trong giỏ, nói nhỏ với 8479_phmthinc 🤫 Mà Freeship 0Đ đã nằm chỗ sẵn trong ví. Xài ngay nhé! ✨',
            timestamp: '14:16 15-07-2025',
            titleColor: '#007aff',
            images: [],
        },
        {
            id: 4,
            iconType: 'gift',
            title: 'Hộp Cam Bi Ẩn - Mua 1 được 10 🔥',
            description:
                "Chỉ 50k có ngay 10 đơn hàng ngẫu nhiên ❤️ 'Đập hộp' vui lai có đồ hời 🥳 Hàng hot hết nhanh - Tranh ngay kẻo lỡ!",
            timestamp: '18:02 10-07-2025',
            titleColor: '#8e24aa',
            images: [],
        },
    ];

    const orders: Order[] = [
        {
            id: 'DH-20230615-123',
            date: '15/06/2023',
            status: 'completed',
            items: 3,
            total: 750000,
        },
        {
            id: 'DH-20230620-456',
            date: '20/06/2023',
            status: 'cancelled',
            items: 2,
            total: 320000,
        },
        {
            id: 'DH-20230625-789',
            date: '25/06/2023',
            status: 'processing',
            items: 1,
            total: 150000,
        },
    ];

    return (
        <div
        className='flex flex-col md:flex-row gap-4 bg-gray-50 p-6 min-h-screen '
          
        >
            <main
                style={{
                    flex: '1',
                    marginLeft: '24px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    padding: '24px',
                }}
            >
                {activeTab === 'promotions' ? (
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
                ) : (
                    <div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '24px',
                            }}
                        >
                            <ShoppingBagIcon
                                style={{ color: '#3b82f6', marginRight: '8px' }}
                            />
                            <h2
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    color: '#374151',
                                }}
                            >
                                Đơn Mua
                            </h2>
                        </div>

                        <div style={{ overflowX: 'auto' }}>
                            <table
                                style={{
                                    minWidth: '100%',
                                    borderCollapse: 'collapse',
                                    borderSpacing: '0',
                                    backgroundColor: '#fff',
                                }}
                            >
                                <thead style={{ backgroundColor: '#f9fafb' }}>
                                    <tr>
                                        <th
                                            style={{
                                                padding: '12px 24px',
                                                textAlign: 'left',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                                color: '#6b7280',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em',
                                            }}
                                        >
                                            Mã đơn hàng
                                        </th>
                                        <th
                                            style={{
                                                padding: '12px 24px',
                                                textAlign: 'left',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                                color: '#6b7280',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em',
                                            }}
                                        >
                                            Ngày đặt
                                        </th>
                                        <th
                                            style={{
                                                padding: '12px 24px',
                                                textAlign: 'left',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                                color: '#6b7280',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em',
                                            }}
                                        >
                                            Số lượng
                                        </th>
                                        <th
                                            style={{
                                                padding: '12px 24px',
                                                textAlign: 'left',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                                color: '#6b7280',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em',
                                            }}
                                        >
                                            Tổng tiền
                                        </th>
                                        <th
                                            style={{
                                                padding: '12px 24px',
                                                textAlign: 'left',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                                color: '#6b7280',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em',
                                            }}
                                        >
                                            Trạng thái
                                        </th>
                                    </tr>
                                </thead>
                                <tbody
                                    style={{
                                        backgroundColor: '#fff',
                                        borderBottom: '1px solid #e5e7eb',
                                    }}
                                >
                                    {orders.map((order) => (
                                        <tr key={order.id}>
                                            <td
                                                style={{
                                                    padding: '16px 24px',
                                                    whiteSpace: 'nowrap',
                                                    fontSize: '14px',
                                                    color: '#3b82f6',
                                                    fontWeight: '500',
                                                }}
                                            >
                                                {order.id}
                                            </td>
                                            <td
                                                style={{
                                                    padding: '16px 24px',
                                                    whiteSpace: 'nowrap',
                                                    fontSize: '14px',
                                                    color: '#6b7280',
                                                }}
                                            >
                                                {order.date}
                                            </td>
                                            <td
                                                style={{
                                                    padding: '16px 24px',
                                                    whiteSpace: 'nowrap',
                                                    fontSize: '14px',
                                                    color: '#6b7280',
                                                }}
                                            >
                                                {order.items} sản phẩm
                                            </td>
                                            <td
                                                style={{
                                                    padding: '16px 24px',
                                                    whiteSpace: 'nowrap',
                                                    fontSize: '14px',
                                                    color: '#111827',
                                                }}
                                            >
                                                {formatCurrency(order.total)}
                                            </td>
                                            <td
                                                style={{
                                                    padding: '16px 24px',
                                                    whiteSpace: 'nowrap',
                                                    fontSize: '14px',
                                                }}
                                            >
                                                {order.status ===
                                                    'completed' && (
                                                    <span
                                                        style={{
                                                            display:
                                                                'inline-flex',
                                                            alignItems:
                                                                'center',
                                                            padding: '2px 10px',
                                                            borderRadius:
                                                                '9999px',
                                                            fontSize: '12px',
                                                            fontWeight: '500',
                                                            backgroundColor:
                                                                '#d1fae5',
                                                            color: '#065f46',
                                                        }}
                                                    >
                                                        <CheckCircleIcon
                                                            style={{
                                                                marginRight:
                                                                    '4px',
                                                            }}
                                                            fontSize="small"
                                                        />
                                                        Hoàn thành
                                                    </span>
                                                )}
                                                {order.status ===
                                                    'cancelled' && (
                                                    <span
                                                        style={{
                                                            display:
                                                                'inline-flex',
                                                            alignItems:
                                                                'center',
                                                            padding: '2px 10px',
                                                            borderRadius:
                                                                '9999px',
                                                            fontSize: '12px',
                                                            fontWeight: '500',
                                                            backgroundColor:
                                                                '#fee2e2',
                                                            color: '#991b1b',
                                                        }}
                                                    >
                                                        <CancelIcon
                                                            style={{
                                                                marginRight:
                                                                    '4px',
                                                            }}
                                                            fontSize="small"
                                                        />
                                                        Đã hủy
                                                    </span>
                                                )}
                                                {order.status ===
                                                    'processing' && (
                                                    <span
                                                        style={{
                                                            display:
                                                                'inline-flex',
                                                            alignItems:
                                                                'center',
                                                            padding: '2px 10px',
                                                            borderRadius:
                                                                '9999px',
                                                            fontSize: '12px',
                                                            fontWeight: '500',
                                                            backgroundColor:
                                                                '#fffbe6',
                                                            color: '#b45309',
                                                        }}
                                                    >
                                                        <AccessTimeIcon
                                                            style={{
                                                                marginRight:
                                                                    '4px',
                                                            }}
                                                            fontSize="small"
                                                        />
                                                        Đang xử lý
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div
                            style={{
                                marginTop: '24px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <div style={{ fontSize: '14px', color: '#6b7280' }}>
                                Hiển thị 1-3 của 3 đơn hàng
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    style={{
                                        padding: '4px 12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '4px',
                                        fontSize: '14px',
                                        backgroundColor: '#f3f4f6',
                                        color: '#4b5563',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Trước
                                </button>
                                <button
                                    style={{
                                        padding: '4px 12px',
                                        border: '1px solid #3b82f6',
                                        borderRadius: '4px',
                                        fontSize: '14px',
                                        backgroundColor: '#3b82f6',
                                        color: '#fff',
                                        cursor: 'pointer',
                                    }}
                                >
                                    1
                                </button>
                                <button
                                    style={{
                                        padding: '4px 12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '4px',
                                        fontSize: '14px',
                                        backgroundColor: '#f3f4f6',
                                        color: '#4b5563',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Sau
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
