import type { User } from './user';

export interface Shop {
    id: string;
    name: string;
    description?: string;
    address: string;
    logoUrl?: string;
    createdAt: string;
    updatedAt?: string;
    active: boolean;
    isMall: boolean;

    owner: User;
}
