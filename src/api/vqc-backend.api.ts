import axios from 'axios';
import { useAuthStore } from '../stores';


export const vqcBackendApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

//todo: interceptors
// leer el store de zustand
vqcBackendApi.interceptors.request.use(
  (config) => {
    console.log(' useAuthStore.getState()',  useAuthStore.getState().user?.uid)
    const token = useAuthStore.getState().token;
    if (token) {
      if (!config.headers) config.headers = new axios.AxiosHeaders(); // asegurarnos que headers existe
      config.headers['x-token'] = token;        // nombre exacto esperado por el backend
      // console.log("token:", token);
    } else {
      console.log("No hay token disponible al hacer la petición");
    }
    return config;
  },
  (error) => Promise.reject(new Error(error?.message || String(error)))
);

