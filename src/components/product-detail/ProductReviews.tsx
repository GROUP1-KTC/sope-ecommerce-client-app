import React from 'react';
import Comment from './Comment';

interface ProductReviewsProps {
  reviews: {
    id: number;
    avatar: string;
    name: string;
    rating: number;
    date: string;
    comment: string;
  }[];
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ reviews }) => {

  const averageRating = reviews.length > 0
    ? Math.round(reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length)
    : 0;

  const starCounts = [5, 4, 3, 2, 1].map(star =>
    reviews.filter(review => review.rating === star).length
  );

  return (
    <div className="border border-gray-200 mx-auto p-6 bg-white rounded-lg mt-4">
      <h2 className="uppercase text-xl font-semibold text-gray-900 mb-4">Đánh Giá Sản Phẩm</h2>
      <div className="flex items-start space-x-6 bg-red-50 p-4 rounded-lg mb-6">
        <div className="space-y-4 p-4">
          <div className="flex items-center">
            <div className="text-4xl font-bold text-red-500 mr-2">{averageRating.toFixed(1)}</div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-3xl ${star <= averageRating ? 'text-red-500' : 'text-gray-300'}`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div className="text-gray-600">Dựa trên {reviews.length} đánh giá</div>
        </div>
        <div className="flex space-x-2 p-6">
          <button
            className="px-3 py-1 bg-gray-200 text-sm rounded-md hover:bg-gray-300"
          >
            Tất cả ({reviews.length})
          </button>
          {[5, 4, 3, 2, 1].map((star, index) => (
            <button
              key={star}
              className="px-3 py-1 bg-gray-200 text-sm rounded-md hover:bg-gray-300"
            >
              {star} sao ({starCounts[5 - star]})
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6 px-4">
        {reviews.map((review) => (
          <Comment
            key={review.id}
            avatar={review.avatar}
            name={review.name}
            rating={review.rating}
            date={review.date}
            comment={review.comment}
          />
          
        ))}
      </div>

      {/* Phân trang */}
      <div className="flex justify-center items-center mt-6 space-x-6">
        <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">Trước</button>
        <button className="px-3 py-1 bg-red-500 rounded-md text-white">1</button>
        <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">Tiếp</button>
      </div>
    </div>
  );
};

export default ProductReviews;