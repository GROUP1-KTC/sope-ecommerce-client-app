import React from 'react';

const trendingStyles = [
    {
        name: 'SOFT BOY ÁO HOODIE',
        img: 'https://down-vn.img.susercontent.com/file/vn-50009109-31f654102e8a96eee10b631c0cb0d0b7',
        price: 4000,
    },
    {
        name: 'E-BOY ÁO SƠ MI DÀI TAY',
        img: 'https://down-vn.img.susercontent.com/file/vn-50009109-a432f617ea2d696fcef811d11eaffba5',
        price: 8999,
    },
    {
        name: 'COOL BOY ÁO KHOÁC',
        img: 'https://down-vn.img.susercontent.com/file/vn-50009109-6a80a8a1a399ad487780112d4c07a74e',
        price: 11000,
    },
    {
        name: 'SPORTY BOY QUẦN JOGGER',
        img: 'https://down-vn.img.susercontent.com/file/vn-50009109-d3b8e481350ebefafdcc8b57b6191edc',
        price: 20000,
    },
    {
        name: 'CITY BOY QUẦN JEANS',
        img: 'https://down-vn.img.susercontent.com/file/vn-50009109-e413a635a7447d15502ed9b612209616',
        price: 40000,
    },
];

const TopTrending = () => {
    return (
        <div className="w-full flex justify-center bg-gray-50 py-8">
            <div className="bg-white rounded-xl shadow p-6 max-w-6xl w-full">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                    TOP TREND CLOTHING FOR MEN
                </h2>
                <div className="grid grid-cols-5 gap-4">
                    {trendingStyles.map((item, idx) => (
                        <div
                            key={idx}
                            className="border rounded-lg bg-white flex flex-col items-center p-2"
                        >
                            <div className="w-full h-48 flex items-center justify-center mb-2 overflow-hidden">
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="object-cover w-full h-full rounded"
                                    loading="lazy"
                                />
                            </div>
                            <div className="w-full text-center">
                                <div className="font-semibold text-sm mb-1 uppercase">
                                    {item.name}
                                </div>

                                <div>
                                    <span>Từ</span>
                                    <span className="text-red-500 text-base font-bold">
                                        {' '}
                                        {item.price.toLocaleString()}₫
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopTrending;
