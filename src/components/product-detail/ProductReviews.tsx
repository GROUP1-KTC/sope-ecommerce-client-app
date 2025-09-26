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

    console.log('check reviews', reviews);

    const averageRating =
        reviews.length > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) /
            reviews.length
            : 0;

    const starCounts = [5, 4, 3, 2, 1].map(
        (star) => reviews.filter((review) => review.rating === star).length,
    );

    // Lọc review theo filter
    const filteredReviews =
        selectedFilter === 'all'
            ? reviews
            : reviews.filter((r) => r.rating === selectedFilter);

    return (
        <div className="border border-gray-200 mx-auto w-[95%] p-6 bg-white rounded-lg mt-4">
            <h2 className="uppercase text-xl font-semibold text-gray-900 mb-4">
                Đánh Giá Sản Phẩm
            </h2>
            <div className="flex items-start space-x-6 bg-red-50 p-4 rounded-lg mb-6">
                <div className="space-y-4 p-4">
                    <div className="flex items-center">
                        <div className='flex items-center'>
                            <div className="text-4xl font-bold text-red-500 mr-2">
                                {averageRating.toFixed(1)}
                            </div>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => {
                                    if (star <= Math.floor(averageRating)) {
                                        return (
                                            <span
                                                key={star}
                                                className="text-3xl text-red-500"
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
                                                    className="text-3xl text-red-500"
                                                >
                                                    ★
                                                </span>
                                            );
                                        } else if (fraction >= 0.25) {
                                            return (
                                                <span
                                                    key={star}
                                                    className="text-3xl text-red-500 relative"
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
                                                    className="text-3xl text-gray-300"
                                                >
                                                    ★
                                                </span>
                                            );
                                        }
                                    } else {
                                        return (
                                            <span
                                                key={star}
                                                className="text-3xl text-gray-300"
                                            >
                                                ★
                                            </span>
                                        );
                                    }
                                })}
                            </div>

                            <div className="flex space-x-2 p-6">
                                <button
                                    onClick={() => setSelectedFilter('all')}
                                    className={`relative px-3 py-1 text-sm cursor-pointer rounded-md 
                        ${selectedFilter === 'all'
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
                                        className={`relative px-3 py-1 flex text-sm cursor-pointer rounded-md 
                            ${selectedFilter === star
                                                ? 'border border-red-500 text-red-500'
                                                : 'bg-gray-200 hover:bg-gray-300'
                                            }`}
                                    >
                                        {star} sao ({starCounts[5 - star]})
                                        {selectedFilter === star && (
                                            <span className="absolute  bottom-0 right-0 w-4 h-4 bg-red-500 text-white flex items-center justify-center text-xs rounded-md">
                                                ✓
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>

                        </div>

                    </div>
                    <div className="text-gray-600">
                        Dựa trên {reviews.length} đánh giá
                    </div>
                    <div className="text-gray-600">
                        {overallReview
                            ? overallReview
                            : 'Chưa có nhận xét chung về sản phẩm này.'}
                    </div>
                </div>


            </div>

            <div className="space-y-6 px-4">
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
                        date={review.createdAt}
                        mediaList={review.mediaList ?? []}
                        attributes={review.productVariant?.attributes ?? []}
                        sentiment={review.sentiment}
                    />
                ))}
            </div>

            <div className="flex justify-center items-center mt-6 space-x-6">
                <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
                    Trước
                </button>
                <button className="px-3 py-1 bg-red-500 rounded-md text-white">
                    1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
                    Tiếp
                </button>
            </div>
        </div>
    );
};

export default ProductReviews;
