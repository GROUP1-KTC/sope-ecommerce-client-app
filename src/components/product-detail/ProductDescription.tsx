import React from 'react';

interface ProductDescriptionProps {
  productDetail: {
    description: string;
    features: { [key: string]: string };
  };
  breadcrumb: string;
}

const ProductDescription = ({ productDetail, breadcrumb }: ProductDescriptionProps) => {
  
  return (
    <div className="mt-4 mx-auto p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="space-y-4">
        {/* Danh mục */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4 uppercase text-xl font-semibold text-gray-700">
          <h4>Chi tiết sản phẩm</h4>
        </div>
        <div className="pl-4">
          <div className="flex items-center text-gray-600 space-x-2">
            <span>Danh Mục</span>
            <span className="text-blue-600 font-medium">{breadcrumb}</span>
          
          </div>

          {/* Thông số sản phẩm */}
          <div className="grid grid-cols-2 gap-4 mt-4 text-gray-600">
            {Object.entries(productDetail.features).map(([key, value]) => (
              <div key={key}>
                <span className="font-medium">{key}:</span> {value}
              </div>
            ))}
          </div>
        </div>

        {/* Mô tả sản phẩm */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4 uppercase text-xl font-semibold text-gray-700">
          <h4>Mô tả sản phẩm</h4>
        </div>
        <div className="mt-4 pl-4">
          <p className="text-gray-600 mt-2">{productDetail.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;