import React from 'react';

interface ProductDescriptionProps {
    productDetail: {
        description: string;
        features: { [key: string]: string };
    };
    breadcrumb: string;
}

const ProductDescription = ({
    productDetail,
    breadcrumb,
}: ProductDescriptionProps) => {
    const hasFeatures =
        productDetail.features &&
        Object.keys(productDetail.features).length > 0;

    return (
        <div className="mt-4 w-[95%] mx-auto p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="space-y-4">
                {hasFeatures && (
                    <>
                        <div className="bg-gray-50 p-4 rounded-lg mb-4 uppercase text-xl font-semibold text-gray-700">
                            <h4>Chi tiết sản phẩm</h4>
                        </div>
                        <div className="pl-4">
                            <div className="flex items-center text-gray-600 space-x-2">
                                <span>Danh Mục</span>
                                <span className="text-blue-600 font-medium">
                                    {breadcrumb}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-4 text-gray-600">
                                {Object.entries(productDetail.features).map(
                                    ([key, value]) => (
                                        <div key={key}>
                                            <span className="font-medium">
                                                {key}:
                                            </span>{' '}
                                            {value}
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    </>
                )}

                {productDetail.description && (
                    <>
                        <div className="bg-gray-50 p-4 rounded-lg mb-4 uppercase text-xl font-semibold text-gray-700">
                            <h4>Mô tả sản phẩm</h4>
                        </div>

                        <div
                            className="text-sm text-gray-600 prose max-w-none ml-2"
                            dangerouslySetInnerHTML={{
                                __html:
                                    productDetail.description ||
                                    'Chưa có mô tả sản phẩm.',
                            }}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductDescription;
