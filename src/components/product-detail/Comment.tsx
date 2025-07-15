import React from 'react';

interface CommentProps {
    avatar: string;
    name: string;
    rating: number;
    date: string;
    comment: string;
    productImage?: string;
}

const Comment: React.FC<CommentProps> = ({ avatar, name, rating, date, comment, productImage = 'https://miro.medium.com/v2/resize:fit:1400/1*fDdHpj6wZIfFsfU8sRJ_RA.png' }) => {
    return (
        <div>
            <div className="flex items-start space-x-4">
                <img
                    src={avatar}
                    alt={`${name}'s avatar`}
                    width={36}
                    height={36}
                    className="rounded-full object-cover border"
                />

                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-gray-800">{name}</h3>
                        <span className="text-sm text-gray-500">{date}</span>
                    </div>
                    <div className="flex items-center mt-1">
                        {Array.from({ length: 5 }, (_, i) => (
                            <span
                                key={i}
                                className={`text-yellow-500 ${i < rating ? 'fill-current' : ''}`}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <p className="text-gray-600 mt-2">{comment}</p>
                    <div className='mt-2'>
                        <img
                        src={productImage}
                        alt={`${name}'s product`}
                        width={128}
                        height={128}
                        className="rounded-lg object-cover border"
                    />
                    </div>
                </div>
            </div>

            <hr className="w-full border-t border-gray-200 mt-4" />
        </div>
    );
};

export default Comment;
