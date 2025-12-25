import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: userFromStorage || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart(state) {
      state.loading = true;
      state.error = null;
    },

    authSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    authFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    logout(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { authStart, authSuccess, authFail, logout } =
  authSlice.actions;

export default authSlice.reducer;
