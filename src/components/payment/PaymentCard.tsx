'use client';

type Card = {
  id: number;
  number: string;
  expiry: string;
  name: string;
  type: string;
  logo: string;
};

const PaymentCard = ({ card }: { card: Card }) => {
  return (
    <div className="p-4 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-3">
        <img src={card.logo} alt={card.type} className="h-10 w-10 object-contain" />
        <span className="text-sm text-gray-500">{card.type}</span>
      </div>
      <div className="text-gray-700 font-semibold mb-1">{card.name}</div>
      <div className="text-sm text-gray-500 mb-1">Số thẻ: **** **** **** {card.number.slice(-4)}</div>
      <div className="text-sm text-gray-500">Hết hạn: {card.expiry}</div>
    </div>
  );
};

export default PaymentCard;