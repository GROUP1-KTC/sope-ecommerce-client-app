const DetailInfo = () => {
    return (
        <div className="bg-white rounded shadow p-6 mb-8">
            <h2 className="text-lg font-semibold mb-2">Thông tin chi tiết</h2>
            <div className="text-xs text-gray-500 mb-4">
                Hoàn thành:{' '}
                <span className="text-red-500 font-semibold">0 / 12</span> Tiền
                thông tin thuộc tính để tăng mức độ hiển thị cho sản phẩm
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
                        Chiều dài tay áo
                    </label>
                    <select className="w-full border rounded px-3 py-2 bg-white">
                        <option>Vui lòng chọn</option>
                    </select>
                </div>
                <div>
                    <label className="block font-medium mb-1">
                        Phong cách{' '}
                        <span className="text-xs text-gray-400">0/5</span>
                    </label>
                    <select className="w-full border rounded px-3 py-2 bg-white">
                        <option>Vui lòng chọn</option>
                    </select>
                </div>
                <div>
                    <label className="block font-medium mb-1">Tall Fit</label>
                    <select className="w-full border rounded px-3 py-2 bg-white">
                        <option>Vui lòng chọn</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default DetailInfo;
