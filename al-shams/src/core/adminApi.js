import axios from "axios";
import toast from "react-hot-toast";
import store from "../redux/store";
import {
  loginSuccess,
  logout,
} from "../redux/adminSlices/adminAuthenticationSlice";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Ensure credentials (cookies) are sent
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().adminAuth.token.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const status = error.response ? error.response.status : null;

    // Check if the error is 401 and the request has not been retried yet
    if (status === 401 && !originalRequest._retry && originalRequest.url !== "/user/refresh") {
      originalRequest._retry = true;

      try {
        const refreshToken = store.getState().adminAuth.token.refreshToken;

        // Perform the refresh token request
        const { data } = await axiosInstance.get("/user/refresh", {
          withCredentials: true,
        });

        // Update tokens in the store and retry the original request
        store.dispatch(
          loginSuccess({
            accessToken: data.accessToken,
            refreshToken: refreshToken, // Keep the same refresh token
          })
        );

        // Set the new access token in the header
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        // Retry the original request with the new token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If the refresh token request fails, log the user out and stop further retries
        store.dispatch(logout());

        return Promise.reject(refreshError); // Do not retry the original request
      }
    }

    // For other errors, just reject the promise
    return Promise.reject(error);
  }
);
