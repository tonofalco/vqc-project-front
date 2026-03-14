import axios from 'axios';
import { useAuthStore } from '../stores';


export const vqcBackendApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Interceptor de Petición
vqcBackendApi.interceptors.request.use(
  (config) => {
    console.log(' useAuthStore.getState()',  useAuthStore.getState().user?.uid)
    const token = useAuthStore.getState().token;
    if (token) {
      if (!config.headers) config.headers = new axios.AxiosHeaders(); // asegurarnos que headers existe
      config.headers['x-token'] = token;       
    } else {
      console.log("No hay token disponible al hacer la petición");
    }
    return config;
  },
  (error) => Promise.reject(new Error(error?.message || String(error)))
);

vqcBackendApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el backend devuelve 401, el token no es válido o expiró
    if (error.response?.status === 401) {
      useAuthStore.getState().logoutUser();
    }
    return Promise.reject(error);
  }
);
