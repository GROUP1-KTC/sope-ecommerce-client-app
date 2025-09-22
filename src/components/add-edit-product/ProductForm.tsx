'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type {
    Category,
    Image,
    ProductDetail,
    ProductResponse,
    ProductUpdateData,
    ProductVariant,
} from '~/types/products';
import SalesInfo from '~/components/add-edit-product/SalesInfo';
import DetailInfo from '~/components/add-edit-product/DetailInfo';
import LeftSideBar from '~/components/add-edit-product/LeftSideBar';
import type {
    ProductFormDataWithMedia,
    MediaItem,
} from '~/components/add-edit-product/RightSideBar';
import RightSideBar from '~/components/add-edit-product/RightSideBar';
import FundanmentalInformation from '~/components/add-edit-product/FundanmentalInformation';
import { buildCategoryPath } from '~/utils/buildCategoryPath';
import ErrorModal from './ErrorModal';
import { verifyImage } from '~/utils/api';
import { useAlertStore } from '~/store/zustand/alertStore';

type ProductFormMode = 'add' | 'edit';

interface ProductFormProps {
    mode: ProductFormMode;
    initialData?: ProductResponse;
    categories: Category[];
    onCreate?: (data: FormData) => Promise<void>;
    onUpdate?: (id: string, data: FormData) => Promise<void>;
}

type AddState = { mode: 'add' } & ProductFormDataWithMedia;
type EditState = { mode: 'edit' } & ProductUpdateData;

