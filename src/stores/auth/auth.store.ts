import { StateCreator, create } from "zustand";
import type { User, AuthStatus, LoginRequest } from "src/interfaces/index";
import { AuthService } from "src/services/auth.service";
import { devtools, persist } from "zustand/middleware";

export interface AuthState {
  status: AuthStatus;
  token: string;
  user: User;

  loginUser: (loginRequest: LoginRequest) => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  logoutUser: () => void;

}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: 'pending',
  token: '',
  user: {} as User,

  
  loginUser: async (loginRequest: LoginRequest) => {
    const { email, password } = loginRequest;

    try {
      const { token, ...user } = await AuthService.login({email, password});
      set({ status: 'authorized', token, user });

    } catch (error) {
      set({ status: 'unauthenticated', token: undefined, user: undefined });
      throw error instanceof Error
        ? error
        : new Error('unauthenticated');
    }
  },

  checkAuthStatus: async () => {
    try {
      const { token, ...user } = await AuthService.checkStatus();
      set({ status: 'authorized', token, user });
    } catch (error) {
      set({ status: 'unauthenticated', token: undefined, user: undefined });
      console.error('Auth status check failed:', error);
    }
  },

  logoutUser: () => {
    set({ status: 'unauthenticated', token: undefined, user: undefined });
  }


});

export const useAuthStore = create<AuthState>()(devtools(
  persist(
    storeApi, { name: 'auth-storage' }
  )));