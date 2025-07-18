import { Card } from "../common/Card";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function ChatStatisticsCard() {
  return (
    <Card className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
      <div>
        <h2 className="text-base font-semibold text-gray-800">
          Quản lý Chat <span className="text-gray-400">(Hiệu quả Chat)</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <div>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            Lượt chat{" "}
            <span title="Số lượt người mua chat với shop">
              <HelpOutlineIcon fontSize="small" />
            </span>
          </div>
          <div className="text-2xl font-bold">0</div>
          <div className="text-xs text-gray-400">
            so với 30 ngày trước đó <span className="ml-1">0,00%</span>
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            Chat Response Rate{" "}
            <span title="Tỉ lệ phản hồi">
              <HelpOutlineIcon fontSize="small" />
            </span>
          </div>
          <div className="text-2xl font-bold">-</div>
          <div className="text-xs text-gray-400">so với 30 ngày trước đó -</div>
        </div>

        <div>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            Thời gian phản hồi{" "}
            <span title="Thời gian trung bình để phản hồi">
              <HelpOutlineIcon fontSize="small" />
            </span>
          </div>
          <div className="text-2xl font-bold">00:00:00</div>
          <div className="text-xs text-gray-400">
            so với 30 ngày trước đó 0,00%
          </div>
        </div>
      </div>
    </Card>
  );
}
