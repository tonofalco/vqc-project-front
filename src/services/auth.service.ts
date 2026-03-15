import { AxiosError } from "axios";
import { vqcBackendApi } from "src/api/vqc-backend.api";
import { LoginRequest, LoginResponse } from "src/interfaces";


export class AuthService {
  // Inicio de sesión
  static readonly login = async (loginRequest: LoginRequest): Promise<LoginResponse> => {
    const { email, password } = loginRequest;
    try {
      const { data } = await vqcBackendApi.post<LoginResponse>('/users', { email, password }); 
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

  // Verificación de estado de autenticación
  static readonly checkStatus = async (): Promise<LoginResponse> => {
    try {
      const { data } = await vqcBackendApi.get<LoginResponse>('/users/renew');
      console.log('data checkStatus', data)
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

}