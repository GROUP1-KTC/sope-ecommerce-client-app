import type { RootState, AppDispatch } from '~/store/appStore';
import {
    useDispatch,
    useSelector,
    type TypedUseSelectorHook,
} from 'react-redux';

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppDispatch, useAppSelector };
