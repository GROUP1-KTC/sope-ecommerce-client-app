'use client';

import React from 'react';
import OrderProgress from '~/components/order-detail/OrderProgress';
import OrderTracking from '~/components/order-detail/OrderTracking';
import OrderItems from '~/components/order-detail/OrderItems';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import OrderSummary from '~/components/order-detail/OrderSummary';
import CustomLink from '~/components/shared/loading/CustomLink';

const OrderDetailPage = () => {
    const order = {
        id: '241298BF4YUR',
        status: 'Đã hoàn thành',
        steps: [
            { date: '14:15 25-07-2024', active: true },
            { date: '14:45 25-07-2024', active: true },
            { date: '12:19 26-07-2024', active: true },
            { date: '05:16 28-07-2024', active: true },
            { date: '22:59 01-07-2025', active: true },
        ],
        tracking: [
            { date: '12:41 01-12-2024', detail: 'Đã giao hàng thành công' },
            {
                date: '08:40 01-12-2024',
                detail: 'Băng qua khu vực Phù Ninh - Phú Thọ',
            },
            { date: '07:34 01-12-2024', detail: 'Đang chờ đến lượt giao' },
            {
                date: '16:37 30-11-2024',
                detail: 'Đang vận chuyển từ kho trung tâm',
            },
            { date: '14:23 30-11-2024', detail: 'Đã xuất kho từ kho Phù Ninh' },
            { date: '23:30 29-11-2024', detail: 'Đã đến kho Phù Ninh' },
            {
                date: '23:30 29-11-2024',
                detail: 'Băng qua kho khu vực trung tâm',
            },
            {
                date: '23:30 29-11-2024',
                detail: 'Đã xuất kho từ kho trung tâm',
            },
            {
                date: '23:30 29-11-2024',
                detail: 'Băng qua kho khu vực địa phương',
            },
            { date: '23:30 29-11-2024', detail: 'Đã nhận đơn hàng từ Shoppee' },
        ],
        receiver: {
            name: 'Nguyễn Văn A',
            phone: '0987654321',
            address: '123 Đường ABC, Phường XYZ, Quận 1, TP.HCM',
        },
        items: [
            {
                id: 'T1Y4A157-BlacKiPhone13',
                name: 'Gourde V6 Đế Thủy Vui Nhộn Hoạt Hình Đăng Sinh Shin-chan Ốp lưng iPhone 14 15 13 12 11 Pro Max iP 7 8 Plus iPhone X XS XR XS Max Silicon Mềm Cao Cấp Chống Sốc Ốp Lưng',
                imageUrl:
                    'https://petapixel.com/assets/uploads/2024/01/The-Star-of-System-Sol-Rectangle-640x800.jpg',
                quantity: 1,
                price: 430000,
                discount: 10000,
                total: 420000,
            },
            {
                id: 'T1Y4A157-TransparentPhone13',
                name: 'Gourde V6 Đế Thủy Vui Nhộn Hoạt Hình Đăng Sinh Shin-chan Ốp lưng iPhone 14 15 13 12 11 Pro Max iP 7 8 Plus iPhone X XS XR XS Max Silicon Mềm Cao Cấp Chống Sốc Ốp Lưng',
                imageUrl:
                    'https://petapixel.com/assets/uploads/2024/01/The-Star-of-System-Sol-Rectangle-640x800.jpg',
                quantity: 1,
                price: 440000,
                discount: 13500,
                total: 426500,
            },
        ],
        shop: {
            name: 'GourdeOfficial Shop',
        },
        orderSummary: {
            subtotal: 846500,
            shippingCost: 50000,
            discount: 23500,
            paymentMethod: 'Thanh toán khi nhận hàng.',
        },
    };

    return (
        <div className="order-detail-page">
            <div className="flex flex-col min-h-screen bg-gray-50 px-12 ">
                <div className="flex flex-1">
                    <div className="flex-1 py-6">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <CustomLink
                                        href="/order"
                                        className="flex items-center text-xl uppercase hover:underline"
                                    >
                                        <ArrowBackIosNewIcon className="mr-2" />
                                        <span className="hidden md:inline">
                                            Quay lại
                                        </span>
                                    </CustomLink>
                                </div>
                                <h1 className="text-xl font-semibold text-black uppercase flex items-center gap-4">
                                    MÃ ĐƠN HÀNG: {order.id}
                                    <span className="h-6 border-l-2 border-gray-600"></span>
                                    <span className="text-green-600 uppercase">
                                        {order.status}
                                    </span>
                                </h1>
                            </div>
                            <hr className="my-6 border-gray-300" />

                            <OrderProgress steps={order.steps} />
                            <hr className="my-6 border-gray-300" />
                            <OrderTracking
                                tracking={order.tracking}
                                receiver={order.receiver}
                            />
                            <hr className="my-6 border-gray-300" />
                            <OrderItems items={order.items} shop={order.shop} />
                            <OrderSummary
                                subtotal={order.items.reduce(
                                    (sum, item) => sum + item.total,
                                    0,
                                )}
                                shippingCost={50000}
                                discount={order.items.reduce(
                                    (sum, item) => sum + item.discount,
                                    0,
                                )}
                                paymentMethod={order.orderSummary.paymentMethod}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailPage;
