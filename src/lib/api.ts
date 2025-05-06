import type { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Create a dummy instance for SSR
const api: AxiosInstance = {} as AxiosInstance;

// Only create axios instance on client side
if (typeof window !== 'undefined') {
  import('axios').then((axios) => {
    Object.assign(api, axios.default.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    }));

    // Interceptor para validar el origen de las peticiones
    api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const origin = window.location.origin;
        if (config.url && !config.url.startsWith(origin)) {
          throw new Error('Acceso no autorizado');
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // Interceptor para manejar errores globalmente
    api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        console.error('Error en la petición:', error);
        return Promise.reject(error);
      }
    );
  });
}

export default api; 