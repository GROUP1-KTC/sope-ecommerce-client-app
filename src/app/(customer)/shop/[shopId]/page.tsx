'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import SmsIcon from '@mui/icons-material/Sms';
import ProductList from '~/components/product-list/ProductList';
import { useGetShopByIdQuery } from '~/features/shop/shopApi';
import { useAppDispatch } from '~/hooks/useTypes';
import { setSelectedConversationId } from '~/features/chat/chatSlice';
import ChatDialog from '~/components/shared/chat/ChatDialog';
import { useCreateConversationWithShopMutation } from '~/features/chat/conversation/ConversationApi';
import { useGetApprovedProductsByShopQuery } from '~/features/products/productApi';
import {
    EmptyMessage,
    ErrorMessage,
    LoadingMessage,
} from '~/components/shared/loading/FeedBack';
import ProductListLine from '~/components/product-detail/ProductList';

const ShopPage: React.FC = () => {
    const { shopId } = useParams();
    const {
        data: shop,
        isLoading,
        error,
    } = useGetShopByIdQuery(shopId as string);

    const [page, setPage] = useState(0);

    const { data: productByShopApproved } = useGetApprovedProductsByShopQuery({
        shopId: shopId as string,
        page,
        size: 20,
    });

    const dispatch = useAppDispatch();
    const [createConversationWithShop] =
        useCreateConversationWithShopMutation();
    const [openChat, setOpenChat] = React.useState(false);

    if (isLoading)
        return <LoadingMessage message="Đang tải thông tin shop..." />;
    if (error) return <ErrorMessage message="Shop này không tồn tại." />;
    if (!shop) return <EmptyMessage message="Không tìm thấy shop." />;

    const allProducts = productByShopApproved?.content || [];
    const suggestedProducts = allProducts.slice(0, 6);

    const handleChatClick = async () => {
        try {
            const shopIdStr = shopId as string;
            const conv = await createConversationWithShop({
                shopId: shopIdStr,
            }).unwrap();
            dispatch(setSelectedConversationId(conv.conversationId));
            setOpenChat(true);
        } catch (err: any) {
            console.error('Không thể tạo cuộc trò chuyện', err);
            if (err?.data) {
                console.error('Response data:', err.data);
            }
            if (err?.status) {
                console.error('Status:', err.status);
            }
        }
    };

    return (
        <div className="max-w-[80%] w-full mx-auto p-4 space-y-6">
            <div className="flex items-center bg-white p-6 rounded-xl border border-gray-100 shadow-sm gap-6">
                <div className="w-32 h-32 overflow-hidden rounded-full border border-gray-200 flex-shrink-0">
                    <Image
                        src={shop.logoUrl || 'https://via.placeholder.com/200'}
                        alt="Shop Logo"
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex-1 space-y-3">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {shop.name}
                    </h1>
                    <p className="text-sm text-gray-600">{shop.description}</p>
                    <button
                        onClick={handleChatClick}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2 cursor-pointer"
                    >
                        Chat <SmsIcon style={{ fontSize: 18 }} />
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
                    <div>
                        Sản phẩm:{' '}
                        <span className="font-semibold text-red-500">
                            {allProducts.length}
                        </span>
                    </div>
                    <div>
                        Đánh giá:{' '}
                        <span className="font-semibold text-red-500">
                            4.7 (1.8k)
                        </span>
                    </div>
                    <div>
                        Tham gia:{' '}
                        <span className="font-semibold">23 tháng trước</span>
                    </div>
                    <div>
                        Tỉ lệ phản hồi:{' '}
                        <span className="font-semibold">98%</span>
                    </div>
                </div>
            </div>

            <ProductListLine
                title="Gợi ý cho bạn"
                products={suggestedProducts}
            />

            {/* Shop Description */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="font-semibold text-lg text-gray-800 mb-3">
                    Về {shop.name}
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm">
                    {shop.description || 'Cửa hàng chưa có mô tả chi tiết.'}
                </p>
            </div>

            <div
                id="all-products"
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
            >
                <h2 className="font-semibold text-lg text-gray-800 mb-5">
                    Tất cả sản phẩm
                </h2>
                <ProductList
                    products={productByShopApproved?.content || []}
                    page={page}
                    totalPages={productByShopApproved?.totalPages || 1}
                    onPageChange={setPage}
                />
            </div>

            <ChatDialog open={openChat} onClose={() => setOpenChat(false)} />
        </div>
    );
};

export default ShopPage;
