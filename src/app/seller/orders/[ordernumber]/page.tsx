'use client';

import { useParams } from 'next/navigation';
import { useGetOrderDetailQuery } from '~/features/orders/orderApiSlide';
import {
    Hash,
    Truck,
    BadgeDollarSign,
    User,
    Phone,
    StickyNote,
    Clock,
} from 'lucide-react';
import { Receipt, Wallet } from 'lucide-react';
import { statusColors } from '~/components/order/OrderItem';

const shippingProviders: Record<string, string> = {
    'MTJfMTdfMTU1OQ==': 'GIAO HÀNG TIẾT KIỆM (tiết kiệm)',
    MTNfN18xNjE4: 'GIAO HÀNG NHANH (nhanh)',
    MTFfN18xMTk1: 'GIAO HÀNG TIẾT KIỆM (nhanh)',
};

export default function OrderDetail() {
    const params = useParams();
    const orderNumberParams = params.ordernumber as string;

    // const [mounted, setMounted] = useState(false);

    // useEffect(() => {
    // 	setMounted(true);
    // }, []);

    // if (!mounted) {
    // 	return null;
    // }

    const { data, isLoading, isError } =
        useGetOrderDetailQuery(orderNumberParams);

    const orderDetail = data?.data ?? null;
    const order = orderDetail?.order;

    if (isLoading) return <div>Đang tải chi tiết đơn hàng...</div>;
    if (isError || !orderDetail || !order)
        return <div>Không tìm thấy đơn hàng</div>;

    const createdAt = order.createdAt ?? order.statusHistory?.[0]?.timestamp;
    const items = Array.isArray(order.items) ? order.items : [];

    // Tính doanh thu
    const calculateRevenue = (order: any) => {
        const subTotal =
            order.items?.reduce(
                (sum: number, item: any) => sum + item.price * item.quantity,
                0,
            ) ?? 0;

        // Giảm giá SHOP
        const shopDiscount =
            order.orderDiscounts
                ?.filter((d: any) => d.scope === 'SHOP')
                .reduce((sum: number, d: any) => sum + d.discountAmount, 0) ??
            0;

        const afterDiscount = subTotal - shopDiscount;

        // Phí hoa hồng
        const commission =
            order.items?.reduce((sum: number, item: any) => {
                return (
                    sum +
                    item.price *
                    item.quantity *
                    (item.commissionFeePercent / 100)
                );
            }, 0) ?? 0;

        return afterDiscount - commission;
    };

    return (
        <div className="py-12 px-24">
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Bên trái */}
                <div className="md:col-span-2 space-y-6">
                    {/* Thông tin đơn hàng */}
                    <div className="bg-white rounded shadow p-4">
                        <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                            <Hash size={18} className="text-orange-500" />
                            Thông tin đơn hàng
                        </h2>
                        <div className="text-sm text-gray-700 space-y-1">
                            <div>
                                <strong>Mã đơn hàng:</strong>{' '}
                                {order.orderNumber}
                            </div>
                            <div>
                                <strong>Ngày tạo:</strong>{' '}
                                {createdAt
                                    ? new Date(createdAt).toLocaleString(
                                        'vi-VN',
                                    )
                                    : '—'}
                            </div>
                            <div>
                                <strong>Đơn vị vận chuyển:</strong>{' '}
                                {shippingProviders[order.shippingRateId] ??
                                    'Không rõ'}
                            </div>
                            <div>
                                <strong>Phương thức thanh toán:</strong>{' '}
                                {order.paymentMethod}
                            </div>
                        </div>
                    </div>

                    {/* Địa chỉ nhận hàng */}
                    <div className="bg-white rounded shadow p-4">
                        <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                            <Truck size={18} className="text-orange-500" />
                            Thông tin vận chuyển
                        </h2>
                        <div className="text-sm text-gray-700 space-y-1">
                            <div className="flex items-center gap-2">
                                <User size={16} className="text-gray-500" />
                                {orderDetail.shippingAddress.recipientName}
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-gray-500" />
                                {orderDetail.shippingAddress.phoneNumber}
                            </div>
                            <div>
                                Địa chỉ giao hàng:{' '}
                                {`${orderDetail.shippingAddress.street}, ${orderDetail.shippingAddress.ward}, ${orderDetail.shippingAddress.district}, ${orderDetail.shippingAddress.city}, ${orderDetail.shippingAddress.country}`}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded shadow p-4">
                        <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                            <BadgeDollarSign
                                size={18}
                                className="text-orange-500"
                            />
                            Thông tin thanh toán
                        </h2>

                        {/* Bảng sản phẩm */}
                        <table className="w-full  text-sm">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="px-3 py-2 w-12">STT</th>
                                    <th className="px-3 py-2">Sản phẩm</th>
                                    <th className="px-3 py-2 w-32 text-right">
                                        Đơn giá
                                    </th>
                                    <th className="px-3 py-2 w-20 text-center">
                                        Số lượng
                                    </th>
                                    <th className="px-3 py-2 w-32 text-right">
                                        Thành tiền
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, idx) => (
                                    <tr
                                        key={item.productVariantId ?? idx}
                                        className="align-top items-center"
                                    >
                                        <td className="px-3 py-2 items-center text-center">
                                            {idx + 1}
                                        </td>
                                        <td className="px-3 py-2">
                                            <div className="flex items-start gap-3">
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.productName}
                                                    className="w-12 h-12 object-cover rounded"
                                                />
                                                <div>
                                                    <div className="font-medium">
                                                        {item.productName}
                                                    </div>
                                                    <div className="text-gray-500 text-xs">
                                                        {item.attributes
                                                            ?.map(
                                                                (a) =>
                                                                    `${a.name}: ${a.value}`,
                                                            )
                                                            .join(', ')}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 py-2 text-right">
                                            {item.price.toLocaleString('vi-VN')}{' '}
                                            đ
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                            {item.quantity}
                                        </td>
                                        <td className="px-3 py-2 text-right font-medium">
                                            {(
                                                item.quantity * item.price
                                            ).toLocaleString('vi-VN')}{' '}
                                            đ
                                        </td>
                                    </tr>
                                ))}

                                {items.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-3 py-4 text-center text-gray-500"
                                        >
                                            Không có sản phẩm
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Tổng kết */}
                        <div className="mt-4 text-sm space-y-1 w-full md:w-1/2 ml-auto">
                            <div className="flex justify-between">
                                <span>Tổng tiền sản phẩm</span>
                                <span>
                                    {order.subTotal?.toLocaleString('vi-VN')} đ
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Phụ phí (hoa hồng trả cho sàn)</span>
                                <span>
                                    -
                                    {(
                                        order.items?.reduce(
                                            (sum: number, item: any) =>
                                                sum +
                                                item.price *
                                                item.quantity *
                                                (item.commissionFeePercent /
                                                    100),
                                            0,
                                        ) ?? 0
                                    ).toLocaleString('vi-VN')}{' '}
                                    đ
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        {/* Số tiền cuối cùng */}

                        {/* Thanh toán của Người Mua */}
                        <div className="bg-white rounded shadow p-4">
                            <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                                <Wallet size={18} className="text-orange-500" />
                                Thanh toán của Người Mua
                            </h2>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Tổng tiền sản phẩm</span>
                                    <span>
                                        {order.subTotal?.toLocaleString(
                                            'vi-VN',
                                        )}{' '}
                                        đ
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Phí vận chuyển</span>
                                    <span>
                                        {order.shippingCharges?.toLocaleString(
                                            'vi-VN',
                                        )}{' '}
                                        đ
                                    </span>
                                </div>

                                {/* Hiển thị danh sách mã giảm giá / voucher */}
                                {order.orderDiscounts?.map(
                                    (d: any, idx: number) => (
                                        <div
                                            key={idx}
                                            className="flex justify-between text-gray-600"
                                        >
                                            <span>
                                                {d.description ?? d.code}
                                            </span>
                                            <span>
                                                -
                                                {d.discountAmount?.toLocaleString(
                                                    'vi-VN',
                                                )}{' '}
                                                đ
                                            </span>
                                        </div>
                                    ),
                                )}

                                {/* Tổng tiền thanh toán (tính tay) */}
                                <div className="flex justify-between font-semibold pt-2 mt-2">
                                    <span>Tổng tiền Thanh toán</span>
                                    <span className="text-orange-500 text-lg">
                                        {(
                                            (order.subTotal ?? 0) +
                                            (order.shippingCharges ?? 0) -
                                            (order.orderDiscounts?.reduce(
                                                (sum: number, d: any) =>
                                                    sum +
                                                    (d.discountAmount ?? 0),
                                                0,
                                            ) ?? 0)
                                        ).toLocaleString('vi-VN')}{' '}
                                        đ
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded shadow p-4 flex items-center justify-between">
                            <h2 className="text-2lg font-medium flex items-center gap-2">
                                <Receipt
                                    size={18}
                                    className="text-orange-500"
                                />
                                Doanh thu
                            </h2>
                            <span className="text-3xl font-semibold text-blue-800">
                                {calculateRevenue(order).toLocaleString(
                                    'vi-VN',
                                )}{' '}
                                đ
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bên phải */}
                <div className="space-y-6">
                    {/* Ghi chú */}
                    <div className="bg-white rounded shadow p-4">
                        <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                            <StickyNote size={18} className="text-orange-500" />
                            Ghi chú
                        </h2>
                        <div className="text-sm text-gray-700">
                            {order.note ?? '— Không có ghi chú —'}
                        </div>
                    </div>

                    {/* Lịch sử đơn hàng */}
                    <div className="bg-white rounded shadow p-4">
                        <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                            <Clock size={18} className="text-orange-500" />
                            Lịch sử đơn hàng
                        </h2>
                        <ul className="text-sm text-gray-700 space-y-2">
                            {order.statusHistory?.map((s, idx) => (
                                <li key={idx} className="flex justify-between">
                                    <span
                                        className={
                                            statusColors[
                                            s.status as keyof typeof statusColors
                                            ]
                                        }
                                    >
                                        {s.status}
                                    </span>
                                    <span>
                                        {new Date(s.timestamp).toLocaleString(
                                            'vi-VN',
                                        )}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
