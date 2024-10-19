import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  token: {
    accessToken: null,
    refreshToken: null,
  },
  user:{
    username:null,
    email:null,
  },
  isLoading: false,
  error: null,
};

const adminAuthenticationSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.error = null;
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.token = action.payload;
      state.user = {
        username: action.payload.username,
        email: action.payload.email,
      };
      state.isLoading = false;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.token = {
        accessToken: null,
        refreshToken: null,
      };
      sessionStorage.removeItem("persist:root");
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  adminAuthenticationSlice.actions;
export default adminAuthenticationSlice.reducer;
