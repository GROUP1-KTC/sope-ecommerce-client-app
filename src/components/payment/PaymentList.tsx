'use client';
import PaymentCard from './PaymentCard';

type Card = {
    id: number;
    number: string;
    expiry: string;
    name: string;
    type: string;
    logo: string;
};

const PaymentList = ({ cards }: { cards: Card[] }) => {
    const handleDeleteCard = (id: number) => {
        console.log(`Card with id ${id} deleted`);
    };
    return (
        <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Thẻ đã thêm</h2>
            {cards.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cards.map((card) => (
                        <PaymentCard
                            key={card.id}
                            card={card}
                            onDelete={handleDeleteCard}
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
