
export interface PaymentCard {
  id: string; 
  cardHolderName: string;
  last4Digits: string;
  cardType: "VISA" | "MASTERCARD" | "AMEX" | "JCB";
  expiryDate: string;
  isDefault: boolean;
}

export interface PaymentCardData {
    number: string;
    expiry: string;
    name: string;
    cvc: string;
    cardType?: string; 
    focused?: string;
}

export interface AddPaymentCardRequest {
    cardHolderName: string;
    cardNumber: string;  
    expiryDate: string;  
    cvc: string;     
    cardType: "VISA" | "MASTERCARD" | "AMEX" | "JCB";
    isDefault?: boolean;
}