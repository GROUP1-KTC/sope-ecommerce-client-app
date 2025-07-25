'use client';
import type { FormEvent } from 'react';
import { useState } from 'react';
import PaymentList from '~/components/payment/PaymentList';
import AddPaymentCardDialog from '~/components/payment/AddPaymentCardDialog';

type Card = {
    id: number;
    number: string;
    expiry: string;
    name: string;
    type: string;
    logo: string;
};

type CardData = {
    number: string;
    expiry: string;
    name: string;
    cvc: string;
    focused?: string;
};

const PaymentManagementPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cardData, setCardData] = useState<CardData>({
        number: '',
        expiry: '',
        name: '',
        cvc: '',
        focused: '',
    });

    const [storedCards, setStoredCards] = useState<Card[]>([
        {
            id: 1,
            number: '1231231331234',
            expiry: '12/25',
            name: 'Pham',
            type: 'Mastercard',
            logo: 'https://down-vn.img.susercontent.com/file/d4bbea4570b93bfd5fc652ca82a262a8',
        },
        {
            id: 2,
            number: '1231231335678',
            expiry: '06/26',
            name: 'Pham',
            type: 'VCB',
            logo: 'https://antt.mediacdn.vn/83577812655439872/2024/12/26/vietcombank-1735202958516527402000.jpg',
        },
    ]);

    const handleAddCard = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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

        const newCard: Card = {
            id: Date.now(),
            number: cardData.number,
            expiry: cardData.expiry,
            name: cardData.name,
            type: determineCardType(cardData.number),
            logo: 'https://via.placeholder.com/40',
        };
        setStoredCards([...storedCards, newCard]);
        setCardData({ number: '', expiry: '', name: '', cvc: '', focused: '' });
        setIsModalOpen(false);
    };

    const determineCardType = (number: string): string => {
        const cleanedNumber = number.replace(/\s/g, '');
        if (/^4/.test(cleanedNumber)) return 'Visa';
        if (/^5[1-5]/.test(cleanedNumber)) return 'Mastercard';
        return 'Unknown';
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
                            <PaymentList cards={storedCards} />
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
