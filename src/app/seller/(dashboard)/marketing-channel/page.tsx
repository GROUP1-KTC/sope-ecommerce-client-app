'use client';

const MarketingChannel = () => {
	const notifications = [
		{
			title: 'Đẩy doanh số với Số Dư Tiếp Thị Liên Kết',
			desc: 'Đẩy doanh số cùng KOL miễn phí với Số Dư Tiếp Thị Liên Kết mới Nhận lên đến 250K...',
			time: 'Hôm nay 00:00',
		},
		{
			title: 'Học hỏi & chia sẻ cùng NBH Shopee',
			desc: 'LẬP NGHIỆP VỚI SHOPEE – Cộng đồng NBH Shopee cùng nhau hiện thực hóa giấc...',
			time: 'Hôm qua 00:00',
		},
		{
			title: '😍BỨT PHÁ CÙNG QUẢNG CÁO META😍',
			desc: 'Thiết lập dễ dàng chỉ trong 3 bước đơn giản 🎯Giải pháp phù hợp cho tất cả Nhà b...',
			time: '15:35 14-07-2025',
		},
	];

	const marketingTools = [
		{
			icon: '🏷️',
			title: 'Khuyến Mãi của Shop',
			label: { text: 'Gia tăng doanh số bán hàng', color: 'blue' },
			desc: 'Công cụ tăng đơn hàng bằng cách tạo chương trình giảm giá',
		},
		{
			icon: '🛒',
			title: 'Flash Sale Của Shop',
			label: { text: 'Gia tăng doanh số bán hàng', color: 'blue' },
			desc: 'Công cụ giúp tăng doanh số bằng cách tạo khuyến mãi khủng trong các khung giờ',
		},
		{
			icon: '🎟️',
			title: 'Mã Giảm Giá Của Shop',
			label: { text: 'Gia tăng doanh số bán hàng', color: 'blue' },
			desc: 'Công cụ tăng đơn hàng bằng cách tạo mã giảm giá tặng cho người mua',
		},
		{
			icon: '📢',
			title: 'Quảng cáo Shopee',
			label: { text: 'Tăng lượt truy cập', color: 'orange' },
			desc: 'Tăng mức độ hiển thị sản phẩm, thúc đẩy doanh số bán hàng',
		},
		{
			icon: '🛍️',
			title: 'Tăng Đơn Cùng KOL',
			label: { text: 'Tăng lượt truy cập', color: 'orange' },
			desc: 'Tận dụng mạng lưới đối tác tiếp thị liên kết rộng lớn của Shopee để đẩy mạnh doanh số',
		},
		{
			icon: '��',
			title: 'Shopee Live',
			label: { text: 'Cải thiện mức tương tác', color: 'green' },
			desc: 'Kết nối trực tuyến với người mua và trả lời các câu hỏi liên quan đến việc mua hàng',
		},
	];

	return (
		<div className="p-6 bg-gray-50 min-h-screen">
			{/* Notifications */}
			<div className="bg-white rounded-lg shadow p-4 mb-8">
				<div className="flex">
					<h2 className="text-xl font-semibold mb-4">Thông báo</h2>
					<div className="flex items-center ml-auto text-blue-600 cursor-pointer whitespace-nowrap">Xem thêm &rarr;</div>
				</div>
				<div className="flex flex-col md:flex-row gap-4">
					{notifications.map((n, i) => (
						<div key={i} className="flex-1 bg-gray-100 rounded p-4 min-w-[220px]">
							<div className="font-semibold text-base mb-1">{n.title}</div>
							<div className="text-gray-600 text-sm mb-2 truncate">{n.desc}</div>
							<div className="text-xs text-gray-400">{n.time}</div>
						</div>
					))}
				</div>
			</div>

			{/* Marketing Tools */}
			<div className="bg-white rounded-lg shadow p-4">
				<h2 className="text-xl font-semibold mb-6">Công Cụ Marketing</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					{marketingTools.map((tool, i) => (
						<div key={i} className="flex items-start gap-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
							<div className="text-3xl">{tool.icon}</div>
							<div>
								<div className="flex items-center gap-2 mb-1">
									<span className="font-semibold">{tool.title}</span>
									<span className={`text-xs px-2 py-0.5 rounded ${tool.label.color === 'blue'
										? 'bg-blue-100 text-blue-700'
										: tool.label.color === 'orange'
											? 'bg-orange-100 text-orange-700'
											: 'bg-green-100 text-green-700'
										}`}>
										{tool.label.text}
									</span>
								</div>
								<div className="text-sm text-gray-600">{tool.desc}</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Shopee Programs */}
			<div className="bg-white rounded-lg shadow p-4 mt-8">
				<div className="flex items-center mb-6">
					<h2 className="text-xl font-semibold">Chương trình Shopee</h2>
					<div className="flex items-center ml-auto text-blue-600 cursor-pointer whitespace-nowrap">Xem thêm &rarr;</div>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					{[
						{
							img: '/assets/images/bigcat.jpg',
							title: 'Gói Voucher Xtra',
							status: 'Vẫn còn thời gian đề cử',
							badge: 'Voucher Xtra',
						},
						{
							img: '/assets/images/cathuhu.jpg',
							title: 'Gói Content Xtra',
							status: 'Vẫn còn thời gian đề cử',
							badge: 'Content Xtra',
						},
						{
							img: '/assets/images/meomeo.jpg',
							title: 'SIÊU HỘI NHÀ CỬA X SHOPEE HOME JULY',
							status: <span>Thời gian đăng ký sớm nhất <span className="text-red-500 font-semibold">kết thúc</span> trong <span className="font-semibold">1 giờ 4...</span></span>,
							badge: 'Đăng ký sản phẩm',
						},
						{
							img: '/assets/images/bigcat.jpg',
							title: 'RẺ VÔ ĐỊCH',
							status: 'Vẫn còn thời gian đề cử',
							badge: 'Rẻ Vô Địch',
						},
						{
							img: '', // No image, use fallback
							title: 'Shopee For Students 2025',
							status: <span>Thời gian đăng ký sớm nhất <span className="text-red-500 font-semibold">kết thúc</span> trong <span className="font-semibold">7 ngày ...</span></span>,
							badge: 'Đăng ký sản phẩm',
							fallback: <div className="flex items-center justify-center w-full h-full text-orange-500 text-2xl font-bold">SHOPEE<br />BOOKCLUB</div>,
						},
					].map((program, i) => (
						<div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm flex flex-col">
							<div className="relative h-28 bg-gray-100 flex items-center justify-center">
								{program.img ? (
									<img src={program.img} alt={program.title} className="object-cover w-full h-full" />
								) : (
									program.fallback
								)}
								<span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-0.5 rounded">{program.badge}</span>
							</div>
							<div className="p-4 flex-1 flex flex-col">
								<div className="font-semibold text-lg mb-2">{program.title}</div>
								<div className="text-gray-500 text-sm mt-auto">{program.status}</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default MarketingChannel;
