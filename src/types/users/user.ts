import type { Gender } from './enum/gender';
import type { Shop } from './shop';

export interface User {
    userId: string;
    name: string;
    dateOfBirth?: string;
    gender?: Gender;
    email: string;
    password?: string;
    socialMediaId?: string;
    phone?: string;
    tax?: string;
    verified: boolean;
    locked: boolean;
    createdAt: string;

    shop?: Shop;
}
