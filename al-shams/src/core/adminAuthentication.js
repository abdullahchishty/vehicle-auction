import { axiosInstance } from "./adminApi";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
} from "../redux/adminSlices/adminAuthenticationSlice";
import store from "../redux/store";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const loginAdmin = (credentials, navigate) => async (dispatch) => {
  try {
    dispatch(loginStart());

    // Set withCredentials to true to include cookies with the request
    const response = await axiosInstance.post("/user/login", credentials, {
      withCredentials: true, // Include credentials (cookies) in the request
    });
    dispatch(loginSuccess(response.data));
    toast.success("Login successful!");
    navigate("/admin-a1b2c3/"); // Redirect using navigate
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
    toast.error("Login failed. Please try again.");
  }
};
export const logoutAdmin = () => {
  store.dispatch(logout());
};
