// components/CreateShopMultiStep/Step5.tsx
import { Address } from "./types";

interface Step5Props {
  summary: {
    name: string;
    email: string;
    phone: string;
    address: Address | null;
    description: string;
    logoPreview: string | null;
    taxCode: string;
    taxFilePreview: string | null;
    idType: string;
    idName: string;
    idNumber: string;
    previewIdFront: string | null;
    previewIdBack: string | null;
    previewSelfie: string | null;
  };
}

export default function Step5({ summary }: Step5Props) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Xác nhận & Hoàn tất</h3>

      <div className="space-y-3">
        <div>
          <div className="font-medium">Tên shop</div>
          <div className="text-gray-700">{summary.name}</div>
        </div>

        <div>
          <div className="font-medium">Email / SĐT</div>
          <div className="text-gray-700">{summary.email} • {summary.phone}</div>
        </div>

        <div>
          <div className="font-medium">Địa chỉ lấy hàng</div>
          <div className="text-gray-700">
            {!summary.address ? "Chưa có" : (
              <ul className="list-disc ml-6">
                <li key={summary.address.senderName}>{summary.address.senderName} — {summary.address.senderPhone} — {summary.address.street}, {summary.address.ward}, {summary.address.district}, {summary.address.city}</li>
              </ul>
            )}
          </div>
        </div>

        <div>
          <div className="font-medium">Mô tả shop</div>
          <div className="text-gray-700">{summary.description || "-"}</div>
        </div>

        <div>
          <div className="font-medium">Xác minh</div>
          <div className="text-gray-700">{summary.idType} — {summary.idName} — {summary.idNumber}</div>
        </div>

        <div className="mt-4">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              required
              className="w-5 h-5 text-blue-600 bg-white border border-gray-300 rounded cursor-pointer transition"
            />
            <span className="text-sm text-gray-700 hover:text-gray-900 transition">
              Tôi xác nhận thông tin trên là đúng
            </span>
          </label>
        </div>

      </div>
    </div>
  );
}