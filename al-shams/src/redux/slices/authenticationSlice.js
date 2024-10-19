import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  token: {
    accessToken: null,
    refreshToken: null,
  },
  isLoading: false,
  error: null,
};

const authenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.error = null;
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.token = action.payload;
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
    signUpStart: (state) => {
      state.error = null;
      state.isLoading = true;
    },
    signUpSuccess: (state, action) => {
      state.token = action.payload;
      state.isLoading = false;
    },
    signUpFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    forgotPasswordStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.message = null;
    },
    forgotPasswordSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    forgotPasswordFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  signUpStart,
  signUpSuccess,
  signUpFailure,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,
} = authenticationSlice.actions;
export default authenticationSlice.reducer;
