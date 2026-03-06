import axios, { InternalAxiosRequestConfig } from 'axios';

import { t } from 'i18next';
import { MAIN_DOMAIN, API_PREFIX } from '@/constants/api';
import { getAccessToken, showMessage } from '@/utils/';

type ApiResponse<T = any> = {
  data: T;
  mess: string;
  status: boolean;
  code: number | string;
};

export const app = axios.create({
  baseURL: MAIN_DOMAIN + API_PREFIX,
  timeout: 30000,
});

app.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getAccessToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);
app.interceptors.response.use(
  response => response.data,
  error => {
    if (__DEV__) {
      console.error('API Error:', error);
    }
    showMessage.fail(t('error.default'));
    return Promise.reject({
      status: error?.response?.status || false,
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
