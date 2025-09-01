'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useGetCategoriesQuery } from '~/features/categories/categoryApi';
import { useCreateProductMutation } from '~/features/products/productApi';
import type {
    Category,
    ProductFormData,
    ProductVariantFormData,
} from '~/types/products';
const EditProduct = () => {
    const params = useParams();
    const slug = params.slug;

    return (
        <>
            <h1>Edit Product: {slug}</h1>
        </>
    );
};

export default EditProduct;
