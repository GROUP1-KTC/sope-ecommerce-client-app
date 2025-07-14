import Image from 'next/image';
import React from 'react';

const ProductDescription = () => {
  return (
    <div className="mt-4 mx-auto p-6 bg-white rounded-lg border border-gray-200 shadow-sm">

      <div className="space-y-4">
        {/* Danh mục */}
        <div className='bg-gray-50 p-4 rounded-lg mb-4 uppercase text-xl font-semibold text-gray-700'>
          <h4>Chi tiết sản phẩm</h4>
        </div>
        <div className="pl-4">
          <div className="flex items-center text-gray-600 space-x-2">
            <span>Danh Mục</span>
            <span>Shopee</span>
            <span className="text-gray-400">➡️</span>
            <span>Phụ Kiện & Trang Sức Nữ</span>
            <span className="text-gray-400">➡️</span>
            <span>Phụ kiện tóc</span>
            <span className="text-gray-400">➡️</span>
            <span>Băng đô tóc</span>
          </div>

          {/* Thông số sản phẩm */}
          <div className="grid grid-cols-2 gap-4 mt-4 text-gray-600">
            <div><span className="font-medium">Kho:</span> CÒN HÀNG</div>
            <div><span className="font-medium">Xuất xứ:</span> Việt Nam</div>
            <div><span className="font-medium">Kiểu đóng gói:</span> Đơn</div>
            <div><span className="font-medium">Giới tính:</span> Nam</div>
            <div><span className="font-medium">Chất liệu:</span> Vải Nhung</div>
            <div><span className="font-medium">Gửi từ:</span> TP. Hồ Chí Minh</div>
          </div>
        </div>

        {/* Mô tả sản phẩm */}
        <div className='bg-gray-50 p-4 rounded-lg mb-4 uppercase text-xl font-semibold text-gray-700'>
          <h4>Mô tả sản phẩm</h4>
        </div>
        <div className="mt-4 pl-4">
          <h2 className="text-lg font-semibold text-gray-800">Mô Tả Sản Phẩm</h2>
          <p className="text-gray-600 mt-2">
            Đây là mô tả chi tiết về sản phẩm. Sản phẩm được thiết kế với chất liệu vải nhung cao cấp, mang lại sự thoải mái và phong cách. Băng đô tóc này phù hợp cho mọi dịp, từ đi chơi đến sự kiện trang trọng. Sản phẩm được gia công tỉ mỉ, đảm bảo độ bền và thẩm mỹ cao.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
