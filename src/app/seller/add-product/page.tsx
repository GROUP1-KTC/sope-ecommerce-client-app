"use client";

import ProductForm from '~/components/add-edit-product/ProductForm';
import { useGetCategoriesQuery } from '~/features/categories/categoryApi';
import { useCreateProductMutation } from '~/features/products/productApi';

const AddProduct = () => {
    const { data: categories = [] } = useGetCategoriesQuery();
    const [createProduct, { data, error, isLoading, isSuccess }] = useCreateProductMutation();

    console.log({ data, error, isLoading, isSuccess });

    return (
        <ProductForm
            mode="add"
            categories={categories}
            onCreate={async (formData) => {
                await createProduct(formData).unwrap();
            }}
        />
    );
};

export default AddProduct;