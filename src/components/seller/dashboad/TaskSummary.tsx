const tasks = [
  { label: "Chờ Lấy Hàng", count: 0 },
  { label: "Đã Xử Lý", count: 0 },
  { label: "Đơn Trả hàng/Hoàn tiền/Hủy", count: 0 },
  { label: "Sản Phẩm Bị Tạm Khóa", count: 0 },
];

export default function TaskSummary() {
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
            <p className="text-2xl font-bold text-blue-600">{task.count}</p>
            <p className="text-sm text-gray-500 mt-2">{task.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
