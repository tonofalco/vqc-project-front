import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { LoginResponse, AuthService } from '../../services/auth.service';

interface UserState {
  users: LoginResponse[];
  loading: boolean;
  error: string | null;
  activeUser: LoginResponse | null;

  fetchUsers: () => Promise<void>;
  setActiveUser: (user: LoginResponse) => void;

}

export const useUsersStore = create<UserState>()(
  devtools((set) => ({
    users: [],
    activeUser: null,
    loading: false,
    error: null,


    fetchUsers: async () => {
      set({ loading: true, error: null });
      try {
        const users = await AuthService.getAll();
        set({ users, loading: false });
      } catch (error: any) {
        set({ error: error.message, loading: false });
      }
    },
    setActiveUser: (user: LoginResponse) => set({ activeUser: user }),
  }))
);