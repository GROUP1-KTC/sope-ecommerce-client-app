'use client';
import React, { useEffect, useState } from 'react';
import ProductList from '~/components/product-detail/ProductList';
import { useSearchProductsByImageMutation } from '~/features/products/productApi';
import Loading from '~/components/shared/loading/Loading';

const ImageSearchPage = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [searchByImage] = useSearchProductsByImageMutation();

    useEffect(() => {
        const imageUrl = sessionStorage.getItem('imageSearchFile');
        if (!imageUrl) {
            // Nếu không có hình trong session -> reset luôn
            setImagePreview(null);
            setProducts([]);
            return;
        }

        // Kiểm tra blob URL còn hợp lệ không
        fetch(imageUrl)
            .then((res) => {
                if (!res.ok) throw new Error('Invalid blob URL');
                return res.blob();
            })
            .then((blob) => {
                setImagePreview(imageUrl);
                setLoading(true);

                const file = new File([blob], 'uploaded.jpg', { type: blob.type });
                const formData = new FormData();
                formData.append('image', file);
                return searchByImage(formData).unwrap();
            })
            .then((res) => setProducts(res))
            .catch((err) => {
                console.warn('Ảnh không còn hợp lệ hoặc lỗi fetch:', err);
                sessionStorage.removeItem('imageSearchFile'); // ⚡ Xóa session khi ảnh lỗi
                setImagePreview(null);
                setProducts([]);
            })
            .finally(() => setLoading(false));
    }, [searchByImage]);


    return (
        <div className="min-h-[80vh] w-full flex justify-center bg-gray-50 py-8 relative">
            {loading && <Loading message="Đang tìm kiếm sản phẩm..." />}

            {!loading && (
                <div className="bg-white rounded-xl shadow p-6 max-w-7xl w-full">
                    <h2 className="text-xl font-bold mb-4">Kết quả tìm kiếm bằng hình ảnh</h2>

                    {imagePreview && (
                        <div className="mb-4 flex justify-center">
                            <img
                                src={imagePreview}
                                alt="Ảnh tìm kiếm"
                                className="w-40 h-40 object-cover rounded-lg shadow"
                            />
                        </div>
                    )}

                    {products.length > 0 ? (
                        <ProductList title="Kết quả tìm kiếm" products={products} />
                    ) : (
                        <div className="text-center text-gray-500 mt-10">
                            Không tìm thấy sản phẩm phù hợp.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ImageSearchPage;
