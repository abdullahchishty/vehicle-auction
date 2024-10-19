import { axiosInstance } from "./api";
import {
  forgotPasswordFailure,
  forgotPasswordStart,
  forgotPasswordSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
  signUpFailure,
  signUpStart,
  signUpSuccess,
} from "../redux/slices/authenticationSlice";
import store from "../redux/store";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const loginUser = (credentials, navigate) => async (dispatch) => {
  try {
    dispatch(loginStart());
    // Set withCredentials to true to include cookies with the request
    const response = await axiosInstance.post("/customer/login", credentials, {
      withCredentials: true, // Include credentials (cookies) in the request
    });
    dispatch(loginSuccess(response.data));
    toast.success("Login successful!");
    navigate("/"); // Redirect using navigate
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
    toast.error("Login failed. Please try again.");
  }
};
export const signupUser = (credentials, navigate) => async (dispatch) => {
  try {
    dispatch(signUpStart());
    const response = await axiosInstance.post(
      "/customer/register",
      credentials
    );
    dispatch(signUpSuccess(response.data));
    toast.success("Signup successful!");
    navigate("/login");
  } catch (error) {
    dispatch(signUpFailure(error.response.data.message));
    toast.error("Signup failed. Please try again.");
  }
};
export const forgotPassword = (email, navigate) => async (dispatch) => {
  try {
    dispatch(forgotPasswordStart());

    const response = await axiosInstance.post("/customer/forgetPassword", {
      email,
    });

    dispatch(forgotPasswordSuccess(response.data.message));
    toast.success("Password reset email sent!");
  } catch (error) {
    dispatch(forgotPasswordFailure(error.response.data.message));
    toast.error("Failed to send password reset email. Please try again.");
  }
};
export const resendPasswordEmail = (email, navigate) => async (dispatch) => {
  try {
    await axiosInstance.post("/customer/resend-password", { email });
    toast.success("Password reset email resent!");
  } catch (error) {
    toast.error("Failed to resend password reset email. Please try again.");
  }
};
export const forgotPasswordReset = (data) => async (dispatch) => {
  try {
    await axiosInstance.post("/customer/resetPassword/", data);
    toast.success("Password reset successful!");
    window.location.href = "/login";
  } catch (error) {
    toast.error("Password reset failed. Please try again.");
  }
};
export const logoutUser = async () => {
  store.dispatch(logout());
  await axiosInstance.post("/customer/logout");
  toast.success("Logout successful")
};
