// utils/axiosInstance.js
import axios from "axios";
import { getToken } from "./auth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_baseURL, // your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
