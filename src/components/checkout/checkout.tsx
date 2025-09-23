'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '~/hooks/useTypes';
import { clearCheckoutItems } from '~/features/orders/checkoutSlice';
import VoucherSection from '../cart/VoucherSection';
import AddressSection from './AddressSection';
import PaymentMethodSection from './PaymentMethod';
import TempAddressSection from './TempAddressSection';
import { useCheckoutMutation } from '~/features/orders/orderApiSlide';
import type {
    OrderCreateRequest,
    OrderCreateResponse,
    PaymentMethod,
    PaymentProvider,
} from '~/types/orders/order';
import { convertCartGroupsToShopOrderRequests } from '~/utils/convertCartGroupsToShopOrderRequests';
import { useInitiatePaymentMutation } from '~/features/payment/paymentApiSlice';
import OrderSummary from './OrderSummary';
import ShopOrderCard from './ShopOrderCard';
import { useGetShippingRatesMutation } from '~/features/shipping/shippingApiSlice';
import type { ShippingRate } from '~/types/shipping/shipping';
import { useGetPlatformDiscountQuery } from '~/features/discount/discountApiSlice';
import type { Discount } from '~/types/discount/discount';
import { cityString } from '~/utils/city.utils';
import { useGetUserAddressesQuery } from '~/features/address/addressApi';
import type { Address } from '~/types/address';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useAlertStore } from '~/store/zustand/alertStore';
import Cookies from 'js-cookie';
export default function Checkout() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const tempAddress = useAppSelector((state) => state.tempAddress);
    const { data: userAddresses } = useGetUserAddressesQuery(undefined);

    const { data: getDiscountsPlatform } = useGetPlatformDiscountQuery();

    const [shippingRatesByShop, setShippingRatesByShop] = useState<
        Record<string, ShippingRate[]>
    >({});
    const [shippingLoadingByShop, setShippingLoadingByShop] = useState<
        Record<string, boolean>
    >({});
    const [shippingErrorByShop, setShippingErrorByShop] = useState<
        Record<string, any>
    >({});

    const userCoins = 0;
    const shopOrders = useAppSelector((state) => state.checkout.shopOrders);
    const isFormCart = useAppSelector((state) => state.checkout.isFormCart);

    const [idempotencyKey] = useState(() => crypto.randomUUID());

    const [initiatePayment] = useInitiatePaymentMutation();

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('COD');
    const [paymentProvider, setPaymentProvider] =
        useState<PaymentProvider>('MOMO');
    const [isLoading, setIsLoading] = useState(false);
    const [useCoin, setUseCoin] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [getShippingRates] = useGetShippingRatesMutation();

    const [appliedDiscounts, setAppliedDiscounts] = useState<Discount[]>([]);

    const [shopExtras, setShopExtras] = useState<
        Record<
            string,
            {
                note?: string;
                discountCodes?: string[];
                shopVoucher?: string;
                shippingCharge?: number;
                shippingRateId?: string;
            }
        >
    >({});

    const [selectedAddress, setSelectedAddress] = useState<Address | null>(
        null,
    );

    const [createOrder] = useCheckoutMutation();

    useEffect(() => {
        const storedUser = Cookies.get('authUser');
        setIsLoggedIn(!!storedUser);
    }, []);

    useEffect(() => {
        if (shopOrders.length === 0) {
            router.push('/cart');
        }
    }, []);

    useEffect(() => {
        if (errorMessage) {
            useAlertStore.getState().showAlert({
                severity: 'error',
                message: errorMessage,
            });
            setErrorMessage(null);
        }
    }, [errorMessage]);

    useEffect(() => {
        if (isLoggedIn && userAddresses && userAddresses.length > 0) {
            const defaultAddr =
                userAddresses.find((a) => a.isDefault) || userAddresses[0];

            console.log('Default Address:', defaultAddr);
            setSelectedAddress({
                id: defaultAddr.id,
                recipientName: defaultAddr.recipientName,
                phoneNumber: defaultAddr.phoneNumber,
                street: defaultAddr.street,
                ward: defaultAddr.ward,
                district: defaultAddr.district,
                city: defaultAddr.city,
                country: defaultAddr.country,
                isDefault: true,
            });
        }
    }, [isLoggedIn, userAddresses]);

    // useEffect(() => {
    //     if (!isLoggedIn && tempAddress) {
    //         setSelectedAddress({
    //             id: '',
    //             recipientName: tempAddress.fullName || '',
    //             phoneNumber: tempAddress.phone || '',
    //             street: tempAddress.detailedAddress || '',
    //             ward: tempAddress.ward?.name || '',
    //             district: tempAddress.district?.name || '',
    //             city: tempAddress.province?.name || '',
    //             country: 'Vietnam',
    //             isDefault: false,
    //         });
    //     }
    // }, [tempAddress, isLoggedIn]);

    useEffect(() => {
        if (!isLoggedIn && tempAddress) {
            const city = tempAddress.province?.name;
            const district = tempAddress.district?.name;
            const ward = tempAddress.ward?.name;

            if (city && district && ward) {
                const newAddr: Address = {
                    id: '',
                    recipientName: tempAddress.fullName || '',
                    phoneNumber: tempAddress.phone || '',
                    street: tempAddress.detailedAddress || '',
                    ward,
                    district,
                    city,
                    country: 'Vietnam',
                    isDefault: false,
                };

                setSelectedAddress((prev) => {
                    // Chỉ update nếu city/district/ward thực sự thay đổi
                    if (
                        prev?.city === newAddr.city &&
                        prev?.district === newAddr.district &&
                        prev?.ward === newAddr.ward
                    ) {
                        return prev;
                    }
                    return newAddr;
                });
            }
        }
    }, [isLoggedIn, tempAddress, setSelectedAddress]);

    // Calculate totals
    const total = useMemo(
        () =>
            shopOrders
                .flatMap((group) => group.items)
                .reduce((sum, item) => sum + item.price * item.quantity, 0),
        [shopOrders],
    );

    const totalShippingFee = Object.values(shopExtras).reduce(
        (s, si) => s + Number(si?.shippingCharge || 0),
        0,
    );

    const discountAmount = useMemo(() => {
        if (!appliedDiscounts || appliedDiscounts.length === 0) return 0;

        return appliedDiscounts.reduce((sum, d) => {
            if (d.scope === 'FREESHIP') return sum;
            if (total < d.minOrderValue) return sum;

            let discountValue = 0;

            if (d.discountType === 'PERCENTAGE') {
                discountValue = (total * (d.value || 0)) / 100;
            }

            if (d.discountType === 'FIXED_AMOUNT') {
                discountValue = d.value || 0;
            }

            if (d.maxDiscountValue && discountValue > d.maxDiscountValue) {
                discountValue = d.maxDiscountValue;
            }

            return sum + discountValue;
        }, 0);
    }, [appliedDiscounts, total]);

    const shippingDiscountAmount = useMemo(() => {
        if (!appliedDiscounts || appliedDiscounts.length === 0) return 0;

        return appliedDiscounts.reduce((sum, d) => {
            if (d.scope !== 'FREESHIP') return sum;
            if (total < d.minOrderValue) return sum;

            let discountValue = 0;

            if (d.discountType === 'PERCENTAGE') {
                discountValue = (totalShippingFee * (d.value || 0)) / 100;
            }

            if (d.discountType === 'FIXED_AMOUNT') {
                discountValue = d.value || 0;
            }

            if (d.maxDiscountValue && discountValue > d.maxDiscountValue) {
                discountValue = d.maxDiscountValue;
            }

            return sum + discountValue;
        }, 0);
    }, [appliedDiscounts, totalShippingFee, total]);

    const shippingDiscountApplied = Math.max(
        0,
        totalShippingFee - shippingDiscountAmount,
    );

    const finalTotal = Math.max(
        0,
        total - discountAmount + shippingDiscountApplied,
    );

    // Handle order submission
    const handleSubmitOrder = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedAddress === null) {
            setErrorMessage('Vui lòng cập nhật thông tin địa chỉ.');
            return;
        }

        if (!paymentMethod) {
            setErrorMessage('Vui lòng chọn phương thức thanh toán.');
            return;
        }

        setIsLoading(true);

        try {
            const orderData: OrderCreateRequest = {
                idempotencyKey: idempotencyKey,
                paymentMethod: paymentMethod,
                paymentProvider: paymentProvider,

                shopOrders: convertCartGroupsToShopOrderRequests(
                    shopOrders,
                    shopExtras,
                ),
                ...(isLoggedIn
                    ? {
                          orderType: 'user',
                          shippingAddressId: selectedAddress.id,
                          isOrderedFromCart: isFormCart ?? false,
                      }
                    : {
                          orderType: 'guest',
                          guestInfo: {
                              fullName: tempAddress.fullName!,
                              email: tempAddress.email!,
                              phone: tempAddress.phone!,
                              shippingAddress: tempAddress.detailedAddress!,
                              city: tempAddress.province!.name,
                              district: tempAddress.district!.name,
                              ward: tempAddress.ward!.name,
                          },
                      }),
            };

            console.log('Submitting order:', orderData);

            const res: OrderCreateResponse[] =
                await createOrder(orderData).unwrap();

            if (paymentMethod === 'E_WALLET') {
                const totalAmount = res.reduce(
                    (sum, o) => sum + o.order.totalAmount,
                    0,
                );
                const resPayment = await initiatePayment({
                    paymentId: res[0].paymentId,
                    amount: totalAmount,
                    provider: res[0].order.paymentProvider,
                    requestId: idempotencyKey,
                    method: res[0].order.paymentMethod,
                    orderInfo: `Thanh toán lô hàng ${res[0].paymentId}`,
                }).unwrap();

                // backend trả về link redirect sang provider
                if (resPayment.payUrl) {
                    dispatch(clearCheckoutItems());
                    router.push(resPayment.payUrl);
                    return;
                } else {
                    throw new Error('Không tìm thấy payUrl từ server');
                }
            }

            if (paymentMethod === 'COD') {
                dispatch(clearCheckoutItems());

                router.push(
                    `/payment-status?success=true&orderId=${res[0].order.orderId}&amount=${finalTotal}&method=COD`,
                );
                return;
            }
        } catch (error: unknown) {
            if (error as FetchBaseQueryError) {
                const data = (error as FetchBaseQueryError).data as {
                    errors?: string[];
                    message?: string;
                };
                const firstError = data?.errors?.[0] || data?.message || error;
                console.error('Order error:', firstError);
                setErrorMessage(`${firstError}.`);
            } else {
                console.error('Order error:', error);
                setErrorMessage(
                    'Có lỗi xảy ra không xác định. Vui lòng thử lại.',
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    const updateShopNote = (shopId: string, note: string) => {
        setShopExtras((prev) => ({
            ...prev,
            [shopId]: { ...prev[shopId], note },
        }));
    };

    const updateShopDiscount = (shopId: string, shopVoucher: string) => {
        setShopExtras((prev) => ({
            ...prev,
            [shopId]: { ...prev[shopId], shopVoucher },
        }));
    };

    const updateShippingUnit = (shopId: string, shippingUnit: ShippingRate) => {
        const charge = Number(
            (shippingUnit as any).totalAmount ??
                (shippingUnit as any).totalFee ??
                0,
        );
        setShopExtras((prev) => ({
            ...prev,
            [shopId]: {
                ...prev[shopId],
                shippingRateId: shippingUnit.id,
                shippingCharge: charge,
            },
        }));
    };

    const onApplyVouchers = (codes: string[]) => {
        if (!getDiscountsPlatform) return;

        const selectedPlatform = getDiscountsPlatform.filter(
            (v) =>
                ['PLATFORM', 'FREESHIP', 'COIN_BACK'].includes(v.scope) &&
                codes.includes(v.code),
        );

        setAppliedDiscounts(selectedPlatform);
        setShopExtras((prev) => {
            const updated = { ...prev };
            const lastShop = shopOrders[shopOrders.length - 1];
            if (lastShop) {
                updated[lastShop.shop.id] = {
                    ...updated[lastShop.shop.id],
                    discountCodes: codes,
                };
            }
            return updated;
        });
    };

    useEffect(() => {
        if (!selectedAddress || shopOrders.length === 0) return;

        shopOrders.forEach((group) => {
            const shopId = group.shop.id;

            console.log('shop address:', group.shop.address);

            const originCity = cityString(
                group.shop.address?.city || 'Hồ Chí Minh',
            );
            const originDistrict = group.shop.address?.district || 'Quận 1';
            const originWard = group.shop.address?.ward || 'Phường Bến Nghé';

            const destCity = cityString(selectedAddress.city || 'Nam Định');
            const destDistrict = selectedAddress.district || 'Huyện Ý Yên';
            const destWard = selectedAddress.ward || 'Xã Yên Khang';

            const parcelAmount = String(
                group.items.reduce(
                    (s: number, it: any) =>
                        s + (it.price || 0) * (it.quantity || 1),
                    0,
                ),
            );
            const weightSum = group.items.reduce(
                (s: number, it: any) =>
                    s + (it.weight ?? 1000) * (it.quantity ?? 1),
                0,
            );

            const request = {
                shipment: {
                    address_from: {
                        city: originCity,
                        district: originDistrict,
                        ward: originWard,
                    },
                    address_to: {
                        city: destCity,
                        district: destDistrict,
                        ward: destWard,
                    },
                    parcel: {
                        cod: '0',
                        amount: parcelAmount,
                        weight: String(weightSum),
                        width: '20',
                        height: '10',
                        length: '30',
                    },
                },
            };

            (async () => {
                setShippingLoadingByShop((p) => ({ ...p, [shopId]: true }));
                setShippingErrorByShop((p) => ({ ...p, [shopId]: null }));
                try {
                    const res = await getShippingRates(request).unwrap();
                    console.log('Shipping rates for shop', shopId, res);
                    setShippingRatesByShop((p) => ({ ...p, [shopId]: res }));
                } catch (err) {
                    setShippingErrorByShop((p) => ({ ...p, [shopId]: err }));
                } finally {
                    setShippingLoadingByShop((p) => ({
                        ...p,
                        [shopId]: false,
                    }));
                }
            })();
        });
    }, [selectedAddress, shopOrders, getShippingRates]);

    return (
        <div className="bg-gradient-to-b from-gray-200 to-gray-50 min-h-screen py-4">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-6 mt-4">
                {isLoggedIn ? (
                    <AddressSection
                        selectedAddress={selectedAddress}
                        setSelectedAddress={setSelectedAddress}
                        userAddresses={userAddresses || []}
                    />
                ) : (
                    <TempAddressSection />
                )}

                <div className="mb-6">
                    {shopOrders.map((group) => (
                        <ShopOrderCard
                            key={group.shop.id}
                            group={group}
                            shopExtras={shopExtras}
                            updateShopNote={updateShopNote}
                            updateShopDiscount={updateShopDiscount}
                            updateShippingUnit={updateShippingUnit}
                            shippingRates={
                                shippingRatesByShop[group.shop.id] || []
                            }
                            shippingLoading={
                                !!shippingLoadingByShop[group.shop.id]
                            }
                            shippingError={shippingErrorByShop[group.shop.id]}
                        />
                    ))}
                </div>

                {isLoggedIn && (
                    <VoucherSection
                        vouchers={getDiscountsPlatform || []}
                        userCoins={userCoins}
                        useCoin={useCoin}
                        setUseCoin={setUseCoin}
                        total={total}
                        onApplyVouchers={onApplyVouchers}
                    />
                )}
                <PaymentMethodSection
                    paymentMethod={paymentMethod}
                    onChangeAction={setPaymentMethod}
                    onChangeProvider={setPaymentProvider}
                />

                <OrderSummary
                    total={total}
                    shippingFee={totalShippingFee}
                    discount={discountAmount}
                    shippingDiscount={shippingDiscountAmount}
                    finalTotal={finalTotal}
                    isLoading={isLoading}
                    onSubmit={handleSubmitOrder}
                />
            </div>
        </div>
    );
}
