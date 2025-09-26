import React, { useState } from 'react';
import { useCreateReviewMutation } from '~/features/reviews/reviewApi';
import { Camera, Video } from 'lucide-react';
import { X } from 'lucide-react';
import { useAlertStore } from '~/store/zustand/alertStore';
import Image from 'next/image';

interface ReviewFormProps {
    itemInfo: any;
    userId: string;
    onClose: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
    itemInfo,
    userId,
    onClose,
}) => {
    const [rating, setRating] = useState<number>(5);
    const [content, setContent] = useState<string>('');
    const [mediaFiles, setMediaFiles] = useState<File[]>([]);
    const [videoFile, setVideoFile] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files);
        setMediaFiles((prev) => [...prev, ...files].slice(0, 5));
    };

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        setVideoFile(e.target.files[0]);
    };

    const removeImage = (index: number) => {
        setMediaFiles(mediaFiles.filter((_, i) => i !== index));
    };

    const removeVideo = () => {
        setVideoFile(null);
    };

    const [createReview, { isLoading }] = useCreateReviewMutation();

    const handleSubmit = async () => {
        const formData = new FormData();

        const reviewData = {
            productVariantId: itemInfo.productVariantId,
            appUserId: userId,
            rating,
            content,
        };
        formData.append(
            'review',
            new Blob([JSON.stringify(reviewData)], {
                type: 'application/json',
            }),
        );

        mediaFiles.forEach((file) => formData.append('mediaFiles', file));
        if (videoFile) formData.append('videoFile', videoFile);

        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            const res = await createReview(formData);
            console.log('✅ API response:', res);
            if (res) {
                useAlertStore.getState().showAlert({
                    severity: 'success',
                    message: 'Đánh giá thành công 🎉',
                });
            }
            onClose();
        } catch (err) {
            console.error('❌ Lỗi FE khi gọi createReview:', err);
            useAlertStore.getState().showAlert({
                severity: 'error',
                message: 'FE gọi review lỗi, check console.',
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-100 flex items-center justify-center p-6 pt-[10vh]">
            <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute font-bold top-2 right-2 cursor-pointer text-gray-400 hover:text-gray-600"
                >
                    ✕
                </button>

                <div className="flex items-center mb-4">
                    <Image
                        width={64}
                        height={64}
                        src={itemInfo.imageUrl}
                        alt={itemInfo.productName}
                        className="w-16 h-16 rounded object-cover mr-3"
                    />
                    <div>
                        <p className="font-medium">{itemInfo.productName}</p>
                        <p className="text-sm text-gray-500">
                            SL: {itemInfo.quantity} ·{' '}
                            {itemInfo.price.toLocaleString()}đ
                        </p>
                    </div>
                </div>

                <div className="mb-4 flex justify-between">
                    <p className="text-2sm font-medium mb-1">
                        Chất lượng sản phẩm
                    </p>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => {
                            const filled = star <= rating;
                            return (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className="w-8 h-8 cursor-pointer"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill={filled ? 'url(#grad)' : 'none'}
                                        stroke={filled ? 'none' : 'url(#grad)'}
                                        strokeWidth="2"
                                        className="w-8 h-8"
                                    >
                                        <defs>
                                            <linearGradient
                                                id="grad"
                                                x1="0%"
                                                y1="0%"
                                                x2="0%"
                                                y2="100%"
                                            >
                                                <stop
                                                    offset="0%"
                                                    stopColor="#FFD700"
                                                />
                                                <stop
                                                    offset="100%"
                                                    stopColor="#FFA500"
                                                />
                                            </linearGradient>
                                        </defs>
                                        <path
                                            d="M12 .587l3.668 7.429 8.2 1.193-5.934 5.782 
              1.402 8.172L12 18.896l-7.336 3.867 
              1.402-8.172L.132 9.209l8.2-1.193z"
                                        />
                                    </svg>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content */}
                <div className="mb-4">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm này..."
                        className="w-full border rounded p-3 text-sm min-h-[120px]"
                    />
                </div>

                <div className="flex gap-3 mb-4 flex-wrap">
                    {/* Nếu chưa chọn gì thì hiện nút Thêm */}
                    {mediaFiles.length === 0 && !videoFile && (
                        <>
                            <label className="flex items-center gap-2 px-3 py-2 border border-red-500 text-red-500 rounded text-sm font-medium cursor-pointer hover:bg-red-50">
                                <Camera size={18} />
                                Thêm Hình ảnh
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </label>

                            <label className="flex items-center gap-2 px-3 py-2 border border-red-500 text-red-500 rounded text-sm font-medium cursor-pointer hover:bg-red-50">
                                <Video size={18} />
                                Thêm Video
                                <input
                                    type="file"
                                    accept="video/*"
                                    className="hidden"
                                    onChange={handleVideoChange}
                                />
                            </label>
                        </>
                    )}

                    {/* Nếu đã chọn => hiển thị preview */}
                    {(mediaFiles.length > 0 || videoFile) && (
                        <>
                            {/* Video preview */}
                            {videoFile && (
                                <div className="relative w-22 h-22 border rounded overflow-hidden">
                                    <video
                                        src={URL.createObjectURL(videoFile)}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        onClick={removeVideo}
                                        className="absolute top-1 right-1 cursor-pointer bg-black bg-opacity-50 text-white rounded-full px-1"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            )}

                            {/* Image preview */}
                            {mediaFiles.map((file, idx) => (
                                <div
                                    key={idx}
                                    className="relative w-22 h-22 border rounded overflow-hidden"
                                >
                                    <Image
                                        width={64}
                                        height={64}
                                        src={URL.createObjectURL(file)}
                                        alt={`preview-${idx}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        onClick={() => removeImage(idx)}
                                        className="absolute top-1 right-1 cursor-pointer bg-black bg-opacity-50 text-white rounded-full px-1"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}

                            {/* Ô upload image (ẩn khi đủ 5) */}
                            {mediaFiles.length < 5 && (
                                <label className="w-22 h-22 flex items-center justify-center border-2 border-dashed rounded cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                    <span className="text-gray-500">
                                        + {mediaFiles.length}/5
                                    </span>
                                </label>
                            )}

                            {/* Ô upload video (ẩn khi đã có) */}
                            {!videoFile && (
                                <label className="w-22 h-22 flex items-center justify-center border-2 border-dashed rounded cursor-pointer">
                                    <input
                                        type="file"
                                        accept="video/*"
                                        className="hidden"
                                        onChange={handleVideoChange}
                                    />
                                    <span className="text-gray-500">🎥</span>
                                </label>
                            )}
                        </>
                    )}
                </div>

                {/* Action buttons */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded cursor-pointer text-gray-600 hover:bg-gray-100"
                    >
                        Trở lại
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="px-4 py-2 bg-red-500 cursor-pointer text-white rounded hover:bg-red-600 disabled:opacity-50"
                    >
                        {isLoading ? 'Đang gửi...' : 'Hoàn Thành'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewForm;
