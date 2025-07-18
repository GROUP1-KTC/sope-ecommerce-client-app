export default function SearchButton({ onSearch }: { onSearch: () => void }) {
  return (
    <div className="flex space-x-2">
      <button
        onClick={onSearch}
        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
      >
        Tìm kiếm
      </button>
      <button
        onClick={() => location.reload()}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
      >
        Đặt lại
      </button>
    </div>
  );
}
