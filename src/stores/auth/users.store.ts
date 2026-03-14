import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { LoginResponse, AuthService } from '../../services/auth.service';

interface UserState {
  users: LoginResponse[];
  loading: boolean;
  error: string | null;
  activeUser: LoginResponse | null;

  fetchUsers: () => Promise<void>;
  addUser: (newUser: any) => any;
  updateUser: (id: string, userData: any) => any
  deleteUser: (id: string) => any;
  setActiveUser: (user: any) => void;

}

export const useUsersStore = create<UserState>()(
  devtools((set, get) => ({
    users: [],
    activeUser: null,
    loading: false,
    error: null,


    fetchUsers: async () => {
      set({ loading: true, error: null });
      try {
        const users = await AuthService.getAllUsers();
        set({ users, loading: false });
      } catch (error: any) {
        set({ error: error.message, loading: false });
      }
    },

    addUser: async (newUser: any) => {
      set({ loading: true, error: null });
      try {
        const createdUser = await AuthService.createUser(newUser);
        await get().fetchUsers();
        // Actualizamos la lista local añadiendo el nuevo usuario
        set((state) => ({
          users: [...state.users, createdUser],
          loading: false
        }));
        return true; // Para saber que fue exitoso
      } catch (error: any) {
        set({ error: error.message, loading: false });
        return false;
      }
    },

    updateUser: async (id: string, userData: any) => {
      set({ loading: true, error: null });
      try {
        await AuthService.updateUser(id, userData);
        await get().fetchUsers(); // Refrescar la tabla automáticamente
        set({ loading: false });
        return true;
      } catch (error: any) {
        set({ error: error.message, loading: false });
        return false;
      }
    },

    deleteUser: async (id: string) => {
      // Opcional: Podrías pedir confirmación aquí o en el componente
      set({ loading: true, error: null });
      try {
        await AuthService.deleteUser(id);

        // Refrescamos la lista completa para que la tabla se actualice
        await get().fetchUsers();

        set({ loading: false });
        return true;
      } catch (error: any) {
        set({ error: error.message, loading: false });
        return false;
      }
    },

    setActiveUser: (user: LoginResponse) => set({ activeUser: user }),
  }))
);