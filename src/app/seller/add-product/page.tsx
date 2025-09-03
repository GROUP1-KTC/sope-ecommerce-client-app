'use client';

import { useState, useEffect } from 'react';
import { useGetCategoriesQuery } from '~/features/categories/categoryApi';
import { useCreateProductMutation } from '../../../features/products/productApi';
import type { Category, ProductVariantFormData } from '~/types/products';
import CategorySelector from '../../../components/add-edit-product/CategorySelector';
import RichTextEditor from '~/components/seller/rich-text-editor';
import ImageNext from 'next/image';
import VideoTrimModal from '../../../components/add-edit-product/VideoTrimModal';
import SalesInfo from '../../../components/add-edit-product/SalesInfo';
import DetailInfo from '../../../components/add-edit-product/DetailInfo';
import LeftSideBar from '~/components/add-edit-product/LeftSideBar';
import type {
    ProductFormDataWithMedia,
    MediaItem,
} from '~/components/add-edit-product/RightSideBar';
import RightSideBar from '~/components/add-edit-product/RightSideBar';

const AddProduct = () => {
    const [selectedCategories, setSelectedCategories] = useState<Category[]>(
        [],
    );
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
        shopId: '130dfd44-6d44-409f-b660-806c2b53cfa5',
        variants: [],
        imagesList: [],
    });

    const [showVideoModal, setShowVideoModal] = useState(false);

    const onChangeDescription = (content: string) => {
        setProductData((prev) => ({
            ...prev,
            description: content,
        }));
    };

    const handleProductVideoChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.type !== 'video/mp4') return alert('Chỉ hỗ trợ định dạng MP4');
        if (file.size > 30 * 1024 * 1024)
            return alert('Dung lượng video không được vượt quá 30MB');

        const mediaItem: MediaItem = {
            file,
            preview: URL.createObjectURL(file),
        };
        setProductData((prev) => ({ ...prev, defaultVideoIntro: mediaItem }));
        e.target.value = '';
    };

    const handleProductImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const files = Array.from(e.target.files || []);
        const maxSizeMB = 10;
        if (files.some((f) => !f.type.startsWith('image/')))
            return alert('Chỉ hỗ trợ định dạng hình ảnh');
        if (files.some((f) => f.size > maxSizeMB * 1024 * 1024))
            return alert('Dung lượng hình ảnh không được vượt quá 10MB');

        const newImages: MediaItem[] = files.map((f) => ({
            file: f,
            preview: URL.createObjectURL(f),
        }));
        setProductData((prev) => ({
            ...prev,
            imagesList: [...prev.imagesList, ...newImages],
        }));
        e.target.value = '';
    };

    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/'))
            return alert('Chỉ hỗ trợ định dạng hình ảnh');
        if (file.size > 5 * 1024 * 1024)
            return alert('Dung lượng hình ảnh không được vượt quá 5MB');

        const mediaItem: MediaItem = {
            file,
            preview: URL.createObjectURL(file),
        };
        setProductData((prev) => ({ ...prev, defaultImage: mediaItem }));
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

    const handlePriceChange = (price: number) => {
        setProductData((prev) => ({ ...prev, defaultPrice: price }));
    };

    const handleStockChange = (stock: number) => {
        setProductData((prev) => ({ ...prev, stock }));
    };

    const handleVariantsChange = (
        updatedVariants: ProductVariantFormData[],
    ) => {
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
            variants: productData.variants?.map((v) => ({
                price: Number(v.price) || 0,
                stock: Number(v.stock) || 0,
                attributes: v.attributes || [],
                imageVariant:
                    typeof v.imageVariant === 'string'
                        ? v.imageVariant
                        : v.imageVariant?.name,
            })),
            shopId: productData.shopId,
            categoryId: productData.categoryId,
            description: productData.description || '',
            // productDetails: productData.productDetails || []
        };

        formData.append(
            'product',
            new Blob([JSON.stringify(productPayload)], {
                type: 'application/json',
            }),
        );

        // Append files
        if (productData.defaultImage) {
            formData.append('defaultImage', productData.defaultImage.file);
        }
        if (productData.defaultVideoIntro) {
            formData.append(
                'defaultVideoIntro',
                productData.defaultVideoIntro.file,
            );
        }
        productData.imagesList.forEach((img) => {
            formData.append('productImages', img.file);
        });
        productData.variants?.forEach((v) => {
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

            if (res) {
                // setProductData({
                //     name: '',
                //     defaultPrice: 0,
                //     brand: '',
                //     description: '',
                //     defaultImage: null,
                //     defaultVideoIntro: null,
                //     hidden: false,
                //     stock: 0,
                //     categoryId: '',
                //     shopId: '130dfd44-6d44-409f-b660-806c2b53cfa5',
                //     variants: [],
                //     // productDetails: [],
                //     imagesList: [],
                // });
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
            if (productData.defaultImage)
                URL.revokeObjectURL(productData.defaultImage.preview);
            if (productData.defaultVideoIntro)
                URL.revokeObjectURL(productData.defaultVideoIntro.preview);
            productData.imagesList.forEach((img) =>
                URL.revokeObjectURL(img.preview),
            );
        };
    }, []); // chỉ cleanup khi component unmount

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
                    <div className="bg-white rounded shadow p-6">
                        <h2 className="text-lg font-semibold mb-6">
                            Thông tin cơ bản
                        </h2>

                        {/* Hình ảnh sản phẩm */}
                        <div className="mb-6">
                            <label className="block font-medium mb-2">
                                * Hình ảnh sản phẩm
                            </label>

                            <div className="flex items-center space-x-6 mb-2">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="aspect"
                                        defaultChecked
                                    />
                                    <span>Hình ảnh tỷ lệ 1:1</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input type="radio" name="aspect" />
                                    <span>Hình ảnh tỷ lệ 3:4</span>
                                </label>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                {productData.imagesList.map((img, index) => (
                                    <div
                                        key={index}
                                        className="relative w-32 h-32 border-gray-400 border"
                                    >
                                        <ImageNext
                                            src={img.preview}
                                            alt={`product-${index}`}
                                            width={128}
                                            height={128}
                                            className="w-full h-full object-cover rounded"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeProductImage(index)
                                            }
                                            className="absolute cursor-pointer hover:bg-red-600 top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
                                        >
                                            x
                                        </button>
                                    </div>
                                ))}

                                {productData.imagesList.length < 9 && (
                                    <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 flex items-center justify-center text-center cursor-pointer rounded">
                                        <label className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 text-sm hover:text-orange-500">
                                            <span className="text-2xl">➕</span>
                                            <span className="text-xs">
                                                Thêm hình
                                            </span>
                                            <span className="text-[15px] text-gray-400 mt-1">
                                                {productData.imagesList.length}
                                                /9
                                            </span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={
                                                    handleProductImageChange
                                                }
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                disabled={
                                                    productData.imagesList
                                                        .length >= 9
                                                }
                                            />
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Ảnh bìa */}
                        <div className="mb-6">
                            <label className="block font-medium mb-2">
                                Ảnh bìa
                            </label>
                            <div className="flex items-center space-x-4">
                                <div className="relative w-32 h-32">
                                    <label className="flex flex-col items-center border border-dashed border-gray-300 rounded w-full h-full justify-center text-center cursor-pointer overflow-hidden relative">
                                        {productData.defaultImage ? (
                                            <ImageNext
                                                width={50}
                                                height={50}
                                                src={
                                                    productData.defaultImage
                                                        ?.preview ?? ''
                                                }
                                                alt="Ảnh bìa"
                                                className="w-full h-full object-cover pointer-events-none"
                                            />
                                        ) : (
                                            <>
                                                <span className="text-orange-500 text-2xl mb-2">
                                                    🖼️
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    Thêm ảnh bìa
                                                </span>
                                            </>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleCoverImageChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </label>
                                </div>

                                <p className="text-xs text-gray-500 max-w-xs">
                                    Tải lên hình ảnh 1:1. Ảnh bìa sẽ được hiển
                                    thị tại các trang Kết quả tìm kiếm...
                                </p>
                            </div>
                        </div>

                        {/* Video sản phẩm */}
                        <div className="mb-6">
                            <label className="block font-medium mb-2">
                                Video sản phẩm
                            </label>

                            <div className="flex items-center space-x-4">
                                {showVideoModal &&
                                productData.defaultVideoIntro ? (
                                    <VideoTrimModal
                                        videoUrl={
                                            productData.defaultVideoIntro
                                                ?.preview
                                        }
                                        onClose={() => setShowVideoModal(false)}
                                        onConfirm={(start, end) => {
                                            if (end - start < 10) {
                                                alert(
                                                    'Đoạn cắt phải dài ít nhất 10 giây',
                                                );
                                                return;
                                            }
                                            setShowVideoModal(false);
                                        }}
                                    />
                                ) : (
                                    <>
                                        <div className="flex flex-col items-center border border-dashed border-gray-300 rounded p-1 w-32 h-32 justify-center text-center cursor-pointer overflow-hidden relative">
                                            {productData.defaultVideoIntro && (
                                                <video
                                                    src={
                                                        productData
                                                            .defaultVideoIntro
                                                            ?.preview
                                                    }
                                                    controls
                                                    className="w-100 h-100 rounded"
                                                />
                                            )}

                                            {!productData.defaultVideoIntro && (
                                                <label className="">
                                                    <span className="text-orange-500 text-2xl mb-2">
                                                        🎬
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        Thêm video
                                                    </span>
                                                    <input
                                                        type="file"
                                                        accept="video/mp4"
                                                        onChange={
                                                            handleProductVideoChange
                                                        }
                                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                                    />
                                                </label>
                                            )}
                                        </div>
                                    </>
                                )}

                                <p className="text-xs text-gray-500 max-w-xs">
                                    * Kích thước tối đa 30Mb, độ phân giải không
                                    vượt quá 1280x1280px
                                    <br />
                                    * Độ dài: 10s–60s.
                                    <br />
                                    * Định dạng: MP4
                                    <br />* Lưu ý: sản phẩm có thể hiển thị
                                    trong khi video đang được xử lý
                                </p>
                            </div>

                            {productData.defaultVideoIntro && (
                                <button
                                    onClick={removeProductVideo}
                                    className="mt-2 text-red-500 hover:underline"
                                >
                                    Xóa video
                                </button>
                            )}
                        </div>

                        {/* Tên sản phẩm */}
                        <div className="mb-6">
                            <label className="block font-medium mb-2">
                                * Tên sản phẩm
                            </label>
                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                placeholder="Tên sản phẩm"
                                maxLength={120}
                                value={productData.name}
                                onChange={(e) =>
                                    setProductData({
                                        ...productData,
                                        name: e.target.value,
                                    })
                                }
                            />
                            <div className="text-xs text-gray-400 text-right mt-1">
                                {productData.name.length}/120
                            </div>
                        </div>

                        {/* Ngành hàng */}
                        <div className="mb-6">
                            <label className="block font-medium mb-2">
                                * Ngành hàng
                            </label>
                            <button
                                onClick={() => setShowModal(true)}
                                className="w-full border rounded px-3 py-2 text-left bg-white"
                            >
                                {selectedCategories.length > 0
                                    ? selectedCategories
                                          .map((c) => c.name)
                                          .join(' > ')
                                    : 'Chọn ngành hàng'}
                            </button>
                        </div>

                        {/* Modal CategorySelector */}
                        {showModal && (
                            <CategorySelector
                                categories={categories}
                                selected={selectedCategories}
                                onSelect={handleSelectCategory}
                                onClose={() => setShowModal(false)}
                            />
                        )}

                        {/* Mô tả sản phẩm */}
                        <div className="mb-6">
                            <label className="block font-medium mb-2">
                                Mô tả sản phẩm
                            </label>
                            <RichTextEditor
                                content={productData.description}
                                onChangeDescription={onChangeDescription}
                            />
                        </div>

                        {/* Bản xem trước */}
                    </div>

                    {/* DetailInfo components */}

                    <DetailInfo />

                    {/* Sale components */}
                    <SalesInfo
                        onPriceChange={handlePriceChange}
                        onStockChange={handleStockChange}
                        onVariantsChange={handleVariantsChange}
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
