'use client';
import { useEffect, useRef, useState } from 'react';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { OrderGroupShop } from '~/types/orders/order';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Filler,
);

interface SalesAnalyticsProps {
    orders: OrderGroupShop[];
}

const calculateRevenue = (order: any) => {
    const subTotal =
        order.items?.reduce(
            (sum: number, item: any) => sum + item.price * item.quantity,
            0,
        ) ?? 0;

    const shopDiscount =
        order.orderDiscounts
            ?.filter((d: any) => d.scope === 'SHOP')
            .reduce((sum: number, d: any) => sum + d.discountAmount, 0) ?? 0;

    const afterDiscount = subTotal - shopDiscount;

    const commission =
        order.items?.reduce((sum: number, item: any) => {
            return (
                sum +
                item.price * item.quantity * (item.commissionFeePercent / 100)
            );
        }, 0) ?? 0;

    return afterDiscount - commission;
};

export default function SalesAnalytics({ orders }: SalesAnalyticsProps) {
    // ====== TÍNH METRICS ======
    const totalOrders = orders.length;

    // chỉ lấy trạng thái hợp lệ
    const completedOrders = orders.filter(
        (o) => o.order.status === 'CONFIRMED',
    ); // DELIVERED
    const cancelledOrders = orders.filter(
        (o) => o.order.status === 'CANCELLED',
    );

    // doanh thu shop = subTotal (không tính shippingCharges)
    const calcRevenue = (list: OrderGroupShop[]) =>
        list.reduce((sum, o) => sum + calculateRevenue(o.order), 0);

    const totalSales = calcRevenue(completedOrders);

    console.log('check totalSales', totalSales);

    const cancelledSales = calcRevenue(cancelledOrders);

    const conversionRate =
        totalOrders > 0
            ? ((completedOrders.length / totalOrders) * 100).toFixed(2) + '%'
            : '0%';

    const avgSalesPerOrder =
        completedOrders.length > 0
            ? (totalSales / completedOrders.length).toFixed(0)
            : '0';

    const metrics = [
        {
            label: 'Doanh số',
            value: `₫${totalSales.toLocaleString()}`,
            change: '0,00%',
        },
        { label: 'Đơn hàng', value: `${totalOrders}`, change: '0,00%' },
        {
            label: 'Đơn đã hủy',
            value: `${cancelledOrders.length}`,
            change: '0,00%',
        },
        {
            label: 'Tỷ lệ chuyển đổi đơn hàng',
            value: conversionRate,
            change: '0,00%',
        },
        {
            label: 'Doanh số trên mỗi đơn hàng',
            value: `₫${avgSalesPerOrder}`,
            change: '0,00%',
        },
        {
            label: 'Doanh số đơn hủy',
            value: `₫${cancelledSales.toLocaleString()}`,
            change: '0,00%',
        },
    ];

    // ====== CHUẨN BỊ DỮ LIỆU CHART ======
    const monthLabels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const groupByMonth = (
        filterFn: (o: OrderGroupShop) => boolean,
        valueFn: (o: OrderGroupShop) => number = () => 1,
    ) => {
        const counts = new Array(12).fill(0);
        orders.filter(filterFn).forEach((o) => {
            if (!o.order.createdAt) return;
            const d = new Date(o.order.createdAt);
            const month = d.getMonth();
            counts[month] += valueFn(o);
        });
        return counts;
    };

    const chartDataMap: Record<string, number[]> = {
        // Doanh số
        'Doanh số': groupByMonth(
            (o) => o.order.status === 'DELIVERED',
            (o) => o.order.subTotal || 0,
        ),

        // Tỷ lệ chuyển đổi
        'Tỷ lệ chuyển đổi đơn hàng': monthLabels.map((_, m) => {
            const total = orders.filter(
                (o) =>
                    o.order.createdAt &&
                    new Date(o.order.createdAt).getMonth() === m,
            ).length;
            const done = orders.filter(
                (o) =>
                    o.order.createdAt &&
                    new Date(o.order.createdAt).getMonth() === m &&
                    o.order.status === 'DELIVERED',
            ).length;
            return total > 0 ? (done / total) * 100 : 0;
        }),

        // Doanh số trên mỗi đơn hàng
        'Doanh số trên mỗi đơn hàng': monthLabels.map((_, m) => {
            const monthlyOrders = orders.filter(
                (o) =>
                    o.order.createdAt &&
                    new Date(o.order.createdAt).getMonth() === m &&
                    o.order.status === 'DELIVERED',
            );
            if (monthlyOrders.length === 0) return 0;
            const sales = monthlyOrders.reduce(
                (sum, o) => sum + (o.order.subTotal || 0),
                0,
            );
            return sales / monthlyOrders.length;
        }),

        // Doanh số đơn hủy
        'Doanh số đơn hủy': groupByMonth(
            (o) => o.order.status === 'CANCELLED',
            (o) => o.order.subTotal || 0,
        ),
    };

    const colors = [
        '#ec4899',
        '#3b82f6',
        '#10b981',
        '#f59e0b',
        '#6366f1',
        '#ef4444',
        '#14b8a6',
        '#8b5cf6',
    ];

    // ====== STATE CHỌN CHỈ SỐ ======
    const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
        'Doanh số',
        'Đơn hàng',
    ]);
    const [metricAtStart, setMetricAtStart] = useState(true);
    const [metricAtEnd, setMetricAtEnd] = useState(false);
    const metricRef = useRef<HTMLDivElement>(null);

    const handleScroll = (direction: 'left' | 'right') => {
        if (!metricRef.current) return;
        const width = metricRef.current.offsetWidth;
        metricRef.current.scrollBy({
            left: direction === 'right' ? width / 2 : -width / 2,
            behavior: 'smooth',
        });
    };

    const handleToggleMetric = (label: string) => {
        setSelectedMetrics((prev) =>
            prev.includes(label)
                ? prev.filter((m) => m !== label)
                : [...prev, label],
        );
    };

    const datasets = selectedMetrics.map((label, idx) => ({
        label,
        data: chartDataMap[label],
        borderColor: colors[idx % colors.length],
        backgroundColor: `${colors[idx % colors.length]}33`,
        fill: false,
        pointRadius: 4,
        tension: 0.4,
    }));

    const data = { labels: monthLabels, datasets };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: { color: '#444', font: { size: 13 } },
            },
            tooltip: {
                callbacks: {
                    label: (ctx: any) => {
                        if (ctx.dataset.label?.includes('Doanh số')) {
                            return `${ctx.dataset.label}: ₫${ctx.raw.toLocaleString()}`;
                        }
                        if (ctx.dataset.label?.includes('Tỷ lệ')) {
                            return `${ctx.dataset.label}: ${ctx.raw.toFixed(2)}%`;
                        }
                        return `${ctx.dataset.label}: ${ctx.raw}`;
                    },
                },
            },
        },
        scales: {
            x: { ticks: { color: '#666' } },
            y: { ticks: { color: '#666' } },
        },
    };

    useEffect(() => {
        const metricContainer = metricRef.current;
        if (!metricContainer) return;
        const handleMetricScroll = () => {
            const { scrollLeft, scrollWidth, clientWidth } = metricContainer;
            setMetricAtStart(scrollLeft <= 1);
            setMetricAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
        };
        handleMetricScroll();
        metricContainer.addEventListener('scroll', handleMetricScroll);
        return () => {
            metricContainer.removeEventListener('scroll', handleMetricScroll);
        };
    }, []);

    return (
        <div className="bg-white rounded shadow p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-semibold">Tùy Chọn Chỉ Số</h2>
                    <p className="text-sm text-gray-500">
                        Chọn các chỉ số để hiển thị trên biểu đồ
                    </p>
                </div>
            </div>

            <div className="relative group">
                {!metricAtStart && (
                    <button
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 group-hover:bg-orange-100 group-hover:scale-110 transition-transform duration-150 flex items-center justify-center cursor-pointer opacity-50 group-hover:opacity-100"
                        onClick={() => handleScroll('left')}
                        type="button"
                    >
                        <ChevronLeftIcon className="text-lg text-orange-500" />
                    </button>
                )}

                <div
                    ref={metricRef}
                    style={{
                        scrollBehavior: 'smooth',
                        overflowX: 'auto',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                    className="no-scrollbar flex gap-4 px-6 py-2"
                >
                    {metrics.map((m, index) => (
                        <button
                            key={m.label + index}
                            onClick={() => handleToggleMetric(m.label)}
                            className={`w-48 min-w-[12rem] text-left border rounded-xl p-4 transition-transform duration-150 ease-in-out cursor-pointer hover:shadow-md active:scale-[0.98] ${
                                selectedMetrics.includes(m.label)
                                    ? 'bg-pink-100 border-pink-400'
                                    : 'bg-white border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                            <p className="text-sm text-gray-500">{m.label}</p>
                            <p className="text-xl font-bold text-gray-800 mt-1">
                                {m.value}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                — {m.change}
                            </p>
                        </button>
                    ))}
                </div>

                {!metricAtEnd && (
                    <button
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 group-hover:bg-orange-100 group-hover:scale-110 transition-transform duration-150 flex items-center justify-center cursor-pointer opacity-50 group-hover:opacity-100"
                        onClick={() => handleScroll('right')}
                        type="button"
                    >
                        <ChevronRightIcon className="text-lg text-orange-500" />
                    </button>
                )}
            </div>

            <div className="mt-4">
                <Line data={data} options={options} />
                {selectedMetrics.length === 0 && (
                    <p className="text-center text-gray-400 mt-4">
                        Vui lòng chọn ít nhất 1 chỉ số để hiển thị.
                    </p>
                )}
            </div>
        </div>
    );
}
