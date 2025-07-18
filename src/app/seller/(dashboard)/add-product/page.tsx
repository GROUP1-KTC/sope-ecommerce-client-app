const AddProduct = () => {
    return (
        <>
            <div className="relative min-h-screen bg-gray-50">
                {/* Left Sidebar */}
                <aside className="fixed top-20 left-0 w-1/5 border-t h-screen bg-white p-6 border-r overflow-y-auto z-20">
                    <div className="font-bold mb-4">Gợi ý điền Thông tin</div>
                    <ul className="text-sm space-y-2">
                        <li>Thêm ít nhất 3 hình ảnh</li>
                        <li>Thêm video sản phẩm</li>
                        <li>Tên sản phẩm có ít nhất 25–100 kí tự</li>
                        <li>
                            Thêm ít nhất 100 kí tự hoặc 1 hình ảnh trong mô tả
                            sản phẩm
                        </li>
                        <li>Thêm thương hiệu</li>
                        <li>Thêm bảng quy đổi kích cỡ</li>
                        <li>
                            Sử dụng phân loại màu sắc hoặc kích thước chuẩn hóa
                        </li>
                    </ul>
                    <div className="mt-6 text-xs text-gray-500">
                        <b>Ngành hàng</b>
                        <br />
                        Việc đăng tải sản phẩm đúng ngành hàng giúp Người mua dễ
                        dàng tìm thấy sản phẩm của Shop...
                    </div>
                </aside>

                {/* Main Content */}
                <main className="ml-[20%]  mr-[25%] p-8">
                    {/* Tabs */}
                    <div className="flex space-x-4 border-b mb-6">
                        <button className="pb-2 border-b-2 border-orange-500 font-semibold">
                            Thông tin cơ bản
                        </button>
                        <button className="pb-2">Thông tin chi tiết</button>
                        <button className="pb-2">Thông tin bán hàng</button>
                        <button className="pb-2">Vận chuyển</button>
                        <button className="pb-2">Thông tin khác</button>
                    </div>

                    {/* Fundanmental Information */}
                    <div className="bg-white rounded shadow p-6">
                        <h2 className="text-lg font-semibold mb-6">
                            Thông tin cơ bản
                        </h2>

                        {/* Hình ảnh sản phẩm */}
                        <div className="mb-6">
                            <label className="block font-medium mb-2">
                                * Hình ảnh sản phẩm
                            </label>
                            <div className="flex items-center space-x-6 mb-2">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="aspect"
                                        defaultChecked
                                    />
                                    <span>Hình ảnh tỷ lệ 1:1</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input type="radio" name="aspect" />
                                    <span>Hình ảnh tỷ lệ 3:4</span>
                                </label>
                                <a href="#" className="text-blue-500 text-sm">
                                    Ví dụ
                                </a>
                            </div>
                            <div className="flex space-x-6">
                                {/* Upload image placeholder */}
                                <div className="flex flex-col items-center border border-dashed border-gray-300 rounded p-4 w-32 h-32 justify-center text-center cursor-pointer">
                                    <span className="text-orange-500 text-2xl mb-2">
                                        📷
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        Thêm hình ảnh (0/9)
                                    </span>
                                </div>
                                {/* Add more image slots as needed */}
                            </div>
                        </div>

                        {/* Ảnh bìa */}
                        <div className="mb-6">
                            <label className="block font-medium mb-2">
                                Ảnh bìa
                            </label>
                            <div className="flex items-center space-x-4">
                                <div className="flex flex-col items-center border border-dashed border-gray-300 rounded p-4 w-32 h-32 justify-center text-center cursor-pointer">
                                    <span className="text-orange-500 text-2xl mb-2">
                                        🖼️
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        Thêm ảnh bìa
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 max-w-xs">
                                    Tải lên hình ảnh 1:1. Ảnh bìa sẽ được hiển
                                    thị tại các trang Kết quả tìm kiếm...
                                </p>
                            </div>
                        </div>

                        {/* Video sản phẩm */}
                        <div className="mb-6">
                            <label className="block font-medium mb-2">
                                Video sản phẩm
                            </label>
                            <div className="flex items-center space-x-4">
                                <div className="flex flex-col items-center border border-dashed border-gray-300 rounded p-4 w-32 h-32 justify-center text-center cursor-pointer">
                                    <span className="text-orange-500 text-2xl mb-2">
                                        🎬
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        Thêm video
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 max-w-xs">
                                    Kích thước tối đa 30Mb, độ phân giải không
                                    vượt quá 1280x1280px. Độ dài: 10s-60s. Định
                                    dạng: MP4
                                </p>
                            </div>
                        </div>

                        {/* Tên sản phẩm */}
                        <div className="mb-6">
                            <label className="block font-medium mb-2">
                                * Tên sản phẩm
                            </label>
                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                placeholder="Tên sản phẩm + Thương hiệu + Model + Thông số kỹ thuật"
                                maxLength={120}
                            />
                            <div className="text-xs text-gray-400 text-right mt-1">
                                0/120
                            </div>
                        </div>

                        {/* Ngành hàng */}
                        <div className="mb-6">
                            <label className="block font-medium mb-2">
                                * Ngành hàng
                            </label>
                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                value="Thời Trang Nam > Hoodie & Áo ni > Áo hoodie"
                                readOnly
                            />
                        </div>

                        {/* Mô tả sản phẩm */}
                        <div className="mb-6">
                            <label className="block font-medium mb-2">
                                Mô tả sản phẩm
                            </label>
                            <textarea
                                className="w-full border rounded px-3 py-2 min-h-[80px]"
                                placeholder="Mô tả sản phẩm"
                            />
                        </div>
                    </div>

                    {/* Detail Information*/}
                    <div className="bg-white rounded shadow p-6 mb-8">
                        <h2 className="text-lg font-semibold mb-2">
                            Thông tin chi tiết
                        </h2>
                        <div className="text-xs text-gray-500 mb-4">
                            Hoàn thành:{' '}
                            <span className="text-red-500 font-semibold">
                                0 / 12
                            </span>{' '}
                            Tiền thông tin thuộc tính để tăng mức độ hiển thị
                            cho sản phẩm
                            <a href="#" className="text-blue-500 ml-2">
                                Xem hướng dẫn bổ sung thuộc tính.
                            </a>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block font-medium mb-1">
                                    * Thương hiệu
                                </label>
                                <select className="w-full border rounded px-3 py-2 bg-white">
                                    <option>Vui lòng chọn</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium mb-1">
                                    Xuất xứ
                                </label>
                                <select className="w-full border rounded px-3 py-2 bg-white">
                                    <option>Vui lòng chọn</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium mb-1">
                                    Chất liệu{' '}
                                    <span className="text-xs text-gray-400">
                                        0/5
                                    </span>
                                </label>
                                <select className="w-full border rounded px-3 py-2 bg-white">
                                    <option>Vui lòng chọn</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium mb-1">
                                    Màu{' '}
                                    <span className="text-xs text-gray-400">
                                        0/5
                                    </span>
                                </label>
                                <select className="w-full border rounded px-3 py-2 bg-white">
                                    <option>Vui lòng chọn</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium mb-1">
                                    Mùa
                                </label>
                                <select className="w-full border rounded px-3 py-2 bg-white">
                                    <option>Vui lòng chọn</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium mb-1">
                                    Chiều dài tay áo
                                </label>
                                <select className="w-full border rounded px-3 py-2 bg-white">
                                    <option>Vui lòng chọn</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium mb-1">
                                    Phong cách{' '}
                                    <span className="text-xs text-gray-400">
                                        0/5
                                    </span>
                                </label>
                                <select className="w-full border rounded px-3 py-2 bg-white">
                                    <option>Vui lòng chọn</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium mb-1">
                                    Tall Fit
                                </label>
                                <select className="w-full border rounded px-3 py-2 bg-white">
                                    <option>Vui lòng chọn</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium mb-1">
                                    Rất lớn
                                </label>
                                <select className="w-full border rounded px-3 py-2 bg-white">
                                    <option>Vui lòng chọn</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium mb-1">
                                    Tên tổ chức chịu trách nhiệm sản xuất{' '}
                                    <span className="text-xs text-gray-400">
                                        0/5
                                    </span>
                                </label>
                                <select className="w-full border rounded px-3 py-2 bg-white">
                                    <option>Vui lòng chọn</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Sales information  */}
                    <div className="bg-white rounded shadow p-6 mb-8">
                        <h2 className="text-lg font-semibold mb-4">
                            Thông tin bán hàng
                        </h2>
                        {/* Phân loại hàng */}
                        <div className="mb-4">
                            <label className="block font-medium mb-1">
                                * Phân loại hàng
                            </label>
                            <button className="border border-dashed border-orange-400 text-orange-500 px-4 py-2 rounded">
                                + Thêm nhóm phân loại
                            </button>
                        </div>
                        {/* Giá */}
                        <div className="mb-4">
                            <label className="block font-medium mb-1">
                                * Giá
                            </label>
                            <input
                                type="number"
                                className="w-full border rounded px-3 py-2"
                                placeholder="Nhập vào"
                            />
                        </div>
                        {/* Kho hàng */}
                        <div className="mb-4">
                            <label className="block font-medium mb-1">
                                * Kho hàng
                            </label>
                            <input
                                type="number"
                                className="w-full border rounded px-3 py-2"
                                placeholder="0"
                            />
                        </div>
                        {/* Bảng quy đổi kích cỡ */}
                        <div className="mb-4">
                            <label className="block font-medium mb-1">
                                * Bảng quy đổi kích cỡ
                            </label>
                            <div className="flex items-center space-x-4 mb-2">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="size-table"
                                        defaultChecked
                                    />
                                    <span>Template</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input type="radio" name="size-table" />
                                    <span>Hình ảnh</span>
                                </label>
                                <select className="border rounded px-2 py-1">
                                    <option>
                                        Tăng khả năng hiển thị cho sản phẩm với
                                        Bảng quy đổi kích cỡ mới
                                    </option>
                                </select>
                                <button className="border px-3 py-1 rounded ml-2">
                                    Tạo Bảng quy đổi kích cỡ mới
                                </button>
                            </div>
                        </div>
                        {/* Mua nhiều giảm giá */}
                        <div className="mb-4">
                            <label className="block font-medium mb-1">
                                Mua nhiều giảm giá
                            </label>
                            <button className="border border-dashed border-orange-400 text-orange-500 px-4 py-2 rounded">
                                + Thêm khoảng giá
                            </button>
                            <p className="text-xs text-gray-400 mt-1">
                                Mua nhiều giảm giá sẽ bị ẩn khi sản phẩm đang
                                tham gia Mua Kèm Deal Sốc hay Combo Khuyến Mãi
                            </p>
                        </div>
                    </div>

                    {/* Shipping */}
                    <div className="bg-white rounded shadow p-6 mb-8">
                        <h2 className="text-lg font-semibold mb-4">
                            Vận chuyển
                        </h2>
                        {/* Cân nặng */}
                        <div className="mb-4">
                            <label className="block font-medium mb-1">
                                * Cân nặng (Sau khi đóng gói)
                            </label>
                            <input
                                type="number"
                                className="w-40 border rounded px-3 py-2"
                                placeholder="Nhập vào"
                            />
                            <span className="ml-2 text-gray-500">gr</span>
                        </div>
                        {/* Kích thước đóng gói */}
                        <div className="mb-2">
                            <label className="block font-medium mb-1">
                                Kích thước đóng gói{' '}
                                <span className="text-xs text-gray-400">
                                    (Phí vận chuyển thực tế sẽ thay đổi nếu bạn
                                    nhập sai kích thước)
                                </span>
                            </label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    className="w-20 border rounded px-2 py-1"
                                    placeholder="R"
                                />
                                <span>cm</span>
                                <input
                                    type="number"
                                    className="w-20 border rounded px-2 py-1"
                                    placeholder="D"
                                />
                                <span>cm</span>
                                <input
                                    type="number"
                                    className="w-20 border rounded px-2 py-1"
                                    placeholder="C"
                                />
                                <span>cm</span>
                            </div>
                        </div>
                    </div>

                    {/* Error and Save Bar */}
                    <div className="fixed left-1/5 right-1/4 bottom-0 bg-white border-t p-4 flex items-center justify-between z-10">
                        <div className="space-x-2">
                            <button className="px-4 py-2 border rounded">
                                Hủy
                            </button>
                            <button className="px-4 py-2 border rounded">
                                Lưu & Ẩn
                            </button>
                            <button className="px-4 py-2 bg-orange-500 text-white rounded">
                                Lưu & Hiển thị
                            </button>
                        </div>
                    </div>
                </main>

                {/* Right Sidebar (Preview) */}
                <aside className="fixed top-20 right-0 w-1/4 border-t  h-screen bg-white p-6 border-l overflow-y-auto z-20">
                    <div className="font-bold mb-4">Xem trước</div>
                    <div className="bg-gray-100 rounded p-4 h-96 flex items-center justify-center text-gray-400">
                        (Preview sản phẩm)
                    </div>
                </aside>
            </div>
        </>
    );
};

export default AddProduct;
