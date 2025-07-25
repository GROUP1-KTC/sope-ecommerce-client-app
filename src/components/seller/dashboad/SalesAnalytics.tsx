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

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Filler,
);

const metrics = [
    { label: 'Doanh số', value: '₫0', change: '0,00%' },
    { label: 'Đơn hàng', value: '0', change: '0,00%' },
    { label: 'Đơn đã hủy', value: '0', change: '0,00%' },
    { label: 'Tỷ lệ chuyển đổi đơn hàng', value: '00,00%', change: '0,00%' },
    { label: 'Doanh số trên mỗi đơn hàng', value: '0,00%', change: '0,00%' },
    { label: 'Doanh số đơn hủy', value: '0', change: '0,00%' },
    { label: 'Đơn hàng đã hoàn trả/hoàn tiền', value: '0', change: '0,00%' },
    {
        label: 'Doanh thu các đơn Trả hàng/Hoàn tiền',
        value: '0',
        change: '0,00%',
    },
];

const chartDataMap: Record<string, number[]> = {
    'Doanh số': [-60, -90, 65, 20, 10, 90, 15],
    'Đơn hàng': [10, 20, 40, 30, 70, 60, 80],
    'Đơn đã hủy': [5, 15, 10, 25, 20, 30, 40],
    'Tỷ lệ chuyển đổi đơn hàng': [30, 50, 40, 70, 60, 80, 90],
    'Doanh số trên mỗi đơn hàng': [10, 20, 10, 30, 40, 20, 50],
    'Doanh số đơn hủy': [0, 5, 10, 15, 20, 10, 0],
    'Đơn hàng đã hoàn trả/hoàn tiền': [1, 2, 3, 4, 5, 4, 3],
    'Doanh thu các đơn Trả hàng/Hoàn tiền': [0, 0, 10, 20, 30, 25, 15],
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

export default function DynamicMetricChart() {
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
        if (direction === 'right') {
            metricRef.current.scrollBy({ left: width / 2, behavior: 'smooth' });
        } else {
            metricRef.current.scrollBy({
                left: -width / 2,
                behavior: 'smooth',
            });
        }
    };

    const handleToggleMetric = (label: string) => {
        setSelectedMetrics((prev) =>
            prev.includes(label)
                ? prev.filter((m) => m !== label)
                : [...prev, label],
        );
    };

    const labels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
    ];
    const datasets = selectedMetrics.map((label, idx) => ({
        label,
        data: chartDataMap[label],
        borderColor: colors[idx % colors.length],
        backgroundColor: `${colors[idx % colors.length]}33`,
        fill: false,
        pointRadius: 4,
        tension: 0.4,
    }));

    const data = { labels, datasets };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: { color: '#444', font: { size: 13 } },
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

        metricContainer?.addEventListener('scroll', handleMetricScroll);

        return () => {
            metricContainer?.removeEventListener('scroll', handleMetricScroll);
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
                        aria-label="Scroll left"
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
                        aria-label="Scroll right"
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
