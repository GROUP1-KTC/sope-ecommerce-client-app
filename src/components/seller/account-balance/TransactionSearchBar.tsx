export default function TransactionSearchBar() {
  return (
    <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 mt-6">
      <div className="flex items-center border rounded overflow-hidden w-full max-w-md">
        <input
          type="text"
          placeholder="Tìm kiếm đơn hàng"
          className="px-3 py-2 w-full text-sm outline-none"
        />
        <button className="bg-gray-100 px-3 py-2 text-sm text-gray-600">
          🔍
        </button>
      </div>

      <div className="flex gap-2">
        <button className="border px-4 py-2 rounded text-sm text-gray-700">
          Xuất
        </button>
        <button className="border px-3 py-2 rounded text-sm text-gray-700">
          ☰
        </button>
      </div>
    </div>
  );
}
