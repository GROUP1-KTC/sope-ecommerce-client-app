'use client';

import type { PaymentCard } from '~/types/payment';
import PaymentCardItem from './PaymentCard';

const PaymentList = ({
    cards,
    onDelete,
}: {
    cards: PaymentCard[];
    onDelete: (id: string) => void;
}) => {
    return (
        <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Thẻ đã thêm</h2>
            {cards.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {cards.map((card) => (
                        <PaymentCardItem
                            key={card.id}
                            card={card}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">Không có thẻ nào được thêm.</p>
            )}
        </div>
    );
};

export default PaymentList;
