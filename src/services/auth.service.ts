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

    try {
      const { data } = await vqcBackendApi.post<LoginResponse>('/users', { email, password });
      console.log('data', data)
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("error en servicio ", error.response?.data.errors);
        throw new Error(error.response?.data)
      }

      console.log(error)
      throw new Error('Error al iniciar sesión')
    }

  };

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
  };

  static getAll = async (): Promise<LoginResponse[]> => {
    try {
      const { data } = await vqcBackendApi.get("/users");
      return data.usuarios || data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.msg || "Error al obtener usuarios en servicio");
      }
      throw new Error("Error al obtener usuarios en aplicativo");
    }
  };

  static create = async (event: LoginResponse): Promise<LoginResponse> => {
    try {
      const { data } = await vqcBackendApi.post("/users", event);
      return data.event;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.msg || "Error al crear usuario en servicio");
      }
      throw new Error("Error al crear usuario en aplicativo");
    }
  };

  static update = async (id: string, event: Partial<LoginResponse>): Promise<LoginResponse> => {
    try {
      const { data } = await vqcBackendApi.put(`/users/${id}`, event);
      return data.event;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.msg || "Error al actualizar usuario en servicio");
      }
      throw new Error("Error al actualizar usuario en aplicativo");
    }
  };

  static delete = async (id: string): Promise<void> => {
    try {
      await vqcBackendApi.delete(`/users/${id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.msg || "Error al eliminar usuario en servicio");
      }
      throw new Error("Error al eliminar usuario en aplicativo");
    }
  };

}