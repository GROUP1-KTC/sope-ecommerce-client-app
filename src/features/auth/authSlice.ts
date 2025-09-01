import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ id: string, username: string; roles: string[], accessToken: string | null }>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.roles = action.payload.roles;
      state.accessToken = action.payload.accessToken;

      sessionStorage.setItem("authUser", JSON.stringify(action.payload));
    },
    clearCredentials: (state) => {
      state.username = null;
      state.roles = [];
      state.accessToken = null;
      sessionStorage.removeItem("authUser");
    },
    loadCredentialsFromStorage: (state) => {
      const storedUser = sessionStorage.getItem("authUser");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        state.id = parsedUser.id;
        state.username = parsedUser.username;
        state.roles = parsedUser.roles;
        state.accessToken = parsedUser.accessToken;
      }
    },
  },
});

export const { setCredentials, clearCredentials, loadCredentialsFromStorage } = authSlice.actions;
export default authSlice.reducer;
