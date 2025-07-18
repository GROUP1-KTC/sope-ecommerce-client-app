type Props = {
  active: string;
  onChange: (tab: string) => void;
};

const subTabs = [
  "Tất cả",
  "Đang trả hàng cho Người bán",
  "Đã hoàn tiền cho Người mua",
  "Đã khiếu nại đến Shopee",
  "Yêu cầu bị hủy/không hợp lệ",
  "Đã gửi yêu cầu",
];

export default function SubTabs({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap space-x-1 items-center gap-3 my-3">
      {subTabs.map((tab) => (
        <button
          key={tab}
          onChange={() => onChange(tab)}
          className={`text-sm ${
            active === tab ? "text-red-500 font-medium" : "text-gray-600"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
