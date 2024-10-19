import axios from "axios";
import toast from "react-hot-toast";
import store from "../redux/store";
import { loginSuccess, logout } from "../redux/slices/authenticationSlice";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create a separate instance for refresh token requests
const refreshInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Flag to prevent multiple refresh token requests
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response ? error.response.status : null;

    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = store.getState().auth.token.refreshToken;

        // Use the separate instance for refresh token request
        const { data } = await refreshInstance.get("/customer/refresh", {
          withCredentials: true,
        });

        store.dispatch(
          loginSuccess({
            accessToken: data.accessToken,
            refreshToken: refreshToken,
          })
        );

        // Process queue with new token
        processQueue(null, data.accessToken);

        // Update the failed request with new token
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        store.dispatch(logout());
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);