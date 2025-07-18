'use client';

const DashBoardSeller = () => {
	return (
		<div className="space-y-6">
			{/* Hàng 1: Danh sách cần làm + Hiệu quả bán hàng */}
			<div className="flex gap-6">
				<div className="flex-1 bg-white rounded-lg shadow p-6">
					<h2 className="font-semibold text-lg mb-2">Danh sách cần làm</h2>
					<div className="flex justify-between text-center mt-4">
						<div>
							<div className="text-2xl font-bold text-blue-600">0</div>
							<div className="text-xs text-gray-500 mt-1">Chờ Lấy Hàng</div>
						</div>
						<div>
							<div className="text-2xl font-bold text-blue-600">0</div>
							<div className="text-xs text-gray-500 mt-1">Đã Xử Lý</div>
						</div>
						<div>
							<div className="text-2xl font-bold text-blue-600">1</div>
							<div className="text-xs text-gray-500 mt-1">Đơn Trả hàng/Hoàn tiền/Hủy</div>
						</div>
						<div>
							<div className="text-2xl font-bold text-blue-600">0</div>
							<div className="text-xs text-gray-500 mt-1">Sản Phẩm Bị Tạm Khóa</div>
						</div>
						<div>
							<div className="text-2xl font-bold text-blue-600">122</div>
							<div className="text-xs text-gray-500 mt-1">Tham gia Đấu Giá Rẻ Vô Địch</div>
						</div>
					</div>
				</div>
				<div className="w-1/3 bg-white rounded-lg shadow p-6 flex flex-col justify-between">
					<div>
						<h2 className="font-semibold text-lg mb-2">Hiệu quả bán hàng</h2>
						<div className="text-green-600 font-semibold text-xl">Xuất sắc</div>
						<div className="text-xs text-gray-500 mt-1">Tất cả chỉ số đều tốt!</div>
					</div>
					<button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm self-start">Xem chi tiết</button>
				</div>
			</div>

			{/* Hàng 2: Phân tích bán hàng + Tin nổi bật */}
			<div className="flex gap-6">
				<div className="flex-1 bg-white rounded-lg shadow p-6">
					<h2 className="font-semibold text-lg mb-2">Phân Tích Bán Hàng <span className='text-xs text-gray-400'>(Hôm nay 00:00 GMT+7 22:00)</span></h2>
					<div className="grid grid-cols-5 gap-4 mt-4">
						<div className="text-center">
							<div className="text-lg font-bold">₫275.6K</div>
							<div className="text-xs text-gray-500">Doanh số</div>
							<div className="text-xs text-red-500">▼ 33,23%</div>
						</div>
						<div className="text-center">
							<div className="text-lg font-bold">91</div>
							<div className="text-xs text-gray-500">Lượt truy cập</div>
							<div className="text-xs text-red-500">▼ 8,08%</div>
						</div>
						<div className="text-center">
							<div className="text-lg font-bold">125</div>
							<div className="text-xs text-gray-500">Product Clicks</div>
							<div className="text-xs text-green-600">▲ 10,62%</div>
						</div>
						<div className="text-center">
							<div className="text-lg font-bold">2</div>
							<div className="text-xs text-gray-500">Đơn hàng</div>
							<div className="text-xs text-red-500">▼ 66,67%</div>
						</div>
						<div className="text-center">
							<div className="text-lg font-bold">1,60%</div>
							<div className="text-xs text-gray-500">Order Conversion Rate</div>
							<div className="text-xs text-red-500">▼ 3,71%</div>
						</div>
					</div>
				</div>
				<div className="w-1/3 bg-white rounded-lg shadow p-6">
					<h2 className="font-semibold text-lg mb-2">Tin Nổi Bật</h2>
					<div className="bg-blue-50 rounded p-3 flex items-center gap-3 mb-2">
						<div className="w-16 h-16 bg-blue-200 rounded flex items-center justify-center text-2xl font-bold text-blue-600">AD</div>
						<div>
							<div className="font-semibold text-sm">Tất tần tật tính năng Shopee Live</div>
							<div className="text-xs text-gray-500">Xem ngay các tính năng nổi bật của Shopee Live tại đây</div>
							<div className="text-xs text-gray-400 mt-1">Hôm Nay 00:00</div>
						</div>
					</div>
					<div className="bg-blue-50 rounded p-3 flex items-center gap-3">
						<div className="w-16 h-16 bg-blue-200 rounded flex items-center justify-center text-2xl font-bold text-blue-600">AD</div>
						<div>
							<div className="font-semibold text-sm">Chính sách mới về vận chuyển</div>
							<div className="text-xs text-gray-500">Cập nhật chính sách vận chuyển mới nhất từ Shopee</div>
							<div className="text-xs text-gray-400 mt-1">Hôm Qua 18:00</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashBoardSeller;
