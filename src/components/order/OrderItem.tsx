import React, { useEffect, useState } from 'react';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import Image from 'next/image';
import type {
    OrderGroupShop,
    OrderStatus,
    OrderStatusHistory,
} from '~/types/orders/order';
import { useCancelOrderMutation } from '~/features/orders/orderApiSlide';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
} from '@mui/material';
import ReviewForm from './ReviewForm';
import { loadAuthUser } from '~/utils/authCookie';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useGetReviewsByUserIdQuery } from '~/features/reviews/reviewApi';

interface Props {
    orderGroup: OrderGroupShop;
    refetchOrders: () => void;
}

export const statusColors: Record<OrderStatus, string> = {
    PENDING: 'text-yellow-600',
    CONFIRMED: 'text-blue-600',
    SHIPPING: 'text-purple-600',
    DELIVERED: 'text-green-600',
    CANCELLED: 'text-red-600',
    RETURNED: 'text-gray-600',
};

const cancelReasons = [
    'Tôi muốn thay đổi sản phẩm',
    'Tìm thấy giá rẻ hơn ở nơi khác',
    'Thời gian giao hàng quá lâu',
    'Đặt nhầm sản phẩm',
];

const OrderItem: React.FC<Props> = ({ orderGroup, refetchOrders }) => {
    const order = orderGroup.order;
    const shop = order.shopInfo;
    const [showHistory, setShowHistory] = useState(false);

    const [openCancelDialog, setOpenCancelDialog] = useState(false);
    const [selectedReason, setSelectedReason] = useState('');
    const [customReason, setCustomReason] = useState('');
    const [cancelOrder, { isLoading }] = useCancelOrderMutation();

    const router = useRouter();

    const [showReview, setShowReview] = useState(false);

    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    const [userId, setId] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = loadAuthUser();
        if (storedUser) {
            setId(storedUser.id);
        }
    }, []);

    const { data: reviews } = useGetReviewsByUserIdQuery(userId!, {
        skip: !userId,
    });

    console.log('User reviews:', reviews);

    const handleCloseReview = () => {
        setShowReview(false);
    };

    const handleConfirmCancel = async () => {
        const reason = customReason || selectedReason || 'Không rõ lý do';
        try {
            await cancelOrder({ orderId: order.orderId, reason }).unwrap();
            setOpenCancelDialog(false);
            setSelectedReason('');
            setCustomReason('');
            refetchOrders();
        } catch (e) {
            console.error('Cancel order failed', e);
        }
    };

    return (
        <div className="p-6 mb-4 rounded-lg shadow bg-white border">
            {/* Shop header */}
            <div className="mb-4 flex items-center space-x-6">
                <StorefrontOutlinedIcon className="text-gray-600" />
                <Link
                    href={`/shop/${shop?.id}`}
                    className="text-black font-semibold pointer-cursor"
                >
                    {shop?.name ?? 'Không rõ shop'}
                </Link>

                <button className="bg-red-500 cursor-pointer text-white text-xs px-3 py-1 rounded hover:bg-red-600 transition flex items-center ml-auto">
                    <ChatOutlinedIcon className="mr-1" fontSize="small" />
                    Chat
                </button>
                <p
                    className={`ml-4 font-semibold ${statusColors[order.status]}`}
                >
                    {order.status}
                </p>
            </div>

            <hr className="my-4 border-t border-gray-300" />

            {/* Order items */}
            {order.items.map((item) => {
                const alreadyReviewed = reviews?.some(
                    (review) =>
                        review.productVariant.productVariantId === item.productVariantId
                );

                return (
                    <div
                        key={item.productVariantId}
                        className="flex items-center justify-between mb-4"
                    >
                        <div className="flex items-center space-x-4">
                            <Image
                                width={96}
                                height={96}
                                src={item.imageUrl || '/placeholder.png'}
                                alt={order.orderNumber}
                                className="w-24 h-24 object-cover rounded-md"
                            />
                            <div>
                                <p className="text-black font-semibold">
                                    Sản phẩm: {item.productName}
                                </p>
                                <p className="text-gray-600">Số lượng: {item.quantity}</p>
                                <p className="text-gray-600">
                                    Giá: {item.price.toLocaleString()} đ
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <p className="text-gray-800 font-medium">
                                {(item.price * item.quantity).toLocaleString()} đ
                            </p>

                            {order.status === 'DELIVERED' && (
                                alreadyReviewed ? (
                                    <button
                                        disabled
                                        className="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed"
                                    >
                                        Đã đánh giá
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setSelectedItem(item);
                                            setShowReview(true);
                                        }}
                                        className="px-4 py-2 cursor-pointer bg-orange-500 text-white rounded hover:bg-orange-600"
                                    >
                                        Đánh giá
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                );
            })}

            <hr className="my-4 border-t border-gray-300" />

            {/* Tổng tiền */}
            <div className="flex justify-end mb-4">
                <p className="text-gray-600">
                    Thành tiền:{' '}
                    <span className="font-semibold text-red-500 text-xl">
                        {order.totalAmount.toLocaleString()} đ
                    </span>
                </p>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end space-x-3">
                {order.paymentMethod !== 'COD' &&
                    order.paymentStatus === 'PENDING' &&
                    order.paymentPayUrl && (
                        <button
                            onClick={() =>
                                router.push(order.paymentPayUrl || '')
                            }
                            className="bg-red-500 cursor-pointer text-white px-6 py-2 rounded hover:bg-red-600"
                        >
                            Vui lòng thanh toán
                        </button>
                    )}

                {order.status === 'PENDING' && (
                    <button
                        onClick={() => setOpenCancelDialog(true)}
                        className="bg-red-500 cursor-pointer text-white px-6 py-2 rounded hover:bg-red-600"
                    >
                        Hủy đơn hàng
                    </button>
                )}

                {order.status === 'SHIPPING' && (
                    <>
                        <button className="bg-green-500 cursor-pointer text-white px-6 py-2 rounded hover:bg-green-600">
                            Đã nhận được hàng
                        </button>
                        <button className="bg-gray-200 cursor-pointer text-gray-800 px-6 py-2 rounded hover:bg-gray-300">
                            Yêu cầu trả hàng / hoàn tiền
                        </button>
                    </>
                )}

                {order.status === 'CONFIRMED' && (
                    <button className="bg-gray-200 cursor-pointer text-gray-800 px-6 py-2 rounded hover:bg-gray-300">
                        Viết đánh giá
                    </button>
                )}

                {(order.status === 'CANCELLED' ||
                    order.status === 'RETURNED') && (
                        <button className="bg-red-500 cursor-pointer text-white px-6 py-2 rounded hover:bg-red-600">
                            Mua lại
                        </button>
                    )}
            </div>

            {/* Status history toggle */}
            <div className="mt-4">
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => setShowHistory(!showHistory)}
                        className="flex items-center text-blue-600 hover:underline cursor-pointer"
                    >
                        <HistoryOutlinedIcon
                            fontSize="small"
                            className="mr-1"
                        />
                        {showHistory
                            ? 'Ẩn lịch sử trạng thái'
                            : 'Xem lịch sử trạng thái'}
                    </button>

                    {order.items.map((item: any) => (
                        <div key={item.productVariantId}>
                            {order.status === 'DELIVERED' && (
                                <button
                                    onClick={() => {
                                        setSelectedItem(item);
                                        setShowReview(true);
                                    }}
                                    className="px-8 py-2 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Đánh giá
                                </button>
                            )}
                        </div>
                    ))}

                    {showReview && userId && selectedItem && (
                        <ReviewForm
                            itemInfo={selectedItem}
                            userId={userId}
                            onClose={handleCloseReview}
                        />
                    )}
                </div>

                {showHistory && (
                    <ul className="mt-2 border border-gray-200 rounded p-3 bg-gray-50 space-y-2">
                        {order.statusHistory.map(
                            (h: OrderStatusHistory, idx: number) => (
                                <li
                                    key={idx}
                                    className="flex justify-between text-sm text-gray-700"
                                >
                                    <span>{h.status}</span>
                                    <span>
                                        {new Date(h.timestamp).toLocaleString(
                                            'vi-VN',
                                            {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            },
                                        )}
                                    </span>
                                </li>
                            ),
                        )}
                    </ul>
                )}
            </div>

            {order.status === 'CANCELLED' && order.cancelReason && (
                <p className="text-sm text-gray-600 mt-1">
                    Lý do hủy:{' '}
                    <span className="italic">{order.cancelReason}</span>
                </p>
            )}

            {/* Cancel order dialog */}
            <Dialog
                open={openCancelDialog}
                onClose={() => setOpenCancelDialog(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Lý do hủy đơn hàng</DialogTitle>
                <DialogContent>
                    <RadioGroup
                        value={selectedReason}
                        onChange={(e) => setSelectedReason(e.target.value)}
                    >
                        {cancelReasons.map((r) => (
                            <FormControlLabel
                                key={r}
                                value={r}
                                control={<Radio />}
                                label={r}
                            />
                        ))}
                    </RadioGroup>
                    <TextField
                        label="Lý do khác"
                        fullWidth
                        multiline
                        rows={3}
                        value={customReason}
                        onChange={(e) => setCustomReason(e.target.value)}
                        className="mt-3"
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpenCancelDialog(false)}
                        disabled={isLoading}
                    >
                        Hủy
                    </Button>
                    <Button
                        onClick={handleConfirmCancel}
                        variant="contained"
                        color="error"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Đang xử lý...' : 'Xác nhận hủy'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default OrderItem;
