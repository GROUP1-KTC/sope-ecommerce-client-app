'use client';

import { useState, useEffect } from 'react';
import CustomLink from '../shared/loading/CustomLink';
import { loadAuthUser } from '~/utils/authCookie';

const SellerLink = () => {
    const [isSeller, setIsSeller] = useState(false);

    useEffect(() => {
        const roles = loadAuthUser()?.roles || [];
        setIsSeller(roles.includes('SELLER'));
    }, []);

    return (
        <CustomLink href={isSeller ? '/seller' : '/create-shop'} className="hover:text-yellow-200 transition">
            {isSeller ? 'Trang Bán Hàng' : 'Trở thành Người bán Sope'}
        </CustomLink>
    );
};

export default SellerLink;
