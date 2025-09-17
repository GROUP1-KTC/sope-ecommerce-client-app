import React, { useState } from 'react';
import ImageNext from 'next/image';
import RichTextEditor from '../seller/rich-text-editor/index';
import CategorySelector from './CategorySelector';
import type { Category } from '~/types/products';
import type { ProductFormDataWithMedia } from './RightSideBar';
import VideoTrimModal from './VideoTrimModal';
import { useAlertStore } from '~/store/zustand/alertStore';

interface FundanmentalInformationProps {
    mode: 'add' | 'edit';
    productData: ProductFormDataWithMedia;
    setProductData: (data: any) => void;
    removeProductImage: (index: number) => void;
    handleProductImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCoverImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleProductVideoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    removeProductVideo: () => void;
    onChangeDescription: (value: string) => void;
    categories: Category[];
    selectedCategories: Category[];
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    handleSelectCategory: (path: Category[]) => void;
}

const FundanmentalInformation: React.FC<FundanmentalInformationProps> = ({
    mode,
    productData,
    setProductData,
    removeProductImage,
    handleProductImageChange,
    handleCoverImageChange,
    handleProductVideoChange,
    removeProductVideo,
    onChangeDescription,
    categories,
    selectedCategories,
    showModal,
    setShowModal,
    handleSelectCategory,
}) => {
    const [showVideoModal, setShowVideoModal] = useState(false);

    return (
        <div className="bg-white rounded shadow p-6">
            <h2 className="text-lg font-semibold mb-6">Thông tin cơ bản</h2>

            {/* Hình ảnh sản phẩm */}
            <div className="mb-6">
                <label className="block font-medium mb-2">
                    * Hình ảnh sản phẩm
                </label>
                <div className="flex flex-wrap gap-4">
                    {productData?.imagesList?.map((img: any, index: number) => (
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
                                onClick={() => removeProductImage(index)}
                                className="absolute cursor-pointer hover:bg-red-600 top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
                            >
                                x
                            </button>
                        </div>
                    ))}

                    {productData?.imagesList?.length < 9 && (
                        <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 flex items-center justify-center text-center cursor-pointer rounded">
                            <label className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 text-sm hover:text-orange-500">
                                <span className="text-2xl">➕</span>
                                <span className="text-xs">Thêm hình</span>
                                <span className="text-[15px] text-gray-400 mt-1">
                                    {productData?.imagesList?.length}/9
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleProductImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    disabled={
                                        productData?.imagesList?.length >= 9
                                    }
                                />
                            </label>
                        </div>
                    )}
                </div>
            </div>

            {/* Ảnh bìa */}
            <div className="mb-6">
                <label className="block font-medium mb-2">Ảnh bìa</label>
                <div className="flex items-center space-x-4">
                    <div className="relative w-32 h-32">
                        <label className="flex flex-col items-center border border-dashed border-gray-300 rounded w-full h-full justify-center text-center cursor-pointer overflow-hidden relative">
                            {productData.defaultImage ? (
                                <ImageNext
                                    width={50}
                                    height={50}
                                    src={productData.defaultImage.preview}
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
                        Tải lên hình ảnh 1:1. Ảnh bìa sẽ được hiển thị tại các
                        trang Kết quả tìm kiếm...
                    </p>
                </div>
            </div>

            {/* Video sản phẩm */}
            <div className="mb-6">
                <label className="block font-medium mb-2">Video sản phẩm</label>

                <div className="flex items-center space-x-4">
                    {showVideoModal && productData.defaultVideoIntro ? (
                        <VideoTrimModal
                            videoUrl={productData.defaultVideoIntro?.preview}
                            onClose={() => setShowVideoModal(false)}
                            onConfirm={(start, end) => {
                                if (end - start < 10) {
                                    useAlertStore.getState().showAlert({
                                        severity: 'warning',
                                        message:
                                            'Đoạn cắt phải dài ít nhất 10 giây!',
                                    });
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
                                            productData.defaultVideoIntro
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
                                            onChange={handleProductVideoChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </label>
                                )}
                            </div>
                        </>
                    )}

                    <p className="text-xs text-gray-500 max-w-xs">
                        * Kích thước tối đa 31Mb, độ phân giải không vượt quá
                        1280x1280px
                        <br />
                        * Độ dài: 10s–60s.
                        <br />
                        * Định dạng: MP4
                        <br />* Lưu ý: sản phẩm có thể hiển thị trong khi video
                        đang được xử lý
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
                <label className="block font-medium mb-2">* Tên sản phẩm</label>
                <input
                    type="text"
                    disabled={mode === 'edit'} // 👈 check bằng prop mode
                    className={`w-full border rounded px-3 py-2 ${
                        mode === 'edit' ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    value={productData.name}
                    onChange={(e) =>
                        setProductData({
                            ...productData,
                            name: e.target.value,
                        })
                    }
                />
                <div className="text-xs text-gray-400 text-right mt-1">
                    {productData.name.length}/100
                </div>
            </div>

            {/* Ngành hàng */}
            <div className="mb-6">
                <label className="block font-medium mb-2">* Ngành hàng</label>
                <button
                    onClick={() => setShowModal(true)}
                    className="w-full border rounded px-3 py-2 text-left bg-white"
                >
                    {selectedCategories.length > 0
                        ? selectedCategories.map((c) => c.name).join(' > ')
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
                <label className="block font-medium mb-2">Mô tả sản phẩm</label>

                <RichTextEditor
                    content={productData.description}
                    onChangeDescription={onChangeDescription}
                />
            </div>

            {/* Bản xem trước */}
        </div>
    );
};
export default FundanmentalInformation;
