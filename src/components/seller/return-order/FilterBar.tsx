type Props = {
  selected: string;
  onChange: (value: string) => void;
};

export default function FilterBar({ selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 items-center my-2">
      <span className="text-sm font-medium">Ưu tiên</span>
      {["Tất cả", "Hết hạn sau 1 ngày", "Hết hạn sau 2 ngày"].map((label) => (
        <button
          key={label}
          onClick={() => onChange(label)}
          className={`border px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
            selected === label
              ? "bg-blue-100 border-red-600 text-red-800"
              : "border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
