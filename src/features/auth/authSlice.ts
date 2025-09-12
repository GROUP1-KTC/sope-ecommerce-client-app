import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { clearAuthUser, loadAuthUser, saveAuthUser } from '~/utils/authCookie';

interface AuthState {
    id: string | null;
    username: string | null;
    roles: string[];
    accessToken: string | null;
}

const initialState: AuthState = {
    id: null,
    username: null,
    roles: [],
    accessToken: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{
                id: string;
                username: string;
                roles: string[];
                accessToken: string | null;
            }>,
        ) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.roles = action.payload.roles;
            state.accessToken = action.payload.accessToken;

            saveAuthUser(action.payload);
        },
        clearCredentials: (state) => {
            state.username = null;
            state.roles = [];
            state.accessToken = null;
            clearAuthUser();
        },
        loadCredentialsFromStorage: (state) => {
            const storedUser = loadAuthUser();
            if (storedUser) {
                state.id = storedUser.id;
                state.username = storedUser.username;
                state.roles = storedUser.roles;
                state.accessToken = storedUser.accessToken;
            }
        },
    },
});

export const { setCredentials, clearCredentials, loadCredentialsFromStorage } =
    authSlice.actions;
export default authSlice.reducer;
