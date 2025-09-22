export enum IdentifierType {
    CITIZEN_IDENTIFICATION = 'CITIZEN_IDENTIFICATION',
    PASSPORT = 'PASSPORT',
}

export interface ShopAddressRequest {
    province: string;
    district: string;
    ward: string;
    detail: string;
}

export interface IdentityRequest {
    idType: IdentifierType;
    idName: string;
    idNumber: string;
    idFront: File;
    idBack: File;
    selfie: File;
}

export interface ShopCreateRequest {
    name: string;
    phone: string;
    email: string;
    address: ShopAddressRequest;
    description?: string;
    logoFile?: File;
    taxCode?: string;
    taxFile?: File;
    isMall: boolean;
    identity: IdentityRequest;
}

interface Shop {
    id: string;
    name: string;
    avatarUrl?: string;
    address?: {
        id: string;
        street: string;
        ward: string;
        district: string;
        city: string;
        country: string;
    };
}

interface SellerInfo {
    name: string;
    lastestTimeOnline: string;
    shopAvatar: string;
    numOfReviews: number;
    responseRate: number;
    responseTime: string;
    timeActive: string;
    numOfProducts: number;
    numOfFollowers: number;
}
