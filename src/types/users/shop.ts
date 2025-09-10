import type { ShopAddress } from '../address';
import type { User } from './user';

export interface Shop {
    id: string;
    name: string;
    description?: string;
    address: ShopAddress;
    logoUrl?: string;
    createdAt: string;
    updatedAt?: string;
    active: boolean;
    isMall: boolean;

    owner: User;
}
