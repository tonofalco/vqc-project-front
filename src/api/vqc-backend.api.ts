import axios from 'axios';
import { useAuthStore } from '../stores';

export const vqcBackendApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

//todo: interceptors
// leer el store de zustand
vqcBackendApi.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    console.log({token})
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }
);

