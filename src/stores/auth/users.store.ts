import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { LoginResponse, Usuario, UsuarioUpdate } from 'src/interfaces';
import { UserService } from "src/services";

interface UserState {
  users: Usuario[];
  loading: boolean;
  error: string | null;
  activeUser: LoginResponse | null;

  fetchUsers: () => Promise<Usuario[]>;
  addUser: (newUser: Usuario) => Promise<boolean>;
  updateUser: (id: string, userData: UsuarioUpdate) => Promise<boolean>;
  deleteUser: (id: string) =>  Promise<boolean>;
  setActiveUser: (user: LoginResponse | null) => void;

}

export const useUsersStore = create<UserState>()(
  devtools((set, get) => ({
    users: [],
    activeUser: null,
    loading: false,
    error: null,

    // Función para obtener todos los usuarios
    fetchUsers: async (): Promise<Usuario[]> => {
      set({ loading: true, error: null });
      try {
        const users = await UserService.getAllUsers();
        set({ users, loading: false });
        return users;
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        set({ error: message, loading: false });
        throw error;
      }
    },

    // Función para agregar un nuevo usuario
    addUser: async (newUser: Usuario): Promise<boolean> => {
      set({ loading: true, error: null });
      try {
        const createdUser = await UserService.createUser(newUser);
        await get().fetchUsers();
        // Actualizamos la lista local añadiendo el nuevo usuario
        set((state) => ({
          users: [...state.users, createdUser],
          loading: false
        }));
        return true;
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        set({ error: message, loading: false });
        return false;
      }
    },

    // Actualización de usuario, recibe el ID y los datos a actualizar
    updateUser: async (id: string, user: UsuarioUpdate):  Promise<boolean> => {
      set({ loading: true, error: null });
      try {
        await UserService.updateUser(id, user);
        await get().fetchUsers(); // Refrescar la tabla automáticamente
        set({ loading: false });
        return true;
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        set({ error: message, loading: false });
        return false;
      }
    },

    // Función para eliminar un usuario por ID
    deleteUser: async (id: string) => {
      // Opcional: Podrías pedir confirmación aquí o en el componente
      set({ loading: true, error: null });
      try {
        await UserService.deleteUser(id);

        // Refrescamos la lista completa para que la tabla se actualice
        await get().fetchUsers();

        set({ loading: false });
        return true;
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        set({ error: message, loading: false });
        return false;
      }
    },

    // Función para establecer el usuario activo (para edición)
    setActiveUser: (user: LoginResponse | null) => set({ activeUser: user }),
  }))
);