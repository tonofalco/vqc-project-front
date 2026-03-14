import { AxiosError } from "axios";
import { vqcBackendApi } from "src/api/vqc-backend.api";


export interface LoginResponse {
  ok: boolean;
  uid: number;
  name: string;
  email: string;
  role: string;
  token: string;
}



export class AuthService {

  static readonly login = async (email: string, password: string): Promise<LoginResponse> => {

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

  static readonly checkStatus = async (): Promise<LoginResponse> => {
    try {
      const { data } = await vqcBackendApi.get<LoginResponse>('/users/renew');
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }

      console.log(error)
      throw new Error('Error al verificar el estado de autenticación')
      
    }
  };

  static readonly getAllUsers = async (): Promise<LoginResponse[]> => {
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

  static readonly createUser = async (event: LoginResponse): Promise<LoginResponse> => {
    try {
      const { data } = await vqcBackendApi.post("/users/new", event);
      return data.event;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.msg || "Error al crear usuario en servicio");
      }
      throw new Error("Error al crear usuario en aplicativo");
    }
  };

  static readonly updateUser = async (id: string, event: any): Promise<any> => {
  try {
    const { data } = await vqcBackendApi.put(`/users/${id}`, event);
    return data; // O data.user dependiendo de cómo responda tu API
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.msg || "Error al actualizar usuario");
    }
    throw new Error("Error en la aplicación al actualizar");
  }
};

  static readonly deleteUser = async (id: string): Promise<void> => {
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