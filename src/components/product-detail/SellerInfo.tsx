import Image from 'next/image';

const SellerInfo = () => {
  return (
    <div className="flex items-center bg-white border border-gray-200 rounded-xl p-6 mt-4 transition-all duration-300">
      {/* Logo + Tên Shop */}
      <div className="flex items-center gap-6">
        <Image
          src="/logo-shop.png"
          alt="Shop Logo"
          width={64}
          height={64}
          className="rounded-full border-2 border-gray-200 object-cover"
        />
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-gray-900">Kocikids Official Store</h2>
          <p className="text-xs text-gray-400">Online 3 Giờ Trước</p>
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
          <div className="text-red-600 font-semibold">141,1k</div>
        </div>
        <div className="space-y-1">
          <div>Tỉ Lệ Phản Hồi</div>
          <div className="text-red-600 font-semibold">100%</div>
        </div>
        <div className="space-y-1">
          <div>Tham Gia</div>
          <div className="text-red-600 font-semibold">5 năm trước</div>
        </div>
        <div className="space-y-1">
          <div>Sản Phẩm</div>
          <div className="text-red-600 font-semibold">436</div>
        </div>
        <div className="space-y-1">
          <div>Thời Gian Phản Hồi</div>
          <div className="text-red-600 font-semibold">trong vài giờ</div>
        </div>
        <div className="space-y-1">
          <div>Người Theo Dõi</div>
          <div className="text-red-600 font-semibold">95,1k</div>
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;