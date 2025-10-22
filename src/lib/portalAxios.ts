import axios, { InternalAxiosRequestConfig } from "axios";

const baseURL = import.meta.env.VITE_PROTHEUS_SERVER;

export const portalAxios = axios.create({
  baseURL,
});

portalAxios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("auth-token");

  if (token && config.headers) {
    // Ensure Authorization header is set correctly
    (config.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

portalAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("auth-token");
      localStorage.removeItem("auth-user");
    }
    return Promise.reject(error);
  }
);
