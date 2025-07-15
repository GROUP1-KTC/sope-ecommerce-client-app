import React from 'react';

const PrivacyPolicy = () => (
    <div className="min-h-screen bg-gray-50">
        <div className="bg-[#ee4d2d] py-10">
            <h1 className="text-4xl font-bold text-white text-center">
                Chính Sách Bảo Mật
            </h1>
            <p className="text-white text-center mt-2 text-lg">
                Sope E-commerce Privacy Policy
            </p>
        </div>
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8 mt-8 mb-12">
            <p className="mb-4">
                Chào mừng bạn đến với Sope E-commerce. Chúng tôi cam kết bảo vệ
                quyền riêng tư của bạn. Chính sách này giải thích cách chúng tôi
                thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn khi sử
                dụng website của chúng tôi.
            </p>
            <h2 className="text-xl font-semibold mt-8 mb-2 text-[#ee4d2d]">
                1. Thông Tin Chúng Tôi Thu Thập
            </h2>
            <ul className="list-disc pl-6 mb-4">
                <li>
                    Thông tin cá nhân: Họ tên, email, số điện thoại, địa chỉ
                    giao hàng, thông tin thanh toán.
                </li>
                <li>
                    Dữ liệu sử dụng: Trang đã truy cập, thời gian sử dụng, lượt
                    nhấp và dữ liệu phân tích khác.
                </li>
                <li>
                    Cookie: Để cải thiện trải nghiệm người dùng và phân tích.
                </li>
            </ul>
            <h2 className="text-xl font-semibold mt-8 mb-2 text-[#ee4d2d]">
                2. Cách Chúng Tôi Sử Dụng Thông Tin
            </h2>
            <ul className="list-disc pl-6 mb-4">
                <li>Xử lý đơn hàng và giao sản phẩm.</li>
                <li>Liên hệ với bạn về tài khoản hoặc đơn hàng.</li>
                <li>Cải thiện website và dịch vụ.</li>
                <li>Tuân thủ các nghĩa vụ pháp lý.</li>
            </ul>
            <h2 className="text-xl font-semibold mt-8 mb-2 text-[#ee4d2d]">
                3. Chia Sẻ Thông Tin
            </h2>
            <ul className="list-disc pl-6 mb-4">
                <li>Chúng tôi không bán thông tin cá nhân của bạn.</li>
                <li>
                    Có thể chia sẻ với đối tác tin cậy để xử lý đơn hàng và
                    thanh toán.
                </li>
                <li>Có thể tiết lộ thông tin nếu pháp luật yêu cầu.</li>
            </ul>
            <h2 className="text-xl font-semibold mt-8 mb-2 text-[#ee4d2d]">
                4. Bảo Mật Dữ Liệu
            </h2>
            <p className="mb-4">
                Chúng tôi áp dụng các biện pháp bảo mật tiêu chuẩn để bảo vệ dữ
                liệu của bạn. Tuy nhiên, không có phương thức truyền tải nào qua
                Internet là an toàn tuyệt đối.
            </p>
            <h2 className="text-xl font-semibold mt-8 mb-2 text-[#ee4d2d]">
                5. Quyền Lợi Của Bạn
            </h2>
            <ul className="list-disc pl-6 mb-4">
                <li>Truy cập, cập nhật hoặc xóa thông tin cá nhân.</li>
                <li>Hủy nhận thông báo tiếp thị bất cứ lúc nào.</li>
            </ul>
            <h2 className="text-xl font-semibold mt-8 mb-2 text-[#ee4d2d]">
                6. Thay Đổi Chính Sách
            </h2>
            <p className="mb-4">
                Chúng tôi có thể cập nhật chính sách này theo thời gian. Mọi
                thay đổi sẽ được đăng tải tại trang này với ngày hiệu lực mới.
            </p>
            <h2 className="text-xl font-semibold mt-8 mb-2 text-[#ee4d2d]">
                7. Liên Hệ
            </h2>
            <p>
                Nếu bạn có bất kỳ câu hỏi nào về Chính Sách Bảo Mật, vui lòng
                liên hệ:{' '}
                <a
                    href="mailto:support@sope.com"
                    className="text-[#ee4d2d] underline"
                >
                    support@sope.com
                </a>
                .
            </p>
        </div>
    </div>
);

export default PrivacyPolicy;
