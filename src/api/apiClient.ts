import axios, { InternalAxiosRequestConfig } from 'axios';
import * as Keychain from 'react-native-keychain';

import { MAIN_DOMAIN, API_PREFIX } from '@/constants/api';

type ApiResponse<T = any> = {
  mess: string;
  status: boolean;
  data: T;
};

export const app = axios.create({
  baseURL: MAIN_DOMAIN + API_PREFIX,
  timeout: 30000,
});

let accessToken: string | null = null;

export const loadAccessToken = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    accessToken = credentials ? credentials.password : null;
  } catch (error) {
    console.log('Keychain error:', error);
  }
};

app.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (accessToken) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

app.interceptors.response.use(
  response => response.data,
  error => {
    return Promise.reject({
      status: error?.response?.status,
      message: error?.response?.data?.info?.message || error.message,
      data: error?.response?.data,
    });
  },
);

export const client = {
  get: <T = any>(url: string, config?: any) => app.get<any, ApiResponse<T>>(url, config),
  post: <T = any>(url: string, data?: any, config?: any) =>
    app.post<any, ApiResponse<T>>(url, data, config),
  put: <T = any>(url: string, data?: any, config?: any) =>
    app.put<any, ApiResponse<T>>(url, data, config),
  patch: <T = any>(url: string, data?: any, config?: any) =>
    app.patch<any, ApiResponse<T>>(url, data, config),
  delete: <T = any>(url: string, config?: any) => app.delete<any, ApiResponse<T>>(url, config),
};
