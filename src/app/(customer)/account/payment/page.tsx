'use client';
import type { FormEvent } from 'react';
import { useState } from 'react';
import PaymentList from '~/components/payment/PaymentList';
import AddPaymentCardDialog from '~/components/payment/AddPaymentCardDialog';
import { PaymentCard, PaymentCardData } from '~/types/payment';
import { useAddCardMutation, useDeleteCardMutation, useGetCardsQuery } from '~/features/paymentCard/paymentCardApi';


const PaymentManagementPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cardData, setCardData] = useState<PaymentCardData>({
        number: '',
        expiry: '',
        name: '',
        cvc: '',
        focused: '',
        cardType: '',
    });

    const { data: cards = [], isLoading } = useGetCardsQuery();
    const [addCard, { isLoading: isAdding }] = useAddCardMutation();
    const [deleteCard] = useDeleteCardMutation();


    const handleAddCard = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // validate đơn giản
        if (!/^\d{16}$/.test(cardData.number.replace(/\s/g, ''))) {
            alert('Số thẻ phải có đúng 16 chữ số!');
            return;
        }
        if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) {
            alert('Ngày hết hạn phải có định dạng MM/YY!');
            return;
        }
        if (!/^\d{3,4}$/.test(cardData.cvc)) {
            alert('CVV phải có 3 hoặc 4 chữ số!');
            return;
        }

        try {
            await addCard({
                cardNumber: cardData.number,
                cardHolderName: cardData.name,
                expiryDate: `20${cardData.expiry.split('/')[1]}-${cardData.expiry.split('/')[0]}-01`,
                cardType: cardData.cardType as "VISA" | "MASTERCARD" | "AMEX" | "JCB",
                cvc: cardData.cvc,
            }).unwrap();

            // Reset form + đóng modal
            setCardData({
                number: '',
                expiry: '',
                name: '',
                cvc: '',
                focused: '',
                cardType: '',
            });
            setIsModalOpen(false);
        } catch (error) {
            console.error('Add card failed:', error);
            alert('Thêm thẻ thất bại!');
        }
    };

    const handleDeleteCard = async (id: string) => {
        try {
            await deleteCard(id).unwrap(); // 👈 gọi mutation deleteCard
        } catch (err) {
            console.error('Delete card failed:', err);
            alert('Xoá thẻ thất bại!');
        }
    };

    return (
        <div className="order-detail-page">
            <div className="flex flex-col min-h-screen bg-gray-50 px-4 sm:px-8 md:px-12">
                <div className="flex flex-1">
                    <div className="flex-1 p-4 sm:p-6 bg-white rounded-lg shadow-md my-6 w-full">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-base sm:text-lg md:text-xl font-semibold text-black uppercase mb-6 gap-4">
                            <span>Quản lý thanh toán</span>
                            <button
                                className="bg-red-500 text-white text-sm px-4 py-2 rounded hover:bg-red-600 transition hover:shadow-lg cursor-pointer w-fit"
                                onClick={() => setIsModalOpen(true)}
                            >
                                + Thêm thẻ
                            </button>
                        </div>

                        <hr className="my-4 border-gray-300" />

                        <div className="px-0 sm:px-4 md:px-8">
                            <PaymentList cards={cards} onDelete={handleDeleteCard} />
                        </div>
                    </div>
                </div>
            </div>

            <AddPaymentCardDialog
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                cardData={cardData}
                setCardData={setCardData}
                onSubmit={handleAddCard}
            />
        </div>
    );
};

export default PaymentManagementPage;
