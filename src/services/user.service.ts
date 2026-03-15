import { AxiosError } from "axios";
import { vqcBackendApi } from "src/api/vqc-backend.api";
import { Usuario } from "src/interfaces";


export class UserService {
  // Obtener todos los usuarios
  static readonly getAllUsers = async (): Promise<Usuario[]> => {
      try {
        const { data } = await vqcBackendApi.get("/users");
        return data.usuarios;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(error.response?.data?.msg || "Error al obtener usuarios en servicio");
        }
        throw new Error("Error al obtener usuarios en aplicativo");
      }
    };

    // Crear un nuevo usuario
    static readonly createUser = async (user: Usuario): Promise<Usuario> => {
    try {
      console.log('user', user)
      const { data } = await vqcBackendApi.post("/users/new", user);
      return data.user;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.msg || "Error al crear usuario en servicio");
      }
      throw new Error("Error al crear usuario en aplicativo");
    }
  };

  // Actualizar un usuario existente
  static readonly updateUser = async (id: string, user: Usuario): Promise<Usuario> => {
    try {
      const { data } = await vqcBackendApi.put(`/users/${id}`, user);
      return data; // O data.user dependiendo de cómo responda tu API
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.msg || "Error al actualizar usuario");
      }
      throw new Error("Error en la aplicación al actualizar");
    }
  };

  // Eliminar un usuario por ID
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