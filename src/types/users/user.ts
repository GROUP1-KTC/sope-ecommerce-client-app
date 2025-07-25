// TEST PRODUCT + CATEGORY (AI LÀM USER THÌ SỬA SAU NHA)

import type { Gender } from './enum/gender';
import type { Shop } from './shop';

export interface User {
    userId: string;
    fullName: string;
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
