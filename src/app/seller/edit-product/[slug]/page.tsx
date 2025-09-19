'use client';

import { useParams } from 'next/navigation';
import ProductForm from '~/components/add-edit-product/ProductForm';
import { useGetCategoriesQuery } from '~/features/categories/categoryApi';
import {
    useUpdateProductMutation,
    useGetProductBySlugQuery,
} from '~/features/products/productApi';

const EditProduct = () => {
    const { data: categories = [] } = useGetCategoriesQuery();

    const [updateProduct] = useUpdateProductMutation();
    const params = useParams();
    const productSlug = params?.slug as string;
    const {
        data: product,
        isLoading,
        error,
    } = useGetProductBySlugQuery(productSlug);

    if (isLoading) return <div>Đang tải sản phẩm...</div>;
    if (error || !product) return <div>Không tìm thấy sản phẩm</div>;

    return (
        <ProductForm
            mode="edit"
            initialData={product}
            categories={categories}
            onUpdate={async (slug, formData) => {
                await updateProduct({
                    slug: productSlug,
                    data: formData,
                }).unwrap();
            }}
        />
    );
};

export default EditProduct;
