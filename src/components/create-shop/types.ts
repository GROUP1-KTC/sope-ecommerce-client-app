// components/CreateShopMultiStep/types.ts
export type Province = { code: number; name: string };
export type District = { code: number; name: string };
export type Ward = { code: number; name: string };

export type Address = {
    senderName: string;
    senderPhone: string;
    city: string;
    district: string;
    ward: string;
    street: string;
    country: string;
};
