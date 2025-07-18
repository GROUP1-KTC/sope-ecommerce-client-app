import React from "react";
import Image from "next/image";

const AllProducts = () => {
	return (
		<div className="p-6 bg-white rounded shadow">
			<div className="text-lg font-semibold mb-6 flex items-center  justify-between gap-2">
				<div>
					Products
				</div>
				<div className="flex gap-2 items-center">
					<option className="border-2 p-2 border-grey-400 rounded-xl">Set up for product</option>
					<option className="border-2 p-2 border-grey-400 rounded-xl">Processing tool</option>
					<button className="bg-orange-500 text-white p-2 rounded font-semibold hover:bg-orange-600 transition">+ Add product</button>
				</div>
			</div>
			{/* Header and Tabs */}
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-8 text-base font-medium">
					<button className="text-orange-500 border-b-2 border-orange-500 pb-2">Tất cả</button>
					<button className="text-gray-700">Đang hoạt động (57)</button>
					<button className="text-gray-700">Vi phạm (0)</button>
					<button className="text-gray-700">Chờ duyệt bởi Shopee (0)</button>
					<button className="text-gray-700">Chưa được đăng (0)</button>
				</div>
			</div>

			{/* Banner */}
			<div className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded p-4 mb-6">
				<div className="text-orange-600 font-medium">
					Tham gia ngay Đấu Giá Rẻ Vô Địch để gia tăng <span className="font-bold">Lượt Truy Cập Miễn Phí & Nhãn Rẻ Vô Địch</span>
				</div>
				<button className="border border-orange-500 text-orange-500 px-4 py-1 rounded hover:bg-orange-100 transition">Đấu giá ngay</button>
			</div>

			{/* Search and Filter Bar */}
			<div className="flex flex-wrap gap-4 items-center mb-4">
				<input className="border rounded px-3 py-2 w-64" placeholder="Select for product" />
				<input className="border rounded px-3 py-2 w-64" placeholder="Select for category" />
				<select className="border rounded px-3 py-2 w-48 text-gray-500">
					<option>Loại Sản phẩm</option>
				</select>
				<button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">Áp dụng</button>
				<button className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition">Đặt lại</button>
			</div>

			{/* Product Count and Limit */}
			<div className="mb-4 text-gray-700">
				<span className="font-semibold">57 Sản Phẩm</span> <span className="ml-2 text-sm">Hạn mức đăng bán: 5000</span>
			</div>

			{/* Product List Table */}
			<div className="border rounded overflow-x-auto">
				<table className="min-w-full bg-white">
					<thead>
						<tr className="bg-gray-50 text-gray-700 text-sm">
							<th className="p-3 border-b text-left w-10"><input type="checkbox" /></th>
							<th className="p-3 border-b text-left">Tên sản phẩm</th>
							<th className="p-3 border-b text-center">Doanh số</th>
							<th className="p-3 border-b text-center">Giá</th>
							<th className="p-3 border-b text-center">Kho hàng</th>
							<th className="p-3 border-b text-center">Chất Lượng Nội Dung</th>
							<th className="p-3 border-b text-center">Thao tác</th>
						</tr>
					</thead>
					<tbody>
						<tr className="hover:bg-orange-50 border-b">
							<td className="p-3 align-top"><input type="checkbox" /></td>
							<td className="p-3 align-top flex gap-3">
								<Image src="/assets/images/meomeo.jpg" width={90} height={90} alt="product" className="object-cover rounded border" />
								<div>
									<div className="font-semibold text-gray-900">Mao hoà tốc - Giá vẽ tranh [3 SIZE] Gỗ Thông Tự Nhiên, Các Loại Cỡ , ( Kích Thước 36*65 , 50*110, 55*130)</div>
									<div className="text-xs text-gray-500 mt-1">ID: 29970884185</div>
								</div>
							</td>
							<td className="p-3 align-top text-center">9</td>
							<td className="p-3 align-top text-center">
								<div className="text-gray-900">₫105.000 - ₫160.000</div>
								<div className="text-xs text-red-500">Cơ hội gia tăng hiển thị với Đấu Giá Rẻ Vô Địch!</div>
							</td>
							<td className="p-3 align-top text-center">96</td>
							<td className="p-3 align-top text-center">
								<div className="text-gray-900">Đạt chuẩn</div>
								<div className="text-xs text-yellow-600">Có 3 yếu tố cần điều chỉnh để bài đăng tốt hơn</div>
							</td>
							<td className="p-3 align-top text-center">
								<div className="flex flex-col gap-1 items-center">
									<a href="#" className="text-blue-600 hover:underline text-sm">Cập nhật</a>
									<a href="#" className="text-blue-600 hover:underline text-sm">Quảng cáo</a>
									<a href="#" className="text-blue-600 hover:underline text-sm">Xem thêm</a>
								</div>
							</td>
						</tr>
						{/* More rows can be mapped here */}
					</tbody>
					<tbody>
						<tr className="hover:bg-orange-50 border-b">
							<td className="p-3 align-top"><input type="checkbox" /></td>
							<td className="p-3 align-top flex gap-3">
								<Image src="/assets/images/bigcat.jpg" width={90} height={90} alt="product" className="object-cover rounded border" />
								<div>
									<div className="font-semibold text-gray-900">Mao hoà tốc - Giá vẽ tranh [3 SIZE] Gỗ Thông Tự Nhiên, Các Loại Cỡ , ( Kích Thước 36*65 , 50*110, 55*130)</div>
									<div className="text-xs text-gray-500 mt-1">ID: 29970884185</div>
								</div>
							</td>
							<td className="p-3 align-top text-center">9</td>
							<td className="p-3 align-top text-center">
								<div className="text-gray-900">₫105.000 - ₫160.000</div>
								<div className="text-xs text-red-500">Cơ hội gia tăng hiển thị với Đấu Giá Rẻ Vô Địch!</div>
							</td>
							<td className="p-3 align-top text-center">96</td>
							<td className="p-3 align-top text-center">
								<div className="text-gray-900">Đạt chuẩn</div>
								<div className="text-xs text-yellow-600">Có 3 yếu tố cần điều chỉnh để bài đăng tốt hơn</div>
							</td>
							<td className="p-3 align-top text-center">
								<div className="flex flex-col gap-1 items-center">
									<a href="#" className="text-blue-600 hover:underline text-sm">Cập nhật</a>
									<a href="#" className="text-blue-600 hover:underline text-sm">Quảng cáo</a>
									<a href="#" className="text-blue-600 hover:underline text-sm">Xem thêm</a>
								</div>
							</td>
						</tr>
						{/* More rows can be mapped here */}
					</tbody>
					<tbody>
						<tr className="hover:bg-orange-50 border-b">
							<td className="p-3 align-top"><input type="checkbox" /></td>
							<td className="p-3 align-top flex gap-3">
								<Image src="/assets/images/cathuhu.jpg" width={90} height={90} alt="product" className="object-cover rounded border" />
								<div>
									<div className="font-semibold text-gray-900">Mao hoà tốc - Giá vẽ tranh [3 SIZE] Gỗ Thông Tự Nhiên, Các Loại Cỡ , ( Kích Thước 36*65 , 50*110, 55*130)</div>
									<div className="text-xs text-gray-500 mt-1">ID: 29970884185</div>
								</div>
							</td>
							<td className="p-3 align-top text-center">9</td>
							<td className="p-3 align-top text-center">
								<div className="text-gray-900">₫105.000 - ₫160.000</div>
								<div className="text-xs text-red-500">Cơ hội gia tăng hiển thị với Đấu Giá Rẻ Vô Địch!</div>
							</td>
							<td className="p-3 align-top text-center">96</td>
							<td className="p-3 align-top text-center">
								<div className="text-gray-900">Đạt chuẩn</div>
								<div className="text-xs text-yellow-600">Có 3 yếu tố cần điều chỉnh để bài đăng tốt hơn</div>
							</td>
							<td className="p-3 align-top text-center">
								<div className="flex flex-col gap-1 items-center">
									<a href="#" className="text-blue-600 hover:underline text-sm">Cập nhật</a>
									<a href="#" className="text-blue-600 hover:underline text-sm">Quảng cáo</a>
									<a href="#" className="text-blue-600 hover:underline text-sm">Xem thêm</a>
								</div>
							</td>
						</tr>
						{/* More rows can be mapped here */}
					</tbody>
				</table>
			</div>


		</div>
	);
};

export default AllProducts;
