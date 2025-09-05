
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

export type TempAddress = {
  fullName: string;
  phone: string;
  province: string;        // code tỉnh/thành
  district: string;        // code quận/huyện
  ward: string;            // code phường/xã
  detailedAddress: string; // số nhà, tên đường
  isDefault?: boolean;     // optional, nếu sau này muốn cho guest set mặc định
};
