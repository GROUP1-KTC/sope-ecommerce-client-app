"use client";
import { useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Register ChartJS components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

// Constants
const metrics = [
  { label: "Doanh số", value: "₫0", change: "0,00%" },
  { label: "Đơn hàng", value: "0", change: "0,00%" },
  { label: "Đơn đã hủy", value: "0", change: "0,00%" },
  { label: "Tỷ lệ chuyển đổi đơn hàng", value: "00,00%", change: "0,00%" },
  { label: "Doanh số trên mỗi đơn hàng", value: "0,00%", change: "0,00%" },
  { label: "Doanh số đơn hủy", value: "0", change: "0,00%" },
  { label: "Đơn hàng đã hoàn trả/hoàn tiền", value: "0", change: "0,00%" },
  {
    label: "Doanh thu các đơn Trả hàng/Hoàn tiền",
    value: "0",
    change: "0,00%",
  },
];

const chartDataMap: Record<string, number[]> = {
  "Doanh số": [-60, -90, 65, 20, 10, 90, 15],
  "Đơn hàng": [10, 20, 40, 30, 70, 60, 80],
  "Đơn đã hủy": [5, 15, 10, 25, 20, 30, 40],
  "Tỷ lệ chuyển đổi đơn hàng": [30, 50, 40, 70, 60, 80, 90],
  "Doanh số trên mỗi đơn hàng": [10, 20, 10, 30, 40, 20, 50],
  "Doanh số đơn hủy": [0, 5, 10, 15, 20, 10, 0],
  "Đơn hàng đã hoàn trả/hoàn tiền": [1, 2, 3, 4, 5, 4, 3],
  "Doanh thu các đơn Trả hàng/Hoàn tiền": [0, 0, 10, 20, 30, 25, 15],
};

const colors = [
  "#ec4899",
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#6366f1",
  "#ef4444",
  "#14b8a6",
  "#8b5cf6",
];

const ITEMS_PER_PAGE = 4;

export default function DynamicMetricChart() {
  const [page, setPage] = useState(0);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    "Doanh số",
    "Đơn hàng",
  ]);
  const maxPage = Math.ceil(metrics.length / ITEMS_PER_PAGE) - 1;

  const handleScroll = (direction: "left" | "right") => {
    if (direction === "left" && page > 0) setPage((prev) => prev - 1);
    else if (direction === "right" && page < maxPage)
      setPage((prev) => prev + 1);
  };

  const handleToggleMetric = (label: string) => {
    setSelectedMetrics((prev) =>
      prev.includes(label) ? prev.filter((m) => m !== label) : [...prev, label]
    );
  };

  const visibleMetrics = metrics.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
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
        position: "top" as const,
        labels: { color: "#444", font: { size: 13 } },
      },
    },
    scales: {
      x: { ticks: { color: "#666" } },
      y: { ticks: { color: "#666" } },
    },
  };

  return (
    <div className="bg-white rounded shadow p-6 space-y-6">
      {/* Title */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Tùy Chọn Chỉ Số</h2>
          <p className="text-sm text-gray-500">
            Chọn các chỉ số để hiển thị trên biểu đồ
          </p>
        </div>
      </div>

      {/* Toggle Metrics */}
      <div className="relative">
        <button
          onClick={() => handleScroll("left")}
          disabled={page === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100 disabled:opacity-30"
        >
          <ChevronLeftIcon />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-12">
          {visibleMetrics.map((m) => (
            <button
              key={m.label}
              onClick={() => handleToggleMetric(m.label)}
              className={`text-start border rounded p-4 transition ${
                selectedMetrics.includes(m.label)
                  ? "bg-pink-100 border-pink-400"
                  : "bg-white shadow hover:bg-gray-100"
              }`}
            >
              <p className="text-sm text-gray-500">{m.label}</p>
              <p className="text-lg font-semibold">{m.value}</p>
              <p className="text-xs text-gray-400">— {m.change}</p>
            </button>
          ))}
        </div>

        <button
          onClick={() => handleScroll("right")}
          disabled={page === maxPage}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100 disabled:opacity-30"
        >
          <ChevronRightIcon />
        </button>
      </div>

      {/* Chart */}
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
