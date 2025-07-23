'use client';
import { appStore } from '~/store/appStore';
import { Provider } from 'react-redux';

const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return <Provider store={appStore}>{children}</Provider>;
};

export default StoreProvider;
