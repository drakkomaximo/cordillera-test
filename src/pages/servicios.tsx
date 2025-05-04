import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
  baseURL: '/api', // URL base para todas las peticiones
  timeout: 10000, // Tiempo máximo de espera en milisegundos
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // Identifica que es una petición AJAX
  },
});

// Interceptor para validar el origen de las peticiones
api.interceptors.request.use(
  (config) => {
    // Verifica que la petición venga del mismo origen
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      if (config.url && !config.url.startsWith(origin)) {
        throw new Error('Acceso no autorizado');
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la petición:', error);
    return Promise.reject(error);
  }
);

export default api; 