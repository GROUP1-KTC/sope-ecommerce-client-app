export default function ExportButtons() {
  return (
    <div className="flex justify-end space-x-2 my-2">
      <button className="border px-4 py-1 bg-gray-100 rounded hover:bg-gray-200">
        Export
      </button>
      <button className="border px-4 py-1  bg-gray-100 rounded hover:bg-gray-200">
        Report Export History
      </button>
    </div>
  );
}
