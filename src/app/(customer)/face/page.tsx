'use client';

import React from 'react';
import FaceScanModal from '~/components/face/FaceScanModal';

function page() {
    return (
        <FaceScanModal
            isOpen={true}
            onClose={() => {}}
            username={'khanhne'}
            mode={'verify'}
        />
    );
}

export default page;
