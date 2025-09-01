import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
    id: string;
    username: string | null;
    name: string | null;
    phone: string | null;
    avatarUrl: string | null;
    email: string | null;
    avatar: string | null;
    gender: string | null;
}

const initialState: UserState = {
    id: "",
    username: null,
    email: null,
    avatar: null,
    gender: null,
    name: null,
    phone: null,
    avatarUrl: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            return { ...action.payload };
        },
        clearUser: () => initialState,
        updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { setUser, clearUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
