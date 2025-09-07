export interface Address {
    id: string;
    recipientName: string;
    phoneNumber: string;
    street: string;
    ward: string;
    district: string;
    city: string;
    country: string;
    isDefault: boolean;
}

export interface AddressCreateRequest {
    recipientName: string;
    phoneNumber: string;
    street: string;
    ward: string;
    district: string;
    city: string;
    country: string;
    isDefault: boolean;
}



import type { Province, District, Ward } from '~/components/checkout/TempAddressSection';


export type TempAddress = {
    email: string;
    fullName: string;
    phone: string;
    province: Province | null;
    district: District | null;
    ward: Ward | null;
    detailedAddress: string; // số nhà, tên đường
    isDefault?: boolean;     // optional, nếu sau này muốn cho guest set mặc định
};
