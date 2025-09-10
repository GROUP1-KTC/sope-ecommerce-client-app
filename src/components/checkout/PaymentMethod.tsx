'use client';
import type { on } from 'events';
import React, { useState } from 'react';
import type { PaymentMethod, PaymentProvider } from '~/types/orders/order';

interface PaymentMethodSectionProps {
    paymentMethod: PaymentMethod;
    onChangeAction: (method: PaymentMethod) => void;
    onChangeProvider?: (provider: PaymentProvider) => void;
}

const PAYMENT_OPTIONS = [
    { value: 'COD', label: 'Thanh toán khi nhận hàng' },
    { value: 'CREDIT_CARD', label: 'Thẻ tín dụng / thẻ ghi nợ' },
    { value: 'E_WALLET', label: 'Ví điện tử' },
    { value: 'BANK_TRANSFER', label: 'Tài khoản ngân hàng' },
];

const E_WALLETS = [
    { name: 'Momo', logo: 'https://developers.momo.vn/v3/img/logo.svg' },
    {
        name: 'ZaloPay',
        logo: 'https://scdn.zalopay.com.vn/zlp-website/_next/static/media/zalopay-32x32.8f0d7bf0.svg',
    },
    {
        name: 'VNPay',
        logo: 'https://stcd02206177151.cloud.edgevnpay.vn/assets/images/logo-icon/logo-primary.svg',
    },
];

const BANK_CARDS = [
    {
        name: 'Vietcombank',
        logo: 'https://play-lh.googleusercontent.com/KBIgU6nz3hzia77BUj4FyVdL2azYvnttVkreRmc6c-asHof7ErHsY79G_yHdFkI83w=w480-h960-rw',
    },
    {
        name: 'Techcombank',
        logo: 'https://techcombank.com/content/dam/techcombank/custom-code/annual-report-2021/assets/images/logo.svg',
    },
    {
        name: 'BIDV',
        logo: 'https://yt3.googleusercontent.com/D1f41PW2ElJTaEo6yofAVo8G11ACt0WZ6mIQV0T_e-xVbYwaISn4ESrSkVKYknl4ah_4Qd0y=s900-c-k-c0x00ffffff-no-rj',
    },
];

export default function PaymentMethodSection({
    paymentMethod,
    onChangeAction,
    onChangeProvider,
}: PaymentMethodSectionProps) {
    const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
    const [selectedBankCard, setSelectedBankCard] = useState<string | null>(
        null,
    );

    const renderRightContent = () => {
        switch (paymentMethod) {
            case 'COD':
                return (
                    <p>
                        Thanh toán khi nhận hàng, giao tận nơi và thanh toán khi
                        nhận.
                    </p>
                );

            case 'CREDIT_CARD':
                return (
                    <div className="flex flex-col gap-2 mt-2">
                        <p>Thanh toán bằng thẻ tín dụng hoặc thẻ ghi nợ.</p>
                        <select
                            className="border p-2 rounded w-full"
                            value={selectedBankCard || ''}
                            onChange={(e) =>
                                setSelectedBankCard(e.target.value)
                            }
                        >
                            <option value="">-- Chọn thẻ --</option>
                            {BANK_CARDS.map((card) => (
                                <option key={card.name} value={card.name}>
                                    {card.name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Nhập số thẻ"
                            className="border p-2 rounded w-full"
                        />
                    </div>
                );

            case 'E_WALLET':
                return (
                    <div className="flex flex-col gap-2 mt-2">
                        {E_WALLETS.map((wallet) => {
                            const isSelected = selectedWallet === wallet.name;
                            return (
                                <div
                                    key={wallet.name}
                                    className={`flex items-center justify-between border border-gray-300 rounded-lg p-2 cursor-pointer hover:shadow-md transition ${
                                        isSelected
                                            ? 'bg-green-100 border-green-500'
                                            : ''
                                    }`}
                                    onClick={() => {
                                        setSelectedWallet(wallet.name);
                                        onChangeProvider &&
                                            onChangeProvider(
                                                wallet.name.toUpperCase() as PaymentProvider,
                                            );
                                    }}
                                >
                                    <div className="flex items-center">
                                        <img
                                            src={wallet.logo}
                                            alt={wallet.name}
                                            className="w-10 h-10 mr-3"
                                        />
                                        <span className="font-medium">
                                            {wallet.name}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );

            case 'BANK_TRANSFER':
                return (
                    <div className="flex flex-col gap-2 mt-2">
                        {BANK_CARDS.map((card) => {
                            const isSelected = selectedBankCard === card.name;
                            return (
                                <div
                                    key={card.name}
                                    className={`flex items-center justify-between border border-gray-300 rounded-lg p-2 cursor-pointer hover:shadow-md transition ${
                                        isSelected
                                            ? 'bg-green-100 border-green-500'
                                            : ''
                                    }`}
                                    onClick={() =>
                                        setSelectedBankCard(card.name)
                                    }
                                >
                                    <div className="flex items-center">
                                        <img
                                            src={card.logo}
                                            alt={card.name}
                                            className="w-10 h-10 mr-3"
                                        />
                                        <span className="font-medium">
                                            {card.name}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-md flex flex-col sm:flex-row">
            <div className="sm:w-1/3 pr-4 border-b sm:border-b-0 sm:border-r border-dashed border-gray-300">
                <h4 className="text-md font-semibold mb-2">
                    Phương thức thanh toán
                </h4>
                <div className="flex flex-col space-y-2">
                    {PAYMENT_OPTIONS.map((option) => (
                        <label
                            key={option.value}
                            className="flex items-center cursor-pointer"
                        >
                            <input
                                type="radio"
                                name="paymentMethod"
                                value={option.value}
                                checked={paymentMethod === option.value}
                                onChange={(e) =>
                                    onChangeAction(
                                        e.target.value as PaymentMethod,
                                    )
                                }
                                className="mr-2 accent-red-500"
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
            </div>

            <div className="sm:w-2/3 sm:pl-6 pt-4 sm:pt-0 flex justify-center items-center">
                <div className="w-full max-w-md">{renderRightContent()}</div>
            </div>
        </div>
    );
}
