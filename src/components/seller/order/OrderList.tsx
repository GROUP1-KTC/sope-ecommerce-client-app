'use client';

import OrderCard, { type OrderCardProps } from './OrderCard';

const OrderListMock: OrderCardProps[] = [
    {
        orderId: '250716A1Q717P6',
        username: 'scrystallee599720031993',
        productImage:
            'https://static.vecteezy.com/system/resources/thumbnails/057/068/323/small/single-fresh-red-strawberry-on-table-green-background-food-fruit-sweet-macro-juicy-plant-image-photo.jpg',
        quantity: 1,
        productName:
            'Tranh Treo Tường Làm Theo Yêu Cầu, Chất Liệu Canvas, Kích Thước Nhỏ',
        variation: 'Khung Đen',
        price: '₫99.600',
        paymentMethod: 'TK Ngân hàng liên kết ShopeePay',
        status: 'Đã hủy',
        statusNote: 'Đã hủy bởi Người mua',
        countdown: '',
        shipping: 'Siêu Tốc - 4 Giờ',
        shippingNote: 'SPX Instant',
    },

    // Add more mock orders as needed
    {
        orderId: '250716A1Q717P7',
        username: 'john_doe123',
        productImage: 'https://example.com/image2.jpg',
        quantity: 2,
        productName: 'Sản phẩm mẫu 2',
        variation: 'Màu xanh',
        price: '₫200.000',
        paymentMethod: 'Thẻ tín dụng',
        status: 'Đã giao',
        statusNote: 'Giao thành công',
        countdown: '1 ngày',
        shipping: 'Giao hàng nhanh',
        shippingNote: 'Giao trong 1-2 ngày',
    },
    {
        orderId: '250716A1Q717P8',
        username: 'jane_doe456',
        productImage: 'https://example.com/image3.jpg',
        quantity: 3,
        productName: 'Sản phẩm mẫu 3',
        variation: 'Màu đỏ',
        price: '₫150.000',
        paymentMethod: 'Thanh toán khi nhận hàng',
        status: 'Đang xử lý',
        statusNote: 'Chờ xác nhận',
        countdown: '2 ngày',
        shipping: 'Giao hàng tiêu chuẩn',
        shippingNote: 'Dự kiến giao trong 3-5 ngày',
    },
];

export default function OrderList() {
    return (
        <div>
            <div className="mb-2 text-lg font-semibold">5437 Đơn hàng</div>
            <div className="hidden sm:grid grid-cols-7 gap-2 bg-gray-100 px-4 py-3 rounded-t mb-3 text-sm font-medium text-gray-700">
                <div className="col-span-2">Sản phẩm</div>
                <div>Tổng Đơn hàng</div>
                <div>Trạng thái</div>
                <div>Đếm ngược</div>
                <div>Đơn vị vận chuyển</div>
                <div>Thao tác</div>
            </div>

            {OrderListMock.map((order) => (
                <OrderCard key={order.orderId} {...order} />
            ))}
        </div>
    );
}
