type Props = {
  filters: {
    query: string;
    action: string;
  };
  onChange: (filters: { query: string; action: string }) => void;
};

export default function RequestToolbar({ filters, onChange }: Props) {
  return (
    <div className="flex items-center justify-between my-4 w-full">
      <label className="flex items-center gap-2">
        Tìm yêu cầu
        <input
          value={filters.query}
          onChange={(e) => onChange({ ...filters, query: e.target.value })}
          placeholder="Điền Mã yêu cầu / Mã đơn hàng / Mã vận đơn"
          className="border rounded px-3 py-1 w-[315px] text-sm"
        />
      </label>

      <label className="flex items-center gap-2">
        Toàn bộ thao tác
        <select
          value={filters.action}
          onChange={(e) => onChange({ ...filters, action: e.target.value })}
          className="border rounded px-2 py-1 text-sm"
        >
          <option>Thương lượng với Người mua</option>
          <option>Cần cung cấp bằng chứng</option>
          <option>Giữ lại kiện hàng</option>
          <option>Kiểm tra hàng hoàn</option>
          <option>Hoàn tiền một phần</option>
          <option>Hoàn tiền toàn phần</option>
          <option>Phản hồi quyết định hoàn tiền của Sope</option>
        </select>
      </label>
    </div>
  );
}
