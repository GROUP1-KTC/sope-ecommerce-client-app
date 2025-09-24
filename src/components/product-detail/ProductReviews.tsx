import React, { useState } from 'react';
import Comment from './Comment';
import type { Review } from '../../types/products';

interface ProductReviewsProps {
    reviews: Review[];
    overallReview?: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({
    reviews,
    overallReview,
}) => {
    const [selectedFilter, setSelectedFilter] = useState<'all' | number>('all');

    const averageRating =
        reviews.length > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) /
              reviews.length
            : 0;

    const starCounts = [5, 4, 3, 2, 1].map(
        (star) => reviews.filter((review) => review.rating === star).length,
    );

    const filteredReviews =
        selectedFilter === 'all'
            ? reviews
            : reviews.filter((r) => r.rating === selectedFilter);

    return (
        <div className="border border-gray-200 mx-auto w-[95%] p-4 sm:p-6 bg-white rounded-lg mt-4">
            <h2 className="uppercase text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                Customer Reviews
            </h2>

            {/* Tổng quan + filter */}
            <div className="flex flex-col lg:flex-row items-start lg:space-x-6 bg-red-50 p-4 rounded-lg mb-6">
                {/* Average rating */}
                <div className="space-y-4 p-2 sm:p-4 flex-1">
                    <div className="flex items-center flex-wrap">
                        <div className="text-3xl sm:text-4xl font-bold text-red-500 mr-2">
                            {averageRating.toFixed(1)}
                        </div>
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => {
                                if (star <= Math.floor(averageRating)) {
                                    return (
                                        <span
                                            key={star}
                                            className="text-2xl sm:text-3xl text-red-500"
                                        >
                                            ★
                                        </span>
                                    );
                                } else if (
                                    star ===
                                    Math.floor(averageRating) + 1
                                ) {
                                    const fraction =
                                        averageRating -
                                        Math.floor(averageRating);
                                    if (fraction >= 0.8) {
                                        return (
                                            <span
                                                key={star}
                                                className="text-2xl sm:text-3xl text-red-500"
                                            >
                                                ★
                                            </span>
                                        );
                                    } else if (fraction >= 0.25) {
                                        return (
                                            <span
                                                key={star}
                                                className="text-2xl sm:text-3xl text-red-500 relative"
                                            >
                                                <span
                                                    className="absolute overflow-hidden"
                                                    style={{ width: '50%' }}
                                                >
                                                    ★
                                                </span>
                                                <span className="text-gray-300">
                                                    ★
                                                </span>
                                            </span>
                                        );
                                    } else {
                                        return (
                                            <span
                                                key={star}
                                                className="text-2xl sm:text-3xl text-gray-300"
                                            >
                                                ★
                                            </span>
                                        );
                                    }
                                } else {
                                    return (
                                        <span
                                            key={star}
                                            className="text-2xl sm:text-3xl text-gray-300"
                                        >
                                            ★
                                        </span>
                                    );
                                }
                            })}
                        </div>
                    </div>
                    <div className="text-gray-600 text-sm sm:text-base">
                        Dựa trên {reviews.length} đánh giá
                    </div>
                    <div className="text-gray-600 text-sm sm:text-base">
                        {overallReview
                            ? overallReview
                            : 'Chưa có đánh giá tổng quan cho sản phẩm này.'}
                    </div>
                </div>

                {/* Bộ lọc sao */}
                <div className="flex flex-wrap gap-2 mt-4 lg:mt-0 lg:p-6 overflow-x-auto">
                    <button
                        onClick={() => setSelectedFilter('all')}
                        className={`relative px-3 py-1 text-sm cursor-pointer rounded-md 
                        ${
                            selectedFilter === 'all'
                                ? 'border border-red-500 text-red-500'
                                : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                        Tất cả ({reviews.length})
                        {selectedFilter === 'all' && (
                            <span className="absolute bottom-0 right-0 w-4 h-4 bg-red-500 text-white flex items-center justify-center text-xs rounded-md">
                                ✓
                            </span>
                        )}
                    </button>

                    {[5, 4, 3, 2, 1].map((star) => (
                        <button
                            key={star}
                            onClick={() => setSelectedFilter(star)}
                            className={`relative px-3 py-1 text-sm cursor-pointer rounded-md 
                            ${
                                selectedFilter === star
                                    ? 'border border-red-500 text-red-500'
                                    : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                        >
                            {star} sao ({starCounts[5 - star]})
                            {selectedFilter === star && (
                                <span className="absolute bottom-0 right-0 w-4 h-4 bg-red-500 text-white flex items-center justify-center text-xs rounded-md">
                                    ✓
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Danh sách reviews */}
            <div className="space-y-6 px-2 sm:px-4">
                {filteredReviews.map((review) => (
                    <Comment
                        key={review.reviewId}
                        avatar={
                            'https://res.cloudinary.com/dybo8zd4y123/image/upload/v1756883466/mqre9eovhxqpgo4z2pik.webp'
                        }
                        username={review.user.name || 'Người dùng ẩn danh'}
                        rating={review.rating}
                        content={review.content}
                        videoReviewUrl={review.videoReviewUrl}
                        date={new Date(review.createdAt).toLocaleString(
                            'vi-VN',
                            {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: false,
                            },
                        )}
                        mediaList={review.mediaList ?? []}
                        attributes={review.productVariant?.attributes ?? []}
                        sentiment={review.sentiment}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductReviews;
