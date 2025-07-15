import Image from 'next/image';

// Hàm định dạng số lượng lớn thành dạng ngắn gọn
const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace('.0', '') + 'k';
  }
  return num.toString();
};

interface SellerInfoProps {
  sellerInfo: {
    name: string;
    lastestTimeOnline: string;
    shopAvatar: string;
    numOfReviews: number;
    responseRate: number;
    responseTime: string;
    timeActive: string;
    numOfProducts: number;
    numOfFollowers: number;
  };
}

const SellerInfo = ({ sellerInfo }: SellerInfoProps) => {
  return (
    <div className="flex items-center bg-white border border-gray-200 rounded-xl p-6 mt-4 transition-all duration-300">
      {/* Logo + Tên Shop */}
      <div className="flex items-center gap-6">
        <Image
          src={sellerInfo.shopAvatar}
          alt={` Logo`}
          width={64}
          height={64}
          className="rounded-full border-2 border-gray-200 object-cover"
        />
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-gray-900">{sellerInfo.name}</h2>
          <p className="text-xs text-gray-400">{sellerInfo.lastestTimeOnline}</p>
          <div className="flex gap-3 mt-2">
            <button className="flex items-center text-red-600 border border-red-600 px-4 py-1.5 text-sm rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors">
              🛎️ Chat Ngay
            </button>
            <button className="flex items-center border border-gray-300 px-4 py-1.5 text-sm rounded-lg hover:bg-gray-50 transition-colors">
              🏬 Xem Shop
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-8 h-24 border-l border-gray-200" />

      {/* Thông tin shop */}
      <div className="flex-1 grid grid-cols-3 gap-y-3 text-sm text-gray-600">
        <div className="space-y-1">
          <div>Đánh Giá</div>
          <div className="text-red-600 font-semibold">{formatNumber(sellerInfo.numOfReviews)}</div>
        </div>
        <div className="space-y-1">
          <div>Tỉ Lệ Phản Hồi</div>
          <div className="text-red-600 font-semibold">{sellerInfo.responseRate}%</div>
        </div>
        <div className="space-y-1">
          <div>Tham Gia</div>
          <div className="text-red-600 font-semibold">{sellerInfo.timeActive}</div>
        </div>
        <div className="space-y-1">
          <div>Sản Phẩm</div>
          <div className="text-red-600 font-semibold">{sellerInfo.numOfProducts}</div>
        </div>
        <div className="space-y-1">
          <div>Thời Gian Phản Hồi</div>
          <div className="text-red-600 font-semibold">{sellerInfo.responseTime}</div>
        </div>
        <div className="space-y-1">
          <div>Người Theo Dõi</div>
          <div className="text-red-600 font-semibold">{formatNumber(sellerInfo.numOfFollowers)}</div>
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;