import Image from 'next/image';

import SmsIcon from '@mui/icons-material/Sms';
import CustomLink from '../shared/loading/CustomLink';
import { HomeIcon } from 'lucide-react';

interface SellerInfoProps {
    sellerInfo: {
        id: string;
        name: string;
        description: string;
        lastestTimeOnline: string;
        shopAvatar: string;
        numOfReviews: number;
        numOfProducts: number;
    };
    onChatClick?: () => void;
}

const SellerInfo = ({ sellerInfo, onChatClick }: SellerInfoProps) => {
    return (
        <div className="flex flex-col w-[95%] mx-auto bg-white mt-4 p-4 rounded-xl border border-gray-100 shadow-sm gap-6">
            <div className="flex items-center gap-6">
                <div className="w-32 h-32 overflow-hidden rounded-full border border-gray-200 flex-shrink-0">
                    <Image
                        src={sellerInfo.shopAvatar || '/default-avatar.png'}
                        alt="Shop Logo"
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex-1 space-y-3">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {sellerInfo.name}
                    </h2>
                    <div className="flex gap-3 mt-2">
                        <button
                            onClick={onChatClick}
                            className="flex items-center px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition gap-2 cursor-pointer"
                        >
                            Chat <SmsIcon style={{ fontSize: 18 }} />
                        </button>

                        <CustomLink
                            href={`/shop/${sellerInfo.id}`}
                            className="flex items-center border border-gray-300 px-4 py-1 text-sm rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Xem Shop <HomeIcon className="w-4 h-4 ml-1" />
                        </CustomLink>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
                    <div>
                        Sản phẩm:{' '}
                        <span className="font-semibold text-red-500">
                            {sellerInfo.numOfProducts}
                        </span>
                    </div>
                    <div>
                        Đánh giá:{' '}
                        <span className="font-semibold text-red-500">
                            {sellerInfo.numOfReviews} (0)
                        </span>
                    </div>
                    <div>
                        Tham gia:{' '}
                        <span className="font-semibold">0 tháng trước</span>
                    </div>
                    <div>
                        Tỉ lệ phản hồi:{' '}
                        <span className="font-semibold">0%</span>
                    </div>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg text-gray-700 text-md">
                {sellerInfo.description || 'Cửa hàng chưa có mô tả chi tiết.'}
            </div>
        </div>
    );
};

export default SellerInfo;