const ProductForm: React.FC<ProductFormProps> = ({
    mode,
    initialData,
    categories,
    onCreate,
    onUpdate,
}) => {
    const [selectedCategories, setSelectedCategories] = useState<Category[]>(
        [],
    );
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Error modal states
    const [errorMessage, setErrorMessage] = useState<string | string[]>('');
    const [showErrorModal, setShowErrorModal] = useState(false);

    const infoRef = useRef<HTMLDivElement | null>(null);
    const detailRef = useRef<HTMLDivElement | null>(null);
    const salesRef = useRef<HTMLDivElement | null>(null);
    const otherRef = useRef<HTMLDivElement | null>(null);

    const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(() => {
        if (
            mode === 'edit' &&
            initialData?.categoryId &&
            categories.length > 0
        ) {
            const path = buildCategoryPath(categories, initialData.categoryId);
            setSelectedCategories(path);
        }
    }, [mode, initialData?.categoryId, categories]);

    function mapUrlToMediaItem(url?: string | null): MediaItem | null {
        if (!url) return null;
        return { preview: url };
    }

    const mapApiImagesToMediaItems = (images: Image[] = []): MediaItem[] => {
        return images.map((img) => ({
            preview: img.url,
        }));
    };

    const [productData, setProductData] = useState<AddState | EditState>(
        mode === 'add'
            ? ({
                  mode: 'add',
                  name: '',
                  brand: '',
                  description: '',
                  defaultImage: null,
                  defaultVideoIntro: null,
                  hidden: false,
                  categoryId: '',
                  variants: [],
                  imagesList: [],
                  productDetails: [],
              } as AddState)
            : ({
                  mode: 'edit',
                  description: initialData?.description || '',
                  name: initialData?.name || '',
                  brand: initialData?.brand || '',
                  hidden: initialData?.hidden ?? false,
                  categoryId: initialData?.categoryId || '',
                  defaultImage: mapUrlToMediaItem(initialData?.defaultImage),
                  defaultVideoIntro: mapUrlToMediaItem(
                      initialData?.defaultVideoIntro ?? null,
                  ),
                  imagesList: mapApiImagesToMediaItems(
                      initialData?.imagesList ?? [],
                  ),
                  productDetails: initialData?.productDetails || [],
                  variants: initialData?.variants.map((v) => ({
                      price: v.price,
                      productVariantId: v.productVariantId,
                      stock: v.stock,
                      attributes: v.attributes,
                      imageVariant: v.imageVariant,
                      dimension: v.dimension,
                      weight: v.weight,
                  })),
              } as EditState),
    );

    useEffect(() => {
        if (mode === 'edit' && initialData?.variants) {
            setProductData((prev) => ({
                ...prev,
                variants: initialData.variants.map((v) => ({
                    price: v.price,
                    productVariantId: v.productVariantId,
                    stock: v.stock,
                    attributes: v.attributes,
                    imageVariant: v.imageVariant,
                    dimension: v.dimension,
                    weight: v.weight,
                })),
            }));
        }
    }, [initialData?.variants, mode]);

    const handleDetailChange = (
        index: number,
        field: keyof ProductDetail,
        value: string,
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
                    productId: '',
                },
            ],
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

    const handleProductVideoChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.type !== 'video/mp4') {
            useAlertStore.getState().showAlert({
                severity: 'warning',
                message: 'Chỉ hỗ trợ định dạng MP4!',
            });
        }
        if (file.size > 10 * 1024 * 1024) {
            useAlertStore.getState().showAlert({
                severity: 'warning',
                message: 'Dung lượng video không được vượt quá 10MB',
            });
        }

        const mediaItem: MediaItem = {
            file,
            preview: URL.createObjectURL(file),
        };
        setProductData((prev) => ({ ...prev, defaultVideoIntro: mediaItem }));
        e.target.value = '';
    };

    const handleProductImageChange = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const files = Array.from(e.target.files || []);
        const maxSizeMB = 10;

        for (const f of files) {
            if (!f.type.startsWith('image/')) {
                useAlertStore.getState().showAlert({
                    severity: 'warning',
                    message: 'Chỉ hỗ trợ định dạng hình ảnh',
                });
                continue;
            }
            if (f.size > maxSizeMB * 1024 * 1024) {
                useAlertStore.getState().showAlert({
                    severity: 'warning',
                    message: 'Dung lượng hình ảnh không được vượt quá 10MB',
                });
                continue;
            }

            try {
                const result = await verifyImage(f);
                if (!result.valid) {
                    useAlertStore.getState().showAlert({
                        severity: 'warning',
                        message: `Ảnh ${f.name} không hợp lệ: ${result.reason}`,
                    });
                    continue;
                }

                const mediaItem: MediaItem = {
                    file: f,
                    preview: URL.createObjectURL(f),
                };
                setProductData((prev) => ({
                    ...prev,
                    imagesList: [...prev.imagesList, mediaItem],
                }));
            } catch (_err) {
                useAlertStore.getState().showAlert({
                    severity: 'warning',
                    message: `Không thể kiểm tra ảnh ${f.name}`,
                });
            }
        }

        e.target.value = '';
    };

    const handleCoverImageChange = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            useAlertStore.getState().showAlert({
                severity: 'warning',
                message: 'Chỉ hỗ trợ định dạng hình ảnh',
            });
        }

        if (file.size > 5 * 1024 * 1024) {
            useAlertStore.getState().showAlert({
                severity: 'warning',
                message: 'Dung lượng hình ảnh không được vượt quá 5MB',
            });
        }

        try {
            const result = await verifyImage(file);
            if (!result.valid) {
                useAlertStore.getState().showAlert({
                    severity: 'warning',
                    message: `Ảnh không hợp lệ: ${result.reason}`,
                });
            }
            const mediaItem: MediaItem = {
                file,
                preview: URL.createObjectURL(file),
            };
            setProductData((prev) => ({ ...prev, defaultImage: mediaItem }));
        } catch (_err) {
            useAlertStore.getState().showAlert({
                severity: 'warning',
                message: 'Không thể kiểm tra ảnh. Vui lòng thử lại.',
            });
        } finally {
            e.target.value = '';
        }
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

    const handleVariantsChange = useCallback((updated: ProductVariant[]) => {
        setProductData((prev) => ({ ...prev, variants: updated }));
    }, []);

    const buildFormData = (): FormData => {
        const formData = new FormData();

        if (mode === 'add') {
            const data = productData as ProductFormDataWithMedia;

            const productPayload = {
                name: data.name,
                brand: data.brand,
                description: data.description,
                categoryId: data.categoryId,
                // shopId: data.shopId,
                productDetails: data.productDetails || [],
                variants: data.variants.map((v) => ({
                    price: Number(v.price) || 0,
                    stock: Number(v.stock) || 0,
                    attributes: v.attributes || [],
                    imageVariant:
                        typeof v.imageVariant === 'string'
                            ? v.imageVariant
                            : v.imageVariant?.name,
                    dimension: {
                        length: Number(v.dimension?.length) || 0,
                        width: Number(v.dimension?.width) || 0,
                        height: Number(v.dimension?.height) || 0,
                    },
                    weight: Number(v.weight) || 0,
                })),
            };

            formData.append(
                'product',
                new Blob([JSON.stringify(productPayload)], {
                    type: 'application/json',
                }),
            );

            if (data.defaultImage?.file) {
                formData.append('defaultImage', data.defaultImage.file);
            }

            if (data.defaultVideoIntro?.file) {
                formData.append(
                    'defaultVideoIntro',
                    data.defaultVideoIntro.file,
                );
            }

            data.imagesList.forEach((img) => {
                if (img.file) {
                    formData.append('productImages', img.file);
                }
            });

            data.variants?.forEach((v) => {
                if (v.imageVariant instanceof File) {
                    formData.append('variantFiles', v.imageVariant);
                }
            });
        } else {
            const data = productData as ProductUpdateData;

            const updatePayload = {
                description: data.description,
                hidden: data.hidden,
                categoryId: data.categoryId,
                variants: data.variants.map((v) => ({
                    productVariantId: v.productVariantId,
                    price: Number(v.price) || 0,
                    stock: Number(v.stock) || 0,
                    attributes: v.attributes || [],
                    imageVariant:
                        typeof v.imageVariant === 'string'
                            ? v.imageVariant
                            : (v.imageVariant?.name ?? null),
                    dimension: {
                        length: Number(v.dimension?.length) || 0,
                        width: Number(v.dimension?.width) || 0,
                        height: Number(v.dimension?.height) || 0,
                    },
                    weight: Number(v.weight) || 0,
                })),
                imageUrlsToKeep: data.imagesList
                    .filter((img) => !img.file)
                    .map((img) => img.preview),
            };

            data.variants?.forEach((v) => {
                if (v.imageVariant instanceof File) {
                    formData.append('variantFiles', v.imageVariant);
                }
            });

            formData.append(
                'product',
                new Blob([JSON.stringify(updatePayload)], {
                    type: 'application/json',
                }),
            );

            if (data.defaultImage?.file) {
                formData.append('defaultImage', data.defaultImage.file);
            }

            if (data.defaultVideoIntro?.file) {
                formData.append(
                    'defaultVideoIntro',
                    data.defaultVideoIntro.file,
                );
            }

            data.imagesList?.forEach((img) => {
                if (img.file) {
                    formData.append('productImages', img.file);
                }
            });
        }

        return formData;
    };

    const handleSubmit = async (isHidden: boolean) => {
        try {
            const formData = buildFormData();
            formData.set('hidden', isHidden.toString());
            setIsSubmitting(true);

            if (mode === 'add' && onCreate) {
                await onCreate(formData);

                useAlertStore.getState().showAlert({
                    severity: 'success',
                    message: 'Tạo sản phẩm thành công!',
                });

                setProductData({
                    mode: 'add',
                    name: '',
                    brand: '',
                    description: '',
                    hidden: false,
                    categoryId: '',
                    // shopId: '',
                    productDetails: [],
                    variants: [],
                    defaultImage: null,
                    defaultVideoIntro: null,
                    imagesList: [],
                });
                setSelectedCategories([]);
            }
            if (mode === 'edit' && onUpdate && initialData) {
                await onUpdate(initialData.productId, formData);
                useAlertStore.getState().showAlert({
                    severity: 'success',
                    message: '🎉 Sửa sản phẩm thành công!',
                });
            }
        } catch (err: any) {
            let msg = 'Có lỗi xảy ra';
            if (err?.data?.message) {
                msg = err.data.message;
            } else if (typeof err?.data === 'string') {
                msg = err.data;
            } else if (err?.error) {
                msg = err.error;
            }

            setErrorMessage(msg);
            setShowErrorModal(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-gray-50">
            {isSubmitting && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                    <div className="text-white text-xl font-semibold">
                        {mode === 'add'
                            ? 'Đang tạo sản phẩm...'
                            : 'Đang cập nhật sản phẩm...'}
                    </div>
                </div>
            )}

            <LeftSideBar
                productData={productData as ProductFormDataWithMedia}
            />

            <main className="ml-[19%] mr-[25%] mb-20">
                {/* Tabs */}
                <div className="flex justify-center mt-20 mb-4">
                    <div className="flex space-x-6 bg-white p-3 rounded-xl shadow-lg whitespace-nowrap overflow-x-auto">
                        <button
                            onClick={() => scrollToSection(infoRef)}
                            className="text-md font-semibold cursor-pointer "
                        >
                            Thông tin cơ bản
                        </button>
                        <button
                            onClick={() => scrollToSection(detailRef)}
                            className="text-md font-medium cursor-pointer  text-gray-600 hover:text-red-500 hover:border-b-4 hover:border-red-400 transition-all"
                        >
                            Thông tin chi tiết
                        </button>
                        <button
                            onClick={() => scrollToSection(salesRef)}
                            className="text-md font-medium cursor-pointer  text-gray-600 hover:text-red-500 hover:border-b-4 hover:border-red-400 transition-all"
                        >
                            Thông tin bán hàng
                        </button>
                        <button className="text-md font-medium cursor-pointer  text-gray-600 hover:text-red-500 hover:border-b-4 hover:border-red-400 transition-all">
                            Thông tin vận chuyển
                        </button>
                        <button
                            onClick={() => scrollToSection(otherRef)}
                            className="text-md font-medium cursor-pointer  text-gray-600 hover:text-red-500 hover:border-b-4 hover:border-red-400 transition-all"
                        >
                            Thông tin khác
                        </button>
                    </div>
                </div>

                {/* Thông tin cơ bản */}
                <div ref={infoRef}>
                    <FundanmentalInformation
                        mode={mode}
                        productData={productData as ProductFormDataWithMedia}
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
                        handleSelectCategory={(cats) => {
                            setSelectedCategories(cats);
                            setProductData((prev) => ({
                                ...prev,
                                categoryId: cats[cats.length - 1]?.id || '',
                            }));
                        }}
                    />
                </div>

                {/* Thông tin chi tiết */}
                <div ref={detailRef}>
                    <DetailInfo
                        productDetails={productData.productDetails ?? []}
                        onChange={handleDetailChange}
                        onAdd={handleAddDetail}
                        onRemove={handleRemoveDetail}
                    />
                </div>

                {/* Thông tin bán hàng */}
                <div ref={salesRef}>
                    <SalesInfo
                        onVariantsChange={handleVariantsChange}
                        productData={productData as ProductFormDataWithMedia}
                        mode={mode}
                    />
                </div>

                {/* Thông tin khác */}
                <div ref={otherRef} className="mt-10">
                    <h2 className="text-lg font-bold mb-4">Thông tin khác</h2>
                    <p>Chỗ này bạn thêm nội dung khác tùy ý...</p>
                </div>

                <div className="fixed bottom-0 w-[55%] mx-auto bg-white py-4 pr-20 flex items-center justify-between z-30 shadow-[0_-4px_8px_rgba(0,0,0,0.1)] rounded-t-lg">
                    <div className="space-x-2 mx-4">
                        <button className="px-4 py-2 border rounded cursor-pointer ">
                            Hủy
                        </button>
                        <button
                            className="px-4 py-2 border rounded cursor-pointer"
                            onClick={() => handleSubmit(true)}
                            disabled={isSubmitting}
                        >
                            Lưu & Ẩn
                        </button>
                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
                            onClick={() => handleSubmit(false)}
                            disabled={isSubmitting}
                        >
                            Lưu & Hiển thị
                        </button>
                    </div>
                </div>
            </main>

            <RightSideBar
                productData={productData as ProductFormDataWithMedia}
                categories={categories}
            />
            <ErrorModal
                isOpen={showErrorModal}
                onClose={() => setShowErrorModal(false)}
                title="Lỗi tạo sản phẩm"
                message={errorMessage}
            />
        </div>
    );
};

export default ProductForm;
