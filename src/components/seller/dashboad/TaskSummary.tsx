'use client';

import { OrderGroupShop } from "~/types/orders/order";
import { ProductResponse } from "~/types/products";

interface TaskSummaryProps {
    orders: OrderGroupShop[];
    products: ProductResponse[];
}

export default function TaskSummary({ orders, products }: TaskSummaryProps) {
    const pendingCount = orders.filter((o) => o.order.status === 'PENDING').length;
    const confirmedCount = orders.filter((o) => o.order.status === 'CONFIRMED').length;
    const deliveredCount = orders.filter((o) => o.order.status === 'DELIVERED').length;
    const rejectedProducts = products.filter((p) => p.status === 'REJECTED').length;

    const tasks = [
        { label: 'Chờ xử lý', count: pendingCount },
        { label: 'Chờ lấy hàng', count: confirmedCount },
        { label: 'Đã giao hàng', count: deliveredCount },
        { label: 'Sản phẩm bị tạm khóa', count: rejectedProducts },
    ];

    return (
        <div className="bg-white rounded shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                Danh sách cần làm
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {tasks.map((task) => (
                    <div
                        key={task.label}
                        className="flex flex-col items-center justify-center border border-gray-200 rounded-xl py-6 hover:shadow-lg transition duration-300"
                    >
                        <p className="text-2xl font-bold text-red-600">{task.count}</p>
                        <p className="text-sm text-gray-500 mt-2">{task.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
