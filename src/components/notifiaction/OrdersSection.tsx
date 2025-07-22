import React from 'react';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface Order {
    id: string;
    date: string;
    status: 'completed' | 'cancelled' | 'processing';
    items: number;
    total: number;
}

const formatCurrency = (number: number): string => {
    return number
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.') // Use dot as thousands separator
        .concat(' đ');
};

interface OrdersSectionProps {
    orders: Order[];
}

const OrdersSection: React.FC<OrdersSectionProps> = ({ orders }) => {
    return (
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
                                    {order.status === 'completed' && (
                                        <span
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                padding: '2px 10px',
                                                borderRadius: '9999px',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                                backgroundColor: '#d1fae5',
                                                color: '#065f46',
                                            }}
                                        >
                                            <CheckCircleIcon
                                                style={{ marginRight: '4px' }}
                                                fontSize="small"
                                            />
                                            Hoàn thành
                                        </span>
                                    )}
                                    {order.status === 'cancelled' && (
                                        <span
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                padding: '2px 10px',
                                                borderRadius: '9999px',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                                backgroundColor: '#fee2e2',
                                                color: '#991b1b',
                                            }}
                                        >
                                            <CancelIcon
                                                style={{ marginRight: '4px' }}
                                                fontSize="small"
                                            />
                                            Đã hủy
                                        </span>
                                    )}
                                    {order.status === 'processing' && (
                                        <span
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                padding: '2px 10px',
                                                borderRadius: '9999px',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                                backgroundColor: '#fffbe6',
                                                color: '#b45309',
                                            }}
                                        >
                                            <AccessTimeIcon
                                                style={{ marginRight: '4px' }}
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
    );
};

export default OrdersSection;
