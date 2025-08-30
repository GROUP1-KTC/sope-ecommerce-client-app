const LeftSideBar = () => {
      return (
            <aside className="fixed top-20 left-0 w-1/5 h-screen  p-6  overflow-y-auto z-20">
                  <div className="font-bold mb-4">Gợi ý điền Thông tin</div>
                  <ul className="text-sm space-y-2">
                        <li>Thêm ít nhất 3 hình ảnh</li>
                        <li>Thêm video sản phẩm</li>
                        <li>Tên sản phẩm có ít nhất 25–100 kí tự</li>
                        <li>
                              Thêm ít nhất 100 kí tự hoặc 1 hình ảnh trong mô tả sản phẩm
                        </li>
                        <li>Thêm thương hiệu</li>
                        <li>Thêm bảng quy đổi kích cỡ</li>
                  </ul>
                  <div className="mt-6 text-xs text-gray-500">
                        <b>Ngành hàng</b>
                        <br />
                        Việc đăng tải sản phẩm đúng ngành hàng giúp Người mua dễ dàng tìm
                        thấy sản phẩm của Shop...
                  </div>
            </aside>
      );
};

export default LeftSideBar;
