'use client';

import GlobalAlert from '~/components/shared/alert/GlobalAlert';
import GlobalModal from '~/components/shared/modal/GlobalModal';
import ChatFloatButton from '../chat/ChatFloatButton';
import { usePathname } from 'next/navigation';

const GlobalComponent = () => {
    const location = usePathname();

    const shouldRender = location.startsWith('/seller');
    return (
        <>
            <GlobalAlert />
            <GlobalModal />
            {!shouldRender && <ChatFloatButton />}
        </>
    );
};

export default GlobalComponent;
