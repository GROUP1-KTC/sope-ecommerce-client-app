
export enum IdentifierType {
  CITIZEN_IDENTIFICATION = "CITIZEN_IDENTIFICATION",
  PASSPORT = "PASSPORT",
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
