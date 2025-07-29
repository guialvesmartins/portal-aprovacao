import axios from "axios";

export const portalAxios = axios.create();

portalAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth-token");
  if (token) {
    config.headers = {
      ...(config.headers as any),
      Authorization: `Bearer ${token}`,
    } as any;
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
