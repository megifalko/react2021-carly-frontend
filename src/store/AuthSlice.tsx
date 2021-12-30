import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isLoggedIn: boolean;
  securityToken: string | null;
}
const initialState: AuthState = { isLoggedIn: false, securityToken: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      console.log("login");
      state.isLoggedIn = true;
    },
    logout: (state) => {
      console.log("logout");
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
