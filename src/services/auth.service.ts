import { AxiosError } from "axios";
import { vqcBackendApi } from "../api/vqc-backend.api";
// import { useModalStore } from "../stores";




export interface LoginResponse {
  ok: boolean;
  uid: number;
  name: string;
  email?: string;
  role: string;
  token?: string;
}



export class AuthService {



  static login = async (email: string, password: string): Promise<LoginResponse> => {

    // const { errorModal } = useModalStore();


    try {
      const { data } = await vqcBackendApi.post<LoginResponse>('/users', { email, password });
      console.log('data', data)
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("error en servicio ",error.response?.data.errors);
        // errorModal("Error", error.response?.data?.errors || 'Error al iniciar sesión');
        throw new Error(error.response?.data)
      }

      console.log(error)
      throw new Error('Error al iniciar sesión')
    }

  }

  static checkStatus = async (): Promise<LoginResponse> => {
    try {
      const { data } = await vqcBackendApi.get<LoginResponse>('/users/renew');
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data)
      }

      console.log(error)
      throw new Error('Error al verificar el estado de autenticación')
    }
  }
}