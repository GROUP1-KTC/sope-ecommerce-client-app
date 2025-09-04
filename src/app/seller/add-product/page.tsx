'use client';

import { useState, useEffect } from 'react';
import { useGetCategoriesQuery } from '~/features/categories/categoryApi';
import { useCreateProductMutation } from '../../../features/products/productApi';
import type { Category, Dimension, ProductDetail, ProductVariantFormData } from '~/types/products';
import SalesInfo from '../../../components/add-edit-product/SalesInfo';
import DetailInfo from '../../../components/add-edit-product/DetailInfo';
import LeftSideBar from '~/components/add-edit-product/LeftSideBar';
import RightSideBar, { ProductFormDataWithMedia, MediaItem } from '~/components/add-edit-product/RightSideBar';
import FundanmentalInformation from '~/components/add-edit-product/FundanmentalInformation';

const AddProduct = () => {
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([],);
    const [showModal, setShowModal] = useState(false);
    const { data: categories = [] } = useGetCategoriesQuery();
    const [createProduct] = useCreateProductMutation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [productData, setProductData] = useState<ProductFormDataWithMedia>({
        name: '',
        brand: 'ahihi',
        description: '',
        defaultImage: null,
        defaultVideoIntro: null,
        hidden: false,
        categoryId: '',
        shopId: '1a80e99f-eb70-44b0-8777-78a9ad5257d1',
        variants: [],
        imagesList: [],
        productDetails: []
    });

    const handleDetailChange = (
        index: number,
        field: keyof ProductDetail,
        value: string
    ) => {
        setProductData((prev) => {
            const updated = [...(prev.productDetails || [])];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, productDetails: updated };
        });
    };

    const handleAddDetail = () => {
        setProductData((prev) => ({
            ...prev,
            productDetails: [
                ...(prev.productDetails || []),
                {
                    productDetailId: crypto.randomUUID(),
                    label: '',
                    data: '',
                    priority: (prev.productDetails?.length || 0) + 1,
                    productId: '' // sẽ set khi gửi API
                }
            ]
        }));
    };

    const handleRemoveDetail = (index: number) => {
        setProductData((prev) => {
            const updated = [...(prev.productDetails || [])];
            updated.splice(index, 1);
            return { ...prev, productDetails: updated };
        });
    };
    const onChangeDescription = (content: string) => {
        setProductData((prev) => ({
            ...prev,
            description: content,
        }));

    };

    const handleProductVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.type !== 'video/mp4') return alert('Chỉ hỗ trợ định dạng MP4');
        if (file.size > 30 * 1024 * 1024) return alert('Dung lượng video không được vượt quá 30MB');

        const mediaItem: MediaItem = { file, preview: URL.createObjectURL(file) };
        setProductData(prev => ({ ...prev, defaultVideoIntro: mediaItem }));
        e.target.value = '';
    };

    const handleProductImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const maxSizeMB = 10;
        if (files.some(f => !f.type.startsWith('image/'))) return alert('Chỉ hỗ trợ định dạng hình ảnh');
        if (files.some(f => f.size > maxSizeMB * 1024 * 1024)) return alert('Dung lượng hình ảnh không được vượt quá 10MB');

        const newImages: MediaItem[] = files.map(f => ({ file: f, preview: URL.createObjectURL(f) }));
        setProductData(prev => ({ ...prev, imagesList: [...prev.imagesList, ...newImages] }));
        e.target.value = '';
    };

    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) return alert('Chỉ hỗ trợ định dạng hình ảnh');
        if (file.size > 5 * 1024 * 1024) return alert('Dung lượng hình ảnh không được vượt quá 5MB');

        const mediaItem: MediaItem = { file, preview: URL.createObjectURL(file) };
        setProductData(prev => ({ ...prev, defaultImage: mediaItem }));
        e.target.value = '';
    };

    const removeProductImage = (index: number) => {
        setProductData((prev) => {
            const removed = prev.imagesList[index];
            if (removed?.preview) {
                URL.revokeObjectURL(removed.preview);
            }
            return {
                ...prev,
                imagesList: prev.imagesList.filter((_, i) => i !== index),
            };
        });
    };

    const removeProductVideo = () => {
        setProductData((prev) => {
            if (prev.defaultVideoIntro?.preview) {
                URL.revokeObjectURL(prev.defaultVideoIntro.preview);
            }
            return { ...prev, defaultVideoIntro: null };
        });
    };

    const handleSelectCategory = (categories: Category[]) => {
        setSelectedCategories(categories);
        const lastCategory = categories[categories.length - 1];
        setProductData((prev) => ({
            ...prev,
            categoryId: lastCategory?.id || '',
        }));
    };

    const updateFirstVariant = (updates: Partial<ProductVariantFormData>) => {
        setProductData((prev) => {
            const firstVariant = prev.variants[0] || {
                price: 0,
                stock: 0,
                attributes: [],
                imageVariant: null,
                dimension: { length: 0, width: 0, height: 0 },
                weight: 0,
            };

            return {
                ...prev,
                variants: [
                    { ...firstVariant, ...updates },
                    ...prev.variants.slice(1),
                ],
            };
        });
    };

    const handlePriceChange = (price: number) => updateFirstVariant({ price });
    const handleStockChange = (stock: number) => updateFirstVariant({ stock });
    const handleDimensionChange = (dimension: Dimension) => updateFirstVariant({ dimension });
    const handleWeightChange = (weight: number) => updateFirstVariant({ weight });

    const handleVariantsChange = (updatedVariants: ProductVariantFormData[]) => {
        setProductData((prev) => ({
            ...prev,
            variants: updatedVariants,
        }));
    };

    const buildFormData = (): FormData => {
        const formData = new FormData();

        if (!productData.name) {
            throw new Error('Tên sản phẩm là bắt buộc.');
        }
        if (!productData.categoryId) {
            throw new Error('Danh mục sản phẩm là bắt buộc.');
        }
        if (!productData.defaultImage) {
            throw new Error('Ảnh bìa sản phẩm là bắt buộc.');
        }
        const productPayload = {
            brand: productData.brand || '',
            hidden: productData.hidden,
            name: productData.name,
            variants: productData.variants.map(v => ({
                price: Number(v.price) || 0,
                stock: Number(v.stock) || 0,
                attributes: v.attributes || [],
                imageVariant: typeof v.imageVariant === 'string'
                    ? v.imageVariant
                    : v.imageVariant?.name,
                dimension: {
                    length: Number(v.dimension?.length) || 0,
                    width: Number(v.dimension?.width) || 0,
                    height: Number(v.dimension?.height) || 0,
                },
                weight: Number(v.weight) || 0,
            })),
            shopId: productData.shopId,
            categoryId: productData.categoryId,
            description: productData.description || '',
            productDetails: productData.productDetails || []
        };

        formData.append('product', new Blob([JSON.stringify(productPayload)], { type: 'application/json' }));

        // Append files
        if (productData.defaultImage) {
            formData.append('defaultImage', productData.defaultImage.file);
        }
        if (productData.defaultVideoIntro) {
            formData.append('defaultVideoIntro', productData.defaultVideoIntro.file);
        }
        productData.imagesList.forEach(img => {
            formData.append('productImages', img.file);
        });
        productData.variants?.forEach(v => {
            if (v.imageVariant instanceof File) {
                formData.append('variantFiles', v.imageVariant);
            }
        });

        return formData;
    };

    const handleSubmit = async (isHidden: boolean) => {
        setIsSubmitting(true);
        try {
            const formData = buildFormData();
            formData.set('hidden', isHidden.toString());
            const res = await createProduct(formData).unwrap();

            for (const [key, value] of formData.entries()) {
                if (value instanceof File) {
                    if (value.type === "application/json") {
                        // Đọc JSON
                        value.text().then(text => {
                            console.log(key, JSON.parse(text));
                        });
                    } else {
                        // File ảnh/video
                        console.log(key, value.name, value.type, value.size + " bytes");
                    }
                } else {
                    console.log(key, value);
                }
            }

            if (res) {
                setProductData({
                    name: '',
                    brand: '',
                    description: '',
                    defaultImage: null,
                    defaultVideoIntro: null,
                    hidden: false,
                    categoryId: '',
                    shopId: '1a80e99f-eb70-44b0-8777-78a9ad5257d1',
                    variants: [],
                    imagesList: [],
                    productDetails: []
                });
                setSelectedCategories([]);
                alert('🎉 Tạo sản phẩm thành công!');
            }
        } catch (err: any) {
            console.error('Error creating product:', err);
            alert(err.message || 'Đã xảy ra lỗi khi tạo sản phẩm.');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        return () => {
            if (productData.defaultImage) URL.revokeObjectURL(productData.defaultImage.preview);
            if (productData.defaultVideoIntro) URL.revokeObjectURL(productData.defaultVideoIntro.preview);
            productData.imagesList.forEach(img => URL.revokeObjectURL(img.preview));
        };
    }, []);

    return (
        <>
            {/* ✅ Overlay loading */}
            {isSubmitting && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                    <div className="text-white text-xl font-semibold">
                        Đang tạo sản phẩm...
                    </div>
                </div>
            )}

            <div className="relative min-h-screen bg-gray-50">
                <LeftSideBar />

                {/* Main Content */}
                <main className="ml-[20%]  mr-[25%] p-2">
                    {/* Tabs */}
                    <div className="flex space-x-4 border-b mb-6">
                        <button className="pb-2 border-b-2 border-orange-500 font-semibold">
                            Thông tin cơ bản
                        </button>
                        <button className="pb-2">Thông tin chi tiết</button>
                        <button className="pb-2">Thông tin bán hàng</button>
                        <button className="pb-2">Thông tin khác</button>
                    </div>

                    {/* Fundanmental Information */}
                    <FundanmentalInformation
                        productData={productData}
                        setProductData={setProductData}
                        removeProductImage={removeProductImage}
                        handleProductImageChange={handleProductImageChange}
                        handleCoverImageChange={handleCoverImageChange}
                        handleProductVideoChange={handleProductVideoChange}
                        removeProductVideo={removeProductVideo}
                        onChangeDescription={onChangeDescription}
                        categories={categories}
                        selectedCategories={selectedCategories}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        handleSelectCategory={handleSelectCategory}
                    />

                    {/* DetailInfo components */}
                    <DetailInfo
                        productDetails={productData.productDetails ?? []}
                        onChange={handleDetailChange}
                        onAdd={handleAddDetail}
                        onRemove={handleRemoveDetail}
                    />

                    {/* Sale components */}
                    <SalesInfo
                        onPriceChange={handlePriceChange}
                        onStockChange={handleStockChange}
                        onDimensionChange={handleDimensionChange}
                        onWeightChange={handleWeightChange}
                        onVariantsChange={handleVariantsChange}
                        productData={productData}
                    />

                    {/* Cancel and Save Bar */}
                    <div className="fixed left-1/5 right-1/4 bottom-0 bg-white border-t p-4 flex items-center justify-between z-10">
                        <div className="space-x-2">
                            <button className="px-4 py-2 border rounded">
                                Hủy
                            </button>
                            <button
                                className="px-4 py-2 border rounded"
                                onClick={() => handleSubmit(true)}
                                disabled={isSubmitting}
                            >
                                Lưu & Ẩn
                            </button>
                            <button
                                className="px-4 py-2 bg-orange-500 text-white rounded"
                                onClick={() => handleSubmit(false)}
                                disabled={isSubmitting}
                            >
                                Lưu & Hiển thị
                            </button>
                        </div>
                    </div>
                </main>


                <RightSideBar productData={productData} />
            </div>
        </>
    );
};

export default AddProduct;
