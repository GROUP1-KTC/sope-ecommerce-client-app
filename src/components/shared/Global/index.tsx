'use client';

import GlobalAlert from '~/components/shared/alert/GlobalAlert';
import GlobalModal from '~/components/shared/modal/GlobalModal';
import ChatFloatButton from '../chat/ChatFloatButton';
import { usePathname } from 'next/navigation';

const GlobalComponent = () => {
    const location = usePathname() || '/';

    const allowedPrefixes = [
        '/seller',
        '/login',
        '/signup',
        '/forgot-password',
        '/reset-password',
        '/help',
        '/terms',
        '/privacy',
        '/about',
        '/contact',
        '/policy',
        '/cookie-policy',
        '/shipping-policy',
        '/return-policy',
        '/refund-policy',
        '/shipper',
        '/admin',
        '/create-shop',
        '/live',
    ];

    const shouldRender = allowedPrefixes.some((prefix) =>
        location.startsWith(prefix),
    );

    // const token = request.cookies.get('access_token')?.value;

    return (
        <>
            <GlobalAlert />
            <GlobalModal />
            {!shouldRender && <ChatFloatButton />}
        </>
    );
};

export default GlobalComponent;
