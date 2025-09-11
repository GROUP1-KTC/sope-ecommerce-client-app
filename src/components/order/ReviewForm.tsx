import React, { useState } from 'react';
import { useCreateReviewMutation } from '~/features/reviews/reviewApi';
import { Camera, Video } from "lucide-react";
import { X } from "lucide-react";

interface ReviewFormProps {
	itemInfo: any;
	userId: string;
	onClose: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ itemInfo, userId, onClose }) => {
	const [rating, setRating] = useState<number>(5);
	const [content, setContent] = useState<string>('');
	const [mediaFiles, setMediaFiles] = useState<File[]>([]);
	const [videoFile, setVideoFile] = useState<File | null>(null);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		const files = Array.from(e.target.files);
		setMediaFiles(prev => [...prev, ...files].slice(0, 5));
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
		formData.append('review', new Blob([JSON.stringify(reviewData)], { type: 'application/json' }));

		mediaFiles.forEach((file) => formData.append('mediaFiles', file));
		if (videoFile) formData.append('videoFile', videoFile);

		for (const [key, value] of formData.entries()) {
			console.log(`${key}:`, value);
		}

		try {
			const res = await createReview(formData);
			console.log("✅ API response:", res);
			if (res) {
				alert('Đánh giá thành công 🎉');
			}
			onClose();
		} catch (err) {
			console.error('❌ Lỗi FE khi gọi createReview:', err);
			alert('FE gọi review lỗi, check console.');
		}
	};

	return (
		<div className="fixed inset-0 bg-black/40 z-100 flex items-center justify-center p-6 pt-[10vh]">
			<div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative">

				<button
					onClick={onClose}
					className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
				>
					✕
				</button>

				{/* Thông tin sản phẩm */}
				<div className="flex items-center mb-4">
					<img
						src={itemInfo.imageUrl}
						alt={itemInfo.productName}
						className="w-16 h-16 rounded object-cover mr-3"
					/>
					<div>
						<p className="font-medium">{itemInfo.productName}</p>
						<p className="text-sm text-gray-500">
							SL: {itemInfo.quantity} · {itemInfo.price.toLocaleString()}đ
						</p>
					</div>
				</div>

				<div className="mb-4 justify-between">
					<p className="text-sm font-medium mb-1">Chất lượng sản phẩm</p>
					<div className="flex gap-1">
						{[1, 2, 3, 4, 5].map((star) => (
							<button
								key={star}
								type="button"
								onClick={() => setRating(star)}
								className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'
									}`}
							>
								★
							</button>
						))}
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
							<label className="flex items-center gap-2 px-3 py-2 border border-orange-500 text-orange-500 rounded text-sm font-medium cursor-pointer hover:bg-orange-50">
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

							<label className="flex items-center gap-2 px-3 py-2 border border-orange-500 text-orange-500 rounded text-sm font-medium cursor-pointer hover:bg-orange-50">
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
									<img
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
									<span className="text-gray-500">+ {mediaFiles.length}/5</span>
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
						className="px-4 py-2 bg-orange-500 cursor-pointer text-white rounded hover:bg-orange-600 disabled:opacity-50"
					>
						{isLoading ? 'Đang gửi...' : 'Hoàn Thành'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ReviewForm;
