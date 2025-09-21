import Image from 'next/image';
import React from 'react';
import type { Attribute } from '~/types/products';
import type { ReviewMedia } from '~/types/products/review_media';
import type { Sentiment } from '~/types/sentiment';

interface CommentProps {
    avatar: string;
    username: string;
    rating: number;
    date: string;
    content?: string;
    videoReviewUrl?: string;
    mediaList?: ReviewMedia[];
    attributes?: Attribute[];
    sentiment?: Sentiment;
}

const Comment: React.FC<CommentProps> = ({
    avatar,
    username,
    rating,
    date,
    content,
    videoReviewUrl,
    mediaList = [],
    attributes = [],
    sentiment,
}) => {
    return (
        <div className="mb-6">
            <div className="flex items-start space-x-4">
                <Image
                    src={avatar}
                    alt={`${username}'s avatar`}
                    width={36}
                    height={36}
                    className="rounded-full object-cover border"
                />

                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <div className="flex items-baseline gap-1">
                            <h3 className="font-semibold text-gray-800">
                                {username}
                            </h3>
                            {attributes && attributes.length > 0 && (
                                <span className="text-sm text-gray-500 ml-2">
                                    Phân loại hàng:{' '}
                                    {attributes
                                        .map((attr) => attr.value)
                                        .join(', ')}
                                </span>
                            )}
                        </div>

                        <span className="text-sm text-gray-500">
                            {new Date(date).toLocaleString('vi-VN', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                            })}
                        </span>
                    </div>
                    <div className="flex items-center mt-1">
                        {Array.from({ length: 5 }, (_, i) => {
                            return (
                                <span
                                    key={i}
                                    className="relative inline-block text-yellow-500"
                                >
                                    <span
                                        className={`absolute overflow-hidden`}
                                        style={{
                                            width: `${Math.min(Math.max(rating - i, 0), 1) * 100}%`,
                                        }}
                                    >
                                        ★
                                    </span>
                                    {/* empty star */}
                                    <span className="text-gray-300">★</span>
                                </span>
                            );
                        })}
                    </div>
                    {sentiment && (
                        <span
                            className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded ${
                                sentiment === 'POSITIVE'
                                    ? 'bg-green-100 text-green-700'
                                    : sentiment === 'NEGATIVE'
                                      ? 'bg-red-100 text-red-700'
                                      : 'bg-gray-100 text-gray-600'
                            }`}
                        >
                            {sentiment === 'POSITIVE'
                                ? 'Tích cực 😊'
                                : sentiment === 'NEGATIVE'
                                  ? 'Tiêu cực 😡'
                                  : 'Trung lập 😐'}
                        </span>
                    )}

                    {content && <p className="text-gray-600 mt-2">{content}</p>}
                    {(videoReviewUrl || mediaList.length > 0) && (
                        <div className="flex flex-wrap mt-2 gap-2">
                            {videoReviewUrl && (
                                <video
                                    src={videoReviewUrl}
                                    controls
                                    className="w-30 h-30 rounded-lg object-contain border border-gray-200"
                                />
                            )}

                            {/* Hiển thị tất cả ảnh */}
                            {mediaList.map((media) => (
                                <Image
                                    key={media.id}
                                    src={media.url}
                                    alt={`media-${media.id}`}
                                    width={112}
                                    height={112}
                                    className="w-30 h-30 rounded-lg object-contain border border-gray-200"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <hr className="w-full border-t border-gray-200 mt-4" />
        </div>
    );
};

export default Comment;
